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
    articles = JSON.parse(fs.readFileSync(articlesPath, 'utf-8'));
  }

  console.log(`[Prerender] Starting pre-rendering for ${articles.length} articles and static routes...`);

  const writeHtml = (filePath: string, htmlContent: string) => {
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(filePath, htmlContent, 'utf-8');
  };

  let count = 0;

  // 1. Pre-render every blog article with its own title, summary, thumbnail, and OGP/Twitter Card
  for (const article of articles) {
    if (!article.slug) continue;
    const url = `/blog/${article.slug}`;
    const { html } = injectSeoMetadata(template, url);
    writeHtml(path.join(distDir, 'blog', article.slug, 'index.html'), html);
    writeHtml(path.join(distDir, 'blog', `${article.slug}.html`), html);
    count++;
  }

  // 2. Pre-render Blog Index
  const blogList = injectSeoMetadata(template, '/blog');
  writeHtml(path.join(distDir, 'blog', 'index.html'), blogList.html);
  writeHtml(path.join(distDir, 'blog.html'), blogList.html);

  // 3. Pre-render About
  const about = injectSeoMetadata(template, '/about');
  writeHtml(path.join(distDir, 'about', 'index.html'), about.html);
  writeHtml(path.join(distDir, 'about.html'), about.html);

  // 4. Pre-render FAQ
  const faq = injectSeoMetadata(template, '/faq');
  writeHtml(path.join(distDir, 'faq', 'index.html'), faq.html);
  writeHtml(path.join(distDir, 'faq.html'), faq.html);

  // 5. Pre-render Comparison & sub-routes
  const compare = injectSeoMetadata(template, '/compare');
  writeHtml(path.join(distDir, 'compare', 'index.html'), compare.html);
  writeHtml(path.join(distDir, 'compare.html'), compare.html);

  const compareSlugs = [
    'inexperienced',
    'high-income',
    'weekly-1',
    'short-term',
    'dormitory',
    'double-work',
    'age-20s',
    'age-30s'
  ];
  for (const slug of compareSlugs) {
    const compPage = injectSeoMetadata(template, `/compare/${slug}`);
    writeHtml(path.join(distDir, 'compare', slug, 'index.html'), compPage.html);
    writeHtml(path.join(distDir, 'compare', `${slug}.html`), compPage.html);
  }

  // 6. Pre-render Topic Clusters
  const topics = [
    'job', 'salary', 'beginner', 'experienced',
    'requirements', 'flow', 'workstyle', 'shops', 'dorm', 'safety'
  ];
  for (const t of topics) {
    const topicPage = injectSeoMetadata(template, `/${t}`);
    writeHtml(path.join(distDir, t, 'index.html'), topicPage.html);
    writeHtml(path.join(distDir, `${t}.html`), topicPage.html);
  }

  // 7. Ensure _redirects and .htaccess in dist
  const rootRedirects = path.join(process.cwd(), '_redirects');
  if (fs.existsSync(rootRedirects)) {
    fs.copyFileSync(rootRedirects, path.join(distDir, '_redirects'));
  }
  const rootHtaccess = path.join(process.cwd(), '.htaccess');
  if (fs.existsSync(rootHtaccess)) {
    fs.copyFileSync(rootHtaccess, path.join(distDir, '.htaccess'));
  }

  console.log(`[Prerender] Successfully generated pre-rendered static HTML for ${count} articles and core pages!`);
}

runPrerender().catch(err => {
  console.error('[Prerender] Fatal error:', err);
  process.exit(1);
});
