import React from 'react';
import { Container } from 'react-bootstrap';
import QFRoundPage from '../components/ecofundsim/qfround/QFRoundPage';

const StudentQFRoundPage: React.FC = () => {
  return (
    <Container fluid className="py-4">
      <h1 className="mb-4 text-center">Aachen Sustainability Quadratic Funding Round</h1>
      <p className="text-center mb-5">
        Explore how Quadratic Funding empowers sustainability initiatives in Aachen
        by allocating resources based on community support rather than individual contribution size.
      </p>
      <QFRoundPage />
    </Container>
  );
};

export default StudentQFRoundPage; 