// Mock governance data for DAO MVP

export interface DaoMeta {
  name: string;
  description: string;
  tagline: string;
  memberCount: number;
  votingPeriodHours: number;
}

export const DAO_META: DaoMeta = {
  name: 'Verdana DAO',
  description: 'Verdana DAO governs the Green RWA marketplace: supplier approval, asset standards, and treasury allocation. Hold a Governance NFT (SBT) to propose and vote. Decisions are executed on Solana.',
  tagline: 'Community-led governance for the Green Asset Marketplace',
  memberCount: 24,
  votingPeriodHours: 72,
};

export type ProposalCategory = 'Supplier Approval' | 'Asset Standard' | 'Treasury';

export type ProposalStatus = 'Active' | 'Passed' | 'Rejected' | 'Executed';

export interface Proposal {
  id: string;
  title: string;
  description: string;
  category: ProposalCategory;
  status: ProposalStatus;
  createdAt: string;
  votingEndsAt: string;
  votesYes: number;
  votesNo: number;
  proposer: string;
  executionTx?: string;
}

export interface TreasuryEntry {
  id: string;
  label: string;
  amountSol: number;
  description: string;
}

// Voting end dates set in future so dummy proposals stay votable in UI
const VOTING_END_ACTIVE_1 = '2026-03-10T10:00:00Z';
const VOTING_END_ACTIVE_2 = '2026-03-15T10:00:00Z';

const PROPOSALS: Proposal[] = [
  {
    id: '1',
    title: 'List supplier: Green Biomass Co.',
    description: 'Approve Green Biomass Co. (EU) as a verified supplier. They meet ENplus and SBP certification requirements. Onboarding will enable wood pellet and biomass listings.',
    category: 'Supplier Approval',
    status: 'Active',
    createdAt: '2025-02-22T10:00:00Z',
    votingEndsAt: VOTING_END_ACTIVE_1,
    votesYes: 12,
    votesNo: 3,
    proposer: '7xKX...gAsU',
  },
  {
    id: '2',
    title: 'Add Biochar as new asset category',
    description: 'Add biochar as a new standardized asset category with CO₂ equivalent methodology. Enables suppliers to list biochar credits on the marketplace.',
    category: 'Asset Standard',
    status: 'Active',
    createdAt: '2025-02-23T08:00:00Z',
    votingEndsAt: VOTING_END_ACTIVE_2,
    votesYes: 8,
    votesNo: 2,
    proposer: '9yLY...htBv',
  },
  {
    id: '3',
    title: 'Allocate 50 SOL to supplier onboarding fund',
    description: 'Allocate 50 SOL from the DAO treasury to fund verification and onboarding of 3 new suppliers in Q2.',
    category: 'Treasury',
    status: 'Passed',
    createdAt: '2025-02-18T12:00:00Z',
    votingEndsAt: '2025-02-21T12:00:00Z',
    votesYes: 15,
    votesNo: 4,
    proposer: '8zMZ...iuCw',
    executionTx: '5dQEyl8IC13j13ZDPYJxjJ1HqmYjG49ZFXaPuyvmyGa',
  },
];

export function getProposals(): Proposal[] {
  return PROPOSALS;
}

export function getProposalById(id: string): Proposal | undefined {
  return PROPOSALS.find((p) => p.id === id);
}

export function getActiveProposals(): Proposal[] {
  return PROPOSALS.filter((p) => p.status === 'Active');
}

export const TREASURY_TOTAL_SOL = 120;
export const TREASURY_ADDRESS = 'VerdanaTreasury11111111111111111111111111111111';

export function getTreasuryAllocations(): TreasuryEntry[] {
  return [
    { id: '1', label: 'Ecosystem fund', amountSol: 50, description: 'Grants and partnerships' },
    { id: '2', label: 'Supplier onboarding', amountSol: 40, description: 'Verification and onboarding' },
    { id: '3', label: 'Reserve', amountSol: 30, description: 'Contingency' },
  ];
}
