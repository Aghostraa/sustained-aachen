import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Card, Table, Button, Tab, Tabs, ProgressBar, Badge } from 'react-bootstrap';
import { FaCalculator, FaChartBar, FaInfoCircle, FaCoins } from 'react-icons/fa';

// Import Project interface or use the existing one
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

// Temporarily use the same mock projects from QuadraticCalculator
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

interface ProjectContribution {
  id: string;
  projectTitle: string;
  contributionAmount: number;
  category: string;
  contributors: number;
}

interface FundingMethodResult {
  id: string;
  name: string;
  description: string;
  formula: string;
  results: ProjectFundingResult[];
  totalMatchingDistributed: number;
  color: string;
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
  targetAmount: number;
  percentFunded: number;
}

const fundingMethods = [
  {
    id: 'private',
    name: 'Private Contributions',
    description: 'Direct contributions with no matching.',
    formula: 'F = Σc_i',
    color: '#dc3545' // Bootstrap danger
  },
  {
    id: 'linear',
    name: 'Linear Matching',
    description: 'Each contribution matched at a fixed ratio.',
    formula: 'F = Σc_i + α×Σc_i',
    color: '#fd7e14' // Bootstrap orange
  },
  {
    id: 'onePersonOneVote',
    name: 'One Person, One Vote',
    description: 'Project with most supporters gets the most funding.',
    formula: 'F ∝ number of supporters',
    color: '#ffc107' // Bootstrap warning
  },
  {
    id: 'quadratic',
    name: 'Quadratic Funding',
    description: 'Optimized for funding public goods with broad support.',
    formula: 'F = (Σ√c_i)²',
    color: '#0d6efd' // Bootstrap primary
  },
  {
    id: 'capitalConstrainedQF',
    name: 'Capital-constrained QF',
    description: 'Practical implementation of QF with limited funds.',
    formula: 'F = α(Σ√c_i)² + (1-α)Σc_i',
    color: '#0dcaf0' // Bootstrap info
  }
];

const QuadraticFundingSimulator: React.FC = () => {
  const [matchingPool, setMatchingPool] = useState<number>(20000);
  const [selectedScenario, setSelectedScenario] = useState<string>('realistic');
  const [userContributions, setUserContributions] = useState<ProjectContribution[]>([]);
  const [fundingResults, setFundingResults] = useState<FundingMethodResult[]>([]);
  const [qfAlpha, setQfAlpha] = useState<number>(0.5); // For capital-constrained QF
  
  // Initialize with some default contributions
  useEffect(() => {
    loadExampleScenario(selectedScenario);
  }, [selectedScenario]);
  
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
        contributionAmount: project.id.startsWith('g') ? 500 : (Math.floor(Math.random() * 20) + 5),
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
    calculateAllFundingMethods(contributions, matchingPool, qfAlpha);
    setSelectedScenario(scenario);
  };
  
  const handleContributionChange = (id: string, amount: number) => {
    const updatedContributions = userContributions.map(contrib => 
      contrib.id === id ? { ...contrib, contributionAmount: amount } : contrib
    );
    
    setUserContributions(updatedContributions);
    calculateAllFundingMethods(updatedContributions, matchingPool, qfAlpha);
  };
  
  const handleContributorChange = (id: string, count: number) => {
    const updatedContributions = userContributions.map(contrib => 
      contrib.id === id ? { ...contrib, contributors: count } : contrib
    );
    
    setUserContributions(updatedContributions);
    calculateAllFundingMethods(updatedContributions, matchingPool, qfAlpha);
  };
  
  const handleMatchingPoolChange = (amount: number) => {
    setMatchingPool(amount);
    calculateAllFundingMethods(userContributions, amount, qfAlpha);
  };
  
  const handleAlphaChange = (value: number) => {
    setQfAlpha(value);
    calculateAllFundingMethods(userContributions, matchingPool, value);
  };
  
  // Calculate results for all funding methods
  const calculateAllFundingMethods = (contributions: ProjectContribution[], poolAmount: number, alpha: number) => {
    const results: FundingMethodResult[] = [];
    
    // 1. Private Contributions (no matching)
    const privateResults = calculatePrivateContributions(contributions);
    results.push({
      id: 'private',
      name: 'Private Contributions',
      description: 'Direct contributions with no matching.',
      formula: 'F = Σc_i',
      results: privateResults,
      totalMatchingDistributed: 0,
      color: '#dc3545'
    });
    
    // 2. Linear Matching (1:1)
    const linearResults = calculateLinearMatching(contributions, poolAmount);
    results.push({
      id: 'linear',
      name: 'Linear Matching (1:1)',
      description: 'Each contribution matched at a fixed ratio.',
      formula: 'F = Σc_i + α×Σc_i',
      results: linearResults.results,
      totalMatchingDistributed: linearResults.totalMatchingDistributed,
      color: '#fd7e14'
    });
    
    // 3. One Person One Vote
    const onePersonOneVoteResults = calculateOnePersonOneVote(contributions, poolAmount);
    results.push({
      id: 'onePersonOneVote',
      name: 'One Person, One Vote',
      description: 'Project with most supporters gets the most funding.',
      formula: 'F ∝ number of supporters',
      results: onePersonOneVoteResults.results,
      totalMatchingDistributed: onePersonOneVoteResults.totalMatchingDistributed,
      color: '#ffc107'
    });
    
    // 4. Quadratic Funding
    const quadraticResults = calculateQuadraticFunding(contributions, poolAmount);
    results.push({
      id: 'quadratic',
      name: 'Quadratic Funding',
      description: 'Optimized for funding public goods with broad support.',
      formula: 'F = (Σ√c_i)²',
      results: quadraticResults.results,
      totalMatchingDistributed: quadraticResults.totalMatchingDistributed,
      color: '#0d6efd'
    });
    
    // 5. Capital-constrained QF
    const constrainedQFResults = calculateCapitalConstrainedQF(contributions, poolAmount, alpha);
    results.push({
      id: 'capitalConstrainedQF',
      name: `Capital-constrained QF (α=${alpha.toFixed(2)})`,
      description: 'Practical implementation of QF with limited funds.',
      formula: `F = ${alpha.toFixed(2)}(Σ√c_i)² + ${(1-alpha).toFixed(2)}Σc_i`,
      results: constrainedQFResults.results,
      totalMatchingDistributed: constrainedQFResults.totalMatchingDistributed,
      color: '#0dcaf0'
    });
    
    setFundingResults(results);
  };
  
  // Helper functions for each funding method
  const calculatePrivateContributions = (contributions: ProjectContribution[]): ProjectFundingResult[] => {
    return contributions.map(contrib => {
      const project = mockProjects.find(p => p.id === contrib.id)!;
      const totalContributions = contrib.contributionAmount * contrib.contributors;
      const percentFunded = (totalContributions / project.targetAmount) * 100;
      
      return {
        id: contrib.id,
        title: project.title,
        category: project.category,
        iconText: project.iconText,
        iconColor: project.iconColor,
        contributionAmount: totalContributions,
        contributorCount: contrib.contributors,
        matchingAmount: 0, // No matching in private contributions
        totalFunding: totalContributions,
        targetAmount: project.targetAmount,
        percentFunded: Math.min(percentFunded, 100)
      };
    });
  };
  
  const calculateLinearMatching = (contributions: ProjectContribution[], poolAmount: number) => {
    // Calculate total contributions
    const totalContributions = contributions.reduce((sum, contrib) => 
      sum + (contrib.contributionAmount * contrib.contributors), 0);
    
    // Calculate matching ratio based on available pool
    const matchingRatio = Math.min(1, poolAmount / totalContributions); // Cap at 1:1 matching
    
    const results = contributions.map(contrib => {
      const project = mockProjects.find(p => p.id === contrib.id)!;
      const directContributions = contrib.contributionAmount * contrib.contributors;
      const matchingAmount = directContributions * matchingRatio;
      const totalFunding = directContributions + matchingAmount;
      const percentFunded = (totalFunding / project.targetAmount) * 100;
      
      return {
        id: contrib.id,
        title: project.title,
        category: project.category,
        iconText: project.iconText,
        iconColor: project.iconColor,
        contributionAmount: directContributions,
        contributorCount: contrib.contributors,
        matchingAmount: matchingAmount,
        totalFunding: totalFunding,
        targetAmount: project.targetAmount,
        percentFunded: Math.min(percentFunded, 100)
      };
    });
    
    const totalMatchingDistributed = results.reduce((sum, result) => sum + result.matchingAmount, 0);
    
    return {
      results,
      totalMatchingDistributed
    };
  };
  
  const calculateOnePersonOneVote = (contributions: ProjectContribution[], poolAmount: number) => {
    // Calculate total number of contributors
    const totalContributors = contributions.reduce((sum, contrib) => sum + contrib.contributors, 0);
    
    const results = contributions.map(contrib => {
      const project = mockProjects.find(p => p.id === contrib.id)!;
      const directContributions = contrib.contributionAmount * contrib.contributors;
      
      // Matching is proportional to number of contributors
      const contributorShare = contrib.contributors / totalContributors;
      const matchingAmount = poolAmount * contributorShare;
      
      const totalFunding = directContributions + matchingAmount;
      const percentFunded = (totalFunding / project.targetAmount) * 100;
      
      return {
        id: contrib.id,
        title: project.title,
        category: project.category,
        iconText: project.iconText,
        iconColor: project.iconColor,
        contributionAmount: directContributions,
        contributorCount: contrib.contributors,
        matchingAmount: matchingAmount,
        totalFunding: totalFunding,
        targetAmount: project.targetAmount,
        percentFunded: Math.min(percentFunded, 100)
      };
    });
    
    const totalMatchingDistributed = results.reduce((sum, result) => sum + result.matchingAmount, 0);
    
    return {
      results,
      totalMatchingDistributed
    };
  };
  
  const calculateQuadraticFunding = (contributions: ProjectContribution[], poolAmount: number) => {
    // Calculate sum of square roots of contributions for each project
    const projectSumOfSquares = contributions.map(contrib => {
      const userContribution = contrib.contributionAmount;
      const squareRootSum = Math.sqrt(userContribution) * Math.sqrt(contrib.contributors);
      return {
        id: contrib.id,
        sumOfSquares: squareRootSum
      };
    });
    
    // Calculate total sum of squares for all projects to determine the matching ratio
    const totalSumOfSquares = projectSumOfSquares.reduce((sum, project) => 
      sum + Math.pow(project.sumOfSquares, 2), 0);
    
    // If totalSumOfSquares is 0, avoid division by zero
    const matchingRatio = totalSumOfSquares > 0 ? poolAmount / totalSumOfSquares : 0;
    
    const results = contributions.map(contrib => {
      const project = mockProjects.find(p => p.id === contrib.id)!;
      const directContributions = contrib.contributionAmount * contrib.contributors;
      
      // Find this project's sum of squares value
      const projectSquareRoot = projectSumOfSquares.find(p => p.id === contrib.id)!.sumOfSquares;
      
      // Calculate matching amount using quadratic funding formula
      const matchingAmount = Math.pow(projectSquareRoot, 2) * matchingRatio;
      
      const totalFunding = directContributions + matchingAmount;
      const percentFunded = (totalFunding / project.targetAmount) * 100;
      
      return {
        id: contrib.id,
        title: project.title,
        category: project.category,
        iconText: project.iconText,
        iconColor: project.iconColor,
        contributionAmount: directContributions,
        contributorCount: contrib.contributors,
        matchingAmount: matchingAmount,
        totalFunding: totalFunding,
        targetAmount: project.targetAmount,
        percentFunded: Math.min(percentFunded, 100)
      };
    });
    
    const totalMatchingDistributed = results.reduce((sum, result) => sum + result.matchingAmount, 0);
    
    return {
      results,
      totalMatchingDistributed
    };
  };
  
  const calculateCapitalConstrainedQF = (
    contributions: ProjectContribution[], 
    poolAmount: number, 
    alpha: number
  ) => {
    // QF component
    const quadraticResults = calculateQuadraticFunding(
      contributions, 
      poolAmount * alpha
    );
    
    // Linear component
    const linearResults = calculateLinearMatching(
      contributions, 
      poolAmount * (1 - alpha)
    );
    
    // Combine results
    const results = contributions.map(contrib => {
      const project = mockProjects.find(p => p.id === contrib.id)!;
      const directContributions = contrib.contributionAmount * contrib.contributors;
      
      // Find matching amounts from both mechanisms
      const qfMatchingAmount = quadraticResults.results.find(r => r.id === contrib.id)!.matchingAmount;
      const linearMatchingAmount = linearResults.results.find(r => r.id === contrib.id)!.matchingAmount;
      
      // Combine the matching amounts
      const totalMatchingAmount = qfMatchingAmount + linearMatchingAmount;
      const totalFunding = directContributions + totalMatchingAmount;
      const percentFunded = (totalFunding / project.targetAmount) * 100;
      
      return {
        id: contrib.id,
        title: project.title,
        category: project.category,
        iconText: project.iconText,
        iconColor: project.iconColor,
        contributionAmount: directContributions,
        contributorCount: contrib.contributors,
        matchingAmount: totalMatchingAmount,
        totalFunding: totalFunding,
        targetAmount: project.targetAmount,
        percentFunded: Math.min(percentFunded, 100)
      };
    });
    
    const totalMatchingDistributed = results.reduce((sum, result) => sum + result.matchingAmount, 0);
    
    return {
      results,
      totalMatchingDistributed
    };
  };

  return (
    <Container className="py-5 bg-light">
      <Card className="shadow-sm mb-4">
        <Card.Body>
          <h2 className="fw-bold mb-2">Funding Mechanisms Simulator</h2>
          <p className="text-secondary mb-4">
            Compare how different funding mechanisms distribute the same matching pool
          </p>
          
          <Row className="mb-4">
            <Col md={4}>
              <Card>
                <Card.Body>
                  <h5 className="fw-bold mb-3">Simulation Parameters</h5>
                  
                  <Form.Group className="mb-3">
                    <Form.Label>Preset Scenarios</Form.Label>
                    <div className="d-flex flex-wrap gap-2">
                      <Button 
                        size="sm" 
                        variant={selectedScenario === 'realistic' ? 'primary' : 'outline-primary'}
                        onClick={() => loadExampleScenario('realistic')}
                      >
                        Realistic
                      </Button>
                      <Button 
                        size="sm" 
                        variant={selectedScenario === 'whales' ? 'primary' : 'outline-primary'}
                        onClick={() => loadExampleScenario('whales')}
                      >
                        Whale Donors
                      </Button>
                      <Button 
                        size="sm" 
                        variant={selectedScenario === 'grassroots' ? 'primary' : 'outline-primary'}
                        onClick={() => loadExampleScenario('grassroots')}
                      >
                        Grassroots
                      </Button>
                      <Button 
                        size="sm" 
                        variant={selectedScenario === 'balanced' ? 'primary' : 'outline-primary'}
                        onClick={() => loadExampleScenario('balanced')}
                      >
                        Balanced
                      </Button>
                    </div>
                  </Form.Group>
                  
                  <Form.Group className="mb-3">
                    <Form.Label>Matching Pool Size (€)</Form.Label>
                    <Form.Control
                      type="number"
                      value={matchingPool}
                      min={1000}
                      step={1000}
                      onChange={(e) => handleMatchingPoolChange(Number(e.target.value) || 0)}
                    />
                    <Form.Text className="text-muted">
                      Total amount available for matching
                    </Form.Text>
                  </Form.Group>
                  
                  <Form.Group className="mb-3">
                    <Form.Label>Capital-constrained QF Alpha (α): {qfAlpha.toFixed(2)}</Form.Label>
                    <Form.Range
                      min={0}
                      max={1}
                      step={0.01}
                      value={qfAlpha}
                      onChange={(e) => handleAlphaChange(Number(e.target.value))}
                    />
                    <div className="d-flex justify-content-between">
                      <Form.Text className="text-muted">Private</Form.Text>
                      <Form.Text className="text-muted">Balanced</Form.Text>
                      <Form.Text className="text-muted">Full QF</Form.Text>
                    </div>
                  </Form.Group>
                </Card.Body>
              </Card>
            </Col>
            
            <Col md={8}>
              <Card>
                <Card.Body>
                  <h5 className="fw-bold mb-3">Project Contributions</h5>
                  <div className="table-responsive">
                    <Table striped hover className="align-middle">
                      <thead>
                        <tr>
                          <th>Project</th>
                          <th>Category</th>
                          <th>Contributors</th>
                          <th>Contribution (€)</th>
                          <th>Total (€)</th>
                        </tr>
                      </thead>
                      <tbody>
                        {userContributions.map((contrib) => {
                          const project = mockProjects.find(p => p.id === contrib.id)!;
                          return (
                            <tr key={contrib.id}>
                              <td>
                                <div className="d-flex align-items-center">
                                  <div 
                                    className="rounded-circle d-flex align-items-center justify-content-center me-2" 
                                    style={{ 
                                      width: '36px', 
                                      height: '36px', 
                                      backgroundColor: project.iconColor,
                                      color: 'white'
                                    }}
                                  >
                                    {project.iconText}
                                  </div>
                                  <div>{contrib.projectTitle}</div>
                                </div>
                              </td>
                              <td>
                                <Badge bg={contrib.category === 'city-run' ? 'info' : 'success'}>
                                  {contrib.category === 'city-run' ? 'City-run' : 'Student-run'}
                                </Badge>
                              </td>
                              <td>
                                <Form.Control
                                  type="number"
                                  size="sm"
                                  value={contrib.contributors}
                                  min={1}
                                  onChange={(e) => handleContributorChange(contrib.id, parseInt(e.target.value) || 1)}
                                  style={{ width: '80px' }}
                                />
                              </td>
                              <td>
                                <Form.Control
                                  type="number"
                                  size="sm"
                                  value={contrib.contributionAmount}
                                  min={0}
                                  onChange={(e) => handleContributionChange(contrib.id, parseFloat(e.target.value) || 0)}
                                  style={{ width: '80px' }}
                                />
                              </td>
                              <td className="fw-bold">
                                {(contrib.contributionAmount * contrib.contributors).toFixed(0)}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </Table>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          
          <h4 className="mb-3">Funding Mechanism Comparison</h4>
          <Tabs defaultActiveKey="chart" className="mb-4">
            <Tab eventKey="chart" title="Comparison Chart">
              <Card className="bg-light mb-4">
                <Card.Body>
                  <div className="d-flex flex-wrap justify-content-between mb-3">
                    {fundingResults.map((method) => (
                      <div key={method.id} className="mb-2" style={{ minWidth: '200px' }}>
                        <h6 style={{ color: method.color }}>{method.name}</h6>
                        <div className="small text-muted">{method.formula}</div>
                        <div className="mt-1">
                          <strong>Matching distributed:</strong> €{method.totalMatchingDistributed.toFixed(0)}
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="table-responsive">
                    <Table bordered className="bg-white">
                      <thead>
                        <tr>
                          <th>Project</th>
                          {fundingResults.map((method) => (
                            <th key={method.id} style={{ backgroundColor: method.color + '10' }}>
                              {method.name}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {mockProjects.map((project) => (
                          <tr key={project.id}>
                            <td>
                              <div className="d-flex align-items-center">
                                <div 
                                  className="rounded-circle d-flex align-items-center justify-content-center me-2" 
                                  style={{ 
                                    width: '36px', 
                                    height: '36px', 
                                    backgroundColor: project.iconColor,
                                    color: 'white'
                                  }}
                                >
                                  {project.iconText}
                                </div>
                                <div>{project.title}</div>
                              </div>
                            </td>
                            {fundingResults.map((method) => {
                              const result = method.results.find(r => r.id === project.id);
                              if (!result) return <td key={method.id}>N/A</td>;
                              
                              return (
                                <td key={method.id}>
                                  <div className="fw-bold">€{result.totalFunding.toFixed(0)}</div>
                                  <div className="d-flex justify-content-between small text-muted">
                                    <span>Base: €{result.contributionAmount.toFixed(0)}</span>
                                    <span>+€{result.matchingAmount.toFixed(0)}</span>
                                  </div>
                                  <ProgressBar 
                                    className="mt-1"
                                    style={{ height: '6px' }}
                                    variant={result.percentFunded >= 100 ? 'success' : 'primary'}
                                    now={result.percentFunded} 
                                  />
                                </td>
                              );
                            })}
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </div>
                </Card.Body>
              </Card>
            </Tab>
            
            <Tab eventKey="details" title="Detailed Results">
              {fundingResults.map((method) => (
                <Card key={method.id} className="mb-3" style={{ borderLeft: `4px solid ${method.color}` }}>
                  <Card.Body>
                    <h5 style={{ color: method.color }}>{method.name}</h5>
                    <p className="small text-muted">{method.description}</p>
                    <p className="text-primary fw-bold">Formula: {method.formula}</p>
                    
                    <div className="d-flex justify-content-between mb-3">
                      <div>
                        <strong>Total Contributions:</strong> €
                        {method.results.reduce((sum, r) => sum + r.contributionAmount, 0).toFixed(0)}
                      </div>
                      <div>
                        <strong>Total Matching:</strong> €{method.totalMatchingDistributed.toFixed(0)}
                      </div>
                      <div>
                        <strong>Total Funding:</strong> €
                        {method.results.reduce((sum, r) => sum + r.totalFunding, 0).toFixed(0)}
                      </div>
                    </div>
                    
                    <div className="table-responsive">
                      <Table striped hover size="sm">
                        <thead>
                          <tr>
                            <th>Project</th>
                            <th>Contributors</th>
                            <th>Base Amount</th>
                            <th>Matching</th>
                            <th>Total</th>
                            <th>% Funded</th>
                          </tr>
                        </thead>
                        <tbody>
                          {method.results.map((result) => (
                            <tr key={result.id}>
                              <td>{result.title}</td>
                              <td>{result.contributorCount}</td>
                              <td>€{result.contributionAmount.toFixed(0)}</td>
                              <td>€{result.matchingAmount.toFixed(2)}</td>
                              <td className="fw-bold">€{result.totalFunding.toFixed(2)}</td>
                              <td>
                                <div className="d-flex align-items-center">
                                  <ProgressBar 
                                    style={{ width: '100px', height: '6px' }}
                                    variant={result.percentFunded >= 100 ? 'success' : 'primary'}
                                    now={result.percentFunded} 
                                    className="me-2"
                                  />
                                  <span>{result.percentFunded.toFixed(0)}%</span>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    </div>
                  </Card.Body>
                </Card>
              ))}
            </Tab>
          </Tabs>
          
          <Card className="bg-light">
            <Card.Body>
              <h5>Key Insights</h5>
              <p>
                This simulator demonstrates how different funding mechanisms distribute the same matching pool,
                highlighting the mathematical advantages of quadratic funding for supporting public goods with broad community support.
              </p>
              <ul>
                <li><strong>Private Contributions:</strong> No matching, funding is simply the sum of all contributions.</li>
                <li><strong>Linear Matching:</strong> Each contribution receives the same matching ratio, regardless of community support.</li>
                <li><strong>One Person, One Vote:</strong> Favors projects with the most contributors, ignoring contribution amounts.</li>
                <li><strong>Quadratic Funding:</strong> Gives greater weight to projects with broad support, optimized for public goods.</li>
                <li><strong>Capital-constrained QF:</strong> A practical blend of quadratic and linear mechanisms, with adjustable alpha parameter.</li>
              </ul>
              <p className="mb-0">
                <strong>Try it yourself:</strong> Adjust the contribution amounts and number of contributors to see how each mechanism responds!
              </p>
            </Card.Body>
          </Card>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default QuadraticFundingSimulator;
