'use client';

import Link from 'next/link';
import { UserCheck, Package, BarChart3, Upload } from 'lucide-react';

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
      <div className="border-b border-[var(--border)] bg-[var(--bg-elevated)]">
        <div className="container-wide flex h-14 items-center justify-between">
          <Link href="/" className="font-display text-base font-semibold">
            <span className="text-[var(--accent)]">Verdana</span>
            <span className="text-[var(--text-muted)]"> Admin</span>
          </Link>
          <Link href="/" className="text-sm text-[var(--text-muted)] hover:text-[var(--text)]">← Back to site</Link>
        </div>
      </div>

      <div className="container-wide py-12">
        <h1 className="font-display text-2xl font-semibold text-[var(--text)] mb-2">Admin (MVP)</h1>
        <p className="text-[var(--text-muted)] text-sm mb-8">
          Internal tools: supplier approval, asset listing approval, verification upload, impact metrics.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="card p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-[var(--accent-muted)] flex items-center justify-center">
                <UserCheck className="h-5 w-5 text-[var(--accent)]" />
              </div>
              <h2 className="font-display font-semibold text-[var(--text)]">Supplier approval</h2>
            </div>
            <p className="text-sm text-[var(--text-muted)] mb-4">Review and approve supplier onboarding requests.</p>
            <button type="button" className="btn-ghost text-sm py-2 px-4" disabled>Coming soon</button>
          </div>

          <div className="card p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-[var(--accent-muted)] flex items-center justify-center">
                <Package className="h-5 w-5 text-[var(--accent)]" />
              </div>
              <h2 className="font-display font-semibold text-[var(--text)]">Asset listing approval</h2>
            </div>
            <p className="text-sm text-[var(--text-muted)] mb-4">Approve new asset listings for the marketplace.</p>
            <button type="button" className="btn-ghost text-sm py-2 px-4" disabled>Coming soon</button>
          </div>

          <div className="card p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-[var(--accent-muted)] flex items-center justify-center">
                <Upload className="h-5 w-5 text-[var(--accent)]" />
              </div>
              <h2 className="font-display font-semibold text-[var(--text)]">Manual verification upload</h2>
            </div>
            <p className="text-sm text-[var(--text-muted)] mb-4">Upload verification documents and link to on-chain data.</p>
            <button type="button" className="btn-ghost text-sm py-2 px-4" disabled>Coming soon</button>
          </div>

          <div className="card p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-[var(--accent-muted)] flex items-center justify-center">
                <BarChart3 className="h-5 w-5 text-[var(--accent)]" />
              </div>
              <h2 className="font-display font-semibold text-[var(--text)]">Impact metric input</h2>
            </div>
            <p className="text-sm text-[var(--text-muted)] mb-4">Enter or update impact metrics for assets.</p>
            <button type="button" className="btn-ghost text-sm py-2 px-4" disabled>Coming soon</button>
          </div>
        </div>

        <p className="mt-8 text-xs text-[var(--text-dim)]">
          Admin actions are not public. Authentication and role checks to be added.
        </p>
      </div>
    </div>
  );
}
