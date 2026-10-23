import fs from 'fs';
import path from 'path';
import { injectSeoMetadata } from '../src/seoHelper';

async function runPrerender() {
  const distDir = path.join(process.cwd(), 'dist');
  const templatePath = path.join(distDir, 'index.html');

  if (!fs.existsSync(templatePath)) {
    console.error('Error: dist/index.html not found! Run vite build before prerendering.');
    process.exit(1);
  }

  const template = fs.readFileSync(templatePath, 'utf-8');

  // Load articles
  const articlesPath = path.join(process.cwd(), 'data', 'blogArticles.json');
  let articles: any[] = [];
  if (fs.existsSync(articlesPath)) {
    try {
      articles = JSON.parse(fs.readFileSync(articlesPath, 'utf-8'));
    } catch (e) {
      console.error('Failed to parse blogArticles.json:', e);
    }
  }

  console.log(`[Prerender] Starting full pre-rendering using injectSeoMetadata for ${articles.length} articles and all routes...`);

  const writeHtml = (filePath: string, htmlContent: string) => {
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(filePath, htmlContent, 'utf-8');
  };

  let count = 0;

  // 1. Top page
  const home = injectSeoMetadata(template, '/');
  writeHtml(path.join(distDir, 'index.html'), home.html);
  count++;

  // 2. Pre-render every blog article
  for (const article of articles) {
    if (!article.slug) continue;
    const url = `/blog/${article.slug}`;
    const { html } = injectSeoMetadata(template, url);
    writeHtml(path.join(distDir, 'blog', article.slug, 'index.html'), html);
    writeHtml(path.join(distDir, 'blog', `${article.slug}.html`), html);
    count++;
  }

  // 3. Pre-render Blog Index
  const blogList = injectSeoMetadata(template, '/blog');
  writeHtml(path.join(distDir, 'blog', 'index.html'), blogList.html);
  writeHtml(path.join(distDir, 'blog.html'), blogList.html);
  count++;

  // 4. Pre-render About and Company
  const about = injectSeoMetadata(template, '/about');
  writeHtml(path.join(distDir, 'about', 'index.html'), about.html);
  writeHtml(path.join(distDir, 'about.html'), about.html);
  count++;

  const company = injectSeoMetadata(template, '/company');
  writeHtml(path.join(distDir, 'company', 'index.html'), company.html);
  writeHtml(path.join(distDir, 'company.html'), company.html);
  count++;

  // 5. Pre-render FAQ Index & all 8 Category pages
  const faq = injectSeoMetadata(template, '/faq');
  writeHtml(path.join(distDir, 'faq', 'index.html'), faq.html);
  writeHtml(path.join(distDir, 'faq.html'), faq.html);
  count++;

  const faqCategories = [
    'recruit', 'salary', 'beginner', 'hours',
    'privacy', 'dorm', 'wwork', 'leaving'
  ];
  for (const cat of faqCategories) {
    const faqCatPage = injectSeoMetadata(template, `/faq/${cat}`);
    writeHtml(path.join(distDir, 'faq', cat, 'index.html'), faqCatPage.html);
    writeHtml(path.join(distDir, 'faq', `${cat}.html`), faqCatPage.html);
    count++;
  }

  // 6. Pre-render Compare Main & all 8 Category pages
  const compare = injectSeoMetadata(template, '/compare');
  writeHtml(path.join(distDir, 'compare', 'index.html'), compare.html);
  writeHtml(path.join(distDir, 'compare.html'), compare.html);
  count++;

  const compareSlugs = [
    'inexperienced', 'high-income', 'weekly-1', 'short-term',
    'dormitory', 'double-work', 'age-20s', 'age-30s'
  ];
  for (const slug of compareSlugs) {
    const compPage = injectSeoMetadata(template, `/compare/${slug}`);
    writeHtml(path.join(distDir, 'compare', slug, 'index.html'), compPage.html);
    writeHtml(path.join(distDir, 'compare', `${slug}.html`), compPage.html);
    count++;
  }

  // 7. Pre-render Topic Clusters (11 routes including interview)
  const topics = [
    'job', 'salary', 'beginner', 'experienced',
    'requirements', 'flow', 'interview', 'workstyle',
    'shops', 'dorm', 'safety'
  ];
  for (const t of topics) {
    const topicPage = injectSeoMetadata(template, `/${t}`);
    writeHtml(path.join(distDir, t, 'index.html'), topicPage.html);
    writeHtml(path.join(distDir, `${t}.html`), topicPage.html);
    count++;
  }

  // 8. Generate static HTML redirects for legacy URLs (ensures static hosts like GitHub Pages / Cloudflare 301 properly)
  const legacyRedirects: Record<string, string> = {
    '/blog/tobitashinchi-dormitory-lifestyle-support': '/blog/tobitashinchi-housing-support',
    '/blog/tobitashinchi-tax-declaration-guide': '/blog/tobitashinchi-tax-guide',
    '/blog/tobitashinchi-privacy-alibi-support': '/blog/tobitashinchi-identity-alibi-safety-measures',
    '/blog/tobitashinchi-physical-mental-care-guide': '/blog/tobitashinchi-stamina-mental-care-100k',
    '/blog/tobitashinchi-fake-job-scout-warning': '/blog/tobitashinchi-scout-fraud-avoidance-safe-recruitment',
    '/blog/tobitashinchi-daily-work-routine-guide': '/blog/tobitashinchi-daily-schedule-work-flow-detail',
    '/comparison': '/compare',
    '/target-categories': '/compare',
    '/target-jobs': '/compare',
    '/categories': '/compare',
    '/company': '/about',
  };

  for (const [fromPath, toPath] of Object.entries(legacyRedirects)) {
    const fullDest = `https://tobitashinchi-recruit.com${toPath}`;
    const redirectHtml = `<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <title>ページ移動のお知らせ｜飛田ガールズ</title>
  <meta http-equiv="refresh" content="0;url=${fullDest}">
  <link rel="canonical" href="${fullDest}">
  <meta name="robots" content="noindex, follow">
  <script>location.replace(${JSON.stringify(fullDest)});</script>
</head>
<body style="font-family: sans-serif; text-align: center; padding: 50px 20px;">
  <p>ページが移動しました。<br><a href="${fullDest}">自動的に移動しない場合はこちらをクリックしてください。</a></p>
</body>
</html>`;
    const cleanFrom = fromPath.replace(/^\//, '');
    writeHtml(path.join(distDir, cleanFrom, 'index.html'), redirectHtml);
    writeHtml(path.join(distDir, `${cleanFrom}.html`), redirectHtml);
    count++;
  }

  // 9. Ensure _redirects in dist
  const rootRedirects = path.join(process.cwd(), '_redirects');
  if (fs.existsSync(rootRedirects)) {
    fs.copyFileSync(rootRedirects, path.join(distDir, '_redirects'));
  }

  // 10. Ensure sitemap and robots in dist
  const sitemapSrc = path.join(process.cwd(), 'public', 'sitemap.xml');
  if (fs.existsSync(sitemapSrc)) {
    fs.copyFileSync(sitemapSrc, path.join(distDir, 'sitemap.xml'));
  }
  const robotsSrc = path.join(process.cwd(), 'public', 'robots.txt');
  if (fs.existsSync(robotsSrc)) {
    fs.copyFileSync(robotsSrc, path.join(distDir, 'robots.txt'));
  }

  console.log(`[Prerender] Successfully generated pre-rendered static HTML for ${count} paths!`);
}

runPrerender().catch(err => {
  console.error('[Prerender] Error during prerendering:', err);
  process.exit(1);
});
