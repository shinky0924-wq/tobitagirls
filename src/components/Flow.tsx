/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { SiteContent } from '../siteContent';
import LucideIcon from './LucideIcon';

interface FlowProps {
  content: SiteContent['flow'];
}

const STEP_DETAILS: Record<string, string> = {
  '1': 'まずはLINEの公式アカウントから話しかけるだけでOKです。質問や相談だけでも歓迎しています。',
  '2': '希望のシフト・目標収入・不安に思っていることなどを女性スタッフが丁寧にお伺いします。',
  '3': '私服・履歴書不要でお店の雰囲気や待機室を見学し、報酬やルールの説明を受けられます。',
  '4': '体験入店・勤務を始める場合は、住民票原本（本籍地記載）または日本国パスポート等を確認後、無料衣装に着替えます。',
  '5': '実際に働いてみたうえでお店の相性を確かめられます。退勤時にその日の分を全額現金でお渡しします。',
  '6': '「ここなら安心して働けそう」と納得できた場合にのみ、ご自身のペースでシフトをスタートします。',
};

export default function Flow({ content }: FlowProps) {
  return (
    <section
      className="py-16 sm:py-24 bg-surface border-b border-outline-variant/60"
      id="flow"
      aria-labelledby="flow-heading"
    >
      <div className="max-w-[1160px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest text-primary uppercase">
            <span className="w-4 h-px bg-primary" aria-hidden="true" />
            <span>{content.subtitle || 'ONBOARDING FLOW'}</span>
            <span className="w-4 h-px bg-primary" aria-hidden="true" />
          </div>
          <h2
            id="flow-heading"
            className="font-display font-bold text-2xl sm:text-3xl md:text-4xl text-on-surface leading-snug text-balance"
          >
            {content.title || '応募からお仕事開始まで'}
          </h2>
          <p className="text-sm sm:text-base text-on-surface-variant leading-relaxed">
            相談から見学・体験入店まで、強引な勧誘は一切ありません。ひとつずつ納得したうえで進めていただけます。
          </p>
        </div>

        {/* Step Cards (2x3 grid on desktop, 1-col timeline on mobile) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {content.items.map((step) => (
            <div
              key={step.number}
              id={`flow-step-${step.number}`}
              className="bg-white rounded-2xl border border-outline-variant p-6 flex flex-col gap-3 shadow-2xs"
            >
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-primary bg-surface-container px-3 py-1 rounded-lg border border-outline-variant">
                  <span>STEP</span>
                  <span className="font-mono text-sm">0{step.number}</span>
                </span>
                <LucideIcon name="CheckCircle2" size={17} className="text-primary/60" />
              </div>
              <h3 className="font-display font-bold text-base sm:text-lg text-on-surface leading-snug">
                {step.title}
              </h3>
              <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                {STEP_DETAILS[step.number] || ''}
              </p>
            </div>
          ))}
        </div>

        {/* No-pressure guarantee */}
        <div className="mt-8 bg-white rounded-2xl border border-outline-variant px-5 py-4 flex items-start sm:items-center gap-3 text-xs sm:text-sm text-on-surface-variant">
          <LucideIcon name="ShieldCheck" size={18} className="text-primary shrink-0 mt-0.5 sm:mt-0" />
          <p className="leading-relaxed">
            見学や条件説明を受けたあとに「イメージと違った」「他の環境も見てみたい」と辞退されても、引き止めやキャンセル料・ペナルティなどは一切ございません。
          </p>
        </div>
      </div>
    </section>
  );
}
