import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

interface StoryMetric {
  value: string;
  label: string;
}

interface ImpactStory {
  id: number;
  title: string;
  description: string;
  image: string;
  metrics: StoryMetric[];
}

const ImpactStories: React.FC = () => {
  const stories: ImpactStory[] = [
    {
      id: 1,
      title: 'Urban Gardens Flourish Across Aachen',
      description: 'Starting with just 2 locations in 2023, Aachen\'s Urban Gardens Initiative has expanded to 14 community gardens across all districts, producing over 2 tons of organic vegetables annually.',
      image: 'https://via.placeholder.com/400x300/4ade80/FFFFFF?text=Urban+Gardens',
      metrics: [
        { value: '14', label: 'Gardens' },
        { value: '2t', label: 'Food Produced' },
        { value: '15k+', label: 'Residents Reached' }
      ]
    },
    {
      id: 2,
      title: 'Solar Panels Power Aachen Schools',
      description: 'A student-driven initiative has successfully installed solar panels on 5 school rooftops, reducing energy costs by 35% and providing hands-on renewable energy education to over 3,000 students.',
      image: 'https://via.placeholder.com/400x300/3b82f6/FFFFFF?text=School+Solar',
      metrics: [
        { value: '5', label: 'Schools' },
        { value: '35%', label: 'Energy Savings' },
        { value: '3k', label: 'Students Involved' }
      ]
    }
  ];
  
  return (
    <section className="py-5 bg-white">
      <Container>
        <Row className="justify-content-center text-center mb-5">
          <Col md={8}>
            <h2 className="mb-2">Impact Stories</h2>
            <p className="text-muted">
              Real results from community-driven sustainability efforts
            </p>
          </Col>
        </Row>
        
        <Row className="g-4 mb-4">
          {stories.map((story) => (
            <Col md={12} lg={6} key={story.id}>
              <Card className="h-100 shadow-sm border-0 overflow-hidden">
                <div className="row g-0 h-100">
                  <div className="col-md-5">
                    <div className="h-100" style={{ minHeight: '200px' }}>
                      <img 
                        src={story.image} 
                        alt={story.title} 
                        className="img-fluid h-100 w-100 object-fit-cover"
                      />
                    </div>
                  </div>
                  <div className="col-md-7">
                    <Card.Body className="d-flex flex-column h-100">
                      <h4 className="mb-2">{story.title}</h4>
                      <Card.Text className="text-muted mb-4">{story.description}</Card.Text>
                      
                      <div className="d-flex justify-content-between mb-3 mt-auto">
                        {story.metrics.map((metric, idx) => (
                          <div key={idx} className="text-center px-2">
                            <div className="h5 fw-bold text-primary mb-0">{metric.value}</div>
                            <div className="small text-muted">{metric.label}</div>
                          </div>
                        ))}
                      </div>
                      
                      <Button variant="outline-primary" size="sm">Read Full Story</Button>
                    </Card.Body>
                  </div>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
        
        <Row>
          <Col className="text-center">
            <Button variant="secondary">View All Impact Stories</Button>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default ImpactStories; 