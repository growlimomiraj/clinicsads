export type PageRoute =
  | 'home'
  | 'services'
  | 'why-clinicsads'
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
  | 'admin';

export interface NavItem {
  label: string;
  route: PageRoute;
  sectionId: string;
}

export interface ServiceCardData {
  id: string;
  route: PageRoute;
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
    deliverables: string[];
    methodology: string[];
    idealFor: string;
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
  showUnapprovedTestimonialsInPreview: true,
};

export const NAV_ITEMS: NavItem[] = [
  { label: 'Services', route: 'services', sectionId: 'services' },
  { label: 'Why ClinicsAds', route: 'why-clinicsads', sectionId: 'why-clinicsads' },
  { label: 'Solutions', route: 'solutions', sectionId: 'solutions' },
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
      title: 'Google Ads',
      description:
        'Reach people actively searching for the services your clinic offers.',
      featured: true,
      iconName: 'google-ads',
      details: {
        tagline: 'High-Intent Local Search Campaigns for Healthcare & Dental Clinics',
        overview:
          'Led by focused healthcare advertising methodology, we build conversion-centered search campaigns that capture prospective patients at the exact moment they search for treatments, consultations, or urgent care in your area.',
        deliverables: [
          'Local search radius and high-intent treatment keyword architecture',
          'Healthcare advertising policy & patient-privacy compliant ad copy',
          'Rigorous negative keyword filtering to eliminate wasted clicks',
          'Flexible month-to-month campaign management with dedicated strategist oversight',
        ],
        methodology: [
          '1. Discovery: Audit local search demand, competitor clinics, and unit economics',
          '2. Strategize: Structure treatment-specific ad groups and keyword intent tiers',
          '3. Execute: Launch high-relevance search ads paired with dedicated landing pages',
          '4. Optimize: Continuous bid, search-term, and cost-per-inquiry refinement',
        ],
        idealFor:
          'Dental, medical, physiotherapy, chiropractors, dermatology, and urgent care clinics seeking direct patient search inquiries.',
        faq: [
          {
            question: 'How do you prevent wasted ad spend on irrelevant searches?',
            answer:
              'We maintain comprehensive healthcare negative keyword lists (filtering out job seekers, DIY home remedies, academic research, and out-of-area clicks) and review actual search term reports weekly.',
          },
          {
            question: 'Do we have to sign a long-term lock-in contract?',
            answer:
              'No. Following ClinicsAds’ engagement standard, all management agreements are flexible and month-to-month.',
          },
        ],
      },
    },
    {
      id: 'meta-ads',
      route: 'service-meta-ads',
      title: 'Meta Ads',
      description:
        'Introduce your clinic to prospective patients through Facebook and Instagram.',
      featured: false,
      iconName: 'meta',
      details: {
        tagline: 'Local Patient Awareness & Paid Social Campaigns on Facebook & Instagram',
        overview:
          'Build local awareness and patient trust with strategy-led paid social campaigns across Facebook and Instagram—highlighting your clinic environment, treatments, and educational care.',
        deliverables: [
          'Local radius audience structuring tailored to your clinic neighborhood',
          'Visual and video ad creative highlighting patient care and clinic comfort',
          'Platform-compliant ad copy adhering to Meta healthcare advertising standards',
          'Multi-touch retargeting sequences for prospective patients who visited your site',
        ],
        methodology: [
          '1. Discovery: Identify high-value elective or recurring clinic procedures',
          '2. Strategize: Craft educational and trust-building creative angles',
          '3. Execute: Deploy localized Facebook & Instagram campaigns with clear CTAs',
          '4. Optimize: Refresh creative assets and optimize toward booked consultations',
        ],
        idealFor:
          'Cosmetic dentistry, orthodontics, medspas, physiotherapy, and new clinic locations building local patient demand.',
        faq: [
          {
            question: 'How do you handle Meta’s healthcare advertising restrictions?',
            answer:
              'We write educational, welcoming copy that focuses on your clinic’s care environment and treatment benefits without violating Meta’s personal attributes policy.',
          },
          {
            question: 'Should our clinic use instant lead forms or a landing page?',
            answer:
              'We test both based on your front-desk capacity—using dedicated clinic landing pages for higher-intent inquiries and structured instant forms when rapid callback workflows are in place.',
          },
        ],
      },
    },
    {
      id: 'landing-pages',
      route: 'service-landing-pages',
      title: 'Landing Pages',
      description:
        'Give visitors a clear path from interest to inquiry.',
      featured: false,
      iconName: 'landing-pages',
      details: {
        tagline: 'Sub-2-Second Mobile-First Service Pages Built to Convert Ad Traffic',
        overview:
          'Engineered with conversion-focused healthcare web design standards—delivering sub-2-second mobile load times, clear treatment explanations, and frictionless appointment request flows.',
        deliverables: [
          'Sub-2-second mobile-first page speed architecture for paid ad traffic',
          'Treatment-specific layouts with clinician credentials, FAQs, and location maps',
          'Direct click-to-call and streamlined appointment request forms',
          'HIPAA-aware form handling and CRM/scheduling workflow integration',
        ],
        methodology: [
          '1. Discovery: Pinpoint where current website visitors drop off before inquiring',
          '2. Strategize: Map a 1-to-1 message match between your ad copy and landing page',
          '3. Execute: Build a fast, accessible, mobile-responsive clinic landing page',
          '4. Optimize: Conversion rate optimization (CRO) to lift visitor-to-patient inquiries',
        ],
        idealFor:
          'Clinics sending paid Google, Meta, or ChatGPT ad traffic to a general homepage that struggles to convert visitors into appointments.',
        faq: [
          {
            question: 'Can the landing page stay on our existing clinic domain?',
            answer:
              'Yes. We can deploy dedicated campaign pages on a subdomain or subfolder of your existing clinic website while matching your exact visual branding.',
          },
          {
            question: 'Why not send ad traffic directly to our main homepage?',
            answer:
              'Homepages have dozens of navigation links that distract visitors. A dedicated treatment landing page answers the exact question the patient searched for and guides them straight to booking.',
          },
        ],
      },
    },
    {
      id: 'tracking-followup',
      route: 'service-tracking-followup',
      title: 'Tracking & Follow-Up',
      description:
        'Understand your inquiries and improve the steps toward a booked appointment.',
      featured: false,
      iconName: 'analytics',
      details: {
        tagline: 'GA4, Google Tag Manager & Server-Side Attribution Without Blind Spots',
        overview:
          'Eliminate attribution blind spots with clean Google Tag Manager (GTM), GA4, and server-side conversion pipelines—connecting ad spend directly to phone calls, form inquiries, and front-desk follow-up.',
        deliverables: [
          'Google Tag Manager (GTM), GA4, and server-side conversion pipeline setup',
          'Accurate tracking for phone calls, appointment forms, and online bookings',
          'Instant front-desk lead notifications and structured follow-up workflows',
          'HIPAA-aware review generation workflows to grow local Google ratings',
        ],
        methodology: [
          '1. Discovery: Audit existing analytics tags, call routing, and reception response times',
          '2. Strategize: Define clear conversion events that reflect real patient inquiries',
          '3. Execute: Configure GTM, GA4, call tracking, and CRM lead alerts',
          '4. Optimize: Review inquiry quality and reception follow-up speed monthly',
        ],
        idealFor:
          'Practices wanting transparent ROI visibility into which campaigns generate real patient conversations and bookings.',
        faq: [
          {
            question: 'How is patient privacy protected during conversion tracking?',
            answer:
              'We configure server-side and GTM pipelines using privacy-safe event parameters so ad platforms optimize for conversions without receiving sensitive patient health details.',
          },
          {
            question: 'How do you help our reception team convert more inquiries?',
            answer:
              'We set up instant SMS/email alerts for new form inquiries and provide simple follow-up templates so prospective patients receive a response within minutes.',
          },
        ],
      },
    },
    {
      id: 'gpt',
      route: 'service-gpt',
      title: 'ChatGPT & AI Search',
      description:
        'Help patients find and choose your clinic through conversational AI and answer engines.',
      featured: false,
      iconName: 'gpt',
      details: {
        tagline: 'AI-Powered Patient Discovery & Conversational Search Optimization',
        overview:
          'Position your clinic as the trusted, recommended choice across emerging conversational search engines like ChatGPT, Perplexity, and Google AI Overviews.',
        deliverables: [
          'Conversational search query analysis & treatment intent mapping',
          'Structured knowledge graph and verified clinical schema markup',
          'Practitioner credential & clinical specialty AI syndication',
          'Attribution tracking for AI-assisted patient consultations',
        ],
        methodology: [
          '1. Audit: Analyze current AI engine perception and citations of your clinic',
          '2. Optimize: Structure doctor profiles, credentials, and treatments for LLM retrieval',
          '3. Authority: Build authoritative medical references and structured FAQ schema',
          '4. Monitor: Track citation frequency, AI referral volume, and booked patients',
        ],
        idealFor:
          'Practices and specialty clinics looking to capture early patient demand on conversational AI platforms before competitors.',
        faq: [
          {
            question: 'How do patients use ChatGPT to find clinics?',
            answer:
              'Patients increasingly use conversational AI to research symptoms, compare treatments, and ask for recommended local specialists. We ensure your clinic is properly structured and cited as a top recommendation.',
          },
          {
            question: 'Does this work alongside Google Ads?',
            answer:
              'Yes, AI search optimization complements Google and Meta ad campaigns, capturing high-intent patients who research treatments using AI answer engines.',
          },
        ],
      },
    },
    {
      id: 'seo',
      route: 'service-seo',
      title: 'Clinic SEO & Local Search',
      description:
        'Rank higher in Google local search and Google Maps for high-intent patient queries.',
      featured: false,
      iconName: 'seo',
      details: {
        tagline: 'Google Maps 3-Pack & Organic Search Visibility for Healthcare Clinics',
        overview:
          'Drive steady, compounding patient inquiries by dominating local Google Maps results, Google Business Profile rankings, and high-intent local medical search queries.',
        deliverables: [
          'Google Business Profile (Maps 3-Pack) optimization and local category alignment',
          'Treatment-specific on-page SEO targeting high-intent local searches',
          'Local citation synchronization and healthcare directory management',
          'Patient review generation strategy and local authority link building',
        ],
        methodology: [
          '1. Audit: Analyze local keyword rankings, competitor visibility, and technical SEO hygiene',
          '2. On-Page: Optimize title tags, medical service pages, and doctor bios with schema',
          '3. Local Authority: Optimize Google Business Profile, review signals, and citations',
          '4. Compounding Growth: Track keyword movements, organic phone calls, and appointment requests',
        ],
        idealFor:
          'Clinics seeking sustainable, long-term organic patient volume alongside their paid advertising.',
        faq: [
          {
            question: 'How soon can we see results from Clinic SEO?',
            answer:
              'Google Maps and local optimizations typically show initial momentum within 60–90 days, with organic treatment page rankings compounding over 3–6 months.',
          },
          {
            question: 'Why is Google Maps optimization so important for clinics?',
            answer:
              'Over 70% of prospective patients searching for healthcare services look directly at Google Maps 3-Pack results to read reviews, check location, and call the clinic.',
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
