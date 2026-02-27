'use client';

import { useWallet } from '@solana/wallet-adapter-react';
import { useState } from 'react';
import Link from 'next/link';
import { ConnectScreen } from '@/components/ConnectScreen';
import {
  ArrowLeft,
  ShoppingCart,
  Building2,
  Package,
  FileText,
  Shield,
  CreditCard,
  Vote,
  PenLine,
  Upload,
  Check,
} from 'lucide-react';

const inputClass =
  'input-base w-full rounded-xl border border-[var(--border)] bg-[var(--bg-elevated)] text-[var(--text)] focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)]/30';
const labelClass = 'block text-sm font-medium text-[var(--text)] mb-1.5';
const sectionClass = 'rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-6 md:p-8 mb-8';
const sectionTitleClass = 'font-display text-lg font-semibold text-[var(--text)] mb-1 flex items-center gap-2';
const sectionSubtitleClass = 'text-sm text-[var(--text-muted)] mb-6';
const checkboxClass =
  'h-4 w-4 rounded border-[var(--border)] bg-[var(--bg-elevated)] text-[var(--accent)] focus:ring-[var(--accent)]/30';
const checkboxLabelClass = 'text-sm text-[var(--text)] cursor-pointer select-none';

type ProductCategory = 'biomass' | 'env_credit' | 'rec' | 'recycled_plastic' | 'other';
const PRODUCT_CATEGORIES: { id: ProductCategory; label: string }[] = [
  { id: 'biomass', label: 'Biomass (Wood Pellet / Wood Chip / RDF / etc)' },
  { id: 'env_credit', label: 'Environmental Credit (Carbon / Plastic Credit)' },
  { id: 'rec', label: 'REC (Renewable Energy Certificate)' },
  { id: 'recycled_plastic', label: 'Recycled Plastic (rPET, rHDPE, flakes, pellets)' },
  { id: 'other', label: 'Other Renewable Commodity' },
];

export default function PurchaseOrderPage() {
  const { connected } = useWallet();
  const [categories, setCategories] = useState<Set<ProductCategory>>(new Set());
  const [specCategory, setSpecCategory] = useState<ProductCategory | ''>('');
  const [productSpecificRequest, setProductSpecificRequest] = useState('');
  const [detailRequirementRequest, setDetailRequirementRequest] = useState('');
  const [settlementCurrency, setSettlementCurrency] = useState<string[]>([]);
  const [contractDuration, setContractDuration] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<string[]>([]);
  const [escrowOption, setEscrowOption] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [poId, setPoId] = useState<string | null>(null);

  const toggleCategory = (id: ProductCategory) => {
    setCategories((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleSettlementCurrency = (v: string) => {
    setSettlementCurrency((prev) =>
      prev.includes(v) ? prev.filter((x) => x !== v) : [...prev, v]
    );
  };

  const togglePaymentMethod = (v: string) => {
    setPaymentMethod((prev) =>
      prev.includes(v) ? prev.filter((x) => x !== v) : [...prev, v]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPoId(`PO-${Date.now().toString(36).toUpperCase()}`);
    setSubmitted(true);
  };

  if (!connected) return <ConnectScreen />;

  if (submitted && poId) {
    return (
      <div className="container-wide py-8 md:py-12">
        <div className="max-w-xl mx-auto rounded-2xl border border-[var(--accent)]/30 bg-[var(--accent-muted)]/20 p-8 text-center">
          <div className="w-14 h-14 rounded-2xl bg-[var(--accent-muted)] flex items-center justify-center mx-auto mb-5">
            <Check className="h-7 w-7 text-[var(--accent)]" />
          </div>
          <h1 className="font-display text-xl font-semibold text-[var(--text)] mb-2">
            Purchase Order Submitted
          </h1>
          <p className="text-sm text-[var(--text-muted)] mb-4">
            Your enterprise purchase order has been received. A supplier counter-offer interface and escrow draft will be generated when the smart layer is enabled.
          </p>
          <p className="font-mono text-sm text-[var(--accent)] mb-6">PO ID: {poId}</p>
          <Link
            href="/app/marketplace"
            className="btn-primary rounded-xl inline-flex items-center gap-2"
          >
            Back to Marketplace
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container-wide py-8 md:py-12 flex justify-center">
      <div className="w-full max-w-3xl mx-auto px-2 sm:px-0">
        <Link
          href="/app/marketplace"
          className="inline-flex items-center gap-2 text-sm text-[var(--text-muted)] hover:text-[var(--accent)] mb-8 transition"
        >
          <ArrowLeft className="h-4 w-4" /> Marketplace
        </Link>

        <div className="flex items-center gap-3 mb-8">
          <div className="w-12 h-12 rounded-2xl bg-[var(--accent-muted)] flex items-center justify-center shrink-0">
            <ShoppingCart className="h-6 w-6 text-[var(--accent)]" />
          </div>
          <div>
            <h1 className="font-display text-2xl font-semibold text-[var(--text)]">
              Large-Scale Purchase Order (Enterprise)
            </h1>
            <p className="text-sm text-[var(--text-muted)]">
              Submit a formal PO for biomass, environmental credits, REC, or recycled commodities.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
        {/* 1. Buyer Information */}
        <section className={sectionClass} id="buyer">
          <h2 className={sectionTitleClass}>
            <Building2 className="h-5 w-5 text-[var(--accent)]" />
            1. Buyer Information
          </h2>
          <p className={sectionSubtitleClass}>Company and authorized representative details.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="md:col-span-2">
              <label className={labelClass}>Company Legal Name</label>
              <input type="text" name="companyName" className={inputClass} required placeholder="e.g. PT Green Energy Indonesia" />
            </div>
            <div>
              <label className={labelClass}>Business Registration Number</label>
              <input type="text" name="registrationNumber" className={inputClass} placeholder="e.g. AHU-123456" />
            </div>
            <div>
              <label className={labelClass}>Tax ID (NPWP / VAT ID)</label>
              <input type="text" name="taxId" className={inputClass} placeholder="e.g. 12.345.678.9-012.000" />
            </div>
            <div>
              <label className={labelClass}>Country of Incorporation</label>
              <input type="text" name="country" className={inputClass} required placeholder="e.g. Indonesia" />
            </div>
            <div>
              <label className={labelClass}>Website (Optional)</label>
              <input type="url" name="website" className={inputClass} placeholder="https://" />
            </div>
            <div className="md:col-span-2">
              <label className={labelClass}>Registered Address</label>
              <textarea name="address" rows={2} className={inputClass + ' min-h-[80px] resize-y'} required placeholder="Full registered address" />
            </div>
            <div>
              <label className={labelClass}>Authorized Representative Name</label>
              <input type="text" name="repName" className={inputClass} required placeholder="Full name" />
            </div>
            <div>
              <label className={labelClass}>Position / Title</label>
              <input type="text" name="repTitle" className={inputClass} placeholder="e.g. Procurement Director" />
            </div>
            <div>
              <label className={labelClass}>Corporate Email</label>
              <input type="email" name="email" className={inputClass} required placeholder="procurement@company.com" />
            </div>
            <div>
              <label className={labelClass}>Phone / WhatsApp</label>
              <input type="tel" name="phone" className={inputClass} placeholder="+62 812 3456 7890" />
            </div>
            <div className="md:col-span-2">
              <label className={labelClass}>Wallet Address (Optional for On-Chain Settlement)</label>
              <input type="text" name="walletAddress" className={inputClass} placeholder="Solana / EVM address" />
            </div>
            <div className="md:col-span-2">
              <span className={labelClass}>Preferred Settlement Currency</span>
              <div className="flex flex-wrap gap-4 mt-2">
                {['USD', 'IDR', 'USDT', 'USDC'].map((c) => (
                  <label key={c} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      className={checkboxClass}
                      checked={settlementCurrency.includes(c)}
                      onChange={() => toggleSettlementCurrency(c)}
                    />
                    <span className={checkboxLabelClass}>{c}</span>
                  </label>
                ))}
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className={checkboxClass} />
                  <span className={checkboxLabelClass}>Other:</span>
                  <input type="text" className={inputClass + ' flex-1 max-w-[120px]'} placeholder="___" />
                </label>
              </div>
            </div>
          </div>
        </section>

        {/* 2. Product Category Selection */}
        <section className={sectionClass} id="category">
          <h2 className={sectionTitleClass}>
            <Package className="h-5 w-5 text-[var(--accent)]" />
            2. Product Category Selection
          </h2>
          <p className={sectionSubtitleClass}>Select one or more categories for this purchase order.</p>
          <div className="space-y-3">
            {PRODUCT_CATEGORIES.map(({ id, label }) => (
              <label key={id} className="flex items-start gap-3 cursor-pointer p-3 rounded-xl border border-[var(--border)] hover:border-[var(--accent)]/40 transition">
                <input
                  type="checkbox"
                  className={checkboxClass + ' mt-0.5'}
                  checked={categories.has(id)}
                  onChange={() => toggleCategory(id)}
                />
                <span className={checkboxLabelClass}>{label}</span>
              </label>
            ))}
          </div>
          {categories.size > 0 && (
            <div className="mt-5 space-y-5">
              <div>
                <label className={labelClass}>Specify product details for (choose one for the form below)</label>
                <select
                  className={inputClass}
                  value={specCategory}
                  onChange={(e) => setSpecCategory(e.target.value as ProductCategory | '')}
                >
                  <option value="">— Select category —</option>
                  {Array.from(categories).map((id) => (
                    <option key={id} value={id}>
                      {PRODUCT_CATEGORIES.find((c) => c.id === id)?.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className={labelClass}>Product specific request</label>
                <input
                  type="text"
                  value={productSpecificRequest}
                  onChange={(e) => setProductSpecificRequest(e.target.value)}
                  className={inputClass}
                  placeholder="e.g. Wood pellets EN Plus A1, 5000 MT, Q1 2025"
                />
              </div>
              <div>
                <label className={labelClass}>Detail requirement request</label>
                <textarea
                  value={detailRequirementRequest}
                  onChange={(e) => setDetailRequirementRequest(e.target.value)}
                  rows={4}
                  className={inputClass + ' min-h-[120px] resize-y'}
                  placeholder="Describe your detailed requirements: quality specs, delivery terms, certifications, sampling, testing, etc."
                />
              </div>
            </div>
          )}
        </section>

        {/* 3. Product Specification (Dynamic) */}
        {specCategory && (
          <section className={sectionClass} id="spec">
            <h2 className={sectionTitleClass}>
              <FileText className="h-5 w-5 text-[var(--accent)]" />
              3. Product Specification
            </h2>
            <p className={sectionSubtitleClass}>
              {specCategory === 'biomass' && 'Biomass details'}
              {specCategory === 'env_credit' && 'Environmental credit details'}
              {specCategory === 'rec' && 'REC details'}
              {specCategory === 'recycled_plastic' && 'Recycled plastic details'}
              {specCategory === 'other' && 'Other commodity details'}
            </p>

            {specCategory === 'biomass' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="md:col-span-2">
                  <span className={labelClass}>Biomass Type</span>
                  <div className="flex flex-wrap gap-4 mt-2">
                    {['Wood Pellet', 'Wood Chip', 'Palm Kernel Shell', 'Other'].map((t) => (
                      <label key={t} className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" className={checkboxClass} name="biomassType" value={t} />
                        <span className={checkboxLabelClass}>{t}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div><label className={labelClass}>Quantity Required (MT)</label><input type="number" name="quantityMt" className={inputClass} min={0} step={0.01} placeholder="0" /></div>
                <div><label className={labelClass}>Calorific Value (kcal/kg)</label><input type="number" name="calorific" className={inputClass} placeholder="e.g. 4200" /></div>
                <div><label className={labelClass}>Moisture Content (%)</label><input type="number" name="moisture" className={inputClass} placeholder="e.g. 10" /></div>
                <div><label className={labelClass}>Ash Content (%)</label><input type="number" name="ash" className={inputClass} placeholder="e.g. 3" /></div>
                <div className="md:col-span-2">
                  <span className={labelClass}>Packaging</span>
                  <div className="flex flex-wrap gap-4 mt-2">
                    {['Jumbo Bag', 'Bulk Vessel', 'Container 20ft', 'Container 40ft'].map((p) => (
                      <label key={p} className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" className={checkboxClass} name="packaging" value={p} />
                        <span className={checkboxLabelClass}>{p}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div className="md:col-span-2">
                  <span className={labelClass}>Preferred Incoterm</span>
                  <div className="flex flex-wrap gap-4 mt-2">
                    {['FOB', 'CIF', 'CFR', 'EXW'].map((i) => (
                      <label key={i} className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" className={checkboxClass} name="incoterm" value={i} />
                        <span className={checkboxLabelClass}>{i}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div><label className={labelClass}>Destination Port</label><input type="text" name="destinationPort" className={inputClass} placeholder="e.g. Tanjung Priok" /></div>
                <div><label className={labelClass}>Target Shipment Date</label><input type="date" name="shipmentDate" className={inputClass} /></div>
              </div>
            )}

            {specCategory === 'env_credit' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="md:col-span-2">
                  <span className={labelClass}>Credit Type</span>
                  <div className="flex flex-wrap gap-4 mt-2">
                    {['Carbon Credit', 'Plastic Credit', 'Blue Carbon', 'Other'].map((t) => (
                      <label key={t} className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" className={checkboxClass} name="creditType" value={t} />
                        <span className={checkboxLabelClass}>{t}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div className="md:col-span-2">
                  <span className={labelClass}>Standard / Registry</span>
                  <div className="flex flex-wrap gap-4 mt-2">
                    {['Verra', 'Gold Standard', 'National Registry', 'Other'].map((r) => (
                      <label key={r} className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" className={checkboxClass} name="registry" value={r} />
                        <span className={checkboxLabelClass}>{r}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div><label className={labelClass}>Vintage Year</label><input type="number" name="vintageYear" className={inputClass} placeholder="e.g. 2024" /></div>
                <div><label className={labelClass}>Total Volume (tons / credits)</label><input type="text" name="volumeCredits" className={inputClass} placeholder="e.g. 1000" /></div>
                <div className="md:col-span-2">
                  <span className={labelClass}>Retirement Required?</span>
                  <div className="flex gap-6 mt-2">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" name="retirement" className={checkboxClass} value="yes" />
                      <span className={checkboxLabelClass}>Yes (Immediate Retirement)</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" name="retirement" className={checkboxClass} value="no" />
                      <span className={checkboxLabelClass}>No (Transfer to Wallet)</span>
                    </label>
                  </div>
                </div>
                <div className="md:col-span-2">
                  <label className={labelClass}>Wallet Address for Transfer</label>
                  <input type="text" name="creditWallet" className={inputClass} placeholder="Wallet for credit transfer" />
                </div>
              </div>
            )}

            {specCategory === 'rec' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="md:col-span-2">
                  <span className={labelClass}>Energy Source</span>
                  <div className="flex flex-wrap gap-4 mt-2">
                    {['Solar', 'Hydro', 'Wind', 'Biomass'].map((e) => (
                      <label key={e} className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" className={checkboxClass} name="energySource" value={e} />
                        <span className={checkboxLabelClass}>{e}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div><label className={labelClass}>Region / Country</label><input type="text" name="recRegion" className={inputClass} placeholder="e.g. Indonesia" /></div>
                <div><label className={labelClass}>Vintage Year</label><input type="number" name="recVintage" className={inputClass} placeholder="2024" /></div>
                <div><label className={labelClass}>Volume (MWh)</label><input type="number" name="recVolume" className={inputClass} placeholder="e.g. 5000" /></div>
                <div><label className={labelClass}>Registry Standard</label><input type="text" name="recRegistry" className={inputClass} placeholder="e.g. I-REC" /></div>
                <div className="md:col-span-2">
                  <span className={labelClass}>Delivery Method</span>
                  <div className="flex gap-6 mt-2">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" className={checkboxClass} name="recDelivery" value="cert" />
                      <span className={checkboxLabelClass}>Certificate Transfer</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" className={checkboxClass} name="recDelivery" value="retire" />
                      <span className={checkboxLabelClass}>Retirement on Behalf</span>
                    </label>
                  </div>
                </div>
              </div>
            )}

            {specCategory === 'recycled_plastic' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="md:col-span-2">
                  <span className={labelClass}>Material Type</span>
                  <div className="flex flex-wrap gap-4 mt-2">
                    {['rPET', 'rHDPE', 'rPP', 'Flakes', 'Pellets'].map((m) => (
                      <label key={m} className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" className={checkboxClass} name="materialType" value={m} />
                        <span className={checkboxLabelClass}>{m}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <span className={labelClass}>Grade</span>
                  <div className="flex flex-wrap gap-4 mt-2">
                    {['Food Grade', 'Non-Food Grade', 'Industrial'].map((g) => (
                      <label key={g} className="flex items-center gap-2 cursor-pointer">
                        <input type="radio" name="grade" className={checkboxClass} value={g} />
                        <span className={checkboxLabelClass}>{g}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div><label className={labelClass}>Quantity (MT)</label><input type="number" name="plasticQuantity" className={inputClass} min={0} step={0.01} /></div>
                <div><label className={labelClass}>Color</label><input type="text" name="color" className={inputClass} placeholder="e.g. Natural, Blue" /></div>
                <div><label className={labelClass}>MFI (If applicable)</label><input type="text" name="mfi" className={inputClass} /></div>
                <div><label className={labelClass}>Contamination Tolerance (%)</label><input type="number" name="contamination" className={inputClass} placeholder="e.g. 2" /></div>
                <div className="md:col-span-2">
                  <span className={labelClass}>Packaging Type</span>
                  <div className="flex flex-wrap gap-4 mt-2">
                    {['Jumbo Bag', 'Bulk', 'Containerized'].map((p) => (
                      <label key={p} className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" className={checkboxClass} name="plasticPackaging" value={p} />
                        <span className={checkboxLabelClass}>{p}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {specCategory === 'other' && (
              <div>
                <label className={labelClass}>Other Renewable Commodity – Specification</label>
                <textarea name="otherSpec" rows={4} className={inputClass + ' min-h-[120px] resize-y'} placeholder="Describe product type, quantity, quality requirements, packaging, and delivery terms." />
              </div>
            )}
          </section>
        )}

        {/* 4. Order Details */}
        <section className={sectionClass} id="order">
          <h2 className={sectionTitleClass}>
            <FileText className="h-5 w-5 text-[var(--accent)]" />
            4. Order Details
          </h2>
          <p className={sectionSubtitleClass}>Budget, pricing, and contract terms.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div><label className={labelClass}>Estimated Budget (Optional)</label><input type="text" name="budget" className={inputClass} placeholder="e.g. USD 500,000" /></div>
            <div><label className={labelClass}>Target Unit Price (If Applicable)</label><input type="text" name="unitPrice" className={inputClass} placeholder="e.g. USD/MT" /></div>
            <div className="md:col-span-2">
              <label className={labelClass}>Contract Duration</label>
              <div className="flex flex-wrap gap-4 mt-2">
                {['Spot', '3 Months', '6 Months', '12 Months', 'Custom'].map((d) => (
                  <label key={d} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="duration"
                      className={checkboxClass}
                      checked={contractDuration === d}
                      onChange={() => setContractDuration(d)}
                    />
                    <span className={checkboxLabelClass}>{d}</span>
                  </label>
                ))}
              </div>
            </div>
            <div className="md:col-span-2">
              <span className={labelClass}>Is this a framework agreement?</span>
              <div className="flex gap-6 mt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="framework" className={checkboxClass} value="yes" />
                  <span className={checkboxLabelClass}>Yes (Recurring Supply)</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="framework" className={checkboxClass} value="no" />
                  <span className={checkboxLabelClass}>No (One-time Purchase)</span>
                </label>
              </div>
            </div>
          </div>
        </section>

        {/* 5. Compliance & Verification */}
        <section className={sectionClass} id="compliance">
          <h2 className={sectionTitleClass}>
            <Shield className="h-5 w-5 text-[var(--accent)]" />
            5. Compliance & Verification
          </h2>
          <p className={sectionSubtitleClass}>Confirm and upload supporting documents.</p>
          <div className="space-y-4 mb-6">
            <label className="flex items-center gap-3 cursor-pointer p-3 rounded-xl border border-[var(--border)] hover:border-[var(--accent)]/40">
              <input type="checkbox" name="esgPolicy" className={checkboxClass} required />
              <span className={checkboxLabelClass}>I confirm this purchase complies with our internal ESG policy.</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer p-3 rounded-xl border border-[var(--border)] hover:border-[var(--accent)]/40">
              <input type="checkbox" name="kycUploaded" className={checkboxClass} />
              <span className={checkboxLabelClass}>KYC documents uploaded.</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer p-3 rounded-xl border border-[var(--border)] hover:border-[var(--accent)]/40">
              <input type="checkbox" name="companyProfile" className={checkboxClass} />
              <span className={checkboxLabelClass}>Company profile uploaded.</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer p-3 rounded-xl border border-[var(--border)] hover:border-[var(--accent)]/40">
              <input type="checkbox" name="tradeRef" className={checkboxClass} />
              <span className={checkboxLabelClass}>Trade reference provided.</span>
            </label>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {['Business License', 'Certificate of Incorporation', 'Bank Reference Letter', 'ESG Policy (optional)'].map((doc) => (
              <div key={doc} className="rounded-xl border border-dashed border-[var(--border)] bg-[var(--bg-elevated)]/50 p-4 flex items-center gap-3">
                <Upload className="h-5 w-5 text-[var(--text-muted)] shrink-0" />
                <div className="min-w-0">
                  <p className="text-sm font-medium text-[var(--text)]">{doc}</p>
                  <p className="text-xs text-[var(--text-muted)]">Click or drag file</p>
                </div>
                <input type="file" className="hidden" id={`file-${doc.replace(/\s/g, '-')}`} />
                <label htmlFor={`file-${doc.replace(/\s/g, '-')}`} className="text-xs font-medium text-[var(--accent)] cursor-pointer hover:underline shrink-0">Upload</label>
              </div>
            ))}
          </div>
        </section>

        {/* 6. Settlement Preference */}
        <section className={sectionClass} id="settlement">
          <h2 className={sectionTitleClass}>
            <CreditCard className="h-5 w-5 text-[var(--accent)]" />
            6. Settlement Preference
          </h2>
          <p className={sectionSubtitleClass}>Payment method and escrow options.</p>
          <div className="space-y-6">
            <div>
              <span className={labelClass}>Payment Method</span>
              <div className="flex flex-wrap gap-6 mt-2">
                {['Bank Transfer', 'LC (Letter of Credit)', 'Escrow (Verdana Smart Contract)', 'Stablecoin (USDT/USDC)'].map((pm) => (
                  <label key={pm} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      className={checkboxClass}
                      checked={paymentMethod.includes(pm)}
                      onChange={() => togglePaymentMethod(pm)}
                    />
                    <span className={checkboxLabelClass}>{pm}</span>
                  </label>
                ))}
              </div>
            </div>
            <div>
              <span className={labelClass}>Escrow Option</span>
              <div className="flex flex-wrap gap-4 mt-2">
                {[
                  { value: '30-70', label: '30% Advance – 70% BL' },
                  { value: '100', label: '100% Escrow' },
                  { value: 'milestone', label: 'Milestone-based' },
                ].map((o) => (
                  <label key={o.value} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="escrow"
                      className={checkboxClass}
                      value={o.value}
                      checked={escrowOption === o.value}
                      onChange={() => setEscrowOption(o.value)}
                    />
                    <span className={checkboxLabelClass}>{o.label}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 7. DAO / Governance Layer */}
        <section className={sectionClass} id="dao">
          <h2 className={sectionTitleClass}>
            <Vote className="h-5 w-5 text-[var(--accent)]" />
            7. DAO / Governance Layer (If Enabled)
          </h2>
          <p className={sectionSubtitleClass}>Optional verification via Verdana DAO.</p>
          <div className="space-y-3">
            <label className="flex items-center gap-3 cursor-pointer p-3 rounded-xl border border-[var(--border)] hover:border-[var(--accent)]/40">
              <input type="checkbox" name="daoSupplier" className={checkboxClass} />
              <span className={checkboxLabelClass}>Require supplier verification via DAO.</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer p-3 rounded-xl border border-[var(--border)] hover:border-[var(--accent)]/40">
              <input type="checkbox" name="carbonVerify" className={checkboxClass} />
              <span className={checkboxLabelClass}>Require carbon intensity verification.</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer p-3 rounded-xl border border-[var(--border)] hover:border-[var(--accent)]/40">
              <input type="checkbox" name="thirdPartyAudit" className={checkboxClass} />
              <span className={checkboxLabelClass}>Require third-party audit confirmation.</span>
            </label>
          </div>
        </section>

        {/* 8. Final Declaration */}
        <section className={sectionClass} id="declaration">
          <h2 className={sectionTitleClass}>
            <PenLine className="h-5 w-5 text-[var(--accent)]" />
            8. Final Declaration
          </h2>
          <p className={sectionSubtitleClass + ' mb-4'}>
            I hereby declare that the information provided is accurate and legally binding under applicable trade regulations.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div><label className={labelClass}>Authorized Signature (Name)</label><input type="text" name="signatureName" className={inputClass} required placeholder="Full name" /></div>
            <div><label className={labelClass}>Date</label><input type="date" name="signatureDate" className={inputClass} required /></div>
          </div>
        </section>

        <div className="flex flex-wrap items-center gap-4 pt-4">
          <button type="submit" className="btn-primary rounded-xl px-8 py-3 text-sm font-semibold inline-flex items-center gap-2">
            <ShoppingCart className="h-4 w-4" />
            Submit Purchase Order
          </button>
          <Link
            href="/app/marketplace"
            className="rounded-xl border border-[var(--border)] px-6 py-3 text-sm font-medium text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--bg-elevated)] transition"
          >
            Cancel
          </Link>
        </div>
      </form>
      </div>
    </div>
  );
}
