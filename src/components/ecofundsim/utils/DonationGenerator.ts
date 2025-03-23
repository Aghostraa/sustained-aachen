import { v4 as uuidv4 } from 'uuid';
import { Donation, Donor, Project } from '../models/SimulationModels';

// Helper function to randomly select an item from an array
const randomItem = <T>(array: T[]): T => {
  return array[Math.floor(Math.random() * array.length)];
};

// Generate a timestamp within the past month
const randomTimestamp = (): Date => {
  const now = new Date();
  // Random time within the past month
  const pastTime = now.getTime() - Math.random() * 30 * 24 * 60 * 60 * 1000;
  return new Date(pastTime);
};

// Generate a new donor
export const generateDonor = (): Donor => {
  const firstNames = ["Anna", "Max", "Lena", "Felix", "Julia", "Jan", "Laura", "Tim", "Sarah", "Lukas", "Lisa", "Markus", "Maria", "Thomas"];
  const lastNames = ["Müller", "Schmidt", "Schneider", "Fischer", "Weber", "Meyer", "Wagner", "Becker", "Schulz", "Hoffmann", "Schäfer"];
  const verificationTypes: Array<'email' | 'phone' | 'id' | 'none'> = ['email', 'email', 'email', 'phone', 'phone', 'id', 'none'];
  
  return {
    id: uuidv4(),
    name: `${randomItem(firstNames)} ${randomItem(lastNames)}`,
    verificationType: randomItem(verificationTypes),
    firstTimeContributor: Math.random() < 0.3, // 30% chance of being a first-time contributor
    referredBy: Math.random() < 0.2 ? uuidv4() : undefined, // 20% chance of being referred
  };
};

// Generate realistic donation patterns based on specified parameters
export const generateDonations = (
  projects: Project[],
  donors: Donor[],
  count: number,
  pattern: 'realistic' | 'whale-dominated' | 'grassroots' | 'custom',
  customRanges?: { small: number, medium: number, large: number }
): Donation[] => {
  // Configure donation ranges based on pattern
  let ranges = {
    small: { min: 1, max: 10, probability: 0.7 },
    medium: { min: 10, max: 100, probability: 0.25 },
    large: { min: 100, max: 1000, probability: 0.05 }
  };
  
  switch (pattern) {
    case 'whale-dominated':
      ranges = {
        small: { min: 5, max: 30, probability: 0.3 },
        medium: { min: 50, max: 200, probability: 0.3 },
        large: { min: 500, max: 5000, probability: 0.4 }
      };
      break;
    case 'grassroots':
      ranges = {
        small: { min: 1, max: 3, probability: 0.9 },
        medium: { min: 5, max: 10, probability: 0.09 },
        large: { min: 50, max: 200, probability: 0.01 }
      };
      break;
    case 'custom':
      if (customRanges) {
        const total = customRanges.small + customRanges.medium + customRanges.large;
        ranges = {
          small: { min: 1, max: 10, probability: customRanges.small / total },
          medium: { min: 10, max: 100, probability: customRanges.medium / total },
          large: { min: 1000, max: 2000, probability: customRanges.large / total }
        };
      }
      break;
  }
  
  // Generate random donations
  const donations: Donation[] = [];
  const now = new Date();
  const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  
  for (let i = 0; i < count; i++) {
    // Choose a donor
    const donor = randomItem(donors);
    
    // Choose a project
    const project = randomItem(projects);
    
    // Determine donation amount based on pattern probabilities
    let amount: number;
    const rnd = Math.random();
    
    if (rnd < ranges.small.probability) {
      amount = Math.floor(ranges.small.min + Math.random() * (ranges.small.max - ranges.small.min));
    } else if (rnd < ranges.small.probability + ranges.medium.probability) {
      amount = Math.floor(ranges.medium.min + Math.random() * (ranges.medium.max - ranges.medium.min));
    } else {
      amount = Math.floor(ranges.large.min + Math.random() * (ranges.large.max - ranges.large.min));
    }
    
    // Generate random timestamp
    const timestamp = randomTimestamp();
    
    // Determine if early bird (first week of the funding round)
    const earlyBird = timestamp < oneWeekAgo;
    
    donations.push({
      id: uuidv4(),
      projectId: project.id,
      donorId: donor.id,
      amount: amount,
      timestamp: timestamp,
      ipAddress: `192.168.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
      deviceId: Math.random() < 0.2 ? undefined : uuidv4(), // 20% chance of no device ID
      earlyBird: earlyBird
    });
  }
  
  return donations;
};

// Simulates a new donation for a specific project from a specific donor
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