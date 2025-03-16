import React from 'react';
import { Card, Table, Alert, Badge } from 'react-bootstrap';
import { Project, Donor, SimulationConfig, SimulationResult } from '../models/SimulationModels';

interface SimulationResultsProps {
  results: SimulationResult;
  projects: Project[];
  donors: Donor[];
  config: SimulationConfig;
}

const SimulationResults: React.FC<SimulationResultsProps> = ({ 
  results,
  projects,
  donors,
  config
}) => {
  // Format currency for display
  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };
  
  // Get formula name from type
  const getFormulaName = (): string => {
    switch (config.formulaType) {
      case 'capped':
        return 'Capped Contributions';
      case 'two-tier':
        return 'Two-Tier Matching';
      case 'declining':
        return 'Declining Marginal Matching';
      case 'standard':
      default:
        return 'Standard QF';
    }
  };
  
  // Get relevant parameters for the current formula
  const getFormulaParams = (): React.ReactNode => {
    switch (config.formulaType) {
      case 'capped':
        return <>Cap: {formatCurrency(config.formulaParams.cap || 200)}</>;
      case 'two-tier':
        return (
          <>
            Threshold: {formatCurrency(config.formulaParams.threshold || 50)}, 
            α1: {config.formulaParams.alpha1 || 0.7}, 
            α2: {config.formulaParams.alpha2 || 0.3}
          </>
        );
      case 'declining':
        return <>β: {config.formulaParams.beta || 0.7}</>;
      default:
        return <>Standard Formula</>;
    }
  };
  
  // Calculate matching effectiveness ratio
  const calculateMatchingEffectiveness = (projectResult: any): number => {
    return projectResult.contributorCount > 0 
      ? projectResult.matchingAmount / projectResult.contributorCount 
      : 0;
  };
  
  return (
    <Card className="mb-4">
      <Card.Header>Simulation Results</Card.Header>
      <Card.Body>
        <div className="formula-summary mb-4">
          <h5>Formula: {getFormulaName()}</h5>
          <p className="text-muted">
            Parameters: {getFormulaParams()}
            <br />
            Matching Pool: {formatCurrency(config.matchingPool)}
          </p>
          
          <Alert variant="light" className="d-flex gap-3 mb-3">
            <div>
              <Badge bg={config.enableAntiCollusion ? "success" : "secondary"}>
                {config.enableAntiCollusion ? "Enabled" : "Disabled"}
              </Badge>
              <div className="small mt-1">Anti-Collusion</div>
            </div>
            
            <div>
              <Badge bg={config.enableVerification ? "success" : "secondary"}>
                {config.enableVerification ? "Enabled" : "Disabled"}
              </Badge>
              <div className="small mt-1">Verification</div>
            </div>
            
            <div>
              <Badge bg={config.enableIncentives ? "success" : "secondary"}>
                {config.enableIncentives ? "Enabled" : "Disabled"}
              </Badge>
              <div className="small mt-1">Incentives</div>
            </div>
            
            <div>
              <Badge bg={config.categoricalAllocation ? "success" : "secondary"}>
                {config.categoricalAllocation ? "Enabled" : "Disabled"}
              </Badge>
              <div className="small mt-1">Categorical</div>
            </div>
          </Alert>
        </div>
        
        <h5 className="mb-3">Detailed Results</h5>
        <Table responsive striped bordered hover>
          <thead>
            <tr>
              <th>Project</th>
              <th>Category</th>
              <th>Direct Contributions</th>
              <th>Contributors</th>
              <th>Matching</th>
              <th>Total Funding</th>
              <th>Matching/Contributor</th>
              <th>% of Target</th>
            </tr>
          </thead>
          <tbody>
            {results.projects.map(projectResult => {
              const project = projects.find(p => p.id === projectResult.projectId);
              
              if (!project) return null;
              
              const percentOfTarget = (projectResult.totalFunding / project.targetAmount) * 100;
              const matchingPerContributor = calculateMatchingEffectiveness(projectResult);
              
              return (
                <tr key={project.id}>
                  <td>
                    <div className="d-flex align-items-center">
                      <div 
                        className="project-icon rounded-circle me-2 d-flex align-items-center justify-content-center"
                        style={{ 
                          width: '30px', 
                          height: '30px', 
                          backgroundColor: project.iconColor,
                          color: 'white',
                          fontSize: '12px',
                          fontWeight: 'bold'
                        }}
                      >
                        {project.iconText}
                      </div>
                      {project.title}
                    </div>
                  </td>
                  <td>{project.category}</td>
                  <td>{formatCurrency(projectResult.contributions)}</td>
                  <td>{projectResult.contributorCount}</td>
                  <td>{formatCurrency(projectResult.matchingAmount)}</td>
                  <td>{formatCurrency(projectResult.totalFunding)}</td>
                  <td>{formatCurrency(matchingPerContributor)}</td>
                  <td>
                    <div className="d-flex align-items-center">
                      {percentOfTarget.toFixed(1)}%
                      {percentOfTarget >= 100 && (
                        <Badge bg="success" className="ms-2">Funded</Badge>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
          <tfoot>
            <tr className="fw-bold">
              <td colSpan={2}>Total</td>
              <td>
                {formatCurrency(
                  results.projects.reduce((sum, p) => sum + p.contributions, 0)
                )}
              </td>
              <td>
                {/* Unique contributor count would require donor analysis */}
                -
              </td>
              <td>
                {formatCurrency(
                  results.projects.reduce((sum, p) => sum + p.matchingAmount, 0)
                )}
              </td>
              <td>
                {formatCurrency(
                  results.projects.reduce((sum, p) => sum + p.totalFunding, 0)
                )}
              </td>
              <td colSpan={2}></td>
            </tr>
          </tfoot>
        </Table>
        
        {results.flaggedDonations.length > 0 && (
          <Alert variant="warning" className="mt-4">
            <h6 className="mb-2">Anti-Collusion Results</h6>
            <p className="small mb-0">
              {results.flaggedDonations.length} donations flagged and excluded from matching calculations
              due to suspicious patterns.
            </p>
          </Alert>
        )}
        
        <div className="mt-4">
          <h5>Key Insights</h5>
          <ul className="insight-list">
            <li>
              <strong>Funding Efficiency:</strong> {getFormulaName()} results in 
              {' '}{calculateFundingEfficiency(results, config.formulaType)}% funding going to small contributors.
            </li>
            <li>
              <strong>Whale Influence:</strong> Large donors (€200+) have 
              {' '}{calculateWhaleInfluence(results)}% influence on the matching pool.
            </li>
            <li>
              <strong>Matching Leverage:</strong> Each €1 contributed directly generated 
              {' '}{calculateMatchingLeverage(results)}€ in matching funds.
            </li>
            {config.categoricalAllocation && (
              <li>
                <strong>Category Distribution:</strong> Matching funds were equally distributed across
                {' '}{countUniqueCategories(projects)} project categories.
              </li>
            )}
          </ul>
        </div>
      </Card.Body>
    </Card>
  );
};

// Helper functions for insights
const calculateFundingEfficiency = (results: SimulationResult, formulaType: string): string => {
  const smallDonorInfluence = results.projects.reduce((sum, project) => {
    const smallDonorMatching = project.donorInfluence
      .filter(influence => influence.contributionAmount <= 30)
      .reduce((matchSum, influence) => matchSum + influence.matchingGenerated, 0);
    
    return sum + smallDonorMatching;
  }, 0);
  
  const totalMatching = results.projects.reduce(
    (sum, project) => sum + project.matchingAmount, 
    0
  );
  
  const efficiency = totalMatching > 0 ? (smallDonorInfluence / totalMatching) * 100 : 0;
  return efficiency.toFixed(1);
};

const calculateWhaleInfluence = (results: SimulationResult): string => {
  const whaleDonorInfluence = results.projects.reduce((sum, project) => {
    const whaleDonorMatching = project.donorInfluence
      .filter(influence => influence.contributionAmount > 200)
      .reduce((matchSum, influence) => matchSum + influence.matchingGenerated, 0);
    
    return sum + whaleDonorMatching;
  }, 0);
  
  const totalMatching = results.projects.reduce(
    (sum, project) => sum + project.matchingAmount, 
    0
  );
  
  const whaleInfluence = totalMatching > 0 ? (whaleDonorInfluence / totalMatching) * 100 : 0;
  return whaleInfluence.toFixed(1);
};

const calculateMatchingLeverage = (results: SimulationResult): string => {
  const totalDirectContributions = results.projects.reduce(
    (sum, project) => sum + project.contributions, 
    0
  );
  
  const totalMatching = results.projects.reduce(
    (sum, project) => sum + project.matchingAmount, 
    0
  );
  
  const leverage = totalDirectContributions > 0 ? totalMatching / totalDirectContributions : 0;
  return leverage.toFixed(2);
};

const countUniqueCategories = (projects: Project[]): number => {
  return new Set(projects.map(p => p.category)).size;
};

export default SimulationResults; 