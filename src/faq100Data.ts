/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import faq100Json from '../data/faq100.json';

export type FAQ12Category =
  | 'qualification' // 01. 応募資格・年齢
  | 'beginner'      // 02. 未経験者向け
  | 'experienced'   // 03. 経験者・移籍
  | 'job'           // 04. 仕事内容・接客
  | 'salary'        // 05. 給料・報酬・控除
  | 'hours'         // 06. 出勤・勤務時間
  | 'interview'     // 07. 面接・体験・入店
  | 'privacy'       // 08. 身バレ・プライバシー
  | 'environment'   // 09. 店舗環境・設備
  | 'access'        // 10. 通勤・送迎・アクセス
  | 'sidejob'       // 11. 掛け持ち・副業
  | 'support';      // 12. 入店後・退店・サポート

export type FAQ8Category =
  | 'recruit'   // 応募・面接
  | 'salary'    // 給料
  | 'beginner'  // 未経験
  | 'hours'     // 勤務時間
  | 'privacy'   // 身バレ
  | 'dorm'      // 寮
  | 'wwork'     // Wワーク
  | 'leaving';  // 退店

export interface FAQ12CategoryDef {
  id: FAQ12Category;
  number: string;
  slug: string;
  label: string;
  seoHeading: string;
  icon: string;
  description: string;
  relatedUrl: string;
  relatedLabel: string;
}

export interface FAQCategoryDef {
  id: FAQ8Category | 'all' | 'popular';
  slug: string;
  label: string;
  shortLabel: string;
  icon: string;
  description: string;
}

export interface FAQ100Item {
  id: string;
  category: string;
  categoryLabel: string;
  category12: FAQ12Category;
  category12Label: string;
  question: string;
  answer: string;
  isPopular?: boolean;
  keywords: string[];
  audienceTag?: string;
  relatedPage?: string;
  relatedLabel?: string;
  relatedIds?: string[];
  needsVerification?: boolean;
  eightCategory: FAQ8Category;
  eightCategoryLabel: string;
}

export const FAQ_LAST_UPDATED = '2026年11月21日';
export const FAQ_LAST_UPDATED_ISO = '2026-11-21';

export const FAQ_12_CATEGORIES: FAQ12CategoryDef[] = [
  {
    id: 'qualification',
    number: '01',
    slug: 'qualification',
    label: '応募資格・年齢',
    seoHeading: '応募資格・年齢に関する質問',
    icon: 'UserRound',
    description: '年齢条件（満20歳以上）・身分証・体型や見た目条件について',
    relatedUrl: '/requirements',
    relatedLabel: '募集要項・応募条件を見る'
  },
  {
    id: 'beginner',
    number: '02',
    slug: 'beginner',
    label: '未経験者向け',
    seoHeading: '未経験者向けの質問',
    icon: 'GraduationCap',
    description: '夜職初心者・人見知り・仲居さんのサポートについて',
    relatedUrl: '/beginner',
    relatedLabel: '未経験者向けガイドを見る'
  },
  {
    id: 'experienced',
    number: '03',
    slug: 'experienced',
    label: '経験者・移籍',
    seoHeading: '経験者・移籍に関する質問',
    icon: 'BriefcaseBusiness',
    description: '他店からの移籍やブランクありの再応募について',
    relatedUrl: '/experienced',
    relatedLabel: '経験者・移籍ガイドを見る'
  },
  {
    id: 'job',
    number: '04',
    slug: 'job',
    label: '仕事内容・接客',
    seoHeading: '仕事内容・接客に関する質問',
    icon: 'ClipboardList',
    description: '接客の流れ・お酒不要・衛生管理・禁止事項について',
    relatedUrl: '/job',
    relatedLabel: '仕事内容の詳細を見る'
  },
  {
    id: 'salary',
    number: '05',
    slug: 'salary',
    label: '給料・報酬・控除',
    seoHeading: '給料・報酬・控除に関する質問',
    icon: 'Wallet',
    description: '売上50%バック・即日日払い・天引きや歩合の仕組み',
    relatedUrl: '/salary',
    relatedLabel: '給料・報酬システムを見る'
  },
  {
    id: 'hours',
    number: '06',
    slug: 'hours',
    label: '出勤・勤務時間',
    seoHeading: '出勤・勤務時間に関する質問',
    icon: 'CalendarClock',
    description: '選べる5大シフト・週1日・短時間・お休み対応について',
    relatedUrl: '/workstyle',
    relatedLabel: '働き方・シフト例を見る'
  },
  {
    id: 'interview',
    number: '07',
    slug: 'interview',
    label: '面接・体験・入店',
    seoHeading: '面接・体験入店・入店に関する質問',
    icon: 'MessageCircle',
    description: '履歴書不要・面接の服装・体験入店・LINE相談について',
    relatedUrl: '/flow',
    relatedLabel: '面接・体験入店の流れを見る'
  },
  {
    id: 'privacy',
    number: '08',
    slug: 'privacy',
    label: '身バレ・プライバシー',
    seoHeading: '身バレ・プライバシー対策に関する質問',
    icon: 'ShieldCheck',
    description: 'Web写真非掲載・撮影禁止ルール・税金や源氏名について',
    relatedUrl: '/safety',
    relatedLabel: '身バレ・安全対策を見る'
  },
  {
    id: 'environment',
    number: '09',
    slug: 'environment',
    label: '店舗環境・設備',
    seoHeading: '店舗環境・設備・寮に関する質問',
    icon: 'Building2',
    description: '無料衣装・ヘアメイク・清拭設備・個室寮の確認事項',
    relatedUrl: '/dekasegi',
    relatedLabel: '寮・出稼ぎページを見る'
  },
  {
    id: 'access',
    number: '10',
    slug: 'access',
    label: '通勤・送迎・アクセス',
    seoHeading: '通勤・送迎・アクセスに関する質問',
    icon: 'Car',
    description: '最寄り駅・近郊交通費・遠方交通費・送り確認について',
    relatedUrl: '/dekasegi',
    relatedLabel: '出稼ぎ・交通費条件を見る'
  },
  {
    id: 'sidejob',
    number: '11',
    slug: 'sidejob',
    label: '掛け持ち・副業',
    seoHeading: '掛け持ち・副業に関する質問',
    icon: 'Layers',
    description: '昼職OL・学生・主婦・子育て中の方の両立について',
    relatedUrl: '/workstyle',
    relatedLabel: 'Wワークの働き方を見る'
  },
  {
    id: 'support',
    number: '12',
    slug: 'support',
    label: '入店後・退店・サポート',
    seoHeading: '入店後・退店・サポートに関する質問',
    icon: 'HandHeart',
    description: '人間関係・体調配慮・女性スタッフ相談・即日退店について',
    relatedUrl: '/about',
    relatedLabel: '運営体制・サポートを見る'
  }
];

export interface FAQThemeGroup {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  categoryIds: FAQ12Category[];
}

export const FAQ_THEME_GROUPS: FAQThemeGroup[] = [
  {
    id: 'start',
    number: '01',
    title: '応募・はじめての方へ',
    subtitle: '応募条件や年齢制限、未経験のサポート、面接・体験入店の流れ',
    categoryIds: ['qualification', 'beginner', 'experienced', 'interview']
  },
  {
    id: 'work',
    number: '02',
    title: '仕事内容・お給料',
    subtitle: '接客の手順、衛生ルール、売上50%バックの計算方法や日払いについて',
    categoryIds: ['job', 'salary']
  },
  {
    id: 'schedule',
    number: '03',
    title: '出勤・通勤・掛け持ち',
    subtitle: '選べるシフト時間帯、週1勤務、最寄り駅や送迎、副業・学業との両立',
    categoryIds: ['hours', 'access', 'sidejob']
  },
  {
    id: 'safety',
    number: '04',
    title: '身バレ対策・環境・サポート',
    subtitle: '顔写真非掲載や住民税対策、店舗設備や寮、入店後のフォロー体制',
    categoryIds: ['privacy', 'environment', 'support']
  }
];

export const LEGACY_TO_12_CATEGORY_MAP: Record<string, FAQ12Category> = {
  recruit: 'interview',
  salary: 'salary',
  beginner: 'beginner',
  hours: 'hours',
  privacy: 'privacy',
  dorm: 'environment',
  wwork: 'sidejob',
  leaving: 'support'
};

export function resolveFaq12Category(slug?: string | null): FAQ12Category | null {
  if (!slug) return null;
  const clean = slug.trim().toLowerCase();
  if (FAQ_12_CATEGORIES.some(c => c.id === clean || c.slug === clean)) {
    return clean as FAQ12Category;
  }
  if (clean in LEGACY_TO_12_CATEGORY_MAP) {
    return LEGACY_TO_12_CATEGORY_MAP[clean];
  }
  return null;
}

/**
 * Legacy 8 Categories kept for compatibility with ComparisonPage / existing references
 */
export const FAQ_8_CATEGORIES: FAQCategoryDef[] = [
  {
    id: 'all',
    slug: 'all',
    label: 'すべての質問',
    shortLabel: 'すべて',
    icon: 'Layers',
    description: '119問すべての疑問と回答を一覧で確認できます'
  },
  {
    id: 'recruit',
    slug: 'recruit',
    label: '応募・面接',
    shortLabel: '応募・面接',
    icon: 'UserCheck',
    description: '応募手順・私服面接・履歴書不要・友達応募・即日体入・年齢層について'
  },
  {
    id: 'salary',
    slug: 'salary',
    label: '給料',
    shortLabel: '給料',
    icon: 'Coins',
    description: '全額日払い・50%バック・天引きなし・交通費・手渡しについて'
  },
  {
    id: 'beginner',
    slug: 'beginner',
    label: '未経験',
    shortLabel: '未経験',
    icon: 'Sparkles',
    description: '夜職初心者・お酒不要・接客の流れ・人見知り・客層・無料衣装＆メイクについて'
  },
  {
    id: 'hours',
    slug: 'hours',
    label: '勤務時間',
    shortLabel: '勤務時間',
    icon: 'Clock',
    description: '営業時間・短時間勤務・週1日・月数回・自由シフト・終電上がりについて'
  },
  {
    id: 'privacy',
    slug: 'privacy',
    label: '身バレ',
    shortLabel: '身バレ',
    icon: 'EyeOff',
    description: '顔写真ネット非掲載・家族同居・会社バレ防止対策・源氏名・個人情報管理について'
  },
  {
    id: 'dorm',
    slug: 'dorm',
    label: '寮',
    shortLabel: '寮',
    icon: 'Home',
    description: '個室マンション寮の設備・入居条件・遠方からの出稼ぎ相談について'
  },
  {
    id: 'wwork',
    slug: 'wwork',
    label: 'Wワーク',
    shortLabel: 'Wワーク',
    icon: 'Briefcase',
    description: '昼職OL・女子大生・主婦の副業掛け持ち・確定申告対策について'
  },
  {
    id: 'leaving',
    slug: 'leaving',
    label: '退店',
    shortLabel: '退店',
    icon: 'DoorOpen',
    description: '即日退店・違約金なし・1日体験後の判断・トラブル対応・LINE相談について'
  }
];

export const FAQ_CATEGORIES = FAQ_8_CATEGORIES;

export function categorizeFAQItem(item: { id: string; category: string; question: string; answer: string }): {
  eightCategory: FAQ8Category;
  eightCategoryLabel: string;
} {
  const q = item.question;

  if (
    q.includes('Wワーク') ||
    q.includes('掛け持ち') ||
    q.includes('昼の仕事') ||
    q.includes('女子大生') ||
    q.includes('主婦や子育て') ||
    q.includes('確定申告') ||
    q.includes('マイナンバー')
  ) {
    return { eightCategory: 'wwork', eightCategoryLabel: 'Wワーク' };
  }

  if (
    q.includes('辞め') ||
    q.includes('退店') ||
    q.includes('退寮') ||
    q.includes('違約金') ||
    q.includes('合わないと感じたら') ||
    q.includes('ブランク') ||
    q.includes('移籍') ||
    q.includes('怒られたり') ||
    q.includes('イジメ') ||
    q.includes('トラブル') ||
    q.includes('妊娠') ||
    q.includes('相談だけでもLINE')
  ) {
    return { eightCategory: 'leaving', eightCategoryLabel: '退店' };
  }

  if (
    q.includes('寮') ||
    q.includes('住まい') ||
    q.includes('出稼ぎ') ||
    q.includes('ペット') ||
    q.includes('家族寮') ||
    q.includes('託児所') ||
    q.includes('引っ越し') ||
    q.includes('ホテル')
  ) {
    return { eightCategory: 'dorm', eightCategoryLabel: '寮' };
  }

  if (
    q.includes('身バレ') ||
    q.includes('バレ') ||
    q.includes('顔写真') ||
    q.includes('SNS') ||
    q.includes('本名') ||
    q.includes('DM') ||
    q.includes('住民票') ||
    q.includes('個人情報') ||
    q.includes('知人') ||
    q.includes('知り合い') ||
    q.includes('アリバイ') ||
    q.includes('スマートフォン')
  ) {
    return { eightCategory: 'privacy', eightCategoryLabel: '身バレ' };
  }

  if (
    q.includes('勤務時間') ||
    q.includes('出勤') ||
    q.includes('短期勤務') ||
    q.includes('土日祝') ||
    q.includes('平日') ||
    q.includes('シフト') ||
    q.includes('終電') ||
    q.includes('送迎') ||
    q.includes('お休み') ||
    q.includes('週1日') ||
    q.includes('月1日')
  ) {
    return { eightCategory: 'hours', eightCategoryLabel: '勤務時間' };
  }

  if (
    item.category === 'salary' ||
    q.includes('給') ||
    q.includes('日払い') ||
    q.includes('バック') ||
    q.includes('稼') ||
    q.includes('罰金') ||
    q.includes('天引き') ||
    q.includes('雑費') ||
    q.includes('交通費') ||
    q.includes('祝い金') ||
    q.includes('明細') ||
    q.includes('手渡し') ||
    q.includes('借金')
  ) {
    return { eightCategory: 'salary', eightCategoryLabel: '給料' };
  }

  if (
    item.category === 'job' ||
    item.category === 'beauty' ||
    q.includes('未経験') ||
    q.includes('夜職の経験') ||
    q.includes('お酒') ||
    q.includes('接客の流れ') ||
    q.includes('会話が苦手') ||
    q.includes('客層') ||
    q.includes('呼び込み') ||
    q.includes('客引き') ||
    q.includes('仲居') ||
    q.includes('危険な行為') ||
    q.includes('衛生面') ||
    q.includes('衣装') ||
    q.includes('ヘアメイク') ||
    q.includes('ぽっちゃり') ||
    q.includes('身長') ||
    q.includes('タトゥー') ||
    q.includes('髪色') ||
    q.includes('メガネ') ||
    q.includes('肌荒れ') ||
    q.includes('持ち物') ||
    q.includes('美容サロン') ||
    q.includes('靴') ||
    q.includes('指名制度') ||
    q.includes('同伴') ||
    q.includes('連絡先の交換') ||
    q.includes('生理中') ||
    q.includes('1組あたり') ||
    q.includes('タバコ') ||
    q.includes('お風呂')
  ) {
    return { eightCategory: 'beginner', eightCategoryLabel: '未経験' };
  }

  return { eightCategory: 'recruit', eightCategoryLabel: '応募・面接' };
}

const cat12LabelMap: Record<FAQ12Category, string> = FAQ_12_CATEGORIES.reduce((acc, c) => {
  acc[c.id] = c.label;
  return acc;
}, {} as Record<FAQ12Category, string>);

/**
 * Complete List of 119 Questions enriched with 12-category + 8-category classifications
 */
export const FAQ_100_LIST: FAQ100Item[] = (faq100Json as any[]).map(item => {
  const { eightCategory, eightCategoryLabel } = categorizeFAQItem(item);
  const category12: FAQ12Category = (item.category12 as FAQ12Category) || 'interview';
  return {
    ...item,
    category12,
    category12Label: cat12LabelMap[category12] || item.categoryLabel,
    eightCategory,
    eightCategoryLabel
  };
});

/**
 * 5 Essential Starter Questions for /faq ("よく見られている質問" / "まず確認したい質問")
 */
export const ESSENTIAL_5_FAQ_IDS = [
  'faq-rec-1',  // 未経験でも応募できますか？
  'faq-rec-5',  // 応募資格や年齢制限は何歳からですか？
  'faq-job-3',  // 具体的な接客の流れはどうなっていますか？
  'faq-sal-6',  // 給料の計算方法は？バック率（歩合率）はどう計算されますか？
  'faq-priv-1'  // 身バレしませんか？
];

export const ESSENTIAL_5_FAQ_LIST: FAQ100Item[] = ESSENTIAL_5_FAQ_IDS
  .map(id => FAQ_100_LIST.find(item => item.id === id))
  .filter((item): item is FAQ100Item => item !== undefined);

/**
 * Representative TOP 10 Questions for Home references
 */
export const TOP_10_FAQ_IDS = [
  'faq-rec-1',
  'faq-sal-3',
  'faq-shift-1',
  'faq-priv-1',
  'faq-job-1',
  'faq-rec-3',
  'faq-shift-4',
  'faq-dorm-1',
  'faq-trouble-1',
  'faq-trouble-14'
];

export const TOP_10_FAQ_LIST: FAQ100Item[] = TOP_10_FAQ_IDS
  .map(id => FAQ_100_LIST.find(item => item.id === id))
  .filter((item): item is FAQ100Item => item !== undefined);

/**
 * High-Intent Search FAQ Item Structure (used on Home FAQ.tsx)
 */
export type SearchIntentCategoryKey = 'beginner' | 'salary' | 'workstyle' | 'privacy';

export interface HighIntentFAQItem {
  id: string;
  searchIntentCategory: SearchIntentCategoryKey;
  searchIntentCategoryLabel: string;
  searchQuery: string;
  question: string;
  answer: string;
  keyTakeaways: string[];
  highlightLabel?: string;
  relatedFaq100Id?: string;
}

export interface SearchIntentCategoryMeta {
  key: SearchIntentCategoryKey;
  label: string;
  subLabel: string;
  icon: string;
  colorClass: string;
  description: string;
  searchQueriesSample: string[];
}

export const SEARCH_INTENT_CATEGORIES: SearchIntentCategoryMeta[] = [
  {
    key: 'beginner',
    label: '初心者',
    subLabel: '未経験・初日・面接・体入',
    icon: 'Sparkles',
    colorClass: 'text-amber-600 bg-amber-50 border-amber-200',
    description: '夜職・接客未経験の不安を解消する基本Q&A',
    searchQueriesSample: ['未経験でも大丈夫？', '接客経験がなくても大丈夫？', '初日は何をする？', '面接で何を聞かれる？', '体験入店だけでもいい？']
  },
  {
    key: 'salary',
    label: '給料',
    subLabel: '日払い・天引き・稼げる額・計算方法',
    icon: 'Coins',
    colorClass: 'text-emerald-600 bg-emerald-50 border-emerald-200',
    description: '即日手渡し・バック率・控除ゼロの給与詳細',
    searchQueriesSample: ['給料はいつもらえる？', '日払い？', '天引きはある？', 'どのくらい稼げる？', '給料の計算方法は？']
  },
  {
    key: 'workstyle',
    label: '働き方',
    subLabel: '週1・短時間・Wワーク・出稼ぎ・寮',
    icon: 'Clock',
    colorClass: 'text-indigo-600 bg-indigo-50 border-indigo-200',
    description: '自由出勤・副業掛け持ち・住居・滞在条件',
    searchQueriesSample: ['週1でもいい？', '短時間でもいい？', 'Wワークできる？', '遠方から働ける？', '寮はある？']
  },
  {
    key: 'privacy',
    label: '不安・身バレ',
    subLabel: '家族バレ・会社バレ・写真・SNS',
    icon: 'ShieldCheck',
    colorClass: 'text-rose-600 bg-rose-50 border-rose-200',
    description: 'ネット写真非掲載・撮影禁止ルール・プライバシー保護',
    searchQueriesSample: ['身バレが心配', '家族に知られたくない', '会社に知られたくない', '写真掲載はある？', 'SNSに載る？']
  }
];

export const HIGH_INTENT_FAQS: HighIntentFAQItem[] = [
  {
    id: 'hi-beg-1',
    searchIntentCategory: 'beginner',
    searchIntentCategoryLabel: '初心者',
    searchQuery: '未経験でも大丈夫？',
    question: '未経験でも大丈夫？夜職や風俗の経験が一切なくても働けますか？',
    answer: 'はい、問題ありません。現在在籍している女性の約9割が、夜職の経験がない未経験からのスタートです。\n\n飛田新地は「お客様とのLINE交換や営業連絡」「指名争い」「同伴・アフター」「お酒の飲酒」がありません。勤務前に女性スタッフが挨拶のマナーや衛生面の準備、接客の流れを丁寧にレクチャーし、店頭では仲居さんが呼び込みや時間管理を行うため、未経験から始めやすい環境です。',
    keyTakeaways: [
      '在籍キャストの約9割が未経験スタート',
      '営業連絡・指名取り・お酒の強制なし',
      '仲居さんが呼び込みや時間管理をサポート'
    ],
    highlightLabel: '未経験歓迎',
    relatedFaq100Id: 'faq-rec-1'
  },
  {
    id: 'hi-beg-2',
    searchIntentCategory: 'beginner',
    searchIntentCategoryLabel: '初心者',
    searchQuery: '接客経験がなくても大丈夫？',
    question: '接客経験がなくても大丈夫？カフェや居酒屋などのバイト経験もありません。',
    answer: '接客業の経験がなくても大丈夫です。お客様の前で流暢なトークを披露する必要はなく、「笑顔で挨拶ができること」「清潔感を保てること」「穏やかにお話を聞けること」が大切です。\n\n時間管理やお見送りの合図などは仲居さんがサポートするため、会話が得意でない方でも自然体で勤務できます。',
    keyTakeaways: [
      '専門的なトークスキルは不要',
      '「笑顔で挨拶」「清潔感」を大切にできる方なら安心',
      '時間管理やサポートは仲居さんが担当'
    ],
    highlightLabel: '初心者歓迎',
    relatedFaq100Id: 'faq-job-9'
  },
  {
    id: 'hi-beg-3',
    searchIntentCategory: 'beginner',
    searchIntentCategoryLabel: '初心者',
    searchQuery: '初日は何をする？',
    question: '初日は何をする？集合から挨拶・着替え・初接客・日払い退勤までの1日全スケジュール',
    answer: '初日出勤時の具体的なスケジュールは以下の通りです：\n\n①【私服で集合・本人確認】：お約束の時間に私服でお越しいただき、必要書類を確認します。\n②【衣装選び・身支度】：用意された衣装から選び、身支度を整えます。\n③【事前レクチャー（約15〜30分）】：挨拶の仕方、時間の合図、衛生ルールや呼び出しボタンの位置などを女性スタッフが説明します。\n④【玄関でお出迎え】：仲居さんの隣に座ってお客さまをお出迎え（呼び込みは仲居さんが担当）。\n⑤【おもてなし（1回15〜20分など）】：2階個室へご案内し、粘膜接触を伴わない接客を行います。\n⑥【日払い手渡し退勤】：終了後、その日の手取り額を全額現金手渡しで受け取って帰宅します。',
    keyTakeaways: [
      '私服で集合OK・衣装貸出あり',
      '初日は短時間のお試し勤務も相談可能',
      '退勤時に当日の稼ぎを現金手渡し'
    ],
    highlightLabel: '初日スケジュール',
    relatedFaq100Id: 'faq-rec-15'
  },
  {
    id: 'hi-beg-4',
    searchIntentCategory: 'beginner',
    searchIntentCategoryLabel: '初心者',
    searchQuery: '面接で何を聞かれる？',
    question: '面接で何を聞かれる？どんな質問をされますか？落ちることはある？',
    answer: '面接で聞かれる内容は、以下のような「希望の働き方」の確認が中心です：\n\n・「週に何日くらい出勤したいか（または月何回か）」\n・「希望の勤務時間帯（昼メインか、夜メインか、終電までか）」\n・「どれくらい稼ぎたい目標があるか」\n・「寮の利用を希望するか」\n・「いつから勤務を開始できるか」\n\n履歴書は不要で私服のまま面談できます。満20歳以上の公的年齢確認ができ、一般的な挨拶やコミュニケーションに支障がなければ採用対象となります。',
    keyTakeaways: [
      '希望シフトや目標金額などの確認が中心',
      '履歴書不要・私服で面談可能',
      '満20歳以上の身分証確認が必要'
    ],
    highlightLabel: '履歴書不要',
    relatedFaq100Id: 'faq-rec-9'
  },
  {
    id: 'hi-beg-5',
    searchIntentCategory: 'beginner',
    searchIntentCategoryLabel: '初心者',
    searchQuery: '体験入店だけでもいい？',
    question: '体験入店だけでもいい？1日だけ働いてみて、合わなければ即日で辞めても大丈夫？',
    answer: 'はい、体験入店（1日お試し勤務）からご検討いただけます。実際に店舗に座ってみて、店内の雰囲気や仲居さんの対応などを確かめたうえで判断できます。\n\nもし「自分には合わない」と感じた場合は、体験入店当日のみで終了しても問題ありません。無理な引き止めや、後日のしつこい連絡は行いません。当日の接客分の給与も退勤時に全額現金で手渡しされます。',
    keyTakeaways: [
      '1日体験入店のみで判断可能',
      '合わなければ当日終了OK・引き止めなし',
      '体入当日の給与も全額即日手渡し'
    ],
    highlightLabel: '体入即日OK',
    relatedFaq100Id: 'faq-rec-13'
  },
  {
    id: 'hi-sal-1',
    searchIntentCategory: 'salary',
    searchIntentCategoryLabel: '給料',
    searchQuery: '給料はいつもらえる？日払い？',
    question: '給料はいつもらえる？本当にその日のうちに日払いでもらえますか？',
    answer: '毎日のお仕事が終わったタイミングで、その日の手取り額が【現金手渡し】で即日支給されます。\n\n「日払いは上限1万円までで残りは月末」「初回分は保留」といった繰り越しルールはありません。退勤時に控え室で計算され、その場で受け取ってお帰りいただけます。',
    keyTakeaways: [
      '退勤時に当日の稼ぎを全額現金手渡し',
      '上限設定や翌月繰り越しなし',
      '働いたその日に受け取り可能'
    ],
    highlightLabel: '全額現金手渡し',
    relatedFaq100Id: 'faq-sal-3'
  },
  {
    id: 'hi-sal-2',
    searchIntentCategory: 'salary',
    searchIntentCategoryLabel: '給料',
    searchQuery: '天引きはある？',
    question: '天引きはある？更衣室代、宣伝広告費、厚生費などの名目で引かれませんか？',
    answer: '更衣室代・ロッカー代・厚生費・宣伝広告費などの名目による雑費控除はありません。\n\n当店は料亭直営窓口のため、外部スカウト会社のような仲介手数料のピンハネも発生せず、売上50%バックの計算額がそのまま手取りとなります。',
    keyTakeaways: [
      '更衣室代・厚生費・ロッカー代などの天引き0円',
      '直営店のためスカウト紹介料の中抜きなし',
      '売上50%バック額がそのまま手取り'
    ],
    highlightLabel: '天引きなし',
    relatedFaq100Id: 'faq-sal-7'
  },
  {
    id: 'hi-sal-3',
    searchIntentCategory: 'salary',
    searchIntentCategoryLabel: '給料',
    searchQuery: 'どのくらい稼げる？',
    question: 'どのくらい稼げる？1日の日給や月収の計算例を教えてください。',
    answer: '飛田新地は接客本数に応じた完全歩合制（売上50%バック＋外国人対応手当+2,500円/回）のため、出勤時間帯や当日の来店状況によって収入は変動します。\n\n■ コースバック基準での試算例：\n・15分コース（手取り5,000円）× 10本 ＝ 50,000円\n・15分コース（手取り5,000円）× 20本 ＝ 100,000円\n\nたとえば1日5万円ペースでの稼働を試算した場合、週2日（月8日）で約40万円、週4日（月16日）で約80万円の計算になります（※実際の金額はシフトや来店状況により変動し、固定額を保証するものではありません）。',
    keyTakeaways: [
      '売上50%完全バックの完全歩合制',
      '15分5,000円×10本で5万円、20本で10万円の試算',
      '時間帯・曜日・接客本数に応じて変動'
    ],
    highlightLabel: '試算例公開',
    relatedFaq100Id: 'faq-sal-1'
  },
  {
    id: 'hi-sal-4',
    searchIntentCategory: 'salary',
    searchIntentCategoryLabel: '給料',
    searchQuery: '給料の計算方法は？',
    question: '給料の計算方法は？（公式計算式とコース別の手取り額）',
    answer: '当店の給料計算は【売上50%完全バック（全額即日日払い）＋外国人対応手当（+2,500円/回）】です。\n\n■ コース別の手取り額一覧：\n・15分コース：【5,000円】\n・20分コース：【7,500円】\n・30分コース：【10,000円】\n・45分コース：【15,000円】\n・60分コース：【20,000円】\n・外国人対応手当：【+2,500円 / 回】\n\n最低1本から稼働でき、雑費や控除は0円です。いただいたチップもお店の天引きなくすべて女性のものになります。',
    keyTakeaways: [
      '売上50%完全バック＋外国人対応手当（+2,500円/回）',
      '15分5,000円 / 20分7,500円 / 30分10,000円 / 60分20,000円',
      'チップも天引きなしで全額女性のもの'
    ],
    highlightLabel: '計算式公開',
    relatedFaq100Id: 'faq-sal-6'
  },
  {
    id: 'hi-sal-5',
    searchIntentCategory: 'salary',
    searchIntentCategoryLabel: '給料',
    searchQuery: 'ノルマや罰金はある？',
    question: 'ノルマや罰金はある？待機カットやお客さんがつかなかった時の減給は？',
    answer: 'ノルマや罰金・ペナルティはありません。完全歩合制（売上50%バック）のため固定の時給や日給保証はありませんが、待機カットや罰金・更衣室代などの差し引きもゼロですので、マイナスになることはありません。',
    keyTakeaways: [
      '接客本数ノルマ・罰金ペナルティなし',
      '待機カットや雑費天引きゼロ',
      '完全歩合制で自分のペースで働ける'
    ],
    highlightLabel: 'ノルマ罰金0',
    relatedFaq100Id: 'faq-sal-8'
  },
  {
    id: 'hi-wrk-1',
    searchIntentCategory: 'workstyle',
    searchIntentCategoryLabel: '働き方',
    searchQuery: '週1でもいい？',
    question: '週1でもいい？月1日やスキマ時間だけでも採用されますか？',
    answer: 'はい、週1日のみの出勤でも問題ありません。「土曜日だけ」「日曜の昼だけ」「月に数回だけ」といったシフトでもご相談いただけます。自由シフト制のため、本業や学業の予定に合わせて無理なく調整できます。',
    keyTakeaways: [
      '週1日・月数回・土日のみの出勤対応',
      '自由シフト制（出勤強制なし）',
      '学業や旅行等での長期休みも相談可'
    ],
    highlightLabel: '週1日・月数回OK',
    relatedFaq100Id: 'faq-shift-1'
  },
  {
    id: 'hi-wrk-2',
    searchIntentCategory: 'workstyle',
    searchIntentCategoryLabel: '働き方',
    searchQuery: '短時間でもいい？',
    question: '短時間でもいい？1日の勤務時間や選べるシフト時間帯について知りたい',
    answer: 'はい、短時間勤務もご相談いただけます。選べる5つの時間帯をご用意しています：\n・10:00〜16:00（昼短時間6h）\n・10:00〜17:00（昼標準7h）\n・17:00〜24:00（夜標準7h）\n・14:00〜24:00（午後通し10h）\n・12:00〜24:00（通し12h）\n\nご自身の生活リズムに合わせて無理のない枠を選べます。',
    keyTakeaways: [
      '選べる5つのシフト時間帯を用意',
      '昼シフト（10:00〜16:00 / 10:00〜17:00）も相談可能',
      '終電上がりの調整にも対応'
    ],
    highlightLabel: '短時間OK',
    relatedFaq100Id: 'faq-shift-10'
  },
  {
    id: 'hi-wrk-3',
    searchIntentCategory: 'workstyle',
    searchIntentCategoryLabel: '働き方',
    searchQuery: 'Wワークできる？',
    question: 'Wワークできる？昼の会社員（OL）や現役女子大生の掛け持ちは可能？',
    answer: 'はい、昼職の会社員や20歳以上の学生などWワークで働いている方も多いです。本業や学業を優先してシフトを組めるほか、お客様との私的な連絡先交換が禁止されているためオフの時間に支障が出にくい環境です。確定申告時の住民税の普通徴収についてもご相談いただけます。',
    keyTakeaways: [
      '昼職OL・20歳以上の学生の掛け持ち多数',
      '本業・学業優先の自由シフト＆営業連絡なし',
      '住民税の普通徴収など税金手続きも相談可'
    ],
    highlightLabel: '副業Wワーク歓迎',
    relatedFaq100Id: 'faq-shift-4'
  },
  {
    id: 'hi-wrk-4',
    searchIntentCategory: 'workstyle',
    searchIntentCategoryLabel: '働き方',
    searchQuery: '遠方から働ける？',
    question: '遠方から働ける？地方からの出稼ぎや交通費支給・短期集中勤務は可能？',
    answer: 'はい、遠方・都道府県外からのご応募も歓迎しています。短期滞在や寮の利用、交通費支給の条件については、出発地・交通手段（新幹線・高速バス・飛行機）・希望稼働日数に応じて規定が異なるため、チケット手配前に最新の確定条件をご案内いたします。',
    keyTakeaways: [
      '府外・遠方からの出稼ぎ応募にも対応',
      '交通費支給の上限や条件は出発地・日程ごとに事前案内',
      '滞在期間・スケジュールは個別に相談可能'
    ],
    highlightLabel: '遠方相談可',
    relatedFaq100Id: 'faq-dorm-5'
  },
  {
    id: 'hi-wrk-5',
    searchIntentCategory: 'workstyle',
    searchIntentCategoryLabel: '働き方',
    searchQuery: '寮はある？',
    question: '寮はある？個室マンション寮の設備や費用はどうなっていますか？',
    answer: 'はい、滞在向けの個室住居のご案内を行っています。実際の空室状況、1日あたり・月額の利用料金、初期費用・清掃費・光熱費の負担、備え付け家具家電の仕様、入居可能時期は時期や物件によって異なるため、ご希望の日程をお知らせのうえ最新条件をご確認ください。',
    keyTakeaways: [
      '遠方者向けの個室マンション寮のご案内が可能',
      '空室状況・利用料金・設備仕様は事前に確定案内',
      '入居希望日や滞在日数に合わせて相談可能'
    ],
    highlightLabel: '個室寮相談可',
    relatedFaq100Id: 'faq-dorm-1'
  },
  {
    id: 'hi-prv-1',
    searchIntentCategory: 'privacy',
    searchIntentCategoryLabel: '不安・身バレ',
    searchQuery: '身バレが心配',
    question: '身バレが心配…知り合いや友達にバレる可能性はありますか？どんな対策がある？',
    answer: 'WebやSNSへの顔写真掲載がないため、他のナイトワークと比べてネット経由の身バレリスクは抑えやすい環境です。ただし、通退勤時や店頭で偶然知り合いに見られる可能性まで「100%ゼロ」と保証することはできません。\n\n当店では、街全体の撮影禁止ルール・完全源氏名・自宅への郵送物なし・ウィッグやメイクでの雰囲気調整・生活圏から離れた店舗選定などの対策を行っており、ご自身での注意点もあわせてご案内しています。',
    keyTakeaways: [
      'Web・SNSへの顔写真掲載は行わない',
      '街全体で写真・動画撮影を禁止し巡回を実施',
      '偶然の遭遇などのリスクも隠さず共有し対策を相談'
    ],
    highlightLabel: '身バレ対策実施',
    relatedFaq100Id: 'faq-priv-1'
  },
  {
    id: 'hi-prv-2',
    searchIntentCategory: 'privacy',
    searchIntentCategoryLabel: '不安・身バレ',
    searchQuery: '家族に知られたくない',
    question: '家族に知られたくない…親や家族と同居していてもバレずに働けますか？',
    answer: 'はい、同居のご家族がいる方もプライバシーに配慮して働いています。店舗からご自宅へ契約書類や明細書、DMなどの郵便物を送ることはなく、ご連絡は個人のLINE等で行います。また、お給料は現金手渡し、衣装も店舗保管のため自宅に持ち帰る必要がありません。',
    keyTakeaways: [
      '自宅への郵便物・明細・固定電話連絡なし',
      '連絡は個人のスマートフォン等で完結',
      '衣装は店舗で保管（持ち帰り不要）'
    ],
    highlightLabel: '郵便物・連絡なし',
    relatedFaq100Id: 'faq-priv-2'
  },
  {
    id: 'hi-prv-3',
    searchIntentCategory: 'privacy',
    searchIntentCategoryLabel: '不安・身バレ',
    searchQuery: '会社に知られたくない',
    question: '会社に知られたくない…昼職の本業に副業が発覚しない対策はありますか？',
    answer: '昼間の会社に副業が知られる主な原因は「住民税の特別徴収」です。確定申告時に住民税の納付方法を『普通徴収（自分で納付）』に選択することで、副業分の税額通知が本業の会社に届きにくくなります。申告時の注意点や相談先についてもご案内しています。',
    keyTakeaways: [
      '住民税の「普通徴収（自分で納付）」選択のポイントを案内',
      'マイナンバー提示だけで別勤務先へ通知される仕組みはなし',
      '申告の不安は事前相談可能'
    ],
    highlightLabel: '住民税対策案内',
    relatedFaq100Id: 'faq-priv-3'
  },
  {
    id: 'hi-prv-4',
    searchIntentCategory: 'privacy',
    searchIntentCategoryLabel: '不安・身バレ',
    searchQuery: '写真掲載はある？',
    question: '写真掲載はある？求人サイトやネット案内所・看板に顔写真が載ることはある？',
    answer: 'いいえ、当店および飛田新地の正規料亭では、求人サイト・ネット案内所・店頭看板等にキャストの顔写真や全身写真を掲載することは行っておりません。インターネット上に画像が残る仕組みがないため、ネット検索からの身バレを抑えられます。',
    keyTakeaways: [
      '求人サイトやネット案内所への顔写真掲載なし',
      '看板やカタログへの写真露出なし',
      'ネット上に画像が残らない仕組み'
    ],
    highlightLabel: 'ネット写真非掲載',
    relatedFaq100Id: 'faq-priv-4'
  },
  {
    id: 'hi-prv-5',
    searchIntentCategory: 'privacy',
    searchIntentCategoryLabel: '不安・身バレ',
    searchQuery: 'SNSに載る？',
    question: 'SNSに載る？TikTok、Instagram、X（Twitter）にお店の写真や動画が使われない？',
    answer: '飛田新地料理組合の規約により、街並み・店舗外観・働く女性に対する撮影やSNSへの無断投稿は固く禁止されており、巡回や注意対応を行っています。また、お店が宣伝用にキャストの写真や動画をSNSへ掲載することもありません。',
    keyTakeaways: [
      '組合規約によりエリア内の撮影行為を禁止・巡回実施',
      '店舗が宣伝用にキャストの写真をSNS投稿することなし',
      '不審な撮影者を見かけた場合はスタッフが対応'
    ],
    highlightLabel: '撮影禁止ルール',
    relatedFaq100Id: 'faq-priv-5'
  }
];

export const SEARCH_INTENT_FAQ_LIST = HIGH_INTENT_FAQS;

/**
 * Normalize text for reliable Japanese search:
 * - NFKC normalization (full-width alphanumeric/symbols -> half-width)
 * - Katakana -> Hiragana conversion
 * - Lowercase & collapse whitespace
 */
export function normalizeSearchText(input: string): string {
  return String(input || '')
    .normalize('NFKC')
    .replace(/[\u30a1-\u30f6]/g, ch => String.fromCharCode(ch.charCodeAt(0) - 0x60))
    .toLowerCase()
    .trim();
}

/**
 * Filter questions by 12 categories, legacy 8 categories, and optional search query
 */
export function filterFAQ100(
  categoryId: string,
  searchQuery: string
): FAQ100Item[] {
  let list = FAQ_100_LIST;

  if (categoryId === 'popular') {
    list = list.filter(item => item.isPopular);
  } else if (categoryId && categoryId !== 'all') {
    const resolved12 = resolveFaq12Category(categoryId);
    list = list.filter(
      item =>
        item.category12 === categoryId ||
        (resolved12 !== null && item.category12 === resolved12) ||
        item.eightCategory === categoryId ||
        item.category === categoryId
    );
  }

  const rawQuery = normalizeSearchText(searchQuery);
  if (!rawQuery) return list;

  const tokens = rawQuery.split(/\s+/).filter(Boolean);
  if (tokens.length === 0) return list;

  return list.filter(item => {
    const haystack = normalizeSearchText(
      [
        item.question,
        item.answer,
        item.category12Label,
        item.eightCategoryLabel,
        item.categoryLabel,
        ...(item.keywords || [])
      ].join(' ')
    );
    return tokens.every(token => haystack.includes(token));
  });
}
