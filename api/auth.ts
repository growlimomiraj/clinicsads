const DEFAULT_ADMIN_KEY = 'clinicsads-admin-secure-2026';

function getAdminKey(): string {
  return process.env.ADMIN_KEY || process.env.ADMIN_SECRET || DEFAULT_ADMIN_KEY;
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

    if (method === 'POST') {
      const body = await parseBody(req);
      const passcode = typeof body.passcode === 'string' ? body.passcode.trim() : '';
      const adminKey = getAdminKey();

      if (passcode === adminKey) {
        return sendResponse(res, 200, {
          authenticated: true,
          token: adminKey,
        });
      }

      return sendResponse(res, 401, {
        authenticated: false,
        error: 'Invalid administrator passcode.',
      });
    }

    if (method === 'GET') {
      const isAuth = verifyAdminAuth(req);
      return sendResponse(res, 200, {
        authenticated: isAuth,
      });
    }

    return sendResponse(res, 405, { error: `Method ${method} Not Allowed` });
  } catch (err: any) {
    console.error('Fatal auth error:', err);
    return sendResponse(res, 500, { error: 'Authentication service error' });
  }
}
