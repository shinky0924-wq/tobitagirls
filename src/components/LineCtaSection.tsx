/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { LINE_OFFICIAL_URL } from '../data';
import LucideIcon from './LucideIcon';

export default function LineCtaSection() {
  return (
    <section className="py-16 md:py-20 bg-rose-50/20" id="consultation">
      <div className="max-w-[1100px] mx-auto px-4 sm:px-6">
        
        {/* =========================================================
            独立したLINE CTAセクション
           ========================================================= */}
        <div className="bg-white rounded-3xl border-2 border-[#E84B78]/30 p-6 sm:p-10 shadow-sm text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 transform translate-x-8 -translate-y-8 w-40 h-40 bg-rose-50 rounded-full blur-2xl pointer-events-none" />
          <div className="relative z-10 max-w-2xl mx-auto space-y-4">
            <span className="inline-block text-xs font-black text-[#E84B78] bg-[#FFF8F9] px-3.5 py-1 rounded-full border border-[#F3E1E6]">
              まずは気軽に質問・相談
            </span>
            
            <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-[#38242B] leading-snug">
              応募するか迷っている方も、<br className="hidden sm:inline" />
              まずはお気軽にご相談ください
            </h3>
            
            <p className="text-xs sm:text-sm text-[#66545A] leading-relaxed">
              「未経験だけど自分にできる？」「今月だけ少し稼ぎたい」「身バレ対策を詳しく知りたい」など、どんな些細な疑問やご相談も大歓迎です。女性スタッフが親身に対応いたします。
            </p>

            <div className="pt-2">
              <a
                href={LINE_OFFICIAL_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 bg-[#06C755] hover:bg-[#05b34c] text-white font-black text-sm sm:text-base px-8 py-4 rounded-2xl shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5 cursor-pointer w-full sm:w-auto min-h-[48px]"
              >
                <LucideIcon name="MessageCircle" size={22} className="text-white" />
                <span>LINEで気軽に相談する</span>
                <LucideIcon name="ArrowRight" size={18} />
              </a>
            </div>

            <div className="pt-2 text-[11px] sm:text-xs text-zinc-500 space-y-1">
              <p>24時間受付中 / 相談無料 / 無理な勧誘・引き止めは一切ありません</p>
              <p>※匿名でのご相談OK・友達追加後すぐにメッセージいただけます</p>
            </div>
          </div>
        </div>

        {/* =========================================================
            4つの安心・信頼バッジ
           ========================================================= */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-3.5 sm:gap-4 text-center">
          <div className="bg-white rounded-2xl p-4 border border-[#F3E1E6] shadow-2xs">
            <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-2">
              <LucideIcon name="ShieldCheck" size={18} />
            </div>
            <div className="font-bold text-xs text-[#38242B]">満20歳以上限定・法令遵守</div>
            <div className="text-[10px] text-zinc-500 mt-1">20歳未満就労禁止・年齢確認徹底</div>
          </div>

          <div className="bg-white rounded-2xl p-4 border border-[#F3E1E6] shadow-2xs">
            <div className="w-8 h-8 rounded-full bg-rose-50 text-[#E84B78] flex items-center justify-center mx-auto mb-2">
              <LucideIcon name="Home" size={18} />
            </div>
            <div className="font-bold text-xs text-[#38242B]">完全個室待機・安全管理</div>
            <div className="text-[10px] text-zinc-500 mt-1">全室冷暖房完備・女性専用控室</div>
          </div>

          <div className="bg-white rounded-2xl p-4 border border-[#F3E1E6] shadow-2xs">
            <div className="w-8 h-8 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto mb-2">
              <LucideIcon name="Lock" size={18} />
            </div>
            <div className="font-bold text-xs text-[#38242B]">身バレ防止・税務サポート</div>
            <div className="text-[10px] text-zinc-500 mt-1">WEB写真非公開・住民税普通徴収</div>
          </div>

          <div className="bg-white rounded-2xl p-4 border border-[#F3E1E6] shadow-2xs">
            <div className="w-8 h-8 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center mx-auto mb-2">
              <LucideIcon name="Smile" size={18} />
            </div>
            <div className="font-bold text-xs text-[#38242B]">無理な勧誘・引き止めゼロ</div>
            <div className="text-[10px] text-zinc-500 mt-1">1日体験入店のみOK・即日全額日払い</div>
          </div>
        </div>

      </div>
    </section>
  );
}
