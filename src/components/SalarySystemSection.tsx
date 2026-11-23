/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import LucideIcon from './LucideIcon';

interface SalarySystemSectionProps {
  onNavigateSalary?: () => void;
}

const COURSE_PAYOUT_ROWS = [
  { course: '15分コース', customerPrice: '11,000円', nakaidoFee: '1,000円', payout: '5,000円', note: '一番標準的な短時間コース' },
  { course: '20分コース', customerPrice: '16,000円', nakaidoFee: '1,000円', payout: '7,500円', note: 'ゆったり対応の基本コース' },
  { course: '30分コース', customerPrice: '21,000円', nakaidoFee: '1,000円', payout: '10,000円', note: '会話をしっかり楽しめる枠' },
  { course: '45分コース', customerPrice: '31,000円', nakaidoFee: '1,000円', payout: '15,000円', note: '落ち着いて接客できるコース' },
  { course: '60分コース', customerPrice: '41,000円', nakaidoFee: '1,000円', payout: '20,000円', note: 'ロングコース' },
  { course: '外国人客対応手当', customerPrice: '対象コース', nakaidoFee: '—', payout: '＋2,500円／1組', note: '対象接客1組ごとに加算' },
];

const SALARY_FIVE_POINTS = [
  {
    number: '01',
    title: '報酬の仕組み（売上50％バック）',
    body: '報酬は明朗な完全歩合制（売上50％バック）です。外部紹介所を挟まない料亭直営の直接募集のため、紹介手数料の中抜きはありません。',
  },
  {
    number: '02',
    title: '日払い・受け取りのタイミング',
    body: 'その日働いた分の手取り報酬は、日払い上限や翌月繰り越しなどを設けず、退勤時に毎回全額を現金でお渡しします。体験入店1日のみでも同様です。',
  },
  {
    number: '03',
    title: '控除・天引き・罰金について',
    body: 'ロッカー代・更衣室代・衣装レンタル代・宣伝費といった雑費の天引きや、売上・出勤ノルマによる罰金は一切ありません。',
  },
];

export default function SalarySystemSection({ onNavigateSalary }: SalarySystemSectionProps) {
  return (
    <section
      id="salary"
      className="py-16 md:py-24 bg-surface border-b border-outline-variant/60"
      aria-labelledby="salary-heading"
    >
      <div className="max-w-[1120px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest text-primary uppercase">
            <span className="w-4 h-px bg-primary" aria-hidden="true" />
            <span>SALARY SYSTEM</span>
            <span className="w-4 h-px bg-primary" aria-hidden="true" />
          </div>
          <h2
            id="salary-heading"
            className="font-display font-bold text-2xl sm:text-3xl md:text-[34px] text-on-surface leading-snug text-balance"
          >
            給与・報酬システム
          </h2>
          <p className="font-sans text-sm sm:text-[15px] text-on-surface-variant leading-relaxed">
            報酬の計算方法・コースごとの手取り目安・受け取りのタイミング・控除の有無まで、応募前にすべてご確認いただけるよう明確に記載しています。
          </p>
        </div>

        {/* Big Highlight Numbers Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 mb-8">
          <div className="rounded-2xl bg-white p-6 border border-outline-variant shadow-2xs text-center">
            <span className="text-[11px] font-bold tracking-widest text-primary uppercase block mb-1">
              BACK RATE
            </span>
            <div className="font-display font-extrabold text-2xl sm:text-3xl text-on-surface tabular-nums">
              売上 <span className="text-primary">50％</span> バック
            </div>
            <p className="text-xs text-on-surface-variant mt-1.5">
              料亭直営の直接採用・紹介手数料なし
            </p>
          </div>

          <div className="rounded-2xl bg-white p-6 border border-outline-variant shadow-2xs text-center">
            <span className="text-[11px] font-bold tracking-widest text-primary uppercase block mb-1">
              DAILY PAYOUT
            </span>
            <div className="font-display font-extrabold text-2xl sm:text-3xl text-on-surface tabular-nums">
              毎回 <span className="text-primary">全額現金</span> 日払い
            </div>
            <p className="text-xs text-on-surface-variant mt-1.5">
              退勤時に手取り全額をそのままお渡し
            </p>
          </div>

          <div className="rounded-2xl bg-white p-6 border border-outline-variant shadow-2xs text-center">
            <span className="text-[11px] font-bold tracking-widest text-primary uppercase block mb-1">
              DEDUCTIONS
            </span>
            <div className="font-display font-extrabold text-2xl sm:text-3xl text-on-surface tabular-nums">
              雑費天引き <span className="text-primary">0円</span>
            </div>
            <p className="text-xs text-on-surface-variant mt-1.5">
              ロッカー代・衣装代・ノルマ罰金なし
            </p>
          </div>
        </div>

        {/* 3 Narrative Policy Cards (01 / 02 / 03) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 mb-8">
          {SALARY_FIVE_POINTS.map((item) => (
            <div
              key={item.number}
              className="rounded-2xl bg-white p-5 sm:p-6 border border-outline-variant flex flex-col gap-2"
            >
              <span className="text-xs font-mono font-bold text-primary">POINT {item.number}</span>
              <h3 className="font-display font-bold text-base text-on-surface leading-snug">
                {item.title}
              </h3>
              <p className="text-xs sm:text-[13px] text-on-surface-variant leading-relaxed">
                {item.body}
              </p>
            </div>
          ))}
        </div>

        {/* 04: Formula Banner with Concrete Examples */}
        <div className="rounded-2xl bg-white border border-outline-variant p-5 sm:p-7 mb-8 space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-outline-variant/70">
            <div>
              <span className="text-xs font-mono font-bold text-primary block mb-1">
                POINT 04｜手取り計算式
              </span>
              <p className="font-display font-bold text-base sm:text-xl text-on-surface tabular-nums">
                （ お客様お支払い料金 － 仲居料 1,000円 ）÷ 2 ＝ 女性の手取り
              </p>
            </div>
            <p className="text-xs text-on-surface-variant md:max-w-xs leading-relaxed">
              ※店舗や時間帯・適用コースにより計算基準が異なる場合があるため、面接・見学時に料金表をお見せしてご説明します。
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs sm:text-[13px] tabular-nums">
            <div className="rounded-xl bg-surface p-4 border border-outline-variant/80">
              <div className="font-bold text-secondary mb-1">計算例①：15分コースの場合</div>
              <p className="text-on-surface-variant leading-relaxed">
                （ 11,000円 － 1,000円 ）÷ 2 ＝ <strong className="text-on-surface">5,000円（手取り）</strong>
              </p>
            </div>
            <div className="rounded-xl bg-surface p-4 border border-outline-variant/80">
              <div className="font-bold text-secondary mb-1">計算例②：20分コースの場合</div>
              <p className="text-on-surface-variant leading-relaxed">
                （ 16,000円 － 1,000円 ）÷ 2 ＝ <strong className="text-on-surface">7,500円（手取り）</strong>
              </p>
            </div>
          </div>
        </div>

        {/* 05: Course Payout Table */}
        <div className="bg-white rounded-2xl border border-outline-variant overflow-hidden shadow-2xs mb-8">
          <div className="px-5 py-3.5 bg-surface-container/60 border-b border-outline-variant flex items-center justify-between gap-2">
            <h3 className="font-display font-bold text-sm sm:text-base text-on-surface">
              POINT 05｜コース別 料金・手取り目安一覧
            </h3>
            <span className="text-[11px] font-medium text-on-surface-variant">雑費天引き 0円</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse tabular-nums">
              <thead>
                <tr className="border-b border-outline-variant bg-surface-container-low/60 text-xs font-bold text-on-surface-variant">
                  <th className="py-3 px-4 sm:px-5">コース・項目</th>
                  <th className="py-3 px-4 sm:px-5">お客様料金目安</th>
                  <th className="py-3 px-4 sm:px-5 hidden md:table-cell">仲居料</th>
                  <th className="py-3 px-4 sm:px-5">女性の手取り目安</th>
                  <th className="py-3 px-4 sm:px-5 hidden sm:table-cell">備考</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/60 text-[13px] sm:text-sm">
                {COURSE_PAYOUT_ROWS.map((row) => (
                  <tr key={row.course} className="hover:bg-surface-container-low/40 transition-colors">
                    <td className="py-3.5 px-4 sm:px-5 font-bold text-on-surface">{row.course}</td>
                    <td className="py-3.5 px-4 sm:px-5 text-on-surface-variant">{row.customerPrice}</td>
                    <td className="py-3.5 px-4 sm:px-5 text-on-surface-variant hidden md:table-cell">{row.nakaidoFee}</td>
                    <td className="py-3.5 px-4 sm:px-5 font-bold text-primary">{row.payout}</td>
                    <td className="py-3.5 px-4 sm:px-5 text-xs text-on-surface-variant hidden sm:table-cell">{row.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Important Non-Guarantee Transparency Note */}
        <div className="rounded-2xl bg-white border border-outline-variant p-5 sm:p-6 flex items-start gap-3">
          <LucideIcon name="Info" size={18} className="text-primary shrink-0 mt-0.5" />
          <div className="text-xs sm:text-[13px] text-on-surface-variant leading-relaxed space-y-1">
            <p className="font-bold text-on-surface">
              完全歩合制についてのご確認事項
            </p>
            <p>
              記載の手取り金額はコースごとの計算例であり、「必ずいくら稼げる」といった固定収入を保証するものではありません。実際のお給料は、出勤時間帯・曜日・来店状況・ご自身の出勤ペースによって変動します。詳しい見込みやシフトの組み方は、面接・LINE相談時に個別にご案内しています。
            </p>
          </div>
        </div>

        {onNavigateSalary && (
          <div className="mt-8 text-center">
            <a
              href="/salary#simulator"
              onClick={(e) => {
                e.preventDefault();
                onNavigateSalary();
              }}
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-white bg-primary hover:bg-secondary px-6 py-3.5 rounded-xl shadow-xs transition-colors"
            >
              <span>給料の仕組み・計算シミュレーターを詳しく見る</span>
              <LucideIcon name="ArrowRight" size={15} />
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
