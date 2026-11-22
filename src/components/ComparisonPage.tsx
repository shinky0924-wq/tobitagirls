/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect } from 'react';
import LucideIcon from './LucideIcon';
import { LINE_OFFICIAL_URL } from '../data';
import {
  COMPARE_CATEGORY_GROUPS,
  COMPARE_PARENT_COPY,
  COMPARE_LINE_CTA,
  COMPARE_SUBPAGE_MAP,
  LEGACY_COMPARE_SLUG_REDIRECTS,
  type CompareSubpageItem,
} from '../data/compareGuides';
import { updatePageJsonLd } from '../utils/jsonLd';

interface ComparisonPageProps {
  onNavigateHome: () => void;
  onNavigateBlog?: () => void;
  onNavigateSiteCompare?: () => void;
  onNavigatePath?: (targetPath: string) => void;
  onCtaclick?: () => void;
  onInjectedScroll?: (message: string) => void;
  initialCategorySlug?: string | null;
  onSelectCategorySlug?: (slug: string | null) => void;
}

const DOMAIN = 'https://tobitashinchi-recruit.com';

export default function ComparisonPage({
  onNavigateHome,
  onNavigateSiteCompare,
  onNavigatePath,
  initialCategorySlug,
  onSelectCategorySlug,
}: ComparisonPageProps) {
  const cleanSlug = initialCategorySlug
    ? initialCategorySlug.replace(/\/$/, '').trim()
    : null;
  const canonicalSlug =
    cleanSlug && LEGACY_COMPARE_SLUG_REDIRECTS[cleanSlug]
      ? LEGACY_COMPARE_SLUG_REDIRECTS[cleanSlug]
      : cleanSlug;

  const activeSubpage: CompareSubpageItem | null = canonicalSlug
    ? COMPARE_SUBPAGE_MAP[canonicalSlug] || null
    : null;

  const isUnknownSlug = Boolean(canonicalSlug && !activeSubpage);

  useEffect(() => {
    if (typeof window !== 'undefined' && cleanSlug && LEGACY_COMPARE_SLUG_REDIRECTS[cleanSlug]) {
      onSelectCategorySlug?.(LEGACY_COMPARE_SLUG_REDIRECTS[cleanSlug]);
      return;
    }

    const setMetaRobots = (val: string) => {
      let el = document.querySelector('meta[name="robots"]');
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute('name', 'robots');
        document.head.appendChild(el);
      }
      el.setAttribute('content', val);
    };

    if (activeSubpage) {
      const url = `${DOMAIN}/compare/${activeSubpage.slug}`;
      document.title = activeSubpage.seoTitle;
      setMetaRobots(
        activeSubpage.seoNoindex
          ? 'noindex, follow'
          : 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1'
      );
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) metaDesc.setAttribute('content', activeSubpage.metaDescription);
      const canonical = document.querySelector('link[rel="canonical"]');
      if (canonical) canonical.setAttribute('href', url);

      updatePageJsonLd({
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'WebPage',
            '@id': `${url}#webpage`,
            url,
            name: activeSubpage.seoTitle,
            description: activeSubpage.metaDescription,
            inLanguage: 'ja-JP',
            isPartOf: { '@id': `${DOMAIN}/#website` },
            publisher: { '@id': `${DOMAIN}/#organization` },
          },
          {
            '@type': 'BreadcrumbList',
            '@id': `${url}#breadcrumb`,
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'トップページ', item: `${DOMAIN}/` },
              { '@type': 'ListItem', position: 2, name: '働き方・求人比較', item: `${DOMAIN}/compare` },
              { '@type': 'ListItem', position: 3, name: activeSubpage.itemName, item: url },
            ],
          },
          {
            '@type': 'FAQPage',
            '@id': `${url}#faq`,
            mainEntity: activeSubpage.faqs.map((faq) => ({
              '@type': 'Question',
              name: faq.q,
              acceptedAnswer: { '@type': 'Answer', text: faq.a },
            })),
          },
        ],
      });
    } else if (isUnknownSlug) {
      setMetaRobots('noindex, nofollow');
    } else {
      const url = `${DOMAIN}/compare`;
      const indexableCompareItems = Object.values(COMPARE_SUBPAGE_MAP).filter((item) => !item.seoNoindex);
      document.title = COMPARE_PARENT_COPY.seoTitle;
      setMetaRobots('index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1');
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) metaDesc.setAttribute('content', COMPARE_PARENT_COPY.metaDescription);
      const canonical = document.querySelector('link[rel="canonical"]');
      if (canonical) canonical.setAttribute('href', url);

      updatePageJsonLd({
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'WebPage',
            '@id': `${url}#webpage`,
            url,
            name: COMPARE_PARENT_COPY.seoTitle,
            description: COMPARE_PARENT_COPY.metaDescription,
            inLanguage: 'ja-JP',
            isPartOf: { '@id': `${DOMAIN}/#website` },
            publisher: { '@id': `${DOMAIN}/#organization` },
            mainEntity: {
              '@type': 'ItemList',
              name: `働き方・希望別カテゴリー一覧（主要${indexableCompareItems.length}項目）`,
              numberOfItems: indexableCompareItems.length,
              itemListElement: indexableCompareItems.map((item, idx) => ({
                '@type': 'ListItem',
                position: idx + 1,
                name: item.itemName,
                url: `${DOMAIN}/compare/${item.slug}`,
              })),
            },
          },
          {
            '@type': 'BreadcrumbList',
            '@id': `${url}#breadcrumb`,
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'トップページ', item: `${DOMAIN}/` },
              { '@type': 'ListItem', position: 2, name: '働き方・求人比較', item: url },
            ],
          },
        ],
      });
    }
  }, [activeSubpage, isUnknownSlug, cleanSlug]);

  const handleNavigateInternal = (targetPath: string) => {
    if (onNavigatePath) {
      onNavigatePath(targetPath);
    } else if (typeof window !== 'undefined') {
      window.history.pushState({}, '', targetPath);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const scrollToCategories = () => {
    const el = document.getElementById('categories-directory');
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 76;
      window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
    }
  };

  // =====================================================================
  // 404 / Unknown subpage fallback
  // =====================================================================
  if (isUnknownSlug) {
    return (
      <div className="min-h-screen bg-[#FFF9FB] text-[#383038] pt-24 pb-20 px-4">
        <div className="max-w-2xl mx-auto bg-white border border-[#EFE2E7] rounded-2xl p-8 text-center shadow-xs">
          <h1 className="text-xl sm:text-2xl font-bold text-[#383038] mb-3">
            お探しのページが見つかりませんでした
          </h1>
          <p className="text-sm text-[#777078] leading-relaxed mb-6">
            指定されたURLは存在しないか移動した可能性があります。働き方・求人比較一覧ページよりご希望のカテゴリーをお選びください。
          </p>
          <a
            href="/compare"
            onClick={(e) => {
              e.preventDefault();
              onSelectCategorySlug?.(null);
            }}
            className="inline-flex items-center justify-center gap-2 bg-[#C96D8C] hover:bg-[#B35877] text-white font-bold text-sm px-6 py-3.5 rounded-xl transition-colors cursor-pointer"
          >
            <span>働き方・求人比較トップへ戻る</span>
            <LucideIcon name="ArrowRight" size={16} />
          </a>
        </div>
      </div>
    );
  }

  // =====================================================================
  // SUBPAGE VIEW (/compare/<slug>) — 8-Part Structure (Section 6)
  // =====================================================================
  if (activeSubpage) {
    return (
      <article className="min-h-screen bg-[#FFF9FB] text-[#383038] pt-20 sm:pt-24 pb-20 font-sans">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-8 sm:space-y-10">
          {/* Breadcrumb Navigation */}
          <nav
            aria-label="パンくずリスト"
            className="flex flex-wrap items-center gap-1.5 text-xs sm:text-[13px] text-[#777078] pt-2"
          >
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                onNavigateHome();
              }}
              className="hover:text-[#C96D8C] transition-colors underline underline-offset-2"
            >
              トップページ
            </a>
            <span aria-hidden="true">＞</span>
            <a
              href="/compare"
              onClick={(e) => {
                e.preventDefault();
                onSelectCategorySlug?.(null);
              }}
              className="hover:text-[#C96D8C] transition-colors underline underline-offset-2"
            >
              働き方・求人比較
            </a>
            <span aria-hidden="true">＞</span>
            <span className="text-[#383038] font-semibold">{activeSubpage.itemName}</span>
          </nav>

          {/* ① ファーストビュー */}
          <header className="bg-white border border-[#EFE2E7] rounded-2xl p-6 sm:p-9 shadow-xs space-y-4">
            <p className="text-xs sm:text-sm font-semibold text-[#C96D8C]">
              {activeSubpage.categoryTitle}｜{activeSubpage.itemName}
            </p>
            <h1 className="font-display text-2xl sm:text-3xl font-bold text-[#383038] leading-snug tracking-tight text-balance max-w-2xl">
              {activeSubpage.h1}
            </h1>
            <p className="text-sm sm:text-base text-[#777078] leading-relaxed">
              {activeSubpage.heroLead}
            </p>
          </header>

          {/* ② このような女性に向けたページです */}
          <section className="bg-white border border-[#EFE2E7] rounded-2xl p-6 sm:p-8 shadow-xs space-y-4">
            <h2 className="font-display text-lg sm:text-xl font-bold text-[#383038] border-b border-[#EFE2E7] pb-3 leading-snug text-balance">
              このような女性に向けたページです
            </h2>
            <ul className="space-y-3">
              {activeSubpage.targetPoints.map((point, idx) => (
                <li key={idx} className="flex items-start gap-3 text-sm sm:text-[15px] leading-relaxed text-[#383038]">
                  <span className="mt-1 text-[#C96D8C] shrink-0" aria-hidden="true">
                    <LucideIcon name="Check" size={16} />
                  </span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* ③ 知っておきたい仕事内容・働き方 */}
          <section className="bg-white border border-[#EFE2E7] rounded-2xl p-6 sm:p-8 shadow-xs space-y-5">
            <h2 className="font-display text-lg sm:text-xl font-bold text-[#383038] border-b border-[#EFE2E7] pb-3 leading-snug text-balance">
              知っておきたい仕事内容・働き方
            </h2>
            <p className="text-sm sm:text-[15px] text-[#777078] leading-relaxed">
              {activeSubpage.workstyle.lead}
            </p>
            <div className="space-y-3.5">
              {activeSubpage.workstyle.points.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-[#FFF9FB] border border-[#EFE2E7] rounded-xl p-4 sm:p-5 text-sm sm:text-[15px] leading-relaxed text-[#383038]"
                >
                  {item}
                </div>
              ))}
            </div>
            {activeSubpage.workstyle.note && (
              <div className="bg-[#FFF0F4] border border-[#F3D4DF] rounded-xl p-4 text-xs sm:text-sm text-[#383038] leading-relaxed">
                {activeSubpage.workstyle.note}
              </div>
            )}
          </section>

          {/* ④ 給料・報酬・勤務条件 */}
          <section className="bg-white border border-[#EFE2E7] rounded-2xl p-6 sm:p-8 shadow-xs space-y-5">
            <h2 className="font-display text-lg sm:text-xl font-bold text-[#383038] border-b border-[#EFE2E7] pb-3 leading-snug text-balance">
              給料・報酬・勤務条件
            </h2>
            <p className="text-sm sm:text-[15px] text-[#777078] leading-relaxed">
              {activeSubpage.salaryConditions.lead}
            </p>

            {/* Stacked definition rows (zero horizontal scroll on mobile) */}
            <dl className="divide-y divide-[#EFE2E7] border border-[#EFE2E7] rounded-xl overflow-hidden">
              {activeSubpage.salaryConditions.rows.map((row, idx) => (
                <div
                  key={idx}
                  className="grid grid-cols-1 sm:grid-cols-3 bg-white"
                >
                  <dt className="bg-[#FFF0F4]/60 px-4 py-3 sm:py-4 text-xs sm:text-sm font-bold text-[#383038] border-b sm:border-b-0 sm:border-r border-[#EFE2E7]">
                    {row.label}
                  </dt>
                  <dd className="sm:col-span-2 px-4 py-3 sm:py-4 text-sm text-[#383038] leading-relaxed">
                    {row.value}
                  </dd>
                </div>
              ))}
            </dl>

            {activeSubpage.salaryConditions.formulaExample && (
              <div className="bg-[#FFF0F4] border border-[#F3D4DF] rounded-xl p-4 sm:p-5 text-sm text-[#383038] leading-relaxed">
                <p className="font-bold text-[#C96D8C] text-xs mb-1">計算の目安（例）</p>
                <p>{activeSubpage.salaryConditions.formulaExample}</p>
              </div>
            )}

            <p className="text-xs text-[#777078] leading-relaxed">
              {activeSubpage.salaryConditions.disclaimer}
            </p>
          </section>

          {/* ⑤ 応募前に確認しておきたいこと */}
          <section className="bg-[#FFF0F4] border border-[#F3D4DF] rounded-2xl p-6 sm:p-8 space-y-4">
            <h2 className="font-display text-lg sm:text-xl font-bold text-[#383038] leading-snug text-balance max-w-2xl">
              応募前に確認しておきたいこと
            </h2>
            <ul className="space-y-3">
              {activeSubpage.preCheckPoints.map((pt, idx) => (
                <li
                  key={idx}
                  className="bg-white/90 border border-[#EFE2E7] rounded-xl p-4 text-sm text-[#383038] leading-relaxed flex items-start gap-3"
                >
                  <span className="text-[#C96D8C] font-bold shrink-0" aria-hidden="true">
                    {idx + 1}.
                  </span>
                  <span>{pt}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* ⑥ よくある質問 */}
          <section className="bg-white border border-[#EFE2E7] rounded-2xl p-6 sm:p-8 shadow-xs space-y-5">
            <h2 className="font-display text-lg sm:text-xl font-bold text-[#383038] border-b border-[#EFE2E7] pb-3 leading-snug text-balance">
              よくある質問
            </h2>
            <div className="space-y-4">
              {activeSubpage.faqs.map((faq, idx) => (
                <div
                  key={idx}
                  className="bg-[#FFF9FB] border border-[#EFE2E7] rounded-xl p-5 space-y-2.5"
                >
                  <h3 className="text-sm sm:text-base font-bold text-[#383038] leading-snug">
                    Q. {faq.q}
                  </h3>
                  <p className="text-sm text-[#777078] leading-relaxed">
                    A. {faq.a}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* ⑦ 関連ページ */}
          <section className="bg-white border border-[#EFE2E7] rounded-2xl p-6 sm:p-8 shadow-xs space-y-5">
            <h2 className="font-display text-lg sm:text-xl font-bold text-[#383038] border-b border-[#EFE2E7] pb-3 leading-snug text-balance">
              関連ページ
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {activeSubpage.relatedCompareSlugs.map((relSlug) => {
                const relItem = COMPARE_SUBPAGE_MAP[relSlug];
                if (!relItem) return null;
                return (
                  <a
                    key={relSlug}
                    href={`/compare/${relItem.slug}`}
                    onClick={(e) => {
                      e.preventDefault();
                      onSelectCategorySlug?.(relItem.slug);
                    }}
                    className="group bg-[#FFF9FB] hover:bg-[#FFF0F4] border border-[#EFE2E7] hover:border-[#C96D8C]/50 rounded-xl p-4 transition-all flex items-center justify-between gap-3 cursor-pointer"
                  >
                    <div className="min-w-0">
                      <div className="font-bold text-sm text-[#383038] group-hover:text-[#C96D8C] transition-colors">
                        {relItem.itemName}
                      </div>
                      <div className="text-xs text-[#777078] truncate mt-0.5">
                        {relItem.cardDescription}
                      </div>
                    </div>
                    <span className="text-xs font-semibold text-[#C96D8C] shrink-0">
                      詳しく見る →
                    </span>
                  </a>
                );
              })}

              {activeSubpage.relatedSitePaths.map((guide) => (
                <a
                  key={guide.path}
                  href={guide.path}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavigateInternal(guide.path);
                  }}
                  className="group bg-white hover:bg-[#FFF0F4] border border-[#EFE2E7] hover:border-[#C96D8C]/50 rounded-xl p-4 transition-all flex items-center justify-between gap-3 cursor-pointer"
                >
                  <div className="min-w-0">
                    <div className="font-bold text-sm text-[#383038] group-hover:text-[#C96D8C] transition-colors">
                      {guide.label}
                    </div>
                    <div className="text-xs text-[#777078] truncate mt-0.5">
                      {guide.desc}
                    </div>
                  </div>
                  <span className="text-xs font-semibold text-[#C96D8C] shrink-0">
                    見る →
                  </span>
                </a>
              ))}
            </div>

            <div className="pt-2">
              <a
                href="/compare"
                onClick={(e) => {
                  e.preventDefault();
                  onSelectCategorySlug?.(null);
                }}
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#C96D8C] hover:underline"
              >
                <LucideIcon name="ArrowLeft" size={15} />
                <span>働き方・求人比較トップへ戻る</span>
              </a>
            </div>
          </section>

          {/* ⑧ LINE相談CTA */}
          <section className="bg-[#FFF0F4] border border-[#F3D4DF] rounded-2xl p-6 sm:p-10 text-center space-y-4">
            <h2 className="font-display text-xl sm:text-2xl font-bold text-[#383038] leading-snug text-balance max-w-xl sm:max-w-2xl mx-auto">
              {COMPARE_LINE_CTA.heading}
            </h2>
            <p className="text-sm sm:text-[15px] text-[#777078] max-w-xl mx-auto leading-relaxed">
              {COMPARE_LINE_CTA.description}
            </p>
            <div className="pt-2">
              <a
                href={LINE_OFFICIAL_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 bg-[#06C755] hover:bg-[#05b34c] text-white font-bold text-sm sm:text-base px-8 py-4 rounded-xl shadow-xs hover:shadow-md transition-all min-h-[48px]"
              >
                <LucideIcon name="MessageCircle" size={20} />
                <span>{COMPARE_LINE_CTA.buttonLabel}</span>
              </a>
            </div>
            <p className="text-xs text-[#777078]">
              {COMPARE_LINE_CTA.footnote}
            </p>
          </section>
        </div>
      </article>
    );
  }

  // =====================================================================
  // PARENT PAGE VIEW (/compare) — Clean Hierarchy & 5 Categories / 27 Cards
  // =====================================================================
  return (
    <div className="min-h-screen bg-[#FFF9FB] text-[#383038] pt-20 sm:pt-24 pb-20 font-sans">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-12 sm:space-y-16">
        {/* Breadcrumb */}
        <nav
          aria-label="パンくずリスト"
          className="flex items-center gap-1.5 text-xs sm:text-[13px] text-[#777078] pt-2"
        >
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              onNavigateHome();
            }}
            className="hover:text-[#C96D8C] transition-colors underline underline-offset-2"
          >
            トップページ
          </a>
          <span aria-hidden="true">＞</span>
          <span className="text-[#383038] font-semibold">働き方・求人比較</span>
        </nav>

        {/* First View (Calm, Uncluttered, Warm Feminine Editorial Design) */}
        <header className="bg-white border border-[#EFE2E7] rounded-2xl sm:rounded-3xl px-6 py-9 sm:px-12 sm:py-14 shadow-xs text-center space-y-6">
          <h1 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-[#383038] leading-snug tracking-tight text-balance max-w-xl sm:max-w-3xl mx-auto">
            {COMPARE_PARENT_COPY.h1}
          </h1>

          <div className="max-w-2xl mx-auto space-y-3 text-sm sm:text-base text-[#777078] leading-relaxed">
            <p>{COMPARE_PARENT_COPY.introLine1}</p>
            <p>{COMPARE_PARENT_COPY.introLine2}</p>
          </div>

          <p className="text-xs sm:text-sm text-[#C96D8C] font-medium leading-relaxed pt-1">
            {COMPARE_PARENT_COPY.keywords}
          </p>

          <div className="pt-2">
            <button
              type="button"
              onClick={scrollToCategories}
              className="inline-flex items-center justify-center gap-2 bg-[#C96D8C] hover:bg-[#B35877] text-white font-bold text-sm sm:text-base px-8 py-4 rounded-xl shadow-xs hover:shadow-md transition-all cursor-pointer min-h-[48px]"
            >
              <span>{COMPARE_PARENT_COPY.ctaLabel}</span>
              <LucideIcon name="ArrowDown" size={17} />
            </button>
          </div>
        </header>

        {/* Quick Jump Anchors for Categories A–E (Clean text links, zero pill clutter) */}
        <nav
          aria-label="カテゴリー目次"
          className="bg-[#FFF0F4]/70 border border-[#F3D4DF] rounded-2xl px-5 py-4"
        >
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2.5 text-xs sm:text-sm">
            {COMPARE_CATEGORY_GROUPS.map((group) => (
              <a
                key={group.id}
                href={`#${group.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  const target = document.getElementById(group.id);
                  if (target) {
                    const top = target.getBoundingClientRect().top + window.scrollY - 80;
                    window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
                  }
                }}
                className="font-semibold text-[#383038] hover:text-[#C96D8C] transition-colors py-1"
              >
                {group.title}
              </a>
            ))}
          </div>
        </nav>

        {/* 5 Categories & 27 Subpage Cards */}
        <div id="categories-directory" className="space-y-14 sm:space-y-16">
          {COMPARE_CATEGORY_GROUPS.map((group) => (
            <section
              key={group.id}
              id={group.id}
              className="space-y-6 scroll-mt-24"
            >
              <div className="space-y-2 border-b border-[#EFE2E7] pb-4">
                <h2 className="font-display text-xl sm:text-2xl font-bold text-[#383038] leading-snug text-balance max-w-2xl">
                  {group.title}
                </h2>
                <p className="text-sm sm:text-[15px] text-[#777078] leading-relaxed">
                  {group.description}
                </p>
              </div>

              {/* Clean Card Grid: ONLY Title + 1-line description + 詳しく見る → */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                {group.slugs.map((slug) => {
                  const item = COMPARE_SUBPAGE_MAP[slug];
                  if (!item) return null;
                  return (
                    <a
                      key={item.slug}
                      href={`/compare/${item.slug}`}
                      onClick={(e) => {
                        e.preventDefault();
                        onSelectCategorySlug?.(item.slug);
                      }}
                      className="group bg-white hover:bg-[#FFF0F4]/50 border border-[#EFE2E7] hover:border-[#C96D8C]/60 rounded-2xl p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between gap-4 min-h-[132px] cursor-pointer"
                    >
                      <div className="space-y-2">
                        <h3 className="font-display text-base sm:text-lg font-bold text-[#383038] group-hover:text-[#C96D8C] transition-colors">
                          {item.itemName}
                        </h3>
                        <p className="text-xs sm:text-sm text-[#777078] leading-relaxed">
                          {item.cardDescription}
                        </p>
                      </div>
                      <span className="text-xs sm:text-sm font-semibold text-[#C96D8C] inline-flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                        <span>詳しく見る →</span>
                      </span>
                    </a>
                  );
                })}
              </div>
            </section>
          ))}
        </div>

        {/* Helpful Secondary Link to Site/Industry Comparison Page */}
        <section className="bg-white border border-[#EFE2E7] rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xs">
          <div className="space-y-1">
            <h2 className="text-base sm:text-lg font-bold text-[#383038] leading-snug text-balance max-w-2xl">
              他業種や応募方法の違いを比較したい方へ
            </h2>
            <p className="text-xs sm:text-sm text-[#777078] leading-relaxed">
              メンズエステ・ソープランド・デリヘル・キャバクラとの比較や、公式求人サイト・SNS・スカウトなど応募方法の違いを一覧でご覧いただけます。
            </p>
          </div>
          <a
            href="/site-compare"
            onClick={(e) => {
              e.preventDefault();
              if (onNavigateSiteCompare) {
                onNavigateSiteCompare();
              } else {
                handleNavigateInternal('/site-compare');
              }
            }}
            className="shrink-0 inline-flex items-center justify-center gap-1.5 text-sm font-bold text-[#C96D8C] border border-[#C96D8C]/40 hover:bg-[#FFF0F4] px-5 py-3 rounded-xl transition-colors cursor-pointer min-h-[44px]"
          >
            <span>業種・応募方法の比較を見る →</span>
          </a>
        </section>

        {/* Bottom Consultation CTA */}
        <section className="bg-[#FFF0F4] border border-[#F3D4DF] rounded-2xl sm:rounded-3xl p-7 sm:p-11 text-center space-y-4">
          <h2 className="font-display text-xl sm:text-2xl font-bold text-[#383038] leading-snug text-balance max-w-xl sm:max-w-2xl mx-auto">
            {COMPARE_LINE_CTA.heading}
          </h2>
          <p className="text-sm sm:text-[15px] text-[#777078] max-w-xl mx-auto leading-relaxed">
            {COMPARE_LINE_CTA.description}
          </p>
          <div className="pt-2">
            <a
              href={LINE_OFFICIAL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 bg-[#06C755] hover:bg-[#05b34c] text-white font-bold text-sm sm:text-base px-8 py-4 rounded-xl shadow-xs hover:shadow-md transition-all min-h-[48px]"
            >
              <LucideIcon name="MessageCircle" size={20} />
              <span>{COMPARE_LINE_CTA.buttonLabel}</span>
            </a>
          </div>
          <p className="text-xs text-[#777078]">
            {COMPARE_LINE_CTA.footnote}
          </p>
        </section>
      </div>
    </div>
  );
}
