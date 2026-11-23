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
    note: '計算式記載の仲居料1,000円以外に不透明な手数料を差し引くことはありません。',
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
    station: 'Osaka Metro 御堂筋線・堺筋線「動物園前駅」',
    time: '徒歩 約5分',
    detail: '2番出口から南東方向へ進み、最もアクセスの近い最寄り駅です。',
  },
  {
    station: 'JR大阪環状線・関西本線／南海線「新今宮駅」',
    time: '徒歩 約7分',
    detail: '関西空港・難波・大阪駅方面から乗換しやすく、遠方の方も便利です。',
  },
  {
    station: '各線「天王寺駅」・近鉄「大阪阿部野橋駅」',
    time: '徒歩 約10分',
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
      <div className="max-w-[1040px] mx-auto px-4 sm:px-6 lg:px-8">
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

        {/* 10-Row Specification Table */}
        <div className="bg-surface rounded-2xl border border-outline-variant shadow-2xs overflow-hidden">
          <dl className="divide-y divide-outline-variant/80">
            {REQUIREMENT_ROWS.map((row) => (
              <div
                key={row.number}
                className="grid grid-cols-1 md:grid-cols-12 gap-1.5 md:gap-6 px-5 py-4 sm:px-7 sm:py-5"
              >
                <dt className="md:col-span-4 text-xs sm:text-sm font-bold text-on-surface flex items-start gap-2.5">
                  <span className="text-[11px] font-mono text-primary mt-0.5 shrink-0">
                    {row.number}
                  </span>
                  <span>{row.label}</span>
                </dt>
                <dd className="md:col-span-8 space-y-1 pl-6 md:pl-0">
                  <p className="text-sm font-bold text-on-surface leading-relaxed">{row.value}</p>
                  {row.note && (
                    <p className="text-xs text-on-surface-variant leading-relaxed">{row.note}</p>
                  )}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Links to full requirement & flow pages */}
        <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
          <a
            href="/requirements"
            onClick={(e) => {
              e.preventDefault();
              onNavigatePath('/requirements');
            }}
            className="inline-flex items-center gap-2 bg-white hover:bg-surface-container text-secondary border border-outline-variant font-bold text-xs sm:text-sm px-5 py-3 rounded-xl shadow-2xs transition-colors cursor-pointer"
          >
            <LucideIcon name="FileText" size={16} />
            <span>募集要項・必要書類の詳しい解説を見る</span>
            <LucideIcon name="ArrowRight" size={15} />
          </a>
          <a
            href="/flow"
            onClick={(e) => {
              e.preventDefault();
              onNavigatePath('/flow');
            }}
            className="inline-flex items-center gap-2 bg-white hover:bg-surface-container text-on-surface border border-outline-variant font-bold text-xs sm:text-sm px-5 py-3 rounded-xl shadow-2xs transition-colors cursor-pointer"
          >
            <span>面接・体験入店の詳細を見る</span>
            <LucideIcon name="ChevronRight" size={15} />
          </a>
        </div>

        {/* Integrated Compact Access Information (#access anchor preserved without adding a 17th section) */}
        <div id="access" className="mt-12 pt-10 border-t border-outline-variant/80">
          <div className="flex flex-col lg:flex-row gap-6 items-stretch">
            {/* Left Map & Address */}
            <div className="lg:w-5/12 bg-surface rounded-2xl border border-outline-variant p-5 flex flex-col justify-between gap-4">
              <div className="space-y-1.5">
                <div className="flex items-center gap-1.5 text-xs font-bold text-primary">
                  <LucideIcon name="MapPin" size={15} />
                  <span>勤務地・最寄り駅からのアクセス</span>
                </div>
                <p className="font-display font-bold text-base text-on-surface">
                  大阪府大阪市西成区山王（飛田新地）
                </p>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  防犯・プライバシー保護のため、詳細な目印はLINEでの見学予約後に個別でお知らせしています。
                </p>
              </div>

              <div className="bg-white rounded-xl border border-outline-variant p-3">
                <svg
                  viewBox="0 0 360 175"
                  className="w-full h-auto"
                  role="img"
                  aria-label="動物園前駅・新今宮駅・天王寺駅から飛田新地エリアへの徒歩アクセス図"
                >
                  <rect x="0" y="0" width="360" height="175" rx="8" fill="#FFF9FA" />
                  <path
                    d="M78 44 L180 104 M180 34 L180 104 M284 44 L180 104"
                    stroke="#E5B9C7"
                    strokeWidth="2"
                    strokeDasharray="4 4"
                    fill="none"
                  />
                  <rect x="14" y="16" width="126" height="34" rx="7" fill="#FFFFFF" stroke="#EFE0E5" strokeWidth="1.2" />
                  <text x="77" y="31" textAnchor="middle" fill="#2B2326" fontSize="10" fontWeight="700">JR・南海 新今宮駅</text>
                  <text x="77" y="44" textAnchor="middle" fill="#9D3B5E" fontSize="9" fontWeight="700">徒歩 約7分</text>

                  <rect x="122" y="8" width="116" height="34" rx="7" fill="#FFFFFF" stroke="#EFE0E5" strokeWidth="1.2" />
                  <text x="180" y="23" textAnchor="middle" fill="#2B2326" fontSize="10" fontWeight="700">動物園前駅</text>
                  <text x="180" y="36" textAnchor="middle" fill="#D64572" fontSize="9" fontWeight="700">徒歩 約5分</text>

                  <rect x="220" y="16" width="126" height="34" rx="7" fill="#FFFFFF" stroke="#EFE0E5" strokeWidth="1.2" />
                  <text x="283" y="31" textAnchor="middle" fill="#2B2326" fontSize="10" fontWeight="700">天王寺・阿部野橋駅</text>
                  <text x="283" y="44" textAnchor="middle" fill="#9D3B5E" fontSize="9" fontWeight="700">徒歩 約10分</text>

                  <rect x="92" y="102" width="176" height="52" rx="10" fill="#FCE8EF" stroke="#D64572" strokeWidth="1.5" />
                  <text x="180" y="125" textAnchor="middle" fill="#6E233F" fontSize="11.5" fontWeight="700">飛田新地エリア（山王）</text>
                  <text x="180" y="142" textAnchor="middle" fill="#5E4D53" fontSize="9.5">飛田ガールズ 直営料亭</text>
                </svg>
              </div>
            </div>

            {/* Right Station Routes */}
            <div className="lg:w-7/12 flex flex-col justify-between gap-3">
              {STATION_ROUTES.map((route) => (
                <div
                  key={route.station}
                  className="bg-surface rounded-2xl border border-outline-variant p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div className="space-y-1 flex-1">
                    <h3 className="font-bold text-sm text-on-surface">{route.station}</h3>
                    <p className="text-xs text-on-surface-variant leading-relaxed">{route.detail}</p>
                  </div>
                  <span className="inline-flex items-center gap-1.5 bg-white text-primary font-bold text-xs px-3 py-1.5 rounded-lg border border-outline-variant shrink-0 self-start sm:self-center tabular-nums">
                    <LucideIcon name="Footprints" size={14} />
                    <span>{route.time}</span>
                  </span>
                </div>
              ))}

              <div className="bg-surface-container-low rounded-2xl border border-outline-variant p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  道が不安な場合は、最寄り駅での待ち合わせ案内もLINEで承っています。
                </p>
                <a
                  href={LINE_OFFICIAL_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 bg-[#06C755] hover:bg-[#05b34c] text-white font-bold text-xs px-4 py-2.5 rounded-xl shrink-0 transition-colors"
                >
                  <LucideIcon name="MessageCircle" size={15} />
                  <span>道案内をLINEで聞く</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
