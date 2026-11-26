/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { FaqSection } from './components/FaqSection';
import { HeroSection } from './components/HeroSection';
import { HomeVisitSection } from './components/HomeVisitSection';
import { MobileActionBar } from './components/MobileActionBar';
import { OurWorkSection } from './components/OurWorkSection';
import { RequestSection } from './components/RequestSection';
import { ServicesSection } from './components/ServicesSection';
import { SiteFooter } from './components/SiteFooter';
import { SiteHeader } from './components/SiteHeader';

export type VisitOption = 'No' | 'Yes, come to me';

export default function App() {
  const [visitOption, setVisitOption] = useState<VisitOption>('No');
  const [homeVisitRequestSignal, setHomeVisitRequestSignal] = useState(0);

  function handleRequestHomeVisit() {
    setVisitOption('Yes, come to me');
    setHomeVisitRequestSignal((prev) => prev + 1);

    if (typeof window !== 'undefined') {
      window.requestAnimationFrame(() => {
        const formSection = document.getElementById('request-form');
        if (formSection) {
          const prefersReduced =
            window.matchMedia &&
            window.matchMedia('(prefers-reduced-motion: reduce)').matches;
          formSection.scrollIntoView({
            behavior: prefersReduced ? 'auto' : 'smooth',
            block: 'start',
          });
        }
      });
    }
  }

  return (
    <div
      id="top"
      className="flex min-h-screen flex-col bg-paper text-text"
    >
      <SiteHeader />

      <main
        id="main-content"
        className="flex-1 bg-paper text-text"
        aria-label="Page content"
      >
        <HeroSection />
        <OurWorkSection />
        <ServicesSection />
        <HomeVisitSection onRequestHomeVisit={handleRequestHomeVisit} />
        <FaqSection />
        <RequestSection
          visitOption={visitOption}
          onVisitOptionChange={setVisitOption}
          homeVisitRequestSignal={homeVisitRequestSignal}
        />
      </main>

      <SiteFooter />
      <MobileActionBar />
    </div>
  );
}
