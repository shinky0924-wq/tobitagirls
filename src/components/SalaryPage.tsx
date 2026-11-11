/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import LucideIcon from './LucideIcon';
import { LINE_OFFICIAL_URL } from '../data';

interface SalaryPageProps {
  onNavigateHome: () => void;
  onNavigateTopic?: (topicId: string) => void;
  onNavigateBlog?: (slug?: string) => void;
  onNavigateFaq?: () => void;
  onCtaclick: () => void;
  onInjectedScroll?: (msg: string) => void;
}

// 既存の厳格な給与実績バリエーション（ロジックを完全維持）
const REAL_VARIATIONS = {
  // ① ゆったり安心（10本）: 日給 約 50,000円 〜 92,500円
  relaxed: {
    minDaily: 50000,
    maxDaily: 92500,
    patterns: [
      {
        name: '実績例A（全コース満遍なく）',
        breakdown: [
          { time: '15分', payout: 5000, count: 5, subtotal: 25000 },
          { time: '20分', payout: 7500, count: 2, subtotal: 15000 },
          { time: '30分', payout: 10000, count: 1, subtotal: 10000 },
          { time: '45分', payout: 15000, count: 1, subtotal: 15000 },
          { time: '60分', payout: 20000, count: 1, subtotal: 20000 },
        ],
        foreignCount: 1,
        foreignBonus: 2500,
        dailyTotal: 87500,
      },
      {
        name: '実績例B（好調日・20分＆外国人多め）',
        breakdown: [
          { time: '15分', payout: 5000, count: 4, subtotal: 20000 },
          { time: '20分', payout: 7500, count: 3, subtotal: 22500 },
          { time: '30分', payout: 10000, count: 1, subtotal: 10000 },
          { time: '45分', payout: 15000, count: 1, subtotal: 15000 },
          { time: '60分', payout: 20000, count: 1, subtotal: 20000 },
        ],
        foreignCount: 2,
        foreignBonus: 5000,
        dailyTotal: 92500,
      },
      {
        name: '実績例C（基本ペース・人気コース中心）',
        breakdown: [
          { time: '15分', payout: 5000, count: 6, subtotal: 30000 },
          { time: '20分', payout: 7500, count: 2, subtotal: 15000 },
          { time: '30分', payout: 10000, count: 1, subtotal: 10000 },
          { time: '45分', payout: 15000, count: 1, subtotal: 15000 },
          { time: '60分', payout: 20000, count: 0, subtotal: 0 },
        ],
        foreignCount: 1,
        foreignBonus: 2500,
        dailyTotal: 72500,
      },
      {
        name: '実績例D（15分中心・堅実ライン）',
        breakdown: [
          { time: '15分', payout: 5000, count: 8, subtotal: 40000 },
          { time: '20分', payout: 7500, count: 1, subtotal: 7500 },
          { time: '30分', payout: 10000, count: 1, subtotal: 10000 },
          { time: '45分', payout: 15000, count: 0, subtotal: 0 },
          { time: '60分', payout: 20000, count: 0, subtotal: 0 },
        ],
        foreignCount: 1,
        foreignBonus: 2500,
        dailyTotal: 60000,
      },
      {
        name: '実績例E（最低保証・15分のみ）',
        breakdown: [
          { time: '15分', payout: 5000, count: 10, subtotal: 50000 },
          { time: '20分', payout: 7500, count: 0, subtotal: 0 },
          { time: '30分', payout: 10000, count: 0, subtotal: 0 },
          { time: '45分', payout: 15000, count: 0, subtotal: 0 },
          { time: '60分', payout: 20000, count: 0, subtotal: 0 },
        ],
        foreignCount: 0,
        foreignBonus: 0,
        dailyTotal: 50000,
      },
    ],
  },

  // ② 標準ペース（20本）: 日給 約 100,000円 〜 162,500円
  standard: {
    minDaily: 100000,
    maxDaily: 162500,
    patterns: [
      {
        name: '実績例A（全コース満遍なく）',
        breakdown: [
          { time: '15分', payout: 5000, count: 11, subtotal: 55000 },
          { time: '20分', payout: 7500, count: 5, subtotal: 37500 },
          { time: '30分', payout: 10000, count: 2, subtotal: 20000 },
          { time: '45分', payout: 15000, count: 1, subtotal: 15000 },
          { time: '60分', payout: 20000, count: 1, subtotal: 20000 },
        ],
        foreignCount: 3,
        foreignBonus: 7500,
        dailyTotal: 155000,
      },
      {
        name: '実績例B（好調日・ゆったり多め＆外国人多数）',
        breakdown: [
          { time: '15分', payout: 5000, count: 10, subtotal: 50000 },
          { time: '20分', payout: 7500, count: 5, subtotal: 37500 },
          { time: '30分', payout: 10000, count: 3, subtotal: 30000 },
          { time: '45分', payout: 15000, count: 1, subtotal: 15000 },
          { time: '60分', payout: 20000, count: 1, subtotal: 20000 },
        ],
        foreignCount: 4,
        foreignBonus: 10000,
        dailyTotal: 162500,
      },
      {
        name: '実績例C（標準バランス・人気型）',
        breakdown: [
          { time: '15分', payout: 5000, count: 12, subtotal: 60000 },
          { time: '20分', payout: 7500, count: 5, subtotal: 37500 },
          { time: '30分', payout: 10000, count: 2, subtotal: 20000 },
          { time: '45分', payout: 15000, count: 1, subtotal: 15000 },
          { time: '60分', payout: 20000, count: 0, subtotal: 0 },
        ],
        foreignCount: 2,
        foreignBonus: 5000,
        dailyTotal: 137500,
      },
      {
        name: '実績例D（回転重視・堅実ライン）',
        breakdown: [
          { time: '15分', payout: 5000, count: 15, subtotal: 75000 },
          { time: '20分', payout: 7500, count: 3, subtotal: 22500 },
          { time: '30分', payout: 10000, count: 1, subtotal: 10000 },
          { time: '45分', payout: 15000, count: 1, subtotal: 15000 },
          { time: '60分', payout: 20000, count: 0, subtotal: 0 },
        ],
        foreignCount: 2,
        foreignBonus: 5000,
        dailyTotal: 127500,
      },
      {
        name: '実績例E（最低保証・15分のみ）',
        breakdown: [
          { time: '15分', payout: 5000, count: 20, subtotal: 100000 },
          { time: '20分', payout: 7500, count: 0, subtotal: 0 },
          { time: '30分', payout: 10000, count: 0, subtotal: 0 },
          { time: '45分', payout: 15000, count: 0, subtotal: 0 },
          { time: '60分', payout: 20000, count: 0, subtotal: 0 },
        ],
        foreignCount: 0,
        foreignBonus: 0,
        dailyTotal: 100000,
      },
    ],
  },

  // ③ がっつり（30本）: 日給 約 150,000円 〜 237,500円
  high: {
    minDaily: 150000,
    maxDaily: 237500,
    patterns: [
      {
        name: '実績例A（全コース満遍なく）',
        breakdown: [
          { time: '15分', payout: 5000, count: 17, subtotal: 85000 },
          { time: '20分', payout: 7500, count: 7, subtotal: 52500 },
          { time: '30分', payout: 10000, count: 3, subtotal: 30000 },
          { time: '45分', payout: 15000, count: 2, subtotal: 30000 },
          { time: '60分', payout: 20000, count: 1, subtotal: 20000 },
        ],
        foreignCount: 4,
        foreignBonus: 10000,
        dailyTotal: 227500,
      },
      {
        name: '実績例B（最高実績・ロング多数大盛況）',
        breakdown: [
          { time: '15分', payout: 5000, count: 16, subtotal: 80000 },
          { time: '20分', payout: 7500, count: 7, subtotal: 52500 },
          { time: '30分', payout: 10000, count: 3, subtotal: 30000 },
          { time: '45分', payout: 15000, count: 2, subtotal: 30000 },
          { time: '60分', payout: 20000, count: 2, subtotal: 40000 },
        ],
        foreignCount: 2,
        foreignBonus: 5000,
        dailyTotal: 237500,
      },
      {
        name: '実績例C（高稼働バランス型）',
        breakdown: [
          { time: '15分', payout: 5000, count: 18, subtotal: 90000 },
          { time: '20分', payout: 7500, count: 7, subtotal: 52500 },
          { time: '30分', payout: 10000, count: 3, subtotal: 30000 },
          { time: '45分', payout: 15000, count: 1, subtotal: 15000 },
          { time: '60分', payout: 20000, count: 1, subtotal: 20000 },
        ],
        foreignCount: 3,
        foreignBonus: 7500,
        dailyTotal: 215000,
      },
      {
        name: '実績例D（回転重視・堅実ライン）',
        breakdown: [
          { time: '15分', payout: 5000, count: 22, subtotal: 110000 },
          { time: '20分', payout: 7500, count: 5, subtotal: 37500 },
          { time: '30分', payout: 10000, count: 2, subtotal: 20000 },
          { time: '45分', payout: 15000, count: 1, subtotal: 15000 },
          { time: '60分', payout: 20000, count: 0, subtotal: 0 },
        ],
        foreignCount: 3,
        foreignBonus: 7500,
        dailyTotal: 190000,
      },
      {
        name: '実績例E（最低保証・15分のみ）',
        breakdown: [
          { time: '15分', payout: 5000, count: 30, subtotal: 150000 },
          { time: '20分', payout: 7500, count: 0, subtotal: 0 },
          { time: '30分', payout: 10000, count: 0, subtotal: 0 },
          { time: '45分', payout: 15000, count: 0, subtotal: 0 },
          { time: '60分', payout: 20000, count: 0, subtotal: 0 },
        ],
        foreignCount: 0,
        foreignBonus: 0,
        dailyTotal: 150000,
      },
    ],
  },
};

const MONTHLY_DAYS_MAP: Record<number, number> = {
  1: 4,
  2: 9,
  3: 13,
  4: 17,
  5: 22,
  6: 26,
};

const PACE_METAS = {
  relaxed: { 
    label: 'ゆったり安心', 
    totalCount: 10, 
    rangeText: '日給 約 50,000円 〜 92,500円',
    desc: '1日10本・初めての方や無理のないペース' 
  },
  standard: { 
    label: '標準ペース', 
    totalCount: 20, 
    rangeText: '日給 約 100,000円 〜 162,500円',
    desc: '1日20本・一番多い平均的な稼働' 
  },
  high: { 
    label: 'がっつり', 
    totalCount: 30, 
    rangeText: '日給 約 150,000円 〜 237,500円',
    desc: '1日30本・本気で最大効率で稼ぐ' 
  },
};

// コース別の基本給与定義（既存の金額を厳守）
const COURSE_LIST = [
  {
    name: '15分コース',
    time: '15分',
    payout: '5,000円',
    condition: '売上50%完全バック',
    desc: '最も件数が多く回転が早い基本コース。短時間で負担なく接客できます。',
    tag: '基本コース'
  },
  {
    name: '20分コース',
    time: '20分',
    payout: '7,500円',
    condition: '売上50%完全バック',
    desc: 'お客様に最も選ばれている一番人気コース。和やかな会話を楽しめます。',
    tag: '一番人気'
  },
  {
    name: '30分コース',
    time: '30分',
    payout: '10,000円',
    condition: '売上50%完全バック',
    desc: '少しゆったり過ごしたいお客様向けの落ち着いたコースです。',
    tag: 'ゆったり'
  },
  {
    name: '45分コース',
    time: '45分',
    payout: '15,000円',
    condition: '売上50%完全バック',
    desc: '常連様や会話をじっくり楽しみたい方向けのロングコースです。',
    tag: 'ロング'
  },
  {
    name: '60分コース',
    time: '60分',
    payout: '20,000円',
    condition: '売上50%完全バック',
    desc: '1回の接客でしっかり稼げる特ロングコース。長時間の歓談となります。',
    tag: '高単価'
  },
  {
    name: '外国人対応手当',
    time: '都度追加',
    payout: '+2,500円',
    condition: '通常のコース報酬に上乗せ',
    desc: '外国人のお客様を担当された際、コース料金とは別に毎回プラス支給されます。',
    tag: '手当支給'
  },
];

// 待遇の6つのカード
const TREATMENT_CARDS = [
  {
    id: 'treatment-zero-deduction',
    icon: 'ShieldCheck',
    title: '雑費・天引き 完全0円',
    summary: '待機料・厚生費・ロッカー代などの差し引きは一切なし。稼いだお給料がそのまま全額手元に残ります。',
    points: [
      '売上50%完全バック・退勤時に全額現金手渡し',
      '待機料・ロッカー代・部屋使用料・雑費など名目を問わず天引きゼロ',
      'お客様からのチップも100%女性のもの（店舗の天引きなし）'
    ]
  },
  {
    id: 'treatment-dorm',
    icon: 'Home',
    title: '家具家電付きオートロック個室マンション寮完備',
    summary: '敷金・礼金・初期費用0円で即日入居可能。カバン1つで清潔な完全個室の新生活をスタートできます。',
    points: [
      '冷蔵庫・洗濯機・電子レンジ・テレビ・ベッド・エアコン・無料Wi-Fi完備',
      'オートロック＆モニター付きインターホンで防犯・プライバシーも万全',
      '店舗まで徒歩圏内・即日入居手続きに対応'
    ]
  },
  {
    id: 'treatment-transport',
    icon: 'Train',
    title: '遠方・地方からの往復交通費全額支給',
    summary: '全国各地からの出稼ぎ希望者へ、往復交通費を全額当店が負担・支給いたします。',
    points: [
      '新幹線・飛行機・特急・高速夜行バスなど実費往復全額支給',
      '領収書をお持ちいただければ初日稼働後に現金精算手渡し',
      '短期集中（2泊3日〜週末のみ）から長期滞在まで柔軟に対応'
    ]
  },
  {
    id: 'treatment-costume',
    icon: 'Sparkles',
    title: '衣装・ドレス・靴・ヘアメイク一式無料貸出',
    summary: '事前準備や持参物は一切不要。トレンドのドレスや浴衣、着物、コスメまで全て揃っています。',
    points: [
      'ドレス、ワンピース、和装（着物・浴衣）、ヒール靴まで全サイズ完備',
      'ヘアアイロン（コテ・ストレート）、コスメ・アメニティも自由に使用可能',
      '私服手ぶらで出勤し、お仕事後に着替えてそのまま帰宅OK'
    ]
  },
  {
    id: 'treatment-alcohol-free',
    icon: 'Coffee',
    title: 'お酒・アルコール一切不要＆ノルマなし',
    summary: 'お酒を飲む必要は一切ありません。ソフトドリンクでリラックスしておもてなしできます。',
    points: [
      'お酒が全く飲めない方、苦手な方、翌日に本業や学業がある方も安心',
      '売上ノルマ・指名ノルマ・同伴プレッシャー・ペナルティ罰金なし',
      '1回15〜20分の短時間接客で、無理なく自分のペースで稼げます'
    ]
  },
  {
    id: 'treatment-support',
    icon: 'HeartHandshake',
    title: '専任女性スタッフ常駐＆身バレ防止',
    summary: '街全体が撮影禁止で身バレを防ぎます。専任女性スタッフが体調管理やシフト相談に対応します。',
    points: [
      'WEBサイトやSNSへの顔写真・プロフィール掲載は一切なし（完全非公開）',
      '会社員の方には副業が知られない「住民税の普通徴収手続き」をご案内',
      '完全源氏名（お仕事用のお名前）使用・個人情報は施錠管理'
    ]
  }
];

// 待遇比較表データ
const TREATMENT_COMPARISONS = [
  {
    item: '雑費・天引き',
    ourShop: '完全0円（引かれ物一切なし）',
    otherShop: '日給から待機料・厚生費など5,000〜15,000円引かれる場合あり'
  },
  {
    item: '給与の支給形態',
    ourShop: '売上50%完全即日全額日払い（現金手渡し）',
    otherShop: '一部日払いのみ、残りは翌月振込や調整金保留'
  },
  {
    item: '交通費',
    ourShop: '地方・遠方からの往復交通費を全額支給',
    otherShop: '自己負担、または規定売上未達の場合は支給なし'
  },
  {
    item: '寮・住居',
    ourShop: '家具家電付きオートロック完全個室マンション寮（即日OK）',
    otherShop: '相部屋・雑居ビルの一室、または敷金・保証金が必要'
  },
  {
    item: '衣装・ヘアメイク',
    ourShop: 'ドレス・着物・靴・コスメ・ヘアアイロンすべて無料貸出',
    otherShop: '衣装レンタル代やクリーニング代が日給から引かれる'
  },
  {
    item: 'お酒・飲酒',
    ourShop: '完全不要（ソフトドリンク中心・下戸歓迎）',
    otherShop: 'お酒の付き合いが必須、二日酔いや体調不良のリスク'
  },
  {
    item: '写真掲載・プライバシー',
    ourShop: 'ネット写真ゼロ（完全非公開）・街全体が撮影禁止',
    otherShop: 'HPやSNSへの顔写真・体型写真掲載を求められる'
  }
];

// よくある質問
const SALARY_FAQS = [
  {
    q: '給料は本当にその日のうちに全額支払われますか？',
    a: 'はい、退勤時にその日の売上50%（＋外国人対応手当など）を全額その場で現金手渡しいたします。「一部だけ日払いで残りは翌月振込」といった保留や繰り越しは一切ありません。'
  },
  {
    q: '給料の計算方法や引かれ物について教えてください。',
    a: '飛田新地料理組合の規定により、売上のきっちり50%が手取りとなります。待機料、厚生費、部屋使用料、衣装レンタル代などの天引き・雑費は一切ありません。稼いだ金額がそのまま手元に残ります。'
  },
  {
    q: '自分の希望する出勤日数や時間帯で働けますか？',
    a: 'はい、自由出勤制のためご自身の都合に合わせて働けます。週1日だけ、昼の部（10:00〜17:00）だけ、週末のみの出稼ぎなど、生活スタイルに合わせてシフトを決定していただけます。'
  },
  {
    q: '完全な未経験でも給与の仕組みを理解できますか？',
    a: 'はい、仕組みは非常にシンプルです。コースごとに手取り額（15分5,000円、20分7,500円など）が最初から固定されており、接客した本数を掛け算するだけです。出勤初日に女性スタッフが丁寧に説明いたします。'
  },
  {
    q: '寮や住居の利用条件について事前に相談できますか？',
    a: 'はい、可能です。オートロック・家具家電完備の個室マンションをご用意しており、初期費用や保証人は不要です。即日入居のご相談や入居期間について、LINEでお気軽にご質問いただけます。'
  },
  {
    q: '家族や本業の会社に身バレしないか心配ですが、相談できますか？',
    a: 'ご安心ください。WEBサイトへの写真掲載は一切行わず、街全体で写真・動画撮影が厳禁となっています。会社員の方には副業がバレない「住民税の普通徴収」の手続きマニュアルもご案内しています。'
  },
  {
    q: '応募を決める前に、待遇や給与について質問だけでも大丈夫ですか？',
    a: 'もちろん大歓迎です。応募を前提としない気軽なご質問だけでも女性スタッフが親身に対応いたします。「まずは給与の目安だけ聞きたい」という方も遠慮なくLINEからご連絡ください。'
  }
];

export default function SalaryPage({
  onNavigateHome,
  onNavigateBlog,
  onNavigateFaq,
  onCtaclick,
  onInjectedScroll,
}: SalaryPageProps) {
  // Sliders & inputs for Simulator
  const [daysPerWeek, setDaysPerWeek] = useState<number>(3);
  const [hoursPerDay, setHoursPerDay] = useState<number>(8);
  const [showBreakdown, setShowBreakdown] = useState<boolean>(true);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // 勤務時間に応じた現実的な稼働ペース自動算出
  const paceMode: 'relaxed' | 'standard' | 'high' =
    hoursPerDay <= 7 ? 'relaxed' : hoursPerDay <= 9 ? 'standard' : 'high';

  // アクセスごとに数字を変えるインデックス
  const [variationIndex, setVariationIndex] = useState<number>(() => {
    return Math.floor(Math.random() * 5);
  });

  const handleLineClick = (messageText: string) => {
    if (onInjectedScroll) {
      onInjectedScroll(messageText);
    } else {
      window.open(LINE_OFFICIAL_URL, '_blank', 'noopener,noreferrer');
    }
  };

  // Calculations for Simulator
  const calculated = useMemo(() => {
    const config = REAL_VARIATIONS[paceMode];
    const patterns = config.patterns;
    const item = patterns[variationIndex % patterns.length];
    
    const totalCount = PACE_METAS[paceMode].totalCount;
    const breakdownItems = item.breakdown;
    const foreignCount = item.foreignCount;
    const foreignBonus = item.foreignBonus;
    const dailyNetIncome = item.dailyTotal;

    const monthlyDays = MONTHLY_DAYS_MAP[daysPerWeek] || Math.round(daysPerWeek * 4.33);
    const monthlyNetIncome = dailyNetIncome * monthlyDays;
    const minMonthly = config.minDaily * monthlyDays;
    const maxMonthly = config.maxDaily * monthlyDays;

    return {
      totalCount,
      minDaily: config.minDaily,
      maxDaily: config.maxDaily,
      minMonthly,
      maxMonthly,
      variationName: item.name,
      breakdownItems,
      foreignCount,
      foreignBonus,
      dailyNetIncome,
      monthlyDays,
      monthlyNetIncome,
    };
  }, [daysPerWeek, hoursPerDay, paceMode, variationIndex]);

  return (
    <div className="bg-[#FFF9FB] min-h-screen text-[#35313A] pb-28 pt-4 sm:pt-6 font-sans antialiased selection:bg-[#FCE8EF] selection:text-[#D94B7A]">
      
      {/* 1. パンくずリスト */}
      <div className="max-w-[1140px] mx-auto px-4 sm:px-6 mb-4">
        <nav aria-label="Breadcrumb" className="flex items-center text-xs">
          <ol className="flex items-center gap-1.5 flex-wrap text-[#85818A]">
            <li className="flex items-center gap-1">
              <button
                type="button"
                onClick={onNavigateHome}
                className="hover:text-[#D94B7A] font-bold flex items-center gap-1 text-[#35313A] hover:underline cursor-pointer"
              >
                <LucideIcon name="Home" size={13} className="text-[#D94B7A]" />
                <span>飛田新地求人（トップ）</span>
              </button>
            </li>
            <li className="text-[#F0E5EA]">/</li>
            <li className="flex items-center gap-1 text-[#D94B7A] font-bold" aria-current="page">
              <span>給料・待遇</span>
            </li>
          </ol>
        </nav>
      </div>

      {/* ページ内クイックナビゲーション（アンカーリンク） */}
      <div className="max-w-[1100px] mx-auto px-4 sm:px-6 mb-8">
        <div className="bg-white rounded-2xl p-2.5 sm:p-3 border border-[#F0E5EA] shadow-2xs flex items-center gap-2 overflow-x-auto scrollbar-none text-xs font-bold text-[#35313A]">
          <span className="text-[#85818A] text-[11px] shrink-0 px-2 flex items-center gap-1">
            <LucideIcon name="List" size={13} className="text-[#D94B7A]" />
            <span>目次:</span>
          </span>
          <a href="#salary-top" className="px-3 py-1.5 rounded-xl bg-[#FCE8EF]/70 hover:bg-[#FCE8EF] text-[#D94B7A] whitespace-nowrap transition-colors">
            ① 給料の基本
          </a>
          <a href="#salary-flow" className="px-3 py-1.5 rounded-xl bg-[#FFF9FB] hover:bg-[#FCE8EF]/50 text-[#35313A] whitespace-nowrap transition-colors">
            ② 給料の決まり方
          </a>
          <a href="#course-list" className="px-3 py-1.5 rounded-xl bg-[#FFF9FB] hover:bg-[#FCE8EF]/50 text-[#35313A] whitespace-nowrap transition-colors">
            ③ コース別一覧
          </a>
          <a href="#simulator" className="px-3 py-1.5 rounded-xl bg-[#FFF9FB] hover:bg-[#FCE8EF]/50 text-[#35313A] whitespace-nowrap transition-colors">
            ④ 収入試算
          </a>
          <a href="#models" className="px-3 py-1.5 rounded-xl bg-[#FFF9FB] hover:bg-[#FCE8EF]/50 text-[#35313A] whitespace-nowrap transition-colors">
            ⑤ 働き方モデル
          </a>
          <a href="#treatment-section" className="px-3 py-1.5 rounded-xl bg-[#FFF9FB] hover:bg-[#FCE8EF]/50 text-[#35313A] whitespace-nowrap transition-colors">
            ⑥ 待遇・サポート
          </a>
          <a href="#faq-section" className="px-3 py-1.5 rounded-xl bg-[#FFF9FB] hover:bg-[#FCE8EF]/50 text-[#35313A] whitespace-nowrap transition-colors">
            ⑦ よくある質問
          </a>
          <a href="#contact-section" className="px-3 py-1.5 rounded-xl bg-[#06C755]/10 hover:bg-[#06C755]/20 text-[#06C755] font-extrabold whitespace-nowrap transition-colors ml-auto">
            LINE相談
          </a>
        </div>
      </div>

      <div className="max-w-[1100px] mx-auto px-4 sm:px-6 space-y-12 sm:space-y-16">
        
        {/* =========================================================
            SECTION 3: ページ上部「給料」のファーストビュー
           ========================================================= */}
        <section id="salary-top" className="bg-white rounded-3xl p-6 sm:p-9 md:p-11 border border-[#F0E5EA] shadow-2xs relative overflow-hidden scroll-mt-20">
          <div className="inline-flex items-center gap-1.5 bg-[#FCE8EF] text-[#D94B7A] text-[12px] font-bold px-3.5 py-1.5 rounded-full mb-4 border border-[#F0E5EA]">
            <LucideIcon name="Coins" size={14} className="text-[#D94B7A]" />
            <span>給料</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left: Main Copy & Sub Copy */}
            <div className="lg:col-span-7 space-y-4">
              <h1 className="font-display font-black text-2xl sm:text-3xl md:text-[32px] text-[#35313A] leading-snug tracking-tight">
                頑張り方も、収入の目安も。<br />
                <span className="text-[#D94B7A]">自分のペースで考えられる給与システム。</span>
              </h1>

              <p className="text-sm sm:text-base text-[#35313A] font-bold leading-relaxed">
                売上50%完全バック・退勤時に全額即日現金手渡し。
              </p>

              <p className="text-xs sm:text-[14px] text-[#85818A] leading-relaxed">
                飛田新地の料亭における給与は、料理組合公認の分かりやすい報酬体系です。お酒を飲む必要がなく、1回15〜20分の短時間接客の積み重ねで、無理なく自分のペースで稼げる仕組みを整えています。
              </p>

              {/* スマートフォン・PC共通: 給料の4大ポイント */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="bg-[#FFF9FB] p-3.5 rounded-2xl border border-[#F0E5EA] space-y-1">
                  <span className="text-[11px] font-bold text-[#D94B7A] block">POINT 01</span>
                  <h3 className="font-bold text-xs sm:text-sm text-[#35313A]">売上50%即日全額日払い</h3>
                  <p className="text-[11px] sm:text-xs text-[#85818A] leading-relaxed">
                    当日の売上50%を退勤時に全額現金手渡し。翌月振込や保留は一切ありません。
                  </p>
                </div>

                <div className="bg-[#FFF9FB] p-3.5 rounded-2xl border border-[#F0E5EA] space-y-1">
                  <span className="text-[11px] font-bold text-[#D94B7A] block">POINT 02</span>
                  <h3 className="font-bold text-xs sm:text-sm text-[#35313A]">雑費・天引き完全0円</h3>
                  <p className="text-[11px] sm:text-xs text-[#85818A] leading-relaxed">
                    待機料、厚生費、ロッカー代、衣装代などの引かれ物は名目を問わず一切なし。
                  </p>
                </div>

                <div className="bg-[#FFF9FB] p-3.5 rounded-2xl border border-[#F0E5EA] space-y-1">
                  <span className="text-[11px] font-bold text-[#D94B7A] block">POINT 03</span>
                  <h3 className="font-bold text-xs sm:text-sm text-[#35313A]">明確なコース別手取り</h3>
                  <p className="text-[11px] sm:text-xs text-[#85818A] leading-relaxed">
                    15分5,000円、20分7,500円など最初から固定。外国人手当（+2,500円）もプラス。
                  </p>
                </div>

                <div className="bg-[#FFF9FB] p-3.5 rounded-2xl border border-[#F0E5EA] space-y-1">
                  <span className="text-[11px] font-bold text-[#D94B7A] block">POINT 04</span>
                  <h3 className="font-bold text-xs sm:text-sm text-[#35313A]">チップは全額女性のもの</h3>
                  <p className="text-[11px] sm:text-xs text-[#85818A] leading-relaxed">
                    お客様からいただいたチップはお店の天引きゼロで、100%女性自身に手渡し。
                  </p>
                </div>
              </div>

              {/* LINE相談ボタン */}
              <div className="pt-2">
                <a
                  href={LINE_OFFICIAL_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => {
                    e.preventDefault();
                    handleLineClick('【給料の質問】給料システムや日払いについて詳しく聞いてみたいです。');
                  }}
                  className="inline-flex items-center justify-center gap-2 bg-[#06C755] hover:bg-[#05b34c] text-white font-bold text-xs sm:text-sm px-6 py-3.5 rounded-2xl shadow-xs transition-all cursor-pointer w-full sm:w-auto"
                >
                  <LucideIcon name="MessageCircle" size={17} />
                  <span>給料についてLINEで相談する</span>
                  <span className="text-[11px] bg-white/20 px-2 py-0.5 rounded-full">相談だけでもOK</span>
                </a>
              </div>
            </div>

            {/* Right: 写真（和モダンな落ち着いた空間・個人特定なし） */}
            <div className="lg:col-span-5 space-y-4">
              <div className="rounded-2xl overflow-hidden border border-[#F0E5EA] shadow-2xs bg-zinc-100 relative group">
                <img
                  src="/images/tobita_salary_calculator_1788153012478.jpg"
                  alt="飛田新地 清潔感のある料亭個室と安心の給料システム"
                  className="w-full h-52 sm:h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="eager"
                  onError={(e) => {
                    const target = e.currentTarget;
                    target.src = '/images/tobita_luxury_room_1788153103866.jpg';
                  }}
                />
                <div className="absolute bottom-2.5 left-2.5 bg-black/65 backdrop-blur-xs text-white text-[11px] font-bold px-3 py-1 rounded-lg">
                  料亭個室（落ち着いた和モダン空間・冷暖房完備）
                </div>
              </div>
            </div>
          </div>
        </section>


        {/* =========================================================
            SECTION 4: 給料の仕組みを分かりやすく説明
           ========================================================= */}
        <section id="salary-flow" className="bg-white rounded-3xl p-6 sm:p-9 md:p-10 border border-[#F0E5EA] shadow-2xs scroll-mt-20">
          <div className="max-w-2xl mb-8">
            <span className="text-[11px] font-bold text-[#D94B7A] bg-[#FCE8EF] border border-[#F0E5EA] px-3.5 py-1 rounded-full inline-block mb-2">
              計算の仕組み
            </span>
            <h2 className="text-xl sm:text-2xl md:text-[23px] font-black text-[#35313A] tracking-tight">
              給料はどうやって決まるの？
            </h2>
            <p className="text-xs sm:text-[14px] text-[#85818A] mt-2 leading-relaxed">
              複雑な歩合計算や不明瞭な控除はありません。接客したコースの手取り単価をそのまま足していくだけの明快な計算式です。
            </p>
          </div>

          {/* フロー図解（4ステップ） */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 relative">
            {/* Step 1 */}
            <div className="bg-[#FFF9FB] p-4.5 rounded-2xl border border-[#F0E5EA] flex flex-col justify-between">
              <div>
                <span className="text-[11px] font-mono font-bold text-[#D94B7A] block mb-1">STEP 01</span>
                <h3 className="font-bold text-sm sm:text-base text-[#35313A] mb-1.5">接客するコース・条件</h3>
                <p className="text-xs text-[#85818A] leading-relaxed">
                  お客様が選んだコース（15分〜60分）やお部屋でのサービス内容を確認します。
                </p>
              </div>
              <div className="mt-3 pt-2.5 border-t border-[#F0E5EA] text-[11px] font-bold text-[#35313A]">
                15分〜60分・外国人対応
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-[#FFF9FB] p-4.5 rounded-2xl border border-[#F0E5EA] flex flex-col justify-between">
              <div>
                <span className="text-[11px] font-mono font-bold text-[#D94B7A] block mb-1">STEP 02</span>
                <h3 className="font-bold text-sm sm:text-base text-[#35313A] mb-1.5">該当する報酬</h3>
                <p className="text-xs text-[#85818A] leading-relaxed">
                  各コースごとに売上の50%が女性の手取りとして固定されています。
                </p>
              </div>
              <div className="mt-3 pt-2.5 border-t border-[#F0E5EA] text-[11px] font-bold text-[#D94B7A]">
                1回 5,000円〜20,000円
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-[#FFF9FB] p-4.5 rounded-2xl border border-[#F0E5EA] flex flex-col justify-between">
              <div>
                <span className="text-[11px] font-mono font-bold text-[#D94B7A] block mb-1">STEP 03</span>
                <h3 className="font-bold text-sm sm:text-base text-[#35313A] mb-1.5">勤務実績に応じた計算</h3>
                <p className="text-xs text-[#85818A] leading-relaxed">
                  【コース報酬 × 接客本数】＋【外国人手当2,500円 × 本数】をそのまま積算します。
                </p>
              </div>
              <div className="mt-3 pt-2.5 border-t border-[#F0E5EA] text-[11px] font-bold text-[#35313A]">
                本数×単価の明快な合計
              </div>
            </div>

            {/* Step 4 */}
            <div className="bg-[#FFF9FB] p-4.5 rounded-2xl border border-[#F0E5EA] flex flex-col justify-between">
              <div>
                <span className="text-[11px] font-mono font-bold text-[#D94B7A] block mb-1">STEP 04</span>
                <h3 className="font-bold text-sm sm:text-base text-[#35313A] mb-1.5">支給される金額</h3>
                <p className="text-xs text-[#85818A] leading-relaxed">
                  退勤時に計算した全額をその場で現金手渡し。天引きや差し引きは0円です。
                </p>
              </div>
              <div className="mt-3 pt-2.5 border-t border-[#F0E5EA] text-[11px] font-bold text-emerald-700">
                即日全額現金手渡し
              </div>
            </div>
          </div>

          {/* 控除・天引きに関する明確な告知 */}
          <div className="mt-6 p-4 rounded-2xl bg-[#FCE8EF]/50 border border-[#F0E5EA] text-xs text-[#35313A] flex items-start gap-2.5">
            <LucideIcon name="ShieldCheck" size={17} className="text-[#D94B7A] shrink-0 mt-0.5" />
            <div>
              <strong className="block font-bold mb-0.5">控除・天引きルールについて：</strong>
              <span>
                当店では、厚生費・ロッカー代・雑費・衣装レンタル代などの引かれ物は一切発生しません。罰金やペナルティ制度もなく、計算された金額がそのままご自身の手取りとなります。
              </span>
            </div>
          </div>
        </section>


        {/* =========================================================
            SECTION 5: コース別給与一覧の改善
           ========================================================= */}
        <section id="course-list" className="bg-white rounded-3xl p-6 sm:p-9 md:p-10 border border-[#F0E5EA] shadow-2xs scroll-mt-20">
          <div className="max-w-2xl mb-8">
            <span className="text-[11px] font-bold text-[#D94B7A] bg-[#FCE8EF] border border-[#F0E5EA] px-3.5 py-1 rounded-full inline-block mb-2">
              報酬一覧
            </span>
            <h2 className="text-xl sm:text-2xl md:text-[23px] font-black text-[#35313A] tracking-tight">
              コース別の給与一覧
            </h2>
            <p className="text-xs sm:text-[14px] text-[#85818A] mt-2 leading-relaxed">
              接客時間に応じた女性の手取り金額です。各コースの違いが一目で分かるよう整理しています。
            </p>
          </div>

          {/* PC用: テーブル形式 / スマホ用: カード形式 */}
          
          {/* 1. PC向けテーブル表示（md以上） */}
          <div className="hidden md:block overflow-hidden rounded-2xl border border-[#F0E5EA]">
            <table className="w-full text-xs sm:text-sm text-left">
              <thead className="bg-[#FFF9FB] text-[#35313A] font-bold border-b border-[#F0E5EA]">
                <tr>
                  <th className="p-4 whitespace-nowrap">コース名</th>
                  <th className="p-4 whitespace-nowrap">接客時間</th>
                  <th className="p-4 whitespace-nowrap text-[#D94B7A]">手取り報酬</th>
                  <th className="p-4 whitespace-nowrap">計算条件</th>
                  <th className="p-4">特徴・補足説明</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F0E5EA] bg-white">
                {COURSE_LIST.map((c, idx) => (
                  <tr key={idx} className="hover:bg-[#FFF9FB]/50 transition-colors">
                    <td className="p-4 font-bold text-[#35313A] whitespace-nowrap">
                      <span className="inline-block bg-[#FCE8EF] text-[#D94B7A] text-[10px] font-bold px-2 py-0.5 rounded-md mr-2">
                        {c.tag}
                      </span>
                      {c.name}
                    </td>
                    <td className="p-4 text-[#85818A] whitespace-nowrap">{c.time}</td>
                    <td className="p-4 whitespace-nowrap">
                      <span className="font-display font-black text-lg text-[#D94B7A]">
                        {c.payout}
                      </span>
                    </td>
                    <td className="p-4 text-[#85818A] whitespace-nowrap">{c.condition}</td>
                    <td className="p-4 text-[#35313A] text-xs leading-relaxed">{c.desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* 2. スマホ向けカード表示（md未満） */}
          <div className="md:hidden space-y-3">
            {COURSE_LIST.map((c, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-[#FFF9FB] border border-[#F0E5EA] space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="bg-[#FCE8EF] text-[#D94B7A] text-[10px] font-bold px-2 py-0.5 rounded-md">
                      {c.tag}
                    </span>
                    <h3 className="font-bold text-sm text-[#35313A]">{c.name}</h3>
                  </div>
                  <span className="text-xs text-[#85818A]">{c.time}</span>
                </div>

                <div className="flex items-baseline justify-between pt-1 border-t border-[#F0E5EA]/70">
                  <span className="text-xs text-[#85818A]">手取り報酬額</span>
                  <span className="font-display font-black text-xl text-[#D94B7A]">
                    {c.payout}
                  </span>
                </div>

                <div className="text-[11px] text-[#85818A] leading-relaxed pt-1">
                  <p>{c.desc}</p>
                  <p className="text-[#35313A] font-medium mt-0.5">※{c.condition}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 p-3 bg-zinc-50 rounded-xl border border-[#F0E5EA] text-[11px] text-[#85818A]">
            ※接客はお部屋をアルコールで清拭・除菌してから準備し、終了後のシーツ交換やお部屋の清掃はすべて仲居さんが担当します。
          </div>
        </section>


        {/* =========================================================
            SECTION 6: 収入シミュレーターの大幅改善
           ========================================================= */}
        <section id="simulator" className="bg-white rounded-3xl p-6 sm:p-9 md:p-10 border border-[#F0E5EA] shadow-2xs scroll-mt-20">
          <div className="max-w-2xl mb-8">
            <span className="text-[11px] font-bold text-[#D94B7A] bg-[#FCE8EF] border border-[#F0E5EA] px-3.5 py-1 rounded-full inline-block mb-2">
              試算ツール
            </span>
            <h2 className="text-xl sm:text-2xl md:text-[23px] font-black text-[#35313A] tracking-tight">
              あなたの希望に合わせた収入シミュレーション
            </h2>
            <p className="text-xs sm:text-[14px] text-[#85818A] mt-2 leading-relaxed">
              出勤日数や勤務時間などを選択すると、条件に応じた収入の目安を確認できます。
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* 操作部分（スマホでは上） */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* 1. 週の出勤日数 */}
              <div className="bg-[#FFF9FB] p-4.5 rounded-2xl border border-[#F0E5EA]">
                <div className="flex justify-between items-center mb-2">
                  <div>
                    <label className="text-xs sm:text-sm font-bold text-[#35313A] block">
                      週の出勤日数
                    </label>
                    <span className="text-[11px] text-[#85818A]">スライダーで日数を調整できます</span>
                  </div>
                  <span className="text-sm font-extrabold text-[#D94B7A] font-mono bg-white px-3 py-1 rounded-full border border-[#F0E5EA] shadow-2xs">
                    週 {daysPerWeek} 日（月 {calculated.monthlyDays} 日勤務）
                  </span>
                </div>
                <input 
                  type="range" 
                  min={1} 
                  max={6} 
                  step={1}
                  value={daysPerWeek}
                  onChange={(e) => setDaysPerWeek(Number(e.target.value))}
                  className="w-full accent-[#D94B7A] cursor-pointer h-2 bg-[#FCE8EF] rounded-lg mt-2"
                />
                <div className="flex justify-between text-[11px] text-[#85818A] mt-1.5 font-medium">
                  <span>週1日（月4日）</span>
                  <span>週3日（月13日・標準）</span>
                  <span>週5〜6日（月22〜26日）</span>
                </div>
              </div>

              {/* 2. 1日の勤務時間 */}
              <div className="bg-[#FFF9FB] p-4.5 rounded-2xl border border-[#F0E5EA]">
                <div className="flex justify-between items-center mb-2">
                  <div>
                    <label className="text-xs sm:text-sm font-bold text-[#35313A] block">
                      1日の勤務時間
                    </label>
                    <span className="text-[11px] text-[#85818A]">朝シフト・夕方シフト・フルタイム</span>
                  </div>
                  <span className="text-sm font-extrabold text-[#D94B7A] font-mono bg-white px-3 py-1 rounded-full border border-[#F0E5EA] shadow-2xs">
                    1日 {hoursPerDay} 時間
                  </span>
                </div>
                <input 
                  type="range" 
                  min={6} 
                  max={12} 
                  step={1}
                  value={hoursPerDay}
                  onChange={(e) => setHoursPerDay(Number(e.target.value))}
                  className="w-full accent-[#D94B7A] cursor-pointer h-2 bg-[#FCE8EF] rounded-lg mt-2"
                />
                <div className="flex justify-between text-[11px] text-[#85818A] mt-1.5 font-medium">
                  <span>6〜7時間（短時間・昼職後）</span>
                  <span>8時間（標準）</span>
                  <span>10〜12時間（ロング）</span>
                </div>
              </div>

            </div>

            {/* 結果表示（スマホでは下・横幅いっぱい） */}
            <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-7 border-2 border-[#D94B7A]/40 shadow-xs relative">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold text-[#D94B7A] bg-[#FCE8EF] px-3 py-1 rounded-full border border-[#F0E5EA]">
                  試算結果
                </span>
                <button
                  type="button"
                  onClick={() => setVariationIndex(prev => prev + 1)}
                  className="text-[11px] font-bold text-[#85818A] hover:text-[#D94B7A] flex items-center gap-1 cursor-pointer transition-colors"
                  title="別の稼働実績パターンで試算"
                >
                  <LucideIcon name="RefreshCw" size={12} />
                  <span>実績例を切替</span>
                </button>
              </div>

              {/* 月収の金額（30〜36px） */}
              <div className="mb-5 pb-5 border-b border-[#F0E5EA]">
                <span className="text-xs text-[#85818A] block mb-1">
                  あなたの収入目安（月収）
                </span>
                <div className="flex items-baseline gap-2 my-1">
                  <span className="text-[32px] sm:text-[36px] font-black font-display tracking-tight text-[#D94B7A]">
                    {calculated.monthlyNetIncome.toLocaleString()}
                  </span>
                  <span className="text-sm font-bold text-[#35313A]">円 / 月</span>
                </div>
                <span className="text-xs text-[#85818A] block">
                  週{daysPerWeek}日（月{calculated.monthlyDays}日勤務）の場合
                </span>
              </div>

              {/* 日収の金額 */}
              <div className="mb-5 pb-5 border-b border-[#F0E5EA]">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-[#85818A]">1日あたりの目安（日収）</span>
                  <span className="text-[11px] font-bold text-[#35313A] bg-[#FFF9FB] px-2 py-0.5 rounded-full border border-[#F0E5EA]">
                    1日 {calculated.totalCount} 本
                  </span>
                </div>
                <div className="flex items-baseline gap-2 my-1">
                  <span className="text-2xl sm:text-3xl font-black font-display text-[#35313A]">
                    {calculated.dailyNetIncome.toLocaleString()}
                  </span>
                  <span className="text-xs font-bold text-[#85818A]">円 / 日</span>
                </div>
                <p className="text-[11px] text-[#85818A] mt-1">
                  ※退勤時に全額現金手渡し（引かれ物ゼロ）
                </p>
              </div>

              {/* 計算条件 */}
              <div className="mb-5 bg-[#FFF9FB] rounded-2xl p-3.5 border border-[#F0E5EA] text-xs space-y-1.5">
                <div className="font-bold text-[#35313A] mb-1 flex items-center gap-1">
                  <LucideIcon name="CheckCircle" size={13} className="text-[#D94B7A]" />
                  <span>現在の計算条件</span>
                </div>
                <div className="flex justify-between text-[#85818A]">
                  <span>出勤日数:</span>
                  <span className="font-bold text-[#35313A]">週{daysPerWeek}日（月{calculated.monthlyDays}日）</span>
                </div>
                <div className="flex justify-between text-[#85818A]">
                  <span>1日の勤務時間:</span>
                  <span className="font-bold text-[#35313A]">{hoursPerDay}時間</span>
                </div>
                <div className="flex justify-between text-[#85818A]">
                  <span>稼働本数目安:</span>
                  <span className="font-bold text-[#35313A]">1日 約{calculated.totalCount}本（平均稼働ベース）</span>
                </div>
                <div className="flex justify-between text-[#85818A]">
                  <span>報酬計算条件:</span>
                  <span className="font-bold text-[#D94B7A]">売上50%完全バック（天引き0円）</span>
                </div>
              </div>

              {/* 内訳明細アコーディオン */}
              <div className="mb-5 border border-[#F0E5EA] rounded-2xl overflow-hidden bg-white">
                <button
                  type="button"
                  onClick={() => setShowBreakdown(prev => !prev)}
                  className="w-full p-3 text-left flex items-center justify-between text-xs font-bold text-[#35313A] hover:bg-[#FFF9FB] cursor-pointer"
                >
                  <span className="flex items-center gap-1.5">
                    <LucideIcon name="ListChecks" size={14} className="text-[#D94B7A]" />
                    <span>今回の試算内訳明細</span>
                  </span>
                  <LucideIcon name={showBreakdown ? 'ChevronUp' : 'ChevronDown'} size={14} className="text-[#85818A]" />
                </button>
                {showBreakdown && (
                  <div className="p-3 pt-0 text-xs border-t border-[#F0E5EA] divide-y divide-[#F0E5EA]/60 font-mono">
                    {calculated.breakdownItems.map((item, idx) => (
                      <div key={idx} className="flex justify-between items-center py-1.5 text-[#85818A]">
                        <span>{item.time}（{item.payout.toLocaleString()}円 × {item.count}本）</span>
                        <span className="font-bold text-[#35313A]">{item.subtotal.toLocaleString()}円</span>
                      </div>
                    ))}
                    {calculated.foreignCount > 0 && (
                      <div className="flex justify-between items-center py-1.5 text-[#D94B7A]">
                        <span>外国人客手当（+2,500円 × {calculated.foreignCount}本）</span>
                        <span className="font-bold">+{calculated.foreignBonus.toLocaleString()}円</span>
                      </div>
                    )}
                    <div className="flex justify-between items-center pt-2 font-bold text-[#35313A]">
                      <span>日給合計</span>
                      <span className="text-[#D94B7A]">{calculated.dailyNetIncome.toLocaleString()}円</span>
                    </div>
                  </div>
                )}
              </div>

              {/* 注意事項 */}
              <p className="text-[11px] text-[#85818A] leading-relaxed mb-4">
                ※表示金額は選択された条件に基づく試算です。実際の収入は勤務実績や適用条件によって異なります。
              </p>

              {/* LINE相談ボタン */}
              <a
                href={LINE_OFFICIAL_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => {
                  e.preventDefault();
                  handleLineClick(`【シミュレーターからの相談】週${daysPerWeek}日・1日${hoursPerDay}時間の試算（月収約${calculated.monthlyNetIncome.toLocaleString()}円）について詳しく聞いてみたいです。`);
                }}
                className="w-full py-3.5 rounded-2xl bg-[#06C755] hover:bg-[#05b34c] text-white font-bold text-xs sm:text-sm shadow-xs transition-all cursor-pointer flex items-center justify-center gap-2 text-center"
              >
                <LucideIcon name="MessageCircle" size={17} />
                <span>この条件で女性スタッフにLINE相談</span>
              </a>
            </div>

          </div>
        </section>


        {/* =========================================================
            SECTION 7: 実際の収入モデルケース
           ========================================================= */}
        <section id="models" className="bg-white rounded-3xl p-6 sm:p-9 md:p-10 border border-[#F0E5EA] shadow-2xs scroll-mt-20">
          <div className="max-w-2xl mb-8">
            <span className="text-[11px] font-bold text-[#D94B7A] bg-[#FCE8EF] border border-[#F0E5EA] px-3.5 py-1 rounded-full inline-block mb-2">
              モデルケース
            </span>
            <h2 className="text-xl sm:text-2xl md:text-[23px] font-black text-[#35313A] tracking-tight">
              働き方によって、収入の目安は変わります
            </h2>
            <p className="text-xs sm:text-[14px] text-[#85818A] mt-2 leading-relaxed">
              ライフスタイルに合わせた4つのモデルケースをご紹介します。実際の給与制度に基づく試算目安です。
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Model 1: 週2日・Wワーク */}
            <div className="p-5 sm:p-6 rounded-2xl bg-[#FFF9FB] border border-[#F0E5EA] flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-bold bg-white text-[#D94B7A] px-2.5 py-0.5 rounded-full border border-[#F0E5EA]">
                    モデルケース 01
                  </span>
                  <span className="text-xs text-[#85818A]">昼職OL・学生・主婦</span>
                </div>
                <h3 className="font-bold text-base text-[#35313A] mb-2">
                  週2日・Wワーク（無理のない副業ペース）
                </h3>
                <p className="text-xs text-[#85818A] leading-relaxed mb-4">
                  平日の夜や週末を活用し、昼職に支障が出ない範囲で堅実にプラス収入を得る働き方です。
                </p>

                <div className="space-y-1.5 text-xs text-[#35313A] bg-white p-3 rounded-xl border border-[#F0E5EA] mb-4">
                  <div className="flex justify-between">
                    <span className="text-[#85818A]">出勤日数：</span>
                    <span className="font-bold">週2日（月8〜9日）</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#85818A]">勤務時間：</span>
                    <span className="font-bold">夕方〜終電まで（6〜7時間）</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#85818A]">適用ペース：</span>
                    <span className="font-bold">ゆったり安心（10本/日）</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#85818A]">計算方法：</span>
                    <span className="font-bold">日給約7.5万円 × 月8日</span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-[#F0E5EA]">
                <span className="text-xs text-[#85818A] block">計算上の収入目安</span>
                <span className="font-display font-black text-xl sm:text-2xl text-[#D94B7A]">
                  月収 約 50万 〜 70万円
                </span>
                <span className="text-[11px] text-[#85818A] block mt-0.5">（日給 60,000円〜87,500円）</span>
              </div>
            </div>

            {/* Model 2: 週3〜4日・昼間メイン */}
            <div className="p-5 sm:p-6 rounded-2xl bg-[#FFF9FB] border border-[#F0E5EA] flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-bold bg-white text-[#D94B7A] px-2.5 py-0.5 rounded-full border border-[#F0E5EA]">
                    モデルケース 02
                  </span>
                  <span className="text-xs text-[#85818A]">プライベート両立</span>
                </div>
                <h3 className="font-bold text-base text-[#35313A] mb-2">
                  週3〜4日・昼間メイン（健康的な朝シフト）
                </h3>
                <p className="text-xs text-[#85818A] leading-relaxed mb-4">
                  10:00〜17:00の昼間営業を中心に稼働。夜は自分の時間をゆっくり過ごせます。
                </p>

                <div className="space-y-1.5 text-xs text-[#35313A] bg-white p-3 rounded-xl border border-[#F0E5EA] mb-4">
                  <div className="flex justify-between">
                    <span className="text-[#85818A]">出勤日数：</span>
                    <span className="font-bold">週3〜4日（月14〜16日）</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#85818A]">勤務時間：</span>
                    <span className="font-bold">朝10:00〜17:00（約7時間）</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#85818A]">適用ペース：</span>
                    <span className="font-bold">標準ペース（15〜20本/日）</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#85818A]">計算方法：</span>
                    <span className="font-bold">日給約11万円 × 月15日</span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-[#F0E5EA]">
                <span className="text-xs text-[#85818A] block">計算上の収入目安</span>
                <span className="font-display font-black text-xl sm:text-2xl text-[#D94B7A]">
                  月収 約 120万 〜 180万円
                </span>
                <span className="text-[11px] text-[#85818A] block mt-0.5">（日給 80,000円〜137,500円）</span>
              </div>
            </div>

            {/* Model 3: 週5日・レギュラー */}
            <div className="p-5 sm:p-6 rounded-2xl bg-[#FFF9FB] border border-[#F0E5EA] flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-bold bg-white text-[#D94B7A] px-2.5 py-0.5 rounded-full border border-[#F0E5EA]">
                    モデルケース 03
                  </span>
                  <span className="text-xs text-[#85818A]">高収入レギュラー</span>
                </div>
                <h3 className="font-bold text-base text-[#35313A] mb-2">
                  週5日・フルタイム（短期集中・目標貯金）
                </h3>
                <p className="text-xs text-[#85818A] leading-relaxed mb-4">
                  短期間で大きな貯金目標や開業資金を作りたい女性向けの集中稼働スタイルです。
                </p>

                <div className="space-y-1.5 text-xs text-[#35313A] bg-white p-3 rounded-xl border border-[#F0E5EA] mb-4">
                  <div className="flex justify-between">
                    <span className="text-[#85818A]">出勤日数：</span>
                    <span className="font-bold">週5日（月22日）</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#85818A]">勤務時間：</span>
                    <span className="font-bold">8〜10時間勤務</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#85818A]">適用ペース：</span>
                    <span className="font-bold">標準〜がっつり（20〜25本/日）</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#85818A]">計算方法：</span>
                    <span className="font-bold">日給約14万円 × 月22日</span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-[#F0E5EA]">
                <span className="text-xs text-[#85818A] block">計算上の収入目安</span>
                <span className="font-display font-black text-xl sm:text-2xl text-[#D94B7A]">
                  月収 約 250万 〜 350万円
                </span>
                <span className="text-[11px] text-[#85818A] block mt-0.5">（日給 120,000円〜162,500円）</span>
              </div>
            </div>

            {/* Model 4: 地方からの短期出稼ぎ */}
            <div className="p-5 sm:p-6 rounded-2xl bg-[#FFF9FB] border border-[#F0E5EA] flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-bold bg-white text-[#D94B7A] px-2.5 py-0.5 rounded-full border border-[#F0E5EA]">
                    モデルケース 04
                  </span>
                  <span className="text-xs text-[#85818A]">地方出稼ぎ・寮完備</span>
                </div>
                <h3 className="font-bold text-base text-[#35313A] mb-2">
                  短期出稼ぎ（個室マンション寮・往復交通費支給）
                </h3>
                <p className="text-xs text-[#85818A] leading-relaxed mb-4">
                  遠方から週末だけ、または2週間〜1ヶ月の短期滞在でまとまった収入を得る働き方です。
                </p>

                <div className="space-y-1.5 text-xs text-[#35313A] bg-white p-3 rounded-xl border border-[#F0E5EA] mb-4">
                  <div className="flex justify-between">
                    <span className="text-[#85818A]">滞在期間：</span>
                    <span className="font-bold">週末集中（3〜4日）または月15日前後</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#85818A]">適用条件：</span>
                    <span className="font-bold">完全個室寮完備・往復交通費全額支給</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#85818A]">適用ペース：</span>
                    <span className="font-bold">標準ペース（20本/日）</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#85818A]">計算方法：</span>
                    <span className="font-bold">日給約12万円 × 滞在日数</span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-[#F0E5EA]">
                <span className="text-xs text-[#85818A] block">計算上の収入目安</span>
                <span className="font-display font-black text-xl sm:text-2xl text-[#D94B7A]">
                  3日間で 30万 〜 50万円
                </span>
                <span className="text-[11px] text-[#85818A] block mt-0.5">（月15日滞在なら約 180万円〜240万円）</span>
              </div>
            </div>
          </div>
        </section>


        {/* =========================================================
            SECTION 8: 待遇のファーストビュー
           ========================================================= */}
        <section id="treatment-section" className="bg-white rounded-3xl p-6 sm:p-9 md:p-11 border border-[#F0E5EA] shadow-2xs scroll-mt-20">
          <div className="inline-flex items-center gap-1.5 bg-[#FCE8EF] text-[#D94B7A] text-[12px] font-bold px-3.5 py-1.5 rounded-full mb-4 border border-[#F0E5EA]">
            <LucideIcon name="HeartHandshake" size={14} className="text-[#D94B7A]" />
            <span>待遇</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left: Main Copy & Sub Copy */}
            <div className="lg:col-span-7 space-y-4">
              <h2 className="font-display font-black text-2xl sm:text-3xl md:text-[30px] text-[#35313A] leading-snug tracking-tight">
                働く前に知っておきたいこと。<br />
                <span className="text-[#D94B7A]">安心して働くための待遇・サポートをご紹介します。</span>
              </h2>

              <p className="text-xs sm:text-[14px] text-[#85818A] leading-relaxed">
                給与以外にも、働く環境やプライバシー、生活面など、事前に確認しておきたい情報をまとめています。女性が余計な金銭的・精神的負担なく過ごせるよう、具体的なサポート体制を整えています。
              </p>

              {/* 3つのポイント */}
              <div className="space-y-2 pt-1 text-xs sm:text-sm">
                <div className="flex items-center gap-2 text-[#35313A]">
                  <LucideIcon name="Check" size={15} className="text-[#D94B7A] shrink-0" />
                  <span>家具家電付きオートロック個室マンション寮完備（初期費用0円）</span>
                </div>
                <div className="flex items-center gap-2 text-[#35313A]">
                  <LucideIcon name="Check" size={15} className="text-[#D94B7A] shrink-0" />
                  <span>地方・遠方からの往復交通費を全額当店負担</span>
                </div>
                <div className="flex items-center gap-2 text-[#35313A]">
                  <LucideIcon name="Check" size={15} className="text-[#D94B7A] shrink-0" />
                  <span>衣装・靴・ヘアアイロン・コスメ一式無料貸出（手ぶら出勤OK）</span>
                </div>
              </div>
            </div>

            {/* Right: 画像（待機場所・設備・個室マンション） */}
            <div className="lg:col-span-5">
              <div className="rounded-2xl overflow-hidden border border-[#F0E5EA] shadow-2xs bg-zinc-100 relative group">
                <img
                  src="/images/tobita_benefits_treatment_1792645929324.jpg"
                  alt="飛田新地 待遇・福利厚生・完全個室寮・生活サポート"
                  className="w-full h-52 sm:h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                  onError={(e) => {
                    const target = e.currentTarget;
                    target.src = '/images/tobita_dream_hero_banner_1782557055526.jpg';
                  }}
                />
                <div className="absolute bottom-2.5 left-2.5 bg-black/65 backdrop-blur-xs text-white text-[11px] font-bold px-3 py-1 rounded-lg">
                  快適な生活環境（オートロック・プライバシー重視）
                </div>
              </div>
            </div>
          </div>
        </section>


        {/* =========================================================
            SECTION 9: 待遇の6つのカードを改善
           ========================================================= */}
        <section className="bg-white rounded-3xl p-6 sm:p-9 md:p-10 border border-[#F0E5EA] shadow-2xs">
          <div className="max-w-2xl mb-8">
            <span className="text-[11px] font-bold text-[#D94B7A] bg-[#FCE8EF] border border-[#F0E5EA] px-3.5 py-1 rounded-full inline-block mb-2">
              サポート体制
            </span>
            <h2 className="text-xl sm:text-2xl md:text-[23px] font-black text-[#35313A] tracking-tight">
              充実の6大待遇・サポート
            </h2>
            <p className="text-xs sm:text-[14px] text-[#85818A] mt-2 leading-relaxed">
              「安心です」「安全です」という抽象的な言葉だけでなく、具体的にどのような仕組みなのかを詳しくご案内します。
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {TREATMENT_CARDS.map((item, idx) => (
              <div
                key={item.id}
                className="flex flex-col justify-between p-5 rounded-2xl border border-[#F0E5EA] bg-[#FFF9FB] hover:bg-white transition-all shadow-2xs hover:shadow-xs group"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-white text-[#D94B7A] border border-[#F0E5EA] flex items-center justify-center mb-3 shadow-2xs group-hover:scale-105 transition-transform">
                    <LucideIcon name={item.icon as any} size={20} />
                  </div>

                  <h3 className="font-bold text-base text-[#35313A] mb-2 group-hover:text-[#D94B7A] transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-xs sm:text-[13px] text-[#85818A] leading-relaxed mb-4">
                    {item.summary}
                  </p>

                  <div className="border-t border-[#F0E5EA] pt-3 space-y-1.5 mb-4">
                    {item.points.map((pt, pIdx) => (
                      <div key={pIdx} className="flex items-start gap-1.5 text-xs text-[#35313A]">
                        <LucideIcon name="Check" size={13} className="text-[#D94B7A] shrink-0 mt-0.5" />
                        <span className="leading-snug">{pt}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleLineClick(`【待遇の相談】${item.title}について詳しく聞いてみたいです。`)}
                  className="w-full mt-auto py-2.5 px-3 rounded-xl bg-white hover:bg-[#FCE8EF] border border-[#F0E5EA] text-xs font-bold text-[#D94B7A] flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <LucideIcon name="MessageCircle" size={13} />
                  <span>この待遇についてLINEで質問する</span>
                </button>
              </div>
            ))}
          </div>
        </section>


        {/* =========================================================
            SECTION 10: 待遇の比較表
           ========================================================= */}
        <section className="bg-white rounded-3xl p-6 sm:p-9 md:p-10 border border-[#F0E5EA] shadow-2xs">
          <div className="max-w-2xl mb-8">
            <span className="text-[11px] font-bold text-[#D94B7A] bg-[#FCE8EF] border border-[#F0E5EA] px-3.5 py-1 rounded-full inline-block mb-2">
              客観的な違い
            </span>
            <h2 className="text-xl sm:text-2xl md:text-[23px] font-black text-[#35313A] tracking-tight">
              待遇の比較（当直営店と一般的な他店）
            </h2>
            <p className="text-xs sm:text-[14px] text-[#85818A] mt-2 leading-relaxed">
              入店後のギャップや後悔を避けるため、確認できる客観的な待遇の違いを透明に公開しています。
            </p>
          </div>

          {/* PC用: テーブル形式 */}
          <div className="hidden md:block overflow-hidden rounded-2xl border border-[#F0E5EA]">
            <table className="w-full text-xs sm:text-sm text-left">
              <thead className="bg-[#FFF9FB] text-[#35313A] font-bold border-b border-[#F0E5EA]">
                <tr>
                  <th className="p-4 w-1/4">待遇・サポート項目</th>
                  <th className="p-4 w-2/5 bg-[#FCE8EF]/70 text-[#D94B7A] font-extrabold">当直営店（飛田ガールズ）</th>
                  <th className="p-4 w-1/3 text-[#85818A]">一般的な他店・風俗他店</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F0E5EA] bg-white">
                {TREATMENT_COMPARISONS.map((comp, idx) => (
                  <tr key={idx} className="hover:bg-[#FFF9FB]/40 transition-colors">
                    <td className="p-4 font-bold text-[#35313A] border-r border-[#F0E5EA]">{comp.item}</td>
                    <td className="p-4 font-bold text-[#D94B7A] bg-[#FFF9FB]/50 border-r border-[#F0E5EA]">
                      <span className="inline-flex items-center gap-1.5">
                        <LucideIcon name="Check" size={14} className="text-[#D94B7A] shrink-0" />
                        <span>{comp.ourShop}</span>
                      </span>
                    </td>
                    <td className="p-4 text-[#85818A] text-xs">{comp.otherShop}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* スマホ用: カード形式 */}
          <div className="md:hidden space-y-3">
            {TREATMENT_COMPARISONS.map((comp, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-[#FFF9FB] border border-[#F0E5EA] space-y-2">
                <span className="font-bold text-xs text-[#35313A] block">{comp.item}</span>
                <div className="bg-white p-2.5 rounded-xl border border-[#F0E5EA]">
                  <span className="text-[10px] font-bold text-[#D94B7A] block">当直営店</span>
                  <span className="text-xs font-bold text-[#35313A] flex items-center gap-1 mt-0.5">
                    <LucideIcon name="Check" size={13} className="text-[#D94B7A] shrink-0" />
                    <span>{comp.ourShop}</span>
                  </span>
                </div>
                <div className="bg-zinc-50 p-2.5 rounded-xl border border-zinc-200 text-[#85818A]">
                  <span className="text-[10px] font-bold text-zinc-500 block">一般的な他店</span>
                  <span className="text-[11px] block mt-0.5">{comp.otherShop}</span>
                </div>
              </div>
            ))}
          </div>
        </section>


        {/* =========================================================
            SECTION 11: 関連コラム
           ========================================================= */}
        <section className="bg-white rounded-3xl p-6 sm:p-9 md:p-10 border border-[#F0E5EA] shadow-2xs">
          <div className="max-w-2xl mb-8">
            <span className="text-[11px] font-bold text-[#D94B7A] bg-[#FCE8EF] border border-[#F0E5EA] px-3.5 py-1 rounded-full inline-block mb-2">
              解説コラム
            </span>
            <h2 className="text-xl sm:text-2xl md:text-[23px] font-black text-[#35313A] tracking-tight">
              給料・待遇について、もっと詳しく知りたい方へ
            </h2>
            <p className="text-xs sm:text-[14px] text-[#85818A] mt-2 leading-relaxed">
              現場のスタッフが執筆した給与・寮・税務に関する専門解説記事です。
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Article 1 */}
            <div
              onClick={() => onNavigateBlog && onNavigateBlog('tobitashinchi-salary-system-breakdown')}
              className="p-5 rounded-2xl bg-[#FFF9FB] border border-[#F0E5EA] hover:border-[#D94B7A]/40 hover:bg-white transition-all cursor-pointer flex flex-col justify-between group shadow-2xs"
            >
              <div>
                <span className="text-[10px] font-bold text-[#D94B7A] bg-[#FCE8EF] px-2 py-0.5 rounded-md inline-block mb-2">
                  給与解説
                </span>
                <h3 className="font-bold text-sm text-[#35313A] group-hover:text-[#D94B7A] leading-snug mb-2 transition-colors">
                  飛田新地の給料システム完全解説｜売上50%完全バックと手取り計算の仕組み
                </h3>
                <p className="text-xs text-[#85818A] leading-relaxed line-clamp-3">
                  コース別の手取り額や即日日払いの流れ、引かれ物が一切ない理由について詳しく解説します。
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-[#F0E5EA] flex items-center justify-between text-xs font-bold text-[#D94B7A]">
                <span>記事を読む</span>
                <LucideIcon name="ChevronRight" size={14} />
              </div>
            </div>

            {/* Article 2 */}
            <div
              onClick={() => onNavigateBlog && onNavigateBlog('tobitashinchi-housing-support')}
              className="p-5 rounded-2xl bg-[#FFF9FB] border border-[#F0E5EA] hover:border-[#D94B7A]/40 hover:bg-white transition-all cursor-pointer flex flex-col justify-between group shadow-2xs"
            >
              <div>
                <span className="text-[10px] font-bold text-[#D94B7A] bg-[#FCE8EF] px-2 py-0.5 rounded-md inline-block mb-2">
                  寮・住居
                </span>
                <h3 className="font-bold text-sm text-[#35313A] group-hover:text-[#D94B7A] leading-snug mb-2 transition-colors">
                  家具家電付き個室マンション寮の生活ガイド｜初期費用0円で即日入居
                </h3>
                <p className="text-xs text-[#85818A] leading-relaxed line-clamp-3">
                  オートロックマンションの設備、セキュリティ、周辺環境、出稼ぎ交通費の精算方法を解説。
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-[#F0E5EA] flex items-center justify-between text-xs font-bold text-[#D94B7A]">
                <span>記事を読む</span>
                <LucideIcon name="ChevronRight" size={14} />
              </div>
            </div>

            {/* Article 3 */}
            <div
              onClick={() => onNavigateBlog && onNavigateBlog('tobitashinchi-tax-guide')}
              className="p-5 rounded-2xl bg-[#FFF9FB] border border-[#F0E5EA] hover:border-[#D94B7A]/40 hover:bg-white transition-all cursor-pointer flex flex-col justify-between group shadow-2xs"
            >
              <div>
                <span className="text-[10px] font-bold text-[#D94B7A] bg-[#FCE8EF] px-2 py-0.5 rounded-md inline-block mb-2">
                  税務・身バレ
                </span>
                <h3 className="font-bold text-sm text-[#35313A] group-hover:text-[#D94B7A] leading-snug mb-2 transition-colors">
                  昼職OL・会社員の身バレ防止対策｜住民税の普通徴収手続きマニュアル
                </h3>
                <p className="text-xs text-[#85818A] leading-relaxed line-clamp-3">
                  会社に知られずに確定申告を行う「普通徴収」のやり方と、源氏名管理の徹底体制について。
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-[#F0E5EA] flex items-center justify-between text-xs font-bold text-[#D94B7A]">
                <span>記事を読む</span>
                <LucideIcon name="ChevronRight" size={14} />
              </div>
            </div>
          </div>
        </section>


        {/* =========================================================
            SECTION 12: よくある質問
           ========================================================= */}
        <section id="faq-section" className="bg-white rounded-3xl p-6 sm:p-9 md:p-10 border border-[#F0E5EA] shadow-2xs scroll-mt-20">
          <div className="max-w-2xl mb-8">
            <span className="text-[11px] font-bold text-[#D94B7A] bg-[#FCE8EF] border border-[#F0E5EA] px-3.5 py-1 rounded-full inline-block mb-2">
              よくある質問
            </span>
            <h2 className="text-xl sm:text-2xl md:text-[23px] font-black text-[#35313A] tracking-tight">
              給料・待遇に関するよくある質問
            </h2>
            <p className="text-xs sm:text-[14px] text-[#85818A] mt-2 leading-relaxed">
              給料や待遇について女性から多く寄せられる質問に、結論から分かりやすくお答えします。
            </p>
          </div>

          <div className="space-y-3">
            {SALARY_FAQS.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-[#F0E5EA] overflow-hidden bg-[#FFF9FB]/50 transition-colors"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full text-left p-4 sm:p-4.5 flex items-center justify-between gap-3 cursor-pointer hover:bg-[#FFF9FB]"
                  >
                    <span className="font-bold text-xs sm:text-sm text-[#35313A] flex items-start gap-2.5">
                      <span className="text-[#D94B7A] font-black">Q.</span>
                      <span>{faq.q}</span>
                    </span>
                    <LucideIcon
                      name={isOpen ? 'ChevronUp' : 'ChevronDown'}
                      size={16}
                      className="text-[#D94B7A] shrink-0"
                    />
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="px-4 pb-4 pt-1 sm:px-4.5 sm:pb-4.5 text-xs sm:text-[13px] text-[#85818A] leading-relaxed border-t border-[#F0E5EA] bg-white flex items-start gap-2.5"
                      >
                        <span className="text-emerald-600 font-black shrink-0 mt-0.5">A.</span>
                        <div className="flex-1 text-[#35313A]">{faq.a}</div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </section>


        {/* =========================================================
            SECTION 13: 最終相談エリア
           ========================================================= */}
        <section id="contact-section" className="bg-white rounded-3xl p-6 sm:p-10 md:p-12 border-2 border-[#D94B7A]/40 shadow-xs text-center relative overflow-hidden scroll-mt-20">
          <div className="max-w-2xl mx-auto space-y-4">
            <span className="inline-block text-xs font-bold text-[#D94B7A] bg-[#FCE8EF] px-4 py-1.5 rounded-full border border-[#F0E5EA]">
              LINE無料相談・ご質問窓口
            </span>

            <h2 className="text-xl sm:text-2xl md:text-[26px] font-black text-[#35313A]">
              給料や待遇について、分からないことはありませんか？
            </h2>

            <p className="text-xs sm:text-[14px] text-[#85818A] leading-relaxed">
              働く前に確認しておきたいことや、不安に感じていることがあればお気軽にご相談ください。<br />
              応募を決めていなくても大丈夫です。<br />
              まずは質問だけでも構いません。
            </p>

            {/* LINE相談ボタン */}
            <div className="pt-3">
              <a
                href={LINE_OFFICIAL_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => {
                  e.preventDefault();
                  handleLineClick('【給料・待遇の相談】給料や待遇について分からない点があり、まずは質問してみたいです。');
                }}
                className="inline-flex items-center justify-center gap-3 bg-[#06C755] hover:bg-[#05b34c] text-white font-black text-sm sm:text-base px-8 py-4 rounded-2xl shadow-sm hover:shadow-md transition-all cursor-pointer w-full sm:w-auto"
              >
                <LucideIcon name="MessageCircle" size={20} />
                <span>LINEで質問・相談する</span>
              </a>
              <p className="text-xs text-[#85818A] font-bold mt-2">
                ※相談だけでもOK・応募を急かすことは一切ありません
              </p>
            </div>

            <div className="pt-2 text-[11px] sm:text-xs text-[#85818A] space-y-1">
              <p>24時間受付中 / 相談無料 / 匿名相談OK</p>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
