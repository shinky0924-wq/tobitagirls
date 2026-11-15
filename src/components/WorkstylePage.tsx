/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import LucideIcon from './LucideIcon';
import { LINE_OFFICIAL_URL } from '../data';
import { updatePageJsonLd } from '../utils/jsonLd';

interface WorkstylePageProps {
  onNavigateHome: () => void;
  onNavigateTopic?: (topicId: string) => void;
  onNavigateBlog?: (slug?: string) => void;
  onNavigateFaq?: () => void;
  onCtaclick: () => void;
  onInjectedScroll?: (msg: string) => void;
}

const HERO_IMG = '/images/workstyle_hero_morning_1794549297942.jpg';
const HERO_IMG_FALLBACK = '/assets/images/workstyle_hero_morning_1794549297942.jpg';

const DAYTIME_IMG = '/images/workstyle_cafe_daytime_1794549298236.jpg';
const DAYTIME_IMG_FALLBACK = '/assets/images/workstyle_cafe_daytime_1794549298236.jpg';

const EVENING_IMG = '/images/workstyle_evening_interior_1794558812175.jpg';
const EVENING_IMG_FALLBACK = '/assets/images/workstyle_evening_interior_1794558812175.jpg';

const LONGSHIFT_IMG = '/images/workstyle_longshift_lifestyle_1794558813630.jpg';
const LONGSHIFT_IMG_FALLBACK = '/assets/images/workstyle_longshift_lifestyle_1794558813630.jpg';

interface ShiftPattern {
  id: string;
  code: 'A' | 'B' | 'C' | 'D' | 'E';
  label: string;
  catchCopy: string;
  description: string;
  timeRange: string;
  timeNote: string;
  image: string;
  imageFallback: string;
  imageAlt: string;
  detailSectionId: string;
  startHour: number;
  endHour: number;
  lineMessage: string;
}

const SHIFT_PATTERNS: ShiftPattern[] = [
  {
    id: 'shift-a',
    code: 'A',
    label: 'A：昼間の時間を活用したい',
    catchCopy: '朝から夕方まで、昼間の時間を有効活用。',
    description:
      '夜遅くまで働くのではなく、日中の時間帯を中心に働きたい女性向けのシフトです。',
    timeRange: '10:00〜17:00',
    timeNote: '勤務時間例（開始・終了時刻は事前相談可）',
    image: '/images/workstyle_shift_a_morning_1794558810244.jpg',
    imageFallback: '/assets/images/workstyle_shift_a_morning_1794558810244.jpg',
    imageAlt: '朝の自然光が入る明るい室内とコーヒー・手帳のイメージ',
    detailSectionId: 'section-daytime',
    startHour: 10,
    endHour: 17,
    lineMessage: '【働き方ページより】A：昼間の時間を活用したい（10:00〜17:00目安）のシフトについて相談したいです。',
  },
  {
    id: 'shift-b',
    code: 'B',
    label: 'B：短時間で無理なく働きたい',
    catchCopy: '長時間は難しい。自分の予定も大切にしたい。',
    description:
      '家の用事やプライベートの予定などに合わせて、短めの勤務時間を希望する女性向けです。',
    timeRange: '10:00〜16:00',
    timeNote: '勤務時間例（短時間勤務の相談OK）',
    image: '/images/workstyle_phone_planner_1794549298392.jpg',
    imageFallback: '/assets/images/workstyle_phone_planner_1794549298392.jpg',
    imageAlt: 'スマートフォンとスケジュール帳で予定を整えるイメージ',
    detailSectionId: 'section-daytime',
    startHour: 10,
    endHour: 16,
    lineMessage: '【働き方ページより】B：短時間で無理なく働きたい（10:00〜16:00目安）について相談したいです。',
  },
  {
    id: 'shift-c',
    code: 'C',
    label: 'C：学校や昼職のあとに働きたい',
    catchCopy: '日中は別の予定。夕方から働きたい。',
    description:
      '学校や昼間の仕事が終わった後の時間を活用したい女性向けのシフトです。',
    timeRange: '17:00〜24:00',
    timeNote: '勤務時間例（終電や帰宅時間の相談可）',
    image: '/images/workstyle_shift_c_evening_1794558810138.jpg',
    imageFallback: '/assets/images/workstyle_shift_c_evening_1794558810138.jpg',
    imageAlt: '夕方の柔らかな光が差す落ち着いた室内とハーブティー・ノートのイメージ',
    detailSectionId: 'section-evening',
    startHour: 17,
    endHour: 24,
    lineMessage: '【働き方ページより】C：学校や昼職のあとに働きたい（17:00〜24:00目安）について相談したいです。',
  },
  {
    id: 'shift-d',
    code: 'D',
    label: 'D：夕方から夜の時間を活用したい',
    catchCopy: '午後から夜にかけて、自分の時間を活用。',
    description:
      '午前中はゆっくり過ごしたい方や、午後からの勤務を希望する女性向けです。',
    timeRange: '14:00〜24:00',
    timeNote: '勤務時間例（午前中は自由時間として活用）',
    image: '/images/workstyle_shift_d_afternoon_1794558811453.jpg',
    imageFallback: '/assets/images/workstyle_shift_d_afternoon_1794558811453.jpg',
    imageAlt: '午後の柔らかい光が差し込む落ち着いた室内と時計のイメージ',
    detailSectionId: 'section-evening',
    startHour: 14,
    endHour: 24,
    lineMessage: '【働き方ページより】D：夕方から夜の時間を活用したい（14:00〜24:00目安）について相談したいです。',
  },
  {
    id: 'shift-e',
    code: 'E',
    label: 'E：がっつり長時間働きたい',
    catchCopy: 'まとまった時間で、しっかり働きたい。',
    description:
      '1日の勤務時間を長めに確保して、しっかり働きたい女性向けのシフトです。希望する勤務時間や出勤日数について相談できます。',
    timeRange: '12:00〜24:00',
    timeNote: '勤務時間例（実働時間・休憩・開始終了時刻は事前確認可）',
    image: '/images/workstyle_shift_e_desk_1794558812582.jpg',
    imageFallback: '/assets/images/workstyle_shift_e_desk_1794558812582.jpg',
    imageAlt: '落ち着いた整ったデスク・スケジュール帳・置時計のイメージ',
    detailSectionId: 'section-longshift',
    startHour: 12,
    endHour: 24,
    lineMessage: '【働き方ページより】E：がっつり長時間働きたい（12:00〜24:00目安）の実働時間や休憩条件を確認したいです。',
  },
];

const BASIC_WORKSTYLE_CARDS: {
  num: string;
  icon: 'Clock' | 'Calendar' | 'Briefcase' | 'MessageSquare';
  title: string;
  desc: string;
}[] = [
  {
    num: 'CARD 01',
    icon: 'Clock',
    title: '選べる勤務時間',
    desc: '希望する時間帯に合わせて、勤務時間を相談できます。',
  },
  {
    num: 'CARD 02',
    icon: 'Calendar',
    title: '出勤日数',
    desc: '週何日働きたいか、希望する出勤頻度について相談できます。',
  },
  {
    num: 'CARD 03',
    icon: 'Briefcase',
    title: '生活との両立',
    desc: '昼職や学業など、普段の生活との両立について相談できます。',
  },
  {
    num: 'CARD 04',
    icon: 'MessageSquare',
    title: '事前相談',
    desc: '応募前に勤務時間や待遇など、気になることを確認できます。',
  },
];

const BEFORE_WORK_CARDS: {
  num: string;
  icon: 'Coffee' | 'Coins' | 'ClipboardCheck' | 'ShieldCheck';
  title: string;
  summary: string;
  details: string[];
}[] = [
  {
    num: '01',
    icon: 'Coffee',
    title: '仕事内容',
    summary: '実際の仕事内容や業務分担を事前に確認できます。',
    details: [
      '和室での短時間中心（1回15〜20分基本）の接客です',
      '募集店舗ではキス・粘膜接触なし、お酒を飲む必要はありません',
      'お部屋の清掃やシーツ交換、お呼び込みは仲居さんが担当します',
    ],
  },
  {
    num: '02',
    icon: 'Coins',
    title: '給与・待遇',
    summary: '報酬計算や控除・支払い条件を明確にご案内します。',
    details: [
      '売上50%バック（15分5,000円〜60分20,000円・外国人対応+2,500円）',
      '待機料・厚生費・衣装代などの天引き・控除は0円、チップは全額お渡し',
      '退勤時にその日の報酬を全額即日現金手渡しでお受け取りいただけます',
    ],
  },
  {
    num: '03',
    icon: 'ClipboardCheck',
    title: '勤務条件',
    summary: '勤務時間・出勤日数・休憩などのルールを把握できます。',
    details: [
      'A〜Eの時間帯例をもとに、希望の入り時間・退勤時間を相談可能です',
      '週1日〜や短時間、長時間勤務時の休憩や体調面の配慮も事前確認できます',
      '応募資格は満20歳以上の女性（本籍地記載住民票原本またはパスポート必須）',
    ],
  },
  {
    num: '04',
    icon: 'ShieldCheck',
    title: '安全・プライバシー',
    summary: '相談時や勤務時の安全面・個人情報の管理を徹底しています。',
    details: [
      '街全体での撮影禁止・Webへの顔出し写真非掲載・完全源氏名での勤務',
      'お客様との連絡先交換や営業LINEは禁止されており、店外での接触はありません',
      '応募前のLINE相談は匿名ででき、個人情報を外部へ共有することはありません',
    ],
  },
];

const RELATED_COLUMNS = [
  {
    num: '01',
    slug: 'flexible-shift-work-style-guide',
    category: '働き方・シフト相談',
    readTime: '5分',
    title: '勤務時間や出勤日数はどう決める？',
    summary:
      '週1日・短時間から本業との掛け持ちまで、自分の生活スタイルを崩さずにシフトを組み立てるための考え方を解説しています。',
    image: '/images/new_col_cozy_sofa_1785378602940.jpg',
    imageFallback: '/assets/images/new_col_cozy_sofa_1785378602940.jpg',
    imageAlt: '落ち着いた部屋でシフトや働き方を検討する生活イメージ',
  },
  {
    num: '02',
    slug: 'tobitashinchi-daytime-shift-advantage',
    category: '朝・昼シフト',
    readTime: '4分',
    title: '昼間の時間帯に働きたい女性へ',
    summary:
      '10:00〜17:00の朝・昼時間帯で働くメリットや、夜遅くならずに夕方には帰宅できる1日の過ごし方を詳しく紹介しています。',
    image: '/images/col_daytime_shift_38_1785507316876.jpg',
    imageFallback: '/assets/images/col_daytime_shift_38_1785507316876.jpg',
    imageAlt: '朝・昼の時間帯に働く女性のライフスタイルイメージ',
  },
  {
    num: '03',
    slug: 'tobitashinchi-weekend-shift',
    category: '勤務条件・両立',
    readTime: '4分',
    title: '応募前に確認しておきたい勤務条件',
    summary:
      '昼職や学校と両立する際の入り時間・退勤時間や、週1日・短時間から相談したい場合の事前確認ポイントをまとめています。',
    image: '/images/col_smart_planner_1783883692671.jpg',
    imageFallback: '/assets/images/col_smart_planner_1783883692671.jpg',
    imageAlt: '手帳で応募前の勤務条件やスケジュールを整理するイメージ',
  },
];

const WORKSTYLE_FAQS = [
  {
    q: '未経験でも応募できますか？',
    a: 'はい、満20歳以上の女性であれば未経験の方でもご応募いただけます。在籍キャストの多くが未経験からのスタートで、仕事内容や接客の流れ、勤務時間の相談方法まで女性スタッフが丁寧にご案内しています。',
  },
  {
    q: '週1日からでも相談できますか？',
    a: 'はい、週1日程度からの出勤についてご相談いただけます。平日のみ・週末のみ・月数回など、希望される曜日や時間帯に応じて無理のないシフトを相談できます。',
  },
  {
    q: '昼間の時間帯だけでも働けますか？',
    a: 'はい、10:00〜17:00（Aパターン）や10:00〜16:00（Bパターン）など、朝から夕方までの昼間だけの時間帯で働くことが可能です。夜遅くまでの勤務が難しい方にも選ばれています。',
  },
  {
    q: '短時間勤務はできますか？',
    a: 'はい、10:00〜16:00をはじめとした短時間勤務のご相談が可能です。ご希望の入り時間・退勤時間や、店舗体制によって調整できる時間幅を面接時にわかりやすくご説明します。',
  },
  {
    q: '長時間働くことはできますか？',
    a: 'はい、12:00〜24:00の時間枠（Eパターン）など、まとまった時間でしっかり働きたい方向けの働き方もご相談いただけます。12:00〜24:00は時間枠の例であり、実際の稼働時間や休憩の取り方はご本人の体調と希望を優先して事前に確認できます。',
  },
  {
    q: '昼職や学校と両立できますか？',
    a: 'はい、昼職のお仕事や学校の授業（満20歳以上の学生の方）と両立して働かれている方もいらっしゃいます。授業や本業後の17:00〜24:00（Cパターン）や休日昼間など、生活予定に合わせて調整可能です。',
  },
  {
    q: '出勤日数や勤務時間は変更できますか？',
    a: 'はい、生活リズムや本業・テスト期間などの予定に合わせて、出勤日数や時間帯の見直しをご相談いただけます。急な体調不良や予定変更時の連絡期限・手順も事前に明確にご案内します。',
  },
  {
    q: '応募後はどのような流れになりますか？',
    a: 'LINEでの事前相談のあと、ご希望があれば私服でのお顔合わせ・店舗見学（履歴書不要、年齢確認用の本籍地記載住民票原本またはパスポート確認）へ進みます。説明を聞いたうえで体験入店や検討を進めるかご自身で判断でき、強引な引き止めはありません。',
  },
  {
    q: 'LINEで相談するだけでも大丈夫ですか？',
    a: 'はい、大丈夫です。「まずは自分の希望時間帯で働けるか聞きたい」「実際の勤務条件を確かめてから考えたい」といったご相談のみでも、匿名のまま女性スタッフがお答えします。',
  },
  {
    q: '給与や待遇について事前に確認できますか？',
    a: 'はい、応募前・面接前の段階からすべて確認できます。売上50%バックの計算方法、待機料・厚生費などの控除0円、退勤時の即日現金手渡し、衣装無料貸出や交通費・寮条件まで事前に明確にお伝えします。',
  },
];

const TIMELINE_TICKS = [10, 12, 14, 16, 17, 20, 22, 24];
const TIMELINE_START = 10;
const TIMELINE_SPAN = 14;

export default function WorkstylePage({
  onNavigateHome,
  onNavigateTopic,
  onNavigateBlog,
  onNavigateFaq,
  onInjectedScroll,
}: WorkstylePageProps) {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [selectedShiftId, setSelectedShiftId] = useState<string>('shift-a');

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
      const yOffset = -76;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  // Sync structured data (WebPage + BreadcrumbList + FAQPage)
  useEffect(() => {
    const schemaData = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'WebPage',
          '@id': 'https://tobitashinchi-recruit.com/workstyle#webpage',
          'url': 'https://tobitashinchi-recruit.com/workstyle',
          'name': '飛田新地の勤務時間・シフト・働き方｜飛田ガールズ',
          'description':
            '飛田新地で働くことを検討している女性へ。勤務時間や出勤日数、昼間・夕方・夜のシフトなど、さまざまな働き方をご紹介。自分に合う勤務スタイルをLINEで相談できます。',
          'primaryImageOfPage': {
            '@type': 'ImageObject',
            'url': `https://tobitashinchi-recruit.com${HERO_IMG}`,
          },
          'isPartOf': {
            '@type': 'WebSite',
            '@id': 'https://tobitashinchi-recruit.com/#website',
            'name': '飛田ガールズ',
            'url': 'https://tobitashinchi-recruit.com/',
          },
        },
        {
          '@type': 'BreadcrumbList',
          '@id': 'https://tobitashinchi-recruit.com/workstyle#breadcrumb',
          'itemListElement': [
            {
              '@type': 'ListItem',
              'position': 1,
              'name': '飛田新地求人トップ',
              'item': 'https://tobitashinchi-recruit.com/',
            },
            {
              '@type': 'ListItem',
              'position': 2,
              'name': '働き方・勤務シフト',
              'item': 'https://tobitashinchi-recruit.com/workstyle',
            },
          ],
        },
        {
          '@type': 'FAQPage',
          '@id': 'https://tobitashinchi-recruit.com/workstyle#faq',
          'mainEntity': WORKSTYLE_FAQS.map((item) => ({
            '@type': 'Question',
            'name': item.q,
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': item.a,
            },
          })),
        },
      ],
    };

    updatePageJsonLd(schemaData);
  }, []);

  return (
    <div className="bg-[#FFF8FA] min-h-screen text-[#29252A] pb-24 pt-4 sm:pt-6 font-sans antialiased selection:bg-[#F5DCE6] selection:text-[#B83B67]">
      {/* パンくずナビゲーション */}
      <div className="max-w-[1140px] mx-auto px-5 sm:px-6 mb-4">
        <nav aria-label="Breadcrumb" className="flex items-center text-[13px]">
          <ol className="flex items-center gap-1.5 flex-wrap text-[#888087]">
            <li className="flex items-center gap-1">
              <a
                href="/"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigateHome();
                }}
                className="hover:text-[#B83B67] font-bold flex items-center gap-1 text-[#29252A] hover:underline cursor-pointer"
              >
                <LucideIcon name="Home" size={13} className="text-[#D96A91]" />
                <span>飛田新地求人（トップ）</span>
              </a>
            </li>
            <li aria-hidden="true" className="text-[#888087]">
              /
            </li>
            <li className="font-bold text-[#B83B67]" aria-current="page">
              働き方・勤務シフト
            </li>
          </ol>
        </nav>
      </div>

      <div className="max-w-[1140px] mx-auto px-5 sm:px-6 space-y-14 sm:space-y-20">
        {/* =========================================================
            SECTION 01：ファーストビュー
            スマホ：見出し → サブコピー → 画像 → CTA
            PC：左に文章・CTA、右に画像
           ========================================================= */}
        <section className="bg-white rounded-2xl p-6 sm:p-8 lg:p-11 border border-[#F0E4E9]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 lg:gap-10 items-center">
            {/* 左カラム（PC：見出し・サブコピー・CTA / スマホ：見出し・サブコピー、その後画像、最後にCTA） */}
            <div className="lg:col-span-7 flex flex-col gap-5 sm:gap-6">
              <div className="flex flex-wrap items-center gap-2 text-[13px] font-bold text-[#B83B67]">
                <span className="px-3 py-1 rounded-lg bg-[#F5DCE6]/70">
                  働き方・勤務シフト
                </span>
                <span className="text-[#888087] font-medium">
                  10:00〜24:00内で相談可能・満20歳以上の女性対象
                </span>
              </div>

              <h1 className="text-[26px] sm:text-[32px] lg:text-[34px] font-bold text-[#29252A] leading-[1.35] tracking-tight">
                あなたの生活に合わせた
                <br />
                働き方、見つけませんか？
              </h1>

              <p className="text-[15px] sm:text-[16px] text-[#29252A] leading-[1.8]">
                昼間だけ働きたい方も、短時間で働きたい方も、しっかり長時間働きたい方も。
                <br className="hidden sm:inline" />
                あなたの希望に合った働き方を一緒に考えます。
              </p>

              {/* スマホ用画像スロット（見出し・サブコピーの直後、CTAの前） */}
              <div className="lg:hidden space-y-2">
                <div className="rounded-2xl overflow-hidden border border-[#F0E4E9] bg-[#FFF8FA] aspect-4/3">
                  <img
                    src={HERO_IMG}
                    alt="朝の自然光が入る明るい室内で手帳を開く女性"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      const t = e.currentTarget;
                      if (!t.dataset.fallback) {
                        t.dataset.fallback = '1';
                        t.src = HERO_IMG_FALLBACK;
                      }
                    }}
                  />
                </div>
                <p className="text-[12px] text-[#888087] text-right">
                  ※生活スタイルのイメージ写真です
                </p>
              </div>

              {/* 補足ポイント（シンプル表示） */}
              <div className="flex flex-wrap gap-2.5 text-[13px] font-bold text-[#29252A]">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#FFF8FA] border border-[#F0E4E9]">
                  <LucideIcon name="Clock" size={14} className="text-[#D96A91]" />
                  <span>A〜Eの5つのシフト</span>
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#FFF8FA] border border-[#F0E4E9]">
                  <LucideIcon name="Calendar" size={14} className="text-[#D96A91]" />
                  <span>週1日〜相談OK</span>
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#FFF8FA] border border-[#F0E4E9]">
                  <LucideIcon name="Check" size={14} className="text-[#D96A91]" />
                  <span>短時間・長時間とも相談可</span>
                </span>
              </div>

              {/* CTA */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-1">
                <a
                  href={LINE_OFFICIAL_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => {
                    e.preventDefault();
                    handleLineClick(
                      '【働き方ページより】自分の生活スタイルに合う働き方やシフトについて相談したいです。'
                    );
                  }}
                  className="h-[52px] px-7 rounded-full bg-[#06C755] hover:bg-[#05b34c] text-white font-bold text-[15px] sm:text-[16px] transition-colors flex items-center justify-center gap-2 whitespace-nowrap"
                >
                  <LucideIcon name="MessageCircle" size={18} className="fill-white text-white shrink-0" />
                  <span>LINEで自分に合う働き方を相談する</span>
                </a>
                <a
                  href="#shifts"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection('shifts');
                  }}
                  className="h-[52px] px-5 rounded-full bg-white hover:bg-[#F5DCE6]/40 text-[#B83B67] border border-[#F0E4E9] font-bold text-[14px] sm:text-[15px] transition-colors flex items-center justify-center gap-1.5 whitespace-nowrap cursor-pointer"
                >
                  <span>5つのシフトを見る</span>
                  <LucideIcon name="ChevronDown" size={16} />
                </a>
              </div>
            </div>

            {/* 右カラム（PC用画像） */}
            <div className="hidden lg:flex lg:col-span-5 flex-col gap-2">
              <div className="rounded-2xl overflow-hidden border border-[#F0E4E9] bg-[#FFF8FA] aspect-4/3">
                <img
                  src={HERO_IMG}
                  alt="朝の自然光が入る明るい室内で手帳を開く女性"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    const t = e.currentTarget;
                    if (!t.dataset.fallback) {
                      t.dataset.fallback = '1';
                      t.src = HERO_IMG_FALLBACK;
                    }
                  }}
                />
              </div>
              <p className="text-[12px] text-[#888087] text-right">
                ※生活スタイルのイメージ写真です
              </p>
            </div>
          </div>

          {/* ページ内目次 */}
          <nav
            aria-label="ページ内目次"
            className="mt-7 pt-5 border-t border-[#F0E4E9] flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none text-[13px]"
          >
            {[
              { id: 'basics', label: '基本情報' },
              { id: 'shifts', label: '5つのシフト(A〜E)' },
              { id: 'section-daytime', label: '朝・昼' },
              { id: 'section-evening', label: '夕方・夜' },
              { id: 'section-longshift', label: '長時間' },
              { id: 'before-work', label: '働く前の確認' },
              { id: 'columns', label: 'コラム' },
              { id: 'workstyle-faq', label: 'よくある質問' },
            ].map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(item.id);
                }}
                className="px-3.5 py-2 rounded-xl bg-[#FFF8FA] hover:bg-[#F5DCE6]/60 text-[#29252A] hover:text-[#B83B67] border border-[#F0E4E9] font-bold transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </section>

        {/* =========================================================
            SECTION 02：働き方の基本情報（2列×2段）
           ========================================================= */}
        <section id="basics" className="scroll-mt-20 space-y-6">
          <div className="max-w-2xl space-y-2">
            <h2 className="text-[22px] sm:text-[26px] font-bold text-[#29252A] tracking-tight">
              まずは知っておきたい、働き方のこと
            </h2>
            <p className="text-[15px] text-[#888087] leading-relaxed">
              自分の生活ペースに合った働き方を選ぶために、最初に確認しておきたい4つのポイントです。
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            {BASIC_WORKSTYLE_CARDS.map((card) => (
              <div
                key={card.num}
                className="bg-white rounded-2xl p-6 border border-[#F0E4E9] flex items-start gap-4"
              >
                <span className="w-11 h-11 rounded-xl bg-[#F5DCE6]/70 text-[#B83B67] flex items-center justify-center shrink-0">
                  <LucideIcon name={card.icon} size={20} strokeWidth={1.75} />
                </span>
                <div className="space-y-1.5">
                  <span className="text-[12px] font-bold text-[#D96A91] tracking-wider block">
                    {card.num}
                  </span>
                  <h3 className="text-[17px] sm:text-[18px] font-bold text-[#29252A]">
                    {card.title}
                  </h3>
                  <p className="text-[15px] text-[#29252A]/85 leading-relaxed">
                    {card.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* =========================================================
            SECTION 03：あなたに合う5つのシフトパターン（A〜E）
           ========================================================= */}
        <section id="shifts" className="scroll-mt-20 space-y-7">
          <div className="max-w-2xl space-y-2">
            <span className="text-[13px] font-bold text-[#B83B67] block">
              5つのシフトパターン（A〜E）
            </span>
            <h2 className="text-[22px] sm:text-[27px] font-bold text-[#29252A] tracking-tight">
              あなたに合う働き方を見つけよう
            </h2>
            <p className="text-[15px] sm:text-[16px] text-[#888087] leading-relaxed">
              生活スタイルや希望する働き方によって、合うシフトは人それぞれ。あなたに近いものを選んでみてください。
            </p>
          </div>

          {/* 5つのシフトカード：PC 1段目3列(A,B,C)・2段目2列(D,E) / スマホ縦1列 */}
          <div className="grid grid-cols-1 md:grid-cols-6 gap-5">
            {SHIFT_PATTERNS.map((pattern, index) => {
              const colSpanClass = index < 3 ? 'md:col-span-2' : 'md:col-span-3';
              const isSelected = selectedShiftId === pattern.id;

              return (
                <article
                  key={pattern.id}
                  id={pattern.id}
                  className={`${colSpanClass} scroll-mt-24 bg-white rounded-2xl border overflow-hidden flex flex-col justify-between transition-colors ${
                    isSelected ? 'border-[#D96A91]' : 'border-[#F0E4E9]'
                  }`}
                >
                  <div>
                    {/* 1. 写真 */}
                    <div className="aspect-4/3 w-full overflow-hidden bg-[#FFF8FA] border-b border-[#F0E4E9] relative">
                      <img
                        src={pattern.image}
                        alt={pattern.imageAlt}
                        loading="lazy"
                        referrerPolicy="no-referrer"
                        onError={(e) => {
                          const t = e.currentTarget;
                          if (!t.dataset.fallback) {
                            t.dataset.fallback = '1';
                            t.src = pattern.imageFallback;
                          }
                        }}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="p-5 sm:p-6 space-y-3">
                      {/* 2. A〜Eの分類 */}
                      <div className="flex items-center justify-between gap-2">
                        <span className="inline-flex items-center gap-1.5 text-[13px] font-bold text-[#B83B67] bg-[#F5DCE6]/65 px-3 py-1 rounded-lg">
                          {pattern.label}
                        </span>
                      </div>

                      {/* 3. キャッチコピー */}
                      <h3 className="text-[17px] sm:text-[18px] font-bold text-[#29252A] leading-snug">
                        {pattern.catchCopy}
                      </h3>

                      {/* 4. 簡潔な説明 */}
                      <p className="text-[14.5px] sm:text-[15px] text-[#29252A]/85 leading-relaxed">
                        {pattern.description}
                      </p>

                      {/* 5. 勤務時間例 */}
                      <div className="rounded-xl bg-[#FFF8FA] border border-[#F0E4E9] p-3.5 space-y-1">
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-[12.5px] font-bold text-[#888087]">
                            勤務時間例
                          </span>
                          <span className="text-[16px] font-bold text-[#B83B67] tabular-nums">
                            {pattern.timeRange}
                          </span>
                        </div>
                        <p className="text-[12px] text-[#888087]">
                          {pattern.timeNote}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* 6. 詳細を確認する導線 */}
                  <div className="px-5 sm:px-6 py-4 border-t border-[#F0E4E9] bg-[#FFF8FA]/60 flex items-center justify-between gap-2">
                    <a
                      href={`#${pattern.detailSectionId}`}
                      onClick={(e) => {
                        e.preventDefault();
                        setSelectedShiftId(pattern.id);
                        scrollToSection(pattern.detailSectionId);
                      }}
                      className="text-[14px] font-bold text-[#B83B67] hover:underline inline-flex items-center gap-1 cursor-pointer min-h-[36px]"
                    >
                      <span>詳細を確認する</span>
                      <LucideIcon name="ChevronRight" size={16} />
                    </a>
                    <a
                      href={LINE_OFFICIAL_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => {
                        e.preventDefault();
                        handleLineClick(pattern.lineMessage);
                      }}
                      className="text-[13px] font-bold text-[#06C755] hover:underline inline-flex items-center gap-1 cursor-pointer"
                    >
                      <LucideIcon name="MessageCircle" size={14} />
                      <span>このシフトを相談</span>
                    </a>
                  </div>
                </article>
              );
            })}
          </div>

          {/* 5パターンの時間帯比較バー */}
          <div className="bg-white rounded-2xl p-5 sm:p-7 border border-[#F0E4E9] space-y-4">
            <div className="space-y-1">
              <h3 className="text-[16px] sm:text-[17px] font-bold text-[#29252A]">
                A〜Eの時間帯イメージを比較する（10:00〜24:00）
              </h3>
              <p className="text-[13.5px] text-[#888087]">
                1日のどの時間帯を中心に働くか、A〜Eの時間帯の目安を並べて確認できます。
              </p>
            </div>

            <div className="space-y-2.5">
              {/* 時間軸（デスクトップ/タブレット表示） */}
              <div className="hidden sm:grid grid-cols-12 items-center gap-3 px-3 py-2 rounded-xl bg-[#FFF8FA] text-[12px] font-bold text-[#888087]">
                <div className="col-span-4">シフト分類</div>
                <div className="col-span-8 relative h-5">
                  {TIMELINE_TICKS.map((hour) => {
                    const leftPct = ((hour - TIMELINE_START) / TIMELINE_SPAN) * 100;
                    const alignClass =
                      hour === 10
                        ? 'translate-x-0'
                        : hour === 24
                        ? '-translate-x-full'
                        : '-translate-x-1/2';
                    return (
                      <span
                        key={hour}
                        className={`absolute top-0 tabular-nums whitespace-nowrap ${alignClass}`}
                        style={{ left: `${leftPct}%` }}
                      >
                        {hour}時
                      </span>
                    );
                  })}
                </div>
              </div>

              {SHIFT_PATTERNS.map((pattern) => {
                const leftPct = ((pattern.startHour - TIMELINE_START) / TIMELINE_SPAN) * 100;
                const widthPct = ((pattern.endHour - pattern.startHour) / TIMELINE_SPAN) * 100;
                const isSelected = selectedShiftId === pattern.id;

                return (
                  <button
                    key={pattern.id}
                    type="button"
                    onClick={() => {
                      setSelectedShiftId(pattern.id);
                      scrollToSection(pattern.detailSectionId);
                    }}
                    className={`w-full text-left grid grid-cols-1 sm:grid-cols-12 items-center gap-2 sm:gap-3 px-3.5 py-3 rounded-xl border transition-colors cursor-pointer ${
                      isSelected
                        ? 'bg-[#FFF8FA] border-[#D96A91]'
                        : 'bg-white border-[#F0E4E9] hover:bg-[#FFF8FA]'
                    }`}
                  >
                    <div className="sm:col-span-4 flex items-center justify-between sm:block gap-2">
                      <div className="text-[14px] font-bold text-[#29252A]">
                        {pattern.label}
                      </div>
                      <div className="text-[13px] font-bold text-[#B83B67] tabular-nums sm:hidden">
                        {pattern.timeRange}
                      </div>
                    </div>
                    <div className="sm:col-span-8 relative h-7 rounded-lg bg-[#F5F0F2] overflow-hidden">
                      <div
                        className="absolute top-1 bottom-1 rounded-md bg-[#D96A91] flex items-center justify-center text-white text-[12px] font-bold tabular-nums px-2"
                        style={{ left: `${leftPct}%`, width: `${widthPct}%` }}
                      >
                        <span className="truncate">{pattern.timeRange}</span>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            <p className="text-[12.5px] text-[#888087] leading-relaxed">
              ※上記は勤務時間帯の例（目安）です。実際の出勤・退勤時刻、実働時間、休憩の取り方はご希望を伺ったうえで事前に確認できます。
            </p>
          </div>

          {/* 5つのシフト紹介の下のLINE相談導線 */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white rounded-2xl p-5 sm:p-6 border border-[#F0E4E9]">
            <div className="space-y-1 text-center sm:text-left">
              <p className="text-[16px] font-bold text-[#29252A]">
                どのシフトが自分の生活に合うか迷っている方へ
              </p>
              <p className="text-[14px] text-[#888087]">
                空いている曜日や希望する時間帯をお伝えいただければ、合うパターンをご案内します。
              </p>
            </div>
            <a
              href={LINE_OFFICIAL_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => {
                e.preventDefault();
                handleLineClick('【働き方ページより】自分の生活リズムに合うシフトについて相談したいです。');
              }}
              className="w-full sm:w-auto h-[50px] px-7 rounded-full bg-[#06C755] hover:bg-[#05b34c] text-white font-bold text-[15px] transition-colors flex items-center justify-center gap-2 whitespace-nowrap shrink-0"
            >
              <LucideIcon name="MessageCircle" size={18} className="fill-white text-white shrink-0" />
              <span>自分に合うシフトを相談する</span>
            </a>
          </div>
        </section>

        {/* =========================================================
            SECTION 04：朝・昼の時間帯に働きたい女性へ（横長レイアウト：写真左・解説右）
           ========================================================= */}
        <section
          id="section-daytime"
          className="bg-white rounded-2xl p-6 sm:p-8 lg:p-10 border border-[#F0E4E9] scroll-mt-20 space-y-6"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 lg:gap-10 items-center">
            {/* 左：昼間の落ち着いた生活イメージ */}
            <div className="lg:col-span-5 space-y-2">
              <div className="rounded-2xl overflow-hidden border border-[#F0E4E9] bg-[#FFF8FA] aspect-4/3">
                <img
                  src={DAYTIME_IMG}
                  alt="昼間の明るい室内で手帳を開きスケジュールを確認する女性のイメージ"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    const t = e.currentTarget;
                    if (!t.dataset.fallback) {
                      t.dataset.fallback = '1';
                      t.src = DAYTIME_IMG_FALLBACK;
                    }
                  }}
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-[12px] text-[#888087]">
                ※日中の生活スタイルのイメージ写真です
              </p>
            </div>

            {/* 右：具体的な勤務条件案内 */}
            <div className="lg:col-span-7 space-y-5">
              <div className="space-y-2">
                <span className="inline-block text-[12.5px] font-bold text-[#B83B67] bg-[#F5DCE6]/65 px-3 py-1 rounded-lg">
                  シフト A・B に対応
                </span>
                <h2 className="text-[22px] sm:text-[25px] font-bold text-[#29252A] tracking-tight">
                  昼間の時間を活用したい方へ
                </h2>
                <p className="text-[15px] text-[#888087] leading-relaxed">
                  朝から夕方までの時間帯を希望する方に、勤務時間や出勤日数についてご案内します。
                </p>
              </div>

              <dl className="divide-y divide-[#F0E4E9] border-t border-b border-[#F0E4E9] text-[14.5px] sm:text-[15px]">
                <div className="py-3 grid grid-cols-1 sm:grid-cols-12 gap-1 sm:gap-4">
                  <dt className="sm:col-span-4 font-bold text-[#29252A]">朝から働く時間帯</dt>
                  <dd className="sm:col-span-8 text-[#29252A]/85 leading-relaxed">
                    営業開始の10:00を目安に出勤する「10:00〜17:00（A）」や、さらに短い「10:00〜16:00（B）」をご案内しています。
                  </dd>
                </div>
                <div className="py-3 grid grid-cols-1 sm:grid-cols-12 gap-1 sm:gap-4">
                  <dt className="sm:col-span-4 font-bold text-[#29252A]">何時まで働けるか</dt>
                  <dd className="sm:col-span-8 text-[#29252A]/85 leading-relaxed">
                    夕方16時〜17時頃を目安に退勤できるため、夜遅い時間まで残らず明るい時間帯に帰宅したい方に適しています。
                  </dd>
                </div>
                <div className="py-3 grid grid-cols-1 sm:grid-cols-12 gap-1 sm:gap-4">
                  <dt className="sm:col-span-4 font-bold text-[#29252A]">希望する出勤日数</dt>
                  <dd className="sm:col-span-8 text-[#29252A]/85 leading-relaxed">
                    平日の日中に週1〜2日、本業がお休みの土日のみ、月数回など、ご自身の予定に合わせた頻度を相談できます。
                  </dd>
                </div>
                <div className="py-3 grid grid-cols-1 sm:grid-cols-12 gap-1 sm:gap-4">
                  <dt className="sm:col-span-4 font-bold text-[#29252A]">昼職・学業との両立</dt>
                  <dd className="sm:col-span-8 text-[#29252A]/85 leading-relaxed">
                    夜は家族やプライベートの時間として確保したい方、休日の昼間だけ掛け持ちしたい方も生活リズムを保ちながら働けます。
                  </dd>
                </div>
                <div className="py-3 grid grid-cols-1 sm:grid-cols-12 gap-1 sm:gap-4">
                  <dt className="sm:col-span-4 font-bold text-[#29252A]">事前確認できる条件</dt>
                  <dd className="sm:col-span-8 text-[#29252A]/85 leading-relaxed">
                    開始時刻や退勤目安、当日の出勤ルール、休憩の取り方、お休み連絡の期限などは面接前の相談段階で確認できます。
                  </dd>
                </div>
              </dl>

              <div className="pt-1">
                <a
                  href={LINE_OFFICIAL_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => {
                    e.preventDefault();
                    handleLineClick('【働き方ページより】朝・昼の時間帯（10:00〜16:00 / 17:00目安）の勤務条件について聞いてみたいです。');
                  }}
                  className="inline-flex items-center justify-center gap-2 h-[50px] w-full sm:w-auto px-7 rounded-full bg-[#06C755] hover:bg-[#05b34c] text-white font-bold text-[15px] transition-colors"
                >
                  <LucideIcon name="MessageCircle" size={18} className="fill-white text-white shrink-0" />
                  <span>朝・昼の勤務時間について聞いてみる</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================
            SECTION 05：夕方・夜の時間帯に働きたい女性へ（横長レイアウト：解説左・写真右）
           ========================================================= */}
        <section
          id="section-evening"
          className="bg-white rounded-2xl p-6 sm:p-8 lg:p-10 border border-[#F0E4E9] scroll-mt-20 space-y-6"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 lg:gap-10 items-center">
            {/* 左：夕方・夜シフト条件 */}
            <div className="lg:col-span-7 space-y-5 order-2 lg:order-1">
              <div className="space-y-2">
                <span className="inline-block text-[12.5px] font-bold text-[#B83B67] bg-[#F5DCE6]/65 px-3 py-1 rounded-lg">
                  シフト C・D に対応
                </span>
                <h2 className="text-[22px] sm:text-[25px] font-bold text-[#29252A] tracking-tight">
                  夕方から夜の時間を活用したい方へ
                </h2>
                <p className="text-[15px] text-[#888087] leading-relaxed">
                  日中は学校や仕事、プライベートの予定がある方に。希望する勤務開始時間や終了時間について相談できます。
                </p>
              </div>

              <dl className="divide-y divide-[#F0E4E9] border-t border-b border-[#F0E4E9] text-[14.5px] sm:text-[15px]">
                <div className="py-3 grid grid-cols-1 sm:grid-cols-12 gap-1 sm:gap-4">
                  <dt className="sm:col-span-4 font-bold text-[#29252A]">夕方からの勤務時間</dt>
                  <dd className="sm:col-span-8 text-[#29252A]/85 leading-relaxed">
                    仕事や授業後に合わせた「17:00〜24:00（C）」と、午後から始める「14:00〜24:00（D）」の2つの目安があります。
                  </dd>
                </div>
                <div className="py-3 grid grid-cols-1 sm:grid-cols-12 gap-1 sm:gap-4">
                  <dt className="sm:col-span-4 font-bold text-[#29252A]">勤務終了時間</dt>
                  <dd className="sm:col-span-8 text-[#29252A]/85 leading-relaxed">
                    営業終了の24:00までが目安です。終電の時間や翌日の予定に合わせて、何時頃までの勤務になるか事前相談できます。
                  </dd>
                </div>
                <div className="py-3 grid grid-cols-1 sm:grid-cols-12 gap-1 sm:gap-4">
                  <dt className="sm:col-span-4 font-bold text-[#29252A]">出勤日数</dt>
                  <dd className="sm:col-span-8 text-[#29252A]/85 leading-relaxed">
                    週1日〜、特定の曜日だけ、休日の午後からなど、無理なく続けられる頻度を決めて働けます。
                  </dd>
                </div>
                <div className="py-3 grid grid-cols-1 sm:grid-cols-12 gap-1 sm:gap-4">
                  <dt className="sm:col-span-4 font-bold text-[#29252A]">昼職・学業との両立</dt>
                  <dd className="sm:col-span-8 text-[#29252A]/85 leading-relaxed">
                    昼職の定時後や大学の授業が終わってから合流しやすく、開始時刻の微調整についても相談できます。
                  </dd>
                </div>
                <div className="py-3 grid grid-cols-1 sm:grid-cols-12 gap-1 sm:gap-4">
                  <dt className="sm:col-span-4 font-bold text-[#29252A]">帰宅・移動の確認</dt>
                  <dd className="sm:col-span-8 text-[#29252A]/85 leading-relaxed">
                    動物園前駅徒歩5分・新今宮駅徒歩7分・天王寺駅徒歩10分の立地です。終電時間や帰宅ルート・送り対応の有無も面接時に確認できます。
                  </dd>
                </div>
              </dl>

              <div className="pt-1">
                <a
                  href={LINE_OFFICIAL_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => {
                    e.preventDefault();
                    handleLineClick('【働き方ページより】夕方・夜（17:00〜24:00 / 14:00〜24:00目安）の開始時間や帰宅について相談したいです。');
                  }}
                  className="inline-flex items-center justify-center gap-2 h-[50px] w-full sm:w-auto px-7 rounded-full bg-[#06C755] hover:bg-[#05b34c] text-white font-bold text-[15px] transition-colors"
                >
                  <LucideIcon name="MessageCircle" size={18} className="fill-white text-white shrink-0" />
                  <span>勤務時間について聞いてみる</span>
                </a>
              </div>
            </div>

            {/* 右：夕方・夜の落ち着いた室内写真 */}
            <div className="lg:col-span-5 space-y-2 order-1 lg:order-2">
              <div className="rounded-2xl overflow-hidden border border-[#F0E4E9] bg-[#FFF8FA] aspect-4/3">
                <img
                  src={EVENING_IMG}
                  alt="夕暮れから夜にかけての落ち着いた柔らかな間接照明の室内イメージ"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    const t = e.currentTarget;
                    if (!t.dataset.fallback) {
                      t.dataset.fallback = '1';
                      t.src = EVENING_IMG_FALLBACK;
                    }
                  }}
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-[12px] text-[#888087]">
                ※夕方〜夜の落ち着いた空間のイメージ写真です
              </p>
            </div>
          </div>
        </section>

        {/* =========================================================
            SECTION 06：長時間しっかり働きたい女性へ（横長レイアウト：写真左・詳細右）
           ========================================================= */}
        <section
          id="section-longshift"
          className="bg-white rounded-2xl p-6 sm:p-8 lg:p-10 border border-[#F0E4E9] scroll-mt-20 space-y-6"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 lg:gap-10 items-center">
            {/* 左：長時間勤務イメージ写真 */}
            <div className="lg:col-span-5 space-y-2">
              <div className="rounded-2xl overflow-hidden border border-[#F0E4E9] bg-[#FFF8FA] aspect-4/3">
                <img
                  src={LONGSHIFT_IMG}
                  alt="手帳や時計、温かいお茶が整えられた落ち着いたリビングテーブルのイメージ"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    const t = e.currentTarget;
                    if (!t.dataset.fallback) {
                      t.dataset.fallback = '1';
                      t.src = LONGSHIFT_IMG_FALLBACK;
                    }
                  }}
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-[12px] text-[#888087]">
                ※計画的に1日を過ごすイメージ写真です
              </p>
            </div>

            {/* 右：長時間勤務の正確な条件説明 */}
            <div className="lg:col-span-7 space-y-5">
              <div className="space-y-2">
                <span className="inline-block text-[12.5px] font-bold text-[#B83B67] bg-[#F5DCE6]/65 px-3 py-1 rounded-lg">
                  シフト E に対応（長時間勤務）
                </span>
                <h2 className="text-[22px] sm:text-[25px] font-bold text-[#29252A] tracking-tight">
                  まとまった時間で、しっかり働きたい方へ
                </h2>
                <p className="text-[15px] text-[#888087] leading-relaxed">
                  長めの勤務時間を希望する方に。1日の勤務時間や出勤日数、休憩などの条件を事前に確認できます。
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-[14px] sm:text-[14.5px]">
                <div className="p-4 rounded-xl bg-[#FFF8FA] border border-[#F0E4E9] space-y-1">
                  <div className="font-bold text-[#B83B67]">長時間勤務の具体例</div>
                  <p className="text-[#29252A]/85 leading-relaxed">
                    Eパターンの「12:00〜24:00」のように、1日のうちに長めの時間枠を確保してしっかり働くスタイルです。
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-[#FFF8FA] border border-[#F0E4E9] space-y-1">
                  <div className="font-bold text-[#B83B67]">開始時間と終了時間</div>
                  <p className="text-[#29252A]/85 leading-relaxed">
                    12:00〜24:00は時間枠の目安です。実際の出勤時刻・最終の上がり時間は店舗条件と体調に合わせて決めます。
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-[#FFF8FA] border border-[#F0E4E9] space-y-1">
                  <div className="font-bold text-[#B83B67]">休憩・体調への配慮</div>
                  <p className="text-[#29252A]/85 leading-relaxed">
                    長めの時間枠では無理が続かないよう、途中の食事休憩や休止の取り方を事前にすり合わせます。
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-[#FFF8FA] border border-[#F0E4E9] space-y-1">
                  <div className="font-bold text-[#B83B67]">出勤日数の組み立て</div>
                  <p className="text-[#29252A]/85 leading-relaxed">
                    「出勤する日は長めに働き、ほかの日はしっかり休む」など、生活リズムに合わせた週単位の調整が可能です。
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-[#FFF8FA] border border-[#F0E4E9] space-y-1">
                  <div className="font-bold text-[#B83B67]">給与・控除の条件</div>
                  <p className="text-[#29252A]/85 leading-relaxed">
                    売上50%バック・控除（待機料・厚生費・衣装代）0円で、その日の勤務終了後に全額即日現金手渡しとなります。
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-[#FFF8FA] border border-[#F0E4E9] space-y-1">
                  <div className="font-bold text-[#B83B67]">勤務前の確認ポイント</div>
                  <p className="text-[#29252A]/85 leading-relaxed">
                    無理に長時間を続ける必要はありません。ご希望と体調を尊重し、途中で時間枠を見直すことも相談できます。
                  </p>
                </div>
              </div>

              <div className="pt-1">
                <a
                  href={LINE_OFFICIAL_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => {
                    e.preventDefault();
                    handleLineClick('【働き方ページより】長時間勤務（12:00〜24:00目安）の実際の実働時間や休憩条件を確認したいです。');
                  }}
                  className="inline-flex items-center justify-center gap-2 h-[50px] w-full sm:w-auto px-7 rounded-full bg-[#06C755] hover:bg-[#05b34c] text-white font-bold text-[15px] transition-colors"
                >
                  <LucideIcon name="MessageCircle" size={18} className="fill-white text-white shrink-0" />
                  <span>長時間勤務の条件を確認する</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================
            SECTION 07：働く前に知っておきたいこと（4カード）
           ========================================================= */}
        <section id="before-work" className="scroll-mt-20 space-y-6">
          <div className="max-w-2xl space-y-2">
            <h2 className="text-[22px] sm:text-[26px] font-bold text-[#29252A] tracking-tight">
              安心して働くために、事前に確認しておきたいこと
            </h2>
            <p className="text-[15px] text-[#888087] leading-relaxed">
              曖昧なまま応募するのではなく、仕事内容やお金・勤務条件・安全面の具体的なルールをご確認いただけます。
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {BEFORE_WORK_CARDS.map((card) => (
              <div
                key={card.num}
                className="bg-white rounded-2xl p-6 border border-[#F0E4E9] space-y-4"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="w-10 h-10 rounded-xl bg-[#F5DCE6]/70 text-[#B83B67] flex items-center justify-center shrink-0">
                      <LucideIcon name={card.icon} size={19} strokeWidth={1.75} />
                    </span>
                    <h3 className="text-[18px] font-bold text-[#29252A]">
                      {card.num}：{card.title}
                    </h3>
                  </div>
                </div>

                <p className="text-[14.5px] font-bold text-[#B83B67]">
                  {card.summary}
                </p>

                <ul className="space-y-2 pt-2 border-t border-[#F0E4E9] text-[14px] sm:text-[14.5px] text-[#29252A]/85 leading-relaxed">
                  {card.details.map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <LucideIcon
                        name="Check"
                        size={15}
                        className="text-[#D96A91] shrink-0 mt-1"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* =========================================================
            SECTION 08：関連コラム（3カード・実記事へリンク）
           ========================================================= */}
        <section
          id="columns"
          className="bg-white rounded-2xl p-6 sm:p-8 lg:p-10 border border-[#F0E4E9] scroll-mt-20 space-y-6"
        >
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-2">
              <h2 className="text-[22px] sm:text-[26px] font-bold text-[#29252A] tracking-tight">
                働き方について、もっと知りたい方へ
              </h2>
              <p className="text-[15px] text-[#888087] leading-relaxed">
                シフトの決め方や昼間の働き方、事前の確認ポイントをまとめた関連コラムです。
              </p>
            </div>
            {onNavigateBlog && (
              <a
                href="/blog"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigateBlog();
                }}
                className="text-[14px] font-bold text-[#B83B67] hover:underline inline-flex items-center gap-1 whitespace-nowrap shrink-0 cursor-pointer"
              >
                <span>コラム一覧を見る</span>
                <LucideIcon name="ChevronRight" size={16} />
              </a>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-stretch">
            {RELATED_COLUMNS.map((col) => (
              <a
                key={col.slug}
                href={`/blog/${col.slug}`}
                onClick={(e) => {
                  e.preventDefault();
                  if (onNavigateBlog) {
                    onNavigateBlog(col.slug);
                  }
                }}
                className="group bg-[#FFF8FA] rounded-2xl border border-[#F0E4E9] hover:border-[#D96A91] overflow-hidden flex flex-col justify-between transition-colors cursor-pointer"
              >
                <div>
                  <div className="aspect-4/3 w-full overflow-hidden border-b border-[#F0E4E9] bg-white">
                    <img
                      src={col.image}
                      alt={col.imageAlt}
                      loading="lazy"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        const t = e.currentTarget;
                        if (!t.dataset.fallback) {
                          t.dataset.fallback = '1';
                          t.src = col.imageFallback;
                        }
                      }}
                      className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300"
                    />
                  </div>
                  <div className="p-5 space-y-2.5">
                    <div className="flex items-center gap-2 text-[12.5px]">
                      <span className="font-bold text-[#B83B67]">{col.category}</span>
                      <span className="text-[#888087]" aria-hidden="true">·</span>
                      <span className="text-[#888087]">{col.readTime}</span>
                    </div>
                    <h3 className="text-[17px] font-bold text-[#29252A] leading-snug group-hover:text-[#B83B67] transition-colors">
                      {col.title}
                    </h3>
                    <p className="text-[14px] text-[#888087] leading-relaxed">
                      {col.summary}
                    </p>
                  </div>
                </div>
                <div className="px-5 py-3.5 border-t border-[#F0E4E9] flex items-center gap-1 text-[14px] font-bold text-[#B83B67] group-hover:underline">
                  <span>記事を読む</span>
                  <LucideIcon name="ChevronRight" size={15} />
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* =========================================================
            SECTION 09：よくある質問（10問アコーディオン）
           ========================================================= */}
        <section id="workstyle-faq" className="scroll-mt-20 space-y-6">
          <div className="max-w-2xl space-y-2">
            <h2 className="text-[22px] sm:text-[26px] font-bold text-[#29252A] tracking-tight">
              働き方についてよくある質問
            </h2>
            <p className="text-[15px] text-[#888087] leading-relaxed">
              応募や働き方を検討される女性から多く寄せられるご質問をまとめました。
            </p>
          </div>

          <div className="bg-white rounded-2xl p-4 sm:p-7 border border-[#F0E4E9] divide-y divide-[#F0E4E9]">
            {WORKSTYLE_FAQS.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div key={idx} className="py-3.5 first:pt-0 last:pb-0">
                  <button
                    type="button"
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    aria-expanded={isOpen}
                    className="w-full text-left flex items-start justify-between gap-4 py-2 text-[15px] sm:text-[16px] font-bold text-[#29252A] hover:text-[#B83B67] cursor-pointer transition-colors"
                  >
                    <span className="flex items-start gap-2.5">
                      <span className="text-[#D96A91] font-bold shrink-0">Q{idx + 1}.</span>
                      <span>{faq.q}</span>
                    </span>
                    <LucideIcon
                      name={isOpen ? 'ChevronUp' : 'ChevronDown'}
                      size={18}
                      className="text-[#888087] shrink-0 mt-1"
                    />
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="pt-2 pb-1 pl-6 sm:pl-8 pr-1">
                          <div className="p-4 rounded-xl bg-[#FFF8FA] border border-[#F0E4E9] text-[14.5px] sm:text-[15px] text-[#29252A]/90 leading-relaxed">
                            <p>{faq.a}</p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-1">
            <a
              href={LINE_OFFICIAL_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => {
                e.preventDefault();
                handleLineClick('【働き方ページより】働き方や勤務時間について気になることをLINEで質問したいです。');
              }}
              className="w-full sm:w-auto h-[50px] px-7 rounded-full bg-[#06C755] hover:bg-[#05b34c] text-white font-bold text-[15px] transition-colors flex items-center justify-center gap-2 whitespace-nowrap"
            >
              <LucideIcon name="MessageCircle" size={18} className="fill-white text-white shrink-0" />
              <span>LINEで気軽に質問する</span>
            </a>
            {onNavigateFaq && (
              <a
                href="/faq"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigateFaq();
                }}
                className="text-[14px] font-bold text-[#B83B67] hover:underline inline-flex items-center gap-1 cursor-pointer py-2"
              >
                <span>よくある質問一覧を見る</span>
                <LucideIcon name="ChevronRight" size={15} />
              </a>
            )}
          </div>
        </section>

        {/* =========================================================
            SECTION 10：最終LINE相談エリア
           ========================================================= */}
        <section
          id="line-cta"
          className="bg-[#FFF0F5] rounded-2xl p-6 sm:p-10 lg:p-12 border border-[#F5DCE6] text-center space-y-6 scroll-mt-20"
        >
          <div className="w-12 h-12 rounded-2xl bg-white border border-[#F0E4E9] text-[#06C755] flex items-center justify-center mx-auto">
            <LucideIcon name="MessageCircle" size={24} />
          </div>

          <div className="max-w-xl mx-auto space-y-3">
            <h2 className="text-[22px] sm:text-[26px] font-bold text-[#29252A] tracking-tight leading-snug">
              あなたに合う働き方を、一緒に考えませんか？
            </h2>
            <p className="text-[15px] sm:text-[16px] text-[#29252A]/85 leading-relaxed">
              勤務時間や出勤日数、仕事内容や待遇など、気になることは応募前に確認できます。まずはLINEでお気軽にご相談ください。
            </p>
          </div>

          <div className="pt-1 flex flex-col items-center gap-3">
            <a
              href={LINE_OFFICIAL_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => {
                e.preventDefault();
                handleLineClick('【働き方ページより】希望の働き方や勤務条件についてLINEで相談したいです。');
              }}
              className="w-full sm:w-auto sm:min-w-[320px] h-[56px] px-8 rounded-full bg-[#06C755] hover:bg-[#05b34c] text-white font-bold text-[16px] sm:text-[17px] transition-colors cursor-pointer flex items-center justify-center gap-2.5"
            >
              <LucideIcon name="MessageCircle" size={20} className="fill-white text-white shrink-0" />
              <span>LINEで働き方を相談する</span>
            </a>
          </div>

          <div className="max-w-3xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-left">
            <div className="bg-white rounded-xl p-4 border border-[#F0E4E9] space-y-1">
              <div className="flex items-center gap-1.5 text-[13px] font-bold text-[#B83B67]">
                <LucideIcon name="Clock" size={14} />
                <span>勤務条件の事前確認</span>
              </div>
              <p className="text-[13px] text-[#29252A]/85 leading-relaxed">
                ご希望の時間帯・出勤日数・休憩条件などを応募前に確認できます。
              </p>
            </div>
            <div className="bg-white rounded-xl p-4 border border-[#F0E4E9] space-y-1">
              <div className="flex items-center gap-1.5 text-[13px] font-bold text-[#B83B67]">
                <LucideIcon name="MessageSquare" size={14} />
                <span>仕事内容・待遇の相談</span>
              </div>
              <p className="text-[13px] text-[#29252A]/85 leading-relaxed">
                質問や相談のみでも可能です。無理な勧誘や引き止めは行いません。
              </p>
            </div>
            <div className="bg-white rounded-xl p-4 border border-[#F0E4E9] space-y-1">
              <div className="flex items-center gap-1.5 text-[13px] font-bold text-[#B83B67]">
                <LucideIcon name="Lock" size={14} />
                <span>個人情報の取り扱い</span>
              </div>
              <p className="text-[13px] text-[#29252A]/85 leading-relaxed">
                匿名での相談に対応し、内容は秘密厳守のうえ外部へ共有しません（※満20歳以上対象）。
              </p>
            </div>
          </div>
        </section>

        {/* 関連ページへの内部リンク */}
        <section className="pt-4 border-t border-[#F0E4E9]">
          <h3 className="text-[13px] font-bold text-[#888087] mb-3 text-center">
            あわせて確認しておきたいページ
          </h3>
          <div className="flex flex-wrap items-center justify-center gap-2.5 text-[14px]">
            {onNavigateTopic && (
              <>
                <a
                  href="/job"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigateTopic('job');
                  }}
                  className="px-4 py-2 rounded-xl bg-white hover:bg-[#F5DCE6]/60 hover:text-[#B83B67] border border-[#F0E4E9] transition-colors cursor-pointer whitespace-nowrap"
                >
                  仕事内容
                </a>
                <a
                  href="/salary"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigateTopic('salary');
                  }}
                  className="px-4 py-2 rounded-xl bg-white hover:bg-[#F5DCE6]/60 hover:text-[#B83B67] border border-[#F0E4E9] transition-colors cursor-pointer whitespace-nowrap"
                >
                  給料・待遇
                </a>
                <a
                  href="/beginner"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigateTopic('beginner');
                  }}
                  className="px-4 py-2 rounded-xl bg-white hover:bg-[#F5DCE6]/60 hover:text-[#B83B67] border border-[#F0E4E9] transition-colors cursor-pointer whitespace-nowrap"
                >
                  未経験の方へ
                </a>
                <a
                  href="/experienced"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigateTopic('experienced');
                  }}
                  className="px-4 py-2 rounded-xl bg-white hover:bg-[#F5DCE6]/60 hover:text-[#B83B67] border border-[#F0E4E9] transition-colors cursor-pointer whitespace-nowrap"
                >
                  経験者・移籍
                </a>
                <a
                  href="/flow"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigateTopic('flow');
                  }}
                  className="px-4 py-2 rounded-xl bg-white hover:bg-[#F5DCE6]/60 hover:text-[#B83B67] border border-[#F0E4E9] transition-colors cursor-pointer whitespace-nowrap"
                >
                  面接・体験入店
                </a>
                <a
                  href="/safety"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigateTopic('safety');
                  }}
                  className="px-4 py-2 rounded-xl bg-white hover:bg-[#F5DCE6]/60 hover:text-[#B83B67] border border-[#F0E4E9] transition-colors cursor-pointer whitespace-nowrap"
                >
                  身バレ対策・安全面
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
                className="px-4 py-2 rounded-xl bg-white hover:bg-[#F5DCE6]/60 hover:text-[#B83B67] border border-[#F0E4E9] transition-colors cursor-pointer whitespace-nowrap"
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
