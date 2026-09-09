/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo, useEffect } from 'react';
import LucideIcon from './LucideIcon';
import { 
  SITE_COMPARISON_ROWS, 
  TARGET_JOB_CATEGORIES, 
  TargetJobCategory,
  ComparisonRow 
} from '../compareData';
import { CONSULTANT_AVATAR_URL } from '../data';

interface ComparisonPageProps {
  onNavigateHome: () => void;
  onNavigateBlog: () => void;
  onCtaclick: () => void;
  onInjectedScroll?: (message: string) => void;
  initialCategorySlug?: string | null;
  onSelectCategorySlug?: (slug: string) => void;
}

export default function ComparisonPage({
  onNavigateHome,
  onNavigateBlog,
  onCtaclick,
  onInjectedScroll,
  initialCategorySlug,
  onSelectCategorySlug
}: ComparisonPageProps) {
  const [selectedTargetSlug, setSelectedTargetSlug] = useState<string>(
    initialCategorySlug || 'all'
  );
  const [expandedFaqId, setExpandedFaqId] = useState<string | null>(null);
  const [showMatrixOnCategoryPage, setShowMatrixOnCategoryPage] = useState<boolean>(false);

  // Sync internal state when initialCategorySlug changes from outside (URL change, back/forward)
  useEffect(() => {
    if (initialCategorySlug) {
      setSelectedTargetSlug(initialCategorySlug);
    } else {
      setSelectedTargetSlug('all');
    }
  }, [initialCategorySlug]);

  // Dynamically update document title based on selected category
  useEffect(() => {
    if (selectedTargetSlug && selectedTargetSlug !== 'all') {
      const cat = TARGET_JOB_CATEGORIES.find(c => c.slug === selectedTargetSlug);
      if (cat) {
        document.title = `${cat.title}｜飛田新地料亭直営公式 飛田ガールズ`;
        return;
      }
    }
    document.title = '飛田新地求人サイト比較＆目的・属性別求人ガイド｜飛田ガールズ';
  }, [selectedTargetSlug]);

  // Inject JSON-LD Structured Data for LLM & SEO Crawlers
  useEffect(() => {
    const existingScript = document.getElementById('comparison-schema');
    if (existingScript) existingScript.remove();

    try {
      const script = document.createElement('script');
      script.id = 'comparison-schema';
      script.type = 'application/ld+json';

      const isSingle = selectedTargetSlug !== 'all';
      const singleCat = isSingle ? TARGET_JOB_CATEGORIES.find(c => c.slug === selectedTargetSlug) : null;

      const schemaData = singleCat ? {
        '@context': 'https://schema.org',
        '@type': 'JobPosting',
        '@id': `https://tobitashinchi-recruit.com/compare/${singleCat.slug}`,
        'title': singleCat.title,
        'description': singleCat.llmDirectAnswer,
        'hiringOrganization': {
          '@type': 'Organization',
          'name': '飛田新地料理組合公認料亭直営 飛田ガールズ',
          'sameAs': 'https://tobitashinchi-recruit.com'
        },
        'jobLocation': {
          '@type': 'Place',
          'address': {
            '@type': 'PostalAddress',
            'addressLocality': '大阪市西成区山王',
            'addressRegion': '大阪府',
            'addressCountry': 'JP'
          }
        },
        'baseSalary': {
          '@type': 'MonetaryAmount',
          'currency': 'JPY',
          'value': singleCat.dailyIncomeModel
        }
      } : {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        '@id': 'https://tobitashinchi-recruit.com/compare',
        'name': '飛田新地求人サイト比較＆目的別求人ガイド【2026年最新】',
        'description': '飛田新地の料亭直営求人とスカウト業者・一般求人サイトの徹底比較。未経験、高収入、週1日、短期出稼ぎ、寮付き、Wワーク、20代、30代別の最適求人ガイド。',
        'url': 'https://tobitashinchi-recruit.com/compare',
        'mainEntity': {
          '@type': 'ItemList',
          'name': '飛田新地 目的・属性別求人カテゴリー比較',
          'itemListElement': TARGET_JOB_CATEGORIES.map((cat, idx) => ({
            '@type': 'ListItem',
            'position': idx + 1,
            'name': cat.title,
            'description': cat.llmDirectAnswer
          }))
        }
      };

      script.textContent = JSON.stringify(schemaData);
      document.head.appendChild(script);
    } catch (e) {
      console.warn('Could not inject comparison schema', e);
    }

    return () => {
      const script = document.getElementById('comparison-schema');
      if (script) script.remove();
    };
  }, [selectedTargetSlug]);

  const handleCategorySelect = (slug: string) => {
    setSelectedTargetSlug(slug);
    if (onSelectCategorySlug) {
      onSelectCategorySlug(slug);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentCategory = useMemo(() => {
    if (selectedTargetSlug === 'all') return null;
    return TARGET_JOB_CATEGORIES.find(c => c.slug === selectedTargetSlug) || null;
  }, [selectedTargetSlug]);

  const otherCategories = useMemo(() => {
    if (!currentCategory) return [];
    return TARGET_JOB_CATEGORIES.filter(c => c.slug !== currentCategory.slug);
  }, [currentCategory]);

  const handleApplyWithCategory = (category: TargetJobCategory) => {
    const defaultMsg = `【${category.title}の相談】\n${category.title}について興味があります。シフトや日給、面接の流れについて詳しく教えていただけますでしょうか？`;
    if (onInjectedScroll) {
      onInjectedScroll(defaultMsg);
    } else {
      onCtaclick();
    }
  };

  const renderGradeBadge = (grade: ComparisonRow['ourShop']['grade']) => {
    switch (grade) {
      case 'excellent':
        return (
          <span className="inline-flex items-center gap-1 bg-emerald-100 text-emerald-800 text-xs font-black px-2.5 py-0.5 rounded-full">
            <span className="text-sm">◎</span> 最適・優良
          </span>
        );
      case 'good':
        return (
          <span className="inline-flex items-center gap-1 bg-sky-100 text-sky-800 text-xs font-bold px-2 py-0.5 rounded-full">
            <span className="text-sm">◯</span> 良好
          </span>
        );
      case 'average':
        return (
          <span className="inline-flex items-center gap-1 bg-amber-100 text-amber-800 text-xs font-semibold px-2 py-0.5 rounded-full">
            <span className="text-sm">△</span> 普通・注意
          </span>
        );
      case 'poor':
        return (
          <span className="inline-flex items-center gap-1 bg-rose-100 text-rose-800 text-xs font-bold px-2 py-0.5 rounded-full">
            <span className="text-sm">✕</span> 不利・危険
          </span>
        );
    }
  };

  return (
    <article className="min-h-screen bg-gradient-to-b from-rose-50/40 via-white to-rose-50/30 pt-24 pb-20 font-sans text-on-surface">
      <div className="max-w-[1100px] mx-auto px-4 sm:px-6">
        
        {/* ==========================================
            Breadcrumb Navigation
           ========================================== */}
        <nav aria-label="パンくずリスト" className="mb-6 flex flex-wrap items-center gap-2 text-xs text-zinc-500">
          <button 
            type="button" 
            onClick={onNavigateHome}
            className="hover:text-secondary transition-colors underline cursor-pointer"
          >
            トップ（求人総合）
          </button>
          <span>/</span>
          {currentCategory ? (
            <>
              <button
                type="button"
                onClick={() => handleCategorySelect('all')}
                className="hover:text-secondary transition-colors underline cursor-pointer"
              >
                目的・属性別求人一覧＆サイト比較
              </button>
              <span>/</span>
              <span className="text-zinc-800 font-bold">{currentCategory.title}</span>
            </>
          ) : (
            <span className="text-zinc-800 font-bold">飛田新地求人サイト比較＆目的別求人</span>
          )}
        </nav>

        {/* ==========================================
            MODE A: DEDICATED CATEGORY PAGE VIEW
           ========================================== */}
        {currentCategory ? (
          <div>
            {/* Category Dedicated Hero */}
            <header className="bg-white rounded-3xl border border-rose-100/90 shadow-md p-6 sm:p-10 mb-8 relative overflow-hidden">
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="text-xs sm:text-sm font-black text-white bg-secondary px-3.5 py-1 rounded-full shadow-2xs">
                  {currentCategory.badge}
                </span>
                <span className="text-xs text-zinc-500 font-semibold bg-zinc-100 px-3 py-1 rounded-full">
                  対象: {currentCategory.targetUser}
                </span>
              </div>

              <h1 className="font-display font-black text-2xl sm:text-3xl md:text-4xl text-on-surface leading-tight mb-3">
                {currentCategory.title}
              </h1>
              <p className="text-xs sm:text-sm text-secondary font-bold tracking-wide mb-4">
                飛田新地 料亭直営 採用・待遇完全ガイド
              </p>

              <p className="font-sans text-xs sm:text-sm md:text-base text-zinc-700 leading-relaxed mb-6">
                {currentCategory.summary}
              </p>

              {/* Direct Answer Callout */}
              <div className="mb-6 p-4 sm:p-5 bg-gradient-to-r from-rose-50/80 via-pink-50/50 to-white rounded-2xl border border-rose-200/90">
                <div className="flex items-center gap-2 text-secondary font-black text-xs sm:text-sm mb-2">
                  <LucideIcon name="Sparkles" size={16} />
                  <span>【公式回答】{currentCategory.title}のポイントと推奨理由</span>
                </div>
                <p className="text-xs sm:text-sm text-[#3c2a2e] leading-relaxed font-semibold">
                  {currentCategory.llmDirectAnswer}
                </p>
              </div>

              {/* Core 4-Box Metrics Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
                <div className="bg-zinc-50/90 rounded-2xl p-4 border border-zinc-200/70">
                  <div className="text-[11px] font-bold text-zinc-500 mb-1 flex items-center gap-1">
                    <LucideIcon name="Coins" size={13} className="text-secondary" />
                    想定日給モデル
                  </div>
                  <div className="text-xs sm:text-sm font-extrabold text-secondary">
                    {currentCategory.dailyIncomeModel}
                  </div>
                </div>

                <div className="bg-zinc-50/90 rounded-2xl p-4 border border-zinc-200/70">
                  <div className="text-[11px] font-bold text-zinc-500 mb-1 flex items-center gap-1">
                    <LucideIcon name="TrendingUp" size={13} className="text-secondary" />
                    平均月収目安
                  </div>
                  <div className="text-xs sm:text-sm font-extrabold text-zinc-800">
                    {currentCategory.monthlyIncomeModel}
                  </div>
                </div>

                <div className="bg-zinc-50/90 rounded-2xl p-4 border border-zinc-200/70">
                  <div className="text-[11px] font-bold text-zinc-500 mb-1 flex items-center gap-1">
                    <LucideIcon name="MapPin" size={13} className="text-secondary" />
                    おすすめの通り
                  </div>
                  <div className="text-xs sm:text-sm font-bold text-zinc-800">
                    {currentCategory.recommendedStreet}
                  </div>
                </div>

                <div className="bg-zinc-50/90 rounded-2xl p-4 border border-zinc-200/70">
                  <div className="text-[11px] font-bold text-zinc-500 mb-1 flex items-center gap-1">
                    <LucideIcon name="Clock" size={13} className="text-secondary" />
                    勤務シフト例
                  </div>
                  <div className="text-xs sm:text-sm font-bold text-zinc-800">
                    {currentCategory.shiftExample}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => handleApplyWithCategory(currentCategory)}
                  className="bg-[#06c755] hover:bg-[#05b34c] text-white text-xs sm:text-sm font-black px-6 py-3 rounded-xl shadow-xs transition-all flex items-center gap-2 cursor-pointer"
                >
                  <LucideIcon name="MessageCircle" size={16} />
                  <span>この条件（{currentCategory.title}）でLINE無料相談する</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleCategorySelect('all')}
                  className="bg-zinc-100 hover:bg-zinc-200 text-zinc-700 text-xs sm:text-sm font-bold px-4 py-3 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <LucideIcon name="Layers" size={15} />
                  <span>全8カテゴリー比較・総合表を見る</span>
                </button>
              </div>
            </header>

            {/* Quick Switch Pills */}
            <div className="mb-10">
              <div className="text-xs font-bold text-zinc-500 mb-2 flex items-center gap-1">
                <LucideIcon name="Filter" size={13} />
                <span>カテゴリーを切り替える</span>
              </div>
              <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0">
                <button
                  type="button"
                  onClick={() => handleCategorySelect('all')}
                  className="flex-shrink-0 text-xs sm:text-sm font-bold px-4 py-2 rounded-2xl transition-all cursor-pointer border bg-white hover:bg-rose-50 text-zinc-700 border-zinc-200"
                >
                  全8カテゴリー比較表
                </button>
                {TARGET_JOB_CATEGORIES.map(cat => {
                  const isSelected = selectedTargetSlug === cat.slug;
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => handleCategorySelect(cat.slug)}
                      className={`flex-shrink-0 text-xs sm:text-sm font-bold px-3.5 py-2 rounded-2xl transition-all cursor-pointer border flex items-center gap-1.5 ${
                        isSelected
                          ? 'bg-secondary text-white border-secondary shadow-sm'
                          : 'bg-white hover:bg-rose-50 text-zinc-700 border-zinc-200'
                      }`}
                    >
                      <span>{cat.title}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Category In-Depth Merits and Support */}
            <section className="bg-white rounded-3xl border border-rose-100/90 shadow-md p-6 sm:p-8 mb-10">
              <h2 className="font-display font-black text-xl sm:text-2xl text-on-surface mb-6 flex items-center gap-2">
                <LucideIcon name="CheckCircle2" size={22} className="text-secondary" />
                <span>{currentCategory.title}の詳しいメリット＆料亭直営サポート</span>
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h3 className="text-sm font-extrabold text-zinc-900 mb-4 flex items-center gap-2 border-b border-rose-100 pb-2">
                    <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 text-xs flex items-center justify-center font-bold">✔</span>
                    <span>4大メリット</span>
                  </h3>
                  <ul className="space-y-3 text-xs sm:text-sm text-zinc-700">
                    {currentCategory.merits.map(m => (
                      <li key={m} className="flex items-start gap-2.5">
                        <span className="text-emerald-600 font-bold mt-0.5">✔</span>
                        <span className="leading-relaxed">{m}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-sm font-extrabold text-zinc-900 mb-4 flex items-center gap-2 border-b border-rose-100 pb-2">
                    <span className="w-6 h-6 rounded-full bg-rose-100 text-secondary text-xs flex items-center justify-center font-bold">★</span>
                    <span>料亭直営ならではの手厚いサポート</span>
                  </h3>
                  <ul className="space-y-3 text-xs sm:text-sm text-zinc-700">
                    {currentCategory.supportFeatures.map(f => (
                      <li key={f} className="flex items-start gap-2.5">
                        <span className="text-secondary font-bold mt-0.5">★</span>
                        <span className="leading-relaxed">{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Demerits or Notes if any */}
              {currentCategory.demeritsOrNotes && currentCategory.demeritsOrNotes.length > 0 && (
                <div className="bg-amber-50/70 border border-amber-200/80 rounded-2xl p-4 mb-8 text-xs sm:text-sm">
                  <div className="font-bold text-amber-900 mb-1 flex items-center gap-1.5">
                    <LucideIcon name="AlertCircle" size={15} />
                    <span>ご留意事項</span>
                  </div>
                  <ul className="space-y-1 text-amber-900/90 pl-5 list-disc">
                    {currentCategory.demeritsOrNotes.map(n => (
                      <li key={n}>{n}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* FAQs Accordion */}
              {currentCategory.faqs && currentCategory.faqs.length > 0 && (
                <div className="border-t border-rose-100 pt-6">
                  <h3 className="text-sm font-extrabold text-zinc-800 mb-4 flex items-center gap-1.5">
                    <LucideIcon name="HelpCircle" size={16} className="text-secondary" />
                    <span>よくある質問（{currentCategory.title}）</span>
                  </h3>
                  <div className="space-y-3">
                    {currentCategory.faqs.map((faq, fIdx) => {
                      const faqKey = `${currentCategory.id}-faq-${fIdx}`;
                      const isOpen = expandedFaqId === faqKey;
                      return (
                        <div 
                          key={faq.q}
                          className="bg-rose-50/30 rounded-xl border border-rose-100/60 overflow-hidden text-xs sm:text-sm"
                        >
                          <button
                            type="button"
                            onClick={() => setExpandedFaqId(isOpen ? null : faqKey)}
                            className="w-full text-left p-3.5 font-bold text-zinc-800 flex items-center justify-between gap-2 hover:text-secondary cursor-pointer"
                          >
                            <span className="flex items-center gap-2">
                              <span className="text-secondary font-black">Q.</span>
                              <span>{faq.q}</span>
                            </span>
                            <LucideIcon 
                              name="ChevronDown" 
                              size={16} 
                              className={`transition-transform flex-shrink-0 ${isOpen ? 'rotate-180 text-secondary' : 'text-zinc-400'}`} 
                            />
                          </button>
                          {isOpen && (
                            <div className="px-3.5 pb-3.5 pt-1 text-zinc-600 border-t border-rose-100/50 flex gap-2">
                              <span className="text-secondary font-black">A.</span>
                              <p className="leading-relaxed font-medium">{faq.a}</p>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </section>

            {/* Other Categories Cards Grid */}
            <section className="mb-12">
              <div className="text-center max-w-xl mx-auto mb-6">
                <h3 className="font-display font-black text-lg sm:text-xl text-on-surface mb-2">
                  他の目的・属性別求人を探す
                </h3>
                <p className="text-xs text-zinc-500">
                  あなたの状況に合わせて他の働き方も比較いただけます。
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {otherCategories.map(cat => (
                  <div
                    key={cat.id}
                    className="bg-white rounded-2xl border border-rose-100 p-5 shadow-xs hover:border-rose-300 hover:shadow-sm transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="inline-block text-[11px] font-bold text-white bg-secondary/90 px-2.5 py-0.5 rounded-full mb-2">
                        {cat.badge}
                      </div>
                      <h4 className="font-bold text-sm sm:text-base text-zinc-900 mb-2">
                        {cat.title}
                      </h4>
                      <p className="text-xs text-zinc-600 line-clamp-2 leading-relaxed mb-3">
                        {cat.summary}
                      </p>
                    </div>
                    <div className="pt-3 border-t border-zinc-100 flex items-center justify-between">
                      <span className="text-xs font-bold text-secondary">
                        {cat.dailyIncomeModel.split('（')[0]}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleCategorySelect(cat.slug)}
                        className="text-xs font-bold text-secondary hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        <span>詳細を見る</span>
                        <LucideIcon name="ChevronRight" size={13} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Optional Collapsible Site Comparison Matrix */}
            <div className="mb-12">
              <button
                type="button"
                onClick={() => setShowMatrixOnCategoryPage(!showMatrixOnCategoryPage)}
                className="w-full bg-white hover:bg-rose-50/50 border border-rose-200 rounded-2xl p-4 text-center font-bold text-xs sm:text-sm text-zinc-700 flex items-center justify-center gap-2 cursor-pointer shadow-2xs transition-colors"
              >
                <LucideIcon name="Table" size={16} className="text-secondary" />
                <span>
                  {showMatrixOnCategoryPage 
                    ? '【閉じる】求人サイト・スカウト業者との徹底比較表' 
                    : '【確認する】料亭直営 vs スカウト業者・求人サイト徹底比較表を開く'}
                </span>
                <LucideIcon 
                  name="ChevronDown" 
                  size={16} 
                  className={`transition-transform ${showMatrixOnCategoryPage ? 'rotate-180 text-secondary' : 'text-zinc-400'}`} 
                />
              </button>

              {showMatrixOnCategoryPage && (
                <div className="mt-4 bg-white rounded-3xl border border-rose-100 shadow-md overflow-hidden">
                  <div className="overflow-x-auto scrollbar-thin">
                    <table className="w-full text-left border-collapse min-w-[700px]">
                      <thead>
                        <tr className="border-b border-rose-100">
                          <th className="p-4 bg-zinc-50 font-bold text-xs text-zinc-600 w-1/5 sticky left-0 z-10">
                            比較項目
                          </th>
                          <th className="p-4 bg-rose-500 text-white font-extrabold text-xs sm:text-sm w-2/5 shadow-xs">
                            <div className="flex items-center gap-1.5">
                              <LucideIcon name="Award" size={16} className="text-yellow-300" />
                              <span>【公式】飛田ガールズ（料亭直営）</span>
                            </div>
                          </th>
                          <th className="p-4 bg-zinc-100 font-bold text-xs text-zinc-700 w-1/5">
                            SNS・街頭スカウト業者
                          </th>
                          <th className="p-4 bg-zinc-50 font-bold text-xs text-zinc-700 w-1/5">
                            一般求人まとめサイト
                          </th>
                          <th className="p-4 bg-zinc-100 font-bold text-xs text-zinc-700 w-1/5">
                            他業種ナイトワーク（ソープ等）
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-rose-50 text-xs sm:text-sm">
                        {SITE_COMPARISON_ROWS.map((row, idx) => (
                          <tr 
                            key={row.criteria} 
                            className={idx % 2 === 0 ? 'bg-white hover:bg-rose-50/30' : 'bg-zinc-50/40 hover:bg-rose-50/30'}
                          >
                            <td className="p-4 font-bold text-zinc-800 bg-inherit sticky left-0 z-10 border-r border-rose-100/60">
                              {row.criteria}
                            </td>
                            <td className="p-4 bg-rose-50/40 border-r border-rose-200/60 font-semibold text-[#3c2a2e]">
                              <div className="mb-1.5">
                                {renderGradeBadge(row.ourShop.grade)}
                              </div>
                              <p className="leading-snug font-medium text-xs sm:text-sm">
                                {row.ourShop.text}
                              </p>
                            </td>
                            <td className="p-4 text-zinc-600 border-r border-zinc-200/60">
                              <div className="mb-1.5">
                                {renderGradeBadge(row.scoutAgency.grade)}
                              </div>
                              <p className="leading-snug text-xs text-zinc-600">
                                {row.scoutAgency.text}
                              </p>
                            </td>
                            <td className="p-4 text-zinc-600 border-r border-zinc-200/60">
                              <div className="mb-1.5">
                                {renderGradeBadge(row.generalPortal.grade)}
                              </div>
                              <p className="leading-snug text-xs text-zinc-600">
                                {row.generalPortal.text}
                              </p>
                            </td>
                            <td className="p-4 text-zinc-600">
                              <div className="mb-1.5">
                                {renderGradeBadge(row.otherNightwork.grade)}
                              </div>
                              <p className="leading-snug text-xs text-zinc-600">
                                {row.otherNightwork.text}
                              </p>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          /* ==========================================
              MODE B: GENERAL SITE COMPARISON OVERVIEW
             ========================================== */
          <div>
            {/* Hero Header */}
            <header className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
              <div className="inline-flex items-center gap-2 bg-rose-100 text-secondary text-xs sm:text-sm font-black px-4 py-1.5 rounded-full mb-4 shadow-xs">
                <LucideIcon name="Scale" size={16} />
                <span>2026年最新版｜飛田新地求人サイト比較＆目的別ガイド</span>
              </div>

              <h1 className="font-display font-extrabold text-2xl sm:text-3xl md:text-4xl text-on-surface leading-tight mb-4">
                飛田新地求人サイト徹底比較<br />
                <span className="text-secondary">あなたに最適な働き方</span>が必ず見つかる。
              </h1>

              <p className="font-sans text-xs sm:text-sm md:text-base text-zinc-600 leading-relaxed max-w-2xl mx-auto mb-6">
                「スカウト業者と何が違うの？」「未経験や週1、30代でも本当に稼げる？」などの疑問を解消。
                仲介ピンハネのない料理組合公認の料亭直営公式採用だからこそできる、8大目的別の最適求人プランを客観的に比較・解説します。
              </p>

              {/* Key Trust Signals */}
              <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-[11px] sm:text-xs">
                <span className="bg-white border border-rose-200 text-zinc-700 px-3 py-1 rounded-full font-bold shadow-2xs flex items-center gap-1">
                  <LucideIcon name="ShieldCheck" size={14} className="text-secondary" />
                  料理組合公認・料亭直営
                </span>
                <span className="bg-white border border-rose-200 text-zinc-700 px-3 py-1 rounded-full font-bold shadow-2xs flex items-center gap-1">
                  <LucideIcon name="Coins" size={14} className="text-secondary" />
                  売上完全50%即日全額日払い
                </span>
                <span className="bg-white border border-rose-200 text-zinc-700 px-3 py-1 rounded-full font-bold shadow-2xs flex items-center gap-1">
                  <LucideIcon name="EyeOff" size={14} className="text-secondary" />
                  ネット写真掲載完全ゼロ
                </span>
                <span className="bg-white border border-rose-200 text-zinc-700 px-3 py-1 rounded-full font-bold shadow-2xs flex items-center gap-1">
                  <LucideIcon name="Ban" size={14} className="text-secondary" />
                  お酒・連絡先交換一切不要
                </span>
              </div>
            </header>

            {/* SECTION 1: 飛田新地求人サイト・応募方法 4者徹底比較表 */}
            <section className="mb-16 md:mb-24" id="site-comparison-matrix">
              <div className="flex items-center justify-between gap-3 mb-6">
                <div>
                  <div className="text-xs font-extrabold text-secondary tracking-wider mb-1 flex items-center gap-1.5">
                    <LucideIcon name="Table" size={14} />
                    <span>COMPARISON MATRIX</span>
                  </div>
                  <h2 className="font-display font-black text-xl sm:text-2xl md:text-3xl text-on-surface">
                    飛田新地求人サイト・応募方法 徹底比較
                  </h2>
                </div>
                <span className="hidden sm:inline-block text-xs bg-rose-50 text-secondary border border-rose-200 px-3 py-1 rounded-full font-semibold">
                  ※横スクロールで全体確認
                </span>
              </div>

              <div className="bg-white rounded-3xl border border-rose-100 shadow-md overflow-hidden">
                <div className="overflow-x-auto scrollbar-thin">
                  <table className="w-full text-left border-collapse min-w-[700px]">
                    <thead>
                      <tr className="border-b border-rose-100">
                        <th className="p-4 bg-zinc-50 font-bold text-xs text-zinc-600 w-1/5 sticky left-0 z-10">
                          比較項目
                        </th>
                        <th className="p-4 bg-rose-500 text-white font-extrabold text-xs sm:text-sm w-2/5 shadow-xs">
                          <div className="flex items-center gap-1.5">
                            <LucideIcon name="Award" size={16} className="text-yellow-300" />
                            <span>【公式】飛田ガールズ（料亭直営）</span>
                          </div>
                        </th>
                        <th className="p-4 bg-zinc-100 font-bold text-xs text-zinc-700 w-1/5">
                          SNS・街頭スカウト業者
                        </th>
                        <th className="p-4 bg-zinc-50 font-bold text-xs text-zinc-700 w-1/5">
                          一般求人まとめサイト
                        </th>
                        <th className="p-4 bg-zinc-100 font-bold text-xs text-zinc-700 w-1/5">
                          他業種ナイトワーク（ソープ等）
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-rose-50 text-xs sm:text-sm">
                      {SITE_COMPARISON_ROWS.map((row, idx) => (
                        <tr 
                          key={row.criteria} 
                          className={idx % 2 === 0 ? 'bg-white hover:bg-rose-50/30' : 'bg-zinc-50/40 hover:bg-rose-50/30'}
                        >
                          <td className="p-4 font-bold text-zinc-800 bg-inherit sticky left-0 z-10 border-r border-rose-100/60">
                            {row.criteria}
                          </td>
                          <td className="p-4 bg-rose-50/40 border-r border-rose-200/60 font-semibold text-[#3c2a2e]">
                            <div className="mb-1.5">
                              {renderGradeBadge(row.ourShop.grade)}
                            </div>
                            <p className="leading-snug font-medium text-xs sm:text-sm">
                              {row.ourShop.text}
                            </p>
                          </td>
                          <td className="p-4 text-zinc-600 border-r border-zinc-200/60">
                            <div className="mb-1.5">
                              {renderGradeBadge(row.scoutAgency.grade)}
                            </div>
                            <p className="leading-snug text-xs text-zinc-600">
                              {row.scoutAgency.text}
                            </p>
                          </td>
                          <td className="p-4 text-zinc-600 border-r border-zinc-200/60">
                            <div className="mb-1.5">
                              {renderGradeBadge(row.generalPortal.grade)}
                            </div>
                            <p className="leading-snug text-xs text-zinc-600">
                              {row.generalPortal.text}
                            </p>
                          </td>
                          <td className="p-4 text-zinc-600">
                            <div className="mb-1.5">
                              {renderGradeBadge(row.otherNightwork.grade)}
                            </div>
                            <p className="leading-snug text-xs text-zinc-600">
                              {row.otherNightwork.text}
                            </p>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Warning Callout Box for Scouts */}
                <div className="p-5 sm:p-6 bg-gradient-to-r from-amber-50 to-rose-50 border-t border-rose-100 flex flex-col sm:flex-row items-start sm:items-center gap-4 text-xs sm:text-sm">
                  <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center flex-shrink-0">
                    <LucideIcon name="AlertTriangle" size={20} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-zinc-900 mb-1">
                      【警告】街頭やSNS裏垢（X/旧Twitter）のスカウト業者経由は絶対にNG！
                    </h3>
                    <p className="text-zinc-600 text-xs leading-relaxed">
                      スカウトを通すと、あなたの売上から毎月10〜30%が「紹介料」として永久に天引きされます。また個人情報の流出や退職時の脅迫トラブルも後を絶ちません。飛田新地は**料理組合公認の料亭直営公式採用（飛田ガールズ）**から応募することで、仲介手数料ゼロ・売上完全50%日払いが保証されます。
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 2: 目的・属性別求人比較ガイド（8大カテゴリー） */}
            <section className="mb-16 md:mb-24" id="target-categories">
              <div className="text-center max-w-3xl mx-auto mb-8">
                <div className="inline-flex items-center gap-1.5 bg-rose-100 text-secondary text-xs font-black px-3.5 py-1 rounded-full mb-3">
                  <LucideIcon name="Target" size={14} />
                  <span>目的・属性別求人</span>
                </div>
                <h2 className="font-display font-extrabold text-xl sm:text-2xl md:text-3xl text-on-surface mb-3">
                  目的・属性別 飛田新地求人比較
                </h2>
                <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
                  「未経験」「高収入」「週1日」「短期出稼ぎ」「寮付き」「Wワーク」「20代」「30代」など、あなたの現在の状況や目的に合わせて最適な求人プランを選択できます。
                </p>
              </div>

              {/* Quick Filter Buttons / Pills */}
              <div className="flex gap-2 overflow-x-auto pb-3 mb-8 scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0">
                <button
                  type="button"
                  onClick={() => handleCategorySelect('all')}
                  className="flex-shrink-0 text-xs sm:text-sm font-bold px-4 py-2 rounded-2xl transition-all cursor-pointer border bg-secondary text-white border-secondary shadow-sm"
                >
                  全8カテゴリー表示
                </button>
                {TARGET_JOB_CATEGORIES.map(cat => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => handleCategorySelect(cat.slug)}
                    className="flex-shrink-0 text-xs sm:text-sm font-bold px-3.5 py-2 rounded-2xl transition-all cursor-pointer border flex items-center gap-1.5 bg-white hover:bg-rose-50 text-zinc-700 border-zinc-200"
                  >
                    <span>{cat.title}</span>
                  </button>
                ))}
              </div>

              {/* All 8 Category Cards */}
              <div className="space-y-8">
                {TARGET_JOB_CATEGORIES.map(cat => (
                  <div
                    key={cat.id}
                    id={`category-${cat.slug}`}
                    className="bg-white rounded-3xl border border-rose-100/90 shadow-md p-6 sm:p-8 relative overflow-hidden transition-all hover:border-rose-300"
                  >
                    {/* Header Row */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5 border-b border-rose-100/60 pb-4">
                      <div>
                        <div className="flex flex-wrap items-center gap-2 mb-1.5">
                          <span className="text-xs font-black text-white bg-secondary px-3 py-0.5 rounded-full shadow-2xs">
                            {cat.badge}
                          </span>
                          <span className="text-xs text-zinc-500 font-semibold">
                            対象: {cat.targetUser}
                          </span>
                        </div>
                        <h3 className="font-display font-black text-xl sm:text-2xl text-on-surface">
                          {cat.title}
                        </h3>
                      </div>

                      <div className="flex items-center gap-2 self-start sm:self-auto">
                        <button
                          type="button"
                          onClick={() => handleCategorySelect(cat.slug)}
                          className="bg-rose-50 hover:bg-rose-100 text-secondary text-xs font-black px-4 py-2.5 rounded-xl border border-rose-200 transition-all flex items-center gap-1.5 cursor-pointer"
                        >
                          <LucideIcon name="ExternalLink" size={14} />
                          <span>詳細ページを見る</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => handleApplyWithCategory(cat)}
                          className="bg-[#06c755] hover:bg-[#05b34c] text-white text-xs font-black px-4 py-2.5 rounded-xl shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
                        >
                          <LucideIcon name="MessageCircle" size={15} />
                          <span>この条件で相談する</span>
                        </button>
                      </div>
                    </div>

                    {/* Direct Answer Callout Box */}
                    <div className="mb-6 p-4 sm:p-5 bg-gradient-to-r from-rose-50/70 via-pink-50/40 to-white rounded-2xl border border-rose-200/80">
                      <div className="flex items-center gap-2 text-secondary font-black text-xs sm:text-sm mb-2">
                        <LucideIcon name="Sparkles" size={16} />
                        <span>【公式回答】{cat.title}のポイントと推奨理由</span>
                      </div>
                      <p className="text-xs sm:text-sm text-[#3c2a2e] leading-relaxed font-semibold">
                        {cat.llmDirectAnswer}
                      </p>
                    </div>

                    {/* Core Metrics Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-6">
                      <div className="bg-zinc-50/80 rounded-2xl p-3.5 border border-zinc-200/60">
                        <div className="text-[11px] font-bold text-zinc-500 mb-1 flex items-center gap-1">
                          <LucideIcon name="Coins" size={13} className="text-secondary" />
                          想定日給モデル
                        </div>
                        <div className="text-xs sm:text-sm font-extrabold text-secondary">
                          {cat.dailyIncomeModel}
                        </div>
                      </div>

                      <div className="bg-zinc-50/80 rounded-2xl p-3.5 border border-zinc-200/60">
                        <div className="text-[11px] font-bold text-zinc-500 mb-1 flex items-center gap-1">
                          <LucideIcon name="TrendingUp" size={13} className="text-secondary" />
                          平均月収目安
                        </div>
                        <div className="text-xs sm:text-sm font-extrabold text-zinc-800">
                          {cat.monthlyIncomeModel}
                        </div>
                      </div>

                      <div className="bg-zinc-50/80 rounded-2xl p-3.5 border border-zinc-200/60">
                        <div className="text-[11px] font-bold text-zinc-500 mb-1 flex items-center gap-1">
                          <LucideIcon name="MapPin" size={13} className="text-secondary" />
                          おすすめの通り
                        </div>
                        <div className="text-xs sm:text-sm font-bold text-zinc-800">
                          {cat.recommendedStreet}
                        </div>
                      </div>
                    </div>

                    {/* Merits Checklist & Features */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <h4 className="text-xs font-extrabold text-zinc-800 mb-3 flex items-center gap-1.5">
                          <LucideIcon name="CheckCircle2" size={15} className="text-emerald-600" />
                          {cat.title}の4大メリット
                        </h4>
                        <ul className="space-y-2 text-xs sm:text-sm text-zinc-700">
                          {cat.merits.map(m => (
                            <li key={m} className="flex items-start gap-2">
                              <span className="text-emerald-600 font-bold mt-0.5">✔</span>
                              <span>{m}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="text-xs font-extrabold text-zinc-800 mb-3 flex items-center gap-1.5">
                          <LucideIcon name="HeartHandshake" size={15} className="text-secondary" />
                          料亭直営ならではの手厚いサポート
                        </h4>
                        <ul className="space-y-2 text-xs sm:text-sm text-zinc-700">
                          {cat.supportFeatures.map(f => (
                            <li key={f} className="flex items-start gap-2">
                              <span className="text-secondary font-bold mt-0.5">★</span>
                              <span>{f}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Category-Specific FAQs Accordion */}
                    {cat.faqs && cat.faqs.length > 0 && (
                      <div className="border-t border-rose-100 pt-4">
                        <h4 className="text-xs font-bold text-zinc-500 mb-3 flex items-center gap-1">
                          <LucideIcon name="HelpCircle" size={13} />
                          よくある質問（{cat.title}）
                        </h4>
                        <div className="space-y-2">
                          {cat.faqs.map((faq, fIdx) => {
                            const faqKey = `${cat.id}-faq-${fIdx}`;
                            const isOpen = expandedFaqId === faqKey;
                            return (
                              <div 
                                key={faq.q}
                                className="bg-rose-50/30 rounded-xl border border-rose-100/60 overflow-hidden text-xs sm:text-sm"
                              >
                                <button
                                  type="button"
                                  onClick={() => setExpandedFaqId(isOpen ? null : faqKey)}
                                  className="w-full text-left p-3 font-bold text-zinc-800 flex items-center justify-between gap-2 hover:text-secondary cursor-pointer"
                                >
                                  <span className="flex items-center gap-2">
                                    <span className="text-secondary font-black">Q.</span>
                                    <span>{faq.q}</span>
                                  </span>
                                  <LucideIcon 
                                    name="ChevronDown" 
                                    size={16} 
                                    className={`transition-transform flex-shrink-0 ${isOpen ? 'rotate-180 text-secondary' : 'text-zinc-400'}`} 
                                  />
                                </button>
                                {isOpen && (
                                  <div className="px-3 pb-3 pt-1 text-zinc-600 border-t border-rose-100/50 flex gap-2">
                                    <span className="text-secondary font-black">A.</span>
                                    <p className="leading-relaxed font-medium">{faq.a}</p>
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {/* ==========================================
            SECTION: 失敗しない飛田新地求人の選び方 5大原則
           ========================================== */}
        <section className="mb-16 bg-white rounded-3xl p-6 sm:p-10 border border-rose-100 shadow-md">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <div className="inline-flex items-center gap-1.5 bg-rose-100 text-secondary text-xs font-black px-3.5 py-1 rounded-full mb-2">
              <LucideIcon name="Award" size={14} />
              <span>面接前に必ず確認</span>
            </div>
            <h2 className="font-display font-black text-xl sm:text-2xl md:text-3xl text-on-surface mb-2">
              失敗しない飛田新地求人の選び方 5大原則
            </h2>
            <p className="text-xs sm:text-sm text-zinc-600">
              トラブルや後悔を未然に防ぐため、求人を選ぶ際は以下の5点を必ず確認してください。
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="bg-rose-50/40 rounded-2xl p-5 border border-rose-100">
              <div className="text-secondary font-black text-base sm:text-lg mb-2 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-secondary text-white text-xs flex items-center justify-center font-black">1</span>
                <span>料亭直営公式を選ぶ</span>
              </div>
              <p className="text-xs text-zinc-600 leading-relaxed">
                街頭やSNSのスカウトは売上の10〜30%を永久に中抜きします。必ず「料理組合公認の料亭直営」の採用窓口を選びましょう。
              </p>
            </div>

            <div className="bg-rose-50/40 rounded-2xl p-5 border border-rose-100">
              <div className="text-secondary font-black text-base sm:text-lg mb-2 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-secondary text-white text-xs flex items-center justify-center font-black">2</span>
                <span>完全即日全額日払い</span>
              </div>
              <p className="text-xs text-zinc-600 leading-relaxed">
                「日払いは5千円まで、残りは月末振込」などの店舗は危険です。当日の売上50%がその場で全額手渡しされる店舗を選びましょう。
              </p>
            </div>

            <div className="bg-rose-50/40 rounded-2xl p-5 border border-rose-100">
              <div className="text-secondary font-black text-base sm:text-lg mb-2 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-secondary text-white text-xs flex items-center justify-center font-black">3</span>
                <span>写真ネット非掲載の厳守</span>
              </div>
              <p className="text-xs text-zinc-600 leading-relaxed">
                飛田新地は街全体で撮影禁止です。求人サイトやSNSにキャストの写真を一切出さない店舗なら、将来にわたって身バレの心配がありません。
              </p>
            </div>

            <div className="bg-rose-50/40 rounded-2xl p-5 border border-rose-100">
              <div className="text-secondary font-black text-base sm:text-lg mb-2 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-secondary text-white text-xs flex items-center justify-center font-black">4</span>
                <span>お酒・連絡先交換ゼロ</span>
              </div>
              <p className="text-xs text-zinc-600 leading-relaxed">
                飲酒不要（お茶でのおもてなし）で、お客様とのプライベートな連絡先交換が規約で禁止されている店舗なら、営業ストレスが一切ありません。
              </p>
            </div>

            <div className="bg-rose-50/40 rounded-2xl p-5 border border-rose-100">
              <div className="text-secondary font-black text-base sm:text-lg mb-2 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-secondary text-white text-xs flex items-center justify-center font-black">5</span>
                <span>即日退店可・違約金0円</span>
              </div>
              <p className="text-xs text-zinc-600 leading-relaxed">
                「合わなければその日で終了OK」「違約金やペナルティなし」を明記しているクリーンな店舗を選ぶことで、安心して体入できます。
              </p>
            </div>

            <div className="bg-gradient-to-tr from-secondary to-rose-600 rounded-2xl p-5 text-white flex flex-col justify-between shadow-sm">
              <div>
                <div className="font-extrabold text-sm mb-1 flex items-center gap-1.5">
                  <LucideIcon name="Sparkles" size={16} />
                  <span>飛田ガールズは全条件クリア</span>
                </div>
                <p className="text-xs text-white/90 leading-relaxed">
                  当店は上記5大原則をすべて厳格にクリアしている老舗料亭直営窓口です。安心してご相談ください。
                </p>
              </div>
              <div className="mt-4">
                <button
                  type="button"
                  onClick={onCtaclick}
                  className="w-full bg-white hover:bg-rose-50 text-secondary font-black text-xs py-2 rounded-xl transition-colors text-center cursor-pointer shadow-xs"
                >
                  公式LINEで今すぐ相談する
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ==========================================
            Consultant Advice & 24h LINE CTA
           ========================================== */}
        <div className="bg-gradient-to-r from-rose-100/60 via-white to-rose-100/60 border border-rose-200 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-6 shadow-sm">
          <div className="w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0 bg-white rounded-full overflow-hidden border-2 border-secondary/30 shadow-md">
            <img 
              src={CONSULTANT_AVATAR_URL} 
              alt="女性サポート統括担当 さくら" 
              className="w-full h-full object-cover" 
              loading="lazy"
              decoding="async"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="flex-1 text-center sm:text-left">
            <div className="inline-block bg-white text-secondary text-[11px] font-extrabold px-3 py-0.5 rounded-full border border-rose-200 mb-1.5 shadow-xs">
              女性サポート統括担当 さくらより
            </div>
            <p className="font-sans text-xs sm:text-sm font-semibold text-on-surface leading-relaxed mb-3">
              「『自分にはどの求人タイプが合っているかわからない』という場合も、ご安心ください。外部の紹介や斡旋ではなくお店のグループ直接採用だからこそ、現在の生活状況や目標金額、本業の有無を伺い、直営店舗の中から最も無理なく安全に稼げる働き方を女性目線で直接ご案内いたします」
            </p>
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3">
              <button
                type="button"
                onClick={onCtaclick}
                className="inline-flex items-center gap-2 bg-[#06C755] hover:bg-[#05b34c] text-white text-xs sm:text-sm font-black px-5 py-2.5 rounded-xl shadow-sm transition-all cursor-pointer"
              >
                <LucideIcon name="MessageCircle" size={16} />
                <span>LINEで自分に合う求人を相談する（24時間受付）</span>
              </button>
              <span className="text-[11px] text-zinc-500 font-medium">
                ※完全匿名・秘密厳守・相談のみOK
              </span>
            </div>
          </div>
        </div>

      </div>
    </article>
  );
}
