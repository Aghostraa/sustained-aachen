// src/components/home/IndividualImpact.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card, Button, ProgressBar } from 'react-bootstrap';
import { FaBicycle, FaAppleAlt, FaTint } from 'react-icons/fa';
import { IconType } from 'react-icons';

const ImpactCard = ({ 
  icon, 
  title, 
  description, 
  progress, 
  stat 
}: {
  icon: React.ReactElement<{ size?: number }>;
  title: string;
  description: string;
  progress: number;
  stat: string;
}) => {
  return (
    <Card className="h-100 text-center shadow-sm transition-all hover-lift">
      <Card.Body className="p-4">
        <div className="rounded-circle mx-auto mb-4 d-flex align-items-center justify-content-center" 
          style={{ 
            width: 64, 
            height: 64, 
            backgroundColor: icon.type === FaBicycle ? '#e6f1ff' : 
                             icon.type === FaAppleAlt ? '#ecfdf5' : '#e0f2fe',
            color: icon.type === FaBicycle ? '#3b82f6' : 
                   icon.type === FaAppleAlt ? '#10b981' : '#0ea5e9'
          }}
        >
          {React.cloneElement(icon, { size: 24 })}
        </div>
        <h3 className="h5 fw-bold mb-3">{title}</h3>
        <p className="mb-4">{description}</p>
        <ProgressBar now={progress} className="mb-3" />
        <p className="small text-secondary">{stat}</p>
      </Card.Body>
    </Card>
  );
};

const IndividualImpact: React.FC = () => {
  return (
    <section className="py-5 bg-white">
      <Container>
        <div className="text-center mb-5">
          <h2 className="fw-bold mb-3">Your Actions Matter</h2>
          <p className="text-secondary mx-auto" style={{ maxWidth: '700px' }}>
            See how your individual contributions create meaningful change
          </p>
        </div>
        
        <Row className="g-4 mb-5">
          <Col md={4}>
            <ImpactCard 
              icon={<FaBicycle />}
              title="Sustainable Transport"
              description="Cycling to work reduces CO₂ emissions by ~1kg per 5km compared to driving."
              progress={65}
              stat="65% of Aachen commuters use sustainable transportation"
            />
          </Col>
          
          <Col md={4}>
            <ImpactCard 
              icon={<FaAppleAlt />}
              title="Local Food Choices"
              description="Eating locally-sourced food can reduce your carbon footprint by up to 5%."
              progress={43}
              stat="43% of food in Aachen restaurants is locally sourced"
            />
          </Col>
          
          <Col md={4}>
            <ImpactCard 
              icon={<FaTint />}
              title="Water Conservation"
              description="Installing water-saving fixtures saves up to 30 liters per person daily."
              progress={28}
              stat="28% reduction in household water usage since 2020"
            />
          </Col>
        </Row>
        
        <div className="text-center">
          <Button 
            as={Link as any} 
            to="/dashboard" 
            variant="outline-primary" 
            className="fw-semibold"
          >
            View Your Impact Dashboard
          </Button>
        </div>
      </Container>
    </section>
  );
};

export default IndividualImpact;