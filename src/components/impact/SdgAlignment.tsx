import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

interface SdgItem {
  number: number;
  name: string;
  color: string;
  projects: number;
  percentage: number;
}

const SdgAlignment: React.FC = () => {
  const sdgData: SdgItem[] = [
    { number: 3, name: 'Good Health', color: '#4c9f38', projects: 18, percentage: 40 },
    { number: 11, name: 'Sustainable Cities', color: '#f99d26', projects: 45, percentage: 100 },
    { number: 12, name: 'Responsible Consumption', color: '#bf8b2e', projects: 38, percentage: 84 },
    { number: 13, name: 'Climate Action', color: '#3f7e44', projects: 42, percentage: 93 },
    { number: 15, name: 'Life on Land', color: '#56c02b', projects: 22, percentage: 49 }
  ];
  
  return (
    <section className="py-5 bg-light">
      <Container>
        <Row className="justify-content-center text-center mb-5">
          <Col md={8}>
            <h2 className="mb-2">SDG Alignment</h2>
            <p className="text-muted">
              How Aachen's sustainability efforts map to the UN Sustainable Development Goals
            </p>
          </Col>
        </Row>
        
        <Row className="g-4">
          {sdgData.map((sdg, index) => (
            <Col md={6} lg={4} key={index}>
              <div className="bg-white rounded shadow-sm p-4 h-100">
                <div className="d-flex mb-3">
                  <div 
                    className="d-flex align-items-center justify-content-center rounded-circle text-white fw-bold me-3"
                    style={{ 
                      backgroundColor: sdg.color,
                      width: '50px',
                      height: '50px',
                      fontSize: '1.2rem'
                    }}
                  >
                    {sdg.number}
                  </div>
                  <div>
                    <h4 className="mb-0">SDG {sdg.number}: {sdg.name}</h4>
                    <p className="text-muted mb-0">{sdg.projects} projects contributing</p>
                  </div>
                </div>
                
                <div className="progress" style={{ height: '8px' }}>
                  <div 
                    className="progress-bar" 
                    role="progressbar" 
                    style={{ 
                      width: `${sdg.percentage}%`, 
                      backgroundColor: sdg.color
                    }}
                    aria-valuenow={sdg.percentage} 
                    aria-valuemin={0} 
                    aria-valuemax={100}
                  ></div>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default SdgAlignment; 