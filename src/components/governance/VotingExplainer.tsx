import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';

const VotingExplainer: React.FC = () => {
  return (
    <section className="py-5 bg-light">
      <Container>
        <Row className="justify-content-center text-center mb-5">
          <Col lg={8}>
            <h2 className="fw-bold mb-3">Understanding Quadratic Voting</h2>
            <p className="lead">How our voting system empowers broader community participation</p>
          </Col>
        </Row>
        
        <Row className="align-items-center">
          <Col lg={5} className="mb-4 mb-lg-0">
            <div className="rounded overflow-hidden shadow-sm">
              <img 
                src="https://indigo-advanced-fish-283.mypinata.cloud/ipfs/bafkreigh5o5ybfshalwtlv2onsp25vbqdzwd34xhzmhhs3mqnm63sydhrm" 
                alt="Quadratic Voting Visualization" 
                className="img-fluid w-100"
              />
            </div>
          </Col>
          
          <Col lg={7}>
            <h3 className="h4 fw-bold mb-3">Voting Power = √Points Allocated</h3>
            <p className="mb-4">
              Our governance system uses quadratic voting, where voting power is calculated as the square root of points 
              allocated to a vote. This creates a more equitable system by:
            </p>
            
            <ul className="list-unstyled mb-4">
              {[
                'Ensuring a wider range of voices are heard, not just those with the most resources',
                'Preventing voting power concentration while still allowing for expressing strong preferences',
                'Encouraging the funding of diverse projects that benefit many different community members',
                'Creating stronger collective outcomes by prioritizing proposals with broad support'
              ].map((benefit, index) => (
                <li key={index} className="d-flex align-items-center mb-3">
                  <div className="me-3 text-primary">
                    <i className="fas fa-check-circle fa-lg"></i>
                  </div>
                  <div>{benefit}</div>
                </li>
              ))}
            </ul>
            
            <div className="p-3 bg-white rounded shadow-sm mb-4">
              <p className="mb-0">
                <strong>Example:</strong> If you allocate 25 points to a proposal, your voting power is √25 = 5. 
                If you allocate 100 points, your voting power is √100 = 10. This gives you diminishing returns 
                as you allocate more points.
              </p>
            </div>
            
            <Button variant="outline-primary">
              Learn More About Quadratic Voting
            </Button>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default VotingExplainer; 