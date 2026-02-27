'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { FileText, BookOpen, HelpCircle, BarChart3 } from 'lucide-react';

const docLinks = [
  { title: 'Litepaper', desc: 'Overview of Verdana Protocol, tokenomics, and roadmap.', icon: FileText, href: '/docs/litepaper' },
  { title: 'Technical Overview', desc: 'Architecture, Solana programs, and integration guide.', icon: BookOpen, href: '/docs/technical' },
  { title: 'FAQ', desc: 'Frequently asked questions for suppliers, buyers, and developers.', icon: HelpCircle, href: '/docs/faq' },
  { title: 'ESG Methodology', desc: 'How we measure and report environmental impact and ESG metrics.', icon: BarChart3, href: '/docs/esg' },
];

export default function DocsPage() {
  return (
    <main>
      <div className="container-narrow py-12 md:py-16">
        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-display text-2xl md:text-3xl font-semibold text-[var(--text)] mb-2"
        >
          Documentation
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="text-[var(--text-muted)] text-base mb-12"
        >
          Litepaper, technical docs, FAQ, and ESG methodology.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {docLinks.map((doc, i) => (
            <Link key={doc.title} href={doc.href}>
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 + i * 0.05 }}
                className="card card-hover p-5 block group"
              >
                <div className="w-10 h-10 rounded-lg bg-[var(--accent-muted)] flex items-center justify-center mb-3">
                  <doc.icon className="h-5 w-5 text-[var(--accent)]" />
                </div>
                <h2 className="font-display font-semibold text-[var(--text)] mb-1 group-hover:text-[var(--accent)] transition">
                  {doc.title}
                </h2>
                <p className="text-sm text-[var(--text-muted)]">{doc.desc}</p>
              </motion.div>
            </Link>
          ))}
        </div>

        <p className="mt-8 text-sm text-[var(--text-dim)]">
          For PDF access or technical inquiries,{' '}
          <Link href="/contact" className="text-[var(--accent)] hover:underline">contact us</Link>.
        </p>
      </div>
    </main>
  );
}
