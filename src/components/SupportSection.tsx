/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import LucideIcon from './LucideIcon';
import { LINE_OFFICIAL_URL } from '../data';

interface SupportPillar {
  number: string;
  icon: string;
  title: string;
  description: string;
}

const SUPPORT_PILLARS: SupportPillar[] = [
  {
    number: '01',
    icon: 'MessageCircle',
    title: '応募前の個別相談',
    description:
      '「自分に向いているか不安」「まず条件だけ確認したい」という段階から、女性採用担当がLINEで一つひとつお答えします。本名や写真の送信も不要です。',
  },
  {
    number: '02',
    icon: 'BookOpenCheck',
    title: '未経験者への丁寧な事前説明',
    description:
      '入店や体験入店の前に、一日の動き・接客マナー・衛生ルール・禁止事項を女性スタッフがマンツーマンで分かりやすくお伝えします。',
  },
  {
    number: '03',
    icon: 'Users',
    title: '仲居さんによる常時サポート',
    description:
      '勤務中は経験豊富な仲居さん（おばちゃん）が玄関での呼び込みやお客様へのご案内、タイマーの時間管理などを隣でしっかりフォローします。',
  },
  {
    number: '04',
    icon: 'Sparkles',
    title: '衣装・身だしなみの相談',
    description:
      '雰囲気に合った無料貸出衣装の選び方や、メイク・ヘアセットのコツ、お仕度で用意しておくと便利な小物なども女性目線でアドバイスしています。',
  },
  {
    number: '05',
    icon: 'HeartHandshake',
    title: '勤務開始後の継続フォロー',
    description:
      '働き始めてからのシフト調整や体調管理、プライベートの事情、職場での悩みごとも、直営スタッフへいつでも気兼ねなく相談できる窓口を整えています。',
  },
];

export default function SupportSection() {
  return (
    <section
      id="support"
      className="py-16 md:py-24 bg-white border-b border-outline-variant/60"
      aria-labelledby="support-heading"
    >
      <div className="max-w-[1160px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest text-primary uppercase">
            <span className="w-4 h-px bg-primary" aria-hidden="true" />
            <span>SUPPORT SYSTEM</span>
            <span className="w-4 h-px bg-primary" aria-hidden="true" />
          </div>
          <h2
            id="support-heading"
            className="font-display font-bold text-2xl sm:text-3xl md:text-4xl text-on-surface leading-snug text-balance"
          >
            初めての方も、一人ひとりを丁寧にサポートします。
          </h2>
          <p className="font-sans text-sm sm:text-base text-on-surface-variant leading-relaxed">
            応募前の相談から勤務中のフォロー、働き始めてからの調整まで、お店全体で女性をサポートする5つの体制をご用意しています。
          </p>
        </div>

        {/* 5 Support Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {SUPPORT_PILLARS.map((item) => (
            <article
              key={item.number}
              className="rounded-2xl bg-surface border border-outline-variant p-6 flex flex-col gap-3 shadow-2xs"
            >
              <div className="flex items-center justify-between gap-2">
                <div className="w-10 h-10 rounded-xl bg-white border border-outline-variant text-primary flex items-center justify-center">
                  <LucideIcon name={item.icon} size={20} />
                </div>
                <span className="text-xs font-mono font-bold text-primary">
                  SUPPORT {item.number}
                </span>
              </div>
              <h3 className="font-display font-bold text-base sm:text-lg text-on-surface leading-snug">
                {item.title}
              </h3>
              <p className="text-xs sm:text-[13px] text-on-surface-variant leading-relaxed">
                {item.description}
              </p>
            </article>
          ))}

          {/* 6th Card: Direct LINE Support Entry */}
          <div className="rounded-2xl bg-surface-container/60 border border-outline-variant p-6 flex flex-col justify-between gap-4">
            <div className="space-y-2">
              <span className="text-xs font-bold text-primary block">女性の採用・相談窓口</span>
              <h3 className="font-display font-bold text-base sm:text-lg text-on-surface leading-snug">
                小さな不安でも、まずは女性担当にご相談ください
              </h3>
              <p className="text-xs sm:text-[13px] text-on-surface-variant leading-relaxed">
                「まだ応募する気持ちが決まっていない」という状態でも大丈夫です。納得してから判断できるようサポートします。
              </p>
            </div>
            <a
              href={LINE_OFFICIAL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-[#06C755] hover:bg-[#05b34c] text-white font-bold text-xs px-4 py-3 rounded-xl shadow-xs transition-colors"
            >
              <LucideIcon name="MessageCircle" size={16} />
              <span>LINEで質問・相談してみる</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
