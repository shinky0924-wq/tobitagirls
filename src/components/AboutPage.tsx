/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { 
  ShieldCheck, 
  Users, 
  Clock, 
  CheckCircle2, 
  Calendar, 
  MapPin, 
  RefreshCw, 
  FileText, 
  MessageCircle, 
  Lock, 
  Sparkles, 
  HeartHandshake, 
  Award, 
  HelpCircle, 
  AlertTriangle,
  ArrowRight,
  UserCheck
} from 'lucide-react';

interface AboutPageProps {
  onNavigateHome: () => void;
  onNavigateBlog: () => void;
  onCtaclick: () => void;
}

export default function AboutPage({ onNavigateHome, onNavigateBlog, onCtaclick }: AboutPageProps) {
  return (
    <div className="min-h-screen bg-surface py-8 px-4 sm:px-6 lg:px-8 font-sans max-w-[1000px] mx-auto">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-on-surface-variant mb-6" aria-label="パンくずリスト">
        <button 
          onClick={onNavigateHome}
          className="hover:text-secondary underline cursor-pointer"
        >
          トップ
        </button>
        <span>&gt;</span>
        <span className="text-[#2c1a1e] font-bold">運営者情報・プライバシーポリシー</span>
      </nav>

      {/* Hero Header */}
      <div className="bg-gradient-to-br from-rose-50 via-white to-pink-50/60 rounded-3xl p-6 sm:p-10 border border-rose-200/80 shadow-xs mb-10">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="bg-secondary text-white text-[11px] font-black px-3 py-1 rounded-full shadow-xs">
            運営者情報・監修体制
          </span>
          <span className="bg-white text-rose-800 text-[11px] font-bold px-3 py-1 rounded-full border border-rose-200">
            E-E-A-T（専門性・経験・権威性・信頼性）公表
          </span>
          <span className="bg-rose-100/70 text-rose-900 text-[11px] font-semibold px-2.5 py-1 rounded-full flex items-center gap-1">
            <RefreshCw size={11} className="text-secondary" />
            最終更新：2026年9月5日
          </span>
        </div>

        <h1 className="text-2xl sm:text-3xl md:text-4xl font-display font-black text-[#2c1a1e] leading-tight tracking-tight mb-4">
          飛田ガールズについて<br className="hidden sm:inline" />
          <span className="text-secondary text-xl sm:text-2xl md:text-3xl font-bold">
            料亭直営・お店スタッフによる公式求人・一次情報ポリシー
          </span>
        </h1>

        <p className="text-sm sm:text-base text-on-surface-variant leading-relaxed mb-6 max-w-3xl">
          「飛田ガールズ」は、外部の紹介所や斡旋仲介・スカウト業者ではなく、大阪・飛田新地の料理組合加盟店である料亭グループが直接運営する<strong>「お店のグループ直接・公式求人窓口」</strong>です。外部の紹介や提携による斡旋ではなく、グループ直営店への直接採用のため、紹介手数料や中間マージンは一切ありません。現場の求人担当スタッフによる直接サポートと実際の募集条件をもとに、嘘偽りのない正確な「一次情報」をお届けしています。
        </p>

        {/* Quick Highlights */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-rose-200/60">
          <div className="bg-white/80 p-3 rounded-2xl border border-rose-100 text-center">
            <div className="text-xs text-on-surface-variant">求人サポート歴</div>
            <div className="text-lg sm:text-xl font-bold text-secondary mt-0.5">8〜12年</div>
          </div>
          <div className="bg-white/80 p-3 rounded-2xl border border-rose-100 text-center">
            <div className="text-xs text-on-surface-variant">累計相談実績</div>
            <div className="text-lg sm:text-xl font-bold text-secondary mt-0.5">1,400名+</div>
          </div>
          <div className="bg-white/80 p-3 rounded-2xl border border-rose-100 text-center">
            <div className="text-xs text-on-surface-variant">応募資格</div>
            <div className="text-lg sm:text-xl font-bold text-secondary mt-0.5">20歳以上限定</div>
          </div>
          <div className="bg-white/80 p-3 rounded-2xl border border-rose-100 text-center">
            <div className="text-xs text-on-surface-variant">相談料・紹介料</div>
            <div className="text-lg sm:text-xl font-bold text-secondary mt-0.5">完全無料</div>
          </div>
        </div>
      </div>

      <div className="space-y-12">
        {/* Section 1: サイト運営理念・ミッション */}
        <section id="mission" className="bg-white rounded-3xl p-6 sm:p-8 border border-rose-100 shadow-xs">
          <div className="flex items-center gap-2.5 mb-4">
            <div className="w-9 h-9 rounded-xl bg-rose-100 flex items-center justify-center text-secondary">
              <HeartHandshake size={20} />
            </div>
            <h2 className="text-xl sm:text-2xl font-display font-bold text-[#2c1a1e]">
              1. 飛田ガールズの理念とミッション
            </h2>
          </div>
          
          <div className="prose prose-sm text-on-surface leading-relaxed space-y-4">
            <p>
              飛田新地は、大正時代から続く歴史と格式を持つ花街であり、現在は料理組合のもとで普通料理店（料亭）として厳格な自主規制を守りながら営業を続けています。
            </p>
            <p>
              しかし、近年インターネットやSNS上には、「誰でも日給30万円」「面接なしで即採用」といった危険な誇大広告や、無許可の斡旋業者（悪質スカウト・ブローカー）による不透明な案内が散見され、夜職未経験の女性がトラブルや不安に巻き込まれるケースが後を絶ちません。
            </p>
            <div className="bg-rose-50/70 border-l-4 border-secondary p-4 rounded-r-2xl my-4 text-xs sm:text-sm text-[#4a242c] leading-relaxed">
              <strong>当サイトの存在意義（料亭直営・お店スタッフの約束）：</strong><br />
              「夜職が初めての女性でも、嘘偽りのない正確な情報のもと、身バレやトラブルなく安全に高収入を得られる環境をつくること」<br />
              当サイトは紹介業者や仲介ブローカーではなく、<strong>飛田新地で料亭を営業するお店の公式求人・採用チーム（現場スタッフ）</strong>が直接運営しています。外部の仲介を一切挟まないため、不透明な紹介料や天引きはゼロ。料亭組合規約および法令を100%遵守し、現場スタッフが責任を持ってあなたをサポートします。
            </div>
          </div>
        </section>

        {/* Section 2: サイト運営者・スタッフ紹介 */}
        <section id="operators" className="bg-white rounded-3xl p-6 sm:p-8 border border-rose-100 shadow-xs">
          <div className="flex items-center gap-2.5 mb-6">
            <div className="w-9 h-9 rounded-xl bg-rose-100 flex items-center justify-center text-secondary">
              <Users size={20} />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-display font-bold text-[#2c1a1e]">
                2. 料亭お店スタッフ・求人担当者のご紹介
              </h2>
              <p className="text-xs text-on-surface-variant">
                お店の専任スタッフが直接ご相談に対応し、面接からお仕事開始後までマンツーマンでサポートします。
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Staff 1: さくら */}
            <div className="bg-gradient-to-br from-pink-50/50 to-white rounded-2xl p-6 border border-rose-200/80 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-rose-400 to-pink-300 flex items-center justify-center text-white text-2xl font-black shadow-md border-2 border-white shrink-0">
                    さ
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold bg-secondary text-white px-2 py-0.5 rounded-full">
                        女性サポート統括・記事監修
                      </span>
                      <span className="text-xs text-rose-700 font-semibold">サポート歴8年</span>
                    </div>
                    <h3 className="text-lg font-bold text-[#2c1a1e] mt-1">さくら（Sakura）</h3>
                    <p className="text-xs text-on-surface-variant">料亭女性サポート統括担当 / メンタルケア講習修了</p>
                  </div>
                </div>

                <div className="text-xs text-on-surface leading-relaxed space-y-2 mb-4 bg-white/80 p-3.5 rounded-xl border border-rose-100">
                  <p><strong>【主な担当業務】</strong></p>
                  <ul className="list-disc list-inside space-y-1 text-gray-600">
                    <li>女性からの初期LINE相談受付・店舗へのご案内</li>
                    <li>飛田メイク・衣装選び・立ち振る舞い講習</li>
                    <li>店内のご案内・面接および体験入社の同席サポート</li>
                    <li>現場一次情報の確認・記事監修・日々のメンタルケア</li>
                  </ul>
                </div>

                <p className="text-xs text-[#5e474c] italic leading-relaxed">
                  「私自身も最初は夜職に対して不安や偏見がありました。だからこそ、応募してくださる女性の『怖い』『恥ずかしい』という気持ちに誰よりも共感できます。当店では無理にお仕事を勧めることは絶対にありません。まずは友達に相談するような感覚で気軽にお話ししてくださいね。」
                </p>
              </div>
            </div>

            {/* Staff 2: 木村 */}
            <div className="bg-gradient-to-br from-slate-50/70 to-white rounded-2xl p-6 border border-slate-200 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-slate-700 to-slate-500 flex items-center justify-center text-white text-2xl font-black shadow-md border-2 border-white shrink-0">
                    木
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold bg-slate-800 text-white px-2 py-0.5 rounded-full">
                        採用責任者・規約遵守監査
                      </span>
                      <span className="text-xs text-slate-700 font-semibold">管理歴12年</span>
                    </div>
                    <h3 className="text-lg font-bold text-[#2c1a1e] mt-1">木村（Kimura）</h3>
                    <p className="text-xs text-on-surface-variant">採用マネージャー / コンプライアンス管理責任者</p>
                  </div>
                </div>

                <div className="text-xs text-on-surface leading-relaxed space-y-2 mb-4 bg-white/80 p-3.5 rounded-xl border border-slate-200">
                  <p><strong>【主な担当業務】</strong></p>
                  <ul className="list-disc list-inside space-y-1 text-gray-600">
                    <li>料亭の採用条件・給与待遇（50%即日日払い）の適正管理</li>
                    <li>料理組合規約および雇用基準の遵守徹底</li>
                    <li>身バレ防止体制（WEB完全非掲載・防犯管理）の現場監督</li>
                    <li>20歳以上限定・未成年就労防止コンプライアンス管理</li>
                  </ul>
                </div>

                <p className="text-xs text-gray-600 italic leading-relaxed">
                  「飛田新地は日本でも類を見ない規律正しさと自浄作用を持つ街です。当店は仲介業者や紹介所ではなく、料亭のお店スタッフとして直接雇用・サポートを行っています。売上50%バック即日全額日払い、ノルマ・罰金なし、法令遵守を責任を持ってお約束します。」
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: 求人サポート歴と実績データ */}
        <section id="history" className="bg-white rounded-3xl p-6 sm:p-8 border border-rose-100 shadow-xs">
          <div className="flex items-center gap-2.5 mb-6">
            <div className="w-9 h-9 rounded-xl bg-rose-100 flex items-center justify-center text-secondary">
              <Award size={20} />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-display font-bold text-[#2c1a1e]">
                3. 求人サポート歴と実績データ
              </h2>
              <p className="text-xs text-on-surface-variant">
                長年の現場支援を通じて培った客観的な実績数値です。
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <div className="border border-rose-100 bg-rose-50/40 p-4 rounded-2xl">
              <div className="text-xs text-on-surface-variant font-medium">累計女性相談件数</div>
              <div className="text-2xl sm:text-3xl font-black text-secondary mt-1">1,400名以上</div>
              <p className="text-[11px] text-gray-500 mt-1">※2014年〜2026年現在の累計相談実績</p>
            </div>
            <div className="border border-rose-100 bg-rose-50/40 p-4 rounded-2xl">
              <div className="text-xs text-on-surface-variant font-medium">夜職未経験者の割合</div>
              <div className="text-2xl sm:text-3xl font-black text-secondary mt-1">88.4%</div>
              <p className="text-[11px] text-gray-500 mt-1">ほとんどの方が完全未経験からのスタート</p>
            </div>
            <div className="border border-rose-100 bg-rose-50/40 p-4 rounded-2xl">
              <div className="text-xs text-on-surface-variant font-medium">身バレ・給与未払い事故</div>
              <div className="text-2xl sm:text-3xl font-black text-emerald-600 mt-1">0件（完全保証）</div>
              <p className="text-[11px] text-gray-500 mt-1">即日全額手渡し日払い100%実施</p>
            </div>
          </div>

          {/* Chronology */}
          <div className="border-t border-rose-100 pt-6">
            <h3 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-1.5">
              <Clock size={16} className="text-secondary" />
              <span>歩みとサポートの歴史</span>
            </h3>
            <div className="space-y-3 text-xs text-gray-700 font-mono">
              <div className="flex gap-4 items-start">
                <span className="font-bold text-secondary shrink-0">2014年</span>
                <span className="font-sans">飛田新地料理組合加盟の有志料亭と連携し、女性キャストの就業・安全相談窓口を開設。</span>
              </div>
              <div className="flex gap-4 items-start">
                <span className="font-bold text-secondary shrink-0">2018年</span>
                <span className="font-sans">地方・遠方からの上阪サポートを拡充。即入居寮・交通費支給制度を標準化。</span>
              </div>
              <div className="flex gap-4 items-start">
                <span className="font-bold text-secondary shrink-0">2022年</span>
                <span className="font-sans">民法改正（18歳成人）に伴い、料亭営業としての未成年トラブル防止のため「20歳以上完全限定」方針を再徹底。</span>
              </div>
              <div className="flex gap-4 items-start">
                <span className="font-bold text-secondary shrink-0">2024年</span>
                <span className="font-sans">Webメディア「飛田ガールズ」を刷新。誇大広告を排除した現場一次情報の公開を本格始動。</span>
              </div>
              <div className="flex gap-4 items-start">
                <span className="font-bold text-secondary shrink-0">2026年</span>
                <span className="font-sans">累計相談者数1,400名を突破。LINE24時間年中無休体制・事前講習プログラムをさらに強化。</span>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: これまで対応した相談内容 */}
        <section id="consultations" className="bg-white rounded-3xl p-6 sm:p-8 border border-rose-100 shadow-xs">
          <div className="flex items-center gap-2.5 mb-6">
            <div className="w-9 h-9 rounded-xl bg-rose-100 flex items-center justify-center text-secondary">
              <HelpCircle size={20} />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-display font-bold text-[#2c1a1e]">
                4. これまで対応した主な相談内容
              </h2>
              <p className="text-xs text-on-surface-variant">
                実際に寄せられたご相談事例と、お店のグループ直接として解決・サポートしたアプローチです。
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl border border-rose-100 bg-surface-container-lowest">
              <div className="flex items-center gap-2 text-secondary font-bold text-xs mb-1.5">
                <ShieldCheck size={15} />
                <span>身バレ・周囲への秘密保持に関するご相談</span>
              </div>
              <p className="text-xs text-gray-700 leading-relaxed">
                「昼の会社や親、友人にバレないか不安」「本籍地住民票を提出して会社に連絡がいかないか」という相談が最も多く寄せられます。当店では写真・SNS掲載は一切なく、住民票提出による外部通知も法律上絶対にありません。遠方から新幹線で来て短期間で稼いで戻る働き方など、当グループ直営店舗での柔軟な働き方を直接ご案内しています。
              </p>
            </div>

            <div className="p-4 rounded-2xl border border-rose-100 bg-surface-container-lowest">
              <div className="flex items-center gap-2 text-secondary font-bold text-xs mb-1.5">
                <CheckCircle2 size={15} />
                <span>借金返済・学費・急な金銭トラブルのご相談</span>
              </div>
              <p className="text-xs text-gray-700 leading-relaxed">
                「奨学金やクレジットカードの支払いが迫っている」「急ぎでまとまった手元資金が必要」といった相談に対し、初日体験入社から即日全額手渡し日払いで給与が受け取れる当グループ直営料亭にて勤務。無理な長時間労働をさせず、目標金額に合わせた効率的な出勤シフトを組みます。
              </p>
            </div>

            <div className="p-4 rounded-2xl border border-rose-100 bg-surface-container-lowest">
              <div className="flex items-center gap-2 text-secondary font-bold text-xs mb-1.5">
                <Users size={15} />
                <span>容姿の自信・年齢・通り選びに関するご相談</span>
              </div>
              <p className="text-xs text-gray-700 leading-relaxed">
                「20代後半や30代でも需要があるか」「ぽっちゃりや人見知りでも大丈夫か」というお悩みに対し、飛田新地特有の『青春通り（若年層メイン）』『たて筋（幅広い個性・未経験歓迎）』『年金通り・裏通り（大人系・落ち着いた接客）』の特色を正確に説明し、女性の魅力が一番活きる直営店舗へ直接配属・ご案内します。
              </p>
            </div>

            <div className="p-4 rounded-2xl border border-rose-100 bg-surface-container-lowest">
              <div className="flex items-center gap-2 text-secondary font-bold text-xs mb-1.5">
                <MapPin size={15} />
                <span>遠方からの上京・上阪・宿泊先に関するご相談</span>
              </div>
              <p className="text-xs text-gray-700 leading-relaxed">
                「地方在住で荷物もお金もあまりない」「今すぐ住む場所を確保したい」という方へ、新大阪・天王寺駅でのスタッフ出迎え、完全個室寮やグループ契約ホテル、初日からの衣装無料レンタルをご案内。身軽にスタートできる環境を整えます。
              </p>
            </div>
          </div>
        </section>

        {/* Section 5: 店舗体制と営業エリア */}
        <section id="area" className="bg-white rounded-3xl p-6 sm:p-8 border border-rose-100 shadow-xs">
          <div className="flex items-center gap-2.5 mb-4">
            <div className="w-9 h-9 rounded-xl bg-rose-100 flex items-center justify-center text-secondary">
              <MapPin size={20} />
            </div>
            <h2 className="text-xl sm:text-2xl font-display font-bold text-[#2c1a1e]">
              5. 当店の店舗体制と営業エリアについて
            </h2>
          </div>

          <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed mb-4">
            「飛田ガールズ」は、<strong>大阪府大阪市西成区山王エリア（飛田新地）に所在する「飛田新地料理組合」加盟の正規料亭の直営求人</strong>です。外部の紹介所や斡旋ブローカーではなく、お店スタッフ自身が募集・面接・採用を行っています。
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
            <div className="border border-rose-100 p-4 rounded-2xl bg-white">
              <h4 className="font-bold text-secondary text-sm mb-1">メイン通り（青春通り等）</h4>
              <p className="text-xs text-gray-600 leading-relaxed">
                20代前半〜中盤を中心に、華やかな雰囲気で集客力抜群の看板通り。
              </p>
            </div>
            <div className="border border-rose-100 p-4 rounded-2xl bg-white">
              <h4 className="font-bold text-secondary text-sm mb-1">たて筋（信濃筋・百番筋等）</h4>
              <p className="text-xs text-gray-600 leading-relaxed">
                未経験者歓迎・幅広いタイプや個性が活きる温かい環境の料亭が多数。
              </p>
            </div>
            <div className="border border-rose-100 p-4 rounded-2xl bg-white">
              <h4 className="font-bold text-secondary text-sm mb-1">年金通り・裏通り</h4>
              <p className="text-xs text-gray-600 leading-relaxed">
                20代後半・30代・40代の大人の女性が主役となり、丁寧な接客で安定稼働。
              </p>
            </div>
          </div>

          <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 text-xs text-amber-900 flex items-start gap-2.5">
            <AlertTriangle size={18} className="text-amber-700 shrink-0 mt-0.5" />
            <div>
              <strong>悪質スカウト・無許可紹介業者の完全排除ポリシー：</strong><br />
              当店は外部のスカウト業者や紹介所、無店舗型風俗とは一切関与していません。中間マージンを抜かれることなく、規定通りの売上50%バックが即日全額手渡しされます。強制ノルマや罰金・違法天引きも一切ございません。
            </div>
          </div>
        </section>

        {/* Section 6 & 7: 情報更新ポリシー & 求人情報の確認方法 */}
        <section id="policy" className="bg-white rounded-3xl p-6 sm:p-8 border border-rose-100 shadow-xs">
          <div className="flex items-center gap-2.5 mb-6">
            <div className="w-9 h-9 rounded-xl bg-rose-100 flex items-center justify-center text-secondary">
              <FileText size={20} />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-display font-bold text-[#2c1a1e]">
                6. 情報更新ポリシーと一次情報の確認手順
              </h2>
              <p className="text-xs text-on-surface-variant">
                Google E-E-A-T指針に準拠し、現場スタッフが把握する正確な事実のみを更新・発信しています。
              </p>
            </div>
          </div>

          <div className="space-y-4 text-xs sm:text-sm text-gray-700 leading-relaxed">
            <div className="border border-rose-100 p-4 rounded-2xl bg-surface-container-lowest">
              <h4 className="font-bold text-secondary text-sm mb-2 flex items-center gap-2">
                <RefreshCw size={15} />
                <span>① 情報更新ポリシー（一次情報・鮮度の維持）</span>
              </h4>
              <p>
                当サイトに掲載されている募集要項、給与システム、必要書類、勤務条件は、<strong>お店の求人担当スタッフへのヒアリングと実際の募集条件</strong>をもとに作成されています。条件変更があった場合は随時更新し、ページ上部の「最終更新日」を変更します。
              </p>
              <ul className="list-disc list-inside mt-2 space-y-1 text-gray-600 text-xs">
                <li>募集条件や料亭組合の規約に変更があった場合は、即時に掲載情報を修正します。</li>
                <li>サイト上部および記事ごとの「最終情報更新日」を随時更新し、最新状態であることを明示します。</li>
                <li>民法改正や関連法令の動向を定期的に確認し、コンプライアンスを常に最新化します。</li>
              </ul>
            </div>

            <div className="border border-rose-100 p-4 rounded-2xl bg-surface-container-lowest">
              <h4 className="font-bold text-secondary text-sm mb-2 flex items-center gap-2">
                <ShieldCheck size={15} />
                <span>② 直営店舗としての安全管理手順</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-3">
                <div className="bg-white p-3 rounded-xl border border-rose-100">
                  <div className="font-bold text-gray-900 text-xs mb-1">ステップ1：組合正規加盟</div>
                  <p className="text-[11px] text-gray-600">飛田新地料理組合の正規加盟店として法令・規約を100%遵守。</p>
                </div>
                <div className="bg-white p-3 rounded-xl border border-rose-100">
                  <div className="font-bold text-gray-900 text-xs mb-1">ステップ2：給与明朗・即日全額日払い</div>
                  <p className="text-[11px] text-gray-600">売上50%バック即日全額日払い、ノルマなし、不透明な天引きゼロをお約束。</p>
                </div>
                <div className="bg-white p-3 rounded-xl border border-rose-100">
                  <div className="font-bold text-gray-900 text-xs mb-1">ステップ3：女性スタッフの常駐フォロー</div>
                  <p className="text-[11px] text-gray-600">専任の女性サポートスタッフが常に現場におり、困りごとや体調をすぐケア。</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 8: お問い合わせ方法・相談手順 */}
        <section id="contact-method" className="bg-gradient-to-br from-rose-500 via-pink-500 to-rose-600 text-white rounded-3xl p-6 sm:p-10 shadow-lg">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <span className="bg-white/20 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                24時間年中無休・女性スタッフ直通
              </span>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-display font-black mt-2 leading-tight">
                7. お問い合わせ・ご相談方法
              </h2>
              <p className="text-xs sm:text-sm text-rose-100 mt-2 leading-relaxed max-w-xl">
                公式LINEにて24時間いつでもご相談を受け付けています。匿名での相談も歓迎です。「自分に合う通りを知りたい」「まずは質問だけしたい」という場合もお気軽にご連絡ください。無理な面接の強要は一切ございません。
              </p>
            </div>
            <div className="shrink-0 flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <button
                onClick={onCtaclick}
                className="bg-[#06c755] hover:bg-[#05b34c] text-white font-bold text-sm sm:text-base px-6 py-3.5 rounded-full shadow-lg flex items-center justify-center gap-2 transition-transform hover:scale-105 active:scale-95 cursor-pointer"
              >
                <MessageCircle className="fill-white" size={18} />
                <span>公式LINEで無料相談する</span>
              </button>
            </div>
          </div>
        </section>

        {/* Section 9: プライバシーポリシー（個人情報保護方針） */}
        <section id="privacy-policy" className="bg-white rounded-3xl p-6 sm:p-8 border border-rose-100 shadow-xs">
          <div className="flex items-center gap-2.5 mb-6">
            <div className="w-9 h-9 rounded-xl bg-rose-100 flex items-center justify-center text-secondary">
              <Lock size={20} />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-display font-bold text-[#2c1a1e]">
                8. プライバシーポリシー（個人情報保護方針）
              </h2>
              <p className="text-xs text-on-surface-variant">
                当サイトにおける相談者様のプライバシー保護の取り組みについて定めています。
              </p>
            </div>
          </div>

          <div className="space-y-4 text-xs sm:text-sm text-gray-700 leading-relaxed">
            <div>
              <h4 className="font-bold text-gray-900 mb-1">第1条（個人情報の取得・利用目的）</h4>
              <p>
                当サイト「飛田ガールズ」は、ご相談・求人応募に際して取得したお名前（またはニックネーム）、LINEアカウント情報、年齢、連絡先等の個人情報を、以下の目的にのみ利用します。
              </p>
              <ul className="list-disc list-inside mt-1 space-y-1 text-gray-600 text-xs">
                <li>当店（料亭）への見学・面接予約・条件確認・日程調整業務</li>
                <li>ご相談に対する回答・事前サポート・アドバイスの提供</li>
                <li>体験入社時の本人確認および女性スタッフによる店舗案内連絡</li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-gray-900 mb-1">第2条（第三者提供の禁止・秘密保持）</h4>
              <p>
                取得した個人情報は、ご本人の同意がある場合または法令に基づく正当な開示請求がある場合を除き、いかなる第三者にも開示・提供・売却いたしません。外部の業者等に情報が渡ることは一切ありません。ご相談内容および就労事実に関する一切の秘密は厳格に保持されます。
              </p>
            </div>

            <div>
              <h4 className="font-bold text-gray-900 mb-1">第3条（身バレ防止・肖像権の保護）</h4>
              <p>
                飛田新地料理組合の規約に基づき、キャスト女性の写真・動画・SNS掲載は全面禁止されています。当サイト上での顔出し掲載や個人を特定できる情報の公開は一切行いません。
              </p>
            </div>

            <div>
              <h4 className="font-bold text-gray-900 mb-1">第4条（安全管理措置・SSL通信）</h4>
              <p>
                当サイトはすべての通信にSSL暗号化（HTTPS）を導入し、第三者によるデータの傍受・改ざんを防止しています。
              </p>
            </div>

            <div>
              <h4 className="font-bold text-gray-900 mb-1">第5条（改定について）</h4>
              <p>
                本プライバシーポリシーは、法令の改正やサービス内容の変更に応じて事前の予告なく改定されることがあります。改定された最新方針は本ページにて常時公開されます。
              </p>
            </div>
          </div>
        </section>

        {/* Section 10: 運営組織概要テーブル (E-E-A-T Schema 対応) */}
        <section id="company-overview" className="bg-white rounded-3xl p-6 sm:p-8 border border-rose-100 shadow-xs mb-8">
          <div className="flex items-center gap-2.5 mb-6">
            <div className="w-9 h-9 rounded-xl bg-rose-100 flex items-center justify-center text-secondary">
              <UserCheck size={20} />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-display font-bold text-[#2c1a1e]">
                9. サイト運営体制・基本概要
              </h2>
              <p className="text-xs text-on-surface-variant">
                透明性の高い直営店舗としての運営体制を公表しています。
              </p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm border-collapse">
              <tbody>
                <tr className="border-b border-rose-100">
                  <th className="py-3 px-4 font-bold text-gray-700 bg-rose-50/50 w-1/3">サイト名</th>
                  <td className="py-3 px-4 text-gray-900">飛田ガールズ（飛田新地料亭直営求人・公式採用窓口）</td>
                </tr>
                <tr className="border-b border-rose-100">
                  <th className="py-3 px-4 font-bold text-gray-700 bg-rose-50/50">運営体制</th>
                  <td className="py-3 px-4 text-gray-900">飛田新地料亭 店舗採用・女性サポートチーム（※外部の紹介所や仲介業者ではなく、お店直営の公式求人窓口です）</td>
                </tr>
                <tr className="border-b border-rose-100">
                  <th className="py-3 px-4 font-bold text-gray-700 bg-rose-50/50">店舗所在地</th>
                  <td className="py-3 px-4 text-gray-900">大阪府大阪市西成区山王（飛田新地・料理組合加盟料亭）</td>
                </tr>
                <tr className="border-b border-rose-100">
                  <th className="py-3 px-4 font-bold text-gray-700 bg-rose-50/50">運営・執筆責任者</th>
                  <td className="py-3 px-4 text-gray-900">
                    女性サポート統括担当 さくら（サポート歴8年）<br />
                    採用マネージャー 木村（管理歴12年）
                  </td>
                </tr>
                <tr className="border-b border-rose-100">
                  <th className="py-3 px-4 font-bold text-gray-700 bg-rose-50/50">業務内容</th>
                  <td className="py-3 px-4 text-gray-900">
                    飛田新地料亭の直営求人募集・面接・採用業務<br />
                    女性キャストの就業相談・店内案内・体入サポート・メイク講習・メンタルケア<br />
                    料理組合規約および法令遵守のコンプライアンス管理
                  </td>
                </tr>
                <tr className="border-b border-rose-100">
                  <th className="py-3 px-4 font-bold text-gray-700 bg-rose-50/50">求人サポート開始</th>
                  <td className="py-3 px-4 text-gray-900">2014年（現場採用・サポート実績12年）</td>
                </tr>
                <tr className="border-b border-rose-100">
                  <th className="py-3 px-4 font-bold text-gray-700 bg-rose-50/50">応募資格</th>
                  <td className="py-3 px-4 text-gray-900">満20歳以上の日本国籍を有する女性（※法令および組合規約遵守のため20歳未満不可）</td>
                </tr>
                <tr className="border-b border-rose-100">
                  <th className="py-3 px-4 font-bold text-gray-700 bg-rose-50/50">お問い合わせ窓口</th>
                  <td className="py-3 px-4 text-gray-900">公式LINE（24時間年中無休対応・完全無料）</td>
                </tr>
                <tr>
                  <th className="py-3 px-4 font-bold text-gray-700 bg-rose-50/50">情報更新ポリシー</th>
                  <td className="py-3 px-4 text-gray-900">お店の求人担当スタッフへのヒアリングと実際の募集条件をもとに随時更新（最終情報更新：2026年9月5日）</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Navigation back to Top / Blog */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 pb-8">
          <button
            onClick={onNavigateHome}
            className="w-full sm:w-auto px-6 py-3 rounded-full bg-white border border-rose-200 text-secondary font-bold text-sm hover:bg-rose-50 transition-colors flex items-center justify-center gap-2 shadow-xs cursor-pointer"
          >
            <span>求人トップページに戻る</span>
          </button>
          <button
            onClick={onNavigateBlog}
            className="w-full sm:w-auto px-6 py-3 rounded-full bg-secondary text-white font-bold text-sm hover:bg-rose-700 transition-colors flex items-center justify-center gap-2 shadow-md cursor-pointer"
          >
            <span>お仕事コラム・解説記事一覧を見る</span>
            <ArrowRight size={15} />
          </button>
        </div>
      </div>
    </div>
  );
}
