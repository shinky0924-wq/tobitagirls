/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import LucideIcon from './LucideIcon';
import { LINE_OFFICIAL_URL } from '../data';

interface RequirementsSectionProps {
  onNavigatePath: (path: string) => void;
}

const REQUIREMENT_ROWS = [
  {
    number: '01',
    label: '応募資格',
    value: '満20歳以上の女性（未経験・ブランク歓迎／学歴・職歴不問）',
    note: '※法令遵守および飛田新地料理組合の規約により、20歳未満および高校生の方はご応募いただけません。',
  },
  {
    number: '02',
    label: '募集窓口・雇用形態',
    value: '飛田ガールズ（料亭直営の公式求人窓口・お店による直接募集）',
    note: '外部スカウト会社や紹介仲介業者ではないため、紹介手数料・マージンは一切不要です。',
  },
  {
    number: '03',
    label: '募集職種・仕事内容',
    value: '料亭の接客スタッフ（玄関でのお迎えと2階和室での短時間おもてなし接客）',
    note: 'お酒の飲酒やお客様との連絡先交換、営業連絡はございません。',
  },
  {
    number: '04',
    label: '勤務時間・営業時間',
    value: '10:00〜24:00（昼・夕方・夜などライフスタイルに合わせたシフト制）',
    note: '例：10:00〜16:00／10:00〜17:00／17:00〜24:00／14:00〜24:00／12:00〜24:00 など調整可能です。',
  },
  {
    number: '05',
    label: '出勤日数・働き方',
    value: '週1日〜・土日祝のみ・短時間・Wワーク・短期滞在まで自由出勤制',
    note: '最低出勤日数のノルマやシフト強制はありません。',
  },
  {
    number: '06',
    label: '勤務地・最寄り駅',
    value: '大阪府大阪市西成区山王・飛田新地エリア（料亭直営店舗）',
    note: '動物園前駅 徒歩約5分／新今宮駅 徒歩約7分／天王寺駅・阿部野橋駅 徒歩約10分。',
  },
  {
    number: '07',
    label: '給与・報酬システム',
    value: '完全歩合制（売上50％バック）・退勤時の即日全額現金日払い',
    note: '※完全歩合制のため収入は出勤時間帯や来店状況により変動します。日払い上限や翌月繰越はありません。',
  },
  {
    number: '08',
    label: '控除・天引き・罰金',
    value: '紹介料0円・ロッカー代や更衣室代などの雑費天引きなし・ノルマ／罰金なし',
    note: '不透明な手数料や雑費を差し引くことはありません。',
  },
  {
    number: '09',
    label: '衣装・寮・交通費',
    value: '衣装（着物・浴衣・ドレス等）無料貸出／個室寮・交通費は事前確認制',
    note: '寮の空き状況や利用料、遠方交通費の支給条件は時期や出発地により異なるため応募前にご案内します。',
  },
  {
    number: '10',
    label: '必要書類・応募方法',
    value: '【面接・見学】履歴書不要・私服OK／【体験・勤務開始】本籍地記載の住民票原本 または 日本国パスポート ＋ 顔写真付き公的身分証明書',
    note: '公式LINEより24時間メッセージを受け付けています（スタッフ返信時間 10:00〜24:00）。',
  },
];

const STATION_ROUTES = [
  {
    id: 'dobutsuen',
    line: 'Osaka Metro 御堂筋線・堺筋線',
    station: '動物園前駅',
    time: '徒歩 約5分',
    isNearest: true,
    detail: '2番出口から南東方向へ進み、最もアクセスの近い最寄り駅です。',
  },
  {
    id: 'shinimamiya',
    line: 'JR大阪環状線・関西本線／南海線',
    station: '新今宮駅',
    time: '徒歩 約7分',
    isNearest: false,
    detail: '関西空港・難波・大阪駅方面から乗換しやすく、遠方の方も便利です。',
  },
  {
    id: 'tennoji',
    line: 'JR・Osaka Metro 各線／近鉄南大阪線',
    station: '天王寺駅・大阪阿部野橋駅',
    time: '徒歩 約10分',
    isNearest: false,
    detail: 'ショッピングやお出かけついで、待ち合わせにも利用しやすい主要駅です。',
  },
];

export default function RequirementsSection({ onNavigatePath }: RequirementsSectionProps) {
  return (
    <section
      id="requirements"
      className="py-16 md:py-24 bg-white border-b border-outline-variant/60"
      aria-labelledby="requirements-heading"
    >
      <div className="max-w-[1060px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest text-primary uppercase">
            <span className="w-4 h-px bg-primary" aria-hidden="true" />
            <span>REQUIREMENTS</span>
            <span className="w-4 h-px bg-primary" aria-hidden="true" />
          </div>
          <h2
            id="requirements-heading"
            className="font-display font-bold text-2xl sm:text-3xl md:text-4xl text-on-surface leading-snug text-balance"
          >
            飛田ガールズの募集要項
          </h2>
          <p className="text-sm sm:text-base text-on-surface-variant leading-relaxed">
            応募前に条件や必要書類、勤務地まですべてご確認いただけるよう、10項目に整理して明確に記載しています。
          </p>
        </div>

        {/* 10-Row Specification Table with Clear Label/Value Split */}
        <div className="bg-white rounded-2xl border border-[#EACBD6] shadow-2xs overflow-hidden">
          <div className="px-5 py-3.5 sm:px-7 bg-[#FFF6F9] border-b border-[#EFE0E5] flex flex-wrap items-center justify-between gap-2">
            <h3 className="font-display font-bold text-sm sm:text-[15px] text-on-surface">
              基本情報・採用条件（全10項目）
            </h3>
            <span className="text-xs font-semibold text-secondary">
              店舗直営・直接募集
            </span>
          </div>

          <dl className="divide-y divide-[#EFE0E5]">
            {REQUIREMENT_ROWS.map((row) => (
              <div
                key={row.number}
                className="grid grid-cols-1 md:grid-cols-12"
              >
                <dt className="md:col-span-4 bg-[#FFF9FB] md:border-r border-[#EFE0E5] px-5 pt-4 pb-2 md:py-5 sm:px-6 text-xs sm:text-sm font-bold text-on-surface flex items-start gap-2.5">
                  <span className="text-[11px] font-mono font-bold text-primary mt-0.5 shrink-0 tabular-nums">
                    {row.number}
                  </span>
                  <span>{row.label}</span>
                </dt>
                <dd className="md:col-span-8 bg-white px-5 pt-2 pb-4 md:py-5 sm:px-7 space-y-1.5">
                  <p className="text-sm font-bold text-on-surface leading-relaxed">
                    {row.value}
                  </p>
                  {row.note && (
                    <p className="text-xs text-on-surface-variant leading-relaxed">
                      {row.note}
                    </p>
                  )}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Links to full requirement & flow pages */}
        <div className="mt-7 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3">
          <a
            href="/requirements"
            onClick={(e) => {
              e.preventDefault();
              onNavigatePath('/requirements');
            }}
            className="inline-flex items-center justify-center gap-2 bg-[#FFF6F9] hover:bg-surface-container text-secondary border border-[#E7C2D0] hover:border-primary/50 font-bold text-xs sm:text-sm px-6 py-3.5 rounded-xl shadow-2xs transition-colors cursor-pointer min-h-[48px]"
          >
            <LucideIcon name="FileText" size={16} className="text-primary shrink-0" />
            <span>募集要項・必要書類の詳しい解説を見る</span>
            <LucideIcon name="ArrowRight" size={15} className="shrink-0" />
          </a>
          <a
            href="/flow"
            onClick={(e) => {
              e.preventDefault();
              onNavigatePath('/flow');
            }}
            className="inline-flex items-center justify-center gap-2 bg-white hover:bg-surface-container text-on-surface border border-outline-variant hover:border-primary/40 font-bold text-xs sm:text-sm px-6 py-3.5 rounded-xl shadow-2xs transition-colors cursor-pointer min-h-[48px]"
          >
            <span>面接・体験入店の詳細を見る</span>
            <LucideIcon name="ChevronRight" size={15} className="shrink-0" />
          </a>
        </div>

        {/* Unified, Clean Access Panel (#access) */}
        <div id="access" className="mt-12 sm:mt-14">
          <div className="bg-white rounded-2xl border border-[#EACBD6] shadow-2xs overflow-hidden">
            {/* Access Panel Header */}
            <div className="px-5 py-4 sm:px-7 sm:py-5 bg-[#FFF6F9] border-b border-[#EFE0E5] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <LucideIcon name="MapPin" size={18} className="text-primary shrink-0" />
                <h3 className="font-display font-bold text-base sm:text-lg text-on-surface">
                  勤務地・最寄り駅からのアクセス
                </h3>
              </div>
              <p className="text-xs sm:text-sm font-bold text-secondary">
                大阪府大阪市西成区山王（飛田新地エリア）
              </p>
            </div>

            {/* Main 2-Column Body (No Nested Card-in-Card Clutter) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
              {/* Left: Clean Visual Route Diagram */}
              <div className="lg:col-span-5 p-5 sm:p-7 bg-[#FFFBFD] border-b lg:border-b-0 lg:border-r border-[#EFE0E5] flex flex-col justify-between gap-4">
                <div className="space-y-1">
                  <p className="text-xs font-bold text-primary">
                    3路線・3主要駅から徒歩圏内
                  </p>
                  <p className="text-xs text-on-surface-variant leading-relaxed">
                    難波・天王寺・関西空港方面からもアクセスしやすく、お仕事帰りのお買い物にも便利な立地です。
                  </p>
                </div>

                {/* Crisp Access Route Diagram */}
                <div className="rounded-xl bg-white border border-[#EFE0E5] p-3">
                  <svg
                    viewBox="0 0 400 220"
                    className="w-full h-auto"
                    role="img"
                    aria-label="動物園前駅・新今宮駅・天王寺駅から飛田新地エリアへの徒歩アクセス図"
                  >
                    <rect x="0" y="0" width="400" height="220" rx="10" fill="#FFF9FB" />

                    {/* Route Lines */}
                    <path
                      d="M72 68 L178 136"
                      stroke="#DFB3C3"
                      strokeWidth="2.2"
                      strokeDasharray="5 4"
                      fill="none"
                    />
                    <path
                      d="M200 62 L200 132"
                      stroke="#D64572"
                      strokeWidth="2.5"
                      fill="none"
                    />
                    <path
                      d="M328 68 L222 136"
                      stroke="#DFB3C3"
                      strokeWidth="2.2"
                      strokeDasharray="5 4"
                      fill="none"
                    />

                    {/* Station 1: 新今宮駅 */}
                    <rect x="14" y="22" width="118" height="48" rx="9" fill="#FFFFFF" stroke="#E8CFD8" strokeWidth="1.3" />
                    <text x="73" y="42" textAnchor="middle" fill="#2B2326" fontSize="11.5" fontWeight="700">
                      新今宮駅
                    </text>
                    <text x="73" y="59" textAnchor="middle" fill="#9D3B5E" fontSize="10.5" fontWeight="700">
                      徒歩 約7分
                    </text>

                    {/* Station 2: 動物園前駅 (Nearest Highlight) */}
                    <rect x="141" y="14" width="118" height="50" rx="9" fill="#FCE8EF" stroke="#D64572" strokeWidth="1.6" />
                    <text x="200" y="35" textAnchor="middle" fill="#6E233F" fontSize="12" fontWeight="700">
                      動物園前駅
                    </text>
                    <text x="200" y="53" textAnchor="middle" fill="#D64572" fontSize="11" fontWeight="700">
                      最短 徒歩約5分
                    </text>

                    {/* Station 3: 天王寺・阿部野橋駅 */}
                    <rect x="268" y="22" width="118" height="48" rx="9" fill="#FFFFFF" stroke="#E8CFD8" strokeWidth="1.3" />
                    <text x="327" y="42" textAnchor="middle" fill="#2B2326" fontSize="11" fontWeight="700">
                      天王寺・阿部野橋
                    </text>
                    <text x="327" y="59" textAnchor="middle" fill="#9D3B5E" fontSize="10.5" fontWeight="700">
                      徒歩 約10分
                    </text>

                    {/* Center Pin Dot */}
                    <circle cx="200" cy="134" r="5" fill="#D64572" />

                    {/* Destination Block */}
                    <rect x="86" y="138" width="228" height="64" rx="12" fill="#FFFFFF" stroke="#D64572" strokeWidth="1.8" />
                    <text x="200" y="164" textAnchor="middle" fill="#2B2326" fontSize="13.5" fontWeight="700">
                      飛田新地エリア（山王）
                    </text>
                    <text x="200" y="185" textAnchor="middle" fill="#9D3B5E" fontSize="11" fontWeight="600">
                      飛田ガールズ 直営料亭
                    </text>
                  </svg>
                </div>

                <p className="text-[11.5px] text-on-surface-variant leading-relaxed">
                  ※防犯・プライバシー保護のため、詳細な場所・目印はLINEでの見学予約後に個別でお知らせしています。
                </p>
              </div>

              {/* Right: Clean Hairline-Separated Station List */}
              <div className="lg:col-span-7 flex flex-col justify-between bg-white">
                <ul className="divide-y divide-[#EFE0E5] flex-1">
                  {STATION_ROUTES.map((route) => (
                    <li
                      key={route.id}
                      className="px-5 py-5 sm:px-7 sm:py-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                    >
                      <div className="space-y-1 flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-[11.5px] font-semibold text-on-surface-variant">
                          <span>{route.line}</span>
                          {route.isNearest && (
                            <>
                              <span aria-hidden="true">·</span>
                              <span className="text-primary font-bold">最寄り駅</span>
                            </>
                          )}
                        </div>
                        <h4 className="font-display font-bold text-base text-on-surface">
                          {route.station}
                        </h4>
                        <p className="text-xs sm:text-[13px] text-on-surface-variant leading-relaxed">
                          {route.detail}
                        </p>
                      </div>

                      <div className="flex items-center gap-1.5 text-sm sm:text-[15px] font-bold text-primary shrink-0 tabular-nums sm:pl-4">
                        <LucideIcon name="Footprints" size={16} className="shrink-0" />
                        <span>{route.time}</span>
                      </div>
                    </li>
                  ))}
                </ul>

                {/* Integrated Bottom Guidance & LINE Action Strip */}
                <div className="px-5 py-4 sm:px-7 sm:py-5 bg-[#FFF6F9] border-t border-[#EFE0E5] flex flex-col sm:flex-row sm:items-center justify-between gap-3.5">
                  <div className="space-y-0.5">
                    <p className="text-xs sm:text-[13px] font-bold text-on-surface">
                      駅からの道が不安な方もご安心ください
                    </p>
                    <p className="text-xs text-on-surface-variant leading-relaxed">
                      最寄り駅での待ち合わせや道案内もLINEで承っています。
                    </p>
                  </div>
                  <a
                    href={LINE_OFFICIAL_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 bg-[#06C755] hover:bg-[#05b34c] text-white font-bold text-xs sm:text-[13px] px-5 py-3 rounded-xl shadow-xs hover:shadow-sm shrink-0 transition-all whitespace-nowrap min-h-[44px]"
                  >
                    <LucideIcon name="MessageCircle" size={16} className="fill-white text-white shrink-0" />
                    <span>道案内をLINEで聞く</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
