import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Card, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { FaInfoCircle, FaEuroSign, FaCloud, FaHandsHelping } from 'react-icons/fa';

interface SustainabilityAction {
  id: string;
  label: string;
  impact: string;
  co2Reduction: number;
  checked: boolean;
}

interface CalculatorResult {
  funding: number;
  co2Reduction: number;
  communityService: number;
  projectsSupported: string;
}

const ImpactCalculator: React.FC = () => {
  const [monthlyContribution, setMonthlyContribution] = useState<number>(20);
  const [volunteerHours, setVolunteerHours] = useState<number>(4);
  const [actions, setActions] = useState<SustainabilityAction[]>([
    { id: 'action-transport', label: 'Sustainable Transport', impact: '250kg CO₂/year', co2Reduction: 250, checked: true },
    { id: 'action-food', label: 'Local Food Choices', impact: '150kg CO₂/year', co2Reduction: 150, checked: true },
    { id: 'action-energy', label: 'Renewable Energy', impact: '200kg CO₂/year', co2Reduction: 200, checked: false },
    { id: 'action-waste', label: 'Zero Waste Lifestyle', impact: '180kg CO₂/year', co2Reduction: 180, checked: false }
  ]);
  
  const [calculatorResult, setCalculatorResult] = useState<CalculatorResult>({
    funding: 960,
    co2Reduction: 780,
    communityService: 48,
    projectsSupported: '3-4'
  });
  
  // Calculate impact whenever inputs change
  useEffect(() => {
    calculateImpact();
  }, [monthlyContribution, volunteerHours, actions]);
  
  const handleActionToggle = (actionId: string) => {
    setActions(actions.map(action => 
      action.id === actionId 
        ? { ...action, checked: !action.checked } 
        : action
    ));
  };
  
  const calculateImpact = () => {
    // Calculate funding generated (monthly contribution × 12 × matching multiplier)
    const funding = monthlyContribution * 12 * 4;
    
    // Calculate CO2 reduction: volunteer impact + lifestyle actions
    const volunteersImpact = volunteerHours * 12 * 5; // 5kg per volunteer hour
    const actionsImpact = actions
      .filter(action => action.checked)
      .reduce((total, action) => total + action.co2Reduction, 0);
    const co2Reduction = volunteersImpact + actionsImpact;
    
    // Calculate community service hours
    const baseHours = volunteerHours * 12;
    const actionsCount = actions.filter(action => action.checked).length;
    const implementationHours = actionsCount * 12; // 12 hours per action
    const communityService = baseHours + implementationHours;
    
    // Estimate projects supported
    let projectsSupported = '0';
    if (funding > 0) {
      if (funding < 500) projectsSupported = '1-2';
      else if (funding < 1000) projectsSupported = '3-4';
      else if (funding < 2000) projectsSupported = '5-7';
      else projectsSupported = '8+';
    }
    
    setCalculatorResult({
      funding,
      co2Reduction,
      communityService,
      projectsSupported
    });
  };
  
  const InfoTooltip = ({ text }: { text: string }) => (
    <OverlayTrigger
      placement="top"
      overlay={<Tooltip>{text}</Tooltip>}
    >
      <span className="ms-1 text-muted">
        <FaInfoCircle size={14} />
      </span>
    </OverlayTrigger>
  );
  
  return (
    <section className="py-5 bg-light">
      <Container>
        <Row>
          <Col lg={10} className="mx-auto">
            <Card className="border-0 shadow-sm overflow-hidden">
              <Card.Body className="p-0">
                <Row className="g-0">
                  <Col md={5} className="bg-primary text-white p-4 p-lg-5">
                    <div className="mb-4">
                      <h2 className="mb-3">Calculate Your Potential Impact</h2>
                      <p className="mb-0">
                        See how your contributions and actions can help Aachen meet its sustainability goals
                      </p>
                    </div>
                    
                    {/* Result Cards */}
                    <div className="mt-5">
                      <h4 className="mb-4">Your Annual Impact</h4>
                      <Row className="g-3">
                        <Col xs={6}>
                          <div className="bg-white bg-opacity-10 rounded p-3 text-center">
                            <FaEuroSign size={24} className="mb-2" />
                            <div className="h4 mb-1">€{calculatorResult.funding}</div>
                            <div className="small">Funding Generated</div>
                          </div>
                        </Col>
                        <Col xs={6}>
                          <div className="bg-white bg-opacity-10 rounded p-3 text-center">
                            <FaCloud size={24} className="mb-2" />
                            <div className="h4 mb-1">{calculatorResult.co2Reduction} kg</div>
                            <div className="small">CO₂ Reduction</div>
                          </div>
                        </Col>
                        <Col xs={6}>
                          <div className="bg-white bg-opacity-10 rounded p-3 text-center">
                            <FaHandsHelping size={24} className="mb-2" />
                            <div className="h4 mb-1">{calculatorResult.communityService} hrs</div>
                            <div className="small">Community Service</div>
                          </div>
                        </Col>
                        <Col xs={6}>
                          <div className="bg-white bg-opacity-10 rounded p-3 text-center">
                            <div className="h4 mb-1">{calculatorResult.projectsSupported}</div>
                            <div className="small">Projects Supported</div>
                          </div>
                        </Col>
                      </Row>
                      
                      <p className="mt-4 mb-0">
                        Your contributions would directly support approximately {calculatorResult.projectsSupported} local sustainability projects per year!
                      </p>
                    </div>
                  </Col>
                  
                  <Col md={7} className="p-4 p-lg-5">
                    <h3 className="mb-4">Your Sustainability Profile</h3>
                    
                    <Form>
                      <Row className="mb-4">
                        <Col md={6} className="mb-3 mb-md-0">
                          <Form.Group controlId="monthlyContribution">
                            <Form.Label className="d-flex align-items-center">
                              Monthly Contribution
                              <InfoTooltip text="Your monthly financial contribution will be matched up to 4x through our quadratic funding mechanism" />
                            </Form.Label>
                            <div className="input-group">
                              <span className="input-group-text">€</span>
                              <Form.Control
                                type="number"
                                value={monthlyContribution}
                                onChange={(e) => setMonthlyContribution(Number(e.target.value) || 0)}
                                min={1}
                              />
                            </div>
                          </Form.Group>
                        </Col>
                        
                        <Col md={6}>
                          <Form.Group controlId="volunteerHours">
                            <Form.Label className="d-flex align-items-center">
                              Volunteer Hours/Month
                              <InfoTooltip text="Each volunteer hour contributes approximately 5kg CO₂ reduction through various community projects" />
                            </Form.Label>
                            <Form.Control
                              type="number"
                              value={volunteerHours}
                              onChange={(e) => setVolunteerHours(Number(e.target.value) || 0)}
                              min={0}
                            />
                          </Form.Group>
                        </Col>
                      </Row>
                      
                      <Form.Group className="mb-4">
                        <Form.Label className="d-flex align-items-center">
                          Sustainability Actions
                          <InfoTooltip text="Select the sustainable lifestyle changes you're committed to making" />
                        </Form.Label>
                        
                        {actions.map((action) => (
                          <div key={action.id} className="d-flex justify-content-between align-items-center border-bottom py-2">
                            <Form.Check 
                              type="checkbox"
                              id={action.id}
                              label={action.label}
                              checked={action.checked}
                              onChange={() => handleActionToggle(action.id)}
                            />
                            <span className="text-muted small">{action.impact}</span>
                          </div>
                        ))}
                      </Form.Group>
                      
                      <div className="mt-4">
                        <h5>How We Calculate Your Impact</h5>
                        <ul className="text-muted small ps-3">
                          <li className="mb-2">
                            <strong>Funding Generated:</strong> Monthly contribution × 12 × Matching multiplier (4x)
                          </li>
                          <li className="mb-2">
                            <strong>CO₂ Reduction:</strong> Volunteer impact (hours × 12 months × 5kg) + Selected actions
                          </li>
                          <li className="mb-2">
                            <strong>Community Service:</strong> Monthly hours × 12 + Action implementation time
                          </li>
                        </ul>
                      </div>
                      
                      <div className="d-grid mt-4">
                        <Button variant="primary">Start Contributing Now</Button>
                      </div>
                    </Form>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default ImpactCalculator; 