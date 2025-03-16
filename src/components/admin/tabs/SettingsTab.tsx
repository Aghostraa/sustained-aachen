import React, { useState } from 'react';
import { Row, Col, Card, Button, Form, Alert, Tabs, Tab } from 'react-bootstrap';
import { FaSave, FaTrash, FaExclamationTriangle } from 'react-icons/fa';
import { Project } from '../../project/ProjectHero';

interface SettingsTabProps {
  project: Project;
}

const SettingsTab: React.FC<SettingsTabProps> = ({ project }) => {
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [activeTab, setActiveTab] = useState('general');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleSaveSettings = () => {
    // In a real app, this would be an API call
    setAlertMessage('Project settings saved successfully!');
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
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
        <h2 className="h4 mb-0">Project Settings</h2>
        <Button variant="primary" size="sm" onClick={handleSaveSettings}>
          <FaSave className="me-2" />
          Save All Settings
        </Button>
      </div>

      <Tabs
        activeKey={activeTab}
        onSelect={(k) => setActiveTab(k || 'general')}
        className="mb-4"
      >
        <Tab eventKey="general" title="General">
          <Card className="border-0 shadow-sm mb-4">
            <Card.Body>
              <h5 className="mb-4">Basic Information</h5>
              <Form>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Project Title</Form.Label>
                      <Form.Control 
                        type="text" 
                        defaultValue={project.title}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Project Icon Text</Form.Label>
                      <Form.Control 
                        type="text" 
                        defaultValue={project.iconText}
                        maxLength={3}
                      />
                      <Form.Text className="text-muted">
                        Maximum 3 characters
                      </Form.Text>
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Icon Color</Form.Label>
                      <Form.Control 
                        type="color" 
                        defaultValue={project.iconColor}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Creator/Organization</Form.Label>
                      <Form.Control 
                        type="text" 
                        defaultValue={project.creator}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Form.Group className="mb-3">
                  <Form.Label>Short Description</Form.Label>
                  <Form.Control 
                    as="textarea" 
                    rows={2}
                    defaultValue={project.description}
                  />
                  <Form.Text className="text-muted">
                    Brief description (max 200 characters)
                  </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Long Description</Form.Label>
                  <Form.Control 
                    as="textarea" 
                    rows={5}
                    defaultValue={project.longDescription}
                  />
                </Form.Group>
              </Form>
            </Card.Body>
          </Card>

          <Card className="border-0 shadow-sm mb-4">
            <Card.Body>
              <h5 className="mb-4">Project Tags & Categories</h5>
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Project Tags</Form.Label>
                  <Form.Control 
                    type="text" 
                    defaultValue={project.tags.join(', ')}
                  />
                  <Form.Text className="text-muted">
                    Separate tags with commas
                  </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Generational Focus</Form.Label>
                  <Form.Select defaultValue={project.generationalFocus || 'both'}>
                    <option value="established">Established (Older initiatives)</option>
                    <option value="emerging">Emerging (Newer initiatives)</option>
                    <option value="both">Both</option>
                  </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Governance Structure</Form.Label>
                  <Form.Control 
                    type="text" 
                    defaultValue={project.governanceStructure}
                  />
                </Form.Group>
              </Form>
            </Card.Body>
          </Card>

          <Card className="border-0 shadow-sm">
            <Card.Body>
              <h5 className="mb-4">Funding Information</h5>
              <Form>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Target Amount (€)</Form.Label>
                      <Form.Control 
                        type="number" 
                        defaultValue={project.targetAmount}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Current Amount Raised (€)</Form.Label>
                      <Form.Control 
                        type="number" 
                        defaultValue={project.amountRaised}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Days Remaining</Form.Label>
                      <Form.Control 
                        type="number" 
                        defaultValue={project.daysToGo}
                      />
                      <Form.Text className="text-muted">
                        Use 0 for ongoing initiatives
                      </Form.Text>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Funding Sources</Form.Label>
                      <Form.Control 
                        type="text" 
                        defaultValue={project.fundingSources?.join(', ')}
                      />
                      <Form.Text className="text-muted">
                        Separate sources with commas
                      </Form.Text>
                    </Form.Group>
                  </Col>
                </Row>
              </Form>
            </Card.Body>
          </Card>
        </Tab>

        <Tab eventKey="sdg" title="SDG Alignment">
          <Card className="border-0 shadow-sm mb-4">
            <Card.Body>
              <h5 className="mb-4">Sustainable Development Goals</h5>
              <p className="text-muted mb-4">
                Select which UN Sustainable Development Goals your project contributes to.
              </p>
              <Form>
                <Row>
                  {[
                    { number: 1, name: 'No Poverty', color: '#e5243b' },
                    { number: 2, name: 'Zero Hunger', color: '#dda63a' },
                    { number: 3, name: 'Good Health', color: '#4c9f38' },
                    { number: 4, name: 'Quality Education', color: '#c5192d' },
                    { number: 5, name: 'Gender Equality', color: '#ff3a21' },
                    { number: 6, name: 'Clean Water', color: '#26bde2' },
                    { number: 7, name: 'Affordable Energy', color: '#fcc30b' },
                    { number: 8, name: 'Decent Work', color: '#a21942' },
                    { number: 9, name: 'Industry & Innovation', color: '#fd6925' },
                    { number: 10, name: 'Reduced Inequalities', color: '#dd1367' },
                    { number: 11, name: 'Sustainable Cities', color: '#fd9d24' },
                    { number: 12, name: 'Responsible Consumption', color: '#bf8b2e' },
                    { number: 13, name: 'Climate Action', color: '#3f7e44' },
                    { number: 14, name: 'Life Below Water', color: '#0a97d9' },
                    { number: 15, name: 'Life on Land', color: '#56c02b' },
                    { number: 16, name: 'Peace & Justice', color: '#00689d' },
                    { number: 17, name: 'Partnerships', color: '#19486a' }
                  ].map(sdg => {
                    const isSelected = project.sdgAlignment.some(s => s.number === sdg.number);
                    return (
                      <Col md={4} key={sdg.number} className="mb-3">
                        <Form.Check 
                          type="checkbox"
                          id={`sdg-${sdg.number}`}
                          label={
                            <span>
                              <span 
                                className="d-inline-block me-2 rounded-circle text-white text-center"
                                style={{ 
                                  width: 24, 
                                  height: 24, 
                                  backgroundColor: sdg.color,
                                  fontSize: '0.8rem',
                                  lineHeight: '24px'
                                }}
                              >
                                {sdg.number}
                              </span>
                              {sdg.name}
                            </span>
                          }
                          defaultChecked={isSelected}
                        />
                      </Col>
                    );
                  })}
                </Row>
              </Form>
            </Card.Body>
          </Card>
        </Tab>

        <Tab eventKey="media" title="Media & Gallery">
          <Card className="border-0 shadow-sm mb-4">
            <Card.Body>
              <h5 className="mb-4">Project Gallery</h5>
              <p className="text-muted mb-4">
                Manage the images that appear in your project gallery.
              </p>
              <Form>
                <div className="mb-4">
                  <Row>
                    {project.gallery.map((image, index) => (
                      <Col md={4} key={index} className="mb-3">
                        <div className="position-relative">
                          <img 
                            src={image} 
                            alt={`Gallery image ${index + 1}`} 
                            className="img-fluid rounded"
                            style={{ height: '150px', width: '100%', objectFit: 'cover' }}
                          />
                          <Button 
                            variant="danger" 
                            size="sm" 
                            className="position-absolute top-0 end-0 m-2"
                          >
                            <FaTrash />
                          </Button>
                        </div>
                      </Col>
                    ))}
                  </Row>
                </div>
                <Form.Group className="mb-3">
                  <Form.Label>Add New Image</Form.Label>
                  <Form.Control 
                    type="file" 
                    accept="image/*"
                  />
                </Form.Group>
                <Button variant="outline-primary">
                  Upload Image
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Tab>

        <Tab eventKey="team" title="Team Members">
          <Card className="border-0 shadow-sm mb-4">
            <Card.Body>
              <h5 className="mb-4">Project Team</h5>
              <p className="text-muted mb-4">
                Manage the team members displayed on your project page.
              </p>
              <Form>
                {project.team.map((member, index) => (
                  <Row key={index} className="mb-3 align-items-end">
                    <Col md={3}>
                      <Form.Group>
                        <Form.Label>Initials</Form.Label>
                        <Form.Control 
                          type="text" 
                          defaultValue={member.initials}
                          maxLength={2}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={4}>
                      <Form.Group>
                        <Form.Label>Name</Form.Label>
                        <Form.Control 
                          type="text" 
                          defaultValue={member.name}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={4}>
                      <Form.Group>
                        <Form.Label>Role</Form.Label>
                        <Form.Control 
                          type="text" 
                          defaultValue={member.role}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={1}>
                      <Button variant="outline-danger" size="sm">
                        <FaTrash />
                      </Button>
                    </Col>
                  </Row>
                ))}
                <Button variant="outline-primary" className="mt-3">
                  Add Team Member
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Tab>

        <Tab eventKey="danger" title="Danger Zone">
          <Card className="border-0 shadow-sm mb-4 border-danger">
            <Card.Header className="bg-danger text-white">
              <h5 className="mb-0">Danger Zone</h5>
            </Card.Header>
            <Card.Body>
              <div className="mb-4">
                <h6>Archive Project</h6>
                <p className="text-muted">
                  Archiving will hide the project from public view but preserve all data.
                </p>
                <Button variant="warning">
                  Archive Project
                </Button>
              </div>
              
              <hr />
              
              <div className="mb-4">
                <h6>Transfer Ownership</h6>
                <p className="text-muted">
                  Transfer this project to another administrator.
                </p>
                <Row>
                  <Col md={8}>
                    <Form.Control 
                      type="email" 
                      placeholder="Enter email of new owner"
                    />
                  </Col>
                  <Col md={4}>
                    <Button variant="outline-secondary">
                      Transfer
                    </Button>
                  </Col>
                </Row>
              </div>
              
              <hr />
              
              <div>
                <h6>Delete Project</h6>
                <p className="text-muted">
                  Permanently delete this project and all associated data. This action cannot be undone.
                </p>
                {!showDeleteConfirm ? (
                  <Button 
                    variant="outline-danger"
                    onClick={() => setShowDeleteConfirm(true)}
                  >
                    Delete Project
                  </Button>
                ) : (
                  <Alert variant="danger">
                    <div className="d-flex align-items-center">
                      <FaExclamationTriangle className="me-2" size={24} />
                      <div>
                        <p className="mb-2 fw-bold">Are you absolutely sure?</p>
                        <p className="mb-3">This will permanently delete the project "{project.title}" and all associated data.</p>
                        <div>
                          <Button 
                            variant="danger" 
                            className="me-2"
                          >
                            Yes, Delete Project
                          </Button>
                          <Button 
                            variant="secondary"
                            onClick={() => setShowDeleteConfirm(false)}
                          >
                            Cancel
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Alert>
                )}
              </div>
            </Card.Body>
          </Card>
        </Tab>
      </Tabs>
    </div>
  );
};

export default SettingsTab; 