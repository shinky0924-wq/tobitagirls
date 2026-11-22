/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GLOSSARY_TERMS } from '../glossaryData';

export const OFFICIAL_DOMAIN = 'https://tobitashinchi-recruit.com';
export const OFFICIAL_LINE_URL = 'https://line.me/R/ti/p/@836gukxh';

/**
 * 公式サイトおよび公式外部アカウントの同一実体（sameAs）リスト
 * 新しい公式SNS（X / note / YouTube等）を開設した際はここに追加することで
 * 全ページのOrganization JSON-LDへ一括反映されます。
 */
export const OFFICIAL_SAME_AS_URLS: string[] = [
  `${OFFICIAL_DOMAIN}/`,
  OFFICIAL_LINE_URL,
];

export interface CanonicalAuthorEntity {
  key: string;
  idUrl: string;
  name: string;
  jobTitle: string;
  description: string;
  knowsAbout: string[];
}

export const CANONICAL_AUTHORS: CanonicalAuthorEntity[] = [
  {
    key: 'sakura',
    idUrl: `${OFFICIAL_DOMAIN}/about#author-sakura`,
    name: 'さくら',
    jobTitle: '女性サポート統括スタッフ（相談窓口歴8年）',
    description: '飛田新地の老舗料亭直営窓口にてのべ1,000名以上の応募相談・現場サポートを担当。未経験女性の不安解消と衛生・安全管理基準の正確かつ誠実な情報発信を統括。',
    knowsAbout: ['飛田新地求人案内', '未経験女性サポート', '身バレ・プライバシー対策', '衛生安全ルール'],
  },
  {
    key: 'kimura',
    idUrl: `${OFFICIAL_DOMAIN}/about#author-kimura`,
    name: 'マネージャー木村',
    jobTitle: '採用・給与管理責任者（管理歴12年）',
    description: '飛田新地料理組合加盟料亭の採用基準・給与計算（売上50%バック即日全額現金日払い）・契約管理および個室寮の設備・入居管理を12年にわたり統括。',
    knowsAbout: ['給与計算システム', '即日日払い手渡し規定', '寮・滞在支援', '年齢確認・組合規約'],
  },
  {
    key: 'shiho',
    idUrl: `${OFFICIAL_DOMAIN}/about#author-shiho`,
    name: 'しほ',
    jobTitle: '料亭直営 女性スタッフ（元キャスト）',
    description: '飛田新地の料亭キャストとして3年間の勤務を経験後、女性サポート・採用窓口に従事。経験者目線での初日緊張ケア・Wワーク・税金手続き相談を担当。',
    knowsAbout: ['キャスト実務体験', '確定申告・住民税普通徴収', '体験入店フォロー'],
  },
  {
    key: 'sayuri',
    idUrl: `${OFFICIAL_DOMAIN}/about#author-sayuri`,
    name: 'さゆり',
    jobTitle: '元人気キャスト・接客指導担当（育成歴5年）',
    description: 'メイン通り・青春通りエリアでの豊富な経験を活かし、新人女性の玄関（上がり框）での接客マナー・仲居さんとの連携・負担のない接客アドバイスを担当。',
    knowsAbout: ['上がり框での接客マナー', '仲居さんとの連携', '短時間接客のコツ'],
  },
  {
    key: 'yui',
    idUrl: `${OFFICIAL_DOMAIN}/about#author-yui`,
    name: 'ゆい',
    jobTitle: '女性サポートスタッフ（生活・寮手配担当）',
    description: '地方からの出稼ぎ・上京応募者の個室マンション寮案内や遠方交通費の事前確認、生活立ち上げサポートを担当。',
    knowsAbout: ['出稼ぎサポート', '個室マンション寮手配', '大阪生活案内'],
  },
  {
    key: 'himari',
    idUrl: `${OFFICIAL_DOMAIN}/about#author-himari`,
    name: 'ひまり',
    jobTitle: '女性サポートスタッフ（LINE応募相談カウンセラー）',
    description: '応募前のLINE無料相談・私服店舗見学の案内を担当。初めての方でもリラックスして質問できるカウンセリングを実施。',
    knowsAbout: ['LINE無料相談', '店舗見学・体験入店案内', '未経験カウンセリング'],
  },
  {
    key: 'miku',
    idUrl: `${OFFICIAL_DOMAIN}/about#author-miku`,
    name: 'みく',
    jobTitle: '現役キャスト（昼職Wワーク・2年目）',
    description: '平日は昼職OLとして働きながら、週末に飛田新地で勤務する現役キャスト視点の体験レポートを担当。',
    knowsAbout: ['OL副業・Wワーク', '週末限定シフト', '身バレ配慮実践'],
  },
  {
    key: 'miki',
    idUrl: `${OFFICIAL_DOMAIN}/about#author-miki`,
    name: '美紀',
    jobTitle: '現役キャスト（地方上京組・2年目）',
    description: '地方からの上京・出稼ぎ経験を活かした寮生活・持ち物・初日体験のリアルレポートを担当。',
    knowsAbout: ['地方上京・出稼ぎ体験談', '短期滞在ライフスタイル'],
  },
  {
    key: 'runa',
    idUrl: `${OFFICIAL_DOMAIN}/about#author-runa`,
    name: 'るな',
    jobTitle: '現役キャスト（20代・天王寺在住）',
    description: 'メイク・貸出衣装の着こなし・待機時間の過ごし方や体調管理など、現場の日常レポートを執筆。',
    knowsAbout: ['衣装・メイク準備', 'シフト管理と体調ケア'],
  },
];

export function resolveAuthorPersonNode(
  authorName?: string,
  authorRole?: string,
  bio?: string
): Record<string, any> {
  const nameStr = authorName || 'さくら';
  const roleStr = authorRole || '';

  const matched = CANONICAL_AUTHORS.find((a) => {
    if (nameStr.includes(a.name.replace('マネージャー', ''))) return true;
    if (a.key === 'kimura' && (roleStr.includes('採用') || roleStr.includes('給与') || roleStr.includes('給料'))) return true;
    if (a.key === 'yui' && (roleStr.includes('生活支援') || roleStr.includes('寮'))) return true;
    if (a.key === 'himari' && (roleStr.includes('カウンセラー') || roleStr.includes('応募相談'))) return true;
    if (a.key === 'sayuri' && roleStr.includes('オーナーサポート')) return true;
    if (a.key === 'miku' && (roleStr.includes('掛け持ち') || roleStr.includes('Wワーク'))) return true;
    if (a.key === 'shiho' && roleStr.includes('相談員')) return true;
    return false;
  }) || CANONICAL_AUTHORS[0];

  return {
    '@type': 'Person',
    '@id': matched.idUrl,
    name: authorName || matched.name,
    jobTitle: authorRole || matched.jobTitle,
    description: bio || matched.description,
    url: `${OFFICIAL_DOMAIN}/about`,
    knowsAbout: matched.knowsAbout,
    worksFor: {
      '@id': `${OFFICIAL_DOMAIN}/#organization`,
    },
  };
}

/**
 * 記事本文・タイトル・タグから関連する公式用語集（DefinedTerm）を抽出し、
 * Schema.org の mentions 配列を生成してサイト内知識グラフを連結する
 */
export function buildGlossaryMentions(textSource: string, maxItems = 6): Array<Record<string, any>> {
  if (!textSource) return [];
  const lower = textSource.toLowerCase();
  const matched: Array<Record<string, any>> = [];

  for (const term of GLOSSARY_TERMS) {
    const cleanHead = term.term.split('（')[0].trim();
    const keywords = [cleanHead, term.reading.split('（')[0].trim()].filter((k) => k.length >= 2);
    if (keywords.some((kw) => lower.includes(kw.toLowerCase()))) {
      matched.push({
        '@type': 'DefinedTerm',
        '@id': `${OFFICIAL_DOMAIN}/glossary#${term.id}`,
        name: term.term,
        url: `${OFFICIAL_DOMAIN}/glossary#${term.id}`,
        inDefinedTermSet: `${OFFICIAL_DOMAIN}/glossary#definedtermset`,
      });
    }
    if (matched.length >= maxItems) break;
  }

  return matched;
}

/**
 * 記事のテーマに応じた内部・公式根拠リンク（citation）を生成する
 */
export function buildArticleCitations(textSource: string): Array<Record<string, any>> {
  const citations: Array<Record<string, any>> = [
    {
      '@type': 'CreativeWork',
      name: '飛田ガールズ 運営体制・情報発信ポリシー（飛田新地料理組合加盟料亭）',
      url: `${OFFICIAL_DOMAIN}/about`,
    },
  ];

  if (/税金|確定申告|住民税|普通徴収|扶養/.test(textSource)) {
    citations.push({
      '@type': 'WebPage',
      name: '身バレ・税金（住民税普通徴収）プライバシー対策ガイド',
      url: `${OFFICIAL_DOMAIN}/safety`,
    });
  }
  if (/年齢|住民票|パスポート|20歳|身分証|書類/.test(textSource)) {
    citations.push({
      '@type': 'WebPage',
      name: '応募資格・年齢確認（20歳以上・必要書類）公式ガイド',
      url: `${OFFICIAL_DOMAIN}/requirements`,
    });
  }
  if (/給料|日払い|50%|バック|手取り/.test(textSource)) {
    citations.push({
      '@type': 'WebPage',
      name: '飛田新地 給料・売上50%バック・手取り計算ガイド',
      url: `${OFFICIAL_DOMAIN}/salary`,
    });
  }

  return citations;
}

/**
 * 記事の合計文字数（日本語文字カウント）を算出し wordCount として返す
 */
export function calculateArticleWordCount(summary: string = '', content: any[] = []): number {
  let total = (summary || '').replace(/\s+/g, '').length;
  if (Array.isArray(content)) {
    for (const block of content) {
      if (!block) continue;
      if (typeof block.text === 'string') total += block.text.replace(/\s+/g, '').length;
      if (typeof block.question === 'string') total += block.question.replace(/\s+/g, '').length;
      if (typeof block.answer === 'string') total += block.answer.replace(/\s+/g, '').length;
      if (Array.isArray(block.items)) {
        for (const it of block.items) {
          if (typeof it === 'string') total += it.replace(/\s+/g, '').length;
        }
      }
    }
  }
  return Math.max(total, 1);
}
