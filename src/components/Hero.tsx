/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { LINE_OFFICIAL_URL } from '../data';
import LucideIcon from './LucideIcon';
import { SiteContent } from '../siteContent';
import { HERO_IMAGE_WEBP_URL } from '../featuredArticles';

interface HeroProps {
  content?: SiteContent['hero'];
  onCtaclick: () => void;
  onScrollToSalaryOrJob?: () => void;
  onBlogClick?: () => void;
  onArticleClick?: (slug: string) => void;
}

const HERO_IMAGE_JPG = '/images/home_hero_ryotei_1795337037663.jpg';

const CONDITION_HIGHLIGHTS = [
  { label: '報酬システム', value: '売上50%バック', icon: 'Sparkles' },
  { label: 'お支払い', value: '即日全額現金日払い', icon: 'Banknote' },
  { label: '勤務時間', value: '10:00〜24:00', icon: 'Clock' },
  { label: 'シフト頻度', value: '週1日から相談可能', icon: 'Calendar' },
  { label: '応募資格', value: '満20歳以上', icon: 'ShieldCheck' },
  { label: '応募経験', value: '未経験者歓迎', icon: 'Sparkles' },
];

export default function Hero({ content, onScrollToSalaryOrJob }: HeroProps) {
  return (
    <section
      id="top"
      className="relative pt-24 pb-12 sm:pt-28 sm:pb-16 lg:pt-32 lg:pb-20 bg-surface border-b border-outline-variant/70 overflow-hidden"
      aria-labelledby="hero-title"
    >
      {/* Subtle architectural rose radial tint */}
      <div
        className="absolute top-0 right-0 w-[560px] h-[560px] bg-secondary-container/45 rounded-full blur-3xl -translate-y-1/3 translate-x-1/4 pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-[1160px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main Asymmetric 2-Col Editorial Hero */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left: Core Message & Actions */}
          <motion.div
            className="lg:col-span-6 space-y-5 text-left"
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
          >
            <div className="flex items-center gap-2.5" id="hero-tagline">
              <span className="w-6 h-px bg-primary shrink-0" aria-hidden="true" />
              <span className="text-xs sm:text-sm font-bold tracking-wider text-primary">
                {content?.tagline || '24時間受付中 ・ 店舗直営公式求人'}
              </span>
            </div>

            <div className="space-y-3">
              <h1
                id="hero-title"
                className="font-cute leading-tight tracking-tight"
              >
                <span className="inline-flex items-center gap-1.5 text-[20px] sm:text-[24px] lg:text-[27px] font-bold text-[#6E3B4B] mb-1.5">
                  <svg
                    viewBox="0 0 20 20"
                    className="w-4 h-4 text-[#E65A85] shrink-0"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M10 1.5c1.1 2.4 3.1 4.1 5.7 4.5-2.1 1.6-2.8 4.2-2.2 6.8-2.2-1.4-4.8-1.4-7 0 .6-2.6-.1-5.2-2.2-6.8 2.6-.4 4.6-2.1 5.7-4.5z" />
                  </svg>
                  <span>{content?.titleLine1 || '飛田新地求人なら'}</span>
                </span>
                <span className="block">
                  <span className="relative inline-block pb-1">
                    <span
                      className="relative z-10 text-[35px] sm:text-[45px] lg:text-[52px] font-black tracking-normal bg-gradient-to-r from-[#B82D5C] via-[#E04F7E] to-[#C23464] bg-clip-text text-transparent"
                    >
                      {(content?.titleLine2 || '飛田ガールズ♡').replace(/♡+$/, '')}
                    </span>
                    <span
                      className="relative z-10 inline-flex items-center justify-center ml-1.5 text-[30px] sm:text-[38px] lg:text-[44px] text-[#EC5A8D] align-baseline"
                      aria-hidden="true"
                    >
                      <svg
                        viewBox="0 0 28 26"
                        className="w-[0.82em] h-[0.82em] inline-block drop-shadow-[0_2px_6px_rgba(230,90,133,0.28)]"
                        fill="currentColor"
                      >
                        <path d="M14 24.2S2 16.5 2 8.6C2 4.7 5.1 1.8 8.7 1.8c2.2 0 4.2 1.1 5.3 2.8 1.1-1.7 3.1-2.8 5.3-2.8C22.9 1.8 26 4.7 26 8.6c0 7.9-12 15.6-12 15.6z" />
                      </svg>
                    </span>
                    <span className="sr-only">♡</span>
                    <span
                      className="absolute left-0 right-0 bottom-1 h-3 sm:h-3.5 bg-[#FAD7E3]/80 rounded-full -z-0"
                      aria-hidden="true"
                    />
                  </span>
                </span>
              </h1>
              <p className="font-sans font-bold text-sm sm:text-base text-secondary">
                飛田ガールズ｜料亭直営の公式求人窓口
              </p>
            </div>

            <div
              id="hero-description"
              className="font-sans text-[14.5px] sm:text-[15.5px] text-on-surface-variant leading-[1.85] space-y-2.5"
            >
              <p>
                {content?.descriptionLine1 ||
                  '初めてでも安心できるよう、お仕事の内容やお給料の仕組み、働き方まで事前にわかりやすくご案内しています。'}
              </p>
              <p>
                {content?.descriptionLine2 ||
                  '料亭直営の公式求人窓口だからこそ、無理な勧誘やあいまいな説明はありません。'}
              </p>
              <p>
                {content?.descriptionLine3 ||
                  '「まずは話だけ聞いてみたい」「お店の雰囲気を見てみたい」という方も、気軽にLINEからご相談ください。'}
              </p>
            </div>

            {/* CTAs */}
            <div className="pt-2 space-y-3" id="hero-cta-container">
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href={LINE_OFFICIAL_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  id="hero-line-cta"
                  className="inline-flex items-center justify-center gap-2.5 bg-[#06C755] hover:bg-[#05b34c] text-white font-sans font-bold text-sm sm:text-[15px] px-7 py-3.5 rounded-xl shadow-sm hover:shadow-md transition-all min-h-[52px]"
                >
                  <LucideIcon name="MessageCircle" size={19} className="fill-white text-white shrink-0" />
                  <span>{content?.ctaButtonText || 'LINEで今すぐ応募・相談する'}</span>
                </a>

                <button
                  type="button"
                  onClick={onScrollToSalaryOrJob}
                  id="hero-secondary-cta"
                  className="inline-flex items-center justify-center gap-2 bg-white hover:bg-surface-container text-secondary font-sans font-bold text-sm sm:text-[15px] px-6 py-3.5 rounded-xl border border-outline-variant hover:border-primary/40 transition-colors cursor-pointer min-h-[52px]"
                >
                  <span>仕事内容・給料を見る</span>
                  <LucideIcon name="ArrowDown" size={16} />
                </button>
              </div>

              <p className="text-xs sm:text-[13px] text-on-surface-variant flex items-center gap-1.5" id="hero-badge">
                <LucideIcon name="CheckCircle2" size={14} className="text-primary shrink-0" />
                <span>{content?.badgeText || '店舗直営だから未経験の方も安心のサポート体制'}</span>
              </p>
            </div>
          </motion.div>

          {/* Right: Editorial Ryotei Hero Visual */}
          <motion.div
            className="lg:col-span-6"
            initial={false}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.35 }}
            id="hero-visual"
          >
            <div className="bg-white p-2 sm:p-2.5 rounded-2xl border border-outline-variant shadow-lg shadow-rose-950/[0.04]">
              <picture>
                <source srcSet={HERO_IMAGE_WEBP_URL} type="image/webp" />
                <img
                  src={HERO_IMAGE_JPG}
                  alt="上品で清潔感のある和風料亭イメージ（飛田ガールズ公式求人窓口）"
                  className="w-full h-auto rounded-xl object-cover object-center aspect-[16/9] bg-surface-container-low"
                  decoding="async"
                  fetchPriority="high"
                  width={1376}
                  height={768}
                  referrerPolicy="no-referrer"
                  id="hero-img-element"
                  onError={(e) => {
                    const target = e.currentTarget;
                    const picture = target.closest('picture');
                    if (picture) {
                      picture.querySelectorAll('source').forEach((s) => s.remove());
                    }
                    if (!target.dataset.triedFallback) {
                      target.dataset.triedFallback = '1';
                      target.src = '/images/home_hero_ryotei_1795337037663.jpg';
                    } else {
                      target.onerror = null;
                    }
                  }}
                />
              </picture>
              <p className="text-[11px] text-on-surface-variant/80 text-right pt-2 pr-1">
                ※落ち着いた和風料亭を表現したイメージ画像です
              </p>
            </div>
          </motion.div>
        </div>

        {/* 6 Core Verified Conditions Strip */}
        <div className="mt-10 lg:mt-12 bg-white rounded-2xl border border-outline-variant shadow-2xs overflow-hidden">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 divide-y sm:divide-y-0 sm:divide-x divide-outline-variant/70">
            {CONDITION_HIGHLIGHTS.map((item) => (
              <div
                key={item.label}
                className="px-4 py-3.5 sm:py-4 flex flex-col justify-center"
              >
                <div className="flex items-center gap-1.5 text-[11px] font-semibold text-on-surface-variant mb-1">
                  <LucideIcon name={item.icon} size={13} className="text-primary shrink-0" />
                  <span>{item.label}</span>
                </div>
                <div className="font-sans font-bold text-xs sm:text-[13.5px] text-on-surface tabular-nums">
                  {item.value}
                </div>
              </div>
            ))}
          </div>
          <div className="bg-surface-container-low/70 border-t border-outline-variant/60 px-4 py-2 text-[11px] text-on-surface-variant leading-relaxed">
            ※完全歩合制のため、実際の報酬は適用条件・出勤時間帯・当日の来店状況によって変動します。満20歳未満および高校生の方は応募できません。
          </div>
        </div>
      </div>
    </section>
  );
}
