import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { workingGroupsData } from './data';

const WorkingGroups: React.FC = () => {
  return (
    <section className="py-5">
      <Container>
        <Row className="justify-content-center text-center mb-5">
          <Col lg={8}>
            <h2 className="fw-bold mb-3">Governance Working Groups</h2>
            <p className="lead">Specialized teams that help implement community decisions</p>
          </Col>
        </Row>
        
        <Row className="g-4 mb-5">
          {workingGroupsData.map((group) => (
            <Col key={group.id} md={6} lg={3}>
              <Card className="h-100 border-0 shadow-sm">
                <Card.Body className="p-4">
                  <div 
                    className="d-inline-flex align-items-center justify-content-center rounded-circle mb-3" 
                    style={{ 
                      width: '60px', 
                      height: '60px', 
                      backgroundColor: group.iconBg 
                    }}
                  >
                    <i className={`${group.icon} fa-lg`} style={{ color: group.iconColor }}></i>
                  </div>
                  <h3 className="h5 mb-3">{group.name}</h3>
                  <p className="text-muted mb-4">{group.description}</p>
                  
                  <div className="d-flex mb-4">
                    <div className="me-4">
                      <div className="h5 fw-bold mb-0">{group.stats.members}</div>
                      <small className="text-muted">Members</small>
                    </div>
                    <div>
                      <div className="h5 fw-bold mb-0">{group.stats.metric.value}</div>
                      <small className="text-muted">{group.stats.metric.label}</small>
                    </div>
                  </div>
                  
                  <a href="#" className="text-decoration-none d-inline-flex align-items-center">
                    <span className="me-2">Learn more</span>
                    <i className="fas fa-arrow-right"></i>
                  </a>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
        
        <div className="text-center">
          <Button variant="primary" size="lg">Join a Working Group</Button>
        </div>
      </Container>
    </section>
  );
};

export default WorkingGroups; 