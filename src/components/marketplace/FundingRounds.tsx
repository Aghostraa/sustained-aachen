import React from 'react';
import { Container, Row, Col, Card, Badge } from 'react-bootstrap';
import { FaCalendarAlt } from 'react-icons/fa';

interface FundingRound {
  id: string;
  title: string;
  description: string;
  status: 'active' | 'upcoming' | 'retroactive' | 'completed';
  dateRange: string;
  matchingPool: string;
  sponsorLogo: string;
  sponsorName: string;
}

const rounds: FundingRound[] = [
  {
    id: 'current',
    title: 'Student Initiatives QF Round',
    description: 'Supporting student-led sustainability projects across Aachen universities.',
    status: 'active',
    dateRange: 'March 1 - 31, 2025',
    matchingPool: '€15,000',
    sponsorLogo: '/assets/sparkasse-aachen-logo.png',
    sponsorName: 'Sparkasse Aachen'
  },
  {
    id: 'food-systems',
    title: 'Local Food Systems Round',
    description: 'Supporting initiatives that strengthen local food supply chains and reduce food waste.',
    status: 'upcoming',
    dateRange: 'April 1 - 30, 2025',
    matchingPool: '€20,000',
    sponsorLogo: '/assets/rewe-logo.png',
    sponsorName: 'REWE Group'
  },
  {
    id: 'climate',
    title: 'Climate Innovation Round',
    description: 'Retroactive funding for projects that contributed to Aachen\'s climate goals in 2024.',
    status: 'retroactive',
    dateRange: 'May 1 - 31, 2025',
    matchingPool: '€25,000',
    sponsorLogo: '/assets/stawag-logo.png',
    sponsorName: 'STAWAG'
  },
  {
    id: 'tech',
    title: 'Tech for Good Round',
    description: 'Supported projects using technology to solve local sustainability challenges.',
    status: 'completed',
    dateRange: 'February 2025',
    matchingPool: '€18,000 Distributed',
    sponsorLogo: '/assets/aixtra-logo.png',
    sponsorName: 'AixtraLab'
  }
];

const getStatusBadge = (status: FundingRound['status']) => {
  const statusConfig = {
    active: { bg: 'primary', text: 'Active' },
    upcoming: { bg: 'warning', text: 'Upcoming' },
    retroactive: { bg: 'success', text: 'RetroActive' },
    completed: { bg: 'secondary', text: 'Completed' }
  };
  
  const config = statusConfig[status];
  
  return <Badge bg={config.bg} className="rounded-pill px-3 py-2">{config.text}</Badge>;
};

const FundingRounds: React.FC = () => {
  return (
    <section className="py-5">
      <Container>
        <h2 className="mb-4 fw-bold">Funding Rounds</h2>
        
        {/* Featured Active Round */}
        <div className="rounded-3 p-4 mb-4" style={{ background: 'linear-gradient(to right, #f0f9ff, #e0f2fe)' }}>
          <Row className="align-items-center">
            <Col md={8}>
              <h2 className="mb-2 fs-2 fw-bold">{rounds[0].title}</h2>
              <div className="d-flex gap-4 align-items-center flex-wrap">
                {getStatusBadge(rounds[0].status)}
                <div className="text-secondary d-flex align-items-center">
                  <FaCalendarAlt className="me-2" />
                  {rounds[0].dateRange}
                </div>
                <div className="text-danger d-flex align-items-center">
                  <span className="me-1">5 days remaining</span>
                </div>
              </div>
              <div className="mt-3 d-flex align-items-center">
                <span className="text-secondary me-3">Sponsored by</span>
                <img 
                  src={rounds[0].sponsorLogo}
                  alt={rounds[0].sponsorName}
                  height="32"
                />
              </div>
            </Col>
            <Col md={4}>
              <div className="bg-white p-4 text-center rounded shadow-sm">
                <div className="fs-2 fw-bold text-primary">{rounds[0].matchingPool}</div>
                <div className="text-secondary my-2">Matching Pool</div>
              </div>
            </Col>
          </Row>
        </div>
        
        {/* Other Rounds */}
        <Row className="g-4">
          {rounds.slice(1).map(round => (
            <Col md={4} key={round.id}>
              <Card className="h-100 border-0 shadow-sm">
                <Card.Body>
                  <div className="d-flex align-items-center mb-3">
                    <img 
                      src={round.sponsorLogo} 
                      alt={round.sponsorName} 
                      height="24" 
                      className="me-3"
                    />
                    {getStatusBadge(round.status)}
                  </div>
                  <h3 className="fs-5 fw-bold mb-2">{round.title}</h3>
                  <p className="text-secondary small mb-3">{round.description}</p>
                  <div className="text-secondary d-flex align-items-center mb-2 small">
                    <FaCalendarAlt className="me-2" />
                    {round.dateRange}
                  </div>
                  <div className="text-primary fw-bold">{round.matchingPool}</div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default FundingRounds; 