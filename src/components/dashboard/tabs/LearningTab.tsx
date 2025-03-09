import React from 'react';
import { Alert } from 'react-bootstrap';

const LearningTab: React.FC = () => {
  return (
    <div className="dashboard-learning">
      <section className="mb-4">
        <h2 className="h4 mb-3">Learning Journey</h2>
        <Alert variant="info">
          <p className="mb-0">Your sustainability courses and learning progress will be displayed here.</p>
        </Alert>
      </section>
    </div>
  );
};

export default LearningTab; 