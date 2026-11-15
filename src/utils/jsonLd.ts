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
      alternateName: ['飛田ガールズ公式', 'Tobita Girls'],
      description: '飛田新地の女性向け求人情報サイト。仕事内容や給料の仕組み（完全歩合制・売上50%バック即日日払い）、応募条件、面接・体験入店の流れ、身バレ対策を網羅。',
      inLanguage: 'ja-JP',
    },
    {
      '@type': 'WebPage',
      '@id': 'https://tobitashinchi-recruit.com/#webpage',
      url: 'https://tobitashinchi-recruit.com/',
      name: '飛田新地求人｜飛田ガールズ【公式・料亭直営】',
      description: '飛田新地で働くか迷っている女性へ。飛田ガールズは料亭直営の求人案内サイトです。仕事内容や接客方法、給料・全額日払いの仕組み、応募条件、身バレ対策まで詳しく解説。未経験の方も経験者の方も、応募前に知っておきたい情報を分かりやすく紹介しています。',
      isPartOf: {
        '@id': 'https://tobitashinchi-recruit.com/#website',
      },
      primaryImageOfPage: {
        '@type': 'ImageObject',
        url: 'https://tobitashinchi-recruit.com/images/tobita_dream_hero_banner_1782557055526.jpg',
        width: 1376,
        height: 768,
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
      sameAs: ['https://tobitashinchi-recruit.com/'],
      publishingPrinciples: 'https://tobitashinchi-recruit.com/about',
      areaServed: '大阪府大阪市',
      knowsAbout: [
        '飛田新地の仕事内容・接客ルール',
        '料亭直営の女性向け求人案内',
        '売上50%バック・全額日払いの仕組み',
        '身バレ対策・プライバシー配慮',
        '未経験・地方出稼ぎのサポート体制',
      ],
      address: {
        '@type': 'PostalAddress',
        streetAddress: '山王3丁目',
        addressLocality: '大阪市西成区',
        addressRegion: '大阪府',
        postalCode: '557-0001',
        addressCountry: 'JP',
      },
      logo: {
        '@type': 'ImageObject',
        url: 'https://tobitashinchi-recruit.com/icon.png',
        width: 384,
        height: 384,
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
