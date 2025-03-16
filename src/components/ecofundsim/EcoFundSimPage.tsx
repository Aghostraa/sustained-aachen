import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Nav, Toast, ToastContainer } from 'react-bootstrap';
import { SimulationEngine, createDefaultConfig } from './SimulationEngine';
import ControlPanel from './ui/ControlPanel';
import ProjectCard from './ui/ProjectCard';
import DonorSimulator from './ui/DonorSimulator';
import MatchingVisualizer from './ui/MatchingVisualizer';
import InfluenceIndicator from './ui/InfluenceIndicator';
import SimulationResults from './ui/SimulationResults';
import FormulaPicker from './ui/FormulaPicker';
import { Project, Donor, Donation, SimulationResult, SimulationConfig } from './models/SimulationModels';
import { v4 as uuidv4 } from 'uuid';

// Sample Aachen sustainability projects
const sampleProjects: Project[] = [
  {
    id: 'p1',
    title: 'Aachen Urban Gardens',
    description: 'Community garden network promoting local food production and biodiversity in urban spaces.',
    iconText: 'AG',
    iconColor: '#88B04B',
    targetAmount: 5000,
    category: 'Urban Green Spaces'
  },
  {
    id: 'p2',
    title: 'Circular Aachen',
    description: 'Promoting circular economy principles through repair cafés and upcycling workshops.',
    iconText: 'CA',
    iconColor: '#6B5B95',
    targetAmount: 8000,
    category: 'Waste Management'
  },
  {
    id: 'p3',
    title: 'Bike Aachen',
    description: 'Advocacy group working to improve cycling infrastructure and promoting sustainable mobility.',
    iconText: 'BA',
    iconColor: '#F7CAC9',
    targetAmount: 6500,
    category: 'Sustainable Mobility'
  },
  {
    id: 'p4',
    title: 'Sustainable Dining Aachen',
    description: 'Network connecting local restaurants with sustainable farmers to reduce food miles and packaging.',
    iconText: 'SD',
    iconColor: '#92A8D1',
    targetAmount: 7500,
    category: 'Food Systems'
  },
  {
    id: 'p5',
    title: 'Climate Action Aachen',
    description: 'Local initiative organizing climate awareness campaigns and community energy projects.',
    iconText: 'CA',
    iconColor: '#FF6F61',
    targetAmount: 10000,
    category: 'Climate Action'
  }
];

// Generate some initial donors
const generateInitialDonors = (count: number): Donor[] => {
  const donors: Donor[] = [];
  const firstNames = ["Anna", "Max", "Lena", "Felix", "Julia", "Jan"];
  const lastNames = ["Müller", "Schmidt", "Schneider", "Fischer", "Weber"];
  
  for (let i = 0; i < count; i++) {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    
    donors.push({
      id: uuidv4(),
      name: `${firstName} ${lastName}`,
      verificationType: Math.random() > 0.3 ? 'email' : 'none',
      firstTimeContributor: Math.random() > 0.7,
    });
  }
  
  return donors;
};

const EcoFundSimContainer: React.FC = () => {
  // Create a simulation engine with default config
  const [engine] = useState(() => new SimulationEngine(createDefaultConfig()));
  const [activeView, setActiveView] = useState<'simulator' | 'results'>('simulator');
  const [donations, setDonations] = useState<Donation[]>([]);
  const [donors, setDonors] = useState<Donor[]>(generateInitialDonors(20));
  const [projects] = useState<Project[]>(sampleProjects);
  const [config, setConfig] = useState<SimulationConfig>(createDefaultConfig());
  const [results, setResults] = useState<SimulationResult | null>(null);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  
  // Initialize the engine
  useEffect(() => {
    engine.setProjects(projects);
    engine.setDonors(donors);
  }, [engine, projects, donors]);
  
  // Update engine when donations change
  useEffect(() => {
    engine.setDonations(donations);
    // Run simulation when donations change
    const simulationResult = engine.simulate();
    setResults(simulationResult);
  }, [engine, donations]);
  
  // Update engine when config changes
  useEffect(() => {
    engine.updateConfig(config);
    // Re-run simulation when config changes
    const simulationResult = engine.simulate();
    setResults(simulationResult);
  }, [engine, config]);
  
  // Handle bulk donations addition
  const handleBulkDonationsAdded = (count: number) => {
    // Show feedback
    setToastMessage(`Added ${count} donations to the simulation`);
    setShowToast(true);
    
    // Switch to results view automatically
    setActiveView('results');
  };
  
  // Handler for adding a new donation
  const handleAddDonation = (donation: Donation) => {
    // Add to state
    setDonations(prev => {
      const newDonations = [...prev, donation];
      
      // Update engine with new donations
      engine.setDonations(newDonations);
      
      // Run simulation immediately with the updated data
      const simulationResult = engine.simulate();
      setResults(simulationResult);
      
      return newDonations;
    });
    
    // Show feedback toast
    setToastMessage(`Donation added: ${donation.amount}€`);
    setShowToast(true);
  };
  
  // Handler for updating the configuration
  const handleUpdateConfig = (newConfig: Partial<SimulationConfig>) => {
    setConfig(prev => ({ ...prev, ...newConfig }));
  };
  
  // Handler for resetting the simulation
  const handleReset = () => {
    setDonations([]);
    engine.reset();
    setResults(null);
  };
  
  // Handler for selecting a project to view details
  const handleSelectProject = (projectId: string) => {
    setSelectedProjectId(projectId);
  };
  
  return (
    <Container fluid className="my-4">
      {/* Toast notifications for real-time feedback */}
      <ToastContainer position="top-end" className="p-3" style={{ zIndex: 1060 }}>
        <Toast 
          onClose={() => setShowToast(false)} 
          show={showToast} 
          delay={3000} 
          autohide
          bg="success"
          className="text-white"
        >
          <Toast.Header>
            <strong className="me-auto">Simulation Update</strong>
          </Toast.Header>
          <Toast.Body>{toastMessage}</Toast.Body>
        </Toast>
      </ToastContainer>
      
      <Row className="mb-4">
        <Col>
          <Card>
            <Card.Header>
              <Nav variant="tabs">
                <Nav.Item>
                  <Nav.Link 
                    active={activeView === 'simulator'} 
                    onClick={() => setActiveView('simulator')}
                  >
                    Simulator
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link 
                    active={activeView === 'results'} 
                    onClick={() => setActiveView('results')}
                  >
                    Results
                  </Nav.Link>
                </Nav.Item>
              </Nav>
            </Card.Header>
            <Card.Body>
              {activeView === 'simulator' ? (
                <Row>
                  <Col md={4}>
                    <ControlPanel 
                      config={config} 
                      onUpdateConfig={handleUpdateConfig} 
                      onReset={handleReset}
                    />
                    <FormulaPicker 
                      config={config}
                      onUpdateConfig={handleUpdateConfig}
                    />
                  </Col>
                  <Col md={8}>
                    <h4 className="mb-3">Projects</h4>
                    <Row>
                      {projects.map(project => (
                        <Col md={6} lg={4} key={project.id} className="mb-3">
                          <ProjectCard 
                            project={project} 
                            results={results ? results.projects.find(p => p.projectId === project.id) : undefined}
                            onSelect={() => handleSelectProject(project.id)}
                            isSelected={selectedProjectId === project.id}
                          />
                        </Col>
                      ))}
                    </Row>
                    
                    <DonorSimulator 
                      donors={donors} 
                      projects={projects} 
                      onAddDonation={handleAddDonation}
                      onAddDonor={(donor) => setDonors(prev => [...prev, donor])}
                      onBulkDonationsAdded={handleBulkDonationsAdded}
                    />
                  </Col>
                </Row>
              ) : (
                <Row>
                  <Col md={12}>
                    {results && (
                      <>
                        <MatchingVisualizer 
                          results={results}
                          projects={projects}
                          donors={donors}
                          donations={donations}
                        />
                        
                        <InfluenceIndicator
                          results={results}
                          projects={projects}
                          donors={donors}
                          selectedProjectId={selectedProjectId}
                        />
                        
                        <SimulationResults 
                          results={results}
                          projects={projects}
                          donors={donors}
                          config={config}
                        />
                      </>
                    )}
                  </Col>
                </Row>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
      
      <Row className="mb-4">
        <Col>
          <Card>
            <Card.Header>Educational Resources</Card.Header>
            <Card.Body>
              <h5>What is Quadratic Funding?</h5>
              <p>
                Quadratic Funding is a mechanism designed to democratically allocate funds to public goods.
                It emphasizes the number of contributors over the amounts given, making it ideal for
                community-driven initiatives.
              </p>
              
              <h5>The Whale Donor Problem</h5>
              <p>
                When a few large donors ("whales") contribute most of the funding, they gain disproportionate
                influence over which projects succeed. This undermines the democratic nature of community funding.
              </p>
              
              <h5>Formula Variations</h5>
              <ul>
                <li><strong>Standard QF:</strong> Basic formula that squares the sum of square roots of contributions.</li>
                <li><strong>Capped:</strong> Limits the influence of large donations by capping each contribution.</li>
                <li><strong>Two-Tier:</strong> Applies different matching rates to small and large donations.</li>
                <li><strong>Declining:</strong> Reduces the marginal impact of larger donations using a power function.</li>
              </ul>
              
              <h5>Anti-Collusion Measures</h5>
              <p>
                To prevent gaming the system, donations may be flagged for potential collusion based on:
                multiple donations from the same IP/device, suspicious timing patterns, and other verification methods.
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default EcoFundSimContainer; 