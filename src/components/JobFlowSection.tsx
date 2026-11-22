/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import LucideIcon from './LucideIcon';

interface JobFlowSectionProps {
  onNavigateJob?: () => void;
}

const DAILY_STEPS = [
  {
    step: 'STEP 01',
    title: '私服で出勤・無料貸出衣装へお着替え',
    detail: 'お店に着いたら控室で貸出の着物やドレス・ワンピースに着替え、メイクや身だしなみを整えます（持ち帰り不要・私服通勤可）。',
    icon: 'Shirt',
  },
  {
    step: 'STEP 02',
    title: '玄関（上がり框）での笑顔のお迎え',
    detail: '料亭の玄関先に座り、ご来店されたお客様へ挨拶をします。お客様への声掛けやご案内は、隣にいる仲居さん（店舗スタッフ）が担当します。',
    icon: 'Smile',
  },
  {
    step: 'STEP 03',
    title: '2階個室で15〜20分のおもてなし',
    detail: 'お部屋へご案内し、短い時間でおもてなし接客を行います。時間の確認や終了の合図も仲居さんがサポートするため、時計に追われる心配はありません。',
    icon: 'Clock',
  },
  {
    step: 'STEP 04',
    title: '控室で休憩しながら自分のペースで待機',
    detail: '接客とお部屋の準備の合間は女性専用の控室でリラックスして待機できます。ドリンクを飲んだり、スマホを見たりして過ごせます。',
    icon: 'Coffee',
  },
  {
    step: 'STEP 05',
    title: '私服に着替えてその日の報酬を全額現金受取',
    detail: 'シフト終了後は私服に着替え、その日の売上50％バック分を全額現金で受け取って退勤します。お部屋の後片付けは不要です。',
    icon: 'Banknote',
  },
];

export default function JobFlowSection({ onNavigateJob }: JobFlowSectionProps) {
  return (
    <section
      id="job"
      className="py-16 md:py-24 bg-white border-b border-outline-variant/60"
      aria-labelledby="job-heading"
    >
      <div className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-14">
          <span className="text-xs font-bold tracking-widest text-primary uppercase block mb-2">
            JOB &amp; DAILY FLOW
          </span>
          <h2
            id="job-heading"
            className="font-display font-bold text-2xl sm:text-3xl md:text-[34px] text-on-surface leading-snug mb-3 text-balance"
          >
            仕事内容・1日の流れ
          </h2>
          <p className="font-sans text-sm sm:text-[15px] text-on-surface-variant leading-relaxed">
            飛田新地のお仕事は「短い接客時間」と「仲居さんのサポート」が特徴です。未経験の方にも全体のイメージが分かるよう、1日の流れを整理しました。
          </p>
        </div>

        {/* 5-Step Daily Flow Timeline */}
        <div className="space-y-3.5 mb-12">
          {DAILY_STEPS.map((item) => (
            <div
              key={item.step}
              className="rounded-2xl bg-surface border border-outline-variant p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center gap-3.5 sm:gap-5"
            >
              <div className="flex items-center gap-3 shrink-0">
                <div className="w-10 h-10 rounded-xl bg-white border border-outline-variant flex items-center justify-center text-primary shrink-0">
                  <LucideIcon name={item.icon} size={18} />
                </div>
                <span className="font-sans font-bold text-xs tracking-wider text-primary bg-white px-2.5 py-1 rounded-md border border-outline-variant">
                  {item.step}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-display font-bold text-base sm:text-[17px] text-on-surface mb-1">
                  {item.title}
                </h3>
                <p className="text-[13px] sm:text-sm text-on-surface-variant leading-relaxed">
                  {item.detail}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Reassurance Comparison: What is NOT required & Safety Rules */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="rounded-2xl bg-surface p-6 border border-outline-variant">
            <h3 className="font-display font-bold text-base sm:text-lg text-on-surface mb-3.5 flex items-center gap-2">
              <LucideIcon name="CheckCircle2" size={18} className="text-primary shrink-0" />
              <span>お仕事で不要なこと・ないこと</span>
            </h3>
            <ul className="space-y-2.5 text-[13.5px] text-on-surface-variant">
              <li className="flex items-start gap-2">
                <LucideIcon name="Check" size={15} className="text-primary shrink-0 mt-0.5" />
                <span><strong className="text-on-surface">お酒の飲酒・お酌：</strong>料亭はお酒を飲む場ではないため、お酒が飲めない方も問題ありません。</span>
              </li>
              <li className="flex items-start gap-2">
                <LucideIcon name="Check" size={15} className="text-primary shrink-0 mt-0.5" />
                <span><strong className="text-on-surface">連絡先交換・営業LINE：</strong>お客様との私的な連絡先交換や、勤務時間外のメッセージ対応はありません。</span>
              </li>
              <li className="flex items-start gap-2">
                <LucideIcon name="Check" size={15} className="text-primary shrink-0 mt-0.5" />
                <span><strong className="text-on-surface">指名競争・売上ノルマ：</strong>店舗の在籍同士での競争や指名ノルマ、達成できない場合の罰金はありません。</span>
              </li>
              <li className="flex items-start gap-2">
                <LucideIcon name="Check" size={15} className="text-primary shrink-0 mt-0.5" />
                <span><strong className="text-on-surface">お茶出しや浴室掃除の雑用：</strong>お部屋の準備・後片付けや呼び込みは仲居さんが担当します。</span>
              </li>
            </ul>
          </div>

          <div className="rounded-2xl bg-surface-container/50 p-6 border border-outline-variant">
            <h3 className="font-display font-bold text-base sm:text-lg text-on-surface mb-3.5 flex items-center gap-2">
              <LucideIcon name="ShieldCheck" size={18} className="text-secondary shrink-0" />
              <span>安心のための衛生・禁止ルール</span>
            </h3>
            <ul className="space-y-2.5 text-[13.5px] text-on-surface-variant">
              <li className="flex items-start gap-2">
                <LucideIcon name="Shield" size={15} className="text-secondary shrink-0 mt-0.5" />
                <span><strong className="text-on-surface">禁止事項の徹底：</strong>キスや粘膜への危険を伴う行為は一切禁止しており、コンドーム着用を徹底しています。</span>
              </li>
              <li className="flex items-start gap-2">
                <LucideIcon name="Shield" size={15} className="text-secondary shrink-0 mt-0.5" />
                <span><strong className="text-on-surface">衛生備品と清拭対応：</strong>客室に浴槽やシャワーはなく、おしぼりや衛生用品を用いた清拭対応を行っています。</span>
              </li>
              <li className="flex items-start gap-2">
                <LucideIcon name="Shield" size={15} className="text-secondary shrink-0 mt-0.5" />
                <span><strong className="text-on-surface">仲居さんの見守りと時間管理：</strong>入室から退室まで店舗側で時間を把握し、困った際はすぐに呼び出せる環境です。</span>
              </li>
              <li className="flex items-start gap-2">
                <LucideIcon name="Shield" size={15} className="text-secondary shrink-0 mt-0.5" />
                <span><strong className="text-on-surface">撮影行為の禁止：</strong>エリア全体および店内での写真・動画撮影は固く禁止しています。</span>
              </li>
            </ul>
          </div>
        </div>

        {onNavigateJob && (
          <div className="mt-8 text-center">
            <a
              href="/job"
              onClick={(e) => {
                e.preventDefault();
                onNavigateJob();
              }}
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-white bg-primary hover:bg-secondary px-6 py-3 rounded-xl shadow-xs transition-colors"
            >
              <span>仕事内容・1日の流れをさらに詳しく見る</span>
              <LucideIcon name="ArrowRight" size={15} />
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
