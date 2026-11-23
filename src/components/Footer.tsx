/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { MouseEvent, useState, useEffect } from 'react';
import LucideIcon from './LucideIcon';
import { getStoredSiteContent } from '../siteContent';
import { FAQ_LAST_UPDATED } from '../faq100Data';
import { LINE_OFFICIAL_URL } from '../data';

interface FooterProps {
  currentTab: string;
  onChangeTab: (tab: 'recruit' | 'blog' | 'admin' | 'about' | 'compare' | 'site-compare' | 'faq' | 'cluster' | 'glossary') => void;
  onScrollToSection: (sectionId: string) => void;
  onOpenAdmin: () => void;
  onNavigateCompare?: (categorySlug?: string) => void;
  onNavigateTopic?: (topicId: string) => void;
  isAdminMode?: boolean;
}

export default function Footer({
  onChangeTab,
  onScrollToSection,
  onOpenAdmin,
  onNavigateCompare,
  onNavigateTopic,
}: FooterProps) {
  const [activeModal, setActiveModal] = useState<'policy' | 'company' | null>(null);
  const siteContent = getStoredSiteContent();
  const lastUpdated = siteContent.lastUpdated || FAQ_LAST_UPDATED;

  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      if (params.get('creator') === 'tobita' || params.get('admin') === 'true') {
        localStorage.setItem('show_admin_portal', 'true');
      }
    } catch {
      // ignore storage errors
    }
  }, []);

  const navLinks = [
    { name: '飛田ガールズの3つのお約束', action: 'section', target: '/#about' },
    { name: '選ばれる6つの理由', action: 'section', target: '/#reasons' },
    { name: '仕事内容・1日の流れ', action: 'section', target: '/#job' },
    { name: '給与・報酬システム', action: 'section', target: '/#salary' },
    { name: '待遇・福利厚生', action: 'section', target: '/#benefits' },
    { name: 'タイプ別・働き方ガイド', action: 'section', target: '/#workstyle' },
    { name: '働く場所・設備紹介', action: 'section', target: '/#environment' },
    { name: '実際に働く女性の声', action: 'section', target: '/#voice' },
    { name: 'サポート体制', action: 'section', target: '/#support' },
    { name: '応募〜勤務開始の流れ', action: 'section', target: '/#flow' },
    { name: '募集要項・アクセス', action: 'section', target: '/#requirements' },
    { name: 'よくある質問（全119問）', action: 'faq', target: '/faq' },
  ];

  const targetCategoryLinks = [
    { name: '未経験から始めたい', slug: 'beginner' },
    { name: '経験者・移籍', slug: 'experienced' },
    { name: '目標額・貯金を目指したい', slug: 'high-income' },
    { name: '週1日・土日のみ', slug: 'one-day-week' },
    { name: '短時間・Wワーク', slug: 'short-time' },
    { name: '昼シフト中心', slug: 'daytime' },
    { name: '身バレ・プライバシー配慮', slug: 'privacy' },
    { name: '寮・遠方からの相談', slug: 'short-term' },
    { name: '働き方・求人比較一覧', slug: '' },
  ];

  const handleLinkClick = (e: MouseEvent<HTMLAnchorElement>, link: typeof navLinks[0]) => {
    e.preventDefault();

    if (link.action === 'faq') {
      onChangeTab('faq');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (link.action === 'section' && link.target) {
      const hashIndex = link.target.indexOf('#');
      const sectionId = hashIndex !== -1 ? link.target.substring(hashIndex + 1) : link.target;
      onScrollToSection(sectionId);
    }
  };

  const handleCategoryLinkClick = (e: MouseEvent<HTMLAnchorElement>, slug?: string) => {
    e.preventDefault();
    if (onNavigateCompare) {
      onNavigateCompare(slug || undefined);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      if (typeof window !== 'undefined') {
        const targetUrl = slug ? `/compare/${slug}` : '/compare';
        window.history.pushState({}, '', targetUrl);
      }
      onChangeTab('compare');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-surface-container-low border-t border-outline-variant pt-14 pb-8" id="app-footer">
      <div className="max-w-[1160px] mx-auto px-6">
        {/* Upper footer grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Col 1: Logo & Operational Info */}
          <div className="space-y-4">
            <div className="space-y-1">
              <div className="text-xs font-bold text-on-surface-variant/80 uppercase tracking-wider">
                飛田新地 料亭直営の公式求人窓口
              </div>
              <div className="font-display font-extrabold text-xl text-secondary flex items-center gap-2.5 pb-1">
                <img
                  src="/favicon.png"
                  alt="飛田ガールズ アイコン"
                  className="w-7 h-7 rounded-full object-cover border border-rose-200 shadow-xs"
                  referrerPolicy="no-referrer"
                />
                <span>飛田ガールズ</span>
              </div>
            </div>
            <p className="font-sans text-xs text-on-surface-variant leading-loose">
              LINEメッセージ受付：24時間<br />
              スタッフ返信時間：10:00〜24:00<br />
              所在地：大阪府大阪市西成区山王（飛田新地料理組合加盟料亭）
            </p>
            <div>
              <a
                href={LINE_OFFICIAL_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#06C755] hover:bg-[#05b34c] text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-2xs transition-colors"
              >
                <LucideIcon name="MessageCircle" size={15} />
                <span>LINEで無料相談する</span>
              </a>
            </div>
            <div className="inline-flex items-center gap-2 text-[11px] text-on-surface-variant font-mono bg-white p-2.5 rounded-xl border border-outline-variant/80">
              <LucideIcon name="CalendarCheck" size={13} className="text-secondary" />
              <span>サイト更新日：{lastUpdated}</span>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-4">
            <h2 className="font-display font-bold text-on-surface text-sm uppercase tracking-wider flex items-center gap-1.5">
              <LucideIcon name="Layers" size={15} className="text-secondary" />
              <span>トップページ目次</span>
            </h2>
            <ul className="space-y-2 font-sans text-xs md:text-[13px]">
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

          {/* Col 3: Type Guides */}
          <div className="space-y-4">
            <h2 className="font-display font-bold text-on-surface text-sm uppercase tracking-wider">
              <a
                href="/compare"
                onClick={(e) => handleCategoryLinkClick(e)}
                className="hover:text-secondary flex items-center gap-1.5 transition-colors group cursor-pointer"
              >
                <LucideIcon name="Target" size={15} className="text-secondary" />
                <span className="group-hover:underline">タイプ別・働き方ガイド</span>
                <LucideIcon name="ChevronRight" size={13} className="text-on-surface-variant group-hover:text-secondary transition-transform group-hover:translate-x-0.5" />
              </a>
            </h2>
            <ul className="space-y-2 font-sans text-xs md:text-[13px]">
              {targetCategoryLinks.map((cat) => (
                <li key={cat.name}>
                  <a
                    href={cat.slug ? `/compare/${cat.slug}` : '/compare'}
                    onClick={(e) => handleCategoryLinkClick(e, cat.slug)}
                    className="text-on-surface-variant hover:text-secondary hover:underline transition-all block"
                  >
                    {cat.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Operator & Policy Info */}
          <div className="space-y-4">
            <h2 className="font-display font-bold text-on-surface text-sm uppercase tracking-wider flex items-center gap-1.5">
              <LucideIcon name="ShieldCheck" size={15} className="text-secondary" />
              <span>運営情報・プライバシーポリシー</span>
            </h2>
            <p className="font-sans text-xs text-on-surface-variant leading-relaxed">
              当サイト「飛田ガールズ」は、外部の紹介業者ではなく、飛田新地の料理組合加盟料亭が直接運営する公式求人窓口です。満20歳以上限定の法令遵守と個人情報保護を徹底しています。
            </p>
            <div className="flex flex-col gap-2.5 pt-1 text-xs">
              <a
                href="/about"
                onClick={(e) => {
                  e.preventDefault();
                  onChangeTab('about');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="text-left text-secondary font-bold hover:underline flex items-center gap-1.5 cursor-pointer"
              >
                <LucideIcon name="Building2" size={13} />
                <span>運営者情報・店舗体制</span>
              </a>
              <button
                type="button"
                onClick={() => setActiveModal('company')}
                className="text-left text-secondary font-bold hover:underline flex items-center gap-1.5 cursor-pointer"
              >
                <LucideIcon name="Lock" size={13} />
                <span>プライバシーポリシー（個人情報保護）</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveModal('policy')}
                className="text-left text-secondary font-bold hover:underline flex items-center gap-1.5 cursor-pointer"
              >
                <LucideIcon name="FileCheck" size={13} />
                <span>求人情報掲載ポリシーと安全規約</span>
              </button>
              <a
                href="/glossary"
                onClick={(e) => {
                  e.preventDefault();
                  onChangeTab('glossary');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="text-left text-secondary font-bold hover:underline flex items-center gap-1.5 cursor-pointer"
              >
                <LucideIcon name="BookOpen" size={13} />
                <span>飛田新地 用語集・用語辞典</span>
              </a>
            </div>
          </div>
        </div>

        {/* Topic Cluster Directory */}
        <div className="py-6 border-t border-outline-variant/70 mb-6">
          <div className="flex items-center gap-2 mb-3">
            <LucideIcon name="Compass" size={15} className="text-secondary" />
            <h2 className="font-display font-bold text-on-surface text-xs uppercase tracking-wider">
              飛田新地求人 詳細ガイド一覧
            </h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 text-xs">
            {[
              { id: 'job', name: '仕事内容', path: '/job' },
              { id: 'salary', name: '給料・待遇', path: '/salary' },
              { id: 'beginner', name: '未経験スタート', path: '/beginner' },
              { id: 'experienced', name: '経験者・移籍', path: '/experienced' },
              { id: 'requirements', name: '募集要項', path: '/requirements' },
              { id: 'flow', name: '面接・体入の流れ', path: '/flow' },
              { id: 'workstyle', name: '自由な働き方', path: '/workstyle' },
              { id: 'shops', name: 'お店選び・通り比較', path: '/shops' },
              { id: 'dorm', name: '寮・出稼ぎ相談', path: '/dekasegi' },
              { id: 'safety', name: '身バレ・安全対策', path: '/safety' },
              { id: 'faq', name: 'よくある質問', path: '/faq' },
              { id: 'compare', name: '働き方比較', path: '/compare' },
              { id: 'site-compare', name: '他業種との違い比較', path: '/site-compare' },
              { id: 'glossary', name: '専門用語集', path: '/glossary' },
              { id: 'blog', name: 'お仕事コラム', path: '/blog' },
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
                  } else if (topic.id === 'site-compare') {
                    onChangeTab('site-compare');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  } else if (topic.id === 'compare') {
                    onChangeTab('compare');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  } else if (topic.id === 'glossary') {
                    onChangeTab('glossary');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  } else if (onNavigateTopic) {
                    onNavigateTopic(topic.id);
                  } else {
                    onChangeTab('recruit');
                    onScrollToSection('recruit-guide');
                  }
                }}
                className="p-2.5 rounded-xl bg-white hover:bg-surface border border-outline-variant hover:border-primary/40 text-on-surface hover:text-primary font-medium transition-colors block text-center truncate"
              >
                {topic.name}
              </a>
            ))}
          </div>
        </div>

        {/* Lower copyright & Admin link */}
        <div className="pt-6 border-t border-outline-variant/60 flex flex-col sm:flex-row justify-between items-center gap-4 text-center">
          <p className="font-sans text-xs text-on-surface-variant">
            © Tobita Girls All Rights Reserved. 飛田ガールズ（料亭直営公式求人窓口）
          </p>
          <button
            type="button"
            onClick={onOpenAdmin}
            className="text-xs text-on-surface-variant/70 hover:text-secondary transition-all cursor-pointer flex items-center gap-1 font-mono"
            id="footer-admin-btn"
          >
            <LucideIcon name="Lock" size={12} />
            管理者画面
          </button>
        </div>
      </div>

      {/* Policy Modal */}
      {activeModal === 'policy' && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 md:p-8 max-w-lg w-full max-h-[80vh] overflow-y-auto shadow-2xl border border-outline-variant">
            <div className="flex items-center justify-between pb-4 border-b border-outline-variant mb-4">
              <h4 className="font-display font-bold text-base text-on-surface flex items-center gap-2">
                <LucideIcon name="FileCheck" className="text-secondary" size={18} />
                求人情報掲載ポリシーと安全規約
              </h4>
              <button type="button" onClick={() => setActiveModal(null)} className="text-on-surface-variant hover:text-on-surface p-1 cursor-pointer">
                <LucideIcon name="X" size={18} />
              </button>
            </div>
            <div className="text-xs text-on-surface-variant space-y-3 leading-relaxed font-sans">
              <p>
                <strong className="text-on-surface">1. 法令遵守と満20歳以上限定の徹底</strong><br />
                料理組合規約および関連法令に基づき、満20歳未満および高校生の就労を固く禁じております。体験入店・勤務開始時には、本籍地記載の住民票原本または日本国パスポート等による厳正な年齢確認を行っています。
              </p>
              <p>
                <strong className="text-on-surface">2. 誇大表記の禁止と正確な条件掲載</strong><br />
                収入を固定で保証するような誇大表記は行わず、完全歩合制の計算式（売上50％バック・退勤時全額現金日払い）と適用条件を明確に掲載しています。
              </p>
              <p>
                <strong className="text-on-surface">3. ノルマ・不当な天引きの禁止</strong><br />
                指名ノルマ・売上罰金・ロッカー代や衣装代などの不当な雑費天引きは一切行っておりません。
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Privacy Policy & Operator Modal */}
      {activeModal === 'company' && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 md:p-8 max-w-lg w-full max-h-[80vh] overflow-y-auto shadow-2xl border border-outline-variant">
            <div className="flex items-center justify-between pb-4 border-b border-outline-variant mb-4">
              <h4 className="font-display font-bold text-base text-on-surface flex items-center gap-2">
                <LucideIcon name="Lock" className="text-secondary" size={18} />
                プライバシーポリシー・運営者情報
              </h4>
              <button type="button" onClick={() => setActiveModal(null)} className="text-on-surface-variant hover:text-on-surface p-1 cursor-pointer">
                <LucideIcon name="X" size={18} />
              </button>
            </div>
            <div className="text-xs text-on-surface-variant space-y-3 leading-relaxed font-sans">
              <p><strong className="text-on-surface">運営窓口：</strong>飛田ガールズ（飛田新地料理組合加盟 料亭直営求人窓口）</p>
              <p><strong className="text-on-surface">所在地：</strong>大阪府大阪市西成区山王（飛田新地）</p>
              <p><strong className="text-on-surface">個人情報の利用目的：</strong>LINEでのご相談やお問い合わせ、見学・面接日程のご連絡、法令に基づくご本人確認および店舗管理にのみ使用し、ご本人の同意なく第三者へ開示・提供することはありません。</p>
              <p><strong className="text-on-surface">プライバシー保護方針：</strong>WebサイトやSNS等への顔写真掲載は行わず、エリア全体の撮影禁止ルールおよび完全源氏名での勤務を徹底しています。</p>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
}
