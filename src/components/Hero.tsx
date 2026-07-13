/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { HERO_IMAGE_URL } from '../data';
import LucideIcon from './LucideIcon';
import { SiteContent } from '../siteContent';
import { BlogArticle } from '../blogData';

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
          {content.tagline}
        </motion.div>

        {/* Main Display Title */}
        <motion.h1 
          className="font-display font-extrabold text-2xl md:text-5xl lg:text-5xl text-on-surface leading-tight mb-6 break-words"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
          id="hero-title"
        >
          {content.titleLine1}<br className="block md:hidden" />
          <span className="text-secondary bg-clip-text">{content.titleLine2}</span>
        </motion.h1>

        {/* Sub description */}
        <motion.p 
          className="font-sans text-sm md:text-lg text-on-surface-variant leading-relaxed mb-8 max-w-2xl px-2 sm:px-0"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease: 'easeOut' }}
          id="hero-description"
        >
          {content.descriptionLine1}<br />
          {content.descriptionLine2}<br />
          {content.descriptionLine3}
        </motion.p>

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
              alt="飛田新地のお仕事紹介・夢を叶える場所" 
              className="w-full h-auto rounded-[20px] sm:rounded-[28px] object-cover aspect-[16/9] object-center bg-gray-100"
              referrerPolicy="no-referrer"
              id="hero-img-element"
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

        {/* Column Interactive List (Replacing buttons as requested) */}
        <motion.div 
          className="flex flex-col gap-3.5 justify-center items-center w-full max-w-xl"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          id="hero-cta-container"
        >
          {randomArticles.length > 0 && (
            <div className="w-full text-left bg-white p-5 md:p-6 rounded-2xl border-2 border-secondary shadow-xl shadow-rose-100/40 relative overflow-hidden" id="hero-random-columns">
              {/* Cute top subtle decorative bar */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-rose-400 via-secondary to-rose-400" />
              
              <h3 className="font-sans font-extrabold text-sm md:text-base text-secondary mb-4 flex items-center gap-2 border-b-2 border-rose-100 pb-2.5">
                <LucideIcon name="Sparkles" className="text-secondary animate-pulse" size={18} />
                <span className="bg-gradient-to-r from-secondary to-[#a13762] bg-clip-text text-transparent">人気のお仕事コラム（おすすめ5選）</span>
              </h3>
              <div className="flex flex-col gap-2.5">
                {randomArticles.map((art) => (
                  <button
                    key={art.id}
                    onClick={() => onArticleClick && onArticleClick(art.slug)}
                    className="w-full text-left font-sans font-bold text-xs md:text-sm text-on-surface hover:text-secondary bg-[#fff0f5]/40 hover:bg-[#ffe4e1]/60 p-3 rounded-xl border border-rose-100 hover:border-secondary transition-all flex items-center justify-between gap-3 cursor-pointer group shadow-sm hover:shadow-md"
                    id={`hero-col-item-${art.id}`}
                  >
                    <div className="flex items-center gap-2.5 overflow-hidden">
                      <span className="bg-secondary text-white text-[9px] font-extrabold px-2 py-0.5 rounded-full whitespace-nowrap shrink-0 tracking-wider shadow-xs">
                        コラム
                      </span>
                      <span className="truncate text-gray-800 group-hover:text-secondary font-medium md:font-semibold">
                        {art.title}
                      </span>
                    </div>
                    <LucideIcon name="Heart" className="text-rose-300 group-hover:text-secondary group-hover:scale-115 transition-all shrink-0" size={14} />
                  </button>
                ))}
              </div>
              
              {onBlogClick && (
                <div className="mt-4 text-center border-t-2 border-dashed border-rose-100 pt-3.5">
                  <button
                    onClick={onBlogClick}
                    className="inline-flex items-center gap-1.5 text-xs md:text-sm font-extrabold text-secondary hover:text-[#a13762] hover:underline cursor-pointer group bg-rose-50/40 hover:bg-rose-50 px-4 py-1.5 rounded-full border border-rose-100 hover:border-secondary/50 transition-all"
                    id="hero-all-columns-link"
                  >
                    <span>すべてのコラムを見る</span>
                    <LucideIcon name="ChevronRight" className="group-hover:translate-x-1 transition-transform" size={14} />
                  </button>
                </div>
              )}
            </div>
          )}
        </motion.div>

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
