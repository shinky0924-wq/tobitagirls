/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import LucideIcon from './LucideIcon';

interface RequirementsSectionProps {
  onNavigatePath: (path: string) => void;
}

const REQUIREMENT_ROWS = [
  {
    label: '募集窓口・運営形態',
    value: '飛田ガールズ（大阪市西成区・飛田新地料理組合加盟 料亭直営の公式求人窓口）',
    note: '外部のスカウト会社・紹介業者ではなく、お店による直接募集です。',
  },
  {
    label: '募集職種',
    value: '料亭の接客スタッフ',
    note: '玄関でのお迎えと2階和室での短時間のおもてなし接客（お酒・営業連絡なし）。',
  },
  {
    label: '応募資格',
    value: '満20歳以上の女性（未経験・ブランク歓迎／学歴・経歴不問）',
    note: '※法令遵守および飛田新地料理組合の規約により、20歳未満および高校生の方はご応募いただけません。',
  },
  {
    label: '勤務地',
    value: '大阪府大阪市西成区山王・飛田新地エリア（料亭直営店舗）',
    note: '動物園前駅 徒歩5分／新今宮駅 徒歩7分／天王寺駅・阿部野橋駅 徒歩10分。',
  },
  {
    label: '勤務時間',
    value: '10:00〜24:00（選べる5つのシフト制）',
    note: '①10:00〜16:00／②10:00〜17:00／③17:00〜24:00／④14:00〜24:00／⑤12:00〜24:00 などご相談ください。',
  },
  {
    label: '出勤日数・スタイル',
    value: '週1日〜・週末のみ・短時間・Wワーク・短期集中まで自由出勤制',
    note: 'シフトの強制や最低出勤日数のノルマはありません。',
  },
  {
    label: '給与・報酬システム',
    value: '完全歩合制・売上50％バック・即日全額現金日払い',
    note: '※完全歩合制のため、収入は出勤時間帯や来店状況等により変動します。',
  },
  {
    label: '費用・控除（天引き）',
    value: '紹介料0円・ロッカー代や雑費天引きなし・ノルマ／罰金なし',
    note: 'お給料から不透明な手数料を差し引くことはありません。',
  },
  {
    label: '必要書類',
    value: '【面接・見学時】履歴書不要・私服でOK／【体験入店・勤務開始時】本籍地記載の住民票原本 または 有効期限内の日本国パスポート ＋ 顔写真付き公的身分証明書',
    note: '※住民票は発行3ヶ月以内・マイナンバー記載なしのもの。運転免許証や保険証のみでの勤務はできません。',
  },
  {
    label: '衣装・寮・交通費',
    value: '着物・ドレス等の貸出衣装は無料／個室寮・遠方交通費は事前確認（規定あり）',
    note: '寮の空き状況・利用条件や交通費サポートの適用条件は時期や勤務予定により異なるため、応募前に必ずご確認ください。',
  },
];

export default function RequirementsSection({ onNavigatePath }: RequirementsSectionProps) {
  return (
    <section
      id="requirements"
      className="py-16 sm:py-24 bg-white border-b border-outline-variant/60"
      aria-labelledby="requirements-heading"
    >
      <div className="max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-8">
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
            募集要項
          </h2>
          <p className="text-sm sm:text-base text-on-surface-variant leading-relaxed">
            応募前に条件や必要書類をすべてご確認いただけるよう、正直かつ明確に記載しています。
          </p>
        </div>

        {/* Specification Table */}
        <div className="bg-surface rounded-2xl border border-outline-variant shadow-xs overflow-hidden">
          <dl className="divide-y divide-outline-variant/80">
            {REQUIREMENT_ROWS.map((row) => (
              <div
                key={row.label}
                className="grid grid-cols-1 md:grid-cols-12 gap-1.5 md:gap-6 px-5 py-4 sm:px-7 sm:py-5"
              >
                <dt className="md:col-span-4 text-xs sm:text-sm font-bold text-on-surface flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" aria-hidden="true" />
                  <span>{row.label}</span>
                </dt>
                <dd className="md:col-span-8 space-y-1 pl-3.5 md:pl-0">
                  <p className="text-sm font-bold text-on-surface leading-relaxed">{row.value}</p>
                  {row.note && (
                    <p className="text-xs text-on-surface-variant leading-relaxed">{row.note}</p>
                  )}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Links */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => onNavigatePath('/requirements')}
            className="inline-flex items-center gap-2 bg-white hover:bg-surface-container text-secondary border border-outline-variant font-bold text-xs sm:text-sm px-5 py-3 rounded-xl shadow-2xs transition-colors cursor-pointer"
          >
            <LucideIcon name="FileText" size={16} />
            <span>募集要項・必要書類の詳しい解説を見る</span>
            <LucideIcon name="ArrowRight" size={15} />
          </button>
          <button
            type="button"
            onClick={() => onNavigatePath('/flow')}
            className="inline-flex items-center gap-2 bg-white hover:bg-surface-container text-on-surface border border-outline-variant font-bold text-xs sm:text-sm px-5 py-3 rounded-xl shadow-2xs transition-colors cursor-pointer"
          >
            <span>面接・体験入店の詳細を見る</span>
            <LucideIcon name="ChevronRight" size={15} />
          </button>
        </div>
      </div>
    </section>
  );
}
