import React, { useState, useEffect, useRef } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  X,
  ArrowRight,
  CheckCircle2,
  Calendar,
} from 'lucide-react';
import { PageRoute } from '../data/siteContent';
import { Link } from './Link';

interface HeroSectionProps {
  onOpenInquiry: (defaultService?: string) => void;
  onNavigate: (route: PageRoute) => void;
  showBottomWave?: boolean;
}

interface ResultSlide {
  id: string;
  title: string;
  clientType: string;
  platform: 'Google Ads' | 'Meta Ads' | 'Google & Meta';
  imageSrc: string;
  statPill: string;
  metrics: {
    label: string;
    value: string;
    color: string;
  }[];
}

const RESULT_SLIDES: ResultSlide[] = [
  {
    id: 'diagnostic-lab',
    title: 'Diagnostic Health Lab — Dubai',
    clientType: 'Medical & Diagnostic Testing',
    platform: 'Google Ads',
    imageSrc: '/portfolio/proof_1_diagnostic_lab.png',
    statPill: '24.8K Conversions • dh235 Cost/conv • dh5.84M Spend',
    metrics: [
      { label: 'Conversions', value: '24.8K', color: 'text-[#E53E3E]' },
      { label: 'Cost / Conv.', value: 'dh235', color: 'text-[#D69E2E]' },
      { label: 'Clicks', value: '570K', color: 'text-[#3182CE]' },
      { label: 'Total Spend', value: 'dh5.84M', color: 'text-[#38A169]' },
    ],
  },
  {
    id: 'aesthetic-clinic',
    title: 'Aesthetic Clinic — UAE',
    clientType: 'Cosmetic & Aesthetic Medicine',
    platform: 'Google Ads',
    imageSrc: '/portfolio/proof_2_aesthetic_clinic.png',
    statPill: '1.28K Qualified Leads • dh328 Cost/Lead • dh419K Spend',
    metrics: [
      { label: 'Qualified Leads', value: '1.28K', color: 'text-[#D69E2E]' },
      { label: 'Cost / Lead', value: 'dh328', color: 'text-[#E53E3E]' },
      { label: 'Clicks', value: '16.1K', color: 'text-[#183B2B]' },
      { label: 'Total Spend', value: 'dh419K', color: 'text-[#59665D]' },
    ],
  },
  {
    id: 'lead-gen-uae',
    title: 'Local Healthcare & Service Practice — UAE',
    clientType: 'Local Practice Lead Gen',
    platform: 'Google Ads',
    imageSrc: '/portfolio/proof_3_lead_gen_uae.png',
    statPill: '508+ Conversions • dh55.46 Cost/conv • dh28.2K Spend',
    metrics: [
      { label: 'Conversions', value: '508.54', color: 'text-[#D69E2E]' },
      { label: 'Cost / Conv.', value: 'dh55.46', color: 'text-[#E53E3E]' },
      { label: 'Clicks', value: '1.42K', color: 'text-[#38A169]' },
      { label: 'Total Spend', value: 'dh28.2K', color: 'text-[#3182CE]' },
    ],
  },
  {
    id: 'ngo-meta-ads',
    title: 'Enterprise Meta Ads Portfolio',
    clientType: 'Multi-Campaign Advertising',
    platform: 'Meta Ads',
    imageSrc: '/portfolio/proof_5_ngo_meta_ads.jpg',
    statPill: '85.6M+ Impressions • 6.89M+ Reach • $1.03M+ Spend',
    metrics: [
      { label: 'Impressions', value: '85.6M+', color: 'text-[#183B2B]' },
      { label: 'Unique Reach', value: '6.89M+', color: 'text-[#7A9A2E]' },
      { label: 'Managed Spend', value: '$1,031,397', color: 'text-[#F97316]' },
      { label: 'Conversion Window', value: '7-Day Click', color: 'text-[#3182CE]' },
    ],
  },
  {
    id: 'automotive-meta-leads',
    title: 'High-Volume Lead Generation — UAE',
    clientType: 'Meta Social Campaigns',
    platform: 'Meta Ads',
    imageSrc: '/portfolio/proof_7_automotive_meta_leads.png',
    statPill: '39.2M+ Impressions • 3.59M+ Reach • 946K AED Spend',
    metrics: [
      { label: 'Impressions', value: '39.2M+', color: 'text-[#183B2B]' },
      { label: 'Audience Reach', value: '3.59M+', color: 'text-[#7A9A2E]' },
      { label: 'Total Spend', value: '946K AED', color: 'text-[#F97316]' },
      { label: 'Cost Per Lead', value: 'dh39 – dh88', color: 'text-[#38A169]' },
    ],
  },
  {
    id: 'ecommerce-growth',
    title: 'Performance Growth & Scaling',
    clientType: 'Performance Acquisition',
    platform: 'Google & Meta',
    imageSrc: '/portfolio/proof_4_wall_art_ecommerce.png',
    statPill: '797.45% ROAS • $1.86M Conversion Value • $233K Spend',
    metrics: [
      { label: 'Conversion Value', value: '$1.86M', color: 'text-[#3182CE]' },
      { label: 'Actual ROAS', value: '797.45%', color: 'text-[#D69E2E]' },
      { label: 'Conversions', value: '7.98K', color: 'text-[#E53E3E]' },
      { label: 'Total Spend', value: '$233K', color: 'text-[#38A169]' },
    ],
  },
];

const AUTOPLAY_INTERVAL_MS = 3800;

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenInquiry,
  onNavigate,
  showBottomWave = true,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [zoomImage, setZoomImage] = useState<string | null>(null);

  const touchStartXRef = useRef<number | null>(null);

  const totalSlides = RESULT_SLIDES.length;
  const currentSlide = RESULT_SLIDES[currentIndex];

  // Continuous auto-scrolling
  useEffect(() => {
    if (zoomImage) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % totalSlides);
    }, AUTOPLAY_INTERVAL_MS);

    return () => clearInterval(timer);
  }, [zoomImage, totalSlides, currentIndex]);

  // Keyboard navigation & Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && zoomImage) {
        setZoomImage(null);
      } else if (!zoomImage) {
        if (e.key === 'ArrowLeft') {
          handlePrev();
        } else if (e.key === 'ArrowRight') {
          handleNext();
        }
      }
    };
    if (typeof window !== 'undefined') {
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [zoomImage]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  };

  // Mobile Touch Swipe Handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartXRef.current;
    if (deltaX > 45) {
      handlePrev();
    } else if (deltaX < -45) {
      handleNext();
    }
    touchStartXRef.current = null;
  };

  return (
    <section
      className={`relative pt-2 sm:pt-4 overflow-hidden ${
        showBottomWave ? 'pb-24 lg:pb-32' : 'pb-14 sm:pb-18 lg:pb-24'
      }`}
    >
      {/* Decorative ambient background aura */}
      <div
        className="pointer-events-none select-none absolute -top-28 -left-24 w-[460px] h-[460px] rounded-full border-[45px] border-[#E4F0D0]/50 opacity-60"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none select-none absolute top-1/4 -right-32 w-[540px] h-[540px] rounded-full bg-[#EAF5D8]/40 blur-3xl opacity-50"
        aria-hidden="true"
      />

      <div className="max-w-[1180px] mx-auto px-4 sm:px-6 relative z-10">
        {/* ========================================================================= */}
        {/* 1. CLEAN SECTION HEADER                                                   */}
        {/* ========================================================================= */}
        <div className="text-center max-w-[820px] mx-auto mb-6 sm:mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white shadow-xs border border-[#DFECC8] mb-3 text-[12px] font-bold text-[#183B2B]">
            <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
            <span>Verified Campaign Proof & Results</span>
          </div>

          <h1 className="text-[28px] xs:text-[34px] sm:text-[42px] lg:text-[48px] font-extrabold text-[#183B2B] leading-[1.15] tracking-tight mb-3 font-display text-balance">
            Real Campaign Results That{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#183B2B] via-[#7A9A2E] to-[#183B2B]">
              Speak for Themselves
            </span>
          </h1>

          <p className="text-[14px] sm:text-[16px] text-[#59665D] max-w-[640px] mx-auto leading-relaxed">
            Unedited dashboard screenshots from our managed Google Ads & Meta advertising
            campaigns across healthcare and local service practices.
          </p>
        </div>

        {/* ========================================================================= */}
        {/* 2. THE RESULTS SLIDER (AUTOSCROLLING)                                     */}
        {/* ========================================================================= */}
        <div
          className="relative max-w-[1040px] mx-auto"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Main Slide Card */}
          <div className="rounded-2xl sm:rounded-3xl bg-white border border-[#DFECC8] shadow-[0_20px_50px_rgba(24,59,43,0.09)] overflow-hidden">
            {/* Top Browser Window Header Bar */}
            <div className="bg-[#FAFDF6] border-b border-[#E8F1DC] px-4 sm:px-6 py-3 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="w-3 h-3 rounded-full bg-[#EF4444] shrink-0" />
                <span className="w-3 h-3 rounded-full bg-[#F59E0B] shrink-0" />
                <span className="w-3 h-3 rounded-full bg-[#10B981] shrink-0" />

                <span className="ml-2 px-2.5 py-0.5 rounded-md bg-white border border-[#DFECC8] text-[11px] sm:text-[12px] font-bold text-[#183B2B] truncate">
                  {currentSlide.platform}
                </span>

                <span className="text-[12px] sm:text-[13px] font-bold text-[#183B2B] truncate hidden xs:inline">
                  {currentSlide.title}
                </span>
              </div>

              {/* Slide Counter & Zoom Button */}
              <div className="flex items-center gap-3 shrink-0">
                <span className="text-[12px] font-bold text-[#7A9A2E] bg-[#EAF5D8] px-2.5 py-0.5 rounded-full">
                  {currentIndex + 1} / {totalSlides}
                </span>

                <button
                  type="button"
                  onClick={() => setZoomImage(currentSlide.imageSrc)}
                  className="p-1.5 rounded-lg bg-white hover:bg-[#F3F8E9] border border-[#DFECC8] text-[#183B2B] hover:text-[#7A9A2E] transition-colors cursor-pointer"
                  title="Enlarge screenshot full screen"
                  aria-label="Enlarge screenshot full screen"
                >
                  <ZoomIn className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Slide Body: Large Screenshot Container */}
            <div
              onClick={() => setZoomImage(currentSlide.imageSrc)}
              className="relative group bg-[#F8FAF4] p-3 sm:p-6 flex items-center justify-center cursor-zoom-in min-h-[280px] xs:min-h-[340px] sm:min-h-[440px] lg:min-h-[480px]"
            >
              <img
                key={currentSlide.id}
                src={currentSlide.imageSrc}
                alt={`${currentSlide.title} verified campaign dashboard`}
                className="w-full h-auto max-h-[440px] sm:max-h-[500px] object-contain rounded-xl shadow-sm border border-[#E6EFE0] transition-opacity duration-300"
              />

              {/* Hover Zoom Hint Overlay */}
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 text-white font-bold text-sm pointer-events-none rounded-xl">
                <ZoomIn className="w-5 h-5 text-white" />
                <span>Click to enlarge full-resolution dashboard</span>
              </div>
            </div>

            {/* Bottom Slide Info & Metrics Bar */}
            <div className="bg-[#FAFDF6] border-t border-[#E8F1DC] p-4 sm:p-5">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                {/* Title & Client Type */}
                <div className="text-left">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="w-2 h-2 rounded-full bg-[#10B981]" />
                    <h2 className="text-[15px] sm:text-[17px] font-black text-[#183B2B]">
                      {currentSlide.title}
                    </h2>
                  </div>
                  <p className="text-[12px] font-semibold text-[#7A9A2E]">
                    {currentSlide.clientType} • {currentSlide.statPill}
                  </p>
                </div>

                {/* 4 Metric Pills */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 shrink-0">
                  {currentSlide.metrics.map((m) => (
                    <div
                      key={m.label}
                      className="px-3 py-1.5 rounded-xl bg-white border border-[#DFECC8] text-center"
                    >
                      <div className="text-[10px] uppercase font-bold text-[#59665D] tracking-wider">
                        {m.label}
                      </div>
                      <div className={`text-[15px] sm:text-[17px] font-black ${m.color} font-display leading-tight`}>
                        {m.value}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Left / Prev Arrow Button */}
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous result slide"
            className="absolute left-2 sm:-left-5 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white text-[#183B2B] shadow-[0_6px_20px_rgba(24,59,43,0.18)] border border-[#DFECC8] hover:bg-[#F3F8E9] hover:scale-105 active:scale-95 transition-all flex items-center justify-center cursor-pointer z-20"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          {/* Right / Next Arrow Button */}
          <button
            type="button"
            onClick={handleNext}
            aria-label="Next result slide"
            className="absolute right-2 sm:-right-5 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white text-[#183B2B] shadow-[0_6px_20px_rgba(24,59,43,0.18)] border border-[#DFECC8] hover:bg-[#F3F8E9] hover:scale-105 active:scale-95 transition-all flex items-center justify-center cursor-pointer z-20"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>

        {/* ========================================================================= */}
        {/* 3. CLEAN PAGINATION DOTS (MINIMAL, ZERO CLUTTER)                           */}
        {/* ========================================================================= */}
        <div className="flex items-center justify-center gap-1.5 mt-4 sm:mt-5">
          {RESULT_SLIDES.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setCurrentIndex(idx)}
              aria-label={`Go to result slide ${idx + 1}`}
              className={`h-2 transition-all duration-300 rounded-full cursor-pointer ${
                idx === currentIndex
                  ? 'w-7 bg-[#183B2B]'
                  : 'w-2 bg-[#D5E5C0] hover:bg-[#99BC44]'
              }`}
            />
          ))}
        </div>

        {/* ========================================================================= */}
        {/* 4. CLEAN CALL-TO-ACTION                                                   */}
        {/* ========================================================================= */}
        <div className="mt-7 sm:mt-8 text-center">
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-3">
            <button
              type="button"
              onClick={() =>
                onOpenInquiry(
                  `Portfolio Inquiry: ${currentSlide.title} (${currentSlide.platform})`
                )
              }
              className="group inline-flex items-center justify-center gap-2 px-8 py-3.5 sm:py-4 rounded-full bg-[#F97316] hover:bg-[#EA580C] text-white font-bold text-[14.5px] sm:text-[15.5px] tracking-wide shadow-[0_10px_24px_rgba(249,115,22,0.3)] hover:shadow-[0_14px_30px_rgba(249,115,22,0.4)] hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F97316]"
            >
              <Calendar className="w-4 h-4 text-white/90" />
              <span>Get Similar Results For Your Clinic</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>

            <Link
              href="/services/"
              onClick={() => {
                onNavigate('services');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="inline-flex items-center justify-center px-7 py-3.5 sm:py-4 rounded-full bg-[#EAF5D8] hover:bg-[#DFECC8] text-[#183B2B] text-[14px] font-bold transition-colors cursor-pointer"
            >
              Our Services
            </Link>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-y-1 gap-x-4 text-[11.5px] font-semibold text-[#59665D]">
            <span className="inline-flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981]" />
              Month-to-Month Agreements
            </span>
            <span className="inline-flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981]" />
              Verified Conversion Tracking
            </span>
            <span className="inline-flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981]" />
              No 12-Month Lock-in Contracts
            </span>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 5. LIGHTBOX / FULLSCREEN MODAL                                             */}
      {/* ========================================================================= */}
      {zoomImage && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6"
          onClick={() => setZoomImage(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="relative bg-white rounded-2xl max-w-[1100px] w-full max-h-[92vh] overflow-hidden shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-5 py-3.5 bg-[#183B2B] text-white">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#10B981]" />
                <span className="text-[14px] font-bold">
                  {currentSlide.title} — Unedited Campaign Screenshot
                </span>
              </div>
              <button
                type="button"
                onClick={() => setZoomImage(null)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Close image inspection"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Image Body */}
            <div className="p-4 sm:p-6 overflow-auto bg-[#F7FAF2] flex items-center justify-center">
              <img
                src={zoomImage}
                alt={`${currentSlide.title} full resolution screenshot`}
                className="w-full h-auto max-h-[75vh] object-contain rounded-lg shadow-sm border border-[#DFECC8]"
              />
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 6. SMOOTH CURVED WAVE TRANSITION AT BOTTOM                                 */}
      {/* ========================================================================= */}
      {showBottomWave && (
        <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden leading-none pointer-events-none">
          <svg
            viewBox="0 0 1440 110"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-[55px] sm:h-[85px] lg:h-[105px] preserve-3d"
            preserveAspectRatio="none"
          >
            <path
              d="M0 25C280 115 640 110 980 50C1190 13 1340 20 1440 45V110H0V25Z"
              fill="#FFFFFF"
            />
          </svg>
        </div>
      )}
    </section>
  );
};
