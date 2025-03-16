import React, { useState } from 'react';
import { Row, Col, Card, Button, Form, Table, Tabs, Tab, Badge, Alert } from 'react-bootstrap';
import { FaPlus, FaEdit, FaTrash, FaComments, FaVoteYea, FaStar, FaUsers } from 'react-icons/fa';
import { Project } from '../../project/ProjectHero';

interface CommunityTabProps {
  project: Project;
}

// Mock data for discussions
const mockDiscussions = [
  {
    id: 1,
    title: 'Ideas for our next community event',
    author: 'Julia Schmidt',
    date: '2025-03-10',
    replies: 12,
    status: 'active'
  },
  {
    id: 2,
    title: 'Volunteer coordination for tree planting',
    author: 'Thomas Weber',
    date: '2025-03-05',
    replies: 8,
    status: 'active'
  },
  {
    id: 3,
    title: 'Funding proposal feedback needed',
    author: 'Maria Hausmann',
    date: '2025-02-28',
    replies: 5,
    status: 'closed'
  }
];

// Mock data for polls/votes
const mockPolls = [
  {
    id: 1,
    title: 'Which area should we focus on for our next tree planting?',
    author: 'Thomas Weber',
    date: '2025-03-08',
    votes: 24,
    status: 'active',
    options: [
      { id: 1, text: 'North Aachen', votes: 10 },
      { id: 2, text: 'City Center', votes: 8 },
      { id: 3, text: 'University Area', votes: 6 }
    ]
  },
  {
    id: 2,
    title: 'Best day for our monthly community meeting?',
    author: 'Julia Schmidt',
    date: '2025-03-01',
    votes: 18,
    status: 'closed',
    options: [
      { id: 1, text: 'Monday evening', votes: 3 },
      { id: 2, text: 'Wednesday evening', votes: 12 },
      { id: 3, text: 'Saturday morning', votes: 3 }
    ]
  }
];

const CommunityTab: React.FC<CommunityTabProps> = ({ project }) => {
  const [activeTab, setActiveTab] = useState('discussions');
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const handleCreateDiscussion = () => {
    // In a real app, this would be an API call
    setAlertMessage('New discussion created successfully!');
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
  };

  const handleCreatePoll = () => {
    // In a real app, this would be an API call
    setAlertMessage('New poll created successfully!');
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
        <h2 className="h4 mb-0">Community Management</h2>
      </div>

      <Tabs
        activeKey={activeTab}
        onSelect={(k) => setActiveTab(k || 'discussions')}
        className="mb-4"
      >
        <Tab eventKey="discussions" title="Discussions">
          <Card className="border-0 shadow-sm mb-4">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h5 className="mb-0">Community Discussions</h5>
                <Button variant="primary" size="sm" onClick={handleCreateDiscussion}>
                  <FaPlus className="me-2" />
                  Create Discussion
                </Button>
              </div>

              {mockDiscussions.length > 0 ? (
                <div className="table-responsive">
                  <Table hover className="align-middle">
                    <thead className="bg-light">
                      <tr>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Date</th>
                        <th>Replies</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mockDiscussions.map(discussion => (
                        <tr key={discussion.id}>
                          <td>
                            <div className="d-flex align-items-center">
                              <FaComments className="text-primary me-2" />
                              {discussion.title}
                            </div>
                          </td>
                          <td>{discussion.author}</td>
                          <td>{new Date(discussion.date).toLocaleDateString()}</td>
                          <td>{discussion.replies}</td>
                          <td>
                            <Badge 
                              bg={discussion.status === 'active' ? 'success' : 'secondary'}
                            >
                              {discussion.status}
                            </Badge>
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
                  No discussions available. Click "Create Discussion" to start a new community conversation.
                </div>
              )}
            </Card.Body>
          </Card>

          <Card className="border-0 shadow-sm">
            <Card.Header className="bg-white">
              <h5 className="mb-0">Discussion Settings</h5>
            </Card.Header>
            <Card.Body>
              <Form>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Who can create discussions?</Form.Label>
                      <Form.Select defaultValue="all">
                        <option value="all">All participants</option>
                        <option value="verified">Verified participants only</option>
                        <option value="admin">Administrators only</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Moderation</Form.Label>
                      <Form.Select defaultValue="post">
                        <option value="pre">Pre-moderation (approve before posting)</option>
                        <option value="post">Post-moderation (review after posting)</option>
                        <option value="none">No moderation</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Check 
                        type="switch"
                        id="allow-attachments"
                        label="Allow file attachments"
                        defaultChecked
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Check 
                        type="switch"
                        id="allow-anonymous"
                        label="Allow anonymous comments"
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Button variant="primary">
                  Save Settings
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Tab>

        <Tab eventKey="polls" title="Polls & Voting">
          <Card className="border-0 shadow-sm mb-4">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h5 className="mb-0">Community Polls</h5>
                <Button variant="primary" size="sm" onClick={handleCreatePoll}>
                  <FaPlus className="me-2" />
                  Create Poll
                </Button>
              </div>

              {mockPolls.length > 0 ? (
                <div className="table-responsive">
                  <Table hover className="align-middle">
                    <thead className="bg-light">
                      <tr>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Date</th>
                        <th>Votes</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mockPolls.map(poll => (
                        <React.Fragment key={poll.id}>
                          <tr>
                            <td>
                              <div className="d-flex align-items-center">
                                <FaVoteYea className="text-primary me-2" />
                                {poll.title}
                              </div>
                            </td>
                            <td>{poll.author}</td>
                            <td>{new Date(poll.date).toLocaleDateString()}</td>
                            <td>{poll.votes}</td>
                            <td>
                              <Badge 
                                bg={poll.status === 'active' ? 'success' : 'secondary'}
                              >
                                {poll.status}
                              </Badge>
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
                          <tr>
                            <td colSpan={6} className="bg-light">
                              <div className="p-2">
                                <strong>Options:</strong>
                                <ul className="list-unstyled mb-0 mt-2">
                                  {poll.options.map(option => (
                                    <li key={option.id} className="mb-2">
                                      <div className="d-flex justify-content-between">
                                        <span>{option.text}</span>
                                        <span>{option.votes} votes ({Math.round((option.votes / poll.votes) * 100)}%)</span>
                                      </div>
                                      <div className="progress" style={{ height: '8px' }}>
                                        <div 
                                          className="progress-bar bg-primary" 
                                          role="progressbar" 
                                          style={{ width: `${(option.votes / poll.votes) * 100}%` }}
                                          aria-valuenow={(option.votes / poll.votes) * 100}
                                          aria-valuemin={0}
                                          aria-valuemax={100}
                                        ></div>
                                      </div>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </td>
                          </tr>
                        </React.Fragment>
                      ))}
                    </tbody>
                  </Table>
                </div>
              ) : (
                <div className="text-center py-5 text-muted">
                  No polls available. Click "Create Poll" to start a new community poll.
                </div>
              )}
            </Card.Body>
          </Card>

          <Card className="border-0 shadow-sm">
            <Card.Header className="bg-white">
              <h5 className="mb-0">Voting Settings</h5>
            </Card.Header>
            <Card.Body>
              <Form>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Who can create polls?</Form.Label>
                      <Form.Select defaultValue="verified">
                        <option value="all">All participants</option>
                        <option value="verified">Verified participants only</option>
                        <option value="admin">Administrators only</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Who can vote?</Form.Label>
                      <Form.Select defaultValue="all">
                        <option value="all">All participants</option>
                        <option value="verified">Verified participants only</option>
                        <option value="badge">Participants with badges only</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Default poll duration</Form.Label>
                      <Form.Select defaultValue="7">
                        <option value="3">3 days</option>
                        <option value="7">7 days</option>
                        <option value="14">14 days</option>
                        <option value="30">30 days</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Check 
                        type="switch"
                        id="show-results-before-voting"
                        label="Show results before voting"
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Button variant="primary">
                  Save Settings
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Tab>

        <Tab eventKey="tokens" title="Community Tokens">
          <Card className="border-0 shadow-sm mb-4">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h5 className="mb-0">Community Token Management</h5>
              </div>

              <Alert variant="info" className="mb-4">
                <FaStar className="me-2" />
                Community tokens are used to reward participation and enable voting rights within the project.
              </Alert>

              <Row>
                <Col md={6} className="mb-4">
                  <Card>
                    <Card.Header className="bg-light">
                      <h6 className="mb-0">Token Distribution</h6>
                    </Card.Header>
                    <Card.Body>
                      <Form>
                        <Form.Group className="mb-3">
                          <Form.Label>Token Name</Form.Label>
                          <Form.Control 
                            type="text" 
                            defaultValue={`${project.title.substring(0, 3).toUpperCase()}Token`}
                          />
                        </Form.Group>
                        <Form.Group className="mb-3">
                          <Form.Label>Token Symbol</Form.Label>
                          <Form.Control 
                            type="text" 
                            defaultValue={project.iconText}
                          />
                        </Form.Group>
                        <Form.Group className="mb-3">
                          <Form.Label>Total Supply</Form.Label>
                          <Form.Control 
                            type="number" 
                            defaultValue="10000"
                          />
                        </Form.Group>
                        <Form.Group className="mb-3">
                          <Form.Label>Distribution Method</Form.Label>
                          <Form.Select defaultValue="activity">
                            <option value="equal">Equal distribution to all members</option>
                            <option value="activity">Based on activity level</option>
                            <option value="badges">Based on badges earned</option>
                            <option value="manual">Manual distribution</option>
                          </Form.Select>
                        </Form.Group>
                        <Button variant="primary">
                          Update Token Settings
                        </Button>
                      </Form>
                    </Card.Body>
                  </Card>
                </Col>
                
                <Col md={6}>
                  <Card>
                    <Card.Header className="bg-light">
                      <h6 className="mb-0">Token Rewards</h6>
                    </Card.Header>
                    <Card.Body>
                      <Form>
                        <Form.Group className="mb-3">
                          <Form.Label>Discussion Participation</Form.Label>
                          <Form.Control 
                            type="number" 
                            defaultValue="5"
                          />
                          <Form.Text className="text-muted">
                            Tokens awarded for each discussion post
                          </Form.Text>
                        </Form.Group>
                        <Form.Group className="mb-3">
                          <Form.Label>Poll Creation</Form.Label>
                          <Form.Control 
                            type="number" 
                            defaultValue="10"
                          />
                          <Form.Text className="text-muted">
                            Tokens awarded for creating a poll
                          </Form.Text>
                        </Form.Group>
                        <Form.Group className="mb-3">
                          <Form.Label>Poll Participation</Form.Label>
                          <Form.Control 
                            type="number" 
                            defaultValue="2"
                          />
                          <Form.Text className="text-muted">
                            Tokens awarded for voting in a poll
                          </Form.Text>
                        </Form.Group>
                        <Form.Group className="mb-3">
                          <Form.Label>Volunteer Work</Form.Label>
                          <Form.Control 
                            type="number" 
                            defaultValue="20"
                          />
                          <Form.Text className="text-muted">
                            Tokens awarded per hour of volunteer work
                          </Form.Text>
                        </Form.Group>
                        <Button variant="primary">
                          Update Reward Settings
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

export default CommunityTab; 