import React from 'react';
import { Alert } from 'react-bootstrap';

const ContributionsTab: React.FC = () => {
  return (
    <div className="dashboard-contributions">
      <section className="mb-4">
        <h2 className="h4 mb-3">My Contributions</h2>
        <Alert variant="info">
          <p className="mb-0">Your financial contributions to sustainability projects will be displayed here.</p>
        </Alert>
      </section>
    </div>
  );
};

export default ContributionsTab; 