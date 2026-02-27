'use client';

import { useParams } from 'next/navigation';
import { useWallet } from '@solana/wallet-adapter-react';
import Link from 'next/link';
import { ConnectScreen } from '@/components/ConnectScreen';
import { getCertificateById } from '@/lib/dapp-data';
import { Download, Share2, ExternalLink } from 'lucide-react';

export default function CertificatePage() {
  const params = useParams();
  const { connected } = useWallet();
  const id = typeof params?.id === 'string' ? params.id : '';
  const cert = id ? getCertificateById(id) : null;

  if (!connected) {
    return <ConnectScreen />;
  }

  if (!cert) {
    return (
      <div className="container-narrow py-16 text-center">
        <h1 className="font-display text-xl font-semibold text-[var(--text)] mb-2">Certificate not found</h1>
        <Link href="/app/portfolio" className="text-sm text-[var(--accent)] hover:underline">← Portfolio</Link>
      </div>
    );
  }

  const explorerUrl = `https://explorer.solana.com/tx/${cert.txHash}?cluster=devnet`;

  return (
    <div className="container-narrow py-8 md:py-12">
      <Link href="/app/portfolio" className="text-sm text-[var(--text-muted)] hover:text-[var(--accent)] mb-6 inline-block">
        ← Portfolio
      </Link>

      <div className="card p-6 md:p-8 max-w-xl">
        <div className="border-b border-[var(--border)] pb-6 mb-6">
          <p className="text-xs font-medium text-[var(--accent)] uppercase tracking-wide mb-2">Retirement certificate</p>
          <h1 className="font-display text-2xl font-semibold text-[var(--text)]">{cert.assetName}</h1>
          <p className="text-[var(--text-muted)] text-sm mt-1">{cert.assetType} · {cert.quantity}</p>
        </div>

        <dl className="space-y-4 text-sm mb-8">
          <div>
            <dt className="text-[var(--text-dim)]">Retirement timestamp</dt>
            <dd className="text-[var(--text)]">{new Date(cert.retiredAt).toLocaleString()}</dd>
          </div>
          <div>
            <dt className="text-[var(--text-dim)]">Transaction hash</dt>
            <dd className="font-mono text-[var(--text)] break-all">{cert.txHash}</dd>
          </div>
          <div>
            <dt className="text-[var(--text-dim)]">Mint address</dt>
            <dd className="font-mono text-[var(--text)] break-all">{cert.mintAddress}</dd>
          </div>
        </dl>

        <a
          href={explorerUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-sm text-[var(--accent)] hover:underline mb-6"
        >
          View on Solana Explorer <ExternalLink className="h-4 w-4" />
        </a>

        <div className="flex flex-wrap gap-3">
          <button type="button" className="btn-primary inline-flex items-center gap-2">
            <Download className="h-4 w-4" />
            Download PDF
          </button>
          <button type="button" className="btn-ghost inline-flex items-center gap-2">
            <Share2 className="h-4 w-4" />
            Share link
          </button>
        </div>
      </div>
    </div>
  );
}
