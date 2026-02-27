'use client';

import { HeroSection } from '@/components/HeroSection';
import { LogoCarouselSection } from '@/components/LogoCarouselSection';
import { WhatIsVerdanaSection } from '@/components/WhatIsVerdanaSection';
import { HomeHowItWorksSection } from '@/components/HomeHowItWorksSection';
import { FeaturedAssetsSection } from '@/components/FeaturedAssetsSection';
import { SupplierHighlightSection } from '@/components/SupplierHighlightSection';
import { MetricsSection } from '@/components/MetricsSection';
import { CtaSection } from '@/components/CtaSection';

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <LogoCarouselSection />
      <WhatIsVerdanaSection />
      <HomeHowItWorksSection />
      <FeaturedAssetsSection />
      <SupplierHighlightSection />
      <MetricsSection />
      <CtaSection />
    </main>
  );
}
