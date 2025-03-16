import { Project, Donation, Donor, SimulationResult, ProjectMatchingResult } from '../models/SimulationModels';

export interface SankeyData {
  nodes: Array<{ name: string; category?: string }>;
  links: Array<{ source: number; target: number; value: number; color?: string }>;
}

export interface PieChartData {
  name: string;
  value: number;
  color?: string;
}

export interface BarChartData {
  name: string;
  value: number;
  color?: string;
}

// Helper to generate data for a Sankey diagram
export const generateSankeyData = (
  result: SimulationResult,
  projects: Project[],
  donors: Donor[],
  donations: Donation[]
): SankeyData => {
  const nodes: Array<{ name: string; category?: string }> = [];
  const links: Array<{ source: number; target: number; value: number; color?: string }> = [];
  
  // Add nodes for each project
  projects.forEach(project => {
    nodes.push({ 
      name: project.title,
      category: 'project'
    });
  });
  
  // Add nodes for different donor types
  nodes.push({ name: 'Small Donors (€5-€30)', category: 'donor' });
  nodes.push({ name: 'Medium Donors (€50-€200)', category: 'donor' });
  nodes.push({ name: 'Large Donors (€500+)', category: 'donor' });
  
  // Add nodes for matching categories
  nodes.push({ name: 'Base Matching', category: 'matching' });
  nodes.push({ name: 'Incentive Bonuses', category: 'matching' });
  
  // Find donor indices
  const smallDonorIdx = nodes.findIndex(n => n.name === 'Small Donors (€5-€30)');
  const mediumDonorIdx = nodes.findIndex(n => n.name === 'Medium Donors (€50-€200)');
  const largeDonorIdx = nodes.findIndex(n => n.name === 'Large Donors (€500+)');
  
  // Find matching indices
  const baseMatchingIdx = nodes.findIndex(n => n.name === 'Base Matching');
  const incentiveBonusIdx = nodes.findIndex(n => n.name === 'Incentive Bonuses');
  
  // Add links from donors to projects (direct contributions)
  result.projects.forEach((projectResult, projectIdx) => {
    // Get all donations for this project
    const projectDonations = donations.filter(d => d.projectId === projectResult.projectId);
    
    // Group by donation size
    const smallDonations = projectDonations.filter(d => d.amount <= 30).reduce((sum, d) => sum + d.amount, 0);
    const mediumDonations = projectDonations.filter(d => d.amount > 30 && d.amount <= 200).reduce((sum, d) => sum + d.amount, 0);
    const largeDonations = projectDonations.filter(d => d.amount > 200).reduce((sum, d) => sum + d.amount, 0);
    
    // Add links for direct contributions
    if (smallDonations > 0) {
      links.push({
        source: smallDonorIdx,
        target: projectIdx,
        value: smallDonations,
        color: '#88B04B' // Light green
      });
    }
    
    if (mediumDonations > 0) {
      links.push({
        source: mediumDonorIdx,
        target: projectIdx,
        value: mediumDonations,
        color: '#6B5B95' // Purple
      });
    }
    
    if (largeDonations > 0) {
      links.push({
        source: largeDonorIdx,
        target: projectIdx,
        value: largeDonations,
        color: '#FF6F61' // Coral
      });
    }
    
    // Add links for matching funds
    links.push({
      source: baseMatchingIdx,
      target: projectIdx,
      value: projectResult.matchingAmount,
      color: '#45B8AC' // Turquoise
    });
  });
  
  return { nodes, links };
};

// Helper to generate pie chart data for matching distribution
export const generatePieChartData = (result: SimulationResult, projects: Project[]): PieChartData[] => {
  return result.projects.map((projectResult, index) => {
    const project = projects.find(p => p.id === projectResult.projectId);
    return {
      name: project ? project.title : `Project ${index + 1}`,
      value: projectResult.matchingAmount,
      color: project ? project.iconColor : `#${Math.floor(Math.random() * 16777215).toString(16)}`
    };
  });
};

// Helper to generate bar chart data for influence comparison
export const generateInfluenceData = (
  result: SimulationResult,
  projectId: string,
  donors: Donor[]
): BarChartData[] => {
  const projectResult = result.projects.find(p => p.projectId === projectId);
  
  if (!projectResult) return [];
  
  // Sort influences by percentage in descending order
  const sortedInfluence = [...projectResult.donorInfluence]
    .sort((a, b) => b.influencePercentage - a.influencePercentage)
    .slice(0, 10); // Get top 10 influences
  
  return sortedInfluence.map(influence => {
    const donor = donors.find(d => d.id === influence.donorId);
    
    // Determine color based on donation amount
    let color = '#88B04B'; // Default (small)
    
    if (influence.contributionAmount > 200) {
      color = '#FF6F61'; // Large (coral)
    } else if (influence.contributionAmount > 30) {
      color = '#6B5B95'; // Medium (purple)
    }
    
    return {
      name: donor ? donor.name : `Donor ${influence.donorId.substring(0, 6)}`,
      value: influence.influencePercentage,
      color
    };
  });
};

// Calculate influence metrics for the whole matching pool
export const calculatePoolInfluenceMetrics = (
  result: SimulationResult
): { 
  smallDonorInfluence: number;
  mediumDonorInfluence: number;
  largeDonorInfluence: number;
} => {
  let totalSmallInfluence = 0;
  let totalMediumInfluence = 0;
  let totalLargeInfluence = 0;
  let totalMatching = 0;
  
  // Sum up all matching amounts
  result.projects.forEach(project => {
    totalMatching += project.matchingAmount;
    
    // Categorize influence by contribution amount
    project.donorInfluence.forEach(influence => {
      const matchingValue = influence.matchingGenerated;
      
      if (influence.contributionAmount <= 30) {
        totalSmallInfluence += matchingValue;
      } else if (influence.contributionAmount <= 200) {
        totalMediumInfluence += matchingValue;
      } else {
        totalLargeInfluence += matchingValue;
      }
    });
  });
  
  // Calculate percentages
  return {
    smallDonorInfluence: totalMatching > 0 ? (totalSmallInfluence / totalMatching) * 100 : 0,
    mediumDonorInfluence: totalMatching > 0 ? (totalMediumInfluence / totalMatching) * 100 : 0,
    largeDonorInfluence: totalMatching > 0 ? (totalLargeInfluence / totalMatching) * 100 : 0
  };
}; 