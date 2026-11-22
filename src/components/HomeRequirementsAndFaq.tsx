/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { MouseEvent } from 'react';
import LucideIcon from './LucideIcon';

interface HomeRequirementsAndFaqProps {
  onNavigateFaq: () => void;
  onNavigateTopic: (topicId: string) => void;
}

const HOME_BASIC_CONDITIONS = [
  {
    label: '職種',
    value: '飛田新地 料亭接客スタッフ（料亭直営公式採用）',
  },
  {
    label: '給与・報酬',
    value: '完全歩合制・売上50%バック・即日全額現金日払い（15分 5,000円〜 / 雑費天引き0円 ※時間帯・来店状況により変動）',
  },
  {
    label: '応募資格',
    value: '満20歳以上の女性（未経験歓迎・学歴経験不問 ※組合規約により20歳未満不可）',
  },
  {
    label: '勤務地',
    value: '大阪府大阪市西成区山王（飛田新地 / 動物園前駅・天王寺駅・新今宮駅 徒歩圏内）',
  },
  {
    label: '勤務時間',
    value: '10:00〜24:00（自由シフト制・週1日〜・短時間・WワークOK）',
  },
  {
    label: '待遇・サポート',
    value: 'WEB顔出しなし・衣装無料貸出・女性スタッフ対応（寮・交通費サポートは事前確認）',
  },
];

const HOME_TOP_FAQS = [
  {
    id: 'home-faq-1',
    q: 'Q. 未経験でも本当に大丈夫ですか？',
    a: 'はい、在籍キャストの多くが未経験からスタートしています。仲居さんや女性スタッフが優しくフォローするため、事前の専門知識は不要です。',
  },
  {
    id: 'home-faq-2',
    q: 'Q. 家族・友人・会社に身バレしませんか？',
    a: '源氏名での勤務、WEB写真非公開（街全体撮影禁止）、住民税の普通徴収手続き案内など、プライバシー保護を徹底しています。',
  },
  {
    id: 'home-faq-3',
    q: 'Q. お酒が飲めない・弱くても働けますか？',
    a: '全く問題ありません。飛田新地の料亭はお酒を飲む場ではないため、お酒が飲めない方も活躍しています。',
  },
  {
    id: 'home-faq-4',
    q: 'Q. 体験入店（1日だけ）でも大丈夫ですか？',
    a: 'はい、大歓迎です。日給はその場で全額日払いとなり、合わないと感じた場合はその日だけで終了しても問題ありません。',
  },
];

export function HomeRequirementsSummary({
  onNavigateTopic,
  onNavigatePath,
}: {
  onNavigateTopic: (topicId: string) => void;
  onNavigatePath?: (path: string) => void;
}) {
  const handleTopicClick = (e: MouseEvent<HTMLAnchorElement>, topicId: string) => {
    e.preventDefault();
    onNavigateTopic(topicId);
  };

  const handlePathClick = (e: MouseEvent<HTMLAnchorElement>, targetPath: string) => {
    if (onNavigatePath) {
      e.preventDefault();
      onNavigatePath(targetPath);
    }
  };

  return (
    <section className="py-12 md:py-16 bg-white border-t border-rose-100/60" id="home-requirements-summary">
      <div className="max-w-[960px] mx-auto px-4 sm:px-6">
        <div className="text-center mb-8">
          <span className="inline-block text-[11px] font-black tracking-widest text-secondary bg-rose-50 px-3 py-1 rounded-full border border-rose-100 mb-2 uppercase">
            RECRUITMENT SUMMARY
          </span>
          <h2 className="font-display font-extrabold text-xl sm:text-2xl md:text-3xl text-on-surface leading-snug text-balance max-w-xl mx-auto">
            飛田新地求人の基本条件・募集要項
          </h2>
          <p className="text-xs sm:text-sm text-zinc-600 mt-2">
            料亭直営窓口ならではの明朗な募集条件とサポート体制をご案内しています。
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-rose-200/80 shadow-xs overflow-hidden">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <tbody>
              {HOME_BASIC_CONDITIONS.map((row, idx) => (
                <tr key={row.label} className={idx !== HOME_BASIC_CONDITIONS.length - 1 ? 'border-b border-rose-100' : ''}>
                  <th className="w-28 sm:w-44 bg-rose-50/70 text-zinc-900 font-bold px-4 py-3.5 align-top border-r border-rose-100">
                    {row.label}
                  </th>
                  <td className="px-4 py-3.5 text-zinc-700 leading-relaxed bg-white">
                    {row.value}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
          <a
            href="/requirements"
            onClick={(e) => handleTopicClick(e, 'requirements')}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-secondary bg-rose-50 hover:bg-rose-100/80 px-4 py-2 rounded-full border border-rose-200 transition-colors"
          >
            <LucideIcon name="FileText" size={14} />
            <span>募集要項・必要書類を詳しく見る</span>
          </a>
          <a
            href="/salary"
            onClick={(e) => handleTopicClick(e, 'salary')}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-zinc-700 hover:text-secondary bg-white hover:bg-rose-50/60 px-4 py-2 rounded-full border border-zinc-200 transition-colors"
          >
            <LucideIcon name="Coins" size={14} />
            <span>給与計算・手取りシミュレーターを見る</span>
          </a>
        </div>

        {/* 料亭直営公式窓口としての運営体制・監修情報（E-E-A-T一次情報） */}
        <div className="mt-8 bg-rose-50/50 rounded-2xl border border-rose-100 p-5 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
            <h3 className="font-bold text-sm sm:text-base text-zinc-900 flex items-center gap-2">
              <LucideIcon name="ShieldCheck" size={18} className="text-secondary shrink-0" />
              <span>料亭直営公式窓口・情報監修について</span>
            </h3>
            <span className="text-[11px] font-semibold text-zinc-500">
              所在地：大阪府大阪市西成区山王（飛田新地料理組合加盟料亭）
            </span>
          </div>
          <p className="text-xs sm:text-sm text-zinc-700 leading-relaxed mb-4">
            当サイト「飛田ガールズ」は、外部スカウトや仲介業者を介さない料亭直営の公式採用窓口です。紹介料・手数料は一切かからず、現場に常駐する女性サポートスタッフ（さくら）・採用管理担当（木村）が、事前見学から体験入店・安全管理まで事実ベースでご案内しています。
          </p>
          <div className="flex flex-wrap gap-2 text-xs">
            <a
              href="/about"
              onClick={(e) => handlePathClick(e, '/about')}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white border border-rose-200/80 text-zinc-700 hover:text-secondary font-semibold transition-colors"
            >
              <span>運営者情報・直営体制を見る</span>
            </a>
            <a
              href="/site-compare"
              onClick={(e) => handlePathClick(e, '/site-compare')}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white border border-rose-200/80 text-zinc-700 hover:text-secondary font-semibold transition-colors"
            >
              <span>他業種・応募ルート徹底比較</span>
            </a>
            <a
              href="/compare"
              onClick={(e) => handlePathClick(e, '/compare')}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white border border-rose-200/80 text-zinc-700 hover:text-secondary font-semibold transition-colors"
            >
              <span>働き方・条件別ガイドを見る</span>
            </a>
            <a
              href="/glossary"
              onClick={(e) => handlePathClick(e, '/glossary')}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white border border-rose-200/80 text-zinc-700 hover:text-secondary font-semibold transition-colors"
            >
              <span>用語集・業界知識辞典</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export function HomeFaqPreview({ onNavigateFaq }: Pick<HomeRequirementsAndFaqProps, 'onNavigateFaq'>) {
  return (
    <section className="py-14 md:py-20 bg-gradient-to-b from-white to-rose-50/30 border-t border-rose-100/60" id="section-faq">
      <div className="max-w-[920px] mx-auto px-4 sm:px-6">
        <div className="text-center mb-8 md:mb-10">
          <span className="inline-block text-[11px] font-black tracking-widest text-secondary bg-rose-50 px-3 py-1 rounded-full border border-rose-100 mb-2 uppercase">
            PICK UP FAQ
          </span>
          <h2 className="font-display font-extrabold text-xl sm:text-2xl md:text-3xl text-on-surface leading-snug text-balance max-w-2xl mx-auto">
            応募する前に、気になることを解消しませんか？（よくある質問）
          </h2>
        </div>

        <dl className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {HOME_TOP_FAQS.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl border border-rose-100 shadow-2xs p-5 flex flex-col gap-2.5"
            >
              <dt className="font-bold text-sm sm:text-base text-zinc-900 leading-snug">
                {item.q}
              </dt>
              <dd className="text-xs sm:text-sm text-zinc-700 leading-relaxed border-t border-rose-50 pt-2.5">
                A. {item.a}
              </dd>
            </div>
          ))}
        </dl>

        <div className="text-center">
          <a
            href="/faq"
            onClick={(e) => {
              e.preventDefault();
              onNavigateFaq();
            }}
            className="inline-flex items-center gap-2 bg-white hover:bg-rose-50 text-secondary font-extrabold text-xs sm:text-sm px-6 py-3 rounded-full border border-rose-200 shadow-xs hover:shadow-md transition-all"
          >
            <LucideIcon name="HelpCircle" size={16} />
            <span>よくある質問（FAQ全119問）を見る</span>
            <LucideIcon name="ChevronRight" size={15} />
          </a>
        </div>
      </div>
    </section>
  );
}
