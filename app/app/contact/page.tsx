'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Users, Truck, Mail } from 'lucide-react';

const inquiryTypes = [
  {
    title: 'Partnership Inquiry',
    desc: 'Explore integrations, API access, or co-marketing with Verdana Protocol.',
    icon: Users,
  },
  {
    title: 'Supplier Onboarding',
    desc: 'Get verified and list your green assets on the marketplace.',
    icon: Truck,
  },
  {
    title: 'General Inquiry',
    desc: 'Questions about the protocol, documentation, or support.',
    icon: Mail,
  },
];

export default function ContactPage() {
  return (
    <main className="min-h-[80vh]">
      <div className="container-narrow py-16 md:py-24">
        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-display text-2xl md:text-3xl font-semibold text-[var(--text)] mb-2"
        >
          Contact
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="text-[var(--text-muted)] text-base mb-12"
        >
          Partnership, supplier onboarding, or general inquiries — we’d love to hear from you.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          {inquiryTypes.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 + i * 0.06 }}
              className="card card-hover p-5"
            >
              <div className="w-10 h-10 rounded-lg bg-[var(--accent-muted)] flex items-center justify-center mb-3">
                <item.icon className="h-5 w-5 text-[var(--accent)]" />
              </div>
              <h2 className="font-display font-semibold text-[var(--text)] mb-2">{item.title}</h2>
              <p className="text-sm text-[var(--text-muted)] leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.section
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="p-6 rounded-2xl border border-[var(--border)] bg-[var(--bg-card)]"
        >
          <h2 className="font-display text-lg font-semibold text-[var(--text)] mb-3">Get in touch</h2>
          <p className="text-sm text-[var(--text-muted)] mb-4">
            Send an email to <a href="mailto:hello@verdana.protocol" className="text-[var(--accent)] hover:underline">hello@verdana.protocol</a> with your inquiry type (Partnership, Supplier Onboarding, or General). We typically respond within 2–3 business days.
          </p>
          <p className="text-sm text-[var(--text-dim)]">
            For technical or integration support, mention “Technical” in the subject line.
          </p>
        </motion.section>

        <div className="mt-10">
          <Link href="/" className="text-sm text-[var(--accent)] hover:underline">← Back to Home</Link>
        </div>
      </div>
    </main>
  );
}
