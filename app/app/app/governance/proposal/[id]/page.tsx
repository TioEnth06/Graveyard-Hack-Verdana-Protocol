'use client';

import { useParams } from 'next/navigation';
import { useWallet, useConnection } from '@solana/wallet-adapter-react';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ConnectScreen } from '@/components/ConnectScreen';
import { DaoNav } from '@/components/DaoNav';
import { getProposalById } from '@/lib/governance-data';
import {
  getDaoProgram,
  getDaoConfigPda,
  getProposalPda,
  getVoteRecordPda,
  fetchProposal,
  type ProposalAccount,
} from '@/lib/dao-program';
import { getConnection } from '@/lib/solana';
import { SystemProgram } from '@solana/web3.js';
import { ArrowLeft, ThumbsUp, ThumbsDown, ExternalLink, Calendar, User, Loader2 } from 'lucide-react';

const statusConfig: Record<string, string> = {
  Active: 'bg-[var(--accent-muted)] text-[var(--accent)]',
  Passed: 'bg-emerald-500/15 text-emerald-400',
  Rejected: 'bg-red-500/15 text-red-400',
  Executed: 'bg-[var(--text-dim)]/20 text-[var(--text-muted)]',
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleString(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

function formatTs(ts: number) {
  return new Date(ts * 1000).toISOString();
}

const CATEGORY_LABELS: Record<string, string> = {
  supplierApproval: 'Supplier Approval',
  assetStandard: 'Asset Standard',
  treasury: 'Treasury',
};

type ProposalDisplay = {
  id: string;
  title: string;
  description: string;
  category: string;
  proposer: string;
  votesYes: number;
  votesNo: number;
  status: string;
  createdAt: string;
  votingEndsAt: string;
  isOnChain?: boolean;
  proposalIdNum?: number;
  executionTx?: string;
};

function proposalFromChain(acc: ProposalAccount, proposalIdNum: number): ProposalDisplay {
  const toNum = (x: any) => (x?.toNumber ? x.toNumber() : Number(x ?? 0));
  const status =
    acc.status?.active !== undefined ? 'Active' : acc.status?.passed !== undefined ? 'Passed' : 'Rejected';
  const categoryKey = acc.category?.supplierApproval !== undefined ? 'supplierApproval' : acc.category?.assetStandard !== undefined ? 'assetStandard' : 'treasury';
  return {
    id: String(proposalIdNum),
    title: acc.title,
    description: acc.description,
    category: CATEGORY_LABELS[categoryKey] ?? 'Treasury',
    proposer: (() => {
      const b = acc.proposer?.toBase58?.();
      return b ? `${b.slice(0, 6)}...${b.slice(-4)}` : '—';
    })(),
    votesYes: toNum(acc.votesYes),
    votesNo: toNum(acc.votesNo),
    status,
    createdAt: formatTs(toNum(acc.createdAt)),
    votingEndsAt: formatTs(toNum(acc.votingEndsAt)),
    isOnChain: true,
    proposalIdNum,
  };
}

function proposalFromMock(m: { id: string; title: string; description: string; category: string; proposer: string; votesYes: number; votesNo: number; status: string; createdAt: string; votingEndsAt: string; executionTx?: string }): ProposalDisplay {
  return { ...m, id: m.id };
}

export default function ProposalDetailPage() {
  const params = useParams();
  const wallet = useWallet();
  const { connection } = useConnection();
  const id = typeof params?.id === 'string' ? params.id : '';
  const [proposal, setProposal] = useState<ProposalDisplay | null>(null);
  const [loading, setLoading] = useState(true);
  const [voted, setVoted] = useState<'yes' | 'no' | null>(null);
  const [voteLoading, setVoteLoading] = useState(false);
  const [voteError, setVoteError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    const run = async () => {
      if (!id) {
        setProposal(null);
        setLoading(false);
        return;
      }
      const conn = connection || getConnection();
      const isOnChainId = id.startsWith('onchain-');
      const numStr = isOnChainId ? id.replace('onchain-', '') : id;
      const idNum = /^\d+$/.test(numStr) ? parseInt(numStr, 10) : null;

      if (isOnChainId && idNum !== null) {
        const onChain = await fetchProposal(conn, idNum);
        if (!cancelled) setProposal(onChain ? proposalFromChain(onChain, idNum) : null);
      } else if (idNum !== null) {
        const onChain = await fetchProposal(conn, idNum);
        if (!cancelled && onChain) {
          setProposal(proposalFromChain(onChain, idNum));
        } else if (!cancelled) {
          const mock = getProposalById(id);
          setProposal(mock ? proposalFromMock(mock as any) : null);
        }
      } else {
        const mock = getProposalById(id);
        if (!cancelled) setProposal(mock ? proposalFromMock(mock as any) : null);
      }
      if (!cancelled) setLoading(false);
    };
    run();
    return () => { cancelled = true; };
  }, [id, connection]);

  const handleVote = async (side: 'yes' | 'no') => {
    if (!proposal?.isOnChain || proposal.proposalIdNum === undefined || !wallet.publicKey) return;
    setVoteError(null);
    setVoteLoading(true);
    const conn = connection || getConnection();
    const { program, error: programError } = getDaoProgram(conn, wallet);
    if (!program) {
      setVoteError(programError ?? 'Wallet not ready');
      setVoteLoading(false);
      return;
    }
    try {
      const daoConfigPda = getDaoConfigPda();
      const proposalPda = getProposalPda(daoConfigPda, proposal.proposalIdNum);
      const voteRecordPda = getVoteRecordPda(proposalPda, wallet.publicKey);
      await program.methods
        .castVote(side === 'yes')
        .accounts({
          voter: wallet.publicKey,
          daoConfig: daoConfigPda,
          proposal: proposalPda,
          voteRecord: voteRecordPda,
          systemProgram: SystemProgram.programId,
        })
        .rpc();
      setVoted(side);
      const updated = await fetchProposal(conn, proposal.proposalIdNum);
      if (updated) setProposal(proposalFromChain(updated, proposal.proposalIdNum));
    } catch (err: any) {
      setVoteError(err?.message || 'Vote failed');
    } finally {
      setVoteLoading(false);
    }
  };

  if (!wallet.connected) return <ConnectScreen />;

  if (loading) {
    return (
      <div className="container-wide py-8 md:py-12">
        <div className="mb-6"><DaoNav /></div>
        <div className="container-narrow flex items-center justify-center py-24">
          <Loader2 className="h-8 w-8 animate-spin text-[var(--accent)]" />
        </div>
      </div>
    );
  }

  if (!proposal) {
    return (
      <div className="container-wide py-8 md:py-12">
        <div className="mb-6"><DaoNav /></div>
        <div className="container-narrow py-16 text-center">
          <h1 className="font-display text-xl font-semibold text-[var(--text)] mb-2">Proposal not found</h1>
          <Link href="/app/governance/proposals" className="text-sm text-[var(--accent)] hover:underline">
            ← Proposals
          </Link>
        </div>
      </div>
    );
  }

  const totalVotes = proposal.votesYes + proposal.votesNo;
  const yesPct = totalVotes ? Math.round((proposal.votesYes / totalVotes) * 100) : 0;
  const isActive = proposal.status === 'Active';
  const votingEnded = new Date(proposal.votingEndsAt) < new Date();

  return (
    <div className="container-wide py-8 md:py-12">
      <div className="mb-6">
        <DaoNav />
      </div>
      <div className="container-narrow">
      <Link
        href="/app/governance/proposals"
        className="inline-flex items-center gap-2 text-sm text-[var(--text-muted)] hover:text-[var(--accent)] mb-8 transition"
      >
        <ArrowLeft className="h-4 w-4" /> Proposals
      </Link>

      {proposal.isOnChain && (
        <span className="inline-block px-2.5 py-1 rounded-lg text-xs font-medium bg-[var(--accent-muted)] text-[var(--accent)] mb-4">
          On-chain
        </span>
      )}

      <div className="flex flex-wrap items-center gap-2 mb-6">
        <span className={`px-3 py-1.5 rounded-xl text-xs font-medium ${statusConfig[proposal.status] ?? ''}`}>
          {proposal.status}
        </span>
        <span className="text-sm text-[var(--text-dim)]">{proposal.category}</span>
      </div>

      <h1 className="font-display text-2xl md:text-3xl font-semibold text-[var(--text)] tracking-tight mb-6">
        {proposal.title}
      </h1>

      <div className="flex flex-wrap gap-4 text-sm text-[var(--text-muted)] mb-8">
        <span className="inline-flex items-center gap-1.5">
          <User className="h-4 w-4" /> {proposal.proposer}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <Calendar className="h-4 w-4" /> Created {formatDate(proposal.createdAt)}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <Calendar className="h-4 w-4" /> Voting ends {formatDate(proposal.votingEndsAt)}
        </span>
      </div>

      <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-6 md:p-8 mb-8">
        <h2 className="font-display text-lg font-semibold text-[var(--text)] mb-4">Description</h2>
        <p className="text-[var(--text-muted)] text-sm leading-relaxed whitespace-pre-wrap">
          {proposal.description}
        </p>
      </div>

      <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-6 md:p-8 mb-8">
        <h2 className="font-display text-lg font-semibold text-[var(--text)] mb-6">Votes</h2>
        <div className="grid grid-cols-2 gap-6 mb-6">
          <div className="rounded-xl bg-[var(--accent-muted)]/30 p-4">
            <p className="text-2xl font-display font-semibold text-[var(--accent)]">{proposal.votesYes}</p>
            <p className="text-sm text-[var(--text-muted)]">Yes · {yesPct}%</p>
          </div>
          <div className="rounded-xl bg-[var(--bg-elevated)] p-4">
            <p className="text-2xl font-display font-semibold text-[var(--text)]">{proposal.votesNo}</p>
            <p className="text-sm text-[var(--text-muted)]">No · {100 - yesPct}%</p>
          </div>
        </div>
        <div className="h-3 rounded-full bg-[var(--bg-elevated)] overflow-hidden">
          <div
            className="h-full rounded-full bg-[var(--accent)] transition-all duration-500"
            style={{ width: `${yesPct}%` }}
          />
        </div>
      </div>

      {isActive && !votingEnded && (
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-6 md:p-8 mb-8">
          <h2 className="font-display text-lg font-semibold text-[var(--text)] mb-4">Your vote</h2>
          {voteError && (
            <p className="text-sm text-red-400 mb-3">{voteError}</p>
          )}
          {voted ? (
            <p className="text-sm text-[var(--text-muted)]">
              You voted <strong className="text-[var(--text)]">{voted === 'yes' ? 'Yes' : 'No'}</strong>.
              {proposal.isOnChain ? ' Your vote is recorded on-chain.' : ' Your vote is recorded locally (demo).'}
            </p>
          ) : proposal.isOnChain ? (
            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                disabled={voteLoading}
                onClick={() => handleVote('yes')}
                className="rounded-xl bg-[var(--accent)] text-black px-6 py-3 font-medium inline-flex items-center gap-2 hover:opacity-90 transition disabled:opacity-50"
              >
                {voteLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <ThumbsUp className="h-4 w-4" />}
                Vote Yes
              </button>
              <button
                type="button"
                disabled={voteLoading}
                onClick={() => handleVote('no')}
                className="rounded-xl border border-[var(--border)] bg-[var(--bg-elevated)] text-[var(--text)] px-6 py-3 font-medium inline-flex items-center gap-2 hover:bg-[var(--bg-card)] transition disabled:opacity-50"
              >
                <ThumbsDown className="h-4 w-4" /> Vote No
              </button>
            </div>
          ) : (
            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => {
                  setVoted('yes');
                  setProposal((prev) => prev ? { ...prev, votesYes: prev.votesYes + 1 } : null);
                }}
                className="rounded-xl bg-[var(--accent)] text-black px-6 py-3 font-medium inline-flex items-center gap-2 hover:opacity-90 transition"
              >
                <ThumbsUp className="h-4 w-4" /> Vote Yes
              </button>
              <button
                type="button"
                onClick={() => {
                  setVoted('no');
                  setProposal((prev) => prev ? { ...prev, votesNo: prev.votesNo + 1 } : null);
                }}
                className="rounded-xl border border-[var(--border)] bg-[var(--bg-elevated)] text-[var(--text)] px-6 py-3 font-medium inline-flex items-center gap-2 hover:bg-[var(--bg-card)] transition"
              >
                <ThumbsDown className="h-4 w-4" /> Vote No
              </button>
            </div>
          )}
        </div>
      )}

      {proposal.executionTx && (
        <a
          href={`https://explorer.solana.com/tx/${proposal.executionTx}?cluster=devnet`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm text-[var(--accent)] hover:underline"
        >
          View execution on Explorer <ExternalLink className="h-4 w-4" />
        </a>
      )}
      </div>
    </div>
  );
}
