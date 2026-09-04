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
import { getStoredArticles, BlogArticle, BLOG_ARTICLES, getValidArticleEyeCatch, mergeWithDefaultArticles } from './blogData';
import { getStoredSiteContent, SiteContent } from './siteContent';
import { getBlogArticlesFromFirestore, getSiteContentFromFirestore, saveBlogArticlesToFirestore, saveSiteContentToFirestore } from './firebase';

const AdminPanel = lazy(() => import('./components/AdminPanel'));

export default function App() {
  const [path, setPath] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.location.pathname;
    }
    return '/';
  });

  useEffect(() => {
    const handlePopState = () => {
      setPath(window.location.pathname);
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
      if (!skipScrollTop) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  let currentTab: 'recruit' | 'blog' | 'admin' = 'recruit';
  let selectedSlug: string | null = null;

  if (path === '/admin') {
    currentTab = 'admin';
  } else if (path.startsWith('/blog')) {
    currentTab = 'blog';
    const match = path.match(/^\/blog\/([^/]+)/);
    if (match) {
      selectedSlug = match[1];
    }
  }

  const setCurrentTab = (tab: 'recruit' | 'blog' | 'admin') => {
    if (tab === 'recruit') {
      navigate('/');
    } else if (tab === 'blog') {
      navigate('/blog');
    } else if (tab === 'admin') {
      navigate('/admin');
    }
  };

  const handleScrollToSection = (sectionId: string) => {
    const cleanId = sectionId.startsWith('#') ? sectionId.substring(1) : sectionId;
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

              {/* Search Intent & Comprehensive Recruit Hub */}
              <div id="hub">
                <RecruitHub 
                  onScrollToSection={handleScrollToSection}
                  onNavigateToArticle={(slug) => {
                    navigate(`/blog/${slug}`);
                  }}
                  onNavigateToBlog={() => {
                    setCurrentTab('blog');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                />
              </div>

              {/* concerns Bento Grid block */}
              <div id="concerns">
                <Concerns content={siteContent.concerns} />
              </div>

              {/* Reasons Section */}
              <div id="reasons">
                <Reasons content={siteContent.reasons} />
              </div>

              {/* FAQ accordion section */}
              <div id="faq">
                <FAQ content={siteContent.faq} />
              </div>

              {/* Testimonials Quote Cards */}
              <div id="voice">
                <Testimonials />
              </div>

              {/* Job detailed specification with live interactive income simulator */}
              <div id="jobs">
                <JobDetails content={siteContent.jobs} onCtaclickWithData={handleInjectedScroll} />
              </div>

              {/* Onboarding steps list */}
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
