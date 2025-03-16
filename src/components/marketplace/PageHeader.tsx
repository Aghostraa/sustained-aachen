import React from 'react';
import { Container } from 'react-bootstrap';

const PageHeader: React.FC = () => {
  return (
    <section className="py-4 bg-light">
      <Container>
        <h1 className="mb-2 fw-bold">Funding</h1>
        <p className="text-secondary mb-0">Discover and support sustainability initiatives across Aachen</p>
      </Container>
    </section>
  );
};

export default PageHeader; 