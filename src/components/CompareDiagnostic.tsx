/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import LucideIcon from './LucideIcon';

export interface DiagnosticRouteItem {
  id: string;
  situation: string;       // e.g. "未経験"
  situationDesc: string;   // e.g. "夜職が初めて・お茶出しや接客の基本から学びたい"
  targetLabel: string;     // e.g. "未経験向け"
  categorySlug?: string;   // 'inexperienced' | 'high-income' | 'double-work' | 'dormitory' etc.
  iconName: string;
  badge: string;
  tagline: string;
  expectedIncome: string;
  meritPoints: string[];
  actionType: 'category' | 'safety';
  buttonLabel: string;
  lineMessage: string;
  theme: {
    bgLight: string;
    border: string;
    badgeBg: string;
    accentText: string;
    iconBg: string;
    pillActive: string;
  };
}

export const DIAGNOSTIC_ROUTES: DiagnosticRouteItem[] = [
  {
    id: 'inexperienced',
    situation: '未経験',
    situationDesc: '夜職・水商売の経験ゼロ。お茶出しや接客の基本から安心して始めたい',
    targetLabel: '未経験向け',
    categorySlug: 'inexperienced',
    iconName: 'Sparkles',
    badge: '在籍女性の約9割が完全未経験',
    tagline: 'お酒・営業LINE・指名取り一切不要！女性スタッフが約30分で優しくレクチャー',
    expectedIncome: '日給 30,000円 〜 65,000円（即日現金手渡し）',
    meritPoints: [
      '初日の就業前に専任女性スタッフが約30分かけて丁寧にお茶出し・礼儀作法を講習',
      'お酒を飲む必要が一切なく、翌日の昼職や大学の講義に影響が出ない',
      '玄関先でのお声がけ・客引きは仲居さん（おばちゃん）が全て担当するためストレスゼロ'
    ],
    actionType: 'category',
    buttonLabel: '未経験向け求人の詳細を見る',
    lineMessage: '【未経験向けの相談】\n夜職が完全未経験なのですが、お仕事の流れや初日の講習、お給料について詳しく教えていただけますか？',
    theme: {
      bgLight: 'bg-rose-50/50',
      border: 'border-rose-200',
      badgeBg: 'bg-rose-100 text-rose-800',
      accentText: 'text-rose-600',
      iconBg: 'bg-rose-100 text-rose-600',
      pillActive: 'bg-rose-600 text-white border-rose-600 shadow-sm'
    }
  },
  {
    id: 'experienced',
    situation: '経験者',
    situationDesc: '他店や他業種（キャバクラ・デリヘル等）で働いた経験があり、より好条件で稼ぎたい',
    targetLabel: '条件がいい（最高水準待遇）',
    categorySlug: 'high-income',
    iconName: 'Award',
    badge: '料亭直営・売上50%完全即日手渡し',
    tagline: 'スカウトの天引き・店舗の雑費引かれ物一切ナシ！売上の半分がきっちり手元に残る',
    expectedIncome: '日給 60,000円 〜 150,000円以上（月収150万円超多数）',
    meritPoints: [
      '仲介スカウトを介さない料亭直営のため、10〜30%のピンハネ天引きが永久にゼロ',
      '待機カット・ヘアメイク代・厚生費などの名目での雑費引き一切なし',
      '厳しい指名ノルマ・同伴・アフター・営業連絡の強要が一切なく、実力通り高日給を直結'
    ],
    actionType: 'category',
    buttonLabel: '好条件・高収入求人の詳細を見る',
    lineMessage: '【経験者優遇・条件の相談】\n他店での勤務経験があるのですが、売上50%即日手渡しのシステムやシフト優遇などの好条件について詳しく聞きたいです。',
    theme: {
      bgLight: 'bg-amber-50/50',
      border: 'border-amber-200',
      badgeBg: 'bg-amber-100 text-amber-900',
      accentText: 'text-amber-700',
      iconBg: 'bg-amber-100 text-amber-700',
      pillActive: 'bg-amber-600 text-white border-amber-600 shadow-sm'
    }
  },
  {
    id: 'weekly-1',
    situation: '週1日だけ',
    situationDesc: 'OLの昼職や大学・専門学校・家事と両立し、週末や空き時間だけ無理なく稼ぎたい',
    targetLabel: 'Wワーク向け（副業・マイペース）',
    categorySlug: 'double-work',
    iconName: 'Clock',
    badge: '月1回〜週1日OK・完全自由出勤',
    tagline: 'ノルマ・出勤強要・催促連絡一切なし！週末1日で会社員の半月分をサクッと即日日払い',
    expectedIncome: '日給 35,000円 〜 70,000円（週末1回のみでも大歓迎）',
    meritPoints: [
      '月1回や週1日、週末土日のみ・平日夜（19時〜）の時短勤務など完全自由シフト制',
      '「来週はテスト」「本業の残業」など急な予定でもペナルティ・在籍料0円',
      '手ぶら出勤OK（衣装・ヘアメイク全て店側で無料準備）なので本業終わりに直行可能'
    ],
    actionType: 'category',
    buttonLabel: 'Wワーク・副業向け求人を見る',
    lineMessage: '【週1日・Wワークの相談】\n昼職（会社員/学生）をしているため週1日だけ・週末のみの勤務を希望しています。シフトの融通や身バレ対策について教えてください。',
    theme: {
      bgLight: 'bg-blue-50/50',
      border: 'border-blue-200',
      badgeBg: 'bg-blue-100 text-blue-900',
      accentText: 'text-blue-700',
      iconBg: 'bg-blue-100 text-blue-700',
      pillActive: 'bg-blue-600 text-white border-blue-600 shadow-sm'
    }
  },
  {
    id: 'high-income',
    situation: 'とにかく稼ぎたい',
    situationDesc: '借金・奨学金の早期完済や、美容・留学・独立開業の目標資金を最速で貯めたい',
    targetLabel: '高収入向け（最速資金づくり）',
    categorySlug: 'high-income',
    iconName: 'Coins',
    badge: '1日10万〜15万円以上の実績多数',
    tagline: 'メイン通りの圧倒的な集客力×15分接客の高回転！売上50%上限なし即日手渡し',
    expectedIncome: '日給 60,000円 〜 150,000円（月収 120万〜250万円以上）',
    meritPoints: [
      '飛田新地で最も客足が集中する大門通り・妖怪通り等の好立地料亭で待機時間なし',
      '1人あたり15〜20分の短時間接客のため、体力的な負担が少なく回転率が圧倒的',
      'お客様からのチップ（心付け）も店側の天引き一切なく100%女の子の手取り'
    ],
    actionType: 'category',
    buttonLabel: '高収入向け求人の詳細を見る',
    lineMessage: '【とにかく稼ぎたい・高収入相談】\n短期間で目標金額（〇〇万円）を貯めたいです。最も効率よく稼げる通りやおすすめのシフトについて相談に乗ってください。',
    theme: {
      bgLight: 'bg-emerald-50/50',
      border: 'border-emerald-200',
      badgeBg: 'bg-emerald-100 text-emerald-900',
      accentText: 'text-emerald-700',
      iconBg: 'bg-emerald-100 text-emerald-700',
      pillActive: 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
    }
  },
  {
    id: 'safety',
    situation: '身バレが心配',
    situationDesc: '会社・家族・友人・彼氏に絶対に知られたくない。ネット写真や個人情報の流出が不安',
    targetLabel: '安全対策を見る（身バレ防止徹底）',
    categorySlug: 'double-work',
    iconName: 'ShieldCheck',
    badge: '街全体で撮影完全禁止・写真掲載ゼロ',
    tagline: 'ネット写真掲載100%ナシ・完全源氏名・私服通勤・手渡し日払い・住民税の普通徴収対応',
    expectedIncome: '身バレ防止度 100%（業界最高水準の規約守秘体制）',
    meritPoints: [
      '料理組合の厳格な規約により街全体で一般人の撮影完全禁止。WebやSNSへの写真掲載は一切なし',
      'お仕事は完全源氏名（偽名）、私服通勤のため、街の外でバレる要素がありません',
      '給与は手渡し日払い（銀行振込履歴なし）＆会社バレを防ぐ「住民税の普通徴収」手順を個別指導'
    ],
    actionType: 'safety',
    buttonLabel: '安全対策・身バレ防止の詳細を見る',
    lineMessage: '【身バレ対策についての相談】\n会社や知人に絶対にバレずに働きたいです。写真非掲載や源氏名、住民税の普通徴収手続きについて詳しく教えてください。',
    theme: {
      bgLight: 'bg-purple-50/50',
      border: 'border-purple-200',
      badgeBg: 'bg-purple-100 text-purple-900',
      accentText: 'text-purple-700',
      iconBg: 'bg-purple-100 text-purple-700',
      pillActive: 'bg-purple-600 text-white border-purple-600 shadow-sm'
    }
  },
  {
    id: 'relocation',
    situation: '遠方から働きたい',
    situationDesc: '地方（北海道〜沖縄）から上京・来阪したい。初期費用ゼロですぐに生活を立て直したい',
    targetLabel: '寮・出稼ぎ（即日入居・交通費全額）',
    categorySlug: 'dormitory',
    iconName: 'Home',
    badge: '往復交通費全額支給＆個室マンション寮',
    tagline: '新幹線・飛行機代全額支給！家具家電・Wi-Fi付きの完全個室マンションに即日0円入居OK',
    expectedIncome: '期間収益 50万〜180万円＋家賃補助・交通費全額',
    meritPoints: [
      '新幹線・飛行機・夜行バスのチケット代など往復交通費を全額支給（領収書持参で即日精算）',
      '敷金・礼金・保証人不要で、家具・家電・Wi-Fi・エアコン完備のオートロック個室寮に即日入居',
      '新大阪・天王寺・難波など主要駅まで女性スタッフがお迎えにあがり、手ぶらでお越しいただけます'
    ],
    actionType: 'category',
    buttonLabel: '寮・出稼ぎ求人の詳細を見る',
    lineMessage: '【寮・出稼ぎの相談】\n遠方から出稼ぎ・寮への入居を考えています。往復交通費の支給条件や個室寮の空き状況について教えていただけますか？',
    theme: {
      bgLight: 'bg-teal-50/50',
      border: 'border-teal-200',
      badgeBg: 'bg-teal-100 text-teal-900',
      accentText: 'text-teal-700',
      iconBg: 'bg-teal-100 text-teal-700',
      pillActive: 'bg-teal-600 text-white border-teal-600 shadow-sm'
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
  const [selectedRouteId, setSelectedRouteId] = useState<string>('inexperienced');
  const [showSafetyModal, setShowSafetyModal] = useState<boolean>(false);

  const currentRoute = DIAGNOSTIC_ROUTES.find(r => r.id === selectedRouteId) || DIAGNOSTIC_ROUTES[0];

  const handleAction = (item: DiagnosticRouteItem) => {
    if (item.actionType === 'safety') {
      setShowSafetyModal(true);
      if (onScrollToSafety) {
        onScrollToSafety();
      }
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
      {/* Container Box with elegant border and subtle gradient */}
      <div className="bg-gradient-to-b from-rose-50/70 via-white to-pink-50/30 rounded-3xl border-2 border-rose-200/90 shadow-lg p-6 sm:p-8 md:p-10 relative overflow-hidden">
        {/* Subtle decorative glow */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-rose-200/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-pink-200/20 rounded-full blur-3xl pointer-events-none" />

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10 relative z-10">
          <div className="inline-flex items-center gap-1.5 bg-rose-500 text-white text-[11px] sm:text-xs font-black px-4 py-1.5 rounded-full mb-3 shadow-xs">
            <LucideIcon name="CheckCircle2" size={14} className="text-yellow-300" />
            <span>あなたに合う働き方をチェック</span>
          </div>

          <h2 
            id="diagnostic-heading"
            className="font-display font-black text-2xl sm:text-3xl md:text-4xl text-on-surface leading-tight mb-3"
          >
            「結局、自分にはどれが合ってる？」
          </h2>

          <p className="font-sans text-xs sm:text-sm text-zinc-600 leading-relaxed">
            求人サイトやスカウトが色々あって迷ってしまう方へ。<br className="hidden sm:inline" />
            今のあなたの<strong>状況や希望</strong>を選ぶだけで、最も安心・高収入な働き方の導線がすぐにわかります。
          </p>
        </div>

        {/* 1. Quick Selector Pills: 6 Situations */}
        <div className="mb-8 relative z-10">
          <div className="text-[11px] sm:text-xs font-bold text-zinc-500 mb-2.5 flex items-center justify-center gap-1">
            <LucideIcon name="HelpCircle" size={14} className="text-secondary" />
            <span>あなたの今の状況・気になる条件をタップしてください（全6パターン）</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5">
            {DIAGNOSTIC_ROUTES.map((item) => {
              const isSelected = selectedRouteId === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setSelectedRouteId(item.id)}
                  className={`text-xs sm:text-sm font-bold px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-2xl transition-all cursor-pointer flex items-center gap-1.5 border ${
                    isSelected
                      ? item.theme.pillActive
                      : 'bg-white hover:bg-rose-50/80 text-zinc-700 border-zinc-200 hover:border-rose-300 shadow-2xs'
                  }`}
                  aria-pressed={isSelected}
                >
                  <LucideIcon name={item.iconName} size={15} />
                  <span>{item.situation}</span>
                  <span className="text-[10px] opacity-80">→</span>
                  <span className="text-[11px] sm:text-xs font-black underline underline-offset-2">
                    {item.targetLabel}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 2. Interactive Matched Hero Card (診断結果ハイライトカード) */}
        <div className="bg-white rounded-3xl border-2 border-secondary/30 shadow-md p-6 sm:p-8 mb-10 relative z-10 transition-all">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-rose-100">
            <div className="flex items-center gap-3.5">
              <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-xs ${currentRoute.theme.iconBg}`}>
                <LucideIcon name={currentRoute.iconName} size={26} />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <span className="text-xs font-extrabold text-zinc-500">あなたの状況：</span>
                  <span className="bg-zinc-800 text-white text-xs font-black px-2.5 py-0.5 rounded-full">
                    {currentRoute.situation}
                  </span>
                  <span className="text-xs text-zinc-400">→</span>
                  <span className={`text-xs font-black px-2.5 py-0.5 rounded-full ${currentRoute.theme.badgeBg}`}>
                    {currentRoute.badge}
                  </span>
                </div>
                <h3 className="font-display font-black text-xl sm:text-2xl text-on-surface">
                  おすすめの働き方：<span className="text-secondary underline decoration-rose-300 decoration-wavy underline-offset-4">{currentRoute.targetLabel}</span>
                </h3>
              </div>
            </div>

            {/* Income pill */}
            <div className="bg-rose-50/80 border border-rose-200/80 rounded-2xl px-4 py-2.5 text-left md:text-right w-full md:w-auto">
              <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">想定日給・給与目安</div>
              <div className="text-xs sm:text-sm font-black text-secondary">
                {currentRoute.expectedIncome}
              </div>
            </div>
          </div>

          <div className="py-6">
            <p className="text-xs sm:text-sm font-bold text-zinc-800 leading-relaxed mb-4">
              {currentRoute.tagline}
            </p>

            <div className="space-y-2.5 mb-6">
              {currentRoute.meritPoints.map((point, pIdx) => (
                <div key={pIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-700">
                  <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center flex-shrink-0 text-xs font-black mt-0.5">
                    ✔
                  </span>
                  <span className="leading-relaxed">{point}</span>
                </div>
              ))}
            </div>

            {/* Dual CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => handleAction(currentRoute)}
                className="bg-secondary hover:bg-rose-700 text-white text-xs sm:text-sm font-black px-6 py-3.5 rounded-xl shadow-sm transition-all flex items-center gap-2 cursor-pointer"
              >
                <LucideIcon name="ArrowRight" size={16} />
                <span>{currentRoute.buttonLabel}</span>
              </button>

              <button
                type="button"
                onClick={() => onConsultLine(currentRoute.targetLabel, currentRoute.lineMessage)}
                className="bg-[#06c755] hover:bg-[#05b34c] text-white text-xs sm:text-sm font-black px-5 py-3.5 rounded-xl shadow-xs transition-all flex items-center gap-2 cursor-pointer"
              >
                <LucideIcon name="MessageCircle" size={16} />
                <span>【公式LINE】{currentRoute.situation}の条件で無料相談する</span>
              </button>
            </div>
          </div>
        </div>

        {/* 3. All 6 Route Cards Grid (導線一覧) */}
        <div className="relative z-10">
          <div className="flex items-center justify-between gap-3 mb-4">
            <h3 className="font-display font-extrabold text-base sm:text-lg text-on-surface flex items-center gap-2">
              <LucideIcon name="Compass" size={18} className="text-secondary" />
              <span>あなたに合う働き方 導線一覧（全6コース）</span>
            </h3>
            <span className="text-[11px] text-zinc-500 font-medium">※カード選択で切替</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {DIAGNOSTIC_ROUTES.map((route) => {
              const isSelected = selectedRouteId === route.id;
              return (
                <div
                  key={route.id}
                  onClick={() => setSelectedRouteId(route.id)}
                  className={`rounded-2xl border-2 p-5 transition-all cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? 'bg-white border-secondary shadow-md ring-2 ring-rose-200'
                      : 'bg-white/90 hover:bg-white border-rose-100 hover:border-rose-300 shadow-2xs'
                  }`}
                >
                  <div>
                    {/* Top pill routing */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="text-[11px] font-black bg-zinc-800 text-white px-2.5 py-0.5 rounded-md">
                          {route.situation}
                        </span>
                        <span className="text-xs font-black text-secondary">→</span>
                        <span className={`text-[11px] font-black px-2 py-0.5 rounded-md ${route.theme.badgeBg}`}>
                          {route.targetLabel}
                        </span>
                      </div>
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${route.theme.iconBg}`}>
                        <LucideIcon name={route.iconName} size={16} />
                      </div>
                    </div>

                    <p className="text-xs text-zinc-500 leading-snug mb-3">
                      {route.situationDesc}
                    </p>

                    <div className="bg-zinc-50 rounded-xl p-2.5 mb-3 border border-zinc-100">
                      <div className="text-[10px] text-zinc-400 font-bold mb-0.5">給与目安</div>
                      <div className="text-xs font-extrabold text-zinc-800">
                        {route.expectedIncome}
                      </div>
                    </div>

                    <p className="text-xs font-bold text-zinc-700 leading-relaxed mb-4">
                      {route.tagline}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-zinc-100 flex items-center justify-between gap-2">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAction(route);
                      }}
                      className="text-xs font-extrabold text-secondary hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <span>{route.buttonLabel}</span>
                      <LucideIcon name="ChevronRight" size={14} />
                    </button>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onConsultLine(route.targetLabel, route.lineMessage);
                      }}
                      className="text-[#06c755] hover:text-[#05b34c] p-1 cursor-pointer"
                      title="LINEで相談"
                    >
                      <LucideIcon name="MessageCircle" size={18} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 4. Safety Deep Dive Modal/Drawer for "身バレが心配 → 安全対策を見る" */}
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

              <div className="space-y-4 mb-6 text-xs sm:text-sm text-zinc-700">
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
                    onConsultLine('身バレ対策', '【身バレ対策についての相談】\n身バレが不安なのですが、会社や家族に知られないための対策について詳しく教えてください。');
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
