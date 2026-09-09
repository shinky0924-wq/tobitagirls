/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import * as LucideIcons from 'lucide-react';
import {
  FAQ100Item,
  TOP_10_FAQ_LIST,
  FAQ_8_CATEGORIES,
  FAQ_100_LIST
} from '../faq100Data';
import { CONSULTANT_AVATAR_URL } from '../data';

function LucideIcon({ name, size = 16, className = '' }: { name: string; size?: number; className?: string }) {
  const IconComponent = (LucideIcons as any)[name] || LucideIcons.HelpCircle;
  return <IconComponent size={size} className={className} />;
}

interface FAQProps {
  content?: any;
  onCtaclick?: () => void;
  onNavigateToFaq?: (category?: string) => void;
}

export default function FAQ({ content, onCtaclick, onNavigateToFaq }: FAQProps) {
  // By default, open the first question so users immediately see the answer format
  const [openIds, setOpenIds] = useState<Set<string>>(new Set([TOP_10_FAQ_LIST[0]?.id || 'faq-rec-1']));

  const toggleItem = (id: string) => {
    setOpenIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const expandAll = () => {
    setOpenIds(new Set(TOP_10_FAQ_LIST.map(item => item.id)));
  };

  const collapseAll = () => {
    setOpenIds(new Set());
  };

  const handleNavigateFaq = (category?: string) => {
    if (onNavigateToFaq) {
      onNavigateToFaq(category);
    } else if (typeof window !== 'undefined') {
      window.location.href = category ? `/faq?category=${category}` : '/faq';
    }
  };

  return (
    <section className="py-16 md:py-20 bg-gradient-to-b from-white via-rose-50/20 to-white" id="faq">
      <div className="max-w-[1000px] mx-auto px-4 sm:px-6">
        
        {/* ==========================================
            Section Header: よくある質問 代表10選
           ========================================== */}
        <div className="text-center max-w-3xl mx-auto mb-10 md:mb-12">
          <div className="inline-flex items-center gap-2 bg-rose-100/90 text-secondary text-xs md:text-sm font-extrabold px-4 py-1.5 rounded-full mb-3 shadow-xs">
            <LucideIcon name="HelpCircle" size={15} />
            <span>よくある質問（代表10選）</span>
          </div>

          <h2 className="font-display font-extrabold text-2xl sm:text-3xl md:text-4xl text-on-surface leading-tight mb-4">
            応募前に女の子から寄せられる<br className="hidden sm:inline" />
            <span className="text-secondary">代表的な10の疑問</span>にお答えします。
          </h2>

          <p className="font-sans text-xs sm:text-sm md:text-base text-on-surface-variant leading-relaxed">
            未経験・日払い・週1日・身バレ対策・お酒・30代・寮・Wワーク・退店ルールなど、応募前に特に相談の多い10の質問を厳選しました。
            全119問の網羅データベースは専用FAQページでご確認いただけます。
          </p>
        </div>

        {/* ==========================================
            Controls: Expand / Collapse All
           ========================================== */}
        <div className="flex items-center justify-between gap-2 mb-4 px-1 text-xs">
          <span className="font-bold text-zinc-600 flex items-center gap-1">
            <LucideIcon name="Sparkles" size={14} className="text-secondary" />
            <span>特に多い10の疑問と回答</span>
          </span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={expandAll}
              className="text-[11px] font-bold text-zinc-600 hover:text-secondary px-2 py-1 rounded hover:bg-rose-50 transition-colors cursor-pointer"
            >
              すべて開く
            </button>
            <span className="text-zinc-300">|</span>
            <button
              type="button"
              onClick={collapseAll}
              className="text-[11px] font-bold text-zinc-600 hover:text-secondary px-2 py-1 rounded hover:bg-rose-50 transition-colors cursor-pointer"
            >
              すべて閉じる
            </button>
          </div>
        </div>

        {/* ==========================================
            Accordion List Group (10 Curated Items)
           ========================================== */}
        <div className="space-y-3 md:space-y-3.5 mb-10" id="faq-accordions-group">
          {TOP_10_FAQ_LIST.map((faq: FAQ100Item, index: number) => {
            const isOpen = openIds.has(faq.id);
            const questionIndex = index + 1;

            return (
              <div
                key={faq.id}
                className={`bg-white rounded-2xl border transition-all overflow-hidden ${
                  isOpen
                    ? 'border-secondary/60 shadow-md ring-1 ring-secondary/10'
                    : 'border-zinc-200/80 hover:border-rose-200 shadow-2xs'
                }`}
                id={`faq-accordion-card-${faq.id}`}
              >
                <button
                  onClick={() => toggleItem(faq.id)}
                  className={`w-full flex justify-between items-start sm:items-center p-4 sm:p-5 text-left cursor-pointer gap-3 sm:gap-4 transition-colors ${
                    isOpen ? 'bg-rose-50/25' : 'hover:bg-rose-50/10'
                  }`}
                >
                  <div className="flex items-start sm:items-center gap-2.5 sm:gap-3 flex-1 min-w-0">
                    <span className="flex-shrink-0 text-xs font-black bg-rose-100/80 text-secondary px-2.5 py-1 rounded-lg mt-0.5 sm:mt-0 select-none">
                      Q.{questionIndex.toString().padStart(2, '0')}
                    </span>
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-1.5 mb-1">
                        <span className="text-[10px] font-bold text-zinc-600 bg-zinc-100 px-2 py-0.5 rounded-full">
                          {faq.eightCategoryLabel}
                        </span>
                        {faq.isPopular && (
                          <span className="text-[10px] font-bold text-amber-700 bg-amber-50 border border-amber-200/60 px-1.5 py-0.5 rounded-full inline-flex items-center gap-0.5">
                            <LucideIcon name="Sparkles" size={10} />
                            注目
                          </span>
                        )}
                      </div>
                      <h3 className="font-sans font-bold text-xs sm:text-sm md:text-base text-on-surface group-hover:text-secondary leading-snug">
                        {faq.question}
                      </h3>
                    </div>
                  </div>

                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className={`text-on-surface-variant flex-shrink-0 mt-1 sm:mt-0 ${isOpen ? 'text-secondary' : ''}`}
                  >
                    <LucideIcon name="ChevronDown" size={18} className="sm:w-5 sm:h-5" />
                  </motion.div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: 'easeOut' }}
                    >
                      <div className="px-4 sm:px-6 pb-5 pt-0 font-sans text-xs sm:text-sm text-on-surface-variant leading-relaxed border-t border-rose-100/50">
                        <div className="pt-4 flex gap-2.5 sm:gap-3">
                          <span className="text-secondary font-extrabold text-base sm:text-lg select-none flex-shrink-0">
                            A.
                          </span>
                          <div className="flex-1 space-y-2">
                            <p className="whitespace-pre-line text-xs sm:text-sm text-[#3c2a2e] leading-relaxed font-medium">
                              {faq.answer}
                            </p>
                            {faq.keywords && faq.keywords.length > 0 && (
                              <div className="pt-2 flex flex-wrap gap-1 border-t border-rose-50/60">
                                {faq.keywords.map(kw => (
                                  <span key={kw} className="text-[10px] text-zinc-400">
                                    #{kw}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* ==========================================
            Dedicated FAQ Hub Banner & 8 Category Jump Links
           ========================================== */}
        <div className="bg-gradient-to-r from-rose-50/80 via-white to-rose-50/80 border border-rose-200 rounded-3xl p-6 sm:p-8 shadow-sm mb-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-6 border-b border-rose-100">
            <div className="text-center md:text-left">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-secondary bg-white px-3 py-1 rounded-full border border-rose-200 mb-2 shadow-2xs">
                <LucideIcon name="Layers" size={13} />
                <span>全119問のFAQデータベース</span>
              </div>
              <h3 className="font-bold text-base sm:text-lg text-zinc-900 mb-1">
                もっと詳しい質問・条件別のQ&Aを見たい方へ
              </h3>
              <p className="text-xs sm:text-sm text-zinc-600">
                面接・日給・未経験・勤務時間・身バレ・寮・副業・退職まで、8つのテーマ別に全119問を網羅しています。
              </p>
            </div>

            <button
              type="button"
              onClick={() => handleNavigateFaq()}
              className="flex-shrink-0 inline-flex items-center gap-2 bg-secondary hover:bg-rose-600 text-white font-black text-xs sm:text-sm px-6 py-3.5 rounded-2xl shadow-sm hover:shadow-md transition-all cursor-pointer"
            >
              <span>全119問のFAQ一覧を見る</span>
              <LucideIcon name="ArrowRight" size={16} />
            </button>
          </div>

          {/* 8 Categories Direct Jump Pills */}
          <div className="pt-5">
            <div className="text-[11px] font-bold text-zinc-500 mb-2.5 flex items-center gap-1.5">
              <LucideIcon name="Compass" size={13} className="text-secondary" />
              <span>テーマ別にFAQを直接探す（クリックで移動）:</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {FAQ_8_CATEGORIES.filter(c => c.id !== 'all').map((cat) => {
                const count = FAQ_100_LIST.filter(i => i.eightCategory === cat.id).length;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => handleNavigateFaq(cat.id)}
                    className="flex items-center justify-between px-3 py-2 bg-white hover:bg-rose-50 text-zinc-700 hover:text-secondary rounded-xl border border-zinc-200/80 hover:border-rose-300 text-xs font-bold transition-all cursor-pointer shadow-2xs"
                  >
                    <span className="flex items-center gap-1.5">
                      <LucideIcon name={cat.icon} size={13} className="text-secondary" />
                      <span>{cat.label}</span>
                    </span>
                    <span className="text-[10px] text-zinc-400 font-semibold bg-zinc-50 px-1.5 py-0.5 rounded-md">
                      {count}問
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* ==========================================
            Consultant Advice & 24h LINE Contact Box
           ========================================== */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-rose-50 via-white to-rose-50 border border-rose-100 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-6 shadow-sm">
            <div className="w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0 bg-white rounded-full overflow-hidden border-2 border-secondary/30 shadow-md transform -rotate-3 hover:rotate-0 transition-transform">
              <img 
                src={CONSULTANT_AVATAR_URL} 
                alt="店舗採用担当 さくら" 
                className="w-full h-full object-cover" 
                loading="lazy"
                decoding="async"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  const target = e.currentTarget;
                  if (!target.dataset.tried) {
                    target.dataset.tried = '1';
                    target.src = '/images/sakura_advisor_portrait_1788920514818.jpg';
                  } else {
                    target.onerror = null;
                  }
                }}
              />
            </div>
            <div className="flex-1 text-center sm:text-left">
              <div className="inline-block bg-white text-secondary text-[11px] font-extrabold px-3 py-0.5 rounded-full border border-rose-200 mb-1.5 shadow-xs">
                {content?.sidebarRole || '店舗採用担当 さくらより'}
              </div>
              <p className="font-sans text-xs sm:text-sm font-semibold text-on-surface leading-relaxed mb-3">
                {content?.sidebarMessage || '「当店は働きやすさと安心感を一番に大切にしています。どんな些細な疑問や不安も気軽にお話しくださいね」'}
              </p>
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3">
                <a
                  href="#consultation"
                  onClick={(e) => {
                    if (onCtaclick) {
                      e.preventDefault();
                      onCtaclick();
                    }
                  }}
                  className="inline-flex items-center gap-2 bg-[#06C755] hover:bg-[#05b34c] text-white text-xs sm:text-sm font-black px-5 py-2.5 rounded-xl shadow-sm transition-all"
                >
                  <LucideIcon name="MessageCircle" size={16} />
                  <span>公式LINEで疑問を質問する（24時間受付）</span>
                </a>
                <span className="text-[11px] text-zinc-500 font-medium">
                  ※完全匿名・相談のみOK
                </span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
