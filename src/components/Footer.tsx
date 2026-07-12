/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { MouseEvent, useState, useEffect } from 'react';
import LucideIcon from './LucideIcon';

interface FooterProps {
  currentTab: string;
  onChangeTab: (tab: 'recruit' | 'blog' | 'admin') => void;
  onScrollToSection: (sectionId: string) => void;
  onOpenAdmin: () => void;
  isAdminMode?: boolean;
}

export default function Footer({ currentTab, onChangeTab, onScrollToSection, onOpenAdmin, isAdminMode }: FooterProps) {
  const [showAdminLink, setShowAdminLink] = useState(false);

  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      if (params.get('creator') === 'tobita' || params.get('admin') === 'true') {
        localStorage.setItem('show_admin_portal', 'true');
        setShowAdminLink(true);
      } else if (localStorage.getItem('show_admin_portal') === 'true') {
        setShowAdminLink(true);
      }
    } catch (e) {
      console.warn('localStorage or window.location not accessible', e);
    }
  }, []);
  const navLinks = [
    { name: 'お仕事コラム', action: 'blog' },
    { name: '選ばれる理由', action: 'section', target: '#reasons' },
    { name: 'よくある質問', action: 'section', target: '#faq' },
    { name: '女性の声', action: 'section', target: '#voice' },
    { name: 'お仕事・給与', action: 'section', target: '#jobs' },
    { name: '応募の流れ', action: 'section', target: '#flow' },
  ];

  const handleLinkClick = (e: MouseEvent<HTMLAnchorElement>, link: typeof navLinks[0]) => {
    e.preventDefault();

    if (link.action === 'blog') {
      onChangeTab('blog');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (link.action === 'section' && link.target) {
      if (currentTab !== 'recruit') {
        onChangeTab('recruit');
        // Let the tab render, then scroll
        setTimeout(() => {
          onScrollToSection(link.target!.substring(1));
        }, 100);
      } else {
        onScrollToSection(link.target!.substring(1));
      }
    }
  };

  return (
    <footer className="bg-surface-container-low border-t border-rose-100/40 pt-16 pb-8" id="app-footer">
      <div className="max-w-[1100px] mx-auto px-6">
        
        {/* Upper footer grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
          
          {/* Logo details */}
          <div className="space-y-4">
            <div className="font-display font-extrabold text-xl text-secondary flex items-center gap-2">
              <LucideIcon name="Heart" className="fill-secondary text-secondary" size={18} />
              飛田ガールズ
            </div>
            <p className="font-sans text-xs md:text-sm text-on-surface-variant leading-loose">
              飛田新地専門求人サイト<br />
              運営時間：10:00〜24:00<br />
              定休日：年中無休<br />
              対応エリア：飛田新地・大阪市周辺
            </p>
          </div>

          {/* Navigation Links */}
          <div className="space-y-4 text-left md:text-right">
            <h5 className="font-display font-bold text-on-surface text-sm uppercase tracking-wider">
              リンク
            </h5>
            <ul className="space-y-2.5 font-sans text-xs md:text-sm">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.target || '#'}
                    onClick={(e) => handleLinkClick(e, link)}
                    className="text-on-surface-variant hover:text-secondary hover:underline transition-all block"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Lower copyright */}
        <div className="pt-8 border-t border-rose-100/40 flex flex-col sm:flex-row justify-between items-center gap-4 text-center">
          <p className="font-sans text-xs text-on-surface-variant opacity-60">
            © Tobita Girls All Rights Reserved.
          </p>
          <button 
            onClick={onOpenAdmin}
            className="text-xs text-on-surface-variant opacity-50 hover:opacity-100 hover:text-secondary transition-all cursor-pointer flex items-center gap-1 font-mono"
            id="footer-admin-btn"
          >
            <LucideIcon name="Lock" size={12} />
            管理者画面（コラム追加・管理）
          </button>
        </div>

      </div>
    </footer>
  );
}
