import React from 'react';
import { Card, Row, Col, ProgressBar } from 'react-bootstrap';
import { FaUsers, FaHandHoldingUsd, FaChartLine } from 'react-icons/fa';
import { QFProject } from './QFProjectCard';

interface ProjectStatsProps {
  project: QFProject;
  stats: {
    contributions: number;
    matching: number;
    contributors: number;
    avgDonation?: number;
    matchingRatio?: number;
  };
}

const ProjectStats: React.FC<ProjectStatsProps> = ({ project, stats }) => {
  const totalFunding = stats.contributions + stats.matching;
  const progressPercentage = project.targetAmount 
    ? Math.min(100, (totalFunding / project.targetAmount) * 100)
    : 0;
  
  // Calculate additional stats
  const avgDonation = stats.avgDonation || 
    (stats.contributors > 0 ? stats.contributions / stats.contributors : 0);
  
  const matchingRatio = stats.matchingRatio || 
    (stats.contributions > 0 ? stats.matching / stats.contributions : 0);
  
  return (
    <Card className="border-0 shadow-sm mb-4">
      <Card.Header className="bg-white border-0 d-flex justify-content-between align-items-center">
        <h5 className="mb-0">Project Statistics</h5>
        <span className="text-muted">QF Multiplier: {matchingRatio.toFixed(2)}x</span>
      </Card.Header>
      <Card.Body>
        {/* Progress Bar */}
        <div className="mb-4">
          <div className="d-flex justify-content-between mb-1">
            <div>Funding Progress</div>
            <div>
              €{totalFunding.toLocaleString()} of €{project.targetAmount?.toLocaleString()}
            </div>
          </div>
          <ProgressBar 
            now={progressPercentage} 
            variant="success" 
            className="mb-1"
          />
          <small className="text-muted">{progressPercentage.toFixed(1)}% funded</small>
        </div>
        
        {/* Stats Grid */}
        <Row className="g-3 mb-4">
          <Col md={6}>
            <div className="border rounded p-3 h-100">
              <div className="d-flex align-items-center text-primary mb-2">
                <FaHandHoldingUsd className="me-2" />
                <h6 className="mb-0">Contributions</h6>
              </div>
              <div className="d-flex justify-content-between">
                <div>
                  <h4 className="mb-0">€{stats.contributions.toLocaleString()}</h4>
                  <small className="text-muted">Direct donations</small>
                </div>
                <div className="text-end">
                  <h4 className="mb-0">€{avgDonation.toFixed(2)}</h4>
                  <small className="text-muted">Avg. donation</small>
                </div>
              </div>
            </div>
          </Col>
          <Col md={6}>
            <div className="border rounded p-3 h-100">
              <div className="d-flex align-items-center text-success mb-2">
                <FaChartLine className="me-2" />
                <h6 className="mb-0">Matching</h6>
              </div>
              <div className="d-flex justify-content-between">
                <div>
                  <h4 className="mb-0">€{stats.matching.toFixed(0)}</h4>
                  <small className="text-muted">Matching funds</small>
                </div>
                <div className="text-end">
                  <h4 className="mb-0">{(matchingRatio * 100).toFixed(0)}%</h4>
                  <small className="text-muted d-block">of direct funding</small>
                </div>
              </div>
            </div>
          </Col>
          <Col md={12}>
            <div className="border rounded p-3">
              <div className="d-flex align-items-center text-info mb-2">
                <FaUsers className="me-2" />
                <h6 className="mb-0">Community</h6>
              </div>
              <div className="d-flex justify-content-between">
                <div>
                  <h4 className="mb-0">{stats.contributors}</h4>
                  <small className="text-muted">Unique contributors</small>
                </div>
                <div className="text-end">
                  <h4 className="mb-0">€{totalFunding.toLocaleString()}</h4>
                  <small className="text-muted">Total funding</small>
                </div>
              </div>
            </div>
          </Col>
        </Row>
        
        {/* QF Explanation */}
        <div className="border-top pt-3 mt-2">
          <h6>Quadratic Funding Impact</h6>
          <p className="small text-muted mb-0">
            With QF, many small donations have more impact than a few large ones. 
            Projects with broad community support receive more matching funds. 
            The current QF multiplier ({matchingRatio.toFixed(2)}x) means for every €1 directly donated, 
            this project receives €{matchingRatio.toFixed(2)} in matching funds.
          </p>
        </div>
      </Card.Body>
    </Card>
  );
};

export default ProjectStats; 