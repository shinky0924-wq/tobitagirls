/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import LucideIcon from './LucideIcon';
import { LINE_OFFICIAL_URL } from '../data';

interface VoiceCase {
  id: string;
  initial: string;
  imageUrl: string;
  imageAlt: string;
  ageBracket: string;
  workstyleLabel: string;
  experienceLabel: string;
  anxietyBefore: string;
  trigger: string;
  impression: string;
  staffSupport: string;
  advice: string;
}

const VOICE_CASES: VoiceCase[] = [
  {
    id: 'voice-1',
    initial: 'A',
    imageUrl: '/images/tobita_cast_mai_selfie.jpg',
    imageAlt: '昼シフト中心で働く20代前半女性のイメージ写真',
    ageBracket: '20代前半',
    workstyleLabel: '週4日・昼シフト中心（10:00〜17:00）',
    experienceLabel: '未経験からスタート',
    anxietyBefore:
      '夜職の経験がまったくなく、「厳しいルールや怖い先輩がいたらどうしよう」と応募するまでとても迷っていました。',
    trigger:
      'まずは話だけ聞いてみようと思いLINEで相談したところ、私服見学で待機室や玄関の雰囲気を実際に見られたことが決め手になりました。',
    impression:
      '1回の接客が15分〜20分と区切りが明確で、お酒を飲んだり連絡先を交換したりする必要がないため、生活リズムを崩さず働けています。',
    staffSupport:
      '玄関では仲居さんがすぐ隣にいて、お客様への声掛けや時間の管理をしてくださるので、一人で困る場面がありません。',
    advice:
      '迷っている段階でも、無理に体験を勧められることはないので、まずは見学で部屋の綺麗さやスタッフの雰囲気を見てみるのが一番安心です。',
  },
  {
    id: 'voice-2',
    initial: 'K',
    imageUrl: '/images/tobita_cast_hina_selfie.jpg',
    imageAlt: '学業と両立して働く20代前半女性のイメージ写真',
    ageBracket: '20代前半',
    workstyleLabel: '週2〜3日・学業と両立',
    experienceLabel: 'お酒NG・未経験',
    anxietyBefore:
      'お酒がまったく飲めない体質なことと、試験期間などで休みたい時にシフトの融通が利くのかが不安でした。',
    trigger:
      '直営店で紹介料の中抜きがないこと、面接に履歴書が不要で相談しやすいことに惹かれて問い合わせました。',
    impression:
      '飲み会や営業連絡がなく、退勤時にその日の分を全額現金で手渡ししてもらえるので、予定を立てて学業と両立しやすい環境です。',
    staffSupport:
      '衣装の無料レンタルやメイクのアドバイスも女性スタッフが丁寧に教えてくれて、毎回手ぶら感覚で通えています。',
    advice:
      '「週1日や短時間でも相談できるかな？」と悩んでいる方も、自分の希望の条件を正直にLINEで伝えてみるのがおすすめです。',
  },
  {
    id: 'voice-3',
    initial: 'M',
    imageUrl: '/images/tobita_cast_yuki_selfie.jpg',
    imageAlt: '週末中心・Wワークで働く20代後半女性のイメージ写真',
    ageBracket: '20代後半',
    workstyleLabel: '週末中心・Wワーク勤務',
    experienceLabel: '昼職との掛け持ち・プライバシー重視',
    anxietyBefore:
      '平日は一般の会社員として働いているため、知人への身バレや税金の手続き、顔写真の扱いが一番の心配事でした。',
    trigger:
      'WebやSNSに顔写真が一切載らない点と、エリア全体の撮影禁止ルール・住民税普通徴収の説明を読んで安心できたからです。',
    impression:
      '完全源氏名で私服通勤ができるため、普段の生活としっかり切り離して週末だけのペースを続けられています。',
    staffSupport:
      '控室の環境やプライベートとの両立について女性担当者が親身に相談に乗ってくれて、無理のない働き方が見つけられました。',
    advice:
      'プライバシー面の疑問は人それぞれ違うと思うので、気になる点は遠慮なく事前に質問して納得したうえで始めるのが良いと思います。',
  },
];

interface TestimonialsProps {
  onNavigateFaq?: () => void;
}

export default function Testimonials({ onNavigateFaq }: TestimonialsProps = {}) {
  return (
    <section
      id="voice"
      className="py-16 md:py-24 bg-surface border-b border-outline-variant/60"
      aria-labelledby="voice-heading"
    >
      <div className="max-w-[1160px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest text-primary uppercase">
            <span className="w-4 h-px bg-primary" aria-hidden="true" />
            <span>WORKING STYLES &amp; VOICES</span>
            <span className="w-4 h-px bg-primary" aria-hidden="true" />
          </div>
          <h2
            id="voice-heading"
            className="font-display font-bold text-2xl sm:text-3xl md:text-4xl text-on-surface leading-snug text-balance"
          >
            実際に働く女性の声
          </h2>
          <p className="font-sans text-sm sm:text-base text-on-surface-variant leading-relaxed">
            未経験から始めた方やWワークの方など、働く前の不安や入店後の変化、仲居さん・スタッフからのサポートについてご紹介します。
          </p>
        </div>

        {/* 3-Col Clean Cards with Restored Cast Photos */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {VOICE_CASES.map((item) => (
            <article
              key={item.id}
              className="group bg-white rounded-2xl border border-outline-variant overflow-hidden flex flex-col justify-between shadow-2xs hover:shadow-md hover:border-primary/35 transition-all duration-300"
            >
              <div>
                {/* Restored Cast Lifestyle Image */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-surface-container-low border-b border-outline-variant/60">
                  <img
                    src={item.imageUrl}
                    alt={item.imageAlt}
                    className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                    loading="lazy"
                    decoding="async"
                    width={640}
                    height={480}
                    referrerPolicy="no-referrer"
                  />
                </div>

                <div className="p-6 space-y-4">
                  {/* Profile Header */}
                  <div className="flex items-center gap-3 pb-4 border-b border-outline-variant/70">
                    <div
                      className="w-10 h-10 rounded-full bg-surface-container border border-outline-variant flex items-center justify-center font-display font-bold text-base text-primary shrink-0"
                      aria-hidden="true"
                    >
                      {item.initial}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-display font-bold text-base text-on-surface">
                          {item.ageBracket}
                        </span>
                        <span className="text-xs font-bold text-secondary">
                          · {item.experienceLabel}
                        </span>
                      </div>
                      <p className="text-xs text-on-surface-variant mt-0.5 truncate">
                        {item.workstyleLabel}
                      </p>
                    </div>
                  </div>

                  {/* 4 Structured Sections */}
                  <div className="space-y-3 text-xs sm:text-[13px] leading-relaxed">
                    <div>
                      <div className="font-bold text-primary text-[11px] mb-0.5">応募前の不安</div>
                      <p className="text-on-surface-variant">{item.anxietyBefore}</p>
                    </div>

                    <div>
                      <div className="font-bold text-primary text-[11px] mb-0.5">働き始めたきっかけ</div>
                      <p className="text-on-surface-variant">{item.trigger}</p>
                    </div>

                    <div>
                      <div className="font-bold text-primary text-[11px] mb-0.5">実際に働いて感じたこと</div>
                      <p className="text-on-surface">{item.impression}</p>
                    </div>

                    <div>
                      <div className="font-bold text-primary text-[11px] mb-0.5">仲居さん・スタッフのサポート</div>
                      <p className="text-on-surface-variant">{item.staffSupport}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Advice Footer */}
              <div className="px-6 pb-6">
                <div className="rounded-xl bg-surface p-4 border border-outline-variant/80">
                  <div className="flex items-center gap-1.5 text-[11px] font-bold text-secondary mb-1">
                    <LucideIcon name="MessageCircleHeart" size={14} className="text-primary shrink-0" />
                    <span>検討中の方へのメッセージ</span>
                  </div>
                  <p className="text-xs text-on-surface leading-relaxed">
                    「{item.advice}」
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Action Links */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          {onNavigateFaq && (
            <button
              type="button"
              onClick={onNavigateFaq}
              className="inline-flex items-center justify-center bg-white hover:bg-surface-container text-secondary border border-outline-variant hover:border-primary/40 font-bold text-xs sm:text-[13px] px-5 py-2.5 rounded-xl shadow-2xs transition-colors cursor-pointer"
            >
              よくある質問を見る
            </button>
          )}
          <a
            href={LINE_OFFICIAL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-1.5 bg-white hover:bg-surface-container text-primary hover:text-secondary border border-outline-variant hover:border-primary/40 font-bold text-xs sm:text-[13px] px-5 py-2.5 rounded-xl shadow-2xs transition-colors"
          >
            <span>まずは相談する</span>
            <LucideIcon name="ArrowRight" size={13} />
          </a>
        </div>
      </div>
    </section>
  );
}
