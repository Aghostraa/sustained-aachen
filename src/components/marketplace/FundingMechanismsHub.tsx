import React, { useState } from 'react';
import { Container, Nav, Card, Button } from 'react-bootstrap';
import { FaCalculator, FaChartBar, FaBook } from 'react-icons/fa';
import FundingMechanismsComparison from './FundingMechanismsComparison';
import QuadraticFundingSimulator from './QuadraticFundingSimulator';

interface TabInfo {
  id: string;
  title: string;
  icon: React.ReactNode;
  description: string;
}

const FundingMechanismsHub: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('simulator');
  
  const tabs: TabInfo[] = [
    {
      id: 'simulator',
      title: 'Funding Mechanisms Simulator',
      icon: <FaCalculator className="me-2" />,
      description: 'Compare how different funding mechanisms distribute the same matching pool'
    },
    {
      id: 'comparison',
      title: 'Funding Mechanisms Theory',
      icon: <FaBook className="me-2" />,
      description: 'Learn about the mathematical formulations behind different funding mechanisms'
    }
  ];

  return (
    <div className="bg-light py-4">
      <Container>
        <Card className="shadow-sm mb-4">
          <Card.Body>
            <h1 className="fw-bold mb-2 text-center">Funding Mechanisms Explorer</h1>
            <p className="text-secondary text-center mb-4">
              Understand and compare different funding mechanisms for public goods
            </p>
            
            <Nav className="gap-2 mb-4 justify-content-center" variant="pills">
              {tabs.map((tab) => (
                <Nav.Item key={tab.id}>
                  <Button
                    variant={activeTab === tab.id ? 'primary' : 'outline-primary'}
                    onClick={() => setActiveTab(tab.id)}
                    className="d-flex align-items-center"
                  >
                    {tab.icon}
                    {tab.title}
                  </Button>
                </Nav.Item>
              ))}
            </Nav>
            
            <div>
              {activeTab === 'simulator' && <QuadraticFundingSimulator />}
              {activeTab === 'comparison' && <FundingMechanismsComparison />}
            </div>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default FundingMechanismsHub; 