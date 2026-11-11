/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { LINE_OFFICIAL_URL } from '../data';
import LucideIcon from './LucideIcon';

interface MobileStickyCtaProps {
  onScrollToForm?: () => void;
  isSalaryPage?: boolean;
  isBeginnerPage?: boolean;
  isExperiencedPage?: boolean;
}

export default function MobileStickyCta({ onScrollToForm, isSalaryPage, isBeginnerPage, isExperiencedPage }: MobileStickyCtaProps) {
  const scrollToAnchor = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = 65;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  // 未経験ページ用: 5項目（ポイント・6つの特徴・初日の流れ・FAQ・LINE相談）
  if (isBeginnerPage) {
    return (
      <aside 
        aria-label="未経験ナビゲーション" 
        id="mobile-sticky-beginner-cta"
        className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#F0E5EA] shadow-[0_-2px_12px_rgba(0,0,0,0.06)] px-2 py-1.5 pb-safe md:hidden transition-transform duration-300"
      >
        <div className="max-w-md mx-auto grid grid-cols-12 gap-1 items-center">
          {/* 1. ポイント */}
          <button
            type="button"
            onClick={() => scrollToAnchor('points')}
            className="col-span-2 py-1 flex flex-col items-center justify-center text-[9.5px] font-bold text-[#35313A] hover:text-[#D94B7A] transition-colors cursor-pointer"
          >
            <LucideIcon name="CheckCircle" size={14} className="text-[#D94B7A] mb-0.5" />
            <span className="truncate">ポイント</span>
          </button>

          {/* 2. 6つの特徴 */}
          <button
            type="button"
            onClick={() => scrollToAnchor('features')}
            className="col-span-2 py-1 flex flex-col items-center justify-center text-[9.5px] font-bold text-[#35313A] hover:text-[#D94B7A] transition-colors cursor-pointer"
          >
            <LucideIcon name="Sparkles" size={14} className="text-[#D94B7A] mb-0.5" />
            <span className="truncate">6つの特徴</span>
          </button>

          {/* 3. 初日の流れ */}
          <button
            type="button"
            onClick={() => scrollToAnchor('first-day-flow')}
            className="col-span-2 py-1 flex flex-col items-center justify-center text-[9.5px] font-bold text-[#35313A] hover:text-[#D94B7A] transition-colors cursor-pointer"
          >
            <LucideIcon name="Clock" size={14} className="text-[#D94B7A] mb-0.5" />
            <span className="truncate">初日の流れ</span>
          </button>

          {/* 4. FAQ */}
          <button
            type="button"
            onClick={() => scrollToAnchor('faq')}
            className="col-span-2 py-1 flex flex-col items-center justify-center text-[9.5px] font-bold text-[#35313A] hover:text-[#D94B7A] transition-colors cursor-pointer"
          >
            <LucideIcon name="HelpCircle" size={14} className="text-[#D94B7A] mb-0.5" />
            <span className="truncate">FAQ</span>
          </button>

          {/* 5. LINE相談（目立たせた主要ボタン） */}
          <div className="col-span-4 pl-0.5">
            <a
              href={LINE_OFFICIAL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-1 bg-[#06C755] hover:bg-[#05b34c] text-white rounded-xl py-2 px-1.5 font-bold text-xs shadow-xs transition-all cursor-pointer"
              id="mobile-beginner-line-btn"
            >
              <LucideIcon name="MessageCircle" size={15} className="text-white shrink-0" />
              <span className="font-extrabold whitespace-nowrap text-[11px]">LINE相談</span>
            </a>
          </div>
        </div>
      </aside>
    );
  }

  // 経験者・移籍ページ用: 5項目（解放・他業種比較・稼げる理由・FAQ・LINE相談）
  if (isExperiencedPage) {
    return (
      <aside 
        aria-label="経験者ナビゲーション" 
        id="mobile-sticky-experienced-cta"
        className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#F0E5EA] shadow-[0_-2px_12px_rgba(0,0,0,0.06)] px-2 py-1.5 pb-safe md:hidden transition-transform duration-300"
      >
        <div className="max-w-md mx-auto grid grid-cols-12 gap-1 items-center">
          {/* 1. 4つの解放 */}
          <button
            type="button"
            onClick={() => scrollToAnchor('relief')}
            className="col-span-2 py-1 flex flex-col items-center justify-center text-[9.5px] font-bold text-[#35313A] hover:text-[#D94B7A] transition-colors cursor-pointer"
          >
            <LucideIcon name="HeartHandshake" size={14} className="text-[#D94B7A] mb-0.5" />
            <span className="truncate">解放</span>
          </button>

          {/* 2. 他業種比較 */}
          <button
            type="button"
            onClick={() => scrollToAnchor('comparison')}
            className="col-span-2 py-1 flex flex-col items-center justify-center text-[9.5px] font-bold text-[#35313A] hover:text-[#D94B7A] transition-colors cursor-pointer"
          >
            <LucideIcon name="Scale" size={14} className="text-[#D94B7A] mb-0.5" />
            <span className="truncate">比較</span>
          </button>

          {/* 3. 稼げる理由 */}
          <button
            type="button"
            onClick={() => scrollToAnchor('earning-system')}
            className="col-span-2 py-1 flex flex-col items-center justify-center text-[9.5px] font-bold text-[#35313A] hover:text-[#D94B7A] transition-colors cursor-pointer"
          >
            <LucideIcon name="TrendingUp" size={14} className="text-[#D94B7A] mb-0.5" />
            <span className="truncate">稼げる理由</span>
          </button>

          {/* 4. FAQ */}
          <button
            type="button"
            onClick={() => scrollToAnchor('faq')}
            className="col-span-2 py-1 flex flex-col items-center justify-center text-[9.5px] font-bold text-[#35313A] hover:text-[#D94B7A] transition-colors cursor-pointer"
          >
            <LucideIcon name="HelpCircle" size={14} className="text-[#D94B7A] mb-0.5" />
            <span className="truncate">FAQ</span>
          </button>

          {/* 5. LINE相談（目立たせた主要ボタン） */}
          <div className="col-span-4 pl-0.5">
            <a
              href={LINE_OFFICIAL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-1 bg-[#06C755] hover:bg-[#05b34c] text-white rounded-xl py-2 px-1.5 font-bold text-xs shadow-xs transition-all cursor-pointer"
              id="mobile-experienced-line-btn"
            >
              <LucideIcon name="MessageCircle" size={15} className="text-white shrink-0" />
              <span className="font-extrabold whitespace-nowrap text-[11px]">LINE相談</span>
            </a>
          </div>
        </div>
      </aside>
    );
  }

  // 給料・待遇ページ用: 4項目の洗練されたコンパクト固定ナビゲーション（Section 14要件）
  if (isSalaryPage) {
    return (
      <aside 
        aria-label="給料・待遇ナビゲーション" 
        id="mobile-sticky-salary-cta"
        className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#F0E5EA] shadow-[0_-2px_12px_rgba(0,0,0,0.06)] px-2.5 py-1.5 pb-safe md:hidden transition-transform duration-300"
      >
        <div className="max-w-md mx-auto grid grid-cols-12 gap-1.5 items-center">
          {/* 1. 給料 */}
          <button
            type="button"
            onClick={() => scrollToAnchor('salary-top')}
            className="col-span-2 py-1.5 flex flex-col items-center justify-center text-[10px] font-bold text-[#35313A] hover:text-[#D94B7A] transition-colors cursor-pointer"
          >
            <LucideIcon name="Coins" size={15} className="text-[#D94B7A] mb-0.5" />
            <span>給料</span>
          </button>

          {/* 2. 待遇 */}
          <button
            type="button"
            onClick={() => scrollToAnchor('treatment-section')}
            className="col-span-2 py-1.5 flex flex-col items-center justify-center text-[10px] font-bold text-[#35313A] hover:text-[#D94B7A] transition-colors cursor-pointer"
          >
            <LucideIcon name="HeartHandshake" size={15} className="text-[#D94B7A] mb-0.5" />
            <span>待遇</span>
          </button>

          {/* 3. よくある質問 */}
          <button
            type="button"
            onClick={() => scrollToAnchor('faq-section')}
            className="col-span-2 py-1.5 flex flex-col items-center justify-center text-[10px] font-bold text-[#35313A] hover:text-[#D94B7A] transition-colors cursor-pointer"
          >
            <LucideIcon name="HelpCircle" size={15} className="text-[#D94B7A] mb-0.5" />
            <span>質問</span>
          </button>

          {/* 4. LINE相談（視認性を高めた主要ボタン・画面を圧迫しない設計） */}
          <div className="col-span-6 pl-1">
            <a
              href={LINE_OFFICIAL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-1.5 bg-[#06C755] hover:bg-[#05b34c] text-white rounded-xl py-2 px-3 font-bold text-xs shadow-xs transition-all cursor-pointer"
              id="mobile-salary-line-btn"
            >
              <LucideIcon name="MessageCircle" size={16} className="text-white shrink-0" />
              <span className="font-extrabold whitespace-nowrap">LINEで相談</span>
              <span className="text-[9px] bg-white/25 px-1.5 py-0.2 rounded-full font-medium">相談OK</span>
            </a>
          </div>
        </div>
      </aside>
    );
  }

  return (
    <aside 
      aria-label="モバイル相談メニュー" 
      id="mobile-sticky-cta"
      className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-rose-200/80 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] px-3 pt-2 pb-safe md:hidden transition-transform duration-300"
    >
      <div className="max-w-md mx-auto">
        <a
          href={LINE_OFFICIAL_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full flex items-center justify-center gap-2 bg-[#06c755] hover:bg-[#05b34c] active:bg-[#049b42] text-white rounded-xl py-3.5 px-4 font-sans font-extrabold text-sm shadow-md shadow-[#06c755]/25 transition-all cursor-pointer select-none"
          id="mobile-cta-line-btn"
        >
          <LucideIcon name="MessageCircle" size={20} className="fill-white text-white shrink-0" />
          <span className="truncate">LINE公式 無料相談・応募（24時間受付）</span>
        </a>
      </div>
    </aside>
  );
}
