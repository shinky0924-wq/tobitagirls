/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import LucideIcon from './LucideIcon';
import {
  COMPARE_CATEGORY_GROUPS,
  COMPARE_SUBPAGE_MAP,
} from '../data/compareGuides';

interface WorkstyleGuideSectionProps {
  onNavigateTopic?: (topicId: string) => void;
  onNavigatePath: (path: string) => void;
}

export default function WorkstyleGuideSection({ onNavigatePath }: WorkstyleGuideSectionProps) {
  const [selectedGroupId, setSelectedGroupId] = useState<string>(COMPARE_CATEGORY_GROUPS[0].id);

  const activeGroup =
    COMPARE_CATEGORY_GROUPS.find((group) => group.id === selectedGroupId) ||
    COMPARE_CATEGORY_GROUPS[0];

  const activeItems = activeGroup.slugs
    .map((slug) => COMPARE_SUBPAGE_MAP[slug])
    .filter(Boolean);

  return (
    <section
      id="workstyle"
      className="py-16 md:py-24 bg-white border-b border-outline-variant/60"
      aria-labelledby="workstyle-heading"
    >
      <div className="max-w-[1160px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center max-w-2xl mx-auto mb-10 md:mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest text-primary uppercase">
            <span className="w-4 h-px bg-primary" aria-hidden="true" />
            <span>WORKSTYLE GUIDE</span>
            <span className="w-4 h-px bg-primary" aria-hidden="true" />
          </div>
          <h2
            id="workstyle-heading"
            className="font-display font-bold text-2xl sm:text-3xl md:text-4xl text-on-surface leading-snug text-balance"
          >
            あなたの希望に合った働き方を探してみませんか？
          </h2>
          <p className="font-sans text-sm sm:text-base text-on-surface-variant leading-relaxed">
            経験の有無や出勤できる時間帯、目標やライフスタイルによって最適な働き方は異なります。気になるテーマの詳細ページをご覧ください。
          </p>
        </div>

        {/* Category Tabs for 「働き方・求人比較｜あなたに合った働き方を、一緒に考えませんか？」 */}
        <div
          className="flex items-center justify-start lg:justify-center gap-2 overflow-x-auto pb-2 mb-6 no-scrollbar"
          role="tablist"
          aria-label="働き方・求人比較カテゴリー"
        >
          {COMPARE_CATEGORY_GROUPS.map((group) => {
            const isActive = group.id === activeGroup.id;
            return (
              <button
                key={group.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setSelectedGroupId(group.id)}
                className={`shrink-0 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-colors cursor-pointer border ${
                  isActive
                    ? 'bg-primary text-white border-primary shadow-xs'
                    : 'bg-surface text-on-surface-variant hover:text-primary border-outline-variant hover:border-primary/40'
                }`}
              >
                {group.title}
              </button>
            );
          })}
        </div>

        {/* Selected Category Description */}
        <div className="bg-surface rounded-2xl border border-outline-variant p-5 sm:p-6 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5 pb-4 border-b border-outline-variant/70">
            <div className="space-y-1">
              <h3 className="font-sans font-bold text-base sm:text-lg text-on-surface">
                {activeGroup.title}
              </h3>
              <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                {activeGroup.description}
              </p>
            </div>
            <a
              href="/compare"
              onClick={(e) => {
                e.preventDefault();
                onNavigatePath('/compare');
              }}
              className="inline-flex items-center justify-center gap-1.5 text-xs sm:text-sm font-bold text-white bg-primary hover:bg-secondary px-4 py-2.5 rounded-xl shadow-xs shrink-0 transition-colors cursor-pointer"
            >
              <span>自分に合う働き方を見つける</span>
              <LucideIcon name="ArrowRight" size={15} />
            </a>
          </div>

          {/* Subpage Cards Grid linking to /compare/<slug> */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {activeItems.map((item) => (
              <a
                key={item.slug}
                href={`/compare/${item.slug}`}
                onClick={(e) => {
                  e.preventDefault();
                  onNavigatePath(`/compare/${item.slug}`);
                }}
                className="group bg-white hover:bg-surface-container/40 border border-outline-variant hover:border-primary/50 rounded-2xl p-5 flex flex-col justify-between gap-3 shadow-2xs hover:shadow-sm transition-all cursor-pointer"
              >
                <div className="space-y-1.5">
                  <h4 className="font-sans font-bold text-[15px] sm:text-base text-on-surface group-hover:text-primary transition-colors leading-snug">
                    {item.itemName}
                  </h4>
                  <p className="text-xs sm:text-[13px] text-on-surface-variant leading-relaxed">
                    {item.cardDescription}
                  </p>
                </div>
                <div className="pt-2.5 border-t border-outline-variant/60 flex items-center justify-between text-xs font-bold text-secondary group-hover:text-primary">
                  <span>詳細ページを見る</span>
                  <LucideIcon name="ArrowRight" size={14} className="group-hover:translate-x-0.5 transition-transform" />
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
