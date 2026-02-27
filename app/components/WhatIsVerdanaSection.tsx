'use client';

import { motion } from 'framer-motion';
import { Leaf, CreditCard, Flame, Link2 } from 'lucide-react';

const points = [
  {
    icon: Leaf,
    text: 'Trading of renewable energy products (wood pellet, biomass, etc.)',
  },
  {
    icon: CreditCard,
    text: 'Trading of environmental credits (Plastic Credit, REC, Carbon Credit)',
  },
  {
    icon: Flame,
    text: 'Retiring / burning assets on-chain as proof of real-world impact',
  },
  {
    icon: Link2,
    text: 'Supply chain transparency through blockchain verification',
  },
];

export function WhatIsVerdanaSection() {
  return (
    <section id="what-is-verdana" className="section-padding border-t border-[var(--border)] scroll-margin">
      <div className="container-wide">
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="section-heading mb-3 text-center"
        >
          What is Verdana Protocol?
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="section-lead text-center mb-8 max-w-2xl mx-auto"
        >
          Verdana is a <strong className="text-[var(--text)]">DAO that governs a Green Asset Marketplace</strong>. The community verifies and standardizes environmental assets. Layer 1: Marketplace · Layer 2: Burn & Impact · Layer 3: DAO Governance.
        </motion.p>

        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto mb-14">
          {points.map((item, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="flex gap-4 items-start p-4 rounded-xl border border-[var(--border)] bg-[var(--bg-card)]"
            >
              <div className="shrink-0 w-10 h-10 rounded-lg bg-[var(--accent-muted)] flex items-center justify-center">
                <item.icon className="h-5 w-5 text-[var(--accent)]" />
              </div>
              <span className="text-[var(--text)] pt-1.5">{item.text}</span>
            </motion.li>
          ))}
        </ul>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center p-6 md:p-8 rounded-2xl border border-[var(--accent)]/30 bg-[var(--accent-muted)]/50"
        >
          <p className="text-[var(--text)] font-medium mb-2">DAO controls:</p>
          <p className="text-base text-[var(--accent)] font-display font-semibold">
            Supplier listing · Asset standards · Treasury allocation
          </p>
        </motion.div>
      </div>
    </section>
  );
}
