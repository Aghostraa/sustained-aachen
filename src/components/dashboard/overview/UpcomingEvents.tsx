import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { 
  FaClock, 
  FaMapMarkerAlt, 
  FaCalendarPlus 
} from 'react-icons/fa';

interface EventProps {
  id: string;
  title: string;
  date: {
    month: string;
    day: string;
  };
  time: string;
  location: string;
  organizer: string;
}

const EventCard: React.FC<EventProps> = ({
  id,
  title,
  date,
  time,
  location,
  organizer
}) => (
  <Card className="border-0 shadow-sm mb-3">
    <Card.Body className="d-flex p-0">
      <div className="event-date d-flex flex-column align-items-center justify-content-center p-3 text-center bg-light">
        <div className="text-uppercase small text-muted">{date.month}</div>
        <div className="fw-bold fs-3">{date.day}</div>
      </div>
      
      <div className="p-3 flex-grow-1">
        <h3 className="h5 mb-2">{title}</h3>
        <p className="mb-1 small">
          <FaClock className="me-2 text-muted" />
          {time}
        </p>
        <p className="mb-1 small">
          <FaMapMarkerAlt className="me-2 text-muted" />
          {location}
        </p>
        <p className="small text-muted mb-0">
          By: {organizer}
        </p>
      </div>
      
      <div className="d-flex flex-column align-items-center justify-content-center p-3 gap-2">
        <Button 
          variant="outline-primary" 
          size="sm"
          className="w-100"
        >
          Register
        </Button>
        <Button 
          variant="link" 
          className="btn-icon p-0"
          title="Add to calendar"
        >
          <FaCalendarPlus />
        </Button>
      </div>
    </Card.Body>
  </Card>
);

const UpcomingEvents: React.FC = () => {
  // Mock data for upcoming events (would come from API in a real application)
  const events: EventProps[] = [
    {
      id: 'farmers-market',
      title: 'Local Farmers Market',
      date: {
        month: 'MAR',
        day: '12'
      },
      time: '09:00-14:00',
      location: 'Markt, Aachen',
      organizer: 'Ernährungsrat Aachen'
    },
    {
      id: 'urban-gardening',
      title: 'Urban Gardening Workshop',
      date: {
        month: 'MAR',
        day: '18'
      },
      time: '15:00-17:30',
      location: 'Kennedy Park',
      organizer: 'PAN e.V.'
    }
  ];

  return (
    <div>
      {events.map(event => (
        <EventCard key={event.id} {...event} />
      ))}
    </div>
  );
};

export default UpcomingEvents; 