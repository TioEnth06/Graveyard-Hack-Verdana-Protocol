'use client';

import { useSimulation } from '@/context/SimulationContext';

export function SimulationBanner() {
  const { resetSimulation } = useSimulation();

  return (
    <div className="border-b border-[var(--border)] bg-[var(--bg-elevated)] px-4 py-2 flex items-center justify-center gap-4 flex-wrap text-sm">
      <span className="text-[var(--text-muted)]">
        <strong className="text-[var(--text)]">Simulation</strong> mode: data is stored in your browser (localStorage).
      </span>
      <button
        type="button"
        onClick={resetSimulation}
        className="text-[var(--accent)] hover:underline font-medium"
      >
        Reset simulation
      </button>
    </div>
  );
}
