import React, { useState } from 'react';
import { Row, Col, Card, Table, Badge, Button, Form, Tabs, Tab, Alert } from 'react-bootstrap';
import { FaSearch, FaUserPlus, FaCheck, FaTimes, FaUserEdit } from 'react-icons/fa';
import { Project } from '../../project/ProjectHero';

interface ParticipantsTabProps {
  project: Project;
}

// Mock data for participants
const mockParticipants = [
  { 
    id: 1, 
    name: 'Julia Schmidt', 
    email: 'julia.schmidt@example.com', 
    role: 'Volunteer', 
    joinDate: '2025-01-15', 
    status: 'active',
    badges: ['Early Contributor', 'Community Builder']
  },
  { 
    id: 2, 
    name: 'Thomas Weber', 
    email: 'thomas.weber@example.com', 
    role: 'Coordinator', 
    joinDate: '2025-01-10', 
    status: 'active',
    badges: ['Project Lead', 'Funding Expert']
  },
  { 
    id: 3, 
    name: 'Maria Hausmann', 
    email: 'maria.hausmann@example.com', 
    role: 'Volunteer', 
    joinDate: '2025-02-05', 
    status: 'active',
    badges: ['Event Organizer']
  },
  { 
    id: 4, 
    name: 'Kai Neumann', 
    email: 'kai.neumann@example.com', 
    role: 'Contributor', 
    joinDate: '2025-02-20', 
    status: 'active',
    badges: []
  }
];

// Mock data for applications
const mockApplications = [
  { 
    id: 101, 
    name: 'Anna Müller', 
    email: 'anna.mueller@example.com', 
    position: 'Event Organizer', 
    applyDate: '2025-03-01', 
    status: 'pending',
    message: 'I have experience organizing community events and would love to contribute to your project.'
  },
  { 
    id: 102, 
    name: 'Lukas Fischer', 
    email: 'lukas.fischer@example.com', 
    position: 'Outreach Specialist', 
    applyDate: '2025-03-05', 
    status: 'pending',
    message: 'I work in marketing and would like to help with your community outreach efforts.'
  }
];

const ParticipantsTab: React.FC<ParticipantsTabProps> = ({ project }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('participants');
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const handleApprove = (id: number) => {
    setAlertMessage('Application approved successfully!');
    setShowSuccessAlert(true);
    setTimeout(() => setShowSuccessAlert(false), 3000);
  };

  const handleReject = (id: number) => {
    setAlertMessage('Application rejected.');
    setShowSuccessAlert(true);
    setTimeout(() => setShowSuccessAlert(false), 3000);
  };

  const filteredParticipants = mockParticipants.filter(participant => 
    participant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    participant.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    participant.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      {showSuccessAlert && (
        <Alert 
          variant="success" 
          onClose={() => setShowSuccessAlert(false)} 
          dismissible
          className="mb-4"
        >
          {alertMessage}
        </Alert>
      )}

      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="h4 mb-0">Participants Management</h2>
        <Button variant="primary" size="sm">
          <FaUserPlus className="me-2" />
          Invite Participant
        </Button>
      </div>

      <Tabs
        activeKey={activeTab}
        onSelect={(k) => setActiveTab(k || 'participants')}
        className="mb-4"
      >
        <Tab eventKey="participants" title="Current Participants">
          <Card className="border-0 shadow-sm mb-4">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center mb-4">
                <div className="d-flex align-items-center">
                  <Form.Group className="mb-0 me-2 position-relative">
                    <Form.Control
                      type="text"
                      placeholder="Search participants..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="ps-4"
                    />
                    <FaSearch className="position-absolute text-muted" style={{ left: '10px', top: '12px' }} />
                  </Form.Group>
                </div>
                <div>
                  <span className="text-muted me-2">Total: {mockParticipants.length}</span>
                </div>
              </div>

              <div className="table-responsive">
                <Table hover className="align-middle">
                  <thead className="bg-light">
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Role</th>
                      <th>Join Date</th>
                      <th>Badges</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredParticipants.map(participant => (
                      <tr key={participant.id}>
                        <td>{participant.name}</td>
                        <td>{participant.email}</td>
                        <td>
                          <Badge 
                            bg={participant.role === 'Coordinator' ? 'primary' : 
                               participant.role === 'Volunteer' ? 'success' : 'info'}
                          >
                            {participant.role}
                          </Badge>
                        </td>
                        <td>{new Date(participant.joinDate).toLocaleDateString()}</td>
                        <td>
                          {participant.badges.map((badge, idx) => (
                            <Badge key={idx} bg="secondary" className="me-1">{badge}</Badge>
                          ))}
                          {participant.badges.length === 0 && <span className="text-muted">-</span>}
                        </td>
                        <td>
                          <Button variant="outline-secondary" size="sm" className="me-2">
                            <FaUserEdit />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </Card.Body>
          </Card>
        </Tab>

        <Tab eventKey="applications" title="Applications">
          <Card className="border-0 shadow-sm mb-4">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h5 className="mb-0">Pending Applications</h5>
                <div>
                  <span className="text-muted">Total: {mockApplications.length}</span>
                </div>
              </div>

              <div className="table-responsive">
                <Table hover className="align-middle">
                  <thead className="bg-light">
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Position</th>
                      <th>Apply Date</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockApplications.map(application => (
                      <React.Fragment key={application.id}>
                        <tr>
                          <td>{application.name}</td>
                          <td>{application.email}</td>
                          <td>
                            <Badge bg="info">
                              {application.position}
                            </Badge>
                          </td>
                          <td>{new Date(application.applyDate).toLocaleDateString()}</td>
                          <td>
                            <Button 
                              variant="success" 
                              size="sm" 
                              className="me-2"
                              onClick={() => handleApprove(application.id)}
                            >
                              <FaCheck />
                            </Button>
                            <Button 
                              variant="danger" 
                              size="sm"
                              onClick={() => handleReject(application.id)}
                            >
                              <FaTimes />
                            </Button>
                          </td>
                        </tr>
                        <tr>
                          <td colSpan={5} className="bg-light">
                            <div className="p-2">
                              <strong>Message:</strong> {application.message}
                            </div>
                          </td>
                        </tr>
                      </React.Fragment>
                    ))}
                  </tbody>
                </Table>
              </div>
            </Card.Body>
          </Card>
        </Tab>

        <Tab eventKey="badges" title="Badges & Voting Rights">
          <Card className="border-0 shadow-sm mb-4">
            <Card.Body>
              <h5 className="mb-4">Project Badges & Voting Rights</h5>
              
              <p className="text-muted mb-4">
                Badges represent achievements and contributions to the project. They can also grant voting rights and access to community tokens.
              </p>
              
              <Row>
                <Col md={6} className="mb-4">
                  <Card className="h-100">
                    <Card.Header className="bg-light">
                      <h6 className="mb-0">Available Badges</h6>
                    </Card.Header>
                    <Card.Body>
                      <ul className="list-group list-group-flush">
                        <li className="list-group-item d-flex justify-content-between align-items-center">
                          <div>
                            <Badge bg="primary" className="me-2">Project Lead</Badge>
                            <span className="text-muted small">Leadership role</span>
                          </div>
                          <Badge bg="success">10 votes</Badge>
                        </li>
                        <li className="list-group-item d-flex justify-content-between align-items-center">
                          <div>
                            <Badge bg="info" className="me-2">Early Contributor</Badge>
                            <span className="text-muted small">First 20 contributors</span>
                          </div>
                          <Badge bg="success">5 votes</Badge>
                        </li>
                        <li className="list-group-item d-flex justify-content-between align-items-center">
                          <div>
                            <Badge bg="secondary" className="me-2">Community Builder</Badge>
                            <span className="text-muted small">Active community participation</span>
                          </div>
                          <Badge bg="success">3 votes</Badge>
                        </li>
                        <li className="list-group-item d-flex justify-content-between align-items-center">
                          <div>
                            <Badge bg="warning" className="me-2">Event Organizer</Badge>
                            <span className="text-muted small">Organized project events</span>
                          </div>
                          <Badge bg="success">3 votes</Badge>
                        </li>
                        <li className="list-group-item d-flex justify-content-between align-items-center">
                          <div>
                            <Badge bg="danger" className="me-2">Funding Expert</Badge>
                            <span className="text-muted small">Contributed to funding efforts</span>
                          </div>
                          <Badge bg="success">5 votes</Badge>
                        </li>
                      </ul>
                    </Card.Body>
                  </Card>
                </Col>
                
                <Col md={6}>
                  <Card className="h-100">
                    <Card.Header className="bg-light">
                      <h6 className="mb-0">Assign Badges</h6>
                    </Card.Header>
                    <Card.Body>
                      <Form>
                        <Form.Group className="mb-3">
                          <Form.Label>Select Participant</Form.Label>
                          <Form.Select>
                            <option>Choose participant...</option>
                            {mockParticipants.map(participant => (
                              <option key={participant.id} value={participant.id}>
                                {participant.name}
                              </option>
                            ))}
                          </Form.Select>
                        </Form.Group>
                        
                        <Form.Group className="mb-3">
                          <Form.Label>Select Badge</Form.Label>
                          <Form.Select>
                            <option>Choose badge...</option>
                            <option value="project-lead">Project Lead</option>
                            <option value="early-contributor">Early Contributor</option>
                            <option value="community-builder">Community Builder</option>
                            <option value="event-organizer">Event Organizer</option>
                            <option value="funding-expert">Funding Expert</option>
                          </Form.Select>
                        </Form.Group>
                        
                        <Form.Group className="mb-3">
                          <Form.Label>Reason for Badge</Form.Label>
                          <Form.Control as="textarea" rows={3} placeholder="Explain why this participant deserves this badge..." />
                        </Form.Group>
                        
                        <Button variant="primary">
                          Assign Badge
                        </Button>
                      </Form>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Tab>
      </Tabs>
    </div>
  );
};

export default ParticipantsTab; 