import blogArticlesJson from '../data/blogArticles.json';

export interface BlogArticle {
  id: string;
  title: string;
  slug: string;
  category: 'beginner' | 'salary' | 'security' | 'lifestyle' | 'onboarding';
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

  if (name.includes('しほ') || role.includes('元キャスト・現相談員') || role.includes('相談員')) {
    return {
      name: name || 'しほ',
      role: role || '女性スタッフ（元キャスト・現相談員）',
      avatar: avatar && !avatar.match(/[\uD800-\uDBFF][\uDC00-\uDFFF]/) ? avatar : '/images/tobita_advisor_avatar_1782370695372.jpg',
      badge: '元キャスト・現相談員 実務執筆',
      experienceTag: '料亭勤務3年＋相談員歴4年',
      comment: '私自身が実際に料亭の玄関に座って働いていた経験から、女の子が本当に不安に感じるポイント（身バレ・生理・体力）のリアルな本音を包み隠さずお伝えします。',
      bio: '飛田新地の現役キャストとして3年間の勤務を経験後、現在は女の子専用の相談員として従事。現場経験者だからこそ分かる『初日の緊張』『確定申告のやり方』『無理のない稼ぎ方』を親身にアドバイスしています。'
    };
  }

  if (name.includes('さゆり') || role.includes('人気キャスト') || role.includes('オーナーサポート')) {
    return {
      name: name || 'さゆり',
      role: role || '元・人気キャスト（現オーナーサポート）',
      avatar: avatar && !avatar.match(/[\uD800-\uDBFF][\uDC00-\uDFFF]/) ? avatar : '/images/tobita_cast_one_real_1782374824918.jpg',
      badge: '元人気キャスト・接客指導 監修',
      experienceTag: 'メイン・青春通りトップ経験＋育成歴5年',
      comment: '玄関での座り方、仲居さんとの呼吸の合わせ方、短時間でお客さまに喜んでいただくプロのコツなど、現場で確実に役立つ実践テクニックを共有します。',
      bio: 'メイン通り・青春通りの人気料亭で長年トップキャストとして活躍。現在は料亭の現場サポートおよび新人女性の接客指導・マナー研修を担当。容姿だけに頼らず『愛嬌と笑顔』で日給10万円以上を安定して稼ぐ極意を伝授します。'
    };
  }

  if (name.includes('みく') || role.includes('昼職と掛け持ち') || role.includes('Wワーク')) {
    return {
      name: name || 'みく',
      role: role || '現役キャスト（2年目・昼職と掛け持ち）',
      avatar: avatar && !avatar.match(/[\uD800-\uDBFF][\uDC00-\uDFFF]/) ? avatar : '/images/tobita_cast_two_real_1782374841336.jpg',
      badge: '現役キャスト（昼職Wワーク）体験レポ',
      experienceTag: '平日OL×週末飛田新地 2年目',
      comment: '会社に絶対に副業がバレない住民税の普通徴収手続きや、平日の体力配分など、Wワーク実践者としての生の声をお届けします。',
      bio: '昼間は一般企業のOLとして勤務しながら、週末や有給を活用して飛田新地で働く現役キャスト2年目。住民税の普通徴収による完全秘密保持や、無理のない週末シフトでの貯金・資産形成リアルを女性目線で執筆しています。'
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
      comment: '地方からの出稼ぎや引っ越しを伴う応募でも安心していただけるよう、生活環境や初期費用0円の住居サポート情報を詳しく解説します。',
      bio: '女性サポートスタッフとして、地方からの出稼ぎ希望者や一人暮らし希望者の生活立ち上げ・寮案内を中心に担当。即入居可能なオートロック付きマンションの手配から日用品の準備まで、安心して新生活を送れるようサポートしています。'
    };
  }

  if (name.includes('ひまり') || role.includes('カウンセラー') || role.includes('応募相談')) {
    return {
      name: name || 'ひまり',
      role: role || '女性サポートスタッフ（相談カウンセラー）',
      avatar: avatar && !avatar.match(/[\uD800-\uDBFF][\uDC00-\uDFFF]/) ? avatar : '/images/tobita_cast_three_1788153006133.jpg',
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
    avatar: avatar && !avatar.match(/[\uD800-\uDBFF][\uDC00-\uDFFF]/) ? avatar : '/images/tobita_advisor_avatar_1782370695372.jpg',
    badge: '記事監修・実務執筆',
    experienceTag: '女性相談窓口歴8年 / のべ1,000名以上対応',
    comment: 'ネット上の不確かな噂や誇大広告ではなく、実際の料亭現場での採用基準、給与システム、女性の安全管理規約に基づいた事実のみを記載しています。',
    bio: '飛田新地での女性サポート歴8年。未経験者から出稼ぎ希望者まで、のべ1,000名以上の相談・面接案内を担当。給与システム、身バレ防止、衛生管理、生活支援に関する現場の最新情報を発信しています。'
  };
}

export const BLOG_CATEGORIES = [
  { id: 'all', label: 'すべて' },
  { id: 'beginner', label: '未経験者向け' },
  { id: 'salary', label: '給与・待遇' },
  { id: 'security', label: '安心・身バレ対策' },
  { id: 'lifestyle', label: '生活・働き方' },
  { id: 'onboarding', label: '面接・お仕事の流れ' }
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

  merged.sort((a, b) => {
    const idA = parseInt(a.id, 10) || 0;
    const idB = parseInt(b.id, 10) || 0;
    return idA - idB;
  });

  return { merged, hasChanges };
}

export function getStoredArticles(): BlogArticle[] {
  if (typeof window === 'undefined') return BLOG_ARTICLES;
  try {
    const stored = localStorage.getItem('custom_blog_articles');
    if (!stored) {
      return BLOG_ARTICLES;
    }
    const rawArticles = JSON.parse(stored) as BlogArticle[];
    if (rawArticles.length === 0) return BLOG_ARTICLES;

    const { merged, hasChanges } = mergeWithDefaultArticles(rawArticles);
    if (hasChanges) {
      localStorage.setItem('custom_blog_articles', JSON.stringify(merged));
    }
    return merged;
  } catch (e) {
    console.error('Error parsing custom blog articles:', e);
    return BLOG_ARTICLES;
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
