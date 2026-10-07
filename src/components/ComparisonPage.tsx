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
import { FAQ_100_LIST, FAQ_8_CATEGORIES, FAQ100Item } from '../faq100Data';
import CompareDiagnostic from './CompareDiagnostic';

const CATEGORY_SALARY_SCHEMA: Record<string, { min: number; max: number; employmentType: string }> = {
  'inexperienced': { min: 30000, max: 65000, employmentType: 'PART_TIME' },
  'high-income': { min: 60000, max: 150000, employmentType: 'PART_TIME' },
  'weekly-1': { min: 35000, max: 80000, employmentType: 'PART_TIME' },
  'short-term': { min: 50000, max: 120000, employmentType: 'TEMPORARY' },
  'dormitory': { min: 40000, max: 90000, employmentType: 'PART_TIME' },
  'double-work': { min: 35000, max: 70000, employmentType: 'PART_TIME' },
  'age-20s': { min: 45000, max: 110000, employmentType: 'PART_TIME' },
  'age-30s': { min: 40000, max: 90000, employmentType: 'PART_TIME' }
};

const COMPARE_PAGE_FAQS = [
  {
    q: '本当に自分でもできますか？未経験でも大丈夫？',
    a: '在籍しているキャスト女性の90%以上がナイトワーク完全未経験からのスタートです。難しい専門知識やテクニックは一切不要で、お茶出しと笑顔でのおもてなしができれば問題ありません。初日の就業前に専任の女性スタッフが約30分かけて丁寧にレクチャーしますので、安心してご応募ください。'
  },
  {
    q: '怖くないですか？無理なことを強要されたりしませんか？',
    a: '飛田新地は料理組合の厳格な自主ルールと女性保護規約のもとで運営されています。嫌なお客様や無理な要求はきっぱりとお断りできます。各部屋に防犯設備が完備されており、仲居さん（おばちゃん）がすぐ近くに常駐しているため、一般的な風俗店よりも圧倒的に安全な環境です。'
  },
  {
    q: '身バレが心配です。写真がネットに出たり家族にバレたりしませんか？',
    a: '飛田新地は街全体で一般人の撮影が完全禁止されており、求人サイトやSNS等への写真掲載も100%ありません。お仕事は完全源氏名（偽名）で行い、私服通勤のため、街の外で身バレするリスクはありません。また確定申告時の普通徴収（会社や家族に通知がいかない手続き）も丁寧にサポートしています。'
  },
  {
    q: 'お酒が全く飲めないのですが働けますか？',
    a: 'はい、全く問題ありません！飛田新地のおもてなしはお茶やジュースなどのソフトドリンクで行うため、お酒を飲む必要は一切ありません。二日酔いや体調不良の心配がなく、翌日の昼職や大学、家庭の予定にも全く支障が出ません。'
  },
  {
    q: 'いきなり応募・面接を決めなくても、まずは相談だけできますか？',
    a: 'もちろん大歓迎です！「週1日でも大丈夫？」「未経験だけど稼げる？」「寮の空き状況を知りたい」など、疑問や不安の質問だけでも親身に対応いたします。条件や環境を確認してから、自分に合うかどうかじっくりご検討いただけます。'
  },
  {
    q: '体験入店してみて、自分に合わなかったら断れますか？',
    a: 'はい、もちろん断っていただけます。当日働いた分の売上50%はその場で全額手渡しで受け取ることができ、「合わなかった」「自分には難しそう」と感じた場合はその日のうちに終了可能です。違約金・ペナルティ・無理な引き止めは一切ありませんのでご安心ください。'
  }
];

const ONBOARDING_FLOW_STEPS = [
  {
    step: '01',
    title: '公式LINEで気軽にお問い合わせ',
    desc: '完全匿名でOK。「質問だけ」「条件の確認だけ」も大歓迎です。24時間いつでも女性スタッフが丁寧に対応します。',
    icon: 'MessageCircle'
  },
  {
    step: '02',
    title: '私服で店舗見学・カウンセリング',
    desc: '履歴書不要・手ぶらでOK。お店の雰囲気や控え室を実際に見学し、希望のシフトや不安な点をゆっくり相談できます。',
    icon: 'Coffee'
  },
  {
    step: '03',
    title: 'お試し体験入店（体入）',
    desc: '着物や衣装・ヘアメイクはすべて無料レンタル。仲居さんが隣でサポートしながら、無理のないペースでお仕事開始。',
    icon: 'Sparkles'
  },
  {
    step: '04',
    title: '売上50%を即日全額現金手渡し',
    desc: 'その日のお仕事終了後、当日の売上50%を全額その場で現金手渡し支給。引かれ物やピンハネは一切ありません。',
    icon: 'Coins'
  },
  {
    step: '05',
    title: '継続または終了の自由選択',
    desc: '「自分に合っている」と思えばそのまま本入店へ。もし合わなければその日だけで終了しても違約金・ペナルティは0円です。',
    icon: 'CheckCircle2'
  }
];

const SPEC_ROWS = [
  { label: '職種', val: '料亭接客キャスト（和室でのお茶出し・おもてなし会話）' },
  { label: '応募資格', val: '20歳以上の健康な女性（※料理組合自主規制により20歳未満不可／未経験歓迎・経験者優遇）' },
  { label: '給与システム', val: '売上50%完全バック（想定日給 30,000円〜150,000円以上）完全即日全額現金手渡し' },
  { label: '勤務時間', val: '10:00〜24:00の間で完全自由出勤（1日3時間〜、昼シフト・夜シフト・終電上がりOK）' },
  { label: '勤務日数', val: '週1日〜・月数日・週末のみ・短期出稼ぎ・長期レギュラーいずれも自由' },
  { label: '勤務地', val: '大阪府大阪市西成区山王（飛田新地 料理組合公認料亭街）' },
  { label: '最寄り駅', val: '地下鉄「動物園前駅」徒歩5分 / JR・近鉄「天王寺駅」徒歩10分 / JR「新今宮駅」徒歩7分' },
  { label: '待遇・福利厚生', val: '即入居可の家具家電付き個室マンション寮完備、地方からの往復交通費全額支給、衣装・着物・ヘアメイク無料、写真ネット非掲載厳守、お酒不要、ノルマ・違約金完全0円' },
  { label: '持参書類', val: '公的身分証明書（本籍地記載の住民票原本、またはパスポート等の年齢確認書類）※履歴書は不要です' }
];

interface ComparisonPageProps {
  onNavigateHome: () => void;
  onNavigateBlog: () => void;
  onNavigateFaq?: (category?: string) => void;
  onCtaclick: () => void;
  onInjectedScroll?: (message: string) => void;
  initialCategorySlug?: string | null;
  onSelectCategorySlug?: (slug: string) => void;
}

export default function ComparisonPage({
  onNavigateHome,
  onNavigateBlog,
  onNavigateFaq,
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
  const [faqCategory, setFaqCategory] = useState<string>('featured');
  const [faqSearchQuery, setFaqSearchQuery] = useState<string>('');
  const [visibleFaqCount, setVisibleFaqCount] = useState<number>(8);

  const filteredFaqs = useMemo(() => {
    if (faqCategory === 'featured' && !faqSearchQuery.trim()) {
      return null;
    }

    const query = faqSearchQuery.trim().toLowerCase();
    let list: FAQ100Item[] = FAQ_100_LIST;

    if (faqCategory !== 'all' && faqCategory !== 'featured') {
      list = list.filter(item => item.eightCategory === faqCategory);
    }

    if (query) {
      list = list.filter(item => 
        item.question.toLowerCase().includes(query) ||
        item.answer.toLowerCase().includes(query) ||
        (item.keywords && item.keywords.some(k => k.toLowerCase().includes(query))) ||
        (item.categoryLabel && item.categoryLabel.toLowerCase().includes(query))
      );
    }

    return list;
  }, [faqCategory, faqSearchQuery]);

  // Sync internal state when initialCategorySlug changes from outside (URL change, back/forward)
  useEffect(() => {
    if (initialCategorySlug) {
      setSelectedTargetSlug(initialCategorySlug);
    } else {
      setSelectedTargetSlug('all');
    }
  }, [initialCategorySlug]);

  // Dynamically update document title, description and canonical URL based on selected category
  useEffect(() => {
    let title = '飛田新地求人サイト比較＆目的・属性別求人ガイド【2026年最新】｜飛田ガールズ';
    let description = '飛田新地料亭直営公式求人と街頭スカウト業者・他求人サイト（飛田ジョブなど）の4者徹底比較。安心の料亭直営で即日全額日払い・身バレ完全防止。';
    let canonicalUrl = 'https://tobitashinchi-recruit.com/compare';

    if (selectedTargetSlug && selectedTargetSlug !== 'all') {
      const cat = TARGET_JOB_CATEGORIES.find(c => c.slug === selectedTargetSlug);
      if (cat) {
        title = `${cat.title}｜飛田新地料亭直営公式 飛田ガールズ`;
        description = cat.summary || `${cat.title}についての求人情報・給与・勤務条件・安全対策を詳しく解説。`;
        canonicalUrl = `https://tobitashinchi-recruit.com/compare/${cat.slug}`;
      }
    }
    document.title = title;

    // Update meta description
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', description);
    }
    // Update canonical link
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (canonicalLink) {
      canonicalLink.setAttribute('href', canonicalUrl);
    } else {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      canonicalLink.setAttribute('href', canonicalUrl);
      document.head.appendChild(canonicalLink);
    }
    // Update og:url and og:title
    const ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) ogUrl.setAttribute('content', canonicalUrl);
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', title);
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
      const salaryConfig = (singleCat && CATEGORY_SALARY_SCHEMA[singleCat.slug]) || {
        min: 30000,
        max: 100000,
        employmentType: 'PART_TIME'
      };

      const schemaData = singleCat ? {
        '@context': 'https://schema.org',
        '@type': 'JobPosting',
        '@id': `https://tobitashinchi-recruit.com/compare/${singleCat.slug}#jobposting`,
        'title': singleCat.title,
        'description': `${singleCat.summary} ${singleCat.llmDirectAnswer}【飛田新地料理組合公認料亭直営 飛田ガールズ】全額日払い手渡し・ノルマ罰金一切なし・個室マンション寮完備・安心の女性スタッフサポート。`,
        'identifier': {
          '@type': 'PropertyValue',
          'name': '飛田ガールズ 料亭直営採用窓口',
          'value': `TOBITA-COMPARE-${singleCat.slug.toUpperCase()}`
        },
        'datePosted': '2026-10-01T00:00:00+09:00',
        'validThrough': '2027-12-31T23:59:59+09:00',
        'employmentType': salaryConfig.employmentType,
        'jobBenefits': [
          '即日全額日払い（手渡し支給）',
          '家具家電付きワンルーム個室寮完備（即入居可）',
          '衣装・ドレス・和装無料レンタル',
          '専任女性スタッフによる24時間サポート体制',
          'ノルマ・罰金・連絡先交換・お酒の強要一切なし',
          'プロによるヘアメイク・身だしなみサポート無料'
        ],
        'hiringOrganization': {
          '@type': 'Organization',
          'name': '飛田新地料理組合公認料亭直営 飛田ガールズ',
          'sameAs': 'https://tobitashinchi-recruit.com',
          'logo': 'https://tobitashinchi-recruit.com/favicon.svg'
        },
        'jobLocation': {
          '@type': 'Place',
          'address': {
            '@type': 'PostalAddress',
            'streetAddress': '山王3丁目',
            'addressLocality': '大阪市西成区',
            'addressRegion': '大阪府',
            'postalCode': '557-0001',
            'addressCountry': 'JP'
          }
        },
        'baseSalary': {
          '@type': 'MonetaryAmount',
          'currency': 'JPY',
          'value': {
            '@type': 'QuantitativeValue',
            'minValue': salaryConfig.min,
            'maxValue': salaryConfig.max,
            'unitText': 'DAY'
          }
        },
        'applicantLocationRequirements': {
          '@type': 'Country',
          'name': 'JP'
        },
        'workHours': singleCat.shiftExample || '10:00〜24:00（自由シフト制・週1日〜/1日3時間〜勤務可）',
        'qualifications': '20歳以上の女性（未経験歓迎・学歴経験不問 ※料理組合規約により20歳未満不可）',
        'directApply': true
      } : {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        '@id': 'https://tobitashinchi-recruit.com/compare',
        'name': '飛田新地求人サイト比較＆目的別求人ガイド【2026年最新】',
        'description': '飛田新地の料亭直営求人とスカウト業者・他求人サイト（飛田ジョブなど）の徹底比較。未経験、高収入、週1日、短期出稼ぎ、寮付き、Wワーク、20代、30代別の最適求人ガイド。',
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

  const handleConsultSituation = (situationTitle: string, customMessage?: string) => {
    const msg = customMessage || `【働き方診断：${situationTitle}の相談】\n「${situationTitle}」について興味があります。自分に合った働き方やシフト・給与について教えていただけますでしょうか？`;
    if (onInjectedScroll) {
      onInjectedScroll(msg);
    } else {
      onCtaclick();
    }
  };

  const handleScrollToSafety = () => {
    const el = document.getElementById('section-safety') || document.getElementById('section-benefits');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
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
                </div>
              )}
            </div>

            {/* Direct Consultation Box for Category */}
            <div className="bg-gradient-to-r from-rose-100/60 via-white to-rose-100/60 border border-rose-200 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-6 shadow-sm">
              <div className="w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0 bg-white rounded-full overflow-hidden border-2 border-secondary/30 shadow-md">
                <img 
                  src={CONSULTANT_AVATAR_URL} 
                  alt="女性サポート統括担当 さくら" 
                  className="w-full h-full object-cover" 
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="flex-1 text-center sm:text-left">
                <div className="inline-block bg-white text-secondary text-[11px] font-extrabold px-3 py-0.5 rounded-full border border-rose-200 mb-1.5 shadow-xs">
                  女性サポート統括担当 さくらより
                </div>
                <p className="font-sans text-xs sm:text-sm font-semibold text-on-surface leading-relaxed mb-3">
                  「『{currentCategory.title}』について、具体的な日給相場や勤務シフト、寮の空き状況など、どんな些細な疑問でも女性目線でお答えします。まずはLINEでお気軽にご相談くださいね。」
                </p>
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3">
                  <button
                    type="button"
                    onClick={() => handleApplyWithCategory(currentCategory)}
                    className="inline-flex items-center gap-2 bg-[#06C755] hover:bg-[#05b34c] text-white text-xs sm:text-sm font-black px-5 py-2.5 rounded-xl shadow-sm transition-all cursor-pointer"
                  >
                    <LucideIcon name="MessageCircle" size={16} />
                    <span>【公式LINE】{currentCategory.title}について相談する（24時間受付）</span>
                  </button>
                  <span className="text-[11px] text-zinc-500 font-medium">
                    ※完全匿名・秘密厳守・相談のみOK
                  </span>
                </div>
              </div>
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
                      スカウトを通すと、あなたの売上から毎月10〜30%が「紹介料」として永久に天引きされます。また個人情報の流出や退職時の脅迫トラブルも後を絶ちません。飛田新地は**料理組合公認の料亭直営公式採用（飛田ガールズ）**から応募することで、仲介手数料ゼロ・売上完全50%日払いが保証されます。
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* ========================================================
                働き方診断：「結局、自分にはどれが合ってる？」
               ======================================================== */}
            <CompareDiagnostic
              onSelectCategory={handleCategorySelect}
              onConsultLine={handleConsultSituation}
              onScrollToSafety={handleScrollToSafety}
            />

            {/* ========================================================
                1. 仕事内容
               ======================================================== */}
            <section className="mb-14 sm:mb-20 scroll-mt-24" id="section-job-details">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-7 h-7 rounded-full bg-secondary text-white text-xs font-black flex items-center justify-center shadow-xs">
                  1
                </span>
                <span className="text-secondary font-black text-xs sm:text-sm tracking-wider uppercase">
                  JOB DESCRIPTION
                </span>
              </div>
              <h2 className="font-display font-black text-xl sm:text-2xl md:text-3xl text-on-surface mb-3">
                1. 仕事内容｜お茶出しと和室での接客・お酒や営業は一切不要
              </h2>
              <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed max-w-3xl mb-8">
                飛田新地の料亭でのお仕事は、老舗料亭の和室（座敷）でお客様とお茶を飲みながら会話を楽しむ「おもてなし接客」です。
                お酒を飲む必要は一切なく、客引きや営業活動も不要。未経験の方でも自然体でスタートできます。
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-6">
                <div className="bg-white rounded-2xl p-5 sm:p-6 border border-rose-100 shadow-xs hover:border-rose-300 transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-rose-50 text-secondary flex items-center justify-center mb-3">
                    <LucideIcon name="Coffee" size={20} />
                  </div>
                  <h3 className="font-bold text-zinc-900 text-sm sm:text-base mb-1.5">
                    座敷でのお茶出し・和室接客
                  </h3>
                  <p className="text-xs text-zinc-600 leading-relaxed">
                    お酒を飲む必要は一切ありません。お茶やジュースでのおもてなしなので、二日酔いや体調不良の心配がなく、翌日の予定にも響きません。
                  </p>
                </div>

                <div className="bg-white rounded-2xl p-5 sm:p-6 border border-rose-100 shadow-xs hover:border-rose-300 transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-rose-50 text-secondary flex items-center justify-center mb-3">
                    <LucideIcon name="Clock" size={20} />
                  </div>
                  <h3 className="font-bold text-zinc-900 text-sm sm:text-base mb-1.5">
                    1回15〜20分の短時間接客
                  </h3>
                  <p className="text-xs text-zinc-600 leading-relaxed">
                    1人のお客様に対する接客時間はわずか15〜20分程度です。長時間の拘束やお風呂洗いなどの重労働・肉体疲労は一切ありません。
                  </p>
                </div>

                <div className="bg-white rounded-2xl p-5 sm:p-6 border border-rose-100 shadow-xs hover:border-rose-300 transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-rose-50 text-secondary flex items-center justify-center mb-3">
                    <LucideIcon name="UserCheck" size={20} />
                  </div>
                  <h3 className="font-bold text-zinc-900 text-sm sm:text-base mb-1.5">
                    客引き・営業活動ゼロ
                  </h3>
                  <p className="text-xs text-zinc-600 leading-relaxed">
                    玄関先でのお客様への声かけや呼び込み・案内は専任の仲居さん（おばちゃん）が全て行います。自分から営業するストレスはありません。
                  </p>
                </div>

                <div className="bg-white rounded-2xl p-5 sm:p-6 border border-rose-100 shadow-xs hover:border-rose-300 transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-rose-50 text-secondary flex items-center justify-center mb-3">
                    <LucideIcon name="ShieldCheck" size={20} />
                  </div>
                  <h3 className="font-bold text-zinc-900 text-sm sm:text-base mb-1.5">
                    女性保護と安心の防犯体制
                  </h3>
                  <p className="text-xs text-zinc-600 leading-relaxed">
                    全室に防犯設備完備。仲居さんがすぐ近くに控えており、料理組合の厳格な規約のもと、嫌なお客様や無理な要求はきっぱり拒否できます。
                  </p>
                </div>
              </div>

              {/* Anxiety Reassurance Box */}
              <div className="bg-gradient-to-r from-rose-50/70 via-pink-50/40 to-white rounded-2xl p-4 sm:p-5 border border-rose-200/80">
                <div className="flex items-start gap-3">
                  <span className="text-xl">💭</span>
                  <div>
                    <h4 className="font-bold text-xs sm:text-sm text-zinc-800 mb-1">
                      「本当に自分でもできる？未経験でも大丈夫？」
                    </h4>
                    <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
                      当店に在籍する女性の<strong>90%以上がナイトワーク未経験</strong>からのスタートです。
                      初日のお仕事前に専任の女性スタッフが約30分かけてお茶の出し方や立ち居振る舞いを丁寧にお教えしますので、特別な知識やスキルは一切不要です。
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* ========================================================
                2. 給料
               ======================================================== */}
            <section className="mb-14 sm:mb-20 scroll-mt-24" id="section-salary">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-7 h-7 rounded-full bg-secondary text-white text-xs font-black flex items-center justify-center shadow-xs">
                  2
                </span>
                <span className="text-secondary font-black text-xs sm:text-sm tracking-wider uppercase">
                  SALARY & EARNINGS
                </span>
              </div>
              <h2 className="font-display font-black text-xl sm:text-2xl md:text-3xl text-on-surface mb-3">
                2. 給料｜売上50%完全バック・全額即日手渡し日払い
              </h2>
              <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed max-w-3xl mb-8">
                料理組合公認の料亭直営公式採用だからこそ、スカウト業者や仲介会社のような紹介料ピンハネ（10〜30%搾取）は一切ありません。
                当日の売上折半（完全50%）がその場で全額現金手渡しされます。
              </p>

              {/* Stat Highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-6">
                <div className="bg-white rounded-2xl p-4 sm:p-5 border border-rose-100 shadow-xs text-center">
                  <div className="text-xs text-zinc-500 font-bold mb-1">想定日給目安</div>
                  <div className="text-xl sm:text-2xl font-black text-secondary">3万〜15万円超</div>
                  <div className="text-[11px] text-zinc-500 mt-1">平均日給 5万〜8万円</div>
                </div>
                <div className="bg-white rounded-2xl p-4 sm:p-5 border border-rose-100 shadow-xs text-center">
                  <div className="text-xs text-zinc-500 font-bold mb-1">給与バック率</div>
                  <div className="text-xl sm:text-2xl font-black text-zinc-900">完全 50%</div>
                  <div className="text-[11px] text-emerald-600 font-bold mt-1">仲介料・天引き0円</div>
                </div>
                <div className="bg-white rounded-2xl p-4 sm:p-5 border border-rose-100 shadow-xs text-center">
                  <div className="text-xs text-zinc-500 font-bold mb-1">支給タイミング</div>
                  <div className="text-xl sm:text-2xl font-black text-secondary">即日全額手渡し</div>
                  <div className="text-[11px] text-zinc-500 mt-1">退勤時にその場で支給</div>
                </div>
              </div>

              {/* Monthly Income Models */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-rose-100 shadow-sm mb-6">
                <h3 className="font-bold text-sm sm:text-base text-zinc-900 mb-4 flex items-center gap-2">
                  <LucideIcon name="TrendingUp" size={18} className="text-secondary" />
                  <span>働き方別の月収モデル例</span>
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-rose-50/40 rounded-2xl p-4 border border-rose-100">
                    <div className="text-xs font-black text-secondary mb-1">マイペース週2日（Wワーク）</div>
                    <div className="text-lg sm:text-xl font-extrabold text-zinc-900 mb-2">月収 35万〜50万円</div>
                    <p className="text-xs text-zinc-600 leading-relaxed">
                      日給約4.5万円 × 月8日勤務。昼職や子育て、学業と両立しながら無理なく高収入を得たい方に。
                    </p>
                  </div>
                  <div className="bg-rose-50/40 rounded-2xl p-4 border border-rose-100">
                    <div className="text-xs font-black text-secondary mb-1">しっかり週4日（レギュラー）</div>
                    <div className="text-lg sm:text-xl font-extrabold text-zinc-900 mb-2">月収 80万〜120万円</div>
                    <p className="text-xs text-zinc-600 leading-relaxed">
                      日給約6万円 × 月16日勤務。毎月の安定した高収入で、奨学金返済や貯金を一気に進められます。
                    </p>
                  </div>
                  <div className="bg-rose-50/40 rounded-2xl p-4 border border-rose-100">
                    <div className="text-xs font-black text-secondary mb-1">短期集中・出稼ぎ（週5〜6日）</div>
                    <div className="text-lg sm:text-xl font-extrabold text-zinc-900 mb-2">月収 150万〜200万円超</div>
                    <p className="text-xs text-zinc-600 leading-relaxed">
                      日給約7〜8万円 × 月22日勤務。個室寮と交通費支給を活用し、1〜3ヶ月でまとまった資金を作る方に。
                    </p>
                  </div>
                </div>
              </div>

              {/* No hidden deduction guarantee */}
              <div className="bg-zinc-50 rounded-2xl p-4 sm:p-5 border border-zinc-200/80 text-xs sm:text-sm text-zinc-700">
                <span className="font-bold text-zinc-900">※不透明な天引き・雑費は一切ありません：</span>
                「日払いは5千円までで残りは月末振込」「厚生費や更衣室代の天引き」「ヘアメイク代の強制徴収」などは完全0円です。売上の半額がそのまま手取りとなります。
              </div>
            </section>

            {/* ========================================================
                3. 待遇
               ======================================================== */}
            <section className="mb-14 sm:mb-20 scroll-mt-24" id="section-benefits">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-7 h-7 rounded-full bg-secondary text-white text-xs font-black flex items-center justify-center shadow-xs">
                  3
                </span>
                <span className="text-secondary font-black text-xs sm:text-sm tracking-wider uppercase">
                  BENEFITS & TREATMENT
                </span>
              </div>
              <h2 className="font-display font-black text-xl sm:text-2xl md:text-3xl text-on-surface mb-3">
                3. 待遇｜家具家電付き個室寮・衣装無料・写真非掲載の徹底
              </h2>
              <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed max-w-3xl mb-8">
                初めての方や遠方からお越しの方でも、安心してプライベートを守りながら快適に働ける業界最高峰の手厚い待遇をご用意しています。
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-white rounded-2xl p-5 border border-rose-100 shadow-xs">
                  <div className="w-9 h-9 rounded-xl bg-rose-50 text-secondary flex items-center justify-center mb-3">
                    <LucideIcon name="Home" size={18} />
                  </div>
                  <h3 className="font-bold text-zinc-900 text-sm mb-1.5">家具家電付き個室寮完備</h3>
                  <p className="text-xs text-zinc-600 leading-relaxed">
                    即日入居OKの清潔なワンルーム個室マンション。オートロック・Wi-Fi・家具家電完備で、敷金・礼金0円です。
                  </p>
                </div>

                <div className="bg-white rounded-2xl p-5 border border-rose-100 shadow-xs">
                  <div className="w-9 h-9 rounded-xl bg-rose-50 text-secondary flex items-center justify-center mb-3">
                    <LucideIcon name="Plane" size={18} />
                  </div>
                  <h3 className="font-bold text-zinc-900 text-sm mb-1.5">往復交通費全額支給</h3>
                  <p className="text-xs text-zinc-600 leading-relaxed">
                    全国どこからでも新幹線・飛行機・夜行バスのチケット代を全額負担。手ぶらで出稼ぎにお越しいただけます。
                  </p>
                </div>

                <div className="bg-white rounded-2xl p-5 border border-rose-100 shadow-xs">
                  <div className="w-9 h-9 rounded-xl bg-rose-50 text-secondary flex items-center justify-center mb-3">
                    <LucideIcon name="Sparkles" size={18} />
                  </div>
                  <h3 className="font-bold text-zinc-900 text-sm mb-1.5">着物・衣装・ヘアメイク無料</h3>
                  <p className="text-xs text-zinc-600 leading-relaxed">
                    清楚な着物やドレス、私服コスプレなど衣装はすべて無料レンタル。プロ仕様のヘアメイクサポートも完全無料です。
                  </p>
                </div>

                <div id="section-safety" className="bg-white rounded-2xl p-5 border border-rose-100 shadow-xs scroll-mt-28">
                  <div className="w-9 h-9 rounded-xl bg-rose-50 text-secondary flex items-center justify-center mb-3">
                    <LucideIcon name="EyeOff" size={18} />
                  </div>
                  <h3 className="font-bold text-zinc-900 text-sm mb-1.5">写真ネット非掲載100%厳守</h3>
                  <p className="text-xs text-zinc-600 leading-relaxed">
                    街全体で撮影が完全禁止。Webサイト・SNS・求人媒体にあなたの写真を掲載することは一切なく、身バレの心配はありません。
                  </p>
                </div>

                <div className="bg-white rounded-2xl p-5 border border-rose-100 shadow-xs">
                  <div className="w-9 h-9 rounded-xl bg-rose-50 text-secondary flex items-center justify-center mb-3">
                    <LucideIcon name="Ban" size={18} />
                  </div>
                  <h3 className="font-bold text-zinc-900 text-sm mb-1.5">お酒・連絡先交換ゼロ</h3>
                  <p className="text-xs text-zinc-600 leading-relaxed">
                    お酒を飲む必要は一切なし。お客様とのプライベートな連絡先交換（LINE等）は組合規約で厳格に禁止されています。
                  </p>
                </div>

                <div className="bg-white rounded-2xl p-5 border border-rose-100 shadow-xs">
                  <div className="w-9 h-9 rounded-xl bg-rose-50 text-secondary flex items-center justify-center mb-3">
                    <LucideIcon name="CheckCircle2" size={18} />
                  </div>
                  <h3 className="font-bold text-zinc-900 text-sm mb-1.5">即日退店可・違約金0円</h3>
                  <p className="text-xs text-zinc-600 leading-relaxed">
                    「体験してみて合わなければその日で終了OK」。違約金やペナルティ、無理な引き止めは一切ありません。
                  </p>
                </div>
              </div>
            </section>

            {/* ========================================================
                4. 勤務時間
               ======================================================== */}
            <section className="mb-14 sm:mb-20 scroll-mt-24" id="section-workstyle">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-7 h-7 rounded-full bg-secondary text-white text-xs font-black flex items-center justify-center shadow-xs">
                  4
                </span>
                <span className="text-secondary font-black text-xs sm:text-sm tracking-wider uppercase">
                  WORKING HOURS & SHIFTS
                </span>
              </div>
              <h2 className="font-display font-black text-xl sm:text-2xl md:text-3xl text-on-surface mb-3">
                4. 勤務時間｜10:00〜24:00 完全自由出勤・短時間勤務OK
              </h2>
              <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed max-w-3xl mb-8">
                あなたのライフスタイルに合わせて、無理のないシフトで自由に働けます。出勤の強制やシフトノルマは一切ありません。
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-white rounded-2xl p-5 border border-rose-100 shadow-xs text-center sm:text-left">
                  <div className="inline-block bg-amber-100 text-amber-900 text-[11px] font-black px-2.5 py-0.5 rounded-full mb-2">
                    昼だけシフト
                  </div>
                  <h3 className="font-bold text-zinc-900 text-sm mb-1">10:00〜18:00</h3>
                  <p className="text-xs text-zinc-600 leading-relaxed">
                    主婦・昼職OLの副業・学生に大人気。夜遅くならず、終電の心配も不要です。
                  </p>
                </div>

                <div className="bg-white rounded-2xl p-5 border border-rose-100 shadow-xs text-center sm:text-left">
                  <div className="inline-block bg-indigo-100 text-indigo-900 text-[11px] font-black px-2.5 py-0.5 rounded-full mb-2">
                    夜だけシフト
                  </div>
                  <h3 className="font-bold text-zinc-900 text-sm mb-1">17:00〜24:00</h3>
                  <p className="text-xs text-zinc-600 leading-relaxed">
                    客足が最も多く回転率が高い時間帯。終電上がりも完全対応しています。
                  </p>
                </div>

                <div className="bg-white rounded-2xl p-5 border border-rose-100 shadow-xs text-center sm:text-left">
                  <div className="inline-block bg-rose-100 text-secondary text-[11px] font-black px-2.5 py-0.5 rounded-full mb-2">
                    短時間スキマ勤務
                  </div>
                  <h3 className="font-bold text-zinc-900 text-sm mb-1">1日3〜4時間だけ</h3>
                  <p className="text-xs text-zinc-600 leading-relaxed">
                    「予定の合間にサクッと稼ぎたい」というスキマ時間での出勤も大歓迎です。
                  </p>
                </div>

                <div className="bg-white rounded-2xl p-5 border border-rose-100 shadow-xs text-center sm:text-left">
                  <div className="inline-block bg-emerald-100 text-emerald-900 text-[11px] font-black px-2.5 py-0.5 rounded-full mb-2">
                    完全自由出勤
                  </div>
                  <h3 className="font-bold text-zinc-900 text-sm mb-1">週1日・月数回OK</h3>
                  <p className="text-xs text-zinc-600 leading-relaxed">
                    月1回だけの出勤や、長期休暇・週末だけの短期バイトも自由に選べます。
                  </p>
                </div>
              </div>
            </section>

            {/* ========================================================
                5. エリア
               ======================================================== */}
            <section className="mb-14 sm:mb-20 scroll-mt-24" id="section-area">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-7 h-7 rounded-full bg-secondary text-white text-xs font-black flex items-center justify-center shadow-xs">
                  5
                </span>
                <span className="text-secondary font-black text-xs sm:text-sm tracking-wider uppercase">
                  AREA & ACCESS
                </span>
              </div>
              <h2 className="font-display font-black text-xl sm:text-2xl md:text-3xl text-on-surface mb-3">
                5. エリア｜大阪・飛田新地（主要駅好アクセス・通りの特徴）
              </h2>
              <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed max-w-3xl mb-8">
                関西屈指の伝統ある歓楽街・飛田新地料理組合公認エリア。各線主要ターミナル駅からのアクセスが抜群で、通りの雰囲気や客層によって働き方を選べます。
              </p>

              {/* Station Access */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-rose-100 shadow-sm mb-6">
                <h3 className="font-bold text-sm sm:text-base text-zinc-900 mb-4 flex items-center gap-2">
                  <LucideIcon name="MapPin" size={18} className="text-secondary" />
                  <span>主要駅からのアクセス</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs sm:text-sm">
                  <div className="bg-rose-50/40 p-4 rounded-2xl border border-rose-100">
                    <div className="font-bold text-zinc-900 mb-1">地下鉄 動物園前駅</div>
                    <div className="text-secondary font-black text-base">徒歩5分</div>
                    <p className="text-zinc-500 text-xs mt-1">Osaka Metro御堂筋線・堺筋線</p>
                  </div>
                  <div className="bg-rose-50/40 p-4 rounded-2xl border border-rose-100">
                    <div className="font-bold text-zinc-900 mb-1">JR・近鉄 天王寺駅</div>
                    <div className="text-secondary font-black text-base">徒歩10分</div>
                    <p className="text-zinc-500 text-xs mt-1">JR環状線・御堂筋線・谷町線</p>
                  </div>
                  <div className="bg-rose-50/40 p-4 rounded-2xl border border-rose-100">
                    <div className="font-bold text-zinc-900 mb-1">JR 新今宮駅</div>
                    <div className="text-secondary font-black text-base">徒歩7分</div>
                    <p className="text-zinc-500 text-xs mt-1">JR環状線・南海本線</p>
                  </div>
                </div>
              </div>

              {/* 3 Main Streets Guide */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-white rounded-2xl p-5 border border-rose-100 shadow-xs">
                  <span className="text-xs font-black text-white bg-secondary px-2.5 py-0.5 rounded-full">青春通り</span>
                  <h4 className="font-bold text-zinc-900 text-sm mt-3 mb-1.5">20代中心・活気と高回転</h4>
                  <p className="text-xs text-zinc-600 leading-relaxed">
                    20代前半〜中盤の女性が多く活躍。街で最も活気があり、スピード重視で高収入を目指す方に人気です。
                  </p>
                </div>
                <div className="bg-white rounded-2xl p-5 border border-rose-100 shadow-xs">
                  <span className="text-xs font-black text-white bg-rose-600 px-2.5 py-0.5 rounded-full">メイン通り</span>
                  <h4 className="font-bold text-zinc-900 text-sm mt-3 mb-1.5">20代〜30代・安定稼働</h4>
                  <p className="text-xs text-zinc-600 leading-relaxed">
                    紳士的で落ち着いた常連客が多く、初心者にも最も安心。客層が良いためマイペースに安定して稼げます。
                  </p>
                </div>
                <div className="bg-white rounded-2xl p-5 border border-rose-100 shadow-xs">
                  <span className="text-xs font-black text-white bg-zinc-700 px-2.5 py-0.5 rounded-full">大門通り・他</span>
                  <h4 className="font-bold text-zinc-900 text-sm mt-3 mb-1.5">20代後半〜30代・高客単価</h4>
                  <p className="text-xs text-zinc-600 leading-relaxed">
                    落ち着いたアットホームな雰囲気。客単価が高く、のんびりマイペースに無理なく働きたい方に最適です。
                  </p>
                </div>
              </div>

              {/* Category Quick Pills */}
              <div className="bg-rose-50/50 rounded-2xl p-5 border border-rose-100 text-xs">
                <div className="font-bold text-zinc-800 mb-2 flex items-center gap-1.5">
                  <LucideIcon name="Sparkles" size={14} className="text-secondary" />
                  <span>あなたにぴったりの働き方から選ぶ（目的別詳細）</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {TARGET_JOB_CATEGORIES.map(cat => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => handleCategorySelect(cat.slug)}
                      className="bg-white hover:bg-rose-100 text-zinc-700 font-bold px-3 py-1.5 rounded-xl border border-rose-200 transition-colors cursor-pointer text-xs flex items-center gap-1"
                    >
                      <span>{cat.title}</span>
                      <LucideIcon name="ChevronRight" size={12} className="text-zinc-400" />
                    </button>
                  ))}
                </div>
              </div>
            </section>

            {/* ========================================================
                6. FAQ
               ======================================================== */}
            <section className="mb-14 sm:mb-20 scroll-mt-24" id="section-faq">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-7 h-7 rounded-full bg-secondary text-white text-xs font-black flex items-center justify-center shadow-xs">
                  6
                </span>
                <span className="text-secondary font-black text-xs sm:text-sm tracking-wider uppercase">
                  FREQUENTLY ASKED QUESTIONS
                </span>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-4">
                <div>
                  <h2 className="font-display font-black text-xl sm:text-2xl md:text-3xl text-on-surface">
                    6. よくある質問 FAQ｜不安解消＆FAQ100選
                  </h2>
                  <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed mt-1">
                    応募前の不安を解消する厳選Q&Aに加え、全119問のFAQデータベースから気になる疑問を直接検索・確認できます。
                  </p>
                </div>
                {onNavigateFaq && (
                  <button
                    type="button"
                    onClick={() => onNavigateFaq()}
                    className="self-start sm:self-auto bg-rose-50 hover:bg-rose-100 text-secondary border border-rose-200 text-xs font-bold px-3.5 py-1.5 rounded-xl transition-all flex items-center gap-1 cursor-pointer shrink-0"
                  >
                    <span>FAQ全119問一覧へ</span>
                    <LucideIcon name="ChevronRight" size={13} />
                  </button>
                )}
              </div>

              {/* Category Filter Pills Bar */}
              <div className="flex gap-1.5 sm:gap-2 overflow-x-auto pb-2 mb-4 scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0">
                <button
                  type="button"
                  onClick={() => { setFaqCategory('featured'); setVisibleFaqCount(8); }}
                  className={`flex-shrink-0 text-xs font-bold px-3 py-1.5 rounded-xl transition-all cursor-pointer border flex items-center gap-1 ${
                    faqCategory === 'featured'
                      ? 'bg-secondary text-white border-secondary shadow-xs'
                      : 'bg-white hover:bg-rose-50 text-zinc-700 border-zinc-200'
                  }`}
                >
                  <span>🔥 特に多い不安 (厳選6問)</span>
                </button>
                <button
                  type="button"
                  onClick={() => { setFaqCategory('all'); setVisibleFaqCount(8); }}
                  className={`flex-shrink-0 text-xs font-bold px-3 py-1.5 rounded-xl transition-all cursor-pointer border flex items-center gap-1 ${
                    faqCategory === 'all'
                      ? 'bg-secondary text-white border-secondary shadow-xs'
                      : 'bg-white hover:bg-rose-50 text-zinc-700 border-zinc-200'
                  }`}
                >
                  <span>すべて (119問)</span>
                </button>
                {FAQ_8_CATEGORIES.filter(c => c.id !== 'all').map(cat => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => { setFaqCategory(cat.id); setVisibleFaqCount(8); }}
                    className={`flex-shrink-0 text-xs font-bold px-3 py-1.5 rounded-xl transition-all cursor-pointer border flex items-center gap-1 ${
                      faqCategory === cat.id
                        ? 'bg-secondary text-white border-secondary shadow-xs'
                        : 'bg-white hover:bg-rose-50 text-zinc-700 border-zinc-200'
                    }`}
                  >
                    <span>{cat.label}</span>
                  </button>
                ))}
              </div>

              {/* Keyword Search & Quick Tags */}
              <div className="bg-white rounded-2xl p-4 border border-rose-100/90 shadow-2xs mb-5">
                <div className="relative mb-3">
                  <LucideIcon name="Search" size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
                  <input
                    type="text"
                    value={faqSearchQuery}
                    onChange={(e) => {
                      setFaqSearchQuery(e.target.value);
                      setVisibleFaqCount(8);
                      if (faqCategory === 'featured' && e.target.value.trim()) {
                        setFaqCategory('all');
                      }
                    }}
                    placeholder="気になるキーワードでFAQ100選を検索（例: お酒、身バレ、日払い、住民票、30代、ノルマ）"
                    className="w-full bg-zinc-50 border border-zinc-200 focus:border-secondary focus:bg-white rounded-xl pl-10 pr-9 py-2.5 text-xs sm:text-sm text-zinc-800 placeholder-zinc-400 outline-hidden transition-all"
                  />
                  {faqSearchQuery && (
                    <button
                      type="button"
                      onClick={() => setFaqSearchQuery('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 text-xs font-bold cursor-pointer"
                    >
                      ✕
                    </button>
                  )}
                </div>

                <div className="flex flex-wrap items-center gap-1.5 text-[11px]">
                  <span className="text-zinc-400 font-bold mr-1">よく検索される言葉:</span>
                  {[
                    { label: '#未経験', tag: '未経験' },
                    { label: '#即日日払い', tag: '日払い' },
                    { label: '#写真非掲載', tag: '写真' },
                    { label: '#週1日', tag: '週1' },
                    { label: '#お酒なし', tag: 'お酒' },
                    { label: '#個室寮', tag: '寮' },
                    { label: '#会社バレ防止', tag: '普通徴収' },
                    { label: '#違約金0円', tag: '違約金' }
                  ].map(item => (
                    <button
                      key={item.label}
                      type="button"
                      onClick={() => {
                        setFaqSearchQuery(item.tag);
                        setFaqCategory('all');
                        setVisibleFaqCount(8);
                      }}
                      className="bg-rose-50 hover:bg-rose-100 text-secondary px-2.5 py-0.5 rounded-lg border border-rose-200/60 font-semibold cursor-pointer transition-colors"
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* FAQ Accordion List */}
              <div className="space-y-3">
                {filteredFaqs === null ? (
                  // Featured 6 Questions
                  COMPARE_PAGE_FAQS.map((faq, idx) => {
                    const faqKey = `compare-faq-${idx}`;
                    const isOpen = expandedFaqId === faqKey;
                    return (
                      <div
                        key={faq.q}
                        className="bg-white rounded-2xl border border-rose-100/90 shadow-2xs overflow-hidden transition-all"
                      >
                        <button
                          type="button"
                          onClick={() => setExpandedFaqId(isOpen ? null : faqKey)}
                          className="w-full text-left p-4 sm:p-5 font-bold text-xs sm:text-sm text-zinc-900 flex items-center justify-between gap-3 hover:text-secondary cursor-pointer"
                        >
                          <span className="flex items-start gap-2.5">
                            <span className="text-secondary font-black text-sm sm:text-base mt-0.5">Q.</span>
                            <span>{faq.q}</span>
                          </span>
                          <LucideIcon
                            name="ChevronDown"
                            size={18}
                            className={`transition-transform flex-shrink-0 ${isOpen ? 'rotate-180 text-secondary' : 'text-zinc-400'}`}
                          />
                        </button>
                        {isOpen && (
                          <div className="px-4 sm:px-5 pb-5 pt-2 text-xs sm:text-sm text-zinc-600 border-t border-rose-50 flex gap-2.5 leading-relaxed font-medium bg-rose-50/20">
                            <span className="text-secondary font-black text-sm sm:text-base">A.</span>
                            <p>{faq.a}</p>
                          </div>
                        )}
                      </div>
                    );
                  })
                ) : filteredFaqs.length > 0 ? (
                  // Filtered Questions from FAQ 100
                  filteredFaqs.slice(0, visibleFaqCount).map((item) => {
                    const faqKey = `faq100-${item.id}`;
                    const isOpen = expandedFaqId === faqKey;
                    return (
                      <div
                        key={item.id}
                        className="bg-white rounded-2xl border border-rose-100/90 shadow-2xs overflow-hidden transition-all"
                      >
                        <button
                          type="button"
                          onClick={() => setExpandedFaqId(isOpen ? null : faqKey)}
                          className="w-full text-left p-4 sm:p-5 font-bold text-xs sm:text-sm text-zinc-900 flex items-center justify-between gap-3 hover:text-secondary cursor-pointer"
                        >
                          <div className="flex items-start gap-2.5">
                            <span className="text-secondary font-black text-sm sm:text-base mt-0.5">Q.</span>
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <span className="text-[10px] font-black text-secondary bg-rose-50 px-2 py-0.5 rounded-md border border-rose-200/60">
                                  {item.eightCategoryLabel || item.categoryLabel}
                                </span>
                              </div>
                              <span className="text-zinc-800">{item.question}</span>
                            </div>
                          </div>
                          <LucideIcon
                            name="ChevronDown"
                            size={18}
                            className={`transition-transform flex-shrink-0 ${isOpen ? 'rotate-180 text-secondary' : 'text-zinc-400'}`}
                          />
                        </button>
                        {isOpen && (
                          <div className="px-4 sm:px-5 pb-5 pt-2 text-xs sm:text-sm text-zinc-600 border-t border-rose-50 flex gap-2.5 leading-relaxed font-medium bg-rose-50/20 whitespace-pre-line">
                            <span className="text-secondary font-black text-sm sm:text-base">A.</span>
                            <p>{item.answer}</p>
                          </div>
                        )}
                      </div>
                    );
                  })
                ) : (
                  <div className="text-center py-10 bg-white rounded-2xl border border-rose-100 p-6">
                    <p className="text-xs sm:text-sm text-zinc-600 mb-3">
                      「{faqSearchQuery}」に一致する質問が見つかりませんでした。
                    </p>
                    <button
                      type="button"
                      onClick={() => { setFaqSearchQuery(''); setFaqCategory('featured'); }}
                      className="text-xs font-bold text-secondary bg-rose-50 px-4 py-2 rounded-xl border border-rose-200 cursor-pointer"
                    >
                      条件をリセットして厳選FAQを表示
                    </button>
                  </div>
                )}
              </div>

              {/* Show more button if filteredFaqs > visibleFaqCount */}
              {filteredFaqs && filteredFaqs.length > visibleFaqCount && (
                <div className="mt-5 text-center flex items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={() => setVisibleFaqCount(prev => prev + 10)}
                    className="bg-white hover:bg-rose-50 text-secondary border border-rose-200 font-bold text-xs sm:text-sm px-6 py-2.5 rounded-xl shadow-2xs transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <LucideIcon name="ChevronDown" size={16} />
                    <span>さらに質問を表示する（残り{filteredFaqs.length - visibleFaqCount}問）</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setVisibleFaqCount(filteredFaqs.length)}
                    className="bg-zinc-100 hover:bg-zinc-200 text-zinc-700 font-bold text-xs px-4 py-2.5 rounded-xl transition-all cursor-pointer"
                  >
                    すべて展開（全{filteredFaqs.length}問）
                  </button>
                </div>
              )}

              {/* Full FAQ Page Link Card */}
              <div className="mt-6 bg-gradient-to-r from-rose-50/70 via-white to-pink-50/70 rounded-2xl p-4 sm:p-5 border border-rose-200/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white text-secondary flex items-center justify-center border border-rose-200 shrink-0 shadow-2xs">
                    <LucideIcon name="BookOpen" size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-xs sm:text-sm text-zinc-800">
                      飛田新地求人 FAQ100選（全119問の完全データベース）
                    </h4>
                    <p className="text-[11px] sm:text-xs text-zinc-500">
                      応募・給料・身バレ・寮・Wワーク・退店など8大テーマ別の専用ページもご用意しています。
                    </p>
                  </div>
                </div>
                {onNavigateFaq ? (
                  <button
                    type="button"
                    onClick={() => onNavigateFaq()}
                    className="bg-secondary hover:bg-rose-700 text-white font-bold text-xs px-4 py-2 rounded-xl shadow-2xs transition-all flex items-center gap-1 cursor-pointer shrink-0"
                  >
                    <span>FAQ専用ページを見る</span>
                    <LucideIcon name="ArrowRight" size={14} />
                  </button>
                ) : (
                  <a
                    href="/faq"
                    className="bg-secondary hover:bg-rose-700 text-white font-bold text-xs px-4 py-2 rounded-xl shadow-2xs transition-all flex items-center gap-1 cursor-pointer shrink-0"
                  >
                    <span>FAQ専用ページを見る</span>
                    <LucideIcon name="ArrowRight" size={14} />
                  </a>
                )}
              </div>
            </section>

            {/* ========================================================
                お仕事までの流れ
               ======================================================== */}
            <section className="mb-14 sm:mb-20 scroll-mt-24" id="section-flow">
              <div className="text-center max-w-2xl mx-auto mb-10">
                <div className="inline-flex items-center gap-1.5 bg-rose-100 text-secondary text-xs font-black px-3.5 py-1 rounded-full mb-3">
                  <LucideIcon name="Sparkles" size={14} />
                  <span>ONBOARDING FLOW</span>
                </div>
                <h2 className="font-display font-black text-xl sm:text-2xl md:text-3xl text-on-surface mb-3">
                  お仕事までの流れ｜応募から即日手渡し日払いまで
                </h2>
                <p className="text-xs sm:text-sm text-zinc-600">
                  履歴書不要・手ぶらでご来店いただけます。丁寧な5ステップで初日も安心です。
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-5 gap-3 sm:gap-4">
                {ONBOARDING_FLOW_STEPS.map((s, idx) => (
                  <div
                    key={s.step}
                    className="bg-white rounded-2xl p-5 border border-rose-100 shadow-xs relative flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-black text-secondary bg-rose-50 px-2.5 py-0.5 rounded-full">
                          STEP {s.step}
                        </span>
                        <div className="w-8 h-8 rounded-full bg-rose-50 text-secondary flex items-center justify-center">
                          <LucideIcon name={s.icon} size={16} />
                        </div>
                      </div>
                      <h3 className="font-bold text-zinc-900 text-xs sm:text-sm mb-2">
                        {s.title}
                      </h3>
                      <p className="text-xs text-zinc-600 leading-relaxed">
                        {s.desc}
                      </p>
                    </div>
                    {idx < 4 && (
                      <div className="hidden md:block absolute -right-2.5 top-1/2 -translate-y-1/2 z-10 text-rose-300">
                        ▶
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>

            {/* ========================================================
                募集要項
               ======================================================== */}
            <section className="mb-14 sm:mb-20 scroll-mt-24" id="section-requirements">
              <div className="text-center max-w-2xl mx-auto mb-8">
                <div className="inline-flex items-center gap-1.5 bg-rose-100 text-secondary text-xs font-black px-3.5 py-1 rounded-full mb-3">
                  <LucideIcon name="FileText" size={14} />
                  <span>SPECIFICATIONS</span>
                </div>
                <h2 className="font-display font-black text-xl sm:text-2xl md:text-3xl text-on-surface mb-3">
                  募集要項｜料亭直営公式採用スペック一覧
                </h2>
                <p className="text-xs sm:text-sm text-zinc-600">
                  料理組合正規加盟 老舗料亭直営公式採用の最新一次情報スペックです。
                </p>
              </div>

              <div className="bg-white rounded-3xl border border-rose-100 shadow-md overflow-hidden">
                <div className="divide-y divide-rose-50 text-xs sm:text-sm">
                  {SPEC_ROWS.map((row) => (
                    <div key={row.label} className="grid grid-cols-1 sm:grid-cols-4 p-4 sm:p-5 hover:bg-rose-50/20 transition-colors">
                      <div className="font-bold text-zinc-800 sm:col-span-1 mb-1 sm:mb-0 flex items-center">
                        {row.label}
                      </div>
                      <div className="text-zinc-600 sm:col-span-3 leading-relaxed">
                        {row.val}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* ========================================================
                LINE誘導
               ======================================================== */}
            <section className="mb-12 scroll-mt-24" id="section-line-cta">
              <div className="bg-gradient-to-br from-rose-50 via-white to-pink-50 rounded-3xl p-6 sm:p-10 border border-rose-200 shadow-md">
                <div className="max-w-2xl mx-auto text-center">
                  <div className="inline-block bg-white text-secondary text-xs font-black px-4 py-1 rounded-full border border-rose-200 mb-4 shadow-2xs">
                    まずは質問・相談だけでもOK
                  </div>

                  <h2 className="font-display font-black text-xl sm:text-2xl md:text-3xl text-zinc-900 leading-tight mb-4">
                    まだ応募するか決めなくて大丈夫。
                  </h2>

                  <div className="bg-white/80 backdrop-blur-xs rounded-2xl p-5 border border-rose-100 mb-6 text-left sm:text-center text-xs sm:text-sm text-zinc-700 leading-relaxed space-y-2">
                    <p className="font-bold text-secondary">「週1でも大丈夫？」</p>
                    <p className="font-bold text-secondary">「未経験でもできる？」</p>
                    <p className="font-bold text-secondary">「どのくらい稼げる？」</p>
                    <p className="font-bold text-secondary">「身バレ対策について詳しく知りたい」</p>
                    <p className="text-zinc-600 pt-2 border-t border-rose-100">
                      そんな質問だけでもOKです。<br />
                      条件を聞いてから、自分に合うか考えてください。
                    </p>
                  </div>

                  {/* LINE Button */}
                  <div className="mb-6">
                    <button
                      type="button"
                      onClick={onCtaclick}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-[#06C755] hover:bg-[#05b34c] text-white font-black text-sm sm:text-base px-8 py-4 rounded-2xl shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 cursor-pointer"
                    >
                      <LucideIcon name="MessageCircle" size={22} className="text-white" />
                      <span>公式LINEで今すぐ相談する（24時間受付）</span>
                    </button>
                  </div>

                  {/* Trust Badges */}
                  <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-[11px] sm:text-xs text-zinc-500 font-semibold mb-6">
                    <span className="bg-white px-3 py-1 rounded-full border border-rose-100 flex items-center gap-1">
                      <LucideIcon name="ShieldCheck" size={14} className="text-emerald-600" />
                      完全匿名で相談OK
                    </span>
                    <span className="bg-white px-3 py-1 rounded-full border border-rose-100 flex items-center gap-1">
                      <LucideIcon name="FileText" size={14} className="text-secondary" />
                      履歴書不要・手ぶらOK
                    </span>
                    <span className="bg-white px-3 py-1 rounded-full border border-rose-100 flex items-center gap-1">
                      <LucideIcon name="Clock" size={14} className="text-secondary" />
                      24時間即日返信
                    </span>
                    <span className="bg-white px-3 py-1 rounded-full border border-rose-100 flex items-center gap-1">
                      <LucideIcon name="HeartHandshake" size={14} className="text-secondary" />
                      女性スタッフが親身に対応
                    </span>
                  </div>

                  {/* Consultant Sakura message */}
                  <div className="flex items-center gap-3 bg-white p-3.5 rounded-2xl border border-rose-100 text-left">
                    <img
                      src={CONSULTANT_AVATAR_URL}
                      alt="女性サポート統括担当 さくら"
                      className="w-12 h-12 rounded-full object-cover border border-rose-200 flex-shrink-0"
                      loading="lazy"
                    />
                    <div className="text-xs text-zinc-600">
                      <span className="font-bold text-zinc-900 block text-xs">女性サポート統括担当 さくらより</span>
                      「無理な勧誘やしつこいご連絡は一切いたしません。あなたのペースで、気になることを何でも聞いてくださいね。」
                    </div>
                  </div>

                </div>
              </div>
            </section>
          </div>
        )}

      </div>
    </article>
  );
}
