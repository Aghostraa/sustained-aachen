export type ProposalStatus = 'discussion' | 'voting' | 'passed' | 'implemented';

export type ProposalCategory = 'funding' | 'platform' | 'impact' | 'growth';

export interface Proposal {
  id: string;
  title: string;
  description: string;
  status: ProposalStatus;
  category: ProposalCategory;
  closesIn?: string;
  createdDate?: string;
  passedDate?: string;
  votes?: number;
  comments?: number;
  supporters?: number;
  approvalPercentage?: number;
}

export interface StatCard {
  icon: string;
  value: string | number;
  label: string;
}

export interface ProcessStep {
  number: number;
  title: string;
  description: string;
}

export interface WorkingGroup {
  id: string;
  name: string;
  description: string;
  icon: string;
  iconColor: string;
  iconBg: string;
  stats: {
    members: number;
    metric: {
      value: string | number;
      label: string;
    };
  };
}

export interface GovernanceEvent {
  id: string;
  title: string;
  date: {
    month: string;
    day: string;
  };
  time: string;
  location: string;
  isOnline: boolean;
  description: string;
}

export interface ProposalFormData {
  title: string;
  category: ProposalCategory;
  summary: string;
  description: string;
  impact: string;
  resources: string;
  timeline: string;
} 