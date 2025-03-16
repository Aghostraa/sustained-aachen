// src/components/home/QuadraticFunding.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card, ProgressBar, Button, Alert } from 'react-bootstrap';
import { projectsData } from '../../data/projectData';

interface ProjectCardProps {
  id: string;
  initial: string;
  title: string;
  description: string;
  raised: number;
  contributors: number;
  progress: number;
  bgColor: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ 
  id,
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
        <span>€{raised.toFixed(2)} raised</span>
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
        to={`/project/${id}`} 
        variant="primary" 
        className="w-100 rounded-0"
      >
        Fund This Project
      </Button>
    </Card.Footer>
  </Card>
);

const QuadraticFunding: React.FC = () => {
  // Get the first 3 projects from projectsData
  const featuredProjects = Object.values(projectsData).slice(0, 3);

  // Map project data to color variants
  const colorVariants = ['success', 'primary', 'warning'];

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
              <p className="mb-2 fw-bold">F<sup>p</sup> = (∑<sub>i</sub> √c<sup>p</sup><sub>i</sub>)² - ∑<sub>i</sub> c<sup>p</sup><sub>i</sub></p>
              <p className="mb-0 small text-secondary">Where F<sup>p</sup> is the matching amount for project p, and c<sup>p</sup><sub>i</sub> is the contribution of person i to project p</p>
            </div>
            <Alert variant="primary" className="mb-4">
              <strong>Example:</strong> 25 people contributing €10 each (€250 total) would receive more matching funds than 1 person contributing €250, because (25 × √10)² - 250 {'>'}  (1 × √250)² - 250
            </Alert>
            <Button href="#calculator" variant="outline-primary" className="fw-semibold">
              Go to the round simulation
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
            {featuredProjects.map((project, index) => (
              <Col md={4} key={project.id}>
                <ProjectCard 
                  id={project.id}
                  initial={project.iconText}
                  title={project.title}
                  description={project.description.substring(0, 100) + '...'}
                  raised={project.amountRaised}
                  contributors={project.contributors}
                  progress={Math.round((project.amountRaised / project.targetAmount) * 100)}
                  bgColor={colorVariants[index % colorVariants.length]}
                />
              </Col>
            ))}
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
      </Container>
    </section>
  );
};

export default QuadraticFunding;