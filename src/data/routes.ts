export interface RouteMetadata {
  path: string;
  id: string;
  title: string;
  description: string;
  canonical: string;
  h1: string;
  intent: string;
  keywords: string[];
  breadcrumbs: { name: string; item: string }[];
  legacyHashes?: string[];
  isArticle?: boolean;
  publishedDate?: string;
  modifiedDate?: string;
  author?: string;
}

export const SITE_URL = 'https://clinicsads.com';

export const ROUTES: RouteMetadata[] = [
  {
    path: '/',
    id: 'home',
    title: 'Healthcare Marketing Agency & Clinic Marketing Agency | ClinicsAds',
    description:
      'ClinicsAds is a specialized healthcare marketing agency, clinic marketing agency, and healthcare advertising agency delivering digital marketing for clinics.',
    canonical: `${SITE_URL}/`,
    h1: 'Healthcare Marketing Agency for Clinics That Demand Qualified Patient Growth',
    intent: 'Healthcare marketing agency; clinic marketing agency; digital marketing for clinics',
    keywords: [
      'healthcare marketing agency',
      'clinic marketing agency',
      'digital marketing for clinics',
      'healthcare advertising agency',
      'medical practice marketing',
      'patient acquisition agency',
    ],
    breadcrumbs: [{ name: 'Home', item: `${SITE_URL}/` }],
    legacyHashes: ['#home'],
  },
  {
    path: '/services/',
    id: 'services',
    title: 'Clinic Marketing Services & Healthcare Advertising | ClinicsAds',
    description:
      'Comprehensive digital marketing for clinics: Google Ads for clinics, Meta paid social, high-converting clinic landing pages, conversion tracking, and local SEO.',
    canonical: `${SITE_URL}/services/`,
    h1: 'Clinic Marketing Services Engineered for Patient Acquisition',
    intent: 'Clinic marketing service overview; healthcare advertising agency',
    keywords: [
      'clinic marketing services',
      'digital marketing for clinics',
      'healthcare advertising agency',
      'healthcare marketing agency',
      'medical clinic growth',
      'dental clinic marketing services',
    ],
    breadcrumbs: [
      { name: 'Home', item: `${SITE_URL}/` },
      { name: 'Services', item: `${SITE_URL}/services/` },
    ],
    legacyHashes: ['#services', '#solutions', '#solution-chatgpt-ads-ai-search', '#service-gpt'],
  },
  {
    path: '/services/google-ads-for-clinics/',
    id: 'service-google-ads',
    title: 'Google Ads for Clinics & Healthcare PPC Agency | ClinicsAds',
    description:
      'Leading healthcare PPC agency and Google Ads agency for clinics. Expert healthcare Google Ads management and PPC for medical practices to acquire qualified patients.',
    canonical: `${SITE_URL}/services/google-ads-for-clinics/`,
    h1: 'Google Ads Agency for Clinics & Healthcare PPC Management',
    intent: 'Google Ads for clinics; healthcare PPC agency; PPC for medical practices',
    keywords: [
      'Google Ads for clinics',
      'healthcare PPC agency',
      'Google Ads agency for clinics',
      'PPC for medical practices',
      'healthcare Google Ads management',
      'medical practice google ads',
    ],
    breadcrumbs: [
      { name: 'Home', item: `${SITE_URL}/` },
      { name: 'Services', item: `${SITE_URL}/services/` },
      { name: 'Google Ads for Clinics', item: `${SITE_URL}/services/google-ads-for-clinics/` },
    ],
    legacyHashes: ['#service-google-ads'],
  },
  {
    path: '/services/meta-ads-for-clinics/',
    id: 'service-meta-ads',
    title: 'Meta Ads for Clinics | Facebook Ads & Instagram Advertising | ClinicsAds',
    description:
      'Specialized Meta Ads for clinics. Compliant Facebook Ads for clinics and Instagram advertising for medical practices that drive private patient inquiries.',
    canonical: `${SITE_URL}/services/meta-ads-for-clinics/`,
    h1: 'Meta Ads for Clinics: Facebook Ads & Instagram Advertising for Healthcare',
    intent: 'Facebook and Instagram advertising for clinics; Meta Ads for clinics',
    keywords: [
      'Meta Ads for clinics',
      'Facebook Ads for clinics',
      'Instagram advertising for clinics',
      'healthcare paid social',
      'social media ads for clinics',
    ],
    breadcrumbs: [
      { name: 'Home', item: `${SITE_URL}/` },
      { name: 'Services', item: `${SITE_URL}/services/` },
      { name: 'Meta Ads for Clinics', item: `${SITE_URL}/services/meta-ads-for-clinics/` },
    ],
    legacyHashes: ['#service-meta-ads'],
  },
  {
    path: '/services/clinic-landing-pages/',
    id: 'service-landing-pages',
    title: 'Clinic Landing Page Design & Healthcare Landing Page Design | ClinicsAds',
    description:
      'High-converting clinic landing page design and healthcare landing page design. Fast mobile-optimized pages engineered to turn paid clicks into inquiries.',
    canonical: `${SITE_URL}/services/clinic-landing-pages/`,
    h1: 'Clinic Landing Page Design: High-Converting Healthcare Landing Pages',
    intent: 'Clinic landing page design; healthcare landing page design',
    keywords: [
      'clinic landing page design',
      'healthcare landing page design',
      'medical clinic conversion rate optimization',
      'landing pages for clinics',
    ],
    breadcrumbs: [
      { name: 'Home', item: `${SITE_URL}/` },
      { name: 'Services', item: `${SITE_URL}/services/` },
      { name: 'Clinic Landing Pages', item: `${SITE_URL}/services/clinic-landing-pages/` },
    ],
    legacyHashes: ['#service-landing-pages', '#solution-clinic-landing-pages'],
  },
  {
    path: '/services/clinic-conversion-tracking/',
    id: 'service-tracking-followup',
    title: 'Conversion Tracking for Clinics | Healthcare GA4 & Attribution | ClinicsAds',
    description:
      'Accurate conversion tracking for clinics. GA4, Google Tag Manager & HIPAA-aware inquiry attribution to track verified calls and appointments without privacy leaks.',
    canonical: `${SITE_URL}/services/clinic-conversion-tracking/`,
    h1: 'Conversion Tracking for Clinics: GA4, GTM & Patient Attribution',
    intent: 'Conversion tracking for clinics; healthcare GA4 and attribution',
    keywords: [
      'conversion tracking for clinics',
      'healthcare ga4 setup',
      'google tag manager for clinics',
      'patient inquiry attribution',
      'hipaa aware conversion tracking',
    ],
    breadcrumbs: [
      { name: 'Home', item: `${SITE_URL}/` },
      { name: 'Services', item: `${SITE_URL}/services/` },
      { name: 'Clinic Conversion Tracking', item: `${SITE_URL}/services/clinic-conversion-tracking/` },
    ],
    legacyHashes: ['#service-tracking-followup'],
  },
  {
    path: '/services/clinic-seo/',
    id: 'service-seo',
    title: 'Clinic SEO Services & Healthcare SEO Agency | Local SEO for Clinics',
    description:
      'Premier healthcare SEO agency providing specialized clinic SEO services and local SEO for clinics. Rank in Google Maps 3-Pack and capture high-intent patients.',
    canonical: `${SITE_URL}/services/clinic-seo/`,
    h1: 'Clinic SEO Services & Local SEO for Healthcare Practices',
    intent: 'Clinic SEO services; local SEO for clinics; healthcare SEO agency',
    keywords: [
      'clinic SEO services',
      'local SEO for clinics',
      'healthcare SEO agency',
      'medical clinic seo agency',
      'google maps ranking for doctors',
      'healthcare local seo',
    ],
    breadcrumbs: [
      { name: 'Home', item: `${SITE_URL}/` },
      { name: 'Services', item: `${SITE_URL}/services/` },
      { name: 'Clinic SEO & Local Search', item: `${SITE_URL}/services/clinic-seo/` },
    ],
    legacyHashes: ['#service-seo'],
  },
  {
    path: '/about/',
    id: 'about',
    title: 'About ClinicsAds | Healthcare Marketing Agency & Clinic PPC Partner',
    description:
      'Learn about ClinicsAds: our specialized healthcare marketing methodology, transparent month-to-month clinic PPC partnership, and dedicated patient acquisition focus.',
    canonical: `${SITE_URL}/about/`,
    h1: 'About ClinicsAds: Dedicated Healthcare Marketing & Patient Acquisition',
    intent: 'Company credibility and approach',
    keywords: [
      'about clinicsads',
      'healthcare marketing specialists',
      'clinic advertising partner',
      'transparent healthcare marketing',
    ],
    breadcrumbs: [
      { name: 'Home', item: `${SITE_URL}/` },
      { name: 'About', item: `${SITE_URL}/about/` },
    ],
    legacyHashes: ['#why-clinicsads'],
  },
  {
    path: '/contact/',
    id: 'contact',
    title: 'Contact ClinicsAds | Clinic Marketing & Healthcare PPC Consultation',
    description:
      'Speak with our healthcare marketing strategists. Schedule a consultation to review your clinic\'s search demand, competitor landscape, and patient inquiry growth strategy.',
    canonical: `${SITE_URL}/contact/`,
    h1: 'Contact ClinicsAds to Discuss Your Clinic’s Patient Growth',
    intent: 'Agency consultation inquiry',
    keywords: [
      'contact clinicsads',
      'clinic marketing consultation',
      'healthcare advertising quote',
      'book clinic strategy call',
    ],
    breadcrumbs: [
      { name: 'Home', item: `${SITE_URL}/` },
      { name: 'Contact', item: `${SITE_URL}/contact/` },
    ],
    legacyHashes: ['#contact'],
  },
  {
    path: '/resources/google-ads-for-clinics-pre-launch-checklist/',
    id: 'resource-pre-launch-checklist',
    title: 'Google Ads for Clinics: A Practical Pre-Launch Checklist | ClinicsAds',
    description:
      'A 10-point pre-launch checklist for clinic Google Ads campaigns. Learn how to verify location radius, policy compliance, negative keywords, and landing page readiness before spending ad dollars.',
    canonical: `${SITE_URL}/resources/google-ads-for-clinics-pre-launch-checklist/`,
    h1: 'Google Ads for Clinics: A Practical Pre-Launch Checklist',
    intent: 'Google Ads pre-launch preparation guide for clinics',
    keywords: [
      'google ads clinic checklist',
      'healthcare ppc setup guide',
      'clinic google ads launch',
      'healthcare negative keyword list',
    ],
    breadcrumbs: [
      { name: 'Home', item: `${SITE_URL}/` },
      { name: 'Resources', item: `${SITE_URL}/services/` },
      { name: 'Pre-Launch Checklist', item: `${SITE_URL}/resources/google-ads-for-clinics-pre-launch-checklist/` },
    ],
    isArticle: true,
    publishedDate: '2026-10-21',
    modifiedDate: '2026-10-22',
    author: 'ClinicsAds Healthcare Strategy Team',
  },
  {
    path: '/resources/google-ads-vs-meta-ads-for-clinics/',
    id: 'resource-google-vs-meta',
    title: 'Google Ads vs. Meta Ads for Clinics: How to Choose the Right Starting Point | ClinicsAds',
    description:
      'Compare Google Ads and Meta Ads for healthcare clinics. Discover which advertising channel fits your treatment types, urgency level, patient intent, and budget.',
    canonical: `${SITE_URL}/resources/google-ads-vs-meta-ads-for-clinics/`,
    h1: 'Google Ads vs. Meta Ads for Clinics: How to Choose the Right Starting Point',
    intent: 'Comparison guide for healthcare advertising channels',
    keywords: [
      'google ads vs meta ads clinics',
      'facebook ads vs google ads for doctors',
      'healthcare advertising comparison',
      'dental marketing channels',
    ],
    breadcrumbs: [
      { name: 'Home', item: `${SITE_URL}/` },
      { name: 'Resources', item: `${SITE_URL}/services/` },
      { name: 'Google Ads vs. Meta Ads', item: `${SITE_URL}/resources/google-ads-vs-meta-ads-for-clinics/` },
    ],
    isArticle: true,
    publishedDate: '2026-10-21',
    modifiedDate: '2026-10-22',
    author: 'ClinicsAds Healthcare Strategy Team',
  },
  {
    path: '/resources/clinic-landing-page-guide/',
    id: 'resource-landing-page-guide',
    title: 'What a Clinic Landing Page Needs Before You Send Paid Traffic | ClinicsAds',
    description:
      'Essential elements of a high-converting clinic landing page: message hierarchy, mobile click-to-call, clinician credibility, HIPAA-friendly forms, and page speed.',
    canonical: `${SITE_URL}/resources/clinic-landing-page-guide/`,
    h1: 'What a Clinic Landing Page Needs Before You Send Paid Traffic',
    intent: 'Clinic landing page optimization guide',
    keywords: [
      'clinic landing page guide',
      'convert medical ad traffic',
      'healthcare landing page best practices',
      'dental landing page requirements',
    ],
    breadcrumbs: [
      { name: 'Home', item: `${SITE_URL}/` },
      { name: 'Resources', item: `${SITE_URL}/services/` },
      { name: 'Landing Page Guide', item: `${SITE_URL}/resources/clinic-landing-page-guide/` },
    ],
    isArticle: true,
    publishedDate: '2026-10-21',
    modifiedDate: '2026-10-22',
    author: 'ClinicsAds Healthcare Strategy Team',
  },
];

export const NOT_FOUND_ROUTE: RouteMetadata = {
  path: '/404',
  id: 'not-found',
  title: 'Page Not Found (404) | ClinicsAds',
  description: 'The requested page could not be found. Explore our clinic marketing services or contact our team directly.',
  canonical: `${SITE_URL}/404`,
  h1: 'Page Not Found',
  intent: 'Error page',
  keywords: [],
  breadcrumbs: [
    { name: 'Home', item: `${SITE_URL}/` },
    { name: '404', item: `${SITE_URL}/404` },
  ],
};

export function normalizePath(path: string): string {
  if (!path || path === '/') return '/';
  let clean = path.split('?')[0].split('#')[0];
  if (!clean.startsWith('/')) clean = '/' + clean;
  if (!clean.endsWith('/') && !clean.includes('.')) clean = clean + '/';
  return clean;
}

export const REDIRECTS: Record<string, string> = {
  '/services/physical-therapy-marketing/': '/services/google-ads-for-clinics/',
  '/services/physical-therapy-marketing': '/services/google-ads-for-clinics/',
  '/physical-therapy-marketing/': '/services/google-ads-for-clinics/',
  '/physical-therapy-marketing': '/services/google-ads-for-clinics/',
};

export function getRouteByPath(pathname: string): RouteMetadata | undefined {
  const normalized = normalizePath(pathname);
  if (REDIRECTS[normalized] || REDIRECTS[pathname]) {
    const dest = REDIRECTS[normalized] || REDIRECTS[pathname];
    return ROUTES.find((r) => r.path === dest);
  }
  return ROUTES.find((r) => r.path === normalized);
}

export function getLegacyHashRedirect(hash: string): string | undefined {
  if (!hash) return undefined;
  const cleanHash = '#' + hash.replace(/^#\/?/, '').trim();
  if (cleanHash === '#service-physical-therapy' || cleanHash === '#physiotherapy-marketing') {
    return '/services/google-ads-for-clinics/';
  }
  for (const route of ROUTES) {
    if (route.legacyHashes && route.legacyHashes.includes(cleanHash)) {
      return route.path;
    }
  }
  return undefined;
}

export function generateSchemaGraph(route: RouteMetadata): object {
  const organizationSchema = {
    '@type': ['Organization', 'ProfessionalService'],
    '@id': `${SITE_URL}/#organization`,
    name: 'ClinicsAds',
    alternateName: ['Clinics Ads', 'ClinicsAds Healthcare Marketing'],
    url: `${SITE_URL}/`,
    logo: {
      '@type': 'ImageObject',
      '@id': `${SITE_URL}/#logo`,
      inLanguage: 'en-US',
      url: `${SITE_URL}/logo.png`,
      contentUrl: `${SITE_URL}/logo.png`,
      width: 512,
      height: 512,
      caption: 'ClinicsAds Official Logo',
    },
    image: {
      '@id': `${SITE_URL}/#logo`,
    },
    description:
      'ClinicsAds is a specialized healthcare marketing agency, clinic marketing agency, and healthcare advertising agency delivering Google Ads for clinics, Meta Ads, clinic landing page design, clinic SEO services, and healthcare PPC management.',
    telephone: '+1-667-347-4729',
    email: 'info@clinicsads.com',
    priceRange: '$$',
    currenciesAccepted: 'USD',
    paymentAccepted: 'Credit Card, ACH, Wire Transfer',
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '08:00',
        closes: '18:00',
      },
    ],
    address: {
      '@type': 'PostalAddress',
      streetAddress: '7917 Mountain Rd NE',
      addressLocality: 'Albuquerque',
      addressRegion: 'NM',
      postalCode: '87110',
      addressCountry: 'US',
    },
    knowsAbout: [
      'Google Ads for clinics',
      'healthcare PPC agency',
      'clinic marketing agency',
      'healthcare marketing agency',
      'digital marketing for clinics',
      'healthcare advertising agency',
      'Google Ads agency for clinics',
      'PPC for medical practices',
      'healthcare Google Ads management',
      'Facebook Ads for clinics',
      'Meta Ads for clinics',
      'Instagram advertising for clinics',
      'clinic landing page design',
      'healthcare landing page design',
      'clinic SEO services',
      'local SEO for clinics',
      'healthcare SEO agency',
      'conversion tracking for clinics',
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Healthcare Marketing Services',
      itemListElement: [
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Google Ads for Clinics & Healthcare PPC', url: `${SITE_URL}/services/google-ads-for-clinics/` } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Meta Ads for Clinics (Facebook & Instagram)', url: `${SITE_URL}/services/meta-ads-for-clinics/` } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Clinic Landing Page Design', url: `${SITE_URL}/services/clinic-landing-pages/` } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Conversion Tracking for Clinics', url: `${SITE_URL}/services/clinic-conversion-tracking/` } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Clinic SEO Services & Local SEO', url: `${SITE_URL}/services/clinic-seo/` } },
      ],
    },
    sameAs: [
      'https://www.instagram.com/clinicsads',
      'https://www.facebook.com/clinicsads',
      'https://x.com/clinicsads',
      'https://www.youtube.com/@clinicsads',
      'https://www.linkedin.com/company/clinicsads',
      'https://www.tiktok.com/@clinicsads',
    ],
  };

  const webSiteSchema = {
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    url: `${SITE_URL}/`,
    name: 'ClinicsAds',
    alternateName: ['Clinics Ads', 'ClinicsAds Healthcare Marketing', 'ClinicsAds Healthcare Advertising'],
    description:
      'Specialized healthcare marketing agency and clinic marketing agency delivering Google Ads for clinics, Meta Ads, clinic landing page design, and local clinic SEO.',
    inLanguage: 'en-US',
    publisher: {
      '@id': `${SITE_URL}/#organization`,
    },
  };

  const breadcrumbListSchema = {
    '@type': 'BreadcrumbList',
    itemListElement: route.breadcrumbs.map((crumb, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: crumb.name,
      item: crumb.item,
    })),
  };

  const graph: any[] = [organizationSchema, webSiteSchema, breadcrumbListSchema];

  if (route.isArticle) {
    graph.push({
      '@type': 'Article',
      '@id': `${route.canonical}#article`,
      headline: route.h1,
      description: route.description,
      url: route.canonical,
      inLanguage: 'en-US',
      datePublished: route.publishedDate,
      dateModified: route.modifiedDate || route.publishedDate,
      author: {
        '@type': 'Organization',
        name: route.author || 'ClinicsAds Healthcare Strategy Team',
        url: `${SITE_URL}/about/`,
      },
      publisher: {
        '@id': `${SITE_URL}/#organization`,
      },
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': route.canonical,
      },
    });
  } else if (route.path.startsWith('/services/') && route.path !== '/services/') {
    graph.push({
      '@type': 'Service',
      '@id': `${route.canonical}#service`,
      name: route.h1,
      serviceType: 'Healthcare Advertising & Patient Acquisition',
      category: 'Healthcare Marketing & PPC',
      description: route.description,
      provider: {
        '@id': `${SITE_URL}/#organization`,
      },
      areaServed: {
        '@type': 'Country',
        name: 'United States',
      },
      offers: {
        '@type': 'Offer',
        priceCurrency: 'USD',
        availability: 'https://schema.org/InStock',
        url: route.canonical,
      },
      termsOfService: `${SITE_URL}/about/`,
    });
  }

  return {
    '@context': 'https://schema.org',
    '@graph': graph,
  };
}

/**
 * Generate FAQPage structured data for service pages with FAQ content.
 * This earns rich snippets in Google SERPs, dramatically increasing CTR.
 */
export function generateFaqSchema(
  faqs: { question: string; answer: string }[]
): object | null {
  if (!faqs || faqs.length === 0) return null;

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}
