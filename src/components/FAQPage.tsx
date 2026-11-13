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
  FAQ8Category,
  HIGH_INTENT_FAQS,
  SEARCH_INTENT_CATEGORIES,
  SearchIntentCategoryKey,
  HighIntentFAQItem
} from '../faq100Data';
import { CONSULTANT_AVATAR_URL } from '../data';
import { updatePageJsonLd } from '../utils/jsonLd';

function LucideIcon({ name, size = 16, className = '' }: { name: string; size?: number; className?: string }) {
  const IconComponent = (LucideIcons as any)[name] || LucideIcons.HelpCircle;
  return <IconComponent size={size} className={className} />;
}

const POPULAR_SEARCH_TAGS = [
  '未経験でも大丈夫？',
  '初日は何をする？',
  '面接で何を聞かれる？',
  '体験入店',
  '日払い',
  '給料の計算方法',
  '天引きはある？',
  '週1でもいい？',
  '短時間',
  'Wワーク',
  '個室寮',
  '身バレが心配',
  '会社に知られたくない',
  '写真掲載はある？',
  'SNSに載る？'
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

  const [highIntentTab, setHighIntentTab] = useState<SearchIntentCategoryKey>('beginner');
  const [highIntentOpenIds, setHighIntentOpenIds] = useState<Set<string>>(new Set(['hi-beg-1', 'hi-sal-1']));

  const toggleHighIntentItem = (id: string) => {
    setHighIntentOpenIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  // Generate JSON-LD for rich search results / LLM consumption
  const jsonLdData = useMemo(() => {
    const highIntentEntities = HIGH_INTENT_FAQS.map(item => ({
      '@type': 'Question',
      'name': `【${item.searchIntentCategoryLabel}】${item.searchQuery}（${item.question}）`,
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': `${item.keyTakeaways.join(' / ')}\n\n${item.answer}`
      }
    }));

    const standardEntities = FAQ_100_LIST.slice(0, 30).map(item => ({
      '@type': 'Question',
      'name': item.question,
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': item.answer
      }
    }));

    return {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'BreadcrumbList',
          '@id': 'https://tobitashinchi-recruit.com/faq#breadcrumb',
          'itemListElement': [
            {
              '@type': 'ListItem',
              'position': 1,
              'name': '飛田新地求人トップ',
              'item': 'https://tobitashinchi-recruit.com/'
            },
            {
              '@type': 'ListItem',
              'position': 2,
              'name': '飛田新地求人FAQ（全119問・8大目的別）',
              'item': 'https://tobitashinchi-recruit.com/faq'
            }
          ]
        },
        {
          '@type': 'FAQPage',
          '@id': 'https://tobitashinchi-recruit.com/faq#faq',
          'mainEntity': [...highIntentEntities, ...standardEntities]
        }
      ]
    };
  }, []);

  useEffect(() => {
    updatePageJsonLd(jsonLdData);
  }, [jsonLdData]);

  return (
    <div className="min-h-screen bg-[#FFF9FB] text-[#35313A]">
      <div className="max-w-[1120px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* ==========================================
            Breadcrumb Navigation
           ========================================== */}
        <nav className="flex items-center gap-2 text-xs text-[#85818A] mb-6" aria-label="Breadcrumb">
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              onNavigateHome();
            }}
            className="hover:text-[#D94B7A] flex items-center gap-1 transition-colors cursor-pointer"
          >
            <LucideIcon name="Home" size={13} />
            <span>求人トップ</span>
          </a>
          <span className="text-[#F0E5EA]">/</span>
          <span className="text-[#35313A] font-bold">飛田新地求人 FAQ</span>
          {selectedCategory !== 'all' && (
            <>
              <span className="text-[#F0E5EA]">/</span>
              <span className="text-[#D94B7A] font-bold">{activeCategoryDef.label}</span>
            </>
          )}
        </nav>

        {/* ==========================================
            Hero Header
           ========================================== */}
        <div className="text-center max-w-3xl mx-auto mb-10 md:mb-12">
          <div className="inline-flex items-center gap-2 bg-[#FCE8EF] text-[#D94B7A] text-xs sm:text-sm font-bold px-4 py-1.5 rounded-full mb-4 shadow-2xs">
            <LucideIcon name="HelpCircle" size={15} />
            <span>飛田新地求人 FAQ（全119問・8大テーマ体系化）</span>
          </div>

          <h1 className="font-display font-bold text-2xl sm:text-3xl md:text-4xl text-[#35313A] leading-tight mb-4">
            疑問や不安をすべて解消する<br />
            <span className="text-[#D94B7A]">飛田新地求人 119問FAQ</span>
          </h1>

          <p className="font-sans text-xs sm:text-sm md:text-base text-[#85818A] leading-relaxed mb-4">
            「応募・面接」「給料」「未経験」「勤務時間」「身バレ」「寮」「Wワーク」「退店」の8つの重要テーマに体系化。
            応募前に女の子から寄せられる119のリアルな疑問に、現場の実務基準に基づき本音で回答しています。
          </p>

          {/* Advisor Reassurance Quick Card */}
          <div className="mt-6 mb-2 p-4 sm:p-5 bg-white rounded-2xl border border-[#F0E5EA] shadow-sm flex flex-col sm:flex-row items-center gap-4 text-left">
            <img 
              src={CONSULTANT_AVATAR_URL} 
              alt="女性サポート担当 さくら" 
              className="w-14 h-14 sm:w-16 sm:h-16 rounded-full object-cover border-2 border-[#FCE8EF] shadow-sm shrink-0" 
            />
            <div className="flex-1 text-center sm:text-left">
              <div className="inline-block bg-[#FCE8EF] text-[#D94B7A] text-[10px] font-bold px-2 py-0.5 rounded-full mb-1">
                女性相談スタッフより
              </div>
              <p className="text-xs sm:text-sm font-bold text-[#35313A] leading-snug">
                「こんなこと聞いてもいいのかな？」という不安もすべて解決します。
              </p>
              <p className="text-[11px] text-[#85818A] mt-0.5 leading-relaxed">
                気になる質問のタブをタップするか、下の検索窓からキーワードで探せます。直接LINEでの質問も大歓迎です。
              </p>
            </div>
            {onCtaclick && (
              <button
                type="button"
                onClick={onCtaclick}
                className="shrink-0 px-4 py-2 rounded-xl bg-[#06C755] hover:bg-[#05b34c] text-white font-bold text-xs shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
              >
                <LucideIcon name="MessageCircle" size={14} className="fill-white" />
                <span>LINEで相談</span>
              </button>
            )}
          </div>
        </div>

        {/* ==========================================
            High-Intent Search Queries Showcase (4大疑問・質重視Q&A)
           ========================================== */}
        <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-7 border border-[#F0E5EA] shadow-sm mb-10" id="high-intent-faq-showcase">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-[#F0E5EA]">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#D94B7A] bg-[#FCE8EF] px-3 py-1 rounded-full mb-2">
                <LucideIcon name="Search" size={13} />
                <span>応募前によくいただく4大疑問</span>
              </div>
              <h2 className="font-display font-bold text-lg sm:text-xl text-[#35313A]">
                「初心者・給料・働き方・不安」の最重要Q&A
              </h2>
              <p className="text-xs sm:text-sm text-[#85818A] mt-1">
                応募前によくいただくリアルな質問に、具体的な数字と事実で回答しています。
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold text-[#85818A] bg-[#FFF9FB] px-2.5 py-1 rounded-full border border-[#F0E5EA]">
                厳選20問
              </span>
            </div>
          </div>

          {/* 4 Category Switcher Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 mb-6">
            {SEARCH_INTENT_CATEGORIES.map((cat) => {
              const isTabActive = highIntentTab === cat.key;
              return (
                <button
                  key={cat.key}
                  type="button"
                  onClick={() => setHighIntentTab(cat.key)}
                  className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                    isTabActive
                      ? 'bg-[#FCE8EF]/70 border-[#D94B7A] shadow-xs'
                      : 'bg-white hover:bg-[#FFF9FB] border-[#F0E5EA]'
                  }`}
                >
                  <div className="flex items-center justify-between gap-1 mb-1">
                    <span className={`inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full ${
                      isTabActive ? 'bg-[#D94B7A] text-white' : 'bg-[#FCE8EF] text-[#D94B7A]'
                    }`}>
                      <LucideIcon name={cat.icon} size={11} />
                      <span>{cat.label}</span>
                    </span>
                    <span className="text-[10px] font-bold text-[#85818A]">5問</span>
                  </div>
                  <div className={`text-xs font-bold line-clamp-1 ${isTabActive ? 'text-[#D94B7A]' : 'text-[#35313A]'}`}>
                    {cat.subLabel}
                  </div>
                </button>
              );
            })}
          </div>

          {/* High Intent Accordion List for Active Tab */}
          <div className="space-y-3">
            {HIGH_INTENT_FAQS.filter(item => item.searchIntentCategory === highIntentTab).map((faq, idx) => {
              const isOpen = highIntentOpenIds.has(faq.id);

              return (
                <div
                  key={faq.id}
                  className={`rounded-2xl border transition-all overflow-hidden ${
                    isOpen
                      ? 'bg-white border-[#D94B7A] shadow-xs ring-1 ring-[#D94B7A]/10'
                      : 'bg-white hover:border-[#D94B7A]/40 border-[#F0E5EA]'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => toggleHighIntentItem(faq.id)}
                    className="w-full flex justify-between items-start sm:items-center p-3.5 sm:p-4 text-left cursor-pointer gap-3"
                  >
                    <div className="flex items-start sm:items-center gap-2.5 flex-1 min-w-0">
                      <span className="flex-shrink-0 text-xs font-bold bg-[#FCE8EF] text-[#D94B7A] px-2.5 py-1 rounded-lg">
                        Q.{(idx + 1).toString().padStart(2, '0')}
                      </span>
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-1.5 mb-1">
                          <span className="text-[10px] font-bold text-[#D94B7A] bg-[#FCE8EF] px-2 py-0.2 rounded-full inline-flex items-center gap-1">
                            <LucideIcon name="Search" size={9} />
                            <span>「{faq.searchQuery}」</span>
                          </span>
                          {faq.highlightLabel && (
                            <span className="text-[10px] font-bold text-amber-700 bg-amber-50 border border-amber-200/60 px-1.5 py-0.2 rounded-full inline-flex items-center gap-0.5">
                              <LucideIcon name="Sparkles" size={9} />
                              {faq.highlightLabel}
                            </span>
                          )}
                        </div>
                        <h3 className="font-bold text-xs sm:text-sm text-[#35313A] leading-snug">
                          {faq.question}
                        </h3>
                      </div>
                    </div>

                    <div className={`text-[#85818A] flex-shrink-0 transition-transform ${isOpen ? 'rotate-180 text-[#D94B7A]' : ''}`}>
                      <LucideIcon name="ChevronDown" size={16} />
                    </div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="px-4 sm:px-5 pb-5 pt-0 text-xs sm:text-sm text-[#35313A] border-t border-[#F0E5EA]">
                          <div className="pt-3 flex gap-2.5">
                            <span className="text-[#D94B7A] font-black text-base select-none flex-shrink-0">
                              A.
                            </span>
                            <div className="flex-1 space-y-3">
                              {faq.keyTakeaways && faq.keyTakeaways.length > 0 && (
                                <div className="bg-[#FFF9FB] border border-[#F0E5EA] rounded-xl p-3 space-y-1">
                                  <div className="text-[11px] font-bold text-[#D94B7A] flex items-center gap-1">
                                    <LucideIcon name="CheckCircle2" size={12} className="text-[#06C755]" />
                                    <span>重要ポイント:</span>
                                  </div>
                                  <ul className="space-y-0.5">
                                    {faq.keyTakeaways.map((point, pIdx) => (
                                      <li key={pIdx} className="text-xs font-semibold text-[#35313A] flex items-start gap-1">
                                        <span className="text-[#D94B7A]">・</span>
                                        <span>{point}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )}

                              <p className="whitespace-pre-line text-xs sm:text-sm text-[#35313A] leading-relaxed font-normal">
                                {faq.answer}
                              </p>

                              <div className="pt-2 flex flex-wrap items-center justify-between gap-2 border-t border-[#F0E5EA]">
                                <span className="text-[11px] text-[#85818A]">
                                  LINEなら匿名で24時間いつでも質問できます
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
                                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#D94B7A] hover:text-[#C23867] bg-[#FCE8EF] hover:bg-[#FCE8EF]/80 px-3 py-1 rounded-xl border border-[#D94B7A]/30 transition-colors cursor-pointer"
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
            })}
          </div>
        </div>

        {/* ==========================================
            Architecture Tree: 8大テーマ体系図
           ========================================== */}
        <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-7 border border-[#F0E5EA] shadow-sm mb-10">
          <div className="flex items-center justify-between gap-2 mb-4 pb-3 border-b border-[#F0E5EA]">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-[#FCE8EF] text-[#D94B7A] flex items-center justify-center">
                <LucideIcon name="GitBranch" size={16} />
              </div>
              <div>
                <h2 className="font-bold text-sm sm:text-base text-[#35313A]">
                  飛田新地求人 FAQ 8大テーマ体系図
                </h2>
                <p className="text-[11px] text-[#85818A]">
                  知りたいテーマをクリックすると即座に絞り込まれます
                </p>
              </div>
            </div>
            <span className="hidden sm:inline-block text-xs font-bold text-[#D94B7A] bg-[#FCE8EF] px-3 py-1 rounded-full border border-[#FCE8EF]">
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
                    if (typeof window !== 'undefined') {
                      window.history.replaceState({}, '', `/faq?category=${cat.id}`);
                    }
                  }}
                  className={`flex flex-col items-start p-3 sm:p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#FCE8EF]/70 border-[#D94B7A] shadow-xs'
                      : 'bg-white hover:bg-[#FFF9FB] border-[#F0E5EA] hover:border-[#D94B7A]/40'
                  }`}
                >
                  <div className="flex items-center justify-between w-full mb-1.5">
                    <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${
                      isSelected ? 'bg-[#D94B7A] text-white' : 'bg-[#FFF9FB] text-[#35313A] border border-[#F0E5EA]'
                    }`}>
                      <LucideIcon name={cat.icon} size={14} />
                    </div>
                    <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                      isSelected ? 'bg-[#D94B7A] text-white' : 'bg-[#FFF9FB] text-[#85818A] border border-[#F0E5EA]'
                    }`}>
                      {count}問
                    </span>
                  </div>
                  <span className={`font-bold text-xs sm:text-sm ${
                    isSelected ? 'text-[#D94B7A]' : 'text-[#35313A]'
                  }`}>
                    {cat.label}
                  </span>
                  <span className="text-[10px] text-[#85818A] line-clamp-1 mt-0.5">
                    {cat.description}
                  </span>
                </button>
              );
            })}
          </div>

          {/* All button */}
          <div className="mt-3.5 pt-3 border-t border-[#F0E5EA] flex justify-end">
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
                  ? 'bg-[#D94B7A] text-white border-[#D94B7A] shadow-xs'
                  : 'bg-white hover:bg-[#FFF9FB] text-[#35313A] border-[#F0E5EA]'
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
        <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-[#F0E5EA] shadow-sm mb-8">
          <div className="relative mb-3">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#D94B7A]">
              <LucideIcon name="Search" size={18} />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="疑問をキーワードで検索（例: 未経験、日払い、週1日、身バレ、お酒、30代、寮、退店）"
              className="w-full pl-11 pr-10 py-3 bg-[#FFF9FB] border border-[#F0E5EA] rounded-2xl text-xs sm:text-sm text-[#35313A] placeholder:text-[#85818A] focus:outline-none focus:ring-2 focus:ring-[#D94B7A]/20 focus:border-[#D94B7A] transition-all"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#85818A] hover:text-[#35313A] transition-colors"
                title="検索をクリア"
              >
                <LucideIcon name="X" size={16} />
              </button>
            )}
          </div>

          {/* Quick Search Tag Pills */}
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
            <span className="text-[11px] font-bold text-[#85818A] mr-1 flex items-center gap-1">
              <LucideIcon name="TrendingUp" size={13} className="text-[#D94B7A]" />
              注目のキーワード:
            </span>
            {POPULAR_SEARCH_TAGS.map((tag) => {
              const isCurrent = searchQuery === tag;
              return (
                <button
                  key={tag}
                  type="button"
                  onClick={() => setSearchQuery(isCurrent ? '' : tag)}
                  className={`text-[11px] sm:text-xs font-medium px-2.5 py-1 rounded-full transition-all cursor-pointer border ${
                    isCurrent
                      ? 'bg-[#D94B7A] text-white font-bold border-[#D94B7A] shadow-xs'
                      : 'bg-white hover:bg-[#FCE8EF] text-[#35313A] hover:text-[#D94B7A] border-[#F0E5EA]'
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
            <span className="text-xs font-bold text-[#35313A] flex items-center gap-1.5">
              <LucideIcon name="Filter" size={14} className="text-[#D94B7A]" />
              <span>選択中のテーマ: <strong className="text-[#D94B7A]">{activeCategoryDef.label}</strong></span>
            </span>
            <span className="text-xs font-bold text-[#D94B7A] bg-[#FCE8EF] px-2.5 py-0.5 rounded-full">
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
                      ? 'bg-[#D94B7A] text-white border-[#D94B7A] shadow-xs'
                      : 'bg-white hover:bg-[#FFF9FB] text-[#35313A] border-[#F0E5EA]'
                  }`}
                >
                  <LucideIcon name={cat.icon} size={14} />
                  <span>{cat.shortLabel}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full ml-0.5 ${
                    isActive ? 'bg-white/20 text-white font-bold' : 'bg-[#FFF9FB] text-[#85818A] border border-[#F0E5EA]'
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Active Category Description & Expand/Collapse All Buttons */}
          <div className="mt-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-1 border-t border-[#F0E5EA] text-xs">
            <p className="text-[#85818A]">
              <strong className="text-[#D94B7A] font-bold">{activeCategoryDef.label}:</strong> {activeCategoryDef.description}
            </p>
            <div className="flex items-center gap-2 self-end sm:self-auto flex-shrink-0">
              <button
                type="button"
                onClick={expandAll}
                className="text-[11px] font-bold text-[#85818A] hover:text-[#D94B7A] px-2 py-1 rounded hover:bg-[#FCE8EF] transition-colors"
              >
                すべて開く
              </button>
              <span className="text-[#F0E5EA]">|</span>
              <button
                type="button"
                onClick={collapseAll}
                className="text-[11px] font-bold text-[#85818A] hover:text-[#D94B7A] px-2 py-1 rounded hover:bg-[#FCE8EF] transition-colors"
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
            <div className="bg-white rounded-2xl sm:rounded-3xl p-10 text-center border border-[#F0E5EA] my-6">
              <div className="w-12 h-12 bg-[#FCE8EF] text-[#D94B7A] rounded-full flex items-center justify-center mx-auto mb-3">
                <LucideIcon name="SearchX" size={24} />
              </div>
              <h3 className="font-bold text-base text-[#35313A] mb-1">
                該当する質問が見つかりませんでした
              </h3>
              <p className="text-xs text-[#85818A] mb-4">
                「{searchQuery}」に一致する質問はありませんでした。別のキーワードでお試しいただくか、カテゴリーを選択してください。
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                }}
                className="text-xs font-bold bg-[#D94B7A] text-white px-4 py-2 rounded-xl shadow-xs hover:bg-[#C23867] transition-colors"
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
                      ? 'border-[#D94B7A] shadow-xs ring-1 ring-[#D94B7A]/10'
                      : 'border-[#F0E5EA] hover:border-[#D94B7A]/40'
                  }`}
                  id={`faq-item-${faq.id}`}
                >
                  <button
                    onClick={() => toggleItem(faq.id)}
                    className={`w-full flex justify-between items-start sm:items-center p-4 sm:p-5 text-left cursor-pointer gap-3 sm:gap-4 transition-colors ${
                      isOpen ? 'bg-[#FFF9FB]' : 'hover:bg-[#FFF9FB]/50'
                    }`}
                  >
                    <div className="flex items-start sm:items-center gap-2.5 sm:gap-3 flex-1 min-w-0">
                      <span className="flex-shrink-0 text-xs font-bold bg-[#FCE8EF] text-[#D94B7A] px-2.5 py-1 rounded-lg mt-0.5 sm:mt-0 select-none">
                        Q.{questionIndex.toString().padStart(2, '0')}
                      </span>
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-1.5 mb-1">
                          <span className="text-[10px] font-bold text-[#85818A] bg-[#FFF9FB] border border-[#F0E5EA] px-2 py-0.5 rounded-full">
                            {faq.eightCategoryLabel}
                          </span>
                          {faq.isPopular && (
                            <span className="text-[10px] font-bold text-amber-700 bg-amber-50 border border-amber-200 px-1.5 py-0.5 rounded-full inline-flex items-center gap-0.5">
                              <LucideIcon name="Sparkles" size={10} />
                              注目
                            </span>
                          )}
                        </div>
                        <h3 className="font-sans font-bold text-xs sm:text-sm md:text-base text-[#35313A] leading-snug">
                          {faq.question}
                        </h3>
                      </div>
                    </div>

                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                      className={`text-[#85818A] flex-shrink-0 mt-1 sm:mt-0 ${isOpen ? 'text-[#D94B7A]' : ''}`}
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
                        <div className="px-4 sm:px-6 pb-5 pt-0 font-sans text-xs sm:text-sm text-[#35313A] leading-relaxed border-t border-[#F0E5EA]">
                          <div className="pt-4 flex gap-2.5 sm:gap-3">
                            <span className="text-[#D94B7A] font-black text-base sm:text-lg select-none flex-shrink-0">
                              A.
                            </span>
                            <div className="flex-1 space-y-2">
                              <p className="whitespace-pre-line text-xs sm:text-sm text-[#35313A] leading-relaxed font-normal">
                                {faq.answer}
                              </p>
                              {faq.keywords && faq.keywords.length > 0 && (
                                <div className="pt-2 flex flex-wrap gap-1 border-t border-[#F0E5EA]">
                                  {faq.keywords.map(kw => (
                                    <span key={kw} className="text-[10px] text-[#85818A]">
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
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white hover:bg-[#FFF9FB] text-[#D94B7A] font-bold text-xs sm:text-sm px-6 py-3 rounded-2xl border border-[#D94B7A]/40 shadow-xs transition-all cursor-pointer"
            >
              <LucideIcon name="ChevronDown" size={16} />
              <span>さらに質問を表示する（残り {filteredItems.length - displayLimit} 問）</span>
            </button>
            <div>
              <button
                type="button"
                onClick={() => setDisplayLimit(filteredItems.length)}
                className="text-[11px] text-[#85818A] hover:text-[#D94B7A] underline underline-offset-2 transition-colors"
              >
                該当する全 {filteredItems.length} 問を一括表示する
              </button>
            </div>
          </div>
        )}

        {/* ==========================================
            Consultant Advice & 24h LINE Contact Box
           ========================================== */}
        <div className="bg-white border border-[#F0E5EA] rounded-2xl sm:rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-6 shadow-sm mb-10">
          <div className="w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0 bg-white rounded-full overflow-hidden border-2 border-[#FCE8EF] shadow-md">
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
            <div className="inline-block bg-[#FCE8EF] text-[#D94B7A] text-[11px] font-bold px-3 py-0.5 rounded-full mb-1.5 shadow-xs">
              女性サポート担当 さくらより
            </div>
            <p className="font-sans text-xs sm:text-sm font-semibold text-[#35313A] leading-relaxed mb-3">
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
                className="inline-flex items-center gap-2 bg-[#06C755] hover:bg-[#05b34c] text-white text-xs sm:text-sm font-bold px-5 py-2.5 rounded-xl shadow-xs transition-all"
              >
                <LucideIcon name="MessageCircle" size={16} />
                <span>公式LINEで疑問を質問する（24時間受付）</span>
              </a>
              <span className="text-[11px] text-[#85818A] font-medium">
                ※完全匿名・相談のみOK
              </span>
            </div>
          </div>
        </div>

        {/* ==========================================
            Return to Recruit Top Page Button
           ========================================== */}
        <div className="text-center pt-2">
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              onNavigateHome();
            }}
            className="inline-flex items-center gap-2 bg-white hover:bg-[#FFF9FB] text-[#35313A] hover:text-[#D94B7A] text-xs sm:text-sm font-bold px-6 py-2.5 rounded-2xl border border-[#F0E5EA] shadow-xs transition-all cursor-pointer"
          >
            <LucideIcon name="ArrowLeft" size={15} />
            <span>飛田新地求人トップへ戻る</span>
          </a>
        </div>

      </div>
    </div>
  );
}
