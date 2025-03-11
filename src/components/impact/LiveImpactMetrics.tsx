import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

interface CounterCardProps {
  value: number;
  label: string;
  prefix?: string;
  duration?: number;
}

const formatNumber = (value: number): string => {
  if (value >= 1000000) {
    return `${(value / 1000000).toFixed(1)}M`;
  } else if (value >= 1000) {
    return `${(value / 1000).toFixed(1)}k`;
  }
  return value.toString();
};

const CounterCard: React.FC<CounterCardProps> = ({ 
  value, 
  label, 
  prefix = '', 
  duration = 2000 
}) => {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    const step = Math.ceil(value / (duration / 50));
    let current = 0;
    const timer = setInterval(() => {
      current += step;
      if (current >= value) {
        clearInterval(timer);
        setCount(value);
      } else {
        setCount(current);
      }
    }, 50);
    
    return () => clearInterval(timer);
  }, [value, duration]);
  
  const formattedValue = formatNumber(count);
    
  return (
    <Card className="text-center h-100 shadow-sm border-0">
      <Card.Body className="d-flex flex-column justify-content-center py-4">
        <div className="display-4 fw-bold text-success mb-2">
          {prefix}{formattedValue}
        </div>
        <Card.Text className="text-muted">
          {label}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

const LiveImpactMetrics: React.FC = () => {
  const counterData = [
    { value: 42650, label: 'Total Community Contributions', prefix: '€' },
    { value: 145250, label: 'Matching Funds Generated', prefix: '€' },
    { value: 1250, label: 'Active Contributors' },
    { value: 27, label: 'Successful Projects' }
  ];
  
  return (
    <section className="py-5 bg-white">
      <Container>
        <Row className="g-4">
          {counterData.map((item, index) => (
            <Col md={6} lg={3} key={index}>
              <CounterCard 
                value={item.value} 
                label={item.label}
                prefix={item.prefix}
              />
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default LiveImpactMetrics; 