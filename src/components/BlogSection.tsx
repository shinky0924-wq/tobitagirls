import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BLOG_CATEGORIES, BlogArticle, getValidArticleEyeCatch, getAuthorProfile } from '../blogData';
import { ArticleCardImage } from './ArticleCardImage';
import { BookOpen, Calendar, Clock, Search, ArrowLeft, Tag, MessageCircle, ChevronRight, ChevronLeft, Sparkles, Send, ShieldCheck, HeartHandshake, CheckCircle2 } from 'lucide-react';

function AvatarDisplay({
  avatar,
  name,
  className = 'w-8 h-8 rounded-full',
  textClassName = 'text-sm',
}: {
  avatar?: string;
  name?: string;
  className?: string;
  textClassName?: string;
}) {
  const isImage = avatar && (
    avatar.startsWith('/') ||
    avatar.startsWith('http') ||
    avatar.includes('.jpg') ||
    avatar.includes('.png') ||
    avatar.includes('.webp') ||
    avatar.includes('.svg')
  );

  if (isImage) {
    return (
      <img
        src={avatar}
        alt={name || '監修スタッフ'}
        className={`${className} object-cover border border-rose-100 bg-rose-50`}
        loading="lazy"
        decoding="async"
        referrerPolicy="no-referrer"
        onError={(e) => {
          const target = e.currentTarget;
          target.style.display = 'none';
          if (target.parentElement && !target.parentElement.querySelector('.avatar-fallback')) {
            const fallback = document.createElement('span');
            fallback.className = `avatar-fallback ${className} flex items-center justify-center bg-rose-50 border border-rose-100 ${textClassName}`;
            fallback.textContent = '👩‍💼';
            target.parentElement.appendChild(fallback);
          }
        }}
      />
    );
  }

  return (
    <span className={`${className} bg-rose-50 border border-rose-100 flex items-center justify-center ${textClassName}`}>
      {avatar || '👩‍💼'}
    </span>
  );
}

interface BlogSectionProps {
  articles: BlogArticle[];
  selectedSlug: string | null;
  onSelectSlug: (slug: string | null) => void;
  onCtaclick: () => void;
  onInjectedScroll: (message: string) => void;
  onSimulatorClick: () => void;
}

export default function BlogSection({ articles, selectedSlug, onSelectSlug, onCtaclick, onInjectedScroll, onSimulatorClick }: BlogSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<'newest' | 'id'>('newest');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const ARTICLES_PER_PAGE = 9;

  const isLoading = useMemo(() => {
    return !!selectedSlug && articles.length === 0;
  }, [selectedSlug, articles]);

  // Filter & Search & Sort articles
  const filteredArticles = useMemo(() => {
    const list = articles.filter((article) => {
      const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
      const matchesSearch = 
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });

    if (sortOrder === 'newest') {
      return [...list].sort((a, b) => {
        const idA = parseInt(a.id, 10) || 0;
        const idB = parseInt(b.id, 10) || 0;
        return idB - idA;
      });
    }

    return [...list].sort((a, b) => {
      const idA = parseInt(a.id, 10) || 0;
      const idB = parseInt(b.id, 10) || 0;
      return idA - idB;
    });
  }, [articles, selectedCategory, searchQuery, sortOrder]);

  // Reset page when filter or search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, searchQuery, sortOrder]);

  const totalPages = Math.max(1, Math.ceil(filteredArticles.length / ARTICLES_PER_PAGE));
  const paginatedArticles = useMemo(() => {
    const start = (currentPage - 1) * ARTICLES_PER_PAGE;
    return filteredArticles.slice(start, start + ARTICLES_PER_PAGE);
  }, [filteredArticles, currentPage, ARTICLES_PER_PAGE]);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    const listEl = document.getElementById('blog-list');
    if (listEl) {
      listEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const currentArticle = useMemo(() => {
    if (!selectedSlug) return null;
    return articles.find(a => a.slug === selectedSlug) || null;
  }, [articles, selectedSlug]);

  const currentAuthorProfile = useMemo(() => {
    if (!currentArticle) return null;
    return getAuthorProfile(currentArticle.author);
  }, [currentArticle]);

  // Dynamically update document title, description, canonical and JSON-LD for SEO based on the active article
  useEffect(() => {
    let jsonLdScript = document.getElementById('article-jsonld') as HTMLScriptElement | null;
    const canonicalLink = document.querySelector('link[rel="canonical"]');
    const ogUrl = document.querySelector('meta[property="og:url"]');
    const ogTitle = document.querySelector('meta[property="og:title"]');
    const ogDesc = document.querySelector('meta[property="og:description"]');
    const ogImage = document.querySelector('meta[property="og:image"]');

    if (currentArticle) {
      const pageTitle = `${currentArticle.title} | 飛田ガールズ お仕事コラム`;
      document.title = pageTitle;
      const articleUrl = `https://tobitashinchi-recruit.com/blog/${currentArticle.slug}`;

      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute('content', currentArticle.summary);
      }
      if (canonicalLink) {
        canonicalLink.setAttribute('href', articleUrl);
      }
      if (ogUrl) ogUrl.setAttribute('content', articleUrl);
      if (ogTitle) ogTitle.setAttribute('content', pageTitle);
      if (ogDesc) ogDesc.setAttribute('content', currentArticle.summary);
      if (ogImage && currentArticle.eyeCatch) {
        const fullImg = currentArticle.eyeCatch.startsWith('http') ? currentArticle.eyeCatch : `https://tobitashinchi-recruit.com${currentArticle.eyeCatch}`;
        ogImage.setAttribute('content', fullImg);
      }

      // Add or update comprehensive JSON-LD (Article + BreadcrumbList + FAQPage for SEO & LLMs)
      if (!jsonLdScript) {
        jsonLdScript = document.createElement('script');
        jsonLdScript.id = 'article-jsonld';
        jsonLdScript.type = 'application/ld+json';
        document.head.appendChild(jsonLdScript);
      }

      const fullImgUrl = currentArticle.eyeCatch
        ? (currentArticle.eyeCatch.startsWith('http') ? currentArticle.eyeCatch : `https://tobitashinchi-recruit.com${currentArticle.eyeCatch}`)
        : 'https://tobitashinchi-recruit.com/images/col_beginner_guide_art_1787803245812.jpg';

      const graphItems: any[] = [
        {
          "@type": "BlogPosting",
          "@id": `${articleUrl}#article`,
          "isPartOf": {
            "@type": "WebSite",
            "@id": "https://tobitashinchi-recruit.com/#website",
            "name": "飛田ガールズ",
            "url": "https://tobitashinchi-recruit.com/"
          },
          "headline": currentArticle.title,
          "description": currentArticle.summary,
          "image": fullImgUrl,
          "datePublished": currentArticle.publishedAt ? currentArticle.publishedAt.replace(/\./g, '-') : '2026-07-01',
          "dateModified": "2026-08-30",
          "articleSection": currentArticle.categoryLabel,
          "keywords": (currentArticle.tags || []).join(', '),
          "inLanguage": "ja-JP",
          "author": {
            "@type": "Person",
            "name": currentAuthorProfile?.name || currentArticle.author?.name || "さくら",
            "jobTitle": currentAuthorProfile?.role || currentArticle.author?.role || "女性サポートスタッフ",
            "description": currentAuthorProfile?.bio || undefined
          },
          "publisher": {
            "@type": "Organization",
            "name": "飛田ガールズ",
            "url": "https://tobitashinchi-recruit.com",
            "logo": {
              "@type": "ImageObject",
              "url": "https://tobitashinchi-recruit.com/favicon.svg"
            }
          },
          "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": articleUrl
          }
        },
        {
          "@type": "BreadcrumbList",
          "@id": `${articleUrl}#breadcrumb`,
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "トップ",
              "item": "https://tobitashinchi-recruit.com/"
            },
            {
              "@type": "ListItem",
              "position": 2,
              "name": "お仕事コラム",
              "item": "https://tobitashinchi-recruit.com/blog"
            },
            {
              "@type": "ListItem",
              "position": 3,
              "name": currentArticle.title,
              "item": articleUrl
            }
          ]
        }
      ];

      // Extract Q&A blocks to generate FAQPage Schema for Google Rich Snippets and LLMO
      const qnaBlocks = (currentArticle.content || []).filter(b => b.type === 'qna' && b.question && (b.answer || b.text));
      if (qnaBlocks.length > 0) {
        graphItems.push({
          "@type": "FAQPage",
          "@id": `${articleUrl}#faq`,
          "mainEntity": qnaBlocks.map(q => ({
            "@type": "Question",
            "name": q.question,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": q.answer || q.text || ""
            }
          }))
        });
      }

      const fullStructuredData = {
        "@context": "https://schema.org",
        "@graph": graphItems
      };
      jsonLdScript.textContent = JSON.stringify(fullStructuredData);

    } else {
      document.title = '飛田新地求人、飛田新地バイトなら【飛田ガールズ】女の子のためのサイト・高収入募集';
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute('content', '【飛田新地求人の公式窓口】飛田新地で女の子の求人・お仕事探しなら「飛田ガールズ」。未経験から高収入（日給3万〜8万円）を稼げる優良店・安心安全なお店のみを厳選してご紹介します。24時間いつでもお気軽にご相談・ご応募いただけます。');
      }
      if (canonicalLink) {
        canonicalLink.setAttribute('href', selectedSlug ? `https://tobitashinchi-recruit.com/blog` : 'https://tobitashinchi-recruit.com/');
      }
      if (jsonLdScript) {
        jsonLdScript.remove();
      }
    }
  }, [currentArticle, selectedSlug]);

  // Back to article list
  const handleBackToList = () => {
    onSelectSlug(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectArticle = (slug: string) => {
    onSelectSlug(slug);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Smart Related Articles recommendation (based on category, tags overlap, and recency)
  const relatedArticles = useMemo(() => {
    if (!currentArticle) return [];
    const currentTags = new Set(currentArticle.tags || []);
    
    const candidates = articles
      .filter(a => a.slug !== currentArticle.slug)
      .map(article => {
        let score = 0;
        // Same category: +5 points
        if (article.category === currentArticle.category) {
          score += 5;
        }
        // Common tags: +2 points per matching tag
        if (article.tags) {
          for (const t of article.tags) {
            if (currentTags.has(t)) {
              score += 2;
            }
          }
        }
        // New article bonus (recent ID >= 98): +1.5 points
        const articleId = parseInt(article.id, 10) || 0;
        if (articleId >= 98) {
          score += 1.5;
        }
        return { article, score };
      });

    candidates.sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      const idA = parseInt(a.article.id, 10) || 0;
      const idB = parseInt(b.article.id, 10) || 0;
      return idB - idA;
    });

    return candidates.slice(0, 3).map(c => c.article);
  }, [articles, currentArticle]);

  const handleCtaInArticle = (articleTitle: string) => {
    onInjectedScroll(`コラム「${articleTitle}」を読みました。求人について詳しく話を聞きたいです！`);
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
          <button
            key={match.index}
            onClick={(e) => {
              e.preventDefault();
              handleSelectArticle(targetSlug);
            }}
            className="text-secondary font-bold hover:underline inline-flex items-center gap-0.5 cursor-pointer text-left"
          >
            <span>{label}</span>
            <ChevronRight size={14} className="inline-block shrink-0" />
          </button>
        );
      } else if (url.startsWith('#')) {
        elements.push(
          <button
            key={match.index}
            onClick={(e) => {
              e.preventDefault();
              const el = document.getElementById(url.substring(1));
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="text-secondary font-bold hover:underline inline-flex items-center gap-0.5 cursor-pointer"
          >
            <span>{label}</span>
          </button>
        );
      } else {
        elements.push(
          <a
            key={match.index}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-secondary font-bold hover:underline"
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

  // Helper for generating eye-catch gradient colors based on category
  const getCategoryGradient = (category: string) => {
    switch (category) {
      case 'beginner': return 'from-pink-400 to-rose-500';
      case 'salary': return 'from-amber-400 to-orange-500';
      case 'security': return 'from-violet-400 to-purple-600';
      case 'lifestyle': return 'from-teal-400 to-emerald-500';
      case 'onboarding': return 'from-cyan-400 to-blue-500';
      default: return 'from-pink-400 to-rose-500';
    }
  };

  const formatEyeCatchUrl = (url: string) => {
    if (!url) return '/images/col_beginner_guide_art_1787803245812.jpg';
    if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('data:')) return url;
    let clean = url.trim();
    if (clean.startsWith('/src/assets/images/')) {
      clean = clean.replace('/src/assets/images/', '/images/');
    } else if (clean.startsWith('src/assets/images/')) {
      clean = '/' + clean.replace('src/assets/images/', 'images/');
    } else if (clean.startsWith('/assets/images/')) {
      clean = clean.replace('/assets/images/', '/images/');
    } else if (clean.startsWith('assets/images/')) {
      clean = '/' + clean.replace('assets/images/', 'images/');
    } else if (!clean.startsWith('/')) {
      clean = '/images/' + clean;
    }
    return clean;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      <AnimatePresence mode="wait">
        {!selectedSlug ? (
          /* ==========================================
             1. ARTICLE LIST VIEW
             ========================================== */
          <motion.div
            key="list-view"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            id="blog-list"
          >
            {/* Header / Intro */}
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-rose-100 text-secondary mb-3">
                <BookOpen size={13} />
                お仕事コラム & ブログ
              </span>
              <h1 className="text-3xl md:text-4xl font-display font-bold tracking-tight text-[#2c1a1e]">
                安心してお仕事を始めるための<br />
                <span className="text-secondary relative inline-block">
                  完全解説ガイド
                  <span className="absolute left-0 bottom-1 w-full h-2 bg-pink-100 -z-10 rounded-full" />
                </span>
              </h1>
              <p className="mt-4 text-base text-on-surface-variant leading-relaxed">
                飛田新地での働き方、リアルな給与システム、身バレ防止の徹底的な対策、充実の個室寮や託児所補助など、気になるすべての情報を当店女性サポートスタッフが丁寧にお答えします。
              </p>
            </div>

            {/* Controls (Search & Category Filters) */}
            <div className="bg-surface-container rounded-3xl p-6 mb-10 shadow-sm border border-outline-variant">
              <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
                {/* Search Field */}
                <div className="relative w-full md:w-80">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-on-surface-variant">
                    <Search size={18} />
                  </span>
                  <input
                    type="text"
                    placeholder="キーワード、タグで検索..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="block w-full pl-10 pr-4 py-2.5 bg-white border border-outline-variant rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm text-on-surface transition-all placeholder:text-[#5e474c]/50"
                  />
                </div>

                {/* Sort & Info summary */}
                <div className="flex items-center gap-2 flex-wrap">
                  <div className="flex items-center bg-white p-1 rounded-2xl border border-outline-variant text-xs">
                    <button
                      onClick={() => setSortOrder('newest')}
                      className={`px-3 py-1.5 rounded-xl font-medium transition-all ${
                        sortOrder === 'newest'
                          ? 'bg-secondary text-white shadow-xs'
                          : 'text-on-surface-variant hover:text-on-surface'
                      }`}
                    >
                      ✨ 新着順
                    </button>
                    <button
                      onClick={() => setSortOrder('id')}
                      className={`px-3 py-1.5 rounded-xl font-medium transition-all ${
                        sortOrder === 'id'
                          ? 'bg-secondary text-white shadow-xs'
                          : 'text-on-surface-variant hover:text-on-surface'
                      }`}
                    >
                      📖 番号順
                    </button>
                  </div>
                  <div className="text-xs font-sans text-on-surface-variant bg-white px-3 py-2 rounded-2xl border border-outline-variant">
                    記事数: <span className="font-bold text-secondary font-mono">{filteredArticles.length}</span> / <span className="font-mono">{articles.length}</span>
                  </div>
                </div>
              </div>

              {/* Category Filter Chips */}
              <div className="flex flex-wrap gap-2 mt-5">
                {BLOG_CATEGORIES.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`px-4 py-2 rounded-2xl text-xs md:text-sm font-medium transition-all cursor-pointer ${
                      selectedCategory === category.id
                        ? 'bg-secondary text-white shadow-sm shadow-secondary/25 scale-102'
                        : 'bg-white hover:bg-rose-50 text-on-surface border border-outline-variant'
                    }`}
                  >
                    {category.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Articles Grid */}
            {filteredArticles.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {paginatedArticles.map((article, idx) => (
                    <motion.article
                      key={article.id}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.25, delay: Math.min(idx * 0.03, 0.3) }}
                      onClick={() => handleSelectArticle(article.slug)}
                      className="group flex flex-col bg-white rounded-3xl overflow-hidden border border-outline-variant shadow-sm hover:shadow-md hover:-translate-y-1 transition-all cursor-pointer relative"
                    >
                      {/* Eyecatch Image */}
                      <div className="relative h-48 bg-rose-50/50 flex items-center justify-center overflow-hidden">
                        <ArticleCardImage
                          src={getValidArticleEyeCatch(article)}
                          alt={article.title}
                          category={article.category}
                          categoryLabel={article.categoryLabel}
                          className="w-full h-full"
                        />
                        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-xs px-3 py-1 rounded-full text-xs font-semibold text-secondary shadow-xs z-10">
                          {article.categoryLabel}
                        </div>
                        {parseInt(article.id, 10) >= 98 && (
                          <div className="absolute top-4 right-4 bg-rose-600 text-white px-2.5 py-0.5 rounded-full text-[11px] font-bold shadow-md tracking-wider flex items-center gap-1 animate-pulse z-10">
                            <Sparkles size={11} /> NEW
                          </div>
                        )}
                      </div>

                      {/* Meta & Title */}
                      <div className="flex-grow p-6 flex flex-col">
                        <div className="flex items-center gap-4 text-xs text-on-surface-variant font-sans mb-3">
                          <span className="flex items-center gap-1">
                            <Calendar size={13} />
                            <span className="font-mono">{(article.publishedAt || '').replace(/-/g, '.')}</span>
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock size={13} />
                            読了<span className="font-mono">{article.readTime}</span>
                          </span>
                        </div>

                        <h3 className="text-lg font-bold text-[#2c1a1e] leading-snug group-hover:text-secondary transition-colors line-clamp-2">
                          {article.title}
                        </h3>

                        <p className="mt-3 text-sm text-on-surface-variant line-clamp-3 leading-relaxed">
                          {article.summary}
                        </p>

                        {/* Tags */}
                        <div className="mt-4 flex flex-wrap gap-1.5">
                          {article.tags?.map((tag) => (
                            <span key={tag} className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-md text-[10px] font-medium bg-rose-50 text-secondary border border-rose-100">
                              #{tag}
                            </span>
                          )) || null}
                        </div>

                        {/* Author */}
                        <div className="mt-6 pt-4 border-t border-rose-50 flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <AvatarDisplay
                              avatar={article.author?.avatar}
                              name={article.author?.name}
                              className="w-7 h-7 rounded-full shrink-0"
                              textClassName="text-sm"
                            />
                            <div>
                              <p className="text-xs font-semibold text-on-surface leading-none">{article.author?.name || 'スタッフ'}</p>
                              <p className="text-[10px] text-on-surface-variant mt-0.5 leading-none">{article.author?.role || 'サポートスタッフ'}</p>
                            </div>
                          </div>
                          <span className="text-secondary group-hover:translate-x-1 transition-transform">
                            <ChevronRight size={16} />
                          </span>
                        </div>
                      </div>
                    </motion.article>
                  ))}
                </div>

                {/* Pagination Controls */}
                {totalPages > 1 && (
                  <div className="mt-12 flex flex-wrap items-center justify-center gap-2">
                    <button
                      type="button"
                      onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                      disabled={currentPage === 1}
                      className="px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium border border-outline-variant bg-white text-on-surface hover:bg-rose-50 disabled:opacity-40 disabled:pointer-events-none transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      <ChevronLeft size={16} />
                      <span>前へ</span>
                    </button>

                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                      // Show first, last, current, and surrounding pages
                      if (
                        page === 1 ||
                        page === totalPages ||
                        (page >= currentPage - 1 && page <= currentPage + 1)
                      ) {
                        return (
                          <button
                            key={page}
                            type="button"
                            onClick={() => handlePageChange(page)}
                            className={`min-w-10 h-10 px-3 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center justify-center ${
                              currentPage === page
                                ? 'bg-secondary text-white shadow-sm shadow-secondary/30 scale-105'
                                : 'bg-white border border-outline-variant text-on-surface hover:bg-rose-50'
                            }`}
                          >
                            {page}
                          </button>
                        );
                      } else if (
                        page === currentPage - 2 ||
                        page === currentPage + 2
                      ) {
                        return (
                          <span key={page} className="px-1 text-on-surface-variant font-bold">
                            ...
                          </span>
                        );
                      }
                      return null;
                    })}

                    <button
                      type="button"
                      onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                      disabled={currentPage === totalPages}
                      className="px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium border border-outline-variant bg-white text-on-surface hover:bg-rose-50 disabled:opacity-40 disabled:pointer-events-none transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      <span>次へ</span>
                      <ChevronRight size={16} />
                    </button>
                  </div>
                )}
              </>
            ) : (
              /* Empty state */
              <div className="text-center py-16 bg-white rounded-3xl border border-dashed border-outline-variant">
                <Search size={40} className="mx-auto text-[#5e474c]/30 mb-3" />
                <h3 className="text-lg font-semibold text-on-surface">該当するコラムが見つかりませんでした</h3>
                <p className="text-sm text-on-surface-variant mt-1">別のキーワードやカテゴリーでお試しください。</p>
                <button
                  onClick={() => { setSelectedCategory('all'); setSearchQuery(''); }}
                  className="mt-4 inline-flex items-center gap-1.5 px-4 py-2 bg-secondary text-white rounded-2xl text-sm font-semibold cursor-pointer shadow-xs hover:bg-opacity-90"
                >
                  フィルターをクリア
                </button>
              </div>
            )}
          </motion.div>
        ) : isLoading ? (
          /* ==========================================
             LOADING STATE
             ========================================== */
          <motion.div
            key="loading-view"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center py-24 text-center"
          >
            <div className="w-12 h-12 border-4 border-rose-100 border-t-secondary rounded-full animate-spin mb-4" />
            <p className="text-on-surface-variant text-sm font-sans">コラムを読み込んでいます...</p>
          </motion.div>
        ) : !currentArticle ? (
          /* ==========================================
             NOT FOUND STATE
             ========================================== */
          <motion.div
            key="not-found-view"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="max-w-md mx-auto text-center py-16 px-6 bg-white border border-rose-100 rounded-3xl shadow-xl my-12"
          >
            <div className="w-16 h-16 bg-rose-50 text-secondary rounded-full flex items-center justify-center mx-auto mb-6">
              <Search size={32} />
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-[#2c1a1e] mb-3">コラムが見つかりませんでした</h2>
            <p className="text-on-surface-variant text-sm mb-8 leading-relaxed">
              お探しの記事は削除されたか、URLが変更された可能性があります。
            </p>
            <button
              onClick={handleBackToList}
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-secondary hover:bg-secondary/90 text-white font-bold rounded-2xl shadow-md transition-all cursor-pointer"
            >
              <ArrowLeft size={16} />
              コラム一覧に戻る
            </button>
          </motion.div>
        ) : (
          /* ==========================================
             2. ARTICLE DETAIL VIEW
             ========================================== */
          <motion.div
            key="detail-view"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="max-w-3xl mx-auto"
          >
            {/* Back Navigation */}
            <button
              onClick={handleBackToList}
              className="group mb-8 inline-flex items-center gap-2 text-sm font-medium text-on-surface hover:text-secondary transition-colors cursor-pointer py-2"
            >
              <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
              コラム一覧へ戻る
            </button>

            {/* Eyecatch hero */}
            <div className="h-56 md:h-72 rounded-4xl bg-rose-50/50 flex flex-col items-center justify-center relative overflow-hidden shadow-xs border border-outline-variant">
              <ArticleCardImage
                src={getValidArticleEyeCatch(currentArticle!)}
                alt={currentArticle!.title}
                category={currentArticle!.category}
                categoryLabel={currentArticle!.categoryLabel}
                className="w-full h-full"
                isDetailHero={true}
              />
              <div className="absolute top-6 left-6 bg-white/95 backdrop-blur-xs px-3.5 py-1.5 rounded-full text-xs font-bold text-secondary shadow-xs z-10">
                {currentArticle!.categoryLabel}
              </div>
            </div>

            {/* Article Header info */}
            <div className="mt-8 border-b border-rose-100 pb-6">
              <div className="flex items-center gap-4 text-xs font-sans text-on-surface-variant mb-4">
                <span className="flex items-center gap-1 bg-surface-container px-2.5 py-1 rounded-lg">
                  <Calendar size={13} />
                  <span className="font-mono">{(currentArticle!.publishedAt || '').replace(/-/g, '.')}</span>
                </span>
                <span className="flex items-center gap-1 bg-surface-container px-2.5 py-1 rounded-lg">
                  <Clock size={13} />
                  読了<span className="font-mono">{currentArticle!.readTime}</span>
                </span>
              </div>

              <h1 className="text-2xl md:text-3xl lg:text-4xl font-display font-bold leading-snug text-[#2c1a1e] tracking-tight">
                {currentArticle!.title}
              </h1>

              {/* Author & Editorial Credibility Card (E-E-A-T Guarantee) */}
              <div className="mt-6 p-5 bg-gradient-to-br from-rose-50/70 via-white to-pink-50/50 rounded-3xl border border-rose-200/80 shadow-2xs">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3.5">
                    <div className="relative shrink-0">
                      <AvatarDisplay
                        avatar={currentAuthorProfile?.avatar}
                        name={currentAuthorProfile?.name}
                        className="w-12 h-12 rounded-2xl shadow-xs"
                        textClassName="text-2xl"
                      />
                      <div className="absolute -bottom-1 -right-1 bg-secondary text-white p-1 rounded-full text-[9px] shadow-xs" title="女性スタッフ公認監修">
                        <CheckCircle2 size={10} />
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-bold text-secondary bg-rose-100/80 px-2 py-0.5 rounded-full">
                          {currentAuthorProfile?.badge || '記事監修・実務執筆'}
                        </span>
                        <span className="text-[11px] text-on-surface-variant font-medium">
                          一次情報保証
                        </span>
                      </div>
                      <div className="text-base font-bold text-[#2c1a1e] mt-0.5 flex items-center gap-1.5">
                        {currentAuthorProfile?.name || 'さくら'}
                        <span className="text-xs font-normal text-on-surface-variant">
                          （{currentAuthorProfile?.role || '女性サポートスタッフ・相談窓口歴8年'}）
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-[11px] text-rose-800 bg-white border border-rose-200 px-3 py-1.5 rounded-full font-medium flex items-center gap-1 shrink-0">
                    <ShieldCheck size={13} className="text-secondary" />
                    <span>{currentAuthorProfile?.experienceTag || '飛田新地 現場実務者レビュー済'}</span>
                  </div>
                </div>

                <div className="mt-3 pt-3 border-t border-rose-100/80 text-xs text-[#5e474c] leading-relaxed flex items-start gap-1.5">
                  <span className="text-secondary font-bold shrink-0">【執筆・監修者コメント】</span>
                  <span>
                    {currentAuthorProfile?.comment || '実際の料亭現場での採用基準、給与システム、女性の安全管理規約に基づいた事実のみを記載しています。'}
                  </span>
                </div>
              </div>
            </div>

            {/* Article Content Render */}
            <div className="mt-8 space-y-6 text-[#2c1a1e] text-base md:text-lg leading-relaxed font-sans break-words">
              {(currentArticle!.content || []).map((block, idx) => {
                switch (block.type) {
                  case 'p':
                    return (
                      <p key={idx} className="whitespace-pre-line text-on-surface leading-relaxed py-1">
                        {renderFormattedText(block.text || '')}
                      </p>
                    );
                  case 'h2':
                    return (
                      <h2 key={idx} className="text-xl md:text-2xl font-bold text-[#2c1a1e] mt-10 mb-4 pt-4 pb-2 border-b-2 border-secondary/20 flex items-center gap-2">
                        <span className="inline-block w-1.5 h-6 bg-secondary rounded-full" />
                        {block.text}
                      </h2>
                    );
                  case 'h3':
                    return (
                      <h3 key={idx} className="text-lg md:text-xl font-bold text-[#2c1a1e] mt-8 mb-3 bg-rose-50 px-4 py-2 rounded-xl border-l-4 border-secondary">
                        {block.text}
                      </h3>
                    );
                  case 'list':
                    return (
                      <ul key={idx} className="space-y-3 bg-surface-container-low p-6 rounded-3xl border border-outline-variant my-6">
                        {block.items?.map((item, itemIdx) => (
                          <li key={itemIdx} className="flex items-start gap-2.5 text-sm md:text-base">
                            <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-pink-100 text-secondary text-xs font-bold mt-0.5 shrink-0">
                              {itemIdx + 1}
                            </span>
                            <span className="text-on-surface-variant leading-relaxed">{renderFormattedText(item)}</span>
                          </li>
                        ))}
                      </ul>
                    );
                  case 'qna':
                    return (
                      <div key={idx} className="bg-white rounded-3xl border-2 border-secondary/20 overflow-hidden my-8 shadow-xs">
                        <div className="bg-gradient-to-r from-secondary to-pink-500 text-white px-5 py-3 font-bold flex items-center gap-2">
                          <ShieldCheck size={18} />
                          {block.question}
                        </div>
                        <div className="p-5 text-sm md:text-base text-on-surface-variant leading-relaxed bg-surface-container-low whitespace-pre-line">
                          {renderFormattedText(block.answer || block.text || '')}
                        </div>
                      </div>
                    );
                  case 'cta':
                    return null;
                  default:
                    return null;
                }
              })}
            </div>

            {/* Article Author Profile & E-E-A-T Editorial Board Footer */}
            <div className="mt-10 p-6 bg-surface-container-low rounded-3xl border border-outline-variant">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <AvatarDisplay
                  avatar={currentAuthorProfile?.avatar}
                  name={currentAuthorProfile?.name}
                  className="w-14 h-14 rounded-2xl shadow-xs shrink-0"
                  textClassName="text-3xl"
                />
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold text-secondary bg-rose-50 px-2 py-0.5 rounded-full border border-rose-100">
                      この記事を書いた人 / 監修
                    </span>
                    <span className="text-xs text-on-surface-variant font-medium">
                      {currentAuthorProfile?.role || '女性サポートスタッフ・相談窓口歴8年'}
                    </span>
                  </div>
                  <h4 className="text-base font-bold text-[#2c1a1e]">
                    {currentAuthorProfile?.name || 'さくら'}
                  </h4>
                  <p className="text-xs text-on-surface-variant leading-relaxed mt-1.5">
                    {currentAuthorProfile?.bio || '飛田新地での女性サポート歴8年。未経験者から出稼ぎ希望者まで、のべ1,000名以上の相談・面接案内を担当。給与システム、身バレ防止、衛生管理、生活支援に関する現場の最新情報を発信しています。'}
                  </p>
                </div>
              </div>
            </div>

            {/* Article Footer & Navigator */}
            <div className="mt-8 pt-6 border-t border-rose-100 flex flex-col md:flex-row justify-between gap-6 items-center">
              <div className="flex flex-wrap gap-2">
                {currentArticle!.tags.map((tag) => (
                  <span key={tag} className="inline-flex items-center gap-1 px-3 py-1 bg-surface-container rounded-full text-xs text-secondary font-medium border border-outline-variant">
                    <Tag size={12} />
                    {tag}
                  </span>
                ))}
              </div>

              <button
                onClick={handleBackToList}
                className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-white border border-outline-variant rounded-2xl text-sm font-bold text-on-surface hover:bg-rose-50 transition-all cursor-pointer"
              >
                <ArrowLeft size={15} />
                コラム一覧に戻る
              </button>
            </div>

            {/* Related Articles Section (Internal Links & LLMO/SEO enhancement) */}
            {relatedArticles.length > 0 && (
              <div className="mt-16 pt-10 border-t border-rose-100">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <div className="flex items-center gap-1.5 text-xs font-bold text-secondary tracking-wider uppercase mb-1">
                      <Sparkles size={14} />
                      あわせて読みたい関連コラム
                    </div>
                    <h3 className="text-xl md:text-2xl font-display font-bold text-[#2c1a1e]">
                      おすすめの関連記事
                    </h3>
                  </div>
                  <button
                    onClick={handleBackToList}
                    className="hidden sm:inline-flex items-center gap-1 text-xs font-semibold text-secondary hover:underline cursor-pointer"
                  >
                    コラム一覧を見る
                    <ChevronRight size={14} />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {relatedArticles.map((relArticle) => (
                    <article
                      key={relArticle.id}
                      onClick={() => handleSelectArticle(relArticle.slug)}
                      className="group flex flex-col bg-surface-container-low rounded-3xl overflow-hidden border border-outline-variant hover:border-secondary/30 hover:shadow-md hover:-translate-y-1 transition-all cursor-pointer"
                    >
                      <div className="relative h-36 bg-rose-50/50 flex items-center justify-center overflow-hidden">
                        <ArticleCardImage
                          src={getValidArticleEyeCatch(relArticle)}
                          alt={relArticle.title}
                          category={relArticle.category}
                          categoryLabel={relArticle.categoryLabel}
                          className="w-full h-full"
                        />
                        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-xs px-2.5 py-0.5 rounded-full text-[10px] font-bold text-secondary shadow-xs">
                          {relArticle.categoryLabel}
                        </div>
                        {parseInt(relArticle.id, 10) >= 98 && (
                          <div className="absolute top-3 right-3 bg-rose-600 text-white px-2 py-0.5 rounded-full text-[10px] font-bold shadow-xs flex items-center gap-0.5">
                            <Sparkles size={10} /> NEW
                          </div>
                        )}
                      </div>

                      <div className="p-4 flex flex-col flex-grow">
                        <div className="flex items-center gap-3 text-[11px] text-on-surface-variant font-sans mb-2">
                          <span className="flex items-center gap-1">
                            <Calendar size={11} />
                            <span className="font-mono">{(relArticle.publishedAt || '').replace(/-/g, '.')}</span>
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock size={11} />
                            読了<span className="font-mono">{relArticle.readTime}</span>
                          </span>
                        </div>

                        <h4 className="text-sm font-bold text-[#2c1a1e] leading-snug group-hover:text-secondary transition-colors line-clamp-2 mb-2">
                          {relArticle.title}
                        </h4>

                        <p className="text-xs text-on-surface-variant line-clamp-2 leading-relaxed flex-grow">
                          {relArticle.summary}
                        </p>

                        <div className="mt-4 pt-3 border-t border-rose-50/80 flex items-center justify-between text-xs font-semibold text-secondary">
                          <span>記事を読む</span>
                          <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            )}

            {/* Banner block */}
            <div className="mt-16 bg-[#2c1a1e] text-white rounded-4xl p-8 text-center relative overflow-hidden shadow-lg">
              <div className="absolute top-0 right-0 w-32 h-32 bg-secondary opacity-20 blur-3xl rounded-full" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-pink-500 opacity-25 blur-3xl rounded-full" />
              <h3 className="text-xl md:text-2xl font-bold tracking-tight mb-2">
                最短本日スタート！1日体験入店随時受付中
              </h3>
              <p className="text-xs md:text-sm text-pink-200/90 max-w-lg mx-auto leading-relaxed mb-6">
                体験入店は「面接＋見学＋1日お仕事＋その日にお給料全額手渡し」がすべて1日で完了する安心コースです。合わないと感じたらその場でやめても全然OK！
              </p>
              <div className="flex justify-center items-center">
                <button
                  onClick={() => handleCtaInArticle(currentArticle!.title)}
                  className="w-full sm:w-auto max-w-md bg-[#06c755] hover:bg-[#05b04b] text-white px-12 py-4 rounded-2xl font-bold text-base shadow-lg shadow-[#06c755]/20 transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <MessageCircle size={18} />
                  LINEでお問い合わせ
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
