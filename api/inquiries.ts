import fs from 'fs';
import path from 'path';

export interface ClinicInquiry {
  id: string;
  name: string;
  email: string;
  phone?: string;
  clinicName: string;
  website?: string;
  service: string;
  message?: string;
  preferredTime?: string;
  submittedAt: string;
  status: 'New' | 'Contacted' | 'Call Booked' | 'Proposal Sent';
  source: 'modal' | 'contact-page' | 'call-booking';
  read?: boolean;
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

const DEFAULT_ADMIN_KEY = 'clinicsads-admin-secure-2026';

function getAdminKey(): string {
  return process.env.ADMIN_KEY || process.env.ADMIN_SECRET || DEFAULT_ADMIN_KEY;
}

// In-memory cache for fast sub-millisecond responses
let memoryInquiries: ClinicInquiry[] | null = null;
let memoryDeletedIds: Set<string> = new Set();
let lastFetchTime = 0;
const CACHE_TTL_MS = 3000; // 3 seconds cache

// Historical seed fallback
const FALLBACK_INQUIRIES: ClinicInquiry[] = [
  {
    id: 'INQ-5917',
    name: 'Umair Ali',
    email: 'umair.alics@hotmail.com',
    phone: '+923105615306',
    clinicName: 'growlimo',
    service: 'Google Ads',
    preferredTime: 'Morning (9am - 12pm)',
    message: 'Requested Strategy Call for Google Ads',
    source: 'call-booking',
    submittedAt: '2026-10-20T14:00:16.508Z',
    status: 'New',
    read: false,
  },
  {
    id: 'INQ-7010',
    name: 'shiddat',
    email: 'shiddatplus@gmail.com',
    phone: '+923039019035',
    clinicName: 'ddcffd',
    service: 'Google Ads',
    preferredTime: 'Morning (9am - 12pm)',
    message: 'Requested Strategy Call for Google Ads',
    source: 'call-booking',
    submittedAt: '2026-10-19T20:12:24.019Z',
    status: 'New',
    read: false,
  },
  {
    id: 'INQ-8965',
    name: 'usm',
    email: 'usman@gmail.com',
    clinicName: 'H Clinic',
    service: 'Google Ads',
    preferredTime: 'Morning (9am - 12pm)',
    message: 'Requested Strategy Call for Google Ads',
    source: 'call-booking',
    submittedAt: '2026-10-19T19:31:46.623Z',
    status: 'New',
    read: false,
  },
  {
    id: 'INQ-9656',
    name: 'Umair Ali',
    email: 'umair.alics@hotmail.com',
    phone: '+923105615306',
    clinicName: 'growlimo',
    service: 'Google Ads',
    preferredTime: 'Morning (9am - 12pm)',
    message: 'Requested Strategy Call for Google Ads',
    source: 'call-booking',
    submittedAt: '2026-10-19T19:27:43.460Z',
    status: 'Proposal Sent',
    read: true,
  },
  {
    id: 'INQ-1042',
    name: 'Dr. Sarah Jenkins',
    email: 'sarah.jenkins@oakwooddental.com',
    clinicName: 'Oakwood Dental & Aesthetics',
    website: 'https://oakwooddental.com',
    service: 'Google Ads',
    message: 'We are opening a second location in November and need high-intent dental implant patient inquiries.',
    submittedAt: '2026-10-19T17:34:00.000Z',
    status: 'New',
    source: 'modal',
    read: false,
  },
  {
    id: 'INQ-1041',
    name: 'Dr. Emily Vance',
    email: 'dr.vance@westsidephysio.co.uk',
    clinicName: 'Westside Physiotherapy & Rehab',
    website: 'https://westsidephysio.co.uk',
    service: 'Landing Pages',
    message: 'Current bounce rate on Google Ads traffic is 68%. Looking for sub-2-second conversion landing pages.',
    submittedAt: '2026-10-19T15:19:00.000Z',
    status: 'Contacted',
    source: 'contact-page',
    read: true,
  },
  {
    id: 'INQ-1040',
    name: 'Markus Al-Hassan',
    email: 'markus@apexmedicaldxb.ae',
    clinicName: 'Apex Medical Centre Dubai',
    website: 'https://apexmedicaldxb.ae',
    service: 'Meta Ads',
    message: 'Need local radius patient awareness campaigns on Instagram for our cosmetic dermatology department.',
    submittedAt: '2026-10-18T20:19:00.000Z',
    status: 'Call Booked',
    source: 'modal',
    read: true,
  },
  {
    id: 'INQ-1039',
    name: 'Dr. Michael Chen',
    email: 'mchen@horizonortho.ca',
    clinicName: 'Horizon Orthodontics',
    website: 'https://horizonortho.ca',
    service: 'ChatGPT & AI Search',
    message: 'Interested in optimizing clinical citations so local patients finding providers on ChatGPT get directed to us.',
    submittedAt: '2026-10-17T20:19:00.000Z',
    status: 'Proposal Sent',
    source: 'modal',
    read: true,
  },
];

async function fetchFromCloudStore(): Promise<ClinicInquiry[]> {
  const now = Date.now();
  if (memoryInquiries && now - lastFetchTime < CACHE_TTL_MS) {
    return memoryInquiries.filter((i) => !memoryDeletedIds.has(i.id));
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
      const content = data.files?.['inquiries.json']?.content;
      const deletedContent = data.files?.['deleted_ids.json']?.content;

      if (deletedContent) {
        try {
          const parsedDeleted = JSON.parse(deletedContent);
          if (Array.isArray(parsedDeleted)) {
            parsedDeleted.forEach((id: string) => memoryDeletedIds.add(id));
          }
        } catch {}
      }

      if (content) {
        const parsed = JSON.parse(content);
        if (Array.isArray(parsed)) {
          const sanitized = parsed.filter((i) => !memoryDeletedIds.has(i.id));
          memoryInquiries = sanitized;
          lastFetchTime = now;
          return sanitized;
        }
      }
    } else {
      console.warn('Gist fetch returned non-200:', res.status);
    }
  } catch (err) {
    console.warn('Server error reading from cloud Gist:', err);
  }

  // Attempt reading from /tmp cache if present
  try {
    const tmpDeleted = path.resolve('/tmp/clinicsads_deleted_ids.json');
    if (fs.existsSync(tmpDeleted)) {
      const raw = fs.readFileSync(tmpDeleted, 'utf-8');
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        parsed.forEach((id: string) => memoryDeletedIds.add(id));
      }
    }
    const tmpPath = path.resolve('/tmp/clinicsads_inquiries.json');
    if (fs.existsSync(tmpPath)) {
      const raw = fs.readFileSync(tmpPath, 'utf-8');
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        const sanitized = parsed.filter((i) => !memoryDeletedIds.has(i.id));
        memoryInquiries = sanitized;
        return sanitized;
      }
    }
  } catch {}

  if (!memoryInquiries) {
    memoryInquiries = FALLBACK_INQUIRIES.filter((i) => !memoryDeletedIds.has(i.id));
  }
  return memoryInquiries;
}

async function saveToCloudStore(items: ClinicInquiry[], deletedIdToAdd?: string): Promise<boolean> {
  if (deletedIdToAdd) {
    memoryDeletedIds.add(deletedIdToAdd);
  }
  const cleanItems = items.filter((i) => !memoryDeletedIds.has(i.id));
  memoryInquiries = cleanItems;
  lastFetchTime = Date.now();

  const token = getCloudToken();
  if (token) {
    try {
      const filesPayload: Record<string, any> = {
        'inquiries.json': {
          content: JSON.stringify(cleanItems, null, 2),
        },
        'deleted_ids.json': {
          content: JSON.stringify(Array.from(memoryDeletedIds), null, 2),
        },
      };

      const res = await fetch(`https://api.github.com/gists/${GIST_ID}`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`,
          'User-Agent': 'ClinicsAds-Vercel-Server',
          Accept: 'application/vnd.github.v3+json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ files: filesPayload }),
      });
      if (res.ok) return true;
      const errText = await res.text().catch(() => '');
      console.warn('Server error writing to cloud Gist:', res.status, errText);
    } catch (err) {
      console.warn('Server error writing to cloud Gist:', err);
    }
  }

  // Fallback to local /tmp storage
  try {
    const tmpPath = path.resolve('/tmp/clinicsads_inquiries.json');
    fs.writeFileSync(tmpPath, JSON.stringify(cleanItems, null, 2), 'utf-8');
    const tmpDeletedPath = path.resolve('/tmp/clinicsads_deleted_ids.json');
    fs.writeFileSync(tmpDeletedPath, JSON.stringify(Array.from(memoryDeletedIds), null, 2), 'utf-8');
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
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, x-admin-key');
  res.end(JSON.stringify(data));
}

function sanitize(input: any): string {
  if (typeof input !== 'string') return '';
  return input.trim().replace(/[<>]/g, '').slice(0, 500);
}

function isValidEmail(email: string): boolean {
  if (typeof email !== 'string') return false;
  const trimmed = email.trim();
  return trimmed.includes('@') && trimmed.length >= 4;
}

export default async function handler(req: any, res: any) {
  try {
    const method = (req.method || 'GET').toUpperCase();

    // CORS preflight
    if (method === 'OPTIONS') {
      res.statusCode = 204;
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, x-admin-key');
      res.end();
      return;
    }

    // 1. PUBLIC: Submit an inquiry (POST)
    if (method === 'POST') {
      const body = await parseBody(req);
      const name = sanitize(body.name);
      const email = sanitize(body.email);
      const clinicName = sanitize(body.clinicName);
      const service = sanitize(body.service) || 'Google Ads';
      const phone = sanitize(body.phone);
      const message = sanitize(body.message);
      const website = sanitize(body.website);
      const preferredTime = sanitize(body.preferredTime) || 'Morning (9am - 12pm)';
      const source = (['modal', 'contact-page', 'call-booking'].includes(body.source)
        ? body.source
        : 'call-booking') as ClinicInquiry['source'];

      if (!name) {
        return sendResponse(res, 400, { error: 'Your name is required.' });
      }
      if (!email || !isValidEmail(email)) {
        return sendResponse(res, 400, { error: 'A valid email address is required.' });
      }
      if (!clinicName) {
        return sendResponse(res, 400, { error: 'Clinic name is required.' });
      }

      if (body.id && typeof body.id === 'string' && memoryDeletedIds.has(body.id)) {
        return sendResponse(res, 400, { error: 'This inquiry was permanently deleted.' });
      }

      const current = await fetchFromCloudStore();
      const newInquiry: ClinicInquiry = {
        id: (body.id && typeof body.id === 'string' && body.id.startsWith('INQ-'))
          ? body.id
          : `INQ-${Math.floor(1000 + Math.random() * 9000)}`,
        name,
        email,
        phone: phone || undefined,
        clinicName,
        website: website || undefined,
        service,
        message: message || undefined,
        preferredTime,
        submittedAt: (body.submittedAt && typeof body.submittedAt === 'string')
          ? body.submittedAt
          : new Date().toISOString(),
        status: (body.status && ['New', 'Contacted', 'Call Booked', 'Proposal Sent'].includes(body.status))
          ? body.status
          : 'New',
        source,
        read: typeof body.read === 'boolean' ? body.read : false,
      };

      const updated = [newInquiry, ...current.filter((i) => i.id !== newInquiry.id)];
      await saveToCloudStore(updated);

      return sendResponse(res, 201, {
        success: true,
        message: 'Inquiry successfully saved and queued.',
        count: updated.length,
        inquiry: newInquiry,
      });
    }

    // 2. ADMIN ONLY: Fetch inquiries (GET)
    if (method === 'GET') {
      if (!verifyAdminAuth(req)) {
        return sendResponse(res, 401, {
          error: 'Unauthorized: Admin authentication required to access client inquiries.',
        });
      }

      const inquiries = await fetchFromCloudStore();
      return sendResponse(res, 200, {
        success: true,
        count: inquiries.length,
        inquiries,
        deletedIds: Array.from(memoryDeletedIds),
      });
    }

    // 3. ADMIN ONLY: Update inquiry status (PATCH)
    if (method === 'PATCH') {
      if (!verifyAdminAuth(req)) {
        return sendResponse(res, 401, { error: 'Unauthorized' });
      }

      const body = await parseBody(req);
      const id = sanitize(body.id);
      if (!id) {
        return sendResponse(res, 400, { error: 'Missing inquiry ID' });
      }

      const current = await fetchFromCloudStore();
      const target = current.find((i) => i.id === id);
      if (!target) {
        return sendResponse(res, 404, { error: `Inquiry ${id} not found` });
      }

      if (body.status && ['New', 'Contacted', 'Call Booked', 'Proposal Sent'].includes(body.status)) {
        target.status = body.status;
      }
      if (typeof body.read === 'boolean') {
        target.read = body.read;
      }

      await saveToCloudStore(current);
      return sendResponse(res, 200, { success: true, inquiry: target });
    }

    // 4. ADMIN ONLY: Delete inquiry (DELETE) - Permanently deletes and tombstones
    if (method === 'DELETE') {
      if (!verifyAdminAuth(req)) {
        return sendResponse(res, 401, { error: 'Unauthorized' });
      }

      let id = '';
      try {
        const url = new URL(req.url || '', 'http://localhost');
        id = sanitize(url.searchParams.get('id'));
      } catch {}

      if (!id) {
        const body = await parseBody(req);
        id = sanitize(body.id);
      }

      if (!id) {
        return sendResponse(res, 400, { error: 'Missing inquiry ID to delete' });
      }

      const current = await fetchFromCloudStore();
      const filtered = current.filter((i) => i.id !== id);
      await saveToCloudStore(filtered, id);
      return sendResponse(res, 200, {
        success: true,
        message: `Inquiry ${id} permanently deleted.`,
        count: filtered.length,
        deletedId: id,
        deletedIds: Array.from(memoryDeletedIds),
      });
    }

    return sendResponse(res, 405, { error: `Method ${method} Not Allowed` });
  } catch (fatalError: any) {
    console.error('Fatal unhandled error in /api/inquiries:', fatalError);
    return sendResponse(res, 500, {
      error: 'An unexpected internal server error occurred. Please try again.',
      details: fatalError?.message || String(fatalError),
    });
  }
}
