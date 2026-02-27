'use client';

import { motion } from 'framer-motion';
import { Database, Link2, ShieldCheck, Coins } from 'lucide-react';

const steps = [
  { num: '01', icon: Database, title: 'Data collection', text: 'Waste and impact data from IoT, manual input, and partners.' },
  { num: '02', icon: Link2, title: 'On-chain recording', text: 'Hashed and recorded on Solana for an immutable audit trail.' },
  { num: '03', icon: ShieldCheck, title: 'Verification', text: 'Smart contracts verify data and environmental standards.' },
  { num: '04', icon: Coins, title: 'Credits', text: 'Verified actions become tokenized credits for trade or retirement.' },
];

export function HowItWorksSection() {
  return (
    <section className="section-padding border-t border-[var(--border)]">
      <div className="container-wide">
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display text-xl md:text-2xl font-semibold text-[var(--text)] mb-2 text-center"
        >
          How it works
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-sm text-[var(--text-muted)] text-center mb-8 max-w-xl mx-auto"
        >
          From data to verified credits in four steps
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
      </div>
    </section>
  );
}
