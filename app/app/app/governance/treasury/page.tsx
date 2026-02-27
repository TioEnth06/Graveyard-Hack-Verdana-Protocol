'use client';

import { useWallet } from '@solana/wallet-adapter-react';
import Link from 'next/link';
import { ConnectScreen } from '@/components/ConnectScreen';
import { DaoNav } from '@/components/DaoNav';
import { TREASURY_TOTAL_SOL, TREASURY_ADDRESS, getTreasuryAllocations } from '@/lib/governance-data';
import { Wallet, ArrowLeft, ExternalLink, Coins } from 'lucide-react';

export default function TreasuryPage() {
  const { connected } = useWallet();
  const allocations = getTreasuryAllocations();

  if (!connected) return <ConnectScreen />;

  return (
    <div className="container-wide py-8 md:py-12">
      <div className="mb-6">
        <DaoNav />
      </div>
      <div className="container-narrow max-w-4xl">
      <Link
        href="/app/governance/overview"
        className="inline-flex items-center gap-2 text-sm text-[var(--text-muted)] hover:text-[var(--accent)] mb-6 transition"
      >
        <ArrowLeft className="h-4 w-4" /> DAO Overview
      </Link>

      <div className="mb-10">
        <p className="text-xs font-medium uppercase tracking-wider text-[var(--accent)] mb-1">
          Governance
        </p>
        <h1 className="font-display text-2xl md:text-3xl font-semibold text-[var(--text)] tracking-tight mb-2">
          Treasury
        </h1>
        <p className="text-[var(--text-muted)] text-sm leading-relaxed">
          DAO-controlled funds. Allocation changes are decided by governance vote.
        </p>
      </div>

      {/* Total balance - hero card */}
      <div className="rounded-2xl border border-[var(--border)] bg-gradient-to-br from-[var(--bg-card)] to-[var(--bg-elevated)] p-8 md:p-10 mb-10">
        <div className="flex flex-col sm:flex-row sm:items-center gap-6">
          <div className="w-16 h-16 rounded-2xl bg-[var(--accent-muted)] flex items-center justify-center shrink-0">
            <Wallet className="h-8 w-8 text-[var(--accent)]" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm text-[var(--text-muted)] mb-1">Total balance</p>
            <p className="font-display text-3xl md:text-4xl font-semibold text-[var(--text)]">
              {TREASURY_TOTAL_SOL} SOL
            </p>
            <p className="text-xs text-[var(--text-dim)] font-mono mt-3 break-all">
              {TREASURY_ADDRESS}
            </p>
            <a
              href={`https://explorer.solana.com/address/${TREASURY_ADDRESS}?cluster=devnet`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-[var(--accent)] hover:underline mt-2"
            >
              View on Explorer <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>

      {/* Allocations */}
      <h2 className="font-display text-lg font-semibold text-[var(--text)] mb-5">
        Allocations (governance-approved)
      </h2>
      <ul className="space-y-4">
        {allocations.map((a) => (
          <li
            key={a.id}
            className="rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-5 md:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition hover:border-[var(--border-hover)]"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-[var(--bg-elevated)] flex items-center justify-center shrink-0">
                <Coins className="h-6 w-6 text-[var(--accent)]" />
              </div>
              <div>
                <p className="font-display font-semibold text-[var(--text)]">{a.label}</p>
                <p className="text-sm text-[var(--text-muted)] mt-0.5">{a.description}</p>
              </div>
            </div>
            <p className="font-display text-xl font-semibold text-[var(--accent)] shrink-0">
              {a.amountSol} SOL
            </p>
          </li>
        ))}
      </ul>

      <p className="mt-8 text-sm text-[var(--text-dim)] leading-relaxed">
        New allocations or changes require a passed treasury proposal. Create a proposal from the DAO overview.
      </p>
      </div>
    </div>
  );
}
