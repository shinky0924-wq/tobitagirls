const fs = require('fs');
const path = require('path');

function escapeHtml(str) {
  return String(str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function resolveFullImageUrl(eyeCatch) {
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

const COMPARE_CATEGORY_MAP = {
  'inexperienced': {
    title: '【未経験向け求人】在籍女性の約9割が完全未経験！安心サポート体制',
    summary: '夜職経験ゼロ・接客初心者でも即日安心。お酒・営業LINE・指名取り一切不要で、女性スタッフによる事前講習完備。',
    targetUser: '夜職が初めての大学生・OL・主婦・一般職の女性',
    dailyIncome: '日給 30,000円 〜 65,000円（初日から全額日払い手渡し）',
    monthlyIncome: '月収 450,000円 〜 1,000,000円以上（週3〜4日勤務の場合）',
    shift: '週1〜3日 / 12:00〜18:00 または 18:00〜23:30',
    street: '青春通り（初心者・20代前半向けの親しみやすい雰囲気）',
    merits: [
      '接客マナー・おもてなしの手順を女性スタッフが優しく事前レクチャー',
      'お酒を飲む必要が一切なく、翌日の本業や講義に支障が出ない',
      'お客様との連絡先交換が禁止されているため、店外での付きまといリスクがゼロ',
      '客引きは店頭の仲居さん（おばちゃん）が担当するため、自分から客引きする必要がない'
    ],
    faqs: [
      { q: '接客経験が全くないのですが、本当に初日から働けますか？', a: 'はい、在籍女性の約9割が完全未経験スタートです。お茶出しやお座敷での挨拶など、基本作法を女性スタッフが優しく丁寧に研修しますのでご安心ください。' },
      { q: 'お酒が全く飲めない下戸でも大丈夫ですか？', a: '飛田新地のお仕事はお茶やソフトドリンクでのおもてなしです。アルコールを飲む必要は一切ありません。' }
    ],
    salary: { min: 30000, max: 65000, emp: 'PART_TIME' }
  },
  'high-income': {
    title: '【高収入求人】日給5万〜15万円超・売上50%完全バック',
    summary: '圧倒的な集客力と50%高バック率で最速で資金作り。待機カット・雑費天引きゼロ、売上の半分をその日の退勤時に即日手渡し。',
    targetUser: '短期間でまとまった資金を作りたい方・他業種で稼ぎにくさを感じた経験者',
    dailyIncome: '日給 60,000円 〜 120,000円以上（繁忙日は15万円超の実績多数）',
    monthlyIncome: '月収 1,200,000円 〜 2,500,000円以上（高稼働キャストの平均水準）',
    shift: '週4〜6日 / 12:00〜24:00（フルタイム・ロングシフト推奨）',
    street: 'メイン通り・大門通り（飛田新地で最も来客数が多く高回転なエリア）',
    merits: [
      '売上の完全50%が手取りとなる業界トップクラスの透明なバック率',
      '待機時間カットや衣装代・光熱費などの不当な天引きが一切ない',
      '客層が良くチップや心付けも全て本人の手取り',
      '1回15〜20分の短時間接客のため、1日10本以上の高回転が可能'
    ],
    faqs: [
      { q: '本当に日給10万円以上稼げますか？', a: 'はい、メイン通り・大門通りの直営料亭では1日10〜15本の接客を行うキャストが多く、日給10万円〜15万円超を稼ぐ女性が多数在籍しています。' },
      { q: '天引きや引かれ物は本当にありませんか？', a: 'はい、雑費・光熱費・厚生費などの天引きは1円もありません。売上の50%がそのまま日払い支給されます。' }
    ],
    salary: { min: 60000, max: 150000, emp: 'PART_TIME' }
  },
  'weekly-1': {
    title: '【週1日・マイペース求人】無理のない自由出勤シフト',
    summary: '出勤ノルマ・ペナルティ一切なし。月1回や週1日、スキマ時間（3時間〜）だけの勤務も大歓迎。本業やプライベート最優先。',
    targetUser: 'OL・昼職勤務・大学生・専門学生・家事や育児の合間に働きたい方',
    dailyIncome: '日給 35,000円 〜 70,000円（短時間でも高日給）',
    monthlyIncome: '月収 150,000円 〜 350,000円（月4〜6日程度のゆとり出勤）',
    shift: '週1日〜 / 月1回〜 / 1日3時間〜（完全自己申告シフト）',
    street: '青春通り・妖怪通り（マイペースな出勤でも温かく迎えられる通り）',
    merits: [
      '「今週はテスト期間だから0日」「来週は旅行費用を稼ぎたいから週2日」など完全自由',
      '昼間だけ（10:00〜17:00など）の短時間勤務も可能',
      'シフト減によるペナルティや嫌がらせは一切なし'
    ],
    faqs: [
      { q: '月1回だけの出勤でも本当に怒られませんか？', a: 'はい、全く問題ありません。完全自由シフト制ですので、本業やプライベートの予定を最優先してください。' }
    ],
    salary: { min: 35000, max: 80000, emp: 'PART_TIME' }
  },
  'short-term': {
    title: '【短期・出稼ぎ求人】交通費全額支給・即日全額日払い',
    summary: '1週間〜1ヶ月の短期集中で100万円以上の貯金を狙える出稼ぎ求人。往復交通費全額支給、家具家電付き個室マンション寮完備。',
    targetUser: '地方在住で地元を離れて集中して稼ぎたい方・まとまった資金が急ぎで必要な方',
    dailyIncome: '日給 50,000円 〜 100,000円以上（出稼ぎ集中シフト）',
    monthlyIncome: '短期2週間：600,000円〜1,000,000円 / 1ヶ月：1,200,000円〜2,000,000円',
    shift: '短期集中（週5〜6日勤務推奨・期間は3日間〜数ヶ月まで自由設定）',
    street: 'メイン通り・大門通り（短期でも即座に高回転で稼げるエリア）',
    merits: [
      '全国どこからでも往復新幹線・飛行機代を全額支給',
      'キャリーバッグ1つで即日入居・勤務開始が可能',
      '地元から離れて知り合いにバレずに集中して稼げる'
    ],
    faqs: [
      { q: '交通費はいつ支給されますか？', a: '来阪時の交通費領収書をお持ちいただければ、面接・入店当日に現金で全額立替支給いたします。' }
    ],
    salary: { min: 50000, max: 120000, emp: 'TEMPORARY' }
  },
  'dormitory': {
    title: '【即入居OK・個室マンション寮完備】家具家電付き・生活支援',
    summary: '天王寺・難波周辺のオートロック付きキレイな個室マンション寮。敷金礼金ゼロ・即日入居可・Wi-Fi・家具家電完備。',
    targetUser: '住まいと高収入を同時に確保したい方・一人暮らしを始めたい方・遠方からの移住希望者',
    dailyIncome: '日給 40,000円 〜 80,000円（寮費は日額1,000円〜の格安設定）',
    monthlyIncome: '月収 600,000円 〜 1,500,000円以上',
    shift: '週3〜5日 / ライフスタイルに合わせて自由設定',
    street: '青春通り・大門通り・メイン通り（各店舗へ徒歩または自転車圏内）',
    merits: [
      '家具家電（ベッド・エアコン・冷蔵庫・洗濯機・電子レンジ・テレビ・Wi-Fi）フル装備',
      '料亭街から離れた静かで安全な住宅エリアにあるためプライバシー完全確保',
      'オートロック・防犯カメラ完備で女性の一人暮らしも安心'
    ],
    faqs: [
      { q: '寮の場所は飛田新地の中にあるのですか？', a: 'いいえ、女の子のプライバシーと安全のため、飛田新地から少し離れた天王寺・難波周辺の一般マンションを寮としてご用意しています。' }
    ],
    salary: { min: 40000, max: 90000, emp: 'PART_TIME' }
  },
  'double-work': {
    title: '【Wワーク・副業向け求人】身バレ・会社バレ徹底防止対策',
    summary: '昼職OLや会社員、公務員、学生のための副業特化求人。ネット写真掲載ゼロ・源氏名勤務・住民税普通徴収で会社バレ100%防止。',
    targetUser: '昼間の仕事と両立して秘密で副収入を作りたいOL・契約社員・看護師・保育士など',
    dailyIncome: '日給 35,000円 〜 70,000円（週末や仕事終わりの3〜4時間）',
    monthlyIncome: '月収 200,000円 〜 500,000円（本業の手取りを上回る副収入）',
    shift: '平日夜（18:00〜23:30）または土日祝のみ（12:00〜20:00）',
    street: '青春通り・妖怪通り（身バレ防止に配慮した落ち着いた通り）',
    merits: [
      '組合規約により街全体の撮影・ネット配信が完全禁止',
      '給与は手渡し日払いのため銀行口座に記録が残らない',
      '確定申告時の「住民税・普通徴収」のやり方を専門スタッフが徹底アドバイス'
    ],
    faqs: [
      { q: '会社にバレないように確定申告するにはどうすればいいですか？', a: '住民税の納付方法を「特別徴収（給与天引き）」ではなく「普通徴収（自分で納付）」に選択することで、本業の会社に副業の税金情報が通知されるのを防ぐことができます。詳しい手順は女性スタッフが丁寧にお教えします。' }
    ],
    salary: { min: 35000, max: 70000, emp: 'PART_TIME' }
  },
  'age-20s': {
    title: '【20代女性向け求人】学生・フリーター歓迎・安全第一',
    summary: '20代女性が圧倒的人気の青春通り・メイン通り。営業LINEや同伴・アフター一切なしで、短期間で学費・美容代・貯金目標を達成。',
    targetUser: '20代の専門学生・大学生・フリーター・第二新卒の女性（20歳以上限定）',
    dailyIncome: '日給 45,000円 〜 100,000円以上（同世代キャストの平均日給）',
    monthlyIncome: '月収 600,000円 〜 1,500,000円以上',
    shift: '週2〜4日 / 講義やサークルの合間に出勤可能',
    street: '青春通り（20代前半のキャストが中心の明るく活気ある通り）',
    merits: [
      '20代のお客様だけでなく紳士的な年配客も多く、大切に扱ってもらえる',
      '同伴・アフター・連絡先交換がないためプライベートな時間を削られない',
      '衣装（可愛いワンピース・ドレス・浴衣・着物）の無料レンタル完備'
    ],
    faqs: [
      { q: '何歳から応募できますか？18歳や19歳は応募できますか？', a: '飛田新地は料理組合規約により例外なく20歳以上限定（20歳未満・高校生不可）となっています。20歳以上の女性であれば20代前半から大歓迎です。' }
    ],
    salary: { min: 45000, max: 110000, emp: 'PART_TIME' }
  },
  'age-30s': {
    title: '【30代以上・大人女子向け求人】落ち着いた接客とおもてなし',
    summary: '30代・40代の大人女性が主役の妖怪通り・若草通り。上品な所作と落ち着いた会話が高く評価され、安定した高日給を実現。',
    targetUser: '30代・40代の大人の女性・落ち着いた環境で働きたい接客経験者や初心者',
    dailyIncome: '日給 40,000円 〜 80,000円（安定した客単価）',
    monthlyIncome: '月収 500,000円 〜 1,200,000円以上',
    shift: '週2〜5日 / 体力に合わせて無理のないシフト編成',
    street: '妖怪通り・若草通り（大人の女性を求める常連の紳士客が集まる通り）',
    merits: [
      '年齢を重ねるほど「包容力」「落ち着き」としてプラスに評価される環境',
      '無理な若作りは不要、自分らしい上品なおもてなしで指名客が付く',
      '客層が落ち着いた紳士層中心でトラブルが極めて少ない'
    ],
    faqs: [
      { q: '30代後半や40代でも採用されますか？', a: 'はい、大歓迎です。飛田新地には妖怪通りなど大人の女性を求める通りがあり、30代・40代のキャストが多数活躍しています。' }
    ],
    salary: { min: 40000, max: 90000, emp: 'PART_TIME' }
  }
};

function buildCompareNoscript(slug) {
  if (slug && COMPARE_CATEGORY_MAP[slug]) {
    const cat = COMPARE_CATEGORY_MAP[slug];
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
                <tr><th>日給目安</th><td><strong>${escapeHtml(cat.dailyIncome)}</strong></td></tr>
                <tr><th>月収目安</th><td>${escapeHtml(cat.monthlyIncome)}</td></tr>
                <tr><th>シフト例</th><td>${escapeHtml(cat.shift)}</td></tr>
                <tr><th>おすすめ通り</th><td>${escapeHtml(cat.street)}</td></tr>
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

  // Default: Main /compare page
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
                <tr>
                  <th>運営元・応募形態</th>
                  <td><strong>◎ 料理組合正規加盟 老舗料亭直営公式採用</strong><br>面接から就業まで料亭専属スタッフが直接対応。仲介者が一切入らない正規ルート。</td>
                  <td><strong>× 街頭・SNS裏垢スカウト業者（非公認の個人仲介）</strong><br>SNS（X/インスタ）や街頭での声かけ。仲介目的で店舗に斡旋。</td>
                  <td><strong>△ 外部の求人情報ポータル・代理店サイト</strong><br>飛田ジョブ等の求人広告サイト。店舗と直接ではなくサイト運営者を挟む。</td>
                  <td><strong>△ ソープ・デリヘル・キャバクラ等の店舗</strong><br>風俗店舗や飲食店による直接採用。</td>
                </tr>
                <tr>
                  <th>仲介手数料・中間マージン</th>
                  <td><strong>◎ 完全0円（料亭直接契約のためピンハネ一切なし）</strong><br>売上の完全50%を即日全額日払い手渡し。雑費・紹介料の天引き一切なし。</td>
                  <td><strong>× 女の子の売上から10〜30%が継続的に天引き搾取される</strong><br>スカウトバックとして日給から中抜きピンハネ。生涯搾取のリスク。</td>
                  <td><strong>△ 店舗側に掲載料や広告費がかかるため、直接採用より待遇やバック率が抑えられる傾向</strong><br>サイト掲載費用が発生するため、直接応募より条件が制限されるケースあり。</td>
                  <td><strong>× 厚生費・ヘアメイク代・雑費など名目の引かれ物が多い</strong><br>雑費数千円やペナルティ制度がある店舗が多い。</td>
                </tr>
                <tr>
                  <th>給与バック率・支払い形態</th>
                  <td><strong>◎ 売上完全50%バック／全額即日手渡し日払い</strong><br>平均日給3万〜10万円超え。1回15〜20分の短時間接客で高回転。退勤時に即日全額手渡し。</td>
                  <td><strong>× スカウトの取り分が引かれ実質40%以下になるトラブル多発</strong><br>表面上の日給が高くても、スカウトへのバック天引きで実際の手取りは低い。</td>
                  <td><strong>△ サイト上の高収入表記と実際の面接時条件に差があることや、日払い制限がある場合あり</strong><br>掲載店舗によって条件が異なり、事前確認が必要。</td>
                  <td><strong>△ 歩合率40〜45%前後が一般的／月末締め翌月払いが主流</strong><br>日払いに上限があったり、翌月振込が中心。</td>
                </tr>
                <tr>
                  <th>身バレ対策・写真掲載</th>
                  <td><strong>◎ ネット・SNS写真掲載ゼロ（街全体で撮影全面禁止・源氏名徹底）</strong><br>組合規約により敷地内撮影禁止。サイトやSNSへの顔写真・パネル掲載は一切ありません。</td>
                  <td><strong>× スカウトが実績アピールのため無断でLINE画像等をネット流出させる危険</strong><br>個人情報流出や無断でのSNS晒しトラブルが多発。</td>
                  <td><strong>△ 集客用として体験談や雰囲気写真、宣伝コンテンツに利用される懸念あり</strong><br>求人サイトやSNS集客のために部分的な写真掲載を求められる場合あり。</td>
                  <td><strong>× サイト・雑誌・広告に顔写真や体型写真が半永久的に残る</strong><br>オフィシャルサイトやポータルに写真掲載必須。顔隠しでも特定リスク大。</td>
                </tr>
                <tr>
                  <th>お酒の飲酒・ノルマ</th>
                  <td><strong>◎ お酒一切不要（お茶やジュースのみ）／売上ノルマ完全なし</strong><br>日本茶やソフトドリンクでおもてなし。お酒が飲めない下戸の方でも安心。指名・売上ノルマなし。</td>
                  <td><strong>× 「売上あげろ」と無理な出勤や長時間勤務を強要される場合あり</strong><br>条件と違うキャバクラやガールズバーなど飲酒必須の業種に回されるケース多発。</td>
                  <td><strong>△ 掲載店舗によって方針がバラバラで、飛田新地以外の業種や系列店を勧められるリスク</strong><br>掲載店舗ごとに規定が異なり、他業種への誘導リスクも。</td>
                  <td><strong>× 飲酒必須（二日酔いリスク）または厳しい指名・同伴ノルマ</strong><br>お酒を飲む機会が多く、指名本数や延長の営業ノルマが課される。</td>
                </tr>
                <tr>
                  <th>連絡先交換・客への営業</th>
                  <td><strong>◎ 連絡先交換は組合規約で完全禁止（プライベート侵食ゼロ）</strong><br>お客様とのLINE・電話番号・SNSの交換は規約で固く禁止。店外営業や同伴・アフターなし。</td>
                  <td><strong>× リピート客獲得のため営業LINEを打つよう指示される</strong><br>スカウトから営業活動を指示され、プライベートが侵害される。</td>
                  <td><strong>△ 掲載店舗ごとに対応が異なり、事前連絡や面接時にルールが明確でない場合がある</strong><br>店舗によって連絡先交換の規定が曖昧な場合あり。</td>
                  <td><strong>× 休日の営業連絡・同伴・アフター対応が義務化され拘束時間大</strong><br>勤務時間外もお客様への営業LINEや来店アプローチが必須で精神的負担大。</td>
                </tr>
                <tr>
                  <th>トラブル対応・女性サポート</th>
                  <td><strong>◎ 仲居・女性統括スタッフが常駐・防犯ブザー・組合が全面守護</strong><br>面接から就業中・生活相談まで現場専属の女性スタッフが常駐し親身にフォロー。</td>
                  <td><strong>× 紹介後は音信不通、トラブル時は店舗に丸投げで無責任</strong><br>入店させた後は放置され、トラブルが起きても責任を取らないスカウトが多数。</td>
                  <td><strong>× サイト運営者は掲載・紹介のみで店舗現場には不在。入店後のトラブルは自己責任</strong><br>問い合わせ先は外部事務局のため、就業現場のリアルタイムな悩みは相談不可。</td>
                  <td><strong>△ 男性店長による圧迫面接や理不尽なペナルティが存在することも</strong><br>男性目線の指導が多く、女性特有の体調不良やメンタルの相談がしにくい。</td>
                </tr>
                <tr>
                  <th>退職時の自由度・違約金</th>
                  <td><strong>◎ 即日退店可能・違約金0円・引き止め一切なし</strong><br>合わないと感じたら即日で辞められます。引き止めや違約金は一切ありません。</td>
                  <td><strong>× 「途中で辞めるなら違約金数十万払え」と脅されるリスクあり</strong><br>「辞めるなら紹介料を返せ」など理不尽な脅迫や嫌がらせを受けるリスク。</td>
                  <td><strong>△ 紹介先店舗の個別雇用ルールに委ねられるため、即日精算や退店時に揉める可能性あり</strong><br>店舗規定に沿った事前申請が必要な場合がある。</td>
                  <td><strong>× 急な退店で給料没収やペナルティが発生する店舗あり</strong><br>数週間前の退職予告が必要だったり、ペナルティで最後の給料が引かれることも。</td>
                </tr>
              </tbody>
            </table>
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

function buildCompareJsonLd(slug) {
  if (slug && COMPARE_CATEGORY_MAP[slug]) {
    const cat = COMPARE_CATEGORY_MAP[slug];
    const catUrl = `https://tobitashinchi-recruit.com/compare/${slug}`;
    return JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'JobPosting',
      '@id': `${catUrl}#jobposting`,
      'title': cat.title,
      'description': `${cat.summary}【飛田新地料理組合公認料亭直営 飛田ガールズ】全額日払い手渡し・ノルマ罰金一切なし・個室マンション寮完備・安心の女性スタッフサポート。`,
      'identifier': {
        '@type': 'PropertyValue',
        'name': '飛田ガールズ 料亭直営採用窓口',
        'value': `TOBITA-COMPARE-${slug.toUpperCase()}`
      },
      'datePosted': '2026-10-01T00:00:00+09:00',
      'validThrough': '2027-12-31T23:59:59+09:00',
      'employmentType': cat.salary.emp,
      'jobBenefits': [
        '即日全額日払い（手渡し支給）',
        '家具家電付きワンルーム個室寮完備（即入居可）',
        '衣装・ドレス・和装無料レンタル',
        '専任女性スタッフによる24時間サポート体制',
        'ノルマ・罰金・連絡先交換・お酒の強要一切なし',
        'プロによるヘアメイク・身だしなみサポート無料'
      ],
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
          'minValue': cat.salary.min,
          'maxValue': cat.salary.max,
          'unitText': 'DAY'
        }
      },
      'applicantLocationRequirements': {
        '@type': 'Country',
        'name': 'JP'
      },
      'workHours': cat.shift,
      'qualifications': '20歳以上の女性（未経験歓迎・学歴経験不問 ※料理組合規約により20歳未満不可）',
      'directApply': true
    }, null, 2);
  }

  // Default /compare JSON-LD
  return JSON.stringify({
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
          'itemListElement': Object.keys(COMPARE_CATEGORY_MAP).map((key, idx) => ({
            '@type': 'ListItem',
            'position': idx + 1,
            'name': COMPARE_CATEGORY_MAP[key].title,
            'url': `https://tobitashinchi-recruit.com/compare/${key}`
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
}

function buildFaqNoscript() {
  return `
    <header>
      <p>飛田新地求人 FAQ（全119問・8大テーマ体系化）｜未経験・給料・身バレ・面接【公式】</p>
      <p>24時間受付中・相談無料・完全秘密厳守</p>
    </header>
    <main>
      <article>
        <h1>飛田新地求人 よくある質問100選（全119問・本音回答）</h1>
        <p class="lead">応募前に女の子から寄せられる100以上の疑問に、飛田新地料理組合公認老舗料亭直営の女性サポートスタッフが忖度なしの本音で回答しています。</p>
        <section>
          <h2>よくある質問と回答</h2>
          <dl>
            <dt>Q. 未経験でも求人に応募できますか？夜職経験が一切ありません。</dt>
            <dd>A. はい、全く問題ありません。在籍女性の約9割が完全未経験スタートです。事前の丁寧な講習で一から学べ、営業連絡や指名取りも不要です。</dd>
            <dt>Q. 飛田新地の求人は何歳から応募できますか？なぜ20歳以上限定なのですか？</dt>
            <dd>A. 応募資格は20歳以上の日本国籍を有する女性です（高校生および20歳未満不可）。2022年の民法改正後も、料亭としての未成年トラブル防止・料理組合規約厳守・女性キャストの安全保護のため「20歳以上」に完全統一しています。20代〜40代まで幅広く活躍しています。</dd>
            <dt>Q. 日給はいくら稼げますか？本当に全額日払いですか？</dt>
            <dd>A. 日給3万〜8万円、多い日で10万円〜15万円以上が平均相場です。売上の完全50%バックで、その日の勤務終了時に全額即日手渡し支給されます。天引きや罰金はありません。</dd>
            <dt>Q. 身バレしませんか？家族や会社にバレない？</dt>
            <dd>A. 敷地内撮影禁止のため、ネットやSNSへの写真掲載は一切ありません。源氏名で勤務し、自宅への郵送物や口座記録もないため身バレリスクは極めて低いです。昼職Wワークの方は住民税の普通徴収で会社バレを防げます。</dd>
            <dt>Q. お酒は飲まないといけませんか？</dt>
            <dd>A. お酒は一切飲む必要ありません。日本茶やソフトドリンクでおもてなしするため、下戸の方でも安心です。</dd>
            <dt>Q. 週1日や短期、月1日だけでもOKですか？</dt>
            <dd>A. はい、週1日・月数回・大型連休のみの超短期出稼ぎなど、自由出勤制でライフスタイルに合わせて働けます。</dd>
            <dt>Q. 辞めたくなったときはすぐに辞められますか？違約金は？</dt>
            <dd>A. 即日退店も可能で、違約金やペナルティは一切発生しません。無理な引き止めもありません。</dd>
          </dl>
        </section>
      </article>
    </main>
  `;
}

function buildAboutNoscript() {
  return `
    <header>
      <p>飛田ガールズについて｜運営者情報・監修体制・一次情報ポリシー【公式】</p>
      <p>24時間受付中・相談無料・完全秘密厳守</p>
    </header>
    <main>
      <article>
        <h1>飛田ガールズについて｜運営者情報・監修体制・一次情報ポリシー【公式】</h1>
        <p class="lead">飛田新地料理組合公認の老舗料亭直営公式求人「飛田ガールズ」の店舗情報、創業歴、運営体制、女性スタッフによるサポート方針、一次情報発信ポリシーをご紹介します。</p>
        <section>
          <h2>サイト運営者情報</h2>
          <table border="1">
            <tbody>
              <tr><th>サイト名</th><td>飛田ガールズ（飛田新地料亭直営求人・公式採用窓口）</td></tr>
              <tr><th>運営責任者</th><td>女性サポート統括担当 さくら（サポート歴8年） / 採用マネージャー 木村（管理歴12年）</td></tr>
              <tr><th>所在地</th><td>大阪府大阪市西成区山王エリア（飛田新地料理組合加盟料亭）</td></tr>
              <tr><th>お問い合わせ</th><td>公式LINE窓口（24時間受付中・年中無休）</td></tr>
            </tbody>
          </table>
        </section>
      </article>
    </main>
  `;
}

function buildBlogIndexNoscript(articles) {
  const listItems = articles.slice(0, 30).map(a => `
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
          <ul>${listItems}</ul>
        </section>
      </article>
    </main>
  `;
}

function buildBlogArticleNoscript(article) {
  let bodyText = '';
  if (Array.isArray(article.content)) {
    article.content.forEach((block) => {
      if (block.type === 'h2') bodyText += `<h2>${escapeHtml(block.text)}</h2>`;
      else if (block.type === 'h3') bodyText += `<h3>${escapeHtml(block.text)}</h3>`;
      else if (block.type === 'p') bodyText += `<p>${escapeHtml(block.text)}</p>`;
      else if (block.type === 'list' && Array.isArray(block.items)) {
        bodyText += `<ul>${block.items.map(it => `<li>${escapeHtml(it)}</li>`).join('')}</ul>`;
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
      </article>
    </main>
  `;
}

function buildTopicNoscript(topic) {
  const TOPIC_CONFIG = {
    'job': { title: '飛田新地求人のお仕事内容と1日の流れ', desc: '料亭の玄関でお出迎えし、お部屋でお茶やお菓子を出しながらおもてなし。お酒一切不要、営業連絡禁止、1回15〜20分の短時間接客で安心です。' },
    'salary': { title: '飛田新地の給料システムと日給相場', desc: '飛田新地の給与・報酬体系を完全公開。売上ハーフバック（50%）で日給3万〜10万円超。引かれもの・雑費なし、即日全額現金日払い手渡し。' },
    'beginner': { title: '飛田新地求人は未経験でも安心！夜職初めての女性へ', desc: '夜のお仕事が初めての女性向けガイド。90%以上が未経験スタート。女性スタッフによる丁寧な研修と手厚いフォロー。' },
    'experienced': { title: '飛田新地求人 経験者・他店他業種からの移籍', desc: 'キャバクラ、ラウンジ、他店からの移籍・経験者サポート。自由シフト・高稼働料亭直営で無駄なストレスゼロ。' },
    'requirements': { title: '飛田新地求人の応募資格・年齢条件・必要書類', desc: '20歳以上の女性（未成年・高校生不可）。本籍地記載の住民票原本またはパスポートで厳格確認。' },
    'flow': { title: '飛田新地求人 応募から面接・体験入店・お仕事開始までの流れ', desc: 'LINEでの無料相談から面接、即日体験入店、日払い受け取りまでの具体的なステップを解説。' },
    'workstyle': { title: '飛田新地求人の自由シフトと働き方', desc: '昼シフト（10時〜18時）や夜シフト、週1日出勤など、ライフスタイルに合わせた自由な働き方。' },
    'shops': { title: '飛田新地の通り別の違いとお店選びのポイント', desc: 'メイン通り、青春通り、大門通り、妖怪通りなど各通りの客層と年齢層の特徴を解説。' },
    'dorm': { title: '飛田新地の個室マンション寮・生活支援・出稼ぎサポート', desc: '天王寺・難波周辺のオートロック個室マンション寮完備。日額1,000円〜、家具家電付き即日入居可。' },
    'safety': { title: '飛田新地求人の身バレ防止と安全対策・衛生ルール', desc: '敷地内撮影禁止、ネット写真掲載ゼロ、源氏名勤務、住民税普通徴収で秘密厳守。' }
  };

  const conf = TOPIC_CONFIG[topic] || { title: `飛田新地求人ガイド【${topic}】`, desc: '飛田新地料亭直営公式求人の解説ページです。' };

  return `
    <header>
      <p>飛田新地求人サイト「飛田ガールズ」【公式】</p>
      <p>24時間受付中・相談無料・完全秘密厳守</p>
    </header>
    <main>
      <article>
        <h1>${escapeHtml(conf.title)}｜飛田ガールズ【公式】</h1>
        <p class="lead">${escapeHtml(conf.desc)}</p>
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

function injectSeoMetadata(originalHtml, reqUrl, articles = []) {
  let title = DEFAULT_TITLE;
  let description = DEFAULT_DESC;
  let canonicalUrl = 'https://tobitashinchi-recruit.com/';
  let ogType = 'website';
  let ogImageUrl = DEFAULT_IMAGE;
  let ogImageAlt = '飛田新地求人 飛田ガールズ';
  let twitterCard = 'summary_large_image';
  let status = 200;
  let prerenderContent = '';
  let customJsonLd = null;
  let customNoscript = null;

  const cleanPath = reqUrl.split('?')[0].split('#')[0];

  // 1. Blog details
  if (cleanPath.startsWith('/blog/')) {
    const slug = cleanPath.replace('/blog/', '').replace(/\/$/, '');
    if (slug) {
      const article = articles.find(a => a.slug === slug);
      if (article) {
        title = `${article.title}｜飛田新地求人 飛田ガールズ`;
        description = article.summary || description;
        canonicalUrl = `https://tobitashinchi-recruit.com/blog/${article.slug}`;
        ogType = 'article';
        ogImageUrl = resolveFullImageUrl(article.eyeCatch);
        ogImageAlt = article.title;
        customNoscript = buildBlogArticleNoscript(article);

        const articleUrl = `https://tobitashinchi-recruit.com/blog/${article.slug}`;

        const graphItems = [
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

        customJsonLd = JSON.stringify({
          "@context": "https://schema.org",
          "@graph": graphItems
        }, null, 2);
      } else {
        status = 404;
        title = 'お探しの記事が見つかりませんでした (404 Not Found)｜飛田新地求人 飛田ガールズ';
        description = '指定された記事は存在しないか、移動した可能性があります。';
        canonicalUrl = '';
      }
    }
  } else if (cleanPath === '/compare' || cleanPath === '/compare/') {
    title = '飛田新地求人サイト比較＆目的別求人ガイド【2026年最新】｜未経験・高収入・Wワーク【公式】';
    description = '飛田新地料亭直営公式求人と街頭スカウト業者・他求人サイト（飛田ジョブなど）の4者徹底比較。安心の料亭直営で即日全額日払い・身バレ完全防止。';
    canonicalUrl = 'https://tobitashinchi-recruit.com/compare';
    ogImageUrl = DEFAULT_IMAGE;
    customNoscript = buildCompareNoscript();
    customJsonLd = buildCompareJsonLd();
  } else if (cleanPath.startsWith('/compare/')) {
    const slug = cleanPath.replace('/compare/', '').replace(/\/$/, '');
    const meta = COMPARE_CATEGORY_MAP[slug];
    if (meta) {
      title = `${meta.title}｜飛田新地求人 飛田ガールズ【公式】`;
      description = `${meta.summary} 安心の料理組合公認料亭直営で即日全額日払い・身バレ完全防止。`;
      canonicalUrl = `https://tobitashinchi-recruit.com/compare/${slug}`;
      ogImageUrl = DEFAULT_IMAGE;
      customNoscript = buildCompareNoscript(slug);
      customJsonLd = buildCompareJsonLd(slug);
    }
  } else if (cleanPath === '/faq' || cleanPath.startsWith('/faq/')) {
    title = '飛田新地求人 FAQ（全119問・8大テーマ体系化）｜未経験・給料・身バレ・面接【公式】';
    description = '飛田新地求人のよくある質問と回答（全119問）。応募資格、面接、給料手渡し、個室寮、身バレ対策など、疑問や不安をテーマ別に完全解消。';
    canonicalUrl = `https://tobitashinchi-recruit.com${cleanPath}`;
    ogImageUrl = DEFAULT_IMAGE;
    customNoscript = buildFaqNoscript();
  } else if (cleanPath === '/about') {
    title = '飛田ガールズについて｜運営者情報・監修体制・一次情報ポリシー【公式】';
    description = '飛田新地料理組合公認の老舗料亭直営公式求人「飛田ガールズ」の店舗情報、創業歴、運営体制、女性スタッフによるサポート方針、一次情報発信ポリシーをご紹介します。';
    canonicalUrl = 'https://tobitashinchi-recruit.com/about';
    ogImageUrl = DEFAULT_IMAGE;
    customNoscript = buildAboutNoscript();
  } else if (cleanPath === '/blog' || cleanPath === '/blog/') {
    title = '飛田新地お仕事コラム・給与・面接ガイド一覧｜飛田ガールズ【公式】';
    description = '飛田新地のお仕事、給料システム、面接・体入の流れ、寮生活、安全対策など、現場の女性スタッフによる役立つ最新コラム一覧。';
    canonicalUrl = 'https://tobitashinchi-recruit.com/blog';
    ogImageUrl = DEFAULT_IMAGE;
    ogImageAlt = '飛田新地お仕事コラム 飛田ガールズ';
    customNoscript = buildBlogIndexNoscript(articles);
  } else {
    // Topic clusters
    const topic = cleanPath.replace(/^\//, '').replace(/\/$/, '');
    if (['job', 'salary', 'beginner', 'experienced', 'requirements', 'flow', 'workstyle', 'shops', 'dorm', 'safety'].includes(topic)) {
      customNoscript = buildTopicNoscript(topic);
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

  // Canonical URL
  if (/<link\s+rel=["']canonical["'][^>]*>/i.test(html)) {
    html = html.replace(/<link\s+rel=["']canonical["'][^>]*>/i, `<link rel="canonical" href="${canonicalUrl}" />`);
  } else {
    html = html.replace(/<\/head>/i, `  <link rel="canonical" href="${canonicalUrl}" />\n</head>`);
  }

  // OGP and Twitter Card Tags (for X/Twitter note-style cards, LINE, and Facebook)
  const metaMappings = [
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

  if (customJsonLd) {
    html = html.replace(/<script\s+type=["']application\/ld\+json["']>[\s\S]*?<\/script>/i, `<script type="application/ld+json">\n${customJsonLd}\n</script>`);
  }

  if (customNoscript) {
    html = html.replace(/<noscript>[\s\S]*?<\/noscript>/i, `<noscript>\n${customNoscript}\n</noscript>`);
  }

  if (prerenderContent) {
    html = html.replace(/<body([^>]*)>/i, `<body$1>\n${prerenderContent}`);
  }

  return { html, status };
}

function runPrerender() {
  const distDir = path.join(process.cwd(), 'dist');
  const templatePath = path.join(distDir, 'index.html');

  if (!fs.existsSync(templatePath)) {
    console.error('Error: dist/index.html not found! Run vite build before prerendering.');
    process.exit(1);
  }

  const template = fs.readFileSync(templatePath, 'utf-8');

  // Load articles
  const articlesPath = path.join(process.cwd(), 'data', 'blogArticles.json');
  let articles = [];
  if (fs.existsSync(articlesPath)) {
    articles = JSON.parse(fs.readFileSync(articlesPath, 'utf-8'));
  }

  console.log(`[Prerender] Starting pre-rendering for ${articles.length} articles and static routes...`);

  const writeHtml = (filePath, htmlContent) => {
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(filePath, htmlContent, 'utf-8');
  };

  let count = 0;

  // 1. Pre-render every blog article
  for (const article of articles) {
    if (!article.slug) continue;
    const url = `/blog/${article.slug}`;
    const { html } = injectSeoMetadata(template, url, articles);
    writeHtml(path.join(distDir, 'blog', article.slug, 'index.html'), html);
    writeHtml(path.join(distDir, 'blog', `${article.slug}.html`), html);
    count++;
  }

  // 2. Pre-render Blog Index
  const blogList = injectSeoMetadata(template, '/blog', articles);
  writeHtml(path.join(distDir, 'blog', 'index.html'), blogList.html);
  writeHtml(path.join(distDir, 'blog.html'), blogList.html);

  // 3. Pre-render About
  const about = injectSeoMetadata(template, '/about', articles);
  writeHtml(path.join(distDir, 'about', 'index.html'), about.html);
  writeHtml(path.join(distDir, 'about.html'), about.html);

  // 4. Pre-render FAQ
  const faq = injectSeoMetadata(template, '/faq', articles);
  writeHtml(path.join(distDir, 'faq', 'index.html'), faq.html);
  writeHtml(path.join(distDir, 'faq.html'), faq.html);

  // 5. Pre-render Compare Main
  const compare = injectSeoMetadata(template, '/compare', articles);
  writeHtml(path.join(distDir, 'compare', 'index.html'), compare.html);
  writeHtml(path.join(distDir, 'compare.html'), compare.html);

  // Compare sub-categories
  const compareSlugs = [
    'inexperienced', 'high-income', 'weekly-1', 'short-term',
    'dormitory', 'double-work', 'age-20s', 'age-30s'
  ];
  for (const slug of compareSlugs) {
    const compPage = injectSeoMetadata(template, `/compare/${slug}`, articles);
    writeHtml(path.join(distDir, 'compare', slug, 'index.html'), compPage.html);
    writeHtml(path.join(distDir, 'compare', `${slug}.html`), compPage.html);
  }

  // 6. Pre-render Topic Clusters
  const topics = [
    'job', 'salary', 'beginner', 'experienced',
    'requirements', 'flow', 'workstyle', 'shops', 'dorm', 'safety'
  ];
  for (const t of topics) {
    const topicPage = injectSeoMetadata(template, `/${t}`, articles);
    writeHtml(path.join(distDir, t, 'index.html'), topicPage.html);
    writeHtml(path.join(distDir, `${t}.html`), topicPage.html);
  }

  // 7. Ensure _redirects in dist
  const rootRedirects = path.join(process.cwd(), '_redirects');
  if (fs.existsSync(rootRedirects)) {
    fs.copyFileSync(rootRedirects, path.join(distDir, '_redirects'));
  }

  console.log(`[Prerender] Successfully generated pre-rendered static HTML for ${count} articles and core pages!`);
}

runPrerender();
