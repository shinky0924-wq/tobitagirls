/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { SiteContent } from '../siteContent';
import LucideIcon from './LucideIcon';

interface ReasonsProps {
  content?: SiteContent['reasons'];
}

interface ReasonCardData {
  number: string;
  iconName: string;
  title: string;
  descriptionNode: React.ReactNode;
  appealPoints: string[];
  image: string;
}

const REASONS_DATA: ReasonCardData[] = [
  {
    number: '01',
    iconName: 'TrendingUp',
    title: '集客力へのこだわり',
    descriptionNode: (
      <>
        お客様に選ばれるお店づくりを大切にしています。<span className="text-[#E84B78] font-bold">新規のお客様</span>だけでなく、<span className="text-[#E84B78] font-bold">リピーターの獲得</span>にも力を入れ、女性が<span className="text-[#E84B78] font-bold">安定して働ける環境</span>を目指しています。
      </>
    ),
    appealPoints: [
      '新規のお客様の獲得',
      'リピーターにつながるお店づくり',
      '集客を意識した運営'
    ],
    image: '/images/reason_01_street_1794212884939.jpg'
  },
  {
    number: '02',
    iconName: 'Sparkles',
    title: 'メイク・美容サポート',
    descriptionNode: (
      <>
        メイクやヘアスタイルに自信がない方も大丈夫。<span className="text-[#E84B78] font-bold">自分に似合うメイク方法</span>や身だしなみについてアドバイスし、魅力を引き出すお手伝いをします。
      </>
    ),
    appealPoints: [
      '初心者向けのメイクアドバイス',
      '自分に似合うメイク方法',
      'ヘアスタイルや身だしなみの相談'
    ],
    image: '/images/reason_02_beauty_1794212900059.jpg'
  },
  {
    number: '03',
    iconName: 'HeartHandshake',
    title: '未経験から始められるサポート',
    descriptionNode: (
      <>
        初めてのお仕事で分からないことも、一つずつ丁寧に説明します。<span className="text-[#E84B78] font-bold">仕事内容や接客の基本を事前に確認</span>できるので、<span className="text-[#E84B78] font-bold">未経験の方も落ち着いてスタート</span>できます。
      </>
    ),
    appealPoints: [
      '仕事内容を丁寧に説明',
      '接客の基本を事前に確認',
      '分からないことを質問しやすい環境'
    ],
    image: '/images/reason_03_support_1794212921462.jpg'
  },
  {
    number: '04',
    iconName: 'Smile',
    title: 'いじめや派閥のない働きやすい環境',
    descriptionNode: (
      <>
        女の子同士の<span className="text-[#E84B78] font-bold">派閥やいじめ、ギスギスした人間関係がない</span>、気持ちよく働ける環境づくりを大切にしています。お互いを尊重し、初めての方も自然に馴染める雰囲気を目指しています。
      </>
    ),
    appealPoints: [
      '女の子同士の派閥やいじめを防ぐ職場づくり',
      'お互いを尊重できる人間関係',
      '初めての方も馴染みやすい雰囲気'
    ],
    image: '/images/reason_04_team_1794212945161.jpg'
  },
  {
    number: '05',
    iconName: 'Coins',
    title: '分かりやすい給与・待遇システム',
    descriptionNode: (
      <>
        <span className="text-[#E84B78] font-bold">報酬の仕組みや支払い条件を事前に分かりやすく</span>ご説明します。給与や待遇について疑問を残さず、納得したうえでお仕事を始められるようにしています。
      </>
    ),
    appealPoints: [
      '報酬システムを事前に説明',
      'バックや保証などの待遇を明確化',
      '支払い条件を事前に確認'
    ],
    image: '/images/reason_05_system_1794212982911.jpg'
  },
  {
    number: '06',
    iconName: 'ShieldCheck',
    title: 'プライバシーへの配慮',
    descriptionNode: (
      <>
        <span className="text-[#E84B78] font-bold">顔出しや個人情報</span>など、女性が気になるプライバシー面にも配慮しています。<span className="text-[#E84B78] font-bold">身バレが心配な方</span>にも、希望や事情を確認しながら対応できる環境づくりを大切にしています。
      </>
    ),
    appealPoints: [
      '顔出しに関する希望への配慮',
      '個人情報の適切な管理',
      'プライバシーを尊重した対応'
    ],
    image: '/images/reason_06_privacy_1794212999210.jpg'
  }
];

export default function Reasons({ content }: ReasonsProps) {
  // Always enforce exact prompt specifications for heading
  const subtitle = '飛田ガールズのこだわり';
  const title = '飛田ガールズが選ばれる6つの理由 ✨';
  const subdescription = '集客力・美容サポート・待遇・働きやすさ。女性が自分らしく働ける環境づくりを大切にしています。';

  return (
    <section className="py-16 md:py-24 bg-[#FFF8F9] relative overflow-hidden" id="reasons">
      {/* Decorative ambient blobs */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-[#FFE2EB]/30 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#FFF0F4]/40 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-[1140px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header: 中央揃え・濃いブラウン系・視認性の高い見出し */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          {/* 小見出し */}
          <div className="inline-flex items-center gap-1.5 bg-white text-[#E84B78] text-[12px] font-bold px-4 py-1.5 rounded-full mb-3 shadow-2xs border border-[#F3E1E6]">
            <LucideIcon name="Sparkles" size={13} className="text-[#E84B78]" />
            <span>{subtitle}</span>
          </div>

          {/* メインタイトル */}
          <h2 className="font-display font-black text-2xl sm:text-3xl md:text-4xl text-[#38242B] tracking-tight leading-tight mb-3">
            {title}
          </h2>

          {/* サブタイトル */}
          <p className="font-sans text-xs sm:text-sm md:text-[14.5px] text-[#66545A] leading-relaxed max-w-2xl mx-auto">
            {subdescription}
          </p>

          <div className="h-1 w-16 bg-gradient-to-r from-[#E84B78] to-[#F5A2B8] mx-auto rounded-full mt-4" />
        </div>

        {/* 3x2 Grid Cards: PC 3列×2段 / スマホ 1列 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-7">
          {REASONS_DATA.map((reason, idx) => (
            <motion.div
              key={reason.number}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.35, delay: idx * 0.05 }}
              className="group flex flex-col bg-white rounded-[20px] border border-[#F3E1E6] shadow-xs hover:shadow-md hover:border-[#E84B78]/40 transition-all duration-300 overflow-hidden h-full justify-between"
              id={`reason-item-${reason.number}`}
            >
              <div className="flex flex-col flex-1">
                {/* Visual Header Image: 16:9, 横幅いっぱい, 高さ約160px, 明るい自然光写真 */}
                <div className="relative w-full h-[160px] aspect-video overflow-hidden bg-[#FFF8F9]">
                  <img
                    src={reason.image}
                    alt={reason.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    loading="lazy"
                    decoding="async"
                    onError={(e) => {
                      const target = e.currentTarget as HTMLImageElement;
                      target.onerror = null;
                      target.src = '/images/tobita_beginner_support_1788153037569.jpg';
                    }}
                  />
                  
                  {/* Floating Number Badge: 画像左上に小さな白いラベル (POINT 01〜06) */}
                  <div className="absolute top-2.5 left-2.5 bg-white/95 backdrop-blur-xs text-[#E84B78] font-mono font-extrabold text-[11px] px-2.5 py-0.5 rounded-full shadow-2xs flex items-center gap-1 border border-white/90 tracking-wider">
                    <span className="text-[10px] text-[#888888] font-bold">POINT</span>
                    <span>{reason.number}</span>
                  </div>

                  {/* Icon badge floating on top right */}
                  <div className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-white/95 backdrop-blur-xs border border-white/90 flex items-center justify-center text-[#E84B78] shadow-2xs">
                    <LucideIcon name={reason.iconName} size={15} />
                  </div>
                </div>

                {/* Content body */}
                <div className="p-5 sm:p-6 flex flex-col flex-1 justify-between">
                  <div>
                    {/* Card Title: 濃いブラウン系・PC:18〜20px / スマホ:17〜18px */}
                    <h3 className="font-display font-bold text-[17px] sm:text-[18px] lg:text-[19px] text-[#38242B] leading-snug mb-2.5 group-hover:text-[#E84B78] transition-colors">
                      {reason.title}
                    </h3>

                    {/* Description: 読みやすいダークグレー・PC:14〜15px / スマホ:13〜14px・キーワードピンク強調 */}
                    <p className="font-sans text-[13px] sm:text-[14px] lg:text-[14.5px] text-[#66545A] leading-relaxed mb-4 min-h-[4.2rem]">
                      {reason.descriptionNode}
                    </p>
                  </div>

                  {/* 3つのアピールポイント（淡いピンク背景・PC:13px / スマホ:12〜13px・チェックマーク付き） */}
                  <div className="bg-[#FFF8F9] rounded-xl p-3 border border-[#F3E1E6] space-y-1.5 mt-auto">
                    {reason.appealPoints.map((point, pIdx) => (
                      <div key={pIdx} className="flex items-center gap-2 text-[12px] sm:text-[13px] text-[#38242B] font-medium leading-snug">
                        <span className="w-4 h-4 rounded-full bg-white text-[#E84B78] border border-[#F3E1E6] flex items-center justify-center shrink-0 text-[10px] font-black shadow-2xs">
                          ✓
                        </span>
                        <span>{point}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
