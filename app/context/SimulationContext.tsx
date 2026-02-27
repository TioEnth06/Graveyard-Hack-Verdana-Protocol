'use client';

import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import {
  getDefaultSimulationState,
  loadSimulationState,
  saveSimulationState,
  type MarketplaceListing,
  type OwnedCredit,
  type SimulationState,
} from '@/lib/simulation-types';

type SimulationContextValue = {
  listings: MarketplaceListing[];
  ownedCredits: OwnedCredit[];
  buyCredit: (listing: MarketplaceListing) => void;
  retireCredit: (mint: string) => void;
  resetSimulation: () => void;
};

const SimulationContext = createContext<SimulationContextValue | null>(null);

export function SimulationProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<SimulationState>(() => loadSimulationState());

  const buyCredit = useCallback((listing: MarketplaceListing) => {
    setState((prev) => {
      const listingExists = prev.listings.some((l) => l.nftMint === listing.nftMint);
      if (!listingExists) return prev;
      const newListings = prev.listings.filter((l) => l.nftMint !== listing.nftMint);
      const newOwned: OwnedCredit = {
        mint: listing.nftMint,
        assetType: listing.assetType,
        weight: listing.weight,
        nftId: listing.nftId,
        verificationHash: listing.verificationHash,
      };
      const newState: SimulationState = {
        listings: newListings,
        ownedCredits: [...prev.ownedCredits, newOwned],
      };
      saveSimulationState(newState);
      return newState;
    });
  }, []);

  const retireCredit = useCallback((mint: string) => {
    setState((prev) => {
      const newState: SimulationState = {
        listings: prev.listings,
        ownedCredits: prev.ownedCredits.filter((c) => c.mint !== mint),
      };
      saveSimulationState(newState);
      return newState;
    });
  }, []);

  const resetSimulation = useCallback(() => {
    const defaultState = getDefaultSimulationState();
    saveSimulationState(defaultState);
    setState(defaultState);
  }, []);

  const value = useMemo<SimulationContextValue>(
    () => ({
      listings: state.listings,
      ownedCredits: state.ownedCredits,
      buyCredit,
      retireCredit,
      resetSimulation,
    }),
    [state.listings, state.ownedCredits, buyCredit, retireCredit, resetSimulation]
  );

  return (
    <SimulationContext.Provider value={value}>
      {children}
    </SimulationContext.Provider>
  );
}

export function useSimulation(): SimulationContextValue {
  const ctx = useContext(SimulationContext);
  if (!ctx) throw new Error('useSimulation must be used within SimulationProvider');
  return ctx;
}
