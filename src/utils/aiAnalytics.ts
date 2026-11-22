/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

const AI_REFERRER_SOURCES: Array<{ pattern: RegExp; name: string }> = [
  { pattern: /(^|\.)chatgpt\.com$/i, name: 'ChatGPT' },
  { pattern: /(^|\.)chat\.openai\.com$/i, name: 'ChatGPT' },
  { pattern: /(^|\.)perplexity\.ai$/i, name: 'Perplexity' },
  { pattern: /(^|\.)claude\.ai$/i, name: 'Claude' },
  { pattern: /(^|\.)gemini\.google\.com$/i, name: 'Gemini' },
  { pattern: /(^|\.)bard\.google\.com$/i, name: 'Gemini' },
  { pattern: /(^|\.)copilot\.microsoft\.com$/i, name: 'Copilot' },
  { pattern: /(^|\.)you\.com$/i, name: 'You.com' },
  { pattern: /(^|\.)grok\.com$/i, name: 'Grok' },
  { pattern: /(^|\.)x\.ai$/i, name: 'Grok' },
  { pattern: /(^|\.)phind\.com$/i, name: 'Phind' },
  { pattern: /(^|\.)kagi\.com$/i, name: 'Kagi' },
];

const SESSION_KEY = 'tobita_ai_referral_v1';

export interface AiReferralAttribution {
  source: string;
  referrerHost: string;
  utmSource: string | null;
  landingPath: string;
  detectedAt: string;
}

export function detectAiSearchReferral(): AiReferralAttribution | null {
  if (typeof window === 'undefined' || typeof document === 'undefined') return null;

  try {
    const searchParams = new URLSearchParams(window.location.search);
    const utmSource = searchParams.get('utm_source');
    const referrerStr = document.referrer || '';

    let referrerHost = '';
    if (referrerStr) {
      try {
        referrerHost = new URL(referrerStr).hostname;
      } catch {
        referrerHost = '';
      }
    }

    let matchedSource = '';

    if (referrerHost) {
      const hit = AI_REFERRER_SOURCES.find((item) => item.pattern.test(referrerHost));
      if (hit) matchedSource = hit.name;
    }

    if (!matchedSource && utmSource) {
      const normalizedUtm = utmSource.toLowerCase();
      const utmHit = AI_REFERRER_SOURCES.find(
        (item) => item.pattern.test(normalizedUtm) || normalizedUtm.includes(item.name.toLowerCase())
      );
      if (utmHit) matchedSource = utmHit.name;
    }

    if (!matchedSource) return null;

    return {
      source: matchedSource,
      referrerHost: referrerHost || utmSource || matchedSource,
      utmSource,
      landingPath: window.location.pathname,
      detectedAt: new Date().toISOString(),
    };
  } catch {
    return null;
  }
}

export function trackAiSearchReferral(): void {
  if (typeof window === 'undefined') return;

  try {
    if (window.sessionStorage.getItem(SESSION_KEY)) return;

    const attribution = detectAiSearchReferral();
    if (!attribution) return;

    window.sessionStorage.setItem(SESSION_KEY, JSON.stringify(attribution));

    const w = window as any;
    if (Array.isArray(w.dataLayer)) {
      w.dataLayer.push({
        event: 'ai_search_referral',
        ai_source: attribution.source,
        ai_referrer_host: attribution.referrerHost,
        ai_landing_path: attribution.landingPath,
      });
    }

    if (typeof w.gtag === 'function') {
      w.gtag('event', 'ai_search_referral', {
        event_category: 'AI Search',
        event_label: attribution.source,
        ai_source: attribution.source,
        landing_path: attribution.landingPath,
      });
    }
  } catch {
    // Non-blocking analytics
  }
}

export function trackAiSearchPageView(pagePath: string): void {
  if (typeof window === 'undefined') return;
  try {
    const raw = window.sessionStorage.getItem(SESSION_KEY);
    if (!raw) return;
    const attribution = JSON.parse(raw) as AiReferralAttribution;
    const w = window as any;
    if (Array.isArray(w.dataLayer)) {
      w.dataLayer.push({
        event: 'ai_search_pageview',
        ai_source: attribution.source,
        page_path: pagePath,
      });
    }
  } catch {
    // Non-blocking
  }
}
