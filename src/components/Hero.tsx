/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { HERO_IMAGE_URL } from '../data';
import LucideIcon from './LucideIcon';
import { SiteContent } from '../siteContent';

interface HeroProps {
  content: SiteContent['hero'];
  onCtaclick: () => void;
  onBlogClick?: () => void;
}

export default function Hero({ content, onCtaclick, onBlogClick }: HeroProps) {
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

        {/* LINE-themed CTA Button with Column Button */}
        <motion.div 
          className="flex flex-col gap-3.5 justify-center items-center w-full max-w-sm"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          id="hero-cta-container"
        >
          {onBlogClick && (
            <button
              onClick={onBlogClick}
              className="w-full bg-white hover:bg-rose-50/50 text-secondary border-2 border-secondary font-sans font-extrabold text-base md:text-lg px-8 py-3.5 rounded-full shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer group"
              id="hero-blog-cta"
            >
              <LucideIcon name="BookOpen" className="text-secondary group-hover:scale-110 transition-transform" size={20} />
              <span>お仕事コラムを見る</span>
            </button>
          )}

          <button
            onClick={onCtaclick}
            className="w-full bg-gradient-to-r from-[#06c755] to-[#05b34c] text-white font-sans font-extrabold text-base md:text-lg px-8 py-4 rounded-full shadow-lg shadow-[#06c755]/20 hover:shadow-xl hover:shadow-[#06c755]/30 transition-all flex items-center justify-center gap-3 cursor-pointer group animate-pulse hover:animate-none"
            id="hero-prime-cta"
          >
            <div className="bg-white rounded-full p-1 flex items-center justify-center text-[#06c755] shadow-sm group-hover:rotate-12 transition-transform">
              <LucideIcon name="MessageCircle" className="fill-[#06c755] text-[#06c755] w-5 h-5" size={20} />
            </div>
            <span>{content.ctaButtonText}</span>
          </button>
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
