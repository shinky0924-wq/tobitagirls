/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import LucideIcon from './LucideIcon';

interface WorkstyleGuideSectionProps {
  onNavigateTopic?: (topicId: string) => void;
  onNavigatePath: (path: string) => void;
}

interface WorkstyleType {
  number: string;
  title: string;
  subtitle: string;
  description: string;
  path: string;
  icon: string;
}

const EIGHT_WORKSTYLE_TYPES: WorkstyleType[] = [
  {
    number: '01',
    title: '未経験から始めたい',
    subtitle: '初めてでも安心の事前レクチャー',
    description:
      '接客の基本から玄関でのお迎え、仲居さんのフォロー体制まで、未経験者がつまずきやすいポイントを事前に丁寧にご説明します。',
    path: '/compare/beginner',
    icon: 'Sparkles',
  },
  {
    number: '02',
    title: '他店・他業種から移りたい（経験者）',
    subtitle: 'お酒なし・営業連絡なしの環境',
    description:
      '同伴・アフター・お客様への営業連絡がない働き方や、紹介業者を通さない直営店の報酬計算の違いを比較してご確認いただけます。',
    path: '/compare/experienced',
    icon: 'Award',
  },
  {
    number: '03',
    title: '目標額や貯金をしっかり目指したい',
    subtitle: '売上50％バック・全額現金日払い',
    description:
      '目標の時期や金額に合わせて出勤日数・シフト帯を組み立てたい方向けに、無理のないスケジュール例をご紹介しています。',
    path: '/compare/high-income',
    icon: 'Coins',
  },
  {
    number: '04',
    title: '週1日・土日のみで働きたい',
    subtitle: '学業やご家庭を優先できる自由出勤',
    description:
      '週末だけ・月数日だけといったペースでも、出勤強制やノルマはありません。予定に合わせて柔軟に調整できます。',
    path: '/compare/one-day-week',
    icon: 'Calendar',
  },
  {
    number: '05',
    title: '短時間・Wワークで働きたい',
    subtitle: '本業や他のお仕事と無理なく両立',
    description:
      '10:00〜24:00の営業時間内で、本業の前後や休日を活用した短時間勤務・Wワーク向けの働き方をまとめています。',
    path: '/compare/short-time',
    icon: 'Briefcase',
  },
  {
    number: '06',
    title: '昼間の時間帯を中心に働きたい',
    subtitle: '10:00〜16:00／17:00の昼シフト',
    description:
      '終電前や夕方には帰りたい方、生活リズムを崩さずに昼間の時間帯で働きたい方に向けたシフト案内です。',
    path: '/compare/daytime',
    icon: 'Sun',
  },
  {
    number: '07',
    title: '身バレ・プライバシーを最優先したい',
    subtitle: 'WEB写真非掲載・撮影禁止・源氏名',
    description:
      'お顔を出さない働き方、知人への配慮、副業向けの住民税「普通徴収」など、プライバシーを守る具体的な仕組みを解説します。',
    path: '/compare/privacy',
    icon: 'ShieldCheck',
  },
  {
    number: '08',
    title: '寮・遠方からの勤務を相談したい',
    subtitle: '個室寮の事前確認・長期休暇の短期滞在',
    description:
      '大阪以外からお越しの方の短期・長期滞在プランや、寮の空き状況・条件、交通費の事前確認方法をご案内しています。',
    path: '/dekasegi',
    icon: 'Home',
  },
];

export default function WorkstyleGuideSection({ onNavigatePath }: WorkstyleGuideSectionProps) {
  return (
    <section
      id="workstyle"
      className="py-16 md:py-24 bg-surface border-b border-outline-variant/60"
      aria-labelledby="workstyle-heading"
    >
      <div className="max-w-[1160px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest text-primary uppercase">
            <span className="w-4 h-px bg-primary" aria-hidden="true" />
            <span>WORKSTYLE GUIDE</span>
            <span className="w-4 h-px bg-primary" aria-hidden="true" />
          </div>
          <h2
            id="workstyle-heading"
            className="font-display font-bold text-2xl sm:text-3xl md:text-4xl text-on-surface leading-snug text-balance"
          >
            あなたに合った働き方を見つけませんか？
          </h2>
          <p className="font-sans text-sm sm:text-base text-on-surface-variant leading-relaxed">
            経験の有無、働ける時間帯、目標やライフスタイルによって最適な働き方は異なります。ご自身の状況に近いタイプから詳細をご確認ください。
          </p>
        </div>

        {/* 8 Numbered Type Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {EIGHT_WORKSTYLE_TYPES.map((item) => (
            <a
              key={item.number}
              href={item.path}
              onClick={(e) => {
                e.preventDefault();
                onNavigatePath(item.path);
              }}
              className="group bg-white hover:bg-surface-container/30 rounded-2xl border border-outline-variant hover:border-primary/50 p-5 flex flex-col justify-between gap-4 shadow-2xs hover:shadow-sm transition-all cursor-pointer"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-mono font-bold text-primary">
                    TYPE {item.number}
                  </span>
                  <div className="w-8 h-8 rounded-lg bg-surface-container/70 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
                    <LucideIcon name={item.icon} size={16} />
                  </div>
                </div>

                <div>
                  <h3 className="font-display font-bold text-[15px] text-on-surface group-hover:text-primary transition-colors leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-[11.5px] font-bold text-secondary mt-1">{item.subtitle}</p>
                </div>

                <p className="text-xs text-on-surface-variant leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="pt-2.5 border-t border-outline-variant/60 flex items-center justify-between text-xs font-bold text-secondary group-hover:text-primary">
                <span>詳細を見る</span>
                <LucideIcon name="ArrowRight" size={14} className="group-hover:translate-x-0.5 transition-transform" />
              </div>
            </a>
          ))}
        </div>

        {/* All Workstyles & Site Compare CTA */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <a
            href="/compare"
            onClick={(e) => {
              e.preventDefault();
              onNavigatePath('/compare');
            }}
            className="inline-flex items-center gap-2 bg-primary hover:bg-secondary text-white font-bold text-xs sm:text-sm px-6 py-3.5 rounded-xl shadow-xs transition-colors"
          >
            <span>27タイプの働き方比較ガイドを見る</span>
            <LucideIcon name="ArrowRight" size={15} />
          </a>
          <a
            href="/site-compare"
            onClick={(e) => {
              e.preventDefault();
              onNavigatePath('/site-compare');
            }}
            className="inline-flex items-center gap-2 bg-white hover:bg-surface-container text-on-surface border border-outline-variant font-bold text-xs sm:text-sm px-6 py-3.5 rounded-xl shadow-2xs transition-colors"
          >
            <span>他業種・他職種との違いを比較する</span>
            <LucideIcon name="ChevronRight" size={15} />
          </a>
        </div>
      </div>
    </section>
  );
}
