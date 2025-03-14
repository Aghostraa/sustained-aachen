import React from 'react';
import PageHeader from '../components/marketplace/PageHeader';
import MarketplaceFilters from '../components/marketplace/MarketplaceFilters';
import CurrentRound from '../components/marketplace/CurrentRound';
import ProjectsGrid from '../components/marketplace/ProjectsGrid';
import QuadraticCalculator from '../components/marketplace/QuadraticCalculator';
import CallToAction from '../components/home/CallToAction';
import FundingRounds from '../components/marketplace/FundingRounds';
import QuadraticFundingSimulator from '../components/marketplace/QuadraticFundingSimulator';

const MarketplacePage: React.FC = () => {
  return (
    <>
      <PageHeader />
      <MarketplaceFilters />
      <CurrentRound />
      <ProjectsGrid />
      <QuadraticCalculator />
      <QuadraticFundingSimulator />
      <CallToAction />
      <FundingRounds />
    </>
  );
};

export default MarketplacePage; 