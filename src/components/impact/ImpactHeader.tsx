import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const ImpactHeader: React.FC = () => {
  return (
    <section className="bg-light py-5 mb-4">
      <Container>
        <Row className="justify-content-center text-center">
          <Col md={8}>
            <h1 className="display-4 fw-bold mb-3">Impact Observatory</h1>
            <p className="lead text-muted fs-4">
              Tracking Aachen's collective progress toward sustainability
            </p>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default ImpactHeader; 