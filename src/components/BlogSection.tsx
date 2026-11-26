import React, { useState, useMemo, useEffect } from 'react';
import {
  BLOG_CATEGORIES,
  BLOG_HERO_IMAGE,
  RECOMMENDED_BLOG_SLUGS,
  BlogArticle,
  getValidArticleEyeCatch,
  getAuthorProfile,
  sortArticlesByDate,
} from '../blogData';
import { ArticleCardImage } from './ArticleCardImage';
import {
  Search,
  X,
  ArrowLeft,
  ArrowRight,
  ChevronRight,
  ChevronLeft,
  MessageCircle,
  FileText,
} from 'lucide-react';
import { updatePageJsonLd } from '../utils/jsonLd';
import { FAQ_LAST_UPDATED_ISO } from '../faq100Data';
import {
  OFFICIAL_LINE_URL,
  resolveAuthorPersonNode,
  buildGlossaryMentions,
  buildArticleCitations,
  calculateArticleWordCount,
} from '../utils/knowledgeGraph';

const SEARCH_SUGGESTIONS = [
  '未経験',
  '給料',
  '面接',
  '採用基準',
  '住民票',
  '身バレ',
  '寮',
  '仲居さん',
];

const RELATED_CATEGORY_MAP: Record<string, string[]> = {
  voice: ['beginner', 'support', 'relationships'],
  beginner: ['job', 'interview', 'support'],
  experienced: ['shops', 'salary', 'workstyle'],
  job: ['beginner', 'salary', 'support'],
  salary: ['benefits', 'job', 'workstyle'],
  benefits: ['salary', 'dorm', 'beauty'],
  workstyle: ['salary', 'privacy', 'access'],
  criteria: ['interview', 'beginner', 'beauty'],
  interview: ['criteria', 'beginner', 'access'],
  access: ['interview', 'shops', 'dorm'],
  privacy: ['safety', 'workstyle', 'salary'],
  safety: ['privacy', 'support', 'shops'],
  shops: ['access', 'relationships', 'experienced'],
  support: ['beginner', 'relationships', 'safety'],
  dorm: ['benefits', 'access', 'salary'],
  technique: ['repeat', 'beauty', 'support'],
  repeat: ['technique', 'support', 'salary'],
  beauty: ['benefits', 'technique', 'criteria'],
  quit: ['salary', 'benefits', 'faq'],
  faq: ['beginner', 'interview', 'criteria'],
  relationships: ['support', 'shops', 'voice'],
};

const BLOG_INDEX_TITLE =
  '飛田新地のお仕事コラム｜給料・仕事内容・採用基準・未経験ガイド｜飛田ガールズ';
const BLOG_INDEX_DESCRIPTION =
  '飛田新地で働くことを考えている女性向けのお仕事コラム。仕事内容、給料・報酬、未経験からの始め方、採用基準、面接・体験入店、待遇、サポート体制、寮、身バレ対策など、応募前に知っておきたい情報を分かりやすく紹介します。';

function AvatarDisplay({
  avatar,
  name,
  className = 'w-10 h-10 rounded-full',
}: {
  avatar?: string;
  name?: string;
  className?: string;
}) {
  const [failed, setFailed] = useState(false);
  const isImage =
    !failed &&
    avatar &&
    (avatar.startsWith('/') ||
      avatar.startsWith('http') ||
      avatar.includes('.jpg') ||
      avatar.includes('.png') ||
      avatar.includes('.webp') ||
      avatar.includes('.svg'));

  if (isImage) {
    return (
      <img
        src={avatar}
        alt={name || '執筆スタッフ'}
        className={`${className} object-cover border border-[#EFE0E5] bg-[#FFF0F4]`}
        loading="lazy"
        decoding="async"
        referrerPolicy="no-referrer"
        onError={() => setFailed(true)}
      />
    );
  }

  return (
    <span
      className={`${className} bg-[#FFF0F4] border border-[#EFE0E5] flex items-center justify-center text-xs font-bold text-[#9D3B5E]`}
      aria-hidden="true"
    >
      {(name || 'ス').slice(0, 1)}
    </span>
  );
}

function formatDateDisplay(dateStr?: string): string {
  if (!dateStr) return '';
  return dateStr.trim().replace(/-/g, '.');
}

function getEffectiveUpdatedDate(article: BlogArticle): string {
  const updated = (article as BlogArticle & { updatedAt?: string }).updatedAt;
  if (updated) return updated.replace(/-/g, '.');
  const pub = (article.publishedAt || '').replace(/\./g, '-');
  if (pub && pub >= FAQ_LAST_UPDATED_ISO) {
    return pub.replace(/-/g, '.');
  }
  return FAQ_LAST_UPDATED_ISO.replace(/-/g, '.');
}

interface BlogSectionProps {
  articles: BlogArticle[];
  selectedSlug: string | null;
  initialCategory?: string | null;
  onSelectSlug: (slug: string | null) => void;
  onCtaclick: () => void;
  onInjectedScroll: (message: string) => void;
  onSimulatorClick: () => void;
  onNavigateAbout?: () => void;
  onNavigateHome?: () => void;
  onNavigatePath?: (path: string) => void;
}

export default function BlogSection({
  articles,
  selectedSlug,
  initialCategory,
  onSelectSlug,
  onCtaclick,
  onInjectedScroll,
  onNavigateHome,
  onNavigatePath,
}: BlogSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory || 'all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [heroImgFailed, setHeroImgFailed] = useState<boolean>(false);
  const ARTICLES_PER_PAGE = 12;

  useEffect(() => {
    if (initialCategory && initialCategory !== 'all') {
      setSelectedCategory(initialCategory);
    }
  }, [initialCategory]);

  const isLoading = useMemo(() => {
    return !!selectedSlug && articles.length === 0;
  }, [selectedSlug, articles]);

  // Indexable public articles only for listing counts & filtering
  const publicArticles = useMemo(() => {
    return articles.filter((a) => a && a.slug && a.title && !a.seoNoindex);
  }, [articles]);

  // Count articles per category so empty categories are never shown in public UI
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: publicArticles.length };
    for (const art of publicArticles) {
      counts[art.category] = (counts[art.category] || 0) + 1;
    }
    return counts;
  }, [publicArticles]);

  const activeCategories = useMemo(() => {
    return BLOG_CATEGORIES.filter((cat) => cat.id === 'all' || (categoryCounts[cat.id] || 0) > 0);
  }, [categoryCounts]);

  const currentCategoryInfo = useMemo(() => {
    return BLOG_CATEGORIES.find((c) => c.id === selectedCategory) || BLOG_CATEGORIES[0];
  }, [selectedCategory]);

  // Curated recommended articles (only real existing articles)
  const recommendedArticles = useMemo(() => {
    const bySlug = new Map(publicArticles.map((a) => [a.slug, a]));
    return RECOMMENDED_BLOG_SLUGS.map((item) => {
      const article = bySlug.get(item.slug);
      return article ? { article, shortLabel: item.shortLabel } : null;
    }).filter((x): x is { article: BlogArticle; shortLabel: string } => x !== null);
  }, [publicArticles]);

  // Filter & Search (title, summary, tags, categoryLabel, and body prose) + Sort
  const filteredArticles = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    const tokens = q ? q.split(/\s+/).filter(Boolean) : [];

    const list = publicArticles.filter((article) => {
      const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
      if (!matchesCategory) return false;
      if (tokens.length === 0) return true;

      const bodySample = Array.isArray(article.content)
        ? article.content
            .map((b) => [b.text, b.question, b.answer, ...(b.items || [])].filter(Boolean).join(' '))
            .join(' ')
            .toLowerCase()
        : '';

      const haystack = [
        article.title,
        article.summary,
        article.categoryLabel,
        ...(article.tags || []),
        bodySample,
      ]
        .join(' ')
        .toLowerCase();

      return tokens.every((tok) => haystack.includes(tok));
    });

    return sortArticlesByDate(list, sortOrder);
  }, [publicArticles, selectedCategory, searchQuery, sortOrder]);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, searchQuery, sortOrder]);

  const totalPages = Math.max(1, Math.ceil(filteredArticles.length / ARTICLES_PER_PAGE));
  const safeCurrentPage = Math.min(currentPage, totalPages);

  const paginatedArticles = useMemo(() => {
    const start = (safeCurrentPage - 1) * ARTICLES_PER_PAGE;
    return filteredArticles.slice(start, start + ARTICLES_PER_PAGE);
  }, [filteredArticles, safeCurrentPage]);

  const handlePageChange = (newPage: number) => {
    const clamped = Math.max(1, Math.min(totalPages, newPage));
    setCurrentPage(clamped);
    const listEl = document.getElementById('blog-articles-grid');
    if (listEl) {
      listEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSelectCategory = (catId: string) => {
    setSelectedCategory(catId);
    const listEl = document.getElementById('blog-articles-grid');
    if (catId !== 'all' && listEl) {
      window.requestAnimationFrame(() => {
        listEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    }
  };

  const currentArticle = useMemo(() => {
    if (!selectedSlug) return null;
    return articles.find((a) => a.slug === selectedSlug) || null;
  }, [articles, selectedSlug]);

  const currentAuthorProfile = useMemo(() => {
    if (!currentArticle) return null;
    return getAuthorProfile(currentArticle.author);
  }, [currentArticle]);

  // Dynamic SEO head & JSON-LD synchronization
  useEffect(() => {
    let jsonLdScript = document.getElementById('article-jsonld') as HTMLScriptElement | null;
    const canonicalLink = document.querySelector('link[rel="canonical"]');

    const setMetaTag = (
      selector: string,
      attr: string,
      value: string,
      createAttr?: { key: string; val: string }
    ) => {
      let el = document.querySelector(selector);
      if (!el && createAttr) {
        el = document.createElement('meta');
        el.setAttribute(createAttr.key, createAttr.val);
        document.head.appendChild(el);
      }
      if (el) {
        el.setAttribute(attr, value);
      }
    };

    if (currentArticle) {
      const pageTitle = `${currentArticle.title}｜飛田ガールズ`;
      document.title = pageTitle;
      const articleUrl = `https://tobitashinchi-recruit.com/blog/${currentArticle.slug}`;

      const robotsContent = currentArticle.seoNoindex
        ? 'noindex, follow'
        : 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1';
      setMetaTag('meta[name="robots"]', 'content', robotsContent, { key: 'name', val: 'robots' });

      const imgFname = currentArticle.eyeCatch
        ? currentArticle.eyeCatch.split('/').pop()?.split('?')[0]
        : '';
      const fullImgUrl = currentArticle.eyeCatch
        ? currentArticle.eyeCatch.startsWith('http')
          ? currentArticle.eyeCatch
          : `https://tobitashinchi-recruit.com/images/${imgFname}`
        : `https://tobitashinchi-recruit.com${BLOG_HERO_IMAGE}`;

      setMetaTag('meta[name="description"]', 'content', currentArticle.summary, {
        key: 'name',
        val: 'description',
      });
      if (canonicalLink) {
        canonicalLink.setAttribute('href', articleUrl);
      }
      setMetaTag('meta[property="og:url"]', 'content', articleUrl, { key: 'property', val: 'og:url' });
      setMetaTag('meta[property="og:title"]', 'content', pageTitle, { key: 'property', val: 'og:title' });
      setMetaTag('meta[property="og:description"]', 'content', currentArticle.summary, {
        key: 'property',
        val: 'og:description',
      });
      setMetaTag('meta[property="og:type"]', 'content', 'article', { key: 'property', val: 'og:type' });
      setMetaTag('meta[property="og:image"]', 'content', fullImgUrl, { key: 'property', val: 'og:image' });
      setMetaTag('meta[property="og:image:alt"]', 'content', currentArticle.title, {
        key: 'property',
        val: 'og:image:alt',
      });

      setMetaTag('meta[name="twitter:card"]', 'content', 'summary_large_image', {
        key: 'name',
        val: 'twitter:card',
      });
      setMetaTag('meta[name="twitter:title"]', 'content', pageTitle, {
        key: 'name',
        val: 'twitter:title',
      });
      setMetaTag('meta[name="twitter:description"]', 'content', currentArticle.summary, {
        key: 'name',
        val: 'twitter:description',
      });
      setMetaTag('meta[name="twitter:image"]', 'content', fullImgUrl, {
        key: 'name',
        val: 'twitter:image',
      });
      setMetaTag('meta[name="twitter:image:alt"]', 'content', currentArticle.title, {
        key: 'name',
        val: 'twitter:image:alt',
      });

      if (!jsonLdScript) {
        jsonLdScript = document.createElement('script');
        jsonLdScript.id = 'article-jsonld';
        jsonLdScript.type = 'application/ld+json';
        document.head.appendChild(jsonLdScript);
      }

      const combinedTextForGraph = [
        currentArticle.title,
        currentArticle.summary,
        ...(currentArticle.tags || []),
        ...(Array.isArray(currentArticle.content)
          ? currentArticle.content.map((b) =>
              [b.text, b.question, b.answer, ...(b.items || [])].filter(Boolean).join(' ')
            )
          : []),
      ].join(' ');
      const glossaryMentions = buildGlossaryMentions(combinedTextForGraph);
      const articleCitations = buildArticleCitations(combinedTextForGraph);
      const wordCount = calculateArticleWordCount(currentArticle.summary, currentArticle.content);
      const personAuthor = resolveAuthorPersonNode(
        currentAuthorProfile?.name || currentArticle.author?.name,
        currentAuthorProfile?.role || currentArticle.author?.role,
        currentAuthorProfile?.bio
      );

      const datePublishedIso = currentArticle.publishedAt
        ? currentArticle.publishedAt.replace(/\./g, '-')
        : '2026-07-01';
      const dateModifiedIso = getEffectiveUpdatedDate(currentArticle).replace(/\./g, '-');

      const graphItems: Record<string, unknown>[] = [
        {
          '@type': 'BlogPosting',
          '@id': `${articleUrl}#article`,
          isPartOf: {
            '@type': 'WebSite',
            '@id': 'https://tobitashinchi-recruit.com/#website',
            name: '飛田ガールズ',
            url: 'https://tobitashinchi-recruit.com/',
          },
          headline: currentArticle.title,
          description: currentArticle.summary,
          image: fullImgUrl,
          wordCount,
          datePublished: datePublishedIso,
          dateModified: dateModifiedIso,
          articleSection: currentArticle.categoryLabel,
          keywords: (currentArticle.tags || []).join(', '),
          inLanguage: 'ja-JP',
          author: personAuthor,
          reviewedBy: {
            '@type': 'Organization',
            '@id': 'https://tobitashinchi-recruit.com/#organization',
            name: '飛田ガールズ 女性サポートスタッフ',
            url: 'https://tobitashinchi-recruit.com/about',
          },
          publisher: {
            '@type': 'Organization',
            '@id': 'https://tobitashinchi-recruit.com/#organization',
            name: '飛田ガールズ',
            url: 'https://tobitashinchi-recruit.com',
            logo: {
              '@type': 'ImageObject',
              url: 'https://tobitashinchi-recruit.com/icon.png',
            },
          },
          ...(glossaryMentions.length > 0
            ? { mentions: glossaryMentions, about: glossaryMentions.slice(0, 3) }
            : {}),
          citation: articleCitations,
          speakable: {
            '@type': 'SpeakableSpecification',
            cssSelector: ['h1', '.ai-direct-summary', '.summary'],
          },
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': articleUrl,
          },
        },
        {
          '@type': 'BreadcrumbList',
          '@id': `${articleUrl}#breadcrumb`,
          itemListElement: [
            {
              '@type': 'ListItem',
              position: 1,
              name: '飛田新地求人トップ',
              item: 'https://tobitashinchi-recruit.com/',
            },
            {
              '@type': 'ListItem',
              position: 2,
              name: '飛田新地のお仕事コラム',
              item: 'https://tobitashinchi-recruit.com/blog',
            },
            {
              '@type': 'ListItem',
              position: 3,
              name: currentArticle.title,
              item: articleUrl,
            },
          ],
        },
      ];

      const qnaBlocks = (currentArticle.content || []).filter(
        (b) => b.type === 'qna' && b.question && (b.answer || b.text)
      );
      if (qnaBlocks.length > 0) {
        graphItems.push({
          '@type': 'FAQPage',
          '@id': `${articleUrl}#faq`,
          mainEntity: qnaBlocks.map((q) => ({
            '@type': 'Question',
            name: q.question,
            acceptedAnswer: {
              '@type': 'Answer',
              text: q.answer || q.text || '',
            },
          })),
        });
      }

      jsonLdScript.textContent = JSON.stringify({
        '@context': 'https://schema.org',
        '@graph': graphItems,
      });
    } else if (selectedSlug) {
      document.title = 'お探しの記事が見つかりませんでした (404)｜飛田ガールズ';
      setMetaTag('meta[name="robots"]', 'content', 'noindex, nofollow', {
        key: 'name',
        val: 'robots',
      });
      if (canonicalLink) {
        canonicalLink.removeAttribute('href');
      }
      if (jsonLdScript) {
        jsonLdScript.remove();
      }
    } else {
      const defaultUrl = 'https://tobitashinchi-recruit.com/blog';
      const defaultImg = `https://tobitashinchi-recruit.com${BLOG_HERO_IMAGE}`;

      document.title = BLOG_INDEX_TITLE;
      setMetaTag(
        'meta[name="robots"]',
        'content',
        'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1',
        { key: 'name', val: 'robots' }
      );
      setMetaTag('meta[name="description"]', 'content', BLOG_INDEX_DESCRIPTION, {
        key: 'name',
        val: 'description',
      });
      if (canonicalLink) {
        canonicalLink.setAttribute('href', defaultUrl);
      }
      setMetaTag('meta[property="og:url"]', 'content', defaultUrl, { key: 'property', val: 'og:url' });
      setMetaTag('meta[property="og:title"]', 'content', BLOG_INDEX_TITLE, {
        key: 'property',
        val: 'og:title',
      });
      setMetaTag('meta[property="og:description"]', 'content', BLOG_INDEX_DESCRIPTION, {
        key: 'property',
        val: 'og:description',
      });
      setMetaTag('meta[property="og:image"]', 'content', defaultImg, {
        key: 'property',
        val: 'og:image',
      });
      setMetaTag('meta[property="og:type"]', 'content', 'website', {
        key: 'property',
        val: 'og:type',
      });
      setMetaTag('meta[name="twitter:card"]', 'content', 'summary_large_image', {
        key: 'name',
        val: 'twitter:card',
      });
      setMetaTag('meta[name="twitter:title"]', 'content', BLOG_INDEX_TITLE, {
        key: 'name',
        val: 'twitter:title',
      });
      setMetaTag('meta[name="twitter:description"]', 'content', BLOG_INDEX_DESCRIPTION, {
        key: 'name',
        val: 'twitter:description',
      });
      setMetaTag('meta[name="twitter:image"]', 'content', defaultImg, {
        key: 'name',
        val: 'twitter:image',
      });

      if (jsonLdScript) {
        jsonLdScript.remove();
      }

      const sortedPublic = sortArticlesByDate(publicArticles, 'newest');
      updatePageJsonLd({
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'CollectionPage',
            '@id': 'https://tobitashinchi-recruit.com/blog#webpage',
            url: defaultUrl,
            name: BLOG_INDEX_TITLE,
            description: BLOG_INDEX_DESCRIPTION,
            dateModified: FAQ_LAST_UPDATED_ISO,
            inLanguage: 'ja-JP',
            isPartOf: {
              '@id': 'https://tobitashinchi-recruit.com/#website',
            },
            publisher: {
              '@id': 'https://tobitashinchi-recruit.com/#organization',
            },
            speakable: {
              '@type': 'SpeakableSpecification',
              cssSelector: ['h1', '#blog-hero-lead', '#blog-recommended'],
            },
          },
          {
            '@type': 'BreadcrumbList',
            '@id': 'https://tobitashinchi-recruit.com/blog#breadcrumb',
            itemListElement: [
              {
                '@type': 'ListItem',
                position: 1,
                name: 'トップページ',
                item: 'https://tobitashinchi-recruit.com/',
              },
              {
                '@type': 'ListItem',
                position: 2,
                name: '飛田新地のお仕事コラム',
                item: defaultUrl,
              },
            ],
          },
          {
            '@type': 'ItemList',
            '@id': 'https://tobitashinchi-recruit.com/blog#itemlist',
            name: '飛田新地のお仕事コラム一覧',
            numberOfItems: sortedPublic.length,
            itemListElement: sortedPublic.map((a, idx) => ({
              '@type': 'ListItem',
              position: idx + 1,
              name: a.title,
              url: `https://tobitashinchi-recruit.com/blog/${a.slug}`,
              description: a.summary || a.title,
            })),
          },
        ],
      });
    }
  }, [currentArticle, currentAuthorProfile, selectedSlug, publicArticles]);

  const handleBackToList = () => {
    onSelectSlug(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectArticle = (slug: string) => {
    onSelectSlug(slug);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleGoToRequirements = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onNavigatePath) {
      e.preventDefault();
      onNavigatePath('/requirements');
    }
  };

  // Smart Related Articles (same category + cross-category topical relevance + shared tags)
  const relatedArticles = useMemo(() => {
    if (!currentArticle) return [];
    const currentTags = new Set(currentArticle.tags || []);
    const relatedCats = new Set(RELATED_CATEGORY_MAP[currentArticle.category] || []);

    const candidates = publicArticles
      .filter((a) => a.slug !== currentArticle.slug)
      .map((article) => {
        let score = 0;
        if (article.category === currentArticle.category) score += 6;
        else if (relatedCats.has(article.category)) score += 3.5;

        if (article.tags) {
          for (const t of article.tags) {
            if (currentTags.has(t)) score += 2;
          }
        }
        const articleId = parseInt(article.id, 10) || 0;
        if (articleId >= 200) score += 1;
        return { article, score };
      });

    candidates.sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      return (parseInt(b.article.id, 10) || 0) - (parseInt(a.article.id, 10) || 0);
    });

    return candidates.slice(0, 3).map((c) => c.article);
  }, [publicArticles, currentArticle]);

  const handleCtaInArticle = (articleTitle: string) => {
    onInjectedScroll(`コラム「${articleTitle}」を読みました。求人について詳しく話を聞きたいです。`);
  };

  const renderFormattedText = (text: string) => {
    if (!text) return null;
    const regex = /\[([^\]]+)\]\(([^)]+)\)/g;
    const elements: React.ReactNode[] = [];
    let lastIndex = 0;
    let match: RegExpExecArray | null;

    while ((match = regex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        elements.push(text.substring(lastIndex, match.index));
      }
      const label = match[1];
      const url = match[2];
      if (url.startsWith('/blog/')) {
        const targetSlug = url.replace('/blog/', '');
        elements.push(
          <a
            key={match.index}
            href={url}
            onClick={(e) => {
              e.preventDefault();
              handleSelectArticle(targetSlug);
            }}
            className="text-[#9D3B5E] font-semibold underline decoration-[#D64572]/40 underline-offset-4 hover:text-[#D64572] inline-flex items-center gap-0.5 cursor-pointer text-left"
          >
            <span>{label}</span>
            <ChevronRight size={14} className="inline-block shrink-0" />
          </a>
        );
      } else if (url.startsWith('/')) {
        elements.push(
          <a
            key={match.index}
            href={url}
            onClick={(e) => {
              if (onNavigatePath) {
                e.preventDefault();
                onNavigatePath(url);
              }
            }}
            className="text-[#9D3B5E] font-semibold underline decoration-[#D64572]/40 underline-offset-4 hover:text-[#D64572]"
          >
            {label}
          </a>
        );
      } else if (url.startsWith('#')) {
        elements.push(
          <button
            key={match.index}
            type="button"
            onClick={(e) => {
              e.preventDefault();
              const el = document.getElementById(url.substring(1));
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="text-[#9D3B5E] font-semibold underline decoration-[#D64572]/40 underline-offset-4 hover:text-[#D64572] cursor-pointer"
          >
            {label}
          </button>
        );
      } else {
        elements.push(
          <a
            key={match.index}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#9D3B5E] font-semibold underline decoration-[#D64572]/40 underline-offset-4 hover:text-[#D64572]"
          >
            {label}
          </a>
        );
      }
      lastIndex = regex.lastIndex;
    }

    if (lastIndex < text.length) {
      elements.push(text.substring(lastIndex));
    }

    return elements;
  };

  const showRecommendedSection =
    selectedCategory === 'all' && searchQuery.trim() === '' && safeCurrentPage === 1 && recommendedArticles.length > 0;

  return (
    <div className="bg-white min-h-screen">
      {!selectedSlug ? (
        /* ==========================================
           1. ARTICLE LIST VIEW (/blog)
           ========================================== */
        <div id="blog-list" className="pb-20">
          {/* Compact First View Hero */}
          <section className="bg-[#FFF9FA] border-b border-[#EFE0E5]">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-8 sm:pt-8 sm:pb-10">
              {/* Breadcrumb */}
              <nav
                aria-label="パンくずリスト"
                className="mb-5 flex flex-wrap items-center gap-2 text-xs text-[#5E4D53]"
              >
                <a
                  href="/"
                  onClick={(e) => {
                    if (onNavigateHome) {
                      e.preventDefault();
                      onNavigateHome();
                    }
                  }}
                  className="hover:text-[#D64572] underline decoration-[#EFE0E5] underline-offset-2 transition-colors"
                >
                  飛田ガールズ トップ
                </a>
                <span aria-hidden="true">/</span>
                <span className="text-[#2B2326] font-semibold">飛田新地のお仕事コラム</span>
              </nav>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center">
                <div className="lg:col-span-7">
                  <h1 className="text-2xl sm:text-3xl lg:text-[2.25rem] font-bold tracking-tight text-[#2B2326] leading-[1.3] text-balance">
                    飛田新地のお仕事コラム
                  </h1>
                  <p className="mt-2.5 text-base sm:text-lg font-semibold text-[#9D3B5E] leading-snug">
                    働く前に知りたいことも、働き始めてから役立つことも。
                  </p>
                  <div
                    id="blog-hero-lead"
                    className="mt-4 space-y-2.5 text-sm sm:text-[15px] text-[#5E4D53] leading-[1.75] max-w-2xl"
                  >
                    <p>
                      飛田新地でのお仕事を考えている女性に向けて、仕事内容・給料・待遇・採用基準・未経験からの始め方・面接や体験入店・寮生活・身バレ対策など、気になる情報を分かりやすくまとめています。
                    </p>
                    <p>
                      初めての方も、経験のある方も、自分に合った記事からご覧ください。
                    </p>
                  </div>
                </div>

                <div className="lg:col-span-5">
                  <div className="aspect-[16/10] w-full rounded-2xl overflow-hidden border border-[#EFE0E5] bg-[#FFF0F4]">
                    {heroImgFailed ? (
                      <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-[#FFF0F4] to-[#FAF4F6]">
                        <p className="text-sm font-bold text-[#9D3B5E]">飛田ガールズ 公式お仕事コラム</p>
                        <p className="text-xs text-[#5E4D53] mt-1">
                          仕事内容・給料・採用基準・サポート体制ガイド
                        </p>
                      </div>
                    ) : (
                      <img
                        src={BLOG_HERO_IMAGE}
                        alt="飛田新地のお仕事コラム｜飛田ガールズ公式ガイドイメージ"
                        className="w-full h-full object-cover"
                        loading="eager"
                        decoding="async"
                        referrerPolicy="no-referrer"
                        onError={() => setHeroImgFailed(true)}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </section>

          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-10">
            {/* Search & 22 Categories Directory */}
            <section
              aria-label="記事の検索とカテゴリ絞り込み"
              className="bg-[#FAF4F6]/80 rounded-2xl border border-[#EFE0E5] p-5 sm:p-7"
            >
              {/* Search Box */}
              <div>
                <label
                  htmlFor="blog-keyword-search"
                  className="block text-sm sm:text-[15px] font-bold text-[#2B2326] mb-2.5"
                >
                  知りたいキーワードから記事を探す
                </label>
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="relative flex-1">
                    <span
                      className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-[#5E4D53] pointer-events-none"
                      aria-hidden="true"
                    >
                      <Search size={18} />
                    </span>
                    <input
                      id="blog-keyword-search"
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="「未経験」「給料」「面接」「採用基準」「住民票」「身バレ」「寮」「仲居さん」など"
                      className="block w-full pl-10 pr-10 py-3 bg-white border border-[#EFE0E5] rounded-xl text-sm sm:text-[15px] text-[#2B2326] placeholder:text-[#5E4D53]/65 focus:outline-none focus:border-[#D64572] focus:ring-2 focus:ring-[#D64572]/15 transition-colors"
                    />
                    {searchQuery && (
                      <button
                        type="button"
                        onClick={() => setSearchQuery('')}
                        aria-label="検索キーワードをクリア"
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#5E4D53] hover:text-[#2B2326] cursor-pointer"
                      >
                        <X size={16} />
                      </button>
                    )}
                  </div>

                  {/* Sort Switcher */}
                  <div
                    className="inline-flex items-center bg-white p-1 rounded-xl border border-[#EFE0E5] shrink-0 self-start sm:self-stretch"
                    role="group"
                    aria-label="並び替え"
                  >
                    <button
                      type="button"
                      onClick={() => setSortOrder('newest')}
                      className={`px-3.5 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-colors whitespace-nowrap cursor-pointer ${
                        sortOrder === 'newest'
                          ? 'bg-[#D64572] text-white'
                          : 'text-[#5E4D53] hover:text-[#2B2326]'
                      }`}
                    >
                      新しい順
                    </button>
                    <button
                      type="button"
                      onClick={() => setSortOrder('oldest')}
                      className={`px-3.5 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-colors whitespace-nowrap cursor-pointer ${
                        sortOrder === 'oldest'
                          ? 'bg-[#D64572] text-white'
                          : 'text-[#5E4D53] hover:text-[#2B2326]'
                      }`}
                    >
                      古い順
                    </button>
                  </div>
                </div>

                {/* Quick keyword hints */}
                <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs text-[#5E4D53]">
                  <span className="font-medium shrink-0">よく検索される語句：</span>
                  {SEARCH_SUGGESTIONS.map((kw) => {
                    const isActive = searchQuery.trim() === kw;
                    return (
                      <button
                        key={kw}
                        type="button"
                        onClick={() => setSearchQuery(isActive ? '' : kw)}
                        className={`underline-offset-4 transition-colors cursor-pointer whitespace-nowrap py-1 ${
                          isActive
                            ? 'text-[#D64572] font-bold underline'
                            : 'text-[#5E4D53] hover:text-[#D64572] hover:underline'
                        }`}
                      >
                        {kw}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Divider */}
              <div className="my-6 border-t border-[#EFE0E5]" />

              {/* 22 Categories Filter */}
              <div>
                <div className="flex flex-wrap items-baseline justify-between gap-2 mb-3.5">
                  <h2 className="text-sm sm:text-[15px] font-bold text-[#2B2326]">
                    カテゴリから探す
                  </h2>
                  <p className="text-xs text-[#5E4D53] tabular-nums">
                    公開中 全{publicArticles.length}記事
                  </p>
                </div>

                <div
                  className="flex flex-wrap gap-2"
                  role="tablist"
                  aria-label="お仕事コラム カテゴリ一覧"
                >
                  {activeCategories.map((category) => {
                    const count = categoryCounts[category.id] || 0;
                    const isSelected = selectedCategory === category.id;
                    return (
                      <button
                        key={category.id}
                        type="button"
                        role="tab"
                        aria-selected={isSelected}
                        onClick={() => handleSelectCategory(category.id)}
                        className={`min-h-[40px] px-3.5 py-2 rounded-xl text-[13px] sm:text-sm font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer flex items-center gap-1.5 border ${
                          isSelected
                            ? 'bg-[#D64572] text-white border-[#D64572] font-semibold'
                            : 'bg-white text-[#2B2326] border-[#EFE0E5] hover:border-[#D64572]/50 hover:bg-[#FFF0F4]/60'
                        }`}
                      >
                        <span>{category.label}</span>
                        <span
                          className={`text-xs tabular-nums ${
                            isSelected ? 'text-white/90' : 'text-[#5E4D53]'
                          }`}
                        >
                          ({count})
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </section>

            {/* Recommended Articles (Shown cleanly on All / Page 1 without active search) */}
            {showRecommendedSection && (
              <section
                id="blog-recommended"
                aria-labelledby="recommended-heading"
                className="mt-10 sm:mt-12"
              >
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 mb-5">
                  <div>
                    <h2
                      id="recommended-heading"
                      className="text-xl sm:text-2xl font-bold text-[#2B2326] tracking-tight"
                    >
                      おすすめ記事
                    </h2>
                    <p className="mt-1 text-sm text-[#5E4D53]">
                      応募前に知っておきたい基本情報・ガイドをピックアップしています。
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
                  {recommendedArticles.map(({ article, shortLabel }) => (
                    <article
                      key={article.slug}
                      className="group bg-white rounded-2xl border border-[#EFE0E5] hover:border-[#D64572]/45 hover:shadow-sm transition-all duration-200 overflow-hidden flex flex-col"
                    >
                      <a
                        href={`/blog/${article.slug}`}
                        onClick={(e) => {
                          e.preventDefault();
                          handleSelectArticle(article.slug);
                        }}
                        className="flex flex-col h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D64572] rounded-2xl"
                      >
                        <div className="aspect-[16/10] w-full bg-[#FAF4F6] overflow-hidden shrink-0">
                          <ArticleCardImage
                            src={getValidArticleEyeCatch(article)}
                            alt={article.title}
                            category={article.category}
                            categoryLabel={article.categoryLabel}
                            className="w-full h-full"
                          />
                        </div>
                        <div className="p-4 flex flex-col flex-grow">
                          <div className="text-xs font-semibold text-[#9D3B5E]">
                            {article.categoryLabel}
                          </div>
                          <h3 className="mt-1.5 text-sm font-bold text-[#2B2326] leading-snug group-hover:text-[#D64572] transition-colors line-clamp-2">
                            {shortLabel}
                          </h3>
                          <p className="mt-1.5 text-xs text-[#5E4D53] leading-relaxed line-clamp-2 flex-grow">
                            {article.summary}
                          </p>
                        </div>
                      </a>
                    </article>
                  ))}
                </div>
              </section>
            )}

            {/* Main Articles Grid */}
            <section
              id="blog-articles-grid"
              aria-labelledby="articles-list-heading"
              className="mt-12 sm:mt-14 scroll-mt-24"
            >
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 pb-4 mb-6 border-b border-[#EFE0E5]">
                <div>
                  <h2
                    id="articles-list-heading"
                    className="text-xl sm:text-2xl font-bold text-[#2B2326] tracking-tight"
                  >
                    {selectedCategory === 'all'
                      ? searchQuery.trim()
                        ? `「${searchQuery.trim()}」の検索結果`
                        : '記事一覧'
                      : currentCategoryInfo.label}
                  </h2>
                  {selectedCategory !== 'all' && currentCategoryInfo.description && (
                    <p className="mt-1 text-sm text-[#5E4D53]">
                      {currentCategoryInfo.description}
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-3 text-sm text-[#5E4D53] tabular-nums shrink-0">
                  <span>
                    <strong className="text-[#2B2326] font-bold">{filteredArticles.length}</strong>件の記事
                    {totalPages > 1 && `（${safeCurrentPage} / ${totalPages}ページ）`}
                  </span>
                  {(selectedCategory !== 'all' || searchQuery.trim() !== '') && (
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedCategory('all');
                        setSearchQuery('');
                      }}
                      className="text-xs font-semibold text-[#9D3B5E] hover:text-[#D64572] underline underline-offset-4 cursor-pointer"
                    >
                      条件をリセット
                    </button>
                  )}
                </div>
              </div>

              {articles.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                  <div className="w-9 h-9 border-3 border-[#EFE0E5] border-t-[#D64572] rounded-full animate-spin mb-3" />
                  <p className="text-sm text-[#5E4D53]">記事を読み込んでいます...</p>
                </div>
              ) : filteredArticles.length > 0 ? (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7">
                    {paginatedArticles.map((article) => (
                      <article
                        key={article.id}
                        className="group bg-white rounded-2xl border border-[#EFE0E5] hover:border-[#D64572]/45 hover:shadow-md transition-all duration-200 overflow-hidden flex flex-col h-full"
                      >
                        <a
                          href={`/blog/${article.slug}`}
                          onClick={(e) => {
                            e.preventDefault();
                            handleSelectArticle(article.slug);
                          }}
                          className="flex flex-col h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D64572] rounded-2xl"
                        >
                          {/* Uniform 4:3 Thumbnail */}
                          <div className="aspect-[4/3] w-full bg-[#FAF4F6] overflow-hidden shrink-0">
                            <ArticleCardImage
                              src={getValidArticleEyeCatch(article)}
                              alt={article.title}
                              category={article.category}
                              categoryLabel={article.categoryLabel}
                              className="w-full h-full"
                            />
                          </div>

                          {/* Card Body */}
                          <div className="p-5 sm:p-6 flex flex-col flex-grow">
                            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-[#5E4D53] mb-2.5">
                              <span className="font-semibold text-[#9D3B5E]">
                                {article.categoryLabel}
                              </span>
                              <span aria-hidden="true">·</span>
                              <time
                                dateTime={(article.publishedAt || '').replace(/\./g, '-')}
                                className="tabular-nums"
                              >
                                {formatDateDisplay(article.publishedAt)}
                              </time>
                            </div>

                            <h3 className="text-[16px] sm:text-[17px] font-bold text-[#2B2326] leading-[1.45] group-hover:text-[#D64572] transition-colors line-clamp-2">
                              {article.title}
                            </h3>

                            <p className="mt-2.5 text-sm text-[#5E4D53] leading-[1.7] line-clamp-3 flex-grow">
                              {article.summary}
                            </p>

                            <div className="mt-4 pt-3.5 border-t border-[#FAF4F6] flex items-center justify-between text-xs font-semibold text-[#9D3B5E] group-hover:text-[#D64572] transition-colors">
                              <span>記事を読む</span>
                              <ChevronRight
                                size={15}
                                className="transition-transform duration-200 group-hover:translate-x-0.5"
                              />
                            </div>
                          </div>
                        </a>
                      </article>
                    ))}
                  </div>

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <nav
                      aria-label="ページネーション"
                      className="mt-12 flex flex-wrap items-center justify-center gap-2"
                    >
                      <button
                        type="button"
                        onClick={() => handlePageChange(safeCurrentPage - 1)}
                        disabled={safeCurrentPage === 1}
                        className="min-h-[42px] px-4 py-2 rounded-xl text-sm font-medium border border-[#EFE0E5] bg-white text-[#2B2326] hover:bg-[#FFF0F4] disabled:opacity-40 disabled:pointer-events-none transition-colors inline-flex items-center gap-1 cursor-pointer"
                      >
                        <ChevronLeft size={16} />
                        <span>前のページ</span>
                      </button>

                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                        if (
                          page === 1 ||
                          page === totalPages ||
                          (page >= safeCurrentPage - 1 && page <= safeCurrentPage + 1)
                        ) {
                          return (
                            <button
                              key={page}
                              type="button"
                              onClick={() => handlePageChange(page)}
                              aria-current={safeCurrentPage === page ? 'page' : undefined}
                              className={`min-w-[42px] h-[42px] px-3 rounded-xl text-sm font-semibold tabular-nums transition-colors cursor-pointer flex items-center justify-center ${
                                safeCurrentPage === page
                                  ? 'bg-[#D64572] text-white border border-[#D64572]'
                                  : 'bg-white border border-[#EFE0E5] text-[#2B2326] hover:bg-[#FFF0F4]'
                              }`}
                            >
                              {page}
                            </button>
                          );
                        }
                        if (page === safeCurrentPage - 2 || page === safeCurrentPage + 2) {
                          return (
                            <span
                              key={page}
                              className="px-1.5 text-sm text-[#5E4D53] select-none"
                              aria-hidden="true"
                            >
                              …
                            </span>
                          );
                        }
                        return null;
                      })}

                      <button
                        type="button"
                        onClick={() => handlePageChange(safeCurrentPage + 1)}
                        disabled={safeCurrentPage === totalPages}
                        className="min-h-[42px] px-4 py-2 rounded-xl text-sm font-medium border border-[#EFE0E5] bg-white text-[#2B2326] hover:bg-[#FFF0F4] disabled:opacity-40 disabled:pointer-events-none transition-colors inline-flex items-center gap-1 cursor-pointer"
                      >
                        <span>次のページ</span>
                        <ChevronRight size={16} />
                      </button>
                    </nav>
                  )}
                </>
              ) : (
                /* Empty search/filter state */
                <div className="text-center py-14 px-6 bg-[#FAF4F6]/60 rounded-2xl border border-[#EFE0E5]">
                  <Search size={32} className="mx-auto text-[#9D3B5E]/40 mb-3" />
                  <h3 className="text-base sm:text-lg font-bold text-[#2B2326]">
                    条件に一致する記事が見つかりませんでした
                  </h3>
                  <p className="text-sm text-[#5E4D53] mt-2 max-w-md mx-auto leading-relaxed">
                    別のキーワードで検索するか、カテゴリを「すべての記事」に戻してお試しください。
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedCategory('all');
                      setSearchQuery('');
                    }}
                    className="mt-5 inline-flex items-center justify-center px-5 py-2.5 bg-[#D64572] hover:bg-[#9D3B5E] text-white rounded-xl text-sm font-semibold transition-colors cursor-pointer"
                  >
                    すべての記事を表示する
                  </button>
                </div>
              )}
            </section>

            {/* Bottom Recruit CTA Section (Section 10 Exact Copy) */}
            <section
              aria-labelledby="blog-recruit-cta-heading"
              className="mt-16 sm:mt-20 bg-[#FFF9FA] rounded-2xl border border-[#EFE0E5] p-6 sm:p-10"
            >
              <div className="max-w-3xl mx-auto text-center">
                <h2
                  id="blog-recruit-cta-heading"
                  className="text-xl sm:text-2xl font-bold text-[#2B2326] tracking-tight"
                >
                  飛田新地でのお仕事を検討している方へ
                </h2>
                <p className="mt-3.5 text-sm sm:text-[15px] text-[#5E4D53] leading-[1.8]">
                  仕事内容や給料、待遇、採用基準、面接の流れなどを確認したい方は、飛田ガールズの募集要項もあわせてご覧ください。
                  <br className="hidden sm:inline" />
                  初めての方も、気になることがあれば応募前にお問い合わせいただけます。
                </p>

                <div className="mt-7 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3.5">
                  <a
                    href="/requirements"
                    onClick={handleGoToRequirements}
                    className="min-h-[48px] px-7 py-3.5 rounded-xl bg-[#D64572] hover:bg-[#9D3B5E] text-white font-bold text-sm sm:text-[15px] transition-colors inline-flex items-center justify-center gap-2 whitespace-nowrap"
                  >
                    <FileText size={17} />
                    <span>募集要項を見る</span>
                    <ArrowRight size={16} />
                  </a>

                  <button
                    type="button"
                    onClick={onCtaclick}
                    className="min-h-[48px] px-7 py-3.5 rounded-xl bg-white hover:bg-[#FFF0F4] text-[#2B2326] border border-[#D64572]/40 font-bold text-sm sm:text-[15px] transition-colors inline-flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer"
                  >
                    <MessageCircle size={17} className="text-[#06C755]" />
                    <span>LINEで相談・お問い合わせ</span>
                  </button>
                </div>

                <p className="mt-4 text-xs text-[#5E4D53]">
                  LINEメッセージ受付：24時間 ／ 女性スタッフ返信時間：10:00〜24:00（満20歳以上の女性対象・相談や見学のみも歓迎）
                </p>
              </div>
            </section>
          </div>
        </div>
      ) : isLoading ? (
        /* ==========================================
           LOADING STATE
           ========================================== */
        <div className="max-w-3xl mx-auto px-4 py-24 text-center">
          <div className="w-10 h-10 border-3 border-[#EFE0E5] border-t-[#D64572] rounded-full animate-spin mx-auto mb-4" />
          <p className="text-sm text-[#5E4D53]">記事を読み込んでいます...</p>
        </div>
      ) : !currentArticle ? (
        /* ==========================================
           NOT FOUND STATE
           ========================================== */
        <div className="max-w-md mx-auto px-4 py-20 text-center">
          <div className="bg-[#FFF9FA] border border-[#EFE0E5] rounded-2xl p-8">
            <h1 className="text-xl font-bold text-[#2B2326] mb-3">
              お探しの記事が見つかりませんでした
            </h1>
            <p className="text-sm text-[#5E4D53] leading-relaxed mb-6">
              指定された記事は移動したか、URLが変更された可能性があります。お仕事コラム一覧からお探しください。
            </p>
            <button
              type="button"
              onClick={handleBackToList}
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#D64572] hover:bg-[#9D3B5E] text-white font-semibold rounded-xl transition-colors cursor-pointer"
            >
              <ArrowLeft size={16} />
              お仕事コラム一覧に戻る
            </button>
          </div>
        </div>
      ) : (
        /* ==========================================
           2. ARTICLE DETAIL VIEW (/blog/:slug)
           ========================================== */
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-20 sm:pt-10">
          {/* Breadcrumb */}
          <nav
            aria-label="パンくずリスト"
            className="mb-5 flex flex-wrap items-center gap-2 text-xs text-[#5E4D53]"
          >
            <a
              href="/"
              onClick={(e) => {
                if (onNavigateHome) {
                  e.preventDefault();
                  onNavigateHome();
                }
              }}
              className="hover:text-[#D64572] underline decoration-[#EFE0E5] underline-offset-2 transition-colors"
            >
              飛田ガールズ トップ
            </a>
            <span aria-hidden="true">/</span>
            <a
              href="/blog"
              onClick={(e) => {
                e.preventDefault();
                handleBackToList();
              }}
              className="hover:text-[#D64572] underline decoration-[#EFE0E5] underline-offset-2 transition-colors"
            >
              飛田新地のお仕事コラム
            </a>
            <span aria-hidden="true">/</span>
            <span className="text-[#2B2326] font-medium line-clamp-1">{currentArticle.title}</span>
          </nav>

          <button
            type="button"
            onClick={handleBackToList}
            className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-[#5E4D53] hover:text-[#D64572] transition-colors cursor-pointer"
          >
            <ArrowLeft size={16} />
            <span>お仕事コラム一覧へ戻る</span>
          </button>

          <article>
            {/* Article Header */}
            <header className="pb-6 border-b border-[#EFE0E5]">
              <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs sm:text-sm text-[#5E4D53] mb-3">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedCategory(currentArticle.category);
                    handleBackToList();
                  }}
                  className="font-semibold text-[#9D3B5E] hover:text-[#D64572] hover:underline underline-offset-4 cursor-pointer"
                >
                  {currentArticle.categoryLabel}
                </button>
                <span aria-hidden="true">·</span>
                <span className="tabular-nums">
                  公開 {formatDateDisplay(currentArticle.publishedAt)}
                </span>
                <span aria-hidden="true">·</span>
                <span className="tabular-nums">
                  更新 {getEffectiveUpdatedDate(currentArticle)}
                </span>
                {currentArticle.readTime && (
                  <>
                    <span aria-hidden="true">·</span>
                    <span className="tabular-nums">読了目安 {currentArticle.readTime}</span>
                  </>
                )}
              </div>

              <h1 className="text-2xl sm:text-3xl font-bold text-[#2B2326] leading-[1.4] tracking-tight text-balance">
                {currentArticle.title}
              </h1>
            </header>

            {/* Eyecatch */}
            <div className="mt-6 aspect-[16/10] sm:aspect-[16/9] w-full rounded-2xl overflow-hidden border border-[#EFE0E5] bg-[#FAF4F6]">
              <ArticleCardImage
                src={getValidArticleEyeCatch(currentArticle)}
                alt={currentArticle.title}
                category={currentArticle.category}
                categoryLabel={currentArticle.categoryLabel}
                className="w-full h-full"
                isDetailHero={true}
              />
            </div>

            {/* Lead Summary Box (AI Search Direct Answer) */}
            {currentArticle.summary && (
              <div className="mt-7 bg-[#FFF9FA] p-5 sm:p-6 rounded-2xl border border-[#EFE0E5]">
                <p className="text-xs font-bold text-[#9D3B5E] tracking-wide mb-2">
                  この記事の要点
                </p>
                <p className="ai-direct-summary summary text-sm sm:text-[15px] text-[#2B2326] leading-[1.8]">
                  {currentArticle.summary}
                </p>
              </div>
            )}

            {/* Article Body */}
            <div className="mt-8 space-y-5 text-[#2B2326] text-[15px] sm:text-base leading-[1.85] break-words">
              {(currentArticle.content || []).map((block, idx) => {
                switch (block.type) {
                  case 'p':
                    return (
                      <p key={idx} className="whitespace-pre-line text-[#2B2326]">
                        {renderFormattedText(block.text || '')}
                      </p>
                    );
                  case 'h2':
                    return (
                      <h2
                        key={idx}
                        className="text-xl sm:text-[22px] font-bold text-[#2B2326] leading-[1.45] pt-6 pb-2.5 border-b border-[#EFE0E5] text-balance"
                      >
                        {block.text}
                      </h2>
                    );
                  case 'h3':
                    return (
                      <h3
                        key={idx}
                        className="text-lg font-bold text-[#2B2326] leading-[1.5] pt-4 pb-1"
                      >
                        {block.text}
                      </h3>
                    );
                  case 'list':
                    return (
                      <ul
                        key={idx}
                        className="space-y-3 bg-[#FAF4F6]/80 p-5 sm:p-6 rounded-2xl border border-[#EFE0E5] my-6"
                      >
                        {block.items?.map((item, itemIdx) => (
                          <li
                            key={itemIdx}
                            className="flex items-start gap-3 text-sm sm:text-[15px] leading-[1.75]"
                          >
                            <span className="text-xs font-bold text-[#9D3B5E] tabular-nums pt-1 shrink-0">
                              {String(itemIdx + 1).padStart(2, '0')}.
                            </span>
                            <span className="text-[#2B2326]">{renderFormattedText(item)}</span>
                          </li>
                        ))}
                      </ul>
                    );
                  case 'qna':
                    return (
                      <div
                        key={idx}
                        className="bg-white rounded-2xl border border-[#EFE0E5] overflow-hidden my-6"
                      >
                        <div className="bg-[#FFF9FA] px-5 py-3.5 border-b border-[#EFE0E5] font-bold text-sm sm:text-[15px] text-[#2B2326]">
                          {block.question}
                        </div>
                        <div className="p-5 text-sm sm:text-[15px] text-[#5E4D53] leading-[1.8] whitespace-pre-line">
                          {renderFormattedText(block.answer || block.text || '')}
                        </div>
                      </div>
                    );
                  case 'cta':
                  default:
                    return null;
                }
              })}
            </div>

            {/* Author Box */}
            <aside className="mt-12 p-6 bg-[#FAF4F6]/70 rounded-2xl border border-[#EFE0E5]">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <AvatarDisplay
                  avatar={currentAuthorProfile?.avatar}
                  name={currentAuthorProfile?.name}
                  className="w-14 h-14 rounded-full shrink-0"
                />
                <div>
                  <p className="text-xs text-[#9D3B5E] font-semibold">
                    執筆・案内担当 · {currentAuthorProfile?.role || '料亭直営 女性サポートスタッフ'}
                  </p>
                  <p className="text-base font-bold text-[#2B2326] mt-0.5">
                    {currentAuthorProfile?.name || 'さくら'}
                  </p>
                  <p className="text-xs sm:text-sm text-[#5E4D53] leading-relaxed mt-1.5">
                    {currentAuthorProfile?.bio}
                  </p>
                </div>
              </div>
            </aside>

            {/* Tags & Back Link */}
            <div className="mt-8 pt-6 border-t border-[#EFE0E5] flex flex-col sm:flex-row justify-between gap-4 items-start sm:items-center">
              <div className="flex flex-wrap gap-x-3 gap-y-1.5 text-xs text-[#5E4D53]">
                {(currentArticle.tags || []).map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => {
                      setSelectedCategory('all');
                      setSearchQuery(tag);
                      handleBackToList();
                    }}
                    className="hover:text-[#D64572] hover:underline underline-offset-4 cursor-pointer"
                  >
                    #{tag}
                  </button>
                ))}
              </div>

              <button
                type="button"
                onClick={handleBackToList}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-white border border-[#EFE0E5] rounded-xl text-sm font-semibold text-[#2B2326] hover:bg-[#FFF0F4] transition-colors cursor-pointer shrink-0"
              >
                <ArrowLeft size={15} />
                <span>一覧に戻る</span>
              </button>
            </div>
          </article>

          {/* Related Articles (2–3 relevant articles) */}
          {relatedArticles.length > 0 && (
            <section
              aria-labelledby="related-articles-heading"
              className="mt-14 pt-10 border-t border-[#EFE0E5]"
            >
              <div className="flex items-end justify-between gap-4 mb-6">
                <h2
                  id="related-articles-heading"
                  className="text-xl font-bold text-[#2B2326]"
                >
                  あわせて読みたい関連記事
                </h2>
                <button
                  type="button"
                  onClick={handleBackToList}
                  className="text-xs sm:text-sm font-semibold text-[#9D3B5E] hover:text-[#D64572] inline-flex items-center gap-0.5 cursor-pointer shrink-0"
                >
                  <span>一覧を見る</span>
                  <ChevronRight size={15} />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                {relatedArticles.map((relArticle) => (
                  <article
                    key={relArticle.id}
                    className="group bg-white rounded-2xl border border-[#EFE0E5] hover:border-[#D64572]/45 hover:shadow-sm transition-all duration-200 overflow-hidden flex flex-col"
                  >
                    <a
                      href={`/blog/${relArticle.slug}`}
                      onClick={(e) => {
                        e.preventDefault();
                        handleSelectArticle(relArticle.slug);
                      }}
                      className="flex flex-col h-full"
                    >
                      <div className="aspect-[4/3] w-full bg-[#FAF4F6] overflow-hidden shrink-0">
                        <ArticleCardImage
                          src={getValidArticleEyeCatch(relArticle)}
                          alt={relArticle.title}
                          category={relArticle.category}
                          categoryLabel={relArticle.categoryLabel}
                          className="w-full h-full"
                        />
                      </div>
                      <div className="p-4 flex flex-col flex-grow">
                        <div className="text-xs font-semibold text-[#9D3B5E] mb-1.5">
                          {relArticle.categoryLabel}
                        </div>
                        <h3 className="text-sm font-bold text-[#2B2326] leading-snug group-hover:text-[#D64572] transition-colors line-clamp-2 flex-grow">
                          {relArticle.title}
                        </h3>
                        <p className="mt-2 text-xs text-[#5E4D53] tabular-nums">
                          {formatDateDisplay(relArticle.publishedAt)}
                        </p>
                      </div>
                    </a>
                  </article>
                ))}
              </div>
            </section>
          )}

          {/* Category Quick Navigation */}
          <section
            aria-label="カテゴリから他の記事を探す"
            className="mt-12 p-6 bg-[#FAF4F6]/80 rounded-2xl border border-[#EFE0E5]"
          >
            <h2 className="text-sm font-bold text-[#2B2326] mb-3.5">
              他のカテゴリから探す
            </h2>
            <div className="flex flex-wrap gap-2">
              {activeCategories.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => {
                    setSelectedCategory(cat.id);
                    handleBackToList();
                  }}
                  className={`min-h-[38px] px-3 py-1.5 rounded-xl text-xs font-medium transition-colors whitespace-nowrap cursor-pointer border ${
                    currentArticle.category === cat.id
                      ? 'bg-[#D64572] text-white border-[#D64572] font-semibold'
                      : 'bg-white text-[#2B2326] border-[#EFE0E5] hover:border-[#D64572]/50 hover:bg-[#FFF0F4]'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </section>

          {/* Bottom Recruit CTA */}
          <section className="mt-12 bg-[#FFF9FA] rounded-2xl border border-[#EFE0E5] p-6 sm:p-8 text-center">
            <h2 className="text-lg sm:text-xl font-bold text-[#2B2326]">
              飛田新地でのお仕事を検討している方へ
            </h2>
            <p className="mt-2.5 text-sm text-[#5E4D53] leading-relaxed max-w-xl mx-auto">
              仕事内容や給料、待遇、採用基準、面接の流れなどを確認したい方は、飛田ガールズの募集要項もあわせてご覧ください。応募前のご質問や見学のご相談も受け付けています。
            </p>
            <div className="mt-6 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3">
              <a
                href="/requirements"
                onClick={handleGoToRequirements}
                className="min-h-[46px] px-6 py-3 rounded-xl bg-[#D64572] hover:bg-[#9D3B5E] text-white font-bold text-sm transition-colors inline-flex items-center justify-center gap-2 whitespace-nowrap"
              >
                <FileText size={16} />
                <span>募集要項を見る</span>
              </a>
              <button
                type="button"
                onClick={() => handleCtaInArticle(currentArticle.title)}
                className="min-h-[46px] px-6 py-3 rounded-xl bg-white hover:bg-[#FFF0F4] text-[#2B2326] border border-[#D64572]/40 font-bold text-sm transition-colors inline-flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer"
              >
                <MessageCircle size={16} className="text-[#06C755]" />
                <span>LINEで相談・お問い合わせ</span>
              </button>
            </div>
            <p className="mt-3 text-xs text-[#5E4D53]">
              LINEメッセージ受付：24時間 ／ スタッフ返信：10:00〜24:00（
              <a
                href={OFFICIAL_LINE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-[#D64572]"
              >
                公式LINE窓口
              </a>
              ）
            </p>
          </section>
        </div>
      )}
    </div>
  );
}
