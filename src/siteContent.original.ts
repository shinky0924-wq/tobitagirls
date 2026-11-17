/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface SiteContent {
  hero: {
    tagline: string;
    titleLine1: string;
    titleLine2: string;
    descriptionLine1: string;
    descriptionLine2: string;
    descriptionLine3: string;
    fullDescription?: string;
    ctaButtonText: string;
    badgeText: string;
  };
  concerns: {
    title: string;
    subtitle: string;
    items: {
      id: string;
      iconName: string;
      title: string;
      question: string;
      answer: string;
    }[];
  };
  reasons: {
    title: string;
    subtitle: string;
    items: {
      number: string;
      iconName: string;
      title: string;
      description: string;
    }[];
  };
  jobs: {
    title: string;
    subtitle: string;
    infoSubtitle: string;
    simulatorTitle: string;
    simulatorDesc: string;
  };
  flow: {
    title: string;
    subtitle: string;
    items: {
      number: string;
      title: string;
    }[];
  };
  faq: {
    title: string;
    sidebarTitle: string;
    sidebarRole: string;
    sidebarMessage: string;
    items: {
      id: string;
      question: string;
      answer: string;
    }[];
  };
  consultation: {
    title: string;
    description: string;
    badgeText: string;
    copySubtitle: string;
    templateText: string;
    copyButtonText: string;
    lineBadgeText: string;
    lineButtonText: string;
    lineSubtitle: string;
    privacyNote: string;
  };
}

export const DEFAULT_SITE_CONTENT: SiteContent = {
  hero: {
    tagline: "飛田新地の求人案内｜当店の公式採用情報",
    titleLine1: "飛田新地で働くことを",
    titleLine2: "考えている女性へ。",
    descriptionLine1: "当店では、仕事内容や給料の仕組み、未経験から働くまでの流れ、お店選びのポイントなど、求人を探すうえで知っておきたい情報をわかりやすくまとめています。",
    descriptionLine2: "「未経験でも大丈夫？」「実際どんな仕事をするの？」「身バレや人間関係が心配……」そんな疑問や不安にも、丁寧にお答えします。",
    descriptionLine3: "まずは相談だけでもお気軽にご相談ください。",
    fullDescription: "当店では、仕事内容や給料の仕組み、未経験から働くまでの流れ、お店選びのポイントなど、求人を探すうえで知っておきたい情報をわかりやすくまとめています。\n\n「未経験でも大丈夫？」\n「実際どんな仕事をするの？」\n「身バレや人間関係が心配……」\n\nそんな疑問や不安にも、丁寧にお答えします。\n\nまずは相談だけでもお気軽にご相談ください。",
    ctaButtonText: "LINEで今すぐ相談する",
    badgeText: "未経験の方も安心のサポート体制"
  },
  concerns: {
    title: "お悩みありませんか？",
    subtitle: "その不安、相談前はみんな同じです。気になるところをタップしてみましょう。",
    items: [
      {
        id: "concern-1",
        iconName: "Baby",
        title: "未経験でも",
        question: "働ける？",
        answer: "現在働いている女性の約9割が完全未経験からのスタートです。業界独自のルールや接客のコツも、当店スタッフの事前説明と仲居さんの丁寧なサポートで一から身に付けられますのでご安心ください。"
      },
      {
        id: "concern-2",
        iconName: "ShieldAlert",
        title: "危険なお店",
        question: "じゃない？",
        answer: "飛田ガールズは外部の紹介業者ではなく、料理組合に加盟する料亭が直接運営する公式求人窓口です。仲介手数料や危険な取引・不当な天引きは一切なく、法令遵守と安全管理を徹底しています。"
      },
      {
        id: "concern-3",
        iconName: "EyeOff",
        title: "身バレ",
        question: "したくない",
        answer: "「源氏名（お仕事用のお名前）の使用」「完全非公開での募集」「ネットやSNSへの写真掲載ゼロ」など、徹底的にプライバシーを守ります。誰かに知られることなく安心して働けます。"
      },
      {
        id: "concern-4",
        iconName: "Store",
        title: "お店選びで",
        question: "失敗したくない",
        answer: "「お店の本当の雰囲気」「在籍キャストのリアルな声」「稼げる時間帯」など、料亭直営の現場スタッフだからこそ正確にお伝えできます。外部の紹介や提携ではなく、当店の直営採用窓口としてご希望に合う働き方やシフトを直接ご案内いたします。"
      },
      {
        id: "concern-5",
        iconName: "Coins",
        title: "ちゃんと",
        question: "稼げる？",
        answer: "完全歩合制・売上50%バックの即日全額日払い制を導入しており、時間帯や来店状況に応じて働いた分をその日にお受け取りいただけます。ノルマや罰金もなく、自分のペースで働けます。"
      }
    ]
  },
  reasons: {
    title: "飛田ガールズが選ばれる理由 ✨",
    subtitle: "REASONS",
    items: [
      {
        number: "01",
        iconName: "MapPin",
        title: "飛田新地 料亭直営",
        description: "料亭の直接採用窓口だからこそ提供できる詳しい情報と透明性があります。"
      },
      {
        number: "02",
        iconName: "Award",
        title: "未経験者も手厚くサポート",
        description: "初めての方でも安心して始められるよう、当店の女性スタッフが一から丁寧にお教えいたします。"
      },
      {
        number: "03",
        iconName: "Headphones",
        title: "働き方の相談をサポート",
        description: "あなたの希望や生活スタイルに合うシフト・働き方を一緒に丁寧にお探しします。"
      },
      {
        number: "04",
        iconName: "MessageSquare",
        title: "LINE相談OK",
        description: "24時間いつでもLINEでお気軽に、非対面で相談が可能です。"
      },
      {
        number: "05",
        iconName: "Users",
        title: "面接同行可能",
        description: "初めての方でも安心できるよう、スタッフが面接に同行します。"
      },
      {
        number: "06",
        iconName: "HandHeart",
        title: "入店後フォロー",
        description: "働き始めてからも、困ったことがあればしっかりサポート継続。"
      }
    ]
  },
  jobs: {
    title: "募集要項",
    subtitle: "RECRUIT REQUIREMENTS",
    infoSubtitle: "※完全歩合制（売上50%バック・即日日払い）のため収入は時間帯・来店状況により変動します",
    simulatorTitle: "1分でわかる！給与シミュレーター",
    simulatorDesc: "あなたの希望するシフト形態から、およその見込み収入を計算します。"
  },
  flow: {
    title: "応募からお仕事開始までの流れ 🛤️",
    subtitle: "WORKFLOW",
    items: [
      { number: "01", title: "LINE相談" },
      { number: "02", title: "ご希望の相談・確認" },
      { number: "03", title: "条件確認・店内見学" },
      { number: "04", title: "面接" },
      { number: "05", title: "体験入店" },
      { number: "06", title: "お仕事スタート" }
    ]
  },
  faq: {
    title: "よくある不安 Q&A",
    sidebarTitle: "よくある不安 Q&A",
    sidebarRole: "専任アドバイザーより",
    sidebarMessage: "「どんな小さな悩みでも解決します。プライバシーを守り、優しく丁寧にお答えします」",
    items: [
      {
        id: "faq-1",
        question: "Q. 未経験でも大丈夫ですか？",
        answer: "A. はい、もちろんです！当店（飛田ガールズ）では未経験者向けの丁寧な研修制度を設けています。最初は誰でも不安ですが、女性スタッフが一から丁寧にお教えします。"
      },
      {
        id: "faq-2",
        question: "Q. 年齢制限はありますか？何歳から応募できますか？",
        answer: "A. 20歳以上の日本国籍を有する女性であればご応募可能です。飛田新地料理組合加盟店および当グループでは、普通料理店（料亭）としての未成年トラブル防止、法令順守および女性キャストの安全保護の観点から【20歳以上限定（20歳未満・高校生不可）】に完全統一しております。20代前半〜後半を中心に、30代・40代以上の方も各通りの特色に合わせて幅広く活躍しています。"
      },
      {
        id: "faq-age-reason",
        question: "Q. 18歳が成人ですが、なぜ飛田新地は「20歳以上」なのですか？",
        answer: "A. 2022年4月の民法改正により成年年齢は18歳に引き下げられましたが、飛田新地は料亭営業として法令を厳格に遵守し、未成年者のトラブルを未然に防ぐため、①普通料理店（料亭）としての未成年トラブル防止、②料理組合独自の自主規制規約、③女性キャストの安全保護を徹底するため、例外なく「20歳以上」に年齢条件を統一しています。そのため面接時には本籍地記載の住民票またはパスポートによる厳正な生年月日確認を行っています。"
      },
      {
        id: "faq-3",
        question: "Q. 顔出しは必要ですか？",
        answer: "A. 飛田新地のスタイルとして、玄関先に座る形になりますが、ネット広告やSNSなどへの写真掲載は一切行われないため、想像以上に身内に知られるリスクは極めて低いです。特定されない工夫もいつでも可能です。"
      },
      {
        id: "faq-4",
        question: "Q. 身バレ対策はありますか？",
        answer: "A. 源氏名の使用はもちろん、WEBやSNSへの写真掲載を全面禁止とし、当店にてプライバシー保護と徹底した安全管理を行っていますのでご安心ください。"
      },
      {
        id: "faq-5",
        question: "Q. 確実に稼げますか？お給料は全額日払いですか？",
        answer: "A. はい、当店は完全日払い制（その日の分をその日に全額支給）を導入しています。完全歩合制のため収入は出勤時間帯や来店状況により変動しますが、働いた分はその日にお受け取りいただけます。"
      },
      {
        id: "faq-6",
        question: "Q. ノルマや罰金などはありますか？",
        answer: "A. いいえ、ノルマや罰金・ペナルティなどは一切ありません！自分のペースでストレスなくのびのびと働いていただけるのが飛田新地最大の魅力の一つです。"
      },
      {
        id: "faq-7",
        question: "Q. お酒が飲めなくても働けますか？",
        answer: "A. はい、お酒が全く飲めなくても問題ありません！業務上のお酒の提供や飲酒は一切ありませんので、お酒が不得意な方も多数活躍されています。"
      },
      {
        id: "faq-8",
        question: "Q. 週1日からや短時間でもシフトに入れますか？",
        answer: "A. はい、大歓迎です。週1日・週末だけ・1日4〜5時間の短時間勤務など、昼職・学生・主婦の方のライフスタイルに合わせて、柔軟にシフトを調整していただけます。"
      },
      {
        id: "faq-9",
        question: "Q. 働くときの服や衣装はどうなりますか？",
        answer: "A. 当店では、着物やドレス、可愛い和服などの衣装を無料で用意しています。ご自身で準備する手間や余計な出費はありません。"
      },
      {
        id: "faq-10",
        question: "Q. 相談だけで実際に働かなくても大丈夫ですか？",
        answer: "A. はい、もちろん大歓迎です！ご相談・お問い合わせ段階で無理にお仕事を勧めることは絶対にありません。話を聞いてみて「やっぱりやめておきます」でも全く問題ありませんので、まずはお気軽にご活用ください。"
      }
    ]
  },
  consultation: {
    title: "一人で悩まず、まずは気軽に相談してください。",
    description: "当店の女性サポートスタッフが、あなたに合う働き方探しを全力でお手伝いします。\n秘密厳守・相談費用は無料。あなたの新しい一歩をそっと応援します。",
    badgeText: "＼ワンタップで簡単♪／",
    copySubtitle: "SNS・メールで質問・応募する方はコピーして使ってね♪",
    templateText: "飛田ガールズを見ました。\nお名前／\n年齢／\n質問／",
    copyButtonText: "テンプレートをコピーする",
    lineBadgeText: "👇 簡単1タップで相談開始！",
    lineButtonText: "LINEで無料相談する",
    lineSubtitle: "※公式LINEへジャンプします。いつでもブロック・削除可能です。",
    privacyNote: "※個人情報や秘密は厳守いたします。どうぞ安心してお問い合わせください。"
  }
};

export function getStoredSiteContent(): SiteContent {
  if (typeof window === 'undefined') return DEFAULT_SITE_CONTENT;
  const stored = localStorage.getItem('custom_site_content');
  if (!stored) {
    return DEFAULT_SITE_CONTENT;
  }
  try {
    const customContent = JSON.parse(stored);
    const merged = { ...DEFAULT_SITE_CONTENT };
    
    if (customContent.hero) merged.hero = { ...merged.hero, ...customContent.hero };
    if (customContent.concerns) merged.concerns = { ...merged.concerns, ...customContent.concerns };
    if (customContent.reasons) merged.reasons = { ...merged.reasons, ...customContent.reasons };
    if (customContent.jobs) merged.jobs = { ...merged.jobs, ...customContent.jobs };
    if (customContent.flow) merged.flow = { ...merged.flow, ...customContent.flow };
    if (customContent.faq) merged.faq = { ...merged.faq, ...customContent.faq };
    if (customContent.consultation) merged.consultation = { ...merged.consultation, ...customContent.consultation };
    
    return merged as SiteContent;
  } catch (e) {
    console.error('Error parsing custom site content:', e);
    return DEFAULT_SITE_CONTENT;
  }
}

export function saveSiteContent(content: SiteContent) {
  if (typeof window === 'undefined') return;
  localStorage.setItem('custom_site_content', JSON.stringify(content));
}
