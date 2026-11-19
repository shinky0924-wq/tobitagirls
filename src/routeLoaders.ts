import { lazy } from 'react';

export const loadBlogSection = () => import('./components/BlogSection');
export const loadAboutPage = () => import('./components/AboutPage');
export const loadComparisonPage = () => import('./components/ComparisonPage');
export const loadSiteComparisonPage = () => import('./components/SiteComparisonPage');
export const loadFAQPage = () => import('./components/FAQPage');
export const loadTopicClusterPage = () => import('./components/TopicClusterPage');
export const loadGlossaryPage = () => import('./components/GlossaryPage');
export const loadAdminPanel = () => import('./components/AdminPanel');

export const loadJobContentPage = () => import('./components/JobContentPage');
export const loadSalaryPage = () => import('./components/SalaryPage');
export const loadBeginnerPage = () => import('./components/BeginnerPage');
export const loadExperiencedPage = () => import('./components/ExperiencedPage');
export const loadFlowPage = () => import('./components/FlowPage');
export const loadWorkstylePage = () => import('./components/WorkstylePage');
export const loadShopsPage = () => import('./components/ShopsPage');

export const LazyBlogSection = lazy(loadBlogSection);
export const LazyAboutPage = lazy(loadAboutPage);
export const LazyComparisonPage = lazy(loadComparisonPage);
export const LazySiteComparisonPage = lazy(loadSiteComparisonPage);
export const LazyFAQPage = lazy(loadFAQPage);
export const LazyTopicClusterPage = lazy(loadTopicClusterPage);
export const LazyGlossaryPage = lazy(loadGlossaryPage);
export const LazyAdminPanel = lazy(loadAdminPanel);

export const LazyJobContentPage = lazy(loadJobContentPage);
export const LazySalaryPage = lazy(loadSalaryPage);
export const LazyBeginnerPage = lazy(loadBeginnerPage);
export const LazyExperiencedPage = lazy(loadExperiencedPage);
export const LazyFlowPage = lazy(loadFlowPage);
export const LazyWorkstylePage = lazy(loadWorkstylePage);
export const LazyShopsPage = lazy(loadShopsPage);

/**
 * Preloads the active lazy route chunk before React's first render so direct landing on any subpage
 * transitions seamlessly from the SSR shell with zero loading-spinner flicker.
 * Visiting `/` resolves immediately without fetching any secondary chunks.
 */
export async function preloadRouteForPath(pathname: string): Promise<void> {
  const cleanPath = (pathname.length > 1 && pathname.endsWith('/')) ? pathname.slice(0, -1) : pathname;
  if (!cleanPath || cleanPath === '/') {
    return;
  }

  try {
    if (cleanPath.startsWith('/blog')) {
      await loadBlogSection();
    } else if (cleanPath === '/about' || cleanPath === '/company') {
      await loadAboutPage();
    } else if (cleanPath === '/site-compare' || cleanPath === '/site-comparison') {
      await loadSiteComparisonPage();
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
      await loadComparisonPage();
    } else if (cleanPath === '/faq' || cleanPath.startsWith('/faq/')) {
      await loadFAQPage();
    } else if (cleanPath === '/glossary' || cleanPath === '/terms') {
      await loadGlossaryPage();
    } else if (cleanPath === '/admin') {
      await loadAdminPanel();
    } else if (cleanPath === '/job' || cleanPath === '/cluster/job') {
      await Promise.all([loadTopicClusterPage(), loadJobContentPage()]);
    } else if (cleanPath === '/salary' || cleanPath === '/benefits' || cleanPath === '/treatment' || cleanPath === '/cluster/salary') {
      await Promise.all([loadTopicClusterPage(), loadSalaryPage()]);
    } else if (cleanPath === '/beginner' || cleanPath === '/cluster/beginner') {
      await Promise.all([loadTopicClusterPage(), loadBeginnerPage()]);
    } else if (cleanPath === '/experienced' || cleanPath === '/cluster/experienced') {
      await Promise.all([loadTopicClusterPage(), loadExperiencedPage()]);
    } else if (cleanPath === '/flow' || cleanPath === '/interview' || cleanPath === '/cluster/flow') {
      await Promise.all([loadTopicClusterPage(), loadFlowPage()]);
    } else if (cleanPath === '/workstyle' || cleanPath === '/cluster/workstyle') {
      await Promise.all([loadTopicClusterPage(), loadWorkstylePage()]);
    } else if (cleanPath === '/shops' || cleanPath === '/cluster/shops') {
      await Promise.all([loadTopicClusterPage(), loadShopsPage()]);
    } else if (
      cleanPath === '/requirements' ||
      cleanPath === '/dekasegi' ||
      cleanPath === '/dorm' ||
      cleanPath === '/safety' ||
      cleanPath.startsWith('/cluster/')
    ) {
      await loadTopicClusterPage();
    }
  } catch (err) {
    console.warn('[preloadRouteForPath] Non-fatal chunk preload warning:', err);
  }
}
