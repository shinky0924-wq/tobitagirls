/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, MouseEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import LucideIcon from './LucideIcon';

interface HeaderProps {
  currentTab: 'recruit' | 'blog' | 'admin';
  onChangeTab: (tab: 'recruit' | 'blog' | 'admin') => void;
  onCtaclick: () => void;
  onScrollToSection: (sectionId: string) => void;
  isAdminMode?: boolean;
}

export default function Header({ currentTab, onChangeTab, onCtaclick, onScrollToSection, isAdminMode }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: '求人総合ガイド', action: 'section', target: '#hub' },
    { name: 'お仕事コラム', action: 'blog' },
    { name: '選ばれる理由', action: 'section', target: '#reasons' },
    { name: 'よくある質問', action: 'section', target: '#faq' },
    { name: '女性の声', action: 'section', target: '#voice' },
    { name: 'お仕事・給与', action: 'section', target: '#jobs' },
    { name: '応募の流れ', action: 'section', target: '#flow' },
  ];

  const handleLinkClick = (e: MouseEvent<HTMLAnchorElement>, link: typeof navLinks[0]) => {
    e.preventDefault();
    setMobileMenuOpen(false);

    if (link.action === 'recruit') {
      onChangeTab('recruit');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (link.action === 'blog') {
      onChangeTab('blog');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (link.action === 'section' && link.target) {
      const sectionId = link.target.startsWith('#') ? link.target.substring(1) : link.target;
      onScrollToSection(sectionId);
    }
  };

  return (
    <>
      <header 
        id="app-header"
        className={`fixed w-full top-0 left-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-white/95 backdrop-blur-md shadow-sm py-3 border-b border-rose-100/40' 
            : 'bg-white/80 backdrop-blur-sm py-4'
        }`}
      >
        <div className="flex justify-between items-center w-full px-6 max-w-[1100px] mx-auto">
          {/* Logo */}
          <a 
            href="#" 
            onClick={(e) => {
              e.preventDefault();
              onChangeTab('recruit');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-2.5 group cursor-pointer"
          >
            <div className="relative w-10 h-10 rounded-full overflow-hidden border border-rose-200/80 shadow-sm shadow-rose-200/60 transition-all duration-300 group-hover:scale-105 group-hover:shadow-md">
              <img
                src="/favicon.png"
                alt="Tobita Girls Icon"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 bg-gradient-to-tr from-amber-300 to-yellow-200 rounded-full flex items-center justify-center shadow-xs border border-white">
                <LucideIcon name="Sparkles" size={8} className="text-amber-700" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-display font-black text-lg md:text-xl text-transparent bg-clip-text bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 tracking-tight flex items-center gap-1">
                Tobita Girls
              </span>
              <span className="text-[10px] font-sans font-extrabold text-[#d2547b] tracking-wider -mt-0.5 block">
                飛田新地求人なら飛田ガールズ
              </span>
            </div>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex gap-8 items-center" id="desktop-navigation">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href="#"
                onClick={(e) => handleLinkClick(e, link)}
                className={`font-sans font-medium text-sm transition-all duration-200 py-1 ${
                  (link.action === 'recruit' && currentTab === 'recruit') ||
                  (link.action === 'blog' && currentTab === 'blog')
                    ? 'text-secondary font-bold border-b-2 border-secondary'
                    : 'text-on-surface-variant hover:text-secondary'
                }`}
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            <button
              onClick={onCtaclick}
              id="header-cta"
              className="hidden sm:flex bg-[#06c755] hover:bg-[#05b34c] text-white font-sans font-semibold text-xs md:text-sm px-3.5 md:px-6 py-2 rounded-full scale-100 hover:scale-105 active:scale-95 transition-all items-center gap-1.5 shadow-md shadow-[#06c755]/10 cursor-pointer"
            >
              <LucideIcon name="MessageCircle" size={15} className="fill-white" />
              <span>LINE無料相談</span>
            </button>

            {/* Mobile Menu Button with guaranteed 48px tap target */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              id="mobile-menu-toggle"
              className="w-11 h-11 flex items-center justify-center rounded-xl text-on-surface-variant hover:text-secondary hover:bg-rose-50/60 active:bg-rose-100 md:hidden focus:outline-none transition-colors"
              aria-label="ナビゲーションメニューを開閉"
            >
              <LucideIcon name={mobileMenuOpen ? 'X' : 'Menu'} size={24} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-[60px] z-40 bg-white/95 backdrop-blur-lg border-b border-rose-100 shadow-xl px-6 py-6 md:hidden flex flex-col gap-4"
            id="mobile-navigation-drawer"
          >
            {navLinks.map((link) => (
              <a
                key={link.name}
                href="#"
                onClick={(e) => handleLinkClick(e, link)}
                className={`font-sans font-semibold text-base py-2.5 border-b border-gray-50 transition-colors ${
                  (link.action === 'recruit' && currentTab === 'recruit') ||
                  (link.action === 'blog' && currentTab === 'blog')
                    ? 'text-secondary'
                    : 'text-on-surface hover:text-secondary'
                }`}
              >
                {link.name}
              </a>
            ))}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onCtaclick();
              }}
              className="mt-2 w-full bg-[#06c755] hover:bg-[#05b34c] text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-[#06c755]/10"
            >
              <LucideIcon name="MessageCircle" className="fill-white text-white" />
              <span>LINEで無料相談 (24h受付)</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
