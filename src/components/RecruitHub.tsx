/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import LucideIcon from './LucideIcon';

interface RecruitHubProps {
  onScrollToSection: (sectionId: string) => void;
  onNavigateToArticle?: (slug: string) => void;
  onNavigateToBlog?: (category?: string) => void;
  onNavigateCompare?: (categorySlug?: string) => void;
  onNavigateTopic?: (topicId: string) => void;
  onNavigateFaq?: () => void;
}

interface HubClusterItem {
  id: string;
  path: string;
  number: string;
  emoji: string;
  title: string;
  tagline: string;
  badge: string;
  badgeColor: string;
  icon: string;
  image: string;
  summary: string;
  keyPoints: string[];
  featuredArticles: {
    slug: string;
    title: string;
    tag: string;
  }[];
}

export default function RecruitHub({
  onScrollToSection,
  onNavigateToArticle,
  onNavigateToBlog,
  onNavigateCompare,
  onNavigateTopic,
  onNavigateFaq,
}: RecruitHubProps) {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  useEffect(() => {
    const handleCategorySelect = (e: CustomEvent<string>) => {
      if (e.detail) {
        setActiveCategory(e.detail);
      }
    };
    window.addEventListener('select-hub-category' as any, handleCategorySelect);
    return () => window.removeEventListener('select-hub-category' as any, handleCategorySelect);
  }, []);

  // 12 Hub Nodes strictly mapping to user's Topic Cluster
  const clusterItems: HubClusterItem[] = [
    {
      id: "job",
      path: "/job",
      number: "01",
      emoji: "🍵",
      title: "仕事内容",
      tagline: "お茶出しとおもてなし接客・お酒一切不要",
      badge: "お酒不要",
      badgeColor: "bg-emerald-100 text-emerald-800 border-emerald-200",
      icon: "HeartHandshake",
      image: "/images/tobita_job_guide_tea_1788153000519.jpg",
      summary: "玄関でお出迎えし、お座敷でお茶やお菓子を出しながら歓談。お酒一切不要、営業連絡禁止、1回15〜20分の短時間接客。",
      keyPoints: ["お酒・タバコ一切不要", "1回15〜20分の短時間", "客引きは仲居さんが担当"],
      featuredArticles: [
        { slug: "tobita-job-guide", title: "飛田新地のお仕事内容と1日の流れ", tag: "お仕事ガイド" },
        { slug: "tobitashinchi-non-alcoholic", title: "お酒が飲めなくても稼げる理由", tag: "ノンアル" }
      ]
    },
    {
      id: "salary",
      path: "/salary",
      number: "02",
      emoji: "💰",
      title: "給料・待遇",
      tagline: "売上50%完全バック・全額即日現金手渡し",
      badge: "即日日払い",
      badgeColor: "bg-amber-100 text-amber-800 border-amber-200",
      icon: "Coins",
      image: "/images/tobita_salary_calculator_1788153012478.jpg",
      summary: "売上を店舗ときっちり折半（50%バック）。退勤時に全額現金手渡し支給。雑費・待機料などの不当な天引きは一切ありません。",
      keyPoints: ["売上50%完全バック", "即日全額現金手渡し", "雑費・天引き0円"],
      featuredArticles: [
        { slug: "tobitashinchi-salary-system", title: "給与システムと売上50%バックの仕組み", tag: "給料明細" },
        { slug: "tobitashinchi-10million-savings", title: "飛田新地で1,000万円貯金した女性の実例", tag: "貯金実績" }
      ]
    },
    {
      id: "beginner",
      path: "/beginner",
      number: "03",
      emoji: "🔰",
      title: "未経験",
      tagline: "在籍キャストの約90%が夜職完全初心者",
      badge: "初心者歓迎",
      badgeColor: "bg-pink-100 text-rose-700 border-pink-200",
      icon: "Sparkles",
      image: "/images/tobita_beginner_support_1788153037569.jpg",
      summary: "夜職経験ゼロ・OL・大学生・主婦多数在籍。女性専任スタッフと優しい仲居さんがマンツーマンで寄り添い、初日から安心稼働。",
      keyPoints: ["在籍9割が未経験スタート", "専任女性スタッフ常駐", "実技研修一切なし"],
      featuredArticles: [
        { slug: "tobitashinchi-beginner-guide", title: "未経験の女性が最初に知っておくべきこと", tag: "初心者向け" },
        { slug: "tobitashinchi-age-and-looks", title: "年齢や容姿に自信がなくても採用される理由", tag: "採用基準" }
      ]
    },
    {
      id: "experienced",
      path: "/experienced",
      number: "04",
      emoji: "👑",
      title: "経験者",
      tagline: "風俗・キャバクラからの移籍人気No.1・即戦力高収入",
      badge: "移籍歓迎",
      badgeColor: "bg-purple-100 text-purple-800 border-purple-200",
      icon: "Award",
      image: "/images/tobita_trial_interview_1788153091611.jpg",
      summary: "Web写真指名なし、お風呂掃除なし、休日の営業LINEなし。圧倒的な集客力で、移籍初日から日給10万円超えを狙える好環境。",
      keyPoints: ["営業LINE・指名競争なし", "お風呂掃除・肉体労働なし", "初日から即戦力高日給"],
      featuredArticles: [
        { slug: "tobitashinchi-vs-other-night-jobs", title: "ソープ・デリヘル・キャバクラとの徹底比較", tag: "他業種比較" },
        { slug: "tobitashinchi-stamina-mental-care-100k", title: "日給10万円以上を無理なくキープする秘訣", tag: "高収入" }
      ]
    },
    {
      id: "requirements",
      path: "/requirements",
      number: "05",
      emoji: "📋",
      title: "募集要項",
      tagline: "20歳以上限定・料理組合公認の公式採用スペック",
      badge: "20歳以上",
      badgeColor: "bg-zinc-100 text-zinc-800 border-zinc-300",
      icon: "FileText",
      image: "/images/tobita_doc_checklist_1788153025641.jpg",
      summary: "応募資格（20歳以上の女性）、給与システム、勤務地、必要書類（本籍地記載住民票・パスポート）など一次情報を明示。",
      keyPoints: ["20歳以上の女性限定", "履歴書不要・私服手ぶら面接", "住民票原本またはパスポート"],
      featuredArticles: [
        { slug: "tobita-safe-recruitment", title: "安全管理基準と募集要項の一次情報", tag: "公式スペック" },
        { slug: "tobitashinchi-no-resume-quick-trial", title: "履歴書なしで当日面接〜体入できる理由", tag: "手ぶら面接" }
      ]
    },
    {
      id: "flow",
      path: "/flow",
      number: "06",
      emoji: "🌸",
      title: "面接・体験入店までの流れ",
      tagline: "履歴書不要・私服見学OK・面接当日の即日体入対応",
      badge: "手ぶらOK",
      badgeColor: "bg-rose-100 text-rose-800 border-rose-200",
      icon: "Calendar",
      image: "/images/tobita_doc_checklist_1788153025641.jpg",
      summary: "LINE相談から面談、店舗見学、即日体験入店、全額日払い受け取りまでの5ステップを分かりやすく解説。合わなければ即日終了OK。",
      keyPoints: ["LINEで簡単予約", "私服のまま手ぶら面談", "体験入店も通常全額日払い"],
      featuredArticles: [
        { slug: "tobitashinchi-interview-guide", title: "面接から体験入店までの詳しい手順", tag: "応募手順" },
        { slug: "tobitashinchi-trial-guide", title: "体験入店当日の持ち物と心構え", tag: "体入ガイド" }
      ]
    },
    {
      id: "workstyle",
      path: "/workstyle",
      number: "07",
      emoji: "⏰",
      title: "働き方",
      tagline: "完全自由出勤制・週1日〜・短時間・OL副業対応",
      badge: "自由出勤",
      badgeColor: "bg-blue-100 text-blue-800 border-blue-200",
      icon: "Clock",
      image: "/images/tobita_shift_schedule_1788153063163.jpg",
      summary: "10:00〜24:00の間で完全自由出勤。週1日〜、お昼の短時間（12:00〜18:00）、本業終わりの夜シフトなど都合に合わせて稼働可能。",
      keyPoints: ["週1日〜・短時間・月1回OK", "昼シフト（12:00〜18:00）大歓迎", "出勤ノルマ・ペナルティ一切なし"],
      featuredArticles: [
        { slug: "tobitashinchi-double-work-lifestyle", title: "OL・会社員のWワーク副業成功術", tag: "Wワーク" },
        { slug: "tobitashinchi-daytime-shift-advantage", title: "お昼シフトが人気の理由と稼ぎやすさ", tag: "昼勤務" }
      ]
    },
    {
      id: "shops",
      path: "/shops",
      number: "08",
      emoji: "🏮",
      title: "お店選び",
      tagline: "メイン通り・青春通り・大門通りの特徴と直営店",
      badge: "直営安心",
      badgeColor: "bg-indigo-100 text-indigo-800 border-indigo-200",
      icon: "Store",
      image: "/images/tobita_street_lanterns_1788153077449.jpg",
      summary: "青春通り・メイン通り・大門通りなど通りごとの客層や年齢層を比較。複数直営店を展開しているため、あなたに合う店が見つかります。",
      keyPoints: ["通りごとの年齢層・客層を比較", "グループ直営で中抜き詐欺ゼロ", "雰囲気が合わなければ店舗変更OK"],
      featuredArticles: [
        { slug: "tobitashinchi-street-differences-recruitment", title: "青春通りとメイン通りの違いと選び方", tag: "通り比較" },
        { slug: "tobitashinchi-scout-fraud-avoidance-safe-recruitment", title: "悪質スカウト・求人詐欺の見分け方", tag: "防犯対策" }
      ]
    },
    {
      id: "dorm",
      path: "/dorm",
      number: "09",
      emoji: "🏠",
      title: "寮・出稼ぎ",
      tagline: "家具家電付き個室マンション寮・往復交通費全額支給",
      badge: "個室寮完備",
      badgeColor: "bg-sky-100 text-sky-800 border-sky-200",
      icon: "Home",
      image: "/images/tobita_luxury_room_1788153103866.jpg",
      summary: "天王寺・難波近郊にオートロック完全個室マンション寮を完備。即日カバン1つで入居可。新幹線や飛行機など往復交通費も全額支給。",
      keyPoints: ["完全個室オートロック（相部屋なし）", "テレビ・冷蔵庫・Wi-Fi完備", "往復交通費全額支給（全国対応）"],
      featuredArticles: [
        { slug: "tobitashinchi-housing-support", title: "個室寮の設備・セキュリティと入居手順", tag: "個室寮" },
        { slug: "local-travel-work-hotel-support", title: "地方からの短期出稼ぎ・交通費支給ルール", tag: "出稼ぎ" }
      ]
    },
    {
      id: "safety",
      path: "/safety",
      number: "10",
      emoji: "🤫",
      title: "身バレ・安全",
      tagline: "ネット写真ゼロ・完全源氏名・住民税普通徴収対策",
      badge: "秘密厳守",
      badgeColor: "bg-cyan-100 text-cyan-800 border-cyan-200",
      icon: "EyeOff",
      image: "/images/tobita_wwork_privacy_1788153051081.jpg",
      summary: "街全体で写真撮影全面禁止。Web掲載ゼロ、完全源氏名、郵便物ゼロ。さらに昼職の会社に副業が発覚しない普通徴収申告もサポート。",
      keyPoints: ["ネット・パネル写真掲載ゼロ", "本名非公開・源氏名徹底", "住民税の普通徴収で会社バレ防止"],
      featuredArticles: [
        { slug: "tobitashinchi-privacy-guide", title: "誰にも知られずに働くための身バレ防止策", tag: "身バレ対策" },
        { slug: "tobitashinchi-tax-guide", title: "副業が会社にバレない住民税・確定申告手順", tag: "税金対策" }
      ]
    },
    {
      id: "faq",
      path: "/faq",
      number: "11",
      emoji: "💡",
      title: "よくある質問 FAQ",
      tagline: "業界最多クラス全119問・8大テーマ体系化Q&A",
      badge: "全119問",
      badgeColor: "bg-orange-100 text-orange-800 border-orange-200",
      icon: "HelpCircle",
      image: "/images/tobita_security_shield_1788153117089.jpg",
      summary: "給料、生理、年齢、客層、服装、身バレ、退店など、応募前の疑問全119問に現場スタッフが忖度なしの本音で回答しています。",
      keyPoints: ["業界最多クラス全119問を網羅", "8大カテゴリ別で検索可能", "現場スタッフによる本音回答"],
      featuredArticles: [
        { slug: "tobita-safe-recruitment", title: "安全管理とよくある質問総まとめ", tag: "よくある質問" },
        { slug: "tobitashinchi-training-lecture-no-practical-exam", title: "新人研修の実態と口頭講習の理由", tag: "研修実態" }
      ]
    },
    {
      id: "blog",
      path: "/blog",
      number: "12",
      emoji: "📚",
      title: "お仕事コラム",
      tagline: "100本以上の解説記事・テーマ別実務ノウハウ",
      badge: "100本超",
      badgeColor: "bg-rose-100 text-rose-800 border-rose-200",
      icon: "BookOpen",
      image: "/images/tobita_soft_hero_1782370495398.jpg",
      summary: "飛田新地求人に関するリアルな給料実績、稼ぎ方のコツ、接客マナー、体験談など、100本超の専門記事をテーマ別に網羅。",
      keyPoints: ["100本超の専門記事を掲載", "現役キャスト・スタッフの実務知恵", "カテゴリ・キーワードで検索可能"],
      featuredArticles: [
        { slug: "tobita-job-guide", title: "飛田新地求人の総合解説ガイド", tag: "人気コラム" },
        { slug: "tobitashinchi-salary-system", title: "給与システムと高収入の秘密", tag: "給与解説" }
      ]
    }
  ];

  const handleCardClick = (item: HubClusterItem) => {
    if (item.id === 'faq') {
      if (onNavigateFaq) onNavigateFaq();
      else onScrollToSection('faq');
    } else if (item.id === 'blog') {
      if (onNavigateToBlog) onNavigateToBlog();
      else onScrollToSection('jobs');
    } else {
      if (onNavigateTopic) {
        onNavigateTopic(item.id);
      } else {
        onScrollToSection('jobs');
      }
    }
  };

  const displayedItems = activeCategory === 'all'
    ? clusterItems
    : clusterItems.filter(c => c.id === activeCategory);

  return (
    <section className="py-12 md:py-20 bg-gradient-to-b from-white via-rose-50/20 to-white relative" id="recruit-hub">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Hub Header with Topic Cluster Authority Badge */}
        <div className="text-center max-w-3xl mx-auto mb-8 md:mb-12">
          <div className="inline-flex items-center gap-1.5 bg-rose-100 text-rose-700 text-xs font-black px-4 py-1.5 rounded-full mb-3.5 shadow-2xs border border-rose-200/80">
            <LucideIcon name="Compass" size={14} className="text-rose-600" />
            <span>飛田新地求人　総合ガイド</span>
          </div>
          
          <h2 className="font-display font-black text-2xl sm:text-3xl md:text-4xl text-zinc-900 leading-tight mb-4 tracking-tight">
            知りたい専門テーマから探す<br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-600 via-pink-600 to-rose-700">
              飛田新地求人 公式分野別ガイド
            </span>
          </h2>
          
          <p className="font-sans text-xs sm:text-sm text-zinc-600 leading-relaxed max-w-2xl mx-auto">
            仕事内容・給料・未経験・経験者・面接の流れ・働き方・お店選び・寮・身バレ防止など、知りたい疑問を12のテーマに体系化。各カードから詳しい解説や詳細情報をご覧いただけます。
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="mb-8" id="category-selector">
          <div className="flex items-center justify-between mb-3 px-1">
            <span className="text-xs font-bold text-zinc-700 flex items-center gap-1.5">
              <LucideIcon name="Search" size={13} className="text-rose-500" />
              <span>テーマを選択して絞り込み</span>
            </span>
            {activeCategory !== 'all' && (
              <button
                type="button"
                onClick={() => setActiveCategory('all')}
                className="text-xs font-bold text-rose-600 hover:text-rose-700 cursor-pointer flex items-center gap-1"
              >
                <span>全12テーマを表示に戻す</span>
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            <button
              type="button"
              onClick={() => setActiveCategory('all')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
                activeCategory === 'all'
                  ? 'bg-rose-600 text-white shadow-sm shadow-rose-600/20'
                  : 'bg-white text-zinc-700 hover:bg-rose-50 hover:text-rose-600 border border-gray-200'
              }`}
            >
              <span>すべて (全12テーマ)</span>
            </button>

            {clusterItems.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeCategory === cat.id
                    ? 'bg-rose-600 text-white shadow-sm shadow-rose-600/20'
                    : 'bg-white text-zinc-700 hover:bg-rose-50 hover:text-rose-600 border border-gray-200'
                }`}
              >
                <span>{cat.emoji}</span>
                <span>{cat.title}</span>
              </button>
            ))}
          </div>
        </div>

        {/* 12 Category Hub Bento Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6 mb-12">
          {displayedItems.map((cat, index) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: Math.min(index * 0.04, 0.3) }}
              className="bg-white rounded-3xl overflow-hidden border border-rose-100/90 shadow-sm hover:shadow-xl hover:border-rose-300 transition-all duration-300 flex flex-col justify-between group"
              id={`hub-cluster-${cat.id}`}
            >
              <div>
                {/* Image Banner */}
                <div className="relative h-40 overflow-hidden bg-rose-50">
                  <img
                    src={cat.image}
                    alt={cat.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    decoding="async"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      const target = e.currentTarget as HTMLImageElement;
                      target.onerror = null;
                      target.src = '/images/tobita_soft_hero_1782370495398.jpg';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3">
                    <span className="font-mono font-black text-[10px] bg-white/95 text-rose-700 px-2 py-0.5 rounded-md shadow-xs border border-rose-200">
                      TOPIC {cat.number}
                    </span>
                  </div>

                  <div className="absolute top-3 right-3">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full shadow-xs border flex items-center gap-1 ${cat.badgeColor} bg-white/95`}>
                      <span>{cat.emoji}</span>
                      <span>{cat.badge}</span>
                    </span>
                  </div>

                  {/* Title */}
                  <div className="absolute bottom-2.5 left-3.5 right-3.5">
                    <h3 className="font-display font-black text-lg sm:text-xl text-white tracking-tight drop-shadow-sm flex items-center gap-1.5">
                      <span>{cat.emoji}</span>
                      <span>{cat.title}</span>
                    </h3>
                    <p className="text-[11px] text-zinc-100 font-medium line-clamp-1 drop-shadow-xs">
                      {cat.tagline}
                    </p>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 sm:p-5">
                  <p className="font-sans text-xs text-zinc-600 leading-relaxed mb-3 line-clamp-2">
                    {cat.summary}
                  </p>

                  {/* Key points */}
                  <div className="bg-rose-50/40 rounded-xl p-2.5 border border-rose-100/60 mb-3.5 space-y-1">
                    {cat.keyPoints.map((pt, i) => (
                      <div key={i} className="flex items-center gap-1.5 text-[11px] text-zinc-700 font-medium">
                        <LucideIcon name="Check" size={12} className="text-rose-500 shrink-0" />
                        <span className="truncate">{pt}</span>
                      </div>
                    ))}
                  </div>

                  {/* Featured articles */}
                  <div className="space-y-1">
                    {cat.featuredArticles.map((art) => (
                      <div
                        key={art.slug}
                        onClick={() => {
                          if (onNavigateToArticle) onNavigateToArticle(art.slug);
                          else onScrollToSection('jobs');
                        }}
                        className="p-1.5 px-2 rounded-lg border border-gray-100 hover:border-rose-200 bg-white hover:bg-rose-50/50 transition-all cursor-pointer flex items-center justify-between group/art text-[11px]"
                      >
                        <div className="flex items-center gap-1.5 truncate mr-1">
                          <span className="text-[9px] font-bold px-1 py-0.2 rounded bg-rose-100/80 text-rose-700 shrink-0">
                            {art.tag}
                          </span>
                          <span className="text-zinc-700 group-hover/art:text-rose-600 truncate font-medium">
                            {art.title}
                          </span>
                        </div>
                        <LucideIcon name="ChevronRight" size={12} className="text-zinc-300 group-hover/art:text-rose-500 shrink-0" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Action Footer */}
              <div className="p-4 pt-0 bg-white border-t border-gray-50 mt-1">
                <button
                  type="button"
                  onClick={() => handleCardClick(cat)}
                  className="w-full bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs py-2.5 px-3 rounded-xl shadow-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer hover:shadow-md"
                >
                  <LucideIcon name={cat.icon} size={14} />
                  <span>「{cat.title}」の詳しい解説を見る</span>
                  <LucideIcon name="ArrowRight" size={13} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Quick Link Banner: 8-Category Comparison Feature */}
        <div className="bg-gradient-to-r from-rose-600 via-pink-600 to-rose-700 rounded-3xl p-6 sm:p-8 text-white shadow-lg mb-8">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="max-w-2xl">
              <button
                type="button"
                onClick={() => onNavigateCompare ? onNavigateCompare() : onScrollToSection('compare')}
                className="inline-flex items-center gap-1.5 bg-white/20 hover:bg-white/30 backdrop-blur-xs text-white text-[11px] font-black px-3 py-1 rounded-full mb-3 shadow-2xs cursor-pointer transition-colors"
              >
                <LucideIcon name="Target" size={13} />
                <span>求人サイト比較＆目的・属性別求人ガイド</span>
                <LucideIcon name="ChevronRight" size={12} />
              </button>
              <h3 className="font-display font-black text-xl sm:text-2xl text-white tracking-tight mb-2">
                「未経験」「高収入」「週1日」「短期」「寮付き」「Wワーク」「20代」「30代」から選ぶ
              </h3>
              <p className="text-xs sm:text-sm text-rose-100 leading-relaxed mb-4">
                飛田新地の求人サイトや他業種との待遇差、あなたの希望条件にぴったりの働き方を徹底比較しています。
              </p>
              
              <div className="flex flex-wrap gap-1.5">
                {[
                  { label: '未経験向け', slug: 'inexperienced' },
                  { label: '高収入', slug: 'high-income' },
                  { label: '週1日〜', slug: 'weekly-1' },
                  { label: '短期集中', slug: 'short-term' },
                  { label: '個室寮付き', slug: 'dormitory' },
                  { label: 'Wワーク', slug: 'double-work' },
                  { label: '20代向け', slug: 'age-20s' },
                  { label: '30代向け', slug: 'age-30s' },
                ].map((tag) => (
                  <button
                    key={tag.slug}
                    type="button"
                    onClick={() => onNavigateCompare ? onNavigateCompare(tag.slug) : onScrollToSection('compare')}
                    className="text-xs bg-white/20 hover:bg-white text-white hover:text-rose-700 px-3 py-1 rounded-full font-bold transition-all cursor-pointer shadow-2xs"
                  >
                    #{tag.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="shrink-0 w-full lg:w-auto">
              <button
                type="button"
                onClick={() => onNavigateCompare ? onNavigateCompare() : onScrollToSection('compare')}
                className="w-full lg:w-auto bg-white hover:bg-rose-50 text-rose-700 font-black text-sm px-6 py-3.5 rounded-2xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer hover:scale-105"
                id="recruit-hub-compare-btn"
              >
                <LucideIcon name="Scale" size={16} />
                <span>求人比較特集を見る</span>
                <LucideIcon name="ChevronRight" size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* View All Blog Link */}
        {onNavigateToBlog && (
          <div className="text-center">
            <button
              onClick={() => onNavigateToBlog()}
              className="inline-flex items-center gap-2 text-xs md:text-sm font-extrabold text-rose-700 hover:text-rose-800 bg-white border border-rose-200 px-7 py-3 rounded-full shadow-xs hover:shadow-md transition-all cursor-pointer"
              id="recruit-hub-all-blog-btn"
            >
              <LucideIcon name="BookOpen" size={15} className="text-rose-600" />
              <span>お仕事コラム・解説記事一覧（全100本以上）を見る</span>
              <LucideIcon name="ChevronRight" size={15} />
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
