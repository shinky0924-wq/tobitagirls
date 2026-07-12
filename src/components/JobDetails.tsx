/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion } from 'motion/react';
import { JOB_FACTS } from '../data';
import LucideIcon from './LucideIcon';
import { SiteContent } from '../siteContent';

interface JobDetailsProps {
  content: SiteContent['jobs'];
  onCtaclickWithData: (data: string) => void;
}

export default function JobDetails({ content, onCtaclickWithData }: JobDetailsProps) {
  // Simulator State
  const [daysPerWeek, setDaysPerWeek] = useState(3);
  const [sessionsPerDay, setSessionsPerDay] = useState(4);

  // average session reward is estimated around ¥10,000 〜 ¥20,000 net for the girl,
  // Let's assume a realistic average of ¥12,000 per session for conservative/reassuring calculation.
  const rewardPerSession = 12000;
  
  const dailyEarnings = sessionsPerDay * rewardPerSession;
  const weeklyEarnings = dailyEarnings * daysPerWeek;
  const monthlyEarnings = weeklyEarnings * 4.2; // approx weeks per month

  const handleShareToForm = () => {
    const dataMessage = `【給与シミュレーター希望】週${daysPerWeek}日・1日${sessionsPerDay}回接客 (月収目安: 約${workingFormatter(monthlyEarnings)}円)`;
    onCtaclickWithData(dataMessage);
  };

  const workingFormatter = (num: number) => {
    return Math.floor(num).toLocaleString();
  };

  return (
    <section className="py-20 bg-white" id="jobs">
      <div className="max-w-[1100px] mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-secondary font-display font-bold tracking-widest text-xs md:text-sm block mb-2 uppercase">
            {content.subtitle}
          </span>
          <h2 className="font-display font-extrabold text-2xl md:text-3xl lg:text-4xl mb-4 text-on-surface">
            {content.title}
          </h2>
          <p className="text-xs md:text-sm text-on-surface-variant font-medium">
            {content.infoSubtitle}
          </p>
        </div>

        {/* 5-Column Facts Rows */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 md:gap-6 mb-16" id="job-facts-grid">
          {JOB_FACTS.map((fact, index) => {
            const isScale = fact.id === 'fact-1' || fact.id === 'fact-5';
            return (
              <motion.div
                key={fact.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className={`p-4 md:p-6 rounded-2xl md:rounded-3xl border flex flex-row sm:flex-col items-center sm:text-center text-left gap-4 sm:gap-0 transition-all ${
                  isScale 
                    ? 'bg-rose-50/40 border-secondary shadow-md' 
                    : 'bg-surface-container-low border-zinc-100 shadow-sm'
                }`}
                id={`job-fact-card-${index + 1}`}
              >
                <div className="text-secondary flex-shrink-0 flex justify-center sm:mb-4">
                  <LucideIcon name={fact.iconName} size={36} className="md:w-10 md:h-10" />
                </div>
                
                <div className="flex-1 sm:w-full">
                  <h4 className="font-display font-bold text-sm md:text-base mb-1 sm:mb-3 text-on-surface">
                    {fact.title}
                  </h4>

                  <div className="space-y-0.5 sm:space-y-1">
                    {fact.highlight.map((line, i) => (
                      <p 
                        key={i} 
                        className={`text-xs md:text-sm font-semibold truncate ${
                          isScale ? 'text-secondary font-bold text-sm md:text-lg' : 'text-on-surface-variant'
                        }`}
                      >
                        {line}
                      </p>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Earning Simulator Core - Micro-crafted Dashboard */}
        <div className="bg-gradient-to-br from-rose-50/50 to-pink-50/20 border border-rose-100 rounded-3xl md:rounded-[36px] p-4 md:p-10 shadow-sm" id="earnings-simulator">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* User Controls */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <span className="bg-secondary text-white font-display font-extrabold text-[10px] tracking-wide px-2.5 py-1 rounded-full uppercase">
                  SIMULATOR
                </span>
                <h3 className="font-display font-extrabold text-lg md:text-2xl text-on-surface mt-3 mb-2">
                  {content.simulatorTitle}
                </h3>
                <p className="font-sans text-xs md:text-sm text-on-surface-variant">
                  {content.simulatorDesc}
                </p>
              </div>

              {/* Days setting */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm">
                  <label className="font-bold text-on-surface flex items-center gap-1.5">
                    <LucideIcon name="Calendar" size={16} className="text-secondary" />
                    週の勤務日数:
                  </label>
                  <span className="font-display font-extrabold text-secondary text-base">
                    週 <span className="text-xl">{daysPerWeek}</span> 日
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="6"
                  value={daysPerWeek}
                  onChange={(e) => setDaysPerWeek(Number(e.target.value))}
                  className="w-full accent-secondary h-2 bg-rose-100/60 rounded-lg appearance-none cursor-pointer"
                  id="days-slider"
                />
                <div className="flex justify-between text-[10px] text-gray-400 font-bold px-1">
                  <span>週1日 (副業・短期)</span>
                  <span>週3日 (レギュラー)</span>
                  <span>週5〜6日 (本気で稼ぐ)</span>
                </div>
              </div>

              {/* Sessions estimate setting */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm">
                  <label className="font-bold text-on-surface flex items-center gap-1.5">
                    <LucideIcon name="Briefcase" size={16} className="text-secondary" />
                    1日の目安接客数:
                  </label>
                  <span className="font-display font-extrabold text-secondary text-base">
                    1日 <span className="text-xl">{sessionsPerDay}</span> 回
                  </span>
                </div>
                <input
                  type="range"
                  min="2"
                  max="8"
                  value={sessionsPerDay}
                  onChange={(e) => setSessionsPerDay(Number(e.target.value))}
                  className="w-full accent-secondary h-2 bg-rose-100/60 rounded-lg appearance-none cursor-pointer"
                  id="sessions-slider"
                />
                <div className="flex justify-between text-[10px] text-gray-400 font-bold px-1">
                  <span>マイペース (2回)</span>
                  <span>のんびり (4回)</span>
                  <span>大活躍 (8回以上)</span>
                </div>
              </div>
            </div>

            {/* Results display */}
            <div className="lg:col-span-5 bg-white rounded-2xl md:rounded-3xl p-5 md:p-8 border border-rose-100/60 shadow-md flex flex-col justify-between h-full" id="simulator-results">
              <div className="space-y-4">
                <span className="text-[11px] font-extrabold text-gray-400 block tracking-wide uppercase">
                  ESTIMATES SUMMARY
                </span>
                
                {/* Daily estimation */}
                <div className="flex justify-between items-center border-b border-gray-50 pb-2">
                  <span className="text-xs font-bold text-on-surface-variant">日給目安:</span>
                  <span className="font-display font-bold text-sm text-[#493e42]">
                    約 {workingFormatter(dailyEarnings)} 円
                  </span>
                </div>

                {/* Weekly estimation */}
                <div className="flex justify-between items-center border-b border-gray-50 pb-2">
                  <span className="text-xs font-bold text-on-surface-variant">週給目安:</span>
                  <span className="font-display font-bold text-sm text-[#493e42]">
                    約 {workingFormatter(weeklyEarnings)} 円
                  </span>
                </div>

                {/* Monthly estimation */}
                <div className="bg-rose-50/40 p-4 rounded-2xl flex flex-col items-center justify-center text-center">
                  <span className="text-xs font-bold text-secondary mb-1">【月収見込み目安】</span>
                  <span className="font-display font-extrabold text-2xl md:text-3xl text-secondary">
                    約 {workingFormatter(monthlyEarnings)} <span className="text-sm font-sans font-bold">円</span>
                  </span>
                </div>
              </div>

              <button
                onClick={handleShareToForm}
                className="mt-6 w-full bg-[#06c755] hover:bg-[#05b34c] text-white font-sans font-bold text-sm py-3.5 px-4 rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer shadow-[#06c755]/10"
                id="simulator-share-cta"
              >
                <LucideIcon name="MessageCircle" size={16} className="fill-white text-white" />
                <span>LINEでこの希望を相談する</span>
              </button>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
