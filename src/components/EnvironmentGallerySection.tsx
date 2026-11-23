/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import LucideIcon from './LucideIcon';
import { LINE_OFFICIAL_URL } from '../data';

interface EnvironmentGallerySectionProps {
  onNavigatePath?: (path: string) => void;
}

interface FacilityItem {
  number: string;
  tag: string;
  title: string;
  imageUrl: string;
  imageAlt: string;
  description: string;
  points: string[];
}

const FACILITY_ITEMS: FacilityItem[] = [
  {
    number: '01',
    tag: '店舗外観',
    title: '落ち着いた和風料亭の店構え',
    imageUrl: '/images/env_ryotei_exterior_1795342437929.jpg',
    imageAlt: '飛田新地の落ち着いた和風料亭の店構え（イメージ画像）',
    description:
      '飛田新地の街並みに馴染む純和風の料亭構えです。暖簾と柔らかな玄関照明で落ち着いた雰囲気を整えており、私服での見学時にも立地や外観をお確かめいただけます。',
    points: ['和風の落ち着いた外観と清潔感', 'プライバシーに配慮した出入り動線', '私服見学で周辺環境も確認可能'],
  },
  {
    number: '02',
    tag: '玄関（上がり框）',
    title: '仲居さんと迎える玄関スペース',
    imageUrl: '/images/env_entrance_greeting_clean_1795342452336.jpg',
    imageAlt: '料亭の玄関（上がり框）で女性が座り、仲居スタッフ（おばちゃん）が隣で呼び込み・ご案内している様子（イメージ画像）',
    description:
      '玄関（上がり框）は女性が一人にならず、経験豊富な仲居スタッフ（おばちゃん）がすぐ隣に立ち、笑顔でのお声がけやご案内を行う場です。',
    points: ['仲居さんが隣で呼び込みを担当', '初めてでも一人きりで対応しない体制', '困った時はその場で相談が可能'],
  },
  {
    number: '03',
    tag: '待機室・控室',
    title: '冷暖房・Wi-Fi完備の女性専用控室',
    imageUrl: '/images/home_env_waiting_room_1795337038357.jpg',
    imageAlt: '飛田新地の料亭内にある落ち着いた女性専用待機室の雰囲気（イメージ画像）',
    description:
      '接客の合間や休憩時間にリラックスできる女性専用スペースです。冷暖房・無料Wi-Fi・充電環境・お荷物をしまえるスペースを整えています。',
    points: ['冷暖房・無料Wi-Fi・充電設備', '私物を安心して置ける保管スペース', 'ロッカー代などの雑費徴収なし'],
  },
  {
    number: '04',
    tag: 'お仕度・衣装',
    title: '無料貸出衣装とお仕度スペース',
    imageUrl: '/images/home_env_dressing_room_1795337038246.jpg',
    imageAlt: '清潔な鏡と照明を備えたお支度スペース・化粧室の雰囲気（イメージ画像）',
    description:
      '着物・浴衣・ワンピース・コスチュームなど働く際の衣装は店舗で無料レンタル・保管しています。明るい鏡台やドライヤー等を備え、私服で通勤できます。',
    points: ['衣装の無料貸出・洗濯店舗管理', '明るい鏡・ドライヤー・小物用意', '持ち帰り荷物が少なく私服通勤OK'],
  },
  {
    number: '05',
    tag: '2階和室・衛生管理',
    title: '清潔を保った和室と衛生用品の常備',
    imageUrl: '/images/home_env_tatami_room_1795337038151.jpg',
    imageAlt: '清潔感のある和室のお部屋と照明の雰囲気（イメージ画像）',
    description:
      'お客様をご案内する2階の個室は、お見送りのたびに仲居スタッフと連携して換気・清掃・シーツ等の交換を実施。衛生消耗品やタオル類も店舗で十分準備しています。',
    points: ['お見送りごとの換気とリネン交換', '衛生消耗品・タオル等を店舗完備', '仲居スタッフによる時間管理と見守り'],
  },
  {
    number: '06',
    tag: '住環境・寮',
    title: '遠方・滞在希望向けの住環境案内',
    imageUrl: '/images/env_private_dorm_1795342438320.jpg',
    imageAlt: '清潔感のある女性向けワンルーム個室寮の内装（イメージ画像）',
    description:
      '遠方から短期間・長期間お越しになる方には、プライバシーを保てる個室タイプの寮や滞在先のご案内も行っています。条件や空き状況は時期により事前確認いたします。',
    points: ['個室タイプの滞在環境をご相談可能', '設備・利用料は物件ごとに事前開示', '交通費サポート条件も応募前に案内'],
  },
];

export default function EnvironmentGallerySection(_props: EnvironmentGallerySectionProps) {
  return (
    <section
      id="environment"
      className="py-16 md:py-24 bg-white border-b border-outline-variant/60"
      aria-labelledby="environment-heading"
    >
      <div className="max-w-[1160px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center max-w-2xl mx-auto mb-10 md:mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest text-primary uppercase">
            <span className="w-4 h-px bg-primary" aria-hidden="true" />
            <span>FACILITIES &amp; SPACES</span>
            <span className="w-4 h-px bg-primary" aria-hidden="true" />
          </div>
          <h2
            id="environment-heading"
            className="font-display font-bold text-2xl sm:text-3xl md:text-4xl text-on-surface leading-snug text-balance"
          >
            働く場所・設備をご紹介
          </h2>
          <p className="text-sm sm:text-base text-on-surface-variant leading-relaxed">
            安心して長く働いていただけるよう、清潔さと落ち着きを大切にしています。実際の空間や雰囲気は私服見学でも直接ご確認いただけます。
          </p>
        </div>

        {/* 3x2 Grid (6 spaces) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {FACILITY_ITEMS.map((space) => (
            <article
              key={space.number}
              className="group bg-surface rounded-2xl border border-outline-variant overflow-hidden flex flex-col shadow-2xs hover:shadow-md hover:border-primary/35 transition-all duration-300"
            >
              <div className="relative aspect-video w-full overflow-hidden bg-surface-container-low border-b border-outline-variant/80">
                <img
                  src={space.imageUrl}
                  alt={space.imageAlt}
                  className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                  loading="lazy"
                  decoding="async"
                  width={640}
                  height={360}
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-3 left-3 flex items-center gap-2">
                  <span className="bg-white/95 text-primary text-[11px] font-mono font-bold px-2.5 py-1 rounded-md border border-outline-variant">
                    {space.number}
                  </span>
                  <span className="bg-white/95 text-on-surface text-[11px] font-bold px-2.5 py-1 rounded-md border border-outline-variant">
                    {space.tag}
                  </span>
                </div>
                <span className="absolute bottom-2 right-2.5 text-[10px] font-medium text-on-surface/80 bg-white/90 px-2 py-0.5 rounded border border-outline-variant/60">
                  イメージ画像
                </span>
              </div>

              <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between gap-4">
                <div className="space-y-2">
                  <h3 className="font-display font-bold text-base sm:text-lg text-on-surface leading-snug">
                    {space.title}
                  </h3>
                  <p className="text-xs sm:text-[13px] text-on-surface-variant leading-relaxed">
                    {space.description}
                  </p>
                </div>

                <ul className="pt-3 border-t border-outline-variant/70 space-y-1.5 text-xs text-on-surface">
                  {space.points.map((point) => (
                    <li key={point} className="flex items-center gap-2">
                      <LucideIcon name="Check" size={14} className="text-primary shrink-0" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>

        {/* Bottom Honest Inspection Note & Tour CTA */}
        <div className="mt-10 bg-surface-container-low rounded-2xl border border-outline-variant px-6 py-5 sm:px-8 sm:py-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <p className="text-sm sm:text-[15px] font-bold text-on-surface">
              実物の館内・控室は「私服見学」で直接お確かめいただけます
            </p>
            <p className="text-xs sm:text-[13px] text-on-surface-variant leading-relaxed">
              街全体で撮影禁止ルールがあるため室内はイメージ画像を掲載しています。実物の清潔さや仲居さんの雰囲気は見学のみでも丁寧にご案内しています。
            </p>
          </div>
          <a
            href={LINE_OFFICIAL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-white hover:bg-surface-container text-secondary border border-outline-variant hover:border-primary/40 font-bold text-xs sm:text-[13px] px-5 py-3 rounded-xl shadow-2xs transition-colors shrink-0 cursor-pointer"
          >
            <LucideIcon name="Calendar" size={16} className="text-secondary shrink-0" />
            <span>お店見学についてLINEで相談する</span>
          </a>
        </div>
      </div>
    </section>
  );
}
