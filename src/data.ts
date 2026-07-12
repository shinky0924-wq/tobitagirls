/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ConcernItem, ReasonItem, FAQItem, TestimonialItem, JobFactItem, FlowStep } from './types';
// @ts-ignore
import tobitaCastOne from './assets/images/tobita_cast_one_real_1782374824918.jpg';
// @ts-ignore
import tobitaCastTwo from './assets/images/tobita_cast_two_real_1782374841336.jpg';
// @ts-ignore
import tobitaCastThree from './assets/images/tobita_cast_three_real_1782374857559.jpg';
// @ts-ignore
import tobitaSoftHero from './assets/images/tobita_soft_hero_1782370495398.jpg';
// @ts-ignore
import tobitaDreamHeroBanner from './assets/images/tobita_dream_hero_banner_1782557055526.jpg';
// @ts-ignore
import tobitaAdvisorAvatar from './assets/images/tobita_advisor_avatar_1782370695372.jpg';

// ==========================================
// 【LINE公式アカウント連携用設定】
// あなたのLINE公式アカウントのURL（例: https://lin.ee/xxxxx）をここに貼り付けてください。
// 空白（''）または初期値（'https://lin.ee/your_custom_line_id_here'）の場合は、
// 自動的にページ下部の「お悩み相談フォーム」にスクロールする親切設計になります。
// ==========================================
export const LINE_OFFICIAL_URL = 'https://lin.ee/phFZoea';

export const HERO_IMAGE_URL = tobitaDreamHeroBanner;
export const CONSULTANT_AVATAR_URL = tobitaAdvisorAvatar;

export const CONCERNS: ConcernItem[] = [
  {
    id: 'concern-1',
    iconName: 'Baby',
    title: '未経験でも',
    question: '働ける？'
  },
  {
    id: 'concern-2',
    iconName: 'ShieldAlert',
    title: '危険なお店',
    question: 'じゃない？'
  },
  {
    id: 'concern-3',
    iconName: 'EyeOff',
    title: '身バレ',
    question: 'したくない'
  },
  {
    id: 'concern-4',
    iconName: 'Store',
    title: 'お店選びで',
    question: '失敗したくない'
  },
  {
    id: 'concern-5',
    iconName: 'Coins',
    title: 'ちゃんと',
    question: '稼げる？'
  }
];

export const REASONS: ReasonItem[] = [
  {
    number: '01',
    iconName: 'MapPin',
    title: '飛田新地専門',
    description: '専門サイトだからこそ提供できる詳しい情報と信頼性があります。'
  },
  {
    number: '02',
    iconName: 'Award',
    title: '未経験歓迎店のみ紹介',
    description: '初心者向けの優良店をスタッフが厳選してご紹介いたします。'
  },
  {
    number: '03',
    iconName: 'Headphones',
    title: 'お店選びをサポート',
    description: 'あなたの希望にぴったり合うお店を一緒に丁寧にお探しします。'
  },
  {
    number: '04',
    iconName: 'MessageSquare',
    title: 'LINE相談OK',
    description: '24時間いつでもLINEでお気軽に、非対面で相談が可能です。'
  },
  {
    number: '05',
    iconName: 'Users',
    title: '面接同行可能',
    description: '初めての方でも安心できるよう、スタッフが面接に同行します。'
  },
  {
    number: '06',
    iconName: 'HandHeart',
    title: '入店後フォロー',
    description: '働き始めてからも、困ったことがあればしっかりサポート継続。'
  }
];

export const FAQS: FAQItem[] = [
  {
    id: 'faq-1',
    question: 'Q. 未経験でも大丈夫ですか？',
    answer: 'A. はい、もちろんです！飛田ガールズがご紹介するお店の多くは未経験者向けの丁寧な研修制度を設けています。最初は誰でも不安ですが、一から丁寧にお教えします。'
  },
  {
    id: 'faq-2',
    question: 'Q. 年齢制限はありますか？',
    answer: 'A. 18歳以上（高校生不可）であれば問題ありません。幅広い年齢層の方が活躍できるお店をご提案させていただきます。'
  },
  {
    id: 'faq-3',
    question: 'Q. 顔出しは必要ですか？',
    answer: 'A. 飛田新地のスタイルとして、玄関先に座る形になりますが、ネット広告やSNSなどへの写真掲載は一切行われないため、想像以上に身内に知られるリスクは極めて低いです。特定されない工夫もいつでも可能です。'
  },
  {
    id: 'faq-4',
    question: 'Q. 身バレ対策はありますか？',
    answer: 'A. 源氏名の使用はもちろん、プライバシー保護に非常に厳しい安全管理をしているお店を厳選してご紹介していますのでご安心ください。'
  },
  {
    id: 'faq-5',
    question: 'Q. 確実に稼げますか？お給料は全額日払いですか？',
    answer: 'A. はい、ご紹介する優良店の大半が完全日払い制（その日の分をその日に全額支給）を導入しています。日給3万円〜8万円以上稼ぐことも初日から十分に可能です。'
  },
  {
    id: 'faq-6',
    question: 'Q. ノルマや罰金などはありますか？',
    answer: 'A. いいえ、ノルマや罰金・ペナルティなどは一切ありません！自分のペースでストレスなくのびのびと働いていただけるのが飛田新地最大の魅力の一つです。'
  },
  {
    id: 'faq-7',
    question: 'Q. お酒が飲めなくても働けますか？',
    answer: 'A. はい、お酒が全く飲めなくても問題ありません！お茶やソフトドリンクでお仕事が可能です。お酒が不得意な方も多数活躍されています。'
  },
  {
    id: 'faq-8',
    question: 'Q. 週1日からや短時間でもシフトに入れますか？',
    answer: 'A. はい、大歓迎です。週1日・週末だけ・1日4〜5時間の短時間勤務など、昼職・学生・主婦の方のライフスタイルに合わせて、柔軟に調整できるお店をセレクトしてご紹介します。'
  },
  {
    id: 'faq-9',
    question: 'Q. 働くときの服や衣装はどうなりますか？',
    answer: 'A. ほとんどのお店で、着物やドレス、可愛い和服などの素敵な衣装が無料（または格好よい衣装レンタル完備）で用意されています。ご自身で準備する手間や余計な出費はありません。'
  },
  {
    id: 'faq-10',
    question: 'Q. 相談だけで実際に働かなくても大丈夫ですか？',
    answer: 'A. はい、もちろん大歓迎です！ご相談・お問い合わせ段階で無理にお仕事を勧めることは絶対にありません。話を聞いてみて「やっぱりやめておきます」でも全く問題ありませんので、まずはお気軽にご活用ください。'
  }
];

export const TESTIMONIALS: TestimonialItem[] = [
  {
    id: 'test-1',
    avatarUrl: tobitaCastOne,
    tag: '未経験からスタート',
    age: '24歳',
    status: 'アルバイト',
    quote: '最初は怖かったですが、相談の段階で丁寧に説明してもらえたので安心してスタートできました。今では生活が楽になりました！'
  },
  {
    id: 'test-2',
    avatarUrl: tobitaCastTwo,
    tag: '月収が大きくアップ',
    age: '22歳',
    status: 'フリーター',
    quote: 'お店選びを一緒にしてくれたので、自分に合った環境で働けています。月収も以前の数倍になりました！'
  },
  {
    id: 'test-3',
    avatarUrl: tobitaCastThree,
    tag: '相談だけでもOKでした',
    age: '21歳',
    status: '大学生',
    quote: '無理に勧められることもなく、自分のペースで考えられたのが良かったです。親身なサポートに感謝しています。'
  }
];

export const JOB_FACTS: JobFactItem[] = [
  {
    id: 'fact-1',
    iconName: 'Banknote',
    title: '日給目安',
    highlight: ['30,000円〜', '80,000円以上']
  },
  {
    id: 'fact-2',
    iconName: 'Sparkles',
    title: 'お店の特徴',
    highlight: ['未経験OK / 短時間OK', '個室待機 / 自由出勤など']
  },
  {
    id: 'fact-3',
    iconName: 'Clock',
    title: '勤務時間',
    highlight: ['10:00〜24:00の間で', '自由に選べます']
  },
  {
    id: 'fact-4',
    iconName: 'Home',
    title: '寮の有無',
    highlight: ['寮完備のお店も', '多数あります']
  },
  {
    id: 'fact-5',
    iconName: 'PiggyBank',
    title: '月給目安',
    highlight: ['500,000円〜', '1,500,000円以上']
  }
];

export const FLOW_STEPS: FlowStep[] = [
  { number: '01', title: 'LINE相談' },
  { number: '02', title: '希望ヒアリング' },
  { number: '03', title: 'お店紹介' },
  { number: '04', title: '面接' },
  { number: '05', title: '体験入店' },
  { number: '06', title: 'お仕事スタート' }
];
