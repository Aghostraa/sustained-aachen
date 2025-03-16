import React from 'react';
import { Card, Alert, Table, ProgressBar, Badge } from 'react-bootstrap';
import { Project, Donor, SimulationResult } from '../models/SimulationModels';
import { generateInfluenceData, calculatePoolInfluenceMetrics } from '../utils/VisualizationHelpers';

interface InfluenceIndicatorProps {
  results: SimulationResult;
  projects: Project[];
  donors: Donor[];
  selectedProjectId: string | null;
}

const InfluenceIndicator: React.FC<InfluenceIndicatorProps> = ({ 
  results,
  projects,
  donors,
  selectedProjectId
}) => {
  // Get the selected project if any
  const selectedProject = selectedProjectId 
    ? projects.find(p => p.id === selectedProjectId) 
    : null;
  
  // Get the result data for the selected project
  const selectedProjectResult = selectedProjectId 
    ? results.projects.find(p => p.projectId === selectedProjectId) 
    : null;
  
  // Calculate overall influence metrics for donor size categories
  const influenceMetrics = calculatePoolInfluenceMetrics(results);
  
  // Format a percentage with 1 decimal place
  const formatPercent = (value: number): string => {
    return `${value.toFixed(1)}%`;
  };
  
  return (
    <Card className="mb-4">
      <Card.Header>Donor Influence Analysis</Card.Header>
      <Card.Body>
        {!selectedProject ? (
          <Alert variant="info">
            <h5>Project Selection Required</h5>
            <p className="mb-0">
              Select a project card above to see a detailed donor influence analysis for that specific project.
            </p>
          </Alert>
        ) : (
          <>
            <h5 className="mb-3">Influence Analysis for {selectedProject.title}</h5>
            
            {selectedProjectResult && (
              <>
                <p className="text-muted">
                  This analysis shows how much influence each donor has on the matching funds received by this project.
                  The influence percentage represents what portion of the project's matching funds are generated
                  by each donor's contribution.
                </p>
                
                <div className="influence-summary mb-4">
                  <h6>Top Contributors by Influence</h6>
                  <Table responsive size="sm" className="mb-0">
                    <thead>
                      <tr>
                        <th>Donor</th>
                        <th>Contribution</th>
                        <th>Matching Generated</th>
                        <th>Influence</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedProjectResult.donorInfluence
                        .sort((a, b) => b.influencePercentage - a.influencePercentage)
                        .slice(0, 5)
                        .map((influence, index) => {
                          const donor = donors.find(d => d.id === influence.donorId);
                          
                          // Determine donor type based on donation amount
                          let donorTypeLabel = '';
                          let badgeVariant = 'secondary';
                          
                          if (influence.contributionAmount <= 30) {
                            donorTypeLabel = 'Small';
                            badgeVariant = 'success';
                          } else if (influence.contributionAmount <= 200) {
                            donorTypeLabel = 'Medium';
                            badgeVariant = 'primary';
                          } else {
                            donorTypeLabel = 'Large';
                            badgeVariant = 'danger';
                          }
                          
                          return (
                            <tr key={influence.donorId}>
                              <td>
                                {donor?.name || 'Unknown Donor'} 
                                <Badge bg={badgeVariant} className="ms-1">{donorTypeLabel}</Badge>
                              </td>
                              <td>€{influence.contributionAmount}</td>
                              <td>€{Math.round(influence.matchingGenerated)}</td>
                              <td>
                                <div className="d-flex align-items-center">
                                  <span className="me-2">{influence.influencePercentage.toFixed(1)}%</span>
                                  <ProgressBar 
                                    now={influence.influencePercentage} 
                                    max={100} 
                                    style={{ height: '10px', width: '100px' }}
                                    variant={badgeVariant}
                                  />
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </Table>
                </div>
                
                <div className="formula-impact-analysis mt-4">
                  <h6>Formula Impact Analysis</h6>
                  <p className="text-muted small">
                    This analysis shows how the chosen formula affects the influence distribution between
                    different donor categories for this specific project.
                  </p>
                  
                  <div className="d-flex justify-content-between mb-2">
                    <div>Small Donors (€5-€30):</div>
                    <div className="d-flex align-items-center" style={{ width: '50%' }}>
                      <ProgressBar 
                        now={calculateSmallDonorInfluence(selectedProjectResult)} 
                        style={{ height: '20px', width: '100%' }}
                        variant="success"
                        className="me-2"
                      />
                      <div style={{ width: '60px', textAlign: 'right' }}>
                        {formatPercent(calculateSmallDonorInfluence(selectedProjectResult))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="d-flex justify-content-between mb-2">
                    <div>Medium Donors (€31-€200):</div>
                    <div className="d-flex align-items-center" style={{ width: '50%' }}>
                      <ProgressBar 
                        now={calculateMediumDonorInfluence(selectedProjectResult)} 
                        style={{ height: '20px', width: '100%' }}
                        variant="primary"
                        className="me-2"
                      />
                      <div style={{ width: '60px', textAlign: 'right' }}>
                        {formatPercent(calculateMediumDonorInfluence(selectedProjectResult))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="d-flex justify-content-between mb-2">
                    <div>Large Donors (€200+):</div>
                    <div className="d-flex align-items-center" style={{ width: '50%' }}>
                      <ProgressBar 
                        now={calculateLargeDonorInfluence(selectedProjectResult)} 
                        style={{ height: '20px', width: '100%' }}
                        variant="danger"
                        className="me-2"
                      />
                      <div style={{ width: '60px', textAlign: 'right' }}>
                        {formatPercent(calculateLargeDonorInfluence(selectedProjectResult))}
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </>
        )}
        
        <div className="overall-influence mt-4">
          <h5 className="mb-3">Overall Matching Pool Influence</h5>
          <p className="text-muted small">
            This shows the aggregate influence of different donor categories on the entire matching pool.
          </p>
          
          <div className="d-flex justify-content-between mb-2">
            <div style={{ width: '200px' }}>Small Donors (€5-€30):</div>
            <div className="d-flex align-items-center flex-grow-1">
              <ProgressBar 
                now={influenceMetrics.smallDonorInfluence} 
                style={{ height: '20px', width: '100%' }}
                variant="success"
                className="me-2"
              />
              <div style={{ width: '60px', textAlign: 'right' }}>
                {formatPercent(influenceMetrics.smallDonorInfluence)}
              </div>
            </div>
          </div>
          
          <div className="d-flex justify-content-between mb-2">
            <div style={{ width: '200px' }}>Medium Donors (€31-€200):</div>
            <div className="d-flex align-items-center flex-grow-1">
              <ProgressBar 
                now={influenceMetrics.mediumDonorInfluence} 
                style={{ height: '20px', width: '100%' }}
                variant="primary"
                className="me-2"
              />
              <div style={{ width: '60px', textAlign: 'right' }}>
                {formatPercent(influenceMetrics.mediumDonorInfluence)}
              </div>
            </div>
          </div>
          
          <div className="d-flex justify-content-between mb-2">
            <div style={{ width: '200px' }}>Large Donors (€200+):</div>
            <div className="d-flex align-items-center flex-grow-1">
              <ProgressBar 
                now={influenceMetrics.largeDonorInfluence} 
                style={{ height: '20px', width: '100%' }}
                variant="danger"
                className="me-2"
              />
              <div style={{ width: '60px', textAlign: 'right' }}>
                {formatPercent(influenceMetrics.largeDonorInfluence)}
              </div>
            </div>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

// Helper function to calculate influence percentage by donor size
const calculateSmallDonorInfluence = (projectResult: any): number => {
  const totalMatching = projectResult.donorInfluence.reduce(
    (sum: number, influence: any) => sum + influence.matchingGenerated, 
    0
  );
  
  const smallDonorMatching = projectResult.donorInfluence
    .filter((influence: any) => influence.contributionAmount <= 30)
    .reduce((sum: number, influence: any) => sum + influence.matchingGenerated, 0);
  
  return totalMatching > 0 ? (smallDonorMatching / totalMatching) * 100 : 0;
};

const calculateMediumDonorInfluence = (projectResult: any): number => {
  const totalMatching = projectResult.donorInfluence.reduce(
    (sum: number, influence: any) => sum + influence.matchingGenerated, 
    0
  );
  
  const mediumDonorMatching = projectResult.donorInfluence
    .filter((influence: any) => influence.contributionAmount > 30 && influence.contributionAmount <= 200)
    .reduce((sum: number, influence: any) => sum + influence.matchingGenerated, 0);
  
  return totalMatching > 0 ? (mediumDonorMatching / totalMatching) * 100 : 0;
};

const calculateLargeDonorInfluence = (projectResult: any): number => {
  const totalMatching = projectResult.donorInfluence.reduce(
    (sum: number, influence: any) => sum + influence.matchingGenerated, 
    0
  );
  
  const largeDonorMatching = projectResult.donorInfluence
    .filter((influence: any) => influence.contributionAmount > 200)
    .reduce((sum: number, influence: any) => sum + influence.matchingGenerated, 0);
  
  return totalMatching > 0 ? (largeDonorMatching / totalMatching) * 100 : 0;
};

export default InfluenceIndicator; 