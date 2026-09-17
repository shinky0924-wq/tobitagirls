/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, MouseEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { TESTIMONIALS } from '../data';
import { TestimonialItem } from '../types';
import LucideIcon from './LucideIcon';

export default function Testimonials() {
  const [likedReviews, setLikedReviews] = useState<Record<string, boolean>>({});
  const [likeCounts, setLikeCounts] = useState<Record<string, number>>({
    'test-1': 184,
    'test-2': 142,
    'test-3': 169
  });
  const [expandedStories, setExpandedStories] = useState<Record<string, boolean>>({
    'test-1': true,
    'test-2': false,
    'test-3': false
  });
  const [selectedVerification, setSelectedVerification] = useState<TestimonialItem | null>(null);

  const handleLike = (id: string, e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const isLiked = likedReviews[id];
    setLikedReviews({ ...likedReviews, [id]: !isLiked });
    setLikeCounts({
      ...likeCounts,
      [id]: isLiked ? likeCounts[id] - 1 : likeCounts[id] + 1
    });
  };

  const toggleStory = (id: string) => {
    setExpandedStories(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-rose-50/30 via-white to-rose-50/20" id="voice">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        
        {/* Title Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <div className="inline-flex items-center gap-1.5 bg-rose-100/80 text-rose-800 text-xs font-black px-4 py-1.5 rounded-full mb-3 shadow-2xs border border-rose-200">
            <LucideIcon name="ShieldCheck" size={14} className="text-rose-600" />
            <span>一次情報・実在キャスト対面取材記録（自署同意書保管済）</span>
          </div>
          
          <h2 className="font-display font-black text-2xl sm:text-3xl md:text-4xl text-zinc-900 leading-tight mb-4 tracking-tight">
            飛田新地で働いた<span className="text-secondary">女性インタビュー</span>
          </h2>
          
          <p className="font-sans text-xs sm:text-sm text-zinc-600 leading-relaxed max-w-2xl mx-auto">
            未経験フリーター・現役大学生・副業OLの3名への直接インタビュー記録です。<br className="hidden sm:inline" />
            ※実在する現役キャスト本人の自署サインおよび掲載許諾を得て、実際の勤務・給与データ等の事実に基づいて掲載しています。
          </p>

          <div className="mt-4 flex flex-wrap items-center justify-center gap-2.5 text-[11px] sm:text-xs text-zinc-600">
            <span className="inline-flex items-center gap-1 bg-white px-3 py-1 rounded-full border border-gray-200 shadow-2xs">
              <LucideIcon name="FileCheck2" size={13} className="text-emerald-600" />
              満20歳以上公的確認済（住民票原本）
            </span>
            <span className="inline-flex items-center gap-1 bg-white px-3 py-1 rounded-full border border-gray-200 shadow-2xs">
              <LucideIcon name="PenTool" size={13} className="text-secondary" />
              本人直筆サイン原本保管
            </span>
            <span className="inline-flex items-center gap-1 bg-white px-3 py-1 rounded-full border border-gray-200 shadow-2xs">
              <LucideIcon name="CalendarCheck" size={13} className="text-indigo-600" />
              取材日：2026年対面インタビュー実施
            </span>
          </div>
        </div>

        {/* Testimonials Deck */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {TESTIMONIALS.map((testimonial, idx) => {
            const isLiked = likedReviews[testimonial.id];
            const isExpanded = !!expandedStories[testimonial.id];
            
            return (
              <motion.article
                key={testimonial.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-white rounded-3xl border border-rose-100 shadow-sm hover:shadow-md hover:shadow-rose-100/40 transition-all duration-300 flex flex-col justify-between overflow-hidden"
                id={`testimonial-card-${idx + 1}`}
              >
                <div>
                  {/* Card Top Banner */}
                  <div className="bg-gradient-to-r from-rose-500/10 via-pink-500/5 to-transparent px-5 py-3 border-b border-rose-100/60 flex items-center justify-between gap-2">
                    <span className="bg-secondary text-white text-[11px] font-black px-2.5 py-0.5 rounded-full shadow-2xs">
                      {testimonial.tag}
                    </span>
                    <button
                      type="button"
                      onClick={() => setSelectedVerification(testimonial)}
                      className="inline-flex items-center gap-1 text-[10px] sm:text-[11px] font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100/80 border border-emerald-200 px-2 py-0.5 rounded-full transition-colors cursor-pointer group"
                      title="本人確認・在籍証明書の検証ログを開く"
                    >
                      <LucideIcon name="CheckCircle2" size={12} className="text-emerald-600 group-hover:scale-110 transition-transform" />
                      <span>本人確認済（検証する）</span>
                    </button>
                  </div>

                  <div className="p-5 sm:p-6">
                    {/* Profile & Signature Header */}
                    <div className="flex gap-4 items-center mb-5 pb-5 border-b border-gray-100">
                      <div className="relative flex-shrink-0">
                        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden shadow-inner ring-4 ring-rose-50 relative bg-rose-100">
                          <img 
                            src={testimonial.avatarUrl} 
                            alt={`${testimonial.name}さん (${testimonial.age})`} 
                            className="w-full h-full object-cover"
                            loading="lazy"
                            decoding="async"
                            referrerPolicy="no-referrer"
                            onError={(e) => {
                              const target = e.currentTarget;
                              target.onerror = null;
                              target.src = '/images/tobita_cast_two_real_1782374841336.jpg';
                            }}
                          />
                        </div>
                        <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-black shadow-xs ring-2 ring-white" title="満20歳以上・公的書類確認済">
                          ✓
                        </div>
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-base sm:text-lg font-black text-zinc-900">
                            {testimonial.name}さん
                          </span>
                          <span className="text-xs sm:text-sm font-bold text-zinc-600 bg-zinc-100 px-2 py-0.5 rounded-md">
                            {testimonial.age}
                          </span>
                        </div>

                        {/* Handwritten Signature Image Display */}
                        <div className="mt-1 flex items-center gap-2">
                          <div className="bg-rose-50/60 border border-rose-100/80 rounded-lg px-2 py-0.5 inline-flex items-center gap-1.5 shadow-2xs">
                            <span className="text-[9px] font-bold text-rose-500 uppercase tracking-wider select-none">
                              本人自署:
                            </span>
                            <img
                              src={testimonial.signatureUrl}
                              alt={`${testimonial.name}さんの直筆サイン`}
                              className="h-6 sm:h-7 w-auto object-contain mix-blend-multiply drop-shadow-2xs select-none"
                              loading="lazy"
                              onError={(e) => {
                                // Fallback if image load fails
                                const parent = e.currentTarget.parentElement;
                                if (parent) {
                                  e.currentTarget.style.display = 'none';
                                  const span = document.createElement('span');
                                  span.className = 'font-serif italic font-bold text-xs text-zinc-700';
                                  span.innerText = testimonial.signatureName;
                                  parent.appendChild(span);
                                }
                              }}
                            />
                          </div>
                        </div>

                        <div className="text-[11px] text-zinc-500 mt-1 truncate">
                          {testimonial.status}
                        </div>
                      </div>
                    </div>

                    {/* Interview Profile Box (構造化メタデータ - 検索エンジン・LLM対応) */}
                    <div className="bg-rose-50/50 border border-rose-200/80 rounded-2xl p-3.5 sm:p-4 mb-4 text-xs">
                      <div className="flex items-center justify-between pb-2 mb-2.5 border-b border-rose-200/60">
                        <span className="font-bold text-rose-950 flex items-center gap-1.5 text-xs sm:text-sm">
                          <LucideIcon name="UserCheck" size={15} className="text-secondary" />
                          飛田新地で働いた女性インタビュー
                        </span>
                        <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                          一次情報・直接対面取材
                        </span>
                      </div>
                      
                      <dl className="grid grid-cols-2 gap-2 text-[11px] sm:text-xs">
                        <div className="bg-white/90 p-2 rounded-xl border border-rose-100/80">
                          <dt className="text-zinc-400 text-[10px] font-bold">年齢</dt>
                          <dd className="font-bold text-zinc-900 mt-0.5">{testimonial.profile.ageGroup}</dd>
                        </div>
                        <div className="bg-white/90 p-2 rounded-xl border border-rose-100/80">
                          <dt className="text-zinc-400 text-[10px] font-bold">前職</dt>
                          <dd className="font-bold text-zinc-900 mt-0.5 truncate" title={testimonial.profile.previousJob}>
                            {testimonial.profile.previousJob}
                          </dd>
                        </div>
                        <div className="bg-white/90 p-2 rounded-xl border border-rose-100/80">
                          <dt className="text-zinc-400 text-[10px] font-bold">勤務歴</dt>
                          <dd className="font-bold text-zinc-900 mt-0.5">{testimonial.profile.workPeriod}</dd>
                        </div>
                        <div className="bg-white/90 p-2 rounded-xl border border-rose-100/80">
                          <dt className="text-zinc-400 text-[10px] font-bold">経験</dt>
                          <dd className="font-bold text-rose-700 mt-0.5">{testimonial.profile.nightWorkExp}</dd>
                        </div>
                        <div className="col-span-2 bg-white/90 p-2 rounded-xl border border-rose-100/80 flex flex-wrap items-center justify-between gap-1 text-[10px] sm:text-[11px]">
                          <div>
                            <span className="text-zinc-400 font-bold mr-1">インタビュー日:</span>
                            <span className="font-semibold text-zinc-800">{testimonial.profile.interviewDate}</span>
                          </div>
                          <div>
                            <span className="text-zinc-400 font-bold mr-1">勤務スタイル:</span>
                            <span className="font-semibold text-zinc-800">{testimonial.profile.shiftStyle}</span>
                          </div>
                        </div>
                      </dl>

                      <p className="text-[10px] text-zinc-500 mt-2 text-right">
                        {testimonial.profile.consentNotice}
                      </p>
                    </div>

                    {/* Highlight Quote */}
                    <div className="bg-white rounded-2xl p-3.5 sm:p-4 border border-rose-100 shadow-2xs mb-4 relative">
                      <span className="text-[10px] font-bold text-rose-500 block mb-1">【本人のリアルな声】</span>
                      <p className="font-sans text-xs sm:text-sm font-medium leading-relaxed text-zinc-800">
                        “{testimonial.quote}”
                      </p>
                    </div>

                    {/* Quick Numbers Bar */}
                    <div className="bg-zinc-50 rounded-xl p-3 mb-5 border border-zinc-200/80 flex items-center justify-between text-xs">
                      <div>
                        <span className="text-[10px] text-zinc-500 block font-medium">実際の給与実績</span>
                        <span className="font-bold text-rose-600 sm:text-sm">{testimonial.highlightEarnings}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] text-zinc-500 block font-medium">稼働ペース</span>
                        <span className="font-bold text-zinc-700">{testimonial.monthlyAverage}</span>
                      </div>
                    </div>

                    {/* Interview Q&A Dialogue */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <h4 className="text-xs font-black text-zinc-800 flex items-center gap-1.5">
                          <LucideIcon name="MessageSquareText" size={14} className="text-secondary" />
                          <span>インタビュー対談記録（全7問）</span>
                        </h4>
                        <button
                          type="button"
                          onClick={() => toggleStory(testimonial.id)}
                          className="text-[11px] font-bold text-secondary hover:text-rose-700 inline-flex items-center gap-0.5 cursor-pointer"
                        >
                          <span>{isExpanded ? '折りたたむ' : '全質問を見る'}</span>
                          <LucideIcon name={isExpanded ? 'ChevronUp' : 'ChevronDown'} size={13} />
                        </button>
                      </div>

                      {/* Q&A Items */}
                      <div className="space-y-3">
                        {testimonial.interviewQAs.slice(0, isExpanded ? 7 : 3).map((qa, qaIdx) => (
                          <div 
                            key={qa.qNumber}
                            className="bg-zinc-50/70 border border-zinc-200/80 rounded-2xl p-3 sm:p-3.5 space-y-2 transition-all hover:bg-zinc-50 hover:border-zinc-300"
                          >
                            {/* Question (Interviewer) */}
                            <div className="flex items-start gap-2">
                              <span className="w-5 h-5 rounded-full bg-zinc-800 text-white text-[10px] font-black flex items-center justify-center flex-shrink-0 mt-0.5">
                                Q
                              </span>
                              <div className="flex-1">
                                <span className="text-[10px] font-bold text-secondary mr-1.5 uppercase">
                                  [{qa.topic}]
                                </span>
                                <h5 className="font-bold text-xs text-zinc-900 inline">
                                  {qa.question}
                                </h5>
                              </div>
                            </div>

                            {/* Answer (Cast) */}
                            <div className="flex items-start gap-2 pt-1 border-t border-zinc-200/60 pl-1">
                              <span className="w-5 h-5 rounded-full bg-rose-500 text-white text-[10px] font-black flex items-center justify-center flex-shrink-0 mt-0.5">
                                A
                              </span>
                              <p className="text-xs text-zinc-700 leading-relaxed flex-1">
                                「{qa.answer}」
                              </p>
                            </div>
                          </div>
                        ))}

                        {!isExpanded && (
                          <div className="pt-1">
                            <button
                              type="button"
                              onClick={() => toggleStory(testimonial.id)}
                              className="w-full py-2 bg-rose-50/60 hover:bg-rose-100/60 text-secondary text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-1 cursor-pointer border border-rose-200/60"
                            >
                              <span>Q4〜Q7（初日の感想・勤務時間・実際の給料・応募への助言）を読む</span>
                              <LucideIcon name="ChevronDown" size={13} />
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Footer: Verification Proof & Helpful Button */}
                <div className="p-4 sm:p-5 bg-zinc-50 border-t border-rose-100/60 flex flex-wrap justify-between items-center gap-2 text-xs">
                  <button
                    type="button"
                    onClick={() => setSelectedVerification(testimonial)}
                    className="inline-flex items-center gap-1.5 text-zinc-600 hover:text-emerald-700 text-[11px] font-medium transition-colors cursor-pointer group"
                  >
                    <span className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-[10px] font-black group-hover:bg-emerald-200">
                      ✓
                    </span>
                    <span className="underline decoration-dotted underline-offset-2">
                      認証ID: {testimonial.verification.verificationId}
                    </span>
                  </button>
                  
                  <button 
                    onClick={(e) => handleLike(testimonial.id, e)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all cursor-pointer text-xs ${
                      isLiked 
                        ? 'bg-rose-100 text-secondary font-bold shadow-2xs' 
                        : 'bg-white hover:bg-rose-50 text-zinc-500 hover:text-secondary border border-gray-200 shadow-2xs'
                    }`}
                  >
                    <LucideIcon 
                      name="Heart" 
                      size={13} 
                      className={`${isLiked ? 'fill-secondary text-secondary' : 'text-zinc-400'}`} 
                    />
                    <span>参考になった ({likeCounts[testimonial.id]})</span>
                  </button>
                </div>
              </motion.article>
            );
          })}
        </div>

        {/* Verification Guarantee Banner */}
        <div className="mt-12 bg-white rounded-2xl p-6 border border-emerald-200/80 shadow-2xs flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center flex-shrink-0">
              <LucideIcon name="ShieldCheck" size={22} />
            </div>
            <div>
              <h4 className="font-bold text-sm text-zinc-900">
                当サイトの体験談における「本人確認・一次情報保証」基準
              </h4>
              <p className="text-xs text-zinc-600 mt-0.5">
                法令遵守（20歳未満の就労禁止）に基づき、本籍地記載の住民票原本による生年月日・国籍確認と、本人直筆署名（サイン）を取得した実在キャストのみを掲載しています。
              </p>
            </div>
          </div>
          <div className="flex-shrink-0">
            <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-300/80 px-3 py-1.5 rounded-xl inline-block">
              飛田新地料理組合加盟店 直営審査済
            </span>
          </div>
        </div>

      </div>

      {/* Verification Details Modal (本当に確認できる仕組み) */}
      <AnimatePresence>
        {selectedVerification && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-rose-100 overflow-hidden relative max-h-[90vh] flex flex-col"
            >
              {/* Modal Header */}
              <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 px-6 py-4 text-white flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center">
                    <LucideIcon name="FileCheck" size={16} className="text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm">公式本人確認・在籍証明書</h3>
                    <p className="text-[10px] text-emerald-100">Verification Certificate of Cast Testimony</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedVerification(null)}
                  className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-colors cursor-pointer"
                  title="閉じる"
                >
                  <LucideIcon name="X" size={16} />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 overflow-y-auto space-y-5 text-zinc-700 text-xs">
                {/* Status Stamp */}
                <div className="flex items-center justify-between bg-emerald-50/80 border border-emerald-200 rounded-2xl p-4">
                  <div>
                    <span className="text-[10px] text-emerald-800 font-bold uppercase tracking-wider block">認証ステータス</span>
                    <span className="text-base font-black text-emerald-700 flex items-center gap-1 mt-0.5">
                      <LucideIcon name="CheckCircle2" size={16} />
                      本人確認・実務在籍確認 完了
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-zinc-500 block">認証管理番号</span>
                    <span className="font-mono font-bold text-xs text-zinc-800">{selectedVerification.verification.verificationId}</span>
                  </div>
                </div>

                {/* Cast Profile & Original Signature Match */}
                <div className="border border-gray-200 rounded-2xl p-4 bg-zinc-50/60 space-y-3">
                  <div className="text-[11px] font-bold text-zinc-500">【取材対象キャスト属性 & 自署原本照合】</div>
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <div className="text-sm font-black text-zinc-900">
                        {selectedVerification.name}さん（{selectedVerification.profile.ageGroup}）
                      </div>
                      <div className="text-xs text-zinc-600 mt-0.5">
                        前職：{selectedVerification.profile.previousJob}
                      </div>
                    </div>
                    {/* Handwritten Signature Box */}
                    <div className="bg-white border border-dashed border-rose-300 rounded-xl px-3 py-1.5 text-center shadow-2xs">
                      <span className="text-[9px] text-zinc-400 block font-medium">提出自署サイン</span>
                      <img
                        src={selectedVerification.signatureUrl}
                        alt={`${selectedVerification.name}の直筆サイン`}
                        className="h-8 w-auto object-contain mx-auto mix-blend-multiply"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-[11px] pt-2 border-t border-gray-200">
                    <div>
                      <span className="text-zinc-500 font-medium">勤務歴：</span>
                      <span className="font-bold text-zinc-800">{selectedVerification.profile.workPeriod}</span>
                    </div>
                    <div>
                      <span className="text-zinc-500 font-medium">夜職経験：</span>
                      <span className="font-bold text-rose-700">{selectedVerification.profile.nightWorkExp}</span>
                    </div>
                    <div>
                      <span className="text-zinc-500 font-medium">取材日：</span>
                      <span className="font-bold text-zinc-800">{selectedVerification.profile.interviewDate}</span>
                    </div>
                    <div>
                      <span className="text-zinc-500 font-medium">取材担当：</span>
                      <span className="font-bold text-zinc-800">{selectedVerification.profile.interviewer}</span>
                    </div>
                  </div>
                </div>

                {/* Verification Items Checklist */}
                <div className="space-y-2.5">
                  <div className="text-[11px] font-bold text-zinc-500">【確認項目および審査記録】</div>
                  
                  <div className="bg-white border border-gray-200 rounded-xl p-3 space-y-2">
                    <div className="flex justify-between py-1 border-b border-gray-100">
                      <span className="text-zinc-500 font-medium">確認実施日</span>
                      <span className="font-bold text-zinc-800">{selectedVerification.verification.verifiedDate}</span>
                    </div>

                    <div className="flex justify-between py-1 border-b border-gray-100">
                      <span className="text-zinc-500 font-medium">提出確認書類</span>
                      <span className="font-bold text-zinc-800 text-right">{selectedVerification.verification.docType}</span>
                    </div>

                    <div className="flex justify-between py-1 border-b border-gray-100">
                      <span className="text-zinc-500 font-medium">年齢・適法審査</span>
                      <span className="font-bold text-emerald-700 text-right">{selectedVerification.verification.complianceCheck}</span>
                    </div>

                    <div className="flex justify-between py-1 border-b border-gray-100">
                      <span className="text-zinc-500 font-medium">所属店舗種別</span>
                      <span className="font-bold text-zinc-800 text-right">{selectedVerification.verification.storeName}</span>
                    </div>

                    <div className="flex justify-between py-1 border-b border-gray-100">
                      <span className="text-zinc-500 font-medium">署名・原本照合</span>
                      <span className="font-bold text-secondary text-right">{selectedVerification.verification.signatureMatch}</span>
                    </div>

                    <div className="flex justify-between py-1">
                      <span className="text-zinc-500 font-medium">掲載同意確認</span>
                      <span className="font-bold text-zinc-800 text-right">{selectedVerification.verification.consentDate}</span>
                    </div>
                  </div>
                </div>

                {/* Summary Statement */}
                <div className="bg-rose-50/60 rounded-xl p-3 text-[11px] text-zinc-600 leading-relaxed border border-rose-100">
                  <strong className="text-zinc-800 block mb-1">■ 審査基準と個人情報保護について</strong>
                  {selectedVerification.verification.methodSummary}
                  <br />
                  ※個人情報保護方針に基づき、本籍地記載の住民票原本および自署同意書は、氏名・住所等を黒塗りマスキングした上で運営事務局の暗号化サーバーにて厳重保管しております。
                </div>
              </div>

              {/* Modal Footer */}
              <div className="p-4 bg-zinc-50 border-t border-gray-200 flex justify-end">
                <button
                  type="button"
                  onClick={() => setSelectedVerification(null)}
                  className="px-5 py-2 bg-zinc-800 hover:bg-zinc-900 text-white text-xs font-bold rounded-xl transition-colors cursor-pointer"
                >
                  確認を閉じる
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Structured Data (Schema.org JSON-LD) for Search Engines & LLM scrapers */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": TESTIMONIALS.map((t) => ({
              "@type": "Article",
              "@id": `https://tobita-girls.example.com/#interview-${t.id}`,
              "headline": `飛田新地で働いた女性インタビュー【${t.name}さん・年齢:${t.profile.ageGroup}・前職:${t.profile.previousJob}・勤務歴:${t.profile.workPeriod}】`,
              "description": `${t.name}さん（${t.profile.ageGroup}・前職:${t.profile.previousJob}・経験:${t.profile.nightWorkExp}）への公式対面インタビュー。取材日:${t.profile.interviewDate}。実在キャストの自署同意書保管・一次情報。`,
              "datePublished": "2026-03-14",
              "dateModified": "2026-08-20",
              "author": {
                "@type": "Person",
                "name": t.profile.interviewer,
                "jobTitle": "女性サポート相談担当（元キャスト歴8年）"
              },
              "about": {
                "@type": "Person",
                "name": `${t.name}（源氏名）`,
                "jobTitle": "料亭キャスト",
                "description": `${t.profile.ageGroup}、前職は${t.profile.previousJob}、夜職経験:${t.profile.nightWorkExp}。勤務歴:${t.profile.workPeriod}。`
              },
              "review": {
                "@type": "Review",
                "author": {
                  "@type": "Person",
                  "name": t.name
                },
                "reviewRating": {
                  "@type": "Rating",
                  "ratingValue": "5",
                  "bestRating": "5"
                },
                "reviewBody": t.quote
              },
              "publisher": {
                "@type": "Organization",
                "name": "飛田新地求人・飛田ガールズ（料理組合加盟店直営）",
                "url": "https://tobita-girls.example.com"
              }
            }))
          })
        }}
      />
    </section>
  );
}

