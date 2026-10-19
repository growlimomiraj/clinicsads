import React from 'react';
import { Megaphone, LineChart, Target, Sparkles, CheckCircle2 } from 'lucide-react';
import { HERO_CONTENT, PHOTO_ASSETS, PageRoute } from '../data/siteContent';
import { ResilientPortrait } from './ResilientPortrait';

interface HeroSectionProps {
  onOpenInquiry: (defaultService?: string) => void;
  onNavigate: (route: PageRoute) => void;
  showBottomWave?: boolean;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenInquiry,
  onNavigate,
  showBottomWave = false,
}) => {
  return (
    <section className={`relative pt-6 overflow-hidden ${showBottomWave ? 'pb-24 lg:pb-32' : 'pb-8 sm:pb-10 lg:pb-12'}`}>
      {/* Subtle organic background shapes in top-left and behind hero composition */}
      <div
        className="pointer-events-none select-none absolute -top-28 -left-24 w-[420px] h-[420px] rounded-full border-[45px] border-[#E4F0D0]/60 opacity-70"
        aria-hidden="true"
      />

      {/* Flowing decorative curved SVG line behind the composition (matching the reference's pale line trajectory) */}
      <svg
        className="pointer-events-none select-none absolute top-4 right-0 w-full max-w-[960px] h-[620px] text-[#DFECC8]"
        viewBox="0 0 960 620"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M140 80 C 310 20, 410 190, 560 150 C 710 110, 820 260, 950 220"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeDasharray="6 6"
        />
        <path
          d="M360 520 C 480 420, 620 550, 880 460"
          stroke="currentColor"
          strokeWidth="2"
        />
      </svg>

      <div className="max-w-[1180px] mx-auto px-5 sm:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-6 items-center">
          {/* Left Column: Text Content */}
          <div className="lg:col-span-5 text-left max-w-[480px] mx-auto lg:mx-0">
            {/* Small white pill above headline matching reference */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white shadow-[0_4px_14px_rgba(24,59,43,0.05)] mb-6">
              <span className="w-4 h-4 rounded-full bg-[#99BC44]/20 flex items-center justify-center text-[#7A9A2E]">
                <Sparkles className="w-2.5 h-2.5" />
              </span>
              <span className="text-[12.5px] font-semibold text-[#7A9A2E] tracking-wide whitespace-nowrap">
                {HERO_CONTENT.pill}
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-[36px] sm:text-[44px] lg:text-[46px] font-extrabold text-[#183B2B] leading-[1.16] tracking-tight mb-5 text-balance">
              {HERO_CONTENT.headlineLines[0]}
              <br />
              {HERO_CONTENT.headlineLines[1]}
            </h1>

            {/* Description */}
            <p className="text-[15.5px] sm:text-[16px] text-[#59665D] leading-[1.7] mb-8">
              {HERO_CONTENT.description}
            </p>

            {/* Primary & Secondary Buttons */}
            <div className="flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={() => onOpenInquiry()}
                className="px-8 py-3.5 rounded-full bg-[#F97316] text-white text-[14px] font-bold hover:bg-[#EA580C] transition-all shadow-[0_8px_20px_rgba(249,115,22,0.32)] cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F97316]"
              >
                {HERO_CONTENT.primaryCta}
              </button>

              <button
                type="button"
                onClick={() => {
                  onNavigate('services');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-8 py-3.5 rounded-full bg-[#DDE9C7] text-[#183B2B] text-[14px] font-semibold hover:bg-[#C7DCA5] transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#183B2B]"
              >
                {HERO_CONTENT.secondaryCta}
              </button>
            </div>
          </div>

          {/* Right Column: Concentric Rings, Circular Portrait, Floating Cards & Orbit Avatars */}
          <div className="lg:col-span-7 flex items-center justify-center lg:justify-end">
            <div className="relative w-[330px] h-[330px] sm:w-[460px] sm:h-[460px] lg:w-[520px] lg:h-[520px] flex items-center justify-center">
              {/* Outer Thin Orbit Ring */}
              <div
                className="absolute inset-0 rounded-full border-[1.5px] border-white/90 shadow-[0_0_40px_rgba(24,59,43,0.03)] pointer-events-none"
                aria-hidden="true"
              />

              {/* Outer Translucent Halo Ring */}
              <div
                className="w-[82%] h-[82%] rounded-full bg-white/45 backdrop-blur-[2px] shadow-[0_18px_45px_rgba(24,59,43,0.06)] flex items-center justify-center"
              >
                {/* Broad Solid White Concentric Ring */}
                <div className="w-[84%] h-[84%] rounded-full bg-white shadow-[0_15px_35px_rgba(24,59,43,0.08)] flex items-center justify-center p-3 sm:p-4">
                  {/* Inner Portrait Circle */}
                  <ResilientPortrait
                    asset={PHOTO_ASSETS.heroMain}
                    className="w-full h-full rounded-full shadow-inner"
                  />
                </div>
              </div>

              {/* Floating Card 1: Top-Left Green Gradient Card ("Google & Meta Ads") */}
              <div className="absolute -top-2 -left-3 sm:top-4 sm:-left-6 z-20 w-[165px] sm:w-[195px] rounded-2xl bg-gradient-to-br from-[#99BC44] to-[#7FA32E] p-3.5 sm:p-4 text-white shadow-[0_14px_30px_rgba(127,163,46,0.28)]">
                <div className="flex items-center gap-1.5 text-[10px] font-medium text-white/90 mb-1">
                  <Megaphone className="w-3.5 h-3.5 shrink-0" />
                  <span className="truncate">{HERO_CONTENT.floatingCards.topCard.badge}</span>
                </div>
                <p className="text-[13.5px] sm:text-[15px] font-bold leading-snug mb-1">
                  {HERO_CONTENT.floatingCards.topCard.title}
                </p>
                <p className="text-[10.5px] text-white/90 leading-tight mb-2.5">
                  {HERO_CONTENT.floatingCards.topCard.subtitle}
                </p>
                <button
                  type="button"
                  onClick={() => {
                    onNavigate(HERO_CONTENT.floatingCards.topCard.targetRoute);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="px-3 py-1 rounded-full bg-[#F97316] text-white text-[10px] font-bold hover:bg-[#EA580C] transition-colors cursor-pointer whitespace-nowrap"
                >
                  {HERO_CONTENT.floatingCards.topCard.actionLabel}
                </button>
              </div>

              {/* Floating Card 2: Middle-Right White Card ("Clear Campaign Reporting") */}
              <div className="absolute bottom-14 -right-3 sm:bottom-20 sm:-right-6 z-20 w-[165px] sm:w-[195px] rounded-2xl bg-white p-3.5 sm:p-4 shadow-[0_16px_36px_rgba(24,59,43,0.1)] border border-[#E7F0D8]">
                <div className="flex items-center gap-1.5 mb-1">
                  <span className="w-5 h-5 rounded-full bg-[#F3F8E9] flex items-center justify-center text-[#99BC44] shrink-0">
                    <LineChart className="w-3.5 h-3.5" />
                  </span>
                  <span className="text-[12.5px] sm:text-[13.5px] font-extrabold text-[#183B2B] leading-tight">
                    {HERO_CONTENT.floatingCards.rightCard.title}
                  </span>
                </div>
                <p className="text-[10.5px] text-[#59665D] leading-tight mb-2.5">
                  {HERO_CONTENT.floatingCards.rightCard.subtitle}
                </p>
                <button
                  type="button"
                  onClick={() => {
                    onNavigate(HERO_CONTENT.floatingCards.rightCard.targetRoute);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="px-3 py-1 rounded-full bg-[#F97316] text-white text-[10px] font-bold hover:bg-[#EA580C] transition-colors cursor-pointer whitespace-nowrap"
                >
                  {HERO_CONTENT.floatingCards.rightCard.actionLabel}
                </button>
              </div>

              {/* Small Circular Icon Badge 1: Top-Right (matching Play Store badge position) */}
              <button
                type="button"
                onClick={() => {
                  onNavigate('service-google-ads');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="absolute top-5 right-8 sm:top-8 sm:right-12 z-20 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white shadow-[0_8px_20px_rgba(24,59,43,0.1)] flex items-center justify-center text-[#183B2B] hover:scale-105 transition-transform cursor-pointer"
                title="Targeted Search Reach — View Google Ads Page"
                aria-label="View Google Ads Page"
              >
                <Target className="w-4 h-4 sm:w-5 sm:h-5 text-[#183B2B]" />
              </button>

              {/* Small Circular Icon Badge 2: Lower-Left Inner Ring (matching Apple badge position) */}
              <button
                type="button"
                onClick={() => {
                  onNavigate('service-tracking-followup');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="absolute bottom-14 left-10 sm:bottom-20 sm:left-14 z-20 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white shadow-[0_8px_20px_rgba(24,59,43,0.1)] flex items-center justify-center text-[#183B2B] hover:scale-105 transition-transform cursor-pointer"
                title="Verified Conversion Tracking — View Tracking Page"
                aria-label="View Tracking & Follow-Up Page"
              >
                <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-[#183B2B]" />
              </button>

              {/* Orbit Portrait Thumbnail 1: Middle-Left on Outer Ring */}
              <div className="absolute top-[52%] -left-3 sm:-left-4 z-20 w-11 h-11 sm:w-13 sm:h-13 rounded-full p-1 bg-white shadow-[0_8px_20px_rgba(24,59,43,0.12)]">
                <ResilientPortrait
                  asset={PHOTO_ASSETS.heroThumbLeft}
                  className="w-full h-full rounded-full"
                  fallbackBg="bg-[#99BC44]"
                />
              </div>

              {/* Orbit Portrait Thumbnail 2: Bottom-Center on Outer Ring */}
              <div className="absolute -bottom-3 left-[43%] z-20 w-11 h-11 sm:w-13 sm:h-13 rounded-full p-1 bg-white shadow-[0_8px_20px_rgba(24,59,43,0.12)]">
                <ResilientPortrait
                  asset={PHOTO_ASSETS.heroThumbBottom}
                  className="w-full h-full rounded-full"
                  fallbackBg="bg-[#C7DCA5]"
                />
              </div>

              {/* Orbit Portrait Thumbnail 3: Bottom-Right on Outer Ring */}
              <div className="absolute bottom-3 right-5 sm:bottom-4 sm:right-8 z-20 w-11 h-11 sm:w-13 sm:h-13 rounded-full p-1 bg-white shadow-[0_8px_20px_rgba(24,59,43,0.12)]">
                <ResilientPortrait
                  asset={PHOTO_ASSETS.heroThumbRight}
                  className="w-full h-full rounded-full"
                  fallbackBg="bg-[#DFECC8]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Smooth Curved Wave Transition at the bottom of the Hero Section (rendered if standalone) */}
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
