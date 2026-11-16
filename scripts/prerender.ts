import fs from 'fs';
import path from 'path';
import { injectSeoMetadata } from '../src/seoHelper';
import { renderRouteMarkdown } from '../src/markdownRenderer';

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

  console.log(`[Prerender] Starting full pre-rendering (HTML + static Markdown .md) for ${articles.length} articles and all routes...`);

  const writeFileEnsureDir = (filePath: string, content: string) => {
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(filePath, content, 'utf-8');
  };

  let count = 0;
  let mdCount = 0;

  const emitMarkdown = (routePath: string, outMdRelPath: string) => {
    const { markdown, status } = renderRouteMarkdown(routePath);
    if (status === 200) {
      writeFileEnsureDir(path.join(distDir, outMdRelPath), markdown);
      mdCount++;
    }
  };

  // 1. Top page
  const home = injectSeoMetadata(template, '/');
  writeFileEnsureDir(path.join(distDir, 'index.html'), home.html);
  emitMarkdown('/', 'index.md');
  count++;

  // 2. Pre-render every blog article
  for (const article of articles) {
    if (!article.slug) continue;
    const url = `/blog/${article.slug}`;
    const { html } = injectSeoMetadata(template, url);
    writeFileEnsureDir(path.join(distDir, 'blog', article.slug, 'index.html'), html);
    writeFileEnsureDir(path.join(distDir, 'blog', `${article.slug}.html`), html);
    emitMarkdown(url, path.join('blog', `${article.slug}.md`));
    count++;
  }

  // 3. Pre-render Blog Index
  const blogList = injectSeoMetadata(template, '/blog');
  writeFileEnsureDir(path.join(distDir, 'blog', 'index.html'), blogList.html);
  writeFileEnsureDir(path.join(distDir, 'blog.html'), blogList.html);
  emitMarkdown('/blog', 'blog.md');
  count++;

  // 4. Pre-render About, Glossary, and Company
  const about = injectSeoMetadata(template, '/about');
  writeFileEnsureDir(path.join(distDir, 'about', 'index.html'), about.html);
  writeFileEnsureDir(path.join(distDir, 'about.html'), about.html);
  emitMarkdown('/about', 'about.md');
  count++;

  const glossary = injectSeoMetadata(template, '/glossary');
  writeFileEnsureDir(path.join(distDir, 'glossary', 'index.html'), glossary.html);
  writeFileEnsureDir(path.join(distDir, 'glossary.html'), glossary.html);
  emitMarkdown('/glossary', 'glossary.md');
  count++;

  const company = injectSeoMetadata(template, '/company');
  writeFileEnsureDir(path.join(distDir, 'company', 'index.html'), company.html);
  writeFileEnsureDir(path.join(distDir, 'company.html'), company.html);
  count++;

  // 5. Pre-render FAQ Index, all 12 Category pages, and legacy category slugs
  const faq = injectSeoMetadata(template, '/faq');
  writeFileEnsureDir(path.join(distDir, 'faq', 'index.html'), faq.html);
  writeFileEnsureDir(path.join(distDir, 'faq.html'), faq.html);
  emitMarkdown('/faq', 'faq.md');
  count++;

  const faqCategories = [
    'qualification', 'beginner', 'experienced', 'job',
    'salary', 'hours', 'interview', 'privacy',
    'environment', 'access', 'sidejob', 'support',
    'recruit', 'dorm', 'wwork', 'leaving'
  ];
  for (const cat of faqCategories) {
    const faqCatPage = injectSeoMetadata(template, `/faq/${cat}`);
    writeFileEnsureDir(path.join(distDir, 'faq', cat, 'index.html'), faqCatPage.html);
    writeFileEnsureDir(path.join(distDir, 'faq', `${cat}.html`), faqCatPage.html);
    emitMarkdown(`/faq/${cat}`, path.join('faq', `${cat}.md`));
    count++;
  }

  // 6. Pre-render Site Compare, Compare Main & all 9 Category pages
  const siteCompare = injectSeoMetadata(template, '/site-compare');
  writeFileEnsureDir(path.join(distDir, 'site-compare', 'index.html'), siteCompare.html);
  writeFileEnsureDir(path.join(distDir, 'site-compare.html'), siteCompare.html);
  emitMarkdown('/site-compare', 'site-compare.md');
  count++;

  const compare = injectSeoMetadata(template, '/compare');
  writeFileEnsureDir(path.join(distDir, 'compare', 'index.html'), compare.html);
  writeFileEnsureDir(path.join(distDir, 'compare.html'), compare.html);
  emitMarkdown('/compare', 'compare.md');
  count++;

  const compareSlugs = [
    'inexperienced', 'high-income', 'weekly-1', 'short-term',
    'dormitory', 'double-work', 'age-20s', 'age-30s', 'age-40s'
  ];
  for (const slug of compareSlugs) {
    const compPage = injectSeoMetadata(template, `/compare/${slug}`);
    writeFileEnsureDir(path.join(distDir, 'compare', slug, 'index.html'), compPage.html);
    writeFileEnsureDir(path.join(distDir, 'compare', `${slug}.html`), compPage.html);
    emitMarkdown(`/compare/${slug}`, path.join('compare', `${slug}.md`));
    count++;
  }

  // 7. Pre-render Topic Clusters (11 routes including interview)
  const topics = [
    'job', 'salary', 'beginner', 'experienced',
    'requirements', 'flow', 'interview', 'workstyle',
    'shops', 'dekasegi', 'safety'
  ];
  for (const t of topics) {
    const topicPage = injectSeoMetadata(template, `/${t}`);
    writeFileEnsureDir(path.join(distDir, t, 'index.html'), topicPage.html);
    writeFileEnsureDir(path.join(distDir, `${t}.html`), topicPage.html);
    emitMarkdown(`/${t}`, `${t}.md`);
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
    '/dorm': '/dekasegi',
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
    writeFileEnsureDir(path.join(distDir, cleanFrom, 'index.html'), redirectHtml);
    writeFileEnsureDir(path.join(distDir, `${cleanFrom}.html`), redirectHtml);
    count++;
  }

  // 9. Ensure _redirects in dist
  const rootRedirects = path.join(process.cwd(), '_redirects');
  if (fs.existsSync(rootRedirects)) {
    fs.copyFileSync(rootRedirects, path.join(distDir, '_redirects'));
  }

  // 10. Ensure sitemap, robots, RSS feed, and llms files in dist
  for (const staticFile of ['sitemap.xml', 'robots.txt', 'feed.xml', 'llms.txt', 'llms-full.txt']) {
    const srcPath = path.join(process.cwd(), 'public', staticFile);
    if (fs.existsSync(srcPath)) {
      fs.copyFileSync(srcPath, path.join(distDir, staticFile));
    }
  }

  console.log(`[Prerender] Successfully generated pre-rendered static HTML (${count} paths) and Markdown (${mdCount} .md files)!`);
}

runPrerender().catch(err => {
  console.error('[Prerender] Error during prerendering:', err);
  process.exit(1);
});
