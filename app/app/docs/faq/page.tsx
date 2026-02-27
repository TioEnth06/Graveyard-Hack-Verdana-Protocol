'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

const faqs = [
  {
    q: 'What is Verdana Protocol?',
    a: 'A DAO-governed Green RWA marketplace where environmental assets (carbon credits, plastic credits, REC, biomass) are verified and traded. The DAO sets standards and approves suppliers and assets.',
  },
  {
    q: 'How do I buy or retire assets?',
    a: 'Connect your wallet at /app, go to Marketplace to browse and buy. Retire (burn) assets from your Portfolio; you receive a retirement certificate.',
  },
  {
    q: 'What is the Purchase Order form?',
    a: 'The Enterprise Purchase Order at /app/purchase-order lets buyers submit a formal PO for biomass, environmental credits, REC, or recycled plastics. It includes buyer info, product specs, compliance, and settlement preferences.',
  },
  {
    q: 'How does governance work?',
    a: 'Go to /app → Governance. You can view proposals, vote on active ones, and create proposals. If the DAO is not initialized on-chain, use "Use demo mode" to try governance with sample proposals. On-chain voting requires the ecosol_dao program on devnet.',
  },
  {
    q: 'Which network does the app use?',
    a: 'The app uses Solana Devnet. Set your wallet (Phantom, Solflare, etc.) to Devnet to match. RPC and connection are configured in the app.',
  },
  {
    q: 'How do I become a supplier?',
    a: 'Suppliers are approved via DAO governance. Submit through the app or contact the team. See the Suppliers page and Contact for details.',
  },
  {
    q: 'Which wallets are supported?',
    a: 'Solana wallets such as Phantom, Solflare, and WalletConnect-compatible wallets.',
  },
];

export default function FaqPage() {
  return (
    <main>
      <div className="container-narrow py-12 md:py-16">
        <Link href="/docs" className="inline-flex items-center gap-1.5 text-sm text-[var(--text-muted)] hover:text-[var(--accent)] mb-8 transition">
          <ArrowLeft className="h-4 w-4" />
          Documentation
        </Link>

        <h1 className="font-display text-2xl md:text-3xl font-semibold text-[var(--text)] mb-2">
          FAQ
        </h1>
        <p className="text-[var(--text-muted)] text-base mb-10">
          Frequently asked questions for suppliers, buyers, and developers.
        </p>

        <ul className="space-y-0">
          {faqs.map((faq, i) => (
            <li key={i} className="rounded-xl border border-[var(--border)] bg-[var(--bg-card)] p-5 mb-3 last:mb-0">
              <h2 className="font-display font-semibold text-[var(--text)] mb-2">{faq.q}</h2>
              <p className="text-sm text-[var(--text-muted)] leading-relaxed">{faq.a}</p>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
