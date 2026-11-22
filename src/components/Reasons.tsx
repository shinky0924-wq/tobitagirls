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
  description: string;
  appealPoints: string[];
  image: string;
  topicId: string;
  topicPath: string;
  linkLabel: string;
}

const REASONS_DATA: ReasonCardItem[] = [
  {
    number: '01',
    iconName: 'TrendingUp',
    title: '料亭直営・集客への取り組み',
    description:
      '外部の仲介を介さない料亭直営の運営だからこそ、新規のお客様だけでなくリピーターにも選ばれる清潔で落ち着いたお店づくりを行っています。',
    appealPoints: [
      '紹介料・仲介手数料ゼロの直接募集',
      '新規・リピーターともに来客を意識した運営',
      '無理のないペースで働ける環境整備',
    ],
    image: '/images/home_reason_customer_attract_1795337038147.jpg',
    topicId: 'shops',
    topicPath: '/shops',
    linkLabel: '通りの特徴・お店案内を見る',
  },
  {
    number: '02',
    iconName: 'Sparkles',
    title: '無料衣装・美容サポート',
    description:
      'お仕事で使う着物やドレス・ワンピース等の衣装は無料で貸し出し。メイクや身だしなみに不安がある場合も女性スタッフが相談に乗ります。',
    appealPoints: [
      '着物・ドレスなど衣装を無料用意',
      '似合うメイクや髪型のアドバイス',
      '店舗保管のため私服・手ぶらで通勤可',
    ],
    image: '/images/home_reason_beauty_care_1795337038265.jpg',
    topicId: 'beginner',
    topicPath: '/beginner',
    linkLabel: '未経験向け準備・衣装を見る',
  },
  {
    number: '03',
    iconName: 'HeartHandshake',
    title: '未経験から始めやすい丁寧な事前説明',
    description:
      '初めての方でも疑問や不安を残さないよう、お仕事の手順や衛生ルール、禁止事項を勤務前に一つずつ丁寧にお伝えしています。',
    appealPoints: [
      '女性スタッフによる事前の個別説明',
      '仲居さんが呼び込み・時間管理を担当',
      '1日体験入店のみで続けるか判断OK',
    ],
    image: '/images/home_reason_beginner_guide_1795337038025.jpg',
    topicId: 'job',
    topicPath: '/job',
    linkLabel: 'お仕事の流れを詳しく見る',
  },
  {
    number: '04',
    iconName: 'Smile',
    title: '落ち着いた人間関係と働きやすい空気',
    description:
      '派閥やギスギスした競争、理不尽なノルマを作らないよう配慮し、初めての方も移籍の方も落ち着いて過ごせる雰囲気を大切にしています。',
    appealPoints: [
      '指名競争・売上ノルマ・罰金なし',
      'お客様との連絡先交換・営業LINEなし',
      'お互いを尊重できる穏やかな職場環境',
    ],
    image: '/images/home_reason_harmony_team_1795337037995.jpg',
    topicId: 'experienced',
    topicPath: '/experienced',
    linkLabel: '経験者・移籍の案内を見る',
  },
  {
    number: '05',
    iconName: 'Coins',
    title: '明朗な売上50％バック・即日日払い',
    description:
      '報酬の計算方法やコース別の目安、お支払いタイミングを事前に明確にご説明します。その日に働いた分は退勤時に全額現金でお渡しします。',
    appealPoints: [
      '分かりやすい売上50％バックの計算',
      'ロッカー代・更衣室代などの雑費天引きなし',
      '毎回退勤時の全額現金手渡し',
    ],
    image: '/images/home_reason_clear_salary_1795337038446.jpg',
    topicId: 'salary',
    topicPath: '/salary',
    linkLabel: '給料計算・待遇の詳細を見る',
  },
  {
    number: '06',
    iconName: 'ShieldCheck',
    title: '身バレ防止・プライバシーへの配慮',
    description:
      'Webサイト・SNSへの顔写真掲載は行わず、エリア全体の撮影禁止ルールや完全源氏名、郵送物なしなどプライバシー面に配慮しています。',
    appealPoints: [
      'ネット・SNSへの顔写真掲載ゼロ',
      '自宅への郵送物なし・完全源氏名勤務',
      '副業向け住民税「普通徴収」手続き案内',
    ],
    image: '/images/home_reason_privacy_safe_1795337039122.jpg',
    topicId: 'safety',
    topicPath: '/safety',
    linkLabel: '身バレ・安全対策を見る',
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
        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-14">
          <span className="text-xs font-bold tracking-widest text-primary uppercase block mb-2">
            WHY TOBITA GIRLS
          </span>
          <h2
            id="reasons-heading"
            className="font-display font-bold text-2xl sm:text-3xl md:text-[34px] text-on-surface leading-snug mb-3 text-balance"
          >
            飛田ガールズが選ばれる6つの理由
          </h2>
          <p className="font-sans text-sm sm:text-[15px] text-on-surface-variant leading-relaxed">
            料亭直営の公式窓口だからこそ整えられる、安心感と分かりやすさを大切にしています。
            <span className="block text-[11px] text-on-surface-variant/75 mt-1">
              ※各カードの写真はイメージ画像です
            </span>
          </p>
        </div>

        {/* 3x2 Desktop / 1-col Mobile Grid */}
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
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-surface-container-low">
                  <img
                    src={reason.image}
                    alt={`${reason.title}（イメージ）`}
                    className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                    loading="lazy"
                    decoding="async"
                    width={640}
                    height={360}
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs text-primary font-sans font-bold text-[11px] px-2.5 py-1 rounded-lg border border-outline-variant shadow-2xs tracking-wider">
                    REASON {reason.number}
                  </div>
                </div>

                <div className="p-5 sm:p-6">
                  <div className="flex items-center gap-2 mb-2.5">
                    <LucideIcon name={reason.iconName} size={18} className="text-primary shrink-0" />
                    <h3 className="font-display font-bold text-[17px] sm:text-[18px] text-on-surface leading-snug">
                      {reason.title}
                    </h3>
                  </div>

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
