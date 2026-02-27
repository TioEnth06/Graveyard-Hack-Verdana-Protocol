'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { BadgeCheck, MapPin, FileCheck, Package, Link2 } from 'lucide-react';

const supplierData: Record<string, { name: string; region: string; country: string; certs: string[]; assets: string[]; overview: string; traceability: string }> = {
  '1': {
    name: 'Green Biomass Co.',
    region: 'EU',
    country: 'Netherlands',
    certs: ['ENplus', 'SBP', 'ISO 9001'],
    assets: ['Wood pellets', 'Biomass (chips)'],
    overview: 'Green Biomass Co. supplies certified wood pellets and biomass for industrial and residential use across Europe. All feedstock is traceable to sustainable forestry and certified supply chains.',
    traceability: 'Batch-level tracking from forest to pellet plant. On-chain proof of origin and volume available for each delivery.',
  },
  '2': {
    name: 'Pacific Carbon Solutions',
    region: 'APAC',
    country: 'Singapore',
    certs: ['VCS', 'Gold Standard'],
    assets: ['Carbon credits'],
    overview: 'Pacific Carbon Solutions sources and retires high-integrity carbon credits from nature-based and renewable energy projects in the Asia-Pacific region.',
    traceability: 'Project IDs and retirement certificates linked on-chain. Full registry reconciliation supported.',
  },
  '3': {
    name: 'Nordic Pellets Ltd',
    region: 'Nordic',
    country: 'Sweden',
    certs: ['ENplus', 'FSC'],
    assets: ['Wood pellets'],
    overview: 'Nordic Pellets Ltd produces ENplus and FSC-certified wood pellets from Nordic forests. Supply chain is fully documented from stump to port.',
    traceability: 'Origin and chain of custody documented. On-chain retirement and volume verification available.',
  },
  '4': {
    name: 'EcoPlastic Partners',
    region: 'Americas',
    country: 'USA',
    certs: ['Ocean Bound Plastic'],
    assets: ['Plastic credits'],
    overview: 'EcoPlastic Partners collects and processes ocean-bound plastic and issues verified plastic credits for corporate offset and circular economy reporting.',
    traceability: 'Collection events and conversion volumes recorded. Credit issuance and retirement on-chain.',
  },
  '5': {
    name: 'SunREC Energy',
    region: 'APAC',
    country: 'Australia',
    certs: ['I-REC', 'TIGR'],
    assets: ['RECs'],
    overview: 'SunREC Energy issues and trades Renewable Energy Certificates (RECs) from solar and wind projects across the APAC region.',
    traceability: 'REC serial numbers and retirement status on-chain. Registry integration for double-counting prevention.',
  },
  '6': {
    name: 'Forest Carbon Group',
    region: 'EU',
    country: 'Germany',
    certs: ['VCS', 'CCB'],
    assets: ['Carbon credits'],
    overview: 'Forest Carbon Group develops and manages forestry carbon projects with VCS and CCB certification. Credits are retired on behalf of buyers with full traceability.',
    traceability: 'Project documentation and retirement records linked. ESG and impact reports available via API.',
  },
};

export default function SupplierDetailPage() {
  const params = useParams();
  const id = typeof params?.id === 'string' ? params.id : '';
  const supplier = id ? supplierData[id] : null;

  if (!supplier) {
    return (
      <main className="min-h-[80vh] flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="font-display text-xl font-semibold text-[var(--text)] mb-2">Supplier not found</h1>
          <Link href="/suppliers" className="text-sm text-[var(--accent)] hover:underline">← Back to Suppliers</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-[80vh]">
      <div className="container-narrow py-16 md:py-24">
        <div className="flex items-center gap-2 mb-6">
          <BadgeCheck className="h-5 w-5 text-[var(--accent)]" aria-hidden />
          <span className="text-xs font-medium text-[var(--accent)]">Verified supplier</span>
        </div>

        <h1 className="font-display text-2xl md:text-3xl font-semibold text-[var(--text)] mb-6">
          {supplier.name}
        </h1>

        <section className="mb-8">
          <h2 className="font-display text-lg font-semibold text-[var(--text)] mb-3 flex items-center gap-2">
            <Package className="h-5 w-5 text-[var(--accent)]" />
            Company overview
          </h2>
          <p className="text-[var(--text-muted)] text-sm leading-relaxed">{supplier.overview}</p>
        </section>

        <section className="mb-8">
          <h2 className="font-display text-lg font-semibold text-[var(--text)] mb-3 flex items-center gap-2">
            <MapPin className="h-5 w-5 text-[var(--accent)]" />
            Location
          </h2>
          <p className="text-sm text-[var(--text-muted)]">{supplier.region} · {supplier.country}</p>
        </section>

        <section className="mb-8">
          <h2 className="font-display text-lg font-semibold text-[var(--text)] mb-3 flex items-center gap-2">
            <FileCheck className="h-5 w-5 text-[var(--accent)]" />
            Certifications
          </h2>
          <ul className="flex flex-wrap gap-2">
            {supplier.certs.map((c) => (
              <li key={c} className="px-3 py-1.5 rounded-lg bg-[var(--accent-muted)] text-sm font-medium text-[var(--accent)]">
                {c}
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="font-display text-lg font-semibold text-[var(--text)] mb-3">Assets supplied</h2>
          <ul className="text-sm text-[var(--text-muted)] space-y-1">
            {supplier.assets.map((a) => (
              <li key={a}>• {a}</li>
            ))}
          </ul>
        </section>

        <section className="mb-10 p-5 rounded-xl border border-[var(--border)] bg-[var(--bg-card)]">
          <h2 className="font-display text-lg font-semibold text-[var(--text)] mb-3 flex items-center gap-2">
            <Link2 className="h-5 w-5 text-[var(--accent)]" />
            Traceability
          </h2>
          <p className="text-sm text-[var(--text-muted)] leading-relaxed">{supplier.traceability}</p>
        </section>

        <div className="flex flex-wrap gap-3">
          <Link href="/app" className="btn-primary">
            View on Marketplace
          </Link>
          <Link href="/suppliers" className="text-sm text-[var(--accent)] hover:underline">
            ← All suppliers
          </Link>
        </div>
      </div>
    </main>
  );
}
