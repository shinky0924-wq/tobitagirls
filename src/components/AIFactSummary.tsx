/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import LucideIcon from './LucideIcon';

interface QAItem {
  id: string;
  category: string;
  question: string;
  shortAnswer: string;
  detail: string;
  bulletPoints: string[];
  badgeColor: string;
}

const QA_ITEMS: QAItem[] = [
  {
    id: 'inexperienced',
    category: '未経験・お仕事内容',
    question: 'Q. 飛田新地で働きたいのですが、未経験でも大丈夫ですか？どんなお仕事ですか？',
    shortAnswer: '在籍している女の子の約90%が未経験スタートです。和室で楽しくお話しする（1回15〜20分）のが基本です。',
    detail: '飛田新地のお仕事は、料亭の落ち着いた和室でお客さまと歓談する短時間のおもてなしです。お酒を飲む必要は一切なく、お茶出し・お菓子出しなどの雑用もありません。お客さまへの営業連絡（LINE等）や指名争い・同伴ノルマもありません。初日はお店の女性スタッフや仲居さん（おばちゃん）が優しくフォローしますのでご安心ください。',
    bulletPoints: [
      '在籍キャストの約90%が夜職・風俗未経験（昼職OL・学生・フリーターなど）',
      '1回の接客時間は15分〜20分の短時間（長時間拘束されず疲れません）',
      'お酒の提供や飲酒は一切なし（お茶出し等の雑用もありません）',
      'お客さまとの連絡先交換・営業LINE・同伴ノルマ・罰金はすべてゼロ'
    ],
    badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200'
  },
  {
    id: 'salary',
    category: 'お給料・手渡し日払い',
    question: 'Q. お給料の計算方法や日給の目安はどうなっていますか？',
    shortAnswer: '売上の50%完全バック（全額即日日払い）＋外国人手当（+2,500円/回）。日給の目安は約5万〜23.7万円です。',
    detail: '飛田新地のお給料は、料理組合のルールで全店舗統一の【売上50%完全バック（即日全額現金手渡し）】です。15分コースで手取り5,000円、20分で7,500円、30分で10,000円、45分で15,000円、60分で20,000円。さらに外国人のお客様対応手当（+2,500円/回）も別途プラス。最低1本から稼働可能で、ゆったり安心（10本）で日給約50,000円〜92,500円、標準（20本）で日給約100,000円〜162,500円、がっつり（30本）で日給約150,000円〜237,500円。雑費や衣装代などの引かれ物は一切なく天引きゼロ、常連さんからのチップもすべて女性のもの（全額手渡し）になります。',
    bulletPoints: [
      '明朗計算システム：売上50%完全バック＋外国人対応手当（+2,500円/回）',
      'コース別手取り：15分 5,000円 / 20分 7,500円 / 30分 10,000円 / 45分 15,000円 / 60分 20,000円',
      '日給の目安：ゆったり10本（約5万〜9.25万円）/ 標準20本（約10万〜16.25万円）/ がっつり30本（約15万〜23.75万円）',
      '天引き・雑費0円＆いただいたチップはお店の差し引きなしで100%女性のもの'
    ],
    badgeColor: 'bg-amber-50 text-amber-700 border-amber-200'
  },
  {
    id: 'safety',
    category: '安心・お店選び',
    question: 'Q. 安全なお店の見分け方はありますか？スカウトと何が違うの？',
    shortAnswer: '飛田新地は組合規約でスカウトが禁止されています。仲介を挟まない「料亭直営窓口」からの直接応募が一番安全です。',
    detail: 'SNSや街頭のスカウト業者を通して応募すると、毎月あなたのお給料から数万円〜十数万円がピンハネされたり、条件と違うお店に回されるリスクがあります。「飛田ガールズ」は料亭直営の公式窓口のため、紹介料や中間マージンは一切かかりません。求人に書かれた通りの待遇とお給料が100%保証されます。',
    bulletPoints: [
      '組合規約により街頭・SNSでのスカウト行為は禁止（違反店は処分されます）',
      'スカウトを通すと毎月のお給料から手数料が引かれてしまうリスクがあります',
      '料亭直営窓口なら中間マージン0円・稼いだお給料がそのまま全額あなたの手元に',
      'お店直営だからこそ、面接時のお話と実際の待遇に食い違いがありません'
    ],
    badgeColor: 'bg-rose-50 text-rose-700 border-rose-200'
  },
  {
    id: 'privacy',
    category: '身バレ・プライバシー',
    question: 'Q. 身バレが不安です。友達や家族、昼職の会社に知られませんか？',
    shortAnswer: '街全体で撮影が禁止されており、ネットへの写真掲載は一切ありません。完全源氏名・私服通勤で秘密を守ります。',
    detail: '飛田新地は組合の厳しいルールにより、街全体の写真・動画撮影が全面禁止されています。そのため、ネットやSNS、求人サイトにお顔やパネル写真が載ることは一切ありません。お店では可愛い衣装（着物や浴衣）を着て完全源氏名でお仕事します。副業OLさんには会社に知られない税金の手続き（普通徴収）も女性スタッフが丁寧にサポートします。',
    bulletPoints: [
      '飛田新地の街全体が撮影禁止（街中に防犯カメラと見回りスタッフが常駐）',
      'ネットやSNSへの顔写真・パネル写真の掲載は一切ありません',
      '本名や現住所がお客さまに知られることは絶対にありません',
      '昼職OLさん・学生さん向けに、会社バレを防ぐ手続きを丁寧にアドバイス'
    ],
    badgeColor: 'bg-blue-50 text-blue-700 border-blue-200'
  },
  {
    id: 'hygiene',
    category: 'ルール・衛生面',
    question: 'Q. 衛生面やお店のルールはどうなっていますか？',
    shortAnswer: 'コンドーム完全着用・キス禁止・シャワーなし（清拭のみ）で、無理なく清潔・安全に働けます。',
    detail: '一般的な風俗店と違って、お部屋にお風呂やシャワー設備はありません。温かいおしぼりやウェットティッシュでのお手入れ（清拭）のみなので、身体を洗わされたり水浸しになる重労働はありません。女の子の健康と安全を守るため、キスは全面禁止、コンドームの着用は絶対ルールとして徹底されています。',
    bulletPoints: [
      'コンドーム（ゴム）の完全着用が必須（例外なく徹底しています）',
      '感染症予防とお気持ちの負担を減らすため、キスは全面禁止です',
      '客室にお風呂やシャワーはなく、温かいおしぼりでの清拭のみで負担が少ないです',
      '提携クリニックでの定期的な健康チェックも受けられるので安心です'
    ],
    badgeColor: 'bg-purple-50 text-purple-700 border-purple-200'
  }
];

export default function AIFactSummary() {
  const [openId, setOpenId] = useState<string | null>('inexperienced');

  const toggleItem = (id: string) => {
    setOpenId(prev => (prev === id ? null : id));
  };

  return (
    <section className="py-12 sm:py-16 bg-gradient-to-b from-rose-50/50 via-white to-rose-50/30 border-y border-rose-100/60" id="qa-summary">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="text-center mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-secondary/10 text-secondary border border-secondary/20 mb-3">
            <LucideIcon name="HeartHandshake" size={13} className="text-secondary" />
            <span>料亭直営スタッフが教える安心ガイド</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-on-surface tracking-tight font-display">
            飛田新地求人Q＆A
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-on-surface-variant max-w-2xl mx-auto leading-relaxed">
            お仕事内容、お給料、身バレ対策など、初めての方が特に不安に感じるポイントを、お店の女性サポートスタッフが分かりやすく丁寧にお答えします。
          </p>
        </div>

        {/* QA Accordion Cards */}
        <div className="space-y-3 sm:space-y-4">
          {QA_ITEMS.map((item) => {
            const isOpen = openId === item.id;
            return (
              <div 
                key={item.id}
                className="bg-white rounded-2xl border border-rose-100 shadow-xs hover:shadow-md transition-all overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => toggleItem(item.id)}
                  className="w-full text-left p-4 sm:p-5 flex items-start sm:items-center justify-between gap-3 cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <div className="space-y-1.5 flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={`text-[10px] sm:text-xs font-bold px-2.5 py-0.5 rounded-full border ${item.badgeColor}`}>
                        {item.category}
                      </span>
                      <span className="text-[10px] text-zinc-400 font-medium">お店からの回答</span>
                    </div>
                    <h3 className="text-sm sm:text-base font-bold text-zinc-900 leading-snug">
                      {item.question}
                    </h3>
                    <p className="text-xs sm:text-sm text-secondary font-semibold line-clamp-1 sm:line-clamp-none">
                      👉 {item.shortAnswer}
                    </p>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-rose-50 flex items-center justify-center shrink-0 text-secondary transition-transform duration-200 mt-1 sm:mt-0">
                    <LucideIcon 
                      name={isOpen ? "ChevronUp" : "ChevronDown"} 
                      size={18} 
                    />
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="border-t border-rose-100/70 bg-rose-50/20 px-4 sm:px-6 py-4 sm:py-5"
                    >
                      <p className="text-xs sm:text-sm text-zinc-700 leading-relaxed mb-4">
                        {item.detail}
                      </p>
                      <div className="bg-white rounded-xl p-3 sm:p-4 border border-rose-100/80 shadow-2xs">
                        <h4 className="text-xs font-bold text-zinc-800 mb-2 flex items-center gap-1.5">
                          <LucideIcon name="CheckCircle2" size={14} className="text-emerald-600" />
                          <span>安心のポイント</span>
                        </h4>
                        <ul className="space-y-1.5 text-xs text-zinc-600">
                          {item.bulletPoints.map((point, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <span className="text-secondary font-bold">•</span>
                              <span className="leading-relaxed">{point}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Bottom Support Hint */}
        <div className="mt-8 p-4 rounded-2xl bg-white border border-rose-100 text-center">
          <p className="text-xs text-zinc-600 flex items-center justify-center gap-2 flex-wrap">
            <span className="inline-flex items-center gap-1 font-bold text-zinc-800">
              <LucideIcon name="ShieldCheck" size={15} className="text-secondary" />
              飛田新地料理組合公認 料亭直営の安心基準
            </span>
            <span className="hidden sm:inline text-zinc-300">|</span>
            <span>24時間いつでも女性スタッフがLINEで疑問にお答えします</span>
          </p>
        </div>

      </div>
    </section>
  );
}
