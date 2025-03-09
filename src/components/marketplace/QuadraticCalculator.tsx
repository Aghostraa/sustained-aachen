// src/components/marketplace/QuadraticCalculator.tsx
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

interface CalculationResult {
  contribution: number;
  matching: number;
  total: number;
}

const QuadraticCalculator: React.FC = () => {
  const [contribution, setContribution] = useState<number>(10);
  const [contributors, setContributors] = useState<number>(25);
  const [matchingPool, setMatchingPool] = useState<number>(10000);
  const [results, setResults] = useState<CalculationResult>({
    contribution: 10,
    matching: 30,
    total: 40
  });

  // Mock calculation function for quadratic funding
  const calculateMatching = () => {
    // This is a simplified model of quadratic funding
    // In a real implementation, you would use the actual formula:
    // matching = (contributionAmount^2) / (sum of all sqrt(contributions))^2 * matchingPool
    
    const userContribution = contribution;
    const sqrtSum = Math.sqrt(userContribution) * contributors;
    const matching = Math.min((Math.sqrt(userContribution) / sqrtSum) * matchingPool, userContribution * 5);
    
    setResults({
      contribution: userContribution,
      matching: parseFloat(matching.toFixed(2)),
      total: parseFloat((userContribution + matching).toFixed(2))
    });
  };

  useEffect(() => {
    // Calculate initial results
    calculateMatching();
  }, []);

  const handleCalculate = () => {
    calculateMatching();
  };

  return (
    <section className="py-5 bg-light">
      <Container>
        <div className="bg-white rounded-3 shadow-sm p-4 p-md-5 mx-auto" style={{ maxWidth: '1000px' }}>
          <div className="text-center mb-4">
            <h2 className="fw-bold mb-2">Quadratic Funding Calculator</h2>
            <p className="text-secondary">See how your contribution is amplified through community-driven matching</p>
          </div>

          <Row className="g-4 mb-4">
            {/* Input Section */}
            <Col md={6}>
              <div className="bg-light p-4 rounded">
                <Form.Group className="mb-3">
                  <Form.Label className="text-secondary fw-medium small">Your Contribution (€)</Form.Label>
                  <Form.Control 
                    type="number" 
                    value={contribution} 
                    min={1} 
                    onChange={(e) => setContribution(parseFloat(e.target.value) || 0)} 
                  />
                </Form.Group>
                
                <Form.Group className="mb-3">
                  <Form.Label className="text-secondary fw-medium small">Number of Contributors</Form.Label>
                  <Form.Control 
                    type="number" 
                    value={contributors} 
                    min={1} 
                    onChange={(e) => setContributors(parseInt(e.target.value) || 0)} 
                  />
                </Form.Group>
                
                <Form.Group className="mb-4">
                  <Form.Label className="text-secondary fw-medium small">Matching Pool (€)</Form.Label>
                  <Form.Control 
                    type="number" 
                    value={matchingPool} 
                    min={100} 
                    onChange={(e) => setMatchingPool(parseInt(e.target.value) || 0)} 
                  />
                </Form.Group>
                
                <Button 
                  variant="primary" 
                  className="w-100" 
                  onClick={handleCalculate}
                >
                  Calculate Impact
                </Button>
              </div>
            </Col>

            {/* Results Section */}
            <Col md={6} className="d-flex flex-column">
              <div className="mb-4">
                <Row className="g-2">
                  <Col>
                    <div className="text-center p-3 bg-light rounded">
                      <div className="text-secondary small mb-1">Your Contribution</div>
                      <div className="fw-bold fs-5">€{results.contribution.toFixed(2)}</div>
                    </div>
                  </Col>
                  <Col>
                    <div className="text-center p-3 bg-primary text-white rounded">
                      <div className="small mb-1">Matching</div>
                      <div className="fw-bold fs-5">€{results.matching.toFixed(2)}</div>
                    </div>
                  </Col>
                  <Col>
                    <div className="text-center p-3 bg-light rounded">
                      <div className="text-secondary small mb-1">Total Impact</div>
                      <div className="fw-bold fs-5">€{results.total.toFixed(2)}</div>
                    </div>
                  </Col>
                </Row>
              </div>

              <div className="flex-grow-1 d-flex flex-column justify-content-center border-top pt-4">
                <div className="text-center mb-3">
                  <h3 className="fs-5 fw-bold">Power of Many vs One</h3>
                </div>
                
                <Row className="g-3 mb-4">
                  <Col>
                    <div className="p-3 bg-light rounded text-center">
                      <div className="fw-medium mb-1">Small Contributions</div>
                      <div className="text-secondary small">100 × €10 = €2,500 match</div>
                    </div>
                  </Col>
                  <Col>
                    <div className="p-3 bg-light rounded text-center">
                      <div className="fw-medium mb-1">Large Contribution</div>
                      <div className="text-secondary small">1 × €1,000 = €500 match</div>
                    </div>
                  </Col>
                </Row>

                <div className="p-3 bg-light rounded">
                  <p className="small text-secondary mb-0">
                    Quadratic funding prioritizes broad community participation over large individual contributions. 
                    Many small contributions receive more matching funds than a single large contribution of the same total value.
                  </p>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </Container>
    </section>
  );
};

export default QuadraticCalculator; 