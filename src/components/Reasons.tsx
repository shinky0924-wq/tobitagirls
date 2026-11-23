/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { SiteContent } from '../siteContent';
import LucideIcon from './LucideIcon';

interface ReasonsProps {
  content?: SiteContent['reasons'];
  onNavigateTopic?: (topicId: string) => void;
}

interface ReasonCardItem {
  number: string;
  iconName: string;
  title: string;
  catchphrase: string;
  description: string;
  appealPoints: string[];
  image: string;
  imageAlt: string;
  topicId: string;
  topicPath: string;
  linkLabel: string;
}

const REASONS_DATA: ReasonCardItem[] = [
  {
    number: '01',
    iconName: 'MapPin',
    title: 'メイン通り・青春通りの好立地',
    catchphrase: 'お店選びで大切な立地。お客様の目に留まりやすい場所。',
    description:
      'お店の立地は、働く環境を選ぶうえで大切なポイントのひとつです。飛田ガールズはメイン通り・青春通りの好立地を活かし、飛田新地で働きたい女性が安心して働きやすい集客環境づくりを大切にしています。',
    appealPoints: [
      'メイン通り・青春通りの好立地',
      'お客様の目に留まりやすい店舗環境',
      '集客を意識した落ち着いた店舗運営',
    ],
    image: '/images/reason_one_streetscape_1795428474828.jpg',
    imageAlt: '飛田新地の落ち着いた街並みと和風料亭の正面外観イメージイラスト',
    topicId: 'shops',
    topicPath: '/shops',
    linkLabel: '直営店舗・通り別の案内を見る',
  },
  {
    number: '02',
    iconName: 'HeartHandshake',
    title: 'ベテラン仲居さんによるトータルサポート',
    catchphrase: '身だしなみの準備から接客中まで、経験豊富な仲居さんがサポート。',
    description:
      'メイクや髪型、衣装の着こなしといった身だしなみの相談から、お客様のご案内・接客時間の管理まで飛田新地の仲居さんが伴走します。初めて飛田新地の仕事内容を覚える方にも寄り添う未経験者サポート体制です。',
    appealPoints: [
      'メイク・髪型や衣装に合わせた身だしなみ相談',
      'お客様へのご案内や接客時間の管理を仲居が担当',
      '未経験でもすぐ質問できる現場の見守りサポート',
    ],
    image: '/images/reason_two_nakaido_care_1795428475060.jpg',
    imageAlt: 'ベテランの仲居さんがメイクや身だしなみの相談に応じるイメージイラスト',
    topicId: 'job',
    topicPath: '/job',
    linkLabel: '仕事内容・仲居サポートを見る',
  },
  {
    number: '03',
    iconName: 'Shirt',
    title: '衣装無料貸出・お店で保管',
    catchphrase: '衣装の準備や持ち運びの負担を少なく。私服で通勤しやすい環境。',
    description:
      '着物やドレス、ワンピースなどの衣装を無料貸出しています。着用後の洗濯や店舗での保管にも対応しているため、飛田新地求人の中でも手荷物の負担を抑えて、普段通りの私服で通勤しやすい環境です。',
    appealPoints: [
      '着物・ドレス・ワンピースなどの無料貸出',
      '衣装の店舗保管と着用後の洗濯対応',
      '大きな荷物を持たず私服でそのまま通勤可能',
    ],
    image: '/images/reason_three_wardrobe_rack_1795428474306.jpg',
    imageAlt: '着物やワンピースが整然と保管された無料貸出衣装ラックのイメージイラスト',
    topicId: 'beginner',
    topicPath: '/beginner',
    linkLabel: '衣装貸出・初日の準備を見る',
  },
  {
    number: '04',
    iconName: 'Coffee',
    title: '快適に過ごせる女性専用待機スペース',
    catchphrase: '接客の合間も、落ち着いて自分の時間を過ごせる場所。',
    description:
      '冷暖房や空気清浄機、無料Wi-Fi、スマートフォンの充電環境、荷物保管スペースなど、飛田新地の女性専用待機スペースとして快適に過ごせる設備を整えています。待機中も落ち着いてお過ごしいただけます。',
    appealPoints: [
      '冷暖房完備・空気清浄機による快適な空調',
      '無料Wi-Fi・スマートフォンの充電環境',
      'お出かけ用バッグ等を保管できる専用スペース',
    ],
    image: '/images/reason_four_ladies_lounge_1795428474377.jpg',
    imageAlt: '空調や充電環境を備えた女性専用待機スペースのイメージイラスト',
    topicId: 'job',
    topicPath: '/job',
    linkLabel: '待機環境・1日の流れを見る',
  },
  {
    number: '05',
    iconName: 'Sparkles',
    title: '清潔で落ち着いた店内環境',
    catchphrase: '気持ちよく過ごしていただけるよう、清潔な空間づくりを大切に。',
    description:
      '接客ごとの室内換気やリネン類の交換、日々の店内清掃まで、衛生管理をひとつずつ丁寧に行っています。清潔で落ち着いた空間づくりを大切にしており、初めて訪れる女性にも安心して過ごしていただけます。',
    appealPoints: [
      '接客ごとのこまめな換気とリネン類の交換',
      '室内の日常清掃と衛生管理の徹底',
      '和の趣を感じる落ち着きある清潔な部屋',
    ],
    image: '/images/reason_five_clean_tatami_1795428475043.jpg',
    imageAlt: '換気と清潔なリネンで整えられた和室店内のイメージイラスト',
    topicId: 'safety',
    topicPath: '/safety',
    linkLabel: '衛生管理・安全への配慮を見る',
  },
  {
    number: '06',
    iconName: 'ShieldCheck',
    title: 'プライバシーを大切にした働き方',
    catchphrase: '仕事とプライベートを分けて、自分らしく働けるように。',
    description:
      '源氏名での勤務や、Web・SNSへの顔写真非掲載、お客様との連絡先交換・営業LINEを行わないルールなど、プライバシー面に配慮した働き方を整えています。自宅への郵送物がない形での調整もご相談いただけます。',
    appealPoints: [
      '源氏名での勤務・Web/SNSへの顔写真掲載なし',
      'お客様との連絡先交換や営業LINEなし',
      '自宅への郵送物に関する事前相談・配慮',
    ],
    image: '/images/reason_six_back_view_1795428489475.jpg',
    imageAlt: '仕事とプライベートを分けて自分らしく歩く女性後ろ姿のイメージイラスト',
    topicId: 'safety',
    topicPath: '/safety',
    linkLabel: '身バレ・プライバシー対策を見る',
  },
];

export default function Reasons({ onNavigateTopic }: ReasonsProps) {
  return (
    <section
      className="py-16 md:py-24 bg-surface border-b border-outline-variant/60"
      id="reasons"
      aria-labelledby="reasons-heading"
    >
      <div className="max-w-[1140px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-14">
          <span className="text-xs font-bold tracking-widest text-primary uppercase block mb-2">
            WHY TOBITA GIRLS
          </span>
          <h2
            id="reasons-heading"
            className="font-display font-bold text-2xl sm:text-3xl md:text-[34px] text-on-surface leading-snug mb-3 text-balance"
          >
            飛田ガールズが選ばれる6つの理由
          </h2>
          <p className="font-display font-bold text-[15px] sm:text-[17px] text-on-surface leading-relaxed mb-3">
            立地の良さから、毎日の身だしなみや接客のサポートまで。
            <br className="hidden sm:inline" />
            女性が気持ちよく働ける環境づくりを大切にしています。
          </p>
          <p className="font-sans text-sm sm:text-[15px] text-on-surface-variant leading-relaxed max-w-2xl mx-auto">
            飛田ガールズでは、初めてお仕事を考えている女性にも安心して検討していただけるよう、店舗環境やサポート体制を整えています。ここで働くからこそ感じられる魅力を、6つのポイントでご紹介します。
          </p>
          <p className="font-sans text-[11.5px] text-on-surface-variant/80 mt-3">
            ※各カードの画像は職場の雰囲気を伝えるイメージイラストです（実際の立地・衣装・控室は私服での店舗見学時に直接ご確認いただけます）。
          </p>
        </div>

        {/* 3x2 Desktop / 2-col Tablet / 1-col Mobile Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7">
          {REASONS_DATA.map((reason, idx) => (
            <motion.article
              key={reason.number}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.3, delay: idx * 0.04 }}
              className="group bg-white rounded-2xl border border-outline-variant shadow-2xs hover:shadow-md hover:border-primary/35 transition-all duration-300 overflow-hidden flex flex-col justify-between"
              id={`reason-item-${reason.number}`}
            >
              <div>
                <div className="relative aspect-video w-full overflow-hidden bg-surface-container-low border-b border-outline-variant/50">
                  <img
                    src={reason.image}
                    alt={reason.imageAlt}
                    className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                    loading="lazy"
                    decoding="async"
                    width={640}
                    height={360}
                    referrerPolicy="no-referrer"
                  />
                  <span className="absolute bottom-2 right-2.5 text-[10px] font-medium text-on-surface/80 bg-white/90 px-2 py-0.5 rounded border border-outline-variant/60">
                    イメージイラスト
                  </span>
                </div>

                <div className="p-5 sm:p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-bold text-primary tracking-wider tabular-nums">
                      REASON {reason.number}
                    </span>
                    <LucideIcon name={reason.iconName} size={17} className="text-primary shrink-0" />
                  </div>

                  <h3 className="font-display font-bold text-[17px] sm:text-[18px] text-on-surface leading-snug mb-2">
                    {reason.title}
                  </h3>

                  <p className="font-display font-bold text-[13px] sm:text-[13.5px] text-secondary leading-relaxed mb-2.5">
                    {reason.catchphrase}
                  </p>

                  <p className="font-sans text-[13.5px] text-on-surface-variant leading-relaxed mb-4">
                    {reason.description}
                  </p>

                  <ul className="space-y-2 border-t border-outline-variant/70 pt-3.5">
                    {reason.appealPoints.map((point) => (
                      <li
                        key={point}
                        className="flex items-start gap-2 text-[12.5px] sm:text-[13px] text-on-surface font-medium leading-snug"
                      >
                        <LucideIcon name="Check" size={14} className="text-primary shrink-0 mt-0.5" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="px-5 sm:px-6 pb-5 pt-1">
                <a
                  href={reason.topicPath}
                  onClick={(e) => {
                    if (onNavigateTopic) {
                      e.preventDefault();
                      onNavigateTopic(reason.topicId);
                    }
                  }}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-secondary hover:text-primary transition-colors"
                >
                  <span>{reason.linkLabel}</span>
                  <LucideIcon name="ArrowRight" size={13} />
                </a>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
