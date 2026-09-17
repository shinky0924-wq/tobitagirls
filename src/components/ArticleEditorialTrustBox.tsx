import React, { useState } from 'react';
import LucideIcon from './LucideIcon';

interface ArticleEditorialTrustBoxProps {
  publishedAt?: string;
  updatedAt?: string;
  authorName?: string;
  authorRole?: string;
}

export default function ArticleEditorialTrustBox({
  publishedAt = '2026.09.01',
  updatedAt = '2026.09.09',
  authorName = 'さくら',
  authorRole = '女性サポートスタッフ・相談窓口歴8年'
}: ArticleEditorialTrustBoxProps) {
  const [isConditionsOpen, setIsConditionsOpen] = useState(false);

  return (
    <div className="my-6 rounded-2xl border-2 border-rose-200/90 bg-gradient-to-br from-white via-rose-50/30 to-pink-50/40 p-5 sm:p-6 shadow-xs">
      {/* Main Core Declaration Quote */}
      <div className="flex items-start gap-3 pb-4 border-b border-rose-100">
        <div className="w-9 h-9 rounded-xl bg-rose-600 text-white flex items-center justify-center shrink-0 shadow-xs mt-0.5">
          <LucideIcon name="ShieldCheck" size={20} />
        </div>
        <div>
          <div className="inline-flex items-center gap-1.5 text-[10px] font-bold text-rose-700 bg-rose-100/80 px-2.5 py-0.5 rounded-full mb-1 uppercase tracking-wider">
            一次情報・信頼性保証（E-E-A-T基準）
          </div>
          <p className="text-sm sm:text-base font-black text-zinc-900 leading-snug">
            このページの情報は、お店の求人担当スタッフへのヒアリングと実際の募集条件をもとに作成しています。
          </p>
          <p className="text-xs text-zinc-600 mt-1 leading-relaxed">
            ネット上の不確かな噂や誇大広告ではなく、飛田新地料理組合規約に準拠した直営料亭の最新実態と正確な数値のみを公開しています。
          </p>
        </div>
      </div>

      {/* 6 Core Verification Metadata Items */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-4 text-xs">
        {/* 1. 更新日 */}
        <div className="bg-white rounded-xl p-3 border border-rose-100 shadow-2xs">
          <div className="flex items-center gap-1.5 text-zinc-500 font-bold mb-1">
            <LucideIcon name="Calendar" size={13} className="text-rose-600" />
            <span>更新日</span>
          </div>
          <div className="font-bold text-zinc-900 font-mono text-xs">
            {updatedAt}
          </div>
          <div className="text-[11px] text-zinc-500 mt-0.5">
            最新の募集条件・規約確認済
          </div>
        </div>

        {/* 2. 編集者 */}
        <div className="bg-white rounded-xl p-3 border border-rose-100 shadow-2xs">
          <div className="flex items-center gap-1.5 text-zinc-500 font-bold mb-1">
            <LucideIcon name="UserCheck" size={13} className="text-rose-600" />
            <span>編集者</span>
          </div>
          <div className="font-bold text-zinc-900 text-xs">
            飛田ガールズ 編集部
          </div>
          <div className="text-[11px] text-zinc-500 mt-0.5">
            執筆：{authorName}（{authorRole}）
          </div>
        </div>

        {/* 3. 求人担当者 */}
        <div className="bg-white rounded-xl p-3 border border-rose-100 shadow-2xs">
          <div className="flex items-center gap-1.5 text-zinc-500 font-bold mb-1">
            <LucideIcon name="Users" size={13} className="text-rose-600" />
            <span>求人担当者</span>
          </div>
          <div className="font-bold text-zinc-900 text-xs">
            採用マネージャー 木村 / 女性サポート さくら
          </div>
          <div className="text-[11px] text-zinc-500 mt-0.5">
            飛田新地 直営老舗料亭 採用窓口
          </div>
        </div>

        {/* 4. 情報確認者 */}
        <div className="bg-white rounded-xl p-3 border border-rose-100 shadow-2xs">
          <div className="flex items-center gap-1.5 text-zinc-500 font-bold mb-1">
            <LucideIcon name="CheckCircle2" size={13} className="text-rose-600" />
            <span>情報確認者</span>
          </div>
          <div className="font-bold text-zinc-900 text-xs">
            飛田新地料理組合公認 運営管理責任者
          </div>
          <div className="text-[11px] text-zinc-500 mt-0.5">
            組合加盟規程・コンプライアンス監査
          </div>
        </div>

        {/* 5. 情報源 */}
        <div className="bg-white rounded-xl p-3 border border-rose-100 shadow-2xs sm:col-span-2 lg:col-span-2">
          <div className="flex items-center gap-1.5 text-zinc-500 font-bold mb-1">
            <LucideIcon name="FileText" size={13} className="text-rose-600" />
            <span>情報源</span>
          </div>
          <div className="text-xs text-zinc-800 leading-relaxed font-medium">
            ・直営料亭 求人担当スタッフへの定期ヒアリング調査<br />
            ・店舗就業規程および組合公認標準料金体系（15分11,000円〜）<br />
            ・現役キャスト（未経験・Wワーク・出稼ぎ）実働勤務データ
          </div>
        </div>
      </div>

      {/* 6. 実際の募集条件 (Expandable / Prominent Details) */}
      <div className="mt-4 pt-4 border-t border-rose-100">
        <div className="bg-white rounded-2xl border border-rose-200/80 overflow-hidden shadow-2xs">
          <button
            type="button"
            onClick={() => setIsConditionsOpen(!isConditionsOpen)}
            className="w-full p-3.5 bg-rose-50/60 hover:bg-rose-100/50 flex items-center justify-between transition-colors cursor-pointer text-left"
          >
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-md bg-rose-600 text-white flex items-center justify-center shrink-0">
                <LucideIcon name="Award" size={13} />
              </div>
              <span className="font-black text-xs sm:text-sm text-zinc-900">
                実際の募集条件（公式基準・虚偽誇大一切なし）
              </span>
            </div>
            <div className="flex items-center gap-1 text-[11px] font-bold text-rose-700">
              <span>{isConditionsOpen ? '閉じる' : '詳細を見る'}</span>
              <LucideIcon name={isConditionsOpen ? 'ChevronUp' : 'ChevronDown'} size={14} />
            </div>
          </button>

          {/* Condition Details Table */}
          <div className={`p-4 text-xs space-y-2.5 transition-all ${isConditionsOpen ? 'block' : 'block sm:block'}`}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <div className="p-2.5 bg-zinc-50 rounded-xl">
                <span className="font-bold text-zinc-500 block mb-0.5">【応募資格】</span>
                <span className="font-bold text-zinc-900">20歳以上の女性（未成年・高校生不可 / 要身分証）</span>
                <p className="text-[11px] text-zinc-600 mt-0.5">未経験者9割・容姿不問・学生/OL/主婦歓迎</p>
              </div>

              <div className="p-2.5 bg-zinc-50 rounded-xl">
                <span className="font-bold text-zinc-500 block mb-0.5">【給料システム・計算式】</span>
                <span className="font-bold text-rose-600">(料金−仲居1,000円)÷2の公式折半・即日全額現金手渡し</span>
                <p className="text-[11px] text-zinc-600 mt-0.5">15分:5,000円 / 20分:7,500円 / 30分:10,000円 / 60分:20,000円（待機カット・罰金0円）</p>
              </div>

              <div className="p-2.5 bg-zinc-50 rounded-xl">
                <span className="font-bold text-zinc-500 block mb-0.5">【勤務形態】</span>
                <span className="font-bold text-zinc-900">完全自由出勤制（週1日〜・1日3時間〜OK）</span>
                <p className="text-[11px] text-zinc-600 mt-0.5">昼の部 11:00〜18:00 / 夜の部 18:00〜24:00</p>
              </div>

              <div className="p-2.5 bg-zinc-50 rounded-xl">
                <span className="font-bold text-zinc-500 block mb-0.5">【待遇・設備】</span>
                <span className="font-bold text-zinc-900">個室マンション寮完備・衣装メイク無料</span>
                <p className="text-[11px] text-zinc-600 mt-0.5">オートロック・家具家電Wi-Fi付き・即日入居可</p>
              </div>
            </div>

            <div className="p-2.5 bg-rose-50/60 rounded-xl border border-rose-100 flex items-start gap-2">
              <LucideIcon name="CheckCircle2" size={14} className="text-emerald-600 shrink-0 mt-0.5" />
              <div className="text-[11px] text-zinc-700 leading-relaxed">
                <strong className="text-zinc-900">身バレ対策：</strong>街全体の撮影禁止・完全源氏名制・ネット掲載ゼロ・住民税普通徴収サポートにより、知人や会社への秘密は100%厳守されます。
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
