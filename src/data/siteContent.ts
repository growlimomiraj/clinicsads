export type PageRoute =
  | 'home'
  | 'services'
  | 'why-clinicsads'
  | 'about'
  | 'solutions'
  | 'contact'
  | 'service-google-ads'
  | 'service-meta-ads'
  | 'service-landing-pages'
  | 'service-tracking-followup'
  | 'service-gpt'
  | 'service-seo'
  | 'solution-clinic-landing-pages'
  | 'solution-chatgpt-ads-ai-search'
  | 'resource-pre-launch-checklist'
  | 'resource-google-vs-meta'
  | 'resource-landing-page-guide'
  | 'not-found'
  | 'admin';

export interface NavItem {
  label: string;
  route: PageRoute;
  sectionId: string;
}

export interface ServiceCardData {
  id: string;
  route: PageRoute;
  path: string;
  title: string;
  description: string;
  featured?: boolean;
  iconName:
    | 'google-ads'
    | 'google'
    | 'meta'
    | 'landing-pages'
    | 'analytics'
    | 'gpt'
    | 'seo'
    | 'search'
    | 'users'
    | 'layout'
    | 'activity'
    | 'bot'
    | 'trending-up';
  details: {
    tagline: string;
    overview: string;
    valueProposition?: string;
    deliverables: string[];
    methodology: string[];
    idealFor: string;
    clientProvides?: string[];
    faq: { question: string; answer: string }[];
  };
}

export interface WhyChooseFeature {
  id: string;
  title: string;
  description: string;
  iconName: 'check-circle' | 'bar-chart';
}

export interface SolutionCardData {
  id: string;
  route: PageRoute;
  title: string;
  description: string;
  buttonLabel: string;
  variant: 'primary-green' | 'secondary-white';
  iconName: 'heart-handshake' | 'sparkles';
  modalDetails: {
    subtitle: string;
    summary: string;
    keyPoints: string[];
    methodology: string[];
    note?: string;
    faq: { question: string; answer: string }[];
  };
}

export interface TestimonialItem {
  id: string;
  quote: string;
  authorName: string;
  authorRole: string;
  clinicName?: string;
  portraitId: string;
  portraitAlt: string;
  approved: boolean;
}

export interface PhotoAssetInfo {
  id: string;
  label: string;
  roleInLayout: string;
  src: string;
  alt: string;
  isSubstitute: boolean;
  substituteNote: string;
  cropStyle: string;
}

/**
 * Core brand & contact details for ClinicsAds (clinicsads.com)
 */
export const SITE_CONFIG = {
  brandName: 'ClinicsAds',
  domain: 'clinicsads.com',
  parentNetwork: {
    agencyName: 'ClinicsAds',
    agencyUrl: 'https://clinicsads.com',
    founderSiteName: 'ClinicsAds',
    founderUrl: 'https://clinicsads.com',
    founderName: 'ClinicsAds Healthcare Team',
    founderRole: 'Clinical Marketing Specialists',
  },
  contact: {
    phoneDisplay: '+1 (667) 347-4729',
    phoneHref: 'tel:+16673474729',
    email: 'info@clinicsads.com',
    emailHref: 'mailto:info@clinicsads.com',
    address: '7917 Mountain Rd NE, Albuquerque, NM 87110',
    serviceHours: 'Mon – Fri, 9:00 AM – 6:00 PM MST (Month-to-Month Agreements)',
  },
  socialLinks: {
    instagram: 'https://www.instagram.com/clinicsads',
    facebook: 'https://www.facebook.com/clinicsads',
    x: 'https://x.com/clinicsads',
    youtube: 'https://www.youtube.com/@clinicsads',
    linkedin: 'https://www.linkedin.com/company/clinicsads',
    tiktok: 'https://www.tiktok.com/@clinicsads',
    handle: '@clinicsads',
  },
  submissionEndpoint: '', // Leave empty for transparent demo mode; populate with webhook/API URL in production
  showUnapprovedTestimonialsInPreview: false,
};

export const NAV_ITEMS: NavItem[] = [
  { label: 'Services', route: 'services', sectionId: 'services' },
  { label: 'About', route: 'about', sectionId: 'about' },
  { label: 'Contact', route: 'contact', sectionId: 'footer' },
];

export const HERO_CONTENT = {
  pill: 'Marketing built for clinics',
  headlineLines: ['Help More Patients', 'Find Your Clinic'],
  description:
    'Connect your clinic with people looking for your services through focused advertising, clear landing pages, and a simpler inquiry journey.',
  primaryCta: 'Book a Call',
  secondaryCta: 'Our Services',
  floatingCards: {
    topCard: {
      badge: 'Managed Campaigns',
      title: 'Google & Meta Ads',
      subtitle: 'High-intent local patient search & paid social discovery',
      actionLabel: 'Learn More',
      targetRoute: 'service-google-ads' as PageRoute,
    },
    rightCard: {
      title: 'Clear Campaign Reporting',
      subtitle: 'GA4, GTM & server-side inquiry attribution without blind spots',
      actionLabel: 'Learn More',
      targetRoute: 'service-tracking-followup' as PageRoute,
    },
  },
};

export const SERVICES_CONTENT: {
  heading: string;
  cards: ServiceCardData[];
} = {
  heading: 'Our Services',
  cards: [
    {
      id: 'google-ads',
      route: 'service-google-ads',
      path: '/services/google-ads-for-clinics/',
      title: 'Google Ads for Clinics',
      description:
        'Reach people actively searching for the treatments and consultations your clinic provides.',
      featured: true,
      iconName: 'google-ads',
      details: {
        tagline: 'High-Intent Local Search Campaigns for Healthcare & Dental Clinics',
        overview:
          'We engineer conversion-centered Google Search campaigns that capture local patients at the precise moment they search for acute care, specialized treatments, or private clinic consultations in your community.',
        valueProposition:
          'Connect directly with high-intent patient searches, shield your budget with negative keyword filtering, and turn clicks into booked clinic consultations.',
        deliverables: [
          'Local search radius and high-intent treatment keyword architecture (Single Treatment Ad Groups)',
          'Healthcare advertising policy & patient-privacy compliant ad copy and extensions',
          'Rigorous 500+ term negative keyword filtering to eliminate wasted clicks (jobs, free clinics, home remedies)',
          'Call asset scheduling and Google Maps location extensions tied to your clinic profile',
          'Flexible month-to-month campaign management with dedicated healthcare strategist oversight',
        ],
        methodology: [
          '1. Discovery & Radius Audit: Analyze local search volume, competitor clinic bids, and unit economics',
          '2. Treatment Architecture: Structure treatment-specific ad groups, keyword intent tiers, and negative shields',
          '3. Execution: Launch high-relevance search ads tightly paired with dedicated clinic landing pages',
          '4. Continuous Refinement: Weekly search term review, bid pacing, and cost-per-inquiry optimization',
        ],
        idealFor:
          'Dental practices (implants, clear aligners, emergency), physiotherapy clinics, chiropractic, dermatology, and specialty healthcare centers.',
        clientProvides: [
          'Priority clinical treatments and target patient capacity',
          'Target geographic travel radius (e.g., 5-15 miles around practice)',
          'Treatment fee ranges or accepted insurance plans for ad extensions',
          'Front-desk intake email and phone for immediate inquiry routing',
        ],
        faq: [
          {
            question: 'How do you prevent wasted ad spend on irrelevant searches?',
            answer:
              'We maintain comprehensive healthcare negative keyword lists (filtering out job seekers, DIY home remedies, academic research, out-of-area clicks, and irrelevant insurance programs) and review actual search term queries weekly.',
          },
          {
            question: 'How do you judge whether an inquiry is actually qualified?',
            answer:
              'We track verified phone calls lasting over 60 seconds and completed appointment request forms—not raw button clicks. We review monthly inquiry logs with your clinic team to ensure ad spend produces real prospective patients.',
          },
          {
            question: 'Do we have to sign a long-term lock-in contract?',
            answer:
              'No. Following ClinicsAds’ engagement standard, all campaign management agreements are flexible and month-to-month. We earn your partnership through verified inquiry results.',
          },
        ],
      },
    },
    {
      id: 'meta-ads',
      route: 'service-meta-ads',
      path: '/services/meta-ads-for-clinics/',
      title: 'Meta Ads for Clinics',
      description:
        'Introduce your clinic to prospective patients across Facebook and Instagram.',
      featured: false,
      iconName: 'meta',
      details: {
        tagline: 'Local Patient Awareness & Paid Social Campaigns on Facebook & Instagram',
        overview:
          'Build local community awareness and patient trust with strategy-led paid social campaigns across Facebook and Instagram—highlighting your clinicians, modern treatment environments, and patient care.',
        valueProposition:
          'Generate qualified elective and specialty consultations by educating prospective patients in your immediate neighborhood.',
        deliverables: [
          'Localized radius audience structuring centered on your clinic neighborhood (adhering to privacy standards)',
          'High-resolution visual and short-form video ad creative highlighting doctor credentials and clinic comfort',
          'Platform-compliant ad copy adhering strictly to Meta healthcare advertising restrictions',
          'High-converting mobile inquiry flows with instant front-desk lead alerts',
          'Retargeting sequences for prospective patients who visited your site but have not yet scheduled',
        ],
        methodology: [
          '1. Specialty Audit: Identify elective or recurring clinic procedures suited to discovery (aligners, aesthetic treatments, checkups)',
          '2. Creative Strategy: Develop trust-building video angles, doctor introductions, and treatment explanations',
          '3. Campaign Launch: Deploy localized Facebook & Instagram campaigns with clear consultation CTAs',
          '4. Creative Refresh & Scaling: Rotate creative assets regularly and optimize toward booked inquiries',
        ],
        idealFor:
          'Cosmetic dentistry, orthodontics, medical spas, physiotherapy practices, wellness centers, and newly opened clinic locations.',
        clientProvides: [
          'High-resolution clinic photography and short video clips of clinicians/facilities',
          'Clinician bios, certifications, and registration numbers',
          'Access to clinic Facebook Page and Instagram business account',
        ],
        faq: [
          {
            question: 'How do you handle Meta’s healthcare advertising restrictions?',
            answer:
              'Meta prohibits targeting based on sensitive personal health conditions or implying personal attributes. We craft educational, welcoming creative that highlights your practice environment, doctor qualifications, and service accessibility without violating policy.',
          },
          {
            question: 'Should our clinic use Meta instant forms or a dedicated landing page?',
            answer:
              'We evaluate your front-desk capacity: dedicated clinic landing pages generally produce higher-intent inquiries who have read treatment details, while structured instant forms work well when your team can call leads back within 15 minutes.',
          },
        ],
      },
    },
    {
      id: 'landing-pages',
      route: 'service-landing-pages',
      path: '/services/clinic-landing-pages/',
      title: 'Clinic Landing Pages',
      description:
        'Sub-2-second mobile treatment pages engineered to convert ad traffic into inquiries.',
      featured: false,
      iconName: 'landing-pages',
      details: {
        tagline: 'Sub-2-Second Mobile-First Service Pages Built to Convert Paid Ad Traffic',
        overview:
          'Engineered with healthcare conversion design standards—delivering sub-2-second mobile load times, clear message hierarchy, clinician credentials, and frictionless appointment request flows.',
        valueProposition:
          'Stop losing 60%+ of paid ad clicks to slow, cluttered general homepages. Give prospective patients a direct, reassuring path to inquire.',
        deliverables: [
          'Sub-2-second mobile-first speed architecture optimized for paid search and social traffic',
          '1-to-1 message match with your ad campaigns, eliminating visitor confusion',
          'Doctor credentials, practice photography, treatment overview, and location maps',
          'Prominent sticky click-to-call buttons and streamlined, accessible consultation forms',
          'HIPAA-aware form handling and automated routing to your clinic reception',
        ],
        methodology: [
          '1. Drop-off Analysis: Identify where existing clinic website visitors bounce before booking',
          '2. Message Architecture: Structure headlines, credentials, FAQs, and contact forms for maximum clarity',
          '3. Build & Optimization: Develop lightweight, accessible pages scoring 90+ on mobile performance',
          '4. CRO Testing: Refine call-to-action placement and form fields to maximize conversion rates',
        ],
        idealFor:
          'Any clinic investing in Google Ads, Meta Ads, or local campaigns whose website currently converts below 5% of visitors into inquiries.',
        clientProvides: [
          'Clinician headshots, bio, and professional registration details',
          'Clinic address, parking notes, and treatment pricing ranges/insurance policies',
          'Brand assets (logo, brand colors, clinic exterior/interior photography)',
        ],
        faq: [
          {
            question: 'Can the landing page stay on our existing clinic domain?',
            answer:
              'Yes. We can deploy dedicated campaign landing pages on a subdomain or subfolder of your existing clinic domain while matching your exact visual branding.',
          },
          {
            question: 'Why not send ad traffic directly to our main clinic homepage?',
            answer:
              'Homepages have dozens of navigation links, social feeds, and general information that distract paid visitors. A dedicated treatment landing page answers the exact search query and guides the visitor straight into booking.',
          },
        ],
      },
    },
    {
      id: 'tracking-followup',
      route: 'service-tracking-followup',
      path: '/services/clinic-conversion-tracking/',
      title: 'Clinic Conversion Tracking',
      description:
        'GA4, Google Tag Manager & server-side attribution for clinic inquiries without privacy leaks.',
      featured: false,
      iconName: 'analytics',
      details: {
        tagline: 'GA4, Google Tag Manager & Server-Side Attribution Without Blind Spots',
        overview:
          'Eliminate attribution blind spots with clean Google Tag Manager (GTM), GA4, and server-side conversion pipelines—connecting ad spend directly to verified phone calls, form inquiries, and reception follow-up.',
        valueProposition:
          'Gain total transparency into which keywords and campaigns produce booked appointments, without transmitting sensitive patient health information.',
        deliverables: [
          'Google Tag Manager (GTM) and GA4 custom event configuration with deduplication',
          'Privacy-safe call tracking measuring genuine conversations (>60 seconds) rather than misdials',
          'Verified form submission events marked as Primary conversions in Google Ads',
          'Instant front-desk email and SMS notifications for incoming consultation requests',
          'Monthly inquiry quality reviews matching ad spend to clinic appointment show rates',
        ],
        methodology: [
          '1. Audit: Inspect existing analytics tags, tracking gaps, and front-desk response times',
          '2. Pipeline Setup: Configure server-side and client-side GTM triggers for phone and form interactions',
          '3. Validation: Test inquiry flows end-to-end with synthetic submissions to confirm data accuracy',
          '4. Feedback Loop: Regularly review lead quality and clinic follow-up speed to refine bidding',
        ],
        idealFor:
          'Clinics spending $1,000+/month on advertising who want transparent visibility into their cost per qualified inquiry.',
        clientProvides: [
          'Access to Google Tag Manager, Google Analytics 4, and Google Ads accounts',
          'Front-desk intake email addresses or SMS numbers for alerts',
          'Clinic phone provider details for dynamic number insertion if needed',
        ],
        faq: [
          {
            question: 'How is patient privacy protected during conversion tracking?',
            answer:
              'We configure server-side and GTM pipelines using privacy-safe event parameters (such as generate_lead with unique synthetic IDs). We never send patient names, emails, phone numbers, or health condition details to ad networks.',
          },
          {
            question: 'Why should we track phone call durations?',
            answer:
              'A 5-second call is often a wrong number or quick hangup. Counting it as a lead trains Google Ads algorithms on low-quality clicks. We only count calls exceeding 60 seconds as meaningful patient inquiries.',
          },
        ],
      },
    },
    {
      id: 'seo',
      route: 'service-seo',
      path: '/services/clinic-seo/',
      title: 'Clinic SEO & Local Search',
      description:
        'Dominate Google Maps 3-Pack and high-intent organic healthcare searches in your area.',
      featured: false,
      iconName: 'seo',
      details: {
        tagline: 'Google Maps 3-Pack & Organic Search Visibility for Healthcare Clinics',
        overview:
          'Drive steady, compounding patient inquiries by optimizing local Google Maps results, Google Business Profile categories, and treatment-specific crawlable content that answers prospective patients’ medical questions.',
        valueProposition:
          'Build sustainable, long-term organic authority that delivers patients month after month alongside your paid advertising.',
        deliverables: [
          'Google Business Profile (Maps 3-Pack) optimization, primary category alignment, and service cataloging',
          'Crawlable treatment service pages with MedicalBusiness and Physician schema structured data',
          'Local citation synchronization across healthcare directories and healthcare registries',
          'Google Search Console indexing and technical health monitoring',
          'Ethical patient review generation workflows to build authentic 5-star clinic reputation',
        ],
        methodology: [
          '1. Technical & Local Audit: Analyze local keyword rankings, competitor visibility, and technical SEO hygiene',
          '2. On-Page & Schema: Structure treatment pages with clear headings, doctor bios, and schema markup',
          '3. Local Authority: Optimize Google Business Profile, review acquisition, and citation consistency',
          '4. Search Console Monitoring: Track organic impressions, click queries, and organic consultation calls',
        ],
        idealFor:
          'Established practices and multi-provider clinics seeking sustainable, compounding organic patient volume.',
        clientProvides: [
          'Google Business Profile manager access',
          'Google Search Console access or domain DNS access',
          'Verified practice address, licensing, and doctor credential details',
        ],
        faq: [
          {
            question: 'How soon can our clinic expect results from SEO?',
            answer:
              'Google Business Profile optimizations and citation fixes often show initial local momentum within 60–90 days, with organic treatment page rankings compounding over 6 to 12 months. We never promise overnight rankings.',
          },
          {
            question: 'Do you guarantee a #1 ranking on Google Maps?',
            answer:
              'No ethical agency guarantees specific #1 rankings, as Google’s search algorithms factor in real-time user location, competition, and searcher intent. We guarantee rigorous adherence to Google’s guidelines, crawlable architecture, and transparent monthly progress reporting.',
          },
        ],
      },
    },
    {
      id: 'gpt',
      route: 'service-gpt',
      path: '/services/',
      title: 'ChatGPT & AI Search Optimization',
      description:
        'Position your clinic as the recommended choice across AI answer engines.',
      featured: false,
      iconName: 'gpt',
      details: {
        tagline: 'AI-Powered Patient Discovery & Conversational Search Optimization',
        overview:
          'Structure your clinic’s doctors, credentials, and treatments so that conversational search engines (ChatGPT, Perplexity, and Google AI Overviews) accurately recommend your practice for local medical inquiries.',
        deliverables: [
          'Conversational search query analysis & treatment intent mapping',
          'Structured knowledge graph and verified clinical schema markup',
          'Practitioner credential & clinical specialty AI syndication',
          'Monitoring citation frequency and AI-referred patient consultations',
        ],
        methodology: [
          '1. Audit: Analyze current AI engine citations of your clinic and regional competitors',
          '2. Structure: Implement medical schema markup for doctor bios, treatments, and clinical FAQs',
          '3. Authority: Build authoritative citations across healthcare registries and directories',
          '4. Monitor: Track citation frequency and patient consultation inquiries',
        ],
        idealFor:
          'Specialty clinics looking to lead their market in conversational search visibility.',
        faq: [
          {
            question: 'How do patients use AI search to find clinics?',
            answer:
              'Patients increasingly use conversational AI to research treatment options and ask for recommended specialists in their city. Proper structured data and clinical citations ensure your clinic is surfaced.',
          },
        ],
      },
    },
  ],
};

export const WHY_CHOOSE_CONTENT = {
  headingLines: ['Why Should You', 'Choose ClinicsAds?'],
  collageCaptions: {
    topLeft: {
      title: 'Clinic-focused strategy',
      subtitle: 'Tailored to patient search',
    },
    bottomRight: {
      title: 'Clear communication',
      subtitle: 'Direct & practical updates',
    },
  },
  features: [
    {
      id: 'focused-on-clinic',
      title: 'Focused on Your Clinic',
      description:
        'Campaigns and landing pages shaped around your services, location, and business goals.',
      iconName: 'check-circle',
    },
    {
      id: 'clear-reporting',
      title: 'Clear, Practical Reporting',
      description:
        'Understand what is running, what generates inquiries, and what we are improving.',
      iconName: 'bar-chart',
    },
  ] as WhyChooseFeature[],
};

export const ADDITIONAL_SOLUTIONS_CONTENT: {
  headingLines: string[];
  description: string;
  cards: SolutionCardData[];
} = {
  headingLines: ['More Ways', 'to Grow'],
  description:
    'Support your advertising with a clearer website experience and a stronger approach to digital discovery.',
  cards: [
    {
      id: 'clinic-landing-pages',
      route: 'solution-clinic-landing-pages',
      title: 'Clinic Landing Pages',
      description:
        'Focused pages that help visitors understand your services and take the next step.',
      buttonLabel: 'View Details',
      variant: 'primary-green',
      iconName: 'heart-handshake',
      modalDetails: {
        subtitle: 'Sub-2-Second Conversion-Focused Web Experience',
        summary:
          'When prospective patients click an ad, a slow or cluttered homepage often leaves them searching for answers. Drawing on our healthcare web design standards, we build fast, mobile-first service pages that answer patient questions clearly and make requesting an appointment effortless.',
        keyPoints: [
          'Sub-2-second mobile load times engineered for high paid-search Quality Scores',
          'Dedicated structure for individual high-priority treatments (dental implants, physio, dermatology, urgent care)',
          'Clear presentation of practitioner credentials, clinic location, hours, and patient FAQs',
          'Frictionless mobile contact options with click-to-call, CRM integration, and HIPAA-aware inquiry forms',
        ],
        methodology: [
          '1. Patient Journey Audit: Analyze current mobile load speed and inquiry friction points',
          '2. Treatment Page Architecture: Write clear, medically accurate copy tailored to patient intent',
          '3. Responsive Build & Integration: Connect forms and phone click-tracking to your reception workflow',
          '4. Ongoing CRO: Continuous headline, CTA, and layout refinement based on real visitor behavior',
        ],
        note: 'Available as a standalone conversion upgrade or bundled with month-to-month Google, Meta, and ChatGPT Ads management.',
        faq: [
          {
            question: 'How fast can a new clinic landing page go live?',
            answer:
              'Most treatment-specific landing pages are researched, written, designed, and deployed with full conversion tracking within 7 to 10 business days.',
          },
          {
            question: 'Do we own the landing page assets?',
            answer:
              'Yes. Your clinic retains full ownership of all custom page copy, layouts, and analytics configurations.',
          },
        ],
      },
    },
    {
      id: 'chatgpt-ads-ai-search',
      route: 'solution-chatgpt-ads-ai-search',
      title: 'ChatGPT Ads & AI Search',
      description:
        'Position your clinic across ChatGPT Ads and emerging AI-powered search and discovery experiences.',
      buttonLabel: 'View Details',
      variant: 'secondary-white',
      iconName: 'sparkles',
      modalDetails: {
        subtitle: 'ChatGPT Ads & Generative AI Search Visibility',
        summary:
          'As patients increasingly ask ChatGPT and conversational AI platforms for local clinic recommendations and treatment advice, we prepare and manage your clinic’s presence for ChatGPT Ads alongside generative AI search visibility.',
        keyPoints: [
          'ChatGPT Ads campaign readiness, conversational ad copy, and high-intent healthcare query targeting',
          'Generative Engine Optimization (GEO) so ChatGPT, SearchGPT, and AI Overviews cite and recommend your clinic',
          'Medically accurate treatment pages and Schema.org MedicalClinic, Physician, and Dentist structured data',
          'Dedicated conversion landing pages and GTM / GA4 attribution for traffic arriving from ChatGPT and AI search',
        ],
        methodology: [
          '1. AI Visibility Audit: Test how ChatGPT and generative search engines currently answer local treatment queries in your city',
          '2. Conversational Intent Mapping: Build Q&A content and ad messaging around real patient prompts',
          '3. Technical Schema & Entity Setup: Deploy MedicalClinic JSON-LD and align directory citations',
          '4. ChatGPT Ad & Referral Tracking: Measure AI-driven patient visits and inquiries inside GA4',
        ],
        note: 'Combines paid ChatGPT ad campaign structuring with organic generative AI visibility so prospective patients find your clinic wherever they search.',
        faq: [
          {
            question: 'How do patients use ChatGPT to find a local clinic?',
            answer:
              'Prospective patients increasingly ask conversational prompts such as "best dental implant clinic near me with sedation" or "physiotherapist for lower back pain in [City]". We structure both paid and organic signals so your clinic matches those detailed queries.',
          },
          {
            question: 'Can we track inquiries that come from ChatGPT and AI search?',
            answer:
              'Yes. We configure custom channel groupings and referral tracking in GA4 and Google Tag Manager so you can see visits and inquiries originating from ChatGPT and AI search engines.',
          },
        ],
      },
    },
  ],
};

/**
 * Testimonials array:
 * Until approved client testimonials are provided, `approved: false` items are hidden in strict production mode
 * or rendered clearly as a labeled preview placeholder.
 * Add approved client testimonials with `approved: true` to populate the live carousel automatically.
 */
export const TESTIMONIALS_CONTENT: {
  heading: string;
  supportingLine: string;
  placeholderNotice: string;
  items: TestimonialItem[];
} = {
  heading: 'What Our Clients Say',
  supportingLine:
    'We partner closely with clinic owners and practice managers to build clear, dependable patient inquiry journeys.',
  placeholderNotice: 'Approved client testimonial will appear here.',
  items: [
    {
      id: 'placeholder-preview-1',
      quote: 'Approved client testimonial will appear here.',
      authorName: 'Client Name Placeholder',
      authorRole: 'Clinic Director / Practice Manager (Preview Placeholder)',
      clinicName: 'Reserved for Verified Clinic Partner',
      portraitId: 'testimonial-placeholder',
      portraitAlt: 'Neutral portrait placeholder for future approved clinic client',
      approved: false,
    },
  ],
};

/**
 * Editable Photography Registry
 * Uses reliable, appropriately licensed portraits matching the pose, framing, lighting, and tone of the reference screenshot.
 * Can be replaced with exact original studio files at any time by updating `src`.
 */
export const PHOTO_ASSETS: Record<string, PhotoAssetInfo> = {
  heroMain: {
    id: 'heroMain',
    label: 'Hero Main Circular Portrait',
    roleInLayout: 'Large circular photograph on the right side of the hero section',
    src: 'https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg?auto=compress&cs=tinysrgb&w=900&h=900&fit=crop&crop=faces',
    alt: 'Smiling woman talking on the phone while holding a cup in a bright indoor setting',
    isSubstitute: true,
    substituteNote:
      'Licensed portrait substitute matching the reference pose (smiling woman with curly hair on a phone call indoors).',
    cropStyle: 'object-cover object-center',
  },
  heroThumbLeft: {
    id: 'heroThumbLeft',
    label: 'Hero Orbit Thumbnail (Left)',
    roleInLayout: 'Small circular portrait thumbnail on the middle-left ring',
    src: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop&crop=faces',
    alt: 'Smiling woman portrait thumbnail',
    isSubstitute: true,
    substituteNote: 'Licensed portrait substitute for small left ring avatar.',
    cropStyle: 'object-cover object-center',
  },
  heroThumbBottom: {
    id: 'heroThumbBottom',
    label: 'Hero Orbit Thumbnail (Bottom)',
    roleInLayout: 'Small circular portrait thumbnail at the bottom of the outer ring',
    src: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop&crop=faces',
    alt: 'Friendly man portrait thumbnail',
    isSubstitute: true,
    substituteNote: 'Licensed portrait substitute for bottom ring avatar.',
    cropStyle: 'object-cover object-center',
  },
  heroThumbRight: {
    id: 'heroThumbRight',
    label: 'Hero Orbit Thumbnail (Bottom Right)',
    roleInLayout: 'Small circular portrait thumbnail at the lower-right of the outer ring',
    src: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop&crop=faces',
    alt: 'Warm portrait thumbnail on outer ring',
    isSubstitute: true,
    substituteNote: 'Licensed portrait substitute for bottom-right ring avatar.',
    cropStyle: 'object-cover object-center',
  },
  collageTopLeft: {
    id: 'collageTopLeft',
    label: 'Why Choose Collage — Medium Upper-Left Portrait',
    roleInLayout: 'Medium circular portrait toward the upper-left of the Why Choose collage',
    src: 'https://images.pexels.com/photos/2589653/pexels-photo-2589653.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop&crop=faces',
    alt: 'Welcoming young man in casual denim shirt raising a hand in greeting',
    isSubstitute: true,
    substituteNote:
      'Licensed portrait substitute matching the upper-left casual denim shirt greeting pose.',
    cropStyle: 'object-cover object-top',
  },
  collageTopRightSmall: {
    id: 'collageTopRightSmall',
    label: 'Why Choose Collage — Small Upper-Center Portrait',
    roleInLayout: 'Smallest circular portrait near the top-center of the collage',
    src: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop&crop=faces',
    alt: 'Smiling portrait in neutral casual attire',
    isSubstitute: true,
    substituteNote: 'Licensed portrait substitute for the top-center small circle.',
    cropStyle: 'object-cover object-center',
  },
  collageBottomLeftSmall: {
    id: 'collageBottomLeftSmall',
    label: 'Why Choose Collage — Lower-Left Supporting Portrait',
    roleInLayout: 'Medium-small circular portrait in the lower-left of the collage',
    src: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=500&h=500&fit=crop&crop=faces',
    alt: 'Smiling man in casual button-down shirt over white t-shirt',
    isSubstitute: true,
    substituteNote: 'Licensed portrait substitute for the lower-left circle.',
    cropStyle: 'object-cover object-top',
  },
  collageBottomRightLarge: {
    id: 'collageBottomRightLarge',
    label: 'Why Choose Collage — Large Lower-Right Portrait',
    roleInLayout: 'Largest circular portrait near the lower-right side of the collage',
    src: 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=700&h=700&fit=crop&crop=faces',
    alt: 'Cheerful woman with curly hair in a white t-shirt smiling warmly',
    isSubstitute: true,
    substituteNote:
      'Licensed portrait substitute matching the large lower-right smiling woman in a white t-shirt.',
    cropStyle: 'object-cover object-top',
  },
  testimonialPlaceholder: {
    id: 'testimonialPlaceholder',
    label: 'Testimonial Preview Placeholder Portrait',
    roleInLayout: 'Left portrait inside the horizontal testimonial card',
    src: 'https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg?auto=compress&cs=tinysrgb&w=600&h=720&fit=crop&crop=faces',
    alt: 'Neutral placeholder portrait representing a clinic professional',
    isSubstitute: true,
    substituteNote:
      'Clearly labeled placeholder portrait until an approved client photograph and quote are provided.',
    cropStyle: 'object-cover object-top',
  },
};
