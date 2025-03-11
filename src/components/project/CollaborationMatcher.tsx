import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Badge, Form } from 'react-bootstrap';
import { FaHandshake, FaExchangeAlt, FaUsers } from 'react-icons/fa';
import { Project } from './ProjectHero';
import { projectsData } from '../../data/projectData';

interface CollaborationMatcherProps {
  currentProject: Project;
}

const CollaborationMatcher: React.FC<CollaborationMatcherProps> = ({ currentProject }) => {
  const [matchFilter, setMatchFilter] = useState<string>('all');
  
  // Get all projects except the current one
  const otherProjects = Object.values(projectsData).filter(
    project => project.id !== currentProject.id
  );
  
  // Logic to determine match strength
  const getMatchStrength = (project: Project): 'high' | 'medium' | 'low' => {
    // Calculate match based on several factors
    let matchScore = 0;
    
    // 1. Check SDG alignment overlap
    const sdgOverlap = currentProject.sdgAlignment.filter(
      sdg => project.sdgAlignment.some(otherSdg => otherSdg.number === sdg.number)
    ).length;
    
    if (sdgOverlap > 0) matchScore += sdgOverlap * 2;
    
    // 2. Check for complementary resources and needs
    if (currentProject.resourcesNeeded && project.resourcesNeeded) {
      // Look for cases where what this project needs another can provide
      const complementaryNeeds = currentProject.resourcesNeeded.filter(need => 
        // If our need type matches a skill in their collaboration opportunities
        project.collaborationOpportunities?.some(collab => 
          collab.skillsNeeded.some(skill => 
            skill.toLowerCase().includes(need.type.toLowerCase())
          )
        )
      ).length;
      
      matchScore += complementaryNeeds * 2;
    }
    
    // 3. Generational match (established + emerging is good)
    if (currentProject.generationalFocus === 'established' && project.generationalFocus === 'emerging' ||
        currentProject.generationalFocus === 'emerging' && project.generationalFocus === 'established') {
      matchScore += 3;
    }
    
    // 4. Tag overlaps indicate similar interests
    const tagOverlap = currentProject.tags.filter(
      tag => project.tags.includes(tag)
    ).length;
    
    matchScore += tagOverlap;
    
    // Determine strength based on score
    if (matchScore >= 5) return 'high';
    if (matchScore >= 2) return 'medium';
    return 'low';
  };
  
  // Calculate match strength for each project
  const projectsWithMatch = otherProjects.map(project => ({
    project,
    matchStrength: getMatchStrength(project)
  }));
  
  // Filter projects based on selected match strength
  const filteredProjects = matchFilter === 'all' 
    ? projectsWithMatch 
    : projectsWithMatch.filter(p => p.matchStrength === matchFilter);
  
  return (
    <section className="collaboration-matcher py-5">
      <Container>
        <div className="section-header text-center mb-5">
          <h2><FaHandshake className="me-2" /> Collaboration Matches</h2>
          <p className="lead">
            Find other initiatives that may be potential collaboration partners based on complementary needs, 
            resources, and shared goals.
          </p>
          
          <div className="filter-controls mt-4 d-flex justify-content-center">
            <Form.Group controlId="matchFilter" className="d-flex align-items-center">
              <Form.Label className="me-3 mb-0">Filter by match strength:</Form.Label>
              <Form.Select 
                value={matchFilter} 
                onChange={(e) => setMatchFilter(e.target.value)}
                style={{ width: '150px' }}
              >
                <option value="all">All matches</option>
                <option value="high">High match</option>
                <option value="medium">Medium match</option>
                <option value="low">Low match</option>
              </Form.Select>
            </Form.Group>
          </div>
        </div>
        
        <Row className="g-4">
          {filteredProjects.map(({ project, matchStrength }) => (
            <Col md={6} lg={4} key={project.id}>
              <Card className={`collaboration-match-card match-${matchStrength}`}>
                <div className="match-strength-indicator">
                  <span className={`indicator-dot ${matchStrength}`}></span>
                  <span className="ms-1">{matchStrength} match</span>
                </div>
                
                <Card.Body>
                  <div className="project-header d-flex align-items-center mb-3">
                    <div 
                      className="project-icon me-3"
                      style={{ 
                        backgroundColor: project.iconColor,
                        width: '40px',
                        height: '40px',
                        borderRadius: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontWeight: 'bold'
                      }}
                    >
                      {project.iconText}
                    </div>
                    <div>
                      <h3 className="mb-0 fs-5">{project.title}</h3>
                      <div className="project-type small text-muted">
                        {project.generationalFocus === 'established' ? 'Established Organization' : 
                         project.generationalFocus === 'emerging' ? 'Emerging Initiative' : 
                         'Cross-generational Initiative'}
                      </div>
                    </div>
                  </div>
                  
                  <div className="match-rationale mb-3">
                    <h4 className="fs-6">Why you might collaborate:</h4>
                    <ul className="small">
                      {project.sdgAlignment.some(sdg => 
                        currentProject.sdgAlignment.some(currentSdg => currentSdg.number === sdg.number)
                      ) && (
                        <li>Aligned with similar Sustainable Development Goals</li>
                      )}
                      
                      {project.tags.some(tag => currentProject.tags.includes(tag)) && (
                        <li>Shared focus areas in environmental action</li>
                      )}
                      
                      {project.generationalFocus !== currentProject.generationalFocus && (
                        <li>Complementary organizational experience levels</li>
                      )}
                      
                      <li>Potential for resource sharing and knowledge exchange</li>
                    </ul>
                  </div>
                  
                  <div className="potential-areas mb-3">
                    <h4 className="fs-6">Potential Collaboration Areas:</h4>
                    <div className="tags-container">
                      {project.collaborationOpportunities?.slice(0, 1).map((collab, i) => (
                        <div key={i}>
                          <Badge bg="light" text="dark" className="me-2 mb-2">{collab.title}</Badge>
                        </div>
                      ))}
                      {project.resourcesNeeded?.slice(0, 2).map((resource, i) => (
                        <Badge bg="light" text="dark" key={i} className="me-2 mb-2">
                          {resource.type.charAt(0).toUpperCase() + resource.type.slice(1)} sharing
                        </Badge>
                      ))}
                      <Badge bg="light" text="dark" className="me-2 mb-2">
                        <FaUsers className="me-1" /> Community building
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="d-flex">
                    <Button variant="outline-primary" className="me-2">
                      <FaExchangeAlt className="me-1" /> Connect
                    </Button>
                    <Button variant="link" href={`/project/${project.id}`}>View Details</Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default CollaborationMatcher; 