/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { FAQ_100_LIST, FAQ100Item } from '../faq100Data';
import LucideIcon from './LucideIcon';

interface HomeFaqSectionProps {
  onNavigateFaq: () => void;
}

const FAQ_TABS: Array<{ id: string; label: string; ids: string[] }> = [
  {
    id: 'beginner',
    label: '未経験・応募',
    ids: ['faq-rec-1', 'faq-rec-5', 'faq-rec-7', 'faq-rec-8', 'faq-rec-11'],
  },
  {
    id: 'salary',
    label: '給料・日払い',
    ids: ['faq-sal-6', 'faq-sal-7', 'faq-sal-8', 'faq-sal-9', 'faq-sal-12'],
  },
  {
    id: 'job',
    label: '仕事・衛生',
    ids: ['faq-job-1', 'faq-job-3', 'faq-job-4', 'faq-job-6', 'faq-job-8'],
  },
  {
    id: 'privacy',
    label: '身バレ・働き方',
    ids: ['faq-shift-1', 'faq-shift-4', 'faq-priv-1', 'faq-priv-3', 'faq-priv-12'],
  },
];

export default function HomeFaqSection({ onNavigateFaq }: HomeFaqSectionProps) {
  const [activeTab, setActiveTab] = useState<string>('beginner');
  const [openId, setOpenId] = useState<string>('faq-rec-1');

  const currentTab = FAQ_TABS.find((t) => t.id === activeTab) || FAQ_TABS[0];
  const items: FAQ100Item[] = currentTab.ids
    .map((id) => FAQ_100_LIST.find((f) => f.id === id))
    .filter((f): f is FAQ100Item => Boolean(f));

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    const nextTab = FAQ_TABS.find((t) => t.id === tabId);
    if (nextTab && nextTab.ids.length > 0) {
      setOpenId(nextTab.ids[0]);
    }
  };

  return (
    <section
      id="faq-preview"
      className="py-16 sm:py-24 bg-white border-b border-outline-variant/60"
      aria-labelledby="faq-preview-heading"
    >
      <div className="max-w-[980px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest text-primary uppercase">
            <span className="w-4 h-px bg-primary" aria-hidden="true" />
            <span>FAQ</span>
            <span className="w-4 h-px bg-primary" aria-hidden="true" />
          </div>
          <h2
            id="faq-preview-heading"
            className="font-display font-bold text-2xl sm:text-3xl md:text-4xl text-on-surface leading-snug text-balance"
          >
            応募前のよくある質問
          </h2>
          <p className="text-sm sm:text-base text-on-surface-variant leading-relaxed">
            応募前や相談前に多くいただく疑問をジャンル別にまとめました。気になるテーマを選んでご確認いただけます。
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-2 mb-6 no-scrollbar">
          {FAQ_TABS.map((tab) => {
            const isActive = tab.id === activeTab;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => handleTabChange(tab.id)}
                className={`shrink-0 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-colors cursor-pointer ${
                  isActive
                    ? 'bg-primary text-white shadow-xs'
                    : 'bg-surface text-on-surface-variant hover:text-primary border border-outline-variant'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Accordion List */}
        <div className="space-y-3">
          {items.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className="bg-surface rounded-2xl border border-outline-variant overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => setOpenId(isOpen ? '' : faq.id)}
                  aria-expanded={isOpen}
                  className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 cursor-pointer hover:bg-surface-container/60 transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-lg bg-primary text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                      Q
                    </span>
                    <span className="font-bold text-sm sm:text-base text-on-surface leading-snug">
                      {faq.question}
                    </span>
                  </div>
                  <LucideIcon
                    name={isOpen ? 'ChevronUp' : 'ChevronDown'}
                    size={18}
                    className="text-primary shrink-0"
                  />
                </button>

                {isOpen && (
                  <div className="px-5 py-4 bg-white border-t border-outline-variant/80 flex items-start gap-3">
                    <span className="w-6 h-6 rounded-lg bg-secondary-container text-on-secondary-container text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                      A
                    </span>
                    <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed whitespace-pre-line flex-1">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Dorm / Travel Transparent Note + Full FAQ Link */}
        <div className="mt-8 bg-surface-container-low rounded-2xl border border-outline-variant p-5 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-left">
            <p className="text-xs sm:text-sm font-bold text-on-surface">
              寮・滞在先や遠方からの交通費サポートについて
            </p>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              個室寮の空き状況や利用料、交通費の支給条件は時期・出発地・勤務予定によって異なるため、一律の条件ではなく事前確認制にて正確にご案内しています。
            </p>
          </div>
          <button
            type="button"
            onClick={onNavigateFaq}
            className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-secondary text-white font-bold text-xs sm:text-sm px-6 py-3.5 rounded-xl shadow-xs transition-colors cursor-pointer shrink-0 w-full sm:w-auto"
          >
            <LucideIcon name="HelpCircle" size={17} />
            <span>よくある質問（全{FAQ_100_LIST.length}問）をすべて見る</span>
            <LucideIcon name="ArrowRight" size={15} />
          </button>
        </div>
      </div>
    </section>
  );
}
