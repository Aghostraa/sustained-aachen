// src/components/layout/Navbar.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';

const AppNavbar: React.FC = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" sticky="top" className="py-3">
      <Container>
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
          <div className="d-flex align-items-center justify-content-center rounded-circle bg-primary text-white fw-bold me-2" style={{ width: 40, height: 40 }}>
            S
          </div>
          <span className="fw-bold">Sustained</span>
        </Navbar.Brand>
        
        <Navbar.Toggle aria-controls="navbar-nav" />
        
        <Navbar.Collapse id="navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/marketplace">Projects</Nav.Link>
            <Nav.Link as={Link} to="/impact">Impact</Nav.Link>
            <Nav.Link as={Link} to="/learning">Learning</Nav.Link>
            <Nav.Link as={Link} to="/governance">Governance</Nav.Link>
            <Nav.Item className="d-flex align-items-center ms-lg-2">
              <Button 
                as={Link as any} 
                to="/dashboard" 
                variant="primary" 
                size="sm"
                className="fw-semibold"
              >
                My Dashboard
              </Button>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AppNavbar;