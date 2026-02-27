/** Types for simulation/legacy marketplace flow (SimulationContext). */
export interface MarketplaceListing {
  nftMint: string;
  assetType: string;
  weight: number;
  verificationHash: string;
  price: number;
  seller: string;
  nftId: string;
}

export interface OwnedCredit {
  mint: string;
  assetType: string;
  weight: number;
  nftId: string;
  verificationHash?: string;
}

export interface SimulationState {
  listings: MarketplaceListing[];
  ownedCredits: OwnedCredit[];
}

const VERDANA_SIM_KEY = 'verdana_simulation';

const DEFAULT_LISTINGS: MarketplaceListing[] = [
  { nftMint: 'sim_1', assetType: 'WOOD_PELLETS', weight: 1.0, verificationHash: '0x1234…abcd', price: 0.5, seller: '7xK…9f2', nftId: 'SOL_ECO_001' },
  { nftMint: 'sim_2', assetType: 'PLASTIC', weight: 2.5, verificationHash: '0xabcd…1234', price: 1.2, seller: '9f2…7xK', nftId: 'SOL_ECO_002' },
  { nftMint: 'sim_3', assetType: 'CARBON', weight: 0.5, verificationHash: '0x5678…ef90', price: 0.8, seller: '3aB…cD4', nftId: 'SOL_ECO_003' },
  { nftMint: 'sim_4', assetType: 'WOOD_PELLETS', weight: 3.0, verificationHash: '0x9876…5432', price: 1.5, seller: 'cD4…3aB', nftId: 'SOL_ECO_004' },
  { nftMint: 'sim_5', assetType: 'PLASTIC', weight: 1.5, verificationHash: '0xfedc…ba98', price: 0.9, seller: '1yZ…8wX', nftId: 'SOL_ECO_005' },
  { nftMint: 'sim_6', assetType: 'CARBON', weight: 2.0, verificationHash: '0xabcd…efab', price: 1.1, seller: '8wX…1yZ', nftId: 'SOL_ECO_006' },
];

export const getDefaultSimulationState = (): SimulationState => ({
  listings: [...DEFAULT_LISTINGS],
  ownedCredits: [],
});

export function loadSimulationState(): SimulationState {
  if (typeof window === 'undefined') return getDefaultSimulationState();
  try {
    const raw = localStorage.getItem(VERDANA_SIM_KEY);
    if (!raw) return getDefaultSimulationState();
    const parsed = JSON.parse(raw) as SimulationState;
    return {
      listings: Array.isArray(parsed.listings) ? parsed.listings : getDefaultSimulationState().listings,
      ownedCredits: Array.isArray(parsed.ownedCredits) ? parsed.ownedCredits : [],
    };
  } catch {
    return getDefaultSimulationState();
  }
}

export function saveSimulationState(state: SimulationState): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(VERDANA_SIM_KEY, JSON.stringify(state));
  } catch {
    // ignore
  }
}
