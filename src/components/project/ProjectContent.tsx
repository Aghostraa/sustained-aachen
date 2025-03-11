import React, { useState } from 'react';
import { Row, Col, Button, Nav, ProgressBar, Badge } from 'react-bootstrap';
import { FaImages, FaChartLine, FaClock, FaUserFriends, FaEnvelope, FaExchangeAlt, FaHandsHelping, FaExclamationTriangle, FaTools, FaChartBar } from 'react-icons/fa';
import { Project } from './ProjectHero';

interface ProjectContentProps {
  project: Project;
}

const ProjectContent: React.FC<ProjectContentProps> = ({ project }) => {
  const [activeTab, setActiveTab] = useState('details');
  const [activeImage, setActiveImage] = useState(0);
  
  const formattedAmount = project.amountRaised.toLocaleString('de-DE', { 
    style: 'currency', 
    currency: 'EUR' 
  });
  
  return (
    <div className="project-layout mb-5">
      {/* Main content - Takes up 2 columns */}
      <div className="project-main">
        <div className="project-tabs mb-4">
          <Nav as="ul" className="w-100">
            <Nav.Item as="li" className="me-3">
              <Nav.Link 
                className={`tab ${activeTab === 'details' ? 'active' : ''}`}
                onClick={() => setActiveTab('details')}
                href="#"
              >
                Project details
              </Nav.Link>
            </Nav.Item>
            <Nav.Item as="li" className="me-3">
              <Nav.Link 
                className={`tab ${activeTab === 'impact' ? 'active' : ''}`}
                onClick={() => setActiveTab('impact')}
                href="#"
              >
                Impact Measurement
              </Nav.Link>
            </Nav.Item>
            <Nav.Item as="li" className="me-3">
              <Nav.Link 
                className={`tab ${activeTab === 'challenges' ? 'active' : ''}`}
                onClick={() => setActiveTab('challenges')}
                href="#"
              >
                Challenges
              </Nav.Link>
            </Nav.Item>
            <Nav.Item as="li">
              <Nav.Link 
                className={`tab ${activeTab === 'collaboration' ? 'active' : ''}`}
                onClick={() => setActiveTab('collaboration')}
                href="#"
              >
                Collaboration
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </div>
        
        {activeTab === 'details' && (
          <>
            <div className="content-card">
              <h2>About This Project</h2>
              {project.longDescription.split('\n\n').map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>

            <div className="content-card">
              <h2 className="mb-3"><FaImages className="me-2" /> Project Gallery</h2>
              <div className="project-gallery">
                <div className="gallery-image">
                  <img src={project.gallery[activeImage]} alt={`Gallery ${activeImage + 1}`} />
                </div>
                <div className="gallery-thumbnails">
                  {project.gallery.map((image, index) => (
                    <div 
                      key={index} 
                      className={`thumbnail ${index === activeImage ? 'active' : ''}`}
                      onClick={() => setActiveImage(index)}
                    >
                      <img src={image} alt={`Thumbnail ${index + 1}`} />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="content-card">
              <h2 className="mb-4"><FaChartLine className="me-2" /> Expected Impact</h2>
              <div className="impact-grid">
                <div className="impact-section">
                  <h3>SDG Alignment</h3>
                  <div className="sdg-icons">
                    {project.sdgAlignment.map((sdg, index) => (
                      <div className="sdg-icon" key={index}>
                        <div className="sdg-circle" style={{ backgroundColor: sdg.color }}>
                          {sdg.number}
                        </div>
                        <span>{sdg.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="impact-section">
                  <h3>Expected Outcomes</h3>
                  <ul className="impact-outcomes">
                    {project.outcomes.map((outcome, index) => (
                      <li key={index}>{outcome}</li>
                    ))}
                  </ul>
                </div>
                <div className="impact-section" style={{ gridColumn: '1 / -1' }}>
                  <h3>Progress Updates</h3>
                  <div className="progress-updates">
                    {project.updates.map((update, index) => (
                      <div className="update-item" key={index}>
                        <div className="update-date">{update.date}</div>
                        <div className="update-content">
                          <h4>{update.title}</h4>
                          <p>{update.content}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
        
        {activeTab === 'impact' && (
          <div className="content-card">
            <h2><FaChartBar className="me-2" /> Impact Measurement</h2>
            
            {project.impactMetrics && project.impactMetrics.length > 0 ? (
              <>
                <p>This project measures its impact using the following metrics:</p>
                <div className="metrics-grid mt-4">
                  {project.impactMetrics.map((metric, index) => (
                    <div className="metric-card" key={index}>
                      <h3>{metric.name}</h3>
                      <p>{metric.description}</p>
                      <div className="metric-progress">
                        <div className="d-flex justify-content-between">
                          <span>Current: {metric.currentValue}{metric.unit}</span>
                          <span>Target: {metric.targetValue}{metric.unit}</span>
                        </div>
                        <ProgressBar 
                          now={typeof metric.currentValue === 'number' && typeof metric.targetValue === 'number' 
                            ? (metric.currentValue / metric.targetValue) * 100 
                            : 50} 
                          className="mt-2"
                        />
                        <div className="text-muted mt-2 small">Last updated: {metric.lastUpdated}</div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="methodology-section mt-4">
                  <h3>Our Approach to Impact Measurement</h3>
                  <p>
                    We believe in transparent, community-driven impact measurement that balances quantitative 
                    metrics with qualitative outcomes and stories. Our approach focuses on what truly matters 
                    to our community stakeholders while maintaining scientific validity.
                  </p>
                </div>
              </>
            ) : (
              <p className="mt-4">
                This project's impact will be measured against the following metrics:
                <ul className="impact-outcomes">
                  <li>Number of farmers connected to urban markets</li>
                  <li>Number of educational workshops conducted</li>
                  <li>Carbon emissions reduction from decreased transportation</li>
                  <li>Economic impact on local farmers (income increase)</li>
                  <li>Community engagement in food policy discussions</li>
                </ul>
                <p className="mt-4">
                  Detailed impact reports will be published quarterly and will be available for all contributors.
                  The project team is committed to transparency and will use a combination of quantitative and
                  qualitative methods to assess the project's effectiveness and social return on investment.
                </p>
              </p>
            )}
          </div>
        )}
        
        {activeTab === 'challenges' && (
          <div className="content-card">
            <h2><FaExclamationTriangle className="me-2" /> Current Challenges</h2>
            
            {project.challenges && project.challenges.length > 0 ? (
              <>
                <p>These are the key challenges our initiative is currently addressing:</p>
                <div className="challenges-list mt-4">
                  {project.challenges.map((challenge, index) => (
                    <div className="challenge-item" key={index}>
                      <div className="challenge-header">
                        <h3>{challenge.title}</h3>
                        <div className="challenge-badges">
                          <Badge bg={challenge.severity === 'high' ? 'danger' : 
                                    challenge.severity === 'medium' ? 'warning' : 'info'} 
                                 className="me-2">
                            {challenge.severity} priority
                          </Badge>
                          <Badge bg={challenge.status === 'active' ? 'danger' : 
                                    challenge.status === 'addressing' ? 'warning' : 'success'}>
                            {challenge.status}
                          </Badge>
                        </div>
                      </div>
                      <p>{challenge.description}</p>
                    </div>
                  ))}
                </div>
                
                <div className="resources-needed mt-5">
                  <h3><FaTools className="me-2" /> Resources Needed</h3>
                  <p>Help us overcome these challenges by contributing the following resources:</p>
                  
                  <div className="resources-grid">
                    {project.resourcesNeeded && project.resourcesNeeded.map((resource, index) => (
                      <div className="resource-item" key={index}>
                        <div className="resource-type">
                          <Badge bg="secondary" className="resource-badge">
                            {resource.type.charAt(0).toUpperCase() + resource.type.slice(1)}
                          </Badge>
                          <span className={`urgency-indicator ${resource.urgency}`}></span>
                        </div>
                        <div className="resource-details">
                          <p>{resource.description}</p>
                          {resource.quantity && <p className="resource-quantity">Needed: {resource.quantity}</p>}
                        </div>
                        <Button variant="outline-primary" size="sm">Contribute</Button>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <p>
                Our initiative faces several key challenges that we're actively working to address:
                <ul className="challenges-list">
                  <li><strong>Funding limitations:</strong> Securing sustainable funding for our ongoing activities</li>
                  <li><strong>Volunteer retention:</strong> Maintaining an engaged volunteer base, particularly across generations</li>
                  <li><strong>Public visibility:</strong> Increasing awareness of our work throughout Aachen</li>
                  <li><strong>Administrative burden:</strong> Managing organizational tasks with limited resources</li>
                </ul>
                
                <div className="mt-4">
                  <h3>How You Can Help</h3>
                  <p>
                    We welcome support in addressing these challenges, whether through financial contributions, 
                    volunteering your expertise, or connecting us with potential resources or partners.
                  </p>
                  <Button variant="outline-primary">Contact Us to Discuss</Button>
                </div>
              </p>
            )}
          </div>
        )}
        
        {activeTab === 'collaboration' && (
          <div className="content-card">
            <h2><FaHandsHelping className="me-2" /> Collaboration Opportunities</h2>
            
            {project.collaborationOpportunities && project.collaborationOpportunities.length > 0 ? (
              <>
                <p>We're actively seeking collaborations with other initiatives in the following areas:</p>
                
                <div className="collaboration-list mt-4">
                  {project.collaborationOpportunities.map((collab, index) => (
                    <div className="collaboration-item" key={index}>
                      <h3>{collab.title}</h3>
                      <p>{collab.description}</p>
                      
                      <div className="collaboration-details">
                        <div className="collab-section">
                          <h4>Mutual Benefits</h4>
                          <ul>
                            {collab.benefitsToBoth.map((benefit, bidx) => (
                              <li key={bidx}>{benefit}</li>
                            ))}
                          </ul>
                        </div>
                        
                        <div className="collab-section">
                          <h4>Skills/Resources Needed</h4>
                          <div className="skills-list">
                            {collab.skillsNeeded.map((skill, sidx) => (
                              <Badge bg="light" text="dark" key={sidx} className="me-2 mb-2">
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                      
                      <div className="collab-footer">
                        <div>
                          <strong>Timeframe:</strong> {collab.timeframe}
                          {collab.contactPerson && (
                            <span className="ms-3"><strong>Contact:</strong> {collab.contactPerson}</span>
                          )}
                        </div>
                        <Button variant="primary">Propose Collaboration</Button>
                      </div>
                    </div>
                  ))}
                </div>
                
                {project.knowledgeResources && project.knowledgeResources.length > 0 && (
                  <div className="knowledge-resources mt-5">
                    <h3><FaExchangeAlt className="me-2" /> Knowledge Resources We're Sharing</h3>
                    <p>Resources we've developed that may benefit other initiatives:</p>
                    
                    <div className="resources-grid">
                      {project.knowledgeResources.map((resource, index) => (
                        <div className="knowledge-resource-item" key={index}>
                          <h4>{resource.title}</h4>
                          <p>{resource.description}</p>
                          <a href={resource.url} target="_blank" rel="noopener noreferrer" className="btn btn-outline-primary btn-sm">
                            Access Resource
                          </a>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div>
                <p>
                  We believe in the power of collaboration between initiatives to create greater collective impact.
                  Our organization is interested in connecting with other projects in Aachen to share resources,
                  knowledge, and create joint initiatives.
                </p>
                
                <div className="collaboration-areas mt-4">
                  <h3>Areas for Potential Collaboration</h3>
                  <ul>
                    <li><strong>Knowledge sharing:</strong> Exchange expertise and best practices</li>
                    <li><strong>Resource pooling:</strong> Share physical resources, space, or tools</li>
                    <li><strong>Joint events:</strong> Co-create workshops or community activities</li>
                    <li><strong>Cross-promotion:</strong> Enhance visibility for all participating initiatives</li>
                    <li><strong>Mentorship:</strong> Connect established and emerging initiatives</li>
                  </ul>
                </div>
                
                <Button variant="primary" className="mt-3">Contact Us to Discuss Collaboration</Button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Sidebar - Takes up 1 column */}
      <div className="project-sidebar">
        <div className="sidebar-card funding-widget">
          <div className="funding-amount">{formattedAmount}</div>
          <div className="funding-label">funding received in current round</div>
          
          <div className="funding-stats">
            <div className="stat-item">
              <div className="stat-value">{project.contributors}</div>
              <div className="stat-label">contributors</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">{project.daysToGo}</div>
              <div className="stat-label">days to go</div>
            </div>
          </div>
          
          <Button variant="primary" className="w-100 mb-2">Contribute Now</Button>
        </div>

        <div className="sidebar-card volunteer-widget">
          <h3 className="mb-3">Volunteer Opportunities</h3>
          <div className="volunteer-list">
            {project.volunteerOpportunities.map((opportunity, index) => (
              <div className="volunteer-item" key={index}>
                <h4>{opportunity.title}</h4>
                <p>{opportunity.description}</p>
                <div className="volunteer-meta">
                  <span>
                    <FaClock className="me-2" /> 
                    {opportunity.hoursPerMonth ? 
                      `${opportunity.hoursPerMonth} hours/month` : 
                      `${opportunity.hoursPerWeek} hours/week`}
                  </span>
                  <span><FaUserFriends className="me-2" /> {opportunity.spots} spots</span>
                </div>
                <Button variant="secondary" className="w-100">Apply</Button>
              </div>
            ))}
          </div>
        </div>

        <div className="sidebar-card team-widget">
          <h3 className="mb-3">Project Team</h3>
          <div className="team-list">
            {project.team.map((member, index) => (
              <div className="team-member" key={index}>
                <div className="member-avatar">{member.initials}</div>
                <div className="member-info">
                  <h4>{member.name}</h4>
                  <p>{member.role}</p>
                </div>
              </div>
            ))}
          </div>
          <a href="#" className="text-link mt-3 d-inline-block">
            Contact the team <FaEnvelope className="ms-2" />
          </a>
        </div>
        
        {/* New sidebar widget for initiative info */}
        <div className="sidebar-card initiative-info-widget">
          <h3 className="mb-3">About This Initiative</h3>
          
          {project.generationalFocus && (
            <div className="info-item">
              <strong>Initiative Type:</strong> 
              <span className="ms-2">
                {project.generationalFocus === 'established' ? 'Established Organization' : 
                 project.generationalFocus === 'emerging' ? 'Emerging Initiative' : 
                 'Cross-generational Initiative'}
              </span>
            </div>
          )}
          
          {project.governanceStructure && (
            <div className="info-item">
              <strong>Governance:</strong> 
              <span className="ms-2">{project.governanceStructure}</span>
            </div>
          )}
          
          {project.fundingSources && project.fundingSources.length > 0 && (
            <div className="info-item">
              <strong>Funding Sources:</strong>
              <div className="mt-2">
                {project.fundingSources.map((source, idx) => (
                  <Badge bg="light" text="dark" key={idx} className="me-2 mb-2">
                    {source}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectContent; 