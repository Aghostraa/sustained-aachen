import React, { useState, useEffect } from 'react';
import { Card, Form, Button, Alert } from 'react-bootstrap';
import { FaInfoCircle } from 'react-icons/fa';
import { QFProject } from './QFProjectCard';

interface DonationFormProps {
  project: QFProject;
  onDonate: (amount: number, name: string) => void;
  matchingImpact: number;
  isCalculating: boolean;
  onAmountChange: (amount: number) => void;
}

const DonationForm: React.FC<DonationFormProps> = ({ 
  project, 
  onDonate,
  matchingImpact,
  isCalculating,
  onAmountChange
}) => {
  const [amount, setAmount] = useState<number>(5);
  const [name, setName] = useState<string>('');
  const [customAmount, setCustomAmount] = useState<boolean>(false);
  
  // Common donation amounts
  const suggestedAmounts = [1, 2, 5, 10, 100];
  
  useEffect(() => {
    onAmountChange(amount);
  }, [amount, onAmountChange]);
  
  const handleDonate = () => {
    if (amount <= 0) return;
    onDonate(amount, name);
  };
  
  return (
    <Card className="border-0 shadow-sm mb-4">
      <Card.Header className="bg-white border-0">
        <h5 className="mb-0">Support {project.title}</h5>
      </Card.Header>
      <Card.Body>
        <Alert variant="info" className="mb-3">
          <FaInfoCircle className="me-2" />
          QF multipliers change as more people donate. Your impact is maximized when you donate to projects with broad community support!
        </Alert>
        
        <Form>
          
          {/* Amount Input */}
          <Form.Group className="mb-4">
            <Form.Label>Donation amount (€)</Form.Label>
            {!customAmount && (
              <div className="d-flex flex-wrap gap-2 mb-3">
                {suggestedAmounts.map((suggestedAmount) => (
                  <Button
                    key={suggestedAmount}
                    variant={amount === suggestedAmount ? "primary" : "outline-primary"}
                    onClick={() => setAmount(suggestedAmount)}
                    className="px-3 py-2"
                  >
                    €{suggestedAmount}
                  </Button>
                ))}
                <Button
                  variant="outline-secondary"
                  onClick={() => setCustomAmount(true)}
                  className="px-3 py-2"
                >
                  Custom
                </Button>
              </div>
            )}
            
            {customAmount && (
              <div className="mb-3">
                <Form.Control 
                  type="number" 
                  min="1"
                  step="1"
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                />
                <div className="mt-2 text-end">
                  <Button 
                    variant="link" 
                    className="p-0" 
                    onClick={() => setCustomAmount(false)}
                  >
                    Use suggested amounts
                  </Button>
                </div>
              </div>
            )}
          </Form.Group>
          
          {/* Matching Impact */}
          <div className="border p-3 mb-3 rounded bg-light position-relative">
            <div className="text-center mb-2">Your Matching Impact</div>
            <div className="d-flex justify-content-center align-items-center">
              <div className="text-center">
                <div className="fs-3 fw-bold text-success">
                  {isCalculating ? (
                    <span className="fs-5">Calculating...</span>
                  ) : (
                    <>+ €{matchingImpact.toLocaleString(undefined, {maximumFractionDigits: 2})}</>
                  )}
                </div>
                <div className="small text-secondary">in matching funds</div>
              </div>
            </div>
            <div className="text-center mt-2">
              <span className="small text-muted">
                Total impact: €{(amount + matchingImpact).toLocaleString(undefined, {maximumFractionDigits: 2})}
              </span>
            </div>
          </div>
          
          {/* Submit Button */}
          <div className="d-grid">
            <Button 
              variant="primary" 
              size="lg"
              onClick={handleDonate}
              disabled={amount <= 0 || isCalculating}
            >
              Donate €{amount}
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default DonationForm; 