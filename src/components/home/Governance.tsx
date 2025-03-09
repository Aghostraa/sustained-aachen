// src/components/home/Governance.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card, Badge, Button } from 'react-bootstrap';
import { FaVoteYea, FaUsers, FaChartLine } from 'react-icons/fa';

interface FeatureCardProps {
  icon: React.ReactElement<{ className?: string; size?: number }>;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => (
  <Card className="text-center h-100 shadow-sm hover-lift border-0">
    <Card.Body className="p-4">
      <div className="rounded-circle bg-primary bg-opacity-10 mx-auto mb-4 d-flex align-items-center justify-content-center" style={{ width: '64px', height: '64px' }}>
        {React.cloneElement(icon, { className: 'text-primary', size: 24 })}
      </div>
      <h3 className="h5 fw-bold mb-3">{title}</h3>
      <p className="text-secondary">{description}</p>
    </Card.Body>
  </Card>
);

interface ProposalCardProps {
  status: 'voting' | 'discussion';
  title: string;
  description: string;
  stats: string[];
  linkText: string;
}

const ProposalCard: React.FC<ProposalCardProps> = ({ status, title, description, stats, linkText }) => (
  <Card className="shadow-sm hover-lift border-0">
    <Card.Body className="p-4 position-relative">
      <Badge bg={status === 'voting' ? 'success' : 'warning'} text="dark" className="position-absolute top-0 end-0 mt-3 me-3">
        {status === 'voting' ? 'Voting Open' : 'Discussion'}
      </Badge>
      <h4 className="fw-bold mb-3 pe-5">{title}</h4>
      <p className="mb-4">{description}</p>
      <div className="d-flex flex-wrap justify-content-between text-secondary small mb-3">
        {stats.map((stat, index) => (
          <span key={index}>{stat}</span>
        ))}
      </div>
      <Button 
        as={Link as any} 
        to="/governance" 
        variant="primary" 
        size="sm"
      >
        {linkText}
      </Button>
    </Card.Body>
  </Card>
);

const Governance: React.FC = () => {
  return (
    <section className="bg-light py-5">
      <Container>
        <div className="text-center mb-5">
          <h2 className="fw-bold mb-3">Community Governance</h2>
          <p className="text-secondary mx-auto" style={{ maxWidth: '700px' }}>
            Your voice shapes our collective impact
          </p>
        </div>
        
        <Row className="g-4 mb-5">
          <Col md={4}>
            <FeatureCard 
              icon={<FaVoteYea />}
              title="Participatory Decision-Making" 
              description="Community members propose, discuss, and vote on initiatives using quadratic voting to ensure equitable representation."
            />
          </Col>
          
          <Col md={4}>
            <FeatureCard 
              icon={<FaUsers />}
              title="Verification Council" 
              description="A rotating group of diverse stakeholders verifies project outcomes and evaluates real-world impact."
            />
          </Col>
          
          <Col md={4}>
            <FeatureCard 
              icon={<FaChartLine />}
              title="Transparent Metrics" 
              description="All funding allocations, decision processes, and impact measurements are publicly accessible."
            />
          </Col>
        </Row>
        
        <h3 className="fw-bold mb-4">Active Proposals</h3>
        <Row className="g-4 mb-4">
          <Col lg={4}>
            <ProposalCard 
              status="voting"
              title="District Balancing for Q2 Matching Pool"
              description="Proposal to allocate 30% of the matching pool to underrepresented districts."
              stats={["22 votes", "Closes in 3 days"]}
              linkText="View & Vote"
            />
          </Col>
          
          <Col lg={4}>
            <ProposalCard 
              status="voting"
              title="Adding 'Climate Education' Category"
              description="Create a dedicated project category for initiatives focused on climate education."
              stats={["47 votes", "Closes in 5 days"]}
              linkText="View & Vote"
            />
          </Col>
          
          <Col lg={4}>
            <ProposalCard 
              status="discussion"
              title="Impact Verification Framework"
              description="Developing standardized metrics for evaluating project outcomes."
              stats={["15 comments", "Discussion phase: 8 days left"]}
              linkText="Join Discussion"
            />
          </Col>
        </Row>
        
        <div className="text-center mt-4">
          <Button 
            as={Link as any} 
            to="/governance" 
            variant="outline-primary" 
            className="fw-semibold"
          >
            Explore Governance
          </Button>
        </div>
      </Container>
    </section>
  );
};

export default Governance;