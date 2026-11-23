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
    title: '出勤・お着替え',
    detail:
      '私服のまま店舗へ到着したら、女性専用の控室・お支度スペースで無料の貸出衣装（着物・ドレス・ワンピースなど）に着替え、髪型やメイク・身だしなみを整えます。衣装は店舗保管のため持ち帰りは不要です。',
    imageUrl: '/images/job_step_one_kimono_1795427482137.jpg',
    imageAlt: 'お支度スペースでの着物・メイク準備イラスト',
  },
  {
    step: 'STEP 02',
    title: 'お客様のお迎え',
    detail:
      '玄関（上がり框）に座り、笑顔でお客様をお迎えします。通りを歩かれるお客様への声掛けや呼び込み、料金やコースのご案内は隣に立つ仲居さん（店舗スタッフ）が担当するため、ご自身で無理に客引きをする必要はありません。',
    imageUrl: '/images/job_step_two_entrance_1795427481883.jpg',
    imageAlt: '料亭の玄関・上がり框でお客様をお迎えする様子を描いたイラスト',
  },
  {
    step: 'STEP 03',
    title: '個室での接客',
    detail:
      '仲居さんの案内に続いて2階の和室へ上がり、15分〜20分中心の短時間のおもてなし接客（ほか30分・45分・60分コースあり）を行います。時間計測や終了の合図も店舗側で管理しているため安心です。',
    imageUrl: '/images/job_step_three_room_1795427481851.jpg',
    imageAlt: '清潔に整えられた和室個室のイラスト',
  },
  {
    step: 'STEP 04',
    title: '待機・休憩',
    detail:
      '接客が終わった後のお部屋の手配や片付け・換気は仲居さんが行います。次の接客までの待機時間や休憩時間は、冷暖房・Wi-Fi完備の女性専用控室で飲み物を飲んだり休んだりしながらリラックスして過ごせます。',
    imageUrl: '/images/job_step_four_lounge_1795427481362.jpg',
    imageAlt: '女性専用控室でリラックスして休憩できるラウンジのイラスト',
  },
  {
    step: 'STEP 05',
    title: '退勤・報酬の受け取り',
    detail:
      '予定のシフト時刻になったら私服へ着替え、その日に担当した売上50％バックの報酬額を退勤時に全額現金で受け取って帰宅します。居残り強制や翌月繰り越しはありません。',
    imageUrl: '/images/job_step_five_payout_1795427481685.jpg',
    imageAlt: '退勤時の即日現金受け取りを表した丁寧な金封イラスト',
  },
];

export default function JobFlowSection({ onNavigateJob }: JobFlowSectionProps) {
  return (
    <section
      id="job"
      className="py-16 md:py-24 bg-white border-b border-outline-variant/60"
      aria-labelledby="job-heading"
    >
      <div className="max-w-[1140px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-14 space-y-3">
          <span className="text-xs font-bold tracking-widest text-primary uppercase block">
            JOB &amp; DAILY FLOW
          </span>
          <h2
            id="job-heading"
            className="font-display font-bold text-2xl sm:text-3xl md:text-[34px] text-on-surface leading-snug text-balance"
          >
            飛田新地のお仕事内容・1日の流れ
          </h2>
          <p className="font-sans text-sm sm:text-[15px] text-on-surface-variant leading-relaxed">
            初めての方にも分かるように、出勤から退勤までの流れをご紹介します。
          </p>
        </div>

        {/* Role Division Overview: Woman vs Nakai-san */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-12">
          <div className="rounded-2xl bg-surface p-6 border border-outline-variant space-y-3">
            <div className="flex items-center gap-2 text-primary font-bold text-sm">
              <LucideIcon name="UserCheck" size={18} className="shrink-0" />
              <h3>女性が担当すること</h3>
            </div>
            <p className="text-xs sm:text-[13.5px] text-on-surface-variant leading-relaxed">
              飛田新地のお仕事は、玄関先でのお迎えと、2階個室での短時間（15〜20分中心）のおもてなし接客が中心です。お酒の席への同席や飲酒、お客様との連絡先交換や営業LINEは行いません。
            </p>
            <ul className="space-y-1.5 text-xs text-on-surface pt-1">
              <li className="flex items-start gap-2">
                <LucideIcon name="Check" size={14} className="text-primary shrink-0 mt-0.5" />
                <span>玄関での笑顔のお迎え・挨拶</span>
              </li>
              <li className="flex items-start gap-2">
                <LucideIcon name="Check" size={14} className="text-primary shrink-0 mt-0.5" />
                <span>15〜60分のコースに沿った個室での接客</span>
              </li>
            </ul>
          </div>

          <div className="rounded-2xl bg-surface p-6 border border-outline-variant space-y-3">
            <div className="flex items-center gap-2 text-secondary font-bold text-sm">
              <LucideIcon name="HeartHandshake" size={18} className="shrink-0" />
              <h3>仲居さん（店舗スタッフ）が担当すること</h3>
            </div>
            <p className="text-xs sm:text-[13.5px] text-on-surface-variant leading-relaxed">
              経験豊富な仲居さんがお迎えから時間管理、お部屋の清潔管理まで裏方の業務をすべて担うため、女性が一人で無理な営業や片付けを行うことはありません。
            </p>
            <ul className="space-y-1.5 text-xs text-on-surface pt-1">
              <li className="flex items-start gap-2">
                <LucideIcon name="Check" size={14} className="text-secondary shrink-0 mt-0.5" />
                <span>お客様への声掛け・コースや料金のご案内・精算</span>
              </li>
              <li className="flex items-start gap-2">
                <LucideIcon name="Check" size={14} className="text-secondary shrink-0 mt-0.5" />
                <span>接客中の時間管理・安全見守り・お部屋の清掃準備</span>
              </li>
            </ul>
          </div>
        </div>

        {/* 5 Numbered Steps with Dedicated Illustrations */}
        <div className="space-y-4 mb-12">
          {DAILY_STEPS.map((item) => (
            <article
              key={item.step}
              className="rounded-2xl bg-surface border border-outline-variant overflow-hidden grid grid-cols-1 md:grid-cols-12 items-stretch"
            >
              <div className="md:col-span-4 lg:col-span-3 aspect-[4/3] md:aspect-auto bg-white overflow-hidden border-b md:border-b-0 md:border-r border-outline-variant/70">
                <img
                  src={item.imageUrl}
                  alt={item.imageAlt}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  decoding="async"
                  width={480}
                  height={360}
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="md:col-span-8 lg:col-span-9 p-5 sm:p-6 flex flex-col justify-center space-y-2">
                <div className="text-xs font-bold tracking-wider text-primary tabular-nums">
                  {item.step}
                </div>
                <h3 className="font-display font-bold text-lg sm:text-xl text-on-surface leading-snug">
                  {item.title}
                </h3>
                <p className="text-[13.5px] sm:text-sm text-on-surface-variant leading-[1.8]">
                  {item.detail}
                </p>
              </div>
            </article>
          ))}
        </div>

        {/* Hygiene & Store Rules */}
        <div className="rounded-2xl bg-surface-container/40 p-6 sm:p-7 border border-outline-variant">
          <h3 className="font-display font-bold text-base sm:text-lg text-on-surface mb-4 flex items-center gap-2">
            <LucideIcon name="ShieldCheck" size={18} className="text-primary shrink-0" />
            <span>衛生管理と店舗の安全ルールについて</span>
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs sm:text-[13px] text-on-surface-variant leading-relaxed">
            <div className="bg-white rounded-xl border border-outline-variant p-4">
              <strong className="text-on-surface block mb-1">おしぼり・清拭対応</strong>
              客室内に浴槽やシャワー設備はありません。清潔なおしぼりや衛生消耗品を用いた清拭対応を徹底しています。
            </div>
            <div className="bg-white rounded-xl border border-outline-variant p-4">
              <strong className="text-on-surface block mb-1">禁止事項・保護徹底</strong>
              キスや粘膜への危険を伴う行為は一切禁止し、必ず衛生用品（コンドーム）を着用するルールです。
            </div>
            <div className="bg-white rounded-xl border border-outline-variant p-4">
              <strong className="text-on-surface block mb-1">換気・リネン交換</strong>
              1組ごとのご案内後に換気とタオル・シーツ交換を行い、常に清潔な状態でお部屋を用意します。
            </div>
            <div className="bg-white rounded-xl border border-outline-variant p-4">
              <strong className="text-on-surface block mb-1">撮影行為の禁止</strong>
              エリア全体および店内での写真・動画撮影は固く禁止されており、プライバシーを守って働けます。
            </div>
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
