/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, MouseEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { TESTIMONIALS, LINE_OFFICIAL_URL } from '../data';
import { TestimonialItem } from '../types';
import LucideIcon from './LucideIcon';

// 比較用構造化データ
interface CastComparisonData {
  age: string;
  experience: string;
  period: string;
  shifts: string;
  reason: string;
  highlightFeature: string;
  beforeIncome: string;
  afterIncome: string;
  incomeGain: string;
}

const COMPARISON_MAP: Record<string, CastComparisonData> = {
  'test-1': {
    age: '22歳',
    experience: '完全未経験（夜職・風俗経験ゼロ）',
    period: '勤務歴 6ヶ月',
    shifts: '週4日（10:00〜17:00 / 昼シフト）',
    reason: 'アパレルとカフェのバイト掛け持ちで手取り月収17万円。生活費と奨学金返済でカツカツだったため。',
    highlightFeature: '昼シフト中心で生活リズム安定。半年で奨学金を一括完済＆毎月50万円貯金達成。',
    beforeIncome: '手取り月収 約17万円（アパレル＋カフェ）',
    afterIncome: '初月74万 → 現在 月収115万〜130万円',
    incomeGain: '月収約+100万円UP'
  },
  'test-2': {
    age: '20歳',
    experience: '完全未経験（お酒一切NG・下戸）',
    period: '勤務歴 8ヶ月',
    shifts: '週2〜3日（講義後 17:00〜24:00 または 土日昼）',
    reason: '仕送り減額で居酒屋深夜バイトするも月9万円が限界で体を壊しかけ、学費支払いが急務だったため。',
    highlightFeature: 'お酒不要・講義や試験期間はシフトゼロでOK。学費自力完済＆貯金200万円達成。',
    beforeIncome: '深夜バイト月収 約9万円（週5日夜勤）',
    afterIncome: '月10日勤務で 月収48万〜62万円',
    incomeGain: '月収約+45万円UP'
  },
  'test-3': {
    age: '25歳',
    experience: '完全未経験（会社は副業禁止規定あり）',
    period: '勤務歴 1年6ヶ月',
    shifts: '週末限定 月6〜7日（金曜夜・土曜昼など）',
    reason: 'メーカー一般事務（手取り20万）で物価高により手元に1〜2万円しか残らず将来に不安があったため。',
    highlightFeature: '住民税普通徴収で会社バレ完全回避。平日は本業に集中し週末だけで預金500万円突破。',
    beforeIncome: '本業OL手取り 約20万円',
    afterIncome: '副業38万〜52万円（本業と合算で手取り月収60万〜70万円超）',
    incomeGain: '副業だけで+40万円超'
  }
};

// 絞り込みフィルター（※該当キャストがいない30代は除外）
const FILTER_TAGS = [
  { id: 'all', label: 'すべて', matches: () => true },
  { id: 'beginner', label: '未経験からスタート', matches: () => true },
  { id: 'student_freeter', label: '学生・フリーター', matches: (t: TestimonialItem) => t.id === 'test-1' || t.id === 'test-2' },
  { id: 'career_change', label: '他業種から転職', matches: (t: TestimonialItem) => t.id === 'test-1' || t.id === 'test-3' },
  { id: 'w_work', label: 'Wワーク', matches: (t: TestimonialItem) => t.id === 'test-2' || t.id === 'test-3' },
  { id: 'high_income', label: '収入アップを目指したい', matches: () => true },
  { id: 'twenties', label: '20代', matches: () => true }
];

// 不安解消アコーディオン用 8つの質問と回答
const ANXIETY_FAQS = [
  {
    id: 'afaq-1',
    question: '未経験でも本当に大丈夫ですか？',
    answer: 'はい、在籍キャストの85%以上が夜職・風俗完全未経験からスタートしています。料亭のおばちゃん（仲居さん）が接客マナーから立ち居振る舞いまで優しくフォローするため、事前の専門知識や経験は一切不要です。'
  },
  {
    id: 'afaq-2',
    question: '家族・友人・会社に身バレしませんか？',
    answer: '完全秘密厳守を徹底しています。源氏名での勤務はもちろん、顔写真や個人情報のWEB公開は一切ありません。会社員の方には副業がバレない「住民税の普通徴収手続きマニュアル」をご案内し、個人情報も厳重に暗号化管理しています。'
  },
  {
    id: 'afaq-3',
    question: 'お酒が飲めない・弱くても働けますか？',
    answer: '全く問題ありません。飛田新地の料亭はお酒を飲む場ではありません。お酒を飲む必要や飲酒ノルマは一切なく、お酒が一切飲めない下戸の女性も多数活躍しています。'
  },
  {
    id: 'afaq-4',
    question: '体験入店（1日だけ）でも大丈夫ですか？',
    answer: 'はい、大歓迎です。まずは1日体験入店をして、お店の雰囲気や客層、お仕事内容を確かめてください。働いた分の日給はその場で全額現金手渡しとなります。もし合わないと感じた場合は、その日だけで終了しても一切問題ありません。'
  },
  {
    id: 'afaq-5',
    question: 'ノルマやペナルティ、罰金はありますか？',
    answer: 'ノルマ・ペナルティ・遅刻罰金などは一切ありません。無理に出勤を強要したり、売上目標を課したりすることは組合規約で厳しく禁止されていますので、ご自身のペースで安心して働けます。'
  },
  {
    id: 'afaq-6',
    question: '必要な持ち物や服装はどうすればいいですか？',
    answer: '面接・体験入店時は普段着でお越しいただいて構いません。お仕事に必要な衣装（和装・ワンピース等）はすべて無料でお店が用意・貸与いたします。必要なのは年齢確認ができる身分証明書（住民票原本、免許証、パスポート等）のみです。'
  },
  {
    id: 'afaq-7',
    question: 'お給料は本当にその日全額日払いでもらえますか？',
    answer: 'はい、退勤時にその日の売上・報酬を全額現金で直接手渡しいたします。「翌月払い」や「一部保留」などは一切ありません。急な出費や生活費が必要な方もその日から安心です。'
  },
  {
    id: 'afaq-8',
    question: '相談や面接に行ったら、断れなくなりませんか？',
    answer: '無理な勧誘や引き止めは一切行いません。「まずは話を聞いてみたい」「お店の様子を見てみたい」という相談だけでも大丈夫です。面接後にお断りいただく場合もLINE一本でOKですので、安心してご相談ください。'
  }
];

export default function Testimonials() {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [likedReviews, setLikedReviews] = useState<Record<string, boolean>>({});
  const [likeCounts, setLikeCounts] = useState<Record<string, number>>({
    'test-1': 184,
    'test-2': 142,
    'test-3': 169
  });
  const [selectedFullStory, setSelectedFullStory] = useState<TestimonialItem | null>(null);
  const [selectedVerification, setSelectedVerification] = useState<TestimonialItem | null>(null);
  const [openFaqIds, setOpenFaqIds] = useState<Record<string, boolean>>({
    'afaq-1': true,
    'afaq-2': true
  });

  const handleLike = (id: string, e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const isLiked = likedReviews[id];
    setLikedReviews({ ...likedReviews, [id]: !isLiked });
    setLikeCounts({
      ...likeCounts,
      [id]: isLiked ? likeCounts[id] - 1 : likeCounts[id] + 1
    });
  };

  const toggleFaq = (id: string) => {
    setOpenFaqIds(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const currentFilterObj = FILTER_TAGS.find(f => f.id === activeFilter) || FILTER_TAGS[0];
  const filteredTestimonials = TESTIMONIALS.filter(currentFilterObj.matches);

  return (
    <section className="py-16 md:py-24 bg-[#FFF8F9] text-[#66545A]" id="voice">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        
        {/* =========================================================
            1. セクションの見出し
           ========================================================= */}
        <div className="text-center max-w-3xl mx-auto mb-10 md:mb-14">
          <div className="text-xs font-black tracking-widest text-[#E84B78] uppercase mb-2">
            REAL INTERVIEW
          </div>
          
          <h2 className="font-display font-black text-2xl sm:text-3xl md:text-4xl text-[#38242B] leading-tight mb-4 tracking-tight">
            実際に働く女性のリアルな声
          </h2>
          
          <p className="font-sans text-xs sm:text-sm text-[#66545A] leading-relaxed max-w-2xl mx-auto">
            未経験から始めた女性や、働き方を変えた女性の体験談をご紹介します。
            実際の収入や働き方、働いてみて感じたことを参考にしてください。
          </p>

          {/* 補足ラベル 3項目 */}
          <div className="mt-5 flex flex-wrap items-center justify-center gap-2.5 text-xs text-[#38242B]">
            <span className="inline-flex items-center gap-1.5 bg-white px-3.5 py-1.5 rounded-full border border-[#F3E1E6] shadow-2xs font-medium">
              <LucideIcon name="PenTool" size={13} className="text-[#E84B78]" />
              本人の体験談（直筆サイン確認済み）
            </span>
            <span className="inline-flex items-center gap-1.5 bg-white px-3.5 py-1.5 rounded-full border border-[#F3E1E6] shadow-2xs font-medium">
              <LucideIcon name="ShieldCheck" size={13} className="text-emerald-600" />
              個人情報保護・プライバシー配慮
            </span>
            <span className="inline-flex items-center gap-1.5 bg-white px-3.5 py-1.5 rounded-full border border-[#F3E1E6] shadow-2xs font-medium">
              <LucideIcon name="UserCheck" size={13} className="text-indigo-600" />
              満20歳以上の在籍スタッフ
            </span>
          </div>
        </div>

        {/* =========================================================
            2. 検索・絞り込みタグ
           ========================================================= */}
        <div className="mb-10 sm:mb-12">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 pt-1 no-scrollbar sm:justify-center">
            {FILTER_TAGS.map(tag => {
              const isActive = activeFilter === tag.id;
              return (
                <button
                  key={tag.id}
                  type="button"
                  onClick={() => setActiveFilter(tag.id)}
                  className={`flex-shrink-0 px-3.5 py-2 rounded-full text-xs font-bold transition-all duration-200 cursor-pointer min-h-[40px] flex items-center justify-center ${
                    isActive
                      ? 'bg-[#E84B78] text-white shadow-xs scale-[1.02]'
                      : 'bg-white text-[#66545A] hover:text-[#38242B] border border-[#F3E1E6] hover:border-[#F5A2B8]'
                  }`}
                >
                  {tag.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* =========================================================
            3. インタビューカード 3枚
           ========================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredTestimonials.map((testimonial, idx) => {
            const comparison = COMPARISON_MAP[testimonial.id];
            const isLiked = likedReviews[testimonial.id];
            
            return (
              <motion.article
                key={testimonial.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="bg-white rounded-3xl border border-[#F3E1E6] shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between overflow-hidden"
              >
                <div>
                  {/* ① 4:3 画像エリア */}
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-rose-50/50">
                    <img 
                      src={testimonial.avatarUrl} 
                      alt={`${testimonial.name}さん (${testimonial.age})`} 
                      className="w-full h-full object-cover"
                      loading="lazy"
                      decoding="async"
                    />
                    
                    {/* 画像上のタグ */}
                    <div className="absolute top-3 left-3">
                      <span className="bg-[#E84B78] text-white text-[11px] font-bold px-3 py-1 rounded-full shadow-xs">
                        {testimonial.tag}
                      </span>
                    </div>

                    {/* 検証リンクバッジ */}
                    <button
                      type="button"
                      onClick={() => setSelectedVerification(testimonial)}
                      className="absolute top-3 right-3 inline-flex items-center gap-1 text-[10px] font-bold text-emerald-800 bg-white/95 hover:bg-white border border-emerald-200 px-2.5 py-1 rounded-full shadow-xs transition-colors cursor-pointer"
                      title="本人確認・在籍証明書の検証ログを開く"
                    >
                      <LucideIcon name="CheckCircle2" size={12} className="text-emerald-600" />
                      <span>確認済</span>
                    </button>
                  </div>

                  {/* カード本文エリア */}
                  <div className="p-5 sm:p-6 space-y-4">
                    
                    {/* プロフィール見出し & 直筆サイン */}
                    <div className="flex items-center justify-between gap-3 pb-3 border-b border-[#F3E1E6]">
                      <div>
                        <div className="flex items-baseline gap-2">
                          <h3 className="text-lg sm:text-xl font-black text-[#38242B]">
                            {testimonial.name}さん
                          </h3>
                          <span className="text-xs font-bold text-[#E84B78]">
                            （{testimonial.age}）
                          </span>
                        </div>
                        <p className="text-[11px] text-[#66545A] mt-0.5 font-medium truncate">
                          {testimonial.status}
                        </p>
                      </div>

                      {/* 直筆サイン表示 */}
                      <div className="bg-[#FFF8F9] border border-[#F3E1E6] rounded-xl px-2.5 py-1 text-center flex-shrink-0">
                        <span className="text-[9px] font-bold text-[#E84B78] block tracking-wider">
                          本人自署
                        </span>
                        <img
                          src={testimonial.signatureUrl}
                          alt={`${testimonial.name}さんの自署サイン`}
                          className="h-6 w-auto object-contain mix-blend-multiply mx-auto"
                          loading="lazy"
                        />
                      </div>
                    </div>

                    {/* 収入変化ハイライト */}
                    <div className="bg-[#FFF8F9] rounded-2xl p-3.5 border border-[#F3E1E6]">
                      <div className="text-[10px] font-black text-[#E84B78] uppercase tracking-wider mb-1 flex items-center justify-between">
                        <span>【実際の収入変化】</span>
                        <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200 text-[10px] font-bold">
                          {comparison?.incomeGain}
                        </span>
                      </div>
                      <div className="text-xs space-y-1">
                        <div className="flex items-center gap-1.5 text-zinc-500">
                          <span className="text-[10px] font-bold bg-zinc-200/80 text-zinc-700 px-1.5 py-0.2 rounded text-[10px]">前</span>
                          <span className="line-through text-[11px]">{comparison?.beforeIncome}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-[#38242B] font-black text-xs sm:text-sm pt-0.5">
                          <span className="text-[10px] font-bold bg-[#E84B78] text-white px-1.5 py-0.2 rounded text-[10px]">後</span>
                          <span className="text-[#E84B78]">{comparison?.afterIncome}</span>
                        </div>
                      </div>
                    </div>

                    {/* 本人のリアルな声（薄ピンク背景） */}
                    <div className="bg-[#FFF8F9] rounded-2xl p-3.5 border border-[#F3E1E6]">
                      <span className="text-[10px] font-bold text-[#E84B78] block mb-1">
                        【本人のリアルな声】
                      </span>
                      <p className="text-xs sm:text-[13px] font-medium leading-relaxed text-[#38242B]">
                        “{testimonial.quote}”
                      </p>
                    </div>

                    {/* 共通比較項目テーブル */}
                    <div className="bg-white rounded-2xl border border-[#F3E1E6] p-3 text-xs space-y-2">
                      <div className="grid grid-cols-2 gap-2 text-[11px]">
                        <div>
                          <span className="text-zinc-400 block text-[10px] font-bold">年齢</span>
                          <span className="font-bold text-[#38242B]">{comparison?.age}</span>
                        </div>
                        <div>
                          <span className="text-zinc-400 block text-[10px] font-bold">勤務歴</span>
                          <span className="font-bold text-[#38242B]">{comparison?.period}</span>
                        </div>
                      </div>

                      <div className="pt-1 border-t border-zinc-100 text-[11px]">
                        <span className="text-zinc-400 block text-[10px] font-bold">夜職経験</span>
                        <span className="font-bold text-[#E84B78]">{comparison?.experience}</span>
                      </div>

                      <div className="pt-1 border-t border-zinc-100 text-[11px]">
                        <span className="text-zinc-400 block text-[10px] font-bold">勤務日数・シフト</span>
                        <span className="font-medium text-[#38242B]">{comparison?.shifts}</span>
                      </div>

                      <div className="pt-1 border-t border-zinc-100 text-[11px]">
                        <span className="text-zinc-400 block text-[10px] font-bold">働き始めた理由</span>
                        <p className="text-[#66545A] leading-relaxed text-[11px] mt-0.5">
                          {comparison?.reason}
                        </p>
                      </div>

                      <div className="pt-1 border-t border-zinc-100 text-[11px]">
                        <span className="text-zinc-400 block text-[10px] font-bold">体験談の特徴</span>
                        <p className="text-[#38242B] font-medium leading-relaxed text-[11px] mt-0.5">
                          {comparison?.highlightFeature}
                        </p>
                      </div>
                    </div>

                    {/* 3つのQ&Aハイライト */}
                    <div className="space-y-2.5 pt-1">
                      <div className="text-[11px] font-black text-[#38242B] flex items-center gap-1.5">
                        <LucideIcon name="MessageSquareText" size={13} className="text-[#E84B78]" />
                        <span>注目の対談ハイライト</span>
                      </div>

                      <div className="space-y-2">
                        {/* Q2: 不安・身バレ */}
                        <div className="bg-zinc-50/80 rounded-xl p-2.5 border border-zinc-200/60 text-xs space-y-1">
                          <div className="flex items-start gap-1.5">
                            <span className="w-4 h-4 rounded-full bg-[#38242B] text-white text-[9px] font-black flex items-center justify-center flex-shrink-0 mt-0.5">
                              Q
                            </span>
                            <span className="font-bold text-[#38242B] text-[11px]">
                              {testimonial.interviewQAs[1]?.question}
                            </span>
                          </div>
                          <div className="flex items-start gap-1.5 pl-1 text-[11px] text-[#66545A] leading-relaxed">
                            <span className="w-4 h-4 rounded-full bg-[#E84B78] text-white text-[9px] font-black flex items-center justify-center flex-shrink-0 mt-0.5">
                              A
                            </span>
                            <p className="flex-1">
                              「{testimonial.interviewQAs[1]?.answer}」
                            </p>
                          </div>
                        </div>

                        {/* Q4: 初日の様子とお給料 */}
                        <div className="bg-zinc-50/80 rounded-xl p-2.5 border border-zinc-200/60 text-xs space-y-1">
                          <div className="flex items-start gap-1.5">
                            <span className="w-4 h-4 rounded-full bg-[#38242B] text-white text-[9px] font-black flex items-center justify-center flex-shrink-0 mt-0.5">
                              Q
                            </span>
                            <span className="font-bold text-[#38242B] text-[11px]">
                              {testimonial.interviewQAs[3]?.question}
                            </span>
                          </div>
                          <div className="flex items-start gap-1.5 pl-1 text-[11px] text-[#66545A] leading-relaxed">
                            <span className="w-4 h-4 rounded-full bg-[#E84B78] text-white text-[9px] font-black flex items-center justify-center flex-shrink-0 mt-0.5">
                              A
                            </span>
                            <p className="flex-1">
                              「{testimonial.interviewQAs[3]?.answer}」
                            </p>
                          </div>
                        </div>

                        {/* Q6: 実際の収入と生活の変化 */}
                        <div className="bg-zinc-50/80 rounded-xl p-2.5 border border-zinc-200/60 text-xs space-y-1">
                          <div className="flex items-start gap-1.5">
                            <span className="w-4 h-4 rounded-full bg-[#38242B] text-white text-[9px] font-black flex items-center justify-center flex-shrink-0 mt-0.5">
                              Q
                            </span>
                            <span className="font-bold text-[#38242B] text-[11px]">
                              {testimonial.interviewQAs[5]?.question}
                            </span>
                          </div>
                          <div className="flex items-start gap-1.5 pl-1 text-[11px] text-[#66545A] leading-relaxed">
                            <span className="w-4 h-4 rounded-full bg-[#E84B78] text-white text-[9px] font-black flex items-center justify-center flex-shrink-0 mt-0.5">
                              A
                            </span>
                            <p className="flex-1">
                              「{testimonial.interviewQAs[5]?.answer}」
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* 詳細を見るボタン */}
                    <div className="pt-2">
                      <button
                        type="button"
                        onClick={() => setSelectedFullStory(testimonial)}
                        className="w-full py-2.5 px-4 bg-white hover:bg-[#FFF8F9] text-[#E84B78] border border-[#E84B78] font-bold rounded-xl text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs group"
                      >
                        <span>{testimonial.name}さんのインタビュー全文を見る</span>
                        <LucideIcon name="ArrowRight" size={14} className="group-hover:translate-x-0.5 transition-transform" />
                      </button>
                    </div>

                  </div>
                </div>

                {/* カードフッター: 認証番号 & いいねボタン */}
                <div className="p-4 bg-zinc-50/80 border-t border-[#F3E1E6] flex items-center justify-between text-xs">
                  <button
                    type="button"
                    onClick={() => setSelectedVerification(testimonial)}
                    className="inline-flex items-center gap-1 text-[#66545A] hover:text-emerald-700 text-[11px] font-medium transition-colors cursor-pointer"
                  >
                    <span className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-[10px] font-black">
                      ✓
                    </span>
                    <span className="underline decoration-dotted underline-offset-2">
                      確認番号: {testimonial.verification.verificationId}
                    </span>
                  </button>

                  <button 
                    onClick={(e) => handleLike(testimonial.id, e)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all cursor-pointer text-xs ${
                      isLiked 
                        ? 'bg-rose-100 text-[#E84B78] font-bold shadow-2xs' 
                        : 'bg-white hover:bg-[#FFF8F9] text-zinc-500 hover:text-[#E84B78] border border-gray-200 shadow-2xs'
                    }`}
                  >
                    <LucideIcon 
                      name="Heart" 
                      size={13} 
                      className={`${isLiked ? 'fill-[#E84B78] text-[#E84B78]' : 'text-zinc-400'}`} 
                    />
                    <span>参考になった ({likeCounts[testimonial.id]})</span>
                  </button>
                </div>
              </motion.article>
            );
          })}
        </div>

        {/* =========================================================
            4. 応募する前に、気になることを解消しませんか？（アコーディオン）
           ========================================================= */}
        <div className="mt-16 md:mt-20 bg-white rounded-3xl border border-[#F3E1E6] p-6 sm:p-8 md:p-10 shadow-xs">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="text-[11px] font-bold text-[#E84B78] bg-[#FFF8F9] border border-[#F3E1E6] px-3.5 py-1 rounded-full inline-block mb-2">
              事前のお悩み解消
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-[#38242B] tracking-tight">
              応募する前に、気になることを解消しませんか？
            </h3>
            <p className="text-xs sm:text-sm text-[#66545A] mt-2">
              未経験の方が特に気になる疑問や不安をまとめました。クリックして回答をご確認いただけます。
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-4">
            {ANXIETY_FAQS.map((faq) => {
              const isOpen = !!openFaqIds[faq.id];
              return (
                <div 
                  key={faq.id}
                  className="border border-[#F3E1E6] rounded-2xl overflow-hidden bg-[#FFF8F9]/50 transition-colors"
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full text-left p-4 sm:p-4.5 flex items-center justify-between gap-3 cursor-pointer hover:bg-[#FFF8F9] transition-colors"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="w-6 h-6 rounded-full bg-[#E84B78] text-white text-xs font-black flex items-center justify-center flex-shrink-0">
                        Q
                      </span>
                      <span className="font-bold text-xs sm:text-sm text-[#38242B]">
                        {faq.question}
                      </span>
                    </div>
                    <LucideIcon 
                      name={isOpen ? 'ChevronUp' : 'ChevronDown'} 
                      size={16} 
                      className="text-[#E84B78] flex-shrink-0"
                    />
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="px-4 pb-4 pt-1 sm:px-4.5 sm:pb-4.5 border-t border-[#F3E1E6] bg-white text-xs text-[#66545A] leading-relaxed flex items-start gap-2.5"
                      >
                        <span className="w-5 h-5 rounded-full bg-zinc-100 text-[#38242B] text-[10px] font-black flex items-center justify-center flex-shrink-0 mt-0.5">
                          A
                        </span>
                        <div className="flex-1">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>

        {/* =========================================================
            5. あなたに合った働き方を一緒に考えます
           ========================================================= */}
        <div className="mt-8 bg-gradient-to-r from-[#FFF8F9] via-white to-[#FFF8F9] rounded-3xl border border-[#F3E1E6] p-6 sm:p-8 shadow-xs">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="w-14 h-14 rounded-2xl bg-[#E84B78]/10 text-[#E84B78] flex items-center justify-center flex-shrink-0">
              <LucideIcon name="HeartHandshake" size={30} />
            </div>
            
            <div className="flex-1 text-center md:text-left">
              <h4 className="text-base sm:text-lg font-black text-[#38242B]">
                あなたに合った働き方を一緒に考えます
              </h4>
              <p className="text-xs sm:text-sm text-[#66545A] mt-1.5 leading-relaxed">
                飛田ガールズでは、無理なシフトの強要やノルマの押し付けは一切行いません。「学業と両立したい」「本業にバレずに週末だけ」「○ヶ月で100万円貯めたい」など、女性スタッフがあなたの希望を丁寧にヒアリングし、最も働きやすい環境をご案内します。
              </p>
            </div>

            <div className="flex-shrink-0 flex flex-col gap-2 w-full md:w-auto text-xs">
              <div className="flex items-center gap-2 bg-white px-3.5 py-1.5 rounded-xl border border-[#F3E1E6]">
                <LucideIcon name="Check" size={14} className="text-[#E84B78]" />
                <span className="font-bold text-[#38242B]">匿名・LINEでの事前相談OK</span>
              </div>
              <div className="flex items-center gap-2 bg-white px-3.5 py-1.5 rounded-xl border border-[#F3E1E6]">
                <LucideIcon name="Check" size={14} className="text-[#E84B78]" />
                <span className="font-bold text-[#38242B]">極力貴女の希望に合わせます</span>
              </div>
              <div className="flex items-center gap-2 bg-white px-3.5 py-1.5 rounded-xl border border-[#F3E1E6]">
                <LucideIcon name="Check" size={14} className="text-[#E84B78]" />
                <span className="font-bold text-[#38242B]">体験入店のみで終了もペナルティなし</span>
              </div>
            </div>
          </div>
        </div>

        {/* =========================================================
            6. 独立したLINE CTAセクション
           ========================================================= */}
        <div className="mt-10 bg-white rounded-3xl border-2 border-[#E84B78]/30 p-6 sm:p-10 shadow-sm text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 transform translate-x-8 -translate-y-8 w-40 h-40 bg-rose-50 rounded-full blur-2xl pointer-events-none" />
          <div className="relative z-10 max-w-2xl mx-auto space-y-4">
            <span className="inline-block text-xs font-black text-[#E84B78] bg-[#FFF8F9] px-3.5 py-1 rounded-full border border-[#F3E1E6]">
              まずは気軽に質問・相談
            </span>
            
            <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-[#38242B] leading-snug">
              応募するか迷っている方も、<br className="hidden sm:inline" />
              まずはお気軽にご相談ください
            </h3>
            
            <p className="text-xs sm:text-sm text-[#66545A] leading-relaxed">
              「未経験だけど自分にできる？」「今月だけ少し稼ぎたい」「身バレ対策を詳しく知りたい」など、どんな些細な疑問やご相談も大歓迎です。女性スタッフが親身に対応いたします。
            </p>

            <div className="pt-2">
              <a
                href={LINE_OFFICIAL_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 bg-[#06C755] hover:bg-[#05b34c] text-white font-black text-sm sm:text-base px-8 py-4 rounded-2xl shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5 cursor-pointer w-full sm:w-auto min-h-[48px]"
              >
                <LucideIcon name="MessageCircle" size={22} className="text-white" />
                <span>LINEで気軽に相談する</span>
                <LucideIcon name="ArrowRight" size={18} />
              </a>
            </div>

            <div className="pt-2 text-[11px] sm:text-xs text-zinc-500 space-y-1">
              <p>24時間受付中 / 相談無料 / 無理な勧誘・引き止めは一切ありません</p>
              <p>※匿名でのご相談OK・友達追加後すぐにメッセージいただけます</p>
            </div>
          </div>
        </div>

        {/* =========================================================
            7. 4つの安心・信頼バッジ
           ========================================================= */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-3.5 sm:gap-4 text-center">
          <div className="bg-white rounded-2xl p-4 border border-[#F3E1E6] shadow-2xs">
            <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-2">
              <LucideIcon name="ShieldCheck" size={18} />
            </div>
            <div className="font-bold text-xs text-[#38242B]">満20歳以上限定・法令遵守</div>
            <div className="text-[10px] text-zinc-500 mt-1">20歳未満就労禁止・年齢確認徹底</div>
          </div>

          <div className="bg-white rounded-2xl p-4 border border-[#F3E1E6] shadow-2xs">
            <div className="w-8 h-8 rounded-full bg-rose-50 text-[#E84B78] flex items-center justify-center mx-auto mb-2">
              <LucideIcon name="Home" size={18} />
            </div>
            <div className="font-bold text-xs text-[#38242B]">完全個室待機・安全管理</div>
            <div className="text-[10px] text-zinc-500 mt-1">全室冷暖房完備・女性専用控室</div>
          </div>

          <div className="bg-white rounded-2xl p-4 border border-[#F3E1E6] shadow-2xs">
            <div className="w-8 h-8 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto mb-2">
              <LucideIcon name="Lock" size={18} />
            </div>
            <div className="font-bold text-xs text-[#38242B]">身バレ防止・税務サポート</div>
            <div className="text-[10px] text-zinc-500 mt-1">WEB写真非公開・住民税普通徴収</div>
          </div>

          <div className="bg-white rounded-2xl p-4 border border-[#F3E1E6] shadow-2xs">
            <div className="w-8 h-8 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center mx-auto mb-2">
              <LucideIcon name="Smile" size={18} />
            </div>
            <div className="font-bold text-xs text-[#38242B]">無理な勧誘・引き止めゼロ</div>
            <div className="text-[10px] text-zinc-500 mt-1">1日体験入店のみOK・即日全額日払い</div>
          </div>
        </div>

      </div>

      {/* =========================================================
          モーダル 1: インタビュー全文（全7問対談・ストーリー詳細）
         ========================================================= */}
      <AnimatePresence>
        {selectedFullStory && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-[#F3E1E6] overflow-hidden relative max-h-[90vh] flex flex-col"
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-[#E84B78] to-[#F5A2B8] px-6 py-4 text-white flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold tracking-wider uppercase opacity-90 block">
                    INTERVIEW FULL STORY
                  </span>
                  <h3 className="font-bold text-base sm:text-lg">
                    {selectedFullStory.name}さん（{selectedFullStory.age}）のインタビュー全文
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedFullStory(null)}
                  className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-colors cursor-pointer"
                  title="閉じる"
                >
                  <LucideIcon name="X" size={18} />
                </button>
              </div>

              {/* Body */}
              <div className="p-6 overflow-y-auto space-y-6 text-xs text-[#66545A]">
                
                {/* Profile Banner */}
                <div className="flex items-center gap-4 bg-[#FFF8F9] p-4 rounded-2xl border border-[#F3E1E6]">
                  <img
                    src={selectedFullStory.avatarUrl}
                    alt={selectedFullStory.name}
                    className="w-16 h-16 rounded-xl object-cover border border-[#F3E1E6]"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-base font-black text-[#38242B]">{selectedFullStory.name}さん</span>
                      <span className="text-xs font-bold text-[#E84B78]">{selectedFullStory.age}</span>
                    </div>
                    <p className="text-[11px] text-zinc-500 mt-0.5">{selectedFullStory.status}</p>
                    <p className="text-xs font-bold text-[#E84B78] mt-1">{selectedFullStory.highlightEarnings}</p>
                  </div>
                </div>

                {/* 全7問 対談記録 */}
                <div className="space-y-4">
                  <h4 className="font-black text-sm text-[#38242B] border-b border-[#F3E1E6] pb-2 flex items-center gap-2">
                    <LucideIcon name="MessageSquareText" size={16} className="text-[#E84B78]" />
                    <span>公式対談記録（全7問）</span>
                  </h4>

                  {selectedFullStory.interviewQAs.map((qa) => (
                    <div 
                      key={qa.qNumber}
                      className="bg-zinc-50 rounded-2xl p-4 border border-zinc-200/80 space-y-2"
                    >
                      <div className="flex items-start gap-2">
                        <span className="w-5 h-5 rounded-full bg-[#38242B] text-white text-[10px] font-black flex items-center justify-center flex-shrink-0 mt-0.5">
                          {qa.qNumber}
                        </span>
                        <div className="flex-1">
                          <span className="text-[10px] font-bold text-[#E84B78] mr-1.5 uppercase">
                            [{qa.topic}]
                          </span>
                          <h5 className="font-bold text-xs text-[#38242B] inline">
                            {qa.question}
                          </h5>
                        </div>
                      </div>

                      <div className="flex items-start gap-2 pt-2 border-t border-zinc-200/60 pl-1">
                        <span className="w-5 h-5 rounded-full bg-[#E84B78] text-white text-[10px] font-black flex items-center justify-center flex-shrink-0 mt-0.5">
                          A
                        </span>
                        <p className="text-xs text-[#38242B] leading-relaxed flex-1">
                          「{qa.answer}」
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* LINE相談誘導 */}
                <div className="bg-[#FFF8F9] rounded-2xl p-4 border border-[#F3E1E6] text-center space-y-2">
                  <p className="font-bold text-xs text-[#38242B]">
                    {selectedFullStory.name}さんのような働き方に興味がある方は、LINEで気軽にご相談ください
                  </p>
                  <a
                    href={LINE_OFFICIAL_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 bg-[#06C755] hover:bg-[#05b34c] text-white font-bold text-xs px-6 py-2.5 rounded-xl shadow-xs transition-colors cursor-pointer"
                  >
                    <LucideIcon name="MessageCircle" size={16} />
                    <span>公式LINEで相談する</span>
                  </a>
                </div>

              </div>

              {/* Footer */}
              <div className="p-4 bg-zinc-50 border-t border-[#F3E1E6] flex justify-end">
                <button
                  type="button"
                  onClick={() => setSelectedFullStory(null)}
                  className="px-5 py-2 bg-zinc-800 hover:bg-zinc-900 text-white text-xs font-bold rounded-xl transition-colors cursor-pointer"
                >
                  閉じる
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* =========================================================
          モーダル 2: 在籍キャスト本人確認・審査ログ
         ========================================================= */}
      <AnimatePresence>
        {selectedVerification && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-[#F3E1E6] overflow-hidden relative max-h-[90vh] flex flex-col"
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-emerald-600 to-teal-700 px-6 py-4 text-white flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center">
                    <LucideIcon name="FileCheck" size={16} className="text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm">在籍キャスト インタビュー証明</h3>
                    <p className="text-[10px] text-emerald-100">実在キャスト対談記録</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedVerification(null)}
                  className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-colors cursor-pointer"
                  title="閉じる"
                >
                  <LucideIcon name="X" size={16} />
                </button>
              </div>

              {/* Body */}
              <div className="p-6 overflow-y-auto space-y-4 text-zinc-700 text-xs">
                {/* Status Stamp */}
                <div className="flex items-center justify-between bg-emerald-50/80 border border-emerald-200 rounded-2xl p-4">
                  <div>
                    <span className="text-[10px] text-emerald-800 font-bold tracking-wider block">確認状況</span>
                    <span className="text-base font-black text-emerald-700 flex items-center gap-1 mt-0.5">
                      <LucideIcon name="CheckCircle2" size={16} />
                      年齢確認・在籍確認 完了
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-zinc-500 block">管理番号</span>
                    <span className="font-mono font-bold text-xs text-zinc-800">{selectedVerification.verification.verificationId}</span>
                  </div>
                </div>

                {/* Cast Profile & Original Signature Match */}
                <div className="border border-gray-200 rounded-2xl p-4 bg-zinc-50/60 space-y-3">
                  <div className="text-[11px] font-bold text-zinc-500">【インタビューしたキャストのプロフィール】</div>
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <div className="text-sm font-black text-zinc-900">
                        {selectedVerification.name}さん（{selectedVerification.profile.ageGroup}）
                      </div>
                      <div className="text-xs text-zinc-600 mt-0.5">
                        前職：{selectedVerification.profile.previousJob}
                      </div>
                    </div>
                    {/* Handwritten Signature Box */}
                    <div className="bg-white border border-dashed border-[#F5A2B8] rounded-xl px-3 py-1.5 text-center shadow-2xs">
                      <span className="text-[9px] text-zinc-400 block font-medium">ご本人の直筆サイン</span>
                      <img
                        src={selectedVerification.signatureUrl}
                        alt={`${selectedVerification.name}の直筆サイン`}
                        className="h-8 w-auto object-contain mx-auto mix-blend-multiply"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-[11px] pt-2 border-t border-gray-200">
                    <div>
                      <span className="text-zinc-500 font-medium">勤務歴：</span>
                      <span className="font-bold text-zinc-800">{selectedVerification.profile.workPeriod}</span>
                    </div>
                    <div>
                      <span className="text-zinc-500 font-medium">夜職経験：</span>
                      <span className="font-bold text-[#E84B78]">{selectedVerification.profile.nightWorkExp}</span>
                    </div>
                    <div>
                      <span className="text-zinc-500 font-medium">取材日：</span>
                      <span className="font-bold text-zinc-800">{selectedVerification.profile.interviewDate}</span>
                    </div>
                    <div>
                      <span className="text-zinc-500 font-medium">取材担当：</span>
                      <span className="font-bold text-zinc-800">{selectedVerification.profile.interviewer}</span>
                    </div>
                  </div>
                </div>

                {/* Checklist */}
                <div className="bg-white border border-gray-200 rounded-xl p-3 space-y-2">
                  <div className="flex justify-between py-1 border-b border-gray-100">
                    <span className="text-zinc-500 font-medium">確認実施日</span>
                    <span className="font-bold text-zinc-800">{selectedVerification.verification.verifiedDate}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-gray-100">
                    <span className="text-zinc-500 font-medium">提出確認書類</span>
                    <span className="font-bold text-zinc-800 text-right">{selectedVerification.verification.docType}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-gray-100">
                    <span className="text-zinc-500 font-medium">年齢・適法審査</span>
                    <span className="font-bold text-emerald-700 text-right">{selectedVerification.verification.complianceCheck}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-gray-100">
                    <span className="text-zinc-500 font-medium">所属店舗種別</span>
                    <span className="font-bold text-zinc-800 text-right">{selectedVerification.verification.storeName}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-gray-100">
                    <span className="text-zinc-500 font-medium">署名・原本照合</span>
                    <span className="font-bold text-[#E84B78] text-right">{selectedVerification.verification.signatureMatch}</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-zinc-500 font-medium">掲載同意確認</span>
                    <span className="font-bold text-zinc-800 text-right">{selectedVerification.verification.consentDate}</span>
                  </div>
                </div>

                {/* Summary Statement */}
                <div className="bg-[#FFF8F9] rounded-xl p-3 text-[11px] text-zinc-600 leading-relaxed border border-[#F3E1E6]">
                  <strong className="text-zinc-800 block mb-1">■ 審査基準と個人情報保護について</strong>
                  {selectedVerification.verification.methodSummary}
                  <br />
                  ※個人情報保護方針に基づき、本籍地記載の住民票原本および自署同意書は、暗号化サーバーにて厳重保管しております。
                </div>
              </div>

              {/* Footer */}
              <div className="p-4 bg-zinc-50 border-t border-gray-200 flex justify-end">
                <button
                  type="button"
                  onClick={() => setSelectedVerification(null)}
                  className="px-5 py-2 bg-zinc-800 hover:bg-zinc-900 text-white text-xs font-bold rounded-xl transition-colors cursor-pointer"
                >
                  確認を閉じる
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* =========================================================
          Structured Data (Schema.org JSON-LD)
         ========================================================= */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": TESTIMONIALS.map((t) => ({
              "@type": "Article",
              "@id": `https://tobitashinchi-recruit.com/#interview-${t.id}`,
              "headline": `飛田新地で働いた女性インタビュー【${t.name}さん・年齢:${t.profile.ageGroup}・前職:${t.profile.previousJob}・勤務歴:${t.profile.workPeriod}】`,
              "description": `${t.name}さん（${t.profile.ageGroup}・前職:${t.profile.previousJob}・経験:${t.profile.nightWorkExp}）への公式対面インタビュー。取材日:${t.profile.interviewDate}。実在キャストの自署同意書保管・リアルな本音。`,
              "datePublished": "2026-03-14",
              "dateModified": "2026-08-20",
              "inLanguage": "ja-JP",
              "author": {
                "@type": "Person",
                "name": t.profile.interviewer,
                "jobTitle": "女性サポート相談担当（元キャスト歴8年）"
              },
              "about": {
                "@type": "Person",
                "name": `${t.name}（源氏名）`,
                "jobTitle": "料亭キャスト",
                "description": `${t.profile.ageGroup}、前職は${t.profile.previousJob}、夜職経験:${t.profile.nightWorkExp}。勤務歴:${t.profile.workPeriod}。`
              },
              "articleBody": `${t.quote} 前職は${t.profile.previousJob}、夜職経験は${t.profile.nightWorkExp}。${t.story.situationBefore} ${t.story.firstDayImpression} ${t.story.actualEarnings} ${t.story.adviceForOthers}`,
              "publisher": {
                "@type": "Organization",
                "name": "飛田新地求人 飛田ガールズ（料理組合公認料亭直営）",
                "url": "https://tobitashinchi-recruit.com",
                "logo": "https://tobitashinchi-recruit.com/favicon.svg"
              }
            }))
          })
        }}
      />
    </section>
  );
}
