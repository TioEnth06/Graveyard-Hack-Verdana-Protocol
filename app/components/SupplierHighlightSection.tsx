'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { BadgeCheck, ArrowRight } from 'lucide-react';

const highlighted = [
  { name: 'Green Biomass Co.', region: 'EU', certs: 'ENplus, SBP', id: '1' },
  { name: 'Pacific Carbon Solutions', region: 'APAC', certs: 'VCS, Gold Standard', id: '2' },
  { name: 'Nordic Pellets Ltd', region: 'Nordic', certs: 'ENplus, FSC', id: '3' },
];

export function SupplierHighlightSection() {
  return (
    <section className="section-padding border-t border-[var(--border)] bg-[var(--bg-elevated)]">
      <div className="container-wide">
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display text-xl md:text-2xl font-semibold text-[var(--text)] mb-2 text-center"
        >
          Verified Suppliers
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-sm text-[var(--text-muted)] text-center mb-8 max-w-xl mx-auto"
        >
          Trusted suppliers with on-chain verification and traceability
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {highlighted.map((s, i) => (
            <motion.div
              key={s.id}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
            >
              <Link
                href={`/supplier/${s.id}`}
                className="card card-hover p-5 block h-full group"
              >
                <div className="flex items-center gap-2 mb-3">
                  <BadgeCheck className="h-5 w-5 text-[var(--accent)] shrink-0" />
                  <span className="text-xs font-medium text-[var(--accent)]">Verified</span>
                </div>
                <h3 className="font-display font-semibold text-[var(--text)] mb-1 group-hover:text-[var(--accent)] transition">
                  {s.name}
                </h3>
                <p className="text-xs text-[var(--text-muted)] mb-2">{s.region}</p>
                <p className="text-xs text-[var(--text-dim)]">{s.certs}</p>
                <span className="inline-flex items-center gap-1 text-xs text-[var(--accent)] mt-3 font-medium">
                  View detail <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-8"
        >
          <Link href="/suppliers" className="text-sm text-[var(--accent)] hover:underline font-medium">
            View all suppliers →
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
