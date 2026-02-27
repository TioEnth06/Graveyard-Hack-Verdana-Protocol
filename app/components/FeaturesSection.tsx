'use client';

import { motion } from 'framer-motion';
import { Shield, Zap, Globe2, BarChart3 } from 'lucide-react';

const features = [
  {
    icon: Shield,
    title: 'Proof-of-Impact',
    text: 'IoT and AI verification for transparent, tamper-proof environmental data.',
  },
  {
    icon: Zap,
    title: 'Low fees',
    text: 'Solana’s speed and low cost keep more value in environmental projects.',
  },
  {
    icon: Globe2,
    title: 'Global marketplace',
    text: 'Trade verified carbon, plastic, and wood credits with instant settlement.',
  },
  {
    icon: BarChart3,
    title: 'On-chain metrics',
    text: 'Every credit is recorded on-chain with full traceability.',
  },
];

export function FeaturesSection() {
  return (
    <section className="section-padding border-t border-[var(--border)] bg-[var(--bg-elevated)]">
      <div className="container-wide">
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display text-2xl md:text-3xl font-semibold text-[var(--text)] mb-2 text-center"
        >
          Built for sustainability
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-[var(--text-muted)] text-center mb-12 max-w-xl mx-auto"
        >
          Infrastructure for verifiable environmental impact
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="card card-hover p-6 flex gap-4"
            >
              <div className="shrink-0 w-12 h-12 rounded-xl bg-[var(--accent-muted)] flex items-center justify-center">
                <f.icon className="h-6 w-6 text-[var(--accent)]" />
              </div>
              <div>
                <h3 className="font-display font-semibold text-[var(--text)] mb-2">{f.title}</h3>
                <p className="text-sm text-[var(--text-muted)] leading-relaxed">{f.text}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
