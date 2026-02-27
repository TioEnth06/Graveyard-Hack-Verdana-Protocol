'use client';

import { useWallet, useConnection } from '@solana/wallet-adapter-react';
import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { ConnectScreen } from '@/components/ConnectScreen';
import { DaoNav } from '@/components/DaoNav';
import { getProposals, type ProposalStatus } from '@/lib/governance-data';
import { fetchAllProposals } from '@/lib/dao-program';
import { getConnection } from '@/lib/solana';
import { ArrowRight, Plus, FileText } from 'lucide-react';

const statusConfig: Record<ProposalStatus, { label: string; class: string }> = {
  Active: { label: 'Active', class: 'bg-[var(--accent-muted)] text-[var(--accent)]' },
  Passed: { label: 'Passed', class: 'bg-emerald-500/15 text-emerald-400' },
  Rejected: { label: 'Rejected', class: 'bg-red-500/15 text-red-400' },
  Executed: { label: 'Executed', class: 'bg-[var(--text-dim)]/20 text-[var(--text-muted)]' },
};

type ProposalRow = { id: string; title: string; description: string; category: string; status: string; votesYes: number; votesNo: number; isOnChain?: boolean };

export default function GovernanceProposalsPage() {
  const { connected } = useWallet();
  const { connection } = useConnection();
  const [statusFilter, setStatusFilter] = useState<ProposalStatus | 'all'>('all');
  const [onChainProposals, setOnChainProposals] = useState<ProposalRow[]>([]);
  const mockProposals = getProposals();

  useEffect(() => {
    let cancelled = false;
    const run = async () => {
      const conn = connection || getConnection();
      const list = await fetchAllProposals(conn);
      if (cancelled) return;
      setOnChainProposals(
        list.map((p, i) => {
          const toNum = (x: any) => (x?.toNumber ? x.toNumber() : Number(x ?? 0));
          const status = p.status?.active !== undefined ? 'Active' : p.status?.passed !== undefined ? 'Passed' : 'Rejected';
          return {
            id: `onchain-${i}`,
            title: p.title,
            description: p.description,
            category: 'On-chain',
            status,
            votesYes: toNum(p.votesYes),
            votesNo: toNum(p.votesNo),
            isOnChain: true,
          };
        })
      );
    };
    run();
    return () => { cancelled = true; };
  }, [connection]);

  const proposals: ProposalRow[] = useMemo(() => {
    const mock: ProposalRow[] = mockProposals.map((p) => ({
      id: p.id,
      title: p.title,
      description: p.description,
      category: p.category,
      status: p.status,
      votesYes: p.votesYes,
      votesNo: p.votesNo,
    }));
    return [...onChainProposals, ...mock];
  }, [mockProposals, onChainProposals]);

  const filtered = useMemo(() => {
    if (statusFilter === 'all') return proposals;
    return proposals.filter((p) => p.status === statusFilter);
  }, [proposals, statusFilter]);

  if (!connected) return <ConnectScreen />;

  return (
    <div className="container-wide py-8 md:py-12">
      <div className="mb-6">
        <DaoNav />
      </div>
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-8">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-[var(--accent)] mb-1">
            Governance
          </p>
          <h1 className="font-display text-3xl md:text-4xl font-semibold text-[var(--text)] tracking-tight">
            Proposals
          </h1>
          <p className="text-[var(--text-muted)] text-sm mt-1">All governance proposals</p>
        </div>
        <Link
          href="/app/governance/create-proposal"
          className="btn-primary shrink-0 rounded-xl inline-flex items-center gap-2 px-5 py-3"
        >
          <Plus className="h-4 w-4" /> Create proposal
        </Link>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 p-1 rounded-xl bg-[var(--bg-card)] border border-[var(--border)] w-fit mb-8">
        {(['all', 'Active', 'Passed', 'Rejected', 'Executed'] as const).map((key) => (
          <button
            key={key}
            type="button"
            onClick={() => setStatusFilter(key)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
              statusFilter === key
                ? 'bg-[var(--accent)] text-black'
                : 'text-[var(--text-muted)] hover:text-[var(--text)]'
            }`}
          >
            {key === 'all' ? 'All' : key}
          </button>
        ))}
      </div>

      {/* List */}
      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-12 text-center">
          <FileText className="h-12 w-12 text-[var(--text-dim)] mx-auto mb-4" />
          <p className="text-[var(--text-muted)]">No proposals match this filter.</p>
        </div>
      ) : (
        <ul className="space-y-4">
          {filtered.map((p) => {
            const config = statusConfig[p.status as ProposalStatus] ?? { label: p.status, class: 'bg-[var(--text-dim)]/20 text-[var(--text-muted)]' };
            const total = p.votesYes + p.votesNo;
            const yesPct = total ? Math.round((p.votesYes / total) * 100) : 0;
            return (
              <li key={p.isOnChain ? `onchain-${p.id}` : `mock-${p.id}`}>
                <Link
                  href={`/app/governance/proposal/${p.id}`}
                  className="group block rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-5 md:p-6 transition hover:border-[var(--accent)]/30 hover:bg-[var(--bg-elevated)]"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <span className={`inline-flex px-2.5 py-1 rounded-lg text-xs font-medium ${config.class}`}>
                          {config.label}
                        </span>
                        <span className="text-xs text-[var(--text-dim)]">{p.category}</span>
                      </div>
                      <h2 className="font-display font-semibold text-[var(--text)] group-hover:text-[var(--accent)] transition">
                        {p.title}
                      </h2>
                      <p className="text-sm text-[var(--text-muted)] mt-1 line-clamp-2">{p.description}</p>
                    </div>
                    <div className="flex items-center gap-6 shrink-0">
                      <div className="hidden sm:block w-20 h-1.5 rounded-full bg-[var(--bg-elevated)] overflow-hidden">
                        <div
                          className="h-full rounded-full bg-[var(--accent)]"
                          style={{ width: `${yesPct}%` }}
                        />
                      </div>
                      <div className="text-right text-sm">
                        <span className="text-[var(--accent)] font-medium">{p.votesYes} Yes</span>
                        <span className="text-[var(--text-muted)] mx-1">·</span>
                        <span className="text-[var(--text-dim)]">{p.votesNo} No</span>
                      </div>
                      <ArrowRight className="h-5 w-5 text-[var(--text-dim)] group-hover:text-[var(--accent)] group-hover:translate-x-0.5 transition" />
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
