import React, { ReactElement } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { FaCloud, FaTrashAlt, FaTint, FaLeaf } from 'react-icons/fa';

interface EnvironmentalMetric {
  icon: ReactElement;
  title: string;
  value: string;
  unit: string;
  context: string;
}

const EnvironmentalMetrics: React.FC = () => {
  const metrics: EnvironmentalMetric[] = [
    {
      icon: <FaCloud size={24} />,
      title: 'CO₂ Emissions Reduced',
      value: '15.8',
      unit: 'tons',
      context: '3.4 cars off the road for a year'
    },
    {
      icon: <FaTrashAlt size={24} />,
      title: 'Waste Diverted from Landfill',
      value: '28.5',
      unit: 'tons',
      context: '5.7 elephants in weight'
    },
    {
      icon: <FaTint size={24} />,
      title: 'Water Conserved',
      value: '3.2M',
      unit: 'liters',
      context: '1.3 Olympic swimming pools'
    },
    {
      icon: <FaLeaf size={24} />,
      title: 'Green Space Created',
      value: '5,400',
      unit: 'm²',
      context: '0.75 football fields'
    }
  ];
  
  return (
    <section className="py-5 bg-light">
      <Container>
        <Row className="justify-content-center text-center mb-5">
          <Col md={8}>
            <h2 className="mb-2">Environmental Impact Metrics</h2>
            <p className="text-muted">
              Measuring our progress toward environmental goals
            </p>
          </Col>
        </Row>
        
        <Row className="g-4">
          {metrics.map((metric, index) => (
            <Col md={6} lg={3} key={index}>
              <Card className="h-100 shadow-sm border-0">
                <Card.Body className="p-4">
                  <div className="d-flex align-items-center mb-3">
                    <div className="text-primary me-3">
                      {metric.icon}
                    </div>
                    <h5 className="mb-0">{metric.title}</h5>
                  </div>
                  
                  <div className="py-3">
                    <span className="display-5 fw-bold text-dark">{metric.value}</span>
                    <span className="text-muted ms-2">{metric.unit}</span>
                  </div>
                  
                  <div className="mt-2">
                    <div className="small text-muted mb-1">Equivalent to</div>
                    <div className="text-secondary">{metric.context}</div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default EnvironmentalMetrics; 