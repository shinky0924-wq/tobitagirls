/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import faq100Json from '../data/faq100.json';

export type FAQ8Category = 
  | 'recruit'   // 応募・面接
  | 'salary'    // 給料
  | 'beginner'  // 未経験
  | 'hours'     // 勤務時間
  | 'privacy'   // 身バレ
  | 'dorm'      // 寮
  | 'wwork'     // Wワーク
  | 'leaving';  // 退店

export interface FAQCategoryDef {
  id: FAQ8Category | 'all' | 'popular';
  slug: string;
  label: string;
  shortLabel: string;
  icon: string;
  description: string;
}

export interface FAQ100Item {
  id: string;
  category: string;
  categoryLabel: string;
  question: string;
  answer: string;
  isPopular?: boolean;
  keywords: string[];
  eightCategory: FAQ8Category;
  eightCategoryLabel: string;
}

/**
 * 8 Major Categories for Tobita Shinchi FAQ
 * Requested structure:
 * 飛田新地求人 FAQ
 * │
 * ├─ 応募・面接
 * ├─ 給料
 * ├─ 未経験
 * ├─ 勤務時間
 * ├─ 身バレ
 * ├─ 寮
 * ├─ Wワーク
 * └─ 退店
 */
export const FAQ_8_CATEGORIES: FAQCategoryDef[] = [
  {
    id: 'all',
    slug: 'all',
    label: 'すべての質問',
    shortLabel: 'すべて',
    icon: 'Layers',
    description: '119問すべての疑問と回答を一覧で確認できます'
  },
  {
    id: 'recruit',
    slug: 'recruit',
    label: '応募・面接',
    shortLabel: '応募・面接',
    icon: 'UserCheck',
    description: '応募手順・私服面接・履歴書不要・友達応募・即日体入・年齢層について'
  },
  {
    id: 'salary',
    slug: 'salary',
    label: '給料',
    shortLabel: '給料',
    icon: 'Coins',
    description: '全額日払い・日給相場・50%バック・天引きなし・交通費・手渡しについて'
  },
  {
    id: 'beginner',
    slug: 'beginner',
    label: '未経験',
    shortLabel: '未経験',
    icon: 'Sparkles',
    description: '夜職初心者・お酒不要・接客の流れ・人見知り・客層・無料衣装＆メイクについて'
  },
  {
    id: 'hours',
    slug: 'hours',
    label: '勤務時間',
    shortLabel: '勤務時間',
    icon: 'Clock',
    description: '営業時間・短時間勤務・週1日・月数回・自由シフト・終電上がり・深夜送りについて'
  },
  {
    id: 'privacy',
    slug: 'privacy',
    label: '身バレ',
    shortLabel: '身バレ',
    icon: 'EyeOff',
    description: '顔写真ネット非掲載・親や家族同居・会社バレ防止・源氏名・個人情報破棄について'
  },
  {
    id: 'dorm',
    slug: 'dorm',
    label: '寮',
    shortLabel: '寮',
    icon: 'Home',
    description: '即日家具家電付き個室寮・敷金礼金0円・地方交通費支給・ペット可・家族寮について'
  },
  {
    id: 'wwork',
    slug: 'wwork',
    label: 'Wワーク',
    shortLabel: 'Wワーク',
    icon: 'Briefcase',
    description: '昼職OL・女子大生・主婦の副業掛け持ち・確定申告・本業にバレない対策について'
  },
  {
    id: 'leaving',
    slug: 'leaving',
    label: '退店',
    shortLabel: '退店',
    icon: 'DoorOpen',
    description: '即日退店・違約金なし・1日体験後の辞退・休職・トラブル対応・LINE相談について'
  }
];

export const FAQ_CATEGORIES = FAQ_8_CATEGORIES;

/**
 * Categorize each FAQ item into one of the 8 canonical themes
 */
export function categorizeFAQItem(item: { id: string; category: string; question: string; answer: string }): {
  eightCategory: FAQ8Category;
  eightCategoryLabel: string;
} {
  const q = item.question;

  // 1. Wワーク (Side jobs, dual careers, students, mothers)
  if (
    q.includes('Wワーク') || 
    q.includes('掛け持ち') || 
    q.includes('昼の仕事') || 
    q.includes('女子大生') || 
    q.includes('主婦や子育て') || 
    q.includes('確定申告') ||
    q.includes('マイナンバー')
  ) {
    return { eightCategory: 'wwork', eightCategoryLabel: 'Wワーク' };
  }

  // 2. 退店 (Quitting, resignation, trouble, consultation)
  if (
    q.includes('辞め') || 
    q.includes('退店') || 
    q.includes('退寮') || 
    q.includes('違約金') || 
    q.includes('合わないと感じたら') || 
    q.includes('ブランク') || 
    q.includes('移籍') || 
    q.includes('怒られたり') || 
    q.includes('イジメ') || 
    q.includes('トラブル') || 
    q.includes('妊娠') ||
    q.includes('相談だけでもLINE')
  ) {
    return { eightCategory: 'leaving', eightCategoryLabel: '退店' };
  }

  // 3. 寮 (Housing, dorms, moving)
  if (
    q.includes('寮') || 
    q.includes('住まい') || 
    q.includes('出稼ぎ') || 
    q.includes('ペット') || 
    q.includes('家族寮') || 
    q.includes('託児所') || 
    q.includes('引っ越し') || 
    q.includes('ホテル')
  ) {
    return { eightCategory: 'dorm', eightCategoryLabel: '寮' };
  }

  // 4. 身バレ (Privacy, anonymity, secret)
  if (
    q.includes('身バレ') || 
    q.includes('バレ') || 
    q.includes('顔写真') || 
    q.includes('SNS') || 
    q.includes('本名') || 
    q.includes('DM') || 
    q.includes('住民票') || 
    q.includes('個人情報') || 
    q.includes('知人') || 
    q.includes('知り合い') || 
    q.includes('アリバイ') || 
    q.includes('スマートフォン')
  ) {
    return { eightCategory: 'privacy', eightCategoryLabel: '身バレ' };
  }

  // 5. 勤務時間 (Hours, shifts, attendance, late night transport)
  if (
    q.includes('勤務時間') || 
    q.includes('出勤') || 
    q.includes('短期勤務') || 
    q.includes('土日祝') || 
    q.includes('平日') || 
    q.includes('シフト') || 
    q.includes('終電') || 
    q.includes('送迎') || 
    q.includes('お休み') ||
    q.includes('週1日') ||
    q.includes('月1日')
  ) {
    return { eightCategory: 'hours', eightCategoryLabel: '勤務時間' };
  }

  // 6. 給料 (Salary, payout, earnings, deduction)
  if (
    item.category === 'salary' || 
    q.includes('給') || 
    q.includes('日払い') || 
    q.includes('バック') || 
    q.includes('稼') || 
    q.includes('罰金') || 
    q.includes('天引き') || 
    q.includes('雑費') || 
    q.includes('交通費') || 
    q.includes('祝い金') || 
    q.includes('明細') || 
    q.includes('手渡し') || 
    q.includes('借金')
  ) {
    return { eightCategory: 'salary', eightCategoryLabel: '給料' };
  }

  // 7. 未経験 (Beginner, customer handling, costumes, alcohol, appearance)
  if (
    item.category === 'job' ||
    item.category === 'beauty' ||
    q.includes('未経験') || 
    q.includes('夜職の経験') || 
    q.includes('お酒') || 
    q.includes('接客の流れ') || 
    q.includes('会話が苦手') || 
    q.includes('客層') || 
    q.includes('客引き') || 
    q.includes('仲居') || 
    q.includes('危険な行為') || 
    q.includes('衛生面') || 
    q.includes('衣装') || 
    q.includes('ヘアメイク') || 
    q.includes('ぽっちゃり') || 
    q.includes('身長') || 
    q.includes('タトゥー') || 
    q.includes('髪色') || 
    q.includes('メガネ') || 
    q.includes('肌荒れ') || 
    q.includes('持ち物') || 
    q.includes('美容サロン') || 
    q.includes('靴') ||
    q.includes('指名制度') ||
    q.includes('同伴') ||
    q.includes('連絡先の交換') ||
    q.includes('生理中') ||
    q.includes('1組あたり') ||
    q.includes('タバコ') ||
    q.includes('お風呂')
  ) {
    return { eightCategory: 'beginner', eightCategoryLabel: '未経験' };
  }

  // 8. 応募・面接 (Application, interview, ID, age)
  return { eightCategory: 'recruit', eightCategoryLabel: '応募・面接' };
}

/**
 * Complete List of 119 Questions enriched with the 8 categories
 */
export const FAQ_100_LIST: FAQ100Item[] = (faq100Json as any[]).map(item => {
  const { eightCategory, eightCategoryLabel } = categorizeFAQItem(item);
  return {
    ...item,
    eightCategory,
    eightCategoryLabel
  };
});

/**
 * Representative TOP 10 Questions for the Top Page
 */
export const TOP_10_FAQ_IDS = [
  'faq-rec-1',    // 未経験でも応募できますか？
  'faq-sal-3',    // 「全額日払い（手渡し）」は本当にもらえますか？
  'faq-shift-1',  // 週1日だけの出勤でもOKですか？
  'faq-priv-1',   // 身バレしませんか？知り合いや家族に知られるのが一番怖いです。
  'faq-job-1',    // お酒は飲まないといけませんか？
  'faq-rec-3',    // 30代でも応募できますか？採用されますか？
  'faq-shift-4',  // Wワーク（副業）として働けますか？
  'faq-dorm-1',   // 寮（マンション寮）には応募後すぐに入居できますか？
  'faq-trouble-1',// 辞めたくなったときは、すぐに辞められますか？
  'faq-trouble-14'// まだ働くか決めておらず、質問や相談だけでもLINEしていいですか？
];

export const TOP_10_FAQ_LIST: FAQ100Item[] = TOP_10_FAQ_IDS
  .map(id => FAQ_100_LIST.find(item => item.id === id))
  .filter((item): item is FAQ100Item => item !== undefined);

/**
 * High-Intent Search FAQ Item Structure
 * Designed specifically for users searching natural questions:
 * 【初心者】【給料】【働き方】【不安】
 */
export type SearchIntentCategoryKey = 'beginner' | 'salary' | 'workstyle' | 'privacy';

export interface HighIntentFAQItem {
  id: string;
  searchIntentCategory: SearchIntentCategoryKey;
  searchIntentCategoryLabel: string;
  searchQuery: string;        // ユーザーが実際に検索する自然言語クエリ（例：「未経験でも大丈夫？」「初日は何をする？」）
  question: string;           // 網羅的な見出し
  answer: string;             // 具体的な事実に基づく信頼性の高い回答
  keyTakeaways: string[];     // ひと目でわかる要点
  highlightLabel?: string;    // ピルバッジ（例：「検索No.1」「即日手渡し」）
  relatedFaq100Id?: string;   // 119問FAQとの関連付け
}

export interface SearchIntentCategoryMeta {
  key: SearchIntentCategoryKey;
  label: string;
  subLabel: string;
  icon: string;
  colorClass: string;
  description: string;
  searchQueriesSample: string[];
}

export const SEARCH_INTENT_CATEGORIES: SearchIntentCategoryMeta[] = [
  {
    key: 'beginner',
    label: '初心者',
    subLabel: '未経験・初日・面接・体入',
    icon: 'Sparkles',
    colorClass: 'text-amber-600 bg-amber-50 border-amber-200',
    description: '夜職・接客未経験の不安を解消する基本Q&A',
    searchQueriesSample: ['未経験でも大丈夫？', '接客経験がなくても大丈夫？', '初日は何をする？', '面接で何を聞かれる？', '体験入店だけでもいい？']
  },
  {
    key: 'salary',
    label: '給料',
    subLabel: '日払い・天引き・稼げる額・計算方法',
    icon: 'Coins',
    colorClass: 'text-emerald-600 bg-emerald-50 border-emerald-200',
    description: '即日手渡し・バック率・控除ゼロの給与詳細',
    searchQueriesSample: ['給料はいつもらえる？', '日払い？', '天引きはある？', 'どのくらい稼げる？', '給料の計算方法は？']
  },
  {
    key: 'workstyle',
    label: '働き方',
    subLabel: '週1・短時間・Wワーク・出稼ぎ・寮',
    icon: 'Clock',
    colorClass: 'text-indigo-600 bg-indigo-50 border-indigo-200',
    description: '自由出勤・副業掛け持ち・個室寮の利用条件',
    searchQueriesSample: ['週1でもいい？', '短時間でもいい？', 'Wワークできる？', '遠方から働ける？', '寮はある？']
  },
  {
    key: 'privacy',
    label: '不安・身バレ',
    subLabel: '家族バレ・会社バレ・写真・SNS',
    icon: 'ShieldCheck',
    colorClass: 'text-rose-600 bg-rose-50 border-rose-200',
    description: 'ネット写真掲載ゼロ・撮影禁止規約・プライバシー保護',
    searchQueriesSample: ['身バレが心配', '家族に知られたくない', '会社に知られたくない', '写真掲載はある？', 'SNSに載る？']
  }
];

export const HIGH_INTENT_FAQS: HighIntentFAQItem[] = [
  // ==========================================
  // 1. 初心者 (Beginner)
  // ==========================================
  {
    id: 'hi-beg-1',
    searchIntentCategory: 'beginner',
    searchIntentCategoryLabel: '初心者',
    searchQuery: '未経験でも大丈夫？',
    question: '未経験でも大丈夫？夜職や風俗の経験が一切なくても働けますか？',
    answer: 'はい、全く問題ありません！現在在籍している女性の約9割が、夜職や水商売の経験が一切ない完全未経験からのスタートです。\n\n飛田新地は他エリアの風俗やキャバクラと違い、「お客様とのLINE交換や営業連絡」「指名争い」「同伴・アフター」「お酒の強要」が一切ありません。勤務前に女性スタッフがお茶出しや挨拶のマナー、接客の流れを丁寧にレクチャーします。店舗の玄関では常にベテラン仲居さん（おばちゃん）が隣に座ってお客様の呼び込みや時間管理を行ってくれるため、未経験から最も始めやすい環境です。',
    keyTakeaways: [
      '在籍キャストの約9割が完全未経験スタート',
      '営業連絡・指名取り・お酒の強制は完全ゼロ',
      'ベテラン仲居さんが隣で全てサポート'
    ],
    highlightLabel: '検索No.1',
    relatedFaq100Id: 'faq-rec-1'
  },
  {
    id: 'hi-beg-2',
    searchIntentCategory: 'beginner',
    searchIntentCategoryLabel: '初心者',
    searchQuery: '接客経験がなくても大丈夫？',
    question: '接客経験がなくても大丈夫？カフェや居酒屋などのバイト経験もありません。',
    answer: '接客業の経験がなくても全く大丈夫です！飛田新地のお客様が求めているのは、流暢なセールストークやプロフェッショナルな接客技術ではなく、「笑顔で挨拶ができること」「清潔感があること」「相手のお話を穏やかに聞けること」です。\n\n難しい接客トークは不要で、時間の管理やお茶の提供、お見送りの合図などはすべて仲居さんがサポートしてくれます。会話が苦手な人見知りの女性でも、ニコニコとお茶をお出しして話を聞いているだけで自然体で活躍できます。',
    keyTakeaways: [
      'セールストークや専門的な接客技術は不要',
      '「笑顔で挨拶」「清潔感」があれば十分',
      '時間管理やお茶出しは仲居さんが完全フォロー'
    ],
    highlightLabel: '初心者歓迎',
    relatedFaq100Id: 'faq-job-9'
  },
  {
    id: 'hi-beg-3',
    searchIntentCategory: 'beginner',
    searchIntentCategoryLabel: '初心者',
    searchQuery: '初日は何をする？',
    question: '初日は何をする？集合から挨拶・着替え・初接客・日払い退勤までの1日全スケジュール',
    answer: '初日出勤時の具体的なスケジュールは以下の通りです：\n\n①【私服で集合・本人確認】：お約束の時間に私服でお越しいただき、身分証原本を確認します。\n②【衣装選び＆ヘアメイク】：店舗のクローゼットから可愛いドレスやワンピースを選び、専属ヘアメイクがセット（全て無料）。\n③【事前レクチャー（約20分）】：お茶の出し方、時間の合図、防犯ベルの位置などを女性スタッフが優しく説明します。\n④【玄関でお出迎え】：仲居さんの隣に座ってお客さまをお出迎え。呼び込みは仲居さんが行います。\n⑤【おもてなし（1回15〜20分）】：個室へご案内し、お茶をお出ししてお話しします。\n⑥【日払い手渡し退勤】：お仕事終了後、その日に稼いだ全額を現金手渡しで受け取って帰宅！',
    keyTakeaways: [
      '私服・手ぶらで集合OK（衣装＆メイク無料）',
      '初日は2〜4時間のお試し短時間勤務も可能',
      '退勤時にその日の稼ぎ全額を現金手渡し'
    ],
    highlightLabel: '初日スケジュール',
    relatedFaq100Id: 'faq-rec-15'
  },
  {
    id: 'hi-beg-4',
    searchIntentCategory: 'beginner',
    searchIntentCategoryLabel: '初心者',
    searchQuery: '面接で何を聞かれる？',
    question: '面接で何を聞かれる？どんな質問をされますか？落ちることはある？',
    answer: '面接で聞かれる内容は、以下のような「希望の働き方」の確認が中心です：\n\n・「週に何日くらい出勤したいか（または月何回か）」\n・「希望の勤務時間帯（昼メインか、夜メインか、終電までか）」\n・「月にどれくらい稼ぎたい目標金額があるか」\n・「マンション個室寮の利用を希望するか」\n・「いつから勤務を開始できるか」\n\n堅苦しい試験のような面接ではなく、お茶を飲みながら女性スタッフと気軽にお話しする雑談・お茶会のような雰囲気です。履歴書は一切不要、私服でお越しいただけます。満20歳以上の公的確認ができ、一般的な挨拶ができる方であれば不採用になることは基本的にありません。',
    keyTakeaways: [
      '質問は「希望シフト」や「目標月収」の確認が中心',
      '履歴書不要・私服でお茶を飲みながら面談',
      '20歳以上の身分証確認があればほぼ採用'
    ],
    highlightLabel: '履歴書不要',
    relatedFaq100Id: 'faq-rec-9'
  },
  {
    id: 'hi-beg-5',
    searchIntentCategory: 'beginner',
    searchIntentCategoryLabel: '初心者',
    searchQuery: '体験入店だけでもいい？',
    question: '体験入店だけでもいい？1日だけ働いてみて、合わなければ即日で辞めても大丈夫？',
    answer: 'はい、体験入店（1日お試し勤務）だけでも大歓迎です！実際に数時間店舗に座ってみて、店内の雰囲気、仲居さんの優しさ、来店されるお客様の客層などを自分の肌で確かめていただけます。\n\nもし「想像と違った」「自分には合わないかもしれない」と感じた場合は、体験入店当日のみで気兼ねなく終了していただけます。無理な引き止めや、後日のしつこい電話・LINE連絡は一切ありません。もちろん、体験入店当日におもてなしした分のお給料も、退勤時に全額現金で日払い手渡しされます。',
    keyTakeaways: [
      '1日体験入店（数時間お試し）のみの参加大歓迎',
      '合わなければ当日で即終了可能・引き止めなし',
      '体入当日の給与も全額その場で即日手渡し'
    ],
    highlightLabel: '体入即日OK',
    relatedFaq100Id: 'faq-rec-13'
  },

  // ==========================================
  // 2. 給料 (Salary)
  // ==========================================
  {
    id: 'hi-sal-1',
    searchIntentCategory: 'salary',
    searchIntentCategoryLabel: '給料',
    searchQuery: '給料はいつもらえる？日払い？',
    question: '給料はいつもらえる？本当にその日のうちに日払いでもらえますか？',
    answer: '飛田新地では、毎日のお仕事が終わった瞬間に、その日の稼ぎ全額が【現金手渡し】で即日支給されます！\n\n「日払いは上限1万円までで残りは月末振込」「初回出勤分は保留」といった繰り越しルールや待ち時間は一切ありません。退勤時に控え室で1円単位まで計算され、その場で封筒に入った現金を全額受け取ってお帰りいただけます。急な出費や生活費、クレカの支払いがある場合でも、働いたその日の帰り道にまとまった現金が手に入ります。',
    keyTakeaways: [
      '退勤時にその日の稼ぎ全額を現金手渡し',
      '上限設定や翌月繰り越しなどの誤魔化しゼロ',
      '毎日が給料日（1円単位まで完全即日支給）'
    ],
    highlightLabel: '全額現金手渡し',
    relatedFaq100Id: 'faq-sal-3'
  },
  {
    id: 'hi-sal-2',
    searchIntentCategory: 'salary',
    searchIntentCategoryLabel: '給料',
    searchQuery: '天引きはある？',
    question: '天引きはある？更衣室代、宣伝広告費、厚生費などの名目で引かれませんか？',
    answer: '不当な天引きや名目不明な雑費控除は一切ありません！\n\n他業種や一般的なナイトワークでよく見られる「更衣室・ロッカー代（月数千円）」「厚生費（1日1,000円〜2,000円）」「ヘアメイク代の高額天引き」「宣伝広告費控除」などは完全0円です。また、当店は老舗料亭の直営窓口のため、外部スカウト会社のような仲介料のピンハネ（中抜き）も一切ありません。売上折半の金額が100%そのままあなたの手取りとなります。',
    keyTakeaways: [
      '更衣室代・厚生費・ロッカー代などの天引き0円',
      '直営店のためスカウト紹介料のピンハネなし',
      '稼いだバック額がそのまま手取り額に'
    ],
    highlightLabel: '天引き完全ゼロ',
    relatedFaq100Id: 'faq-sal-7'
  },
  {
    id: 'hi-sal-3',
    searchIntentCategory: 'salary',
    searchIntentCategoryLabel: '給料',
    searchQuery: 'どのくらい稼げる？',
    question: 'どのくらい稼げる？1日の日給や月収のリアルな相場を教えてください。',
    answer: '飛田新地でのリアルな稼ぎ目安は以下の通りです：\n\n・【1日の平均日給】：5万〜8万円（平日昼〜夜の通常稼働）\n・【週末・連休の日給】：10万〜15万円超（金土日や祝前日）\n\n■ 月収のリアルな実績目安：\n・週1〜2日（学業・OLのスキマ副業）：月収25万〜45万円\n・週3〜4日（レギュラー副業・フリーター）：月収60万〜90万円\n・週5日（本業出勤・短期集中出稼ぎ）：月収110万〜160万円以上\n\n指名料や営業成績に左右されず、接客した本数に応じて確実に積み上がるため、未経験からでも初月からまとまった大金を手にすることができます。',
    keyTakeaways: [
      '日給平均5万〜8万円、週末は10万円超え多数',
      '週2日の副業でも月収40万円以上が狙える',
      '週4〜5日勤務で月収100万円超え実績多数'
    ],
    highlightLabel: '平均日給5〜8万',
    relatedFaq100Id: 'faq-sal-1'
  },
  {
    id: 'hi-sal-4',
    searchIntentCategory: 'salary',
    searchIntentCategoryLabel: '給料',
    searchQuery: '給料の計算方法は？',
    question: '給料の計算方法は？（公式計算式とコース別の正確な手取り額）',
    answer: '飛田新地（料理組合加盟店）の給料計算は、全国で最も明朗で透明な【完全50%折半ルール】です。\n\n【公式計算式】：\n（お客様お支払い料金 − 仲居さん手当1,000円）÷ 2 ＝ キャスト取り分（手取り）\n\n■ コース別の手取り額一覧：\n・15分コース（11,000円）：（11,000−1,000）÷ 2 ＝ 【5,000円】\n・20分コース（16,000円）：（16,000−1,000）÷ 2 ＝ 【7,500円】\n・30分コース（21,000円）：（21,000−1,000）÷ 2 ＝ 【10,000円】\n・40分コース（31,000円）：（31,000−1,000）÷ 2 ＝ 【15,000円】\n\n例えば、1日に20分コース（7,500円）を8本接客した場合、7,500円×8本＝【60,000円】がその日の手取り日給となり、退勤時に全額現金で手渡されます。',
    keyTakeaways: [
      '公式計算式：（料金 − 仲居手当1,000円）÷ 2',
      '15分で5,000円、20分で7,500円、30分で10,000円',
      '接客本数×手取り額がその日の日給'
    ],
    highlightLabel: '公式計算式公開',
    relatedFaq100Id: 'faq-sal-6'
  },
  {
    id: 'hi-sal-5',
    searchIntentCategory: 'salary',
    searchIntentCategoryLabel: '給料',
    searchQuery: 'ノルマや罰金はある？',
    question: 'ノルマや罰金はある？待機カットやお客さんがつかなかった時の減給は？',
    answer: 'ノルマや罰金・ペナルティは一切ありません！\n\n「月に○本入らなければ減給」「遅刻したら罰金1万円」「当欠ペナルティ」といった悪質なルールは一切存在しません。また、万が一来店が落ち着いてお客様がつかない時間帯があったとしても、「待機カット（待機中に時給を引かれること）」も一切ありません。プレッシャーなく、自分のペースで安心して働けます。',
    keyTakeaways: [
      '接客本数のノルマ・遅刻欠勤の罰金ペナルティなし',
      '待機時間中の時給カット（待機カット）なし',
      'ストレスやプレッシャーなくマイペースに勤務'
    ],
    highlightLabel: 'ノルマ罰金0',
    relatedFaq100Id: 'faq-sal-8'
  },

  // ==========================================
  // 3. 働き方 (Workstyle)
  // ==========================================
  {
    id: 'hi-wrk-1',
    searchIntentCategory: 'workstyle',
    searchIntentCategoryLabel: '働き方',
    searchQuery: '週1でもいい？',
    question: '週1でもいい？月1日やスキマ時間だけでも採用されますか？',
    answer: 'はい、週1日のみの出勤でも全く問題ありません！\n\n「毎週土曜日だけ」「日曜日の昼間だけ」「月に2〜3回、お金が必要な時だけ」といった超マイペースなシフトでも大歓迎です。完全自由シフト制のため、テスト期間や本業の繁忙期、旅行などで1ヶ月丸々お休みすることも自由にできます。出勤日数の強制や催促の連絡は一切ありません。',
    keyTakeaways: [
      '週1日・月数回・土日のみの出勤大歓迎',
      '完全自由シフト（シフト強制や催促なし）',
      'テスト期間や旅行での長期休みも自由'
    ],
    highlightLabel: '週1日・月数回OK',
    relatedFaq100Id: 'faq-shift-1'
  },
  {
    id: 'hi-wrk-2',
    searchIntentCategory: 'workstyle',
    searchIntentCategoryLabel: '働き方',
    searchQuery: '短時間でもいい？',
    question: '短時間でもいい？1日3〜4時間だけの短時間勤務は可能ですか？',
    answer: 'はい、1日3〜4時間からの短時間勤務が可能です！\n\n飛田新地は昼（12:00〜）から営業しているため、例えば以下のような短時間シフトが自由に選べます：\n・昼短時間：12:00〜16:00（夕方には帰宅）\n・夕方短時間：15:00〜19:00（買い物帰りにサクッと）\n・夜短時間：18:30〜22:30（仕事帰りに終電前上がり）\n\n長時間拘束されることなく、空いたスキマ時間だけを有効活用して効率よく高収入を得られます。',
    keyTakeaways: [
      '1日3〜4時間の短時間シフトOK',
      '昼の部（12:00〜）で夕方に帰宅する働き方も可能',
      '終電上がり・深夜送り完備で夜も安心'
    ],
    highlightLabel: '1日3時間〜OK',
    relatedFaq100Id: 'faq-shift-10'
  },
  {
    id: 'hi-wrk-3',
    searchIntentCategory: 'workstyle',
    searchIntentCategoryLabel: '働き方',
    searchQuery: 'Wワークできる？',
    question: 'Wワークできる？昼の会社員（OL）や現役女子大生の掛け持ちは可能？',
    answer: '大歓迎です！実際に当店で働く女性の約半数が、昼職の会社員（OL・一般事務・医療従事者・アパレルなど）や現役大学生・専門学生のWワークです。\n\n本業や大学のスケジュールを最優先に調整でき、終電上がりも厳守。さらに、会社に副業が発覚しないための「住民税の普通徴収手続き」や確定申告のアドバイスも提携税理士を通じて無料サポートしています。',
    keyTakeaways: [
      '在籍キャストの約半数がOL・女子大生のWワーク',
      '本業最優先の自由シフト＆終電上がり厳守',
      '会社に副業がバレない確定申告の無料相談あり'
    ],
    highlightLabel: '副業Wワーク歓迎',
    relatedFaq100Id: 'faq-shift-4'
  },
  {
    id: 'hi-wrk-4',
    searchIntentCategory: 'workstyle',
    searchIntentCategoryLabel: '働き方',
    searchQuery: '遠方から働ける？',
    question: '遠方から働ける？地方からの出稼ぎや交通費支給・短期集中勤務は可能？',
    answer: 'はい、北海道から沖縄まで全国各地からのご応募を大歓迎しています！\n\n遠方からお越しの方には、新幹線代や飛行機代などの【往復交通費を全額または一部支給】するサポート制度をご用意しています。また、大阪到着時には新大阪駅や主要ターミナル駅まで女性スタッフが個別でお迎えに上がります。1週間〜1ヶ月の短期集中出稼ぎで目標金額を一気に稼いで帰る女性も多数活躍しています。',
    keyTakeaways: [
      '全国からの応募歓迎（往復交通費の支給補助あり）',
      '新大阪駅・主要駅への個別お迎えサポート完備',
      '1週間〜1ヶ月の短期集中出稼ぎ大歓迎'
    ],
    highlightLabel: '交通費支給・出稼ぎ',
    relatedFaq100Id: 'faq-dorm-5'
  },
  {
    id: 'hi-wrk-5',
    searchIntentCategory: 'workstyle',
    searchIntentCategoryLabel: '働き方',
    searchQuery: '寮はある？',
    question: '寮はある？即日入居できる個室マンション寮の設備や費用はどうなっていますか？',
    answer: 'はい、敷金・礼金0円で即日入居できる【家具家電付き・完全個室マンション寮】を多数完備しています！\n\n■ 寮の設備と環境：\n・生活家電完備：テレビ、エアコン、冷蔵庫、全自動洗濯機、電子レンジ、ベッド、高速Wi-Fi\n・完全個室：相部屋ではなく1人1部屋のプライベート空間\n・防犯設備：オートロック、防犯カメラ完備で女性の一人暮らしも安全\n\nカバン1つでお越しいただいてもその日の夜からすぐに快適な新生活をスタートできます。',
    keyTakeaways: [
      '敷金・礼金0円で即日入居可能な完全個室寮',
      '家具家電・ベッド・エアコン・Wi-Fi完備（手ぶら入寮OK）',
      'オートロック付きの安心セキュリティ'
    ],
    highlightLabel: '即日個室寮完備',
    relatedFaq100Id: 'faq-dorm-1'
  },

  // ==========================================
  // 4. 不安・身バレ (Privacy)
  // ==========================================
  {
    id: 'hi-prv-1',
    searchIntentCategory: 'privacy',
    searchIntentCategoryLabel: '不安・身バレ',
    searchQuery: '身バレが心配',
    question: '身バレが心配…知り合いや友達にバレる可能性はありますか？どんな対策がある？',
    answer: '徹底した身バレ防止体制を敷いているため、知り合いにバレる心配は極めて低いです。\n\n飛田新地は料理組合の厳格な自主規制規約により、エリア内での通行人・観光客・客による【写真撮影・動画撮影が完全禁止】されています。不審な撮影者がいれば街の見回り隊や仲居さんが即座に排除します。\n\nまた、店舗では「源氏名（偽名）での勤務」「普段と印象をガラリと変えるプロヘアメイク＆ウィッグ無料貸与」「知人が多い地元エリアを避けた配慮」など、幾重もの対策であなたのプライバシーを完全保護します。',
    keyTakeaways: [
      '街全体で写真・動画撮影が完全禁止（撮影者即排除）',
      '本名不要（源氏名勤務）＆ウィッグ・プロメイク無料',
      'ネットや広告への顔写真露出リスク完全ゼロ'
    ],
    highlightLabel: '身バレ徹底防止',
    relatedFaq100Id: 'faq-priv-1'
  },
  {
    id: 'hi-prv-2',
    searchIntentCategory: 'privacy',
    searchIntentCategoryLabel: '不安・身バレ',
    searchQuery: '家族に知られたくない',
    question: '家族に知られたくない…親や家族と同居していてもバレずに働けますか？',
    answer: 'はい、ご実家で親御さんやご家族と同居されている女性も、多数安全に勤務されています！\n\n当店からご自宅へ契約書や明細書、DMなどの郵便物が届くことは一切ありません。連絡は全てご自身の個人スマホLINEのみで行います。また、お仕事で着用するドレスやワンピースは店舗の大型クローゼットで無料保管・洗濯しますので、衣装を自宅に持ち帰って家族に見られる心配も一切ありません。',
    keyTakeaways: [
      '自宅への郵便物・契約書・電話連絡は完全ゼロ',
      '連絡は全て個人スマホのLINEのみで完結',
      '衣装は店舗で無料保管＆洗濯（持ち帰り不要）'
    ],
    highlightLabel: '郵便物・連絡なし',
    relatedFaq100Id: 'faq-priv-2'
  },
  {
    id: 'hi-prv-3',
    searchIntentCategory: 'privacy',
    searchIntentCategoryLabel: '不安・身バレ',
    searchQuery: '会社に知られたくない',
    question: '会社に知られたくない…昼職の本業に副業が発覚しない対策はありますか？',
    answer: '昼間の会社に副業が発覚する最大の原因は「住民税の特別徴収通知」です。しかし、確定申告を行う際に住民税の納付方法を『普通徴収（自分で納付）』にチェックするだけで、副業分の税金通知が昼間の会社に届くのを完全に遮断できます。\n\n当店では、提携税理士による「会社に絶対にバレない確定申告のやり方」の個別無料相談を行っており、OLキャストの皆様が何年間も会社に知られずに安全に副業を継続されています。',
    keyTakeaways: [
      '住民税の「普通徴収（自分納付）」で会社への通知を完全遮断',
      '提携税理士による副業バレ防止の無料アドバイスあり',
      'マイナンバー提示で会社に通知がいくことも一切なし'
    ],
    highlightLabel: '住民税対策完備',
    relatedFaq100Id: 'faq-priv-3'
  },
  {
    id: 'hi-prv-4',
    searchIntentCategory: 'privacy',
    searchIntentCategoryLabel: '不安・身バレ',
    searchQuery: '写真掲載はある？',
    question: '写真掲載はある？求人サイトやネット案内所・看板に顔写真が載ることは絶対にない？',
    answer: '一切ありません！当店および飛田新地の正規料亭では、女性キャストの顔写真や全身写真を求人サイト・ネット案内所・カタログ・店頭看板等に掲載することは厳重に禁止・排除しています。\n\n一般的なデリヘルやソープのように、ネット上にモザイク付きであっても自分の写真が掲載されたり、デジタルタトゥーとして写真が残り続けるリスクは完全ゼロです。ネット上の露出が一切ないため、安心して勤務していただけます。',
    keyTakeaways: [
      '求人サイトやネット案内所への顔写真掲載は完全ゼロ',
      'カタログや看板への写真露出も一切なし',
      'デジタルタトゥーが残るリスクなし'
    ],
    highlightLabel: 'ネット写真掲載ゼロ',
    relatedFaq100Id: 'faq-priv-4'
  },
  {
    id: 'hi-prv-5',
    searchIntentCategory: 'privacy',
    searchIntentCategoryLabel: '不安・身バレ',
    searchQuery: 'SNSに載る？',
    question: 'SNSに載る？TikTok、Instagram、X（Twitter）にお店の写真や動画が使われない？',
    answer: '絶対に載りません！飛田新地料理組合の自主規制規約により、街並み・店舗外観・店内の様子をSNS（TikTok、Instagram、X、YouTubeなど）に投稿・公開することは厳格に禁止されています。\n\nお店側がプロモーションのために女の子の写真をSNSにアップするような行為も100%ありません。インターネット上にあなたの痕跡が残ることは一切ありませんので、将来への影響を心配することなく安心してお仕事に集中していただけます。',
    keyTakeaways: [
      '料理組合規約によりSNS（TikTok/Insta/X等）露出厳禁',
      'お店が宣伝目的でキャストの動画や写真を載せる行為もゼロ',
      '将来の就活や結婚への影響も心配無用'
    ],
    highlightLabel: 'SNS露出一切禁止',
    relatedFaq100Id: 'faq-priv-5'
  }
];

export const SEARCH_INTENT_FAQ_LIST = HIGH_INTENT_FAQS;

/**
 * Filter questions by 8 categories and optional search query
 */
export function filterFAQ100(
  categoryId: string,
  searchQuery: string
): FAQ100Item[] {
  let list = FAQ_100_LIST;

  if (categoryId === 'popular') {
    list = list.filter(item => item.isPopular);
  } else if (categoryId !== 'all' && categoryId) {
    list = list.filter(item => item.eightCategory === categoryId || item.category === categoryId);
  }

  const query = searchQuery.trim().toLowerCase();
  if (!query) return list;

  return list.filter(item => {
    const inQuestion = item.question.toLowerCase().includes(query);
    const inAnswer = item.answer.toLowerCase().includes(query);
    const inCategory = item.eightCategoryLabel.toLowerCase().includes(query) || item.categoryLabel.toLowerCase().includes(query);
    const inKeywords = item.keywords.some(k => k.toLowerCase().includes(query));
    return inQuestion || inAnswer || inCategory || inKeywords;
  });
}

