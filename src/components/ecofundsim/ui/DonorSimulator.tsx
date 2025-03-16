// src/components/ecofundsim/ui/DonorSimulator.tsx
import React, { useState } from 'react';
import { Card, Form, Button, Row, Col, InputGroup, Badge } from 'react-bootstrap';
import { Project, Donor, Donation } from '../models/SimulationModels';
import { createDonation } from '../SimulationEngine';
import { generateDonations } from '../utils/DonationGenerator';
import { v4 as uuidv4 } from 'uuid';

interface DonorSimulatorProps {
  projects: Project[];
  donors: Donor[];
  onAddDonation: (donation: Donation) => void;
  onAddDonor: (donor: Donor) => void;
  onBulkDonationsAdded?: (count: number) => void;
}

const DonorSimulator: React.FC<DonorSimulatorProps> = ({ 
  projects, 
  donors, 
  onAddDonation,
  onAddDonor,
  onBulkDonationsAdded 
}) => {
  const [selectedProjectId, setSelectedProjectId] = useState<string>(projects[0]?.id || '');
  const [selectedDonorId, setSelectedDonorId] = useState<string>(donors[0]?.id || '');
  const [donationAmount, setDonationAmount] = useState<number>(250);
  const [newDonorName, setNewDonorName] = useState<string>('');
  const [verificationType, setVerificationType] = useState<'none' | 'email' | 'phone' | 'id'>('email');
  const [firstTime, setFirstTime] = useState<boolean>(true);
  const [bulkDonationsCount, setBulkDonationsCount] = useState<number>(50);
  const [donationPattern, setDonationPattern] = useState<'grassroots' | 'realistic' | 'whale-dominated' | 'custom'>('grassroots');
  
  // Handle single donation submission
  const handleDonationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (selectedProjectId && selectedDonorId && donationAmount > 0) {
      const donation = createDonation(selectedProjectId, selectedDonorId, donationAmount);
      onAddDonation(donation);
      
      // Reset form
      setDonationAmount(25);
    }
  };
  
  // Handle new donor creation
  const handleCreateDonor = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (newDonorName.trim()) {
      const newDonor: Donor = {
        id: uuidv4(),
        name: newDonorName.trim(),
        verificationType,
        firstTimeContributor: firstTime
      };
      
      onAddDonor(newDonor);
      setSelectedDonorId(newDonor.id);
      setNewDonorName('');
    }
  };
  
  // Handle bulk donation generation
  const handleBulkDonations = () => {
    if (bulkDonationsCount <= 0) return;
    
    // Get form elements for custom pattern if needed
    let customRanges;
    if (donationPattern === 'custom') {
      const smallPercentEl = document.querySelector('input[type="number"][defaultValue="70"]') as HTMLInputElement;
      const mediumPercentEl = document.querySelector('input[type="number"][defaultValue="25"]') as HTMLInputElement;
      const largePercentEl = document.querySelector('input[type="number"][defaultValue="5"]') as HTMLInputElement;
      
      if (smallPercentEl && mediumPercentEl && largePercentEl) {
        customRanges = {
          small: Number(smallPercentEl.value) || 70,
          medium: Number(mediumPercentEl.value) || 25,
          large: Number(largePercentEl.value) || 5
        };
      }
    }
    
    // Generate bulk donations with the selected pattern
    const bulkDonations = generateDonations(
      projects,
      donors,
      bulkDonationsCount,
      donationPattern,
      customRanges
    );
    
    // Add each donation
    bulkDonations.forEach(donation => {
      onAddDonation(donation);
    });
    
    // Notify parent component about bulk donation completion
    if (onBulkDonationsAdded) {
      onBulkDonationsAdded(bulkDonationsCount);
    } else {
      // Provide user feedback if no callback provided
      alert(`Successfully generated ${bulkDonationsCount} donations!`);
    }
  };
  
  return (
    <Card className="mt-4">
      <Card.Header>Donor Simulator</Card.Header>
      <Card.Body>
        <Row>
          <Col md={6}>
            <Form onSubmit={handleDonationSubmit}>
              <h5>Add Individual Donation</h5>
              
              <Form.Group className="mb-3">
                <Form.Label>Project</Form.Label>
                <Form.Select
                  value={selectedProjectId}
                  onChange={(e) => setSelectedProjectId(e.target.value)}
                  required
                >
                  {projects.map(project => (
                    <option key={project.id} value={project.id}>
                      {project.title}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
              
              <Form.Group className="mb-3">
                <Form.Label>Donor</Form.Label>
                <Form.Select
                  value={selectedDonorId}
                  onChange={(e) => setSelectedDonorId(e.target.value)}
                  required
                >
                  {donors.map(donor => (
                    <option key={donor.id} value={donor.id}>
                      {donor.name} {donor.firstTimeContributor ? '(First time)' : ''} 
                      {donor.verificationType !== 'none' ? ` (${donor.verificationType})` : ''}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
              
              <Form.Group className="mb-3">
                <Form.Label>Amount (€)</Form.Label>
                <Form.Control
                  type="number"
                  min={1}
                  value={donationAmount}
                  onChange={(e) => setDonationAmount(Number(e.target.value))}
                  required
                />
                <div className="d-flex flex-wrap gap-1 mt-2">
                  {[5, 10, 25, 50, 100, 500].map(amount => (
                    <Badge 
                      key={amount}
                      bg="secondary" 
                      className="p-2 clickable"
                      onClick={() => setDonationAmount(amount)}
                      style={{ cursor: 'pointer' }}
                    >
                      €{amount}
                    </Badge>
                  ))}
                </div>
              </Form.Group>
              
              <Button type="submit" variant="primary" className="w-100">
                Add Donation
              </Button>
            </Form>
            
            <hr />
            
            <Form onSubmit={handleCreateDonor} className="mt-3">
              <h5>Add New Donor</h5>
              
              <Form.Group className="mb-3">
                <Form.Label>Donor Name</Form.Label>
                <Form.Control
                  type="text"
                  value={newDonorName}
                  onChange={(e) => setNewDonorName(e.target.value)}
                  placeholder="Enter donor name"
                  required
                />
              </Form.Group>
              
              <Row className="mb-3">
                <Col>
                  <Form.Group>
                    <Form.Label>Verification</Form.Label>
                    <Form.Select
                      value={verificationType}
                      onChange={(e) => setVerificationType(e.target.value as any)}
                    >
                      <option value="none">None</option>
                      <option value="email">Email</option>
                      <option value="phone">Phone</option>
                      <option value="id">ID</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mt-2">
                    <Form.Check
                      type="checkbox"
                      label="First-time donor"
                      checked={firstTime}
                      onChange={(e) => setFirstTime(e.target.checked)}
                      className="mt-4"
                    />
                  </Form.Group>
                </Col>
              </Row>
              
              <Button type="submit" variant="outline-primary" className="w-100">
                Create Donor
              </Button>
            </Form>
          </Col>
          
          <Col md={6}>
            <h5>Generate Bulk Donations</h5>
            <p className="text-muted small">
              Quickly generate multiple donations with realistic patterns to test different scenarios.
            </p>
            
            <Form.Group className="mb-3">
              <Form.Label>Number of Donations</Form.Label>
              <Form.Control
                type="number"
                min={1}
                max={100}
                value={bulkDonationsCount}
                onChange={(e) => setBulkDonationsCount(Number(e.target.value))}
              />
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label>Donation Pattern</Form.Label>
              <Form.Select
                value={donationPattern}
                onChange={(e) => setDonationPattern(e.target.value as any)}
              >
                <option value="realistic">Realistic (Mostly small donations)</option>
                <option value="whale-dominated">Whale-dominated (Few large donations)</option>
                <option value="grassroots">Grassroots (Many small donations)</option>
                <option value="custom">Custom</option>
              </Form.Select>
              <Form.Text className="text-muted">
                Choose a pattern to test different funding scenarios
              </Form.Text>
            </Form.Group>
            
            {donationPattern === 'custom' && (
              <Card className="mb-3 bg-light">
                <Card.Body>
                  <p className="small mb-2">Distribution (enter approximate percentages):</p>
                  <Row>
                    <Col>
                      <Form.Group className="mb-2">
                        <Form.Label className="small">Small (€5-€30)</Form.Label>
                        <InputGroup size="sm">
                          <Form.Control type="number" defaultValue={70} />
                          <InputGroup.Text>%</InputGroup.Text>
                        </InputGroup>
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group className="mb-2">
                        <Form.Label className="small">Medium (€31-€200)</Form.Label>
                        <InputGroup size="sm">
                          <Form.Control type="number" defaultValue={25} />
                          <InputGroup.Text>%</InputGroup.Text>
                        </InputGroup>
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group className="mb-2">
                        <Form.Label className="small">Large (€200+)</Form.Label>
                        <InputGroup size="sm">
                          <Form.Control type="number" defaultValue={5} />
                          <InputGroup.Text>%</InputGroup.Text>
                        </InputGroup>
                      </Form.Group>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            )}
            
            <Button 
              variant="primary" 
              className="w-100"
              onClick={handleBulkDonations}
              disabled={bulkDonationsCount <= 0}
            >
              Generate {bulkDonationsCount} Donations
            </Button>
            
            <div className="mt-4">
              <h5>Current Simulation Stats</h5>
              <div className="d-flex justify-content-between border-bottom py-2">
                <span>Total Donors:</span>
                <strong>{donors.length}</strong>
              </div>
              <div className="d-flex justify-content-between border-bottom py-2">
                <span>Total Projects:</span>
                <strong>{projects.length}</strong>
              </div>
            </div>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default DonorSimulator; 