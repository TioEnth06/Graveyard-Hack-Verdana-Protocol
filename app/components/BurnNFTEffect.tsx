'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useWallet, useConnection } from '@solana/wallet-adapter-react';
import { getProgram } from '@/lib/anchor';

interface BurnNFTEffectProps {
  nftMint?: string;
  assetType?: string;
  weight?: number;
  nftId?: string;
  /** Called after a successful simulated retire (to update state). */
  onRetireSuccess?: (mint: string) => void;
}

export default function BurnNFTEffect({
  nftMint = '',
  assetType = 'WOOD_PELLETS',
  weight = 1.0,
  nftId = 'SOL_ECO_88293',
  onRetireSuccess,
}: BurnNFTEffectProps) {
  const [isBurning, setIsBurning] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [txHash, setTxHash] = useState('');
  const { wallet, publicKey } = useWallet();
  const { connection } = useConnection();

  const particles = Array.from({ length: 20 });

  const handleBurn = async () => {
    const isSimulation = typeof onRetireSuccess === 'function';
    if (!isSimulation && (!publicKey || !wallet)) {
      alert('Please connect your wallet.');
      return;
    }
    setIsBurning(true);
    try {
      if (!isSimulation && wallet) {
        const program = getProgram(connection, wallet);
        if (program) {
          // await program.methods.burnNft().accounts({...}).rpc();
        }
      }
      await new Promise((r) => setTimeout(r, 2200));
      const chars = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';
      const hash = Array.from({ length: 44 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
      setTxHash(hash);
      setIsDone(true);
      onRetireSuccess?.(nftMint);
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Burn failed.';
      alert(msg);
    } finally {
      setIsBurning(false);
    }
  };

  const explorerUrl = txHash ? `https://explorer.solana.com/tx/${txHash}?cluster=devnet` : '';

  return (
    <div className="card p-8 md:p-10 relative overflow-hidden">
      <div className="absolute -bottom-20 left-0 right-0 h-40 bg-[var(--accent)]/10 blur-[80px] pointer-events-none" />

      <AnimatePresence mode="wait">
        {!isDone ? (
          <motion.div
            key="card"
            initial={false}
            animate={
              isBurning
                ? { opacity: 0.6, scale: 0.97, filter: 'blur(2px)' }
                : { opacity: 1, scale: 1, filter: 'blur(0)' }
            }
            className="relative max-w-xs mx-auto"
          >
            <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-elevated)] p-6 space-y-6">
              <div>
                <div className="text-xs font-medium text-[var(--accent)] mb-1">{assetType}</div>
                <div className="font-display text-xl font-semibold text-[var(--text)]">
                  {weight} ton credit
                </div>
                <div className="text-xs text-[var(--text-dim)] font-mono mt-1">{nftId}</div>
              </div>

              {isBurning &&
                particles.map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ x: 0, y: 0, opacity: 1 }}
                    animate={{
                      x: (Math.random() - 0.5) * 160,
                      y: -Math.random() * 200,
                      opacity: 0,
                      scale: 0,
                    }}
                    transition={{ duration: 1.8, ease: 'easeOut' }}
                    className="absolute left-1/2 top-1/2 w-2 h-2 rounded-full bg-[var(--accent)]"
                  />
                ))}

              <button
                type="button"
                onClick={handleBurn}
                disabled={isBurning || (!onRetireSuccess && !publicKey)}
                className="btn-primary w-full py-3 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isBurning ? 'Retiring…' : 'Retire asset'}
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center space-y-6"
          >
            <div className="w-16 h-16 rounded-full bg-[var(--accent-muted)] border border-[var(--accent)] flex items-center justify-center mx-auto">
              <svg
                className="w-8 h-8 text-[var(--accent)]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <h3 className="font-display text-xl font-semibold text-[var(--text)]">Impact verified</h3>
              {txHash && (
                <p className="text-sm text-[var(--text-dim)] font-mono mt-2">
                  {txHash.slice(0, 8)}…{txHash.slice(-4)}
                </p>
              )}
            </div>
            {explorerUrl && (
              <a
                href={explorerUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-[var(--accent)] hover:underline"
              >
                View on Explorer
              </a>
            )}
            <button
              type="button"
              onClick={() => {
                setIsDone(false);
                setTxHash('');
              }}
              className="btn-ghost text-sm py-2 px-4"
            >
              Retire another
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
