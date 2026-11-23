/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { FAQ_100_LIST } from '../faq100Data';
import LucideIcon from './LucideIcon';

interface HomeFaqSectionProps {
  onNavigateFaq: () => void;
}

interface HomeFaqItem {
  id: string;
  question: string;
  answer: string;
}

interface HomeFaqCategory {
  id: string;
  label: string;
  items: HomeFaqItem[];
}

const HOME_FAQ_CATEGORIES: HomeFaqCategory[] = [
  {
    id: 'beginner',
    label: '未経験・応募について',
    items: [
      {
        id: 'hf-1',
        question: '未経験でも応募できますか？',
        answer:
          'はい、未経験からご応募いただけます。在籍している女性の多くが夜職未経験からのスタートです。接客の流れや衛生ルール、身だしなみまで女性スタッフが事前に丁寧にお伝えしますのでご安心ください。',
      },
      {
        id: 'hf-2',
        question: '何歳から応募できますか？',
        answer:
          '応募資格は満20歳以上の女性です。法令および飛田新地料理組合の規約により、20歳未満および高校生の方はご応募・勤務ともにできません。',
      },
      {
        id: 'hf-3',
        question: '見学や話だけ聞くことはできますか？',
        answer:
          'はい、可能です。働くかどうか決める前に私服でお店の雰囲気や待機室を見学し、詳しい条件説明だけを聞いてご判断いただけます。納得できない場合はお断りいただいて問題ありません。',
      },
      {
        id: 'hf-4',
        question: '面接ではどのようなことを聞かれますか？',
        answer:
          '希望の出勤ペース（週何日・昼か夜か）、不安に思っていること、体調やご予定上の配慮事項などを和やかにお伺いします。厳しい審査のような圧迫面接はありません。',
      },
      {
        id: 'hf-5',
        question: '必要な持ち物・書類はありますか？',
        answer:
          '面接・見学のみの場合は履歴書不要・私服でお越しいただけます。体験入店や勤務を開始する場合は、法令に基づく年齢・本人確認のため「本籍地記載の住民票原本（発行3ヶ月以内・マイナンバー記載なし）」または「有効期限内の日本国パスポート」＋顔写真付き公的身分証明書が必要となります。',
      },
    ],
  },
  {
    id: 'salary',
    label: '給料・報酬について',
    items: [
      {
        id: 'hf-6',
        question: '給与の仕組みはどのようになっていますか？',
        answer:
          '完全歩合制（売上50％バック）です。基本計算式は「（お客様お支払い料金 － 仲居料1,000円）÷ 2 ＝ 女性の手取り」となり、料亭直営の直接採用のため紹介業者による中抜きはありません（※一部コースや時間帯により基準が異なる場合は面接時に明細をご案内します）。',
      },
      {
        id: 'hf-7',
        question: '報酬はいつもらえますか？',
        answer:
          'その日に働いた分は、退勤時に毎回全額を現金でお渡しします。日払いの上限設定や翌月への繰り越しはありません。',
      },
      {
        id: 'hf-8',
        question: '天引きや罰金・ノルマなどはありますか？',
        answer:
          'ロッカー代・更衣室代・宣伝費といった雑費の天引きや、出勤日数・売上のノルマ、罰金は一切ありません。',
      },
      {
        id: 'hf-9',
        question: '衣装代などの費用はかかりますか？',
        answer:
          'いいえ、お仕事で使う着物・浴衣・ワンピース・コスチューム等は店舗側で無料貸出・保管していますので、衣装購入費やクリーニング費の自己負担はありません。',
      },
      {
        id: 'hf-10',
        question: '体験入店のお給料も当日もらえますか？',
        answer:
          'はい、1日体験入店のみで終了される場合でも、その日の勤務終了後に手取り額の全額を現金でお支払いします。',
      },
    ],
  },
  {
    id: 'job',
    label: '仕事内容・勤務について',
    items: [
      {
        id: 'hf-11',
        question: '仕事内容を教えてください。',
        answer:
          '無料貸出衣装にお仕度したあと、玄関（上がり框）で仲居さんと一緒にお客様をお迎えし、ご来店されたお客様を2階の和室へご案内して15分〜20分中心のおもてなし接客を行うお仕事です。お見送りごとの清掃や衛生管理も行います。',
      },
      {
        id: 'hf-12',
        question: 'お酒を飲む必要はありますか？',
        answer:
          'いいえ、お酒の提供や飲酒は一切ありません。お客様との連絡先交換や営業LINE、お茶出し・洗い物などの雑用もありませんので、お酒が飲めない方もそのまま働けます。',
      },
      {
        id: 'hf-13',
        question: '週1日や短時間でも働けますか？',
        answer:
          'はい、週1日から・短時間・土日祝のみ・Wワークなどライフスタイルに合わせて柔軟にご調整いただけます。',
      },
      {
        id: 'hf-14',
        question: '昼間だけの勤務はできますか？',
        answer:
          'はい、営業時間は10:00〜24:00のため、10:00〜16:00や10:00〜17:00など、夕方には帰れる昼シフトでの勤務もご相談いただけます。',
      },
      {
        id: 'hf-15',
        question: '仲居さんはどのようなサポートをしてくれますか？',
        answer:
          '玄関でお客様への呼び込み・お声がけ、2階へご案内後のタイマー時間管理、合図やフォロー、困ったときの相談まで隣で支えてくれます。女性が一人で無理をしないよう見守る頼もしい存在です。',
      },
    ],
  },
  {
    id: 'privacy',
    label: '身バレ・プライバシーについて',
    items: [
      {
        id: 'hf-16',
        question: '顔出しやネットへの写真掲載はありますか？',
        answer:
          'いいえ、WebサイトやSNSにお仕事中の顔写真やプロフィール写真を掲載することは一切ありません。また、飛田新地エリア全体で写真・動画の撮影が禁止されています。',
      },
      {
        id: 'hf-17',
        question: '知り合いにバレないような配慮はありますか？',
        answer:
          '完全源氏名での勤務、私服での通勤、自宅への郵便物なし、万が一見知った方が来た場合の即時フォローなど、日常生活と切り離せるよう配慮しています。',
      },
      {
        id: 'hf-18',
        question: '個人情報はどのように扱われますか？',
        answer:
          '年齢確認書類やLINEでのご相談内容は採用・労務管理のみに厳重に用い、第三者への提供や営業利用は行いません。応募前のLINE相談段階では本名や写真の送信も不要です。',
      },
      {
        id: 'hf-19',
        question: '本業や学校と両立する際の注意点はありますか？',
        answer:
          '会社にお勤めで副業の知られにくさを優先したい場合は、確定申告時に住民税の納付方法を「普通徴収（自分で納付）」に選択する方法など、基本的な注意点もご相談いただけます。',
      },
    ],
  },
  {
    id: 'dorm',
    label: '寮・遠方からの応募について',
    items: [
      {
        id: 'hf-20',
        question: '遠方からでも応募できますか？',
        answer:
          'はい、関西圏外からの短期滞在や移住を伴う勤務のご相談も受け付けています。まずはLINEにてご希望の時期や期間をお知らせください。',
      },
      {
        id: 'hf-21',
        question: '寮や滞在先についての相談はできますか？',
        answer:
          'はい、プライバシーに配慮した個室タイプの寮・滞在先についてご案内可能です。空き状況や利用料・間取りなどの条件は時期によって異なるため、事前確認のうえ正確にお伝えします。',
      },
      {
        id: 'hf-22',
        question: '交通費や条件は応募前に確認できますか？',
        answer:
          'はい、遠方からの交通費サポート条件や支給上限は、出発地や予定日数によって基準が異なります。来阪される前にLINEで条件をご確認いただけますのでご安心ください。',
      },
    ],
  },
];

export default function HomeFaqSection({ onNavigateFaq }: HomeFaqSectionProps) {
  const [activeTab, setActiveTab] = useState<string>('beginner');
  const [openId, setOpenId] = useState<string>('hf-1');

  const currentCategory =
    HOME_FAQ_CATEGORIES.find((cat) => cat.id === activeTab) || HOME_FAQ_CATEGORIES[0];

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    const nextCat = HOME_FAQ_CATEGORIES.find((c) => c.id === tabId);
    if (nextCat && nextCat.items.length > 0) {
      setOpenId(nextCat.items[0].id);
    }
  };

  return (
    <section
      id="faq-preview"
      className="py-16 md:py-24 bg-surface border-b border-outline-variant/60"
      aria-labelledby="faq-preview-heading"
    >
      <div className="max-w-[980px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest text-primary uppercase">
            <span className="w-4 h-px bg-primary" aria-hidden="true" />
            <span>FAQ</span>
            <span className="w-4 h-px bg-primary" aria-hidden="true" />
          </div>
          <h2
            id="faq-preview-heading"
            className="font-display font-bold text-2xl sm:text-3xl md:text-4xl text-on-surface leading-snug text-balance"
          >
            よくある質問
          </h2>
          <p className="text-sm sm:text-base text-on-surface-variant leading-relaxed">
            応募前によくいただく22の疑問を5つのジャンルに分けてまとめました。気になるテーマを選んでご確認ください。
          </p>
        </div>

        {/* 5 Category Tabs */}
        <div
          className="flex items-center justify-start lg:justify-center gap-2 overflow-x-auto pb-2 mb-6 no-scrollbar"
          role="tablist"
          aria-label="よくある質問カテゴリー"
        >
          {HOME_FAQ_CATEGORIES.map((cat) => {
            const isActive = cat.id === activeTab;
            return (
              <button
                key={cat.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => handleTabChange(cat.id)}
                className={`shrink-0 px-3.5 py-2.5 rounded-xl text-xs sm:text-[13px] font-bold transition-colors cursor-pointer ${
                  isActive
                    ? 'bg-primary text-white shadow-xs'
                    : 'bg-white text-on-surface-variant hover:text-primary border border-outline-variant'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Accordion List */}
        <div className="space-y-3">
          {currentCategory.items.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className="bg-white rounded-2xl border border-outline-variant overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => setOpenId(isOpen ? '' : faq.id)}
                  aria-expanded={isOpen}
                  className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 cursor-pointer hover:bg-surface-container/40 transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-lg bg-primary text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                      Q
                    </span>
                    <span className="font-bold text-sm sm:text-base text-on-surface leading-snug">
                      {faq.question}
                    </span>
                  </div>
                  <LucideIcon
                    name={isOpen ? 'ChevronUp' : 'ChevronDown'}
                    size={18}
                    className="text-primary shrink-0"
                  />
                </button>

                {isOpen && (
                  <div className="px-5 py-4 bg-surface/60 border-t border-outline-variant/80 flex items-start gap-3">
                    <span className="w-6 h-6 rounded-lg bg-secondary-container text-on-secondary-container text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                      A
                    </span>
                    <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed whitespace-pre-line flex-1">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Full FAQ Page CTA */}
        <div className="mt-8 bg-white rounded-2xl border border-outline-variant p-5 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-left">
            <p className="text-xs sm:text-sm font-bold text-on-surface">
              さらに詳しい質問も一覧で確認できます
            </p>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              体験入店の手順・税金の扱い・通りや環境の違いなど、全{FAQ_100_LIST.length}問のQ&amp;Aページをご用意しています。
            </p>
          </div>
          <a
            href="/faq"
            onClick={(e) => {
              e.preventDefault();
              onNavigateFaq();
            }}
            className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-secondary text-white font-bold text-xs sm:text-sm px-6 py-3.5 rounded-xl shadow-xs transition-colors cursor-pointer shrink-0 w-full sm:w-auto"
          >
            <LucideIcon name="HelpCircle" size={17} />
            <span>よくある質問（全{FAQ_100_LIST.length}問）を見る</span>
            <LucideIcon name="ArrowRight" size={15} />
          </a>
        </div>
      </div>
    </section>
  );
}
