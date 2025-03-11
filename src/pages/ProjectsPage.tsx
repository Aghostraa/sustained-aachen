import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { projectsData } from '../data/projectData';

const ProjectsPage: React.FC = () => {
  return (
    <Container className="py-5">
      <h1 className="text-center mb-5">Local Sustainability Initiatives</h1>
      <p className="text-center mb-5">
        These projects participated in our survey about sustainability initiatives in Aachen.
        Explore their missions, challenges, and opportunities for collaboration.
      </p>
      
      <Row className="g-4">
        {Object.values(projectsData).map((project) => (
          <Col key={project.id} md={6} lg={3}>
            <Card className="h-100 shadow-sm">
              <div 
                className="card-img-top"
                style={{ 
                  height: '200px', 
                  backgroundImage: `url(${project.gallery[0]})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              >
                <div className="p-3 d-flex">
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
              </div>
              <Card.Body>
                <Card.Title>{project.title}</Card.Title>
                <Card.Text className="text-secondary small">
                  {project.description.substring(0, 100)}...
                </Card.Text>
              </Card.Body>
              <Card.Footer className="bg-white border-top-0">
                <div className="d-flex justify-content-between align-items-center">
                  <small className="text-muted">{project.tags.slice(0, 2).join(', ')}</small>
                  <Link to={`/project/${project.id}`} className="btn btn-sm btn-outline-primary">
                    View Details
                  </Link>
                </div>
              </Card.Footer>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ProjectsPage; 