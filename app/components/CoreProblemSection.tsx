'use client';

import { motion } from 'framer-motion';
import { AlertTriangle, FileQuestion, Globe, Store } from 'lucide-react';

const problems = [
  {
    icon: FileQuestion,
    text: 'Environmental credits are hard to verify publicly',
  },
  {
    icon: Globe,
    text: 'Renewable commodities lack a global transparency standard',
  },
  {
    icon: FileQuestion,
    text: 'Impact is often just a PDF report, not digital proof',
  },
  {
    icon: Store,
    text: 'Retail & SMEs struggle to access green assets directly',
  },
];

export function CoreProblemSection() {
  return (
    <section id="problem" className="section-padding border-t border-[var(--border)] bg-[var(--bg-elevated)] scroll-margin">
      <div className="container-wide">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center justify-center gap-2 mb-6"
        >
          <AlertTriangle className="h-6 w-6 text-amber-400" />
          <h2 className="font-display text-xl md:text-2xl font-semibold text-[var(--text)]">
            Core Problem
          </h2>
        </motion.div>
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-[var(--text-muted)] text-center mb-10 max-w-2xl mx-auto"
        >
          Today:
        </motion.p>

        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl mx-auto mb-12">
          {problems.map((item, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="flex gap-3 items-center p-4 rounded-xl border border-[var(--border)] bg-[var(--bg-card)]"
            >
              <item.icon className="h-5 w-5 shrink-0 text-[var(--text-dim)]" />
              <span className="text-[var(--text)]">{item.text}</span>
            </motion.li>
          ))}
        </ul>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center text-lg md:text-xl font-display font-semibold text-[var(--accent)]"
        >
          Verdana is here to change that.
        </motion.p>
      </div>
    </section>
  );
}
