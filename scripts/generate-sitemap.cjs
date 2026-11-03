/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

const fs = require('fs');
const path = require('path');

const HOST = 'tobitashinchi-recruit.com';
const DOMAIN = `https://${HOST}`;
const TODAY = new Date().toISOString().split('T')[0];

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
  { path: '', priority: '1.0', freq: 'daily', img: '/images/col_beginner_guide_art_1787803245812.jpg', title: '飛田新地求人なら飛田ガールズ公式' },
  { path: '/about', priority: '0.8', freq: 'weekly', img: '/images/col_beginner_guide_art_1787803245812.jpg', title: '運営者情報・店舗体制' },
  { path: '/glossary', priority: '0.85', freq: 'weekly', img: '/images/col_beginner_guide_art_1787803245812.jpg', title: '飛田新地 用語集・用語辞典' },
  { path: '/compare', priority: '0.9', freq: 'daily', img: '/images/col_beginner_guide_art_1787803245812.jpg', title: '飛田新地求人サイト比較＆目的別ガイド' },
  { path: '/compare/inexperienced', priority: '0.85', freq: 'weekly', img: '/images/tobita_beginner_support_1788153037569.jpg', title: '未経験向け求人' },
  { path: '/compare/high-income', priority: '0.85', freq: 'weekly', img: '/images/tobita_salary_calculator_1788153012478.jpg', title: '高収入重視求人' },
  { path: '/compare/weekly-1', priority: '0.85', freq: 'weekly', img: '/images/tobita_shift_schedule_1788153063163.jpg', title: '週1日・マイペース求人' },
  { path: '/compare/short-term', priority: '0.85', freq: 'weekly', img: '/images/tobita_trial_interview_1788153091611.jpg', title: '短期出稼ぎ・集中求人' },
  { path: '/compare/dormitory', priority: '0.85', freq: 'weekly', img: '/images/tobita_luxury_room_1788153103866.jpg', title: '個室寮完備求人' },
  { path: '/compare/double-work', priority: '0.85', freq: 'weekly', img: '/images/tobita_wwork_privacy_1788153051081.jpg', title: '副業OL・Wワーク求人' },
  { path: '/compare/age-20s', priority: '0.85', freq: 'weekly', img: '/images/tobita_experienced_cast_1792411797671.jpg', title: '20代向け求人' },
  { path: '/compare/age-30s', priority: '0.85', freq: 'weekly', img: '/images/tobita_job_guide_tea_1788153000519.jpg', title: '30代向け求人' },
  { path: '/faq', priority: '0.85', freq: 'daily', img: '/images/col_beginner_guide_art_1787803245812.jpg', title: '飛田新地求人 FAQ よくある質問' },
  { path: '/blog', priority: '0.85', freq: 'daily', img: '/images/col_beginner_guide_art_1787803245812.jpg', title: '飛田新地求人コラム一覧' },
  { path: '/job', priority: '0.85', freq: 'weekly', img: '/images/tobita_job_guide_tea_1788153000519.jpg', title: 'お仕事内容と和室接客' },
  { path: '/salary', priority: '0.85', freq: 'weekly', img: '/images/tobita_salary_calculator_1788153012478.jpg', title: '給料システムと即日日払い' },
  { path: '/beginner', priority: '0.85', freq: 'weekly', img: '/images/tobita_beginner_support_1788153037569.jpg', title: '未経験スタート完全マニュアル' },
  { path: '/experienced', priority: '0.85', freq: 'weekly', img: '/images/tobita_experienced_cast_1792411797671.jpg', title: '経験者・移籍優遇制度' },
  { path: '/requirements', priority: '0.85', freq: 'weekly', img: '/images/tobita_interview_flow_1788153075249.jpg', title: '募集要項と応募条件' },
  { path: '/flow', priority: '0.85', freq: 'weekly', img: '/images/tobita_trial_interview_1788153091611.jpg', title: '面接・体入の流れ' },
  { path: '/workstyle', priority: '0.85', freq: 'weekly', img: '/images/tobita_shift_schedule_1788153063163.jpg', title: '自由出勤・シフト制度' },
  { path: '/shops', priority: '0.85', freq: 'weekly', img: '/images/tobita_shops_comparison_1792412702580.jpg', title: 'お店選びと通り比較' },
  { path: '/dorm', priority: '0.85', freq: 'weekly', img: '/images/tobita_luxury_room_1788153103866.jpg', title: '家具家電付き個室マンション寮' },
  { path: '/safety', priority: '0.85', freq: 'weekly', img: '/images/tobita_wwork_privacy_1788153051081.jpg', title: '身バレ対策と安心の防犯体制' },
];

let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
`;

// Add static routes with image extensions
for (const r of staticRoutes) {
  xml += `  <url>
    <loc>${DOMAIN}${r.path}</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>${r.freq}</changefreq>
    <priority>${r.priority}</priority>
    <image:image>
      <image:loc>${DOMAIN}${r.img}</image:loc>
      <image:title>${escapeXml(r.title)}</image:title>
    </image:image>
  </url>
`;
}

// Add all 179 blog articles with images
for (const a of articles) {
  if (!a.slug) continue;
  const imgUrl = a.eyeCatch && a.eyeCatch.startsWith('http') 
    ? a.eyeCatch 
    : `${DOMAIN}${a.eyeCatch || '/images/col_beginner_guide_art_1787803245812.jpg'}`;

  xml += `  <url>
    <loc>${DOMAIN}/blog/${a.slug}</loc>
    <lastmod>${TODAY}</lastmod>
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
