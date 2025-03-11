// src/components/layout/Navbar.tsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';

const AppNavbar: React.FC = () => {
  const location = useLocation();
  const { pathname } = location;

  return (
    <Navbar bg="dark" variant="dark" expand="lg" sticky="top" className="py-3">
      <Container>
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
          <img 
            src="https://indigo-advanced-fish-283.mypinata.cloud/ipfs/bafkreifqk4nqicln2whlng7dih3nyvcmo4mxsomhlfaifyuabkfhmpk7z4"
            alt="Sustained Aachen Logo"
            className="me-2"
            style={{ width: 40, height: 40 }}
          />
          <span className="fw-bold">Sustained</span>
        </Navbar.Brand>
        
        <Navbar.Toggle aria-controls="navbar-nav" />
        
        <Navbar.Collapse id="navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link 
              as={Link} 
              to="/projects" 
              active={pathname === '/projects'}
            >
              Projects
            </Nav.Link>

            <Nav.Link 
              as={Link} 
              to="/marketplace" 
              active={pathname === '/marketplace'}
            >
              Funding
            </Nav.Link>

            <Nav.Link 
              as={Link} 
              to="/impact" 
              active={pathname === '/impact'}
            >
              Impact
            </Nav.Link>
            <Nav.Link 
              as={Link} 
              to="/learning" 
              active={pathname === '/learning'}
            >
              Learning
            </Nav.Link>
            <Nav.Link 
              as={Link} 
              to="/governance" 
              active={pathname === '/governance'}
            >
              Governance
            </Nav.Link>
            <Nav.Item className="d-flex align-items-center ms-lg-2">
              <Button 
                as={Link as any} 
                to="/dashboard" 
                variant={pathname === '/dashboard' ? 'light' : 'primary'} 
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