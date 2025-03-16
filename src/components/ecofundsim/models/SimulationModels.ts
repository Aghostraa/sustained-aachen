// src/components/ecofundsim/models/SimulationModels.ts

export interface Project {
  id: string;
  title: string;
  description: string;
  iconText: string;
  iconColor: string;
  targetAmount: number;
  category: string;
}

export interface Donor {
  id: string;
  name: string;
  email?: string;
  verificationType: 'email' | 'phone' | 'id' | 'none';
  firstTimeContributor: boolean;
  referredBy?: string;
}

export interface Donation {
  id: string;
  projectId: string;
  donorId: string;
  amount: number;
  timestamp: Date;
  ipAddress?: string;
  deviceId?: string;
  earlyBird: boolean;
}

export interface SimulationConfig {
  matchingPool: number;
  formulaType: 'standard' | 'capped' | 'two-tier' | 'declining';
  formulaParams: {
    cap?: number;  // For capped formula
    threshold?: number;  // For two-tier
    alpha1?: number;  // For two-tier
    alpha2?: number;  // For two-tier
    beta?: number;  // For declining
    reserved?: number;  // % of matching pool reserved
  };
  enableAntiCollusion: boolean;
  enableVerification: boolean;
  enableIncentives: boolean;
  categoricalAllocation: boolean;
}

export interface DonorInfluence {
  donorId: string;
  contributionAmount: number;
  matchingGenerated: number;
  influencePercentage: number;
}

export interface ProjectMatchingResult {
  projectId: string;
  contributions: number;
  contributorCount: number;
  matchingAmount: number;
  totalFunding: number;
  donorInfluence: DonorInfluence[];
}

export interface SimulationResult {
  projects: ProjectMatchingResult[];
  totalMatching: number;
  reservedFunds: number;
  flaggedDonations: Donation[];
}

export type VerificationType = 'none' | 'email' | 'phone' | 'id';

export type ProjectCategory = 
  | 'Climate Action'
  | 'Food Systems'
  | 'Waste Management'
  | 'Sustainable Mobility'
  | 'Urban Green Spaces'; 