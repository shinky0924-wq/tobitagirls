/**
 * IndexNow API URL Submission Script for Bing & Search Engines (ChatGPT Search Grounding)
 * Sends all site URLs to IndexNow (api.indexnow.org) for instant crawling and indexing.
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

const HOST = 'tobitashinchi-recruit.com';
const KEY = '7c9e54a3b8214f09a896d6e75924fa01';
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;

// Read articles to gather all live URLs
const articlesPath = path.join(__dirname, '..', 'data', 'blogArticles.json');
let articles = [];
if (fs.existsSync(articlesPath)) {
  try {
    articles = JSON.parse(fs.readFileSync(articlesPath, 'utf-8'));
  } catch (e) {
    console.error('Failed to parse blogArticles.json:', e);
  }
}

// Core URL list
const urlList = [
  `https://${HOST}/`,
  `https://${HOST}/about`,
  `https://${HOST}/glossary`,
  `https://${HOST}/compare`,
  `https://${HOST}/faq`,
  `https://${HOST}/blog`,
  `https://${HOST}/job`,
  `https://${HOST}/salary`,
  `https://${HOST}/beginner`,
  `https://${HOST}/experienced`,
  `https://${HOST}/requirements`,
  `https://${HOST}/flow`,
  `https://${HOST}/workstyle`,
  `https://${HOST}/shops`,
  `https://${HOST}/dorm`,
  `https://${HOST}/safety`,
  `https://${HOST}/compare/inexperienced`,
  `https://${HOST}/compare/high-income`,
  `https://${HOST}/compare/weekly-1`,
  `https://${HOST}/compare/short-term`,
  `https://${HOST}/compare/dormitory`,
  `https://${HOST}/compare/double-work`,
  `https://${HOST}/compare/age-20s`,
  `https://${HOST}/compare/age-30s`,
  `https://${HOST}/llms.txt`,
  `https://${HOST}/llms-full.txt`
];

// Add all blog article URLs
articles.forEach(a => {
  if (a.slug) {
    urlList.push(`https://${HOST}/blog/${a.slug}`);
  }
});

console.log(`[IndexNow] Preparing to submit ${urlList.length} URLs to IndexNow...`);

const payload = JSON.stringify({
  host: HOST,
  key: KEY,
  keyLocation: KEY_LOCATION,
  urlList: urlList
});

const req = https.request('https://api.indexnow.org/IndexNow', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
    'Content-Length': Buffer.byteLength(payload)
  }
}, (res) => {
  let responseData = '';
  res.on('data', chunk => { responseData += chunk; });
  res.on('end', () => {
    if (res.statusCode === 200 || res.statusCode === 202) {
      console.log(`[IndexNow] SUCCESS! HTTP ${res.statusCode}: Submitted ${urlList.length} URLs to Bing/IndexNow search engines.`);
    } else {
      console.log(`[IndexNow] Response HTTP ${res.statusCode}: ${responseData || 'Accepted/Queued'}`);
    }
  });
});

req.on('error', (err) => {
  console.error('[IndexNow] Request error:', err.message);
});

req.write(payload);
req.end();
