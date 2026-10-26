/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import LucideIcon from './LucideIcon';

interface BenefitsShowcaseProps {
  onCtaclickWithData?: (data: string) => void;
  onCtaclick?: () => void;
}

export const BENEFITS_ITEMS = [
  {
    id: 'benefit-zero-deduction',
    icon: 'ShieldCheck',
    color: 'from-amber-500 to-rose-500',
    badge: '完全0円保証',
    badgeBg: 'bg-amber-100 text-amber-800 border-amber-200',
    title: '雑費・天引き 完全0円',
    summary: '待機料・厚生費・ロッカー代などの差し引きは一切なし。稼いだお給料がそのまま手元に残ります。',
    points: [
      '売上50%完全バック・即日全額現金日払い手渡し',
      '待機料・ロッカー代・部屋使用料・雑費など名目を問わず天引きゼロ',
      'お客様からのチップも100%女の子のもの（お店の天引きなし）'
    ]
  },
  {
    id: 'benefit-dorm',
    icon: 'Home',
    color: 'from-rose-500 to-pink-500',
    badge: '即日入居OK',
    badgeBg: 'bg-rose-100 text-rose-800 border-rose-200',
    title: 'オートロック個室マンション寮完備',
    summary: '家具家電・Wi-Fi完備の清潔な完全個室マンション。カバン1つで即日から新生活を始められます。',
    points: [
      '敷金・礼金・保証人・初期費用すべて0円で即日入居可能',
      '冷蔵庫・洗濯機・電子レンジ・テレビ・ベッド・エアコン・無料Wi-Fi完備',
      'オートロック＆モニター付きインターホンで防犯・プライバシーも万全'
    ]
  },
  {
    id: 'benefit-transport',
    icon: 'Train',
    color: 'from-blue-500 to-indigo-500',
    badge: '往復全額負担',
    badgeBg: 'bg-blue-100 text-blue-800 border-blue-200',
    title: '地方・遠方からの出稼ぎ交通費全額支給',
    summary: '全国各地からの出稼ぎ希望者へ、往復交通費を全額当店が負担支給いたします。',
    points: [
      '新幹線・飛行機・特急・高速夜行バスなど実費往復全額支給',
      '領収書またはチケット控えをお持ちいただければ初日稼働後に精算手渡し',
      '短期集中（2泊3日〜週末のみ）から長期滞在まで柔軟に対応'
    ]
  },
  {
    id: 'benefit-costume',
    icon: 'Sparkles',
    color: 'from-purple-500 to-rose-500',
    badge: '手ぶら出勤OK',
    badgeBg: 'bg-purple-100 text-purple-800 border-purple-200',
    title: '衣装・ドレス・靴・ヘアメイク一式無料貸出',
    summary: '事前準備や持参物は一切不要！可愛いドレスや浴衣、着物、コスメ道具まで全完備。',
    points: [
      'トレンドの可愛いドレス、ワンピース、和装（着物・浴衣）、ヒール靴まで全サイズ完備',
      'ヘアアイロン（コテ・ストレート）、コスメ・アメニティも自由に使用可能',
      '私服手ぶらでそのまま出勤・お仕事後に着替えて退勤OK'
    ]
  },
  {
    id: 'benefit-alcohol-free',
    icon: 'Coffee',
    color: 'from-emerald-500 to-teal-500',
    badge: '飲酒の強要ゼロ',
    badgeBg: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    title: 'お酒・アルコール一切不要＆ノルマなし',
    summary: 'お酒を飲む必要は一切ありません。ソフトドリンクでリラックスしておもてなしできます。',
    points: [
      'お酒が全く飲めない方、苦手な方、翌日に本業や学業がある方も100%安心',
      '売上ノルマ・指名ノルマ・同伴プレッシャー・ペナルティ罰金なし',
      '1回15〜20分の短時間接客で、無理なく自分のペースで稼げます'
    ]
  },
  {
    id: 'benefit-support',
    icon: 'HeartHandshake',
    color: 'from-pink-500 to-rose-500',
    badge: '女性スタッフ常駐',
    badgeBg: 'bg-pink-100 text-pink-800 border-pink-200',
    title: '専任女性スタッフ常駐＆身バレ完全防止',
    summary: '女性ならではの細やかな体調管理や相談受付。街全体が撮影禁止で身バレも防ぎます。',
    points: [
      '専任女性スタッフ（さくら）常駐＋各部屋前のベテラン仲居さんが常時見守り',
      'Webサイト・SNSへの顔写真掲載一切ゼロ（完全非公開・100%守秘義務）',
      '完全源氏名（お仕事用のお名前）使用、特定エリアを避けたシフト調整も可能'
    ]
  }
];

export const BENEFIT_COMPARISONS = [
  {
    item: '雑費・天引き',
    ourShop: '完全0円（引かれ物一切なし）',
    otherShop: '日給から待機料・厚生費など5,000〜15,000円天引き'
  },
  {
    item: 'お給料の支給形態',
    ourShop: '売上50%完全即日全額日払い（手渡し現金）',
    otherShop: '一部日払いのみ、残りは翌月振込や調整金保留'
  },
  {
    item: '交通費',
    ourShop: '地方・遠方からの往復交通費を全額支給',
    otherShop: '自己負担、または規定売上未達の場合は支給なし'
  },
  {
    item: '寮・住居',
    ourShop: 'オートロック家具家電付き完全個室マンション即日入居',
    otherShop: '相部屋・雑居ビルの一室、または敷金・保証金が必要'
  },
  {
    item: '衣装・ヘアメイク',
    ourShop: 'ドレス・着物・靴・コスメ・ヘアアイロンすべて無料貸出',
    otherShop: '衣装レンタル代やクリーニング代が日給から引かれる'
  },
  {
    item: 'お酒・飲酒',
    ourShop: 'お酒一切不要（お茶やソフトドリンクでおもてなし）',
    otherShop: 'お酒の付き合いが必須、二日酔いや体調不良のリスク'
  },
  {
    item: '写真掲載・プライバシー',
    ourShop: 'ネット写真ゼロ（100%非公開）・街全体が撮影禁止',
    otherShop: 'HPやSNSへの顔写真・体型写真掲載を求められる'
  },
  {
    item: 'サポート体制',
    ourShop: '専任女性スタッフ常駐＋仲居さんの温かい見守り',
    otherShop: '男性スタッフや店長のみで相談しにくい環境'
  }
];

export default function BenefitsShowcase({ onCtaclickWithData, onCtaclick }: BenefitsShowcaseProps) {
  const handleInquiry = (topic: string) => {
    const msg = `【待遇に関するご相談】${topic}について詳しく教えてください。`;
    if (onCtaclickWithData) {
      onCtaclickWithData(msg);
    } else if (onCtaclick) {
      onCtaclick();
    }
  };

  return (
    <section className="bg-white rounded-3xl p-6 sm:p-8 md:p-10 border border-rose-100 shadow-sm mb-10 relative overflow-hidden scroll-mt-20" id="benefits-section">
      <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-rose-100/40 via-pink-50/20 to-transparent rounded-full blur-2xl -z-0 pointer-events-none" />

      <div className="relative z-10 mb-8">
        {/* Top Badges */}
        <div className="flex items-center gap-2 mb-4 flex-wrap">
          <span className="inline-flex items-center gap-1 bg-rose-600 text-white text-[11px] font-black px-3 py-1 rounded-full shadow-2xs">
            <LucideIcon name="ShieldCheck" size={12} />
            <span>料理組合正規加盟 直営公式待遇</span>
          </span>
          <span className="text-[11px] font-bold px-3 py-1 rounded-full border shadow-2xs bg-rose-100 text-rose-800 border-rose-200">
            🎁 充実の福利厚生・生活サポート制度
          </span>
          <span className="inline-flex items-center gap-1 bg-rose-50 text-rose-700 text-[11px] font-bold px-3 py-1 rounded-full border border-rose-200/60">
            <LucideIcon name="Sparkles" size={12} className="text-rose-500" />
            <span>天引き・雑費完全ゼロ保証</span>
          </span>
        </div>

        {/* Main 2-Column: Title & Overview (Left) + High-Quality Visual Photo Card (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center mb-6">
          <div className="order-2 lg:order-1 lg:col-span-7">
            {/* Main Title H2 */}
            <h2 className="font-display font-black text-2xl sm:text-3xl md:text-4xl text-zinc-900 leading-tight mb-3">
              待遇
              <span className="block text-base sm:text-xl font-bold text-rose-600 mt-1 font-sans">
                雑費天引きゼロ・家具家電付き個室寮・往復交通費支給・衣装ヘアメイク無料
              </span>
            </h2>

            <p className="text-xs sm:text-sm md:text-base text-zinc-600 leading-relaxed mb-4">
              当直営料亭では、働く女性キャストが余計な金銭的・精神的負担なく安心して高収入に専念できるよう、業界最高水準の待遇をご用意しています。理不尽な天引きや雑費は一切なく、即日入居可能な快適なオートロック個室マンション寮や往復交通費の全額支給など、新生活と稼ぎやすさを徹底サポートいたします。
            </p>

            {/* Quick Trust Checklist Pills */}
            <div className="flex flex-wrap gap-2 text-xs">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-rose-50 text-rose-800 font-bold border border-rose-100/80">
                <LucideIcon name="CheckCircle2" size={13} className="text-rose-600 shrink-0" />
                <span>家具家電付き個室寮 即日入居</span>
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-rose-50 text-rose-800 font-bold border border-rose-100/80">
                <LucideIcon name="CheckCircle2" size={13} className="text-rose-600 shrink-0" />
                <span>遠方往復交通費 全額当店負担</span>
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-rose-50 text-rose-800 font-bold border border-rose-100/80">
                <LucideIcon name="CheckCircle2" size={13} className="text-rose-600 shrink-0" />
                <span>衣装・コスメ・備品 完全無料</span>
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-rose-50 text-rose-800 font-bold border border-rose-100/80">
                <LucideIcon name="CheckCircle2" size={13} className="text-rose-600 shrink-0" />
                <span>女性スタッフ常駐＆身バレ完全防止</span>
              </span>
            </div>
          </div>

          {/* Hero Image Card */}
          <div className="order-1 lg:order-2 lg:col-span-5">
            <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-md border border-rose-200/80 group bg-zinc-900">
              <div className="aspect-16/10 sm:aspect-16/9 lg:aspect-4/3 w-full overflow-hidden">
                <img
                  src="/images/tobita_benefits_treatment_1792645929324.jpg"
                  alt="飛田新地 待遇・福利厚生・完全個室寮・生活サポート"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  loading="lazy"
                  onError={(e) => {
                    const target = e.currentTarget;
                    target.src = '/images/tobita_dream_hero_banner_1782557055526.jpg';
                  }}
                />
              </div>
              {/* Atmospheric Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent pointer-events-none" />
              
              {/* Top Badge on Photo */}
              <div className="absolute top-3 left-3">
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-[11px] font-bold text-white border border-white/25 shadow-xs">
                  <span>🎁</span>
                  <span>公式待遇・福利厚生</span>
                </span>
              </div>

              {/* Bottom Info on Photo */}
              <div className="absolute bottom-3 left-3 right-3 text-white">
                <p className="text-xs font-bold leading-tight drop-shadow-md mb-1 text-white">
                  カバン1つで即日入居・新生活スタート
                </p>
                <div className="flex items-center justify-between text-[11px] text-zinc-200">
                  <span className="flex items-center gap-1">
                    <LucideIcon name="ShieldCheck" size={13} className="text-emerald-400" />
                    <span>完全個室マンション寮完備</span>
                  </span>
                  <span className="text-rose-300 font-black">初期費用0円</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Direct Answer Summary Box (30秒要約) */}
        <div className="bg-gradient-to-r from-rose-50 via-pink-50/50 to-white rounded-2xl p-4 sm:p-5 border border-rose-200/80 mb-6">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2 text-rose-800 font-bold text-xs sm:text-sm">
              <LucideIcon name="Sparkles" size={15} className="text-rose-600" />
              <span>【30秒でわかる要点】待遇・福利厚生のポイント</span>
            </div>
            <span className="text-[10px] font-bold bg-white text-rose-700 border border-rose-200 px-2.5 py-0.5 rounded-full shadow-2xs">
              待遇まとめ
            </span>
          </div>
          <p className="text-xs sm:text-sm text-zinc-700 leading-relaxed font-medium">
            当直営料亭では「引かれ物一切なし（完全0円）」を徹底。即日入居できる家具家電付きの完全個室マンション寮、全国からの往復交通費全額支給、衣装・コスメ・ヘアアイロンの無料完備など、キャストの負担を極限まで減らした手厚い生活サポートをお約束します。
          </p>
        </div>

        {/* 4 Stat Badges */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-3">
          <div className="p-3.5 bg-rose-50/30 hover:bg-rose-50/60 rounded-2xl border border-rose-100/70 hover:border-rose-200 transition-all">
            <span className="text-[10px] text-zinc-500 font-bold block mb-0.5">雑費・引かれ物</span>
            <p className="font-display font-black text-rose-700 text-sm sm:text-base leading-snug">
              完全0円（天引き無）
            </p>
            <p className="text-[10px] text-zinc-500 mt-0.5 leading-tight">待機料や厚生費ゼロ</p>
          </div>
          <div className="p-3.5 bg-rose-50/30 hover:bg-rose-50/60 rounded-2xl border border-rose-100/70 hover:border-rose-200 transition-all">
            <span className="text-[10px] text-zinc-500 font-bold block mb-0.5">個室マンション寮</span>
            <p className="font-display font-black text-rose-700 text-sm sm:text-base leading-snug">
              即日入居OK
            </p>
            <p className="text-[10px] text-zinc-500 mt-0.5 leading-tight">家具家電＆Wi-Fi完備</p>
          </div>
          <div className="p-3.5 bg-rose-50/30 hover:bg-rose-50/60 rounded-2xl border border-rose-100/70 hover:border-rose-200 transition-all">
            <span className="text-[10px] text-zinc-500 font-bold block mb-0.5">出稼ぎ交通費</span>
            <p className="font-display font-black text-rose-700 text-sm sm:text-base leading-snug">
              往復全額支給
            </p>
            <p className="text-[10px] text-zinc-500 mt-0.5 leading-tight">新幹線・飛行機・バス代</p>
          </div>
          <div className="p-3.5 bg-rose-50/30 hover:bg-rose-50/60 rounded-2xl border border-rose-100/70 hover:border-rose-200 transition-all">
            <span className="text-[10px] text-zinc-500 font-bold block mb-0.5">衣装・ヘアメイク</span>
            <p className="font-display font-black text-rose-700 text-sm sm:text-base leading-snug">
              完全無料貸出
            </p>
            <p className="text-[10px] text-zinc-500 mt-0.5 leading-tight">手ぶら出勤OK</p>
          </div>
        </div>
      </div>

      {/* 6 Grid Benefits Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
        {BENEFITS_ITEMS.map((item) => (
          <div
            key={item.id}
            className="flex flex-col justify-between p-5 rounded-2xl border border-gray-100 hover:border-rose-300 bg-rose-50/20 hover:bg-white transition-all shadow-2xs hover:shadow-md group"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-rose-500 to-pink-600 text-white flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
                  <LucideIcon name={item.icon as any} size={20} />
                </div>
                <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${item.badgeBg}`}>
                  {item.badge}
                </span>
              </div>

              <h3 className="font-display font-bold text-base text-zinc-900 mb-1.5 group-hover:text-rose-600 transition-colors">
                {item.title}
              </h3>
              <p className="text-xs text-zinc-600 font-medium leading-relaxed mb-3">
                {item.summary}
              </p>

              <div className="border-t border-rose-100/60 pt-3 space-y-1.5 mb-4">
                {item.points.map((pt, pIdx) => (
                  <div key={pIdx} className="flex items-start gap-1.5 text-xs text-zinc-700">
                    <LucideIcon name="CheckCircle2" size={13} className="text-emerald-500 shrink-0 mt-0.5" />
                    <span className="leading-tight">{pt}</span>
                  </div>
                ))}
              </div>
            </div>

            <button
              type="button"
              onClick={() => handleInquiry(item.title)}
              className="w-full mt-auto py-2 px-3 rounded-xl bg-white hover:bg-rose-50 border border-rose-200 text-xs font-bold text-rose-700 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <LucideIcon name="MessageCircle" size={13} />
              <span>この待遇についてLINEで質問する</span>
            </button>
          </div>
        ))}
      </div>

      {/* Comparison Table: Our Shop vs General Other Shops */}
      <div className="bg-rose-50/40 rounded-2xl p-5 sm:p-6 border border-rose-100 mb-8">
        <div className="flex items-center gap-2 mb-3">
          <LucideIcon name="CheckCheck" size={18} className="text-rose-600" />
          <h3 className="font-display font-bold text-base sm:text-lg text-zinc-900">
            当直営店の安心待遇 vs 一般的な他店・他業種の比較
          </h3>
        </div>
        <p className="text-xs text-zinc-600 mb-4">
          「求人票に書いてあることと実際が違った」という後悔をさせないために、当店はすべての条件を100%オープンに公開しています。
        </p>

        <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-2xs">
          <table className="w-full text-xs text-left">
            <thead className="bg-rose-50 text-rose-900 font-bold border-b border-gray-200">
              <tr>
                <th className="p-3 w-1/4">待遇・サポート項目</th>
                <th className="p-3 w-2/5 bg-rose-100/80 text-rose-950 font-extrabold">当グループ直営料亭</th>
                <th className="p-3 w-1/3 bg-gray-100 text-gray-700">一般的な他店・風俗他店</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 bg-white">
              {BENEFIT_COMPARISONS.map((comp, idx) => (
                <tr key={idx} className="hover:bg-rose-50/20">
                  <td className="p-3 font-bold text-zinc-900 border-r border-gray-100">{comp.item}</td>
                  <td className="p-3 font-bold text-rose-700 bg-rose-50/30 border-r border-gray-100 flex items-start gap-1.5">
                    <LucideIcon name="CheckCircle2" size={14} className="text-emerald-500 shrink-0 mt-0.5" />
                    <span>{comp.ourShop}</span>
                  </td>
                  <td className="p-3 text-zinc-500">{comp.otherShop}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
