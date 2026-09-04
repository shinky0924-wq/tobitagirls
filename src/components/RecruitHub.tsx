/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import LucideIcon from './LucideIcon';

interface RecruitHubProps {
  onScrollToSection: (sectionId: string) => void;
  onNavigateToArticle?: (slug: string) => void;
  onNavigateToBlog?: () => void;
}

export default function RecruitHub({ onScrollToSection, onNavigateToArticle, onNavigateToBlog }: RecruitHubProps) {
  const hubCategories = [
    {
      id: 'hub-job',
      number: '01',
      emoji: '🍵',
      title: '仕事内容',
      badge: '初心者安心',
      icon: 'HeartHandshake',
      color: 'from-pink-500 to-rose-500',
      image: '/images/tobita_job_guide_tea_1788153000519.jpg',
      description: '料亭での接客・お茶出し・ご案内の具体的な流れ。お酒不要・営業連絡なしの安心ルールを解説。',
      targetSection: 'jobs',
      relatedSlug: 'tobita-job-guide',
      relatedLabel: '仕事内容・1日の流れ解説'
    },
    {
      id: 'hub-salary',
      number: '02',
      emoji: '💰',
      title: '給料・日払い',
      badge: '即日手渡し',
      icon: 'Coins',
      color: 'from-amber-500 to-orange-500',
      image: '/images/tobita_salary_calculator_1788153012478.jpg',
      description: '50%バック即日全額日払いの仕組み。日給3万〜10万円の計算式と天引きなしの透明な報酬体系。',
      targetSection: 'jobs',
      relatedSlug: 'tobita-salary-system',
      relatedLabel: '給料システムと計算式'
    },
    {
      id: 'hub-requirement',
      number: '03',
      emoji: '🪪',
      title: '応募条件・年齢',
      badge: '18歳以上',
      icon: 'CheckCircle2',
      color: 'from-emerald-500 to-teal-500',
      image: '/images/tobita_doc_checklist_1788153025641.jpg',
      description: '18歳以上の女性（高校生不可）。必要な身分証明書や採用基準、体型・容姿の疑問に回答。',
      targetSection: 'faq',
      relatedSlug: 'tobita-first-guide',
      relatedLabel: '応募資格・面接の必要書類'
    },
    {
      id: 'hub-beginner',
      number: '04',
      emoji: '🔰',
      title: '未経験スタート',
      badge: '90%が未経験',
      icon: 'Sparkles',
      color: 'from-purple-500 to-indigo-500',
      image: '/images/tobita_beginner_support_1788153037569.jpg',
      description: '夜職・接客未経験でも安心。事前のマナー講習、仲居さんのフォロー、初日の緊張をほぐすコツ。',
      targetSection: 'concerns',
      relatedSlug: 'tobita-beginner-guide',
      relatedLabel: '未経験向け完全ガイド'
    },
    {
      id: 'hub-twenties',
      number: '05',
      emoji: '🤫',
      title: '身バレ対策',
      badge: '副業バレ対策',
      icon: 'Briefcase',
      color: 'from-blue-500 to-cyan-500',
      image: '/images/tobita_wwork_privacy_1788153051081.jpg',
      description: '昼職OL・学生の掛け持ち事情。住民税の普通徴収で会社や知人にバレずに効率よく高収入。',
      targetSection: 'concerns',
      relatedSlug: 'tobita-w-work-secret',
      relatedLabel: '会社・知人にバレない副業対策'
    },
    {
      id: 'hub-shift',
      number: '06',
      emoji: '⏰',
      title: '勤務時間・シフト',
      badge: '完全自由出勤',
      icon: 'Clock',
      color: 'from-rose-400 to-pink-600',
      image: '/images/tobita_shift_schedule_1788153063163.jpg',
      description: '10:00〜24:00の自由シフト。週1日・短時間・月1回・短期・単発など、ライフスタイルに合わせて稼働。',
      targetSection: 'jobs',
      relatedSlug: 'tobita-weekend-shift',
      relatedLabel: 'シフト・短時間勤務の働き方'
    },
    {
      id: 'hub-streets',
      number: '07',
      emoji: '🏮',
      title: 'お店・通り選び',
      badge: '通り別特徴',
      icon: 'MapPin',
      color: 'from-violet-500 to-fuchsia-500',
      image: '/images/tobita_street_lanterns_1788153077449.jpg',
      description: 'メイン通り・青春通り・大門通り・妖怪通りの違い。客層や好まれるタイプの比較とお勧め店選び。',
      targetSection: 'reasons',
      relatedSlug: 'tobita-street-compare',
      relatedLabel: 'メイン通り・青春通りの比較'
    },
    {
      id: 'hub-interview',
      number: '08',
      emoji: '🌸',
      title: '面接・体験入店',
      badge: '履歴書不要',
      icon: 'CalendarCheck',
      color: 'from-teal-500 to-emerald-600',
      image: '/images/tobita_trial_interview_1788153091611.jpg',
      description: '女性スタッフ同行の面接見学。私服OK・即日体入・全額日払いで雰囲気を確かめてから本入店可能。',
      targetSection: 'flow',
      relatedSlug: 'tobita-trial-guide',
      relatedLabel: '体験入店と面接の流れ'
    },
    {
      id: 'hub-dorm',
      number: '09',
      emoji: '🏠',
      title: '個室寮・出稼ぎ',
      badge: '家具家電付き',
      icon: 'Building2',
      color: 'from-sky-500 to-blue-600',
      image: '/images/tobita_luxury_room_1788153103866.jpg',
      description: 'オートロック完備の個室マンション寮（1日1,000円〜）。地方からの来阪・引っ越し初期費用0円サポート。',
      targetSection: 'reasons',
      relatedSlug: 'tobita-luxury-dorm',
      relatedLabel: 'マンション寮と生活支援'
    },
    {
      id: 'hub-faq',
      number: '10',
      emoji: '💡',
      title: 'よくある質問',
      badge: '疑問を即解決',
      icon: 'HelpCircle',
      color: 'from-amber-600 to-rose-500',
      image: '/images/tobita_security_shield_1788153117089.jpg',
      description: '身バレ・生理・お酒・ノルマなど、応募前に女の子から寄せられる100以上の疑問に本音で回答。',
      targetSection: 'faq',
      relatedSlug: 'tobita-safe-recruitment',
      relatedLabel: '安全管理・FAQ特集'
    },
  ];

  return (
    <section className="py-12 md:py-20 bg-gradient-to-b from-white via-rose-50/30 to-white relative" id="recruit-hub">
      <div className="max-w-[1100px] mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 md:mb-14">
          <div className="inline-flex items-center gap-1.5 bg-rose-100/80 text-secondary text-xs font-black px-3.5 py-1 rounded-full mb-3 shadow-xs">
            <LucideIcon name="Compass" size={13} />
            <span>SEARCH INTENT HUB</span>
          </div>
          
          <h2 className="font-display font-extrabold text-2xl md:text-4xl text-on-surface leading-tight mb-4">
            飛田新地で働きたい女性へ<br />
            <span className="text-secondary bg-clip-text">知りたい情報から探す求人総合ガイド</span>
          </h2>
          
          <p className="font-sans text-xs md:text-sm text-on-surface-variant leading-relaxed">
            飛田新地の仕事内容・給与・応募条件・未経験採用・お店選び・寮生活まで、求人に関するすべての疑問を網羅。気になるトピックからご覧ください。
          </p>
        </div>

        {/* 10 Topic Hub Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5 md:gap-4 mb-10">
          {hubCategories.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: idx * 0.04 }}
              onClick={() => {
                if (item.relatedSlug && onNavigateToArticle) {
                  onNavigateToArticle(item.relatedSlug);
                } else {
                  onScrollToSection(item.targetSection);
                }
              }}
              className="bg-white rounded-2xl overflow-hidden border border-rose-100/80 shadow-[0_2px_10px_-3px_rgba(210,84,123,0.06)] hover:shadow-xl hover:border-secondary/40 transition-all flex flex-col justify-between group hover:-translate-y-1 cursor-pointer"
            >
              <div>
                {/* Photo Thumbnail */}
                <div className="relative w-full h-24 overflow-hidden bg-rose-50">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    decoding="async"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                  
                  {/* Number & Badge Over Image */}
                  <div className="absolute top-2 left-2 flex items-center gap-1.5">
                    <span className="font-mono font-black text-[10px] bg-white/90 text-secondary px-1.5 py-0.5 rounded shadow-xs">
                      {item.number}
                    </span>
                  </div>
                  
                  <div className="absolute top-2 right-2">
                    <span className="text-[10px] font-bold bg-white/95 text-secondary px-2 py-0.5 rounded-full shadow-xs border border-rose-100/80 whitespace-nowrap flex items-center gap-1">
                      <span>{item.emoji}</span>
                      <span>{item.badge}</span>
                    </span>
                  </div>
                </div>

                <div className="p-3.5 pb-1">
                  {/* Title & Emoji */}
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <div className="w-6 h-6 rounded-md bg-rose-50 flex items-center justify-center text-sm shrink-0 border border-rose-100/60 group-hover:bg-secondary group-hover:border-secondary transition-colors">
                      <span className="leading-none">{item.emoji}</span>
                    </div>
                    <h3 className="font-display font-bold text-xs md:text-sm text-gray-800 group-hover:text-secondary transition-colors truncate">
                      {item.title}
                    </h3>
                  </div>

                  {/* Description */}
                  <p className="font-sans text-[11px] text-on-surface-variant/90 leading-relaxed mb-2.5 line-clamp-2">
                    {item.description}
                  </p>
                </div>
              </div>

              {/* Action Link (Direct to Column) */}
              <div className="p-3.5 pt-2 border-t border-rose-50">
                {item.relatedSlug && onNavigateToArticle ? (
                  <div
                    className="w-full text-left font-sans text-xs font-bold text-secondary group-hover:text-white group-hover:bg-secondary flex items-center justify-between py-1.5 px-2.5 transition-all bg-rose-50/80 rounded-lg"
                    id={`hub-article-${item.id}`}
                  >
                    <span className="truncate">{item.emoji} {item.relatedLabel}</span>
                    <LucideIcon name="ChevronRight" size={13} className="shrink-0 text-secondary group-hover:text-inherit" />
                  </div>
                ) : (
                  <div
                    className="w-full text-left font-sans text-xs font-bold text-secondary group-hover:text-white group-hover:bg-secondary flex items-center justify-between py-1.5 px-2.5 transition-all bg-rose-50/80 rounded-lg"
                    id={`hub-scroll-${item.id}`}
                  >
                    <span>{item.emoji} 詳しく見る</span>
                    <LucideIcon name="ChevronRight" size={13} className="shrink-0" />
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Primary Job Spec Table (一次情報の明示) */}
        <div className="bg-white rounded-3xl p-6 md:p-8 border border-rose-100 shadow-md mb-8" id="primary-job-table">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-rose-100 mb-6">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="bg-secondary text-white text-[10px] font-black px-2 py-0.5 rounded-full">一次情報</span>
                <h3 className="font-display font-bold text-base md:text-lg text-on-surface">
                  飛田新地 料亭キャスト 募集要項・最新採用スペック
                </h3>
              </div>
              <p className="text-xs text-on-surface-variant">
                料亭組合規約および雇用契約基準に完全準拠した正確な現場条件です。
              </p>
            </div>
            <div className="text-xs text-gray-500 font-mono flex items-center gap-1">
              <LucideIcon name="RefreshCw" size={12} className="text-secondary" />
              <span>最終情報更新：2026年8月31日</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
            <div className="p-3.5 bg-rose-50/40 rounded-xl border border-rose-100/50">
              <span className="text-[10px] text-gray-500 font-bold block mb-1">給与・報酬体系</span>
              <p className="font-bold text-gray-800 text-sm">日給 30,000円〜100,000円+</p>
              <p className="text-[10px] text-secondary font-semibold mt-0.5">バック率50%・即日全額日払い</p>
            </div>

            <div className="p-3.5 bg-rose-50/40 rounded-xl border border-rose-100/50">
              <span className="text-[10px] text-gray-500 font-bold block mb-1">勤務地・最寄り駅</span>
              <p className="font-bold text-gray-800 text-sm">大阪市西成区山王（飛田新地）</p>
              <p className="text-[10px] text-gray-600 mt-0.5">動物園前駅・天王寺駅 徒歩圏内</p>
            </div>

            <div className="p-3.5 bg-rose-50/40 rounded-xl border border-rose-100/50">
              <span className="text-[10px] text-gray-500 font-bold block mb-1">勤務シフト・時間</span>
              <p className="font-bold text-gray-800 text-sm">10:00〜24:00（自由出勤制）</p>
              <p className="text-[10px] text-gray-600 mt-0.5">週1日〜・短時間・短期・単発OK</p>
            </div>

            <div className="p-3.5 bg-rose-50/40 rounded-xl border border-rose-100/50">
              <span className="text-[10px] text-gray-500 font-bold block mb-1">応募資格・待遇</span>
              <p className="font-bold text-gray-800 text-sm">18歳以上（高校生不可）</p>
              <p className="text-[10px] text-secondary font-semibold mt-0.5">家具家電付き個室寮・衣装無料</p>
            </div>
          </div>
        </div>

        {/* View All Blog Link */}
        {onNavigateToBlog && (
          <div className="text-center">
            <button
              onClick={onNavigateToBlog}
              className="inline-flex items-center gap-2 text-xs md:text-sm font-extrabold text-secondary hover:text-[#a13762] bg-white border border-rose-200 px-6 py-2.5 rounded-full shadow-xs hover:shadow-md transition-all cursor-pointer"
              id="recruit-hub-all-blog-btn"
            >
              <LucideIcon name="BookOpen" size={14} />
              <span>お仕事コラム・解説記事一覧（全記事）を見る</span>
              <LucideIcon name="ChevronRight" size={14} />
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
