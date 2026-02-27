'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Leaf, Cloud, Zap, Recycle } from 'lucide-react';

const assets = [
  { name: 'Wood Pellets (ENplus)', type: 'Biomass', icon: Leaf, id: 'wood-pellets' },
  { name: 'Carbon Credits', type: 'Carbon', icon: Cloud, id: 'carbon' },
  { name: 'Renewable Energy Certificates', type: 'REC', icon: Zap, id: 'rec' },
  { name: 'Plastic Credits', type: 'Plastic', icon: Recycle, id: 'plastic' },
];

export function FeaturedAssetsSection() {
  return (
    <section className="section-padding border-t border-[var(--border)]">
      <div className="container-wide">
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display text-xl md:text-2xl font-semibold text-[var(--text)] mb-2 text-center"
        >
          Featured Assets
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-sm text-[var(--text-muted)] text-center mb-8 max-w-xl mx-auto"
        >
          Sample green assets available on the Verdana marketplace
        </motion.p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {assets.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
            >
              <Link
                href="/app"
                className="card card-hover p-5 block h-full group"
              >
                <div className="w-10 h-10 rounded-lg bg-[var(--accent-muted)] flex items-center justify-center mb-3 group-hover:bg-[var(--accent-muted)]/80">
                  <item.icon className="h-5 w-5 text-[var(--accent)]" />
                </div>
                <h3 className="font-display font-semibold text-[var(--text)] mb-1">{item.name}</h3>
                <p className="text-xs text-[var(--text-muted)]">{item.type}</p>
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
          <Link href="/app" className="btn-primary w-full sm:w-auto">
            Explore Marketplace
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
