import React from 'react';
import { HeartHandshake, Sparkles } from 'lucide-react';
import { ADDITIONAL_SOLUTIONS_CONTENT, SolutionCardData, PageRoute } from '../data/siteContent';

interface AdditionalSolutionsSectionProps {
  onSelectSolution: (solution: SolutionCardData) => void;
  onNavigate?: (route: PageRoute) => void;
}

export const AdditionalSolutionsSection: React.FC<AdditionalSolutionsSectionProps> = ({
  onSelectSolution,
  onNavigate,
}) => {
  const frontCard = ADDITIONAL_SOLUTIONS_CONTENT.cards[0];
  const backCard = ADDITIONAL_SOLUTIONS_CONTENT.cards[1];

  const handleOpenSolution = (solution: SolutionCardData) => {
    if (onNavigate) {
      onNavigate(solution.route);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      onSelectSolution(solution);
    }
  };

  return (
    <section
      id="solutions"
      className="relative bg-gradient-to-b from-white via-[#F9FCF4] to-white py-20 lg:py-28 overflow-hidden"
    >
      {/* Large flowing organic green shape extending toward the left edge of the page */}
      <div
        className="pointer-events-none select-none absolute top-1/2 -translate-y-1/2 -left-24 sm:-left-16 w-[380px] sm:w-[520px] lg:w-[580px] h-[360px] sm:h-[420px] rounded-r-[180px] rounded-tl-[120px] bg-gradient-to-br from-[#99BC44]/45 via-[#C7DCA5]/65 to-[#DFECC8]/50 z-0"
        aria-hidden="true"
      >
        {/* Smaller translucent shape layered within it */}
        <div className="absolute bottom-6 left-10 w-[260px] sm:w-[340px] h-[190px] sm:h-[220px] rounded-[110px] bg-white/25 rotate-[-8deg]" />
      </div>

      {/* Subtle soft right wave backdrop */}
      <div
        className="pointer-events-none select-none absolute bottom-0 right-0 w-[45%] h-[180px] bg-[#F3F8E9]/60 rounded-tl-[120px] z-0"
        aria-hidden="true"
      />

      <div className="max-w-[1060px] mx-auto px-5 sm:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-6 items-center">
          {/* Left Column: Heading and Paragraph placed inside the organic shape */}
          <div className="lg:col-span-5 max-w-[360px] py-6">
            <h2 className="text-[30px] sm:text-[36px] font-extrabold text-[#183B2B] leading-[1.2] tracking-tight mb-4">
              {ADDITIONAL_SOLUTIONS_CONTENT.headingLines[0]}
              <br />
              {ADDITIONAL_SOLUTIONS_CONTENT.headingLines[1]}
            </h2>
            <p className="text-[14.5px] sm:text-[15px] text-[#183B2B]/85 leading-[1.7] font-medium">
              {ADDITIONAL_SOLUTIONS_CONTENT.description}
            </p>
          </div>

          {/* Right Column: Two Tall Vertical Cards in Overlapping Arrangement */}
          <div className="lg:col-span-7 relative flex flex-col sm:flex-row items-center justify-center lg:justify-end pt-4">
            {/* Decorative floating dots above the right card matching reference */}
            <div
              className="hidden sm:flex items-center gap-8 absolute -top-4 right-14 pointer-events-none"
              aria-hidden="true"
            >
              <span className="w-3 h-3 rounded-full bg-[#183B2B]/75 translate-y-2" />
              <span className="w-4 h-4 rounded-full bg-[#99BC44]/75 -translate-y-1" />
            </div>

            {/* Card 1: Front Larger Green Vertical Card */}
            <div className="relative z-20 w-full max-w-[300px] sm:w-[285px] min-h-[380px] rounded-[24px] bg-gradient-to-b from-[#99BC44] to-[#84A832] p-7 sm:p-8 text-center flex flex-col items-center justify-between shadow-[0_20px_45px_rgba(132,168,50,0.3)] overflow-hidden">
              {/* Subtle diagonal sheen inside front card */}
              <div
                className="pointer-events-none absolute -top-10 -right-10 w-36 h-72 bg-white/15 rotate-25"
                aria-hidden="true"
              />

              <div className="relative z-10 flex flex-col items-center">
                <h3 className="text-[18px] font-bold text-[#183B2B] mb-6">
                  {frontCard.title}
                </h3>

                {/* White rounded icon container */}
                <div className="w-14 h-14 rounded-[18px] bg-white shadow-sm flex items-center justify-center mb-6">
                  <HeartHandshake className="w-7 h-7 text-[#99BC44]" />
                </div>

                <p className="text-[13.5px] text-[#183B2B]/90 font-medium leading-[1.65] px-1">
                  {frontCard.description}
                </p>
              </div>

              <div className="relative z-10 pt-7 w-full flex justify-center">
                <button
                  type="button"
                  onClick={() => handleOpenSolution(frontCard)}
                  className="px-8 py-2.5 rounded-full bg-white text-[#183B2B] text-[13px] font-bold hover:bg-[#F3F8E9] transition-colors shadow-sm cursor-pointer whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#183B2B]"
                >
                  {frontCard.buttonLabel}
                </button>
              </div>
            </div>

            {/* Card 2: Second White Vertical Card slightly behind and offset to the right */}
            <div className="relative z-10 w-full max-w-[300px] sm:w-[250px] min-h-[330px] rounded-[24px] bg-white p-6 sm:p-7 text-center flex flex-col items-center justify-between shadow-[0_18px_45px_rgba(24,59,43,0.08)] border border-[#F3F8E9] mt-6 sm:mt-0 sm:-ml-5 sm:pl-9">
              <div className="flex flex-col items-center">
                <h3 className="text-[16.5px] font-bold text-[#183B2B] mb-5">
                  {backCard.title}
                </h3>

                {/* Dark green rounded icon container */}
                <div className="w-12 h-12 rounded-[16px] bg-[#183B2B] shadow-xs flex items-center justify-center mb-5">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>

                <p className="text-[12.5px] text-[#59665D] leading-[1.65]">
                  {backCard.description}
                </p>
              </div>

              <div className="pt-6 w-full flex justify-center">
                <button
                  type="button"
                  onClick={() => handleOpenSolution(backCard)}
                  className="px-7 py-2.5 rounded-full bg-[#99BC44] text-white text-[12.5px] font-bold hover:bg-[#88a93a] transition-colors shadow-xs cursor-pointer whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#99BC44]"
                >
                  {backCard.buttonLabel}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
