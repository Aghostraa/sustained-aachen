import React, { useState } from 'react';
import { Container, Row, Col, Form } from 'react-bootstrap';

interface MapPin {
  id: number;
  top: string;
  left: string;
  color: string;
  title: string;
  category: string;
}

const ImpactMap: React.FC = () => {
  const categories = [
    { name: 'Food Systems', color: '#4ade80' },
    { name: 'Climate Action', color: '#3b82f6' },
    { name: 'Waste Management', color: '#f59e0b' },
    { name: 'Education', color: '#10b981' },
    { name: 'Mobility', color: '#ec4899' }
  ];
  
  const mapPins: MapPin[] = [
    { id: 1, top: '30%', left: '45%', color: '#4ade80', title: 'Ernährungsrat Aachen - Food Systems', category: 'Food Systems' },
    { id: 2, top: '25%', left: '55%', color: '#3b82f6', title: 'Klimaentscheid Aachen - Climate Action', category: 'Climate Action' },
    { id: 3, top: '45%', left: '35%', color: '#f59e0b', title: 'SEK Müll - Waste Management', category: 'Waste Management' },
    { id: 4, top: '60%', left: '48%', color: '#10b981', title: 'ACtive for Future - Education', category: 'Education' },
    { id: 5, top: '40%', left: '60%', color: '#ec4899', title: 'Uni.Urban.Mobil - Mobility', category: 'Mobility' },
    { id: 6, top: '53%', left: '52%', color: '#4ade80', title: 'Community Garden - Food Systems', category: 'Food Systems' },
    { id: 7, top: '35%', left: '38%', color: '#3b82f6', title: 'Energybirds e.V. - Climate Action', category: 'Climate Action' }
  ];
  
  const [activeCategories, setActiveCategories] = useState<Set<string>>(
    new Set(categories.map(cat => cat.name))
  );

  const handleCategoryToggle = (category: string) => {
    const newCategories = new Set(activeCategories);
    if (newCategories.has(category)) {
      newCategories.delete(category);
    } else {
      newCategories.add(category);
    }
    setActiveCategories(newCategories);
  };
  
  const filteredPins = mapPins.filter(pin => activeCategories.has(pin.category));
  
  return (
    <section className="py-5 bg-light">
      <Container>
        <Row className="justify-content-center mb-4 text-center">
          <Col md={8}>
            <h2 className="mb-2">Interactive Sustainability Map</h2>
            <p className="text-muted">
              Visualizing our collective impact across Aachen
            </p>
          </Col>
        </Row>
        
        <Row className="mb-4">
          <Col>
            <div className="bg-white p-4 rounded shadow-sm">
              <p>
                Curtesy of <a href="https://www.rwth-aachen.de/cms/root/Die-RWTH/Nachhaltigkeit/~scaqk/Digitale-Nachhaltigkeitslandschaft/lidx/1/">RWTH Aachen</a>
              </p>
            </div>
          </Col>
        </Row>
        
        <Row>
          <Col lg={8} className="mb-4 mb-lg-0">
            <div className="position-relative bg-white rounded shadow-sm overflow-hidden" style={{ minHeight: '400px' }}>
              {filteredPins.map(pin => (
                <div 
                  key={pin.id}
                  className="position-absolute rounded-circle d-flex align-items-center justify-content-center"
                  style={{
                    top: pin.top,
                    left: pin.left,
                    backgroundColor: pin.color,
                    width: '24px',
                    height: '24px',
                    transform: 'translate(-50%, -50%)',
                    boxShadow: '0 0 0 2px white',
                    zIndex: 10,
                    cursor: 'pointer'
                  }}
                  title={pin.title}
                />
              ))}
              <img 
                src="https://indigo-advanced-fish-283.mypinata.cloud/ipfs/bafkreia2p63u5zhxbzk3vrexygdtq5duqlvhcocpa2e5tlyawy6ovhq5su" 
                alt="Sustainability Map of Aachen" 
                className="img-fluid w-100 h-100 object-fit-cover"
                style={{ objectPosition: 'center' }}
              />
            </div>
          </Col>
          
          <Col lg={4}>
            <div className="bg-white p-4 rounded shadow-sm">
              <h4 className="mb-3">Map Legend</h4>
              <div className="mb-4">
                {categories.map((category, index) => (
                  <div key={index} className="d-flex align-items-center mb-2">
                    <div 
                      className="rounded-circle me-2"
                      style={{ 
                        backgroundColor: category.color,
                        width: '16px',
                        height: '16px'
                      }}
                    ></div>
                    <span>{category.name}</span>
                  </div>
                ))}
              </div>
              
              <h4 className="mb-3">Filter by Category</h4>
              <Form>
                {categories.map((category, index) => (
                  <Form.Check 
                    key={index}
                    type="checkbox"
                    id={`category-${index}`}
                    label={category.name}
                    checked={activeCategories.has(category.name)}
                    onChange={() => handleCategoryToggle(category.name)}
                    className="mb-2"
                  />
                ))}
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default ImpactMap; 