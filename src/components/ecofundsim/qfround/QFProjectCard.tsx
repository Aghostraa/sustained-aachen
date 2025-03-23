import React from 'react';
import { Card, Badge, Button, ProgressBar, Row, Col } from 'react-bootstrap';
import { FaUsers, FaHandHoldingUsd, FaEnvelope, FaGlobe } from 'react-icons/fa';

export interface QFProject {
  id: string;
  title: string;
  iconText: string;
  iconColor: string;
  description: string;
  tags?: string[];
  amountRaised?: number;
  contributors?: number;
  targetAmount?: number;
  category?: string;
  contact?: string;
  website?: string;
}

export interface QFProjectCardProps {
  project: QFProject;
  stats: {
    contributions: number;
    matching: number;
    contributors: number;
  };
  isSelected: boolean;
  onSelect: () => void;
  compact?: boolean;
}

const QFProjectCard: React.FC<QFProjectCardProps> = ({ 
  project, 
  stats, 
  isSelected, 
  onSelect,
  compact = false
}) => {
  const totalFunding = stats.contributions + stats.matching;
  const progressPercentage = project.targetAmount 
    ? Math.min(100, (totalFunding / project.targetAmount) * 100)
    : 0;
  
  const formattedContributions = stats.contributions.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' });
  const formattedMatching = stats.matching.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' });
  const formattedTotal = totalFunding.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' });
  const formattedTarget = project.targetAmount?.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' }) || '0 €';
  
  // For compact mode (used in the sidebar selection)
  if (compact) {
    return (
      <Card 
        className={`mb-3 shadow-sm ${isSelected ? 'border-primary' : 'border-0'}`}
        onClick={onSelect}
        style={{ cursor: 'pointer' }}
      >
        <Card.Body className="p-3">
          <div className="d-flex align-items-center">
            <div 
              className="d-flex align-items-center justify-content-center rounded-circle me-3 flex-shrink-0 text-white"
              style={{ 
                width: '36px', 
                height: '36px', 
                backgroundColor: project.iconColor,
                fontSize: '12px',
                fontWeight: 'bold'
              }}
            >
              {project.iconText}
            </div>
            <div className="flex-grow-1">
              <h6 className="mb-0">{project.title}</h6>
              <small className="text-muted">
                {stats.contributors} donors · {formattedContributions}
              </small>
            </div>
          </div>
        </Card.Body>
      </Card>
    );
  }
  
  // Full card mode
  return (
    <Card className={`h-100 shadow-sm ${isSelected ? 'border-primary' : ''}`}>
      <Card.Header className="border-0 py-3" style={{ backgroundColor: `${project.iconColor}10` }}>
        <div className="d-flex align-items-center">
          <div 
            className="d-flex align-items-center justify-content-center rounded-circle text-white me-3"
            style={{ 
              width: '40px', 
              height: '40px', 
              backgroundColor: project.iconColor,
              fontSize: '14px',
              fontWeight: 'bold'
            }}
          >
            {project.iconText}
          </div>
          <div className="fw-bold">{project.title}</div>
        </div>
      </Card.Header>
      <Card.Body className="d-flex flex-column">
        <Card.Text className="text-secondary mb-3">{project.description}</Card.Text>
        
        <div className="mb-3">
          {project.tags?.map((tag, index) => (
            <Badge 
              key={index} 
              bg="light" 
              text="dark" 
              className="me-2 mb-2 py-2 px-3"
            >
              {tag}
            </Badge>
          ))}
          
          {project.category && (
            <Badge 
              bg="info" 
              className="me-2 mb-2 py-2 px-3"
            >
              {project.category}
            </Badge>
          )}
        </div>
        
        <div className="mt-auto">
          <div className="d-flex justify-content-between text-secondary small mb-1">
            <span>{formattedTotal}</span>
            <span>{stats.contributors} contributors</span>
          </div>
          <ProgressBar 
            now={progressPercentage} 
            variant="success" 
            className="mb-2"
          />
          <div className="d-flex justify-content-between text-secondary small mb-3">
            <span>Target: {formattedTarget}</span>
            <span className="text-primary fw-bold">{progressPercentage.toFixed(1)}%</span>
          </div>
          
          <Row className="text-center mb-3 g-2">
            <Col xs={6}>
              <div className="border rounded p-2">
                <div className="fw-bold">{formattedContributions}</div>
                <small className="text-muted d-flex align-items-center justify-content-center">
                  <FaHandHoldingUsd className="me-1" /> Direct
                </small>
              </div>
            </Col>
            <Col xs={6}>
              <div className="border rounded p-2">
                <div className="fw-bold">{formattedMatching}</div>
                <small className="text-muted d-flex align-items-center justify-content-center">
                  <FaUsers className="me-1" /> Matching
                </small>
              </div>
            </Col>
          </Row>
          
          <div className="d-grid">
            <Button 
              variant={isSelected ? "primary" : "outline-primary"} 
              onClick={onSelect}
              className="w-100"
            >
              {isSelected ? "Selected" : "Support This Project"}
            </Button>
          </div>
        </div>
      </Card.Body>
      
      {(project.website || project.contact) && (
        <Card.Footer className="bg-white small border-top">
          {project.contact && (
            <div className="d-flex align-items-center mb-2">
              <FaEnvelope className="me-2 text-muted" />
              <span className="text-muted">{project.contact}</span>
            </div>
          )}
          {project.website && (
            <div className="d-flex align-items-center">
              <FaGlobe className="me-2 text-muted" />
              <a href={project.website} target="_blank" rel="noopener noreferrer" className="text-primary">
                {project.website.replace(/^https?:\/\//, '').split('/')[0]}
              </a>
            </div>
          )}
        </Card.Footer>
      )}
    </Card>
  );
};

export default QFProjectCard; 