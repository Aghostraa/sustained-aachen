import { Donation, Donor, VerificationType } from '../models/SimulationModels';

// Determine required verification level based on donation amount
export const verificationRequirement = (donationAmount: number): VerificationType => {
  if (donationAmount < 10) {
    return 'none';
  } else if (donationAmount < 100) {
    return 'email';
  } else if (donationAmount < 500) {
    return 'phone';
  } else {
    return 'id';
  }
};

// Check if a donation meets verification requirements
export const isVerified = (donation: Donation, donor: Donor): boolean => {
  const requiredVerification = verificationRequirement(donation.amount);
  
  // No verification required
  if (requiredVerification === 'none') {
    return true;
  }
  
  // All verification types satisfy less stringent requirements
  if (requiredVerification === 'email') {
    return ['email', 'phone', 'id'].includes(donor.verificationType);
  }
  
  // Phone and ID verification satisfy medium requirements
  if (requiredVerification === 'phone') {
    return ['phone', 'id'].includes(donor.verificationType);
  }
  
  // Only ID verification satisfies highest requirements
  return donor.verificationType === 'id';
};

// Detect potential collusion in donation data
export const detectCollusion = (
  donations: Donation[], 
  threshold: { ip: number, time: number, device: number }
): Donation[] => {
  const flaggedDonations: Donation[] = [];
  
  // Map to track donations by IP
  const ipMap: { [ip: string]: Donation[] } = {};
  
  // Map to track donations by device
  const deviceMap: { [deviceId: string]: Donation[] } = {};
  
  // Group donations by IP and device
  for (const donation of donations) {
    // Track by IP
    if (donation.ipAddress) {
      if (!ipMap[donation.ipAddress]) {
        ipMap[donation.ipAddress] = [];
      }
      ipMap[donation.ipAddress].push(donation);
    }
    
    // Track by device ID
    if (donation.deviceId) {
      if (!deviceMap[donation.deviceId]) {
        deviceMap[donation.deviceId] = [];
      }
      deviceMap[donation.deviceId].push(donation);
    }
  }
  
  // Flag donations from IPs with too many donations
  for (const ip in ipMap) {
    if (ipMap[ip].length > threshold.ip) {
      ipMap[ip].forEach(donation => {
        if (!flaggedDonations.includes(donation)) {
          flaggedDonations.push(donation);
        }
      });
    }
  }
  
  // Flag donations from devices with too many donations
  for (const deviceId in deviceMap) {
    if (deviceMap[deviceId].length > threshold.device) {
      deviceMap[deviceId].forEach(donation => {
        if (!flaggedDonations.includes(donation)) {
          flaggedDonations.push(donation);
        }
      });
    }
  }
  
  // Sort donations by timestamp
  const sortedDonations = [...donations].sort((a, b) => 
    a.timestamp.getTime() - b.timestamp.getTime()
  );
  
  // Track clusters of donations in short time periods
  for (let i = 0; i < sortedDonations.length - threshold.time; i++) {
    const startTime = sortedDonations[i].timestamp.getTime();
    const endTime = sortedDonations[i + threshold.time]?.timestamp.getTime();
    
    // If we find threshold.time+1 donations within a 5-minute period, flag them
    if (endTime && (endTime - startTime) < 5 * 60 * 1000) {
      for (let j = i; j <= i + threshold.time; j++) {
        if (!flaggedDonations.includes(sortedDonations[j])) {
          flaggedDonations.push(sortedDonations[j]);
        }
      }
    }
  }
  
  return flaggedDonations;
};

// Apply incentive bonuses to donation matching
export const applyIncentives = (
  donation: Donation, 
  donor: Donor,
  baseMatchingAmount: number
): number => {
  let bonusMultiplier = 1.0;
  
  // First-time donor bonus: +25%
  if (donor.firstTimeContributor) {
    bonusMultiplier += 0.25;
  }
  
  // Early bird (first week) bonus: +10%
  if (donation.earlyBird) {
    bonusMultiplier += 0.1;
  }
  
  // Referral bonus: +5%
  if (donor.referredBy) {
    bonusMultiplier += 0.05;
  }
  
  return baseMatchingAmount * bonusMultiplier;
}; 