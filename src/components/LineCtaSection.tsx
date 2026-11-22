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
・年齢（例：20代前半）：
・ご経験（未経験／経験あり）：
・気になること（仕事内容／給料／勤務時間／身バレ対策など）：`;

export default function LineCtaSection({ content }: LineCtaSectionProps) {
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
      className="py-16 sm:py-24 bg-surface-container/70"
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
              {content?.title || 'まずはLINEでお気軽にご相談ください'}
            </h2>

            <p className="text-sm sm:text-base text-on-surface-variant leading-relaxed">
              {content?.description ||
                '応募するかまだ決めていない段階でも大丈夫です。「どんなお仕事かもう少し詳しく知りたい」「今の状況で働けるか相談したい」など、女性スタッフが丁寧にお答えします。'}
            </p>
          </div>

          {/* 4 Honest Promises */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-8">
            <div className="bg-surface rounded-xl border border-outline-variant p-3.5 text-center space-y-1">
              <div className="text-xs font-bold text-primary">相談無料</div>
              <p className="text-xs text-on-surface-variant">登録料や紹介料などは一切不要</p>
            </div>
            <div className="bg-surface rounded-xl border border-outline-variant p-3.5 text-center space-y-1">
              <div className="text-xs font-bold text-primary">24時間メッセージ受付</div>
              <p className="text-xs text-on-surface-variant">営業時間10:00〜24:00に順次ご返信</p>
            </div>
            <div className="bg-surface rounded-xl border border-outline-variant p-3.5 text-center space-y-1">
              <div className="text-xs font-bold text-primary">匿名・質問のみOK</div>
              <p className="text-xs text-on-surface-variant">本名や顔写真の送信は不要です</p>
            </div>
            <div className="bg-surface rounded-xl border border-outline-variant p-3.5 text-center space-y-1">
              <div className="text-xs font-bold text-primary">無理な勧誘なし</div>
              <p className="text-xs text-on-surface-variant">見学や相談だけで終了しても問題ありません</p>
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

          {/* Main LINE CTA */}
          <div className="mt-8 text-center space-y-2.5">
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
            <p className="text-xs text-on-surface-variant">
              友だち追加後、気になることを一言お送りください
            </p>
          </div>
        </div>

        {/* 4 Bottom Trust Summary Cards */}
        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-3.5 text-center">
          <div className="bg-white rounded-2xl p-4 border border-outline-variant">
            <div className="w-8 h-8 rounded-full bg-surface-container text-primary flex items-center justify-center mx-auto mb-2">
              <LucideIcon name="ShieldCheck" size={18} />
            </div>
            <div className="font-bold text-xs text-on-surface">満20歳以上限定・法令遵守</div>
            <div className="text-[11px] text-on-surface-variant mt-1">20歳未満就労禁止・年齢確認徹底</div>
          </div>

          <div className="bg-white rounded-2xl p-4 border border-outline-variant">
            <div className="w-8 h-8 rounded-full bg-surface-container text-primary flex items-center justify-center mx-auto mb-2">
              <LucideIcon name="Building2" size={18} />
            </div>
            <div className="font-bold text-xs text-on-surface">料亭直営の直接採用</div>
            <div className="text-[11px] text-on-surface-variant mt-1">紹介手数料・仲介マージン0円</div>
          </div>

          <div className="bg-white rounded-2xl p-4 border border-outline-variant">
            <div className="w-8 h-8 rounded-full bg-surface-container text-primary flex items-center justify-center mx-auto mb-2">
              <LucideIcon name="Lock" size={18} />
            </div>
            <div className="font-bold text-xs text-on-surface">身バレ・プライバシー配慮</div>
            <div className="text-[11px] text-on-surface-variant mt-1">WEB写真非公開・住民税普通徴収案内</div>
          </div>

          <div className="bg-white rounded-2xl p-4 border border-outline-variant">
            <div className="w-8 h-8 rounded-full bg-surface-container text-primary flex items-center justify-center mx-auto mb-2">
              <LucideIcon name="Banknote" size={18} />
            </div>
            <div className="font-bold text-xs text-on-surface">売上50％・即日現金日払い</div>
            <div className="text-[11px] text-on-surface-variant mt-1">1日体験入店のみでも全額手渡し</div>
          </div>
        </div>
      </div>
    </section>
  );
}
