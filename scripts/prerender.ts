import fs from 'fs';
import path from 'path';
import { injectSeoMetadata } from '../src/seoHelper';
import { renderRouteMarkdown } from '../src/markdownRenderer';
import { COMPARE_SUBPAGES, LEGACY_COMPARE_SLUG_REDIRECTS } from '../src/data/compareGuides';

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

  // 6. Pre-render Site Compare, Compare Main & all 27 Subpages
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

  const compareSlugs = COMPARE_SUBPAGES.map((item) => item.slug);
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

  // 8. Legacy URLs are handled via HTTP 301 in vercel.json, _redirects, .htaccess, and server.ts.
  // Do NOT emit static HTML files with noindex for redirected URLs, otherwise static hosts/CDNs
  // serve HTTP 200 + noindex instead of executing the 301 rule (causing GSC "noindex" exclusions).
  const legacyPathsToClean = [
    '/blog/tobitashinchi-dormitory-lifestyle-support',
    '/blog/tobitashinchi-tax-declaration-guide',
    '/blog/tobitashinchi-privacy-alibi-support',
    '/blog/tobitashinchi-physical-mental-care-guide',
    '/blog/tobitashinchi-fake-job-scout-warning',
    '/blog/tobitashinchi-daily-work-routine-guide',
    '/blog/tobitashinchi-id-requirements',
    '/blog/tobitashinchi-merits-and-demerits',
    '/blog/tobitashinchi-shift-workstyle-guide',
    '/blog/tobitashinchi-safety-rules-faq',
    '/blog/tobitashinchi-main-vs-seishun-street',
    '/blog/tobitashinchi-salary-system-breakdown',
    '/comparison',
    '/target-categories',
    '/target-jobs',
    '/categories',
    '/company',
    '/dorm',
    ...Object.keys(LEGACY_COMPARE_SLUG_REDIRECTS).map((oldSlug) => `/compare/${oldSlug}`),
  ];
  for (const legacyPath of legacyPathsToClean) {
    const cleanFrom = legacyPath.replace(/^\//, '');
    const stubHtml = path.join(distDir, `${cleanFrom}.html`);
    const stubDir = path.join(distDir, cleanFrom);
    if (fs.existsSync(stubHtml)) fs.rmSync(stubHtml, { force: true });
    if (fs.existsSync(stubDir)) fs.rmSync(stubDir, { recursive: true, force: true });
  }

  // 9. Ensure _redirects and .htaccess in dist
  const rootRedirects = path.join(process.cwd(), '_redirects');
  if (fs.existsSync(rootRedirects)) {
    fs.copyFileSync(rootRedirects, path.join(distDir, '_redirects'));
  }
  const rootHtaccess = path.join(process.cwd(), '.htaccess');
  if (fs.existsSync(rootHtaccess)) {
    fs.copyFileSync(rootHtaccess, path.join(distDir, '.htaccess'));
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
