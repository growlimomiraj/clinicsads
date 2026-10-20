import http from 'http';
import { handleInquiriesApi, handleAuthApi, loadInquiriesFromStorage } from './server/inquiriesService.ts';

async function runTests() {
  console.log('--- STARTING VERIFICATION TEST SUITE ---');

  // Create lightweight test server
  const server = http.createServer(async (req, res) => {
    const url = req.url || '';
    if (url.startsWith('/api/inquiries')) {
      await handleInquiriesApi(req, res);
    } else if (url.startsWith('/api/auth')) {
      await handleAuthApi(req, res);
    } else {
      res.statusCode = 404;
      res.end();
    }
  });

  await new Promise<void>((resolve) => server.listen(3456, resolve));
  const baseUrl = 'http://localhost:3456';
  console.log('✓ Test API server listening on http://localhost:3456');

  try {
    // TEST 1: Security - Unauthorized GET must return 401
    console.log('\n[TEST 1] Testing unauthorized GET /api/inquiries...');
    const unauthRes = await fetch(`${baseUrl}/api/inquiries`);
    console.log('Response status:', unauthRes.status);
    if (unauthRes.status !== 401) {
      throw new Error(`Expected 401 Unauthorized, got ${unauthRes.status}`);
    }
    const unauthData = await unauthRes.json();
    console.log('✓ Security Verified: Unauthorized visitors are blocked (401):', unauthData.error);

    // TEST 2: Security - Invalid admin passcode fails auth
    console.log('\n[TEST 2] Testing auth verification with wrong passcode...');
    const badAuthRes = await fetch(`${baseUrl}/api/auth`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ passcode: 'wrong-passcode' }),
    });
    if (badAuthRes.status !== 401) {
      throw new Error(`Expected 401 for wrong passcode, got ${badAuthRes.status}`);
    }
    console.log('✓ Security Verified: Invalid passcode rejected (401)');

    // TEST 3: Security - Correct admin passcode generates token
    console.log('\n[TEST 3] Testing auth verification with correct passcode...');
    const goodAuthRes = await fetch(`${baseUrl}/api/auth`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ passcode: 'clinicsads-admin-secure-2026' }),
    });
    const goodAuthData = await goodAuthRes.json();
    if (!goodAuthData.authenticated || !goodAuthData.token) {
      throw new Error('Expected authenticated: true with token');
    }
    const adminToken = goodAuthData.token;
    console.log('✓ Auth Verified: Admin authenticated with token:', adminToken.slice(0, 10) + '...');

    // TEST 4: Browser Session A submits an inquiry
    console.log('\n[TEST 4] Browser Session A: Submitting inquiry for Dr. Alexander Wright (Session A)...');
    const submitARes = await fetch(`${baseUrl}/api/inquiries`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Dr. Alexander Wright',
        email: 'alexander@wrightdental.co.uk',
        phone: '+44 20 7946 0192',
        clinicName: 'Wright Dental Practice London',
        website: 'https://wrightdental.co.uk',
        service: 'Google Ads',
        preferredTime: 'Morning (9am - 12pm)',
        message: 'Opening private implant suite, need 20+ monthly implant patient consultations.',
        source: 'modal',
      }),
    });
    if (submitARes.status !== 201) {
      throw new Error(`Expected 201 Created, got ${submitARes.status}`);
    }
    const submitAData = await submitARes.json();
    const leadAId = submitAData.inquiry.id;
    console.log('✓ Session A Submission Verified: Created inquiry', leadAId, 'for', submitAData.inquiry.clinicName);

    // TEST 5: Browser Session B (independent profile/Google account) opens Admin Portal
    console.log('\n[TEST 5] Browser Session B: Fetching inquiries in admin portal...');
    const fetchBRes = await fetch(`${baseUrl}/api/inquiries`, {
      headers: {
        'Authorization': `Bearer ${adminToken}`,
      },
    });
    if (fetchBRes.status !== 200) {
      throw new Error(`Expected 200 OK, got ${fetchBRes.status}`);
    }
    const fetchBData = await fetchBRes.json();
    const foundA = fetchBData.inquiries.find((i: any) => i.id === leadAId);
    if (!foundA) {
      throw new Error(`Session A inquiry ${leadAId} is MISSING in Session B!`);
    }
    console.log('✓ Multi-Session Synchronization Verified! Inquiry', leadAId, 'is immediately visible in Session B:', foundA.name);

    // TEST 6: Independent Visitor C submits an inquiry
    console.log('\n[TEST 6] Independent Visitor C: Submitting inquiry for Dr. Fatima Al-Mansoor...');
    const submitCRes = await fetch(`${baseUrl}/api/inquiries`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Dr. Fatima Al-Mansoor',
        email: 'fatima@jumeirahderma.ae',
        phone: '+971 4 456 7890',
        clinicName: 'Jumeirah Dermatology Clinic Dubai',
        website: 'https://jumeirahderma.ae',
        service: 'Meta Ads',
        preferredTime: 'Afternoon (12pm - 4pm)',
        message: 'Looking for laser and cosmetic dermatology patient campaigns.',
        source: 'contact-page',
      }),
    });
    if (submitCRes.status !== 201) {
      throw new Error(`Expected 201 Created, got ${submitCRes.status}`);
    }
    const submitCData = await submitCRes.json();
    const leadCId = submitCData.inquiry.id;
    console.log('✓ Visitor C Submission Verified: Created inquiry', leadCId);

    // TEST 7: Admin Portal receives both inquiries without any manual refresh
    console.log('\n[TEST 7] Admin Portal: Verifying all inquiries are present and synchronized...');
    const fetchAllRes = await fetch(`${baseUrl}/api/inquiries`, {
      headers: {
        'Authorization': `Bearer ${adminToken}`,
      },
    });
    const allData = await fetchAllRes.json();
    const hasA = allData.inquiries.some((i: any) => i.id === leadAId);
    const hasC = allData.inquiries.some((i: any) => i.id === leadCId);
    if (!hasA || !hasC) {
      throw new Error('Not all inquiries are present across sessions!');
    }
    console.log(`✓ Synchronized Inquiries Count: ${allData.inquiries.length} total inquiries in authoritative backend.`);

    // TEST 8: Admin updates inquiry status
    console.log(`\n[TEST 8] Updating status of ${leadAId} to 'Call Booked'...`);
    const patchRes = await fetch(`${baseUrl}/api/inquiries`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${adminToken}`,
      },
      body: JSON.stringify({ id: leadAId, status: 'Call Booked', read: true }),
    });
    if (patchRes.status !== 200) {
      throw new Error(`Expected 200 for PATCH, got ${patchRes.status}`);
    }
    const patchData = await patchRes.json();
    if (patchData.inquiry.status !== 'Call Booked' || patchData.inquiry.read !== true) {
      throw new Error('PATCH failed to update status or read state!');
    }
    console.log('✓ Admin Status Update Verified: Inquiry', leadAId, 'is now:', patchData.inquiry.status);

    // TEST 9: Persistence verification after server cold restart simulation
    console.log('\n[TEST 9] Verifying persistent disk storage (simulating server restart)...');
    const diskInquiries = loadInquiriesFromStorage();
    const diskA = diskInquiries.find((i: any) => i.id === leadAId);
    if (!diskA || diskA.status !== 'Call Booked') {
      throw new Error('Disk persistence failed to retain inquiry updates!');
    }
    console.log('✓ Disk Persistence Verified: Inquiry', leadAId, 'persisted on disk with status', diskA.status);

    // Clean up test items
    console.log('\n[CLEANUP] Cleaning test inquiries...');
    await fetch(`${baseUrl}/api/inquiries?id=${leadAId}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${adminToken}` },
    });
    await fetch(`${baseUrl}/api/inquiries?id=${leadCId}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${adminToken}` },
    });
    console.log('✓ Cleanup complete.');

    console.log('\n==============================================');
    console.log('🎉 ALL VERIFICATION TESTS PASSED SUCCESSFULLY! 🎉');
    console.log('==============================================\n');
  } finally {
    server.close();
  }
}

runTests().catch((err) => {
  console.error('\n❌ TEST SUITE FAILED:', err);
  process.exit(1);
});
