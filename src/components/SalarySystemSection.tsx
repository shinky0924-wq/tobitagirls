/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import LucideIcon from './LucideIcon';

interface SalarySystemSectionProps {
  onNavigateSalary?: () => void;
}

const COURSE_PAYOUT_ROWS = [
  { course: '15分コース', customerPrice: '11,000円', payout: '5,000円', note: '一番標準的な短時間コース' },
  { course: '20分コース', customerPrice: '16,000円', payout: '7,500円', note: 'ゆったり対応の基本コース' },
  { course: '30分コース', customerPrice: '21,000円', payout: '10,000円', note: '会話と時間をしっかり取れる枠' },
  { course: '45分コース', customerPrice: '31,000円', payout: '15,000円', note: '落ち着いて接客できるコース' },
  { course: '60分コース', customerPrice: '41,000円', payout: '20,000円', note: 'ロングコース' },
  { course: '外国人客対応手当', customerPrice: '対象コース', payout: '+2,500円／1組', note: '対象接客1組ごとに加算' },
];

export default function SalarySystemSection({ onNavigateSalary }: SalarySystemSectionProps) {
  return (
    <section
      id="salary"
      className="py-16 md:py-24 bg-surface border-b border-outline-variant/60"
      aria-labelledby="salary-heading"
    >
      <div className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-14">
          <span className="text-xs font-bold tracking-widest text-primary uppercase block mb-2">
            SALARY SYSTEM
          </span>
          <h2
            id="salary-heading"
            className="font-display font-bold text-2xl sm:text-3xl md:text-[34px] text-on-surface leading-snug mb-3 text-balance"
          >
            給料・報酬システム
          </h2>
          <p className="font-sans text-sm sm:text-[15px] text-on-surface-variant leading-relaxed">
            報酬は明朗な完全歩合制（売上50％バック）です。計算方法と支払いのタイミングを事前にオープンにお伝えしています。
          </p>
        </div>

        {/* 3 Core Salary Principles */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 mb-8">
          <div className="rounded-2xl bg-white p-5 border border-outline-variant">
            <div className="flex items-center gap-2 text-primary font-bold text-xs mb-1.5">
              <LucideIcon name="Percent" size={16} />
              <span>BACK RATE</span>
            </div>
            <div className="font-display font-bold text-lg text-on-surface mb-1">
              売上50％完全バック
            </div>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              料亭直営のため紹介手数料の中抜きはありません。チップをいただいた場合も全額あなたのものになります。
            </p>
          </div>

          <div className="rounded-2xl bg-white p-5 border border-outline-variant">
            <div className="flex items-center gap-2 text-primary font-bold text-xs mb-1.5">
              <LucideIcon name="Banknote" size={16} />
              <span>DAILY PAYOUT</span>
            </div>
            <div className="font-display font-bold text-lg text-on-surface mb-1">
              退勤時に毎回全額現金日払い
            </div>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              日払いの上限設定や翌月繰り越しはなく、その日の勤務終了後に手取り額の全額を現金でお渡しします。
            </p>
          </div>

          <div className="rounded-2xl bg-white p-5 border border-outline-variant">
            <div className="flex items-center gap-2 text-primary font-bold text-xs mb-1.5">
              <LucideIcon name="ShieldCheck" size={16} />
              <span>NO DEDUCTIONS</span>
            </div>
            <div className="font-display font-bold text-lg text-on-surface mb-1">
              雑費天引き・罰金なし
            </div>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              ロッカー代・更衣室代・衣装代・宣伝費などの名目による天引きや、売上ノルマによる罰金はありません。
            </p>
          </div>
        </div>

        {/* Formula Banner */}
        <div className="rounded-2xl bg-white border border-outline-variant p-5 sm:p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-primary block mb-1">手取り計算式の目安</span>
              <p className="font-display font-bold text-base sm:text-xl text-on-surface">
                （ お客様お支払い料金 － 仲居料 1,000円 ）÷ 2 ＝ 女性の手取り
              </p>
            </div>
            <p className="text-xs text-on-surface-variant md:max-w-xs leading-relaxed">
              ※店舗や時間帯・適用コースにより計算基準が異なる部分があるため、面接時に当日の詳しい料金表をご案内します。
            </p>
          </div>
        </div>

        {/* Course Payout Table */}
        <div className="bg-white rounded-2xl border border-outline-variant overflow-hidden shadow-2xs mb-8">
          <div className="px-5 py-3.5 bg-surface-container/60 border-b border-outline-variant flex items-center justify-between">
            <h3 className="font-display font-bold text-sm sm:text-base text-on-surface">
              コース別 手取り目安一覧（売上50％バック）
            </h3>
            <span className="text-[11px] font-medium text-on-surface-variant">雑費天引き 0円</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse tabular-nums">
              <thead>
                <tr className="border-b border-outline-variant bg-surface-container-low/60 text-xs font-bold text-on-surface-variant">
                  <th className="py-3 px-4 sm:px-5">コース・項目</th>
                  <th className="py-3 px-4 sm:px-5">お客様料金目安</th>
                  <th className="py-3 px-4 sm:px-5">女性の手取り目安</th>
                  <th className="py-3 px-4 sm:px-5 hidden sm:table-cell">備考</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/60 text-[13px] sm:text-sm">
                {COURSE_PAYOUT_ROWS.map((row) => (
                  <tr key={row.course} className="hover:bg-surface-container-low/40 transition-colors">
                    <td className="py-3.5 px-4 sm:px-5 font-bold text-on-surface">{row.course}</td>
                    <td className="py-3.5 px-4 sm:px-5 text-on-surface-variant">{row.customerPrice}</td>
                    <td className="py-3.5 px-4 sm:px-5 font-bold text-primary">{row.payout}</td>
                    <td className="py-3.5 px-4 sm:px-5 text-xs text-on-surface-variant hidden sm:table-cell">{row.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Simulation Examples + Clear Disclaimer */}
        <div className="rounded-2xl bg-white border border-outline-variant p-5 sm:p-6">
          <h3 className="font-display font-bold text-sm sm:text-base text-on-surface mb-3 flex items-center gap-2">
            <LucideIcon name="Calculator" size={17} className="text-primary shrink-0" />
            <span>1日の報酬シミュレーション例（試算）</span>
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-[13px] tabular-nums">
            <div className="rounded-xl bg-surface p-4 border border-outline-variant/80">
              <div className="font-bold text-secondary mb-1">例1：短時間・副業ペース（15分コース×6本の場合）</div>
              <p className="text-on-surface-variant leading-relaxed">
                手取り 5,000円 × 6本 ＝ <strong className="text-on-surface">日給 30,000円（現金手渡し）</strong>
              </p>
            </div>
            <div className="rounded-xl bg-surface p-4 border border-outline-variant/80">
              <div className="font-bold text-secondary mb-1">例2：昼・夜シフト（15分×6本 ＋ 20分×4本の場合）</div>
              <p className="text-on-surface-variant leading-relaxed">
                30,000円 ＋ 30,000円 ＝ <strong className="text-on-surface">日給 60,000円（現金手渡し）</strong>
              </p>
            </div>
          </div>
          <p className="text-[11.5px] text-on-surface-variant mt-3.5 leading-relaxed">
            ※上記はコース単価を用いた計算例であり、固定の給与・収入を保証するものではありません。完全歩合制のため、実際の収入は適用条件・出勤時間帯・当日の来店状況によって変動します。
          </p>
        </div>

        {onNavigateSalary && (
          <div className="mt-8 text-center">
            <a
              href="/salary"
              onClick={(e) => {
                e.preventDefault();
                onNavigateSalary();
              }}
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-white bg-primary hover:bg-secondary px-6 py-3 rounded-xl shadow-xs transition-colors"
            >
              <span>給料計算シミュレーター・待遇詳細を見る</span>
              <LucideIcon name="ArrowRight" size={15} />
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
