'use client';

import { useState, useEffect } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';

export function WalletButton() {
  const [mounted, setMounted] = useState(false);
  const { connected } = useWallet();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div
        className="rounded-2xl font-semibold text-sm h-10 px-4 flex items-center justify-center min-w-[140px] bg-[var(--bg-elevated)] border border-[var(--border)] text-[var(--text-muted)]"
        aria-hidden
      >
        Connect wallet
      </div>
    );
  }

  return (
    <div className={connected ? 'verdana-wallet-wrap' : ''}>
      <WalletMultiButton
        className="!rounded-2xl !font-semibold !text-sm !h-10 !px-4 !min-h-[2.5rem] !gap-2"
      />
    </div>
  );
}
