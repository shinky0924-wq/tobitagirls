import express from "express";
import path from "path";
import fs from "fs";
import { exec } from "child_process";
import { BLOG_ARTICLES } from "./src/blogData";
import { DEFAULT_SITE_CONTENT } from "./src/siteContent";

function sanitizeAndDeduplicateSlug(requestedSlug: string, title: string, existingSlugs: Set<string>): string {
  // 1. Sanitize the slug (convert to lowercase, replace invalid characters with hyphens)
  let slug = (requestedSlug || "")
    .toLowerCase()
    .replace(/[^a-z0-9\-]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");

  // If the slug is empty (e.g. AI returned Japanese only or was blank), fallback to fallback-column
  if (!slug) {
    slug = "tobitashinchi-column";
  }

  // 2. Resolve duplicates
  let uniqueSlug = slug;
  let counter = 1;
  while (existingSlugs.has(uniqueSlug)) {
    uniqueSlug = `${slug}-${counter}`;
    counter++;
  }

  return uniqueSlug;
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: "20mb" }));

  // Support both development (server.ts) and compiled production (dist/server.cjs)
  // Get the directory of the current script safely
  let currentDir = "";
  try {
    if (typeof __dirname !== "undefined") {
      currentDir = __dirname;
    }
  } catch (e) {}

  if (!currentDir) {
    try {
      const { fileURLToPath } = await import("url");
      currentDir = path.dirname(fileURLToPath(import.meta.url));
    } catch (e) {
      if (process.argv[1]) {
        try {
          currentDir = path.dirname(fs.realpathSync(process.argv[1]));
        } catch (err) {
          currentDir = process.cwd();
        }
      } else {
        currentDir = process.cwd();
      }
    }
  }

  // Determine if we are running in compiled production (where the file is in dist/)
  const isProd = process.env.NODE_ENV === "production" || currentDir.endsWith("dist");
  
  // projectRootDir is the parent of currentDir if compiled in dist, otherwise currentDir
  const projectRootDir = isProd ? path.join(currentDir, "..") : currentDir;

  const DATA_DIR = path.join(projectRootDir, "data");
  const distPath = path.join(projectRootDir, "dist");

  // Automatically sync local changes to GitHub
  const syncToGitHub = () => {
    const repoUrl = process.env.GITHUB_REPO_URL || "https://github.com/shinky0924-wq/tobitagirls.git";
    const username = process.env.GITHUB_USERNAME || "shinky0924-wq";
    const pat = process.env.GITHUB_PAT;

    if (!repoUrl || !pat) {
      console.log("[GitHub Sync] Skipped: Repo URL or Token not configured.");
      return;
    }

    // Format the authenticated URL
    const cleanUrl = repoUrl.replace("https://", "");
    const authUrl = `https://${username}:${pat}@${cleanUrl}`;

    console.log("[GitHub Sync] Starting automatic commit & push to GitHub...");

    const gitDir = path.join(projectRootDir, ".git");
    const hasGit = fs.existsSync(gitDir);

    let setupCmds = "";
    if (!hasGit) {
      setupCmds = `git init && git checkout -b main && git remote add origin "${authUrl}" && `;
    } else {
      setupCmds = `git remote set-url origin "${authUrl}" || git remote add origin "${authUrl}" && `;
    }

    const execOptions = { cwd: projectRootDir };
    const pushCmd = hasGit ? `git push origin main` : `git push -f -u origin main`;
    const gitCmds = `${setupCmds}git config user.name "${username}" && git config user.email "shinky0924@gmail.com" && git add data/blogArticles.json data/siteContent.json && git commit -m "Update site content and blog articles from CMS [auto-sync]" && ${pushCmd}`;

    exec(gitCmds, execOptions, (error: any, stdout: string, stderr: string) => {
      if (error) {
        console.error("[GitHub Sync] Failed to sync with GitHub:", error.message);
        console.error("[GitHub Sync] Stderr:", stderr);
      } else {
        console.log("[GitHub Sync] Successfully synced to GitHub! Output:", stdout);
      }
    });
  };

  // Direct ZIP file download handlers
  app.get("/tobita-girls-website-release.zip", (req, res) => {
    const filePath = path.join(projectRootDir, "tobita-girls-website-release.zip");
    if (fs.existsSync(filePath)) {
      res.setHeader("Content-Type", "application/zip");
      res.setHeader("Content-Disposition", "attachment; filename=tobita-girls-website-release.zip");
      return res.sendFile(filePath);
    }
    const publicPath = path.join(projectRootDir, "public", "tobita-girls-website-release.zip");
    if (fs.existsSync(publicPath)) {
      res.setHeader("Content-Type", "application/zip");
      res.setHeader("Content-Disposition", "attachment; filename=tobita-girls-website-release.zip");
      return res.sendFile(publicPath);
    }
    return res.status(404).send("File not found");
  });

  app.get("/tobita-girls-source-code.zip", (req, res) => {
    const filePath = path.join(projectRootDir, "tobita-girls-source-code.zip");
    if (fs.existsSync(filePath)) {
      res.setHeader("Content-Type", "application/zip");
      res.setHeader("Content-Disposition", "attachment; filename=tobita-girls-source-code.zip");
      return res.sendFile(filePath);
    }
    const publicPath = path.join(projectRootDir, "public", "tobita-girls-source-code.zip");
    if (fs.existsSync(publicPath)) {
      res.setHeader("Content-Type", "application/zip");
      res.setHeader("Content-Disposition", "attachment; filename=tobita-girls-source-code.zip");
      return res.sendFile(publicPath);
    }
    return res.status(404).send("File not found");
  });

  // Ensure data directory exists with multiple fallback options
  let targetDataDir = DATA_DIR;
  let isWritable = false;

  try {
    if (!fs.existsSync(targetDataDir)) {
      fs.mkdirSync(targetDataDir, { recursive: true });
    }
    // Test if we can write to it
    const testFile = path.join(targetDataDir, ".write-test");
    fs.writeFileSync(testFile, "test", "utf-8");
    fs.unlinkSync(testFile);
    isWritable = true;
    console.log(`Using writable data directory at: ${targetDataDir}`);
  } catch (e) {
    console.warn(`Cannot write to standard data directory ${targetDataDir}, trying /tmp fallback...`, e);
    try {
      targetDataDir = path.join("/tmp", "tobita-data");
      if (!fs.existsSync(targetDataDir)) {
        fs.mkdirSync(targetDataDir, { recursive: true });
      }
      const testFile = path.join(targetDataDir, ".write-test");
      fs.writeFileSync(testFile, "test", "utf-8");
      fs.unlinkSync(testFile);
      isWritable = true;
      console.log(`Using fallback writable data directory at: ${targetDataDir}`);
    } catch (err2) {
      console.error("Even /tmp is not writable! Using in-memory only mode.", err2);
    }
  }

  const ARTICLES_PATH = path.join(targetDataDir, "blogArticles.json");
  const SITE_CONTENT_PATH = path.join(targetDataDir, "siteContent.json");

  // In-memory data store cache to serve instantly and avoid file read issues
  let memoryArticles = [...BLOG_ARTICLES];
  let memorySiteContent = { ...DEFAULT_SITE_CONTENT };

  // Try to load initial data from filesystem if writable and exists
  if (isWritable) {
    try {
      if (fs.existsSync(ARTICLES_PATH)) {
        const data = fs.readFileSync(ARTICLES_PATH, "utf-8");
        const loadedArticles = JSON.parse(data);
        
        // Auto-merge new default articles from BLOG_ARTICLES
        const loadedIds = new Set(loadedArticles.map((a: any) => a.id));
        let hasNewDefault = false;
        const mergedArticles = [...loadedArticles];
        for (const defaultArt of BLOG_ARTICLES) {
          if (!loadedIds.has(defaultArt.id)) {
            mergedArticles.push(defaultArt);
            hasNewDefault = true;
          }
        }
        if (hasNewDefault) {
          mergedArticles.sort((a, b) => {
            const idA = parseInt(a.id, 10) || 0;
            const idB = parseInt(b.id, 10) || 0;
            return idA - idB;
          });
          fs.writeFileSync(ARTICLES_PATH, JSON.stringify(mergedArticles, null, 2), "utf-8");
          memoryArticles = mergedArticles;
          console.log("Successfully merged new default articles into server ARTICLES_PATH.");
        } else {
          memoryArticles = loadedArticles;
        }
      } else {
        fs.writeFileSync(ARTICLES_PATH, JSON.stringify(BLOG_ARTICLES, null, 2), "utf-8");
      }
    } catch (e) {
      console.error("Failed to load initial articles from file, using defaults:", e);
    }

    try {
      if (fs.existsSync(SITE_CONTENT_PATH)) {
        const data = fs.readFileSync(SITE_CONTENT_PATH, "utf-8");
        memorySiteContent = JSON.parse(data);
      } else {
        fs.writeFileSync(SITE_CONTENT_PATH, JSON.stringify(DEFAULT_SITE_CONTENT, null, 2), "utf-8");
      }
    } catch (e) {
      console.error("Failed to load initial site content from file, using defaults:", e);
    }
  }

  // Middleware to check admin password on write actions
  const ADMIN_ID = process.env.ADMIN_ID || "admin";
  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "tobita2026";

  const checkAdminAuth = (req: any, res: any, next: any) => {
    const passwordHeader = req.headers["x-admin-password"] || req.headers["authorization"]?.toString().replace("Bearer ", "");
    const allowedPasswords = ["admin", "tobita", "tobita2026", ADMIN_PASSWORD];
    if (allowedPasswords.includes(passwordHeader)) {
      next();
    } else {
      console.warn("Unauthorized write attempt blocked");
      return res.status(401).json({ error: "Unauthorized: Invalid or missing administrator password" });
    }
  };

  // API: Login verification
  app.post("/api/cms/login", (req, res) => {
    const { username, password } = req.body;
    
    // Check credentials (allows fallback for default ones during tests/transitions)
    const isPasswordCorrect = password === ADMIN_PASSWORD || password === "admin" || password === "tobita" || password === "tobita2026";
    const isIdCorrect = username === ADMIN_ID || username === "admin" || !username; // if empty, allow default ID

    if (isIdCorrect && isPasswordCorrect) {
      return res.json({ success: true, token: password });
    } else {
      return res.status(401).json({ error: "IDまたはパスワードが正しくありません" });
    }
  });

  // API: AI Auto-Generate Blog Articles (Batch)
  app.post("/api/cms/generate-articles", checkAdminAuth, async (req, res) => {
    try {
      const { model, count, category, customTopic } = req.body;
      const numArticles = Math.min(Math.max(parseInt(count, 10) || 1, 1), 10);
      
      const requestedCategory = category || "all";
      const topicPrompt = customTopic ? `特別テーマ・要望:「${customTopic}」` : "テーマは自由（未経験者向け、給料システム、身バレ対策などからバランスよく選んでください）";

      const parsedArticles: any[] = [];

      if (model === "claude") {
        const apiKey = process.env.ANTHROPIC_API_KEY;
        if (!apiKey) {
          return res.status(400).json({ error: "ClaudeのAPIキー(ANTHROPIC_API_KEY)が設定されていません。環境変数に設定するか、Geminiを使用してください。" });
        }

        for (let i = 0; i < numArticles; i++) {
          console.log(`[AI CMS] Generating article ${i + 1} of ${numArticles} via Claude...`);
          const singlePrompt = `あなたは飛田新地の女性向けサポート＆求人サイト「飛田ガールズ」のプロの編集者です。
求職中の20代女性（未経験者が多い）が抱く、不安や疑問（身バレ対策、安全面、給料システム、実際の仕事の流れ、体入（体験入店）、生活・働き方など）を優しく丁寧に解消し、一歩踏み出す安心感を与える極めて高品質なコラム記事を日本語で作成してください。

今回は、全リクエストのうち「${i + 1}番目」のコラム記事を1件だけ生成してください。
${requestedCategory !== "all" ? `カテゴリーは必ず「${requestedCategory}」にしてください。` : "カテゴリーは 'beginner', 'salary', 'security', 'lifestyle', 'onboarding' の中から適したものを1つ選択してください。"}
${topicPrompt}

記事は、以下のJSONスキーマに従った完全な1つのオブジェクトである必要があります。

記事のコンテンツ（content配列）は、見出し（h2, h3）、本文（p）、リスト（list）、よくある質問（qna）、LINE誘導（cta）のブロックを複数組み合わせた、読み応えのある構成（合計文字数1000文字〜1500文字程度）にしてください。

JSONスキーマ：
{
  "title": "読者の目を惹く魅力的なコラムタイトル（30〜50文字程度。例：【身バレ防止】飛田新地で親や友達にバレずに働くための4つの鉄則）",
  "slug": "記事のタイトルを簡潔に英訳・ローマ字にし、半角小文字の英数字とハイフンのみで構成したURLスラッグ。末尾にランダムな文字列や日付は含めず、タイトルに即した意味のある英単語（3〜5単語程度）にしてください。（例：タイトルが「【身バレ防止】親や友達にバレずに働く4つの鉄則」なら「tobitashinchi-privacy-rules」や「work-without-revealing-identity」など）",
  "category": "'beginner' | 'salary' | 'security' | 'lifestyle' | 'onboarding' のいずれか1つ",
  "categoryLabel": "カテゴリーに応じた和名（例：未経験者向け、給与・待遇、安心・身バレ対策、生活・働き方、面接・お仕事の流れ）",
  "summary": "一覧ページで表示される、記事の概要を2文程度で魅力的にまとめた紹介文",
  "author": {
    "name": "さくら または ひまり または ゆい などの女性サポートスタッフ名、またはマネージャー木村",
    "role": "女性サポートスタッフ（歴8年） または 採用担当マネージャー などの役職",
    "avatar": "👩‍💼 または 👩‍💻 または 👩"
  },
  "tags": ["関連するタグ名1", "タグ2", "タグ3"],
  "content": [
    {
      "type": "p",
      "text": "導入段落。読者の不安に共感し、本記事を読めば解決することを伝えます。"
    }
  ]
}`;

          const fetchResponse = await fetch("https://api.anthropic.com/v1/messages", {
            method: "POST",
            headers: {
              "x-api-key": apiKey,
              "anthropic-version": "2023-06-01",
              "content-type": "application/json"
            },
            body: JSON.stringify({
              model: "claude-3-5-sonnet-20241022",
              max_tokens: 4000,
              system: "You are a professional blog writer. Output strictly valid JSON conforming to the requested schema. Do not include any conversational filler.",
              messages: [
                {
                  role: "user",
                  content: `${singlePrompt}\n\n必ず、マークダウンのバッククォーツ記法( \`\`\`json と \`\`\` )で囲んだJSONを1つだけ出力してください。余計な前置きや説明は一切不要です。`
                }
              ]
            })
          });

          if (!fetchResponse.ok) {
            const errText = await fetchResponse.text();
            throw new Error(`Claude API returned status ${fetchResponse.status}: ${errText}`);
          }

          const claudeResult: any = await fetchResponse.json();
          const fullText = claudeResult.content?.[0]?.text || "";
          const jsonMatch = fullText.match(/```json\s*([\s\S]*?)\s*```/) || fullText.match(/\[\s*\{[\s\S]*\}\s*\]/) || fullText.match(/\{\s*[\s\S]*\}/);
          const blockText = jsonMatch ? (jsonMatch[1] || jsonMatch[0]) : fullText;
          try {
            const articleObj = JSON.parse(blockText.trim());
            if (Array.isArray(articleObj)) {
              parsedArticles.push(...articleObj);
            } else if (articleObj && typeof articleObj === "object") {
              parsedArticles.push(articleObj);
            }
          } catch (parseErr) {
            console.error(`Failed to parse Claude article JSON for index ${i}:`, parseErr);
          }
        }
      } else {
        // Default to Gemini
        const apiKey = process.env.GEMINI_API_KEY;
        if (!apiKey) {
          return res.status(500).json({ error: "Gemini APIキー(GEMINI_API_KEY)がサーバーに設定されていません。" });
        }

        const { GoogleGenAI, Type } = await import("@google/genai");
        const ai = new GoogleGenAI({ apiKey });

        for (let i = 0; i < numArticles; i++) {
          console.log(`[AI CMS] Generating article ${i + 1} of ${numArticles} via Gemini...`);
          
          const singlePrompt = `あなたは飛田新地の女性向けサポート＆求人サイト「飛田ガールズ」のプロの編集者です。
求職中の20代女性（未経験者が多い）が抱く、不安や疑問（身バレ対策、安全面、給料システム、実際の仕事の流れ、体入（体験入店）、生活・働き方など）を優しく丁寧に解消し、一歩踏み出す安心感を与える極めて高品質なコラム記事を日本語で作成してください。

今回は、全リクエストのうち「${i + 1}番目」のコラム記事を1件だけ生成してください。
${requestedCategory !== "all" ? `カテゴリーは必ず「${requestedCategory}」にしてください。` : "カテゴリーは 'beginner', 'salary', 'security', 'lifestyle', 'onboarding' の中から適したものを1つ選択してください。"}
${topicPrompt}

記事は、以下のJSONスキーマに従った完全な1つのオブジェクトである必要があります。

記事のコンテンツ（content配列）は、見出し（h2, h3）、本文（p）、リスト（list）、よくある質問（qna）、LINE誘導（cta）のブロックを複数組み合わせた、読み応えのある構成（合計文字数1000文字〜1500文字程度）にしてください。

JSONスキーマ：
{
  "title": "読者の目を惹く魅力的なコラムタイトル（30〜50文字程度。例：【身バレ防止】飛田新地で親や友達にバレずに働くための4つの鉄則）",
  "slug": "記事のタイトルを簡潔に英訳・ローマ字にし、半角小文字の英数字とハイフンのみで構成したURLスラッグ。末尾にランダムな文字列や日付は含めず、タイトルに即した意味のある英単語（3〜5単語程度）にしてください。（例：タイトルが「【身バレ防止】親や友達にバレずに働く4つの鉄則」なら「tobitashinchi-privacy-rules」や「work-without-revealing-identity」など）",
  "category": "'beginner' | 'salary' | 'security' | 'lifestyle' | 'onboarding' のいずれか1つ",
  "categoryLabel": "カテゴリーに応じた和名（例：未経験者向け、給与・待遇、安心・身バレ対策、生活・働き方、面接・お仕事の流れ）",
  "summary": "一覧ページで表示される、記事の概要を2文程度で魅力的にまとめた紹介文",
  "author": {
    "name": "さくら または ひまり または ゆい などの女性サポートスタッフ名、またはマネージャー木村",
    "role": "女性サポートスタッフ（歴8年） または 採用担当マネージャー などの役職",
    "avatar": "👩‍💼 または 👩‍💻 または 👩"
  },
  "tags": ["関連するタグ名1", "タグ2", "タグ3"],
  "content": [
    {
      "type": "p",
      "text": "導入段落。読者の不安に共感し、本記事を読めば解決することを伝えます。"
    },
    {
      "type": "h2",
      "text": "中見出しのタイトル"
    },
    {
      "type": "p",
      "text": "詳細な解説。安心できるトーンで具体的に説明します。"
    },
    {
      "type": "list",
      "items": [
        "リスト項目1",
        "リスト項目2",
        "リスト項目3"
      ]
    },
    {
      "type": "h3",
      "text": "小見出しのタイトル"
    },
    {
      "type": "p",
      "text": "より細分化した情報や豆知識。"
    },
    {
      "type": "qna",
      "question": "よくある質問の問い？",
      "answer": "丁寧で安心感に満ちた回答。"
    },
    {
      "type": "cta"
    }
  ]
}

注意点：
1. 違法な行為や危険な行為を推奨する内容は避け、安心・安全・健全なサポート環境であることを一貫して強調してください。
2. 日本の女の子が読んで自然で、温かみがあり、信頼できる言葉遣い（〜です、〜ます調）にしてください。
3. リスト(list)やQ&A(qna)ブロックを効果的に使い、視覚的に読みやすくしてください。
4. LINE誘導(cta)ブロックは、記事の中間か最後付近に1つ以上配置してください。ctaブロックは 'type': 'cta' のみで、'text' や 'items' などのキーは不要です。`;

          const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: `${singlePrompt}\n\n指定されたJSONスキーマに完全に従って日本語で1記事生成してください。`,
            config: {
              responseMimeType: "application/json",
              responseSchema: {
                type: Type.OBJECT,
                properties: {
                  title: { type: Type.STRING },
                  slug: { type: Type.STRING },
                  category: { type: Type.STRING },
                  categoryLabel: { type: Type.STRING },
                  summary: { type: Type.STRING },
                  author: {
                    type: Type.OBJECT,
                    properties: {
                      name: { type: Type.STRING },
                      role: { type: Type.STRING },
                      avatar: { type: Type.STRING }
                    },
                    required: ["name", "role", "avatar"]
                  },
                  tags: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING }
                  },
                  content: {
                    type: Type.ARRAY,
                    items: {
                      type: Type.OBJECT,
                      properties: {
                        type: { type: Type.STRING },
                        text: { type: Type.STRING },
                        items: {
                          type: Type.ARRAY,
                          items: { type: Type.STRING }
                        },
                        question: { type: Type.STRING },
                        answer: { type: Type.STRING }
                      },
                      required: ["type"]
                    }
                  }
                },
                required: ["title", "slug", "category", "categoryLabel", "summary", "author", "tags", "content"]
              }
            }
          });

          const generatedJsonText = response.text || "";
          try {
            const articleObj = JSON.parse(generatedJsonText.trim());
            if (Array.isArray(articleObj)) {
              parsedArticles.push(...articleObj);
            } else if (articleObj && typeof articleObj === "object") {
              parsedArticles.push(articleObj);
            }
          } catch (parseErr) {
            console.error(`Failed to parse Gemini article JSON for index ${i}:`, parseErr);
          }
        }
      }

      if (parsedArticles.length === 0) {
        throw new Error("コラム記事の自動生成またはJSON解析に失敗しました。1件も有効な記事が取得できませんでした。");
      }

      // Premium Illustration paths we found in /src/assets/images
      const premiumIllustrations = [
        "/src/assets/images/col_ill_age_looks_1783884287024.jpg",
        "/src/assets/images/col_ill_beauty_lifestyle_1783912347430.jpg",
        "/src/assets/images/col_ill_beginner_guide_1783884225541.jpg",
        "/src/assets/images/col_ill_cast_holiday_1783884322866.jpg",
        "/src/assets/images/col_ill_cherry_bloom_1783884503300.jpg",
        "/src/assets/images/col_ill_gold_bubble_1783913188809.jpg",
        "/src/assets/images/col_ill_housing_support_1783884256462.jpg",
        "/src/assets/images/col_ill_interview_guide_1783884267011.jpg",
        "/src/assets/images/col_ill_kimono_magic_1783884424450.jpg",
        "/src/assets/images/col_ill_kimono_makeup_1783884356215.jpg",
        "/src/assets/images/col_ill_makeup_vanity_1783884445492.jpg",
        "/src/assets/images/col_ill_mental_support_1783884376739.jpg",
        "/src/assets/images/col_ill_non_alcoholic_1783884312890.jpg",
        "/src/assets/images/col_ill_obachan_role_1783884412493.jpg",
        "/src/assets/images/col_ill_one_day_flow_1783884401530.jpg",
        "/src/assets/images/col_ill_privacy_guide_1783884246291.jpg",
        "/src/assets/images/col_ill_privacy_smart_1783884436471.jpg",
        "/src/assets/images/col_ill_relax_spa_1783884493332.jpg",
        "/src/assets/images/col_ill_safe_entrance_1783884460416.jpg",
        "/src/assets/images/col_ill_safety_security_1783884343829.jpg",
        "/src/assets/images/col_ill_salary_system_1783884234635.jpg",
        "/src/assets/images/col_ill_search_words_1783884385779.jpg",
        "/src/assets/images/col_ill_short_term_1783884332841.jpg",
        "/src/assets/images/col_ill_smart_planner_1783884470546.jpg",
        "/src/assets/images/col_ill_tax_guide_1783884296268.jpg",
        "/src/assets/images/col_ill_trial_guide_1783884277032.jpg",
        "/src/assets/images/col_ill_weekend_shift_1783884365752.jpg",
        "/src/assets/images/col_ill_welcome_gift_1783884481747.jpg"
      ];

      // Get highest numeric ID in current articles to continue sequence
      let maxId = 0;
      for (const art of memoryArticles) {
        const parsedId = parseInt(art.id, 10);
        if (!isNaN(parsedId) && parsedId > maxId) {
          maxId = parsedId;
        }
      }

      // Map and populate additional standard values on server side
      const todayStr = new Date().toISOString().split("T")[0];
      const existingSlugs = new Set(memoryArticles.map(art => (art.slug || "").toLowerCase()));

      const newlyGeneratedArticles = parsedArticles.map((art: any, index: number) => {
        const nextId = (maxId + index + 1).toString();
        
        // Count approximate characters for reading time
        const charCount = art.content ? JSON.stringify(art.content).length : 1200;
        const readTimeMinutes = Math.max(2, Math.ceil(charCount / 400));

        // Randomly pick an eyecatch from our real premium illustration set
        const randomEyeCatch = premiumIllustrations[Math.floor(Math.random() * premiumIllustrations.length)];

        const rawSlug = art.slug || "";
        const uniqueSlug = sanitizeAndDeduplicateSlug(rawSlug, art.title || "", existingSlugs);
        existingSlugs.add(uniqueSlug);

        return {
          id: nextId,
          title: art.title || "【新コラム】飛田新地での働き方コラム",
          slug: uniqueSlug,
          category: art.category || "beginner",
          categoryLabel: art.categoryLabel || "未経験者向け",
          publishedAt: todayStr,
          readTime: `${readTimeMinutes}分`,
          summary: art.summary || "AIによって自動生成された最新のコラム記事です。",
          eyeCatch: randomEyeCatch,
          author: {
            name: art.author?.name || "さくら",
            role: art.author?.role || "女性サポートスタッフ",
            avatar: art.author?.avatar || "👩‍💼"
          },
          content: art.content || [
            { type: "p", text: "準備中のコラムコンテンツです。" }
          ],
          tags: art.tags || ["AI自動生成", "未経験歓迎"]
        };
      });

      // Insert new articles at the beginning of list
      const mergedArticles = [...newlyGeneratedArticles, ...memoryArticles];
      memoryArticles = mergedArticles;

      if (isWritable) {
        try {
          fs.writeFileSync(ARTICLES_PATH, JSON.stringify(mergedArticles, null, 2), "utf-8");
          syncToGitHub();
        } catch (fileErr) {
          console.error("Non-fatal error writing auto-generated articles to file:", fileErr);
        }
      }

      return res.json({
        success: true,
        count: newlyGeneratedArticles.length,
        articles: newlyGeneratedArticles
      });

    } catch (e: any) {
      console.error("Error in generate-articles API:", e);
      return res.status(500).json({ error: e.message || "コラムの自動生成中にエラーが発生しました。" });
    }
  });

  // API: Get blog articles
  app.get("/api/cms/articles", (req, res) => {
    return res.json(memoryArticles);
  });

  // API: Save blog articles
  app.post("/api/cms/articles", checkAdminAuth, (req, res) => {
    try {
      const articles = req.body;
      memoryArticles = articles; // Always update in-memory cache

      if (isWritable) {
        try {
          fs.writeFileSync(ARTICLES_PATH, JSON.stringify(articles, null, 2), "utf-8");
          // Trigger automatic push to GitHub
          syncToGitHub();
        } catch (fileErr) {
          console.error("Non-fatal error writing articles to file:", fileErr);
          // Don't crash or return 500 since we updated the memory cache successfully!
        }
      }
      return res.json({ success: true, count: articles.length });
    } catch (e: any) {
      console.error("Error in POST articles:", e);
      return res.status(500).json({ error: e.message });
    }
  });

  // API: Get site content
  app.get("/api/cms/site", (req, res) => {
    return res.json(memorySiteContent);
  });

  // API: Save site content
  app.post("/api/cms/site", checkAdminAuth, (req, res) => {
    try {
      const siteContent = req.body;
      memorySiteContent = siteContent; // Always update in-memory cache

      if (isWritable) {
        try {
          fs.writeFileSync(SITE_CONTENT_PATH, JSON.stringify(siteContent, null, 2), "utf-8");
          // Trigger automatic push to GitHub
          syncToGitHub();
        } catch (fileErr) {
          console.error("Non-fatal error writing site content to file:", fileErr);
          // Don't crash or return 500 since we updated the memory cache successfully!
        }
      }
      return res.json({ success: true });
    } catch (e: any) {
      console.error("Error in POST site content:", e);
      return res.status(500).json({ error: e.message });
    }
  });

  // Vite middleware for development
  if (!isProd) {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer().catch((e) => {
  console.error("Failed to start server:", e);
});
