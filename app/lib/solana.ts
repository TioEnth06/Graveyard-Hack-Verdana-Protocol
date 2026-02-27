/** Solana connection and program config. */
import { Connection, clusterApiUrl } from '@solana/web3.js';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';

const getEndpoint = (network: WalletAdapterNetwork): string =>
  network === WalletAdapterNetwork.Mainnet
    ? 'https://api.mainnet-beta.solana.com'
    : clusterApiUrl(network);

export const getConnection = (network: WalletAdapterNetwork = WalletAdapterNetwork.Devnet): Connection =>
  new Connection(getEndpoint(network), 'confirmed');

export const getRpcEndpoint = (network: WalletAdapterNetwork = WalletAdapterNetwork.Devnet): string =>
  getEndpoint(network);

export const PROGRAM_ID = 'EcoSol1111111111111111111111111111111111111';
