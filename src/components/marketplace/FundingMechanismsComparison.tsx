import React from 'react';
import { Container, Row, Col, Card, Table, Badge, Accordion } from 'react-bootstrap';
import { MathJax, MathJaxContext } from 'better-react-mathjax';

const config = {
  loader: { load: ["[tex]/html"] },
  tex: {
    packages: { "[+]": ["html"] },
    inlineMath: [["$", "$"]],
    displayMath: [["$$", "$$"]]
  }
};

interface FundingMechanism {
  id: string;
  name: string;
  description: string;
  formula: string;
  formulaExplanation: string;
  benefits: string[];
  drawbacks: string[];
  exampleScenario: {
    description: string;
    calculations: string;
    outcome: string;
  };
  color: string;
}

const fundingMechanisms: FundingMechanism[] = [
  {
    id: 'private',
    name: 'Private Contributions',
    description: 'Simple direct contributions where funding equals the sum of all individual contributions.',
    formula: 'F^p = \\sum_i c^p_i',
    formulaExplanation: 'The funding a project receives is simply the sum of all individual contributions.',
    benefits: [
      'Simple and intuitive',
      'No matching funds required',
      'Direct connection between donors and projects'
    ],
    drawbacks: [
      'Severely underfunds public goods',
      'Results in V^p′ = N for homogeneous citizens (N times the optimal level)',
      'Large donors have disproportionate influence',
      'Projects with broad but weak support receive little funding'
    ],
    exampleScenario: {
      description: '10 people contribute €10 each, and 1 person contributes €100 to another project.',
      calculations: 'Project A: 10 × €10 = €100\nProject B: 1 × €100 = €100',
      outcome: 'Both projects receive the same amount despite Project A having broader support.'
    },
    color: '#dc3545' // Bootstrap danger
  },
  {
    id: 'linear',
    name: 'Linear Matching',
    description: 'Multiplies each contribution by a fixed matching ratio.',
    formula: 'F^p = \\alpha\\sum_i c^p_i',
    formulaExplanation: 'α is a fixed matching ratio (e.g., 1:1 match would mean α=1).',
    benefits: [
      'Simple to understand and implement',
      'Increases overall funding',
      'Common in traditional philanthropy'
    ],
    drawbacks: [
      'Uses arbitrary matching ratios without mathematical justification',
      'Still favors large donors over broad support',
      'Does not optimize for community preference'
    ],
    exampleScenario: {
      description: '10 people contribute €10 each, and 1 person contributes €100, with a 1:1 matching ratio (α=1).',
      calculations: 'Project A: (10 × €10) + (10 × €10 × 1) = €200\nProject B: (1 × €100) + (1 × €100 × 1) = €200',
      outcome: 'Both projects still receive the same funding despite differing community support.'
    },
    color: '#fd7e14' // Bootstrap orange
  },
  {
    id: 'onePersonOneVote',
    name: 'One Person, One Vote (1p1v)',
    description: 'Equal weight given to each participant regardless of contribution amount.',
    formula: 'F^p = N \\cdot [\\text{Median}_i V^p_i(F^p) = 1]',
    formulaExplanation: 'N is the number of participants, and funding is determined by the median voter preference.',
    benefits: [
      'Democratic - gives equal voice to all participants',
      'Prevents wealth-based influence',
      'Simple to understand'
    ],
    drawbacks: [
      'Fails to account for preference intensity',
      'Typically underfunds valuable niche projects',
      'Binary approach misses nuance in preferences'
    ],
    exampleScenario: {
      description: 'If most voters support Project A over Project B, Project A gets all funding regardless of intensity of preference.',
      calculations: 'Project A: Supported by 51% of voters = Full funding\nProject B: Supported by 49% of voters = No funding',
      outcome: 'Projects with narrow majority support get everything; others get nothing, regardless of preference strength.'
    },
    color: '#ffc107' // Bootstrap warning
  },
  {
    id: 'quadratic',
    name: 'Quadratic Funding (QF)',
    description: 'Creates mathematically optimal system for funding public goods by giving greater weight to broad support.',
    formula: 'F^p = (\\sum_i \\sqrt{c^p_i})^2',
    formulaExplanation: 'The matching funding is proportional to the square of the sum of square roots of contributions, optimizing for the breadth of support.',
    benefits: [
      'Mathematically optimal for public goods funding',
      'Strongly favors broad community support over large individual donations',
      'Creates powerful network effects',
      'Reduces plutocratic capture'
    ],
    drawbacks: [
      'More complex to understand',
      'Requires substantial matching pool',
      'Vulnerable to collusion/sybil attacks without identity verification'
    ],
    exampleScenario: {
      description: '100 people contributing €1 each versus 1 person contributing €100.',
      calculations: 'Project A: (√1 × 100)² = 100² = 10,000\nProject B: (√100)² = 10² = 100',
      outcome: 'Project A receives 100x more matching despite equal raw contribution amounts, due to broader support.'
    },
    color: '#0d6efd' // Bootstrap primary
  },
  {
    id: 'capital-constrained-qf',
    name: 'Capital-constrained QF (CQF)',
    description: 'A practical implementation of QF with limited matching funds, combining quadratic and linear mechanisms.',
    formula: 'F^p = \\alpha(\\sum_i \\sqrt{c^p_i})^2 + (1-\\alpha)\\sum_i c^p_i',
    formulaExplanation: 'α ∈ [0,1] is the subsidy parameter. When α = 0, it becomes pure private contributions; when α = 1, it becomes full quadratic funding.',
    benefits: [
      'Practical for real-world implementation with limited matching funds',
      'Maintains relative project priorities from QF',
      'Flexible based on available matching pool'
    ],
    drawbacks: [
      'Projects underfunded by a factor of 1/α compared to theoretical optimum',
      'More complex to implement and explain',
      'Still requires identity verification'
    ],
    exampleScenario: {
      description: 'With α = 0.5, balancing between QF and direct contributions.',
      calculations: 'Project A (100 people × €1): 0.5 × 100² + 0.5 × 100 = 5,000 + 50 = €5,050\nProject B (1 person × €100): 0.5 × 10² + 0.5 × 100 = 50 + 50 = €100',
      outcome: 'Project A still receives significantly more funding, but the gap is reduced compared to pure QF.'
    },
    color: '#0dcaf0' // Bootstrap info
  },
  {
    id: 'negative-qf',
    name: 'Negative Quadratic Funding (±QF)',
    description: 'Extended QF that allows negative contributions to express opposition to projects with negative externalities.',
    formula: 'F^p = (\\sum_i \\pm_i\\sqrt{c^p_i})^2',
    formulaExplanation: '±i is +1 or -1 depending on whether citizen i supports or opposes the project.',
    benefits: [
      'Allows expression of opposition to harmful projects',
      'More nuanced funding decisions',
      'Can prevent funding of controversial or harmful projects'
    ],
    drawbacks: [
      'More complex to implement',
      'Potential for contentious processes',
      'Requires clear guidelines for negative contributions'
    ],
    exampleScenario: {
      description: 'A project has 10 supporters contributing €10 each, and 5 opponents contributing €20 each to vote against it.',
      calculations: 'Project A: (10 × √10 - 5 × √20)² = (10 × 3.16 - 5 × 4.47)² = (31.6 - 22.35)² = 9.25² = €85.6',
      outcome: 'Despite having twice the raw support (€100 vs €-100), the opposition significantly reduces the matching funds.'
    },
    color: '#6f42c1' // Bootstrap purple
  }
];

const FundingMechanismsComparison: React.FC = () => {
  return (
    <MathJaxContext config={config}>
      <Container className="py-5 bg-light">
        <Card className="shadow-sm mb-4">
          <Card.Body>
            <h2 className="fw-bold mb-4">Funding Mechanisms Comparison</h2>
            <p className="lead mb-4">
              Compare different funding mechanisms and their mathematical formulations for public goods funding.
            </p>
            
            <h4 className="mb-3">Quick Comparison Table</h4>
            <div className="table-responsive mb-4">
              <Table bordered hover>
                <thead>
                  <tr>
                    <th>Mechanism</th>
                    <th>Formula</th>
                    <th>Best For</th>
                    <th>Drawbacks</th>
                  </tr>
                </thead>
                <tbody>
                  {fundingMechanisms.map((mechanism) => (
                    <tr key={mechanism.id}>
                      <td>
                        <Badge bg="light" text="dark" className="me-2" style={{ backgroundColor: mechanism.color + '20', borderLeft: `4px solid ${mechanism.color}` }}>
                          {mechanism.name}
                        </Badge>
                      </td>
                      <td>
                        <MathJax>{`$${mechanism.formula}$`}</MathJax>
                      </td>
                      <td>{mechanism.benefits[0]}</td>
                      <td>{mechanism.drawbacks[0]}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
            
            <h4 className="mb-3">Detailed Mechanism Analysis</h4>
            <Accordion className="mb-4">
              {fundingMechanisms.map((mechanism) => (
                <Accordion.Item eventKey={mechanism.id} key={mechanism.id}>
                  <Accordion.Header>
                    <span className="ms-2 fw-bold" style={{ color: mechanism.color }}>{mechanism.name}</span>
                  </Accordion.Header>
                  <Accordion.Body>
                    <Row>
                      <Col md={6}>
                        <h5>Description</h5>
                        <p>{mechanism.description}</p>
                        
                        <h5>Mathematical Formulation</h5>
                        <div className="bg-light p-3 rounded mb-3">
                          <MathJax>{`$$${mechanism.formula}$$`}</MathJax>
                          <p className="small text-muted mt-2">{mechanism.formulaExplanation}</p>
                        </div>
                        
                        <h5>Benefits</h5>
                        <ul>
                          {mechanism.benefits.map((benefit, index) => (
                            <li key={index}>{benefit}</li>
                          ))}
                        </ul>
                        
                        <h5>Drawbacks</h5>
                        <ul>
                          {mechanism.drawbacks.map((drawback, index) => (
                            <li key={index}>{drawback}</li>
                          ))}
                        </ul>
                      </Col>
                      <Col md={6}>
                        <h5>Example Scenario</h5>
                        <Card className="bg-light">
                          <Card.Body>
                            <p><strong>Scenario:</strong> {mechanism.exampleScenario.description}</p>
                            <p><strong>Calculations:</strong></p>
                            <pre className="bg-white p-2 rounded">
                              {mechanism.exampleScenario.calculations}
                            </pre>
                            <p><strong>Outcome:</strong> {mechanism.exampleScenario.outcome}</p>
                          </Card.Body>
                        </Card>
                      </Col>
                    </Row>
                  </Accordion.Body>
                </Accordion.Item>
              ))}
            </Accordion>
            
            <h4 className="mb-3">Comparative Funding Scenarios</h4>
            <Card className="bg-light">
              <Card.Body>
                <p>The table below shows how €10,000 in matching funds would be distributed across different projects under each funding mechanism:</p>
                <div className="table-responsive">
                  <Table bordered className="bg-white">
                    <thead>
                      <tr>
                        <th>Scenario</th>
                        <th>Project A<br/>(100 × €10)</th>
                        <th>Project B<br/>(10 × €100)</th>
                        <th>Project C<br/>(1 × €1,000)</th>
                        <th>Explanation</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Private Contributions</td>
                        <td>€1,000</td>
                        <td>€1,000</td>
                        <td>€1,000</td>
                        <td>Raw contributions only</td>
                      </tr>
                      <tr>
                        <td>Linear Matching (1:1)</td>
                        <td>€2,000</td>
                        <td>€2,000</td>
                        <td>€2,000</td>
                        <td>Equal matching regardless of contributor count</td>
                      </tr>
                      <tr>
                        <td>One Person One Vote</td>
                        <td>€10,000</td>
                        <td>€0</td>
                        <td>€0</td>
                        <td>Project with most voters gets all funding</td>
                      </tr>
                      <tr>
                        <td>Quadratic Funding</td>
                        <td>€8,264</td>
                        <td>€1,653</td>
                        <td>€83</td>
                        <td>Strong preference for broad support</td>
                      </tr>
                      <tr>
                        <td>Capital-constrained QF<br/>(α = 0.5)</td>
                        <td>€4,632</td>
                        <td>€1,326</td>
                        <td>€542</td>
                        <td>Balance between QF and private contributions</td>
                      </tr>
                    </tbody>
                  </Table>
                </div>
                <p className="mt-3 small text-muted">
                  Note: For each scenario, all projects receive the same total amount of raw contributions (€1,000),
                  but the distribution pattern varies.
                </p>
              </Card.Body>
            </Card>
          </Card.Body>
        </Card>
      </Container>
    </MathJaxContext>
  );
};

export default FundingMechanismsComparison; 