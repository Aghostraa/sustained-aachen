import React from 'react';
import { Nav } from 'react-bootstrap';

type TabType = 'overview' | 'contributions' | 'actions' | 'learning' | 'settings';

interface DashboardTabsProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

const DashboardTabs: React.FC<DashboardTabsProps> = ({ activeTab, onTabChange }) => {
  const tabs: { id: TabType; label: string }[] = [
    { id: 'overview', label: 'Overview' },
    { id: 'contributions', label: 'My Contributions' },
    { id: 'actions', label: 'My Actions' },
    { id: 'learning', label: 'Learning' },
    { id: 'settings', label: 'Settings' }
  ];

  return (
    <Nav 
      variant="tabs" 
      className="dashboard-tabs border-bottom"
    >
      {tabs.map(tab => (
        <Nav.Item key={tab.id}>
          <Nav.Link
            className={activeTab === tab.id ? 'active fw-semibold' : 'text-secondary'}
            onClick={() => onTabChange(tab.id)}
          >
            {tab.label}
          </Nav.Link>
        </Nav.Item>
      ))}
    </Nav>
  );
};

export default DashboardTabs; 