import React, { useState, useId } from 'react';
import {
  Sparkles,
  CheckCircle2,
  ArrowRight,
  Search,
  ShieldCheck,
  TrendingUp,
  DollarSign,
  Phone,
  Calendar,
  Lock,
  ExternalLink,
  Activity,
  Star,
  Zap,
  Sliders,
  Award,
} from 'lucide-react';
import { PageRoute } from '../data/siteContent';
import { Link } from './Link';

interface HeroSectionProps {
  onOpenInquiry: (defaultService?: string) => void;
  onNavigate: (route: PageRoute) => void;
  showBottomWave?: boolean;
}

interface SpecialtyConfig {
  id: string;
  name: string;
  shortName: string;
  iconSymbol: string;
  tag: string;
  baseSearches: number;
  avgCpc: number;
  leadConvRate: number;
  showRate: number;
  avgCaseValue: number;
  adDisplayPath: string;
  adHeadline: string;
  adDescription: string;
  adSitelinks: Array<{ title: string; desc: string }>;
  metaHeadline: string;
  metaCopy: string;
  treatmentPills: string[];
}

const SPECIALTY_CONFIGS: SpecialtyConfig[] = [
  {
    id: 'dental',
    name: 'Dental & Implants',
    shortName: 'Dental',
    iconSymbol: '🦷',
    tag: 'High-Value Restorative',
    baseSearches: 6800,
    avgCpc: 5.2,
    leadConvRate: 0.095,
    showRate: 0.75,
    avgCaseValue: 2800,
    adDisplayPath: 'apexclinic.com/dental-implants',
    adHeadline: 'Top-Rated Dental Implants & Aligners | Same-Day Consultations',
    adDescription:
      'Restore your smile with board-certified implant specialists. 0% financing available, same-day digital scans & painless sedation. 200+ 5-star reviews. Call today to schedule.',
    adSitelinks: [
      { title: 'Same-Day Consultations', desc: 'Reserve 1-on-1 specialist consult' },
      { title: '0% Financing Plans', desc: 'Affordable monthly payment options' },
      { title: 'Full-Arch & Single Implants', desc: 'Permanent, natural-looking replacement' },
      { title: 'Patient Reviews (4.9★)', desc: 'Read 200+ verified patient outcomes' },
    ],
    metaHeadline: 'Wake Up With A Confident, Permanent New Smile',
    metaCopy:
      'Missing teeth or uncomfortable dentures? Our gentle implant specialists use 3D guided surgery for faster healing and natural results. Claim your $150 consultation credit today.',
    treatmentPills: ['Dental Implants', 'All-on-4', 'Clear Aligners', 'Emergency Dentist'],
  },
  {
    id: 'medspa',
    name: 'MedSpa & Aesthetics',
    shortName: 'MedSpa',
    iconSymbol: '✨',
    tag: 'High-Retention Elective',
    baseSearches: 8900,
    avgCpc: 3.9,
    leadConvRate: 0.115,
    showRate: 0.82,
    avgCaseValue: 1200,
    adDisplayPath: 'apexclinic.com/medspa-aesthetics',
    adHeadline: 'Premier Aesthetic Medicine & Botox | Natural, Rejuvenated Results',
    adDescription:
      'Board-certified aesthetic nurse injectors & medical directors. Custom Botox, premium fillers, Morpheus8 & body contouring. Book your private VIP consultation online.',
    adSitelinks: [
      { title: 'VIP Consultations', desc: 'Customized face & skin assessment' },
      { title: 'Botox & Dermal Fillers', desc: 'Subtle, natural wrinkle-smoothing' },
      { title: 'Before & After Gallery', desc: 'Explore untouched patient results' },
      { title: 'Membership Perks', desc: 'Exclusive monthly patient rewards' },
    ],
    metaHeadline: 'Subtle, Natural Rejuvenation By Medical Experts',
    metaCopy:
      'Refresh your natural glow without looking "overdone". Our master injectors customize every treatment to your unique facial anatomy. Book your private consultation today.',
    treatmentPills: ['Botox / Dysport', 'Dermal Fillers', 'Morpheus8', 'Laser Resurfacing'],
  },
  {
    id: 'dermatology',
    name: 'Dermatology & Skin',
    shortName: 'Dermatology',
    iconSymbol: '🩺',
    tag: 'Medical & Surgical',
    baseSearches: 7400,
    avgCpc: 4.5,
    leadConvRate: 0.105,
    showRate: 0.8,
    avgCaseValue: 1650,
    adDisplayPath: 'apexclinic.com/dermatology-clinic',
    adHeadline: 'Board-Certified Dermatologists | Same-Week Appointments Available',
    adDescription:
      'Comprehensive medical, surgical & cosmetic dermatology. Urgent skin cancer screenings, acne protocols & Mohs surgery. Major insurances accepted. Schedule in 60 seconds.',
    adSitelinks: [
      { title: 'Same-Week Appointments', desc: 'Rapid access for urgent skin concerns' },
      { title: 'Skin Cancer Screening', desc: 'Comprehensive full-body mole checks' },
      { title: 'Acne & Rosacea Care', desc: 'Personalized clinical treatment plans' },
      { title: 'Insurances Accepted', desc: 'Verify coverage prior to arrival' },
    ],
    metaHeadline: 'Clear, Healthy Skin Starts With Board-Certified Care',
    metaCopy:
      'Don’t wait 6 months for a dermatology visit. Our clinic offers same-week appointments for rash evaluations, skin cancer screenings, and specialized acne care.',
    treatmentPills: ['Skin Cancer Checks', 'Acne Protocols', 'Mohs Surgery', 'Eczema Relief'],
  },
  {
    id: 'orthopedics',
    name: 'Orthopedics & Spine',
    shortName: 'Orthopedics',
    iconSymbol: '🦴',
    tag: 'High-Margin Surgical',
    baseSearches: 5400,
    avgCpc: 6.1,
    leadConvRate: 0.088,
    showRate: 0.78,
    avgCaseValue: 4200,
    adDisplayPath: 'apexclinic.com/orthopedic-specialists',
    adHeadline: 'Leading Orthopedic Specialists | Minimally Invasive Joint Relief',
    adDescription:
      'Restore your pain-free mobility. Fellowship-trained knee, shoulder & spine orthopedic surgeons. In-house digital MRI & rapid second opinions. Call now to reserve your spot.',
    adSitelinks: [
      { title: 'Rapid Second Opinions', desc: 'Consult fellowship-trained specialists' },
      { title: 'Minimally Invasive Joint Care', desc: 'Faster recovery & outpatient protocols' },
      { title: 'Sports Medicine Triage', desc: 'Rapid acute injury evaluations' },
      { title: 'In-House Digital MRI', desc: 'Same-day diagnostic imaging' },
    ],
    metaHeadline: 'Get Back To The Activities You Love, Without Pain',
    metaCopy:
      'Chronic knee, hip, or back pain holding you back? Our fellowship-trained orthopedic surgeons offer advanced regenerative therapies and minimally invasive solutions.',
    treatmentPills: ['Knee Replacement', 'Spine Care', 'Sports Injuries', 'Regenerative Therapy'],
  },
  {
    id: 'urgent-care',
    name: 'Urgent Care & Walk-In',
    shortName: 'Urgent Care',
    iconSymbol: '⏱️',
    tag: 'High-Volume Immediate',
    baseSearches: 13500,
    avgCpc: 3.4,
    leadConvRate: 0.14,
    showRate: 0.88,
    avgCaseValue: 420,
    adDisplayPath: 'apexclinic.com/urgent-care-walkin',
    adHeadline: 'Top-Rated Walk-In Urgent Care | Open 7 Days | Sub-15 Min Wait',
    adDescription:
      'Immediate medical attention for minor injuries, illness, labs & digital X-ray. On-site pharmacy & pediatric urgent care. Walk in today or save your spot online in advance.',
    adSitelinks: [
      { title: 'Save Spot Online', desc: 'Check current wait times and register' },
      { title: 'On-Site Digital X-Ray', desc: 'Immediate imaging for sprains & breaks' },
      { title: 'Pediatric Urgent Care', desc: 'Child-friendly medical providers' },
      { title: 'Accepted Insurances', desc: 'Affordable self-pay rates available' },
    ],
    metaHeadline: 'Immediate Healthcare When You Need It Most — Open 7 Days',
    metaCopy:
      'Skip the ER wait for non-emergency injuries and illness. Experienced ER physicians & nurses with digital X-ray and labs on-site. Walk in or reserve online.',
    treatmentPills: ['Walk-In Urgent Care', 'Digital X-Ray', 'Pediatric Care', 'Rapid Labs'],
  },
];

const BUDGET_PRESETS = [2000, 3500, 5000, 8000];

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenInquiry,
  onNavigate,
  showBottomWave = true,
}) => {
  const [selectedSpecialtyId, setSelectedSpecialtyId] = useState<string>('dental');
  const [monthlyBudget, setMonthlyBudget] = useState<number>(4000);
  const [activeTab, setActiveTab] = useState<'google' | 'meta' | 'safeguards'>('google');

  const sliderId = useId();

  const currentSpecialty =
    SPECIALTY_CONFIGS.find((s) => s.id === selectedSpecialtyId) || SPECIALTY_CONFIGS[0];

  // Dynamic calculations based on specialty economics & budget
  const budgetRatio = monthlyBudget / 4000;
  const estimatedSearches = Math.round(
    currentSpecialty.baseSearches * (0.85 + budgetRatio * 0.35)
  );

  const clicks = Math.round(monthlyBudget / currentSpecialty.avgCpc);
  const inquiriesMid = clicks * currentSpecialty.leadConvRate;
  const inquiriesLow = Math.max(8, Math.round(inquiriesMid * 0.88));
  const inquiriesHigh = Math.max(12, Math.round(inquiriesMid * 1.16));

  const consultsMid = ((inquiriesLow + inquiriesHigh) / 2) * currentSpecialty.showRate;
  const prodLow = Math.round(consultsMid * (currentSpecialty.avgCaseValue * 0.36));
  const prodHigh = Math.round(consultsMid * (currentSpecialty.avgCaseValue * 0.52));

  const roasLow = (prodLow / monthlyBudget).toFixed(1);
  const roasHigh = (prodHigh / monthlyBudget).toFixed(1);

  // Formatter helpers
  const formatCurrency = (val: number) => {
    if (val >= 1000) {
      return `$${val.toLocaleString()}`;
    }
    return `$${val}`;
  };

  const formatK = (val: number) => {
    if (val >= 1000000) {
      return `${(val / 1000000).toFixed(1)}M`;
    }
    if (val >= 1000) {
      return `${Math.round(val / 1000)}k`;
    }
    return `${val}`;
  };

  const getRadiusBadge = (budget: number) => {
    if (budget < 3000) {
      return {
        text: 'Starter Local Radius (5–8 miles)',
        color: 'text-[#183B2B] bg-[#E8F3D6] border-[#D4E8B7]',
      };
    }
    if (budget <= 6500) {
      return {
        text: 'Core Practice Radius (10–15 miles)',
        color: 'text-[#183B2B] bg-[#E1EED0] border-[#C8DFAC]',
      };
    }
    return {
      text: 'Regional Dominance (20+ miles)',
      color: 'text-[#F97316] bg-[#FFF3EB] border-[#FED7AA]',
    };
  };

  const radiusBadge = getRadiusBadge(monthlyBudget);

  const handleClaimRadius = () => {
    onOpenInquiry(
      `Google Ads for ${currentSpecialty.name} (${formatCurrency(monthlyBudget)}/mo target budget)`
    );
  };

  return (
    <section className={`relative pt-2 sm:pt-4 lg:pt-6 overflow-hidden ${showBottomWave ? 'pb-24 lg:pb-32' : 'pb-14 sm:pb-18 lg:pb-24'}`}>
      {/* Decorative ambient background aura */}
      <div
        className="pointer-events-none select-none absolute -top-28 -left-24 w-[420px] h-[420px] rounded-full border-[45px] border-[#E4F0D0]/50 opacity-60"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none select-none absolute top-1/3 -right-32 w-[520px] h-[520px] rounded-full bg-[#EAF5D8]/40 blur-3xl opacity-50"
        aria-hidden="true"
      />

      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* ========================================================================= */}
        {/* 1. SECTION HEADER: SEO H1 & AUTHORITY BADGE                               */}
        {/* ========================================================================= */}
        <div className="text-center max-w-[900px] mx-auto mb-8 sm:mb-10">
          {/* Top Authority Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 rounded-full bg-white shadow-[0_4px_14px_rgba(24,59,43,0.06)] border border-[#E2EEDA] mb-4 max-w-full">
            <span className="relative flex h-2.5 w-2.5 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#99BC44] opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#7A9A2E]" />
            </span>
            <span className="text-[12px] sm:text-[13px] font-bold text-[#183B2B] tracking-wide truncate">
              Interactive Patient Acquisition Engine
            </span>
            <span className="text-[#99BC44] font-bold hidden xs:inline">•</span>
            <span className="text-[11.5px] sm:text-[12.5px] font-semibold text-[#7A9A2E] hidden xs:inline">
              HIPAA-Compliant Healthcare PPC
            </span>
          </div>

          {/* Primary SEO Heading (Single H1 on Homepage) */}
          <h1 className="text-[30px] xs:text-[36px] sm:text-[44px] lg:text-[50px] font-extrabold text-[#183B2B] leading-[1.14] tracking-tight mb-4 text-balance break-words font-display">
            Healthcare Marketing Agency for Clinics That Demand{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#183B2B] via-[#7A9A2E] to-[#183B2B]">
              Qualified Patient Growth
            </span>
          </h1>

          {/* Value Subheading */}
          <p className="text-[15px] sm:text-[16.5px] text-[#59665D] leading-[1.65] max-w-[740px] mx-auto break-words">
            Stop burning ad spend on unqualified clicks and low-intent web traffic. Select your
            practice specialty and target ad budget below to simulate projected consultations,
            local search demand, and live ad creative in your radius.
          </p>
        </div>

        {/* ========================================================================= */}
        {/* 2. THE SIMULATOR CONSOLE CONTAINER                                        */}
        {/* ========================================================================= */}
        <div className="rounded-3xl bg-white border border-[#DFECC8] shadow-[0_20px_60px_rgba(24,59,43,0.08)] overflow-hidden">
          {/* Top Console Bar */}
          <div className="bg-[#FAFDF6] border-b border-[#E8F1DC] px-5 sm:px-8 py-3.5 flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#10B981]" />
              <span className="font-bold text-[#183B2B] tracking-wide">
                Live Clinic Benchmark Console
              </span>
              <span className="hidden sm:inline text-[#7A9A2E] bg-[#EAF5D8] px-2 py-0.5 rounded-full text-[11px] font-semibold">
                Updated for 2026 CPC Benchmarks
              </span>
            </div>

            <div className="flex items-center gap-3 text-[#59665D] text-[12px]">
              <span className="inline-flex items-center gap-1">
                <Lock className="w-3.5 h-3.5 text-[#7A9A2E]" />
                HIPAA-Compliant
              </span>
              <span className="hidden xs:inline">•</span>
              <span className="inline-flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#7A9A2E]" />
                Month-to-Month
              </span>
            </div>
          </div>

          <div className="p-5 sm:p-7 lg:p-9">
            {/* Step 1: Specialty Selector */}
            <div className="mb-7">
              <div className="flex items-center justify-between mb-3">
                <label className="text-[13px] sm:text-[14px] font-bold text-[#183B2B] tracking-wide flex items-center gap-1.5">
                  <span className="w-5 h-5 rounded-full bg-[#183B2B] text-white text-[11px] font-bold flex items-center justify-center">
                    1
                  </span>
                  Select Your Clinic Specialty
                </label>
                <span className="text-[12px] font-semibold text-[#7A9A2E]">
                  {currentSpecialty.tag}
                </span>
              </div>

              {/* Specialty Pills Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-2.5">
                {SPECIALTY_CONFIGS.map((specialty) => {
                  const isSelected = specialty.id === selectedSpecialtyId;
                  return (
                    <button
                      key={specialty.id}
                      type="button"
                      onClick={() => setSelectedSpecialtyId(specialty.id)}
                      className={`relative flex items-center gap-2 px-3 sm:px-3.5 py-2.5 rounded-xl text-left transition-all cursor-pointer min-w-0 ${
                        isSelected
                          ? 'bg-[#183B2B] text-white shadow-[0_8px_20px_rgba(24,59,43,0.18)] scale-[1.02]'
                          : 'bg-[#F7FAF2] hover:bg-[#EDF5E3] text-[#183B2B] border border-[#E3EED5]'
                      }`}
                    >
                      <span className="text-lg shrink-0">{specialty.iconSymbol}</span>
                      <div className="min-w-0 flex-1">
                        <p
                          className={`text-[12px] sm:text-[13px] font-bold truncate leading-tight ${
                            isSelected ? 'text-white' : 'text-[#183B2B]'
                          }`}
                        >
                          {specialty.shortName}
                        </p>
                        <p
                          className={`text-[10px] truncate leading-tight mt-0.5 ${
                            isSelected ? 'text-white/80' : 'text-[#59665D]'
                          }`}
                        >
                          {specialty.tag}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Budget Slider & Quick Presets */}
            <div className="mb-8 p-4 sm:p-5 rounded-2xl bg-[#F8FAF4] border border-[#E6EFE0]">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                <label
                  htmlFor={sliderId}
                  className="text-[13px] sm:text-[14px] font-bold text-[#183B2B] tracking-wide flex items-center gap-1.5"
                >
                  <span className="w-5 h-5 rounded-full bg-[#183B2B] text-white text-[11px] font-bold flex items-center justify-center">
                    2
                  </span>
                  Monthly Ad Spend Target
                </label>

                {/* Radius Recommendation Badge */}
                <span
                  className={`text-[11.5px] font-bold px-3 py-1 rounded-full border ${radiusBadge.color}`}
                >
                  {radiusBadge.text}
                </span>
              </div>

              {/* Spend Display & Slider Controls */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl sm:text-4xl font-black text-[#183B2B] tracking-tight font-display">
                    {formatCurrency(monthlyBudget)}
                  </span>
                  <span className="text-[13px] sm:text-[14px] font-semibold text-[#59665D]">
                    / month in paid search & social ads
                  </span>
                </div>

                {/* Quick Presets */}
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="text-[11px] font-bold text-[#7A9A2E] uppercase tracking-wider mr-1">
                    Presets:
                  </span>
                  {BUDGET_PRESETS.map((preset) => {
                    const isPresetSelected = monthlyBudget === preset;
                    return (
                      <button
                        key={preset}
                        type="button"
                        onClick={() => setMonthlyBudget(preset)}
                        className={`px-2.5 py-1 rounded-lg text-[11.5px] font-bold transition-all cursor-pointer ${
                          isPresetSelected
                            ? 'bg-[#F97316] text-white shadow-sm'
                            : 'bg-white text-[#183B2B] border border-[#DFECC8] hover:bg-[#F3F8E9]'
                        }`}
                      >
                        {formatCurrency(preset)}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Range Slider Track */}
              <div className="relative flex items-center w-full">
                <input
                  id={sliderId}
                  type="range"
                  min="1500"
                  max="12000"
                  step="500"
                  value={monthlyBudget}
                  onChange={(e) => setMonthlyBudget(Number(e.target.value))}
                  className="w-full h-3 bg-[#E2EEDA] rounded-lg appearance-none cursor-pointer accent-[#F97316] focus:outline-none"
                  aria-label="Monthly advertising budget slider"
                />
              </div>

              <div className="flex justify-between items-center text-[11px] text-[#7A9A2E] font-semibold mt-2">
                <span>$1,500/mo (Single Specialty Minimum)</span>
                <span>$6,000/mo (Multi-Radius Growth)</span>
                <span>$12,000+/mo (Regional Network)</span>
              </div>
            </div>

            {/* ===================================================================== */}
            {/* 3. DUAL COLUMN: REAL-TIME PROJECTIONS VS LIVE AD PREVIEW              */}
            {/* ===================================================================== */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
              {/* Left Column: 4 Real-Time Outcome Metrics (lg:col-span-6) */}
              <div className="lg:col-span-6 flex flex-col justify-between h-full">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-[13px] font-bold text-[#183B2B] tracking-wide uppercase">
                      Projected Monthly Performance
                    </p>
                    <span className="text-[11px] font-semibold text-[#59665D]">
                      Benchmark: {currentSpecialty.shortName}
                    </span>
                  </div>

                  {/* 4 Outcome Stat Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-3.5 mb-6">
                    {/* Stat 1: Searches */}
                    <div className="p-4 rounded-2xl bg-gradient-to-br from-[#FAFDF6] to-[#F1F8E8] border border-[#E3EFD5]">
                      <div className="flex items-center justify-between text-[#7A9A2E] mb-1">
                        <span className="text-[11px] font-bold uppercase tracking-wider">
                          Search Demand
                        </span>
                        <Search className="w-4 h-4 text-[#7A9A2E]" />
                      </div>
                      <div className="text-2xl sm:text-3xl font-extrabold text-[#183B2B] font-display">
                        {estimatedSearches.toLocaleString()}+
                      </div>
                      <p className="text-[11.5px] text-[#59665D] mt-1 leading-snug">
                        Local monthly patient searches inside your geographic travel radius
                      </p>
                    </div>

                    {/* Stat 2: Inquiries */}
                    <div className="p-4 rounded-2xl bg-gradient-to-br from-[#FFFBF7] to-[#FDF4ED] border border-[#FED7AA]">
                      <div className="flex items-center justify-between text-[#F97316] mb-1">
                        <span className="text-[11px] font-bold uppercase tracking-wider">
                          Qualified Consults
                        </span>
                        <Calendar className="w-4 h-4 text-[#F97316]" />
                      </div>
                      <div className="text-2xl sm:text-3xl font-extrabold text-[#F97316] font-display">
                        {inquiriesLow} – {inquiriesHigh}
                      </div>
                      <p className="text-[11.5px] text-[#59665D] mt-1 leading-snug">
                        High-intent phone calls and booked consultation requests per month
                      </p>
                    </div>

                    {/* Stat 3: Production Impact */}
                    <div className="p-4 rounded-2xl bg-gradient-to-br from-[#FAFDF6] to-[#F1F8E8] border border-[#E3EFD5]">
                      <div className="flex items-center justify-between text-[#183B2B] mb-1">
                        <span className="text-[11px] font-bold uppercase tracking-wider">
                          Monthly Production
                        </span>
                        <TrendingUp className="w-4 h-4 text-[#183B2B]" />
                      </div>
                      <div className="text-2xl sm:text-3xl font-extrabold text-[#183B2B] font-display">
                        ${formatK(prodLow)} – ${formatK(prodHigh)}
                      </div>
                      <p className="text-[11.5px] text-[#59665D] mt-1 leading-snug">
                        Est. treatment production impact based on accepted treatment plans
                      </p>
                    </div>

                    {/* Stat 4: ROAS */}
                    <div className="p-4 rounded-2xl bg-gradient-to-br from-[#FAFDF6] to-[#F1F8E8] border border-[#E3EFD5]">
                      <div className="flex items-center justify-between text-[#7A9A2E] mb-1">
                        <span className="text-[11px] font-bold uppercase tracking-wider">
                          Target ROAS
                        </span>
                        <Activity className="w-4 h-4 text-[#7A9A2E]" />
                      </div>
                      <div className="text-2xl sm:text-3xl font-extrabold text-[#7A9A2E] font-display">
                        {roasLow}x – {roasHigh}x
                      </div>
                      <p className="text-[11.5px] text-[#59665D] mt-1 leading-snug">
                        Target Return On Ad Spend with verified conversion tracking
                      </p>
                    </div>
                  </div>

                  {/* Specialty Treatments Pill Bar */}
                  <div className="mb-6 p-3.5 rounded-xl bg-[#F7FAF2] border border-[#E6EFE0]">
                    <div className="text-[11px] font-bold text-[#183B2B] uppercase tracking-wider mb-2">
                      Priority High-Intent Keywords Included:
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {currentSpecialty.treatmentPills.map((pill) => (
                        <span
                          key={pill}
                          className="px-2.5 py-1 rounded-full bg-white text-[#183B2B] text-[11px] font-semibold border border-[#DFECC8] shadow-xs"
                        >
                          + {pill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* CTA Action Area */}
                <div className="pt-2">
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-3">
                    <button
                      type="button"
                      onClick={handleClaimRadius}
                      className="group flex-1 inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full bg-[#F97316] hover:bg-[#EA580C] text-white text-[15px] font-bold tracking-wide shadow-[0_10px_24px_rgba(249,115,22,0.32)] hover:shadow-[0_14px_32px_rgba(249,115,22,0.42)] hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F97316]"
                    >
                      <Sparkles className="w-4 h-4 text-white/90" />
                      <span>Claim Your Clinic’s Radius</span>
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </button>

                    <Link
                      href="/services/google-ads-for-clinics/"
                      onClick={() => {
                        onNavigate('service-google-ads');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="inline-flex items-center justify-center px-6 py-4 rounded-full bg-[#EAF5D8] hover:bg-[#DFECC8] text-[#183B2B] text-[14px] font-bold transition-colors cursor-pointer"
                    >
                      View Framework
                    </Link>
                  </div>

                  {/* Micro Trust Indicators */}
                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-y-1.5 gap-x-4 text-[11.5px] font-semibold text-[#59665D]">
                    <span className="inline-flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981]" />
                      Zero Long-Term Lock-Ins
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Zap className="w-3.5 h-3.5 text-[#F97316]" />
                      7-Day Rapid Launch
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#7A9A2E]" />
                      HIPAA Server-Side Tracking
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Column: Live Ad Preview & Safety Shields (lg:col-span-6) */}
              <div className="lg:col-span-6">
                <div className="rounded-2xl bg-[#F8FAF4] border border-[#DFECC8] p-4 sm:p-5 shadow-inner">
                  {/* Preview Tab Switcher */}
                  <div className="flex items-center justify-between gap-1 mb-4 pb-3 border-b border-[#E2EEDA]">
                    <div className="flex items-center gap-1 sm:gap-2">
                      <button
                        type="button"
                        onClick={() => setActiveTab('google')}
                        className={`px-3 py-1.5 rounded-lg text-[12px] font-bold transition-all cursor-pointer ${
                          activeTab === 'google'
                            ? 'bg-[#183B2B] text-white shadow-xs'
                            : 'bg-white text-[#59665D] hover:bg-[#EFF6E4] border border-[#E2EEDA]'
                        }`}
                      >
                        Google Search (PPC)
                      </button>

                      <button
                        type="button"
                        onClick={() => setActiveTab('meta')}
                        className={`px-3 py-1.5 rounded-lg text-[12px] font-bold transition-all cursor-pointer ${
                          activeTab === 'meta'
                            ? 'bg-[#183B2B] text-white shadow-xs'
                            : 'bg-white text-[#59665D] hover:bg-[#EFF6E4] border border-[#E2EEDA]'
                        }`}
                      >
                        Meta Social Ad
                      </button>

                      <button
                        type="button"
                        onClick={() => setActiveTab('safeguards')}
                        className={`px-3 py-1.5 rounded-lg text-[12px] font-bold transition-all cursor-pointer ${
                          activeTab === 'safeguards'
                            ? 'bg-[#183B2B] text-white shadow-xs'
                            : 'bg-white text-[#59665D] hover:bg-[#EFF6E4] border border-[#E2EEDA]'
                        }`}
                      >
                        Safety Shields (4)
                      </button>
                    </div>

                    <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-bold text-[#7A9A2E] bg-[#EAF5D8] px-2 py-0.5 rounded-md">
                      Live Preview
                    </span>
                  </div>

                  {/* TAB 1: GOOGLE SEARCH AD PREVIEW */}
                  {activeTab === 'google' && (
                    <div className="bg-white rounded-xl p-4 sm:p-5 border border-[#DFECC8] shadow-sm">
                      {/* Browser address preview */}
                      <div className="flex items-center gap-2 mb-3 text-[11px] text-[#59665D] bg-[#F8FAF4] px-3 py-1 rounded-md border border-[#EAF2DE] truncate">
                        <span className="font-bold text-[#183B2B]">Google</span>
                        <span>•</span>
                        <span className="truncate">
                          https://www.google.com/search?q={encodeURIComponent(currentSpecialty.treatmentPills[0].toLowerCase())}
                        </span>
                      </div>

                      {/* Sponsored Label & Clinic URL */}
                      <div className="flex items-center gap-2 text-[12px] text-[#59665D] mb-1">
                        <span className="font-bold text-[#183B2B] bg-[#F1F8E8] px-1.5 py-0.5 rounded text-[11px] border border-[#DFECC8]">
                          Sponsored
                        </span>
                        <span className="truncate">https://www.{currentSpecialty.adDisplayPath}</span>
                      </div>

                      {/* Clinic Name & Reviews */}
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="text-[14px] font-bold text-[#183B2B]">
                          Apex {currentSpecialty.shortName} Specialists
                        </span>
                        <div className="flex items-center text-[#F59E0B] text-[11px] font-bold">
                          <Star className="w-3 h-3 fill-current inline mr-0.5" />
                          5.0 (148 reviews)
                        </div>
                      </div>

                      {/* Ad Headline */}
                      <h2 className="text-[16px] sm:text-[17px] font-bold text-[#1A0DAB] hover:underline cursor-pointer leading-snug mb-2 break-words">
                        {currentSpecialty.adHeadline}
                      </h2>

                      {/* Ad Description */}
                      <p className="text-[13px] text-[#4D5156] leading-[1.5] mb-3 break-words">
                        {currentSpecialty.adDescription}
                      </p>

                      {/* Call Asset */}
                      <div className="mb-3 inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-[#F8FAF4] border border-[#E2EEDA] text-[12px] text-[#183B2B] font-semibold">
                        <Phone className="w-3.5 h-3.5 text-[#10B981]" />
                        <span>Call Practice: +1 (667) 347-4729</span>
                      </div>

                      {/* Sitelinks Extensions (2x2) */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 border-t border-[#F0F5E8]">
                        {currentSpecialty.adSitelinks.map((link) => (
                          <div
                            key={link.title}
                            className="p-2 rounded-lg bg-[#FAFDF6] border border-[#E8F1DC] hover:border-[#99BC44] transition-colors"
                          >
                            <span className="text-[12px] font-bold text-[#1A0DAB] block leading-tight">
                              {link.title}
                            </span>
                            <span className="text-[10.5px] text-[#59665D] block leading-tight mt-0.5">
                              {link.desc}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Footer Badge */}
                      <div className="mt-3 pt-2 border-t border-[#F0F5E8] flex items-center justify-between text-[11px] text-[#7A9A2E] font-medium">
                        <span>Bid Priority: #1 Top of Page Search</span>
                        <span>Quality Score Target: 9/10</span>
                      </div>
                    </div>
                  )}

                  {/* TAB 2: META SOCIAL AD PREVIEW */}
                  {activeTab === 'meta' && (
                    <div className="bg-white rounded-xl p-4 sm:p-5 border border-[#DFECC8] shadow-sm">
                      {/* Meta Profile Bar */}
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2.5">
                          <div className="w-9 h-9 rounded-full bg-[#183B2B] text-white flex items-center justify-center font-bold text-sm">
                            {currentSpecialty.iconSymbol}
                          </div>
                          <div>
                            <div className="flex items-center gap-1">
                              <span className="text-[13px] font-bold text-[#183B2B]">
                                Apex {currentSpecialty.shortName} Clinic
                              </span>
                              <CheckCircle2 className="w-3.5 h-3.5 text-[#3B82F6]" />
                            </div>
                            <span className="text-[11px] text-[#59665D]">Sponsored • Instagram & Facebook</span>
                          </div>
                        </div>

                        <span className="text-[11px] font-bold text-[#F97316] bg-[#FFF3EB] px-2 py-0.5 rounded-full">
                          Local Radius Target
                        </span>
                      </div>

                      {/* Social Ad Copy */}
                      <p className="text-[13px] text-[#183B2B] font-medium leading-relaxed mb-3">
                        {currentSpecialty.metaCopy}
                      </p>

                      {/* Creative Visual Simulation Box */}
                      <div className="rounded-xl bg-gradient-to-br from-[#183B2B] via-[#2A5943] to-[#183B2B] p-5 text-white mb-3 text-center relative overflow-hidden">
                        <div className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-white/20 text-[10px] font-bold tracking-wider uppercase">
                          New Patient Special
                        </div>
                        <span className="text-3xl mb-2 block">{currentSpecialty.iconSymbol}</span>
                        <h4 className="text-[16px] font-bold mb-1 leading-snug">
                          {currentSpecialty.metaHeadline}
                        </h4>
                        <p className="text-[12px] text-white/80 max-w-[320px] mx-auto leading-tight">
                          Private consultations available this week. Same-day treatment plans & clear pricing.
                        </p>
                      </div>

                      {/* Social Ad Action Bar */}
                      <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#F8FAF4] border border-[#E6EFE0]">
                        <div className="text-left">
                          <span className="text-[10px] uppercase font-bold text-[#59665D] tracking-wider block">
                            apexclinic.com
                          </span>
                          <span className="text-[12px] font-bold text-[#183B2B] block">
                            Book Your Initial Consultation
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={handleClaimRadius}
                          className="px-3 py-1.5 rounded-md bg-[#F97316] hover:bg-[#EA580C] text-white text-[11.5px] font-bold transition-colors cursor-pointer"
                        >
                          Book Now
                        </button>
                      </div>
                    </div>
                  )}

                  {/* TAB 3: SAFETY SHIELDS PREVIEW */}
                  {activeTab === 'safeguards' && (
                    <div className="bg-white rounded-xl p-4 sm:p-5 border border-[#DFECC8] shadow-sm space-y-3">
                      <div className="text-[13px] font-bold text-[#183B2B] mb-1">
                        4 Layer Ad Spend Protection Standard
                      </div>

                      <div className="p-3 rounded-lg bg-[#FAFDF6] border border-[#E8F1DC]">
                        <div className="flex items-center gap-2 mb-1">
                          <ShieldCheck className="w-4 h-4 text-[#10B981]" />
                          <span className="text-[12.5px] font-bold text-[#183B2B]">
                            500+ Healthcare Negative Keyword Shield
                          </span>
                        </div>
                        <p className="text-[11.5px] text-[#59665D] leading-relaxed">
                          Blocks non-converting traffic like "free clinic", "home remedies", "dental assistant jobs", and student inquiries before your budget is billed.
                        </p>
                      </div>

                      <div className="p-3 rounded-lg bg-[#FAFDF6] border border-[#E8F1DC]">
                        <div className="flex items-center gap-2 mb-1">
                          <Zap className="w-4 h-4 text-[#F97316]" />
                          <span className="text-[12.5px] font-bold text-[#183B2B]">
                            Sub-2s Mobile-Optimized Clinic Landing Pages
                          </span>
                        </div>
                        <p className="text-[11.5px] text-[#59665D] leading-relaxed">
                          Converts incoming smartphone traffic at 2.8x higher rates than bloated hospital websites with instant tap-to-call and quick intake forms.
                        </p>
                      </div>

                      <div className="p-3 rounded-lg bg-[#FAFDF6] border border-[#E8F1DC]">
                        <div className="flex items-center gap-2 mb-1">
                          <Lock className="w-4 h-4 text-[#7A9A2E]" />
                          <span className="text-[12.5px] font-bold text-[#183B2B]">
                            HIPAA-Compliant Server-Side Conversion Attribution
                          </span>
                        </div>
                        <p className="text-[11.5px] text-[#59665D] leading-relaxed">
                          Full visibility into which search terms drove booked patients into your clinic management software without compromising patient health information.
                        </p>
                      </div>

                      <div className="p-3 rounded-lg bg-[#FAFDF6] border border-[#E8F1DC]">
                        <div className="flex items-center gap-2 mb-1">
                          <CheckCircle2 className="w-4 h-4 text-[#183B2B]" />
                          <span className="text-[12.5px] font-bold text-[#183B2B]">
                            Month-to-Month Retainer (Zero 12-Month Traps)
                          </span>
                        </div>
                        <p className="text-[11.5px] text-[#59665D] leading-relaxed">
                          We earn your trust through qualified patient inquiries every 30 days. No restrictive multi-year contracts.
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Simulator Footnote */}
                  <div className="mt-3 text-center">
                    <p className="text-[11px] text-[#7A9A2E] font-medium">
                      Simulated metrics reflect verified private clinic campaign averages across US metro & suburban radii.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 4. SMOOTH CURVED WAVE BORDER TRANSITION AT BOTTOM                          */}
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
