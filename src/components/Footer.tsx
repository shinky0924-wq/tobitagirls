/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { MouseEvent, useState, useEffect } from 'react';
import LucideIcon from './LucideIcon';

interface FooterProps {
  currentTab: string;
  onChangeTab: (tab: 'recruit' | 'blog' | 'admin' | 'about' | 'compare' | 'faq' | 'cluster') => void;
  onScrollToSection: (sectionId: string) => void;
  onOpenAdmin: () => void;
  onNavigateCompare?: (categorySlug?: string) => void;
  onNavigateTopic?: (topicId: string) => void;
  isAdminMode?: boolean;
}

export default function Footer({ currentTab, onChangeTab, onScrollToSection, onOpenAdmin, onNavigateCompare, onNavigateTopic, isAdminMode }: FooterProps) {
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
    { name: '飛田新地求人サイト比較', action: 'compare', target: '/compare' },
    { name: '求人総合ガイド', action: 'section', target: '#hub' },
    { name: 'お仕事コラム一覧', action: 'blog' },
    { name: '運営者情報・監修体制', action: 'about', target: '/about' },
    { name: '選ばれる理由', action: 'section', target: '#reasons' },
    { name: 'よくある質問 FAQ（全119問）', action: 'faq', target: '/faq' },
    { name: '女性の声・体験談', action: 'section', target: '#voice' },
    { name: '募集要項・給料例', action: 'section', target: '#jobs' },
    { name: '応募・面接の流れ', action: 'section', target: '#flow' },
  ];

  const targetCategoryLinks = [
    { name: '未経験向け求人', slug: 'inexperienced' },
    { name: '高収入求人（日給10万〜）', slug: 'high-income' },
    { name: '週1日・マイペース求人', slug: 'weekly-1' },
    { name: '短期・出稼ぎ求人（交通費支給）', slug: 'short-term' },
    { name: '個室寮付き・即日住み込み', slug: 'dormitory' },
    { name: 'Wワーク・副業向け（会社バレ防止）', slug: 'double-work' },
    { name: '20代向け求人（学生・OL）', slug: 'age-20s' },
    { name: '30代・オトナ女子向け求人', slug: 'age-30s' },
  ];

  const handleLinkClick = (e: MouseEvent<HTMLAnchorElement>, link: typeof navLinks[0]) => {
    e.preventDefault();

    if (link.action === 'compare') {
      onChangeTab('compare');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (link.action === 'blog') {
      onChangeTab('blog');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (link.action === 'about') {
      onChangeTab('about');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (link.action === 'faq') {
      onChangeTab('faq');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (link.action === 'section' && link.target) {
      const sectionId = link.target.startsWith('#') ? link.target.substring(1) : link.target;
      onScrollToSection(sectionId);
    }
  };

  const handleCategoryLinkClick = (e: MouseEvent<HTMLAnchorElement>, slug?: string) => {
    e.preventDefault();
    if (onNavigateCompare) {
      onNavigateCompare(slug);
    } else {
      if (typeof window !== 'undefined') {
        const targetUrl = slug ? `/compare/${slug}` : '/compare';
        window.history.pushState({}, '', targetUrl);
      }
      onChangeTab('compare');
    }
  };

  return (
    <footer className="bg-surface-container-low border-t border-rose-100/40 pt-16 pb-8" id="app-footer">
      <div className="max-w-[1100px] mx-auto px-6">
        
        {/* Upper footer grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          
          {/* Col 1: Logo & Operational Info */}
          <div className="space-y-4">
            <div className="space-y-1">
              <div className="text-xs font-bold text-on-surface-variant/80 uppercase tracking-wider">
                飛田新地料亭直営求人・公式採用窓口
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
            <p className="font-sans text-xs text-on-surface-variant leading-loose">
              受付時間：24時間年中無休<br />
              活動拠点：大阪府大阪市西成区山王（飛田新地料理組合加盟料亭）<br />
              採用窓口：料亭現場スタッフ・女性専任サポート常駐
            </p>
            <div className="flex items-center gap-2 text-[11px] text-gray-500 font-mono bg-white p-2.5 rounded-xl border border-rose-100/60 inline-flex">
              <LucideIcon name="CalendarCheck" size={13} className="text-secondary" />
              <span>サイト最終更新日：2026年9月5日</span>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-4">
            <h5 className="font-display font-bold text-on-surface text-sm uppercase tracking-wider flex items-center gap-1.5">
              <LucideIcon name="Layers" size={15} className="text-secondary" />
              <span>サイト内リンク</span>
            </h5>
            <ul className="space-y-2 font-sans text-xs md:text-sm">
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

          {/* Col 3: 目的・属性別求人比較 */}
          <div className="space-y-4">
            <h5 className="font-display font-bold text-on-surface text-sm uppercase tracking-wider">
              <a
                href="/compare"
                onClick={(e) => handleCategoryLinkClick(e)}
                className="hover:text-secondary flex items-center gap-1.5 transition-colors group cursor-pointer"
                title="目的・属性別求人ガイドへ"
              >
                <LucideIcon name="Target" size={15} className="text-secondary" />
                <span className="group-hover:underline">目的・属性別求人</span>
                <LucideIcon name="ChevronRight" size={13} className="text-zinc-400 group-hover:text-secondary transition-transform group-hover:translate-x-0.5" />
              </a>
            </h5>
            <ul className="space-y-2 font-sans text-xs md:text-sm">
              {targetCategoryLinks.map((cat) => (
                <li key={cat.slug}>
                  <a 
                    href={`/compare/${cat.slug}`}
                    onClick={(e) => handleCategoryLinkClick(e, cat.slug)}
                    className="text-on-surface-variant hover:text-secondary hover:underline transition-all block"
                  >
                    {cat.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: E-E-A-T & Editorial / Compliance Info */}
          <div className="space-y-4">
            <h5 className="font-display font-bold text-on-surface text-sm uppercase tracking-wider flex items-center gap-1.5">
              <LucideIcon name="ShieldCheck" size={15} className="text-secondary" />
              <span>求人掲載基準・運営方針</span>
            </h5>
            <p className="font-sans text-xs text-on-surface-variant leading-relaxed">
              当サイト「飛田ガールズ」は、外部の紹介所や仲介業者ではなく、飛田新地の料理組合加盟料亭が直接運営する公式求人窓口です。お店スタッフによる直接採用のため不当な紹介手数料や天引きは一切なく、売上50%バック即日日払い、完全なプライバシー保護・身バレ防止を徹底しております。
            </p>
            <div className="flex flex-col gap-2 pt-1 text-xs">
              <button
                onClick={() => {
                  onChangeTab('about');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="text-left text-secondary font-bold hover:underline flex items-center gap-1 cursor-pointer"
              >
                <LucideIcon name="ShieldCheck" size={13} />
                <span>運営者情報・店舗体制（独立専用ページ）</span>
              </button>
              <button
                onClick={() => setActiveModal('policy')}
                className="text-left text-secondary font-bold hover:underline flex items-center gap-1 cursor-pointer"
              >
                <LucideIcon name="FileCheck" size={13} />
                <span>求人情報掲載ポリシーと安全規約（要約）</span>
              </button>
            </div>
          </div>

        </div>

        {/* Topic Cluster Spoke Directory (SEO & LLMO Core Reciprocal Linking) */}
        <div className="py-6 border-t border-rose-100/60 mb-8">
          <div className="flex items-center gap-2 mb-3">
            <LucideIcon name="Network" size={15} className="text-secondary" />
            <h5 className="font-display font-bold text-on-surface text-xs uppercase tracking-wider">
              飛田新地求人 トピッククラスター専門分野（公式12テーマ）
            </h5>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 text-xs">
            {[
              { id: 'job', name: '🍵 仕事内容', path: '/job' },
              { id: 'salary', name: '💰 給料・待遇', path: '/salary' },
              { id: 'beginner', name: '🔰 未経験スタート', path: '/beginner' },
              { id: 'experienced', name: '👑 経験者・移籍', path: '/experienced' },
              { id: 'requirements', name: '📋 募集要項スペック', path: '/requirements' },
              { id: 'flow', name: '🌸 面接・体入の流れ', path: '/flow' },
              { id: 'workstyle', name: '⏰ 自由な働き方', path: '/workstyle' },
              { id: 'shops', name: '🏮 お店選び・通り比較', path: '/shops' },
              { id: 'dorm', name: '🏠 個室寮・出稼ぎ', path: '/dorm' },
              { id: 'safety', name: '🤫 身バレ・安全管理', path: '/safety' },
              { id: 'faq', name: '💡 よくある質問 (119問)', path: '/faq' },
              { id: 'blog', name: '📚 お仕事コラム (100本超)', path: '/blog' },
            ].map((topic) => (
              <a
                key={topic.id}
                href={topic.path}
                onClick={(e) => {
                  e.preventDefault();
                  if (topic.id === 'faq') {
                    onChangeTab('faq');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  } else if (topic.id === 'blog') {
                    onChangeTab('blog');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  } else if (onNavigateTopic) {
                    onNavigateTopic(topic.id);
                  } else {
                    onChangeTab('recruit');
                    onScrollToSection('recruit-hub');
                  }
                }}
                className="p-2 rounded-xl bg-white hover:bg-rose-50 border border-gray-200/70 hover:border-rose-300 text-zinc-700 hover:text-rose-700 font-medium transition-colors block text-center truncate"
              >
                {topic.name}
              </a>
            ))}
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
              <p><strong>1. 法令遵守と健全性の徹底（20歳以上完全限定）</strong><br />料理組合規約およびコンプライアンス管理に基づき、20歳未満（18歳・19歳・高校生含む）の就労を固く禁じております（※2022年の成人年齢引き下げ後も20歳未満不可を徹底）。本籍地記載の住民票原本等による厳正な身分証確認を行い、違法行為・反社会的勢力との関わりを一切排除しています。</p>
              <p><strong>2. 虚偽・誇大広告の禁止と一次情報の明示</strong><br />当サイトの掲載情報は、お店の求人担当スタッフへの直接ヒアリングと実際の募集条件をもとに作成しています。「誰でも日給30万円」などの誇大表記は行わず、料亭組合規約に基づいた正確な給与計算（売上50%バック即日全額日払い）と実態に即した一次情報を掲載し、条件変更時は随時更新を行っています。</p>
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
              <p><strong>運営組織：</strong>飛田新地料亭 店舗採用・女性サポートチーム（直営公式窓口）</p>
              <p><strong>店舗所在地：</strong>大阪府大阪市西成区山王（飛田新地料理組合加盟料亭）</p>
              <p><strong>求人責任者：</strong>女性サポート統括担当 さくら（歴8年） / 採用マネージャー 木村（歴12年）</p>
              <p><strong>個人情報保護：</strong>ご相談・ご応募時のLINE情報や個人情報は、店舗見学・面接連絡にのみ厳重に使用し、第三者への開示・販売は一切行いません。</p>
              <p><strong>身バレ防止対策：</strong>Webサイト・SNS等への写真掲載は全面禁止されており一切行われません。</p>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
}

