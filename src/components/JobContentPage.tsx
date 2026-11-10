/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import LucideIcon from './LucideIcon';
import { LINE_OFFICIAL_URL } from '../data';

interface JobContentPageProps {
  onNavigateHome: () => void;
  onNavigateTopic?: (topicId: string) => void;
  onNavigateBlog?: (slug?: string) => void;
  onNavigateFaq?: () => void;
  onCtaclick: () => void;
  onInjectedScroll?: (msg: string) => void;
}

export default function JobContentPage({
  onNavigateHome,
  onInjectedScroll,
}: JobContentPageProps) {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const handleLineClick = (messageText: string) => {
    if (onInjectedScroll) {
      onInjectedScroll(messageText);
    } else {
      window.open(LINE_OFFICIAL_URL, '_blank', 'noopener,noreferrer');
    }
  };

  const jobFaqs = [
    {
      q: 'お茶出しやお菓子出しの雑用は本当にありませんか？',
      a: 'はい、一切ありません。急須でお茶を淹れたり、お菓子を配ったりするような昔ながらの雑用業務は行っていません。お客様との和やかな接客時間だけに集中していただけます。'
    },
    {
      q: '玄関で自分から声をかけて客引きをする必要はありますか？',
      a: 'いいえ、ご自身で声を出す必要は一切ありません。通りを通るお客様への呼び込みや声掛け、料金の説明などはすべてお隣の仲居さん（おばちゃん）が担当します。女性は笑顔で座って会釈や手を振るだけで大丈夫です。'
    },
    {
      q: '待機中はずっと正座で座り続けないといけませんか？',
      a: '正座の必要はありません。ふかふかの座布団の上で足を崩して楽な姿勢で座っていただけます。また、一定時間ごとに交代して冷暖房完備の控室で休憩をとるため、足腰への負担も安心です。'
    },
    {
      q: 'お客様との連絡先交換（LINEなど）や営業連絡はありますか？',
      a: '一切ありません。飛田新地では組合の規約により、お客様との個人的な連絡先交換が厳しく禁止されています。そのため、勤務外に営業LINEを送ったり、同伴・アフターなどの拘束が発生することは絶対にありません。'
    },
    {
      q: '接客中、仲居さんや他のスタッフが部屋に入ってくることはありますか？',
      a: 'いいえ、接客中にお部屋へスタッフが入ることはありません。お部屋は女性とお客様の2人きりの空間となります。ただし、お部屋には内線電話や非常ボタンが完備されており、何かあればいつでもすぐに仲居さんやスタッフが駆けつけられる体制が整っています。'
    },
    {
      q: '体調が悪くなったり疲れたときは途中で休めますか？',
      a: 'もちろん可能です。体調が優れない時や急な生理、疲労がある場合は、遠慮なく仲居さんや女性スタッフにお伝えください。無理をさせず、控室で横になって休んでいただけます。'
    },
    {
      q: '完全な未経験でも、初日から1人でお仕事できますか？',
      a: 'はい、在籍女性の約9割が未経験からのスタートです。出勤初日に女性スタッフと仲居さんが、お部屋の使い方・衛生準備・接客の流れを丁寧にレクチャーします。複雑なルールはないため、初めての方でも安心して当日中に覚えられます。'
    }
  ];

  return (
    <div className="bg-[#FFF8F9] min-h-screen text-[#66545A] pb-24 pt-4 sm:pt-6 font-sans antialiased selection:bg-[#E84B78]/20 selection:text-[#E84B78]">
      
      {/* 1. パンくずリスト */}
      <div className="max-w-[1140px] mx-auto px-4 sm:px-6 mb-4 sm:mb-6">
        <nav aria-label="Breadcrumb" className="flex items-center text-xs">
          <ol className="flex items-center gap-1.5 flex-wrap text-[#66545A]">
            <li className="flex items-center gap-1">
              <button
                type="button"
                onClick={onNavigateHome}
                className="hover:text-[#E84B78] font-bold flex items-center gap-1 text-[#38242B] hover:underline cursor-pointer"
              >
                <LucideIcon name="Home" size={13} className="text-[#E84B78]" />
                <span>飛田新地求人（トップ）</span>
              </button>
            </li>
            <li className="text-[#F5A2B8]">/</li>
            <li className="flex items-center gap-1 text-[#E84B78] font-bold" aria-current="page">
              <span>お仕事内容</span>
            </li>
          </ol>
        </nav>
      </div>

      <div className="max-w-[1100px] mx-auto px-4 sm:px-6 space-y-12 sm:space-y-16">
        
        {/* =========================================================
            SECTION 1: ファーストビュー (First View)
           ========================================================= */}
        <section className="bg-white rounded-3xl p-6 sm:p-9 md:p-11 border border-[#F3E1E6] shadow-sm relative overflow-hidden">
          <div className="inline-flex items-center gap-1.5 bg-[#FFF8F9] text-[#E84B78] text-[12px] font-bold px-3.5 py-1.5 rounded-full mb-4 border border-[#F3E1E6]">
            <LucideIcon name="Sparkles" size={14} className="text-[#E84B78]" />
            <span>初めての方へ｜お仕事内容</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left: Main Copy & Sub Copy */}
            <div className="lg:col-span-7 space-y-5">
              <h1 className="font-display font-black text-2xl sm:text-3xl md:text-[34px] text-[#38242B] leading-snug tracking-tight">
                初めてだからこそ、知っておきたい。<br />
                <span className="text-[#E84B78]">飛田新地のお仕事内容。</span>
              </h1>

              <p className="text-sm sm:text-base text-[#38242B] font-bold leading-relaxed">
                実際のお仕事の流れや、女性と仲居さんの役割を分かりやすくご紹介します。
              </p>

              <p className="text-xs sm:text-[13.5px] text-[#66545A] leading-relaxed">
                未経験の方にもイメージしやすいように、接客前から接客後まで順番に説明しています。余計な業務や曖昧な表現をなくし、実際の仕事内容だけを誠実にお伝えします。
              </p>

              {/* 3つの重要ポイント */}
              <div className="space-y-2.5 pt-1">
                <div className="flex items-start gap-3 bg-[#FFF8F9] p-3.5 rounded-2xl border border-[#F3E1E6]">
                  <span className="w-5 h-5 rounded-full bg-[#E84B78] text-white flex items-center justify-center text-[10px] font-black shrink-0 mt-0.5">
                    ✓
                  </span>
                  <div>
                    <span className="text-xs sm:text-sm font-bold text-[#38242B] block">
                      玄関では座って愛想よく手招き・笑顔でお迎え
                    </span>
                    <span className="text-[11px] sm:text-xs text-[#66545A]">
                      通りを歩くお客様に愛想よく手招きや笑顔でお迎えします。声掛けや呼び込みはお隣の仲居さんが担当します。
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-[#FFF8F9] p-3.5 rounded-2xl border border-[#F3E1E6]">
                  <span className="w-5 h-5 rounded-full bg-[#E84B78] text-white flex items-center justify-center text-[10px] font-black shrink-0 mt-0.5">
                    ✓
                  </span>
                  <div>
                    <span className="text-xs sm:text-sm font-bold text-[#38242B] block">
                      1回の接客時間は約15〜20分
                    </span>
                    <span className="text-[11px] sm:text-xs text-[#66545A]">
                      タイマーにより時間が厳格に管理されており、長時間の拘束や体力的な無理がありません。
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-[#FFF8F9] p-3.5 rounded-2xl border border-[#F3E1E6]">
                  <span className="w-5 h-5 rounded-full bg-[#E84B78] text-white flex items-center justify-center text-[10px] font-black shrink-0 mt-0.5">
                    ✓
                  </span>
                  <div>
                    <span className="text-xs sm:text-sm font-bold text-[#38242B] block">
                      お酒を飲む必要は一切なし
                    </span>
                    <span className="text-[11px] sm:text-xs text-[#66545A]">
                      お酒を飲む環境ではないため、飲酒強要や二日酔いの心配がなく健康的に続けられます。
                    </span>
                  </div>
                </div>
              </div>

              {/* 中間CTA 1: ファーストビュー直下 */}
              <div className="pt-2">
                <a
                  href={LINE_OFFICIAL_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => {
                    e.preventDefault();
                    handleLineClick('【お仕事内容の相談】実際のお仕事内容や1回の接客について詳しく聞いてみたいです。');
                  }}
                  className="inline-flex items-center justify-center gap-2.5 bg-[#06C755] hover:bg-[#05b34c] text-white font-bold text-xs sm:text-sm px-6 py-3.5 rounded-2xl shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer w-full sm:w-auto"
                >
                  <LucideIcon name="MessageCircle" size={18} />
                  <span>LINEで仕事内容を相談する</span>
                  <LucideIcon name="ArrowRight" size={16} />
                </a>
              </div>
            </div>

            {/* Right: 実際の店舗写真（玄関・和室個室） */}
            <div className="lg:col-span-5 space-y-4">
              <div className="rounded-2xl overflow-hidden border border-[#F3E1E6] shadow-2xs bg-zinc-100 relative group">
                <img
                  src="/images/tobita_street_lanterns_1788153077449.jpg"
                  alt="飛田新地の料亭玄関と提灯の灯り"
                  className="w-full h-48 sm:h-56 object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="eager"
                />
                <div className="absolute bottom-2.5 left-2.5 bg-black/65 backdrop-blur-xs text-white text-[11px] font-bold px-3 py-1 rounded-lg">
                  料亭の玄関（座敷・上がり框でお出迎え）
                </div>
              </div>

              <div className="rounded-2xl overflow-hidden border border-[#F3E1E6] shadow-2xs bg-zinc-100 relative group">
                <img
                  src="/images/tobita_luxury_room_1788153103866.jpg"
                  alt="清潔感のある和室の個室客室"
                  className="w-full h-44 sm:h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute bottom-2.5 left-2.5 bg-black/65 backdrop-blur-xs text-white text-[11px] font-bold px-3 py-1 rounded-lg">
                  接客を行う個室（女性とお客様の2人きり・冷暖房完備）
                </div>
              </div>
            </div>
          </div>
        </section>


        {/* =========================================================
            SECTION 2: 仕事内容の全体像 (Overall Picture)
           ========================================================= */}
        <section className="bg-white rounded-3xl p-6 sm:p-9 md:p-10 border border-[#F3E1E6] shadow-sm">
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
            <span className="text-[11px] font-bold text-[#E84B78] bg-[#FFF8F9] border border-[#F3E1E6] px-3.5 py-1 rounded-full inline-block mb-2">
              全体の流れ
            </span>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-[#38242B] tracking-tight">
              仕事内容の全体像（3つの段階）
            </h2>
            <p className="text-xs sm:text-sm text-[#66545A] mt-2 leading-relaxed">
              お仕事は「接客前」「接客中」「接客後」の3つに明確に分かれています。何をするのかが最初から決まっているため、迷うことなく安心して進められます。
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Phase 1: 接客前 */}
            <div className="bg-[#FFF8F9] rounded-2xl p-5 border border-[#F3E1E6] flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-mono font-bold text-[#E84B78] bg-white px-2.5 py-0.5 rounded-full border border-[#F3E1E6]">
                    PHASE 01
                  </span>
                  <LucideIcon name="Sparkles" size={18} className="text-[#E84B78]" />
                </div>
                <h3 className="text-base font-black text-[#38242B] mb-2">
                  接客前（準備・お迎え）
                </h3>
                <p className="text-xs text-[#66545A] leading-relaxed mb-3">
                  出勤後はお衣装に着替え、身だしなみをチェック。玄関の上がり框（座敷）に座り、前を通るお客様に愛想よく手招きや笑顔でお迎えします。
                </p>
              </div>
              <div className="bg-white p-2.5 rounded-xl border border-[#F3E1E6] text-[11px] font-bold text-[#38242B]">
                担当：女性（手招き・笑顔でお迎え）＋ 仲居さん（声掛け・呼び込み）
              </div>
            </div>

            {/* Phase 2: 接客中 */}
            <div className="bg-white rounded-2xl p-5 border-2 border-[#E84B78]/40 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-mono font-bold text-white bg-[#E84B78] px-2.5 py-0.5 rounded-full">
                    PHASE 02
                  </span>
                  <LucideIcon name="HeartHandshake" size={18} className="text-[#E84B78]" />
                </div>
                <h3 className="text-base font-black text-[#38242B] mb-2">
                  接客中（約15〜20分）
                </h3>
                <p className="text-xs text-[#66545A] leading-relaxed mb-3">
                  お部屋へご案内し、女性とお客様の2人きりで過ごします。衛生準備を行い、スキンを装着して規定のサービスを提供します。
                </p>
              </div>
              <div className="bg-[#FFF8F9] p-2.5 rounded-xl border border-[#F3E1E6] text-[11px] font-bold text-[#E84B78]">
                担当：女性とお客様の2人きり（仲居さんは入室しません）
              </div>
            </div>

            {/* Phase 3: 接客後 */}
            <div className="bg-[#FFF8F9] rounded-2xl p-5 border border-[#F3E1E6] flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-mono font-bold text-[#E84B78] bg-white px-2.5 py-0.5 rounded-full border border-[#F3E1E6]">
                    PHASE 03
                  </span>
                  <LucideIcon name="Smile" size={18} className="text-[#E84B78]" />
                </div>
                <h3 className="text-base font-black text-[#38242B] mb-2">
                  接客後（お見送り・片付け）
                </h3>
                <p className="text-xs text-[#66545A] leading-relaxed mb-3">
                  時間になったら笑顔でお客様をお見送りし、飴ちゃんをお渡しします。お部屋の片付けや清掃・シーツ交換は全て仲居さんが行います。
                </p>
              </div>
              <div className="bg-white p-2.5 rounded-xl border border-[#F3E1E6] text-[11px] font-bold text-[#38242B]">
                片付け・清掃：仲居さんが全担当（女性は不要）
              </div>
            </div>
          </div>
        </section>


        {/* =========================================================
            SECTION 3: 女性が担当する仕事 (Cast's 7 Duties)
           ========================================================= */}
        <section className="bg-white rounded-3xl p-6 sm:p-9 md:p-10 border border-[#F3E1E6] shadow-sm">
          <div className="max-w-3xl mb-8">
            <span className="text-[11px] font-bold text-[#E84B78] bg-[#FFF8F9] border border-[#F3E1E6] px-3.5 py-1 rounded-full inline-block mb-2">
              業務の明確化
            </span>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-[#38242B] tracking-tight">
              女性（あなた）が担当するお仕事
            </h2>
            <p className="text-xs sm:text-sm text-[#66545A] mt-2 leading-relaxed">
              あなたが実際に行う業務は以下の7項目に整理されています。余計なお茶出しやお菓子出しなどの雑用業務は一切ありません。
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* 1 */}
            <div className="p-4 sm:p-5 rounded-2xl bg-[#FFF8F9] border border-[#F3E1E6] flex items-start gap-3.5">
              <span className="w-7 h-7 rounded-full bg-[#E84B78] text-white flex items-center justify-center text-xs font-black shrink-0 mt-0.5">
                1
              </span>
              <div>
                <h3 className="font-bold text-sm sm:text-base text-[#38242B] mb-1">
                  玄関で愛想よく手招き・お客様をお迎えする
                </h3>
                <p className="text-xs text-[#66545A] leading-relaxed">
                  玄関の上がり框（座敷）に座り、前を通るお客様に愛想よく手招きをし、笑顔で手を振ったり会釈をして親しみやすい雰囲気を作ります。声出しや呼び込みは不要です。
                </p>
              </div>
            </div>

            {/* 2 */}
            <div className="p-4 sm:p-5 rounded-2xl bg-[#FFF8F9] border border-[#F3E1E6] flex items-start gap-3.5">
              <span className="w-7 h-7 rounded-full bg-[#E84B78] text-white flex items-center justify-center text-xs font-black shrink-0 mt-0.5">
                2
              </span>
              <div>
                <h3 className="font-bold text-sm sm:text-base text-[#38242B] mb-1">
                  接客前の準備
                </h3>
                <p className="text-xs text-[#66545A] leading-relaxed">
                  入店されたお客様をお部屋へご案内し、手洗いやうがいなどの基本マナーを整えていただきます。
                </p>
              </div>
            </div>

            {/* 3 */}
            <div className="p-4 sm:p-5 rounded-2xl bg-[#FFF8F9] border border-[#F3E1E6] flex items-start gap-3.5">
              <span className="w-7 h-7 rounded-full bg-[#E84B78] text-white flex items-center justify-center text-xs font-black shrink-0 mt-0.5">
                3
              </span>
              <div>
                <h3 className="font-bold text-sm sm:text-base text-[#38242B] mb-1">
                  衛生手順に沿った準備
                </h3>
                <p className="text-xs text-[#66545A] leading-relaxed">
                  清潔なおしぼりや衛生用品を用意し、定められた衛生手順に従って丁寧に準備を行います。
                </p>
              </div>
            </div>

            {/* 4 (スキン装着) */}
            <div className="p-4 sm:p-5 rounded-2xl bg-[#FFF8F9] border-2 border-[#E84B78]/40 flex items-start gap-3.5 shadow-2xs">
              <span className="w-7 h-7 rounded-full bg-[#E84B78] text-white flex items-center justify-center text-xs font-black shrink-0 mt-0.5">
                4
              </span>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-bold text-sm sm:text-base text-[#38242B]">
                    お客様にスキンを装着する
                  </h3>
                  <span className="text-[10px] bg-[#E84B78] text-white font-bold px-2 py-0.5 rounded-full">
                    安全管理
                  </span>
                </div>
                <p className="text-xs text-[#66545A] leading-relaxed">
                  衛生管理と安全を守るため、お客様任せにせず必ず正しくスキンを装着します。
                </p>
              </div>
            </div>

            {/* 5 */}
            <div className="p-4 sm:p-5 rounded-2xl bg-[#FFF8F9] border border-[#F3E1E6] flex items-start gap-3.5">
              <span className="w-7 h-7 rounded-full bg-[#E84B78] text-white flex items-center justify-center text-xs font-black shrink-0 mt-0.5">
                5
              </span>
              <div>
                <h3 className="font-bold text-sm sm:text-base text-[#38242B] mb-1">
                  お部屋でお客様と2人で接客する
                </h3>
                <p className="text-xs text-[#66545A] leading-relaxed">
                  約15〜20分間、お客様と和やかな時間を過ごします。接客中、仲居さんや第三者がお部屋に入ることはありません。
                </p>
              </div>
            </div>

            {/* 6 */}
            <div className="p-4 sm:p-5 rounded-2xl bg-[#FFF8F9] border border-[#F3E1E6] flex items-start gap-3.5">
              <span className="w-7 h-7 rounded-full bg-[#E84B78] text-white flex items-center justify-center text-xs font-black shrink-0 mt-0.5">
                6
              </span>
              <div>
                <h3 className="font-bold text-sm sm:text-base text-[#38242B] mb-1">
                  接客終了後のお見送り
                </h3>
                <p className="text-xs text-[#66545A] leading-relaxed">
                  時間が終了したら身だしなみを整え、玄関先まで笑顔でお客様をお見送りします。
                </p>
              </div>
            </div>

            {/* 7 */}
            <div className="p-4 sm:p-5 rounded-2xl bg-[#FFF8F9] border border-[#F3E1E6] flex items-start gap-3.5 md:col-span-2">
              <span className="w-7 h-7 rounded-full bg-[#E84B78] text-white flex items-center justify-center text-xs font-black shrink-0 mt-0.5">
                7
              </span>
              <div>
                <h3 className="font-bold text-sm sm:text-base text-[#38242B] mb-1">
                  お客様に飴ちゃんをお渡しする
                </h3>
                <p className="text-xs text-[#66545A] leading-relaxed">
                  最後にお客様へ「ありがとうございました」の感謝を込めて飴ちゃんをお渡しします。飛田新地の伝統的な温かいおもてなしの習慣です。
                </p>
              </div>
            </div>
          </div>

          {/* 明確な注意喚起ボックス */}
          <div className="mt-6 p-4 rounded-2xl bg-[#FFF0F4] border border-[#F5A2B8]/40 flex items-center gap-3">
            <LucideIcon name="AlertCircle" size={20} className="text-[#E84B78] shrink-0" />
            <p className="text-xs sm:text-[13px] text-[#38242B] font-bold">
              ※お茶出し・お菓子出しなどの業務は一切行いません。お客様へのおもてなしに専念していただけます。
            </p>
          </div>
        </section>


        {/* =========================================================
            SECTION 4: 6つのステップで見る接客の流れ (Step-by-Step Flow)
           ========================================================= */}
        <section className="bg-white rounded-3xl p-6 sm:p-9 md:p-10 border border-[#F3E1E6] shadow-sm">
          <div className="max-w-3xl mb-8">
            <span className="text-[11px] font-bold text-[#E84B78] bg-[#FFF8F9] border border-[#F3E1E6] px-3.5 py-1 rounded-full inline-block mb-2">
              ステップ解説
            </span>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-[#38242B] tracking-tight">
              6つのステップで見る接客の流れ
            </h2>
            <p className="text-xs sm:text-sm text-[#66545A] mt-2 leading-relaxed">
              お客様が玄関にいらしてからお見送りを終えるまでの詳細な手順です。
            </p>
          </div>

          <div className="space-y-4">
            {/* STEP 1 */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4.5 sm:p-5 rounded-2xl bg-[#FFF8F9] border border-[#F3E1E6]">
              <div className="w-11 h-11 rounded-2xl bg-[#E84B78] text-white font-mono font-black text-sm flex items-center justify-center shrink-0 shadow-2xs">
                01
              </div>
              <div className="flex-1 space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-sm sm:text-base text-[#38242B]">
                    STEP 1：玄関でお迎え・手招き
                  </h3>
                  <span className="text-[10px] font-bold text-[#E84B78] bg-white border border-[#F3E1E6] px-2 py-0.5 rounded-full">
                    声出し不要
                  </span>
                </div>
                <p className="text-xs sm:text-[13px] text-[#66545A] leading-relaxed">
                  ライトアップされた座敷（上がり框）に座り、前を通るお客様に愛想よく手招きをしたり、笑顔で手を振って親しみやすい雰囲気を作ります。通りへの声掛けや客引きは横にいる仲居さんが全て担当します。
                </p>
              </div>
            </div>

            {/* STEP 2 */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4.5 sm:p-5 rounded-2xl bg-white border border-[#F3E1E6] shadow-2xs">
              <div className="w-11 h-11 rounded-2xl bg-[#E84B78] text-white font-mono font-black text-sm flex items-center justify-center shrink-0 shadow-2xs">
                02
              </div>
              <div className="flex-1 space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-sm sm:text-base text-[#38242B]">
                    STEP 2：接客前の準備
                  </h3>
                  <span className="text-[10px] font-bold text-[#38242B] bg-[#FFF8F9] border border-[#F3E1E6] px-2 py-0.5 rounded-full">
                    完全個室
                  </span>
                </div>
                <p className="text-xs sm:text-[13px] text-[#66545A] leading-relaxed">
                  入店されたお客様を個室へご案内。冷暖房の効いた清潔なお部屋で、手洗いやうがいなどの基本準備を行っていただきます。
                </p>
              </div>
            </div>

            {/* STEP 3 */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4.5 sm:p-5 rounded-2xl bg-[#FFF8F9] border border-[#F3E1E6]">
              <div className="w-11 h-11 rounded-2xl bg-[#E84B78] text-white font-mono font-black text-sm flex items-center justify-center shrink-0 shadow-2xs">
                03
              </div>
              <div className="flex-1 space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-sm sm:text-base text-[#38242B]">
                    STEP 3：衛生面の準備
                  </h3>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                    衛生徹底
                  </span>
                </div>
                <p className="text-xs sm:text-[13px] text-[#66545A] leading-relaxed">
                  清潔なおしぼりを渡し、衛生管理ルールに沿った準備を整えます。お互いに気持ちよく過ごせるよう配慮された備品が揃っています。
                </p>
              </div>
            </div>

            {/* STEP 4 */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4.5 sm:p-5 rounded-2xl bg-white border-2 border-[#E84B78]/40 shadow-xs">
              <div className="w-11 h-11 rounded-2xl bg-[#E84B78] text-white font-mono font-black text-sm flex items-center justify-center shrink-0 shadow-2xs">
                04
              </div>
              <div className="flex-1 space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-sm sm:text-base text-[#38242B]">
                    STEP 4：スキンの装着
                  </h3>
                  <span className="text-[10px] font-bold text-white bg-[#E84B78] px-2 py-0.5 rounded-full">
                    装着徹底
                  </span>
                </div>
                <p className="text-xs sm:text-[13px] text-[#66545A] leading-relaxed">
                  安全と衛生管理のため、お客様任せにせず必ず正しくスキンを装着します。確実な安全性を保ちます。
                </p>
              </div>
            </div>

            {/* STEP 5 */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4.5 sm:p-5 rounded-2xl bg-[#FFF8F9] border border-[#F3E1E6]">
              <div className="w-11 h-11 rounded-2xl bg-[#E84B78] text-white font-mono font-black text-sm flex items-center justify-center shrink-0 shadow-2xs">
                05
              </div>
              <div className="flex-1 space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-sm sm:text-base text-[#38242B]">
                    STEP 5：お部屋で接客（女性とお客様の2人きり）
                  </h3>
                  <span className="text-[10px] font-bold text-[#38242B] bg-white border border-[#F3E1E6] px-2 py-0.5 rounded-full">
                    約15〜20分
                  </span>
                </div>
                <p className="text-xs sm:text-[13px] text-[#66545A] leading-relaxed">
                  和やかな世間話を交えながらリラックスした時間を過ごします。仲居さんはお部屋に入りません。約15〜20分で内線やタイマーにより時間終了が知らされます。
                </p>
              </div>
            </div>

            {/* STEP 6 */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4.5 sm:p-5 rounded-2xl bg-white border border-[#F3E1E6] shadow-2xs">
              <div className="w-11 h-11 rounded-2xl bg-[#E84B78] text-white font-mono font-black text-sm flex items-center justify-center shrink-0 shadow-2xs">
                06
              </div>
              <div className="flex-1 space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-sm sm:text-base text-[#38242B]">
                    STEP 6：お見送り・飴ちゃんお渡し（片付けは仲居さん）
                  </h3>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                    清掃は仲居さん
                  </span>
                </div>
                <p className="text-xs sm:text-[13px] text-[#66545A] leading-relaxed">
                  お客様を笑顔でお見送りし、飴ちゃんをお渡しします。お部屋の片付け・換気・清掃・シーツ交換は全て仲居さんが行うため、女性は身だしなみを整えて次の待機に入ります。
                </p>
              </div>
            </div>
          </div>

          {/* 中間CTA 2: ステップ直下 */}
          <div className="mt-8 pt-6 border-t border-[#F3E1E6] text-center">
            <p className="text-xs text-[#66545A] mb-3">
              接客の流れや具体的な手順について疑問があれば、何でもLINEでお尋ねください。
            </p>
            <a
              href={LINE_OFFICIAL_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => {
                e.preventDefault();
                handleLineClick('【未経験からの質問】接客の流れについて未経験なので質問してみたいです。');
              }}
              className="inline-flex items-center justify-center gap-2 bg-[#06C755] hover:bg-[#05b34c] text-white font-bold text-xs sm:text-sm px-6 py-3.5 rounded-2xl shadow-xs transition-colors cursor-pointer"
            >
              <LucideIcon name="MessageCircle" size={17} />
              <span>未経験について質問する</span>
              <LucideIcon name="ChevronRight" size={15} />
            </a>
          </div>
        </section>


        {/* =========================================================
            SECTION 5: 仲居さんが担当する仕事 (Nakai-san's Distinct Role)
           ========================================================= */}
        <section className="bg-white rounded-3xl p-6 sm:p-9 md:p-10 border border-[#F3E1E6] shadow-sm">
          <div className="max-w-3xl mb-8">
            <span className="text-[11px] font-bold text-zinc-600 bg-zinc-100 border border-zinc-200 px-3.5 py-1 rounded-full inline-block mb-2">
              頼れるサポート役
            </span>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-[#38242B] tracking-tight">
              仲居さん（おばちゃん）が担当するお仕事
            </h2>
            <p className="text-xs sm:text-sm text-[#66545A] mt-2 leading-relaxed">
              飛田新地の仲居さんは、女性が安心して働けるよう支える大切なパートナーです。女性が苦手な呼び込みや片付けをすべて引き受けてくれます。
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* 1. 呼び込み・声掛け */}
            <div className="bg-[#FFF8F9] rounded-2xl p-5 border border-[#F3E1E6] flex flex-col justify-between">
              <div>
                <div className="w-9 h-9 rounded-xl bg-white text-[#E84B78] border border-[#F3E1E6] flex items-center justify-center mb-3">
                  <LucideIcon name="Megaphone" size={18} />
                </div>
                <h3 className="font-bold text-sm sm:text-base text-[#38242B] mb-2">
                  1. 通りへの呼び込み・声掛け
                </h3>
                <p className="text-xs text-[#66545A] leading-relaxed">
                  「お兄さん寄ってって〜」などの通りを歩くお客様への呼び込みやお声掛けは、すべて仲居さんが担当します。
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-[#F3E1E6] text-[11px] text-[#E84B78] font-bold">
                女性は声出し・呼び込みを一切しません
              </div>
            </div>

            {/* 2. 料金システム案内・受付 */}
            <div className="bg-[#FFF8F9] rounded-2xl p-5 border border-[#F3E1E6] flex flex-col justify-between">
              <div>
                <div className="w-9 h-9 rounded-xl bg-white text-[#E84B78] border border-[#F3E1E6] flex items-center justify-center mb-3">
                  <LucideIcon name="Coins" size={18} />
                </div>
                <h3 className="font-bold text-sm sm:text-base text-[#38242B] mb-2">
                  2. 料金案内・入店受付
                </h3>
                <p className="text-xs text-[#66545A] leading-relaxed">
                  料金システムのご案内やコース説明、入店受付の対応は仲居さんが行います。女性が金銭交渉をすることはありません。
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-[#F3E1E6] text-[11px] text-[#E84B78] font-bold">
                料金交渉や受付は店舗にお任せ
              </div>
            </div>

            {/* 3. 片付け・清掃 */}
            <div className="bg-[#FFF8F9] rounded-2xl p-5 border border-[#F3E1E6] flex flex-col justify-between">
              <div>
                <div className="w-9 h-9 rounded-xl bg-white text-[#E84B78] border border-[#F3E1E6] flex items-center justify-center mb-3">
                  <LucideIcon name="Sparkles" size={18} />
                </div>
                <h3 className="font-bold text-sm sm:text-base text-[#38242B] mb-2">
                  3. 接客終了後の片付け・清掃
                </h3>
                <p className="text-xs text-[#66545A] leading-relaxed">
                  接客終了後のお部屋の清掃、使用済みリネンの交換、除菌・消毒作業は仲居さんが速やかに行います。
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-[#F3E1E6] text-[11px] text-[#E84B78] font-bold">
                お部屋のリセットは店舗が担当
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 rounded-2xl bg-zinc-50 border border-zinc-200 text-xs text-[#66545A] flex items-center gap-3">
            <LucideIcon name="Clock" size={18} className="text-zinc-600 shrink-0" />
            <span>
              <strong>時間管理・安全見守り：</strong> 接客時間が長引かないよう内線等で時間を管理し、万が一の際も常駐して女性を保護します。
            </span>
          </div>
        </section>


        {/* =========================================================
            SECTION 6: 未経験者向けの説明 (6 Beginner Questions)
           ========================================================= */}
        <section className="bg-white rounded-3xl p-6 sm:p-9 md:p-10 border border-[#F3E1E6] shadow-sm">
          <div className="max-w-3xl mb-8">
            <span className="text-[11px] font-bold text-[#E84B78] bg-[#FFF8F9] border border-[#F3E1E6] px-3.5 py-1 rounded-full inline-block mb-2">
              不安解消
            </span>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-[#38242B] tracking-tight">
              未経験者の方が気になる6つのこと
            </h2>
            <p className="text-xs sm:text-sm text-[#66545A] mt-2 leading-relaxed">
              「自分にもできるかな…」と不安を感じている方へ。実際の現場の様子を具体的にお答えします。
            </p>
          </div>

          <div className="space-y-3.5">
            {/* 1 */}
            <div className="p-4 sm:p-5 rounded-2xl bg-[#FFF8F9] border border-[#F3E1E6] space-y-1.5">
              <h3 className="text-xs sm:text-sm font-bold text-[#38242B] flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-[#E84B78] text-white text-[10px] font-black flex items-center justify-center shrink-0">1</span>
                <span>接客経験が全くなくても大丈夫？</span>
              </h3>
              <p className="text-xs sm:text-[13px] text-[#66545A] leading-relaxed pl-7">
                在籍している女性の約9割が完全未経験からスタートしています。高度な接客スキルや話術は必要なく、笑顔で丁寧に挨拶ができれば十分に活躍できます。
              </p>
            </div>

            {/* 2 */}
            <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#F3E1E6] space-y-1.5 shadow-2xs">
              <h3 className="text-xs sm:text-sm font-bold text-[#38242B] flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-[#E84B78] text-white text-[10px] font-black flex items-center justify-center shrink-0">2</span>
                <span>人見知りで会話が苦手でも務まる？</span>
              </h3>
              <p className="text-xs sm:text-[13px] text-[#66545A] leading-relaxed pl-7">
                無理に面白い話をしたり盛り上げる必要はありません。お客様の話に耳を傾けて「そうなんですね」と相槌を打つだけで、落ち着いた居心地の良い雰囲気として好まれます。
              </p>
            </div>

            {/* 3 */}
            <div className="p-4 sm:p-5 rounded-2xl bg-[#FFF8F9] border border-[#F3E1E6] space-y-1.5">
              <h3 className="text-xs sm:text-sm font-bold text-[#38242B] flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-[#E84B78] text-white text-[10px] font-black flex items-center justify-center shrink-0">3</span>
                <span>仕事の流れは事前に詳しく教えてもらえる？</span>
              </h3>
              <p className="text-xs sm:text-[13px] text-[#66545A] leading-relaxed pl-7">
                初日出勤時に、女性スタッフや仲居さんがお部屋の設備、衛生準備の手順、接客のポイントをマンツーマンで分かりやすくお教えします。疑問が残ったまま本番を迎えることはありません。
              </p>
            </div>

            {/* 4 */}
            <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#F3E1E6] space-y-1.5 shadow-2xs">
              <h3 className="text-xs sm:text-sm font-bold text-[#38242B] flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-[#E84B78] text-white text-[10px] font-black flex items-center justify-center shrink-0">4</span>
                <span>接客中に困ったことや嫌な要求があったら？</span>
              </h3>
              <p className="text-xs sm:text-[13px] text-[#66545A] leading-relaxed pl-7">
                規約外の要求や嫌な行為はきっぱりとお断りして問題ありません。お部屋には内線電話と呼び出しブザーが設置されており、押せばすぐに男性スタッフや仲居さんが駆けつけて対応します。
              </p>
            </div>

            {/* 5 */}
            <div className="p-4 sm:p-5 rounded-2xl bg-[#FFF8F9] border border-[#F3E1E6] space-y-1.5">
              <h3 className="text-xs sm:text-sm font-bold text-[#38242B] flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-[#E84B78] text-white text-[10px] font-black flex items-center justify-center shrink-0">5</span>
                <span>待機中はずっと正座していないといけない？</span>
              </h3>
              <p className="text-xs sm:text-[13px] text-[#66545A] leading-relaxed pl-7">
                正座の義務はありません。柔らかい座布団の上で足を崩してリラックスして座っていただけます。こまめな休憩交代もあるため、無理なく過ごせます。
              </p>
            </div>

            {/* 6 */}
            <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#F3E1E6] space-y-1.5 shadow-2xs">
              <h3 className="text-xs sm:text-sm font-bold text-[#38242B] flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-[#E84B78] text-white text-[10px] font-black flex items-center justify-center shrink-0">6</span>
                <span>お客様との連絡先（LINE等）の交換はある？</span>
              </h3>
              <p className="text-xs sm:text-[13px] text-[#66545A] leading-relaxed pl-7">
                組合の規約により、お客様との個人連絡先交換は厳格に禁止されています。営業連絡やアフター・同伴などのプライベートな付き合いは一切発生しません。
              </p>
            </div>
          </div>
        </section>


        {/* =========================================================
            SECTION 7: 衛生面について (Hygiene Management)
           ========================================================= */}
        <section className="bg-white rounded-3xl p-6 sm:p-9 md:p-10 border border-[#F3E1E6] shadow-sm">
          <div className="max-w-3xl mb-8">
            <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3.5 py-1 rounded-full inline-block mb-2">
              安心・安全
            </span>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-[#38242B] tracking-tight">
              衛生面についての取り組み
            </h2>
            <p className="text-xs sm:text-sm text-[#66545A] mt-2 leading-relaxed">
              女性が身体を守り、安心して働けるよう、適切な衛生用品の完備と徹底した安全ルールを定めています。
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-[#FFF8F9] border border-[#F3E1E6]">
              <div className="flex items-center gap-2 mb-2">
                <LucideIcon name="ShieldCheck" size={18} className="text-[#E84B78]" />
                <h3 className="font-bold text-sm sm:text-base text-[#38242B]">
                  スキン装着の徹底
                </h3>
              </div>
              <p className="text-xs sm:text-[13px] text-[#66545A] leading-relaxed">
                感染症予防および安全のため、お客様任せにせず必ず正しくスキンを装着します。未装着や不適切な使用は規約で厳重に禁止されています。
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#FFF8F9] border border-[#F3E1E6]">
              <div className="flex items-center gap-2 mb-2">
                <LucideIcon name="Sparkles" size={18} className="text-[#E84B78]" />
                <h3 className="font-bold text-sm sm:text-base text-[#38242B]">
                  清潔なおしぼり・うがい薬・衛生備品の完備
                </h3>
              </div>
              <p className="text-xs sm:text-[13px] text-[#66545A] leading-relaxed">
                接客前後に使用する清潔なおしぼり、うがい薬、適切な除菌用品を各個室に完備。常に衛生的で清潔な環境を維持しています。
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#FFF8F9] border border-[#F3E1E6]">
              <div className="flex items-center gap-2 mb-2">
                <LucideIcon name="RefreshCw" size={18} className="text-[#E84B78]" />
                <h3 className="font-bold text-sm sm:text-base text-[#38242B]">
                  1回ごとのリネン交換と室内換気
                </h3>
              </div>
              <p className="text-xs sm:text-[13px] text-[#66545A] leading-relaxed">
                接客終了後は、仲居さんがシーツやタオル類を毎回必ず取り替えます。十分な換気と清掃を行い、次のお客様をお迎えします。
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#FFF8F9] border border-[#F3E1E6]">
              <div className="flex items-center gap-2 mb-2">
                <LucideIcon name="Heart" size={18} className="text-[#E84B78]" />
                <h3 className="font-bold text-sm sm:text-base text-[#38242B]">
                  身体に負担をかけない安全な衛生管理
                </h3>
              </div>
              <p className="text-xs sm:text-[13px] text-[#66545A] leading-relaxed">
                デリケートゾーンを傷めるような刺激の強い薬剤等の使用を避け、適切な衛生マナーとお肌に優しい衛生管理を徹底しています。
              </p>
            </div>
          </div>
        </section>


        {/* =========================================================
            SECTION 8: プライバシー・身バレ対策 (Privacy & Identity Protection)
           ========================================================= */}
        <section className="bg-white rounded-3xl p-6 sm:p-9 md:p-10 border border-[#F3E1E6] shadow-sm">
          <div className="max-w-3xl mb-8">
            <span className="text-[11px] font-bold text-indigo-600 bg-indigo-50 border border-indigo-100 px-3.5 py-1 rounded-full inline-block mb-2">
              身バレ防止
            </span>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-[#38242B] tracking-tight">
              プライバシー・身バレ対策について
            </h2>
            <p className="text-xs sm:text-sm text-[#66545A] mt-2 leading-relaxed">
              家族や知人、本業の会社に知られたくない女性のために、飛田新地ならではの厳重なプライバシー保護体制を整えています。
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-[#FFF8F9] border border-[#F3E1E6]">
              <div className="flex items-center gap-2 mb-2">
                <LucideIcon name="EyeOff" size={18} className="text-indigo-600" />
                <h3 className="font-bold text-sm sm:text-base text-[#38242B]">
                  インターネットへの写真掲載は一切なし
                </h3>
              </div>
              <p className="text-xs sm:text-[13px] text-[#66545A] leading-relaxed">
                WEBサイトやSNS、求人媒体にお顔やプロフィールの写真を掲載することはありません。ネット上に自分の写真が残る心配がありません。
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#FFF8F9] border border-[#F3E1E6]">
              <div className="flex items-center gap-2 mb-2">
                <LucideIcon name="CameraOff" size={18} className="text-indigo-600" />
                <h3 className="font-bold text-sm sm:text-base text-[#38242B]">
                  街全体の撮影禁止ルール
                </h3>
              </div>
              <p className="text-xs sm:text-[13px] text-[#66545A] leading-relaxed">
                飛田新地は組合の厳格な規約により、エリア内でのスマートフォン・カメラによる写真や動画の撮影が全面禁止されています。街頭での無断撮影を防ぐ見回り体制もあります。
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#FFF8F9] border border-[#F3E1E6]">
              <div className="flex items-center gap-2 mb-2">
                <LucideIcon name="FileText" size={18} className="text-indigo-600" />
                <h3 className="font-bold text-sm sm:text-base text-[#38242B]">
                  税務・確定申告の普通徴収アドバイス
                </h3>
              </div>
              <p className="text-xs sm:text-[13px] text-[#66545A] leading-relaxed">
                昼職（会社員やOL）をされている方には、住民税の通知が会社に届かない「普通徴収（自分で納付）」の手続き方法など、具体的な税務対策をご案内しています。
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#FFF8F9] border border-[#F3E1E6]">
              <div className="flex items-center gap-2 mb-2">
                <LucideIcon name="Lock" size={18} className="text-indigo-600" />
                <h3 className="font-bold text-sm sm:text-base text-[#38242B]">
                  個人情報の厳重管理・源氏名での勤務
                </h3>
              </div>
              <p className="text-xs sm:text-[13px] text-[#66545A] leading-relaxed">
                勤務中は全て源氏名（お仕事用のお名前）を使用します。ご提出いただいた身分証等の個人情報は施錠管理され、外部に漏洩することはありません。
              </p>
            </div>
          </div>

          <div className="mt-4 p-3.5 bg-zinc-50 rounded-xl border border-zinc-200 text-[11px] text-[#66545A]">
            ※「100%絶対にバレない」といった過度な誇大表現はいたしません。通勤経路やSNSの取り扱いなど、現実的で確実な身バレ防止策を個別にお伝えしています。
          </div>
        </section>


        {/* =========================================================
            SECTION 9: よくある質問 (FAQ Accordion - 7 Questions)
           ========================================================= */}
        <section className="bg-white rounded-3xl p-6 sm:p-9 md:p-10 border border-[#F3E1E6] shadow-sm">
          <div className="max-w-3xl mb-8">
            <span className="text-[11px] font-bold text-[#E84B78] bg-[#FFF8F9] border border-[#F3E1E6] px-3.5 py-1 rounded-full inline-block mb-2">
              疑問を解決
            </span>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-[#38242B] tracking-tight">
              お仕事内容に関するよくある質問
            </h2>
            <p className="text-xs sm:text-sm text-[#66545A] mt-2 leading-relaxed">
              仕事内容について特に多く寄せられる7つの質問にお答えします。タップして詳細をご確認ください。
            </p>
          </div>

          <div className="space-y-3">
            {jobFaqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-[#F3E1E6] overflow-hidden bg-[#FFF8F9]/50 transition-colors"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full text-left p-4 sm:p-4.5 flex items-center justify-between gap-3 cursor-pointer hover:bg-[#FFF8F9]"
                  >
                    <span className="font-bold text-xs sm:text-sm text-[#38242B] flex items-start gap-2.5">
                      <span className="text-[#E84B78] font-black">Q{idx + 1}.</span>
                      <span>{faq.q}</span>
                    </span>
                    <LucideIcon
                      name={isOpen ? 'ChevronUp' : 'ChevronDown'}
                      size={16}
                      className="text-[#E84B78] shrink-0"
                    />
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="px-4 pb-4 pt-1 sm:px-4.5 sm:pb-4.5 text-xs sm:text-[13px] text-[#66545A] leading-relaxed border-t border-[#F3E1E6] bg-white flex items-start gap-2.5"
                      >
                        <span className="text-emerald-600 font-black shrink-0 mt-0.5">A.</span>
                        <div className="flex-1">{faq.a}</div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </section>


        {/* =========================================================
            SECTION 10: 最終応募・相談CTA (Final Consultation Buttons)
           ========================================================= */}
        <section className="bg-white rounded-3xl p-6 sm:p-10 md:p-12 border-2 border-[#E84B78]/40 shadow-sm text-center relative overflow-hidden">
          <div className="max-w-2xl mx-auto space-y-5">
            <span className="inline-block text-xs font-bold text-[#E84B78] bg-[#FFF8F9] px-4 py-1.5 rounded-full border border-[#F3E1E6]">
              LINE無料相談・ご質問窓口
            </span>

            <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-[#38242B]">
              まずは気軽にお話ししてみませんか？
            </h2>

            <p className="text-xs sm:text-sm text-[#66545A] leading-relaxed">
              「仕事内容をもう少し詳しく知りたい」「自分に合う時間帯を相談したい」「面接や体験入店について聞きたい」など、些細な疑問でも大丈夫です。女性スタッフが親身に対応いたします。
            </p>

            {/* 3つのLINE相談ボタン */}
            <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center items-stretch">
              <a
                href={LINE_OFFICIAL_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => {
                  e.preventDefault();
                  handleLineClick('【仕事内容の相談】LINEで仕事内容について相談したいです。');
                }}
                className="inline-flex items-center justify-center gap-2 bg-[#06C755] hover:bg-[#05b34c] text-white font-bold text-xs sm:text-sm px-5 py-3.5 rounded-2xl shadow-sm hover:shadow-md transition-all cursor-pointer"
              >
                <LucideIcon name="MessageCircle" size={18} />
                <span>LINEで仕事内容を相談する</span>
              </a>

              <a
                href={LINE_OFFICIAL_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => {
                  e.preventDefault();
                  handleLineClick('【未経験についての質問】未経験なので気になる点を質問したいです。');
                }}
                className="inline-flex items-center justify-center gap-2 bg-[#06C755] hover:bg-[#05b34c] text-white font-bold text-xs sm:text-sm px-5 py-3.5 rounded-2xl shadow-sm hover:shadow-md transition-all cursor-pointer"
              >
                <LucideIcon name="HelpCircle" size={18} />
                <span>未経験について質問する</span>
              </a>

              <a
                href={LINE_OFFICIAL_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => {
                  e.preventDefault();
                  handleLineClick('【働き方の相談】自分に合った働き方について詳しく聞きたいです。');
                }}
                className="inline-flex items-center justify-center gap-2 bg-[#06C755] hover:bg-[#05b34c] text-white font-bold text-xs sm:text-sm px-5 py-3.5 rounded-2xl shadow-sm hover:shadow-md transition-all cursor-pointer"
              >
                <LucideIcon name="Calendar" size={18} />
                <span>働き方について詳しく聞く</span>
              </a>
            </div>

            <div className="pt-2 text-[11px] sm:text-xs text-zinc-500 space-y-1">
              <p>24時間受付中 / 相談無料 / 無理な勧誘・引き止めは一切ありません</p>
              <p>※匿名でのご相談OK・友だち追加後すぐにメッセージいただけます</p>
            </div>
          </div>
        </section>

        {/* 4つの安心バッジ */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 sm:gap-4 text-center">
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
            <div className="text-[10px] text-zinc-500 mt-1">WEB写真非公開・普通徴収対応</div>
          </div>

          <div className="bg-white rounded-2xl p-4 border border-[#F3E1E6] shadow-2xs">
            <div className="w-8 h-8 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center mx-auto mb-2">
              <LucideIcon name="Smile" size={18} />
            </div>
            <div className="font-bold text-xs text-[#38242B]">無理な勧誘・引き止めゼロ</div>
            <div className="text-[10px] text-zinc-500 mt-1">体験入店のみOK・全額即日日払い</div>
          </div>
        </div>

      </div>
    </div>
  );
}
