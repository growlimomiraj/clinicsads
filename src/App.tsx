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
import {
  ROUTES,
  getRouteByPath,
  getLegacyHashRedirect,
  normalizePath,
} from './data/routes';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { AnimatedSearchSection } from './components/AnimatedSearchSection';
import { ClinicsScaledSection } from './components/ClinicsScaledSection';
import { ServicesSection } from './components/ServicesSection';
import { WhyChooseSection } from './components/WhyChooseSection';
import { AdditionalSolutionsSection } from './components/AdditionalSolutionsSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { Footer } from './components/Footer';
import { InquiryModal } from './components/InquiryModal';
import { DetailPanelModal } from './components/DetailPanelModal';
import { SubpageViews } from './components/SubpageViews';
import { AdminDashboard } from './components/AdminDashboard';

function resolveRouteFromLocation(initialPath?: string): PageRoute {
  if (initialPath) {
    const route = getRouteByPath(initialPath);
    if (route) return route.id as PageRoute;
    if (initialPath === '/404' || initialPath === '/404.html') return 'not-found';
    if (initialPath === '/admin' || initialPath === '/admin/') return 'admin';
    return 'home';
  }

  if (typeof window === 'undefined') return 'home';

  // 1. Safe legacy hash migration bridge (e.g. #service-google-ads -> /services/google-ads-for-clinics/)
  if (window.location.hash) {
    const redirectPath = getLegacyHashRedirect(window.location.hash);
    if (redirectPath) {
      const match = getRouteByPath(redirectPath);
      if (match) {
        window.history.replaceState(null, '', redirectPath);
        return match.id as PageRoute;
      }
    }
  }

  // 2. Check path-based routing
  const pathname = window.location.pathname;
  if (pathname === '/admin' || pathname === '/admin/') {
    return 'admin';
  }

  const match = getRouteByPath(pathname);
  if (match) {
    return match.id as PageRoute;
  }

  // If path is not recognized and not root, return not-found
  if (pathname && pathname !== '/' && pathname !== '/index.html') {
    return 'not-found';
  }

  return 'home';
}

function routeIdToPath(routeId: PageRoute): string {
  if (routeId === 'home') return '/';
  if (routeId === 'admin') return '/admin';
  if (routeId === 'not-found') return '/404';
  const match = ROUTES.find((r) => r.id === routeId);
  return match ? match.path : '/';
}

interface AppProps {
  initialPath?: string;
}

export default function App({ initialPath }: AppProps = {}) {
  const [currentPage, setCurrentPage] = useState<PageRoute>(() =>
    resolveRouteFromLocation(initialPath)
  );
  const [inquiryModalOpen, setInquiryModalOpen] = useState(false);
  const [defaultInquiryService, setDefaultInquiryService] = useState<string>('Google Ads for Clinics');

  const [selectedService, setSelectedService] = useState<ServiceCardData | null>(null);
  const [selectedSolution, setSelectedSolution] = useState<SolutionCardData | null>(null);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPage(resolveRouteFromLocation());
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
        e.preventDefault();
        setCurrentPage((prev) => (prev === 'admin' ? 'home' : 'admin'));
      }
    };

    // Check if initial hash needs migration on mount
    if (typeof window !== 'undefined' && window.location.hash) {
      const redirectPath = getLegacyHashRedirect(window.location.hash);
      if (redirectPath) {
        window.history.replaceState(null, '', redirectPath);
        const match = getRouteByPath(redirectPath);
        if (match) setCurrentPage(match.id as PageRoute);
      }
    }

    window.addEventListener('popstate', handlePopState);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleNavigate = (target: string) => {
    // If target is a path (starts with /)
    let routeId: PageRoute = 'home';
    let targetPath = '/';

    if (target.startsWith('/')) {
      targetPath = normalizePath(target);
      const match = getRouteByPath(targetPath);
      routeId = (match ? match.id : 'not-found') as PageRoute;
    } else {
      routeId = target as PageRoute;
      targetPath = routeIdToPath(routeId);
    }

    setCurrentPage(routeId);

    if (typeof window !== 'undefined') {
      if (window.location.pathname !== targetPath) {
        window.history.pushState(null, '', targetPath);
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleOpenInquiry = (serviceTitle?: string) => {
    if (serviceTitle) {
      setDefaultInquiryService(serviceTitle);
    }
    setInquiryModalOpen(true);
  };

  if (currentPage === 'admin') {
    return <AdminDashboard onExit={() => handleNavigate('/')} />;
  }

  return (
    <div id="top" className="min-h-screen flex flex-col bg-white text-[#59665D]">
      {/* Header, Hero, and Search wrapped in continuous pale green #F3F8E9 canvas */}
      <div className="bg-[#F3F8E9]">
        <Header
          currentPage={currentPage}
          onNavigate={handleNavigate}
          onOpenInquiry={handleOpenInquiry}
        />
        {currentPage === 'home' && (
          <>
            <HeroSection
              onOpenInquiry={handleOpenInquiry}
              onNavigate={handleNavigate as any}
              showBottomWave={false}
            />
            {/* Animated Search Section ("Someone Near You Just Searched:") */}
            <AnimatedSearchSection onOpenInquiry={handleOpenInquiry} />
          </>
        )}
      </div>

      {/* Main Content */}
      <main className="flex-1">
        {currentPage === 'home' ? (
          <>
            {/* Clinics We've Scaled */}
            <ClinicsScaledSection />

            {/* 2. Our Services */}
            <ServicesSection
              onSelectService={(service) => {
                handleNavigate(service.route);
              }}
              onNavigate={handleNavigate as any}
            />

            {/* 3. Why Choose ClinicsAds? */}
            <WhyChooseSection />

            {/* 4. Additional Solutions */}
            <AdditionalSolutionsSection
              onSelectSolution={(solution) => {
                handleNavigate(solution.route);
              }}
              onNavigate={handleNavigate as any}
            />

            {/* 5. Testimonials (No unapproved testimonials in production) */}
            <TestimonialsSection />
          </>
        ) : (
          <SubpageViews
            currentPage={currentPage}
            onNavigate={handleNavigate}
            onOpenInquiry={handleOpenInquiry}
            onSelectServiceModal={(service) => {
              handleNavigate(service.route);
            }}
            onSelectSolutionModal={(solution) => {
              handleNavigate(solution.route);
            }}
          />
        )}
      </main>

      {/* 6. Footer (Deep green #183B2B with all 6 social media channels & crawlable links) */}
      <Footer
        onNavigate={handleNavigate}
        onOpenInquiry={handleOpenInquiry}
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
    </div>
  );
}
