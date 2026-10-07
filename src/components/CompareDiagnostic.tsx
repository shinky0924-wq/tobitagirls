/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import LucideIcon from './LucideIcon';

export interface DiagnosticRowItem {
  id: string;
  emoji: string;
  wish: string;             // "初めてで何もわからない"
  recommended: string;      // "未経験向け求人"
  subText: string;          // 補足説明
  categorySlug?: string;    // 'inexperienced' | 'high-income' | 'dormitory' | 'double-work' | 'short-term' etc.
  actionType: 'category' | 'safety' | 'line';
  buttonLabel: string;
  lineMessage: string;
  badge: string;
  expectedIncome: string;
  keyPoints: string[];
  theme: {
    badgeBg: string;
    border: string;
    highlightBg: string;
  };
}

export const DIAGNOSTIC_ROWS: DiagnosticRowItem[] = [
  {
    id: 'inexperienced',
    emoji: '🩷',
    wish: '初めてで何もわからない',
    recommended: '未経験向け求人',
    subText: '在籍女性の約9割が完全未経験スタート。お酒不要・営業連絡なし・初日から丁寧な研修あり',
    categorySlug: 'inexperienced',
    actionType: 'category',
    buttonLabel: '未経験向け求人を見る',
    lineMessage: '【未経験向けの相談】\n夜職が初めてで何もわからないのですが、お仕事内容や研修、お給料について教えていただけますか？話だけ聞いてみたいです。',
    badge: '未経験率90%',
    expectedIncome: '日給 30,000円 〜 65,000円',
    keyPoints: [
      'お酒を飲む必要一切なし（ソフトドリンクやお茶でおもてなし）',
      '女性スタッフが約30分で挨拶や作法をマンツーマン研修',
      '玄関先のお声がけは仲居さん（おばちゃん）が担当するためストレスゼロ'
    ],
    theme: {
      badgeBg: 'bg-rose-100 text-rose-800 border-rose-200',
      border: 'border-rose-200',
      highlightBg: 'bg-rose-50/60'
    }
  },
  {
    id: 'high-income',
    emoji: '💰',
    wish: 'とにかくしっかり稼ぎたい',
    recommended: '高収入重視',
    subText: '売上50%完全即日日払い手渡し。日給10万〜15万円以上の実績多数・天引きゼロ',
    categorySlug: 'high-income',
    actionType: 'category',
    buttonLabel: '高収入求人を見る',
    lineMessage: '【高収入重視の相談】\nとにかくしっかり稼ぎたいと考えています。メイン通り・大門通りなど稼げる店舗やシフトについて教えてください。話だけ聞いてみたいです。',
    badge: '日給10万〜15万円超多数',
    expectedIncome: '日給 60,000円 〜 150,000円',
    keyPoints: [
      'メイン通りの圧倒的な来客数×1回15〜20分の短時間接客で高回転',
      '売上50%がその日の退勤時に全額現金手渡し支給',
      '待機カットや衣装代などの引かれ物・天引き一切なし'
    ],
    theme: {
      badgeBg: 'bg-amber-100 text-amber-900 border-amber-200',
      border: 'border-amber-200',
      highlightBg: 'bg-amber-50/60'
    }
  },
  {
    id: 'dormitory',
    emoji: '🏠',
    wish: '家から通うのが難しい',
    recommended: '寮・住み込み',
    subText: '天王寺・難波周辺の家具家電付きオートロック個室寮完備。日額1,000円〜・即日入居OK',
    categorySlug: 'dormitory',
    actionType: 'category',
    buttonLabel: '寮・住み込み求人を見る',
    lineMessage: '【寮・住み込みの相談】\n自宅から通うのが難しいため、寮付き・住み込みでの勤務を検討しています。個室寮の設備や入居の流れについて教えてください。話だけ聞いてみたいです。',
    badge: '即日入居可・個室完備',
    expectedIncome: '日給 40,000円 〜 100,000円',
    keyPoints: [
      '敷金礼金ゼロ・家具家電・Wi-Fi・エアコン完備の完全個室マンション',
      '店舗とは別区域の閑静な住宅街でプライバシー保護',
      '全国からの交通費全額支給（新幹線・飛行機・夜行バス）'
    ],
    theme: {
      badgeBg: 'bg-teal-100 text-teal-900 border-teal-200',
      border: 'border-teal-200',
      highlightBg: 'bg-teal-50/60'
    }
  },
  {
    id: 'double-work',
    emoji: '💼',
    wish: '昼職と両立したい',
    recommended: 'Wワーク向け',
    subText: '週1日・月1回〜OKの完全自由シフト制。ノルマ・出勤催促なし・住民税対策も万全',
    categorySlug: 'double-work',
    actionType: 'category',
    buttonLabel: 'Wワーク向け求人を見る',
    lineMessage: '【Wワークの相談】\n昼職（会社員/OL/学生）と両立して週1日や週末だけで働きたいです。シフトの融通や会社バレ対策について教えてください。話だけ聞いてみたいです。',
    badge: '週1日・月1回OK',
    expectedIncome: '日給 35,000円 〜 70,000円',
    keyPoints: [
      '都合に合わせて働ける完全自由出勤制（残業や試験期間の休みも自由）',
      '手ぶら出勤OK（衣装・ヘアメイク全て店側で無料用意）',
      '住民税の普通徴収申告サポートで会社バレを徹底防止'
    ],
    theme: {
      badgeBg: 'bg-blue-100 text-blue-900 border-blue-200',
      border: 'border-blue-200',
      highlightBg: 'bg-blue-50/60'
    }
  },
  {
    id: 'short-term',
    emoji: '✈️',
    wish: '短期間だけ働きたい',
    recommended: '短期・出稼ぎ',
    subText: '往復交通費全額支給。1週間〜1ヶ月の短期集中で100万円以上の貯金達成者多数',
    categorySlug: 'short-term',
    actionType: 'category',
    buttonLabel: '短期・出稼ぎ求人を見る',
    lineMessage: '【短期・出稼ぎの相談】\n1週間〜1ヶ月など短期間だけの出稼ぎを希望しています。交通費支給の条件や短期でも稼げるか教えてください。話だけ聞いてみたいです。',
    badge: '交通費全額支給',
    expectedIncome: '日給 50,000円 〜 120,000円',
    keyPoints: [
      '全国どこからでも往復新幹線・飛行機代を全額支給',
      '即日入居可能な個室寮完備でカバン1つで来阪OK',
      '短期終了時の無理な引き止めやペナルティ一切なし'
    ],
    theme: {
      badgeBg: 'bg-sky-100 text-sky-900 border-sky-200',
      border: 'border-sky-200',
      highlightBg: 'bg-sky-50/60'
    }
  },
  {
    id: 'privacy',
    emoji: '🙈',
    wish: '身バレが一番心配',
    recommended: '身バレ対策重視',
    subText: '街全体で撮影完全禁止・Web写真掲載ゼロ・完全源氏名・手渡し日払いで秘密厳守',
    categorySlug: 'double-work',
    actionType: 'safety',
    buttonLabel: '安全対策を見る',
    lineMessage: '【身バレ対策の相談】\n家族や会社・知人にバレないかが一番不安です。具体的な身バレ対策や秘密厳守のルールについて教えてください。話だけ聞いてみたいです。',
    badge: '写真掲載完全0%',
    expectedIncome: '日給 35,000円 〜 80,000円',
    keyPoints: [
      '街全体で一般人の撮影が禁止、ネットやSNSに写真は1枚も載りません',
      '完全源氏名・私服通勤で、知り合いに会うリスクを最小化',
      '給与は全額即日現金手渡しなので銀行の入出金記録も残りません'
    ],
    theme: {
      badgeBg: 'bg-purple-100 text-purple-900 border-purple-200',
      border: 'border-purple-200',
      highlightBg: 'bg-purple-50/60'
    }
  },
  {
    id: 'consult',
    emoji: '💬',
    wish: 'まだ応募するか迷っている',
    recommended: 'まず相談',
    subText: '女性スタッフが24時間受付。質問や話を聞くだけでも大歓迎、無理な勧誘ゼロ',
    actionType: 'line',
    buttonLabel: '女性スタッフに相談する',
    lineMessage: '【応募検討中の相談】\nまだ応募するか迷っているのですが、働き方やお店の雰囲気について話だけ聞いてみたいです。',
    badge: '相談無料・勧誘なし',
    expectedIncome: '相談無料（24時間受付）',
    keyPoints: [
      '「話だけ聞いてみたい」「質問だけしたい」でも大歓迎',
      '現場経験のある専任女性スタッフが親身に対応',
      '相談後に応募しなくても違約金や引き止めは一切ありません'
    ],
    theme: {
      badgeBg: 'bg-emerald-100 text-emerald-900 border-emerald-200',
      border: 'border-emerald-200',
      highlightBg: 'bg-emerald-50/60'
    }
  }
];

interface CompareDiagnosticProps {
  onSelectCategory: (slug: string) => void;
  onConsultLine: (situationTitle: string, customMessage?: string) => void;
  onScrollToSafety?: () => void;
}

export default function CompareDiagnostic({
  onSelectCategory,
  onConsultLine,
  onScrollToSafety
}: CompareDiagnosticProps) {
  const [selectedRowId, setSelectedRowId] = useState<string>('inexperienced');
  const [showSafetyModal, setShowSafetyModal] = useState<boolean>(false);

  const activeRow = DIAGNOSTIC_ROWS.find(r => r.id === selectedRowId) || DIAGNOSTIC_ROWS[0];

  const handleRowClick = (item: DiagnosticRowItem) => {
    setSelectedRowId(item.id);
  };

  const handleRowAction = (item: DiagnosticRowItem) => {
    if (item.actionType === 'safety') {
      setShowSafetyModal(true);
      if (onScrollToSafety) {
        onScrollToSafety();
      }
    } else if (item.actionType === 'line') {
      onConsultLine(item.recommended, item.lineMessage);
    } else if (item.categorySlug) {
      onSelectCategory(item.categorySlug);
    }
  };

  return (
    <section 
      id="workstyle-diagnostic" 
      className="mb-16 md:mb-24 scroll-mt-24"
      aria-labelledby="diagnostic-heading"
    >
      <div className="bg-gradient-to-b from-rose-50/80 via-white to-pink-50/40 rounded-3xl border-2 border-rose-200 shadow-lg p-5 sm:p-8 md:p-10 relative overflow-hidden">
        {/* Subtle decorative glow */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-rose-200/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-pink-200/20 rounded-full blur-3xl pointer-events-none" />

        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10 relative z-10">
          <div className="inline-flex items-center gap-1.5 bg-rose-500 text-white text-[11px] sm:text-xs font-black px-4 py-1.5 rounded-full mb-3 shadow-xs">
            <LucideIcon name="Sparkles" size={14} className="text-yellow-300" />
            <span>あなたに合う働き方をチェック</span>
          </div>

          <h2 
            id="diagnostic-heading"
            className="font-display font-black text-2xl sm:text-3xl md:text-4xl text-on-surface leading-tight mb-3"
          >
            「結局、自分にはどれが合ってる？」
          </h2>

          <p className="font-sans text-xs sm:text-sm text-zinc-600 leading-relaxed">
            求人サイトやスカウトが色々あって選べない方へ。<br className="hidden sm:inline" />
            あなたの<strong>今の希望やお悩み</strong>に合わせて、最も安心・高収入な働き方をすぐに見つけられます。
          </p>
        </div>

        {/* ========================================================
            1. あなたの希望 × おすすめ 比較表 (ユーザー指定の診断表)
           ======================================================== */}
        <div className="mb-8 relative z-10">
          <div className="bg-white rounded-2xl sm:rounded-3xl border border-rose-200/90 shadow-sm overflow-hidden">
            {/* Table Header */}
            <div className="grid grid-cols-12 items-center bg-gradient-to-r from-rose-500 to-pink-500 text-white font-black text-xs sm:text-sm py-3 px-3.5 sm:px-6">
              <div className="col-span-5 sm:col-span-4 flex items-center gap-1.5">
                <LucideIcon name="Heart" size={15} className="text-yellow-300 hidden sm:inline" />
                <span>あなたの希望</span>
              </div>
              <div className="col-span-4 sm:col-span-5 flex items-center gap-1.5">
                <LucideIcon name="Sparkles" size={15} className="text-yellow-300 hidden sm:inline" />
                <span>こんな働き方がおすすめ</span>
              </div>
              <div className="col-span-3 sm:col-span-3 text-right">
                <span className="text-[11px] sm:text-xs text-rose-100 font-bold">詳しく見る</span>
              </div>
            </div>

            {/* Table Rows */}
            <div className="divide-y divide-rose-100/80">
              {DIAGNOSTIC_ROWS.map((row) => {
                const isSelected = selectedRowId === row.id;
                return (
                  <div
                    key={row.id}
                    onClick={() => handleRowClick(row)}
                    className={`grid grid-cols-12 items-center p-3.5 sm:p-4 sm:px-6 transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-rose-50/90 ring-2 ring-inset ring-rose-400 font-bold'
                        : 'hover:bg-rose-50/40 bg-white'
                    }`}
                  >
                    {/* Column 1: あなたの希望 */}
                    <div className="col-span-5 sm:col-span-4 flex items-center gap-2 pr-1 sm:pr-2">
                      <span className="text-base sm:text-xl flex-shrink-0">{row.emoji}</span>
                      <span className="text-xs sm:text-sm font-black text-zinc-900 leading-snug">
                        {row.wish}
                      </span>
                    </div>

                    {/* Column 2: こんな働き方がおすすめ */}
                    <div className="col-span-4 sm:col-span-5 pr-1 sm:pr-2">
                      <span className="inline-flex items-center gap-1 text-xs sm:text-sm font-black text-secondary">
                        {row.recommended}
                      </span>
                      <div className="hidden md:block text-[11px] text-zinc-500 truncate font-normal mt-0.5">
                        {row.badge}
                      </div>
                    </div>

                    {/* Column 3: アクションボタン */}
                    <div className="col-span-3 sm:col-span-3 flex items-center justify-end">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRowAction(row);
                        }}
                        className={`text-[11px] sm:text-xs font-black px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-xl transition-all flex items-center gap-1 cursor-pointer shadow-2xs ${
                          row.actionType === 'line'
                            ? 'bg-[#06c755] hover:bg-[#05b34c] text-white'
                            : 'bg-secondary hover:bg-rose-700 text-white'
                        }`}
                      >
                        <span className="hidden sm:inline">
                          {row.actionType === 'line' ? '相談する' : '詳しく見る'}
                        </span>
                        <LucideIcon 
                          name={row.actionType === 'line' ? 'MessageCircle' : 'ArrowRight'} 
                          size={13} 
                        />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ========================================================
            2. 選択中の希望の詳細プレビューカード
           ======================================================== */}
        <div className="bg-white rounded-2xl sm:rounded-3xl border-2 border-rose-200/80 shadow-md p-5 sm:p-7 mb-8 relative z-10">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 pb-4 border-b border-rose-100">
            <div className="flex items-center gap-3">
              <span className="text-2xl sm:text-3xl p-2.5 rounded-2xl bg-rose-50 border border-rose-100 flex-shrink-0">
                {activeRow.emoji}
              </span>
              <div>
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <span className="text-xs font-bold text-zinc-500">あなたの希望：</span>
                  <span className="bg-zinc-800 text-white text-xs font-black px-2 py-0.5 rounded-md">
                    {activeRow.wish}
                  </span>
                  <span className="text-xs text-zinc-400">→</span>
                  <span className={`text-xs font-black px-2 py-0.5 rounded-md border ${activeRow.theme.badgeBg}`}>
                    {activeRow.badge}
                  </span>
                </div>
                <h3 className="font-display font-black text-lg sm:text-xl text-on-surface">
                  こんな働き方がおすすめ：<span className="text-secondary">{activeRow.recommended}</span>
                </h3>
              </div>
            </div>

            <div className="bg-rose-50 border border-rose-200 rounded-xl px-3.5 py-1.5 text-left md:text-right w-full md:w-auto">
              <div className="text-[10px] font-bold text-zinc-500">想定日給・給与目安</div>
              <div className="text-xs sm:text-sm font-black text-secondary">
                {activeRow.expectedIncome}
              </div>
            </div>
          </div>

          <div className="pt-4">
            <p className="text-xs sm:text-sm font-bold text-zinc-800 leading-relaxed mb-3">
              {activeRow.subText}
            </p>

            <div className="space-y-1.5 mb-5">
              {activeRow.keyPoints.map((point, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-zinc-700">
                  <span className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center flex-shrink-0 text-[10px] font-black mt-0.5">
                    ✔
                  </span>
                  <span className="leading-relaxed">{point}</span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => handleRowAction(activeRow)}
                className="bg-secondary hover:bg-rose-700 text-white text-xs sm:text-sm font-black px-5 py-3 rounded-xl shadow-xs transition-all flex items-center gap-2 cursor-pointer"
              >
                <LucideIcon name="ArrowRight" size={15} />
                <span>{activeRow.buttonLabel}</span>
              </button>

              <button
                type="button"
                onClick={() => onConsultLine(activeRow.recommended, activeRow.lineMessage)}
                className="bg-[#06c755] hover:bg-[#05b34c] text-white text-xs sm:text-sm font-black px-4 py-3 rounded-xl shadow-xs transition-all flex items-center gap-2 cursor-pointer"
              >
                <LucideIcon name="MessageCircle" size={15} />
                <span>【公式LINE】{activeRow.wish}について相談する</span>
              </button>
            </div>
          </div>
        </div>

        {/* ========================================================
            3. 表の下の案内テキスト ＆ 女性スタッフ相談CTA（ユーザー指定）
           ======================================================== */}
        <div className="bg-gradient-to-r from-rose-50 via-pink-50 to-rose-100/60 rounded-2xl sm:rounded-3xl border-2 border-rose-300/80 p-6 sm:p-8 text-center relative z-10 shadow-sm">
          <div className="w-12 h-12 rounded-full bg-rose-200 text-secondary mx-auto flex items-center justify-center mb-3 shadow-xs">
            <LucideIcon name="Headphones" size={24} />
          </div>

          <p className="font-sans font-bold text-sm sm:text-base text-zinc-800 leading-relaxed mb-2">
            どれを選べばいいかわからない方も大丈夫。<br />
            希望や不安を聞いて、あなたに合った働き方を一緒に考えます。
          </p>

          <p className="font-sans text-xs sm:text-sm font-extrabold text-secondary mb-6">
            「話だけ聞いてみたい」でもOK
          </p>

          <button
            type="button"
            onClick={() => {
              onConsultLine(
                '女性スタッフ相談',
                'どれを選べばいいかわからないのですが、希望や不安を聞いていただき、自分に合った働き方を一緒に考えてほしいです。「話だけ聞いてみたい」の段階なのですがよろしいでしょうか？'
              );
            }}
            className="inline-flex items-center justify-center gap-3 bg-[#06c755] hover:bg-[#05b34c] active:scale-98 text-white font-black text-sm sm:text-base px-8 sm:px-10 py-3.5 sm:py-4 rounded-2xl shadow-md transition-all cursor-pointer group"
          >
            <LucideIcon name="MessageCircle" size={20} className="text-white group-hover:scale-110 transition-transform" />
            <span className="tracking-wide">→ 女性スタッフに相談する</span>
          </button>

          <p className="text-[11px] text-zinc-500 mt-3 font-medium">
            ※24時間365日受付・相談完全無料・秘密厳守・無理な勧誘や引き止めは一切ありません
          </p>
        </div>

        {/* ========================================================
            4. 身バレ防止 モーダル (身バレ対策重視をクリック時)
           ======================================================== */}
        {showSafetyModal && (
          <div 
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4"
            role="dialog"
            aria-modal="true"
            aria-labelledby="safety-modal-title"
          >
            <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-rose-100 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between pb-4 border-b border-rose-100 mb-6">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center">
                    <LucideIcon name="ShieldCheck" size={22} />
                  </div>
                  <div>
                    <h3 id="safety-modal-title" className="font-display font-black text-lg sm:text-xl text-on-surface">
                      身バレ防止・5重の安全対策ガイド
                    </h3>
                    <p className="text-xs text-zinc-500">会社・家族・友人にバレない理由</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setShowSafetyModal(false)}
                  className="w-8 h-8 rounded-full bg-zinc-100 hover:bg-zinc-200 text-zinc-600 flex items-center justify-center cursor-pointer"
                  aria-label="閉じる"
                >
                  <LucideIcon name="X" size={16} />
                </button>
              </div>

              <div className="space-y-3.5 mb-6 text-xs sm:text-sm text-zinc-700">
                <div className="bg-purple-50/60 rounded-2xl p-4 border border-purple-100">
                  <div className="font-extrabold text-purple-900 mb-1 flex items-center gap-1.5">
                    <span className="w-5 h-5 rounded-full bg-purple-200 text-purple-800 text-xs flex items-center justify-center">1</span>
                    <span>街全体で撮影完全禁止・写真ネット掲載100%ナシ</span>
                  </div>
                  <p className="text-xs text-zinc-600 pl-6 leading-relaxed">
                    料理組合の規約により、街中での一般人・観光客の撮影は一切禁止されています。求人サイトやSNS、広告へのキャスト写真掲載も一切行いません。
                  </p>
                </div>

                <div className="bg-purple-50/60 rounded-2xl p-4 border border-purple-100">
                  <div className="font-extrabold text-purple-900 mb-1 flex items-center gap-1.5">
                    <span className="w-5 h-5 rounded-full bg-purple-200 text-purple-800 text-xs flex items-center justify-center">2</span>
                    <span>完全源氏名（偽名）＆私服通勤</span>
                  </div>
                  <p className="text-xs text-zinc-600 pl-6 leading-relaxed">
                    本名を名乗ることはありません。衣装や着物は料亭で無料着替えができるため、私服で手ぶら出勤でき、外見から特定される心配はありません。
                  </p>
                </div>

                <div className="bg-purple-50/60 rounded-2xl p-4 border border-purple-100">
                  <div className="font-extrabold text-purple-900 mb-1 flex items-center gap-1.5">
                    <span className="w-5 h-5 rounded-full bg-purple-200 text-purple-800 text-xs flex items-center justify-center">3</span>
                    <span>売上50%完全即日全額手渡し日払い</span>
                  </div>
                  <p className="text-xs text-zinc-600 pl-6 leading-relaxed">
                    銀行口座への振り込み履歴が一切残らないため、家族や通帳の確認で発覚する心配がありません。
                  </p>
                </div>

                <div className="bg-purple-50/60 rounded-2xl p-4 border border-purple-100">
                  <div className="font-extrabold text-purple-900 mb-1 flex items-center gap-1.5">
                    <span className="w-5 h-5 rounded-full bg-purple-200 text-purple-800 text-xs flex items-center justify-center">4</span>
                    <span>住民税の「普通徴収」税務ガイド完備</span>
                  </div>
                  <p className="text-xs text-zinc-600 pl-6 leading-relaxed">
                    会社に副業が発覚する最大の原因である住民税について、確定申告時に「自分で納付（普通徴収）」にする書き方を個別サポートします。会社に通知書が届くことはありません。
                  </p>
                </div>

                <div className="bg-purple-50/60 rounded-2xl p-4 border border-purple-100">
                  <div className="font-extrabold text-purple-900 mb-1 flex items-center gap-1.5">
                    <span className="w-5 h-5 rounded-full bg-purple-200 text-purple-800 text-xs flex items-center justify-center">5</span>
                    <span>お酒・お客様との連絡先交換は完全禁止</span>
                  </div>
                  <p className="text-xs text-zinc-600 pl-6 leading-relaxed">
                    お酒を飲む必要がなく、お客様とのLINE交換も規約で厳禁。店外での付きまといや営業連絡などプライベートへの侵食はゼロです。
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowSafetyModal(false);
                    onConsultLine('身バレ対策', '【身バレ対策についての相談】\n身バレが不安なのですが、会社や家族に知られないための対策について詳しく教えてください。話だけ聞いてみたいです。');
                  }}
                  className="w-full bg-[#06c755] hover:bg-[#05b34c] text-white text-xs sm:text-sm font-black py-3 rounded-xl flex items-center justify-center gap-2 cursor-pointer"
                >
                  <LucideIcon name="MessageCircle" size={16} />
                  <span>身バレ対策についてLINEで無料相談する</span>
                </button>
                <button
                  type="button"
                  onClick={() => setShowSafetyModal(false)}
                  className="w-full sm:w-auto bg-zinc-100 hover:bg-zinc-200 text-zinc-700 text-xs sm:text-sm font-bold px-5 py-3 rounded-xl cursor-pointer"
                >
                  閉じる
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
