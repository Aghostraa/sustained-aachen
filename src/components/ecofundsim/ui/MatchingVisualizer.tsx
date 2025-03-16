import React, { useState } from 'react';
import { Card, Nav, Alert } from 'react-bootstrap';
import { Project, Donor, Donation, SimulationResult } from '../models/SimulationModels';
import { generateSankeyData, generatePieChartData } from '../utils/VisualizationHelpers';

interface MatchingVisualizerProps {
  results: SimulationResult;
  projects: Project[];
  donors: Donor[];
  donations: Donation[];
}

const MatchingVisualizer: React.FC<MatchingVisualizerProps> = ({ 
  results,
  projects,
  donors,
  donations
}) => {
  const [activeTab, setActiveTab] = useState<'sankey' | 'pie' | 'bar'>('sankey');
  
  // Format currency for display
  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };
  
  // Calculate total direct contributions
  const totalDirectContributions = results.projects.reduce(
    (sum, project) => sum + project.contributions, 
    0
  );
  
  // Calculate total matching funds
  const totalMatching = results.totalMatching;
  
  // Calculate average matching per contributor
  const totalContributors = results.projects.reduce(
    (sum, project) => sum + project.contributorCount, 
    0
  );
  
  const avgMatchingPerContributor = totalContributors > 0 
    ? totalMatching / totalContributors 
    : 0;
  
  // Get matching multiplier
  const matchingMultiplier = totalDirectContributions > 0 
    ? totalMatching / totalDirectContributions 
    : 0;
  
  return (
    <Card className="mb-4">
      <Card.Header>
        <Nav variant="tabs" className="card-header-tabs">
          <Nav.Item>
            <Nav.Link 
              active={activeTab === 'sankey'} 
              onClick={() => setActiveTab('sankey')}
            >
              Fund Flow
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link 
              active={activeTab === 'pie'} 
              onClick={() => setActiveTab('pie')}
            >
              Distribution
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link 
              active={activeTab === 'bar'} 
              onClick={() => setActiveTab('bar')}
            >
              Comparison
            </Nav.Link>
          </Nav.Item>
        </Nav>
      </Card.Header>
      <Card.Body>
        <div className="d-flex flex-wrap justify-content-between mb-4">
          <div className="stat-card mb-3">
            <div className="stat-label">Total Contributions</div>
            <div className="stat-value">{formatCurrency(totalDirectContributions)}</div>
          </div>
          
          <div className="stat-card mb-3">
            <div className="stat-label">Total Matching</div>
            <div className="stat-value">{formatCurrency(totalMatching)}</div>
          </div>
          
          <div className="stat-card mb-3">
            <div className="stat-label">Matching Multiplier</div>
            <div className="stat-value">{matchingMultiplier.toFixed(2)}x</div>
          </div>
          
          <div className="stat-card mb-3">
            <div className="stat-label">Avg. Matching per Contributor</div>
            <div className="stat-value">{formatCurrency(avgMatchingPerContributor)}</div>
          </div>
        </div>
        
        {activeTab === 'sankey' && (
          <div className="sankey-container">
            <Alert variant="info">
              <h5>Funding Flow Diagram</h5>
              <p className="mb-0">
                This Sankey diagram visualizes how funds flow from donors through the matching
                pool to projects. Hover over the links to see more details.
              </p>
            </Alert>
            <div className="visualization-placeholder bg-light p-5 text-center border rounded">
              <h4 className="text-muted">Sankey Diagram - Fund Flow Visualization</h4>
              <p className="text-muted mb-0">
                This would display a Sankey diagram showing the flow of funds from donors through the
                matching pool to projects. The implementation would use D3.js or a similar visualization library.
              </p>
              {/* In a real implementation, this would render a Sankey diagram using D3.js or a similar library */}
            </div>
          </div>
        )}
        
        {activeTab === 'pie' && (
          <div className="pie-container">
            <Alert variant="info">
              <h5>Matching Fund Distribution</h5>
              <p className="mb-0">
                This pie chart shows how the matching pool is distributed across projects.
                It helps visualize which projects receive the most matching funds.
              </p>
            </Alert>
            <div className="visualization-placeholder bg-light p-5 text-center border rounded">
              <h4 className="text-muted">Pie Chart - Matching Fund Distribution</h4>
              <p className="text-muted mb-0">
                This would display a pie chart showing the distribution of matching funds across projects.
                The implementation would use Chart.js, Recharts, or a similar charting library.
              </p>
              {/* In a real implementation, this would render a pie chart using Chart.js or a similar library */}
            </div>
          </div>
        )}
        
        {activeTab === 'bar' && (
          <div className="bar-container">
            <Alert variant="info">
              <h5>Direct vs. Matching Comparison</h5>
              <p className="mb-0">
                This bar chart compares direct contributions vs. matching funds for each project,
                showing the leverage effect of quadratic funding.
              </p>
            </Alert>
            <div className="visualization-placeholder bg-light p-5 text-center border rounded">
              <h4 className="text-muted">Bar Chart - Direct vs. Matching Comparison</h4>
              <p className="text-muted mb-0">
                This would display a bar chart comparing direct contributions vs. matching funds for each project.
                The implementation would use Chart.js, Recharts, or a similar charting library.
              </p>
              {/* In a real implementation, this would render a bar chart using Chart.js or a similar library */}
            </div>
          </div>
        )}
        
        {results.flaggedDonations.length > 0 && (
          <Alert variant="warning" className="mt-4">
            <h5>Flagged Donations</h5>
            <p className="mb-1">
              {results.flaggedDonations.length} donation(s) were flagged for potential collusion and excluded from matching calculations.
            </p>
            <p className="small mb-0">
              These donations showed suspicious patterns like multiple contributions from the same IP address,
              clusters of donations in a short time period, or other anomalies.
            </p>
          </Alert>
        )}
      </Card.Body>
    </Card>
  );
};

export default MatchingVisualizer; 