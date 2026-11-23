/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { LINE_OFFICIAL_URL } from '../data';
import LucideIcon from './LucideIcon';

const CAMPAIGN_IMAGE_SRC = '/images/yearend_campaign_gift_1795443786077.jpg';

const CAMPAIGN_DETAILS = [
  {
    step: '01',
    label: '特典内容',
    value: '入店祝い金 一律10万円',
    sub: '通常報酬（売上50%バック・即日日払い）とは別途支給',
  },
  {
    step: '02',
    label: '対象期間',
    value: '2026/12/01 〜 2027/01/05',
    sub: '※定員に達し次第、期間内でも終了となります',
  },
  {
    step: '03',
    label: '対象の方',
    value: '満20歳以上の女性',
    sub: '未経験・経験者・他店からの移籍も対象です',
  },
  {
    step: '04',
    label: '支給条件',
    value: '規定出勤日数あり',
    sub: '詳細はご応募前にLINEにて丁寧にご案内します',
  },
];

function SparkleStar({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M12 1.5c1.1 4.2 3.8 6.9 8 8-4.2 1.1-6.9 3.8-8 8-1.1-4.2-3.8-6.9-8-8 4.2-1.1 6.9-3.8 8-8z" />
    </svg>
  );
}

export default function YearEndCampaignSection() {
  return (
    <section
      id="campaign"
      className="relative py-12 sm:py-16 bg-gradient-to-b from-[#FFF2F6] via-[#FFF8FA] to-white border-b border-outline-variant/70 overflow-hidden"
      aria-labelledby="campaign-heading"
    >
      {/* Soft festive background glows */}
      <div
        className="absolute -top-20 -left-20 w-72 h-72 rounded-full bg-[#FCDCE8]/55 blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-24 -right-16 w-80 h-80 rounded-full bg-[#FDEFD4]/60 blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-[1140px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-white rounded-3xl border border-[#F2C7D7] shadow-[0_14px_38px_-16px_rgba(214,69,114,0.18)] overflow-hidden">
          {/* Festive Top Ribbon Header */}
          <div className="bg-gradient-to-r from-[#FDE7F0] via-[#FFF4DF] to-[#FDE7F0] border-b border-[#F3D2DE] px-5 py-3 sm:px-8 flex flex-wrap items-center justify-center sm:justify-between gap-x-4 gap-y-1">
            <div className="flex items-center gap-2 font-cute font-bold text-xs sm:text-sm text-[#B82D5C] tracking-wide">
              <SparkleStar className="w-4 h-4 text-[#E09B3E] shrink-0" />
              <span>年末年始・特別応援イベント開催中</span>
              <SparkleStar className="w-3.5 h-3.5 text-[#E65A85] shrink-0" />
            </div>
            <p className="text-[11.5px] sm:text-xs font-bold text-[#8E5B24] tabular-nums">
              2026.12.01（火）– 2027.01.05（火） · 定員に達し次第終了
            </p>
          </div>

          {/* Main 2-Column Festive Showcase */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 lg:gap-9 p-5 sm:p-8 lg:p-10 items-center">
            {/* Left: Cute Festive Visual Frame */}
            <div className="lg:col-span-6 space-y-3">
              <div className="relative bg-gradient-to-br from-[#FFF4F8] to-[#FFF9EE] p-2 sm:p-2.5 rounded-2xl border border-[#F3D1DE]">
                <div className="aspect-[16/9] w-full overflow-hidden rounded-xl bg-[#FDF2F6]">
                  <img
                    src={CAMPAIGN_IMAGE_SRC}
                    alt="年末年始の入店祝い金10万円プレゼントキャンペーンのピンクとゴールドのギフトイメージ"
                    className="w-full h-full object-cover object-center"
                    loading="eager"
                    decoding="async"
                    width={1376}
                    height={768}
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      const target = e.currentTarget;
                      target.style.display = 'none';
                    }}
                  />
                </div>
                <div className="flex items-center justify-between gap-2 pt-2.5 px-1.5 text-[11.5px] text-secondary font-cute font-bold">
                  <span className="inline-flex items-center gap-1.5">
                    <LucideIcon name="Gift" size={14} className="text-primary shrink-0" />
                    <span>年末年始にスタートする女性へ感謝の特典♡</span>
                  </span>
                  <span className="text-[11px] font-sans font-medium text-on-surface-variant shrink-0">
                    期間限定
                  </span>
                </div>
              </div>
            </div>

            {/* Right: Cute Event Offer Typography & CTA */}
            <div className="lg:col-span-6 space-y-5 text-left">
              <div className="space-y-2">
                <p className="font-cute font-bold text-sm sm:text-[15px] text-[#B83B66] flex items-center gap-1.5">
                  <svg
                    viewBox="0 0 28 26"
                    className="w-4 h-4 text-[#EC5A8D] shrink-0"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M14 24.2S2 16.5 2 8.6C2 4.7 5.1 1.8 8.7 1.8c2.2 0 4.2 1.1 5.3 2.8 1.1-1.7 3.1-2.8 5.3-2.8C22.9 1.8 26 4.7 26 8.6c0 7.9-12 15.6-12 15.6z" />
                  </svg>
                  <span>年末年始に向けて働く女性を応援！</span>
                </p>

                <h2
                  id="campaign-heading"
                  className="font-cute font-black text-on-surface leading-[1.2] text-balance"
                >
                  <span className="block text-[20px] sm:text-[24px] text-[#6E3B4B] mb-1">
                    ご入店いただいた方へ、入店祝い金
                  </span>
                  <span className="inline-flex flex-wrap items-baseline gap-x-2 gap-y-1">
                    <span className="text-[22px] sm:text-[26px] text-secondary font-bold">
                      一律
                    </span>
                    <span className="relative inline-block pb-1">
                      <span className="relative z-10 text-[42px] sm:text-[54px] tracking-tight tabular-nums bg-gradient-to-r from-[#B82D5C] via-[#EB5486] to-[#C83467] bg-clip-text text-transparent">
                        10万円
                      </span>
                      <span
                        className="absolute left-0 right-0 bottom-1 h-3 sm:h-3.5 bg-[#FCE5B6]/90 rounded-full -z-0"
                        aria-hidden="true"
                      />
                    </span>
                    <span className="inline-flex items-center gap-1 text-[20px] sm:text-[25px] text-[#6E3B4B]">
                      <span>プレゼント</span>
                      <SparkleStar className="w-5 h-5 text-[#E5A03D] inline-block" />
                    </span>
                  </span>
                </h2>
              </div>

              <p className="font-sans text-[14px] sm:text-[15px] text-on-surface-variant leading-[1.85]">
                年末年始の繁忙期に向けて新しくスタートする女性を応援するため、通常の報酬（売上50%バック・即日全額日払い）とは別に
                <strong className="font-bold text-on-surface">一律10万円の入店祝い金</strong>
                をご用意しました。未経験の方はもちろん、経験者の方や他店からの移籍をご検討中の方も対象です。
              </p>

              {/* Cute & Clear Primary Action */}
              <div className="pt-1 space-y-2.5">
                <a
                  href={LINE_OFFICIAL_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full sm:w-auto items-center justify-center gap-2.5 bg-[#06C755] hover:bg-[#05b34c] text-white font-cute font-bold text-sm sm:text-[15.5px] px-7 py-3.5 rounded-2xl shadow-sm hover:shadow-md transition-all min-h-[54px]"
                >
                  <LucideIcon
                    name="MessageCircle"
                    size={19}
                    className="fill-white text-white shrink-0"
                  />
                  <span>LINEで祝い金10万円の詳細を聞く</span>
                  <LucideIcon name="ArrowRight" size={16} className="shrink-0" />
                </a>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  ※LINEで「年末年始の祝い金について」と送るだけ！対象条件や支給時期を事前に分かりやすくご案内します。
                </p>
              </div>
            </div>
          </div>

          {/* Bottom 4-Column Event Overview & Conditions Strip */}
          <div className="bg-[#FFF9FB] border-t border-[#F4D8E2]">
            <dl className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-[#F2DAE3]">
              {CAMPAIGN_DETAILS.map((item) => (
                <div key={item.step} className="px-5 py-4 sm:px-6 sm:py-5 space-y-1">
                  <dt className="flex items-center gap-1.5 text-[11.5px] font-bold text-primary">
                    <span className="font-mono text-[11px] text-[#C98A3A]">{item.step}</span>
                    <span>{item.label}</span>
                  </dt>
                  <dd className="space-y-0.5">
                    <p className="font-cute font-bold text-[14px] sm:text-[14.5px] text-on-surface tabular-nums leading-snug">
                      {item.value}
                    </p>
                    <p className="text-[11.5px] text-on-surface-variant leading-relaxed">
                      {item.sub}
                    </p>
                  </dd>
                </div>
              ))}
            </dl>
            <div className="border-t border-[#F4DCE5] bg-[#FFF4F8]/70 px-5 py-2.5 sm:px-6 text-[11.5px] text-on-surface-variant leading-relaxed text-center sm:text-left">
              ※法令および組合規約により満20歳未満・高校生の方は応募できません。無理な勧誘や条件の後出しはありませんので、まずは確認・ご相談だけでもお気軽にお問い合わせください。
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
