/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import LucideIcon from './LucideIcon';

interface AccessGuideProps {
  onCtaclick?: () => void;
}

const STATION_ROUTES = [
  {
    station: '地下鉄「動物園前駅」',
    lines: 'Osaka Metro 御堂筋線・堺筋線',
    time: '徒歩5分',
    badge: '最寄り・一番近い',
    route: '1番または2番出口を出て南へ。ジャンジャン横丁を抜けて飛田大門通りへまっすぐ進むだけの分かりやすいルートです。日中も人通りが多く安全です。'
  },
  {
    station: 'JR・南海「新今宮駅」',
    lines: 'JR環状線・大和路線 / 南海本線・高野線',
    time: '徒歩7分',
    badge: '関空・なんば直通',
    route: '通天閣口（東出口）から南東へ進みます。関西国際空港や和歌山・奈良方面からのアクセスに便利で、地方からの出稼ぎ女性にもよく利用されています。'
  },
  {
    station: '各線「天王寺駅」/ 近鉄「大阪阿部野橋駅」',
    lines: 'JR各線 / 御堂筋線 / 谷町線 / 近鉄南大阪線',
    time: '徒歩10分',
    badge: 'ターミナル駅・買い物便利',
    route: 'あべのハルカス・あべのキューズモール側から西へ平坦な大通りを歩きます。商業施設やカフェが充実しているため、面接前後の時間調整やお買い物にも最適です。'
  }
];

export default function AccessGuide({ onCtaclick }: AccessGuideProps) {
  return (
    <div className="bg-white rounded-3xl border border-rose-100 shadow-sm p-6 sm:p-8" id="access-guide">
      
      {/* Header */}
      <div className="text-center max-w-xl mx-auto mb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-secondary/10 text-secondary border border-secondary/20 mb-2">
          <LucideIcon name="MapPin" size={13} />
          <span>交通アクセス・最寄り駅案内</span>
        </div>
        <h3 className="text-xl sm:text-2xl font-extrabold text-zinc-900 font-display mb-2">
          面接店舗へのアクセス・主要駅からの徒歩ルート
        </h3>
        <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
          天王寺・難波エリアに直結しており、3駅複数路線から徒歩圏内です。面接時は私服・手ぶらで駅までお越しいただければ、女性スタッフが丁寧にご案内します。
        </p>
      </div>

      {/* 3 Stations Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {STATION_ROUTES.map((st, idx) => (
          <div 
            key={idx}
            className="bg-rose-50/30 rounded-2xl p-5 border border-rose-100/80 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-1 mb-2">
                <span className="text-[10px] font-bold text-secondary bg-white px-2 py-0.5 rounded-full border border-rose-200">
                  {st.badge}
                </span>
                <span className="text-xs font-black text-secondary font-mono">
                  {st.time}
                </span>
              </div>
              <h4 className="text-sm sm:text-base font-bold text-zinc-900 mb-1 font-display">
                {st.station}
              </h4>
              <span className="text-[11px] text-zinc-400 block mb-3 font-medium">
                {st.lines}
              </span>
              <p className="text-xs text-zinc-600 leading-relaxed">
                {st.route}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Out of town travel support */}
      <div className="bg-gradient-to-r from-rose-500 to-pink-500 rounded-2xl p-5 sm:p-6 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h4 className="text-sm sm:text-base font-bold font-display mb-1 flex items-center gap-1.5">
            <LucideIcon name="Plane" size={16} />
            <span>地方・遠方からの出稼ぎ交通費は【全額キャッシュバック支給】</span>
          </h4>
          <p className="text-xs text-white/90 leading-relaxed">
            新幹線（新大阪駅）、飛行機（伊丹・関空）、高速夜行バスの往復交通費を全額支給いたします。家具家電付き個室マンション寮に即日入居可能です。
          </p>
        </div>
        {onCtaclick && (
          <button
            type="button"
            onClick={onCtaclick}
            className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-white text-secondary font-bold text-xs shadow-sm hover:bg-rose-50 transition-all cursor-pointer whitespace-nowrap shrink-0"
          >
            交通費・寮についてLINEで質問
          </button>
        )}
      </div>

    </div>
  );
}
