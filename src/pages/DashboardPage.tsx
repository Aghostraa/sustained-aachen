import React, { useState } from 'react';
import DashboardHeader from '../components/dashboard/DashboardHeader';
import DashboardTabs from '../components/dashboard/DashboardTabs';
import OverviewTab from '../components/dashboard/tabs/OverviewTab';
import ContributionsTab from '../components/dashboard/tabs/ContributionsTab';
import ActionsTab from '../components/dashboard/tabs/ActionsTab';
import LearningTab from '../components/dashboard/tabs/LearningTab';
import SettingsTab from '../components/dashboard/tabs/SettingsTab';
import { Container } from 'react-bootstrap';

type TabType = 'overview' | 'contributions' | 'actions' | 'learning' | 'settings';

const DashboardPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('overview');

  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
  };

  return (
    <>
      <DashboardHeader />
      
      <section className="py-5">
        <Container>
          <DashboardTabs activeTab={activeTab} onTabChange={handleTabChange} />
          
          <div className="mt-4">
            {activeTab === 'overview' && <OverviewTab />}
            {activeTab === 'contributions' && <ContributionsTab />}
            {activeTab === 'actions' && <ActionsTab />}
            {activeTab === 'learning' && <LearningTab />}
            {activeTab === 'settings' && <SettingsTab />}
          </div>
        </Container>
      </section>
    </>
  );
};

export default DashboardPage; 