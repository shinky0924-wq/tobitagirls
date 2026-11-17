/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import LucideIcon from './LucideIcon';
import { LINE_OFFICIAL_URL } from '../data';
import { updatePageJsonLd } from '../utils/jsonLd';

interface ShopsPageProps {
  onNavigateHome: () => void;
  onNavigateTopic?: (topicId: string) => void;
  onNavigateBlog?: (slug?: string) => void;
  onNavigateFaq?: () => void;
  onCtaclick: () => void;
  onInjectedScroll?: (msg: string) => void;
}

const HERO_IMG = '/images/shops_hero_street_1794559557935.jpg';
const HERO_IMG_FALLBACK = '/assets/images/shops_hero_street_1794559557935.jpg';

const MATCHING_IMG = '/images/shops_matching_research_1794559558543.jpg';
const MATCHING_IMG_FALLBACK = '/assets/images/shops_matching_research_1794559558543.jpg';

const CHECKLIST_IMG = '/images/shops_checklist_desk_1794559559692.jpg';
const CHECKLIST_IMG_FALLBACK = '/assets/images/shops_checklist_desk_1794559559692.jpg';

const SHOP_KEY_POINTS: {
  num: string;
  icon: 'Store' | 'Coins' | 'ClipboardList' | 'HeartHandshake';
  title: string;
  desc: string;
}[] = [
  {
    num: 'CARD 01',
    icon: 'Store',
    title: 'お店の雰囲気',
    desc: 'お店の雰囲気や接客方針が、自分の希望に合っているか確認しましょう。',
  },
  {
    num: 'CARD 02',
    icon: 'Coins',
    title: '給与・待遇',
    desc: '報酬、控除、費用、支払い条件などを事前に確認することが大切です。',
  },
  {
    num: 'CARD 03',
    icon: 'ClipboardList',
    title: '仕事内容・勤務条件',
    desc: '具体的な仕事内容や勤務時間、出勤日数などを確認しましょう。',
  },
  {
    num: 'CARD 04',
    icon: 'HeartHandshake',
    title: 'サポート体制',
    desc: '困ったときの相談先や、勤務中のサポート体制について確認しましょう。',
  },
];

interface StreetInfo {
  id: string;
  name: string;
  reading: string;
  icon: 'Compass' | 'Landmark' | 'MapPin' | 'Moon';
  atmosphere: string;
  environment: string;
  shopDifferences: string;
  checkPoints: string;
}

const STREETS_DATA: StreetInfo[] = [
  {
    id: 'seishun',
    name: '青春通り',
    reading: 'せいしゅんどおり',
    icon: 'Compass',
    atmosphere:
      'メイン通りの1本北側に並行して延びる人気通りです。20代前半〜20代後半の若手で親しみやすい雰囲気の女性が多く在籍し、華やかさがありつつもアットホームで落ち着いた空気が流れます。',
    environment:
      '約40店舗ほどが連なり、メイン通りより道幅がやや狭いため、歩くお客様のペースが緩やかで雰囲気をしっかり見てもらいやすい立地です。向かい側に店舗がない片側構造の区画もあり、人目が気になりにくい環境です。',
    shopDifferences:
      '制服・ナース・チャイナなどのコスプレ衣装に力を入れるお店と、シンプルなワンピース・浴衣中心のお店に分かれます。常連客が多く穏やかに接客するお店か、回転重視でにぎやかに回すお店かでも方針が異なります。',
    checkPoints:
      '着たい衣装の系統（コスプレ系かワンピース系か）が好みに合うか、同世代の在籍状況や、常連寄り・新規寄りどちらの客層が多いかを確認しましょう。',
  },
  {
    id: 'main',
    name: 'メイン通り',
    reading: 'めいんどおり',
    icon: 'Landmark',
    atmosphere:
      '飛田新地の中で最も知名度が高く、街の“顔”ともいえる中心街です。20代前半〜20代後半の綺麗系・可愛い系など華やかな女性が多く集まり、夕方から夜にかけて強い活気とにぎわいが見られます。',
    environment:
      'エリア内で道幅が最も広く店舗数も最多のため、初めて訪れる観光客や一見のお客様、会社員グループなどが最初に足を踏み入れる動線です。通行量が常に多く、人通りが途切れにくい環境です。',
    shopDifferences:
      '短時間（15〜20分基本）でテンポよく回転させることを重視するお店と、会話や愛嬌を大切にした丁寧な接客を重視するお店に分かれます。待機室の広さや求められる衣装・ヘアメイクの雰囲気も店舗ごとに異なります。',
    checkPoints:
      '人通りの多い華やかな環境でテンポよく接客するスタイルが合うか、貸出衣装の傾向や混み合う時間帯の休憩・待機環境が整っているかを確認しましょう。',
  },
  {
    id: 'daimon',
    name: '大門通り',
    reading: 'だいもんどおり',
    icon: 'MapPin',
    atmosphere:
      '飛田新地の西側にある玄関口（交番・大門跡付近）から東西へ延び、街を南北に分ける基準となる通りです。20代後半〜30代以上の落ち着いた魅力を持つ女性も活躍しやすく、肩の力を抜いて働きやすい空気感があります。',
    environment:
      '車や徒歩でエリアに入る際の入口にあたり、他の通りへ向かう人の往来が常にある一方、通り自体の店舗数はメイン・青春通りより控えめです。ビジネス層や街全体を見て回る通行客が自然に通りかかる立地です。',
    shopDifferences:
      '昔ながらの常連客とのつながりを大切にする老舗タイプのお店や、一人ひとりのお客様と落ち着いて会話を楽しむお店が多く見られます。通りの入口寄りか中ほどかによっても通行量や客層の傾向が変わります。',
    checkPoints:
      '通りのどの位置（入口付近か中ほどか）に店舗があるか、新規客と常連客のバランス、自分の年齢層や接客ペースに合った落ち着いた環境かを確認しましょう。',
  },
  {
    id: 'uradori',
    name: '裏通り',
    reading: 'うらどおり',
    icon: 'Moon',
    atmosphere:
      '大門通りより南側の一帯に広がる、落ち着いた大人の雰囲気が漂うエリアです。20代後半〜30代・40代以上の女性が中心に活躍しており、若手同士の競争感よりも大人の包容力や丁寧なおもてなしが喜ばれる温かな空気感があります。',
    environment:
      'メイン・青春通りの大通りから一本入った静かな街並みで、冷やかしの観光客よりも、落ち着いた空間を好む常連客や年配のビジネス層が多く足を運びます。雑踏や周囲の視線を避けてマイペースを保ちやすい環境です。',
    shopDifferences:
      '30代〜40代以上が主役として活躍する大人系のお店から、20代後半の落ち着いた女性がなじみやすいお店まで幅があります。リピーター率の高さや、会話・延長を大切にする接客スタイルなど店舗ごとの色がはっきりしています。',
    checkPoints:
      'ご自身の年齢や落ち着いた魅力が活かしやすい店舗か、常連客中心でリピートにつながりやすいか、無理なペースを求められず続けられるルールかを確認しましょう。',
  },
];

const FIND_SHOP_STEPS: {
  num: string;
  icon: 'Clock' | 'Coins' | 'Store' | 'Coffee' | 'ShieldCheck';
  title: string;
  desc: string;
}[] = [
  {
    num: '01',
    icon: 'Clock',
    title: '希望する働き方',
    desc: '勤務時間や出勤日数など、自分の生活リズムに合う希望を整理します。',
  },
  {
    num: '02',
    icon: 'Coins',
    title: '希望する給与・待遇',
    desc: '報酬の割合、控除や費用の有無、支払い条件などを確認します。',
  },
  {
    num: '03',
    icon: 'Store',
    title: 'お店の雰囲気',
    desc: 'お店の方針や在籍層の雰囲気、接客スタイルが自分に合うか確認します。',
  },
  {
    num: '04',
    icon: 'Coffee',
    title: '仕事内容',
    desc: '具体的な仕事内容や業務分担、勤務条件について事前の説明を受けます。',
  },
  {
    num: '05',
    icon: 'ShieldCheck',
    title: 'サポート体制',
    desc: '相談できる女性スタッフや担当者の有無、困ったときの対応方法を確認します。',
  },
];

const SCOUT_WARNINGS: {
  num: string;
  icon: 'HelpCircle' | 'BadgeAlert' | 'FileWarning' | 'Lock' | 'Hand';
  title: string;
  desc: string;
}[] = [
  {
    num: '01',
    icon: 'HelpCircle',
    title: '仕事内容や条件を曖昧に説明する',
    desc: '具体的な仕事内容や勤務条件を説明せず、応募や面接を急かす場合は注意が必要です。納得できるまで質問し、説明が曖昧な場合は立ち止まりましょう。',
  },
  {
    num: '02',
    icon: 'BadgeAlert',
    title: '高額な収入を簡単に保証する',
    desc: '「誰でも必ず稼げる」「確実に高収入」など、根拠のない保証表現には注意しましょう。収入は勤務時間や状況によって変動するため、計算の仕組みを確認することが大切です。',
  },
  {
    num: '03',
    icon: 'FileWarning',
    title: '給与や控除の説明が不透明',
    desc: '報酬の計算方法だけでなく、控除・雑費・衣装代などの費用の有無、支払い方法や支払い時期について明確な説明を受けてください。',
  },
  {
    num: '04',
    icon: 'Lock',
    title: '個人情報を不必要に要求する',
    desc: '相談段階にもかかわらず、必要性や利用目的が分からない個人情報の提出を求められた場合は慎重になりましょう。',
  },
  {
    num: '05',
    icon: 'Hand',
    title: '断っても強引に勧誘する',
    desc: '応募や面接を無理に迫られた場合は、その場で判断せず、いったん連絡やその場を離れて落ち着いて相談できる相手を探しましょう。',
  },
];

const PRE_CHECKLIST_ITEMS: {
  id: string;
  title: string;
  reason: string;
}[] = [
  {
    id: 'work-content',
    title: '具体的な仕事内容',
    reason: '実際の接客時間やサービス内容、禁止事項（キス・粘膜接触なし、飲酒不要など）を事前に把握するため。',
  },
  {
    id: 'salary-calc',
    title: '給与や報酬の計算方法',
    reason: '売上に対するバック率やコース別の手取り目安を理解し、後から認識違いが起きないようにするため。',
  },
  {
    id: 'deductions',
    title: '控除や費用の有無',
    reason: '待機料・厚生費・衣装代・雑費などの名目で差し引かれる費用が本当にないか（0円か）確かめるため。',
  },
  {
    id: 'payment-timing',
    title: '支払い方法と支払い時期',
    reason: '退勤時の即日現金手渡しか後日払いか、受け取りタイミングを明確にしておくため。',
  },
  {
    id: 'hours-breaks',
    title: '勤務時間と休憩',
    reason: '10:00〜24:00の中で希望時間帯が選べるか、長時間勤務時の休憩ルールがあるか確認するため。',
  },
  {
    id: 'shift-changes',
    title: '出勤日数やシフトの変更',
    reason: '週1日や短時間の相談が可能か、体調不良や急用でお休みしたい際の連絡手順を知るため。',
  },
  {
    id: 'transport',
    title: '交通費や移動に関する条件',
    reason: '最寄り駅からの通いやすさや、遠方からの交通費支給条件・適用ルールを把握するため。',
  },
  {
    id: 'support-contact',
    title: '困ったときの相談先',
    reason: '勤務中や応募前後に不安が生じた際、誰に連絡して対応してもらえるか確認しておくため。',
  },
  {
    id: 'privacy-handling',
    title: '個人情報の取り扱い',
    reason: 'Webへの顔写真掲載がないか、源氏名での勤務や本人確認書類の管理方法を確認するため。',
  },
  {
    id: 'leaving-process',
    title: '辞退や退店の際の手続き',
    reason: '体験入店後や検討段階で合わないと感じたときに、引き止めや違約金なく辞退できるか確認するため。',
  },
];

const RELATED_COLUMNS = [
  {
    num: '01',
    slug: 'tobita-street-compare',
    category: '通りの特徴',
    readTime: '5分',
    title: '飛田新地の通りごとの特徴を知ろう',
    summary:
      '青春通り・メイン通り・大門通り・裏通りなど、各通りの街並みや雰囲気の違いと、お店選びでの見方を整理しています。',
    image: '/images/shops_col_street_guide_1794559559648.jpg',
    imageFallback: '/assets/images/shops_col_street_guide_1794559559648.jpg',
    imageAlt: '落ち着いた伝統的な和風料亭街並みのイメージ',
  },
  {
    num: '02',
    slug: 'avoid-shop-selection-mistakes-in-tobitashinchi',
    category: 'お店選び',
    readTime: '5分',
    title: '初めてのお店選びで確認したいポイント',
    summary:
      '通りの名前や第一印象だけで決める前に、給与・控除・勤務条件やお店のサポート体制をどう見比べるかを解説しています。',
    image: '/images/shops_consult_indoor_1794559560656.jpg',
    imageFallback: '/assets/images/shops_consult_indoor_1794559560656.jpg',
    imageAlt: '清潔感のある明るい和風相談ラウンジのイメージ',
  },
  {
    num: '03',
    slug: 'tobitashinchi-scout-fraud-avoidance-safe-recruitment',
    category: '安全・確認',
    readTime: '5分',
    title: '悪質な求人やスカウトに注意する方法',
    summary:
      '不透明な条件提示や過度な保証表現を見極めるチェックポイントと、納得して相談先を選ぶための確認事項をまとめています。',
    image: '/images/shops_safe_decision_1794559562432.jpg',
    imageFallback: '/assets/images/shops_safe_decision_1794559562432.jpg',
    imageAlt: '障子越しの自然光が差し込む安心感のある落ち着いた和室の一角',
  },
];

const SHOPS_FAQS = [
  {
    q: '飛田新地にはどのようなお店がありますか？',
    a: '飛田新地には料理組合に加盟する料亭が複数あり、通りの雰囲気や店舗の規模、在籍する女性の年齢層、仲居さん・スタッフのサポート体制などはお店ごとに異なります。当グループでもメイン通り・青春通り・裏通りのそれぞれにお店を展開しているため、ご希望の雰囲気や働き方に合わせて比較できます。',
  },
  {
    q: '通りによって何が違いますか？中央のほうが良いのでしょうか？',
    a: '青春通り、メイン通り、大門通り、裏通りなど、通りによって街並みや雰囲気、在籍する女性の年齢層や客層に違いがあります。よく「中央が良い」と言われますが、実際にはお客様は複数の通りを見て回ってから女の子を選ばれるため、中央かそれ以外かだけで有利・不利が決まるわけではありません。同じ通りでも店舗ごとに衣装や方針が異なるため、お店単位で確認することが大切です。',
  },
  {
    q: '自分に合うお店はどうやって選べばいいですか？',
    a: 'まずは「働きたい時間帯・出勤日数」「重視したい待遇」「希望する雰囲気」を整理したうえで、仕事内容や控除の有無、困ったときの相談先などを比較して選ぶのが安心です。希望が定まっていない場合は、相談しながら整理することもできます。',
  },
  {
    q: '未経験でもお店について相談できますか？',
    a: 'はい、満20歳以上の女性であれば未経験の方でもご相談いただけます。飛田新地の仕組みや各通りの違い、初めての方向けに確認しておきたい点まで、女性スタッフが順を追ってご説明します。',
  },
  {
    q: 'お店によって給与や待遇は違いますか？',
    a: '報酬の計算基準や控除・費用の有無、衣装貸出・寮・交通費などのサポート条件は店舗や募集窓口によって異なる場合があります。当直営窓口では売上50%バック・待機料や厚生費などの控除0円・即日現金手渡しで明確にご案内しています。',
  },
  {
    q: '面接前に仕事内容を確認できますか？',
    a: 'はい、応募や面接の前のLINE相談の段階から確認できます。個室での短時間接客（15〜20分基本）、キス・粘膜接触なし、飲酒不要、清掃・お呼び込みの分担など、具体的なルールを事前にご説明します。',
  },
  {
    q: '給与や控除について事前に聞けますか？',
    a: 'はい、事前に確認できます。報酬の計算方法や、待機料・厚生費・衣装代などの引き物の有無、お支払いタイミングまで曖昧にせずお答えします。',
  },
  {
    q: '悪質なスカウトを見分ける方法はありますか？',
    a: '仕事内容や控除の説明が曖昧なまま応募を急かす、根拠のない高額保証を強調する、利用目的の分からない個人情報を求める、断っても引き下がらないといった点がないかを確認することが大切です。不審に感じたらその場で決めず距離を取りましょう。',
  },
  {
    q: 'LINEで相談するだけでも大丈夫ですか？',
    a: 'はい、相談だけでも問題ありません。「まず通りやお店の雰囲気を聞いてみたい」「自分の希望条件に合うお店があるか確認したい」といった段階でも、匿名でご質問いただけます。',
  },
  {
    q: 'お店選びを相談した後、必ず応募しなければいけませんか？',
    a: 'いいえ、相談したからといって必ず応募する必要はありません。話を聞いて条件を把握したうえで、応募や見学に進むかどうかはご自身の意思でゆっくりご判断いただけます。',
  },
];

export default function ShopsPage({
  onNavigateHome,
  onNavigateTopic,
  onNavigateBlog,
  onNavigateFaq,
  onInjectedScroll,
}: ShopsPageProps) {
  const [selectedStreetId, setSelectedStreetId] = useState<string>('all');
  const [checkedIds, setCheckedIds] = useState<Record<string, boolean>>({});
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

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

  const toggleCheckItem = (id: string) => {
    setCheckedIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const checkedCount = PRE_CHECKLIST_ITEMS.filter((item) => checkedIds[item.id]).length;

  const visibleStreets =
    selectedStreetId === 'all'
      ? STREETS_DATA
      : STREETS_DATA.filter((s) => s.id === selectedStreetId);

  // Sync structured data (WebPage + BreadcrumbList + FAQPage)
  useEffect(() => {
    const schemaData = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'WebPage',
          '@id': 'https://tobitashinchi-recruit.com/shops#webpage',
          'url': 'https://tobitashinchi-recruit.com/shops',
          'name': '飛田新地のお店選びガイド｜通りの特徴・求人の見分け方｜飛田ガールズ',
          'description':
            '飛田新地で働くことを検討している女性へ。主な通りの特徴やお店選びのポイント、求人やスカウトを確認する際の注意点を分かりやすく解説します。',
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
          '@id': 'https://tobitashinchi-recruit.com/shops#breadcrumb',
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
              'name': 'お店選び・通りの特徴',
              'item': 'https://tobitashinchi-recruit.com/shops',
            },
          ],
        },
        {
          '@type': 'FAQPage',
          '@id': 'https://tobitashinchi-recruit.com/shops#faq',
          'mainEntity': SHOPS_FAQS.map((item) => ({
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
              お店選び・通りの特徴
            </li>
          </ol>
        </nav>
      </div>

      <div className="max-w-[1140px] mx-auto px-5 sm:px-6 space-y-14 sm:space-y-20">
        {/* =========================================================
            SECTION 01：ファーストビュー
            PC：左にコピー・CTA、右に画像
            スマホ：見出し → サブコピー → 画像 → CTA
           ========================================================= */}
        <section className="bg-white rounded-2xl p-6 sm:p-8 lg:p-11 border border-[#F0E4E9]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 lg:gap-10 items-center">
            <div className="lg:col-span-7 flex flex-col gap-5 sm:gap-6">
              <div className="flex flex-wrap items-center gap-2 text-[13px] text-[#888087]">
                <span className="font-bold text-[#B83B67]">お店選びガイド</span>
                <span aria-hidden="true">·</span>
                <span>通りの比較と確認ポイント</span>
                <span aria-hidden="true">·</span>
                <span>満20歳以上の女性対象</span>
              </div>

              <h1 className="text-[26px] sm:text-[32px] lg:text-[34px] font-bold text-[#29252A] leading-[1.35] tracking-tight">
                自分に合うお店、
                <br />
                どうやって選べばいい？
              </h1>

              <p className="text-[15px] sm:text-[16px] text-[#29252A] leading-[1.8]">
                飛田新地にはさまざまなお店があります。通りごとの特徴や、お店選びで確認しておきたいポイントを知って、自分に合った環境を見つけましょう。
              </p>

              {/* スマホ用メイン画像（見出し・サブコピーの後、CTAの前） */}
              <div className="lg:hidden space-y-2">
                <div className="rounded-2xl overflow-hidden border border-[#F0E4E9] bg-[#FFF8FA] aspect-4/3">
                  <img
                    src={HERO_IMG}
                    alt="清潔感のある伝統的な和風料亭街並みと温かな灯りのイメージ"
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
                  ※伝統的な和風料亭街の落ち着いた街並みイメージです
                </p>
              </div>

              <div className="flex flex-wrap gap-x-5 gap-y-2 text-[14px] text-[#29252A] pt-0.5">
                <span className="inline-flex items-center gap-1.5 font-medium">
                  <LucideIcon name="Check" size={15} className="text-[#D96A91]" />
                  <span>4つの通りの特徴を比較</span>
                </span>
                <span className="inline-flex items-center gap-1.5 font-medium">
                  <LucideIcon name="Check" size={15} className="text-[#D96A91]" />
                  <span>事前確認チェックリスト付き</span>
                </span>
                <span className="inline-flex items-center gap-1.5 font-medium">
                  <LucideIcon name="Check" size={15} className="text-[#D96A91]" />
                  <span>相談のみでも利用可能</span>
                </span>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-1">
                <a
                  href={LINE_OFFICIAL_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => {
                    e.preventDefault();
                    handleLineClick(
                      '【お店選びページより】自分に合うお店や通りの違いについて相談したいです。'
                    );
                  }}
                  className="h-[52px] px-7 rounded-full bg-[#06C755] hover:bg-[#05b34c] text-white font-bold text-[15px] sm:text-[16px] transition-colors flex items-center justify-center gap-2 whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <LucideIcon name="MessageCircle" size={18} className="fill-white text-white shrink-0" />
                  <span>LINEでお店選びについて相談する</span>
                </a>
                <a
                  href="#streets-compare"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection('streets-compare');
                  }}
                  className="h-[52px] px-5 rounded-full bg-white hover:bg-[#F5DCE6]/40 text-[#B83B67] border border-[#F0E4E9] font-bold text-[14px] sm:text-[15px] transition-colors flex items-center justify-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <span>通りの特徴を比較する</span>
                  <LucideIcon name="ChevronDown" size={16} />
                </a>
              </div>
            </div>

            {/* PC用メイン画像 */}
            <div className="hidden lg:flex lg:col-span-5 flex-col gap-2">
              <div className="rounded-2xl overflow-hidden border border-[#F0E4E9] bg-[#FFF8FA] aspect-4/3">
                <img
                  src={HERO_IMG}
                  alt="清潔感のある伝統的な和風料亭街並みと温かな灯りのイメージ"
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
                ※伝統的な和風料亭街の落ち着いた街並みイメージです
              </p>
            </div>
          </div>

          {/* ページ内目次 */}
          <nav
            aria-label="ページ内目次"
            className="mt-7 pt-5 border-t border-[#F0E4E9] flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none text-[13px]"
          >
            {[
              { id: 'shop-points', label: '大切な4つのポイント' },
              { id: 'streets-compare', label: '通りの特徴を比較' },
              { id: 'how-to-choose', label: 'お店の見つけ方' },
              { id: 'scout-warning', label: '悪質な求人の見分け方' },
              { id: 'pre-check', label: '事前確認リスト' },
              { id: 'shops-columns', label: '関連コラム' },
              { id: 'shops-faq', label: 'よくある質問' },
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
            SECTION 02：お店選びで大切な4つのポイント（2×2カード）
           ========================================================= */}
        <section id="shop-points" className="scroll-mt-20 space-y-6">
          <div className="max-w-2xl space-y-2">
            <p className="text-[13px] font-bold text-[#B83B67]">
              お店選びの基本
            </p>
            <h2 className="text-[22px] sm:text-[27px] font-bold text-[#29252A] tracking-tight">
              お店選びで確認しておきたい4つのポイント
            </h2>
            <p className="text-[15px] sm:text-[16px] text-[#888087] leading-relaxed">
              どのお店を選ぶか考えるときは、雰囲気・条件・サポートの4つの視点から落ち着いて比べてみることが大切です。
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
            {SHOP_KEY_POINTS.map((card) => (
              <div
                key={card.num}
                className="bg-white rounded-2xl p-6 border border-[#F0E4E9] flex items-start gap-4"
              >
                <div className="w-12 h-12 rounded-xl bg-[#F5DCE6]/70 text-[#B83B67] flex items-center justify-center shrink-0">
                  <LucideIcon name={card.icon} size={22} strokeWidth={1.75} />
                </div>
                <div className="space-y-1.5">
                  <span className="text-[12px] font-bold text-[#D96A91] tracking-wider block">
                    {card.num}
                  </span>
                  <h3 className="text-[18px] font-bold text-[#29252A]">
                    {card.title}
                  </h3>
                  <p className="text-[15px] text-[#29252A]/85 leading-relaxed">
                    {card.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-2xl p-5 sm:p-6 border border-[#F0E4E9] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1 text-center sm:text-left">
              <p className="text-[16px] font-bold text-[#29252A]">
                まずは気になるポイントから確認してみませんか？
              </p>
              <p className="text-[14px] text-[#888087]">
                「雰囲気や待遇の違いを知りたい」という段階でも気軽にご質問いただけます。
              </p>
            </div>
            <a
              href={LINE_OFFICIAL_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => {
                e.preventDefault();
                handleLineClick('【お店選びページより】お店選びで確認したいポイントについて相談したいです。');
              }}
              className="w-full sm:w-auto h-[50px] px-7 rounded-full bg-[#06C755] hover:bg-[#05b34c] text-white font-bold text-[15px] transition-colors flex items-center justify-center gap-2 whitespace-nowrap shrink-0 cursor-pointer"
            >
              <LucideIcon name="MessageCircle" size={18} className="fill-white text-white shrink-0" />
              <span>お店選びについて相談する</span>
            </a>
          </div>
        </section>

        {/* =========================================================
            SECTION 03：飛田新地の主な通りと特徴
            PC：横幅いっぱいの比較表 / スマホ：専用比較カード
           ========================================================= */}
        <section id="streets-compare" className="scroll-mt-20 space-y-6">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
            <div className="max-w-2xl space-y-2">
              <p className="text-[13px] font-bold text-[#B83B67]">
                通りごとの違いを知る
              </p>
              <h2 className="text-[22px] sm:text-[27px] font-bold text-[#29252A] tracking-tight">
                飛田新地の主な通りと特徴を比較
              </h2>
              <p className="text-[15px] sm:text-[16px] text-[#888087] leading-relaxed">
                通りによって街並みや雰囲気には違いがあります。まずはそれぞれの特徴を知って、お店選びの参考にしてみましょう。
              </p>
            </div>

            {/* インタラクティブ絞り込みタブ */}
            <div
              role="group"
              aria-label="通りの表示切り替え"
              className="flex flex-wrap items-center gap-1.5 p-1.5 bg-white rounded-xl border border-[#F0E4E9] self-start lg:self-auto"
            >
              <button
                type="button"
                onClick={() => setSelectedStreetId('all')}
                className={`px-3 py-2 rounded-lg text-[13px] font-bold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  selectedStreetId === 'all'
                    ? 'bg-[#D96A91] text-white'
                    : 'text-[#29252A] hover:bg-[#F5DCE6]/50'
                }`}
              >
                すべて表示
              </button>
              {STREETS_DATA.map((st) => (
                <button
                  key={st.id}
                  type="button"
                  onClick={() => setSelectedStreetId(st.id)}
                  className={`px-3 py-2 rounded-lg text-[13px] font-bold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    selectedStreetId === st.id
                      ? 'bg-[#D96A91] text-white'
                      : 'text-[#29252A] hover:bg-[#F5DCE6]/50'
                  }`}
                >
                  {st.name}
                </button>
              ))}
            </div>
          </div>

          {/* PC用：横幅いっぱいの読みやすい比較表 */}
          <div className="hidden lg:block bg-white rounded-2xl border border-[#F0E4E9] overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#F5DCE6]/70 border-b border-[#F0E4E9] text-[14px] font-bold text-[#29252A]">
                  <th className="py-4 px-5 w-[16%]">通りの名称</th>
                  <th className="py-4 px-5 w-[22%]">街並みや雰囲気</th>
                  <th className="py-4 px-5 w-[20%]">周辺環境</th>
                  <th className="py-4 px-5 w-[21%]">店舗ごとの違い</th>
                  <th className="py-4 px-5 w-[21%]">お店選びで確認したいこと</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F0E4E9] text-[15px] leading-[1.7] text-[#29252A]">
                {visibleStreets.map((street) => (
                  <tr key={street.id} className="align-top hover:bg-[#FFF8FA]/70 transition-colors">
                    <td className="py-5 px-5">
                      <div className="flex items-start gap-2.5">
                        <span className="w-8 h-8 rounded-lg bg-[#F5DCE6]/70 text-[#B83B67] flex items-center justify-center shrink-0 mt-0.5">
                          <LucideIcon name={street.icon} size={16} />
                        </span>
                        <div>
                          <div className="font-bold text-[16px] text-[#29252A]">
                            {street.name}
                          </div>
                          <div className="text-[12.5px] text-[#888087] mt-0.5">
                            {street.reading}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-5 px-5 text-[#29252A]/90">{street.atmosphere}</td>
                    <td className="py-5 px-5 text-[#29252A]/90">{street.environment}</td>
                    <td className="py-5 px-5 text-[#29252A]/90">{street.shopDifferences}</td>
                    <td className="py-5 px-5 font-medium text-[#29252A] bg-[#FFF8FA]/60">
                      {street.checkPoints}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* スマホ・タブレット用：横スクロール不要の通り別比較カード */}
          <div className="lg:hidden space-y-4">
            {visibleStreets.map((street) => (
              <article
                key={street.id}
                className="bg-white rounded-2xl p-5 sm:p-6 border border-[#F0E4E9] space-y-4"
              >
                <div className="flex items-center gap-3 pb-3 border-b border-[#F0E4E9]">
                  <span className="w-10 h-10 rounded-xl bg-[#F5DCE6]/70 text-[#B83B67] flex items-center justify-center shrink-0">
                    <LucideIcon name={street.icon} size={18} />
                  </span>
                  <div>
                    <h3 className="text-[18px] font-bold text-[#29252A] leading-snug">
                      {street.name}
                    </h3>
                    <p className="text-[12.5px] text-[#888087]">{street.reading}</p>
                  </div>
                </div>

                <dl className="space-y-3.5 text-[15px] leading-relaxed">
                  <div>
                    <dt className="text-[13px] font-bold text-[#B83B67] mb-1">
                      街並みや雰囲気
                    </dt>
                    <dd className="text-[#29252A]/90">{street.atmosphere}</dd>
                  </div>
                  <div>
                    <dt className="text-[13px] font-bold text-[#B83B67] mb-1">
                      周辺環境
                    </dt>
                    <dd className="text-[#29252A]/90">{street.environment}</dd>
                  </div>
                  <div>
                    <dt className="text-[13px] font-bold text-[#B83B67] mb-1">
                      店舗ごとの違い
                    </dt>
                    <dd className="text-[#29252A]/90">{street.shopDifferences}</dd>
                  </div>
                  <div className="p-3.5 rounded-xl bg-[#FFF8FA] border border-[#F0E4E9]">
                    <dt className="text-[13px] font-bold text-[#29252A] mb-1">
                      お店選びで確認したいこと
                    </dt>
                    <dd className="text-[14.5px] text-[#29252A]/90">{street.checkPoints}</dd>
                  </div>
                </dl>
              </article>
            ))}
          </div>

          {/* 通り・場所だけで決まらない旨の補足説明 */}
          <div className="bg-white rounded-2xl p-5 sm:p-7 border border-[#F0E4E9] space-y-2.5">
            <div className="flex items-center gap-2 text-[15px] font-bold text-[#B83B67]">
              <LucideIcon name="Info" size={18} />
              <span>「中央が良い」「通りの名前だけで決まる」とは限りません</span>
            </div>
            <p className="text-[15px] text-[#29252A]/90 leading-[1.8]">
              「中央エリアのほうが良い」と語られることもありますが、実際にはお客様はエリア内の通りをひと通り見て回ってから女の子を選ばれることがほとんどのため、中央かそれ以外かだけで有利・不利が決まるわけではありません。また、同じ通りの中であってもお店ごとに待遇や働きやすさ、仲居さん・スタッフのサポート体制、在籍層は異なります。当グループではメイン通り・青春通り・裏通りのそれぞれにお店を展開しているため、場所のイメージにとらわれすぎず、個々のお店の条件が自分に合うかを基準に納得してお選びいただけます。
            </p>
          </div>

          <div className="flex justify-center">
            <a
              href={LINE_OFFICIAL_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => {
                e.preventDefault();
                handleLineClick('【お店選びページより】それぞれの通りの違いや自分に合うお店について聞いてみたいです。');
              }}
              className="w-full sm:w-auto h-[52px] px-8 rounded-full bg-[#06C755] hover:bg-[#05b34c] text-white font-bold text-[15px] sm:text-[16px] transition-colors flex items-center justify-center gap-2 whitespace-nowrap shrink-0 cursor-pointer"
            >
              <LucideIcon name="MessageCircle" size={18} className="fill-white text-white shrink-0" />
              <span>自分に合うお店を聞いてみる</span>
            </a>
          </div>
        </section>

        {/* =========================================================
            SECTION 04：自分に合うお店を見つける方法
            分割レイアウト：左に5ステップ整理、右に情報収集イメージ写真＋CTA
           ========================================================= */}
        <section
          id="how-to-choose"
          className="bg-white rounded-2xl p-6 sm:p-8 lg:p-10 border border-[#F0E4E9] scroll-mt-20 space-y-7"
        >
          <div className="max-w-2xl space-y-2">
            <p className="text-[13px] font-bold text-[#B83B67]">
              希望条件の整理
            </p>
            <h2 className="text-[22px] sm:text-[27px] font-bold text-[#29252A] tracking-tight">
              あなたに合うお店を見つけるために
            </h2>
            <p className="text-[15px] sm:text-[16px] text-[#888087] leading-relaxed">
              お店選びで大切なのは、通りの名前だけではありません。自分が希望する条件を整理して、一つずつ確認することが大切です。
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* 左：5項目の整理リスト */}
            <div className="lg:col-span-7 divide-y divide-[#F0E4E9] border-t border-b border-[#F0E4E9]">
              {FIND_SHOP_STEPS.map((step) => (
                <div key={step.num} className="py-4 sm:py-5 flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl bg-[#FFF8FA] border border-[#F0E4E9] text-[#B83B67] flex items-center justify-center shrink-0 mt-0.5">
                    <LucideIcon name={step.icon} size={19} strokeWidth={1.75} />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[13px] font-bold text-[#D96A91] tabular-nums">
                        {step.num}
                      </span>
                      <h3 className="text-[17px] sm:text-[18px] font-bold text-[#29252A]">
                        {step.title}
                      </h3>
                    </div>
                    <p className="text-[15px] text-[#29252A]/85 leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* 右：安心感のある情報収集イメージ＋クロージングCTA */}
            <div className="lg:col-span-5 space-y-5">
              <div className="space-y-2">
                <div className="rounded-2xl overflow-hidden border border-[#F0E4E9] bg-[#FFF8FA] aspect-4/3">
                  <img
                    src={MATCHING_IMG}
                    alt="明るい室内でスマートフォンと手帳を見ながら自分に合ったお店や条件を比較検討する女性"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      const t = e.currentTarget;
                      if (!t.dataset.fallback) {
                        t.dataset.fallback = '1';
                        t.src = MATCHING_IMG_FALLBACK;
                      }
                    }}
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="text-[12px] text-[#888087] text-right">
                  ※条件を整理して比較するイメージ写真です
                </p>
              </div>

              <div className="rounded-2xl bg-[#FFF8FA] border border-[#F0E4E9] p-5 sm:p-6 space-y-4">
                <p className="text-[15px] text-[#29252A] leading-[1.8] font-medium">
                  希望する条件がまだはっきり決まっていなくても大丈夫。気になることを整理しながら、自分に合うお店を考えてみましょう。
                </p>
                <a
                  href={LINE_OFFICIAL_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => {
                    e.preventDefault();
                    handleLineClick('【お店選びページより】希望条件を整理しながら自分に合うお店を相談したいです。');
                  }}
                  className="w-full h-[50px] px-6 rounded-full bg-[#06C755] hover:bg-[#05b34c] text-white font-bold text-[15px] transition-colors flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer"
                >
                  <LucideIcon name="MessageCircle" size={18} className="fill-white text-white shrink-0" />
                  <span>LINEでお店選びを相談する</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================
            SECTION 05：悪質な求人・スカウトの見分け方
            薄いピンク×淡いベージュ配色で注意喚起をわかりやすく差別化
           ========================================================= */}
        <section
          id="scout-warning"
          className="rounded-2xl p-6 sm:p-8 lg:p-10 bg-[#FCF6F2] border border-[#EAD9D2] scroll-mt-20 space-y-6"
        >
          <div className="max-w-2xl space-y-2">
            <div className="inline-flex items-center gap-1.5 text-[13px] font-bold text-[#A55842]">
              <LucideIcon name="AlertTriangle" size={16} className="text-[#D78A75]" />
              <span>応募・相談前の注意ポイント</span>
            </div>
            <h2 className="text-[22px] sm:text-[27px] font-bold text-[#29252A] tracking-tight">
              悪質な求人やスカウトには注意しましょう
            </h2>
            <p className="text-[15px] sm:text-[16px] text-[#29252A]/85 leading-relaxed">
              安心して仕事を探すために、求人情報やスカウトの内容をしっかり確認しましょう。
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {SCOUT_WARNINGS.map((item, idx) => (
              <div
                key={item.num}
                className={`rounded-2xl p-5 sm:p-6 border border-[#EAD9D2] flex items-start gap-4 ${
                  idx === SCOUT_WARNINGS.length - 1 ? 'md:col-span-2 bg-[#FFF8FA]' : 'bg-white'
                }`}
              >
                <div className="w-11 h-11 rounded-xl bg-[#D78A75]/15 text-[#B45E47] flex items-center justify-center shrink-0">
                  <LucideIcon name={item.icon} size={20} strokeWidth={1.75} />
                </div>
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="text-[13px] font-bold text-[#B45E47] tabular-nums">
                      {item.num}
                    </span>
                    <h3 className="text-[17px] font-bold text-[#29252A]">
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-[15px] text-[#29252A]/85 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-2xl bg-[#FFF0F5] border border-[#F5DCE6] p-5 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-[14.5px] sm:text-[15px] text-[#29252A] leading-relaxed text-center sm:text-left">
              飛田新地では料理組合の規約上、街頭でのスカウト行為は禁止されています。仲介を通さず条件を直接確認できる窓口かどうかも、安心材料の一つとして確かめておきましょう。
            </p>
            <a
              href={LINE_OFFICIAL_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => {
                e.preventDefault();
                handleLineClick('【お店選びページより】直営窓口での待遇や応募条件について確認したいです。');
              }}
              className="w-full sm:w-auto h-[50px] px-7 rounded-full bg-[#06C755] hover:bg-[#05b34c] text-white font-bold text-[15px] transition-colors flex items-center justify-center gap-2 whitespace-nowrap shrink-0 cursor-pointer"
            >
              <LucideIcon name="MessageCircle" size={18} className="fill-white text-white shrink-0" />
              <span>待遇について確認する</span>
            </a>
          </div>
        </section>

        {/* =========================================================
            SECTION 06：お店選びで事前に確認したいこと（チェックリスト）
           ========================================================= */}
        <section id="pre-check" className="scroll-mt-20 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 items-center bg-white rounded-2xl p-6 sm:p-8 border border-[#F0E4E9]">
            <div className="lg:col-span-7 space-y-3">
              <p className="text-[13px] font-bold text-[#B83B67]">
                10項目のチェックリスト
              </p>
              <h2 className="text-[22px] sm:text-[27px] font-bold text-[#29252A] tracking-tight">
                相談や面接の前に確認しておきたいこと
              </h2>
              <p className="text-[15px] sm:text-[16px] text-[#888087] leading-relaxed">
                聞くべき内容を事前に整理しておくと、面接やLINE相談の際に聞き忘れを防げます。気になる項目をタップしてチェックできます。
              </p>
              <div className="flex items-center gap-4 pt-1 text-[14px]">
                <span className="font-bold text-[#B83B67] tabular-nums">
                  確認チェック：{checkedCount} / {PRE_CHECKLIST_ITEMS.length} 項目
                </span>
                {checkedCount > 0 && (
                  <button
                    type="button"
                    onClick={() => setCheckedIds({})}
                    className="text-[13px] text-[#888087] hover:text-[#29252A] underline cursor-pointer"
                  >
                    チェックをリセット
                  </button>
                )}
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-2xl overflow-hidden border border-[#F0E4E9] bg-[#FFF8FA] aspect-4/3">
                <img
                  src={CHECKLIST_IMG}
                  alt="手帳とペン、スマートフォンを用意して面接前の質問事項を整理するイメージ"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    const t = e.currentTarget;
                    if (!t.dataset.fallback) {
                      t.dataset.fallback = '1';
                      t.src = CHECKLIST_IMG_FALLBACK;
                    }
                  }}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-4">
            {PRE_CHECKLIST_ITEMS.map((item, idx) => {
              const isChecked = !!checkedIds[item.id];
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => toggleCheckItem(item.id)}
                  aria-pressed={isChecked}
                  className={`text-left rounded-2xl p-5 border transition-colors flex items-start gap-3.5 cursor-pointer ${
                    isChecked
                      ? 'bg-[#FFF0F5] border-[#D96A91]'
                      : 'bg-white border-[#F0E4E9] hover:bg-[#FFF8FA]'
                  }`}
                >
                  <span
                    className={`w-6 h-6 rounded-md border flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                      isChecked
                        ? 'bg-[#D96A91] border-[#D96A91] text-white'
                        : 'bg-white border-[#D96A91]/50 text-transparent'
                    }`}
                  >
                    <LucideIcon name="Check" size={14} strokeWidth={2.5} />
                  </span>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[12.5px] font-bold text-[#D96A91] tabular-nums">
                        {String(idx + 1).padStart(2, '0')}
                      </span>
                      <h3 className="text-[16px] sm:text-[17px] font-bold text-[#29252A]">
                        {item.title}
                      </h3>
                    </div>
                    <p className="text-[14px] sm:text-[14.5px] text-[#888087] leading-relaxed">
                      {item.reason}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        {/* =========================================================
            SECTION 07：関連コラム（実在する3記事へリンク）
           ========================================================= */}
        <section
          id="shops-columns"
          className="bg-white rounded-2xl p-6 sm:p-8 lg:p-10 border border-[#F0E4E9] scroll-mt-20 space-y-6"
        >
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-2">
              <h2 className="text-[22px] sm:text-[27px] font-bold text-[#29252A] tracking-tight">
                お店選びについて、もっと詳しく知りたい方へ
              </h2>
              <p className="text-[15px] text-[#888087] leading-relaxed">
                通りの特徴や初めてのお店選びで確認すべきポイント、求人確認時の注意点をまとめたコラムです。
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
                    <p className="text-[14.5px] text-[#888087] leading-relaxed">
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
            SECTION 08：よくある質問（10問アコーディオン）
           ========================================================= */}
        <section id="shops-faq" className="scroll-mt-20 space-y-6">
          <div className="max-w-2xl space-y-2">
            <h2 className="text-[22px] sm:text-[27px] font-bold text-[#29252A] tracking-tight">
              お店選びについてよくある質問
            </h2>
            <p className="text-[15px] text-[#888087] leading-relaxed">
              通りや店舗の違い、相談後の流れなど、お店選びで寄せられやすいご質問をまとめました。
            </p>
          </div>

          <div className="bg-white rounded-2xl p-4 sm:p-7 border border-[#F0E4E9] divide-y divide-[#F0E4E9]">
            {SHOPS_FAQS.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div key={idx} className="py-3.5 first:pt-0 last:pb-0">
                  <button
                    type="button"
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    aria-expanded={isOpen}
                    className="w-full text-left flex items-start justify-between gap-4 py-2 text-[15.5px] sm:text-[16px] font-bold text-[#29252A] hover:text-[#B83B67] cursor-pointer transition-colors"
                  >
                    <span className="flex items-start gap-2.5">
                      <span className="text-[#D96A91] font-bold shrink-0 tabular-nums">
                        Q{idx + 1}.
                      </span>
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
                          <div className="p-4 rounded-xl bg-[#FFF8FA] border border-[#F0E4E9] text-[15px] text-[#29252A]/90 leading-relaxed">
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
                handleLineClick('【お店選びページより】お店選びについて気になる点をLINEで質問したいです。');
              }}
              className="w-full sm:w-auto h-[50px] px-7 rounded-full bg-[#06C755] hover:bg-[#05b34c] text-white font-bold text-[15px] transition-colors flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer"
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
            SECTION 09：最終LINE相談エリア
            白背景・淡いピンクのアクセント・大きなLINEボタン
           ========================================================= */}
        <section
          id="shops-line-cta"
          className="bg-white rounded-2xl p-6 sm:p-10 lg:p-12 border-2 border-[#F5DCE6] text-center space-y-6 scroll-mt-20"
        >
          <div className="w-12 h-12 rounded-2xl bg-[#FFF8FA] border border-[#F5DCE6] text-[#06C755] flex items-center justify-center mx-auto">
            <LucideIcon name="MessageCircle" size={24} />
          </div>

          <div className="max-w-2xl mx-auto space-y-3">
            <h2 className="text-[22px] sm:text-[27px] font-bold text-[#29252A] tracking-tight leading-snug">
              自分に合うお店を、一緒に考えてみませんか？
            </h2>
            <p className="text-[15px] sm:text-[16px] text-[#29252A]/85 leading-relaxed">
              当グループではメイン通り・青春通り・裏通りのそれぞれにお店を展開しているため、ご希望の雰囲気や働き方に合わせてグループ内の店舗からお選びいただけます。「中央が良いのかな？」と迷われる方も多いですが、お客様は複数の通りを見て回ってから選ばれるため、場所だけで決まるわけではありません。各店の雰囲気や待遇、仕事内容なども事前に確認できますので、まずはお気軽にご相談ください。
            </p>
          </div>

          <div className="pt-1 flex flex-col items-center gap-3">
            <a
              href={LINE_OFFICIAL_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => {
                e.preventDefault();
                handleLineClick('【お店選びページより】自分に合うお店についてLINEで相談したいです。');
              }}
              className="w-full sm:w-auto sm:min-w-[320px] h-[56px] px-8 rounded-full bg-[#06C755] hover:bg-[#05b34c] text-white font-bold text-[16px] sm:text-[17px] transition-colors cursor-pointer flex items-center justify-center gap-2.5 whitespace-nowrap"
            >
              <LucideIcon name="MessageCircle" size={20} className="fill-white text-white shrink-0" />
              <span>LINEでお店選びを相談する</span>
            </a>
          </div>

          <div className="max-w-3xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-left">
            <div className="bg-[#FFF8FA] rounded-xl p-4 border border-[#F0E4E9] space-y-1">
              <div className="flex items-center gap-1.5 text-[13.5px] font-bold text-[#B83B67]">
                <LucideIcon name="MessageSquare" size={14} />
                <span>相談だけでも大丈夫です</span>
              </div>
              <p className="text-[13.5px] text-[#29252A]/85 leading-relaxed">
                質問のみ・条件の確認のみでも匿名でご相談いただけます。
              </p>
            </div>
            <div className="bg-[#FFF8FA] rounded-xl p-4 border border-[#F0E4E9] space-y-1">
              <div className="flex items-center gap-1.5 text-[13.5px] font-bold text-[#B83B67]">
                <LucideIcon name="ShieldCheck" size={14} />
                <span>強引な勧誘はありません</span>
              </div>
              <p className="text-[13.5px] text-[#29252A]/85 leading-relaxed">
                説明を聞いたうえで応募するかどうかはご自身で決められます。
              </p>
            </div>
            <div className="bg-[#FFF8FA] rounded-xl p-4 border border-[#F0E4E9] space-y-1">
              <div className="flex items-center gap-1.5 text-[13.5px] font-bold text-[#B83B67]">
                <LucideIcon name="Lock" size={14} />
                <span>応募資格・法令遵守</span>
              </div>
              <p className="text-[13.5px] text-[#29252A]/85 leading-relaxed">
                満20歳以上の女性を対象としています（20歳未満・高校生不可）。
              </p>
            </div>
          </div>

          {/* 関連ガイドへの内部リンク */}
          {onNavigateTopic && (
            <div className="pt-4 border-t border-[#F0E4E9] flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[13.5px]">
              <span className="text-[#888087] font-bold">関連ガイド:</span>
              <a
                href="/job"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigateTopic('job');
                }}
                className="text-[#B83B67] font-bold hover:underline"
              >
                仕事内容
              </a>
              <a
                href="/salary"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigateTopic('salary');
                }}
                className="text-[#B83B67] font-bold hover:underline"
              >
                給料・待遇
              </a>
              <a
                href="/workstyle"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigateTopic('workstyle');
                }}
                className="text-[#B83B67] font-bold hover:underline"
              >
                働き方・勤務シフト
              </a>
              <a
                href="/beginner"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigateTopic('beginner');
                }}
                className="text-[#B83B67] font-bold hover:underline"
              >
                未経験の方へ
              </a>
              <a
                href="/flow"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigateTopic('flow');
                }}
                className="text-[#B83B67] font-bold hover:underline"
              >
                応募・面接の流れ
              </a>
              <a
                href="/safety"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigateTopic('safety');
                }}
                className="text-[#B83B67] font-bold hover:underline"
              >
                安全・身バレ対策
              </a>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
