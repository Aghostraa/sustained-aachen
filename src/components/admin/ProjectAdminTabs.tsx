import React from 'react';
import { Nav } from 'react-bootstrap';
import { 
  FaHome, 
  FaUsers, 
  FaNewspaper, 
  FaTools, 
  FaComments, 
  FaCog 
} from 'react-icons/fa';

type TabType = 'overview' | 'participants' | 'updates' | 'resources' | 'community' | 'settings';

interface ProjectAdminTabsProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

const ProjectAdminTabs: React.FC<ProjectAdminTabsProps> = ({ activeTab, onTabChange }) => {
  const tabs: { id: TabType; label: string; icon: React.ReactNode }[] = [
    { id: 'overview', label: 'Overview', icon: <FaHome /> },
    { id: 'participants', label: 'Participants', icon: <FaUsers /> },
    { id: 'updates', label: 'Updates', icon: <FaNewspaper /> },
    { id: 'resources', label: 'Resources', icon: <FaTools /> },
    { id: 'community', label: 'Community', icon: <FaComments /> },
    { id: 'settings', label: 'Settings', icon: <FaCog /> }
  ];

  return (
    <Nav 
      variant="tabs" 
      className="admin-dashboard-tabs border-bottom"
    >
      {tabs.map(tab => (
        <Nav.Item key={tab.id}>
          <Nav.Link
            className={activeTab === tab.id ? 'active fw-semibold' : 'text-secondary'}
            onClick={() => onTabChange(tab.id)}
          >
            <span className="me-2">{tab.icon}</span>
            {tab.label}
          </Nav.Link>
        </Nav.Item>
      ))}
    </Nav>
  );
};

export default ProjectAdminTabs; 