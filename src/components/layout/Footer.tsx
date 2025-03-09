// src/components/layout/Footer.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';

const Footer: React.FC = () => {
  return (
    <footer className="bg-dark text-white py-5">
      <Container>
        <Row className="mb-5">
          <Col lg={3} className="mb-4 mb-lg-0">
            <Link to="/" className="d-flex align-items-center text-decoration-none text-white mb-3">
              <div className="d-flex align-items-center justify-content-center rounded-circle bg-primary text-white fw-bold me-2" style={{ width: 40, height: 40 }}>
                S
              </div>
              <span className="fs-4 fw-bold">Sustained Aachen</span>
            </Link>
          </Col>
          
          <Col sm={6} md={3} lg={2} className="mb-4 mb-md-0">
            <h5 className="fw-bold mb-3">Platform</h5>
            <ul className="list-unstyled">
              <li className="mb-2"><Link to="/marketplace" className="text-white text-decoration-none">Projects</Link></li>
              <li className="mb-2"><Link to="/impact" className="text-white text-decoration-none">Impact</Link></li>
              <li className="mb-2"><Link to="/learning" className="text-white text-decoration-none">Learning</Link></li>
              <li className="mb-2"><Link to="/governance" className="text-white text-decoration-none">Governance</Link></li>
            </ul>
          </Col>
          
          <Col sm={6} md={3} lg={2} className="mb-4 mb-md-0">
            <h5 className="fw-bold mb-3">Get Involved</h5>
            <ul className="list-unstyled">
              <li className="mb-2"><Link to="/submit-project" className="text-white text-decoration-none">Submit a Project</Link></li>
              <li className="mb-2"><Link to="/volunteer" className="text-white text-decoration-none">Volunteer</Link></li>
              <li className="mb-2"><Link to="/partner" className="text-white text-decoration-none">Partner With Us</Link></li>
              <li className="mb-2"><Link to="/donate" className="text-white text-decoration-none">Donate</Link></li>
            </ul>
          </Col>
          
          <Col sm={6} md={3} lg={2} className="mb-4 mb-md-0">
            <h5 className="fw-bold mb-3">Resources</h5>
            <ul className="list-unstyled">
              <li className="mb-2"><Link to="/about-qf" className="text-white text-decoration-none">About Quadratic Funding</Link></li>
              <li className="mb-2"><Link to="/guidelines" className="text-white text-decoration-none">Sustainability Guidelines</Link></li>
              <li className="mb-2"><Link to="/impact" className="text-white text-decoration-none">Impact Measurement</Link></li>
              <li className="mb-2"><Link to="/faq" className="text-white text-decoration-none">FAQ</Link></li>
            </ul>
          </Col>
          
          <Col sm={6} md={3} lg={2}>
            <h5 className="fw-bold mb-3">Connect</h5>
            <ul className="list-unstyled">
              <li className="mb-2"><Link to="/contact" className="text-white text-decoration-none">Contact Us</Link></li>
              <li className="mb-2"><Link to="/newsletter" className="text-white text-decoration-none">Newsletter</Link></li>
              <li className="mb-2"><a href="#" className="text-white text-decoration-none">Twitter</a></li>
              <li className="mb-2"><a href="#" className="text-white text-decoration-none">Instagram</a></li>
            </ul>
          </Col>
        </Row>
        
        <Row className="pt-4 border-top border-secondary">
          <Col md={6} className="mb-3 mb-md-0 text-light">
            &copy; 2025 Sustained Aachen. All rights reserved.
          </Col>
          <Col md={6} className="text-md-end text-light">
            Made with 💚 for the future of Aachen
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;