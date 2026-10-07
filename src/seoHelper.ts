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
      <p>飛田新地求人比較＆他求人サイト（飛田ジョブなど）との違い徹底検証【公式】飛田ガールズ</p>
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
          <h2>「結局、自分にはどれが合ってる？」あなたに合う働き方をチェック</h2>
          <p>求人サイトやスカウトが色々あって選べない方へ。あなたの今の状況やお悩みに合わせた最適な働き方の導線をご案内します。</p>
          <ul>
            <li>
              <strong>未経験 → 未経験向け求人</strong><br>
              在籍女性の約9割が完全未経験スタート。初日の就業前に女性スタッフが約30分で丁寧にレクチャー。お酒不要・営業連絡なし・初日から日給3万〜6.5万円を手渡し日払い。<br>
              <a href="/compare/inexperienced">未経験向け求人の詳細を見る</a>
            </li>
            <li>
              <strong>経験者 → 条件がいい（最高水準待遇）</strong><br>
              他店や他業種（風俗・キャバクラ）経験者へ。スカウト業者の中抜き（10〜30%）や店舗雑費の天引きが完全0円。売上完全50%即日手渡し・客引きノルマなしで実力通り稼げる好条件。<br>
              <a href="/compare/high-income">好条件・高収入求人の詳細を見る</a>
            </li>
            <li>
              <strong>週1日だけ → Wワーク向け（副業・マイペース）</strong><br>
              昼職OLや大学生・主婦の副業に。月1日〜週1日OKの完全自由出勤制。出勤強要・催促連絡一切なし。週末1日の出勤で会社員の半月分（3.5万〜7万円）を即日手渡し。<br>
              <a href="/compare/double-work">Wワーク・週1日向け求人を見る</a>
            </li>
            <li>
              <strong>とにかく稼ぎたい → 高収入向け（最速資金づくり）</strong><br>
              短期間で借金完済・独立開業の目標資金を貯めたい方へ。メイン通りの圧倒的な来客数と15分接客の高回転。日給6万〜15万円超、月収150万円以上の実績多数。チップも全額手取り。<br>
              <a href="/compare/high-income">高収入向け求人の詳細を見る</a>
            </li>
            <li>
              <strong>身バレが心配 → 安全対策を見る（身バレ防止徹底）</strong><br>
              会社や家族・知人に絶対に知られたくない方へ。街全体で撮影完全禁止（Web・SNSへの写真掲載100%ナシ）、完全源氏名、私服通勤、手渡し日払い、住民税の普通徴収ガイド完備で徹底守護。<br>
              <a href="/compare/double-work">安全対策・身バレ防止の詳細を見る</a>
            </li>
            <li>
              <strong>遠方から働きたい → 寮・出稼ぎ（即日入居・交通費全額）</strong><br>
              全国からの上京・来阪に。新幹線・飛行機の往復交通費を全額支給。敷金礼金0円・家具家電Wi-Fi付きの完全個室マンション寮に即日入居OK。主要駅までお迎え対応。<br>
              <a href="/compare/dormitory">寮・出稼ぎ求人の詳細を見る</a>
            </li>
          </ul>
        </section>

        <section>
          <h2>飛田新地の料亭直営が選ばれる3つの理由</h2>
          <h3>1. 他求人サイト（飛田ジョブなど）との違い：中間コストゼロで待遇を最大還元</h3>
          <p>外部の求人ポータルサイトや広告代理店を通さず、老舗料亭が自社で直接採用を行っているため、掲載費用や紹介料などのコストが一切かかりません。その分をバック率（完全50%即日手渡し日払い）や入店祝い金・交通費全額支給・家具家電付き個室マンション寮の無償提供など、女性への待遇として最大還元しています。</p>

          <h3>2. 街頭・SNSスカウト業者との違い：一生搾取されるピンハネのリスクを完全排除</h3>
          <p>SNSや街頭で声をかけてくるスカウト業者経由で入店すると、給料から10%〜30%が「紹介料」として毎月永久に天引きされ続けます。料亭直営公式求人「飛田ガールズ」は仲介者ゼロの直営契約。頑張って稼いだ報酬は1円も引かれることなく、退勤時に全額手渡しされます。</p>

          <h3>3. 一般ナイトワーク（ソープ・ヘルス・キャバクラ）との違い：顔出し不要＆お酒不要で負担最小限</h3>
          <p>風俗店やキャバクラのようにネットへの顔写真・パネル掲載は一切ありません。お酒を飲む必要もなく、営業LINEや連絡先交換も禁止されているため、プライベートと完全に切り離して安全・高収入を実現できます。</p>
        </section>

        <section>
          <h2>目的別・あなたの希望に合った求人スタイル（8大ターゲット別）</h2>
          <dl>
            <dt>1. 未経験向け求人（在籍女性の約9割が完全未経験）</dt>
            <dd>夜職経験ゼロ・接客初心者でも即日安心。お酒・営業LINE・指名取り一切不要で、女性スタッフによる事前講習完備。日給相場：30,000円〜65,000円（初日から全額日払い手渡し）。おすすめ：青春通り。</dd>
            <dt>2. 高収入向け求人（日給10万円超え・月収150万円以上多数）</dt>
            <dd>圧倒的な集客力と50%高バック率で最速で資金作り。待機カット・雑費天引きゼロ。日給相場：60,000円〜120,000円以上。おすすめ：メイン通り・大門通り。</dd>
            <dt>3. 週1日・マイペース求人（完全自由シフト・スキマ時間3時間〜）</dt>
            <dd>出勤ノルマ・ペナルティ一切なし。学業や本業・育児と無理なく両立。月収相場：150,000円〜400,000円。おすすめ：青春通り・妖怪通り。</dd>
            <dt>4. 短期・出稼ぎ求人（交通費全額支給・即日入居）</dt>
            <dd>往復交通費（新幹線・飛行機）全額支給。1週間〜1ヶ月の短期集中で100万円以上の貯金達成者多数。家具家電付き個室マンション寮完備。</dd>
            <dt>5. 個室寮付き求人（天王寺・難波周辺・日額1,000円〜）</dt>
            <dd>敷金礼金ゼロ・即日入居可・オートロック・Wi-Fi・家具家電完備。店舗とは別区域のマンションでプライバシー完全保護。</dd>
            <dt>6. Wワーク・副業向け求人（会社バレ・家族バレ完全防止）</dt>
            <dd>ネット写真掲載ゼロ、源氏名勤務、現金手渡し日払い、住民税普通徴収手続きの徹底アドバイスで昼職に絶対にバレない。</dd>
            <dt>7. 20代向け求人（学生・フリーター・将来の夢・早期返済）</dt>
            <dd>青春通り・メイン通りで大人気。営業連絡や同伴・アフターが一切なく、短期間で学費・美容代・夢の資金を効率よく貯金。</dd>
            <dt>8. 30代・オトナ女子向け求人（落ち着いた大人の接客）</dt>
            <dd>妖怪通り・若草通りなどで需要絶大。落ち着いた大人の気配りと会話が高く評価され、常連客が付きやすく安定して高日給を稼げます。</dd>
          </dl>
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
