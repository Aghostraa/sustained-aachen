import React, { useState, useEffect, useRef } from 'react';
import { Container, Row, Col, Alert, Card, Button, Badge } from 'react-bootstrap';
import { SimulationEngine, createDefaultConfig } from '../SimulationEngine';
import { Project, Donor, Donation, SimulationResult, SimulationConfig } from '../models/SimulationModels';
import { generateDonor, generateDonations, createDonation } from '../utils/DonationGenerator';
import { v4 as uuidv4 } from 'uuid';
import QFProjectCard, { QFProject } from './QFProjectCard';
import DonationsList from './DonationsList';
import ProjectStats from './ProjectStats';
import DonationForm from './DonationForm';
import RoundSettings from './RoundSettings';
import QFMethodInfo from './QFMethodInfo';
import { CSSTransition } from 'react-transition-group';
import { FaChevronLeft, FaUser, FaCheckCircle, FaClock, FaStar } from 'react-icons/fa';

// Define an extended project type that includes additional metadata
interface ExtendedProject extends Project {
  tags?: string[];
  contact?: string;
  website?: string;
}

// Convert mock projects from ProjectsGrid to QFProject format
const convertMockProjects = (mockProjects: any[]): ExtendedProject[] => {
  return mockProjects.map(project => ({
    id: project.id,
    title: project.title,
    description: project.description,
    iconText: project.iconText,
    iconColor: project.iconColor,
    targetAmount: project.targetAmount || 0,
    category: project.category || '',
    tags: project.tags,
    contact: project.contact,
    website: project.website
  }));
};

// Mock data from ProjectsGrid.tsx
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
  }
];

// Example user data for the donation form
const exampleUser = {
  name: "Maria Schmidt",
  isVerified: true,
  hasEarlyBirdBonus: true,
  hasFrequentDonorBonus: true,
  hasLocalBonus: true
};

// CSS for animations
const animationStyles = `
.project-grid-exit {
  opacity: 1;
  transform: scale(1);
}
.project-grid-exit-active {
  opacity: 0;
  transform: scale(0.9);
  transition: opacity 300ms, transform 300ms;
}
.project-selected-enter {
  opacity: 0;
  transform: translateX(-30px);
}
.project-selected-enter-active {
  opacity: 1;
  transform: translateX(0);
  transition: opacity 300ms, transform 300ms;
}
.project-details-enter {
  opacity: 0;
  transform: translateY(-20px);
}
.project-details-enter-active {
  opacity: 1;
  transform: translateY(0);
  transition: opacity 300ms, transform 300ms;
  transition-delay: 200ms;
}
.project-sidebar-enter {
  opacity: 0;
  transform: translateX(-20px);
}
.project-sidebar-enter-active {
  opacity: 1;
  transform: translateX(0);
  transition: opacity 300ms, transform 300ms;
}
`;

const QFRoundPage: React.FC = () => {
  // Set up simulation engine with default config
  const [engine] = useState(() => new SimulationEngine(createDefaultConfig()));
  const [config, setConfig] = useState<SimulationConfig>(() => {
    const defaultConfig = createDefaultConfig();
    return {
      ...defaultConfig,
      matchingPool: 5000, 
      formulaType: 'two-tier',
      enableVerification: true,
      enableIncentives: true
    };
  });
  
  // State for projects, donors, and donations
  const [projects] = useState<ExtendedProject[]>(convertMockProjects(mockProjects));
  const [donors, setDonors] = useState<Donor[]>([]);
  const [donations, setDonations] = useState<Donation[]>([]);
  const [results, setResults] = useState<SimulationResult | null>(null);
  
  // UI state
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [donationAmount, setDonationAmount] = useState<number>(5);
  const [isCalculatingImpact, setIsCalculatingImpact] = useState<boolean>(false);
  const [currentMatchingImpact, setCurrentMatchingImpact] = useState<number>(0);
  const [showMultiplierAlert, setShowMultiplierAlert] = useState<boolean>(true);
  
  // Animation states
  const [showGrid, setShowGrid] = useState<boolean>(true);
  const [showSelectedProject, setShowSelectedProject] = useState<boolean>(false);
  const [showDetails, setShowDetails] = useState<boolean>(false);
  const [showSidebar, setShowSidebar] = useState<boolean>(false);
  
  // Create refs for CSSTransition components
  const selectedProjectRef = useRef(null);
  const projectDetailsRef = useRef(null);
  const sidebarRef = useRef(null);
  const donationFormRef = useRef(null);
  
  // Generate 50 initial donors based on grassroots pattern and generate donations
  useEffect(() => {
    const initialDonors: Donor[] = [];
    for (let i = 0; i < 50; i++) {
      initialDonors.push(generateDonor());
    }
    setDonors(initialDonors);
    
    // Generate initial donations for each project with grassroots pattern
    let allDonations: Donation[] = [];
    
    projects.forEach(project => {
      // Assign random donors to each project, but ensure they are somewhat evenly distributed
      const donorsForProject = initialDonors
        .sort(() => 0.5 - Math.random())
        .slice(0, Math.floor(Math.random() * 20) + 15); // 15-35 donors per project
      
      const projectDonations = generateDonations(
        [project],
        donorsForProject,
        Math.floor(Math.random() * 20) + 25, // 25-45 donations per project
        'grassroots'
      );
      
      allDonations = [...allDonations, ...projectDonations];
    });
    
    setDonations(allDonations);
  }, [projects]);
  
  // Update engine when data changes
  useEffect(() => {
    engine.setProjects(projects);
    engine.setDonors(donors);
    engine.setDonations(donations);
    engine.updateConfig(config);
    
    // Run simulation
    const simulationResult = engine.simulate();
    setResults(simulationResult);
  }, [engine, projects, donors, donations, config]);
  
  // Calculate real-time matching impact for current donation input
  useEffect(() => {
    if (!selectedProjectId || donationAmount <= 0) {
      setCurrentMatchingImpact(0);
      return;
    }
    
    // Indicate calculation in progress
    setIsCalculatingImpact(true);
    
    // Use a debounce to avoid too many calculations
    const timer = setTimeout(() => {
      // Create a temporary donor and donation
      const tempDonor: Donor = {
        id: 'temp-donor',
        name: exampleUser.name,
        verificationType: exampleUser.isVerified ? 'id' : 'none',
        firstTimeContributor: false,
      };
      
      const tempDonation: Donation = {
        id: 'temp-donation',
        projectId: selectedProjectId,
        donorId: tempDonor.id,
        amount: donationAmount,
        timestamp: new Date(),
        ipAddress: '127.0.0.1',
        deviceId: 'browser-device',
        earlyBird: exampleUser.hasEarlyBirdBonus,
      };
      
      // Create a temporary engine to calculate the impact
      const tempEngine = new SimulationEngine(config);
      tempEngine.setProjects(projects);
      tempEngine.setDonors([...donors, tempDonor]);
      
      // Run simulation without new donation
      tempEngine.setDonations(donations);
      const beforeResult = tempEngine.simulate();
      
      // Run simulation with new donation
      tempEngine.setDonations([...donations, tempDonation]);
      const afterResult = tempEngine.simulate();
      
      // Find the project in both results
      const projectBefore = beforeResult.projects.find(p => p.projectId === selectedProjectId);
      const projectAfter = afterResult.projects.find(p => p.projectId === selectedProjectId);
      
      if (projectBefore && projectAfter) {
        // Calculate the difference in matching
        const matchingImpact = projectAfter.matchingAmount - projectBefore.matchingAmount;
        setCurrentMatchingImpact(matchingImpact);
      }
      
      setIsCalculatingImpact(false);
    }, 300);
    
    return () => clearTimeout(timer);
  }, [donationAmount, selectedProjectId, donations, donors, projects, config]);
  
  // Handle project selection
  const handleSelectProject = (projectId: string) => {
    setSelectedProjectId(projectId);
    
    // Control animation sequence
    setShowGrid(false);
    setTimeout(() => {
      setShowSelectedProject(true);
      setTimeout(() => {
        setShowDetails(true);
        setShowSidebar(true);
      }, 300);
    }, 300);
  };
  
  // Handle returning to grid view
  const handleBackToGrid = () => {
    setShowDetails(false);
    setShowSidebar(false);
    setShowSelectedProject(false);
    setTimeout(() => {
      setShowGrid(true);
      setSelectedProjectId(null);
    }, 300);
  };
  
  // Handle adding a new donation
  const handleAddDonation = (amount: number, name: string) => {
    if (amount <= 0 || !selectedProjectId) return;
    
    // Use the example user or provided name
    const donorName = name || exampleUser.name;
    
    // Create a new donor
    const newDonor: Donor = {
      id: uuidv4(),
      name: donorName,
      verificationType: exampleUser.isVerified ? 'id' : 'none',
      firstTimeContributor: false,
    };
    
    setDonors(prev => [...prev, newDonor]);
    
    // Create a new donation with early bird bonus if applicable
    const newDonation = {
      ...createDonation(selectedProjectId, newDonor.id, amount),
      earlyBird: exampleUser.hasEarlyBirdBonus
    };
    
    // Add the donation
    setDonations(prev => [...prev, newDonation]);
    
    // Alert about successful donation
    setTimeout(() => {
      alert(`Thank you for your donation of €${amount} to this project! Your contribution has generated €${currentMatchingImpact.toFixed(2)} in matching funds.`);
    }, 300);
    
    // Show multiplier alert periodically
    if (Math.random() > 0.5) { // Only show 50% of the time to avoid being annoying
      setShowMultiplierAlert(true);
    }
  };
  
  // Handle updating the config
  const handleUpdateConfig = (newConfig: Partial<SimulationConfig>) => {
    setConfig(prev => ({ ...prev, ...newConfig }));
  };
  
  // Get project stats for a project
  const getProjectStats = (projectId?: string | null) => {
    if (!results || !projectId) return { contributions: 0, matching: 0, contributors: 0 };
    
    const project = results.projects.find(p => p.projectId === projectId);
    if (!project) return { contributions: 0, matching: 0, contributors: 0 };
    
    // Calculate additional stats
    const avgDonation = project.contributorCount > 0 
      ? project.contributions / project.contributorCount 
      : 0;
    
    const matchingRatio = project.contributions > 0 
      ? project.matchingAmount / project.contributions 
      : 0;
    
    return {
      contributions: project.contributions,
      matching: project.matchingAmount,
      contributors: project.contributorCount,
      avgDonation,
      matchingRatio
    };
  };
  
  // Get the selected project's donor influence data
  const getSelectedProjectDonorInfluence = () => {
    if (!results || !selectedProjectId) return [];
    
    const project = results.projects.find(p => p.projectId === selectedProjectId);
    if (!project) return [];
    
    return project.donorInfluence;
  };
  
  // Get the selected project's donations
  const getSelectedProjectDonations = () => {
    if (!selectedProjectId) return [];
    return donations.filter(d => d.projectId === selectedProjectId);
  };
  
  // Get the current selected project
  const selectedProject = selectedProjectId 
    ? projects.find(p => p.id === selectedProjectId) as ExtendedProject
    : null;
  
  // Get filtered projects (excluding the selected one) for the sidebar
  const otherProjects = projects.filter(p => p.id !== selectedProjectId);
  
  return (
    <>
      {/* Add animation styles */}
      <style>{animationStyles}</style>
      
      <Container fluid className="py-4">
        {/* Header section */}
        <Container className="mb-4">
          <h1 className="fs-2 fw-bold mb-1">Aachen Sustainability QF Round</h1>
          <p className="text-secondary">
            A quadratic funding round for sustainability initiatives in Aachen, empowering projects with broad community support.
          </p>
          
          {showMultiplierAlert && (
            <Alert variant="warning" dismissible onClose={() => setShowMultiplierAlert(false)}>
              <Alert.Heading>Multipliers Change as Community Grows</Alert.Heading>
              <p>
                As more people donate to a project, the QF matching formula dynamically adjusts. 
                Your impact is maximized when you contribute to projects with broad community support!
              </p>
            </Alert>
          )}
          
          {/* QF Method Information Cards */}
          <QFMethodInfo config={config} />
        </Container>
        
        <Container>
          {/* Initial Grid View */}
          {showGrid && (
            <div className="mb-4">
              <h3 className="mb-3">Choose a project to support</h3>
              <Row className="g-4">
                {projects.map(project => (
                  <Col key={project.id} md={6} lg={4}>
                    <QFProjectCard
                      project={{
                        id: project.id,
                        title: project.title,
                        iconText: project.iconText,
                        iconColor: project.iconColor,
                        description: project.description,
                        tags: project.tags,
                        amountRaised: 0,
                        contributors: 0,
                        targetAmount: project.targetAmount,
                        category: project.category,
                        contact: project.contact,
                        website: project.website
                      }}
                      stats={getProjectStats(project.id)}
                      isSelected={false}
                      onSelect={() => handleSelectProject(project.id)}
                    />
                  </Col>
                ))}
              </Row>
            </div>
          )}
          
          {/* Selected Project View */}
          {!showGrid && (
            <div>
              <Button 
                variant="outline-secondary" 
                className="mb-4"
                onClick={handleBackToGrid}
              >
                <FaChevronLeft className="me-2" /> Back to all projects
              </Button>
              
              <Row>
                {/* Left Column - Selected Project and Other Projects */}
                <Col md={3}>
                  {/* Selected Project Expanded Card */}
                  {showSelectedProject && selectedProject && (
                    <CSSTransition
                      in={showSelectedProject}
                      timeout={300}
                      classNames="project-selected"
                      appear
                      nodeRef={selectedProjectRef}
                    >
                      <div className="mb-4" ref={selectedProjectRef}>
                        <Card className="border-0 shadow-sm p-3">
                          <div 
                            className="p-2 text-white rounded mb-3"
                            style={{ backgroundColor: selectedProject.iconColor }}
                          >
                            <div className="d-flex align-items-center">
                              <div 
                                className="d-flex align-items-center justify-content-center rounded-circle me-2"
                                style={{ 
                                  width: '40px', 
                                  height: '40px', 
                                  backgroundColor: 'rgba(255,255,255,0.3)',
                                  color: 'white'
                                }}
                              >
                                {selectedProject.iconText}
                              </div>
                              <h5 className="mb-0">{selectedProject.title}</h5>
                            </div>
                          </div>
                          <p className="small text-muted mb-0">Selected Project</p>
                        </Card>
                      </div>
                    </CSSTransition>
                  )}
                  
                  {/* Other Projects Sidebar */}
                  {showSidebar && (
                    <CSSTransition
                      in={showSidebar}
                      timeout={300}
                      classNames="project-sidebar"
                      appear
                      nodeRef={sidebarRef}
                    >
                      <div ref={sidebarRef}>
                        <h6 className="mb-3">Other Projects</h6>
                        {otherProjects.map(project => (
                          <div key={project.id} className="mb-3">
                            <QFProjectCard
                              project={{
                                id: project.id,
                                title: project.title,
                                iconText: project.iconText,
                                iconColor: project.iconColor,
                                description: project.description,
                                tags: project.tags,
                                amountRaised: 0,
                                contributors: 0,
                                targetAmount: project.targetAmount,
                                category: project.category,
                                contact: project.contact,
                                website: project.website
                              }}
                              stats={getProjectStats(project.id)}
                              isSelected={false}
                              onSelect={() => handleSelectProject(project.id)}
                              compact={true}
                            />
                          </div>
                        ))}
                      </div>
                    </CSSTransition>
                  )}
                </Col>
                
                {/* Middle Column - Project Details */}
                <Col md={5}>
                  {showDetails && selectedProject && (
                    <CSSTransition
                      in={showDetails}
                      timeout={300}
                      classNames="project-details"
                      appear
                      nodeRef={projectDetailsRef}
                    >
                      <div ref={projectDetailsRef}>
                        <Card className="border-0 shadow-sm mb-4">
                          <Card.Body>
                            <h4 className="mb-3">{selectedProject.title}</h4>
                            <p>{selectedProject.description}</p>
                            
                            <div className="mb-3">
                              {selectedProject && selectedProject.tags?.map((tag: string, index: number) => (
                                <Badge 
                                  key={index} 
                                  bg="light" 
                                  text="dark" 
                                  className="me-2 mb-2"
                                >
                                  {tag}
                                </Badge>
                              ))}
                              
                              {selectedProject.category && (
                                <Badge 
                                  bg="info" 
                                  className="me-2 mb-2"
                                >
                                  {selectedProject.category}
                                </Badge>
                              )}
                            </div>
                            
                            {(selectedProject.website || selectedProject.contact) && (
                              <div className="border-top pt-3 mt-3">
                                {selectedProject.website && (
                                  <div className="mb-1">
                                    <strong>Website:</strong> {selectedProject.website}
                                  </div>
                                )}
                                {selectedProject.contact && (
                                  <div>
                                    <strong>Contact:</strong> {selectedProject.contact}
                                  </div>
                                )}
                              </div>
                            )}
                          </Card.Body>
                        </Card>
                        
                        <ProjectStats
                          project={{
                            id: selectedProject.id,
                            title: selectedProject.title,
                            iconText: selectedProject.iconText,
                            iconColor: selectedProject.iconColor,
                            description: selectedProject.description,
                            tags: selectedProject.tags,
                            targetAmount: selectedProject.targetAmount,
                            category: selectedProject.category,
                            contact: selectedProject.contact,
                            website: selectedProject.website
                          }}
                          stats={getProjectStats(selectedProjectId)}
                        />
                        
                        <DonationsList
                          donations={getSelectedProjectDonations()}
                          donors={donors}
                          donorInfluence={getSelectedProjectDonorInfluence()}
                        />
                      </div>
                    </CSSTransition>
                  )}
                </Col>
                
                {/* Right Column - Donation Form and Settings */}
                <Col md={4}>
                  {showDetails && selectedProject && (
                    <CSSTransition
                      in={showDetails}
                      timeout={300}
                      classNames="project-details"
                      appear
                      nodeRef={donationFormRef}
                    >
                      <div ref={donationFormRef}>
                        {/* Example User Card */}
                        <Card className="border-0 shadow-sm mb-4">
                          <Card.Header className="bg-white border-0">
                            <div className="d-flex align-items-center">
                              <div 
                                className="d-flex align-items-center justify-content-center rounded-circle me-3"
                                style={{ 
                                  width: '40px', 
                                  height: '40px', 
                                  backgroundColor: '#6366f1',
                                  color: 'white'
                                }}
                              >
                                <FaUser />
                              </div>
                              <div>
                                <h5 className="mb-0">{exampleUser.name}</h5>
                                <small className="text-muted">Your account</small>
                              </div>
                            </div>
                          </Card.Header>
                          <Card.Body>
                            <h6 className="mb-3">Your Donor Status</h6>
                            <div className="d-flex flex-column gap-2">
                              {exampleUser.isVerified && (
                                <div className="d-flex align-items-center">
                                  <FaCheckCircle className="text-success me-2" />
                                  <div>
                                    <div className="fw-bold">Verified Donor</div>
                                    <small className="text-muted">+20% matching bonus</small>
                                  </div>
                                </div>
                              )}
                              {exampleUser.hasEarlyBirdBonus && (
                                <div className="d-flex align-items-center">
                                  <FaClock className="text-primary me-2" />
                                  <div>
                                    <div className="fw-bold">Early Bird</div>
                                    <small className="text-muted">+15% matching bonus</small>
                                  </div>
                                </div>
                              )}
                              {exampleUser.hasFrequentDonorBonus && (
                                <div className="d-flex align-items-center">
                                  <FaStar className="text-warning me-2" />
                                  <div>
                                    <div className="fw-bold">Frequent Donor</div>
                                    <small className="text-muted">+10% matching bonus</small>
                                  </div>
                                </div>
                              )}
                              {exampleUser.hasLocalBonus && (
                                <div className="d-flex align-items-center">
                                  <FaCheckCircle className="text-info me-2" />
                                  <div>
                                    <div className="fw-bold">Aachen Resident</div>
                                    <small className="text-muted">+5% matching bonus</small>
                                  </div>
                                </div>
                              )}
                            </div>
                          </Card.Body>
                        </Card>
                        
                        <DonationForm
                          project={{
                            id: selectedProject.id,
                            title: selectedProject.title,
                            iconText: selectedProject.iconText,
                            iconColor: selectedProject.iconColor,
                            description: selectedProject.description,
                            tags: selectedProject.tags,
                            targetAmount: selectedProject.targetAmount,
                            category: selectedProject.category,
                            contact: selectedProject.contact,
                            website: selectedProject.website
                          }}
                          onDonate={handleAddDonation}
                          matchingImpact={currentMatchingImpact}
                          isCalculating={isCalculatingImpact}
                          onAmountChange={setDonationAmount}
                        />
                        
                        <RoundSettings
                          config={config}
                          onUpdateConfig={handleUpdateConfig}
                        />
                      </div>
                    </CSSTransition>
                  )}
                </Col>
              </Row>
            </div>
          )}
        </Container>
      </Container>
    </>
  );
};

export default QFRoundPage; 