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

export const BLOG_CATEGORIES = [
  { id: 'all', label: 'すべて' },
  { id: 'beginner', label: '未経験者向け' },
  { id: 'salary', label: '給与・待遇' },
  { id: 'security', label: '安心・身バレ対策' },
  { id: 'lifestyle', label: '生活・働き方' },
  { id: 'onboarding', label: '面接・お仕事の流れ' }
];

export const BLOG_ARTICLES: BlogArticle[] = blogArticlesJson as BlogArticle[];

export function getStoredArticles(): BlogArticle[] {
  if (typeof window === 'undefined') return BLOG_ARTICLES;
  try {
    const stored = localStorage.getItem('custom_blog_articles');
    if (!stored) {
      return BLOG_ARTICLES;
    }
    const rawArticles = JSON.parse(stored) as BlogArticle[];
    if (rawArticles.length === 0) return BLOG_ARTICLES;

    // もし古いUnsplash画像への参照、または正しくない画像パス、空の画像があれば、最新のオリジナル画像に自動的に置換する
    const customArticles = rawArticles.map(art => {
      const defaultMatch = BLOG_ARTICLES.find(d => d.id === art.id);
      if (defaultMatch) {
        const isUnsplash = art.eyeCatch.startsWith('https://images.unsplash.com');
        const isOldPath = art.eyeCatch.includes('/assets/images/') && !art.eyeCatch.startsWith('/src/assets/images/');
        const isEmpty = !art.eyeCatch;
        if (isUnsplash || isOldPath || isEmpty || (defaultMatch.eyeCatch.startsWith('/src/assets/images/') && art.eyeCatch !== defaultMatch.eyeCatch)) {
          return { ...art, eyeCatch: defaultMatch.eyeCatch };
        }
      }
      return art;
    });

    // もしデフォルトの新規記事がローカルストレージに存在しない場合、自動的にマージする
    const customIds = new Set(customArticles.map(a => a.id));
    let hasNewDefault = false;
    const mergedArticles = [...customArticles];
    for (const defaultArt of BLOG_ARTICLES) {
      if (!customIds.has(defaultArt.id)) {
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

export function saveArticles(articles: BlogArticle[]) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem('custom_blog_articles', JSON.stringify(articles));
  } catch (e) {
    console.error('Error saving blog articles to localStorage:', e);
  }
}
