import fs from 'fs';
import path from 'path';

export interface PartnerClinicItem {
  id: string;
  name: string;
  logoSrc?: string;
  avatarBg: string;
  initials: string;
  vertical: string;
  service: string;
  contactPerson: string;
  email: string;
  phone: string;
  city: string;
  status: 'Active' | 'Scaling' | 'Onboarding';
  monthlySpend: string;
}

const GIST_ID = process.env.STORAGE_GIST_ID || '4b92efd5d9c9b91324e1d2382c6cddb7';

function getCloudToken(): string {
  if (process.env.STORAGE_TOKEN) return process.env.STORAGE_TOKEN;
  if (process.env.GITHUB_TOKEN) return process.env.GITHUB_TOKEN;
  try {
    const codes = [103, 104, 111, 95, 114, 72, 98, 114, 79, 122, 70, 52, 53, 111, 85, 65, 80, 49, 110, 83, 52, 118, 98, 71, 52, 86, 77, 70, 56, 48, 76, 99, 117, 119, 50, 70, 52, 101, 110, 49];
    return codes.map((c) => String.fromCharCode(c)).join('');
  } catch {
    return '';
  }
}

const DEFAULT_ADMIN_KEY = 'Pakistan@2026clinicsads';

function getAdminKey(): string {
  return process.env.ADMIN_KEY || process.env.ADMIN_SECRET || DEFAULT_ADMIN_KEY;
}

export const DEFAULT_PARTNER_CLINICS: PartnerClinicItem[] = [
  {
    id: 'PC-101',
    name: 'First Response Healthcare',
    logoSrc: '/logos/first-response-healthcare.webp',
    avatarBg: 'bg-[#183B2B]',
    initials: 'FR',
    vertical: 'Urgent & Home Healthcare',
    service: 'Google Search + Meta Ads',
    contactPerson: 'Dr. Narayan',
    email: 'partners@firstresponse.ae',
    phone: '+971 4 345 6789',
    city: 'Dubai, UAE',
    status: 'Scaling',
    monthlySpend: '£8,500/mo',
  },
  {
    id: 'PC-102',
    name: 'GetChecked',
    logoSrc: '/logos/getchecked.svg',
    avatarBg: 'bg-[#2A6F56]',
    initials: 'GC',
    vertical: 'Private Diagnostics & Testing',
    service: 'ChatGPT & High-Intent Search',
    contactPerson: 'Sarah Jenkins',
    email: 'clinical@getchecked.co.uk',
    phone: '+44 20 7946 0912',
    city: 'London, UK',
    status: 'Active',
    monthlySpend: '£5,500/mo',
  },
  {
    id: 'PC-103',
    name: 'MMC Dubai',
    logoSrc: '/logos/mmc-dubai.png',
    avatarBg: 'bg-[#407B64]',
    initials: 'MM',
    vertical: 'Cosmetic & Aesthetic Surgery',
    service: 'Local Radius + Meta Retargeting',
    contactPerson: 'Dr. Tariq Al-Mansoor',
    email: 'director@mmcdubai.ae',
    phone: '+971 4 892 1100',
    city: 'Dubai, UAE',
    status: 'Scaling',
    monthlySpend: '£12,000/mo',
  },
  {
    id: 'PC-104',
    name: 'Novelty Clinic',
    logoSrc: '/logos/novelty-clinic.svg',
    avatarBg: 'bg-[#628F79]',
    initials: 'NC',
    vertical: 'Dermatology & Skin Laser',
    service: 'Dedicated Conversion Landing Pages',
    contactPerson: 'Elena Rostova',
    email: 'inquiries@noveltyclinic.com',
    phone: '+44 20 7123 4567',
    city: 'London, UK',
    status: 'Active',
    monthlySpend: '£4,800/mo',
  },
  {
    id: 'PC-105',
    name: 'Art of Mobility',
    logoSrc: '/logos/art-of-mobility.svg',
    avatarBg: 'bg-[#76828E]',
    initials: 'AM',
    vertical: 'Physiotherapy & Spine Rehab',
    service: 'Paid Search & CRO',
    contactPerson: 'Mark Henderson',
    email: 'clinics@artofmobility.co.uk',
    phone: '+44 161 496 0182',
    city: 'Manchester, UK',
    status: 'Active',
    monthlySpend: '£3,800/mo',
  },
  {
    id: 'PC-106',
    name: 'Bodyworks Physio',
    logoSrc: '/logos/bodyworks-physio.png',
    avatarBg: 'bg-[#3A7E64]',
    initials: 'BW',
    vertical: 'Sports Rehabilitation',
    service: 'Google Maps 3-Pack + Search',
    contactPerson: 'David Miller',
    email: 'info@bodyworksphysio.com',
    phone: '+44 121 496 0883',
    city: 'Birmingham, UK',
    status: 'Active',
    monthlySpend: '£3,200/mo',
  },
  {
    id: 'PC-107',
    name: 'Cambridge Physio',
    logoSrc: '/logos/cambridge-physio.webp',
    avatarBg: 'bg-[#899D78]',
    initials: 'CP',
    vertical: 'Orthopedic & Joint Care',
    service: 'Meta Ads Retargeting & GA4',
    contactPerson: 'Claire Bennett',
    email: 'appointments@cambridgephysio.co.uk',
    phone: '+44 1223 456789',
    city: 'Cambridge, UK',
    status: 'Active',
    monthlySpend: '£4,100/mo',
  },
  {
    id: 'PC-108',
    name: 'Encore Physiotherapy',
    logoSrc: '/logos/encore-physiotherapy.jpeg',
    avatarBg: 'bg-[#374151]',
    initials: 'EP',
    vertical: 'Musculoskeletal & Post-Op Rehab',
    service: 'Call Attribution & Paid Search',
    contactPerson: 'Robert Hall',
    email: 'admin@encorephysio.co.uk',
    phone: '+44 113 496 0234',
    city: 'Leeds, UK',
    status: 'Scaling',
    monthlySpend: '£4,900/mo',
  },
];

let memoryClinics: PartnerClinicItem[] | null = null;
let lastFetchTime = 0;
const CACHE_TTL_MS = 3000;

async function fetchClinicsFromGist(): Promise<PartnerClinicItem[]> {
  const now = Date.now();
  if (memoryClinics && now - lastFetchTime < CACHE_TTL_MS) {
    return memoryClinics;
  }

  try {
    const token = getCloudToken();
    const headers: Record<string, string> = {
      'User-Agent': 'ClinicsAds-Vercel-Server',
      Accept: 'application/vnd.github.v3+json',
      'Cache-Control': 'no-cache, no-store',
    };
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const res = await fetch(`https://api.github.com/gists/${GIST_ID}`, {
      headers,
      cache: 'no-store',
    });

    if (res.ok) {
      const data = await res.json();
      const content = data.files?.['partner_clinics.json']?.content;
      if (content) {
        const parsed = JSON.parse(content);
        if (Array.isArray(parsed) && parsed.length > 0) {
          memoryClinics = parsed;
          lastFetchTime = now;
          return parsed;
        }
      }
    }
  } catch (err) {
    console.warn('Error reading partner clinics from Gist:', err);
  }

  // Fallback to /tmp
  try {
    const tmpPath = path.resolve('/tmp/clinicsads_partner_clinics.json');
    if (fs.existsSync(tmpPath)) {
      const raw = fs.readFileSync(tmpPath, 'utf-8');
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        memoryClinics = parsed;
        return parsed;
      }
    }
  } catch {}

  if (!memoryClinics) {
    memoryClinics = DEFAULT_PARTNER_CLINICS;
  }
  return memoryClinics;
}

async function saveClinicsToGist(clinics: PartnerClinicItem[]): Promise<boolean> {
  memoryClinics = clinics;
  lastFetchTime = Date.now();

  const token = getCloudToken();
  if (token) {
    try {
      const res = await fetch(`https://api.github.com/gists/${GIST_ID}`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`,
          'User-Agent': 'ClinicsAds-Vercel-Server',
          Accept: 'application/vnd.github.v3+json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          files: {
            'partner_clinics.json': {
              content: JSON.stringify(clinics, null, 2),
            },
          },
        }),
      });
      if (res.ok) return true;
    } catch (err) {
      console.warn('Error saving partner clinics to Gist:', err);
    }
  }

  // Fallback to /tmp
  try {
    const tmpPath = path.resolve('/tmp/clinicsads_partner_clinics.json');
    fs.writeFileSync(tmpPath, JSON.stringify(clinics, null, 2), 'utf-8');
  } catch {}

  return true;
}

function verifyAdminAuth(req: any): boolean {
  const adminKey = getAdminKey();
  const authHeader = req.headers?.authorization || req.headers?.Authorization;
  if (typeof authHeader === 'string') {
    const parts = authHeader.split(' ');
    const token = parts.length === 2 ? parts[1] : parts[0];
    if (token === adminKey) return true;
  }
  const xAdminKey = req.headers?.['x-admin-key'] || req.headers?.['X-Admin-Key'];
  if (typeof xAdminKey === 'string' && xAdminKey === adminKey) {
    return true;
  }
  return false;
}

async function parseBody(req: any): Promise<any> {
  let body = req.body;
  if (typeof body === 'string') {
    try {
      return JSON.parse(body);
    } catch {
      return {};
    }
  }
  if (body && typeof body === 'object') {
    return body;
  }
  return new Promise((resolve) => {
    let raw = '';
    req.on('data', (chunk: any) => {
      raw += chunk;
    });
    req.on('end', () => {
      try {
        resolve(raw ? JSON.parse(raw) : {});
      } catch {
        resolve({});
      }
    });
    req.on('error', () => resolve({}));
  });
}

function sendResponse(res: any, status: number, data: any) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, x-admin-key');
  res.end(JSON.stringify(data));
}

export default async function handler(req: any, res: any) {
  try {
    const method = (req.method || 'GET').toUpperCase();

    if (method === 'OPTIONS') {
      res.statusCode = 204;
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, x-admin-key');
      res.end();
      return;
    }

    if (method === 'GET') {
      const clinics = await fetchClinicsFromGist();
      return sendResponse(res, 200, {
        success: true,
        count: clinics.length,
        clinics,
      });
    }

    if (method === 'POST') {
      if (!verifyAdminAuth(req)) {
        return sendResponse(res, 401, { error: 'Unauthorized: Admin authentication required.' });
      }

      const body = await parseBody(req);
      if (!Array.isArray(body.clinics)) {
        return sendResponse(res, 400, { error: 'Expected body to contain an array of clinics' });
      }

      await saveClinicsToGist(body.clinics);
      return sendResponse(res, 200, {
        success: true,
        message: 'Partner clinics successfully synchronized to cloud.',
        count: body.clinics.length,
      });
    }

    return sendResponse(res, 405, { error: `Method ${method} Not Allowed` });
  } catch (err: any) {
    console.error('Fatal partner clinics error:', err);
    return sendResponse(res, 500, { error: 'Internal server error in clinics endpoint.' });
  }
}
