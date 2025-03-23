import React from 'react';
import { Card, Form, Row, Col, Accordion, Badge } from 'react-bootstrap';
import { FaWrench, FaInfoCircle } from 'react-icons/fa';
import { SimulationConfig } from '../models/SimulationModels';
import QFMethodCompact from './QFMethodCompact';

interface RoundSettingsProps {
  config: SimulationConfig;
  onUpdateConfig: (config: Partial<SimulationConfig>) => void;
}

const RoundSettings: React.FC<RoundSettingsProps> = ({ config, onUpdateConfig }) => {
  // Handler for formula type change
  const handleFormulaChange = (formulaType: 'standard' | 'capped' | 'two-tier' | 'declining') => {
    const formulaParams: any = {};
    
    // Set default values based on formula type
    switch (formulaType) {
      case 'capped':
        formulaParams.cap = 5;
        break;
      case 'two-tier':
        formulaParams.threshold = 3;
        formulaParams.alpha1 = 0.833;
        formulaParams.alpha2 = 0.167;
        break;
      case 'declining':
        formulaParams.beta = 0.7;
        break;
      default:
        break;
    }
    
    onUpdateConfig({ 
      formulaType, 
      formulaParams 
    });
  };
  
  // Handler for specific parameter updates
  const handleParamChange = (param: string, value: number) => {
    onUpdateConfig({
      formulaParams: {
        ...config.formulaParams,
        [param]: value
      }
    });
  };
  
  // Handler for checkbox settings
  const handleFeatureToggle = (feature: 'enableVerification' | 'enableIncentives' | 'enableAntiCollusion' | 'categoricalAllocation', checked: boolean) => {
    onUpdateConfig({ [feature]: checked });
  };
  
  return (
    <Card className="border-0 shadow-sm">
      <Card.Header className="bg-white border-0">
        <div className="d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center">
            <FaWrench className="me-2 text-primary" />
            <h5 className="mb-0">QF Round Settings</h5>
          </div>
          <div>
            <QFMethodCompact config={config} />
          </div>
        </div>
      </Card.Header>
      <Card.Body>
        <Accordion defaultActiveKey="0">
          <Accordion.Item eventKey="0">
            <Accordion.Header>QF Formula Selection</Accordion.Header>
            <Accordion.Body>
              <Form.Group className="mb-3">
                <Form.Label>QF Formula Type</Form.Label>
                <div className="mb-3">
                  <Form.Check
                    type="radio"
                    id="formula-standard"
                    name="formula-type"
                    label={
                      <div>
                        Standard QF
                        <Badge bg="primary" className="ms-2">Default</Badge>
                        <div className="small text-muted">
                          Formula: (Σ√contributions)² - Σcontributions
                        </div>
                      </div>
                    }
                    checked={config.formulaType === 'standard'}
                    onChange={() => handleFormulaChange('standard')}
                    className="mb-2"
                  />
                  
                  <Form.Check
                    type="radio"
                    id="formula-capped"
                    name="formula-type"
                    label={
                      <div>
                        Capped QF
                        <div className="small text-muted">
                          Caps individual contributions to reduce "whale" influence
                        </div>
                      </div>
                    }
                    checked={config.formulaType === 'capped'}
                    onChange={() => handleFormulaChange('capped')}
                    className="mb-2"
                  />
                  
                  {config.formulaType === 'capped' && (
                    <div className="ms-4 mb-3">
                      <Form.Label>Cap amount (€)</Form.Label>
                      <Form.Control
                        type="number"
                        min="1"
                        value={config.formulaParams.cap}
                        onChange={(e) => handleParamChange('cap', Number(e.target.value))}
                      />
                      <Form.Text className="text-muted">
                        Contributions above this amount will be capped
                      </Form.Text>
                    </div>
                  )}
                  
                  <Form.Check
                    type="radio"
                    id="formula-two-tier"
                    name="formula-type"
                    label={
                      <div>
                        Two-Tier QF
                        <div className="small text-muted">
                          Uses different weights for small vs. large contributions
                        </div>
                      </div>
                    }
                    checked={config.formulaType === 'two-tier'}
                    onChange={() => handleFormulaChange('two-tier')}
                    className="mb-2"
                  />
                  
                  {config.formulaType === 'two-tier' && (
                    <div className="ms-4 mb-3">
                      <div className="mb-4">
                        <p className="text-muted mb-2">
                          Two-Tier matching encourages broad participation by applying:
                        </p>
                        <ul className="text-muted small mb-3">
                          <li>A higher matching rate (α1) to small donations below the threshold</li>
                          <li>A lower matching rate (α2) to the portion of donations above the threshold</li>
                        </ul>
                      </div>
                      <Row className="mb-3">
                        <Col md={12}>
                          <Form.Label>Tier Threshold (€)</Form.Label>
                          <Form.Control
                            type="number"
                            min="10"
                            max="100"
                            value={config.formulaParams.threshold}
                            onChange={(e) => handleParamChange('threshold', Number(e.target.value))}
                          />
                          <Form.Text className="text-muted">
                            Recommended: €20-50. Higher thresholds favor smaller donations.
                          </Form.Text>
                        </Col>
                      </Row>
                      <Row>
                        <Col md={12} className="mb-3">
                          <Form.Label>Small Donation Rate (α1)</Form.Label>
                          <div className="d-flex align-items-center gap-2">
                            <Form.Range
                              min={0.1}
                              max={1.0}
                              step={0.1}
                              value={config.formulaParams.alpha1}
                              onChange={(e) => handleParamChange('alpha1', Number(e.target.value))}
                            />
                            <span className="small" style={{ minWidth: '2.5em' }}>{config.formulaParams.alpha1}</span>
                          </div>
                          <Form.Text className="text-muted">
                            Recommended: 0.6-0.8. Higher values increase the impact of small donations.
                          </Form.Text>
                        </Col>
                        <Col md={12}>
                          <Form.Label>Large Donation Rate (α2)</Form.Label>
                          <div className="d-flex align-items-center gap-2">
                            <Form.Range
                              min={0.1}
                              max={0.5}
                              step={0.1}
                              value={config.formulaParams.alpha2}
                              onChange={(e) => handleParamChange('alpha2', Number(e.target.value))}
                            />
                            <span className="small" style={{ minWidth: '2.5em' }}>{config.formulaParams.alpha2}</span>
                          </div>
                          <Form.Text className="text-muted">
                            Recommended: 0.2-0.4. Should be lower than α1 to prioritize small donations.
                          </Form.Text>
                        </Col>
                      </Row>
                    </div>
                  )}
                  
                  <Form.Check
                    type="radio"
                    id="formula-declining"
                    name="formula-type"
                    label={
                      <div>
                        Declining QF
                        <div className="small text-muted">
                          Progressive diminishing returns for larger donations
                        </div>
                      </div>
                    }
                    checked={config.formulaType === 'declining'}
                    onChange={() => handleFormulaChange('declining')}
                    className="mb-2"
                  />
                  
                  {config.formulaType === 'declining' && (
                    <div className="ms-4 mb-3">
                      <Form.Label>Beta (diminishing factor)</Form.Label>
                      <Form.Control
                        type="number"
                        min="0.1"
                        max="0.9"
                        step="0.1"
                        value={config.formulaParams.beta}
                        onChange={(e) => handleParamChange('beta', Number(e.target.value))}
                      />
                      <Form.Text className="text-muted">
                        Higher values result in stronger diminishing returns
                      </Form.Text>
                    </div>
                  )}
                </div>
              </Form.Group>
            </Accordion.Body>
          </Accordion.Item>
          
          <Accordion.Item eventKey="1">
            <Accordion.Header>Advanced Settings</Accordion.Header>
            <Accordion.Body>
              <Form.Group className="mb-3">
                <Form.Label>Matching Pool Size (€)</Form.Label>
                <Form.Control
                  type="number"
                  min="1000"
                  step="1000"
                  value={config.matchingPool}
                  onChange={(e) => onUpdateConfig({ matchingPool: Number(e.target.value) })}
                />
                <Form.Text className="text-muted">
                  Total funds available for matching all projects
                </Form.Text>
              </Form.Group>
              
              <Form.Group className="mb-3">
                <Form.Check
                  type="switch"
                  id="verification-switch"
                  label="Require Verification"
                  checked={config.enableVerification}
                  onChange={(e) => handleFeatureToggle('enableVerification', e.target.checked)}
                />
                <Form.Text className="text-muted">
                  Only count donations from verified contributors
                </Form.Text>
              </Form.Group>
              
              <Form.Group className="mb-3">
                <Form.Check
                  type="switch"
                  id="incentives-switch"
                  label="Early Bird Incentives"
                  checked={config.enableIncentives}
                  onChange={(e) => handleFeatureToggle('enableIncentives', e.target.checked)}
                />
                <Form.Text className="text-muted">
                  Add bonus for early contributors and first-time donors
                </Form.Text>
              </Form.Group>
              
              <Form.Group className="mb-3">
                <Form.Check
                  type="switch"
                  id="anti-collusion-switch"
                  label="Anti-Collusion Measures"
                  checked={config.enableAntiCollusion}
                  onChange={(e) => handleFeatureToggle('enableAntiCollusion', e.target.checked)}
                />
                <Form.Text className="text-muted">
                  Detect and exclude suspicious donation patterns
                </Form.Text>
              </Form.Group>
              
              <Form.Group className="mb-3">
                <Form.Check
                  type="switch"
                  id="categorical-switch"
                  label="Categorical Allocation"
                  checked={config.categoricalAllocation}
                  onChange={(e) => handleFeatureToggle('categoricalAllocation', e.target.checked)}
                />
                <Form.Text className="text-muted">
                  Allocate matching funds evenly across project categories
                </Form.Text>
              </Form.Group>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
        
        <div className="mt-3 p-3 border rounded bg-light">
          <div className="d-flex align-items-start">
            <FaInfoCircle className="text-primary mt-1 me-2" />
            <div className="small">
              <strong>How Quadratic Funding works:</strong>
              <p className="mb-0">
                QF calculates matching by taking the square of the sum of the square roots of contributions, 
                minus the sum of contributions. This gives more weight to many small donations versus a few 
                large ones, encouraging projects with broad community support rather than those backed by a few wealthy donors.
              </p>
            </div>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default RoundSettings; 