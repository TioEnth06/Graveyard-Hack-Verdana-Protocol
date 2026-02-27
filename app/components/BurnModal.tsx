'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { X, Download, ExternalLink, Check } from 'lucide-react';
import { registerCertificate, type AssetType } from '@/lib/dapp-data';

export interface BurnModalAsset {
  id: string;
  name: string;
  assetType: string;
  quantity: string;
  tokenId?: string;
  mintAddress?: string;
}

interface BurnModalProps {
  isOpen: boolean;
  onClose: () => void;
  asset: BurnModalAsset | null;
  onConfirmBurn: () => Promise<string | null>;
  certificateId?: string;
}

type Step = 'confirm' | 'burning' | 'success';

export function BurnModal({ isOpen, onClose, asset, onConfirmBurn, certificateId }: BurnModalProps) {
  const [step, setStep] = useState<Step>('confirm');
  const [txHash, setTxHash] = useState('');
  const [certId, setCertId] = useState(certificateId || '');

  const handleConfirm = async () => {
    if (!asset) return;
    setStep('burning');
    try {
      const hash = await onConfirmBurn();
      if (hash) {
        setTxHash(hash);
        const newCertId = certificateId || `cert-${asset.id}-${Date.now()}`;
        setCertId(newCertId);
        registerCertificate({
          id: newCertId,
          assetName: asset.name,
          assetType: asset.assetType as AssetType,
          quantity: asset.quantity,
          retiredAt: new Date().toISOString(),
          txHash: hash,
          mintAddress: asset.mintAddress ?? '',
        });
        setStep('success');
      } else {
        setStep('confirm');
      }
    } catch {
      setStep('confirm');
    }
  };

  const handleClose = () => {
    setStep('confirm');
    setTxHash('');
    setCertId('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/70 backdrop-blur-sm"
          onClick={handleClose}
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative w-full max-w-md card p-6 md:p-8 shadow-xl"
        >
          <button
            type="button"
            onClick={handleClose}
            className="absolute top-4 right-4 p-1.5 rounded-lg text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--bg-elevated)]"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>

          {step === 'confirm' && asset && (
            <>
              <h2 className="font-display text-xl font-semibold text-[var(--text)] mb-2">Retire asset</h2>
              <p className="text-sm text-[var(--text-muted)] mb-4">
                You are about to permanently retire this asset on-chain. This action cannot be undone.
              </p>
              <div className="p-4 rounded-xl bg-[var(--bg-elevated)] mb-6">
                <p className="font-medium text-[var(--text)]">{asset.name}</p>
                <p className="text-xs text-[var(--text-dim)] mt-1">{asset.quantity} · {asset.assetType}</p>
              </div>
              <div className="flex gap-3">
                <button type="button" onClick={handleClose} className="btn-ghost flex-1">
                  Cancel
                </button>
                <button type="button" onClick={handleConfirm} className="btn-primary flex-1">
                  Retire (Burn)
                </button>
              </div>
            </>
          )}

          {step === 'burning' && (
            <div className="py-8 text-center">
              <motion.div
                animate={{ scale: [1, 1.1, 1], opacity: [0.8, 1, 0.8] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-16 h-16 rounded-full bg-[var(--accent-muted)] flex items-center justify-center mx-auto mb-4"
              >
                <span className="text-2xl">🔥</span>
              </motion.div>
              <p className="font-display font-semibold text-[var(--text)]">Burning asset…</p>
              <p className="text-sm text-[var(--text-muted)] mt-1">Confirm in your wallet.</p>
            </div>
          )}

          {step === 'success' && (
            <>
              <div className="w-14 h-14 rounded-full bg-[var(--accent-muted)] border border-[var(--accent)] flex items-center justify-center mx-auto mb-4">
                <Check className="h-7 w-7 text-[var(--accent)]" />
              </div>
              <h2 className="font-display text-xl font-semibold text-[var(--text)] text-center mb-2">Impact verified</h2>
              <p className="text-sm text-[var(--text-muted)] text-center mb-4">
                Your retirement has been recorded on-chain.
              </p>
              {txHash && (
                <a
                  href={`https://explorer.solana.com/tx/${txHash}?cluster=devnet`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 text-sm text-[var(--accent)] hover:underline mb-4"
                >
                  View transaction <ExternalLink className="h-4 w-4" />
                </a>
              )}
              <div className="flex gap-3">
                <Link
                  href={certId ? `/app/certificate/${certId}` : '#'}
                  className="btn-primary flex-1 inline-flex items-center justify-center gap-2"
                >
                  <Download className="h-4 w-4" />
                  Download certificate
                </Link>
                <button type="button" onClick={handleClose} className="btn-ghost flex-1">
                  Done
                </button>
              </div>
            </>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
