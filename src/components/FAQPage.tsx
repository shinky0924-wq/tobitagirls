/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import LucideIcon from './LucideIcon';
import {
  FAQ100Item,
  FAQ12Category,
  FAQ12CategoryDef,
  FAQ_12_CATEGORIES,
  FAQ_100_LIST,
  ESSENTIAL_5_FAQ_LIST,
  FAQ_LAST_UPDATED,
  FAQ_LAST_UPDATED_ISO,
  filterFAQ100,
  resolveFaq12Category
} from '../faq100Data';
import { LINE_OFFICIAL_URL } from '../data';
import { updatePageJsonLd } from '../utils/jsonLd';

function OutlineIcon({
  name,
  size = 18,
  className = ''
}: {
  name: string;
  size?: number;
  className?: string;
}) {
  return <LucideIcon name={name || 'HelpCircle'} size={size} strokeWidth={1.75} className={className} />;
}

const POPULAR_KEYWORDS = [
  '未経験',
  '給料',
  '身バレ',
  '仕事内容',
  '出勤',
  '年齢',
  '面接',
  '体験',
  '経験者',
  '日給',
  '送迎',
  '求人'
];

const RELATED_GUIDE_LINKS: Array<{
  path: string;
  title: string;
  desc: string;
}> = [
  { path: '/job', title: '仕事内容', desc: '1日の接客の流れ・衛生管理・禁止事項' },
  { path: '/salary', title: '給料・待遇', desc: '売上50%バック・手取り計算・日払い' },
  { path: '/beginner', title: '未経験者向け', desc: '初めての方向けサポート・仲居さんの役割' },
  { path: '/experienced', title: '経験者・移籍', desc: '他業種・他店からの移籍や復帰の条件' },
  { path: '/requirements', title: '応募資格・年齢', desc: '満20歳以上の条件と必要書類の詳細' },
  { path: '/flow', title: '応募・面接・体入', desc: 'LINE相談から私服面接・体験入店の流れ' },
  { path: '/workstyle', title: '働き方・シフト', desc: '選べる5つの時間帯・週1日やWワーク' },
  { path: '/shops', title: 'お店選び・通りの違い', desc: 'メイン・青春・大門など通りの特徴比較' },
  { path: '/dekasegi', title: '寮・出稼ぎ', desc: '滞在住居や交通費条件の確認ポイント' },
  { path: '/safety', title: '身バレ・安全対策', desc: '写真非掲載・撮影禁止・住民税対策' },
  { path: '/about', title: '飛田ガールズについて', desc: '運営組織・料亭直営体制・店舗所在地' }
];

const HELPFUL_STORAGE_KEY = 'tobita_faq_helpful_v1';

interface FAQPageProps {
  initialCategory?: string | null;
  onNavigateHome: () => void;
  onNavigatePath?: (path: string) => void;
  onCtaclick?: () => void;
}

/**
 * Render formatted answer text with clear paragraphs and bullet lists
 */
function FormattedAnswer({ text }: { text: string }) {
  const blocks = text.split(/\n{2,}/).filter(Boolean);

  return (
    <div className="space-y-3 text-[15px] sm:text-[15.5px] leading-[1.85] text-[#383038]">
      {blocks.map((block, bIdx) => {
        const lines = block.split('\n').map(l => l.trim()).filter(Boolean);
        const bulletLines = lines.filter(l => l.startsWith('・'));

        if (bulletLines.length > 0 && bulletLines.length === lines.length) {
          return (
            <ul key={bIdx} className="space-y-1.5 pl-1">
              {lines.map((line, lIdx) => (
                <li key={lIdx} className="flex items-start gap-2.5">
                  <span className="text-[#C96D8C] font-bold shrink-0 mt-0.5" aria-hidden="true">•</span>
                  <span>{line.replace(/^・\s*/, '')}</span>
                </li>
              ))}
            </ul>
          );
        }

        if (bulletLines.length > 0 && lines.length > bulletLines.length) {
          const introLines = lines.filter(l => !l.startsWith('・'));
          return (
            <div key={bIdx} className="space-y-2">
              {introLines.map((line, iIdx) => (
                <p
                  key={`intro-${iIdx}`}
                  className={
                    line.startsWith('■') || line.startsWith('【')
                      ? 'font-bold text-[#383038]'
                      : ''
                  }
                >
                  {line}
                </p>
              ))}
              <ul className="space-y-1.5 pl-1">
                {bulletLines.map((line, lIdx) => (
                  <li key={`li-${lIdx}`} className="flex items-start gap-2.5">
                    <span className="text-[#C96D8C] font-bold shrink-0 mt-0.5" aria-hidden="true">•</span>
                    <span>{line.replace(/^・\s*/, '')}</span>
                  </li>
                ))}
              </ul>
            </div>
          );
        }

        const isVerificationNote = block.trim().startsWith('【要確認】');
        if (isVerificationNote) {
          return (
            <div
              key={bIdx}
              className="rounded-xl bg-[#FFF0F4] border border-[#F0E5E9] px-4 py-3 text-[14px] sm:text-[14.5px] leading-[1.75] text-[#383038]"
            >
              <span className="font-bold text-[#C96D8C] mr-1.5">事前確認のお願い：</span>
              <span>{block.trim().replace(/^【要確認】\s*/, '')}</span>
            </div>
          );
        }

        return (
          <p key={bIdx} className="whitespace-pre-line">
            {block}
          </p>
        );
      })}
    </div>
  );
}

export default function FAQPage({
  initialCategory,
  onNavigateHome,
  onNavigatePath,
  onCtaclick
}: FAQPageProps) {
  const [selectedCategory, setSelectedCategory] = useState<FAQ12Category | 'all'>(() => {
    return resolveFaq12Category(initialCategory) || 'all';
  });
  const [searchQuery, setSearchQuery] = useState(() => {
    if (typeof window === 'undefined') return '';
    try {
      const sp = new URLSearchParams(window.location.search);
      const q = sp.get('search') || sp.get('q') || '';
      if (q && !q.includes('search_term_string')) return q;
    } catch {}
    return '';
  });
  const [openQuestionKeys, setOpenQuestionKeys] = useState<Set<string>>(() => new Set(['starter-faq-rec-1']));
  const [openCategoryIds, setOpenCategoryIds] = useState<Set<string>>(() => {
    const resolved = resolveFaq12Category(initialCategory);
    return resolved ? new Set([resolved]) : new Set();
  });
  const [helpfulVotes, setHelpfulVotes] = useState<Record<string, 'yes' | 'no'>>(() => {
    if (typeof window === 'undefined') return {};
    try {
      const saved = window.localStorage.getItem(HELPFUL_STORAGE_KEY);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  useEffect(() => {
    const resolved = resolveFaq12Category(initialCategory);
    setSelectedCategory(resolved || 'all');
    if (resolved) {
      setOpenCategoryIds(new Set([resolved]));
    }
  }, [initialCategory]);

  const faqById = useMemo(() => {
    const map = new Map<string, FAQ100Item>();
    FAQ_100_LIST.forEach(item => map.set(item.id, item));
    return map;
  }, []);

  const categoryById = useMemo(() => {
    const map = new Map<FAQ12Category, FAQ12CategoryDef>();
    FAQ_12_CATEGORIES.forEach(cat => map.set(cat.id, cat));
    return map;
  }, []);

  const faqsByCategory = useMemo(() => {
    const map: Record<FAQ12Category, FAQ100Item[]> = {
      qualification: [],
      beginner: [],
      experienced: [],
      job: [],
      salary: [],
      hours: [],
      interview: [],
      privacy: [],
      environment: [],
      access: [],
      sidejob: [],
      support: []
    };
    FAQ_100_LIST.forEach(item => {
      if (map[item.category12]) {
        map[item.category12].push(item);
      }
    });
    return map;
  }, []);

  const activeCategoryDef = useMemo(() => {
    if (selectedCategory === 'all') return null;
    return categoryById.get(selectedCategory) || null;
  }, [selectedCategory, categoryById]);

  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    return filterFAQ100('all', searchQuery);
  }, [searchQuery]);

  const handleLinkNavigate = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, targetPath: string) => {
      if (onNavigatePath) {
        e.preventDefault();
        onNavigatePath(targetPath);
      } else if (targetPath === '/' && onNavigateHome) {
        e.preventDefault();
        onNavigateHome();
      }
    },
    [onNavigatePath, onNavigateHome]
  );

  const scrollWithHeaderOffset = useCallback((elementId: string) => {
    if (typeof document === 'undefined') return;
    setTimeout(() => {
      const target = document.getElementById(elementId);
      if (!target) return;
      const offsetHeader = 84;
      const y = target.getBoundingClientRect().top + window.scrollY - offsetHeader;
      window.scrollTo({ top: Math.max(0, y), behavior: 'smooth' });
    }, 60);
  }, []);

  const handleSelectCategory = (catId: FAQ12Category | 'all', shouldScroll = true) => {
    setSelectedCategory(catId);
    if (catId !== 'all') {
      setOpenCategoryIds(prev => new Set([...prev, catId]));
    }
    if (typeof window !== 'undefined') {
      const nextUrl = catId === 'all' ? '/faq' : `/faq/${catId}`;
      window.history.replaceState({}, '', nextUrl);
    }
    if (shouldScroll) {
      scrollWithHeaderOffset(catId === 'all' ? 'faq-theme-directory' : `faq-category-${catId}`);
    }
  };

  const handleJumpToCategory = (catId: FAQ12Category) => {
    if (selectedCategory !== 'all') {
      setSelectedCategory('all');
      if (typeof window !== 'undefined') {
        window.history.replaceState({}, '', '/faq');
      }
    }
    setOpenCategoryIds(prev => new Set([...prev, catId]));
    scrollWithHeaderOffset(`faq-category-${catId}`);
  };

  const toggleCategoryPanel = (catId: FAQ12Category) => {
    setOpenCategoryIds(prev => {
      const next = new Set(prev);
      if (next.has(catId)) {
        next.delete(catId);
      } else {
        next.add(catId);
      }
      return next;
    });
  };

  const toggleAllCategoryPanels = () => {
    if (openCategoryIds.size === FAQ_12_CATEGORIES.length) {
      setOpenCategoryIds(new Set());
    } else {
      setOpenCategoryIds(new Set(FAQ_12_CATEGORIES.map(c => c.id)));
    }
  };

  const toggleQuestion = (domKey: string) => {
    setOpenQuestionKeys(prev => {
      const next = new Set(prev);
      if (next.has(domKey)) {
        next.delete(domKey);
      } else {
        next.add(domKey);
      }
      return next;
    });
  };

  const handleJumpToFaq = (targetId: string) => {
    const item = faqById.get(targetId);
    if (!item) return;

    if (selectedCategory !== 'all' && selectedCategory !== item.category12) {
      setSelectedCategory('all');
      if (typeof window !== 'undefined') {
        window.history.replaceState({}, '', '/faq');
      }
    }
    setOpenCategoryIds(prev => new Set([...prev, item.category12]));
    setOpenQuestionKeys(prev => new Set([...prev, `dir-${targetId}`]));
    scrollWithHeaderOffset(`faq-row-dir-${targetId}`);
  };

  const handleVote = (faqId: string, vote: 'yes' | 'no') => {
    setHelpfulVotes(prev => {
      const next = { ...prev, [faqId]: vote };
      if (typeof window !== 'undefined') {
        try {
          window.localStorage.setItem(HELPFUL_STORAGE_KEY, JSON.stringify(next));
        } catch {
          // ignore storage errors
        }
      }
      return next;
    });
  };

  // Sync document title, meta description & JSON-LD
  useEffect(() => {
    if (typeof document === 'undefined') return;
    const prevTitle = document.title;
    const catCount = activeCategoryDef ? faqsByCategory[activeCategoryDef.id].length : FAQ_100_LIST.length;
    const pageTitle = activeCategoryDef
      ? `【${activeCategoryDef.label}】飛田新地のQ&A（全${catCount}問）｜飛田ガールズ`
      : '飛田新地のよくある質問｜仕事・給料・応募条件Q&A｜飛田ガールズ';
    const pageDesc = activeCategoryDef
      ? `${activeCategoryDef.description}。飛田新地の働き方に関する「${activeCategoryDef.label}」のよくある質問と回答をまとめました。`
      : '飛田新地で働く前に知っておきたい仕事内容・給料・応募条件・身バレ対策などの疑問をQ&A形式で分かりやすくまとめました。未経験・経験者どちらも確認できます。';

    document.title = pageTitle;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', pageDesc);
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', pageTitle);
    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute('content', pageDesc);
    const twTitle = document.querySelector('meta[name="twitter:title"]');
    if (twTitle) twTitle.setAttribute('content', pageTitle);
    const twDesc = document.querySelector('meta[name="twitter:description"]');
    if (twDesc) twDesc.setAttribute('content', pageDesc);

    return () => {
      document.title = prevTitle;
    };
  }, [activeCategoryDef, faqsByCategory]);

  const jsonLdData = useMemo(() => {
    const schemaQuestions = activeCategoryDef
      ? faqsByCategory[activeCategoryDef.id]
      : FAQ_100_LIST;

    const currentUrl = activeCategoryDef
      ? `https://tobitashinchi-recruit.com/faq/${activeCategoryDef.slug}`
      : 'https://tobitashinchi-recruit.com/faq';

    const breadcrumbItems: any[] = [
      {
        '@type': 'ListItem',
        position: 1,
        name: '飛田新地求人トップ',
        item: 'https://tobitashinchi-recruit.com/'
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'よくある質問（FAQ）',
        item: 'https://tobitashinchi-recruit.com/faq'
      }
    ];

    if (activeCategoryDef) {
      breadcrumbItems.push({
        '@type': 'ListItem',
        position: 3,
        name: activeCategoryDef.label,
        item: currentUrl
      });
    }

    return {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'WebPage',
          '@id': `${currentUrl}#webpage`,
          url: currentUrl,
          name: activeCategoryDef
            ? `【${activeCategoryDef.label}】飛田新地のQ&A｜飛田ガールズ`
            : '飛田新地のよくある質問｜仕事・給料・応募条件Q&A｜飛田ガールズ',
          description: activeCategoryDef
            ? activeCategoryDef.description
            : '飛田新地で働く前に知っておきたい仕事内容・給料・応募条件・身バレ対策などの疑問をQ&A形式で分かりやすくまとめました。',
          dateModified: FAQ_LAST_UPDATED_ISO,
          inLanguage: 'ja-JP',
          isPartOf: {
            '@type': 'WebSite',
            '@id': 'https://tobitashinchi-recruit.com/#website',
            name: '飛田ガールズ',
            url: 'https://tobitashinchi-recruit.com/'
          },
          publisher: {
            '@type': 'Organization',
            '@id': 'https://tobitashinchi-recruit.com/#organization',
            name: '飛田ガールズ（料亭直営求人・女性採用サポート）',
            url: 'https://tobitashinchi-recruit.com/'
          },
          speakable: {
            '@type': 'SpeakableSpecification',
            cssSelector: ['#faq-hero-heading', '#faq-hero-lead', '#faq-essential-heading']
          }
        },
        {
          '@type': 'BreadcrumbList',
          '@id': `${currentUrl}#breadcrumb`,
          itemListElement: breadcrumbItems
        },
        {
          '@type': 'FAQPage',
          '@id': `${currentUrl}#faq`,
          url: currentUrl,
          dateModified: FAQ_LAST_UPDATED_ISO,
          publisher: {
            '@type': 'Organization',
            '@id': 'https://tobitashinchi-recruit.com/#organization',
            name: '飛田ガールズ（料亭直営求人・女性採用サポート）'
          },
          mainEntity: schemaQuestions.map(item => ({
            '@type': 'Question',
            name: item.question,
            acceptedAnswer: {
              '@type': 'Answer',
              text: item.answer
            }
          }))
        }
      ]
    };
  }, [activeCategoryDef, faqsByCategory]);

  useEffect(() => {
    updatePageJsonLd(jsonLdData);
  }, [jsonLdData]);

  const renderFaqRow = (faq: FAQ100Item, numberLabel: string, domPrefix: string) => {
    const domKey = `${domPrefix}-${faq.id}`;
    const isOpen = openQuestionKeys.has(domKey);
    const vote = helpfulVotes[faq.id];
    const catMeta = categoryById.get(faq.category12);
    const relatedFaqs = (faq.relatedIds || [])
      .map(id => faqById.get(id))
      .filter((r): r is FAQ100Item => r !== undefined);

    const metaSegments: string[] = [];
    if (faq.audienceTag && faq.audienceTag !== '全員共通') {
      metaSegments.push(faq.audienceTag);
    }
    if (faq.needsVerification) {
      metaSegments.push('事前確認推奨');
    }

    return (
      <article
        key={domKey}
        id={`faq-row-${domKey}`}
        className="scroll-mt-24 transition-colors"
      >
        <button
          type="button"
          onClick={() => toggleQuestion(domKey)}
          aria-expanded={isOpen}
          className={`w-full min-h-[56px] flex items-start justify-between gap-3 px-4 py-4 sm:px-6 sm:py-5 text-left cursor-pointer transition-colors ${
            isOpen ? 'bg-[#FFF9FB]' : 'hover:bg-[#FFF9FB]/70'
          }`}
        >
          <div className="flex items-start gap-3 sm:gap-4 flex-1 min-w-0">
            <span className="shrink-0 w-8 text-sm font-bold text-[#C96D8C] tabular-nums pt-0.5">
              {numberLabel}
            </span>
            <div className="flex-1 min-w-0">
              {metaSegments.length > 0 && (
                <div className="flex flex-wrap items-center gap-1.5 text-xs text-[#777078] mb-1">
                  {metaSegments.map((seg, i) => (
                    <React.Fragment key={seg}>
                      {i > 0 && <span aria-hidden="true">·</span>}
                      <span className={seg === '事前確認推奨' ? 'text-[#777078]' : 'text-[#C96D8C] font-medium'}>
                        {seg}
                      </span>
                    </React.Fragment>
                  ))}
                </div>
              )}
              <h3 className="text-[15.5px] sm:text-[16.5px] font-bold text-[#383038] leading-[1.55]">
                {faq.question}
              </h3>
            </div>
          </div>

          <span
            className={`shrink-0 w-8 h-8 rounded-lg flex items-center justify-center transition-transform mt-0.5 ${
              isOpen ? 'text-[#C96D8C] rotate-180' : 'text-[#777078]'
            }`}
          >
            <OutlineIcon name="ChevronDown" size={18} />
          </span>
        </button>

        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.16, ease: 'easeOut' }}
            >
              <div className="px-4 pb-5 pt-2 sm:px-6 sm:pb-6 sm:pl-[72px] bg-[#FFFFFF]">
                <div className="space-y-5">
                  <FormattedAnswer text={faq.answer} />

                  {/* Related Guide Link & Related Questions */}
                  {(faq.relatedPage || relatedFaqs.length > 0) && (
                    <div className="pt-4 border-t border-[#F0E5E9] space-y-3">
                      {faq.relatedPage && (
                        <div>
                          <a
                            href={faq.relatedPage}
                            onClick={e => handleLinkNavigate(e, faq.relatedPage!)}
                            className="inline-flex items-center gap-1.5 text-[13.5px] font-bold text-[#C96D8C] hover:underline underline-offset-4"
                          >
                            <OutlineIcon name="ArrowRight" size={14} />
                            <span>
                              {faq.relatedLabel || `${catMeta?.label || '関連ガイド'}の詳細を見る`}
                            </span>
                          </a>
                        </div>
                      )}

                      {relatedFaqs.length > 0 && (
                        <div className="space-y-1.5">
                          <div className="text-xs font-semibold text-[#777078]">
                            あわせて確認される質問
                          </div>
                          <ul className="space-y-1">
                            {relatedFaqs.map(rel => (
                              <li key={rel.id}>
                                <button
                                  type="button"
                                  onClick={() => handleJumpToFaq(rel.id)}
                                  className="text-left text-[13px] sm:text-[13.5px] text-[#383038] hover:text-[#C96D8C] py-1 inline-flex items-start gap-1.5 transition-colors cursor-pointer"
                                >
                                  <OutlineIcon
                                    name="CornerDownRight"
                                    size={14}
                                    className="text-[#C96D8C] shrink-0 mt-0.5"
                                  />
                                  <span className="hover:underline underline-offset-2">{rel.question}</span>
                                </button>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Helpfulness Feedback UI */}
                  <div className="pt-3 border-t border-[#F0E5E9]">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                      <span className="text-xs sm:text-[13px] text-[#777078]">
                        この回答は参考になりましたか？
                      </span>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => handleVote(faq.id, 'yes')}
                          aria-pressed={vote === 'yes'}
                          className={`min-h-[38px] inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold border transition-colors cursor-pointer whitespace-nowrap ${
                            vote === 'yes'
                              ? 'bg-[#FFF0F4] border-[#C96D8C] text-[#C96D8C]'
                              : 'bg-[#FFFFFF] border-[#F0E5E9] text-[#777078] hover:text-[#383038] hover:border-[#C96D8C]/40'
                          }`}
                        >
                          <OutlineIcon name="ThumbsUp" size={14} />
                          <span>役に立った</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => handleVote(faq.id, 'no')}
                          aria-pressed={vote === 'no'}
                          className={`min-h-[38px] inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold border transition-colors cursor-pointer whitespace-nowrap ${
                            vote === 'no'
                              ? 'bg-[#FFF0F4] border-[#C96D8C] text-[#C96D8C]'
                              : 'bg-[#FFFFFF] border-[#F0E5E9] text-[#777078] hover:text-[#383038] hover:border-[#C96D8C]/40'
                          }`}
                        >
                          <OutlineIcon name="ThumbsDown" size={14} />
                          <span>参考にならなかった</span>
                        </button>
                      </div>
                    </div>

                    {vote === 'yes' && (
                      <p className="mt-2 text-xs text-[#777078]">
                        ご回答ありがとうございます。追加で確認したい点があればLINEからいつでもご質問いただけます。
                      </p>
                    )}

                    {vote === 'no' && (
                      <div className="mt-3 p-3.5 rounded-xl bg-[#FFF9FB] border border-[#F0E5E9] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <p className="text-xs sm:text-[13px] text-[#383038] leading-relaxed">
                          十分な情報をお伝えできず申し訳ございません。個別の条件や最新の詳細については、LINEにて直接お答えいたします。
                        </p>
                        <a
                          href={LINE_OFFICIAL_URL}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="shrink-0 inline-flex items-center justify-center gap-1.5 bg-[#06C755] hover:bg-[#05b34c] text-white text-xs sm:text-[13px] font-bold px-4 py-2.5 rounded-lg transition-colors whitespace-nowrap"
                        >
                          <OutlineIcon name="MessageCircle" size={15} />
                          <span>LINEで直接質問する</span>
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </article>
    );
  };

  return (
    <div className="min-h-screen bg-[#FFF9FB] text-[#383038] pb-24 md:pb-16">
      <div className="max-w-[960px] mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-10 space-y-10 sm:space-y-12">
        {/* ============================================================
            1. ファーストビュー (Clean Header & Context)
           ============================================================ */}
        <section aria-labelledby="faq-hero-heading" className="space-y-5">
          <nav
            className="flex flex-wrap items-center gap-1.5 text-xs sm:text-[13px] text-[#777078]"
            aria-label="パンくずリスト"
          >
            <a
              href="/"
              onClick={e => handleLinkNavigate(e, '/')}
              className="hover:text-[#C96D8C] inline-flex items-center gap-1 transition-colors"
            >
              <OutlineIcon name="Home" size={14} />
              <span>求人トップ</span>
            </a>
            <span aria-hidden="true">/</span>
            {activeCategoryDef ? (
              <>
                <button
                  type="button"
                  onClick={() => handleSelectCategory('all', false)}
                  className="hover:text-[#C96D8C] transition-colors cursor-pointer"
                >
                  よくある質問（FAQ）
                </button>
                <span aria-hidden="true">/</span>
                <span className="text-[#383038] font-semibold">{activeCategoryDef.label}</span>
              </>
            ) : (
              <span className="text-[#383038] font-semibold">よくある質問（FAQ）</span>
            )}
          </nav>

          <div className="bg-[#FFFFFF] border border-[#F0E5E9] rounded-2xl p-6 sm:p-8 shadow-[0_1px_4px_rgba(56,48,56,0.03)]">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
              <div className="order-2 lg:order-1 lg:col-span-7 space-y-4">
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-[#777078]">
                  <span className="font-bold tracking-[0.12em] text-[#C96D8C]">
                    TOBITA FAQ GUIDE
                  </span>
                  <span aria-hidden="true">·</span>
                  <span className="tabular-nums">全{FAQ_100_LIST.length}問掲載</span>
                  <span aria-hidden="true">·</span>
                  <span>最終更新 {FAQ_LAST_UPDATED}</span>
                </div>

                <h1
                  id="faq-hero-heading"
                  className="font-display font-bold text-2xl sm:text-3xl md:text-[32px] text-[#383038] leading-[1.35] text-balance max-w-xl lg:max-w-none"
                >
                  飛田新地の疑問を、ここですべて解決。
                </h1>

                <p id="faq-hero-lead" className="text-[15px] sm:text-base text-[#777078] leading-[1.8]">
                  応募条件・仕事内容・お給料・働き方・身バレ対策まで。初めての方でも迷わず確認できるよう、12のカテゴリーに分かりやすく整理しました。
                </p>
              </div>

              <div className="order-1 lg:order-2 lg:col-span-5">
                <div className="rounded-2xl overflow-hidden border border-[#F0E5E9] bg-[#FFF9FB]">
                  <div className="aspect-[4/3] w-full overflow-hidden">
                    <img
                      src="/images/tobita_beginner_support_1788153037569.jpg"
                      alt="飛田新地の求人に関する事前相談と案内イメージ"
                      className="w-full h-full object-cover"
                      loading="eager"
                      referrerPolicy="no-referrer"
                      onError={e => {
                        const target = e.currentTarget;
                        target.onerror = null;
                        target.src = '/images/cat_11_faq_1794165006079.jpg';
                      }}
                    />
                  </div>
                  <div className="px-3.5 py-2.5 bg-[#FFFFFF] border-t border-[#F0E5E9] text-[11.5px] text-[#777078] flex items-center justify-between gap-2">
                    <span className="flex items-center gap-1.5">
                      <OutlineIcon name="ShieldCheck" size={14} className="text-[#C96D8C] shrink-0" />
                      <span>料理組合正規加盟・直営公式FAQ</span>
                    </span>
                    <span className="font-bold text-[#C96D8C] tabular-nums">全{FAQ_100_LIST.length}問</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 4つのポイント */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-6 pt-6 border-t border-[#F0E5E9]">
              {[
                {
                  num: 'POINT 01',
                  title: '未経験者・経験者どちらも対応',
                  desc: '初めての方から他業種・他店からの移籍検討まで網羅'
                },
                {
                  num: 'POINT 02',
                  title: '12カテゴリー別・キーワード検索可',
                  desc: '全119問をテーマ別・気になる単語からすぐ検索'
                },
                {
                  num: 'POINT 03',
                  title: '事実に基づいた正確な条件を掲載',
                  desc: '事前確認が必要な項目も含めて正直にご案内'
                },
                {
                  num: 'POINT 04',
                  title: '分からない点はLINE個別相談もOK',
                  desc: '応募を決める前の質問や条件確認だけでも歓迎'
                }
              ].map(point => (
                <div
                  key={point.num}
                  className="p-3.5 rounded-xl bg-[#FFF9FB] border border-[#F0E5E9] space-y-1"
                >
                  <span className="text-[11px] font-bold text-[#C96D8C] tracking-wider block tabular-nums">
                    {point.num}
                  </span>
                  <p className="text-[13px] sm:text-[13.5px] font-bold text-[#383038] leading-snug">
                    {point.title}
                  </p>
                  <p className="text-[11.5px] text-[#777078] leading-relaxed">
                    {point.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================================
            2. キーワード検索 & よく調べられる単語
           ============================================================ */}
        <section
          aria-labelledby="faq-search-heading"
          className="bg-[#FFFFFF] border border-[#F0E5E9] rounded-2xl p-5 sm:p-7 shadow-[0_1px_4px_rgba(56,48,56,0.03)] space-y-4"
        >
          <div>
            <h2 id="faq-search-heading" className="text-lg sm:text-xl font-bold text-[#383038] leading-snug text-balance max-w-2xl">
              知りたい言葉から検索
            </h2>
            <p className="text-xs sm:text-sm text-[#777078] mt-1">
              気になる単語を入力するか、下のキーワードを押すと該当するQ&amp;Aがすぐ表示されます
            </p>
          </div>

          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#C96D8C]">
              <OutlineIcon name="Search" size={18} />
            </div>
            <input
              type="search"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="キーワードを入力（例：未経験、20歳、日給、身バレ、送迎）"
              aria-label="FAQキーワード検索"
              className="w-full min-h-[48px] pl-11 pr-12 py-2.5 bg-[#FFF9FB] border border-[#F0E5E9] rounded-xl text-base text-[#383038] placeholder:text-[#777078] focus:outline-none focus:border-[#C96D8C] focus:ring-2 focus:ring-[#C96D8C]/15 transition-all"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                aria-label="検索キーワードをクリア"
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-[#777078] hover:text-[#383038] cursor-pointer min-w-[44px] justify-center"
              >
                <OutlineIcon name="X" size={18} />
              </button>
            )}
          </div>

          <div className="space-y-2">
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-[#777078]">
              <span className="font-medium">よく検索されるキーワード</span>
              {searchQuery && (
                <span className="font-bold text-[#C96D8C] tabular-nums">
                  {searchResults.length}問見つかりました
                </span>
              )}
            </div>

            <div className="flex flex-wrap gap-2">
              {POPULAR_KEYWORDS.map(kw => {
                const isActive = searchQuery.trim() === kw;
                return (
                  <button
                    key={kw}
                    type="button"
                    onClick={() => setSearchQuery(isActive ? '' : kw)}
                    className={`min-h-[38px] px-3.5 py-1.5 rounded-lg text-xs sm:text-[13px] font-semibold border transition-colors cursor-pointer whitespace-nowrap ${
                      isActive
                        ? 'bg-[#C96D8C] border-[#C96D8C] text-white'
                        : 'bg-[#FFF9FB] hover:bg-[#FFF0F4] border-[#F0E5E9] text-[#383038] hover:text-[#C96D8C]'
                    }`}
                  >
                    #{kw}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Search Results Drawer */}
          {searchQuery.trim() !== '' && (
            <div className="pt-4 border-t border-[#F0E5E9] space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="text-sm sm:text-base font-bold text-[#383038]">
                  「{searchQuery.trim()}」の検索結果（{searchResults.length}問）
                </h3>
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="text-xs font-semibold text-[#C96D8C] hover:underline cursor-pointer"
                >
                  検索をクリア
                </button>
              </div>

              {searchResults.length === 0 ? (
                <div className="rounded-xl bg-[#FFF9FB] border border-[#F0E5E9] p-5 text-center space-y-3">
                  <p className="text-sm font-bold text-[#383038]">
                    一致する質問が見つかりませんでした
                  </p>
                  <p className="text-xs sm:text-sm text-[#777078] leading-relaxed">
                    別の言い回し（例：「お金」→「給料」、「寮」→「住まい」）をお試しいただくか、LINEから直接ご質問ください。
                  </p>
                  <div className="flex flex-wrap justify-center gap-2.5 pt-1">
                    <button
                      type="button"
                      onClick={() => setSearchQuery('')}
                      className="min-h-[42px] px-4 py-2 rounded-lg border border-[#F0E5E9] bg-white text-xs sm:text-sm font-bold text-[#383038] hover:border-[#C96D8C] cursor-pointer"
                    >
                      検索条件をクリア
                    </button>
                    <a
                      href={LINE_OFFICIAL_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="min-h-[42px] inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#06C755] hover:bg-[#05b34c] text-white text-xs sm:text-sm font-bold"
                    >
                      <OutlineIcon name="MessageCircle" size={15} />
                      <span>LINEで直接質問する</span>
                    </a>
                  </div>
                </div>
              ) : (
                <div className="border border-[#F0E5E9] rounded-xl bg-[#FFFFFF] divide-y divide-[#F0E5E9] overflow-hidden">
                  {searchResults.map((faq, idx) =>
                    renderFaqRow(faq, `Q${idx + 1}`, 'search')
                  )}
                </div>
              )}
            </div>
          )}
        </section>

        {/* ============================================================
            3. 初心者向け：まず知っておきたい基本の5問
           ============================================================ */}
        {selectedCategory === 'all' && (
          <section aria-labelledby="faq-essential-heading" className="space-y-4">
            <div>
              <h2 id="faq-essential-heading" className="text-xl sm:text-2xl font-bold text-[#383038] leading-snug text-balance max-w-2xl">
                初めての方へ｜まず知っておきたい基本の5問
              </h2>
              <p className="text-xs sm:text-sm text-[#777078] mt-1">
                最初によく確認される「未経験・年齢・仕事内容・給料・身バレ」の基本をまとめました
              </p>
            </div>

            <div className="bg-[#FFFFFF] border border-[#F0E5E9] rounded-2xl divide-y divide-[#F0E5E9] overflow-hidden shadow-[0_1px_4px_rgba(56,48,56,0.03)]">
              {ESSENTIAL_5_FAQ_LIST.map((faq, idx) =>
                renderFaqRow(faq, `Q${idx + 1}`, 'starter')
              )}
            </div>
          </section>
        )}

        {/* ============================================================
            4. テーマ別に整理された全12カテゴリーQ&A一覧
           ============================================================ */}
        <section id="faq-theme-directory" className="scroll-mt-24 space-y-6" aria-labelledby="faq-directory-heading">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
            <div>
              <h2 id="faq-directory-heading" className="text-xl sm:text-2xl font-bold text-[#383038] leading-snug text-balance max-w-2xl">
                {activeCategoryDef
                  ? `${activeCategoryDef.number}. ${activeCategoryDef.label}の質問一覧`
                  : 'カテゴリー別にQ&Aを探す'}
              </h2>
              <p className="text-xs sm:text-sm text-[#777078] mt-1">
                {activeCategoryDef
                  ? activeCategoryDef.description
                  : '下の12カテゴリーから気になる項目を押すと、該当する質問へ移動します。'}
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              {selectedCategory !== 'all' ? (
                <button
                  type="button"
                  onClick={() => handleSelectCategory('all', false)}
                  className="min-h-[40px] inline-flex items-center gap-1.5 text-xs sm:text-[13px] font-bold text-[#C96D8C] bg-[#FFF0F4] hover:bg-[#FCE2EB] px-4 py-2 rounded-lg transition-colors cursor-pointer whitespace-nowrap"
                >
                  <OutlineIcon name="ArrowLeft" size={14} />
                  <span>全12カテゴリー一覧に戻る</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={toggleAllCategoryPanels}
                  className="min-h-[40px] inline-flex items-center gap-1.5 text-xs sm:text-[13px] font-semibold text-[#383038] bg-[#FFFFFF] hover:bg-[#FFF0F4] border border-[#F0E5E9] hover:border-[#C96D8C]/50 px-4 py-2 rounded-lg transition-colors cursor-pointer whitespace-nowrap"
                >
                  <OutlineIcon
                    name={openCategoryIds.size === FAQ_12_CATEGORIES.length ? 'ChevronsUp' : 'ChevronsDown'}
                    size={15}
                    className="text-[#C96D8C]"
                  />
                  <span>
                    {openCategoryIds.size === FAQ_12_CATEGORIES.length
                      ? 'すべて閉じる'
                      : '全12カテゴリーを開く'}
                  </span>
                </button>
              )}
            </div>
          </div>

          {/* 12-Category Quick Jump Index (visible in All mode) */}
          {selectedCategory === 'all' && (
            <nav aria-label="12カテゴリー目次" className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-3">
              {FAQ_12_CATEGORIES.map(cat => {
                const count = faqsByCategory[cat.id]?.length || 0;
                const isOpen = openCategoryIds.has(cat.id);
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => handleJumpToCategory(cat.id)}
                    className={`min-h-[96px] flex flex-col justify-between p-3.5 rounded-xl border text-left transition-colors cursor-pointer ${
                      isOpen
                        ? 'bg-[#FFF0F4]/80 border-[#C96D8C]'
                        : 'bg-[#FFFFFF] border-[#F0E5E9] hover:border-[#C96D8C]/60 hover:bg-[#FFF9FB]'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 w-full mb-1.5">
                      <div className="flex items-center gap-1.5">
                        <span
                          className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                            isOpen ? 'bg-[#C96D8C] text-white' : 'bg-[#FFF0F4] text-[#C96D8C]'
                          }`}
                        >
                          <OutlineIcon name={cat.icon} size={15} />
                        </span>
                        <span className="text-[11px] font-bold text-[#C96D8C] tabular-nums">
                          {cat.number}
                        </span>
                      </div>
                      <span className="text-[11px] font-medium text-[#777078] tabular-nums">
                        {count}問
                      </span>
                    </div>

                    <div>
                      <div className="font-bold text-[13.5px] sm:text-sm text-[#383038] leading-snug">
                        {cat.label}
                      </div>
                      <p className="text-[11px] text-[#777078] mt-0.5 line-clamp-1">
                        {cat.description}
                      </p>
                    </div>
                  </button>
                );
              })}
            </nav>
          )}

          {/* Single-Category Focused View */}
          {activeCategoryDef ? (
            <div className="space-y-4">
              <div
                id={`faq-category-${activeCategoryDef.id}`}
                className="scroll-mt-24 bg-[#FFFFFF] border border-[#F0E5E9] rounded-2xl overflow-hidden shadow-[0_1px_4px_rgba(56,48,56,0.03)]"
              >
                <div className="px-4 py-4 sm:px-6 sm:py-5 border-b border-[#F0E5E9] flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#FFF9FB]/60">
                  <div className="flex items-center gap-3">
                    <span className="w-9 h-9 rounded-lg bg-[#FFF0F4] text-[#C96D8C] flex items-center justify-center shrink-0">
                      <OutlineIcon name={activeCategoryDef.icon} size={18} />
                    </span>
                    <div>
                      <div className="text-xs font-bold text-[#C96D8C]">
                        カテゴリー {activeCategoryDef.number} · 全{faqsByCategory[activeCategoryDef.id].length}問
                      </div>
                      <div className="text-base sm:text-lg font-bold text-[#383038]">
                        {activeCategoryDef.seoHeading}
                      </div>
                    </div>
                  </div>
                  <a
                    href={activeCategoryDef.relatedUrl}
                    onClick={e => handleLinkNavigate(e, activeCategoryDef.relatedUrl)}
                    className="inline-flex items-center gap-1.5 text-xs sm:text-[13px] font-bold text-[#C96D8C] hover:underline underline-offset-4 whitespace-nowrap"
                  >
                    <span>{activeCategoryDef.relatedLabel}</span>
                    <OutlineIcon name="ArrowRight" size={14} />
                  </a>
                </div>

                <div className="divide-y divide-[#F0E5E9]">
                  {faqsByCategory[activeCategoryDef.id].map((faq, idx) =>
                    renderFaqRow(faq, `Q${idx + 1}`, 'dir')
                  )}
                </div>
              </div>
            </div>
          ) : (
            /* Clean Flat 12-Category Collapsible Panels */
            <div className="space-y-3">
              {FAQ_12_CATEGORIES.map(cat => {
                const catItems = faqsByCategory[cat.id] || [];
                const isCatOpen = openCategoryIds.has(cat.id);

                return (
                  <div
                    key={cat.id}
                    id={`faq-category-${cat.id}`}
                    className={`scroll-mt-24 bg-[#FFFFFF] border rounded-2xl overflow-hidden transition-colors shadow-[0_1px_3px_rgba(56,48,56,0.03)] ${
                      isCatOpen ? 'border-[#C96D8C]/50' : 'border-[#F0E5E9]'
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => toggleCategoryPanel(cat.id)}
                      aria-expanded={isCatOpen}
                      className="w-full min-h-[68px] px-4 py-4 sm:px-6 flex items-center justify-between gap-4 text-left hover:bg-[#FFF9FB] transition-colors cursor-pointer"
                    >
                      <div className="flex items-start sm:items-center gap-3.5 flex-1 min-w-0">
                        <span
                          className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                            isCatOpen
                              ? 'bg-[#C96D8C] text-white'
                              : 'bg-[#FFF0F4] text-[#C96D8C]'
                          }`}
                        >
                          <OutlineIcon name={cat.icon} size={19} />
                        </span>
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-wrap items-center gap-x-2.5 gap-y-0.5">
                            <span className="text-xs font-bold text-[#C96D8C] tabular-nums">
                              {cat.number}
                            </span>
                            <h3 className="text-[15.5px] sm:text-[17px] font-bold text-[#383038]">
                              {cat.label}
                            </h3>
                            <span className="text-xs text-[#777078] tabular-nums">
                              全{catItems.length}問
                            </span>
                          </div>
                          <p className="text-xs sm:text-[13px] text-[#777078] mt-0.5 line-clamp-1">
                            {cat.description}
                          </p>
                        </div>
                      </div>

                      <span className="shrink-0 inline-flex items-center gap-1 text-xs font-bold text-[#C96D8C]">
                        <span className="hidden sm:inline">
                          {isCatOpen ? '閉じる' : '開く'}
                        </span>
                        <OutlineIcon
                          name="ChevronDown"
                          size={18}
                          className={`transition-transform ${isCatOpen ? 'rotate-180' : ''}`}
                        />
                      </span>
                    </button>

                    {isCatOpen && (
                      <div className="border-t border-[#F0E5E9]">
                        <div className="divide-y divide-[#F0E5E9]">
                          {catItems.map((faq, idx) =>
                            renderFaqRow(faq, `Q${idx + 1}`, 'dir')
                          )}
                        </div>

                        <div className="px-4 py-3.5 sm:px-6 bg-[#FFF9FB] border-t border-[#F0E5E9] flex flex-wrap items-center justify-between gap-3">
                          <a
                            href={cat.relatedUrl}
                            onClick={e => handleLinkNavigate(e, cat.relatedUrl)}
                            className="inline-flex items-center gap-1.5 text-xs sm:text-[13px] font-bold text-[#C96D8C] hover:underline underline-offset-4"
                          >
                            <OutlineIcon name="BookOpen" size={14} />
                            <span>{cat.relatedLabel}</span>
                            <OutlineIcon name="ArrowRight" size={13} />
                          </a>

                          <div className="flex items-center gap-4">
                            <button
                              type="button"
                              onClick={() => handleSelectCategory(cat.id, true)}
                              className="text-xs font-semibold text-[#777078] hover:text-[#383038] cursor-pointer"
                            >
                              このカテゴリーだけ表示
                            </button>
                            <button
                              type="button"
                              onClick={() => toggleCategoryPanel(cat.id)}
                              className="text-xs font-semibold text-[#777078] hover:text-[#C96D8C] cursor-pointer"
                            >
                              閉じる
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </section>

        {/* ============================================================
            5. あわせて確認したい求人ガイド（整理された一覧リンク）
           ============================================================ */}
        <section aria-labelledby="faq-related-pages-heading" className="space-y-4">
          <div>
            <h2 id="faq-related-pages-heading" className="text-xl sm:text-2xl font-bold text-[#383038] leading-snug text-balance max-w-2xl">
              あわせて確認したい求人ガイド
            </h2>
            <p className="text-xs sm:text-sm text-[#777078] mt-1">
              仕事内容や給料シミュレーション、通りの特徴などテーマ別の解説ページもご覧いただけます
            </p>
          </div>

          <div className="bg-[#FFFFFF] border border-[#F0E5E9] rounded-2xl overflow-hidden shadow-[0_1px_4px_rgba(56,48,56,0.03)]">
            <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:gap-px sm:bg-[#F0E5E9]">
              {RELATED_GUIDE_LINKS.map(link => (
                <a
                  key={link.path}
                  href={link.path}
                  onClick={e => handleLinkNavigate(e, link.path)}
                  className="group bg-[#FFFFFF] hover:bg-[#FFF9FB] p-4 sm:px-5 sm:py-4 flex items-center justify-between gap-3 transition-colors"
                >
                  <div className="min-w-0">
                    <div className="font-bold text-sm sm:text-[15px] text-[#383038] group-hover:text-[#C96D8C] transition-colors">
                      {link.title}
                    </div>
                    <p className="text-xs text-[#777078] mt-0.5 line-clamp-1">{link.desc}</p>
                  </div>
                  <OutlineIcon
                    name="ChevronRight"
                    size={16}
                    className="text-[#777078] group-hover:text-[#C96D8C] shrink-0"
                  />
                </a>
              ))}
              <div className="hidden sm:block bg-[#FFFFFF]" aria-hidden="true" />
            </div>
          </div>
        </section>

        {/* ============================================================
            6. 最終LINE相談CTA
           ============================================================ */}
        <section aria-labelledby="faq-final-cta-heading">
          <div className="bg-[#FFFFFF] border border-[#F0E5E9] rounded-2xl p-6 sm:p-8 text-center shadow-[0_1px_4px_rgba(56,48,56,0.03)]">
            <h2
              id="faq-final-cta-heading"
              className="text-lg sm:text-2xl font-bold text-[#383038] leading-snug mb-2 text-balance max-w-xl sm:max-w-2xl mx-auto"
            >
              まだ解決していない疑問はありませんか？
            </h2>
            <p className="text-sm sm:text-[15px] text-[#777078] leading-[1.8] max-w-xl mx-auto mb-6">
              ご自身の年齢や希望の勤務時間、交通費・滞在先の条件など、ページだけでは判断しにくい内容もLINEで個別にお答えします。応募を決める前の相談だけでも大丈夫です。
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href={LINE_OFFICIAL_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={onCtaclick ? () => {} : undefined}
                className="w-full sm:w-auto min-h-[48px] inline-flex items-center justify-center gap-2 bg-[#06C755] hover:bg-[#05b34c] text-white font-bold text-sm sm:text-base px-8 py-3 rounded-xl transition-colors whitespace-nowrap"
              >
                <OutlineIcon name="MessageCircle" size={18} />
                <span>LINEで気軽に質問する</span>
              </a>
              <a
                href="/"
                onClick={e => handleLinkNavigate(e, '/')}
                className="w-full sm:w-auto min-h-[48px] inline-flex items-center justify-center gap-2 bg-[#FFF9FB] hover:bg-[#FFF0F4] text-[#383038] hover:text-[#C96D8C] border border-[#F0E5E9] font-bold text-sm px-6 py-3 rounded-xl transition-colors whitespace-nowrap"
              >
                <OutlineIcon name="ArrowLeft" size={16} />
                <span>飛田新地求人トップへ戻る</span>
              </a>
            </div>
            <p className="text-xs text-[#777078] mt-3">
              相談だけでもOK · 24時間受付 · 無理な勧誘や引き止めは行いません
            </p>
          </div>
        </section>

        {/* ============================================================
            7. 運営者情報・更新日
           ============================================================ */}
        <section aria-labelledby="faq-operator-heading">
          <div className="bg-[#FFFFFF] border border-[#F0E5E9] rounded-2xl p-5 sm:p-6">
            <h2
              id="faq-operator-heading"
              className="text-sm sm:text-base font-bold text-[#383038] mb-3 pb-2.5 border-b border-[#F0E5E9]"
            >
              運営者情報・掲載内容の確認状況
            </h2>
            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 text-xs sm:text-[13.5px]">
              <div>
                <dt className="text-[#777078] font-medium">運営窓口・店舗組織</dt>
                <dd className="text-[#383038] font-semibold mt-0.5">
                  飛田ガールズ（飛田新地料理組合加盟料亭 直営公式採用窓口）
                </dd>
              </div>
              <div>
                <dt className="text-[#777078] font-medium">求人・サポート責任者</dt>
                <dd className="text-[#383038] font-semibold mt-0.5">
                  女性サポート統括担当 さくら ／ 採用マネージャー 木村
                </dd>
              </div>
              <div>
                <dt className="text-[#777078] font-medium">勤務エリア・最寄り駅</dt>
                <dd className="text-[#383038] mt-0.5 leading-relaxed">
                  大阪府大阪市西成区山王（動物園前駅 徒歩5分 ／ 新今宮駅 徒歩7分 ／ 天王寺駅 徒歩10分）
                </dd>
              </div>
              <div>
                <dt className="text-[#777078] font-medium">最終確認日・更新日</dt>
                <dd className="text-[#383038] font-semibold mt-0.5">
                  <time dateTime={FAQ_LAST_UPDATED_ISO}>{FAQ_LAST_UPDATED}</time>（全{FAQ_100_LIST.length}問を店舗条件と照合）
                </dd>
              </div>
            </dl>
            <p className="text-[11.5px] sm:text-xs text-[#777078] mt-4 pt-3 border-t border-[#F0E5E9] leading-relaxed">
              ※寮費・空室状況・交通費上限・深夜送迎・各種サポート制度など、時期やご希望のシフト・個人条件により変動する項目は「事前確認推奨」として記載しています。確定条件は面談前またはLINE相談時にご案内します。
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
