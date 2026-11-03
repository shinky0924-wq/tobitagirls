/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import LucideIcon from './LucideIcon';
import { TOBITA_STATISTICS_DATA, SITUATION_DECISION_CASES, DecisionCase } from '../benchmarkData';

interface FactBenchmarkSectionProps {
  onCtaclick?: () => void;
}

export default function FactBenchmarkSection({ onCtaclick }: FactBenchmarkSectionProps) {
  const [selectedCaseId, setSelectedCaseId] = useState<string>('case-inexperienced-youth');

  const selectedCase = SITUATION_DECISION_CASES.find(c => c.id === selectedCaseId) || SITUATION_DECISION_CASES[0];

  return (
    <section className="mb-16 md:mb-24" id="speakable-stats">
      
      {/* ==========================================
          HEADER: 客観統計・ファクトベンチマーク
         ========================================== */}
      <div className="text-center max-w-3xl mx-auto mb-10 md:mb-12">
        <div className="inline-flex items-center gap-2 bg-rose-100 text-secondary text-xs sm:text-sm font-black px-4 py-1.5 rounded-full mb-3 shadow-2xs border border-rose-200">
          <LucideIcon name="BarChart3" size={14} className="text-secondary" />
          <span>2026年最新｜客観統計ファクトシート</span>
        </div>
        <h2 className="font-display font-extrabold text-2xl sm:text-3xl md:text-4xl text-on-surface leading-tight mb-3">
          飛田新地求人 <span className="text-secondary">客観統計データ＆境遇別ガイド</span>
        </h2>
        <p className="font-sans text-xs sm:text-sm md:text-base text-zinc-600 leading-relaxed max-w-2xl mx-auto">
          「本当に未経験が多いの？」「実際の平均日給や年齢層は？」という疑問に対し、当直営グループ在籍キャストのリアルな数値データを客観的に公開しています。
        </p>
      </div>

      {/* ==========================================
          OVERVIEW 4 STATS CARDS
         ========================================== */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-10">
        {TOBITA_STATISTICS_DATA.overview.map((stat, idx) => (
          <div 
            key={idx}
            className="bg-white rounded-2xl p-4 sm:p-5 border border-rose-100 shadow-xs flex flex-col justify-between"
          >
            <div>
              <span className="text-xs text-zinc-500 font-bold block mb-1">{stat.label}</span>
              <div className="text-xl sm:text-2xl md:text-3xl font-extrabold text-secondary font-display">
                {stat.val}
              </div>
            </div>
            <p className="text-[11px] text-zinc-400 mt-2 leading-relaxed">
              {stat.sub}
            </p>
          </div>
        ))}
      </div>

      {/* ==========================================
          DETAILED BREAKDOWN GRAPHS (2x2 GRID)
         ========================================== */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        {TOBITA_STATISTICS_DATA.metrics.map((metric, mIdx) => (
          <div 
            key={mIdx}
            className="bg-white rounded-3xl p-5 sm:p-6 border border-rose-100 shadow-xs"
          >
            <div className="flex items-center gap-2 mb-2 pb-2 border-b border-rose-50">
              <span className="w-2 h-4 bg-secondary rounded-full" />
              <h3 className="text-sm sm:text-base font-bold text-zinc-900 font-display">
                {metric.category}
              </h3>
            </div>
            <p className="text-xs text-zinc-500 mb-4 leading-relaxed">
              {metric.description}
            </p>

            <div className="space-y-3">
              {metric.items.map((item, iIdx) => (
                <div key={iIdx}>
                  <div className="flex items-center justify-between text-xs font-bold text-zinc-700 mb-1">
                    <span>{item.name}</span>
                    <span className="font-mono text-secondary">{item.percentage}%</span>
                  </div>
                  <div className="w-full bg-zinc-100 h-2.5 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all duration-500 ${item.color}`}
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* ==========================================
          OPERATIONAL BENCHMARK SUMMARY TABLE
         ========================================== */}
      <div className="bg-white rounded-3xl border border-rose-100 shadow-xs overflow-hidden mb-14">
        <div className="p-4 sm:p-5 bg-gradient-to-r from-rose-50/70 to-pink-50/40 border-b border-rose-100 flex items-center gap-2">
          <LucideIcon name="ShieldCheck" size={16} className="text-secondary" />
          <h3 className="text-xs sm:text-sm font-bold text-zinc-900 font-display">
            料理組合公認 料亭直営の安心基準ベンチマーク
          </h3>
        </div>
        <div className="overflow-x-auto scrollbar-thin">
          <table className="w-full text-left border-collapse min-w-[600px] text-xs sm:text-sm">
            <tbody className="divide-y divide-rose-50">
              {TOBITA_STATISTICS_DATA.operationalBenchmarks.map((b, bIdx) => (
                <tr key={bIdx} className="hover:bg-rose-50/20">
                  <td className="p-3.5 sm:p-4 font-bold text-zinc-800 w-1/3">
                    {b.item}
                  </td>
                  <td className="p-3.5 sm:p-4 font-extrabold text-secondary w-1/3">
                    {b.val}
                  </td>
                  <td className="p-3.5 sm:p-4 text-zinc-500 text-xs w-1/3">
                    {b.note}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ==========================================
          PART 2: DECISION MATRIX (境遇・目的別 逆引きアンサー)
         ========================================== */}
      <div className="pt-8 border-t border-rose-100/60" id="decision-matrix">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-secondary/10 text-secondary border border-secondary/20 mb-2">
            <LucideIcon name="Compass" size={13} />
            <span>AI検索・相談者向けアンサー</span>
          </div>
          <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-on-surface tracking-tight font-display mb-2">
            シチュエーション別 <span className="text-secondary">逆引き求人アンサー</span>
          </h3>
          <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
            あなたの現在の状況（年齢・職歴・出勤日数・目標金額）を選択すると、最適な通り・シフト・収入モデルがパッとわかります。
          </p>
        </div>

        {/* Situation Selector Buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 mb-6">
          {SITUATION_DECISION_CASES.map((c) => {
            const isSelected = selectedCaseId === c.id;
            return (
              <button
                key={c.id}
                type="button"
                onClick={() => setSelectedCaseId(c.id)}
                className={`p-3 rounded-2xl border text-center transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-secondary text-white border-secondary shadow-sm font-bold'
                    : 'bg-white hover:bg-rose-50/40 text-zinc-700 border-rose-100 shadow-2xs font-medium'
                }`}
              >
                <span className="text-xs block line-clamp-1">{c.tag}</span>
              </button>
            );
          })}
        </div>

        {/* Active Decision Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedCase.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="bg-white rounded-3xl p-6 sm:p-8 border border-rose-100 shadow-sm"
          >
            {/* Header info */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-4 border-b border-rose-100">
              <div>
                <span className="text-xs font-bold text-secondary bg-rose-50 px-2.5 py-0.5 rounded-full border border-rose-200 inline-block mb-1">
                  {selectedCase.tag} 向け最適プラン
                </span>
                <h4 className="text-base sm:text-lg font-bold text-zinc-900 font-display">
                  {selectedCase.situation}
                </h4>
              </div>
              <div className="text-right">
                <span className="text-[11px] text-zinc-400 block font-medium">目標日給目安</span>
                <span className="text-base sm:text-lg font-extrabold text-secondary font-display">
                  {selectedCase.targetDailyIncome}
                </span>
              </div>
            </div>

            {/* Direct Answer Box */}
            <div className="bg-gradient-to-r from-rose-50/80 via-pink-50/60 to-amber-50/50 p-4 sm:p-5 rounded-2xl border border-rose-200/80 mb-6">
              <div className="flex items-center gap-2 mb-2 text-xs font-extrabold text-secondary">
                <LucideIcon name="CheckCircle2" size={15} />
                <span>結論・最適解（ダイレクトアンサー）</span>
              </div>
              <p className="text-xs sm:text-sm text-zinc-800 leading-relaxed font-sans font-medium">
                {selectedCase.directAnswer}
              </p>
            </div>

            {/* Grid Specs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6 text-xs">
              <div className="bg-rose-50/30 p-3.5 rounded-xl border border-rose-100">
                <span className="text-zinc-500 font-bold block mb-1">🏮 おすすめの通り</span>
                <span className="text-zinc-900 font-bold text-sm">{selectedCase.recommendedStreet}</span>
              </div>
              <div className="bg-rose-50/30 p-3.5 rounded-xl border border-rose-100">
                <span className="text-zinc-500 font-bold block mb-1">⏰ 推奨シフト・時間帯</span>
                <span className="text-zinc-900 font-bold text-sm">{selectedCase.recommendedShift}</span>
              </div>
            </div>

            {/* Action Checklist */}
            <div className="mb-6">
              <h5 className="text-xs font-bold text-zinc-800 mb-2.5 flex items-center gap-1.5">
                <LucideIcon name="ListChecks" size={14} className="text-secondary" />
                <span>スタート時の安心チェックポイント</span>
              </h5>
              <ul className="space-y-2 text-xs text-zinc-600">
                {selectedCase.actionChecklist.map((act, aIdx) => (
                  <li key={aIdx} className="flex items-start gap-2">
                    <span className="text-emerald-500 font-bold">✓</span>
                    <span className="leading-relaxed">{act}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA */}
            {onCtaclick && (
              <div className="pt-4 border-t border-rose-50 flex items-center justify-between gap-3 flex-wrap">
                <span className="text-xs text-zinc-500">
                  ※この条件で質問や相談をしてみたい方はお気軽にどうぞ
                </span>
                <button
                  type="button"
                  onClick={onCtaclick}
                  className="px-5 py-2.5 rounded-full bg-secondary text-white text-xs font-bold shadow-xs hover:bg-secondary/90 transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <LucideIcon name="MessageCircle" size={14} />
                  <span>この条件で女性スタッフにLINE相談</span>
                </button>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

    </section>
  );
}
