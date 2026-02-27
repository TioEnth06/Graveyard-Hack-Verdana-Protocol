'use client';

import { motion } from 'framer-motion';
import { Cloud, Recycle, TrendingUp, Leaf } from 'lucide-react';

const stats = [
  { label: 'Carbon credits', value: '1.2M+', icon: Cloud },
  { label: 'Waste tracked (tons)', value: '52.3M', icon: Recycle },
  { label: 'CO₂ offset (tons)', value: '26.1M', icon: Leaf },
  { label: 'Volume (USD)', value: '$4.2M', icon: TrendingUp },
];

export function MetricsSection() {
  return (
    <section className="section-padding border-t border-[var(--border)]">
      <div className="container-wide">
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display text-xl md:text-2xl font-semibold text-[var(--text)] mb-2 text-center"
        >
          Real-world impact
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-sm text-[var(--text-muted)] text-center mb-8 max-w-xl mx-auto"
        >
          On-chain metrics from verified environmental actions
        </motion.p>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="card card-hover p-6"
            >
              <item.icon className="h-5 w-5 text-[var(--accent)] mb-4" />
              <div className="font-display text-xl font-semibold text-[var(--text)]">
                {item.value}
              </div>
              <div className="text-sm text-[var(--text-muted)] mt-1">{item.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
