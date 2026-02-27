'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { BadgeCheck } from 'lucide-react';

const suppliers = [
  { id: '1', name: 'Green Biomass Co.', region: 'EU', certs: 'ENplus, SBP', assets: 'Wood pellets, Biomass' },
  { id: '2', name: 'Pacific Carbon Solutions', region: 'APAC', certs: 'VCS, Gold Standard', assets: 'Carbon credits' },
  { id: '3', name: 'Nordic Pellets Ltd', region: 'Nordic', certs: 'ENplus, FSC', assets: 'Wood pellets' },
  { id: '4', name: 'EcoPlastic Partners', region: 'Americas', certs: 'Ocean Bound Plastic', assets: 'Plastic credits' },
  { id: '5', name: 'SunREC Energy', region: 'APAC', certs: 'I-REC, TIGR', assets: 'RECs' },
  { id: '6', name: 'Forest Carbon Group', region: 'EU', certs: 'VCS, CCB', assets: 'Carbon credits' },
];

export default function SuppliersPage() {
  return (
    <main className="min-h-[80vh]">
      <div className="container-wide py-16 md:py-24">
        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-display text-2xl md:text-3xl font-semibold text-[var(--text)] mb-2"
        >
          Verified Suppliers
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="text-[var(--text-muted)] text-base mb-10 max-w-2xl"
        >
          Suppliers listed on Verdana Protocol have passed verification. Each profile includes company overview, location, certifications, and assets supplied.
        </motion.p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {suppliers.map((s, i) => (
            <motion.div
              key={s.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 + i * 0.04 }}
            >
              <Link
                href={`/supplier/${s.id}`}
                className="card card-hover p-5 block h-full group"
              >
                <div className="flex items-center gap-2 mb-3">
                  <BadgeCheck className="h-5 w-5 text-[var(--accent)] shrink-0" aria-hidden />
                  <span className="text-xs font-medium text-[var(--accent)]">Verified</span>
                </div>
                <h2 className="font-display font-semibold text-[var(--text)] mb-1 group-hover:text-[var(--accent)] transition">
                  {s.name}
                </h2>
                <p className="text-xs text-[var(--text-muted)] mb-2">{s.region}</p>
                <p className="text-xs text-[var(--text-dim)] mb-1">Certs: {s.certs}</p>
                <p className="text-xs text-[var(--text-dim)]">Assets: {s.assets}</p>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-10"
        >
          <Link href="/" className="text-sm text-[var(--accent)] hover:underline">← Back to Home</Link>
        </motion.div>
      </div>
    </main>
  );
}
