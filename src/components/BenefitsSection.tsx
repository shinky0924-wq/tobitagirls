/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import LucideIcon from './LucideIcon';
import { LINE_OFFICIAL_URL } from '../data';

interface BenefitItem {
  number: string;
  icon: string;
  title: string;
  summary: string;
  detail: string;
  conditionNote: string;
}

const BENEFITS_ITEMS: BenefitItem[] = [
  {
    number: '01',
    icon: 'Shirt',
    title: '無料貸出衣装・店舗保管',
    summary: '私服のまま手ぶらで通勤できます',
    detail:
      '着物・浴衣・ワンピース・コスチュームなど、お仕度に使う衣装はすべて無料で貸し出しています。店舗で保管・管理するため、ご自宅へ持ち帰る必要はありません。',
    conditionNote: '衣装レンタル代・クリーニング費の天引きはありません',
  },
  {
    number: '02',
    icon: 'Sparkles',
    title: 'メイク・美容アドバイス',
    summary: '未経験でも落ち着いてお仕度できます',
    detail:
      '和室や照明に映えるナチュラルメイクのコツや、ヘアセット・身だしなみのポイントを女性スタッフが丁寧にお伝えします。初めての方もご安心ください。',
    conditionNote: 'お仕度スペースの鏡台・ドライヤー等も利用可能',
  },
  {
    number: '03',
    icon: 'Sofa',
    title: '女性専用の控室・待機スペース',
    summary: '休憩や待機時間を落ち着いて過ごせます',
    detail:
      '冷暖房・無料Wi-Fi・充電環境・お荷物保管スペースを備えた女性専用の待機室をご用意しています。スマートフォンを見たり軽食をとったりと、無理なく過ごせます。',
    conditionNote: 'ロッカー代や待機室利用料などの雑費徴収はありません',
  },
  {
    number: '04',
    icon: 'Home',
    title: '寮・遠方からの滞在ご相談',
    summary: '短期・遠方希望の住環境をご案内',
    detail:
      '遠方からの出稼ぎや一人暮らしを希望される方向けに、個室タイプの住環境をご相談いただけます。間取りや家具家電の有無も事前にお伝えします。',
    conditionNote: '※空き状況・利用料・入居条件は時期により異なるため事前確認制です',
  },
  {
    number: '05',
    icon: 'Train',
    title: '駅チカ立地・交通費サポート相談',
    summary: '主要3駅から徒歩圏内で通いやすい環境',
    detail:
      'Osaka Metro動物園前駅から徒歩5分、JR・南海新今宮駅から徒歩7分、天王寺駅・阿部野橋駅から徒歩10分と複数路線から徒歩圏内です。',
    conditionNote: '※遠方交通費の支給条件・上限は出発地や勤務予定により異なるため事前にご案内します',
  },
];

export default function BenefitsSection() {
  return (
    <section
      id="benefits"
      className="py-16 md:py-24 bg-white border-b border-outline-variant/60"
      aria-labelledby="benefits-heading"
    >
      <div className="max-w-[1160px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest text-primary uppercase">
            <span className="w-4 h-px bg-primary" aria-hidden="true" />
            <span>BENEFITS &amp; WELFARE</span>
            <span className="w-4 h-px bg-primary" aria-hidden="true" />
          </div>
          <h2
            id="benefits-heading"
            className="font-display font-bold text-2xl sm:text-3xl md:text-4xl text-on-surface leading-snug text-balance"
          >
            待遇・福利厚生
          </h2>
          <p className="font-sans text-sm sm:text-base text-on-surface-variant leading-relaxed">
            お仕事のしやすさと私生活との両立を考え、衣装や待機環境を整えています。条件の適用範囲についても応募前に分かりやすくご説明します。
          </p>
        </div>

        {/* 5 Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {BENEFITS_ITEMS.map((item) => (
            <article
              key={item.number}
              className="rounded-2xl bg-surface border border-outline-variant p-6 flex flex-col justify-between gap-4 shadow-2xs"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <div className="w-10 h-10 rounded-xl bg-white border border-outline-variant text-primary flex items-center justify-center">
                    <LucideIcon name={item.icon} size={20} />
                  </div>
                  <span className="text-xs font-mono font-bold text-primary">
                    BENEFIT {item.number}
                  </span>
                </div>

                <div>
                  <h3 className="font-display font-bold text-base sm:text-lg text-on-surface leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs font-bold text-secondary mt-1">{item.summary}</p>
                </div>

                <p className="text-xs sm:text-[13px] text-on-surface-variant leading-relaxed">
                  {item.detail}
                </p>
              </div>

              <div className="pt-3 border-t border-outline-variant/70 text-[11.5px] font-medium text-on-surface flex items-start gap-2">
                <LucideIcon name="Check" size={14} className="text-primary shrink-0 mt-0.5" />
                <span className="leading-relaxed">{item.conditionNote}</span>
              </div>
            </article>
          ))}

          {/* 6th Grid Card: Pre-check CTA Card */}
          <div className="rounded-2xl bg-surface-container/60 border border-outline-variant p-6 flex flex-col justify-between gap-4">
            <div className="space-y-2.5">
              <span className="text-xs font-bold text-primary block">事前確認のご案内</span>
              <h3 className="font-display font-bold text-base sm:text-lg text-on-surface leading-snug">
                寮や交通費の条件も応募前に確認できます
              </h3>
              <p className="text-xs sm:text-[13px] text-on-surface-variant leading-relaxed">
                「この日数の勤務でも寮は使える？」「遠方からの交通費の目安は？」といった点も、LINEでご希望をお伺いしたうえでお答えしています。
              </p>
            </div>
            <a
              href={LINE_OFFICIAL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-white hover:bg-surface text-secondary border border-outline-variant font-bold text-xs px-4 py-3 rounded-xl shadow-2xs transition-colors"
            >
              <LucideIcon name="MessageCircle" size={16} className="text-[#06C755]" />
              <span>LINEで待遇条件を聞く</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
