import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { 
  FaRocket, 
  FaHandHoldingHeart, 
  FaUsers, 
  FaSeedling 
} from 'react-icons/fa';

interface UserBadge {
  icon: React.ReactNode;
  title: string;
}

const DashboardHeader: React.FC = () => {
  // Mock user data (would come from API/context in a real application)
  const user = {
    name: 'Julia Dürr',
    initials: 'JD',
    memberSince: 'January 2025',
    impactLevel: 'Change Catalyst'
  };

  // Mock badges data (would come from API in a real application)
  const badges: UserBadge[] = [
    { icon: <FaRocket />, title: 'Early Adopter' },
    { icon: <FaHandHoldingHeart />, title: '10+ Contributions' },
    { icon: <FaUsers />, title: 'Community Builder' },
    { icon: <FaSeedling />, title: 'Food Hero' }
  ];

  return (
    <section className="bg-light py-4">
      <Container>
        <Row className="align-items-center">
          <Col xs={12} md={8}>
            <div className="d-flex align-items-center">
              <div 
                className="d-flex align-items-center justify-content-center rounded-circle bg-primary text-white"
                style={{ width: 60, height: 60, fontSize: '1.2rem' }}
              >
                {user.initials}
              </div>
              <div className="ms-3">
                <h1 className="h3 mb-1">Welcome, {user.name}</h1>
                <p className="text-muted mb-0">
                  Member since {user.memberSince} • Impact Level: {user.impactLevel}
                </p>
              </div>
            </div>
          </Col>
          
          <Col xs={12} md={4} className="mt-3 mt-md-0">
            <div className="d-flex justify-content-md-end">
              {badges.map((badge, index) => (
                <div 
                  key={index} 
                  className="d-flex align-items-center justify-content-center rounded-circle bg-white border mx-1"
                  style={{ width: 40, height: 40 }}
                  title={badge.title}
                >
                  <span className="text-primary">
                    {badge.icon}
                  </span>
                </div>
              ))}
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default DashboardHeader; 