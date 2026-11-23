/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, Suspense } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Header from './components/Header';
import Hero from './components/Hero';
import AboutSection from './components/AboutSection';
import Reasons from './components/Reasons';
import JobFlowSection from './components/JobFlowSection';
import SalarySystemSection from './components/SalarySystemSection';
import WorkstyleGuideSection from './components/WorkstyleGuideSection';
import EnvironmentGallerySection from './components/EnvironmentGallerySection';
import RequirementsSection from './components/RequirementsSection';
import AccessSection from './components/AccessSection';
import Testimonials from './components/Testimonials';
import HomeFaqSection from './components/HomeFaqSection';
import Flow from './components/Flow';
import LineCtaSection from './components/LineCtaSection';
import RecruitGuideSection from './components/RecruitGuideSection';
import Footer from './components/Footer';
import MobileStickyCta from './components/MobileStickyCta';
import {
  LazyAboutPage,
  LazyAdminPanel,
  LazyBlogSection,
  LazyComparisonPage,
  LazyFAQPage,
  LazyGlossaryPage,
  LazySiteComparisonPage,
  LazyTopicClusterPage,
} from './routeLoaders';
import { SITE_COMPARE_SEO } from './compareData';
import type { BlogArticle } from './blogData';
import { TOPIC_ROUTE_PATHS } from './featuredArticles';
import { getStoredSiteContent, SiteContent } from './siteContent';
import { captureInitialHomeJsonLd, restoreHomeJsonLd } from './utils/jsonLd';
import { trackAiSearchReferral, trackAiSearchPageView } from './utils/aiAnalytics';

if (typeof window !== 'undefined') {
  captureInitialHomeJsonLd();
}

const PageRouteFallback = (
  <div className="min-h-[70vh] bg-[#fffafb]" aria-hidden="true" />
);

export default function App() {
  const [path, setPath] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.location.pathname + window.location.hash;
    }
    return '/';
  });

  useEffect(() => {
    trackAiSearchReferral();
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
        window.scrollTo(0, 0);
      }
    }
  };

  let currentTab: 'recruit' | 'blog' | 'admin' | 'about' | 'compare' | 'site-compare' | 'faq' | 'cluster' | 'glossary' = 'recruit';
  let clusterTopic = 'job';
  let selectedSlug: string | null = null;
  let selectedCategorySlug: string | null = null;
  let selectedFaqCategory: string | null = null;

  const rawPath = path.split('#')[0].split('?')[0];
  const cleanPath = (rawPath.length > 1 && rawPath.endsWith('/')) ? rawPath.slice(0, -1) : rawPath;

  const clusterPathMap: Record<string, string> = {
    '/job': 'job',
    '/salary': 'salary',
    '/beginner': 'beginner',
    '/experienced': 'experienced',
    '/requirements': 'requirements',
    '/benefits': 'salary',
    '/treatment': 'salary',
    '/flow': 'flow',
    '/interview': 'flow',
    '/workstyle': 'workstyle',
    '/shops': 'shops',
    '/dekasegi': 'dorm',
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
  } else if (cleanPath === '/glossary' || cleanPath === '/terms') {
    currentTab = 'glossary';
  } else if (cleanPath === '/about' || cleanPath === '/company') {
    currentTab = 'about';
  } else if (cleanPath === '/site-compare' || cleanPath === '/site-comparison') {
    currentTab = 'site-compare';
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

  const setCurrentTab = (tab: 'recruit' | 'blog' | 'admin' | 'about' | 'compare' | 'site-compare' | 'faq' | 'cluster' | 'glossary') => {
    if (tab === 'recruit') {
      navigate('/');
    } else if (tab === 'site-compare') {
      navigate('/site-compare');
    } else if (tab === 'compare') {
      navigate('/compare');
    } else if (tab === 'faq') {
      navigate('/faq');
    } else if (tab === 'blog') {
      navigate('/blog');
    } else if (tab === 'about') {
      navigate('/about');
    } else if (tab === 'glossary') {
      navigate('/glossary');
    } else if (tab === 'admin') {
      navigate('/admin');
    }
  };

  // Soft 404 Resolution: Redirect legacy/deprecated slugs to their correct current equivalents
  useEffect(() => {
    const slugRedirectMap: Record<string, string> = {
      'tobitashinchi-dormitory-lifestyle-support': '/blog/tobitashinchi-housing-support',
      'tobitashinchi-tax-declaration-guide': '/blog/tobitashinchi-tax-guide',
      'tobitashinchi-privacy-alibi-support': '/blog/tobitashinchi-identity-alibi-safety-measures',
      'tobitashinchi-physical-mental-care-guide': '/blog/tobitashinchi-stamina-mental-care-100k',
      'tobitashinchi-fake-job-scout-warning': '/blog/tobitashinchi-scout-fraud-avoidance-safe-recruitment',
      'tobitashinchi-daily-work-routine-guide': '/blog/tobitashinchi-daily-schedule-work-flow-detail',
      'tobitashinchi-id-requirements': '/blog/tobitashinchi-resident-record-requirement-checklist',
      'tobitashinchi-merits-and-demerits': '/blog/tobitashinchi-merit-demerit-honest',
      'tobitashinchi-shift-workstyle-guide': '/blog/flexible-shift-work-style-guide',
      'tobitashinchi-safety-rules-faq': '/blog/tobita-safe-recruitment',
      'tobitashinchi-main-vs-seishun-street': '/blog/tobita-street-compare',
      'tobitashinchi-salary-system-breakdown': '/blog/tobitashinchi-official-salary-formula-breakdown',
    };
    if (selectedSlug && slugRedirectMap[selectedSlug]) {
      navigate(slugRedirectMap[selectedSlug], true);
    }
    if (cleanPath === '/dorm') {
      navigate('/dekasegi', true);
    }
  }, [selectedSlug, cleanPath]);

  // Remove SSR shell critical CSS only after React has mounted and replaced [data-ssr-content]
  useEffect(() => {
    document.getElementById('ssr-shell-styles')?.remove();
  }, []);

  useEffect(() => {
    if (typeof document === 'undefined') return;
    trackAiSearchPageView(cleanPath || '/');

    let pageTitle = '飛田新地求人｜飛田ガールズ【公式・料亭直営の女性採用窓口】';
    let pageDesc = '大阪・飛田新地の料亭直営公式求人窓口「飛田ガールズ」。お店による直接募集だからこそ、仕事内容や売上50%バック・即日全額現金日払いの報酬仕組み、勤務条件、身バレ対策を分かりやすくご案内。未経験・経験者どちらも応募前のLINE無料相談を受け付けています。';
    let ogTitleText: string | null = '飛田新地求人｜飛田ガールズ公式採用サイト【料亭直営】';
    let ogDescText: string | null = '大阪・飛田新地の料亭が直接募集する公式求人窓口「飛田ガールズ」。仕事内容・売上50%バック・即日全額日払い・未経験や移籍のサポート体制をご案内しています。';
    let canonicalUrl = 'https://tobitashinchi-recruit.com/';
    const defaultOgImg = 'https://tobitashinchi-recruit.com/images/home_hero_ryotei_1795337037663.jpg';

    if (currentTab === 'cluster') {
      canonicalUrl = `https://tobitashinchi-recruit.com${TOPIC_ROUTE_PATHS[clusterTopic] || `/${clusterTopic}`}`;
      let canonicalLink = document.querySelector('link[rel="canonical"]');
      if (canonicalLink) {
        canonicalLink.setAttribute('href', canonicalUrl);
      }
      import('./topicClusterData').then(({ TOPIC_CLUSTERS }) => {
        const topic = TOPIC_CLUSTERS[clusterTopic];
        if (topic) {
          const topicImgUrl = topic.heroImage
            ? `https://tobitashinchi-recruit.com${topic.heroImage.startsWith('/') ? '' : '/'}${topic.heroImage}`
            : defaultOgImg;
          document.title = topic.seoTitle;
          const md = document.querySelector('meta[name="description"]');
          if (md) md.setAttribute('content', topic.metaDescription);
          const ou = document.querySelector('meta[property="og:url"]');
          if (ou) ou.setAttribute('content', canonicalUrl);
          const ot = document.querySelector('meta[property="og:title"]');
          if (ot) ot.setAttribute('content', topic.seoTitle);
          const od = document.querySelector('meta[property="og:description"]');
          if (od) od.setAttribute('content', topic.metaDescription);
          const oi = document.querySelector('meta[property="og:image"]');
          if (oi) oi.setAttribute('content', topicImgUrl);
          const ois = document.querySelector('meta[property="og:image:secure_url"]');
          if (ois) ois.setAttribute('content', topicImgUrl);
          const tt = document.querySelector('meta[name="twitter:title"]');
          if (tt) tt.setAttribute('content', topic.seoTitle);
          const td = document.querySelector('meta[name="twitter:description"]');
          if (td) td.setAttribute('content', topic.metaDescription);
          const ti = document.querySelector('meta[name="twitter:image"]');
          if (ti) ti.setAttribute('content', topicImgUrl);
        }
      }).catch(() => {});
    } else if (currentTab === 'site-compare') {
      pageTitle = SITE_COMPARE_SEO.title;
      pageDesc = SITE_COMPARE_SEO.description;
      canonicalUrl = SITE_COMPARE_SEO.canonicalUrl;
    } else if (currentTab === 'compare') {
      canonicalUrl = selectedCategorySlug
        ? `https://tobitashinchi-recruit.com/compare/${selectedCategorySlug}`
        : 'https://tobitashinchi-recruit.com/compare';
    } else if (currentTab === 'glossary') {
      pageTitle = '飛田新地 用語集・用語辞典｜上がり框・仲居・通り別解説｜飛田ガールズ';
      pageDesc = '飛田新地求人の専門用語辞典。上がり框、仲居さん、清拭（シャワーなしルール）、メイン通り・青春通り・裏通りの違い、給料計算（50%バック）など、働く前に知っておきたい用語を料亭直営スタッフが分かりやすく解説。';
      canonicalUrl = 'https://tobitashinchi-recruit.com/glossary';
    } else if (currentTab === 'about') {
      pageTitle = '飛田ガールズについて｜運営者情報・料亭直営体制【公式】';
      pageDesc = '飛田新地料理組合公認の老舗料亭直営公式求人「飛田ガールズ」の店舗情報、創業歴、運営体制、女性スタッフによるサポート方針、安心の情報発信ポリシーをご紹介します。';
      canonicalUrl = 'https://tobitashinchi-recruit.com/about';
    } else if (currentTab === 'blog') {
      if (!selectedSlug) {
        pageTitle = '飛田新地お仕事コラム一覧｜給与・面接・体験談ガイド｜飛田ガールズ';
        pageDesc = '飛田新地のお仕事、給料システム、面接・体入の流れ、寮生活、安全対策など、現場の女性スタッフによる役立つ最新コラム一覧。';
        canonicalUrl = 'https://tobitashinchi-recruit.com/blog';
      }
    } else if (currentTab === 'faq') {
      pageTitle = '飛田新地のよくある質問｜仕事・給料・応募条件Q&A｜飛田ガールズ';
      pageDesc = '飛田新地で働く前に知っておきたい仕事内容・給料・応募条件・身バレ対策などの疑問をQ&A形式で分かりやすくまとめました。未経験・経験者どちらも確認できます。';
      canonicalUrl = selectedFaqCategory ? `https://tobitashinchi-recruit.com/faq/${selectedFaqCategory}` : 'https://tobitashinchi-recruit.com/faq';
    } else if (currentTab === 'recruit') {
      pageTitle = '飛田新地求人｜飛田ガールズ【公式・料亭直営の女性採用窓口】';
      pageDesc = '大阪・飛田新地の料亭直営公式求人窓口「飛田ガールズ」。お店による直接募集だからこそ、仕事内容や売上50%バック・即日全額現金日払いの報酬仕組み、勤務条件、身バレ対策を分かりやすくご案内。未経験・経験者どちらも応募前のLINE無料相談を受け付けています。';
      ogTitleText = '飛田新地求人｜飛田ガールズ公式採用サイト【料亭直営】';
      ogDescText = '大阪・飛田新地の料亭が直接募集する公式求人窓口「飛田ガールズ」。仕事内容・売上50%バック・即日全額日払い・未経験や移籍のサポート体制をご案内しています。';
      canonicalUrl = 'https://tobitashinchi-recruit.com/';
    } else if (currentTab === 'admin') {
      pageTitle = '管理パネル｜飛田ガールズ';
    }

    // Only update if not handled by dedicated page components (BlogSection detail / ComparisonPage / Cluster)
    if ((currentTab !== 'blog' || !selectedSlug) && currentTab !== 'compare' && currentTab !== 'cluster') {
      document.title = pageTitle;

      const metaRobots = document.querySelector('meta[name="robots"]');
      if (metaRobots) {
        metaRobots.setAttribute('content', 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1');
      }

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

      const finalOgTitle = ogTitleText || pageTitle;
      const finalOgDesc = ogDescText || pageDesc;

      const ogUrl = document.querySelector('meta[property="og:url"]');
      if (ogUrl) ogUrl.setAttribute('content', canonicalUrl);
      const ogTitle = document.querySelector('meta[property="og:title"]');
      if (ogTitle) ogTitle.setAttribute('content', finalOgTitle);
      const ogDesc = document.querySelector('meta[property="og:description"]');
      if (ogDesc) ogDesc.setAttribute('content', finalOgDesc);
      const ogImage = document.querySelector('meta[property="og:image"]');
      if (ogImage) ogImage.setAttribute('content', defaultOgImg);
      const ogImageSec = document.querySelector('meta[property="og:image:secure_url"]');
      if (ogImageSec) ogImageSec.setAttribute('content', defaultOgImg);
      const ogType = document.querySelector('meta[property="og:type"]');
      if (ogType) ogType.setAttribute('content', 'website');

      const twCard = document.querySelector('meta[name="twitter:card"]');
      if (twCard) twCard.setAttribute('content', 'summary_large_image');
      const twTitle = document.querySelector('meta[name="twitter:title"]');
      if (twTitle) twTitle.setAttribute('content', finalOgTitle);
      const twDesc = document.querySelector('meta[name="twitter:description"]');
      if (twDesc) twDesc.setAttribute('content', finalOgDesc);
      const twImg = document.querySelector('meta[name="twitter:image"]');
      if (twImg) twImg.setAttribute('content', defaultOgImg);

      if (currentTab === 'recruit') {
        restoreHomeJsonLd();
      }
    }
  }, [currentTab, selectedSlug, clusterTopic, selectedCategorySlug, selectedFaqCategory]);

  const handleScrollToSection = (sectionId: string) => {
    const cleanId = sectionId.startsWith('#') ? sectionId.substring(1) : sectionId;
    if (cleanId === 'top') {
      if (currentTab !== 'recruit') {
        navigate('/');
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      return;
    }
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
    const blogMod = await import('./blogData');
    try {
      const fbMod = await import('./firebase');
      const firestoreData = await fbMod.getBlogArticlesFromFirestore();
      if (firestoreData && firestoreData.length > 0) {
        const { merged } = blogMod.mergeWithDefaultArticles(firestoreData);
        setBlogArticles(merged);
        return;
      }

      const res = await fetch('/api/cms/articles');
      if (res.ok) {
        const data = await res.json();
        const { merged } = blogMod.mergeWithDefaultArticles(data);
        setBlogArticles(merged);
      } else {
        setBlogArticles(blogMod.getStoredArticles());
      }
    } catch (e) {
      setBlogArticles(blogMod.getStoredArticles());
    }
  };

  const fetchSiteContent = async () => {
    try {
      const fbMod = await import('./firebase');
      const firestoreData = await fbMod.getSiteContentFromFirestore();
      if (firestoreData) {
        setSiteContent(firestoreData);
        return;
      }

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
    if ((currentTab === 'blog' || currentTab === 'admin') && blogArticles.length === 0) {
      fetchArticles();
    }
  }, [currentTab]);

  useEffect(() => {
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

  const handleInjectedScroll = (_message?: string) => {
    handleScrollToSection('consultation');
  };

  const handleScrollToSimulator = () => {
    navigate('/salary');
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
          navigate(TOPIC_ROUTE_PATHS[tid] || `/${tid}`);
          window.scrollTo(0, 0);
        }}
        isAdminMode={isAdminMode}
      />

      {/* Main Layout Area */}
      <main className="flex-grow pt-16 overflow-x-hidden pb-20 md:pb-0">
        <AnimatePresence mode="wait" initial={false}>
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
              {/* 2. ファーストビュー */}
              <Hero
                content={siteContent.hero}
                onCtaclick={handleScrollToForm}
                onScrollToSalaryOrJob={() => handleScrollToSection('job')}
                onBlogClick={() => {
                  setCurrentTab('blog');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                onArticleClick={(slug) => {
                  navigate(`/blog/${slug}`);
                }}
              />

              {/* 3. 飛田ガールズとは？ */}
              <AboutSection
                onNavigateAbout={() => {
                  navigate('/about');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              />

              {/* 4. 飛田ガールズが選ばれる6つの理由 */}
              <Reasons
                content={siteContent.reasons}
                onNavigateTopic={(topicId) => {
                  navigate(TOPIC_ROUTE_PATHS[topicId] || `/${topicId}`);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              />

              {/* 5. 仕事内容・1日の流れ */}
              <JobFlowSection
                onNavigateJob={() => {
                  navigate('/job');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              />

              {/* 6. 給料・報酬システム */}
              <SalarySystemSection
                onNavigateSalary={() => {
                  navigate('/salary');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              />

              {/* 7. 希望別の働き方ガイド */}
              <WorkstyleGuideSection
                onNavigateTopic={(topicId) => {
                  navigate(TOPIC_ROUTE_PATHS[topicId] || `/${topicId}`);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                onNavigatePath={(targetPath) => {
                  navigate(targetPath);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              />

              {/* 8. 働く環境・設備紹介 */}
              <EnvironmentGallerySection
                onNavigatePath={(targetPath) => {
                  navigate(targetPath);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              />

              {/* 9. 働く女性のリアルな声 */}
              <Testimonials
                onNavigateFaq={() => {
                  navigate('/faq');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              />

              {/* 10. 募集要項 */}
              <RequirementsSection
                onNavigatePath={(targetPath) => {
                  navigate(targetPath);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              />

              {/* 11. アクセス */}
              <AccessSection />

              {/* 12. 応募前のFAQ */}
              <HomeFaqSection
                onNavigateFaq={() => {
                  navigate('/faq');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              />

              {/* 13. 応募からお仕事開始まで */}
              <Flow content={siteContent.flow} />

              {/* 14. 最後のLINE相談案内 */}
              <LineCtaSection content={siteContent.consultation} />

              {/* テーマ別の詳細ガイド・関連ページ */}
              <RecruitGuideSection
                onNavigateTopic={(topicId) => {
                  navigate(TOPIC_ROUTE_PATHS[topicId] || `/${topicId}`);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                onNavigatePath={(targetPath) => {
                  navigate(targetPath);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              />
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
              <Suspense fallback={PageRouteFallback}>
                <LazyBlogSection 
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
                  onNavigateHome={() => setCurrentTab('recruit')}
                />
              </Suspense>
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
              <Suspense fallback={PageRouteFallback}>
                <LazyComparisonPage
                  onNavigateHome={() => setCurrentTab('recruit')}
                  onNavigateBlog={() => setCurrentTab('blog')}
                  onNavigateSiteCompare={() => setCurrentTab('site-compare')}
                  onNavigatePath={(targetPath) => navigate(targetPath)}
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
              </Suspense>
            </motion.div>
          ) : currentTab === 'site-compare' ? (
            /* ==========================================
               SITE & INDUSTRY COMPARISON PAGE (DEDICATED)
               ========================================== */
            <motion.div
              key="site-compare-page"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
            >
              <Suspense fallback={PageRouteFallback}>
                <LazySiteComparisonPage
                  onNavigateHome={() => setCurrentTab('recruit')}
                  onNavigateCompare={() => setCurrentTab('compare')}
                  onNavigatePath={(path) => navigate(path)}
                  onCtaclick={handleScrollToForm}
                />
              </Suspense>
            </motion.div>
          ) : currentTab === 'glossary' ? (
            /* ==========================================
               GLOSSARY / DICTIONARY PAGE (INDEPENDENT)
               ========================================== */
            <motion.div
              key="glossary-page"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
            >
              <Suspense fallback={PageRouteFallback}>
                <LazyGlossaryPage
                  onNavigateHome={() => setCurrentTab('recruit')}
                  onCtaclick={handleScrollToForm}
                />
              </Suspense>
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
              <Suspense fallback={PageRouteFallback}>
                <LazyAboutPage
                  onNavigateHome={() => setCurrentTab('recruit')}
                  onNavigateBlog={() => setCurrentTab('blog')}
                  onCtaclick={handleScrollToForm}
                />
              </Suspense>
            </motion.div>
          ) : currentTab === 'faq' ? (
            /* ==========================================
               DEDICATED FAQ PAGE (12 CATEGORIES, 119 QUESTIONS)
               ========================================== */
            <motion.div
              key="faq-page"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
            >
              <Suspense fallback={PageRouteFallback}>
                <LazyFAQPage
                  initialCategory={selectedFaqCategory}
                  onNavigateHome={() => {
                    navigate('/');
                  }}
                  onNavigatePath={(targetPath) => {
                    navigate(targetPath);
                  }}
                  onCtaclick={handleScrollToForm}
                />
              </Suspense>
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
              <Suspense fallback={PageRouteFallback}>
                <LazyTopicClusterPage
                  topicId={clusterTopic}
                  onNavigateHome={() => {
                    navigate('/');
                  }}
                  onNavigateTopic={(tid) => {
                    navigate(TOPIC_ROUTE_PATHS[tid] || `/${tid}`);
                  }}
                  onNavigateBlog={(slug) => {
                    if (slug) {
                      navigate(`/blog/${slug}`);
                    } else {
                      navigate('/blog');
                    }
                  }}
                  onNavigateFaq={() => {
                    navigate('/faq');
                  }}
                  onCtaclick={handleScrollToForm}
                  onInjectedScroll={handleInjectedScroll}
                />
              </Suspense>
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
                <LazyAdminPanel 
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
          navigate(TOPIC_ROUTE_PATHS[tid] || `/${tid}`);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onScrollToSection={handleScrollToSection}
        onOpenAdmin={() => { setCurrentTab('admin'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} 
        isAdminMode={isAdminMode}
      />

      {/* Mobile Sticky Floating CTA Bar (Thumb-zone optimization for smartphone users) */}
      {currentTab !== 'admin' && (
        <MobileStickyCta 
          onScrollToForm={handleScrollToForm} 
          isSalaryPage={currentTab === 'cluster' && clusterTopic === 'salary'}
          isBeginnerPage={currentTab === 'cluster' && clusterTopic === 'beginner'}
          isExperiencedPage={currentTab === 'cluster' && clusterTopic === 'experienced'}
          isWorkstylePage={currentTab === 'cluster' && clusterTopic === 'workstyle'}
          isShopsPage={currentTab === 'cluster' && clusterTopic === 'shops'}
        />
      )}

    </div>
  );
}
