/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

let initialHomeJsonLdText: string | null = null;

const LEGACY_SCHEMA_IDS = [
  'cluster-schema',
  'flow-schema',
  'beginner-schema',
  'experienced-schema',
  'comparison-schema',
];

const FALLBACK_HOME_JSON_LD = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': 'https://tobitashinchi-recruit.com/#website',
      url: 'https://tobitashinchi-recruit.com/',
      name: '飛田ガールズ',
      description: '飛田新地の女性向け求人情報サイト。未経験歓迎・高収入（日給5万〜10万円即日全額日払い）、仕事内容・給与・寮・安全対策を網羅。',
      inLanguage: 'ja-JP',
    },
    {
      '@type': 'WebPage',
      '@id': 'https://tobitashinchi-recruit.com/#webpage',
      url: 'https://tobitashinchi-recruit.com/',
      name: '飛田新地求人｜未経験歓迎・高収入・求人情報を徹底解説｜飛田ガールズ',
      description: '【飛田新地求人公式】飛田新地で働いてみたい未経験の女性へ。仕事内容や給料の仕組み（即日日払い）、応募条件、面接・体験入店の流れ、お店選びや身バレ対策まで詳しく解説。24時間LINEで無料相談受付中です。',
      isPartOf: {
        '@id': 'https://tobitashinchi-recruit.com/#website',
      },
      speakable: {
        '@type': 'SpeakableSpecification',
        cssSelector: [
          '#hero-title',
          '#hero-description',
          '#recruit-hub',
          '#reasons',
          '#voice',
          '#flow',
        ],
      },
    },
    {
      '@type': 'Organization',
      '@id': 'https://tobitashinchi-recruit.com/#organization',
      name: '飛田ガールズ（料亭直営求人・女性採用サポート）',
      url: 'https://tobitashinchi-recruit.com/',
      logo: {
        '@type': 'ImageObject',
        url: 'https://tobitashinchi-recruit.com/favicon.svg',
      },
    },
  ],
};

export function captureInitialHomeJsonLd() {
  if (typeof document === 'undefined' || typeof window === 'undefined') return;
  if (window.location.pathname === '/' || window.location.pathname === '') {
    const existing = document.getElementById('seo-jsonld');
    if (existing && existing.textContent && !initialHomeJsonLdText) {
      initialHomeJsonLdText = existing.textContent;
    }
  }
}

export function updatePageJsonLd(schemaData: Record<string, any>) {
  if (typeof document === 'undefined') return;
  try {
    for (const id of LEGACY_SCHEMA_IDS) {
      const legacy = document.getElementById(id);
      if (legacy) legacy.remove();
    }

    let script = document.getElementById('seo-jsonld') as HTMLScriptElement | null;
    if (!script) {
      const firstJsonLd = document.querySelector('script[type="application/ld+json"]') as HTMLScriptElement | null;
      if (firstJsonLd && firstJsonLd.id !== 'article-jsonld') {
        script = firstJsonLd;
        script.id = 'seo-jsonld';
      } else {
        script = document.createElement('script');
        script.id = 'seo-jsonld';
        script.type = 'application/ld+json';
        document.head.appendChild(script);
      }
    }

    script.textContent = JSON.stringify(schemaData);
  } catch (err) {
    console.error('Failed to update #seo-jsonld:', err);
  }
}

export function restoreHomeJsonLd() {
  if (typeof document === 'undefined') return;
  if (initialHomeJsonLdText) {
    for (const id of LEGACY_SCHEMA_IDS) {
      const legacy = document.getElementById(id);
      if (legacy) legacy.remove();
    }
    let script = document.getElementById('seo-jsonld') as HTMLScriptElement | null;
    if (!script) {
      script = document.createElement('script');
      script.id = 'seo-jsonld';
      script.type = 'application/ld+json';
      document.head.appendChild(script);
    }
    script.textContent = initialHomeJsonLdText;
    return;
  }
  updatePageJsonLd(FALLBACK_HOME_JSON_LD);
}
