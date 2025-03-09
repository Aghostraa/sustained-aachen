import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import { 
  FaEuroSign, 
  FaChartLine, 
  FaSeedling, 
  FaStar 
} from 'react-icons/fa';

interface StatCardProps {
  icon: React.ReactNode;
  value: string;
  label: string;
  iconBg?: string;
  iconColor?: string;
}

const StatCard: React.FC<StatCardProps> = ({ 
  icon, 
  value, 
  label, 
  iconBg = 'rgba(13, 110, 253, 0.1)', 
  iconColor = 'primary' 
}) => (
  <Card className="h-100 border-0 shadow-sm">
    <Card.Body className="d-flex align-items-center">
      <div 
        className={`d-flex align-items-center justify-content-center rounded-circle text-${iconColor}`}
        style={{ 
          width: 50, 
          height: 50, 
          backgroundColor: iconBg,
          fontSize: '1.25rem'
        }}
      >
        {icon}
      </div>
      <div className="ms-3">
        <div className="fw-bold fs-4">{value}</div>
        <div className="text-muted small">{label}</div>
      </div>
    </Card.Body>
  </Card>
);

const ImpactSummary: React.FC = () => {
  // Mock data (would come from API in a real application)
  const stats = [
    {
      icon: <FaEuroSign />,
      value: '€175.50',
      label: 'Total Contributions',
      iconBg: 'rgba(13, 110, 253, 0.1)',
      iconColor: 'primary'
    },
    {
      icon: <FaChartLine />,
      value: '€683.25',
      label: 'Matching Generated',
      iconBg: 'rgba(111, 66, 193, 0.1)',
      iconColor: 'purple'
    },
    {
      icon: <FaSeedling />,
      value: '7',
      label: 'Projects Supported',
      iconBg: 'rgba(25, 135, 84, 0.1)',
      iconColor: 'success'
    },
    {
      icon: <FaStar />,
      value: '1,245',
      label: 'Impact Points',
      iconBg: 'rgba(255, 193, 7, 0.1)',
      iconColor: 'warning'
    }
  ];

  return (
    <Row className="g-3">
      {stats.map((stat, index) => (
        <Col key={index} xs={12} sm={6} xl={3}>
          <StatCard
            icon={stat.icon}
            value={stat.value}
            label={stat.label}
            iconBg={stat.iconBg}
            iconColor={stat.iconColor}
          />
        </Col>
      ))}
    </Row>
  );
};

export default ImpactSummary; 