import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const GovernanceHeader: React.FC = () => {
  return (
    <section className="bg-light py-5">
      <Container>
        <Row className="justify-content-center text-center">
          <Col md={8}>
            <h1 className="fw-bold mb-3">Governance Forum</h1>
            <p className="lead mb-0">
              Shape the future of sustainability in Aachen through community decision-making
            </p>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default GovernanceHeader; 