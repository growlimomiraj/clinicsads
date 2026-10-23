import React from 'react';
import { Calendar, Mail, Phone, MapPin, ExternalLink, Lock } from 'lucide-react';
import { SITE_CONFIG } from '../data/siteContent';
import { BrandWordmark } from './BrandWordmark';
import { Link } from './Link';

interface FooterProps {
  onNavigate: (route: string) => void;
  onOpenInquiry: (defaultService?: string) => void;
  onSelectService?: (service: any) => void;
  onSelectSolution?: (solution: any) => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  onOpenInquiry,
}) => {
  const socialLinks = [
    {
      id: 'instagram',
      name: 'Instagram',
      handle: '@clinicsads',
      url: SITE_CONFIG.socialLinks.instagram,
      icon: (
        <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
        </svg>
      ),
    },
    {
      id: 'facebook',
      name: 'Facebook',
      handle: '@clinicsads',
      url: SITE_CONFIG.socialLinks.facebook,
      icon: (
        <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      ),
    },
    {
      id: 'x',
      name: 'X (Twitter)',
      handle: '@clinicsads',
      url: SITE_CONFIG.socialLinks.x,
      icon: (
        <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
    },
    {
      id: 'youtube',
      name: 'YouTube',
      handle: '@clinicsads',
      url: SITE_CONFIG.socialLinks.youtube,
      icon: (
        <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        </svg>
      ),
    },
    {
      id: 'linkedin',
      name: 'LinkedIn',
      handle: '@clinicsads',
      url: SITE_CONFIG.socialLinks.linkedin,
      icon: (
        <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.45a1.62 1.62 0 1 0 0 3.24 1.62 1.62 0 0 0 0-3.24z" />
        </svg>
      ),
    },
    {
      id: 'tiktok',
      name: 'TikTok',
      handle: '@clinicsads',
      url: SITE_CONFIG.socialLinks.tiktok,
      icon: (
        <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.89 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 0 0-.79-.05A6.34 6.34 0 0 0 3.15 15.67 6.34 6.34 0 0 0 9.49 22a6.34 6.34 0 0 0 6.34-6.33V9.58a8.28 8.28 0 0 0 4.88 1.58V7.71a4.83 4.83 0 0 1-1.12-1.02z" />
        </svg>
      ),
    },
  ];

  const serviceLinks = [
    {
      title: 'Google Ads for Clinics',
      href: '/services/google-ads-for-clinics/',
      route: 'service-google-ads',
    },
    {
      title: 'Meta Ads for Clinics',
      href: '/services/meta-ads-for-clinics/',
      route: 'service-meta-ads',
    },
    {
      title: 'Clinic Landing Pages',
      href: '/services/clinic-landing-pages/',
      route: 'service-landing-pages',
    },
    {
      title: 'Clinic Conversion Tracking',
      href: '/services/clinic-conversion-tracking/',
      route: 'service-tracking-followup',
    },
    {
      title: 'Clinic SEO & Local Search',
      href: '/services/clinic-seo/',
      route: 'service-seo',
    },
  ];

  const resourceLinks = [
    {
      title: 'Google Ads Pre-Launch Checklist',
      href: '/resources/google-ads-for-clinics-pre-launch-checklist/',
      route: 'resource-pre-launch-checklist',
    },
    {
      title: 'Google Ads vs. Meta Ads Guide',
      href: '/resources/google-ads-vs-meta-ads-for-clinics/',
      route: 'resource-google-vs-meta',
    },
    {
      title: 'Clinic Landing Page Optimization',
      href: '/resources/clinic-landing-page-guide/',
      route: 'resource-landing-page-guide',
    },
  ];

  return (
    <footer id="footer" className="relative bg-[#183B2B] text-white pt-24 pb-14 overflow-hidden">
      {/* Top transition boundary wave */}
      <div className="absolute top-0 left-0 right-0 w-full overflow-hidden leading-none pointer-events-none">
        <svg
          viewBox="0 0 1440 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-[50px] sm:h-[80px]"
          preserveAspectRatio="none"
        >
          <path
            d="M0 0C360 80 1080 80 1440 0V100H0V0Z"
            fill="#183B2B"
          />
        </svg>
      </div>

      <div className="max-w-[1180px] mx-auto px-5 sm:px-8 relative z-10">
        {/* Main 4-Column Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-14">
          {/* Column 1: Brand Wordmark, Agency Description, Verified Contact & Social Icons */}
          <div className="lg:col-span-4 space-y-6">
            <BrandWordmark variant="light" onNavigate={onNavigate as any} />

            <p className="text-[13.5px] text-white/75 leading-[1.7] max-w-[340px]">
              Specialized healthcare digital marketing agency helping medical, dental, and specialty clinics turn local search and social demand into qualified, booked patient consultations.
            </p>

            {/* Direct Contact Actions */}
            <div>
              <h3 className="text-[13px] font-bold text-white mb-2.5 uppercase tracking-wider text-[#99BC44]">
                Direct Contact
              </h3>
              <div className="flex items-center gap-3">
                <a
                  href={SITE_CONFIG.contact.phoneHref}
                  aria-label={`Call ${SITE_CONFIG.contact.phoneDisplay}`}
                  title={`Call ${SITE_CONFIG.contact.phoneDisplay}`}
                  className="w-9 h-9 rounded-full bg-white/15 hover:bg-[#F97316] text-white flex items-center justify-center transition-colors"
                >
                  <Phone className="w-4 h-4" />
                </a>
                <a
                  href={SITE_CONFIG.contact.emailHref}
                  aria-label={`Email ${SITE_CONFIG.contact.email}`}
                  title={`Email ${SITE_CONFIG.contact.email}`}
                  className="w-9 h-9 rounded-full bg-white/15 hover:bg-[#F97316] text-white flex items-center justify-center transition-colors"
                >
                  <Mail className="w-4 h-4" />
                </a>
                <Link
                  href="/contact/"
                  onClick={() => onNavigate('contact')}
                  aria-label="Contact Page"
                  title="Contact Page"
                  className="w-9 h-9 rounded-full bg-white/15 hover:bg-[#F97316] text-white flex items-center justify-center transition-colors"
                >
                  <Calendar className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Social Media Channels (@clinicsads) */}
            <div>
              <div className="flex items-center gap-2 mb-2.5">
                <h3 className="text-[13px] font-bold text-white uppercase tracking-wider text-[#99BC44]">
                  Follow Us
                </h3>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-white/15 text-[#99BC44]">
                  @clinicsads
                </span>
              </div>
              <div className="flex items-center flex-wrap gap-2">
                {socialLinks.map((item) => (
                  <a
                    key={item.id}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${item.name} (@clinicsads)`}
                    title={`${item.name} (@clinicsads)`}
                    className="w-8 h-8 rounded-full bg-white/15 hover:bg-[#F97316] text-white flex items-center justify-center transition-all hover:scale-110 cursor-pointer"
                  >
                    {item.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Office & Hotline Details */}
            <div className="text-[12.5px] text-white/70 space-y-1.5 pt-1">
              <p className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#99BC44] shrink-0" />
                <a
                  href={SITE_CONFIG.contact.phoneHref}
                  className="hover:text-white transition-colors"
                >
                  {SITE_CONFIG.contact.phoneDisplay}
                </a>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#99BC44] shrink-0" />
                <a
                  href={SITE_CONFIG.contact.emailHref}
                  className="hover:text-white transition-colors"
                >
                  {SITE_CONFIG.contact.email}
                </a>
              </p>
              <p className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#99BC44] shrink-0 mt-0.5" />
                <span>{SITE_CONFIG.contact.address}</span>
              </p>
            </div>
          </div>

          {/* Column 2: Specialized Clinic Marketing Services */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="text-[14px] font-bold text-white uppercase tracking-wider text-[#99BC44]">
              Clinic Services
            </h3>
            <ul className="space-y-2.5">
              <li>
                <Link
                  href="/services/"
                  onClick={() => onNavigate('services')}
                  className="text-[13.5px] text-white/80 hover:text-[#99BC44] transition-colors font-semibold"
                >
                  All Marketing Services Hub
                </Link>
              </li>
              {serviceLinks.map((s) => (
                <li key={s.route}>
                  <Link
                    href={s.href}
                    onClick={() => onNavigate(s.route)}
                    className="text-[13px] text-white/70 hover:text-[#99BC44] transition-colors block"
                  >
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Educational Resource Guides */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="text-[14px] font-bold text-white uppercase tracking-wider text-[#99BC44]">
              Healthcare PPC Guides
            </h3>
            <ul className="space-y-2.5">
              {resourceLinks.map((r) => (
                <li key={r.route}>
                  <Link
                    href={r.href}
                    onClick={() => onNavigate(r.route)}
                    className="text-[13px] text-white/70 hover:text-[#99BC44] transition-colors block"
                  >
                    {r.title}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="pt-4">
              <h3 className="text-[14px] font-bold text-white uppercase tracking-wider text-[#99BC44] mb-2.5">
                Practice Types
              </h3>
              <p className="text-[12.5px] text-white/65 leading-relaxed">
                Dental practices, cosmetic dentistry, orthodontics, physiotherapy, medical clinics, dermatology, and specialty healthcare centers.
              </p>
            </div>
          </div>

          {/* Column 4: Company Pages & Consultation CTA */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-[14px] font-bold text-white uppercase tracking-wider text-[#99BC44]">
              Navigation
            </h3>
            <ul className="space-y-2.5 text-[13px]">
              <li>
                <Link
                  href="/"
                  onClick={() => onNavigate('home')}
                  className="text-white/70 hover:text-[#99BC44] transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/services/"
                  onClick={() => onNavigate('services')}
                  className="text-white/70 hover:text-[#99BC44] transition-colors"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  href="/about/"
                  onClick={() => onNavigate('about')}
                  className="text-white/70 hover:text-[#99BC44] transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact/"
                  onClick={() => onNavigate('contact')}
                  className="text-white/70 hover:text-[#99BC44] transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>

            <div className="pt-3">
              <button
                type="button"
                onClick={() => onOpenInquiry()}
                className="w-full px-5 py-2.5 rounded-full bg-[#F97316] text-white text-[13px] font-bold hover:bg-[#EA580C] shadow-md transition-colors cursor-pointer text-center"
              >
                Book Strategy Call
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Social Media Hub Bar with all 6 channels: Instagram, Facebook, X, YouTube, LinkedIn, TikTok */}
        <div className="pt-8 pb-6 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="text-[13px] font-bold text-white tracking-wide">
              Official Channels:
            </span>
            <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-white/10 text-[#99BC44] border border-white/10">
              @clinicsads
            </span>
          </div>

          <div className="flex items-center flex-wrap gap-2">
            {socialLinks.map((item) => (
              <a
                key={item.id}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 hover:bg-[#F97316] text-white transition-all text-xs font-semibold hover:-translate-y-0.5 shadow-2xs"
                title={`${item.name} (@clinicsads)`}
              >
                <span className="w-3.5 h-3.5 flex items-center justify-center">{item.icon}</span>
                <span>{item.name}</span>
              </a>
            ))}
          </div>
        </div>

        {/* Bottom Copyright & Disclaimer Bar */}
        <div className="pt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-[12px] text-white/55">
          <p>
            © {new Date().getFullYear()} ClinicsAds ({SITE_CONFIG.domain}). All rights reserved. Specialized healthcare advertising &amp; patient acquisition.
          </p>
          <div className="flex items-center gap-4">
            <Link
              href="/about/"
              onClick={() => onNavigate('about')}
              className="hover:text-white transition-colors"
            >
              About
            </Link>
            <span>•</span>
            <Link
              href="/contact/"
              onClick={() => onNavigate('contact')}
              className="hover:text-white transition-colors"
            >
              Contact
            </Link>
            <span>•</span>
            <Link
              href="/admin/"
              onClick={() => onNavigate('admin')}
              className="hover:text-white/80 transition-colors inline-flex items-center gap-1 text-[11px] text-white/40"
              title="Secure Admin Portal"
            >
              <Lock className="w-3 h-3 text-[#99BC44]" />
              <span>Admin Portal</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
