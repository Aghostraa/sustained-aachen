import React from 'react';
import { Container, Row, Col, Badge } from 'react-bootstrap';
import { Project } from '../project/ProjectHero';

interface ProjectAdminHeaderProps {
  project: Project;
}

const ProjectAdminHeader: React.FC<ProjectAdminHeaderProps> = ({ project }) => {
  return (
    <section className="bg-light py-4 border-bottom">
      <Container>
        <Row className="align-items-center">
          <Col xs={12} md={8}>
            <div className="d-flex align-items-center">
              <div 
                className="d-flex align-items-center justify-content-center rounded-circle text-white"
                style={{ 
                  width: 60, 
                  height: 60, 
                  fontSize: '1.2rem',
                  backgroundColor: project.iconColor 
                }}
              >
                {project.iconText}
              </div>
              <div className="ms-3">
                <div className="d-flex align-items-center">
                  <h1 className="h3 mb-1 me-2">{project.title}</h1>
                  <Badge bg="success" className="ms-2">Admin Dashboard</Badge>
                </div>
                <p className="text-muted mb-0">
                  {project.date} • {project.contributors} Contributors
                </p>
              </div>
            </div>
          </Col>
          
          <Col xs={12} md={4} className="mt-3 mt-md-0">
            <div className="d-flex justify-content-md-end">
              <div className="text-end">
                <div className="fw-bold">Project Status</div>
                <div className="d-flex">
                  {project.tags.slice(0, 3).map((tag, index) => (
                    <Badge 
                      key={index} 
                      bg="secondary" 
                      className="me-1"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default ProjectAdminHeader; 