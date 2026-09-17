/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion } from 'motion/react';
import LucideIcon from './LucideIcon';
import { TOPIC_CLUSTERS, ALL_CLUSTER_NODES, TopicClusterData } from '../topicClusterData';
import { BLOG_ARTICLES } from '../blogData';
import JobDetails from './JobDetails';
import { getStoredSiteContent } from '../siteContent';

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
  const data: TopicClusterData = TOPIC_CLUSTERS[topicId] || TOPIC_CLUSTERS.job;
  const siteContent = getStoredSiteContent();
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Find featured articles from blogData
  const featuredArticles = data.featuredArticleSlugs
    .map((slug) => BLOG_ARTICLES.find((a) => a.slug === slug))
    .filter(Boolean);

  // Find related topic nodes
  const relatedTopics = data.relatedTopicIds
    .map((id) => ALL_CLUSTER_NODES.find((node) => node.id === id))
    .filter(Boolean);

  const handleLineConsultation = () => {
    const defaultMsg = `【${data.title}について相談】飛田新地求人の${data.title}（${data.badge}）について詳しく聞きたいです。`;
    if (onInjectedScroll) {
      onInjectedScroll(defaultMsg);
    } else {
      onCtaclick();
    }
  };

  return (
    <div className="bg-surface min-h-screen text-zinc-900 pb-20">
      
      {/* 1. Breadcrumbs Navigation (SEO & LLMO Core Requirement: 子ページ → 飛田新地求人トップへの内部リンク) */}
      <nav 
        aria-label="Breadcrumb" 
        className="bg-white/80 border-b border-rose-100/70 sticky top-14 md:top-16 z-30 backdrop-blur-md"
      >
        <div className="max-w-[1140px] mx-auto px-4 sm:px-6 py-2.5 flex items-center justify-between text-xs">
          <ol className="flex items-center gap-1.5 flex-wrap text-zinc-600">
            <li className="flex items-center gap-1">
              <button
                type="button"
                onClick={onNavigateHome}
                className="hover:text-rose-600 font-bold flex items-center gap-1 text-zinc-700 hover:underline cursor-pointer"
                id="breadcrumb-hub-home"
              >
                <LucideIcon name="Home" size={13} className="text-rose-500" />
                <span>飛田新地求人（トップ）</span>
              </button>
            </li>
            <li className="text-zinc-400">/</li>
            <li className="flex items-center gap-1 text-rose-700 font-bold" aria-current="page">
              <span>{data.emoji}</span>
              <span>{data.title}</span>
            </li>
          </ol>

          {/* Quick Hub Return Link */}
          <button
            type="button"
            onClick={onNavigateHome}
            className="hidden sm:inline-flex items-center gap-1 text-[11px] font-bold text-rose-700 hover:text-rose-800 bg-rose-50 px-2.5 py-1 rounded-full border border-rose-200/80 cursor-pointer"
            id="breadcrumb-return-hub-btn"
          >
            <LucideIcon name="Compass" size={12} />
            <span>総合ハブへ戻る</span>
          </button>
        </div>
      </nav>

      {/* 2. Topic Cluster Quick Switcher Pill Bar */}
      <div className="bg-rose-50/40 border-b border-rose-100/60 py-2 overflow-x-auto scrollbar-none">
        <div className="max-w-[1140px] mx-auto px-4 sm:px-6 flex items-center gap-1.5 whitespace-nowrap">
          <span className="text-[11px] font-black text-rose-700 shrink-0 mr-1 flex items-center gap-1">
            <LucideIcon name="Compass" size={13} />
            <span>テーマ別案内:</span>
          </span>
          <button
            type="button"
            onClick={onNavigateHome}
            className="px-2.5 py-1 rounded-lg text-xs font-bold bg-white text-zinc-700 hover:text-rose-600 border border-rose-200/70 hover:bg-rose-50 transition-colors cursor-pointer"
          >
            🏢 飛田新地求人トップ
          </button>
          {ALL_CLUSTER_NODES.filter(n => n.id !== 'recruit').map((node) => {
            const isActive = node.id === topicId;
            return (
              <button
                key={node.id}
                type="button"
                onClick={() => {
                  if (node.id === 'faq') {
                    onNavigateFaq();
                  } else if (node.id === 'blog') {
                    onNavigateBlog();
                  } else {
                    onNavigateTopic(node.id);
                  }
                }}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1 ${
                  isActive
                    ? 'bg-rose-600 text-white shadow-xs'
                    : 'bg-white text-zinc-700 hover:text-rose-600 border border-gray-200/70 hover:bg-rose-50'
                }`}
              >
                <span>{node.emoji}</span>
                <span>{node.title}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="max-w-[1100px] mx-auto px-4 sm:px-6 pt-8 md:pt-12">
        
        {/* 3. Hero Header with Canonical SEO & LLM Structure */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-rose-100 shadow-sm mb-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-rose-100/40 via-pink-50/20 to-transparent rounded-full blur-2xl -z-0 pointer-events-none" />

          <div className="relative z-10">
            {/* Top Badges */}
            <div className="flex items-center gap-2 mb-3 flex-wrap">
              <span className="inline-flex items-center gap-1 bg-rose-600 text-white text-[11px] font-black px-3 py-1 rounded-full shadow-2xs">
                <LucideIcon name="ShieldCheck" size={12} />
                <span>料理組合正規加盟 直営公式情報</span>
              </span>
              <span className={`text-[11px] font-bold px-3 py-1 rounded-full border shadow-2xs ${data.badgeColor}`}>
                {data.emoji} {data.badge}
              </span>
            </div>

            {/* Main Title H1 */}
            <h1 className="font-display font-black text-2xl sm:text-3xl md:text-4xl text-zinc-900 leading-tight mb-3">
              {data.title}
              <span className="block text-base sm:text-xl font-bold text-rose-600 mt-1 font-sans">
                {data.tagline}
              </span>
            </h1>

            <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed mb-6 max-w-3xl">
              {data.overview}
            </p>

            {/* Direct Answer Summary Box */}
            <div className="bg-gradient-to-r from-rose-50 via-pink-50/50 to-white rounded-2xl p-4 sm:p-5 border border-rose-200/80 mb-8">
              <div className="flex items-center gap-2 mb-1.5 text-rose-800 font-bold text-xs">
                <LucideIcon name="Sparkles" size={14} className="text-rose-600" />
                <span>{data.id === 'job' ? 'お仕事内容' : data.title}</span>
              </div>
              <p className="text-xs sm:text-sm text-zinc-800 leading-relaxed font-medium">
                {data.llmDirectAnswer}
              </p>
            </div>

            {/* Core Numerical Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 md:gap-4 mb-2">
              {data.stats.map((st, i) => (
                <div key={i} className="p-3.5 bg-rose-50/30 rounded-2xl border border-rose-100/70">
                  <span className="text-[10px] text-zinc-500 font-bold block mb-0.5">{st.label}</span>
                  <p className="font-display font-black text-rose-700 text-sm sm:text-base leading-snug">
                    {st.value}
                  </p>
                  <p className="text-[10px] text-zinc-500 mt-0.5 leading-tight">{st.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 4. Core Points Checklist */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-rose-100 shadow-sm mb-8">
          <h2 className="font-display font-bold text-lg sm:text-xl text-zinc-900 mb-4 flex items-center gap-2">
            <LucideIcon name="CheckCircle2" size={18} className="text-rose-600" />
            <span>{data.title}で絶対に押さえておくべきポイント</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {data.keyPoints.map((pt, i) => (
              <div key={i} className="flex items-start gap-2.5 p-3 rounded-2xl bg-rose-50/30 border border-rose-100/60">
                <span className="w-5 h-5 rounded-full bg-rose-600 text-white text-[11px] font-black flex items-center justify-center shrink-0 mt-0.5">
                  {i + 1}
                </span>
                <span className="text-xs sm:text-sm text-zinc-800 leading-relaxed font-medium">
                  {pt}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* 5. Deep-Dive Detailed Sections */}
        <div className="space-y-6 mb-8">
          {data.sections.map((sec, i) => (
            <div key={i} className="bg-white rounded-3xl p-6 sm:p-8 border border-rose-100 shadow-sm">
              <h2 className="font-display font-bold text-lg sm:text-xl text-zinc-900 mb-3 flex items-center gap-2">
                <span className="w-2.5 h-6 bg-rose-600 rounded-full inline-block" />
                <span>{sec.title}</span>
              </h2>
              <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed mb-4">
                {sec.description}
              </p>

              {/* Optional Callout Box */}
              {sec.callout && (
                <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200 mb-5 text-xs text-amber-950">
                  <span className="font-bold block mb-1 text-amber-900 text-sm">
                    {sec.callout.title}
                  </span>
                  <p className="leading-relaxed">{sec.callout.text}</p>
                </div>
              )}

              {/* Optional Checklist Points */}
              {sec.points && (
                <ul className="space-y-2.5 text-xs sm:text-sm text-zinc-800 mb-4">
                  {sec.points.map((p, idx) => (
                    <li key={idx} className="flex items-start gap-2 p-2.5 rounded-xl bg-gray-50/80 border border-gray-100">
                      <LucideIcon name="ChevronRight" size={15} className="text-rose-600 shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{p}</span>
                    </li>
                  ))}
                </ul>
              )}

              {/* Optional Detailed Table */}
              {sec.table && (
                <div className="overflow-x-auto rounded-2xl border border-gray-200 mt-4">
                  <table className="w-full text-xs text-left">
                    <thead className="bg-rose-50 text-rose-900 font-bold border-b border-gray-200">
                      <tr>
                        {sec.table.headers.map((th, idx) => (
                          <th key={idx} className="p-3 whitespace-nowrap">{th}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 bg-white">
                      {sec.table.rows.map((row, rIdx) => (
                        <tr key={rIdx} className="hover:bg-rose-50/30">
                          {row.map((cell, cIdx) => (
                            <td 
                              key={cIdx} 
                              className={`p-3 leading-relaxed ${cIdx === 0 ? 'font-bold text-zinc-900' : 'text-zinc-700'}`}
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
        </div>

        {/* 6. Special Embedded Functional Components if topic is Salary */}
        {topicId === 'salary' && (
          <div className="mb-8">
            <JobDetails 
              content={siteContent.jobs} 
              onCtaclickWithData={(msg) => onInjectedScroll ? onInjectedScroll(msg) : onCtaclick()} 
            />
          </div>
        )}

        {/* 7. Featured Column Articles (代表的な解説コラム) */}
        {featuredArticles.length > 0 && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-rose-100 shadow-sm mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display font-bold text-lg sm:text-xl text-zinc-900 flex items-center gap-2">
                <LucideIcon name="BookOpen" size={18} className="text-rose-600" />
                <span>「{data.title}」に関する専門解説コラム</span>
              </h2>
              <button
                type="button"
                onClick={() => onNavigateBlog()}
                className="text-xs font-bold text-rose-600 hover:text-rose-700 flex items-center gap-1 cursor-pointer"
              >
                <span>コラム全件を見る</span>
                <LucideIcon name="ChevronRight" size={13} />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {featuredArticles.map((art: any) => (
                <div
                  key={art.slug}
                  onClick={() => onNavigateBlog(art.slug)}
                  className="p-4 rounded-2xl border border-gray-100 hover:border-rose-300 bg-rose-50/20 hover:bg-white transition-all cursor-pointer flex flex-col justify-between group shadow-2xs hover:shadow-md"
                >
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-rose-100 text-rose-700">
                        {art.category || data.title}
                      </span>
                      <span className="text-[10px] text-zinc-400 font-mono">
                        {art.readTime || '4分'}
                      </span>
                    </div>
                    <h3 className="font-bold text-xs sm:text-sm text-zinc-900 group-hover:text-rose-600 leading-snug line-clamp-2 transition-colors mb-2">
                      {art.title}
                    </h3>
                    <p className="text-[11px] text-zinc-500 line-clamp-2 leading-relaxed">
                      {art.excerpt}
                    </p>
                  </div>
                  <div className="mt-3 pt-2 border-t border-gray-100 flex items-center justify-between text-[11px] font-bold text-rose-600">
                    <span>記事を読む</span>
                    <LucideIcon name="ChevronRight" size={13} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 8. Topic-Specific FAQs */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-rose-100 shadow-sm mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display font-bold text-lg sm:text-xl text-zinc-900 flex items-center gap-2">
              <LucideIcon name="HelpCircle" size={18} className="text-rose-600" />
              <span>「{data.title}」についてよくある質問</span>
            </h2>
            <button
              type="button"
              onClick={onNavigateFaq}
              className="text-xs font-bold text-rose-600 hover:text-rose-700 flex items-center gap-1 cursor-pointer"
            >
              <span>FAQ（全119問）を見る</span>
              <LucideIcon name="ChevronRight" size={13} />
            </button>
          </div>

          <div className="space-y-3">
            {data.faqs.map((f, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div 
                  key={idx} 
                  className="rounded-2xl border border-gray-100 overflow-hidden bg-rose-50/15 transition-colors"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full text-left p-4 flex items-center justify-between gap-3 cursor-pointer hover:bg-rose-50/40"
                  >
                    <span className="font-bold text-xs sm:text-sm text-zinc-900 flex items-start gap-2">
                      <span className="text-rose-600 font-black">Q.</span>
                      <span>{f.q}</span>
                    </span>
                    <LucideIcon 
                      name={isOpen ? "ChevronUp" : "ChevronDown"} 
                      size={16} 
                      className="text-rose-500 shrink-0" 
                    />
                  </button>
                  {isOpen && (
                    <div className="p-4 pt-0 text-xs sm:text-sm text-zinc-700 leading-relaxed border-t border-rose-100/40 bg-white flex items-start gap-2">
                      <span className="text-emerald-600 font-black shrink-0 mt-0.5">A.</span>
                      <span>{f.a}</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* =========================================================================
            9. TOPIC CLUSTER RECIPROCAL INTERNAL LINKING (LLMO & SEO CORE ARCHITECTURE)
            全ての子ページ → 「飛田新地求人」へ内部リンク
            全ての子ページ → 関連専門ページ（トピッククラスター）へ相互リンク
           ========================================================================= */}
        <div className="bg-gradient-to-br from-rose-600 via-pink-600 to-rose-700 rounded-3xl p-6 sm:p-10 text-white shadow-xl mb-8">
          
          {/* Main Return Link to Hub */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-white/20 mb-6">
            <div>
              <span className="text-[10px] font-black tracking-widest bg-white/20 px-3 py-1 rounded-full uppercase mb-2 inline-block">
                RECRUIT TOP
              </span>
              <h2 className="font-display font-black text-xl sm:text-2xl text-white">
                飛田新地求人 公式トップページ
              </h2>
              <p className="text-xs sm:text-sm text-rose-100 mt-1 max-w-xl">
                料理組合公認 老舗料亭直営公式採用。売上50%完全バック・即日全額日払い手渡し・ネット写真掲載ゼロ。
              </p>
            </div>

            <button
              type="button"
              onClick={onNavigateHome}
              className="w-full sm:w-auto bg-white hover:bg-rose-50 text-rose-700 font-black text-sm px-6 py-3.5 rounded-2xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer hover:scale-105 shrink-0"
              id="cluster-return-hub-cta"
            >
              <LucideIcon name="Home" size={16} />
              <span>「飛田新地求人」トップへ戻る</span>
              <LucideIcon name="ChevronRight" size={16} />
            </button>
          </div>

          {/* Related Spokes in the Topic Cluster */}
          <div>
            <h3 className="text-xs sm:text-sm font-bold text-rose-100 mb-3 flex items-center gap-1.5">
              <LucideIcon name="BookOpen" size={14} />
              <span>「{data.title}」とあわせて読みたいお役立ちテーマ</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
              {relatedTopics.map((rel: any) => (
                <button
                  key={rel.id}
                  type="button"
                  onClick={() => {
                    if (rel.id === 'faq') {
                      onNavigateFaq();
                    } else if (rel.id === 'blog') {
                      onNavigateBlog();
                    } else {
                      onNavigateTopic(rel.id);
                    }
                  }}
                  className="bg-white/10 hover:bg-white hover:text-zinc-900 text-left p-3.5 rounded-2xl border border-white/20 transition-all cursor-pointer group flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-lg">{rel.emoji}</span>
                      <span className="text-[10px] bg-white/20 group-hover:bg-rose-100 group-hover:text-rose-700 px-2 py-0.5 rounded font-bold">
                        {rel.badge}
                      </span>
                    </div>
                    <span className="font-bold text-xs block group-hover:text-rose-700 transition-colors">
                      {rel.title}
                    </span>
                    <span className="text-[10px] text-rose-100 group-hover:text-zinc-600 block line-clamp-1 mt-0.5">
                      {rel.desc}
                    </span>
                  </div>
                  <div className="mt-2 text-[10px] font-bold text-rose-200 group-hover:text-rose-600 flex items-center justify-end gap-0.5">
                    <span>詳しく見る</span>
                    <LucideIcon name="ChevronRight" size={12} />
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 10. Official LINE Consultation Box with Sakura */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-rose-100 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <img
              src="/images/sakura_advisor_portrait_1788920514818.jpg"
              alt="店舗採用担当 さくら"
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover border-2 border-rose-200 shadow-md shrink-0"
              referrerPolicy="no-referrer"
            />
            <div>
              <span className="inline-block bg-rose-100 text-rose-700 text-[10px] font-black px-2 py-0.5 rounded-full mb-1">
                店舗採用担当 さくらより
              </span>
              <h3 className="font-display font-bold text-base sm:text-lg text-zinc-900">
                「{data.title}」について、どんな些細な疑問もLINEで相談できます
              </h3>
              <p className="text-xs text-zinc-500 mt-1">
                ※完全匿名・面接前の質問だけでも大丈夫です。24時間受付中
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleLineConsultation}
            className="w-full sm:w-auto bg-[#06c755] hover:bg-[#05b34c] text-white font-bold text-sm px-6 py-3.5 rounded-2xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap"
            id="cluster-line-cta-btn"
          >
            <LucideIcon name="MessageCircle" size={18} className="fill-white text-white" />
            <span>LINEで質問・相談する</span>
          </button>
        </div>

      </div>
    </div>
  );
}
