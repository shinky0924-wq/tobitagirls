/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface FeaturedHeroArticle {
  id: string;
  slug: string;
  title: string;
  category: string;
  categoryLabel: string;
  eyeCatch: string;
}

export const HERO_IMAGE_WEBP_URL = '/images/tobita_dream_hero_banner_1782557055526.webp';

// 固定の定番おすすめ5記事（CLSゼロ・Googlebot向けの安定した内部リンク先）
export const FEATURED_HERO_ARTICLES: FeaturedHeroArticle[] = [
  {
    id: '1',
    slug: 'tobitashinchi-beginner-guide',
    title: '【未経験者必読】飛田新地のお仕事とは？業界一わかりやすい初心者ガイド',
    category: 'beginner',
    categoryLabel: '未経験',
    eyeCatch: '/images/col_beginner_guide_art_1787803245812.jpg',
  },
  {
    id: '101',
    slug: 'tobita-job-guide',
    title: '飛田新地の仕事内容とは？出勤から接客・退勤までの1日の流れを解説',
    category: 'job',
    categoryLabel: '仕事内容',
    eyeCatch: '/images/tobita_job_guide_tea_1788153000519.jpg',
  },
  {
    id: '2',
    slug: 'tobitashinchi-salary-system',
    title: '【給料システム公開】飛田新地って本当に稼げる？日給10万円超えの仕組みと計算式',
    category: 'salary',
    categoryLabel: '給料・待遇',
    eyeCatch: '/images/col_salary_system_1783677804535.jpg',
  },
  {
    id: '3',
    slug: 'tobitashinchi-privacy-guide',
    title: '【飛田新地の秘密厳守】友達・家族に知られにくく働くための5つの「身バレ対策」ルール',
    category: 'safety',
    categoryLabel: '身バレ・安全',
    eyeCatch: '/images/col_privacy_guide_1783677816084.jpg',
  },
  {
    id: '5',
    slug: 'tobitashinchi-interview-guide',
    title: '【飛田新地・面接ガイド】面接の服装は？持ち物は？採用担当者がチェックする3つのポイント',
    category: 'interview',
    categoryLabel: '応募・面接',
    eyeCatch: '/images/col_interview_guide_1783677837312.jpg',
  },
];

// App.tsx 用の軽量ルートマップ（84KBの topicClusterData.ts を初期バンドルから分離）
export const TOPIC_ROUTE_PATHS: Record<string, string> = {
  job: '/job',
  salary: '/salary',
  beginner: '/beginner',
  experienced: '/experienced',
  requirements: '/requirements',
  benefits: '/salary',
  treatment: '/salary',
  flow: '/flow',
  interview: '/flow',
  workstyle: '/workstyle',
  shops: '/shops',
  dorm: '/dekasegi',
  dekasegi: '/dekasegi',
  safety: '/safety',
};
