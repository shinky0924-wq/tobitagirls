import fs from 'fs';
import path from 'path';

export function escapeHtml(str: string): string {
  return String(str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export function resolveFullImageUrl(eyeCatch?: string): string {
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

export function injectSeoMetadata(originalHtml: string, reqUrl: string): { html: string; status: number } {
  let title = DEFAULT_TITLE;
  let description = DEFAULT_DESC;
  let canonicalUrl = 'https://tobitashinchi-recruit.com/';
  let ogType = 'website';
  let ogImageUrl = DEFAULT_IMAGE;
  let ogImageAlt = '飛田新地求人 飛田ガールズ';
  let twitterCard = 'summary_large_image';
  let status = 200;
  let prerenderContent = '';
  let customJsonLd: string | null = null;

  const cleanPath = reqUrl.split('?')[0].split('#')[0];

  // 1. Blog details
  if (cleanPath.startsWith('/blog/')) {
    const slug = cleanPath.replace('/blog/', '').replace(/\/$/, '');
    if (slug) {
      try {
        const articlesFile = path.join(process.cwd(), 'data', 'blogArticles.json');
        let articles: any[] = [];
        if (fs.existsSync(articlesFile)) {
          articles = JSON.parse(fs.readFileSync(articlesFile, 'utf-8'));
        }
        const article = articles.find((a: any) => a.slug === slug);
        if (article) {
          title = `${article.title}｜飛田新地求人 飛田ガールズ`;
          description = article.summary || description;
          canonicalUrl = `https://tobitashinchi-recruit.com/blog/${article.slug}`;
          ogType = 'article';
          ogImageUrl = resolveFullImageUrl(article.eyeCatch);
          ogImageAlt = article.title;

          let bodyText = '';
          if (Array.isArray(article.content)) {
            article.content.forEach((block: any) => {
              if (block.type === 'h2') bodyText += `<h2>${escapeHtml(block.text)}</h2>`;
              else if (block.type === 'h3') bodyText += `<h3>${escapeHtml(block.text)}</h3>`;
              else if (block.type === 'p') bodyText += `<p>${escapeHtml(block.text)}</p>`;
              else if (block.type === 'list' && Array.isArray(block.items)) {
                bodyText += `<ul>${block.items.map((it: string) => `<li>${escapeHtml(it)}</li>`).join('')}</ul>`;
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

          const graphItems: any[] = [
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

          const qnaBlocks = (article.content || []).filter((b: any) => b.type === 'qna' && b.question && (b.answer || b.text));
          if (qnaBlocks.length > 0) {
            graphItems.push({
              "@type": "FAQPage",
              "@id": `${articleUrl}#faq`,
              "mainEntity": qnaBlocks.map((q: any) => ({
                "@type": "Question",
                "name": q.question,
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": q.answer || q.text || ""
                }
              }))
            });
          }

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
      } catch (e) {
        console.error('Error in SEO injection for blog:', e);
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
    ogImageAlt = '飛田ガールズ 運営者情報';
  } else if (cleanPath === '/compare' || cleanPath === '/compare/') {
    title = '飛田新地求人サイト比較＆目的別求人ガイド【2026年最新】｜未経験・高収入・Wワーク【公式】';
    description = '飛田新地料亭直営公式求人と街頭スカウト業者・一般求人サイトの4者徹底比較。安心の料亭直営で即日全額日払い・身バレ完全防止。';
    canonicalUrl = 'https://tobitashinchi-recruit.com/compare';
    ogImageUrl = DEFAULT_IMAGE;
  } else if (cleanPath.startsWith('/compare/')) {
    const slug = cleanPath.replace('/compare/', '').replace(/\/$/, '');
    const COMPARE_META: Record<string, { title: string; desc: string }> = {
      'inexperienced': {
        title: '【未経験向け求人】90%が夜職初心者！安心のサポート体制｜飛田新地求人 飛田ガールズ',
        desc: '夜職未経験から始められる飛田新地求人。お酒不要・営業連絡なし・女性スタッフによる研修付きで安心。'
      },
      'high-income': {
        title: '【高収入求人】日給5万〜15万円超・売上50%完全バック｜飛田新地求人 飛田ガールズ',
        desc: '飛田新地の高収入給料システム。即日全額日払い手渡し、売上50%完全バック、ノルマ・罰金一切なし。'
      },
      'weekly-1': {
        title: '【週1日・マイペース求人】無理のない自由出勤シフト｜飛田新地求人 飛田ガールズ',
        desc: '週1日〜OK・自由シフト制の飛田新地求人。本業や学業との両立、掛け持ちWワークも大歓迎。'
      },
      'short-term': {
        title: '【短期・出稼ぎ求人】交通費全額支給・即日全額日払い｜飛田新地求人 飛田ガールズ',
        desc: '短期集中・1日〜数週間の出稼ぎ歓迎。交通費支給・即入居寮完備で手ぶらスタート可能。'
      },
      'dormitory': {
        title: '【即入居OK・個室マンション寮完備】家具家電付き・生活支援｜飛田新地求人 飛田ガールズ',
        desc: '飛田新地の個室マンション寮。家具家電付き・Wi-Fi完備・即日入居可能。遠方からの上京・新生活も万全サポート。'
      },
      'double-work': {
        title: '【Wワーク・副業向け求人】身バレ・会社バレ徹底防止対策｜飛田新地求人 飛田ガールズ',
        desc: 'OLや会社員、学生のWワーク・副業に最適。ネット写真ゼロ、街全体の撮影禁止、完全源氏名で身バレ防止100%。'
      },
      'age-20s': {
        title: '【20代女性向け求人】学生・フリーター歓迎・安全第一｜飛田新地求人 飛田ガールズ',
        desc: '20代女性が安心して働ける老舗料亭直営店。無理のない働き方と温かいサポート。'
      },
      'age-30s': {
        title: '【30代以上・大人女子向け求人】落ち着いた接客とおもてなし｜飛田新地求人 飛田ガールズ',
        desc: '30代・40代の大人女性が多数活躍中。落ち着いた接客と年齢に合わせた丁寧なフォロー体制。'
      }
    };

    const COMPARE_SALARY_SCHEMA: Record<string, { min: number; max: number; emp: string }> = {
      'inexperienced': { min: 30000, max: 65000, emp: 'PART_TIME' },
      'high-income': { min: 60000, max: 150000, emp: 'PART_TIME' },
      'weekly-1': { min: 35000, max: 80000, emp: 'PART_TIME' },
      'short-term': { min: 50000, max: 120000, emp: 'TEMPORARY' },
      'dormitory': { min: 40000, max: 90000, emp: 'PART_TIME' },
      'double-work': { min: 35000, max: 70000, emp: 'PART_TIME' },
      'age-20s': { min: 45000, max: 110000, emp: 'PART_TIME' },
      'age-30s': { min: 40000, max: 90000, emp: 'PART_TIME' }
    };

    if (COMPARE_META[slug]) {
      title = `${COMPARE_META[slug].title}`;
      description = COMPARE_META[slug].desc;
      canonicalUrl = `https://tobitashinchi-recruit.com/compare/${slug}`;

      const sal = COMPARE_SALARY_SCHEMA[slug] || { min: 30000, max: 100000, emp: 'PART_TIME' };
      customJsonLd = JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'JobPosting',
        '@id': `https://tobitashinchi-recruit.com/compare/${slug}#jobposting`,
        'title': COMPARE_META[slug].title,
        'description': `${COMPARE_META[slug].desc}【飛田新地料理組合公認料亭直営 飛田ガールズ】全額日払い手渡し・ノルマ罰金一切なし・個室マンション寮完備・安心の女性スタッフサポート。`,
        'identifier': {
          '@type': 'PropertyValue',
          'name': '飛田ガールズ 料亭直営採用窓口',
          'value': `TOBITA-COMPARE-${slug.toUpperCase()}`
        },
        'datePosted': '2026-08-01T00:00:00+09:00',
        'validThrough': '2027-12-31T23:59:59+09:00',
        'employmentType': sal.emp,
        'hiringOrganization': {
          '@type': 'Organization',
          'name': '飛田新地料理組合公認料亭直営 飛田ガールズ',
          'sameAs': 'https://tobitashinchi-recruit.com',
          'logo': 'https://tobitashinchi-recruit.com/favicon.svg'
        },
        'jobLocation': {
          '@type': 'Place',
          'address': {
            '@type': 'PostalAddress',
            'streetAddress': '山王3丁目',
            'addressLocality': '大阪市西成区',
            'addressRegion': '大阪府',
            'postalCode': '557-0001',
            'addressCountry': 'JP'
          }
        },
        'baseSalary': {
          '@type': 'MonetaryAmount',
          'currency': 'JPY',
          'value': {
            '@type': 'QuantitativeValue',
            'minValue': sal.min,
            'maxValue': sal.max,
            'unitText': 'DAY'
          }
        },
        'applicantLocationRequirements': {
          '@type': 'Country',
          'name': 'JP'
        },
        'workHours': '10:00〜24:00（自由シフト制・週1日〜/1日3時間〜勤務可）',
        'qualifications': '20歳以上の女性（未経験歓迎・学歴経験不問 ※料理組合規約により20歳未満不可）',
        'directApply': true
      }, null, 2);
    } else {
      canonicalUrl = `https://tobitashinchi-recruit.com/compare/${slug}`;
    }
  } else if (cleanPath === '/faq' || cleanPath.startsWith('/faq/')) {
    title = '飛田新地求人 FAQ（全119問・8大テーマ体系化）｜未経験・給料・身バレ・面接【公式】';
    description = '飛田新地求人のよくある質問と回答（全119問）。応募資格、面接、給料手渡し、個室寮、身バレ対策など、疑問や不安をテーマ別に完全解消。';
    canonicalUrl = `https://tobitashinchi-recruit.com${cleanPath}`;
  } else {
    const TOPIC_PATHS: Record<string, { title: string; desc: string }> = {
      '/job': { title: '【飛田新地求人】お仕事内容と1日の流れ｜お茶出しとおもてなし接客・お酒一切不要【公式】', desc: '飛田新地求人の仕事内容を徹底解説。料亭の玄関でお出迎えし、お部屋でお茶やお菓子を出しながらおもてなし。お酒一切不要、営業連絡禁止、1回15〜20分の短時間接客で安心です。' },
      '/salary': { title: '【飛田新地求人】給料システムと日給相場｜売上50%完全バック・即日全額日払い【公式】', desc: '飛田新地の給与・報酬体系を完全公開。売上ハーフバック（50%）で日給3万〜10万円超。引かれもの・雑費なし、即日全額現金日払い手渡し。' },
      '/beginner': { title: '【飛田新地求人】未経験・夜職初めての女性へ｜安心サポート体制と体験入店【公式】', desc: '夜のお仕事が初めての女性向けガイド。90%以上が未経験スタート。女性スタッフによる丁寧な研修と1回ごとのフォロー。' },
      '/experienced': { title: '【飛田新地求人】他店・他業種からの移籍・経験者優遇｜条件交渉と入店サポート【公式】', desc: 'キャバクラ、ラウンジ、他店からの移籍・経験者サポート。自由シフト・高稼働料亭直営で無駄なストレスゼロ。' },
      '/requirements': { title: '【飛田新地求人】応募資格・面接条件・必要書類まとめ｜20歳以上の女性【公式】', desc: '飛田新地料亭の応募資格と面接時の持ち物、住民票など必要書類の準備方法を詳しく解説。' },
      '/flow': { title: '【飛田新地求人】応募から面接・体験入店・お仕事開始までの流れ【公式】', desc: 'LINEでの無料相談から面接、即日体験入店、日払い受け取りまでの具体的なステップを解説。' },
      '/workstyle': { title: '【飛田新地求人】自由なシフトと働き方｜週1日・短時間・昼出勤OK【公式】', desc: '昼シフト（10時〜18時）や夜シフト、週1日出勤など、ライフスタイルに合わせた自由な働き方。' },
      '/shops': { title: '【飛田新地求人】通り別の特徴とお客層｜メイン通り・青春通り・大門通りの違い【公式】', desc: '飛田新地の各通りごとの特色、客層の違い、自分に合った料亭選びのポイントを網羅。' },
      '/dorm': { title: '【飛田新地求人】即日入居できる個室マンション寮・生活支援・出稼ぎサポート【公式】', desc: '家具家電付き・セキュリティ完備の個室寮を完備。遠方からの出稼ぎや即日入居も対応。' },
      '/safety': { title: '【飛田新地求人】身バレ防止・プライバシー保護・安心の防犯体制【公式】', desc: 'ネット露出一切なし・街全体の撮影禁止規約・完全源氏名勤務。身バレを徹底的に防ぐ安全体制。' }
    };
    if (TOPIC_PATHS[cleanPath]) {
      title = TOPIC_PATHS[cleanPath].title;
      description = TOPIC_PATHS[cleanPath].desc;
      canonicalUrl = `https://tobitashinchi-recruit.com${cleanPath}`;
    }
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

  // Replace Canonical URL & Robots for 404
  if (status === 404) {
    if (/<meta\s+name=["']robots["'][^>]*>/i.test(html)) {
      html = html.replace(/<meta\s+name=["']robots["'][^>]*>/i, '<meta name="robots" content="noindex, nofollow" />');
    } else {
      html = html.replace(/<\/head>/i, '  <meta name="robots" content="noindex, nofollow" />\n</head>');
    }
    html = html.replace(/<link\s+rel=["']canonical["'][^>]*>/i, '');
  } else {
    if (/<link\s+rel=["']canonical["'][^>]*>/i.test(html)) {
      html = html.replace(/<link\s+rel=["']canonical["'][^>]*>/i, `<link rel="canonical" href="${canonicalUrl}" />`);
    } else {
      html = html.replace(/<\/head>/i, `  <link rel="canonical" href="${canonicalUrl}" />\n</head>`);
    }
  }

  // OGP and Twitter Card Tags (for X/Twitter note-style cards, LINE, and Facebook)
  const metaMappings: { regex: RegExp; tag: string }[] = [
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

  // Replace Structured Data (JSON-LD) if custom defined for specific route
  if (customJsonLd) {
    html = html.replace(/<script\s+type=["']application\/ld\+json["']>[\s\S]*?<\/script>/i, `<script type="application/ld+json">\n${customJsonLd}\n</script>`);
  }

  // Inject Pre-rendered content for Web Crawlers
  if (prerenderContent) {
    html = html.replace(/<body([^>]*)>/i, `<body$1>\n${prerenderContent}`);
  }

  return { html, status };
}
