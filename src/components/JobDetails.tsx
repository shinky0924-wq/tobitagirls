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
  onNavigateRequirements?: () => void;
}

export default function JobDetails({ content, onCtaclickWithData, onNavigateRequirements }: JobDetailsProps) {
  const subtitleText = (!content?.subtitle || content.subtitle.includes('SALARY & INFO')) 
    ? 'RECRUIT REQUIREMENTS' 
    : content.subtitle;

  const infoSubtitleText = (!content?.infoSubtitle || content.infoSubtitle.includes('お店の種類や稼働条件により変動'))
    ? '※シフトや稼働条件に応じて日給3万〜8万円以上可能です'
    : content.infoSubtitle;

  return (
    <section className="py-16 md:py-20 bg-white" id="requirements">
      <div id="jobs" className="max-w-[1100px] mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6 mb-10">
          <div>
            <span className="text-secondary font-display font-bold tracking-widest text-xs md:text-sm block mb-2 uppercase">
              {subtitleText}
            </span>
            <h2 className="font-display font-extrabold text-2xl md:text-3xl lg:text-4xl text-on-surface">
              募集要項
            </h2>
            <p className="text-xs md:text-sm text-on-surface-variant font-medium mt-2">
              {infoSubtitleText}
            </p>
          </div>

          {onNavigateRequirements && (
            <button
              type="button"
              onClick={onNavigateRequirements}
              className="self-start md:self-auto bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold px-5 py-2.5 rounded-xl shadow-xs transition-all flex items-center gap-1.5 cursor-pointer hover:shadow-md shrink-0"
            >
              <LucideIcon name="FileText" size={14} />
              <span>募集要項の詳細を見る</span>
              <LucideIcon name="ChevronRight" size={13} />
            </button>
          )}
        </div>

        {/* 4-Column Primary Specification Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs mb-8">
          <div className="p-4 bg-rose-50/40 rounded-2xl border border-rose-100/70 shadow-2xs">
            <span className="text-[10px] text-zinc-500 font-bold block mb-1">給与システム</span>
            <p className="font-bold text-zinc-900 text-base">15分5000円</p>
            <p className="text-[11px] text-rose-600 font-bold mt-1">売上50%完全バック・即日全額日払い</p>
          </div>
          <div className="p-4 bg-rose-50/40 rounded-2xl border border-rose-100/70 shadow-2xs">
            <span className="text-[10px] text-zinc-500 font-bold block mb-1">応募資格</span>
            <p className="font-bold text-zinc-900 text-base">20歳以上の女性</p>
            <p className="text-[11px] text-rose-600 font-bold mt-1">※組合規約により20歳未満不可</p>
          </div>
          <div className="p-4 bg-rose-50/40 rounded-2xl border border-rose-100/70 shadow-2xs">
            <span className="text-[10px] text-zinc-500 font-bold block mb-1">勤務シフト</span>
            <p className="font-bold text-zinc-900 text-base">選べる5大シフト</p>
            <p className="text-[11px] text-zinc-600 mt-1">10〜16時 / 10〜17時 / 17〜24時 / 14〜24時 / 12〜24時</p>
          </div>
          <div className="p-4 bg-rose-50/40 rounded-2xl border border-rose-100/70 shadow-2xs">
            <span className="text-[10px] text-zinc-500 font-bold block mb-1">身バレ・安全対策</span>
            <p className="font-bold text-zinc-900 text-base">ネット写真ゼロ (100%)</p>
            <p className="text-[11px] text-emerald-600 font-bold mt-1">完全源氏名・街全体撮影禁止</p>
          </div>
        </div>

        {/* Job Content Highlight: 玄関で笑顔で手を振ってお迎え＆お部屋でサービス */}
        <div className="mb-12 p-5 sm:p-7 rounded-3xl bg-gradient-to-br from-rose-50/90 via-pink-50/40 to-white border border-rose-200/90 shadow-xs">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-5 pb-4 border-b border-rose-100">
            <div>
              <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                <span className="inline-flex items-center gap-1 bg-rose-600 text-white text-[11px] font-black px-2.5 py-0.5 rounded-full shadow-2xs">
                  <LucideIcon name="Sparkles" size={12} />
                  実際のお仕事内容
                </span>
                <span className="text-xs font-bold text-rose-800">未経験でも安心のシンプルなおもてなし</span>
              </div>
              <h3 className="font-display font-extrabold text-lg sm:text-2xl text-zinc-900 leading-snug">
                玄関で笑顔で手を振ってお迎え＆お部屋でサービス！
                <span className="text-rose-600 block sm:inline sm:ml-2 text-base sm:text-xl font-bold">
                  声掛けや呼び込みは仲居さんにお任せ
                </span>
              </h3>
            </div>
            <div className="self-start md:self-auto shrink-0 bg-white px-3.5 py-1.5 rounded-xl border border-rose-200 text-xs text-rose-700 font-bold shadow-2xs">
              お酒一切不要・営業LINEゼロ
            </div>
          </div>

          <p className="text-xs sm:text-sm text-zinc-700 leading-relaxed mb-6 font-medium">
            飛田新地の料亭接客は、可愛い衣装（浴衣やドレス）を着て玄関の上がり框（座敷）にちょこんと座り、通りを歩くお客様に笑顔で手を振ってお迎えすることから始まります。呼び込みや客引きはお隣に座るベテランの仲居さん（おばちゃん）が全て行うため、女の子が声を張ったり営業トークをする必要は一切ありません。入店が決まったらお部屋でお茶やお菓子をお出しし、15〜20分の和やかなおもてなしサービスを行います。
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="bg-white p-4 sm:p-5 rounded-2xl border border-rose-100 shadow-2xs flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2.5">
                  <span className="w-6 h-6 rounded-full bg-rose-600 text-white font-black text-xs flex items-center justify-center shrink-0">1</span>
                  <h4 className="font-bold text-zinc-900 text-sm">玄関で座って笑顔で手を振る</h4>
                </div>
                <p className="text-zinc-600 leading-relaxed text-xs">
                  ライトアップされた玄関の上がり框に座ります。前を通るお客様と目が合ったら、にこっと笑顔で手を振ったり優しく会釈してお迎えします。
                </p>
              </div>
              <div className="mt-3 pt-3 border-t border-rose-50 text-[11px] text-rose-700 font-bold">
                ※無理に声を出す必要はありません
              </div>
            </div>

            <div className="bg-white p-4 sm:p-5 rounded-2xl border border-rose-100 shadow-2xs flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2.5">
                  <span className="w-6 h-6 rounded-full bg-rose-600 text-white font-black text-xs flex items-center justify-center shrink-0">2</span>
                  <h4 className="font-bold text-zinc-900 text-sm">呼び込み・客引きは仲居さん</h4>
                </div>
                <p className="text-zinc-600 leading-relaxed text-xs">
                  「お兄さん寄ってって〜」などの通りへの声掛けや料金のご案内は、お隣の仲居さん（おばちゃん）が巧みな話術で全て代行してくれます。
                </p>
              </div>
              <div className="mt-3 pt-3 border-t border-rose-50 text-[11px] text-emerald-700 font-bold">
                ※女の子の客引き営業ノルマはゼロ
              </div>
            </div>

            <div className="bg-white p-4 sm:p-5 rounded-2xl border border-rose-100 shadow-2xs flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2.5">
                  <span className="w-6 h-6 rounded-full bg-rose-600 text-white font-black text-xs flex items-center justify-center shrink-0">3</span>
                  <h4 className="font-bold text-zinc-900 text-sm">15〜20分のおもてなしサービス</h4>
                </div>
                <p className="text-zinc-600 leading-relaxed text-xs">
                  入店が決まったらお部屋（2階個室）へご案内。お茶やお菓子をお出しし、世間話をしながら過ごすおもてなしサービス。お酒不要＆時間通りきっちり終了。
                </p>
              </div>
              <div className="mt-3 pt-3 border-t border-rose-50 text-[11px] text-rose-700 font-bold">
                ※重労働のお風呂掃除なども一切なし
              </div>
            </div>
          </div>
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

      </div>
    </section>
  );
}
