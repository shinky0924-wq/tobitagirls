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
    iconName: 'FileCheck',
    title: '01｜正直で分かりやすい情報提供',
    description:
      '仕事内容・報酬・勤務条件・待遇など、働く前に知っておきたいことを正直にご説明します。良い部分だけでなく、条件や注意点も事前に確認できるようにします。',
    imageUrl: '/images/promise_honest_guide_1795427482100.jpg',
    imageAlt: '仕事内容や条件をまとめた案内ノートと椿のイメージ',
  },
  {
    number: '02',
    iconName: 'HeartHandshake',
    title: '02｜一人ひとりに合わせたサポート',
    description:
      '未経験の方、経験者の方、移籍を考えている方、それぞれの希望や不安に合わせて丁寧に対応します。',
    imageUrl: '/images/promise_personal_consult_1795427482290.jpg',
    imageAlt: '女性スタッフが一人ひとりの話を丁寧に聞く事前相談のイメージ',
  },
  {
    number: '03',
    iconName: 'Sparkles',
    title: '03｜女性が落ち着いて働ける環境づくり',
    description:
      '仲居さんによるサポートや、衣装・控室などの環境を整え、女性が仕事に取り組みやすい環境づくりを大切にしています。',
    imageUrl: '/images/promise_calm_space_1795427482160.jpg',
    imageAlt: '落ち着いて過ごせる和の空間と温かいお茶のイメージ',
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
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-10 md:mb-12">
          <span className="text-xs font-bold tracking-widest text-primary uppercase block">
            ABOUT TOBITA GIRLS
          </span>
          <h2
            id="about-heading"
            className="font-display font-bold text-2xl sm:text-3xl md:text-[34px] text-on-surface leading-snug text-balance"
          >
            飛田ガールズとは？
          </h2>
          <p className="font-display font-semibold text-base sm:text-lg text-secondary text-balance">
            あなたらしく働ける場所を、一緒に見つけませんか。
          </p>
        </div>

        {/* Intro Copy */}
        <div className="max-w-3xl mx-auto bg-surface rounded-2xl border border-outline-variant p-6 sm:p-8 mb-12 md:mb-14 space-y-4 text-[14.5px] sm:text-[15.5px] text-on-surface-variant leading-[1.85]">
          <p className="font-bold text-on-surface">
            飛田ガールズは、大阪・飛田新地の料亭直営の公式求人窓口です。
          </p>
          <p>
            初めてお仕事を考えている方、これまでの経験を活かしたい方、他店からの移籍を考えている方など、女性一人ひとりの希望や状況は異なります。
          </p>
          <p>
            私たちは、誰に対しても同じ働き方を勧めるのではなく、仕事内容・報酬・勤務条件などを丁寧にご説明し、それぞれに合った働き方を一緒に考えることを大切にしています。
          </p>
          <p>
            応募するかどうかを決める前に、まずはお店のことや条件を知っていただくことから始めてください。
          </p>
        </div>

        {/* Subheading for 3 Equal Cards */}
        <div className="text-center mb-8 md:mb-10">
          <h3 className="font-display font-bold text-xl sm:text-2xl text-on-surface leading-snug text-balance">
            飛田ガールズが大切にしている3つのこと
          </h3>
        </div>

        {/* 3 Equal Cards Grid (PC: 3 Columns, Mobile: 1 Column) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-7 items-stretch">
          {ABOUT_PILLARS.map((item) => (
            <article
              key={item.number}
              className="bg-surface rounded-2xl border border-outline-variant overflow-hidden flex flex-col h-full shadow-2xs hover:shadow-md hover:border-primary/35 transition-all duration-300"
            >
              <div className="aspect-[4/3] w-full overflow-hidden bg-surface-container-low border-b border-outline-variant/60 shrink-0">
                <img
                  src={item.imageUrl}
                  alt={item.imageAlt}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  decoding="async"
                  width={800}
                  height={600}
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="p-6 flex-1 flex flex-col">
                <div className="flex items-center gap-2 mb-3">
                  <LucideIcon name={item.iconName} size={17} className="text-primary shrink-0" />
                  <h4 className="font-display font-bold text-[16.5px] sm:text-[17.5px] text-on-surface leading-snug">
                    {item.title}
                  </h4>
                </div>
                <p className="text-[13.5px] sm:text-[14px] text-on-surface-variant leading-[1.85] flex-1">
                  {item.description}
                </p>
              </div>
            </article>
          ))}
        </div>

        {onNavigateAbout && (
          <div className="mt-10 text-center">
            <a
              href="/about"
              onClick={(e) => {
                e.preventDefault();
                onNavigateAbout();
              }}
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-secondary hover:text-primary border border-outline-variant hover:border-primary/40 bg-surface px-5 py-2.5 rounded-xl transition-colors"
            >
              <span>運営者情報・店舗サポート体制を詳しく見る</span>
              <LucideIcon name="ArrowRight" size={15} />
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
