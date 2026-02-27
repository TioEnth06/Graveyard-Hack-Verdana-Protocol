'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export function CtaSection() {
  return (
    <section id="cta" className="section-padding border-t border-[var(--border)] bg-[var(--bg-elevated)] scroll-margin">
      <div className="container-narrow text-center">
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="section-heading mb-3"
        >
          Ready to get started?
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="section-lead mb-6 max-w-xl mx-auto"
        >
          Launch the app to explore the marketplace, retire assets, or become a supplier.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 flex-wrap"
        >
          <Link href="/app" className="btn-primary w-full sm:w-auto">
            Launch App
          </Link>
          <Link href="/contact" className="btn-ghost w-full sm:w-auto">
            Contact Us
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
