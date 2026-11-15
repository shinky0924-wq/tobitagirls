/**
 * IndexNow API URL Submission Script for Bing & Search Engines (ChatGPT Search Grounding)
 * Dynamically parses all URLs from public/sitemap.xml + LLM standard endpoints and submits to api.indexnow.org.
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

const HOST = 'tobitashinchi-recruit.com';
const KEY = '7c9e54a3b8214f09a896d6e75924fa01';
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;

const urlSet = new Set();

// 1. Dynamically extract all <loc> URLs from public/sitemap.xml (includes all 12 FAQ categories, compare/age-40s, blog posts, topic clusters)
const sitemapPath = path.join(__dirname, '..', 'public', 'sitemap.xml');
if (fs.existsSync(sitemapPath)) {
  try {
    const sitemapXml = fs.readFileSync(sitemapPath, 'utf-8');
    const matches = sitemapXml.matchAll(/<loc>(https:\/\/[^<]+)<\/loc>/g);
    for (const m of matches) {
      if (m[1]) urlSet.add(m[1].trim());
    }
  } catch (e) {
    console.error('[IndexNow] Failed to read sitemap.xml:', e);
  }
}

// 2. Ensure core routes + LLM Markdown endpoints are always included
const coreAndLlmUrls = [
  `https://${HOST}/`,
  `https://${HOST}/about`,
  `https://${HOST}/glossary`,
  `https://${HOST}/compare`,
  `https://${HOST}/compare/age-40s`,
  `https://${HOST}/faq`,
  `https://${HOST}/faq/qualification`,
  `https://${HOST}/faq/beginner`,
  `https://${HOST}/faq/experienced`,
  `https://${HOST}/faq/job`,
  `https://${HOST}/faq/salary`,
  `https://${HOST}/faq/hours`,
  `https://${HOST}/faq/interview`,
  `https://${HOST}/faq/privacy`,
  `https://${HOST}/faq/environment`,
  `https://${HOST}/faq/access`,
  `https://${HOST}/faq/sidejob`,
  `https://${HOST}/faq/support`,
  `https://${HOST}/blog`,
  `https://${HOST}/job`,
  `https://${HOST}/salary`,
  `https://${HOST}/beginner`,
  `https://${HOST}/experienced`,
  `https://${HOST}/requirements`,
  `https://${HOST}/flow`,
  `https://${HOST}/interview`,
  `https://${HOST}/workstyle`,
  `https://${HOST}/shops`,
  `https://${HOST}/dekasegi`,
  `https://${HOST}/safety`,
  `https://${HOST}/llms.txt`,
  `https://${HOST}/llms-full.txt`,
  `https://${HOST}/index.md`,
  `https://${HOST}/faq.md`,
  `https://${HOST}/glossary.md`,
  `https://${HOST}/dekasegi.md`,
];

coreAndLlmUrls.forEach(u => urlSet.add(u));

// 3. Fallback: ensure blogArticles.json slugs are also included even if sitemap wasn't regenerated
const articlesPath = path.join(__dirname, '..', 'data', 'blogArticles.json');
if (fs.existsSync(articlesPath)) {
  try {
    const articles = JSON.parse(fs.readFileSync(articlesPath, 'utf-8'));
    articles.forEach(a => {
      if (a.slug) urlSet.add(`https://${HOST}/blog/${a.slug}`);
    });
  } catch (e) {
    console.error('[IndexNow] Failed to parse blogArticles.json:', e);
  }
}

const urlList = Array.from(urlSet);
console.log(`[IndexNow] Preparing to submit ${urlList.length} URLs (including 12 FAQ categories, LLMs & Markdown endpoints) to IndexNow...`);

const payload = JSON.stringify({
  host: HOST,
  key: KEY,
  keyLocation: KEY_LOCATION,
  urlList
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
