import React from 'react';
import GovernanceHeader from '../components/governance/GovernanceHeader';
import GovernanceStats from '../components/governance/GovernanceStats';
import GovernanceProcess from '../components/governance/GovernanceProcess';
import ActiveProposals from '../components/governance/ActiveProposals';
import VotingExplainer from '../components/governance/VotingExplainer';
import WorkingGroups from '../components/governance/WorkingGroups';
import CreateProposal from '../components/governance/CreateProposal';
import GovernanceEvents from '../components/governance/GovernanceEvents';

const GovernancePage: React.FC = () => {
  return (
    <>
      <GovernanceHeader />
      <GovernanceStats />
      <GovernanceProcess />
      <ActiveProposals />
      <VotingExplainer />
      <WorkingGroups />
      <CreateProposal />
      <GovernanceEvents />
    </>
  );
};

export default GovernancePage; 