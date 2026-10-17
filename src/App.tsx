/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import {
  PageRoute,
  ServiceCardData,
  SolutionCardData,
} from './data/siteContent';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { ServicesSection } from './components/ServicesSection';
import { WhyChooseSection } from './components/WhyChooseSection';
import { AdditionalSolutionsSection } from './components/AdditionalSolutionsSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { Footer } from './components/Footer';
import { InquiryModal } from './components/InquiryModal';
import { DetailPanelModal } from './components/DetailPanelModal';
import { PhotoNotesModal } from './components/PhotoNotesModal';
import { SubpageViews } from './components/SubpageViews';

const VALID_ROUTES: PageRoute[] = [
  'home',
  'services',
  'why-clinicsads',
  'solutions',
  'contact',
  'service-google-ads',
  'service-meta-ads',
  'service-landing-pages',
  'service-tracking-followup',
  'solution-clinic-landing-pages',
  'solution-chatgpt-ads-ai-search',
];

function getRouteFromHash(): PageRoute {
  if (typeof window === 'undefined') return 'home';
  const raw = window.location.hash.replace(/^#\/?/, '').trim() as PageRoute;
  if (VALID_ROUTES.includes(raw)) {
    return raw;
  }
  return 'home';
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageRoute>(getRouteFromHash);
  const [inquiryModalOpen, setInquiryModalOpen] = useState(false);
  const [defaultInquiryService, setDefaultInquiryService] = useState<string>('Google Ads');

  const [selectedService, setSelectedService] = useState<ServiceCardData | null>(null);
  const [selectedSolution, setSelectedSolution] = useState<SolutionCardData | null>(null);
  const [photoNotesOpen, setPhotoNotesOpen] = useState(false);

  useEffect(() => {
    const handleHashChange = () => {
      setCurrentPage(getRouteFromHash());
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleNavigate = (route: PageRoute) => {
    setCurrentPage(route);
    if (typeof window !== 'undefined') {
      window.location.hash = route === 'home' ? '' : route;
    }
  };

  const handleOpenInquiry = (serviceTitle?: string) => {
    if (serviceTitle) {
      setDefaultInquiryService(serviceTitle);
    }
    setInquiryModalOpen(true);
  };

  return (
    <div id="top" className="min-h-screen flex flex-col bg-white text-[#59665D]">
      {/* Header wrapped in pale green #F3F8E9 canvas */}
      <div className="bg-[#F3F8E9]">
        <Header
          currentPage={currentPage}
          onNavigate={handleNavigate}
          onOpenInquiry={handleOpenInquiry}
        />
        {currentPage === 'home' && (
          <HeroSection
            onOpenInquiry={handleOpenInquiry}
            onNavigate={handleNavigate}
          />
        )}
      </div>

      {/* Main Content */}
      <main className="flex-1">
        {currentPage === 'home' ? (
          <>
            {/* 2. Our Services (Centered heading + 4-card 2-column grid + organic green right shape) */}
            <ServicesSection
              onSelectService={(service) => {
                setSelectedSolution(null);
                setSelectedService(service);
              }}
              onNavigate={handleNavigate}
            />

            {/* 3. Why Choose ClinicsAds? (4 circular portrait crops collage on left + 2 feature rows on right) */}
            <WhyChooseSection />

            {/* 4. Additional Solutions ("More Ways to Grow" organic shape on left + 2 overlapping tall cards on right) */}
            <AdditionalSolutionsSection
              onSelectSolution={(solution) => {
                setSelectedService(null);
                setSelectedSolution(solution);
              }}
              onNavigate={handleNavigate}
            />

            {/* 5. Testimonials ("What Our Clients Say" horizontal card + overlapping circular controls + preview placeholder) */}
            <TestimonialsSection />
          </>
        ) : (
          <SubpageViews
            currentPage={currentPage}
            onNavigate={handleNavigate}
            onOpenInquiry={handleOpenInquiry}
            onSelectServiceModal={(service) => {
              setSelectedSolution(null);
              setSelectedService(service);
            }}
            onSelectSolutionModal={(solution) => {
              setSelectedService(null);
              setSelectedSolution(solution);
            }}
          />
        )}
      </main>

      {/* 6. Footer (Deep green #183B2B + organic wave top boundary) */}
      <Footer
        onNavigate={handleNavigate}
        onOpenInquiry={handleOpenInquiry}
        onSelectService={(service) => {
          setSelectedSolution(null);
          setSelectedService(service);
        }}
        onSelectSolution={(solution) => {
          setSelectedService(null);
          setSelectedSolution(solution);
        }}
        onOpenPhotoNotes={() => setPhotoNotesOpen(true)}
      />

      {/* Accessible Inquiry Modal for "Book a Call" and "Contact Us" */}
      <InquiryModal
        isOpen={inquiryModalOpen}
        onClose={() => setInquiryModalOpen(false)}
        defaultService={defaultInquiryService}
      />

      {/* Accessible Service & Solution Detail Modal */}
      <DetailPanelModal
        selectedService={selectedService}
        selectedSolution={selectedSolution}
        onClose={() => {
          setSelectedService(null);
          setSelectedSolution(null);
        }}
        onBookService={(serviceTitle) => handleOpenInquiry(serviceTitle)}
      />

      {/* Photography Substitute Notes Modal */}
      <PhotoNotesModal
        isOpen={photoNotesOpen}
        onClose={() => setPhotoNotesOpen(false)}
      />
    </div>
  );
}
