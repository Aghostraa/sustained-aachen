import React from 'react';
import { Row, Col, Card, Button } from 'react-bootstrap';
import ImpactSummary from '../overview/ImpactSummary';
import RecentActivity from '../overview/RecentActivity';
import ImpactMetrics from '../overview/ImpactMetrics';
import RecommendedProjects from '../overview/RecommendedProjects';
import UpcomingEvents from '../overview/UpcomingEvents';

const OverviewTab: React.FC = () => {
  return (
    <div className="dashboard-overview">
      {/* Impact Summary */}
      <section className="mb-4">
        <h2 className="h4 mb-3">Your Impact Summary</h2>
        <ImpactSummary />
      </section>

      {/* Recent Activity */}
      <section className="mb-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h2 className="h4 mb-0">Recent Activity</h2>
          <Button variant="link" className="p-0 text-decoration-none">View All</Button>
        </div>
        <RecentActivity />
      </section>

      {/* Impact Metrics */}
      <section className="mb-4">
        <h2 className="h4 mb-3">Your Impact Metrics</h2>
        <ImpactMetrics />
      </section>

      {/* Recommended Projects */}
      <section className="mb-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h2 className="h4 mb-0">Recommended for You</h2>
          <Button 
            variant="link" 
            className="p-0 text-decoration-none"
            as="a" 
            href="/marketplace"
          >
            View All Projects
          </Button>
        </div>
        <RecommendedProjects />
      </section>

      {/* Upcoming Events */}
      <section className="mb-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h2 className="h4 mb-0">Upcoming Events</h2>
          <Button variant="link" className="p-0 text-decoration-none">View All Events</Button>
        </div>
        <UpcomingEvents />
      </section>
    </div>
  );
};

export default OverviewTab; 