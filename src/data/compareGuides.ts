/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  COMPARE_CATEGORY_GROUPS,
  COMPARE_PARENT_COPY,
  COMPARE_LINE_CTA,
  COMPARE_GUIDES_PART1,
  type CompareSubpageItem,
  type CompareCategoryGroup,
} from './compareGuidesPart1';
import { COMPARE_GUIDES_PART2 } from './compareGuidesPart2';
import { COMPARE_GUIDES_PART3 } from './compareGuidesPart3';

export type { CompareSubpageItem, CompareCategoryGroup };
export { COMPARE_CATEGORY_GROUPS, COMPARE_PARENT_COPY, COMPARE_LINE_CTA };

export const COMPARE_SUBPAGES: CompareSubpageItem[] = [
  ...COMPARE_GUIDES_PART1,
  ...COMPARE_GUIDES_PART2,
  ...COMPARE_GUIDES_PART3,
];

export const COMPARE_SUBPAGE_MAP: Record<string, CompareSubpageItem> = Object.fromEntries(
  COMPARE_SUBPAGES.map((item) => [item.slug, item])
);

/**
 * Legacy /compare/* slugs -> New hierarchical /compare/<slug> redirects (301)
 */
export const LEGACY_COMPARE_SLUG_REDIRECTS: Record<string, string> = {
  inexperienced: 'beginner',
  'weekly-1': 'one-day-week',
  dormitory: 'short-term',
  'double-work': 'office-worker',
  'age-20s': '20s',
  'age-30s': '30s',
  'age-40s': '40s',
};

export function resolveCompareSubpage(slug?: string | null): CompareSubpageItem | undefined {
  if (!slug) return undefined;
  const clean = slug.replace(/\/$/, '').trim();
  const mappedSlug = LEGACY_COMPARE_SLUG_REDIRECTS[clean] || clean;
  return COMPARE_SUBPAGE_MAP[mappedSlug];
}
