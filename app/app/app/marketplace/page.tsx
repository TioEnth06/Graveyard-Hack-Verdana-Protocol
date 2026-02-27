'use client';

import { useWallet } from '@solana/wallet-adapter-react';
import { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ConnectScreen } from '@/components/ConnectScreen';
import { getAssets, type Asset, type AssetType } from '@/lib/dapp-data';
import { Search, Leaf, Cloud, Recycle, Zap, ChevronRight, ShoppingCart } from 'lucide-react';

const ASSET_TYPES: AssetType[] = ['Renewable Product', 'Carbon Credit', 'Plastic Credit', 'REC'];
const TYPE_ICON: Record<AssetType, React.ElementType> = {
  'Renewable Product': Leaf,
  'Carbon Credit': Cloud,
  'Plastic Credit': Recycle,
  REC: Zap,
};
const TYPE_LABEL: Record<AssetType, string> = {
  'Renewable Product': 'Biomass',
  'Carbon Credit': 'Carbon',
  'Plastic Credit': 'Plastic',
  REC: 'REC',
};
const PER_PAGE = 12;
const RECOMMENDED_COUNT = 6;

function AssetCard({ asset, compact = false }: { asset: Asset; compact?: boolean }) {
  const Icon = TYPE_ICON[asset.assetType];
  if (compact) {
    return (
      <Link
        href={`/app/asset/${asset.id}`}
        className="group block rounded-lg border border-[var(--border)] bg-[var(--bg-card)] overflow-hidden hover:border-[var(--accent)]/50 hover:shadow transition"
      >
        <div className="aspect-square bg-[var(--bg-elevated)] relative overflow-hidden">
          {asset.imageUrl ? (
            <Image
              src={asset.imageUrl}
              alt={asset.name}
              fill
              className="object-cover group-hover:scale-105 transition duration-300"
              sizes="(max-width: 640px) 28vw, (max-width: 1024px) 20vw, 14vw"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center p-3 bg-gradient-to-br from-[var(--accent-muted)] to-[var(--accent-muted)]/50">
              <Icon className="h-8 w-8 text-[var(--accent)] group-hover:scale-105 transition" />
            </div>
          )}
        </div>
        <div className="p-2.5">
          <h3 className="font-medium text-[var(--text)] text-sm line-clamp-2 group-hover:text-[var(--accent)] transition">
            {asset.name}
          </h3>
          <p className="mt-0.5 text-sm font-semibold text-[var(--accent)]">
            {asset.priceSol} SOL
          </p>
          <span className="mt-1.5 inline-block rounded-md bg-[var(--accent)] px-2 py-1 text-xs font-medium text-black">
            Buy
          </span>
        </div>
      </Link>
    );
  }
  return (
    <Link
      href={`/app/asset/${asset.id}`}
      className="group block rounded-xl border border-[var(--border)] bg-[var(--bg-card)] overflow-hidden hover:border-[var(--accent)]/50 hover:shadow-md transition"
    >
      <div className="aspect-square bg-[var(--bg-elevated)] relative overflow-hidden">
        {asset.imageUrl ? (
          <Image
            src={asset.imageUrl}
            alt={asset.name}
            fill
            className="object-cover group-hover:scale-105 transition duration-300"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center p-6 bg-gradient-to-br from-[var(--accent-muted)] to-[var(--accent-muted)]/50">
            <div className="rounded-2xl bg-[var(--bg)]/80 p-6 group-hover:scale-105 transition">
              <Icon className="h-12 w-12 text-[var(--accent)]" />
            </div>
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-medium text-[var(--text)] line-clamp-2 min-h-[2.5rem] group-hover:text-[var(--accent)] transition">
          {asset.name}
        </h3>
        <p className="mt-1 text-base font-semibold text-[var(--accent)]">
          {asset.priceSol} SOL
        </p>
        <p className="mt-0.5 text-xs text-[var(--text-muted)]">
          {asset.supplierLocation}
        </p>
        <span className="mt-3 inline-block rounded-lg bg-[var(--accent)] px-3 py-1.5 text-sm font-medium text-black">
          Buy
        </span>
      </div>
    </Link>
  );
}

export default function MarketplacePage() {
  const { connected } = useWallet();
  const [filter, setFilter] = useState<AssetType | 'all'>('all');
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState<'volume' | 'price'>('volume');
  const [page, setPage] = useState(1);

  const assets = useMemo(() => {
    let list = getAssets();
    if (filter !== 'all') list = list.filter((a) => a.assetType === filter);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (a) =>
          a.name.toLowerCase().includes(q) ||
          a.assetType.toLowerCase().includes(q) ||
          a.supplierName.toLowerCase().includes(q)
      );
    }
    list = [...list].sort((a, b) => {
      if (sort === 'price') return a.priceSol - b.priceSol;
      return 0;
    });
    return list;
  }, [filter, search, sort]);

  const totalPages = Math.max(1, Math.ceil(assets.length / PER_PAGE));
  const paginated = assets.slice((page - 1) * PER_PAGE, page * PER_PAGE);
  const recommended = assets.slice(0, RECOMMENDED_COUNT);

  if (!connected) {
    return <ConnectScreen />;
  }

  return (
    <div className="container-wide py-6 md:py-10">
      {/* Search bar */}
      <div className="mb-6">
        <div className="relative max-w-2xl">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[var(--text-dim)]" />
          <input
            type="text"
            placeholder="Search green assets, carbon credits, REC..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="input-base pl-12 pr-4 py-3 w-full rounded-2xl text-base"
          />
        </div>
      </div>

      {/* Recommendations - compact, filtered by selected category */}
      <section className="mb-5">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          <h2 className="font-display text-base font-semibold text-[var(--text)]">
            {filter === 'all' ? 'Recommended for you' : `${TYPE_LABEL[filter]} · Recommended`}
          </h2>
          <Link
            href="#all-products"
            className="text-xs text-[var(--accent)] hover:underline flex items-center gap-0.5"
          >
            View all <ChevronRight className="h-3.5 w-3.5" />
          </Link>
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-2 sm:gap-3">
          {recommended.map((asset) => (
            <AssetCard key={asset.id} asset={asset} compact />
          ))}
        </div>
        {recommended.length === 0 && (
          <p className="text-sm text-[var(--text-muted)] py-4">
            No assets in this category. Try another or search above.
          </p>
        )}

        {/* Categories - under recommended card */}
        <div className="mt-6 pt-5 border-t border-[var(--border)]">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
            <h2 className="font-display text-sm font-semibold text-[var(--text)]">
              Categories
            </h2>
            <Link
              href="/app/purchase-order"
              className="inline-flex items-center gap-1.5 rounded-lg border border-[var(--border)] bg-[var(--bg-card)] px-3 py-2 text-xs font-medium text-[var(--text)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition shrink-0"
            >
              <ShoppingCart className="h-3.5 w-3.5" />
              Purchase Order
            </Link>
          </div>
          <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 scrollbar-hide">
            <button
              type="button"
              onClick={() => {
                setFilter('all');
                setPage(1);
              }}
              className={`flex-shrink-0 flex flex-col items-center gap-1 rounded-lg border px-3 py-2 min-w-[4rem] transition ${
                filter === 'all'
                  ? 'bg-[var(--accent)] text-black border-[var(--accent)]'
                  : 'border-[var(--border)] bg-[var(--bg-card)] text-[var(--text-muted)] hover:border-[var(--accent)]/50'
              }`}
            >
              <span className="text-sm font-medium">All</span>
            </button>
            {ASSET_TYPES.map((type) => {
              const Icon = TYPE_ICON[type];
              return (
                <button
                  key={type}
                  type="button"
                  onClick={() => {
                    setFilter(type);
                    setPage(1);
                  }}
                  className={`flex-shrink-0 flex flex-col items-center gap-1 rounded-lg border px-3 py-2 min-w-[4rem] transition ${
                    filter === type
                      ? 'bg-[var(--accent)] text-black border-[var(--accent)]'
                      : 'border-[var(--border)] bg-[var(--bg-card)] text-[var(--text-muted)] hover:border-[var(--accent)]/50'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span className="text-[10px] sm:text-xs font-medium text-center leading-tight">
                    {TYPE_LABEL[type]}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* All products - with sort */}
      <section id="all-products" className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
          <h2 className="font-display text-xl font-semibold text-[var(--text)]">
            All products
          </h2>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as 'volume' | 'price')}
            className="input-base w-full sm:w-44 rounded-xl"
          >
            <option value="volume">Sort by volume</option>
            <option value="price">Sort by price</option>
          </select>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
          {paginated.map((asset) => (
            <AssetCard key={asset.id} asset={asset} />
          ))}
        </div>
      </section>

      {assets.length === 0 && (
        <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-card)] p-12 text-center">
          <p className="text-[var(--text-muted)]">
            No assets match your filters.
          </p>
        </div>
      )}

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-8">
          <button
            type="button"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="rounded-xl border border-[var(--border)] px-4 py-2 text-sm text-[var(--text-muted)] hover:text-[var(--text)] disabled:opacity-50"
          >
            Previous
          </button>
          <span className="text-sm text-[var(--text-muted)] px-2">
            {page} / {totalPages}
          </span>
          <button
            type="button"
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="rounded-xl border border-[var(--border)] px-4 py-2 text-sm text-[var(--text-muted)] hover:text-[var(--text)] disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
