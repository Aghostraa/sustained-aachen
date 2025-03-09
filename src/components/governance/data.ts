import { Proposal, StatCard, ProcessStep, WorkingGroup, GovernanceEvent } from './types';

export const statsData: StatCard[] = [
  {
    icon: 'fas fa-users',
    value: 857,
    label: 'Active Voters'
  },
  {
    icon: 'fas fa-vote-yea',
    value: 35,
    label: 'Proposals Passed'
  },
  {
    icon: 'fas fa-comments',
    value: 428,
    label: 'Active Discussions'
  },
  {
    icon: 'fas fa-calendar-check',
    value: 8,
    label: 'Days Until Next Voting Round'
  }
];

export const processStepsData: ProcessStep[] = [
  {
    number: 1,
    title: 'Proposal Creation',
    description: 'Any community member with at least 100 impact points can create a proposal for platform improvements, funding allocation, or new initiatives. Proposals should include clear objectives, implementation plans, and success metrics.'
  },
  {
    number: 2,
    title: 'Discussion Period',
    description: 'Each proposal undergoes a 2-week discussion period where the community can provide feedback, suggest improvements, and ask questions. This collaborative phase helps refine proposals and build consensus.'
  },
  {
    number: 3,
    title: 'Refinement',
    description: 'Proposal creators incorporate community feedback and finalize their proposals, including detailed implementation plans, resource requirements, and success metrics. Working groups may provide additional guidance during this phase.'
  },
  {
    number: 4,
    title: 'Voting',
    description: 'Community members vote using quadratic voting, where voting power is the square root of points allocated, ensuring equitable representation. Voting periods last one week, with real-time results visible to all members.'
  },
  {
    number: 5,
    title: 'Implementation',
    description: 'Passed proposals are assigned to relevant working groups for implementation. Regular progress updates are provided to the community, and success metrics are tracked transparently through our impact dashboard.'
  }
];

export const proposalsData: Proposal[] = [
  {
    id: 'district-balancing',
    title: 'District Balancing for Q2 Matching Pool',
    description: 'Proposal to allocate 30% of the matching pool to underrepresented districts to ensure equitable funding distribution across all neighborhoods in Aachen. This initiative aims to boost sustainability projects in areas that have historically received less support.',
    status: 'voting',
    category: 'funding',
    closesIn: '3 days',
    votes: 22,
    comments: 15
  },
  {
    id: 'climate-education',
    title: 'Adding "Climate Education" Category',
    description: 'Create a dedicated project category for initiatives focused on climate education to increase visibility and support for educational programs addressing climate challenges. This will help organize and promote educational initiatives more effectively.',
    status: 'voting',
    category: 'platform',
    closesIn: '5 days',
    votes: 47,
    comments: 23
  },
  {
    id: 'impact-verification',
    title: 'Impact Verification Framework',
    description: 'Developing standardized metrics for evaluating project outcomes and impact reporting to ensure transparent and consistent impact measurement across all funded initiatives.',
    status: 'discussion',
    category: 'impact',
    closesIn: '8 days',
    comments: 15,
    supporters: 28
  },
  {
    id: 'euregio-expansion',
    title: 'Cross-Border Expansion to Euregio',
    description: 'Proposal to expand the platform to include initiatives from neighboring communities in the Netherlands and Belgium, creating a true Euregio sustainability network.',
    status: 'discussion',
    category: 'growth',
    closesIn: '10 days',
    comments: 21,
    supporters: 31
  },
  {
    id: 'corporate-partnerships',
    title: 'Corporate Matching Fund Partnership',
    description: 'Establish a partnership program for local businesses to contribute to the matching fund with tax incentives and recognition benefits for participating companies.',
    status: 'passed',
    category: 'funding',
    passedDate: 'Feb 28, 2025',
    votes: 128,
    approvalPercentage: 82
  }
];

export const workingGroupsData: WorkingGroup[] = [
  {
    id: 'policy',
    name: 'Policy Committee',
    description: 'Develops platform governance policies, reviews proposals for compliance with community guidelines, and interfaces with legal authorities when needed.',
    icon: 'fas fa-landmark',
    iconColor: '#3b82f6',
    iconBg: 'rgba(59, 130, 246, 0.1)',
    stats: {
      members: 9,
      metric: {
        value: 12,
        label: 'Proposals Reviewed'
      }
    }
  },
  {
    id: 'impact',
    name: 'Impact Evaluation',
    description: 'Reviews project outcomes, verifies impact metrics, and develops standardized measurement frameworks to ensure accountability and transparency.',
    icon: 'fas fa-chart-line',
    iconColor: '#4ade80',
    iconBg: 'rgba(74, 222, 128, 0.1)',
    stats: {
      members: 7,
      metric: {
        value: 18,
        label: 'Projects Evaluated'
      }
    }
  },
  {
    id: 'treasury',
    name: 'Treasury Guild',
    description: 'Manages platform funds, oversees matching pool allocations, and implements community-approved funding distribution mechanisms.',
    icon: 'fas fa-euro-sign',
    iconColor: '#f59e0b',
    iconBg: 'rgba(245, 158, 11, 0.1)',
    stats: {
      members: 5,
      metric: {
        value: '€42K',
        label: 'Funds Managed'
      }
    }
  },
  {
    id: 'community',
    name: 'Community Engagement',
    description: 'Facilitates community discussions, moderates proposal debates, and ensures inclusive participation from diverse stakeholder groups.',
    icon: 'fas fa-users-cog',
    iconColor: '#ec4899',
    iconBg: 'rgba(236, 72, 153, 0.1)',
    stats: {
      members: 11,
      metric: {
        value: 28,
        label: 'Events Hosted'
      }
    }
  }
];

export const eventsData: GovernanceEvent[] = [
  {
    id: 'town-hall',
    title: 'Monthly Governance Town Hall',
    date: {
      month: 'MAR',
      day: '15'
    },
    time: '18:00-19:30',
    location: 'Digital Hub',
    isOnline: false,
    description: 'Monthly community gathering to discuss active proposals, review platform metrics, and address governance questions.'
  },
  {
    id: 'metrics-workshop',
    title: 'Impact Metrics Workshop',
    date: {
      month: 'MAR',
      day: '22'
    },
    time: '14:00-16:00',
    location: 'RWTH SuperC',
    isOnline: false,
    description: 'Collaborative workshop to develop standardized impact measurement frameworks for the Impact Verification proposal.'
  },
  {
    id: 'voting-kickoff',
    title: 'Voting Period Kickoff',
    date: {
      month: 'MAR',
      day: '28'
    },
    time: '19:00-20:00',
    location: 'Online (Zoom)',
    isOnline: true,
    description: 'Virtual event to present final versions of proposals entering the voting stage, with Q&A from proposal creators.'
  }
]; 