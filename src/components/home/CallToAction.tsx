// src/components/home/CallToAction.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';

const CallToAction: React.FC = () => {
  return (
    <section className="bg-primary text-white py-5">
      <Container className="text-center">
        <Row className="justify-content-center">
          <Col md={8} lg={6}>
            <h2 className="display-6 fw-bold mb-3">Join the Sustained Community</h2>
            <p className="mb-4">Be part of Aachen's journey to become a more sustainable, resilient, and connected city.</p>
            
            <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center">
              <Button 
                as={Link as any} 
                to="/signup" 
                variant="light" 
                className="fw-semibold text-primary"
              >
                Sign Up
              </Button>
              <Button 
                as={Link as any} 
                to="/marketplace" 
                variant="outline-light" 
                className="fw-semibold"
              >
                Explore Projects
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default CallToAction;