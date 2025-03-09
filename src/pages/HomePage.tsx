// src/pages/HomePage.tsx
import React from 'react';
import Hero from '../components/home/Hero';
import CommunityImpact from '../components/home/CommunityImpact';
import QuadraticFunding from '../components/home/QuadraticFunding';
import Governance from '../components/home/Governance';
import Events from '../components/home/Events';
import CallToAction from '../components/home/CallToAction';
import IndividualImpact from '../components/home/IndividualImpact';

const HomePage: React.FC = () => {
  return (
    <>
      <Hero />
      <IndividualImpact />
      <CommunityImpact />
      <QuadraticFunding />
      <Governance />
      <Events />
      <CallToAction />
    </>
  );
};

export default HomePage;