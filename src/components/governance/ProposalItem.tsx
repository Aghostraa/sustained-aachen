import React from 'react';
import { Card, Badge, Row, Col, Button } from 'react-bootstrap';
import { Proposal } from './types';

interface ProposalItemProps {
  proposal: Proposal;
}

const ProposalItem: React.FC<ProposalItemProps> = ({ proposal }) => {
  const getStatusVariant = (status: string): string => {
    switch (status) {
      case 'voting':
        return 'primary';
      case 'discussion':
        return 'info';
      case 'passed':
        return 'success';
      case 'implemented':
        return 'secondary';
      default:
        return 'light';
    }
  };

  const getCategoryVariant = (category: string): string => {
    switch (category) {
      case 'funding':
        return 'warning';
      case 'platform':
        return 'info';
      case 'impact':
        return 'success';
      case 'growth':
        return 'danger';
      default:
        return 'light';
    }
  };

  const getCategoryIcon = (category: string): string => {
    switch (category) {
      case 'funding':
        return 'fas fa-coins';
      case 'platform':
        return 'fas fa-layer-group';
      case 'impact':
        return 'fas fa-chart-line';
      case 'growth':
        return 'fas fa-expand-alt';
      default:
        return 'fas fa-tag';
    }
  };

  return (
    <Card className="mb-4 border-0 shadow-sm">
      <Card.Body className="p-4">
        <div className="d-flex flex-wrap gap-2 mb-3">
          <Badge bg={getStatusVariant(proposal.status)} className="d-flex align-items-center gap-1 py-2 px-3">
            {proposal.status === 'voting' && <i className="fas fa-vote-yea me-1"></i>}
            {proposal.status === 'discussion' && <i className="fas fa-comments me-1"></i>}
            {proposal.status === 'passed' && <i className="fas fa-check-circle me-1"></i>}
            {proposal.status === 'implemented' && <i className="fas fa-check-double me-1"></i>}
            {proposal.status.charAt(0).toUpperCase() + proposal.status.slice(1)}
          </Badge>
          <Badge bg={getCategoryVariant(proposal.category)} className="d-flex align-items-center gap-1 py-2 px-3">
            <i className={`${getCategoryIcon(proposal.category)} me-1`}></i>
            {proposal.category.charAt(0).toUpperCase() + proposal.category.slice(1)}
          </Badge>
        </div>

        <h3 className="h4 mb-3">{proposal.title}</h3>
        <p className="text-muted mb-4">{proposal.description}</p>

        <Row className="g-3 mb-3">
          {proposal.closesIn && (
            <Col xs={12} sm>
              <div className="d-flex align-items-center text-muted">
                <i className="fas fa-calendar-alt me-2"></i>
                <span>{proposal.status === 'discussion' ? `Discussion: ${proposal.closesIn} left` : `Closes in ${proposal.closesIn}`}</span>
              </div>
            </Col>
          )}
          
          {proposal.passedDate && (
            <Col xs={12} sm>
              <div className="d-flex align-items-center text-muted">
                <i className="fas fa-calendar-check me-2"></i>
                <span>Passed on {proposal.passedDate}</span>
              </div>
            </Col>
          )}

          {proposal.votes !== undefined && (
            <Col xs={12} sm>
              <div className="d-flex align-items-center text-muted">
                <i className="fas fa-vote-yea me-2"></i>
                <span>{proposal.status === 'passed' ? `Final: ${proposal.votes} votes` : `${proposal.votes} votes`}</span>
              </div>
            </Col>
          )}

          {proposal.comments !== undefined && (
            <Col xs={12} sm>
              <div className="d-flex align-items-center text-muted">
                <i className="fas fa-comments me-2"></i>
                <span>{proposal.comments} comments</span>
              </div>
            </Col>
          )}

          {proposal.supporters !== undefined && (
            <Col xs={12} sm>
              <div className="d-flex align-items-center text-muted">
                <i className="fas fa-thumbs-up me-2"></i>
                <span>{proposal.supporters} supporters</span>
              </div>
            </Col>
          )}

          {proposal.approvalPercentage !== undefined && (
            <Col xs={12} sm>
              <div className="d-flex align-items-center text-muted">
                <i className="fas fa-percentage me-2"></i>
                <span>Approval: {proposal.approvalPercentage}%</span>
              </div>
            </Col>
          )}
        </Row>

        <div className="d-flex flex-wrap gap-2">
          {(proposal.status === 'voting') && (
            <Button variant="primary" href={`/proposal/${proposal.id}`}>View & Vote</Button>
          )}
          {(proposal.status === 'discussion') && (
            <Button variant="primary" href={`/proposal/${proposal.id}`}>Join Discussion</Button>
          )}
          {(proposal.status === 'passed' || proposal.status === 'implemented') && (
            <Button variant="outline-secondary" href={`/proposal/${proposal.id}`}>View Results</Button>
          )}
          <Button variant="outline-secondary" className="ms-auto">
            <i className="fas fa-share-alt me-1"></i> Share
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default ProposalItem; 