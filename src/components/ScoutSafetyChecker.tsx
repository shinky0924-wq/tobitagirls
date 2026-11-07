/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import LucideIcon from './LucideIcon';

interface ScoutSafetyCheckerProps {
  onCtaclick?: () => void;
}

const CHECK_ITEMS = [
  { id: 'c1', text: '街頭やSNS（Twitter/Xの裏垢、Instagram）のDMで声をかけられた', weight: 2 },
  { id: 'c2', text: '面接場所が「実際の店舗」ではなく、駅前のカフェやファミレス、車内だった', weight: 2 },
  { id: 'c3', text: '「スカウトを通した方が特別待遇になる」「時給保証がつく」と言われた', weight: 2 },
  { id: 'c4', text: '当日の稼ぎが全額日払い手渡しではなく「一部振込」や「月1回支給」と言われた', weight: 1 },
  { id: 'c5', text: '厚生費・衣装代・雑費・ヘアメイク代などの名目で日給から数千円〜数万円引かれる', weight: 1 },
  { id: 'c6', text: '「辞める時は1ヶ月前告知」「途中で辞めたら違約金・罰金」などの規約がある', weight: 2 },
  { id: 'c7', text: 'ネットや求人サイトに顔写真・モザイク写真の掲載が必要と言われた', weight: 2 },
  { id: 'c8', text: 'お酒を飲むことや、お客さまとのLINE交換・店外同伴を勧められた', weight: 1 },
  { id: 'c9', text: '個室寮の家賃が高額（月10万円以上）だったり、事前に保証金を請求された', weight: 1 },
  { id: 'c10', text: '本籍地記載の住民票原本による年齢確認を行わず、身分証のコピーだけでOKと言われた', weight: 2 }
];

export default function ScoutSafetyChecker({ onCtaclick }: ScoutSafetyCheckerProps) {
  const [checkedIds, setCheckedIds] = useState<Set<string>>(new Set());

  const toggleCheck = (id: string) => {
    setCheckedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const resetAll = () => {
    setCheckedIds(new Set());
  };

  // Calculate danger score
  const totalScore = Array.from(checkedIds).reduce((acc, id) => {
    const item = CHECK_ITEMS.find((c) => c.id === id);
    return acc + (item ? item.weight : 0);
  }, 0);

  const checkedCount = checkedIds.size;

  let dangerLevel: 'safe' | 'warning' | 'danger' = 'safe';
  let badgeText = '安全・優良求人';
  let badgeColor = 'bg-emerald-100 text-emerald-800 border-emerald-200';
  let messageTitle = '危険な項目は見つかりませんでした';
  let messageDesc = '検討されている求人は健全な直営店、または安全な条件です。「飛田ガールズ」のような料理組合公認の料亭直営窓口なら、スカウトの中抜き0円・全額日払い手渡し・写真非掲載が100%保証されます。';

  if (checkedCount >= 3 || totalScore >= 4) {
    dangerLevel = 'danger';
    badgeText = '🚨 極めて危険（悪質スカウト・違法搾取の恐れ大）';
    badgeColor = 'bg-rose-100 text-rose-800 border-rose-300';
    messageTitle = 'トラブルに巻き込まれるリスクが極めて高いです！';
    messageDesc = 'チェックがついた項目は、悪質なスカウト業者によるお給料のピンハネ（毎月数十万円の中抜き）や違約金詐欺の典型的な手口です。契約や入店を即時中止し、料亭直営の正規窓口へご相談ください。';
  } else if (checkedCount >= 1 || totalScore >= 1) {
    dangerLevel = 'warning';
    badgeText = '⚠️ 注意が必要（条件の再確認を推奨）';
    badgeColor = 'bg-amber-100 text-amber-800 border-amber-300';
    messageTitle = '一部、注意が必要な怪しい条件が含まれています';
    messageDesc = '「飛田新地は組合規約でスカウト行為が全面禁止」されています。仲介業者を挟んでいる場合、本来あなたが受け取るはずのお給料から手数料が引かれている可能性があります。';
  }

  return (
    <div className="bg-white rounded-3xl border border-rose-100 shadow-sm p-6 sm:p-8" id="scout-safety-checker">
      
      {/* Header */}
      <div className="text-center max-w-xl mx-auto mb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-secondary/10 text-secondary border border-secondary/20 mb-2">
          <LucideIcon name="ShieldCheck" size={13} />
          <span>安心・安全チェック</span>
        </div>
        <h3 className="text-xl sm:text-2xl font-extrabold text-zinc-900 font-display mb-2">
          その求人、危なくない？危ないスカウトや嘘を見抜く簡単チェック
        </h3>
        <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
          気になる求人やスカウトからの言葉に当てはまる項目をタップしてください。安心して働ける求人かどうかすぐにわかります。
        </p>
      </div>

      {/* Checklist items */}
      <div className="space-y-2.5 mb-8">
        {CHECK_ITEMS.map((item, idx) => {
          const isChecked = checkedIds.has(item.id);
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => toggleCheck(item.id)}
              className={`w-full text-left p-3.5 sm:p-4 rounded-2xl border transition-all cursor-pointer flex items-start gap-3 ${
                isChecked
                  ? 'bg-rose-50/90 border-rose-300 ring-2 ring-rose-300/40 shadow-xs'
                  : 'bg-zinc-50/60 hover:bg-rose-50/30 border-zinc-200/80 text-zinc-700'
              }`}
            >
              <div className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 mt-0.5 border transition-colors ${
                isChecked ? 'bg-secondary border-secondary text-white' : 'bg-white border-zinc-300'
              }`}>
                {isChecked && <LucideIcon name="Check" size={13} />}
              </div>
              <div className="flex-1 text-xs sm:text-sm font-medium leading-relaxed">
                <span className="font-bold text-zinc-400 mr-2">Q{idx + 1}.</span>
                <span className={isChecked ? 'font-bold text-zinc-900' : 'text-zinc-700'}>
                  {item.text}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Result Box */}
      <div className={`rounded-3xl p-6 sm:p-7 border transition-all ${
        dangerLevel === 'danger'
          ? 'bg-gradient-to-br from-rose-50 to-pink-100/70 border-rose-300'
          : dangerLevel === 'warning'
          ? 'bg-gradient-to-br from-amber-50 to-yellow-100/60 border-amber-300'
          : 'bg-gradient-to-br from-emerald-50 to-teal-50 border-emerald-200'
      }`}>
        <div className="flex items-center justify-between flex-wrap gap-2 mb-3">
          <span className={`text-xs font-bold px-3 py-1 rounded-full border ${badgeColor}`}>
            {badgeText}
          </span>
          {checkedCount > 0 && (
            <button
              type="button"
              onClick={resetAll}
              className="text-xs text-zinc-500 hover:text-zinc-800 underline cursor-pointer"
            >
              チェックをリセット
            </button>
          )}
        </div>

        <h4 className="text-base sm:text-lg font-bold text-zinc-900 mb-2 font-display">
          {messageTitle}（該当項目: {checkedCount} / 10件）
        </h4>
        <p className="text-xs sm:text-sm text-zinc-700 leading-relaxed mb-6">
          {messageDesc}
        </p>

        {/* Action Button */}
        {onCtaclick && (
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <button
              type="button"
              onClick={onCtaclick}
              className="w-full sm:w-auto px-6 py-3 rounded-full bg-secondary text-white font-bold text-xs sm:text-sm shadow-md hover:bg-secondary/90 transition-all cursor-pointer flex items-center justify-center gap-1.5"
            >
              <LucideIcon name="ShieldCheck" size={15} />
              <span>料亭直営公式（飛田ガールズ）に安全相談する（無料）</span>
            </button>
          </div>
        )}
      </div>

    </div>
  );
}
