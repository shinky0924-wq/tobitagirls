/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect } from 'react';
import LucideIcon from './LucideIcon';
import { LINE_OFFICIAL_URL } from '../data';
import {
  SITE_COMPARE_SEO,
  INDUSTRY_COMPARE_COLUMNS,
  INDUSTRY_COMPARE_ROWS,
  INDUSTRY_DETAIL_CARDS,
  APPLICATION_METHOD_COLUMNS,
  APPLICATION_METHOD_ROWS,
  PRE_APPLY_CHECK_POINTS,
  SITE_COMPARE_FAQS,
  SITE_COMPARE_INTERNAL_LINKS,
  type ApplicationMethodBadge,
} from '../compareData';
import { updatePageJsonLd } from '../utils/jsonLd';

interface SiteComparisonPageProps {
  onNavigateHome: () => void;
  onNavigateCompare: () => void;
  onNavigatePath?: (targetPath: string) => void;
  onCtaclick?: () => void;
}

export default function SiteComparisonPage({
  onNavigateHome,
  onNavigateCompare,
  onNavigatePath,
}: SiteComparisonPageProps) {
  useEffect(() => {
    const { title, description, canonicalUrl } = SITE_COMPARE_SEO;

    document.title = title;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', description);
    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) canonical.setAttribute('href', canonicalUrl);

    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', title);
    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute('content', description);
    const ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) ogUrl.setAttribute('content', canonicalUrl);

    updatePageJsonLd({
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'WebPage',
          '@id': `${canonicalUrl}#webpage`,
          url: canonicalUrl,
          name: title,
          description,
          dateModified: '2026-11-16',
          inLanguage: 'ja-JP',
          isPartOf: {
            '@id': 'https://tobitashinchi-recruit.com/#website',
          },
          publisher: {
            '@id': 'https://tobitashinchi-recruit.com/#organization',
          },
          speakable: {
            '@type': 'SpeakableSpecification',
            cssSelector: [
              'h1',
              '#industry-comparison',
              '#industry-details',
              '#application-methods',
              '#pre-apply-checklist',
            ],
          },
        },
        {
          '@type': 'BreadcrumbList',
          '@id': `${canonicalUrl}#breadcrumb`,
          itemListElement: [
            {
              '@type': 'ListItem',
              position: 1,
              name: 'トップページ',
              item: 'https://tobitashinchi-recruit.com/',
            },
            {
              '@type': 'ListItem',
              position: 2,
              name: '業種・応募方法の比較',
              item: canonicalUrl,
            },
          ],
        },
        {
          '@type': 'Dataset',
          '@id': `${canonicalUrl}#dataset`,
          name: '飛田新地と他業種（メンズエステ・ソープ・デリヘル・キャバクラ）・応募方法比較データ',
          description:
            '飛田新地（当店）とメンズエステ・ソープランド・デリヘル・キャバクラ／ラウンジの仕事内容・接客場所・接客時間・報酬体系・勤務形態の比較、ならびに公式求人サイト・SNS・個人スカウト・求人ポータル・仲介ネットワークの応募方法比較データ。',
          url: canonicalUrl,
          dateModified: '2026-11-16',
          inLanguage: 'ja-JP',
          isAccessibleForFree: true,
          keywords: [
            '飛田新地 求人 比較',
            '飛田新地 メンズエステ 違い',
            '飛田新地 仕事内容',
            '飛田新地 応募方法',
            '飛田新地 求人サイト',
          ],
          creator: {
            '@type': 'Organization',
            '@id': 'https://tobitashinchi-recruit.com/#organization',
            name: '飛田ガールズ（料亭直営公式採用窓口）',
            url: 'https://tobitashinchi-recruit.com/',
          },
        },
        {
          '@type': 'FAQPage',
          '@id': `${canonicalUrl}#faq`,
          mainEntity: SITE_COMPARE_FAQS.map((faq) => ({
            '@type': 'Question',
            name: faq.q,
            acceptedAnswer: {
              '@type': 'Answer',
              text: faq.a,
            },
          })),
        },
      ],
    });
  }, []);

  const navigateTo = (targetPath: string) => {
    if (targetPath === '/' || targetPath === '') {
      onNavigateHome();
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    if (targetPath === '/compare') {
      onNavigateCompare();
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    if (onNavigatePath) {
      onNavigatePath(targetPath);
      return;
    }
    if (typeof window !== 'undefined') {
      window.history.pushState({}, '', targetPath);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const renderNeutralStatusLabel = (badge: ApplicationMethodBadge) => {
    const isOfficial = badge === '公式情報を確認できる';
    return (
      <span
        className={`inline-block text-xs font-semibold px-2.5 py-0.5 rounded-md mb-1.5 ${
          isOfficial
            ? 'bg-[#FFF0F4] text-[#B33F69] border border-[#F3D4DF]'
            : 'bg-[#F7F4F6] text-[#5B535D] border border-[#E5DDE1]'
        }`}
      >
        {badge}
      </span>
    );
  };

  return (
    <article className="min-h-screen bg-[#FFF9FB] text-[#383038] pt-24 sm:pt-28 pb-28 sm:pb-24 font-sans">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-14 sm:space-y-16">
        {/* Breadcrumb */}
        <nav
          aria-label="パンくずリスト"
          className="flex flex-wrap items-center gap-2 text-xs sm:text-[13px] text-[#777078]"
        >
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              navigateTo('/');
            }}
            className="hover:text-[#C96D8C] transition-colors underline underline-offset-2 cursor-pointer"
          >
            トップページ
          </a>
          <span aria-hidden="true">＞</span>
          <span className="text-[#383038] font-semibold">業種・応募方法の比較</span>
        </nav>

        {/* First View (Section 3) */}
        <header className="bg-white border border-[#EFE2E7] rounded-2xl sm:rounded-3xl px-6 py-8 sm:px-10 sm:py-12 text-center shadow-xs space-y-6">
          <p className="inline-block bg-[#FFF0F4] border border-[#F3D4DF] text-[#C96D8C] text-xs sm:text-sm font-bold px-4 py-1.5 rounded-full">
            {SITE_COMPARE_SEO.eyebrow}
          </p>

          <h1 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-[#383038] leading-snug tracking-tight text-balance max-w-3xl mx-auto">
            {SITE_COMPARE_SEO.h1}
          </h1>

          <div className="max-w-2xl mx-auto space-y-2.5 text-sm sm:text-base text-[#5E5560] leading-relaxed">
            {SITE_COMPARE_SEO.heroLead.map((line, idx) => (
              <p key={idx}>{line}</p>
            ))}
          </div>

          <ul
            aria-label="このページで比較する主な項目"
            className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 pt-1"
          >
            {SITE_COMPARE_SEO.heroPoints.map((point) => (
              <li
                key={point}
                className="bg-[#FFF9FB] border border-[#EFE2E7] text-[#383038] text-[13px] sm:text-sm font-medium px-4 py-2 rounded-full"
              >
                {point}
              </li>
            ))}
          </ul>

          {/* Clean Section Quick Anchors */}
          <nav
            aria-label="ページ内目次"
            className="pt-4 border-t border-[#EFE2E7] flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs sm:text-sm"
          >
            <a href="#industry-comparison" className="text-[#C96D8C] font-semibold hover:underline">
              5業種の比較表
            </a>
            <a href="#industry-details" className="text-[#C96D8C] font-semibold hover:underline">
              業種別の詳しい違い
            </a>
            <a href="#application-methods" className="text-[#C96D8C] font-semibold hover:underline">
              応募方法・求人サイトの比較
            </a>
            <a href="#pre-apply-checklist" className="text-[#C96D8C] font-semibold hover:underline">
              応募前チェック7項目
            </a>
            <a href="#site-compare-faq" className="text-[#C96D8C] font-semibold hover:underline">
              よくある質問
            </a>
          </nav>
        </header>

        {/* Section 1: 飛田新地と他業種の仕事内容・働き方を比較 */}
        <section id="industry-comparison" className="scroll-mt-24 space-y-6">
          <div className="space-y-3">
            <h2 className="font-display text-xl sm:text-2xl md:text-3xl font-bold text-[#383038]">
              飛田新地と他業種の違いを比較
            </h2>
            <p className="text-sm sm:text-[15px] text-[#383038] font-medium leading-relaxed">
              飛田新地とメンズエステ・ソープランド・デリヘル・キャバクラ・ラウンジの主な違いは、仕事内容・接客場所・1回の接客時間・報酬体系・勤務形態です。
            </p>
            <p className="text-sm sm:text-[15px] text-[#5E5560] leading-relaxed">
              同じ接客を伴う仕事でも、業種によって仕事内容や接客方法、報酬体系、勤務条件は異なります。ここでは、飛田新地（当店）・メンズエステ・ソープランド・デリヘル・キャバクラ／ラウンジの5業種を比較します。
            </p>
          </div>

          {/* Desktop 6-Column Comparison Table */}
          <div className="hidden md:block bg-white border border-[#EFE2E7] rounded-2xl shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse table-fixed min-w-[980px]">
                <colgroup>
                  <col className="w-[13%]" />
                  <col className="w-[21%]" />
                  <col className="w-[16.5%]" />
                  <col className="w-[16.5%]" />
                  <col className="w-[16.5%]" />
                  <col className="w-[16.5%]" />
                </colgroup>
                <thead>
                  <tr className="border-b border-[#EFE2E7]">
                    <th className="p-4 bg-[#FAF6F8] text-sm font-bold text-[#383038] border-r border-[#EFE2E7]">
                      比較項目
                    </th>
                    {INDUSTRY_COMPARE_COLUMNS.map((col) => (
                      <th
                        key={col.key}
                        className={`p-4 text-sm font-bold border-r last:border-r-0 border-[#EFE2E7] align-top ${
                          col.isOurShop
                            ? 'bg-[#C96D8C] text-white'
                            : 'bg-[#FAF6F8] text-[#383038]'
                        }`}
                      >
                        <div>{col.label}</div>
                        {col.subLabel && (
                          <div
                            className={`text-xs font-normal mt-0.5 ${
                              col.isOurShop ? 'text-white/90' : 'text-[#777078]'
                            }`}
                          >
                            {col.subLabel}
                          </div>
                        )}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#EFE2E7] text-[14px] leading-relaxed">
                  {INDUSTRY_COMPARE_ROWS.map((row) => (
                    <tr key={row.criteria} className="align-top">
                      <th
                        scope="row"
                        className="p-4 font-bold text-[#383038] bg-[#FAF6F8]/60 border-r border-[#EFE2E7]"
                      >
                        {row.criteria}
                      </th>
                      <td className="p-4 bg-[#FFF9FB] text-[#383038] font-medium border-r border-[#EFE2E7]">
                        {row.tobita}
                      </td>
                      <td className="p-4 text-[#4C444E] border-r border-[#EFE2E7]">
                        {row.mensEsthe}
                      </td>
                      <td className="p-4 text-[#4C444E] border-r border-[#EFE2E7]">
                        {row.soap}
                      </td>
                      <td className="p-4 text-[#4C444E] border-r border-[#EFE2E7]">
                        {row.delihel}
                      </td>
                      <td className="p-4 text-[#4C444E]">{row.cabaret}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Mobile Vertical Cards per Industry (Zero cramped scrolling) */}
          <div className="md:hidden space-y-5">
            {INDUSTRY_COMPARE_COLUMNS.map((col) => (
              <div
                key={col.key}
                className={`rounded-2xl border p-5 space-y-4 shadow-xs ${
                  col.isOurShop
                    ? 'bg-white border-[#C96D8C]/50'
                    : 'bg-white border-[#EFE2E7]'
                }`}
              >
                <div className="border-b border-[#EFE2E7] pb-3 flex items-baseline justify-between gap-2">
                  <h3 className="font-display text-lg font-bold text-[#383038]">{col.label}</h3>
                  {col.subLabel && (
                    <span
                      className={`text-xs font-semibold ${
                        col.isOurShop ? 'text-[#C96D8C]' : 'text-[#777078]'
                      }`}
                    >
                      {col.subLabel}
                    </span>
                  )}
                </div>
                <dl className="space-y-3 text-sm leading-relaxed">
                  {INDUSTRY_COMPARE_ROWS.map((row) => (
                    <div key={row.criteria} className="space-y-1">
                      <dt className="text-xs font-bold text-[#C96D8C]">{row.criteria}</dt>
                      <dd className="text-[#383038]">{row[col.key]}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            ))}
          </div>

          <div className="bg-white border border-[#EFE2E7] rounded-xl p-4 sm:p-5 text-xs sm:text-sm text-[#5E5560] leading-relaxed space-y-2">
            <p>
              ※「飛田新地（当店）」の列は当店独自の求人条件を記載しています。飛田新地内の他店舗や、メンズエステ・ソープランド・デリヘル・キャバクラ／ラウンジは店舗によって施術・接客範囲や報酬規定、勤務条件が異なるため、上記の他業種説明は一般的な確認の目安としてご覧ください。
            </p>
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 pt-1">
              <a
                href="/job"
                onClick={(e) => {
                  e.preventDefault();
                  navigateTo('/job');
                }}
                className="text-[#C96D8C] font-semibold hover:underline cursor-pointer"
              >
                当店の仕事内容・1日の流れを見る →
              </a>
              <a
                href="/salary"
                onClick={(e) => {
                  e.preventDefault();
                  navigateTo('/salary');
                }}
                className="text-[#C96D8C] font-semibold hover:underline cursor-pointer"
              >
                当店の給料システム・日払い計算を見る →
              </a>
            </div>
          </div>
        </section>

        {/* Section 2: 業種ごとの詳しい違い */}
        <section id="industry-details" className="scroll-mt-24 space-y-6">
          <div className="space-y-2">
            <h2 className="font-display text-xl sm:text-2xl font-bold text-[#383038]">
              業種ごとの仕事内容・働き方の違い
            </h2>
            <p className="text-sm sm:text-[15px] text-[#5E5560] leading-relaxed">
              それぞれの業種で確認しておきたい一般的な仕事内容と勤務の考え方をまとめました。応募時は各店舗の実際の募集要項と照らし合わせて確認しましょう。
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {INDUSTRY_DETAIL_CARDS.map((card, idx) => (
              <div
                key={card.key}
                className={`bg-white border rounded-2xl p-6 shadow-xs flex flex-col justify-between gap-4 ${
                  idx === 0
                    ? 'md:col-span-2 border-[#C96D8C]/40'
                    : 'border-[#EFE2E7]'
                }`}
              >
                <div className="space-y-2.5">
                  <h3 className="font-display text-lg font-bold text-[#383038]">
                    {card.heading}
                  </h3>
                  <p className="text-sm sm:text-[15px] text-[#5E5560] leading-relaxed">
                    {card.summary}
                  </p>
                </div>

                {card.ctaLabel && card.ctaPath && (
                  <div>
                    <a
                      href={card.ctaPath}
                      onClick={(e) => {
                        e.preventDefault();
                        navigateTo(card.ctaPath!);
                      }}
                      className="inline-flex items-center justify-center gap-2 bg-[#C96D8C] hover:bg-[#B35877] text-white font-bold text-sm px-6 py-3 rounded-xl transition-colors min-h-[44px] cursor-pointer"
                    >
                      <span>{card.ctaLabel}</span>
                      <LucideIcon name="ArrowRight" size={16} />
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>

          <p className="text-xs sm:text-sm text-[#777078] leading-relaxed">
            ※各業種の説明は一般的な特徴として記載しており、特定の店舗や業界全体を断定するものではありません。
          </p>
        </section>

        {/* Section 3: 求人サイト・応募方法を比較 */}
        <section id="application-methods" className="scroll-mt-24 space-y-6">
          <div className="space-y-3">
            <h2 className="font-display text-xl sm:text-2xl md:text-3xl font-bold text-[#383038]">
              飛田新地の求人はどこから応募する？応募方法・求人サイトを比較
            </h2>
            <p className="text-sm sm:text-[15px] text-[#383038] font-medium leading-relaxed">
              公式求人サイト・SNSや個人スカウト・他社求人ポータル・紹介仲介型ネットワークの違いは、募集元の確認方法、応募窓口、報酬条件や仲介手数料の照合方法、個人情報の取り扱い方にあります。
            </p>
            <div className="text-sm sm:text-[15px] text-[#5E5560] leading-relaxed space-y-2">
              <p>
                求人情報を見つける方法はいくつかあります。公式求人サイト、SNS、個人スカウト、求人ポータルなど、それぞれ情報の確認方法や連絡先、応募後の流れが異なります。
              </p>
              <p>
                応募する前に、誰が募集しているのか、どこに連絡するのか、報酬や条件が明確に説明されているかを確認しましょう。
              </p>
            </div>
          </div>

          {/* Desktop 5-Column Comparison Table */}
          <div className="hidden md:block bg-white border border-[#EFE2E7] rounded-2xl shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse table-fixed min-w-[960px]">
                <colgroup>
                  <col className="w-[14%]" />
                  <col className="w-[23%]" />
                  <col className="w-[21%]" />
                  <col className="w-[21%]" />
                  <col className="w-[21%]" />
                </colgroup>
                <thead>
                  <tr className="border-b border-[#EFE2E7]">
                    <th className="p-4 bg-[#FAF6F8] text-sm font-bold text-[#383038] border-r border-[#EFE2E7]">
                      比較項目
                    </th>
                    {APPLICATION_METHOD_COLUMNS.map((col) => (
                      <th
                        key={col.key}
                        className={`p-4 text-sm font-bold border-r last:border-r-0 border-[#EFE2E7] ${
                          col.isOurShop
                            ? 'bg-[#C96D8C] text-white'
                            : 'bg-[#FAF6F8] text-[#383038]'
                        }`}
                      >
                        {col.label}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#EFE2E7] text-[14px] leading-relaxed">
                  {APPLICATION_METHOD_ROWS.map((row) => (
                    <tr key={row.criteria} className="align-top">
                      <th
                        scope="row"
                        className="p-4 font-bold text-[#383038] bg-[#FAF6F8]/60 border-r border-[#EFE2E7]"
                      >
                        {row.criteria}
                      </th>
                      {APPLICATION_METHOD_COLUMNS.map((col) => {
                        const cell = row[col.key];
                        return (
                          <td
                            key={col.key}
                            className={`p-4 border-r last:border-r-0 border-[#EFE2E7] ${
                              col.isOurShop ? 'bg-[#FFF9FB] text-[#383038]' : 'text-[#4C444E]'
                            }`}
                          >
                            {renderNeutralStatusLabel(cell.badge)}
                            <p>{cell.text}</p>
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Mobile Vertical Cards Grouped by Criterion (Section 10 ③) */}
          <div className="md:hidden space-y-5">
            {APPLICATION_METHOD_ROWS.map((row) => (
              <div
                key={row.criteria}
                className="bg-white border border-[#EFE2E7] rounded-2xl p-5 shadow-xs space-y-4"
              >
                <h3 className="font-display text-base font-bold text-[#383038] border-b border-[#EFE2E7] pb-2.5">
                  {row.criteria}
                </h3>
                <dl className="space-y-3.5 text-sm leading-relaxed">
                  {APPLICATION_METHOD_COLUMNS.map((col) => {
                    const cell = row[col.key];
                    return (
                      <div
                        key={col.key}
                        className={`rounded-xl p-3.5 border ${
                          col.isOurShop
                            ? 'bg-[#FFF9FB] border-[#F3D4DF]'
                            : 'bg-[#FAF8F9] border-[#EFE2E7]'
                        }`}
                      >
                        <dt className="font-bold text-[#383038] mb-1">{col.label}</dt>
                        <dd className="text-[#4C444E]">
                          <div>{renderNeutralStatusLabel(cell.badge)}</div>
                          <p>{cell.text}</p>
                        </dd>
                      </div>
                    );
                  })}
                </dl>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs sm:text-sm pt-1">
            <a
              href="/flow"
              onClick={(e) => {
                e.preventDefault();
                navigateTo('/flow');
              }}
              className="text-[#C96D8C] font-semibold hover:underline cursor-pointer"
            >
              当店の応募・面接の流れを見る →
            </a>
            <a
              href="/about"
              onClick={(e) => {
                e.preventDefault();
                navigateTo('/about');
              }}
              className="text-[#C96D8C] font-semibold hover:underline cursor-pointer"
            >
              当店の運営者情報・プライバシー保護方針を見る →
            </a>
          </div>
        </section>

        {/* Section 4: 応募前に確認しておきたい7つのポイント */}
        <section id="pre-apply-checklist" className="scroll-mt-24 space-y-6">
          <div className="space-y-2">
            <h2 className="font-display text-xl sm:text-2xl font-bold text-[#383038]">
              飛田新地の求人に応募する前に確認したいこと
            </h2>
            <p className="text-sm sm:text-[15px] text-[#5E5560] leading-relaxed">
              どの応募方法や業種を選ぶ場合でも、応募前に以下の7点を確認しておくことで認識のズレを防ぎやすくなります。
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {PRE_APPLY_CHECK_POINTS.map((item) => (
              <div
                key={item.number}
                className="bg-white border border-[#EFE2E7] rounded-2xl p-6 shadow-xs space-y-3"
              >
                <div className="flex items-center gap-3">
                  <span className="w-10 h-10 rounded-xl bg-[#FFF0F4] border border-[#F3D4DF] text-[#C96D8C] flex items-center justify-center shrink-0">
                    <LucideIcon name={item.iconName} size={18} />
                  </span>
                  <div>
                    <p className="text-xs font-bold text-[#C96D8C] tabular-nums">{item.number}</p>
                    <h3 className="font-display text-base font-bold text-[#383038]">
                      {item.title}
                    </h3>
                  </div>
                </div>
                <p className="text-sm text-[#5E5560] leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Section 5: よくある質問 */}
        <section id="site-compare-faq" className="scroll-mt-24 space-y-6">
          <div className="space-y-2">
            <h2 className="font-display text-xl sm:text-2xl font-bold text-[#383038]">
              よくある質問
            </h2>
            <p className="text-sm sm:text-[15px] text-[#5E5560] leading-relaxed">
              他業種との違いや応募方法について、問い合わせ前に多く寄せられるご質問をまとめました。
            </p>
          </div>

          <div className="space-y-4">
            {SITE_COMPARE_FAQS.map((faq, idx) => (
              <div
                key={idx}
                className="bg-white border border-[#EFE2E7] rounded-2xl p-5 sm:p-6 shadow-xs space-y-2.5"
              >
                <h3 className="text-sm sm:text-base font-bold text-[#383038] leading-snug">
                  Q. {faq.q}
                </h3>
                <p className="text-sm text-[#5E5560] leading-relaxed">A. {faq.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Related Internal Links (Section 11) */}
        <section id="related-guides" className="scroll-mt-24 space-y-5">
          <h2 className="font-display text-lg sm:text-xl font-bold text-[#383038]">
            あわせて確認できる公式ガイド一覧
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {SITE_COMPARE_INTERNAL_LINKS.map((guide) => (
              <a
                key={guide.path}
                href={guide.path}
                onClick={(e) => {
                  e.preventDefault();
                  navigateTo(guide.path);
                }}
                className="group bg-white hover:bg-[#FFF0F4]/60 border border-[#EFE2E7] hover:border-[#C96D8C]/50 rounded-xl p-4 transition-all flex items-center justify-between gap-3 cursor-pointer"
              >
                <div className="min-w-0">
                  <div className="font-bold text-sm text-[#383038] group-hover:text-[#C96D8C] transition-colors">
                    {guide.label}
                  </div>
                  <div className="text-xs text-[#777078] truncate mt-0.5">{guide.desc}</div>
                </div>
                <span className="text-xs font-semibold text-[#C96D8C] shrink-0">見る →</span>
              </a>
            ))}
          </div>
        </section>

        {/* Final CTA (Section 9) */}
        <section
          id="site-compare-cta"
          className="bg-[#FFF0F4] border border-[#F3D4DF] rounded-2xl sm:rounded-3xl p-7 sm:p-11 text-center space-y-5"
        >
          <h2 className="font-display text-xl sm:text-2xl font-bold text-[#383038]">
            当店で働くことを考えている方へ
          </h2>
          <div className="max-w-xl mx-auto space-y-2 text-sm sm:text-[15px] text-[#5E5560] leading-relaxed">
            <p>仕事内容や給料、勤務条件について、応募前に確認したいことはありませんか？</p>
            <p>当店では、未経験の方も経験のある方も、仕事内容や働き方についてご相談いただけます。</p>
            <p>まずは気になることから、お気軽にお問い合わせください。</p>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2">
            <a
              href="/job"
              onClick={(e) => {
                e.preventDefault();
                navigateTo('/job');
              }}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white hover:bg-[#FFF9FB] text-[#C96D8C] border border-[#C96D8C]/40 font-bold text-sm sm:text-base px-7 py-3.5 rounded-xl transition-colors min-h-[48px] cursor-pointer"
            >
              <span>当店の求人情報を見る</span>
            </a>
            <a
              href={LINE_OFFICIAL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#06C755] hover:bg-[#05b34c] text-white font-bold text-sm sm:text-base px-7 py-3.5 rounded-xl shadow-xs hover:shadow-md transition-all min-h-[48px]"
            >
              <LucideIcon name="MessageCircle" size={20} />
              <span>LINEで求人について相談する</span>
            </a>
          </div>
        </section>
      </div>
    </article>
  );
}
