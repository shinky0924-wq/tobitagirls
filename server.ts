import express from 'express';
import path from 'path';
import fs from 'fs';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';

let aiClient: GoogleGenAI | null = null;
function getGenAI(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error('GEMINI_API_KEY environment variable is required');
    }
    aiClient = new GoogleGenAI({ apiKey });
  }
  return aiClient;
}

const DATA_DIR = path.join(process.cwd(), 'data');
const ARTICLES_FILE = path.join(DATA_DIR, 'blogArticles.json');
const SITE_CONTENT_FILE = path.join(DATA_DIR, 'siteContent.json');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: '50mb' }));

  // 301 Permanent Redirects for legacy/changed URLs (Soft 404 Resolution) & Query sanitization
  app.use((req, res, next) => {
    // 1. Sanitize query parameters like ?q={search_term_string} or empty ?q=
    if (req.query && (req.query.q !== undefined || Object.keys(req.query).some(k => k.includes('search_term_string')))) {
      const cleanUrl = req.path;
      return res.redirect(301, cleanUrl);
    }

    // 2. Soft 404 URL Map
    const LEGACY_URL_REDIRECTS: Record<string, string> = {
      '/blog/tobitashinchi-physical-mental-care-guide': '/blog/tobitashinchi-stamina-mental-care-100k',
      '/blog/tobitashinchi-fake-job-scout-warning': '/blog/tobitashinchi-scout-fraud-avoidance-safe-recruitment',
      '/blog/tobitashinchi-daily-work-routine-guide': '/blog/tobitashinchi-daily-schedule-work-flow-detail',
      '/comparison': '/compare',
      '/target-categories': '/compare',
      '/target-jobs': '/compare',
      '/categories': '/compare',
      '/company': '/about',
    };

    const targetRedirect = LEGACY_URL_REDIRECTS[req.path];
    if (targetRedirect) {
      return res.redirect(301, targetRedirect);
    }

    next();
  });

  // Dedicated sitemap.xml route with proper headers (prevents GSC sitemap indexing errors)
  app.get('/sitemap.xml', (_req, res) => {
    const sitemapPath = path.join(process.cwd(), 'public', 'sitemap.xml');
    if (fs.existsSync(sitemapPath)) {
      res.setHeader('Content-Type', 'application/xml; charset=utf-8');
      res.setHeader('X-Robots-Tag', 'noindex, follow');
      res.setHeader('Cache-Control', 'public, max-age=3600');
      return res.sendFile(sitemapPath);
    }
    return res.status(404).send('Sitemap not found');
  });

  // Health check
  app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  // CMS Login
  app.post('/api/cms/login', (req, res) => {
    const { username, password } = req.body || {};
    const validPasswords = ['admin', 'tobita', 'tobita2026'];
    if (process.env.ADMIN_PASSWORD) {
      validPasswords.push(process.env.ADMIN_PASSWORD);
    }

    const isUserOk = username === 'admin' || !username;
    const isPassOk = validPasswords.includes(password);

    if (isUserOk && isPassOk) {
      return res.json({ success: true, message: 'Authenticated' });
    }
    return res.status(401).json({ success: false, error: 'IDまたはパスワードが正しくありません。' });
  });

  // GET Articles
  app.get('/api/cms/articles', (_req, res) => {
    try {
      if (fs.existsSync(ARTICLES_FILE)) {
        const data = fs.readFileSync(ARTICLES_FILE, 'utf-8');
        return res.json(JSON.parse(data));
      }
      return res.json([]);
    } catch (e: any) {
      console.error('Error reading articles:', e);
      return res.status(500).json({ error: 'Failed to read articles from disk' });
    }
  });

  // POST Articles
  app.post('/api/cms/articles', (req, res) => {
    try {
      const articles = req.body;
      if (!Array.isArray(articles)) {
        return res.status(400).json({ error: 'Articles must be an array' });
      }
      fs.writeFileSync(ARTICLES_FILE, JSON.stringify(articles, null, 2), 'utf-8');
      return res.json({ success: true, count: articles.length });
    } catch (e: any) {
      console.error('Error saving articles:', e);
      return res.status(500).json({ error: 'Failed to save articles to disk' });
    }
  });

  // GET Site Content
  app.get('/api/cms/site', (_req, res) => {
    try {
      if (fs.existsSync(SITE_CONTENT_FILE)) {
        const data = fs.readFileSync(SITE_CONTENT_FILE, 'utf-8');
        return res.json(JSON.parse(data));
      }
      return res.json({});
    } catch (e: any) {
      console.error('Error reading site content:', e);
      return res.status(500).json({ error: 'Failed to read site content' });
    }
  });

  // POST Site Content
  app.post('/api/cms/site', (req, res) => {
    try {
      const siteContent = req.body;
      fs.writeFileSync(SITE_CONTENT_FILE, JSON.stringify(siteContent, null, 2), 'utf-8');
      return res.json({ success: true });
    } catch (e: any) {
      console.error('Error saving site content:', e);
      return res.status(500).json({ error: 'Failed to save site content' });
    }
  });

  // POST Generate Articles via Gemini
  app.post('/api/cms/generate-articles', async (req, res) => {
    try {
      const { model = 'gemini', count = 1, category = 'beginner', customTopic } = req.body || {};
      
      let ai;
      try {
        ai = getGenAI();
      } catch (err: any) {
        return res.status(400).json({
          success: false,
          error: 'GEMINI_API_KEY がサーバーに設定されていません。管理画面から直接APIキーを入力するか、環境変数を設定してください。'
        });
      }

      const categoryLabels: Record<string, string> = {
        job: '仕事内容',
        salary: '給料・待遇',
        beginner: '未経験者向け',
        experienced: '経験者向け',
        interview: '面接・お仕事の流れ',
        workstyle: '働き方・ライフスタイル',
        shops: 'お店選び',
        dorm: '寮・出稼ぎ',
        safety: '安心・身バレ対策',
        beauty: '美容・体調管理',
        faq: 'よくある質問'
      };

      const selectedCategoryLabel = categoryLabels[category] || 'お役立ちガイド';
      const prompt = `あなたは飛田新地の老舗料亭で長年働く信頼できる女性サポートスタッフ「さくら」です。
これから飛田新地で働きたいと考えている未経験・不安を抱える女性に向けて、安心感と説得力のある解説コラム記事を ${count} 件作成してください。

【対象カテゴリ】: ${selectedCategoryLabel} (${category})
${customTopic ? `【指定テーマ】: ${customTopic}` : ''}

必ず以下のJSON配列形式（\`\`\`json ... \`\`\` 等のマーカーは含めず、純粋な有効なJSONのみ）で返してください:
[
  {
    "id": "gen_${Date.now()}_1",
    "title": "記事タイトル（32文字前後・SEO最適化）",
    "slug": "英語-ハイフン区切りの一意のスラッグ",
    "category": "${category}",
    "categoryLabel": "${selectedCategoryLabel}",
    "publishedAt": "${new Date().toISOString().split('T')[0]}",
    "readTime": "4分",
    "summary": "100文字程度の要約",
    "eyeCatch": "🌸",
    "author": {
      "name": "さくら",
      "role": "女性サポートスタッフ（歴8年）",
      "avatar": "👩‍💼"
    },
    "tags": ["タグ1", "タグ2", "タグ3"],
    "content": [
      { "type": "p", "text": "導入段落..." },
      { "type": "h2", "text": "見出し2" },
      { "type": "p", "text": "解説本文..." },
      { "type": "list", "items": ["項目1", "項目2", "項目3"] },
      { "type": "cta" },
      { "type": "h2", "text": "まとめ" },
      { "type": "p", "text": "まとめのメッセージ..." }
    ]
  }
]`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
        }
      });

      const responseText = response.text || '[]';
      let articles = [];
      try {
        articles = JSON.parse(responseText.trim());
      } catch (parseErr) {
        // Strip markdown code blocks if any
        const cleaned = responseText.replace(/```json/g, '').replace(/```/g, '').trim();
        articles = JSON.parse(cleaned);
      }

      if (!Array.isArray(articles)) {
        articles = [articles];
      }

      return res.json({
        success: true,
        count: articles.length,
        articles
      });

    } catch (e: any) {
      console.error('Error generating articles:', e);
      return res.status(500).json({
        success: false,
        error: e.message || 'コラム生成中にエラーが発生しました。'
      });
    }
  });

  // Vite middleware & dynamic SSR SEO HTML serving
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'custom',
    });
    app.use(vite.middlewares);

    app.use('*', async (req, res, next) => {
      const url = req.originalUrl;
      // Do not handle /api routes here
      if (url.startsWith('/api')) {
        return next();
      }
      try {
        const indexPath = path.join(process.cwd(), 'index.html');
        let template = fs.readFileSync(indexPath, 'utf-8');
        template = await vite.transformIndexHtml(url, template);
        const { html, status } = injectSeoMetadata(template, url);
        res.status(status).set({ 'Content-Type': 'text/html; charset=utf-8' }).send(html);
      } catch (e) {
        vite.ssrFixStacktrace(e as Error);
        next(e);
      }
    });
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath, { index: false }));
    app.get('*', (req, res) => {
      try {
        const indexPath = path.join(distPath, 'index.html');
        if (!fs.existsSync(indexPath)) {
          return res.status(404).send('Not Found');
        }
        const template = fs.readFileSync(indexPath, 'utf-8');
        const { html, status } = injectSeoMetadata(template, req.originalUrl);
        res.status(status).set({ 'Content-Type': 'text/html; charset=utf-8' }).send(html);
      } catch (e) {
        console.error('Error serving index.html:', e);
        res.status(500).send('Internal Server Error');
      }
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

function escapeHtml(str: string): string {
  return String(str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function injectSeoMetadata(originalHtml: string, reqUrl: string): { html: string; status: number } {
  let title = '飛田新地求人｜未経験歓迎・高収入・求人情報を徹底解説｜飛田ガールズ';
  let description = '【飛田新地求人公式】未経験歓迎・高収入（日給5万〜10万円即日全額日払い）。仕事内容、給料システム、20代・未経験の応募条件、面接・体験入店の流れ、個室マンション寮完備。女性サポートスタッフによる無料相談受付中。';
  let canonicalUrl = 'https://tobitashinchi-recruit.com/';
  let status = 200;
  let prerenderContent = '';
  let customJsonLd: string | null = null;

  const cleanPath = reqUrl.split('?')[0].split('#')[0];

  // 1. Blog details
  if (cleanPath.startsWith('/blog/')) {
    const slug = cleanPath.replace('/blog/', '').replace(/\/$/, '');
    if (slug) {
      try {
        let articles: any[] = [];
        if (fs.existsSync(ARTICLES_FILE)) {
          articles = JSON.parse(fs.readFileSync(ARTICLES_FILE, 'utf-8'));
        }
        const article = articles.find((a: any) => a.slug === slug);
        if (article) {
          title = `${article.title}｜飛田新地求人 飛田ガールズ`;
          description = article.summary || description;
          canonicalUrl = `https://tobitashinchi-recruit.com/blog/${article.slug}`;

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
        } else {
          status = 404;
          title = '記事が見つかりませんでした｜飛田新地求人 飛田ガールズ';
          description = '指定された記事は存在しないか、移動した可能性があります。';
          canonicalUrl = 'https://tobitashinchi-recruit.com/blog';
        }
      } catch (e) {
        console.error('Error in SEO injection for blog:', e);
      }
    }
  } else if (cleanPath === '/blog' || cleanPath === '/blog/') {
    title = '飛田新地お仕事コラム・給与・面接ガイド一覧｜飛田ガールズ【公式】';
    description = '飛田新地のお仕事、給料システム、面接・体入の流れ、寮生活、安全対策など、現場の女性スタッフによる役立つ最新コラム一覧。';
    canonicalUrl = 'https://tobitashinchi-recruit.com/blog';
  } else if (cleanPath === '/about') {
    title = '飛田ガールズについて｜運営者情報・監修体制・一次情報ポリシー【公式】';
    description = '飛田新地料理組合公認の老舗料亭直営公式求人「飛田ガールズ」の店舗情報、創業歴、運営体制、女性スタッフによるサポート方針、一次情報発信ポリシーをご紹介します。';
    canonicalUrl = 'https://tobitashinchi-recruit.com/about';
  } else if (cleanPath === '/compare' || cleanPath === '/compare/') {
    title = '飛田新地求人サイト比較＆目的別求人ガイド【2026年最新】｜未経験・高収入・Wワーク【公式】';
    description = '飛田新地料亭直営公式求人と街頭スカウト業者・一般求人サイトの4者徹底比較。安心の料亭直営で即日全額日払い・身バレ完全防止。';
    canonicalUrl = 'https://tobitashinchi-recruit.com/compare';
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
        'experienceRequirements': slug === 'inexperienced' ? 'no requirements' : 'not required',
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

  // Replace Canonical URL
  if (/<link\s+rel=["']canonical["'][^>]*>/i.test(html)) {
    html = html.replace(/<link\s+rel=["']canonical["'][^>]*>/i, `<link rel="canonical" href="${canonicalUrl}" />`);
  } else {
    html = html.replace(/<\/head>/i, `  <link rel="canonical" href="${canonicalUrl}" />\n</head>`);
  }

  // Replace OG Tags
  if (/<meta\s+property=["']og:title["'][^>]*>/i.test(html)) {
    html = html.replace(/<meta\s+property=["']og:title["'][^>]*>/i, `<meta property="og:title" content="${escapeHtml(title)}" />`);
  } else {
    html = html.replace(/<\/head>/i, `  <meta property="og:title" content="${escapeHtml(title)}" />\n</head>`);
  }

  if (/<meta\s+property=["']og:description["'][^>]*>/i.test(html)) {
    html = html.replace(/<meta\s+property=["']og:description["'][^>]*>/i, `<meta property="og:description" content="${escapeHtml(description)}" />`);
  } else {
    html = html.replace(/<\/head>/i, `  <meta property="og:description" content="${escapeHtml(description)}" />\n</head>`);
  }

  if (/<meta\s+property=["']og:url["'][^>]*>/i.test(html)) {
    html = html.replace(/<meta\s+property=["']og:url["'][^>]*>/i, `<meta property="og:url" content="${canonicalUrl}" />`);
  } else {
    html = html.replace(/<\/head>/i, `  <meta property="og:url" content="${canonicalUrl}" />\n</head>`);
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

startServer().catch((err) => {
  console.error('Fatal error starting server:', err);
  process.exit(1);
});
