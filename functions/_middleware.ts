/**
 * Cloudflare Pages Middleware for AI Search Optimization (GEO / LLMO):
 * 1. Content Negotiation: Serves static .md versions when Accept prefers text/markdown (or ?format=md).
 * 2. Discovery Headers: Adds Link rel="alternate" (llms.txt & route .md) + Vary: Accept to HTML responses.
 * 3. Edge Bot Telemetry: Logs AI crawler / .md / llms.txt hits to Cloudflare Pages logs (zero UI impact).
 */

interface CfAssetsBinding {
  fetch: (input: RequestInfo | URL, init?: RequestInit) => Promise<Response>;
}

interface CfContext {
  request: Request;
  env: {
    ASSETS?: CfAssetsBinding;
  };
  next: () => Promise<Response>;
}

const DOMAIN = 'https://tobitashinchi-recruit.com';

const AI_BOT_PATTERN =
  /GPTBot|OAI-SearchBot|ChatGPT-User|PerplexityBot|Perplexity-User|ClaudeBot|Claude-User|Claude-SearchBot|Google-Extended|GoogleOther|Applebot-Extended|GrokBot|xAI-Grok|Meta-ExternalAgent|Amazonbot|Cohere-ai|DuckAssistBot|MistralAI-User|YouBot|DeepSeekBot|AI2Bot|CCBot/i;

function resolveMdPath(pathname: string): string {
  const normalized = pathname.replace(/\/+$/, '') || '/';
  if (normalized === '/' || normalized === '/index.html') {
    return '/index.md';
  }
  return `${normalized.replace(/\.html$/i, '')}.md`;
}

export async function onRequest(context: CfContext): Promise<Response> {
  const { request, env, next } = context;
  const url = new URL(request.url);
  const pathname = url.pathname;
  const userAgent = request.headers.get('user-agent') || '';
  const accept = (request.headers.get('accept') || '').toLowerCase();
  const isAiBot = AI_BOT_PATTERN.test(userAgent);

  // Skip static asset files except .md and llms*.txt
  const isMarkdownDirect = /\.md$/i.test(pathname);
  const isLlmsFile = pathname === '/llms.txt' || pathname === '/llms-full.txt';
  const isStaticAsset =
    pathname.startsWith('/assets/') ||
    pathname.startsWith('/images/') ||
    pathname.startsWith('/api/') ||
    /\.(png|jpe?g|gif|webp|svg|css|js|map|ico|woff2?|xml|json)$/i.test(pathname);

  if (isStaticAsset && !isMarkdownDirect && !isLlmsFile) {
    const assetResponse = await next();
    const assetCt = (assetResponse.headers.get('content-type') || '').toLowerCase();
    if (assetCt.includes('text/html')) {
      return new Response('Not Found', {
        status: 404,
        headers: {
          'Content-Type': 'text/plain; charset=utf-8',
          'Cache-Control': 'no-store',
        },
      });
    }
    return assetResponse;
  }

  if (isAiBot || isMarkdownDirect || isLlmsFile) {
    console.info(
      JSON.stringify({
        type: 'ai_crawl',
        path: pathname,
        ua: userAgent.slice(0, 120),
        acceptMarkdown: accept.includes('text/markdown'),
        referer: request.headers.get('referer') || '',
      })
    );
  }

  // Content Negotiation: Serve .md when client explicitly prefers text/markdown (or ?format=md)
  const formatParam = (url.searchParams.get('format') || '').toLowerCase();
  const wantsMarkdown =
    !isMarkdownDirect &&
    !isLlmsFile &&
    (formatParam === 'md' ||
      formatParam === 'markdown' ||
      (accept.includes('text/markdown') && !accept.includes('text/html')));

  if (wantsMarkdown && env.ASSETS) {
    const mdPath = resolveMdPath(pathname);
    try {
      const mdUrl = new URL(mdPath, url.origin);
      const mdRes = await env.ASSETS.fetch(new Request(mdUrl.toString(), { method: 'GET' }));
      if (mdRes.ok) {
        const headers = new Headers(mdRes.headers);
        headers.set('Content-Type', 'text/markdown; charset=utf-8');
        headers.set('Vary', 'Accept');
        headers.set('X-Robots-Tag', 'noindex, follow');
        headers.set('X-AI-Content-Negotiation', 'markdown');
        const canonicalPath = pathname === '/' ? '/' : pathname.replace(/\/+$/, '');
        headers.set(
          'Link',
          `<${DOMAIN}${canonicalPath}>; rel="canonical", <${DOMAIN}/llms.txt>; rel="alternate"; type="text/markdown"`
        );
        return new Response(mdRes.body, { status: 200, headers });
      }
    } catch {
      // Fallback to normal HTML response
    }
  }

  const response = await next();
  const contentType = (response.headers.get('content-type') || '').toLowerCase();

  if (contentType.includes('text/html') && response.status === 200) {
    const headers = new Headers(response.headers);
    headers.append('Vary', 'Accept');
    const mdPath = resolveMdPath(pathname);
    if (!headers.has('Link')) {
      headers.set(
        'Link',
        `<${DOMAIN}${mdPath}>; rel="alternate"; type="text/markdown", <${DOMAIN}/llms.txt>; rel="alternate"; type="text/markdown"`
      );
    }
    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers,
    });
  }

  return response;
}
