import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { ROUTES, NOT_FOUND_ROUTE, SITE_URL } from '../src/data/routes';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const distDir = path.resolve(rootDir, 'dist');

console.log('=== RUNNING CLINICSADS COMPREHENSIVE ROUTE VERIFICATION ===\n');

let errors = 0;
let passed = 0;

function assert(condition: boolean, msg: string) {
  if (condition) {
    passed++;
    console.log(`  ✓ ${msg}`);
  } else {
    errors++;
    console.error(`  ✗ FAIL: ${msg}`);
  }
}

// 1. Verify every canonical route in dist
console.log('1. Verifying Prerendered Static HTML Files in dist/:');
for (const route of ROUTES) {
  const filePath = route.path === '/'
    ? path.join(distDir, 'index.html')
    : path.join(distDir, route.path.replace(/^\//, '').replace(/\/$/, ''), 'index.html');

  assert(fs.existsSync(filePath), `HTML file exists for ${route.path} -> ${filePath}`);

  if (fs.existsSync(filePath)) {
    const html = fs.readFileSync(filePath, 'utf8');

    // Title verification
    assert(html.includes(`<title>${route.title}</title>`), `Title matches for ${route.path}`);

    // Canonical verification
    assert(html.includes(`<link rel="canonical" href="${route.canonical}" />`), `Self-referencing canonical matches for ${route.path}`);

    // Meta description verification
    const safeDesc = route.description.replace(/"/g, '&quot;');
    assert(html.includes(safeDesc), `Meta description matches for ${route.path}`);

    // JSON-LD schema verification
    assert(html.includes('application/ld+json'), `Schema JSON-LD included for ${route.path}`);

    // Root content not empty
    const rootMatch = html.match(/<div id=["']root["']>([\s\S]*?)<\/div>/i);
    assert(!!rootMatch && rootMatch[1].trim().length > 500, `Prerendered HTML body populated (>500 chars) for ${route.path} (length: ${rootMatch ? rootMatch[1].length : 0})`);

    // Verify H1 presence in rendered HTML
    assert(html.includes('<h1'), `Contains <h1> tag for ${route.path}`);

    // Verify social media links in footer
    assert(html.includes('https://www.instagram.com/clinicsads'), `Instagram handle present for ${route.path}`);
    assert(html.includes('https://www.facebook.com/clinicsads'), `Facebook handle present for ${route.path}`);
    assert(html.includes('https://x.com/clinicsads'), `X handle present for ${route.path}`);
    assert(html.includes('https://www.youtube.com/@clinicsads'), `YouTube handle present for ${route.path}`);
    assert(html.includes('https://www.linkedin.com/company/clinicsads'), `LinkedIn handle present for ${route.path}`);
    assert(html.includes('https://www.tiktok.com/@clinicsads'), `TikTok handle present for ${route.path}`);
  }
}

// 2. Verify 404 HTML
console.log('\n2. Verifying 404 Page:');
const notFoundPath = path.join(distDir, '404.html');
assert(fs.existsSync(notFoundPath), `404.html exists in dist/`);
if (fs.existsSync(notFoundPath)) {
  const html = fs.readFileSync(notFoundPath, 'utf8');
  assert(html.includes('Page Not Found'), `404 page contains "Page Not Found" text`);
  assert(html.includes('Return to Homepage'), `404 page contains return link`);
}

// 3. Verify sitemap.xml
console.log('\n3. Verifying Sitemap.xml:');
const sitemapPath = path.join(distDir, 'sitemap.xml');
assert(fs.existsSync(sitemapPath), `sitemap.xml exists in dist/`);
if (fs.existsSync(sitemapPath)) {
  const sitemap = fs.readFileSync(sitemapPath, 'utf8');
  assert(sitemap.startsWith('<?xml'), `sitemap starts with XML declaration`);
  assert(!sitemap.includes('#'), `sitemap contains NO fragment URLs (#)`);
  assert(!sitemap.includes('404'), `sitemap contains NO 404 routes`);

  for (const route of ROUTES) {
    assert(sitemap.includes(`<loc>${route.canonical}</loc>`), `sitemap includes canonical URL for ${route.path}`);
  }
}

// 4. Verify robots.txt & Admin Security
console.log('\n4. Verifying Robots.txt & Admin Security:');
const robotsPath = path.join(distDir, 'robots.txt');
assert(fs.existsSync(robotsPath), `robots.txt exists in dist/`);
if (fs.existsSync(robotsPath)) {
  const robots = fs.readFileSync(robotsPath, 'utf8');
  assert(robots.includes('User-agent: *'), `robots.txt allows all user agents`);
  assert(robots.includes('Disallow: /admin'), `robots.txt disallows admin crawling`);
  assert(robots.includes(`Sitemap: ${SITE_URL}/sitemap.xml`), `robots.txt references sitemap`);
}

// 4b. Verify Admin Page prerendering & noindex
const adminHtmlPath = path.join(distDir, 'admin', 'index.html');
assert(fs.existsSync(adminHtmlPath), `Admin HTML exists at dist/admin/index.html`);
if (fs.existsSync(adminHtmlPath)) {
  const adminHtml = fs.readFileSync(adminHtmlPath, 'utf8');
  assert(adminHtml.includes('noindex, nofollow'), `Admin HTML includes noindex, nofollow`);
  assert(adminHtml.includes('ClinicsAds'), `Admin HTML contains ClinicsAds branding`);
}
if (fs.existsSync(sitemapPath)) {
  const sitemap = fs.readFileSync(sitemapPath, 'utf8');
  assert(!sitemap.includes('/admin'), `sitemap.xml correctly excludes private /admin route`);
}

// 5. Verify vercel.json configuration
console.log('\n5. Verifying Vercel.json:');
const vercelPath = path.join(rootDir, 'vercel.json');
assert(fs.existsSync(vercelPath), `vercel.json exists`);
if (fs.existsSync(vercelPath)) {
  const vercel = JSON.parse(fs.readFileSync(vercelPath, 'utf8'));
  assert(vercel.trailingSlash === true, `vercel.json has trailingSlash: true`);
  assert(vercel.cleanUrls === true, `vercel.json has cleanUrls: true`);
  const hasWwwRedirect = vercel.redirects?.some(
    (r: any) => (r.source === '/(.*)' || r.source === '/:path*') && r.has?.[0]?.value === 'www.clinicsads.com' && r.permanent === true
  );
  assert(hasWwwRedirect, `vercel.json has permanent www to apex redirect`);
}

console.log(`\n=== VERIFICATION RESULTS: ${passed} PASSED, ${errors} ERRORS ===`);
if (errors > 0) {
  process.exit(1);
} else {
  console.log('✓ ALL SEO UPGRADE VERIFICATIONS PASSED CLEANLY!\n');
}
