/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

const fs = require('fs');
const path = require('path');

const HOST = 'tobitashinchi-recruit.com';
const DOMAIN = `https://${HOST}`;
const STABLE_UPDATED_LASTMOD = '2026-11-22';
const DEFAULT_STATIC_LASTMOD = '2026-11-22';

function formatLastMod(dateStr) {
  if (!dateStr || typeof dateStr !== 'string') return DEFAULT_STATIC_LASTMOD;
  const normalized = dateStr.replace(/\./g, '-').trim();
  if (/^\d{4}-\d{2}-\d{2}$/.test(normalized)) {
    return normalized;
  }
  return DEFAULT_STATIC_LASTMOD;
}

// Load blog articles
const articlesPath = path.join(__dirname, '..', 'data', 'blogArticles.json');
let articles = [];
if (fs.existsSync(articlesPath)) {
  try {
    articles = JSON.parse(fs.readFileSync(articlesPath, 'utf-8'));
  } catch (e) {
    console.error('Failed to parse blogArticles.json:', e);
  }
}

function escapeXml(str) {
  return String(str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

const staticRoutes = [
  { path: '', priority: '1.0', freq: 'daily', lastmod: STABLE_UPDATED_LASTMOD, img: '/images/home_hero_ryotei_1795337037663.jpg', title: '飛田新地求人｜飛田ガールズ【公式・料亭直営の女性採用窓口】' },
  { path: '/about', priority: '0.8', freq: 'weekly', lastmod: DEFAULT_STATIC_LASTMOD, img: '/images/col_beginner_guide_art_1787803245812.jpg', title: '運営者情報・店舗体制' },
  { path: '/glossary', priority: '0.85', freq: 'weekly', lastmod: DEFAULT_STATIC_LASTMOD, img: '/images/col_beginner_guide_art_1787803245812.jpg', title: '飛田新地 用語集・用語辞典' },
  { path: '/site-compare', priority: '0.9', freq: 'weekly', lastmod: DEFAULT_STATIC_LASTMOD, img: '/images/col_beginner_guide_art_1787803245812.jpg', title: '飛田新地と他業種の違いを比較｜他業種・応募方法比較｜飛田ガールズ' },
  { path: '/compare', priority: '0.9', freq: 'weekly', lastmod: STABLE_UPDATED_LASTMOD, img: '/images/col_beginner_guide_art_1787803245812.jpg', title: '働き方・条件別の応募ガイド｜飛田ガールズ' },
  { path: '/compare/beginner', priority: '0.85', freq: 'weekly', lastmod: STABLE_UPDATED_LASTMOD, img: '/images/tobita_beginner_support_1788153037569.jpg', title: '【未経験向け】飛田新地での働き方' },
  { path: '/compare/experienced', priority: '0.85', freq: 'weekly', lastmod: STABLE_UPDATED_LASTMOD, img: '/images/tobita_experienced_cast_1792411797671.jpg', title: '【経験者・移籍向け】飛田新地での働き方' },
  { path: '/compare/20s', priority: '0.85', freq: 'weekly', lastmod: STABLE_UPDATED_LASTMOD, img: '/images/tobita_experienced_cast_1792411797671.jpg', title: '【20代女性向け】飛田新地の働き方' },
  { path: '/compare/30s', priority: '0.85', freq: 'weekly', lastmod: STABLE_UPDATED_LASTMOD, img: '/images/tobita_job_guide_tea_1788153000519.jpg', title: '【30代女性向け】飛田新地の働き方' },
  { path: '/compare/40s', priority: '0.85', freq: 'weekly', lastmod: STABLE_UPDATED_LASTMOD, img: '/images/tobita_job_guide_tea_1788153000519.jpg', title: '【40代女性向け】飛田新地の働き方' },
  { path: '/compare/high-income', priority: '0.85', freq: 'weekly', lastmod: STABLE_UPDATED_LASTMOD, img: '/images/tobita_salary_calculator_1788153012478.jpg', title: '【高収入を目指したい方へ】飛田新地の報酬システム' },
  { path: '/compare/one-day-week', priority: '0.85', freq: 'weekly', lastmod: STABLE_UPDATED_LASTMOD, img: '/images/tobita_shift_schedule_1788153063163.jpg', title: '【週1日〜勤務】飛田新地の自由シフト' },
  { path: '/compare/short-term', priority: '0.85', freq: 'weekly', lastmod: STABLE_UPDATED_LASTMOD, img: '/images/tobita_trial_interview_1788153091611.jpg', title: '【短期・出稼ぎ】飛田新地の期間集中ワーク' },
  { path: '/compare/student', priority: '0.85', freq: 'weekly', lastmod: STABLE_UPDATED_LASTMOD, img: '/images/tobita_wwork_privacy_1788153051081.jpg', title: '【学生向け（20歳以上）】飛田新地のバイト事情' },
  { path: '/compare/office-worker', priority: '0.85', freq: 'weekly', lastmod: STABLE_UPDATED_LASTMOD, img: '/images/tobita_wwork_privacy_1788153051081.jpg', title: '【会社員・OLのWワーク】飛田新地の副業対策' },
  { path: '/compare/housewife', priority: '0.85', freq: 'weekly', lastmod: STABLE_UPDATED_LASTMOD, img: '/images/tobita_wwork_privacy_1788153051081.jpg', title: '【主婦向け】飛田新地の昼間シフト' },
  { path: '/faq', priority: '0.85', freq: 'weekly', lastmod: STABLE_UPDATED_LASTMOD, img: '/images/col_beginner_guide_art_1787803245812.jpg', title: '飛田新地のよくある質問｜全119問' },
  { path: '/faq/qualification', priority: '0.75', freq: 'weekly', lastmod: DEFAULT_STATIC_LASTMOD, img: '/images/col_beginner_guide_art_1787803245812.jpg', title: '応募条件・年齢・資格に関するFAQ' },
  { path: '/faq/beginner', priority: '0.75', freq: 'weekly', lastmod: DEFAULT_STATIC_LASTMOD, img: '/images/col_beginner_guide_art_1787803245812.jpg', title: '未経験・初心者向けFAQ' },
  { path: '/faq/experienced', priority: '0.75', freq: 'weekly', lastmod: DEFAULT_STATIC_LASTMOD, img: '/images/col_beginner_guide_art_1787803245812.jpg', title: '経験者・移籍・他業種比較FAQ' },
  { path: '/faq/job', priority: '0.75', freq: 'weekly', lastmod: DEFAULT_STATIC_LASTMOD, img: '/images/col_beginner_guide_art_1787803245812.jpg', title: '仕事内容・接客に関するFAQ' },
  { path: '/faq/salary', priority: '0.75', freq: 'weekly', lastmod: DEFAULT_STATIC_LASTMOD, img: '/images/col_beginner_guide_art_1787803245812.jpg', title: '飛田新地の給料・日払いに関するFAQ' },
  { path: '/faq/hours', priority: '0.75', freq: 'weekly', lastmod: DEFAULT_STATIC_LASTMOD, img: '/images/col_beginner_guide_art_1787803245812.jpg', title: '出勤・シフト・営業時間に関するFAQ' },
  { path: '/faq/interview', priority: '0.75', freq: 'weekly', lastmod: DEFAULT_STATIC_LASTMOD, img: '/images/col_beginner_guide_art_1787803245812.jpg', title: '面接・体験入店・応募方法に関するFAQ' },
  { path: '/faq/privacy', priority: '0.75', freq: 'weekly', lastmod: DEFAULT_STATIC_LASTMOD, img: '/images/col_beginner_guide_art_1787803245812.jpg', title: '身バレ対策・プライバシー・税金に関するFAQ' },
  { path: '/faq/environment', priority: '0.75', freq: 'weekly', lastmod: DEFAULT_STATIC_LASTMOD, img: '/images/col_beginner_guide_art_1787803245812.jpg', title: '店舗環境・設備・寮・人間関係に関するFAQ' },
  { path: '/faq/access', priority: '0.75', freq: 'weekly', lastmod: DEFAULT_STATIC_LASTMOD, img: '/images/col_beginner_guide_art_1787803245812.jpg', title: 'アクセス・場所・送迎・交通費に関するFAQ' },
  { path: '/faq/sidejob', priority: '0.75', freq: 'weekly', lastmod: DEFAULT_STATIC_LASTMOD, img: '/images/col_beginner_guide_art_1787803245812.jpg', title: '副業・Wワーク・掛け持ちに関するFAQ' },
  { path: '/faq/support', priority: '0.75', freq: 'weekly', lastmod: DEFAULT_STATIC_LASTMOD, img: '/images/col_beginner_guide_art_1787803245812.jpg', title: '不安・トラブル・退店・相談に関するFAQ' },
  { path: '/blog', priority: '0.85', freq: 'weekly', lastmod: STABLE_UPDATED_LASTMOD, img: '/images/col_beginner_guide_art_1787803245812.jpg', title: '飛田新地お仕事コラム一覧' },
  { path: '/job', priority: '0.85', freq: 'weekly', lastmod: STABLE_UPDATED_LASTMOD, img: '/images/tobita_job_guide_tea_1788153000519.jpg', title: '飛田新地の仕事内容・1日の流れ' },
  { path: '/salary', priority: '0.85', freq: 'weekly', lastmod: DEFAULT_STATIC_LASTMOD, img: '/images/tobita_salary_calculator_1788153012478.jpg', title: '飛田新地の給料・報酬システムと即日日払い' },
  { path: '/beginner', priority: '0.85', freq: 'weekly', lastmod: STABLE_UPDATED_LASTMOD, img: '/images/tobita_beginner_support_1788153037569.jpg', title: '未経験スタート完全マニュアル' },
  { path: '/experienced', priority: '0.85', freq: 'weekly', lastmod: STABLE_UPDATED_LASTMOD, img: '/images/experienced_hero_woman_1794551773329.jpg', title: '飛田新地への移籍・経験者向け案内' },
  { path: '/requirements', priority: '0.85', freq: 'weekly', lastmod: STABLE_UPDATED_LASTMOD, img: '/images/tobita_interview_flow_1788153075249.jpg', title: '飛田新地の募集要項と応募条件' },
  { path: '/flow', priority: '0.85', freq: 'weekly', lastmod: DEFAULT_STATIC_LASTMOD, img: '/images/tobita_trial_interview_1788153091611.jpg', title: '面接・体験入店の流れ' },
  { path: '/workstyle', priority: '0.85', freq: 'weekly', lastmod: DEFAULT_STATIC_LASTMOD, img: '/images/workstyle_hero_morning_1794549297942.jpg', title: '飛田新地の勤務時間・シフト・働き方｜飛田ガールズ' },
  { path: '/shops', priority: '0.85', freq: 'weekly', lastmod: DEFAULT_STATIC_LASTMOD, img: '/images/shops_hero_street_1794559557935.jpg', title: '飛田新地のお店選びガイド｜通りの特徴・見分け方｜飛田ガールズ' },
  { path: '/dekasegi', priority: '0.85', freq: 'weekly', lastmod: STABLE_UPDATED_LASTMOD, img: '/images/tobita_luxury_room_1788153103866.jpg', title: '飛田新地の個室寮完備・地方出稼ぎサポート' },
  { path: '/safety', priority: '0.85', freq: 'weekly', lastmod: STABLE_UPDATED_LASTMOD, img: '/images/tobita_wwork_privacy_1788153051081.jpg', title: '飛田新地の身バレ対策と安心の防犯体制' },
];

let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
`;

// Add static routes with image extensions
for (const r of staticRoutes) {
  const locUrl = r.path === '' ? `${DOMAIN}/` : `${DOMAIN}${r.path}`;
  xml += `  <url>
    <loc>${locUrl}</loc>
    <lastmod>${r.lastmod}</lastmod>
    <changefreq>${r.freq}</changefreq>
    <priority>${r.priority}</priority>
    <image:image>
      <image:loc>${DOMAIN}${r.img}</image:loc>
      <image:title>${escapeXml(r.title)}</image:title>
    </image:image>
  </url>
`;
}

// Add all indexable blog articles with accurate publishedAt/updatedAt lastmod (exclude seoNoindex thin/off-topic articles)
const indexableArticles = articles.filter((a) => a && a.slug && !a.seoNoindex);
for (const a of indexableArticles) {
  const imgUrl = a.eyeCatch && a.eyeCatch.startsWith('http') 
    ? a.eyeCatch 
    : `${DOMAIN}${a.eyeCatch || '/images/col_beginner_guide_art_1787803245812.jpg'}`;
  const articleLastMod = formatLastMod(a.updatedAt || a.publishedAt);

  xml += `  <url>
    <loc>${DOMAIN}/blog/${a.slug}</loc>
    <lastmod>${articleLastMod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
    <image:image>
      <image:loc>${imgUrl}</image:loc>
      <image:title>${escapeXml(a.title)}</image:title>
    </image:image>
  </url>
`;
}

xml += `</urlset>\n`;

const sitemapPath = path.join(__dirname, '..', 'public', 'sitemap.xml');
fs.writeFileSync(sitemapPath, xml, 'utf-8');
console.log(`[Image Sitemap] Successfully generated ${sitemapPath} with ${staticRoutes.length + indexableArticles.length} URLs including image tags (excluded ${articles.length - indexableArticles.length} noindex articles)!`);
