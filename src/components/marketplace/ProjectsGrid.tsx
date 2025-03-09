import React, { useState } from 'react';
import { Container, Row, Col, Pagination, Button } from 'react-bootstrap';
import { FaThLarge, FaList } from 'react-icons/fa';
import ProjectCard from './ProjectCard';

// Mock data for the projects
const mockProjects = [
  {
    id: 'ernaehrungsrat',
    title: 'Ernährungsrat Aachen',
    iconText: 'ER',
    iconColor: '#4ade80',
    description: 'Regional food hub connecting local farmers with urban consumers to create a sustainable food system.',
    tags: ['Food Systems', 'Education'],
    amountRaised: 1427.50,
    contributors: 42,
    targetAmount: 2200
  },
  {
    id: 'bewegungsmelder',
    title: 'Bewegungsmelder Aachen',
    iconText: 'BM',
    iconColor: '#3b82f6',
    description: 'Platform connecting people with social and environmental initiatives through events and volunteer opportunities.',
    tags: ['Community', 'Volunteering'],
    amountRaised: 2184.75,
    contributors: 78,
    targetAmount: 2500
  },
  {
    id: 'aachenwasgeht',
    title: 'Aachen Was Geht',
    iconText: 'AW',
    iconColor: '#f59e0b',
    description: 'Local platform highlighting sustainable events and community initiatives throughout Aachen.',
    tags: ['Events', 'Community'],
    amountRaised: 1865.22,
    contributors: 63,
    targetAmount: 2400
  },
  {
    id: 'activeforfuture',
    title: 'ACtive for Future',
    iconText: 'AF',
    iconColor: '#10b981',
    description: 'School initiative promoting sustainability education and practical SDG implementation in Aachen schools.',
    tags: ['Education', 'Youth'],
    amountRaised: 956.40,
    contributors: 31,
    targetAmount: 1500
  },
  {
    id: 'klimaentscheid',
    title: 'Klimaentscheid Aachen',
    iconText: 'KA',
    iconColor: '#6366f1',
    description: 'Citizen initiative working to accelerate Aachen\'s path to climate neutrality through policy change and community action.',
    tags: ['Climate', 'Policy'],
    amountRaised: 1243.80,
    contributors: 47,
    targetAmount: 2000
  },
  {
    id: 'sekmuell',
    title: 'SEK Müll',
    iconText: 'SM',
    iconColor: '#ec4899',
    description: 'Student cleanup initiative organizing waste collection events and environmental awareness campaigns around Aachen.',
    tags: ['Waste', 'Students'],
    amountRaised: 742.25,
    contributors: 23,
    targetAmount: 1200
  }
];

type ViewMode = 'grid' | 'list';

const ProjectsGrid: React.FC = () => {
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  
  return (
    <section className="py-4">
      <Container>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="mb-0 fw-bold">All Projects (18)</h2>
          <div className="d-flex gap-3">
            <Button 
              variant={viewMode === 'grid' ? 'primary' : 'light'}
              onClick={() => setViewMode('grid')}
              className="d-flex align-items-center"
            >
              <FaThLarge className="me-2" /> Grid
            </Button>
            <Button 
              variant={viewMode === 'list' ? 'primary' : 'light'}
              onClick={() => setViewMode('list')}
              className="d-flex align-items-center"
            >
              <FaList className="me-2" /> List
            </Button>
          </div>
        </div>
        
        <Row className="g-4">
          {mockProjects.map(project => (
            <Col 
              key={project.id} 
              md={viewMode === 'grid' ? 6 : 12} 
              lg={viewMode === 'grid' ? 4 : 12}
            >
              <ProjectCard {...project} />
            </Col>
          ))}
        </Row>
        
        <div className="d-flex justify-content-center mt-5">
          <Pagination>
            <Pagination.Item active>{1}</Pagination.Item>
            <Pagination.Item>{2}</Pagination.Item>
            <Pagination.Item>{3}</Pagination.Item>
            <Pagination.Ellipsis />
            <Pagination.Item>
              Next <span className="ms-1">&raquo;</span>
            </Pagination.Item>
          </Pagination>
        </div>
      </Container>
    </section>
  );
};

export default ProjectsGrid; 