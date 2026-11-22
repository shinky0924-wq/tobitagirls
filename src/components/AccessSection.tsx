/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import LucideIcon from './LucideIcon';
import { LINE_OFFICIAL_URL } from '../data';

const STATION_ROUTES = [
  {
    station: 'Osaka Metro 御堂筋線・堺筋線「動物園前駅」',
    time: '徒歩 約5分',
    detail: '2番出口から南東方向へ進み、商店街または大通り沿いからアクセスしやすい最も近い最寄り駅です。',
  },
  {
    station: 'JR大阪環状線・関西本線／南海線「新今宮駅」',
    time: '徒歩 約7分',
    detail: '関西空港や難波・大阪駅からのアクセスも良く、遠方から新幹線や飛行機でお越しの方にも便利です。',
  },
  {
    station: '各線「天王寺駅」・近鉄「大阪阿部野橋駅」',
    time: '徒歩 約10分',
    detail: 'あべのハルカスのある天王寺エリアから徒歩圏内。お買い物のついでや待ち合わせにも利用しやすい路線です。',
  },
];

export default function AccessSection() {
  return (
    <section
      id="access"
      className="py-16 sm:py-24 bg-white border-b border-outline-variant/60"
      aria-labelledby="access-heading"
    >
      <div className="max-w-[1160px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest text-primary uppercase">
            <span className="w-4 h-px bg-primary" aria-hidden="true" />
            <span>ACCESS</span>
            <span className="w-4 h-px bg-primary" aria-hidden="true" />
          </div>
          <h2
            id="access-heading"
            className="font-display font-bold text-2xl sm:text-3xl md:text-4xl text-on-surface leading-snug text-balance"
          >
            アクセス・所在地
          </h2>
          <p className="text-sm sm:text-base text-on-surface-variant leading-relaxed">
            大阪市内の主要駅から徒歩圏内に位置しています。初めてお越しの方は、最寄り駅周辺での待ち合わせ・ご案内も可能です。
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left: Clean Area Route Diagram + Address Card */}
          <div className="lg:col-span-5 bg-surface rounded-2xl border border-outline-variant p-6 flex flex-col justify-between gap-6">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-primary">
                <LucideIcon name="MapPin" size={16} />
                <span>所在地・最寄りエリア</span>
              </div>
              <p className="font-display font-bold text-lg text-on-surface">
                大阪府大阪市西成区山王（飛田新地）
              </p>
              <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                飛田新地料理組合に加盟する料亭エリア内に店舗がございます。プライバシー配慮および防犯上の理由から、詳細な番地・目印は見学・面接予約後にLINEで個別にご案内しています。
              </p>
            </div>

            {/* Clean Architectural SVG Route Schematic */}
            <div className="bg-white rounded-xl border border-outline-variant p-4">
              <svg
                viewBox="0 0 360 190"
                className="w-full h-auto"
                role="img"
                aria-label="動物園前駅・新今宮駅・天王寺駅から飛田新地エリアへの徒歩アクセス概念図"
              >
                <rect x="0" y="0" width="360" height="190" rx="10" fill="#FFF9FA" />
                {/* Connecting Paths */}
                <path
                  d="M78 46 L180 112 M180 34 L180 112 M284 46 L180 112"
                  stroke="#E5B9C7"
                  strokeWidth="2.5"
                  strokeDasharray="4 4"
                  fill="none"
                />
                {/* Station Nodes */}
                <g>
                  <rect x="14" y="18" width="128" height="36" rx="8" fill="#FFFFFF" stroke="#EFE0E5" strokeWidth="1.5" />
                  <text x="78" y="34" textAnchor="middle" fill="#2B2326" fontSize="10.5" fontWeight="700">JR・南海 新今宮駅</text>
                  <text x="78" y="48" textAnchor="middle" fill="#9D3B5E" fontSize="9.5" fontWeight="700">徒歩 約7分</text>
                </g>
                <g>
                  <rect x="122" y="10" width="116" height="36" rx="8" fill="#FFFFFF" stroke="#EFE0E5" strokeWidth="1.5" />
                  <text x="180" y="26" textAnchor="middle" fill="#2B2326" fontSize="10.5" fontWeight="700">動物園前駅</text>
                  <text x="180" y="40" textAnchor="middle" fill="#D64572" fontSize="9.5" fontWeight="700">徒歩 約5分</text>
                </g>
                <g>
                  <rect x="220" y="18" width="126" height="36" rx="8" fill="#FFFFFF" stroke="#EFE0E5" strokeWidth="1.5" />
                  <text x="283" y="34" textAnchor="middle" fill="#2B2326" fontSize="10.5" fontWeight="700">天王寺・阿部野橋駅</text>
                  <text x="283" y="48" textAnchor="middle" fill="#9D3B5E" fontSize="9.5" fontWeight="700">徒歩 約10分</text>
                </g>

                {/* Destination */}
                <g>
                  <rect x="90" y="108" width="180" height="58" rx="12" fill="#FCE8EF" stroke="#D64572" strokeWidth="1.5" />
                  <text x="180" y="132" textAnchor="middle" fill="#6E233F" fontSize="12" fontWeight="700">飛田新地エリア（山王）</text>
                  <text x="180" y="150" textAnchor="middle" fill="#5E4D53" fontSize="10">飛田ガールズ 直営料亭</text>
                </g>
              </svg>
            </div>
          </div>

          {/* Right: 3 Station Route Cards & Pre-Consultation Support */}
          <div className="lg:col-span-7 flex flex-col justify-between gap-4">
            <div className="space-y-3.5">
              {STATION_ROUTES.map((route) => (
                <div
                  key={route.station}
                  className="bg-surface rounded-2xl border border-outline-variant p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div className="space-y-1 flex-1">
                    <h3 className="font-bold text-sm sm:text-base text-on-surface">{route.station}</h3>
                    <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                      {route.detail}
                    </p>
                  </div>
                  <div className="shrink-0">
                    <span className="inline-flex items-center gap-1.5 bg-white text-primary font-bold text-xs px-3.5 py-2 rounded-xl border border-outline-variant">
                      <LucideIcon name="Footprints" size={14} />
                      <span>{route.time}</span>
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-surface-container-low rounded-2xl border border-outline-variant p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs font-bold text-secondary">
                  <LucideIcon name="Navigation" size={15} />
                  <span>待ち合わせ・遠方交通費のご相談</span>
                </div>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  道に迷いそうな場合は、事前にLINEでお伝えいただければ女性スタッフがわかりやすい待ち合わせ場所をご案内します。遠方からの交通費サポート条件についても事前にお答えします。
                </p>
              </div>
              <a
                href={LINE_OFFICIAL_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-[#06C755] hover:bg-[#05b34c] text-white font-bold text-xs px-4 py-3 rounded-xl shrink-0 transition-colors cursor-pointer"
              >
                <LucideIcon name="MessageCircle" size={16} />
                <span>アクセスをLINEで聞く</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
