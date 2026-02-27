'use client';

import { useWallet } from '@solana/wallet-adapter-react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { ConnectScreen } from '@/components/ConnectScreen';

export default function AppEntryPage() {
  const { connected } = useWallet();
  const router = useRouter();

  useEffect(() => {
    if (connected) {
      router.replace('/app/dashboard');
    }
  }, [connected, router]);

  if (connected) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <p className="text-sm text-[var(--text-muted)]">Redirecting to dashboard…</p>
      </div>
    );
  }

  return <ConnectScreen />;
}
