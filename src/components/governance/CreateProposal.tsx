import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import { ProposalFormData, ProposalCategory } from './types';

const CreateProposal: React.FC = () => {
  const [formData, setFormData] = useState<ProposalFormData>({
    title: '',
    category: '' as ProposalCategory,
    summary: '',
    description: '',
    impact: '',
    resources: '',
    timeline: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id.replace('proposal-', '')]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Proposal submitted:', formData);
    // Here you would typically send the data to your backend
    alert('Proposal submitted successfully!');
  };

  const handleSaveDraft = () => {
    console.log('Draft saved:', formData);
    // Here you would typically save the draft to local storage or backend
    alert('Draft saved successfully!');
  };

  return (
    <section id="proposal-form" className="py-5 bg-light">
      <Container>
        <Row className="justify-content-center text-center mb-5">
          <Col lg={8}>
            <h2 className="fw-bold mb-3">Create a Proposal</h2>
            <p className="lead">Share your ideas for improving our platform and community</p>
          </Col>
        </Row>
        
        <Row>
          {/* Form Column */}
          <Col lg={8} className="mb-4 mb-lg-0">
            <Card className="border-0 shadow-sm">
              <Card.Body className="p-4">
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-4" controlId="proposal-title">
                    <Form.Label>Proposal Title</Form.Label>
                    <Form.Control 
                      type="text" 
                      placeholder="A clear, concise title for your proposal"
                      value={formData.title}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                  
                  <Form.Group className="mb-4" controlId="proposal-category">
                    <Form.Label>Category</Form.Label>
                    <Form.Select 
                      value={formData.category}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select a category</option>
                      <option value="funding">Fund Allocation</option>
                      <option value="platform">Platform Improvements</option>
                      <option value="impact">Impact Measurement</option>
                      <option value="growth">Platform Growth</option>
                    </Form.Select>
                  </Form.Group>
                  
                  <Form.Group className="mb-4" controlId="proposal-summary">
                    <Form.Label>Summary</Form.Label>
                    <Form.Control 
                      as="textarea" 
                      rows={3}
                      placeholder="A brief summary of your proposal (max 200 words)"
                      value={formData.summary}
                      onChange={handleChange}
                      required
                    />
                    <Form.Text className="text-muted">
                      Briefly explain what your proposal aims to achieve.
                    </Form.Text>
                  </Form.Group>
                  
                  <Form.Group className="mb-4" controlId="proposal-description">
                    <Form.Label>Detailed Description</Form.Label>
                    <Form.Control 
                      as="textarea" 
                      rows={6}
                      placeholder="Provide a detailed description of your proposal, including its purpose, benefits, and implementation plan"
                      value={formData.description}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                  
                  <Form.Group className="mb-4" controlId="proposal-impact">
                    <Form.Label>Expected Impact</Form.Label>
                    <Form.Control 
                      as="textarea" 
                      rows={4}
                      placeholder="Describe the expected impact of your proposal and how it will benefit the community"
                      value={formData.impact}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                  
                  <Form.Group className="mb-4" controlId="proposal-resources">
                    <Form.Label>Resources Needed</Form.Label>
                    <Form.Control 
                      as="textarea" 
                      rows={3}
                      placeholder="Outline any resources (funding, volunteer time, expertise) needed to implement your proposal"
                      value={formData.resources}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                  
                  <Form.Group className="mb-4" controlId="proposal-timeline">
                    <Form.Label>Timeline</Form.Label>
                    <Form.Control 
                      as="textarea" 
                      rows={3}
                      placeholder="Provide an estimated timeline for implementation"
                      value={formData.timeline}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                  
                  <div className="d-flex gap-3 mt-4">
                    <Button variant="primary" type="submit">
                      Submit Proposal
                    </Button>
                    <Button variant="outline-secondary" type="button" onClick={handleSaveDraft}>
                      Save Draft
                    </Button>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
          
          {/* Guidelines Column */}
          <Col lg={4}>
            <Card className="border-0 shadow-sm h-100">
              <Card.Body className="p-4">
                <h3 className="h5 fw-bold mb-4">Proposal Guidelines</h3>
                <ul className="list-unstyled mb-4">
                  {[
                    'You need at least 100 impact points to submit a proposal',
                    'Be specific about your proposal\'s goals and expected outcomes',
                    'Include metrics for how success will be measured',
                    'Consider potential challenges and how they might be addressed',
                    'Be prepared to respond to community feedback during the discussion period'
                  ].map((guideline, index) => (
                    <li key={index} className="d-flex mb-3">
                      <div className="me-3 text-primary">
                        <i className="fas fa-info-circle"></i>
                      </div>
                      <div>{guideline}</div>
                    </li>
                  ))}
                </ul>
                
                <div className="p-3 bg-light rounded mb-4">
                  <p className="mb-0 small">
                    Once submitted, your proposal will enter a 2-week discussion period before potentially moving to the voting stage.
                  </p>
                </div>
                
                <a href="#" className="text-decoration-none d-inline-flex align-items-center">
                  <span className="me-2">View full proposal guidelines</span>
                  <i className="fas fa-external-link-alt"></i>
                </a>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default CreateProposal; 