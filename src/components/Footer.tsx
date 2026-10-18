import React from 'react';
import { Calendar, Mail, Phone, MapPin, ExternalLink, Camera, Instagram } from 'lucide-react';
import {
  ADDITIONAL_SOLUTIONS_CONTENT,
  NAV_ITEMS,
  PHOTO_ASSETS,
  PageRoute,
  SERVICES_CONTENT,
  SITE_CONFIG,
  ServiceCardData,
  SolutionCardData,
} from '../data/siteContent';
import { BrandWordmark } from './BrandWordmark';

interface FooterProps {
  onNavigate: (route: PageRoute) => void;
  onOpenInquiry: (defaultService?: string) => void;
  onSelectService: (service: ServiceCardData) => void;
  onSelectSolution: (solution: SolutionCardData) => void;
  onOpenPhotoNotes: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  onOpenInquiry,
  onOpenPhotoNotes,
}) => {
  const substituteCount = Object.values(PHOTO_ASSETS).filter(
    (p) => p.isSubstitute
  ).length;

  const handleRouteClick = (route: PageRoute) => {
    onNavigate(route);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="footer" className="relative bg-[#183B2B] text-white pt-28 pb-16 overflow-hidden">
      {/* Organic Wave-Shaped Top Edge transitioning from white section above */}
      <div className="absolute top-0 left-0 right-0 w-full overflow-hidden leading-none pointer-events-none">
        <svg
          viewBox="0 0 1440 125"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-[65px] sm:h-[95px] lg:h-[120px]"
          preserveAspectRatio="none"
        >
          <path
            d="M0 0H1440V85C1280 125 1040 115 740 50C440 -15 180 10 0 65V0Z"
            fill="#FFFFFF"
          />
        </svg>
      </div>

      <div className="max-w-[1060px] mx-auto px-5 sm:px-8 relative z-10">
        {/* Brand Wordmark at top of Footer matching Cakap footer alignment */}
        <div className="mb-10">
          <BrandWordmark variant="light" onNavigate={onNavigate} />
        </div>

        {/* Multi-Column Footer Content matching the reference screenshot's left-to-right structure */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-14 border-b border-white/10">
          {/* Column 1: Agency Description, Contact Icons, Hotline, Address & Service Hours */}
          <div className="lg:col-span-4 space-y-6">
            <div>
              <p className="text-[13.5px] text-white/75 leading-[1.7] max-w-[300px]">
                A dedicated healthcare marketing division of{' '}
                <a
                  href={SITE_CONFIG.parentNetwork.agencyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white underline decoration-[#99BC44]/70 underline-offset-4 hover:text-[#99BC44] transition-colors"
                >
                  {SITE_CONFIG.parentNetwork.agencyName}
                </a>{' '}
                &amp;{' '}
                <a
                  href={SITE_CONFIG.parentNetwork.founderUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white underline decoration-[#99BC44]/70 underline-offset-4 hover:text-[#99BC44] transition-colors"
                >
                  {SITE_CONFIG.parentNetwork.founderSiteName}
                </a>
                , helping clinics grow patient inquiries with Google Ads, Meta Ads,
                ChatGPT Ads, landing pages, and conversion tracking.
              </p>
            </div>

            {/* Contact Us Circular Action Icons matching the reference screenshot */}
            <div>
              <h3 className="text-[13.5px] font-bold text-white mb-3">
                Contact Us
              </h3>
              <div className="flex items-center gap-3">
                <a
                  href={SITE_CONFIG.contact.phoneHref}
                  aria-label={`Call ${SITE_CONFIG.contact.phoneDisplay}`}
                  title={`Call ${SITE_CONFIG.contact.phoneDisplay}`}
                  className="w-9 h-9 rounded-full bg-white/15 hover:bg-[#F97316] text-white hover:text-white flex items-center justify-center transition-colors"
                >
                  <Phone className="w-4 h-4" />
                </a>
                <a
                  href={SITE_CONFIG.contact.emailHref}
                  aria-label={`Email ${SITE_CONFIG.contact.email}`}
                  title={`Email ${SITE_CONFIG.contact.email}`}
                  className="w-9 h-9 rounded-full bg-white/15 hover:bg-[#F97316] text-white hover:text-white flex items-center justify-center transition-colors"
                >
                  <Mail className="w-4 h-4" />
                </a>
                <a
                  href={SITE_CONFIG.contact.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram (@adsbyusman_)"
                  title="Instagram (@adsbyusman_)"
                  className="w-9 h-9 rounded-full bg-white/15 hover:bg-[#F97316] text-white hover:text-white flex items-center justify-center transition-colors"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <button
                  type="button"
                  onClick={() => handleRouteClick('contact')}
                  aria-label="Go to Contact page"
                  title="Go to Contact page"
                  className="w-9 h-9 rounded-full bg-white/15 hover:bg-[#F97316] text-white hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                >
                  <Calendar className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Hotline & Email matching the reference screenshot's "Hotline" block */}
            <div>
              <h3 className="text-[13.5px] font-bold text-white mb-1.5">
                Hotline &amp; Direct Email
              </h3>
              <div className="space-y-1 text-[13px] text-white/70">
                <p>
                  <a
                    href={SITE_CONFIG.contact.phoneHref}
                    className="hover:text-[#99BC44] transition-colors"
                  >
                    {SITE_CONFIG.contact.phoneDisplay}
                  </a>
                </p>
                <p>
                  <a
                    href={SITE_CONFIG.contact.emailHref}
                    className="hover:text-[#99BC44] transition-colors"
                  >
                    {SITE_CONFIG.contact.email}
                  </a>
                </p>
              </div>
            </div>

            {/* Service Hour & Office Location matching reference screenshot's bottom-left block */}
            <div>
              <h3 className="text-[13.5px] font-bold text-white mb-1.5">
                Office &amp; Engagement
              </h3>
              <p className="text-[12.5px] text-white/65 flex items-start gap-1.5 leading-relaxed">
                <MapPin className="w-3.5 h-3.5 text-[#99BC44] shrink-0 mt-0.5" />
                <span>{SITE_CONFIG.contact.address}</span>
              </p>
              <p className="text-[12px] text-white/55 mt-1">
                ({SITE_CONFIG.contact.serviceHours})
              </p>
            </div>
          </div>

          {/* Column 2: Our Services & Additional Solutions */}
          <div className="lg:col-span-4 space-y-7">
            <div>
              <h3 className="text-[14px] font-bold text-white mb-3.5">
                Our Services
              </h3>
              <ul className="space-y-2.5">
                {SERVICES_CONTENT.cards.map((service) => (
                  <li key={service.id}>
                    <button
                      type="button"
                      onClick={() => handleRouteClick(service.route)}
                      className="text-[13px] text-white/70 hover:text-[#99BC44] transition-colors cursor-pointer text-left"
                    >
                      {service.title}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-[14px] font-bold text-white mb-3.5">
                Additional Solutions
              </h3>
              <ul className="space-y-2.5">
                {ADDITIONAL_SOLUTIONS_CONTENT.cards.map((solution) => (
                  <li key={solution.id}>
                    <button
                      type="button"
                      onClick={() => handleRouteClick(solution.route)}
                      className="text-[13px] text-white/70 hover:text-[#99BC44] transition-colors cursor-pointer text-left"
                    >
                      {solution.title}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Column 3: Company Navigation, Agency Network & Strategy Consultation CTA */}
          <div className="lg:col-span-4 space-y-6">
            <div>
              <h3 className="text-[14px] font-bold text-white mb-3.5">
                Pages &amp; Navigation
              </h3>
              <ul className="space-y-2.5">
                <li>
                  <button
                    type="button"
                    onClick={() => handleRouteClick('home')}
                    className="text-[13px] text-white/70 hover:text-[#99BC44] transition-colors cursor-pointer text-left"
                  >
                    Home
                  </button>
                </li>
                {NAV_ITEMS.map((item) => (
                  <li key={item.label}>
                    <button
                      type="button"
                      onClick={() => handleRouteClick(item.route)}
                      className="text-[13px] text-white/70 hover:text-[#99BC44] transition-colors cursor-pointer text-left"
                    >
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-[14px] font-bold text-white mb-3">
                Agency Network
              </h3>
              <ul className="space-y-2 text-[13px]">
                <li>
                  <a
                    href={SITE_CONFIG.parentNetwork.agencyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-white/70 hover:text-[#99BC44] transition-colors"
                  >
                    <span>growlimo.com — Healthcare &amp; Local Growth</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </li>
                <li>
                  <a
                    href={SITE_CONFIG.parentNetwork.founderUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-white/70 hover:text-[#F97316] transition-colors"
                  >
                    <span>adsbyusman.com — Muhammad Usman</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </li>
              </ul>
            </div>

            <div className="pt-1 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => onOpenInquiry()}
                className="px-6 py-2.5 rounded-full bg-[#F97316] text-white text-[13px] font-bold hover:bg-[#EA580C] shadow-[0_6px_20px_rgba(249,115,22,0.35)] transition-colors cursor-pointer whitespace-nowrap"
              >
                Book a Strategy Call
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Copyright & Photography Substitute Attribution Note */}
        <div className="pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-[12px] text-white/55">
          <p>
            © {new Date().getFullYear()} ClinicsAds ({SITE_CONFIG.domain}) · Powered by{' '}
            <a
              href={SITE_CONFIG.parentNetwork.agencyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              GrowLimo
            </a>{' '}
            &amp;{' '}
            <a
              href={SITE_CONFIG.parentNetwork.founderUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              Ads by Usman
            </a>
            .
          </p>

          {substituteCount > 0 && (
            <button
              type="button"
              onClick={onOpenPhotoNotes}
              className="inline-flex items-center gap-1.5 text-white/65 hover:text-[#99BC44] transition-colors cursor-pointer underline underline-offset-4"
            >
              <Camera className="w-3.5 h-3.5" />
              <span>Photography Substitute Notes ({substituteCount} portraits)</span>
            </button>
          )}
        </div>
      </div>
    </footer>
  );
};
