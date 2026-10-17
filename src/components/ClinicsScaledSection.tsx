import React, { useState } from 'react';

export interface ScaledClinic {
  name: string;
  website: string;
  logoSrc?: string;
}

/**
 * Client data for Clinics We've Scaled.
 *
 * NOTE: Currently logoSrc entries are empty strings because official logo assets
 * have not yet been uploaded. When you upload logo files (e.g., into /public/logos/),
 * simply update the logoSrc property with the path (e.g., '/logos/mmc-dubai.svg').
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

  const handleImageError = (clinicName: string) => {
    setFailedImages((prev) => {
      if (prev[clinicName]) return prev;
      return { ...prev, [clinicName]: true };
    });
  };

  return (
    <section
      id="clinics-scaled"
      aria-label="Clinics We've Scaled"
      className="relative w-full bg-white py-10 sm:py-12 border-b border-[#183B2B]/6 overflow-hidden"
    >
      <style>{`
        /* Auto-scroll marquee for all screens (mobile and desktop) */
        .clinics-marquee-viewport {
          overflow: hidden;
          width: 100%;
          user-select: none;
        }

        .clinics-marquee-track {
          display: flex;
          width: max-content;
        }

        .clinics-marquee-group,
        .clinics-marquee-group-duplicate {
          display: flex;
          align-items: center;
          gap: 1.25rem;
          padding-right: 1.25rem;
          flex-shrink: 0;
          animation: clinicsMarqueeScroll 35s linear infinite;
          will-change: transform;
        }

        /* Pause on hover, focus, and mobile touch */
        .clinics-marquee-viewport:hover .clinics-marquee-group,
        .clinics-marquee-viewport:hover .clinics-marquee-group-duplicate,
        .clinics-marquee-viewport:focus-within .clinics-marquee-group,
        .clinics-marquee-viewport:focus-within .clinics-marquee-group-duplicate,
        .clinics-marquee-viewport:active .clinics-marquee-group,
        .clinics-marquee-viewport:active .clinics-marquee-group-duplicate {
          animation-play-state: paused;
        }

        @keyframes clinicsMarqueeScroll {
          0% {
            transform: translate3d(0, 0, 0);
          }
          100% {
            transform: translate3d(-100%, 0, 0);
          }
        }

        /* Reduced Motion: Disable animation and duplicate group */
        @media (prefers-reduced-motion: reduce) {
          .clinics-marquee-viewport {
            overflow-x: auto !important;
          }
          .clinics-marquee-group {
            animation: none !important;
            transform: none !important;
          }
          .clinics-marquee-group-duplicate {
            display: none !important;
          }
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

          {/* Marquee Viewport */}
          <div className="clinics-marquee-viewport py-2">
            <div className="clinics-marquee-track">
              {/* Primary Group (interactive, accessible) */}
              <div className="clinics-marquee-group">
                {SCALED_CLINICS.map((clinic) => {
                  const hasLogo = Boolean(
                    clinic.logoSrc &&
                    clinic.logoSrc.trim().length > 0 &&
                    !failedImages[clinic.name]
                  );

                  return (
                    <a
                      key={clinic.name}
                      href={clinic.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group shrink-0 flex items-center justify-center h-[46px] sm:h-[50px] px-2.5 py-1 rounded-lg transition-all duration-200 outline-none hover:bg-[#F3F8E9]/60 focus-visible:ring-2 focus-visible:ring-[#99BC44]"
                      title={`Visit ${clinic.name} website`}
                    >
                      {hasLogo ? (
                        <img
                          src={clinic.logoSrc}
                          alt={`${clinic.name} logo`}
                          className="max-h-[38px] sm:max-h-[44px] max-w-[125px] sm:max-w-[150px] w-auto h-auto object-contain transition-opacity duration-200"
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
                })}
              </div>

              {/* Duplicate Group (seamless loop on all screens, hidden from screen readers & non-interactive) */}
              <div
                className="clinics-marquee-group-duplicate"
                aria-hidden="true"
              >
                {SCALED_CLINICS.map((clinic, idx) => {
                  const hasLogo = Boolean(
                    clinic.logoSrc &&
                    clinic.logoSrc.trim().length > 0 &&
                    !failedImages[clinic.name]
                  );

                  return (
                    <div
                      key={`duplicate-${idx}-${clinic.name}`}
                      className="shrink-0 flex items-center justify-center h-[46px] sm:h-[50px] px-2.5 py-1 pointer-events-none select-none"
                    >
                      {hasLogo ? (
                        <img
                          src={clinic.logoSrc}
                          alt=""
                          className="max-h-[38px] sm:max-h-[44px] max-w-[125px] sm:max-w-[150px] w-auto h-auto object-contain"
                          loading="lazy"
                          onError={() => handleImageError(clinic.name)}
                        />
                      ) : (
                        <span className="text-center text-[13px] sm:text-[14px] font-semibold text-[#183B2B]/75 leading-tight tracking-tight whitespace-nowrap px-1">
                          {clinic.name}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
