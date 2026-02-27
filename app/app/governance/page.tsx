'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Vote, GitBranch, Clock, Wallet, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function GovernancePage() {
  return (
    <main className="min-h-[80vh]">
      <div className="container-narrow py-16 md:py-24">
        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-display text-2xl md:text-3xl font-semibold text-[var(--text)] mb-2"
        >
          What is Verdana DAO?
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="text-[var(--text-muted)] text-base mb-12 max-w-2xl"
        >
          Verdana Protocol is a <strong className="text-[var(--text)]">DAO-governed Green RWA Marketplace</strong> where environmental assets are verified, approved, and standardized by the community. Not marketplace + DAO — a <strong className="text-[var(--accent)]">DAO that governs a Green Asset Marketplace</strong>.
        </motion.p>

        <section className="mb-14">
          <h2 className="font-display text-xl font-semibold text-[var(--text)] mb-4 flex items-center gap-2">
            <GitBranch className="h-5 w-5 text-[var(--accent)]" />
            Governance model
          </h2>
          <p className="text-[var(--text-muted)] text-sm leading-relaxed mb-4">
            Holders of the Governance NFT (SBT-style) have one vote per NFT. Simple majority wins. Fixed voting period: 72 hours. All proposals and outcomes are recorded on-chain so the community controls supplier approval, asset standards, and treasury allocation.
          </p>
          <ul className="space-y-2 text-sm text-[var(--text-muted)]">
            <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-[var(--accent)] shrink-0" /> 1 NFT = 1 Vote</li>
            <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-[var(--accent)] shrink-0" /> Simple majority</li>
            <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-[var(--accent)] shrink-0" /> 72-hour voting window</li>
            <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-[var(--accent)] shrink-0" /> On-chain execution</li>
          </ul>
        </section>

        <section className="mb-14">
          <h2 className="font-display text-xl font-semibold text-[var(--text)] mb-4 flex items-center gap-2">
            <Clock className="h-5 w-5 text-[var(--accent)]" />
            Proposal lifecycle
          </h2>
          <div className="space-y-4">
            <div className="p-4 rounded-xl border border-[var(--border)] bg-[var(--bg-card)]">
              <span className="text-xs font-medium text-[var(--accent)]">1. Create</span>
              <p className="text-sm text-[var(--text-muted)] mt-1">Any governance member can create a proposal (supplier approval, asset standard, treasury allocation).</p>
            </div>
            <div className="p-4 rounded-xl border border-[var(--border)] bg-[var(--bg-card)]">
              <span className="text-xs font-medium text-[var(--accent)]">2. Vote</span>
              <p className="text-sm text-[var(--text-muted)] mt-1">72-hour voting period. Members vote Yes or No. Quorum and majority determine outcome.</p>
            </div>
            <div className="p-4 rounded-xl border border-[var(--border)] bg-[var(--bg-card)]">
              <span className="text-xs font-medium text-[var(--accent)]">3. Execute</span>
              <p className="text-sm text-[var(--text-muted)] mt-1">Passed proposals are executed on-chain (e.g. list supplier, update asset standard, allocate treasury).</p>
            </div>
          </div>
        </section>

        <section className="mb-14">
          <h2 className="font-display text-xl font-semibold text-[var(--text)] mb-4 flex items-center gap-2">
            <Wallet className="h-5 w-5 text-[var(--accent)]" />
            Treasury vision
          </h2>
          <p className="text-[var(--text-muted)] text-sm leading-relaxed mb-4">
            The DAO treasury holds ecosystem funds. Governance votes on how to allocate: fund supplier onboarding, grants for verification, or other ecosystem initiatives. No complex DeFi — simple, transparent allocation by community vote.
          </p>
        </section>

        <section className="p-6 md:p-8 rounded-2xl border border-[var(--accent)]/30 bg-[var(--accent-muted)]/30">
          <h2 className="font-display text-lg font-semibold text-[var(--text)] mb-2 flex items-center gap-2">
            <Vote className="h-5 w-5 text-[var(--accent)]" />
            Join the DAO
          </h2>
          <p className="text-sm text-[var(--text-muted)] mb-6">
            Connect your wallet, mint your Governance NFT, and participate in proposals that shape the Green Asset Marketplace.
          </p>
          <Link href="/app/governance/overview" className="btn-primary inline-flex items-center gap-2">
            Enter Governance
            <ArrowRight className="h-4 w-4" />
          </Link>
        </section>

        <div className="mt-12 pt-8 border-t border-[var(--border)]">
          <Link href="/" className="text-sm text-[var(--accent)] hover:underline">← Back to Home</Link>
        </div>
      </div>
    </main>
  );
}
