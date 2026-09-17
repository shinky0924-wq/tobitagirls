/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, lazy, Suspense } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Settings } from 'lucide-react';
import Header from './components/Header';
import Hero from './components/Hero';
import Concerns from './components/Concerns';
import Reasons from './components/Reasons';
import FAQ from './components/FAQ';
import Testimonials from './components/Testimonials';
import JobDetails from './components/JobDetails';
import Flow from './components/Flow';
import ConsultationForm from './components/ConsultationForm';
import Footer from './components/Footer';
import BlogSection from './components/BlogSection';
import RecruitHub from './components/RecruitHub';
import MobileStickyCta from './components/MobileStickyCta';
import AboutPage from './components/AboutPage';
import ComparisonPage from './components/ComparisonPage';
import FAQPage from './components/FAQPage';
import TopicClusterPage from './components/TopicClusterPage';
import { TOPIC_CLUSTERS } from './topicClusterData';
import { TARGET_JOB_CATEGORIES } from './compareData';
import LucideIcon from './components/LucideIcon';
import { getStoredArticles, BlogArticle, BLOG_ARTICLES, getValidArticleEyeCatch, mergeWithDefaultArticles } from './blogData';
import { getStoredSiteContent, SiteContent } from './siteContent';
import { getBlogArticlesFromFirestore, getSiteContentFromFirestore, saveBlogArticlesToFirestore, saveSiteContentToFirestore } from './firebase';

const AdminPanel = lazy(() => import('./components/AdminPanel'));

export default function App() {
  const [path, setPath] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.location.pathname + window.location.hash;
    }
    return '/';
  });

  useEffect(() => {
    const handlePopState = () => {
      setPath(window.location.pathname + window.location.hash);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const [pendingScrollTarget, setPendingScrollTarget] = useState<string | null>(null);

  const scrollToElementById = (sectionId: string) => {
    const cleanId = sectionId.startsWith('#') ? sectionId.substring(1) : sectionId;
    const target = document.getElementById(cleanId);
    if (target) {
      const offsetHeader = 70;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - offsetHeader;

      window.scrollTo({
        top: Math.max(0, offsetPosition),
        behavior: 'smooth'
      });
      return true;
    }
    return false;
  };

  const navigate = (newPath: string, skipScrollTop = false) => {
    if (typeof window !== 'undefined') {
      window.history.pushState({}, '', newPath);
      setPath(newPath);
      if (newPath.includes('#')) {
        const hash = newPath.split('#')[1];
        setTimeout(() => {
          scrollToElementById(hash);
        }, 120);
      } else if (!skipScrollTop) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  let currentTab: 'recruit' | 'blog' | 'admin' | 'about' | 'compare' | 'faq' | 'cluster' = 'recruit';
  let clusterTopic = 'job';
  let selectedSlug: string | null = null;
  let selectedCategorySlug: string | null = null;
  let selectedFaqCategory: string | null = null;

  const cleanPath = path.split('#')[0].split('?')[0];

  const clusterPathMap: Record<string, string> = {
    '/job': 'job',
    '/salary': 'salary',
    '/beginner': 'beginner',
    '/experienced': 'experienced',
    '/requirements': 'requirements',
    '/flow': 'flow',
    '/interview': 'flow',
    '/workstyle': 'workstyle',
    '/shops': 'shops',
    '/dorm': 'dorm',
    '/safety': 'safety',
  };

  if (cleanPath in clusterPathMap) {
    currentTab = 'cluster';
    clusterTopic = clusterPathMap[cleanPath];
  } else if (cleanPath.startsWith('/cluster/')) {
    currentTab = 'cluster';
    const sub = cleanPath.replace('/cluster/', '');
    clusterTopic = clusterPathMap[`/${sub}`] || sub || 'job';
  } else if (cleanPath === '/admin') {
    currentTab = 'admin';
  } else if (cleanPath === '/about' || cleanPath === '/company') {
    currentTab = 'about';
  } else if (
    cleanPath === '/compare' || 
    cleanPath === '/comparison' || 
    cleanPath.startsWith('/compare/') ||
    cleanPath.startsWith('/categories/') ||
    cleanPath.startsWith('/target-categories/') ||
    cleanPath.startsWith('/target-jobs/') ||
    cleanPath === '/target-jobs' ||
    cleanPath === '/target-categories' ||
    cleanPath === '/categories'
  ) {
    currentTab = 'compare';
    const match = cleanPath.match(/^\/(?:compare|categories|target-categories|target-jobs)\/([^/]+)/);
    if (match) {
      selectedCategorySlug = match[1];
    }
  } else if (cleanPath === '/faq' || cleanPath.startsWith('/faq/')) {
    currentTab = 'faq';
    const match = cleanPath.match(/^\/faq\/([^/?]+)/);
    if (match) {
      selectedFaqCategory = match[1];
    }
  } else if (cleanPath.startsWith('/blog')) {
    currentTab = 'blog';
    const match = cleanPath.match(/^\/blog\/([^/]+)/);
    if (match) {
      selectedSlug = match[1];
    }
  }

  // Parse query params for category selection in compare and faq
  try {
    const queryIdx = path.indexOf('?');
    const searchStr = queryIdx !== -1 ? path.substring(queryIdx) : (typeof window !== 'undefined' ? window.location.search : '');
    if (searchStr) {
      const sp = new URLSearchParams(searchStr);
      const cat = sp.get('category');
      if (cat) {
        if (currentTab === 'faq') {
          selectedFaqCategory = cat;
        } else {
          selectedCategorySlug = cat;
        }
      }
    }
  } catch {}

  const setCurrentTab = (tab: 'recruit' | 'blog' | 'admin' | 'about' | 'compare' | 'faq' | 'cluster') => {
    if (tab === 'recruit') {
      navigate('/');
    } else if (tab === 'compare') {
      navigate('/compare');
    } else if (tab === 'faq') {
      navigate('/faq');
    } else if (tab === 'blog') {
      navigate('/blog');
    } else if (tab === 'about') {
      navigate('/about');
    } else if (tab === 'admin') {
      navigate('/admin');
    }
  };

  // Soft 404 Resolution: Redirect legacy/deprecated slugs to their correct current equivalents
  useEffect(() => {
    const slugRedirectMap: Record<string, string> = {
      'tobitashinchi-physical-mental-care-guide': '/blog/tobitashinchi-stamina-mental-care-100k',
      'tobitashinchi-fake-job-scout-warning': '/blog/tobitashinchi-scout-fraud-avoidance-safe-recruitment',
      'tobitashinchi-daily-work-routine-guide': '/blog/tobitashinchi-daily-schedule-work-flow-detail',
    };
    if (selectedSlug && slugRedirectMap[selectedSlug]) {
      navigate(slugRedirectMap[selectedSlug], true);
    }
  }, [selectedSlug]);

  useEffect(() => {
    if (typeof document === 'undefined') return;

    let pageTitle = '【公式】飛田新地求人なら飛田ガールズ｜安心の料亭求人・高収入・身バレ完全防止';
    let pageDesc = '【飛田新地求人公式】未経験歓迎・高収入（日給5万〜10万円即日全額日払い）。仕事内容、給料システム、20代・未経験の応募条件、面接・体験入店の流れ、個室マンション寮完備。女性サポートスタッフによる無料相談受付中。';
    let canonicalUrl = 'https://tobitashinchi-recruit.com/';

    if (currentTab === 'cluster') {
      const topic = TOPIC_CLUSTERS[clusterTopic];
      if (topic) {
        pageTitle = topic.seoTitle;
        pageDesc = topic.metaDescription;
        canonicalUrl = `https://tobitashinchi-recruit.com${topic.path}`;
      }
    } else if (currentTab === 'compare') {
      if (selectedCategorySlug) {
        const cat = TARGET_JOB_CATEGORIES.find(c => c.slug === selectedCategorySlug);
        if (cat) {
          pageTitle = `${cat.title}｜飛田新地料亭直営公式 飛田ガールズ`;
          pageDesc = cat.summary;
          canonicalUrl = `https://tobitashinchi-recruit.com/compare/${cat.slug}`;
        } else {
          pageTitle = '飛田新地求人サイト比較＆目的別求人ガイド【2026年最新】｜未経験・高収入・Wワーク【公式】';
          pageDesc = '飛田新地料亭直営公式求人と街頭スカウト業者・一般求人サイトの4者徹底比較。安心の料亭直営で即日全額日払い・身バレ完全防止。';
          canonicalUrl = 'https://tobitashinchi-recruit.com/compare';
        }
      } else {
        pageTitle = '飛田新地求人サイト比較＆目的別求人ガイド【2026年最新】｜未経験・高収入・Wワーク【公式】';
        pageDesc = '飛田新地料亭直営公式求人と街頭スカウト業者・一般求人サイトの4者徹底比較。安心の料亭直営で即日全額日払い・身バレ完全防止。';
        canonicalUrl = 'https://tobitashinchi-recruit.com/compare';
      }
    } else if (currentTab === 'about') {
      pageTitle = '飛田ガールズについて｜運営者情報・監修体制・一次情報ポリシー【公式】';
      pageDesc = '飛田新地料理組合公認の老舗料亭直営公式求人「飛田ガールズ」の店舗情報、創業歴、運営体制、女性スタッフによるサポート方針、一次情報発信ポリシーをご紹介します。';
      canonicalUrl = 'https://tobitashinchi-recruit.com/about';
    } else if (currentTab === 'blog') {
      if (!selectedSlug) {
        pageTitle = '飛田新地お仕事コラム・給与・面接ガイド一覧｜飛田ガールズ【公式】';
        pageDesc = '飛田新地のお仕事、給料システム、面接・体入の流れ、寮生活、安全対策など、現場の女性スタッフによる役立つ最新コラム一覧。';
        canonicalUrl = 'https://tobitashinchi-recruit.com/blog';
      }
    } else if (currentTab === 'faq') {
      pageTitle = '飛田新地求人 FAQ（全119問・8大テーマ体系化）｜未経験・給料・身バレ・面接【公式】';
      pageDesc = '飛田新地求人のよくある質問と回答（全119問）。応募資格、面接、給料手渡し、個室寮、身バレ対策など、疑問や不安をテーマ別に完全解消。';
      canonicalUrl = selectedFaqCategory ? `https://tobitashinchi-recruit.com/faq/${selectedFaqCategory}` : 'https://tobitashinchi-recruit.com/faq';
    } else if (currentTab === 'recruit') {
      pageTitle = '【公式】飛田新地求人なら飛田ガールズ｜安心の料亭求人・高収入・身バレ完全防止';
      pageDesc = '【飛田新地求人公式】未経験歓迎・高収入（日給5万〜10万円即日全額日払い）。仕事内容、給料システム、20代・未経験の応募条件、面接・体験入店の流れ、個室マンション寮完備。女性サポートスタッフによる無料相談受付中。';
      canonicalUrl = 'https://tobitashinchi-recruit.com/';
    } else if (currentTab === 'admin') {
      pageTitle = '管理パネル｜飛田ガールズ';
    }

    // Only update if not on a blog detail page (BlogSection handles its own)
    if (currentTab !== 'blog' || !selectedSlug) {
      document.title = pageTitle;

      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) metaDesc.setAttribute('content', pageDesc);

      let canonicalLink = document.querySelector('link[rel="canonical"]');
      if (canonicalLink) {
        canonicalLink.setAttribute('href', canonicalUrl);
      } else {
        canonicalLink = document.createElement('link');
        canonicalLink.setAttribute('rel', 'canonical');
        canonicalLink.setAttribute('href', canonicalUrl);
        document.head.appendChild(canonicalLink);
      }

      const ogUrl = document.querySelector('meta[property="og:url"]');
      if (ogUrl) ogUrl.setAttribute('content', canonicalUrl);
      const ogTitle = document.querySelector('meta[property="og:title"]');
      if (ogTitle) ogTitle.setAttribute('content', pageTitle);
    }
  }, [currentTab, selectedSlug, clusterTopic, selectedCategorySlug, selectedFaqCategory]);

  const handleScrollToSection = (sectionId: string) => {
    const cleanId = sectionId.startsWith('#') ? sectionId.substring(1) : sectionId;
    if (cleanId === 'compare') {
      navigate('/compare');
      return;
    }
    if (currentTab !== 'recruit') {
      setPendingScrollTarget(cleanId);
      navigate('/', true); // Navigate to home without overriding scroll
    } else {
      scrollToElementById(cleanId);
    }
  };

  // Perform pending scroll whenever entering recruit tab or when target updates
  useEffect(() => {
    if (currentTab === 'recruit' && pendingScrollTarget) {
      const targetId = pendingScrollTarget;
      let attempts = 0;
      const maxAttempts = 25; // Check for up to 1.25s to account for AnimatePresence transition
      const interval = setInterval(() => {
        attempts++;
        const scrolled = scrollToElementById(targetId);
        if (scrolled || attempts >= maxAttempts) {
          clearInterval(interval);
          setPendingScrollTarget(null);
        }
      }, 50);

      return () => clearInterval(interval);
    }
  }, [currentTab, pendingScrollTarget]);

  const [injectedMessage, setInjectedMessage] = useState<string>('');
  const [blogArticles, setBlogArticles] = useState<BlogArticle[]>(() => getStoredArticles());
  const [siteContent, setSiteContent] = useState<SiteContent>(getStoredSiteContent());
  const [isAdminMode, setIsAdminMode] = useState(false);

  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      if (params.get('creator') === 'tobita' || params.get('admin') === 'true') {
        localStorage.setItem('show_admin_portal', 'true');
        setIsAdminMode(true);
      } else if (localStorage.getItem('show_admin_portal') === 'true') {
        setIsAdminMode(true);
      }
    } catch (e) {
      console.warn('localStorage or window.location not accessible', e);
    }
  }, []);

  const fetchArticles = async () => {
    try {
      // 1. Try to fetch from Firestore first
      const firestoreData = await getBlogArticlesFromFirestore();
      if (firestoreData && firestoreData.length > 0) {
        const { merged, hasChanges } = mergeWithDefaultArticles(firestoreData);
        setBlogArticles(merged);
        if (hasChanges) {
          saveBlogArticlesToFirestore(merged);
        }
        return;
      }

      // 2. Fallback to API if not in Firestore
      const res = await fetch('/api/cms/articles');
      if (res.ok) {
        const data = await res.json();
        const { merged } = mergeWithDefaultArticles(data);
        setBlogArticles(merged);
      } else {
        setBlogArticles(getStoredArticles());
      }
    } catch (e) {
      setBlogArticles(getStoredArticles());
    }
  };

  const fetchSiteContent = async () => {
    try {
      // 1. Try to fetch from Firestore first
      const firestoreData = await getSiteContentFromFirestore();
      if (firestoreData) {
        setSiteContent(firestoreData);
        return;
      }

      // 2. Fallback to API if not in Firestore
      const res = await fetch('/api/cms/site');
      if (res.ok) {
        const data = await res.json();
        setSiteContent(data);
      } else {
        setSiteContent(getStoredSiteContent());
      }
    } catch (e) {
      setSiteContent(getStoredSiteContent());
    }
  };

  useEffect(() => {
    fetchArticles();
    fetchSiteContent();
  }, []);

  const handleRefreshBlog = () => {
    fetchArticles();
  };

  const handleRefreshSiteContent = () => {
    fetchSiteContent();
  };

  const handleScrollToForm = () => {
    handleScrollToSection('consultation');
  };

  const handleInjectedScroll = (message: string) => {
    setInjectedMessage(message);
    handleScrollToSection('consultation');
  };

  const handleClearInjected = () => {
    setInjectedMessage('');
  };

  const handleScrollToSimulator = () => {
    handleScrollToSection('jobs');
  };

  return (
    <div className="min-h-screen bg-surface selection:bg-rose-100 selection:text-secondary flex flex-col font-sans antialiased text-[#1b1c1c]">
      {/* Navigation */}
      <Header 
        currentTab={currentTab}
        onChangeTab={setCurrentTab}
        onCtaclick={handleScrollToForm} 
        onScrollToSection={handleScrollToSection}
        onNavigateTopic={(tid) => {
          navigate(`/${tid}`);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        isAdminMode={isAdminMode}
      />

      {/* Main Layout Area */}
      <main className="flex-grow pt-16 overflow-x-hidden pb-20 md:pb-0">
        <AnimatePresence mode="wait">
          {currentTab === 'recruit' ? (
            /* ==========================================
               RECRUITING LANDING PAGE (TAB)
               ========================================== */
            <motion.div
              key="recruit-page"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
            >
              {/* Hero Section */}
              <Hero 
                content={siteContent.hero} 
                onCtaclick={handleScrollToForm} 
                onBlogClick={() => {
                  setCurrentTab('blog');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                articles={blogArticles}
                onArticleClick={(slug) => {
                  navigate(`/blog/${slug}`);
                }}
              />

              {/* Category Hub & Comprehensive Recruitment Architecture */}
              <div id="recruit-hub">
                <div id="hub">
                  <RecruitHub 
                    onScrollToSection={handleScrollToSection}
                    onNavigateToArticle={(slug) => {
                      navigate(`/blog/${slug}`);
                    }}
                    onNavigateToBlog={(category) => {
                      if (category && category !== 'all') {
                        navigate(`/blog?category=${category}`);
                      } else {
                        navigate('/blog');
                      }
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    onNavigateCompare={(catSlug) => {
                      if (catSlug) {
                        navigate(`/compare/${catSlug}`);
                      } else {
                        navigate('/compare');
                      }
                    }}
                    onNavigateTopic={(topicId) => {
                      navigate(`/${topicId}`);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    onNavigateFaq={() => {
                      navigate('/faq');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                  />
                </div>
              </div>

              {/* Reasons Section - 選ばれる6つの理由 */}
              <div id="reasons">
                <Reasons content={siteContent.reasons} />
              </div>

              {/* Testimonials Quote Cards - 女性のリアル体験談 */}
              <div id="voice">
                <Testimonials />
              </div>

              {/* Consolidated 募集要項 Section */}
              <div id="requirements">
                <JobDetails 
                  content={siteContent.jobs} 
                  onCtaclickWithData={handleInjectedScroll}
                  onNavigateRequirements={() => {
                    navigate('/requirements');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                />
              </div>

              {/* Onboarding steps list - お仕事までの流れ */}
              <div id="flow">
                <Flow content={siteContent.flow} />
              </div>

              {/* Action interactive consultation panel */}
              <div id="consultation">
                <ConsultationForm 
                  content={siteContent.consultation}
                  initialMessage={injectedMessage} 
                  onClearInitialMessage={handleClearInjected} 
                />
              </div>
            </motion.div>
          ) : currentTab === 'blog' ? (
            /* ==========================================
               INTEGRATED JOB BLOG & COLUMNS (TAB)
               ========================================== */
            <motion.div
              key="blog-page"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
            >
              <BlogSection 
                articles={blogArticles}
                selectedSlug={selectedSlug}
                initialCategory={selectedCategorySlug}
                onSelectSlug={(slug) => {
                  if (slug) {
                    navigate(`/blog/${slug}`);
                  } else {
                    navigate('/blog');
                  }
                }}
                onCtaclick={handleScrollToForm} 
                onInjectedScroll={handleInjectedScroll}
                onSimulatorClick={handleScrollToSimulator}
                onNavigateAbout={() => setCurrentTab('about')}
              />
            </motion.div>
          ) : currentTab === 'compare' ? (
            /* ==========================================
               SITE COMPARISON & TARGET-SPECIFIC JOBS (TAB)
               ========================================== */
            <motion.div
              key="compare-page"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
            >
              <ComparisonPage
                onNavigateHome={() => setCurrentTab('recruit')}
                onNavigateBlog={() => setCurrentTab('blog')}
                onCtaclick={handleScrollToForm}
                onInjectedScroll={handleInjectedScroll}
                initialCategorySlug={selectedCategorySlug}
                onSelectCategorySlug={(slug) => {
                  if (slug && slug !== 'all') {
                    navigate(`/compare/${slug}`);
                  } else {
                    navigate('/compare');
                  }
                }}
              />
            </motion.div>
          ) : currentTab === 'about' ? (
            /* ==========================================
               ABOUT & OPERATION CREDIBILITY (TAB)
               ========================================== */
            <motion.div
              key="about-page"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
            >
              <AboutPage
                onNavigateHome={() => setCurrentTab('recruit')}
                onNavigateBlog={() => setCurrentTab('blog')}
                onCtaclick={handleScrollToForm}
              />
            </motion.div>
          ) : currentTab === 'faq' ? (
            /* ==========================================
               DEDICATED FAQ PAGE (8 THEMES, 119 QUESTIONS)
               ========================================== */
            <motion.div
              key="faq-page"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
            >
              <FAQPage
                initialCategory={selectedFaqCategory}
                onNavigateHome={() => {
                  navigate('/');
                }}
                onCtaclick={handleScrollToForm}
              />
            </motion.div>
          ) : currentTab === 'cluster' ? (
            /* ==========================================
               TOPIC CLUSTER DEDICATED SPOKE PAGE (SEO & LLMO)
               ========================================== */
            <motion.div
              key={`cluster-${clusterTopic}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
            >
              <TopicClusterPage
                topicId={clusterTopic}
                onNavigateHome={() => {
                  navigate('/');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                onNavigateTopic={(tid) => {
                  navigate(`/${tid}`);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                onNavigateBlog={(slug) => {
                  if (slug) {
                    navigate(`/blog/${slug}`);
                  } else {
                    navigate('/blog');
                  }
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                onNavigateFaq={() => {
                  navigate('/faq');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                onCtaclick={handleScrollToForm}
                onInjectedScroll={handleInjectedScroll}
              />
            </motion.div>
          ) : (
            /* ==========================================
               CMS ADMIN PANEL (TAB)
               ========================================== */
            <motion.div
              key="admin-page"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
            >
              <Suspense fallback={
                <div className="min-h-[60vh] flex flex-col items-center justify-center text-on-surface-variant gap-3">
                  <div className="w-8 h-8 border-3 border-secondary/30 border-t-secondary rounded-full animate-spin" />
                  <p className="text-sm font-sans">管理パネルを読み込み中...</p>
                </div>
              }>
                <AdminPanel 
                  onClose={() => setCurrentTab('blog')}
                  onRefreshBlog={handleRefreshBlog}
                  onRefreshSite={handleRefreshSiteContent}
                />
              </Suspense>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer component */}
      <Footer 
        currentTab={currentTab}
        onChangeTab={(tab) => setCurrentTab(tab)}
        onNavigateCompare={(slug) => {
          if (slug && slug !== 'all') {
            navigate(`/compare/${slug}`);
          } else {
            navigate('/compare');
          }
        }}
        onNavigateTopic={(tid) => {
          navigate(`/${tid}`);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onScrollToSection={handleScrollToSection}
        onOpenAdmin={() => { setCurrentTab('admin'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} 
        isAdminMode={isAdminMode}
      />

      {/* Mobile Sticky Floating CTA Bar (Thumb-zone optimization for smartphone users) */}
      {currentTab !== 'admin' && (
        <MobileStickyCta onScrollToForm={handleScrollToForm} />
      )}

    </div>
  );
}
