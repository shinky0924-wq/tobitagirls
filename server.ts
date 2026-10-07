import express from 'express';
import path from 'path';
import fs from 'fs';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import { injectSeoMetadata } from './src/seoHelper';

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
      '/blog/tobitashinchi-dormitory-lifestyle-support': '/blog/tobitashinchi-housing-support',
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

    const cleanReqPath = req.path.replace(/\/$/, '') || '/';
    const targetRedirect = LEGACY_URL_REDIRECTS[cleanReqPath] || LEGACY_URL_REDIRECTS[req.path];
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
        if (status === 404) {
          res.setHeader('X-Robots-Tag', 'noindex, nofollow');
        }
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
        const cleanPath = req.path.replace(/\/$/, '') || '/';
        const nestedIndex = path.join(distPath, cleanPath, 'index.html');
        const directHtml = path.join(distPath, `${cleanPath}.html`);

        if (cleanPath !== '/' && fs.existsSync(nestedIndex)) {
          return res.status(200).sendFile(nestedIndex);
        }
        if (cleanPath !== '/' && fs.existsSync(directHtml)) {
          return res.status(200).sendFile(directHtml);
        }

        const indexPath = path.join(distPath, 'index.html');
        if (!fs.existsSync(indexPath)) {
          return res.status(404).send('Not Found');
        }
        const template = fs.readFileSync(indexPath, 'utf-8');
        const { html, status } = injectSeoMetadata(template, req.originalUrl);
        if (status === 404) {
          res.setHeader('X-Robots-Tag', 'noindex, nofollow');
        }
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

export { injectSeoMetadata };

startServer().catch((err) => {
  console.error('Fatal error starting server:', err);
  process.exit(1);
});
