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

  useEffect(() => {
    if (typeof document === 'undefined') return;
    if (currentTab === 'cluster') {
      const topic = TOPIC_CLUSTERS[clusterTopic];
      if (topic) {
        document.title = topic.seoTitle;
      }
    } else if (currentTab === 'compare') {
      document.title = '飛田新地求人サイト比較＆目的別求人ガイド【2026年最新】｜未経験・高収入・Wワーク【公式】';
    } else if (currentTab === 'about') {
      document.title = '飛田ガールズについて｜運営者情報・監修体制・一次情報ポリシー【公式】';
    } else if (currentTab === 'blog') {
      if (!selectedSlug) {
        document.title = '飛田新地お仕事コラム・給与・面接ガイド一覧｜飛田ガールズ【公式】';
      }
    } else if (currentTab === 'faq') {
      document.title = '飛田新地求人 FAQ（全119問・8大テーマ体系化）｜未経験・給料・身バレ・面接【公式】';
    } else if (currentTab === 'recruit') {
      document.title = '【公式】飛田新地求人なら飛田ガールズ｜安心の料亭求人・高収入・身バレ完全防止';
    } else if (currentTab === 'admin') {
      document.title = '管理パネル｜飛田ガールズ';
    }
  }, [currentTab, selectedSlug, clusterTopic]);

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

              {/* Primary Recruitment Specification & Guarantees Quick Summary */}
              <section className="py-12 bg-white border-y border-rose-100/80" id="requirements-summary">
                <div className="max-w-[1100px] mx-auto px-4 sm:px-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                    <div>
                      <span className="text-[10px] font-black bg-rose-100 text-rose-700 px-3 py-1 rounded-full uppercase tracking-wider">
                        PRIMARY RECRUITMENT SPECIFICATION
                      </span>
                      <h3 className="font-display font-black text-xl sm:text-2xl text-zinc-900 mt-1.5">
                        料亭直営 募集要項・待遇スペックサマリー
                      </h3>
                      <p className="text-xs text-zinc-500 mt-1">
                        料理組合公認の直営老舗料亭による現場一次情報（2026年最新基準）
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        navigate('/requirements');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="self-start md:self-auto bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold px-5 py-2.5 rounded-xl shadow-xs transition-all flex items-center gap-1.5 cursor-pointer hover:shadow-md shrink-0"
                    >
                      <LucideIcon name="FileText" size={14} />
                      <span>募集要項の専門ページを見る</span>
                      <LucideIcon name="ChevronRight" size={13} />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
                    <div className="p-4 bg-rose-50/40 rounded-2xl border border-rose-100/70">
                      <span className="text-[10px] text-zinc-500 font-bold block mb-1">給与システム</span>
                      <p className="font-bold text-zinc-900 text-base">日給 3万〜15万円超</p>
                      <p className="text-[11px] text-rose-600 font-bold mt-1">売上50%完全バック・即日全額現金</p>
                    </div>
                    <div className="p-4 bg-rose-50/40 rounded-2xl border border-rose-100/70">
                      <span className="text-[10px] text-zinc-500 font-bold block mb-1">応募資格</span>
                      <p className="font-bold text-zinc-900 text-base">20歳以上の女性</p>
                      <p className="text-[11px] text-rose-600 font-bold mt-1">※組合規約により20歳未満不可</p>
                    </div>
                    <div className="p-4 bg-rose-50/40 rounded-2xl border border-rose-100/70">
                      <span className="text-[10px] text-zinc-500 font-bold block mb-1">勤務シフト</span>
                      <p className="font-bold text-zinc-900 text-base">10:00〜24:00 自由</p>
                      <p className="text-[11px] text-zinc-600 mt-1">週1日〜・短時間・昼シフト大歓迎</p>
                    </div>
                    <div className="p-4 bg-rose-50/40 rounded-2xl border border-rose-100/70">
                      <span className="text-[10px] text-zinc-500 font-bold block mb-1">身バレ・安全対策</span>
                      <p className="font-bold text-zinc-900 text-base">ネット写真ゼロ (100%)</p>
                      <p className="text-[11px] text-emerald-600 font-bold mt-1">完全源氏名・街全体撮影禁止</p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Job detailed specification with live interactive income simulator */}
              <div id="jobs">
                <JobDetails content={siteContent.jobs} onCtaclickWithData={handleInjectedScroll} />
              </div>

              {/* Testimonials Quote Cards */}
              <div id="voice">
                <Testimonials />
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
