'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Target, Eye, AlertCircle, Map } from 'lucide-react';

export default function AboutPage() {
  return (
    <main className="min-h-[80vh]">
      <div className="container-narrow py-16 md:py-24">
        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-display text-2xl md:text-3xl font-semibold text-[var(--text)] mb-2"
        >
          About Verdana Protocol
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="text-[var(--text-muted)] text-base mb-12"
        >
          A DAO-governed Green RWA marketplace. The community verifies, approves, and standardizes environmental assets — not a marketplace with a DAO, but a DAO that governs the marketplace.
        </motion.p>

        <section className="mb-14">
          <h2 className="font-display text-xl font-semibold text-[var(--text)] mb-4 flex items-center gap-2">
            <Eye className="h-5 w-5 text-[var(--accent)]" />
            Vision & Mission
          </h2>
          <p className="text-[var(--text-muted)] text-sm leading-relaxed mb-4">
            Our vision is a world where green asset verification and marketplace rules are set by the community. Verdana DAO governs supplier approval, asset standards, and treasury allocation so that the Green Asset Marketplace is community-owned and transparent.
          </p>
          <p className="text-[var(--text-muted)] text-sm leading-relaxed">
            Our mission is to be the DAO layer that controls what gets listed, which standards apply, and how ecosystem funds are used — with real governance impact, not cosmetic voting.
          </p>
        </section>

        <section className="mb-14">
          <h2 className="font-display text-xl font-semibold text-[var(--text)] mb-4 flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-[var(--accent)]" />
            Problem & Solution
          </h2>
          <div className="space-y-4">
            <div className="p-4 rounded-xl border border-[var(--border)] bg-[var(--bg-card)]">
              <h3 className="font-display font-medium text-[var(--text)] mb-2">The Problem</h3>
              <ul className="text-sm text-[var(--text-muted)] space-y-1 list-disc list-inside">
                <li>Green assets and credits are traded in silos with limited transparency.</li>
                <li>Proof of impact and chain of custody are hard to verify and audit.</li>
                <li>Fragmented markets make it difficult for buyers to source and retire with confidence.</li>
                <li>Suppliers lack a unified channel to reach global demand with verifiable credentials.</li>
              </ul>
            </div>
            <div className="p-4 rounded-xl border border-[var(--accent)]/30 bg-[var(--accent-muted)]/30">
              <h3 className="font-display font-medium text-[var(--text)] mb-2">Our Solution</h3>
              <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                Verdana Protocol provides a single marketplace and on-chain infrastructure: verified supplier onboarding, asset listing, purchase and retirement flows, and immutable proof on Solana. We enable end-to-end traceability and ESG-ready reporting.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-14">
          <h2 className="font-display text-xl font-semibold text-[var(--text)] mb-4 flex items-center gap-2">
            <Target className="h-5 w-5 text-[var(--accent)]" />
            RWA Green Infrastructure
          </h2>
          <p className="text-[var(--text-muted)] text-sm leading-relaxed mb-4">
            Real-World Assets (RWA) in the green space are physical or contractual environmental assets — commodities, credits, certificates — that we represent and verify on-chain. Our infrastructure includes:
          </p>
          <ul className="text-sm text-[var(--text-muted)] space-y-2">
            <li className="flex gap-2"><span className="text-[var(--accent)]">•</span> Supplier verification and KYC-compliant onboarding</li>
            <li className="flex gap-2"><span className="text-[var(--accent)]">•</span> Asset tokenization and listing with metadata and certifications</li>
            <li className="flex gap-2"><span className="text-[var(--accent)]">•</span> Purchase and retirement (burn) flows with on-chain settlement</li>
            <li className="flex gap-2"><span className="text-[var(--accent)]">•</span> Immutable audit trail and APIs for ESG reporting</li>
          </ul>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold text-[var(--text)] mb-4 flex items-center gap-2">
            <Map className="h-5 w-5 text-[var(--accent)]" />
            Roadmap
          </h2>
          <div className="space-y-4">
            <div className="p-5 rounded-xl border border-[var(--border)] bg-[var(--bg-card)]">
              <span className="text-xs font-medium text-[var(--accent)]">Phase 1</span>
              <h3 className="font-display font-medium text-[var(--text)] mt-1 mb-2">Foundation</h3>
              <p className="text-sm text-[var(--text-muted)]">Supplier onboarding, asset listing, marketplace MVP, and on-chain retirement on Solana.</p>
            </div>
            <div className="p-5 rounded-xl border border-[var(--border)] bg-[var(--bg-card)] opacity-90">
              <span className="text-xs font-medium text-[var(--text-muted)]">Phase 2</span>
              <h3 className="font-display font-medium text-[var(--text)] mt-1 mb-2">Scale & Integrations</h3>
              <p className="text-sm text-[var(--text-muted)]">Expanded asset types, API for enterprises, ESG reporting dashboards, and partner integrations.</p>
            </div>
            <div className="p-5 rounded-xl border border-[var(--border)] bg-[var(--bg-card)] opacity-80">
              <span className="text-xs font-medium text-[var(--text-dim)]">Phase 3</span>
              <h3 className="font-display font-medium text-[var(--text)] mt-1 mb-2">Ecosystem</h3>
              <p className="text-sm text-[var(--text-muted)]">DAO governance, cross-chain bridges, and a global network of verified green assets and suppliers.</p>
            </div>
          </div>
        </section>

        <div className="mt-12 pt-8 border-t border-[var(--border)]">
          <Link href="/" className="text-sm text-[var(--accent)] hover:underline">← Back to Home</Link>
        </div>
      </div>
    </main>
  );
}
