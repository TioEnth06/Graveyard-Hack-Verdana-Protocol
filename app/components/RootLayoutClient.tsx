'use client';

import Link from 'next/link';
import { Menu, X, ChevronDown } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

const productLinks = [
  { label: 'How it works', href: '/#how-it-works' },
  { label: 'Suppliers', href: '/suppliers' },
];

const resourceLinks = [
  { label: 'Docs', href: '/docs' },
  { label: 'Governance', href: '/governance' },
];

function NavDropdown({
  label,
  links,
  open,
  onToggle,
  onClose,
  dropdownRef,
}: {
  label: string;
  links: { label: string; href: string }[];
  open: boolean;
  onToggle: () => void;
  onClose: () => void;
  dropdownRef: React.RefObject<HTMLDivElement | null>;
}) {
  useEffect(() => {
    if (!open) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) onClose();
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open, onClose, dropdownRef]);

  return (
    <div className="relative" ref={dropdownRef as React.RefObject<HTMLDivElement>}>
      <button
        type="button"
        onClick={onToggle}
        className="flex items-center gap-0.5 text-sm text-[var(--text-muted)] hover:text-[var(--text)] transition"
        aria-expanded={open}
        aria-haspopup="true"
      >
        {label}
        <ChevronDown className={`h-4 w-4 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div className="absolute top-full left-0 mt-1 py-1 min-w-[180px] rounded-xl border border-[var(--border)] bg-[var(--bg-elevated)] shadow-lg z-50">
          {links.map(({ label: linkLabel, href }) => (
            <Link
              key={href}
              href={href}
              className="block px-4 py-2.5 text-sm text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--bg-card)] first:rounded-t-[10px] last:rounded-b-[10px]"
            >
              {linkLabel}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export function RootLayoutClient({ children }: { children: React.ReactNode }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [productOpen, setProductOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);
  const productRef = useRef<HTMLDivElement>(null);
  const resourcesRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const isApp = pathname?.startsWith('/app');

  // Scroll to section when URL has hash (e.g. /#how-it-works)
  useEffect(() => {
    if (pathname !== '/' || typeof window === 'undefined') return;
    const hash = window.location.hash?.slice(1);
    if (!hash) return;
    const el = document.getElementById(hash);
    if (el) {
      const t = setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }), 150);
      return () => clearTimeout(t);
    }
  }, [pathname]);

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
      {!isApp && (
        <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-[var(--bg)]/90 backdrop-blur-xl">
          <div className="container-wide">
            <div className="flex h-14 md:h-16 items-center justify-between">
              <Link href="/" className="font-display text-base font-semibold tracking-tight shrink-0">
                <span className="text-[var(--accent)]">Verdana</span>
                <span className="text-[var(--text-muted)]"> Protocol</span>
              </Link>

              <nav className="hidden md:flex flex-1 items-center justify-center gap-8">
                <NavDropdown
                  label="Product"
                  links={productLinks}
                  open={productOpen}
                  onToggle={() => {
                    setResourcesOpen(false);
                    setProductOpen((o) => !o);
                  }}
                  onClose={() => setProductOpen(false)}
                  dropdownRef={productRef}
                />
                <NavDropdown
                  label="Resources"
                  links={resourceLinks}
                  open={resourcesOpen}
                  onToggle={() => {
                    setProductOpen(false);
                    setResourcesOpen((o) => !o);
                  }}
                  onClose={() => setResourcesOpen(false)}
                  dropdownRef={resourcesRef}
                />
                <Link href="/about" className="text-sm text-[var(--text-muted)] hover:text-[var(--text)] transition">
                  About
                </Link>
                <Link href="/contact" className="text-sm text-[var(--text-muted)] hover:text-[var(--text)] transition">
                  Contact
                </Link>
              </nav>

              <a href="/app" className="hidden md:flex shrink-0 rounded-lg bg-[var(--accent)] px-3 py-1.5 text-sm font-semibold text-black hover:bg-[var(--accent-hover)] transition items-center">
                Get started
              </a>
              <button
                type="button"
                onClick={() => setMobileMenuOpen((o) => !o)}
                className="md:hidden p-2 text-[var(--text-muted)] hover:text-[var(--text)]"
                aria-label="Menu"
              >
                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>

            {mobileMenuOpen && (
              <div className="md:hidden border-t border-[var(--border)] bg-[var(--bg-elevated)] px-4 py-4 space-y-1">
                <div className="pt-1 pb-2">
                  <p className="text-xs font-medium text-[var(--text-dim)] uppercase tracking-wider px-1 mb-1">Product</p>
                  {productLinks.map(({ label, href }) => (
                    <Link key={href} href={href} onClick={() => setMobileMenuOpen(false)} className="block py-2 px-3 rounded-lg text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--bg-card)]">
                      {label}
                    </Link>
                  ))}
                </div>
                <div className="pt-1 pb-2">
                  <p className="text-xs font-medium text-[var(--text-dim)] uppercase tracking-wider px-1 mb-1">Resources</p>
                  {resourceLinks.map(({ label, href }) => (
                    <Link key={href} href={href} onClick={() => setMobileMenuOpen(false)} className="block py-2 px-3 rounded-lg text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--bg-card)]">
                      {label}
                    </Link>
                  ))}
                </div>
                <div className="border-t border-[var(--border)] pt-3 mt-2 space-y-0.5">
                  <Link href="/about" onClick={() => setMobileMenuOpen(false)} className="block py-2 px-3 rounded-lg text-[var(--text-muted)] hover:text-[var(--text)]">About</Link>
                  <Link href="/contact" onClick={() => setMobileMenuOpen(false)} className="block py-2 px-3 rounded-lg text-[var(--text-muted)] hover:text-[var(--text)]">Contact</Link>
                  <a href="/app" onClick={() => setMobileMenuOpen(false)} className="block py-2.5 px-3 rounded-lg text-[var(--accent)] font-medium bg-[var(--accent-muted)]">
                    Get started
                  </a>
                </div>
              </div>
            )}
          </div>
        </header>
      )}

      {children}

      {!isApp && (
        <footer className="mt-24 border-t border-[var(--border)] bg-[var(--bg-elevated)]">
          <div className="container-wide py-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
              <div>
                <div className="font-display font-semibold text-[var(--text)] mb-2">Verdana Protocol</div>
                <p className="text-sm text-[var(--text-muted)] max-w-xs">
                  Green Asset Marketplace & Infrastructure for Real-World Impact.
                </p>
              </div>
              <div>
                <div className="text-sm font-medium text-[var(--text)] mb-3">Product</div>
                <ul className="space-y-2 text-sm text-[var(--text-muted)]">
                  <li><Link href="/#cta" className="hover:text-[var(--accent)]">Explore Marketplace</Link></li>
                  <li><Link href="/#how-it-works" className="hover:text-[var(--accent)]">How it works</Link></li>
                  <li><Link href="/suppliers" className="hover:text-[var(--accent)]">Suppliers</Link></li>
                </ul>
              </div>
              <div>
                <div className="text-sm font-medium text-[var(--text)] mb-3">Resources</div>
                <ul className="space-y-2 text-sm text-[var(--text-muted)]">
                  <li><Link href="/docs" className="hover:text-[var(--accent)]">Docs</Link></li>
                  <li><Link href="/governance" className="hover:text-[var(--accent)]">Governance</Link></li>
                  <li><Link href="/about" className="hover:text-[var(--accent)]">About</Link></li>
                  <li><Link href="/contact" className="hover:text-[var(--accent)]">Contact</Link></li>
                </ul>
              </div>
              <div>
                <div className="text-sm font-medium text-[var(--text)] mb-3">Connect</div>
                <ul className="space-y-2 text-sm text-[var(--text-muted)]">
                  <li><a href="#" className="hover:text-[var(--accent)]">Twitter</a></li>
                  <li><a href="#" className="hover:text-[var(--accent)]">Discord</a></li>
                </ul>
              </div>
            </div>
            <div className="mt-12 pt-8 border-t border-[var(--border)] text-center text-sm text-[var(--text-dim)]">
              © {new Date().getFullYear()} Verdana Protocol. All rights reserved.
            </div>
          </div>
        </footer>
      )}
    </div>
  );
}
