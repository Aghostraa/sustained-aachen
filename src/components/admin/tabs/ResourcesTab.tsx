import React, { useState } from 'react';
import { Row, Col, Card, Button, Form, Table, Tabs, Tab, Modal, Alert } from 'react-bootstrap';
import { FaPlus, FaEdit, FaTrash, FaHandsHelping, FaTools, FaBook } from 'react-icons/fa';
import { Project } from '../../project/ProjectHero';

interface ResourcesTabProps {
  project: Project;
}

// Define local interfaces for resources
interface ResourceNeeded {
  type: 'funding' | 'volunteer' | 'expertise' | 'space' | 'materials' | 'other';
  description: string;
  urgency: 'low' | 'medium' | 'high';
  quantity?: string;
}

interface VolunteerOpportunity {
  title: string;
  description: string;
  hoursPerMonth?: string;
  hoursPerWeek?: string;
  spots: number;
}

interface KnowledgeResource {
  title: string;
  url: string;
  description: string;
}

const ResourcesTab: React.FC<ResourcesTabProps> = ({ project }) => {
  const [activeTab, setActiveTab] = useState('needs');
  const [showAddResourceModal, setShowAddResourceModal] = useState(false);
  const [showAddOpportunityModal, setShowAddOpportunityModal] = useState(false);
  const [showAddKnowledgeModal, setShowAddKnowledgeModal] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const handleCloseAddResourceModal = () => setShowAddResourceModal(false);
  const handleShowAddResourceModal = () => setShowAddResourceModal(true);
  
  const handleCloseAddOpportunityModal = () => setShowAddOpportunityModal(false);
  const handleShowAddOpportunityModal = () => setShowAddOpportunityModal(true);
  
  const handleCloseAddKnowledgeModal = () => setShowAddKnowledgeModal(false);
  const handleShowAddKnowledgeModal = () => setShowAddKnowledgeModal(true);

  const handleAddResource = () => {
    // In a real app, this would be an API call
    setAlertMessage('Resource need added successfully!');
    setShowAlert(true);
    handleCloseAddResourceModal();
    setTimeout(() => setShowAlert(false), 3000);
  };

  const handleAddOpportunity = () => {
    // In a real app, this would be an API call
    setAlertMessage('Volunteer opportunity added successfully!');
    setShowAlert(true);
    handleCloseAddOpportunityModal();
    setTimeout(() => setShowAlert(false), 3000);
  };

  const handleAddKnowledge = () => {
    // In a real app, this would be an API call
    setAlertMessage('Knowledge resource added successfully!');
    setShowAlert(true);
    handleCloseAddKnowledgeModal();
    setTimeout(() => setShowAlert(false), 3000);
  };

  const getUrgencyBadgeColor = (urgency: string) => {
    switch (urgency) {
      case 'high':
        return 'danger';
      case 'medium':
        return 'warning';
      case 'low':
        return 'info';
      default:
        return 'secondary';
    }
  };

  const getResourceTypeIcon = (type: string) => {
    switch (type) {
      case 'funding':
        return <FaHandsHelping className="text-success" />;
      case 'volunteer':
        return <FaHandsHelping className="text-primary" />;
      case 'expertise':
        return <FaBook className="text-info" />;
      case 'materials':
        return <FaTools className="text-warning" />;
      default:
        return <FaTools className="text-secondary" />;
    }
  };

  return (
    <div>
      {showAlert && (
        <Alert 
          variant="success" 
          onClose={() => setShowAlert(false)} 
          dismissible
          className="mb-4"
        >
          {alertMessage}
        </Alert>
      )}

      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="h4 mb-0">Project Resources</h2>
      </div>

      <Tabs
        activeKey={activeTab}
        onSelect={(k) => setActiveTab(k || 'needs')}
        className="mb-4"
      >
        <Tab eventKey="needs" title="Resource Needs">
          <Card className="border-0 shadow-sm mb-4">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h5 className="mb-0">Current Resource Needs</h5>
                <Button variant="primary" size="sm" onClick={handleShowAddResourceModal}>
                  <FaPlus className="me-2" />
                  Add Resource Need
                </Button>
              </div>

              {project.resourcesNeeded && project.resourcesNeeded.length > 0 ? (
                <div className="table-responsive">
                  <Table hover className="align-middle">
                    <thead className="bg-light">
                      <tr>
                        <th>Type</th>
                        <th>Description</th>
                        <th>Urgency</th>
                        <th>Quantity</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {project.resourcesNeeded.map((resource, index) => (
                        <tr key={index}>
                          <td>
                            <div className="d-flex align-items-center">
                              <span className="me-2">{getResourceTypeIcon(resource.type)}</span>
                              <span className="text-capitalize">{resource.type}</span>
                            </div>
                          </td>
                          <td>{resource.description}</td>
                          <td>
                            <span className={`badge bg-${getUrgencyBadgeColor(resource.urgency)}`}>
                              {resource.urgency}
                            </span>
                          </td>
                          <td>{resource.quantity || '-'}</td>
                          <td>
                            <Button variant="outline-primary" size="sm" className="me-2">
                              <FaEdit />
                            </Button>
                            <Button variant="outline-danger" size="sm">
                              <FaTrash />
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              ) : (
                <div className="text-center py-5 text-muted">
                  No resource needs defined. Click "Add Resource Need" to add your first resource need.
                </div>
              )}
            </Card.Body>
          </Card>
        </Tab>

        <Tab eventKey="opportunities" title="Volunteer Opportunities">
          <Card className="border-0 shadow-sm mb-4">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h5 className="mb-0">Volunteer Opportunities</h5>
                <Button variant="primary" size="sm" onClick={handleShowAddOpportunityModal}>
                  <FaPlus className="me-2" />
                  Add Opportunity
                </Button>
              </div>

              {project.volunteerOpportunities && project.volunteerOpportunities.length > 0 ? (
                <div className="table-responsive">
                  <Table hover className="align-middle">
                    <thead className="bg-light">
                      <tr>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Time Commitment</th>
                        <th>Spots</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {project.volunteerOpportunities.map((opportunity, index) => (
                        <tr key={index}>
                          <td>{opportunity.title}</td>
                          <td>{opportunity.description}</td>
                          <td>
                            {opportunity.hoursPerWeek 
                              ? `${opportunity.hoursPerWeek} hours/week` 
                              : opportunity.hoursPerMonth 
                                ? `${opportunity.hoursPerMonth} hours/month`
                                : '-'
                            }
                          </td>
                          <td>{opportunity.spots}</td>
                          <td>
                            <Button variant="outline-primary" size="sm" className="me-2">
                              <FaEdit />
                            </Button>
                            <Button variant="outline-danger" size="sm">
                              <FaTrash />
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              ) : (
                <div className="text-center py-5 text-muted">
                  No volunteer opportunities defined. Click "Add Opportunity" to add your first volunteer opportunity.
                </div>
              )}
            </Card.Body>
          </Card>
        </Tab>

        <Tab eventKey="knowledge" title="Knowledge Resources">
          <Card className="border-0 shadow-sm mb-4">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h5 className="mb-0">Knowledge Resources</h5>
                <Button variant="primary" size="sm" onClick={handleShowAddKnowledgeModal}>
                  <FaPlus className="me-2" />
                  Add Knowledge Resource
                </Button>
              </div>

              {project.knowledgeResources && project.knowledgeResources.length > 0 ? (
                <div className="table-responsive">
                  <Table hover className="align-middle">
                    <thead className="bg-light">
                      <tr>
                        <th>Title</th>
                        <th>Description</th>
                        <th>URL</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {project.knowledgeResources.map((resource, index) => (
                        <tr key={index}>
                          <td>{resource.title}</td>
                          <td>{resource.description}</td>
                          <td>
                            <a href={resource.url} target="_blank" rel="noopener noreferrer">
                              {resource.url === '#' ? 'Link not available' : 'View Resource'}
                            </a>
                          </td>
                          <td>
                            <Button variant="outline-primary" size="sm" className="me-2">
                              <FaEdit />
                            </Button>
                            <Button variant="outline-danger" size="sm">
                              <FaTrash />
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              ) : (
                <div className="text-center py-5 text-muted">
                  No knowledge resources defined. Click "Add Knowledge Resource" to add your first knowledge resource.
                </div>
              )}
            </Card.Body>
          </Card>
        </Tab>
      </Tabs>

      {/* Add Resource Need Modal */}
      <Modal show={showAddResourceModal} onHide={handleCloseAddResourceModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add Resource Need</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Resource Type</Form.Label>
              <Form.Select>
                <option value="">Select resource type...</option>
                <option value="funding">Funding</option>
                <option value="volunteer">Volunteer</option>
                <option value="expertise">Expertise</option>
                <option value="space">Space</option>
                <option value="materials">Materials</option>
                <option value="other">Other</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control 
                as="textarea" 
                rows={3} 
                placeholder="Describe what you need..." 
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Urgency</Form.Label>
              <Form.Select>
                <option value="">Select urgency level...</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Quantity (optional)</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="e.g., €5,000 or 10 volunteers" 
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseAddResourceModal}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleAddResource}>
            Add Resource Need
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Add Volunteer Opportunity Modal */}
      <Modal show={showAddOpportunityModal} onHide={handleCloseAddOpportunityModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add Volunteer Opportunity</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="e.g., Event Coordinator" 
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control 
                as="textarea" 
                rows={3} 
                placeholder="Describe the volunteer role..." 
              />
            </Form.Group>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Time Commitment</Form.Label>
                  <Form.Select>
                    <option value="">Select time basis...</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Hours</Form.Label>
                  <Form.Control 
                    type="text" 
                    placeholder="e.g., 2-4" 
                  />
                </Form.Group>
              </Col>
            </Row>
            <Form.Group className="mb-3">
              <Form.Label>Number of Spots</Form.Label>
              <Form.Control 
                type="number" 
                min="1"
                placeholder="e.g., 3" 
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseAddOpportunityModal}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleAddOpportunity}>
            Add Opportunity
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Add Knowledge Resource Modal */}
      <Modal show={showAddKnowledgeModal} onHide={handleCloseAddKnowledgeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add Knowledge Resource</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="e.g., Volunteer Training Guide" 
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control 
                as="textarea" 
                rows={3} 
                placeholder="Describe the resource..." 
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>URL</Form.Label>
              <Form.Control 
                type="url" 
                placeholder="https://example.com/resource" 
              />
              <Form.Text className="text-muted">
                Enter the full URL including https://
              </Form.Text>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseAddKnowledgeModal}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleAddKnowledge}>
            Add Knowledge Resource
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ResourcesTab; 