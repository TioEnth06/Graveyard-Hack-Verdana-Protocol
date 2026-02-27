/**
 * Verdana DAO on-chain program client (ecosol_dao).
 * Create proposal and cast vote on Solana.
 */
import { Program, AnchorProvider } from '@coral-xyz/anchor';
import { PublicKey, SystemProgram } from '@solana/web3.js';
import type { Connection } from '@solana/web3.js';
import type { WalletContextState } from '@solana/wallet-adapter-react';
import idl from '../idl/ecosol_dao.json';

export const PROGRAM_ID_DAO = new PublicKey('Gs65WU8V3iMhvgqGfsbQ4nojUqzRXWAGFeAjnVM1ZDSb');

export type EcoSolDaoIdl = typeof idl & { address: string };

const dummyWallet = {
  publicKey: PublicKey.default,
  signTransaction: async (tx: any) => tx,
  signAllTransactions: async (txs: any[]) => txs,
};

function getProgramReadOnly(connection: Connection): Program<EcoSolDaoIdl> {
  const provider = new AnchorProvider(connection, dummyWallet as any, { commitment: 'confirmed' });
  return new Program(idl as EcoSolDaoIdl, provider);
}

export function getDaoProgram(
  connection: Connection,
  wallet: WalletContextState | null
): { program: Program<EcoSolDaoIdl> | null; error?: string } {
  if (!wallet?.publicKey) {
    return { program: null, error: 'Wallet not connected.' };
  }
  try {
    const provider = new AnchorProvider(connection, wallet as any, { commitment: 'confirmed' });
    const program = new Program(idl as EcoSolDaoIdl, provider);
    return { program };
  } catch (e: any) {
    const msg = e?.message ?? String(e);
    console.warn('getDaoProgram failed', e);
    if (msg.includes('Assertion failed') || msg.includes('assert')) {
      return { program: null, error: 'DAO program could not be loaded (IDL or network). Deploy ecosol_dao to devnet and use a devnet wallet, or use Demo mode below.' };
    }
    if (msg.includes('Program') && (msg.includes('not found') || msg.includes('invalid'))) {
      return { program: null, error: 'DAO program is not deployed on this network. Deploy ecosol_dao to devnet first.' };
    }
    return { program: null, error: msg || 'Could not create DAO client.' };
  }
}

export function getDaoConfigPda(): PublicKey {
  const [pda] = PublicKey.findProgramAddressSync([Buffer.from('dao_config')], PROGRAM_ID_DAO);
  return pda;
}

export function getProposalPda(daoConfigPk: PublicKey, proposalId: number): PublicKey {
  const buf = Buffer.alloc(8);
  buf.writeBigUint64LE(BigInt(proposalId), 0);
  const [pda] = PublicKey.findProgramAddressSync(
    [Buffer.from('proposal'), daoConfigPk.toBuffer(), buf],
    PROGRAM_ID_DAO
  );
  return pda;
}

export function getVoteRecordPda(proposalPk: PublicKey, voterPk: PublicKey): PublicKey {
  const [pda] = PublicKey.findProgramAddressSync(
    [Buffer.from('vote'), proposalPk.toBuffer(), voterPk.toBuffer()],
    PROGRAM_ID_DAO
  );
  return pda;
}

export interface DaoConfigAccount {
  nextProposalId: number;
  bump: number;
}

export interface ProposalAccount {
  id: number;
  title: string;
  description: string;
  category: { supplierApproval?: {}; assetStandard?: {}; treasury?: {} };
  proposer: PublicKey;
  votesYes: number;
  votesNo: number;
  status: { active?: {}; passed?: {}; rejected?: {} };
  createdAt: { toNumber: () => number };
  votingEndsAt: { toNumber: () => number };
  bump: number;
}

export async function fetchDaoConfig(connection: Connection): Promise<DaoConfigAccount | null> {
  try {
    const [pda] = PublicKey.findProgramAddressSync([Buffer.from('dao_config')], PROGRAM_ID_DAO);
    const accountInfo = await connection.getAccountInfo(pda);
    if (!accountInfo?.data) return null;
    const program = getProgramReadOnly(connection);
    const decoded = program.coder.accounts.decode('DaoConfig', accountInfo.data);
    const next = decoded.nextProposalId;
    return {
      nextProposalId: typeof next?.toNumber === 'function' ? next.toNumber() : Number(next ?? 0),
      bump: decoded.bump,
    };
  } catch (e) {
    console.warn('fetchDaoConfig failed', e);
    return null;
  }
}

export async function fetchProposal(
  connection: Connection,
  proposalId: number
): Promise<ProposalAccount | null> {
  try {
    const daoConfigPda = getDaoConfigPda();
    const proposalPda = getProposalPda(daoConfigPda, proposalId);
    const accountInfo = await connection.getAccountInfo(proposalPda);
    if (!accountInfo?.data) return null;
    const program = getProgramReadOnly(connection);
    return program.coder.accounts.decode('Proposal', accountInfo.data) as ProposalAccount;
  } catch (e) {
    console.warn('fetchProposal failed', proposalId, e);
    return null;
  }
}

export async function fetchAllProposals(connection: Connection): Promise<ProposalAccount[]> {
  const config = await fetchDaoConfig(connection);
  if (!config || config.nextProposalId === 0) return [];
  const out: ProposalAccount[] = [];
  for (let i = 0; i < config.nextProposalId; i++) {
    const p = await fetchProposal(connection, i);
    if (p) out.push(p);
  }
  return out;
}
