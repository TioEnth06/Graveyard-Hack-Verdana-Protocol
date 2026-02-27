// Mock data for dApp MVP

export type AssetType = 'Renewable Product' | 'Carbon Credit' | 'Plastic Credit' | 'REC';

export interface Asset {
  id: string;
  name: string;
  assetType: AssetType;
  quantity: string;
  priceSol: number;
  availableVolume: string;
  co2Equivalent: string;
  impactMetrics: string;
  methodologyRef: string;
  supplierId: string;
  supplierName: string;
  supplierLocation: string;
  certification: string;
  tokenId: string;
  mintAddress: string;
  verificationHash: string;
  /** Image URL for marketplace card (optional). */
  imageUrl?: string;
}

export interface PortfolioItem {
  id: string;
  assetId: string;
  assetName: string;
  assetType: AssetType;
  quantity: string;
  status: 'Active' | 'Retired';
  retiredAt?: string;
  certificateId?: string;
  txHash?: string;
}

export interface Certificate {
  id: string;
  assetName: string;
  assetType: AssetType;
  quantity: string;
  retiredAt: string;
  txHash: string;
  mintAddress: string;
}

export interface TxHistoryItem {
  id: string;
  type: 'buy' | 'retire';
  assetName: string;
  amount: string;
  txHash: string;
  timestamp: string;
  status?: 'Success' | 'Failed' | 'Pending';
}

const ASSETS: Asset[] = [
  {
    id: '1',
    name: 'ENplus Wood Pellets',
    assetType: 'Renewable Product',
    quantity: '500 t',
    priceSol: 2.5,
    availableVolume: '2,000 t',
    co2Equivalent: '~450 tCO₂e avoided',
    impactMetrics: 'Biomass substitution, fossil displacement',
    methodologyRef: 'ENplus 2023',
    supplierId: '1',
    supplierName: 'Green Biomass Co.',
    supplierLocation: 'EU',
    certification: 'ENplus, SBP',
    tokenId: 'SOL_ECO_88101',
    mintAddress: '7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU',
    verificationHash: 'a1b2c3d4e5f6...',
    imageUrl: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=400&h=400&fit=crop',
  },
  {
    id: '2',
    name: 'VCS Carbon Credit',
    assetType: 'Carbon Credit',
    quantity: '1 credit',
    priceSol: 0.8,
    availableVolume: '10,000',
    co2Equivalent: '1 tCO₂e',
    impactMetrics: 'Verified Carbon Standard',
    methodologyRef: 'VCS v4',
    supplierId: '2',
    supplierName: 'Pacific Carbon Solutions',
    supplierLocation: 'APAC',
    certification: 'VCS, Gold Standard',
    tokenId: 'SOL_ECO_88202',
    mintAddress: '9yLYtg3DX98e98UYKTEqcE6ClheUrB94UASvKptphtBv',
    verificationHash: 'f6e5d4c3b2a1...',
    imageUrl: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=400&fit=crop',
  },
  {
    id: '3',
    name: 'Ocean Bound Plastic Credit',
    assetType: 'Plastic Credit',
    quantity: '1 ton',
    priceSol: 1.2,
    availableVolume: '5,000 t',
    co2Equivalent: '~2 tCO₂e',
    impactMetrics: 'Plastic collection, recycling',
    methodologyRef: 'OBP Standard',
    supplierId: '4',
    supplierName: 'EcoPlastic Partners',
    supplierLocation: 'Americas',
    certification: 'Ocean Bound Plastic',
    tokenId: 'SOL_ECO_88303',
    mintAddress: '8zMZuh4EY09f09VZLUFrdF7DmifUsC05VBTwLquriuCw',
    verificationHash: 'b2c3d4e5f6a1...',
    imageUrl: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=400&h=400&fit=crop',
  },
  {
    id: '4',
    name: 'I-REC Renewable Certificate',
    assetType: 'REC',
    quantity: '1 MWh',
    priceSol: 0.15,
    availableVolume: '50,000 MWh',
    co2Equivalent: '~0.4 tCO₂e/MWh',
    impactMetrics: 'Renewable electricity',
    methodologyRef: 'I-REC Standard',
    supplierId: '5',
    supplierName: 'SunREC Energy',
    supplierLocation: 'APAC',
    certification: 'I-REC, TIGR',
    tokenId: 'SOL_ECO_88404',
    mintAddress: '1aNBvi5FZ10g10WAMVGugG8EnjVgD16WCUxMrvsjvDx',
    verificationHash: 'c3d4e5f6a1b2...',
    imageUrl: 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=400&h=400&fit=crop',
  },
  {
    id: '5',
    name: 'FSC Wood Pellets',
    assetType: 'Renewable Product',
    quantity: '200 t',
    priceSol: 1.8,
    availableVolume: '1,500 t',
    co2Equivalent: '~180 tCO₂e avoided',
    impactMetrics: 'Sustainable forestry',
    methodologyRef: 'FSC',
    supplierId: '3',
    supplierName: 'Nordic Pellets Ltd',
    supplierLocation: 'Nordic',
    certification: 'ENplus, FSC',
    tokenId: 'SOL_ECO_88505',
    mintAddress: '2bOCwj6GA11h11XBNWHvhH9FokWhE27XDVyNswtkwEy',
    verificationHash: 'd4e5f6a1b2c3...',
    imageUrl: 'https://images.unsplash.com/photo-1511497584788-876760111969?w=400&h=400&fit=crop',
  },
  {
    id: '6',
    name: 'Gold Standard Carbon',
    assetType: 'Carbon Credit',
    quantity: '1 credit',
    priceSol: 1.5,
    availableVolume: '3,000',
    co2Equivalent: '1 tCO₂e',
    impactMetrics: 'Gold Standard CER',
    methodologyRef: 'GS v3',
    supplierId: '2',
    supplierName: 'Pacific Carbon Solutions',
    supplierLocation: 'APAC',
    certification: 'Gold Standard',
    tokenId: 'SOL_ECO_88606',
    mintAddress: '3cPDxk7HB12i12YCOXIwiI0GplXiF38YEWzOtxulxFz',
    verificationHash: 'e5f6a1b2c3d4...',
    imageUrl: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=400&h=400&fit=crop',
  },
];

export function getAssets(): Asset[] {
  return ASSETS;
}

export function getAssetById(id: string): Asset | undefined {
  return ASSETS.find((a) => a.id === id);
}

// Mock portfolio (would come from wallet/chain)
export function getPortfolio(): PortfolioItem[] {
  return [
    { id: 'p1', assetId: '1', assetName: 'ENplus Wood Pellets', assetType: 'Renewable Product', quantity: '100 t', status: 'Active' },
    { id: 'p2', assetId: '2', assetName: 'VCS Carbon Credit', assetType: 'Carbon Credit', quantity: '5', status: 'Retired', retiredAt: '2025-02-20T14:00:00Z', certificateId: 'cert1', txHash: '5dQEyl8IC13j13ZDPYJxjJ1HqmYjG49ZFXaPuyvmyGa' },
  ];
}

const STATIC_CERTIFICATES: Certificate[] = [
  { id: 'cert1', assetName: 'VCS Carbon Credit', assetType: 'Carbon Credit', quantity: '5', retiredAt: '2025-02-20T14:00:00Z', txHash: '5dQEyl8IC13j13ZDPYJxjJ1HqmYjG49ZFXaPuyvmyGa', mintAddress: '9yLYtg3DX98e98UYKTEqcE6ClheUrB94UASvKptphtBv' },
];

const sessionCertificates = new Map<string, Certificate>();

export function getCertificates(): Certificate[] {
  return [...STATIC_CERTIFICATES, ...sessionCertificates.values()];
}

export function registerCertificate(cert: Certificate): void {
  sessionCertificates.set(cert.id, cert);
}

export function getCertificateById(id: string): Certificate | undefined {
  return sessionCertificates.get(id) ?? STATIC_CERTIFICATES.find((c) => c.id === id);
}

export function getTxHistory(): TxHistoryItem[] {
  return [
    { id: 'tx1', type: 'buy', assetName: 'ENplus Wood Pellets', amount: '100 t', txHash: '4cODwl6GA11h11XBNWHvhH9FokWhE27XDVyNswtkwEy', timestamp: '2025-02-18T10:00:00Z', status: 'Success' },
    { id: 'tx2', type: 'retire', assetName: 'VCS Carbon Credit', amount: '5', txHash: '5dQEyl8IC13j13ZDPYJxjJ1HqmYjG49ZFXaPuyvmyGa', timestamp: '2025-02-20T14:00:00Z', status: 'Success' },
  ];
}
