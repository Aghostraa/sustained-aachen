import React from 'react';
import { Card, Row, Col, Badge } from 'react-bootstrap';
import { FaInfoCircle, FaBalanceScale, FaCut, FaLayerGroup, FaChartLine } from 'react-icons/fa';
import { SimulationConfig } from '../models/SimulationModels';

interface QFMethodInfoProps {
  config: SimulationConfig;
}

const QFMethodInfo: React.FC<QFMethodInfoProps> = ({ config }) => {
  // Determine which method description to show based on current formula type
  const renderMethodDescription = () => {
    switch (config.formulaType) {
      case 'standard':
        return (
          <Card className="border-0 shadow-sm h-100">
            <Card.Body>
              <div className="d-flex align-items-center mb-3">
                <div className="rounded-circle bg-primary p-2 me-3 text-white">
                  <FaBalanceScale />
                </div>
                <div>
                  <h5 className="mb-0">Standard Quadratic Funding</h5>
                  <Badge bg="primary" className="mt-1">Baseline</Badge>
                </div>
              </div>
              <p className="text-muted">
                The classic QF approach that takes the square of the sum of square roots of contributions 
                minus the sum of contributions. This gives more weight to many small donations versus a few large ones.
              </p>
              <div className="border-top pt-2 mt-2">
                <small className="text-muted">Formula: <span className="fw-bold">(Σ√contributions)² - Σcontributions</span></small>
              </div>
            </Card.Body>
          </Card>
        );
        
      case 'capped':
        return (
          <Card className="border-0 shadow-sm h-100">
            <Card.Body>
              <div className="d-flex align-items-center mb-3">
                <div className="rounded-circle bg-warning p-2 me-3 text-white">
                  <FaCut />
                </div>
                <div>
                  <h5 className="mb-0">Capped Contributions QF</h5>
                  <Badge bg="warning" className="text-dark mt-1">Simpler Alternative</Badge>
                </div>
              </div>
              <p className="text-muted">
                Limits the influence of large donors by capping individual contributions at €{config.formulaParams.cap}. 
                Simulation shows optimal performance with a €5 cap for communities with primarily small donors.
              </p>
              <div className="border-top pt-2 mt-2">
                <small className="text-muted">Recommended Cap: <span className="fw-bold">€5 for grassroots initiatives</span></small>
              </div>
            </Card.Body>
          </Card>
        );
        
      case 'two-tier':
        return (
          <Card className="border-0 shadow-sm h-100">
            <Card.Body>
              <div className="d-flex align-items-center mb-3">
                <div className="rounded-circle bg-success p-2 me-3 text-white">
                  <FaLayerGroup />
                </div>
                <div>
                  <h5 className="mb-0">Two-Tier Matching QF</h5>
                  <Badge bg="success" className="mt-1">Recommended</Badge>
                </div>
              </div>
              <p className="text-muted">
                Uses different matching rates for small and large donations. Provides a {(config.formulaParams.alpha1 && config.formulaParams.alpha2) ? 
                  (config.formulaParams.alpha1 / config.formulaParams.alpha2).toFixed(1) : '5'}:1 
                higher matching for contributions below €{config.formulaParams.threshold || 3}, encouraging more 
                small donors to participate.
              </p>
              <div className="border-top pt-2 mt-2">
                <small className="text-muted">
                  Optimal parameters: <span className="fw-bold">€3 threshold with 5:1 ratio</span> for 
                  grassroots communities (90% small contributions).
                </small>
              </div>
            </Card.Body>
          </Card>
        );
        
      case 'declining':
        return (
          <Card className="border-0 shadow-sm h-100">
            <Card.Body>
              <div className="d-flex align-items-center mb-3">
                <div className="rounded-circle bg-info p-2 me-3 text-white">
                  <FaChartLine />
                </div>
                <div>
                  <h5 className="mb-0">Declining Marginal QF</h5>
                  <Badge bg="info" className="mt-1">Best Equality</Badge>
                </div>
              </div>
              <p className="text-muted">
                Progressive diminishing returns for larger donations with a beta factor of {config.formulaParams.beta}. 
                Balances between square root scaling (β=0.5) and linear scaling (β=1.0).
              </p>
              <div className="border-top pt-2 mt-2">
                <small className="text-muted">
                  Optimal beta: <span className="fw-bold">0.7</span> balances equality and representation 
                  at €5000 budget level.
                </small>
              </div>
            </Card.Body>
          </Card>
        );
        
      default:
        return null;
    }
  };
  
  // General information about QF research
  const renderGeneralInfo = () => (
    <Card className="border-0 shadow-sm h-100">
      <Card.Body>
        <div className="d-flex align-items-center mb-3">
          <div className="rounded-circle bg-secondary p-2 me-3 text-white">
            <FaInfoCircle />
          </div>
          <h5 className="mb-0">About QF Mechanisms</h5>
        </div>
        <p className="text-muted">
          Our research shows that for communities with predominantly small contributors (90% between €1-3), 
          Two-Tier Matching with a threshold of €3 provides the best balance between equality, 
          representation, and influence distribution.
        </p>
        <div className="border-top pt-2 mt-2">
          <small className="text-muted">
            Optimal budget range: <span className="fw-bold">€5000-7500</span> for matching pools
          </small>
        </div>
      </Card.Body>
    </Card>
  );
  
  return (
    <div className="mb-4">
      <Row className="g-3">
        <Col md={7}>
          {renderMethodDescription()}
        </Col>
        <Col md={5}>
          {renderGeneralInfo()}
        </Col>
      </Row>
    </div>
  );
};

export default QFMethodInfo; 