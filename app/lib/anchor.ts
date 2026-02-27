/** Anchor program and provider for EcoSol IDL. */
import { Program, AnchorProvider, Idl } from '@coral-xyz/anchor';
import { Connection } from '@solana/web3.js';
import { Wallet } from '@solana/wallet-adapter-react';
import { PROGRAM_ID } from './solana';
import idl from '../idl/ecosol.json';

export interface EcoSolIdl extends Idl {
  address: string;
}

export const getProgram = (
  connection: Connection,
  wallet: Wallet | null
): Program<EcoSolIdl> | null => {
  if (!wallet) return null;
  try {
    const provider = new AnchorProvider(connection, wallet as any, {
      commitment: 'confirmed',
    });
    return new Program(idl as EcoSolIdl, PROGRAM_ID, provider);
  } catch {
    return null;
  }
};
