import React from 'react';
import { useParams } from 'react-router-dom';
import ProjectHero from '../components/project/ProjectHero';
import ProjectContent from '../components/project/ProjectContent';
import SimilarProjects from '../components/project/SimilarProjects';
import CollaborationMatcher from '../components/project/CollaborationMatcher';
import { Container } from 'react-bootstrap';
import { projectsData } from '../data/projectData';

const ProjectDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  
  // Get the project data from our projectsData object
  const project = id && projectsData[id] 
    ? projectsData[id] 
    : projectsData.baumschutzbund; // Default to baumschutzbund if ID not found

  return (
    <>
      <ProjectHero project={project} />
      <Container>
        <ProjectContent project={project} />
      </Container>
      <CollaborationMatcher currentProject={project} />
      <SimilarProjects projects={project.similarProjects} />
    </>
  );
};

export default ProjectDetailPage; 