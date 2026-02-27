'use client';

import { useWallet, useConnection } from '@solana/wallet-adapter-react';
import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { ConnectScreen } from '@/components/ConnectScreen';
import {
  getActiveProposals,
  getProposals,
  TREASURY_TOTAL_SOL,
  DAO_META,
  type Proposal,
} from '@/lib/governance-data';
import { DaoNav } from '@/components/DaoNav';
import { fetchDaoConfig, fetchAllProposals, getDaoProgram, getDaoConfigPda } from '@/lib/dao-program';
import { getConnection } from '@/lib/solana';
import { SystemProgram } from '@solana/web3.js';
import {
  Vote,
  FileText,
  Wallet,
  Sparkles,
  ArrowRight,
  Clock,
  Users,
  Plus,
  MessageCircle,
  CheckCircle2,
  XCircle,
  Loader2,
} from 'lucide-react';

export default function GovernanceOverviewPage() {
  const wallet = useWallet();
  const { connection } = useConnection();
  const [hasSBT, setHasSBT] = useState(false);
  const [daoInitialized, setDaoInitialized] = useState<boolean | null>(null);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [initLoading, setInitLoading] = useState(false);
  const [initError, setInitError] = useState<string | null>(null);
  const [demoMode, setDemoMode] = useState(false);
  const [onChainProposals, setOnChainProposals] = useState<Proposal[]>([]);

  useEffect(() => {
    try {
      setDemoMode(sessionStorage.getItem('verdana-dao-demo') === '1');
    } catch {}
  }, []);
  const enableDemoMode = useCallback(() => {
    try {
      sessionStorage.setItem('verdana-dao-demo', '1');
    } catch {}
    setDemoMode(true);
    setInitError(null);
  }, []);

  useEffect(() => {
    let cancelled = false;
    const run = async () => {
      try {
        const conn = connection ?? getConnection();
        const list = await fetchAllProposals(conn);
        if (cancelled) return;
        const toNum = (x: any) => (x?.toNumber ? x.toNumber() : Number(x ?? 0));
        const mapped: Proposal[] = list.map((p, i) => {
          const status: Proposal['status'] = p.status?.active !== undefined ? 'Active' : p.status?.passed !== undefined ? 'Passed' : 'Rejected';
          const category: Proposal['category'] = p.category?.supplierApproval !== undefined ? 'Supplier Approval' : p.category?.assetStandard !== undefined ? 'Asset Standard' : 'Treasury';
          const proposer = p.proposer?.toBase58?.() ? `${p.proposer.toBase58().slice(0, 6)}...${p.proposer.toBase58().slice(-4)}` : '—';
          return {
            id: `onchain-${i}`,
            title: p.title,
            description: p.description,
            category,
            status,
            createdAt: new Date(toNum(p.createdAt) * 1000).toISOString(),
            votingEndsAt: new Date(toNum(p.votingEndsAt) * 1000).toISOString(),
            votesYes: toNum(p.votesYes),
            votesNo: toNum(p.votesNo),
            proposer,
          };
        });
        setOnChainProposals(mapped);
      } catch {
        if (!cancelled) setOnChainProposals([]);
      }
    };
    run();
    return () => { cancelled = true; };
  }, [connection]);

  const mockActive = getActiveProposals();
  const mockAll = getProposals();
  const all = [...mockAll, ...onChainProposals];
  const active = [...mockActive, ...onChainProposals.filter((p) => p.status === 'Active')];
  const recentProposals = [...all].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  ).slice(0, 5);

  useEffect(() => {
    let cancelled = false;
    setFetchError(null);
    const run = async () => {
      try {
        const conn = connection ?? getConnection();
        const config = await fetchDaoConfig(conn);
        if (!cancelled) {
          setDaoInitialized(config !== null);
          setFetchError(null);
        }
      } catch (e: any) {
        if (cancelled) return;
        const msg = e?.message ?? String(e);
        setDaoInitialized(false);
        if (msg.includes('Assertion failed') || msg.includes('assert')) {
          setFetchError('Could not verify DAO status. Use "Use demo mode" to try governance with sample proposals.');
        } else if (msg.includes('fetch') || msg.includes('network') || msg.includes('Failed')) {
          setFetchError('Could not reach the network. Check your connection and try again.');
        } else {
          setFetchError('Could not check DAO status. Ensure the app is using devnet and try again.');
        }
      }
    };
    run();
    return () => { cancelled = true; };
  }, [connection]);

  const handleMintSBT = () => setHasSBT(true);

  const handleInitDao = async () => {
    setInitError(null);
    if (!wallet.publicKey) {
      setInitError('Please connect your wallet first.');
      return;
    }
    setInitLoading(true);
    const conn = connection || getConnection();
    const { program, error: programError } = getDaoProgram(conn, wallet);
    if (!program) {
      setInitError(programError ?? 'Could not create the DAO client. Ensure your wallet is connected and the ecosol_dao program is deployed on devnet.');
      setInitLoading(false);
      return;
    }
    try {
      const daoConfigPda = getDaoConfigPda();
      await program.methods
        .initializeDao()
        .accounts({
          authority: wallet.publicKey,
          daoConfig: daoConfigPda,
          systemProgram: SystemProgram.programId,
        })
        .rpc();
      setDaoInitialized(true);
    } catch (err: any) {
      const msg = err?.message || String(err);
      if (msg.includes('Assertion failed') || msg.includes('assert')) {
        setInitError('Transaction failed (program or network). Deploy ecosol_dao to devnet and ensure your wallet is on devnet, or use Demo mode to try governance with sample proposals.');
      } else if (msg.includes('Program') && (msg.includes('not found') || msg.includes('invalid'))) {
        setInitError('DAO program is not deployed on this network. Deploy ecosol_dao to devnet first.');
      } else {
        setInitError(msg || 'Initialize failed. Check your wallet and network.');
      }
    } finally {
      setInitLoading(false);
    }
  };

  if (!wallet.connected) return <ConnectScreen />;

  return (
    <div className="container-wide py-8 md:py-12">
      {/* DAO identity - Realms-style header */}
      <div className="mb-8">
        <div className="flex items-start gap-4">
          <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-[var(--accent-muted)] flex items-center justify-center shrink-0">
            <Vote className="h-7 w-7 md:h-8 md:w-8 text-[var(--accent)]" />
          </div>
          <div className="min-w-0">
            <h1 className="font-display text-2xl md:text-3xl font-semibold text-[var(--text)] tracking-tight">
              {DAO_META.name}
            </h1>
            <p className="text-[var(--accent)] text-sm font-medium mt-0.5">
              {DAO_META.tagline}
            </p>
            <p className="text-[var(--text-muted)] text-sm mt-2 max-w-2xl leading-relaxed">
              {DAO_META.description}
            </p>
          </div>
        </div>
      </div>

      <DaoNav />

      {daoInitialized === null && (
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-5 mb-8 flex items-center gap-3">
          <Loader2 className="h-5 w-5 animate-spin text-[var(--accent)] shrink-0" />
          <p className="text-sm text-[var(--text-muted)]">Checking DAO status…</p>
        </div>
      )}
      {daoInitialized === false && !demoMode && (
        <div className="rounded-2xl border border-[var(--accent)]/30 bg-[var(--accent-muted)]/20 p-5 mb-8">
          <p className="font-medium text-[var(--text)] mb-1">DAO not initialized on-chain</p>
          <p className="text-sm text-[var(--text-muted)] mb-4">
            The DAO config account has not been created yet. Run &quot;Initialize DAO&quot; once (with the program deployed on <strong>devnet</strong>) to enable creating and voting on proposals.
          </p>
          {fetchError && (
            <p className="text-sm text-amber-600 dark:text-amber-400 mb-3 px-3 py-2 rounded-lg bg-amber-500/10">{fetchError}</p>
          )}
          {initError && (
            <p className="text-sm text-red-400 mb-3 px-3 py-2 rounded-lg bg-red-500/10">{initError}</p>
          )}
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              disabled={initLoading || !wallet.publicKey}
              onClick={handleInitDao}
              className="rounded-xl bg-[var(--accent)] text-black px-4 py-2 text-sm font-medium inline-flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {initLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
              {initLoading ? 'Initializing…' : 'Initialize DAO (one-time)'}
            </button>
            <button
              type="button"
              onClick={enableDemoMode}
              className="rounded-xl border border-[var(--border)] bg-[var(--bg-card)] text-[var(--text)] px-4 py-2 text-sm font-medium hover:bg-[var(--bg-elevated)] transition"
            >
              Use demo mode
            </button>
          </div>
          {!wallet.publicKey && (
            <p className="text-xs text-[var(--text-muted)] mt-2">Connect your wallet to enable Initialize DAO. You can use demo mode without initializing.</p>
          )}
        </div>
      )}
      {demoMode && daoInitialized === false && (
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-3 mb-8 flex items-center justify-between gap-4 flex-wrap">
          <p className="text-sm text-[var(--text-muted)]">
            <strong className="text-[var(--accent)]">Demo mode.</strong> You can view and vote on sample proposals. On-chain create/vote requires Initialize DAO.
          </p>
          <button
            type="button"
            onClick={() => { try { sessionStorage.removeItem('verdana-dao-demo'); } catch {} setDemoMode(false); }}
            className="text-xs font-medium text-[var(--text-muted)] hover:text-[var(--accent)]"
          >
            Exit demo mode
          </button>
        </div>
      )}

      {/* Stats row - like Realms dashboard */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 my-8">
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-4 md:p-5">
          <div className="flex items-center gap-2 text-[var(--text-muted)] text-sm mb-1">
            <Wallet className="h-4 w-4" /> Treasury
          </div>
          <p className="font-display text-xl md:text-2xl font-semibold text-[var(--text)]">
            {TREASURY_TOTAL_SOL} SOL
          </p>
        </div>
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-4 md:p-5">
          <div className="flex items-center gap-2 text-[var(--text-muted)] text-sm mb-1">
            <FileText className="h-4 w-4" /> Proposals
          </div>
          <p className="font-display text-xl md:text-2xl font-semibold text-[var(--text)]">
            {all.length}
          </p>
        </div>
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-4 md:p-5">
          <div className="flex items-center gap-2 text-[var(--text-muted)] text-sm mb-1">Active</div>
          <p className="font-display text-xl md:text-2xl font-semibold text-[var(--accent)]">
            {active.length}
          </p>
        </div>
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-4 md:p-5">
          <div className="flex items-center gap-2 text-[var(--text-muted)] text-sm mb-1">
            <Users className="h-4 w-4" /> Members
          </div>
          <p className="font-display text-xl md:text-2xl font-semibold text-[var(--text)]">
            {DAO_META.memberCount}
          </p>
        </div>
        <div className="col-span-2 lg:col-span-1 rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-4 md:p-5">
          <div className="flex items-center gap-2 text-[var(--text-muted)] text-sm mb-1">
            <Clock className="h-4 w-4" /> Voting
          </div>
          <p className="font-display text-xl md:text-2xl font-semibold text-[var(--text)]">
            {DAO_META.votingPeriodHours}h
          </p>
        </div>
      </div>

      {/* Participate / Collaborate - clear CTAs */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-10">
        {!hasSBT ? (
          <div className="lg:col-span-2 rounded-2xl border border-[var(--accent)]/20 bg-gradient-to-br from-[var(--accent-muted)]/30 to-transparent p-6 md:p-8">
            <div className="flex flex-col sm:flex-row sm:items-center gap-6">
              <div className="w-14 h-14 rounded-2xl bg-[var(--accent-muted)] flex items-center justify-center shrink-0">
                <Sparkles className="h-7 w-7 text-[var(--accent)]" />
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="font-display font-semibold text-[var(--text)] mb-1">
                  Mint your Governance NFT (SBT)
                </h2>
                <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                  One vote per proposal. Soulbound — non-transferable. Mint to participate.
                </p>
              </div>
              <button
                type="button"
                onClick={handleMintSBT}
                className="btn-primary shrink-0 rounded-xl px-6 py-3"
              >
                Mint Governance NFT
              </button>
            </div>
          </div>
        ) : (
          <div className="lg:col-span-2 rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-6 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[var(--accent-muted)] flex items-center justify-center shrink-0">
              <Vote className="h-6 w-6 text-[var(--accent)]" />
            </div>
            <div>
              <p className="font-medium text-[var(--text)]">You have 1 vote</p>
              <p className="text-sm text-[var(--text-muted)]">Governance NFT minted. Vote on active proposals below.</p>
            </div>
          </div>
        )}
        <div className="flex flex-col gap-3">
          <Link
            href="/app/governance/create-proposal"
            className="rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-5 flex items-center gap-4 transition hover:border-[var(--accent)]/40 hover:bg-[var(--bg-elevated)] group"
          >
            <div className="w-12 h-12 rounded-xl bg-[var(--accent-muted)] flex items-center justify-center shrink-0">
              <Plus className="h-6 w-6 text-[var(--accent)]" />
            </div>
            <div>
              <p className="font-semibold text-[var(--text)] group-hover:text-[var(--accent)] transition">Create proposal</p>
              <p className="text-xs text-[var(--text-muted)]">Supplier, asset standard, or treasury</p>
            </div>
            <ArrowRight className="h-5 w-5 text-[var(--text-dim)] ml-auto group-hover:text-[var(--accent)] group-hover:translate-x-0.5 transition shrink-0" />
          </Link>
          <Link
            href="/app/governance/vote"
            className="rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-5 flex items-center gap-4 transition hover:border-[var(--accent)]/40 hover:bg-[var(--bg-elevated)] group"
          >
            <div className="w-12 h-12 rounded-xl bg-[var(--accent-muted)] flex items-center justify-center shrink-0">
              <Vote className="h-6 w-6 text-[var(--accent)]" />
            </div>
            <div>
              <p className="font-semibold text-[var(--text)] group-hover:text-[var(--accent)] transition">Vote now</p>
              <p className="text-xs text-[var(--text-muted)]">{active.length} active proposal{active.length !== 1 ? 's' : ''}</p>
            </div>
            <ArrowRight className="h-5 w-5 text-[var(--text-dim)] ml-auto group-hover:text-[var(--accent)] group-hover:translate-x-0.5 transition shrink-0" />
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Active proposals */}
        <section className="xl:col-span-2">
          <h2 className="font-display text-lg font-semibold text-[var(--text)] mb-5">
            Active proposals
          </h2>
          {active.length === 0 ? (
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-12 text-center">
              <p className="text-[var(--text-muted)] mb-4">No active proposals. Create one or check back later.</p>
              <Link href="/app/governance/create-proposal" className="btn-primary rounded-xl inline-flex">
                Create proposal
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
                          <h3 className="font-display font-semibold text-[var(--text)] mt-1 group-hover:text-[var(--accent)] transition">
                            {p.title}
                          </h3>
                          <div className="flex items-center gap-2 mt-2 text-sm text-[var(--text-muted)]">
                            <Clock className="h-3.5 w-3.5" />
                            Ends {new Date(p.votingEndsAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                          </div>
                        </div>
                        <div className="flex items-center gap-6 shrink-0">
                          <div className="text-right">
                            <p className="text-sm text-[var(--text-muted)]">Votes</p>
                            <p className="font-semibold text-[var(--text)]">{p.votesYes} Yes · {p.votesNo} No</p>
                          </div>
                          <div className="w-24 h-2 rounded-full bg-[var(--bg-elevated)] overflow-hidden">
                            <div className="h-full rounded-full bg-[var(--accent)] transition-all" style={{ width: `${yesPct}%` }} />
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
        </section>

        {/* Sidebar: Recent activity + How it works */}
        <aside className="space-y-6">
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-5">
            <h3 className="font-display font-semibold text-[var(--text)] mb-4 flex items-center gap-2">
              <MessageCircle className="h-4 w-4 text-[var(--accent)]" />
              Recent activity
            </h3>
            <ul className="space-y-3">
              {recentProposals.map((p) => (
                <li key={p.id}>
                  <Link
                    href={`/app/governance/proposal/${p.id}`}
                    className="flex items-start gap-3 text-sm group"
                  >
                    {p.status === 'Active' && (
                      <span className="w-2 h-2 rounded-full bg-[var(--accent)] mt-1.5 shrink-0" />
                    )}
                    {p.status === 'Passed' || p.status === 'Executed' ? (
                      <CheckCircle2 className="h-4 w-4 text-emerald-400 mt-0.5 shrink-0" />
                    ) : p.status === 'Rejected' ? (
                      <XCircle className="h-4 w-4 text-red-400 mt-0.5 shrink-0" />
                    ) : null}
                    <div className="min-w-0">
                      <p className="text-[var(--text)] group-hover:text-[var(--accent)] transition truncate">
                        {p.title}
                      </p>
                      <p className="text-[var(--text-dim)] text-xs">
                        {p.status} · {new Date(p.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                      </p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              href="/app/governance/proposals"
              className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-[var(--accent)] hover:underline"
            >
              View all proposals <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-5">
            <h3 className="font-display font-semibold text-[var(--text)] mb-3">How it works</h3>
            <ol className="space-y-2 text-sm text-[var(--text-muted)]">
              <li className="flex gap-2">
                <span className="text-[var(--accent)] font-medium shrink-0">1.</span>
                Mint a Governance NFT (SBT) to get one vote per proposal.
              </li>
              <li className="flex gap-2">
                <span className="text-[var(--accent)] font-medium shrink-0">2.</span>
                Create proposals for supplier approval, asset standards, or treasury allocation.
              </li>
              <li className="flex gap-2">
                <span className="text-[var(--accent)] font-medium shrink-0">3.</span>
                Vote on active proposals. Voting runs for {DAO_META.votingPeriodHours} hours.
              </li>
              <li className="flex gap-2">
                <span className="text-[var(--accent)] font-medium shrink-0">4.</span>
                Passed proposals are executed on-chain; treasury changes require a vote.
              </li>
            </ol>
          </div>
        </aside>
      </div>
    </div>
  );
}
