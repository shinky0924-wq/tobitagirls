/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

const fs = require('fs');
const path = require('path');

const HOST = 'tobitashinchi-recruit.com';
const DOMAIN = `https://${HOST}`;
const TODAY = new Date().toISOString().split('T')[0];
const DEFAULT_STATIC_LASTMOD = '2026-11-15';

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
  { path: '', priority: '1.0', freq: 'daily', lastmod: TODAY, img: '/images/tobita_dream_hero_banner_1782557055526.jpg', title: '飛田新地求人｜飛田ガールズ【公式・料亭直営】' },
  { path: '/about', priority: '0.8', freq: 'weekly', lastmod: DEFAULT_STATIC_LASTMOD, img: '/images/col_beginner_guide_art_1787803245812.jpg', title: '運営者情報・店舗体制' },
  { path: '/glossary', priority: '0.85', freq: 'weekly', lastmod: DEFAULT_STATIC_LASTMOD, img: '/images/col_beginner_guide_art_1787803245812.jpg', title: '飛田新地 用語集・用語辞典' },
  { path: '/site-compare', priority: '0.9', freq: 'daily', lastmod: TODAY, img: '/images/col_beginner_guide_art_1787803245812.jpg', title: '飛田新地と他業種の違いを比較｜メンズエステ・ソープ・デリヘル・応募方法も解説' },
  { path: '/compare', priority: '0.9', freq: 'daily', lastmod: TODAY, img: '/images/col_beginner_guide_art_1787803245812.jpg', title: '飛田新地求人｜働き方・求人比較' },
  { path: '/compare/beginner', priority: '0.85', freq: 'weekly', lastmod: TODAY, img: '/images/tobita_beginner_support_1788153037569.jpg', title: '未経験からの飛田新地求人' },
  { path: '/compare/experienced', priority: '0.85', freq: 'weekly', lastmod: TODAY, img: '/images/tobita_experienced_cast_1792411797671.jpg', title: '経験者・移籍向け飛田新地求人' },
  { path: '/compare/20s', priority: '0.85', freq: 'weekly', lastmod: TODAY, img: '/images/tobita_experienced_cast_1792411797671.jpg', title: '20代の飛田新地求人' },
  { path: '/compare/30s', priority: '0.85', freq: 'weekly', lastmod: TODAY, img: '/images/tobita_job_guide_tea_1788153000519.jpg', title: '30代の飛田新地求人' },
  { path: '/compare/40s', priority: '0.85', freq: 'weekly', lastmod: TODAY, img: '/images/tobita_job_guide_tea_1788153000519.jpg', title: '40代の飛田新地求人' },
  { path: '/compare/high-income', priority: '0.85', freq: 'weekly', lastmod: TODAY, img: '/images/tobita_salary_calculator_1788153012478.jpg', title: '高収入を目指したい方の飛田新地求人' },
  { path: '/compare/savings', priority: '0.85', freq: 'weekly', lastmod: TODAY, img: '/images/tobita_salary_calculator_1788153012478.jpg', title: '貯金したい方の飛田新地求人' },
  { path: '/compare/living-expenses', priority: '0.85', freq: 'weekly', lastmod: TODAY, img: '/images/tobita_salary_calculator_1788153012478.jpg', title: '生活費を補いたい方の飛田新地求人' },
  { path: '/compare/target-income', priority: '0.85', freq: 'weekly', lastmod: TODAY, img: '/images/tobita_salary_calculator_1788153012478.jpg', title: '目標金額がある方の飛田新地求人' },
  { path: '/compare/one-day-week', priority: '0.85', freq: 'weekly', lastmod: TODAY, img: '/images/tobita_shift_schedule_1788153063163.jpg', title: '週1日〜働ける飛田新地求人' },
  { path: '/compare/short-time', priority: '0.85', freq: 'weekly', lastmod: TODAY, img: '/images/tobita_shift_schedule_1788153063163.jpg', title: '短時間勤務の飛田新地求人' },
  { path: '/compare/daytime', priority: '0.85', freq: 'weekly', lastmod: TODAY, img: '/images/tobita_shift_schedule_1788153063163.jpg', title: '昼間勤務の飛田新地求人' },
  { path: '/compare/nighttime', priority: '0.85', freq: 'weekly', lastmod: TODAY, img: '/images/tobita_shift_schedule_1788153063163.jpg', title: '夜間勤務の飛田新地求人' },
  { path: '/compare/weekends', priority: '0.85', freq: 'weekly', lastmod: TODAY, img: '/images/tobita_shift_schedule_1788153063163.jpg', title: '土日祝のみの飛田新地求人' },
  { path: '/compare/regular', priority: '0.85', freq: 'weekly', lastmod: TODAY, img: '/images/tobita_shift_schedule_1788153063163.jpg', title: 'レギュラー勤務の飛田新地求人' },
  { path: '/compare/short-term', priority: '0.85', freq: 'weekly', lastmod: TODAY, img: '/images/tobita_trial_interview_1788153091611.jpg', title: '短期・出稼ぎの飛田新地求人' },
  { path: '/compare/student', priority: '0.85', freq: 'weekly', lastmod: TODAY, img: '/images/tobita_wwork_privacy_1788153051081.jpg', title: '学生向けの飛田新地求人' },
  { path: '/compare/office-worker', priority: '0.85', freq: 'weekly', lastmod: TODAY, img: '/images/tobita_wwork_privacy_1788153051081.jpg', title: '会社員・Wワークの飛田新地求人' },
  { path: '/compare/freeter', priority: '0.85', freq: 'weekly', lastmod: TODAY, img: '/images/tobita_shift_schedule_1788153063163.jpg', title: 'フリーター向けの飛田新地求人' },
  { path: '/compare/housewife', priority: '0.85', freq: 'weekly', lastmod: TODAY, img: '/images/tobita_wwork_privacy_1788153051081.jpg', title: '主婦向けの飛田新地求人' },
  { path: '/compare/parenting', priority: '0.85', freq: 'weekly', lastmod: TODAY, img: '/images/tobita_wwork_privacy_1788153051081.jpg', title: '子育て中の方向け飛田新地求人' },
  { path: '/compare/self-employed', priority: '0.85', freq: 'weekly', lastmod: TODAY, img: '/images/tobita_wwork_privacy_1788153051081.jpg', title: '自営業の方の飛田新地求人' },
  { path: '/compare/privacy', priority: '0.85', freq: 'weekly', lastmod: TODAY, img: '/images/tobita_wwork_privacy_1788153051081.jpg', title: '身バレ対策重視の飛田新地求人' },
  { path: '/compare/customer-service-anxiety', priority: '0.85', freq: 'weekly', lastmod: TODAY, img: '/images/tobita_beginner_support_1788153037569.jpg', title: '接客が不安な方向け飛田新地求人' },
  { path: '/compare/returning', priority: '0.85', freq: 'weekly', lastmod: TODAY, img: '/images/tobita_beginner_support_1788153037569.jpg', title: 'ブランクありの方の飛田新地求人' },
  { path: '/compare/transfer', priority: '0.85', freq: 'weekly', lastmod: TODAY, img: '/images/tobita_experienced_cast_1792411797671.jpg', title: '他店から移籍向け飛田新地求人' },
  { path: '/compare/consultation', priority: '0.85', freq: 'weekly', lastmod: TODAY, img: '/images/tobita_trial_interview_1788153091611.jpg', title: '相談から始めたい方向け飛田新地求人' },
  { path: '/faq', priority: '0.85', freq: 'daily', lastmod: DEFAULT_STATIC_LASTMOD, img: '/images/col_beginner_guide_art_1787803245812.jpg', title: '飛田新地求人FAQ｜よくある質問（119問）' },
  { path: '/faq/qualification', priority: '0.75', freq: 'weekly', lastmod: DEFAULT_STATIC_LASTMOD, img: '/images/col_beginner_guide_art_1787803245812.jpg', title: '応募条件・年齢・資格に関するFAQ' },
  { path: '/faq/beginner', priority: '0.75', freq: 'weekly', lastmod: DEFAULT_STATIC_LASTMOD, img: '/images/col_beginner_guide_art_1787803245812.jpg', title: '未経験・初心者向けFAQ' },
  { path: '/faq/experienced', priority: '0.75', freq: 'weekly', lastmod: DEFAULT_STATIC_LASTMOD, img: '/images/col_beginner_guide_art_1787803245812.jpg', title: '経験者・移籍・他業種比較FAQ' },
  { path: '/faq/job', priority: '0.75', freq: 'weekly', lastmod: DEFAULT_STATIC_LASTMOD, img: '/images/col_beginner_guide_art_1787803245812.jpg', title: '仕事内容・接客に関するFAQ' },
  { path: '/faq/salary', priority: '0.75', freq: 'weekly', lastmod: DEFAULT_STATIC_LASTMOD, img: '/images/col_beginner_guide_art_1787803245812.jpg', title: '給料・日払い・費用に関するFAQ' },
  { path: '/faq/hours', priority: '0.75', freq: 'weekly', lastmod: DEFAULT_STATIC_LASTMOD, img: '/images/col_beginner_guide_art_1787803245812.jpg', title: '出勤・シフト・営業時間に関するFAQ' },
  { path: '/faq/interview', priority: '0.75', freq: 'weekly', lastmod: DEFAULT_STATIC_LASTMOD, img: '/images/col_beginner_guide_art_1787803245812.jpg', title: '面接・体験入店・応募方法に関するFAQ' },
  { path: '/faq/privacy', priority: '0.75', freq: 'weekly', lastmod: DEFAULT_STATIC_LASTMOD, img: '/images/col_beginner_guide_art_1787803245812.jpg', title: '身バレ対策・プライバシー・税金に関するFAQ' },
  { path: '/faq/environment', priority: '0.75', freq: 'weekly', lastmod: DEFAULT_STATIC_LASTMOD, img: '/images/col_beginner_guide_art_1787803245812.jpg', title: '店舗環境・設備・寮・人間関係に関するFAQ' },
  { path: '/faq/access', priority: '0.75', freq: 'weekly', lastmod: DEFAULT_STATIC_LASTMOD, img: '/images/col_beginner_guide_art_1787803245812.jpg', title: 'アクセス・場所・送迎・交通費に関するFAQ' },
  { path: '/faq/sidejob', priority: '0.75', freq: 'weekly', lastmod: DEFAULT_STATIC_LASTMOD, img: '/images/col_beginner_guide_art_1787803245812.jpg', title: '副業・Wワーク・掛け持ちに関するFAQ' },
  { path: '/faq/support', priority: '0.75', freq: 'weekly', lastmod: DEFAULT_STATIC_LASTMOD, img: '/images/col_beginner_guide_art_1787803245812.jpg', title: '不安・トラブル・退店・相談に関するFAQ' },
  { path: '/blog', priority: '0.85', freq: 'daily', lastmod: TODAY, img: '/images/col_beginner_guide_art_1787803245812.jpg', title: '飛田新地求人コラム一覧' },
  { path: '/job', priority: '0.85', freq: 'weekly', lastmod: DEFAULT_STATIC_LASTMOD, img: '/images/tobita_job_guide_tea_1788153000519.jpg', title: '飛田新地のお仕事内容・1日の流れ' },
  { path: '/salary', priority: '0.85', freq: 'weekly', lastmod: DEFAULT_STATIC_LASTMOD, img: '/images/tobita_salary_calculator_1788153012478.jpg', title: '給料システムと即日日払い' },
  { path: '/beginner', priority: '0.85', freq: 'weekly', lastmod: DEFAULT_STATIC_LASTMOD, img: '/images/tobita_beginner_support_1788153037569.jpg', title: '未経験スタート完全マニュアル' },
  { path: '/experienced', priority: '0.85', freq: 'weekly', lastmod: DEFAULT_STATIC_LASTMOD, img: '/images/experienced_hero_woman_1794551773329.jpg', title: '飛田新地の経験者求人｜他業種・他店からの移籍' },
  { path: '/requirements', priority: '0.85', freq: 'weekly', lastmod: DEFAULT_STATIC_LASTMOD, img: '/images/tobita_interview_flow_1788153075249.jpg', title: '募集要項と応募条件' },
  { path: '/flow', priority: '0.85', freq: 'weekly', lastmod: DEFAULT_STATIC_LASTMOD, img: '/images/tobita_trial_interview_1788153091611.jpg', title: '面接・体入の流れ' },
  { path: '/workstyle', priority: '0.85', freq: 'weekly', lastmod: DEFAULT_STATIC_LASTMOD, img: '/images/workstyle_hero_morning_1794549297942.jpg', title: '飛田新地の勤務時間・シフト・働き方｜飛田ガールズ' },
  { path: '/shops', priority: '0.85', freq: 'weekly', lastmod: DEFAULT_STATIC_LASTMOD, img: '/images/shops_hero_street_1794559557935.jpg', title: '飛田新地のお店選びガイド｜通りの特徴・求人の見分け方｜飛田ガールズ' },
  { path: '/dekasegi', priority: '0.85', freq: 'weekly', lastmod: DEFAULT_STATIC_LASTMOD, img: '/images/tobita_luxury_room_1788153103866.jpg', title: '個室寮完備・地方出稼ぎ完全サポート' },
  { path: '/safety', priority: '0.85', freq: 'weekly', lastmod: DEFAULT_STATIC_LASTMOD, img: '/images/tobita_wwork_privacy_1788153051081.jpg', title: '身バレ対策と安心の防犯体制' },
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

// Add all blog articles with accurate publishedAt/updatedAt lastmod
for (const a of articles) {
  if (!a.slug) continue;
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
console.log(`[Image Sitemap] Successfully generated ${sitemapPath} with ${staticRoutes.length + articles.length} URLs including image tags!`);
