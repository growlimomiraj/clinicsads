import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import React from 'react';
import { renderToString } from 'react-dom/server';
import App from '../src/App';
import {
  ROUTES,
  NOT_FOUND_ROUTE,
  SITE_URL,
  generateSchemaGraph,
  generateFaqSchema,
  RouteMetadata,
} from '../src/data/routes';
import { SERVICES_CONTENT } from '../src/data/siteContent';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const distDir = path.resolve(rootDir, 'dist');
const templatePath = path.resolve(distDir, 'index.html');

function injectMetadataAndContent(
  templateHtml: string,
  route: RouteMetadata,
  appHtml: string
): string {
  let html = templateHtml;

  // 1. Replace Title
  html = html.replace(
    /<title>.*?<\/title>/i,
    `<title>${route.title}</title>`
  );

  // 2. Replace Meta Description
  html = html.replace(
    /<meta\s+name=["']description["']\s+content=["'].*?["']\s*\/?>/i,
    `<meta name="description" content="${route.description.replace(/"/g, '&quot;')}" />`
  );

  // 3. Replace Canonical
  html = html.replace(
    /<link\s+rel=["']canonical["']\s+href=["'].*?["']\s*\/?>/i,
    `<link rel="canonical" href="${route.canonical}" />`
  );

  // 4. Replace OG tags
  html = html.replace(
    /<meta\s+property=["']og:title["']\s+content=["'].*?["']\s*\/?>/i,
    `<meta property="og:title" content="${route.title.replace(/"/g, '&quot;')}" />`
  );
  html = html.replace(
    /<meta\s+property=["']og:description["']\s+content=["'].*?["']\s*\/?>/i,
    `<meta property="og:description" content="${route.description.replace(/"/g, '&quot;')}" />`
  );
  html = html.replace(
    /<meta\s+property=["']og:url["']\s+content=["'].*?["']\s*\/?>/i,
    `<meta property="og:url" content="${route.canonical}" />`
  );

  // 5. Inject hreflang for English targeting
  if (!html.includes('hreflang')) {
    html = html.replace(
      '</head>',
      `    <link rel="alternate" hreflang="en" href="${route.canonical}" />\n    <link rel="alternate" hreflang="x-default" href="${route.canonical}" />\n  </head>`
    );
  }

  // 6. Replace Schema.org JSON-LD
  const schemaJson = JSON.stringify(generateSchemaGraph(route), null, 2);
  const schemaTag = `<script type="application/ld+json">\n${schemaJson}\n    </script>`;
  html = html.replace(
    /<script\s+type=["']application\/ld\+json["']>[\s\S]*?<\/script>/i,
    schemaTag
  );

  // 7. Inject FAQPage schema for service pages with FAQ content
  if (route.path.startsWith('/services/') && route.path !== '/services/') {
    const serviceCard = SERVICES_CONTENT.cards.find(
      (card) => card.path === route.path
    );
    if (serviceCard && serviceCard.details.faq && serviceCard.details.faq.length > 0) {
      const faqSchema = generateFaqSchema(serviceCard.details.faq);
      if (faqSchema) {
        const faqSchemaJson = JSON.stringify(faqSchema, null, 2);
        html = html.replace(
          '</head>',
          `    <script type="application/ld+json">\n${faqSchemaJson}\n    </script>\n  </head>`
        );
      }
    }
  }

  // 8. Inject prerendered App HTML into <div id="root">
  html = html.replace(
    /<div id=["']root["']>[\s\S]*?<\/div>/i,
    `<div id="root">${appHtml}</div>`
  );

  return html;
}

function generateSitemapXml(routes: RouteMetadata[]): string {
  const currentDate = new Date().toISOString().slice(0, 10);

  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n`;
  xml += `        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n`;

  for (const route of routes) {
    const isHome = route.path === '/';
    const isService = route.path.startsWith('/services/');
    const priority = isHome ? '1.0' : isService ? '0.9' : '0.8';
    const changefreq = isHome ? 'weekly' : 'monthly';

    xml += `  <url>\n`;
    xml += `    <loc>${route.canonical}</loc>\n`;
    xml += `    <lastmod>${route.modifiedDate || currentDate}</lastmod>\n`;
    xml += `    <changefreq>${changefreq}</changefreq>\n`;
    xml += `    <priority>${priority}</priority>\n`;
    if (isHome) {
      xml += `    <image:image>\n`;
      xml += `      <image:loc>${SITE_URL}/logo.png</image:loc>\n`;
      xml += `      <image:title>ClinicsAds Official Logo</image:title>\n`;
      xml += `      <image:caption>ClinicsAds - Healthcare Advertising &amp; Patient Acquisition Agency</image:caption>\n`;
      xml += `    </image:image>\n`;
      xml += `    <image:image>\n`;
      xml += `      <image:loc>${SITE_URL}/og-image.png</image:loc>\n`;
      xml += `      <image:title>ClinicsAds Healthcare Advertising Banner</image:title>\n`;
      xml += `    </image:image>\n`;
    }
    xml += `  </url>\n`;
  }

  xml += `</urlset>\n`;
  return xml;
}

function generateRobotsTxt(): string {
  return `User-agent: *
Disallow: /admin
Disallow: /admin/
Allow: /
Allow: /favicon*
Allow: /logo*
Allow: /apple-touch-icon.png
Allow: /android-chrome*

User-agent: Googlebot
Allow: /

User-agent: Googlebot-Image
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml
`;
}

async function runPrerender() {
  console.log('--- STARTING CLINICSADS PRERENDERING PIPELINE ---');

  if (!fs.existsSync(templatePath)) {
    console.error(`Error: Base template not found at ${templatePath}. Run 'vite build' first.`);
    process.exit(1);
  }

  const baseHtml = fs.readFileSync(templatePath, 'utf8');

  // 1. Prerender All Canonical Routes
  for (const route of ROUTES) {
    console.log(`Prerendering route: ${route.path} ...`);
    const appHtml = renderToString(
      React.createElement(App as React.ComponentType<{ initialPath?: string }>, {
        initialPath: route.path,
      })
    );
    const finalHtml = injectMetadataAndContent(baseHtml, route, appHtml);

    let outputPath = '';
    if (route.path === '/') {
      outputPath = path.join(distDir, 'index.html');
    } else {
      const cleanSub = route.path.replace(/^\//, '').replace(/\/$/, '');
      const targetSubDir = path.join(distDir, cleanSub);
      if (!fs.existsSync(targetSubDir)) {
        fs.mkdirSync(targetSubDir, { recursive: true });
      }
      outputPath = path.join(targetSubDir, 'index.html');
    }

    fs.writeFileSync(outputPath, finalHtml, 'utf8');
    console.log(`✓ Generated static HTML: ${outputPath} (${finalHtml.length} bytes)`);
  }

  // 2. Prerender 404 Not Found Page
  console.log('Prerendering 404 page...');
  const notFoundAppHtml = renderToString(
    React.createElement(App as React.ComponentType<{ initialPath?: string }>, {
      initialPath: '/404',
    })
  );
  const notFoundHtml = injectMetadataAndContent(baseHtml, NOT_FOUND_ROUTE, notFoundAppHtml);
  const notFoundPath = path.join(distDir, '404.html');
  fs.writeFileSync(notFoundPath, notFoundHtml, 'utf8');
  console.log(`✓ Generated 404 HTML: ${notFoundPath} (${notFoundHtml.length} bytes)`);

  // 2b. Prerender Secure Admin Portal (with noindex, nofollow)
  console.log('Prerendering Admin Portal...');
  const adminRoute: RouteMetadata = {
    id: 'admin',
    path: '/admin/',
    canonical: `${SITE_URL}/admin/`,
    title: 'ClinicsAds Administrator Portal | Secure Login',
    description: 'Private administrative management portal for ClinicsAds leads and clinic operations.',
    h1: 'Operations Hub',
    intent: 'Operations & Management',
    keywords: [],
    breadcrumbs: [
      { name: 'Home', item: `${SITE_URL}/` },
      { name: 'Admin', item: `${SITE_URL}/admin/` },
    ],
  };
  const adminAppHtml = renderToString(
    React.createElement(App as React.ComponentType<{ initialPath?: string }>, {
      initialPath: '/admin',
    })
  );
  let adminHtml = injectMetadataAndContent(baseHtml, adminRoute, adminAppHtml);
  adminHtml = adminHtml.replace(
    '</head>',
    '    <meta name="robots" content="noindex, nofollow" />\n  </head>'
  );
  const adminDir = path.join(distDir, 'admin');
  if (!fs.existsSync(adminDir)) {
    fs.mkdirSync(adminDir, { recursive: true });
  }
  const adminPath = path.join(adminDir, 'index.html');
  fs.writeFileSync(adminPath, adminHtml, 'utf8');
  console.log(`✓ Generated Admin HTML: ${adminPath} (${adminHtml.length} bytes)`);

  // 3. Generate Valid XML Sitemap
  console.log('Generating sitemap.xml...');
  const sitemapXml = generateSitemapXml(ROUTES);
  fs.writeFileSync(path.join(distDir, 'sitemap.xml'), sitemapXml, 'utf8');
  fs.writeFileSync(path.join(rootDir, 'public', 'sitemap.xml'), sitemapXml, 'utf8');
  console.log('✓ Generated canonical sitemap.xml');

  // 4. Generate Robots.txt
  console.log('Generating robots.txt...');
  const robotsTxt = generateRobotsTxt();
  fs.writeFileSync(path.join(distDir, 'robots.txt'), robotsTxt, 'utf8');
  fs.writeFileSync(path.join(rootDir, 'public', 'robots.txt'), robotsTxt, 'utf8');
  console.log('✓ Generated robots.txt');

  console.log('--- PRERENDERING PIPELINE COMPLETE ---');
}

runPrerender().catch((err) => {
  console.error('Fatal prerendering error:', err);
  process.exit(1);
});
