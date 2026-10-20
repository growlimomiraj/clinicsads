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

const DEFAULT_ADMIN_KEY = 'clinicsads-admin-secure-2026';

function getAdminKey(): string {
  return process.env.ADMIN_KEY || process.env.ADMIN_SECRET || DEFAULT_ADMIN_KEY;
}

// Locate persistent storage file path
function getStoragePath(): string {
  // If running in development or standard Node server:
  const localDir = path.resolve(process.cwd(), 'data');
  const localFile = path.join(localDir, 'inquiries.json');

  try {
    if (!fs.existsSync(localDir)) {
      fs.mkdirSync(localDir, { recursive: true });
    }
    // Test write permission
    fs.accessSync(localDir, fs.constants.W_OK);
    return localFile;
  } catch {
    // If running in read-only serverless environment (e.g. AWS Lambda / Vercel without persistent disk):
    const tmpDir = path.resolve('/tmp');
    return path.join(tmpDir, 'clinicsads_inquiries.json');
  }
}

// In-memory cache + lock
let inMemoryInquiries: ClinicInquiry[] | null = null;
let isWriting = false;

// Fallback initial inquiries if no file exists yet
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

export function loadInquiriesFromStorage(): ClinicInquiry[] {
  if (inMemoryInquiries !== null) {
    return inMemoryInquiries;
  }

  const filePath = getStoragePath();
  try {
    if (fs.existsSync(filePath)) {
      const raw = fs.readFileSync(filePath, 'utf-8');
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        inMemoryInquiries = parsed;
        return inMemoryInquiries;
      }
    }
  } catch (err) {
    console.error('Failed reading inquiries from storage file:', err);
  }

  // If file doesn't exist, seed with fallbacks and save
  inMemoryInquiries = FALLBACK_INQUIRIES;
  saveInquiriesToStorage(inMemoryInquiries).catch((err) => {
    console.warn('Initial seed write failed:', err);
  });
  return inMemoryInquiries;
}

export async function saveInquiriesToStorage(items: ClinicInquiry[]): Promise<boolean> {
  inMemoryInquiries = items;
  const filePath = getStoragePath();

  try {
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    const tempFile = `${filePath}.${Date.now()}.${Math.random().toString(36).slice(2)}.tmp`;
    fs.writeFileSync(tempFile, JSON.stringify(items, null, 2), 'utf-8');
    fs.renameSync(tempFile, filePath);
    return true;
  } catch (err) {
    console.error('Failed writing inquiries to storage:', err);
    return false;
  }
}

// Sanitize string to prevent XSS
function sanitize(input: any): string {
  if (typeof input !== 'string') return '';
  return input
    .trim()
    .replace(/[<>]/g, '') // remove HTML tags
    .slice(0, 500); // cap length
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Authentication verification
export function verifyAdminAuth(req: any): boolean {
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

// Helper to parse JSON request body
export async function parseRequestBody(req: any): Promise<any> {
  if (req.body && typeof req.body === 'object') {
    return req.body;
  }
  return new Promise((resolve) => {
    let body = '';
    req.on('data', (chunk: any) => {
      body += chunk;
      if (body.length > 1e6) {
        // 1MB safety limit
        req.connection?.destroy();
      }
    });
    req.on('end', () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch {
        resolve({});
      }
    });
    req.on('error', () => resolve({}));
  });
}

// Response helper
export function sendJson(res: any, status: number, data: any) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, x-admin-key');
  res.end(JSON.stringify(data));
}

/**
 * Main API Handler for /api/inquiries
 */
export async function handleInquiriesApi(req: any, res: any) {
  const method = req.method?.toUpperCase();

  // Handle CORS Preflight
  if (method === 'OPTIONS') {
    res.statusCode = 204;
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, x-admin-key');
    res.end();
    return;
  }

  // 1. PUBLIC ENDPOINT: Submit new inquiry (POST)
  if (method === 'POST') {
    const body = await parseRequestBody(req);
    const name = sanitize(body.name);
    const email = sanitize(body.email);
    const clinicName = sanitize(body.clinicName);
    const service = sanitize(body.service);
    const phone = sanitize(body.phone);
    const message = sanitize(body.message);
    const website = sanitize(body.website);
    const preferredTime = sanitize(body.preferredTime);
    const source = (['modal', 'contact-page', 'call-booking'].includes(body.source) ? body.source : 'call-booking') as ClinicInquiry['source'];

    // Validation
    if (!name) {
      return sendJson(res, 400, { error: 'Validation error: Your name is required.' });
    }
    if (!email || !isValidEmail(email)) {
      return sendJson(res, 400, { error: 'Validation error: A valid work email is required.' });
    }
    if (!clinicName) {
      return sendJson(res, 400, { error: 'Validation error: Clinic name is required.' });
    }

    const current = loadInquiriesFromStorage();
    const newInquiry: ClinicInquiry = {
      id: `INQ-${Math.floor(1000 + Math.random() * 9000)}`,
      name,
      email,
      phone: phone || undefined,
      clinicName,
      website: website || undefined,
      service: service || 'Google Ads',
      message: message || undefined,
      preferredTime: preferredTime || 'Morning (9am - 12pm)',
      submittedAt: new Date().toISOString(),
      status: 'New',
      source,
      read: false,
    };

    // Prepend to list
    const updated = [newInquiry, ...current];
    await saveInquiriesToStorage(updated);

    // Return safe confirmation (do not expose full internal store)
    return sendJson(res, 201, {
      success: true,
      message: 'Inquiry successfully saved and queued for review.',
      inquiry: {
        id: newInquiry.id,
        name: newInquiry.name,
        clinicName: newInquiry.clinicName,
        service: newInquiry.service,
        submittedAt: newInquiry.submittedAt,
      },
    });
  }

  // 2. ADMIN-PROTECTED: Fetch all inquiries (GET)
  if (method === 'GET') {
    if (!verifyAdminAuth(req)) {
      return sendJson(res, 401, {
        error: 'Unauthorized: Owner admin authentication required to view client inquiries.',
      });
    }

    const inquiries = loadInquiriesFromStorage();
    return sendJson(res, 200, {
      success: true,
      count: inquiries.length,
      inquiries,
    });
  }

  // 3. ADMIN-PROTECTED: Update inquiry status or read state (PATCH)
  if (method === 'PATCH') {
    if (!verifyAdminAuth(req)) {
      return sendJson(res, 401, {
        error: 'Unauthorized: Owner admin authentication required.',
      });
    }

    const body = await parseRequestBody(req);
    const id = sanitize(body.id);
    if (!id) {
      return sendJson(res, 400, { error: 'Missing inquiry ID to update.' });
    }

    const current = loadInquiriesFromStorage();
    const target = current.find((i) => i.id === id);
    if (!target) {
      return sendJson(res, 404, { error: `Inquiry with ID ${id} not found.` });
    }

    if (body.status && ['New', 'Contacted', 'Call Booked', 'Proposal Sent'].includes(body.status)) {
      target.status = body.status;
    }
    if (typeof body.read === 'boolean') {
      target.read = body.read;
    }

    await saveInquiriesToStorage(current);
    return sendJson(res, 200, {
      success: true,
      inquiry: target,
    });
  }

  // 4. ADMIN-PROTECTED: Delete inquiry (DELETE)
  if (method === 'DELETE') {
    if (!verifyAdminAuth(req)) {
      return sendJson(res, 401, {
        error: 'Unauthorized: Owner admin authentication required.',
      });
    }

    // Support query param ?id=... or body { id }
    let id: string = '';
    const url = new URL(req.url || '', 'http://localhost');
    id = sanitize(url.searchParams.get('id'));
    if (!id) {
      const body = await parseRequestBody(req);
      id = sanitize(body.id);
    }

    if (!id) {
      return sendJson(res, 400, { error: 'Missing inquiry ID to delete.' });
    }

    const current = loadInquiriesFromStorage();
    const filtered = current.filter((i) => i.id !== id);
    if (filtered.length === current.length) {
      return sendJson(res, 404, { error: `Inquiry with ID ${id} not found.` });
    }

    await saveInquiriesToStorage(filtered);
    return sendJson(res, 200, {
      success: true,
      message: `Inquiry ${id} successfully deleted.`,
    });
  }

  return sendJson(res, 405, { error: `Method ${method} Not Allowed` });
}

/**
 * Auth Verification API Handler for /api/auth
 */
export async function handleAuthApi(req: any, res: any) {
  const method = req.method?.toUpperCase();

  if (method === 'OPTIONS') {
    res.statusCode = 204;
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, x-admin-key');
    res.end();
    return;
  }

  if (method === 'POST') {
    const body = await parseRequestBody(req);
    const passcode = typeof body.passcode === 'string' ? body.passcode.trim() : '';
    const adminKey = getAdminKey();

    if (passcode === adminKey) {
      return sendJson(res, 200, {
        authenticated: true,
        token: adminKey,
      });
    }

    return sendJson(res, 401, {
      authenticated: false,
      error: 'Invalid admin passcode.',
    });
  }

  // Check current session
  if (method === 'GET') {
    const isAuth = verifyAdminAuth(req);
    return sendJson(res, 200, {
      authenticated: isAuth,
    });
  }

  return sendJson(res, 405, { error: `Method ${method} Not Allowed` });
}
