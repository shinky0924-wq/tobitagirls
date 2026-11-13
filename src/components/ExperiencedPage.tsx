/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import LucideIcon from './LucideIcon';
import { LINE_OFFICIAL_URL } from '../data';
import { updatePageJsonLd } from '../utils/jsonLd';

interface ExperiencedPageProps {
  onNavigateHome: () => void;
  onNavigateTopic?: (topicId: string) => void;
  onNavigateBlog?: (slug?: string) => void;
  onNavigateFaq?: () => void;
  onCtaclick: () => void;
  onInjectedScroll?: (msg: string) => void;
}

export default function ExperiencedPage({
  onNavigateHome,
  onNavigateTopic,
  onNavigateBlog,
  onNavigateFaq,
  onInjectedScroll,
}: ExperiencedPageProps) {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [activeCompareTab, setActiveCompareTab] = useState<'all' | 'cabaret' | 'soap' | 'delivery'>('all');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleLineClick = (messageText: string) => {
    if (onInjectedScroll) {
      onInjectedScroll(messageText);
    } else {
      window.open(LINE_OFFICIAL_URL, '_blank', 'noopener,noreferrer');
    }
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Update #seo-jsonld Structured Data for SEO without duplicating SSR script
  useEffect(() => {
    const schemaData = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'BreadcrumbList',
          '@id': 'https://tobitashinchi-recruit.com/experienced#breadcrumb',
          'itemListElement': [
            {
              '@type': 'ListItem',
              'position': 1,
              'name': '飛田新地求人トップ',
              'item': 'https://tobitashinchi-recruit.com/'
            },
            {
              '@type': 'ListItem',
              'position': 2,
              'name': '経験者・他業種からの移籍',
              'item': 'https://tobitashinchi-recruit.com/experienced'
            }
          ]
        },
        {
          '@type': 'FAQPage',
          '@id': 'https://tobitashinchi-recruit.com/experienced#faq',
          'mainEntity': EXPERIENCED_FAQS.slice(0, 10).map((item) => ({
            '@type': 'Question',
            'name': item.q,
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': item.a
            }
          }))
        }
      ]
    };

    updatePageJsonLd(schemaData);
  }, []);

  return (
    <div className="bg-[#FFF9FB] min-h-screen text-[#35313A] pb-24 pt-4 sm:pt-6 font-sans antialiased selection:bg-[#FCE8EF] selection:text-[#D94B7A]">
      
      {/* 1. パンくずリスト */}
      <div className="max-w-[1140px] mx-auto px-4 sm:px-6 mb-4">
        <nav aria-label="Breadcrumb" className="flex items-center text-xs">
          <ol className="flex items-center gap-1.5 flex-wrap text-[#85818A]">
            <li className="flex items-center gap-1">
              <a
                href="/"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigateHome();
                }}
                className="hover:text-[#D94B7A] font-bold flex items-center gap-1 text-[#35313A] hover:underline cursor-pointer"
              >
                <LucideIcon name="Home" size={13} className="text-[#D94B7A]" />
                <span>飛田新地求人（トップ）</span>
              </a>
            </li>
            <li className="text-[#85818A]">/</li>
            <li className="font-bold text-[#D94B7A]" aria-current="page">
              経験者・他業種からの移籍
            </li>
          </ol>
        </nav>
      </div>

      {/* クイック目次アンカーバー（スマホでも横スクロールで快適） */}
      <div className="max-w-[1140px] mx-auto px-4 sm:px-6 mb-6">
        <div className="flex items-center gap-2 overflow-x-auto py-1 scrollbar-none text-xs text-[#85818A]">
          <span className="font-bold text-[#35313A] whitespace-nowrap text-[11px] flex items-center gap-1">
            <LucideIcon name="Compass" size={13} className="text-[#D94B7A]" />
            ページ内目次:
          </span>
          <a
            href="#relief"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('relief');
            }}
            className="px-3 py-1.5 rounded-full bg-white hover:bg-[#FCE8EF] hover:text-[#D94B7A] border border-[#F0E5EA] whitespace-nowrap transition-colors cursor-pointer"
          >
            4つのストレス解放
          </a>
          <a
            href="#comparison"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('comparison');
            }}
            className="px-3 py-1.5 rounded-full bg-white hover:bg-[#FCE8EF] hover:text-[#D94B7A] border border-[#F0E5EA] whitespace-nowrap transition-colors cursor-pointer"
          >
            他業種との決定的な違い
          </a>
          <a
            href="#earning-system"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('earning-system');
            }}
            className="px-3 py-1.5 rounded-full bg-white hover:bg-[#FCE8EF] hover:text-[#D94B7A] border border-[#F0E5EA] whitespace-nowrap transition-colors cursor-pointer"
          >
            高日給の理由
          </a>
          <a
            href="#transfer-flow"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('transfer-flow');
            }}
            className="px-3 py-1.5 rounded-full bg-white hover:bg-[#FCE8EF] hover:text-[#D94B7A] border border-[#F0E5EA] whitespace-nowrap transition-colors cursor-pointer"
          >
            移籍の流れ
          </a>
          <a
            href="#checklist"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('checklist');
            }}
            className="px-3 py-1.5 rounded-full bg-white hover:bg-[#FCE8EF] hover:text-[#D94B7A] border border-[#F0E5EA] whitespace-nowrap transition-colors cursor-pointer"
          >
            移籍前チェック
          </a>
          <a
            href="#columns"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('columns');
            }}
            className="px-3 py-1.5 rounded-full bg-white hover:bg-[#FCE8EF] hover:text-[#D94B7A] border border-[#F0E5EA] whitespace-nowrap transition-colors cursor-pointer"
          >
            比較コラム
          </a>
          <a
            href="#faq"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('faq');
            }}
            className="px-3 py-1.5 rounded-full bg-white hover:bg-[#FCE8EF] hover:text-[#D94B7A] border border-[#F0E5EA] whitespace-nowrap transition-colors cursor-pointer"
          >
            よくある質問
          </a>
          <a
            href="#line-cta"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('line-cta');
            }}
            className="px-3 py-1.5 rounded-full bg-[#06C755]/10 text-[#059669] hover:bg-[#06C755] hover:text-white border border-[#06C755]/30 whitespace-nowrap font-bold transition-colors cursor-pointer"
          >
            LINE相談
          </a>
        </div>
      </div>

      <div className="max-w-[1140px] mx-auto px-4 sm:px-6 space-y-12 sm:space-y-16">

        {/* =========================================================
            SECTION 1: ファーストビュー全面改善
           ========================================================= */}
        <section className="bg-white rounded-3xl p-6 sm:p-9 md:p-12 border border-[#F0E5EA] shadow-2xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* 左側テキスト */}
            <div className="lg:col-span-7 space-y-5">
              
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold text-[#D94B7A] bg-[#FCE8EF] border border-[#F0E5EA] px-3.5 py-1 rounded-full inline-block">
                  経験者・他業種からの移籍
                </span>
                <span className="text-xs text-[#85818A] font-medium">キャバクラ・ソープ・デリヘル経験者へ</span>
              </div>

              {/* メインコピー（27〜30px） */}
              <h1 className="text-[27px] sm:text-[30px] font-black text-[#35313A] leading-[1.3] tracking-tight">
                営業LINEもお風呂洗いも、もう終わり。<br />
                <span className="text-[#D94B7A]">あなたの経験を、一番ストレスのない場所で活かす。</span>
              </h1>

              {/* サブコピー */}
              <p className="text-base sm:text-[16px] text-[#35313A] leading-relaxed font-normal">
                キャバクラ・ソープ・デリヘル・他店からの移籍希望者が多数活躍中。ネット顔出しなし・営業連絡禁止・売上50%即日全額日払い（天引き0円）。培った接客スキルを活かし、初日から日給10万〜18万円超を目指せます。
              </p>

              {/* 注記 */}
              <p className="text-[12px] sm:text-[13px] text-[#85818A] leading-relaxed">
                ※他店在籍中の方も秘密厳守でご相談いただけます。外部スカウトや他店とのしがらみは一切ありません。
              </p>

              {/* スマホ表示用：写真 */}
              <div className="lg:hidden my-4">
                <div className="relative rounded-2xl overflow-hidden border border-[#F0E5EA] bg-[#FFF9FB] shadow-xs">
                  <img
                    src="/images/tobita_experienced_cast_1792411797671.jpg"
                    alt="落ち着いた空間で働く経験者キャスト"
                    className="w-full h-[220px] object-cover"
                    loading="eager"
                  />
                  <div className="p-3 bg-white/95 border-t border-[#F0E5EA] text-[12px] text-[#85818A] flex items-center gap-1.5">
                    <LucideIcon name="ShieldCheck" size={14} className="text-[#D94B7A] shrink-0" />
                    <span>身バレ防止徹底・撮影禁止の料亭でストレスフリーに稼働</span>
                  </div>
                </div>
              </div>

              {/* 補足ポイント（3つの小さなバッジ） */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
                <div className="flex items-center gap-2 p-3 rounded-xl bg-[#FFF9FB] border border-[#F0E5EA]">
                  <div className="w-7 h-7 rounded-lg bg-[#FCE8EF] text-[#D94B7A] flex items-center justify-center shrink-0">
                    <LucideIcon name="PhoneOff" size={15} />
                  </div>
                  <span className="text-xs sm:text-[13px] font-bold text-[#35313A]">
                    営業LINE・<br className="hidden sm:inline" />連絡一切なし
                  </span>
                </div>

                <div className="flex items-center gap-2 p-3 rounded-xl bg-[#FFF9FB] border border-[#F0E5EA]">
                  <div className="w-7 h-7 rounded-lg bg-[#FCE8EF] text-[#D94B7A] flex items-center justify-center shrink-0">
                    <LucideIcon name="CameraOff" size={15} />
                  </div>
                  <span className="text-xs sm:text-[13px] font-bold text-[#35313A]">
                    Web写真・<br className="hidden sm:inline" />顔出し完全ゼロ
                  </span>
                </div>

                <div className="flex items-center gap-2 p-3 rounded-xl bg-[#FFF9FB] border border-[#F0E5EA]">
                  <div className="w-7 h-7 rounded-lg bg-[#FCE8EF] text-[#D94B7A] flex items-center justify-center shrink-0">
                    <LucideIcon name="Sparkles" size={15} />
                  </div>
                  <span className="text-xs sm:text-[13px] font-bold text-[#35313A]">
                    お風呂掃除・<br className="hidden sm:inline" />重労働なし
                  </span>
                </div>
              </div>

              {/* LINEボタン */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <a
                  href={LINE_OFFICIAL_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => {
                    e.preventDefault();
                    handleLineClick('【移籍・経験者ページからの相談】他業種からの移籍を検討しています。現在の待遇や日給の目安について相談したいです。');
                  }}
                  className="px-7 py-3.5 rounded-full bg-[#06C755] hover:bg-[#05b34c] text-white font-bold text-sm shadow-xs transition-all cursor-pointer flex items-center justify-center gap-2.5 text-center"
                >
                  <LucideIcon name="MessageCircle" size={18} />
                  <span>移籍・待遇についてLINEで質問してみる</span>
                </a>
                <span className="text-xs text-[#85818A] text-center sm:text-left">
                  ※秘密厳守・まずは条件確認だけでもOK
                </span>
              </div>

            </div>

            {/* 右側（PC用：写真） */}
            <div className="hidden lg:block lg:col-span-5">
              <div className="relative rounded-3xl overflow-hidden border border-[#F0E5EA] bg-[#FFF9FB] shadow-xs">
                <img
                  src="/images/tobita_experienced_cast_1792411797671.jpg"
                  alt="落ち着いた空間で働く経験者キャスト"
                  className="w-full h-[360px] object-cover"
                  loading="eager"
                />
                <div className="p-3.5 bg-white border-t border-[#F0E5EA] text-xs text-[#85818A] flex items-center gap-2">
                  <LucideIcon name="ShieldCheck" size={16} className="text-[#D94B7A] shrink-0" />
                  <span>ネット顔出し不要・街全体撮影禁止でプライバシーを完全保護</span>
                </div>
              </div>
            </div>

          </div>
        </section>


        {/* =========================================================
            SECTION 2: ファーストビュー直下の数字カード（4つの事実）
           ========================================================= */}
        <section className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
          
          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-[#F0E5EA] shadow-2xs space-y-2">
            <span className="text-xs text-[#85818A] block font-medium">移籍経験者の満足度</span>
            <div className="text-[26px] sm:text-[30px] font-black text-[#D94B7A] font-display tracking-tight">
              96<span className="text-base sm:text-lg font-bold text-[#35313A] ml-0.5">%以上</span>
            </div>
            <p className="text-[13px] text-[#35313A] leading-relaxed pt-1 border-t border-[#F0E5EA]/70">
              営業LINEの義務、写真公開のプレッシャー、お風呂洗いの重労働から解放されたと実感。
            </p>
          </div>

          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-[#F0E5EA] shadow-2xs space-y-2">
            <span className="text-xs text-[#85818A] block font-medium">即戦力の日給水準</span>
            <div className="text-[22px] sm:text-[26px] font-black text-[#D94B7A] font-display tracking-tight">
              10万〜18<span className="text-xs sm:text-sm font-bold text-[#35313A] ml-0.5">万円</span>
            </div>
            <p className="text-[13px] text-[#35313A] leading-relaxed pt-1 border-t border-[#F0E5EA]/70">
              培った接客マナーと愛嬌で初日から高回転。15〜20分の短時間接客で効率よく稼げます。
            </p>
          </div>

          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-[#F0E5EA] shadow-2xs space-y-2">
            <span className="text-xs text-[#85818A] block font-medium">Web顔写真公開</span>
            <div className="text-[26px] sm:text-[30px] font-black text-[#D94B7A] tracking-tight">
              完全ゼロ
            </div>
            <p className="text-[13px] text-[#35313A] leading-relaxed pt-1 border-t border-[#F0E5EA]/70">
              街全体が撮影禁止。WEBパネル写真やSNSへの顔出しは一切なく、過去の流出リスクも遮断。
            </p>
          </div>

          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-[#F0E5EA] shadow-2xs space-y-2">
            <span className="text-xs text-[#85818A] block font-medium">雑費・待機料控除</span>
            <div className="text-[26px] sm:text-[30px] font-black text-[#D94B7A] font-display tracking-tight">
              完全0<span className="text-base sm:text-lg font-bold text-[#35313A] ml-0.5">円</span>
            </div>
            <p className="text-[13px] text-[#35313A] leading-relaxed pt-1 border-t border-[#F0E5EA]/70">
              厚生費や罰金などの天引き一切なし。売上50%完全バックで、退勤時に全額現金手渡し。
            </p>
          </div>

        </section>


        {/* =========================================================
            SECTION 3: 他業種から移籍した女性が驚く「4つのストレス解放」
           ========================================================= */}
        <section id="relief" className="bg-white rounded-3xl p-6 sm:p-9 md:p-10 border border-[#F0E5EA] shadow-2xs scroll-mt-20">
          <div className="max-w-2xl mb-8">
            <span className="text-[11px] font-bold text-[#D94B7A] bg-[#FCE8EF] border border-[#F0E5EA] px-3.5 py-1 rounded-full inline-block mb-2">
              WHY SWITCH?
            </span>
            <h2 className="text-[21px] sm:text-[24px] font-black text-[#35313A] tracking-tight">
              他業種から移籍した女性が驚く「4つのストレス解放」
            </h2>
            <p className="text-xs sm:text-[14px] text-[#85818A] mt-2 leading-relaxed">
              キャバクラやソープ、デリヘルで消耗していた女性たちが、飛田新地に来て口を揃える納得の理由です。
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            
            {/* 01 */}
            <div className="p-5 sm:p-6 rounded-2xl bg-[#FFF9FB] border border-[#F0E5EA] space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-black text-[#D94B7A] bg-white px-2.5 py-1 rounded-md border border-[#F0E5EA]">
                  STRESS FREE 01
                </span>
                <div className="w-8 h-8 rounded-xl bg-[#FCE8EF] text-[#D94B7A] flex items-center justify-center">
                  <LucideIcon name="PhoneOff" size={16} />
                </div>
              </div>
              <h3 className="text-base sm:text-[18px] font-bold text-[#35313A]">
                休日の営業LINE・連絡拘束からの解放
              </h3>
              <p className="text-sm sm:text-[15px] text-[#85818A] leading-relaxed">
                キャバクラのように休みの日までお客さんへ営業LINEを送り続けたり、同伴やアフターに追われる拘束は一切ありません。料亭組合の規約で店外連絡が禁止されているため、退勤した瞬間に完全なオフとなりプライベートを満喫できます。
              </p>
            </div>

            {/* 02 */}
            <div className="p-5 sm:p-6 rounded-2xl bg-[#FFF9FB] border border-[#F0E5EA] space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-black text-[#D94B7A] bg-white px-2.5 py-1 rounded-md border border-[#F0E5EA]">
                  STRESS FREE 02
                </span>
                <div className="w-8 h-8 rounded-xl bg-[#FCE8EF] text-[#D94B7A] flex items-center justify-center">
                  <LucideIcon name="CameraOff" size={16} />
                </div>
              </div>
              <h3 className="text-base sm:text-[18px] font-bold text-[#35313A]">
                Webパネル写真・ネット身バレへの恐怖からの解放
              </h3>
              <p className="text-sm sm:text-[15px] text-[#85818A] leading-relaxed">
                風俗サイトやSNSに顔写真や動画、源氏名が掲載されることは永久にありません。街全体で撮影が禁止されており、来店順のフリー案内が基本のため、写真指名競争による精神的疲労もゼロです。本業や将来への影響を完全ガードします。
              </p>
            </div>

            {/* 03 */}
            <div className="p-5 sm:p-6 rounded-2xl bg-[#FFF9FB] border border-[#F0E5EA] space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-black text-[#D94B7A] bg-white px-2.5 py-1 rounded-md border border-[#F0E5EA]">
                  STRESS FREE 03
                </span>
                <div className="w-8 h-8 rounded-xl bg-[#FCE8EF] text-[#D94B7A] flex items-center justify-center">
                  <LucideIcon name="Sparkles" size={16} />
                </div>
              </div>
              <h3 className="text-base sm:text-[18px] font-bold text-[#35313A]">
                お風呂掃除・過酷な肉体労働からの解放
              </h3>
              <p className="text-sm sm:text-[15px] text-[#85818A] leading-relaxed">
                ソープランドのように重いお風呂掃除や介助で腰を痛めたり、塩素消毒で肌や髪が荒れる心配はありません。接客後のお部屋清掃やシーツ交換はすべて仲居さん（おばちゃん）が担当。女性は落ち着いた座敷で接客に専念できます。
              </p>
            </div>

            {/* 04 */}
            <div className="p-5 sm:p-6 rounded-2xl bg-[#FFF9FB] border border-[#F0E5EA] space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-black text-[#D94B7A] bg-white px-2.5 py-1 rounded-md border border-[#F0E5EA]">
                  STRESS FREE 04
                </span>
                <div className="w-8 h-8 rounded-xl bg-[#FCE8EF] text-[#D94B7A] flex items-center justify-center">
                  <LucideIcon name="Coins" size={16} />
                </div>
              </div>
              <h3 className="text-base sm:text-[18px] font-bold text-[#35313A]">
                不透明な天引き・雑費引かれ物からの解放
              </h3>
              <p className="text-sm sm:text-[15px] text-[#85818A] leading-relaxed">
                一般的な風俗店やキャバクラで引かれがちな「待機料」「厚生費」「パネル撮影代」「ヘアメイク代」「遅刻罰金」などは完全0円です。売上の50%がそのまま手取りとなり、退勤時にその日の稼ぎを全額現金手渡しで受け取れます。
              </p>
            </div>

          </div>
        </section>


        {/* =========================================================
            SECTION 4: 他業種との徹底比較表
           ========================================================= */}
        <section id="comparison" className="bg-white rounded-3xl p-6 sm:p-9 md:p-10 border border-[#F0E5EA] shadow-2xs scroll-mt-20">
          <div className="max-w-2xl mb-8">
            <span className="text-[11px] font-bold text-[#D94B7A] bg-[#FCE8EF] border border-[#F0E5EA] px-3.5 py-1 rounded-full inline-block mb-2">
              COMPARISON
            </span>
            <h2 className="text-[21px] sm:text-[24px] font-black text-[#35313A] tracking-tight">
              他業種との決定的な違い・比較表
            </h2>
            <p className="text-xs sm:text-[14px] text-[#85818A] mt-2 leading-relaxed">
              キャバクラ、ソープランド、デリヘルと飛田新地料亭の勤務条件を客観的に比較しました。
            </p>
          </div>

          {/* PC・タブレット向けテーブル */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm border-collapse">
              <thead>
                <tr className="border-b-2 border-[#F0E5EA]">
                  <th className="p-3.5 font-bold text-[#85818A] w-1/5">比較項目</th>
                  <th className="p-3.5 font-black text-[#D94B7A] bg-[#FCE8EF]/50 rounded-t-xl w-1/4">
                    飛田新地（料亭直営）
                  </th>
                  <th className="p-3.5 font-bold text-[#35313A] w-1/5">キャバクラ・ラウンジ</th>
                  <th className="p-3.5 font-bold text-[#35313A] w-1/5">ソープランド</th>
                  <th className="p-3.5 font-bold text-[#35313A] w-1/5">デリヘル・ヘルス</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F0E5EA]">
                {COMPARISON_ROWS.map((row, idx) => (
                  <tr key={idx} className="hover:bg-[#FFF9FB]/60 transition-colors">
                    <td className="p-3.5 font-bold text-[#35313A] whitespace-nowrap">{row.item}</td>
                    <td className="p-3.5 font-bold text-[#D94B7A] bg-[#FCE8EF]/30 font-medium">
                      {row.tobita}
                    </td>
                    <td className="p-3.5 text-[#85818A]">{row.cabaret}</td>
                    <td className="p-3.5 text-[#85818A]">{row.soap}</td>
                    <td className="p-3.5 text-[#85818A]">{row.delivery}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* スマホ向けカード表示 */}
          <div className="md:hidden space-y-4">
            {COMPARISON_ROWS.map((row, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-[#FFF9FB] border border-[#F0E5EA] space-y-2.5">
                <div className="flex items-center justify-between pb-2 border-b border-[#F0E5EA]">
                  <span className="text-xs font-bold text-[#85818A]">比較項目</span>
                  <span className="text-sm font-bold text-[#35313A]">{row.item}</span>
                </div>

                <div className="p-3 rounded-xl bg-white border border-[#D94B7A]/30 space-y-1">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-[#D94B7A]">
                    <LucideIcon name="CheckCircle" size={13} />
                    <span>飛田新地（当店）</span>
                  </div>
                  <p className="text-sm font-bold text-[#35313A]">{row.tobita}</p>
                </div>

                <div className="grid grid-cols-3 gap-2 text-[11px] text-[#85818A] pt-1">
                  <div className="p-2 rounded-lg bg-white border border-[#F0E5EA]">
                    <span className="block font-bold text-[#35313A] mb-0.5">キャバクラ</span>
                    <span>{row.cabaret}</span>
                  </div>
                  <div className="p-2 rounded-lg bg-white border border-[#F0E5EA]">
                    <span className="block font-bold text-[#35313A] mb-0.5">ソープ</span>
                    <span>{row.soap}</span>
                  </div>
                  <div className="p-2 rounded-lg bg-white border border-[#F0E5EA]">
                    <span className="block font-bold text-[#35313A] mb-0.5">デリヘル</span>
                    <span>{row.delivery}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-5 p-3.5 bg-zinc-50 rounded-xl border border-[#F0E5EA] text-xs text-[#85818A] leading-relaxed">
            ※上記は一般的な他業種店舗との比較です。当店では売上50%完全バック・全額即日日払い手渡し・雑費天引き0円を厳格に順守しています。
          </div>
        </section>


        {/* =========================================================
            SECTION 5: 経験者が初日から日給10万〜18万円以上を稼げる理由
           ========================================================= */}
        <section id="earning-system" className="space-y-6 scroll-mt-20">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-[11px] font-bold text-[#D94B7A] bg-[#FCE8EF] border border-[#F0E5EA] px-3.5 py-1 rounded-full inline-block">
              EARNING POWER
            </span>
            <h2 className="text-[21px] sm:text-[24px] font-black text-[#35313A] tracking-tight">
              経験者が初日から日給10万〜18万円を稼げる理由
            </h2>
            <p className="text-xs sm:text-[14px] text-[#85818A] leading-relaxed">
              なぜ他業種を経験した女性は、初日から圧倒的な高日給を叩き出せるのか？その仕組みを解説します。
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            
            <div className="bg-white p-5 sm:p-6 rounded-2xl border border-[#F0E5EA] shadow-2xs space-y-2.5">
              <div className="flex items-center gap-2 text-xs font-bold text-[#D94B7A]">
                <LucideIcon name="TrendingUp" size={15} />
                <span>理由 01</span>
              </div>
              <h3 className="text-base sm:text-[17px] font-bold text-[#35313A]">
                ネット指名に頼らない圧倒的な客数と回転力
              </h3>
              <p className="text-sm sm:text-[15px] text-[#85818A] leading-relaxed">
                飛田新地は毎日全国から多数のお客様が訪れる日本屈指の料亭街です。ネット指名がなくても、通りを歩くお客様が次々にご来店されるため、待機部屋で暇を持て余すことなく高稼働を維持できます。
              </p>
            </div>

            <div className="bg-white p-5 sm:p-6 rounded-2xl border border-[#F0E5EA] shadow-2xs space-y-2.5">
              <div className="flex items-center gap-2 text-xs font-bold text-[#D94B7A]">
                <LucideIcon name="Clock" size={15} />
                <span>理由 02</span>
              </div>
              <h3 className="text-base sm:text-[17px] font-bold text-[#35313A]">
                1回15〜20分の短時間接客で疲れない
              </h3>
              <p className="text-sm sm:text-[15px] text-[#85818A] leading-relaxed">
                60分や90分のロング接客と異なり、1回の接客時間が非常に短いため、体力的な負担が極めて少なく済みます。短時間で集中して接客できるため、1日15〜25本を無理なく重ねることが可能です。
              </p>
            </div>

            <div className="bg-white p-5 sm:p-6 rounded-2xl border border-[#F0E5EA] shadow-2xs space-y-2.5">
              <div className="flex items-center gap-2 text-xs font-bold text-[#D94B7A]">
                <LucideIcon name="HeartHandshake" size={15} />
                <span>理由 03</span>
              </div>
              <h3 className="text-base sm:text-[17px] font-bold text-[#35313A]">
                仲居さん（おばちゃん）の呼び込み力
              </h3>
              <p className="text-sm sm:text-[15px] text-[#85818A] leading-relaxed">
                女の子が自ら客引きをする必要はありません。経験豊富な仲居さんが前を通るお客様へ声掛けを行い、お部屋へと案内してくれます。女の子は笑顔と挨拶だけでスムーズに接客に入れます。
              </p>
            </div>

            <div className="bg-white p-5 sm:p-6 rounded-2xl border border-[#F0E5EA] shadow-2xs space-y-2.5">
              <div className="flex items-center gap-2 text-xs font-bold text-[#D94B7A]">
                <LucideIcon name="BadgePercent" size={15} />
                <span>理由 04</span>
              </div>
              <h3 className="text-base sm:text-[17px] font-bold text-[#35313A]">
                外国人手当（+2,500円/回）やチップは全額手渡し
              </h3>
              <p className="text-sm sm:text-[15px] text-[#85818A] leading-relaxed">
                通常コース報酬（売上50%）に加え、外国人のお客様を担当された際は1回ごとに+2,500円の手当が上乗せ支給されます。お客様からいただいたチップもお店の天引きなく全額手渡しされます。
              </p>
            </div>

          </div>
        </section>


        {/* =========================================================
            SECTION 6: 前の店に知られずスムーズに移籍する3ステップ
           ========================================================= */}
        <section id="transfer-flow" className="bg-white rounded-3xl p-6 sm:p-9 md:p-10 border border-[#F0E5EA] shadow-2xs scroll-mt-20">
          <div className="max-w-2xl mb-8">
            <span className="text-[11px] font-bold text-[#D94B7A] bg-[#FCE8EF] border border-[#F0E5EA] px-3.5 py-1 rounded-full inline-block mb-2">
              SAFE TRANSFER STEPS
            </span>
            <h2 className="text-[21px] sm:text-[24px] font-black text-[#35313A] tracking-tight">
              前の店に知られずスムーズに移籍する3ステップ
            </h2>
            <p className="text-xs sm:text-[14px] text-[#85818A] mt-2 leading-relaxed">
              現在他店に在籍中の方も、秘密厳守で安心して移籍準備を進めていただけます。
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
            
            {/* STEP 1 */}
            <div className="p-5 sm:p-6 rounded-2xl bg-[#FFF9FB] border border-[#F0E5EA] flex flex-col justify-between relative space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-black text-white bg-[#D94B7A] px-2.5 py-0.5 rounded">
                    STEP 1
                  </span>
                  <span className="text-xs text-[#85818A] font-medium">秘密厳守</span>
                </div>
                <div className="w-10 h-10 rounded-xl bg-[#FCE8EF] text-[#D94B7A] flex items-center justify-center">
                  <LucideIcon name="MessageSquareLock" size={20} />
                </div>
                <h3 className="text-base sm:text-[18px] font-bold text-[#35313A]">
                  LINEでの事前相談・条件確認
                </h3>
                <ul className="text-xs sm:text-[13px] text-[#85818A] space-y-1.5 leading-relaxed">
                  <li className="flex items-start gap-1.5">
                    <span className="text-[#D94B7A] font-bold">・</span>
                    <span>現在の店舗に知られず匿名で相談OK</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="text-[#D94B7A] font-bold">・</span>
                    <span>希望の出勤ペースや日給目安の確認</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="text-[#D94B7A] font-bold">・</span>
                    <span>寮・交通費・身バレ対策の事前質問</span>
                  </li>
                </ul>
              </div>
              <div className="p-3 bg-white rounded-xl border border-[#F0E5EA] text-[11px] text-[#85818A]">
                前の店を辞める前のご相談も大歓迎です。強引な勧誘や引き抜きは一切行いません。
              </div>
            </div>

            {/* STEP 2 */}
            <div className="p-5 sm:p-6 rounded-2xl bg-[#FFF9FB] border border-[#F0E5EA] flex flex-col justify-between relative space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-black text-white bg-[#D94B7A] px-2.5 py-0.5 rounded">
                    STEP 2
                  </span>
                  <span className="text-xs text-[#85818A] font-medium">手ぶらOK</span>
                </div>
                <div className="w-10 h-10 rounded-xl bg-[#FCE8EF] text-[#D94B7A] flex items-center justify-center">
                  <LucideIcon name="UserCheck" size={20} />
                </div>
                <h3 className="text-base sm:text-[18px] font-bold text-[#35313A]">
                  即日面接＆体験入店（体入）
                </h3>
                <ul className="text-xs sm:text-[13px] text-[#85818A] space-y-1.5 leading-relaxed">
                  <li className="flex items-start gap-1.5">
                    <span className="text-[#D94B7A] font-bold">・</span>
                    <span>履歴書不要・私服のまま手ぶらで来訪可能</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="text-[#D94B7A] font-bold">・</span>
                    <span>女性スタッフによる丁寧な店舗案内</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="text-[#D94B7A] font-bold">・</span>
                    <span>1日体験してみて合わなければ即日終了OK</span>
                  </li>
                </ul>
              </div>
              <div className="p-3 bg-white rounded-xl border border-[#F0E5EA] text-[11px] text-[#85818A]">
                体験入店の日給も退勤時に売上50%を全額現金手渡し。合わない場合の無理な引き止めはゼロです。
              </div>
            </div>

            {/* STEP 3 */}
            <div className="p-5 sm:p-6 rounded-2xl bg-[#FFF9FB] border border-[#F0E5EA] flex flex-col justify-between relative space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-black text-white bg-[#D94B7A] px-2.5 py-0.5 rounded">
                    STEP 3
                  </span>
                  <span className="text-xs text-[#85818A] font-medium">即日スタート</span>
                </div>
                <div className="w-10 h-10 rounded-xl bg-[#FCE8EF] text-[#D94B7A] flex items-center justify-center">
                  <LucideIcon name="Coins" size={20} />
                </div>
                <h3 className="text-base sm:text-[18px] font-bold text-[#35313A]">
                  本入店・即日全額日払い
                </h3>
                <ul className="text-xs sm:text-[13px] text-[#85818A] space-y-1.5 leading-relaxed">
                  <li className="flex items-start gap-1.5">
                    <span className="text-[#D94B7A] font-bold">・</span>
                    <span>完全自由シフト（週1日〜・短時間もOK）</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="text-[#D94B7A] font-bold">・</span>
                    <span>オートロック個室マンション寮の即日利用</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="text-[#D94B7A] font-bold">・</span>
                    <span>地方からの交通費は初日全額現金精算</span>
                  </li>
                </ul>
              </div>
              <div className="p-3 bg-white rounded-xl border border-[#F0E5EA] text-[11px] text-[#85818A]">
                経験者ならではの気配りを活かして、初日から日給10万円超を達成する方が多数いらっしゃいます。
              </div>
            </div>

          </div>
        </section>


        {/* =========================================================
            SECTION 7: 移籍前に確認しておきたいチェックリスト
           ========================================================= */}
        <section id="checklist" className="space-y-6 scroll-mt-20">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-[11px] font-bold text-[#D94B7A] bg-[#FCE8EF] border border-[#F0E5EA] px-3.5 py-1 rounded-full inline-block">
              CHECKLIST
            </span>
            <h2 className="text-[21px] sm:text-[24px] font-black text-[#35313A] tracking-tight">
              移籍前に確認しておきたい4つのポイント
            </h2>
            <p className="text-xs sm:text-[14px] text-[#85818A] leading-relaxed">
              トラブルなく円満に環境を変え、安心して新生活を始めるための確認項目です。
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            
            <div className="bg-white p-5 sm:p-6 rounded-2xl border border-[#F0E5EA] shadow-2xs space-y-2.5">
              <div className="flex items-center gap-2 text-xs font-bold text-[#D94B7A]">
                <LucideIcon name="ShieldAlert" size={15} />
                <span>前店とのトラブル回避</span>
              </div>
              <h3 className="text-base sm:text-[17px] font-bold text-[#35313A]">
                外部スカウトや他店とは一切無縁の直営独立環境
              </h3>
              <p className="text-sm sm:text-[15px] text-[#85818A] leading-relaxed">
                飛田新地は料亭組合が統括する独自の伝統街であり、外部のスカウトや他地域の風俗グループとは一切提携していません。個人情報は厳重に施錠管理され、前の店にバレる心配はありません。
              </p>
            </div>

            <div className="bg-white p-5 sm:p-6 rounded-2xl border border-[#F0E5EA] shadow-2xs space-y-2.5">
              <div className="flex items-center gap-2 text-xs font-bold text-[#D94B7A]">
                <LucideIcon name="Home" size={15} />
                <span>住まい・寮の利用</span>
              </div>
              <h3 className="text-base sm:text-[17px] font-bold text-[#35313A]">
                家具家電付きオートロック個室マンション寮完備
              </h3>
              <p className="text-sm sm:text-[15px] text-[#85818A] leading-relaxed">
                敷金・礼金0円で即日入居可能。テレビ・冷蔵庫・洗濯機・エアコン・Wi-Fi完備でカバン1つですぐに新生活を始められます。店舗徒歩圏内で防犯性も抜群です。
              </p>
            </div>

            <div className="bg-white p-5 sm:p-6 rounded-2xl border border-[#F0E5EA] shadow-2xs space-y-2.5">
              <div className="flex items-center gap-2 text-xs font-bold text-[#D94B7A]">
                <LucideIcon name="Train" size={15} />
                <span>交通費サポート</span>
              </div>
              <h3 className="text-base sm:text-[17px] font-bold text-[#35313A]">
                遠方・地方からの往復交通費を全額支給
              </h3>
              <p className="text-sm sm:text-[15px] text-[#85818A] leading-relaxed">
                東京、名古屋、福岡、北海道など全国からの出稼ぎ・移籍希望者へ、新幹線・飛行機・夜行バスの実費往復交通費を全額支給いたします。領収書があれば初日稼働後に現金精算手渡し。
              </p>
            </div>

            <div className="bg-white p-5 sm:p-6 rounded-2xl border border-[#F0E5EA] shadow-2xs space-y-2.5">
              <div className="flex items-center gap-2 text-xs font-bold text-[#D94B7A]">
                <LucideIcon name="FileText" size={15} />
                <span>税金・身バレ対策</span>
              </div>
              <h3 className="text-base sm:text-[17px] font-bold text-[#35313A]">
                副業・昼職掛け持ちの住民税普通徴収手続きサポート
              </h3>
              <p className="text-sm sm:text-[15px] text-[#85818A] leading-relaxed">
                昼職や本業の会社に副業が知られないよう、住民税を自分で納付する「普通徴収」のやり方や確定申告の基本ルールを専任スタッフが分かりやすくご案内します。
              </p>
            </div>

          </div>
        </section>


        {/* =========================================================
            SECTION 8: 経験者向けおすすめコラム
           ========================================================= */}
        <section id="columns" className="bg-white rounded-3xl p-6 sm:p-9 md:p-10 border border-[#F0E5EA] shadow-2xs scroll-mt-20">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
            <div>
              <span className="text-[11px] font-bold text-[#D94B7A] bg-[#FCE8EF] border border-[#F0E5EA] px-3.5 py-1 rounded-full inline-block mb-2">
                COLUMNS
              </span>
              <h2 className="text-[21px] sm:text-[24px] font-black text-[#35313A] tracking-tight">
                他業種・移籍を検討中の方に役立つコラム
              </h2>
              <p className="text-xs sm:text-[14px] text-[#85818A] mt-1 leading-relaxed">
                キャバクラや風俗との詳しい違いや、移籍組のリアルな体験談をチェック。
              </p>
            </div>

            {onNavigateBlog && (
              <a
                href="/blog"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigateBlog();
                }}
                className="text-xs font-bold text-[#D94B7A] hover:underline flex items-center gap-1 cursor-pointer self-start sm:self-auto"
              >
                <span>コラム一覧を見る</span>
                <LucideIcon name="ChevronRight" size={14} />
              </a>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {FEATURED_EXPERIENCED_ARTICLES.map((article) => (
              <a
                key={article.slug}
                href={`/blog/${article.slug}`}
                onClick={(e) => {
                  e.preventDefault();
                  onNavigateBlog && onNavigateBlog(article.slug);
                }}
                className="bg-[#FFF9FB] rounded-2xl border border-[#F0E5EA] overflow-hidden hover:border-[#D94B7A]/50 transition-all cursor-pointer group flex flex-col justify-between"
              >
                <div className="p-4 sm:p-5 space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold bg-[#FCE8EF] text-[#D94B7A] px-2 py-0.5 rounded">
                      他業種比較
                    </span>
                    <span className="text-[11px] text-[#85818A]">{article.readTime}</span>
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-[#35313A] leading-snug group-hover:text-[#D94B7A] transition-colors line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="text-xs text-[#85818A] leading-relaxed line-clamp-2">
                    {article.summary}
                  </p>
                </div>
                <div className="px-4 sm:px-5 pb-4 pt-1 flex items-center text-xs font-bold text-[#D94B7A] gap-1 group-hover:underline">
                  <span>記事を読む</span>
                  <LucideIcon name="ChevronRight" size={13} />
                </div>
              </a>
            ))}
          </div>
        </section>


        {/* =========================================================
            SECTION 9: 経験者・他業種移籍者からよくある質問（FAQ）
           ========================================================= */}
        <section id="faq" className="space-y-6 scroll-mt-20">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-[11px] font-bold text-[#D94B7A] bg-[#FCE8EF] border border-[#F0E5EA] px-3.5 py-1 rounded-full inline-block">
              Q&A
            </span>
            <h2 className="text-[21px] sm:text-[24px] font-black text-[#35313A] tracking-tight">
              経験者・他業種からの移籍に関するよくある質問
            </h2>
            <p className="text-xs sm:text-[14px] text-[#85818A] leading-relaxed">
              他店や他業種を経験された女性から特によくいただく10の疑問に、結論からお答えします。
            </p>
          </div>

          <div className="bg-white rounded-3xl p-5 sm:p-8 border border-[#F0E5EA] shadow-2xs divide-y divide-[#F0E5EA]">
            {EXPERIENCED_FAQS.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div key={idx} className="py-4 first:pt-0 last:pb-0">
                  <button
                    type="button"
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full text-left flex items-start justify-between gap-4 py-1 text-sm sm:text-base font-bold text-[#35313A] hover:text-[#D94B7A] cursor-pointer transition-colors"
                  >
                    <span className="flex items-start gap-2.5">
                      <span className="text-[#D94B7A] font-mono font-bold shrink-0">Q.</span>
                      <span>{faq.q}</span>
                    </span>
                    <LucideIcon
                      name={isOpen ? 'ChevronUp' : 'ChevronDown'}
                      size={18}
                      className="text-[#85818A] shrink-0 mt-0.5"
                    />
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="pt-3 pb-1 pl-6 sm:pl-7 pr-2 text-xs sm:text-[14px] text-[#35313A] leading-relaxed">
                          <div className="p-3.5 rounded-xl bg-[#FFF9FB] border border-[#F0E5EA]">
                            <p className="font-medium">{faq.a}</p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          {onNavigateFaq && (
            <div className="text-center pt-2">
              <a
                href="/faq"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigateFaq();
                }}
                className="text-xs font-bold text-[#D94B7A] hover:underline inline-flex items-center gap-1 cursor-pointer"
              >
                <span>よくある質問（FAQ全問）を見る</span>
                <LucideIcon name="ChevronRight" size={14} />
              </a>
            </div>
          )}
        </section>


        {/* =========================================================
            SECTION 10: LINE相談エリア
           ========================================================= */}
        <section id="line-cta" className="bg-gradient-to-b from-[#FFF9FB] to-white rounded-3xl p-6 sm:p-10 border-2 border-[#F0E5EA] text-center space-y-5 scroll-mt-20">
          <div className="w-12 h-12 rounded-2xl bg-[#06C755]/15 text-[#06C755] flex items-center justify-center mx-auto">
            <LucideIcon name="MessageCircle" size={24} />
          </div>

          <div className="max-w-xl mx-auto space-y-2">
            <h2 className="text-[20px] sm:text-[23px] font-black text-[#35313A] tracking-tight">
              他店からの移籍・条件相談も、秘密厳守でLINE相談できます
            </h2>
            <p className="text-xs sm:text-sm text-[#85818A] leading-relaxed pt-1">
              前の店に知られたくない、今の給与や待遇と比較したいなど、気になることだけでも大歓迎です。<br />
              専任女性スタッフが個別に対応し、他店との条件の違いを分かりやすくお答えします。
            </p>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href={LINE_OFFICIAL_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => {
                e.preventDefault();
                handleLineClick('【移籍・経験者ページからの相談】他業種からの移籍を検討しています。現在の待遇や日給の目安について相談したいです。');
              }}
              className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#06C755] hover:bg-[#05b34c] text-white font-bold text-sm shadow-md hover:shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <LucideIcon name="MessageCircle" size={18} />
              <span>移籍についてLINEで個別相談する</span>
            </a>
            <span className="text-xs font-bold text-[#D94B7A] bg-[#FCE8EF] px-3.5 py-1.5 rounded-full border border-[#F0E5EA]">
              他店在籍中・相談のみでもOK
            </span>
          </div>
        </section>


        {/* =========================================================
            SECTION 11: 関連ページへの内部リンク
           ========================================================= */}
        <section className="pt-4 border-t border-[#F0E5EA]">
          <h3 className="text-xs font-bold text-[#85818A] mb-3 text-center">
            関連する情報ページ
          </h3>
          <div className="flex flex-wrap items-center justify-center gap-2 text-xs">
            {onNavigateTopic && (
              <>
                <a
                  href="/job"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigateTopic('job');
                  }}
                  className="px-3.5 py-1.5 rounded-full bg-white hover:bg-[#FCE8EF] hover:text-[#D94B7A] border border-[#F0E5EA] transition-colors cursor-pointer"
                >
                  お仕事内容
                </a>
                <a
                  href="/salary"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigateTopic('salary');
                  }}
                  className="px-3.5 py-1.5 rounded-full bg-white hover:bg-[#FCE8EF] hover:text-[#D94B7A] border border-[#F0E5EA] transition-colors cursor-pointer"
                >
                  給料・待遇
                </a>
                <a
                  href="/beginner"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigateTopic('beginner');
                  }}
                  className="px-3.5 py-1.5 rounded-full bg-white hover:bg-[#FCE8EF] hover:text-[#D94B7A] border border-[#F0E5EA] transition-colors cursor-pointer"
                >
                  未経験向けガイド
                </a>
                <a
                  href="/safety"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigateTopic('safety');
                  }}
                  className="px-3.5 py-1.5 rounded-full bg-white hover:bg-[#FCE8EF] hover:text-[#D94B7A] border border-[#F0E5EA] transition-colors cursor-pointer"
                >
                  安全・身バレ対策
                </a>
              </>
            )}
            {onNavigateFaq && (
              <a
                href="/faq"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigateFaq();
                }}
                className="px-3.5 py-1.5 rounded-full bg-white hover:bg-[#FCE8EF] hover:text-[#D94B7A] border border-[#F0E5EA] transition-colors cursor-pointer"
              >
                よくある質問
              </a>
            )}
          </div>
        </section>

      </div>
    </div>
  );
}

// 他業種との詳細比較テーブルデータ
const COMPARISON_ROWS = [
  {
    item: '営業LINE・店外連絡',
    tobita: '完全禁止（店外一切不要）',
    cabaret: '必須（休日もLINE連絡義務）',
    soap: '店舗により指名営業あり',
    delivery: '待機中の営業連絡あり'
  },
  {
    item: '写真・ネット顔出し',
    tobita: '完全非掲載（撮影禁止）',
    cabaret: '宣材写真・SNS顔出し必須',
    soap: 'Webパネル・雑誌掲載',
    delivery: 'Web写真・動画掲載あり'
  },
  {
    item: '肉体負担・お風呂洗い',
    tobita: '座敷で短時間（重労働なし）',
    cabaret: '立ち仕事・ヒール疲労',
    soap: '重いお風呂洗い・介助業務',
    delivery: '移動・長期待機による疲労'
  },
  {
    item: 'お酒の飲酒',
    tobita: '完全不要（ソフトドリンク可）',
    cabaret: '必須（二日酔い・体調リスク）',
    soap: '原則不要',
    delivery: '原則不要'
  },
  {
    item: '1回の接客時間',
    tobita: '15〜20分の短時間集中',
    cabaret: '60〜90分＋同伴アフター',
    soap: '60〜120分の長時間',
    delivery: '60〜90分＋長期待機'
  },
  {
    item: '天引き・雑費控除',
    tobita: '完全0円（一切引かれず）',
    cabaret: 'ヘアメイク代・厚生費引かれ大',
    soap: '待機料・システム料引かれあり',
    delivery: '雑費・送迎費引かれあり'
  },
  {
    item: '報酬支給・日払い',
    tobita: '売上50%完全即日手渡し',
    cabaret: '時給＋小歩合（締め日払い多）',
    soap: '45〜50%（締め払い有）',
    delivery: '40〜45%（雑費引後）'
  },
  {
    item: '客引き・呼び込み',
    tobita: '仲居さんが全担当（女の子0）',
    cabaret: 'キャッチ・同伴ノルマあり',
    soap: '店舗集客',
    delivery: '店舗集客'
  }
];

// 経験者向けFAQ（結論ファースト）
const EXPERIENCED_FAQS = [
  {
    q: '過去に風俗やキャバクラで働いていたことを隠す必要はありますか？',
    a: '隠す必要は全くありません。接客の基礎知識や気配りが身についている方は即戦力として初日から大活躍されています。もちろんご自身から話したくない場合は無理にお話しいただく必要もありません。'
  },
  {
    q: '他店からの移籍で、前の店やスカウトとトラブルになりませんか？',
    a: '一切トラブルになりません。飛田新地は料亭組合が統括する独立した伝統街であり、外部のスカウトや他地域の風俗店とは一切関係がありません。個人情報は施錠管理され、秘密は厳重に守られます。'
  },
  {
    q: '宣材写真やWebパネル指名は本当にないのですか？',
    a: 'はい、一切ありません。街全体で写真・動画撮影が禁止されており、ホームページやSNSにキャストの顔写真・プロフィールが出ることはありません。ネット上に情報が残る心配もゼロです。'
  },
  {
    q: 'お風呂掃除や長時間の体力仕事は本当にありませんか？',
    a: 'ありません。接客は落ち着いた和室で行われ、お部屋のシーツ交換や清掃はすべて仲居さん（おばちゃん）が担当します。ソープランドのようなお風呂介助や長時間の肉体労働はありません。'
  },
  {
    q: '営業LINEや電話番号交換を強要されることはありませんか？',
    a: '絶対にありません。料亭組合の規約により、お客様との個人的な連絡先交換（LINE・電話番号・SNS）は厳しく禁止されています。休日に営業連絡を送るストレスは一切ありません。'
  },
  {
    q: '他業種のような待機料や厚生費、罰金の天引きはありますか？',
    a: '完全0円です。当店では待機料、厚生費、衣装レンタル代、遅刻罰金などの名目での天引きは一切行っていません。売上の50%がそのまま退勤時に現金で全額手渡されます。'
  },
  {
    q: '地方や他地域からの移籍で交通費や寮は用意してもらえますか？',
    a: 'はい、完備しています。全国からの移籍希望者へ往復交通費（新幹線・飛行機等）を全額支給し、敷金・礼金0円の家具家電付きオートロック個室寮に即日入居いただけます。'
  },
  {
    q: '昼職や副業と掛け持ちしながら週末だけ移籍勤務できますか？',
    a: 'もちろん可能です。完全自由出勤制のため、「金曜夜と土日だけ」「月数回だけ」といったシフトも柔軟に対応しています。本業に知られない住民税普通徴収手続きもサポートします。'
  },
  {
    q: '30代・40代でも他店からの移籍で需要はありますか？',
    a: '非常に高い需要があります。飛田新地には落ち着いた大人の女性や包容力のある女性を好まれるお客様が多数いらっしゃり、年齢を重ねた経験者キャストがトップクラスの売上を上げています。'
  },
  {
    q: '1日の体験入店で手応えを見てから移籍を決めてもいいですか？',
    a: 'はい、大歓迎です。まずは1日体験入店で飛田新地の客足や働きやすさを実感していただき、合わないと感じたらその日で終了しても全額日払いで受け取れます。'
  }
];

// 経験者向けおすすめコラム記事
const FEATURED_EXPERIENCED_ARTICLES = [
  {
    title: '【キャバクラ・風俗との違い】経験者が「飛田新地が一番楽」と口を揃える納得の理由',
    slug: 'tobitashinchi-vs-other-night-jobs',
    readTime: '4分で読める',
    summary: 'お酒不要・営業LINEなし・お風呂洗いなし・売上50%即日手渡しの決定的なメリットを他業種と比較。'
  },
  {
    title: '【30代・40代の飛田新地求人】年齢を気にせず愛嬌と包容力でしっかり稼げる理由',
    slug: 'tobitashinchi-mature-ladies-success',
    readTime: '4分で読める',
    summary: 'キャバクラ等で年齢の壁を感じた女性が、飛田新地に移籍して安定して高収入を得られる理由。'
  },
  {
    title: '【お仕事内容ガイド】出勤から退勤までのリアルな1日の流れと仲居さんの役割',
    slug: 'tobita-job-guide',
    readTime: '3分で読める',
    summary: '呼び込みや清掃はすべて仲居さんが担当。女性は座敷で笑顔で手を振って接客するだけ。'
  }
];
