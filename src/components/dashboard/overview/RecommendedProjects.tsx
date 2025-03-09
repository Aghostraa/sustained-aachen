import React from 'react';
import { Row, Col, Card, Button, ProgressBar } from 'react-bootstrap';
import { Link } from 'react-router-dom';

interface ProjectCardProps {
  id: string;
  name: string;
  description: string;
  raised: string;
  contributors: number;
  progress: number;
  colorScheme: {
    background: string;
    icon: string;
  };
  initials: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  id,
  name,
  description,
  raised,
  contributors,
  progress,
  colorScheme,
  initials
}) => (
  <Card className="h-100 border-0 shadow-sm">
    <Card.Header 
      className="d-flex align-items-center py-3"
      style={{ backgroundColor: colorScheme.background }}
    >
      <div 
        className="d-flex align-items-center justify-content-center rounded-circle text-white"
        style={{ 
          width: 40, 
          height: 40, 
          backgroundColor: colorScheme.icon,
          fontSize: '0.9rem'
        }}
      >
        {initials}
      </div>
      <div className="fw-semibold ms-2">{name}</div>
    </Card.Header>
    
    <Card.Body className="d-flex flex-column">
      <Card.Text className="text-muted mb-3" style={{ minHeight: '3rem' }}>
        {description}
      </Card.Text>
      
      <div className="mt-auto">
        <div className="d-flex justify-content-between mb-1 small">
          <span>{raised} raised</span>
          <span>{contributors} contributors</span>
        </div>
        
        <ProgressBar 
          variant="primary" 
          now={progress} 
          className="mb-3" 
          style={{ height: '0.5rem' }}
        />
        
        <Button 
          as={Link as any} 
          to={`/project/${id}`} 
          variant="primary" 
          className="w-100"
        >
          View Project
        </Button>
      </div>
    </Card.Body>
  </Card>
);

const RecommendedProjects: React.FC = () => {
  // Mock data for recommended projects (would come from API in a real application)
  const projects: ProjectCardProps[] = [
    {
      id: 'klimaentscheid',
      name: 'Klimaentscheid Aachen',
      description: 'Citizen initiative working to accelerate Aachen\'s path to climate neutrality through policy change and community action.',
      raised: '€1,243.80',
      contributors: 47,
      progress: 62,
      colorScheme: {
        background: 'rgba(99, 102, 241, 0.1)',
        icon: '#6366f1'
      },
      initials: 'KA'
    },
    {
      id: 'aachenwasgeht',
      name: 'Aachen Was Geht',
      description: 'Local platform highlighting sustainable events and community initiatives throughout Aachen.',
      raised: '€1,865.22',
      contributors: 63,
      progress: 75,
      colorScheme: {
        background: 'rgba(245, 158, 11, 0.1)',
        icon: '#f59e0b'
      },
      initials: 'AW'
    }
  ];

  return (
    <Row className="g-3">
      {projects.map(project => (
        <Col key={project.id} xs={12} md={6}>
          <ProjectCard {...project} />
        </Col>
      ))}
    </Row>
  );
};

export default RecommendedProjects; 