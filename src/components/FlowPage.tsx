/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import LucideIcon from './LucideIcon';
import { LINE_OFFICIAL_URL } from '../data';
import { updatePageJsonLd } from '../utils/jsonLd';

interface FlowPageProps {
  onNavigateHome: () => void;
  onNavigateTopic?: (topicId: string) => void;
  onNavigateBlog?: (slug?: string) => void;
  onNavigateFaq?: () => void;
  onCtaclick: () => void;
  onInjectedScroll?: (msg: string) => void;
}

export default function FlowPage({
  onNavigateHome,
  onNavigateTopic,
  onNavigateBlog,
  onNavigateFaq,
  onInjectedScroll,
}: FlowPageProps) {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

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

  // Update #seo-jsonld Structured Data (BreadcrumbList + HowTo + FAQPage synced with visible items)
  useEffect(() => {
    const schemaData = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'BreadcrumbList',
          '@id': 'https://tobitashinchi-recruit.com/flow#breadcrumb',
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
              'name': '面接・体験入店までの流れ',
              'item': 'https://tobitashinchi-recruit.com/flow'
            }
          ]
        },
        {
          '@type': 'HowTo',
          'name': '飛田新地の面接・店舗見学・体験入店の流れ',
          'description': 'LINEでの相談から、待ち合わせ・面接、店舗見学、希望に応じた体験入店、報酬の受け取りまでの手順。',
          'step': FLOW_STEPS.map((st, idx) => ({
            '@type': 'HowToStep',
            'position': idx + 1,
            'name': st.title,
            'text': st.desc
          }))
        },
        {
          '@type': 'FAQPage',
          '@id': 'https://tobitashinchi-recruit.com/flow#faq',
          'mainEntity': FLOW_FAQS.map((item) => ({
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
  }, []);

  return (
    <div className="bg-[#FFF9FB] min-h-screen text-[#35313A] pb-24 pt-4 sm:pt-6 font-sans antialiased selection:bg-[#FCE8EF] selection:text-[#D94B7A]">

      {/* 1. パンくずナビゲーション */}
      <div className="max-w-[1140px] mx-auto px-4 sm:px-6 mb-4">
        <nav aria-label="Breadcrumb" className="flex items-center text-xs sm:text-[13px]">
          <ol className="flex items-center gap-1.5 flex-wrap text-[#85818A]">
            <li className="flex items-center gap-1">
              <a
                href="/"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigateHome();
                }}
                className="hover:text-[#D94B7A] font-bold flex items-center gap-1 text-[#35313A] hover:underline cursor-pointer"
              >
                <LucideIcon name="Home" size={13} className="text-[#D94B7A]" />
                <span>飛田新地求人（トップ）</span>
              </a>
            </li>
            <li aria-hidden="true" className="text-[#85818A]">/</li>
            <li className="font-bold text-[#D94B7A]" aria-current="page">
              面接・体験入店までの流れ
            </li>
          </ol>
        </nav>
      </div>

      {/* ページ内目次アンカーバー（スマホでも横スクロールしやすい） */}
      <div className="max-w-[1140px] mx-auto px-4 sm:px-6 mb-6">
        <div className="flex items-center gap-2 overflow-x-auto py-1 scrollbar-none text-[13px] text-[#85818A]">
          <span className="font-bold text-[#35313A] whitespace-nowrap flex items-center gap-1 shrink-0">
            <LucideIcon name="Compass" size={14} className="text-[#D94B7A]" />
            <span>目次:</span>
          </span>
          <a
            href="#four-points"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('four-points');
            }}
            className="px-3.5 py-1.5 rounded-full bg-white hover:bg-[#FCE8EF] hover:text-[#D94B7A] border border-[#F0E5EA] whitespace-nowrap shrink-0 transition-colors cursor-pointer"
          >
            知っておきたい4つのこと
          </a>
          <a
            href="#five-steps"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('five-steps');
            }}
            className="px-3.5 py-1.5 rounded-full bg-white hover:bg-[#FCE8EF] hover:text-[#D94B7A] border border-[#F0E5EA] whitespace-nowrap shrink-0 transition-colors cursor-pointer"
          >
            当日の5ステップ
          </a>
          <a
            href="#interview-details"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('interview-details');
            }}
            className="px-3.5 py-1.5 rounded-full bg-white hover:bg-[#FCE8EF] hover:text-[#D94B7A] border border-[#F0E5EA] whitespace-nowrap shrink-0 transition-colors cursor-pointer"
          >
            面接で確認すること
          </a>
          <a
            href="#belongings"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('belongings');
            }}
            className="px-3.5 py-1.5 rounded-full bg-white hover:bg-[#FCE8EF] hover:text-[#D94B7A] border border-[#F0E5EA] whitespace-nowrap shrink-0 transition-colors cursor-pointer"
          >
            服装・持ち物
          </a>
          <a
            href="#trial-details"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('trial-details');
            }}
            className="px-3.5 py-1.5 rounded-full bg-white hover:bg-[#FCE8EF] hover:text-[#D94B7A] border border-[#F0E5EA] whitespace-nowrap shrink-0 transition-colors cursor-pointer"
          >
            体験入店の内容
          </a>
          <a
            href="#after-trial"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('after-trial');
            }}
            className="px-3.5 py-1.5 rounded-full bg-white hover:bg-[#FCE8EF] hover:text-[#D94B7A] border border-[#F0E5EA] whitespace-nowrap shrink-0 transition-colors cursor-pointer"
          >
            体験後の判断
          </a>
          <a
            href="#flow-faq"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('flow-faq');
            }}
            className="px-3.5 py-1.5 rounded-full bg-white hover:bg-[#FCE8EF] hover:text-[#D94B7A] border border-[#F0E5EA] whitespace-nowrap shrink-0 transition-colors cursor-pointer"
          >
            よくある質問
          </a>
          <a
            href="#line-cta"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('line-cta');
            }}
            className="px-3.5 py-1.5 rounded-full bg-[#06C755]/10 text-[#059669] hover:bg-[#06C755] hover:text-white border border-[#06C755]/30 whitespace-nowrap shrink-0 font-bold transition-colors cursor-pointer"
          >
            LINE相談
          </a>
        </div>
      </div>

      <div className="max-w-[1140px] mx-auto px-4 sm:px-6 space-y-12 sm:space-y-16">

        {/* =========================================================
            2. ファーストビュー改善
            PC：左に文章、右に写真
            スマホ：文章 → 写真 → 3つのポイント の順番
           ========================================================= */}
        <section className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 lg:p-10 border border-[#F0E5EA] shadow-2xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center">

            {/* 左側（PC） / スマホでは順番制御 */}
            <div className="lg:col-span-7 space-y-5">
              {/* タイトルタグ */}
              <div className="flex items-center gap-2 text-[13px] text-[#85818A]">
                <span className="font-bold text-[#D94B7A] bg-[#FCE8EF] px-3 py-1 rounded-full">
                  面接・体験入店までの流れ
                </span>
                <span aria-hidden="true">·</span>
                <span>納得してから決められる事前ガイド</span>
              </div>

              {/* メインコピー（27〜30px） */}
              <h1 className="text-[27px] sm:text-[30px] font-bold text-[#35313A] leading-[1.35] tracking-tight text-balance">
                面接だけでも大丈夫。<br />
                <span className="text-[#D94B7A]">まずは話を聞いてから決められます。</span>
              </h1>

              {/* サブコピー（15〜16px） */}
              <p className="text-[15px] sm:text-[16px] text-[#35313A] leading-relaxed">
                履歴書不要・私服での見学OK。仕事内容や給与、働き方について事前に確認できます。面接のみのご相談も歓迎しています。
              </p>

              {/* スマホ用画像スロット（文章 → 写真 → ポイント の順序を厳守） */}
              <div className="lg:hidden">
                <div className="rounded-2xl overflow-hidden border border-[#F0E5EA] bg-[#FFF9FB] shadow-2xs">
                  <img
                    src="/images/tobita_interview_flow_1792405357895.jpg"
                    alt="明るく清潔感のある落ち着いた相談スペースのイメージ"
                    className="w-full h-[220px] object-cover"
                    loading="eager"
                    referrerPolicy="no-referrer"
                  />
                  <div className="px-4 py-2.5 bg-white border-t border-[#F0E5EA] text-[13px] text-[#85818A] flex items-center gap-2">
                    <LucideIcon name="ShieldCheck" size={15} className="text-[#D94B7A] shrink-0" />
                    <span>プライバシーに配慮した落ち着いた空間でお話しします（※相談雰囲気のイメージ）</span>
                  </div>
                </div>
              </div>

              {/* 3つのポイント（実運用と一致する項目のみ） */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                <div className="flex items-center gap-2.5 p-3.5 rounded-xl bg-[#FFF9FB] border border-[#F0E5EA]">
                  <div className="w-8 h-8 rounded-lg bg-[#FCE8EF] text-[#D94B7A] flex items-center justify-center shrink-0">
                    <LucideIcon name="FileCheck" size={16} />
                  </div>
                  <span className="text-[14px] font-bold text-[#35313A]">
                    履歴書不要
                  </span>
                </div>

                <div className="flex items-center gap-2.5 p-3.5 rounded-xl bg-[#FFF9FB] border border-[#F0E5EA]">
                  <div className="w-8 h-8 rounded-lg bg-[#FCE8EF] text-[#D94B7A] flex items-center justify-center shrink-0">
                    <LucideIcon name="Shirt" size={16} />
                  </div>
                  <span className="text-[14px] font-bold text-[#35313A]">
                    私服での相談・見学OK
                  </span>
                </div>

                <div className="flex items-center gap-2.5 p-3.5 rounded-xl bg-[#FFF9FB] border border-[#F0E5EA]">
                  <div className="w-8 h-8 rounded-lg bg-[#FCE8EF] text-[#D94B7A] flex items-center justify-center shrink-0">
                    <LucideIcon name="HeartHandshake" size={16} />
                  </div>
                  <span className="text-[14px] font-bold text-[#35313A]">
                    女性スタッフによる対応
                  </span>
                </div>
              </div>

              {/* プライマリCTA（公式LINE） */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <a
                  href={LINE_OFFICIAL_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => {
                    e.preventDefault();
                    handleLineClick('【面接・体験入店ページより】面接の流れや見学・相談だけについて、事前に少し質問したいです。');
                  }}
                  className="px-7 py-3.5 rounded-full bg-[#06C755] hover:bg-[#05b34c] text-white font-bold text-[15px] shadow-xs transition-colors cursor-pointer flex items-center justify-center gap-2.5 whitespace-nowrap min-h-[48px]"
                >
                  <LucideIcon name="MessageCircle" size={19} className="fill-white text-white shrink-0" />
                  <span>LINEで質問・相談する</span>
                </a>
                <span className="text-[13px] text-[#85818A] text-center sm:text-left">
                  ※面接の予約前・質問だけでも大丈夫です
                </span>
              </div>
            </div>

            {/* 右側（PC用：明るい落ち着いた相談環境イメージ） */}
            <div className="hidden lg:block lg:col-span-5">
              <div className="rounded-2xl overflow-hidden border border-[#F0E5EA] bg-[#FFF9FB] shadow-2xs">
                <div className="aspect-[4/3] w-full overflow-hidden">
                  <img
                    src="/images/tobita_interview_flow_1792405357895.jpg"
                    alt="明るく清潔感のある落ち着いた相談スペースのイメージ"
                    className="w-full h-full object-cover"
                    loading="eager"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="p-4 bg-white border-t border-[#F0E5EA] text-[13px] text-[#85818A] flex items-start gap-2 leading-relaxed">
                  <LucideIcon name="ShieldCheck" size={16} className="text-[#D94B7A] shrink-0 mt-0.5" />
                  <span>人目を気にせず話せる落ち着いた環境でご案内します（※画像は相談雰囲気のイメージです）</span>
                </div>
              </div>
            </div>

          </div>
        </section>


        {/* =========================================================
            3. ファーストビュー直下に4つの安心ポイント + 3つの違いの明確化
           ========================================================= */}
        <section id="four-points" className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 lg:p-10 border border-[#F0E5EA] shadow-2xs scroll-mt-20 space-y-6">
          <div className="max-w-2xl space-y-2">
            <h2 className="text-[21px] sm:text-[24px] font-bold text-[#35313A] tracking-tight">
              面接・体験入店について、最初に知っておきたい4つのこと
            </h2>
            <p className="text-[15px] text-[#85818A] leading-relaxed">
              まずは全体のルールをご案内します。お話だけを聞くこと、1日体験すること、入店を決めることはそれぞれ別のステップです。
            </p>
          </div>

          {/* 4つのカード（2列×2段） */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <div className="p-5 sm:p-6 rounded-2xl bg-[#FFF9FB] border border-[#F0E5EA] space-y-2.5">
              <div className="flex items-center gap-2.5">
                <span className="w-7 h-7 rounded-full bg-[#FCE8EF] text-[#D94B7A] font-bold text-[13px] flex items-center justify-center shrink-0">
                  1
                </span>
                <h3 className="text-[16px] sm:text-[18px] font-bold text-[#35313A]">
                  面接だけでもOK
                </h3>
              </div>
              <p className="text-[15px] text-[#35313A] leading-relaxed">
                まずは仕事内容や待遇について話を聞くだけでも構いません。その場ですぐに入店を決める必要はなく、一度持ち帰って検討いただけます。
              </p>
            </div>

            <div className="p-5 sm:p-6 rounded-2xl bg-[#FFF9FB] border border-[#F0E5EA] space-y-2.5">
              <div className="flex items-center gap-2.5">
                <span className="w-7 h-7 rounded-full bg-[#FCE8EF] text-[#D94B7A] font-bold text-[13px] flex items-center justify-center shrink-0">
                  2
                </span>
                <h3 className="text-[16px] sm:text-[18px] font-bold text-[#35313A]">
                  私服で相談・見学
                </h3>
              </div>
              <p className="text-[15px] text-[#35313A] leading-relaxed">
                スーツや特別な準備は不要で、普段着のままお越しいただけます。服装や持ち物、実際の店舗の雰囲気も事前に確認できます。
              </p>
            </div>

            <div className="p-5 sm:p-6 rounded-2xl bg-[#FFF9FB] border border-[#F0E5EA] space-y-2.5">
              <div className="flex items-center gap-2.5">
                <span className="w-7 h-7 rounded-full bg-[#FCE8EF] text-[#D94B7A] font-bold text-[13px] flex items-center justify-center shrink-0">
                  3
                </span>
                <h3 className="text-[16px] sm:text-[18px] font-bold text-[#35313A]">
                  体験入店は本人の希望に合わせて
                </h3>
              </div>
              <p className="text-[15px] text-[#35313A] leading-relaxed">
                体験入店を希望する場合は、仕事内容・時間・報酬などの条件を事前にお伝えし、ご本人の同意を確認したうえで進めます。別日での予約も可能です。
              </p>
            </div>

            <div className="p-5 sm:p-6 rounded-2xl bg-[#FFF9FB] border border-[#F0E5EA] space-y-2.5">
              <div className="flex items-center gap-2.5">
                <span className="w-7 h-7 rounded-full bg-[#FCE8EF] text-[#D94B7A] font-bold text-[13px] flex items-center justify-center shrink-0">
                  4
                </span>
                <h3 className="text-[16px] sm:text-[18px] font-bold text-[#35313A]">
                  入店するかは自分で判断
                </h3>
              </div>
              <p className="text-[15px] text-[#35313A] leading-relaxed">
                面接や体験入店を終えたあと、今後どうするかはご自身で判断できます。合わないと感じた場合も、無理に引き止めることはありません。
              </p>
            </div>
          </div>

          {/* 3つの区分の違いを明確化（LLMO・納得判断向け） */}
          <div className="pt-4 border-t border-[#F0E5EA]">
            <h3 className="text-[16px] font-bold text-[#35313A] mb-3">
              「面接・相談のみ」「体験入店」「正式な入店」の違い
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-[#FFF9FB] border border-[#F0E5EA] space-y-1.5">
                <div className="text-[14px] font-bold text-[#D94B7A]">① 面接・相談のみ</div>
                <p className="text-[14px] text-[#35313A] leading-relaxed">
                  仕事内容・給与計算・シフトなどの説明を受け、希望すれば店舗や衣装を見学します。お話を聞いてそのまま帰宅できます。
                </p>
              </div>
              <div className="p-4 rounded-xl bg-[#FFF9FB] border border-[#F0E5EA] space-y-1.5">
                <div className="text-[14px] font-bold text-[#D94B7A]">② 体験入店（希望者のみ）</div>
                <p className="text-[14px] text-[#35313A] leading-relaxed">
                  年齢確認書類の提示と事前説明への同意後、実際に短時間のお試し勤務を行います。働いた分の報酬を受け取って終了です。
                </p>
              </div>
              <div className="p-4 rounded-xl bg-[#FFF9FB] border border-[#F0E5EA] space-y-1.5">
                <div className="text-[14px] font-bold text-[#D94B7A]">③ 正式な入店</div>
                <p className="text-[14px] text-[#35313A] leading-relaxed">
                  面接や体験入店の結果、ご自身が「働きたい」と納得された場合のみ希望シフトを相談してスタートします。
                </p>
              </div>
            </div>
          </div>
        </section>


        {/* =========================================================
            4. 応募から当日までの5ステップ
            PC：横方向ステップカード / スマホ：縦方向タイムライン
           ========================================================= */}
        <section id="five-steps" className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 lg:p-10 border border-[#F0E5EA] shadow-2xs scroll-mt-20 space-y-6">
          <div className="max-w-2xl space-y-2">
            <h2 className="text-[21px] sm:text-[24px] font-bold text-[#35313A] tracking-tight">
              応募から当日までの流れ
            </h2>
            <p className="text-[15px] text-[#35313A] leading-relaxed">
              LINEでのご相談から、面接・見学・体験入店までの流れをご紹介します。ご自身の希望に合わせてステップをお選びいただけます。
            </p>
          </div>

          {/* PC：5列横方向タイムライン / スマホ：縦方向タイムライン */}
          <div className="relative">
            {/* スマホ用縦線ライン */}
            <div className="lg:hidden absolute left-[19px] top-6 bottom-6 w-[2px] bg-[#FCE8EF]" aria-hidden="true" />

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-5 lg:gap-4">
              {FLOW_STEPS.map((step, idx) => (
                <div key={step.num} className="relative flex lg:flex-col gap-4 lg:gap-0">
                  {/* スマホ用左丸番号 */}
                  <div className="lg:hidden relative z-10 w-10 h-10 rounded-full bg-[#D94B7A] text-white font-bold text-[14px] flex items-center justify-center shrink-0 mt-1 shadow-2xs">
                    {idx + 1}
                  </div>

                  {/* ステップカード本体 */}
                  <div className="flex-1 p-4 sm:p-5 rounded-2xl bg-[#FFF9FB] border border-[#F0E5EA] flex flex-col justify-between space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[13px] font-bold text-[#D94B7A] tabular-nums">
                          STEP {idx + 1}
                        </span>
                        <div className="w-8 h-8 rounded-xl bg-[#FCE8EF] text-[#D94B7A] flex items-center justify-center shrink-0">
                          <LucideIcon name={step.icon} size={16} />
                        </div>
                      </div>

                      <h3 className="text-[16px] sm:text-[17px] font-bold text-[#35313A] leading-snug">
                        {step.title}
                      </h3>

                      <p className="text-[14px] text-[#35313A] leading-relaxed">
                        {step.desc}
                      </p>
                    </div>

                    <ul className="pt-3 border-t border-[#F0E5EA] space-y-1.5 text-[13px] sm:text-[14px] text-[#85818A]">
                      {step.items.map((item, iIdx) => (
                        <li key={iIdx} className="flex items-start gap-1.5">
                          <LucideIcon name="Check" size={14} className="text-[#D94B7A] shrink-0 mt-1" />
                          <span className="text-[#35313A]">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 手続きと支払い条件の正確な補足 */}
          <div className="p-4 sm:p-5 rounded-2xl bg-[#FFF9FB] border border-[#F0E5EA] text-[13px] sm:text-[14px] text-[#35313A] leading-relaxed">
            <span className="font-bold text-[#D94B7A] block mb-1">
              当日体験・報酬受け取りに関する確認事項
            </span>
            体験入店を希望される場合は、事前説明と満20歳以上の年齢確認（公的身分証明書の原本確認）を行ってから開始します。報酬は実際に接客したコース売上（基本50%バック・雑費天引きなし）に応じて計算され、勤務終了後に明細を確認のうえ現金でお渡しします。
          </div>
        </section>


        {/* =========================================================
            5. 新規追加「面接ではどんなことを確認するの？」
           ========================================================= */}
        <section id="interview-details" className="space-y-6 scroll-mt-20">
          <div className="max-w-2xl space-y-2">
            <h2 className="text-[21px] sm:text-[24px] font-bold text-[#35313A] tracking-tight">
              面接ではどんなことを確認するの？
            </h2>
            <p className="text-[15px] sm:text-[16px] text-[#35313A] leading-relaxed">
              面接では、仕事内容や働き方について説明し、お互いに条件を確認します。分からないことや不安なことも遠慮なくご相談ください。
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <div className="bg-white p-5 sm:p-6 rounded-2xl border border-[#F0E5EA] shadow-2xs space-y-2.5">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-[#FCE8EF] text-[#D94B7A] flex items-center justify-center shrink-0">
                  <LucideIcon name="Calendar" size={18} />
                </div>
                <h3 className="text-[16px] sm:text-[18px] font-bold text-[#35313A]">
                  1. 希望する働き方
                </h3>
              </div>
              <p className="text-[15px] text-[#35313A] leading-relaxed">
                週に何日くらい働きたいか、昼間（10〜17時等）と夕方以降（17〜24時等）のどちらが希望か、短期か長期かなど、ご自身のライフスタイルに合う条件を相談します。
              </p>
            </div>

            <div className="bg-white p-5 sm:p-6 rounded-2xl border border-[#F0E5EA] shadow-2xs space-y-2.5">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-[#FCE8EF] text-[#D94B7A] flex items-center justify-center shrink-0">
                  <LucideIcon name="Coins" size={18} />
                </div>
                <h3 className="text-[16px] sm:text-[18px] font-bold text-[#35313A]">
                  2. 給与・待遇
                </h3>
              </div>
              <p className="text-[15px] text-[#35313A] leading-relaxed">
                コースごとの料金と売上50%バックの計算方法、体験入店と通常勤務での支払いタイミング、雑費・天引きがないこと、衣装貸出や寮・交通費などの待遇を確認します。
              </p>
            </div>

            <div className="bg-white p-5 sm:p-6 rounded-2xl border border-[#F0E5EA] shadow-2xs space-y-2.5">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-[#FCE8EF] text-[#D94B7A] flex items-center justify-center shrink-0">
                  <LucideIcon name="BookOpen" size={18} />
                </div>
                <h3 className="text-[16px] sm:text-[18px] font-bold text-[#35313A]">
                  3. 仕事内容
                </h3>
              </div>
              <p className="text-[15px] text-[#35313A] leading-relaxed">
                玄関先での待機から個室での接客の流れ、仲居さんのサポート内容、飲酒が不要であることや連絡先交換の禁止ルールなど、実際の業務と準備事項を丁寧にご説明します。
              </p>
            </div>

            <div className="bg-white p-5 sm:p-6 rounded-2xl border border-[#F0E5EA] shadow-2xs space-y-2.5">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-[#FCE8EF] text-[#D94B7A] flex items-center justify-center shrink-0">
                  <LucideIcon name="ShieldCheck" size={18} />
                </div>
                <h3 className="text-[16px] sm:text-[18px] font-bold text-[#35313A]">
                  4. 不安や疑問
                </h3>
              </div>
              <p className="text-[15px] text-[#35313A] leading-relaxed">
                未経験で気になる点や、家族・職場に知られないためのプライバシー対策（写真非公開・税金手続き等）、体調面の相談など、不安に思っていることを何でもご質問いただけます。
              </p>
            </div>
          </div>
        </section>


        {/* =========================================================
            6. 新規追加「面接当日の服装・持ち物について」
           ========================================================= */}
        <section id="belongings" className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 lg:p-10 border border-[#F0E5EA] shadow-2xs scroll-mt-20 space-y-6">
          <div className="max-w-2xl space-y-2">
            <h2 className="text-[21px] sm:text-[24px] font-bold text-[#35313A] tracking-tight">
              面接当日の服装・持ち物について
            </h2>
            <p className="text-[15px] sm:text-[16px] text-[#35313A] leading-relaxed">
              初めての面接で迷わないように、服装や必要な持ち物について事前にご案内します。履歴書は不要ですが、年齢確認のための公的書類は法令上必要となります。
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <div className="p-5 sm:p-6 rounded-2xl bg-[#FFF9FB] border border-[#F0E5EA] space-y-2.5">
              <div className="flex items-center gap-2 text-[14px] font-bold text-[#D94B7A]">
                <LucideIcon name="Shirt" size={16} />
                <span>服装について</span>
              </div>
              <h3 className="text-[16px] sm:text-[18px] font-bold text-[#35313A]">
                普段通りの私服でOK（スーツ不要）
              </h3>
              <p className="text-[15px] text-[#35313A] leading-relaxed">
                ワンピースやパンツスタイル、スニーカーなど、リラックスできる私服でお越しください。店舗の衣装（着物・ドレス等）や靴はすべて無料で貸し出しているため、仕事用の服を買い揃える必要はありません。
              </p>
            </div>

            <div className="p-5 sm:p-6 rounded-2xl bg-[#FFF9FB] border border-[#F0E5EA] space-y-2.5">
              <div className="flex items-center gap-2 text-[14px] font-bold text-[#D94B7A]">
                <LucideIcon name="IdCard" size={16} />
                <span>身分証明書などの必要書類</span>
              </div>
              <h3 className="text-[16px] sm:text-[18px] font-bold text-[#35313A]">
                履歴書は不要・年齢確認できる公的身分証が必要
              </h3>
              <p className="text-[15px] text-[#35313A] leading-relaxed">
                履歴書・職務経歴書は不要です。ただし、法令および組合規約により満20歳以上であることの確認が義務付けられているため、体験・勤務にあたっては<strong>顔写真と生年月日が確認できる公的身分証明書（運転免許証・マイナンバーカード・パスポート等の原本）</strong>が必要です。
              </p>
            </div>

            <div className="p-5 sm:p-6 rounded-2xl bg-[#FFF9FB] border border-[#F0E5EA] space-y-2.5">
              <div className="flex items-center gap-2 text-[14px] font-bold text-[#D94B7A]">
                <LucideIcon name="ShoppingBag" size={16} />
                <span>その他必要な持ち物</span>
              </div>
              <h3 className="text-[16px] sm:text-[18px] font-bold text-[#35313A]">
                スマホ・普段のメイク直しポーチ程度
              </h3>
              <p className="text-[15px] text-[#35313A] leading-relaxed">
                待ち合わせ連絡用のスマートフォンと、ハンカチや普段使っているメイク直し用ポーチがあれば十分です。ヘアアイロンや基本的なアメニティ類は店舗にも備え付けてあります。
              </p>
            </div>

            <div className="p-5 sm:p-6 rounded-2xl bg-[#FFF9FB] border border-[#F0E5EA] space-y-2.5">
              <div className="flex items-center gap-2 text-[14px] font-bold text-[#D94B7A]">
                <LucideIcon name="AlertCircle" size={16} />
                <span>事前に確認しておきたいこと</span>
              </div>
              <h3 className="text-[16px] sm:text-[18px] font-bold text-[#35313A]">
                当日の予定・身分証の種類を事前確認
              </h3>
              <p className="text-[15px] text-[#35313A] leading-relaxed">
                「20歳未満ではないか」「有効期限内の身分証があるか」「面接と見学だけにするか体験も希望するか」を事前に確認しておくとスムーズです。お持ちの書類が対象になるか不明な場合は、事前にLINEでお尋ねください。
              </p>
            </div>
          </div>
        </section>


        {/* =========================================================
            7. 新規追加「体験入店の内容について」+ 給与・支払い条件の明確化
           ========================================================= */}
        <section id="trial-details" className="space-y-6 scroll-mt-20">
          <div className="max-w-2xl space-y-2">
            <h2 className="text-[21px] sm:text-[24px] font-bold text-[#35313A] tracking-tight">
              体験入店の内容について
            </h2>
            <p className="text-[15px] sm:text-[16px] text-[#35313A] leading-relaxed">
              実際の仕事内容や環境を確認したい方に向けて、体験入店について事前にご説明します。体験中に行う仕事内容や勤務条件は、必ず事前に説明し、ご本人の同意を確認したうえで進めます。
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <div className="bg-white p-5 sm:p-6 rounded-2xl border border-[#F0E5EA] shadow-2xs space-y-2.5">
              <span className="text-[13px] font-bold text-[#D94B7A] block">1. 体験前の説明</span>
              <h3 className="text-[16px] sm:text-[18px] font-bold text-[#35313A]">
                仕事内容・報酬・勤務条件の事前合意
              </h3>
              <p className="text-[15px] text-[#35313A] leading-relaxed">
                体験入店を始める前に、具体的な仕事内容、報酬の計算方法（売上50%バック）、体験する時間帯や終了予定時刻、禁止事項を確認します。納得し同意したうえで進めます。
              </p>
            </div>

            <div className="bg-white p-5 sm:p-6 rounded-2xl border border-[#F0E5EA] shadow-2xs space-y-2.5">
              <span className="text-[13px] font-bold text-[#D94B7A] block">2. 接客内容の確認</span>
              <h3 className="text-[16px] sm:text-[18px] font-bold text-[#35313A]">
                玄関での待機と個室接客の手順説明
              </h3>
              <p className="text-[15px] text-[#35313A] leading-relaxed">
                衣装に着替えた後、玄関の上がり框での待機姿勢や、2階個室へご案内してからの接客手順、衛生面の準備（アルコール清拭等）を口頭で丁寧にご説明します。
              </p>
            </div>

            <div className="bg-white p-5 sm:p-6 rounded-2xl border border-[#F0E5EA] shadow-2xs space-y-2.5">
              <span className="text-[13px] font-bold text-[#D94B7A] block">3. スタッフのサポート</span>
              <h3 className="text-[16px] sm:text-[18px] font-bold text-[#35313A]">
                仲居さん・担当スタッフへの相談体制
              </h3>
              <p className="text-[15px] text-[#35313A] leading-relaxed">
                玄関でのお客様への声掛けや料金案内は隣の仲居さんが担当します。体験中に分からないことや体調面の不安が出た場合も、その場ですぐ担当スタッフや仲居さんに相談できます。
              </p>
            </div>

            <div className="bg-white p-5 sm:p-6 rounded-2xl border border-[#F0E5EA] shadow-2xs space-y-2.5">
              <span className="text-[13px] font-bold text-[#D94B7A] block">4. 体験終了後</span>
              <h3 className="text-[16px] sm:text-[18px] font-bold text-[#35313A]">
                報酬の確認・受け取りと入店の判断
              </h3>
              <p className="text-[15px] text-[#35313A] leading-relaxed">
                体験が終わったら着替えて、当日の勤務内容と報酬額を一緒に確認して受け取ります。その後、正式に入店するか一度考えてから返事をするかはご本人が判断します。
              </p>
            </div>
          </div>

          {/* 体験入店・通常勤務の給与と支払い条件（#14遵守） */}
          <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-7 border border-[#F0E5EA] shadow-2xs space-y-4">
            <h3 className="text-[16px] sm:text-[18px] font-bold text-[#35313A]">
              報酬・支払い条件の詳細確認（体験入店と通常勤務）
            </h3>
            <div className="overflow-x-auto rounded-xl border border-[#F0E5EA]">
              <table className="w-full text-[14px] text-left border-collapse">
                <thead className="bg-[#FCE8EF] text-[#35313A] font-bold">
                  <tr>
                    <th className="p-3.5 border-b border-[#F0E5EA] whitespace-nowrap">確認項目</th>
                    <th className="p-3.5 border-b border-[#F0E5EA]">体験入店の場合</th>
                    <th className="p-3.5 border-b border-[#F0E5EA]">通常勤務（入店後）の場合</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F0E5EA] bg-white text-[#35313A]">
                  <tr>
                    <td className="p-3.5 font-bold whitespace-nowrap bg-[#FFF9FB]">支給割合・対象金額</td>
                    <td className="p-3.5">実稼働したコース売上の50%（基本15分 5,000円〜）</td>
                    <td className="p-3.5">実稼働したコース売上の50%（基本15分 5,000円〜）</td>
                  </tr>
                  <tr>
                    <td className="p-3.5 font-bold whitespace-nowrap bg-[#FFF9FB]">控除・雑費の有無</td>
                    <td className="p-3.5">天引き・雑費・衣装レンタル料なし（0円）</td>
                    <td className="p-3.5">待機料・厚生費・衣装代などの天引きなし（0円）</td>
                  </tr>
                  <tr>
                    <td className="p-3.5 font-bold whitespace-nowrap bg-[#FFF9FB]">支給時期・支払い方法</td>
                    <td className="p-3.5">体験終了後、勤務内容を確認のうえ現金でお渡し</td>
                    <td className="p-3.5">各日の勤務終了後、精算明細確認のうえ現金手渡し</td>
                  </tr>
                  <tr>
                    <td className="p-3.5 font-bold whitespace-nowrap bg-[#FFF9FB]">見送った場合の扱い</td>
                    <td className="p-3.5">入店を見送っても稼いだ分の報酬は全額支給（費用請求なし）</td>
                    <td className="p-3.5">退店・シフト休止に伴う違約金や罰金は一切なし</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-[13px] text-[#85818A] leading-relaxed">
              ※固定の時給制や日給保証制ではなく、実際にご案内したお客様の数・コースに応じた完全歩合（売上50%バック）です。お客様のご案内がない時間帯は報酬が発生しない点も含め、面接時にわかりやすくご説明します。
            </p>
          </div>
        </section>


        {/* =========================================================
            8. 体験後の判断について（左右2カード）
           ========================================================= */}
        <section id="after-trial" className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 lg:p-10 border border-[#F0E5EA] shadow-2xs scroll-mt-20 space-y-6">
          <div className="max-w-3xl space-y-3">
            <h2 className="text-[21px] sm:text-[24px] font-bold text-[#35313A] tracking-tight">
              体験した後はどうなるの？
            </h2>
            <p className="text-[15px] sm:text-[16px] text-[#35313A] leading-relaxed">
              体験入店後は、実際に働いてみた感想や仕事内容について確認します。自分に合うかどうかを考えたうえで、今後の働き方を判断できます。無理に入店を決める必要はありません。分からないことがあれば、担当スタッフにご相談ください。
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {/* 左カード：入店を希望する場合 */}
            <div className="p-5 sm:p-6 rounded-2xl bg-[#FFF9FB] border border-[#F0E5EA] space-y-3 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="inline-flex items-center gap-2 text-[14px] font-bold text-[#D94B7A] bg-[#FCE8EF] px-3 py-1 rounded-full">
                  <LucideIcon name="CheckCircle2" size={15} />
                  <span>入店を希望する場合</span>
                </div>
                <h3 className="text-[16px] sm:text-[18px] font-bold text-[#35313A]">
                  自分のペースでシフトや通い方を相談
                </h3>
                <p className="text-[15px] text-[#35313A] leading-relaxed">
                  「ここで働いてみたい」と感じていただけた場合は、今後の出勤希望日や時間帯（週1日・短時間・昼間など）、寮や交通費の希望を相談のうえ、ご自身の都合の良い日からスタートできます。
                </p>
              </div>
              <div className="pt-3 border-t border-[#F0E5EA] text-[13px] text-[#85818A]">
                ※体験当日はすぐ決めず、自宅に帰ってからLINEで「入店を希望します」とお返事いただく形でも大丈夫です。
              </div>
            </div>

            {/* 右カード：今回は見送る場合 */}
            <div className="p-5 sm:p-6 rounded-2xl bg-[#FFF9FB] border border-[#F0E5EA] space-y-3 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="inline-flex items-center gap-2 text-[14px] font-bold text-[#35313A] bg-white border border-[#F0E5EA] px-3 py-1 rounded-full">
                  <LucideIcon name="Coffee" size={15} className="text-[#85818A]" />
                  <span>今回は見送る場合</span>
                </div>
                <h3 className="text-[16px] sm:text-[18px] font-bold text-[#35313A]">
                  遠慮なくお伝えください・費用は一切かかりません
                </h3>
                <p className="text-[15px] text-[#35313A] leading-relaxed">
                  「イメージと違った」「他の仕事と比較して考えたい」という場合は、遠慮なくお断りいただいて問題ありません。お断りによる違約金やキャンセル料、衣装レンタル代などの費用請求は一切なく、当日働いた分の報酬もそのままお受け取りいただけます。
                </p>
              </div>
              <div className="pt-3 border-t border-[#F0E5EA] text-[13px] text-[#85818A]">
                ※別の通りや雰囲気の違う店舗を見学したい場合の相談も可能です。しつこい連絡や引き止めは行いません。
              </div>
            </div>
          </div>
        </section>


        {/* =========================================================
            12. 画像・素材ガイド（環境イメージ・説明用素材）
           ========================================================= */}
        <section className="space-y-5">
          <div className="max-w-2xl space-y-1.5">
            <h2 className="text-[21px] sm:text-[24px] font-bold text-[#35313A] tracking-tight">
              相談環境・店内のイメージ
            </h2>
            <p className="text-[14px] text-[#85818A] leading-relaxed">
              当日の雰囲気がイメージしやすいよう、相談空間やサポート体制のイメージ素材を掲載しています（※実店舗の写真ではなく、雰囲気をお伝えするためのイメージ・説明用イラストです）。
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white rounded-2xl border border-[#F0E5EA] overflow-hidden shadow-2xs flex flex-col">
              <div className="aspect-[4/3] overflow-hidden bg-[#FFF9FB]">
                <img
                  src="/images/tobita_interview_flow_1792405357895.jpg"
                  alt="面接・相談場所のイメージ"
                  className="w-full h-full object-cover"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="p-4 space-y-1 flex-1">
                <h3 className="text-[15px] font-bold text-[#35313A]">1. 面接・相談スペース</h3>
                <p className="text-[13px] text-[#85818A] leading-relaxed">
                  明るく落ち着いて話せるカフェや相談室で、リラックスしてお話しします。（※イメージ画像）
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-[#F0E5EA] overflow-hidden shadow-2xs flex flex-col">
              <div className="aspect-[4/3] overflow-hidden bg-[#FFF9FB]">
                <img
                  src="/images/tobita_beginner_support_1788153037569.jpg"
                  alt="女性スタッフによる相談サポートのイメージ"
                  className="w-full h-full object-cover"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="p-4 space-y-1 flex-1">
                <h3 className="text-[15px] font-bold text-[#35313A]">2. 女性スタッフの対応</h3>
                <p className="text-[13px] text-[#85818A] leading-relaxed">
                  女性スタッフが条件や疑問を丁寧にご説明し、不安に寄り添います。（※イメージ画像）
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-[#F0E5EA] overflow-hidden shadow-2xs flex flex-col">
              <div className="aspect-[4/3] overflow-hidden bg-[#FFF9FB]">
                <img
                  src="/images/tobita_job_guide_tea_1788153000519.jpg"
                  alt="店内の落ち着いた和室雰囲気イメージ"
                  className="w-full h-full object-cover"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="p-4 space-y-1 flex-1">
                <h3 className="text-[15px] font-bold text-[#35313A]">3. 店内の和室雰囲気</h3>
                <p className="text-[13px] text-[#85818A] leading-relaxed">
                  清掃の行き届いた清潔な和室空間で、落ち着いてお仕事できます。（※イメージ画像）
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-[#F0E5EA] overflow-hidden shadow-2xs flex flex-col">
              <div className="aspect-[4/3] overflow-hidden bg-[#FFF9FB]">
                <img
                  src="/images/col_kimono_makeup_1783677929197.jpg"
                  alt="衣装やメイクスペースの説明用イラスト"
                  className="w-full h-full object-cover"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="p-4 space-y-1 flex-1">
                <h3 className="text-[15px] font-bold text-[#35313A]">4. 衣装・準備スペース</h3>
                <p className="text-[13px] text-[#85818A] leading-relaxed">
                  着物やドレス、鏡・コスメ備品などをご用意しています。（※説明用イラスト）
                </p>
              </div>
            </div>
          </div>
        </section>


        {/* =========================================================
            9. コラムの改善（3つのコラムカード・高さ統一）
           ========================================================= */}
        <section id="columns" className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 lg:p-10 border border-[#F0E5EA] shadow-2xs scroll-mt-20 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-1.5">
              <h2 className="text-[21px] sm:text-[24px] font-bold text-[#35313A] tracking-tight">
                面接・体験入店の前に読んでおきたい記事
              </h2>
              <p className="text-[14px] text-[#85818A] leading-relaxed">
                当日の服装、持ち物、体験入店の詳しい手順を解説した関連コラムです。
              </p>
            </div>

            {onNavigateBlog && (
              <a
                href="/blog"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigateBlog();
                }}
                className="text-[14px] font-bold text-[#D94B7A] hover:underline flex items-center gap-1 cursor-pointer self-start sm:self-auto shrink-0"
              >
                <span>コラム一覧を見る</span>
                <LucideIcon name="ChevronRight" size={15} />
              </a>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-stretch">
            {FEATURED_FLOW_ARTICLES.map((article) => (
              <a
                key={article.slug}
                href={`/blog/${article.slug}`}
                onClick={(e) => {
                  e.preventDefault();
                  onNavigateBlog && onNavigateBlog(article.slug);
                }}
                className="text-left bg-[#FFF9FB] rounded-2xl border border-[#F0E5EA] hover:border-[#D94B7A]/50 transition-all cursor-pointer group flex flex-col justify-between p-5 h-full"
              >
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-[13px] text-[#85818A]">
                    <span className="font-bold text-[#D94B7A]">{article.categoryLabel}</span>
                    <span aria-hidden="true">·</span>
                    <span>{article.readTime}</span>
                  </div>
                  <h3 className="text-[16px] font-bold text-[#35313A] leading-snug group-hover:text-[#D94B7A] transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-[14px] text-[#85818A] leading-relaxed">
                    {article.summary}
                  </p>
                </div>
                <div className="pt-4 mt-4 border-t border-[#F0E5EA] flex items-center text-[14px] font-bold text-[#D94B7A] gap-1 group-hover:underline">
                  <span>記事を読む</span>
                  <LucideIcon name="ChevronRight" size={15} />
                </div>
              </a>
            ))}
          </div>
        </section>


        {/* =========================================================
            10. FAQを大幅改善（優先16問・1つずつ開くアコーディオン）
           ========================================================= */}
        <section id="flow-faq" className="space-y-6 scroll-mt-20">
          <div className="max-w-2xl space-y-2">
            <h2 className="text-[21px] sm:text-[24px] font-bold text-[#35313A] tracking-tight">
              面接・体験入店についてよくある質問
            </h2>
            <p className="text-[14px] text-[#85818A] leading-relaxed">
              気になる質問をタップすると回答が開きます。必要な項目だけを選んで確認いただけます。
            </p>
          </div>

          <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-7 border border-[#F0E5EA] shadow-2xs divide-y divide-[#F0E5EA]">
            {FLOW_FAQS.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div key={idx} className="py-3.5 first:pt-0 last:pb-0">
                  <button
                    type="button"
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    aria-expanded={isOpen}
                    className="w-full text-left flex items-start justify-between gap-4 py-1.5 text-[15px] sm:text-[16px] font-bold text-[#35313A] hover:text-[#D94B7A] cursor-pointer transition-colors"
                  >
                    <span className="flex items-start gap-2.5">
                      <span className="text-[#D94B7A] font-bold shrink-0">Q.</span>
                      <span>{faq.q}</span>
                    </span>
                    <LucideIcon
                      name={isOpen ? 'ChevronUp' : 'ChevronDown'}
                      size={18}
                      className="text-[#85818A] shrink-0 mt-1"
                    />
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="pt-2.5 pb-1 pl-6 sm:pl-7 pr-1 text-[14px] sm:text-[15px] text-[#35313A] leading-relaxed">
                          <div className="p-4 rounded-xl bg-[#FFF9FB] border border-[#F0E5EA]">
                            <p>{faq.a}</p>
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
            <div className="text-center pt-1">
              <a
                href="/faq"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigateFaq();
                }}
                className="text-[14px] font-bold text-[#D94B7A] hover:underline inline-flex items-center gap-1 cursor-pointer"
              >
                <span>よくある質問一覧（全119問）を見る</span>
                <LucideIcon name="ChevronRight" size={15} />
              </a>
            </div>
          )}
        </section>


        {/* =========================================================
            11. 最終LINE相談エリア
           ========================================================= */}
        <section id="line-cta" className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-10 border border-[#F0E5EA] shadow-2xs text-center space-y-5 scroll-mt-20">
          <div className="w-12 h-12 rounded-2xl bg-[#06C755]/15 text-[#06C755] flex items-center justify-center mx-auto">
            <LucideIcon name="MessageCircle" size={24} />
          </div>

          <div className="max-w-xl mx-auto space-y-3">
            <h2 className="text-[21px] sm:text-[24px] font-bold text-[#35313A] tracking-tight">
              面接・体験入店について、気になることはありませんか？
            </h2>
            <p className="text-[15px] sm:text-[16px] text-[#35313A] leading-relaxed">
              面接に行く前に確認しておきたいことや、体験入店についての疑問など、どんなことでもお気軽にご相談ください。
            </p>
            <p className="text-[15px] text-[#85818A] leading-relaxed">
              まだ応募を決めていない方も、質問だけで大丈夫です。<br />
              自分に合うかどうか、まずは話を聞いてから考えてみませんか？
            </p>
          </div>

          <div className="pt-2 flex flex-col items-center gap-3">
            <a
              href={LINE_OFFICIAL_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => {
                e.preventDefault();
                handleLineClick('【面接・体験入店ページより】面接前に少し質問・相談したいことがあります。');
              }}
              className="w-full sm:w-auto sm:min-w-[300px] px-8 py-4 rounded-full bg-[#06C755] hover:bg-[#05b34c] text-white font-bold text-[16px] shadow-sm transition-colors cursor-pointer flex items-center justify-center gap-2.5 min-h-[54px]"
            >
              <LucideIcon name="MessageCircle" size={20} className="fill-white text-white shrink-0" />
              <span>LINEで質問・相談する</span>
            </a>
            <span className="text-[14px] font-bold text-[#D94B7A]">
              応募前の質問だけでもOK
            </span>
          </div>
        </section>


        {/* =========================================================
            13. 関連ページへの自然な内部リンク
           ========================================================= */}
        <section className="pt-4 border-t border-[#F0E5EA]">
          <h3 className="text-[13px] font-bold text-[#85818A] mb-3 text-center">
            あわせて確認しておきたいページ
          </h3>
          <div className="flex flex-wrap items-center justify-center gap-2.5 text-[14px]">
            {onNavigateTopic && (
              <>
                <a
                  href="/beginner"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigateTopic('beginner');
                  }}
                  className="px-4 py-2 rounded-full bg-white hover:bg-[#FCE8EF] hover:text-[#D94B7A] border border-[#F0E5EA] transition-colors cursor-pointer whitespace-nowrap"
                >
                  未経験者向けページ
                </a>
                <a
                  href="/salary"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigateTopic('salary');
                  }}
                  className="px-4 py-2 rounded-full bg-white hover:bg-[#FCE8EF] hover:text-[#D94B7A] border border-[#F0E5EA] transition-colors cursor-pointer whitespace-nowrap"
                >
                  給料ページ
                </a>
                <a
                  href="/salary"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigateTopic('benefits');
                  }}
                  className="px-4 py-2 rounded-full bg-white hover:bg-[#FCE8EF] hover:text-[#D94B7A] border border-[#F0E5EA] transition-colors cursor-pointer whitespace-nowrap"
                >
                  待遇ページ
                </a>
                <a
                  href="/job"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigateTopic('job');
                  }}
                  className="px-4 py-2 rounded-full bg-white hover:bg-[#FCE8EF] hover:text-[#D94B7A] border border-[#F0E5EA] transition-colors cursor-pointer whitespace-nowrap"
                >
                  仕事内容ページ
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
                className="px-4 py-2 rounded-full bg-white hover:bg-[#FCE8EF] hover:text-[#D94B7A] border border-[#F0E5EA] transition-colors cursor-pointer whitespace-nowrap"
              >
                よくある質問
              </a>
            )}
            <a
              href="#line-cta"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('line-cta');
              }}
              className="px-4 py-2 rounded-full bg-white hover:bg-[#FCE8EF] hover:text-[#D94B7A] border border-[#F0E5EA] transition-colors cursor-pointer whitespace-nowrap"
            >
              応募方法・相談窓口
            </a>
          </div>
        </section>

      </div>
    </div>
  );
}

// 5ステップデータ
const FLOW_STEPS = [
  {
    num: 1,
    icon: 'MessageCircle',
    title: 'LINEで質問・相談',
    desc: 'LINEから「相談したい」「面接希望」「店舗を見学したい」など、ご希望をお送りください。分からないことは事前に質問できます。',
    items: [
      '相談だけでもOK',
      '希望日時を相談',
      '気になることを事前に質問'
    ]
  },
  {
    num: 2,
    icon: 'Users',
    title: '待ち合わせ・面接',
    desc: '担当スタッフと待ち合わせし、仕事内容・給与・待遇・勤務条件などについて説明を受けます。',
    items: [
      '面接場所の確認',
      '仕事内容の説明',
      '給与・待遇の確認'
    ]
  },
  {
    num: 3,
    icon: 'Store',
    title: '店舗見学・衣装選び',
    desc: '希望される場合は、実際の店舗や設備を確認し、衣装などについても説明を受けられます。',
    items: [
      '店舗・設備の確認',
      '衣装の説明',
      '必要な持ち物の確認'
    ]
  },
  {
    num: 4,
    icon: 'Sparkles',
    title: '希望する場合は体験入店',
    desc: '体験入店を希望される場合は、仕事内容・条件・時間・報酬を事前に確認し、本人の意思を確認したうえで進めます。',
    items: [
      '仕事内容の確認',
      '条件の確認',
      'スタッフによるサポート'
    ]
  },
  {
    num: 5,
    icon: 'Coins',
    title: '体験終了・報酬の受け取り',
    desc: '体験終了後、実際の勤務内容と報酬を確認します。その後、正式に入店するかどうかはご自身で判断できます。',
    items: [
      '勤務内容の確認',
      '報酬の計算・受け取り',
      '今後の働き方について相談'
    ]
  }
];

// コラム記事データ
const FEATURED_FLOW_ARTICLES = [
  {
    categoryLabel: '応募・面接',
    readTime: '3分で読める',
    slug: 'tobitashinchi-interview-guide',
    title: '【飛田新地・面接ガイド】面接の服装は？持ち物は？採用担当者がチェックする3つのポイント',
    summary: '面接へ行く前の準備、当日の服装、必要な本人確認書類から、担当者が確認しているポイントまで分かりやすく解説します。'
  },
  {
    categoryLabel: '体験入店',
    readTime: '3分で読める',
    slug: 'tobitashinchi-trial-guide',
    title: '【飛田新地・体験入店の手順】まずは1日だけお試し！体験入店の流れと確認事項',
    summary: '当日の持ち物、報酬の受け取り方法、実際の仕事内容や終了後の判断まで、体験入店のステップを整理しました。'
  },
  {
    categoryLabel: '持ち物・準備',
    readTime: '4分で読める',
    slug: 'tobitashinchi-no-resume-quick-trial',
    title: '【履歴書不要の面接】持ち物はスマホと身分証だけ！当日の準備チェック',
    summary: '履歴書の準備が不要な理由と、年齢確認のために必要な公的身分証明書の種類について詳しくご案内します。'
  }
];

// 優先16問のFAQ（結論ファースト＆正確性重視）
const FLOW_FAQS = [
  {
    q: '面接だけでも大丈夫ですか？',
    a: 'はい、面接とお話だけでも全く問題ありません。仕事内容や給与、働き方の説明を聞いたうえで一度持ち帰り、働くかどうかをじっくり考えていただけます。'
  },
  {
    q: '履歴書は必要ですか？',
    a: '履歴書は不要です。ただし、法令および組合規約に基づき満20歳以上の年齢確認を行うため、体験入店や勤務を開始する際は公的身分証明書の原本が必要になります。'
  },
  {
    q: '私服で面接に行っても大丈夫ですか？',
    a: 'はい、普段通りの私服でお越しください。スーツを着る必要はなく、パンツスタイルやスニーカーでも問題ありません。仕事用の衣装は店舗で無料貸出しています。'
  },
  {
    q: '面接当日に体験入店できますか？',
    a: 'はい、ご本人が希望され、年齢確認ができる公的身分証明書の原本をお持ちの場合は、面接当日にそのまま体験入店へ進むことも可能です。'
  },
  {
    q: '面接と体験入店を別の日にできますか？',
    a: 'はい、可能です。初日は面接と店舗見学だけ行い、一度家で検討してから別日に体験入店を予約する方も多くいらっしゃいます。'
  },
  {
    q: '面接ではどんなことを聞かれますか？',
    a: '希望する出勤日数や時間帯（昼・夜など）、気になる待遇や不安なことなどを伺います。テストや厳しい質問などはなく、条件をすり合わせる面談形式です。'
  },
  {
    q: '当日は何を持っていけばいいですか？',
    a: '待ち合わせ連絡用のスマートフォンと、体験・勤務を希望される場合は顔写真と生年月日が確認できる公的身分証明書（運転免許証・マイナンバーカード・パスポート等の原本）をお持ちください。'
  },
  {
    q: '店舗見学だけでも可能ですか？',
    a: 'はい、可能です。働く前に控室やお店の雰囲気、用意されている衣装などを実際に確認してから検討していただけます。'
  },
  {
    q: '体験入店では何をしますか？',
    a: '最初に仕事内容・時間・報酬条件を事前確認して同意いただいた後、衣装に着替えて仲居さんのサポートを受けながら玄関待機や短時間の接客を体験します。'
  },
  {
    q: '体験入店を途中でやめることはできますか？',
    a: 'はい、体調がすぐれない場合やどうしても続けるのが難しい場合は、我慢せず担当スタッフや仲居さんへお声掛けください。状況を確認して終了できるよう対応します。'
  },
  {
    q: '体験後に入店しなくても大丈夫ですか？',
    a: 'はい、入店しなくても大丈夫です。体験入店は自分に合うかを確かめるための機会ですので、合わないと感じた場合はその旨をお伝えいただければ終了となります。'
  },
  {
    q: '体験入店の報酬はいつ受け取れますか？',
    a: '体験入店終了後、当日の勤務内容と売上50%バックの計算結果を確認したうえで、その場で現金でお渡ししています。天引きや手数料はかかりません。'
  },
  {
    q: '面接や体験に費用はかかりますか？',
    a: '費用は一切かかりません。面接料、衣装のレンタル料、見学料、また体験後に入店を見送った場合のキャンセル料・違約金などはすべて0円です。'
  },
  {
    q: '友人と一緒に相談できますか？',
    a: 'はい、お友達同士での相談や面接予約も歓迎しています。事前にお二人での参加をご希望の旨をLINEでお知らせください。'
  },
  {
    q: '身バレが心配なのですが、相談できますか？',
    a: 'はい、お気軽にご相談ください。ネット上での顔写真非公開や源氏名での勤務、会社員向けの住民税の普通徴収手続きなど、具体的な対策を面接時にもご案内しています。'
  },
  {
    q: '面接前にLINEで質問できますか？',
    a: 'はい、応募や予約を決める前の段階でも、LINEからいつでも質問していただけます。「話だけ聞きたい」というメッセージも歓迎しています。'
  }
];
