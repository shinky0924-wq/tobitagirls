import fs from 'fs';
import path from 'path';
import { SITE_COMPARISON_ROWS, TARGET_JOB_CATEGORIES } from './compareData';
import { TOPIC_CLUSTERS } from './topicClusterData';
import { FAQ_100_LIST, FAQ_8_CATEGORIES } from './faq100Data';

export function escapeHtml(str: string): string {
  return String(str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export function resolveFullImageUrl(eyeCatch?: string): string {
  if (!eyeCatch) {
    return 'https://tobitashinchi-recruit.com/images/col_beginner_guide_art_1787803245812.jpg';
  }
  const clean = eyeCatch.trim();
  if (clean.startsWith('http://') || clean.startsWith('https://')) {
    return clean;
  }
  const filename = clean.split('/').pop()?.split('?')[0];
  if (filename) {
    return `https://tobitashinchi-recruit.com/images/${filename}`;
  }
  return 'https://tobitashinchi-recruit.com/images/col_beginner_guide_art_1787803245812.jpg';
}

const DEFAULT_TITLE = '飛田新地求人｜未経験歓迎・高収入・求人情報を徹底解説｜飛田ガールズ';
const DEFAULT_DESC = '【飛田新地求人公式】未経験歓迎・高収入（日給5万〜10万円即日全額日払い）。仕事内容、給料システム、20代・未経験の応募条件、面接・体験入店の流れ、個室マンション寮完備。女性サポートスタッフによる無料相談受付中。';
const DEFAULT_IMAGE = 'https://tobitashinchi-recruit.com/images/tobita_dream_hero_banner_1782557055526.jpg';

function buildCompareNoscript(slug?: string): string {
  if (slug) {
    const cat = TARGET_JOB_CATEGORIES.find(c => c.slug === slug);
    if (cat) {
      const meritsHtml = cat.merits.map(m => `<li>${escapeHtml(m)}</li>`).join('');
      const faqsHtml = cat.faqs.map(f => `<dt>Q. ${escapeHtml(f.q)}</dt><dd>A. ${escapeHtml(f.a)}</dd>`).join('');

      return `
        <header>
          <p>飛田新地求人比較＆目的別求人ガイド【公式】飛田ガールズ</p>
          <p>24時間受付中・相談無料・完全秘密厳守</p>
        </header>

        <main>
          <article>
            <h1>${escapeHtml(cat.title)}｜飛田新地求人 飛田ガールズ【公式】</h1>
            <p class="lead">${escapeHtml(cat.summary)} 安心の料理組合公認老舗料亭直営公式求人「飛田ガールズ」で、未経験からでも即日全額日払い（売上50%手渡し）・身バレ完全防止・お酒不要・女性専任サポート完備で働けます。</p>

            <section>
              <h2>${escapeHtml(cat.title)} 募集条件・収入モデル</h2>
              <table border="1">
                <tbody>
                  <tr><th>対象者</th><td>${escapeHtml(cat.targetUser)}</td></tr>
                  <tr><th>日給目安</th><td><strong>${escapeHtml(cat.dailyIncomeModel)}</strong></td></tr>
                  <tr><th>月収目安</th><td>${escapeHtml(cat.monthlyIncomeModel)}</td></tr>
                  <tr><th>シフト例</th><td>${escapeHtml(cat.shiftExample)}</td></tr>
                  <tr><th>おすすめ通り</th><td>${escapeHtml(cat.recommendedStreet)}</td></tr>
                  <tr><th>給与支払い</th><td>完全即日全額日払い（手渡し支給・売上50%バック・天引きなし）</td></tr>
                  <tr><th>応募資格</th><td>20歳以上の女性（未経験歓迎・経験不問 ※料理組合規約により20歳未満不可）</td></tr>
                  <tr><th>待遇・寮</th><td>家具家電付き個室マンション寮完備（即入居可・日額1,000円〜）・衣装無料貸出・交通費支給・完全身バレ対策</td></tr>
                </tbody>
              </table>
            </section>

            <section>
              <h2>選ばれる理由と安心のメリット</h2>
              <ul>${meritsHtml}</ul>
            </section>

            <section>
              <h2>他求人サイト（飛田ジョブなど）やスカウトとの違い</h2>
              <p>料亭直営公式求人「飛田ガールズ」は、外部の広告代理店や他求人サイト（飛田ジョブなど）のような中間マージンや掲載費用が一切発生しません。また、街頭・SNSスカウト業者のような日給からの10〜30%ピンハネ搾取も完全ゼロです。売上の50%がその日の退勤時に全額手渡し支給されます。</p>
            </section>

            <section>
              <h2>よくある質問（FAQ）</h2>
              <dl>${faqsHtml}</dl>
            </section>

            <section>
              <h2>料亭直営公式採用窓口（飛田ガールズ）</h2>
              <p>24時間365日、専任の女性サポートスタッフがLINEおよびお電話で質問やご相談を受付中です。無理な勧誘や引き止めは一切ありませんので、お気軽にお問い合わせください。</p>
            </section>
          </article>
        </main>
      `;
    }
  }

  // Default: Main /compare
  const rowsHtml = SITE_COMPARISON_ROWS.map(r => `
    <tr>
      <th>${escapeHtml(r.criteria)}</th>
      <td><strong>${escapeHtml(r.ourShop.text)}</strong></td>
      <td>${escapeHtml(r.scoutAgency.text)}</td>
      <td>${escapeHtml(r.generalPortal.text)}</td>
      <td>${escapeHtml(r.otherNightwork.text)}</td>
    </tr>
  `).join('');

  return `
    <header>
      <p>飛田新地求人サイト比較＆目的別求人ガイド【2026年最新】｜未経験・高収入・Wワーク【公式】</p>
      <p>24時間受付中・相談無料・完全秘密厳守</p>
    </header>

    <main>
      <article>
        <h1>飛田新地求人サイト比較＆目的別求人ガイド【2026年最新】｜未経験・高収入・Wワーク【公式】</h1>
        <p class="lead">飛田新地の料亭直営公式求人「飛田ガールズ」と、街頭・SNSスカウト業者、他求人サイト（飛田ジョブなど）、一般ナイトワーク（ソープ・ヘルス等）の4者を徹底比較。安心の料理組合公認料亭直営で即日全額日払い（売上50%手渡し）・身バレ完全防止・お酒不要・仲介手数料0円の理由を詳しく解説します。</p>

        <section>
          <h2>求人サイト・応募方法の4者徹底比較表</h2>
          <p>飛田新地で働く際の4つの応募ルート（料亭直営公式採用・スカウト業者・他求人サイト（飛田ジョブなど）・他業種ナイトワーク）を主要8項目で徹底比較した一覧表です。</p>
          <table border="1">
            <thead>
              <tr>
                <th>比較項目</th>
                <th>【公式】飛田ガールズ<br>（料亭直営採用）</th>
                <th>街頭・SNSスカウト業者<br>（非公認仲介）</th>
                <th>他求人サイト<br>（飛田ジョブなど）</th>
                <th>他業種ナイトワーク<br>（ソープ・ヘルス等）</th>
              </tr>
            </thead>
            <tbody>
              ${rowsHtml}
            </tbody>
          </table>
        </section>

        <section id="workstyle-diagnostic">
          <h2>結局、自分にはどれが合ってる？</h2>
          <p>求人サイトやスカウトが色々あって選べない方へ。あなたの今の希望やお悩みに合わせた最適な働き方の導線一覧です。</p>
          <table border="1">
            <thead>
              <tr>
                <th>あなたの希望</th>
                <th>こんな働き方がおすすめ</th>
                <th>詳しく見る</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>🩷 初めてで何もわからない</td>
                <td><strong>未経験向け求人</strong></td>
                <td>在籍女性の約9割が完全未経験。お酒不要・営業連絡なし・初日から丁寧な講習あり。<a href="/compare/inexperienced">未経験向け求人を見る</a></td>
              </tr>
              <tr>
                <td>💰 とにかくしっかり稼ぎたい</td>
                <td><strong>高収入重視</strong></td>
                <td>売上50%完全即日全額日払い手渡し。日給10万〜15万円以上の実績多数・天引きゼロ。<a href="/compare/high-income">高収入求人を見る</a></td>
              </tr>
              <tr>
                <td>🏠 家から通うのが難しい</td>
                <td><strong>寮・住み込み</strong></td>
                <td>天王寺・難波周辺の家具家電付きオートロック個室寮完備。日額1,000円〜・即日入居OK。<a href="/compare/dormitory">寮・住み込み求人を見る</a></td>
              </tr>
              <tr>
                <td>💼 昼職と両立したい</td>
                <td><strong>Wワーク向け</strong></td>
                <td>週1日・月1回〜OKの完全自由シフト制。ノルマ・出勤催促なし・住民税対策も万全。<a href="/compare/double-work">Wワーク向け求人を見る</a></td>
              </tr>
              <tr>
                <td>✈️ 短期間だけ働きたい</td>
                <td><strong>短期・出稼ぎ</strong></td>
                <td>往復交通費全額支給。1週間〜1ヶ月の短期集中で100万円以上の貯金達成者多数。<a href="/compare/short-term">短期・出稼ぎ求人を見る</a></td>
              </tr>
              <tr>
                <td>🙈 身バレが一番心配</td>
                <td><strong>身バレ対策重視</strong></td>
                <td>街全体で撮影完全禁止・Web写真掲載ゼロ・完全源氏名・手渡し日払いで秘密厳守。<a href="/safety">安全対策・身バレ防止を見る</a></td>
              </tr>
              <tr>
                <td>💬 まだ応募するか迷っている</td>
                <td><strong>まず相談</strong></td>
                <td>女性スタッフが24時間受付。質問や話を聞くだけでも大歓迎、無理な勧誘ゼロ。</td>
              </tr>
            </tbody>
          </table>

          <div style="margin-top: 1.5rem; padding: 1.5rem; background: #fff1f2; border: 1px solid #fecdd3; border-radius: 12px; text-align: center;">
            <p><strong>どれを選べばいいかわからない方も大丈夫。</strong><br>希望や不安を聞いて、あなたに合った働き方を一緒に考えます。</p>
            <p style="color: #e11d48; font-weight: bold;">「話だけ聞いてみたい」でもOK</p>
            <p><a href="https://line.me" style="display: inline-block; background: #06c755; color: #ffffff; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: bold;">→ 女性スタッフに相談する</a></p>
          </div>
        </section>

        <section id="section-reasons-direct">
          <h2>飛田新地の料亭直営が選ばれる3つの理由</h2>
          <p>他求人サイトやスカウト業者、一般ナイトワークと比較して、なぜ料亭直営公式採用「飛田ガールズ」が選ばれ続けているのか、その決定的な3つの違いを解説します。</p>
          <div>
            <h3>1. 他求人サイト（飛田ジョブなど）との違い：中間コストゼロで待遇を最大還元</h3>
            <p>一般的な求人ポータルサイトは広告掲載料や仲介手数料を店舗側から徴収しています。一方、当グループは料理組合公認の料亭直営窓口のため、余計な中間マージンが完全ゼロです。その分、売上50%の完全手渡し日払いや、家具家電付きの完全個室寮補助、交通費全額支給など、働く女性への給与と待遇として最大限に直接還元しています。</p>
          </div>
          <div>
            <h3>2. 街頭・SNSスカウト業者との違い：一生搾取されるピンハネのリスクを完全排除</h3>
            <p>街頭やSNS（X/旧Twitter・インスタ）の裏垢スカウト業者経由で応募すると、あなたの日給・月収から毎月10〜30%が「紹介料」として永久に天引き・搾取され続けます。さらに個人情報の横流しや、辞めたい時の法外な違約金請求・脅迫被害も多発しています。料亭直営なら公認店舗への直接採用のため、ピンハネや個人情報流出のリスクを完全排除。辞めたい時も違約金0円で即日退店可能です。</p>
          </div>
          <div>
            <h3>3. 一般ナイトワーク（ソープ・ヘルス・キャバクラ）との違い：顔出し不要＆お酒不要で負担最小限</h3>
            <p>一般の風俗やキャバクラでは、ネットへの写真・動画掲載やお酒の飲酒、お客様との営業LINE・同伴アフター、重労働のお風呂洗い・待機カットなどが避けられません。飛田新地は街全体で一般人の撮影が禁止されており写真ネット掲載は完全ゼロ。お酒を飲む必要も一切なく、1回15〜20分の短時間接客（お茶出し・会話）のため、心身への負担を最小限に抑えながら日給5万〜15万円以上の高収入を達成できます。</p>
          </div>
        </section>

        <section id="section-target-categories">
          <h2>目的別・あなたの希望に合った求人スタイル（8大ターゲット別）</h2>
          <p>あなたの年齢や希望の働き方・ライフスタイルに合わせて、8つのターゲット別求人ページで詳しい条件をご確認いただけます。</p>
          <ul>
            <li><strong>1. <a href="/compare/inexperienced">未経験向け求人</a>：</strong>在籍女性の約9割が完全未経験。お酒不要・営業連絡なし・初日30分の丁寧なマンツーマン研修で安心スタート。</li>
            <li><strong>2. <a href="/compare/high-income">高収入向け求人</a>：</strong>売上50%完全即日日払い手渡し。メイン通りの高回転で日給10万円超え・月収150万円以上の実績多数。</li>
            <li><strong>3. <a href="/compare/weekly-1">週1日・マイペース求人</a>：</strong>完全自由シフト制。スキマ時間3時間〜OK、シフトの強制や催促一切なし。</li>
            <li><strong>4. <a href="/compare/short-term">短期・出稼ぎ求人</a>：</strong>全国どこからでも往復交通費全額支給。1週間〜1ヶ月の短期集中で100万円超のスピード貯金が可能。</li>
            <li><strong>5. <a href="/compare/dormitory">個室寮完備求人</a>：</strong>天王寺・難波周辺の家具家電付きオートロック個室マンション完備。即日入居OK・初期費用0円。</li>
            <li><strong>6. <a href="/compare/double-work">Wワーク・副業向け求人</a>：</strong>昼職OL・会社員・学生のための副業。完全源氏名・私服通勤・住民税の普通徴収ガイド完備で会社バレ防止。</li>
            <li><strong>7. <a href="/compare/age-20s">20代向け求人</a>：</strong>青春通り・メイン通りで圧倒的人気と稼働率。同年代の女性が多くアットホームな環境。</li>
            <li><strong>8. <a href="/compare/age-30s">30代・オトナ女子向け求人</a>：</strong>落ち着いた紳士的な客層・高単価接客。年齢を気にせず自然体でマイペースに高収入。</li>
          </ul>
        </section>

        <section id="section-job-details">
          <h2>1. 仕事内容｜お茶出しと和室での接客・お酒や営業は一切不要</h2>
          <p>飛田新地の料亭でのお仕事は、老舗料亭の和室（座敷）でお客様とお茶を飲みながら会話を楽しむ「おもてなし接客」です。お酒を飲む必要は一切なく、客引きや営業活動も不要。未経験の方でも自然体でスタートできます。</p>
          <ul>
            <li><strong>座敷でのお茶出し・和室接客：</strong>お酒を飲む必要は一切ありません。お茶やジュースでのおもてなしなので、体調不良の心配がなく翌日の予定にも響きません。</li>
            <li><strong>1回15〜20分の短時間接客：</strong>1人のお客様に対する接客時間はわずか15〜20分程度。長時間の拘束やお風呂洗いなどの重労働はありません。</li>
            <li><strong>客引き・営業活動ゼロ：</strong>玄関先でのお声がけや客引きは専任の仲居さん（おばちゃん）が全て行います。自分から営業するストレスはありません。</li>
            <li><strong>お客様との連絡先交換禁止：</strong>店外での付きまといやストーカー・プライベート侵害を完全防止。営業LINEや同伴・アフターも一切不要です。</li>
          </ul>
        </section>

        <section id="section-salary">
          <h2>2. 給料｜売上50%完全バック・全額即日手渡し日払い</h2>
          <p>料理組合公認の料亭直営公式採用だからこそ、スカウト業者や仲介会社のような紹介料ピンハネ（10〜30%搾取）は一切ありません。当日の売上折半（完全50%）がその場で全額現金手渡しされます。日給相場は3万〜15万円超（平均日給5万〜8万円）、待機カットや雑費天引きは完全0円です。</p>
          <ul>
            <li><strong>マイペース週2日（Wワーク）：</strong>月収35万〜50万円（日給約4.5万円×月8日）</li>
            <li><strong>しっかり週4日（レギュラー）：</strong>月収80万〜120万円（日給約6万円×月16日）</li>
            <li><strong>短期集中・出稼ぎ（週5〜6日）：</strong>月収150万〜200万円超（日給約7〜8万円×月22日）</li>
          </ul>
        </section>

        <section id="section-benefits">
          <h2>3. 待遇｜家具家電付き個室寮・衣装無料・写真非掲載の徹底</h2>
          <p>天王寺・難波周辺に家具家電付きオートロック個室マンション寮完備（日額1,000円〜・即日入居OK）。全国からの往復交通費を全額支給。街全体で撮影禁止のためネットへの写真掲載100%ゼロ、完全源氏名・私服通勤で身バレを防ぎます。</p>
        </section>

        <section id="section-workstyle">
          <h2>4. 勤務時間｜10:00〜24:00 完全自由出勤・短時間勤務OK</h2>
          <p>10:00〜24:00の間で完全自由シフト制。昼だけ（10:00〜18:00）、夜だけ（17:00〜24:00）、1日3〜4時間のスキマ時間勤務、週1日や月数回など、ライフスタイルに合わせて無理なく働けます。</p>
        </section>

        <section id="section-area">
          <h2>5. エリア｜大阪・飛田新地（主要駅好アクセス・通りの特徴）</h2>
          <p>地下鉄動物園前駅徒歩5分、天王寺駅徒歩10分、新今宮駅徒歩7分。青春通り（20代中心）、メイン通り・大門通り（高稼働）、妖怪通り（落ち着いた大人女子）など、各通りの特徴に合わせて最適な店舗をご案内します。</p>
        </section>

        <section id="section-flow">
          <h2>応募から面接・体験入店までの流れ</h2>
          <ol>
            <li><strong>公式LINEからお気軽相談：</strong>質問や相談だけでも大歓迎。24時間受付中。</li>
            <li><strong>店舗見学・私服面接：</strong>履歴書不要。手ぶら・私服でリラックスしてお越しいただけます。</li>
            <li><strong>即日体験入店（全額日払い）：</strong>当日の体験入店で稼いだお給料はその場で全額手渡し。</li>
            <li><strong>本入店・自由出勤スタート：</strong>合わない場合は無理な引き止めは一切ありません。</li>
          </ol>
        </section>

        <section id="section-requirements">
          <h2>応募資格・必要書類</h2>
          <p>20歳以上の日本国籍を有する女性（料理組合規約遵守のため20歳未満不可）。年齢確認書類として「本籍地記載の住民票原本」または「日本国パスポート原本」が必要です。履歴書は不要です。</p>
        </section>

        <section>
          <h2>比較ページ よくある質問（FAQ）</h2>
          <dl>
            <dt>Q. 他の求人サイト（飛田ジョブ等）やスカウト経由で応募するのと何が違いますか？</dt>
            <dd>A. 最大の違いは「仲介料の有無」と「現場サポートの有無」です。スカウトは給料から手数料を中抜きし、他サイトは現場にスタッフがいません。当サイトは料亭直営のため仲介料0円で売上50%を即日全額支給し、女性スタッフが現場に常駐して親身にサポートします。</dd>
            <dt>Q. 体験入店だけでも比較・確認できますか？</dt>
            <dd>A. はい、大歓迎です。即日体験入店に対応しており、当日稼いだ給与はその場で全額現金手渡しいたします。合わないと感じた場合も無理な引き止めは一切ありません。</dd>
            <dt>Q. 面接や相談の前に用意するものはありますか？</dt>
            <dd>A. 履歴書は不要です。年齢確認（20歳以上限定）のため「本籍地記載の住民票原本」または「日本国パスポート」をお持ちください。私服で手ぶらでお越しいただけます。</dd>
          </dl>
        </section>

        <section>
          <h2>料亭直営公式採用窓口（飛田ガールズ）</h2>
          <p>24時間365日、専任の女性サポートスタッフがLINEおよびお電話で質問やご相談を受付中です。無理な勧誘や引き止めは一切ありませんので、お気軽にお問い合わせください。</p>
        </section>
      </article>
    </main>
  `;
}

function buildFaqNoscript(categorySlug?: string): string {
  const cat = categorySlug ? FAQ_8_CATEGORIES.find(c => c.slug === categorySlug || c.id === categorySlug) : undefined;
  
  if (cat && cat.id !== 'all') {
    const items = FAQ_100_LIST.filter(item => item.eightCategory === cat.id);
    const faqsHtml = items.map(item => `
      <dt>Q. ${escapeHtml(item.question)}</dt>
      <dd>A. ${escapeHtml(item.answer)}</dd>
    `).join('');

    const otherCatsHtml = FAQ_8_CATEGORIES.filter(c => c.id !== 'all' && c.id !== cat.id).map(c => `
      <li><a href="/faq/${c.slug}"><strong>${escapeHtml(c.label)}</strong>（${escapeHtml(c.shortLabel)}）の質問一覧</a></li>
    `).join('');

    return `
      <header>
        <p>飛田新地求人 FAQ【${escapeHtml(cat.label)}】（全${items.length}問・本音回答）｜飛田ガールズ【公式】</p>
        <p>24時間受付中・相談無料・完全秘密厳守</p>
      </header>
      <main>
        <article>
          <h1>飛田新地求人 よくある質問【${escapeHtml(cat.label)}】全${items.length}問</h1>
          <p class="lead">${escapeHtml(cat.description)}。飛田新地料理組合公認老舗料亭直営の専任女性スタッフが、現場の事実に基づき忖度なしの本音で回答しています。</p>
          <section>
            <h2>${escapeHtml(cat.label)}に関する質問と回答</h2>
            <dl>
              ${faqsHtml}
            </dl>
          </section>
          <section>
            <h2>その他のテーマ別よくある質問</h2>
            <ul>
              <li><a href="/faq">すべての質問（全119問一覧）を見る</a></li>
              ${otherCatsHtml}
            </ul>
          </section>
          <section>
            <h2>公式LINE無料相談窓口</h2>
            <p>疑問や不安な点は、専任の女性スタッフにLINEでいつでも匿名相談いただけます（24時間受付中・完全秘密厳守）。</p>
          </section>
        </article>
      </main>
    `;
  }

  // General FAQ page (/faq)
  const categorySectionsHtml = FAQ_8_CATEGORIES.filter(c => c.id !== 'all').map(c => {
    const items = FAQ_100_LIST.filter(item => item.eightCategory === c.id);
    const topItems = items.slice(0, 5);
    const itemsHtml = topItems.map(it => `
      <dt>Q. ${escapeHtml(it.question)}</dt>
      <dd>A. ${escapeHtml(it.answer)}</dd>
    `).join('');

    return `
      <section>
        <h2>${escapeHtml(c.label)}（全${items.length}問）</h2>
        <p>${escapeHtml(c.description)} <a href="/faq/${c.slug}">${escapeHtml(c.label)}の質問をすべて見る（全${items.length}問）</a></p>
        <dl>
          ${itemsHtml}
        </dl>
      </section>
    `;
  }).join('');

  return `
    <header>
      <p>飛田新地求人 FAQ（全119問・8大テーマ完全網羅）｜未経験・給料・身バレ・面接【公式】</p>
      <p>24時間受付中・相談無料・完全秘密厳守</p>
    </header>
    <main>
      <article>
        <h1>飛田新地求人 よくある質問100選（全119問・本音回答）</h1>
        <p class="lead">応募前に女の子から寄せられる100以上の疑問に、飛田新地料理組合公認老舗料亭直営の女性サポートスタッフが忖度なしの本音で回答しています。応募・面接、給料、未経験、勤務時間、身バレ、寮、Wワーク、退店の8大テーマで体系化しています。</p>
        <section>
          <h2>8大テーマ別カテゴリーナビゲーション</h2>
          <ul>
            ${FAQ_8_CATEGORIES.filter(c => c.id !== 'all').map(c => `<li><a href="/faq/${c.slug}"><strong>${escapeHtml(c.label)}</strong>：${escapeHtml(c.description)}</a></li>`).join('')}
          </ul>
        </section>
        ${categorySectionsHtml}
        <section>
          <h2>公式LINE無料相談窓口</h2>
          <p>疑問や不安な点は、専任の女性スタッフにLINEでいつでも匿名相談いただけます（24時間受付中・完全秘密厳守）。</p>
        </section>
      </article>
    </main>
  `;
}

function buildAboutNoscript(): string {
  return `
    <header>
      <p>飛田ガールズについて｜運営者情報・料亭直営体制・一次情報ポリシー【公式】</p>
      <p>24時間受付中・相談無料・完全秘密厳守</p>
    </header>
    <main>
      <article>
        <h1>飛田ガールズについて｜運営者情報・料亭直営体制・一次情報ポリシー【公式】</h1>
        <p class="lead">飛田新地料理組合公認の老舗料亭直営公式採用窓口「飛田ガールズ」の店舗情報、創業歴、運営理念、女性スタッフによるサポート方針、一次情報発信ポリシーをご紹介します。</p>

        <section>
          <h2>安心の実績と信頼</h2>
          <table border="1">
            <tbody>
              <tr><th>創業実績</th><td><strong>創業40余年</strong>（料理組合公認・老舗直営料亭グループ）</td></tr>
              <tr><th>未経験スタート率</th><td><strong>90%以上</strong>（夜職初心者も即日安心のマンツーマン研修完備）</td></tr>
              <tr><th>給与還元率</th><td><strong>完全50%ハーフバック</strong>（即日全額現金日払い手渡し保証・天引きゼロ）</td></tr>
            </tbody>
          </table>
        </section>

        <section>
          <h2>女性ファーストを貫く3つの運営理念</h2>
          <h3>1. 徹底したプライバシー保護・身バレゼロ保証</h3>
          <p>飛田新地は街全体で一般人の撮影が固く禁止されています。また、当グループではインターネット上・SNSへの写真掲載は一切行いません。勤務は完全源氏名、身分証の管理も厳格で、昼職OLの副業向けに住民税の普通徴収手続きもしっかりサポートいたします。</p>

          <h3>2. ノルマ・罰金・上下関係なしの自由な働き方</h3>
          <p>指名争いや同伴・アフター、営業LINEの送信などは一切不要です。お酒を飲む必要も一切ありません。週1日から、短時間から、あなたのライフスタイルに合わせた完全自由出勤制を採用しています。</p>

          <h3>3. 女性スタッフ常駐による手厚いメンタルケア</h3>
          <p>現場サポート歴8年の女性スタッフが常駐しており、お仕事の疑問やお客さま対応のコツ、プライベートの悩みまで親身に相談に乗ります。困ったときはスタッフが即座に駆けつける万全のバックアップ体制です。</p>
        </section>

        <section>
          <h2>サイト運営者情報・公式採用窓口</h2>
          <table border="1">
            <tbody>
              <tr><th>サイト名</th><td>飛田ガールズ（飛田新地料亭直営求人・公式採用窓口）</td></tr>
              <tr><th>運営責任者</th><td>女性サポート統括担当 さくら（サポート歴8年） / 採用マネージャー 木村（管理歴12年）</td></tr>
              <tr><th>所在地</th><td>大阪府大阪市西成区山王エリア（飛田新地料理組合加盟料亭）</td></tr>
              <tr><th>お問い合わせ</th><td>公式LINE窓口（24時間受付中・年中無休）</td></tr>
              <tr><th>応募資格</th><td>20歳以上の日本国籍を有する女性（未経験歓迎 ※料理組合自主規制により20歳未満不可）</td></tr>
              <tr><th>給与体系</th><td>売上50%完全即日全額日払い（手渡し支給・天引きゼロ）</td></tr>
            </tbody>
          </table>
        </section>

        <section>
          <h2>一次情報発信ポリシーと安全性保証</h2>
          <p>当サイトは外部の仲介業者・広告代理店を通さず、飛田新地料理組合公認の料亭直営スタッフが現場の採用基準と給与条件を正確に一次情報として発信しています。街全体での撮影禁止規約、お酒不要、写真ネット非掲載、完全源氏名、住民税普通徴収サポートを徹底し、女性の安全を最優先に保護しています。</p>
        </section>
      </article>
    </main>
  `;
}

function buildBlogIndexNoscript(articles: any[] = []): string {
  const listItems = articles.slice(0, 30).map((a: any) => `
    <li>
      <h3><a href="/blog/${escapeHtml(a.slug)}">${escapeHtml(a.title)}</a></h3>
      <p>${escapeHtml(a.summary || '')}</p>
    </li>
  `).join('');

  return `
    <header>
      <p>飛田新地お仕事コラム・給与・面接ガイド一覧｜飛田ガールズ【公式】</p>
      <p>24時間受付中・相談無料・完全秘密厳守</p>
    </header>
    <main>
      <article>
        <h1>飛田新地お仕事コラム・給与・面接ガイド一覧</h1>
        <p class="lead">飛田新地のお仕事、給料システム、面接・体入の流れ、寮生活、安全対策など、現場の女性スタッフによる役立つ最新コラム一覧です。</p>
        <section>
          <h2>コラム記事一覧</h2>
          <ul>${listItems}</ul>
        </section>
      </article>
    </main>
  `;
}

function buildBlogArticleNoscript(article: any): string {
  let bodyText = '';
  if (Array.isArray(article.content)) {
    article.content.forEach((block: any) => {
      if (block.type === 'h2') bodyText += `<h2>${escapeHtml(block.text)}</h2>`;
      else if (block.type === 'h3') bodyText += `<h3>${escapeHtml(block.text)}</h3>`;
      else if (block.type === 'p') bodyText += `<p>${escapeHtml(block.text)}</p>`;
      else if (block.type === 'list' && Array.isArray(block.items)) {
        bodyText += `<ul>${block.items.map((it: string) => `<li>${escapeHtml(it)}</li>`).join('')}</ul>`;
      } else if (block.type === 'qna' && block.question) {
        bodyText += `<section><h3>Q. ${escapeHtml(block.question)}</h3><p>A. ${escapeHtml(block.answer || block.text || '')}</p></section>`;
      }
    });
  }

  return `
    <header>
      <p>飛田新地求人サイト「飛田ガールズ」</p>
      <p><a href="/blog">お仕事コラム一覧に戻る</a></p>
    </header>
    <main>
      <article>
        <h1>${escapeHtml(article.title)}</h1>
        <p class="summary">${escapeHtml(article.summary || '')}</p>
        <p class="meta">公開日: ${escapeHtml(article.publishedAt || '2026.07.01')} | 執筆: ${escapeHtml(article.author?.name || 'さくら')}（${escapeHtml(article.author?.role || '女性サポートスタッフ')}）</p>
        ${bodyText}
        <section>
          <h2>飛田新地 料亭直営採用の募集要項</h2>
          <table border="1">
            <tbody>
              <tr><th>給与</th><td>日給 30,000円〜100,000円以上（売上50%完全即日全額日払い手渡し）</td></tr>
              <tr><th>勤務時間</th><td>10:00〜24:00（自由シフト制・週1日〜・1日3時間〜OK）</td></tr>
              <tr><th>応募資格</th><td>20歳以上の女性（未経験歓迎・経験不問 ※料理組合規約により20歳未満不可）</td></tr>
              <tr><th>待遇</th><td>個室マンション寮完備・衣装無料貸出・完全身バレ防止・交通費支給</td></tr>
            </tbody>
          </table>
        </section>
      </article>
    </main>
  `;
}

function buildTopicNoscript(topic: string): string {
  const clusterKey = topic === 'interview' ? 'flow' : topic;
  const cluster = TOPIC_CLUSTERS[clusterKey];

  if (!cluster) {
    return `
      <header><p>飛田新地求人サイト「飛田ガールズ」【公式】</p></header>
      <main><article><h1>飛田新地求人ガイド【${escapeHtml(topic)}】</h1><p class="lead">飛田新地料亭直営公式求人の解説ページです。</p></article></main>
    `;
  }

  const statsHtml = cluster.stats.map(s => `
    <tr>
      <th>${escapeHtml(s.label)}</th>
      <td><strong>${escapeHtml(s.value)}</strong>（${escapeHtml(s.desc)}）</td>
    </tr>
  `).join('');

  const keyPointsHtml = cluster.keyPoints.map(p => `<li>${escapeHtml(p)}</li>`).join('');

  const sectionsHtml = cluster.sections.map(sec => {
    let secContent = `<section><h2>${escapeHtml(sec.title)}</h2><p>${escapeHtml(sec.description)}</p>`;
    if (sec.points && sec.points.length > 0) {
      secContent += `<ul>${sec.points.map(pt => `<li>${escapeHtml(pt)}</li>`).join('')}</ul>`;
    }
    if (sec.table) {
      secContent += `<table border="1"><thead><tr>${sec.table.headers.map(h => `<th>${escapeHtml(h)}</th>`).join('')}</tr></thead><tbody>`;
      secContent += sec.table.rows.map(row => `<tr>${row.map(cell => `<td>${escapeHtml(cell)}</td>`).join('')}</tr>`).join('');
      secContent += `</tbody></table>`;
    }
    if (sec.callout) {
      secContent += `<blockquote><strong>${escapeHtml(sec.callout.title)}</strong>: ${escapeHtml(sec.callout.text)}</blockquote>`;
    }
    secContent += `</section>`;
    return secContent;
  }).join('');

  const faqsHtml = (cluster.faqs || []).map(f => `
    <dt>Q. ${escapeHtml(f.q)}</dt>
    <dd>A. ${escapeHtml(f.a)}</dd>
  `).join('');

  const relatedHtml = (cluster.relatedTopicIds || []).map(rId => {
    const rel = TOPIC_CLUSTERS[rId];
    if (!rel) return '';
    return `<li><a href="${rel.path}">${escapeHtml(rel.title)}（${escapeHtml(rel.seoTitle)}）</a></li>`;
  }).filter(Boolean).join('');

  return `
    <header>
      <p>飛田新地求人【公式】飛田ガールズ 専門解説ガイド</p>
      <p>24時間受付中・相談無料・完全秘密厳守</p>
    </header>

    <main>
      <article>
        <h1>${escapeHtml(cluster.seoTitle)}</h1>
        <p class="lead">${escapeHtml(cluster.tagline)}。${escapeHtml(cluster.metaDescription)}</p>

        <section>
          <h2>【要点・結論】${escapeHtml(cluster.title)}の概要</h2>
          <p><strong>${escapeHtml(cluster.llmDirectAnswer)}</strong></p>
          <ul>${keyPointsHtml}</ul>
        </section>

        <section>
          <h2>主要条件・データハイライト</h2>
          <table border="1">
            <tbody>
              ${statsHtml}
            </tbody>
          </table>
        </section>

        <section>
          <h2>詳しい解説</h2>
          <p>${escapeHtml(cluster.overview)}</p>
        </section>

        ${sectionsHtml}

        ${faqsHtml ? `
        <section>
          <h2>よくある質問（FAQ）</h2>
          <dl>${faqsHtml}</dl>
        </section>
        ` : ''}

        ${relatedHtml ? `
        <section>
          <h2>関連テーマ・お役立ちガイド</h2>
          <ul>${relatedHtml}</ul>
        </section>
        ` : ''}

        <section>
          <h2>料亭直営公式採用窓口（飛田ガールズ）</h2>
          <p>24時間365日、専任の女性サポートスタッフがLINEおよびお電話で質問やご相談を受付中です。無理な勧誘や引き止めは一切ありませんので、お気軽にお問い合わせください。</p>
        </section>
      </article>
    </main>
  `;
}

export function injectSeoMetadata(originalHtml: string, reqUrl: string): { html: string; status: number } {
  let title = DEFAULT_TITLE;
  let description = DEFAULT_DESC;
  let canonicalUrl = 'https://tobitashinchi-recruit.com/';
  let ogType = 'website';
  let ogImageUrl = DEFAULT_IMAGE;
  let ogImageAlt = '飛田新地求人 飛田ガールズ';
  let twitterCard = 'summary_large_image';
  let status = 200;
  let prerenderContent = '';
  let customJsonLd: string | null = null;
  let customNoscript: string | null = null;

  const cleanPath = reqUrl.split('?')[0].split('#')[0];

  // 1. Blog details
  if (cleanPath.startsWith('/blog/')) {
    const slug = cleanPath.replace('/blog/', '').replace(/\/$/, '');
    if (slug) {
      try {
        const articlesFile = path.join(process.cwd(), 'data', 'blogArticles.json');
        let articles: any[] = [];
        if (fs.existsSync(articlesFile)) {
          articles = JSON.parse(fs.readFileSync(articlesFile, 'utf-8'));
        }
        const article = articles.find((a: any) => a.slug === slug);
        if (article) {
          title = `${article.title}｜飛田新地求人 飛田ガールズ`;
          description = article.summary || description;
          canonicalUrl = `https://tobitashinchi-recruit.com/blog/${article.slug}`;
          ogType = 'article';
          ogImageUrl = resolveFullImageUrl(article.eyeCatch);
          ogImageAlt = article.title;

          let bodyText = '';
          if (Array.isArray(article.content)) {
            article.content.forEach((block: any) => {
              if (block.type === 'h2') bodyText += `<h2>${escapeHtml(block.text)}</h2>`;
              else if (block.type === 'h3') bodyText += `<h3>${escapeHtml(block.text)}</h3>`;
              else if (block.type === 'p') bodyText += `<p>${escapeHtml(block.text)}</p>`;
              else if (block.type === 'list' && Array.isArray(block.items)) {
                bodyText += `<ul>${block.items.map((it: string) => `<li>${escapeHtml(it)}</li>`).join('')}</ul>`;
              }
            });
          }

          prerenderContent = `
            <article id="seo-prerender-article" style="display:none;" aria-hidden="true">
              <h1>${escapeHtml(article.title)}</h1>
              <p class="summary">${escapeHtml(article.summary || '')}</p>
              ${bodyText}
            </article>
          `;

          const articleUrl = `https://tobitashinchi-recruit.com/blog/${article.slug}`;

          const graphItems: any[] = [
            {
              "@type": "BlogPosting",
              "@id": `${articleUrl}#article`,
              "isPartOf": {
                "@type": "WebSite",
                "@id": "https://tobitashinchi-recruit.com/#website",
                "name": "飛田ガールズ",
                "url": "https://tobitashinchi-recruit.com/"
              },
              "headline": article.title,
              "description": article.summary,
              "image": ogImageUrl,
              "datePublished": article.publishedAt ? article.publishedAt.replace(/\./g, '-') : '2026-07-01',
              "dateModified": "2026-09-05",
              "articleSection": article.categoryLabel,
              "keywords": (article.tags || []).join(', '),
              "inLanguage": "ja-JP",
              "author": {
                "@type": "Person",
                "name": article.author?.name || "さくら",
                "jobTitle": article.author?.role || "女性サポートスタッフ"
              },
              "reviewedBy": {
                "@type": "Organization",
                "name": "飛田新地ガールズ求人サポートスタッフ",
                "url": "https://tobitashinchi-recruit.com/about"
              },
              "publisher": {
                "@type": "Organization",
                "name": "飛田ガールズ",
                "url": "https://tobitashinchi-recruit.com",
                "logo": {
                  "@type": "ImageObject",
                  "url": "https://tobitashinchi-recruit.com/favicon.svg"
                }
              },
              "mainEntityOfPage": {
                "@type": "WebPage",
                "@id": articleUrl
              }
            },
            {
              "@type": "BreadcrumbList",
              "@id": `${articleUrl}#breadcrumb`,
              "itemListElement": [
                {
                  "@type": "ListItem",
                  "position": 1,
                  "name": "トップ",
                  "item": "https://tobitashinchi-recruit.com/"
                },
                {
                  "@type": "ListItem",
                  "position": 2,
                  "name": "お仕事コラム",
                  "item": "https://tobitashinchi-recruit.com/blog"
                },
                {
                  "@type": "ListItem",
                  "position": 3,
                  "name": article.title,
                  "item": articleUrl
                }
              ]
            }
          ];

          const qnaBlocks = (article.content || []).filter((b: any) => b.type === 'qna' && b.question && (b.answer || b.text));
          if (qnaBlocks.length > 0) {
            graphItems.push({
              "@type": "FAQPage",
              "@id": `${articleUrl}#faq`,
              "mainEntity": qnaBlocks.map((q: any) => ({
                "@type": "Question",
                "name": q.question,
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": q.answer || q.text || ""
                }
              }))
            });
          }

          customJsonLd = JSON.stringify({
            "@context": "https://schema.org",
            "@graph": graphItems
          }, null, 2);
          customNoscript = buildBlogArticleNoscript(article);
        } else {
          status = 404;
          title = 'お探しの記事が見つかりませんでした (404 Not Found)｜飛田新地求人 飛田ガールズ';
          description = '指定された記事は存在しないか、移動した可能性があります。';
          canonicalUrl = '';
        }
      } catch (e) {
        console.error('Error in SEO injection for blog:', e);
      }
    }
  } else if (cleanPath === '/blog' || cleanPath === '/blog/') {
    title = '飛田新地お仕事コラム・給与・面接ガイド一覧｜飛田ガールズ【公式】';
    description = '飛田新地のお仕事、給料システム、面接・体入の流れ、寮生活、安全対策など、現場の女性スタッフによる役立つ最新コラム一覧。';
    canonicalUrl = 'https://tobitashinchi-recruit.com/blog';
    ogImageUrl = DEFAULT_IMAGE;
    ogImageAlt = '飛田新地お仕事コラム 飛田ガールズ';
    try {
      const articlesFile = path.join(process.cwd(), 'data', 'blogArticles.json');
      let articles: any[] = [];
      if (fs.existsSync(articlesFile)) {
        articles = JSON.parse(fs.readFileSync(articlesFile, 'utf-8'));
      }
      customNoscript = buildBlogIndexNoscript(articles);
    } catch (_e) {
      customNoscript = buildBlogIndexNoscript([]);
    }
  } else if (cleanPath === '/about' || cleanPath === '/company') {
    title = '飛田ガールズについて｜運営者情報・監修体制・一次情報ポリシー【公式】';
    description = '飛田新地料理組合公認の老舗料亭直営公式求人「飛田ガールズ」の店舗情報、創業歴、運営体制、女性スタッフによるサポート方針、一次情報発信ポリシーをご紹介します。';
    canonicalUrl = 'https://tobitashinchi-recruit.com/about';
    ogImageUrl = DEFAULT_IMAGE;
    ogImageAlt = '飛田ガールズ 運営者情報';
    customNoscript = buildAboutNoscript();
    customJsonLd = JSON.stringify({
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'AboutPage',
          '@id': 'https://tobitashinchi-recruit.com/about#aboutpage',
          'url': 'https://tobitashinchi-recruit.com/about',
          'name': '飛田ガールズについて｜運営者情報・監修体制・一次情報ポリシー【公式】',
          'description': '飛田新地料理組合公認の老舗料亭直営公式求人「飛田ガールズ」の店舗情報、創業歴、運営体制、女性スタッフによるサポート方針、一次情報発信ポリシーをご紹介します。',
          'isPartOf': {
            '@type': 'WebSite',
            '@id': 'https://tobitashinchi-recruit.com/#website',
            'name': '飛田ガールズ',
            'url': 'https://tobitashinchi-recruit.com/'
          }
        },
        {
          '@type': 'Organization',
          '@id': 'https://tobitashinchi-recruit.com/#organization',
          'name': '飛田ガールズ（料理組合公認 料亭直営採用窓口）',
          'url': 'https://tobitashinchi-recruit.com/',
          'logo': 'https://tobitashinchi-recruit.com/favicon.svg',
          'address': {
            '@type': 'PostalAddress',
            'streetAddress': '山王3丁目',
            'addressLocality': '大阪市西成区',
            'addressRegion': '大阪府',
            'postalCode': '557-0001',
            'addressCountry': 'JP'
          }
        }
      ]
    }, null, 2);
  } else if (cleanPath === '/compare' || cleanPath === '/compare/') {
    title = '飛田新地求人サイト比較＆目的別求人ガイド【2026年最新】｜未経験・高収入・Wワーク【公式】';
    description = '飛田新地料亭直営公式求人と街頭スカウト業者・他求人サイト（飛田ジョブなど）の4者徹底比較。安心の料亭直営で即日全額日払い・身バレ完全防止。';
    canonicalUrl = 'https://tobitashinchi-recruit.com/compare';
    ogImageUrl = DEFAULT_IMAGE;
    customNoscript = buildCompareNoscript();
    customJsonLd = JSON.stringify({
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'WebPage',
          '@id': 'https://tobitashinchi-recruit.com/compare#webpage',
          'url': 'https://tobitashinchi-recruit.com/compare',
          'name': '飛田新地求人サイト比較＆目的別求人ガイド【2026年最新】｜未経験・高収入・Wワーク【公式】',
          'description': '飛田新地料亭直営公式求人と街頭スカウト業者・他求人サイト（飛田ジョブなど）の4者徹底比較。安心の料亭直営で即日全額日払い・身バレ完全防止。',
          'isPartOf': {
            '@type': 'WebSite',
            '@id': 'https://tobitashinchi-recruit.com/#website',
            'name': '飛田ガールズ',
            'url': 'https://tobitashinchi-recruit.com/'
          },
          'mainEntity': {
            '@type': 'ItemList',
            'name': '飛田新地求人 目的・属性別求人ガイド',
            'itemListElement': TARGET_JOB_CATEGORIES.map((cat, idx) => ({
              '@type': 'ListItem',
              'position': idx + 1,
              'name': cat.title,
              'url': `https://tobitashinchi-recruit.com/compare/${cat.slug}`
            }))
          }
        },
        {
          '@type': 'FAQPage',
          '@id': 'https://tobitashinchi-recruit.com/compare#faq',
          'mainEntity': [
            {
              '@type': 'Question',
              'name': '他の求人サイト（飛田ジョブ等）やスカウト経由で応募するのと何が違いますか？',
              'acceptedAnswer': {
                '@type': 'Answer',
                'text': '最大の違いは「仲介料の有無」と「現場サポートの有無」です。スカウトは給料から手数料を中抜きし、他サイトは現場にスタッフがいません。当サイトは料亭直営のため仲介料0円で売上50%を即日全額支給し、女性スタッフが現場に常駐して親身にサポートします。'
              }
            },
            {
              '@type': 'Question',
              'name': '体験入店だけでも比較・確認できますか？',
              'acceptedAnswer': {
                '@type': 'Answer',
                'text': 'はい、大歓迎です。即日体験入店に対応しており、当日稼いだ給与はその場で全額現金手渡しいたします。合わないと感じた場合も無理な引き止めは一切ありません。'
              }
            },
            {
              '@type': 'Question',
              'name': '面接や相談の前に用意するものはありますか？',
              'acceptedAnswer': {
                '@type': 'Answer',
                'text': '履歴書は不要です。年齢確認（20歳以上限定）のため「本籍地記載の住民票原本」または「日本国パスポート」をお持ちください。私服で手ぶらでお越しいただけます。'
              }
            }
          ]
        }
      ]
    }, null, 2);
  } else if (cleanPath.startsWith('/compare/')) {
    const slug = cleanPath.replace('/compare/', '').replace(/\/$/, '');
    customNoscript = buildCompareNoscript(slug);
    const COMPARE_META: Record<string, { title: string; desc: string }> = {
      'inexperienced': {
        title: '【未経験向け求人】90%が夜職初心者！安心のサポート体制｜飛田新地求人 飛田ガールズ',
        desc: '夜職未経験から始められる飛田新地求人。お酒不要・営業連絡なし・女性スタッフによる研修付きで安心。'
      },
      'high-income': {
        title: '【高収入求人】日給5万〜15万円超・売上50%完全バック｜飛田新地求人 飛田ガールズ',
        desc: '飛田新地の高収入給料システム。即日全額日払い手渡し、売上50%完全バック、ノルマ・罰金一切なし。'
      },
      'weekly-1': {
        title: '【週1日・マイペース求人】無理のない自由出勤シフト｜飛田新地求人 飛田ガールズ',
        desc: '週1日〜OK・自由シフト制の飛田新地求人。本業や学業との両立、掛け持ちWワークも大歓迎。'
      },
      'short-term': {
        title: '【短期・出稼ぎ求人】交通費全額支給・即日全額日払い｜飛田新地求人 飛田ガールズ',
        desc: '短期集中・1日〜数週間の出稼ぎ歓迎。交通費支給・即入居寮完備で手ぶらスタート可能。'
      },
      'dormitory': {
        title: '【即入居OK・個室マンション寮完備】家具家電付き・生活支援｜飛田新地求人 飛田ガールズ',
        desc: '飛田新地の個室マンション寮。家具家電付き・Wi-Fi完備・即日入居可能。遠方からの上京・新生活も万全サポート。'
      },
      'double-work': {
        title: '【Wワーク・副業向け求人】身バレ・会社バレ徹底防止対策｜飛田新地求人 飛田ガールズ',
        desc: 'OLや会社員、学生のWワーク・副業に最適。ネット写真ゼロ、街全体の撮影禁止、完全源氏名で身バレ防止100%。'
      },
      'age-20s': {
        title: '【20代女性向け求人】学生・フリーター歓迎・安全第一｜飛田新地求人 飛田ガールズ',
        desc: '20代女性が安心して働ける老舗料亭直営店。無理のない働き方と温かいサポート。'
      },
      'age-30s': {
        title: '【30代以上・大人女子向け求人】落ち着いた接客とおもてなし｜飛田新地求人 飛田ガールズ',
        desc: '30代・40代の大人女性が多数活躍中。落ち着いた接客と年齢に合わせた丁寧なフォロー体制。'
      }
    };

    const COMPARE_SALARY_SCHEMA: Record<string, { min: number; max: number; emp: string }> = {
      'inexperienced': { min: 30000, max: 65000, emp: 'PART_TIME' },
      'high-income': { min: 60000, max: 150000, emp: 'PART_TIME' },
      'weekly-1': { min: 35000, max: 80000, emp: 'PART_TIME' },
      'short-term': { min: 50000, max: 120000, emp: 'TEMPORARY' },
      'dormitory': { min: 40000, max: 90000, emp: 'PART_TIME' },
      'double-work': { min: 35000, max: 70000, emp: 'PART_TIME' },
      'age-20s': { min: 45000, max: 110000, emp: 'PART_TIME' },
      'age-30s': { min: 40000, max: 90000, emp: 'PART_TIME' }
    };

    if (COMPARE_META[slug]) {
      title = `${COMPARE_META[slug].title}`;
      description = COMPARE_META[slug].desc;
      canonicalUrl = `https://tobitashinchi-recruit.com/compare/${slug}`;

      const sal = COMPARE_SALARY_SCHEMA[slug] || { min: 30000, max: 100000, emp: 'PART_TIME' };
      customJsonLd = JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'JobPosting',
        '@id': `https://tobitashinchi-recruit.com/compare/${slug}#jobposting`,
        'title': COMPARE_META[slug].title,
        'description': `${COMPARE_META[slug].desc}【飛田新地料理組合公認料亭直営 飛田ガールズ】全額日払い手渡し・ノルマ罰金一切なし・個室マンション寮完備・安心の女性スタッフサポート。`,
        'identifier': {
          '@type': 'PropertyValue',
          'name': '飛田ガールズ 料亭直営採用窓口',
          'value': `TOBITA-COMPARE-${slug.toUpperCase()}`
        },
        'datePosted': '2026-08-01T00:00:00+09:00',
        'validThrough': '2027-12-31T23:59:59+09:00',
        'employmentType': sal.emp,
        'hiringOrganization': {
          '@type': 'Organization',
          'name': '飛田新地料理組合公認料亭直営 飛田ガールズ',
          'sameAs': 'https://tobitashinchi-recruit.com',
          'logo': 'https://tobitashinchi-recruit.com/favicon.svg'
        },
        'jobLocation': {
          '@type': 'Place',
          'address': {
            '@type': 'PostalAddress',
            'streetAddress': '山王3丁目',
            'addressLocality': '大阪市西成区',
            'addressRegion': '大阪府',
            'postalCode': '557-0001',
            'addressCountry': 'JP'
          }
        },
        'baseSalary': {
          '@type': 'MonetaryAmount',
          'currency': 'JPY',
          'value': {
            '@type': 'QuantitativeValue',
            'minValue': sal.min,
            'maxValue': sal.max,
            'unitText': 'DAY'
          }
        },
        'applicantLocationRequirements': {
          '@type': 'Country',
          'name': 'JP'
        },
        'workHours': '10:00〜24:00（自由シフト制・週1日〜/1日3時間〜勤務可）',
        'qualifications': '20歳以上の女性（未経験歓迎・学歴経験不問 ※料理組合規約により20歳未満不可）',
        'directApply': true
      }, null, 2);
    } else {
      canonicalUrl = `https://tobitashinchi-recruit.com/compare/${slug}`;
    }
  } else if (cleanPath === '/faq' || cleanPath.startsWith('/faq/')) {
    const rawFaqCat = cleanPath.replace('/faq/', '').replace(/\/$/, '').replace('/faq', '');
    const faqCat = rawFaqCat || undefined;
    const catDef = faqCat ? FAQ_8_CATEGORIES.find(c => c.slug === faqCat || c.id === faqCat) : undefined;

    if (catDef && catDef.id !== 'all') {
      title = `【${catDef.label}】飛田新地求人 よくある質問100選（全119問・本音回答）｜飛田ガールズ【公式】`;
      description = `【飛田新地求人FAQ：${catDef.label}】${catDef.description}。老舗料亭直営の専任女性スタッフが疑問や不安に本音回答。即日全額日払い・完全身バレ防止。`;
      canonicalUrl = `https://tobitashinchi-recruit.com/faq/${catDef.slug}`;
      customNoscript = buildFaqNoscript(catDef.slug);

      const catQuestions = FAQ_100_LIST.filter(f => f.eightCategory === catDef.id);
      customJsonLd = JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        '@id': `https://tobitashinchi-recruit.com/faq/${catDef.slug}#faq`,
        'mainEntity': catQuestions.map(f => ({
          '@type': 'Question',
          'name': f.question,
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': f.answer
          }
        }))
      }, null, 2);
    } else {
      title = '飛田新地求人 FAQ（全119問・8大テーマ完全網羅）｜未経験・給料・身バレ・面接【公式】';
      description = '飛田新地求人のよくある質問と回答（全119問）。応募資格、面接、給料手渡し、個室寮、身バレ対策など、疑問や不安を8大テーマ別に完全解消。';
      canonicalUrl = 'https://tobitashinchi-recruit.com/faq';
      customNoscript = buildFaqNoscript();

      const topFaqs = FAQ_100_LIST.filter(f => f.isPopular).slice(0, 15);
      customJsonLd = JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        '@id': 'https://tobitashinchi-recruit.com/faq#faq',
        'mainEntity': topFaqs.map(f => ({
          '@type': 'Question',
          'name': f.question,
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': f.answer
          }
        }))
      }, null, 2);
    }
    ogImageUrl = DEFAULT_IMAGE;
  } else {
    const rawTopic = cleanPath.replace(/^\//, '').replace(/\/$/, '');
    const topicKey = rawTopic === 'interview' ? 'flow' : rawTopic;
    const cluster = TOPIC_CLUSTERS[topicKey];

    if (cluster) {
      title = cluster.seoTitle;
      description = cluster.metaDescription;
      canonicalUrl = `https://tobitashinchi-recruit.com${cleanPath === '/interview' ? '/interview' : cluster.path}`;
      ogImageUrl = resolveFullImageUrl(cluster.heroImage);
      ogImageAlt = cluster.title;
      customNoscript = buildTopicNoscript(topicKey);

      const graphItems: any[] = [
        {
          '@type': 'WebPage',
          '@id': `https://tobitashinchi-recruit.com${cluster.path}#webpage`,
          'url': `https://tobitashinchi-recruit.com${cluster.path}`,
          'name': cluster.seoTitle,
          'description': cluster.metaDescription,
          'isPartOf': {
            '@type': 'WebSite',
            '@id': 'https://tobitashinchi-recruit.com/#website',
            'name': '飛田ガールズ',
            'url': 'https://tobitashinchi-recruit.com/'
          }
        },
        {
          '@type': 'BreadcrumbList',
          '@id': `https://tobitashinchi-recruit.com${cluster.path}#breadcrumb`,
          'itemListElement': [
            {
              '@type': 'ListItem',
              'position': 1,
              'name': 'トップ',
              'item': 'https://tobitashinchi-recruit.com/'
            },
            {
              '@type': 'ListItem',
              'position': 2,
              'name': cluster.title,
              'item': `https://tobitashinchi-recruit.com${cluster.path}`
            }
          ]
        }
      ];

      if (cluster.faqs && cluster.faqs.length > 0) {
        graphItems.push({
          '@type': 'FAQPage',
          '@id': `https://tobitashinchi-recruit.com${cluster.path}#faq`,
          'mainEntity': cluster.faqs.map(f => ({
            '@type': 'Question',
            'name': f.q,
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': f.a
            }
          }))
        });
      }

      customJsonLd = JSON.stringify({
        '@context': 'https://schema.org',
        '@graph': graphItems
      }, null, 2);
    }
  }

  let html = originalHtml;

  // Replace Title
  html = html.replace(/<title>[^<]*<\/title>/i, `<title>${escapeHtml(title)}</title>`);

  // Replace Meta Description
  if (/<meta\s+name=["']description["'][^>]*>/i.test(html)) {
    html = html.replace(/<meta\s+name=["']description["'][^>]*>/i, `<meta name="description" content="${escapeHtml(description)}" />`);
  } else {
    html = html.replace(/<\/head>/i, `  <meta name="description" content="${escapeHtml(description)}" />\n</head>`);
  }

  // Replace Canonical URL & Robots for 404
  if (status === 404) {
    if (/<meta\s+name=["']robots["'][^>]*>/i.test(html)) {
      html = html.replace(/<meta\s+name=["']robots["'][^>]*>/i, '<meta name="robots" content="noindex, nofollow" />');
    } else {
      html = html.replace(/<\/head>/i, '  <meta name="robots" content="noindex, nofollow" />\n</head>');
    }
    html = html.replace(/<link\s+rel=["']canonical["'][^>]*>/i, '');
  } else {
    if (/<link\s+rel=["']canonical["'][^>]*>/i.test(html)) {
      html = html.replace(/<link\s+rel=["']canonical["'][^>]*>/i, `<link rel="canonical" href="${canonicalUrl}" />`);
    } else {
      html = html.replace(/<\/head>/i, `  <link rel="canonical" href="${canonicalUrl}" />\n</head>`);
    }
  }

  // OGP and Twitter Card Tags (for X/Twitter note-style cards, LINE, and Facebook)
  const metaMappings: { regex: RegExp; tag: string }[] = [
    { regex: /<meta\s+property=["']og:title["'][^>]*>/i, tag: `<meta property="og:title" content="${escapeHtml(title)}" />` },
    { regex: /<meta\s+property=["']og:description["'][^>]*>/i, tag: `<meta property="og:description" content="${escapeHtml(description)}" />` },
    { regex: /<meta\s+property=["']og:url["'][^>]*>/i, tag: `<meta property="og:url" content="${canonicalUrl}" />` },
    { regex: /<meta\s+property=["']og:type["'][^>]*>/i, tag: `<meta property="og:type" content="${ogType}" />` },
    { regex: /<meta\s+property=["']og:image["'][^>]*>/i, tag: `<meta property="og:image" content="${escapeHtml(ogImageUrl)}" />` },
    { regex: /<meta\s+property=["']og:image:secure_url["'][^>]*>/i, tag: `<meta property="og:image:secure_url" content="${escapeHtml(ogImageUrl)}" />` },
    { regex: /<meta\s+property=["']og:image:type["'][^>]*>/i, tag: `<meta property="og:image:type" content="image/jpeg" />` },
    { regex: /<meta\s+property=["']og:image:width["'][^>]*>/i, tag: `<meta property="og:image:width" content="1200" />` },
    { regex: /<meta\s+property=["']og:image:height["'][^>]*>/i, tag: `<meta property="og:image:height" content="630" />` },
    { regex: /<meta\s+property=["']og:image:alt["'][^>]*>/i, tag: `<meta property="og:image:alt" content="${escapeHtml(ogImageAlt)}" />` },
    { regex: /<meta\s+name=["']twitter:card["'][^>]*>/i, tag: `<meta name="twitter:card" content="${twitterCard}" />` },
    { regex: /<meta\s+name=["']twitter:title["'][^>]*>/i, tag: `<meta name="twitter:title" content="${escapeHtml(title)}" />` },
    { regex: /<meta\s+name=["']twitter:description["'][^>]*>/i, tag: `<meta name="twitter:description" content="${escapeHtml(description)}" />` },
    { regex: /<meta\s+name=["']twitter:image["'][^>]*>/i, tag: `<meta name="twitter:image" content="${escapeHtml(ogImageUrl)}" />` },
    { regex: /<meta\s+name=["']twitter:image:alt["'][^>]*>/i, tag: `<meta name="twitter:image:alt" content="${escapeHtml(ogImageAlt)}" />` },
  ];

  for (const { regex, tag } of metaMappings) {
    if (regex.test(html)) {
      html = html.replace(regex, tag);
    } else {
      html = html.replace(/<\/head>/i, `  ${tag}\n</head>`);
    }
  }

  // Replace Structured Data (JSON-LD) if custom defined for specific route
  if (customJsonLd) {
    if (/<script\s+type=["']application\/ld\+json["']>[\s\S]*?<\/script>/i.test(html)) {
      html = html.replace(/<script\s+type=["']application\/ld\+json["']>[\s\S]*?<\/script>/i, `<script type="application/ld+json">\n${customJsonLd}\n</script>`);
    } else {
      html = html.replace(/<\/head>/i, `  <script type="application/ld+json">\n${customJsonLd}\n</script>\n</head>`);
    }
  }

  // Replace <noscript> with route-specific fallback for LLM crawlers
  if (customNoscript) {
    if (/<noscript>[\s\S]*?<\/noscript>/i.test(html)) {
      html = html.replace(/<noscript>[\s\S]*?<\/noscript>/i, `<noscript>\n${customNoscript}\n</noscript>`);
    } else {
      html = html.replace(/<\/body>/i, `  <noscript>\n${customNoscript}\n</noscript>\n</body>`);
    }
  }

  // Inject Pre-rendered content for Web Crawlers
  if (prerenderContent) {
    html = html.replace(/<body([^>]*)>/i, `<body$1>\n${prerenderContent}`);
  }

  return { html, status };
}
