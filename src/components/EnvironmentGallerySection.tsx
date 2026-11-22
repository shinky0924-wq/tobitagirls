/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import LucideIcon from './LucideIcon';
import { LINE_OFFICIAL_URL } from '../data';

interface EnvironmentGallerySectionProps {
  onNavigatePath?: (path: string) => void;
}

const ENVIRONMENT_SPACES = [
  {
    id: 'ryotei-exterior',
    tag: '店舗外観',
    title: '伝統的な和風料亭の落ち着いた外観',
    imageUrl: '/images/env_ryotei_exterior_1795342437929.jpg',
    imageAlt: '飛田新地の伝統的な和風料亭の落ち着いた外観（イメージ画像）',
    description:
      '飛田新地の街並みに馴染む、清潔感のある純和風の料亭構えです。暖簾や柔らかな照明が落ち着いた雰囲気をつくり、女性も安心して出入りしやすい環境を整えています。',
    points: ['街並みに馴染む上品な和風構え', 'プライバシーに配慮した出入り動線', '外観や立地も私服見学で確認可能'],
  },
  {
    id: 'entrance-greeting',
    tag: 'お店の玄関',
    title: '仲居さん（おばちゃん）と迎える玄関スペース',
    imageUrl: '/images/env_entrance_greeting_clean_1795342452336.jpg',
    imageAlt: '料亭の玄関（上がり框）で女性が座り、仲居スタッフ（おばちゃん）が隣で呼び込み・ご案内している様子（イメージ画像）',
    description:
      '玄関（上がり框）では女性が一人にならず、経験豊富な仲居スタッフ（おばちゃん）がすぐ隣に立ち、笑顔での呼び込みやお客様対応をサポートします。',
    points: ['仲居さんが隣で呼び込み・声掛けを担当', '困ったときもすぐ相談できる距離感', '無理な客引きや一人対応はなし'],
  },
  {
    id: 'waiting-room',
    tag: '待機室・控室',
    title: '冷暖房・Wi-Fi完備の女性専用待機スペース',
    imageUrl: '/images/home_env_waiting_room_1795337038357.jpg',
    imageAlt: '飛田新地の料亭内にある落ち着いた女性専用待機室の雰囲気（イメージ画像）',
    description:
      '接客の合間や休憩時間に、スマートフォンを見たり飲み物を飲んだりしてリラックスできる空間を整えています。冷暖房や無料Wi-Fi、お荷物をしまえるスペースも備えています。',
    points: ['冷暖房・空気清浄機完備', '無料Wi-Fi・充電環境あり', '休憩や軽食も自分のペースで可能'],
  },
  {
    id: 'dressing-room',
    tag: 'お支度・衣装',
    title: '無料貸出衣装と清潔なメイクルーム',
    imageUrl: '/images/home_env_dressing_room_1795337038246.jpg',
    imageAlt: '清潔な鏡と照明を備えたお支度スペース・化粧室の雰囲気（イメージ画像）',
    description:
      '着物や浴衣、ワンピース、コスチュームなど働くための衣装は店舗側で無料貸出しています。ご自宅への持ち帰りは不要で、私服のまま手ぶら感覚で通勤できます。',
    points: ['衣装無料貸出（購入費0円）', '衣装は店舗保管・洗濯対応', '明るい鏡台・ドライヤー等を用意'],
  },
  {
    id: 'tatami-room',
    tag: '接客のお部屋・衛生管理',
    title: '清潔を保った和室と衛生消耗品の常備',
    imageUrl: '/images/home_env_tatami_room_1795337038151.jpg',
    imageAlt: '清潔感のある和室のお部屋と照明の雰囲気（イメージ画像）',
    description:
      'お客様をご案内する2階の個室は、お見送りのたびに仲居スタッフと協力して丁寧に換気・清掃・リネン交換を行います。衛生用品やタオル類も店舗で十分に準備しています。',
    points: ['毎回の換気・リネン交換を徹底', '衛生消耗品・タオル等を店舗完備', '仲居スタッフによる安全見守り'],
  },
  {
    id: 'private-dorm',
    tag: '寮環境',
    title: 'プライバシーを守れる清潔なワンルーム個室寮',
    imageUrl: '/images/env_private_dorm_1795342438320.jpg',
    imageAlt: '清潔感のある女性向けワンルーム個室寮の内装（イメージ画像）',
    description:
      '遠方からの短期出稼ぎや一人暮らしを希望される方向けに、個室タイプの住環境をご相談いただけます。間取りや利用料・入居条件は時期や空き状況により異なるため事前確認を行っています。',
    points: ['プライバシーを保てる個室タイプ相談可', '家具・家電の有無は物件ごとに事前案内', '空き状況・費用・交通費条件をLINEで確認'],
  },
];

export default function EnvironmentGallerySection(_props: EnvironmentGallerySectionProps) {

  return (
    <section
      id="environment"
      className="py-16 sm:py-24 bg-white border-b border-outline-variant/60"
      aria-labelledby="environment-heading"
    >
      <div className="max-w-[1160px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest text-primary uppercase">
            <span className="w-4 h-px bg-primary" aria-hidden="true" />
            <span>ENVIRONMENT &amp; FACILITIES</span>
            <span className="w-4 h-px bg-primary" aria-hidden="true" />
          </div>
          <h2
            id="environment-heading"
            className="font-display font-bold text-2xl sm:text-3xl md:text-4xl text-on-surface leading-snug text-balance"
          >
            働く環境・設備紹介
          </h2>
          <p className="text-sm sm:text-base text-on-surface-variant leading-relaxed">
            長く安心して働いていただけるよう、清潔感と過ごしやすさを大切にしています。実際のお部屋の雰囲気は私服見学でもご確認いただけます。
          </p>
        </div>

        {/* 3-Col Grid (6 spaces) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {ENVIRONMENT_SPACES.map((space) => (
            <article
              key={space.id}
              className="bg-surface rounded-2xl border border-outline-variant overflow-hidden flex flex-col shadow-xs"
            >
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-surface-container">
                <img
                  src={space.imageUrl}
                  alt={space.imageAlt}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  decoding="async"
                  referrerPolicy="no-referrer"
                />
                <span className="absolute top-3 left-3 bg-white/95 text-on-surface text-[11px] font-bold px-3 py-1 rounded-lg border border-outline-variant">
                  {space.tag}
                </span>
                <span className="absolute bottom-2.5 right-2.5 bg-on-surface/75 text-white text-[10px] font-medium px-2.5 py-0.5 rounded-md">
                  イメージ画像
                </span>
              </div>

              <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between gap-4">
                <div className="space-y-2.5">
                  <h3 className="font-display font-bold text-base sm:text-lg text-on-surface leading-snug">
                    {space.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
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

        {/* Bottom Tour & LINE Consultation Banner */}
        <div className="mt-10 bg-surface-container-low rounded-2xl border border-outline-variant px-6 py-5 sm:px-8 sm:py-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <p className="text-sm sm:text-[15px] font-bold text-on-surface">
              応募を決める前に、実際の館内や待機場所を見学できます
            </p>
            <p className="text-xs sm:text-[13px] text-on-surface-variant leading-relaxed">
              イメージ画像だけでなく、実物の室内や清潔さを直接見てからご判断いただけます。
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
