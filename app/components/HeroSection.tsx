'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export function HeroSection() {
  return (
    <section className="relative min-h-[88vh] flex items-center overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full bg-[var(--accent)]/6 blur-[140px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[480px] h-[480px] rounded-full bg-[var(--purple)]/5 blur-[120px]" />
      </div>

      <div className="container-narrow relative z-10 text-center">
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-xs font-medium tracking-wide uppercase text-[var(--accent)] mb-4"
        >
          A DAO-Governed Green RWA Marketplace
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.08 }}
          className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-[var(--text)] leading-[1.1] mb-5"
        >
          The DAO That Governs
          <br />
          <span className="text-[var(--accent)]">Green Asset Verification</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.16 }}
          className="text-base md:text-lg text-[var(--text-muted)] max-w-2xl mx-auto mb-8 leading-relaxed"
        >
          Verdana Protocol is a DAO-governed Green RWA marketplace where environmental assets are verified, approved, and standardized by the community — not a marketplace with a DAO, but a DAO that governs the marketplace.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.24 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 flex-wrap"
        >
          <Link href="/app" className="btn-primary w-full sm:w-auto">
            Get started
          </Link>
          <Link href="/governance" className="btn-ghost w-full sm:w-auto">
            Join the DAO
          </Link>
          <Link href="/#what-is-verdana" className="btn-ghost w-full sm:w-auto">
            How it works
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
