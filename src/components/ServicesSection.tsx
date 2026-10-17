import React from 'react';
import { Search, Users, Layout, Activity, Bot, TrendingUp } from 'lucide-react';
import { SERVICES_CONTENT, ServiceCardData, PageRoute } from '../data/siteContent';

interface ServicesSectionProps {
  onSelectService: (service: ServiceCardData) => void;
  onNavigate?: (route: PageRoute) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  onSelectService,
  onNavigate,
}) => {
  const renderIcon = (iconName: ServiceCardData['iconName']) => {
    const iconProps = {
      className: 'w-5 h-5 text-[#99BC44]',
    };
    switch (iconName) {
      case 'search':
        return <Search {...iconProps} />;
      case 'users':
        return <Users {...iconProps} />;
      case 'layout':
        return <Layout {...iconProps} />;
      case 'activity':
        return <Activity {...iconProps} />;
      case 'bot':
        return <Bot {...iconProps} />;
      case 'trending-up':
        return <TrendingUp {...iconProps} />;
    }
  };

  const handleCardAction = (card: ServiceCardData) => {
    if (onNavigate) {
      onNavigate(card.route);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      onSelectService(card);
    }
  };

  return (
    <section
      id="services"
      className="relative bg-white pt-10 pb-24 lg:pt-14 lg:pb-32 overflow-hidden"
    >
      {/* Large organic soft green shape behind the right side of the grid matching screenshot */}
      <div
        className="pointer-events-none select-none absolute top-[18%] -right-24 sm:-right-16 w-[340px] sm:w-[500px] lg:w-[580px] h-[360px] sm:h-[440px] rounded-[70px] bg-gradient-to-bl from-[#C7DCA5]/75 via-[#DFECC8]/65 to-[#F3F8E9]/40 -rotate-[18deg] z-0"
        aria-hidden="true"
      />

      <div className="max-w-[1080px] mx-auto px-5 sm:px-8 relative z-10">
        {/* Centered Section Heading */}
        <div className="text-center mb-12 lg:mb-14">
          <h2 className="text-[28px] sm:text-[34px] font-extrabold text-[#183B2B] tracking-tight">
            {SERVICES_CONTENT.heading}
          </h2>
        </div>

        {/* 6-Card, Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7">
          {SERVICES_CONTENT.cards.map((card) => {
            const isFeatured = Boolean(card.featured);

            return (
              <div
                key={card.id}
                onClick={() => handleCardAction(card)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleCardAction(card);
                  }
                }}
                role="button"
                tabIndex={0}
                aria-label={`${card.title} — Open service page`}
                className={`group relative rounded-[20px] p-7 sm:p-8 transition-all duration-200 cursor-pointer text-left overflow-hidden focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#183B2B] ${
                  isFeatured
                    ? 'bg-gradient-to-br from-[#A6C653] to-[#8EB13B] text-[#183B2B] shadow-[0_16px_38px_rgba(153,188,68,0.28)] hover:shadow-[0_20px_44px_rgba(153,188,68,0.36)]'
                    : 'bg-white text-[#183B2B] shadow-[0_12px_35px_rgba(24,59,43,0.06)] hover:shadow-[0_16px_42px_rgba(24,59,43,0.1)] border border-[#F3F8E9]'
                }`}
              >
                {/* Subtle diagonal glossy highlight inside the first card (matching Cakap Private card) */}
                {isFeatured && (
                  <div
                    className="pointer-events-none absolute -top-12 right-8 w-36 h-64 bg-white/15 rotate-25 blur-[1px]"
                    aria-hidden="true"
                  />
                )}

                <div className="relative z-10 flex items-start gap-5">
                  {/* Small rounded icon container on the left */}
                  <div
                    className={`w-12 h-12 rounded-[14px] flex items-center justify-center shrink-0 mt-0.5 shadow-xs ${
                      isFeatured ? 'bg-white' : 'bg-[#183B2B]'
                    }`}
                  >
                    {renderIcon(card.iconName)}
                  </div>

                  {/* Card Title and Short Description on the right */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-[18px] font-bold text-[#183B2B] mb-2 leading-snug group-hover:underline decoration-[#183B2B]/40 underline-offset-4">
                      {card.title}
                    </h3>
                    <p
                      className={`text-[14px] leading-[1.65] ${
                        isFeatured ? 'text-[#183B2B]/90 font-medium' : 'text-[#59665D]'
                      }`}
                    >
                      {card.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
