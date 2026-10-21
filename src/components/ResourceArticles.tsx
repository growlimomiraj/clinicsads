import React from 'react';
import {
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Clock,
  Calendar,
  User,
  ShieldCheck,
  Target,
  Layers,
  PhoneCall,
  Sparkles,
  BarChart3,
  FileCheck2,
} from 'lucide-react';
import { Link } from './Link';
import { SITE_CONFIG } from '../data/siteContent';

interface ResourceArticleProps {
  articleId:
    | 'resource-pre-launch-checklist'
    | 'resource-google-vs-meta'
    | 'resource-landing-page-guide';
  onOpenInquiry: (defaultService?: string) => void;
}

export const ResourceArticle: React.FC<ResourceArticleProps> = ({
  articleId,
  onOpenInquiry,
}) => {
  if (articleId === 'resource-pre-launch-checklist') {
    return (
      <article className="py-12 lg:py-16 bg-white">
        <div className="max-w-[840px] mx-auto px-5 sm:px-8">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-6 text-sm text-[#59665D]">
            <ol className="flex items-center gap-2 flex-wrap">
              <li>
                <Link href="/" className="hover:text-[#183B2B] transition-colors">
                  Home
                </Link>
              </li>
              <span>/</span>
              <li>
                <Link href="/services/" className="hover:text-[#183B2B] transition-colors">
                  Services
                </Link>
              </li>
              <span>/</span>
              <li className="text-[#183B2B] font-semibold">Pre-Launch Checklist</li>
            </ol>
          </nav>

          {/* Article Header */}
          <header className="mb-10 pb-8 border-b border-[#E7F0D8]">
            <span className="inline-block px-3 py-1 rounded-full bg-[#F3F8E9] text-[#7A9A2E] text-xs font-bold uppercase tracking-wider mb-4 border border-[#DFECC8]">
              Healthcare PPC Guide
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-[40px] font-extrabold text-[#183B2B] leading-[1.2] mb-4">
              Google Ads for Clinics: A Practical Pre-Launch Checklist
            </h1>
            <p className="text-lg text-[#59665D] leading-relaxed mb-6">
              A 10-point operational verification checklist to safeguard your ad spend, adhere to healthcare ad policies, eliminate wasted clicks, and prepare your clinic front desk before turning on Google Ads.
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs text-[#59665D]">
              <span className="flex items-center gap-1.5 font-medium">
                <User className="w-4 h-4 text-[#99BC44]" />
                ClinicsAds Healthcare Strategy Team
              </span>
              <span className="flex items-center gap-1.5 font-medium">
                <Calendar className="w-4 h-4 text-[#99BC44]" />
                Updated October 2026
              </span>
              <span className="flex items-center gap-1.5 font-medium">
                <Clock className="w-4 h-4 text-[#99BC44]" />
                7 min read
              </span>
            </div>
          </header>

          {/* Article Body */}
          <div className="prose prose-green max-w-none space-y-8 text-[#59665D] leading-relaxed text-[16px]">
            <p>
              Launching Google Ads for a healthcare practice is fundamentally different from running campaigns for an e-commerce brand or local trade. Healthcare advertising operates under strict Google Ads Healthcare and Medicines policies, regional medical compliance regulations, and distinct patient psychology.
            </p>

            <p>
              Before allocating your clinic's monthly advertising budget, run through this 10-point pre-launch verification to ensure your search campaigns are structured to generate genuine patient inquiries without waste.
            </p>

            {/* Checklist Box */}
            <div className="my-8 p-6 sm:p-8 rounded-[24px] bg-[#F3F8E9] border border-[#DFECC8] space-y-6">
              <h2 className="text-xl sm:text-2xl font-bold text-[#183B2B] flex items-center gap-2.5">
                <FileCheck2 className="w-6 h-6 text-[#99BC44]" />
                The 10-Point Pre-Launch Verification
              </h2>

              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-white border border-[#DFECC8]/60">
                  <h3 className="font-bold text-[#183B2B] text-base mb-1.5 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-[#183B2B] text-white text-xs flex items-center justify-center font-bold">1</span>
                    Local Radius &amp; Negative Geographic Exclusions
                  </h3>
                  <p className="text-sm text-[#59665D]">
                    Ensure your location targeting is set to <em>"Presence: People in or regularly in your targeted locations"</em> rather than <em>"Presence or interest"</em>. If you leave Google's default setting active, users searching from hundreds of miles away will trigger your ads, wasting budget on unreachable patients. Add negative exclusions for surrounding cities outside your clinic’s travel radius.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white border border-[#DFECC8]/60">
                  <h3 className="font-bold text-[#183B2B] text-base mb-1.5 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-[#183B2B] text-white text-xs flex items-center justify-center font-bold">2</span>
                    Healthcare Policy &amp; Prohibited Language Check
                  </h3>
                  <p className="text-sm text-[#59665D]">
                    Google strictly restricts terms relating to prescription drugs, unapproved medical devices, and speculative treatments. Never use guaranteed outcome claims such as "100% cure" or "pain-free guarantee". Ensure all landing page and ad copy focuses on professional clinical evaluations, diagnostic consultations, and patient care.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white border border-[#DFECC8]/60">
                  <h3 className="font-bold text-[#183B2B] text-base mb-1.5 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-[#183B2B] text-white text-xs flex items-center justify-center font-bold">3</span>
                    Comprehensive Negative Keyword Shield
                  </h3>
                  <p className="text-sm text-[#59665D]">
                    Before launching, install a robust negative keyword list across every campaign. Filter out:
                    <br />
                    • <strong>Job Seekers:</strong> "jobs", "careers", "salary", "hiring", "internship"
                    <br />
                    • <strong>Academic/Informational:</strong> "definition", "ppt", "study", "guidelines", "research"
                    <br />
                    • <strong>Irrelevant Providers:</strong> "free clinic", "medicaid dental" (if out of network), "nhs" (in UK)
                    <br />
                    • <strong>DIY &amp; Home Remedies:</strong> "home remedy", "how to treat at home", "diy"
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white border border-[#DFECC8]/60">
                  <h3 className="font-bold text-[#183B2B] text-base mb-1.5 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-[#183B2B] text-white text-xs flex items-center justify-center font-bold">4</span>
                    Single Treatment Ad Group Architecture
                  </h3>
                  <p className="text-sm text-[#59665D]">
                    Never bundle multiple clinic services into a single ad group (e.g. putting "dental implants", "teeth whitening", and "emergency dentist" together). Separate each distinct treatment into its own dedicated ad group with tailored headlines, pin-pointed extensions, and dedicated landing page destinations.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white border border-[#DFECC8]/60">
                  <h3 className="font-bold text-[#183B2B] text-base mb-1.5 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-[#183B2B] text-white text-xs flex items-center justify-center font-bold">5</span>
                    Exact &amp; Phrase Match Tiers (Avoid Broad Match Traps)
                  </h3>
                  <p className="text-sm text-[#59665D]">
                    Begin your clinic campaigns with Phrase match (<code>"dental implants near me"</code>) and Exact match (<code>[private dental clinic london]</code>). Resist Google’s automated recommendations to switch all keywords to Broad match until you have at least 30 verified conversions and comprehensive negative keyword safety nets in place.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white border border-[#DFECC8]/60">
                  <h3 className="font-bold text-[#183B2B] text-base mb-1.5 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-[#183B2B] text-white text-xs flex items-center justify-center font-bold">6</span>
                    Sub-2-Second Dedicated Treatment Landing Page
                  </h3>
                  <p className="text-sm text-[#59665D]">
                    Never send paid traffic to your clinic homepage. A dedicated landing page must answer the specific treatment queried, display doctor qualifications, provide instant click-to-call, and load in under two seconds on mobile devices.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white border border-[#DFECC8]/60">
                  <h3 className="font-bold text-[#183B2B] text-base mb-1.5 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-[#183B2B] text-white text-xs flex items-center justify-center font-bold">7</span>
                    Primary vs. Secondary Conversion Action Audit
                  </h3>
                  <p className="text-sm text-[#59665D]">
                    Ensure only completed patient actions (verified form submissions and phone calls lasting over 60 seconds) are marked as <strong>Primary</strong> conversions in Google Ads. Keep generic pageviews, button clicks, and brief call clicks as Secondary to avoid training Google's Smart Bidding algorithms on low-intent signals.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white border border-[#DFECC8]/60">
                  <h3 className="font-bold text-[#183B2B] text-base mb-1.5 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-[#183B2B] text-white text-xs flex items-center justify-center font-bold">8</span>
                    Call Asset &amp; Location Asset Verification
                  </h3>
                  <p className="text-sm text-[#59665D]">
                    Link your Google Business Profile to your Google Ads account to unlock location assets and Google Maps local search ad placements. Verify that the call asset displays your clinic’s direct reception number with accurate scheduling hours.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white border border-[#DFECC8]/60">
                  <h3 className="font-bold text-[#183B2B] text-base mb-1.5 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-[#183B2B] text-white text-xs flex items-center justify-center font-bold">9</span>
                    Front-Desk Callback Protocol &amp; Intake Routing
                  </h3>
                  <p className="text-sm text-[#59665D]">
                    High-performing ad campaigns fail if clinic reception takes 48 hours to return an inquiry. Establish an operational workflow where form inquiries trigger immediate SMS/email alerts to reception staff, ensuring callbacks happen within 15 minutes during practice hours.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white border border-[#DFECC8]/60">
                  <h3 className="font-bold text-[#183B2B] text-base mb-1.5 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-[#183B2B] text-white text-xs flex items-center justify-center font-bold">10</span>
                    Weekly Search Term Audit Routine
                  </h3>
                  <p className="text-sm text-[#59665D]">
                    Schedule a mandatory weekly review of your <em>Search Terms Report</em>. Identify unexpected search queries, add them as negatives or new targeted variants, and adjust bids based on actual cost-per-inquiry.
                  </p>
                </div>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-[#183B2B] pt-4">
              Next Steps for Your Clinic
            </h2>
            <p>
              By systematically reviewing these 10 points before flipping the switch, your clinic avoids the common trap of spending hundreds of dollars on irrelevant search queries and untracked calls.
            </p>

            <div className="my-8 p-6 rounded-2xl bg-[#183B2B] text-white flex flex-col sm:flex-row items-center justify-between gap-6">
              <div>
                <h3 className="text-lg font-bold text-white mb-1">
                  Want an Expert Audit of Your Clinic's Google Ads?
                </h3>
                <p className="text-sm text-white/80">
                  Our healthcare strategists review your keyword architecture, negative lists, and landing pages on a complimentary discovery call.
                </p>
              </div>
              <button
                type="button"
                onClick={() => onOpenInquiry('Google Ads')}
                className="px-6 py-3 rounded-full bg-[#F97316] text-white text-sm font-bold hover:bg-[#EA580C] transition-colors whitespace-nowrap cursor-pointer shadow-md"
              >
                Schedule Google Ads Review
              </button>
            </div>

            <div className="pt-6 border-t border-[#E7F0D8] flex flex-wrap gap-4 text-sm font-medium text-[#183B2B]">
              <span>Related Services:</span>
              <Link
                href="/services/google-ads-for-clinics/"
                className="text-[#7A9A2E] hover:underline"
              >
                Google Ads for Clinics
              </Link>
              <span>•</span>
              <Link
                href="/services/clinic-landing-pages/"
                className="text-[#7A9A2E] hover:underline"
              >
                Clinic Landing Pages
              </Link>
              <span>•</span>
              <Link
                href="/services/clinic-conversion-tracking/"
                className="text-[#7A9A2E] hover:underline"
              >
                Clinic Conversion Tracking
              </Link>
            </div>
          </div>
        </div>
      </article>
    );
  }

  if (articleId === 'resource-google-vs-meta') {
    return (
      <article className="py-12 lg:py-16 bg-white">
        <div className="max-w-[840px] mx-auto px-5 sm:px-8">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-6 text-sm text-[#59665D]">
            <ol className="flex items-center gap-2 flex-wrap">
              <li>
                <Link href="/" className="hover:text-[#183B2B] transition-colors">
                  Home
                </Link>
              </li>
              <span>/</span>
              <li>
                <Link href="/services/" className="hover:text-[#183B2B] transition-colors">
                  Services
                </Link>
              </li>
              <span>/</span>
              <li className="text-[#183B2B] font-semibold">Google Ads vs. Meta Ads</li>
            </ol>
          </nav>

          {/* Article Header */}
          <header className="mb-10 pb-8 border-b border-[#E7F0D8]">
            <span className="inline-block px-3 py-1 rounded-full bg-[#F3F8E9] text-[#7A9A2E] text-xs font-bold uppercase tracking-wider mb-4 border border-[#DFECC8]">
              Strategy Comparison
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-[40px] font-extrabold text-[#183B2B] leading-[1.2] mb-4">
              Google Ads vs. Meta Ads for Clinics: How to Choose the Right Starting Point
            </h1>
            <p className="text-lg text-[#59665D] leading-relaxed mb-6">
              A comprehensive decision framework comparing search intent, audience discovery, healthcare advertising compliance, and cost economics to help clinic decision-makers choose where to invest first.
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs text-[#59665D]">
              <span className="flex items-center gap-1.5 font-medium">
                <User className="w-4 h-4 text-[#99BC44]" />
                ClinicsAds Healthcare Strategy Team
              </span>
              <span className="flex items-center gap-1.5 font-medium">
                <Calendar className="w-4 h-4 text-[#99BC44]" />
                Updated October 2026
              </span>
              <span className="flex items-center gap-1.5 font-medium">
                <Clock className="w-4 h-4 text-[#99BC44]" />
                8 min read
              </span>
            </div>
          </header>

          {/* Article Body */}
          <div className="prose prose-green max-w-none space-y-8 text-[#59665D] leading-relaxed text-[16px]">
            <p>
              When a healthcare clinic decides to accelerate patient acquisition, the first strategic fork in the road is almost always: <em>"Should we start with Google Ads or Meta Ads (Facebook &amp; Instagram)?"</em>
            </p>

            <p>
              Both platforms are exceptionally powerful, but they solve fundamentally different problems in the patient journey. Selecting the wrong platform for your specific treatment offerings leads to bloated acquisition costs, frustrated clinicians, and premature campaign cancellation.
            </p>

            <h2 className="text-2xl font-bold text-[#183B2B] pt-2">
              The Fundamental Difference: Active Intent vs. Passive Discovery
            </h2>
            <p>
              The single most important distinction between Google Ads and Meta Ads is user mindset:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
              <div className="p-6 rounded-2xl bg-[#F3F8E9] border border-[#DFECC8]">
                <div className="w-10 h-10 rounded-xl bg-[#183B2B] text-[#99BC44] flex items-center justify-center font-bold mb-3">
                  <Target className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-[#183B2B] mb-2">Google Ads: High Intent</h3>
                <p className="text-sm text-[#59665D]">
                  The user has an immediate, recognized need or acute discomfort. They actively open Google and search: <em>"emergency dentist open Saturday"</em>, <em>"physiotherapy for sciatica near me"</em>, or <em>"private MRI scan manchester"</em>. They are actively shopping for a provider right now.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-[#F9FCF4] border border-[#DFECC8]">
                <div className="w-10 h-10 rounded-xl bg-[#183B2B] text-[#99BC44] flex items-center justify-center font-bold mb-3">
                  <Sparkles className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-[#183B2B] mb-2">Meta Ads: Discovery &amp; Desire</h3>
                <p className="text-sm text-[#59665D]">
                  The user is scrolling their Instagram feed to see friends or news. They are not actively searching for a doctor. An engaging video ad shows a patient smile makeover, modern clinic environment, or preventative wellness check. You create desire and local awareness.
                </p>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-[#183B2B] pt-4">
              When Google Ads Is Your Clinic's Best Starting Point
            </h2>
            <p>
              Start with Google Ads if your primary clinical services fit into any of the following categories:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Acute Need &amp; Urgent Care:</strong> Dental pain, sports injuries, urgent scans, sudden skin rashes, acute back pain. Patients do not wait for an Instagram ad when they are hurting.</li>
              <li><strong>High-Value Treatment Searches:</strong> Patients searching specifically for "all-on-4 dental implants", "hip replacement surgeon", or "invisalign provider cost" have already done the basic research and want a consultation.</li>
              <li><strong>Direct Geographic Intent:</strong> Searches ending in "near me", "in [neighborhood]", or "[city] clinic" indicate someone looking for a physical facility they can visit this week.</li>
            </ul>

            <h2 className="text-2xl font-bold text-[#183B2B] pt-4">
              When Meta Ads Is Your Clinic's Best Starting Point
            </h2>
            <p>
              Meta Ads excels for elective, visual, and relationship-driven healthcare specialties:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Cosmetic &amp; Elective Procedures:</strong> Clear aligners, teeth whitening, medspa skin rejuvenation, hair restoration, non-surgical body contouring, preventative health scans.</li>
              <li><strong>New Clinic Launches:</strong> Announcing a state-of-the-art new clinic location to residents living within a 3-mile radius.</li>
              <li><strong>Educational &amp; Trust Building:</strong> Video introductions of the clinical team explaining modern, gentle treatment techniques to overcome dental anxiety or medical hesitancy.</li>
            </ul>

            {/* Decision Matrix Table */}
            <div className="my-8 overflow-x-auto rounded-2xl border border-[#DFECC8]">
              <table className="w-full text-left text-sm">
                <thead className="bg-[#183B2B] text-white">
                  <tr>
                    <th className="p-3.5 font-bold">Evaluation Criteria</th>
                    <th className="p-3.5 font-bold">Google Ads</th>
                    <th className="p-3.5 font-bold">Meta Ads</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E7F0D8] bg-white">
                  <tr>
                    <td className="p-3.5 font-semibold text-[#183B2B]">Patient Intent Level</td>
                    <td className="p-3.5 text-[#59665D]">Immediate / Very High</td>
                    <td className="p-3.5 text-[#59665D]">Passive / Latent</td>
                  </tr>
                  <tr>
                    <td className="p-3.5 font-semibold text-[#183B2B]">Cost Per Click (CPC)</td>
                    <td className="p-3.5 text-[#59665D]">Higher ($3 – $15+ depending on specialty)</td>
                    <td className="p-3.5 text-[#59665D]">Lower ($0.80 – $3.50)</td>
                  </tr>
                  <tr>
                    <td className="p-3.5 font-semibold text-[#183B2B]">Lead Conversion Window</td>
                    <td className="p-3.5 text-[#59665D]">Short (24h to 7 days)</td>
                    <td className="p-3.5 text-[#59665D]">Longer (7 to 45 days nurture)</td>
                  </tr>
                  <tr>
                    <td className="p-3.5 font-semibold text-[#183B2B]">Creative Requirements</td>
                    <td className="p-3.5 text-[#59665D]">Text headlines, copy &amp; search extensions</td>
                    <td className="p-3.5 text-[#59665D]">High-resolution imagery &amp; short video</td>
                  </tr>
                  <tr>
                    <td className="p-3.5 font-semibold text-[#183B2B]">Front Desk Urgency</td>
                    <td className="p-3.5 text-[#59665D]">Critical (Must answer phone immediately)</td>
                    <td className="p-3.5 text-[#59665D]">Rapid callback + automated SMS follow-up</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2 className="text-2xl font-bold text-[#183B2B] pt-4">
              The Hybrid Synergy: The Two-Channel Engine
            </h2>
            <p>
              For established clinics with marketing budgets exceeding $2,500/month, the most resilient strategy is running both platforms cooperatively:
            </p>
            <ol className="list-decimal pl-6 space-y-2">
              <li><strong>Google Ads</strong> captures the top-of-funnel active searchers and converts them directly into immediate consultations.</li>
              <li><strong>Meta Ads</strong> retargets visitors who clicked from Google Ads but didn't book on their first visit, displaying authentic clinician introductions and clinic video tours as they browse Instagram.</li>
            </ol>

            <div className="my-8 p-6 rounded-2xl bg-[#183B2B] text-white flex flex-col sm:flex-row items-center justify-between gap-6">
              <div>
                <h3 className="text-lg font-bold text-white mb-1">
                  Unsure Where Your Clinic Should Start?
                </h3>
                <p className="text-sm text-white/80">
                  Book a strategic consultation with ClinicsAds. We will assess your local patient search volume and recommend the highest-ROI starting channel.
                </p>
              </div>
              <button
                type="button"
                onClick={() => onOpenInquiry('Channel Strategy')}
                className="px-6 py-3 rounded-full bg-[#F97316] text-white text-sm font-bold hover:bg-[#EA580C] transition-colors whitespace-nowrap cursor-pointer shadow-md"
              >
                Discuss Channel Strategy
              </button>
            </div>

            <div className="pt-6 border-t border-[#E7F0D8] flex flex-wrap gap-4 text-sm font-medium text-[#183B2B]">
              <span>Related Services:</span>
              <Link
                href="/services/google-ads-for-clinics/"
                className="text-[#7A9A2E] hover:underline"
              >
                Google Ads for Clinics
              </Link>
              <span>•</span>
              <Link
                href="/services/meta-ads-for-clinics/"
                className="text-[#7A9A2E] hover:underline"
              >
                Meta Ads for Clinics
              </Link>
              <span>•</span>
              <Link
                href="/services/clinic-conversion-tracking/"
                className="text-[#7A9A2E] hover:underline"
              >
                Clinic Conversion Tracking
              </Link>
            </div>
          </div>
        </div>
      </article>
    );
  }

  // resource-landing-page-guide
  return (
    <article className="py-12 lg:py-16 bg-white">
      <div className="max-w-[840px] mx-auto px-5 sm:px-8">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-6 text-sm text-[#59665D]">
          <ol className="flex items-center gap-2 flex-wrap">
            <li>
              <Link href="/" className="hover:text-[#183B2B] transition-colors">
                Home
              </Link>
            </li>
            <span>/</span>
            <li>
              <Link href="/services/" className="hover:text-[#183B2B] transition-colors">
                Services
              </Link>
            </li>
            <span>/</span>
            <li className="text-[#183B2B] font-semibold">Clinic Landing Page Guide</li>
          </ol>
        </nav>

        {/* Article Header */}
        <header className="mb-10 pb-8 border-b border-[#E7F0D8]">
          <span className="inline-block px-3 py-1 rounded-full bg-[#F3F8E9] text-[#7A9A2E] text-xs font-bold uppercase tracking-wider mb-4 border border-[#DFECC8]">
            Conversion Optimization Guide
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-[40px] font-extrabold text-[#183B2B] leading-[1.2] mb-4">
            What a Clinic Landing Page Needs Before You Send Paid Traffic
          </h1>
          <p className="text-lg text-[#59665D] leading-relaxed mb-6">
            Sending expensive Google Ads or Meta traffic to your general homepage is the #1 reason clinic ad campaigns fail. Here are the 7 essential elements every high-converting clinic landing page must have.
          </p>

          <div className="flex flex-wrap items-center gap-4 text-xs text-[#59665D]">
            <span className="flex items-center gap-1.5 font-medium">
              <User className="w-4 h-4 text-[#99BC44]" />
              ClinicsAds Healthcare Strategy Team
            </span>
            <span className="flex items-center gap-1.5 font-medium">
              <Calendar className="w-4 h-4 text-[#99BC44]" />
              Updated October 2026
            </span>
            <span className="flex items-center gap-1.5 font-medium">
              <Clock className="w-4 h-4 text-[#99BC44]" />
              8 min read
            </span>
          </div>
        </header>

        {/* Article Body */}
        <div className="prose prose-green max-w-none space-y-8 text-[#59665D] leading-relaxed text-[16px]">
          <p>
            When prospective patients click your ad, they form an opinion of your clinic in under three seconds. If your landing page is slow, visually cluttered, or forces them to search through a complex 20-item navigation bar to find the treatment they just clicked on, they will tap the back button and visit your competitor.
          </p>

          <p>
            Here is the exact anatomy of a clinic landing page engineered to turn clicks into booked patient consultations.
          </p>

          <div className="my-8 p-6 sm:p-8 rounded-[24px] bg-[#F3F8E9] border border-[#DFECC8] space-y-6">
            <h2 className="text-xl sm:text-2xl font-bold text-[#183B2B] flex items-center gap-2.5">
              <Layers className="w-6 h-6 text-[#99BC44]" />
              The 7 Non-Negotiable Clinic Landing Page Elements
            </h2>

            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-white border border-[#DFECC8]/60">
                <h3 className="font-bold text-[#183B2B] text-base mb-1.5">
                  1. 1-to-1 Ad-to-Headline Message Match
                </h3>
                <p className="text-sm text-[#59665D]">
                  If your Google Ad headline promises <em>"Emergency Dental Care in Bristol"</em>, the H1 headline at the very top of the landing page must immediately state: <em>"Emergency Dental Care in Bristol – Same-Day Relief"</em>. Any disconnect creates hesitation and causes bounce rates to spike.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white border border-[#DFECC8]/60">
                <h3 className="font-bold text-[#183B2B] text-base mb-1.5">
                  2. Sticky Mobile Click-to-Call Header
                </h3>
                <p className="text-sm text-[#59665D]">
                  Over 72% of clinic ad clicks originate on mobile devices. A prominent, persistent click-to-call button with your direct reception phone number must remain accessible at all times without blocking primary reading content.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white border border-[#DFECC8]/60">
                <h3 className="font-bold text-[#183B2B] text-base mb-1.5">
                  3. Verified Clinician Credentials &amp; Practice Photography
                </h3>
                <p className="text-sm text-[#59665D]">
                  Patients trust doctors, not nameless clinical corporations. Feature high-resolution, welcoming photography of the treating doctor, professional registration numbers (GDC, GMC, State Medical Board), and a clean view of the reception and treatment suites. Avoid generic stock photos of smiling models in lab coats.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white border border-[#DFECC8]/60">
                <h3 className="font-bold text-[#183B2B] text-base mb-1.5">
                  4. Transparent Pricing Structure &amp; Insurance Guidelines
                </h3>
                <p className="text-sm text-[#59665D]">
                  Uncertainty around cost is the #1 reason prospective patients abandon medical inquiries. Provide clear starting price ranges (e.g. <em>"Invisalign consultations from $X"</em> or <em>"Transparent consultation fee of $150"</em>), financing options, and accepted health insurance plans.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white border border-[#DFECC8]/60">
                <h3 className="font-bold text-[#183B2B] text-base mb-1.5">
                  5. Frictionless, HIPAA-Aware Consultation Form
                </h3>
                <p className="text-sm text-[#59665D]">
                  Keep initial consultation forms short: Name, Work Email or Phone, Preferred Time, and an optional notes field. Never ask for sensitive diagnostic health history or insurance policy numbers in an initial marketing form. Ensure submission is encrypted over HTTPS with server-side validation.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white border border-[#DFECC8]/60">
                <h3 className="font-bold text-[#183B2B] text-base mb-1.5">
                  6. Interactive Clinic Location Map &amp; Parking Notes
                </h3>
                <p className="text-sm text-[#59665D]">
                  Patients need to know exactly where your practice is located before booking. Display an embedded map, physical address, nearby public transit lines, and on-site parking availability.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white border border-[#DFECC8]/60">
                <h3 className="font-bold text-[#183B2B] text-base mb-1.5">
                  7. Sub-2-Second Load Speed with Zero Layout Shifts
                </h3>
                <p className="text-sm text-[#59665D]">
                  Every second of mobile loading delay cuts conversion rates by up to 20%. Compress all hero photography to modern WebP formats, eliminate bloated third-party chat widgets that block the main thread, and ensure Core Web Vitals pass cleanly.
                </p>
              </div>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-[#183B2B] pt-4">
            Transform Your Paid Traffic into Patient Appointments
          </h2>
          <p>
            When your landing page matches the searcher’s intent, loads instantaneously, and makes scheduling frictionless, your advertising costs drop and your appointment schedule fills with qualified patients.
          </p>

          <div className="my-8 p-6 rounded-2xl bg-[#183B2B] text-white flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-lg font-bold text-white mb-1">
                Need Dedicated Clinic Landing Pages Built for Your Campaigns?
              </h3>
              <p className="text-sm text-white/80">
                ClinicsAds designs and develops fast, compliant healthcare landing pages engineered to maximize patient inquiries from day one.
              </p>
            </div>
            <button
              type="button"
              onClick={() => onOpenInquiry('Landing Pages')}
              className="px-6 py-3 rounded-full bg-[#F97316] text-white text-sm font-bold hover:bg-[#EA580C] transition-colors whitespace-nowrap cursor-pointer shadow-md"
            >
              Request Landing Page Consultation
            </button>
          </div>

          <div className="pt-6 border-t border-[#E7F0D8] flex flex-wrap gap-4 text-sm font-medium text-[#183B2B]">
            <span>Related Services:</span>
            <Link
              href="/services/clinic-landing-pages/"
              className="text-[#7A9A2E] hover:underline"
            >
              Clinic Landing Pages
            </Link>
            <span>•</span>
            <Link
              href="/services/google-ads-for-clinics/"
              className="text-[#7A9A2E] hover:underline"
            >
              Google Ads for Clinics
            </Link>
            <span>•</span>
            <Link
              href="/services/clinic-conversion-tracking/"
              className="text-[#7A9A2E] hover:underline"
            >
              Clinic Conversion Tracking
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
};
