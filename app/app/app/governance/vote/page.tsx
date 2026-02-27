'use client';

import { useWallet } from '@solana/wallet-adapter-react';
import Link from 'next/link';
import { ConnectScreen } from '@/components/ConnectScreen';
import { DaoNav } from '@/components/DaoNav';
import { getActiveProposals, DAO_META } from '@/lib/governance-data';
import { Vote, ArrowRight, Clock } from 'lucide-react';

export default function VotePage() {
  const { connected } = useWallet();
  const active = getActiveProposals();

  if (!connected) return <ConnectScreen />;

  return (
    <div className="container-wide py-8 md:py-12">
      <div className="mb-6">
        <DaoNav />
      </div>
      <div className="mb-10">
        <p className="text-xs font-medium uppercase tracking-wider text-[var(--accent)] mb-1">
          Governance
        </p>
        <h1 className="font-display text-3xl md:text-4xl font-semibold text-[var(--text)] tracking-tight mb-3">
          Vote
        </h1>
        <p className="text-[var(--text-muted)] text-base max-w-xl">
          Active proposals open for voting ({DAO_META.votingPeriodHours}-hour window). 1 Governance NFT = 1 vote.
        </p>
      </div>

      {active.length === 0 ? (
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-12 md:p-16 text-center">
          <div className="w-16 h-16 rounded-2xl bg-[var(--bg-elevated)] flex items-center justify-center mx-auto mb-6">
            <Vote className="h-8 w-8 text-[var(--text-dim)]" />
          </div>
          <p className="text-[var(--text-muted)] mb-4">No active proposals to vote on.</p>
          <Link
            href="/app/governance/proposals"
            className="text-sm font-medium text-[var(--accent)] hover:underline inline-flex items-center gap-1"
          >
            View all proposals <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      ) : (
        <ul className="space-y-4">
          {active.map((p) => {
            const total = p.votesYes + p.votesNo;
            const yesPct = total ? Math.round((p.votesYes / total) * 100) : 0;
            return (
              <li key={p.id}>
                <Link
                  href={`/app/governance/proposal/${p.id}`}
                  className="group block rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-5 md:p-6 transition hover:border-[var(--accent)]/30 hover:bg-[var(--bg-elevated)]"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="min-w-0">
                      <span className="text-xs font-medium text-[var(--accent)]">{p.category}</span>
                      <h2 className="font-display font-semibold text-[var(--text)] mt-1 group-hover:text-[var(--accent)] transition">
                        {p.title}
                      </h2>
                      <div className="flex items-center gap-2 mt-2 text-sm text-[var(--text-muted)]">
                        <Clock className="h-3.5 w-3.5" />
                        Ends {new Date(p.votingEndsAt).toLocaleString(undefined, { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>
                    <div className="flex items-center gap-4 shrink-0">
                      <div className="w-20 h-1.5 rounded-full bg-[var(--bg-elevated)] overflow-hidden">
                        <div className="h-full rounded-full bg-[var(--accent)]" style={{ width: `${yesPct}%` }} />
                      </div>
                      <span className="rounded-xl bg-[var(--accent)] text-black px-4 py-2 text-sm font-medium inline-flex items-center gap-2 shrink-0">
                        Vote <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition" />
                      </span>
                    </div>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
