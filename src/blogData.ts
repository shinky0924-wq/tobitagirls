import blogArticlesJson from '../data/blogArticles.json';

export type BlogCategoryType =
  | 'voice'
  | 'beginner'
  | 'experienced'
  | 'job'
  | 'salary'
  | 'benefits'
  | 'workstyle'
  | 'criteria'
  | 'interview'
  | 'access'
  | 'privacy'
  | 'safety'
  | 'shops'
  | 'support'
  | 'dorm'
  | 'technique'
  | 'repeat'
  | 'beauty'
  | 'quit'
  | 'faq'
  | 'relationships';

export interface BlogArticle {
  id: string;
  title: string;
  slug: string;
  category: BlogCategoryType;
  categoryLabel: string;
  publishedAt: string;
  readTime: string;
  summary: string;
  eyeCatch: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  content: {
    type: 'p' | 'h2' | 'h3' | 'list' | 'cta' | 'qna';
    text?: string;
    items?: string[];
    question?: string;
    answer?: string;
  }[];
  tags: string[];
  seoNoindex?: boolean;
}

export interface AuthorProfile {
  name: string;
  role: string;
  avatar: string;
  badge: string;
  experienceTag: string;
  comment: string;
  bio: string;
}

export function getAuthorProfile(author?: { name?: string; role?: string; avatar?: string }): AuthorProfile {
  const name = author?.name || 'さくら';
  const role = author?.role || '女性サポートスタッフ（歴8年）';
  const avatar = author?.avatar || '👩‍💼';

  // Specific profiles based on author name/role
  if (name.includes('木村') || role.includes('採用') || role.includes('給料') || role.includes('給与')) {
    return {
      name: name || 'マネージャー木村',
      role: role || '採用・給与管理担当',
      avatar: avatar || '👨‍💼',
      badge: '採用・給料管理責任者 監修',
      experienceTag: '給与・契約法務管理歴12年',
      comment: '飛田新地の料亭組合規約および給与計算（50%バック即日全額日払い）、天引きなしの契約ルールを厳格に管理・精査した上で解説しています。',
      bio: '飛田新地エリアの料亭求人・給与管理を12年にわたり統括。全額日払いの透明な報酬計算、法令遵守の雇用契約、オートロック付き個室マンション寮の設備管理を担当。虚偽や誇大広告のない「正確な現場基準」をお伝えします。'
    };
  }

  if (name.includes('しほ') || role.includes('元キャスト・現相談員') || role.includes('相談員') || role.includes('サポートスタッフ')) {
    return {
      name: name || 'しほ',
      role: '料亭直営 女性スタッフ（元キャスト）',
      avatar: avatar && !avatar.match(/[\uD800-\uDBFF][\uDC00-\uDFFF]/) ? avatar : '/images/sakura_advisor_portrait_1788920514818.jpg',
      badge: '料亭直営 元キャストスタッフ執筆',
      experienceTag: '料亭キャスト勤務3年＋女性サポート歴4年',
      comment: '私自身が実際に料亭の玄関に座って働いていた経験から、女の子が本当に不安に感じるポイント（身バレ・生理・体力）のリアルな本音を包み隠さずお伝えします。',
      bio: '飛田新地の料亭キャストとして3年間の勤務を経験後、現在は料亭直営の女性サポート・採用スタッフとして従事。現場経験者だからこそ分かる『初日の緊張』『確定申告のやり方』『無理のない稼ぎ方』を親身にアドバイスしています。'
    };
  }

  if (name.includes('さゆり') || role.includes('人気キャスト') || role.includes('オーナーサポート')) {
    return {
      name: name || 'さゆり',
      role: role || '元・人気キャスト（現オーナーサポート）',
      avatar: avatar && !avatar.match(/[\uD800-\uDBFF][\uDC00-\uDFFF]/) ? avatar : '/images/tobita_cast_one_real_1782374824918.jpg',
      badge: '元人気キャスト・接客指導 監修',
      experienceTag: 'メイン・青春通りトップ経験＋育成歴5年',
      comment: '玄関（上がり框）での座り方や笑顔で手を振るコツ、仲居さんとの呼吸の合わせ方、短時間でお客さまに喜んでいただくプロのコツなど、現場で確実に役立つ実践テクニックを共有します。',
      bio: 'メイン通り・青春通りエリアの料亭で長年キャストとして活躍。現在は現場サポートおよび新人女性の接客指導・マナー研修を担当。容姿だけに頼らず『愛嬌と笑顔』を大切にし、自分のペースでやりがいを持って働くコツをお伝えします。'
    };
  }

  if (name.includes('みく') || role.includes('昼職と掛け持ち') || role.includes('Wワーク')) {
    return {
      name: name || 'みく',
      role: role || '現役キャスト（2年目・昼職と掛け持ち）',
      avatar: avatar && !avatar.match(/[\uD800-\uDBFF][\uDC00-\uDFFF]/) ? avatar : '/images/tobita_cast_two_real_1782374841336.jpg',
      badge: '現役キャスト（昼職Wワーク）体験レポ',
      experienceTag: '平日OL×週末飛田新地 2年目',
      comment: '本業に知られにくい住民税の普通徴収手続きや、平日の体力配分など、Wワーク実践者としての生の声をお届けします。',
      bio: '昼間は一般企業のOLとして勤務しながら、週末や有給を活用して飛田新地で働く現役キャスト2年目。住民税の普通徴収を基本としたプライバシー配慮や、無理のない週末シフトでの貯金・ライフスタイルのリアルを女性目線で執筆しています。'
    };
  }

  if (name.includes('美紀') || (role.includes('現役キャスト') && role.includes('23歳'))) {
    return {
      name: name || '美紀',
      role: role || '現役キャスト（歴2年・23歳）',
      avatar: avatar && !avatar.match(/[\uD800-\uDBFF][\uDC00-\uDFFF]/) ? avatar : '/images/tobita_cast_three_real_1782374857559.jpg',
      badge: '20代現役キャスト リアル体験談',
      experienceTag: '地方上京組・飛田新地2年目（23歳）',
      comment: 'まったくの未経験からカバン一つで上京してスタートした私が、実際の寮の暮らし心地やお給料の使い道をありのままにレポートします。',
      bio: '21歳のときに地方から上京（来阪）し、未経験から飛田新地で働き始めた20代現役キャスト。家具家電付きのマンション寮のリアルな設備、毎日の持ち物、初日の面接・出勤時の体験談など、同世代の女の子のリアルな疑問にお答えします。'
    };
  }

  if (name.includes('るな') || role.includes('天王寺在住')) {
    return {
      name: name || 'るな',
      role: role || '現役キャスト（22歳・天王寺在住）',
      avatar: avatar && !avatar.match(/[\uD800-\uDBFF][\uDC00-\uDFFF]/) ? avatar : '/images/tobita_cast_one_1781787976936.jpg',
      badge: '現役キャスト 等身大レポート',
      experienceTag: '飛田新地勤務歴1年半（22歳）',
      comment: 'メイクや衣装の選び方、仲居さんとのおしゃべり、休日のリフレッシュ方法など、毎日のリアルな日常を分かりやすくまとめました。',
      bio: '天王寺エリア在住の20代現役キャスト。料亭での衣装（ドレス・着物）の着こなしやメイクの工夫、待機時間の過ごし方、疲れない体力管理法など、現役ならではの等身大の視点で発信しています。'
    };
  }

  if (name.includes('ゆい') || role.includes('生活支援') || role.includes('寮案内')) {
    return {
      name: name || 'ゆい',
      role: role || '女性サポートスタッフ（生活・寮手配担当）',
      avatar: avatar && !avatar.match(/[\uD800-\uDBFF][\uDC00-\uDFFF]/) ? avatar : '/images/tobita_cast_two_1781787990991.jpg',
      badge: '生活支援・出稼ぎサポート担当',
      experienceTag: '女性生活支援・寮手配歴5年',
      comment: '地方からの出稼ぎや引っ越しを伴う応募でも安心していただけるよう、生活環境や個室寮の費用・空き状況の事前確認ポイントを詳しく解説します。',
      bio: '女性サポートスタッフとして、地方からの出稼ぎ希望者や一人暮らし希望者の生活立ち上げ・寮案内を中心に担当。オートロック付きマンション寮のご相談（空き状況・入居条件の事前案内）から新生活準備まで、安心してスタートできるようサポートしています。'
    };
  }

  if (name.includes('ひまり') || role.includes('カウンセラー') || role.includes('応募相談')) {
    return {
      name: name || 'ひまり',
      role: role || '女性サポートスタッフ（相談カウンセラー）',
      avatar: avatar && !avatar.match(/[\uD800-\uDBFF][\uDC00-\uDFFF]/) ? avatar : '/images/tobita_cast_three_real_1782374857559.jpg',
      badge: 'LINE相談・初心者カウンセラー',
      experienceTag: '女性カウンセリング・応募相談歴4年',
      comment: '初めての応募で不安や緊張を抱えている方が少しでも安心できるよう、丁寧で分かりやすい解説を心掛けています。',
      bio: '応募前のLINE相談や面接前の不安解消を担当する女性アドバイザー。夜職がまったく初めての方でもリラックスして疑問を解消できるよう、寄り添った丁寧なカウンセリングを行っています。'
    };
  }

  // Default: さくら (女性サポートスタッフ歴8年)
  return {
    name: name || 'さくら',
    role: role || '女性サポートスタッフ（歴8年）',
    avatar: avatar && !avatar.match(/[\uD800-\uDBFF][\uDC00-\uDFFF]/) ? avatar : '/images/sakura_advisor_portrait_1788920514818.jpg',
    badge: '記事監修・実務執筆',
    experienceTag: '女性相談窓口歴8年 / のべ1,000名以上対応',
    comment: 'ネット上の不確かな噂や誇大広告ではなく、実際の料亭現場での採用基準、給与システム、女性の安全管理規約に基づいた事実のみを記載しています。',
    bio: '飛田新地での女性サポート歴8年。未経験者から出稼ぎ希望者まで、のべ1,000名以上の相談・面接案内を担当。給与システム、身バレ防止、衛生管理、生活支援に関する現場の最新情報を発信しています。'
  };
}

export interface BlogCategoryItem {
  id: string;
  label: string;
  description: string;
}

export const BLOG_HERO_IMAGE = '/images/blog_hero_editorial_guide_1795658839229.jpg';

export const RECOMMENDED_BLOG_SLUGS: { slug: string; shortLabel: string }[] = [
  { slug: 'tobitashinchi-beginner-guide', shortLabel: '飛田新地のお仕事とは？初めての方向けガイド' },
  { slug: 'tobita-job-guide', shortLabel: '飛田新地の仕事内容と1日の流れ' },
  { slug: 'tobitashinchi-salary-system', shortLabel: '飛田新地の給料システムと報酬の計算方法' },
  { slug: 'tobitashinchi-interview-rejection-criteria-truth', shortLabel: '飛田新地の採用基準について' },
  { slug: 'tobitashinchi-one-day-trial-honest-guide', shortLabel: '面接・見学・体験入店の流れ' },
  { slug: 'tobitashinchi-nakai-obachan-role-and-tips', shortLabel: '仲居さんのサポートについて' },
  { slug: 'tobitashinchi-access-stations-interview-guide', shortLabel: '飛田新地へのアクセス方法' },
  { slug: 'tobitashinchi-privacy-guide', shortLabel: '身バレが心配な女性が確認したいこと' },
];

export const BLOG_CATEGORIES: BlogCategoryItem[] = [
  { id: 'all', label: 'すべての記事', description: '公開中のお仕事コラムをすべて表示します。' },
  { id: 'voice', label: '女性体験談', description: '実際に働いた女性の声や取材記録・働き始めてからの感想。' },
  { id: 'beginner', label: '未経験・初めて', description: '飛田新地が初めての方向けの基本ガイドと疑問解消。' },
  { id: 'experienced', label: '経験者・移籍', description: '他店・他業種からの移籍やブランク復帰の確認ポイント。' },
  { id: 'job', label: '仕事内容・1日の流れ', description: '料亭での仕事内容、コースの流れ、出勤から退勤までの過ごし方。' },
  { id: 'salary', label: '給料・報酬', description: '売上50%バックの計算方法、即日日払い、お金管理の基礎知識。' },
  { id: 'benefits', label: '待遇・設備', description: '無料貸出衣装、控室・お部屋の設備、各種待遇やキャンペーン。' },
  { id: 'workstyle', label: '勤務時間・シフト', description: '自由シフト、週1日・短時間・昼シフト、Wワークや体調時の休み方。' },
  { id: 'criteria', label: '採用基準', description: '応募資格、年齢・体型・容姿のリアル、採用時に確認されるポイント。' },
  { id: 'interview', label: '応募・面接・体験入店', description: 'LINE相談、面接の服装・持ち物、住民票・パスポート、見学や1日体験の流れ。' },
  { id: 'access', label: '通勤・アクセス', description: '動物園前駅・新今宮駅・天王寺駅からの行き方や関西圏からの通勤事情。' },
  { id: 'privacy', label: '身バレ・プライバシー', description: '家族・友人・職場に知られにくい工夫、SNS設定、源氏名や税金の基礎。' },
  { id: 'safety', label: '安全・トラブル対策', description: '衛生管理、定期検査、NG客対応ルール、安全な応募先の見分け方。' },
  { id: 'shops', label: 'お店選び', description: 'メイン通り・青春通りの違いや他業種比較、自分に合うお店選びのコツ。' },
  { id: 'support', label: 'サポート体制', description: '仲居さんや女性スタッフのフォロー、初日サポート、メンタルケア。' },
  { id: 'dorm', label: '寮・出稼ぎ', description: '寮や滞在先の確認ポイント、遠方からの短期出稼ぎ・上阪準備。' },
  { id: 'technique', label: 'テクニック', description: '第一印象、自然な会話、人見知りでも実践しやすい接客のコツ。' },
  { id: 'repeat', label: 'リピート・指名率UP', description: '無理のない誠実な接客で信頼関係を築き、また会いたいと思ってもらう工夫。' },
  { id: 'beauty', label: '美容・身だしなみ', description: 'メイク・髪色・ネイル・カラコン・香水・清潔感の整え方。' },
  { id: 'quit', label: '退店・辞め方', description: '退店の伝え方、報酬精算、ペナルティの有無、卒業後のキャリア。' },
  { id: 'faq', label: 'よくある質問', description: '応募前・勤務前によく寄せられる疑問やネットの噂への正直な回答。' },
  { id: 'relationships', label: '人間関係・職場環境', description: '女性同士の距離感、スタッフとの関わり、職場の雰囲気の確認ポイント。' },
];

export const BLOG_ARTICLES: BlogArticle[] = blogArticlesJson as BlogArticle[];

export function getValidArticleEyeCatch(art: { id?: string | number; category?: string; eyeCatch?: string }): string {
  // If art matches a default article ID, prioritize the curated default image to avoid duplicates
  if (art && art.id !== undefined) {
    const defaultMatch = BLOG_ARTICLES.find(d => String(d.id) === String(art.id));
    if (defaultMatch && defaultMatch.eyeCatch) {
      const filename = defaultMatch.eyeCatch.split('/').pop()?.split('?')[0];
      if (filename) {
        return `/images/${filename}`;
      }
    }
  }

  if (art && art.eyeCatch) {
    const ec = art.eyeCatch.trim();
    if (ec.startsWith('http://') || ec.startsWith('https://') || ec.startsWith('data:')) {
      return ec;
    }
    if (ec.includes('.jpg') || ec.includes('.png') || ec.includes('.webp') || ec.includes('.svg')) {
      const filename = ec.split('/').pop()?.split('?')[0];
      if (filename) {
        return `/images/${filename}`;
      }
    }
  }

  // Find fallback from category
  const categoryMatch = BLOG_ARTICLES.find(d => d.category === art?.category);
  if (categoryMatch && categoryMatch.eyeCatch) {
    return getValidArticleEyeCatch({ eyeCatch: categoryMatch.eyeCatch });
  }

  return '/images/col_beginner_guide_art_1787803245812.jpg';
}

function parseArticleDateMs(publishedAt?: string): number {
  if (!publishedAt) return 0;
  const normalized = String(publishedAt).trim().replace(/[./年]/g, '-').replace(/月/g, '-').replace(/日/g, '');
  const match = normalized.match(/^(\d{4})-(\d{1,2})-(\d{1,2})/);
  if (match) {
    return Date.UTC(Number(match[1]), Number(match[2]) - 1, Number(match[3]));
  }
  const parsed = Date.parse(normalized);
  return Number.isNaN(parsed) ? 0 : parsed;
}

function parseArticleSecondaryOrder(id?: string): number {
  if (!id) return 0;
  const str = String(id).trim();
  const customMatch = str.match(/^custom-(\d+)$/);
  if (customMatch) {
    return Number(customMatch[1]) || 0;
  }
  if (/^\d+$/.test(str)) {
    return parseInt(str, 10) || 0;
  }
  return 0;
}

export function sortArticlesByDate(
  articles: BlogArticle[],
  order: 'newest' | 'oldest' = 'newest'
): BlogArticle[] {
  const withIndex = articles.map((article, index) => ({
    article,
    index,
    dateMs: parseArticleDateMs(article.publishedAt),
    sec: parseArticleSecondaryOrder(article.id),
  }));

  withIndex.sort((a, b) => {
    if (a.dateMs !== b.dateMs) {
      return order === 'newest' ? b.dateMs - a.dateMs : a.dateMs - b.dateMs;
    }
    if (a.sec !== b.sec) {
      return order === 'newest' ? b.sec - a.sec : a.sec - b.sec;
    }
    return order === 'newest' ? a.index - b.index : b.index - a.index;
  });

  return withIndex.map((item) => item.article);
}

export function mergeWithDefaultArticles(incomingArticles: BlogArticle[]): { merged: BlogArticle[]; hasChanges: boolean } {
  const incoming = incomingArticles || [];
  const defaultSlugs = new Map(BLOG_ARTICLES.map(d => [d.slug, d]));
  const defaultIds = new Map(BLOG_ARTICLES.map(d => [String(d.id), d]));
  let hasChanges = false;
  
  const updatedIncoming = incoming.map(art => {
    const match = defaultSlugs.get(art.slug) || defaultIds.get(String(art.id));
    if (match) {
      hasChanges = true;
      return match;
    }
    const validEyeCatch = getValidArticleEyeCatch(art);
    if (validEyeCatch !== art.eyeCatch) {
      hasChanges = true;
      return { ...art, eyeCatch: validEyeCatch };
    }
    return art;
  });

  const existingSlugs = new Set(updatedIncoming.map(a => a.slug));
  const merged = [...updatedIncoming];
  for (const defaultArt of BLOG_ARTICLES) {
    if (!existingSlugs.has(defaultArt.slug)) {
      merged.push(defaultArt);
      hasChanges = true;
    }
  }

  return { merged: sortArticlesByDate(merged, 'newest'), hasChanges };
}

const BLOG_DATA_VERSION = '20261125_blog_clean_thumbnails_v30';

export function getStoredArticles(): BlogArticle[] {
  if (typeof window === 'undefined') return sortArticlesByDate(BLOG_ARTICLES, 'newest');
  try {
    if (localStorage.getItem('custom_blog_articles_version') !== BLOG_DATA_VERSION) {
      const sortedDefaults = sortArticlesByDate(BLOG_ARTICLES, 'newest');
      localStorage.setItem('custom_blog_articles_version', BLOG_DATA_VERSION);
      localStorage.setItem('custom_blog_articles', JSON.stringify(sortedDefaults));
      return sortedDefaults;
    }
    const stored = localStorage.getItem('custom_blog_articles');
    if (!stored) {
      return sortArticlesByDate(BLOG_ARTICLES, 'newest');
    }
    const rawArticles = JSON.parse(stored) as BlogArticle[];
    if (rawArticles.length === 0) return sortArticlesByDate(BLOG_ARTICLES, 'newest');

    const { merged, hasChanges } = mergeWithDefaultArticles(rawArticles);
    if (hasChanges) {
      localStorage.setItem('custom_blog_articles', JSON.stringify(merged));
    }
    return merged;
  } catch (e) {
    console.error('Error parsing custom blog articles:', e);
    return sortArticlesByDate(BLOG_ARTICLES, 'newest');
  }
}

export function saveArticles(articles: BlogArticle[]) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem('custom_blog_articles', JSON.stringify(articles));
  } catch (e) {
    console.error('Error saving blog articles to localStorage:', e);
  }
}
