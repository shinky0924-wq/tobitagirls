/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import * as LucideIcons from 'lucide-react';
import {
  SEARCH_INTENT_CATEGORIES,
  HIGH_INTENT_FAQS,
  SearchIntentCategoryKey,
  HighIntentFAQItem,
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
  // Selected category tab: 'all' or one of the 4 search-intent keys
  const [selectedTab, setSelectedTab] = useState<SearchIntentCategoryKey | 'all'>('beginner');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Track expanded questions by id
  const [openIds, setOpenIds] = useState<Set<string>>(new Set(['hi-beg-1', 'hi-sal-1']));

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

  const expandAll = (itemsToExpand: HighIntentFAQItem[]) => {
    setOpenIds(new Set(itemsToExpand.map(item => item.id)));
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

  // Filter items based on active tab and search input
  const filteredItems = useMemo(() => {
    let items = HIGH_INTENT_FAQS;
    if (selectedTab !== 'all') {
      items = items.filter(item => item.searchIntentCategory === selectedTab);
    }

    const q = searchQuery.trim().toLowerCase();
    if (!q) return items;

    return items.filter(item => {
      return (
        item.searchQuery.toLowerCase().includes(q) ||
        item.question.toLowerCase().includes(q) ||
        item.answer.toLowerCase().includes(q) ||
        item.keyTakeaways.some(t => t.toLowerCase().includes(q))
      );
    });
  }, [selectedTab, searchQuery]);

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-white via-rose-50/20 to-white" id="faq">
      <div className="max-w-[1040px] mx-auto px-4 sm:px-6">
        
        {/* ==========================================
            Section Header: 質を極めた4大検索インテント
           ========================================== */}
        <div className="text-center max-w-3xl mx-auto mb-10 md:mb-12">
          <div className="inline-flex items-center gap-2 bg-rose-100/90 text-secondary text-xs md:text-sm font-extrabold px-4 py-1.5 rounded-full mb-3 shadow-xs">
            <LucideIcon name="Search" size={14} />
            <span>応募前によく調べられているリアルな疑問</span>
          </div>

          <h2 className="font-display font-black text-2xl sm:text-3xl md:text-4xl text-on-surface leading-tight mb-4">
            実際に検索されている<br className="hidden sm:inline" />
            <span className="text-secondary">「4大疑問（初心者・給料・働き方・不安）」</span>を本音回答
          </h2>

          <p className="font-sans text-xs sm:text-sm md:text-base text-zinc-600 leading-relaxed">
            質問数の多さよりも、あなたが今いちばん不安に感じている「生の声」に寄り添うことを重視しました。<br className="hidden md:inline" />
            未経験の不安、給料の計算式と手渡し、自由シフト、家族・会社への身バレ防止まで、具体的な事実のみを回答しています。
          </p>
        </div>

        {/* ==========================================
            4 Search Intent Category Tabs
           ========================================== */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-3 mb-8" id="faq-search-intent-tabs">
          {SEARCH_INTENT_CATEGORIES.map((cat) => {
            const isSelected = selectedTab === cat.key;
            return (
              <button
                key={cat.key}
                type="button"
                onClick={() => {
                  setSelectedTab(cat.key);
                  // Auto-open first item in category if none open
                  const firstInCat = HIGH_INTENT_FAQS.find(i => i.searchIntentCategory === cat.key);
                  if (firstInCat) {
                    setOpenIds(prev => new Set([...prev, firstInCat.id]));
                  }
                }}
                className={`p-3.5 sm:p-4 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'bg-rose-50/80 border-secondary ring-2 ring-secondary/20 shadow-sm'
                    : 'bg-white hover:bg-rose-50/30 border-zinc-200/80 hover:border-rose-200 shadow-2xs'
                }`}
                id={`faq-tab-${cat.key}`}
              >
                <div className="flex items-center justify-between gap-1 mb-2">
                  <span className={`inline-flex items-center gap-1.5 text-xs font-black px-2.5 py-0.5 rounded-full border ${cat.colorClass}`}>
                    <LucideIcon name={cat.icon} size={13} />
                    <span>{cat.label}</span>
                  </span>
                  <span className="text-[11px] font-bold text-zinc-400">
                    5問
                  </span>
                </div>
                <div className="text-[11px] sm:text-xs font-bold text-zinc-800 line-clamp-1 mb-1">
                  {cat.subLabel}
                </div>
                <div className="text-[10px] text-zinc-500 line-clamp-1">
                  例: {cat.searchQueriesSample[0]}
                </div>
              </button>
            );
          })}
        </div>

        {/* ==========================================
            Filter Bar & Search Input
           ========================================== */}
        <div className="bg-white rounded-2xl border border-rose-100 p-3 sm:p-4 shadow-2xs mb-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            {/* Search Input */}
            <div className="relative w-full sm:w-80">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-400">
                <LucideIcon name="Search" size={15} />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="疑問を検索（例: 未経験, 日払い, 天引き, 身バレ）"
                className="w-full pl-9 pr-8 py-2 text-xs sm:text-sm bg-zinc-50 border border-zinc-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-secondary/30 focus:border-secondary transition-all"
                id="faq-quick-search-input"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-zinc-400 hover:text-zinc-600"
                  aria-label="検索クリア"
                >
                  <LucideIcon name="X" size={14} />
                </button>
              )}
            </div>

            {/* Quick Filter & Expand/Collapse */}
            <div className="w-full sm:w-auto flex items-center justify-between sm:justify-end gap-3 text-xs">
              <button
                type="button"
                onClick={() => setSelectedTab('all')}
                className={`px-3 py-1.5 rounded-lg font-bold text-xs transition-colors cursor-pointer ${
                  selectedTab === 'all'
                    ? 'bg-secondary text-white'
                    : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
                }`}
              >
                全20問表示
              </button>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => expandAll(filteredItems)}
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
          </div>
        </div>

        {/* ==========================================
            Accordion List Group (High-Quality Q&A)
           ========================================== */}
        <div className="space-y-3.5 mb-10" id="faq-accordions-group">
          {filteredItems.length === 0 ? (
            <div className="bg-white rounded-2xl border border-dashed border-zinc-300 p-8 text-center">
              <LucideIcon name="HelpCircle" size={32} className="text-zinc-400 mx-auto mb-2" />
              <p className="text-sm font-bold text-zinc-700 mb-1">
                該当する質問が見つかりませんでした
              </p>
              <p className="text-xs text-zinc-500 mb-4">
                キーワードを変えて検索するか、全119問のFAQデータベースをご確認ください。
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedTab('all');
                }}
                className="text-xs font-bold text-secondary underline cursor-pointer"
              >
                条件をリセットして全問表示
              </button>
            </div>
          ) : (
            filteredItems.map((faq, index) => {
              const isOpen = openIds.has(faq.id);

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
                      {/* Search query focus badge */}
                      <span className="flex-shrink-0 text-xs font-black bg-rose-100 text-secondary px-2.5 py-1 rounded-lg mt-0.5 sm:mt-0 select-none">
                        Q.{(index + 1).toString().padStart(2, '0')}
                      </span>

                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-1.5 mb-1.5">
                          {/* Search Query Intent Pill */}
                          <span className="text-[11px] font-black text-rose-700 bg-rose-50 border border-rose-200/80 px-2.5 py-0.5 rounded-full inline-flex items-center gap-1">
                            <LucideIcon name="Search" size={10} />
                            <span>検索: 「{faq.searchQuery}」</span>
                          </span>

                          <span className="text-[10px] font-bold text-zinc-600 bg-zinc-100 px-2 py-0.5 rounded-full">
                            {faq.searchIntentCategoryLabel}
                          </span>

                          {faq.highlightLabel && (
                            <span className="text-[10px] font-bold text-amber-700 bg-amber-50 border border-amber-200/60 px-2 py-0.5 rounded-full inline-flex items-center gap-0.5">
                              <LucideIcon name="Sparkles" size={10} />
                              {faq.highlightLabel}
                            </span>
                          )}
                        </div>

                        <h3 className="font-sans font-bold text-xs sm:text-sm md:text-base text-zinc-900 leading-snug">
                          {faq.question}
                        </h3>
                      </div>
                    </div>

                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                      className={`text-zinc-400 flex-shrink-0 mt-1 sm:mt-0 ${isOpen ? 'text-secondary' : ''}`}
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
                        <div className="px-4 sm:px-6 pb-6 pt-0 font-sans text-xs sm:text-sm text-zinc-700 leading-relaxed border-t border-rose-100/60">
                          <div className="pt-4 flex gap-3">
                            <span className="text-secondary font-black text-base sm:text-lg select-none flex-shrink-0">
                              A.
                            </span>
                            <div className="flex-1 space-y-3.5">
                              {/* Key Takeaways Box */}
                              {faq.keyTakeaways && faq.keyTakeaways.length > 0 && (
                                <div className="bg-rose-50/60 border border-rose-100/90 rounded-xl p-3.5 space-y-1.5">
                                  <div className="text-[11px] font-black text-secondary flex items-center gap-1.5">
                                    <LucideIcon name="CheckCircle2" size={13} className="text-emerald-600" />
                                    <span>この質問の結論・重要ポイント:</span>
                                  </div>
                                  <ul className="space-y-1">
                                    {faq.keyTakeaways.map((point, idx) => (
                                      <li key={idx} className="text-xs font-semibold text-zinc-800 flex items-start gap-1.5">
                                        <span className="text-secondary font-black">・</span>
                                        <span>{point}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )}

                              {/* Detailed Answer Body */}
                              <div className="whitespace-pre-line text-xs sm:text-sm text-zinc-800 leading-relaxed font-normal">
                                {faq.answer}
                              </div>

                              {/* Action: Ask via LINE */}
                              <div className="pt-2 flex flex-wrap items-center justify-between gap-2 border-t border-zinc-100">
                                <span className="text-[11px] text-zinc-500">
                                  もっと詳しく知りたい・個別の相談がある方へ
                                </span>
                                <button
                                  type="button"
                                  onClick={() => {
                                    if (onCtaclick) {
                                      onCtaclick();
                                    } else if (typeof window !== 'undefined') {
                                      window.location.href = '#consultation';
                                    }
                                  }}
                                  className="inline-flex items-center gap-1.5 text-xs font-bold text-secondary hover:text-rose-600 bg-rose-50 hover:bg-rose-100 px-3 py-1 rounded-lg border border-rose-200 transition-colors cursor-pointer"
                                >
                                  <LucideIcon name="MessageCircle" size={13} />
                                  <span>この質問をLINEで相談する</span>
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })
          )}
        </div>

        {/* ==========================================
            Dedicated FAQ Hub Banner & 8 Category Jump Links
           ========================================== */}
        <div className="bg-gradient-to-r from-rose-50/90 via-white to-rose-50/90 border border-rose-200 rounded-3xl p-6 sm:p-8 shadow-sm mb-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-6 border-b border-rose-100">
            <div className="text-center md:text-left">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-secondary bg-white px-3 py-1 rounded-full border border-rose-200 mb-2 shadow-2xs">
                <LucideIcon name="Layers" size={13} />
                <span>全119問のFAQデータベース</span>
              </div>
              <h3 className="font-bold text-base sm:text-lg text-zinc-900 mb-1">
                もっと細かい条件やマイナーな質問も網羅したい方へ
              </h3>
              <p className="text-xs sm:text-sm text-zinc-600">
                上記4大疑問のほか、「面接・給料・未経験・勤務時間・身バレ・寮・Wワーク・退店」の全8テーマ・全119問の網羅データベースを公開しています。
              </p>
            </div>

            <button
              type="button"
              onClick={() => handleNavigateFaq()}
              className="flex-shrink-0 inline-flex items-center gap-2 bg-secondary hover:bg-rose-600 text-white font-black text-xs sm:text-sm px-6 py-3.5 rounded-2xl shadow-sm hover:shadow-md transition-all cursor-pointer"
            >
              <span>全119問のFAQデータベースを見る</span>
              <LucideIcon name="ArrowRight" size={16} />
            </button>
          </div>

          {/* 8 Categories Direct Jump Pills */}
          <div className="pt-5">
            <div className="text-[11px] font-bold text-zinc-500 mb-2.5 flex items-center gap-1.5">
              <LucideIcon name="Compass" size={13} className="text-secondary" />
              <span>テーマ別に全119問から直接探す:</span>
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
                  className="inline-flex items-center gap-2 bg-[#06C755] hover:bg-[#05b34c] text-white text-xs font-bold px-4 py-2 rounded-xl shadow-xs transition-all cursor-pointer"
                >
                  <LucideIcon name="MessageCircle" size={15} />
                  <span>LINEで不安や疑問を直接相談する（24時間受付）</span>
                </a>
                <span className="text-[11px] text-zinc-500 font-medium">
                  ※応募前のご質問のみでも歓迎・匿名相談OK
                </span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
