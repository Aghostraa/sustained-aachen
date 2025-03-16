import React from 'react';
import { Form, Button, Card, InputGroup } from 'react-bootstrap';
import { SimulationConfig } from '../models/SimulationModels';

interface ControlPanelProps {
  config: SimulationConfig;
  onUpdateConfig: (config: Partial<SimulationConfig>) => void;
  onReset: () => void;
}

const ControlPanel: React.FC<ControlPanelProps> = ({ config, onUpdateConfig, onReset }) => {
  // Handler for updating the matching pool
  const handleMatchingPoolChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (!isNaN(value) && value >= 0) {
      onUpdateConfig({ matchingPool: value });
    }
  };
  
  // Handler for updating boolean settings
  const handleBooleanConfigChange = (key: keyof SimulationConfig) => (e: React.ChangeEvent<HTMLInputElement>) => {
    onUpdateConfig({ [key]: e.target.checked });
  };
  
  return (
    <Card className="mb-4">
      <Card.Header>Simulation Controls</Card.Header>
      <Card.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Matching Pool Size</Form.Label>
            <InputGroup>
              <InputGroup.Text>€</InputGroup.Text>
              <Form.Control
                type="number"
                min={1000}
                step={1000}
                value={config.matchingPool}
                onChange={handleMatchingPoolChange}
              />
            </InputGroup>
            <Form.Text className="text-muted">
              The total amount of matching funds available
            </Form.Text>
          </Form.Group>
          
          <hr className="my-4" />
          
          <Form.Group className="mb-3">
            <Form.Check
              type="switch"
              id="anti-collusion-switch"
              label="Enable Anti-Collusion Measures"
              checked={config.enableAntiCollusion}
              onChange={handleBooleanConfigChange('enableAntiCollusion')}
            />
            <Form.Text className="text-muted">
              Flag and filter suspicious donation patterns
            </Form.Text>
          </Form.Group>
          
          <Form.Group className="mb-3">
            <Form.Check
              type="switch"
              id="verification-switch"
              label="Enable Verification Requirements"
              checked={config.enableVerification}
              onChange={handleBooleanConfigChange('enableVerification')}
            />
            <Form.Text className="text-muted">
              Require ID verification for larger donations
            </Form.Text>
          </Form.Group>
          
          <Form.Group className="mb-3">
            <Form.Check
              type="switch"
              id="incentives-switch"
              label="Enable Participation Incentives"
              checked={config.enableIncentives}
              onChange={handleBooleanConfigChange('enableIncentives')}
            />
            <Form.Text className="text-muted">
              Bonus matching for first-time/early donors
            </Form.Text>
          </Form.Group>
          
          <Form.Group className="mb-3">
            <Form.Check
              type="switch"
              id="categorical-switch"
              label="Enable Categorical Allocation"
              checked={config.categoricalAllocation}
              onChange={handleBooleanConfigChange('categoricalAllocation')}
            />
            <Form.Text className="text-muted">
              Distribute matching funds equally across categories
            </Form.Text>
          </Form.Group>
          
          <Button 
            variant="warning" 
            onClick={onReset}
            className="mt-3 w-100"
          >
            Reset Simulation
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default ControlPanel; 