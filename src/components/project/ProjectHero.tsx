import React from 'react';
import { Container, Badge } from 'react-bootstrap';
import { FaUserCircle, FaCalendar } from 'react-icons/fa';
import './Project.css';

interface SDG {
  number: number;
  name: string;
  color: string;
}

interface Update {
  date: string;
  title: string;
  content: string;
}

interface TeamMember {
  initials: string;
  name: string;
  role: string;
}

interface VolunteerOpportunity {
  title: string;
  description: string;
  hoursPerMonth?: string;
  hoursPerWeek?: string;
  spots: number;
}

interface SimilarProject {
  id: string;
  title: string;
  iconText: string;
  iconColor: string;
  description: string;
  amountRaised: number;
  contributors: number;
  targetAmount: number;
  progressPercentage: number;
}

interface Challenge {
  title: string;
  description: string;
  severity: 'low' | 'medium' | 'high';
  status: 'active' | 'addressing' | 'resolved';
}

interface ResourceNeeded {
  type: 'funding' | 'volunteer' | 'expertise' | 'space' | 'materials' | 'other';
  description: string;
  urgency: 'low' | 'medium' | 'high';
  quantity?: string;
}

interface CollaborationOpportunity {
  title: string;
  description: string;
  benefitsToBoth: string[];
  skillsNeeded: string[];
  timeframe: string;
  contactPerson?: string;
}

interface ImpactMetric {
  name: string;
  description: string;
  currentValue: string | number;
  targetValue: string | number;
  unit?: string;
  lastUpdated: string;
}

export interface Project {
  id: string;
  title: string;
  iconText: string;
  iconColor: string;
  description: string;
  longDescription: string;
  creator: string;
  date: string;
  tags: string[];
  amountRaised: number;
  contributors: number;
  daysToGo: number;
  targetAmount: number;
  gallery: string[];
  sdgAlignment: SDG[];
  outcomes: string[];
  updates: Update[];
  volunteerOpportunities: VolunteerOpportunity[];
  team: TeamMember[];
  similarProjects: SimilarProject[];
  challenges: Challenge[];
  resourcesNeeded: ResourceNeeded[];
  collaborationOpportunities: CollaborationOpportunity[];
  impactMetrics: ImpactMetric[];
  generationalFocus?: 'established' | 'emerging' | 'both';
  governanceStructure?: string;
  fundingSources?: string[];
  knowledgeResources?: {title: string, url: string, description: string}[];
}

interface ProjectHeroProps {
  project: Project;
}

const ProjectHero: React.FC<ProjectHeroProps> = ({ project }) => {
  return (
    <section className="project-hero mb-5">
      <div 
        className="hero-image position-relative"
        style={{ 
          height: '300px',
          backgroundImage: `url(${project.gallery[0]})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="hero-overlay position-absolute w-100 h-100 bg-dark opacity-50"></div>
      </div>
      
      <Container className="position-relative" style={{ marginTop: '-75px' }}>
        <div className="project-header-content bg-white rounded shadow p-4">
          <div className="d-flex flex-wrap align-items-center">
            <div 
              className="project-avatar d-flex align-items-center justify-content-center rounded-circle text-white me-3 mb-3"
              style={{ 
                width: '80px', 
                height: '80px', 
                backgroundColor: project.iconColor,
                fontSize: '24px',
                fontWeight: 'bold'
              }}
            >
              {project.iconText}
            </div>
            
            <div className="flex-grow-1">
              <h1 className="project-title fs-2 mb-2">{project.title}</h1>
              
              <div className="project-meta d-flex flex-wrap align-items-center mb-3">
                <span className="project-creator me-4 text-secondary">
                  <FaUserCircle className="me-2" /> {project.creator}
                </span>
                <span className="project-date text-secondary">
                  <FaCalendar className="me-2" /> {project.date}
                </span>
              </div>
              
              <div className="project-tags">
                {project.tags.map((tag, index) => (
                  <Badge 
                    key={index} 
                    bg="light" 
                    text="dark" 
                    className="me-2 mb-2 py-2 px-3"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default ProjectHero; 