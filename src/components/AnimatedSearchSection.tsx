import React, { useState, useEffect, useRef } from 'react';
import {
  Search,
  MapPin,
  Calendar,
  Building2,
  HeartPulse
} from 'lucide-react';

const SEARCH_PHRASES = [
  'Best clinics near me',
  'Best hospital near me',
];

const TYPING_SPEED_MS = 70;
const HOLD_DURATION_MS = 1800;
const ERASING_SPEED_MS = 40;
const PAUSE_BEFORE_NEXT_MS = 300;

export const AnimatedSearchSection: React.FC = () => {
  const [displayText, setDisplayText] = useState('');
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const [isErasing, setIsErasing] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Timer reference for cleanup
  const timerRef = useRef<number | null>(null);

  // Check prefers-reduced-motion
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleMotionChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleMotionChange);
    return () => mediaQuery.removeEventListener('change', handleMotionChange);
  }, []);

  // Character-by-character typewriter loop
  useEffect(() => {
    if (prefersReducedMotion) {
      setDisplayText(SEARCH_PHRASES[0]);
      return;
    }

    const currentTargetPhrase = SEARCH_PHRASES[phraseIndex];

    const clearActiveTimer = () => {
      if (timerRef.current !== null) {
        window.clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };

    if (isTyping && !isErasing) {
      if (displayText.length < currentTargetPhrase.length) {
        timerRef.current = window.setTimeout(() => {
          setDisplayText(currentTargetPhrase.slice(0, displayText.length + 1));
        }, TYPING_SPEED_MS);
      } else {
        // Phrase completed: hold for 1,800ms then start erasing
        timerRef.current = window.setTimeout(() => {
          setIsTyping(false);
          setIsErasing(true);
        }, HOLD_DURATION_MS);
      }
    } else if (isErasing) {
      if (displayText.length > 0) {
        timerRef.current = window.setTimeout(() => {
          setDisplayText(currentTargetPhrase.slice(0, displayText.length - 1));
        }, ERASING_SPEED_MS);
      } else {
        // Fully erased: pause for 300ms before typing next phrase
        timerRef.current = window.setTimeout(() => {
          setIsErasing(false);
          setIsTyping(true);
          setPhraseIndex((prev) => (prev + 1) % SEARCH_PHRASES.length);
        }, PAUSE_BEFORE_NEXT_MS);
      }
    }

    return () => clearActiveTimer();
  }, [displayText, phraseIndex, isTyping, isErasing, prefersReducedMotion]);

  return (
    <section
      id="local-patient-search"
      aria-labelledby="animated-search-heading"
      className="relative w-full overflow-hidden bg-[#F3F8E9] pt-[50px] sm:pt-[65px] lg:pt-[76px] pb-[115px] sm:pb-[145px] lg:pb-[170px] text-[#183B2B] selection:bg-[#99BC44]/30 selection:text-[#183B2B]"
    >
      {/* ========================================================================= */}
      {/* FAINT DECORATIVE BACKGROUND SHAPES & OUTLINE ICONS MATCHING HERO/SERVICES */}
      {/* ========================================================================= */}
      <div
        className="pointer-events-none absolute inset-0 select-none overflow-hidden"
        aria-hidden="true"
      >
        {/* Organic circular ring matching HeroSection border style */}
        <div className="absolute -top-24 -left-20 w-[400px] h-[400px] rounded-full border-[45px] border-[#E4F0D0]/60 opacity-70" />

        {/* Organic circular ring on bottom-right */}
        <div className="absolute -bottom-28 -right-20 w-[420px] h-[420px] rounded-full border-[45px] border-[#E4F0D0]/60 opacity-70" />

        {/* Flowing curved dashed line matching HeroSection SVG line trajectory */}
        <svg
          className="pointer-events-none select-none absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1200px] h-full text-[#DFECC8]"
          viewBox="0 0 1200 400"
          fill="none"
        >
          <path
            d="M 60 120 C 300 40, 520 280, 800 180 C 980 120, 1080 240, 1160 200"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeDasharray="6 6"
          />
        </svg>

        {/* Floating Outline Icon: Medical Cross (Top Left) */}
        <div className="absolute top-[16%] left-[6%] sm:left-[10%] text-[#183B2B] opacity-[0.06]">
          <svg
            className="w-16 h-16 sm:w-20 sm:h-20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 2v20M2 12h20" />
            <circle cx="12" cy="12" r="9" />
          </svg>
        </div>

        {/* Floating Outline Icon: Location Pin (Top Right) */}
        <div className="absolute top-[18%] right-[8%] sm:right-[12%] text-[#183B2B] opacity-[0.06]">
          <MapPin className="w-14 h-14 sm:w-18 sm:h-18 stroke-[1.4]" />
        </div>

        {/* Floating Outline Icon: Calendar (Bottom Left) */}
        <div className="absolute bottom-[24%] left-[8%] sm:left-[14%] text-[#183B2B] opacity-[0.05]">
          <Calendar className="w-14 h-14 sm:w-18 sm:h-18 stroke-[1.4]" />
        </div>

        {/* Floating Outline Icon: Clinic Building (Bottom Right) */}
        <div className="absolute bottom-[22%] right-[7%] sm:right-[11%] text-[#183B2B] opacity-[0.06]">
          <Building2 className="w-16 h-16 sm:w-20 sm:h-20 stroke-[1.4]" />
        </div>

        {/* Floating Outline Icon: Magnifying Glass (Mid Right) */}
        <div className="absolute top-[48%] right-[3%] sm:right-[5%] text-[#183B2B] opacity-[0.05] hidden sm:block">
          <Search className="w-16 h-16 sm:w-20 sm:h-20 stroke-[1.4]" />
        </div>

        {/* Floating Outline Icon: Heart Pulse / Care (Mid Left) */}
        <div className="absolute top-[46%] left-[3%] sm:left-[5%] text-[#183B2B] opacity-[0.05] hidden sm:block">
          <HeartPulse className="w-14 h-14 sm:w-18 sm:h-18 stroke-[1.4]" />
        </div>
      </div>

      {/* ========================================================================= */}
      {/* CENTERED CONTENT CONTAINER (MAX-WIDTH ~1100px)                           */}
      {/* ========================================================================= */}
      <div className="relative z-10 mx-auto max-w-[1100px] px-5 sm:px-8 text-center">
        
        {/* 1. Main Heading */}
        <h2
          id="animated-search-heading"
          className="text-[24px] xs:text-[28px] sm:text-[34px] md:text-[40px] lg:text-[44px] font-extrabold text-[#183B2B] tracking-tight leading-[1.2] mb-7 sm:mb-9 text-balance font-display"
        >
          Someone Near You Just Searched:
        </h2>

        {/* Accessible screen reader announcement (hidden visually, static text) */}
        <div className="sr-only">
          Example patient searches include "Best clinics near me" and "Best hospital near me". Will your clinic show up when local patients search for care?
        </div>

        {/* 2. Prominent Search Bar with Animated Text */}
        <div className="mx-auto w-full max-w-[850px]">
          <div
            role="presentation"
            className="group relative flex w-full items-center justify-between rounded-[22px] sm:rounded-[26px] bg-white px-4 py-2 sm:px-7 md:px-8 shadow-[0_14px_40px_rgba(24,59,43,0.06)] border border-[#DFECC8] transition-all duration-300 hover:shadow-[0_18px_48px_rgba(24,59,43,0.1)] hover:border-[#99BC44] h-[64px] sm:h-[84px] md:h-[90px]"
          >
            {/* Left Spacer for symmetry to keep animated phrase centered */}
            <div className="w-7 sm:w-8 md:w-9 shrink-0" aria-hidden="true" />

            {/* Centered Animated Query Text */}
            <div
              className="flex-1 flex items-center justify-center overflow-hidden px-2 text-center"
              aria-hidden="true"
            >
              <span className="font-display text-[15px] xs:text-[17px] sm:text-[22px] md:text-[26px] font-bold text-[#183B2B] tracking-tight whitespace-nowrap select-none inline-flex items-center">
                {displayText}
                {!prefersReducedMotion && (
                  <span
                    className="inline-block w-[2px] sm:w-[2.5px] h-[1.1em] bg-[#7A9A2E] ml-0.5 sm:ml-1 animate-pulse"
                    aria-hidden="true"
                  />
                )}
              </span>
            </div>

            {/* Right Magnifying Glass Icon with Dedicated Reserved Space */}
            <div
              className="flex items-center justify-center w-7 sm:w-8 md:w-9 shrink-0 text-[#7A9A2E] pl-1 sm:pl-2"
              aria-hidden="true"
            >
              <Search className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-[#7A9A2E] stroke-[2.4]" />
            </div>
          </div>
        </div>

        {/* 3. Secondary Heading */}
        <h3 className="mt-8 sm:mt-10 text-[21px] xs:text-[24px] sm:text-[28px] md:text-[32px] lg:text-[34px] font-extrabold text-[#183B2B] tracking-tight leading-[1.25] font-display">
          Will your clinic show up?
        </h3>

        {/* 4. Supporting Text */}
        <p className="mt-4 sm:mt-5 text-[15px] sm:text-[16px] md:text-[17.5px] font-medium text-[#59665D] leading-relaxed max-w-[680px] mx-auto text-balance">
          Help more patients discover your clinic when they search for care nearby.
        </p>

      </div>

      {/* ========================================================================= */}
      {/* SMOOTH CURVED WAVE TRANSITION AT BOTTOM MATCHING ABOVE SECTION BORDER     */}
      {/* ========================================================================= */}
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
    </section>
  );
};
