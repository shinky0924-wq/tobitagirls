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
  bannerHeadline: string; // 大見出し（画像内メインコピー：1行厳守）
  bannerSubtext: string;  // 補足（画像内メインコピーの下）
  questionTitle: string;  // カード下部の具体的タイトル
  tagline: string;
  badge: string;
  icon: string;
  image: string;
  summary: string;
  keyPoints: string[];
  featuredArticles: {
    slug: string;
    title: string;
    tag: string;
  }[];
  buttonText: string;
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

  // 12 Hub Nodes strictly updated with user's micro-tuning requirements
  const clusterItems: HubClusterItem[] = [
    {
      id: "job",
      path: "/job",
      number: "01",
      emoji: "🍵",
      title: "仕事内容",
      bannerHeadline: "どんなお仕事をするの？",
      bannerSubtext: "仕事内容・1日の流れ",
      questionTitle: "仕事内容｜未経験でもできる？お仕事の流れ",
      tagline: "玄関で笑顔で手を振ってサービス・お酒一切不要",
      badge: "初心者向け",
      icon: "HeartHandshake",
      image: "/images/cat_01_job_1794165000305.jpg",
      summary: "飛田新地でのお仕事内容や1日の過ごし方について解説しています。未経験の方でも安心して始められるよう、接客の流れやサポート体制をわかりやすくまとめました。",
      keyPoints: [
        "笑顔での接客・お酒は不要",
        "呼び込みや客引きは店舗スタッフが担当",
        "困ったときは仲居さんがサポート"
      ],
      featuredArticles: [
        { slug: "tobita-job-guide", title: "飛田新地のお仕事内容と1日の流れ", tag: "お仕事ガイド" },
        { slug: "tobitashinchi-non-alcoholic", title: "お酒が飲めなくても安心して稼げる理由", tag: "安心ポイント" }
      ],
      buttonText: "仕事内容・1日の流れを見る"
    },
    {
      id: "salary",
      path: "/salary",
      number: "02",
      emoji: "💰",
      title: "給料・待遇",
      bannerHeadline: "お給料はいくら？",
      bannerSubtext: "報酬・待遇の仕組み",
      questionTitle: "給料・待遇｜売上バック率と日払いの仕組み",
      tagline: "売上50%完全バック・全額即日現金手渡し",
      badge: "即日日払い",
      icon: "Coins",
      image: "/images/cat_02_salary_1794164999560.jpg",
      summary: "お給料の目安やバック率の仕組み、日払いの受け取り方について解説しています。雑費の有無など、働く前に知っておきたいお金の情報をまとめました。",
      keyPoints: [
        "売上に応じた明確なバック率",
        "働いたその日に全額日払い",
        "衣装や待機時の余計な費用なし"
      ],
      featuredArticles: [
        { slug: "tobitashinchi-salary-system", title: "給与システムと売上50%バックの仕組み", tag: "給料明細" },
        { slug: "tobitashinchi-10million-savings", title: "飛田新地で1,000万円貯金した女性の実例", tag: "貯金実績" }
      ],
      buttonText: "給料・報酬の仕組みを確認する"
    },
    {
      id: "beginner",
      path: "/beginner",
      number: "03",
      emoji: "🔰",
      title: "未経験",
      bannerHeadline: "初めてでも大丈夫？",
      bannerSubtext: "未経験から始める方法",
      questionTitle: "未経験｜初めてでも安心のサポート体制",
      tagline: "在籍キャストの約90%が夜職完全初心者",
      badge: "未経験歓迎",
      icon: "Sparkles",
      image: "/images/cat_03_beginner_1794165001273.jpg",
      summary: "夜のお仕事が初めての女性に向けたサポート体制について解説しています。面接時の雰囲気や当日の流れなど、不安を解消するためのポイントをまとめました。",
      keyPoints: [
        "初めての女性向けに丁寧な事前レクチャー",
        "女性スタッフによる個別相談対応",
        "無理な勤務の強要は一切なし"
      ],
      featuredArticles: [
        { slug: "tobitashinchi-beginner-guide", title: "未経験の女性が最初に知っておくべき基本事項", tag: "初心者ガイド" },
        { slug: "tobitashinchi-age-and-looks", title: "年齢や容姿に不安がある方の採用基準", tag: "採用のポイント" }
      ],
      buttonText: "未経験から始める方法を見る"
    },
    {
      id: "experienced",
      path: "/experienced",
      number: "04",
      emoji: "👑",
      title: "経験者",
      bannerHeadline: "経験を活かして働く",
      bannerSubtext: "経験者向けのお仕事情報",
      questionTitle: "経験者｜より良い環境で働くための移籍優遇",
      tagline: "風俗・キャバクラからの移籍人気No.1・即戦力高収入",
      badge: "移籍歓迎",
      icon: "Award",
      image: "/images/cat_04_experienced_1794165001783.jpg",
      summary: "他店や他業種から移籍を検討している女性に向けた情報を解説しています。これまでの経験を活かしながら、より働きやすい環境を選ぶポイントをまとめました。",
      keyPoints: [
        "面倒な営業連絡やノルマなし",
        "お風呂掃除や長時間の密室拘束なし",
        "経験や希望に応じた好待遇"
      ],
      featuredArticles: [
        { slug: "tobitashinchi-vs-other-night-jobs", title: "他業種の夜職と飛田新地の働き方を徹底比較", tag: "業界比較" },
        { slug: "tobitashinchi-stamina-mental-care-100k", title: "無理なく日給10万円をキープするコツ", tag: "収入アップ" }
      ],
      buttonText: "経験者向けの待遇を確認する"
    },
    {
      id: "requirements",
      path: "/requirements",
      number: "05",
      emoji: "📋",
      title: "募集要項",
      bannerHeadline: "応募する前に確認！",
      bannerSubtext: "年齢・応募条件・勤務条件",
      questionTitle: "募集要項｜応募条件と手ぶら面接の必要書類",
      tagline: "20歳以上の女性限定・安心の料亭直営募集条件",
      badge: "20歳以上",
      icon: "FileText",
      image: "/images/cat_05_requirements_1794165002731.jpg",
      summary: "応募に必要な年齢や資格、面接当日に必要な書類について解説しています。履歴書不要で参加できる手ぶら面接の条件などを確認できます。",
      keyPoints: [
        "満20歳以上の女性が対象",
        "履歴書不要・私服のまま手ぶら面接OK",
        "本籍地記載の住民票または身分証"
      ],
      featuredArticles: [
        { slug: "tobitashinchi-id-requirements", title: "面接時に必要な身分証と住民票の準備方法", tag: "必要書類" },
        { slug: "tobitashinchi-interview-guide", title: "応募条件と採用までのステップを解説", tag: "応募資格" }
      ],
      buttonText: "応募条件・募集内容を確認する"
    },
    {
      id: "flow",
      path: "/flow",
      number: "06",
      emoji: "🌸",
      title: "面接・体入の流れ",
      bannerHeadline: "面接では何をする？",
      bannerSubtext: "応募から体験入店まで",
      questionTitle: "面接・体入｜応募から体験入店までの流れ",
      tagline: "履歴書不要・私服見学OK・面接当日の即日体入対応",
      badge: "手ぶらOK",
      icon: "Calendar",
      image: "/images/cat_06_interview_1794165003714.jpg",
      summary: "応募から面接、体験入店までの具体的な手順について解説しています。当日の持ち物やお店の雰囲気を確認しながら、安心して進められる流れをまとめました。",
      keyPoints: [
        "LINEから気軽に相談・見学予約OK",
        "面接当日の体験入店に対応",
        "合わなければ体験のみで終了可能"
      ],
      featuredArticles: [
        { slug: "tobitashinchi-interview-guide", title: "面接から体験入店までの具体的な手順", tag: "面接の流れ" },
        { slug: "tobitashinchi-trial-guide", title: "体験入店当日の持ち物と心構えまとめ", tag: "体入ガイド" }
      ],
      buttonText: "面接から体験入店までを見る"
    },
    {
      id: "workstyle",
      path: "/workstyle",
      number: "07",
      emoji: "⏰",
      title: "働き方",
      bannerHeadline: "自分らしく働きたい",
      bannerSubtext: "勤務日数・時間・シフト",
      questionTitle: "働き方｜自分のペースで選べるシフト",
      tagline: "完全自由出勤制・週1日〜・短時間・OL副業対応",
      badge: "自由出勤",
      icon: "Clock",
      image: "/images/cat_07_workstyle_1794165005151.jpg",
      summary: "昼職や家庭と両立しながら働ける勤務時間やシフトについて解説しています。週1日や短時間勤務など、自分のペースに合わせた働き方を確認できます。",
      keyPoints: [
        "朝・昼・夕方から選べるシフト制",
        "週1日〜・短時間勤務も相談可能",
        "自分のライフスタイルに合わせて出勤"
      ],
      featuredArticles: [
        { slug: "tobitashinchi-double-work-lifestyle", title: "会社員や学生のWワーク・副業の始め方", tag: "副業・Wワーク" },
        { slug: "tobitashinchi-daytime-shift-advantage", title: "朝シフト・昼シフトが人気の理由とメリット", tag: "シフト選び" }
      ],
      buttonText: "勤務時間・シフトについて見る"
    },
    {
      id: "shops",
      path: "/shops",
      number: "08",
      emoji: "🏮",
      title: "お店選び",
      bannerHeadline: "お店選びで失敗しないために",
      bannerSubtext: "比較したいポイント",
      questionTitle: "お店選び｜通りごとの特徴と安心の直営店",
      tagline: "メイン通り・青春通り・大門通りの特徴と直営店",
      badge: "直営安心",
      icon: "Store",
      image: "/images/cat_08_shops_1794165005681.jpg",
      summary: "通りごとの雰囲気や客層の違い、安心して働けるお店の見極め方を解説しています。自分に合った環境をじっくり比較するためのポイントをまとめました。",
      keyPoints: [
        "メイン通りや青春通りの特徴を解説",
        "店舗直営だから仲介料やトラブルなし",
        "お店の雰囲気を事前にしっかり確認"
      ],
      featuredArticles: [
        { slug: "tobitashinchi-street-differences-recruitment", title: "青春通りとメイン通りの客層と違い", tag: "通り比較" },
        { slug: "tobitashinchi-scout-fraud-avoidance-safe-recruitment", title: "悪質スカウトや求人トラブルを防ぐ注意点", tag: "安全なお店選び" }
      ],
      buttonText: "お店選びのポイントを確認する"
    },
    {
      id: "dorm",
      path: "/dorm",
      number: "09",
      emoji: "🏠",
      title: "寮・出稼ぎ",
      bannerHeadline: "遠方からでも働ける？",
      bannerSubtext: "寮・住まい・出稼ぎ",
      questionTitle: "寮・出稼ぎ｜完全個室寮と交通費支給",
      tagline: "家具家電付き個室マンション寮・往復交通費全額支給",
      badge: "個室寮完備",
      icon: "Home",
      image: "/images/cat_09_dorm_1794165006753.jpg",
      summary: "遠方から大阪に来られる女性向けの寮設備や交通費サポートについて解説しています。家具家電付きの住まいや短期滞在の流れをわかりやすくまとめました。",
      keyPoints: [
        "家具家電・Wi-Fi付きの完全個室寮",
        "遠方からの往復交通費をサポート",
        "荷物ひとつで即日入居・短期も歓迎"
      ],
      featuredArticles: [
        { slug: "tobitashinchi-housing-support", title: "完全個室マンション寮の設備と入居ルール", tag: "個室寮" },
        { slug: "local-travel-work-hotel-support", title: "地方からの短期出稼ぎと交通費の支給制度", tag: "出稼ぎサポート" }
      ],
      buttonText: "寮・出稼ぎについて確認する"
    },
    {
      id: "safety",
      path: "/safety",
      number: "10",
      emoji: "🔒",
      title: "プライバシー対策",
      bannerHeadline: "身バレが心配な方へ",
      bannerSubtext: "プライバシー・安全対策",
      questionTitle: "プライバシー対策｜身バレを防ぐ安全対策",
      tagline: "ネット写真ゼロ・完全源氏名・住民税普通徴収対策",
      badge: "プライバシー対策",
      icon: "EyeOff",
      image: "/images/cat_10_privacy_1794165006455.jpg",
      summary: "顔出しや個人情報、知人に知られないための対策など、応募前に確認したいプライバシー情報をまとめました。",
      keyPoints: [
        "街全体での撮影禁止ルールを徹底",
        "完全源氏名で個人情報を保護",
        "副業の方のための確定申告サポート"
      ],
      featuredArticles: [
        { slug: "tobitashinchi-privacy-guide", title: "身バレを防いで誰にも知られずに働く方法", tag: "プライバシー" },
        { slug: "tobitashinchi-tax-guide", title: "会社や家族に知られないための住民税と確定申告", tag: "税金対策" }
      ],
      buttonText: "プライバシー対策を確認する"
    },
    {
      id: "faq",
      path: "/faq",
      number: "11",
      emoji: "💡",
      title: "よくある質問",
      bannerHeadline: "応募前の疑問を解決！",
      bannerSubtext: "よくある質問",
      questionTitle: "よくある質問｜応募前の不安を解消するQ&A",
      tagline: "業界最多クラス全119問・8大テーマ体系化Q&A",
      badge: "全119問",
      icon: "HelpCircle",
      image: "/images/cat_11_faq_1794165006079.jpg",
      summary: "応募前によく寄せられる質問や気になる疑問について回答をまとめています。体調管理や年齢層など、直接聞きづらい不安も事前に確認できます。",
      keyPoints: [
        "応募前の不安や疑問をテーマ別に網羅",
        "生理時や急な体調不良の対応も掲載",
        "現場のリアルな実態をわかりやすく回答"
      ],
      featuredArticles: [
        { slug: "tobita-safe-recruitment", title: "応募前によくある質問と現場の安全管理", tag: "Q&Aまとめ" },
        { slug: "tobitashinchi-training-lecture-no-practical-exam", title: "新人研修の内容と事前の口頭説明について", tag: "研修案内" }
      ],
      buttonText: "応募前の疑問を解決する"
    },
    {
      id: "blog",
      path: "/blog",
      number: "12",
      emoji: "📚",
      title: "お仕事コラム",
      bannerHeadline: "知っておきたいお仕事情報",
      bannerSubtext: "女性のためのお役立ちコラム",
      questionTitle: "お仕事コラム｜働く前に知りたい体験談とノウハウ",
      tagline: "100本以上の解説記事・テーマ別実務ノウハウ",
      badge: "100本超",
      icon: "BookOpen",
      image: "/images/cat_12_column_1794165007745.jpg",
      summary: "実際に働くキャストの体験談や日常の過ごし方など、役立つ情報をコラム形式でお届けしています。働く前のイメージ作りにぜひお役立てください。",
      keyPoints: [
        "現役女性のリアルな体験談を多数掲載",
        "稼ぎ方や生活スタイルの実例紹介",
        "応募前に役立つ知識を随時更新"
      ],
      featuredArticles: [
        { slug: "tobita-job-guide", title: "飛田新地で働く女性のための総合情報まとめ", tag: "総合解説" },
        { slug: "tobitashinchi-salary-system", title: "高収入を得るためのポイントと実際の給料", tag: "給料コラム" }
      ],
      buttonText: "お仕事コラムを読む"
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
          <div className="inline-flex items-center gap-1.5 bg-[#FFF0F4] text-[#E90048] text-xs font-black px-4 py-1.5 rounded-full mb-3.5 shadow-2xs border border-[#F0E5E9]">
            <LucideIcon name="Compass" size={14} className="text-[#E90048]" />
            <span>公式分野別案内（全12カテゴリー）</span>
          </div>
          
          <h2 className="font-display font-black text-2xl sm:text-3xl md:text-4xl text-[#333333] leading-tight mb-4 tracking-tight">
            <span className="text-[#333333]">
              飛田新地求人 総合ガイド
            </span>
          </h2>
          
          <p className="font-sans text-xs sm:text-sm text-[#777777] leading-relaxed max-w-2xl mx-auto">
            仕事内容・給料・未経験・経験者・面接の流れ・働き方・お店選び・寮・プライバシー対策など、知りたい疑問を12のテーマに体系化。各カードから詳しい解説や詳細情報をご覧いただけます。
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="mb-8" id="category-selector">
          <div className="flex items-center justify-between mb-3 px-1">
            <span className="text-xs font-bold text-[#333333] flex items-center gap-1.5">
              <LucideIcon name="Search" size={13} className="text-[#E90048]" />
              <span>テーマを選択して絞り込み</span>
            </span>
            {activeCategory !== 'all' && (
              <button
                type="button"
                onClick={() => setActiveCategory('all')}
                className="text-xs font-bold text-[#E90048] hover:underline cursor-pointer flex items-center gap-1"
              >
                <span>全12テーマを表示に戻す</span>
              </button>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
            <button
              type="button"
              onClick={() => setActiveCategory('all')}
              className={`px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 shadow-2xs ${
                activeCategory === 'all'
                  ? 'bg-[#E90048] text-white shadow-sm ring-2 ring-[#E90048]/30'
                  : 'bg-white text-[#555555] hover:bg-[#FFF0F4] hover:text-[#E90048] border border-[#F0E5E9]'
              }`}
            >
              <span>✨ すべて (全12テーマ)</span>
            </button>

            {clusterItems.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                className={`px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 shadow-2xs ${
                  activeCategory === cat.id
                    ? 'bg-[#E90048] text-white shadow-sm ring-2 ring-[#E90048]/30'
                    : 'bg-white text-[#555555] hover:bg-[#FFF0F4] hover:text-[#E90048] border border-[#F0E5E9]'
                }`}
              >
                <span>{cat.emoji}</span>
                <span>{cat.title}</span>
              </button>
            ))}
          </div>
        </div>

        {/* 12 Category Hub Bento Grid Cards (3列×4段) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {displayedItems.map((cat, index) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: Math.min(index * 0.04, 0.3) }}
              className="bg-white rounded-2xl overflow-hidden border border-[#F0E5E9] shadow-xs hover:shadow-md hover:border-[#E90048]/40 transition-all duration-300 flex flex-col justify-between group h-full"
              id={`hub-cluster-${cat.id}`}
            >
              <div className="flex flex-col flex-1">
                {/* ① メイン画像バナー（16:9, 横長, 写真面積を拡大＆白い文字エリア高さを15〜20%縮小） */}
                <a
                  href={cat.path}
                  onClick={(e) => {
                    e.preventDefault();
                    handleCardClick(cat);
                  }}
                  className="relative aspect-video w-full overflow-hidden bg-[#FFF0F4] cursor-pointer group/banner select-none block"
                  title={`「${cat.title}」の解説を見る`}
                >
                  {/* 背景写真素材（明るいベージュ・アイボリー系） */}
                  <img
                    src={cat.image}
                    alt={`${cat.title}の背景写真`}
                    className="w-full h-full object-cover group-hover/banner:scale-105 transition-transform duration-700 ease-out"
                    loading="lazy"
                    decoding="async"
                    onError={(e) => {
                      const target = e.currentTarget as HTMLImageElement;
                      target.onerror = null;
                      target.src = '/images/tobita_soft_hero_1782370495398.jpg';
                    }}
                  />

                  {/* バナー内レイヤー（15〜20%コンパクト化・1行厳守・写真の視認性向上） */}
                  <div className="absolute inset-0 p-2.5 sm:p-3 flex flex-col justify-between z-10 pointer-events-none">
                    {/* 左上：小さなTOPIC番号 ＆ 右上：対象者バッジ */}
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-mono font-extrabold text-[11px] px-2.5 py-0.5 rounded-full bg-white/95 text-[#333333] shadow-xs border border-white/90 tracking-wider">
                        TOPIC {cat.number}
                      </span>
                      <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-white/95 text-[#E90048] shadow-xs inline-flex items-center gap-1 border border-white/90">
                        <span>{cat.emoji}</span>
                        <span>{cat.badge}</span>
                      </span>
                    </div>

                    {/* メイン部分＋補足テキスト（白い文字エリア高さを約18%縮小、2行にならない1行設定） */}
                    <div className="bg-white/95 backdrop-blur-sm px-2.5 py-2 sm:px-3 sm:py-2 rounded-xl border border-white/90 shadow-xs max-w-[95%] sm:max-w-[88%] text-left">
                      {/* メイン部分：大きなキャッチコピー（1行厳守・読みやすい大きさ） */}
                      <h3 className="font-display font-extrabold text-[14.5px] sm:text-[15.5px] text-[#222222] leading-tight tracking-tight whitespace-nowrap overflow-hidden text-ellipsis">
                        {cat.bannerHeadline}
                      </h3>
                      {/* メインコピーの下：小さな補足テキスト */}
                      <p className="font-sans text-[11px] text-[#E90048] font-bold tracking-wide flex items-center gap-1.5 mt-1 whitespace-nowrap overflow-hidden text-ellipsis">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#E90048] shrink-0" />
                        <span className="truncate">{cat.bannerSubtext}</span>
                      </p>
                    </div>
                  </div>
                </a>

                {/* カード内コンテンツエリア */}
                <div className="p-4 sm:p-5 flex flex-col flex-1">
                  {/* カード下部の具体的タイトル */}
                  <h4 className="font-display font-bold text-[16px] sm:text-[17px] text-[#333333] leading-snug mb-2.5">
                    <a
                      href={cat.path}
                      onClick={(e) => {
                        e.preventDefault();
                        handleCardClick(cat);
                      }}
                      className="hover:text-[#E90048] transition-colors cursor-pointer"
                    >
                      {cat.questionTitle}
                    </a>
                  </h4>

                  {/* ② 説明文 (2〜3行程度に整理・初心者にも分かりやすい自然な日本語) */}
                  <p className="font-sans text-[13.5px] sm:text-[14px] text-[#555555] leading-relaxed mb-4 min-h-[3.8rem]">
                    {cat.summary}
                  </p>

                  {/* ③ 3つのチェック項目 (淡いピンク背景維持・13px・短く具体的に) */}
                  <div className="bg-[#FFF0F4] rounded-xl p-3 border border-[#F0E5E9] mb-4 space-y-1.5">
                    {cat.keyPoints.slice(0, 3).map((pt, i) => (
                      <div key={i} className="flex items-center gap-2 text-[13px] text-[#333333] font-medium leading-snug">
                        <span className="w-4 h-4 rounded-full bg-white text-[#E90048] border border-[#F0E5E9] flex items-center justify-center shrink-0 text-[10px] font-black shadow-2xs">
                          ✓
                        </span>
                        <span>{pt}</span>
                      </div>
                    ))}
                  </div>

                  {/* ④ おすすめ関連記事 (最大2記事・13〜14px・淡いピンクタグ・行間少し広げる) */}
                  <div className="space-y-2 mb-2">
                    <span className="text-[11px] font-bold text-[#777777] block px-0.5">
                      おすすめ関連記事
                    </span>
                    {cat.featuredArticles.slice(0, 2).map((art) => (
                      <a
                        key={art.slug}
                        href={`/blog/${art.slug}`}
                        onClick={(e) => {
                          e.preventDefault();
                          if (onNavigateToArticle) onNavigateToArticle(art.slug);
                          else onScrollToSection('jobs');
                        }}
                        className="w-full text-left py-2 px-2.5 sm:py-2.5 sm:px-3 rounded-xl border border-[#F0E5E9] hover:border-[#E90048]/40 bg-white hover:bg-[#FFF0F4]/40 transition-all cursor-pointer flex items-center justify-between group/art text-[13px] sm:text-[13.5px]"
                      >
                        <div className="flex items-center gap-2 truncate mr-1.5">
                          <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-[#FFF0F4] text-[#E90048] border border-[#F0E5E9] shrink-0">
                            {art.tag}
                          </span>
                          <span className="text-[#333333] group-hover/art:text-[#E90048] truncate font-medium">
                            {art.title}
                          </span>
                        </div>
                        <LucideIcon name="ChevronRight" size={13} className="text-[#777777] group-hover/art:text-[#E90048] shrink-0 transition-transform group-hover/art:translate-x-0.5" />
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              {/* ⑤ 詳細ページへのボタン (指定された新文言・ピンク色 #E90048 を維持) */}
              <div className="p-4 sm:p-5 pt-0 mt-auto">
                <a
                  href={cat.path}
                  onClick={(e) => {
                    e.preventDefault();
                    handleCardClick(cat);
                  }}
                  className="w-full h-11 bg-[#E90048] hover:bg-[#D10040] text-white font-bold text-[13.5px] sm:text-[14px] rounded-xl shadow-xs hover:shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>{cat.buttonText}</span>
                  <LucideIcon name="ArrowRight" size={14} className="shrink-0" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Quick Link Banner: 希望条件から探す求人比較バナー */}
        <div className="bg-gradient-to-br from-[#FFF0F4] via-[#FFF6F9] to-[#FFF9F6] border border-[#FFE2EB] rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-9 shadow-xs hover:shadow-sm transition-all">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 lg:gap-8">
            
            {/* 左側（約75%）：小見出し、メインタイトル、説明文、条件タグ */}
            <div className="w-full lg:w-[74%] text-left">
              {/* 1. 小見出し */}
              <div className="inline-flex items-center gap-1.5 bg-[#FFE2EB] text-[#E90048] text-[12px] font-bold px-3 py-1 rounded-full mb-3">
                <LucideIcon name="Compass" size={13} className="text-[#E90048]" />
                <span>求人比較ガイド｜希望条件から探す</span>
              </div>

              {/* 2. メインタイトル */}
              <h3 className="font-display font-bold text-[21px] sm:text-[23px] lg:text-[26px] xl:text-[28px] text-[#49313B] leading-snug tracking-tight mb-2.5 break-keep">
                あなたに合う働き方、見つけませんか？
              </h3>

              {/* 3. 説明文 */}
              <p className="font-sans text-[13.5px] sm:text-[14px] lg:text-[15px] text-[#755C66] leading-relaxed mb-5 max-w-3xl">
                未経験・収入・勤務日数・寮など、希望条件に合わせて求人情報や働き方を比較できます。自分に合った選択肢を見つけるための情報をまとめました。
              </p>

              {/* 4. 条件タグ (完全ピル型・白背景・薄ピンク境界線・濃いピンク文字・ホバー時変化) */}
              <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
                {[
                  {
                    label: '未経験',
                    href: '/compare/inexperienced',
                    onClick: () => onNavigateCompare ? onNavigateCompare('inexperienced') : onScrollToSection('compare')
                  },
                  {
                    label: '経験者',
                    href: '/experienced',
                    onClick: () => onNavigateTopic ? onNavigateTopic('experienced') : (onNavigateCompare ? onNavigateCompare('high-income') : onScrollToSection('compare'))
                  },
                  {
                    label: '1日8~10万高収入',
                    href: '/compare/high-income',
                    onClick: () => onNavigateCompare ? onNavigateCompare('high-income') : onScrollToSection('compare')
                  },
                  {
                    label: '週1日から',
                    href: '/compare/weekly-1',
                    onClick: () => onNavigateCompare ? onNavigateCompare('weekly-1') : onScrollToSection('compare')
                  },
                  {
                    label: '出稼ぎ',
                    href: '/compare/dormitory',
                    onClick: () => onNavigateCompare ? onNavigateCompare('dormitory') : onScrollToSection('compare')
                  },
                  {
                    label: '掛け持ち・Wワーク',
                    href: '/compare/double-work',
                    onClick: () => onNavigateCompare ? onNavigateCompare('double-work') : onScrollToSection('compare')
                  },
                  {
                    label: '20代',
                    href: '/compare/age-20s',
                    onClick: () => onNavigateCompare ? onNavigateCompare('age-20s') : onScrollToSection('compare')
                  },
                  {
                    label: '30代',
                    href: '/compare/age-30s',
                    onClick: () => onNavigateCompare ? onNavigateCompare('age-30s') : onScrollToSection('compare')
                  },
                  {
                    label: '40代',
                    href: '/compare/age-40s',
                    onClick: () => onNavigateCompare ? onNavigateCompare('age-40s') : onScrollToSection('compare')
                  },
                ].map((tag) => (
                  <a
                    key={tag.label}
                    href={tag.href}
                    onClick={(e) => {
                      e.preventDefault();
                      tag.onClick();
                    }}
                    className="bg-[#FFFFFF] hover:bg-[#FFE2EB] text-[#B33F69] hover:text-[#E90048] border border-[#FFE2EB] hover:border-[#E90048]/30 px-3.5 py-1.5 rounded-full text-[12px] sm:text-[12.5px] lg:text-[13px] font-medium transition-all cursor-pointer shadow-2xs select-none inline-flex items-center justify-center"
                    title={`「${tag.label}」の求人条件を比較する`}
                  >
                    <span>{tag.label}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* 右側（約25%）：CTAボタン（周囲に十分な余白・メインピンク #E90048・角丸12px・白文字・右向き矢印） */}
            <div className="w-full lg:w-[26%] flex lg:justify-end lg:items-center shrink-0 pt-2 lg:pt-0">
              <a
                href="/compare"
                onClick={(e) => {
                  e.preventDefault();
                  if (onNavigateCompare) onNavigateCompare();
                  else onScrollToSection('compare');
                }}
                className="w-full lg:w-auto bg-[#E90048] hover:bg-[#D10040] text-white font-bold text-[14px] lg:text-[15px] px-6 py-3.5 rounded-[12px] shadow-xs hover:shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer group"
                id="recruit-hub-compare-btn"
              >
                <span>自分に合う求人を見つける</span>
              </a>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
