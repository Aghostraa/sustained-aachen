import React from 'react';
import ImpactHeader from '../components/impact/ImpactHeader';
import LiveImpactMetrics from '../components/impact/LiveImpactMetrics';
import ImpactMap from '../components/impact/ImpactMap';
import DistrictImpact from '../components/impact/DistrictImpact';
import SdgAlignment from '../components/impact/SdgAlignment';
import ImpactStories from '../components/impact/ImpactStories';
import EnvironmentalMetrics from '../components/impact/EnvironmentalMetrics';
import CommunityPulse from '../components/impact/CommunityPulse';
import ImpactCalculator from '../components/impact/ImpactCalculator';

const ImpactPage: React.FC = () => {
  return (
    <>
      <ImpactHeader />
      <LiveImpactMetrics />
      <ImpactMap />
      <DistrictImpact />
      <SdgAlignment />
      <ImpactStories />
      <EnvironmentalMetrics />
      <CommunityPulse />
      <ImpactCalculator />
    </>
  );
};

export default ImpactPage; 