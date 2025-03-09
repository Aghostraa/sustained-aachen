// src/components/home/Hero.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';

const Hero: React.FC = () => {
  return (
    <section className="py-5 bg-light">
      <Container>
        <Row className="align-items-center gy-4">
          <Col lg={6}>
            <h1 className="fw-bold mb-4 display-5">
              Sustained Aachen: Amplifying Individual Actions for Collective Impact
            </h1>
            <p className="lead mb-4 text-secondary">
              A community-driven platform that connects, celebrates, and scales regenerative initiatives through transparent funding and impact tracking.
            </p>
            <div className="d-flex flex-column flex-sm-row gap-3">
              <Button 
                as={Link as any} 
                to="/marketplace" 
                variant="primary" 
                className="fw-semibold"
              >
                Explore Projects
              </Button>
              <Button 
                as={Link as any} 
                to="/submit-project" 
                variant="outline-primary" 
                className="fw-semibold"
              >
                Submit Project
              </Button>
            </div>
          </Col>
          <Col lg={6} className="text-center">
            <img 
              src="/assets/aachen-sustainability.svg" 
              alt="Aachen Sustainability Illustration" 
              className="img-fluid"
              style={{ maxHeight: '400px' }}
            />
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Hero;