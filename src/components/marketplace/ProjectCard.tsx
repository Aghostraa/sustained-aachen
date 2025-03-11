import React from 'react';
import { Card, ProgressBar, Button, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaEnvelope, FaGlobe } from 'react-icons/fa';

interface ProjectCardProps {
  id: string;
  title: string;
  iconText: string;
  iconColor: string;
  description: string;
  tags: string[];
  amountRaised: number;
  contributors: number;
  targetAmount: number;
  contact?: string;  // Optional contact info
  website?: string;  // Optional website URL
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  id,
  title,
  iconText,
  iconColor,
  description,
  tags,
  amountRaised,
  contributors,
  targetAmount,
  contact,
  website
}) => {
  const progressPercentage = Math.min(Math.round((amountRaised / targetAmount) * 100), 100);
  const formattedAmount = amountRaised.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' });
  const formattedTarget = targetAmount.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' });

  return (
    <Card className="h-100 shadow-sm">
      <Card.Header className="border-0 py-3" style={{ backgroundColor: `${iconColor}10` }}>
        <div className="d-flex align-items-center">
          <div 
            className="d-flex align-items-center justify-content-center rounded-circle text-white me-3"
            style={{ 
              width: '40px', 
              height: '40px', 
              backgroundColor: iconColor,
              fontSize: '14px',
              fontWeight: 'bold'
            }}
          >
            {iconText}
          </div>
          <div className="fw-bold">{title}</div>
        </div>
      </Card.Header>
      <Card.Body className="d-flex flex-column">
        <Card.Text className="text-secondary mb-3">{description}</Card.Text>
        <div className="mb-3">
          {tags.map((tag, index) => (
            <Badge 
              key={index} 
              bg="light" 
              text="dark" 
              className="me-2 mb-2 py-2 px-3"
            >
              {tag}
            </Badge>
          ))}
        </div>
        
        {/* Contact and Website information */}
        {(contact || website) && (
          <div className="mb-3 small">
            {contact && (
              <div className="d-flex align-items-center mb-2">
                <FaEnvelope className="me-2 text-muted" />
                <span className="text-muted">{contact}</span>
              </div>
            )}
            {website && (
              <div className="d-flex align-items-center">
                <FaGlobe className="me-2 text-muted" />
                <a href={website} target="_blank" rel="noopener noreferrer" className="text-primary">
                  {website.replace(/^https?:\/\//, '').split('/')[0]}
                </a>
              </div>
            )}
          </div>
        )}
        
        <div className="mt-auto">
          <div className="d-flex justify-content-between text-secondary small mb-1">
            <span>{formattedAmount} raised</span>
            <span>{contributors} contributors</span>
          </div>
          <ProgressBar now={progressPercentage} className="mb-2" />
          <div className="d-flex justify-content-between text-secondary small mb-3">
            <span>Target: {formattedTarget}</span>
            <span className="text-primary fw-bold">{progressPercentage}%</span>
          </div>
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
};

export default ProjectCard; 