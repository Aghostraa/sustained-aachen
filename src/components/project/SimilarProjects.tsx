import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

interface SimilarProject {
  id: string;
  title: string;
  iconText: string;
  iconColor: string;
  description: string;
  amountRaised: number;
  contributors: number;
  targetAmount: number;
  progressPercentage: number;
}

interface SimilarProjectsProps {
  projects: SimilarProject[];
}

const SimilarProjects: React.FC<SimilarProjectsProps> = ({ projects }) => {
  return (
    <section className="similar-projects py-5">
      <Container>
        <h2 className="text-center mb-4">Similar Projects</h2>
        <div className="similar-projects-container">
          {projects.map((project, index) => {
            const formattedAmount = project.amountRaised.toLocaleString('de-DE', { 
              style: 'currency', 
              currency: 'EUR' 
            });
            
            return (
              <div className="project-card d-flex flex-column" key={index}>
                <div 
                  className="project-header"
                  style={{ backgroundColor: `${project.iconColor}10` }}
                >
                  <div 
                    className="project-icon"
                    style={{ backgroundColor: project.iconColor }}
                  >
                    {project.iconText}
                  </div>
                  <div className="project-title fw-bold">{project.title}</div>
                </div>
                
                <div className="project-description flex-grow-1">
                  <p className="text-secondary mb-0">{project.description}</p>
                </div>
                
                <div className="project-progress">
                  <div className="progress-label">
                    <span>{formattedAmount} raised</span>
                    <span>{project.contributors} contributors</span>
                  </div>
                  <div className="progress-bar">
                    <div 
                      className="progress-fill" 
                      style={{ width: `${project.progressPercentage}%` }}
                    ></div>
                  </div>
                  <Button 
                    as={Link as any}
                    to={`/project/${project.id}`}
                    variant="primary" 
                    className="w-100"
                  >
                    View Project
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
};

export default SimilarProjects; 