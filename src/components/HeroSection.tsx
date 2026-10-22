import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  TrendingUp,
  DollarSign,
  Calendar,
  ZoomIn,
  X,
  ChevronLeft,
  ChevronRight,
  Award,
  Activity,
  Layers,
  Search,
  Users,
} from 'lucide-react';
import { PageRoute } from '../data/siteContent';
import { Link } from './Link';

interface HeroSectionProps {
  onOpenInquiry: (defaultService?: string) => void;
  onNavigate: (route: PageRoute) => void;
  showBottomWave?: boolean;
}

export interface CaseStudyProof {
  id: string;
  category: 'healthcare' | 'meta' | 'scaling';
  platform: 'Google Ads' | 'Meta Ads' | 'Google & Meta';
  title: string;
  subtitle: string;
  clientBadge: string;
  description: string;
  imageSrc: string;
  tags: string[];
  metrics: {
    label: string;
    value: string;
    sublabel?: string;
    accentColor: string; // Tailwind color class for bg / border / text
    bgBadge: string;
  }[];
  keyHighlights: string[];
}

const CASE_STUDIES: CaseStudyProof[] = [
  {
    id: 'diagnostic-lab',
    category: 'healthcare',
    platform: 'Google Ads',
    title: 'Diagnostic Health Lab — Dubai',
    subtitle: 'Scaling Patient Bookings & High-Intent Diagnostic Search',
    clientBadge: 'Diagnostic Health Lab',
    description:
      'Managed Google Ads campaigns for a premier diagnostic health lab in Dubai, achieving 24.8K verified patient conversions with an optimized cost per conversion of dh235. Focused on high-intent keywords, conversion tracking, and continuous bid optimization to scale patient bookings efficiently.',
    imageSrc: '/portfolio/proof_1_diagnostic_lab.png',
    tags: ['Diagnostic Clinic', 'Google Search PPC', 'Dubai UAE', 'High-Intent Patient Search'],
    metrics: [
      {
        label: 'Patient Conversions',
        value: '24.8K',
        sublabel: 'Verified Lab Bookings',
        accentColor: 'text-[#E53E3E]',
        bgBadge: 'bg-[#FFEDED] border-[#FED7D7]',
      },
      {
        label: 'Cost / Conversion',
        value: 'dh235',
        sublabel: 'Optimized Acquisition Cost',
        accentColor: 'text-[#D69E2E]',
        bgBadge: 'bg-[#FEFCBF]/60 border-[#FAF089]',
      },
      {
        label: 'Clicks Generated',
        value: '570K',
        sublabel: 'High-Intent Search Traffic',
        accentColor: 'text-[#3182CE]',
        bgBadge: 'bg-[#EBF8FF] border-[#BEE3F8]',
      },
      {
        label: 'Total Ad Spend',
        value: 'dh5.84M',
        sublabel: 'Profitable Campaign Scale',
        accentColor: 'text-[#38A169]',
        bgBadge: 'bg-[#F0FFF4] border-[#C6F6D5]',
      },
    ],
    keyHighlights: [
      '24,800+ booked patient diagnostic tests & blood work appointments',
      'dh235 average cost per patient conversion in competitive metro market',
      'Comprehensive negative keyword filtering eliminating low-intent inquiries',
      'Full server-side conversion tracking tied into clinic management portal',
    ],
  },
  {
    id: 'aesthetic-clinic',
    category: 'healthcare',
    platform: 'Google Ads',
    title: 'Aesthetic & Cosmetic Clinic — UAE',
    subtitle: 'Targeted Google Ads Lead Generation for Elective Procedures',
    clientBadge: 'Aesthetic Medical Clinic',
    description:
      'Executed targeted Google Ads campaigns for an aesthetic clinic, generating 1.28K qualified consultation leads with a total spend of dh419K. Built dedicated high-converting procedure landing pages and filtered out non-converting traffic with rigorous negative keyword lists.',
    imageSrc: '/portfolio/proof_2_aesthetic_clinic.png',
    tags: ['Aesthetic Medicine', 'Google Search PPC', 'Consultation Leads', 'UAE'],
    metrics: [
      {
        label: 'Qualified Patient Leads',
        value: '1.28K',
        sublabel: 'Direct Consultation Requests',
        accentColor: 'text-[#D69E2E]',
        bgBadge: 'bg-[#FEFCBF]/60 border-[#FAF089]',
      },
      {
        label: 'Cost / Lead',
        value: 'dh328',
        sublabel: 'High-Margin Elective Cost',
        accentColor: 'text-[#E53E3E]',
        bgBadge: 'bg-[#FFEDED] border-[#FED7D7]',
      },
      {
        label: 'Targeted Clicks',
        value: '16.1K',
        sublabel: 'Procedure-Specific Intent',
        accentColor: 'text-[#183B2B]',
        bgBadge: 'bg-[#F3F8E9] border-[#DFECC8]',
      },
      {
        label: 'Total Ad Spend',
        value: 'dh419K',
        sublabel: 'Managed Spend Portfolio',
        accentColor: 'text-[#59665D]',
        bgBadge: 'bg-white border-[#E2E8F0]',
      },
    ],
    keyHighlights: [
      '1,280 qualified patient consultation requests generated',
      'dh328 cost per lead for high-ticket cosmetic & skin treatments',
      'Single-treatment ad group structuring matching search intent to landing page',
      'Consistent month-over-month patient pipeline scaling',
    ],
  },
  {
    id: 'lead-gen-uae',
    category: 'healthcare',
    platform: 'Google Ads',
    title: 'Local Service & Healthcare Practice — UAE',
    subtitle: 'Low Cost-Per-Acquisition Lead Generation Campaign',
    clientBadge: 'Local Practice Lead Gen',
    description:
      'Delivered consistent lead growth with 508+ conversions at a remarkably low cost per conversion of dh55.46. Focused on smart bidding strategies, keyword refinement, and data-driven optimization to maximize ROI for local service-based businesses.',
    imageSrc: '/portfolio/proof_3_lead_gen_uae.png',
    tags: ['Local Healthcare Practice', 'Google Smart Bidding', 'Low CPA', 'UAE'],
    metrics: [
      {
        label: 'Verified Conversions',
        value: '508.54',
        sublabel: 'Direct Inquiries',
        accentColor: 'text-[#D69E2E]',
        bgBadge: 'bg-[#FEFCBF]/60 border-[#FAF089]',
      },
      {
        label: 'Cost / Conversion',
        value: 'dh55.46',
        sublabel: 'Industry-Beating Efficiency',
        accentColor: 'text-[#E53E3E]',
        bgBadge: 'bg-[#FFEDED] border-[#FED7D7]',
      },
      {
        label: 'High-Intent Clicks',
        value: '1.42K',
        sublabel: 'Filtered Local Volume',
        accentColor: 'text-[#38A169]',
        bgBadge: 'bg-[#F0FFF4] border-[#C6F6D5]',
      },
      {
        label: 'Total Ad Spend',
        value: 'dh28.2K',
        sublabel: 'Lean Budget Maximum Output',
        accentColor: 'text-[#3182CE]',
        bgBadge: 'bg-[#EBF8FF] border-[#BEE3F8]',
      },
    ],
    keyHighlights: [
      '508+ customer conversions achieved with only dh28.2K spend',
      'dh55.46 ultra-lean CPA through smart bidding and localized radius geo-targeting',
      'High conversion rate exceeding 35% on mobile-optimized click-to-call assets',
      'Full inquiry transparency and front-desk routing',
    ],
  },
  {
    id: 'ngo-meta-ads',
    category: 'meta',
    platform: 'Meta Ads',
    title: 'Multi-Campaign Advertising — $1M+ Spend Portfolio',
    subtitle: 'Enterprise-Scale Meta Ads (Facebook & Instagram) Campaign Management',
    clientBadge: 'Enterprise Meta Portfolio',
    description:
      'Managed multiple ad sets for a major organization client with total ad spend exceeding $1M, delivering strong engagement and consistent website conversions. Reached over 6.8M users with 85.6M+ impressions through audience targeting, attribution optimization, and continuous performance monitoring.',
    imageSrc: '/portfolio/proof_5_ngo_meta_ads.jpg',
    tags: ['Meta Ads Manager', 'Paid Social Enterprise', '6.8M+ Reach', 'International'],
    metrics: [
      {
        label: 'Total Impressions',
        value: '85.6M+',
        sublabel: 'Ad Sets Scale',
        accentColor: 'text-[#183B2B]',
        bgBadge: 'bg-[#F3F8E9] border-[#DFECC8]',
      },
      {
        label: 'Unique User Reach',
        value: '6.89M+',
        sublabel: 'Targeted Audiences',
        accentColor: 'text-[#7A9A2E]',
        bgBadge: 'bg-[#EAF5D8] border-[#DFECC8]',
      },
      {
        label: 'Ad Spend Managed',
        value: '$1,031,397',
        sublabel: 'Verified Live Dashboard',
        accentColor: 'text-[#F97316]',
        bgBadge: 'bg-[#FFF3EB] border-[#FED7AA]',
      },
      {
        label: 'Attribution Tracking',
        value: '7-Day Click',
        sublabel: 'Conversion Windows',
        accentColor: 'text-[#3182CE]',
        bgBadge: 'bg-[#EBF8FF] border-[#BEE3F8]',
      },
    ],
    keyHighlights: [
      '$1,031,397 in total verified ad spend managed across Meta Ads Manager',
      '85,691,795 total impressions delivering high brand awareness & trust',
      '6,897,923 unique individuals reached across multiple international markets',
      'Rigorous cost per result optimization across dozens of active ad sets',
    ],
  },
  {
    id: 'automotive-meta-leads',
    category: 'meta',
    platform: 'Meta Ads',
    title: 'High-Volume Lead Generation — UAE Market',
    subtitle: '39M+ Impressions & 3.5M+ Targeted Audience Reach',
    clientBadge: 'Meta Lead Gen Campaign',
    description:
      'Managed Meta Ads campaigns in the UAE, generating high-volume qualified leads across multiple ad sets. Achieved strong reach of over 3.5M users and 39M+ impressions with optimized cost per lead through audience targeting, creative testing, and budget optimization.',
    imageSrc: '/portfolio/proof_7_automotive_meta_leads.png',
    tags: ['Meta Lead Forms', 'Audience Retargeting', 'High-Volume Leads', 'UAE'],
    metrics: [
      {
        label: 'Total Impressions',
        value: '39.2M+',
        sublabel: 'Paid Social Exposure',
        accentColor: 'text-[#183B2B]',
        bgBadge: 'bg-[#F3F8E9] border-[#DFECC8]',
      },
      {
        label: 'Audience Reach',
        value: '3.59M+',
        sublabel: 'Targeted Local Users',
        accentColor: 'text-[#7A9A2E]',
        bgBadge: 'bg-[#EAF5D8] border-[#DFECC8]',
      },
      {
        label: 'Total Ad Spend',
        value: '946K AED',
        sublabel: 'Managed Meta Spend',
        accentColor: 'text-[#F97316]',
        bgBadge: 'bg-[#FFF3EB] border-[#FED7AA]',
      },
      {
        label: 'Lead Form CPA',
        value: '39.05 – 88.20',
        sublabel: 'AED Cost / Lead Range',
        accentColor: 'text-[#38A169]',
        bgBadge: 'bg-[#F0FFF4] border-[#C6F6D5]',
      },
    ],
    keyHighlights: [
      '39,215,767 impressions generating steady high-intent inquiries',
      '3,598,195 users reached across metropolitan target territories',
      'Instant lead forms integrated directly into CRM for immediate follow-up',
      'Multivariate creative testing driving lower cost-per-lead month-over-month',
    ],
  },
  {
    id: 'ecommerce-growth',
    category: 'scaling',
    platform: 'Google & Meta',
    title: 'Modern Brand Scaling & E-Commerce Growth',
    subtitle: '797% ROAS & $1.86M in Tracked Conversion Value',
    clientBadge: 'E-Commerce Growth',
    description:
      'Managed paid advertising generating 7.98K conversions and $1.86M in tracked conversion value with total ad spend of $233K. Achieved an actual ROAS of 797.45% through high-intent search ads, remarketing funnels, and performance scaling.',
    imageSrc: '/portfolio/proof_4_wall_art_ecommerce.png',
    tags: ['Performance Scaling', '797% ROAS', 'Conversion Value', 'Search & Social'],
    metrics: [
      {
        label: 'Conversion Value',
        value: '$1.86M',
        sublabel: 'Tracked Revenue Value',
        accentColor: 'text-[#3182CE]',
        bgBadge: 'bg-[#EBF8FF] border-[#BEE3F8]',
      },
      {
        label: 'Actual ROAS',
        value: '797.45%',
        sublabel: '7.9x Return On Ad Spend',
        accentColor: 'text-[#D69E2E]',
        bgBadge: 'bg-[#FEFCBF]/60 border-[#FAF089]',
      },
      {
        label: 'Total Conversions',
        value: '7.98K',
        sublabel: 'Direct Purchases',
        accentColor: 'text-[#E53E3E]',
        bgBadge: 'bg-[#FFEDED] border-[#FED7D7]',
      },
      {
        label: 'Total Ad Spend',
        value: '$233K',
        sublabel: 'Controlled Growth Budget',
        accentColor: 'text-[#38A169]',
        bgBadge: 'bg-[#F0FFF4] border-[#C6F6D5]',
      },
    ],
    keyHighlights: [
      '$1.86M in tracked conversion value generated from $233K ad spend',
      '797.45% verified actual Return on Ad Spend (ROAS)',
      'Advanced conversion tracking and product remarketing architectures',
      'Predictable scaling without degrading acquisition cost efficiency',
    ],
  },
];

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenInquiry,
  onNavigate,
  showBottomWave = true,
}) => {
  const [selectedCaseId, setSelectedCaseId] = useState<string>('diagnostic-lab');
  const [activeCategory, setActiveCategory] = useState<'all' | 'healthcare' | 'meta' | 'scaling'>('all');
  const [zoomImage, setZoomImage] = useState<string | null>(null);

  const selectedCase =
    CASE_STUDIES.find((c) => c.id === selectedCaseId) || CASE_STUDIES[0];

  const filteredCases =
    activeCategory === 'all'
      ? CASE_STUDIES
      : CASE_STUDIES.filter((c) => c.category === activeCategory);

  // Close lightbox modal on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && zoomImage) {
        setZoomImage(null);
      }
    };
    if (typeof window !== 'undefined') {
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [zoomImage]);

  return (
    <section
      className={`relative pt-2 sm:pt-4 lg:pt-6 overflow-hidden ${
        showBottomWave ? 'pb-24 lg:pb-32' : 'pb-14 sm:pb-18 lg:pb-24'
      }`}
    >
      {/* Decorative ambient background aura */}
      <div
        className="pointer-events-none select-none absolute -top-28 -left-24 w-[460px] h-[460px] rounded-full border-[45px] border-[#E4F0D0]/50 opacity-60"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none select-none absolute top-1/4 -right-32 w-[540px] h-[540px] rounded-full bg-[#EAF5D8]/40 blur-3xl opacity-50"
        aria-hidden="true"
      />

      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* ========================================================================= */}
        {/* 1. SECTION HEADER: SEO H1 & VERIFIED PROOF BADGE                          */}
        {/* ========================================================================= */}
        <div className="text-center max-w-[920px] mx-auto mb-8 sm:mb-10">
          {/* Top Authority Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 rounded-full bg-white shadow-[0_4px_14px_rgba(24,59,43,0.06)] border border-[#E2EEDA] mb-4 max-w-full">
            <span className="relative flex h-2.5 w-2.5 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#99BC44] opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#7A9A2E]" />
            </span>
            <span className="text-[12px] sm:text-[13px] font-bold text-[#183B2B] tracking-wide truncate">
              Verified Campaign Performance Portfolio
            </span>
            <span className="text-[#99BC44] font-bold hidden xs:inline">•</span>
            <span className="text-[11.5px] sm:text-[12.5px] font-semibold text-[#7A9A2E] hidden xs:inline">
              Real Dashboard Proof Across UAE & International Markets
            </span>
          </div>

          {/* Primary SEO Heading (Single H1 on Homepage) */}
          <h1 className="text-[30px] xs:text-[36px] sm:text-[44px] lg:text-[50px] font-extrabold text-[#183B2B] leading-[1.14] tracking-tight mb-4 text-balance break-words font-display">
            Healthcare Marketing Agency for Clinics That Demand{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#183B2B] via-[#7A9A2E] to-[#183B2B]">
              Proven Results
            </span>
          </h1>

          {/* Value Subheading */}
          <p className="text-[15px] sm:text-[16.5px] text-[#59665D] leading-[1.65] max-w-[760px] mx-auto break-words">
            We don't make theoretical promises—we deliver verified patient bookings, diagnostic lab
            conversions, and high-ROAS campaign growth. Explore our unedited Google Ads & Meta Ads
            dashboards below to see the exact numbers behind our client success.
          </p>

          {/* Cumulative Milestone Stats Ribbon */}
          <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-3.5 max-w-[880px] mx-auto">
            <div className="p-3 sm:p-3.5 rounded-2xl bg-white/90 border border-[#DFECC8] shadow-xs text-center">
              <div className="text-[20px] sm:text-[24px] font-black text-[#183B2B] font-display">
                dh5.84M+
              </div>
              <div className="text-[11px] font-bold text-[#7A9A2E] uppercase tracking-wider mt-0.5">
                Single Campaign Scale
              </div>
            </div>

            <div className="p-3 sm:p-3.5 rounded-2xl bg-white/90 border border-[#DFECC8] shadow-xs text-center">
              <div className="text-[20px] sm:text-[24px] font-black text-[#E53E3E] font-display">
                24,800+
              </div>
              <div className="text-[11px] font-bold text-[#59665D] uppercase tracking-wider mt-0.5">
                Lab Conversions Generated
              </div>
            </div>

            <div className="p-3 sm:p-3.5 rounded-2xl bg-white/90 border border-[#DFECC8] shadow-xs text-center">
              <div className="text-[20px] sm:text-[24px] font-black text-[#F97316] font-display">
                85.6M+
              </div>
              <div className="text-[11px] font-bold text-[#59665D] uppercase tracking-wider mt-0.5">
                Meta Impressions Reached
              </div>
            </div>

            <div className="p-3 sm:p-3.5 rounded-2xl bg-white/90 border border-[#DFECC8] shadow-xs text-center">
              <div className="text-[20px] sm:text-[24px] font-black text-[#7A9A2E] font-display">
                797%
              </div>
              <div className="text-[11px] font-bold text-[#183B2B] uppercase tracking-wider mt-0.5">
                Peak Tracked ROAS
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 2. THE MAIN PORTFOLIO SHOWCASE CONSOLE                                     */}
        {/* ========================================================================= */}
        <div className="rounded-3xl bg-white border border-[#DFECC8] shadow-[0_20px_60px_rgba(24,59,43,0.08)] overflow-hidden">
          {/* Top Bar with Category Filter Tabs */}
          <div className="bg-[#FAFDF6] border-b border-[#E8F1DC] px-4 sm:px-8 py-3.5 flex flex-wrap items-center justify-between gap-3">
            {/* Left Category Filter Pills */}
            <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
              <span className="text-[11.5px] font-bold text-[#183B2B] uppercase tracking-wider mr-1 hidden sm:inline">
                Filter Proof:
              </span>

              <button
                type="button"
                onClick={() => setActiveCategory('all')}
                className={`px-3 py-1.5 rounded-xl text-[12px] font-bold transition-all cursor-pointer ${
                  activeCategory === 'all'
                    ? 'bg-[#183B2B] text-white shadow-xs'
                    : 'bg-white text-[#59665D] hover:bg-[#EDF5E3] border border-[#DFECC8]'
                }`}
              >
                All Case Studies ({CASE_STUDIES.length})
              </button>

              <button
                type="button"
                onClick={() => setActiveCategory('healthcare')}
                className={`px-3 py-1.5 rounded-xl text-[12px] font-bold transition-all cursor-pointer ${
                  activeCategory === 'healthcare'
                    ? 'bg-[#183B2B] text-white shadow-xs'
                    : 'bg-white text-[#59665D] hover:bg-[#EDF5E3] border border-[#DFECC8]'
                }`}
              >
                🩺 Healthcare & Clinics
              </button>

              <button
                type="button"
                onClick={() => setActiveCategory('meta')}
                className={`px-3 py-1.5 rounded-xl text-[12px] font-bold transition-all cursor-pointer ${
                  activeCategory === 'meta'
                    ? 'bg-[#183B2B] text-white shadow-xs'
                    : 'bg-white text-[#59665D] hover:bg-[#EDF5E3] border border-[#DFECC8]'
                }`}
              >
                📱 Meta Ads (Facebook & IG)
              </button>

              <button
                type="button"
                onClick={() => setActiveCategory('scaling')}
                className={`px-3 py-1.5 rounded-xl text-[12px] font-bold transition-all cursor-pointer ${
                  activeCategory === 'scaling'
                    ? 'bg-[#183B2B] text-white shadow-xs'
                    : 'bg-white text-[#59665D] hover:bg-[#EDF5E3] border border-[#DFECC8]'
                }`}
              >
                📈 High-ROAS Scaling
              </button>
            </div>

            {/* Right Live Security Status */}
            <div className="flex items-center gap-2 text-[11.5px] font-semibold text-[#7A9A2E]">
              <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
              <span>Verified Client Analytics & Dashboards</span>
            </div>
          </div>

          <div className="p-4 sm:p-6 lg:p-8">
            {/* Case Selector Carousel Bar (Horizontal Scrollable Tabs) */}
            <div className="mb-6 overflow-x-auto pb-2 -mx-2 px-2 scrollbar-thin">
              <div className="flex gap-2.5 sm:gap-3 min-w-max">
                {filteredCases.map((cs) => {
                  const isSelected = cs.id === selectedCase.id;
                  return (
                    <button
                      key={cs.id}
                      type="button"
                      onClick={() => setSelectedCaseId(cs.id)}
                      className={`text-left p-2.5 sm:p-3 rounded-2xl transition-all cursor-pointer border max-w-[240px] sm:max-w-[270px] ${
                        isSelected
                          ? 'bg-[#183B2B] text-white border-[#183B2B] shadow-[0_8px_20px_rgba(24,59,43,0.18)] scale-[1.02]'
                          : 'bg-[#F8FAF4] hover:bg-[#EDF5E3] text-[#183B2B] border-[#DFECC8]'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-1 mb-1">
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                            isSelected
                              ? 'bg-white/20 text-white'
                              : 'bg-white text-[#7A9A2E] border border-[#DFECC8]'
                          }`}
                        >
                          {cs.platform}
                        </span>
                        <span
                          className={`text-[10.5px] font-semibold ${
                            isSelected ? 'text-white/80' : 'text-[#7A9A2E]'
                          }`}
                        >
                          {cs.metrics[0].value} {cs.metrics[0].label.split(' ')[0]}
                        </span>
                      </div>
                      <p
                        className={`text-[12.5px] sm:text-[13px] font-bold truncate ${
                          isSelected ? 'text-white' : 'text-[#183B2B]'
                        }`}
                      >
                        {cs.title}
                      </p>
                      <p
                        className={`text-[11px] truncate mt-0.5 ${
                          isSelected ? 'text-white/70' : 'text-[#59665D]'
                        }`}
                      >
                        {cs.subtitle}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* ===================================================================== */}
            {/* 3. SPOTLIGHT CASE STUDY: SCREENSHOT & AUTHENTIC METRICS               */}
            {/* ===================================================================== */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
              {/* Left Column: Real Unedited Dashboard Screenshot Preview (lg:col-span-7) */}
              <div className="lg:col-span-7">
                <div className="rounded-2xl bg-[#F8FAF4] border border-[#DFECC8] p-3 sm:p-4 shadow-sm">
                  {/* Screenshot Header Bar */}
                  <div className="flex items-center justify-between gap-2 mb-3 px-1">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#EF4444]" />
                      <span className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]" />
                      <span className="w-2.5 h-2.5 rounded-full bg-[#10B981]" />
                      <span className="text-[12px] font-bold text-[#183B2B] ml-1">
                        {selectedCase.platform} Live Dashboard
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => setZoomImage(selectedCase.imageSrc)}
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white hover:bg-[#F3F8E9] border border-[#DFECC8] text-[#183B2B] text-[11.5px] font-bold shadow-xs transition-colors cursor-pointer"
                      title="Enlarge screenshot for closer inspection"
                    >
                      <ZoomIn className="w-3.5 h-3.5 text-[#7A9A2E]" />
                      <span>Enlarge Proof</span>
                    </button>
                  </div>

                  {/* Screenshot Container with Click to Zoom */}
                  <div
                    onClick={() => setZoomImage(selectedCase.imageSrc)}
                    className="relative group rounded-xl overflow-hidden bg-white border border-[#DFECC8] shadow-inner cursor-zoom-in aspect-video sm:aspect-auto flex items-center justify-center"
                  >
                    <img
                      src={selectedCase.imageSrc}
                      alt={`${selectedCase.title} verified campaign dashboard results`}
                      className="w-full h-auto max-h-[380px] sm:max-h-[440px] object-contain transition-transform duration-300 group-hover:scale-[1.015]"
                    />

                    {/* Hover Overlay Hint */}
                    <div className="absolute inset-0 bg-black/35 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 text-white font-bold text-sm pointer-events-none">
                      <ZoomIn className="w-5 h-5 text-white" />
                      <span>Click to view full unedited dashboard</span>
                    </div>

                    {/* Verification watermark badge */}
                    <div className="absolute bottom-2.5 right-2.5 px-2.5 py-1 rounded-md bg-[#183B2B]/90 text-white text-[10.5px] font-semibold backdrop-blur-xs flex items-center gap-1.5 shadow-sm">
                      <CheckCircle2 className="w-3 h-3 text-[#10B981]" />
                      <span>Verified Client Campaign</span>
                    </div>
                  </div>

                  {/* Screenshot Caption */}
                  <div className="mt-3 px-1 flex flex-wrap items-center justify-between gap-2 text-[11.5px] text-[#59665D]">
                    <div className="flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-[#7A9A2E]" />
                      <span>Official Google Ads / Meta Ads Manager reporting view</span>
                    </div>
                    <span className="font-semibold text-[#183B2B]">
                      {selectedCase.clientBadge}
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Column: Case Details & Real Metric Cards (lg:col-span-5) */}
              <div className="lg:col-span-5 flex flex-col justify-between h-full">
                <div>
                  {/* Platform & Category Badges */}
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="px-3 py-1 rounded-full bg-[#183B2B] text-white text-[11px] font-bold tracking-wide">
                      {selectedCase.platform}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-[#EAF5D8] text-[#183B2B] text-[11px] font-bold border border-[#DFECC8]">
                      {selectedCase.clientBadge}
                    </span>
                  </div>

                  {/* Title & Subtitle */}
                  <h2 className="text-[22px] sm:text-[26px] font-black text-[#183B2B] leading-tight mb-2 font-display">
                    {selectedCase.title}
                  </h2>
                  <p className="text-[13px] font-bold text-[#7A9A2E] mb-3">
                    {selectedCase.subtitle}
                  </p>

                  {/* Narrative Description */}
                  <p className="text-[13.5px] text-[#59665D] leading-[1.65] mb-5">
                    {selectedCase.description}
                  </p>

                  {/* 4 Dashboard Metrics Grid */}
                  <div className="grid grid-cols-2 gap-2.5 sm:gap-3 mb-5">
                    {selectedCase.metrics.map((m) => (
                      <div
                        key={m.label}
                        className={`p-3 rounded-xl border ${m.bgBadge} transition-all`}
                      >
                        <div className="text-[10.5px] font-bold text-[#59665D] uppercase tracking-wider mb-0.5">
                          {m.label}
                        </div>
                        <div className={`text-xl sm:text-2xl font-black ${m.accentColor} font-display leading-tight`}>
                          {m.value}
                        </div>
                        {m.sublabel && (
                          <div className="text-[10px] text-[#59665D] mt-0.5 truncate">
                            {m.sublabel}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Key Highlights Checklist */}
                  <div className="mb-6 p-3.5 rounded-xl bg-[#F8FAF4] border border-[#E6EFE0]">
                    <div className="text-[11px] font-bold text-[#183B2B] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-[#F97316]" />
                      Campaign Strategy & Takeaways:
                    </div>
                    <ul className="space-y-1.5">
                      {selectedCase.keyHighlights.map((hl, i) => (
                        <li key={i} className="text-[12px] text-[#59665D] flex items-start gap-2 leading-snug">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981] shrink-0 mt-0.5" />
                          <span>{hl}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Bottom CTA Block */}
                <div className="pt-2 border-t border-[#F0F5E8]">
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-3">
                    <button
                      type="button"
                      onClick={() =>
                        onOpenInquiry(
                          `Portfolio Inquiries: ${selectedCase.title} (${selectedCase.platform})`
                        )
                      }
                      className="group flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#F97316] hover:bg-[#EA580C] text-white text-[14.5px] font-bold tracking-wide shadow-[0_10px_24px_rgba(249,115,22,0.32)] hover:shadow-[0_14px_32px_rgba(249,115,22,0.42)] hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F97316]"
                    >
                      <Sparkles className="w-4 h-4 text-white/90" />
                      <span>Get Similar Results For Your Clinic</span>
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </button>

                    <Link
                      href="/services/google-ads-for-clinics/"
                      onClick={() => {
                        onNavigate('service-google-ads');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="inline-flex items-center justify-center px-5 py-3.5 rounded-full bg-[#EAF5D8] hover:bg-[#DFECC8] text-[#183B2B] text-[13.5px] font-bold transition-colors cursor-pointer"
                    >
                      Our Services
                    </Link>
                  </div>

                  {/* Micro Trust Indicators */}
                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-y-1 gap-x-3 text-[11px] font-semibold text-[#59665D]">
                    <span className="inline-flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-[#10B981]" />
                      Month-to-Month Retainers
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3 text-[#7A9A2E]" />
                      HIPAA Conversion Tracking
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Award className="w-3 h-3 text-[#F97316]" />
                      Verified Healthcare Expertise
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 4. LIGHTBOX / FULLSCREEN DASHBOARD MODAL                                   */}
      {/* ========================================================================= */}
      {zoomImage && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6"
          onClick={() => setZoomImage(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="relative bg-white rounded-2xl max-w-[1100px] w-full max-h-[92vh] overflow-hidden shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-5 py-3.5 bg-[#183B2B] text-white">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#10B981]" />
                <span className="text-[14px] font-bold">
                  {selectedCase.title} — Unedited Campaign Dashboard Proof
                </span>
              </div>
              <button
                type="button"
                onClick={() => setZoomImage(null)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Close dashboard inspection"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Image Body */}
            <div className="p-4 sm:p-6 overflow-auto bg-[#F7FAF2] flex items-center justify-center">
              <img
                src={zoomImage}
                alt={`${selectedCase.title} full-resolution dashboard proof`}
                className="w-full h-auto max-h-[75vh] object-contain rounded-lg shadow-sm border border-[#DFECC8]"
              />
            </div>

            {/* Modal Footer */}
            <div className="px-5 py-3 bg-[#FAFDF6] border-t border-[#DFECC8] flex flex-wrap items-center justify-between gap-3 text-xs">
              <span className="text-[#59665D]">
                Platform: <strong className="text-[#183B2B]">{selectedCase.platform}</strong> • Verified Client Result
              </span>
              <button
                type="button"
                onClick={() => {
                  setZoomImage(null);
                  onOpenInquiry(
                    `Inquiry after viewing dashboard proof: ${selectedCase.title}`
                  );
                }}
                className="px-4 py-2 rounded-full bg-[#F97316] hover:bg-[#EA580C] text-white font-bold transition-colors cursor-pointer"
              >
                Discuss Strategy For Your Clinic
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 5. SMOOTH CURVED WAVE BORDER TRANSITION AT BOTTOM                          */}
      {/* ========================================================================= */}
      {showBottomWave && (
        <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden leading-none pointer-events-none">
          <svg
            viewBox="0 0 1440 110"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-[55px] sm:h-[85px] lg:h-[105px] preserve-3d"
            preserveAspectRatio="none"
          >
            <path
              d="M0 25C280 115 640 110 980 50C1190 13 1340 20 1440 45V110H0V25Z"
              fill="#FFFFFF"
            />
          </svg>
        </div>
      )}
    </section>
  );
};
