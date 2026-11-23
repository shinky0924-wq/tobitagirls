/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { LINE_OFFICIAL_URL } from '../data';
import { SiteContent } from '../siteContent';
import LucideIcon from './LucideIcon';

interface LineCtaSectionProps {
  content?: SiteContent['consultation'];
}

const CONSULTATION_TEMPLATE = `飛田ガールズの求人を見ました。
・年齢（満20歳以上・例：20代前半）：
・ご経験（未経験／経験あり）：
・相談したいこと（仕事内容／お給料／シフト・働き方／お店見学など）：`;

export default function LineCtaSection(_props: LineCtaSectionProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyTemplate = async () => {
    try {
      await navigator.clipboard.writeText(CONSULTATION_TEMPLATE);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(false);
    }
  };

  return (
    <section
      className="py-16 md:py-24 bg-surface-container/60 border-b border-outline-variant/60"
      id="consultation"
      aria-labelledby="consultation-heading"
    >
      <div className="max-w-[1040px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-outline-variant p-6 sm:p-10 md:p-12 shadow-sm">
          <div className="max-w-2xl mx-auto text-center space-y-4">
            <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest text-primary uppercase">
              <span className="w-4 h-px bg-primary" aria-hidden="true" />
              <span>LINE CONSULTATION</span>
              <span className="w-4 h-px bg-primary" aria-hidden="true" />
            </div>

            <h2
              id="consultation-heading"
              className="font-display font-bold text-2xl sm:text-3xl md:text-4xl text-on-surface leading-snug text-balance"
            >
              まずはLINEで気軽に相談してみませんか？
            </h2>

            <p className="text-sm sm:text-base text-on-surface-variant leading-relaxed">
              「仕事内容についてもう少し確認したい」「自分の希望する曜日で働けるか相談したい」「実際の雰囲気を見学してみたい」など、応募を迷っている段階でもそのままお送りください。
            </p>
          </div>

          {/* 4 Clear Consultation Topics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-8">
            <div className="bg-surface rounded-xl border border-outline-variant p-3.5 text-center space-y-1">
              <div className="text-xs font-bold text-primary">相談だけでもOK</div>
              <p className="text-xs text-on-surface-variant">応募前の質問・条件確認のみ歓迎</p>
            </div>
            <div className="bg-surface rounded-xl border border-outline-variant p-3.5 text-center space-y-1">
              <div className="text-xs font-bold text-primary">見学・説明の予約</div>
              <p className="text-xs text-on-surface-variant">私服で控室や雰囲気を事前に見学</p>
            </div>
            <div className="bg-surface rounded-xl border border-outline-variant p-3.5 text-center space-y-1">
              <div className="text-xs font-bold text-primary">匿名・写真送信不要</div>
              <p className="text-xs text-on-surface-variant">相談段階で本名・顔写真は不要</p>
            </div>
            <div className="bg-surface rounded-xl border border-outline-variant p-3.5 text-center space-y-1">
              <div className="text-xs font-bold text-primary">満20歳以上・高校生不可</div>
              <p className="text-xs text-on-surface-variant">無理な勧誘や引き止めは行いません</p>
            </div>
          </div>

          {/* Copyable Message Template */}
          <div className="mt-8 max-w-xl mx-auto bg-surface-container-low rounded-2xl border border-outline-variant p-4 sm:p-5 space-y-3">
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs font-bold text-on-surface flex items-center gap-1.5">
                <LucideIcon name="MessageSquare" size={14} className="text-primary" />
                <span>そのまま送れる相談テンプレート（任意）</span>
              </span>
              <button
                type="button"
                onClick={handleCopyTemplate}
                className="inline-flex items-center gap-1 text-xs font-bold text-secondary hover:text-primary bg-white px-3 py-1.5 rounded-lg border border-outline-variant transition-colors cursor-pointer"
              >
                <LucideIcon name={copied ? 'Check' : 'Copy'} size={13} />
                <span>{copied ? 'コピーしました' : '文章をコピー'}</span>
              </button>
            </div>
            <pre className="text-xs text-on-surface-variant font-sans whitespace-pre-wrap leading-relaxed bg-white rounded-xl border border-outline-variant/70 p-3">
              {CONSULTATION_TEMPLATE}
            </pre>
          </div>

          {/* Main LINE CTA & Clear Time Separation */}
          <div className="mt-8 text-center space-y-3">
            <a
              href={LINE_OFFICIAL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 bg-[#06C755] hover:bg-[#05b34c] text-white font-bold text-base px-8 py-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer w-full sm:w-auto min-h-[52px]"
            >
              <LucideIcon name="MessageCircle" size={22} className="text-white" />
              <span>LINEで無料相談する</span>
              <LucideIcon name="ArrowRight" size={18} />
            </a>

            <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-xs text-on-surface-variant tabular-nums">
              <span>LINEメッセージ受付：24時間</span>
              <span className="text-outline-variant" aria-hidden="true">/</span>
              <span>スタッフ返信時間：10:00〜24:00（順次対応）</span>
            </div>
          </div>
        </div>

        {/* 4 Bottom Supplements */}
        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-3.5 text-center">
          <div className="bg-white rounded-2xl p-4 border border-outline-variant">
            <div className="w-8 h-8 rounded-full bg-surface-container text-primary flex items-center justify-center mx-auto mb-2">
              <LucideIcon name="Building2" size={18} />
            </div>
            <div className="font-bold text-xs text-on-surface">料亭直営の公式窓口</div>
            <div className="text-[11px] text-on-surface-variant mt-1">紹介手数料・仲介料なし</div>
          </div>

          <div className="bg-white rounded-2xl p-4 border border-outline-variant">
            <div className="w-8 h-8 rounded-full bg-surface-container text-primary flex items-center justify-center mx-auto mb-2">
              <LucideIcon name="ShieldCheck" size={18} />
            </div>
            <div className="font-bold text-xs text-on-surface">満20歳以上限定</div>
            <div className="text-[11px] text-on-surface-variant mt-1">高校生不可・年齢確認徹底</div>
          </div>

          <div className="bg-white rounded-2xl p-4 border border-outline-variant">
            <div className="w-8 h-8 rounded-full bg-surface-container text-primary flex items-center justify-center mx-auto mb-2">
              <LucideIcon name="Lock" size={18} />
            </div>
            <div className="font-bold text-xs text-on-surface">プライバシー配慮</div>
            <div className="text-[11px] text-on-surface-variant mt-1">顔写真非掲載・源氏名勤務</div>
          </div>

          <div className="bg-white rounded-2xl p-4 border border-outline-variant">
            <div className="w-8 h-8 rounded-full bg-surface-container text-primary flex items-center justify-center mx-auto mb-2">
              <LucideIcon name="Banknote" size={18} />
            </div>
            <div className="font-bold text-xs text-on-surface">売上50％・現金日払い</div>
            <div className="text-[11px] text-on-surface-variant mt-1">退勤時にその場で全額手渡し</div>
          </div>
        </div>
      </div>
    </section>
  );
}
