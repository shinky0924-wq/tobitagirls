/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { HERO_IMAGE_URL } from '../data';
import LucideIcon from './LucideIcon';
import { SiteContent } from '../siteContent';
import { BlogArticle, getValidArticleEyeCatch } from '../blogData';
import { ArticleCardImage } from './ArticleCardImage';

interface HeroProps {
  content: SiteContent['hero'];
  onCtaclick: () => void;
  onBlogClick?: () => void;
  articles?: BlogArticle[];
  onArticleClick?: (slug: string) => void;
}

export default function Hero({ content, onCtaclick, onBlogClick, articles, onArticleClick }: HeroProps) {
  const [randomArticles, setRandomArticles] = useState<BlogArticle[]>([]);

  useEffect(() => {
    if (articles && articles.length > 0) {
      // Shuffle and pick 5 articles
      const shuffled = [...articles].sort(() => 0.5 - Math.random());
      setRandomArticles(shuffled.slice(0, 5));
    }
  }, [articles]);

  return (
    <section className="relative pt-28 md:pt-36 pb-16 md:pb-24 overflow-hidden hero-pattern bg-radial from-rose-50/20 via-transparent to-transparent">
      {/* Backdrops */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-secondary-container/10 rounded-full blur-3xl pointer-events-none z-0" />

      <div className="max-w-[900px] mx-auto px-6 relative z-10 flex flex-col items-center text-center">
        {/* Tagline */}
        <motion.div 
          className="inline-block bg-rose-100 text-secondary font-sans font-bold text-xs md:text-sm px-4 py-1.5 rounded-full mb-6 relative shadow-sm"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          id="hero-tagline"
        >
          <span className="relative flex h-2 w-2 inline-block mr-2 rounded-full bg-secondary animate-ping align-middle" />
          {content.tagline && !content.tagline.includes('店舗直営公式求人') ? content.tagline : '24時間受付中 ・ 相談だけでもOK'}
        </motion.div>

        {/* Main Display Title */}
        <motion.h1 
          className="font-display font-extrabold text-2xl md:text-5xl lg:text-5xl text-on-surface leading-tight mb-6 break-words"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
          id="hero-title"
        >
          <span className="block text-xs sm:text-sm font-sans font-bold text-[#D94B7A] tracking-wide mb-2">
            飛田新地求人・未経験歓迎の公式ガイド
          </span>
          飛田新地で<br className="block md:hidden" />
          <span className="text-secondary bg-clip-text">働いてみたい女性へ。</span>
        </motion.h1>

        {/* Sub description */}
        <motion.div 
          className="font-sans leading-relaxed mb-8 max-w-2xl px-2 sm:px-0 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease: 'easeOut' }}
          id="hero-description"
        >
          <div className="space-y-4 text-xs sm:text-sm md:text-base text-zinc-700 leading-relaxed bg-white/80 backdrop-blur-xs p-5 sm:p-7 rounded-3xl border border-rose-100/90 shadow-xs">
            <p className="font-medium text-zinc-800 leading-relaxed text-left sm:text-center">
              当店では、仕事内容や給料の仕組み、未経験から働くまでの流れ、お店選びのポイントなど、求人を探すうえで知っておきたい情報をわかりやすくまとめています。
            </p>

            <div className="py-2.5 px-4 sm:px-6 bg-rose-50/80 rounded-2xl border border-rose-100 inline-flex flex-col items-start sm:items-center gap-1.5 shadow-2xs">
              <span className="text-secondary font-bold text-xs sm:text-sm">
                ・「未経験でも大丈夫？」
              </span>
              <span className="text-secondary font-bold text-xs sm:text-sm">
                ・「実際どんな仕事をするの？」
              </span>
              <span className="text-secondary font-bold text-xs sm:text-sm">
                ・「身バレや人間関係が心配……」
              </span>
            </div>

            <p className="font-medium text-zinc-800">
              そんな疑問や不安にも、丁寧にお答えします。
            </p>

            <p className="text-secondary font-extrabold text-sm sm:text-base">
              まずは相談だけでもお気軽にご相談ください。
            </p>
          </div>

          {/* 募集条件サマリー（主要SEOキーワード・基本条件の視認性向上） */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mt-4 text-left">
            <div className="bg-white/90 rounded-2xl p-3 border border-rose-100 shadow-2xs">
              <div className="text-[10px] font-bold text-[#85818A]">給料・支払い</div>
              <div className="text-xs sm:text-[13px] font-extrabold text-[#D94B7A] mt-0.5">売上50%・即日日払い</div>
            </div>
            <div className="bg-white/90 rounded-2xl p-3 border border-rose-100 shadow-2xs">
              <div className="text-[10px] font-bold text-[#85818A]">応募資格</div>
              <div className="text-xs sm:text-[13px] font-extrabold text-[#35313A] mt-0.5">満20歳以上の女性</div>
            </div>
            <div className="bg-white/90 rounded-2xl p-3 border border-rose-100 shadow-2xs">
              <div className="text-[10px] font-bold text-[#85818A]">シフト・出勤</div>
              <div className="text-xs sm:text-[13px] font-extrabold text-[#35313A] mt-0.5">週1日〜自由シフト</div>
            </div>
            <div className="bg-white/90 rounded-2xl p-3 border border-rose-100 shadow-2xs">
              <div className="text-[10px] font-bold text-[#85818A]">働きやすさ</div>
              <div className="text-xs sm:text-[13px] font-extrabold text-[#35313A] mt-0.5">お酒不要・WEB顔出しなし</div>
            </div>
          </div>
        </motion.div>

        {/* Horizontal Styled Photo Wrapper */}
        <motion.div 
          className="w-full relative mb-10"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
          id="hero-visual"
        >
          {/* Ambient Background Glow */}
          <div className="absolute -inset-4 bg-gradient-to-tr from-secondary/10 to-rose-200/20 rounded-[44px] blur-2xl pointer-events-none" />

          <div className="relative bg-white p-3 rounded-[28px] sm:rounded-[36px] shadow-2xl border border-rose-50/50 overflow-hidden transform hover:scale-[1.01] transition-transform duration-500">
            <img 
              src={HERO_IMAGE_URL} 
              alt="飛田新地のお仕事・料亭直営求人で夢を叶える場所" 
              className="w-full h-auto rounded-[20px] sm:rounded-[28px] object-cover aspect-[16/9] object-center bg-gray-100"
              decoding="async"
              fetchPriority="high"
              width={800}
              height={450}
              referrerPolicy="no-referrer"
              id="hero-img-element"
              onError={(e) => {
                const target = e.currentTarget;
                if (!target.dataset.triedFallback) {
                  target.dataset.triedFallback = '1';
                  target.src = '/images/tobita_dream_hero_banner_1782557055526.jpg';
                } else {
                  target.onerror = null;
                }
              }}
            />
            
            {/* Overlapping Glassmorphism Stamp */}
            <div className="absolute bottom-6 right-6 md:bottom-8 md:right-8 bg-white/95 backdrop-blur-md p-3 md:p-4 rounded-xl md:rounded-2xl shadow-xl border border-rose-100 flex flex-col items-center z-10">
              <span className="text-secondary font-extrabold text-xs md:text-sm tracking-widest uppercase mb-0.5">飛田新地で</span>
              <span className="text-secondary-container font-extrabold text-sm md:text-xl tracking-normal text-[#a13762]">
                夢を叶えよう！
              </span>
            </div>
          </div>

          {/* Tiny accent decoration dots/crosses */}
          <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-rose-50 rounded-full border border-rose-100/30 flex items-center justify-center -z-10 shadow-sm" />
        </motion.div>

        {/* Hero Recommendation Columns */}
        {randomArticles.length > 0 && (
          <motion.div 
            className="flex flex-col gap-5 justify-center items-center w-full max-w-xl"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            id="hero-cta-container"
          >
            <div className="w-full text-left bg-gradient-to-br from-white to-[#fffbfd] p-5 md:p-6 rounded-3xl border border-secondary/20 shadow-xl shadow-rose-100/30 relative mt-2" id="hero-random-columns">
              {/* Elegant floating accent sparkles */}
              <div className="absolute -top-3 -right-3 bg-secondary text-white text-[10px] px-3 py-1 rounded-full font-black shadow-sm flex items-center gap-1 border border-secondary/10 tracking-widest animate-pulse">
                <LucideIcon name="Sparkles" size={11} />
                <span>PICK UP</span>
              </div>
              
              <h3 className="font-sans font-extrabold text-sm md:text-base text-secondary mb-4 flex items-center gap-2 border-b border-rose-100 pb-3">
                <span className="bg-secondary text-white text-[9px] tracking-wider px-2 py-0.5 rounded-md font-black">RECOMMEND</span>
                <span className="bg-gradient-to-r from-secondary to-[#a13762] bg-clip-text text-transparent font-black">人気のお仕事コラム（おすすめ5選）</span>
              </h3>
              
              <div className="flex flex-col gap-2.5">
                {randomArticles.map((art, index) => (
                  <a
                    key={art.id}
                    href={`/blog/${art.slug}`}
                    onClick={(e) => {
                      e.preventDefault();
                      if (onArticleClick) onArticleClick(art.slug);
                    }}
                    className="w-full text-left font-sans text-xs md:text-sm text-on-surface bg-white hover:bg-secondary-container/10 p-2.5 sm:p-3 rounded-2xl border border-rose-100 hover:border-secondary-container/50 transition-all flex items-center justify-between gap-3 cursor-pointer group shadow-[0_2px_8px_-3px_rgba(210,84,123,0.06)] hover:shadow-[0_4px_12px_-2px_rgba(210,84,123,0.12)] hover:-translate-y-0.5"
                    id={`hero-col-item-${art.id}`}
                  >
                    <div className="flex items-center gap-3 overflow-hidden flex-1">
                      {/* Eyecatch thumbnail */}
                      <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl overflow-hidden bg-rose-50 border border-rose-100/60 shrink-0 relative flex items-center justify-center shadow-xs">
                        <ArticleCardImage
                          src={getValidArticleEyeCatch(art)}
                          alt={art.title}
                          category={art.category}
                          categoryLabel={art.categoryLabel}
                          className="w-full h-full"
                        />
                      </div>

                      {/* Title & category */}
                      <div className="overflow-hidden flex-1">
                        <div className="flex items-center gap-1.5 mb-0.5">
                          <span className="text-[10px] font-black text-secondary bg-rose-50 px-1.5 py-0.2 rounded border border-rose-100/80">
                            {art.categoryLabel || '解説'}
                          </span>
                          <span className="text-[10px] text-gray-400 font-mono">
                            No.{String(index + 1).padStart(2, '0')}
                          </span>
                        </div>
                        <span className="truncate block text-gray-800 group-hover:text-secondary transition-colors font-bold text-xs sm:text-sm leading-snug">
                          {art.title}
                        </span>
                      </div>
                    </div>

                      <div className="flex items-center gap-1.5 shrink-0 pl-1">
                        <span className="hidden sm:inline text-[10px] text-secondary font-bold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                          読む
                        </span>
                        <LucideIcon name="ChevronRight" className="text-secondary/40 group-hover:text-secondary group-hover:translate-x-0.5 transition-all shrink-0" size={16} />
                      </div>
                  </a>
                ))}
              </div>
              
              {onBlogClick && (
                <div className="mt-4 text-center border-t border-rose-100/50 pt-4">
                  <a
                    href="/blog"
                    onClick={(e) => {
                      e.preventDefault();
                      onBlogClick();
                    }}
                    className="inline-flex items-center gap-2 text-xs md:text-sm font-extrabold text-white bg-gradient-to-r from-secondary to-[#e2628b] hover:from-[#c2446c] hover:to-[#d2547b] px-6 py-2.5 rounded-full shadow-md shadow-rose-200/50 hover:shadow-lg transition-all cursor-pointer group"
                    id="hero-all-columns-link"
                  >
                    <span>すべてのコラムを見る</span>
                    <LucideIcon name="ChevronRight" className="group-hover:translate-x-1 transition-transform" size={14} />
                  </a>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* Guarantee Badge */}
        <motion.div 
          className="mt-8 flex items-center justify-center gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          id="hero-badge"
        >
          <div className="flex -space-x-2">
            <div className="w-8 h-8 rounded-full bg-rose-100 border-2 border-white flex items-center justify-center shadow-sm">
              <LucideIcon name="Sparkles" className="text-secondary" size={14} />
            </div>
            <div className="w-8 h-8 rounded-full bg-rose-100 border-2 border-white flex items-center justify-center shadow-sm">
              <LucideIcon name="ShieldAlert" className="text-secondary" size={14} />
            </div>
          </div>
          <span className="text-xs md:text-sm font-medium text-on-surface-variant">{content.badgeText}</span>
        </motion.div>
      </div>

      {/* Decorative Wave Divider at the bottom */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] translate-y-[1px]">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[30px] text-surface fill-current">
          <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"></path>
        </svg>
      </div>
    </section>
  );
}
