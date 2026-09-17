/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef, MouseEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import LucideIcon from './LucideIcon';

interface HeaderProps {
  currentTab: 'recruit' | 'blog' | 'admin' | 'about' | 'compare' | 'faq' | 'cluster';
  onChangeTab: (tab: 'recruit' | 'blog' | 'admin' | 'about' | 'compare' | 'faq' | 'cluster') => void;
  onCtaclick: () => void;
  onScrollToSection: (sectionId: string) => void;
  onNavigateTopic?: (topicId: string) => void;
  isAdminMode?: boolean;
}

export default function Header({ currentTab, onChangeTab, onCtaclick, onScrollToSection, onNavigateTopic, isAdminMode }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [guideDropdownOpen, setGuideDropdownOpen] = useState(false);
  const [mobileGuideExpanded, setMobileGuideExpanded] = useState(true);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const dropdownTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: Event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setGuideDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // 12 Official Categories under 総合ガイド (matched exactly with top page categories)
  const guideCategories = [
    { id: 'job', name: '仕事内容', icon: 'HeartHandshake', desc: 'お茶出しとおもてなし接客・お酒一切不要', badge: 'お酒不要' },
    { id: 'salary', name: '給料・待遇', icon: 'Coins', desc: '売上50%完全バック・全額即日現金手渡し', badge: '即日日払い' },
    { id: 'beginner', name: '未経験', icon: 'Sparkles', desc: '在籍キャストの約90%が夜職完全初心者', badge: '初心者歓迎' },
    { id: 'experienced', name: '経験者', icon: 'Award', desc: '風俗・キャバクラからの移籍人気No.1・即戦力高収入', badge: '移籍歓迎' },
    { id: 'requirements', name: '募集要項', icon: 'FileText', desc: '20歳以上限定・料理組合公認の公式採用スペック', badge: '20歳以上' },
    { id: 'flow', name: '面接・体験入店までの流れ', icon: 'Calendar', desc: '履歴書不要・私服見学OK・面接当日の即日体入対応', badge: '手ぶらOK' },
    { id: 'workstyle', name: '働き方', icon: 'Clock', desc: '完全自由出勤制・週1日〜・短時間・OL副業対応', badge: '自由出勤' },
    { id: 'shops', name: 'お店選び', icon: 'Store', desc: 'メイン通り・青春通り・大門通りの特徴と直営店', badge: '直営安心' },
    { id: 'dorm', name: '寮・出稼ぎ', icon: 'Home', desc: '家具家電付き個室マンション寮・往復交通費全額支給', badge: '個室寮完備' },
    { id: 'safety', name: '身バレ・安全', icon: 'EyeOff', desc: 'ネット写真ゼロ・完全源氏名・住民税普通徴収対策', badge: '秘密厳守' },
    { id: 'faq', name: 'よくある質問 FAQ', icon: 'HelpCircle', desc: '業界最多クラス全119問・8大テーマ体系化Q&A', badge: '全119問' },
    { id: 'blog', name: 'お仕事コラム', icon: 'BookOpen', desc: '100本以上の解説記事・テーマ別実務ノウハウ', badge: '100本超' },
  ];

  // Top level menu items requested by user
  const topNavLinks = [
    { name: '求人トップ', action: 'recruit', icon: 'Home' },
    // 総合ガイド is handled as interactive dropdown
    { name: '選ばれる6つの理由', action: 'section', target: '#reasons', icon: 'ShieldCheck' },
    { name: '女性のリアル体験談', action: 'section', target: '#voice', icon: 'MessageSquareHeart' },
    { name: '募集要項', action: 'section', target: '#requirements', icon: 'FileText' },
    { name: 'お仕事までの流れ', action: 'section', target: '#flow', icon: 'GitMerge' },
  ];

  const handleLinkClick = (e: MouseEvent<HTMLAnchorElement | HTMLButtonElement>, link: { action: string; target?: string }) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    setGuideDropdownOpen(false);

    if (link.action === 'recruit') {
      onChangeTab('recruit');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (link.action === 'faq') {
      if (currentTab === 'recruit') {
        onScrollToSection('faq');
      } else {
        onChangeTab('faq');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } else if (link.action === 'compare') {
      onChangeTab('compare');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (link.action === 'blog') {
      onChangeTab('blog');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (link.action === 'about') {
      onChangeTab('about');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (link.action === 'section' && link.target) {
      const sectionId = link.target.startsWith('#') ? link.target.substring(1) : link.target;
      if (currentTab !== 'recruit') {
        onChangeTab('recruit');
        setTimeout(() => {
          onScrollToSection(sectionId);
        }, 120);
      } else {
        onScrollToSection(sectionId);
      }
    }
  };

  const handleGuideCategoryClick = (categoryId: string) => {
    setMobileMenuOpen(false);
    setGuideDropdownOpen(false);
    if (categoryId === 'faq') {
      if (currentTab === 'recruit') {
        onScrollToSection('faq');
      } else {
        onChangeTab('faq');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      return;
    }
    if (categoryId === 'blog') {
      onChangeTab('blog');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    if (onNavigateTopic) {
      onNavigateTopic(categoryId);
    } else {
      if (currentTab !== 'recruit') {
        onChangeTab('recruit');
      }
      onScrollToSection('recruit-hub');
      setTimeout(() => {
        window.dispatchEvent(new CustomEvent('select-hub-category', { detail: categoryId }));
      }, 120);
    }
  };

  const handleMouseEnterDropdown = () => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
      dropdownTimeoutRef.current = null;
    }
    setGuideDropdownOpen(true);
  };

  const handleMouseLeaveDropdown = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setGuideDropdownOpen(false);
    }, 150);
  };

  return (
    <>
      <header 
        id="app-header"
        className={`fixed w-full top-0 left-0 z-50 transition-all duration-300 bg-white/95 backdrop-blur-md border-b border-rose-100 ${
          isScrolled 
            ? 'shadow-sm py-2 sm:py-2.5' 
            : 'shadow-2xs py-2.5 sm:py-3'
        }`}
      >
        <div className="flex justify-between items-center w-full px-3.5 sm:px-6 lg:px-8 max-w-[1240px] mx-auto">
          {/* Logo: 飛田ガールズ */}
          <a 
            href="#" 
            onClick={(e) => {
              e.preventDefault();
              onChangeTab('recruit');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-2 sm:gap-2.5 group cursor-pointer shrink-0"
            id="header-brand-logo"
          >
            <div className="relative w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full overflow-hidden border border-rose-200/80 shadow-sm shadow-rose-200/60 transition-all duration-300 group-hover:scale-105 group-hover:shadow-md">
              <img
                src="/favicon.png"
                alt="飛田ガールズ アイコン"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute -top-0.5 -right-0.5 w-3 h-3 sm:w-3.5 sm:h-3.5 bg-gradient-to-tr from-amber-300 to-yellow-200 rounded-full flex items-center justify-center shadow-xs border border-white">
                <LucideIcon name="Sparkles" size={8} className="text-amber-700" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-display font-black text-base sm:text-lg md:text-xl text-transparent bg-clip-text bg-gradient-to-r from-rose-600 via-pink-600 to-rose-700 tracking-tight flex items-center gap-1">
                飛田ガールズ
              </span>
              <span className="text-[9px] sm:text-[10px] font-sans font-bold text-rose-700 tracking-wider -mt-0.5 block">
                Tobita Girls・料亭直営求人
              </span>
            </div>
          </a>

          {/* Desktop Navigation: 飛田ガールズ メニューバー */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5" id="desktop-navigation">
            {/* 1. 求人トップ */}
            <a
              href="#"
              onClick={(e) => handleLinkClick(e, { action: 'recruit' })}
              className={`font-sans text-[13px] xl:text-[14px] px-2.5 xl:px-3 py-1.5 rounded-xl transition-all duration-200 whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
                currentTab === 'recruit'
                  ? 'bg-rose-50 text-rose-700 font-extrabold border border-rose-200/70 shadow-2xs'
                  : 'text-zinc-800 hover:text-rose-600 hover:bg-rose-50/70 font-bold'
              }`}
              id="nav-link-top"
            >
              <LucideIcon name="Home" size={14} className={currentTab === 'recruit' ? 'text-rose-600' : 'text-zinc-500'} />
              <span>求人トップ</span>
            </a>

            {/* 2. 総合ガイド (Dropdown with 10 items) */}
            <div 
              className="relative" 
              ref={dropdownRef}
              onMouseEnter={handleMouseEnterDropdown}
              onMouseLeave={handleMouseLeaveDropdown}
            >
              <button
                type="button"
                onClick={() => setGuideDropdownOpen(!guideDropdownOpen)}
                className={`font-sans text-[13px] xl:text-[14px] px-2.5 xl:px-3 py-1.5 rounded-xl transition-all duration-200 whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
                  guideDropdownOpen
                    ? 'bg-rose-100/90 text-rose-700 font-extrabold border border-rose-200'
                    : 'text-zinc-800 hover:text-rose-600 hover:bg-rose-50/70 font-bold'
                }`}
                id="nav-link-guide"
                aria-expanded={guideDropdownOpen}
              >
                <LucideIcon name="Compass" size={14} className={guideDropdownOpen ? 'text-rose-600' : 'text-zinc-500'} />
                <span>総合ガイド</span>
                <LucideIcon 
                  name={guideDropdownOpen ? 'ChevronUp' : 'ChevronDown'} 
                  size={14} 
                  className={`transition-transform duration-200 ${guideDropdownOpen ? 'text-rose-600' : 'text-zinc-400'}`} 
                />
              </button>

              <AnimatePresence>
                {guideDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.97 }}
                    transition={{ duration: 0.16 }}
                    className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-[540px] xl:w-[580px] bg-white rounded-2xl shadow-2xl border border-rose-100 p-3 z-50 overflow-hidden"
                  >
                    {/* Dropdown Header */}
                    <div className="flex items-center justify-between px-2.5 py-2 border-b border-rose-100 mb-2 bg-rose-50/50 rounded-xl">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
                        <span className="text-xs font-black text-rose-700">
                          総合ガイド（全12カテゴリー）
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setGuideDropdownOpen(false);
                          if (currentTab !== 'recruit') onChangeTab('recruit');
                          onScrollToSection('recruit-hub');
                        }}
                        className="text-[11px] font-bold text-rose-600 hover:text-rose-700 hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        <span>ガイド全体を見る</span>
                        <LucideIcon name="ArrowRight" size={12} />
                      </button>
                    </div>

                    {/* 2-Column Grid of 10 Subcategories */}
                    <div className="grid grid-cols-2 gap-1.5">
                      {guideCategories.map((cat, idx) => (
                        <button
                          key={cat.id}
                          type="button"
                          onClick={() => handleGuideCategoryClick(cat.id)}
                          className="w-full text-left p-2 rounded-xl hover:bg-rose-50/80 transition-all flex items-start gap-2.5 group cursor-pointer border border-transparent hover:border-rose-100"
                          id={`nav-guide-cat-${cat.id}`}
                        >
                          <div className="w-7 h-7 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-rose-600 group-hover:text-white transition-colors shadow-2xs">
                            <LucideIcon name={cat.icon} size={14} />
                          </div>
                          <div className="flex flex-col min-w-0 flex-1">
                            <div className="flex items-center justify-between gap-1">
                              <span className="font-sans font-bold text-xs text-zinc-900 group-hover:text-rose-600 transition-colors truncate">
                                {cat.name}
                              </span>
                              <span className="text-[9px] font-bold text-rose-600 bg-rose-50 px-1.5 py-0.2 rounded-md shrink-0 border border-rose-100">
                                {cat.badge}
                              </span>
                            </div>
                            <span className="text-[10px] text-zinc-500 line-clamp-1 leading-tight mt-0.5">
                              {cat.desc}
                            </span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* 3. 選ばれる6つの理由 */}
            <a
              href="#"
              onClick={(e) => handleLinkClick(e, { action: 'section', target: '#reasons' })}
              className="font-sans text-[13px] xl:text-[14px] px-2.5 xl:px-3 py-1.5 rounded-xl transition-all duration-200 whitespace-nowrap flex items-center gap-1.5 cursor-pointer text-zinc-800 hover:text-rose-600 hover:bg-rose-50/70 font-bold"
              id="nav-link-reasons"
            >
              <LucideIcon name="ShieldCheck" size={14} className="text-zinc-500" />
              <span>選ばれる6つの理由</span>
            </a>

            {/* 4. 女性のリアル体験談 */}
            <a
              href="#"
              onClick={(e) => handleLinkClick(e, { action: 'section', target: '#voice' })}
              className="font-sans text-[13px] xl:text-[14px] px-2.5 xl:px-3 py-1.5 rounded-xl transition-all duration-200 whitespace-nowrap flex items-center gap-1.5 cursor-pointer text-zinc-800 hover:text-rose-600 hover:bg-rose-50/70 font-bold"
              id="nav-link-voice"
            >
              <LucideIcon name="MessageSquareHeart" size={14} className="text-zinc-500" />
              <span>女性のリアル体験談</span>
            </a>

            {/* 5. 募集要項 */}
            <a
              href="#"
              onClick={(e) => handleLinkClick(e, { action: 'section', target: '#requirements' })}
              className="font-sans text-[13px] xl:text-[14px] px-2.5 xl:px-3 py-1.5 rounded-xl transition-all duration-200 whitespace-nowrap flex items-center gap-1.5 cursor-pointer text-zinc-800 hover:text-rose-600 hover:bg-rose-50/70 font-bold"
              id="nav-link-requirements"
            >
              <LucideIcon name="FileText" size={14} className="text-zinc-500" />
              <span>募集要項</span>
            </a>

            {/* 6. お仕事までの流れ */}
            <a
              href="#"
              onClick={(e) => handleLinkClick(e, { action: 'section', target: '#flow' })}
              className="font-sans text-[13px] xl:text-[14px] px-2.5 xl:px-3 py-1.5 rounded-xl transition-all duration-200 whitespace-nowrap flex items-center gap-1.5 cursor-pointer text-zinc-800 hover:text-rose-600 hover:bg-rose-50/70 font-bold"
              id="nav-link-flow"
            >
              <LucideIcon name="GitMerge" size={14} className="text-zinc-500" />
              <span>お仕事までの流れ</span>
            </a>
          </nav>

          {/* Action Buttons: 応募・相談 */}
          <div className="flex items-center gap-2">
            <button
              onClick={onCtaclick}
              id="header-cta"
              className="bg-[#06c755] hover:bg-[#05b34c] text-white font-sans font-bold text-xs sm:text-sm px-3.5 sm:px-5 py-2 rounded-full hover:shadow-md transition-all flex items-center gap-1.5 cursor-pointer shrink-0 shadow-sm shadow-[#06c755]/20"
            >
              <LucideIcon name="MessageCircle" size={16} className="fill-white" />
              <span>応募・相談</span>
            </button>

            {/* Mobile Menu Button with guaranteed 48px tap target */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              id="mobile-menu-toggle"
              className="w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center rounded-xl text-zinc-800 hover:text-rose-600 hover:bg-rose-50 active:bg-rose-100 lg:hidden focus:outline-none transition-colors border border-gray-200/80 cursor-pointer"
              aria-label="ナビゲーションメニューを開閉"
            >
              <LucideIcon name={mobileMenuOpen ? 'X' : 'Menu'} size={22} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer with fixed bottom CTA preventing clipping on mobile */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-[56px] sm:top-[64px] bottom-0 z-50 bg-white/98 backdrop-blur-xl border-b border-rose-200 shadow-2xl lg:hidden flex flex-col overflow-hidden"
            id="mobile-navigation-drawer"
          >
            {/* Scrollable navigation area */}
            <div className="flex-1 overflow-y-auto overscroll-contain px-4 sm:px-5 pt-3 pb-6 space-y-3">
              {/* Header / Brand label in drawer */}
              <div className="flex items-center justify-between pb-2 border-b border-rose-100">
                <div className="flex items-center gap-2">
                  <span className="font-display font-black text-rose-600 text-sm">
                    飛田ガールズ メニュー
                  </span>
                </div>
                <span className="text-[10px] text-zinc-500 font-bold">項目をタップして移動</span>
              </div>

              {/* Navigation Tree list */}
              <div className="flex flex-col space-y-1">
              {/* ├─ 求人トップ */}
              <button
                type="button"
                onClick={(e) => handleLinkClick(e, { action: 'recruit' })}
                className="w-full text-left px-3 py-2.5 rounded-xl border border-gray-100 hover:border-rose-200 hover:bg-rose-50/60 transition-all flex items-center justify-between group cursor-pointer bg-white"
                id="mobile-link-top"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
                    <LucideIcon name="Home" size={15} />
                  </div>
                  <span className="font-bold text-sm text-zinc-900 group-hover:text-rose-600">
                    求人トップ
                  </span>
                </div>
                <LucideIcon name="ChevronRight" size={16} className="text-zinc-400 group-hover:text-rose-600" />
              </button>

              {/* ├─ 総合ガイド (Expandable Tree) */}
              <div className="rounded-xl border border-rose-200/80 bg-rose-50/30 overflow-hidden">
                <button
                  type="button"
                  onClick={() => setMobileGuideExpanded(!mobileGuideExpanded)}
                  className="w-full text-left px-3 py-2.5 transition-colors flex items-center justify-between group cursor-pointer bg-white border-b border-rose-100"
                  id="mobile-link-guide-toggle"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-rose-500 text-white flex items-center justify-center shrink-0 shadow-2xs">
                      <LucideIcon name="Compass" size={15} />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-black text-sm text-rose-700">
                        総合ガイド
                      </span>
                      <span className="text-[10px] text-zinc-500">
                        全12カテゴリーの目的別案内
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] font-black bg-rose-100 text-rose-700 px-2 py-0.5 rounded-full">
                      12テーマ
                    </span>
                    <LucideIcon 
                      name={mobileGuideExpanded ? 'ChevronUp' : 'ChevronDown'} 
                      size={16} 
                      className="text-rose-600" 
                    />
                  </div>
                </button>

                {mobileGuideExpanded && (
                  <div className="p-2 space-y-1 bg-white/70">
                    {guideCategories.map((cat, i) => {
                      const isLast = i === guideCategories.length - 1;
                      return (
                        <button
                          key={cat.id}
                          type="button"
                          onClick={() => handleGuideCategoryClick(cat.id)}
                          className="w-full text-left px-2.5 py-2 rounded-lg hover:bg-rose-50 transition-colors flex items-center justify-between group cursor-pointer border border-transparent hover:border-rose-100"
                          id={`mobile-guide-${cat.id}`}
                        >
                          <div className="flex items-center gap-2">
                            <span className="text-zinc-400 font-mono text-xs select-none">
                              {isLast ? '└' : '├'}
                            </span>
                            <div className="w-6 h-6 rounded-md bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
                              <LucideIcon name={cat.icon} size={12} />
                            </div>
                            <span className="font-bold text-xs text-zinc-800 group-hover:text-rose-600">
                              {cat.name}
                            </span>
                          </div>
                          <span className="text-[10px] text-zinc-400 group-hover:text-rose-600">
                            {cat.badge}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* ├─ 選ばれる6つの理由 */}
              <button
                type="button"
                onClick={(e) => handleLinkClick(e, { action: 'section', target: '#reasons' })}
                className="w-full text-left px-3 py-2.5 rounded-xl border border-gray-100 hover:border-rose-200 hover:bg-rose-50/60 transition-all flex items-center justify-between group cursor-pointer bg-white"
                id="mobile-link-reasons"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
                    <LucideIcon name="ShieldCheck" size={15} />
                  </div>
                  <span className="font-bold text-sm text-zinc-900 group-hover:text-rose-600">
                    選ばれる6つの理由
                  </span>
                </div>
                <LucideIcon name="ChevronRight" size={16} className="text-zinc-400 group-hover:text-rose-600" />
              </button>

              {/* ├─ 女性のリアル体験談 */}
              <button
                type="button"
                onClick={(e) => handleLinkClick(e, { action: 'section', target: '#voice' })}
                className="w-full text-left px-3 py-2.5 rounded-xl border border-gray-100 hover:border-rose-200 hover:bg-rose-50/60 transition-all flex items-center justify-between group cursor-pointer bg-white"
                id="mobile-link-voice"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
                    <LucideIcon name="MessageSquareHeart" size={15} />
                  </div>
                  <span className="font-bold text-sm text-zinc-900 group-hover:text-rose-600">
                    女性のリアル体験談
                  </span>
                </div>
                <LucideIcon name="ChevronRight" size={16} className="text-zinc-400 group-hover:text-rose-600" />
              </button>

              {/* ├─ 募集要項 */}
              <button
                type="button"
                onClick={(e) => handleLinkClick(e, { action: 'section', target: '#requirements' })}
                className="w-full text-left px-3 py-2.5 rounded-xl border border-gray-100 hover:border-rose-200 hover:bg-rose-50/60 transition-all flex items-center justify-between group cursor-pointer bg-white"
                id="mobile-link-requirements"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
                    <LucideIcon name="FileText" size={15} />
                  </div>
                  <span className="font-bold text-sm text-zinc-900 group-hover:text-rose-600">
                    募集要項
                  </span>
                </div>
                <LucideIcon name="ChevronRight" size={16} className="text-zinc-400 group-hover:text-rose-600" />
              </button>

              {/* └─ お仕事までの流れ */}
              <button
                type="button"
                onClick={(e) => handleLinkClick(e, { action: 'section', target: '#flow' })}
                className="w-full text-left px-3 py-2.5 rounded-xl border border-gray-100 hover:border-rose-200 hover:bg-rose-50/60 transition-all flex items-center justify-between group cursor-pointer bg-white"
                id="mobile-link-flow"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
                    <LucideIcon name="GitMerge" size={15} />
                  </div>
                  <span className="font-bold text-sm text-zinc-900 group-hover:text-rose-600">
                    お仕事までの流れ
                  </span>
                </div>
                <LucideIcon name="ChevronRight" size={16} className="text-zinc-400 group-hover:text-rose-600" />
              </button>
            </div>

            {/* Supplementary Links (コラム・比較・運営者情報) */}
            <div className="pt-2 border-t border-rose-100">
              <div className="grid grid-cols-3 gap-2 text-center text-xs">
                <button
                  type="button"
                  onClick={(e) => handleLinkClick(e, { action: 'compare' })}
                  className="py-2 px-1 rounded-lg bg-gray-50 hover:bg-rose-50 text-zinc-600 hover:text-rose-600 font-bold border border-gray-100 transition-colors"
                >
                  サイト比較
                </button>
                <button
                  type="button"
                  onClick={(e) => handleLinkClick(e, { action: 'blog' })}
                  className="py-2 px-1 rounded-lg bg-gray-50 hover:bg-rose-50 text-zinc-600 hover:text-rose-600 font-bold border border-gray-100 transition-colors"
                >
                  お仕事コラム
                </button>
                <button
                  type="button"
                  onClick={(e) => handleLinkClick(e, { action: 'about' })}
                  className="py-2 px-1 rounded-lg bg-gray-50 hover:bg-rose-50 text-zinc-600 hover:text-rose-600 font-bold border border-gray-100 transition-colors"
                >
                  運営者情報
                </button>
              </div>
            </div>

            {/* Scrollable navigation area ends */}
            </div>

            {/* Fixed Bottom CTA: Official LINE Consultation (Always Visible & Never Clipped) */}
            <div className="border-t border-rose-200/80 bg-white/95 backdrop-blur-md px-4 sm:px-5 pt-3 pb-[max(1rem,env(safe-area-inset-bottom))] shadow-[0_-4px_16px_rgba(0,0,0,0.06)] shrink-0">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onCtaclick();
                }}
                className="w-full bg-[#06c755] hover:bg-[#05b34c] active:bg-[#049b42] text-white py-3.5 px-4 rounded-2xl font-bold flex items-center justify-center gap-2 shadow-md shadow-[#06c755]/25 cursor-pointer text-sm select-none"
                id="mobile-drawer-cta-btn"
              >
                <LucideIcon name="MessageCircle" className="fill-white text-white shrink-0" size={19} />
                <span>LINE公式 応募・相談（無料・24h受付）</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
