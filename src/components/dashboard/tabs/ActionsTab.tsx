import React from 'react';
import { Alert } from 'react-bootstrap';

const ActionsTab: React.FC = () => {
  return (
    <div className="dashboard-actions">
      <section className="mb-4">
        <h2 className="h4 mb-3">My Actions</h2>
        <Alert variant="info">
          <p className="mb-0">Your volunteer work and sustainability actions will be displayed here.</p>
        </Alert>
      </section>
    </div>
  );
};

export default ActionsTab; 