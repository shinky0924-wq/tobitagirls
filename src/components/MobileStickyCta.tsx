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
  isWorkstylePage?: boolean;
  isShopsPage?: boolean;
}

export default function MobileStickyCta({
  isSalaryPage,
  isBeginnerPage,
  isExperiencedPage,
  isWorkstylePage,
  isShopsPage,
}: MobileStickyCtaProps) {
  const scrollToAnchor = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = 68;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const offsetPosition = elementRect - bodyRect - offset;
      window.scrollTo({
        top: Math.max(0, offsetPosition),
        behavior: 'smooth',
      });
    }
  };

  // 未経験ページ用
  if (isBeginnerPage) {
    return (
      <aside
        aria-label="未経験ナビゲーション"
        id="mobile-sticky-beginner-cta"
        className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-outline-variant shadow-[0_-2px_12px_rgba(43,35,38,0.06)] px-2 py-1.5 pb-safe md:hidden"
      >
        <div className="max-w-md mx-auto grid grid-cols-12 gap-1 items-center">
          <button
            type="button"
            onClick={() => scrollToAnchor('points')}
            className="col-span-2 py-1 flex flex-col items-center justify-center text-[10px] font-bold text-on-surface hover:text-primary transition-colors cursor-pointer"
          >
            <LucideIcon name="CheckCircle" size={14} className="text-primary mb-0.5" />
            <span className="truncate">ポイント</span>
          </button>
          <button
            type="button"
            onClick={() => scrollToAnchor('features')}
            className="col-span-2 py-1 flex flex-col items-center justify-center text-[10px] font-bold text-on-surface hover:text-primary transition-colors cursor-pointer"
          >
            <LucideIcon name="Sparkles" size={14} className="text-primary mb-0.5" />
            <span className="truncate">6つの特徴</span>
          </button>
          <button
            type="button"
            onClick={() => scrollToAnchor('first-day-flow')}
            className="col-span-2 py-1 flex flex-col items-center justify-center text-[10px] font-bold text-on-surface hover:text-primary transition-colors cursor-pointer"
          >
            <LucideIcon name="Clock" size={14} className="text-primary mb-0.5" />
            <span className="truncate">初日の流れ</span>
          </button>
          <button
            type="button"
            onClick={() => scrollToAnchor('faq')}
            className="col-span-2 py-1 flex flex-col items-center justify-center text-[10px] font-bold text-on-surface hover:text-primary transition-colors cursor-pointer"
          >
            <LucideIcon name="HelpCircle" size={14} className="text-primary mb-0.5" />
            <span className="truncate">FAQ</span>
          </button>
          <div className="col-span-4 pl-0.5">
            <a
              href={LINE_OFFICIAL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-1 bg-[#06C755] hover:bg-[#05b34c] text-white rounded-xl py-2.5 px-1.5 font-bold text-xs shadow-xs transition-colors cursor-pointer"
              id="mobile-beginner-line-btn"
            >
              <LucideIcon name="MessageCircle" size={15} className="text-white shrink-0" />
              <span className="font-bold whitespace-nowrap text-[11px]">LINE相談</span>
            </a>
          </div>
        </div>
      </aside>
    );
  }

  // 経験者・移籍ページ用
  if (isExperiencedPage) {
    return (
      <aside
        aria-label="経験者ナビゲーション"
        id="mobile-sticky-experienced-cta"
        className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-outline-variant shadow-[0_-2px_12px_rgba(43,35,38,0.06)] px-2 py-1.5 pb-safe md:hidden"
      >
        <div className="max-w-md mx-auto grid grid-cols-12 gap-1 items-center">
          <button
            type="button"
            onClick={() => scrollToAnchor('transfer-guide')}
            className="col-span-2 py-1 flex flex-col items-center justify-center text-[10px] font-bold text-on-surface hover:text-primary transition-colors cursor-pointer"
          >
            <LucideIcon name="Compass" size={14} className="text-primary mb-0.5" />
            <span className="truncate">移籍案内</span>
          </button>
          <button
            type="button"
            onClick={() => scrollToAnchor('comparison')}
            className="col-span-2 py-1 flex flex-col items-center justify-center text-[10px] font-bold text-on-surface hover:text-primary transition-colors cursor-pointer"
          >
            <LucideIcon name="Scale" size={14} className="text-primary mb-0.5" />
            <span className="truncate">5業種比較</span>
          </button>
          <button
            type="button"
            onClick={() => scrollToAnchor('merit-other-shop')}
            className="col-span-2 py-1 flex flex-col items-center justify-center text-[10px] font-bold text-on-surface hover:text-primary transition-colors cursor-pointer"
          >
            <LucideIcon name="Building2" size={14} className="text-primary mb-0.5" />
            <span className="truncate">他店移籍</span>
          </button>
          <button
            type="button"
            onClick={() => scrollToAnchor('faq')}
            className="col-span-2 py-1 flex flex-col items-center justify-center text-[10px] font-bold text-on-surface hover:text-primary transition-colors cursor-pointer"
          >
            <LucideIcon name="HelpCircle" size={14} className="text-primary mb-0.5" />
            <span className="truncate">FAQ</span>
          </button>
          <div className="col-span-4 pl-0.5">
            <a
              href={LINE_OFFICIAL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-1 bg-[#06C755] hover:bg-[#05b34c] text-white rounded-xl py-2.5 px-1.5 font-bold text-xs shadow-xs transition-colors cursor-pointer"
              id="mobile-experienced-line-btn"
            >
              <LucideIcon name="MessageCircle" size={15} className="text-white shrink-0" />
              <span className="font-bold whitespace-nowrap text-[11px]">LINE相談</span>
            </a>
          </div>
        </div>
      </aside>
    );
  }

  // 働き方・勤務シフトページ用
  if (isWorkstylePage) {
    return (
      <aside
        aria-label="働き方ナビゲーション"
        id="mobile-sticky-workstyle-cta"
        className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-outline-variant shadow-[0_-2px_12px_rgba(43,35,38,0.06)] px-2 py-1.5 pb-safe md:hidden"
      >
        <div className="max-w-md mx-auto grid grid-cols-12 gap-1 items-center">
          <button
            type="button"
            onClick={() => scrollToAnchor('shifts')}
            className="col-span-2 py-1 flex flex-col items-center justify-center text-[10px] font-bold text-on-surface hover:text-primary transition-colors cursor-pointer"
          >
            <LucideIcon name="Clock" size={14} className="text-primary mb-0.5" />
            <span className="truncate">5つのシフト</span>
          </button>
          <button
            type="button"
            onClick={() => scrollToAnchor('section-daytime')}
            className="col-span-2 py-1 flex flex-col items-center justify-center text-[10px] font-bold text-on-surface hover:text-primary transition-colors cursor-pointer"
          >
            <LucideIcon name="Sun" size={14} className="text-primary mb-0.5" />
            <span className="truncate">朝・昼</span>
          </button>
          <button
            type="button"
            onClick={() => scrollToAnchor('section-evening')}
            className="col-span-2 py-1 flex flex-col items-center justify-center text-[10px] font-bold text-on-surface hover:text-primary transition-colors cursor-pointer"
          >
            <LucideIcon name="Moon" size={14} className="text-primary mb-0.5" />
            <span className="truncate">夕方・夜</span>
          </button>
          <button
            type="button"
            onClick={() => scrollToAnchor('workstyle-faq')}
            className="col-span-2 py-1 flex flex-col items-center justify-center text-[10px] font-bold text-on-surface hover:text-primary transition-colors cursor-pointer"
          >
            <LucideIcon name="HelpCircle" size={14} className="text-primary mb-0.5" />
            <span className="truncate">FAQ</span>
          </button>
          <div className="col-span-4 pl-0.5">
            <a
              href={LINE_OFFICIAL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-1 bg-[#06C755] hover:bg-[#05b34c] text-white rounded-xl py-2.5 px-1.5 font-bold text-xs shadow-xs transition-colors cursor-pointer"
              id="mobile-workstyle-line-btn"
            >
              <LucideIcon name="MessageCircle" size={15} className="text-white shrink-0" />
              <span className="font-bold whitespace-nowrap text-[11px]">LINE相談</span>
            </a>
          </div>
        </div>
      </aside>
    );
  }

  // お店選びページ用
  if (isShopsPage) {
    return (
      <aside
        aria-label="お店選びナビゲーション"
        id="mobile-sticky-shops-cta"
        className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-outline-variant shadow-[0_-2px_12px_rgba(43,35,38,0.06)] px-2 py-1.5 pb-safe md:hidden"
      >
        <div className="max-w-md mx-auto grid grid-cols-12 gap-1 items-center">
          <button
            type="button"
            onClick={() => scrollToAnchor('shop-points')}
            className="col-span-2 py-1 flex flex-col items-center justify-center text-[10px] font-bold text-on-surface hover:text-primary transition-colors cursor-pointer"
          >
            <LucideIcon name="Store" size={14} className="text-primary mb-0.5" />
            <span className="truncate">ポイント</span>
          </button>
          <button
            type="button"
            onClick={() => scrollToAnchor('streets-compare')}
            className="col-span-2 py-1 flex flex-col items-center justify-center text-[10px] font-bold text-on-surface hover:text-primary transition-colors cursor-pointer"
          >
            <LucideIcon name="MapPin" size={14} className="text-primary mb-0.5" />
            <span className="truncate">通り比較</span>
          </button>
          <button
            type="button"
            onClick={() => scrollToAnchor('scout-warning')}
            className="col-span-2 py-1 flex flex-col items-center justify-center text-[10px] font-bold text-on-surface hover:text-primary transition-colors cursor-pointer"
          >
            <LucideIcon name="AlertTriangle" size={14} className="text-primary mb-0.5" />
            <span className="truncate">注意点</span>
          </button>
          <button
            type="button"
            onClick={() => scrollToAnchor('shops-faq')}
            className="col-span-2 py-1 flex flex-col items-center justify-center text-[10px] font-bold text-on-surface hover:text-primary transition-colors cursor-pointer"
          >
            <LucideIcon name="HelpCircle" size={14} className="text-primary mb-0.5" />
            <span className="truncate">FAQ</span>
          </button>
          <div className="col-span-4 pl-0.5">
            <a
              href={LINE_OFFICIAL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-1 bg-[#06C755] hover:bg-[#05b34c] text-white rounded-xl py-2.5 px-1.5 font-bold text-xs shadow-xs transition-colors cursor-pointer"
              id="mobile-shops-line-btn"
            >
              <LucideIcon name="MessageCircle" size={15} className="text-white shrink-0" />
              <span className="font-bold whitespace-nowrap text-[11px]">LINE相談</span>
            </a>
          </div>
        </div>
      </aside>
    );
  }

  // 給料・待遇ページ用
  if (isSalaryPage) {
    return (
      <aside
        aria-label="給料・待遇ナビゲーション"
        id="mobile-sticky-salary-cta"
        className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-outline-variant shadow-[0_-2px_12px_rgba(43,35,38,0.06)] px-2.5 py-1.5 pb-safe md:hidden"
      >
        <div className="max-w-md mx-auto grid grid-cols-12 gap-1.5 items-center">
          <button
            type="button"
            onClick={() => scrollToAnchor('salary-top')}
            className="col-span-2 py-1.5 flex flex-col items-center justify-center text-[10px] font-bold text-on-surface hover:text-primary transition-colors cursor-pointer"
          >
            <LucideIcon name="Coins" size={15} className="text-primary mb-0.5" />
            <span>給料</span>
          </button>
          <button
            type="button"
            onClick={() => scrollToAnchor('treatment-section')}
            className="col-span-2 py-1.5 flex flex-col items-center justify-center text-[10px] font-bold text-on-surface hover:text-primary transition-colors cursor-pointer"
          >
            <LucideIcon name="HeartHandshake" size={15} className="text-primary mb-0.5" />
            <span>待遇</span>
          </button>
          <button
            type="button"
            onClick={() => scrollToAnchor('faq-section')}
            className="col-span-2 py-1.5 flex flex-col items-center justify-center text-[10px] font-bold text-on-surface hover:text-primary transition-colors cursor-pointer"
          >
            <LucideIcon name="HelpCircle" size={15} className="text-primary mb-0.5" />
            <span>質問</span>
          </button>
          <div className="col-span-6 pl-1">
            <a
              href={LINE_OFFICIAL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-1.5 bg-[#06C755] hover:bg-[#05b34c] text-white rounded-xl py-2.5 px-3 font-bold text-xs shadow-xs transition-colors cursor-pointer"
              id="mobile-salary-line-btn"
            >
              <LucideIcon name="MessageCircle" size={16} className="text-white shrink-0" />
              <span className="font-bold whitespace-nowrap">LINEで相談</span>
            </a>
          </div>
        </div>
      </aside>
    );
  }

  // トップページ・その他ページ用：仕事・給料・要項・FAQへのクイック移動＋LINE無料相談
  return (
    <aside
      aria-label="モバイル相談メニュー"
      id="mobile-sticky-cta"
      className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-outline-variant shadow-[0_-2px_14px_rgba(43,35,38,0.08)] px-2 py-1.5 pb-safe md:hidden"
    >
      <div className="max-w-md mx-auto grid grid-cols-12 gap-1 items-center">
        <button
          type="button"
          onClick={() => scrollToAnchor('job')}
          className="col-span-2 py-1 flex flex-col items-center justify-center text-[10px] font-bold text-on-surface hover:text-primary transition-colors cursor-pointer"
        >
          <LucideIcon name="ClipboardList" size={14} className="text-primary mb-0.5" />
          <span className="truncate">仕事</span>
        </button>
        <button
          type="button"
          onClick={() => scrollToAnchor('salary')}
          className="col-span-2 py-1 flex flex-col items-center justify-center text-[10px] font-bold text-on-surface hover:text-primary transition-colors cursor-pointer"
        >
          <LucideIcon name="Coins" size={14} className="text-primary mb-0.5" />
          <span className="truncate">給料</span>
        </button>
        <button
          type="button"
          onClick={() => scrollToAnchor('requirements')}
          className="col-span-2 py-1 flex flex-col items-center justify-center text-[10px] font-bold text-on-surface hover:text-primary transition-colors cursor-pointer"
        >
          <LucideIcon name="FileText" size={14} className="text-primary mb-0.5" />
          <span className="truncate">要項</span>
        </button>
        <button
          type="button"
          onClick={() => scrollToAnchor('faq-preview')}
          className="col-span-2 py-1 flex flex-col items-center justify-center text-[10px] font-bold text-on-surface hover:text-primary transition-colors cursor-pointer"
        >
          <LucideIcon name="HelpCircle" size={14} className="text-primary mb-0.5" />
          <span className="truncate">FAQ</span>
        </button>
        <div className="col-span-4 pl-0.5">
          <a
            href={LINE_OFFICIAL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-1 bg-[#06C755] hover:bg-[#05b34c] active:bg-[#049b42] text-white rounded-xl py-2.5 px-1.5 font-bold text-xs shadow-xs transition-colors cursor-pointer select-none"
            id="mobile-cta-line-btn"
          >
            <LucideIcon name="MessageCircle" size={15} className="text-white shrink-0" />
            <span className="whitespace-nowrap text-[11px]">LINE相談</span>
          </a>
        </div>
      </div>
    </aside>
  );
}
