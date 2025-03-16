import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { projectsData } from '../../data/projectData';
import { Project } from '../project/ProjectHero';
import ProjectAdminHeader from './ProjectAdminHeader';
import ProjectAdminTabs from './ProjectAdminTabs';
import ProjectOverviewTab from './tabs/ProjectOverviewTab';
import ParticipantsTab from './tabs/ParticipantsTab';
import UpdatesTab from './tabs/UpdatesTab';
import ResourcesTab from './tabs/ResourcesTab';
import CommunityTab from './tabs/CommunityTab';
import SettingsTab from './tabs/SettingsTab';

type TabType = 'overview' | 'participants' | 'updates' | 'resources' | 'community' | 'settings';

const ProjectAdminDashboard: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const [activeTab, setActiveTab] = useState<TabType>('overview');

  useEffect(() => {
    // In a real app, this would be an API call
    if (projectId && projectsData[projectId]) {
      setProject(projectsData[projectId]);
    }
  }, [projectId]);

  if (!project) {
    return <Container className="py-5"><h2>Project not found</h2></Container>;
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return <ProjectOverviewTab project={project} />;
      case 'participants':
        return <ParticipantsTab project={project} />;
      case 'updates':
        return <UpdatesTab project={project} />;
      case 'resources':
        return <ResourcesTab project={project} />;
      case 'community':
        return <CommunityTab project={project} />;
      case 'settings':
        return <SettingsTab project={project} />;
      default:
        return <ProjectOverviewTab project={project} />;
    }
  };

  return (
    <div className="admin-dashboard">
      <ProjectAdminHeader project={project} />
      <Container className="py-4">
        <Row>
          <Col>
            <ProjectAdminTabs activeTab={activeTab} onTabChange={setActiveTab} />
            <div className="tab-content mt-4">
              {renderTabContent()}
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ProjectAdminDashboard; 