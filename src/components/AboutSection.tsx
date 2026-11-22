/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import LucideIcon from './LucideIcon';

interface AboutSectionProps {
  onNavigateAbout?: () => void;
}

const ABOUT_PILLARS = [
  {
    number: '01',
    title: '料亭直営の直接募集',
    body: '外部のスカウトや紹介仲介業者を通さず、飛田新地のお店の採用担当が直接ご案内・採用します。',
  },
  {
    number: '02',
    title: '仲介料・紹介手数料ゼロ',
    body: 'お店による直接窓口のため、報酬から紹介手数料が引かれる仕組みはありません。',
  },
  {
    number: '03',
    title: '事前の丁寧な条件説明',
    body: '仕事内容・報酬計算・衛生ルール・必要書類を勤務前にしっかり確認でき、見学のみも可能です。',
  },
  {
    number: '04',
    title: '一人ひとりに合わせた相談',
    body: '夜職が初めての方も、他業種・他店からの移籍をお考えの方も、希望条件に合わせて相談できます。',
  },
];

export default function AboutSection({ onNavigateAbout }: AboutSectionProps) {
  return (
    <section
      id="about"
      className="py-16 md:py-24 bg-white border-b border-outline-variant/60"
      aria-labelledby="about-heading"
    >
      <div className="max-w-[1140px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Visual */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            <div className="rounded-2xl overflow-hidden border border-outline-variant bg-surface p-2 shadow-sm">
              <img
                src="/images/home_about_counseling_1795337038457.jpg"
                alt="女性スタッフとの落ち着いた事前相談イメージ"
                className="w-full h-auto aspect-[4/3] object-cover rounded-xl bg-surface-container-low"
                loading="lazy"
                decoding="async"
                width={1024}
                height={768}
                referrerPolicy="no-referrer"
              />
              <p className="text-[11px] text-on-surface-variant/80 pt-2 px-1 text-right">
                ※事前相談・面談のイメージ画像です
              </p>
            </div>
          </div>

          {/* Right Narrative */}
          <div className="lg:col-span-7 space-y-5 order-1 lg:order-2">
            <div>
              <span className="text-xs font-bold tracking-widest text-primary uppercase block mb-2">
                ABOUT TOBITA GIRLS
              </span>
              <h2
                id="about-heading"
                className="font-display font-bold text-2xl sm:text-3xl md:text-[34px] text-on-surface leading-snug text-balance"
              >
                飛田ガールズとは？
              </h2>
              <p className="font-display font-semibold text-base sm:text-lg text-secondary mt-2">
                あなたらしく働ける場所を、一緒に見つけませんか。
              </p>
            </div>

            <div className="font-sans text-[14.5px] sm:text-[15.5px] text-on-surface-variant leading-[1.85] space-y-3.5">
              <p>
                飛田ガールズは、大阪市西成区・飛田新地にある料亭直営の公式求人窓口です。
              </p>
              <p>
                私たちが大切にしているのは、これから働く女性にも、新しい環境への移籍を考えている女性にも、一人ひとりの希望や状況に合わせて丁寧に向き合うことです。
              </p>
              <p>
                仕事内容や報酬、勤務時間、待遇など、働くうえで気になることは事前にご確認いただけます。未経験の方はもちろん、経験を活かして働きたい方や、今の働き方を見直したい方も、まずはお気軽にご相談ください。自分に合った環境なのか、希望する働き方ができるのかを一緒に整理するところからお手伝いします。
              </p>
            </div>

            {/* Clear distinction: District general info vs Tobita Girls direct standard */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
              <div className="rounded-xl bg-surface p-4 border border-outline-variant">
                <div className="text-xs font-bold text-secondary mb-1.5 flex items-center gap-1.5">
                  <LucideIcon name="MapPin" size={14} className="text-primary" />
                  <span>飛田新地エリアの特徴（一般）</span>
                </div>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  大阪市西成区山王にある歴史ある料亭街。玄関（上がり框）でお客様をお迎えし、個室で15〜20分中心のおもてなし接客を行うスタイルです。お酒の提供や撮影行為は行いません。
                </p>
              </div>
              <div className="rounded-xl bg-surface-container/60 p-4 border border-primary/25">
                <div className="text-xs font-bold text-secondary mb-1.5 flex items-center gap-1.5">
                  <LucideIcon name="ShieldCheck" size={14} className="text-primary" />
                  <span>飛田ガールズの独自体制（直営）</span>
                </div>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  スカウト・仲介を通さない料亭の公式採用窓口。女性スタッフによる事前相談・店内見学・無料貸出衣装の準備、売上50％バックの明確な日払い案内を直接行います。
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Pillars Grid */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {ABOUT_PILLARS.map((item) => (
            <div
              key={item.number}
              className="rounded-2xl bg-surface p-5 border border-outline-variant flex flex-col justify-between"
            >
              <div>
                <span className="font-sans text-xs font-bold text-primary tracking-wider block mb-2">
                  POINT {item.number}
                </span>
                <h3 className="font-display font-bold text-base text-on-surface mb-2">
                  {item.title}
                </h3>
                <p className="text-[13px] text-on-surface-variant leading-relaxed">
                  {item.body}
                </p>
              </div>
            </div>
          ))}
        </div>

        {onNavigateAbout && (
          <div className="mt-8 text-center">
            <a
              href="/about"
              onClick={(e) => {
                e.preventDefault();
                onNavigateAbout();
              }}
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-secondary hover:text-primary border border-outline-variant hover:border-primary/40 bg-surface px-5 py-2.5 rounded-xl transition-colors"
            >
              <span>運営者情報・直営サポート体制を詳しく見る</span>
              <LucideIcon name="ArrowRight" size={15} />
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
