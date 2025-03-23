import React from 'react';
import { Badge } from 'react-bootstrap';
import { FaBalanceScale, FaCut, FaLayerGroup, FaChartLine } from 'react-icons/fa';
import { SimulationConfig } from '../models/SimulationModels';

interface QFMethodCompactProps {
  config: SimulationConfig;
}

const QFMethodCompact: React.FC<QFMethodCompactProps> = ({ config }) => {
  // Get method information based on formula type
  const getMethodInfo = () => {
    switch (config.formulaType) {
      case 'standard':
        return {
          name: 'Standard Quadratic Funding',
          icon: <FaBalanceScale className="me-1" />,
          badge: 'Baseline',
          badgeColor: 'primary',
          description: 'Classic QF that weights many small donations higher than a few large ones.'
        };
        
      case 'capped':
        return {
          name: 'Capped QF',
          icon: <FaCut className="me-1" />,
          badge: 'Simpler Alternative',
          badgeColor: 'warning',
          description: `Caps individual contributions at €${config.formulaParams.cap || 5} to limit whale influence.`
        };
        
      case 'two-tier':
        return {
          name: 'Two-Tier Matching',
          icon: <FaLayerGroup className="me-1" />,
          badge: 'Recommended',
          badgeColor: 'success',
          description: `Higher matching for donations below €${config.formulaParams.threshold || 3}.`
        };
        
      case 'declining':
        return {
          name: 'Declining Marginal QF',
          icon: <FaChartLine className="me-1" />,
          badge: 'Best Equality',
          badgeColor: 'info',
          description: `Progressive diminishing returns with beta=${config.formulaParams.beta || 0.7}.`
        };
        
      default:
        return {
          name: 'Quadratic Funding',
          icon: null,
          badge: '',
          badgeColor: 'secondary',
          description: 'Matches donations based on community support.'
        };
    }
  };
  
  const info = getMethodInfo();
  
  return (
    <div className="d-flex flex-column">
      <div className="d-flex align-items-center mb-1">
        <span className="me-2">{info.icon}</span>
        <span className="fw-bold">{info.name}</span>
        {info.badge && (
          <Badge bg={info.badgeColor} className="ms-2">{info.badge}</Badge>
        )}
      </div>
      <small className="text-muted">{info.description}</small>
    </div>
  );
};

export default QFMethodCompact; 