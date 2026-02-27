'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Leaf, Recycle, Cloud, ArrowRight } from 'lucide-react';

interface CreditCardProps {
  assetType: string;
  weight: number;
  verificationHash: string;
  price?: number;
  seller?: string;
  nftId: string;
  mint: string;
  onBuy?: () => void;
}

const assetConfig: Record<string, { icon: React.ElementType; label: string }> = {
  WOOD_PELLETS: { icon: Leaf, label: 'Wood' },
  PLASTIC: { icon: Recycle, label: 'Plastic' },
  CARBON: { icon: Cloud, label: 'Carbon' },
};

export function CreditCard({
  assetType,
  weight,
  verificationHash,
  price,
  seller,
  nftId,
  mint,
  onBuy,
}: CreditCardProps) {
  const config = assetConfig[assetType] || { icon: Leaf, label: assetType };

  return (
    <motion.div
      whileHover={{ y: -2 }}
      className="card card-hover p-6 flex flex-col h-full"
    >
      <div className="flex items-start justify-between mb-4">
        <span className="inline-flex items-center gap-2 rounded-lg bg-[var(--accent-muted)] px-2.5 py-1 text-xs font-medium text-[var(--accent)]">
          <config.icon className="h-3.5 w-3.5" />
          {config.label}
        </span>
        {price != null && (
          <span className="font-display text-xl font-semibold text-[var(--text)]">
            {price.toFixed(2)} SOL
          </span>
        )}
      </div>

      <div className="mb-4">
        <div className="font-display text-lg font-semibold text-[var(--text)]">
          {weight} ton credit
        </div>
        <div className="text-xs text-[var(--text-dim)] font-mono mt-0.5">{nftId}</div>
      </div>

      <div className="pt-4 border-t border-[var(--border)] mt-auto space-y-2">
        <p className="text-xs text-[var(--text-dim)] font-mono truncate">{verificationHash}</p>
        {seller && <p className="text-xs text-[var(--text-muted)]">Seller: {seller}</p>}
      </div>

      <div className="flex gap-2 mt-4">
        <Link
          href={`/app/portfolio`}
          className="btn-ghost flex-1 flex items-center justify-center gap-1.5"
        >
          Retire
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
        {price != null && (
          <button
            type="button"
            onClick={onBuy}
            className="btn-primary flex-1"
          >
            Buy
          </button>
        )}
      </div>
    </motion.div>
  );
}
