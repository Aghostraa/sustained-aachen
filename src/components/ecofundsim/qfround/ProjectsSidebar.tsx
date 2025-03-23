import React, { useState } from 'react';
import { Card, Form, ListGroup, InputGroup } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa';
import QFProjectCard, { QFProject } from './QFProjectCard';

interface ProjectsSidebarProps {
  projects: QFProject[];
  projectStats: { [projectId: string]: { contributions: number; matching: number; contributors: number } };
  selectedProjectId: string | null;
  onSelectProject: (projectId: string) => void;
}

const ProjectsSidebar: React.FC<ProjectsSidebarProps> = ({ 
  projects, 
  projectStats, 
  selectedProjectId, 
  onSelectProject 
}) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [categoryFilter, setCategoryFilter] = useState<string>('');
  
  // Get unique categories
  const categories = Array.from(new Set(projects.map(p => p.category).filter(Boolean))) as string[];
  
  // Filter projects based on search and category
  const filteredProjects = projects.filter(project => {
    const matchesSearch = searchTerm === '' || 
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      project.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = categoryFilter === '' || project.category === categoryFilter;
    
    return matchesSearch && matchesCategory;
  });
  
  return (
    <>
      <Card className="border-0 shadow-sm mb-4">
        <Card.Header className="bg-white border-0">
          <h5 className="mb-0">Browse Projects</h5>
        </Card.Header>
        <Card.Body>
          <Form className="mb-3">
            <InputGroup className="mb-3">
              <Form.Control
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <InputGroup.Text>
                <FaSearch />
              </InputGroup.Text>
            </InputGroup>
            
            <Form.Group>
              <Form.Label>Filter by category</Form.Label>
              <Form.Select 
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
              >
                <option value="">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </Form.Select>
            </Form.Group>
          </Form>
          
          <div className="mb-2 small text-muted">
            {filteredProjects.length} project{filteredProjects.length !== 1 ? 's' : ''} found
          </div>
        </Card.Body>
        
        <ListGroup variant="flush">
          {filteredProjects.map(project => (
            <ListGroup.Item key={project.id} className="p-2">
              <QFProjectCard
                project={project}
                stats={projectStats[project.id] || { contributions: 0, matching: 0, contributors: 0 }}
                isSelected={project.id === selectedProjectId}
                onSelect={() => onSelectProject(project.id)}
                compact={true}
              />
            </ListGroup.Item>
          ))}
          
          {filteredProjects.length === 0 && (
            <ListGroup.Item className="text-center py-4">
              No projects match your search criteria
            </ListGroup.Item>
          )}
        </ListGroup>
      </Card>
    </>
  );
};

export default ProjectsSidebar; 