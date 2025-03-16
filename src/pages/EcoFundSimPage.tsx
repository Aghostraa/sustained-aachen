import React from 'react';
import { Container } from 'react-bootstrap';
import EcoFundSimContainer from '../components/ecofundsim/EcoFundSimPage';

const EcoFundSimPage: React.FC = () => {
  return (
    <Container fluid className="py-4">
      <h1 className="mb-4 text-center">EcoFundSim: Sustainable Quadratic Funding Simulator</h1>
      <p className="text-center mb-5">
        Explore how different quadratic funding models can support Aachen's sustainability initiatives
        while addressing the challenges of whale donors, collusion, and ensuring democratic funding.
      </p>
      <EcoFundSimContainer />
    </Container>
  );
};

export default EcoFundSimPage; 