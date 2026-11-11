/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo } from 'react';
import LucideIcon from './LucideIcon';

interface SalaryCalculatorProps {
  onCtaclick?: () => void;
}

// ユーザー指定の厳密な日給レンジ（50,000〜92,500円 / 100,000〜162,500円 / 150,000〜237,500円）
// アクセスごとに数字がリアルに変わる実績バリエーション（すべて整数本数・外国人手当含む）
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

export default function SalaryCalculator({ onCtaclick }: SalaryCalculatorProps) {
  // Sliders & inputs
  const [daysPerWeek, setDaysPerWeek] = useState<number>(3);
  const [hoursPerDay, setHoursPerDay] = useState<number>(8);
  const [showBreakdown, setShowBreakdown] = useState<boolean>(true);

  // 勤務時間に応じた現実的な稼働ペース自動算出
  const paceMode: 'relaxed' | 'standard' | 'high' =
    hoursPerDay <= 7 ? 'relaxed' : hoursPerDay <= 9 ? 'standard' : 'high';

  // アクセスごとに数字を変えるインデックス（訪問時にランダム決定）
  const [variationIndex, setVariationIndex] = useState<number>(() => {
    return Math.floor(Math.random() * 5);
  });

  // 週日数から月間実稼働日数の換算（週×4.33週、端数四捨五入）
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

  // コース別手取り一覧
  const COURSE_RATES = [
    { time: '15分', payout: '5,000円', note: '基本コース' },
    { time: '20分', payout: '7,500円', note: '人気コース' },
    { time: '30分', payout: '10,000円', note: 'ゆったり' },
    { time: '45分', payout: '15,000円', note: 'ロング' },
    { time: '60分', payout: '20,000円', note: '特ロング' },
    { time: '外国人', payout: '+2,500円', note: '手当上乗せ支給' },
  ];

  // Calculations
  const calculated = useMemo(() => {
    const config = REAL_VARIATIONS[paceMode];
    const patterns = config.patterns;
    const item = patterns[variationIndex % patterns.length];
    
    const totalCount = PACE_METAS[paceMode].totalCount;
    const breakdownItems = item.breakdown;
    const foreignCount = item.foreignCount;
    const foreignBonus = item.foreignBonus;
    const dailyNetIncome = item.dailyTotal;

    // 月間出勤日数（週の日数に対応）
    const monthlyDays = MONTHLY_DAYS_MAP[daysPerWeek] || Math.round(daysPerWeek * 4.33);

    // 月給（日給 × 月間日数 で1円の狂いもなく完全合致）
    const monthlyNetIncome = dailyNetIncome * monthlyDays;
    
    // 月収レンジ（日給の最低〜最高 × 月間日数）
    const minMonthly = config.minDaily * monthlyDays;
    const maxMonthly = config.maxDaily * monthlyDays;

    // 年間換算
    const yearlyNetIncome = monthlyNetIncome * 12;

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
      yearlyNetIncome,
    };
  }, [daysPerWeek, hoursPerDay, paceMode, variationIndex]);

  return (
    <div className="bg-white rounded-3xl border border-rose-100 shadow-sm p-6 sm:p-8" id="salary-calculator">
      
      {/* Header */}
      <div className="text-center max-w-xl mx-auto mb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-secondary/10 text-secondary border border-secondary/20 mb-2">
          <LucideIcon name="Calculator" size={13} />
          <span>売上50%即日全額日払いシミュレーター</span>
        </div>
        <h3 className="text-xl sm:text-2xl font-extrabold text-zinc-900 font-display mb-2">
          飛田新地 手取り給与リアルタイム計算機
        </h3>
        <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
          コース単価（15分5,000円〜60分20,000円・外国人手当+2,500円）の通りに、日給と月収を正確に計算します。雑費・天引きは一切ありません。
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Controls Column (Left) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Days per week */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs font-bold text-zinc-800 flex items-center gap-1.5">
                <LucideIcon name="Calendar" size={14} className="text-secondary" />
                <span>週の出勤日数</span>
              </label>
              <span className="text-sm font-extrabold text-secondary font-mono bg-rose-50 px-2.5 py-0.5 rounded-full border border-rose-200">
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
              className="w-full accent-secondary cursor-pointer h-2 bg-rose-100 rounded-lg"
            />
            <div className="flex justify-between text-[10px] text-zinc-400 mt-1">
              <span>週1日（月4日）</span>
              <span>週3日（月13日・標準）</span>
              <span>週5〜6日（月22〜26日）</span>
            </div>
          </div>

          {/* Hours per day (7時間〜12時間) */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs font-bold text-zinc-800 flex items-center gap-1.5">
                <LucideIcon name="Clock" size={14} className="text-secondary" />
                <span>1日の勤務時間</span>
              </label>
              <span className="text-sm font-extrabold text-secondary font-mono bg-rose-50 px-2.5 py-0.5 rounded-full border border-rose-200">
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
              className="w-full accent-secondary cursor-pointer h-2 bg-rose-100 rounded-lg"
            />
            <div className="flex justify-between text-[10px] text-zinc-400 mt-1">
              <span>6〜7時間（10〜16時 / 10〜17時 / 17〜24時）</span>
              <span>10時間（14〜24時）</span>
              <span>12時間（12〜24時）</span>
            </div>
          </div>


          {/* 単価内訳表（15分5000円〜60分20000円・外国人+2500円・雑費0円） */}
          <div className="bg-rose-50/40 rounded-2xl p-4 border border-rose-100">
            <div className="flex items-center justify-between mb-2 pb-2 border-b border-rose-100">
              <span className="text-xs font-bold text-zinc-800 flex items-center gap-1.5">
                <LucideIcon name="Receipt" size={13} className="text-secondary" />
                <span>コース別手取り一覧（全額即日日払い）</span>
              </span>
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                天引き・雑費 0円
              </span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
              {COURSE_RATES.map((c, idx) => (
                <div key={idx} className="bg-white p-2 rounded-xl border border-rose-100/70 shadow-2xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-zinc-800">{c.time}</span>
                    <span className="font-mono font-extrabold text-secondary">{c.payout}</span>
                  </div>
                  <span className="text-[10px] text-zinc-400 block mt-0.5">{c.note}</span>
                </div>
              ))}
            </div>
            <p className="text-[10px] text-zinc-500 mt-2 leading-relaxed">
              ※売上50%完全バック。厚生費・衣装代・ヘアメイク代などの引かれ物は一切ありません。
            </p>

            {/* チップについての注記 */}
            <div className="mt-3 pt-3 border-t border-rose-200/60 flex items-start gap-2.5 bg-white/80 p-3 rounded-xl border border-rose-100">
              <span className="text-base shrink-0">🎁</span>
              <p className="text-[11px] text-zinc-700 leading-relaxed">
                <strong className="text-secondary font-bold">【いただいたチップはすべて女性のもの】</strong><br />
                当店の常連さんは女の子にチップを渡してくださることも多く、いただいたチップはお店の天引きや手数料など一切なく、<strong className="text-zinc-900 underline decoration-rose-300">すべて女性自身のもの（全額手渡し）</strong>になります。
              </p>
            </div>
          </div>

        </div>

        {/* Results Card (Right) */}
        <div className="lg:col-span-5 bg-gradient-to-br from-rose-500 via-pink-500 to-rose-600 rounded-3xl p-6 sm:p-7 text-white shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold text-white/90 bg-white/20 px-3 py-1 rounded-full inline-block">
                あなたの試算結果（手取り現金手渡し）
              </span>
              <button
                type="button"
                onClick={() => setVariationIndex(prev => prev + 1)}
                className="text-[10px] font-bold text-white/90 bg-white/15 hover:bg-white/25 px-2.5 py-1 rounded-full flex items-center gap-1 transition-all cursor-pointer border border-white/20"
                title="別の稼働実績パターンで試算"
              >
                <LucideIcon name="RefreshCw" size={11} />
                <span>実績例を切替</span>
              </button>
            </div>

            {/* Daily Net Income (ランダム表示) */}
            <div className="mb-5 pb-5 border-b border-white/20">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-white/80">1日の手取り日給（目安）</span>
                <span className="text-[10px] font-bold text-amber-200 bg-white/10 px-2 py-0.5 rounded-full">
                  合計 {calculated.totalCount} 本
                </span>
              </div>
              <div className="flex items-baseline gap-2 my-1">
                <span className="text-4xl sm:text-5xl font-black font-display tracking-tight text-white">
                  {calculated.dailyNetIncome.toLocaleString()}
                </span>
                <span className="text-lg font-bold">円 / 日</span>
              </div>
              <div className="mt-2 text-[11px] text-white/90 bg-black/15 rounded-xl p-2.5 space-y-0.5">
                <p>
                  👉 <strong>合計 {calculated.totalCount} 本</strong> の接客想定（退勤時に全額現金手渡し）
                </p>
                <p className="text-white/70 text-[10px]">
                  ※全て15分（5,000円）のみの場合でも最低 {calculated.minDaily.toLocaleString()} 円手渡し保証
                </p>
              </div>
            </div>

            {/* Monthly Net Income (ランダム表示) */}
            <div className="mb-5 pb-5 border-b border-white/20">
              <span className="text-xs text-white/80 block mb-1">
                1ヶ月の手取り月収（週{daysPerWeek}日・月{calculated.monthlyDays}日勤務）
              </span>
              <div className="flex items-baseline gap-2 my-1">
                <span className="text-3xl sm:text-4xl font-extrabold font-display text-amber-200">
                  {calculated.monthlyNetIncome.toLocaleString()}
                </span>
                <span className="text-base font-bold text-amber-100">円 / 月</span>
              </div>
              <span className="text-[11px] text-white/90 block mt-1 font-mono">
                （日給 {calculated.dailyNetIncome.toLocaleString()} 円 × 月 {calculated.monthlyDays} 日 ＝ {calculated.monthlyNetIncome.toLocaleString()} 円）
              </span>
              <span className="text-[11px] text-white/70 block mt-0.5">
                年間換算：約 {Math.round(calculated.yearlyNetIncome / 10000).toLocaleString()} 万円
              </span>
            </div>

            {/* 単価計算の内訳明細（すべて整数・外国人手当も常時含む） */}
            <div className="mb-6 bg-white/10 rounded-2xl p-3.5 border border-white/20">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-white flex items-center gap-1.5">
                  <LucideIcon name="ListChecks" size={13} />
                  <span>今回の試算内訳（単価×本数の積算）</span>
                </span>
                <button
                  type="button"
                  onClick={() => setShowBreakdown(prev => !prev)}
                  className="text-[10px] text-white/80 hover:text-white underline cursor-pointer"
                >
                  {showBreakdown ? '閉じる' : '内訳を見る'}
                </button>
              </div>

              {showBreakdown && (
                <div className="space-y-1 text-[11px] text-white/90 divide-y divide-white/10 pt-1 font-mono">
                  {calculated.breakdownItems.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center py-1">
                      <span>{item.time}（{item.payout.toLocaleString()}円 × {item.count}本）</span>
                      <span className="font-bold">{item.subtotal.toLocaleString()}円</span>
                    </div>
                  ))}
                  {/* 外国人客手当 */}
                  {calculated.foreignCount > 0 ? (
                    <div className="flex justify-between items-center py-1 text-amber-200 bg-white/5 px-1.5 rounded">
                      <span>外国人客手当（+2,500円 × {calculated.foreignCount}本）</span>
                      <span className="font-bold">+{calculated.foreignBonus.toLocaleString()}円</span>
                    </div>
                  ) : (
                    <div className="flex justify-between items-center py-1 text-white/60 text-[10px]">
                      <span>外国人客手当（今回は0本）</span>
                      <span>0円</span>
                    </div>
                  )}
                  <div className="flex justify-between items-center pt-1.5 font-bold text-xs text-white">
                    <span>合計 {calculated.totalCount} 本の手取り日給</span>
                    <span className="text-amber-200">{calculated.dailyNetIncome.toLocaleString()}円</span>
                  </div>
                </div>
              )}
            </div>

            {/* CTA */}
            {onCtaclick && (
              <button
                type="button"
                onClick={onCtaclick}
                className="w-full py-3.5 rounded-full bg-white text-secondary font-bold text-xs sm:text-sm shadow-md hover:bg-rose-50 transition-all cursor-pointer flex items-center justify-center gap-1.5"
              >
                <LucideIcon name="MessageCircle" size={15} />
                <span>この条件で女性スタッフにLINE相談</span>
              </button>
            )}
            <p className="text-[10px] text-white/80 text-center mt-2.5 leading-relaxed">
              ※上記金額はコース実績に基づく試算目安となります。実際の支給額は当日の稼働状況により前後します。
            </p>
          </div>
        </div>

      </div>

    </div>
  );
}
