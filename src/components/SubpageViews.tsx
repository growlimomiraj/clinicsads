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
  FileText,
  AlertCircle,
  Briefcase,
  Compass,
} from 'lucide-react';
import { submitInquiry } from '../data/inquiriesStore';
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
import { ResourceArticle } from './ResourceArticles';
import { Link } from './Link';
import {
  trackLeadGeneration,
  trackPhoneClick,
  trackEmailClick,
} from '../utils/analytics';

interface SubpageViewsProps {
  currentPage: PageRoute;
  onNavigate: (route: PageRoute) => void;
  onOpenInquiry: (defaultService?: string) => void;
  onSelectServiceModal?: (service: ServiceCardData) => void;
  onSelectSolutionModal?: (solution: SolutionCardData) => void;
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
  const [service, setService] = useState('Google Ads for Clinics');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [hpCompany, setHpCompany] = useState('');
  const [hpWebsite, setHpWebsite] = useState('');
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [contactSubmitting, setContactSubmitting] = useState(false);
  const [contactError, setContactError] = useState<string | null>(null);

  // Helper Banner for all subpages with pale green #F3F8E9 header & bottom wave
  const renderPageHeroBanner = (
    kicker: string,
    title: string,
    subtitle: string,
    primaryCtaLabel?: string,
    primaryCtaService?: string,
    h1Override?: boolean
  ) => (
    <div className="relative bg-[#F3F8E9] pt-6 pb-20 lg:pt-10 lg:pb-28 overflow-hidden">
      <div
        className="pointer-events-none select-none absolute -top-24 -right-24 w-[360px] h-[360px] rounded-full border-[40px] border-[#E4F0D0]/60 opacity-70"
        aria-hidden="true"
      />
      <div className="max-w-[1060px] mx-auto px-5 sm:px-8 relative z-10">
        {/* Breadcrumb back to Home */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-[13px] font-medium text-[#59665D] mb-6">
          <Link
            href="/"
            onClick={() => onNavigate('home')}
            className="inline-flex items-center gap-1.5 text-[#183B2B] hover:text-[#7A9A2E] font-semibold transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Home</span>
          </Link>
          <span>/</span>
          <span className="text-[#183B2B] font-semibold truncate">{title}</span>
        </nav>

        <div className="max-w-[740px]">
          <span className="inline-block px-3.5 py-1 rounded-full bg-[#E4F0D0] text-[#183B2B] text-[12px] font-bold tracking-wide uppercase mb-3 border border-[#C7DCA5]">
            {kicker}
          </span>
          {h1Override !== false ? (
            <h1 className="text-[32px] sm:text-[44px] lg:text-[48px] font-extrabold text-[#183B2B] leading-[1.12] tracking-tight mb-4">
              {title}
            </h1>
          ) : (
            <h2 className="text-[32px] sm:text-[44px] lg:text-[48px] font-extrabold text-[#183B2B] leading-[1.12] tracking-tight mb-4">
              {title}
            </h2>
          )}
          <p className="text-[16px] sm:text-[18px] text-[#59665D] leading-[1.6] mb-8">
            {subtitle}
          </p>

          {primaryCtaLabel && (
            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => onOpenInquiry(primaryCtaService || title)}
                className="px-7 py-3 rounded-full bg-[#F97316] text-white text-[13.5px] font-bold hover:bg-[#EA580C] shadow-[0_6px_20px_rgba(249,115,22,0.35)] transition-colors cursor-pointer whitespace-nowrap"
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

  // 1. Resource Articles
  if (currentPage.startsWith('resource-')) {
    return (
      <ResourceArticle
        articleId={currentPage as any}
        onOpenInquiry={onOpenInquiry}
      />
    );
  }

  // 2. 404 Not Found Page
  if (currentPage === 'not-found') {
    return (
      <div className="py-20 lg:py-28 bg-white text-center">
        <div className="max-w-[640px] mx-auto px-5 sm:px-8">
          <span className="inline-block px-3.5 py-1 rounded-full bg-amber-50 text-amber-800 text-[12px] font-bold uppercase tracking-wider mb-4 border border-amber-200">
            Error 404
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#183B2B] mb-4">
            Page Not Found
          </h1>
          <p className="text-[16px] text-[#59665D] mb-8 leading-relaxed">
            The link you followed may be broken or the page may have been moved. Explore our core clinic marketing services or contact our team directly.
          </p>

          <div className="p-6 rounded-2xl bg-[#F3F8E9] border border-[#DFECC8] text-left mb-8 space-y-3">
            <h2 className="text-sm font-bold text-[#183B2B] uppercase tracking-wider">
              Popular Destinations
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
              <Link href="/" onClick={() => onNavigate('home')} className="text-[#183B2B] hover:text-[#7A9A2E] font-medium flex items-center gap-1.5">
                <ArrowRight className="w-3.5 h-3.5 text-[#99BC44]" /> Home
              </Link>
              <Link href="/services/" onClick={() => onNavigate('services')} className="text-[#183B2B] hover:text-[#7A9A2E] font-medium flex items-center gap-1.5">
                <ArrowRight className="w-3.5 h-3.5 text-[#99BC44]" /> Services Overview
              </Link>
              <Link href="/services/google-ads-for-clinics/" onClick={() => onNavigate('service-google-ads')} className="text-[#183B2B] hover:text-[#7A9A2E] font-medium flex items-center gap-1.5">
                <ArrowRight className="w-3.5 h-3.5 text-[#99BC44]" /> Google Ads for Clinics
              </Link>
              <Link href="/services/clinic-landing-pages/" onClick={() => onNavigate('service-landing-pages')} className="text-[#183B2B] hover:text-[#7A9A2E] font-medium flex items-center gap-1.5">
                <ArrowRight className="w-3.5 h-3.5 text-[#99BC44]" /> Clinic Landing Pages
              </Link>
              <Link href="/about/" onClick={() => onNavigate('about')} className="text-[#183B2B] hover:text-[#7A9A2E] font-medium flex items-center gap-1.5">
                <ArrowRight className="w-3.5 h-3.5 text-[#99BC44]" /> About ClinicsAds
              </Link>
              <Link href="/contact/" onClick={() => onNavigate('contact')} className="text-[#183B2B] hover:text-[#7A9A2E] font-medium flex items-center gap-1.5">
                <ArrowRight className="w-3.5 h-3.5 text-[#99BC44]" /> Contact Us
              </Link>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/"
              onClick={() => onNavigate('home')}
              className="px-6 py-3 rounded-full bg-[#183B2B] text-white text-sm font-bold hover:bg-[#183B2B]/90 transition-colors"
            >
              Return to Homepage
            </Link>
            <button
              type="button"
              onClick={() => onOpenInquiry()}
              className="px-6 py-3 rounded-full bg-[#F97316] text-white text-sm font-bold hover:bg-[#EA580C] transition-colors"
            >
              Contact Our Team
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 3. Dedicated Individual Service Detail Page
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

    return (
      <div>
        {renderPageHeroBanner(
          'Specialized Clinic Marketing Service',
          serviceData.title,
          serviceData.details.tagline,
          `Book a ${serviceData.title} Consultation`,
          serviceData.title
        )}

        <section className="py-12 lg:py-16 bg-white">
          <div className="max-w-[1060px] mx-auto px-5 sm:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
              {/* Left 7 Cols: Overview, Scope, Process, Client Prerequisites, FAQs */}
              <div className="lg:col-span-7 space-y-8">
                {/* Value Proposition Callout */}
                {serviceData.details.valueProposition && (
                  <div className="p-5 rounded-2xl bg-[#F3F8E9] border border-[#DFECC8] flex items-start gap-3.5">
                    <CheckCircle2 className="w-5 h-5 text-[#99BC44] shrink-0 mt-0.5" />
                    <p className="text-[14.5px] font-semibold text-[#183B2B] leading-snug">
                      {serviceData.details.valueProposition}
                    </p>
                  </div>
                )}

                {/* Service Overview */}
                <div className="rounded-[24px] bg-white p-7 sm:p-8 shadow-[0_14px_40px_rgba(24,59,43,0.06)] border border-[#F3F8E9]">
                  <div className="flex items-center gap-3.5 mb-4">
                    <div className="w-12 h-12 rounded-[14px] flex items-center justify-center shrink-0 bg-white shadow-[0_4px_12px_rgba(0,0,0,0.06)] border border-[#DFECC8]">
                      {renderServiceHeroIcon(serviceData.iconName)}
                    </div>
                    <div>
                      <span className="text-[12px] font-bold text-[#7A9A2E] uppercase tracking-wider">
                        Strategic Scope
                      </span>
                      <h2 className="text-[22px] font-extrabold text-[#183B2B]">
                        How {serviceData.title} Works
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
                    What Is Included in Every Engagement
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
                    Every clinic campaign follows our structured deployment process:
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

                {/* What the Client Needs to Provide */}
                {serviceData.details.clientProvides && (
                  <div className="rounded-[24px] bg-white p-7 sm:p-8 shadow-[0_14px_40px_rgba(24,59,43,0.06)] border border-[#E7F0D8]">
                    <div className="flex items-center gap-2.5 mb-4">
                      <Briefcase className="w-5 h-5 text-[#7A9A2E]" />
                      <h3 className="text-[19px] font-extrabold text-[#183B2B]">
                        What Your Clinic Needs to Provide
                      </h3>
                    </div>
                    <p className="text-[13.5px] text-[#59665D] mb-4">
                      To launch fast without taking unnecessary doctor time, we require only essential practice facts:
                    </p>
                    <ul className="space-y-2.5">
                      {serviceData.details.clientProvides.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-[14px] text-[#183B2B]">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#99BC44] shrink-0 mt-2" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* FAQs */}
                <div className="rounded-[24px] bg-white p-7 sm:p-8 shadow-[0_14px_40px_rgba(24,59,43,0.06)] border border-[#F3F8E9]">
                  <div className="flex items-center gap-2.5 mb-5">
                    <HelpCircle className="w-5 h-5 text-[#7A9A2E]" />
                    <h3 className="text-[19px] font-extrabold text-[#183B2B]">
                      Truthful Answers to Common Questions
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

                {/* Contextual Resource Guides Strip */}
                <div className="p-6 rounded-2xl bg-[#F9FCF4] border border-[#DFECC8] space-y-3">
                  <h4 className="text-sm font-bold text-[#183B2B] flex items-center gap-2">
                    <FileText className="w-4 h-4 text-[#7A9A2E]" />
                    Related Practical Guides for Clinic Owners
                  </h4>
                  <div className="space-y-2 text-xs">
                    <Link
                      href="/resources/google-ads-for-clinics-pre-launch-checklist/"
                      onClick={() => onNavigate('resource-pre-launch-checklist')}
                      className="block text-[#183B2B] hover:text-[#7A9A2E] font-medium"
                    >
                      • Google Ads for Clinics: A Practical Pre-Launch Checklist →
                    </Link>
                    <Link
                      href="/resources/google-ads-vs-meta-ads-for-clinics/"
                      onClick={() => onNavigate('resource-google-vs-meta')}
                      className="block text-[#183B2B] hover:text-[#7A9A2E] font-medium"
                    >
                      • Google Ads vs. Meta Ads for Clinics: How to Choose the Right Starting Point →
                    </Link>
                    <Link
                      href="/resources/clinic-landing-page-guide/"
                      onClick={() => onNavigate('resource-landing-page-guide')}
                      className="block text-[#183B2B] hover:text-[#7A9A2E] font-medium"
                    >
                      • What a Clinic Landing Page Needs Before You Send Paid Traffic →
                    </Link>
                  </div>
                </div>
              </div>

              {/* Right 5 Cols: Ideal For Card + Explore Other Clinic Services */}
              <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-8">
                <div className="rounded-[24px] bg-gradient-to-br from-[#99BC44] to-[#84A832] p-7 text-[#183B2B] shadow-[0_18px_40px_rgba(132,168,50,0.25)]">
                  <span className="text-[11.5px] font-bold uppercase tracking-wider text-[#183B2B]/80">
                    Best Fit Practices
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
                    Request a Clinic Strategy Call
                  </button>
                </div>

                {/* Explore Other Clinic Services */}
                <div className="rounded-[24px] bg-white p-6 shadow-[0_12px_32px_rgba(24,59,43,0.06)] border border-[#F3F8E9]">
                  <h3 className="text-[15px] font-bold text-[#183B2B] mb-3.5">
                    Explore Other Clinic Services
                  </h3>
                  <div className="space-y-2">
                    {SERVICES_CONTENT.cards.map((c) => {
                      const isCurrent = c.route === currentPage;
                      return (
                        <Link
                          key={c.id}
                          href={c.path}
                          onClick={() => {
                            onNavigate(c.route);
                          }}
                          className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-left text-[13.5px] font-semibold transition-colors ${
                            isCurrent
                              ? 'bg-[#F3F8E9] text-[#183B2B] border border-[#99BC44]'
                              : 'hover:bg-[#F3F8E9]/60 text-[#59665D] hover:text-[#183B2B]'
                          }`}
                        >
                          <span>{c.title}</span>
                          <ArrowRight className="w-4 h-4 text-[#7A9A2E]" />
                        </Link>
                      );
                    })}
                  </div>
                </div>

                <div className="rounded-[24px] bg-[#F9FCF4] p-6 border border-[#E7F0D8]">
                  <h3 className="text-[14px] font-bold text-[#183B2B] mb-2">
                    Transparent Engagement Model
                  </h3>
                  <p className="text-[12.5px] text-[#59665D] leading-relaxed">
                    All ClinicsAds agreements are month-to-month. Ad spend is billed directly by Google or Meta; our management fee is fixed and transparent.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  // 4. Top-Level "Services" Overview Page
  if (currentPage === 'services') {
    return (
      <div>
        {renderPageHeroBanner(
          'Clinic Marketing Services',
          'Focused Advertising & Patient Acquisition Systems for Clinics',
          'Explore our specialized marketing services below. Every campaign is designed specifically for healthcare practices and managed on flexible month-to-month agreements.',
          'Schedule Strategy Consultation',
          'Google Ads for Clinics'
        )}

        <ServicesSection
          onSelectService={(service) => {
            onNavigate(service.route);
          }}
          onNavigate={onNavigate}
        />

        {/* Detailed Service Grid */}
        <section className="py-16 bg-[#F3F8E9]/60 border-t border-[#DFECC8]">
          <div className="max-w-[1060px] mx-auto px-5 sm:px-8">
            <div className="text-center max-w-[640px] mx-auto mb-12">
              <h2 className="text-[26px] sm:text-[32px] font-extrabold text-[#183B2B] mb-3">
                Explore Each Service in Detail
              </h2>
              <p className="text-[14.5px] text-[#59665D]">
                Click any service below to review its dedicated campaign scope, execution framework, and suitable clinic criteria.
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
                      {card.details.deliverables.slice(0, 3).map((del, i) => (
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
                    <Link
                      href={card.path}
                      onClick={() => onNavigate(card.route)}
                      className="inline-flex items-center gap-1.5 text-[13px] font-bold text-[#183B2B] hover:text-[#7A9A2E]"
                    >
                      <span>Explore {card.title}</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>

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

  // 5. About Page (/about/ or legacy /#why-clinicsads)
  if (currentPage === 'about' || currentPage === 'why-clinicsads') {
    return (
      <div>
        {renderPageHeroBanner(
          'About ClinicsAds',
          'A Dedicated Healthcare Marketing Agency for Clinics',
          'We help medical, dental, and specialty clinics turn local search and paid social interest into qualified, booked patient consultations—on transparent month-to-month terms.',
          'Schedule a Strategy Call'
        )}

        <WhyChooseSection />

        {/* Agency Standards and Credibility */}
        <section className="py-16 bg-[#F9FCF4] border-t border-[#E7F0D8]">
          <div className="max-w-[1060px] mx-auto px-5 sm:px-8">
            <div className="max-w-[720px] mb-12">
              <span className="text-xs font-bold text-[#7A9A2E] uppercase tracking-wider block mb-2">
                Our Approach &amp; Standards
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#183B2B] mb-4">
                Marketing Engineered for How Patients Actually Choose Care
              </h2>
              <p className="text-[15px] text-[#59665D] leading-relaxed">
                ClinicsAds is a marketing agency, not a medical provider. We do not pretend to treat patients or target "clinic near me" for ourselves. Our entire agency exists to help legitimate medical and dental practices connect with people actively searching for care in their communities.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="rounded-[22px] bg-white p-7 shadow-xs border border-[#E7F0D8]">
                <ShieldCheck className="w-8 h-8 text-[#99BC44] mb-4" />
                <h3 className="text-[18px] font-bold text-[#183B2B] mb-2">
                  Month-to-Month Agreements
                </h3>
                <p className="text-[13.5px] text-[#59665D] leading-relaxed">
                  We earn your clinic’s trust every month through clear communication and measurable inquiry outcomes. We never force multi-quarter lock-in contracts.
                </p>
              </div>

              <div className="rounded-[22px] bg-white p-7 shadow-xs border border-[#E7F0D8]">
                <Layers className="w-8 h-8 text-[#99BC44] mb-4" />
                <h3 className="text-[18px] font-bold text-[#183B2B] mb-2">
                  Disciplined 4-Step Methodology
                </h3>
                <p className="text-[13.5px] text-[#59665D] leading-relaxed">
                  Every clinic partnership follows a clear Discovery, Strategy, Execution, and Optimization workflow to ensure your ad spend produces patient inquiries, not just impressions.
                </p>
              </div>

              <div className="rounded-[22px] bg-white p-7 shadow-xs border border-[#E7F0D8]">
                <Activity className="w-8 h-8 text-[#99BC44] mb-4" />
                <h3 className="text-[18px] font-bold text-[#183B2B] mb-2">
                  Transparent Attribution
                </h3>
                <p className="text-[13.5px] text-[#59665D] leading-relaxed">
                  We configure privacy-safe GA4, Google Tag Manager, and call tracking pipelines so your practice always knows which campaigns generate real consultations.
                </p>
              </div>
            </div>

            {/* Verified Business Information */}
            <div className="mt-12 p-8 rounded-2xl bg-white border border-[#DFECC8] grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
              <div>
                <h4 className="font-bold text-[#183B2B] mb-1">Office Location</h4>
                <p className="text-[#59665D]">{SITE_CONFIG.contact.address}</p>
              </div>
              <div>
                <h4 className="font-bold text-[#183B2B] mb-1">Direct Contacts</h4>
                <p className="text-[#59665D]">
                  <a href={SITE_CONFIG.contact.phoneHref} className="hover:text-[#7A9A2E]">
                    {SITE_CONFIG.contact.phoneDisplay}
                  </a>
                  <br />
                  <a href={SITE_CONFIG.contact.emailHref} className="hover:text-[#7A9A2E]">
                    {SITE_CONFIG.contact.email}
                  </a>
                </p>
              </div>
              <div>
                <h4 className="font-bold text-[#183B2B] mb-1">Service Hours</h4>
                <p className="text-[#59665D]">{SITE_CONFIG.contact.serviceHours}</p>
              </div>
            </div>
          </div>
        </section>

        <TestimonialsSection />
      </div>
    );
  }

  // 6. Top-Level "Contact" Page
  return (
    <div>
      {renderPageHeroBanner(
        'Contact ClinicsAds',
        'Let’s Discuss Your Clinic’s Patient Inquiry Goals',
        'Reach out directly by phone, email, or request a consultation below. We review your clinic’s search demand, landing page experience, and ad opportunities on flexible month-to-month terms.'
      )}

      <section className="py-12 lg:py-20 bg-white">
        <div className="max-w-[1060px] mx-auto px-5 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left 5 Columns: Verified Contact Info */}
            <div className="lg:col-span-5 space-y-6">
              <div className="rounded-[24px] bg-[#F3F8E9] p-7 border border-[#DFECC8] space-y-6">
                <div>
                  <span className="text-[12px] font-bold text-[#7A9A2E] uppercase tracking-wider">
                    Direct Agency Channels
                  </span>
                  <h2 className="text-[22px] font-extrabold text-[#183B2B] mt-0.5">
                    Speak with a Healthcare Strategist
                  </h2>
                  <p className="text-[13.5px] text-[#59665D] mt-1">
                    Connect directly with the growth team at ClinicsAds.
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

            {/* Right 7 Columns: Full Working Consultation Form with Honeypot Abuse Protection */}
            <div className="lg:col-span-7">
              <div className="rounded-[24px] bg-white p-7 sm:p-9 shadow-[0_18px_50px_rgba(24,59,43,0.08)] border border-[#E7F0D8]">
                {!contactSubmitted ? (
                  <>
                    <h2 className="text-[24px] font-extrabold text-[#183B2B] mb-2">
                      Request a Clinic Strategy Consultation
                    </h2>
                    <p className="text-[14px] text-[#59665D] mb-6">
                      Complete the form below. We will review your clinic's search competition and outline clear campaign recommendations.
                    </p>

                    <div className="mb-6 p-3.5 rounded-xl bg-[#F3F8E9] border border-[#DFECC8] flex items-center gap-2 text-[12.5px] text-[#183B2B]">
                      <CheckCircle2 className="w-4 h-4 text-[#99BC44] shrink-0" />
                      <span>
                        <strong>Direct Clinic Intake:</strong> Inquiries are received securely on our server and reviewed by our senior healthcare marketing team.
                      </span>
                    </div>

                    <form
                      onSubmit={async (e) => {
                        e.preventDefault();
                        // Bot honeypot check
                        if (hpCompany || hpWebsite) {
                          setContactSubmitted(true);
                          return;
                        }

                        setContactSubmitting(true);
                        setContactError(null);
                        try {
                          const created = await submitInquiry({
                            name,
                            email,
                            phone: phone || undefined,
                            clinicName: clinicName || 'Clinic Practice',
                            website: website || undefined,
                            service,
                            message: notes || `Direct consultation request for ${service}`,
                            source: 'contact-page',
                            _hp_company: hpCompany,
                            _hp_website: hpWebsite,
                          });
                          if (created && created.id) {
                            trackLeadGeneration(created.id, service, 'contact-page');
                          }
                          setContactSubmitted(true);
                        } catch (err: any) {
                          let msg = 'Failed to submit consultation request. Please try again or contact us directly.';
                          if (err) {
                            if (typeof err === 'string') {
                              msg = err;
                            } else if (typeof err.message === 'string') {
                              msg = err.message;
                            } else if (err.error) {
                              msg = typeof err.error === 'string' ? err.error : (err.error?.message || JSON.stringify(err.error));
                            }
                          }
                          setContactError(msg);
                        } finally {
                          setContactSubmitting(false);
                        }
                      }}
                      className="space-y-4"
                    >
                      {/* Honeypot Fields (Hidden from human visitors) */}
                      <div style={{ display: 'none' }} aria-hidden="true">
                        <input
                          type="text"
                          name="_hp_company"
                          tabIndex={-1}
                          autoComplete="off"
                          value={hpCompany}
                          onChange={(e) => setHpCompany(e.target.value)}
                        />
                        <input
                          type="text"
                          name="_hp_website"
                          tabIndex={-1}
                          autoComplete="off"
                          value={hpWebsite}
                          onChange={(e) => setHpWebsite(e.target.value)}
                        />
                      </div>

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
                            placeholder="+1 (555) 000-0000"
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
                          <option value="Google Ads for Clinics">Google Ads for Clinics</option>
                          <option value="Meta Ads for Clinics">Meta Ads for Clinics</option>
                          <option value="Clinic Landing Pages">Clinic Landing Pages</option>
                          <option value="Clinic Conversion Tracking">Clinic Conversion Tracking (GA4 / GTM)</option>
                          <option value="Clinic SEO & Local Search">Clinic SEO &amp; Google Maps 3-Pack</option>
                          <option value="ChatGPT & AI Search Optimization">ChatGPT &amp; AI Search Optimization</option>
                        </select>
                      </div>

                      <div>
                        <label
                          htmlFor="page-contact-notes"
                          className="block text-[13px] font-semibold text-[#183B2B] mb-1"
                        >
                          Target Treatments or Practice Goals <span className="text-[#59665D] font-normal">(optional)</span>
                        </label>
                        <textarea
                          id="page-contact-notes"
                          rows={3}
                          value={notes}
                          onChange={(e) => setNotes(e.target.value)}
                          placeholder="e.g., Growing dental implant consultations, opening a private physiotherapy suite, launching Meta Ads..."
                          className="w-full px-4 py-2.5 rounded-xl border border-[#C7DCA5] text-[14px] text-[#183B2B] focus:outline-2 focus:outline-[#F97316]"
                        />
                      </div>

                      {contactError && (
                        <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold flex items-start gap-2">
                          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                          <span>{contactError}</span>
                        </div>
                      )}

                      <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                        <button
                          type="submit"
                          disabled={contactSubmitting}
                          className="px-8 py-3.5 rounded-full bg-[#F97316] text-white text-[14px] font-bold hover:bg-[#EA580C] transition-colors shadow-[0_6px_20px_rgba(249,115,22,0.35)] cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                          {contactSubmitting ? (
                            <>
                              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                              <span>Submitting Request...</span>
                            </>
                          ) : (
                            <span>Submit Consultation Request</span>
                          )}
                        </button>
                        <p className="text-xs text-[#59665D]">
                          Or call directly: <a href={SITE_CONFIG.contact.phoneHref} className="font-bold text-[#183B2B] hover:underline">{SITE_CONFIG.contact.phoneDisplay}</a>
                        </p>
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
                      Your inquiry has been stored securely on our authoritative server. Our healthcare marketing strategists will review your clinic's objectives and reach out shortly.
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
                          <strong>Goals:</strong> {notes}
                        </div>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-3">
                      <button
                        type="button"
                        onClick={() => {
                          setContactSubmitted(false);
                          setName('');
                          setEmail('');
                          setClinicName('');
                          setPhone('');
                          setNotes('');
                        }}
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
