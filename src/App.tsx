/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
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
import AdminPanel from './components/AdminPanel';
import { getStoredArticles, BlogArticle } from './blogData';
import { getStoredSiteContent, SiteContent } from './siteContent';
import { getBlogArticlesFromFirestore, getSiteContentFromFirestore } from './firebase';

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

  const navigate = (newPath: string) => {
    if (typeof window !== 'undefined') {
      window.history.pushState({}, '', newPath);
      setPath(newPath);
      window.scrollTo({ top: 0, behavior: 'smooth' });
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

  const [injectedMessage, setInjectedMessage] = useState<string>('');
  const [blogArticles, setBlogArticles] = useState<BlogArticle[]>([]);
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
        // Automatically merge any default/local articles that are missing in Firestore (like newly added 20 columns)
        const localArticles = getStoredArticles();
        const firestoreIds = new Set(firestoreData.map(a => a.id));
        let hasNewDefault = false;
        const mergedArticles = [...firestoreData];
        for (const localArt of localArticles) {
          if (!firestoreIds.has(localArt.id)) {
            mergedArticles.push(localArt);
            hasNewDefault = true;
          }
        }

        if (hasNewDefault) {
          // Sort mergedArticles by numeric ID
          mergedArticles.sort((a, b) => {
            const idA = parseInt(a.id, 10) || 0;
            const idB = parseInt(b.id, 10) || 0;
            return idA - idB;
          });
          setBlogArticles(mergedArticles);
          localStorage.setItem('custom_blog_articles', JSON.stringify(mergedArticles));

          // Save the merged list back to Firestore
          try {
            const { saveBlogArticlesToFirestore } = await import('./firebase');
            await saveBlogArticlesToFirestore(mergedArticles);
            console.log('Successfully updated Firestore with new default articles.');
          } catch (seedErr) {
            console.warn('Updating Firestore with newly added local articles failed:', seedErr);
          }
        } else {
          setBlogArticles(firestoreData);
          localStorage.setItem('custom_blog_articles', JSON.stringify(firestoreData));
        }
        return;
      }

      // 2. Fallback to API if not in Firestore
      const res = await fetch('/api/cms/articles');
      if (res.ok) {
        const data = await res.json();
        setBlogArticles(data);
        localStorage.setItem('custom_blog_articles', JSON.stringify(data));
        // Seed to Firestore for next time
        try {
          const { saveBlogArticlesToFirestore } = await import('./firebase');
          await saveBlogArticlesToFirestore(data);
        } catch (seedErr) {
          console.warn('First-time Firestore seeding skipped or failed:', seedErr);
        }
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
        localStorage.setItem('custom_site_content', JSON.stringify(firestoreData));
        return;
      }

      // 2. Fallback to API if not in Firestore
      const res = await fetch('/api/cms/site');
      if (res.ok) {
        const data = await res.json();
        setSiteContent(data);
        localStorage.setItem('custom_site_content', JSON.stringify(data));
        // Seed to Firestore for next time
        try {
          const { saveSiteContentToFirestore } = await import('./firebase');
          await saveSiteContentToFirestore(data);
        } catch (seedErr) {
          console.warn('First-time Firestore seeding skipped or failed:', seedErr);
        }
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
    if (currentTab !== 'recruit') {
      setCurrentTab('recruit');
      setTimeout(() => {
        const target = document.getElementById('consultation');
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 150);
    } else {
      const target = document.getElementById('consultation');
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  };

  const handleScrollToSection = (sectionId: string) => {
    const target = document.getElementById(sectionId);
    if (target) {
      const offsetHeader = 80;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - offsetHeader;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const handleInjectedScroll = (message: string) => {
    setInjectedMessage(message);
    // If user is on blog tab, switch back to recruit tab to show the consultation form
    navigate('/');
    
    setTimeout(() => {
      const target = document.getElementById('consultation');
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 150);
  };

  const handleClearInjected = () => {
    setInjectedMessage('');
  };

  const handleScrollToSimulator = () => {
    navigate('/');
    setTimeout(() => {
      handleScrollToSection('jobs');
    }, 150);
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
      <main className="flex-grow pt-16">
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
              />

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
              <AdminPanel 
                onClose={() => setCurrentTab('blog')}
                onRefreshBlog={handleRefreshBlog}
                onRefreshSite={handleRefreshSiteContent}
              />
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

    </div>
  );
}
