// src/components/ecofundsim/ui/FormulaPicker.tsx
import React, { useState, useEffect } from 'react';
import { Card, Form, Row, Col, Accordion } from 'react-bootstrap';
import { SimulationConfig } from '../models/SimulationModels';

interface FormulaPickerProps {
  config: SimulationConfig;
  onUpdateConfig: (config: Partial<SimulationConfig>) => void;
}

const FormulaPicker: React.FC<FormulaPickerProps> = ({ config, onUpdateConfig }) => {
  const [activeKey, setActiveKey] = useState<string>('0');
  
  // Update the active key when formula type changes
  useEffect(() => {
    switch (config.formulaType) {
      case 'standard':
        setActiveKey('0');
        break;
      case 'capped':
        setActiveKey('1');
        break;
      case 'two-tier':
        setActiveKey('2');
        break;
      case 'declining':
        setActiveKey('3');
        break;
    }
  }, [config.formulaType]);
  
  // Handler for formula selection
  const handleFormulaSelect = (eventKey: string | string[] | null | undefined) => {
    if (eventKey === null || eventKey === undefined) return;
    
    // Convert to string if it's an array
    const key = Array.isArray(eventKey) ? eventKey[0] : eventKey;
    setActiveKey(key);
    
    // Update formula type based on selected accordion item
    let formulaType: 'standard' | 'capped' | 'two-tier' | 'declining';
    
    switch (key) {
      case '1':
        formulaType = 'capped';
        break;
      case '2':
        formulaType = 'two-tier';
        break;
      case '3':
        formulaType = 'declining';
        break;
      default:
        formulaType = 'standard';
    }
    
    onUpdateConfig({ formulaType });
  };
  
  // Handler for parameter updates
  const handleParamChange = (param: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    if (!isNaN(value)) {
      onUpdateConfig({
        formulaParams: {
          ...config.formulaParams,
          [param]: value
        }
      });
    }
  };
  
  return (
    <Card className="mb-4">
      <Card.Header>QF Formula Selection</Card.Header>
      <Card.Body>
        <p className="mb-3">
          Select a quadratic funding formula variant to use in the simulation:
        </p>
        
        <Accordion activeKey={activeKey} onSelect={handleFormulaSelect}>
          <Accordion.Item eventKey="0">
            <Accordion.Header>Standard QF</Accordion.Header>
            <Accordion.Body>
              <p>The original quadratic funding formula:</p>
              <div className="formula-display bg-light p-2 my-2 border">
                <code>F^p = (∑_i √c^p_i)² - ∑_i c^p_i</code>
              </div>
              <p className="text-muted small">
                This basic formula calculates matching by squaring the sum of square roots of all
                contributions, then subtracting the sum of direct contributions.
              </p>
              <div className="pros-cons mt-3">
                <p className="mb-1"><strong>Pros:</strong> Simple, well-studied, maximizes preference expression</p>
                <p className="mb-0"><strong>Cons:</strong> Vulnerable to whale donor influence and collusion</p>
              </div>
            </Accordion.Body>
          </Accordion.Item>
          
          <Accordion.Item eventKey="1">
            <Accordion.Header>Capped Contributions</Accordion.Header>
            <Accordion.Body>
              <p>Limits individual contribution influence:</p>
              <div className="formula-display bg-light p-2 my-2 border">
                <code>F^p = (∑_i min(√c^p_i, √cap))² + ∑_i max(0, c^p_i - cap)</code>
              </div>
              <p className="text-muted small">
                This formula caps the quadratic matching effect at a certain threshold,
                with amounts above the cap added directly without matching amplification.
              </p>
              
              <Form.Group className="mt-3">
                <Form.Label>Contribution Cap (€)</Form.Label>
                <Form.Range
                  min={50}
                  max={500}
                  step={10}
                  value={config.formulaParams.cap || 200}
                  onChange={handleParamChange('cap')}
                />
                <Row>
                  <Col xs={4}>€50</Col>
                  <Col xs={4} className="text-center">€{config.formulaParams.cap || 200}</Col>
                  <Col xs={4} className="text-end">€500</Col>
                </Row>
                <Form.Text className="text-muted">
                  Contributions above this amount receive no quadratic matching amplification
                </Form.Text>
              </Form.Group>
              
              <div className="pros-cons mt-3">
                <p className="mb-1"><strong>Pros:</strong> Simple to explain, reduces whale influence</p>
                <p className="mb-0"><strong>Cons:</strong> Sharp cutoff at the cap value</p>
              </div>
            </Accordion.Body>
          </Accordion.Item>
          
          <Accordion.Item eventKey="2">
            <Accordion.Header>Two-Tier Matching</Accordion.Header>
            <Accordion.Body>
              <p>Applies different matching rates to small and large donations:</p>
              <div className="formula-display bg-light p-2 my-2 border">
                <code>F^p = α1(∑_i √min(c^p_i, t))² + α2(∑_i (max(0, √c^p_i - √t)))² + ∑_i c^p_i</code>
              </div>
              <p className="text-muted small">
                This formula splits each contribution into two parts: below a threshold (matched at rate α1)
                and above the threshold (matched at a lower rate α2).
              </p>
              
              <Form.Group className="mt-3">
                <Form.Label>Tier Threshold (€)</Form.Label>
                <Form.Range
                  min={10}
                  max={100}
                  step={5}
                  value={config.formulaParams.threshold || 50}
                  onChange={handleParamChange('threshold')}
                />
                <Row>
                  <Col xs={4}>€10</Col>
                  <Col xs={4} className="text-center">€{config.formulaParams.threshold || 50}</Col>
                  <Col xs={4} className="text-end">€100</Col>
                </Row>
              </Form.Group>
              
              <Row className="mt-3">
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Small Donation Rate (α1)</Form.Label>
                    <Form.Range
                      min={0.3}
                      max={0.9}
                      step={0.05}
                      value={config.formulaParams.alpha1 || 0.7}
                      onChange={handleParamChange('alpha1')}
                    />
                    <Form.Text className="text-center d-block">
                      {config.formulaParams.alpha1 || 0.7}
                    </Form.Text>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Large Donation Rate (α2)</Form.Label>
                    <Form.Range
                      min={0.1}
                      max={0.5}
                      step={0.05}
                      value={config.formulaParams.alpha2 || 0.3}
                      onChange={handleParamChange('alpha2')}
                    />
                    <Form.Text className="text-center d-block">
                      {config.formulaParams.alpha2 || 0.3}
                    </Form.Text>
                  </Form.Group>
                </Col>
              </Row>
              
              <div className="pros-cons mt-3">
                <p className="mb-1"><strong>Pros:</strong> Flexible, smooth transition between tiers</p>
                <p className="mb-0"><strong>Cons:</strong> More complex to explain to participants</p>
              </div>
            </Accordion.Body>
          </Accordion.Item>
          
          <Accordion.Item eventKey="3">
            <Accordion.Header>Declining Marginal Matching</Accordion.Header>
            <Accordion.Body>
              <p>Applies a power function to reduce the impact of larger donations:</p>
              <div className="formula-display bg-light p-2 my-2 border">
                <code>F^p = (∑_i (c^p_i)^β)^(1/β) + ∑_i c^p_i</code>
              </div>
              <p className="text-muted small">
                This formula uses a parameter β &lt; 1 to create declining marginal returns on larger
                donations, reducing whale influence while maintaining contribution continuity.
              </p>
              
              <Form.Group className="mt-3">
                <Form.Label>Beta Parameter (β): {config.formulaParams.beta || 0.7}</Form.Label>
                <Form.Range
                  min={0.5}
                  max={0.9}
                  step={0.05}
                  value={config.formulaParams.beta || 0.7}
                  onChange={handleParamChange('beta')}
                />
                <Row>
                  <Col xs={4}>0.5 (More equalizing)</Col>
                  <Col xs={4} className="text-end">0.9 (Less equalizing)</Col>
                </Row>
                <Form.Text className="text-muted">
                  Lower values of β more aggressively reduce the matching power of large donations
                </Form.Text>
              </Form.Group>
              
              <div className="pros-cons mt-3">
                <p className="mb-1"><strong>Pros:</strong> Smooth curve, no sharp cutoffs</p>
                <p className="mb-0"><strong>Cons:</strong> Mathematical complexity may be hard to communicate</p>
              </div>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </Card.Body>
    </Card>
  );
};

export default FormulaPicker; 