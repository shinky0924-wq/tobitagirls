/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import LucideIcon from './LucideIcon';
import { TOPIC_CLUSTERS, ALL_CLUSTER_NODES, TopicClusterData } from '../topicClusterData';
import { BLOG_ARTICLES } from '../blogData';
import JobDetails from './JobDetails';
import BenefitsShowcase from './BenefitsShowcase';
import SalaryCalculator from './SalaryCalculator';
import JobContentPage from './JobContentPage';
import SalaryPage from './SalaryPage';
import BeginnerPage from './BeginnerPage';
import ExperiencedPage from './ExperiencedPage';
import FlowPage from './FlowPage';
import { getStoredSiteContent } from '../siteContent';
import { LINE_OFFICIAL_URL } from '../data';
import { updatePageJsonLd } from '../utils/jsonLd';

interface TopicClusterPageProps {
  topicId: string;
  onNavigateHome: () => void;
  onNavigateTopic: (topicId: string) => void;
  onNavigateBlog: (slug?: string) => void;
  onNavigateFaq: () => void;
  onCtaclick: () => void;
  onInjectedScroll?: (msg: string) => void;
}

export default function TopicClusterPage({
  topicId,
  onNavigateHome,
  onNavigateTopic,
  onNavigateBlog,
  onNavigateFaq,
  onCtaclick,
  onInjectedScroll,
}: TopicClusterPageProps) {
  // If topic is 'job', render the dedicated comprehensive JobContentPage
  if (topicId === 'job') {
    return (
      <JobContentPage
        onNavigateHome={onNavigateHome}
        onNavigateTopic={onNavigateTopic}
        onNavigateBlog={onNavigateBlog}
        onNavigateFaq={onNavigateFaq}
        onCtaclick={onCtaclick}
        onInjectedScroll={onInjectedScroll}
      />
    );
  }

  // If topic is 'salary' (or /salary, /benefits, /treatment), render the dedicated comprehensive SalaryPage
  if (topicId === 'salary') {
    return (
      <SalaryPage
        onNavigateHome={onNavigateHome}
        onNavigateTopic={onNavigateTopic}
        onNavigateBlog={onNavigateBlog}
        onNavigateFaq={onNavigateFaq}
        onCtaclick={onCtaclick}
        onInjectedScroll={onInjectedScroll}
      />
    );
  }

  // If topic is 'beginner' (or /beginner), render the dedicated comprehensive BeginnerPage
  if (topicId === 'beginner') {
    return (
      <BeginnerPage
        onNavigateHome={onNavigateHome}
        onNavigateTopic={onNavigateTopic}
        onNavigateBlog={onNavigateBlog}
        onNavigateFaq={onNavigateFaq}
        onCtaclick={onCtaclick}
        onInjectedScroll={onInjectedScroll}
      />
    );
  }

  // If topic is 'experienced' (or /experienced), render the dedicated comprehensive ExperiencedPage
  if (topicId === 'experienced') {
    return (
      <ExperiencedPage
        onNavigateHome={onNavigateHome}
        onNavigateTopic={onNavigateTopic}
        onNavigateBlog={onNavigateBlog}
        onNavigateFaq={onNavigateFaq}
        onCtaclick={onCtaclick}
        onInjectedScroll={onInjectedScroll}
      />
    );
  }

  // If topic is 'flow' (or /flow, /interview), render the dedicated comprehensive FlowPage
  if (topicId === 'flow') {
    return (
      <FlowPage
        onNavigateHome={onNavigateHome}
        onNavigateTopic={onNavigateTopic}
        onNavigateBlog={onNavigateBlog}
        onNavigateFaq={onNavigateFaq}
        onCtaclick={onCtaclick}
        onInjectedScroll={onInjectedScroll}
      />
    );
  }

  const data: TopicClusterData = TOPIC_CLUSTERS[topicId] || TOPIC_CLUSTERS.job;
  const siteContent = getStoredSiteContent();
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [topicId]);

  // Update #seo-jsonld Structured Data (BreadcrumbList + FAQPage) without duplicating SSR script
  useEffect(() => {
    const schemaData = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'BreadcrumbList',
          '@id': `https://tobitashinchi-recruit.com${data.path}#breadcrumb`,
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
              'name': data.title,
              'item': `https://tobitashinchi-recruit.com${data.path}`
            }
          ]
        },
        {
          '@type': 'FAQPage',
          '@id': `https://tobitashinchi-recruit.com${data.path}#faq`,
          'mainEntity': (data.faqs || []).map((item) => ({
            '@type': 'Question',
            'name': item.q,
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': item.a
            }
          }))
        }
      ]
    };

    updatePageJsonLd(schemaData);
  }, [data]);

  // Find featured articles from blogData
  const featuredArticles = data.featuredArticleSlugs
    .map((slug) => BLOG_ARTICLES.find((a) => a.slug === slug))
    .filter(Boolean);

  const handleLineConsultation = () => {
    const defaultMsg = `【${data.title}について相談】飛田新地求人の${data.title}（${data.badge}）について詳しく聞きたいです。`;
    if (onInjectedScroll) {
      onInjectedScroll(defaultMsg);
    } else {
      onCtaclick();
    }
  };

  const scrollToAnchor = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -70;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-[#FFF9FB] min-h-screen text-[#35313A] pb-20 pt-4 sm:pt-6 font-sans antialiased">
      
      {/* 1. パンくずナビゲーション */}
      <div className="max-w-[1140px] mx-auto px-4 sm:px-6 mb-4">
        <nav aria-label="Breadcrumb" className="flex items-center text-xs">
          <ol className="flex items-center gap-1.5 flex-wrap text-[#85818A]">
            <li className="flex items-center gap-1">
              <a
                href="/"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigateHome();
                }}
                className="hover:text-[#D94B7A] font-bold flex items-center gap-1 text-[#35313A] hover:underline cursor-pointer"
                id="breadcrumb-hub-home"
              >
                <LucideIcon name="Home" size={13} className="text-[#D94B7A]" />
                <span>飛田新地求人（トップ）</span>
              </a>
            </li>
            <li className="text-[#85818A]">/</li>
            <li>
              <span className="text-[#85818A]">総合ガイド</span>
            </li>
            <li className="text-[#85818A]">/</li>
            <li className="flex items-center gap-1 text-[#D94B7A] font-bold" aria-current="page">
              <span>{data.emoji}</span>
              <span>{data.title}</span>
            </li>
          </ol>
        </nav>
      </div>

      {/* 2. ページ内目次アンカーバー（スマホ対応横スクロール） */}
      <div className="max-w-[1140px] mx-auto px-4 sm:px-6 mb-6">
        <div className="flex items-center gap-2 overflow-x-auto py-1 scrollbar-none text-xs text-[#85818A]">
          <span className="font-bold text-[#35313A] whitespace-nowrap text-[11px] flex items-center gap-1">
            <LucideIcon name="Compass" size={13} className="text-[#D94B7A]" />
            目次:
          </span>
          <a
            href="#points-section"
            onClick={(e) => {
              e.preventDefault();
              scrollToAnchor('points-section');
            }}
            className="px-3 py-1.5 rounded-full bg-white hover:bg-[#FCE8EF] hover:text-[#D94B7A] border border-[#F0E5EA] whitespace-nowrap font-medium transition-colors cursor-pointer"
          >
            重要ポイント
          </a>
          <a
            href="#details-section"
            onClick={(e) => {
              e.preventDefault();
              scrollToAnchor('details-section');
            }}
            className="px-3 py-1.5 rounded-full bg-white hover:bg-[#FCE8EF] hover:text-[#D94B7A] border border-[#F0E5EA] whitespace-nowrap font-medium transition-colors cursor-pointer"
          >
            詳細解説
          </a>
          <a
            href="#faq-section"
            onClick={(e) => {
              e.preventDefault();
              scrollToAnchor('faq-section');
            }}
            className="px-3 py-1.5 rounded-full bg-white hover:bg-[#FCE8EF] hover:text-[#D94B7A] border border-[#F0E5EA] whitespace-nowrap font-medium transition-colors cursor-pointer"
          >
            よくある質問
          </a>
          <a
            href="#consultation-section"
            onClick={(e) => {
              e.preventDefault();
              scrollToAnchor('consultation-section');
            }}
            className="px-3 py-1.5 rounded-full bg-[#06C755]/10 text-[#059669] hover:bg-[#06C755] hover:text-white border border-[#06C755]/30 whitespace-nowrap font-bold transition-colors cursor-pointer"
          >
            LINE相談
          </a>
        </div>
      </div>

      <div className="max-w-[1140px] mx-auto px-4 sm:px-6 space-y-10 sm:space-y-12">
        
        {/* =========================================================
            3. ファーストビュー：Hero Header
           ========================================================= */}
        <section className="bg-white rounded-3xl p-6 sm:p-9 md:p-12 border border-[#F0E5EA] shadow-2xs relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-[#FCE8EF]/50 via-rose-50/20 to-transparent rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10">
            {/* Top Badges */}
            <div className="flex items-center gap-2 mb-4 flex-wrap">
              <span className="inline-flex items-center gap-1.5 bg-[#FCE8EF] text-[#D94B7A] text-[11px] font-bold px-3.5 py-1 rounded-full border border-[#F0E5EA]">
                <LucideIcon name="ShieldCheck" size={13} />
                <span>料理組合正規加盟 直営公式情報</span>
              </span>
              <span className="text-[11px] font-bold px-3.5 py-1 rounded-full border border-[#F0E5EA] bg-[#FFF9FB] text-[#35313A]">
                {data.emoji} {data.badge}
              </span>
              <span className="inline-flex items-center gap-1 bg-[#FFF9FB] text-[#85818A] text-[11px] font-medium px-3 py-1 rounded-full border border-[#F0E5EA]">
                <span>2026年最新ガイド</span>
              </span>
            </div>

            {/* Main 2-Column: Title & Overview (Left) + Clean Photo (Right) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-8">
              <div className="order-2 lg:order-1 lg:col-span-7 space-y-4">
                <h1 className="text-[27px] sm:text-[30px] md:text-[34px] font-black text-[#35313A] leading-[1.3] tracking-tight">
                  {data.title}
                  <span className="block text-base sm:text-lg font-bold text-[#D94B7A] mt-1.5">
                    {data.tagline}
                  </span>
                </h1>

                <p className="text-[15px] sm:text-[16px] text-[#35313A] leading-relaxed font-normal">
                  {data.overview}
                </p>

                {/* Quick Trust Checklist Pills */}
                <div className="flex flex-wrap gap-2 pt-2 text-xs">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#FFF9FB] text-[#35313A] font-bold border border-[#F0E5EA]">
                    <LucideIcon name="Check" size={13} className="text-[#D94B7A]" />
                    <span>即日全額日払い手渡し</span>
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#FFF9FB] text-[#35313A] font-bold border border-[#F0E5EA]">
                    <LucideIcon name="Check" size={13} className="text-[#D94B7A]" />
                    <span>ネット写真掲載100%なし</span>
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#FFF9FB] text-[#35313A] font-bold border border-[#F0E5EA]">
                    <LucideIcon name="Check" size={13} className="text-[#D94B7A]" />
                    <span>女性スタッフ親身サポート</span>
                  </span>
                </div>
              </div>

              {/* Clean Photo Card */}
              <div className="order-1 lg:order-2 lg:col-span-5">
                <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-xs border border-[#F0E5EA] bg-[#FFF9FB]">
                  <div className="aspect-[4/3] w-full overflow-hidden">
                    <img
                      src={data.heroImage}
                      alt={`${data.title} - 飛田新地求人公式ガイド`}
                      className="w-full h-full object-cover"
                      loading="eager"
                      onError={(e) => {
                        const target = e.currentTarget;
                        target.src = '/images/tobita_dream_hero_banner_1782557055526.jpg';
                      }}
                    />
                  </div>
                  <div className="p-3 bg-white border-t border-[#F0E5EA] text-[11px] text-[#85818A] flex items-center justify-between">
                    <span className="flex items-center gap-1">
                      <LucideIcon name="ShieldCheck" size={13} className="text-[#D94B7A]" />
                      <span>飛田新地 老舗料亭直営公式</span>
                    </span>
                    <span className="font-bold text-[#D94B7A]">{data.badge}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Direct Answer Summary Box (30秒要約) */}
            <div className="bg-[#FFF8F9] rounded-2xl p-5 border border-[#F0E5EA] mb-6">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2 text-[#D94B7A] font-bold text-xs sm:text-sm">
                  <LucideIcon name="Sparkles" size={15} />
                  <span>【30秒でわかる要点】{data.title}のポイント</span>
                </div>
                <span className="text-[10px] font-bold bg-white text-[#D94B7A] border border-[#F0E5EA] px-2.5 py-0.5 rounded-full shadow-2xs">
                  結論まとめ
                </span>
              </div>
              <p className="text-xs sm:text-sm text-[#35313A] leading-relaxed font-medium">
                {data.llmDirectAnswer}
              </p>
            </div>

            {/* Core Numerical Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 md:gap-4">
              {data.stats.map((st, i) => (
                <div key={i} className="p-3.5 bg-[#FFF9FB] rounded-2xl border border-[#F0E5EA]">
                  <span className="text-[10px] text-[#85818A] font-bold block mb-0.5">{st.label}</span>
                  <p className="font-black text-[#D94B7A] text-sm sm:text-base leading-snug">
                    {st.value}
                  </p>
                  <p className="text-[10px] text-[#85818A] mt-0.5 leading-tight">{st.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================
            4. 絶対に押さえておくべきポイント
           ========================================================= */}
        <section id="points-section" className="bg-white rounded-3xl p-6 sm:p-9 border border-[#F0E5EA] shadow-2xs scroll-mt-20">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[11px] font-bold text-[#D94B7A] bg-[#FCE8EF] border border-[#F0E5EA] px-3.5 py-1 rounded-full">
              CHECK POINTS
            </span>
          </div>
          <h2 className="text-[21px] sm:text-[24px] font-black text-[#35313A] mb-5 flex items-center gap-2">
            <LucideIcon name="CheckCircle2" size={20} className="text-[#D94B7A]" />
            <span>{data.title}で絶対に押さえておくべきポイント</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {data.keyPoints.map((pt, i) => (
              <div key={i} className="flex items-start gap-3 p-4 rounded-2xl bg-[#FFF9FB] border border-[#F0E5EA]">
                <span className="w-6 h-6 rounded-full bg-[#D94B7A] text-white text-xs font-black flex items-center justify-center shrink-0 mt-0.5">
                  {i + 1}
                </span>
                <span className="text-xs sm:text-sm text-[#35313A] leading-relaxed font-medium">
                  {pt}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* =========================================================
            5. 詳細解説セクション
           ========================================================= */}
        <section id="details-section" className="space-y-6 scroll-mt-20">
          {data.sections.map((sec, i) => (
            <div key={i} className="bg-white rounded-3xl p-6 sm:p-9 border border-[#F0E5EA] shadow-2xs space-y-4">
              <h2 className="text-[20px] sm:text-[22px] font-black text-[#35313A] flex items-center gap-2.5">
                <span className="w-2.5 h-6 bg-[#D94B7A] rounded-full inline-block" />
                <span>{sec.title}</span>
              </h2>
              
              <p className="text-xs sm:text-sm text-[#66545A] leading-relaxed">
                {sec.description}
              </p>

              {/* Optional Callout Box */}
              {sec.callout && (
                <div className="p-4 rounded-2xl bg-[#FFF8F9] border-l-4 border-[#D94B7A] text-xs text-[#35313A] space-y-1">
                  <span className="font-bold block text-sm text-[#D94B7A]">
                    {sec.callout.title}
                  </span>
                  <p className="leading-relaxed text-[#66545A]">{sec.callout.text}</p>
                </div>
              )}

              {/* Optional Checklist Points */}
              {sec.points && (
                <ul className="space-y-2.5 text-xs sm:text-sm text-[#35313A]">
                  {sec.points.map((p, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-[#FFF9FB] border border-[#F0E5EA]">
                      <LucideIcon name="ChevronRight" size={16} className="text-[#D94B7A] shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{p}</span>
                    </li>
                  ))}
                </ul>
              )}

              {/* Optional Detailed Table */}
              {sec.table && (
                <div className="overflow-x-auto rounded-2xl border border-[#F0E5EA] mt-4">
                  <table className="w-full text-xs text-left">
                    <thead className="bg-[#FCE8EF] text-[#35313A] font-bold border-b border-[#F0E5EA]">
                      <tr>
                        {sec.table.headers.map((th, idx) => (
                          <th key={idx} className="p-3 whitespace-nowrap">{th}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#F0E5EA] bg-white">
                      {sec.table.rows.map((row, rIdx) => (
                        <tr key={rIdx} className="hover:bg-[#FFF9FB]">
                          {row.map((cell, cIdx) => (
                            <td 
                              key={cIdx} 
                              className={`p-3 leading-relaxed ${cIdx === 0 ? 'font-bold text-[#35313A]' : 'text-[#66545A]'}`}
                            >
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          ))}
        </section>

        {/* 6. Special Embedded Functional Components */}
        {topicId === 'salary' && (
          <div className="space-y-8 mb-8">
            <SalaryCalculator onCtaclick={onCtaclick} />
            <BenefitsShowcase 
              onCtaclickWithData={onInjectedScroll} 
              onCtaclick={onCtaclick} 
            />
          </div>
        )}

        {topicId === 'requirements' && (
          <div className="mb-8">
            <JobDetails 
              content={siteContent.jobs} 
              onCtaclickWithData={(msg) => onInjectedScroll ? onInjectedScroll(msg) : onCtaclick()} 
            />
          </div>
        )}

        {/* =========================================================
            7. 代表的な解説コラム（お仕事コラムへの内部リンク）
           ========================================================= */}
        {featuredArticles.length > 0 && (
          <section className="bg-white rounded-3xl p-6 sm:p-9 border border-[#F0E5EA] shadow-2xs">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-[18px] sm:text-[20px] font-black text-[#35313A] flex items-center gap-2">
                <LucideIcon name="BookOpen" size={18} className="text-[#D94B7A]" />
                <span>「{data.title}」に関する解説コラム</span>
              </h2>
              <a
                href="/blog"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigateBlog();
                }}
                className="text-xs font-bold text-[#D94B7A] hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>コラム全件を見る</span>
                <LucideIcon name="ChevronRight" size={14} />
              </a>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {featuredArticles.map((art: any) => (
                <a
                  key={art.slug}
                  href={`/blog/${art.slug}`}
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigateBlog(art.slug);
                  }}
                  className="p-4 rounded-2xl border border-[#F0E5EA] hover:border-[#D94B7A]/40 bg-[#FFF9FB] hover:bg-white transition-all cursor-pointer flex flex-col justify-between group shadow-2xs hover:shadow-xs"
                >
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-[#FCE8EF] text-[#D94B7A]">
                        {art.categoryLabel || art.category || data.title}
                      </span>
                      <span className="text-[10px] text-[#85818A] font-mono">
                        {art.readTime || '4分'}
                      </span>
                    </div>
                    <h3 className="font-bold text-xs sm:text-sm text-[#35313A] group-hover:text-[#D94B7A] leading-snug line-clamp-2 transition-colors mb-2">
                      {art.title}
                    </h3>
                    <p className="text-[11px] text-[#85818A] line-clamp-2 leading-relaxed">
                      {art.excerpt || art.summary}
                    </p>
                  </div>
                  <div className="mt-3 pt-2.5 border-t border-[#F0E5EA] flex items-center justify-between text-[11px] font-bold text-[#D94B7A]">
                    <span>記事を読む</span>
                    <LucideIcon name="ChevronRight" size={13} />
                  </div>
                </a>
              ))}
            </div>
          </section>
        )}

        {/* =========================================================
            8. トピック別よくある質問（アコーディオン）
           ========================================================= */}
        <section id="faq-section" className="bg-white rounded-3xl p-6 sm:p-9 border border-[#F0E5EA] shadow-2xs scroll-mt-20">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-[18px] sm:text-[20px] font-black text-[#35313A] flex items-center gap-2">
              <LucideIcon name="HelpCircle" size={18} className="text-[#D94B7A]" />
              <span>「{data.title}」についてよくある質問</span>
            </h2>
            <a
              href="/faq"
              onClick={(e) => {
                e.preventDefault();
                onNavigateFaq();
              }}
              className="text-xs font-bold text-[#D94B7A] hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>よくある質問（全119問）を見る</span>
              <LucideIcon name="ChevronRight" size={14} />
            </a>
          </div>

          <div className="space-y-3">
            {data.faqs.map((f, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div 
                  key={idx} 
                  className="rounded-2xl border border-[#F0E5EA] overflow-hidden bg-[#FFF9FB]/50 transition-colors"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full text-left p-4 sm:p-4.5 flex items-center justify-between gap-3 cursor-pointer hover:bg-[#FFF9FB] transition-colors"
                  >
                    <span className="font-bold text-xs sm:text-sm text-[#35313A] flex items-center gap-2.5">
                      <span className="w-5 h-5 rounded-full bg-[#D94B7A] text-white text-[10px] font-black flex items-center justify-center shrink-0">
                        Q
                      </span>
                      <span>{f.q}</span>
                    </span>
                    <LucideIcon 
                      name={isOpen ? "ChevronUp" : "ChevronDown"} 
                      size={16} 
                      className="text-[#D94B7A] shrink-0" 
                    />
                  </button>
                  {isOpen && (
                    <div className="px-4 pb-4 pt-1 sm:px-4.5 sm:pb-4.5 text-xs sm:text-sm text-[#66545A] leading-relaxed border-t border-[#F0E5EA] bg-white flex items-start gap-2.5">
                      <span className="w-5 h-5 rounded-full bg-zinc-100 text-[#35313A] text-[10px] font-black flex items-center justify-center shrink-0 mt-0.5">
                        A
                      </span>
                      <span className="flex-1">{f.a}</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="mt-6 text-center pt-2">
            <a
              href="/faq"
              onClick={(e) => {
                e.preventDefault();
                onNavigateFaq();
              }}
              className="text-xs font-bold text-[#D94B7A] hover:underline inline-flex items-center gap-1 cursor-pointer"
            >
              <span>もっと疑問を解消したい方はこちら（FAQ全119問一覧へ）</span>
              <LucideIcon name="ChevronRight" size={14} />
            </a>
          </div>
        </section>

        {/* =========================================================
            9. 公式LINE無料相談セクション
           ========================================================= */}
        <section id="consultation-section" className="bg-gradient-to-b from-[#FFF9FB] to-white rounded-3xl p-6 sm:p-10 border-2 border-[#F0E5EA] text-center space-y-5 scroll-mt-20">
          <div className="w-12 h-12 rounded-2xl bg-[#06C755]/15 text-[#06C755] flex items-center justify-center mx-auto">
            <LucideIcon name="MessageCircle" size={24} />
          </div>

          <div className="space-y-2 max-w-xl mx-auto">
            <span className="text-xs font-black text-[#D94B7A] bg-[#FCE8EF] border border-[#F0E5EA] px-3.5 py-1 rounded-full inline-block">
              まずは気軽に質問・相談
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-[#35313A]">
              「{data.title}」について、どんな些細な疑問もLINEで相談できます
            </h3>
            <p className="text-xs sm:text-sm text-[#85818A] leading-relaxed">
              「自分に合う働き方は？」「身バレ対策を直接確認したい」「面接前に少し質問したい」など、女性スタッフが親身に対応いたします。
            </p>
          </div>

          <div className="pt-2">
            <a
              href={LINE_OFFICIAL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 bg-[#06C755] hover:bg-[#05b34c] text-white font-extrabold text-sm sm:text-base px-8 py-4 rounded-2xl shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5 cursor-pointer w-full sm:w-auto min-h-[48px]"
            >
              <LucideIcon name="MessageCircle" size={22} className="text-white" />
              <span>LINEで質問・相談する</span>
              <LucideIcon name="ArrowRight" size={18} />
            </a>
          </div>

          <div className="pt-2 text-[11px] sm:text-xs text-[#85818A] space-y-1">
            <p>24時間受付中 / 相談無料 / 無理な勧誘・引き止めは一切ありません</p>
            <p>※匿名でのご相談OK・友達追加後すぐにメッセージいただけます</p>
          </div>

          {/* 4つの安心・信頼バッジ */}
          <div className="mt-6 pt-6 border-t border-[#F0E5EA] grid grid-cols-2 md:grid-cols-4 gap-3 text-center">
            <div className="bg-white rounded-2xl p-3 border border-[#F0E5EA] shadow-2xs">
              <div className="font-bold text-xs text-[#35313A]">満20歳以上・法令遵守</div>
              <div className="text-[10px] text-[#85818A] mt-0.5">20歳未満就労禁止・年齢確認徹底</div>
            </div>
            <div className="bg-white rounded-2xl p-3 border border-[#F0E5EA] shadow-2xs">
              <div className="font-bold text-xs text-[#35313A]">完全個室・安全管理</div>
              <div className="text-[10px] text-[#85818A] mt-0.5">女性専用控室・冷暖房完備</div>
            </div>
            <div className="bg-white rounded-2xl p-3 border border-[#F0E5EA] shadow-2xs">
              <div className="font-bold text-xs text-[#35313A]">身バレ防止・税務サポート</div>
              <div className="text-[10px] text-[#85818A] mt-0.5">WEB写真非公開・住民税普通徴収</div>
            </div>
            <div className="bg-white rounded-2xl p-3 border border-[#F0E5EA] shadow-2xs">
              <div className="font-bold text-xs text-[#35313A]">即日全額現金手渡し</div>
              <div className="text-[10px] text-[#85818A] mt-0.5">天引きゼロ・売上50%完全支給</div>
            </div>
          </div>
        </section>

        {/* =========================================================
            10. 総合ガイド：他テーマ切り替えナビゲーション
           ========================================================= */}
        <div className="bg-white border border-[#F0E5EA] rounded-3xl p-5 sm:p-7 shadow-2xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-[#D94B7A] flex items-center gap-1.5 bg-[#FCE8EF] px-3 py-1 rounded-full border border-[#F0E5EA]">
                <LucideIcon name="Compass" size={14} />
                <span>総合ガイド テーマ一覧</span>
              </span>
              <span className="text-xs sm:text-sm font-bold text-[#35313A]">他のテーマを見る</span>
            </div>
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                onNavigateHome();
              }}
              className="text-xs font-bold text-[#D94B7A] hover:underline flex items-center gap-1 cursor-pointer self-start sm:self-auto"
            >
              <span>飛田新地求人トップへ</span>
              <LucideIcon name="ChevronRight" size={13} />
            </a>
          </div>
          <div className="flex flex-wrap items-center gap-2 pt-1">
            {ALL_CLUSTER_NODES.filter(n => n.id !== 'recruit').map((node) => {
              const isActive = node.id === topicId;
              return (
                <a
                  key={node.id}
                  href={node.path}
                  onClick={(e) => {
                    e.preventDefault();
                    if (node.id === 'faq') {
                      onNavigateFaq();
                    } else if (node.id === 'blog') {
                      onNavigateBlog();
                    } else {
                      onNavigateTopic(node.id);
                    }
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 shadow-2xs ${
                    isActive
                      ? 'bg-[#D94B7A] text-white font-extrabold shadow-xs'
                      : 'bg-[#FFF9FB] text-[#35313A] hover:text-[#D94B7A] border border-[#F0E5EA] hover:bg-white'
                  }`}
                >
                  <span>{node.emoji}</span>
                  <span>{node.title}</span>
                </a>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
