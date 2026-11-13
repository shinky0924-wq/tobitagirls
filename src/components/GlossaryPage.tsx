/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import LucideIcon from './LucideIcon';
import { GLOSSARY_TERMS, GLOSSARY_CATEGORIES, GlossaryTerm } from '../glossaryData';

interface GlossaryPageProps {
  onNavigateHome: () => void;
  onCtaclick: () => void;
}

export default function GlossaryPage({ onNavigateHome, onCtaclick }: GlossaryPageProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredTerms = useMemo(() => {
    return GLOSSARY_TERMS.filter((item) => {
      const matchCat = selectedCategory === 'all' || item.category === selectedCategory;
      if (!matchCat) return false;
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase().trim();
      return (
        item.term.toLowerCase().includes(q) ||
        item.reading.toLowerCase().includes(q) ||
        item.summary.toLowerCase().includes(q) ||
        item.detail.toLowerCase().includes(q)
      );
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50/40 via-white to-rose-50/20 pt-20 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">

        {/* Breadcrumb Navigation */}
        <nav className="mb-6 flex items-center gap-2 text-xs text-zinc-500 font-sans" aria-label="パンくずリスト">
          <a 
            href="/"
            onClick={(e) => {
              e.preventDefault();
              onNavigateHome();
            }} 
            className="hover:text-secondary underline cursor-pointer"
          >
            TOP
          </a>
          <span>/</span>
          <span className="text-zinc-800 font-bold">飛田新地 用語集</span>
        </nav>

        {/* Page Header */}
        <div className="text-center mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-secondary/10 text-secondary border border-secondary/20 mb-3">
            <LucideIcon name="BookOpen" size={14} />
            <span>初めてでもすぐわかる安心用語辞典</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-on-surface tracking-tight font-display mb-3">
            飛田新地 用語集・用語辞典
          </h1>
          <p className="text-xs sm:text-sm text-on-surface-variant max-w-2xl mx-auto leading-relaxed">
            「上がり框」「仲居さん」「清拭」「通り別の違い」など、飛田新地でのお仕事探しや面接前に知っておきたい専門用語・ルールを、料亭直営スタッフが分かりやすく丁寧に解説します。
          </p>
        </div>

        {/* Search & Filter Controls */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-rose-100 shadow-xs mb-8">
          {/* Keyword Search */}
          <div className="relative mb-4">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-400">
              <LucideIcon name="Search" size={16} />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="用語名・よみがな・キーワードで検索（例：上がり框、仲居さん、給料）"
              className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-rose-50/30 border border-zinc-200 rounded-xl focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-zinc-400 hover:text-zinc-600"
              >
                <LucideIcon name="X" size={15} />
              </button>
            )}
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2">
            {GLOSSARY_CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat.key;
              return (
                <button
                  key={cat.key}
                  type="button"
                  onClick={() => setSelectedCategory(cat.key)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-secondary text-white shadow-2xs'
                      : 'bg-zinc-100 text-zinc-600 hover:bg-rose-100/60 hover:text-secondary'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Results Counter */}
        <div className="flex items-center justify-between text-xs text-zinc-500 mb-4 px-1">
          <span>該当件数：<strong>{filteredTerms.length}</strong> 件</span>
          {searchQuery && (
            <button
              type="button"
              onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}
              className="text-secondary hover:underline cursor-pointer"
            >
              条件をクリア
            </button>
          )}
        </div>

        {/* Glossary Terms List */}
        <div className="space-y-4">
          {filteredTerms.length === 0 ? (
            <div className="bg-white rounded-2xl p-8 text-center border border-rose-100 text-zinc-500 text-xs sm:text-sm">
              <LucideIcon name="AlertCircle" size={24} className="mx-auto text-zinc-300 mb-2" />
              該当する用語が見つかりませんでした。「上がり框」「仲居」などのキーワードでお試しください。
            </div>
          ) : (
            filteredTerms.map((item) => (
              <article 
                key={item.id}
                id={item.id}
                className="bg-white rounded-2xl p-5 sm:p-6 border border-rose-100 shadow-2xs hover:shadow-xs transition-shadow"
              >
                {/* Header */}
                <div className="flex items-start sm:items-center justify-between gap-3 mb-2.5 flex-wrap">
                  <div>
                    <span className="text-[10px] text-zinc-400 block font-mono">{item.reading}</span>
                    <h2 className="text-base sm:text-lg font-bold text-zinc-900 font-display">
                      {item.term}
                    </h2>
                  </div>
                  <span className="text-[10px] sm:text-xs font-bold px-2.5 py-0.5 rounded-full bg-rose-50 text-secondary border border-rose-200">
                    {item.categoryLabel}
                  </span>
                </div>

                {/* Summary (Definition) */}
                <p className="text-xs sm:text-sm text-secondary font-semibold mb-2">
                  👉 {item.summary}
                </p>

                {/* Detailed Explanation */}
                <p className="text-xs sm:text-sm text-zinc-700 leading-relaxed mb-3.5">
                  {item.detail}
                </p>

                {/* Advice for Job Seekers */}
                <div className="bg-gradient-to-r from-rose-50/70 to-pink-50/40 p-3 sm:p-3.5 rounded-xl border border-rose-100/80">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-rose-800 mb-1">
                    <LucideIcon name="Heart" size={13} className="text-secondary shrink-0" />
                    <span>働く女性への安心アドバイス</span>
                  </div>
                  <p className="text-xs text-zinc-600 leading-relaxed">
                    {item.forJobSeekers}
                  </p>
                </div>
              </article>
            ))
          )}
        </div>

        {/* Bottom Consultation Banner */}
        <div className="mt-12 bg-gradient-to-r from-rose-500 to-pink-500 rounded-3xl p-6 sm:p-8 text-white text-center shadow-lg">
          <h3 className="text-lg sm:text-xl font-bold font-display mb-2">
            もっと詳しく知りたい方・気になる疑問がある方へ
          </h3>
          <p className="text-xs sm:text-sm text-white/90 max-w-xl mx-auto leading-relaxed mb-5">
            「実際の面接では何を聞かれる？」「自分に合う通りはどこ？」など、どんな些細なことでも女性スタッフが親身にお答えします。相談無料・履歴書不要です。
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              type="button"
              onClick={onCtaclick}
              className="w-full sm:w-auto px-6 py-3 rounded-full bg-white text-secondary font-bold text-sm shadow-md hover:bg-rose-50 transition-all cursor-pointer"
            >
              無料相談・質問してみる
            </button>
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                onNavigateHome();
              }}
              className="w-full sm:w-auto px-6 py-3 rounded-full bg-white/20 text-white font-bold text-sm hover:bg-white/30 transition-all cursor-pointer inline-flex items-center justify-center"
            >
              トップページに戻る
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
