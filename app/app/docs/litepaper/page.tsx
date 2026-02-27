'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function LitepaperPage() {
  return (
    <main>
      <div className="container-narrow py-12 md:py-16">
        <Link href="/docs" className="inline-flex items-center gap-1.5 text-sm text-[var(--text-muted)] hover:text-[var(--accent)] mb-8 transition">
          <ArrowLeft className="h-4 w-4" />
          Documentation
        </Link>

        <article>
          <h1 className="font-display text-2xl md:text-3xl font-semibold text-[var(--text)] mb-2">
            Litepaper
          </h1>
          <p className="text-[var(--text-muted)] text-base mb-10">
            Overview of Verdana Protocol, tokenomics, and roadmap.
          </p>

          <section className="space-y-8">
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-6">
              <h2 className="font-display text-lg font-semibold text-[var(--text)] mb-3">1. Vision</h2>
              <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                Verdana Protocol is a DAO-governed Green RWA marketplace. Environmental assets are verified, approved, and standardized by the community — a DAO that governs the marketplace, not a marketplace with a DAO.
              </p>
            </div>

            <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-6">
              <h2 className="font-display text-lg font-semibold text-[var(--text)] mb-3">2. Core Value</h2>
              <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                Transparent pricing, on-chain verification, and community-led governance for carbon credits, plastic credits, REC, and other environmental instruments. Low fees and fast settlement via Solana.
              </p>
            </div>

            <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-6">
              <h2 className="font-display text-lg font-semibold text-[var(--text)] mb-3">3. Roadmap</h2>
              <ul className="list-disc list-inside text-sm text-[var(--text-muted)] space-y-2">
                <li>Phase 1: Marketplace MVP & wallet integration</li>
                <li>Phase 2: DAO governance (proposals, voting, treasury)</li>
                <li>Phase 3: Supplier onboarding & verification standards</li>
                <li>Phase 4: Certificates & retirement (burn) tracking</li>
                <li>Enterprise: Purchase orders, escrow, and settlement options</li>
              </ul>
            </div>
          </section>
        </article>
      </div>
    </main>
  );
}
