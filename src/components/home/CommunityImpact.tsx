// src/components/home/CommunityImpact.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { FaArrowRight } from 'react-icons/fa';

const CommunityImpact: React.FC = () => {
  return (
    <section className="bg-light py-5">
      <Container>
        <div className="text-center mb-5">
          <h2 className="fw-bold mb-3">Community Progress</h2>
          <p className="text-secondary mx-auto" style={{ maxWidth: '700px' }}>
            Together, we're making Aachen more sustainable every day
          </p>
        </div>
        
        <Row className="g-4 mb-5">
          <Col sm={6} lg={3}>
            <Card className="text-center h-100 shadow-sm hover-lift">
              <Card.Body className="p-4">
                <h3 className="display-6 fw-bold text-primary mb-2">15.8k</h3>
                <div className="text-secondary">Tons CO₂ Prevented</div>
              </Card.Body>
            </Card>
          </Col>
          
          <Col sm={6} lg={3}>
            <Card className="text-center h-100 shadow-sm hover-lift">
              <Card.Body className="p-4">
                <h3 className="display-6 fw-bold text-primary mb-2">42%</h3>
                <div className="text-secondary">Waste Reduction</div>
              </Card.Body>
            </Card>
          </Col>
          
          <Col sm={6} lg={3}>
            <Card className="text-center h-100 shadow-sm hover-lift">
              <Card.Body className="p-4">
                <h3 className="display-6 fw-bold text-primary mb-2">64</h3>
                <div className="text-secondary">Active Projects</div>
              </Card.Body>
            </Card>
          </Col>
          
          <Col sm={6} lg={3}>
            <Card className="text-center h-100 shadow-sm hover-lift">
              <Card.Body className="p-4">
                <h3 className="display-6 fw-bold text-primary mb-2">3.2k</h3>
                <div className="text-secondary">Community Members</div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        
        <Card className="border-0 shadow-sm overflow-hidden">
          <Row className="g-0">
            <Col lg={5} className="bg-light d-flex align-items-center">
              <img 
                src="/assets/community-garden.jpg" 
                alt="Community Garden Project" 
                className="img-fluid w-100 h-100 object-fit-cover" 
                style={{ minHeight: '300px', objectFit: 'cover' }}
              />
            </Col>
            <Col lg={7}>
              <Card.Body className="p-4 p-lg-5">
                <h3 className="fw-bold mb-3">Success Story: Urban Gardens Initiative</h3>
                <p className="mb-4">
                  Starting with just 2 locations in 2023, Aachen's Urban Gardens Initiative has expanded to 14 community gardens across all districts, producing over 2 tons of organic vegetables annually and creating green spaces accessible to 15,000+ residents.
                </p>
                <Link to="/impact" className="text-primary fw-semibold text-decoration-none d-inline-flex align-items-center gap-2">
                  Read more success stories <FaArrowRight />
                </Link>
              </Card.Body>
            </Col>
          </Row>
        </Card>
      </Container>
    </section>
  );
};

export default CommunityImpact;