import React, { useState, useRef, useEffect } from 'react';

export interface ScaledClinic {
  name: string;
  website: string;
  logoSrc?: string;
}

/**
 * Client data for Clinics We've Scaled.
 */
export const SCALED_CLINICS: ScaledClinic[] = [
  {
    name: 'First Response Healthcare',
    website: 'https://firstresponsehealthcare.com/',
    logoSrc: '/logos/first-response-healthcare.webp',
  },
  {
    name: 'GetChecked',
    website: 'https://getchecked.health/',
    logoSrc: '/logos/getchecked.svg',
  },
  {
    name: 'MMC Dubai',
    website: 'https://www.mmcdubai.ae/',
    logoSrc: '/logos/mmc-dubai.png',
  },
  {
    name: 'Novelty Clinic',
    website: 'https://noveltyclinic.com/',
    logoSrc: '/logos/novelty-clinic.svg',
  },
  {
    name: 'Art of Mobility',
    website: 'https://artofmobility.com/',
    logoSrc: '/logos/art-of-mobility.svg',
  },
  {
    name: 'Bodyworks Physio',
    website: 'https://bodyworks.physio/',
    logoSrc: '/logos/bodyworks-physio.png',
  },
  {
    name: 'Cambridge Physio',
    website: 'https://cambridgephysio.ca/',
    logoSrc: '/logos/cambridge-physio.webp',
  },
  {
    name: 'Encore Physiotherapy',
    website: 'https://encorephysiotherapy.ca/',
    logoSrc: '/logos/encore-physiotherapy.jpeg',
  },
];

export const ClinicsScaledSection: React.FC = () => {
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});
  const viewportRef = useRef<HTMLDivElement>(null);
  const firstGroupRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);
  const startPosRef = useRef({ x: 0, y: 0 });

  const handleImageError = (clinicName: string) => {
    setFailedImages((prev) => {
      if (prev[clinicName]) return prev;
      return { ...prev, [clinicName]: true };
    });
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    isDraggingRef.current = false;
    startPosRef.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    const dx = Math.abs(e.clientX - startPosRef.current.x);
    const dy = Math.abs(e.clientY - startPosRef.current.y);
    if (dx > 6 || dy > 6) {
      isDraggingRef.current = true;
    }
  };

  const handleLinkClick = (e: React.MouseEvent) => {
    if (isDraggingRef.current) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  useEffect(() => {
    const el = viewportRef.current;
    const firstGroup = firstGroupRef.current;
    if (!el || !firstGroup) return;

    let isInteracting = false;
    let resumeTimeout: number | null = null;
    let animationFrameId: number;
    let lastTime = performance.now();
    const speed = 32; // px per second

    let setWidth = firstGroup.offsetWidth;
    const updateSetWidth = () => {
      if (firstGroup) {
        setWidth = firstGroup.offsetWidth;
      }
    };

    const resizeObserver = new ResizeObserver(updateSetWidth);
    resizeObserver.observe(firstGroup);

    // Initialize to the start of the second group for seamless bidirectional scrolling
    if (setWidth > 0) {
      el.scrollLeft = setWidth;
    }

    // Touch interaction handlers for mobile
    const onTouchStart = () => {
      isInteracting = true;
      if (resumeTimeout) window.clearTimeout(resumeTimeout);
    };

    const onTouchEnd = () => {
      if (resumeTimeout) window.clearTimeout(resumeTimeout);
      // Resume auto-scroll after finger swipe momentum settles
      resumeTimeout = window.setTimeout(() => {
        isInteracting = false;
        lastTime = performance.now();
      }, 1200);
    };

    // Desktop hover handlers
    const onMouseEnter = () => {
      isInteracting = true;
      if (resumeTimeout) window.clearTimeout(resumeTimeout);
    };

    const onMouseLeave = () => {
      if (resumeTimeout) window.clearTimeout(resumeTimeout);
      resumeTimeout = window.setTimeout(() => {
        isInteracting = false;
        lastTime = performance.now();
      }, 600);
    };

    // Desktop mouse drag handlers
    let isMouseDown = false;
    let mouseStartX = 0;
    let mouseStartScroll = 0;

    const onMouseDown = (e: MouseEvent) => {
      if (e.button !== 0) return;
      isMouseDown = true;
      isInteracting = true;
      mouseStartX = e.pageX;
      mouseStartScroll = el.scrollLeft;
      if (resumeTimeout) window.clearTimeout(resumeTimeout);
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isMouseDown) return;
      const dx = e.pageX - mouseStartX;
      el.scrollLeft = mouseStartScroll - dx;
    };

    const onMouseUp = () => {
      if (!isMouseDown) return;
      isMouseDown = false;
      if (resumeTimeout) window.clearTimeout(resumeTimeout);
      resumeTimeout = window.setTimeout(() => {
        isInteracting = false;
        lastTime = performance.now();
      }, 1000);
    };

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Continuous Animation Loop
    const step = (now: number) => {
      const dt = (now - lastTime) / 1000;
      lastTime = now;
      const safeDt = Math.min(dt, 0.1);

      if (!prefersReducedMotion && !isInteracting && el && setWidth > 0) {
        el.scrollLeft += speed * safeDt;
      }

      // Seamless bidirectional infinite wrap
      if (el && setWidth > 0) {
        if (el.scrollLeft >= setWidth * 2) {
          el.scrollLeft -= setWidth;
        } else if (el.scrollLeft <= 10) {
          el.scrollLeft += setWidth;
        }
      }

      animationFrameId = requestAnimationFrame(step);
    };

    animationFrameId = requestAnimationFrame(step);

    el.addEventListener('touchstart', onTouchStart, { passive: true });
    el.addEventListener('touchend', onTouchEnd, { passive: true });
    el.addEventListener('touchcancel', onTouchEnd, { passive: true });
    el.addEventListener('mouseenter', onMouseEnter);
    el.addEventListener('mouseleave', onMouseLeave);
    el.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    return () => {
      cancelAnimationFrame(animationFrameId);
      if (resumeTimeout) window.clearTimeout(resumeTimeout);
      resizeObserver.disconnect();
      el.removeEventListener('touchstart', onTouchStart);
      el.removeEventListener('touchend', onTouchEnd);
      el.removeEventListener('touchcancel', onTouchEnd);
      el.removeEventListener('mouseenter', onMouseEnter);
      el.removeEventListener('mouseleave', onMouseLeave);
      el.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, []);

  const renderClinicItem = (clinic: ScaledClinic, key: string, isDuplicate = false) => {
    const hasLogo = Boolean(
      clinic.logoSrc &&
      clinic.logoSrc.trim().length > 0 &&
      !failedImages[clinic.name]
    );

    return (
      <a
        key={key}
        href={clinic.website}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleLinkClick}
        aria-hidden={isDuplicate ? 'true' : undefined}
        tabIndex={isDuplicate ? -1 : 0}
        className="group shrink-0 flex items-center justify-center h-[46px] sm:h-[50px] px-2.5 py-1 rounded-lg transition-all duration-200 outline-none hover:bg-[#F3F8E9]/60 focus-visible:ring-2 focus-visible:ring-[#99BC44] cursor-pointer"
        title={`Visit ${clinic.name} website`}
      >
        {hasLogo ? (
          <img
            src={clinic.logoSrc}
            alt={isDuplicate ? '' : `${clinic.name} logo`}
            className="max-h-[38px] sm:max-h-[44px] max-w-[125px] sm:max-w-[150px] w-auto h-auto object-contain transition-opacity duration-200 pointer-events-none select-none"
            loading="lazy"
            onError={() => handleImageError(clinic.name)}
          />
        ) : (
          <span className="text-center text-[13px] sm:text-[14px] font-semibold text-[#183B2B]/75 group-hover:text-[#183B2B] leading-tight tracking-tight whitespace-nowrap px-1 transition-colors select-none">
            {clinic.name}
          </span>
        )}
      </a>
    );
  };

  return (
    <section
      id="clinics-scaled"
      aria-label="Clinics We've Scaled"
      className="relative w-full bg-white py-10 sm:py-12 border-b border-[#183B2B]/6 overflow-hidden"
    >
      <style>{`
        /* Smooth touch-enabled scrolling container */
        .clinics-marquee-viewport {
          overflow-x: auto;
          overflow-y: hidden;
          width: 100%;
          user-select: none;
          -webkit-user-select: none;
          scrollbar-width: none;
          -ms-overflow-style: none;
          -webkit-overflow-scrolling: touch;
          touch-action: pan-x pan-y;
          cursor: grab;
        }

        .clinics-marquee-viewport:active {
          cursor: grabbing;
        }

        .clinics-marquee-viewport::-webkit-scrollbar {
          display: none;
        }

        .clinics-marquee-track {
          display: flex;
          width: max-content;
        }

        .clinics-marquee-group {
          display: flex;
          align-items: center;
          gap: 1.25rem;
          padding-right: 1.25rem;
          flex-shrink: 0;
        }
      `}</style>

      <div className="max-w-[1240px] mx-auto px-4 sm:px-6">
        {/* Section Heading */}
        <div className="text-center mb-6 sm:mb-8">
          <h2 className="text-xs sm:text-[13px] font-bold uppercase tracking-[0.2em] text-[#183B2B]/60 font-sans select-none">
            Clinics We’ve Scaled
          </h2>
        </div>

        {/* Logo Strip Container with Edge Fades */}
        <div className="relative w-full overflow-hidden">
          {/* Subtle Left Edge Fade */}
          <div
            className="pointer-events-none absolute left-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-r from-white via-white/80 to-transparent z-10"
            aria-hidden="true"
          />

          {/* Subtle Right Edge Fade */}
          <div
            className="pointer-events-none absolute right-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-l from-white via-white/80 to-transparent z-10"
            aria-hidden="true"
          />

          {/* Marquee Viewport with Touch Dragging & Smooth Auto-Scroll */}
          <div
            ref={viewportRef}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            className="clinics-marquee-viewport py-2"
          >
            <div className="clinics-marquee-track">
              {/* Group 1: Buffer for backward finger dragging */}
              <div
                ref={firstGroupRef}
                className="clinics-marquee-group"
              >
                {SCALED_CLINICS.map((clinic, idx) =>
                  renderClinicItem(clinic, `g1-${idx}-${clinic.name}`, true)
                )}
              </div>

              {/* Group 2: Primary active group */}
              <div className="clinics-marquee-group">
                {SCALED_CLINICS.map((clinic, idx) =>
                  renderClinicItem(clinic, `g2-${idx}-${clinic.name}`, false)
                )}
              </div>

              {/* Group 3: Forward loop group */}
              <div className="clinics-marquee-group">
                {SCALED_CLINICS.map((clinic, idx) =>
                  renderClinicItem(clinic, `g3-${idx}-${clinic.name}`, true)
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
