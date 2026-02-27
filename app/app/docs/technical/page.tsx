'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function TechnicalPage() {
  return (
    <main>
      <div className="container-narrow py-12 md:py-16">
        <Link href="/docs" className="inline-flex items-center gap-1.5 text-sm text-[var(--text-muted)] hover:text-[var(--accent)] mb-8 transition">
          <ArrowLeft className="h-4 w-4" />
          Documentation
        </Link>

        <article>
          <h1 className="font-display text-2xl md:text-3xl font-semibold text-[var(--text)] mb-2">
            Technical Overview
          </h1>
          <p className="text-[var(--text-muted)] text-base mb-10">
            Architecture, Solana programs, and integration guide.
          </p>

          <section className="space-y-8">
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-6">
              <h2 className="font-display text-lg font-semibold text-[var(--text)] mb-3">Architecture</h2>
              <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                Next.js 14 (App Router) frontend with Solana wallet-adapter for connection. Optional Anchor programs (ecosol_dao) for on-chain governance. Marketing site (/) and dApp (/app) share one root layout; the dApp uses WalletProvider and devnet by default.
              </p>
            </div>

            <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-6">
              <h2 className="font-display text-lg font-semibold text-[var(--text)] mb-3">Network</h2>
              <p className="text-sm text-[var(--text-muted)] leading-relaxed mb-3">
                The app is configured for <strong className="text-[var(--text)]">Solana Devnet</strong>. RPC endpoint and connection are set in <code className="px-1.5 py-0.5 rounded bg-[var(--bg-elevated)] text-[var(--accent)] text-xs">lib/solana.ts</code> and <code className="px-1.5 py-0.5 rounded bg-[var(--bg-elevated)] text-[var(--accent)] text-xs">WalletProvider</code>. Ensure your wallet is switched to Devnet when using the dApp.
              </p>
            </div>

            <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-6">
              <h2 className="font-display text-lg font-semibold text-[var(--text)] mb-3">Routes</h2>
              <ul className="text-sm text-[var(--text-muted)] space-y-2">
                <li><code className="text-[var(--accent)]">/</code> — Home (marketing)</li>
                <li><code className="text-[var(--accent)]">/app</code> — dApp entry (dashboard)</li>
                <li><code className="text-[var(--accent)]">/app/dashboard</code> — Portfolio value, stats, quick actions</li>
                <li><code className="text-[var(--accent)]">/app/marketplace</code> — Asset listings (biomass, carbon, plastic, REC)</li>
                <li><code className="text-[var(--accent)]">/app/portfolio</code> — Holdings & retired assets</li>
                <li><code className="text-[var(--accent)]">/app/purchase-order</code> — Enterprise purchase order form</li>
                <li><code className="text-[var(--accent)]">/app/governance/*</code> — Overview, proposals, vote, treasury</li>
              </ul>
            </div>

            <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-6">
              <h2 className="font-display text-lg font-semibold text-[var(--text)] mb-3">Integration</h2>
              <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                Connect via Phantom, Solflare, or WalletConnect. Program IDs and RPC are in <code className="px-1.5 py-0.5 rounded bg-[var(--bg-elevated)] text-[var(--accent)] text-xs">lib/solana.ts</code> and <code className="px-1.5 py-0.5 rounded bg-[var(--bg-elevated)] text-[var(--accent)] text-xs">lib/dao-program.ts</code>. DAO governance requires the ecosol_dao program deployed on devnet; use Demo mode in Governance if the program is not initialized.
              </p>
            </div>
          </section>
        </article>
      </div>
    </main>
  );
}
