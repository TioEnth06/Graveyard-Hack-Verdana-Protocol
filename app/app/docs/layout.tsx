'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FileText, BookOpen, HelpCircle, BarChart3, Home } from 'lucide-react';

const docNav = [
  { title: 'Docs', href: '/docs', icon: BookOpen },
  { title: 'Litepaper', href: '/docs/litepaper', icon: FileText },
  { title: 'Technical', href: '/docs/technical', icon: BookOpen },
  { title: 'FAQ', href: '/docs/faq', icon: HelpCircle },
  { title: 'ESG', href: '/docs/esg', icon: BarChart3 },
];

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-[80vh] flex flex-col">
      <div className="border-b border-[var(--border)] bg-[var(--bg)]/95 backdrop-blur">
        <div className="container-narrow">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 py-4">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-sm text-[var(--text-muted)] hover:text-[var(--accent)] transition"
            >
              <Home className="h-4 w-4" />
              Home
            </Link>
            <nav className="flex flex-wrap items-center gap-1">
              {docNav.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition ${
                      isActive
                        ? 'bg-[var(--accent-muted)] text-[var(--accent)]'
                        : 'text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--bg-elevated)]'
                    }`}
                  >
                    <item.icon className="h-3.5 w-3.5" />
                    {item.title}
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      </div>
      <div className="flex-1">
        {children}
      </div>
    </div>
  );
}
