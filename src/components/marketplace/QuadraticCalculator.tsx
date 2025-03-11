// src/components/marketplace/QuadraticCalculator.tsx
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Table, Tabs, Tab, Card, ProgressBar, Badge } from 'react-bootstrap';
import { FaInfoCircle, FaChartLine, FaCoins } from 'react-icons/fa';

// Import mockProjects directly since it's likely not exported by name
// We'll need to modify the ProjectsGrid.tsx file to export this
interface Project {
  id: string;
  title: string;
  iconText: string;
  iconColor: string;
  description: string;
  tags: string[];
  amountRaised: number;
  contributors: number;
  targetAmount: number;
  category: string;
  contact: string;
  website: string;
}

// Temporarily define mockProjects here until we can properly export it from ProjectsGrid
const mockProjects: Project[] = [
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
  }
];

interface CalculationResult {
  contribution: number;
  matching: number;
  total: number;
}

interface ProjectContribution {
  id: string;
  projectTitle: string;
  contributionAmount: number;
  category: string;
  contributors: number;
}

interface ProjectFundingResult {
  id: string;
  title: string;
  category: string;
  iconText: string;
  iconColor: string;
  contributionAmount: number;
  contributorCount: number;
  matchingAmount: number;
  totalFunding: number;
  sumOfSquares: number;
  targetAmount: number;
  percentFunded: number;
}

const QuadraticCalculator: React.FC = () => {
  const [matchingPool, setMatchingPool] = useState<number>(25000);
  const [activeTab, setActiveTab] = useState<string>('simulation');
  const [userContributions, setUserContributions] = useState<ProjectContribution[]>([]);
  const [fundingResults, setFundingResults] = useState<ProjectFundingResult[]>([]);
  const [selectedExample, setSelectedExample] = useState<string>('realistic');
  
  // Initialize with some example contributions based on the mock projects
  useEffect(() => {
    loadExampleScenario(selectedExample);
  }, [selectedExample]);
  
  const loadExampleScenario = (scenario: string) => {
    let contributions: ProjectContribution[] = [];
    
    if (scenario === 'realistic') {
      // Create realistic contributions based on project popularity
      contributions = mockProjects.map((project: Project) => ({
        id: project.id,
        projectTitle: project.title,
        contributionAmount: Math.floor(Math.random() * 50) + 10, // Random between 10-60
        category: project.category,
        contributors: project.contributors
      }));
    } else if (scenario === 'whales') {
      // Few projects with very large contributions
      contributions = mockProjects.map((project: Project) => ({
        id: project.id,
        projectTitle: project.title,
        contributionAmount: project.id.startsWith('g') ? 500 : (Math.floor(Math.random() * 20) + 5), // Large donations to some projects
        category: project.category,
        contributors: project.id.startsWith('g') ? 3 : Math.floor(project.contributors / 2)
      }));
    } else if (scenario === 'grassroots') {
      // Many small contributions spread widely
      contributions = mockProjects.map((project: Project) => ({
        id: project.id,
        projectTitle: project.title,
        contributionAmount: Math.floor(Math.random() * 15) + 5, // Small donations between 5-20
        category: project.category,
        contributors: project.contributors * 2 // Doubled contributor count
      }));
    } else if (scenario === 'balanced') {
      // Balanced funding across all projects
      contributions = mockProjects.map((project: Project) => ({
        id: project.id,
        projectTitle: project.title,
        contributionAmount: 40, // Equal contributions
        category: project.category,
        contributors: 50 // Equal contributors
      }));
    }
    
    setUserContributions(contributions);
    calculateFunding(contributions, matchingPool);
    setSelectedExample(scenario);
  };
  
  const handleContributionChange = (id: string, amount: number) => {
    const updatedContributions = userContributions.map(contrib => 
      contrib.id === id ? { ...contrib, contributionAmount: amount } : contrib
    );
    
    setUserContributions(updatedContributions);
    calculateFunding(updatedContributions, matchingPool);
  };
  
  const handleContributorChange = (id: string, count: number) => {
    const updatedContributions = userContributions.map(contrib => 
      contrib.id === id ? { ...contrib, contributors: count } : contrib
    );
    
    setUserContributions(updatedContributions);
    calculateFunding(updatedContributions, matchingPool);
  };
  
  const handleMatchingPoolChange = (amount: number) => {
    setMatchingPool(amount);
    calculateFunding(userContributions, amount);
  };
  
  const calculateFunding = (contributions: ProjectContribution[], poolAmount: number) => {
    // Calculate sum of square roots of contributions for each project
    const projectSumOfSquares = contributions.map(contrib => {
      const userContributionTotal = contrib.contributionAmount * contrib.contributors;
      return {
        id: contrib.id,
        sumOfSquares: Math.sqrt(userContributionTotal) * Math.sqrt(contrib.contributors)
      };
    });
    
    // Calculate total sum of square roots for all projects
    const totalSumOfSquares = projectSumOfSquares.reduce((sum, project) => sum + project.sumOfSquares, 0);
    
    // Calculate matching amount for each project using quadratic funding formula
    const results = contributions.map(contrib => {
      const matchProject = mockProjects.find((p: Project) => p.id === contrib.id)!;
      const projectSqRoot = projectSumOfSquares.find(p => p.id === contrib.id)!.sumOfSquares;
      const matchingAmount = (projectSqRoot / totalSumOfSquares) * poolAmount;
      const totalFunding = contrib.contributionAmount * contrib.contributors + matchingAmount;
      const percentFunded = (totalFunding / matchProject.targetAmount) * 100;
      
      return {
        id: contrib.id,
        title: matchProject.title,
        category: matchProject.category,
        iconText: matchProject.iconText,
        iconColor: matchProject.iconColor,
        contributionAmount: contrib.contributionAmount * contrib.contributors,
        contributorCount: contrib.contributors,
        matchingAmount,
        totalFunding,
        sumOfSquares: projectSqRoot,
        targetAmount: matchProject.targetAmount,
        percentFunded: Math.min(percentFunded, 100)
      };
    });
    
    setFundingResults(results);
  };

  return (
    <section className="py-5 bg-light">
      <Container>
        <div className="bg-white rounded-3 shadow-sm p-4 mx-auto">
          <div className="text-center mb-4">
            <h2 className="fw-bold mb-2">Quadratic Funding Simulator</h2>
            <p className="text-secondary">
              Explore how different contribution patterns affect matching funds distribution
            </p>
          </div>
          
          <Tabs
            activeKey={activeTab}
            onSelect={(k) => setActiveTab(k || 'simulation')}
            className="mb-4"
          >
            <Tab eventKey="simulation" title="Funding Simulation">
              <Row className="mb-4">
                <Col lg={12}>
                  <Card className="mb-4">
                    <Card.Body>
                      <div className="d-flex justify-content-between align-items-center mb-3">
                        <div>
                          <h4 className="mb-0">Simulation Parameters</h4>
                          <p className="text-secondary mb-0 small">Configure the funding round parameters</p>
                        </div>
                        <div className="d-flex gap-2">
                          <Button 
                            size="sm" 
                            variant={selectedExample === 'realistic' ? 'primary' : 'outline-primary'}
                            onClick={() => loadExampleScenario('realistic')}
                          >
                            Realistic
                          </Button>
                          <Button 
                            size="sm" 
                            variant={selectedExample === 'whales' ? 'primary' : 'outline-primary'}
                            onClick={() => loadExampleScenario('whales')}
                          >
                            Whale Donors
                          </Button>
                          <Button 
                            size="sm" 
                            variant={selectedExample === 'grassroots' ? 'primary' : 'outline-primary'}
                            onClick={() => loadExampleScenario('grassroots')}
                          >
                            Grassroots
                          </Button>
                          <Button 
                            size="sm" 
                            variant={selectedExample === 'balanced' ? 'primary' : 'outline-primary'}
                            onClick={() => loadExampleScenario('balanced')}
                          >
                            Balanced
                          </Button>
                        </div>
                      </div>
                      
                      <Form.Group className="mb-3">
                        <Form.Label className="fw-bold">Matching Pool Size (€)</Form.Label>
                        <Form.Control
                          type="number"
                          value={matchingPool}
                          min={1000}
                          step={1000}
                          onChange={(e) => handleMatchingPoolChange(parseFloat(e.target.value) || 0)}
                        />
                        <Form.Text className="text-muted">
                          Total matching funds available for distribution
                        </Form.Text>
                      </Form.Group>
                    </Card.Body>
                  </Card>
                
                  <Card>
                    <Card.Body>
                      <h4 className="mb-3">Project Funding Results</h4>
                      <div className="table-responsive">
                        <Table striped hover className="align-middle">
                          <thead>
                            <tr>
                              <th>Project</th>
                              <th>Category</th>
                              <th>Contributors</th>
                              <th>Contributions (€)</th>
                              <th>Matching (€)</th>
                              <th>Total (€)</th>
                              <th>Funded</th>
                            </tr>
                          </thead>
                          <tbody>
                            {fundingResults.map((result) => (
                              <tr key={result.id}>
                                <td>
                                  <div className="d-flex align-items-center">
                                    <div 
                                      className="rounded-circle d-flex align-items-center justify-content-center me-2" 
                                      style={{ 
                                        width: '36px', 
                                        height: '36px', 
                                        backgroundColor: result.iconColor,
                                        color: 'white'
                                      }}
                                    >
                                      {result.iconText}
                                    </div>
                                    <div>{result.title}</div>
                                  </div>
                                </td>
                                <td>
                                  <Badge bg={result.category === 'city-run' ? 'info' : 'success'}>
                                    {result.category === 'city-run' ? 'City-run' : 'Student-run'}
                                  </Badge>
                                </td>
                                <td>
                                  <Form.Control
                                    type="number"
                                    size="sm"
                                    value={userContributions.find(c => c.id === result.id)?.contributors || 0}
                                    min={1}
                                    onChange={(e) => handleContributorChange(result.id, parseInt(e.target.value) || 1)}
                                    style={{ width: '80px' }}
                                  />
                                </td>
                                <td>
                                  <div className="d-flex align-items-center">
                                    <Form.Control
                                      type="number"
                                      size="sm"
                                      value={userContributions.find(c => c.id === result.id)?.contributionAmount || 0}
                                      min={0}
                                      onChange={(e) => handleContributionChange(result.id, parseFloat(e.target.value) || 0)}
                                      style={{ width: '80px' }}
                                    />
                                    <span className="ms-2">
                                      <strong>×</strong> {result.contributorCount} = <strong>{result.contributionAmount.toFixed(0)}</strong>
                                    </span>
                                  </div>
                                </td>
                                <td className="text-primary fw-bold">{result.matchingAmount.toFixed(2)}</td>
                                <td className="fw-bold">{result.totalFunding.toFixed(2)}</td>
                                <td style={{ width: '180px' }}>
                                  <div className="d-flex align-items-center flex-column">
                                    <ProgressBar 
                                      style={{ width: '100%', height: '8px' }}
                                      variant={result.percentFunded >= 100 ? 'success' : 'primary'}
                                      now={result.percentFunded} 
                                    />
                                    <div className="small mt-1">
                                      {result.percentFunded.toFixed(0)}% of €{result.targetAmount}
                                    </div>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </Table>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </Tab>
            
            <Tab eventKey="explanation" title="How It Works">
              <Row>
                <Col lg={12}>
                  <Card>
                    <Card.Body>
                      <h3 className="mb-3">Understanding Quadratic Funding</h3>
                      <p>
                        Quadratic Funding is a mathematical funding mechanism designed to optimize the allocation of matching funds by prioritizing projects with broader community support over those with a few large contributors.
                      </p>
                      
                      <h5 className="mt-4">The Formula</h5>
                      <p>
                        The basic formula for determining matching funds in quadratic funding is:
                      </p>
                      <div className="bg-light p-3 rounded mb-3">
                        <code>
                          Matching = (√(Contribution₁) + √(Contribution₂) + ... + √(Contributionₙ))² × (Matching Pool / Sum of All Projects' Squared Sums)
                        </code>
                      </div>
                      
                      <h5 className="mt-4">Why It Works</h5>
                      <p>
                        Quadratic funding favors projects with many smaller contributions over those with a few large ones:
                      </p>
                      <ul>
                        <li>
                          <strong>Example:</strong> 100 people each giving €10 (€1,000 total) would receive more matching funds than 1 person giving €1,000.
                        </li>
                        <li>
                          <strong>Mathematically:</strong> √10 × 100 = 1,000 vs. √1,000 = 31.6
                        </li>
                        <li>
                          This creates stronger incentives for projects to build broad community support rather than seeking a few wealthy donors.
                        </li>
                      </ul>
                      
                      <h5 className="mt-4">Using This Simulator</h5>
                      <p>
                        This simulator lets you explore different funding scenarios:
                      </p>
                      <ul>
                        <li><strong>Realistic:</strong> Based on actual project data and typical contribution patterns</li>
                        <li><strong>Whale Donors:</strong> Simulates a few projects receiving large donations</li>
                        <li><strong>Grassroots:</strong> Models many small contributors spread across projects</li>
                        <li><strong>Balanced:</strong> Equal contributions across all projects</li>
                      </ul>
                      <p>
                        Try changing the contribution amounts, number of contributors, and matching pool size to see how the funding distribution changes!
                      </p>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </Tab>
          </Tabs>
        </div>
      </Container>
    </section>
  );
};

export default QuadraticCalculator; 