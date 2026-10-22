import https from 'https';

const payload = JSON.stringify({
  host: 'clinicsads.com',
  key: 'c99f1e403d8b4c0aa62f7e81d11b248a',
  keyLocation: 'https://clinicsads.com/c99f1e403d8b4c0aa62f7e81d11b248a.txt',
  urlList: [
    'https://clinicsads.com/',
    'https://clinicsads.com/services/',
    'https://clinicsads.com/services/google-ads-for-clinics/',
    'https://clinicsads.com/services/meta-ads-for-clinics/',
    'https://clinicsads.com/services/clinic-landing-pages/',
    'https://clinicsads.com/services/clinic-conversion-tracking/',
    'https://clinicsads.com/services/clinic-seo/',
    'https://clinicsads.com/about/',
    'https://clinicsads.com/contact/',
  ],
});

const req = https.request(
  {
    hostname: 'api.indexnow.org',
    port: 443,
    path: '/indexnow',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Content-Length': Buffer.byteLength(payload),
    },
  },
  (res) => {
    console.log(`IndexNow Response Status: ${res.statusCode} ${res.statusMessage}`);
    res.on('data', (d) => process.stdout.write(d));
  }
);

req.on('error', (e) => {
  console.error('IndexNow Error:', e.message);
});

req.write(payload);
req.end();
