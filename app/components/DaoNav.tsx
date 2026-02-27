'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutGrid, FileText, Wallet, Vote } from 'lucide-react';

const links = [
  { href: '/app/governance/overview', label: 'Overview', icon: LayoutGrid },
  { href: '/app/governance/proposals', label: 'Proposals', icon: FileText },
  { href: '/app/governance/treasury', label: 'Treasury', icon: Wallet },
  { href: '/app/governance/vote', label: 'Vote', icon: Vote },
];

export function DaoNav() {
  const pathname = usePathname();

  return (
    <nav className="flex gap-1 p-1 rounded-xl bg-[var(--bg-card)] border border-[var(--border)] w-full overflow-x-auto">
      {links.map(({ href, label, icon: Icon }) => {
        const isProposals = href === '/app/governance/proposals';
        const isActive =
          pathname === href ||
          (isProposals && pathname?.startsWith('/app/governance/proposal'));
        return (
          <Link
            key={href}
            href={href}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium whitespace-nowrap transition ${
              isActive
                ? 'bg-[var(--accent)] text-black'
                : 'text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--bg-elevated)]'
            }`}
          >
            <Icon className="h-4 w-4 shrink-0" />
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
