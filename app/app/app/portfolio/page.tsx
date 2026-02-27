'use client';

import { useWallet } from '@solana/wallet-adapter-react';
import { useState, useMemo } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ConnectScreen } from '@/components/ConnectScreen';
import { getPortfolio, getAssetById } from '@/lib/dapp-data';
import type { PortfolioItem } from '@/lib/dapp-data';
import {
  Package,
  Flame,
  ArrowUpRight,
  Copy,
  ExternalLink,
  Leaf,
  Cloud,
  Recycle,
  Zap,
  FileCheck,
  Sparkles,
  TrendingUp,
} from 'lucide-react';

const TYPE_ICON: Record<string, React.ElementType> = {
  'Renewable Product': Leaf,
  'Carbon Credit': Cloud,
  'Plastic Credit': Recycle,
  REC: Zap,
};

const TYPE_COLOR: Record<string, string> = {
  'Renewable Product': 'from-emerald-500/20 to-green-600/10',
  'Carbon Credit': 'from-sky-500/20 to-blue-600/10',
  'Plastic Credit': 'from-cyan-500/20 to-teal-600/10',
  REC: 'from-amber-500/20 to-yellow-600/10',
};

function truncateAddress(addr: string, head = 6, tail = 4) {
  if (addr.length <= head + tail) return addr;
  return `${addr.slice(0, head)}...${addr.slice(-tail)}`;
}

function estimateValue(item: PortfolioItem): number | null {
  const asset = getAssetById(item.assetId);
  if (!asset) return null;
  const n = parseFloat(item.quantity.replace(/[^0-9.]/g, ''));
  if (Number.isNaN(n)) return null;
  return n * asset.priceSol;
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.06 },
  },
};

const itemMotion = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0 },
};

export default function PortfolioPage() {
  const { connected, publicKey } = useWallet();
  const [tab, setTab] = useState<'holdings' | 'retired'>('holdings');
  const portfolio = getPortfolio();

  const owned = useMemo(() => portfolio.filter((p) => p.status === 'Active'), [portfolio]);
  const retired = useMemo(() => portfolio.filter((p) => p.status === 'Retired'), [portfolio]);
  const totalValueSol = useMemo(() => {
    return owned.reduce((sum, item) => {
      const v = estimateValue(item);
      return sum + (v ?? 0);
    }, 0);
  }, [owned]);

  const holdingsWithValue = useMemo(() => {
    return owned.map((item) => ({
      ...item,
      value: estimateValue(item) ?? 0,
    }));
  }, [owned]);

  const breakdown = useMemo(() => {
    const map: Record<string, number> = {};
    holdingsWithValue.forEach(({ assetType, value }) => {
      map[assetType] = (map[assetType] ?? 0) + value;
    });
    return Object.entries(map).map(([type, value]) => ({
      type,
      value,
      pct: totalValueSol > 0 ? (value / totalValueSol) * 100 : 0,
    }));
  }, [holdingsWithValue, totalValueSol]);

  if (!connected) {
    return <ConnectScreen />;
  }

  const copyAddress = () => {
    if (publicKey) navigator.clipboard.writeText(publicKey.toBase58());
  };

  return (
    <div className="container-wide py-6 md:py-10">
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8"
      >
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-[var(--accent)] mb-1">
            Your assets
          </p>
          <h1 className="font-display text-2xl md:text-3xl font-semibold text-[var(--text)] mb-1">
            Portfolio
          </h1>
          {publicKey && (
            <button
              type="button"
              onClick={copyAddress}
              className="flex items-center gap-2 text-sm text-[var(--text-muted)] hover:text-[var(--text)] transition"
            >
              <span className="font-mono">{truncateAddress(publicKey.toBase58())}</span>
              <Copy className="h-3.5 w-3.5" />
            </button>
          )}
        </div>
      </motion.div>

      {/* Hero value card */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.05 }}
        className="relative rounded-3xl border border-[var(--accent)]/20 bg-gradient-to-br from-[var(--accent-muted)]/40 via-[var(--bg-card)] to-[var(--bg-card)] p-6 md:p-8 mb-8 overflow-hidden"
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,var(--accent)/8%,transparent)]" />
        <div className="relative flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="text-sm text-[var(--text-muted)] mb-1 flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-[var(--accent)]" />
              Portfolio value
            </p>
            <p className="font-display text-3xl md:text-4xl font-semibold text-[var(--text)] tracking-tight">
              {totalValueSol > 0 ? `${totalValueSol.toFixed(2)} SOL` : '—'}
            </p>
          </div>
          {owned.length > 0 && (
            <div className="flex items-center gap-2 rounded-xl bg-[var(--bg)]/60 px-4 py-2">
              <Sparkles className="h-4 w-4 text-[var(--accent)]" />
              <span className="text-sm text-[var(--text-muted)]">
                {owned.length} holding{owned.length !== 1 ? 's' : ''}
              </span>
            </div>
          )}
        </div>
      </motion.div>

      {/* Stats row with hover */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8"
      >
        {[
          {
            label: 'Holdings',
            value: owned.length,
            icon: Package,
            color: 'text-[var(--accent)]',
            bg: 'bg-[var(--accent-muted)]',
          },
          {
            label: 'Retired',
            value: retired.length,
            icon: Flame,
            color: 'text-amber-400',
            bg: 'bg-amber-500/15',
          },
          {
            label: 'Certificates',
            value: retired.filter((r) => r.certificateId).length,
            icon: FileCheck,
            color: 'text-emerald-400',
            bg: 'bg-emerald-500/15',
          },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            variants={itemMotion}
            whileHover={{ y: -2, transition: { duration: 0.2 } }}
            className="rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-5 transition shadow-none hover:border-[var(--border-hover)] hover:shadow-lg"
          >
            <div className={`inline-flex rounded-xl ${stat.bg} p-2.5 mb-3`}>
              <stat.icon className={`h-5 w-5 ${stat.color}`} />
            </div>
            <p className="text-sm text-[var(--text-muted)]">{stat.label}</p>
            <p className="font-display text-2xl font-semibold text-[var(--text)]">{stat.value}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Breakdown by type (when there are holdings) */}
      {breakdown.length > 0 && (
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15 }}
          className="mb-8"
        >
          <h2 className="font-display text-sm font-semibold text-[var(--text)] mb-3">
            Allocation by type
          </h2>
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-4">
            <div className="flex h-3 rounded-full overflow-hidden bg-[var(--bg-elevated)]">
              {breakdown.map((seg, i) => (
                <motion.div
                  key={seg.type}
                  initial={{ width: 0 }}
                  animate={{ width: `${seg.pct}%` }}
                  transition={{ duration: 0.6, delay: 0.2 + i * 0.05 }}
                  className="h-full first:rounded-l-full last:rounded-r-full"
                  style={{
                    backgroundColor:
                      seg.type === 'Renewable Product'
                        ? 'var(--accent)'
                        : seg.type === 'Carbon Credit'
                          ? '#38bdf8'
                          : seg.type === 'Plastic Credit'
                            ? '#22d3ee'
                            : '#fbbf24',
                  }}
                  title={`${seg.type} ${seg.pct.toFixed(0)}%`}
                />
              ))}
            </div>
            <div className="flex flex-wrap gap-4 mt-3">
              {breakdown.map((seg) => {
                const Icon = TYPE_ICON[seg.type] ?? Package;
                return (
                  <span
                    key={seg.type}
                    className="flex items-center gap-1.5 text-xs text-[var(--text-muted)]"
                  >
                    <Icon className="h-3.5 w-3.5 text-[var(--accent)]" />
                    {seg.type.replace(' Product', '').replace(' Credit', '')} {seg.pct.toFixed(0)}%
                  </span>
                );
              })}
            </div>
          </div>
        </motion.section>
      )}

      {/* Tabs */}
      <div className="flex gap-1 p-1 rounded-xl bg-[var(--bg-card)] border border-[var(--border)] w-fit mb-6">
        <button
          type="button"
          onClick={() => setTab('holdings')}
          className={`px-4 py-2.5 rounded-lg text-sm font-medium transition ${
            tab === 'holdings'
              ? 'bg-[var(--accent)] text-black'
              : 'text-[var(--text-muted)] hover:text-[var(--text)]'
          }`}
        >
          Holdings
        </button>
        <button
          type="button"
          onClick={() => setTab('retired')}
          className={`px-4 py-2.5 rounded-lg text-sm font-medium transition ${
            tab === 'retired'
              ? 'bg-[var(--accent)] text-black'
              : 'text-[var(--text-muted)] hover:text-[var(--text)]'
          }`}
        >
          Retired
        </button>
      </div>

      {/* Holdings */}
      <AnimatePresence mode="wait">
        {tab === 'holdings' && (
          <motion.div
            key="holdings"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] overflow-hidden"
          >
            {owned.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-12 md:p-16 text-center"
              >
                <div className="w-16 h-16 rounded-2xl bg-[var(--accent-muted)]/50 flex items-center justify-center mx-auto mb-5">
                  <Package className="h-8 w-8 text-[var(--accent)]" />
                </div>
                <p className="text-[var(--text)] font-medium mb-1">No holdings yet</p>
                <p className="text-sm text-[var(--text-muted)] mb-6 max-w-sm mx-auto">
                  Buy green assets from the marketplace to build your portfolio.
                </p>
                <Link
                  href="/app/marketplace"
                  className="btn-primary rounded-xl inline-flex items-center gap-2"
                >
                  Browse Marketplace <ArrowUpRight className="h-4 w-4" />
                </Link>
              </motion.div>
            ) : (
              <motion.ul
                variants={container}
                initial="hidden"
                animate="show"
                className="divide-y divide-[var(--border)]"
              >
                {holdingsWithValue.map((item, index) => {
                  const Icon = TYPE_ICON[item.assetType] ?? Package;
                  const gradient = TYPE_COLOR[item.assetType] ?? 'from-[var(--accent-muted)]';
                  const pct = totalValueSol > 0 && item.value > 0 ? (item.value / totalValueSol) * 100 : 0;
                  return (
                    <motion.li key={item.id} variants={itemMotion}>
                      <Link
                        href={`/app/asset/${item.assetId}`}
                        className="flex flex-col sm:flex-row sm:items-center gap-4 p-4 sm:p-5 hover:bg-[var(--bg-elevated)] transition group block"
                      >
                        <div className="flex items-center gap-4 flex-1 min-w-0">
                          <motion.div
                            whileHover={{ scale: 1.05 }}
                            className={`w-12 h-12 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center shrink-0 border border-[var(--border)]`}
                          >
                            <Icon className="h-6 w-6 text-[var(--accent)]" />
                          </motion.div>
                          <div className="min-w-0">
                            <p className="font-medium text-[var(--text)] group-hover:text-[var(--accent)] transition truncate">
                              {item.assetName}
                            </p>
                            <p className="text-sm text-[var(--text-muted)]">
                              {item.quantity} · {item.assetType}
                            </p>
                            {pct > 0 && (
                              <div className="mt-1.5 w-20 h-1 rounded-full bg-[var(--bg-elevated)] overflow-hidden">
                                <motion.div
                                  initial={{ width: 0 }}
                                  animate={{ width: `${pct}%` }}
                                  transition={{ duration: 0.5, delay: index * 0.05 }}
                                  className="h-full rounded-full bg-[var(--accent)]"
                                />
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-4 sm:gap-6">
                          {item.value > 0 && (
                            <span className="font-semibold text-[var(--text)] whitespace-nowrap">
                              {item.value.toFixed(2)} SOL
                            </span>
                          )}
                          <span className="inline-flex items-center gap-1 rounded-lg bg-[var(--accent-muted)] px-2.5 py-1 text-xs font-medium text-[var(--accent)]">
                            Active
                          </span>
                          <ArrowUpRight className="h-5 w-5 text-[var(--text-dim)] group-hover:text-[var(--accent)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition shrink-0" />
                        </div>
                      </Link>
                    </motion.li>
                  );
                })}
              </motion.ul>
            )}
          </motion.div>
        )}

        {tab === 'retired' && (
          <motion.div
            key="retired"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] overflow-hidden"
          >
            {retired.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-12 md:p-16 text-center"
              >
                <div className="w-16 h-16 rounded-2xl bg-amber-500/15 flex items-center justify-center mx-auto mb-5">
                  <Flame className="h-8 w-8 text-amber-400" />
                </div>
                <p className="text-[var(--text)] font-medium mb-1">No retired assets yet</p>
                <p className="text-sm text-[var(--text-muted)] max-w-sm mx-auto">
                  Retire holdings from an asset page to receive an on-chain certificate.
                </p>
              </motion.div>
            ) : (
              <motion.ul
                variants={container}
                initial="hidden"
                animate="show"
                className="divide-y divide-[var(--border)]"
              >
                {retired.map((item, index) => {
                  const Icon = TYPE_ICON[item.assetType] ?? Flame;
                  return (
                    <motion.li key={item.id} variants={itemMotion}>
                      <div className="flex flex-col sm:flex-row sm:items-center gap-4 p-4 sm:p-5 hover:bg-[var(--bg-elevated)] transition">
                        <div className="flex items-center gap-4 flex-1 min-w-0">
                          <motion.div
                            whileHover={{ scale: 1.05 }}
                            className="w-12 h-12 rounded-xl bg-gradient-to-br from-[var(--text-dim)]/20 to-[var(--text-dim)]/10 flex items-center justify-center shrink-0 border border-[var(--border)]"
                          >
                            <Icon className="h-6 w-6 text-[var(--text-muted)]" />
                          </motion.div>
                          <div className="min-w-0">
                            <p className="font-medium text-[var(--text)]">{item.assetName}</p>
                            <p className="text-sm text-[var(--text-muted)]">
                              {item.quantity} · {item.assetType} · Retired
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 shrink-0">
                          {item.certificateId && (
                            <Link
                              href={`/app/certificate/${item.certificateId}`}
                              className="inline-flex items-center gap-1.5 rounded-xl border border-[var(--border)] bg-[var(--bg-elevated)] px-4 py-2 text-sm font-medium text-[var(--text)] hover:border-[var(--accent)] hover:text-[var(--accent)] hover:bg-[var(--accent-muted)]/30 transition"
                            >
                              <FileCheck className="h-4 w-4" />
                              Certificate
                              <ExternalLink className="h-3.5 w-3.5" />
                            </Link>
                          )}
                        </div>
                      </div>
                    </motion.li>
                  );
                })}
              </motion.ul>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="mt-10 text-center"
      >
        <Link
          href="/app/marketplace"
          className="inline-flex items-center gap-2 rounded-xl border border-[var(--accent)]/40 bg-[var(--accent-muted)]/20 px-5 py-3 text-sm font-medium text-[var(--accent)] hover:bg-[var(--accent-muted)]/40 transition"
        >
          Buy more green assets <ArrowUpRight className="h-4 w-4" />
        </Link>
      </motion.div>
    </div>
  );
}
