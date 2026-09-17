import React, { useState } from 'react';
import LucideIcon from './LucideIcon';

interface QuestionItem {
  id: string;
  category: 'beginner' | 'interview' | 'daily' | 'salary' | 'safety';
  question: string;
  answer: string;
  respondent: {
    name: string;
    role: string;
    avatarEmoji: string;
    badge: string;
  };
  highlight?: string;
}

const INTERVIEW_QUESTIONS: QuestionItem[] = [
  {
    id: 'beginner-ratio',
    category: 'beginner',
    question: 'Q. 未経験の女性はどのくらいいますか？',
    answer: '「実は現在在籍している女性の約90％が、夜職や風俗がまったくの未経験からスタートしています。\n学生さん、昼間OLさん、アパレルや飲食・事務職の元スタッフなど、ごく普通の女の子たちがほとんどです。\n『初めてだから不安…』という気持ちは誰もが通る道です。初日は経験豊富な女性スタッフが横について、丁寧にお茶やお菓子の出し方からご案内しますので、どうぞ安心して飛び込んできてくださいね。」',
    respondent: {
      name: 'さくら',
      role: '女性サポートスタッフ・相談窓口歴8年',
      avatarEmoji: '🌸',
      badge: '女性目線サポート'
    },
    highlight: '在籍女性の約90%が未経験スタート！'
  },
  {
    id: 'first-day-anxiety',
    category: 'beginner',
    question: 'Q. 初日に一番不安になることは何ですか？',
    answer: '「一番多い不安は『玄関に座るときに誰かに見られないか（身バレ）』と『お客さまにどんな話をすればいいか』の2点です。\n身バレに関しては、飛田新地は組合規約により観光客を含め街全体の写真・動画撮影が一切禁止されているため、SNS等に写真が出回る心配はありません。\nまた、お話も無理に盛り上げる必要はなく、笑顔でお茶を出して『いらっしゃい』と軽く会釈するだけで充分喜んでいただけます。隣に頼れる仲居さん（おばちゃん）が常についていますので、一人で困ることはありません。」',
    respondent: {
      name: 'さくら',
      role: '女性サポートスタッフ・相談窓口歴8年',
      avatarEmoji: '🌸',
      badge: '現場サポート'
    },
    highlight: '街全体撮影禁止＆隣におばちゃんがいるから安心'
  },
  {
    id: 'interview-questions',
    category: 'interview',
    question: 'Q. 面接で何を聞かれますか？',
    answer: '「一般的な就活のような、かしこまった志望動機や自己PRは一切不要です！\n面接でお伺いするのは、主に次の点だけです：\n・いつから働きたいか（即日体入希望か、後日スタートか）\n・週に何日くらい入りたいか（月数回、週末のみ、週5レギュラーなど）\n・目標とする金額（今月いくら稼ぎたいか）\n・身バレ対策や昼職との掛け持ちなど、配慮すべき事情があるか\n履歴書は不要で、私服のまま手ぶらでお越しいただけます。駅前のカフェ等での出張面談も毎日対応しています。」',
    respondent: {
      name: '木村',
      role: '採用マネージャー・面接担当歴12年',
      avatarEmoji: '👨‍💼',
      badge: '採用責任者'
    },
    highlight: '履歴書不要・志望動機不要！手ぶらで希望を伝えるだけ'
  },
  {
    id: 'suitable-type',
    category: 'daily',
    question: 'Q. どんな女性が働きやすいですか？',
    answer: '「『笑顔で挨拶ができる方』『愛嬌がある方』が一番働きやすく、お客さまからも仲居さんからもとても大切にされます。\n特別な美人である必要や、派手なルックス、流暢なトーク力はまったく求められません。\n素直にお客さまを温かく迎えられる女性は、未経験でも初日からしっかり指名を獲得し、高額なお給料をお持ち帰りいただいています。」',
    respondent: {
      name: '木村',
      role: '採用マネージャー・面接担当歴12年',
      avatarEmoji: '👨‍💼',
      badge: '採用責任者'
    },
    highlight: 'ルックスより「笑顔と愛嬌」。素直な方が一番稼げます'
  },
  {
    id: 'unsuitable-type',
    category: 'daily',
    question: 'Q. 逆に向いていない人はどんな人ですか？',
    answer: '「仲居さん（おばちゃん）のアドバイスに耳を傾けられない方や、連絡なしの無断欠勤・遅刻を繰り返してしまう方は長続きしにくいです。\n飛田新地はお客さまを呼び込んでくれる仲居さんとの信頼関係がとても大切です。逆に言えば、挨拶と約束をしっかり守れる誠実ささえあれば、経験や年齢に関係なく誰でも安定して高収入を得ることができます。」',
    respondent: {
      name: 'さくら',
      role: '女性サポートスタッフ・相談窓口歴8年',
      avatarEmoji: '🌸',
      badge: '現場サポート'
    },
    highlight: '無断欠勤せず、挨拶と約束を守れる方なら誰でも歓迎'
  },
  {
    id: 'daily-flow',
    category: 'daily',
    question: 'Q. 1日の仕事の流れはどんな感じですか？',
    answer: '「大まかな1日の流れは以下の通りです：\n① 出勤：更衣室で衣装に着替え、メイク直し（無料貸出あり）\n② 玄関着席：仲居さんと並んで座り、通りのお客さまをお出迎え\n③ 2階へご案内：お客さまがお上がりになったら、お茶とお菓子でおもてなし（1回約15〜20分）\n④ お見送り＆リセット：退室後、お部屋を整えて再び玄関へ\n⑤ 勤務終了＆全額日払い：その日の稼ぎ（15分5,000円・20分7,500円等の手取り合計額）をその場で全額現金手渡し。そのまま帰宅または寮へ！\n\nお酒を飲む場面は一切なく、短時間接客の繰り返しなので、体力的な負担がとても少ないのが特徴です。」',
    respondent: {
      name: 'さくら',
      role: '女性サポートスタッフ・相談窓口歴8年',
      avatarEmoji: '🌸',
      badge: '1日の流れ'
    },
    highlight: '1回15〜20分のお茶出し接客。お酒は一切不要'
  },
  {
    id: 'salary-calculation',
    category: 'salary',
    question: 'Q. 給料はどう計算されますか？',
    answer: '「飛田新地の給与計算式は、料理組合規約で厳格に定められた明朗会計です：\n\n【公式計算式】：(お客様の支払料金 − 仲居さん取り分1,000円) ÷ 2 ＝ 女の子の給料\n\n▼コース別の手取り給料（一律固定給）：\n・15分コース（お客様支払 11,000円）→ 手取り 5,000円（仲居さん1,000円 / 料亭5,000円）\n・20分コース（お客様支払 16,000円）→ 手取り 7,500円（仲居さん1,000円 / 料亭7,500円）\n・30分コース（お客様支払 21,000円）→ 手取り 10,000円（仲居さん1,000円 / 料亭10,000円）\n・45分コース（お客様支払 31,000円）→ 手取り 15,000円（仲居さん1,000円 / 料亭15,000円）\n・60分コース（お客様支払 41,000円）→ 手取り 20,000円（仲居さん1,000円 / 料亭20,000円）\n\n1日平均6〜10名のお客さまをおもてなしするため、日給5万円〜8万円前後、忙しい週末なら日給10万円超えも珍しくありません。\n当店では仲居さんの1,000円以外、不明瞭な雑費引き、厚生費引き、待機カット、罰金は一切なく、終了時に全額現金手渡しでお渡ししています。」',
    respondent: {
      name: '木村',
      role: '採用マネージャー・給与管理担当歴12年',
      avatarEmoji: '👨‍💼',
      badge: '給与計算式'
    },
    highlight: '(お客様支払 - 仲居1,000円)÷2＝手取り給料。15分5,000円・20分7,500円'
  },
  {
    id: 'alcohol-free',
    category: 'daily',
    question: 'Q. お酒が飲めなくても本当に大丈夫ですか？',
    answer: '「100%大丈夫です！飛田新地は料亭ですので、お酒の提供やお客さまとのお酒の飲み比べは一切ありません。\n提供するのは緑茶やウーロン茶などのソフトドリンクのみです。\n二日酔いで翌日の昼職や学校に響く心配も一切なく、お酒が苦手な方でも健康的に働いていただけます。」',
    respondent: {
      name: 'さくら',
      role: '女性サポートスタッフ・相談窓口歴8年',
      avatarEmoji: '🌸',
      badge: 'お酒不要'
    },
    highlight: 'お酒一切不要！緑茶・ウーロン茶等のお茶出しのみ'
  },
  {
    id: 'privacy-safety',
    category: 'safety',
    question: 'Q. 身バレやプライバシー対策は徹底されていますか？',
    answer: '「徹底しています。お仕事中は100%源氏名（偽名）で活動し、本名が外部に出ることはありません。\nネットやSNSへの顔写真・体写真の掲載も一切行いません。\nまた、会社員や公務員を目指すWワークの女性には、住民税を会社に通知させない『普通徴収』の具体的な申告手続きも丁寧にレクチャーしています。」',
    respondent: {
      name: '木村',
      role: '採用マネージャー・法務担当歴12年',
      avatarEmoji: '👨‍💼',
      badge: '個人情報厳守'
    },
    highlight: '完全源氏名・ネット掲載ゼロ・住民税普通徴収サポート'
  },
  {
    id: 'trial-shift',
    category: 'interview',
    question: 'Q. 体験入店（体入）だけでも本当に大丈夫ですか？',
    answer: '「もちろん大歓迎です！『まずは1日だけやってみて、雰囲気が合わなければそのまま終わる』というスタンスで全く問題ありません。\n体験入店当日も、通常キャストとまったく同じ条件（15分5,000円・20分7,500円〜の一律固定給）で働いた回数分のお給料を全額即日現金手渡しいたします。\n無理な引き止めや後日のしつこい営業連絡は一切ありませんので、気楽な気持ちでお試しください。」',
    respondent: {
      name: '木村',
      role: '採用マネージャー・面接担当歴12年',
      avatarEmoji: '👨‍💼',
      badge: '体験入店歓迎'
    },
    highlight: '体験入店のみで即日終了OK・全額即日日払い・引き止めなし'
  }
];

export default function RecruiterInterviewSection() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [openQuestionIds, setOpenQuestionIds] = useState<Record<string, boolean>>({
    'beginner-ratio': true,
    'first-day-anxiety': true,
    'interview-questions': true,
    'salary-calculation': true
  });

  const categories = [
    { id: 'all', label: 'すべて表示', count: INTERVIEW_QUESTIONS.length },
    { id: 'beginner', label: '🔰 初心者・未経験', count: INTERVIEW_QUESTIONS.filter(q => q.category === 'beginner').length },
    { id: 'interview', label: '🤝 面接・体入', count: INTERVIEW_QUESTIONS.filter(q => q.category === 'interview').length },
    { id: 'daily', label: '🍵 仕事内容・1日', count: INTERVIEW_QUESTIONS.filter(q => q.category === 'daily').length },
    { id: 'salary', label: '💰 給与・待遇', count: INTERVIEW_QUESTIONS.filter(q => q.category === 'salary').length },
    { id: 'safety', label: '🔒 身バレ・安全', count: INTERVIEW_QUESTIONS.filter(q => q.category === 'safety').length }
  ];

  const filteredQuestions = selectedCategory === 'all'
    ? INTERVIEW_QUESTIONS
    : INTERVIEW_QUESTIONS.filter(q => q.category === selectedCategory);

  const toggleQuestion = (id: string) => {
    setOpenQuestionIds(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <section className="my-10 rounded-3xl border-2 border-rose-200 bg-white p-6 sm:p-8 shadow-xs">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-rose-100">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-rose-700 bg-rose-50 px-3 py-1 rounded-full border border-rose-200/80 mb-2">
            <LucideIcon name="MessageSquareText" size={14} className="text-rose-600" />
            <span>店舗直撃ヒアリング・生の声</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-zinc-900 tracking-tight">
            実際にお店の求人担当者へのインタビュー
          </h3>
          <p className="text-xs sm:text-sm text-zinc-600 mt-1">
            面接・給与担当の木村マネージャーと、女性相談窓口のさくらスタッフがリアルな現場実態に本音で回答しました。
          </p>
        </div>

        {/* Staff Mini Profiles */}
        <div className="flex items-center gap-3 bg-rose-50/60 p-2.5 rounded-2xl border border-rose-100/80 shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-blue-100 border border-blue-200 flex items-center justify-center text-base">
              👨‍💼
            </div>
            <div className="text-[11px] leading-tight">
              <span className="font-bold text-zinc-900 block">木村MG</span>
              <span className="text-zinc-500 text-[10px]">採用担当12年</span>
            </div>
          </div>
          <div className="w-px h-6 bg-rose-200" />
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-pink-100 border border-pink-200 flex items-center justify-center text-base">
              🌸
            </div>
            <div className="text-[11px] leading-tight">
              <span className="font-bold text-zinc-900 block">さくら</span>
              <span className="text-zinc-500 text-[10px]">女性相談8年</span>
            </div>
          </div>
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none py-4 border-b border-rose-50">
        {categories.map(cat => (
          <button
            key={cat.id}
            type="button"
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all shrink-0 cursor-pointer flex items-center gap-1 ${
              selectedCategory === cat.id
                ? 'bg-rose-600 text-white shadow-xs'
                : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
            }`}
          >
            <span>{cat.label}</span>
            <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
              selectedCategory === cat.id ? 'bg-white/30 text-white' : 'bg-zinc-200 text-zinc-600'
            }`}>
              {cat.count}
            </span>
          </button>
        ))}
      </div>

      {/* Q&A Accordion List */}
      <div className="mt-5 space-y-3">
        {filteredQuestions.map(item => {
          const isOpen = !!openQuestionIds[item.id];
          return (
            <div
              key={item.id}
              className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                isOpen
                  ? 'border-rose-300 bg-rose-50/20 shadow-xs'
                  : 'border-zinc-200/80 bg-white hover:border-rose-200'
              }`}
            >
              {/* Question Header */}
              <button
                type="button"
                onClick={() => toggleQuestion(item.id)}
                className="w-full p-4 sm:p-5 flex items-start justify-between gap-3 text-left cursor-pointer"
              >
                <div className="flex items-start gap-3">
                  <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-rose-600 text-white text-xs font-black shrink-0 mt-0.5 shadow-2xs">
                    Q
                  </span>
                  <div>
                    <h4 className="font-bold text-sm sm:text-base text-zinc-900 leading-snug">
                      {item.question}
                    </h4>
                    {item.highlight && (
                      <span className="inline-block mt-1 text-[11px] font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-md border border-rose-100">
                        {item.highlight}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0 text-zinc-400 mt-1">
                  <div className="w-6 h-6 rounded-full bg-zinc-100 flex items-center justify-center text-zinc-500">
                    <LucideIcon name={isOpen ? 'ChevronUp' : 'ChevronDown'} size={14} />
                  </div>
                </div>
              </button>

              {/* Answer Body */}
              {isOpen && (
                <div className="px-4 sm:px-5 pb-5 pt-1 border-t border-rose-100/60">
                  <div className="bg-white rounded-xl p-4 border border-rose-100 shadow-2xs">
                    {/* Respondent Badge */}
                    <div className="flex items-center justify-between gap-2 pb-2.5 mb-2.5 border-b border-zinc-100 text-xs">
                      <div className="flex items-center gap-2">
                        <span className="text-base">{item.respondent.avatarEmoji}</span>
                        <span className="font-bold text-zinc-900">
                          回答者：{item.respondent.name}
                        </span>
                        <span className="text-[11px] text-zinc-500 hidden sm:inline">
                          （{item.respondent.role}）
                        </span>
                      </div>
                      <span className="text-[10px] font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-full border border-rose-200">
                        {item.respondent.badge}
                      </span>
                    </div>

                    {/* Answer Text */}
                    <p className="text-xs sm:text-sm text-zinc-700 leading-relaxed whitespace-pre-line font-medium">
                      {item.answer}
                    </p>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Trust Footer Notice */}
      <div className="mt-6 pt-5 border-t border-rose-100 text-center text-xs text-zinc-500 flex flex-col sm:flex-row items-center justify-center gap-2">
        <span className="inline-flex items-center gap-1 font-bold text-rose-700">
          <LucideIcon name="ShieldCheck" size={14} />
          店舗ヒアリング実施済み・最新実態掲載
        </span>
        <span className="hidden sm:inline text-zinc-300">|</span>
        <span>ご不明な点や個別のご相談は、公式LINEよりいつでも匿名でお問い合わせいただけます。</span>
      </div>
    </section>
  );
}
