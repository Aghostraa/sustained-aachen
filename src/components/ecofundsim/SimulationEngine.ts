import { 
  Project, 
  Donor, 
  Donation, 
  SimulationConfig, 
  SimulationResult, 
  ProjectMatchingResult 
} from './models/SimulationModels';
import { calculateMatchingFunds } from './utils/FormulaCalculations';
import { detectCollusion, isVerified, applyIncentives } from './utils/VerificationUtils';
import { v4 as uuidv4 } from 'uuid';

export class SimulationEngine {
  private projects: Project[] = [];
  private donors: Donor[] = [];
  private donations: Donation[] = [];
  private config: SimulationConfig;
  
  constructor(initialConfig: SimulationConfig) {
    this.config = initialConfig;
  }
  
  // Get the current list of projects
  getProjects(): Project[] {
    return [...this.projects];
  }
  
  // Get the current list of donors
  getDonors(): Donor[] {
    return [...this.donors];
  }
  
  // Get the current list of donations
  getDonations(): Donation[] {
    return [...this.donations];
  }
  
  // Get the current configuration
  getConfig(): SimulationConfig {
    return { ...this.config };
  }
  
  // Reset the simulation
  reset(): void {
    this.donations = [];
  }
  
  // Set new projects
  setProjects(projects: Project[]): void {
    this.projects = [...projects];
  }
  
  // Add a new project
  addProject(project: Project): void {
    this.projects.push(project);
  }
  
  // Add a donor
  addDonor(donor: Donor): void {
    this.donors.push(donor);
  }
  
  // Set donors
  setDonors(donors: Donor[]): void {
    this.donors = [...donors];
  }
  
  // Add a donation
  addDonation(donation: Donation): Donation[] {
    this.donations.push(donation);
    return [...this.donations];
  }
  
  // Set donations
  setDonations(donations: Donation[]): void {
    this.donations = [...donations];
  }
  
  // Update the configuration
  updateConfig(config: Partial<SimulationConfig>): void {
    this.config = { ...this.config, ...config };
  }
  
  // Run the simulation with current data
  simulate(): SimulationResult {
    // Apply anti-collusion if enabled
    let validDonations = [...this.donations];
    let flaggedDonations: Donation[] = [];
    
    if (this.config.enableAntiCollusion) {
      flaggedDonations = detectCollusion(this.donations, {
        ip: 3,  // Flag IPs with more than 3 donations
        time: 5, // Flag if more than 5 donations in a short time period
        device: 3 // Flag devices with more than 3 donations
      });
      
      // Filter out flagged donations
      validDonations = validDonations.filter(donation => 
        !flaggedDonations.includes(donation)
      );
    }
    
    // Apply verification requirements if enabled
    if (this.config.enableVerification) {
      validDonations = validDonations.filter(donation => {
        const donor = this.donors.find(d => d.id === donation.donorId);
        if (!donor) return false;
        
        return isVerified(donation, donor);
      });
    }
    
    // Calculate base matching amounts using the selected formula
    let result = calculateMatchingFunds(validDonations, this.config);
    
    // Apply incentive bonuses if enabled
    if (this.config.enableIncentives) {
      // For each project, recalculate its matching with incentives
      result.projects = result.projects.map(projectResult => {
        const projectDonations = validDonations.filter(
          d => d.projectId === projectResult.projectId
        );
        
        let totalMatchingWithBonuses = 0;
        
        // Calculate new donor influence values with bonuses
        const donorInfluence = projectResult.donorInfluence.map(influence => {
          const donation = projectDonations.find(d => d.donorId === influence.donorId);
          const donor = this.donors.find(d => d.id === influence.donorId);
          
          if (!donation || !donor) return influence;
          
          // Apply incentives to the matching amount
          const bonusMatchingAmount = applyIncentives(
            donation,
            donor,
            influence.matchingGenerated
          );
          
          totalMatchingWithBonuses += bonusMatchingAmount;
          
          return {
            ...influence,
            matchingGenerated: bonusMatchingAmount,
            influencePercentage: 0 // Will recalculate after scaling
          };
        });
        
        return {
          ...projectResult,
          matchingAmount: totalMatchingWithBonuses,
          totalFunding: projectResult.contributions + totalMatchingWithBonuses,
          donorInfluence
        };
      });
      
      // Recalculate total matching
      const totalMatching = result.projects.reduce(
        (sum, project) => sum + project.matchingAmount, 
        0
      );
      
      // Rescale to fit matching pool
      if (totalMatching > 0) {
        const scalingFactor = this.config.matchingPool / totalMatching;
        
        result.projects = result.projects.map(project => {
          const scaledMatching = project.matchingAmount * scalingFactor;
          
          // Update influence percentages
          const donorInfluence = project.donorInfluence.map(influence => ({
            ...influence,
            matchingGenerated: influence.matchingGenerated * scalingFactor,
            influencePercentage: 
              (influence.matchingGenerated * scalingFactor / scaledMatching) * 100
          }));
          
          return {
            ...project,
            matchingAmount: scaledMatching,
            totalFunding: project.contributions + scaledMatching,
            donorInfluence
          };
        });
      }
      
      result.totalMatching = this.config.matchingPool;
    }
    
    // Apply categorical allocation if enabled
    if (this.config.categoricalAllocation) {
      // Get all unique categories
      const categories = [...new Set(this.projects.map(p => p.category))];
      
      // Distribute matching pool evenly across categories
      const categoryBudget = this.config.matchingPool / categories.length;
      
      // Group projects by category
      const projectsByCategory: { [category: string]: ProjectMatchingResult[] } = {};
      
      categories.forEach(category => {
        projectsByCategory[category] = [];
      });
      
      result.projects.forEach(project => {
        const projectData = this.projects.find(p => p.id === project.projectId);
        if (projectData) {
          projectsByCategory[projectData.category].push(project);
        }
      });
      
      // For each category, allocate its budget proportionally
      const newProjectResults: ProjectMatchingResult[] = [];
      
      categories.forEach(category => {
        const categoryProjects = projectsByCategory[category];
        const totalCategoryMatching = categoryProjects.reduce(
          (sum, project) => sum + project.matchingAmount, 
          0
        );
        
        if (totalCategoryMatching > 0) {
          const categoryScalingFactor = categoryBudget / totalCategoryMatching;
          
          categoryProjects.forEach(project => {
            const scaledMatching = project.matchingAmount * categoryScalingFactor;
            
            // Update influence percentages
            const donorInfluence = project.donorInfluence.map(influence => ({
              ...influence,
              matchingGenerated: influence.matchingGenerated * categoryScalingFactor,
              influencePercentage: 
                (influence.matchingGenerated * categoryScalingFactor / scaledMatching) * 100
            }));
            
            newProjectResults.push({
              ...project,
              matchingAmount: scaledMatching,
              totalFunding: project.contributions + scaledMatching,
              donorInfluence
            });
          });
        } else {
          // If no matching was allocated to this category, preserve original values
          categoryProjects.forEach(project => {
            newProjectResults.push(project);
          });
        }
      });
      
      result.projects = newProjectResults;
    }
    
    // Return the final simulation result
    return {
      ...result,
      flaggedDonations
    };
  }
}

// Create a new donation with the current timestamp
export const createDonation = (
  projectId: string, 
  donorId: string, 
  amount: number
): Donation => {
  const now = new Date();
  const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  
  return {
    id: uuidv4(),
    projectId,
    donorId,
    amount,
    timestamp: now,
    ipAddress: `192.168.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
    deviceId: uuidv4(),
    earlyBird: now < oneWeekAgo
  };
};

// Create a default simulation configuration
export const createDefaultConfig = (): SimulationConfig => {
  return {
    matchingPool: 5000,
    formulaType: 'standard',
    formulaParams: {
      cap: 5,
      threshold: 3,
      alpha1: 0.833,
      alpha2: 0.167,
      beta: 0.7,
      reserved: 0.1
    },
    enableAntiCollusion: false,
    enableVerification: false,
    enableIncentives: false,
    categoricalAllocation: false
  };
}; 