import React, { useState } from 'react';

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

  const handleImageError = (clinicName: string) => {
    setFailedImages((prev) => {
      if (prev[clinicName]) return prev;
      return { ...prev, [clinicName]: true };
    });
  };

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
        aria-hidden={isDuplicate ? 'true' : undefined}
        tabIndex={isDuplicate ? -1 : 0}
        className="group shrink-0 flex items-center justify-center h-[50px] sm:h-[58px] px-2 sm:px-2.5 py-1.5 rounded-xl transition-all duration-200 outline-none hover:bg-[#F3F8E9]/70 hover:scale-[1.03] focus-visible:ring-2 focus-visible:ring-[#99BC44] cursor-pointer"
        title={`Visit ${clinic.name} website`}
      >
        {hasLogo ? (
          <img
            src={clinic.logoSrc}
            alt={isDuplicate ? '' : `${clinic.name} logo`}
            className="max-h-[38px] sm:max-h-[44px] max-w-[135px] sm:max-w-[165px] w-auto h-auto object-contain transition-opacity duration-200 pointer-events-none select-none"
            loading="eager"
            onError={() => handleImageError(clinic.name)}
          />
        ) : (
          <span className="text-center text-[13px] sm:text-[14px] font-semibold text-[#183B2B]/80 group-hover:text-[#183B2B] leading-tight tracking-tight whitespace-nowrap px-2 transition-colors select-none">
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
        @keyframes clinicsScrollContinuous {
          0% {
            transform: translate3d(0, 0, 0);
          }
          100% {
            transform: translate3d(-50%, 0, 0);
          }
        }

        .clinics-marquee-track-continuous {
          display: flex !important;
          width: max-content !important;
          animation: clinicsScrollContinuous 28s linear infinite !important;
          will-change: transform;
        }

        /* Ensure non-stop scrolling: never pause on hover or focus */
        .clinics-marquee-track-continuous:hover,
        .clinics-marquee-track-continuous:focus-within,
        .clinics-marquee-track-continuous:active {
          animation-play-state: running !important;
        }

        .clinics-marquee-set {
          display: flex;
          align-items: center;
          gap: 1.25rem;
          padding-right: 1.25rem;
          flex-shrink: 0;
        }

        @media (min-width: 640px) {
          .clinics-marquee-set {
            gap: 1.75rem;
            padding-right: 1.75rem;
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
          {/* Left Edge Fade */}
          <div
            className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-r from-white via-white/85 to-transparent z-10"
            aria-hidden="true"
          />

          {/* Right Edge Fade */}
          <div
            className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-l from-white via-white/85 to-transparent z-10"
            aria-hidden="true"
          />

          {/* Continuous Non-Stop Scrolling Marquee */}
          <div className="w-full overflow-hidden py-2 select-none">
            <div className="clinics-marquee-track-continuous">
              {/* Set 1 */}
              <div className="clinics-marquee-set">
                {SCALED_CLINICS.map((clinic, idx) =>
                  renderClinicItem(clinic, `set1-${idx}-${clinic.name}`, false)
                )}
              </div>

              {/* Set 2 */}
              <div className="clinics-marquee-set">
                {SCALED_CLINICS.map((clinic, idx) =>
                  renderClinicItem(clinic, `set2-${idx}-${clinic.name}`, true)
                )}
              </div>

              {/* Set 3 */}
              <div className="clinics-marquee-set">
                {SCALED_CLINICS.map((clinic, idx) =>
                  renderClinicItem(clinic, `set3-${idx}-${clinic.name}`, true)
                )}
              </div>

              {/* Set 4 */}
              <div className="clinics-marquee-set">
                {SCALED_CLINICS.map((clinic, idx) =>
                  renderClinicItem(clinic, `set4-${idx}-${clinic.name}`, true)
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
