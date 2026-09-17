import React, { useEffect } from 'react';
import LucideIcon from './LucideIcon';

interface AboutPageProps {
  onNavigateHome: () => void;
  onNavigateBlog: () => void;
  onCtaclick: () => void;
}

export default function AboutPage({ onNavigateHome, onNavigateBlog, onCtaclick }: AboutPageProps) {
  useEffect(() => {
    document.title = '飛田ガールズについて｜運営者情報・料亭直営体制・一次情報ポリシー【公式】';
    const desc = '飛田新地料理組合公認の老舗料亭直営公式求人「飛田ガールズ」の店舗情報、創業歴、運営体制、女性スタッフによるサポート方針、一次情報発信ポリシーをご紹介します。';
    const canonicalUrl = 'https://tobitashinchi-recruit.com/about';

    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', desc);

    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (canonicalLink) {
      canonicalLink.setAttribute('href', canonicalUrl);
    } else {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      canonicalLink.setAttribute('href', canonicalUrl);
      document.head.appendChild(canonicalLink);
    }

    const ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) ogUrl.setAttribute('content', canonicalUrl);
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', document.title);
  }, []);

  return (
    <div className="min-h-screen bg-surface py-8 sm:py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-zinc-500 mb-6">
          <button 
            onClick={onNavigateHome}
            className="hover:text-rose-600 transition-colors flex items-center gap-1 cursor-pointer"
          >
            <LucideIcon name="Home" size={13} />
            <span>ホーム</span>
          </button>
          <span>/</span>
          <span className="text-zinc-800 font-bold">当店について（料亭案内）</span>
        </div>

        {/* Hero Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-rose-100/80 shadow-sm mb-8">
          <div className="inline-flex items-center gap-1.5 bg-rose-50 text-rose-700 text-xs font-bold px-3.5 py-1.5 rounded-full mb-4">
            <LucideIcon name="ShieldCheck" size={14} className="text-rose-600" />
            <span>料理組合公認 老舗直営店</span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-zinc-900 leading-tight mb-4 font-display">
            歴史と伝統に守られた安心の環境<br />
            飛田新地 老舗料亭グループ
          </h1>

          <p className="text-sm sm:text-base text-zinc-600 leading-relaxed mb-6">
            当店は、飛田新地料理組合公認の老舗料亭として、長年にわたり女性キャストの皆様が安心して働ける環境づくりを徹底してまいりました。
            他地域や一般風俗店とは異なり、法令遵守・街全体の撮影禁止・専属スタッフによる24時間見守り体制を確立しています。
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-rose-100">
            <div className="p-4 bg-rose-50/50 rounded-2xl">
              <div className="text-xs text-zinc-500 font-bold mb-1">安心の実績</div>
              <div className="text-xl font-black text-rose-600">創業40余年</div>
              <div className="text-[11px] text-zinc-600 mt-0.5">組合公認の直営料亭</div>
            </div>
            <div className="p-4 bg-rose-50/50 rounded-2xl">
              <div className="text-xs text-zinc-500 font-bold mb-1">未経験スタート率</div>
              <div className="text-xl font-black text-rose-600">90%以上</div>
              <div className="text-[11px] text-zinc-600 mt-0.5">夜職初心者も即日安心</div>
            </div>
            <div className="p-4 bg-rose-50/50 rounded-2xl">
              <div className="text-xs text-zinc-500 font-bold mb-1">給与還元</div>
              <div className="text-xl font-black text-rose-600">50%完全バック</div>
              <div className="text-[11px] text-zinc-600 mt-0.5">即日全額手渡し保証</div>
            </div>
          </div>
        </div>

        {/* 3 Core Commitments */}
        <div className="space-y-6 mb-10">
          <h2 className="text-xl sm:text-2xl font-black text-zinc-900 flex items-center gap-2">
            <LucideIcon name="Sparkles" size={22} className="text-rose-600" />
            <span>女性ファーストを貫く3つの運営理念</span>
          </h2>

          <div className="bg-white rounded-2xl p-6 border border-zinc-100 shadow-xs">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center font-black text-lg shrink-0">
                1
              </div>
              <div>
                <h3 className="font-bold text-base text-zinc-900 mb-1.5">徹底したプライバシー保護・身バレゼロ保証</h3>
                <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
                  飛田新地は街全体で一般人の撮影が固く禁止されています。また、当グループではインターネット上への写真掲載は一切行いません。
                  勤務は完全源氏名、身分証の管理も万全、住民税の普通徴収（副業対策）もしっかりアドバイスいたします。
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-zinc-100 shadow-xs">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center font-black text-lg shrink-0">
                2
              </div>
              <div>
                <h3 className="font-bold text-base text-zinc-900 mb-1.5">ノルマ・罰金・上下関係なしの自由な働き方</h3>
                <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
                  指名争いや同伴・アフター、営業LINEの送信などは一切不要です。お酒を飲む必要も一切ありません。
                  週1日から、短時間から、あなたのライフスタイルに合わせた完全自由出勤制を採用しています。
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-zinc-100 shadow-xs">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center font-black text-lg shrink-0">
                3
              </div>
              <div>
                <h3 className="font-bold text-base text-zinc-900 mb-1.5">女性スタッフ常駐による手厚いメンタルケア</h3>
                <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
                  経験豊富な女性サポートスタッフが常駐しており、お仕事の疑問やお客さま対応のコツ、プライベートの悩みまで親身に相談に乗ります。
                  困ったときはスタッフが即座に駆けつける万全のバックアップ体制です。
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="bg-gradient-to-br from-rose-500 to-rose-600 rounded-3xl p-6 sm:p-8 text-white text-center shadow-lg">
          <h3 className="text-xl sm:text-2xl font-black mb-2">まずは見学・ご相談からお気軽にどうぞ</h3>
          <p className="text-xs sm:text-sm text-rose-100 mb-6 max-w-lg mx-auto">
            履歴書不要・手ぶらでOK。まずはLINEやお電話で気になることを何でも聞いてみてください。
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-3">
            <button
              onClick={onCtaclick}
              className="w-full sm:w-auto bg-white text-rose-600 hover:bg-rose-50 font-bold px-6 py-3 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer text-sm"
            >
              <LucideIcon name="MessageCircle" size={16} />
              <span>無料WEB相談・応募はこちら</span>
            </button>
            <button
              onClick={onNavigateBlog}
              className="w-full sm:w-auto bg-rose-700/60 hover:bg-rose-700 text-white font-bold px-6 py-3 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer text-sm"
            >
              <LucideIcon name="BookOpen" size={16} />
              <span>お仕事コラムを読む</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
