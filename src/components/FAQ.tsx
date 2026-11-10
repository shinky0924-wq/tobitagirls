/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import * as LucideIcons from 'lucide-react';
import {
  SEARCH_INTENT_CATEGORIES,
  HIGH_INTENT_FAQS,
  SearchIntentCategoryKey,
  HighIntentFAQItem,
  FAQ_8_CATEGORIES,
  FAQ_100_LIST
} from '../faq100Data';
import { CONSULTANT_AVATAR_URL } from '../data';

function LucideIcon({ name, size = 16, className = '' }: { name: string; size?: number; className?: string }) {
  const IconComponent = (LucideIcons as any)[name] || LucideIcons.HelpCircle;
  return <IconComponent size={size} className={className} />;
}

interface FAQProps {
  content?: any;
  onCtaclick?: () => void;
  onNavigateToFaq?: (category?: string) => void;
}

// 5大重要Q&Aデータ（AIFactSummaryから統合）
interface CoreQAItem {
  id: string;
  category: string;
  question: string;
  shortAnswer: string;
  detail: string;
  bulletPoints: string[];
  badgeColor: string;
}

const CORE_5_QA: CoreQAItem[] = [
  {
    id: 'core-inexperienced',
    category: '未経験・お仕事内容',
    question: 'Q. 飛田新地で働きたいのですが、未経験でも大丈夫ですか？どんなお仕事ですか？',
    shortAnswer: '在籍している女の子の約90%が未経験スタートです。和室でお茶を飲みながら楽しくお話しする（1回15〜20分）のが基本です。',
    detail: '飛田新地のお仕事は、料亭の落ち着いた和室でお客さまとお茶を飲みながら歓談する短時間のおもてなしです。お酒を飲む必要は一切なく、お客さまへの営業連絡（LINE等）や指名争い・同伴ノルマもありません。初日はお店の女性スタッフや仲居さん（おばちゃん）が隣について優しくフォローしますのでご安心ください。',
    bulletPoints: [
      '在籍キャストの約90%が夜職・風俗未経験（昼職OL・学生・フリーターなど）',
      '1回の接客時間は15分〜20分の短時間（長時間拘束されず疲れません）',
      'お酒の提供や飲酒は一切なし（緑茶やウーロン茶などのソフトドリンクのみ）',
      'お客さまとの連絡先交換・営業LINE・同伴ノルマ・罰金はすべてゼロ'
    ],
    badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200'
  },
  {
    id: 'core-salary',
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
    id: 'core-safety',
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
    id: 'core-privacy',
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
    id: 'core-hygiene',
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

export default function FAQ({ content, onCtaclick, onNavigateToFaq }: FAQProps) {
  // Selected category tab: 'all' or one of the 4 search-intent keys
  const [selectedTab, setSelectedTab] = useState<SearchIntentCategoryKey | 'all'>('beginner');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Track expanded questions for high-intent list
  const [openIds, setOpenIds] = useState<Set<string>>(new Set(['hi-beg-1', 'hi-sal-1']));

  // Track expanded question for core 5 questions
  const [openCoreId, setOpenCoreId] = useState<string | null>('core-inexperienced');

  const toggleCoreItem = (id: string) => {
    setOpenCoreId(prev => (prev === id ? null : id));
  };

  const toggleItem = (id: string) => {
    setOpenIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const expandAll = (itemsToExpand: HighIntentFAQItem[]) => {
    setOpenIds(new Set(itemsToExpand.map(item => item.id)));
  };

  const collapseAll = () => {
    setOpenIds(new Set());
  };

  const handleNavigateFaq = (category?: string) => {
    if (onNavigateToFaq) {
      onNavigateToFaq(category);
    }
  };

  // Filtered items based on tab and search query
  const filteredItems = useMemo(() => {
    return HIGH_INTENT_FAQS.filter((item) => {
      // Tab filter
      if (selectedTab !== 'all' && item.searchIntentCategory !== selectedTab) {
        return false;
      }
      // Search query filter
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase().trim();
      return (
        item.question.toLowerCase().includes(q) ||
        item.answer.toLowerCase().includes(q) ||
        item.keyTakeaways.some(t => t.toLowerCase().includes(q))
      );
    });
  }, [selectedTab, searchQuery]);

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-white via-rose-50/20 to-white" id="faq">
      <div className="max-w-[1040px] mx-auto px-4 sm:px-6">
        
        {/* ==========================================
            統合セクションヘッダー: 飛田新地求人 Q＆A
           ========================================== */}
        <div className="text-center max-w-3xl mx-auto mb-10 md:mb-12">
          <div className="inline-flex items-center gap-2 bg-secondary/10 text-secondary text-xs md:text-sm font-extrabold px-4 py-1.5 rounded-full mb-3 shadow-2xs border border-secondary/20">
            <LucideIcon name="HeartHandshake" size={14} className="text-secondary" />
            <span>料亭直営スタッフが教える安心ガイド</span>
          </div>

          <h2 className="font-display font-black text-2xl sm:text-3xl md:text-4xl text-on-surface leading-tight mb-4">
            飛田新地求人 Q＆A
          </h2>

          <p className="font-sans text-xs sm:text-sm md:text-base text-zinc-600 leading-relaxed max-w-2xl mx-auto">
            お仕事内容、お給料、身バレ対策など、初めての方が特に不安に感じるポイントを、お店の女性サポートスタッフが分かりやすく丁寧にお答えします。
          </p>
        </div>

        {/* ==========================================
            PART 1: 初めての方向け 5大疑問ダイレクト安心Q&A
           ========================================== */}
        <div className="mb-14">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-2 h-5 bg-secondary rounded-full" />
            <h3 className="text-base sm:text-lg font-bold text-zinc-900 font-display">
              特に質問が多い5つの安心ポイント
            </h3>
            <span className="text-xs text-zinc-400 font-medium hidden sm:inline">
              （タップして詳しい解説を確認できます）
            </span>
          </div>

          <div className="space-y-3">
            {CORE_5_QA.map((item) => {
              const isOpen = openCoreId === item.id;
              return (
                <div 
                  key={item.id}
                  className="bg-white rounded-2xl border border-rose-100 shadow-xs hover:shadow-sm transition-all overflow-hidden"
                >
                  <button
                    type="button"
                    onClick={() => toggleCoreItem(item.id)}
                    className="w-full text-left p-4 sm:p-5 flex items-start sm:items-center justify-between gap-3 cursor-pointer"
                    aria-expanded={isOpen}
                  >
                    <div className="space-y-1.5 flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className={`text-[10px] sm:text-xs font-bold px-2.5 py-0.5 rounded-full border ${item.badgeColor}`}>
                          {item.category}
                        </span>
                        <span className="text-[10px] text-zinc-400 font-medium">女性スタッフ回答</span>
                      </div>
                      <h4 className="text-sm sm:text-base font-bold text-zinc-900 leading-snug">
                        {item.question}
                      </h4>
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
                          <h5 className="text-xs font-bold text-zinc-800 mb-2 flex items-center gap-1.5">
                            <LucideIcon name="CheckCircle2" size={14} className="text-emerald-600" />
                            <span>安心のポイント</span>
                          </h5>
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
        </div>

        {/* ==========================================
            PART 2: テーマ別詳細Q&A（4大検索インテント）
           ========================================== */}
        <div className="pt-8 border-t border-rose-100/60">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="w-2 h-5 bg-rose-400 rounded-full" />
                <h3 className="text-base sm:text-lg font-bold text-zinc-900 font-display">
                  テーマ別に詳しく調べる
                </h3>
              </div>
              <p className="text-xs text-zinc-500">
                初心者・給料・働き方・不安解消の4大テーマから探せます
              </p>
            </div>
            <div className="text-xs text-zinc-500 font-medium">
              表示中: <strong>{filteredItems.length}</strong> 問
            </div>
          </div>

          {/* 4 Search Intent Category Tabs */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-3 mb-6" id="faq-search-intent-tabs">
            {SEARCH_INTENT_CATEGORIES.map((cat) => {
              const isSelected = selectedTab === cat.key;
              return (
                <button
                  key={cat.key}
                  type="button"
                  onClick={() => {
                    setSelectedTab(cat.key);
                    const firstInCat = HIGH_INTENT_FAQS.find(i => i.searchIntentCategory === cat.key);
                    if (firstInCat) {
                      setOpenIds(prev => new Set([...prev, firstInCat.id]));
                    }
                  }}
                  className={`p-3.5 sm:p-4 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? 'bg-rose-50/80 border-secondary ring-2 ring-secondary/20 shadow-sm'
                      : 'bg-white hover:bg-rose-50/30 border-zinc-200/80 hover:border-rose-200 shadow-2xs'
                  }`}
                  id={`faq-tab-${cat.key}`}
                >
                  <div className="flex items-center justify-between gap-1 mb-2">
                    <span className={`inline-flex items-center gap-1.5 text-xs font-black px-2.5 py-0.5 rounded-full border ${cat.colorClass}`}>
                      <LucideIcon name={cat.icon} size={13} />
                      <span>{cat.label}</span>
                    </span>
                    <span className="text-[11px] font-bold text-zinc-400">
                      5問
                    </span>
                  </div>
                  <div className="text-[11px] sm:text-xs font-bold text-zinc-800 line-clamp-1 mb-1">
                    {cat.subLabel}
                  </div>
                  <div className="text-[10px] text-zinc-500 line-clamp-1">
                    例: {cat.searchQueriesSample[0]}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Filter Bar & Search Input */}
          <div className="bg-white rounded-2xl border border-rose-100 p-3 sm:p-4 shadow-2xs mb-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
              {/* Search Input */}
              <div className="relative w-full sm:w-80">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-400">
                  <LucideIcon name="Search" size={14} />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="キーワードで検索（例: 未経験、手渡し、バレない）"
                  className="w-full pl-9 pr-3 py-2 text-xs bg-rose-50/40 border border-zinc-200 rounded-xl focus:outline-none focus:border-secondary transition-colors"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-zinc-400 hover:text-zinc-600"
                  >
                    <LucideIcon name="X" size={13} />
                  </button>
                )}
              </div>

              {/* Expand / Collapse All */}
              <div className="flex items-center gap-2 self-end sm:self-auto">
                <button
                  type="button"
                  onClick={() => expandAll(filteredItems)}
                  className="text-xs text-zinc-600 hover:text-secondary font-medium px-2 py-1 rounded hover:bg-rose-50 transition-colors cursor-pointer"
                >
                  すべて開く
                </button>
                <span className="text-zinc-300">|</span>
                <button
                  type="button"
                  onClick={collapseAll}
                  className="text-xs text-zinc-600 hover:text-secondary font-medium px-2 py-1 rounded hover:bg-rose-50 transition-colors cursor-pointer"
                >
                  すべて閉じる
                </button>
              </div>
            </div>
          </div>

          {/* High Intent Accordion List */}
          <div className="space-y-3 mb-10">
            {filteredItems.length === 0 ? (
              <div className="bg-white rounded-2xl p-8 text-center border border-rose-100 text-zinc-500 text-xs sm:text-sm">
                「{searchQuery}」に一致する質問が見つかりませんでした。別の言葉でお試しいただくか、専任スタッフへ直接LINEでご相談ください。
              </div>
            ) : (
              filteredItems.map((item) => {
                const isOpen = openIds.has(item.id);
                return (
                  <article
                    key={item.id}
                    id={item.id}
                    className="bg-white rounded-2xl border border-zinc-200/80 hover:border-rose-200 transition-all overflow-hidden shadow-2xs"
                  >
                    <button
                      type="button"
                      onClick={() => toggleItem(item.id)}
                      className="w-full text-left p-4 sm:p-5 flex items-start justify-between gap-3 cursor-pointer"
                      aria-expanded={isOpen}
                    >
                      <div className="space-y-1.5 flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-[10px] sm:text-xs font-black text-secondary bg-rose-50 px-2 py-0.5 rounded-md border border-rose-100">
                            {item.highlightLabel}
                          </span>
                          <span className="text-[11px] text-zinc-400 font-bold">
                            #{item.searchIntentCategoryLabel}
                          </span>
                        </div>
                        <h4 className="text-xs sm:text-sm md:text-base font-extrabold text-zinc-900 leading-snug">
                          {item.question}
                        </h4>
                      </div>

                      <div className="w-7 h-7 rounded-full bg-rose-50 flex items-center justify-center shrink-0 text-secondary transition-transform duration-200 mt-1">
                        <LucideIcon
                          name={isOpen ? "ChevronUp" : "ChevronDown"}
                          size={16}
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
                          className="border-t border-rose-100 bg-gradient-to-b from-rose-50/20 to-white px-4 sm:px-6 py-4 sm:py-5"
                        >
                          {/* Key Takeaways */}
                          {item.keyTakeaways && item.keyTakeaways.length > 0 && (
                            <div className="mb-4 bg-white rounded-xl p-3 sm:p-4 border border-rose-100/80 shadow-2xs">
                              <div className="text-[11px] font-black text-secondary uppercase tracking-wider mb-2 flex items-center gap-1.5">
                                <LucideIcon name="CheckCircle2" size={13} className="text-secondary" />
                                <span>回答の重要ポイント</span>
                              </div>
                              <ul className="space-y-1.5 text-xs text-zinc-700">
                                {item.keyTakeaways.map((point, pIdx) => (
                                  <li key={pIdx} className="flex items-start gap-2">
                                    <span className="text-secondary font-bold">•</span>
                                    <span className="leading-relaxed font-medium">{point}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {/* Full Answer Body */}
                          <div className="text-xs sm:text-sm text-zinc-700 leading-relaxed space-y-3 font-sans">
                            {item.answer.split('\n\n').map((para, pIdx) => (
                              <p key={pIdx}>{para}</p>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </article>
                );
              })
            )}
          </div>
        </div>

        {/* ==========================================
            PART 3: 8大カテゴリ全119問への案内リンク
           ========================================== */}
        <div className="bg-gradient-to-r from-rose-500 to-pink-500 rounded-3xl p-6 sm:p-8 text-white shadow-md text-center">
          <h3 className="text-lg sm:text-xl font-bold font-display mb-2">
            もっと詳しい質問や、テーマ別の疑問を調べたい方へ
          </h3>
          <p className="text-xs sm:text-sm text-white/90 max-w-xl mx-auto leading-relaxed mb-6">
            「面接の服装」「寮の設備」「副業の確定申告」「退店のルール」など、全119問のQ&Aを8つの専門テーマ別にご用意しています。
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-6 max-w-2xl mx-auto">
            {FAQ_8_CATEGORIES.filter(c => c.id !== 'all' && c.id !== 'popular').map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => handleNavigateFaq(cat.slug)}
                className="p-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-bold text-white transition-all cursor-pointer flex items-center justify-center gap-1.5 truncate"
              >
                <LucideIcon name={cat.icon} size={13} />
                <span>{cat.shortLabel}</span>
              </button>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => handleNavigateFaq()}
              className="w-full sm:w-auto px-6 py-3 rounded-full bg-white text-secondary font-bold text-xs sm:text-sm shadow-md hover:bg-rose-50 transition-all cursor-pointer"
            >
              よくある質問（全119問）をすべて見る
            </button>
            {onCtaclick && (
              <button
                type="button"
                onClick={onCtaclick}
                className="w-full sm:w-auto px-6 py-3 rounded-full bg-white/20 text-white font-bold text-xs sm:text-sm hover:bg-white/30 transition-all cursor-pointer"
              >
                女性スタッフにLINEで質問する
              </button>
            )}
          </div>
        </div>

      </div>
    </section>
  );
}
