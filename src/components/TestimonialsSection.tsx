import React, { useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { PHOTO_ASSETS, SITE_CONFIG, TESTIMONIALS_CONTENT } from '../data/siteContent';
import { ResilientPortrait } from './ResilientPortrait';

export const TestimonialsSection: React.FC = () => {
  // Filter items based on approval state or preview setting
  const approvedItems = TESTIMONIALS_CONTENT.items.filter((item) => item.approved);
  const visibleItems =
    approvedItems.length > 0
      ? approvedItems
      : SITE_CONFIG.showUnapprovedTestimonialsInPreview
      ? TESTIMONIALS_CONTENT.items
      : [];

  const [currentIndex, setCurrentIndex] = useState(0);

  if (visibleItems.length === 0) {
    return null;
  }

  const activeItem = visibleItems[currentIndex] || visibleItems[0];
  const hasMultiple = visibleItems.length > 1;

  const handlePrev = () => {
    if (!hasMultiple) return;
    setCurrentIndex((prev) => (prev === 0 ? visibleItems.length - 1 : prev - 1));
  };

  const handleNext = () => {
    if (!hasMultiple) return;
    setCurrentIndex((prev) => (prev === visibleItems.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="relative bg-white pt-16 pb-24 lg:pt-20 lg:pb-32">
      <div className="max-w-[960px] mx-auto px-5 sm:px-10">
        {/* Centered Heading and Short Supporting Line */}
        <div className="text-center max-w-[540px] mx-auto mb-12 lg:mb-14">
          <h2 className="text-[28px] sm:text-[34px] font-extrabold text-[#183B2B] tracking-tight mb-3">
            {TESTIMONIALS_CONTENT.heading}
          </h2>
          <p className="text-[14px] sm:text-[14.5px] text-[#59665D] leading-[1.65]">
            {TESTIMONIALS_CONTENT.supportingLine}
          </p>
        </div>

        {/* Large Horizontal White Testimonial Card with Overlapping Previous/Next Controls */}
        <div className="relative max-w-[840px] mx-auto">
          {/* Previous Control overlapping left card edge */}
          <button
            type="button"
            onClick={handlePrev}
            disabled={!hasMultiple}
            aria-label="Previous testimonial"
            title={
              hasMultiple
                ? 'Previous client testimonial'
                : 'Additional controls activate when multiple approved testimonials are added'
            }
            className={`absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 sm:-translate-x-6 z-20 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white text-[#59665D] shadow-[0_8px_24px_rgba(24,59,43,0.1)] border border-[#F3F8E9] flex items-center justify-center transition-all focus-visible:outline-2 focus-visible:outline-[#F97316] ${
              hasMultiple
                ? 'hover:bg-[#F3F8E9] hover:text-[#183B2B] cursor-pointer'
                : 'opacity-75 cursor-default'
            }`}
          >
            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>

          {/* Next Control overlapping right card edge */}
          <button
            type="button"
            onClick={handleNext}
            disabled={!hasMultiple}
            aria-label="Next testimonial"
            title={
              hasMultiple
                ? 'Next client testimonial'
                : 'Additional controls activate when multiple approved testimonials are added'
            }
            className={`absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 sm:translate-x-6 z-20 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#F97316] text-white shadow-[0_10px_25px_rgba(249,115,22,0.35)] flex items-center justify-center transition-all focus-visible:outline-2 focus-visible:outline-[#EA580C] ${
              hasMultiple
                ? 'hover:bg-[#EA580C] cursor-pointer'
                : 'opacity-90 cursor-default'
            }`}
          >
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>

          {/* Main Horizontal Testimonial Card */}
          <div className="bg-white rounded-[24px] p-5 sm:p-6 shadow-[0_20px_60px_rgba(24,59,43,0.08)] border border-[#F3F8E9]/80">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 items-center">
              {/* Portrait occupying the left portion */}
              <div className="md:col-span-5 relative">
                <div className="relative rounded-[18px] overflow-hidden bg-[#ECECEC] aspect-[5/6] max-h-[300px] md:max-h-none mx-auto">
                  <ResilientPortrait
                    asset={PHOTO_ASSETS.testimonialPlaceholder}
                    className="w-full h-full"
                    fallbackBg="bg-[#E5ECE8]"
                  />

                  {/* Explicit Placeholder Label Overlay when item is not yet an approved live quote */}
                  {!activeItem.approved && (
                    <div className="absolute bottom-3 left-3 right-3 bg-[#183B2B]/90 backdrop-blur-xs text-white text-[11px] font-medium px-3 py-1.5 rounded-lg text-center">
                      Portrait Placeholder · Preview Mode
                    </div>
                  )}
                </div>
              </div>

              {/* Quote Content on the right */}
              <div className="md:col-span-7 flex flex-col items-center text-center px-2 sm:px-6 py-4">
                {/* Quotation-mark accent above the quote */}
                <div className="mb-4 text-[#99BC44]" aria-hidden="true">
                  <svg
                    width="32"
                    height="26"
                    viewBox="0 0 32 26"
                    fill="currentColor"
                  >
                    <path d="M0 15.2C0 7.4 4.6 2.1 12.2 0L13.8 3.4C8.8 5.2 6.6 8.3 6.3 12.2H12.6V25.2H0V15.2ZM18.2 15.2C18.2 7.4 22.8 2.1 30.4 0L32 3.4C27 5.2 24.8 8.3 24.5 12.2H30.8V25.2H18.2V15.2Z" />
                  </svg>
                </div>

                {!activeItem.approved && (
                  <span className="text-[11px] font-semibold tracking-wide text-[#7A9A2E] mb-2">
                    Preview Placeholder — Awaiting Approved Client Quote
                  </span>
                )}

                <blockquote className="text-[16px] sm:text-[17.5px] font-semibold text-[#183B2B] leading-[1.65] mb-6 max-w-[400px]">
                  “{activeItem.quote}”
                </blockquote>

                <div>
                  <p className="text-[13.5px] font-bold text-[#183B2B]">
                    {activeItem.authorName}
                  </p>
                  <p className="text-[12px] text-[#59665D] mt-0.5">
                    {activeItem.authorRole}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
