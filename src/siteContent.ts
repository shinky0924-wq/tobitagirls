import siteContentJson from '../data/siteContent.json';

export interface SiteContent {
  lastUpdated?: string;
  hero: {
    tagline: string;
    titleLine1: string;
    titleLine2: string;
    descriptionLine1: string;
    descriptionLine2: string;
    descriptionLine3: string;
    fullDescription?: string;
    ctaButtonText: string;
    badgeText: string;
  };
  concerns: {
    title: string;
    subtitle: string;
    items: {
      id: string;
      iconName: string;
      title: string;
      question: string;
      answer: string;
    }[];
  };
  reasons: {
    title: string;
    subtitle: string;
    description?: string;
    items: {
      number: string;
      iconName: string;
      title: string;
      description: string;
      appealPoints?: string[];
    }[];
  };
  jobs: {
    title: string;
    subtitle: string;
    infoSubtitle: string;
    simulatorTitle: string;
    simulatorDesc: string;
  };
  flow: {
    title: string;
    subtitle: string;
    items: {
      number: string;
      title: string;
    }[];
  };
  faq: {
    title: string;
    sidebarTitle: string;
    sidebarRole: string;
    sidebarMessage: string;
    items: {
      id: string;
      question: string;
      answer: string;
    }[];
  };
  consultation: {
    title: string;
    description: string;
    badgeText: string;
    copySubtitle: string;
    templateText: string;
    copyButtonText: string;
    lineBadgeText: string;
    lineButtonText: string;
    lineSubtitle: string;
    privacyNote: string;
  };
}

export const DEFAULT_SITE_CONTENT: SiteContent = siteContentJson as any;

export function getStoredSiteContent(): SiteContent {
  if (typeof window === 'undefined') return DEFAULT_SITE_CONTENT;
  try {
    const stored = localStorage.getItem('custom_site_content');
    if (!stored) {
      return DEFAULT_SITE_CONTENT;
    }
    const customContent = JSON.parse(stored);
    
    // Auto-migrate: Reset stale hero/reasons/flow/consultation from pre-renewal versions
    let migrated = false;
    if (
      customContent.hero &&
      (customContent.hero.titleLine1 !== DEFAULT_SITE_CONTENT.hero.titleLine1 ||
       customContent.hero.tagline !== DEFAULT_SITE_CONTENT.hero.tagline)
    ) {
      customContent.hero = { ...DEFAULT_SITE_CONTENT.hero };
      migrated = true;
    }

    if (
      customContent.reasons &&
      customContent.reasons.title !== DEFAULT_SITE_CONTENT.reasons.title
    ) {
      customContent.reasons = { ...DEFAULT_SITE_CONTENT.reasons };
      migrated = true;
    }

    if (
      customContent.flow &&
      (customContent.flow.subtitle !== DEFAULT_SITE_CONTENT.flow.subtitle ||
       customContent.flow.items?.[0]?.title !== DEFAULT_SITE_CONTENT.flow.items[0].title)
    ) {
      customContent.flow = { ...DEFAULT_SITE_CONTENT.flow };
      migrated = true;
    }

    if (
      customContent.consultation &&
      customContent.consultation.title !== DEFAULT_SITE_CONTENT.consultation.title
    ) {
      customContent.consultation = { ...DEFAULT_SITE_CONTENT.consultation };
      migrated = true;
    }

    if (migrated) {
      try {
        localStorage.setItem('custom_site_content', JSON.stringify(customContent));
      } catch (e) {
        // ignore
      }
    }

    const merged = { ...DEFAULT_SITE_CONTENT };
    
    merged.lastUpdated = DEFAULT_SITE_CONTENT.lastUpdated || customContent.lastUpdated;
    if (customContent.hero) merged.hero = { ...merged.hero, ...customContent.hero };
    if (customContent.concerns) merged.concerns = { ...merged.concerns, ...customContent.concerns };
    if (customContent.reasons) merged.reasons = { ...merged.reasons, ...customContent.reasons };
    if (customContent.jobs) merged.jobs = { ...merged.jobs, ...customContent.jobs };
    if (customContent.flow) merged.flow = { ...merged.flow, ...customContent.flow };
    if (customContent.faq) merged.faq = { ...merged.faq, ...customContent.faq };
    if (customContent.consultation) merged.consultation = { ...merged.consultation, ...customContent.consultation };
    
    return merged as SiteContent;
  } catch (e) {
    console.error('Error parsing custom site content:', e);
    return DEFAULT_SITE_CONTENT;
  }
}

export function saveSiteContent(content: SiteContent) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem('custom_site_content', JSON.stringify(content));
  } catch (e) {
    console.error('Error saving site content to localStorage:', e);
  }
}
