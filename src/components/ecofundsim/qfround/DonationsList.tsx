import React from 'react';
import { Card, Table, Badge } from 'react-bootstrap';
import { Donation, Donor } from '../models/SimulationModels';

interface DonationsListProps {
  donations: Donation[];
  donors: Donor[];
  donorInfluence: Array<{
    donorId: string;
    contributionAmount: number;
    matchingGenerated: number;
    influencePercentage: number;
  }>;
}

const DonationsList: React.FC<DonationsListProps> = ({ donations, donors, donorInfluence }) => {
  // Combine donation data with donor information and influence
  const enhancedDonations = donations.map(donation => {
    const donor = donors.find(d => d.id === donation.donorId);
    const influence = donorInfluence.find(d => d.donorId === donation.donorId);
    
    return {
      ...donation,
      donorName: donor?.name || 'Anonymous',
      matchingGenerated: influence?.matchingGenerated || 0,
      influencePercentage: influence?.influencePercentage || 0,
      isFirstTime: donor?.firstTimeContributor || false,
      verificationType: donor?.verificationType || 'none'
    };
  });
  
  // Sort by date, most recent first
  const sortedDonations = [...enhancedDonations].sort((a, b) => 
    new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );
  
  return (
    <Card className="border-0 shadow-sm">
      <Card.Header className="bg-white border-0">
        <h5 className="mb-0">Recent Donations</h5>
      </Card.Header>
      <Card.Body className="p-0">
        <div className="table-responsive" style={{ maxHeight: '400px', overflowY: 'auto' }}>
          <Table hover className="mb-0">
            <thead className="bg-light">
              <tr>
                <th>Donor</th>
                <th>Amount</th>
                <th>Matching Impact</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {sortedDonations.length > 0 ? (
                sortedDonations.map(donation => (
                  <tr key={donation.id}>
                    <td>
                      <div className="d-flex align-items-center">
                        <div>
                          {donation.donorName}
                          {' '}
                          {donation.isFirstTime && (
                            <Badge bg="success" className="ms-1">New</Badge>
                          )}
                        </div>
                      </div>
                    </td>
                    <td>€{donation.amount.toLocaleString()}</td>
                    <td>
                      <div>
                        €{donation.matchingGenerated.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                      </div>
                      <small className="text-muted">
                        {donation.influencePercentage.toFixed(1)}% influence
                      </small>
                    </td>
                    <td>
                      <div>{new Date(donation.timestamp).toLocaleDateString()}</div>
                      <small className="text-muted">
                        {new Date(donation.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </small>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="text-center py-4">
                    No donations yet. Be the first to support this project!
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>
      </Card.Body>
    </Card>
  );
};

export default DonationsList; 