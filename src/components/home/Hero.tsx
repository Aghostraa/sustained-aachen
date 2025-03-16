// src/components/home/Hero.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';

const Hero: React.FC = () => {
  return (
    <section 
      className="py-5 position-relative"
      style={{
        backgroundImage: 'url("https://indigo-advanced-fish-283.mypinata.cloud/ipfs/bafybeieo7fwpl6fbijxbh3qycrfulix3dxc3nvwqfsci63j26qe3camemq")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '50vh',
      }}
    >
      {/* Dark overlay for better text readability */}
      <div 
        className="position-absolute top-0 start-0 w-100 h-100"
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
      ></div>
      
      <Container className="position-relative">
        <Row className="align-items-center gy-4 min-vh-75">
          <Col lg={8} className="mx-auto text-center text-white">
            <h1 className="fw-bold mb-4 display-5" style={{ color: 'white' }}>
              Sustained Aachen: Amplifying Individual Actions for Collective Impact
            </h1>
            <p className="lead mb-4">
              A community-driven platform that connects, celebrates, and scales regenerative initiatives through transparent funding and impact tracking.
            </p>
            <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center">
              <Button 
                as={Link as any} 
                to="/projects" 
                variant="primary" 
                className="fw-semibold"
              >
                Explore Projects
              </Button>
              <Button 
                as={Link as any} 
                to="/submit-project" 
                variant="outline-light" 
                className="fw-semibold"
              >
                Submit Project
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Hero;