import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { FaArrowUp, FaArrowRight, FaArrowDown } from 'react-icons/fa';

interface PulseMetric {
  title: string;
  description: string;
  value: string;
  trend: 'up' | 'steady' | 'down';
}

const CommunityPulse: React.FC = () => {
  const pulseData: PulseMetric[] = [
    {
      title: 'Volunteer Hours',
      description: 'Monthly volunteer hours have increased 22% compared to previous quarter',
      value: '+22%',
      trend: 'up'
    },
    {
      title: 'New Contributors',
      description: '47% increase in new platform members in the past month',
      value: '+47%',
      trend: 'up'
    },
    {
      title: 'Project Success Rate',
      description: 'Projects reaching funding goals holding steady at 82%',
      value: '+3%',
      trend: 'steady'
    },
    {
      title: 'Event Participation',
      description: 'Average attendance at community events up 35%',
      value: '+35%',
      trend: 'up'
    }
  ];
  
  const getTrendIcon = (trend: string) => {
    switch(trend) {
      case 'up':
        return <FaArrowUp className="text-success" />;
      case 'steady':
        return <FaArrowRight className="text-warning" />;
      case 'down':
        return <FaArrowDown className="text-danger" />;
      default:
        return null;
    }
  };
  
  const getTrendLineClass = (trend: string) => {
    switch(trend) {
      case 'up':
        return 'bg-success';
      case 'steady':
        return 'bg-warning';
      case 'down':
        return 'bg-danger';
      default:
        return '';
    }
  };
  
  return (
    <section className="py-5 bg-white">
      <Container>
        <Row className="justify-content-center text-center mb-5">
          <Col md={8}>
            <h2 className="mb-2">Community Pulse</h2>
            <p className="text-muted">
              Real-time insights on community engagement
            </p>
          </Col>
        </Row>
        
        <Row className="g-4">
          {pulseData.map((metric, index) => (
            <Col md={6} lg={3} key={index}>
              <Card className="h-100 shadow-sm border-0">
                <Card.Body className="p-4">
                  <div className="d-flex align-items-center justify-content-between mb-3">
                    <h5 className="mb-0">{metric.title}</h5>
                    <div className="pulse-chart rounded-circle d-flex align-items-center justify-content-center" 
                      style={{ width: '48px', height: '48px', backgroundColor: '#f8f9fa' }}>
                      {getTrendIcon(metric.trend)}
                    </div>
                  </div>
                  
                  <div className="mb-3">
                    <div className="position-relative" style={{ height: '4px', backgroundColor: '#eee' }}>
                      <div 
                        className={`position-absolute top-0 start-0 h-100 ${getTrendLineClass(metric.trend)}`} 
                        style={{ width: '65%' }}
                      ></div>
                    </div>
                    <div className="text-end mt-1">
                      <span className="text-dark fw-bold">{metric.value}</span>
                    </div>
                  </div>
                  
                  <p className="text-muted mb-0 small">
                    {metric.description}
                  </p>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default CommunityPulse; 