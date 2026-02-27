'use client';

import Link from 'next/link';
import { WalletProvider } from '@/components/WalletProvider';
import { WalletButton } from '@/components/WalletButton';
import { LayoutDashboard, Store, Briefcase, Vote, ExternalLink } from 'lucide-react';

const nav = [
  { href: '/app/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/app/marketplace', label: 'Marketplace', icon: Store },
  { href: '/app/portfolio', label: 'Portfolio', icon: Briefcase },
  { href: '/app/governance/overview', label: 'Governance', icon: Vote },
];

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <WalletProvider>
      <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] flex flex-col">
        <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-[var(--bg)]/95 backdrop-blur-xl">
          <div className="container-wide flex h-14 md:h-16 items-center justify-between gap-4">
            <Link href="/app" className="font-display text-base font-semibold tracking-tight shrink-0">
              <span className="text-[var(--accent)]">Verdana</span>
              <span className="text-[var(--text-muted)]"> App</span>
            </Link>
            <nav className="hidden md:flex items-center gap-1">
              {nav.map(({ href, label, icon: Icon }) => (
                <Link
                  key={href}
                  href={href}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--bg-elevated)] transition"
                >
                  <Icon className="h-4 w-4" />
                  {label}
                </Link>
              ))}
            </nav>
            <div className="flex items-center gap-3 shrink-0">
              <WalletButton />
              <Link
                href="/"
                className="hidden sm:flex items-center gap-1.5 text-xs text-[var(--text-dim)] hover:text-[var(--text-muted)]"
              >
                <ExternalLink className="h-3.5 w-3.5" />
                Website
              </Link>
            </div>
          </div>
          <div className="md:hidden border-t border-[var(--border)] px-4 py-2 flex gap-2 overflow-x-auto">
            {nav.map(({ href, label }) => (
              <Link key={href} href={href} className="shrink-0 px-3 py-1.5 rounded-lg text-sm bg-[var(--bg-elevated)] text-[var(--text-muted)] hover:text-[var(--text)]">
                {label}
              </Link>
            ))}
          </div>
        </header>
        <main className="flex-1">
          {children}
        </main>
      </div>
    </WalletProvider>
  );
}
