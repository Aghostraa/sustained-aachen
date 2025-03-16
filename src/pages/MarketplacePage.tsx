import React from 'react';
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
      <ProjectsGrid />
      <FundingRounds />
      <CallToAction />
    </>
  );
};

export default MarketplacePage; 