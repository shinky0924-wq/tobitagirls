/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { LINE_OFFICIAL_URL } from '../data';
import LucideIcon from './LucideIcon';

interface MobileStickyCtaProps {
  onScrollToForm: () => void;
}

export default function MobileStickyCta({ onScrollToForm }: MobileStickyCtaProps) {
  return (
    <aside 
      aria-label="モバイル相談メニュー" 
      id="mobile-sticky-cta"
      className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-rose-200/80 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] px-3 pt-2 pb-safe md:hidden transition-transform duration-300"
    >
      <div className="max-w-md mx-auto grid grid-cols-12 gap-2 items-center">
        {/* Web consultation button */}
        <button
          type="button"
          onClick={onScrollToForm}
          className="col-span-5 flex items-center justify-center gap-1.5 bg-rose-50 hover:bg-rose-100 active:bg-rose-200 text-secondary border border-rose-200 rounded-xl py-3 px-2 font-sans font-bold text-xs shadow-xs transition-all cursor-pointer select-none"
          id="mobile-cta-form-btn"
        >
          <LucideIcon name="FileText" size={16} className="text-secondary shrink-0" />
          <span className="truncate">WEB相談</span>
        </button>

        {/* LINE official button */}
        <a
          href={LINE_OFFICIAL_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="col-span-7 flex items-center justify-center gap-2 bg-[#06c755] hover:bg-[#05b34c] active:bg-[#049b42] text-white rounded-xl py-3 px-3 font-sans font-extrabold text-xs shadow-md shadow-[#06c755]/25 transition-all cursor-pointer select-none"
          id="mobile-cta-line-btn"
        >
          <LucideIcon name="MessageCircle" size={18} className="fill-white text-white shrink-0" />
          <span className="truncate">LINE無料相談 (24h)</span>
        </a>
      </div>
    </aside>
  );
}
