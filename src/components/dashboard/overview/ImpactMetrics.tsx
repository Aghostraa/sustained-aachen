import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import {
  FaCloud,
  FaTrashAlt,
  FaCarrot,
  FaUsers
} from 'react-icons/fa';

interface MetricCardProps {
  icon: React.ReactNode;
  value: string;
  label: string;
  iconBg?: string;
  iconColor?: string;
}

const MetricCard: React.FC<MetricCardProps> = ({
  icon,
  value,
  label,
  iconBg = 'rgba(25, 135, 84, 0.1)',
  iconColor = 'success'
}) => (
  <Card className="h-100 border-0 shadow-sm">
    <Card.Body className="text-center p-3">
      <div
        className={`d-inline-flex align-items-center justify-content-center rounded-circle text-${iconColor} mb-3`}
        style={{
          width: 60,
          height: 60,
          backgroundColor: iconBg,
          fontSize: '1.5rem'
        }}
      >
        {icon}
      </div>
      <div className="fw-bold fs-4">{value}</div>
      <div className="text-muted small">{label}</div>
    </Card.Body>
  </Card>
);

interface SdgChartProps {
  data: {
    sdg: string;
    percentage: number;
  }[];
}

const SdgChart: React.FC<SdgChartProps> = ({ data }) => (
  <Card className="border-0 shadow-sm h-100">
    <Card.Body>
      <h3 className="h5 mb-3">Your Contribution to SDGs</h3>
      <div className="d-flex justify-content-between align-items-end" style={{ height: 200 }}>
        {data.map((item, index) => (
          <div key={index} className="d-flex flex-column align-items-center" style={{ width: '16%' }}>
            <div 
              className="bg-primary rounded-top w-100" 
              style={{ 
                height: `${item.percentage}%`,
                backgroundColor: `hsl(${(index * 30) % 360}, 70%, 50%)` 
              }}
            ></div>
            <div className="text-muted small mt-2">{item.sdg}</div>
          </div>
        ))}
      </div>
    </Card.Body>
  </Card>
);

const ImpactMetrics: React.FC = () => {
  // Mock data for metrics (would come from API in a real application)
  const metrics = [
    {
      icon: <FaCloud />,
      value: '325.5 kg',
      label: 'CO₂ Emissions Reduced',
      iconBg: 'rgba(13, 110, 253, 0.1)',
      iconColor: 'primary'
    },
    {
      icon: <FaTrashAlt />,
      value: '15.2 kg',
      label: 'Waste Reduced',
      iconBg: 'rgba(220, 53, 69, 0.1)',
      iconColor: 'danger'
    },
    {
      icon: <FaCarrot />,
      value: '135.8 kg',
      label: 'Local Food Supported',
      iconBg: 'rgba(25, 135, 84, 0.1)',
      iconColor: 'success'
    },
    {
      icon: <FaUsers />,
      value: '28 hours',
      label: 'Community Engagement',
      iconBg: 'rgba(255, 193, 7, 0.1)',
      iconColor: 'warning'
    }
  ];

  // Mock data for SDG chart (would come from API in a real application)
  const sdgData = [
    { sdg: 'SDG 2', percentage: 40 },
    { sdg: 'SDG 3', percentage: 60 },
    { sdg: 'SDG 4', percentage: 25 },
    { sdg: 'SDG 11', percentage: 45 },
    { sdg: 'SDG 12', percentage: 75 },
    { sdg: 'SDG 13', percentage: 50 }
  ];

  return (
    <Row className="g-3">
      <Col xs={12} lg={8}>
        <Row className="g-3">
          {metrics.map((metric, index) => (
            <Col key={index} xs={12} sm={6}>
              <MetricCard
                icon={metric.icon}
                value={metric.value}
                label={metric.label}
                iconBg={metric.iconBg}
                iconColor={metric.iconColor}
              />
            </Col>
          ))}
        </Row>
      </Col>
      <Col xs={12} lg={4}>
        <SdgChart data={sdgData} />
      </Col>
    </Row>
  );
};

export default ImpactMetrics; 