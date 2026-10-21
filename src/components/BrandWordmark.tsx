import React from 'react';
import { PageRoute } from '../data/siteContent';

interface BrandWordmarkProps {
  variant?: 'dark' | 'light';
  className?: string;
  onNavigate?: (route: PageRoute) => void;
}

export const BrandWordmark: React.FC<BrandWordmarkProps> = ({
  variant = 'dark',
  className = '',
  onNavigate,
}) => {
  const isLight = variant === 'light';

  const handleClick = (e: React.MouseEvent) => {
    if (onNavigate) {
      e.preventDefault();
      onNavigate('home');
      if (typeof window !== 'undefined' && window.location.pathname !== '/') {
        window.history.pushState(null, '', '/');
        window.dispatchEvent(new PopStateEvent('popstate'));
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <a
      href="/"
      onClick={handleClick}
      className={`inline-flex items-center gap-2.5 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#99BC44] rounded-lg transition-opacity hover:opacity-90 ${className}`}
      aria-label="ClinicsAds Home"
    >
      {/* Circular emblem echoing the Cakap icon geometry in brand green */}
      <span className="w-9 h-9 rounded-full bg-[#99BC44] flex items-center justify-center shadow-sm shrink-0">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          className="w-5 h-5 text-white"
          aria-hidden="true"
        >
          <path
            d="M15.5 7.5C14.3 6.3 12.5 5.8 10.6 6.2C7.8 6.8 5.8 9.4 6 12.3C6.2 15.4 8.8 17.8 12 17.8C13.8 17.8 15.4 17 16.5 15.7"
            stroke="currentColor"
            strokeWidth="2.8"
            strokeLinecap="round"
          />
          <circle cx="14.5" cy="12" r="2" fill="currentColor" />
        </svg>
      </span>
      <span
        className={`text-[22px] font-extrabold tracking-tight leading-none ${
          isLight ? 'text-white' : 'text-[#183B2B]'
        }`}
      >
        Clinics<span className="text-[#99BC44]">Ads</span>
      </span>
    </a>
  );
};
