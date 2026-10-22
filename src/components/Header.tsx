import React, { useState } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import { BrandWordmark } from './BrandWordmark';
import { Link } from './Link';

interface HeaderProps {
  currentPage: string;
  onNavigate: (route: string) => void;
  onOpenInquiry: (defaultService?: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentPage,
  onNavigate,
  onOpenInquiry,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);

  const servicesList = [
    {
      title: 'Google Ads for Clinics',
      href: '/services/google-ads-for-clinics/',
      route: 'service-google-ads',
      desc: 'High-intent search campaigns capturing local patients',
    },
    {
      title: 'Meta Ads for Clinics',
      href: '/services/meta-ads-for-clinics/',
      route: 'service-meta-ads',
      desc: 'Compliant Facebook & Instagram patient discovery',
    },
    {
      title: 'Clinic Landing Pages',
      href: '/services/clinic-landing-pages/',
      route: 'service-landing-pages',
      desc: 'Sub-2s mobile pages built to convert ad traffic',
    },
    {
      title: 'Clinic Conversion Tracking',
      href: '/services/clinic-conversion-tracking/',
      route: 'service-tracking-followup',
      desc: 'GA4 & GTM patient attribution without privacy leaks',
    },
    {
      title: 'Clinic SEO & Local Search',
      href: '/services/clinic-seo/',
      route: 'service-seo',
      desc: 'Google Maps 3-Pack and organic healthcare visibility',
    },
    {
      title: 'Physical Therapy Marketing',
      href: '/services/physical-therapy-marketing/',
      route: 'service-physical-therapy',
      desc: 'Google Ads & lead generation for physiotherapy clinics',
    },
  ];

  const isServicesActive =
    currentPage === 'services' || currentPage.startsWith('service-');

  return (
    <header className="relative z-30 w-full pt-6 pb-3">
      <div className="max-w-[1180px] mx-auto px-5 sm:px-8 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark */}
        <BrandWordmark variant="dark" onNavigate={onNavigate as any} />

        {/* Zone 2 & 3: Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <nav aria-label="Main Navigation" className="flex items-center gap-7">
            <Link
              href="/"
              onClick={() => onNavigate('home')}
              className={`text-[14px] font-medium transition-colors whitespace-nowrap shrink-0 py-1 rounded focus-visible:outline-2 focus-visible:outline-[#99BC44] ${
                currentPage === 'home'
                  ? 'text-[#183B2B] font-bold underline decoration-[#99BC44] decoration-2 underline-offset-8'
                  : 'text-[#183B2B]/80 hover:text-[#183B2B]'
              }`}
            >
              Home
            </Link>

            {/* Services with Hover Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setServicesDropdownOpen(true)}
              onMouseLeave={() => setServicesDropdownOpen(false)}
            >
              <Link
                href="/services/"
                onClick={() => onNavigate('services')}
                className={`inline-flex items-center gap-1 text-[14px] font-medium transition-colors whitespace-nowrap shrink-0 py-1 rounded focus-visible:outline-2 focus-visible:outline-[#99BC44] ${
                  isServicesActive
                    ? 'text-[#183B2B] font-bold underline decoration-[#99BC44] decoration-2 underline-offset-8'
                    : 'text-[#183B2B]/80 hover:text-[#183B2B]'
                }`}
              >
                <span>Services</span>
                <ChevronDown className="w-3.5 h-3.5 text-[#59665D]" />
              </Link>

              {servicesDropdownOpen && (
                <div className="absolute top-full -left-4 w-72 pt-2 z-50">
                  <div className="rounded-2xl bg-white p-3 shadow-xl border border-[#DFECC8] space-y-1">
                    <Link
                      href="/services/"
                      onClick={() => {
                        setServicesDropdownOpen(false);
                        onNavigate('services');
                      }}
                      className="block px-3 py-2 rounded-xl hover:bg-[#F3F8E9] transition-colors"
                    >
                      <span className="block text-xs font-bold text-[#7A9A2E] uppercase tracking-wider">
                        All Services
                      </span>
                      <span className="block text-sm font-bold text-[#183B2B]">
                        Overview Hub &amp; Pricing
                      </span>
                    </Link>
                    <div className="h-px bg-[#E7F0D8] my-1" />
                    {servicesList.map((s) => (
                      <Link
                        key={s.route}
                        href={s.href}
                        onClick={() => {
                          setServicesDropdownOpen(false);
                          onNavigate(s.route);
                        }}
                        className="block px-3 py-2 rounded-xl hover:bg-[#F3F8E9] transition-colors"
                      >
                        <span className="block text-sm font-bold text-[#183B2B]">
                          {s.title}
                        </span>
                        <span className="block text-[11.5px] text-[#59665D] leading-tight">
                          {s.desc}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <Link
              href="/about/"
              onClick={() => onNavigate('about')}
              className={`text-[14px] font-medium transition-colors whitespace-nowrap shrink-0 py-1 rounded focus-visible:outline-2 focus-visible:outline-[#99BC44] ${
                currentPage === 'about'
                  ? 'text-[#183B2B] font-bold underline decoration-[#99BC44] decoration-2 underline-offset-8'
                  : 'text-[#183B2B]/80 hover:text-[#183B2B]'
              }`}
            >
              About
            </Link>

            <Link
              href="/contact/"
              onClick={() => onNavigate('contact')}
              className={`text-[14px] font-medium transition-colors whitespace-nowrap shrink-0 py-1 rounded focus-visible:outline-2 focus-visible:outline-[#99BC44] ${
                currentPage === 'contact'
                  ? 'text-[#183B2B] font-bold underline decoration-[#99BC44] decoration-2 underline-offset-8'
                  : 'text-[#183B2B]/80 hover:text-[#183B2B]'
              }`}
            >
              Contact
            </Link>
          </nav>

          <button
            type="button"
            onClick={() => onOpenInquiry()}
            className="px-6 py-2.5 rounded-full bg-[#F97316] text-white text-[13px] font-bold tracking-wide hover:bg-[#EA580C] transition-colors shadow-sm whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F97316]"
          >
            Contact Us
          </button>
        </div>

        {/* Mobile menu button */}
        <div className="flex md:hidden items-center">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="w-11 h-11 rounded-full bg-white/80 border border-[#C7DCA5] flex items-center justify-center text-[#183B2B] shadow-xs focus-visible:outline-2 focus-visible:outline-[#F97316]"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-[#F3F8E9] border-b border-[#C7DCA5]/60 shadow-lg px-6 py-5 z-40 max-h-[85vh] overflow-y-auto">
          <nav aria-label="Mobile Navigation" className="flex flex-col space-y-2.5">
            <Link
              href="/"
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigate('home');
              }}
              className={`text-left text-[15px] py-2 border-b border-[#C7DCA5]/30 ${
                currentPage === 'home'
                  ? 'font-bold text-[#183B2B]'
                  : 'font-medium text-[#183B2B]/80'
              }`}
            >
              Home
            </Link>

            <Link
              href="/services/"
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigate('services');
              }}
              className={`text-left text-[15px] py-2 border-b border-[#C7DCA5]/30 ${
                currentPage === 'services'
                  ? 'font-bold text-[#183B2B]'
                  : 'font-medium text-[#183B2B]/80'
              }`}
            >
              Services Overview
            </Link>

            {/* Mobile Service Sub-links */}
            <div className="pl-3 py-1 space-y-1.5 border-b border-[#C7DCA5]/30">
              <span className="text-[11px] font-bold text-[#7A9A2E] uppercase tracking-wider block">
                Specialized Services
              </span>
              {servicesList.map((s) => (
                <Link
                  key={s.route}
                  href={s.href}
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onNavigate(s.route);
                  }}
                  className={`block text-[13.5px] py-1 ${
                    currentPage === s.route
                      ? 'font-bold text-[#183B2B]'
                      : 'text-[#59665D] hover:text-[#183B2B]'
                  }`}
                >
                  {s.title}
                </Link>
              ))}
            </div>

            <Link
              href="/about/"
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigate('about');
              }}
              className={`text-left text-[15px] py-2 border-b border-[#C7DCA5]/30 ${
                currentPage === 'about'
                  ? 'font-bold text-[#183B2B]'
                  : 'font-medium text-[#183B2B]/80'
              }`}
            >
              About
            </Link>

            <Link
              href="/contact/"
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigate('contact');
              }}
              className={`text-left text-[15px] py-2 border-b border-[#C7DCA5]/30 ${
                currentPage === 'contact'
                  ? 'font-bold text-[#183B2B]'
                  : 'font-medium text-[#183B2B]/80'
              }`}
            >
              Contact
            </Link>

            <div className="pt-2">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenInquiry();
                }}
                className="w-full py-3 rounded-full bg-[#F97316] text-white text-[14px] font-bold hover:bg-[#EA580C] transition-colors shadow-sm"
              >
                Contact Us
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
