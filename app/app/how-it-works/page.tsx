'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Search, ShoppingCart, ShieldCheck, ArrowRight } from 'lucide-react';

const steps = [
  {
    num: '1',
    icon: Search,
    title: 'Browse Green Asset',
    text: 'Explore the marketplace for verified green assets: wood pellets, biomass, carbon credits, RECs, plastic credits, and more. Filter by type, region, certification, and supplier.',
  },
  {
    num: '2',
    icon: ShoppingCart,
    title: 'Purchase / Retire',
    text: 'Choose to buy or retire (burn) assets. Purchases go to your portfolio; retirement creates a permanent on-chain record of impact. Payment and settlement are recorded on Solana.',
  },
  {
    num: '3',
    icon: ShieldCheck,
    title: 'On-chain Verification',
    text: 'Every transaction is hashed and stored on Solana. You receive verifiable proof — certificates, receipts, and traceability data — for reporting and ESG compliance.',
  },
];

export default function HowItWorksPage() {
  return (
    <main className="min-h-[80vh]">
      <div className="container-narrow py-16 md:py-24">
        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-display text-2xl md:text-3xl font-semibold text-[var(--text)] mb-2"
        >
          How it works
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="text-[var(--text-muted)] text-base mb-12"
        >
          From discovery to verified impact in three steps.
        </motion.p>

        <div className="space-y-8 mb-14">
          {steps.map((s, i) => (
            <motion.section
              key={s.num}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 + i * 0.08 }}
              className="flex gap-6 p-6 rounded-2xl border border-[var(--border)] bg-[var(--bg-card)]"
            >
              <div className="shrink-0 w-12 h-12 rounded-xl bg-[var(--accent-muted)] flex items-center justify-center">
                <s.icon className="h-6 w-6 text-[var(--accent)]" />
              </div>
              <div className="min-w-0">
                <span className="text-xs font-mono text-[var(--text-dim)]">Step {s.num}</span>
                <h2 className="font-display text-lg font-semibold text-[var(--text)] mt-1 mb-2">{s.title}</h2>
                <p className="text-sm text-[var(--text-muted)] leading-relaxed">{s.text}</p>
              </div>
            </motion.section>
          ))}
        </div>

        <section className="mb-12">
          <h2 className="font-display text-xl font-semibold text-[var(--text)] mb-4">Flow diagram</h2>
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-elevated)] p-6 md:p-8 overflow-x-auto">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 min-w-[320px]">
              <div className="flex flex-col items-center text-center">
                <div className="w-14 h-14 rounded-full bg-[var(--accent-muted)] flex items-center justify-center mb-2">
                  <Search className="h-7 w-7 text-[var(--accent)]" />
                </div>
                <span className="font-display font-medium text-[var(--text)]">Browse</span>
                <span className="text-xs text-[var(--text-muted)]">Green assets</span>
              </div>
              <ArrowRight className="h-6 w-6 text-[var(--text-dim)] shrink-0 rotate-90 md:rotate-0" />
              <div className="flex flex-col items-center text-center">
                <div className="w-14 h-14 rounded-full bg-[var(--accent-muted)] flex items-center justify-center mb-2">
                  <ShoppingCart className="h-7 w-7 text-[var(--accent)]" />
                </div>
                <span className="font-display font-medium text-[var(--text)]">Purchase</span>
                <span className="text-xs text-[var(--text-muted)]">or Retire</span>
              </div>
              <ArrowRight className="h-6 w-6 text-[var(--text-dim)] shrink-0 rotate-90 md:rotate-0" />
              <div className="flex flex-col items-center text-center">
                <div className="w-14 h-14 rounded-full bg-[var(--accent-muted)] flex items-center justify-center mb-2">
                  <ShieldCheck className="h-7 w-7 text-[var(--accent)]" />
                </div>
                <span className="font-display font-medium text-[var(--text)]">Verify</span>
                <span className="text-xs text-[var(--text-muted)]">On-chain</span>
              </div>
            </div>
          </div>
        </section>

        <div className="flex flex-wrap gap-3">
          <Link href="/app" className="btn-primary">
            Launch App
          </Link>
          <Link href="/" className="btn-ghost">
            Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}
