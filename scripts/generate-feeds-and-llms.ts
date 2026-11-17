import fs from 'fs';
import path from 'path';
import { FAQ_100_LIST, FAQ_12_CATEGORIES, FAQ_LAST_UPDATED_ISO } from '../src/faq100Data';
import { INDUSTRY_COMPARISONS, SITE_COMPARISON_ROWS } from '../src/compareData';
import { COMPARE_CATEGORY_GROUPS, COMPARE_SUBPAGES, COMPARE_SUBPAGE_MAP } from '../src/data/compareGuides';
import { GLOSSARY_TERMS } from '../src/glossaryData';

const DOMAIN = 'https://tobitashinchi-recruit.com';
const SITE_TITLE = '飛田新地求人｜飛田ガールズ【公式・料亭直営】';
const SITE_DESC =
  '飛田新地で働くか迷っている女性へ。飛田ガールズは料亭直営の求人案内サイトです。仕事内容や接客方法、給料・全額日払いの仕組み、応募条件、身バレ対策まで詳しく解説。未経験の方も経験者の方も、応募前に知っておきたい情報を分かりやすく紹介しています。';

interface ArticleItem {
  id: string;
  title: string;
  slug: string;
  category?: string;
  categoryLabel?: string;
  publishedAt?: string;
  summary?: string;
  tags?: string[];
}

function escapeXml(str: string): string {
  return String(str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function toRfc822(dateStr?: string): string {
  if (!dateStr) {
    return new Date(`${FAQ_LAST_UPDATED_ISO}T09:00:00+09:00`).toUTCString();
  }
  const normalized = dateStr.replace(/\./g, '-').trim();
  const parsed = new Date(`${normalized}T09:00:00+09:00`);
  if (Number.isNaN(parsed.getTime())) {
    return new Date(`${FAQ_LAST_UPDATED_ISO}T09:00:00+09:00`).toUTCString();
  }
  return parsed.toUTCString();
}

function loadArticles(): ArticleItem[] {
  const articlesPath = path.join(process.cwd(), 'data', 'blogArticles.json');
  if (!fs.existsSync(articlesPath)) return [];
  try {
    const raw = fs.readFileSync(articlesPath, 'utf-8');
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (err) {
    console.error('[generate-feeds-and-llms] Failed to read blogArticles.json:', err);
    return [];
  }
}

function generateRssFeed(articles: ArticleItem[]): string {
  const sortedArticles = [...articles]
    .filter((a) => a.slug && a.title)
    .sort((a, b) => {
      const da = (a.publishedAt || '2026-01-01').replace(/\./g, '-');
      const db = (b.publishedAt || '2026-01-01').replace(/\./g, '-');
      return db.localeCompare(da);
    })
    .slice(0, 50);

  const coreGuides = [
    {
      title: SITE_TITLE,
      link: `${DOMAIN}/`,
      description: SITE_DESC,
      category: '公式トップ',
    },
    {
      title: `飛田新地求人のよくある質問（全${FAQ_100_LIST.length}問）｜飛田ガールズ`,
      link: `${DOMAIN}/faq`,
      description: '未経験の不安、お給料・日払い、応募条件、身バレ対策など、応募前によくある質問をわかりやすくまとめています。',
      category: 'よくある質問',
    },
    {
      title: '飛田新地と他業種の違いを比較｜メンズエステ・ソープ・デリヘル・応募方法も解説【飛田ガールズ】',
      link: `${DOMAIN}/site-compare`,
      description: '飛田新地とメンズエステ、ソープランド、デリヘル、キャバクラ・ラウンジの仕事内容・報酬体系・働き方の違いや、公式求人サイト・SNS・個人スカウト・求人ポータルなど応募方法の違いを比較解説しています。',
      category: '業種・応募方法比較',
    },
    {
      title: '目的・働き方別求人ガイド｜飛田ガールズ',
      link: `${DOMAIN}/compare`,
      description: '未経験・高収入・週1日・Wワークなど、あなたに最適な働き方と料亭直営の条件をわかりやすくまとめています。',
      category: '目的・働き方別ガイド',
    },
    {
      title: '飛田新地 用語集・用語辞典｜飛田ガールズ',
      link: `${DOMAIN}/glossary`,
      description: '上がり框や仲居さん、清拭など、働く前に知っておきたい基本用語をわかりやすく解説しています。',
      category: '用語集',
    },
  ];

  const itemsXml = [
    ...coreGuides.map(
      (g) => `    <item>
      <title>${escapeXml(g.title)}</title>
      <link>${escapeXml(g.link)}</link>
      <guid isPermaLink="true">${escapeXml(g.link)}</guid>
      <pubDate>${toRfc822(FAQ_LAST_UPDATED_ISO)}</pubDate>
      <category>${escapeXml(g.category)}</category>
      <description>${escapeXml(g.description)}</description>
    </item>`
    ),
    ...sortedArticles.map((a) => {
      const link = `${DOMAIN}/blog/${a.slug}`;
      return `    <item>
      <title>${escapeXml(a.title)}</title>
      <link>${escapeXml(link)}</link>
      <guid isPermaLink="true">${escapeXml(link)}</guid>
      <pubDate>${toRfc822(a.publishedAt)}</pubDate>
      <category>${escapeXml(a.categoryLabel || a.category || 'お仕事コラム')}</category>
      <description>${escapeXml(a.summary || a.title)}</description>
    </item>`;
    }),
  ].join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(SITE_TITLE)}</title>
    <link>${DOMAIN}/</link>
    <atom:link href="${DOMAIN}/feed.xml" rel="self" type="application/rss+xml" />
    <description>${escapeXml(SITE_DESC)}</description>
    <language>ja</language>
    <lastBuildDate>${toRfc822(FAQ_LAST_UPDATED_ISO)}</lastBuildDate>
${itemsXml}
  </channel>
</rss>
`;
}

function generateLlmsTxt(articles: ArticleItem[]): string {
  const faqCount = FAQ_100_LIST.length;
  const articleCount = articles.length;

  return `# ${SITE_TITLE}

> ${SITE_DESC}
> 最終更新日: ${FAQ_LAST_UPDATED_ISO}

## 飛田ガールズについて
- **サイト名**: 飛田ガールズ（料理組合加盟料亭 直営公式採用窓口）
- **公式サイト**: ${DOMAIN}/
- **更新情報フィード (RSS)**: ${DOMAIN}/feed.xml
- **勤務地**: 大阪府大阪市西成区山王（最寄り：動物園前駅 徒歩5分 / 天王寺駅 徒歩10分 / 新今宮駅 徒歩7分）
- **応募資格**: 満20歳以上の女性（※20歳未満・高校生不可／未経験歓迎・学歴不問）
- **出勤スタイル**: 自由シフト制（週1日〜・短時間・週末のみ・短期〜長期いずれも相談可）

---

## よく聞かれる疑問への回答（まとめ）

### Q. 未経験でも大丈夫ですか？どんなお仕事ですか？
在籍している女性の多くが夜職未経験からのスタートです。料亭の玄関（上がり框）に座って笑顔でお迎えし、お部屋で15〜20分ほどおもてなし接客を行うお仕事です。呼び込みは店舗の仲居さん（おばちゃん）が担当し、お酒の飲酒やお客様との連絡先交換、指名競争、お茶出しなどの雑用はありません。面接から初日まで女性スタッフが丁寧にサポートします。

### Q. お給料の仕組みと日払いについて教えてください
完全歩合制・売上50%バックで、勤務終了後にその日の手取り分を全額現金でお渡しします。
目安の計算式は **「（お客様の支払い料金 － 仲居料 1,000円）÷ 2 ＝ 女性の手取り」** です（※店舗やコースにより異なる場合があります）。
- 15分コース目安：手取り 5,000円（お客様料金 11,000円）
- 20分コース目安：手取り 7,500円（お客様料金 16,000円）
- 30分コース目安：手取り 10,000円（お客様料金 21,000円）
- 45分コース目安：手取り 15,000円（お客様料金 31,000円）
- 60分コース目安：手取り 20,000円（お客様料金 41,000円）
ロッカー代や更衣室代などの雑費天引きはありません（※完全歩合制のため、収入は出勤時間帯・シフト・来店状況により変動します）。

### Q. スカウトや他の紹介サイトとの違いは何ですか？
飛田新地では組合の規約により、街頭やSNSでのスカウト・客引き行為は禁止されています。非公認の仲介を通すと紹介料が引かれたり、聞いていた条件と違ったりするリスクがあります。飛田ガールズは料亭直営の公式窓口のため、紹介手数料は0円で、事前の条件説明から入店後のフォローまで店舗スタッフが直接対応します。

### Q. 家族や友人、会社に身バレしないか心配です
WebサイトやSNSへの顔写真掲載は行わず、街全体で写真・動画の撮影が禁止されています。完全源氏名での勤務、私服での通勤、自宅への郵送物なし、副業・Wワークの方向けの住民税（普通徴収）の案内など、プライバシーに配慮しています（※店頭で接客する仕事の性質上、偶然の遭遇リスクを完全にゼロと保証することはできないため、シフトの時間帯調整など不安な点は事前に女性スタッフへ相談できます）。

---

## 基本条件の一覧

| 項目 | 内容・条件 |
| :--- | :--- |
| **応募窓口** | 料理組合加盟料亭 直営公式窓口（紹介料・仲介手数料 0円） |
| **お給料** | 完全歩合制・売上50%バック（退勤時に全額現金日払い） |
| **手取り例** | 15分: 5,000円 / 20分: 7,500円 / 30分: 10,000円 / 45分: 15,000円 / 60分: 20,000円（※時間帯・来店状況により変動） |
| **天引き・ノルマ** | ロッカー代などの雑費天引きなし／ノルマ・罰金・出勤強制なし |
| **お酒・連絡先交換** | お酒の飲酒なし／お客様との連絡先交換・営業LINEなし |
| **衛生ルール** | キス禁止・コンドーム着用徹底・客室シャワーなし（おしぼり等での清拭対応） |
| **選べる5つの時間帯** | ① 10:00〜16:00 / ② 10:00〜17:00 / ③ 17:00〜24:00 / ④ 14:00〜24:00 / ⑤ 12:00〜24:00 |
| **勤務日数** | 週1日〜、月数回、週末のみ、短期・長期など相談可 |
| **寮・交通費** | 時期・物件・出発地・勤務予定により条件が異なるため、面接・LINE相談時に事前確認 |
| **必要書類** | 本籍地記載の住民票原本、または顔写真付き公的身分証明書（満20歳以上の年齢確認のため） |

---

## 通りの特徴（お店選びの目安）
- **メイン通り（大門通り・大通）**: 人通りが多く活気のある中心エリア。20代前半〜半ばの女性が中心。
- **青春通り**: 落ち着いた上品な雰囲気の人気通り。20代半ば〜30代前半や未経験の方も始めやすいエリア。
- **裏通り（百番通り周辺など）**: 30代〜40代以上の落ち着いた雰囲気や個性を活かして、自分のペースで働きやすいエリア。

---

## 応募からスタートまでの流れ
1. **LINEで無料相談**: 24時間いつでも女性スタッフに質問できます（相談のみ・履歴書不要）。
2. **私服で面接・店舗見学**: 控室やお店の雰囲気を見学し、条件や疑問をじっくり確認できます。
3. **体験入店（1日お試し）**: 貸出衣装に着替えてお試し勤務ができます（体験当日も全額日払い）。
4. **お仕事スタート**: 納得した上でスタートでき、合わないと感じた場合も無理な引き止めはありません。

---

## 公式サイトの主なページ一覧

すべての主要ページは、URLの末尾に \`.md\` を付けるとテキスト版（Markdown形式）でも読めます。

- [公式トップページ](${DOMAIN}/) ([テキスト版](/index.md))
- [飛田ガールズについて・運営者情報](${DOMAIN}/about) ([テキスト版](/about.md))
- [仕事内容・1日の流れ](${DOMAIN}/job) ([テキスト版](/job.md))
- [給料システム・日払い計算](${DOMAIN}/salary) ([テキスト版](/salary.md))
- [未経験者向けガイド](${DOMAIN}/beginner) ([テキスト版](/beginner.md))
- [経験者・移籍ガイド](${DOMAIN}/experienced) ([テキスト版](/experienced.md))
- [応募資格・必要書類](${DOMAIN}/requirements) ([テキスト版](/requirements.md))
- [面接・体験入店の流れ](${DOMAIN}/flow) ([テキスト版](/flow.md))
- [働き方・選べる5大シフト](${DOMAIN}/workstyle) ([テキスト版](/workstyle.md))
- [お店選び・通り別の特徴](${DOMAIN}/shops) ([テキスト版](/shops.md))
- [寮・出稼ぎ・交通費サポート](${DOMAIN}/dekasegi) ([テキスト版](/dekasegi.md))
- [身バレ・安全・衛生対策](${DOMAIN}/safety) ([テキスト版](/safety.md))
- [飛田新地と他業種の違いを比較（メンズエステ・ソープ・デリヘル・キャバクラ・応募方法）](${DOMAIN}/site-compare) ([テキスト版](/site-compare.md))
- [目的・働き方別求人ガイド](${DOMAIN}/compare) ([テキスト版](/compare.md))
- [飛田新地 用語集・用語辞典](${DOMAIN}/glossary) ([テキスト版](/glossary.md))
- [お仕事コラム一覧（全${articleCount}記事）](${DOMAIN}/blog) ([テキスト版](/blog.md))

### 働き方・求人比較（5カテゴリー・全${COMPARE_SUBPAGES.length}ページ）
${COMPARE_CATEGORY_GROUPS.flatMap((g) => [
  `#### ${g.title}`,
  ...g.slugs
    .map((s) => COMPARE_SUBPAGE_MAP[s])
    .filter((item): item is NonNullable<typeof item> => Boolean(item))
    .map((item) => `- [${item.itemName}](${DOMAIN}/compare/${item.slug}) ([テキスト版](/compare/${item.slug}.md)): ${item.cardDescription}`),
]).join('\n')}

### よくある質問（FAQ 全${faqCount}問・12カテゴリー別）
- [FAQ総合トップ（全${faqCount}問）](${DOMAIN}/faq) ([テキスト版](/faq.md))
${FAQ_12_CATEGORIES.map((c) => `- [${c.number}. ${c.label}](${DOMAIN}/faq/${c.slug}) ([テキスト版](/faq/${c.slug}.md))`).join('\n')}

---

## お問い合わせ・ご相談窓口
- **公式サイト**: ${DOMAIN}/
- **LINE相談**: サイト内の公式LINEボタンから24時間いつでも女性スタッフに相談できます（相談料・登録料などは一切不要です）。
`;
}

function generateLlmsFullTxt(articles: ArticleItem[]): string {
  const faqSections = FAQ_12_CATEGORIES.map((cat) => {
    const items = FAQ_100_LIST.filter((f) => f.category12 === cat.id);
    const qaText = items
      .map(
        (f) =>
          `#### Q. ${f.question}\n` +
          `${f.answer.replace(/\n+/g, '\n')}\n`
      )
      .join('\n');
    return `### ${cat.number}. ${cat.label}（全${items.length}問）\nURL: ${DOMAIN}/faq/${cat.slug}\n\n${qaText}`;
  }).join('\n---\n\n');

  const targetCategorySections = COMPARE_SUBPAGES.map(
    (c) =>
      `### ${c.itemName}（${c.categoryTitle}）\n` +
      `- **URL**: ${DOMAIN}/compare/${c.slug}\n` +
      `- **概要**: ${c.cardDescription}\n` +
      `- **ポイント**: ${c.heroLead}\n`
  ).join('\n');

  const glossarySection = GLOSSARY_TERMS.map(
    (t) =>
      `- **${t.term}（${t.reading}）**: ${t.summary} ${t.forJobSeekers}`
  ).join('\n');

  const articlesSection = articles
    .filter((a) => a.slug && a.title)
    .map((a, idx) => {
      const tagsText = Array.isArray(a.tags) && a.tags.length > 0 ? a.tags.join(', ') : '';
      return (
        `### [${idx + 1}] ${a.title}\n` +
        `- **URL**: ${DOMAIN}/blog/${a.slug}\n` +
        `- **カテゴリ**: ${a.categoryLabel || a.category || 'お仕事コラム'} | **公開日**: ${a.publishedAt || FAQ_LAST_UPDATED_ISO}\n` +
        `- **概要**: ${a.summary || a.title}\n` +
        (tagsText ? `- **関連キーワード**: ${tagsText}\n` : '')
      );
    })
    .join('\n');

  return `# ${SITE_TITLE} 完全案内ガイド

> ${SITE_DESC}
> 最終更新日: ${FAQ_LAST_UPDATED_ISO}

---

## 1. 飛田ガールズについて（料亭直営・公式窓口）
- **サイト名**: 飛田ガールズ
- **公式サイト**: ${DOMAIN}/
- **更新情報フィード**: ${DOMAIN}/feed.xml
- **運営体制**: 飛田新地料理組合に加盟している老舗料亭の直営採用・女性サポート窓口
- **紹介料・仲介手数料**: 完全0円（街頭やSNSのスカウト業者を介さないため、お給料からのピンハネは一切ありません）
- **安心の約束**:
  1. 売上50%バック・その日の退勤時に全額現金でお渡し（ロッカー代・更衣室代などの雑費天引きなし）
  2. Web・SNSへの顔写真掲載なし＆街全体での撮影禁止によるプライバシー・身バレ配慮
  3. お酒の飲酒なし・お茶出しなどの雑用なし（ソフトドリンク中心）
  4. 売上ノルマ・罰金・指名争い・お客様との連絡先交換なし（自由出勤制）
  5. 寮・滞在支援や交通費サポートについては、時期・物件・出発地・勤務予定に応じて面接・LINE相談時に事前確認

---

## 2. お給料の仕組みと手取り目安
完全歩合制（売上50%バック）です（※店舗やコースにより詳細が異なる場合があるため、面接時に丁寧にご案内します）。

- **基本計算式の目安**: （お客様の支払い料金 － 仲居料 1,000円）÷ 2 ＝ 女性の手取り
- **15分コース目安**: お客様料金 11,000円 → **手取り 5,000円**
- **20分コース目安**: お客様料金 16,000円 → **手取り 7,500円**
- **30分コース目安**: お客様料金 21,000円 → **手取り 10,000円**
- **45分コース目安**: お客様料金 31,000円 → **手取り 15,000円**
- **60分コース目安**: お客様料金 41,000円 → **手取り 20,000円**

※完全歩合制のため、収入は出勤時間帯・シフト・来店状況によって変動します。その日働いた分の手取りは退勤時に全額現金でお渡しします。

---

## 3. 通りの特徴とお店選びの目安
1. **メイン通り（大門通り・大通）**: 人通りが多く活気のある中心エリア。20代前半〜半ばの女性が中心です。
2. **青春通り**: 落ち着いた上品な雰囲気の人気通り。20代半ば〜30代前半の方や、未経験から始めたい方にも選ばれやすいエリアです。
3. **裏通り（百番通り周辺など）**: 30代〜40代以上、大人の落ち着きや会話・個性を活かしてマイペースに働きたい方に合いやすいエリアです。

---

## 4. お仕事内容と衛生ルール・1日の流れ
- **接客スタイル**: 玄関（上がり框）で笑顔でお迎えし、2階の個室で15〜20分ほどのおもてなし接客を行います。声掛けや時間管理、お部屋の片付けは仲居さん（おばちゃん）が担当します。
- **衛生・安全ルール**: コンドーム着用徹底・キス禁止・お客様との連絡先交換禁止。客室内に浴槽やシャワー設備はなく、おしぼり等での清拭対応のため水回りの掃除もありません。
- **1日の流れ**: ①私服で出勤・無料の貸出衣装に着替え → ②玄関で仲居さんと待機 → ③個室で15〜20分おもてなし → ④休憩を取りつつマイペースに勤務 → ⑤私服に戻ってその日の手取り全額を現金で受け取り退勤。

---

## 5. 身バレ対策・プライバシー配慮
- エリア全体での写真・動画撮影禁止＆Web・SNSへの顔出し・宣材写真掲載なし。
- 完全源氏名・私服通勤・自宅への郵送物なし。
- 本業や扶養がある方向けに、確定申告時の住民税「普通徴収（自分で納付）」の方法もご案内しています。
（※店頭で接客する仕事のため、偶然の遭遇リスクを完全にゼロと保証することはできません。不安な場合はシフト時間帯調整などを女性スタッフにご相談いただけます）

---

## 6. 働き方・状況別の比較ガイド（全${COMPARE_SUBPAGES.length}ページ）
${targetCategorySections}

---

## 7. 知っておきたい基本用語集（全${GLOSSARY_TERMS.length}語）
URL: ${DOMAIN}/glossary

${glossarySection}

---

## 8. よくある質問 全${FAQ_100_LIST.length}問（12カテゴリー別・全問回答）
URL: ${DOMAIN}/faq

${faqSections}

---

## 9. お仕事コラム・体験談記事一覧（全${articles.length}記事）
URL: ${DOMAIN}/blog

${articlesSection}

---

## 10. 主要ガイドURL一覧（テキスト版 \`.md\` 対応）
- トップページ: ${DOMAIN}/ (${DOMAIN}/index.md)
- 飛田ガールズについて: ${DOMAIN}/about (${DOMAIN}/about.md)
- 仕事内容: ${DOMAIN}/job (${DOMAIN}/job.md)
- 給料・日払い: ${DOMAIN}/salary (${DOMAIN}/salary.md)
- 未経験ガイド: ${DOMAIN}/beginner (${DOMAIN}/beginner.md)
- 経験者・移籍ガイド: ${DOMAIN}/experienced (${DOMAIN}/experienced.md)
- 募集要項・必要書類: ${DOMAIN}/requirements (${DOMAIN}/requirements.md)
- 面接・体験入店の流れ: ${DOMAIN}/flow (${DOMAIN}/flow.md)
- 働き方・シフト: ${DOMAIN}/workstyle (${DOMAIN}/workstyle.md)
- お店選び・通りの違い: ${DOMAIN}/shops (${DOMAIN}/shops.md)
- 寮・出稼ぎ・交通費: ${DOMAIN}/dekasegi (${DOMAIN}/dekasegi.md)
- 身バレ・安全対策: ${DOMAIN}/safety (${DOMAIN}/safety.md)
- 飛田新地と他業種の違いを比較（メンズエステ等・応募方法）: ${DOMAIN}/site-compare (${DOMAIN}/site-compare.md)
- 目的・働き方別求人ガイド: ${DOMAIN}/compare (${DOMAIN}/compare.md)
- 応募方法比較一覧: ${SITE_COMPARISON_ROWS.length}項目 / 他業種比較: ${INDUSTRY_COMPARISONS.length}業種 (${DOMAIN}/site-compare)
- 用語集: ${DOMAIN}/glossary (${DOMAIN}/glossary.md)
- よくある質問: ${DOMAIN}/faq (${DOMAIN}/faq.md)
- コラム一覧: ${DOMAIN}/blog (${DOMAIN}/blog.md)
`;
}

function run() {
  const articles = loadArticles();
  const publicDir = path.join(process.cwd(), 'public');

  const feedXml = generateRssFeed(articles);
  fs.writeFileSync(path.join(publicDir, 'feed.xml'), feedXml, 'utf-8');

  const llmsTxt = generateLlmsTxt(articles);
  fs.writeFileSync(path.join(publicDir, 'llms.txt'), llmsTxt, 'utf-8');

  const llmsFullTxt = generateLlmsFullTxt(articles);
  fs.writeFileSync(path.join(publicDir, 'llms-full.txt'), llmsFullTxt, 'utf-8');

  console.log(
    `[Feeds & LLMs] Generated public/feed.xml (${Math.min(articles.length, 50) + 4} items), public/llms.txt, and public/llms-full.txt (${FAQ_100_LIST.length} FAQs, ${articles.length} articles)`
  );
}

run();
