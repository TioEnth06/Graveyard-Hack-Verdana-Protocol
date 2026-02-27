'use client';

import React, { useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { CreditCard } from './CreditCard';
import { WalletButton } from './WalletButton';
import { Search, CheckCircle2 } from 'lucide-react';
import { useSimulation } from '@/context/SimulationContext';
import type { MarketplaceListing } from '@/lib/simulation-types';

export function Marketplace() {
  const { listings, buyCredit } = useSimulation();
  const [filter, setFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [purchasedId, setPurchasedId] = useState<string | null>(null);
  const { connected } = useWallet();

  const handleBuyCredit = (listing: MarketplaceListing) => {
    buyCredit(listing);
    setPurchasedId(listing.nftMint);
    setTimeout(() => setPurchasedId(null), 4000);
  };

  const filteredListings = listings.filter((l) => {
    const matchFilter = filter === 'all' || l.assetType === filter;
    const matchSearch =
      l.assetType.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.nftId.toLowerCase().includes(searchQuery.toLowerCase());
    return matchFilter && matchSearch;
  });

  return (
    <div className="container-wide">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-8">
        <div>
          <h2 className="font-display text-2xl md:text-3xl font-semibold text-[var(--text)]">
            Marketplace
          </h2>
          <p className="text-[var(--text-muted)] mt-1">Verified carbon, plastic, and wood credits</p>
        </div>
        <WalletButton />
      </div>

      <AnimatePresence>
        {purchasedId && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mb-6 rounded-xl border border-[var(--accent)] bg-[var(--accent-muted)] p-4 flex items-center gap-3"
          >
            <CheckCircle2 className="h-5 w-5 shrink-0 text-[var(--accent)]" />
            <p className="text-sm text-[var(--text)]">
              Credit purchased. View it on the{' '}
              <Link href="/#cta" className="font-medium text-[var(--accent)] underline">
                Retire
              </Link>
              page.
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--text-dim)]" />
          <input
            type="text"
            placeholder="Search by type or ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input-base pl-11"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {['all', 'WOOD_PELLETS', 'PLASTIC', 'CARBON'].map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => setFilter(type)}
              className={`rounded-xl px-4 py-2.5 text-sm font-medium transition ${
                filter === type
                  ? 'bg-[var(--accent)] text-black'
                  : 'border border-[var(--border)] text-[var(--text-muted)] hover:text-[var(--text)] hover:border-[var(--border-hover)]'
              }`}
            >
              {type === 'all' ? 'All' : type.replace('_', ' ')}
            </button>
          ))}
        </div>
      </div>

      {filteredListings.length === 0 ? (
        <div className="card p-12 text-center">
          <p className="text-[var(--text-muted)] mb-2">No credits match your filters.</p>
          <p className="text-sm text-[var(--text-dim)]">Credits you purchase will appear on the Retire page.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredListings.map((listing, i) => (
            <motion.div
              key={listing.nftMint}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
            >
              <CreditCard
                assetType={listing.assetType}
                weight={listing.weight}
                verificationHash={listing.verificationHash}
                price={listing.price}
                seller={listing.seller}
                nftId={listing.nftId}
                mint={listing.nftMint}
                onBuy={() => handleBuyCredit(listing)}
              />
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
