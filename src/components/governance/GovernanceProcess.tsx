import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { processStepsData } from './data';

const GovernanceProcess: React.FC = () => {
  return (
    <section className="py-5 bg-light">
      <Container>
        <Row className="justify-content-center text-center mb-5">
          <Col lg={8}>
            <h2 className="fw-bold mb-3">How Governance Works</h2>
            <p className="lead">Our transparent, community-driven process for making decisions</p>
          </Col>
        </Row>
        
        <div className="position-relative mb-5">
          {/* Line connecting steps */}
          <div 
            className="position-absolute d-none d-md-block" 
            style={{ 
              top: '60px', 
              bottom: '60px', 
              left: '49px', 
              width: '2px', 
              backgroundColor: 'var(--bs-primary)',
              opacity: 0.2,
              zIndex: 0
            }}
          ></div>
          
          {processStepsData.map((step) => (
            <Row key={step.number} className="mb-4 position-relative">
              <Col md={1} className="text-center">
                <div 
                  className="d-flex align-items-center justify-content-center rounded-circle bg-primary text-white fw-bold"
                  style={{ 
                    width: '50px', 
                    height: '50px',
                    fontSize: '1.25rem',
                    zIndex: 1,
                    position: 'relative'
                  }}
                >
                  {step.number}
                </div>
              </Col>
              <Col md={11}>
                <div className="bg-white p-4 rounded shadow-sm">
                  <h3 className="h5 fw-bold mb-2">{step.title}</h3>
                  <p className="mb-0 text-muted">{step.description}</p>
                </div>
              </Col>
            </Row>
          ))}
        </div>
        
        <Row className="justify-content-center pt-3">
          <Col md={6} className="d-flex justify-content-center gap-3">
            <Button variant="primary" href="#proposal-form">Create a Proposal</Button>
            <Button variant="outline-primary" href="#active-proposals">See Active Proposals</Button>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default GovernanceProcess; 