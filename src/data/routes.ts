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
    title: 'Healthcare Marketing Agency for Clinics | ClinicsAds',
    description:
      'Specialized healthcare marketing agency helping dental, medical, and specialty clinics acquire qualified patient inquiries through Google Ads, Meta Ads, and high-converting landing pages.',
    canonical: `${SITE_URL}/`,
    h1: 'Healthcare Marketing Agency for Clinics That Want More Qualified Patient Inquiries',
    intent: 'Healthcare marketing agency for clinics',
    keywords: [
      'healthcare marketing agency',
      'marketing for clinics',
      'clinic advertising agency',
      'medical practice marketing',
      'patient acquisition agency',
    ],
    breadcrumbs: [{ name: 'Home', item: `${SITE_URL}/` }],
    legacyHashes: ['#home'],
  },
  {
    path: '/services/',
    id: 'services',
    title: 'Clinic Marketing Services | ClinicsAds',
    description:
      'Explore our specialized marketing services for clinics: Google Ads management, Meta paid social, high-converting clinic landing pages, conversion tracking, and local SEO.',
    canonical: `${SITE_URL}/services/`,
    h1: 'Clinic Marketing Services Engineered for Patient Acquisition',
    intent: 'Clinic marketing service overview',
    keywords: [
      'clinic marketing services',
      'healthcare advertising services',
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
    title: 'Google Ads for Clinics | Healthcare PPC | ClinicsAds',
    description:
      'High-intent Google Ads management for medical and dental clinics. Capture active local patient searches, eliminate wasted clicks with negative keywords, and drive booked consultations.',
    canonical: `${SITE_URL}/services/google-ads-for-clinics/`,
    h1: 'Google Ads Management for Clinics & Healthcare Practices',
    intent: 'Google Ads management; healthcare PPC',
    keywords: [
      'google ads for clinics',
      'healthcare ppc agency',
      'medical practice google ads',
      'dental clinic ppc',
      'google ads management for healthcare',
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
    title: 'Meta Ads for Clinics | ClinicsAds',
    description:
      'Compliant Facebook and Instagram advertising for healthcare clinics. Build local awareness, educate prospective patients, and generate qualified appointment inquiries.',
    canonical: `${SITE_URL}/services/meta-ads-for-clinics/`,
    h1: 'Meta Ads for Clinics: Facebook & Instagram Patient Acquisition',
    intent: 'Facebook and Instagram advertising',
    keywords: [
      'meta ads for clinics',
      'facebook ads for medical clinics',
      'instagram advertising for dentists',
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
    title: 'Landing Pages for Clinics | ClinicsAds',
    description:
      'Fast, mobile-optimized landing pages designed specifically for healthcare clinics. Clear message hierarchy, accessible contact flows, and proven conversion design.',
    canonical: `${SITE_URL}/services/clinic-landing-pages/`,
    h1: 'Clinic Landing Pages Built to Convert Paid Ad Traffic into Inquiries',
    intent: 'Landing-page design for clinic campaigns',
    keywords: [
      'clinic landing pages',
      'healthcare landing page design',
      'medical clinic conversion rate optimization',
      'landing pages for dentists',
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
    title: 'Clinic Conversion Tracking | ClinicsAds',
    description:
      'GA4, Google Tag Manager, and server-side inquiry attribution for healthcare clinics. Track verified phone calls, appointment forms, and patient inquiry quality without privacy leaks.',
    canonical: `${SITE_URL}/services/clinic-conversion-tracking/`,
    h1: 'Clinic Conversion Tracking: GA4, GTM & Patient Inquiry Measurement',
    intent: 'GA4, GTM, and inquiry measurement',
    keywords: [
      'clinic conversion tracking',
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
    title: 'Clinic SEO & Local Search Services | ClinicsAds',
    description:
      'Local search engine optimization and Google Maps 3-Pack rankings for clinics. Attract patients searching locally for treatments with crawlable service pages and authentic authority.',
    canonical: `${SITE_URL}/services/clinic-seo/`,
    h1: 'Clinic SEO & Local Search Optimization for Healthcare Practices',
    intent: 'SEO services for clinics',
    keywords: [
      'clinic seo services',
      'local search for clinics',
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
    title: 'About ClinicsAds | Healthcare Marketing',
    description:
      'Learn about ClinicsAds: our clinical marketing methodology, transparent month-to-month partnership model, and dedicated focus on patient acquisition for healthcare practices.',
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
    title: 'Contact ClinicsAds | Discuss Your Clinic Marketing',
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
    modifiedDate: '2026-10-21',
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
    modifiedDate: '2026-10-21',
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
    modifiedDate: '2026-10-21',
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

export function getRouteByPath(pathname: string): RouteMetadata | undefined {
  const normalized = normalizePath(pathname);
  return ROUTES.find((r) => r.path === normalized);
}

export function getLegacyHashRedirect(hash: string): string | undefined {
  if (!hash) return undefined;
  const cleanHash = '#' + hash.replace(/^#\/?/, '').trim();
  for (const route of ROUTES) {
    if (route.legacyHashes && route.legacyHashes.includes(cleanHash)) {
      return route.path;
    }
  }
  return undefined;
}

export function generateSchemaGraph(route: RouteMetadata): object {
  const organizationSchema = {
    '@type': 'Organization',
    '@id': `${SITE_URL}/#organization`,
    name: 'ClinicsAds',
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
      'Healthcare advertising agency helping clinics acquire more qualified patient inquiries through Google Ads, Meta Ads, and high-converting landing pages.',
    telephone: '+1-667-347-4729',
    email: 'info@clinicsads.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '7917 Mountain Rd NE',
      addressLocality: 'Albuquerque',
      addressRegion: 'NM',
      postalCode: '87110',
      addressCountry: 'US',
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
    alternateName: ['Clinics Ads', 'ClinicsAds Healthcare Marketing'],
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
      description: route.description,
      provider: {
        '@id': `${SITE_URL}/#organization`,
      },
      areaServed: {
        '@type': 'Country',
        name: 'United States',
      },
      termsOfService: `${SITE_URL}/about/`,
    });
  }

  return {
    '@context': 'https://schema.org',
    '@graph': graph,
  };
}
