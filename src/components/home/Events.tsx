// src/components/home/Events.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { FaClock, FaMapMarkerAlt } from 'react-icons/fa';

const EventCard = ({ 
  month, 
  day, 
  title, 
  time, 
  location, 
  organizer 
}: {
  month: string;
  day: string;
  title: string;
  time: string;
  location: string;
  organizer: string;
}) => {
  return (
    <Card className="h-100 shadow-sm hover-lift border-0">
      <div className="d-flex">
        <div className="bg-primary text-white text-center p-3" style={{ width: '80px' }}>
          <div className="small fw-semibold">{month}</div>
          <div className="fs-3 fw-bold">{day}</div>
        </div>
        <div className="flex-grow-1 p-3">
          <h5 className="fw-bold mb-2">{title}</h5>
          <p className="small text-secondary mb-2">
            <FaClock className="me-2" /> {time}
          </p>
          <p className="small text-secondary mb-2">
            <FaMapMarkerAlt className="me-2" /> {location}
          </p>
          <p className="small text-secondary">By: {organizer}</p>
        </div>
        <div className="d-flex align-items-center p-3">
          <Button 
            as={Link as any} 
            to="/events" 
            variant="primary" 
            size="sm"
          >
            Register
          </Button>
        </div>
      </div>
    </Card>
  );
};

const Events: React.FC = () => {
  return (
    <section className="bg-white py-5">
      <Container>
        <div className="text-center mb-5">
          <h2 className="fw-bold mb-3">Upcoming Events</h2>
          <p className="text-secondary mx-auto" style={{ maxWidth: '700px' }}>
            Connect with the community and learn new skills
          </p>
        </div>
        
        <Row className="g-4 mb-4">
          <Col md={4}>
            <EventCard 
              month="MAR" 
              day="12" 
              title="Local Farmers Market" 
              time="09:00-14:00" 
              location="Markt, Aachen" 
              organizer="Ernährungsrat Aachen" 
            />
          </Col>
          
          <Col md={4}>
            <EventCard 
              month="MAR" 
              day="18" 
              title="Urban Gardening Workshop" 
              time="15:00-17:30" 
              location="Kennedy Park" 
              organizer="PAN e.V." 
            />
          </Col>
          
          <Col md={4}>
            <EventCard 
              month="MAR" 
              day="25" 
              title="Sustainability Hackathon" 
              time="10:00-18:00" 
              location="Digital Hub, Jülicher Straße" 
              organizer="Energybirds e.V." 
            />
          </Col>
        </Row>
        
        <div className="text-center mt-4">
          <Button 
            as={Link as any} 
            to="/events" 
            variant="outline-primary" 
            className="fw-semibold"
          >
            View All Events
          </Button>
        </div>
      </Container>
    </section>
  );
};

export default Events;