import React from 'react';
import { Alert } from 'react-bootstrap';

const SettingsTab: React.FC = () => {
  return (
    <div className="dashboard-settings">
      <section className="mb-4">
        <h2 className="h4 mb-3">Account Settings</h2>
        <Alert variant="info">
          <p className="mb-0">Your account settings and preferences will be displayed here.</p>
        </Alert>
      </section>
    </div>
  );
};

export default SettingsTab; 