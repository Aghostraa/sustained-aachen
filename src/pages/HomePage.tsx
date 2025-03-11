// src/pages/HomePage.tsx
import React from 'react';
import Hero from '../components/home/Hero';
import IndividualImpact from '../components/home/IndividualImpact';
import CommunityImpact from '../components/home/CommunityImpact';
import QuadraticFunding from '../components/home/QuadraticFunding';
import Governance from '../components/home/Governance';
import Events from '../components/home/Events';
import CallToAction from '../components/home/CallToAction';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { projectsData } from '../data/projectData';

const HomePage: React.FC = () => {
  return (
    <>
      <Hero />
      <IndividualImpact />
      <CommunityImpact />
      <QuadraticFunding />
      <Governance />
      <Events />
      <CallToAction />

      <section className="py-5 bg-light">
        <Container>
          <h2 className="text-center mb-4">Featured Local Initiatives</h2>
          <p className="text-center mb-5">
            Discover sustainability projects in Aachen that participated in our recent survey.
            Learn about their missions, challenges, and how you can get involved.
          </p>
          
          <Row className="g-4 mb-4">
            {Object.values(projectsData).slice(0, 4).map((project) => (
              <Col key={project.id} md={6} lg={3}>
                <Card className="h-100 shadow-sm">
                  <div 
                    className="project-icon-wrapper p-3 d-flex justify-content-center"
                    style={{ backgroundColor: `${project.iconColor}10` }}
                  >
                    <div 
                      className="project-icon d-flex align-items-center justify-content-center rounded-circle text-white"
                      style={{ 
                        width: '50px', 
                        height: '50px', 
                        backgroundColor: project.iconColor,
                        fontSize: '18px',
                        fontWeight: 'bold'
                      }}
                    >
                      {project.iconText}
                    </div>
                  </div>
                  <Card.Body>
                    <Card.Title>{project.title}</Card.Title>
                    <Card.Text className="text-secondary small">
                      {project.description.substring(0, 75)}...
                    </Card.Text>
                  </Card.Body>
                  <Card.Footer className="bg-white border-top-0">
                    <Link to={`/project/${project.id}`} className="btn btn-sm btn-outline-primary w-100">
                      View Project
                    </Link>
                  </Card.Footer>
                </Card>
              </Col>
            ))}
          </Row>
          
          <div className="text-center">
            <Link to="/projects" className="btn btn-primary">
              View All Local Initiatives
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
};

export default HomePage;