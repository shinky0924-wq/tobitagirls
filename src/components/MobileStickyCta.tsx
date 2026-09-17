/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { LINE_OFFICIAL_URL } from '../data';
import LucideIcon from './LucideIcon';

interface MobileStickyCtaProps {
  onScrollToForm?: () => void;
}

export default function MobileStickyCta({ onScrollToForm }: MobileStickyCtaProps) {
  return (
    <aside 
      aria-label="モバイル相談メニュー" 
      id="mobile-sticky-cta"
      className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-rose-200/80 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] px-3 pt-2 pb-safe md:hidden transition-transform duration-300"
    >
      <div className="max-w-md mx-auto">
        {/* LINE official button */}
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
