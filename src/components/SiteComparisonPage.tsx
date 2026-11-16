/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect } from 'react';
import LucideIcon from './LucideIcon';
import {
  SITE_COMPARISON_ROWS,
  INDUSTRY_COMPARISONS,
  ComparisonRow
} from '../compareData';
import { updatePageJsonLd } from '../utils/jsonLd';

interface SiteComparisonPageProps {
  onNavigateHome: () => void;
  onNavigateCompare: () => void;
  onCtaclick: () => void;
}

export default function SiteComparisonPage({
  onNavigateHome,
  onNavigateCompare,
  onCtaclick
}: SiteComparisonPageProps) {
  useEffect(() => {
    const title = '飛田新地求人サイト徹底比較｜料亭直営・スカウト・他業種との違い【公式】';
    const description =
      '飛田新地料亭直営公式求人「飛田ガールズ」と街頭・SNSスカウト業者、他求人サイト、他業種ナイトワーク（ソープ・デリヘル・キャバクラ）を報酬・日払い・お酒・身バレ対策で徹底比較。';
    const canonicalUrl = 'https://tobitashinchi-recruit.com/site-compare';

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
          dateModified: '2026-11-15',
          inLanguage: 'ja-JP',
          isPartOf: {
            '@id': 'https://tobitashinchi-recruit.com/#website'
          },
          publisher: {
            '@id': 'https://tobitashinchi-recruit.com/#organization'
          },
          speakable: {
            '@type': 'SpeakableSpecification',
            cssSelector: ['h1', '#industry-comparison', '#site-comparison-matrix']
          }
        },
        {
          '@type': 'BreadcrumbList',
          '@id': `${canonicalUrl}#breadcrumb`,
          itemListElement: [
            {
              '@type': 'ListItem',
              position: 1,
              name: '飛田新地求人トップ',
              item: 'https://tobitashinchi-recruit.com/'
            },
            {
              '@type': 'ListItem',
              position: 2,
              name: '飛田新地求人サイト徹底比較',
              item: canonicalUrl
            }
          ]
        },
        {
          '@type': 'Dataset',
          '@id': `${canonicalUrl}#dataset`,
          name: '飛田新地求人サイト・応募方法・他業種比較データ',
          description:
            '飛田新地の料亭直営求人と他業種（ソープ・デリヘル・キャバクラ）・他応募ルート（スカウト・他求人サイト）について、接客時間・日給目安・お酒や営業連絡の有無・身バレ対策を比較したデータです。',
          url: canonicalUrl,
          dateModified: '2026-11-15',
          inLanguage: 'ja-JP',
          isAccessibleForFree: true,
          keywords: ['飛田新地求人サイト徹底比較', '他業種比較', '応募方法', 'スカウト注意', '料亭直営'],
          creator: {
            '@type': 'Organization',
            '@id': 'https://tobitashinchi-recruit.com/#organization',
            name: '飛田ガールズ（料亭直営求人・女性採用サポート）',
            url: 'https://tobitashinchi-recruit.com/'
          }
        }
      ]
    });
  }, []);

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
          <span className="inline-flex items-center gap-1 bg-amber-100 text-amber-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">
            <span className="text-sm">△</span> 普通・注意
          </span>
        );
      case 'poor':
        return (
          <span className="inline-flex items-center gap-1 bg-rose-100 text-rose-800 text-xs font-bold px-2.5 py-0.5 rounded-full">
            <span className="text-sm">✕</span> 不利・危険
          </span>
        );
    }
  };

  return (
    <article className="min-h-screen bg-gradient-to-b from-rose-50/40 via-white to-rose-50/30 pt-24 pb-20 font-sans text-on-surface">
      <div className="max-w-[1100px] mx-auto px-4 sm:px-6">
        {/* Breadcrumb Navigation */}
        <nav aria-label="パンくずリスト" className="mb-6 flex flex-wrap items-center gap-2 text-xs text-zinc-500">
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              onNavigateHome();
            }}
            className="hover:text-secondary transition-colors underline cursor-pointer"
          >
            飛田新地求人トップ（飛田ガールズ）
          </a>
          <span>/</span>
          <span className="text-zinc-800 font-bold">飛田新地求人サイト徹底比較</span>
        </nav>

        {/* Hero Header */}
        <header className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 bg-rose-100 text-secondary text-xs sm:text-sm font-black px-4 py-1.5 rounded-full mb-4 shadow-xs">
            <LucideIcon name="Scale" size={16} />
            <span>2026年最新版｜応募方法・他業種比較</span>
          </div>

          <h1 className="font-display font-extrabold text-2xl sm:text-3xl md:text-4xl text-on-surface leading-tight mb-4">
            飛田新地求人サイト徹底比較
          </h1>

          <p className="font-sans text-xs sm:text-sm md:text-base text-zinc-600 leading-relaxed max-w-2xl mx-auto mb-6">
            飛田新地での働き方と他のナイトワーク業種（ソープ・デリヘル・キャバクラ）の違いや、料亭直営公式窓口（飛田ガールズ）・スカウト業者・他求人サイトの応募ルートごとの違いを分かりやすく比較しています。
          </p>

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
              ネット写真掲載ゼロ
            </span>
            <span className="bg-white border border-rose-200 text-zinc-700 px-3 py-1 rounded-full font-bold shadow-2xs flex items-center gap-1">
              <LucideIcon name="Ban" size={14} className="text-secondary" />
              お酒・連絡先交換一切不要
            </span>
          </div>
        </header>

        {/* INDUSTRY COMPARISON: 飛田新地 vs 他ナイトワーク（ソープ・デリヘル・キャバクラ） */}
        <section className="mb-16 md:mb-20" id="industry-comparison">
          <div className="flex items-center justify-between gap-3 mb-6">
            <div>
              <div className="text-xs font-extrabold text-secondary tracking-wider mb-1 flex items-center gap-1.5">
                <LucideIcon name="Layers" size={14} />
                <span>INDUSTRY COMPARISON</span>
              </div>
              <h2 className="font-display font-black text-xl sm:text-2xl md:text-3xl text-on-surface">
                飛田新地 vs 他業種（ソープ・デリヘル・キャバクラ）比較
              </h2>
            </div>
            <span className="hidden sm:inline-block text-xs bg-rose-50 text-secondary border border-rose-200 px-3 py-1 rounded-full font-semibold">
              ※横スクロールで全体確認
            </span>
          </div>

          <div className="bg-white rounded-3xl border border-rose-100 shadow-md overflow-hidden">
            <div className="overflow-x-auto scrollbar-thin">
              <table className="w-full text-left border-collapse min-w-[850px]">
                <thead>
                  <tr className="border-b border-rose-100 bg-rose-50/40">
                    <th className="p-4 text-xs font-bold text-zinc-600 w-[180px]">業種・お仕事形態</th>
                    <th className="p-4 text-xs font-bold text-zinc-600">1回の接客時間</th>
                    <th className="p-4 text-xs font-bold text-zinc-600">お酒・営業連絡</th>
                    <th className="p-4 text-xs font-bold text-zinc-600">日給目安・支払い</th>
                    <th className="p-4 text-xs font-bold text-zinc-600">身体への負担・入浴</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-rose-50 text-xs sm:text-sm">
                  {INDUSTRY_COMPARISONS.map((item, i) => {
                    const isTobita = i === 0;
                    return (
                      <tr key={i} className={isTobita ? 'bg-rose-50/30' : 'hover:bg-zinc-50/60'}>
                        <td className="p-4 font-bold text-zinc-900">
                          <div className="flex items-center gap-1.5 mb-1">
                            <span>{item.industry}</span>
                            {isTobita && (
                              <span className="text-[10px] bg-secondary text-white px-2 py-0.5 rounded-full font-bold">
                                当サイト
                              </span>
                            )}
                          </div>
                          <span className="text-[11px] text-zinc-500 font-normal block">
                            {item.workStyle}
                          </span>
                        </td>
                        <td className="p-4 text-zinc-700">
                          <span className={`font-bold ${isTobita ? 'text-secondary' : ''}`}>
                            {item.timePerCustomer}
                          </span>
                        </td>
                        <td className="p-4 text-zinc-700">
                          <div>お酒: <span className="font-semibold">{item.alcohol}</span></div>
                          <div className="mt-0.5 text-zinc-500 text-xs">営業LINE: {item.salesLineContact}</div>
                        </td>
                        <td className="p-4 text-zinc-700">
                          <span className="font-bold text-zinc-900 block">{item.dailyIncome}</span>
                        </td>
                        <td className="p-4 text-zinc-700">
                          <span className="leading-relaxed">{item.showerLabor}</span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* SECTION 1: 飛田新地求人サイト・応募方法 4者徹底比較表 */}
        <section className="mb-16 md:mb-20" id="site-comparison-matrix">
          <div className="flex items-center justify-between gap-3 mb-6">
            <div>
              <div className="text-xs font-extrabold text-secondary tracking-wider mb-1 flex items-center gap-1.5">
                <LucideIcon name="Table" size={14} />
                <span>応募方法の違いを比較</span>
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
              <table className="w-full text-left border-collapse min-w-[900px]">
                <thead>
                  <tr className="border-b border-rose-100">
                    <th className="p-4 bg-zinc-50 font-bold text-xs sm:text-sm text-zinc-600 w-[16%] min-w-[130px] sticky left-0 z-10 border-r border-rose-100/60">
                      比較項目
                    </th>
                    <th className="p-4 bg-rose-500 text-white font-extrabold text-xs sm:text-sm w-[28%] min-w-[220px] shadow-xs border-r border-rose-600/40">
                      <div className="flex items-center gap-1.5">
                        <LucideIcon name="Award" size={16} className="text-yellow-300 flex-shrink-0" />
                        <span>【公式】飛田ガールズ（料亭直営）</span>
                      </div>
                    </th>
                    <th className="p-4 bg-zinc-100 font-bold text-xs sm:text-sm text-zinc-700 w-[18.66%] min-w-[180px] border-r border-zinc-200/60">
                      SNS・街頭スカウト業者
                    </th>
                    <th className="p-4 bg-zinc-50 font-bold text-xs sm:text-sm text-zinc-700 w-[18.66%] min-w-[180px] border-r border-zinc-200/60">
                      他求人サイト（飛田ジョブなど）
                    </th>
                    <th className="p-4 bg-zinc-100 font-bold text-xs sm:text-sm text-zinc-700 w-[18.66%] min-w-[180px]">
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
                      <td className="p-4 font-bold text-zinc-800 bg-inherit sticky left-0 z-10 border-r border-rose-100/60 min-w-[130px]">
                        {row.criteria}
                      </td>
                      <td className="p-4 bg-rose-50/40 border-r border-rose-200/60 font-semibold text-[#3c2a2e] min-w-[220px]">
                        <div className="mb-1.5">
                          {renderGradeBadge(row.ourShop.grade)}
                        </div>
                        <p className="leading-snug font-medium text-xs sm:text-sm">
                          {row.ourShop.text}
                        </p>
                      </td>
                      <td className="p-4 text-zinc-600 border-r border-zinc-200/60 min-w-[180px]">
                        <div className="mb-1.5">
                          {renderGradeBadge(row.scoutAgency.grade)}
                        </div>
                        <p className="leading-snug text-xs sm:text-sm text-zinc-600">
                          {row.scoutAgency.text}
                        </p>
                      </td>
                      <td className="p-4 text-zinc-600 border-r border-zinc-200/60 min-w-[180px]">
                        <div className="mb-1.5">
                          {renderGradeBadge(row.generalPortal.grade)}
                        </div>
                        <p className="leading-snug text-xs sm:text-sm text-zinc-600">
                          {row.generalPortal.text}
                        </p>
                      </td>
                      <td className="p-4 text-zinc-600 min-w-[180px]">
                        <div className="mb-1.5">
                          {renderGradeBadge(row.otherNightwork.grade)}
                        </div>
                        <p className="leading-snug text-xs sm:text-sm text-zinc-600">
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
                  スカウトを通すと、あなたの売上から毎月10〜30%が「紹介料」として永久に天引きされます。また個人情報の流出や退職時の脅迫トラブルも後を絶ちません。飛田新地は<strong>料理組合公認の料亭直営公式採用（飛田ガールズ）</strong>から応募することで、仲介手数料ゼロ・売上完全50%日払いが保証されます。
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Cross-Links & Consultation CTA */}
        <section className="bg-white rounded-3xl border border-rose-100 shadow-sm p-6 sm:p-8 text-center">
          <h2 className="font-display font-black text-lg sm:text-2xl text-on-surface mb-3">
            希望や条件に合わせて働き方を選びませんか？
          </h2>
          <p className="text-xs sm:text-sm text-zinc-600 max-w-2xl mx-auto leading-relaxed mb-6">
            未経験・高収入・週1日・短期出稼ぎ・Wワークなど、目的に合わせた詳しい条件やサポート内容もご確認いただけます。気になることがあれば、公式LINEからいつでも相談できます。
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href="/compare"
              onClick={(e) => {
                e.preventDefault();
                onNavigateCompare();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-rose-50 hover:bg-rose-100 text-secondary border border-rose-200 font-bold text-xs sm:text-sm px-6 py-3.5 rounded-2xl transition-colors cursor-pointer"
            >
              <LucideIcon name="Target" size={16} />
              <span>あなたに最適な働き方・目的別求人を見る</span>
            </a>
            <button
              type="button"
              onClick={onCtaclick}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#06C755] hover:bg-[#05b34c] text-white font-black text-xs sm:text-sm px-7 py-3.5 rounded-2xl shadow-md transition-all cursor-pointer"
            >
              <LucideIcon name="MessageCircle" size={18} />
              <span>LINEで無料相談してみる</span>
            </button>
          </div>
        </section>
      </div>
    </article>
  );
}
