/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import LucideIcon from './LucideIcon';
import { LINE_OFFICIAL_URL } from '../data';
import { updatePageJsonLd } from '../utils/jsonLd';

interface ExperiencedPageProps {
  onNavigateHome: () => void;
  onNavigateTopic?: (topicId: string) => void;
  onNavigateBlog?: (slug?: string) => void;
  onNavigateFaq?: () => void;
  onCtaclick: () => void;
  onInjectedScroll?: (msg: string) => void;
}

const HERO_IMAGE = '/images/experienced_hero_woman_1794551773329.jpg';
const HERO_IMAGE_FALLBACK = '/assets/images/experienced_hero_woman_1794551773329.jpg';
const WAITING_ROOM_IMAGE = '/images/experienced_waiting_environment_1794551772587.jpg';
const WAITING_ROOM_FALLBACK = '/assets/images/experienced_waiting_environment_1794551772587.jpg';

export default function ExperiencedPage({
  onNavigateHome,
  onNavigateTopic,
  onNavigateBlog,
  onNavigateFaq,
  onInjectedScroll,
}: ExperiencedPageProps) {
  const [openFaqKey, setOpenFaqKey] = useState<string | null>('other-0');
  const [heroImgFailed, setHeroImgFailed] = useState(false);
  const [waitingImgFailed, setWaitingImgFailed] = useState(false);

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
      const yOffset = -76;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const allFaqs = FAQ_GROUPS.flatMap((group) => group.items);
    const schemaData = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'BreadcrumbList',
          '@id': 'https://tobitashinchi-recruit.com/experienced#breadcrumb',
          'itemListElement': [
            {
              '@type': 'ListItem',
              'position': 1,
              'name': '飛田新地求人トップ',
              'item': 'https://tobitashinchi-recruit.com/',
            },
            {
              '@type': 'ListItem',
              'position': 2,
              'name': '経験者・移籍求人',
              'item': 'https://tobitashinchi-recruit.com/experienced',
            },
          ],
        },
        {
          '@type': 'WebPage',
          '@id': 'https://tobitashinchi-recruit.com/experienced#webpage',
          'url': 'https://tobitashinchi-recruit.com/experienced',
          'name': '飛田新地の経験者求人｜他業種・他店からの移籍、仕事内容・待遇を紹介',
          'description':
            'メンズエステ・ソープ・ヘルス・キャバクラなど、他業種から飛田新地への移籍を検討している女性や、飛田新地の他店から移籍を考えている女性へ。仕事内容や接客ルール、人間関係、報酬・待遇、立地など、移籍前に知っておきたい情報を紹介します。LINEでの事前相談も受付中です。',
          'primaryImageOfPage': {
            '@type': 'ImageObject',
            'url': `https://tobitashinchi-recruit.com${HERO_IMAGE}`,
          },
        },
        {
          '@type': 'FAQPage',
          '@id': 'https://tobitashinchi-recruit.com/experienced#faq',
          'mainEntity': allFaqs.map((item) => ({
            '@type': 'Question',
            'name': item.q,
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': item.a,
            },
          })),
        },
      ],
    };

    updatePageJsonLd(schemaData);
  }, []);

  return (
    <div className="bg-[#FFF9FB] min-h-screen text-[#333333] pb-28 pt-4 sm:pt-6 font-sans antialiased selection:bg-[#FFF0F5] selection:text-[#C23B6B]">
      {/* パンくずリスト */}
      <div className="max-w-[1140px] mx-auto px-4 sm:px-6 mb-4">
        <nav aria-label="Breadcrumb" className="flex items-center text-xs sm:text-[13px]">
          <ol className="flex items-center gap-1.5 flex-wrap text-[#999999]">
            <li className="flex items-center gap-1">
              <a
                href="/"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigateHome();
                }}
                className="hover:text-[#C23B6B] font-semibold flex items-center gap-1 text-[#333333] hover:underline cursor-pointer"
              >
                <LucideIcon name="Home" size={13} className="text-[#C23B6B]" />
                <span>飛田新地求人（トップ）</span>
              </a>
            </li>
            <li aria-hidden="true" className="text-[#999999]">/</li>
            <li className="font-bold text-[#C23B6B]" aria-current="page">
              経験者・移籍求人
            </li>
          </ol>
        </nav>
      </div>

      {/* ページ内目次アンカー */}
      <div className="max-w-[1140px] mx-auto px-4 sm:px-6 mb-8">
        <div className="flex items-center gap-2 overflow-x-auto py-1 scrollbar-none text-[13px] text-[#666666]">
          <span className="font-bold text-[#333333] whitespace-nowrap flex items-center gap-1 shrink-0 pr-1">
            <LucideIcon name="Compass" size={14} className="text-[#C23B6B]" />
            <span>目次</span>
          </span>
          {TOC_ITEMS.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection(item.id);
              }}
              className="px-3 py-1.5 rounded-xl bg-white hover:bg-[#FFF0F5] hover:text-[#C23B6B] border border-[#F0DCE4] whitespace-nowrap shrink-0 transition-colors cursor-pointer"
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>

      <div className="max-w-[1140px] mx-auto px-4 sm:px-6 space-y-16 sm:space-y-20">
        {/* =========================================================
            2. ファーストビュー
           ========================================================= */}
        <section className="bg-white rounded-2xl p-6 sm:p-9 lg:p-11 border border-[#F0DCE4] shadow-[0_2px_12px_rgba(233,139,170,0.06)]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            {/* 左カラム（スマホでは最上部：見出し・説明・メリット・CTA） */}
            <div className="lg:col-span-7 space-y-5">
              <div className="text-[13px] font-bold text-[#C23B6B] tracking-wide">
                飛田新地・経験者専用求人
              </div>

              <div className="space-y-2.5">
                <h1 className="font-display font-bold text-[26px] sm:text-[32px] text-[#333333] leading-[1.3] tracking-tight text-balance">
                  <span className="block text-[13px] sm:text-[14px] font-semibold text-[#666666] mb-2">
                    飛田新地の経験者求人｜他業種・他店からの移籍を検討している方へ
                  </span>
                  今までの経験を活かして、
                  <span className="text-[#C23B6B] block sm:inline">
                    もっと自分に合った働き方へ。
                  </span>
                </h1>

                <p className="text-[15px] sm:text-[17px] font-bold text-[#333333] pt-1">
                  他業種からの移籍も、飛田新地の他店からの移籍も。
                </p>
              </div>

              <div className="space-y-3 text-[14px] sm:text-[15.5px] text-[#666666] leading-[1.75]">
                <p>
                  メンズエステ・ソープ・ヘルス・キャバクラなど、これまでの接客経験を活かして新しい働き方を考えてみませんか？
                  また、現在飛田新地で働いている方も、人間関係・待遇・立地など、今のお店に感じている不満を見直すきっかけにしてみてください。
                </p>
                <p>
                  当店では、
                  <span className="text-[#C23B6B] font-semibold">
                    短時間中心の接客スタイルに加え、キスや粘膜接触のない接客ルール
                  </span>
                  を採用しています。仕事内容だけでなく、働く環境や待遇も含めて、納得できる移籍先を探している方をお待ちしています。
                </p>
              </div>

              {/* 3つのメリット表示 */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                <div className="flex items-center gap-2.5 p-3.5 rounded-xl bg-[#FFF9FB] border border-[#F0DCE4]">
                  <LucideIcon name="Clock" size={18} className="text-[#C23B6B] shrink-0" strokeWidth={1.75} />
                  <span className="text-[13.5px] font-bold text-[#333333]">短時間中心の接客</span>
                </div>
                <div className="flex items-center gap-2.5 p-3.5 rounded-xl bg-[#FFF9FB] border border-[#F0DCE4]">
                  <LucideIcon name="ShieldCheck" size={18} className="text-[#C23B6B] shrink-0" strokeWidth={1.75} />
                  <span className="text-[13.5px] font-bold text-[#333333]">キス・粘膜接触なし</span>
                </div>
                <div className="flex items-center gap-2.5 p-3.5 rounded-xl bg-[#FFF9FB] border border-[#F0DCE4]">
                  <LucideIcon name="HeartHandshake" size={18} className="text-[#C23B6B] shrink-0" strokeWidth={1.75} />
                  <span className="text-[13.5px] font-bold text-[#333333]">人間関係・待遇・立地も重視</span>
                </div>
              </div>

              {/* LINE CTA */}
              <div className="pt-2 space-y-2.5">
                <a
                  href={LINE_OFFICIAL_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => {
                    e.preventDefault();
                    handleLineClick('【経験者・移籍の相談】仕事内容や接客ルール、待遇・職場の雰囲気について相談したいです。');
                  }}
                  className="w-full sm:w-auto px-7 py-4 rounded-xl bg-[#06C755] hover:bg-[#05b34c] text-white font-bold text-[15px] shadow-xs transition-colors cursor-pointer inline-flex items-center justify-center gap-2.5 whitespace-nowrap"
                >
                  <LucideIcon name="MessageCircle" size={19} strokeWidth={2} />
                  <span>LINEで移籍について相談する</span>
                </a>
                <p className="text-[13px] text-[#666666] leading-relaxed">
                  他業種からの移籍・飛田新地の他店からの移籍、どちらも相談OK。質問だけでも大丈夫です。
                </p>
              </div>
            </div>

            {/* 右カラム（スマホでは文章・CTAの下） */}
            <div className="lg:col-span-5">
              <div className="rounded-2xl overflow-hidden border border-[#F0DCE4] bg-[#FFF0F5]">
                {!heroImgFailed ? (
                  <div className="aspect-4/3 w-full overflow-hidden">
                    <img
                      src={HERO_IMAGE}
                      alt="和モダンの落ち着いた室内で微笑む大人の女性"
                      referrerPolicy="no-referrer"
                      loading="eager"
                      onError={(e) => {
                        const target = e.currentTarget;
                        if (!target.dataset.triedFallback) {
                          target.dataset.triedFallback = '1';
                          target.src = HERO_IMAGE_FALLBACK;
                        } else {
                          setHeroImgFailed(true);
                        }
                      }}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="aspect-4/3 w-full bg-gradient-to-br from-[#FFF0F5] to-[#FCE8EF] flex flex-col items-center justify-center p-6 text-center text-[#C23B6B]">
                    <LucideIcon name="Sparkles" size={32} strokeWidth={1.5} className="mb-2" />
                    <p className="text-sm font-bold text-[#333333]">落ち着いた和モダンの環境</p>
                  </div>
                )}
              </div>
              <p className="text-[13px] text-[#666666] mt-2.5 text-center lg:text-left">
                経験や希望に合わせて、働き方をご相談いただけます。
              </p>
            </div>
          </div>
        </section>

        {/* =========================================================
            3. 安心材料・基本情報（4カード）
           ========================================================= */}
        <section aria-label="基本方針・安心材料" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {BASIC_INFO_CARDS.map((card, idx) => (
            <div
              key={idx}
              className="bg-white p-5 sm:p-6 rounded-2xl border border-[#F0DCE4] shadow-[0_2px_8px_rgba(233,139,170,0.05)] space-y-2"
            >
              <div className="flex items-center gap-2 text-[13px] font-semibold text-[#C23B6B]">
                <LucideIcon name={card.icon} size={17} strokeWidth={1.75} />
                <span>{card.label}</span>
              </div>
              <h2 className="text-[16px] sm:text-[17px] font-bold text-[#333333] leading-snug">
                {card.title}
              </h2>
              <p className="text-[14px] text-[#666666] leading-relaxed">
                {card.desc}
              </p>
            </div>
          ))}
        </section>

        {/* =========================================================
            4. 2種類の移籍希望者への案内
           ========================================================= */}
        <section id="transfer-guide" className="scroll-mt-20 space-y-8">
          <div className="max-w-2xl space-y-2.5">
            <h2 className="text-[22px] sm:text-[26px] font-bold text-[#333333] tracking-tight text-balance">
              あなたの経験に合わせた移籍のご案内
            </h2>
            <p className="text-[14px] sm:text-[15px] text-[#666666] leading-relaxed">
              <span className="font-semibold text-[#333333]">あなたの経験に合わせて、移籍のポイントをご紹介。</span>
              移籍を考える理由は人それぞれです。今の仕事やお店で感じている悩みに合わせて、知りたい情報を確認してください。
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* カードA：他業種からの移籍 */}
            <div className="bg-white rounded-2xl p-6 sm:p-7 border border-[#F0DCE4] shadow-[0_2px_10px_rgba(233,139,170,0.05)] flex flex-col justify-between space-y-5">
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[13px] font-bold text-[#C23B6B]">
                    他業種経験者向け
                  </span>
                  <div className="w-10 h-10 rounded-xl bg-[#FFF0F5] text-[#C23B6B] flex items-center justify-center shrink-0">
                    <LucideIcon name="Briefcase" size={20} strokeWidth={1.75} />
                  </div>
                </div>

                <div>
                  <h3 className="text-[18px] sm:text-[20px] font-bold text-[#333333] leading-snug mb-1.5">
                    他業種から飛田新地への移籍を検討している方へ
                  </h3>
                  <p className="text-[13px] font-medium text-[#999999]">
                    対象：メンズエステ・ソープ・ヘルス・キャバクラ経験者
                  </p>
                </div>

                <p className="text-[14px] sm:text-[15px] text-[#666666] leading-relaxed">
                  今までの接客経験を活かしながら、接客時間や仕事内容、接客ルールが異なる新しい働き方を検討してみませんか？
                </p>

                <ul className="space-y-2 text-[14px] text-[#333333] pt-1">
                  <li className="flex items-center gap-2">
                    <LucideIcon name="Check" size={16} className="text-[#C23B6B] shrink-0" strokeWidth={2} />
                    <span>接客スタイルの違い</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <LucideIcon name="Check" size={16} className="text-[#C23B6B] shrink-0" strokeWidth={2} />
                    <span>短時間中心の接客</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <LucideIcon name="Check" size={16} className="text-[#C23B6B] shrink-0" strokeWidth={2} />
                    <span>キス・粘膜接触なし</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <LucideIcon name="Check" size={16} className="text-[#C23B6B] shrink-0" strokeWidth={2} />
                    <span>これまでの接客経験を活かせる</span>
                  </li>
                </ul>
              </div>

              <button
                type="button"
                onClick={() => scrollToSection('comparison')}
                className="w-full py-3 px-4 rounded-xl bg-[#FFF0F5] hover:bg-[#F5B5C9]/30 text-[#C23B6B] font-bold text-[14px] border border-[#F5B5C9] transition-colors cursor-pointer flex items-center justify-center gap-1.5 whitespace-nowrap"
              >
                <span>他業種からの移籍について詳しく見る</span>
                <LucideIcon name="ArrowDown" size={15} strokeWidth={2} />
              </button>
            </div>

            {/* カードB：飛田新地の他店からの移籍 */}
            <div className="bg-[#FFF0F5] rounded-2xl p-6 sm:p-7 border border-[#E98BAA]/60 shadow-[0_2px_10px_rgba(233,139,170,0.08)] flex flex-col justify-between space-y-5">
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[13px] font-bold text-[#C23B6B]">
                    飛田新地・他店経験者向け
                  </span>
                  <div className="w-10 h-10 rounded-xl bg-white text-[#C23B6B] flex items-center justify-center border border-[#F5B5C9] shrink-0">
                    <LucideIcon name="Building2" size={20} strokeWidth={1.75} />
                  </div>
                </div>

                <div>
                  <h3 className="text-[18px] sm:text-[20px] font-bold text-[#333333] leading-snug mb-1.5">
                    飛田新地の他店から移籍を検討している方へ
                  </h3>
                  <p className="text-[13px] font-medium text-[#666666]">
                    対象：現在飛田新地の他店で勤務中の方・再スタートを考えている方
                  </p>
                </div>

                <p className="text-[14px] sm:text-[15px] text-[#666666] leading-relaxed">
                  現在のお店の人間関係や待遇、立地に不満はありませんか？
                  当店では、女性同士のいじめや派閥を作らない職場環境づくりを大切にしています。
                </p>

                <ul className="space-y-2 text-[14px] text-[#333333] pt-1">
                  <li className="flex items-center gap-2">
                    <LucideIcon name="Check" size={16} className="text-[#C23B6B] shrink-0" strokeWidth={2} />
                    <span>いじめ・派閥を作らない環境づくり</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <LucideIcon name="Check" size={16} className="text-[#C23B6B] shrink-0" strokeWidth={2} />
                    <span>報酬・待遇の比較</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <LucideIcon name="Check" size={16} className="text-[#C23B6B] shrink-0" strokeWidth={2} />
                    <span>通いやすい立地</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <LucideIcon name="Check" size={16} className="text-[#C23B6B] shrink-0" strokeWidth={2} />
                    <span>待機環境・職場の雰囲気</span>
                  </li>
                </ul>
              </div>

              <button
                type="button"
                onClick={() => scrollToSection('merit-other-shop')}
                className="w-full py-3 px-4 rounded-xl bg-white hover:bg-[#FFF9FB] text-[#C23B6B] font-bold text-[14px] border border-[#E98BAA] transition-colors cursor-pointer flex items-center justify-center gap-1.5 whitespace-nowrap"
              >
                <span>他店からの移籍について詳しく見る</span>
                <LucideIcon name="ArrowDown" size={15} strokeWidth={2} />
              </button>
            </div>
          </div>
        </section>

        {/* =========================================================
            5. 今の仕事で感じている4つの負担
           ========================================================= */}
        <section id="burdens" className="bg-white rounded-2xl p-6 sm:p-9 border border-[#F0DCE4] scroll-mt-20 space-y-6">
          <div className="max-w-2xl space-y-2">
            <h2 className="text-[21px] sm:text-[25px] font-bold text-[#333333] tracking-tight">
              今の仕事で感じている負担
            </h2>
            <p className="text-[15px] sm:text-[16px] font-bold text-[#C23B6B]">
              今の仕事で、こんな負担を感じていませんか？
            </p>
            <p className="text-[14px] sm:text-[15px] text-[#666666] leading-relaxed">
              接客業は同じように見えても、仕事内容や負担のかかり方は業種によって異なります。
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {CURRENT_BURDENS.map((item, idx) => (
              <div
                key={idx}
                className="p-5 sm:p-6 rounded-2xl bg-[#FFF9FB] border border-[#F0DCE4] space-y-2.5"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-[#FFF0F5] text-[#C23B6B] flex items-center justify-center shrink-0">
                    <LucideIcon name={item.icon} size={18} strokeWidth={1.75} />
                  </div>
                  <h3 className="text-[16px] sm:text-[17px] font-bold text-[#333333]">
                    {item.title}
                  </h3>
                </div>
                <p className="text-[14px] sm:text-[15px] text-[#666666] leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

          <p className="text-[13px] text-[#999999] leading-relaxed">
            ※仕事内容や業務の負担は業種や個々の店舗方針・契約条件によって異なるため、現在のお仕事状況と照らし合わせてご覧ください。
          </p>
        </section>

        {/* =========================================================
            6. 5業種の比較表
           ========================================================= */}
        <section id="comparison" className="bg-white rounded-2xl p-6 sm:p-9 border border-[#F0DCE4] scroll-mt-20 space-y-6">
          <div className="max-w-2xl space-y-2">
            <h2 className="text-[21px] sm:text-[25px] font-bold text-[#333333] tracking-tight">
              他業種との仕事内容・接客スタイル比較
            </h2>
            <p className="text-[15px] sm:text-[16px] font-bold text-[#C23B6B]">
              他業種との違いを比較してみました
            </p>
            <p className="text-[14px] sm:text-[15px] text-[#666666] leading-relaxed">
              同じ接客業でも、接客時間・サービス内容・営業負担は大きく異なります。自分に合った働き方を考える参考にしてください。
            </p>
          </div>

          {/* スマホ横スクロール案内 */}
          <div className="flex items-center justify-between gap-2 text-[13px] font-semibold text-[#C23B6B] bg-[#FFF0F5] px-4 py-2.5 rounded-xl border border-[#F5B5C9]/60 lg:hidden">
            <span className="flex items-center gap-1.5">
              <LucideIcon name="ArrowLeftRight" size={16} strokeWidth={1.75} />
              <span>左右にスクロールして5業種すべてを比較できます</span>
            </span>
          </div>

          {/* 5業種比較テーブル（PC・スマホ共通、比較項目列を固定） */}
          <div className="overflow-x-auto rounded-xl border border-[#F0DCE4]">
            <table className="w-full min-w-[760px] text-left border-collapse text-[14px] sm:text-[15px]">
              <thead>
                <tr className="border-b border-[#F0DCE4] bg-[#FFF9FB]">
                  <th className="sticky left-0 z-10 bg-[#FFF9FB] p-4 font-bold text-[#333333] border-r border-[#F0DCE4] w-[130px]">
                    比較項目
                  </th>
                  <th className="p-4 font-bold text-white bg-[#E98BAA] border-r border-[#F0DCE4] w-[150px]">
                    飛田新地
                  </th>
                  <th className="p-4 font-bold text-[#333333] border-r border-[#F0DCE4]">
                    メンズエステ
                  </th>
                  <th className="p-4 font-bold text-[#333333] border-r border-[#F0DCE4]">
                    ソープ
                  </th>
                  <th className="p-4 font-bold text-[#333333] border-r border-[#F0DCE4]">
                    ヘルス
                  </th>
                  <th className="p-4 font-bold text-[#333333]">
                    キャバクラ
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F0DCE4] bg-white">
                {FIVE_INDUSTRY_COMPARISON.map((row, idx) => (
                  <tr key={idx}>
                    <th
                      scope="row"
                      className="sticky left-0 z-10 bg-white p-4 font-bold text-[#333333] border-r border-[#F0DCE4] align-top whitespace-nowrap"
                    >
                      {row.item}
                    </th>
                    <td className="p-4 font-bold text-[#333333] bg-[#FFF0F5] border-r border-[#F0DCE4] align-top">
                      <span className={row.highlightPink ? 'text-[#C23B6B]' : ''}>
                        {row.tobita}
                      </span>
                    </td>
                    <td className="p-4 text-[#666666] border-r border-[#F0DCE4] align-top">
                      {row.esthe}
                    </td>
                    <td className="p-4 text-[#666666] border-r border-[#F0DCE4] align-top">
                      {row.soap}
                    </td>
                    <td className="p-4 text-[#666666] border-r border-[#F0DCE4] align-top">
                      {row.health}
                    </td>
                    <td className="p-4 text-[#666666] align-top">
                      {row.cabaret}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* 比較表下の結論 */}
          <div className="p-5 sm:p-6 rounded-2xl bg-[#FFF0F5] border border-[#F5B5C9]/70 space-y-2">
            <h3 className="text-[17px] sm:text-[18px] font-bold text-[#333333]">
              働き方が変われば、接客で感じる負担も変わります。
            </h3>
            <p className="text-[14px] sm:text-[15px] text-[#666666] leading-relaxed">
              短時間中心の接客、キスや粘膜接触のない接客スタイルなど、今までとは違った働き方を検討してみませんか？
            </p>
          </div>
        </section>

        {/* =========================================================
            7. 他業種から移籍するメリット（4カード）
           ========================================================= */}
        <section id="merit-other-industry" className="scroll-mt-20 space-y-6">
          <div className="max-w-2xl space-y-2">
            <h2 className="text-[21px] sm:text-[25px] font-bold text-[#333333] tracking-tight">
              他業種から移籍するメリット
            </h2>
            <p className="text-[15px] sm:text-[16px] font-bold text-[#C23B6B]">
              これまでの接客経験を、新しい働き方に活かす
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {OTHER_INDUSTRY_MERITS.map((item, idx) => (
              <div
                key={idx}
                className="bg-white p-5 sm:p-6 rounded-2xl border border-[#F0DCE4] shadow-[0_2px_8px_rgba(233,139,170,0.05)] space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[13px] font-bold text-[#C23B6B] tabular-nums">
                    0{idx + 1}
                  </span>
                  <div className="w-9 h-9 rounded-xl bg-[#FFF0F5] text-[#C23B6B] flex items-center justify-center">
                    <LucideIcon name={item.icon} size={18} strokeWidth={1.75} />
                  </div>
                </div>
                <h3 className="text-[16px] font-bold text-[#333333]">
                  {item.title}
                </h3>
                <p className="text-[14px] text-[#666666] leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* =========================================================
            8. 飛田新地の他店から移籍するメリット（2列×2段）
           ========================================================= */}
        <section id="merit-other-shop" className="bg-white rounded-2xl p-6 sm:p-9 border border-[#F0DCE4] scroll-mt-20 space-y-7">
          <div className="max-w-2xl space-y-2">
            <h2 className="text-[21px] sm:text-[25px] font-bold text-[#333333] tracking-tight">
              飛田新地の他店から移籍するメリット
            </h2>
            <p className="text-[15px] sm:text-[16px] font-bold text-[#C23B6B]">
              お店を変えることで、働く環境も見直してみませんか？
            </p>
            <p className="text-[14px] sm:text-[15px] text-[#666666] leading-relaxed">
              仕事内容だけでなく、人間関係・待遇・立地・待機環境も、お店選びでは大切なポイントです。
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* カード① いじめ・派閥のない職場環境 */}
            <div className="p-5 sm:p-6 rounded-2xl bg-[#FFF9FB] border border-[#F0DCE4] space-y-3">
              <div className="flex items-center gap-2.5 text-[13px] font-bold text-[#C23B6B]">
                <LucideIcon name="Users" size={17} strokeWidth={1.75} />
                <span>いじめ・派閥のない職場環境</span>
              </div>
              <h3 className="text-[17px] sm:text-[18px] font-bold text-[#333333] leading-snug">
                人間関係に悩まず、落ち着いて働ける環境へ
              </h3>
              <p className="text-[14px] sm:text-[15px] text-[#666666] leading-relaxed">
                女性同士のいじめや派閥を作らないことを大切にしています。誰かの顔色をうかがったり、仕事以外の人間関係に過度に気を遣ったりせず、落ち着いて働ける職場環境を目指しています。
              </p>
            </div>

            {/* カード② 待遇・報酬 */}
            <div className="p-5 sm:p-6 rounded-2xl bg-[#FFF9FB] border border-[#F0DCE4] space-y-3">
              <div className="flex items-center gap-2.5 text-[13px] font-bold text-[#C23B6B]">
                <LucideIcon name="Coins" size={17} strokeWidth={1.75} />
                <span>待遇・報酬</span>
              </div>
              <h3 className="text-[17px] sm:text-[18px] font-bold text-[#333333] leading-snug">
                報酬や条件にも納得して働きたい
              </h3>
              <p className="text-[14px] sm:text-[15px] text-[#666666] leading-relaxed">
                報酬の仕組み（売上50%バック・退勤時全額日払い）、控除（待機料・厚生費・衣装代0円）、支払い条件、出勤条件など、働くうえで大切な情報を事前に確認できます。今のお店の条件と比較しながらご検討ください。
              </p>
            </div>

            {/* カード③ 立地の良さ（集客のしやすさ） */}
            <div className="p-5 sm:p-6 rounded-2xl bg-[#FFF9FB] border border-[#F0DCE4] space-y-3">
              <div className="flex items-center gap-2.5 text-[13px] font-bold text-[#C23B6B]">
                <LucideIcon name="MapPin" size={17} strokeWidth={1.75} />
                <span>立地の良さ</span>
              </div>
              <h3 className="text-[17px] sm:text-[18px] font-bold text-[#333333] leading-snug">
                立地の良さで、お客さんが上がりやすくなる
              </h3>
              <p className="text-[14px] sm:text-[15px] text-[#666666] leading-relaxed">
                飛田新地では、店舗がある通りによって人通りやお客様の入りやすさが変わります。当店はメイン・青春通りエリアにあり、人通りが多いためお客様が上がりやすい環境で働けます。
              </p>
            </div>

            {/* カード④ 待機環境・職場の雰囲気 */}
            <div className="p-5 sm:p-6 rounded-2xl bg-[#FFF9FB] border border-[#F0DCE4] space-y-4">
              <div className="space-y-3">
                <div className="flex items-center gap-2.5 text-[13px] font-bold text-[#C23B6B]">
                  <LucideIcon name="Coffee" size={17} strokeWidth={1.75} />
                  <span>待機環境・職場の雰囲気</span>
                </div>
                <h3 className="text-[17px] sm:text-[18px] font-bold text-[#333333] leading-snug">
                  仕事以外の時間も、快適に過ごせる環境へ
                </h3>
                <p className="text-[14px] sm:text-[15px] text-[#666666] leading-relaxed">
                  待機場所や設備、店舗の雰囲気など、接客以外の時間の過ごしやすさも大切にしています。冷暖房・Wi-Fi完備の清潔な和室・パウダースペースを整えており、実際の環境は見学時にもご確認いただけます。
                </p>
              </div>
              <div className="rounded-xl overflow-hidden border border-[#F0DCE4] bg-white">
                {!waitingImgFailed ? (
                  <div className="aspect-4/3 w-full overflow-hidden">
                    <img
                      src={WAITING_ROOM_IMAGE}
                      alt="清潔感のある和モダンな待機・パウダールームのイメージ"
                      referrerPolicy="no-referrer"
                      loading="lazy"
                      onError={(e) => {
                        const target = e.currentTarget;
                        if (!target.dataset.triedFallback) {
                          target.dataset.triedFallback = '1';
                          target.src = WAITING_ROOM_FALLBACK;
                        } else {
                          setWaitingImgFailed(true);
                        }
                      }}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="aspect-4/3 w-full bg-[#FFF0F5] flex items-center justify-center text-[#C23B6B] text-sm font-bold">
                    待機環境・パウダースペース
                  </div>
                )}
                <p className="px-3.5 py-2 text-[12px] text-[#666666] bg-white border-t border-[#F0DCE4]">
                  ※待機空間・設備の雰囲気をお伝えするイメージ写真です。実際の設備は店舗見学でご確認いただけます。
                </p>
              </div>
            </div>
          </div>

          <div className="p-5 sm:p-6 rounded-2xl bg-[#FFF0F5] border border-[#F5B5C9]/70 space-y-1.5">
            <p className="text-[16px] sm:text-[17px] font-bold text-[#333333]">
              仕事内容だけで、お店を選ぶ必要はありません。
            </p>
            <p className="text-[14px] sm:text-[15px] text-[#666666] leading-relaxed">
              人間関係・待遇・立地・働く環境。今のお店に感じている不満を見直し、自分に合った環境を探してみませんか？
            </p>
          </div>
        </section>

        {/* =========================================================
            9. 当店の待遇・条件
           ========================================================= */}
        <section id="conditions" className="scroll-mt-20 space-y-6">
          <div className="max-w-2xl space-y-2">
            <h2 className="text-[21px] sm:text-[25px] font-bold text-[#333333] tracking-tight">
              当店の待遇・条件
            </h2>
            <p className="text-[15px] sm:text-[16px] font-bold text-[#C23B6B]">
              働くうえで大切な条件も、しっかり確認できます。
            </p>
            <p className="text-[14px] sm:text-[15px] text-[#666666] leading-relaxed">
              他業種経験者・他店経験者のどちらにも判断しやすいよう、当店の実際の募集条件を一覧にまとめました。
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {STORE_CONDITIONS.map((cond, idx) => (
              <div
                key={idx}
                className="bg-white p-5 sm:p-6 rounded-2xl border border-[#F0DCE4] shadow-[0_2px_8px_rgba(233,139,170,0.05)] space-y-2.5 flex flex-col"
              >
                <div className="flex items-center gap-2 text-[#C23B6B]">
                  <LucideIcon name={cond.icon} size={17} strokeWidth={1.75} />
                  <h3 className="text-[15px] font-bold text-[#333333]">{cond.title}</h3>
                </div>
                <p className="text-[14px] font-bold text-[#C23B6B] leading-snug">
                  {cond.main}
                </p>
                <p className="text-[13.5px] text-[#666666] leading-relaxed">
                  {cond.detail}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* =========================================================
            10. 他店との比較チェック
           ========================================================= */}
        <section id="shop-comparison" className="bg-white rounded-2xl p-6 sm:p-9 border border-[#F0DCE4] scroll-mt-20 space-y-6">
          <div className="max-w-2xl space-y-2">
            <h2 className="text-[21px] sm:text-[25px] font-bold text-[#333333] tracking-tight">
              今のお店と当店の比較
            </h2>
            <p className="text-[15px] sm:text-[16px] font-bold text-[#C23B6B]">
              今のお店と、当店を比べてみてください。
            </p>
            <p className="text-[14px] sm:text-[15px] text-[#666666] leading-relaxed">
              飛田新地の他店で勤務中の方がご自身の状況を整理できるよう、当店の具体的な条件を並べています。現在のお店と比べてご判断ください。
            </p>
          </div>

          <div className="overflow-x-auto rounded-xl border border-[#F0DCE4]">
            <table className="w-full min-w-[580px] text-left border-collapse text-[14px] sm:text-[15px]">
              <thead>
                <tr className="border-b border-[#F0DCE4] bg-[#FFF9FB]">
                  <th className="p-4 font-bold text-[#333333] w-1/4 border-r border-[#F0DCE4]">
                    比較項目
                  </th>
                  <th className="p-4 font-bold text-[#666666] w-1/3 border-r border-[#F0DCE4]">
                    今のお店（今の状況をチェック）
                  </th>
                  <th className="p-4 font-bold text-white bg-[#E98BAA] w-5/12">
                    当店
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F0DCE4] bg-white">
                {OTHER_SHOP_COMPARISON.map((row, idx) => (
                  <tr key={idx}>
                    <th scope="row" className="p-4 font-bold text-[#333333] border-r border-[#F0DCE4] align-top">
                      {row.item}
                    </th>
                    <td className="p-4 text-[#666666] border-r border-[#F0DCE4] align-top">
                      {row.current}
                    </td>
                    <td className="p-4 font-semibold text-[#333333] bg-[#FFF0F5] align-top">
                      {row.ours}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* =========================================================
            11. 立地の良さ（アクセス・地図）
           ========================================================= */}
        <section id="access" className="bg-white rounded-2xl p-6 sm:p-9 border border-[#F0DCE4] scroll-mt-20 space-y-7">
          <div className="max-w-2xl space-y-2">
            <h2 className="text-[21px] sm:text-[25px] font-bold text-[#333333] tracking-tight">
              立地の良さ・周辺環境
            </h2>
            <p className="text-[15px] sm:text-[16px] font-bold text-[#C23B6B]">
              立地の良さで、お客さんが上がりやすくなる。
            </p>
            <p className="text-[14px] sm:text-[15px] text-[#666666] leading-relaxed">
              当店はメイン・青春通りエリアにあり、人通りが多いためお客様が上がりやすい立地環境です。店舗のあるエリアとあわせて、最寄り駅からの位置関係も事前にご確認いただけます。
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* 左：店舗周辺アクセスマップ（イラスト見取り図） */}
            <div className="lg:col-span-5 bg-[#FFF9FB] rounded-2xl border border-[#F0DCE4] p-5 flex flex-col justify-between space-y-4">
              <div className="space-y-1">
                <span className="text-[13px] font-bold text-[#C23B6B] block">店舗周辺エリア案内図</span>
                <p className="text-[14px] font-bold text-[#333333]">
                  所在地：大阪府大阪市西成区山王3丁目エリア
                </p>
                <p className="text-[13px] text-[#666666]">
                  飛田新地料理組合加盟 料亭街（主要3駅より徒歩5〜10分圏内）
                </p>
              </div>

              <div className="bg-white rounded-xl border border-[#F0DCE4] p-3">
                <svg
                  viewBox="0 0 360 230"
                  role="img"
                  aria-label="動物園前駅 徒歩5分、新今宮駅 徒歩7分、天王寺駅 徒歩10分から飛田新地料亭街へのアクセス案内図"
                  className="w-full h-auto"
                >
                  <rect width="360" height="230" rx="10" fill="#FFF9FB" />
                  {/* 大通りライン */}
                  <line x1="25" y1="68" x2="335" y2="68" stroke="#E5D5DC" strokeWidth="4" />
                  <line x1="150" y1="30" x2="150" y2="210" stroke="#E5D5DC" strokeWidth="4" />
                  {/* ルート線 */}
                  <path d="M 55 68 L 150 68 L 150 155 L 210 155" fill="none" stroke="#E98BAA" strokeWidth="2.5" strokeDasharray="5 4" />
                  <path d="M 150 68 L 150 155 L 210 155" fill="none" stroke="#E98BAA" strokeWidth="2.5" strokeDasharray="5 4" />
                  <path d="M 295 68 L 295 155 L 210 155" fill="none" stroke="#E98BAA" strokeWidth="2.5" strokeDasharray="5 4" />

                  {/* 新今宮駅 */}
                  <rect x="16" y="22" width="96" height="36" rx="8" fill="#FFFFFF" stroke="#E98BAA" strokeWidth="1.5" />
                  <text x="64" y="38" textAnchor="middle" fontSize="11" fontWeight="700" fill="#333333">新今宮駅</text>
                  <text x="64" y="51" textAnchor="middle" fontSize="10" fontWeight="700" fill="#C23B6B">JR・南海 徒歩7分</text>

                  {/* 動物園前駅 */}
                  <rect x="116" y="22" width="102" height="36" rx="8" fill="#FFFFFF" stroke="#C23B6B" strokeWidth="2" />
                  <text x="167" y="38" textAnchor="middle" fontSize="11" fontWeight="700" fill="#333333">動物園前駅</text>
                  <text x="167" y="51" textAnchor="middle" fontSize="10" fontWeight="700" fill="#C23B6B">最寄・徒歩5分</text>

                  {/* 天王寺駅 */}
                  <rect x="234" y="22" width="112" height="36" rx="8" fill="#FFFFFF" stroke="#E98BAA" strokeWidth="1.5" />
                  <text x="290" y="38" textAnchor="middle" fontSize="11" fontWeight="700" fill="#333333">天王寺・阿部野橋</text>
                  <text x="290" y="51" textAnchor="middle" fontSize="10" fontWeight="700" fill="#C23B6B">各線 徒歩10分</text>

                  {/* 目印：ジャンジャン横丁 */}
                  <rect x="60" y="96" width="80" height="24" rx="6" fill="#FFF0F5" stroke="#F0DCE4" />
                  <text x="100" y="112" textAnchor="middle" fontSize="9.5" fill="#666666">ジャンジャン横丁</text>

                  {/* 目印：ハルカス側 */}
                  <rect x="242" y="96" width="98" height="24" rx="6" fill="#FFF0F5" stroke="#F0DCE4" />
                  <text x="291" y="112" textAnchor="middle" fontSize="9.5" fill="#666666">あべのハルカス方面</text>

                  {/* 目的地：飛田新地料亭街 */}
                  <rect x="148" y="142" width="136" height="58" rx="10" fill="#FFF0F5" stroke="#C23B6B" strokeWidth="2" />
                  <text x="216" y="164" textAnchor="middle" fontSize="12" fontWeight="700" fill="#C23B6B">飛田新地（山王エリア）</text>
                  <text x="216" y="180" textAnchor="middle" fontSize="9.5" fill="#333333">メイン通り・青春通り 直営料亭</text>
                  <text x="216" y="193" textAnchor="middle" fontSize="9" fill="#666666">※待ち合わせご案内OK</text>
                </svg>
              </div>

              <p className="text-[13px] text-[#666666] leading-relaxed">
                ※初めてお越しの方や見学・面談時は、動物園前駅・天王寺駅周辺での待ち合わせと女性スタッフによる道案内にも対応しています。
              </p>
            </div>

            {/* 右：3駅アクセス詳細カード */}
            <div className="lg:col-span-7 flex flex-col justify-between gap-4">
              {ACCESS_STATIONS.map((st, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-[#FFF9FB] border border-[#F0DCE4] space-y-1.5"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <LucideIcon name="Train" size={17} className="text-[#C23B6B] shrink-0" strokeWidth={1.75} />
                      <h3 className="text-[16px] font-bold text-[#333333]">{st.station}</h3>
                    </div>
                    <span className="text-[14px] font-bold text-[#C23B6B] tabular-nums">
                      {st.time}
                    </span>
                  </div>
                  <p className="text-[13px] font-medium text-[#999999]">
                    路線：{st.lines}
                  </p>
                  <p className="text-[14px] text-[#666666] leading-relaxed pt-0.5">
                    {st.route}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================
            12. 移籍までの流れ（3ステップ横並び）
           ========================================================= */}
        <section id="transfer-flow" className="bg-white rounded-2xl p-6 sm:p-9 border border-[#F0DCE4] scroll-mt-20 space-y-6">
          <div className="max-w-2xl space-y-2">
            <h2 className="text-[21px] sm:text-[25px] font-bold text-[#333333] tracking-tight">
              移籍までの流れ
            </h2>
            <p className="text-[15px] sm:text-[16px] font-bold text-[#C23B6B]">
              今のお店を辞める前に、まずは相談から。
            </p>
            <p className="text-[14px] sm:text-[15px] text-[#666666] leading-relaxed">
              他業種からの移籍も、飛田新地の他店からの移籍も、まずは相談から始められます。
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {TRANSFER_STEPS.map((st, idx) => (
              <div
                key={idx}
                className="p-5 sm:p-6 rounded-2xl bg-[#FFF9FB] border border-[#F0DCE4] flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[13px] font-bold text-[#C23B6B] tabular-nums">
                      STEP {idx + 1}
                    </span>
                    <LucideIcon name={st.icon} size={18} className="text-[#C23B6B]" strokeWidth={1.75} />
                  </div>
                  <h3 className="text-[17px] font-bold text-[#333333]">
                    {st.title}
                  </h3>
                  <ul className="space-y-1.5 text-[14px] text-[#666666]">
                    {st.points.map((pt, pIdx) => (
                      <li key={pIdx} className="flex items-start gap-2">
                        <span className="text-[#C23B6B] font-bold shrink-0">・</span>
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <p className="text-[13px] text-[#666666] pt-3 border-t border-[#F0DCE4] leading-relaxed">
                  {st.note}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* =========================================================
            13. 移籍前に確認したい4つのポイント
           ========================================================= */}
        <section id="check-points" className="scroll-mt-20 space-y-6">
          <div className="max-w-2xl space-y-2">
            <h2 className="text-[21px] sm:text-[25px] font-bold text-[#333333] tracking-tight">
              移籍前に確認したいポイント
            </h2>
            <p className="text-[15px] sm:text-[16px] font-bold text-[#C23B6B]">
              移籍前に確認しておきたい4つのポイント
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {PRE_TRANSFER_POINTS.map((pt, idx) => (
              <div
                key={idx}
                className="bg-white p-5 sm:p-6 rounded-2xl border border-[#F0DCE4] shadow-[0_2px_8px_rgba(233,139,170,0.05)] space-y-2.5"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-[#FFF0F5] text-[#C23B6B] flex items-center justify-center shrink-0">
                    <LucideIcon name={pt.icon} size={18} strokeWidth={1.75} />
                  </div>
                  <h3 className="text-[16px] sm:text-[17px] font-bold text-[#333333]">
                    {pt.title}
                  </h3>
                </div>
                <p className="text-[14px] sm:text-[15px] text-[#666666] leading-relaxed">
                  {pt.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* =========================================================
            14. 経験者向けのお役立ちコラム（6記事カード）
           ========================================================= */}
        <section id="columns" className="bg-white rounded-2xl p-6 sm:p-9 border border-[#F0DCE4] scroll-mt-20 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-1.5">
              <h2 className="text-[21px] sm:text-[25px] font-bold text-[#333333] tracking-tight">
                経験者向けコラム
              </h2>
              <p className="text-[15px] sm:text-[16px] font-bold text-[#C23B6B]">
                経験者のためのお役立ちコラム
              </p>
              <p className="text-[14px] text-[#666666]">
                他業種からの移籍と、飛田新地の他店からの移籍の両方に役立つ記事をまとめました。
              </p>
            </div>

            {onNavigateBlog && (
              <a
                href="/blog"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigateBlog();
                }}
                className="text-[14px] font-bold text-[#C23B6B] hover:underline flex items-center gap-1 cursor-pointer self-start sm:self-auto whitespace-nowrap"
              >
                <span>コラム一覧を見る</span>
                <LucideIcon name="ChevronRight" size={15} />
              </a>
            )}
          </div>

          <div className="flex items-center gap-1.5 text-[13px] font-semibold text-[#C23B6B] md:hidden">
            <LucideIcon name="ArrowLeftRight" size={15} strokeWidth={1.75} />
            <span>横にスワイプして記事をチェックできます</span>
          </div>

          <div className="flex overflow-x-auto snap-x snap-mandatory gap-5 pb-2 md:grid md:grid-cols-3 md:overflow-visible">
            {FEATURED_COLUMNS.map((article) => (
              <a
                key={article.slug}
                href={`/blog/${article.slug}`}
                onClick={(e) => {
                  if (onNavigateBlog) {
                    e.preventDefault();
                    onNavigateBlog(article.slug);
                  }
                }}
                className="min-w-[275px] max-w-[310px] md:min-w-0 md:max-w-none snap-start bg-[#FFF9FB] rounded-2xl border border-[#F0DCE4] overflow-hidden hover:border-[#E98BAA] transition-colors cursor-pointer group flex flex-col justify-between"
              >
                <div>
                  <div className="aspect-4/3 w-full overflow-hidden bg-[#FFF0F5]">
                    <img
                      src={article.image}
                      alt={article.title}
                      referrerPolicy="no-referrer"
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-5 space-y-2.5">
                    <div className="flex items-center gap-2 text-[12px] text-[#999999]">
                      <span className="font-semibold text-[#C23B6B]">{article.category}</span>
                      <span aria-hidden="true">·</span>
                      <span>{article.readTime}</span>
                    </div>
                    <h3 className="text-[16px] font-bold text-[#333333] leading-snug group-hover:text-[#C23B6B] transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-[13.5px] text-[#666666] leading-relaxed line-clamp-3">
                      {article.summary}
                    </p>
                  </div>
                </div>
                <div className="px-5 pb-5 pt-1 flex items-center text-[14px] font-bold text-[#C23B6B] gap-1 group-hover:underline">
                  <span>記事を読む</span>
                  <LucideIcon name="ChevronRight" size={15} />
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* =========================================================
            15. 経験者向けFAQ（カテゴリ別アコーディオン）
           ========================================================= */}
        <section id="faq" className="scroll-mt-20 space-y-8">
          <div className="max-w-2xl space-y-2">
            <h2 className="text-[21px] sm:text-[25px] font-bold text-[#333333] tracking-tight">
              よくある質問
            </h2>
            <p className="text-[15px] sm:text-[16px] font-bold text-[#C23B6B]">
              経験者・移籍希望者からよくある質問
            </p>
            <p className="text-[14px] sm:text-[15px] text-[#666666] leading-relaxed">
              他業種からの移籍・飛田新地の他店からの移籍について、多く寄せられる疑問にお答えします。
            </p>
          </div>

          <div className="space-y-6">
            {FAQ_GROUPS.map((group) => (
              <div
                key={group.key}
                className="bg-white rounded-2xl p-5 sm:p-7 border border-[#F0DCE4] space-y-4"
              >
                <h3 className="text-[17px] sm:text-[18px] font-bold text-[#333333] pb-2 border-b border-[#F0DCE4]">
                  {group.heading}
                </h3>
                <div className="divide-y divide-[#F0DCE4]">
                  {group.items.map((faq, idx) => {
                    const key = `${group.key}-${idx}`;
                    const isOpen = openFaqKey === key;
                    return (
                      <div key={key} className="py-3 first:pt-0 last:pb-0">
                        <button
                          type="button"
                          onClick={() => setOpenFaqKey(isOpen ? null : key)}
                          aria-expanded={isOpen}
                          className="w-full min-h-[48px] text-left flex items-center justify-between gap-4 py-2 text-[14.5px] sm:text-[15.5px] font-bold text-[#333333] hover:text-[#C23B6B] cursor-pointer transition-colors"
                        >
                          <span className="flex items-start gap-2.5">
                            <span className="text-[#C23B6B] font-bold shrink-0">Q.</span>
                            <span>{faq.q}</span>
                          </span>
                          <LucideIcon
                            name={isOpen ? 'ChevronUp' : 'ChevronDown'}
                            size={18}
                            className="text-[#999999] shrink-0"
                          />
                        </button>
                        <AnimatePresence>
                          {isOpen && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.18 }}
                              className="overflow-hidden"
                            >
                              <div className="pt-2 pb-2 pl-6 sm:pl-7 text-[14px] sm:text-[15px] text-[#666666] leading-relaxed">
                                <div className="p-4 rounded-xl bg-[#FFF9FB] border border-[#F0DCE4]">
                                  {faq.a}
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {onNavigateFaq && (
            <div className="text-center">
              <a
                href="/faq"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigateFaq();
                }}
                className="text-[14px] font-bold text-[#C23B6B] hover:underline inline-flex items-center gap-1 cursor-pointer"
              >
                <span>よくある質問（全一覧）を見る</span>
                <LucideIcon name="ChevronRight" size={15} />
              </a>
            </div>
          )}
        </section>

        {/* =========================================================
            16. 最終CTA（背景薄いピンク）
           ========================================================= */}
        <section
          id="line-cta"
          className="bg-[#FFF0F5] rounded-2xl p-7 sm:p-11 border border-[#F5B5C9] text-center space-y-5 scroll-mt-20"
        >
          <div className="max-w-2xl mx-auto space-y-3">
            <h2 className="text-[21px] sm:text-[26px] font-bold text-[#333333] tracking-tight">
              今の働き方を変えたいと思ったら、まずは相談から。
            </h2>
            <p className="text-[14px] sm:text-[15.5px] text-[#666666] leading-relaxed">
              他業種での経験がある方も、飛田新地で他店に勤務している方も。仕事内容・接客ルール・人間関係・報酬・待遇・立地など、気になることを一つずつ確認してみませんか？
            </p>
            <p className="text-[14px] sm:text-[15.5px] text-[#666666] leading-relaxed">
              今すぐ移籍を決める必要はありません。まずは自分に合った働き方や環境を知ることから始めてみてください。
            </p>
          </div>

          <div className="pt-2 flex flex-col items-center gap-3">
            <a
              href={LINE_OFFICIAL_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => {
                e.preventDefault();
                handleLineClick('【経験者・移籍ページからの相談】仕事内容・人間関係・待遇・立地などについて相談したいです。');
              }}
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[#06C755] hover:bg-[#05b34c] text-white font-bold text-[15px] shadow-xs transition-colors cursor-pointer inline-flex items-center justify-center gap-2.5 whitespace-nowrap"
            >
              <LucideIcon name="MessageCircle" size={19} strokeWidth={2} />
              <span>LINEで移籍について相談する</span>
            </a>

            <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-[13px] font-semibold text-[#666666]">
              <span>他業種・他店からの移籍相談OK</span>
              <span aria-hidden="true">·</span>
              <span>相談だけでもOK</span>
            </div>
          </div>
        </section>

        {/* 関連ページリンク */}
        <section className="pt-4 border-t border-[#F0DCE4]">
          <h3 className="text-[13px] font-bold text-[#999999] mb-3 text-center">
            関連するガイドページ
          </h3>
          <div className="flex flex-wrap items-center justify-center gap-2.5 text-[13px]">
            {onNavigateTopic && (
              <>
                <a
                  href="/job"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigateTopic('job');
                  }}
                  className="px-4 py-2 rounded-xl bg-white hover:bg-[#FFF0F5] hover:text-[#C23B6B] border border-[#F0DCE4] transition-colors cursor-pointer"
                >
                  お仕事内容
                </a>
                <a
                  href="/salary"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigateTopic('salary');
                  }}
                  className="px-4 py-2 rounded-xl bg-white hover:bg-[#FFF0F5] hover:text-[#C23B6B] border border-[#F0DCE4] transition-colors cursor-pointer"
                >
                  給料・待遇
                </a>
                <a
                  href="/workstyle"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigateTopic('workstyle');
                  }}
                  className="px-4 py-2 rounded-xl bg-white hover:bg-[#FFF0F5] hover:text-[#C23B6B] border border-[#F0DCE4] transition-colors cursor-pointer"
                >
                  働き方
                </a>
                <a
                  href="/flow"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigateTopic('flow');
                  }}
                  className="px-4 py-2 rounded-xl bg-white hover:bg-[#FFF0F5] hover:text-[#C23B6B] border border-[#F0DCE4] transition-colors cursor-pointer"
                >
                  面接・体験入店の流れ
                </a>
                <a
                  href="/safety"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigateTopic('safety');
                  }}
                  className="px-4 py-2 rounded-xl bg-white hover:bg-[#FFF0F5] hover:text-[#C23B6B] border border-[#F0DCE4] transition-colors cursor-pointer"
                >
                  安全・身バレ対策
                </a>
              </>
            )}
            {onNavigateFaq && (
              <a
                href="/faq"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigateFaq();
                }}
                className="px-4 py-2 rounded-xl bg-white hover:bg-[#FFF0F5] hover:text-[#C23B6B] border border-[#F0DCE4] transition-colors cursor-pointer"
              >
                よくある質問
              </a>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}

const TOC_ITEMS = [
  { id: 'transfer-guide', label: '移籍のご案内' },
  { id: 'burdens', label: '今の仕事の負担' },
  { id: 'comparison', label: '5業種比較' },
  { id: 'merit-other-industry', label: '他業種からの移籍' },
  { id: 'merit-other-shop', label: '他店からの移籍' },
  { id: 'conditions', label: '待遇・条件' },
  { id: 'shop-comparison', label: '他店比較チェック' },
  { id: 'access', label: '立地の良さ' },
  { id: 'transfer-flow', label: '移籍までの流れ' },
  { id: 'columns', label: 'お役立ちコラム' },
  { id: 'faq', label: 'よくある質問' },
];

const BASIC_INFO_CARDS: {
  icon: 'Clock' | 'ShieldCheck' | 'MessageSquare' | 'HeartHandshake';
  label: string;
  title: string;
  desc: string;
}[] = [
  {
    icon: 'Clock',
    label: '① 接客スタイル',
    title: '短時間中心の接客',
    desc: '1回15〜20分が基本の個室接客。長時間の施術や席付きとは異なるペースで働けます。',
  },
  {
    icon: 'ShieldCheck',
    label: '② 接客ルール',
    title: 'キス・粘膜接触なし',
    desc: '当店の募集では、キスや粘膜接触を伴わない接客ルールを採用しています。',
  },
  {
    icon: 'MessageSquare',
    label: '③ 移籍相談',
    title: '他業種・他店からの移籍相談OK',
    desc: '今のお仕事を辞める前でも、匿名のまま仕事内容や条件のご相談が可能です。',
  },
  {
    icon: 'HeartHandshake',
    label: '④ 働く環境',
    title: '人間関係・待遇・立地も大切に',
    desc: '派閥やいじめを作らない職場方針、明朗な待遇、メイン・青春通りの人通りが多い立地を整えています。',
  },
];

const CURRENT_BURDENS: {
  icon: 'Clock' | 'ShieldAlert' | 'MessageSquareOff' | 'Sparkles';
  title: string;
  desc: string;
}[] = [
  {
    icon: 'Clock',
    title: '① 長時間の接客・施術',
    desc: '長時間の接客や施術を続けることで、身体的にも精神的にも疲れてしまうことはありませんか？',
  },
  {
    icon: 'ShieldAlert',
    title: '② 接触内容への抵抗',
    desc: 'キスや身体的な接触など、仕事内容に対して精神的な負担や抵抗を感じていませんか？',
  },
  {
    icon: 'MessageSquareOff',
    title: '③ 営業連絡・売上へのプレッシャー',
    desc: 'お客様への営業LINEや売上・指名を意識し続ける働き方に疲れていませんか？',
  },
  {
    icon: 'Sparkles',
    title: '④ 準備・片付け・その他の業務',
    desc: '施術準備、入浴、清掃、接客以外の業務など、本来の接客以外にも負担を感じていませんか？',
  },
];

const FIVE_INDUSTRY_COMPARISON = [
  {
    item: '主な接客',
    tobita: '個室での接客',
    esthe: 'エステ施術',
    soap: '入浴を伴う接客',
    health: '店舗形態による',
    cabaret: '飲食・会話',
    highlightPink: false,
  },
  {
    item: '接客時間',
    tobita: '短時間中心',
    esthe: 'コース制',
    soap: 'コース制',
    health: 'コース制',
    cabaret: '長時間になりやすい',
    highlightPink: true,
  },
  {
    item: '写メ日記・パネル掲載',
    tobita: 'なし',
    esthe: 'あり',
    soap: 'あり',
    health: 'あり',
    cabaret: 'あり',
    highlightPink: true,
  },
  {
    item: '粘膜接触',
    tobita: 'なし',
    esthe: '通常は基本業務外',
    soap: 'サービスによる',
    health: 'サービスによる',
    cabaret: '通常は基本業務外',
    highlightPink: true,
  },
  {
    item: '営業連絡',
    tobita: 'なし',
    esthe: '店舗ルールによる',
    soap: '店舗ルールによる',
    health: '店舗ルールによる',
    cabaret: '同伴・営業連絡等がある場合も',
    highlightPink: true,
  },
  {
    item: '主な負担',
    tobita: '体力面',
    esthe: '施術・体力面',
    soap: '入浴・接客内容',
    health: '接客内容・店舗形態',
    cabaret: '会話・営業・お酒',
    highlightPink: false,
  },
];

const OTHER_INDUSTRY_MERITS: {
  icon: 'Award' | 'Clock' | 'ShieldCheck' | 'Compass';
  title: string;
  desc: string;
}[] = [
  {
    icon: 'Award',
    title: '接客経験を活かせる',
    desc: 'お客様への対応やコミュニケーションなど、今まで身につけてきた経験を活かせます。',
  },
  {
    icon: 'Clock',
    title: '短時間中心の接客',
    desc: '長時間の施術や接客を続ける働き方とは異なる、短時間中心の接客スタイルです。',
  },
  {
    icon: 'ShieldCheck',
    title: 'キス・粘膜接触なし',
    desc: '当店では、キスや粘膜接触を伴わない接客を行っています。',
  },
  {
    icon: 'Compass',
    title: '新しい働き方を検討できる',
    desc: '今の仕事を続けるか、環境を変えるか迷っている方も、まずは仕事内容や条件を比較するところから始められます。',
  },
];

const STORE_CONDITIONS: {
  icon: 'Coins' | 'Receipt' | 'Banknote' | 'Calendar' | 'Train' | 'Coffee' | 'Home' | 'ShieldCheck';
  title: string;
  main: string;
  detail: string;
}[] = [
  {
    icon: 'Coins',
    title: '報酬・バック',
    main: '売上50%バック',
    detail: '15分5,000円 / 20分7,500円 / 30分10,000円 / 45分15,000円 / 60分20,000円。外国人対応手当+2,500円/回、チップは全額女性へお渡し。',
  },
  {
    icon: 'Receipt',
    title: '控除の有無と内容',
    main: '雑費・待機料などの天引き0円',
    detail: '待機料、厚生費、ロッカー代、衣装レンタル代、ノルマ罰金などの差し引きはありません。',
  },
  {
    icon: 'Banknote',
    title: '支払い日・支払い方法',
    main: '退勤時の即日全額日払い',
    detail: 'その日の勤務終了時に、現金手渡しにて全額をお受け取りいただけます。',
  },
  {
    icon: 'Calendar',
    title: '出勤日数・時間の条件',
    main: '週1日〜・短時間相談OK（20歳以上）',
    detail: '5つの時間帯（10〜16時 / 10〜17時 / 17〜24時 / 14〜24時 / 12〜24時）から希望を相談可。※満20歳以上の女性（要・住民票原本または日本国パスポート）',
  },
  {
    icon: 'Train',
    title: '交通費',
    main: '遠方・出稼ぎ時の往復交通費支給（規定あり）',
    detail: '地方や遠方からお越しの場合、新幹線・飛行機・高速バス等の往復交通費を支給します（規定・支給上限・対象条件を事前に明確案内）。',
  },
  {
    icon: 'Coffee',
    title: '待機環境',
    main: '冷暖房・Wi-Fi完備／仲居サポートあり',
    detail: 'お部屋の清掃やシーツ交換・お呼び込みは仲居さんが担当。お酒不要・営業LINEなし、いじめや派閥を作らない環境づくりを実施。',
  },
  {
    icon: 'Home',
    title: 'その他の福利厚生',
    main: '個室マンション寮相談可・衣装・ヘアメイク無料',
    detail: '家具家電付きオートロック個室寮（空き状況・日額や初期条件は事前確認可）、ドレス・着物・ヘアアイロン無料貸出、専任女性スタッフ常駐、Web顔写真非掲載。',
  },
  {
    icon: 'ShieldCheck',
    title: '接客ルール',
    main: 'キスなし・粘膜接触なし',
    detail: '短時間中心（15〜20分基本）の個室接客で、キスや粘膜接触を行わないルールを採用しています。',
  },
];

const OTHER_SHOP_COMPARISON = [
  {
    item: '女性同士の人間関係',
    current: '派閥や人間関係の気遣いが負担になっていませんか？',
    ours: '女性同士のいじめ・派閥を作らない方針／専任女性スタッフが相談受付',
  },
  {
    item: '報酬体系',
    current: 'バック率やコース別の手取りに納得できていますか？',
    ours: '売上50%バック（15分5,000円〜60分20,000円・外国人対応+2,500円・チップ全額お渡し）',
  },
  {
    item: '控除・支払い',
    current: '待機料・厚生費・雑費などが差し引かれていませんか？',
    ours: '待機料・厚生費・衣装代などの天引き0円／退勤時に全額即日現金手渡し',
  },
  {
    item: '出勤条件',
    current: '週1日〜や希望時間帯で無理なくシフトを組めていますか？',
    ours: '週1日〜・短時間勤務の相談OK（5つの勤務時間帯から希望を相談可能）',
  },
  {
    item: '待機環境',
    current: '待機スペースの居心地や清掃などの負担はありませんか？',
    ours: '冷暖房・Wi-Fi完備／清掃や呼び込みは仲居さんが担当／衣装・コスメ無料貸出',
  },
  {
    item: '立地・集客のしやすさ',
    current: '通りの人通りが少なく、お客さんが上がりにくくありませんか？',
    ours: 'メイン・青春通りにお店があり人通りが多く、お客様が上がりやすい立地（主要3駅徒歩5〜10分圏内）',
  },
  {
    item: '接客ルール',
    current: '接客内容・ルールや連絡の負担に違和感はありませんか？',
    ours: '短時間中心・キスなし・粘膜接触なし／お酒不要・店外営業連絡なし',
  },
];

const ACCESS_STATIONS = [
  {
    station: 'Osaka Metro「動物園前駅」（最寄り）',
    lines: '御堂筋線・堺筋線',
    time: '徒歩5分',
    route: '1番または2番出口を出てすぐ、ジャンジャン横丁を抜けて飛田大門通りへ続く人通りの多い主要ルートです。',
  },
  {
    station: 'JR・南海「新今宮駅」',
    lines: 'JR大阪環状線・大和路線 / 南海本線・高野線',
    time: '徒歩7分',
    route: '通天閣口（東出口）から南東へ。なんば・関空・奈良・和歌山方面からもお客様が足を運びやすい主要駅です。',
  },
  {
    station: '各線「天王寺駅」/ 近鉄「大阪阿部野橋駅」',
    lines: 'JR各線 / Osaka Metro 御堂筋線・谷町線 / 近鉄南大阪線',
    time: '徒歩10分',
    route: 'あべのハルカス・キューズモール側から西へ平坦な大通り沿い。ターミナル駅周辺からも立ち寄りやすい立地です。',
  },
];

const TRANSFER_STEPS: {
  icon: 'MessageCircle' | 'FileSearch' | 'CheckCircle2';
  title: string;
  points: string[];
  note: string;
}[] = [
  {
    icon: 'MessageCircle',
    title: 'LINEで事前相談',
    points: [
      '現在の経験業種',
      '現在の働き方',
      '希望する条件',
      '気になっていること',
      '移籍についての不安',
    ],
    note: '在籍中のまま匿名で相談でき、無理な勧誘は行いません。',
  },
  {
    icon: 'FileSearch',
    title: '条件・仕事内容の確認',
    points: [
      '実際の接客内容・接客上のルール',
      '報酬・待遇・控除の有無',
      '出勤条件・勤務時間帯',
      '待機環境・設備の様子',
      '立地・アクセス',
    ],
    note: '不明点や気になる点は、面接や見学の段階でも事前に確認できます。',
  },
  {
    icon: 'CheckCircle2',
    title: '納得してから判断',
    points: [
      '条件と職場環境を整理して比較',
      '納得できた場合のみ次のステップへ',
      '今のお店をすぐに辞める前提はありません',
    ],
    note: '相談や見学のあとに見送る場合も問題ありません。ご自身のペースで判断いただけます。',
  },
];

const PRE_TRANSFER_POINTS: {
  icon: 'ClipboardCheck' | 'Coins' | 'Lock' | 'CalendarCheck';
  title: string;
  desc: string;
}[] = [
  {
    icon: 'ClipboardCheck',
    title: '① 接客内容・ルール',
    desc: '実際にどのような接客を行うのか、キスや粘膜接触の有無、禁止事項なども含めて具体的に確認できます。',
  },
  {
    icon: 'Coins',
    title: '② 報酬・待遇',
    desc: '報酬の仕組み、控除、支払い条件、交通費など、働くうえで重要な条件を事前に確認します。',
  },
  {
    icon: 'Lock',
    title: '③ 待機環境・プライバシー',
    desc: '待機場所、個人情報の取り扱い、身バレ対策など、プライバシー面の条件も確認できます。',
  },
  {
    icon: 'CalendarCheck',
    title: '④ 出勤・退店に関する条件',
    desc: '出勤日数、時間、欠勤時の扱い、退店時の条件なども、事前に確認できるようにしています。',
  },
];

const FEATURED_COLUMNS = [
  {
    title: 'メンズエステから飛田新地への移籍を考える前に知っておきたい違い',
    slug: 'mens-esthe-to-tobitashinchi-transfer',
    category: '他業種からの移籍',
    readTime: '4分',
    image: '/images/col_stressfree_rest_japanese_158_1793175561720.jpg',
    summary:
      '長時間の施術やSNS・予約連絡の負担との違いは？メンズエステ経験者が移籍前に知っておきたい接客時間やルールを整理しました。',
  },
  {
    title: 'ソープ・ヘルス経験者が移籍前に確認したい仕事内容と接客ルール',
    slug: 'soap-health-to-tobitashinchi-rules',
    category: '他業種からの移籍',
    readTime: '4分',
    image: '/images/col_traditional_work_japanese_140_1793175503653.jpg',
    summary:
      '入浴介助の有無や、当店の「キスなし・粘膜接触なし」ルール、片付け分担など移籍前に比較しておきたい仕事内容の違いを解説。',
  },
  {
    title: 'キャバクラ経験者が知っておきたい接客スタイルと働き方の違い',
    slug: 'cabaret-to-tobitashinchi-workstyle',
    category: '他業種からの移籍',
    readTime: '4分',
    image: '/images/col_mature_grace_japanese_139_1793175388580.jpg',
    summary:
      '営業LINEや同伴、お酒の席での疲労を見直したい方へ。培ったコミュニケーション力を活かせる働き方の違いを紹介。',
  },
  {
    title: '飛田新地で他店から移籍する前に確認したい7つのポイント',
    slug: 'tobitashinchi-shop-transfer-7-points',
    category: '他店からの移籍',
    readTime: '5分',
    image: '/images/col_shop_compare_japanese_148_1793175523125.jpg',
    summary:
      '他店在籍中の方へ。今のお店を辞める前に比較・確認しておきたい人間関係、報酬・控除、立地、待機環境など7つの項目。',
  },
  {
    title: '飛田新地の求人で待遇を比較するときに確認したいこと',
    slug: 'tobitashinchi-treatment-comparison-guide',
    category: '待遇・条件比較',
    readTime: '4分',
    image: '/images/col_privacy_safe_japanese_162_1793175321318.jpg',
    summary:
      '報酬計算の透明性、控除0円の明確さ、即日日払いのルール、交通費・寮の適用条件など比較時に見るべきポイントを解説。',
  },
  {
    title: '飛田新地で働くなら人間関係も大切？お店選びのポイント',
    slug: 'tobitashinchi-workplace-relationships-guide',
    category: '職場環境・人間関係',
    readTime: '4分',
    image: '/images/col_mentor_support_japanese_143_1793175370437.jpg',
    summary:
      '女性同士のいじめや派閥を作らない方針、スタッフのサポート体制など、落ち着いて続けられる職場を見極めるための確認ポイント。',
  },
];

const FAQ_GROUPS = [
  {
    key: 'other',
    heading: '他業種からの移籍について',
    items: [
      {
        q: 'メンズエステの経験しかありませんが大丈夫ですか？',
        a: 'はい、大丈夫です。業種が異なっていても、丁寧な挨拶や気配りなど接客経験を活かせる部分は多くあります。仕事内容や条件を事前に確認していただけます。',
      },
      {
        q: 'ソープやヘルスからの移籍でも大丈夫ですか？',
        a: 'はい、可能です。これまでの経験を伺いながら、当店の実際の仕事内容や接客ルール、働き方の条件を丁寧にご案内します。',
      },
      {
        q: 'キャバクラ経験は活かせますか？',
        a: 'はい、活かせます。お客様への自然な会話やコミュニケーション、表情のつくり方など、これまでの経験を活かせる部分が多くあります。',
      },
      {
        q: '飛田新地ではキスをする必要がありますか？',
        a: 'いいえ、当店ではキスを伴う接客はありません。事前に接客ルールをご確認いただいたうえでご検討いただけます。',
      },
      {
        q: '粘膜接触はありますか？',
        a: 'いいえ、当店では粘膜接触を伴う接客はありません。勤務条件やルールについてもご相談時に明確にお伝えしています。',
      },
      {
        q: '接客時間はどれくらいですか？',
        a: '1回15分〜20分を中心とした短時間中心の接客スタイルです。具体的なコース時間や条件については、事前にご確認いただけます。',
      },
    ],
  },
  {
    key: 'shop',
    heading: '飛田新地の他店からの移籍について',
    items: [
      {
        q: '飛田新地の他店で働いていますが、移籍できますか？',
        a: 'はい、移籍のご相談が可能です。他店での経験がある方も、仕事内容や条件、職場環境をご確認いただいたうえでご相談いただけます。',
      },
      {
        q: '今のお店を辞める前に相談できますか？',
        a: 'はい、可能です。先に今のお店を辞める必要はありません。比較や移籍を検討している段階でLINEからご相談いただけます。',
      },
      {
        q: '移籍するか決めていなくても相談できますか？',
        a: 'もちろんです。まずは待遇や仕事内容、立地、職場環境などを確認していただいてから、ご自身で納得して判断していただけます。',
      },
      {
        q: '女性同士の派閥やいじめはありませんか？',
        a: '当店では、女性同士のいじめや派閥を作らない職場環境づくりを大切にしています。落ち着いて働ける雰囲気を重視する方もご相談ください。',
      },
      {
        q: '人間関係が苦手でも働けますか？',
        a: 'はい。人間関係に過度なストレスを感じず、仕事以外の気遣いを減らして落ち着いて働ける環境づくりを心掛けています。',
      },
      {
        q: '今のお店より待遇が良いか比較できますか？',
        a: '当店の報酬（売上50%バック）、控除（待機料・厚生費など0円）、支払い条件（退勤時即日現金手渡し）など実際の条件をご案内しますので、現在のお店の条件と比較してご検討ください。',
      },
      {
        q: '最寄り駅からどれくらいですか？',
        a: 'Osaka Metro「動物園前駅」から徒歩5分、JR・南海「新今宮駅」から徒歩7分、各線「天王寺駅」から徒歩10分です。',
      },
      {
        q: '移籍する際に必要な手続きはありますか？',
        a: '面接・登録時には満20歳以上の年齢・国籍確認のため、本籍地記載の住民票原本（発行3ヶ月以内）または有効期限内の日本国パスポートと顔写真付き身分証をご提示いただきます。詳細は事前にご案内します。',
      },
      {
        q: '相談したことが今のお店に知られませんか？',
        a: 'ご相談内容や個人情報は秘密厳守のうえ適切に管理し、許可なく外部や他店へ共有することはいたしません。まずはLINE上でのお問い合わせのみでも確認可能です。',
      },
    ],
  },
  {
    key: 'common',
    heading: '共通の質問',
    items: [
      {
        q: '報酬や支払い条件は事前に分かりますか？',
        a: 'はい、事前にすべてご確認いただけます。売上50%バック、コース別の手取り金額、控除0円、退勤時の即日現金手渡しなど、実際の募集条件をご案内します。',
      },
      {
        q: '30代・40代でも移籍できますか？',
        a: '30代・40代の女性も落ち着いた雰囲気や経験を活かしてご活躍いただけます。',
      },
    ],
  },
];
