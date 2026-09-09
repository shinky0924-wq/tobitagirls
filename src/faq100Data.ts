/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import faq100Json from '../data/faq100.json';

export type FAQ8Category = 
  | 'recruit'   // 応募・面接
  | 'salary'    // 給料
  | 'beginner'  // 未経験
  | 'hours'     // 勤務時間
  | 'privacy'   // 身バレ
  | 'dorm'      // 寮
  | 'wwork'     // Wワーク
  | 'leaving';  // 退店

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
  question: string;
  answer: string;
  isPopular?: boolean;
  keywords: string[];
  eightCategory: FAQ8Category;
  eightCategoryLabel: string;
}

/**
 * 8 Major Categories for Tobita Shinchi FAQ
 * Requested structure:
 * 飛田新地求人 FAQ
 * │
 * ├─ 応募・面接
 * ├─ 給料
 * ├─ 未経験
 * ├─ 勤務時間
 * ├─ 身バレ
 * ├─ 寮
 * ├─ Wワーク
 * └─ 退店
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
    description: '全額日払い・日給相場・50%バック・天引きなし・交通費・手渡しについて'
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
    description: '営業時間・短時間勤務・週1日・月数回・自由シフト・終電上がり・深夜送りについて'
  },
  {
    id: 'privacy',
    slug: 'privacy',
    label: '身バレ',
    shortLabel: '身バレ',
    icon: 'EyeOff',
    description: '顔写真ネット非掲載・親や家族同居・会社バレ防止・源氏名・個人情報破棄について'
  },
  {
    id: 'dorm',
    slug: 'dorm',
    label: '寮',
    shortLabel: '寮',
    icon: 'Home',
    description: '即日家具家電付き個室寮・敷金礼金0円・地方交通費支給・ペット可・家族寮について'
  },
  {
    id: 'wwork',
    slug: 'wwork',
    label: 'Wワーク',
    shortLabel: 'Wワーク',
    icon: 'Briefcase',
    description: '昼職OL・女子大生・主婦の副業掛け持ち・確定申告・本業にバレない対策について'
  },
  {
    id: 'leaving',
    slug: 'leaving',
    label: '退店',
    shortLabel: '退店',
    icon: 'DoorOpen',
    description: '即日退店・違約金なし・1日体験後の辞退・休職・トラブル対応・LINE相談について'
  }
];

export const FAQ_CATEGORIES = FAQ_8_CATEGORIES;

/**
 * Categorize each FAQ item into one of the 8 canonical themes
 */
export function categorizeFAQItem(item: { id: string; category: string; question: string; answer: string }): {
  eightCategory: FAQ8Category;
  eightCategoryLabel: string;
} {
  const q = item.question;

  // 1. Wワーク (Side jobs, dual careers, students, mothers)
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

  // 2. 退店 (Quitting, resignation, trouble, consultation)
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

  // 3. 寮 (Housing, dorms, moving)
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

  // 4. 身バレ (Privacy, anonymity, secret)
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

  // 5. 勤務時間 (Hours, shifts, attendance, late night transport)
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

  // 6. 給料 (Salary, payout, earnings, deduction)
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

  // 7. 未経験 (Beginner, customer handling, costumes, alcohol, appearance)
  if (
    item.category === 'job' ||
    item.category === 'beauty' ||
    q.includes('未経験') || 
    q.includes('夜職の経験') || 
    q.includes('お酒') || 
    q.includes('接客の流れ') || 
    q.includes('会話が苦手') || 
    q.includes('客層') || 
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

  // 8. 応募・面接 (Application, interview, ID, age)
  return { eightCategory: 'recruit', eightCategoryLabel: '応募・面接' };
}

/**
 * Complete List of 119 Questions enriched with the 8 categories
 */
export const FAQ_100_LIST: FAQ100Item[] = (faq100Json as any[]).map(item => {
  const { eightCategory, eightCategoryLabel } = categorizeFAQItem(item);
  return {
    ...item,
    eightCategory,
    eightCategoryLabel
  };
});

/**
 * Representative TOP 10 Questions for the Top Page
 */
export const TOP_10_FAQ_IDS = [
  'faq-rec-1',    // 未経験でも応募できますか？
  'faq-sal-3',    // 「全額日払い（手渡し）」は本当にもらえますか？
  'faq-shift-1',  // 週1日だけの出勤でもOKですか？
  'faq-priv-1',   // 身バレしませんか？知り合いや家族に知られるのが一番怖いです。
  'faq-job-1',    // お酒は飲まないといけませんか？
  'faq-rec-3',    // 30代でも応募できますか？採用されますか？
  'faq-shift-4',  // Wワーク（副業）として働けますか？
  'faq-dorm-1',   // 寮（マンション寮）には応募後すぐに入居できますか？
  'faq-trouble-1',// 辞めたくなったときは、すぐに辞められますか？
  'faq-trouble-14'// まだ働くか決めておらず、質問や相談だけでもLINEしていいですか？
];

export const TOP_10_FAQ_LIST: FAQ100Item[] = TOP_10_FAQ_IDS
  .map(id => FAQ_100_LIST.find(item => item.id === id))
  .filter((item): item is FAQ100Item => item !== undefined);

/**
 * Filter questions by 8 categories and optional search query
 */
export function filterFAQ100(
  categoryId: string,
  searchQuery: string
): FAQ100Item[] {
  let list = FAQ_100_LIST;

  if (categoryId === 'popular') {
    list = list.filter(item => item.isPopular);
  } else if (categoryId !== 'all' && categoryId) {
    list = list.filter(item => item.eightCategory === categoryId || item.category === categoryId);
  }

  const query = searchQuery.trim().toLowerCase();
  if (!query) return list;

  return list.filter(item => {
    const inQuestion = item.question.toLowerCase().includes(query);
    const inAnswer = item.answer.toLowerCase().includes(query);
    const inCategory = item.eightCategoryLabel.toLowerCase().includes(query) || item.categoryLabel.toLowerCase().includes(query);
    const inKeywords = item.keywords.some(k => k.toLowerCase().includes(query));
    return inQuestion || inAnswer || inCategory || inKeywords;
  });
}
