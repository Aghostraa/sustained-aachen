import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { eventsData } from './data';

const GovernanceEvents: React.FC = () => {
  return (
    <section className="py-5">
      <Container>
        <Row className="justify-content-center text-center mb-5">
          <Col lg={8}>
            <h2 className="fw-bold mb-3">Upcoming Governance Events</h2>
            <p className="lead">Participate in live discussions and decision-making sessions</p>
          </Col>
        </Row>
        
        <div className="mb-5">
          {eventsData.map((event) => (
            <Card key={event.id} className="mb-4 border-0 shadow-sm">
              <Card.Body className="p-0">
                <Row className="g-0">
                  <Col xs={3} md={2} className="text-center py-4 bg-primary text-white">
                    <div className="d-flex flex-column justify-content-center h-100">
                      <div className="text-uppercase fw-bold">{event.date.month}</div>
                      <div className="display-5 fw-bold">{event.date.day}</div>
                    </div>
                  </Col>
                  <Col xs={9} md={8} className="p-4">
                    <h3 className="h5 mb-2">{event.title}</h3>
                    <div className="d-flex flex-wrap mb-3 text-muted">
                      <div className="me-4 d-flex align-items-center">
                        <i className="fas fa-clock me-2"></i>
                        <span>{event.time}</span>
                      </div>
                      <div className="d-flex align-items-center">
                        <i className={`${event.isOnline ? 'fas fa-globe' : 'fas fa-map-marker-alt'} me-2`}></i>
                        <span>{event.location}</span>
                      </div>
                    </div>
                    <p className="mb-0 text-muted">{event.description}</p>
                  </Col>
                  <Col xs={12} md={2} className="d-flex align-items-center justify-content-center p-4 bg-light">
                    <Button variant="primary">Register</Button>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          ))}
        </div>
        
        <div className="text-center">
          <Button variant="outline-primary">View All Events</Button>
        </div>
      </Container>
    </section>
  );
};

export default GovernanceEvents; 