/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import LucideIcon from './LucideIcon';
import { FAQ_100_LIST } from '../faq100Data';

interface RecruitGuideSectionProps {
  onNavigateTopic: (topicId: string) => void;
  onNavigatePath: (path: string) => void;
}

interface GuideCardItem {
  number: string;
  categoryLabel: string;
  title: string;
  description: string;
  icon: string;
  path: string;
  type: 'topic' | 'path';
  target: string;
}

const GUIDE_CARDS: GuideCardItem[] = [
  {
    number: '01',
    categoryLabel: '仕事内容',
    title: '仕事内容を詳しく見る',
    description:
      '玄関（上がり框）でのお迎え、待機室での過ごし方、仲居さんの呼び込みフォローなどを解説しています。',
    icon: 'Coffee',
    path: '/job',
    type: 'topic',
    target: 'job',
  },
  {
    number: '02',
    categoryLabel: '給料・待遇',
    title: 'お給料・報酬の仕組みを見る',
    description:
      '15分〜60分ごとのコース手取り目安や売上50%バック、即日現金日払い、控除の有無について説明しています。',
    icon: 'Coins',
    path: '/salary',
    type: 'topic',
    target: 'salary',
  },
  {
    number: '03',
    categoryLabel: '未経験',
    title: '未経験者向けガイドを見る',
    description:
      '初めてお仕事を探す方が安心して始められるよう、事前準備やよくある不安・サポート体制にお答えします。',
    icon: 'Sparkles',
    path: '/beginner',
    type: 'topic',
    target: 'beginner',
  },
  {
    number: '04',
    categoryLabel: '経験者',
    title: '経験者向けガイドを見る',
    description:
      '他店・他業種からの移籍を検討されている方向けに、営業連絡なし・お酒なしの環境の違いをまとめています。',
    icon: 'Award',
    path: '/experienced',
    type: 'topic',
    target: 'experienced',
  },
  {
    number: '05',
    categoryLabel: '募集要項',
    title: '募集要項・採用条件を見る',
    description:
      '満20歳以上の応募資格や必要な本人確認書類（住民票原本等）、勤務地、応募前の確認事項をご案内します。',
    icon: 'ClipboardList',
    path: '/requirements',
    type: 'topic',
    target: 'requirements',
  },
  {
    number: '06',
    categoryLabel: '面接・体験入店',
    title: '面接・体験入店の流れを見る',
    description:
      'LINE相談から私服見学、1日体験入店、ご納得のうえでお仕事開始までのステップを順を追って確認できます。',
    icon: 'Calendar',
    path: '/flow',
    type: 'topic',
    target: 'flow',
  },
  {
    number: '07',
    categoryLabel: '働き方',
    title: '自由な働き方について見る',
    description:
      '週1日や短時間勤務、本業・学業との両立、10:00〜24:00の選べる5つのシフトについて解説しています。',
    icon: 'Clock',
    path: '/workstyle',
    type: 'topic',
    target: 'workstyle',
  },
  {
    number: '08',
    categoryLabel: 'お店選び',
    title: '通り別の特徴と直営店を見る',
    description:
      'メイン・青春・大門・裏通りの特徴や、お店直接募集と外部紹介の違い、直営料亭の安心ポイントをご紹介します。',
    icon: 'Store',
    path: '/shops',
    type: 'topic',
    target: 'shops',
  },
  {
    number: '09',
    categoryLabel: '寮・出稼ぎ',
    title: '寮・出稼ぎ情報を見る',
    description:
      '遠方からの応募に向けた個室寮・滞在先の手配条件や、交通費サポートの事前確認方法をご案内します。',
    icon: 'Home',
    path: '/dekasegi',
    type: 'topic',
    target: 'dorm',
  },
  {
    number: '10',
    categoryLabel: 'プライバシー対策',
    title: '身バレ・安全対策を見る',
    description:
      'Web・SNSへの顔写真非掲載、エリア全体の撮影禁止ルール、完全源氏名や住民税普通徴収の対策をまとめています。',
    icon: 'ShieldCheck',
    path: '/safety',
    type: 'topic',
    target: 'safety',
  },
  {
    number: '11',
    categoryLabel: 'よくある質問',
    title: `よくある質問（全${FAQ_100_LIST.length}問）を見る`,
    description:
      '応募前の不安や疑問を12カテゴリー・全119問に体系化し、未経験・給料・年齢・シフトについてお答えしています。',
    icon: 'HelpCircle',
    path: '/faq',
    type: 'path',
    target: '/faq',
  },
  {
    number: '12',
    categoryLabel: 'お仕事コラム',
    title: 'お仕事コラム一覧を見る',
    description:
      '働く前に知っておきたい業界の基礎知識や体験談、税金・防犯ノウハウなどの詳しい解説記事を掲載しています。',
    icon: 'BookOpen',
    path: '/blog',
    type: 'path',
    target: '/blog',
  },
];

export default function RecruitGuideSection({ onNavigateTopic, onNavigatePath }: RecruitGuideSectionProps) {
  return (
    <section
      id="recruit-guide"
      className="py-16 sm:py-24 bg-surface border-t border-outline-variant/70"
      aria-labelledby="recruit-guide-heading"
    >
      <div className="max-w-[1160px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2.5">
          <div className="text-xs font-bold tracking-widest text-secondary uppercase">
            RECRUIT GUIDE
          </div>
          <h2
            id="recruit-guide-heading"
            className="font-display font-bold text-2xl sm:text-3xl text-on-surface leading-snug text-balance"
          >
            テーマ別の詳細ガイド・関連ページ
          </h2>
          <p className="text-sm text-on-surface-variant leading-relaxed">
            さらに詳しく知りたいテーマがある場合は、各専門ガイドページもあわせてご覧ください。
          </p>
        </div>

        {/* 3-Column Card Grid matching layout structure */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {GUIDE_CARDS.map((card) => (
            <a
              key={card.number}
              href={card.path}
              onClick={(e) => {
                e.preventDefault();
                if (card.type === 'topic') {
                  onNavigateTopic(card.target);
                } else {
                  onNavigatePath(card.target);
                }
              }}
              className="group bg-white rounded-2xl border border-outline-variant hover:border-primary/40 p-5 sm:p-6 shadow-2xs hover:shadow-md transition-all flex items-start gap-4 text-left"
            >
              {/* Left Pale Pink Icon Box */}
              <div className="w-11 h-11 rounded-xl bg-surface-container border border-outline-variant/60 text-primary group-hover:bg-primary group-hover:text-white transition-colors flex items-center justify-center shrink-0 mt-0.5">
                <LucideIcon name={card.icon} size={20} />
              </div>

              {/* Right Text Content */}
              <div className="flex-1 min-w-0">
                <div className="text-[11px] font-bold text-primary tracking-wide">
                  {card.number} <span className="text-outline-variant mx-0.5">|</span> {card.categoryLabel}
                </div>
                <h3 className="font-sans font-bold text-[15px] sm:text-base text-on-surface group-hover:text-primary transition-colors mt-1 leading-snug">
                  {card.title}
                </h3>
                <p className="text-xs text-on-surface-variant leading-relaxed mt-1.5 line-clamp-2">
                  {card.description}
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
