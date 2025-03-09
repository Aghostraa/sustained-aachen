import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { statsData } from './data';

const GovernanceStats: React.FC = () => {
  return (
    <section className="py-5">
      <Container>
        <Row>
          {statsData.map((stat, index) => (
            <Col key={index} md={6} lg={3} className="mb-4">
              <Card className="h-100 border-0 shadow-sm">
                <Card.Body className="text-center p-4">
                  <div className="d-inline-flex align-items-center justify-content-center mb-3 bg-light rounded-circle" style={{ width: '60px', height: '60px' }}>
                    <i className={`${stat.icon} fs-4 text-primary`}></i>
                  </div>
                  <h3 className="fw-bold mb-1">{stat.value}</h3>
                  <p className="text-muted mb-0">{stat.label}</p>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default GovernanceStats; 