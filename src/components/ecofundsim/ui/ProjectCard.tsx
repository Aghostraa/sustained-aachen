import React from 'react';
import { Card, ProgressBar, Badge } from 'react-bootstrap';
import { Project, ProjectMatchingResult } from '../models/SimulationModels';

interface ProjectCardProps {
  project: Project;
  results?: ProjectMatchingResult;
  onSelect: () => void;
  isSelected: boolean;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ 
  project, 
  results,
  onSelect,
  isSelected
}) => {
  // Calculate the progress percentage
  const totalFunding = results ? results.totalFunding : 0;
  const progressPercentage = Math.min(100, (totalFunding / project.targetAmount) * 100);
  
  // Format currency
  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };
  
  // Calculate contributions and matching
  const directContributions = results ? results.contributions : 0;
  const matchingAmount = results ? results.matchingAmount : 0;
  
  return (
    <Card 
      className={`h-100 ${isSelected ? 'border-primary shadow' : ''}`}
      onClick={onSelect}
      style={{ cursor: 'pointer' }}
    >
      <Card.Header className="d-flex align-items-center">
        <div 
          className="project-icon d-flex align-items-center justify-content-center rounded-circle text-white me-2"
          style={{ 
            width: '40px', 
            height: '40px', 
            backgroundColor: project.iconColor,
            fontSize: '16px',
            fontWeight: 'bold'
          }}
        >
          {project.iconText}
        </div>
        <div className="flex-grow-1">
          <Card.Title className="mb-0 fs-6">{project.title}</Card.Title>
        </div>
      </Card.Header>
      
      <Card.Body>
        <Card.Text className="small">{project.description}</Card.Text>
        
        <div className="d-flex justify-content-between mb-1">
          <span className="text-muted small">Progress:</span>
          <span className="text-end small">
            {formatCurrency(totalFunding)} / {formatCurrency(project.targetAmount)}
          </span>
        </div>
        
        <ProgressBar 
          now={progressPercentage} 
          variant={progressPercentage >= 100 ? "success" : "primary"}
          className="mb-3"
        />
        
        <div className="d-flex justify-content-between small mb-1">
          <div>Direct:</div>
          <div>{formatCurrency(directContributions)}</div>
        </div>
        
        <div className="d-flex justify-content-between small mb-2">
          <div>Matching:</div>
          <div>{formatCurrency(matchingAmount)}</div>
        </div>
        
        <div className="d-flex justify-content-between">
          <Badge bg="info" className="fs-7">
            {project.category}
          </Badge>
          
          {results && (
            <Badge bg="secondary" className="fs-7">
              {results.contributorCount} donor{results.contributorCount !== 1 ? 's' : ''}
            </Badge>
          )}
        </div>
      </Card.Body>
    </Card>
  );
};

export default ProjectCard; 