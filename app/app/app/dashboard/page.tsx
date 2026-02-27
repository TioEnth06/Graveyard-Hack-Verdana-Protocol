'use client';

import { useWallet } from '@solana/wallet-adapter-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ConnectScreen } from '@/components/ConnectScreen';
import { getPortfolio, getCertificates, getTxHistory, getAssetById } from '@/lib/dapp-data';
import type { PortfolioItem } from '@/lib/dapp-data';
import {
  Store,
  Flame,
  FileCheck,
  Cloud,
  Zap,
  History,
  ArrowUpRight,
  Package,
  ExternalLink,
  Vote,
  ShoppingCart,
  Leaf,
  TrendingUp,
} from 'lucide-react';

function truncateTxHash(hash: string, head = 6, tail = 4) {
  if (hash.length <= head + tail) return hash;
  return `${hash.slice(0, head)}...${hash.slice(-tail)}`;
}

function formatTime(iso: string) {
  const d = new Date(iso);
  const now = new Date();
  const diffMs = now.getTime() - d.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);
  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: d.getFullYear() !== now.getFullYear() ? 'numeric' : undefined });
}

function estimateValue(item: PortfolioItem): number {
  const asset = getAssetById(item.assetId);
  if (!asset) return 0;
  const n = parseFloat(item.quantity.replace(/[^0-9.]/g, ''));
  return Number.isNaN(n) ? 0 : n * asset.priceSol;
}

const fadeUp = { initial: { opacity: 0, y: 12 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.35 } };

export default function DashboardPage() {
  const { connected } = useWallet();
  const portfolio = getPortfolio();
  const certificates = getCertificates();
  const txHistory = getTxHistory();

  const owned = portfolio.filter((p) => p.status === 'Active');
  const retired = portfolio.filter((p) => p.status === 'Retired');
  const portfolioValueSol = owned.reduce((sum, item) => sum + estimateValue(item), 0);
  const totalRetiredCo2 = '5 tCO₂e';
  const totalREC = '0 MWh';
  const recentTx = txHistory.slice(0, 5);

  if (!connected) {
    return <ConnectScreen />;
  }

  const quickActions = [
    { href: '/app/marketplace', label: 'Marketplace', desc: 'Buy green assets', icon: Store, accent: true },
    { href: '/app/portfolio', label: 'Portfolio', desc: 'Holdings & retire', icon: Package },
    { href: '/app/governance/overview', label: 'Governance', desc: 'Proposals & vote', icon: Vote },
    { href: '/app/purchase-order', label: 'Purchase Order', desc: 'Enterprise PO', icon: ShoppingCart },
  ];

  return (
    <div className="container-wide py-8 md:py-12">
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="mb-8"
      >
        <p className="text-xs font-medium uppercase tracking-wider text-[var(--accent)] mb-1">
          Overview
        </p>
        <h1 className="font-display text-2xl md:text-3xl font-semibold text-[var(--text)] tracking-tight mb-1">
          Dashboard
        </h1>
        <p className="text-[var(--text-muted)] text-sm max-w-xl">
          Your green assets, impact metrics, and quick access to the app.
        </p>
      </motion.div>

      {/* Hero value card */}
      <motion.div
        {...fadeUp}
        className="rounded-2xl border border-[var(--accent)]/25 bg-gradient-to-br from-[var(--accent-muted)]/40 to-[var(--bg-card)] p-6 md:p-8 mb-8"
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-[var(--accent-muted)] flex items-center justify-center shrink-0">
              <TrendingUp className="h-7 w-7 text-[var(--accent)]" />
            </div>
            <div>
              <p className="text-sm text-[var(--text-muted)] mb-0.5">Portfolio value</p>
              <p className="font-display text-2xl md:text-3xl font-semibold text-[var(--text)]">
                {portfolioValueSol > 0 ? `${portfolioValueSol.toFixed(2)} SOL` : '—'}
              </p>
              <p className="text-xs text-[var(--text-dim)] mt-1">
                {owned.length} active holding{owned.length !== 1 ? 's' : ''}
              </p>
            </div>
          </div>
          <Link
            href="/app/portfolio"
            className="inline-flex items-center gap-2 rounded-xl bg-[var(--accent)] text-black px-4 py-2.5 text-sm font-semibold hover:bg-[var(--accent-hover)] transition shrink-0"
          >
            View portfolio <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </motion.div>

      {/* Stats row */}
      <motion.div
        {...fadeUp}
        className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8"
      >
        {[
          { label: 'Assets owned', value: owned.length, icon: Package, color: 'text-[var(--accent)]' },
          { label: 'Assets retired', value: retired.length, icon: Flame, color: 'text-amber-400' },
          { label: 'NFT certificates', value: certificates.length, icon: FileCheck, color: 'text-[var(--purple)]' },
        ].map((stat) => (
          <div
            key={stat.label}
            className="rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-5 hover:border-[var(--border-hover)] transition"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[var(--text-muted)] mb-1">{stat.label}</p>
                <p className="font-display text-2xl font-semibold text-[var(--text)]">{stat.value}</p>
              </div>
              <div className={`w-11 h-11 rounded-xl bg-[var(--bg-elevated)] flex items-center justify-center ${stat.color}`}>
                <stat.icon className="h-5 w-5" />
              </div>
            </div>
          </div>
        ))}
      </motion.div>

      {/* Impact + Quick actions side by side on large screens */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
        {/* Impact summary */}
        <motion.section
          {...fadeUp}
          className="lg:col-span-2"
        >
          <h2 className="font-display text-lg font-semibold text-[var(--text)] mb-4 flex items-center gap-2">
            <Leaf className="h-5 w-5 text-[var(--accent)]" />
            Impact summary
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-5 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-[var(--accent-muted)] flex items-center justify-center shrink-0">
                <Cloud className="h-6 w-6 text-[var(--accent)]" />
              </div>
              <div>
                <p className="text-sm text-[var(--text-muted)]">CO₂ equivalent retired</p>
                <p className="font-display text-xl font-semibold text-[var(--text)]">{totalRetiredCo2}</p>
              </div>
            </div>
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-5 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-[var(--accent-muted)] flex items-center justify-center shrink-0">
                <Zap className="h-6 w-6 text-[var(--accent)]" />
              </div>
              <div>
                <p className="text-sm text-[var(--text-muted)]">Renewable energy offset</p>
                <p className="font-display text-xl font-semibold text-[var(--text)]">{totalREC}</p>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Quick actions */}
        <motion.section {...fadeUp}>
          <h2 className="font-display text-lg font-semibold text-[var(--text)] mb-4">Quick actions</h2>
          <div className="space-y-2">
            {quickActions.map((action) => (
              <Link
                key={action.href}
                href={action.href}
                className={`flex items-center gap-3 rounded-xl border p-4 transition group ${
                  action.accent
                    ? 'border-[var(--accent)]/40 bg-[var(--accent-muted)]/20 hover:bg-[var(--accent-muted)]/30 hover:border-[var(--accent)]/60'
                    : 'border-[var(--border)] bg-[var(--bg-card)] hover:border-[var(--border-hover)] hover:bg-[var(--bg-elevated)]'
                }`}
              >
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${action.accent ? 'bg-[var(--accent)]/20 text-[var(--accent)]' : 'bg-[var(--bg-elevated)] text-[var(--text-muted)] group-hover:text-[var(--accent)]'}`}>
                  <action.icon className="h-5 w-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-medium text-[var(--text)] group-hover:text-[var(--accent)] transition">{action.label}</p>
                  <p className="text-xs text-[var(--text-muted)]">{action.desc}</p>
                </div>
                <ArrowUpRight className="h-4 w-4 text-[var(--text-dim)] group-hover:text-[var(--accent)] group-hover:translate-x-0.5 transition shrink-0" />
              </Link>
            ))}
          </div>
        </motion.section>
      </div>

      {/* Transaction history */}
      <motion.section {...fadeUp}>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
          <h2 className="font-display text-lg font-semibold text-[var(--text)] flex items-center gap-2">
            <History className="h-5 w-5 text-[var(--text-muted)]" />
            Recent activity
          </h2>
          {txHistory.length > 0 && (
            <a
              href="https://explorer.solana.com/?cluster=devnet"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-[var(--accent)] hover:underline flex items-center gap-1.5"
            >
              View on Explorer <ExternalLink className="h-3.5 w-3.5" />
            </a>
          )}
        </div>
        {recentTx.length === 0 ? (
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] overflow-hidden">
            <div className="px-6 py-16 text-center">
              <History className="h-12 w-12 text-[var(--text-dim)] mx-auto mb-4 opacity-60" />
              <p className="text-[var(--text-muted)] text-sm mb-2">No transactions yet</p>
              <p className="text-xs text-[var(--text-dim)] mb-4">Buy or retire assets to see activity here.</p>
              <Link href="/app/marketplace" className="btn-primary rounded-xl inline-flex items-center gap-2">
                <Store className="h-4 w-4" />
                Browse marketplace
              </Link>
            </div>
          </div>
        ) : (
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[var(--border)] bg-[var(--bg-elevated)]/80">
                    <th className="text-left py-3.5 px-4 font-medium text-[var(--text-muted)]">Type</th>
                    <th className="text-left py-3.5 px-4 font-medium text-[var(--text-muted)]">Asset</th>
                    <th className="text-left py-3.5 px-4 font-medium text-[var(--text-muted)] hidden sm:table-cell">Amount</th>
                    <th className="text-left py-3.5 px-4 font-medium text-[var(--text-muted)]">Time</th>
                    <th className="text-right py-3.5 px-4 font-medium text-[var(--text-muted)]">Tx</th>
                  </tr>
                </thead>
                <tbody>
                  {recentTx.map((tx) => (
                    <tr key={tx.id} className="border-b border-[var(--border)] last:border-0 hover:bg-[var(--bg-elevated)]/50 transition-colors">
                      <td className="py-3.5 px-4">
                        <span
                          className={`inline-flex px-2.5 py-1 rounded-lg text-xs font-medium ${
                            tx.type === 'buy'
                              ? 'bg-[var(--accent-muted)] text-[var(--accent)]'
                              : 'bg-[var(--purple-muted)] text-[var(--purple)]'
                          }`}
                        >
                          {tx.type === 'buy' ? 'Buy' : 'Retire'}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-[var(--text)]">{tx.assetName}</td>
                      <td className="py-3.5 px-4 text-[var(--text-muted)] hidden sm:table-cell">{tx.amount}</td>
                      <td className="py-3.5 px-4 text-[var(--text-muted)]">{formatTime(tx.timestamp)}</td>
                      <td className="py-3.5 px-4 text-right">
                        <a
                          href={`https://explorer.solana.com/tx/${tx.txHash}?cluster=devnet`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-mono text-xs text-[var(--accent)] hover:underline inline-flex items-center gap-1"
                        >
                          {truncateTxHash(tx.txHash)}
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {txHistory.length > 5 && (
              <div className="border-t border-[var(--border)] px-4 py-3 text-center">
                <span className="text-xs text-[var(--text-muted)]">
                  Showing latest 5 of {txHistory.length} transactions
                </span>
              </div>
            )}
          </div>
        )}
      </motion.section>
    </div>
  );
}
