import React, { useState } from 'react';
import { Container, Row, Col, Pagination, Button, Nav } from 'react-bootstrap';
import { FaThLarge, FaList } from 'react-icons/fa';
import ProjectCard from './ProjectCard';

// Mock data for the projects
const mockProjects = [
  // City-run Projects
  {
    id: 'bewegungsmelder',
    title: 'Bewegungsmelder Aachen',
    iconText: 'BM',
    iconColor: '#3b82f6',
    description: 'Platform connecting people with social, environmental, and cultural initiatives in Aachen through events and volunteer opportunities.',
    tags: ['Community', 'Volunteering', 'City-run'],
    amountRaised: 2184.75,
    contributors: 78,
    targetAmount: 2500,
    category: 'city-run',
    contact: 'team@bewegungsmelder-aachen.de',
    website: 'https://bewegungsmelder-aachen.de'
  },
  {
    id: 'activeforfuture',
    title: 'ACtive for Future',
    iconText: 'AF',
    iconColor: '#10b981',
    description: 'School initiative promoting sustainability by engaging with the 17 SDGs, helping schools adopt eco-friendly practices.',
    tags: ['Education', 'Schools', 'City-run'],
    amountRaised: 956.40,
    contributors: 31,
    targetAmount: 1500,
    category: 'city-run',
    contact: 'fabiola.blum@mail.aachen.de',
    website: 'https://serviceportal.aachen.de'
  },
  {
    id: 'ernaehrungsrat',
    title: 'Ernährungsrat Aachen',
    iconText: 'ER',
    iconColor: '#4ade80',
    description: 'Advocates for sustainable, regional, and healthy food systems in Aachen, bringing together food producers, processors, and consumers.',
    tags: ['Food Systems', 'Sustainability', 'City-run'],
    amountRaised: 1427.50,
    contributors: 42,
    targetAmount: 2200,
    category: 'city-run',
    contact: 'ernaehrungsrat-aachen@posteo.de',
    website: 'https://www.buergerstiftung-aachen.de/projekte/unsere-projekte/ernaehrungsrat.html'
  },
  {
    id: 'wandelwerk',
    title: 'Das Wandelwerk (Eine Welt Forum)',
    iconText: 'WW',
    iconColor: '#8b5cf6',
    description: 'Alliance of local groups working towards sustainable and globally just development through education and advocacy.',
    tags: ['Global Justice', 'Education', 'City-run'],
    amountRaised: 1876.30,
    contributors: 53,
    targetAmount: 2300,
    category: 'city-run',
    contact: '1wf@1wf.de',
    website: 'https://www.1wf.de'
  },
  {
    id: 'aachenwasgeht',
    title: 'Aachen Was Geht',
    iconText: 'AW',
    iconColor: '#f59e0b',
    description: 'Local platform highlighting events, initiatives, and projects happening in and around Aachen, from cultural meetups to environmental activities.',
    tags: ['Events', 'Community', 'City-run'],
    amountRaised: 1865.22,
    contributors: 63,
    targetAmount: 2400,
    category: 'city-run',
    contact: 'pfeiffer@bluebird.ac',
    website: 'https://aachenwasgeht.de'
  },
  {
    id: 'greenpeace',
    title: 'Greenpeace Aachen',
    iconText: 'GP',
    iconColor: '#22c55e',
    description: 'Local Greenpeace chapter advocating for environmental protection since 1982 through campaigns, exhibitions, and demonstrations.',
    tags: ['Environment', 'Activism', 'City-run'],
    amountRaised: 2105.60,
    contributors: 71,
    targetAmount: 2600,
    category: 'city-run',
    contact: 'info@aachen.greenpeace.de',
    website: 'https://greenpeace-aachen.de'
  },
  {
    id: 'baumschutzbund',
    title: 'Aachener Baumschutzbund',
    iconText: 'AB',
    iconColor: '#84cc16',
    description: 'Non-partisan citizens\' initiative promoting urban ecology and tree protection in Aachen through public awareness campaigns.',
    tags: ['Urban Ecology', 'Tree Protection', 'City-run'],
    amountRaised: 905.45,
    contributors: 29,
    targetAmount: 1400,
    category: 'city-run',
    contact: 'info@aachener-baumschutzbund.de',
    website: 'http://www.aachener-baumschutzbund.de'
  },
  {
    id: 'klimaentscheid',
    title: 'Klimaentscheid Aachen',
    iconText: 'KA',
    iconColor: '#6366f1',
    description: 'Non-partisan climate action group working toward making Aachen climate-neutral by 2030 through citizen petitions and local initiatives.',
    tags: ['Climate', 'Policy', 'City-run'],
    amountRaised: 1243.80,
    contributors: 47,
    targetAmount: 2000,
    category: 'city-run',
    contact: 'netzwerk@klimaentscheid-aachen.de',
    website: 'https://klimaentscheid-aachen.de'
  },
  {
    id: 'energiegewinner',
    title: 'Energiegewinner Aachen Euregio',
    iconText: 'EG',
    iconColor: '#facc15',
    description: 'Cooperative focusing on accessible solar energy implementation, helping citizens participate in energy transition.',
    tags: ['Energy', 'Solar', 'City-run'],
    amountRaised: 1532.70,
    contributors: 45,
    targetAmount: 2200,
    category: 'city-run',
    contact: 'aachen-euregio@energiegewinner.de',
    website: 'http://www.energiegewinner.de'
  },
  {
    id: 'nachhaltig',
    title: 'nAChhaltig angezogen',
    iconText: 'NA',
    iconColor: '#ec4899',
    description: 'Sustainable fashion initiative helping people find eco-friendly clothing options in Aachen.',
    tags: ['Fashion', 'Sustainability', 'City-run'],
    amountRaised: 876.20,
    contributors: 32,
    targetAmount: 1600,
    category: 'city-run',
    contact: 'nachhaltig_angezogen@soziologie.rwth-aachen.de',
    website: 'https://nachhaltig-angezogen.de'
  },
  {
    id: 'veganinac',
    title: 'Vegan in Aachen',
    iconText: 'VA',
    iconColor: '#14b8a6',
    description: 'Community group organizing regular meetups, potlucks, and restaurant visits for vegans and vegan-curious individuals.',
    tags: ['Food', 'Community', 'City-run'],
    amountRaised: 748.90,
    contributors: 27,
    targetAmount: 1300,
    category: 'city-run',
    contact: 'Via Instagram: @vegan_in_aachen',
    website: 'https://www.instagram.com/vegan_in_aachen'
  },
  {
    id: 'medinetz',
    title: 'MediNetz Aachen e.V.',
    iconText: 'MN',
    iconColor: '#0ea5e9',
    description: 'Non-profit providing anonymous medical consultation and referral services for refugees regardless of their residence status.',
    tags: ['Healthcare', 'Refugees', 'City-run'],
    amountRaised: 1352.40,
    contributors: 38,
    targetAmount: 2100,
    category: 'city-run',
    contact: 'medinetzaachen@mailbox.org',
    website: 'http://www.medinetzaachen.de'
  },
  
  // Student-run Projects
  {
    id: 'students4future',
    title: 'Students For Future Aachen',
    iconText: 'S4F',
    iconColor: '#16a34a',
    description: 'Student-led initiative focused on climate activism at universities, particularly at RWTH Aachen.',
    tags: ['Climate', 'Students', 'Student-run'],
    amountRaised: 892.60,
    contributors: 34,
    targetAmount: 1500,
    category: 'student-run',
    contact: 'studierende@fridaysforfuture.de',
    website: 'https://studentsforfuture.info/ortsgruppe/aachen/'
  },
  {
    id: 'pan',
    title: 'Plattform Aachener Nachhaltigkeit (PAN e.V.)',
    iconText: 'PAN',
    iconColor: '#65a30d',
    description: 'PAN e.V. connects individuals, businesses, and organizations working on sustainability projects in Aachen.',
    tags: ['Networking', 'Sustainability', 'Student-run'],
    amountRaised: 1205.30,
    contributors: 41,
    targetAmount: 1900,
    category: 'student-run',
    contact: 'info@pan-aachen.de',
    website: 'https://pan-aachen.de'
  },
  {
    id: 'uniurbanmobil',
    title: 'Uni.Urban.Mobil',
    iconText: 'UUM',
    iconColor: '#0891b2',
    description: 'Promotes sustainable urban mobility in Aachen, encouraging the use of eco-friendly transport options.',
    tags: ['Mobility', 'Urban', 'Student-run'],
    amountRaised: 1087.50,
    contributors: 36,
    targetAmount: 1800,
    category: 'student-run',
    contact: 'info@uum-ac.de',
    website: 'https://uum-ac.de'
  },
  {
    id: 'sekmuell',
    title: 'SEK Müll',
    iconText: 'SM',
    iconColor: '#ec4899',
    description: 'Student cleanup initiative organizing waste collection events and environmental awareness campaigns around Aachen.',
    tags: ['Waste', 'Students', 'Student-run'],
    amountRaised: 742.25,
    contributors: 23,
    targetAmount: 1200,
    category: 'student-run',
    contact: 'sekmuell@pan-aachen.de',
    website: 'https://cleanupnetwork.com/organizations/sek-muell/'
  },
  {
    id: 'energybirds',
    title: 'Energybirds e.V.',
    iconText: 'EB',
    iconColor: '#f59e0b',
    description: 'Promotes sustainability and renewable energy projects, engaging young people and professionals.',
    tags: ['Energy', 'Education', 'Student-run'],
    amountRaised: 968.70,
    contributors: 29,
    targetAmount: 1600,
    category: 'student-run',
    contact: 'info@energybirds.org',
    website: 'https://www.energybirds.org'
  },
  {
    id: 'energieforum',
    title: 'Energie Forum Aachen e.V.',
    iconText: 'EFA',
    iconColor: '#d97706',
    description: 'Forum focusing on promoting energy efficiency and renewable energy in the Aachen region.',
    tags: ['Energy', 'Sustainability', 'Student-run'],
    amountRaised: 1124.80,
    contributors: 38,
    targetAmount: 1700,
    category: 'student-run',
    contact: 'via Contact Form',
    website: 'https://2efaachen.de'
  }
];

type ViewMode = 'grid' | 'list';
type CategoryFilter = 'all' | 'city-run' | 'student-run';

const ProjectsGrid: React.FC = () => {
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>('all');
  
  const filteredProjects = categoryFilter === 'all' 
    ? mockProjects 
    : mockProjects.filter(project => project.category === categoryFilter);
  
  return (
    <section className="py-4">
      <Container>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="mb-0 fw-bold">All Projects ({filteredProjects.length})</h2>
          <div className="d-flex gap-3">
            <Button 
              variant={viewMode === 'grid' ? 'primary' : 'light'}
              onClick={() => setViewMode('grid')}
              className="d-flex align-items-center"
            >
              <FaThLarge className="me-2" /> Grid
            </Button>
            <Button 
              variant={viewMode === 'list' ? 'primary' : 'light'}
              onClick={() => setViewMode('list')}
              className="d-flex align-items-center"
            >
              <FaList className="me-2" /> List
            </Button>
          </div>
        </div>
        
        <Nav className="mb-4" variant="pills">
          <Nav.Item>
            <Nav.Link 
              className={categoryFilter === 'all' ? 'active' : ''}
              onClick={() => setCategoryFilter('all')}
            >
              All Projects
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link 
              className={categoryFilter === 'city-run' ? 'active' : ''}
              onClick={() => setCategoryFilter('city-run')}
            >
              City-run
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link 
              className={categoryFilter === 'student-run' ? 'active' : ''}
              onClick={() => setCategoryFilter('student-run')}
            >
              Student-run
            </Nav.Link>
          </Nav.Item>
        </Nav>
        
        <Row className="g-4">
          {filteredProjects.map(project => (
            <Col 
              key={project.id} 
              md={viewMode === 'grid' ? 6 : 12} 
              lg={viewMode === 'grid' ? 4 : 12}
            >
              <ProjectCard 
                id={project.id}
                title={project.title}
                iconText={project.iconText}
                iconColor={project.iconColor}
                description={project.description}
                tags={project.tags}
                amountRaised={project.amountRaised}
                contributors={project.contributors}
                targetAmount={project.targetAmount}
                contact={project.contact}
                website={project.website}
              />
            </Col>
          ))}
        </Row>
        
        <div className="d-flex justify-content-center mt-5">
          <Pagination>
            <Pagination.Item active>{1}</Pagination.Item>
            <Pagination.Item>{2}</Pagination.Item>
            <Pagination.Item>{3}</Pagination.Item>
            <Pagination.Ellipsis />
            <Pagination.Item>
              Next <span className="ms-1">&raquo;</span>
            </Pagination.Item>
          </Pagination>
        </div>
      </Container>
    </section>
  );
};

export default ProjectsGrid; 