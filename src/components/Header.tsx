/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef, MouseEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { LINE_OFFICIAL_URL } from '../data';
import LucideIcon from './LucideIcon';

interface HeaderProps {
  currentTab: 'recruit' | 'blog' | 'admin' | 'about' | 'compare' | 'site-compare' | 'faq' | 'cluster' | 'glossary';
  onChangeTab: (tab: 'recruit' | 'blog' | 'admin' | 'about' | 'compare' | 'site-compare' | 'faq' | 'cluster' | 'glossary') => void;
  onCtaclick: () => void;
  onScrollToSection: (sectionId: string) => void;
  onNavigateTopic?: (topicId: string) => void;
  isAdminMode?: boolean;
}

export default function Header({ currentTab, onChangeTab, onCtaclick, onScrollToSection, onNavigateTopic }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileGuideExpanded, setMobileGuideExpanded] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 12);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const sectionNavLinks = [
    { name: '飛田ガールズとは', target: '#about' },
    { name: '仕事内容', target: '#job' },
    { name: '給料・待遇', target: '#salary' },
    { name: '働き方', target: '#workstyle' },
    { name: '募集要項', target: '#requirements' },
    { name: 'FAQ', target: '#faq-preview' },
    { name: 'アクセス', target: '#access' },
  ];

  const guideCategories = [
    { id: 'job', name: '仕事内容', path: '/job', icon: 'HeartHandshake' },
    { id: 'salary', name: '給料・待遇', path: '/salary', icon: 'Coins' },
    { id: 'beginner', name: '未経験スタート', path: '/beginner', icon: 'Sparkles' },
    { id: 'experienced', name: '経験者・移籍', path: '/experienced', icon: 'Award' },
    { id: 'requirements', name: '募集要項', path: '/requirements', icon: 'FileText' },
    { id: 'flow', name: '面接・体験入店', path: '/flow', icon: 'Calendar' },
    { id: 'workstyle', name: '働き方・シフト', path: '/workstyle', icon: 'Clock' },
    { id: 'shops', name: 'お店選び・通り比較', path: '/shops', icon: 'Store' },
    { id: 'dorm', name: '寮・出稼ぎ', path: '/dekasegi', icon: 'Home' },
    { id: 'safety', name: '身バレ・安全対策', path: '/safety', icon: 'ShieldCheck' },
    { id: 'faq', name: 'よくある質問 (全119問)', path: '/faq', icon: 'HelpCircle' },
    { id: 'blog', name: 'お仕事コラム一覧', path: '/blog', icon: 'BookOpen' },
  ];

  const handleSectionClick = (e: MouseEvent<HTMLAnchorElement>, target: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const sectionId = target.startsWith('#') ? target.substring(1) : target;
    onScrollToSection(sectionId);
  };

  const handleGuideCategoryClick = (e: MouseEvent<HTMLAnchorElement>, categoryId: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    if (categoryId === 'faq') {
      onChangeTab('faq');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    if (categoryId === 'blog') {
      onChangeTab('blog');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    if (onNavigateTopic) {
      onNavigateTopic(categoryId);
    }
  };

  return (
    <>
      <header
        id="app-header"
        className={`fixed w-full top-0 left-0 z-50 transition-all duration-300 bg-white/95 backdrop-blur-md border-b border-outline-variant ${
          isScrolled ? 'shadow-xs py-2.5' : 'py-3'
        }`}
      >
        <div className="flex justify-between items-center w-full px-4 sm:px-6 lg:px-8 max-w-[1220px] mx-auto gap-4">
          {/* Logo: 飛田ガールズ */}
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              setMobileMenuOpen(false);
              onChangeTab('recruit');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-2.5 group cursor-pointer shrink-0"
            id="header-brand-logo"
          >
            <div className="w-9 h-9 rounded-full overflow-hidden border border-outline-variant shadow-2xs shrink-0">
              <img
                src="/favicon.png"
                alt="飛田ガールズ"
                className="w-full h-full object-cover"
                width={36}
                height={36}
                referrerPolicy="no-referrer"
              />
            </div>
            <span className="flex flex-col leading-tight font-sans">
              <span className="font-sans font-extrabold text-base sm:text-lg text-on-surface group-hover:text-primary transition-colors tracking-tight whitespace-nowrap">
                飛田ガールズ
              </span>
              <span className="font-sans font-bold text-[10px] sm:text-[11px] text-secondary tracking-wider whitespace-nowrap">
                飛田新地求人
              </span>
            </span>
          </a>

          {/* Desktop Navigation: 7 Clean Section Anchors */}
          <nav
            ref={navRef}
            className="hidden lg:flex items-center gap-1 xl:gap-2"
            id="desktop-navigation"
            aria-label="メインナビゲーション"
          >
            {sectionNavLinks.map((link) => (
              <a
                key={link.target}
                href={`/${link.target}`}
                onClick={(e) => handleSectionClick(e, link.target)}
                className="font-sans text-[13px] xl:text-[13.5px] font-medium text-on-surface-variant hover:text-primary px-2.5 py-2 rounded-lg hover:bg-surface-container/60 transition-colors whitespace-nowrap cursor-pointer"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Right: Prominent Official LINE Button + Mobile Menu Toggle */}
          <div className="flex items-center gap-2 shrink-0">
            <a
              href={LINE_OFFICIAL_URL}
              target="_blank"
              rel="noopener noreferrer"
              id="header-cta"
              className="bg-[#06C755] hover:bg-[#05b34c] text-white font-sans font-bold text-xs sm:text-[13px] px-3.5 sm:px-5 py-2.5 rounded-xl shadow-xs hover:shadow-sm transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap min-h-[40px]"
            >
              <LucideIcon name="MessageCircle" size={16} className="fill-white text-white shrink-0" />
              <span>LINE無料相談</span>
            </a>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              id="mobile-menu-toggle"
              className="w-10 h-10 flex items-center justify-center rounded-xl text-on-surface hover:text-primary hover:bg-surface-container/70 lg:hidden focus:outline-none transition-colors border border-outline-variant cursor-pointer"
              aria-label="メニューを開く"
              aria-expanded={mobileMenuOpen}
            >
              <LucideIcon name={mobileMenuOpen ? 'X' : 'Menu'} size={20} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
            className="fixed inset-x-0 top-[61px] bottom-0 z-50 bg-white/98 backdrop-blur-md border-t border-outline-variant lg:hidden flex flex-col overflow-hidden"
            id="mobile-navigation-drawer"
          >
            <div className="flex-1 overflow-y-auto overscroll-contain px-4 py-4 space-y-4">
              {/* Homepage Section Anchors */}
              <div>
                <p className="text-[11px] font-bold text-on-surface-variant tracking-wider uppercase px-1 mb-2">
                  トップページ案内
                </p>
                <div className="grid grid-cols-1 divide-y divide-outline-variant/60 border border-outline-variant rounded-2xl bg-surface overflow-hidden">
                  {sectionNavLinks.map((link) => (
                    <a
                      key={link.target}
                      href={`/${link.target}`}
                      onClick={(e) => handleSectionClick(e, link.target)}
                      className="px-4 py-3 text-sm font-semibold text-on-surface hover:text-primary hover:bg-surface-container/50 flex items-center justify-between transition-colors"
                    >
                      <span>{link.name}</span>
                      <LucideIcon name="ChevronRight" size={16} className="text-on-surface-variant/60" />
                    </a>
                  ))}
                </div>
              </div>

              {/* Expandable 12-Category Guides */}
              <div className="border border-outline-variant rounded-2xl bg-white overflow-hidden">
                <button
                  type="button"
                  onClick={() => setMobileGuideExpanded(!mobileGuideExpanded)}
                  className="w-full px-4 py-3 text-left flex items-center justify-between bg-surface-container/40 font-bold text-sm text-secondary cursor-pointer"
                >
                  <span>詳細ガイド・特集ページ（12テーマ）</span>
                  <LucideIcon name={mobileGuideExpanded ? 'ChevronUp' : 'ChevronDown'} size={16} />
                </button>
                {mobileGuideExpanded && (
                  <div className="p-2 grid grid-cols-2 gap-1.5 bg-white">
                    {guideCategories.map((cat) => (
                      <a
                        key={cat.id}
                        href={cat.path}
                        onClick={(e) => handleGuideCategoryClick(e, cat.id)}
                        className="px-2.5 py-2 rounded-xl hover:bg-surface-container/60 text-xs font-medium text-on-surface flex items-center gap-2 transition-colors"
                      >
                        <LucideIcon name={cat.icon} size={13} className="text-primary shrink-0" />
                        <span className="truncate">{cat.name}</span>
                      </a>
                    ))}
                  </div>
                )}
              </div>

              {/* Additional Pages */}
              <div className="grid grid-cols-3 gap-2 text-center text-xs">
                <a
                  href="/compare"
                  onClick={(e) => {
                    e.preventDefault();
                    setMobileMenuOpen(false);
                    onChangeTab('compare');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="py-2.5 px-2 rounded-xl bg-surface border border-outline-variant text-on-surface font-semibold hover:text-primary"
                >
                  働き方比較
                </a>
                <a
                  href="/blog"
                  onClick={(e) => {
                    e.preventDefault();
                    setMobileMenuOpen(false);
                    onChangeTab('blog');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="py-2.5 px-2 rounded-xl bg-surface border border-outline-variant text-on-surface font-semibold hover:text-primary"
                >
                  コラム一覧
                </a>
                <a
                  href="/about"
                  onClick={(e) => {
                    e.preventDefault();
                    setMobileMenuOpen(false);
                    onChangeTab('about');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="py-2.5 px-2 rounded-xl bg-surface border border-outline-variant text-on-surface font-semibold hover:text-primary"
                >
                  運営情報
                </a>
              </div>
            </div>

            {/* Bottom Fixed LINE CTA in Drawer */}
            <div className="border-t border-outline-variant bg-white px-4 pt-3 pb-[max(1rem,env(safe-area-inset-bottom))] space-y-2 shrink-0">
              <a
                href={LINE_OFFICIAL_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full bg-[#06C755] hover:bg-[#05b34c] text-white py-3.5 px-4 rounded-xl font-bold flex items-center justify-center gap-2 shadow-sm text-sm"
                id="mobile-drawer-cta-btn"
              >
                <LucideIcon name="MessageCircle" className="fill-white text-white shrink-0" size={18} />
                <span>LINEで無料相談する（24時間受付）</span>
              </a>
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onCtaclick();
                }}
                className="w-full text-center text-xs font-medium text-on-surface-variant py-1 cursor-pointer"
              >
                ページ内の相談フォーム・テンプレートを見る
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
