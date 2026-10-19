import React, { useState } from 'react';
import {
  GoogleAdsLogo,
  MetaLogo,
  GptLogo,
  LandingPagesLogo,
  GoogleAnalyticsLogo,
  GoogleSearchConsoleLogo,
} from './BrandLogos';
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Layers,
  HelpCircle,
  Phone,
  Mail,
  MapPin,
  Clock,
  CheckCircle2,
  Info,
  Sparkles,
  Search,
  Users,
  Layout,
  Activity,
  HeartHandshake,
  ShieldCheck,
  Bot,
  TrendingUp,
} from 'lucide-react';
import { addInquiry } from '../data/inquiriesStore';
import {
  ADDITIONAL_SOLUTIONS_CONTENT,
  PageRoute,
  SERVICES_CONTENT,
  SITE_CONFIG,
  ServiceCardData,
  SolutionCardData,
} from '../data/siteContent';
import { ServicesSection } from './ServicesSection';
import { WhyChooseSection } from './WhyChooseSection';
import { AdditionalSolutionsSection } from './AdditionalSolutionsSection';
import { TestimonialsSection } from './TestimonialsSection';

interface SubpageViewsProps {
  currentPage: PageRoute;
  onNavigate: (route: PageRoute) => void;
  onOpenInquiry: (defaultService?: string) => void;
  onSelectServiceModal: (service: ServiceCardData) => void;
  onSelectSolutionModal: (solution: SolutionCardData) => void;
}

export const SubpageViews: React.FC<SubpageViewsProps> = ({
  currentPage,
  onNavigate,
  onOpenInquiry,
  onSelectServiceModal,
  onSelectSolutionModal,
}) => {
  // Contact page inline form state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [clinicName, setClinicName] = useState('');
  const [website, setWebsite] = useState('');
  const [service, setService] = useState('Google Ads');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [contactSubmitted, setContactSubmitted] = useState(false);

  const goHome = () => {
    onNavigate('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Helper Banner for all subpages with pale green #F3F8E9 header & bottom wave
  const renderPageHeroBanner = (
    kicker: string,
    title: string,
    subtitle: string,
    primaryCtaLabel?: string,
    primaryCtaService?: string
  ) => (
    <div className="relative bg-[#F3F8E9] pt-6 pb-20 lg:pt-10 lg:pb-28 overflow-hidden">
      <div
        className="pointer-events-none select-none absolute -top-24 -right-24 w-[360px] h-[360px] rounded-full border-[40px] border-[#E4F0D0]/60 opacity-70"
        aria-hidden="true"
      />
      <div className="max-w-[1060px] mx-auto px-5 sm:px-8 relative z-10">
        {/* Breadcrumb back to Home */}
        <div className="flex items-center gap-2 text-[13px] font-medium text-[#59665D] mb-6">
          <button
            type="button"
            onClick={goHome}
            className="inline-flex items-center gap-1.5 text-[#183B2B] hover:text-[#7A9A2E] font-semibold transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </button>
          <span>/</span>
          <span className="text-[#7A9A2E] font-semibold">{kicker}</span>
        </div>

        <div className="max-w-[720px]">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white shadow-xs mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#7A9A2E]" />
            <span className="text-[12px] font-semibold text-[#7A9A2E]">
              {kicker}
            </span>
          </div>
          <h1 className="text-[32px] sm:text-[42px] font-extrabold text-[#183B2B] leading-[1.18] tracking-tight mb-4">
            {title}
          </h1>
          <p className="text-[15.5px] sm:text-[16.5px] text-[#59665D] leading-[1.7] mb-7">
            {subtitle}
          </p>

          {primaryCtaLabel && (
            <div className="flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={() => onOpenInquiry(primaryCtaService)}
                className="px-7 py-3 rounded-full bg-[#F97316] text-white text-[14px] font-bold hover:bg-[#EA580C] transition-colors shadow-[0_6px_20px_rgba(249,115,22,0.35)] cursor-pointer"
              >
                {primaryCtaLabel}
              </button>
              <a
                href={SITE_CONFIG.contact.phoneHref}
                className="px-6 py-3 rounded-full bg-white text-[#183B2B] border border-[#C7DCA5] text-[13.5px] font-semibold hover:bg-[#DFECC8]/50 transition-colors"
              >
                Call {SITE_CONFIG.contact.phoneDisplay}
              </a>
            </div>
          )}
        </div>
      </div>

      {/* Wave bottom transition */}
      <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden leading-none pointer-events-none">
        <svg
          viewBox="0 0 1440 90"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-[45px] sm:h-[70px]"
          preserveAspectRatio="none"
        >
          <path
            d="M0 20C320 90 720 85 1080 35C1260 10 1370 15 1440 35V90H0V20Z"
            fill="#FFFFFF"
          />
        </svg>
      </div>
    </div>
  );

  // 1. Dedicated Individual Service Detail Page (Google Ads, Meta Ads, Landing Pages, Tracking & Follow-Up)
  if (currentPage.startsWith('service-')) {
    const serviceData =
      SERVICES_CONTENT.cards.find((c) => c.route === currentPage) ||
      SERVICES_CONTENT.cards[0];

    const renderServiceHeroIcon = (iconName: ServiceCardData['iconName']) => {
      switch (iconName) {
        case 'google-ads':
        case 'google':
        case 'search':
          return <GoogleAdsLogo className="w-6 h-6" />;
        case 'meta':
        case 'users':
          return <MetaLogo className="w-6 h-6" />;
        case 'landing-pages':
        case 'layout':
          return <LandingPagesLogo className="w-6 h-6" />;
        case 'analytics':
        case 'activity':
          return <GoogleAnalyticsLogo className="w-6 h-6" />;
        case 'gpt':
        case 'bot':
          return <GptLogo className="w-6 h-6" />;
        case 'seo':
        case 'trending-up':
          return <GoogleSearchConsoleLogo className="w-6 h-6" />;
        default:
          return <GoogleAdsLogo className="w-6 h-6" />;
      }
    };

    const getServiceHeroTileClass = (_iconName?: ServiceCardData['iconName']) => {
      return 'bg-white shadow-[0_4px_12px_rgba(0,0,0,0.06)] border border-[#DFECC8]';
    };

    return (
      <div>
        {renderPageHeroBanner(
          'Core Clinic Marketing Service',
          serviceData.title,
          serviceData.details.tagline,
          `Book a ${serviceData.title} Call`,
          serviceData.title
        )}

        <section className="py-12 lg:py-16 bg-white">
          <div className="max-w-[1060px] mx-auto px-5 sm:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
              {/* Left 7 Cols: Overview, Deliverables, 4-Step Methodology, FAQ */}
              <div className="lg:col-span-7 space-y-8">
                <div className="rounded-[24px] bg-white p-7 sm:p-8 shadow-[0_14px_40px_rgba(24,59,43,0.06)] border border-[#F3F8E9]">
                  <div className="flex items-center gap-3.5 mb-4">
                    <div
                      className={`w-12 h-12 rounded-[14px] flex items-center justify-center shrink-0 ${getServiceHeroTileClass(
                        serviceData.iconName
                      )}`}
                    >
                      {renderServiceHeroIcon(serviceData.iconName)}
                    </div>
                    <div>
                      <span className="text-[12px] font-bold text-[#7A9A2E]">
                        Service Overview
                      </span>
                      <h2 className="text-[22px] font-extrabold text-[#183B2B]">
                        How {serviceData.title} Grows Your Clinic
                      </h2>
                    </div>
                  </div>
                  <p className="text-[15px] text-[#59665D] leading-[1.75]">
                    {serviceData.details.overview}
                  </p>
                </div>

                {/* Deliverables */}
                <div className="rounded-[24px] bg-[#F3F8E9] p-7 sm:p-8 border border-[#DFECC8]">
                  <h3 className="text-[19px] font-extrabold text-[#183B2B] mb-5">
                    What Is Included in Every Campaign
                  </h3>
                  <ul className="space-y-3.5">
                    {serviceData.details.deliverables.map((item, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-3 text-[14.5px] text-[#183B2B]"
                      >
                        <span className="w-5 h-5 rounded-full bg-[#99BC44] text-white flex items-center justify-center shrink-0 mt-0.5">
                          <Check className="w-3.5 h-3.5" />
                        </span>
                        <span className="leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* 4-Step Execution Framework */}
                <div className="rounded-[24px] bg-white p-7 sm:p-8 shadow-[0_14px_40px_rgba(24,59,43,0.06)] border border-[#E7F0D8]">
                  <div className="flex items-center gap-2.5 mb-4">
                    <Layers className="w-5 h-5 text-[#7A9A2E]" />
                    <h3 className="text-[19px] font-extrabold text-[#183B2B]">
                      4-Step Execution Framework
                    </h3>
                  </div>
                  <p className="text-[13.5px] text-[#59665D] mb-5">
                    Powered by our proven healthcare growth methodology:
                  </p>
                  <div className="space-y-3">
                    {serviceData.details.methodology.map((step, idx) => (
                      <div
                        key={idx}
                        className="p-4 rounded-xl bg-[#F9FCF4] border border-[#E7F0D8] text-[14px] text-[#183B2B] font-medium"
                      >
                        {step}
                      </div>
                    ))}
                  </div>
                </div>

                {/* FAQs */}
                <div className="rounded-[24px] bg-white p-7 sm:p-8 shadow-[0_14px_40px_rgba(24,59,43,0.06)] border border-[#F3F8E9]">
                  <div className="flex items-center gap-2.5 mb-5">
                    <HelpCircle className="w-5 h-5 text-[#7A9A2E]" />
                    <h3 className="text-[19px] font-extrabold text-[#183B2B]">
                      Frequently Asked Questions
                    </h3>
                  </div>
                  <div className="space-y-5">
                    {serviceData.details.faq.map((faqItem, idx) => (
                      <div
                        key={idx}
                        className="pb-5 border-b border-[#F3F8E9] last:border-none last:pb-0"
                      >
                        <h4 className="text-[15px] font-bold text-[#183B2B] mb-1.5">
                          {faqItem.question}
                        </h4>
                        <p className="text-[14px] text-[#59665D] leading-relaxed">
                          {faqItem.answer}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right 5 Cols: Ideal For Card + Switch Between Other Services */}
              <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-8">
                <div className="rounded-[24px] bg-gradient-to-br from-[#99BC44] to-[#84A832] p-7 text-[#183B2B] shadow-[0_18px_40px_rgba(132,168,50,0.25)]">
                  <span className="text-[11.5px] font-bold uppercase tracking-wider text-[#183B2B]/80">
                    Best Fit Clinics
                  </span>
                  <h3 className="text-[20px] font-extrabold text-[#183B2B] mt-1 mb-3">
                    Who Is {serviceData.title} Built For?
                  </h3>
                  <p className="text-[14px] text-[#183B2B]/90 font-medium leading-relaxed mb-6">
                    {serviceData.details.idealFor}
                  </p>
                  <button
                    type="button"
                    onClick={() => onOpenInquiry(serviceData.title)}
                    className="w-full py-3 rounded-full bg-[#F97316] text-white text-[13.5px] font-bold hover:bg-[#EA580C] shadow-[0_4px_14px_rgba(249,115,22,0.3)] transition-colors cursor-pointer"
                  >
                    Request a Free Clinic Audit
                  </button>
                </div>

                {/* Explore Other Clinic Services */}
                <div className="rounded-[24px] bg-white p-6 shadow-[0_12px_32px_rgba(24,59,43,0.06)] border border-[#F3F8E9]">
                  <h3 className="text-[15px] font-bold text-[#183B2B] mb-3.5">
                    All Clinic Marketing Services
                  </h3>
                  <div className="space-y-2">
                    {SERVICES_CONTENT.cards.map((c) => {
                      const isCurrent = c.route === currentPage;
                      return (
                        <button
                          key={c.id}
                          type="button"
                          onClick={() => {
                            onNavigate(c.route);
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                          }}
                          className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-left text-[13.5px] font-semibold transition-colors cursor-pointer ${
                            isCurrent
                              ? 'bg-[#F3F8E9] text-[#183B2B] border border-[#99BC44]'
                              : 'hover:bg-[#F3F8E9]/60 text-[#59665D] hover:text-[#183B2B]'
                          }`}
                        >
                          <span>{c.title}</span>
                          <ArrowRight className="w-4 h-4 text-[#7A9A2E]" />
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Additional Solutions Links */}
                <div className="rounded-[24px] bg-[#F9FCF4] p-6 border border-[#E7F0D8]">
                  <h3 className="text-[15px] font-bold text-[#183B2B] mb-3">
                    Additional Growth Solutions
                  </h3>
                  <div className="space-y-2">
                    {ADDITIONAL_SOLUTIONS_CONTENT.cards.map((sol) => (
                      <button
                        key={sol.id}
                        type="button"
                        onClick={() => {
                          onNavigate(sol.route);
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className="w-full flex items-center justify-between px-4 py-2.5 rounded-xl bg-white hover:bg-[#F3F8E9] text-left text-[13px] font-semibold text-[#183B2B] border border-[#E7F0D8] transition-colors cursor-pointer"
                      >
                        <span>{sol.title}</span>
                        <ArrowRight className="w-4 h-4 text-[#7A9A2E]" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  // 2. Dedicated Individual Solution Page (Clinic Landing Pages, ChatGPT Ads & AI Search)
  if (currentPage.startsWith('solution-')) {
    const solutionData =
      ADDITIONAL_SOLUTIONS_CONTENT.cards.find((s) => s.route === currentPage) ||
      ADDITIONAL_SOLUTIONS_CONTENT.cards[0];

    return (
      <div>
        {renderPageHeroBanner(
          'Additional Clinic Growth Solution',
          solutionData.title,
          solutionData.modalDetails.subtitle,
          `Discuss ${solutionData.title}`,
          solutionData.title
        )}

        <section className="py-12 lg:py-16 bg-white">
          <div className="max-w-[1060px] mx-auto px-5 sm:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
              <div className="lg:col-span-7 space-y-8">
                <div className="rounded-[24px] bg-white p-7 sm:p-8 shadow-[0_14px_40px_rgba(24,59,43,0.06)] border border-[#F3F8E9]">
                  <div className="flex items-center gap-3.5 mb-4">
                    <div className="w-12 h-12 rounded-[14px] bg-[#183B2B] flex items-center justify-center shrink-0">
                      {solutionData.iconName === 'heart-handshake' ? (
                        <HeartHandshake className="w-6 h-6 text-[#99BC44]" />
                      ) : (
                        <Sparkles className="w-6 h-6 text-[#99BC44]" />
                      )}
                    </div>
                    <div>
                      <span className="text-[12px] font-bold text-[#7A9A2E]">
                        Solution Overview
                      </span>
                      <h2 className="text-[22px] font-extrabold text-[#183B2B]">
                        {solutionData.title}
                      </h2>
                    </div>
                  </div>
                  <p className="text-[15px] text-[#59665D] leading-[1.75]">
                    {solutionData.modalDetails.summary}
                  </p>
                </div>

                {/* Key Capabilities */}
                <div className="rounded-[24px] bg-[#F3F8E9] p-7 sm:p-8 border border-[#DFECC8]">
                  <h3 className="text-[19px] font-extrabold text-[#183B2B] mb-5">
                    Key Capabilities &amp; Deliverables
                  </h3>
                  <ul className="space-y-3.5">
                    {solutionData.modalDetails.keyPoints.map((pt, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-3 text-[14.5px] text-[#183B2B]"
                      >
                        <span className="w-5 h-5 rounded-full bg-[#99BC44] text-white flex items-center justify-center shrink-0 mt-0.5">
                          <Check className="w-3.5 h-3.5" />
                        </span>
                        <span className="leading-relaxed">{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* 4-Step Implementation */}
                <div className="rounded-[24px] bg-white p-7 sm:p-8 shadow-[0_14px_40px_rgba(24,59,43,0.06)] border border-[#E7F0D8]">
                  <div className="flex items-center gap-2.5 mb-4">
                    <Layers className="w-5 h-5 text-[#7A9A2E]" />
                    <h3 className="text-[19px] font-extrabold text-[#183B2B]">
                      How We Implement {solutionData.title}
                    </h3>
                  </div>
                  <div className="space-y-3">
                    {solutionData.modalDetails.methodology.map((step, idx) => (
                      <div
                        key={idx}
                        className="p-4 rounded-xl bg-[#F9FCF4] border border-[#E7F0D8] text-[14px] text-[#183B2B] font-medium"
                      >
                        {step}
                      </div>
                    ))}
                  </div>
                </div>

                {/* FAQs */}
                <div className="rounded-[24px] bg-white p-7 sm:p-8 shadow-[0_14px_40px_rgba(24,59,43,0.06)] border border-[#F3F8E9]">
                  <div className="flex items-center gap-2.5 mb-5">
                    <HelpCircle className="w-5 h-5 text-[#7A9A2E]" />
                    <h3 className="text-[19px] font-extrabold text-[#183B2B]">
                      Frequently Asked Questions
                    </h3>
                  </div>
                  <div className="space-y-5">
                    {solutionData.modalDetails.faq.map((faqItem, idx) => (
                      <div
                        key={idx}
                        className="pb-5 border-b border-[#F3F8E9] last:border-none last:pb-0"
                      >
                        <h4 className="text-[15px] font-bold text-[#183B2B] mb-1.5">
                          {faqItem.question}
                        </h4>
                        <p className="text-[14px] text-[#59665D] leading-relaxed">
                          {faqItem.answer}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right 5 Cols */}
              <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-8">
                <div className="rounded-[24px] bg-gradient-to-br from-[#99BC44] to-[#84A832] p-7 text-[#183B2B] shadow-[0_18px_40px_rgba(132,168,50,0.25)]">
                  <span className="text-[11.5px] font-bold uppercase tracking-wider text-[#183B2B]/80">
                    Next Step
                  </span>
                  <h3 className="text-[20px] font-extrabold text-[#183B2B] mt-1 mb-3">
                    Ready to Launch {solutionData.title}?
                  </h3>
                  {solutionData.modalDetails.note && (
                    <p className="text-[14px] text-[#183B2B]/90 font-medium leading-relaxed mb-6">
                      {solutionData.modalDetails.note}
                    </p>
                  )}
                  <button
                    type="button"
                    onClick={() => onOpenInquiry(solutionData.title)}
                    className="w-full py-3 rounded-full bg-[#F97316] text-white text-[13.5px] font-bold hover:bg-[#EA580C] shadow-[0_4px_14px_rgba(249,115,22,0.3)] transition-colors cursor-pointer"
                  >
                    Book a Strategy Consultation
                  </button>
                </div>

                <div className="rounded-[24px] bg-white p-6 shadow-[0_12px_32px_rgba(24,59,43,0.06)] border border-[#F3F8E9]">
                  <h3 className="text-[15px] font-bold text-[#183B2B] mb-3.5">
                    Switch Growth Solution
                  </h3>
                  <div className="space-y-2">
                    {ADDITIONAL_SOLUTIONS_CONTENT.cards.map((sol) => {
                      const isCurrent = sol.route === currentPage;
                      return (
                        <button
                          key={sol.id}
                          type="button"
                          onClick={() => {
                            onNavigate(sol.route);
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                          }}
                          className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-left text-[13.5px] font-semibold transition-colors cursor-pointer ${
                            isCurrent
                              ? 'bg-[#F3F8E9] text-[#183B2B] border border-[#99BC44]'
                              : 'hover:bg-[#F3F8E9]/60 text-[#59665D] hover:text-[#183B2B]'
                          }`}
                        >
                          <span>{sol.title}</span>
                          <ArrowRight className="w-4 h-4 text-[#7A9A2E]" />
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="rounded-[24px] bg-[#F9FCF4] p-6 border border-[#E7F0D8]">
                  <h3 className="text-[15px] font-bold text-[#183B2B] mb-3">
                    Core Advertising Services
                  </h3>
                  <div className="space-y-2">
                    {SERVICES_CONTENT.cards.map((c) => (
                      <button
                        key={c.id}
                        type="button"
                        onClick={() => {
                          onNavigate(c.route);
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className="w-full flex items-center justify-between px-4 py-2.5 rounded-xl bg-white hover:bg-[#F3F8E9] text-left text-[13px] font-semibold text-[#183B2B] border border-[#E7F0D8] transition-colors cursor-pointer"
                      >
                        <span>{c.title}</span>
                        <ArrowRight className="w-4 h-4 text-[#7A9A2E]" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  // 3. Top-Level "Services" Page
  if (currentPage === 'services') {
    return (
      <div>
        {renderPageHeroBanner(
          'Our Services',
          'Focused Advertising & Conversion Systems for Clinics',
          'Explore our four core services below. Click any service card to view its dedicated breakdown, deliverables, and 4-step execution framework.',
          'Book a Strategy Call',
          'Google Ads'
        )}

        <ServicesSection
          onSelectService={onSelectServiceModal}
          onNavigate={onNavigate}
        />

        {/* Detailed Service Comparison & Methodology Strip */}
        <section className="py-16 bg-[#F3F8E9]/60 border-t border-[#DFECC8]">
          <div className="max-w-[1060px] mx-auto px-5 sm:px-8">
            <div className="text-center max-w-[640px] mx-auto mb-12">
              <h2 className="text-[26px] sm:text-[32px] font-extrabold text-[#183B2B] mb-3">
                Explore Each Service in Detail
              </h2>
              <p className="text-[14.5px] text-[#59665D]">
                Every campaign is managed on a transparent month-to-month agreement with dedicated strategist oversight.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {SERVICES_CONTENT.cards.map((card) => (
                <div
                  key={card.id}
                  className="rounded-[22px] bg-white p-7 shadow-[0_12px_32px_rgba(24,59,43,0.06)] border border-[#E7F0D8] flex flex-col justify-between"
                >
                  <div>
                    <h3 className="text-[20px] font-extrabold text-[#183B2B] mb-2">
                      {card.title}
                    </h3>
                    <p className="text-[14px] text-[#59665D] leading-relaxed mb-5">
                      {card.details.overview}
                    </p>
                    <ul className="space-y-2 mb-6">
                      {card.details.deliverables.map((del, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2.5 text-[13px] text-[#183B2B]"
                        >
                          <Check className="w-4 h-4 text-[#99BC44] shrink-0 mt-0.5" />
                          <span>{del}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-[#F3F8E9]">
                    <button
                      type="button"
                      onClick={() => {
                        onNavigate(card.route);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="inline-flex items-center gap-1.5 text-[13px] font-bold text-[#183B2B] hover:text-[#7A9A2E] cursor-pointer"
                    >
                      <span>Open Full {card.title} Page</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>

                    <button
                      type="button"
                      onClick={() => onOpenInquiry(card.title)}
                      className="px-4 py-2 rounded-full bg-[#F97316] text-white text-[12px] font-bold hover:bg-[#EA580C] shadow-[0_4px_10px_rgba(249,115,22,0.25)] cursor-pointer"
                    >
                      Inquire
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    );
  }

  // 4. Top-Level "Why ClinicsAds" Page
  if (currentPage === 'why-clinicsads') {
    return (
      <div>
        {renderPageHeroBanner(
          'Why ClinicsAds',
          'Built Specifically Around How Patients Choose a Clinic',
          'We combine healthcare-compliant ad management, sub-2-second landing pages, and clear inquiry tracking to help your clinic grow.',
          'Book a Discovery Call'
        )}

        <WhyChooseSection />

        {/* Agency Methodology & Standards */}
        <section className="py-16 bg-[#F9FCF4] border-t border-[#E7F0D8]">
          <div className="max-w-[1060px] mx-auto px-5 sm:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="rounded-[22px] bg-white p-7 shadow-xs border border-[#E7F0D8]">
                <ShieldCheck className="w-8 h-8 text-[#99BC44] mb-4" />
                <h3 className="text-[18px] font-bold text-[#183B2B] mb-2">
                  Month-to-Month Flexibility
                </h3>
                <p className="text-[13.5px] text-[#59665D] leading-relaxed">
                  We earn your clinic’s partnership every month through clear communication and measurable patient inquiries—never long-term lock-in contracts.
                </p>
              </div>

              <div className="rounded-[22px] bg-white p-7 shadow-xs border border-[#E7F0D8]">
                <Layers className="w-8 h-8 text-[#99BC44] mb-4" />
                <h3 className="text-[18px] font-bold text-[#183B2B] mb-2">
                  4-Step Growth System
                </h3>
                <p className="text-[13.5px] text-[#59665D] leading-relaxed">
                  Every clinic engagement follows a disciplined Discovery, Strategy, Execution, and Optimization workflow across Google Ads, Meta Ads, and ChatGPT Ads.
                </p>
              </div>

              <div className="rounded-[22px] bg-white p-7 shadow-xs border border-[#E7F0D8]">
                <Activity className="w-8 h-8 text-[#99BC44] mb-4" />
                <h3 className="text-[18px] font-bold text-[#183B2B] mb-2">
                  Server-Side &amp; GTM Attribution
                </h3>
                <p className="text-[13.5px] text-[#59665D] leading-relaxed">
                  We configure clean GA4 and Google Tag Manager pipelines so you know which campaigns drive real phone calls and appointment requests.
                </p>
              </div>
            </div>
          </div>
        </section>

        <TestimonialsSection />
      </div>
    );
  }

  // 5. Top-Level "Solutions" Page
  if (currentPage === 'solutions') {
    return (
      <div>
        {renderPageHeroBanner(
          'Additional Solutions',
          'More Ways to Grow Your Clinic Online',
          'Pair your paid campaigns with high-converting clinic landing pages and ChatGPT Ads & generative AI search visibility.',
          'Discuss Growth Solutions',
          'ChatGPT Ads & AI Search'
        )}

        <AdditionalSolutionsSection
          onSelectSolution={onSelectSolutionModal}
          onNavigate={onNavigate}
        />

        <section className="py-16 bg-[#F3F8E9]/60 border-t border-[#DFECC8]">
          <div className="max-w-[1060px] mx-auto px-5 sm:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {ADDITIONAL_SOLUTIONS_CONTENT.cards.map((sol) => (
                <div
                  key={sol.id}
                  className="rounded-[24px] bg-white p-7 sm:p-8 shadow-[0_14px_40px_rgba(24,59,43,0.06)] border border-[#E7F0D8] flex flex-col justify-between"
                >
                  <div>
                    <span className="text-[12px] font-bold text-[#7A9A2E]">
                      {sol.modalDetails.subtitle}
                    </span>
                    <h3 className="text-[22px] font-extrabold text-[#183B2B] mt-1 mb-3">
                      {sol.title}
                    </h3>
                    <p className="text-[14px] text-[#59665D] leading-relaxed mb-5">
                      {sol.modalDetails.summary}
                    </p>
                    <ul className="space-y-2.5 mb-6">
                      {sol.modalDetails.keyPoints.map((pt, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2.5 text-[13.5px] text-[#183B2B]"
                        >
                          <Check className="w-4 h-4 text-[#99BC44] shrink-0 mt-0.5" />
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-[#F3F8E9]">
                    <button
                      type="button"
                      onClick={() => {
                        onNavigate(sol.route);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="inline-flex items-center gap-1.5 text-[13.5px] font-bold text-[#183B2B] hover:text-[#7A9A2E] cursor-pointer"
                    >
                      <span>Open {sol.title} Page</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => onOpenInquiry(sol.title)}
                      className="px-5 py-2 rounded-full bg-[#F97316] text-white text-[12.5px] font-bold hover:bg-[#EA580C] shadow-[0_4px_10px_rgba(249,115,22,0.25)] cursor-pointer"
                    >
                      Book Consultation
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    );
  }

  // 6. Top-Level "Contact" Page
  return (
    <div>
      {renderPageHeroBanner(
        'Contact ClinicsAds',
        'Let’s Discuss Your Clinic’s Patient Inquiry Goals',
        'Reach out directly by phone, email, or the consultation request form below. All campaigns are structured on flexible month-to-month terms.'
      )}

      <section className="py-12 lg:py-20 bg-white">
        <div className="max-w-[1060px] mx-auto px-5 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left 5 Columns: Verified Contact Info */}
            <div className="lg:col-span-5 space-y-6">
              <div className="rounded-[24px] bg-[#F3F8E9] p-7 border border-[#DFECC8] space-y-6">
                <div>
                  <span className="text-[12px] font-bold text-[#7A9A2E]">
                    Direct Channels
                  </span>
                  <h2 className="text-[22px] font-extrabold text-[#183B2B] mt-0.5">
                    Get in Touch
                  </h2>
                  <p className="text-[13.5px] text-[#59665D] mt-1">
                    Speak directly with our healthcare marketing strategists at ClinicsAds.
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-[#183B2B] text-[#99BC44] flex items-center justify-center shrink-0">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-[12px] font-semibold text-[#59665D]">
                        Phone / Hotline
                      </p>
                      <a
                        href={SITE_CONFIG.contact.phoneHref}
                        className="text-[15px] font-bold text-[#183B2B] hover:text-[#7A9A2E] transition-colors"
                      >
                        {SITE_CONFIG.contact.phoneDisplay}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-[#183B2B] text-[#99BC44] flex items-center justify-center shrink-0">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-[12px] font-semibold text-[#59665D]">
                        Direct Email
                      </p>
                      <a
                        href={SITE_CONFIG.contact.emailHref}
                        className="text-[15px] font-bold text-[#183B2B] hover:text-[#7A9A2E] transition-colors"
                      >
                        {SITE_CONFIG.contact.email}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-[#183B2B] text-[#99BC44] flex items-center justify-center shrink-0">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-[12px] font-semibold text-[#59665D]">
                        Office Address
                      </p>
                      <p className="text-[14px] font-bold text-[#183B2B]">
                        {SITE_CONFIG.contact.address}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-[#183B2B] text-[#99BC44] flex items-center justify-center shrink-0">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-[12px] font-semibold text-[#59665D]">
                        Service Hours &amp; Terms
                      </p>
                      <p className="text-[13.5px] font-medium text-[#183B2B]">
                        {SITE_CONFIG.contact.serviceHours}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right 7 Columns: Full Working Consultation Form */}
            <div className="lg:col-span-7">
              <div className="rounded-[24px] bg-white p-7 sm:p-9 shadow-[0_18px_50px_rgba(24,59,43,0.08)] border border-[#E7F0D8]">
                {!contactSubmitted ? (
                  <>
                    <h2 className="text-[24px] font-extrabold text-[#183B2B] mb-2">
                      Request a Clinic Strategy Call
                    </h2>
                    <p className="text-[14px] text-[#59665D] mb-6">
                      Complete the form below to review your clinic’s search demand, landing page experience, and ad opportunities.
                    </p>

                    <div className="mb-6 p-3.5 rounded-xl bg-[#F3F8E9] border border-[#DFECC8] flex items-center gap-2 text-[12.5px] text-[#183B2B]">
                      <CheckCircle2 className="w-4 h-4 text-[#99BC44] shrink-0" />
                      <span>
                        <strong>Direct Clinic Intake:</strong> Your consultation request is routed immediately to our senior growth team for review.
                      </span>
                    </div>

                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        addInquiry({
                          name,
                          email,
                          phone: phone || undefined,
                          clinicName: clinicName || 'Clinic Practice',
                          website: website || undefined,
                          service,
                          message: notes || `Direct consultation request for ${service}`,
                          source: 'contact-page',
                        });
                        setContactSubmitted(true);
                      }}
                      className="space-y-4"
                    >
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label
                            htmlFor="page-contact-name"
                            className="block text-[13px] font-semibold text-[#183B2B] mb-1"
                          >
                            Name <span className="text-[#7A9A2E]">*</span>
                          </label>
                          <input
                            id="page-contact-name"
                            type="text"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Dr. Sarah Jenkins"
                            className="w-full px-4 py-2.5 rounded-xl border border-[#C7DCA5] text-[14px] text-[#183B2B] focus:outline-2 focus:outline-[#99BC44]"
                          />
                        </div>

                        <div>
                          <label
                            htmlFor="page-contact-email"
                            className="block text-[13px] font-semibold text-[#183B2B] mb-1"
                          >
                            Work Email <span className="text-[#7A9A2E]">*</span>
                          </label>
                          <input
                            id="page-contact-email"
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="name@yourclinic.com"
                            className="w-full px-4 py-2.5 rounded-xl border border-[#C7DCA5] text-[14px] text-[#183B2B] focus:outline-2 focus:outline-[#99BC44]"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div>
                          <label
                            htmlFor="page-contact-clinic"
                            className="block text-[13px] font-semibold text-[#183B2B] mb-1"
                          >
                            Clinic Name <span className="text-[#7A9A2E]">*</span>
                          </label>
                          <input
                            id="page-contact-clinic"
                            type="text"
                            required
                            value={clinicName}
                            onChange={(e) => setClinicName(e.target.value)}
                            placeholder="Oakridge Dental"
                            className="w-full px-4 py-2.5 rounded-xl border border-[#C7DCA5] text-[14px] text-[#183B2B] focus:outline-2 focus:outline-[#99BC44]"
                          />
                        </div>

                        <div>
                          <label
                            htmlFor="page-contact-phone"
                            className="block text-[13px] font-semibold text-[#183B2B] mb-1"
                          >
                            Phone / WhatsApp <span className="text-[#59665D] font-normal">(optional)</span>
                          </label>
                          <input
                            id="page-contact-phone"
                            type="tel"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="+44 7123 456789"
                            className="w-full px-4 py-2.5 rounded-xl border border-[#C7DCA5] text-[14px] text-[#183B2B] focus:outline-2 focus:outline-[#99BC44]"
                          />
                        </div>

                        <div>
                          <label
                            htmlFor="page-contact-website"
                            className="block text-[13px] font-semibold text-[#183B2B] mb-1"
                          >
                            Website <span className="text-[#59665D] font-normal">(optional)</span>
                          </label>
                          <input
                            id="page-contact-website"
                            type="url"
                            value={website}
                            onChange={(e) => setWebsite(e.target.value)}
                            placeholder="https://yourclinic.com"
                            className="w-full px-4 py-2.5 rounded-xl border border-[#C7DCA5] text-[14px] text-[#183B2B] focus:outline-2 focus:outline-[#99BC44]"
                          />
                        </div>
                      </div>

                      <div>
                        <label
                          htmlFor="page-contact-service"
                          className="block text-[13px] font-semibold text-[#183B2B] mb-1"
                        >
                          Primary Service of Interest
                        </label>
                        <select
                          id="page-contact-service"
                          value={service}
                          onChange={(e) => setService(e.target.value)}
                          className="w-full px-4 py-2.5 rounded-xl border border-[#C7DCA5] text-[14px] text-[#183B2B] focus:outline-2 focus:outline-[#99BC44] bg-white"
                        >
                          <option value="Google Ads">Google Ads</option>
                          <option value="Meta Ads">Meta Ads</option>
                          <option value="ChatGPT Ads & AI Search">ChatGPT Ads &amp; AI Search</option>
                          <option value="Landing Pages">Landing Pages</option>
                          <option value="Clinic SEO & Local Search">Clinic SEO &amp; Maps 3-Pack</option>
                          <option value="Tracking & Follow-Up">Tracking &amp; Follow-Up (GA4 / GTM)</option>
                          <option value="Clinic Landing Pages">Clinic Landing Pages</option>
                        </select>
                      </div>

                      <div>
                        <label
                          htmlFor="page-contact-notes"
                          className="block text-[13px] font-semibold text-[#183B2B] mb-1"
                        >
                          What treatments or goals would you like to focus on? <span className="text-[#59665D] font-normal">(optional)</span>
                        </label>
                        <textarea
                          id="page-contact-notes"
                          rows={3}
                          value={notes}
                          onChange={(e) => setNotes(e.target.value)}
                          placeholder="e.g., Growing dental implant inquiries, improving landing page conversion rate..."
                          className="w-full px-4 py-2.5 rounded-xl border border-[#C7DCA5] text-[14px] text-[#183B2B] focus:outline-2 focus:outline-[#F97316]"
                        />
                      </div>

                      <div className="pt-2">
                        <button
                          type="submit"
                          className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#F97316] text-white text-[14px] font-bold hover:bg-[#EA580C] transition-colors shadow-[0_6px_20px_rgba(249,115,22,0.35)] cursor-pointer"
                        >
                          Submit
                        </button>
                      </div>
                    </form>
                  </>
                ) : (
                  <div className="py-4">
                    <div className="w-12 h-12 rounded-full bg-[#F3F8E9] border border-[#99BC44] flex items-center justify-center text-[#183B2B] mb-4">
                      <CheckCircle2 className="w-6 h-6 text-[#99BC44]" />
                    </div>
                    <h3 className="text-[22px] font-extrabold text-[#183B2B] mb-2">
                      Consultation Request Received!
                    </h3>
                    <p className="text-[14px] text-[#59665D] mb-5">
                      Your inquiry has been received. Our healthcare growth team will review your clinic's objectives and reach out shortly.
                    </p>
                    <div className="rounded-xl bg-[#F3F8E9] p-5 space-y-2 text-[13.5px] text-[#183B2B] mb-6 border border-[#DFECC8]">
                      <div>
                        <strong>Name:</strong> {name}
                      </div>
                      <div>
                        <strong>Work Email:</strong> {email}
                      </div>
                      {phone && (
                        <div>
                          <strong>Phone / WhatsApp:</strong> {phone}
                        </div>
                      )}
                      <div>
                        <strong>Clinic Name:</strong> {clinicName}
                      </div>
                      {website && (
                        <div>
                          <strong>Website:</strong> {website}
                        </div>
                      )}
                      <div>
                        <strong>Service of Interest:</strong> {service}
                      </div>
                      {notes && (
                        <div>
                          <strong>Notes:</strong> {notes}
                        </div>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-3">
                      <button
                        type="button"
                        onClick={() => setContactSubmitted(false)}
                        className="px-6 py-2.5 rounded-full bg-[#F97316] text-white text-[13px] font-bold hover:bg-[#EA580C] cursor-pointer shadow-xs transition-colors"
                      >
                        Submit Another Request
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
