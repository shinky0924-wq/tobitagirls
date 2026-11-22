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
  const trailingSlashRedirects: string[] = [];

  const emitMarkdown = (routePath: string, outMdRelPath: string) => {
    const { markdown, status } = renderRouteMarkdown(routePath);
    if (status === 200) {
      writeFileEnsureDir(path.join(distDir, outMdRelPath), markdown);
      mdCount++;
    }
  };

  const emitStaticRoute = (routePath: string, htmlOutRel: string, mdOutRel: string) => {
    const { html } = injectSeoMetadata(template, routePath);
    writeFileEnsureDir(path.join(distDir, htmlOutRel), html);
    // Remove duplicate nested <route>/index.html if present from an earlier build so /route and /route/ don't both return 200
    const routeDir = path.join(distDir, routePath.replace(/^\//, ''));
    const nestedDirIndex = path.join(routeDir, 'index.html');
    if (fs.existsSync(nestedDirIndex)) {
      fs.rmSync(nestedDirIndex, { force: true });
      if (fs.existsSync(routeDir) && fs.readdirSync(routeDir).length === 0) {
        fs.rmdirSync(routeDir);
      }
    }
    emitMarkdown(routePath, mdOutRel);
    trailingSlashRedirects.push(`${routePath}/ ${routePath} 301`);
    count++;
  };

  // 1. Top page
  const home = injectSeoMetadata(template, '/');
  writeFileEnsureDir(path.join(distDir, 'index.html'), home.html);
  emitMarkdown('/', 'index.md');
  count++;

  // 2. Pre-render every blog article (including noindex articles so crawlers see <meta name="robots" content="noindex, follow">)
  for (const article of articles) {
    if (!article.slug) continue;
    emitStaticRoute(`/blog/${article.slug}`, path.join('blog', `${article.slug}.html`), path.join('blog', `${article.slug}.md`));
  }

  // 3. Pre-render Blog Index
  emitStaticRoute('/blog', 'blog.html', 'blog.md');

  // 4. Pre-render About and Glossary
  emitStaticRoute('/about', 'about.html', 'about.md');
  emitStaticRoute('/glossary', 'glossary.html', 'glossary.md');

  // 5. Pre-render FAQ Index and all Category pages
  emitStaticRoute('/faq', 'faq.html', 'faq.md');

  const faqCategories = [
    'qualification', 'beginner', 'experienced', 'job',
    'salary', 'hours', 'interview', 'privacy',
    'environment', 'access', 'sidejob', 'support',
    'recruit', 'dorm', 'wwork', 'leaving'
  ];
  for (const cat of faqCategories) {
    emitStaticRoute(`/faq/${cat}`, path.join('faq', `${cat}.html`), path.join('faq', `${cat}.md`));
  }

  // 6. Pre-render Site Compare, Compare Main & all 27 Subpages
  emitStaticRoute('/site-compare', 'site-compare.html', 'site-compare.md');
  emitStaticRoute('/compare', 'compare.html', 'compare.md');

  const compareSlugs = COMPARE_SUBPAGES.map((item) => item.slug);
  for (const slug of compareSlugs) {
    emitStaticRoute(`/compare/${slug}`, path.join('compare', `${slug}.html`), path.join('compare', `${slug}.md`));
  }

  // 7. Pre-render Topic Clusters (11 routes including interview)
  const topics = [
    'job', 'salary', 'beginner', 'experienced',
    'requirements', 'flow', 'interview', 'workstyle',
    'shops', 'dekasegi', 'safety'
  ];
  for (const t of topics) {
    emitStaticRoute(`/${t}`, `${t}.html`, `${t}.md`);
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

  // 9. Ensure _redirects (with explicit trailing-slash 301s before SPA fallback) and .htaccess in dist
  const rootRedirects = path.join(process.cwd(), '_redirects');
  if (fs.existsSync(rootRedirects)) {
    const rawRedirects = fs.readFileSync(rootRedirects, 'utf-8');
    const lines = rawRedirects.split('\n');
    const fallbackIdx = lines.findIndex((line) => line.trim().startsWith('/*'));
    if (fallbackIdx !== -1) {
      const merged = [
        ...lines.slice(0, fallbackIdx),
        '# Canonicalize trailing slashes to non-trailing-slash URLs',
        ...trailingSlashRedirects,
        ...lines.slice(fallbackIdx),
      ].join('\n');
      fs.writeFileSync(path.join(distDir, '_redirects'), merged, 'utf-8');
    } else {
      fs.writeFileSync(path.join(distDir, '_redirects'), `${rawRedirects.trim()}\n${trailingSlashRedirects.join('\n')}\n`, 'utf-8');
    }
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
