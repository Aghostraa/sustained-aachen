import React from 'react';
import { Container, Row, Col, Badge, Button } from 'react-bootstrap';
import { FaCalendarAlt, FaClock } from 'react-icons/fa';

const CurrentRound: React.FC = () => {
  return (
    <section className="py-4">
      <Container>
        <div className="rounded-3 p-4 mb-4" style={{ background: 'linear-gradient(to right, #f0f9ff, #e0f2fe)' }}>
          <Row className="align-items-center">
            <Col md={8}>
              <h2 className="mb-2 fs-2 fw-bold">Aachen Sustainability Student Initiatives QF Round</h2>
              <div className="d-flex gap-4 align-items-center flex-wrap">
                <Badge bg="primary" className="rounded-pill px-3 py-2">Active</Badge>
                <div className="text-secondary d-flex align-items-center">
                  <FaCalendarAlt className="me-2" />
                  March 1 - 31, 2025
                </div>
                <div className="text-danger d-flex align-items-center">
                  <FaClock className="me-2" />
                  5 days remaining
                </div>
              </div>
              <div className="mt-3 d-flex align-items-center">
                <span className="text-secondary me-3">Sponsored by</span>
                <img 
                  src="/assets/sparkasse-aachen-logo.png" 
                  alt="Sparkasse Aachen" 
                  height="32"
                />
              </div>
            </Col>
            <Col md={4}>
              <div className="bg-white p-4 text-center rounded shadow-sm">
                <div className="fs-2 fw-bold text-primary">€15,000</div>
                <div className="text-secondary my-2">Matching Pool</div>
                <Button 
                  variant="primary" 
                  size="sm" 
                  className="px-3"
                >
                  About Matching
                </Button>
              </div>
            </Col>
          </Row>
        </div>
        <div className="p-3 bg-light border-start border-4 border-primary rounded mb-4">
          <p className="mb-0 text-secondary">
            This funding round will allocate resources to support contributions to sustainability
            projects in Aachen, focusing on enhancing community engagement, local food systems,
            climate action, and urban ecology.
          </p>
        </div>
      </Container>
    </section>
  );
};

export default CurrentRound; 