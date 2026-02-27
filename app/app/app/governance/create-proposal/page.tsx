'use client';

import { useWallet, useConnection } from '@solana/wallet-adapter-react';
import { useState } from 'react';
import Link from 'next/link';
import { ConnectScreen } from '@/components/ConnectScreen';
import { DaoNav } from '@/components/DaoNav';
import type { ProposalCategory } from '@/lib/governance-data';
import {
  getDaoProgram,
  getDaoConfigPda,
  getProposalPda,
  fetchDaoConfig,
} from '@/lib/dao-program';
import { getConnection } from '@/lib/solana';
import { SystemProgram } from '@solana/web3.js';
import { ArrowLeft, Check, FileText, Loader2 } from 'lucide-react';

const CATEGORIES: { value: ProposalCategory; label: string }[] = [
  { value: 'Supplier Approval', label: 'Supplier Approval' },
  { value: 'Asset Standard', label: 'Asset Standard' },
  { value: 'Treasury', label: 'Treasury' },
];

const CATEGORY_TO_U8: Record<ProposalCategory, number> = {
  'Supplier Approval': 0,
  'Asset Standard': 1,
  Treasury: 2,
};

export default function CreateProposalPage() {
  const wallet = useWallet();
  const { connection } = useConnection();
  const [category, setCategory] = useState<ProposalCategory>('Supplier Approval');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!wallet.publicKey) return;
    const conn = connection || getConnection();
    const { program, error: programError } = getDaoProgram(conn, wallet);
    if (!program) {
      setError(programError ?? 'Wallet not ready');
      return;
    }
    setLoading(true);
    try {
      const daoConfigPda = getDaoConfigPda();
      const config = await fetchDaoConfig(conn);
      if (!config) {
        setError('DAO not initialized. Ask an admin to run Initialize DAO first.');
        setLoading(false);
        return;
      }
      const proposalPda = getProposalPda(daoConfigPda, config.nextProposalId);
      await program.methods
        .createProposal(title.trim(), description.trim(), CATEGORY_TO_U8[category])
        .accounts({
          proposer: wallet.publicKey,
          daoConfig: daoConfigPda,
          proposal: proposalPda,
          systemProgram: SystemProgram.programId,
        })
        .rpc();
      setSubmitted(true);
    } catch (err: any) {
      setError(err?.message || 'Transaction failed');
    } finally {
      setLoading(false);
    }
  };

  if (!wallet.connected) return <ConnectScreen />;

  if (submitted) {
    return (
      <div className="container-wide py-8 md:py-12">
        <div className="mb-6"><DaoNav /></div>
        <div className="container-narrow max-w-2xl py-16 text-center">
          <div className="w-16 h-16 rounded-2xl bg-[var(--accent-muted)] border border-[var(--accent)]/30 flex items-center justify-center mx-auto mb-6">
            <Check className="h-8 w-8 text-[var(--accent)]" />
          </div>
          <h1 className="font-display text-2xl font-semibold text-[var(--text)] mb-2">Proposal created</h1>
          <p className="text-[var(--text-muted)] mb-8 max-w-sm mx-auto">
            It will appear in the proposals list after confirmation. Voting opens for 72 hours.
          </p>
          <Link href="/app/governance/proposals" className="btn-primary rounded-xl px-6 py-3">
            View proposals
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container-wide py-8 md:py-12">
      <div className="mb-6">
        <DaoNav />
      </div>
      <div className="container-narrow max-w-2xl">
      <Link
        href="/app/governance/proposals"
        className="inline-flex items-center gap-2 text-sm text-[var(--text-muted)] hover:text-[var(--accent)] mb-8 transition"
      >
        <ArrowLeft className="h-4 w-4" /> Proposals
      </Link>

      <div className="mb-10">
        <p className="text-xs font-medium uppercase tracking-wider text-[var(--accent)] mb-1">
          Governance
        </p>
        <h1 className="font-display text-2xl md:text-3xl font-semibold text-[var(--text)] tracking-tight mb-2">
          Create proposal
        </h1>
        <p className="text-[var(--text-muted)] text-sm leading-relaxed">
          Propose supplier approval, asset standard change, or treasury allocation. Requires Governance NFT.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-6 md:p-8 max-w-2xl space-y-8"
      >
        {error && (
          <p className="text-sm text-red-400 bg-red-500/10 rounded-xl p-3">{error}</p>
        )}
        <div>
          <label className="block text-sm font-medium text-[var(--text)] mb-2">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value as ProposalCategory)}
            className="input-base w-full rounded-xl border-[var(--border)] bg-[var(--bg-elevated)] focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)]/30"
          >
            {CATEGORIES.map((c) => (
              <option key={c.value} value={c.value}>{c.label}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-[var(--text)] mb-2">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. List supplier: Green Biomass Co."
            className="input-base w-full rounded-xl border-[var(--border)] bg-[var(--bg-elevated)] focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)]/30"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-[var(--text)] mb-2">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe the proposal and rationale..."
            className="input-base w-full min-h-[140px] rounded-xl border-[var(--border)] bg-[var(--bg-elevated)] focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)]/30 resize-y"
            required
          />
        </div>
        <div className="flex flex-wrap gap-3 pt-2">
          <button
            type="submit"
            disabled={loading}
            className="btn-primary rounded-xl px-6 py-3 inline-flex items-center gap-2 disabled:opacity-50"
          >
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <FileText className="h-4 w-4" />}
            {loading ? 'Creating…' : 'Create proposal'}
          </button>
          <Link
            href="/app/governance/proposals"
            className="rounded-xl border border-[var(--border)] bg-transparent px-6 py-3 text-sm font-medium text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--bg-elevated)] transition"
          >
            Cancel
          </Link>
        </div>
      </form>
      </div>
    </div>
  );
}
