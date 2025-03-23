import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import PageHeader from '../components/marketplace/PageHeader';
import MarketplaceFilters from '../components/marketplace/MarketplaceFilters';
import CurrentRound from '../components/marketplace/CurrentRound';
import ProjectsGrid from '../components/marketplace/ProjectsGrid';
import CallToAction from '../components/home/CallToAction';
import FundingRounds from '../components/marketplace/FundingRounds';

const MarketplacePage: React.FC = () => {
  return (
    <>
      <PageHeader />
      <MarketplaceFilters />
      <CurrentRound />
      <div className="container my-4">
        <div className="d-flex justify-content-center">
          <Link to="/student-qf-round">
            <Button variant="success" size="lg" className="px-4 py-2">
              Explore Student QF Round Demo
            </Button>
          </Link>
        </div>
        <p className="text-center text-muted mt-2">
          See how Quadratic Funding supports student-led sustainability initiatives
        </p>
      </div>
      <ProjectsGrid />
      <FundingRounds />
      <CallToAction />
    </>
  );
};

export default MarketplacePage; 