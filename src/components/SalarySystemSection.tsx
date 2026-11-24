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
  { course: '外国人客対応手当', customerPrice: '5,000円', nakaidoFee: '—', payout: '2,500円', note: '対象接客1組ごとに加算' },
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

const INCOME_EXAMPLES = [
  {
    caseNo: 'CASE 01',
    title: '週末・Wワークでマイペースに',
    shift: '週2日（月8日ほど）・1日5時間目安',
    dailyEstimate: '約4.5万〜5.5万円',
    monthlyEstimate: '約36万〜44万円',
    detail: '本業や学業と両立しながら、土日や空き時間だけで無理なくプラス収入を目指す働き方です。',
  },
  {
    caseNo: 'CASE 02',
    title: '週3〜4日・昼シフトでバランス良く',
    shift: '週3〜4日（月14日ほど）・1日6〜7時間目安',
    dailyEstimate: '約6万〜7万円',
    monthlyEstimate: '約84万〜98万円',
    detail: '夕方までに退勤して生活リズムを保ちながら、しっかり貯金も叶えたい方に選ばれる定番スタイルです。',
  },
  {
    caseNo: 'CASE 03',
    title: '短期集中でしっかり目標額を目指す',
    shift: '週5日（月20日ほど）・1日7〜8時間目安',
    dailyEstimate: '約7万〜8.5万円',
    monthlyEstimate: '約140万〜170万円',
    detail: '引っ越し資金・留学・貯金目標など、期間を決めてしっかり収入を積み上げたい方向けのペースです。',
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
            コースごとの手取り目安・働き方別の収入例・受け取りのタイミング・控除の有無まで、応募前にすべてご確認いただけるよう明確に記載しています。
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

        {/* 04: Course Payout Table */}
        <div className="bg-white rounded-2xl border border-outline-variant overflow-hidden shadow-2xs mb-8">
          <div className="px-5 py-3.5 bg-surface-container/60 border-b border-outline-variant flex items-center justify-between gap-2">
            <h3 className="font-display font-bold text-sm sm:text-base text-on-surface">
              POINT 04｜コース別 料金・手取り目安一覧
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

        {/* 05: 3 Income Examples */}
        <div className="bg-white rounded-2xl border border-outline-variant overflow-hidden shadow-2xs mb-8">
          <div className="px-5 py-3.5 bg-surface-container/60 border-b border-outline-variant flex items-center justify-between gap-2">
            <h3 className="font-display font-bold text-sm sm:text-base text-on-surface">
              POINT 05｜働き方別の収入例（3パターン）
            </h3>
            <span className="text-[11px] font-medium text-on-surface-variant">全額現金日払い</span>
          </div>

          <div className="p-5 sm:p-6 grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-5 items-stretch">
            {INCOME_EXAMPLES.map((example) => (
              <div
                key={example.caseNo}
                className="rounded-xl bg-surface border border-outline-variant/85 p-5 flex flex-col justify-between gap-4"
              >
                <div className="space-y-1.5">
                  <span className="text-[11px] font-mono font-bold text-primary block">
                    {example.caseNo}
                  </span>
                  <h4 className="font-display font-bold text-[15px] sm:text-base text-on-surface leading-snug">
                    {example.title}
                  </h4>
                  <p className="text-xs text-secondary font-semibold">
                    {example.shift}
                  </p>
                </div>

                <div className="rounded-lg bg-white border border-[#F2DAE3] divide-y divide-[#F2DAE3] tabular-nums">
                  <div className="px-3.5 py-2.5 flex items-baseline justify-between gap-2">
                    <span className="text-[11.5px] font-bold text-on-surface-variant">1日の目安</span>
                    <span className="font-cute font-bold text-sm sm:text-[15px] text-on-surface">
                      {example.dailyEstimate}
                    </span>
                  </div>
                  <div className="px-3.5 py-2.5 flex items-baseline justify-between gap-2 bg-[#FFF6F9]">
                    <span className="text-[11.5px] font-bold text-secondary">月の収入例</span>
                    <span className="font-cute font-black text-base sm:text-[17px] text-primary">
                      {example.monthlyEstimate}
                    </span>
                  </div>
                </div>

                <p className="text-xs text-on-surface-variant leading-relaxed">
                  {example.detail}
                </p>
              </div>
            ))}
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
