'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Search, ShoppingCart, ShieldCheck } from 'lucide-react';

const steps = [
  {
    num: '01',
    icon: Search,
    title: 'Browse Green Asset',
    text: 'Explore verified green assets: wood pellets, biomass, carbon credits, RECs, and environmental commodities from certified suppliers.',
  },
  {
    num: '02',
    icon: ShoppingCart,
    title: 'Purchase / Retire',
    text: 'Buy or retire assets directly on the marketplace. Retiring (burning) on-chain creates a permanent record of real-world impact.',
  },
  {
    num: '03',
    icon: ShieldCheck,
    title: 'On-chain Verification',
    text: 'Every transaction is recorded on Solana. Transparent, immutable proof for reporting and ESG compliance.',
  },
];

export function HomeHowItWorksSection() {
  return (
    <section id="how-it-works" className="section-padding border-t border-[var(--border)] scroll-margin">
      <div className="container-wide">
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="section-heading mb-2 text-center"
        >
          How it works
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="section-lead text-center mb-8 max-w-xl mx-auto"
        >
          Three steps from discovery to verified impact
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((s, i) => (
            <motion.div
              key={s.num}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="card card-hover p-6 relative"
            >
              <span className="absolute top-4 right-4 font-mono text-sm text-[var(--text-dim)]">
                {s.num}
              </span>
              <div className="w-10 h-10 rounded-lg bg-[var(--accent-muted)] flex items-center justify-center mb-4">
                <s.icon className="h-5 w-5 text-[var(--accent)]" />
              </div>
              <h3 className="font-display font-semibold text-[var(--text)] mb-2">{s.title}</h3>
              <p className="text-sm text-[var(--text-muted)] leading-relaxed">{s.text}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-10"
        >
          <Link href="/how-it-works" className="text-sm text-[var(--accent)] hover:underline font-medium">
            See full flow & diagram →
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
