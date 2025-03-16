import React from 'react';
import { Row, Col, Card, ProgressBar, Button } from 'react-bootstrap';
import { 
  FaUsers, 
  FaHandHoldingHeart, 
  FaCalendarAlt, 
  FaChartLine,
  FaEdit
} from 'react-icons/fa';
import { Project } from '../../project/ProjectHero';

interface ProjectOverviewTabProps {
  project: Project;
}

const ProjectOverviewTab: React.FC<ProjectOverviewTabProps> = ({ project }) => {
  const progressPercentage = Math.min(Math.round((project.amountRaised / project.targetAmount) * 100), 100);
  
  const formattedAmount = project.amountRaised.toLocaleString('de-DE', { 
    style: 'currency', 
    currency: 'EUR' 
  });
  
  const formattedTarget = project.targetAmount.toLocaleString('de-DE', { 
    style: 'currency', 
    currency: 'EUR' 
  });

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="h4 mb-0">Project Overview</h2>
        <Button variant="outline-primary" size="sm">
          <FaEdit className="me-2" />
          Edit Project
        </Button>
      </div>
      
      <Row className="mb-4">
        <Col md={3} sm={6} className="mb-3 mb-md-0">
          <Card className="h-100 border-0 shadow-sm">
            <Card.Body className="text-center p-3">
              <div
                className="d-inline-flex align-items-center justify-content-center rounded-circle text-primary mb-3"
                style={{
                  width: 60,
                  height: 60,
                  backgroundColor: 'rgba(13, 110, 253, 0.1)',
                  fontSize: '1.5rem'
                }}
              >
                <FaUsers />
              </div>
              <div className="fw-bold fs-4">{project.contributors}</div>
              <div className="text-muted small">Total Contributors</div>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={3} sm={6} className="mb-3 mb-md-0">
          <Card className="h-100 border-0 shadow-sm">
            <Card.Body className="text-center p-3">
              <div
                className="d-inline-flex align-items-center justify-content-center rounded-circle text-success mb-3"
                style={{
                  width: 60,
                  height: 60,
                  backgroundColor: 'rgba(25, 135, 84, 0.1)',
                  fontSize: '1.5rem'
                }}
              >
                <FaHandHoldingHeart />
              </div>
              <div className="fw-bold fs-4">{formattedAmount}</div>
              <div className="text-muted small">Amount Raised</div>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={3} sm={6} className="mb-3 mb-md-0">
          <Card className="h-100 border-0 shadow-sm">
            <Card.Body className="text-center p-3">
              <div
                className="d-inline-flex align-items-center justify-content-center rounded-circle text-warning mb-3"
                style={{
                  width: 60,
                  height: 60,
                  backgroundColor: 'rgba(255, 193, 7, 0.1)',
                  fontSize: '1.5rem'
                }}
              >
                <FaCalendarAlt />
              </div>
              <div className="fw-bold fs-4">{project.daysToGo > 0 ? project.daysToGo : 'Ongoing'}</div>
              <div className="text-muted small">{project.daysToGo > 0 ? 'Days Remaining' : 'Initiative'}</div>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={3} sm={6}>
          <Card className="h-100 border-0 shadow-sm">
            <Card.Body className="text-center p-3">
              <div
                className="d-inline-flex align-items-center justify-content-center rounded-circle text-info mb-3"
                style={{
                  width: 60,
                  height: 60,
                  backgroundColor: 'rgba(13, 202, 240, 0.1)',
                  fontSize: '1.5rem'
                }}
              >
                <FaChartLine />
              </div>
              <div className="fw-bold fs-4">{project.volunteerOpportunities.reduce((total, opp) => total + opp.spots, 0)}</div>
              <div className="text-muted small">Volunteer Positions</div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      
      <Row className="mb-4">
        <Col md={6} className="mb-4 mb-md-0">
          <Card className="h-100 border-0 shadow-sm">
            <Card.Header className="bg-white border-bottom-0 pt-4 pb-0">
              <h3 className="h5 mb-0">Funding Progress</h3>
            </Card.Header>
            <Card.Body>
              <div className="mb-2 d-flex justify-content-between">
                <span>{formattedAmount} raised</span>
                <span className="text-muted">{formattedTarget} goal</span>
              </div>
              <ProgressBar 
                now={progressPercentage} 
                variant={progressPercentage < 30 ? "danger" : progressPercentage < 70 ? "warning" : "success"} 
                className="mb-3" 
              />
              <div className="text-center text-muted small">
                {progressPercentage}% of funding goal reached
              </div>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={6}>
          <Card className="h-100 border-0 shadow-sm">
            <Card.Header className="bg-white border-bottom-0 pt-4 pb-0">
              <h3 className="h5 mb-0">Recent Activity</h3>
            </Card.Header>
            <Card.Body>
              {project.updates.length > 0 ? (
                <ul className="list-unstyled mb-0">
                  {project.updates.map((update, index) => (
                    <li key={index} className={index < project.updates.length - 1 ? "mb-3 pb-3 border-bottom" : ""}>
                      <div className="d-flex">
                        <div className="text-muted small" style={{ minWidth: '90px' }}>{update.date}</div>
                        <div>
                          <div className="fw-semibold">{update.title}</div>
                          <div className="small text-truncate" style={{ maxWidth: '300px' }}>
                            {update.content}
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="text-center text-muted py-4">No recent updates</div>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
      
      <Row>
        <Col md={12}>
          <Card className="border-0 shadow-sm">
            <Card.Header className="bg-white border-bottom-0 pt-4 pb-0">
              <h3 className="h5 mb-0">Project Outcomes</h3>
            </Card.Header>
            <Card.Body>
              <Row>
                {project.outcomes.map((outcome, index) => (
                  <Col md={6} key={index} className="mb-3">
                    <div className="d-flex align-items-center">
                      <div 
                        className="d-flex align-items-center justify-content-center rounded-circle bg-success text-white me-3"
                        style={{ minWidth: '32px', height: '32px', fontSize: '0.9rem' }}
                      >
                        {index + 1}
                      </div>
                      <div>{outcome}</div>
                    </div>
                  </Col>
                ))}
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default ProjectOverviewTab; 