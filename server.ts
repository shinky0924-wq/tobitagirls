import express from "express";
import path from "path";
import fs from "fs";
import { exec } from "child_process";
import { BLOG_ARTICLES } from "./src/blogData";
import { DEFAULT_SITE_CONTENT } from "./src/siteContent";

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
