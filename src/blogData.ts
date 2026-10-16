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

export const BLOG_CATEGORIES: { id: string; label: string; emoji?: string }[] = [
  { id: 'all', label: 'すべて', emoji: '✨' },
  { id: 'beginner', label: '未経験者向け', emoji: '🔰' },
  { id: 'salary', label: '給与・待遇', emoji: '💰' },
  { id: 'security', label: '安心・身バレ対策', emoji: '🤫' },
  { id: 'lifestyle', label: '生活・働き方', emoji: '⏰' },
  { id: 'onboarding', label: '面接・お仕事の流れ', emoji: '🌸' }
];

export const BLOG_ARTICLES: BlogArticle[] = blogArticlesJson as BlogArticle[];

export function getAuthorProfile(author?: { name?: string; role?: string; avatar?: string }): {
  name: string;
  role: string;
  avatar: string;
  badge: string;
  experienceTag: string;
  comment: string;
  bio: string;
} {
  const name = author?.name || '';
  const role = author?.role || '';
  const avatar = author?.avatar || '';

  if (name.includes('ななみ') || name.includes('チーフ')) {
    return {
      name: name || 'ななみ',
      role: role || '女性キャストサポート責任者（チーフ）',
      avatar: avatar && !avatar.match(/[\uD800-\uDBFF][\uDC00-\uDFFF]/) ? avatar : '/images/author_nanami_chief.jpg',
      badge: '現場統括・女性ケア責任者',
      experienceTag: '料亭業界歴12年 / 面接・新人育成担当',
      comment: '飛田新地で働く女の子たちが一番不安に感じる「人間関係」「お店のリアルな客層」「安全面」について、現場の責任者として包み隠さず本音でお答えしています。',
      bio: '飛田新地料理組合加盟の老舗料亭にて女性サポートチーフを務める。未経験スタートのキャストが安心して高収入を得られるよう、入店前の面談から勤務中のメンタルケアまで一貫してサポート。'
    };
  }
  if (name.includes('みく') || name.includes('アドバイザー')) {
    return {
      name: name || 'みく',
      role: role || '公式LINE相談窓口・女性アドバイザー',
      avatar: avatar && !avatar.match(/[\uD800-\uDBFF][\uDC00-\uDFFF]/) ? avatar : '/images/author_miku_advisor.jpg',
      badge: '24時間LINE相談窓口担当',
      experienceTag: '相談窓口歴5年 / ナイトワーク転職相談担当',
      comment: '「こんなこと聞いても大丈夫かな？」と思う些細な疑問でも大丈夫です。女性同士だからこそ話せる本音の相談に24時間お答えしています。',
      bio: '公式LINE相談や面接前の不安解消を担当する女性アドバイザー。夜職がまったく初めての方でもリラックスして疑問を解消できるよう、寄り添った丁寧なカウンセリングを行っています。'
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

const DEDICATED_COLUMN_IMAGES: Record<string, string> = {
  'tobitashinchi-salary-system': '/images/col_salary_system_1783677804535.jpg',
  'tobitashinchi-trial-guide': '/images/col_trial_guide_1783677848466.jpg',
  'tobitashinchi-safety-rules-faq': '/images/col_safety_security_1783677920159.jpg',
  'tobitashinchi-shift-workstyle-guide': '/images/col_weekend_shift_1783677940789.jpg',
  'tobitashinchi-short-term-work': '/images/col_short_term_1783677909352.jpg',
  'tobitashinchi-search-keywords': '/images/col_search_words_1783677965204.jpg',
  'tobitashinchi-safety-security': '/images/col_safe_entrance_1783883680643.jpg',
  'tobitashinchi-weekend-shift': '/images/col_smart_planner_1783883692671.jpg',
  'tobitashinchi-trial-guide-faq': '/images/col_welcome_gift_1783883703745.jpg',
  'tobitashinchi-student-success': '/images/col_cherry_bloom_1783883726145.jpg',
  'tobitashinchi-tennoji-shopping-cafe': '/images/col_gourmet_takoyaki_1785380270711.jpg',
  'tobitashinchi-youth-charm': '/images/col_confidence_mirror_1785380357158.jpg',
  'tobitashinchi-self-care-detox': '/images/col_relax_bath_1785380379937.jpg',
  'tobitashinchi-vs-other-night-jobs': '/images/col_non_alcoholic_1783677885472.jpg',
  'tobitashinchi-tax-save-20s-guide': '/images/col_smart_tax_104_1788073821808.jpg',
  'tobitashinchi-salary-system-explained': '/images/col_gold_reward_50_1785495755977.jpg',
  'tobitashinchi-salary-guide': '/images/col_daily_cash_53_1785495791484.jpg',
  'tobitashinchi-salary-system-guide': '/images/col_savings_chart_56_1785495838818.jpg',
  'yukata-obi-ribbon-elegance-styling': '/images/col_obi_ribbon_89_1785507575434.jpg',
  'tobitashinchi-scout-yakuza-exclusion-guide': '/images/col_scout_warning_123_1788788941774.jpg',
  'tobitashinchi-single-mother-childcare-support': '/images/col_wellness_clean_100_1788073772167.jpg'
};

export function getValidArticleEyeCatch(art: { id?: string | number; slug?: string; category?: string; eyeCatch?: string }): string {
  if (art && art.slug && DEDICATED_COLUMN_IMAGES[art.slug]) {
    return DEDICATED_COLUMN_IMAGES[art.slug];
  }
  if (art && art.slug) {
    return `/images/card_${art.slug}.jpg`;
  }

  if (art && art.id !== undefined) {
    const defaultMatch = BLOG_ARTICLES.find(d => String(d.id) === String(art.id));
    if (defaultMatch) {
      if (defaultMatch.slug && DEDICATED_COLUMN_IMAGES[defaultMatch.slug]) {
        return DEDICATED_COLUMN_IMAGES[defaultMatch.slug];
      }
      if (defaultMatch.slug) {
        return `/images/card_${defaultMatch.slug}.jpg`;
      }
      if (defaultMatch.eyeCatch) {
        return defaultMatch.eyeCatch;
      }
    }
  }

  if (art && art.eyeCatch) {
    const ec = art.eyeCatch.trim();
    if (ec.startsWith('http://') || ec.startsWith('https://') || ec.startsWith('data:') || ec.startsWith('/images/')) {
      return ec;
    }
    const filename = ec.split('/').pop()?.split('?')[0];
    if (filename) {
      return `/images/${filename}`;
    }
  }

  return '/images/col_beginner_guide_art_1787803245812.jpg';
}

const BLOG_DATA_VERSION = '20261016_unique_images_v5';

export function getStoredArticles(): BlogArticle[] {
  if (typeof window === 'undefined') return BLOG_ARTICLES;
  try {
    if (localStorage.getItem('custom_blog_articles_version') !== BLOG_DATA_VERSION) {
      localStorage.setItem('custom_blog_articles_version', BLOG_DATA_VERSION);
      localStorage.setItem('custom_blog_articles', JSON.stringify(BLOG_ARTICLES));
      return BLOG_ARTICLES;
    }
    const stored = localStorage.getItem('custom_blog_articles');
    if (!stored) {
      return BLOG_ARTICLES;
    }
    const rawArticles = JSON.parse(stored) as BlogArticle[];
    if (rawArticles.length === 0) return BLOG_ARTICLES;

    // もし古い画像への参照、または絵文字、正しくない画像パス、古いスラッグがあれば、最新のオリジナル画像や正しいスラッグに自動的に置換する
    const customArticles = rawArticles.map(art => {
      const defaultMatch = BLOG_ARTICLES.find(d => String(d.id) === String(art.id));
      if (defaultMatch) {
        return {
          ...art,
          eyeCatch: defaultMatch.eyeCatch,
          slug: defaultMatch.slug
        };
      }
      return {
        ...art,
        eyeCatch: getValidArticleEyeCatch(art)
      };
    });

    // もしデフォルトの新規記事がローカルストレージに存在しない場合、自動的にマージする
    const customIds = new Set(customArticles.map(a => String(a.id)));
    let hasNewDefault = false;
    const mergedArticles = [...customArticles];
    for (const defaultArt of BLOG_ARTICLES) {
      if (!customIds.has(String(defaultArt.id))) {
        mergedArticles.push(defaultArt);
        hasNewDefault = true;
      }
    }
    if (hasNewDefault || JSON.stringify(rawArticles) !== JSON.stringify(customArticles)) {
      // IDの数値順に並べ替えてソート
      mergedArticles.sort((a, b) => {
        const idA = parseInt(a.id, 10) || 0;
        const idB = parseInt(b.id, 10) || 0;
        return idA - idB;
      });
      localStorage.setItem('custom_blog_articles', JSON.stringify(mergedArticles));
      return mergedArticles;
    }

    return customArticles;
  } catch (e) {
    console.error('Error parsing custom blog articles:', e);
    return BLOG_ARTICLES;
  }
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

export function saveArticles(articles: BlogArticle[]) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem('custom_blog_articles', JSON.stringify(articles));
  } catch (e) {
    console.error('Error saving blog articles to localStorage:', e);
  }
}
