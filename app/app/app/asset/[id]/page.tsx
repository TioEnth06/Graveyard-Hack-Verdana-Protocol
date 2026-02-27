'use client';

import { useParams, useRouter } from 'next/navigation';
import { useWallet } from '@solana/wallet-adapter-react';
import { useState } from 'react';
import Link from 'next/link';
import { ConnectScreen } from '@/components/ConnectScreen';
import { BurnModal } from '@/components/BurnModal';
import { getAssetById } from '@/lib/dapp-data';
import { Leaf, Cloud, Recycle, Zap, MapPin, FileCheck, ExternalLink, Flame } from 'lucide-react';

const TYPE_ICON: Record<string, React.ElementType> = { 'Renewable Product': Leaf, 'Carbon Credit': Cloud, 'Plastic Credit': Recycle, REC: Zap };

export default function AssetDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { connected } = useWallet();
  const id = typeof params?.id === 'string' ? params.id : '';
  const asset = id ? getAssetById(id) : null;
  const [burnModalOpen, setBurnModalOpen] = useState(false);

  const handleConfirmBurn = async (): Promise<string | null> => {
    await new Promise((r) => setTimeout(r, 2200));
    const chars = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';
    return Array.from({ length: 44 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
  };

  if (!connected) {
    return <ConnectScreen />;
  }

  if (!asset) {
    return (
      <div className="container-wide py-16 text-center">
        <h1 className="font-display text-xl font-semibold text-[var(--text)] mb-2">Asset not found</h1>
        <Link href="/app/marketplace" className="text-sm text-[var(--accent)] hover:underline">← Marketplace</Link>
      </div>
    );
  }

  const Icon = TYPE_ICON[asset.assetType] || Leaf;
  const explorerUrl = `https://explorer.solana.com/address/${asset.mintAddress}?cluster=devnet`;

  return (
    <div className="container-narrow py-8 md:py-12">
      <Link href="/app/marketplace" className="text-sm text-[var(--text-muted)] hover:text-[var(--accent)] mb-6 inline-block">
        ← Back to Marketplace
      </Link>

      <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-8">
        <div>
          <span className="inline-flex items-center gap-1.5 rounded-lg bg-[var(--accent-muted)] px-2.5 py-1 text-xs font-medium text-[var(--accent)] mb-2">
            <Icon className="h-3.5 w-3.5" />
            {asset.assetType}
          </span>
          <h1 className="font-display text-2xl md:text-3xl font-semibold text-[var(--text)]">{asset.name}</h1>
        </div>
        <div className="flex gap-3 shrink-0">
          <button
            type="button"
            onClick={() => setBurnModalOpen(true)}
            className="btn-ghost inline-flex items-center gap-2"
          >
            <Flame className="h-4 w-4" />
            Retire Asset
          </button>
          <button type="button" className="btn-primary">
            Buy Asset
          </button>
        </div>
      </div>

      <section className="card p-6 mb-6">
        <h2 className="font-display text-lg font-semibold text-[var(--text)] mb-4">Overview</h2>
        <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          <div><dt className="text-[var(--text-dim)]">Quantity</dt><dd className="text-[var(--text)] font-medium">{asset.quantity}</dd></div>
          <div><dt className="text-[var(--text-dim)]">Price</dt><dd className="text-[var(--text)] font-medium">{asset.priceSol} SOL</dd></div>
          <div><dt className="text-[var(--text-dim)]">Available volume</dt><dd className="text-[var(--text)]">{asset.availableVolume}</dd></div>
        </dl>
      </section>

      <section className="card p-6 mb-6">
        <h2 className="font-display text-lg font-semibold text-[var(--text)] mb-4">Environmental data</h2>
        <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          <div><dt className="text-[var(--text-dim)]">CO₂ equivalent</dt><dd className="text-[var(--text)]">{asset.co2Equivalent}</dd></div>
          <div><dt className="text-[var(--text-dim)]">Impact metrics</dt><dd className="text-[var(--text)]">{asset.impactMetrics}</dd></div>
          <div><dt className="text-[var(--text-dim)]">Methodology</dt><dd className="text-[var(--text)]">{asset.methodologyRef}</dd></div>
        </dl>
      </section>

      <section className="card p-6 mb-6">
        <h2 className="font-display text-lg font-semibold text-[var(--text)] mb-4">Supplier</h2>
        <div className="flex items-center gap-3">
          <div>
            <p className="font-medium text-[var(--text)]">{asset.supplierName}</p>
            <p className="text-sm text-[var(--text-muted)] flex items-center gap-1"><MapPin className="h-3.5 w-3.5" /> {asset.supplierLocation}</p>
            <p className="text-xs text-[var(--text-dim)] mt-1 flex items-center gap-1"><FileCheck className="h-3.5 w-3.5" /> {asset.certification}</p>
          </div>
          <Link href={`/supplier/${asset.supplierId}`} className="text-sm text-[var(--accent)] hover:underline shrink-0">
            View profile →
          </Link>
        </div>
      </section>

      <section className="card p-6">
        <h2 className="font-display text-lg font-semibold text-[var(--text)] mb-4">On-chain data</h2>
        <dl className="space-y-2 text-sm">
          <div><dt className="text-[var(--text-dim)]">Token ID</dt><dd className="font-mono text-[var(--text)]">{asset.tokenId}</dd></div>
          <div><dt className="text-[var(--text-dim)]">Mint address</dt><dd className="font-mono text-[var(--text)] break-all">{asset.mintAddress}</dd></div>
        </dl>
        <a href={explorerUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm text-[var(--accent)] hover:underline mt-4">
          View on Explorer <ExternalLink className="h-4 w-4" />
        </a>
      </section>

      <BurnModal
        isOpen={burnModalOpen}
        onClose={() => setBurnModalOpen(false)}
        asset={asset ? { id: asset.id, name: asset.name, assetType: asset.assetType, quantity: asset.quantity, tokenId: asset.tokenId, mintAddress: asset.mintAddress } : null}
        onConfirmBurn={handleConfirmBurn}
        certificateId={`cert-${asset.id}`}
      />
    </div>
  );
}
