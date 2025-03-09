import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

interface CounterCardProps {
  value: number;
  label: string;
  prefix?: string;
  duration?: number;
}

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
  
  // Format number with commas and round to 2 decimal places if needed
  const formattedValue = count % 1 === 0 
    ? count.toLocaleString() 
    : count.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    
  return (
    <Card className="text-center h-100 shadow-sm border-0">
      <Card.Body className="d-flex flex-column justify-content-center py-4">
        <div className="display-4 fw-bold text-primary mb-2">
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
    { value: 42650.75, label: 'Total Community Contributions', prefix: '€' },
    { value: 145250.25, label: 'Matching Funds Generated', prefix: '€' },
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