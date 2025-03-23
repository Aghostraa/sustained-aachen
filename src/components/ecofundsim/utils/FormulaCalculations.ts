import { Donation, SimulationResult, ProjectMatchingResult, SimulationConfig } from '../models/SimulationModels';

// Group donations by project
const groupDonationsByProject = (donations: Donation[]): { [projectId: string]: Donation[] } => {
  return donations.reduce((acc, donation) => {
    if (!acc[donation.projectId]) {
      acc[donation.projectId] = [];
    }
    acc[donation.projectId].push(donation);
    return acc;
  }, {} as { [projectId: string]: Donation[] });
};

// Calculate standard QF (for comparison)
export const calculateStandardQF = (
  donations: Donation[], 
  matchingPool: number
): SimulationResult => {
  const projectDonations = groupDonationsByProject(donations);
  const projectResults: ProjectMatchingResult[] = [];
  
  // Calculate the raw matching amount for each project using standard formula
  let totalMatchingSum = 0;
  
  for (const [projectId, projectDonation] of Object.entries(projectDonations)) {
    const sumOfRoots = projectDonation.reduce((sum, donation) => sum + Math.sqrt(donation.amount), 0);
    const squaredSumOfRoots = Math.pow(sumOfRoots, 2);
    const sumOfDonations = projectDonation.reduce((sum, donation) => sum + donation.amount, 0);
    
    // Raw matching amount (before scaling)
    const rawMatching = squaredSumOfRoots - sumOfDonations;
    
    // Create donor influence data
    const donorInfluence = projectDonation.map(donation => {
      // Calculate individual contribution to matching
      const donorSqrtContribution = Math.sqrt(donation.amount);
      const matchingContribution = 2 * donorSqrtContribution * (sumOfRoots - donorSqrtContribution);
      
      return {
        donorId: donation.donorId,
        contributionAmount: donation.amount,
        matchingGenerated: matchingContribution,
        influencePercentage: 0 // Will be calculated after scaling
      };
    });
    
    projectResults.push({
      projectId,
      contributions: sumOfDonations,
      contributorCount: projectDonation.length,
      matchingAmount: Math.max(0, rawMatching), // Ensure non-negative
      totalFunding: sumOfDonations + Math.max(0, rawMatching),
      donorInfluence
    });
    
    totalMatchingSum += Math.max(0, rawMatching);
  }
  
  // Scale the matching amounts to fit within the matching pool
  if (totalMatchingSum > 0) {
    const scalingFactor = matchingPool / totalMatchingSum;
    
    for (const project of projectResults) {
      project.matchingAmount = project.matchingAmount * scalingFactor;
      project.totalFunding = project.contributions + project.matchingAmount;
      
      // Update influence percentages
      for (const influence of project.donorInfluence) {
        influence.matchingGenerated *= scalingFactor;
        influence.influencePercentage = 
          (influence.matchingGenerated / project.matchingAmount) * 100;
      }
    }
  }
  
  return {
    projects: projectResults,
    totalMatching: matchingPool,
    reservedFunds: 0,
    flaggedDonations: []
  };
};

// Calculate Capped Contributions Formula
export const calculateCappedQF = (
  donations: Donation[], 
  matchingPool: number, 
  cap: number
): SimulationResult => {
  const projectDonations = groupDonationsByProject(donations);
  const projectResults: ProjectMatchingResult[] = [];
  
  let totalMatchingSum = 0;
  
  for (const [projectId, projectDonation] of Object.entries(projectDonations)) {
    // Calculate capped matching formula
    const sumOfCappedRoots = projectDonation.reduce(
      (sum, donation) => sum + Math.min(Math.sqrt(donation.amount), Math.sqrt(cap)), 
      0
    );
    
    const sumOfDonations = projectDonation.reduce((sum, donation) => sum + donation.amount, 0);
    const sumOfExcess = projectDonation.reduce(
      (sum, donation) => sum + Math.max(0, donation.amount - cap), 
      0
    );
    
    // Squared sum of capped roots + direct addition of excess amounts
    const rawMatching = Math.pow(sumOfCappedRoots, 2);
    
    // Calculate donor influence
    const donorInfluence = projectDonation.map(donation => {
      const cappedAmount = Math.min(donation.amount, cap);
      const excessAmount = Math.max(0, donation.amount - cap);
      
      const cappedSqrt = Math.sqrt(cappedAmount);
      const matchingContribution = 2 * cappedSqrt * 
        (sumOfCappedRoots - (donation.amount > cap ? Math.sqrt(cap) : cappedSqrt));
      
      return {
        donorId: donation.donorId,
        contributionAmount: donation.amount,
        matchingGenerated: matchingContribution,
        influencePercentage: 0 // Will be calculated after scaling
      };
    });
    
    projectResults.push({
      projectId,
      contributions: sumOfDonations,
      contributorCount: projectDonation.length,
      matchingAmount: Math.max(0, rawMatching),
      totalFunding: sumOfDonations + Math.max(0, rawMatching),
      donorInfluence
    });
    
    totalMatchingSum += Math.max(0, rawMatching);
  }
  
  // Scale the matching amounts to fit within the matching pool
  if (totalMatchingSum > 0) {
    const scalingFactor = matchingPool / totalMatchingSum;
    
    for (const project of projectResults) {
      project.matchingAmount = project.matchingAmount * scalingFactor;
      project.totalFunding = project.contributions + project.matchingAmount;
      
      // Update influence percentages
      for (const influence of project.donorInfluence) {
        influence.matchingGenerated *= scalingFactor;
        influence.influencePercentage = 
          (influence.matchingGenerated / project.matchingAmount) * 100;
      }
    }
  }
  
  return {
    projects: projectResults,
    totalMatching: matchingPool,
    reservedFunds: 0,
    flaggedDonations: []
  };
};

// Calculate Two-Tier Matching Formula
export const calculateTwoTierQF = (
  donations: Donation[], 
  matchingPool: number, 
  threshold: number, 
  alpha1: number, 
  alpha2: number
): SimulationResult => {
  const projectDonations = groupDonationsByProject(donations);
  const projectResults: ProjectMatchingResult[] = [];
  
  let totalMatchingSum = 0;
  
  for (const [projectId, projectDonation] of Object.entries(projectDonations)) {
    // Calculate two-tier formula
    const sumOfSmallRoots = projectDonation.reduce(
      (sum, donation) => sum + Math.sqrt(Math.min(donation.amount, threshold)), 
      0
    );
    
    const sumOfLargeRoots = projectDonation.reduce(
      (sum, donation) => {
        if (donation.amount <= threshold) return sum;
        return sum + (Math.sqrt(donation.amount) - Math.sqrt(threshold));
      }, 
      0
    );
    
    const sumOfDonations = projectDonation.reduce((sum, donation) => sum + donation.amount, 0);
    
    // Two-tier formula: α1(∑_i √min(c^p_i, t))² + α2(∑_i (max(0, √c^p_i - √t)))²
    const rawMatching = (alpha1 * Math.pow(sumOfSmallRoots, 2)) + 
                        (alpha2 * Math.pow(sumOfLargeRoots, 2));
    
    // Calculate donor influence
    const donorInfluence = projectDonation.map(donation => {
      const smallContribution = Math.min(donation.amount, threshold);
      const smallSqrt = Math.sqrt(smallContribution);
      
      let largeContribution = 0;
      let largeSqrt = 0;
      
      if (donation.amount > threshold) {
        largeContribution = donation.amount - threshold;
        largeSqrt = Math.sqrt(donation.amount) - Math.sqrt(threshold);
      }
      
      // Influence calculation
      const smallInfluence = 2 * alpha1 * smallSqrt * (sumOfSmallRoots - smallSqrt);
      const largeInfluence = 2 * alpha2 * largeSqrt * (sumOfLargeRoots - largeSqrt);
      
      return {
        donorId: donation.donorId,
        contributionAmount: donation.amount,
        matchingGenerated: smallInfluence + largeInfluence,
        influencePercentage: 0 // Will be calculated after scaling
      };
    });
    
    projectResults.push({
      projectId,
      contributions: sumOfDonations,
      contributorCount: projectDonation.length,
      matchingAmount: Math.max(0, rawMatching),
      totalFunding: sumOfDonations + Math.max(0, rawMatching),
      donorInfluence
    });
    
    totalMatchingSum += Math.max(0, rawMatching);
  }
  
  // Scale the matching amounts to fit within the matching pool
  if (totalMatchingSum > 0) {
    const scalingFactor = matchingPool / totalMatchingSum;
    
    for (const project of projectResults) {
      project.matchingAmount = project.matchingAmount * scalingFactor;
      project.totalFunding = project.contributions + project.matchingAmount;
      
      // Update influence percentages
      for (const influence of project.donorInfluence) {
        influence.matchingGenerated *= scalingFactor;
        influence.influencePercentage = 
          (influence.matchingGenerated / project.matchingAmount) * 100;
      }
    }
  }
  
  return {
    projects: projectResults,
    totalMatching: matchingPool,
    reservedFunds: 0,
    flaggedDonations: []
  };
};

// Calculate Declining Marginal Matching Formula
export const calculateDecliningQF = (
  donations: Donation[], 
  matchingPool: number, 
  beta: number
): SimulationResult => {
  const projectDonations = groupDonationsByProject(donations);
  const projectResults: ProjectMatchingResult[] = [];
  
  let totalMatchingSum = 0;
  
  for (const [projectId, projectDonation] of Object.entries(projectDonations)) {
    // Calculate declining formula
    const sumOfAdjustedContributions = projectDonation.reduce(
      (sum, donation) => sum + Math.pow(donation.amount, beta), 
      0
    );
    
    const sumOfDonations = projectDonation.reduce((sum, donation) => sum + donation.amount, 0);
    
    // F^p = (∑_i (c^p_i)^β)^(1/β)
    const rawMatching = Math.pow(sumOfAdjustedContributions, 1/beta);
    
    // Calculate donor influence
    const donorInfluence = projectDonation.map(donation => {
      // The influence is partial derivative of the formula with respect to the donation
      const contributionPower = Math.pow(donation.amount, beta);
      const matchingContribution = (contributionPower / sumOfAdjustedContributions) * rawMatching;
      
      return {
        donorId: donation.donorId,
        contributionAmount: donation.amount,
        matchingGenerated: matchingContribution,
        influencePercentage: 0 // Will be calculated after scaling
      };
    });
    
    projectResults.push({
      projectId,
      contributions: sumOfDonations,
      contributorCount: projectDonation.length,
      matchingAmount: Math.max(0, rawMatching - sumOfDonations), // Subtract direct contributions
      totalFunding: Math.max(sumOfDonations, rawMatching),
      donorInfluence
    });
    
    totalMatchingSum += Math.max(0, rawMatching - sumOfDonations);
  }
  
  // Scale the matching amounts to fit within the matching pool
  if (totalMatchingSum > 0) {
    const scalingFactor = matchingPool / totalMatchingSum;
    
    for (const project of projectResults) {
      project.matchingAmount = project.matchingAmount * scalingFactor;
      project.totalFunding = project.contributions + project.matchingAmount;
      
      // Update influence percentages
      for (const influence of project.donorInfluence) {
        influence.matchingGenerated *= scalingFactor;
        influence.influencePercentage = 
          (influence.matchingGenerated / project.matchingAmount) * 100;
      }
    }
  }
  
  return {
    projects: projectResults,
    totalMatching: matchingPool,
    reservedFunds: 0,
    flaggedDonations: []
  };
};

// Calculate based on formula type from config
export const calculateMatchingFunds = (
  donations: Donation[],
  config: SimulationConfig
): SimulationResult => {
  switch (config.formulaType) {
    case 'capped':
      return calculateCappedQF(
        donations, 
        config.matchingPool, 
        config.formulaParams.cap || 5
      );
    case 'two-tier':
      return calculateTwoTierQF(
        donations, 
        config.matchingPool, 
        config.formulaParams.threshold || 3,
        config.formulaParams.alpha1 || 0.5,
        config.formulaParams.alpha2 || 0.1
      );
    case 'declining':
      return calculateDecliningQF(
        donations, 
        config.matchingPool, 
        config.formulaParams.beta || 0.7
      );
    case 'standard':
    default:
      return calculateStandardQF(donations, config.matchingPool);
  }
}; 