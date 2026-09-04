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
  const [activeModal, setActiveModal] = useState<'policy' | 'company' | null>(null);

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
    { name: '求人総合ガイド', action: 'section', target: '#hub' },
    { name: 'お仕事コラム一覧', action: 'blog' },
    { name: '選ばれる理由', action: 'section', target: '#reasons' },
    { name: 'よくある質問（FAQ）', action: 'section', target: '#faq' },
    { name: '女性の声・体験談', action: 'section', target: '#voice' },
    { name: '募集要項・給料例', action: 'section', target: '#jobs' },
    { name: '応募・面接の流れ', action: 'section', target: '#flow' },
  ];

  const handleLinkClick = (e: MouseEvent<HTMLAnchorElement>, link: typeof navLinks[0]) => {
    e.preventDefault();

    if (link.action === 'blog') {
      onChangeTab('blog');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (link.action === 'section' && link.target) {
      const sectionId = link.target.startsWith('#') ? link.target.substring(1) : link.target;
      onScrollToSection(sectionId);
    }
  };

  return (
    <footer className="bg-surface-container-low border-t border-rose-100/40 pt-16 pb-8" id="app-footer">
      <div className="max-w-[1100px] mx-auto px-6">
        
        {/* Upper footer grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
          
          {/* Logo & Operational Info */}
          <div className="space-y-4">
            <div className="space-y-1">
              <div className="text-xs font-bold text-on-surface-variant/80 uppercase tracking-wider">
                飛田新地求人・女性サポート公式
              </div>
              <div className="font-display font-extrabold text-xl text-secondary flex items-center gap-2.5 pb-2">
                <img
                  src="/favicon.png"
                  alt="Tobita Girls Icon"
                  className="w-7 h-7 rounded-full object-cover border border-rose-200 shadow-xs"
                  referrerPolicy="no-referrer"
                />
                <span>飛田ガールズ</span>
              </div>
            </div>
            <p className="font-sans text-xs md:text-sm text-on-surface-variant leading-loose">
              受付時間：24時間年中無休<br />
              活動拠点：大阪府大阪市西成区山王（飛田新地エリア）<br />
              相談窓口：女性専任アドバイザー常駐
            </p>
            <div className="flex items-center gap-2 text-[11px] text-gray-500 font-mono bg-white p-2.5 rounded-xl border border-rose-100/60 inline-flex">
              <LucideIcon name="CalendarCheck" size={13} className="text-secondary" />
              <span>サイト最終更新日：2026年8月31日</span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="space-y-4">
            <h5 className="font-display font-bold text-on-surface text-sm uppercase tracking-wider">
              サイト内リンク
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

          {/* E-E-A-T & Editorial / Compliance Info */}
          <div className="space-y-4">
            <h5 className="font-display font-bold text-on-surface text-sm uppercase tracking-wider">
              求人掲載基準・運営方針
            </h5>
            <p className="font-sans text-xs text-on-surface-variant leading-relaxed">
              当サイト「飛田ガールズ」は、飛田新地の料亭組合規約および雇用法令に完全準拠した優良料亭の正規求人情報のみを取り扱っています。架空・誇大広告の排除、50%バック即日日払い、完全なプライバシー保護・身バレ防止を徹底しております。
            </p>
            <div className="flex flex-col gap-2 pt-1 text-xs">
              <button
                onClick={() => setActiveModal('policy')}
                className="text-left text-secondary font-bold hover:underline flex items-center gap-1 cursor-pointer"
              >
                <LucideIcon name="FileCheck" size={13} />
                <span>求人情報掲載ポリシーと安全規約</span>
              </button>
              <button
                onClick={() => setActiveModal('company')}
                className="text-left text-secondary font-bold hover:underline flex items-center gap-1 cursor-pointer"
              >
                <LucideIcon name="ShieldCheck" size={13} />
                <span>運営者情報・プライバシー保護体制</span>
              </button>
            </div>
          </div>

        </div>

        {/* Lower copyright & Admin link */}
        <div className="pt-8 border-t border-rose-100/40 flex flex-col sm:flex-row justify-between items-center gap-4 text-center">
          <p className="font-sans text-xs text-on-surface-variant opacity-60">
            © Tobita Girls All Rights Reserved. 飛田新地求人なら飛田ガールズ
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

      {/* Policy Modal */}
      {activeModal === 'policy' && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 md:p-8 max-w-lg w-full max-h-[80vh] overflow-y-auto shadow-2xl border border-rose-100">
            <div className="flex items-center justify-between pb-4 border-b border-rose-100 mb-4">
              <h4 className="font-display font-bold text-base text-gray-900 flex items-center gap-2">
                <LucideIcon name="FileCheck" className="text-secondary" size={18} />
                求人情報掲載ポリシーと安全規約
              </h4>
              <button onClick={() => setActiveModal(null)} className="text-gray-400 hover:text-gray-600 p-1">
                <LucideIcon name="X" size={18} />
              </button>
            </div>
            <div className="text-xs text-gray-700 space-y-3 leading-relaxed font-sans">
              <p><strong>1. 法令遵守と健全性の徹底</strong><br />18歳未満（高校生含む）の雇用を固く禁じております。身分証確認を厳正に行い、違法行為・反社会的勢力との関わりを一切排除しています。</p>
              <p><strong>2. 虚偽・誇大広告の禁止</strong><br />「誰でも日給30万円」などの誇大表記は行わず、料亭組合規約に基づいた正確な給与計算（売上50%バック即日全額日払い）と実態に即した一次情報を掲載します。</p>
              <p><strong>3. ノルマ・天引きの禁止</strong><br />指名ノルマ・同伴ペナルティ・不当な衣装代などの天引きを行う店舗の掲載は一切認めておりません。</p>
            </div>
          </div>
        </div>
      )}

      {/* Company / Privacy Modal */}
      {activeModal === 'company' && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 md:p-8 max-w-lg w-full max-h-[80vh] overflow-y-auto shadow-2xl border border-rose-100">
            <div className="flex items-center justify-between pb-4 border-b border-rose-100 mb-4">
              <h4 className="font-display font-bold text-base text-gray-900 flex items-center gap-2">
                <LucideIcon name="ShieldCheck" className="text-secondary" size={18} />
                運営者情報・プライバシー保護体制
              </h4>
              <button onClick={() => setActiveModal(null)} className="text-gray-400 hover:text-gray-600 p-1">
                <LucideIcon name="X" size={18} />
              </button>
            </div>
            <div className="text-xs text-gray-700 space-y-3 leading-relaxed font-sans">
              <p><strong>運営組織：</strong>飛田ガールズ求人案内所（料亭直営サポートチーム）</p>
              <p><strong>活動拠点：</strong>大阪府大阪市西成区山王（天王寺・飛田新地エリア）</p>
              <p><strong>責任者：</strong>女性サポート統括担当 さくら（歴8年） / 採用マネージャー 木村（歴12年）</p>
              <p><strong>個人情報保護：</strong>ご相談・ご応募時のLINE情報や個人情報は、店舗案内および連絡業務にのみ厳重に使用し、第三者への開示・販売は一切行いません。</p>
              <p><strong>身バレ防止対策：</strong>Webサイト・SNS等への写真掲載は一切行われません。</p>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
}

