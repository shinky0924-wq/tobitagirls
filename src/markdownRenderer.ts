/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import fs from 'fs';
import path from 'path';
import { TOPIC_CLUSTERS } from './topicClusterData';
import { TESTIMONIALS } from './data';
import { GLOSSARY_TERMS } from './glossaryData';
import { FAQ_12_CATEGORIES, FAQ_LAST_UPDATED_ISO } from './faq100Data';
import { TARGET_JOB_CATEGORIES, SITE_COMPARISON_ROWS } from './compareData';

interface BlogArticle {
  id: string;
  title: string;
  slug: string;
  category: string;
  categoryLabel?: string;
  publishedAt: string;
  readTime?: string;
  summary: string;
  eyeCatch?: string;
  author?: {
    name: string;
    role: string;
    avatar?: string;
  };
  tags?: string[];
  content?: Array<{
    type: string;
    text?: string;
    items?: string[];
    question?: string;
    answer?: string;
    headers?: string[];
    rows?: string[][];
  }>;
}

let cachedArticles: BlogArticle[] | null = null;
function getArticles(): BlogArticle[] {
  if (cachedArticles) return cachedArticles;
  try {
    const articlesPath = path.join(process.cwd(), 'data', 'blogArticles.json');
    if (fs.existsSync(articlesPath)) {
      const raw = fs.readFileSync(articlesPath, 'utf-8');
      cachedArticles = JSON.parse(raw);
      return cachedArticles || [];
    }
  } catch (e) {
    console.error('[markdownRenderer] Error reading blogArticles.json:', e);
  }
  return [];
}

const BASE_URL = 'https://tobitashinchi-recruit.com';

/**
 * Common header for all markdown responses to establish clear entity metadata
 */
function getMarkdownMetaHeader(title: string, pathUrl: string, description: string): string {
  const mdUrl = pathUrl === '/' ? '/index.md' : `${pathUrl.replace(/\/$/, '')}.md`;
  return [
    `# ${title}`,
    ``,
    `> **運営・案内窓口**: 飛田ガールズ（飛田新地 料理組合加盟料亭 直営公式窓口）`,
    `> **公式ページURL**: ${BASE_URL}${pathUrl}`,
    `> **テキスト版URL**: ${BASE_URL}${mdUrl}`,
    `> **最終更新日**: ${FAQ_LAST_UPDATED_ISO}`,
    `> **ページ概要**: ${description}`,
    ``,
    `---`,
    ``
  ].join('\n');
}

/**
 * Common footer with helpful summary and cross-links
 */
function getMarkdownMetaFooter(): string {
  return [
    ``,
    `---`,
    ``,
    `### 飛田ガールズからのご案内（基本条件・サポート体制）`,
    `- 料理組合に加盟している料亭が直接ご案内する公式採用窓口です。外部のスカウトや仲介業者を通さないため、紹介料や手数料はかかりません。`,
    `- お給料は完全歩合制・売上50%バックで、その日の勤務終了後に全額を現金でお渡しします（※収入は出勤時間帯や来店状況により変動します）。`,
    `- 勤務時間は選べる5つの時間帯（10:00〜17:00 / 10:00〜16:00 / 17:00〜24:00 / 14:00〜24:00 / 12:00〜24:00）から、週1日・短時間からご相談いただけます。`,
    `- 疑問や不安がある場合は、公式LINEから24時間いつでも女性スタッフに無料で相談できます（相談だけでも大丈夫です）。`,
    `- 関連ページ: [トップページ](${BASE_URL}/) | [よくある質問](${BASE_URL}/faq) | [お仕事コラム](${BASE_URL}/blog) | [サイト全体ガイド](/llms.txt)`,
    ``,
    `*© 2026 飛田ガールズ All Rights Reserved.*`
  ].join('\n');
}

/**
 * Render Markdown for Homepage / Root (/)
 */
function renderHomeMarkdown(): string {
  return [
    getMarkdownMetaHeader(
      '飛田ガールズ (Tobita Girls) - 飛田新地 料亭直営公式採用・お仕事情報',
      '/',
      '飛田新地（大阪市西成区山王）の料理組合加盟料亭が直接運営する公式採用・お仕事ポータル。完全歩合制（売上50%バック・即日全額現金日払い）、ロッカー代等の雑費天引きなし、WEB顔出しなし・街全体撮影禁止による身バレ配慮対策を掲載。'
    ),
    `## 【要点まとめ】飛田新地求人の特徴と安心ポイント`,
    `1. **料亭直営・直接雇用**: 街頭やSNSのスカウトを一切介さない直営採用窓口。紹介手数料・仲介マージンは0円です。`,
    `2. **売上50%バック・即日全額現金手渡し**: 退勤時にその日の手取り分を全額現金でお渡しします。ロッカー代・更衣室代などの雑費天引きやノルマ・罰金はありません（※完全歩合制のため収入は時間帯・来店状況により変動します）。`,
    `3. **選べる5大勤務時間**: 昼短時間（10:00〜16:00）、昼標準（10:00〜17:00）、夜標準（17:00〜24:00）、午後通し（14:00〜24:00）、フル稼働（12:00〜24:00）から自由に選択。週1日・短時間・週末のみも相談可。`,
    `4. **WEB顔出しなし・身バレへの配慮**: 料理組合規約によりエリア全体で撮影が禁止されており、WebやSNSへの顔写真掲載は行いません。完全源氏名・私服通勤・住民税普通徴収の案内などでプライバシーに配慮しています（※店頭で接客する仕事特性上、知人との遭遇リスクを完全にゼロと保証することはできないため対策を事前相談できます）。`,
    `5. **シンプルなおもてなし接客**: 玄関（上がり框）に座って笑顔でお迎えし、お部屋で15〜20分のおもてなし接客を行います。呼び込みや時間管理は仲居さん（おばちゃん）が担当。お酒の飲酒やお客様との連絡先交換、お茶出し・お菓子出しなどの雑用もありません。`,
    `6. **応募資格**: 満20歳以上の女性（料理組合規約遵守・20歳未満・高校生不可）。履歴書不要・私服面接・1日体験入店可能。`,
    ``,
    `## 公式募集要項・採用条件一覧`,
    `| 項目 | 公式条件・仕様 |`,
    `| :--- | :--- |`,
    `| **運営形態** | 飛田新地料理組合加盟料亭 直営公式採用窓口 |`,
    `| **給与システム** | 完全歩合制・売上50%バック（即日全額現金日払い手渡し・雑費天引きなし） |`,
    `| **コース別手取り例** | 15分: 5,000円 / 20分: 7,500円 / 30分: 10,000円 / 45分: 15,000円 / 60分: 20,000円（※時間帯・来店状況により変動） |`,
    `| **選べる5大勤務時間** | ① 10:00〜17:00 / ② 10:00〜16:00 / ③ 17:00〜24:00 / ④ 14:00〜24:00 / ⑤ 12:00〜24:00 |`,
    `| **出勤日数** | 週1日〜、月数回、週末のみ、短期〜長期、自由出勤制 |`,
    `| **住居・交通費条件** | 寮・滞在先の手配や交通費サポートは時期・物件・出発地・勤務予定により条件が異なるため面接・LINE時に事前確認 |`,
    `| **応募資格** | 満20歳以上の女性（※20歳未満・高校生不可 / 未経験歓迎・学歴経験不問） |`,
    `| **必要書類** | 本籍地記載の住民票原本または顔写真付き公的身分証明書（組合規約に基づく年齢確認） |`,
    ``,
    `## 現役キャストの対談記録（実在女性取材）`,
    ...TESTIMONIALS.map((t) => [
      `### 【キャスト ${t.name}さん】（${t.profile.ageGroup} / 前職: ${t.profile.previousJob}）`,
      `- **勤務スタイル**: ${t.profile.shiftStyle}`,
      `- **収入実績**: ${t.highlightEarnings}（${t.monthlyAverage}）`,
      `- **本人の証言**: 「${t.quote}」`,
      `- **公的確認ID**: ${t.verification.verificationId}（${t.verification.complianceCheck}）`,
      ``
    ].join('\n')),
    ``,
    `## 主要トピック別ガイド（詳細インデックス）`,
    `- [お仕事内容と1日の流れ](/job): 玄関でのお迎え・15〜20分接客・お酒や雑用なし`,
    `- [給料システムと日払い計算](/salary): 売上50%バック・即日全額現金手渡し・歩合の仕組み`,
    `- [未経験者向けガイド](/beginner): 初めての方向けサポート・仲居さんの役割`,
    `- [経験者・移籍向けガイド](/experienced): 他業種・他店からの移籍や復帰時の確認ポイント`,
    `- [公式募集要項・応募資格](/requirements): 20歳以上女性限定・必要書類・私服面接`,
    `- [応募・面接・体験入店の流れ](/flow): LINE相談から店舗見学・体験入店まで`,
    `- [自由な働き方・5大シフト](/workstyle): 10〜16時 / 10〜17時 / 17〜24時 / 14〜24時 / 12〜24時 の特徴`,
    `- [通り別の店舗選び](/shops): メイン通り・青春通り・大門通り・裏通りの比較`,
    `- [寮・出稼ぎガイド](/dekasegi): 滞在先手配や交通費条件の確認ポイント`,
    `- [安心・身バレ配慮対策](/safety): WEB顔写真非掲載・撮影禁止・完全源氏名・住民税普通徴収の案内`,
    `- [飛田新地 用語集](/glossary): 上がり框・仲居さん・清拭などの公式定義`,
    `- [よくある質問（FAQ全119問・12カテゴリー）](/faq): 応募前の疑問への回答`,
    getMarkdownMetaFooter()
  ].join('\n');
}

/**
 * Render Markdown for a specific Blog Article (/blog/:slug)
 */
function renderBlogArticleMarkdown(slug: string): { markdown: string; status: number } {
  const articles = getArticles();
  const article = articles.find((a) => a.slug === slug || a.id === slug);

  if (!article) {
    return {
      status: 404,
      markdown: [
        getMarkdownMetaHeader('記事が見つかりません (404 Not Found)', `/blog/${slug}`, '指定されたブログ記事は存在しないか、移動しました。'),
        `申し訳ございません。お探しの記事（スラッグ: \`${slug}\`）は見つかりませんでした。`,
        ``,
        `最新の記事一覧は [公式ブログ一覧](/blog) をご覧ください。`,
        getMarkdownMetaFooter()
      ].join('\n')
    };
  }

  const lines: string[] = [
    getMarkdownMetaHeader(article.title, `/blog/${article.slug}`, article.summary),
    `## 記事メタデータ (Article Metadata)`,
    `- **タイトル**: ${article.title}`,
    `- **カテゴリ**: ${article.categoryLabel || article.category}`,
    `- **公開日**: ${article.publishedAt}`,
    `- **想定読了時間**: ${article.readTime || '4分'}`,
    article.author ? `- **執筆・監修**: ${article.author.name}（${article.author.role}）` : '',
    article.tags && article.tags.length ? `- **関連タグ**: ${article.tags.join(', ')}` : '',
    ``,
    `### 記事要約 (Summary / TL;DR)`,
    `> ${article.summary}`,
    ``,
    `---`,
    ``,
    `## 本文 (Full Content)`,
    ``
  ].filter(Boolean);

  if (Array.isArray(article.content)) {
    for (const block of article.content) {
      if (block.type === 'h2' && block.text) {
        lines.push(`\n## ${block.text}\n`);
      } else if (block.type === 'h3' && block.text) {
        lines.push(`\n### ${block.text}\n`);
      } else if (block.type === 'p' && block.text) {
        lines.push(`\n${block.text}\n`);
      } else if (block.type === 'list' && Array.isArray(block.items)) {
        lines.push('');
        block.items.forEach((item) => lines.push(`- ${item}`));
        lines.push('');
      } else if (block.type === 'qna' && block.question && block.answer) {
        lines.push(`\n**${block.question}**\n\n${block.answer}\n`);
      } else if (block.type === 'table' && Array.isArray(block.headers) && Array.isArray(block.rows)) {
        lines.push('');
        lines.push(`| ${block.headers.join(' | ')} |`);
        lines.push(`| ${block.headers.map(() => ':---').join(' | ')} |`);
        for (const row of block.rows) {
          lines.push(`| ${row.join(' | ')} |`);
        }
        lines.push('');
      } else if (block.type === 'callout' && block.text) {
        lines.push(`\n> **ポイント**: ${block.text}\n`);
      }
    }
  }

  lines.push(getMarkdownMetaFooter());
  return { status: 200, markdown: lines.join('\n') };
}

/**
 * Render Markdown for Blog Index (/blog)
 */
function renderBlogIndexMarkdown(): string {
  const articles = getArticles();
  const lines: string[] = [
    getMarkdownMetaHeader(
      '飛田新地求人 コラム・お役立ちブログ記事一覧 (Knowledge Base)',
      '/blog',
      '飛田新地の料亭求人、給与システム、お仕事内容、身バレ防止、面接対策、副業事情について現役女性スタッフとキャストが執筆・監修した解説記事一覧。'
    ),
    `## 掲載記事一覧（全 ${articles.length} 件）`,
    `以下のリンクから各記事のMarkdown全文にアクセスできます。`,
    ``
  ];

  for (const a of articles) {
    lines.push(`### [${a.title}](/blog/${a.slug})`);
    lines.push(`- **カテゴリ**: ${a.categoryLabel || a.category} | **公開日**: ${a.publishedAt} | **読了時間**: ${a.readTime || '4分'}`);
    lines.push(`- **要約**: ${a.summary}`);
    lines.push(`- **URL**: ${BASE_URL}/blog/${a.slug}`);
    lines.push(``);
  }

  lines.push(getMarkdownMetaFooter());
  return lines.join('\n');
}

/**
 * Render Markdown for Topic Clusters (/salary, /job, /requirements, /workstyle, etc.)
 */
function renderTopicClusterMarkdown(clusterId: string): { markdown: string; status: number } {
  const cluster = TOPIC_CLUSTERS[clusterId];
  if (!cluster) {
    return {
      status: 404,
      markdown: [
        getMarkdownMetaHeader('ガイドが見つかりません (404 Not Found)', `/${clusterId}`, '指定されたトピックガイドは見つかりませんでした。'),
        `[公式トップページ](/) へお戻りください。`,
        getMarkdownMetaFooter()
      ].join('\n')
    };
  }

  const lines: string[] = [
    getMarkdownMetaHeader(cluster.seoTitle, cluster.path, cluster.metaDescription),
    `## 【要点まとめ】${cluster.title}のポイント`,
    `> **${cluster.tagline}**`,
    `> `,
    `> ${cluster.llmDirectAnswer}`,
    ``,
    `### 重要ポイント (Key Points)`,
    ...cluster.keyPoints.map((kp) => `- ${kp}`),
    ``,
    `### 重要統計・仕様データ (Key Metrics)`,
    `| 項目 | 値・ステータス | 説明 |`,
    `| :--- | :--- | :--- |`,
    ...cluster.stats.map((s) => `| **${s.label}** | ${s.value} | ${s.desc} |`),
    ``,
    `## 詳細解説 (Detailed Guide)`,
    cluster.overview,
    ``
  ];

  for (const sec of cluster.sections) {
    lines.push(`### ${sec.title}`);
    lines.push(sec.description);
    lines.push('');
    if (sec.points && sec.points.length) {
      sec.points.forEach((p) => lines.push(`- ${p}`));
      lines.push('');
    }
    if (sec.table) {
      lines.push(`| ${sec.table.headers.join(' | ')} |`);
      lines.push(`| ${sec.table.headers.map(() => ':---').join(' | ')} |`);
      for (const row of sec.table.rows) {
        lines.push(`| ${row.join(' | ')} |`);
      }
      lines.push('');
    }
  }

  if (cluster.faqs && cluster.faqs.length) {
    lines.push(`## よくある質問 (Frequently Asked Questions)`);
    for (const faq of cluster.faqs) {
      lines.push(`#### Q: ${faq.q}`);
      lines.push(`**A:** ${faq.a}`);
      lines.push('');
    }
  }

  lines.push(getMarkdownMetaFooter());
  return { status: 200, markdown: lines.join('\n') };
}

/**
 * Render Markdown for FAQ (/faq, /faq/:category)
 */
function renderFaqMarkdown(subpath?: string): string {
  let faqList: any[] = [];
  try {
    const faqPath = path.join(process.cwd(), 'data', 'faq100.json');
    if (fs.existsSync(faqPath)) {
      faqList = JSON.parse(fs.readFileSync(faqPath, 'utf-8'));
    }
  } catch (e) {
    console.error('[markdownRenderer] Error reading faq100.json:', e);
  }

  const legacyTo12: Record<string, string> = {
    recruit: 'interview',
    dorm: 'environment',
    wwork: 'sidejob',
    leaving: 'support'
  };

  if (subpath) {
    const normalizedSub = legacyTo12[subpath] || subpath;
    faqList = faqList.filter(
      (f) => f.category12 === normalizedSub || f.category === subpath || f.eightCategory === subpath
    );
  }

  const catSummaryLines = !subpath
    ? [
        `## 12カテゴリー別インデックス`,
        ...FAQ_12_CATEGORIES.map(c => `- [${c.number}. ${c.label}](/faq/${c.slug}): ${c.description}`),
        ``
      ]
    : [];

  const lines: string[] = [
    getMarkdownMetaHeader(
      `飛田新地求人のよくある質問｜仕事内容・給料・応募条件をQ&Aで解説${subpath ? ` (${subpath})` : ''}`,
      subpath ? `/faq/${subpath}` : '/faq',
      '飛田新地で働く前に知っておきたい仕事内容・給料・応募条件・身バレ対策などの疑問を12カテゴリー別にQ&A形式で分かりやすくまとめました。'
    ),
    ...catSummaryLines,
    `## Q&Aリスト（全 ${faqList.length} 件 / 最終更新: ${FAQ_LAST_UPDATED_ISO}）`,
    ``
  ];

  for (const item of faqList) {
    lines.push(`### Q: ${item.question}`);
    lines.push(`- **カテゴリー**: ${item.category12 || item.category}（${item.categoryLabel || ''}）`);
    if (item.audienceTag) {
      lines.push(`- **対象**: ${item.audienceTag}`);
    }
    if (item.relatedPage) {
      lines.push(`- **関連ガイド**: [${item.relatedLabel || item.relatedPage}](${item.relatedPage})`);
    }
    lines.push(`- **回答**:\n\n${item.answer.replace(/\n+/g, '\n\n')}`);
    lines.push('');
  }

  lines.push(getMarkdownMetaFooter());
  return lines.join('\n');
}

/**
 * Main Markdown Router function
 */
export function renderRouteMarkdown(urlPath: string): { markdown: string; status: number } {
  // Clean path
  const cleanPath = urlPath.split('?')[0].replace(/\/$/, '') || '/';

  // 1. Homepage
  if (cleanPath === '/') {
    return { status: 200, markdown: renderHomeMarkdown() };
  }

  // 2. Blog article: /blog/:slug
  if (cleanPath.startsWith('/blog/')) {
    const slug = cleanPath.replace('/blog/', '');
    return renderBlogArticleMarkdown(slug);
  }

  // 3. Blog index: /blog
  if (cleanPath === '/blog') {
    return { status: 200, markdown: renderBlogIndexMarkdown() };
  }

  // 4. Topic clusters
  const clusterMap: Record<string, string> = {
    '/salary': 'salary',
    '/job': 'job',
    '/requirements': 'requirements',
    '/workstyle': 'workstyle',
    '/benefits': 'benefits',
    '/shops': 'shops',
    '/dekasegi': 'dorm',
    '/dorm': 'dorm',
    '/safety': 'safety',
    '/beginner': 'beginner',
    '/experienced': 'experienced',
    '/flow': 'flow',
    '/interview': 'flow',
  };

  if (clusterMap[cleanPath]) {
    return renderTopicClusterMarkdown(clusterMap[cleanPath]);
  }

  // 5. FAQ
  if (cleanPath === '/faq') {
    return { status: 200, markdown: renderFaqMarkdown() };
  }
  if (cleanPath.startsWith('/faq/')) {
    const sub = cleanPath.replace('/faq/', '');
    return { status: 200, markdown: renderFaqMarkdown(sub) };
  }

  // 6. Compare & target routes
  if (cleanPath === '/compare') {
    return {
      status: 200,
      markdown: [
        getMarkdownMetaHeader(
          '飛田新地の求人比較＆働き方・目的別ガイド',
          '/compare',
          '飛田新地の料亭直営求人と、他の応募ルート・他の夜職（キャバクラ・一般風俗など）との違いをわかりやすく比較しています。'
        ),
        `## 飛田新地と他のお仕事・応募ルートの違い`,
        `| 比較項目 | 飛田ガールズ（料亭直営） | 街頭・SNSスカウト | 他求人サイト | 他業種（キャバクラ・一般風俗） |`,
        `| :--- | :--- | :--- | :--- | :--- |`,
        ...SITE_COMPARISON_ROWS.map((row) =>
          `| **${row.criteria}** | ${row.ourShop.text} | ${row.scoutAgency.text} | ${row.generalPortal.text} | ${row.otherNightwork.text} |`
        ),
        ``,
        `## 目的・状況別の求人ガイド`,
        ...TARGET_JOB_CATEGORIES.map((cat) =>
          `- [${cat.title}](/compare/${cat.slug}): ${cat.summary}`
        ),
        getMarkdownMetaFooter()
      ].join('\n')
    };
  }

  if (cleanPath.startsWith('/compare/')) {
    const slug = cleanPath.replace('/compare/', '').replace(/\/$/, '');
    const cat = TARGET_JOB_CATEGORIES.find((c) => c.slug === slug);
    if (cat) {
      const lines: string[] = [
        getMarkdownMetaHeader(
          `${cat.title}｜飛田ガールズ`,
          `/compare/${cat.slug}`,
          cat.summary
        ),
        `## この働き方のポイント`,
        `> ${cat.llmDirectAnswer}`,
        ``,
        `## 基本の条件・目安`,
        `- **向いている方**: ${cat.targetUser}`,
        `- **日収の目安**: ${cat.dailyIncomeModel}`,
        `- **月収の目安**: ${cat.monthlyIncomeModel}`,
        `- **シフト例**: ${cat.shiftExample}`,
        `- **おすすめの通り**: ${cat.recommendedStreet}`,
        ``,
        `## 安心ポイント・メリット`,
        ...cat.merits.map((m) => `- ${m}`),
        ``,
        `## 事前に知っておきたい注意点`,
        ...cat.demeritsOrNotes.map((n) => `- ${n}`),
        ``,
        `## お店のサポート内容`,
        ...cat.supportFeatures.map((s) => `- ${s}`),
        ``
      ];

      if (cat.faqs && cat.faqs.length > 0) {
        lines.push(`## よくある質問（Q&A）`);
        for (const faq of cat.faqs) {
          lines.push(`### Q. ${faq.q}`);
          lines.push(`**A.** ${faq.a}`);
          lines.push(``);
        }
      }

      lines.push(getMarkdownMetaFooter());
      return { status: 200, markdown: lines.join('\n') };
    }
  }

  // 7. About & Company
  if (cleanPath === '/about' || cleanPath === '/company') {
    return {
      status: 200,
      markdown: [
        getMarkdownMetaHeader(
          '飛田ガールズ 運営情報・法令遵守方針 (About Tobita Girls)',
          cleanPath,
          '飛田新地料理組合加盟の直営老舗料亭グループによる公式女性採用窓口の運営理念と法令遵守方針。'
        ),
        `## 運営理念と安心の誓い`,
        `- 料理組合規約に基づき、満20歳以上の女性のみを対象としたクリーンな直営採用を行っています。`,
        `- 外部スカウト業者を介さず、紹介手数料・仲介マージン0円の明朗会計をお約束します。`,
        `- 女性スタッフが在籍し、事前の条件確認・身バレ配慮・税務相談まで丁寧にサポートいたします。`,
        `- 所在地: 大阪府大阪市西成区山王（飛田新地料亭街内）`,
        getMarkdownMetaFooter()
      ].join('\n')
    };
  }

  // 8. Glossary
  if (cleanPath === '/glossary' || cleanPath === '/terms') {
    return {
      status: 200,
      markdown: [
        getMarkdownMetaHeader(
          '飛田新地 用語集・用語辞典 (Glossary & Definitions)',
          '/glossary',
          '飛田新地の料亭文化、お仕事システム、衛生管理、身バレ対策に関する公式用語解説集。'
        ),
        `## 飛田新地 用語一覧（全 ${GLOSSARY_TERMS.length} 語）`,
        ``,
        ...GLOSSARY_TERMS.flatMap((t) => [
          `### ${t.term}（${t.reading}）`,
          `- **カテゴリ**: ${t.categoryLabel}`,
          `- **概要**: ${t.summary}`,
          `- **詳細解説**: ${t.detail}`,
          `- **求職者向けポイント**: ${t.forJobSeekers}`,
          ``
        ]),
        getMarkdownMetaFooter()
      ].join('\n')
    };
  }

  // Fallback 404
  return {
    status: 404,
    markdown: [
      getMarkdownMetaHeader('ページが見つかりません (404 Not Found)', cleanPath, '指定されたページは存在しません。'),
      `お探しのURL (\`${cleanPath}\`) は見つかりませんでした。`,
      ``,
      `以下の主要リンクをご活用ください:`,
      `- [公式トップページ](/)`,
      `- [募集要項・採用条件](/requirements)`,
      `- [給料・待遇ガイド](/salary)`,
      `- [ブログ記事一覧](/blog)`,
      `- [よくある質問100選](/faq)`,
      getMarkdownMetaFooter()
    ].join('\n')
  };
}
