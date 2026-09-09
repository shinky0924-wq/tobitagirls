/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import * as LucideIcons from 'lucide-react';
import {
  FAQ100Item,
  FAQ_8_CATEGORIES,
  FAQCategoryDef,
  FAQ_100_LIST,
  filterFAQ100,
  FAQ8Category
} from '../faq100Data';
import { CONSULTANT_AVATAR_URL } from '../data';

function LucideIcon({ name, size = 16, className = '' }: { name: string; size?: number; className?: string }) {
  const IconComponent = (LucideIcons as any)[name] || LucideIcons.HelpCircle;
  return <IconComponent size={size} className={className} />;
}

const POPULAR_SEARCH_TAGS = [
  '未経験',
  '日払い',
  '週1日',
  '身バレ',
  'お酒',
  '30代',
  'Wワーク',
  '寮',
  '退店',
  'LINE相談'
];

interface FAQPageProps {
  initialCategory?: string | null;
  onNavigateHome: () => void;
  onCtaclick?: () => void;
}

export default function FAQPage({ initialCategory, onNavigateHome, onCtaclick }: FAQPageProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>(() => {
    if (initialCategory && FAQ_8_CATEGORIES.some(c => c.id === initialCategory || c.slug === initialCategory)) {
      return initialCategory;
    }
    return 'all';
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [openIds, setOpenIds] = useState<Set<string>>(() => {
    // Open the first 3 items by default for immediate preview
    return new Set(FAQ_100_LIST.slice(0, 3).map(i => i.id));
  });
  const [displayLimit, setDisplayLimit] = useState(25);

  useEffect(() => {
    if (initialCategory && FAQ_8_CATEGORIES.some(c => c.id === initialCategory || c.slug === initialCategory)) {
      setSelectedCategory(initialCategory);
    }
  }, [initialCategory]);

  useEffect(() => {
    // Reset display limit when category or search changes
    setDisplayLimit(25);
  }, [selectedCategory, searchQuery]);

  // Update page title and meta for SEO
  useEffect(() => {
    const originalTitle = document.title;
    document.title = '飛田新地求人 FAQ（全119問）｜8大目的別よくある質問集【公式】';
    window.scrollTo({ top: 0, behavior: 'smooth' });

    return () => {
      document.title = originalTitle;
    };
  }, []);

  const filteredItems = useMemo(() => {
    return filterFAQ100(selectedCategory, searchQuery);
  }, [selectedCategory, searchQuery]);

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
    const allVisibleIds = new Set(filteredItems.slice(0, displayLimit).map(item => item.id));
    setOpenIds(allVisibleIds);
  };

  const collapseAll = () => {
    setOpenIds(new Set());
  };

  const activeCategoryDef = useMemo(() => {
    return FAQ_8_CATEGORIES.find(c => c.id === selectedCategory) || FAQ_8_CATEGORIES[0];
  }, [selectedCategory]);

  const displayedList = filteredItems.slice(0, displayLimit);
  const hasMore = filteredItems.length > displayLimit;

  // Category item counts for badges
  const categoryCounts = useMemo(() => {
    const map: Record<string, number> = { all: FAQ_100_LIST.length };
    FAQ_8_CATEGORIES.forEach(cat => {
      if (cat.id !== 'all') {
        map[cat.id] = FAQ_100_LIST.filter(item => item.eightCategory === cat.id).length;
      }
    });
    return map;
  }, []);

  // Generate JSON-LD for rich search results / LLM consumption
  const jsonLdData = useMemo(() => {
    return {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      'mainEntity': FAQ_100_LIST.slice(0, 30).map(item => ({
        '@type': 'Question',
        'name': item.question,
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': item.answer
        }
      }))
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#faf8f7] via-white to-[#faf8f7] text-[#2c1810]">
      {/* Structured data injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
      />

      <div className="max-w-[1120px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* ==========================================
            Breadcrumb Navigation
           ========================================== */}
        <nav className="flex items-center gap-2 text-xs text-zinc-500 mb-6" aria-label="Breadcrumb">
          <button
            type="button"
            onClick={onNavigateHome}
            className="hover:text-secondary flex items-center gap-1 transition-colors"
          >
            <LucideIcon name="Home" size={13} />
            <span>求人トップ</span>
          </button>
          <span className="text-zinc-300">/</span>
          <span className="text-zinc-800 font-bold">飛田新地求人 FAQ</span>
          {selectedCategory !== 'all' && (
            <>
              <span className="text-zinc-300">/</span>
              <span className="text-secondary font-bold">{activeCategoryDef.label}</span>
            </>
          )}
        </nav>

        {/* ==========================================
            Hero Header
           ========================================== */}
        <div className="text-center max-w-3xl mx-auto mb-10 md:mb-12">
          <div className="inline-flex items-center gap-2 bg-rose-100 text-secondary text-xs sm:text-sm font-extrabold px-4 py-1.5 rounded-full mb-4 shadow-xs">
            <LucideIcon name="HelpCircle" size={15} />
            <span>飛田新地求人 FAQ（全119問・8大テーマ体系化）</span>
          </div>

          <h1 className="font-display font-black text-2xl sm:text-3xl md:text-4xl text-[#2c1810] leading-tight mb-4">
            疑問や不安をすべて解消する<br />
            <span className="text-secondary">飛田新地求人 119問FAQ</span>
          </h1>

          <p className="font-sans text-xs sm:text-sm md:text-base text-zinc-600 leading-relaxed mb-4">
            「応募・面接」「給料」「未経験」「勤務時間」「身バレ」「寮」「Wワーク」「退店」の8つの重要テーマに体系化。
            応募前に女の子から寄せられる119のリアルな疑問に、現場の実務基準に基づき本音で回答しています。
          </p>

          <div className="inline-flex items-center gap-2 text-[11px] sm:text-xs text-zinc-500 bg-white border border-rose-100 px-3.5 py-1.5 rounded-full shadow-2xs">
            <LucideIcon name="CheckCircle2" size={13} className="text-emerald-600" />
            <span>2026年最新求人実務基準で監修済み</span>
            <span className="text-zinc-300">|</span>
            <span>女性専任スタッフ常駐</span>
          </div>
        </div>

        {/* ==========================================
            Architecture Tree: 8大テーマ体系図
           ========================================== */}
        <div className="bg-white rounded-3xl p-5 sm:p-7 border border-rose-100 shadow-sm mb-10">
          <div className="flex items-center justify-between gap-2 mb-4 pb-3 border-b border-rose-100/60">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-rose-50 text-secondary flex items-center justify-center">
                <LucideIcon name="GitBranch" size={16} />
              </div>
              <div>
                <h2 className="font-bold text-sm sm:text-base text-zinc-900">
                  飛田新地求人 FAQ 8大テーマ体系図
                </h2>
                <p className="text-[11px] text-zinc-500">
                  知りたいテーマをクリックすると即座に絞り込まれます
                </p>
              </div>
            </div>
            <span className="hidden sm:inline-block text-xs font-bold text-secondary bg-rose-50 px-3 py-1 rounded-full border border-rose-100">
              全119問
            </span>
          </div>

          {/* Grid of the 8 Themes */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3">
            {FAQ_8_CATEGORIES.filter(c => c.id !== 'all').map((cat) => {
              const isSelected = selectedCategory === cat.id;
              const count = categoryCounts[cat.id] || 0;

              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => {
                    setSelectedCategory(cat.id);
                    // Update URL query without full reload
                    if (typeof window !== 'undefined') {
                      window.history.replaceState({}, '', `/faq?category=${cat.id}`);
                    }
                  }}
                  className={`flex flex-col items-start p-3 sm:p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-rose-50/70 border-secondary ring-1 ring-secondary/20 shadow-xs'
                      : 'bg-zinc-50/50 hover:bg-rose-50/30 border-zinc-200/70 hover:border-rose-200'
                  }`}
                >
                  <div className="flex items-center justify-between w-full mb-1.5">
                    <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${
                      isSelected ? 'bg-secondary text-white' : 'bg-white text-zinc-700 border border-zinc-200/60'
                    }`}>
                      <LucideIcon name={cat.icon} size={14} />
                    </div>
                    <span className={`text-[11px] font-black px-2 py-0.5 rounded-full ${
                      isSelected ? 'bg-secondary text-white' : 'bg-white text-zinc-600 border border-zinc-200/60'
                    }`}>
                      {count}問
                    </span>
                  </div>
                  <span className={`font-bold text-xs sm:text-sm ${
                    isSelected ? 'text-secondary font-black' : 'text-zinc-800'
                  }`}>
                    {cat.label}
                  </span>
                  <span className="text-[10px] text-zinc-500 line-clamp-1 mt-0.5">
                    {cat.description}
                  </span>
                </button>
              );
            })}
          </div>

          {/* All button */}
          <div className="mt-3.5 pt-3 border-t border-rose-100/60 flex justify-end">
            <button
              type="button"
              onClick={() => {
                setSelectedCategory('all');
                if (typeof window !== 'undefined') {
                  window.history.replaceState({}, '', '/faq');
                }
              }}
              className={`text-xs font-bold px-3.5 py-1.5 rounded-xl border transition-all cursor-pointer inline-flex items-center gap-1.5 ${
                selectedCategory === 'all'
                  ? 'bg-secondary text-white border-secondary shadow-2xs'
                  : 'bg-white hover:bg-rose-50 text-zinc-600 border-zinc-200'
              }`}
            >
              <LucideIcon name="Layers" size={13} />
              <span>すべての質問（全119問）を表示</span>
            </button>
          </div>
        </div>

        {/* ==========================================
            Search Bar & Keyword Quick Pills
           ========================================== */}
        <div className="bg-white rounded-3xl p-4 sm:p-6 border border-rose-100/80 shadow-sm mb-8">
          <div className="relative mb-3">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-rose-400">
              <LucideIcon name="Search" size={18} />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="疑問をキーワードで検索（例: 未経験、日払い、週1日、身バレ、お酒、30代、寮、退店）"
              className="w-full pl-11 pr-10 py-3 bg-[#faf8f7] border border-rose-200/80 rounded-2xl text-xs sm:text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-secondary/30 focus:border-secondary transition-all"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-zinc-400 hover:text-zinc-600 transition-colors"
                title="検索をクリア"
              >
                <LucideIcon name="X" size={16} />
              </button>
            )}
          </div>

          {/* Quick Search Tag Pills */}
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
            <span className="text-[11px] font-bold text-zinc-500 mr-1 flex items-center gap-1">
              <LucideIcon name="TrendingUp" size={13} className="text-secondary" />
              注目のキーワード:
            </span>
            {POPULAR_SEARCH_TAGS.map((tag) => {
              const isCurrent = searchQuery === tag;
              return (
                <button
                  key={tag}
                  type="button"
                  onClick={() => setSearchQuery(isCurrent ? '' : tag)}
                  className={`text-[11px] sm:text-xs font-medium px-2.5 py-1 rounded-full transition-all cursor-pointer ${
                    isCurrent
                      ? 'bg-secondary text-white font-bold shadow-xs'
                      : 'bg-zinc-100 hover:bg-rose-100 text-zinc-700 hover:text-secondary'
                  }`}
                >
                  #{tag}
                </button>
              );
            })}
          </div>
        </div>

        {/* ==========================================
            Category Tabs & Active Category Info
           ========================================== */}
        <div className="mb-6">
          <div className="flex items-center justify-between gap-2 mb-3">
            <span className="text-xs font-extrabold text-zinc-900 flex items-center gap-1.5">
              <LucideIcon name="Filter" size={14} className="text-secondary" />
              <span>選択中のテーマ: <strong className="text-secondary">{activeCategoryDef.label}</strong></span>
            </span>
            <span className="text-xs font-bold text-secondary bg-rose-50 px-2.5 py-0.5 rounded-full border border-rose-100">
              該当 {filteredItems.length} 問
            </span>
          </div>

          {/* Horizontal scrollable pills */}
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0">
            {FAQ_8_CATEGORIES.map((cat: FAQCategoryDef) => {
              const isActive = selectedCategory === cat.id;
              const count = categoryCounts[cat.id] || 0;

              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => {
                    setSelectedCategory(cat.id);
                    if (typeof window !== 'undefined') {
                      window.history.replaceState(
                        {},
                        '',
                        cat.id === 'all' ? '/faq' : `/faq?category=${cat.id}`
                      );
                    }
                  }}
                  className={`flex-shrink-0 flex items-center gap-1.5 text-xs sm:text-sm font-bold px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-2xl transition-all cursor-pointer border ${
                    isActive
                      ? 'bg-gradient-to-r from-secondary to-rose-600 text-white border-secondary shadow-xs shadow-rose-500/20'
                      : 'bg-white hover:bg-rose-50/60 text-zinc-700 border-zinc-200/80 hover:border-rose-200'
                  }`}
                >
                  <LucideIcon name={cat.icon} size={14} />
                  <span>{cat.shortLabel}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full ml-0.5 ${
                    isActive ? 'bg-white/20 text-white font-extrabold' : 'bg-zinc-100 text-zinc-500 font-semibold'
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Active Category Description & Expand/Collapse All Buttons */}
          <div className="mt-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-1 border-t border-rose-100/60 text-xs">
            <p className="text-zinc-600">
              <strong className="text-secondary font-bold">{activeCategoryDef.label}:</strong> {activeCategoryDef.description}
            </p>
            <div className="flex items-center gap-2 self-end sm:self-auto flex-shrink-0">
              <button
                type="button"
                onClick={expandAll}
                className="text-[11px] font-bold text-zinc-600 hover:text-secondary px-2 py-1 rounded hover:bg-rose-50 transition-colors"
              >
                すべて開く
              </button>
              <span className="text-zinc-300">|</span>
              <button
                type="button"
                onClick={collapseAll}
                className="text-[11px] font-bold text-zinc-600 hover:text-secondary px-2 py-1 rounded hover:bg-rose-50 transition-colors"
              >
                すべて閉じる
              </button>
            </div>
          </div>
        </div>

        {/* ==========================================
            Accordion Questions List
           ========================================== */}
        <div className="space-y-3 md:space-y-4 mb-10" id="faq-accordions-group">
          {displayedList.length === 0 ? (
            <div className="bg-white rounded-3xl p-10 text-center border border-dashed border-rose-200 my-6">
              <div className="w-12 h-12 bg-rose-50 text-secondary rounded-full flex items-center justify-center mx-auto mb-3">
                <LucideIcon name="SearchX" size={24} />
              </div>
              <h3 className="font-bold text-base text-zinc-900 mb-1">
                該当する質問が見つかりませんでした
              </h3>
              <p className="text-xs text-zinc-500 mb-4">
                「{searchQuery}」に一致する質問はありませんでした。別のキーワードでお試しいただくか、カテゴリーを選択してください。
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                }}
                className="text-xs font-bold bg-secondary text-white px-4 py-2 rounded-xl shadow-xs hover:bg-rose-600 transition-colors"
              >
                すべての質問を表示する
              </button>
            </div>
          ) : (
            displayedList.map((faq: FAQ100Item, index: number) => {
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
                  id={`faq-item-${faq.id}`}
                >
                  <button
                    onClick={() => toggleItem(faq.id)}
                    className={`w-full flex justify-between items-start sm:items-center p-4 sm:p-5 text-left cursor-pointer gap-3 sm:gap-4 transition-colors ${
                      isOpen ? 'bg-rose-50/20' : 'hover:bg-rose-50/10'
                    }`}
                  >
                    <div className="flex items-start sm:items-center gap-2.5 sm:gap-3 flex-1 min-w-0">
                      <span className="flex-shrink-0 text-xs font-black bg-rose-100 text-secondary px-2.5 py-1 rounded-lg mt-0.5 sm:mt-0 select-none">
                        Q.{questionIndex.toString().padStart(2, '0')}
                      </span>
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-1.5 mb-1">
                          <span className="text-[10px] font-bold text-zinc-600 bg-zinc-100 px-2 py-0.5 rounded-full">
                            {faq.eightCategoryLabel}
                          </span>
                          {faq.isPopular && (
                            <span className="text-[10px] font-bold text-amber-700 bg-amber-50 border border-amber-200 px-1.5 py-0.5 rounded-full inline-flex items-center gap-0.5">
                              <LucideIcon name="Sparkles" size={10} />
                              注目
                            </span>
                          )}
                        </div>
                        <h3 className="font-sans font-bold text-xs sm:text-sm md:text-base text-zinc-900 group-hover:text-secondary leading-snug">
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
                        <div className="px-4 sm:px-6 pb-5 pt-0 font-sans text-xs sm:text-sm text-zinc-700 leading-relaxed border-t border-rose-100/50">
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
            })
          )}
        </div>

        {/* ==========================================
            Pagination / Load More Controls
           ========================================== */}
        {hasMore && (
          <div className="text-center mb-12 space-y-2 max-w-md mx-auto">
            <button
              type="button"
              onClick={() => setDisplayLimit(prev => prev + 25)}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white hover:bg-rose-50 text-secondary font-bold text-xs sm:text-sm px-6 py-3 rounded-2xl border border-secondary/40 shadow-2xs hover:shadow-xs transition-all cursor-pointer"
            >
              <LucideIcon name="ChevronDown" size={16} />
              <span>さらに質問を表示する（残り {filteredItems.length - displayLimit} 問）</span>
            </button>
            <div>
              <button
                type="button"
                onClick={() => setDisplayLimit(filteredItems.length)}
                className="text-[11px] text-zinc-500 hover:text-secondary underline underline-offset-2 transition-colors"
              >
                該当する全 {filteredItems.length} 問を一括表示する
              </button>
            </div>
          </div>
        )}

        {/* ==========================================
            Consultant Advice & 24h LINE Contact Box
           ========================================== */}
        <div className="bg-gradient-to-r from-rose-50 via-white to-rose-50 border border-rose-100 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-6 shadow-sm mb-10">
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
              店舗採用担当 さくらより
            </div>
            <p className="font-sans text-xs sm:text-sm font-semibold text-zinc-800 leading-relaxed mb-3">
              「当店は働きやすさと安心感を一番に大切にしています。どんな些細な疑問や不安も気軽にお話しくださいね」
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
                className="inline-flex items-center gap-2 bg-[#06C755] hover:bg-[#05b34c] text-white text-xs sm:text-sm font-black px-5 py-2.5 rounded-xl shadow-xs transition-all"
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

        {/* ==========================================
            Return to Recruit Top Page Button
           ========================================== */}
        <div className="text-center pt-2">
          <button
            type="button"
            onClick={onNavigateHome}
            className="inline-flex items-center gap-2 bg-white hover:bg-zinc-50 text-zinc-700 hover:text-secondary text-xs sm:text-sm font-bold px-6 py-2.5 rounded-2xl border border-zinc-200 shadow-2xs transition-all"
          >
            <LucideIcon name="ArrowLeft" size={15} />
            <span>飛田新地求人トップへ戻る</span>
          </button>
        </div>

      </div>
    </div>
  );
}
