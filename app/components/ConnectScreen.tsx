'use client';

import { useWallet } from '@solana/wallet-adapter-react';
import { WalletButton } from './WalletButton';
import { Wallet } from 'lucide-react';

export function ConnectScreen() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="w-16 h-16 rounded-2xl bg-[var(--accent-muted)] flex items-center justify-center mx-auto mb-6">
          <Wallet className="h-8 w-8 text-[var(--accent)]" />
        </div>
        <h1 className="font-display text-2xl font-semibold text-[var(--text)] mb-2">
          Connect your wallet
        </h1>
        <p className="text-[var(--text-muted)] text-sm mb-8">
          Connect a Solana wallet to access the Verdana app: browse the marketplace, buy or retire green assets, and track your impact.
        </p>
        <WalletButton />
        <p className="mt-6 text-xs text-[var(--text-dim)]">
          Phantom, Solflare, and other Solana wallets supported.
        </p>
      </div>
    </div>
  );
}
