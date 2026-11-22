/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { HERO_IMAGE_URL, LINE_OFFICIAL_URL } from '../data';
import LucideIcon from './LucideIcon';
import { SiteContent } from '../siteContent';
import { HERO_IMAGE_WEBP_URL } from '../featuredArticles';

interface HeroProps {
  content: SiteContent['hero'];
  onCtaclick: () => void;
  onScrollToSalaryOrJob?: () => void;
  onBlogClick?: () => void;
  onArticleClick?: (slug: string) => void;
}

const CONDITION_HIGHLIGHTS = [
  { label: '報酬システム', value: '売上50％バック', icon: 'Percent' },
  { label: 'お支払い', value: '即日全額現金日払い', icon: 'Banknote' },
  { label: '勤務時間', value: '10:00〜24:00', icon: 'Clock' },
  { label: 'シフト頻度', value: '週1日から相談可能', icon: 'Calendar' },
  { label: '応募資格', value: '満20歳以上', icon: 'ShieldCheck' },
  { label: '応募経験', value: '未経験者歓迎', icon: 'Sparkles' },
];

export default function Hero({ content, onScrollToSalaryOrJob }: HeroProps) {
  return (
    <section
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
                {content?.tagline || '大阪・飛田新地の女性求人'}
              </span>
            </div>

            <div className="space-y-2.5">
              <h1
                id="hero-title"
                className="font-display font-bold text-[26px] sm:text-[34px] lg:text-[40px] text-on-surface leading-[1.32] tracking-tight text-balance"
              >
                飛田新地で、自分らしい働き方を見つけませんか。
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
                飛田ガールズは、大阪・飛田新地の料亭直営の求人窓口です。
              </p>
              <p>
                お店による直接募集だからこそ、仕事内容や報酬、勤務条件について、事前に分かりやすくご案内します。
              </p>
              <p>
                未経験の方も、これまでの経験を活かしたい方も、一人ひとりの希望に合わせてご相談いただけます。
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
                  <span>{content?.ctaButtonText || 'LINEで無料相談する'}</span>
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
                <span>{content?.badgeText || '応募前の質問・相談だけでも歓迎'}</span>
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
                  src={HERO_IMAGE_URL}
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
