import React, { useState } from 'react';
import { Container, Form, Row, Col, InputGroup, Button } from 'react-bootstrap';
import { FaSearch, FaChevronDown, FaTimes } from 'react-icons/fa';

interface FilterTag {
  id: string;
  label: string;
}

const MarketplaceFilters: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('');
  const [district, setDistrict] = useState('');
  const [sdgFocus, setSdgFocus] = useState('');
  const [sortBy, setSortBy] = useState('contributors');
  const [activeFilters, setActiveFilters] = useState<FilterTag[]>([
    { id: 'category-climate', label: 'Climate Action' },
    { id: 'district-mitte', label: 'Aachen-Mitte' }
  ]);

  const handleRemoveFilter = (filterId: string) => {
    setActiveFilters(activeFilters.filter(filter => filter.id !== filterId));
  };

  const handleClearAllFilters = () => {
    setActiveFilters([]);
    setCategory('');
    setDistrict('');
    setSdgFocus('');
    setSearchTerm('');
  };

  return (
    <section className="py-4">
      <Container>
        <Row className="g-4 mb-4">
          <Col xs={12}>
            <InputGroup>
              <InputGroup.Text className="bg-white border-end-0">
                <FaSearch className="text-secondary" />
              </InputGroup.Text>
              <Form.Control
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="border-start-0"
              />
            </InputGroup>
          </Col>
          
          <Col md={3}>
            <Form.Group>
              <Form.Label className="text-secondary fw-medium small">Category</Form.Label>
              <div className="position-relative">
                <Form.Select 
                  value={category} 
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="">All Categories</option>
                  <option value="food-systems">Food Systems</option>
                  <option value="climate-action">Climate Action</option>
                  <option value="waste-management">Waste Management</option>
                  <option value="education">Education</option>
                  <option value="community-building">Community Building</option>
                  <option value="mobility">Mobility</option>
                </Form.Select>
                <div className="position-absolute top-50 end-0 translate-middle-y pe-3 pointer-events-none">
                  <FaChevronDown size={12} className="text-secondary" />
                </div>
              </div>
            </Form.Group>
          </Col>

          <Col md={3}>
            <Form.Group>
              <Form.Label className="text-secondary fw-medium small">District</Form.Label>
              <div className="position-relative">
                <Form.Select 
                  value={district} 
                  onChange={(e) => setDistrict(e.target.value)}
                >
                  <option value="">All Districts</option>
                  <option value="aachen-mitte">Aachen-Mitte</option>
                  <option value="laurensberg">Laurensberg</option>
                  <option value="eilendorf">Eilendorf</option>
                  <option value="brand">Brand</option>
                  <option value="haaren">Haaren</option>
                </Form.Select>
                <div className="position-absolute top-50 end-0 translate-middle-y pe-3 pointer-events-none">
                  <FaChevronDown size={12} className="text-secondary" />
                </div>
              </div>
            </Form.Group>
          </Col>

          <Col md={3}>
            <Form.Group>
              <Form.Label className="text-secondary fw-medium small">SDG Focus</Form.Label>
              <div className="position-relative">
                <Form.Select
                  value={sdgFocus}
                  onChange={(e) => setSdgFocus(e.target.value)}
                >
                  <option value="">All SDGs</option>
                  <option value="sdg-2">SDG 2: Zero Hunger</option>
                  <option value="sdg-3">SDG 3: Good Health</option>
                  <option value="sdg-4">SDG 4: Quality Education</option>
                  <option value="sdg-7">SDG 7: Clean Energy</option>
                  <option value="sdg-11">SDG 11: Sustainable Cities</option>
                  <option value="sdg-12">SDG 12: Responsible Consumption</option>
                  <option value="sdg-13">SDG 13: Climate Action</option>
                </Form.Select>
                <div className="position-absolute top-50 end-0 translate-middle-y pe-3 pointer-events-none">
                  <FaChevronDown size={12} className="text-secondary" />
                </div>
              </div>
            </Form.Group>
          </Col>

          <Col md={3}>
            <Form.Group>
              <Form.Label className="text-secondary fw-medium small">Sort By</Form.Label>
              <div className="position-relative">
                <Form.Select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="contributors">Most Contributors</option>
                  <option value="recent">Most Recent</option>
                  <option value="funding">Highest Funding</option>
                  <option value="matching">Highest Matching</option>
                </Form.Select>
                <div className="position-absolute top-50 end-0 translate-middle-y pe-3 pointer-events-none">
                  <FaChevronDown size={12} className="text-secondary" />
                </div>
              </div>
            </Form.Group>
          </Col>
        </Row>

        {activeFilters.length > 0 && (
          <div className="d-flex justify-content-between align-items-center p-3 bg-light rounded mb-4">
            <div className="d-flex flex-wrap gap-2">
              {activeFilters.map(filter => (
                <span 
                  key={filter.id} 
                  className="d-inline-flex align-items-center bg-white px-3 py-2 rounded-pill small text-dark border"
                >
                  {filter.label}
                  <Button 
                    variant="link" 
                    size="sm" 
                    className="ms-2 p-0 text-secondary" 
                    onClick={() => handleRemoveFilter(filter.id)}
                  >
                    <FaTimes size={12} />
                  </Button>
                </span>
              ))}
            </div>
            <Button 
              variant="link" 
              className="text-secondary small" 
              onClick={handleClearAllFilters}
            >
              Clear All Filters
            </Button>
          </div>
        )}
      </Container>
    </section>
  );
};

export default MarketplaceFilters; 