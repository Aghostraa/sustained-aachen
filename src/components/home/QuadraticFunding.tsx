// src/components/home/QuadraticFunding.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card, ProgressBar, Button, Form, Alert } from 'react-bootstrap';

interface ProjectCardProps {
  initial: string;
  title: string;
  description: string;
  raised: string;
  contributors: string;
  progress: number;
  bgColor: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ 
  initial, 
  title, 
  description, 
  raised, 
  contributors, 
  progress, 
  bgColor 
}) => (
  <Card className="h-100 shadow-sm hover-lift border-0 overflow-hidden">
    <Card.Header className={`bg-${bgColor} bg-opacity-10 p-3 d-flex align-items-center gap-3`}>
      <div className={`bg-${bgColor} text-white rounded-circle d-flex align-items-center justify-content-center fw-bold`} style={{ width: '40px', height: '40px' }}>
        {initial}
      </div>
      <h5 className="mb-0 fw-semibold">{title}</h5>
    </Card.Header>
    <Card.Body className="p-3">
      <p className="mb-3">{description}</p>
      <div className="d-flex justify-content-between small text-secondary mb-2">
        <span>{raised} raised</span>
        <span>{contributors} contributors</span>
      </div>
      <ProgressBar 
        variant={bgColor} 
        now={progress} 
        className="mb-3" 
      />
    </Card.Body>
    <Card.Footer className="p-0">
      <Button 
        as={Link as any} 
        to="/marketplace" 
        variant="primary" 
        className="w-100 rounded-0"
      >
        Fund This Project
      </Button>
    </Card.Footer>
  </Card>
);

const QuadraticFunding: React.FC = () => {
  return (
    <section className="py-5 bg-white">
      <Container>
        <div className="text-center mb-5">
          <h2 className="fw-bold mb-3">Quadratic Funding</h2>
          <p className="text-secondary mx-auto" style={{ maxWidth: '700px' }}>
            Where small contributions make a big difference
          </p>
        </div>
        
        <Row className="g-4 mb-5 align-items-center">
          <Col lg={6}>
            <h3 className="fw-bold mb-3">How Quadratic Funding Works</h3>
            <p className="mb-3">
              Quadratic Funding mathematically rewards projects with many contributors over projects with few large donors, creating more democratic funding distribution.
            </p>
            <div className="bg-light p-3 rounded text-center font-monospace mb-3">
              <p className="mb-0">Matching Amount = (√Sum of contributions)² - Sum of contributions</p>
            </div>
            <Alert variant="primary" className="mb-4">
              <strong>Example:</strong> 25 people contributing €10 each generates more matching funds than 1 person contributing €250.
            </Alert>
            <Button href="#calculator" variant="outline-primary" className="fw-semibold">
              Try the Calculator
            </Button>
          </Col>
          <Col lg={6} className="text-center">
            <img 
              src="/assets/quadratic-funding.svg" 
              alt="Quadratic Funding Visualization" 
              className="img-fluid" 
              style={{ maxHeight: '350px' }}
            />
          </Col>
        </Row>
        
        <div className="mb-5">
          <h3 className="text-center fw-bold mb-4">Featured Projects</h3>
          <Row className="g-4">
            <Col md={4}>
              <ProjectCard 
                initial="ER"
                title="Ernährungsrat Aachen"
                description="Regional food hub connecting local farmers with urban consumers."
                raised="€1,427.50"
                contributors="42"
                progress={65}
                bgColor="success"
              />
            </Col>
            
            <Col md={4}>
              <ProjectCard 
                initial="BM"
                title="Bewegungsmelder Aachen"
                description="Platform connecting people with social and environmental initiatives."
                raised="€2,184.75"
                contributors="78"
                progress={83}
                bgColor="primary"
              />
            </Col>
            
            <Col md={4}>
              <ProjectCard 
                initial="AW"
                title="Aachen Was Geht"
                description="Local platform highlighting sustainable events and community initiatives."
                raised="€1,865.22"
                contributors="63"
                progress={75}
                bgColor="warning"
              />
            </Col>
          </Row>
          
          <div className="text-center mt-4">
            <Button 
              as={Link as any} 
              to="/marketplace" 
              variant="outline-primary" 
              className="fw-semibold"
            >
              View All Projects
            </Button>
          </div>
        </div>
        
        <div id="calculator" className="bg-light p-4 p-lg-5 rounded-3">
          <h3 className="text-center fw-bold mb-4">Quadratic Funding Calculator</h3>
          <Row className="g-4">
            <Col lg={6}>
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label className="fw-semibold">Your Contribution (€)</Form.Label>
                  <Form.Control 
                    type="number" 
                    defaultValue="10"
                    min="1"
                  />
                </Form.Group>
                
                <Form.Group className="mb-3">
                  <Form.Label className="fw-semibold">Number of Contributors</Form.Label>
                  <Form.Control 
                    type="number" 
                    defaultValue="50"
                    min="1"
                  />
                </Form.Group>
                
                <Form.Group className="mb-4">
                  <Form.Label className="fw-semibold">Matching Pool Size (€)</Form.Label>
                  <Form.Control 
                    type="number" 
                    defaultValue="15000"
                    min="100"
                  />
                </Form.Group>
                
                <Button variant="primary" className="w-100 fw-semibold">
                  Calculate Impact
                </Button>
              </Form>
            </Col>
            
            <Col lg={6}>
              <Card className="bg-light border-0 mb-3 text-center">
                <Card.Body>
                  <Card.Subtitle className="text-secondary mb-2">Direct Contribution</Card.Subtitle>
                  <Card.Title as="div" className="display-6 fw-bold">€10.00</Card.Title>
                </Card.Body>
              </Card>
              
              <Card className="bg-primary text-white mb-3 text-center">
                <Card.Body>
                  <Card.Subtitle className="text-white opacity-75 mb-2">Matching Amount</Card.Subtitle>
                  <Card.Title as="div" className="display-6 fw-bold">€105.26</Card.Title>
                </Card.Body>
              </Card>
              
              <Card className="bg-light border-0 mb-3 text-center">
                <Card.Body>
                  <Card.Subtitle className="text-secondary mb-2">Total Impact</Card.Subtitle>
                  <Card.Title as="div" className="display-6 fw-bold">€115.26</Card.Title>
                </Card.Body>
              </Card>
              
              <p className="text-center text-secondary">
                Your €10 contribution generates an additional €105.26 in matching funds, multiplying your impact by 11.5x!
              </p>
            </Col>
          </Row>
        </div>
      </Container>
    </section>
  );
};

export default QuadraticFunding;