/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { SiteContent } from '../siteContent';
import LucideIcon from './LucideIcon';
import { LINE_OFFICIAL_URL } from '../data';

interface FlowProps {
  content?: SiteContent['flow'];
}

interface FlowStep {
  number: string;
  title: string;
  tag: string;
  description: string;
  note: string;
}

const FLOW_STEPS: FlowStep[] = [
  {
    number: '01',
    title: 'LINEで無料相談・お問い合わせ',
    tag: '24時間メッセージ受付',
    description:
      'まずは公式LINEから「求人の話を聞いてみたい」「見学を相談したい」とお送りください。質問や相談だけでも歓迎しています。',
    note: '本名や顔写真の送信は不要です',
  },
  {
    number: '02',
    title: 'ご希望・シフト・条件の確認',
    tag: '女性担当が個別対応',
    description:
      '働きたい時間帯や日数、未経験での不安点、寮・遠方からのご相談など、ご自身の希望を女性スタッフがお伺いして目安をお伝えします。',
    note: '10:00〜24:00の営業時間内に順次ご返信します',
  },
  {
    number: '03',
    title: '私服で店舗見学・面接（ご説明）',
    tag: '履歴書不要・私服OK',
    description:
      '実際にお越しいただき、控室やお店の清潔さ、報酬計算のルール、禁止事項などを丁寧にご説明します。見るだけでももちろん大丈夫です。',
    note: '最寄り駅での待ち合わせ案内も可能です',
  },
  {
    number: '04',
    title: '必要書類の確認・お仕度',
    tag: '年齢・本人確認の徹底',
    description:
      '体験入店や勤務を進める場合は、本籍地記載の住民票原本（または日本国パスポート等）を確認のうえ、無料貸出衣装へお着替えします。',
    note: '満20歳以上・高校生不可の確認を徹底しています',
  },
  {
    number: '05',
    title: '1日体験入店（即日全額現金日払い）',
    tag: '仲居さんが隣でサポート',
    description:
      'お店の雰囲気や接客の流れを実際に確かめていただけます。その日の勤務終了後、お約束した通りの全額を現金でお渡しします。',
    note: '体験入店のみで終了してもまったく問題ありません',
  },
  {
    number: '06',
    title: 'ご納得いただいたうえで勤務開始',
    tag: '自由シフト・ノルマなし',
    description:
      '「ここなら安心して働ける」とご自身で納得された場合のみ、希望の曜日や時間帯でシフトをスタートしていただけます。',
    note: '開始後もシフト変更や相談はいつでも可能です',
  },
];

export default function Flow(_props: FlowProps) {
  return (
    <section
      className="py-16 md:py-24 bg-surface border-b border-outline-variant/60"
      id="flow"
      aria-labelledby="flow-heading"
    >
      <div className="max-w-[960px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest text-primary uppercase">
            <span className="w-4 h-px bg-primary" aria-hidden="true" />
            <span>HOW TO START</span>
            <span className="w-4 h-px bg-primary" aria-hidden="true" />
          </div>
          <h2
            id="flow-heading"
            className="font-display font-bold text-2xl sm:text-3xl md:text-4xl text-on-surface leading-snug text-balance"
          >
            応募から体験入店・勤務開始まで
          </h2>
          <p className="text-sm sm:text-base text-on-surface-variant leading-relaxed">
            相談から見学・体験入店まで、強引な勧誘や引き止めは行いません。ひとつずつ内容を確認し、ご納得のうえで進めていただけます。
          </p>
        </div>

        {/* Vertical Timeline for Steps 01 - 06 */}
        <ol className="relative space-y-5 md:space-y-6 before:hidden sm:before:block sm:before:content-[''] sm:before:absolute sm:before:left-6 sm:before:top-6 sm:before:bottom-6 sm:before:w-px sm:before:bg-outline-variant">
          {FLOW_STEPS.map((step) => (
            <li
              key={step.number}
              id={`flow-step-${Number(step.number)}`}
              className="relative sm:pl-16"
            >
              {/* Timeline Node Marker */}
              <div
                className="hidden sm:flex absolute left-0 top-5 w-12 h-12 rounded-2xl bg-white border border-outline-variant shadow-2xs items-center justify-center font-mono font-bold text-sm text-primary"
                aria-hidden="true"
              >
                {step.number}
              </div>

              {/* Card Body */}
              <div className="bg-white rounded-2xl border border-outline-variant p-5 sm:p-6 shadow-2xs space-y-2.5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="sm:hidden text-xs font-mono font-bold text-primary">
                      STEP {step.number}
                    </span>
                    <h3 className="font-display font-bold text-base sm:text-lg text-on-surface leading-snug">
                      {step.title}
                    </h3>
                  </div>
                  <span className="text-[11px] font-bold text-secondary bg-surface-container/70 px-2.5 py-1 rounded-md">
                    {step.tag}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                  {step.description}
                </p>

                <div className="pt-2 border-t border-outline-variant/60 flex items-center gap-2 text-xs text-on-surface">
                  <LucideIcon name="Check" size={14} className="text-primary shrink-0" />
                  <span>{step.note}</span>
                </div>
              </div>
            </li>
          ))}
        </ol>

        {/* Zero-pressure Guarantee & CTA */}
        <div className="mt-8 bg-white rounded-2xl border border-outline-variant p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <LucideIcon name="ShieldCheck" size={20} className="text-primary shrink-0 mt-0.5" />
            <div className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
              <span className="font-bold text-on-surface block mb-0.5">
                見学・条件説明だけでも一切遠慮はいりません
              </span>
              「話を聞いてイメージと違った」「他の環境と比較してから決めたい」という場合でも、引き止めやキャンセル料などは一切発生しません。
            </div>
          </div>
          <a
            href={LINE_OFFICIAL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-[#06C755] hover:bg-[#05b34c] text-white font-bold text-xs sm:text-sm px-5 py-3 rounded-xl shadow-xs transition-colors shrink-0"
          >
            <LucideIcon name="MessageCircle" size={16} />
            <span>まずはLINEで相談する</span>
          </a>
        </div>
      </div>
    </section>
  );
}
