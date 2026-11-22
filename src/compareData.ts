/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export const SITE_COMPARE_SEO = {
  title: '飛田新地と他業種の違いを比較｜他業種・応募方法比較｜飛田ガールズ',
  description:
    '飛田新地で働くことを考えている女性へ。飛田新地とメンズエステ、ソープランド、デリヘル、キャバクラ・ラウンジの仕事内容や報酬体系、働き方の違いを比較します。公式求人サイト・SNS・スカウトなど応募方法の違いや、応募前に確認したいポイントも解説します。',
  h1: '飛田新地と他業種の違いを比較',
  eyebrow: '2026年最新版｜業種・求人応募方法の比較ガイド',
  canonicalUrl: 'https://tobitashinchi-recruit.com/site-compare',
  heroLead: [
    '飛田新地で働くことを考えている女性へ。',
    'メンズエステやソープランド、デリヘル、キャバクラ・ラウンジなど、他業種との仕事内容や報酬体系、働き方の違いを分かりやすく比較します。',
    'また、公式求人サイトやSNS、スカウトなど、応募方法による違いも解説します。',
  ],
  heroPoints: [
    '仕事内容・接客方法',
    '報酬体系・支払い条件',
    '勤務時間・働き方',
    '応募方法・個人情報の取り扱い',
  ],
};

export interface IndustryColumnMeta {
  key: 'tobita' | 'mensEsthe' | 'soap' | 'delihel' | 'cabaret';
  label: string;
  subLabel?: string;
  isOurShop?: boolean;
}

export interface IndustryComparisonMatrixRow {
  criteria: string;
  tobita: string;
  mensEsthe: string;
  soap: string;
  delihel: string;
  cabaret: string;
}

export const INDUSTRY_COMPARE_COLUMNS: IndustryColumnMeta[] = [
  { key: 'tobita', label: '飛田新地（当店）', subLabel: '料亭直営公式窓口', isOurShop: true },
  { key: 'mensEsthe', label: 'メンズエステ', subLabel: 'リラクゼーション等' },
  { key: 'soap', label: 'ソープランド', subLabel: '店舗型' },
  { key: 'delihel', label: 'デリヘル', subLabel: '無店舗・派遣型' },
  { key: 'cabaret', label: 'キャバクラ・ラウンジ', subLabel: '飲食・会話中心' },
];

export const INDUSTRY_COMPARE_ROWS: IndustryComparisonMatrixRow[] = [
  {
    criteria: '主な仕事内容',
    tobita:
      '玄関（上がり框）での笑顔のお迎えと2階個室でのおもてなし接客。接客前のアルコールによる拭き上げ等の衛生準備を実施（キス・粘膜接触・飲酒・連絡先交換なし／呼び込みや清掃は仲居さんが担当）。',
    mensEsthe:
      'オイルトリートメントやリラクゼーション施術など（具体的な施術内容や接客範囲は店舗ごとに異なります）。',
    soap: '店舗ごとのサービス内容による接客（客室内の浴槽を使用した入浴対応を含む場合があります）。',
    delihel: '派遣型の接客・サービス（提供するサービス内容は店舗の規定によって異なります）。',
    cabaret: '座席での会話、お酒作り・提供など、飲食を伴う接客が中心です。',
  },
  {
    criteria: '接客場所',
    tobita: '当店の料亭建物内の玄関および2階個室（※店外への派遣や客室内の浴槽・シャワー設備はありません）。',
    mensEsthe: '店舗内の施術ルーム（完全個室・マンション型ルームなど店舗形態により異なります）。',
    soap: '店舗内の専用個室・設備（浴槽等を含む店舗内施設）。',
    delihel: 'ビジネスホテルや利用客の自宅など、指定された利用場所による。',
    cabaret: '店舗内のフロア席・ボックス席・VIP席など。',
  },
  {
    criteria: '接客時間',
    tobita: '1回15分〜20分の短時間中心（15分・20分・30分・45分・60分コース）。',
    mensEsthe: '60分〜120分前後など、施術コース・店舗規定によります。',
    soap: '60分〜120分前後など、コース・店舗規定によります。',
    delihel: '60分〜90分前後など、コース・店舗規定によります。',
    cabaret: '40分〜60分前後（セット制）など、店舗・勤務条件によります。',
  },
  {
    criteria: '報酬体系',
    tobita:
      '完全歩合制（売上50%バック・15分5,000円〜）／雑費・待機料天引きなし・退勤時全額現金日払い（※収入は勤務時間帯や来店状況により変動）。',
    mensEsthe: '歩合制・時給制・指名バック・オプションバックなど、店舗の報酬規定によります。',
    soap: '歩合制・コースバック・日払い対応の有無など、店舗の報酬制度によります。',
    delihel: '歩合制・コースバック・交通費や雑費の扱いなど、店舗の規定によります。',
    cabaret: '時給制＋各種バック（指名・ドリンク・同伴等）や控除など、店舗規定によります。',
  },
  {
    criteria: '勤務形態',
    tobita: '10:00〜24:00の選べる時間帯シフト制（週1日〜・短時間勤務も相談可／満20歳以上の女性限定）。',
    mensEsthe: 'シフト制・自由出勤・待機方法など、店舗の規定によります。',
    soap: 'シフト制・出勤回数条件など、店舗の規定によります。',
    delihel: '店舗待機・自宅待機・移動を含むスケジュールなど、店舗によって異なります。',
    cabaret: '夜間営業中心・出勤日数や同伴規定などは、店舗によって異なります。',
  },
  {
    criteria: '応募前の確認事項',
    tobita: '実際の接客ルール、売上50%の計算基準、シフト時間帯、20歳以上等の応募条件、身バレへの配慮方法。',
    mensEsthe: '施術内容・接客範囲、報酬と雑費控除、勤務時間、待機場所、店舗の営業形態。',
    soap: '具体的なサービス内容、報酬体系と控除の有無、待機環境や出勤ルール。',
    delihel: '派遣エリアと移動手段、待機方法、キャンセル時・待機時の扱い、報酬条件。',
    cabaret: '営業時間、お酒や連絡先交換・同伴の有無、ノルマやペナルティ、時給と控除内訳。',
  },
];

export interface IndustryDetailCard {
  key: IndustryColumnMeta['key'];
  heading: string;
  summary: string;
  ctaLabel?: string;
  ctaPath?: string;
}

export const INDUSTRY_DETAIL_CARDS: IndustryDetailCard[] = [
  {
    key: 'tobita',
    heading: '飛田新地の仕事内容・働き方',
    summary:
      '当店では、玄関（上がり框）で笑顔のお迎えをし、2階個室で15分〜20分を中心とした短時間接客を行います。接客前にはアルコールによる拭き上げ等の衛生準備を徹底し、キス・粘膜接触・お酒の飲酒・連絡先交換は行いません。呼び込みやお部屋の清掃は仲居さんが担当し、報酬は完全歩合制（売上50%バック・雑費天引きなし・退勤時現金日払い）です。',
    ctaLabel: '当店の仕事内容・求人情報を見る',
    ctaPath: '/job',
  },
  {
    key: 'mensEsthe',
    heading: 'メンズエステの仕事内容・働き方',
    summary:
      'メンズエステは店舗によって施術内容や接客範囲、報酬体系が大きく異なります。健全なリラクゼーション施術を中心とした店舗もあれば、オプション内容やルーム形態（店舗型・マンション型）によって働き方が変わるため、応募前には施術内容・接客範囲・報酬条件・勤務時間・待機場所などを確認することが大切です。',
  },
  {
    key: 'soap',
    heading: 'ソープランドの仕事内容・働き方',
    summary:
      '客室内の設備を用いた接客を行う店舗型業態ですが、店舗によってサービス内容や報酬制度、勤務条件、控除の有無が異なります。体力面の負担や拘束時間、待機環境なども含めて具体的な仕事内容と応募条件を確認することが大切です。',
  },
  {
    key: 'delihel',
    heading: 'デリヘルの仕事内容・働き方',
    summary:
      'ビジネスホテルや利用客の自宅等へ伺う派遣型の業態であり、接客場所や移動方法（送迎の有無・交通費）、待機方法（店舗待機・自宅待機など）を事前に確認する必要があります。待機時やキャンセル時の扱い、報酬条件も店舗ごとに異なります。',
  },
  {
    key: 'cabaret',
    heading: 'キャバクラ・ラウンジの仕事内容・働き方',
    summary:
      '座席での接客・会話・飲食を伴う仕事が中心ですが、営業時間や指名・同伴などのノルマ、時給やバック率、ヘアメイク代・厚生費といった控除の有無などは店舗によって異なります。お酒の飲酒や店外連絡の負担も含めて条件を確認することが大切です。',
  },
];

export type ApplicationMethodBadge =
  | '公式情報を確認できる'
  | '募集元の確認が必要'
  | '条件の照合が必要'
  | '個人情報の取り扱いを確認'
  | '仲介手数料の有無を確認';

export interface ApplicationCell {
  badge: ApplicationMethodBadge;
  text: string;
}

export interface ApplicationMethodColumn {
  key: 'official' | 'snsScout' | 'portal' | 'network';
  label: string;
  isOurShop?: boolean;
}

export interface ApplicationMethodRow {
  criteria: string;
  official: ApplicationCell;
  snsScout: ApplicationCell;
  portal: ApplicationCell;
  network: ApplicationCell;
}

export const APPLICATION_METHOD_COLUMNS: ApplicationMethodColumn[] = [
  { key: 'official', label: '当店公式求人サイト（飛田ガールズ）', isOurShop: true },
  { key: 'snsScout', label: 'SNS・個人スカウト' },
  { key: 'portal', label: '他社の求人ポータル・求人サイト' },
  { key: 'network', label: '紹介・仲介型の求人ネットワーク' },
];

export const APPLICATION_METHOD_ROWS: ApplicationMethodRow[] = [
  {
    criteria: '募集元の確認',
    official: {
      badge: '公式情報を確認できる',
      text: '料理組合加盟の料亭が直接募集している公式窓口であることをサイト上で確認できます。',
    },
    snsScout: {
      badge: '募集元の確認が必要',
      text: '個人のSNSアカウントを介すため、担当者の身元や所属先・紹介予定店舗の確認が必要です。',
    },
    portal: {
      badge: '募集元の確認が必要',
      text: 'ポータルサイトの運営会社と実際の募集店舗が異なるため、掲載元と応募先店舗を確認します。',
    },
    network: {
      badge: '募集元の確認が必要',
      text: '紹介者と実際の募集店舗がどのような関係にあるか、事前に確認することが大切です。',
    },
  },
  {
    criteria: '応募先',
    official: {
      badge: '公式情報を確認できる',
      text: '当店の公式LINE窓口へ直接お問い合わせ・ご応募いただけます。',
    },
    snsScout: {
      badge: '募集元の確認が必要',
      text: 'SNSのDMや個人のLINEアカウントなど、個人宛てに連絡する形式が一般的です。',
    },
    portal: {
      badge: '条件の照合が必要',
      text: 'サイト内の応募フォームまたはサイトに掲載されている店舗窓口へ連絡します。',
    },
    network: {
      badge: '募集元の確認が必要',
      text: '紹介者または仲介窓口の担当者を通じて応募手続きを進めます。',
    },
  },
  {
    criteria: '報酬条件',
    official: {
      badge: '公式情報を確認できる',
      text: '当店の正式な条件（完全歩合制・売上50%バック・15分5,000円〜・即日現金日払い）を事前に確認できます。',
    },
    snsScout: {
      badge: '条件の照合が必要',
      text: '口頭やDMの説明だけで判断せず、面接時に店舗側の書面・正式条件と照合することが大切です。',
    },
    portal: {
      badge: '条件の照合が必要',
      text: 'サイト掲載の条件と実際の面接時・店舗側の説明に相違がないか照合が必要です。',
    },
    network: {
      badge: '条件の照合が必要',
      text: '紹介時に受けた説明と、実際の店舗側が提示する報酬規定を照合して確認します。',
    },
  },
  {
    criteria: '仲介手数料',
    official: {
      badge: '仲介手数料の有無を確認',
      text: '当店への直接応募のため、応募者負担の仲介手数料・紹介料は0円です（待機料等の雑費天引きもなし）。',
    },
    snsScout: {
      badge: '仲介手数料の有無を確認',
      text: '紹介手数料やマージンの有無、負担する主体（報酬からの差し引きがないか）の確認が必要です。',
    },
    portal: {
      badge: '仲介手数料の有無を確認',
      text: '応募者の利用料有無や、掲載経由によってバック率等の条件に違いが出ないか仕組みを確認します。',
    },
    network: {
      badge: '仲介手数料の有無を確認',
      text: '紹介手数料・仲介料の有無や、給与計算・控除への影響がないか仕組みを確認します。',
    },
  },
  {
    criteria: '個人情報',
    official: {
      badge: '公式情報を確認できる',
      text: '当店のプライバシー保護方針（運営者情報・安全体制ページ）を明記し、問い合わせ・面接連絡のみに使用します。',
    },
    snsScout: {
      badge: '個人情報の取り扱いを確認',
      text: '送信する連絡先・写真・身分情報などが誰に共有され、どの目的で利用されるか確認が必要です。',
    },
    portal: {
      badge: '個人情報の取り扱いを確認',
      text: 'サイト運営会社のプライバシーポリシーや、応募情報がどの店舗へ共有されるか方針を確認します。',
    },
    network: {
      badge: '個人情報の取り扱いを確認',
      text: '紹介者と募集店舗のどちらが個人情報を保有・管理するのかを確認することが重要です。',
    },
  },
  {
    criteria: '応募後の連絡',
    official: {
      badge: '公式情報を確認できる',
      text: '当店の公式窓口（女性サポートスタッフ）から直接ご連絡・ご案内します。',
    },
    snsScout: {
      badge: '募集元の確認が必要',
      text: '主に個人のアカウントから連絡が来るため、店舗担当者への引き継ぎ方法も確認しておくと安心です。',
    },
    portal: {
      badge: '条件の照合が必要',
      text: 'ポータル窓口から連絡が来る場合と、応募先店舗から直接連絡が来る場合があります。',
    },
    network: {
      badge: '募集元の確認が必要',
      text: '紹介者または仲介窓口を経由して店舗と日程調整を行うケースがあります。',
    },
  },
  {
    criteria: '応募前の相談',
    official: {
      badge: '公式情報を確認できる',
      text: '当店の公式LINE窓口にて、応募前のご質問・シフトや待遇の相談を無料で受け付けています。',
    },
    snsScout: {
      badge: '条件の照合が必要',
      text: '説明の正確さやサポート姿勢は相手個人の対応に左右されるため、丁寧な回答かを見極めましょう。',
    },
    portal: {
      badge: '条件の照合が必要',
      text: 'サイト内のサポート窓口対応か、各掲載店舗の対応かによって確認できる範囲が異なります。',
    },
    network: {
      badge: '条件の照合が必要',
      text: '紹介者によって把握している店舗情報に差があるため、店舗側の一次情報とあわせて確認すると安心です。',
    },
  },
];

export interface PreApplyCheckPoint {
  number: string;
  iconName:
    | 'Building2'
    | 'ClipboardList'
    | 'Coins'
    | 'Clock'
    | 'ShieldCheck'
    | 'GitMerge'
    | 'MessageCircle';
  title: string;
  description: string;
}

export const PRE_APPLY_CHECK_POINTS: PreApplyCheckPoint[] = [
  {
    number: '01',
    iconName: 'Building2',
    title: '募集元・運営者',
    description: '誰が求人を募集しているのか、店舗との関係が明確か。',
  },
  {
    number: '02',
    iconName: 'ClipboardList',
    title: '仕事内容',
    description: '実際にどのような接客を行うのか、事前に説明されているか。',
  },
  {
    number: '03',
    iconName: 'Coins',
    title: '報酬・支払い条件',
    description: '報酬の計算方法、控除、支払い時期が明確か。',
  },
  {
    number: '04',
    iconName: 'Clock',
    title: '勤務条件',
    description: '勤務時間、勤務日数、出勤方法などを確認できるか。',
  },
  {
    number: '05',
    iconName: 'ShieldCheck',
    title: '個人情報の取り扱い',
    description: '身分証や連絡先、写真などの情報がどのように管理されるか。',
  },
  {
    number: '06',
    iconName: 'GitMerge',
    title: '応募後の流れ',
    description: '問い合わせ後に何をするのか、面接・説明・手続きの流れが分かるか。',
  },
  {
    number: '07',
    iconName: 'MessageCircle',
    title: '相談・問い合わせ先',
    description: '不明点を応募前に質問できる窓口があるか。',
  },
];

export interface SiteCompareFaq {
  q: string;
  a: string;
}

export const SITE_COMPARE_FAQS: SiteCompareFaq[] = [
  {
    q: '飛田新地とメンズエステは何が違いますか？',
    a: '仕事内容や接客方法、報酬体系などが異なります。飛田新地（当店）では玄関でのお迎えと2階個室での15〜20分を中心とした接客を行い、完全歩合制（売上50%バック・退勤時現金日払い）をご案内しています。一方、メンズエステも店舗によってオイル施術やリラクゼーションなどの施術内容、接客範囲、報酬規定が異なるため、応募前に求人情報で具体的な条件を確認することが大切です。',
  },
  {
    q: '飛田新地で働く場合、仕事内容は応募前に確認できますか？',
    a: 'はい。当店では、応募前に仕事内容（玄関での待機や仲居さんとの役割分担、個室での短時間接客・接客前のアルコールによる拭き上げ等の衛生ルール、キス・粘膜接触・飲酒・連絡先交換なしなど）や勤務条件について確認できるようご案内しています。分からないことはお気軽にお問い合わせください。',
  },
  {
    q: '求人サイトと個人スカウトは何が違いますか？',
    a: '求人サイトは掲載された求人情報を確認して応募する方法で、個人スカウトはSNSや街頭などで個人を通じて募集情報を受け取る方法です。どちらの場合も、実際の募集店舗・報酬条件・仲介手数料の有無・個人情報の取り扱いを事前に確認しましょう。',
  },
  {
    q: 'LINEで相談してから応募できますか？',
    a: 'はい。当店の公式LINE窓口にて、応募を決める前の段階から仕事内容や報酬・勤務条件などについて女性スタッフへお問い合わせいただけます。相談料は不要で、質問のみの相談でも無理に応募や面接を勧めることはありません。',
  },
  {
    q: '未経験でも応募できますか？',
    a: 'はい、未経験の方もご応募いただけます。応募条件は満20歳以上の女性（料理組合規約により20歳未満・高校生は不可）で、体験入店・勤務開始時には本籍地記載の住民票原本（マイナンバー記載なし）または有効期限内の日本国パスポート（＋顔写真付き公的身分証明書）による年齢確認が必要です。履歴書不要・私服で面接や事前の見学相談もでき、不安な点は応募前に確認していただけます。',
  },
];

export interface VerifiedInternalLink {
  path: string;
  label: string;
  desc: string;
}

export const SITE_COMPARE_INTERNAL_LINKS: VerifiedInternalLink[] = [
  { path: '/', label: 'トップページ', desc: '当店の公式求人案内・基本条件の全体概要' },
  { path: '/job', label: '仕事内容・求人案内', desc: '玄関待機・衛生準備・15〜20分接客と1日の流れ' },
  { path: '/compare', label: '働き方・求人比較', desc: '未経験・年齢・勤務日数など27条件別ガイド' },
  { path: '/beginner', label: '未経験者向けページ', desc: '未経験スタートの手順と事前サポート体制' },
  { path: '/experienced', label: '経験者向けページ', desc: '他業種・他店からの移籍で比較したい方へ' },
  { path: '/safety', label: '身バレ対策ページ', desc: '写真非掲載・源氏名・個人情報の保護方針' },
  { path: '/flow', label: '応募の流れ', desc: 'LINE相談から見学・面接・体験入店までの手順' },
  { path: '/faq', label: 'よくある質問', desc: '仕事内容・給与・条件に関するQ&A一覧' },
  { path: '/about', label: '運営者情報・安全方針', desc: '当店の運営窓口・プライバシー保護の取り組み' },
];

// Backward-compatible summary exports used by feeds/sitemap scripts
export const INDUSTRY_COMPARISONS = INDUSTRY_COMPARE_COLUMNS.map((col) => {
  const getCell = (criteria: string) => {
    const row = INDUSTRY_COMPARE_ROWS.find((r) => r.criteria === criteria);
    return row ? row[col.key] : '';
  };
  return {
    industry: col.label,
    workStyle: getCell('主な仕事内容'),
    location: getCell('接客場所'),
    timePerCustomer: getCell('接客時間'),
    compensation: getCell('報酬体系'),
    schedule: getCell('勤務形態'),
    preCheck: getCell('応募前の確認事項'),
  };
});

export const SITE_COMPARISON_ROWS = APPLICATION_METHOD_ROWS;
