import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { NAV_ITEMS, PageRoute } from '../data/siteContent';
import { BrandWordmark } from './BrandWordmark';

interface HeaderProps {
  currentPage: PageRoute;
  onNavigate: (route: PageRoute) => void;
  onOpenInquiry: (defaultService?: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentPage,
  onNavigate,
  onOpenInquiry,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isNavItemActive = (itemRoute: PageRoute) => {
    if (currentPage === itemRoute) return true;
    if (
      itemRoute === 'services' &&
      currentPage.startsWith('service-')
    ) {
      return true;
    }
    if (
      itemRoute === 'solutions' &&
      currentPage.startsWith('solution-')
    ) {
      return true;
    }
    return false;
  };

  const handleRouteSelect = (route: PageRoute) => {
    setMobileMenuOpen(false);
    onNavigate(route);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="relative z-30 w-full pt-6 pb-3">
      <div className="max-w-[1180px] mx-auto px-5 sm:px-8 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark */}
        <BrandWordmark variant="dark" onNavigate={onNavigate} />

        {/* Zone 2 & 3 aligned toward the right as in the reference screenshot */}
        <div className="hidden md:flex items-center gap-9">
          <nav aria-label="Main Navigation" className="flex items-center gap-8">
            <button
              type="button"
              onClick={() => handleRouteSelect('home')}
              className={`text-[14px] font-medium transition-colors whitespace-nowrap shrink-0 py-1 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#99BC44] rounded ${
                currentPage === 'home'
                  ? 'text-[#183B2B] font-bold underline decoration-[#99BC44] decoration-2 underline-offset-8'
                  : 'text-[#183B2B]/80 hover:text-[#183B2B]'
              }`}
            >
              Home
            </button>
            {NAV_ITEMS.map((item) => {
              const active = isNavItemActive(item.route);
              return (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => handleRouteSelect(item.route)}
                  className={`text-[14px] font-medium transition-colors whitespace-nowrap shrink-0 py-1 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#99BC44] rounded ${
                    active
                      ? 'text-[#183B2B] font-bold underline decoration-[#99BC44] decoration-2 underline-offset-8'
                      : 'text-[#183B2B]/80 hover:text-[#183B2B]'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          <button
            type="button"
            onClick={() => onOpenInquiry()}
            className="px-6 py-2.5 rounded-full bg-[#183B2B] text-white text-[13px] font-semibold tracking-wide hover:bg-[#224f3a] transition-colors shadow-sm whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#99BC44]"
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
            className="w-11 h-11 rounded-full bg-white/80 border border-[#C7DCA5] flex items-center justify-center text-[#183B2B] shadow-xs focus-visible:outline-2 focus-visible:outline-[#99BC44]"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-[#F3F8E9] border-b border-[#C7DCA5]/60 shadow-lg px-6 py-5 z-40">
          <nav aria-label="Mobile Navigation" className="flex flex-col space-y-2.5">
            <button
              type="button"
              onClick={() => handleRouteSelect('home')}
              className={`text-left text-[15px] py-2 border-b border-[#C7DCA5]/30 ${
                currentPage === 'home'
                  ? 'font-bold text-[#183B2B]'
                  : 'font-medium text-[#183B2B]/80'
              }`}
            >
              Home
            </button>
            {NAV_ITEMS.map((item) => {
              const active = isNavItemActive(item.route);
              return (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => handleRouteSelect(item.route)}
                  className={`text-left text-[15px] py-2 border-b border-[#C7DCA5]/30 ${
                    active
                      ? 'font-bold text-[#183B2B]'
                      : 'font-medium text-[#183B2B]/80'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
            <div className="pt-2">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenInquiry();
                }}
                className="w-full py-3 rounded-full bg-[#183B2B] text-white text-[14px] font-semibold shadow-sm"
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
