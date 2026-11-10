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
  onNavigateTopic,
  onNavigateBlog,
  onNavigateFaq,
  onCtaclick,
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
      q: 'お茶やお菓子を自分で淹れたり運んだりする必要はありますか？',
      a: 'いいえ、お茶出しやお菓子出しの業務はありません。お客様との和やかな接客に集中できるよう、業務内容は必要最小限に整理されています。'
    },
    {
      q: '玄関に座っているとき、自分から声をかけないと怒られますか？',
      a: 'いいえ、自分から声をかける必要は一切ありません。通りへの呼び込みや声掛けはすべてお隣の仲居さんが行うため、笑顔で手を振ったり会釈するだけで大丈夫です。'
    },
    {
      q: '待機中はずっと正座していないといけませんか？',
      a: '正座の必要はありません。座布団の上で足を楽にして崩して座っていただけます。交代制でこまめに休憩も挟むため、足腰への負担を軽減できます。'
    },
    {
      q: 'お客様との連絡先交換（LINEなど）は本当にしなくていいですか？',
      a: 'はい、交換は一切不要です。むしろ組合規約でプライベートな連絡先交換は厳しく禁止されており、店外での営業連絡や同伴・アフターも一切ありません。'
    },
    {
      q: '途中で気分が悪くなったり疲れたりした場合は休めますか？',
      a: 'もちろん可能です。体調が優れないときは無理をせず、仲居さんや女性スタッフに伝えてすぐに冷暖房完備の控室で休んでいただけます。'
    }
  ];

  return (
    <div className="bg-[#FFF8F9] min-h-screen text-[#66545A] pb-20 pt-4 sm:pt-6 font-sans antialiased">
      
      {/* 1. パンくずリスト */}
      <div className="max-w-[1140px] mx-auto px-4 sm:px-6 mb-4">
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

      <div className="max-w-[1100px] mx-auto px-4 sm:px-6 space-y-10 sm:space-y-12">
        
        {/* =========================================================
            2. ファーストビュー
           ========================================================= */}
        <section className="bg-white rounded-3xl p-6 sm:p-8 md:p-10 border border-[#F3E1E6] shadow-sm relative overflow-hidden">
          {/* Top Label */}
          <div className="inline-flex items-center gap-1.5 bg-[#FFF8F9] text-[#E84B78] text-[12px] font-bold px-3.5 py-1 rounded-full mb-4 border border-[#F3E1E6]">
            <LucideIcon name="HeartHandshake" size={14} className="text-[#E84B78]" />
            <span>お仕事内容</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
            {/* Left: Main Copy & Sub Copy */}
            <div className="lg:col-span-7 space-y-4">
              <h1 className="font-display font-black text-2xl sm:text-3xl md:text-4xl text-[#38242B] leading-snug tracking-tight">
                初めてだからこそ、知っておきたい。<br />
                <span className="text-[#E84B78]">実際のお仕事内容</span>を分かりやすくご紹介します。
              </h1>

              <p className="text-xs sm:text-sm md:text-base text-[#66545A] leading-relaxed">
                出勤してから接客が終わるまで、どんなことをするのか。初めての方にもイメージできるよう、実際の流れを順番にご紹介します。
              </p>

              {/* 3つの特徴（確認できているもの） */}
              <div className="pt-2 space-y-2.5">
                <div className="flex items-start gap-2.5 bg-[#FFF8F9] p-3 rounded-2xl border border-[#F3E1E6]">
                  <span className="w-5 h-5 rounded-full bg-[#E84B78] text-white flex items-center justify-center text-[10px] font-black shrink-0 mt-0.5">
                    ✓
                  </span>
                  <div>
                    <span className="text-xs sm:text-sm font-bold text-[#38242B] block">
                      玄関では座って笑顔で手を振るだけ
                    </span>
                    <span className="text-[11px] sm:text-xs text-[#66545A]">
                      通りを歩くお客様への声掛けや呼び込みは、お隣の仲居さん（おばちゃん）が担当します。
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 bg-[#FFF8F9] p-3 rounded-2xl border border-[#F3E1E6]">
                  <span className="w-5 h-5 rounded-full bg-[#E84B78] text-white flex items-center justify-center text-[10px] font-black shrink-0 mt-0.5">
                    ✓
                  </span>
                  <div>
                    <span className="text-xs sm:text-sm font-bold text-[#38242B] block">
                      お酒を飲む必要は一切なし
                    </span>
                    <span className="text-[11px] sm:text-xs text-[#66545A]">
                      お酒を飲む場ではないため、飲酒強要や二日酔いの心配がなく健康的に働けます。
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 bg-[#FFF8F9] p-3 rounded-2xl border border-[#F3E1E6]">
                  <span className="w-5 h-5 rounded-full bg-[#E84B78] text-white flex items-center justify-center text-[10px] font-black shrink-0 mt-0.5">
                    ✓
                  </span>
                  <div>
                    <span className="text-xs sm:text-sm font-bold text-[#38242B] block">
                      1回の接客時間は約15〜20分
                    </span>
                    <span className="text-[11px] sm:text-xs text-[#66545A]">
                      タイマーによる時間管理が行われ、長時間の拘束や体力的な負担を軽減できます。
                    </span>
                  </div>
                </div>
              </div>

              {/* LINE相談ボタン①（ファーストビュー直後） */}
              <div className="pt-2">
                <a
                  href={LINE_OFFICIAL_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => {
                    e.preventDefault();
                    handleLineClick('【仕事内容の質問】実際のお仕事内容や1回の接客について詳しく聞いてみたいです。');
                  }}
                  className="inline-flex items-center justify-center gap-2.5 bg-[#06C755] hover:bg-[#05b34c] text-white font-bold text-xs sm:text-sm px-6 py-3.5 rounded-2xl shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer w-full sm:w-auto"
                >
                  <LucideIcon name="MessageCircle" size={18} />
                  <span>仕事内容について質問してみる</span>
                  <LucideIcon name="ArrowRight" size={16} />
                </a>
              </div>
            </div>

            {/* Right: 実際の店舗の玄関・室内の写真 */}
            <div className="lg:col-span-5 space-y-4">
              <div className="rounded-2xl overflow-hidden border border-[#F3E1E6] shadow-2xs bg-zinc-100 relative group">
                <img
                  src="/images/tobita_street_lanterns_1788153077449.jpg"
                  alt="飛田新地の料亭玄関・提灯の灯り"
                  className="w-full h-48 sm:h-56 object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="eager"
                />
                <div className="absolute bottom-2 left-2 bg-black/60 backdrop-blur-xs text-white text-[11px] font-bold px-2.5 py-1 rounded-lg">
                  料亭の玄関（風情ある伝統的な外観）
                </div>
              </div>

              <div className="rounded-2xl overflow-hidden border border-[#F3E1E6] shadow-2xs bg-zinc-100 relative group">
                <img
                  src="/images/tobita_luxury_room_1788153103866.jpg"
                  alt="清潔感のある和室の客室"
                  className="w-full h-44 sm:h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute bottom-2 left-2 bg-black/60 backdrop-blur-xs text-white text-[11px] font-bold px-2.5 py-1 rounded-lg">
                  接客を行う個室（清潔な和室・冷暖房完備）
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================
            3. 仕事内容の説明（本人の役割 vs 仲居さんの役割）
           ========================================================= */}
        <section className="bg-white rounded-3xl p-6 sm:p-8 md:p-10 border border-[#F3E1E6] shadow-sm">
          <div className="max-w-3xl mb-8">
            <span className="text-[11px] font-bold text-[#E84B78] bg-[#FFF8F9] border border-[#F3E1E6] px-3.5 py-1 rounded-full inline-block mb-2">
              役割の明確化
            </span>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-[#38242B] tracking-tight">
              まずは、実際のお仕事内容を知ってください
            </h2>
            <p className="text-xs sm:text-sm text-[#66545A] mt-2 leading-relaxed">
              仕事内容を曖昧にせず、あなたが担当する作業と仲居さんが担当する作業を明確に分けてご案内します。お茶出しやお菓子出しなどの雑用は一切ありません。
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* あなたが担当するお仕事 */}
            <div className="bg-[#FFF8F9] rounded-2xl p-5 sm:p-6 border border-[#F3E1E6] flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-4 pb-3 border-b border-[#F3E1E6]">
                  <div className="w-8 h-8 rounded-full bg-[#E84B78] text-white flex items-center justify-center font-bold text-xs">
                    <LucideIcon name="User" size={16} />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-[#E84B78] block">Cast</span>
                    <h3 className="font-bold text-sm sm:text-base text-[#38242B]">あなたが担当するお仕事</h3>
                  </div>
                </div>

                <ul className="space-y-3 text-xs sm:text-sm">
                  <li className="flex items-start gap-2.5">
                    <LucideIcon name="Check" size={15} className="text-[#E84B78] shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-[#38242B]">玄関で座って笑顔で手を振る：</strong>
                      ライトアップされた上がり框（座敷）に座り、前を通るお客様に笑顔で手を振ったり会釈をします。
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <LucideIcon name="Check" size={15} className="text-[#E84B78] shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-[#38242B]">お客様をお部屋へご案内：</strong>
                      入店が決まったお客様をお部屋（冷暖房完備の個室）へご案内します。
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <LucideIcon name="Check" size={15} className="text-[#E84B78] shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-[#38242B]">15〜20分のおもてなし接客：</strong>
                      世間話をしながらリラックスした時間を過ごし、規定のサービスを行います。
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <LucideIcon name="Check" size={15} className="text-[#E84B78] shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-[#38242B]">身だしなみチェックと次の準備：</strong>
                      接客終了後は身だしなみを整え、次の待機に入ります。
                    </span>
                  </li>
                </ul>
              </div>

              <div className="mt-4 pt-3 border-t border-[#F3E1E6] text-[11px] text-[#E84B78] font-bold">
                ※お茶出し・お菓子出しなどの雑用は一切行いません。
              </div>
            </div>

            {/* 仲居さんが担当するお仕事 */}
            <div className="bg-white rounded-2xl p-5 sm:p-6 border border-zinc-200 shadow-2xs flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-4 pb-3 border-b border-zinc-100">
                  <div className="w-8 h-8 rounded-full bg-zinc-800 text-white flex items-center justify-center font-bold text-xs">
                    <LucideIcon name="Users" size={16} />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-zinc-500 block">Support</span>
                    <h3 className="font-bold text-sm sm:text-base text-[#38242B]">仲居さん（おばちゃん）が担当するお仕事</h3>
                  </div>
                </div>

                <ul className="space-y-3 text-xs sm:text-sm">
                  <li className="flex items-start gap-2.5">
                    <LucideIcon name="Check" size={15} className="text-zinc-700 shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-[#38242B]">通りへの声掛け・呼び込み：</strong>
                      「お兄さん寄ってって〜」などの声掛けや客引き、料金システムのご案内は仲居さんが行います。
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <LucideIcon name="Check" size={15} className="text-zinc-700 shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-[#38242B]">時間管理（タイマー管理）：</strong>
                      内線やお声掛けで時間を正確にお知らせし、長引かないよう徹底管理します。
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <LucideIcon name="Check" size={15} className="text-zinc-700 shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-[#38242B]">お部屋の事前準備・清掃・消毒：</strong>
                      シーツ交換やお部屋の清掃・衛生管理は店舗スタッフ・仲居さんが全て行います。
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <LucideIcon name="Check" size={15} className="text-zinc-700 shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-[#38242B]">安全管理と待機中の見守り：</strong>
                      困ったことが起きた場合の対応や、待機中の体調面などを常にサポートします。
                    </span>
                  </li>
                </ul>
              </div>

              <div className="mt-4 pt-3 border-t border-zinc-100 text-[11px] text-emerald-700 font-bold">
                ※女性スタッフと仲居さんが常にあなたの味方としてサポートします。
              </div>
            </div>
          </div>

          {/* LINE相談ボタン②（仕事内容の説明後） */}
          <div className="mt-8 pt-6 border-t border-[#F3E1E6] text-center">
            <p className="text-xs text-[#66545A] mb-3">
              「自分にできるか不安」「もう少し詳しく知りたい」という方は、女性スタッフへお気軽にLINEでご質問ください。
            </p>
            <a
              href={LINE_OFFICIAL_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => {
                e.preventDefault();
                handleLineClick('【仕事内容の相談】まずは相談だけでもしてみたいです。仕事の詳しい流れを教えてください。');
              }}
              className="inline-flex items-center justify-center gap-2 bg-[#06C755] hover:bg-[#05b34c] text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-2xl shadow-xs transition-colors cursor-pointer"
            >
              <LucideIcon name="MessageCircle" size={16} />
              <span>まずは相談だけでもOK</span>
              <LucideIcon name="ChevronRight" size={14} />
            </a>
          </div>
        </section>

        {/* =========================================================
            4. 1回の接客の流れ（番号付きステップ形式）
           ========================================================= */}
        <section className="bg-white rounded-3xl p-6 sm:p-8 md:p-10 border border-[#F3E1E6] shadow-sm">
          <div className="max-w-3xl mb-8">
            <span className="text-[11px] font-bold text-[#E84B78] bg-[#FFF8F9] border border-[#F3E1E6] px-3.5 py-1 rounded-full inline-block mb-2">
              時系列でイメージ
            </span>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-[#38242B] tracking-tight">
              1回の接客の流れ（開始から終了まで）
            </h2>
            <p className="text-xs sm:text-sm text-[#66545A] mt-2 leading-relaxed">
              お客様が入店されてからお見送りまでの具体的な流れをステップ順にご説明します。
            </p>
          </div>

          <div className="space-y-4">
            {/* STEP 01 */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 sm:p-5 rounded-2xl bg-[#FFF8F9] border border-[#F3E1E6]">
              <div className="w-10 h-10 rounded-2xl bg-[#E84B78] text-white font-black text-sm flex items-center justify-center shrink-0">
                01
              </div>
              <div className="flex-1 space-y-1">
                <h3 className="font-bold text-sm sm:text-base text-[#38242B]">
                  玄関で待機・笑顔でお迎え
                </h3>
                <p className="text-xs sm:text-sm text-[#66545A] leading-relaxed">
                  ライトアップされた上がり框（座敷）に座ります。前を通るお客様と目が合ったら、にこっと笑顔で手を振ったり会釈します。声掛けや呼び込みは横の仲居さんが担当します。
                </p>
              </div>
              <span className="text-[10px] font-bold px-2.5 py-1 rounded-md bg-white text-[#E84B78] border border-[#F3E1E6] shrink-0">
                声出し不要
              </span>
            </div>

            {/* STEP 02 */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 sm:p-5 rounded-2xl bg-white border border-[#F3E1E6] shadow-2xs">
              <div className="w-10 h-10 rounded-2xl bg-[#E84B78] text-white font-black text-sm flex items-center justify-center shrink-0">
                02
              </div>
              <div className="flex-1 space-y-1">
                <h3 className="font-bold text-sm sm:text-base text-[#38242B]">
                  お部屋へご案内
                </h3>
                <p className="text-xs sm:text-sm text-[#66545A] leading-relaxed">
                  入店が決まったら、靴を履いてお客様をお部屋（冷暖房完備の清潔な個室）へご案内します。
                </p>
              </div>
              <span className="text-[10px] font-bold px-2.5 py-1 rounded-md bg-[#FFF8F9] text-[#38242B] border border-[#F3E1E6] shrink-0">
                完全個室
              </span>
            </div>

            {/* STEP 03 */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 sm:p-5 rounded-2xl bg-[#FFF8F9] border border-[#F3E1E6]">
              <div className="w-10 h-10 rounded-2xl bg-[#E84B78] text-white font-black text-sm flex items-center justify-center shrink-0">
                03
              </div>
              <div className="flex-1 space-y-1">
                <h3 className="font-bold text-sm sm:text-base text-[#38242B]">
                  準備とおもてなし接客（約15〜20分）
                </h3>
                <p className="text-xs sm:text-sm text-[#66545A] leading-relaxed">
                  お部屋で接客前の準備を行い、お客様と世間話をしながらリラックスして過ごしていただきます。お酒を飲む必要は一切ありません。
                </p>
              </div>
              <span className="text-[10px] font-bold px-2.5 py-1 rounded-md bg-white text-emerald-700 border border-emerald-200 shrink-0">
                お酒不要
              </span>
            </div>

            {/* STEP 04 */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 sm:p-5 rounded-2xl bg-white border border-[#F3E1E6] shadow-2xs">
              <div className="w-10 h-10 rounded-2xl bg-[#E84B78] text-white font-black text-sm flex items-center justify-center shrink-0">
                04
              </div>
              <div className="flex-1 space-y-1">
                <h3 className="font-bold text-sm sm:text-base text-[#38242B]">
                  時間終了・退室
                </h3>
                <p className="text-xs sm:text-sm text-[#66545A] leading-relaxed">
                  約15〜20分が経過すると、仲居さんが内線やお声掛けで時間をお知らせします。時間が延長して長引く心配はありません。
                </p>
              </div>
              <span className="text-[10px] font-bold px-2.5 py-1 rounded-md bg-[#FFF8F9] text-[#38242B] border border-[#F3E1E6] shrink-0">
                タイマー管理
              </span>
            </div>

            {/* STEP 05 */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 sm:p-5 rounded-2xl bg-[#FFF8F9] border border-[#F3E1E6]">
              <div className="w-10 h-10 rounded-2xl bg-[#E84B78] text-white font-black text-sm flex items-center justify-center shrink-0">
                05
              </div>
              <div className="flex-1 space-y-1">
                <h3 className="font-bold text-sm sm:text-base text-[#38242B]">
                  お部屋の清掃と次の準備
                </h3>
                <p className="text-xs sm:text-sm text-[#66545A] leading-relaxed">
                  お部屋の清掃やシーツ交換は仲居さん・裏方スタッフが担当します。ご自身は身だしなみを整え、次の待機に入ります。
                </p>
              </div>
              <span className="text-[10px] font-bold px-2.5 py-1 rounded-md bg-white text-[#E84B78] border border-[#F3E1E6] shrink-0">
                清掃は店舗担当
              </span>
            </div>
          </div>
        </section>

        {/* =========================================================
            5. 未経験者向けの説明（初めての方が気になる5つのこと）
           ========================================================= */}
        <section className="bg-white rounded-3xl p-6 sm:p-8 md:p-10 border border-[#F3E1E6] shadow-sm">
          <div className="max-w-3xl mb-8">
            <span className="text-[11px] font-bold text-[#E84B78] bg-[#FFF8F9] border border-[#F3E1E6] px-3.5 py-1 rounded-full inline-block mb-2">
              不安解消
            </span>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-[#38242B] tracking-tight">
              初めての方が気になる5つのこと
            </h2>
            <p className="text-xs sm:text-sm text-[#66545A] mt-2 leading-relaxed">
              未経験者の方からよくいただく質問について、店舗で実際に実施しているサポート内容を具体的にお答えします。
            </p>
          </div>

          <div className="space-y-3.5">
            {/* Q1 */}
            <div className="p-4 sm:p-5 rounded-2xl bg-[#FFF8F9] border border-[#F3E1E6] space-y-1.5">
              <h3 className="text-xs sm:text-sm font-bold text-[#38242B] flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-[#E84B78] text-white text-[10px] font-black flex items-center justify-center shrink-0">1</span>
                <span>接客経験がなくても大丈夫？</span>
              </h3>
              <p className="text-xs sm:text-[13px] text-[#66545A] leading-relaxed pl-7">
                はい、在籍女性の多くが完全未経験からスタートしています。特別な会話術や高度な接客スキルは不要で、笑顔で丁寧に接することができれば十分に活躍していただけます。
              </p>
            </div>

            {/* Q2 */}
            <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#F3E1E6] space-y-1.5 shadow-2xs">
              <h3 className="text-xs sm:text-sm font-bold text-[#38242B] flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-[#E84B78] text-white text-[10px] font-black flex items-center justify-center shrink-0">2</span>
                <span>人見知りでも働ける？</span>
              </h3>
              <p className="text-xs sm:text-[13px] text-[#66545A] leading-relaxed pl-7">
                問題ありません。自分から無理に話題を作ったり盛り上げたりする必要はなく、お客様のお話に相槌を打つ姿勢があれば温かく受け入れられます。
              </p>
            </div>

            {/* Q3 */}
            <div className="p-4 sm:p-5 rounded-2xl bg-[#FFF8F9] border border-[#F3E1E6] space-y-1.5">
              <h3 className="text-xs sm:text-sm font-bold text-[#38242B] flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-[#E84B78] text-white text-[10px] font-black flex items-center justify-center shrink-0">3</span>
                <span>仕事の流れは事前に教えてもらえる？</span>
              </h3>
              <p className="text-xs sm:text-[13px] text-[#66545A] leading-relaxed pl-7">
                はい。最初に出勤した際、女性スタッフや仲居さんが部屋の使い方、準備の手順、接客のポイントを一つずつ分かりやすく丁寧にお教えします。
              </p>
            </div>

            {/* Q4 */}
            <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#F3E1E6] space-y-1.5 shadow-2xs">
              <h3 className="text-xs sm:text-sm font-bold text-[#38242B] flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-[#E84B78] text-white text-[10px] font-black flex items-center justify-center shrink-0">4</span>
                <span>困ったことがあったら誰に相談できる？</span>
              </h3>
              <p className="text-xs sm:text-[13px] text-[#66545A] leading-relaxed pl-7">
                常にフロアや玄関に仲居さん・女性スタッフが常駐しています。接客前後はもちろん、待機中もすぐに何でも相談できる環境です。
              </p>
            </div>

            {/* Q5 */}
            <div className="p-4 sm:p-5 rounded-2xl bg-[#FFF8F9] border border-[#F3E1E6] space-y-1.5">
              <h3 className="text-xs sm:text-sm font-bold text-[#38242B] flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-[#E84B78] text-white text-[10px] font-black flex items-center justify-center shrink-0">5</span>
                <span>接客中に無理な要求をされた場合は？</span>
              </h3>
              <p className="text-xs sm:text-[13px] text-[#66545A] leading-relaxed pl-7">
                規約で禁止されている行為や嫌な要求はきっぱりお断りして構いません。お部屋には内線や呼び出しブザーが設置されており、すぐにスタッフが駆けつけて対応します。
              </p>
            </div>
          </div>
        </section>

        {/* =========================================================
            6. 1日のスケジュール
           ========================================================= */}
        <section className="bg-white rounded-3xl p-6 sm:p-8 md:p-10 border border-[#F3E1E6] shadow-sm">
          <div className="max-w-3xl mb-8">
            <span className="text-[11px] font-bold text-[#E84B78] bg-[#FFF8F9] border border-[#F3E1E6] px-3.5 py-1 rounded-full inline-block mb-2">
              1日の過ごし方
            </span>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-[#38242B] tracking-tight">
              1日のスケジュール（出勤から退勤まで）
            </h2>
            <p className="text-xs sm:text-sm text-[#66545A] mt-2 leading-relaxed">
              実際の出勤・準備・待機・接客・休憩・退勤の順番に整理してご紹介します。
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="bg-[#FFF8F9] rounded-2xl p-4 border border-[#F3E1E6]">
              <span className="text-[10px] font-bold text-[#E84B78] block mb-1">01. 出勤・お着替え</span>
              <h3 className="font-bold text-xs sm:text-sm text-[#38242B] mb-1">店舗に到着・準備</h3>
              <p className="text-[11px] sm:text-xs text-[#66545A] leading-relaxed">
                指定のシフト時間に合わせて出勤。更衣室でお仕事用の衣装に着替えます。
              </p>
            </div>

            <div className="bg-[#FFF8F9] rounded-2xl p-4 border border-[#F3E1E6]">
              <span className="text-[10px] font-bold text-[#E84B78] block mb-1">02. 身だしなみ確認</span>
              <h3 className="font-bold text-xs sm:text-sm text-[#38242B] mb-1">ヘアメイク・チェック</h3>
              <p className="text-[11px] sm:text-xs text-[#66545A] leading-relaxed">
                髪型やメイクを整え、担当する玄関の座敷（上がり框）へ移動します。
              </p>
            </div>

            <div className="bg-[#FFF8F9] rounded-2xl p-4 border border-[#F3E1E6]">
              <span className="text-[10px] font-bold text-[#E84B78] block mb-1">03. 待機・お迎え</span>
              <h3 className="font-bold text-xs sm:text-sm text-[#38242B] mb-1">笑顔でお客様をお迎え</h3>
              <p className="text-[11px] sm:text-xs text-[#66545A] leading-relaxed">
                座敷に座り、前を通るお客様に笑顔で手を振ったり会釈してお迎えします。
              </p>
            </div>

            <div className="bg-[#FFF8F9] rounded-2xl p-4 border border-[#F3E1E6]">
              <span className="text-[10px] font-bold text-[#E84B78] block mb-1">04. 接客（約15〜20分）</span>
              <h3 className="font-bold text-xs sm:text-sm text-[#38242B] mb-1">お部屋でのサービス</h3>
              <p className="text-[11px] sm:text-xs text-[#66545A] leading-relaxed">
                お部屋へご案内し、お客様と和やかなおもてなし接客を行います。
              </p>
            </div>

            <div className="bg-[#FFF8F9] rounded-2xl p-4 border border-[#F3E1E6]">
              <span className="text-[10px] font-bold text-[#E84B78] block mb-1">05. 休憩・食事</span>
              <h3 className="font-bold text-xs sm:text-sm text-[#38242B] mb-1">控室でリラックス</h3>
              <p className="text-[11px] sm:text-xs text-[#66545A] leading-relaxed">
                交代で冷暖房完備の控室に入り、持参した食事をとったり休憩します。
              </p>
            </div>

            <div className="bg-[#FFF8F9] rounded-2xl p-4 border border-[#F3E1E6]">
              <span className="text-[10px] font-bold text-[#E84B78] block mb-1">06. 退勤・日払い手渡し</span>
              <h3 className="font-bold text-xs sm:text-sm text-[#38242B] mb-1">当日全額現金支給</h3>
              <p className="text-[11px] sm:text-xs text-[#66545A] leading-relaxed">
                私服に着替え、その日の給与を全額現金手渡しで受け取り帰宅します。
              </p>
            </div>
          </div>
        </section>

        {/* =========================================================
            7. 他業種との比較
           ========================================================= */}
        <section className="bg-white rounded-3xl p-6 sm:p-8 md:p-10 border border-[#F3E1E6] shadow-sm">
          <div className="max-w-3xl mb-8">
            <span className="text-[11px] font-bold text-[#E84B78] bg-[#FFF8F9] border border-[#F3E1E6] px-3.5 py-1 rounded-full inline-block mb-2">
              働き方の違い
            </span>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-[#38242B] tracking-tight">
              他業種との違い（仕事内容の比較）
            </h2>
            <p className="text-xs sm:text-sm text-[#66545A] mt-2 leading-relaxed">
              仕事内容の特徴を整理し、他の接客業やナイトワークとの違いを分かりやすく比較しました。
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-[#F3E1E6]">
            <table className="w-full text-xs text-left">
              <thead className="bg-[#FFF8F9] text-[#38242B] font-bold border-b border-[#F3E1E6]">
                <tr>
                  <th className="p-3.5 whitespace-nowrap">比較項目</th>
                  <th className="p-3.5 whitespace-nowrap text-[#E84B78]">飛田新地の料亭接客</th>
                  <th className="p-3.5 whitespace-nowrap">キャバクラ・ラウンジ</th>
                  <th className="p-3.5 whitespace-nowrap">他業種ナイトワーク</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F3E1E6] bg-white">
                <tr className="hover:bg-[#FFF8F9]/40">
                  <td className="p-3.5 font-bold text-[#38242B] whitespace-nowrap">接客内容</td>
                  <td className="p-3.5 font-bold text-[#E84B78]">お部屋で約15〜20分の接客・サービス</td>
                  <td className="p-3.5 text-[#66545A]">お酒を作りながら長時間の会話</td>
                  <td className="p-3.5 text-[#66545A]">60〜120分の長時間サービス</td>
                </tr>
                <tr className="hover:bg-[#FFF8F9]/40">
                  <td className="p-3.5 font-bold text-[#38242B] whitespace-nowrap">お客様への声掛け</td>
                  <td className="p-3.5 font-bold text-[#E84B78]">仲居さんが全担当（女の子は声出し不要）</td>
                  <td className="p-3.5 text-[#66545A]">客引き・声掛けが必要な場合あり</td>
                  <td className="p-3.5 text-[#66545A]">店舗集客が中心</td>
                </tr>
                <tr className="hover:bg-[#FFF8F9]/40">
                  <td className="p-3.5 font-bold text-[#38242B] whitespace-nowrap">飲酒の有無</td>
                  <td className="p-3.5 font-bold text-[#E84B78]">完全不要（お酒を飲む必要一切なし）</td>
                  <td className="p-3.5 text-[#66545A]">飲酒機会が多く飲めないと厳しい場合あり</td>
                  <td className="p-3.5 text-[#66545A]">不要だが長時間の体力消耗あり</td>
                </tr>
                <tr className="hover:bg-[#FFF8F9]/40">
                  <td className="p-3.5 font-bold text-[#38242B] whitespace-nowrap">営業連絡の有無</td>
                  <td className="p-3.5 font-bold text-[#E84B78]">全面禁止（連絡先交換は組合規約で禁止）</td>
                  <td className="p-3.5 text-[#66545A]">毎日の営業LINE・連絡ノルマあり</td>
                  <td className="p-3.5 text-[#66545A]">店舗により営業電話や連絡あり</td>
                </tr>
                <tr className="hover:bg-[#FFF8F9]/40">
                  <td className="p-3.5 font-bold text-[#38242B] whitespace-nowrap">接客時間</td>
                  <td className="p-3.5 font-bold text-[#E84B78]">1回約15〜20分の短時間</td>
                  <td className="p-3.5 text-[#66545A]">60〜90分＋延長や同伴・アフター</td>
                  <td className="p-3.5 text-[#66545A]">60〜120分</td>
                </tr>
                <tr className="hover:bg-[#FFF8F9]/40">
                  <td className="p-3.5 font-bold text-[#38242B] whitespace-nowrap">写真・プロフィールの扱い</td>
                  <td className="p-3.5 font-bold text-[#E84B78]">ネット写真掲載なし（街全体撮影禁止）</td>
                  <td className="p-3.5 text-[#66545A]">パネル写真やSNS顔出し公開あり</td>
                  <td className="p-3.5 text-[#66545A]">WEB指名サイトに顔や体型掲載あり</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* =========================================================
            8. FAQ（仕事内容に特化・アコーディオン）
           ========================================================= */}
        <section className="bg-white rounded-3xl p-6 sm:p-8 md:p-10 border border-[#F3E1E6] shadow-sm">
          <div className="max-w-3xl mb-8">
            <span className="text-[11px] font-bold text-[#E84B78] bg-[#FFF8F9] border border-[#F3E1E6] px-3.5 py-1 rounded-full inline-block mb-2">
              よくある質問
            </span>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-[#38242B] tracking-tight">
              仕事内容に関するよくある質問
            </h2>
            <p className="text-xs sm:text-sm text-[#66545A] mt-2 leading-relaxed">
              仕事内容について特に多く寄せられる疑問をまとめました。クリックして回答をご確認いただけます。
            </p>
          </div>

          <div className="space-y-3">
            {jobFaqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-[#F3E1E6] overflow-hidden bg-[#FFF8F9]/60 transition-colors"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full text-left p-4 sm:p-4.5 flex items-center justify-between gap-3 cursor-pointer hover:bg-[#FFF8F9]"
                  >
                    <span className="font-bold text-xs sm:text-sm text-[#38242B] flex items-start gap-2">
                      <span className="text-[#E84B78] font-black">Q.</span>
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
                        className="px-4 pb-4 pt-1 sm:px-4.5 sm:pb-4.5 text-xs sm:text-[13px] text-[#66545A] leading-relaxed border-t border-[#F3E1E6] bg-white flex items-start gap-2"
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
            11. LINE相談導線③（ページ最下部） & 安心バッジ
           ========================================================= */}
        <section className="bg-white rounded-3xl p-6 sm:p-10 border-2 border-[#E84B78]/30 shadow-sm text-center relative overflow-hidden">
          <div className="max-w-2xl mx-auto space-y-4">
            <span className="inline-block text-xs font-bold text-[#E84B78] bg-[#FFF8F9] px-3.5 py-1 rounded-full border border-[#F3E1E6]">
              LINE無料相談
            </span>

            <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-[#38242B]">
              未経験なので詳しく聞いてみたい
            </h2>

            <p className="text-xs sm:text-sm text-[#66545A] leading-relaxed">
              「自分にできるか不安」「面接や体験入店について質問したい」など、どんな些細な疑問もお気軽にご相談ください。女性スタッフが親身に対応いたします。
            </p>

            <div className="pt-2">
              <a
                href={LINE_OFFICIAL_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => {
                  e.preventDefault();
                  handleLineClick('【未経験からの相談】未経験なので詳しく仕事内容を聞いてみたいです。');
                }}
                className="inline-flex items-center justify-center gap-3 bg-[#06C755] hover:bg-[#05b34c] text-white font-black text-sm sm:text-base px-8 py-4 rounded-2xl shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer w-full sm:w-auto"
              >
                <LucideIcon name="MessageCircle" size={22} className="text-white" />
                <span>未経験なので詳しく聞いてみたい</span>
                <LucideIcon name="ArrowRight" size={18} />
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
