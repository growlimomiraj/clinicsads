import React from 'react';
import { CheckCircle2, BarChart3, ShieldCheck, MessageSquareHeart } from 'lucide-react';
import { PHOTO_ASSETS, WHY_CHOOSE_CONTENT, WhyChooseFeature } from '../data/siteContent';
import { ResilientPortrait } from './ResilientPortrait';

export const WhyChooseSection: React.FC = () => {
  const renderFeatureIcon = (iconName: WhyChooseFeature['iconName']) => {
    switch (iconName) {
      case 'check-circle':
        return <CheckCircle2 className="w-5 h-5 text-[#99BC44]" />;
      case 'bar-chart':
        return <BarChart3 className="w-5 h-5 text-[#99BC44]" />;
    }
  };

  return (
    <section
      id="why-clinicsads"
      className="relative bg-white py-16 lg:py-24 overflow-hidden"
    >
      <div className="max-w-[1060px] mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          {/* Left Column: 4 Circular Portrait Crops of Different Sizes */}
          <div className="lg:col-span-6 flex items-center justify-center">
            <div className="relative w-[320px] h-[340px] sm:w-[430px] sm:h-[430px]">
              {/* 1. Medium Portrait toward the Upper-Left */}
              <div className="absolute top-2 left-2 sm:top-3 sm:left-4 w-[155px] h-[155px] sm:w-[195px] sm:h-[195px] rounded-full bg-[#DFECC8] overflow-hidden shadow-[0_12px_28px_rgba(24,59,43,0.08)]">
                <ResilientPortrait
                  asset={PHOTO_ASSETS.collageTopLeft}
                  className="w-full h-full rounded-full"
                  fallbackBg="bg-[#DFECC8]"
                />
              </div>

              {/* Small White Caption Strip overlapping bottom of Upper-Left Portrait */}
              <div className="absolute top-[132px] sm:top-[164px] left-4 sm:left-7 z-20 bg-white/95 backdrop-blur-xs px-3.5 py-2 rounded-xl shadow-[0_8px_22px_rgba(24,59,43,0.09)] flex items-center gap-2.5 border border-[#F3F8E9]">
                <span className="w-6 h-6 rounded-full bg-[#F3F8E9] flex items-center justify-center text-[#99BC44] shrink-0">
                  <ShieldCheck className="w-3.5 h-3.5" />
                </span>
                <div className="leading-tight">
                  <p className="text-[11px] font-bold text-[#183B2B] whitespace-nowrap">
                    {WHY_CHOOSE_CONTENT.collageCaptions.topLeft.title}
                  </p>
                  <p className="text-[9.5px] text-[#59665D] whitespace-nowrap">
                    {WHY_CHOOSE_CONTENT.collageCaptions.topLeft.subtitle}
                  </p>
                </div>
              </div>

              {/* 2. Small Supporting Portrait near Upper-Center / Right */}
              <div className="absolute top-0 left-[175px] sm:left-[225px] w-[76px] h-[76px] sm:w-[92px] sm:h-[92px] rounded-full bg-[#F3F8E9] overflow-hidden shadow-[0_8px_20px_rgba(24,59,43,0.06)]">
                <ResilientPortrait
                  asset={PHOTO_ASSETS.collageTopRightSmall}
                  className="w-full h-full rounded-full"
                  fallbackBg="bg-[#F3F8E9]"
                />
              </div>

              {/* 3. Smaller Supporting Portrait toward Lower-Left */}
              <div className="absolute bottom-3 left-8 sm:bottom-4 sm:left-12 w-[112px] h-[112px] sm:w-[138px] sm:h-[138px] rounded-full bg-[#EBF3DF] overflow-hidden shadow-[0_10px_24px_rgba(24,59,43,0.07)]">
                <ResilientPortrait
                  asset={PHOTO_ASSETS.collageBottomLeftSmall}
                  className="w-full h-full rounded-full"
                  fallbackBg="bg-[#EBF3DF]"
                />
              </div>

              {/* 4. Larger Portrait near the Lower-Right side of the collage */}
              <div className="absolute top-[86px] right-1 sm:top-[102px] sm:right-2 w-[178px] h-[178px] sm:w-[228px] sm:h-[228px] rounded-full bg-[#C7DCA5] overflow-hidden shadow-[0_16px_36px_rgba(24,59,43,0.1)]">
                <ResilientPortrait
                  asset={PHOTO_ASSETS.collageBottomRightLarge}
                  className="w-full h-full rounded-full"
                  fallbackBg="bg-[#C7DCA5]"
                />
              </div>

              {/* Small White Caption Strip under Lower-Right Portrait */}
              <div className="absolute bottom-6 right-2 sm:bottom-9 sm:right-4 z-20 bg-white/95 backdrop-blur-xs px-3.5 py-2 rounded-xl shadow-[0_8px_24px_rgba(24,59,43,0.09)] flex items-center gap-2.5 border border-[#F3F8E9]">
                <span className="w-6 h-6 rounded-full bg-[#F3F8E9] flex items-center justify-center text-[#99BC44] shrink-0">
                  <MessageSquareHeart className="w-3.5 h-3.5" />
                </span>
                <div className="leading-tight">
                  <p className="text-[11px] font-bold text-[#183B2B] whitespace-nowrap">
                    {WHY_CHOOSE_CONTENT.collageCaptions.bottomRight.title}
                  </p>
                  <p className="text-[9.5px] text-[#59665D] whitespace-nowrap">
                    {WHY_CHOOSE_CONTENT.collageCaptions.bottomRight.subtitle}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Heading and Two Feature Rows */}
          <div className="lg:col-span-6 max-w-[460px] mx-auto lg:mx-0 lg:pl-6">
            <h2 className="text-[28px] sm:text-[34px] font-extrabold text-[#183B2B] leading-[1.22] tracking-tight mb-9">
              {WHY_CHOOSE_CONTENT.headingLines[0]}
              <br />
              {WHY_CHOOSE_CONTENT.headingLines[1]}
            </h2>

            <div className="space-y-7">
              {WHY_CHOOSE_CONTENT.features.map((feature) => (
                <div key={feature.id} className="flex items-start gap-4">
                  {/* Small dark rounded icon container */}
                  <div className="w-10 h-10 rounded-[12px] bg-[#183B2B] flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                    {renderFeatureIcon(feature.iconName)}
                  </div>

                  <div>
                    <h3 className="text-[17px] font-bold text-[#183B2B] mb-1.5 leading-snug">
                      {feature.title}
                    </h3>
                    <p className="text-[14.5px] text-[#59665D] leading-[1.65]">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
