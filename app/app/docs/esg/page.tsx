'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function EsgPage() {
  return (
    <main className="min-h-[80vh]">
      <div className="container-narrow py-12 md:py-16">
        <Link href="/docs" className="inline-flex items-center gap-1.5 text-sm text-[var(--text-muted)] hover:text-[var(--accent)] mb-8">
          <ArrowLeft className="h-4 w-4" />
          Documentation
        </Link>

        <article className="prose prose-invert max-w-none">
          <h1 className="font-display text-2xl md:text-3xl font-semibold text-[var(--text)] mb-2">
            ESG Methodology
          </h1>
          <p className="text-[var(--text-muted)] text-base mb-8">
            How we measure and report environmental impact and ESG metrics.
          </p>

          <section className="space-y-6 text-[var(--text)]">
            <div>
              <h2 className="font-display text-lg font-semibold text-[var(--text)] mb-2">Verification</h2>
              <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                Assets listed on Verdana are tied to verified environmental outcomes. Verification criteria are set and updated by DAO governance to align with recognized standards where applicable.
              </p>
            </div>

            <div>
              <h2 className="font-display text-lg font-semibold text-[var(--text)] mb-2">Reporting</h2>
              <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                Retirement (burn) events are recorded on-chain. Certificates are issued for each retirement and can be used for impact reporting. Aggregated metrics are visible on the platform.
              </p>
            </div>

            <div>
              <h2 className="font-display text-lg font-semibold text-[var(--text)] mb-2">Transparency</h2>
              <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                All listings, trades, and retirements are traceable. Methodology documents and updates are published in Docs and communicated via governance proposals.
              </p>
            </div>
          </section>
        </article>
      </div>
    </main>
  );
}
