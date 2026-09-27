const fs = require('fs');
const path = require('path');

function escapeHtml(str) {
  return String(str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function resolveFullImageUrl(eyeCatch) {
  if (!eyeCatch) {
    return 'https://tobitashinchi-recruit.com/images/col_beginner_guide_art_1787803245812.jpg';
  }
  const clean = eyeCatch.trim();
  if (clean.startsWith('http://') || clean.startsWith('https://')) {
    return clean;
  }
  const filename = clean.split('/').pop()?.split('?')[0];
  if (filename) {
    return `https://tobitashinchi-recruit.com/images/${filename}`;
  }
  return 'https://tobitashinchi-recruit.com/images/col_beginner_guide_art_1787803245812.jpg';
}

const DEFAULT_TITLE = '飛田新地求人｜未経験歓迎・高収入・求人情報を徹底解説｜飛田ガールズ';
const DEFAULT_DESC = '【飛田新地求人公式】未経験歓迎・高収入（日給5万〜10万円即日全額日払い）。仕事内容、給料システム、20代・未経験の応募条件、面接・体験入店の流れ、個室マンション寮完備。女性サポートスタッフによる無料相談受付中。';
const DEFAULT_IMAGE = 'https://tobitashinchi-recruit.com/images/tobita_dream_hero_banner_1782557055526.jpg';

function injectSeoMetadata(originalHtml, reqUrl, articles = []) {
  let title = DEFAULT_TITLE;
  let description = DEFAULT_DESC;
  let canonicalUrl = 'https://tobitashinchi-recruit.com/';
  let ogType = 'website';
  let ogImageUrl = DEFAULT_IMAGE;
  let ogImageAlt = '飛田新地求人 飛田ガールズ';
  let twitterCard = 'summary_large_image';
  let status = 200;
  let prerenderContent = '';
  let customJsonLd = null;

  const cleanPath = reqUrl.split('?')[0].split('#')[0];

  // 1. Blog details
  if (cleanPath.startsWith('/blog/')) {
    const slug = cleanPath.replace('/blog/', '').replace(/\/$/, '');
    if (slug) {
      const article = articles.find(a => a.slug === slug);
      if (article) {
        title = `${article.title}｜飛田新地求人 飛田ガールズ`;
        description = article.summary || description;
        canonicalUrl = `https://tobitashinchi-recruit.com/blog/${article.slug}`;
        ogType = 'article';
        ogImageUrl = resolveFullImageUrl(article.eyeCatch);
        ogImageAlt = article.title;

        let bodyText = '';
        if (Array.isArray(article.content)) {
          article.content.forEach((block) => {
            if (block.type === 'h2') bodyText += `<h2>${escapeHtml(block.text)}</h2>`;
            else if (block.type === 'h3') bodyText += `<h3>${escapeHtml(block.text)}</h3>`;
            else if (block.type === 'p') bodyText += `<p>${escapeHtml(block.text)}</p>`;
            else if (block.type === 'list' && Array.isArray(block.items)) {
              bodyText += `<ul>${block.items.map(it => `<li>${escapeHtml(it)}</li>`).join('')}</ul>`;
            }
          });
        }

        prerenderContent = `
          <article id="seo-prerender-article" style="display:none;" aria-hidden="true">
            <h1>${escapeHtml(article.title)}</h1>
            <p class="summary">${escapeHtml(article.summary || '')}</p>
            ${bodyText}
          </article>
        `;

        const articleUrl = `https://tobitashinchi-recruit.com/blog/${article.slug}`;

        const graphItems = [
          {
            "@type": "BlogPosting",
            "@id": `${articleUrl}#article`,
            "isPartOf": {
              "@type": "WebSite",
              "@id": "https://tobitashinchi-recruit.com/#website",
              "name": "飛田ガールズ",
              "url": "https://tobitashinchi-recruit.com/"
            },
            "headline": article.title,
            "description": article.summary,
            "image": ogImageUrl,
            "datePublished": article.publishedAt ? article.publishedAt.replace(/\./g, '-') : '2026-07-01',
            "dateModified": "2026-09-05",
            "articleSection": article.categoryLabel,
            "keywords": (article.tags || []).join(', '),
            "inLanguage": "ja-JP",
            "author": {
              "@type": "Person",
              "name": article.author?.name || "さくら",
              "jobTitle": article.author?.role || "女性サポートスタッフ"
            },
            "reviewedBy": {
              "@type": "Organization",
              "name": "飛田新地ガールズ求人サポートスタッフ",
              "url": "https://tobitashinchi-recruit.com/about"
            },
            "publisher": {
              "@type": "Organization",
              "name": "飛田ガールズ",
              "url": "https://tobitashinchi-recruit.com",
              "logo": {
                "@type": "ImageObject",
                "url": "https://tobitashinchi-recruit.com/favicon.svg"
              }
            },
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": articleUrl
            }
          },
          {
            "@type": "BreadcrumbList",
            "@id": `${articleUrl}#breadcrumb`,
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "トップ",
                "item": "https://tobitashinchi-recruit.com/"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "お仕事コラム",
                "item": "https://tobitashinchi-recruit.com/blog"
              },
              {
                "@type": "ListItem",
                "position": 3,
                "name": article.title,
                "item": articleUrl
              }
            ]
          }
        ];

        customJsonLd = JSON.stringify({
          "@context": "https://schema.org",
          "@graph": graphItems
        }, null, 2);
      } else {
        status = 404;
        title = 'お探しの記事が見つかりませんでした (404 Not Found)｜飛田新地求人 飛田ガールズ';
        description = '指定された記事は存在しないか、移動した可能性があります。';
        canonicalUrl = '';
      }
    }
  } else if (cleanPath === '/blog' || cleanPath === '/blog/') {
    title = '飛田新地お仕事コラム・給与・面接ガイド一覧｜飛田ガールズ【公式】';
    description = '飛田新地のお仕事、給料システム、面接・体入の流れ、寮生活、安全対策など、現場の女性スタッフによる役立つ最新コラム一覧。';
    canonicalUrl = 'https://tobitashinchi-recruit.com/blog';
    ogImageUrl = DEFAULT_IMAGE;
    ogImageAlt = '飛田新地お仕事コラム 飛田ガールズ';
  } else if (cleanPath === '/about') {
    title = '飛田ガールズについて｜運営者情報・監修体制・一次情報ポリシー【公式】';
    description = '飛田新地料理組合公認の老舗料亭直営公式求人「飛田ガールズ」の店舗情報、創業歴、運営体制、女性スタッフによるサポート方針、一次情報発信ポリシーをご紹介します。';
    canonicalUrl = 'https://tobitashinchi-recruit.com/about';
    ogImageUrl = DEFAULT_IMAGE;
  } else if (cleanPath === '/compare' || cleanPath === '/compare/') {
    title = '飛田新地求人サイト比較＆目的別求人ガイド【2026年最新】｜未経験・高収入・Wワーク【公式】';
    description = '飛田新地料亭直営公式求人と街頭スカウト業者・一般求人サイトの4者徹底比較。安心の料亭直営で即日全額日払い・身バレ完全防止。';
    canonicalUrl = 'https://tobitashinchi-recruit.com/compare';
    ogImageUrl = DEFAULT_IMAGE;
  } else if (cleanPath === '/faq' || cleanPath.startsWith('/faq/')) {
    title = '飛田新地求人 FAQ（全119問・8大テーマ体系化）｜未経験・給料・身バレ・面接【公式】';
    description = '飛田新地求人のよくある質問と回答（全119問）。応募資格、面接、給料手渡し、個室寮、身バレ対策など、疑問や不安をテーマ別に完全解消。';
    canonicalUrl = `https://tobitashinchi-recruit.com${cleanPath}`;
    ogImageUrl = DEFAULT_IMAGE;
  }

  let html = originalHtml;

  // Replace Title
  html = html.replace(/<title>[^<]*<\/title>/i, `<title>${escapeHtml(title)}</title>`);

  // Replace Meta Description
  if (/<meta\s+name=["']description["'][^>]*>/i.test(html)) {
    html = html.replace(/<meta\s+name=["']description["'][^>]*>/i, `<meta name="description" content="${escapeHtml(description)}" />`);
  } else {
    html = html.replace(/<\/head>/i, `  <meta name="description" content="${escapeHtml(description)}" />\n</head>`);
  }

  // Canonical URL
  if (/<link\s+rel=["']canonical["'][^>]*>/i.test(html)) {
    html = html.replace(/<link\s+rel=["']canonical["'][^>]*>/i, `<link rel="canonical" href="${canonicalUrl}" />`);
  } else {
    html = html.replace(/<\/head>/i, `  <link rel="canonical" href="${canonicalUrl}" />\n</head>`);
  }

  // OGP and Twitter Card Tags (for X/Twitter note-style cards, LINE, and Facebook)
  const metaMappings = [
    { regex: /<meta\s+property=["']og:title["'][^>]*>/i, tag: `<meta property="og:title" content="${escapeHtml(title)}" />` },
    { regex: /<meta\s+property=["']og:description["'][^>]*>/i, tag: `<meta property="og:description" content="${escapeHtml(description)}" />` },
    { regex: /<meta\s+property=["']og:url["'][^>]*>/i, tag: `<meta property="og:url" content="${canonicalUrl}" />` },
    { regex: /<meta\s+property=["']og:type["'][^>]*>/i, tag: `<meta property="og:type" content="${ogType}" />` },
    { regex: /<meta\s+property=["']og:image["'][^>]*>/i, tag: `<meta property="og:image" content="${escapeHtml(ogImageUrl)}" />` },
    { regex: /<meta\s+property=["']og:image:secure_url["'][^>]*>/i, tag: `<meta property="og:image:secure_url" content="${escapeHtml(ogImageUrl)}" />` },
    { regex: /<meta\s+property=["']og:image:type["'][^>]*>/i, tag: `<meta property="og:image:type" content="image/jpeg" />` },
    { regex: /<meta\s+property=["']og:image:width["'][^>]*>/i, tag: `<meta property="og:image:width" content="1200" />` },
    { regex: /<meta\s+property=["']og:image:height["'][^>]*>/i, tag: `<meta property="og:image:height" content="630" />` },
    { regex: /<meta\s+property=["']og:image:alt["'][^>]*>/i, tag: `<meta property="og:image:alt" content="${escapeHtml(ogImageAlt)}" />` },
    { regex: /<meta\s+name=["']twitter:card["'][^>]*>/i, tag: `<meta name="twitter:card" content="${twitterCard}" />` },
    { regex: /<meta\s+name=["']twitter:title["'][^>]*>/i, tag: `<meta name="twitter:title" content="${escapeHtml(title)}" />` },
    { regex: /<meta\s+name=["']twitter:description["'][^>]*>/i, tag: `<meta name="twitter:description" content="${escapeHtml(description)}" />` },
    { regex: /<meta\s+name=["']twitter:image["'][^>]*>/i, tag: `<meta name="twitter:image" content="${escapeHtml(ogImageUrl)}" />` },
    { regex: /<meta\s+name=["']twitter:image:alt["'][^>]*>/i, tag: `<meta name="twitter:image:alt" content="${escapeHtml(ogImageAlt)}" />` },
  ];

  for (const { regex, tag } of metaMappings) {
    if (regex.test(html)) {
      html = html.replace(regex, tag);
    } else {
      html = html.replace(/<\/head>/i, `  ${tag}\n</head>`);
    }
  }

  if (customJsonLd) {
    html = html.replace(/<script\s+type=["']application\/ld\+json["']>[\s\S]*?<\/script>/i, `<script type="application/ld+json">\n${customJsonLd}\n</script>`);
  }

  if (prerenderContent) {
    html = html.replace(/<body([^>]*)>/i, `<body$1>\n${prerenderContent}`);
  }

  return { html, status };
}

function runPrerender() {
  const distDir = path.join(process.cwd(), 'dist');
  const templatePath = path.join(distDir, 'index.html');

  if (!fs.existsSync(templatePath)) {
    console.error('Error: dist/index.html not found! Run vite build before prerendering.');
    process.exit(1);
  }

  const template = fs.readFileSync(templatePath, 'utf-8');

  // Load articles
  const articlesPath = path.join(process.cwd(), 'data', 'blogArticles.json');
  let articles = [];
  if (fs.existsSync(articlesPath)) {
    articles = JSON.parse(fs.readFileSync(articlesPath, 'utf-8'));
  }

  console.log(`[Prerender] Starting pre-rendering for ${articles.length} articles and static routes...`);

  const writeHtml = (filePath, htmlContent) => {
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(filePath, htmlContent, 'utf-8');
  };

  let count = 0;

  // 1. Pre-render every blog article
  for (const article of articles) {
    if (!article.slug) continue;
    const url = `/blog/${article.slug}`;
    const { html } = injectSeoMetadata(template, url, articles);
    writeHtml(path.join(distDir, 'blog', article.slug, 'index.html'), html);
    writeHtml(path.join(distDir, 'blog', `${article.slug}.html`), html);
    count++;
  }

  // 2. Pre-render Blog Index
  const blogList = injectSeoMetadata(template, '/blog', articles);
  writeHtml(path.join(distDir, 'blog', 'index.html'), blogList.html);
  writeHtml(path.join(distDir, 'blog.html'), blogList.html);

  // 3. Pre-render About
  const about = injectSeoMetadata(template, '/about', articles);
  writeHtml(path.join(distDir, 'about', 'index.html'), about.html);
  writeHtml(path.join(distDir, 'about.html'), about.html);

  // 4. Pre-render FAQ
  const faq = injectSeoMetadata(template, '/faq', articles);
  writeHtml(path.join(distDir, 'faq', 'index.html'), faq.html);
  writeHtml(path.join(distDir, 'faq.html'), faq.html);

  // 5. Pre-render Compare
  const compare = injectSeoMetadata(template, '/compare', articles);
  writeHtml(path.join(distDir, 'compare', 'index.html'), compare.html);
  writeHtml(path.join(distDir, 'compare.html'), compare.html);

  const compareSlugs = [
    'inexperienced', 'high-income', 'weekly-1', 'short-term',
    'dormitory', 'double-work', 'age-20s', 'age-30s'
  ];
  for (const slug of compareSlugs) {
    const compPage = injectSeoMetadata(template, `/compare/${slug}`, articles);
    writeHtml(path.join(distDir, 'compare', slug, 'index.html'), compPage.html);
    writeHtml(path.join(distDir, 'compare', `${slug}.html`), compPage.html);
  }

  // 6. Pre-render Topic Clusters
  const topics = [
    'job', 'salary', 'beginner', 'experienced',
    'requirements', 'flow', 'workstyle', 'shops', 'dorm', 'safety'
  ];
  for (const t of topics) {
    const topicPage = injectSeoMetadata(template, `/${t}`, articles);
    writeHtml(path.join(distDir, t, 'index.html'), topicPage.html);
    writeHtml(path.join(distDir, `${t}.html`), topicPage.html);
  }

  // 7. Ensure _redirects in dist
  const rootRedirects = path.join(process.cwd(), '_redirects');
  if (fs.existsSync(rootRedirects)) {
    fs.copyFileSync(rootRedirects, path.join(distDir, '_redirects'));
  }

  console.log(`[Prerender] Successfully generated pre-rendered static HTML for ${count} articles and core pages!`);
}

runPrerender();
