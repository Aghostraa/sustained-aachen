import React, { useState } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

interface DistrictData {
  name: string;
  funding: number;
  projects: number;
  contributors: number;
  topProject: string;
}

const DistrictImpact: React.FC = () => {
  const districtData: DistrictData[] = [
    { 
      name: 'Aachen-Mitte', 
      funding: 18750.40, 
      projects: 12, 
      contributors: 487,
      topProject: 'Bewegungsmelder Aachen'
    },
    { 
      name: 'Laurensberg', 
      funding: 7250.25, 
      projects: 5, 
      contributors: 203,
      topProject: 'RWTH Solar Initiative'
    },
    { 
      name: 'Eilendorf', 
      funding: 4125.80, 
      projects: 3, 
      contributors: 97,
      topProject: 'Mobistart e.V.'
    },
    { 
      name: 'Brand', 
      funding: 6230.15, 
      projects: 4, 
      contributors: 154,
      topProject: 'Repair Café Brand'
    },
    { 
      name: 'Haaren', 
      funding: 3780.55, 
      projects: 3, 
      contributors: 112,
      topProject: 'Green Spaces Initiative'
    }
  ];
  
  // Find max funding value for relative scaling
  const maxFunding = Math.max(...districtData.map(district => district.funding));
  
  // Default show the first district in the detail card
  const [selectedDistrict, setSelectedDistrict] = useState<DistrictData>(districtData[0]);
  
  return (
    <section className="py-5 bg-white">
      <Container>
        <Row className="justify-content-center text-center mb-5">
          <Col md={8}>
            <h2 className="mb-2">Impact by District</h2>
            <p className="text-muted">
              Comparing sustainability efforts across Aachen's districts
            </p>
          </Col>
        </Row>
        
        <Row>
          <Col lg={7} className="mb-4 mb-lg-0">
            <div className="bg-light p-4 rounded-3 h-100">
              <h4 className="mb-4">Funding Comparison</h4>
              
              {districtData.map((district, index) => (
                <div 
                  key={index} 
                  className="mb-3 d-flex align-items-center"
                  onClick={() => setSelectedDistrict(district)}
                  style={{ cursor: 'pointer' }}
                >
                  <div style={{ width: '120px' }} className="text-end pe-3">
                    {district.name}
                  </div>
                  <div className="flex-grow-1">
                    <div className="position-relative" style={{ height: '30px' }}>
                      <div 
                        className={`position-absolute top-0 start-0 h-100 rounded ${selectedDistrict === district ? 'bg-primary' : 'bg-primary opacity-75'}`}
                        style={{ 
                          width: `${(district.funding / maxFunding) * 100}%`,
                          transition: 'width 0.5s ease'
                        }}
                      ></div>
                      <div 
                        className="position-absolute top-0 start-0 h-100 w-100 d-flex align-items-center px-3"
                      >
                        <span className={`small fw-bold ${district.funding / maxFunding > 0.3 ? 'text-white' : 'text-dark'}`}>
                          €{district.funding.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              
              <div className="mt-4 small text-muted">
                <p className="mb-0">Click on any district bar to view detailed metrics</p>
              </div>
            </div>
          </Col>
          
          <Col lg={5}>
            <Card className="h-100 shadow-sm border-0">
              <Card.Body className="p-4">
                <h3 className="mb-4">{selectedDistrict.name}</h3>
                
                <div className="d-flex flex-wrap mb-4">
                  <div className="me-4 mb-3">
                    <div className="text-muted small mb-1">Projects</div>
                    <div className="h4 fw-bold mb-0">{selectedDistrict.projects}</div>
                  </div>
                  
                  <div className="me-4 mb-3">
                    <div className="text-muted small mb-1">Funding</div>
                    <div className="h4 fw-bold mb-0">€{selectedDistrict.funding.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                  </div>
                  
                  <div className="mb-3">
                    <div className="text-muted small mb-1">Contributors</div>
                    <div className="h4 fw-bold mb-0">{selectedDistrict.contributors}</div>
                  </div>
                </div>
                
                <div>
                  <div className="text-muted small mb-1">Top Project</div>
                  <div className="h5 text-primary mb-0">{selectedDistrict.topProject}</div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default DistrictImpact; 