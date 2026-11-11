/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import LucideIcon from './LucideIcon';
import { LINE_OFFICIAL_URL } from '../data';
import { BLOG_ARTICLES } from '../blogData';

interface BeginnerPageProps {
  onNavigateHome: () => void;
  onNavigateTopic?: (topicId: string) => void;
  onNavigateBlog?: (slug?: string) => void;
  onNavigateFaq?: () => void;
  onCtaclick: () => void;
  onInjectedScroll?: (msg: string) => void;
}

export default function BeginnerPage({
  onNavigateHome,
  onNavigateTopic,
  onNavigateBlog,
  onNavigateFaq,
  onInjectedScroll,
}: BeginnerPageProps) {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleLineClick = (messageText: string) => {
    if (onInjectedScroll) {
      onInjectedScroll(messageText);
    } else {
      window.open(LINE_OFFICIAL_URL, '_blank', 'noopener,noreferrer');
    }
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Structured Data (JSON-LD) for SEO
  useEffect(() => {
    const existingScript = document.getElementById('beginner-schema');
    if (existingScript) existingScript.remove();

    try {
      const script = document.createElement('script');
      script.id = 'beginner-schema';
      script.type = 'application/ld+json';

      const schemaData = {
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'BreadcrumbList',
            '@id': 'https://tobitashinchi-recruit.com/beginner#breadcrumb',
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
                'name': '未経験',
                'item': 'https://tobitashinchi-recruit.com/beginner'
              }
            ]
          },
          {
            '@type': 'FAQPage',
            '@id': 'https://tobitashinchi-recruit.com/beginner#faq',
            'mainEntity': BEGINNER_FAQS.slice(0, 12).map((item) => ({
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

      script.textContent = JSON.stringify(schemaData);
      document.head.appendChild(script);
    } catch (e) {
      console.error('Error injecting JSON-LD schema:', e);
    }

    return () => {
      const script = document.getElementById('beginner-schema');
      if (script) script.remove();
    };
  }, []);

  return (
    <div className="bg-[#FFF9FB] min-h-screen text-[#35313A] pb-24 pt-4 sm:pt-6 font-sans antialiased selection:bg-[#FCE8EF] selection:text-[#D94B7A]">
      
      {/* 1. パンくずリスト */}
      <div className="max-w-[1140px] mx-auto px-4 sm:px-6 mb-4">
        <nav aria-label="Breadcrumb" className="flex items-center text-xs">
          <ol className="flex items-center gap-1.5 flex-wrap text-[#85818A]">
            <li className="flex items-center gap-1">
              <button
                type="button"
                onClick={onNavigateHome}
                className="hover:text-[#D94B7A] font-bold flex items-center gap-1 text-[#35313A] hover:underline cursor-pointer"
              >
                <LucideIcon name="Home" size={13} className="text-[#D94B7A]" />
                <span>飛田新地求人（トップ）</span>
              </button>
            </li>
            <li className="text-[#85818A]">/</li>
            <li className="font-bold text-[#D94B7A]" aria-current="page">
              未経験
            </li>
          </ol>
        </nav>
      </div>

      {/* クイック目次アンカーバー（スマホでも横スクロールで快適） */}
      <div className="max-w-[1140px] mx-auto px-4 sm:px-6 mb-6">
        <div className="flex items-center gap-2 overflow-x-auto py-1 scrollbar-none text-xs text-[#85818A]">
          <span className="font-bold text-[#35313A] whitespace-nowrap text-[11px] flex items-center gap-1">
            <LucideIcon name="Compass" size={13} className="text-[#D94B7A]" />
            ページ内目次:
          </span>
          <button
            type="button"
            onClick={() => scrollToSection('points')}
            className="px-3 py-1.5 rounded-full bg-white hover:bg-[#FCE8EF] hover:text-[#D94B7A] border border-[#F0E5EA] whitespace-nowrap transition-colors cursor-pointer"
          >
            知っておきたい4つのこと
          </button>
          <button
            type="button"
            onClick={() => scrollToSection('features')}
            className="px-3 py-1.5 rounded-full bg-white hover:bg-[#FCE8EF] hover:text-[#D94B7A] border border-[#F0E5EA] whitespace-nowrap transition-colors cursor-pointer"
          >
            6つの特徴
          </button>
          <button
            type="button"
            onClick={() => scrollToSection('first-day-flow')}
            className="px-3 py-1.5 rounded-full bg-white hover:bg-[#FCE8EF] hover:text-[#D94B7A] border border-[#F0E5EA] whitespace-nowrap transition-colors cursor-pointer"
          >
            初日の流れ
          </button>
          <button
            type="button"
            onClick={() => scrollToSection('checklist')}
            className="px-3 py-1.5 rounded-full bg-white hover:bg-[#FCE8EF] hover:text-[#D94B7A] border border-[#F0E5EA] whitespace-nowrap transition-colors cursor-pointer"
          >
            働く前の確認事項
          </button>
          <button
            type="button"
            onClick={() => scrollToSection('columns')}
            className="px-3 py-1.5 rounded-full bg-white hover:bg-[#FCE8EF] hover:text-[#D94B7A] border border-[#F0E5EA] whitespace-nowrap transition-colors cursor-pointer"
          >
            おすすめ記事
          </button>
          <button
            type="button"
            onClick={() => scrollToSection('faq')}
            className="px-3 py-1.5 rounded-full bg-white hover:bg-[#FCE8EF] hover:text-[#D94B7A] border border-[#F0E5EA] whitespace-nowrap transition-colors cursor-pointer"
          >
            よくある質問
          </button>
          <button
            type="button"
            onClick={() => scrollToSection('line-cta')}
            className="px-3 py-1.5 rounded-full bg-[#06C755]/10 text-[#059669] hover:bg-[#06C755] hover:text-white border border-[#06C755]/30 whitespace-nowrap font-bold transition-colors cursor-pointer"
          >
            LINE相談
          </button>
        </div>
      </div>

      <div className="max-w-[1140px] mx-auto px-4 sm:px-6 space-y-12 sm:space-y-16">

        {/* =========================================================
            SECTION 2: ファーストビュー全面改善
           ========================================================= */}
        <section className="bg-white rounded-3xl p-6 sm:p-9 md:p-12 border border-[#F0E5EA] shadow-2xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* 左側（スマホではテキスト部） */}
            <div className="lg:col-span-7 space-y-5">
              
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold text-[#D94B7A] bg-[#FCE8EF] border border-[#F0E5EA] px-3.5 py-1 rounded-full inline-block">
                  未経験
                </span>
                <span className="text-xs text-[#85818A] font-medium">初めて夜職を検討されている方へ</span>
              </div>

              {/* メインコピー（27〜30px） */}
              <h1 className="text-[27px] sm:text-[30px] font-black text-[#35313A] leading-[1.3] tracking-tight">
                初めてだから不安。<br />
                <span className="text-[#D94B7A]">その気持ちから、一緒に考えます。</span>
              </h1>

              {/* サブコピー */}
              <p className="text-base sm:text-[16px] text-[#35313A] leading-relaxed font-normal">
                在籍キャストの多くが夜職未経験からスタート（当店在籍者の約9割※）。女性専任スタッフが、仕事内容や働き始めるまでの流れを丁寧にご案内します。
              </p>

              {/* 根拠・定義の注記 */}
              <p className="text-[12px] sm:text-[13px] text-[#85818A] leading-relaxed">
                ※2024〜2026年当店在籍・面接応募キャスト集計（学生・昼職OL・主婦・フリーターなど夜職未経験者の割合）
              </p>

              {/* スマホ表示用：写真（スマホではコピーの直下に配置） */}
              <div className="lg:hidden my-4">
                <div className="relative rounded-2xl overflow-hidden border border-[#F0E5EA] bg-[#FFF9FB] shadow-xs">
                  <img
                    src="/images/tobita_beginner_support_1788153037569.jpg"
                    alt="女性スタッフが相談に対応している様子"
                    className="w-full h-[220px] object-cover"
                    loading="eager"
                  />
                  <div className="p-3 bg-white/95 border-t border-[#F0E5EA] text-[12px] text-[#85818A] flex items-center gap-1.5">
                    <LucideIcon name="HeartHandshake" size={14} className="text-[#D94B7A] shrink-0" />
                    <span>女性専任スタッフが個室で丁寧にお話を伺います</span>
                  </div>
                </div>
              </div>

              {/* 補足ポイント（3つの小さなバッジ） */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
                <div className="flex items-center gap-2 p-3 rounded-xl bg-[#FFF9FB] border border-[#F0E5EA]">
                  <div className="w-7 h-7 rounded-lg bg-[#FCE8EF] text-[#D94B7A] flex items-center justify-center shrink-0">
                    <LucideIcon name="HeartHandshake" size={15} />
                  </div>
                  <span className="text-xs sm:text-[13px] font-bold text-[#35313A]">
                    女性スタッフによる<br className="hidden sm:inline" />相談対応
                  </span>
                </div>

                <div className="flex items-center gap-2 p-3 rounded-xl bg-[#FFF9FB] border border-[#F0E5EA]">
                  <div className="w-7 h-7 rounded-lg bg-[#FCE8EF] text-[#D94B7A] flex items-center justify-center shrink-0">
                    <LucideIcon name="Clock" size={15} />
                  </div>
                  <span className="text-xs sm:text-[13px] font-bold text-[#35313A]">
                    初日の流れを<br className="hidden sm:inline" />事前に説明
                  </span>
                </div>

                <div className="flex items-center gap-2 p-3 rounded-xl bg-[#FFF9FB] border border-[#F0E5EA]">
                  <div className="w-7 h-7 rounded-lg bg-[#FCE8EF] text-[#D94B7A] flex items-center justify-center shrink-0">
                    <LucideIcon name="MessageCircle" size={15} />
                  </div>
                  <span className="text-xs sm:text-[13px] font-bold text-[#35313A]">
                    応募前の質問<br className="hidden sm:inline" />だけでもOK
                  </span>
                </div>
              </div>

              {/* LINEボタン */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <a
                  href={LINE_OFFICIAL_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => {
                    e.preventDefault();
                    handleLineClick('【未経験ページからの相談】初日の流れや仕事内容について、応募前に少し質問してみたいです。');
                  }}
                  className="px-7 py-3.5 rounded-full bg-[#06C755] hover:bg-[#05b34c] text-white font-bold text-sm shadow-xs transition-all cursor-pointer flex items-center justify-center gap-2.5 text-center"
                >
                  <LucideIcon name="MessageCircle" size={18} />
                  <span>仕事内容について質問してみる</span>
                </a>
                <span className="text-xs text-[#85818A] text-center sm:text-left">
                  ※応募を決めずに質問・相談だけでも歓迎です
                </span>
              </div>

            </div>

            {/* 右側（PC用：落ち着いた相談風景写真） */}
            <div className="hidden lg:block lg:col-span-5">
              <div className="relative rounded-3xl overflow-hidden border border-[#F0E5EA] bg-[#FFF9FB] shadow-xs">
                <img
                  src="/images/tobita_beginner_support_1788153037569.jpg"
                  alt="実際の女性スタッフによる落ち着いた相談風景"
                  className="w-full h-[360px] object-cover"
                  loading="eager"
                />
                <div className="p-3.5 bg-white border-t border-[#F0E5EA] text-xs text-[#85818A] flex items-center gap-2">
                  <LucideIcon name="HeartHandshake" size={16} className="text-[#D94B7A] shrink-0" />
                  <span>プライバシーに配慮した個室相談スペースで女性スタッフが対応します</span>
                </div>
              </div>
            </div>

          </div>
        </section>


        {/* =========================================================
            SECTION 3: ファーストビュー直下の数字カード（4つの事実カード）
           ========================================================= */}
        <section className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
          
          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-[#F0E5EA] shadow-2xs space-y-2">
            <span className="text-xs text-[#85818A] block font-medium">未経験スタートの割合</span>
            <div className="text-[26px] sm:text-[30px] font-black text-[#D94B7A] font-display tracking-tight">
              約90<span className="text-base sm:text-lg font-bold text-[#35313A] ml-0.5">%</span>
            </div>
            <p className="text-[13px] text-[#35313A] leading-relaxed pt-1 border-t border-[#F0E5EA]/70">
              在籍キャストの約9割が夜職完全未経験。学生・昼職OL・主婦・フリーターなど普通の方が活躍中。
            </p>
          </div>

          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-[#F0E5EA] shadow-2xs space-y-2">
            <span className="text-xs text-[#85818A] block font-medium">女性スタッフ対応体制</span>
            <div className="text-[26px] sm:text-[30px] font-black text-[#D94B7A] font-display tracking-tight">
              100<span className="text-base sm:text-lg font-bold text-[#35313A] ml-0.5">%</span>
            </div>
            <p className="text-[13px] text-[#35313A] leading-relaxed pt-1 border-t border-[#F0E5EA]/70">
              専任女性スタッフが常駐。面接・相談から初日の案内、日々の体調ケアまで同性スタッフが完全対応。
            </p>
          </div>

          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-[#F0E5EA] shadow-2xs space-y-2">
            <span className="text-xs text-[#85818A] block font-medium">初日の研修内容</span>
            <div className="text-[22px] sm:text-[26px] font-black text-[#D94B7A] tracking-tight">
              口頭のみ
            </div>
            <p className="text-[13px] text-[#35313A] leading-relaxed pt-1 border-t border-[#F0E5EA]/70">
              実技や身体を使う研修は一切なし。接客手順やマナーを座学で確認するだけのクリーンな講習です。
            </p>
          </div>

          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-[#F0E5EA] shadow-2xs space-y-2">
            <span className="text-xs text-[#85818A] block font-medium">初日の収入目安（平均モデル）</span>
            <div className="text-[20px] sm:text-[24px] font-black text-[#D94B7A] font-display tracking-tight">
              4万〜7<span className="text-xs sm:text-sm font-bold text-[#35313A] ml-0.5">万円〜</span>
            </div>
            <p className="text-[13px] text-[#35313A] leading-relaxed pt-1 border-t border-[#F0E5EA]/70">
              売上50%完全バック・全額日払い手渡し。※未経験初日平均稼働実績モデル（天引き0円）。
            </p>
          </div>

        </section>


        {/* =========================================================
            SECTION 4: 初めて働く前に、知っておきたい4つのこと
           ========================================================= */}
        <section id="points" className="bg-white rounded-3xl p-6 sm:p-9 md:p-10 border border-[#F0E5EA] shadow-2xs scroll-mt-20">
          <div className="max-w-2xl mb-8">
            <span className="text-[11px] font-bold text-[#D94B7A] bg-[#FCE8EF] border border-[#F0E5EA] px-3.5 py-1 rounded-full inline-block mb-2">
              POINT CHECK
            </span>
            <h2 className="text-[21px] sm:text-[24px] font-black text-[#35313A] tracking-tight">
              初めて働く前に、知っておきたい4つのこと
            </h2>
            <p className="text-xs sm:text-[14px] text-[#85818A] mt-2 leading-relaxed">
              未経験の女性が安心してスタートできるよう、最初に押さえておきたい重要ポイントを整理しました。
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            
            {/* CARD 01 */}
            <div 
              onClick={() => scrollToSection('features')}
              className="p-5 sm:p-6 rounded-2xl bg-[#FFF9FB] border border-[#F0E5EA] hover:border-[#D94B7A]/40 transition-all cursor-pointer group"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono font-black text-[#D94B7A] bg-white px-2.5 py-1 rounded-md border border-[#F0E5EA]">
                  POINT 01
                </span>
                <span className="text-xs text-[#85818A] flex items-center gap-1 group-hover:text-[#D94B7A] transition-colors">
                  <span>詳しく見る</span>
                  <LucideIcon name="ChevronRight" size={13} />
                </span>
              </div>
              <h3 className="text-base sm:text-[18px] font-bold text-[#35313A] mb-2 group-hover:text-[#D94B7A] transition-colors">
                未経験から始める場合のサポート
              </h3>
              <p className="text-sm sm:text-[15px] text-[#85818A] leading-relaxed">
                経験がなくても心配いりません。経験豊富な仲居さんや女性スタッフが横について、接客の準備からお見送りまでしっかりサポートします。
              </p>
            </div>

            {/* CARD 02 */}
            <div 
              onClick={() => scrollToSection('features')}
              className="p-5 sm:p-6 rounded-2xl bg-[#FFF9FB] border border-[#F0E5EA] hover:border-[#D94B7A]/40 transition-all cursor-pointer group"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono font-black text-[#D94B7A] bg-white px-2.5 py-1 rounded-md border border-[#F0E5EA]">
                  POINT 02
                </span>
                <span className="text-xs text-[#85818A] flex items-center gap-1 group-hover:text-[#D94B7A] transition-colors">
                  <span>詳しく見る</span>
                  <LucideIcon name="ChevronRight" size={13} />
                </span>
              </div>
              <h3 className="text-base sm:text-[18px] font-bold text-[#35313A] mb-2 group-hover:text-[#D94B7A] transition-colors">
                いつでも同性に相談できる安心
              </h3>
              <p className="text-sm sm:text-[15px] text-[#85818A] leading-relaxed">
                面接から日常のシフト相談、体調管理まで、専任の女性スタッフが担当。男性には話しにくい不安も気兼ねなく相談できます。
              </p>
            </div>

            {/* CARD 03 */}
            <div 
              onClick={() => scrollToSection('first-day-flow')}
              className="p-5 sm:p-6 rounded-2xl bg-[#FFF9FB] border border-[#F0E5EA] hover:border-[#D94B7A]/40 transition-all cursor-pointer group"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono font-black text-[#D94B7A] bg-white px-2.5 py-1 rounded-md border border-[#F0E5EA]">
                  POINT 03
                </span>
                <span className="text-xs text-[#85818A] flex items-center gap-1 group-hover:text-[#D94B7A] transition-colors">
                  <span>研修フローを見る</span>
                  <LucideIcon name="ChevronRight" size={13} />
                </span>
              </div>
              <h3 className="text-base sm:text-[18px] font-bold text-[#35313A] mb-2 group-hover:text-[#D94B7A] transition-colors">
                クリーンな口頭レクチャー
              </h3>
              <p className="text-sm sm:text-[15px] text-[#85818A] leading-relaxed">
                実技や怪しい講習は一切ありません。接客の流れと安全ルールを座学で約20〜30分確認するだけなので、安心して臨めます。
              </p>
            </div>

            {/* CARD 04 */}
            <div 
              onClick={() => scrollToSection('checklist')}
              className="p-5 sm:p-6 rounded-2xl bg-[#FFF9FB] border border-[#F0E5EA] hover:border-[#D94B7A]/40 transition-all cursor-pointer group"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono font-black text-[#D94B7A] bg-white px-2.5 py-1 rounded-md border border-[#F0E5EA]">
                  POINT 04
                </span>
                <span className="text-xs text-[#85818A] flex items-center gap-1 group-hover:text-[#D94B7A] transition-colors">
                  <span>確認項目を見る</span>
                  <LucideIcon name="ChevronRight" size={13} />
                </span>
              </div>
              <h3 className="text-base sm:text-[18px] font-bold text-[#35313A] mb-2 group-hover:text-[#D94B7A] transition-colors">
                事前にすべて納得してから開始
              </h3>
              <p className="text-sm sm:text-[15px] text-[#85818A] leading-relaxed">
                お酒不要・営業連絡なし・売上50%全額日払いなど、働く条件を事前に1つずつ確認し、納得した上でスタートできます。
              </p>
            </div>

          </div>
        </section>


        {/* =========================================================
            SECTION 5: 未経験の女性が働く前に知っておきたい6つの特徴
           ========================================================= */}
        <section id="features" className="space-y-6 scroll-mt-20">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-[11px] font-bold text-[#D94B7A] bg-[#FCE8EF] border border-[#F0E5EA] px-3.5 py-1 rounded-full inline-block">
              飛田新地料亭の運営体制
            </span>
            <h2 className="text-[21px] sm:text-[24px] font-black text-[#35313A] tracking-tight">
              未経験の女性が働く前に知っておきたい6つの特徴
            </h2>
            <p className="text-xs sm:text-[14px] text-[#85818A] leading-relaxed">
              誇大表現を排し、当店が実際に守っているルールと女性キャストを守る運営体制を具体的にご紹介します。
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            
            {/* 特徴 1 */}
            <div className="bg-white p-5 sm:p-6 rounded-2xl border border-[#F0E5EA] shadow-2xs space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-extrabold text-[#D94B7A] bg-[#FFF9FB] px-2.5 py-0.5 rounded border border-[#F0E5EA]">
                  POINT 01
                </span>
                <div className="w-8 h-8 rounded-xl bg-[#FCE8EF] text-[#D94B7A] flex items-center justify-center">
                  <LucideIcon name="Coffee" size={17} />
                </div>
              </div>
              <h3 className="text-base sm:text-[17px] font-bold text-[#35313A]">
                お酒を飲む必要は一切ありません
              </h3>
              <p className="text-sm sm:text-[15px] text-[#85818A] leading-relaxed">
                一般的なキャバクラやラウンジと異なり、アルコールを飲む必要は一切ありません。お酒が全く飲めない方や苦手な方も、ソフトドリンクを飲みながら落ち着いて接客していただけます。無理な飲酒強要の心配もありません。
              </p>
            </div>

            {/* 特徴 2 */}
            <div className="bg-white p-5 sm:p-6 rounded-2xl border border-[#F0E5EA] shadow-2xs space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-extrabold text-[#D94B7A] bg-[#FFF9FB] px-2.5 py-0.5 rounded border border-[#F0E5EA]">
                  POINT 02
                </span>
                <div className="w-8 h-8 rounded-xl bg-[#FCE8EF] text-[#D94B7A] flex items-center justify-center">
                  <LucideIcon name="PhoneOff" size={17} />
                </div>
              </div>
              <h3 className="text-base sm:text-[17px] font-bold text-[#35313A]">
                お客様との個人的な連絡・営業は禁止
              </h3>
              <p className="text-sm sm:text-[15px] text-[#85818A] leading-relaxed">
                料亭組合の厳格な規約により、お客様との個人的な連絡先交換（LINE・電話番号・SNS）は全面的に禁止されています。休日に営業連絡を入れたり、店外デート（同伴・アフター）を強いられる心配は一切ありません。
              </p>
            </div>

            {/* 特徴 3 */}
            <div className="bg-white p-5 sm:p-6 rounded-2xl border border-[#F0E5EA] shadow-2xs space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-extrabold text-[#D94B7A] bg-[#FFF9FB] px-2.5 py-0.5 rounded border border-[#F0E5EA]">
                  POINT 03
                </span>
                <div className="w-8 h-8 rounded-xl bg-[#FCE8EF] text-[#D94B7A] flex items-center justify-center">
                  <LucideIcon name="CameraOff" size={17} />
                </div>
              </div>
              <h3 className="text-base sm:text-[17px] font-bold text-[#35313A]">
                WebやSNSへの顔写真掲載は一切なし
              </h3>
              <p className="text-sm sm:text-[15px] text-[#85818A] leading-relaxed">
                飛田新地は街全体で写真・動画の撮影が禁止されています。当店のWEBサイトやSNSにもキャストの顔写真・プロフィールは掲載されず、ネット上での写真指名もありません。身バレを徹底的に防ぐ環境が整っています。
              </p>
            </div>

            {/* 特徴 4 */}
            <div className="bg-white p-5 sm:p-6 rounded-2xl border border-[#F0E5EA] shadow-2xs space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-extrabold text-[#D94B7A] bg-[#FFF9FB] px-2.5 py-0.5 rounded border border-[#F0E5EA]">
                  POINT 04
                </span>
                <div className="w-8 h-8 rounded-xl bg-[#FCE8EF] text-[#D94B7A] flex items-center justify-center">
                  <LucideIcon name="HeartHandshake" size={17} />
                </div>
              </div>
              <h3 className="text-base sm:text-[17px] font-bold text-[#35313A]">
                専任女性スタッフが面接から日常まで対応
              </h3>
              <p className="text-sm sm:text-[15px] text-[#85818A] leading-relaxed">
                応募前の質問や面接、初日の案内、日々のシフトや体調の相談まで、専任の女性スタッフ（元キャスト含む）が対応します。男性スタッフには話しにくい身体のことやプライベートの悩みも、気軽に相談できます。
              </p>
            </div>

            {/* 特徴 5 */}
            <div className="bg-white p-5 sm:p-6 rounded-2xl border border-[#F0E5EA] shadow-2xs space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-extrabold text-[#D94B7A] bg-[#FFF9FB] px-2.5 py-0.5 rounded border border-[#F0E5EA]">
                  POINT 05
                </span>
                <div className="w-8 h-8 rounded-xl bg-[#FCE8EF] text-[#D94B7A] flex items-center justify-center">
                  <LucideIcon name="Sparkles" size={17} />
                </div>
              </div>
              <h3 className="text-base sm:text-[17px] font-bold text-[#35313A]">
                玄関で愛想よく手招き＆仲居さんがサポート
              </h3>
              <p className="text-sm sm:text-[15px] text-[#85818A] leading-relaxed">
                通りを通るお客様への呼び込みや声掛け、料金案内はすべてベテランの仲居さん（おばちゃん）が担当します。女性は玄関先で愛想よく手招きし、1回15〜20分の短時間接客を行います。困った時も仲居さんがすぐ駆けつけます。
              </p>
            </div>

            {/* 特徴 6 */}
            <div className="bg-white p-5 sm:p-6 rounded-2xl border border-[#F0E5EA] shadow-2xs space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-extrabold text-[#D94B7A] bg-[#FFF9FB] px-2.5 py-0.5 rounded border border-[#F0E5EA]">
                  POINT 06
                </span>
                <div className="w-8 h-8 rounded-xl bg-[#FCE8EF] text-[#D94B7A] flex items-center justify-center">
                  <LucideIcon name="Coins" size={17} />
                </div>
              </div>
              <h3 className="text-base sm:text-[17px] font-bold text-[#35313A]">
                売上50%完全バック・全額日払い手渡し
              </h3>
              <p className="text-sm sm:text-[15px] text-[#85818A] leading-relaxed">
                雑費・厚生費・待機料・衣装レンタル料などの天引きは完全0円です。15分5,000円〜の売上50%がそのまま手取りとなり、退勤時にその日の稼ぎを全額現金で手渡しいたします。急な出費がある時も安心です。
              </p>
            </div>

          </div>
        </section>


        {/* =========================================================
            SECTION 6: 初日の事前講習・研修の流れ
           ========================================================= */}
        <section id="first-day-flow" className="bg-white rounded-3xl p-6 sm:p-9 md:p-10 border border-[#F0E5EA] shadow-2xs scroll-mt-20">
          <div className="max-w-2xl mb-8">
            <span className="text-[11px] font-bold text-[#D94B7A] bg-[#FCE8EF] border border-[#F0E5EA] px-3.5 py-1 rounded-full inline-block mb-2">
              FIRST DAY TIMELINE
            </span>
            <h2 className="text-[21px] sm:text-[24px] font-black text-[#35313A] tracking-tight">
              初日はどんなことをするの？
            </h2>
            <p className="text-xs sm:text-[14px] text-[#85818A] mt-2 leading-relaxed">
              初めての方にも分かるように、最初の流れを事前にご説明します。実技研修などはなく、クリーンな座学のみです。
            </p>
          </div>

          {/* PC・タブレット：3ステップ横並び / スマホ：縦並びタイムライン */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
            
            {/* STEP 1 */}
            <div className="p-5 sm:p-6 rounded-2xl bg-[#FFF9FB] border border-[#F0E5EA] flex flex-col justify-between relative space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-black text-white bg-[#D94B7A] px-2.5 py-0.5 rounded">
                    STEP 1
                  </span>
                  <span className="text-xs text-[#85818A] font-medium">所要時間: 約30分</span>
                </div>
                <div className="w-10 h-10 rounded-xl bg-[#FCE8EF] text-[#D94B7A] flex items-center justify-center">
                  <LucideIcon name="Users" size={20} />
                </div>
                <h3 className="text-base sm:text-[18px] font-bold text-[#35313A]">
                  スタッフとの打ち合わせ
                </h3>
                <ul className="text-xs sm:text-[13px] text-[#85818A] space-y-1.5 leading-relaxed">
                  <li className="flex items-start gap-1.5">
                    <span className="text-[#D94B7A] font-bold">・</span>
                    <span>仕事内容や1日のスケジュールの説明</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="text-[#D94B7A] font-bold">・</span>
                    <span>似合う衣装（着物・ドレス等）の選択</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="text-[#D94B7A] font-bold">・</span>
                    <span>不安な点や希望シフト・働き方の相談</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="text-[#D94B7A] font-bold">・</span>
                    <span>分からないことや疑問点の事前確認</span>
                  </li>
                </ul>
              </div>
              <div className="p-3 bg-white rounded-xl border border-[#F0E5EA] text-[11px] text-[#85818A]">
                個室でリラックスしてお話しいただけます。無理にお仕事を勧めることは一切ありません。
              </div>
            </div>

            {/* STEP 2 */}
            <div className="p-5 sm:p-6 rounded-2xl bg-[#FFF9FB] border border-[#F0E5EA] flex flex-col justify-between relative space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-black text-white bg-[#D94B7A] px-2.5 py-0.5 rounded">
                    STEP 2
                  </span>
                  <span className="text-xs text-[#85818A] font-medium">所要時間: 約20分</span>
                </div>
                <div className="w-10 h-10 rounded-xl bg-[#FCE8EF] text-[#D94B7A] flex items-center justify-center">
                  <LucideIcon name="BookOpen" size={20} />
                </div>
                <h3 className="text-base sm:text-[18px] font-bold text-[#35313A]">
                  接客の流れとルールの確認
                </h3>
                <ul className="text-xs sm:text-[13px] text-[#85818A] space-y-1.5 leading-relaxed">
                  <li className="flex items-start gap-1.5">
                    <span className="text-[#D94B7A] font-bold">・</span>
                    <span>挨拶の手順とお部屋へのご案内方法</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="text-[#D94B7A] font-bold">・</span>
                    <span>接客前の準備（アルコールでの清拭・除菌等）</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="text-[#D94B7A] font-bold">・</span>
                    <span>お客様への基本的な対応マナー</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="text-[#D94B7A] font-bold">・</span>
                    <span>困ったときの仲居さんへの合図・相談方法</span>
                  </li>
                </ul>
              </div>
              <div className="p-3 bg-white rounded-xl border border-[#F0E5EA] text-[11px] text-[#85818A]">
                口頭研修（座学）のみです。実技や身体を使う研修は一切ありませんのでご安心ください。
              </div>
            </div>

            {/* STEP 3 */}
            <div className="p-5 sm:p-6 rounded-2xl bg-[#FFF9FB] border border-[#F0E5EA] flex flex-col justify-between relative space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-black text-white bg-[#D94B7A] px-2.5 py-0.5 rounded">
                    STEP 3
                  </span>
                  <span className="text-xs text-[#85818A] font-medium">初日体験</span>
                </div>
                <div className="w-10 h-10 rounded-xl bg-[#FCE8EF] text-[#D94B7A] flex items-center justify-center">
                  <LucideIcon name="Smile" size={20} />
                </div>
                <h3 className="text-base sm:text-[18px] font-bold text-[#35313A]">
                  初日のスタート（体験入店）
                </h3>
                <ul className="text-xs sm:text-[13px] text-[#85818A] space-y-1.5 leading-relaxed">
                  <li className="flex items-start gap-1.5">
                    <span className="text-[#D94B7A] font-bold">・</span>
                    <span>担当スタッフ・仲居さんによる店舗内の案内</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="text-[#D94B7A] font-bold">・</span>
                    <span>玄関での待機（仲居さんが横についてしっかりサポート）</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="text-[#D94B7A] font-bold">・</span>
                    <span>接客終了後のフォローと日払い手渡し</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="text-[#D94B7A] font-bold">・</span>
                    <span>体験後に合わないと感じた場合はその日の終了でOK</span>
                  </li>
                </ul>
              </div>
              <div className="p-3 bg-white rounded-xl border border-[#F0E5EA] text-[11px] text-[#85818A]">
                1日体験してみて合わないと感じた場合は即終了可能。その日の報酬は全額現金手渡しされます。
              </div>
            </div>

          </div>
        </section>


        {/* =========================================================
            SECTION 7: 働き始める前に確認しておきたいこと（新設）
           ========================================================= */}
        <section id="checklist" className="space-y-6 scroll-mt-20">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-[11px] font-bold text-[#D94B7A] bg-[#FCE8EF] border border-[#F0E5EA] px-3.5 py-1 rounded-full inline-block">
              BEFORE START
            </span>
            <h2 className="text-[21px] sm:text-[24px] font-black text-[#35313A] tracking-tight">
              働き始める前に確認しておきたいこと
            </h2>
            <p className="text-xs sm:text-[14px] text-[#85818A] leading-relaxed">
              不安や疑問を残さず、納得してスタートしていただくためのチェックリストです。
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            
            <div className="bg-white p-5 sm:p-6 rounded-2xl border border-[#F0E5EA] shadow-2xs space-y-2.5">
              <div className="flex items-center gap-2 text-xs font-bold text-[#D94B7A]">
                <LucideIcon name="Sparkles" size={15} />
                <span>服装・持ち物</span>
              </div>
              <h3 className="text-base sm:text-[17px] font-bold text-[#35313A]">
                手ぶら出勤OK・衣装一式無料貸出
              </h3>
              <p className="text-sm sm:text-[15px] text-[#85818A] leading-relaxed">
                トレンドのドレス、上品な着物や浴衣、ヒール靴、ヘアアイロン、コスメまで全て揃っています。私服で手ぶら出勤でき、事前の購入費用は一切かかりません。
              </p>
            </div>

            <div className="bg-white p-5 sm:p-6 rounded-2xl border border-[#F0E5EA] shadow-2xs space-y-2.5">
              <div className="flex items-center gap-2 text-xs font-bold text-[#D94B7A]">
                <LucideIcon name="Calendar" size={15} />
                <span>勤務条件・出勤日数</span>
              </div>
              <h3 className="text-base sm:text-[17px] font-bold text-[#35313A]">
                週1日〜・短時間シフトも可能
              </h3>
              <p className="text-sm sm:text-[15px] text-[#85818A] leading-relaxed">
                昼職や学業、家庭との両立もOK。週末のみ、短時間（6時間〜）、月数回の自由出勤など、ライフスタイルに合わせて柔軟にシフトを組むことができます。
              </p>
            </div>

            <div className="bg-white p-5 sm:p-6 rounded-2xl border border-[#F0E5EA] shadow-2xs space-y-2.5">
              <div className="flex items-center gap-2 text-xs font-bold text-[#D94B7A]">
                <LucideIcon name="Coins" size={15} />
                <span>給料・支払い方法</span>
              </div>
              <h3 className="text-base sm:text-[17px] font-bold text-[#35313A]">
                全額日払い現金手渡し・天引き0円
              </h3>
              <p className="text-sm sm:text-[15px] text-[#85818A] leading-relaxed">
                待機料、厚生費、衣装代などの引かれ物は一切ありません。売上の50%がその日のうちに全額現金で手渡しされます。振込口座の登録も不要です。
              </p>
            </div>

            <div className="bg-white p-5 sm:p-6 rounded-2xl border border-[#F0E5EA] shadow-2xs space-y-2.5">
              <div className="flex items-center gap-2 text-xs font-bold text-[#D94B7A]">
                <LucideIcon name="FileCheck" size={15} />
                <span>身分証明や必要書類</span>
              </div>
              <h3 className="text-base sm:text-[17px] font-bold text-[#35313A]">
                年齢確認ができる公的身分証明書のみ
              </h3>
              <p className="text-sm sm:text-[15px] text-[#85818A] leading-relaxed">
                運転免許証・マイナンバーカード・パスポートなど、顔写真と生年月日が確認できる公的証明書をお持ちいただくだけでOKです（履歴書は不要です）。
              </p>
            </div>

          </div>
        </section>


        {/* =========================================================
            SECTION 8: 未経験から始める前に読んでおきたい記事
           ========================================================= */}
        <section id="columns" className="bg-white rounded-3xl p-6 sm:p-9 md:p-10 border border-[#F0E5EA] shadow-2xs scroll-mt-20">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
            <div>
              <span className="text-[11px] font-bold text-[#D94B7A] bg-[#FCE8EF] border border-[#F0E5EA] px-3.5 py-1 rounded-full inline-block mb-2">
                COLUMNS
              </span>
              <h2 className="text-[21px] sm:text-[24px] font-black text-[#35313A] tracking-tight">
                未経験から始める前に読んでおきたい記事
              </h2>
              <p className="text-xs sm:text-[14px] text-[#85818A] mt-1 leading-relaxed">
                実際に未経験から始めた先輩キャストの体験談や初心者向け記事をピックアップ。
              </p>
            </div>

            {onNavigateBlog && (
              <button
                type="button"
                onClick={() => onNavigateBlog()}
                className="text-xs font-bold text-[#D94B7A] hover:underline flex items-center gap-1 cursor-pointer self-start sm:self-auto"
              >
                <span>コラム一覧を見る</span>
                <LucideIcon name="ChevronRight" size={14} />
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {FEATURED_BEGINNER_ARTICLES.map((article) => (
              <div
                key={article.slug}
                onClick={() => onNavigateBlog && onNavigateBlog(article.slug)}
                className="bg-[#FFF9FB] rounded-2xl border border-[#F0E5EA] overflow-hidden hover:border-[#D94B7A]/50 transition-all cursor-pointer group flex flex-col justify-between"
              >
                <div className="p-4 sm:p-5 space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold bg-[#FCE8EF] text-[#D94B7A] px-2 py-0.5 rounded">
                      beginner
                    </span>
                    <span className="text-[11px] text-[#85818A]">{article.readTime}</span>
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-[#35313A] leading-snug group-hover:text-[#D94B7A] transition-colors line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="text-xs text-[#85818A] leading-relaxed line-clamp-2">
                    {article.summary}
                  </p>
                </div>
                <div className="px-4 sm:px-5 pb-4 pt-1 flex items-center text-xs font-bold text-[#D94B7A] gap-1 group-hover:underline">
                  <span>記事を読む</span>
                  <LucideIcon name="ChevronRight" size={13} />
                </div>
              </div>
            ))}
          </div>
        </section>


        {/* =========================================================
            SECTION 9: 未経験についてよくある質問（FAQ）
           ========================================================= */}
        <section id="faq" className="space-y-6 scroll-mt-20">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-[11px] font-bold text-[#D94B7A] bg-[#FCE8EF] border border-[#F0E5EA] px-3.5 py-1 rounded-full inline-block">
              Q&A
            </span>
            <h2 className="text-[21px] sm:text-[24px] font-black text-[#35313A] tracking-tight">
              未経験についてよくある質問
            </h2>
            <p className="text-xs sm:text-[14px] text-[#85818A] leading-relaxed">
              未経験の女性から特によくいただく12の疑問に、結論から分かりやすくお答えします。
            </p>
          </div>

          <div className="bg-white rounded-3xl p-5 sm:p-8 border border-[#F0E5EA] shadow-2xs divide-y divide-[#F0E5EA]">
            {BEGINNER_FAQS.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div key={idx} className="py-4 first:pt-0 last:pb-0">
                  <button
                    type="button"
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full text-left flex items-start justify-between gap-4 py-1 text-sm sm:text-base font-bold text-[#35313A] hover:text-[#D94B7A] cursor-pointer transition-colors"
                  >
                    <span className="flex items-start gap-2.5">
                      <span className="text-[#D94B7A] font-mono font-bold shrink-0">Q.</span>
                      <span>{faq.q}</span>
                    </span>
                    <LucideIcon
                      name={isOpen ? 'ChevronUp' : 'ChevronDown'}
                      size={18}
                      className="text-[#85818A] shrink-0 mt-0.5"
                    />
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="pt-3 pb-1 pl-6 sm:pl-7 pr-2 text-xs sm:text-[14px] text-[#35313A] leading-relaxed">
                          <div className="p-3.5 rounded-xl bg-[#FFF9FB] border border-[#F0E5EA]">
                            <p className="font-medium">{faq.a}</p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          {onNavigateFaq && (
            <div className="text-center pt-2">
              <button
                type="button"
                onClick={onNavigateFaq}
                className="text-xs font-bold text-[#D94B7A] hover:underline inline-flex items-center gap-1 cursor-pointer"
              >
                <span>よくある質問（FAQ全問）を見る</span>
                <LucideIcon name="ChevronRight" size={14} />
              </button>
            </div>
          )}
        </section>


        {/* =========================================================
            SECTION 10: LINE相談エリア
           ========================================================= */}
        <section id="line-cta" className="bg-gradient-to-b from-[#FFF9FB] to-white rounded-3xl p-6 sm:p-10 border-2 border-[#F0E5EA] text-center space-y-5 scroll-mt-20">
          <div className="w-12 h-12 rounded-2xl bg-[#06C755]/15 text-[#06C755] flex items-center justify-center mx-auto">
            <LucideIcon name="MessageCircle" size={24} />
          </div>

          <div className="max-w-xl mx-auto space-y-2">
            <h2 className="text-[20px] sm:text-[23px] font-black text-[#35313A] tracking-tight">
              未経験について、どんな些細な疑問もLINEで相談できます
            </h2>
            <p className="text-xs sm:text-sm text-[#85818A] leading-relaxed pt-1">
              仕事内容や給料、待遇について、分からないことや不安なことがあればお気軽にご相談ください。<br />
              まだ応募を決めていない方も、質問だけで大丈夫です。<br />
              自分に合う働き方かどうか、まずは話を聞いてから考えてみませんか？
            </p>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href={LINE_OFFICIAL_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => {
                e.preventDefault();
                handleLineClick('【未経験ページからの相談】初日の流れや仕事内容について、応募前に少し質問してみたいです。');
              }}
              className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#06C755] hover:bg-[#05b34c] text-white font-bold text-sm shadow-md hover:shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <LucideIcon name="MessageCircle" size={18} />
              <span>LINEで質問・相談する</span>
            </a>
            <span className="text-xs font-bold text-[#D94B7A] bg-[#FCE8EF] px-3.5 py-1.5 rounded-full border border-[#F0E5EA]">
              応募前の質問だけでもOK
            </span>
          </div>
        </section>


        {/* =========================================================
            SECTION 11: 関連ページへの内部リンク
           ========================================================= */}
        <section className="pt-4 border-t border-[#F0E5EA]">
          <h3 className="text-xs font-bold text-[#85818A] mb-3 text-center">
            関連する情報ページ
          </h3>
          <div className="flex flex-wrap items-center justify-center gap-2 text-xs">
            {onNavigateTopic && (
              <>
                <button
                  type="button"
                  onClick={() => onNavigateTopic('job')}
                  className="px-3.5 py-1.5 rounded-full bg-white hover:bg-[#FCE8EF] hover:text-[#D94B7A] border border-[#F0E5EA] transition-colors cursor-pointer"
                >
                  お仕事内容
                </button>
                <button
                  type="button"
                  onClick={() => onNavigateTopic('salary')}
                  className="px-3.5 py-1.5 rounded-full bg-white hover:bg-[#FCE8EF] hover:text-[#D94B7A] border border-[#F0E5EA] transition-colors cursor-pointer"
                >
                  給料・待遇
                </button>
                <button
                  type="button"
                  onClick={() => onNavigateTopic('flow')}
                  className="px-3.5 py-1.5 rounded-full bg-white hover:bg-[#FCE8EF] hover:text-[#D94B7A] border border-[#F0E5EA] transition-colors cursor-pointer"
                >
                  初日の流れ
                </button>
                <button
                  type="button"
                  onClick={() => onNavigateTopic('safety')}
                  className="px-3.5 py-1.5 rounded-full bg-white hover:bg-[#FCE8EF] hover:text-[#D94B7A] border border-[#F0E5EA] transition-colors cursor-pointer"
                >
                  安全・身バレ対策
                </button>
              </>
            )}
            {onNavigateFaq && (
              <button
                type="button"
                onClick={onNavigateFaq}
                className="px-3.5 py-1.5 rounded-full bg-white hover:bg-[#FCE8EF] hover:text-[#D94B7A] border border-[#F0E5EA] transition-colors cursor-pointer"
              >
                よくある質問
              </button>
            )}
          </div>
        </section>

      </div>
    </div>
  );
}

// 優先12問のFAQデータ（結論から明確に回答）
const BEGINNER_FAQS = [
  {
    q: '容姿や体型に自信がないのですが採用されますか？',
    a: 'はい、採用されます。飛田新地では派手なモデル体型よりも、愛嬌のある笑顔や親しみやすさ、優しい話し方など内面の魅力が非常に高く評価されます。容姿に自信がないとおっしゃる未経験の方も多数活躍していますので安心してお越しください。'
  },
  {
    q: '面接当日にそのまま体験することはできますか？',
    a: 'はい、身分証をお持ちいただければ当日の体験入店も大歓迎です。もちろん面接とお話だけで、一度持ち帰ってじっくり検討してから後日体験していただいても全く構いません。'
  },
  {
    q: '夜職の経験がなくても大丈夫ですか？',
    a: '全く問題ありません。在籍キャストの約90％が夜職未経験からスタートしています。お酒不要、営業連絡なし、仲居さんのフルサポートがあるため、夜職初心者に最も働きやすい環境が整っています。'
  },
  {
    q: '初日はどんなことをしますか？',
    a: '最初にお仕事内容や服装の説明を約30分行い、その後接客の流れや安全ルールを座学で約20分確認します。無理な実技講習は一切なく、準備が整ってから体験スタートとなります。'
  },
  {
    q: 'どんな服装を準備すればいいですか？',
    a: '事前準備は不要です。普段の私服でお越しいただければ、店舗にドレス・着物・靴・ヘアメイク道具が一式揃っており、すべて無料で貸し出しています。手ぶらで出勤可能です。'
  },
  {
    q: '女性スタッフに相談できますか？',
    a: 'はい、いつでもご相談いただけます。当店には女性専任スタッフが常駐しており、面接から初日のご案内、日々のシフトや体調の相談まで、女性同士で気軽にお話しいただけます。'
  },
  {
    q: 'お酒を飲む必要はありますか？',
    a: '一切ありません。当店ではアルコールを飲む必要はなく、ソフトドリンクでリラックスして接客できます。お酒が全く飲めない体質の方も安心して勤務していただけます。'
  },
  {
    q: 'お客様との連絡や営業は必要ですか？',
    a: '一切必要ありません。料亭組合の規約により、お客様との連絡先交換（LINE・電話）は厳禁となっています。休日に営業連絡を送るなどの負担はゼロです。'
  },
  {
    q: '家族や知人に知られないか心配です。',
    a: '身バレ対策を徹底しています。街全体で撮影が禁止されており、WebサイトやSNSに写真が載ることはありません。また、会社員の方には住民税の普通徴収手続きをご案内しています。'
  },
  {
    q: '給料や待遇だけ先に質問できますか？',
    a: 'もちろん可能です。LINE公式アカウントから「給料システムについて聞きたい」「週1日だといくら稼げますか？」など、気になる条件だけを質問していただけます。'
  },
  {
    q: '応募前に詳しい話を聞くことはできますか？',
    a: 'はい、大歓迎です。面接や応募を決める前に、LINEでのチャット相談や、店舗の見学・事前説明のみのご希望にも丁寧に対応しています。'
  },
  {
    q: '自分に合わないと感じた場合はどうなりますか？',
    a: '即座に辞めていただいて全く問題ありません。体験入店後に「自分には合わない」と感じた場合も無理な引き止めは一切なく、その日の報酬は全額日払いで受け取れます。'
  }
];

// コラム記事データ
const FEATURED_BEGINNER_ARTICLES = [
  {
    title: '【未経験者必読】飛田新地のお仕事とは？業界一わかりやすい初心者ガイド',
    slug: 'tobitashinchi-beginner-guide',
    readTime: '3分で読める',
    summary: '9割以上が未経験から始める飛田新地の安心できる理由と、お仕事の全体像を丁寧に解説。'
  },
  {
    title: '【独占取材】飛田新地で働いた女性インタビュー！年齢・前職・未経験からの対話記録',
    slug: 'tobitashinchi-interview-records',
    readTime: '5分で読める',
    summary: 'アパレル店員、現役大学生、一般事務OLなど、実在キャスト3名が語る初日の本音とリアルな給与。'
  },
  {
    title: '【公式インタビュー】飛田新地料亭の求人担当者に本音直撃！初日の不安と採用基準',
    slug: 'tobitashinchi-recruiter-qa',
    readTime: '4分で読める',
    summary: '採用担当者と女性相談スタッフが答える、未経験の割合、面接での質問、初日のサポート体制。'
  }
];
