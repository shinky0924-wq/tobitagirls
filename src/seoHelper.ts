import fs from 'fs';
import path from 'path';
import {
  SITE_COMPARE_SEO,
  INDUSTRY_COMPARE_COLUMNS,
  INDUSTRY_COMPARE_ROWS,
  INDUSTRY_DETAIL_CARDS,
  APPLICATION_METHOD_COLUMNS,
  APPLICATION_METHOD_ROWS,
  PRE_APPLY_CHECK_POINTS,
  SITE_COMPARE_FAQS,
  SITE_COMPARE_INTERNAL_LINKS,
} from './compareData';
import { TOPIC_CLUSTERS } from './topicClusterData';
import { FAQ_100_LIST, FAQ_12_CATEGORIES, FAQ_LAST_UPDATED, FAQ_LAST_UPDATED_ISO, resolveFaq12Category } from './faq100Data';
import { GLOSSARY_TERMS } from './glossaryData';
import {
  COMPARE_CATEGORY_GROUPS,
  COMPARE_PARENT_COPY,
  COMPARE_LINE_CTA,
  COMPARE_SUBPAGES,
  COMPARE_SUBPAGE_MAP,
  LEGACY_COMPARE_SLUG_REDIRECTS,
} from './data/compareGuides';
import {
  OFFICIAL_DOMAIN,
  OFFICIAL_LINE_URL,
  OFFICIAL_SAME_AS_URLS,
  CANONICAL_AUTHORS,
  resolveAuthorPersonNode,
  buildGlossaryMentions,
  buildArticleCitations,
  calculateArticleWordCount,
} from './utils/knowledgeGraph';

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

const DEFAULT_TITLE = '飛田新地求人｜飛田ガールズ【公式・料亭直営】未経験歓迎・即日日払い';
const DEFAULT_DESC = '飛田新地で働くか迷っている女性へ。飛田ガールズは料亭直営の求人案内サイトです。仕事内容や接客方法、給料・全額日払いの仕組み、応募条件、身バレ対策まで詳しく解説。未経験の方も経験者の方も、応募前に知っておきたい情報を分かりやすく紹介しています。';
const DEFAULT_IMAGE = 'https://tobitashinchi-recruit.com/images/tobita_dream_hero_banner_1782557055526.jpg';

function buildHomeNoscript(): string {
  return `
    <header class="ssr-topbar">
      <div class="ssr-topbar-inner">
        <a href="/" class="ssr-brand">
          <img src="/favicon.png" alt="飛田ガールズ アイコン" class="ssr-logo-img" width="36" height="36" />
          <span class="ssr-brand-text">
            <strong>飛田ガールズ</strong>
            <small>Tobita Girls・料亭直営求人</small>
          </span>
        </a>
        <nav class="ssr-topnav" aria-label="主要メニュー">
          <a href="/">求人トップ</a>
          <a href="/faq">よくある質問</a>
          <a href="/blog">お仕事コラム</a>
          <a href="/#consultation" class="ssr-nav-cta">LINE無料相談</a>
        </nav>
      </div>
    </header>

    <section class="ssr-hero">
      <div class="ssr-hero-inner">
        <p class="ssr-hero-pill"><span class="ssr-hero-dot"></span>飛田新地の求人案内｜料亭直営の公式採用窓口</p>
        <h1 id="hero-title" class="ssr-hero-h1">
          <span>飛田新地の求人案内｜</span>
          <span class="ssr-hero-accent">働くことを考えている女性へ。</span>
        </h1>
        <div id="hero-description" class="ssr-hero-desc">
          <p>当店では、仕事内容や給料の仕組み、未経験から働くまでの流れ、お店選びのポイントなど、求人を探すうえで知っておきたい情報をわかりやすくまとめています。</p>
          <p class="ssr-hero-questions">
            <span>・「未経験でも大丈夫？」</span>
            <span>・「実際どんな仕事をするの？」</span>
            <span>・「身バレや人間関係が心配……」</span>
          </p>
          <p>そんな疑問や不安にも、丁寧にお答えします。</p>
          <p class="ssr-hero-cta-line">まずは相談だけでもお気軽にご相談ください。</p>
        </div>
        <div class="ssr-hero-visual">
          <div class="ssr-hero-card">
            <picture>
              <source srcset="/images/tobita_dream_hero_banner_1782557055526.webp" type="image/webp" />
              <img src="https://tobitashinchi-recruit.com/images/tobita_dream_hero_banner_1782557055526.jpg" alt="飛田新地のお仕事・料亭直営求人で夢を叶える場所" class="ssr-hero-img" width="800" height="450" />
            </picture>
            <div class="ssr-hero-stamp">
              <span>飛田新地で</span>
              <strong>夢を叶えよう！</strong>
            </div>
          </div>
        </div>
        <section class="ssr-hero-pickup" aria-label="人気のお仕事コラム（おすすめ5選）">
          <h2>人気のお仕事コラム（おすすめ5選）</h2>
          <ol>
            <li><a href="/blog/tobitashinchi-beginner-guide">【未経験者必読】飛田新地のお仕事とは？業界一わかりやすい初心者ガイド</a></li>
            <li><a href="/blog/tobita-job-guide">飛田新地の仕事内容とは？出勤から接客・退勤までの1日の流れを解説</a></li>
            <li><a href="/blog/tobitashinchi-salary-system">【給料システム公開】飛田新地って本当に稼げる？日給10万円超えの仕組みと計算式</a></li>
            <li><a href="/blog/tobitashinchi-privacy-guide">【飛田新地の秘密厳守】友達・家族に知られにくく働くための5つの「身バレ対策」ルール</a></li>
            <li><a href="/blog/tobitashinchi-interview-guide">【飛田新地・面接ガイド】面接の服装は？持ち物は？採用担当者がチェックする3つのポイント</a></li>
          </ol>
        </section>
      </div>
    </section>

    <main class="ssr-below-fold">
      <article>
        <section>
          <h2>募集要項・基本条件</h2>
          <table border="1">
            <tbody>
              <tr>
                <th>職種</th>
                <td>料亭接客スタッフ（大阪市西成区山王）</td>
              </tr>
              <tr>
                <th>給与・報酬</th>
                <td>完全歩合制・売上50%バック・即日全額現金日払い（雑費天引きなし ※時間帯・来店状況により変動）</td>
              </tr>
              <tr>
                <th>応募資格</th>
                <td>満20歳以上の女性（未経験歓迎・学歴経験不問 ※20歳未満不可）</td>
              </tr>
              <tr>
                <th>勤務地・アクセス</th>
                <td>Osaka Metro「動物園前駅」徒歩5分 / JR・南海「新今宮駅」徒歩7分 / 各線「天王寺駅」徒歩10分</td>
              </tr>
              <tr>
                <th>勤務時間</th>
                <td>10:00〜24:00（自由シフト制・週1日〜・短時間・WワークOK）</td>
              </tr>
              <tr>
                <th>待遇・サポート</th>
                <td>WEB顔出しなし・衣装無料貸出・女性スタッフ対応（個室寮・交通費は事前確認）</td>
              </tr>
            </tbody>
          </table>

          <h3>コース別の手取り目安（売上50%バック・全額現金日払い）</h3>
          <table border="1">
            <thead>
              <tr>
                <th>コース時間</th>
                <th>女性手取り目安（雑費天引き0円）</th>
              </tr>
            </thead>
            <tbody>
              <tr><th>15分コース</th><td>5,000円</td></tr>
              <tr><th>20分コース</th><td>7,500円</td></tr>
              <tr><th>30分コース</th><td>10,000円</td></tr>
              <tr><th>45分コース</th><td>15,000円</td></tr>
              <tr><th>60分コース</th><td>20,000円</td></tr>
              <tr><th>外国人客対応手当</th><td>1組あたり ＋2,500円</td></tr>
            </tbody>
          </table>

          <h3>通りの違い・最寄り駅からのアクセス</h3>
          <ul>
            <li><strong>メイン通り・青春通り</strong>：エリアの中でも人通りが多く活気のある中心エリア。当店もメイン・青春通りエリアにあり、雰囲気を確認しやすい立地です。</li>
            <li><strong>大門通り・裏通り</strong>：大門通りはエリア入口付近、裏通りは落ち着いた常連客・ビジネス層中心の静かな通りです。</li>
            <li><strong>主要3駅からの徒歩ルート</strong>：動物園前駅（徒歩5分）・新今宮駅（徒歩7分）・天王寺駅（徒歩10分）。希望時は最寄り駅周辺での待ち合わせ案内にも対応します。</li>
          </ul>

          <div class="ssr-trust-box">
            <h3>料亭直営公式窓口・情報監修について</h3>
            <p>所在地：大阪府大阪市西成区山王（飛田新地料理組合加盟料亭）。当サイト「飛田ガールズ」は、外部スカウトや仲介業者を介さない料亭直営の公式採用窓口です。紹介料・手数料は一切かからず、現場に常駐する女性サポートスタッフ（さくら）・採用管理担当（木村）が、事前見学から体験入店・安全管理まで事実ベースでご案内しています。</p>
            <p><a href="/about">運営者情報・直営体制を見る</a> / <a href="/site-compare">他業種・応募ルート徹底比較</a> / <a href="/compare">働き方・条件別ガイド（5カテゴリー）</a> / <a href="/glossary">用語集・業界知識辞典</a></p>
          </div>
        </section>

        <section id="recruit-hub">
          <h2>お仕事・総合ガイド（全12カテゴリー）</h2>
          <ol>
            <li><h3><a href="/job">仕事内容｜未経験でもできる？お仕事の流れ</a></h3><p>笑顔での接客・お酒不要・呼び込みは仲居さんが担当。</p></li>
            <li><h3><a href="/salary">給料・待遇｜売上バック率と日払いの仕組み</a></h3><p>売上50%バックで働いたその日に全額現金日払い。</p></li>
            <li><h3><a href="/beginner">未経験｜初めてでも安心のサポート体制</a></h3><p>在籍キャストの多くが未経験からスタート。女性スタッフが個別対応。</p></li>
            <li><h3><a href="/experienced">経験者｜より良い環境で働くための移籍優遇</a></h3><p>営業連絡・ノルマ・お酒・お風呂掃除なしの働きやすい環境。</p></li>
            <li><h3><a href="/requirements">募集要項｜応募条件と面接・体験時の必要書類</a></h3><p>満20歳以上の女性対象。履歴書不要・私服で面接OK（※体験・勤務時は住民票原本または日本国パスポート必須）。</p></li>
            <li><h3><a href="/flow">面接・体験入店｜応募から体験入店までの流れ</a></h3><p>LINE相談・私服見学・希望に応じた1日体験入店に対応。</p></li>
            <li><h3><a href="/workstyle">働き方｜自分のペースで選べるシフト</a></h3><p>10:00〜24:00の自由シフト制。週1日〜・Wワーク対応。</p></li>
            <li><h3><a href="/shops">お店選び｜通りの特徴と当直営料亭</a></h3><p>各通りの特徴・確認ポイントと当直営料亭のご案内。</p></li>
            <li><h3><a href="/dekasegi">寮・出稼ぎ｜個室寮相談と交通費規定支給</a></h3><p>家具家電・Wi-Fi付き個室寮の相談や遠方交通費サポート（規定あり）。</p></li>
            <li><h3><a href="/safety">プライバシー対策｜身バレを防ぐ安全対策</a></h3><p>撮影禁止ルール・完全源氏名・住民税普通徴収の案内。</p></li>
            <li><h3><a href="/faq">よくある質問｜応募前の不安を解消するQ&amp;A</a></h3><p>未経験・給料・身バレなど全${FAQ_100_LIST.length}問のQ&amp;A。</p></li>
            <li><h3><a href="/blog">お仕事コラム｜働く前に知りたい体験談とノウハウ</a></h3><p>厳選128本の解説記事・実例コラム。</p></li>
          </ol>
          <p><a href="/site-compare">他業種・応募方法徹底比較を見る</a> / <a href="/compare">目的・働き方別求人ガイドを見る</a> / <a href="/glossary">用語集を見る</a> / <a href="/about">運営者情報を見る</a></p>
        </section>

        <section id="reasons">
          <h2>選ばれる6つの理由</h2>
          <ul>
            <li>集客力へのこだわり（新規・リピーターの獲得）</li>
            <li>メイク・美容サポート（ヘアスタイル・身だしなみ相談）</li>
            <li>未経験から始められる丁寧なサポート</li>
            <li>いじめや派閥のない働きやすい環境</li>
            <li>分かりやすい給与・待遇システム</li>
            <li>顔出しなし・個人情報保護などのプライバシー配慮</li>
          </ul>
        </section>

        <section id="voice">
          <h2>在籍キャストのリアル体験談</h2>
          <ul>
            <li><strong>未経験スタート（20代前半・週3日勤務）</strong>：仲居さんが隣で優しく声をかけてくれるため、初日の不安がすぐ消えました。退勤時にその場で全額現金手渡しで受け取れるので安心です。</li>
            <li><strong>Wワーク・副業（20代後半・週末のみ）</strong>：顔写真掲載や連絡先交換がなく、住民税の普通徴収についても事前に案内してもらえたため、昼職と無理なく両立できています。</li>
          </ul>
        </section>

        <section id="section-faq">
          <h2>応募する前に、気になることを解消しませんか？（よくある質問）</h2>
          <dl>
            <dt>Q. 未経験でも本当に大丈夫ですか？</dt>
            <dd>A. はい、在籍キャストの多くが未経験からスタートしています。仲居さんや女性スタッフが優しくフォローするため、事前の専門知識は不要です。</dd>
            <dt>Q. 家族・友人・会社に身バレしませんか？</dt>
            <dd>A. 源氏名での勤務、WEB写真非公開、住民税の普通徴収手続き案内など、プライバシー保護を徹底しています。</dd>
            <dt>Q. お酒が飲めない・弱くても働けますか？</dt>
            <dd>A. 全く問題ありません。飛田新地の料亭はお酒を飲む場ではないため、お酒が飲めない方も活躍しています。</dd>
            <dt>Q. 体験入店（1日だけ）でも大丈夫ですか？</dt>
            <dd>A. はい、大歓迎です。日給はその場で全額日払いとなり、合わないと感じた場合はその日だけで終了しても問題ありません。</dd>
          </dl>
          <p><a href="/faq">よくある質問（FAQ全${FAQ_100_LIST.length}問）を見る</a></p>
        </section>

        <section id="flow">
          <h2>応募からお仕事開始までの流れ・LINE相談</h2>
          <p>①公式LINEで無料相談・見学予約 → ②私服・履歴書不要で見学＆条件説明 → ③貸出衣装で1日体験入店 → ④退勤時に売上50%バックを即日全額現金手渡し受取。</p>
          <p>応募するか迷っている方も、まずはお気軽に公式LINEよりご相談ください（24時間受付中・相談無料）。</p>
        </section>
      </article>
    </main>
  `;
}

function buildHomeJsonLd(): string {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${OFFICIAL_DOMAIN}/#website`,
        'url': `${OFFICIAL_DOMAIN}/`,
        'name': '飛田ガールズ',
        'alternateName': ['飛田ガールズ公式', 'Tobita Girls'],
        'description': '飛田新地の女性向け求人情報サイト。仕事内容や給料の仕組み（完全歩合制・売上50%バック即日日払い）、応募条件、面接・体験入店の流れ、身バレ対策を網羅。',
        'inLanguage': 'ja-JP',
        'publisher': {
          '@id': `${OFFICIAL_DOMAIN}/#organization`
        },
        'potentialAction': {
          '@type': 'SearchAction',
          'target': {
            '@type': 'EntryPoint',
            'urlTemplate': `${OFFICIAL_DOMAIN}/faq?search={search_term_string}`
          },
          'query-input': 'required name=search_term_string'
        }
      },
      {
        '@type': 'WebPage',
        '@id': `${OFFICIAL_DOMAIN}/#webpage`,
        'url': `${OFFICIAL_DOMAIN}/`,
        'name': DEFAULT_TITLE,
        'description': DEFAULT_DESC,
        'dateModified': FAQ_LAST_UPDATED_ISO,
        'inLanguage': 'ja-JP',
        'isPartOf': {
          '@id': `${OFFICIAL_DOMAIN}/#website`
        },
        'publisher': {
          '@id': `${OFFICIAL_DOMAIN}/#organization`
        },
        'primaryImageOfPage': {
          '@type': 'ImageObject',
          'url': DEFAULT_IMAGE,
          'width': 1376,
          'height': 768
        },
        'speakable': {
          '@type': 'SpeakableSpecification',
          'cssSelector': [
            '#hero-title',
            '#hero-description',
            '#recruit-hub',
            '#reasons',
            '#voice',
            '#flow'
          ]
        }
      },
      {
        '@type': 'Organization',
        '@id': `${OFFICIAL_DOMAIN}/#organization`,
        'name': '飛田ガールズ（料亭直営求人・女性採用サポート）',
        'url': `${OFFICIAL_DOMAIN}/`,
        'sameAs': OFFICIAL_SAME_AS_URLS,
        'publishingPrinciples': `${OFFICIAL_DOMAIN}/about`,
        'areaServed': '大阪府大阪市',
        'knowsAbout': [
          '飛田新地の仕事内容・接客ルール',
          '料亭直営の女性向け求人案内',
          '売上50%バック・全額日払いの仕組み',
          '身バレ対策・プライバシー配慮',
          '未経験・地方出稼ぎのサポート体制'
        ],
        'address': {
          '@type': 'PostalAddress',
          'streetAddress': '山王3丁目',
          'addressLocality': '大阪市西成区',
          'addressRegion': '大阪府',
          'postalCode': '557-0001',
          'addressCountry': 'JP'
        },
        'logo': {
          '@type': 'ImageObject',
          'url': `${OFFICIAL_DOMAIN}/icon.png`,
          'width': 384,
          'height': 384
        },
        'contactPoint': {
          '@type': 'ContactPoint',
          'contactType': 'customer support',
          'url': OFFICIAL_LINE_URL,
          'availableLanguage': ['Japanese']
        }
      },
      {
        '@type': 'Place',
        '@id': `${OFFICIAL_DOMAIN}/#place`,
        'name': '飛田新地料理組合公認 料亭街',
        'address': {
          '@type': 'PostalAddress',
          'streetAddress': '山王3丁目',
          'addressLocality': '大阪市西成区',
          'addressRegion': '大阪府',
          'postalCode': '557-0001',
          'addressCountry': 'JP'
        },
        'geo': {
          '@type': 'GeoCoordinates',
          'latitude': 34.6468,
          'longitude': 135.5085
        },
        'hasMap': 'https://maps.google.com/?q=34.6468,135.5085'
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${OFFICIAL_DOMAIN}/#breadcrumb`,
        'itemListElement': [
          {
            '@type': 'ListItem',
            'position': 1,
            'name': 'トップページ',
            'item': `${OFFICIAL_DOMAIN}/`
          },
          {
            '@type': 'ListItem',
            'position': 2,
            'name': `よくある質問（FAQ全${FAQ_100_LIST.length}問）`,
            'item': `${OFFICIAL_DOMAIN}/faq`
          },
          {
            '@type': 'ListItem',
            'position': 3,
            'name': 'お仕事コラム・解説記事一覧',
            'item': `${OFFICIAL_DOMAIN}/blog`
          }
        ]
      },
      {
        '@type': 'FAQPage',
        '@id': `${OFFICIAL_DOMAIN}/#faq`,
        'dateModified': FAQ_LAST_UPDATED_ISO,
        'mainEntity': [
          {
            '@type': 'Question',
            'name': '飛田新地は未経験でも求人に応募できますか？',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': 'はい、未経験から応募できます。在籍女性の多くが夜職未経験からのスタートです。接客の流れや衛生管理・身だしなみのポイントも、事前の丁寧な説明・レクチャーで一から確認できますのでご安心ください。'
            }
          },
          {
            '@type': 'Question',
            'name': '飛田新地の求人は何歳から応募できますか？なぜ20歳以上限定なのですか？',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': '応募資格は満20歳以上の女性です（20歳未満・高校生不可）。法令および飛田新地料理組合の規約により20歳未満の就労を固く禁じているため、体験入店・勤務開始時には本籍地記載の住民票原本（マイナンバー記載なし）または有効期限内の日本国パスポート（＋顔写真付き公的身分証明書）による年齢確認を行っています。'
            }
          },
          {
            '@type': 'Question',
            'name': '飛田新地のお給料は全額日払いですか？計算の仕組みは？',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': 'はい、完全歩合制（売上50%バック）で退勤時にその日の手取り分を全額現金でお渡しします。ロッカー代や更衣室代などの雑費天引きはありません（※完全歩合制のため収入は出勤時間帯や来店状況により変動します）。'
            }
          },
          {
            '@type': 'Question',
            'name': '飛田新地の仕事内容は何ですか？',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': '料亭の玄関に座り、仲居さんの呼び込みに合わせて来店されたお客様を2階の個室へご案内し、15〜20分ほどおもてなし接客を行う業務です。お酒の飲酒やお客様との連絡先交換、お茶出しなどの雑用もありません。'
            }
          },
          {
            '@type': 'Question',
            'name': '身バレ対策やプライバシー保護はありますか？',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': 'WebサイトやSNSへの顔写真掲載は行わず、エリア全体で写真・動画撮影を禁止しています。完全源氏名での勤務や私服通勤、住民税の普通徴収の案内などでプライバシーに配慮しています。'
            }
          },
          {
            '@type': 'Question',
            'name': '会社員（OL）や学生のWワーク・副業でも大丈夫ですか？',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': 'はい、週末のみ・週1日・昼シフトなど自由出勤が可能です。確定申告で住民税を「普通徴収（自分で納付）」にすることで、本業の会社に副業の通知が届きにくい方法もご案内しています。'
            }
          },
          {
            '@type': 'Question',
            'name': '寮や生活支援、出稼ぎの交通費はありますか？',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': 'はい、遠方からの出稼ぎや滞在希望向けの寮案内や交通費サポートのご相談が可能です。具体的な物件条件・利用料・交通費の支給条件は時期や出発地、勤務予定により異なるため、応募・面接前にLINE等で事前確認を行っています。'
            }
          },
          {
            '@type': 'Question',
            'name': '面接や体験入店の流れを教えてください。',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': 'LINEでご連絡後、履歴書不要・私服で面接・見学が可能です。女性スタッフがお店の雰囲気や条件を説明し、納得いただければ1日体験入店（即日全額日払い）も可能です。'
            }
          },
          {
            '@type': 'Question',
            'name': 'ノルマや罰金・ペナルティはありますか？',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': 'いいえ、指名ノルマ・同伴ノルマ・売上ペナルティや理不尽な罰金・雑費天引きはありません。'
            }
          },
          {
            '@type': 'Question',
            'name': '相談や見学だけで実際に働かなくても大丈夫ですか？',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': 'はい、大歓迎です。無理な勧誘や強要は一切ございません。条件や雰囲気を聞いて納得できなかった場合は、その場でお断りいただいて問題ありません。'
            }
          }
        ]
      }
    ]
  }, null, 2);
}

function buildSiteCompareNoscript(): string {
  const industryRowsHtml = INDUSTRY_COMPARE_ROWS.map((row) => `
    <tr>
      <th>${escapeHtml(row.criteria)}</th>
      <td>${escapeHtml(row.tobita)}</td>
      <td>${escapeHtml(row.mensEsthe)}</td>
      <td>${escapeHtml(row.soap)}</td>
      <td>${escapeHtml(row.delihel)}</td>
      <td>${escapeHtml(row.cabaret)}</td>
    </tr>
  `).join('');

  const methodRowsHtml = APPLICATION_METHOD_ROWS.map((row) => `
    <tr>
      <th>${escapeHtml(row.criteria)}</th>
      <td><strong>[${escapeHtml(row.official.badge)}]</strong> ${escapeHtml(row.official.text)}</td>
      <td>[${escapeHtml(row.snsScout.badge)}] ${escapeHtml(row.snsScout.text)}</td>
      <td>[${escapeHtml(row.portal.badge)}] ${escapeHtml(row.portal.text)}</td>
      <td>[${escapeHtml(row.network.badge)}] ${escapeHtml(row.network.text)}</td>
    </tr>
  `).join('');

  return `
    <header>
      <p>${escapeHtml(SITE_COMPARE_SEO.eyebrow)}</p>
      <p><a href="/">トップページ</a> ／ <a href="/compare">働き方・求人比較</a> ／ <a href="/job">仕事内容・求人案内</a></p>
    </header>

    <main>
      <article>
        <h1>${escapeHtml(SITE_COMPARE_SEO.h1)}</h1>
        ${SITE_COMPARE_SEO.heroLead.map((p) => `<p>${escapeHtml(p)}</p>`).join('')}

        <section id="industry-comparison">
          <h2>飛田新地と他業種の違いを比較</h2>
          <p>飛田新地とメンズエステ・ソープランド・デリヘル・キャバクラ・ラウンジの主な違いは、仕事内容・接客場所・1回の接客時間・報酬体系・勤務形態です。</p>
          <table border="1">
            <thead>
              <tr>
                <th>比較項目</th>
                ${INDUSTRY_COMPARE_COLUMNS.map((c) => `<th>${escapeHtml(c.label)}</th>`).join('')}
              </tr>
            </thead>
            <tbody>
              ${industryRowsHtml}
            </tbody>
          </table>
        </section>

        <section id="industry-details">
          <h2>業種ごとの仕事内容・働き方の違い</h2>
          ${INDUSTRY_DETAIL_CARDS.map((card) => `
            <div>
              <h3>${escapeHtml(card.heading)}</h3>
              <p>${escapeHtml(card.summary)}</p>
              ${card.ctaPath && card.ctaLabel ? `<p><a href="${escapeHtml(card.ctaPath)}">${escapeHtml(card.ctaLabel)}</a></p>` : ''}
            </div>
          `).join('')}
        </section>

        <section id="application-methods">
          <h2>飛田新地の求人はどこから応募する？応募方法・求人サイトを比較</h2>
          <p>公式求人サイト・SNSや個人スカウト・他社求人ポータル・紹介仲介型ネットワークの違いは、募集元の確認方法、応募窓口、報酬条件や仲介手数料の照合方法、個人情報の取り扱い方にあります。</p>
          <table border="1">
            <thead>
              <tr>
                <th>比較項目</th>
                ${APPLICATION_METHOD_COLUMNS.map((c) => `<th>${escapeHtml(c.label)}</th>`).join('')}
              </tr>
            </thead>
            <tbody>
              ${methodRowsHtml}
            </tbody>
          </table>
        </section>

        <section id="pre-apply-checklist">
          <h2>飛田新地の求人に応募する前に確認したいこと</h2>
          <ol>
            ${PRE_APPLY_CHECK_POINTS.map((pt) => `<li><strong>${escapeHtml(pt.title)}</strong>: ${escapeHtml(pt.description)}</li>`).join('')}
          </ol>
        </section>

        <section id="site-compare-faq">
          <h2>よくある質問</h2>
          <dl>
            ${SITE_COMPARE_FAQS.map((f) => `<dt>Q. ${escapeHtml(f.q)}</dt><dd>A. ${escapeHtml(f.a)}</dd>`).join('')}
          </dl>
        </section>

        <section id="related-guides">
          <h2>あわせて確認できる公式ガイド一覧</h2>
          <ul>
            ${SITE_COMPARE_INTERNAL_LINKS.map((l) => `<li><a href="${escapeHtml(l.path)}">${escapeHtml(l.label)}</a> — ${escapeHtml(l.desc)}</li>`).join('')}
          </ul>
        </section>

        <section id="site-compare-cta">
          <h2>当店で働くことを考えている方へ</h2>
          <p>仕事内容や給料、勤務条件について、応募前に確認したいことはありませんか？当店では、未経験の方も経験のある方も、仕事内容や働き方についてご相談いただけます。</p>
          <p><a href="/job">当店の求人情報を見る</a> ／ <a href="https://lin.ee/phFZoea">LINEで求人について相談する</a></p>
        </section>
      </article>
    </main>
  `;
}

function buildCompareNoscript(slug?: string): string {
  if (slug) {
    const item = COMPARE_SUBPAGE_MAP[slug];
    if (!item) {
      return `
        <header>
          <p>働き方・求人比較｜飛田ガールズ【公式】</p>
          <p><a href="/">トップページ</a> ／ <a href="/compare">働き方・求人比較一覧</a></p>
        </header>
        <main>
          <article>
            <h1>お探しのページが見つかりませんでした</h1>
            <p>指定されたURLは存在しないか移動した可能性があります。<a href="/compare">働き方・求人比較一覧</a>よりご希望の働き方をお選びください。</p>
          </article>
        </main>
      `;
    }

    const parentGroup = COMPARE_CATEGORY_GROUPS.find((g) => g.code === item.categoryCode);
    const sameGroupSiblings = COMPARE_SUBPAGES.filter(
      (s) => s.categoryCode === item.categoryCode && s.slug !== item.slug && !s.seoNoindex
    );
    const relatedSubpages = item.relatedCompareSlugs
      .map((rs) => COMPARE_SUBPAGE_MAP[rs])
      .filter((x): x is NonNullable<typeof x> => Boolean(x) && !x.seoNoindex);

    return `
      <header>
        <p>働き方・求人比較｜飛田ガールズ【公式】</p>
        <nav aria-label="パンくずリスト">
          <a href="/">トップページ</a> ＞ <a href="/compare">働き方・求人比較</a> ＞ <span>${escapeHtml(item.itemName)}</span>
        </nav>
      </header>

      <main>
        <article>
          <p>${escapeHtml(item.categoryTitle)}｜${escapeHtml(item.itemName)}</p>
          <h1>${escapeHtml(item.h1)}</h1>
          <p class="lead">${escapeHtml(item.heroLead)}</p>

          <section>
            <h2>このような女性に向けたページです</h2>
            <ul>
              ${item.targetPoints.map((pt) => `<li>${escapeHtml(pt)}</li>`).join('')}
            </ul>
          </section>

          <section>
            <h2>知っておきたい仕事内容・働き方</h2>
            <p>${escapeHtml(item.workstyle.lead)}</p>
            <ul>
              ${item.workstyle.points.map((pt) => `<li>${escapeHtml(pt)}</li>`).join('')}
            </ul>
            ${item.workstyle.note ? `<p>${escapeHtml(item.workstyle.note)}</p>` : ''}
          </section>

          <section>
            <h2>給料・報酬・勤務条件</h2>
            <p>${escapeHtml(item.salaryConditions.lead)}</p>
            <dl>
              ${item.salaryConditions.rows.map((row) => `<dt>${escapeHtml(row.label)}</dt><dd>${escapeHtml(row.value)}</dd>`).join('')}
            </dl>
            ${item.salaryConditions.formulaExample ? `<p><strong>計算の目安（例）:</strong> ${escapeHtml(item.salaryConditions.formulaExample)}</p>` : ''}
            <p>${escapeHtml(item.salaryConditions.disclaimer)}</p>
          </section>

          <section>
            <h2>応募前に確認しておきたいこと</h2>
            <ol>
              ${item.preCheckPoints.map((pt) => `<li>${escapeHtml(pt)}</li>`).join('')}
            </ol>
          </section>

          <section>
            <h2>よくある質問</h2>
            <dl>
              ${item.faqs.map((f) => `<dt>Q. ${escapeHtml(f.q)}</dt><dd>A. ${escapeHtml(f.a)}</dd>`).join('')}
            </dl>
          </section>

          <section>
            <h2>関連ページ</h2>
            ${relatedSubpages.length > 0 ? `
              <ul>
                ${relatedSubpages.map((rel) => `<li><a href="/compare/${escapeHtml(rel.slug)}">${escapeHtml(rel.itemName)}</a> — ${escapeHtml(rel.cardDescription)}</li>`).join('')}
              </ul>
            ` : ''}
            ${item.relatedSitePaths.length > 0 ? `
              <ul>
                ${item.relatedSitePaths.map((guide) => `<li><a href="${escapeHtml(guide.path)}">${escapeHtml(guide.label)}</a> — ${escapeHtml(guide.desc)}</li>`).join('')}
              </ul>
            ` : ''}
            ${sameGroupSiblings.length > 0 ? `
              <h3>同じカテゴリー（${escapeHtml(parentGroup?.title || item.categoryTitle)}）の働き方</h3>
              <ul>
                ${sameGroupSiblings.map((sib) => `<li><a href="/compare/${escapeHtml(sib.slug)}">${escapeHtml(sib.itemName)}：${escapeHtml(sib.cardDescription)}</a></li>`).join('')}
              </ul>
            ` : ''}
            <p><a href="/compare">働き方・求人比較トップへ戻る</a> ／ <a href="/faq">よくある質問を見る</a> ／ <a href="/site-compare">飛田新地求人サイト徹底比較を見る</a></p>
          </section>

          <section>
            <h2>${escapeHtml(COMPARE_LINE_CTA.heading)}</h2>
            <p>${escapeHtml(COMPARE_LINE_CTA.description)}</p>
            <p><a href="https://line.me">${escapeHtml(COMPARE_LINE_CTA.buttonLabel)}</a></p>
            <p>${escapeHtml(COMPARE_LINE_CTA.footnote)}</p>
          </section>
        </article>
      </main>
    `;
  }

  // Parent page: /compare
  return `
    <header>
      <p>働き方・求人比較｜飛田ガールズ【公式】</p>
      <p><a href="/">トップページ</a> ／ <a href="/site-compare">他業種・応募方法比較</a> ／ <a href="/faq">よくある質問</a></p>
    </header>

    <main>
      <article>
        <section id="compare-hero">
          <h1>${escapeHtml(COMPARE_PARENT_COPY.h1)}</h1>
          <p class="lead">${escapeHtml(COMPARE_PARENT_COPY.introLine1)}</p>
          <p>${escapeHtml(COMPARE_PARENT_COPY.introLine2)}</p>
          <p><strong>${escapeHtml(COMPARE_PARENT_COPY.keywords)}</strong></p>
          <p><a href="#categories-directory">${escapeHtml(COMPARE_PARENT_COPY.ctaLabel)}</a></p>
        </section>

        <section id="categories-directory">
          <h2>5つのカテゴリー・働き方・条件別から探す</h2>
          ${COMPARE_CATEGORY_GROUPS.map((group) => {
            const items = group.slugs
              .map((s) => COMPARE_SUBPAGE_MAP[s])
              .filter((it): it is NonNullable<typeof it> => Boolean(it));
            return `
            <section id="${escapeHtml(group.id)}">
              <h3>${escapeHtml(group.title)}</h3>
              <p>${escapeHtml(group.description)}</p>
              <ul>
                ${items.map((item) => `
                  <li>
                    <a href="/compare/${escapeHtml(item.slug)}"><strong>${escapeHtml(item.itemName)}</strong></a> — ${escapeHtml(item.cardDescription)}
                  </li>
                `).join('')}
              </ul>
            </section>
          `;
          }).join('')}
        </section>

        <section>
          <h2>他業種や応募方法の違いを比較したい方へ</h2>
          <p>飛田新地とソープ・デリヘル・キャバクラなどの他業種との違いや、料亭直営公式窓口とスカウト・他求人サイトの違いを確認できます。</p>
          <p><a href="/site-compare">他業種・応募方法の比較を見る</a> ／ <a href="/faq">よくある質問を見る</a></p>
        </section>

        <section>
          <h2>${escapeHtml(COMPARE_LINE_CTA.heading)}</h2>
          <p>${escapeHtml(COMPARE_LINE_CTA.description)}</p>
          <p><a href="https://line.me">${escapeHtml(COMPARE_LINE_CTA.buttonLabel)}</a></p>
          <p>${escapeHtml(COMPARE_LINE_CTA.footnote)}</p>
        </section>
      </article>
    </main>
  `;
}

function buildFaqNoscript(categorySlug?: string): string {
  const resolvedId = resolveFaq12Category(categorySlug);
  const cat = resolvedId ? FAQ_12_CATEGORIES.find(c => c.id === resolvedId) : undefined;

  if (cat) {
    const items = FAQ_100_LIST.filter(item => item.category12 === cat.id);
    const faqsHtml = items.map(item => `
      <dt>Q. ${escapeHtml(item.question)}</dt>
      <dd>A. ${escapeHtml(item.answer)}</dd>
    `).join('');

    const otherCatsHtml = FAQ_12_CATEGORIES.filter(c => c.id !== cat.id).map(c => `
      <li><a href="/faq/${c.slug}"><strong>${escapeHtml(c.number)}. ${escapeHtml(c.label)}</strong>（${escapeHtml(c.description)}）</a></li>
    `).join('');

    return `
      <header>
        <p>【${escapeHtml(cat.label)}】飛田新地のよくある質問（全${items.length}問）｜飛田ガールズ</p>
        <p><a href="/">トップページ（飛田ガールズ）</a> ／ 更新日：${escapeHtml(FAQ_LAST_UPDATED)} ／ 24時間LINE相談受付中</p>
      </header>
      <main>
        <article>
          <h1 id="faq-hero-heading">${escapeHtml(cat.seoHeading)}（全${items.length}問）</h1>
          <p id="faq-hero-lead" class="lead">${escapeHtml(cat.description)}。飛田新地料理組合加盟料亭の直営採用窓口スタッフが事実に基づき回答しています。</p>
          <section>
            <h2 id="faq-essential-heading">${escapeHtml(cat.seoHeading)}</h2>
            <dl>
              ${faqsHtml}
            </dl>
            <p><a href="${escapeHtml(cat.relatedUrl)}">${escapeHtml(cat.relatedLabel)}</a></p>
          </section>
          <section>
            <h2>その他のカテゴリー別質問一覧</h2>
            <ul>
              <li><a href="/faq">すべての質問（全${FAQ_100_LIST.length}問・12カテゴリー）を見る</a></li>
              ${otherCatsHtml}
            </ul>
          </section>
          <section>
            <h2>運営者情報・LINE相談窓口</h2>
            <p>運営：飛田ガールズ（飛田新地料理組合加盟料亭 直営公式採用窓口）／ 大阪府大阪市西成区山王 ／ 最終確認日：${escapeHtml(FAQ_LAST_UPDATED)}</p>
          </section>
        </article>
      </main>
    `;
  }

  // General FAQ page (/faq) - output all 12 categories and all 119 Q&As for full crawler/LLM visibility
  const categorySectionsHtml = FAQ_12_CATEGORIES.map(c => {
    const items = FAQ_100_LIST.filter(item => item.category12 === c.id);
    const itemsHtml = items.map(it => `
      <dt>Q. ${escapeHtml(it.question)}</dt>
      <dd>A. ${escapeHtml(it.answer)}</dd>
    `).join('');

    return `
      <section>
        <h2>${escapeHtml(c.number)}. ${escapeHtml(c.seoHeading)}（全${items.length}問）</h2>
        <p>${escapeHtml(c.description)} <a href="${escapeHtml(c.relatedUrl)}">${escapeHtml(c.relatedLabel)}</a></p>
        <dl>
          ${itemsHtml}
        </dl>
      </section>
    `;
  }).join('');

  return `
    <header>
      <p>飛田新地のよくある質問｜仕事内容・給料・応募条件をQ&amp;Aで解説｜飛田ガールズ</p>
      <p><a href="/">トップページ（飛田ガールズ）</a> ／ 全${FAQ_100_LIST.length}問・12カテゴリー整理 ／ 最終更新日：${escapeHtml(FAQ_LAST_UPDATED)}</p>
    </header>
    <main>
      <article>
        <h1 id="faq-hero-heading">飛田新地の疑問を、ここですべて解決。（全${FAQ_100_LIST.length}問）</h1>
        <p id="faq-hero-lead" class="lead">求人・応募条件・仕事内容・給料・働き方・身バレ対策まで。飛田新地で働く前に知っておきたい疑問をQ&amp;A形式で分かりやすくまとめました。</p>
        <section>
          <h2 id="faq-essential-heading">12カテゴリー一覧</h2>
          <ul>
            ${FAQ_12_CATEGORIES.map(c => `<li><a href="/faq/${c.slug}"><strong>${escapeHtml(c.number)}. ${escapeHtml(c.label)}</strong>：${escapeHtml(c.description)}</a></li>`).join('')}
          </ul>
        </section>
        ${categorySectionsHtml}
        <section>
          <h2>あわせて確認したい関連ガイド</h2>
          <ul>
            <li><a href="/job">仕事内容</a> / <a href="/salary">給料・待遇</a> / <a href="/beginner">未経験者向け</a> / <a href="/experienced">経験者・移籍</a></li>
            <li><a href="/requirements">応募資格・年齢</a> / <a href="/flow">面接・体験入店の流れ</a> / <a href="/workstyle">働き方・シフト</a> / <a href="/shops">お店選び</a></li>
            <li><a href="/dekasegi">寮・出稼ぎ</a> / <a href="/safety">身バレ・安全対策</a> / <a href="/about">飛田ガールズについて</a></li>
          </ul>
        </section>
        <section>
          <h2>運営者情報・更新日</h2>
          <p>運営：飛田ガールズ（飛田新地料理組合加盟料亭 直営公式採用窓口）／ 責任者：女性サポート統括担当 さくら・採用マネージャー 木村 ／ 所在地：大阪府大阪市西成区山王 ／ 最終確認日：${escapeHtml(FAQ_LAST_UPDATED)}</p>
        </section>
      </article>
    </main>
  `;
}

function buildGlossaryNoscript(): string {
  const termsHtml = GLOSSARY_TERMS.map(t => `
    <article id="${escapeHtml(t.id)}">
      <h3>${escapeHtml(t.term)}（${escapeHtml(t.reading)}）</h3>
      <p><strong>【概要】</strong> ${escapeHtml(t.summary)}</p>
      <p><strong>【解説】</strong> ${escapeHtml(t.detail)}</p>
      <p><strong>【求職者への安心アドバイス】</strong> ${escapeHtml(t.forJobSeekers)}</p>
    </article>
  `).join('\n');

  return `
    <header>
      <p>飛田新地 用語集・用語辞典｜上がり框・仲居・清拭・通り別の意味を徹底解説【公式】</p>
      <p><a href="/">トップページ（飛田ガールズ）</a> ／ 料亭直営公式採用ポータル</p>
    </header>
    <main>
      <article>
        <h1 id="glossary-hero-heading">飛田新地 用語集・用語辞典（専門用語・ルール・システム解説）</h1>
        <p id="glossary-lead" class="lead">飛田新地で働きたい女性のための公式用語集です。上がり框（あがりかまち）、仲居さん、清拭（シャワーなしルール）、メイン通り・青春通り・裏通りの違い、売上50%即日全額日払いシステムなど、知っておきたい専門用語とルールを分かりやすく解説しています。</p>

        <section>
          <h2>収録用語一覧（50音・カテゴリ順）</h2>
          <div id="glossary-terms-list">
            ${termsHtml}
          </div>
        </section>

        <section>
          <h2>料亭直営窓口（飛田ガールズ）へのご相談</h2>
          <p>疑問や不安な点がございましたら、24時間365日受付の公式LINEより女性スタッフへお気軽にお問い合わせください。</p>
        </section>
      </article>
    </main>
  `;
}

function buildAboutNoscript(): string {
  return `
    <header>
      <p>飛田ガールズについて｜運営者情報・料亭直営体制・安心の情報発信について【公式】</p>
      <p><a href="/">トップページ（飛田ガールズ）</a> ／ 24時間受付中・相談無料・完全秘密厳守</p>
    </header>
    <main>
      <article>
        <h1>飛田ガールズについて｜運営者情報・料亭直営体制・安心の情報発信について【公式】</h1>
        <p class="lead">飛田新地料理組合公認の老舗料亭直営公式採用窓口「飛田ガールズ」の店舗情報、創業歴、運営理念、女性スタッフによるサポート方針、安心の情報発信ポリシーをご紹介します。</p>

        <section>
          <h2>安心の実績と信頼</h2>
          <table border="1">
            <tbody>
              <tr><th>創業実績</th><td><strong>創業40余年</strong>（料理組合公認・老舗直営料亭）</td></tr>
              <tr><th>未経験スタート率</th><td><strong>90%以上</strong>（夜職初心者も即日安心の口頭事前説明完備）</td></tr>
              <tr><th>給与還元率</th><td><strong>完全50%ハーフバック</strong>（退勤時に即日全額現金日払い手渡し・天引きゼロ）</td></tr>
            </tbody>
          </table>
        </section>

        <section>
          <h2>女性ファーストを貫く3つの運営理念</h2>
          <h3>1. 徹底したプライバシー保護・写真掲載ゼロ</h3>
          <p>飛田新地は街全体で一般人の撮影が固く禁止されています。また、当店ではインターネット上・SNSへの写真掲載は一切行いません。勤務は完全源氏名、身分証の管理も厳格で、昼職OLの副業向けに住民税の普通徴収手続きもしっかり案内いたします。</p>

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
          <h2>安心の情報発信ポリシーと安全性保証</h2>
          <p>当サイトは外部の仲介業者・広告代理店を通さず、飛田新地料理組合公認の料亭直営スタッフが現場の採用基準と給与条件を正確に最新情報として発信しています。街全体での撮影禁止規約、お酒不要、写真ネット非掲載、完全源氏名、住民税普通徴収サポートを徹底し、女性の安全を最優先に保護しています。</p>
        </section>
      </article>
    </main>
  `;
}

function buildBlogIndexNoscript(articles: any[] = []): string {
  const validArticles = articles.filter((a: any) => a && a.slug && a.title && !a.seoNoindex);
  const byCategory = new Map<string, { label: string; items: any[] }>();
  for (const a of validArticles) {
    const key = a.category || 'general';
    const label = a.categoryLabel || 'お仕事コラム';
    if (!byCategory.has(key)) {
      byCategory.set(key, { label, items: [] });
    }
    byCategory.get(key)!.items.push(a);
  }

  const categorySections = Array.from(byCategory.entries())
    .map(([key, group]) => {
      const itemsHtml = group.items
        .map(
          (a: any) => `
    <li>
      <h3><a href="/blog/${escapeHtml(a.slug)}">${escapeHtml(a.title)}</a></h3>
      <p>${escapeHtml(a.summary || '')}</p>
    </li>`
        )
        .join('');
      return `
        <section id="blog-category-${escapeHtml(key)}">
          <h2>${escapeHtml(group.label)}（全${group.items.length}記事）</h2>
          <ul>${itemsHtml}</ul>
        </section>`;
    })
    .join('');

  return `
    <header>
      <p>飛田新地お仕事コラム・給与・面接ガイド一覧｜飛田ガールズ【公式】</p>
      <p><a href="/">トップページ（飛田ガールズ）</a> ／ 全${validArticles.length}記事 ／ 24時間受付中・相談無料・完全秘密厳守</p>
    </header>
    <main>
      <article>
        <h1>飛田新地お仕事コラム・給与・面接ガイド一覧（全${validArticles.length}記事）</h1>
        <p class="lead">飛田新地のお仕事、給料システム、面接・体入の流れ、寮生活、安全対策など、現場の女性スタッフによる役立つ最新コラム全${validArticles.length}記事の一覧です。</p>
        ${categorySections}
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

  const eyeCatchUrl = resolveFullImageUrl(article.eyeCatch);

  return `
    <header class="ssr-topbar">
      <div class="ssr-topbar-inner">
        <a href="/" class="ssr-brand">
          <img src="/favicon.png" alt="飛田ガールズ アイコン" class="ssr-logo-img" width="36" height="36" />
          <span class="ssr-brand-text">
            <strong>飛田ガールズ</strong>
            <small>Tobita Girls・料亭直営求人</small>
          </span>
        </a>
        <nav class="ssr-topnav" aria-label="主要メニュー">
          <a href="/">求人トップ</a>
          <a href="/blog">コラム一覧</a>
          <a href="/faq">よくある質問</a>
        </nav>
      </div>
    </header>
    <main class="ssr-below-fold ssr-blog-shell">
      <article>
        <div class="ssr-blog-eyecatch">
          <img src="${escapeHtml(eyeCatchUrl)}" alt="${escapeHtml(article.title)}" class="ssr-blog-img" width="768" height="288" />
        </div>
        <p class="meta">公開日: ${escapeHtml(article.publishedAt || '2026.07.01')} | 執筆: ${escapeHtml(article.author?.name || 'さくら')}（${escapeHtml(article.author?.role || '女性サポートスタッフ')}）</p>
        <h1>${escapeHtml(article.title)}</h1>
        <p class="summary ai-direct-summary">${escapeHtml(article.summary || '')}</p>
        ${bodyText}
        <section>
          <h2>飛田新地 料亭直営採用の募集要項</h2>
          <table border="1">
            <tbody>
              <tr><th>給与</th><td>完全歩合制・売上50%バック（即日全額日払い手渡し・雑費天引きなし）</td></tr>
              <tr><th>勤務時間</th><td>選べる5大勤務シフト（10:00〜17:00 / 10:00〜16:00 / 17:00〜24:00 / 14:00〜24:00 / 12:00〜24:00・週1日〜OK）</td></tr>
              <tr><th>応募資格</th><td>20歳以上の女性（未経験歓迎・経験不問 ※料理組合規約により20歳未満不可）</td></tr>
              <tr><th>待遇</th><td>衣装無料貸出・WEB顔写真非掲載・プライバシー配慮（※寮・交通費条件は事前確認）</td></tr>
            </tbody>
          </table>
        </section>
      </article>
    </main>
  `;
}

function buildTopicNoscript(topic: string): string {
  const clusterKey = topic === 'interview' ? 'flow' : topic === 'dekasegi' ? 'dorm' : topic;
  const cluster = TOPIC_CLUSTERS[clusterKey];

  if (!cluster) {
    return `
      <header><p>飛田ガールズ【公式】専門解説ガイド</p></header>
      <main><article><h1>飛田新地のお仕事ガイド【${escapeHtml(topic)}】</h1><p class="lead">飛田新地料亭直営公式採用窓口の解説ページです。</p></article></main>
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
      <p>飛田ガールズ【公式】専門解説ガイド</p>
      <p><a href="/">トップページ（飛田ガールズ）</a> ／ 24時間受付中・相談無料・完全秘密厳守</p>
    </header>

    <main>
      <article>
        <h1>${escapeHtml(cluster.seoTitle)}</h1>
        <p class="lead">${escapeHtml(cluster.tagline)}。${escapeHtml(cluster.metaDescription)}</p>

        <section id="points-section">
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

        <section id="details-section">
          <h2>詳しい解説</h2>
          <p>${escapeHtml(cluster.overview)}</p>
          ${sectionsHtml}
        </section>

        ${faqsHtml ? `
        <section id="faq-section">
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
          <p>24時間365日、専任の女性サポートスタッフが公式LINEで質問やご相談を受付中です。無理な勧誘や引き止めは一切ありませんので、お気軽にお問い合わせください。</p>
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
  let isNoindex = false;
  let prerenderContent = '';
  let customJsonLd: string | null = null;
  let customNoscript: string | null = null;

  const cleanPath = reqUrl.split('?')[0].split('#')[0];

  const LEGACY_URL_REDIRECTS: Record<string, string> = {
    '/blog/tobitashinchi-dormitory-lifestyle-support': '/blog/tobitashinchi-housing-support',
    '/blog/tobitashinchi-tax-declaration-guide': '/blog/tobitashinchi-tax-guide',
    '/blog/tobitashinchi-privacy-alibi-support': '/blog/tobitashinchi-identity-alibi-safety-measures',
    '/blog/tobitashinchi-physical-mental-care-guide': '/blog/tobitashinchi-stamina-mental-care-100k',
    '/blog/tobitashinchi-fake-job-scout-warning': '/blog/tobitashinchi-scout-fraud-avoidance-safe-recruitment',
    '/blog/tobitashinchi-daily-work-routine-guide': '/blog/tobitashinchi-daily-schedule-work-flow-detail',
    '/blog/tobitashinchi-id-requirements': '/blog/tobitashinchi-resident-record-requirement-checklist',
    '/blog/tobitashinchi-merits-and-demerits': '/blog/tobitashinchi-merit-demerit-honest',
    '/blog/tobitashinchi-shift-workstyle-guide': '/blog/flexible-shift-work-style-guide',
    '/blog/tobitashinchi-safety-rules-faq': '/blog/tobita-safe-recruitment',
    '/blog/tobitashinchi-main-vs-seishun-street': '/blog/tobita-street-compare',
    '/blog/tobitashinchi-salary-system-breakdown': '/blog/tobitashinchi-official-salary-formula-breakdown',
    '/comparison': '/compare',
    '/target-categories': '/compare',
    '/target-jobs': '/compare',
    '/categories': '/compare',
    '/company': '/about',
    '/dorm': '/dekasegi',
    '/compare/inexperienced': '/compare/beginner',
    '/compare/weekly-1': '/compare/one-day-week',
    '/compare/dormitory': '/compare/short-term',
    '/compare/double-work': '/compare/office-worker',
    '/compare/age-20s': '/compare/20s',
    '/compare/age-30s': '/compare/30s',
    '/compare/age-40s': '/compare/40s',
  };

  const cleanReqPath = cleanPath.replace(/\/+$/, '').replace(/\.html$/i, '') || '/';
  if (LEGACY_URL_REDIRECTS[cleanReqPath] || LEGACY_URL_REDIRECTS[cleanPath]) {
    const dest = LEGACY_URL_REDIRECTS[cleanReqPath] || LEGACY_URL_REDIRECTS[cleanPath];
    canonicalUrl = `https://tobitashinchi-recruit.com${dest}`;
    title = 'ページ移動のお知らせ｜飛田ガールズ【公式】';
    description = '指定されたページは移転・統合されました。正規ページへ自動移動します。';
    status = 301;
    customNoscript = `<p>このページは移転しました。<a href="${canonicalUrl}">最新の公式ページ（${escapeHtml(canonicalUrl)}）はこちら</a></p>`;
  } else if (cleanPath.startsWith('/blog/')) {
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
          title = `${article.title}｜飛田ガールズ`;
          description = article.summary || description;
          canonicalUrl = `https://tobitashinchi-recruit.com/blog/${article.slug}`;
          if (article.seoNoindex) {
            isNoindex = true;
          }
          ogType = 'article';
          ogImageUrl = resolveFullImageUrl(article.eyeCatch);
          ogImageAlt = article.title;

          const articleUrl = `https://tobitashinchi-recruit.com/blog/${article.slug}`;
          const combinedTextForGraph = [
            article.title,
            article.summary,
            ...(article.tags || []),
            ...(Array.isArray(article.content)
              ? article.content.map((b: any) => [b.text, b.question, b.answer, ...(b.items || [])].filter(Boolean).join(' '))
              : []),
          ].join(' ');
          const glossaryMentions = buildGlossaryMentions(combinedTextForGraph);
          const articleCitations = buildArticleCitations(combinedTextForGraph);
          const wordCount = calculateArticleWordCount(article.summary, article.content);
          const personAuthor = resolveAuthorPersonNode(article.author?.name, article.author?.role);

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
              "wordCount": wordCount,
              "datePublished": article.publishedAt ? article.publishedAt.replace(/\./g, '-') : '2026-07-01',
              "dateModified": article.updatedAt ? article.updatedAt.replace(/\./g, '-') : ((article.publishedAt && article.publishedAt.replace(/\./g, '-') > FAQ_LAST_UPDATED_ISO) ? article.publishedAt.replace(/\./g, '-') : FAQ_LAST_UPDATED_ISO),
              "articleSection": article.categoryLabel,
              "keywords": (article.tags || []).join(', '),
              "inLanguage": "ja-JP",
              "author": personAuthor,
              "reviewedBy": {
                "@type": "Organization",
                "@id": "https://tobitashinchi-recruit.com/#organization",
                "name": "飛田ガールズ 女性サポートスタッフ",
                "url": "https://tobitashinchi-recruit.com/about"
              },
              "publisher": {
                "@type": "Organization",
                "@id": "https://tobitashinchi-recruit.com/#organization",
                "name": "飛田ガールズ",
                "url": "https://tobitashinchi-recruit.com",
                "logo": {
                  "@type": "ImageObject",
                  "url": "https://tobitashinchi-recruit.com/icon.png"
                }
              },
              ...(glossaryMentions.length > 0 ? { "mentions": glossaryMentions, "about": glossaryMentions.slice(0, 3) } : {}),
              "citation": articleCitations,
              "speakable": {
                "@type": "SpeakableSpecification",
                "cssSelector": ["h1", ".ai-direct-summary", ".summary"]
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
                  "name": "飛田新地求人トップ",
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
    let blogArticlesList: any[] = [];
    try {
      const articlesFile = path.join(process.cwd(), 'data', 'blogArticles.json');
      if (fs.existsSync(articlesFile)) {
        const rawList = JSON.parse(fs.readFileSync(articlesFile, 'utf-8'));
        blogArticlesList = Array.isArray(rawList) ? rawList.filter((a: any) => a && !a.seoNoindex) : [];
      }
      customNoscript = buildBlogIndexNoscript(blogArticlesList);
    } catch (_e) {
      customNoscript = buildBlogIndexNoscript([]);
    }
    customJsonLd = JSON.stringify({
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'CollectionPage',
          '@id': 'https://tobitashinchi-recruit.com/blog#webpage',
          'url': 'https://tobitashinchi-recruit.com/blog',
          'name': title,
          'description': description,
          'dateModified': FAQ_LAST_UPDATED_ISO,
          'inLanguage': 'ja-JP',
          'isPartOf': {
            '@type': 'WebSite',
            '@id': 'https://tobitashinchi-recruit.com/#website',
            'name': '飛田ガールズ',
            'url': 'https://tobitashinchi-recruit.com/'
          },
          'publisher': {
            '@type': 'Organization',
            '@id': 'https://tobitashinchi-recruit.com/#organization',
            'name': '飛田ガールズ（料亭直営求人・女性採用サポート）',
            'url': 'https://tobitashinchi-recruit.com/'
          },
          'speakable': {
            '@type': 'SpeakableSpecification',
            'cssSelector': ['h1', 'main .lead', 'article h2']
          }
        },
        {
          '@type': 'BreadcrumbList',
          '@id': 'https://tobitashinchi-recruit.com/blog#breadcrumb',
          'itemListElement': [
            { '@type': 'ListItem', 'position': 1, 'name': '飛田新地求人トップ', 'item': 'https://tobitashinchi-recruit.com/' },
            { '@type': 'ListItem', 'position': 2, 'name': 'お仕事コラム', 'item': 'https://tobitashinchi-recruit.com/blog' }
          ]
        },
        {
          '@type': 'ItemList',
          '@id': 'https://tobitashinchi-recruit.com/blog#itemlist',
          'name': '飛田新地 お仕事コラム・解説記事一覧',
          'numberOfItems': blogArticlesList.length,
          'itemListElement': blogArticlesList
            .filter((a: any) => a && a.slug && a.title)
            .map((a: any, idx: number) => ({
              '@type': 'ListItem',
              'position': idx + 1,
              'name': a.title,
              'url': `https://tobitashinchi-recruit.com/blog/${a.slug}`,
              'description': a.summary || a.title
            }))
        }
      ]
    }, null, 2);
  } else if (cleanPath === '/glossary' || cleanPath === '/terms') {
    title = '飛田新地 用語集・用語辞典｜上がり框・仲居・清拭・通り別の意味を徹底解説【公式】';
    description = '飛田新地求人の専門用語辞典。上がり框、仲居さん、清拭（シャワーなしルール）、メイン通り・青春通り・裏通りの違い、給料計算（50%バック）など、働く前に知っておきたい用語を料亭直営スタッフが分かりやすく解説。';
    canonicalUrl = 'https://tobitashinchi-recruit.com/glossary';
    ogImageUrl = DEFAULT_IMAGE;
    ogImageAlt = '飛田新地 用語集・用語辞典';
    customNoscript = buildGlossaryNoscript();
    customJsonLd = JSON.stringify({
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'WebPage',
          '@id': 'https://tobitashinchi-recruit.com/glossary#webpage',
          'url': 'https://tobitashinchi-recruit.com/glossary',
          'name': title,
          'description': description,
          'dateModified': FAQ_LAST_UPDATED_ISO,
          'inLanguage': 'ja-JP',
          'isPartOf': {
            '@type': 'WebSite',
            '@id': 'https://tobitashinchi-recruit.com/#website',
            'name': '飛田ガールズ',
            'url': 'https://tobitashinchi-recruit.com/'
          },
          'publisher': {
            '@type': 'Organization',
            '@id': 'https://tobitashinchi-recruit.com/#organization',
            'name': '飛田ガールズ（料理組合公認 料亭直営採用窓口）',
            'url': 'https://tobitashinchi-recruit.com/'
          },
          'speakable': {
            '@type': 'SpeakableSpecification',
            'cssSelector': ['#glossary-hero-heading', '#glossary-lead', '#glossary-terms-list']
          }
        },
        {
          '@type': 'BreadcrumbList',
          '@id': 'https://tobitashinchi-recruit.com/glossary#breadcrumb',
          'itemListElement': [
            {
              '@type': 'ListItem',
              'position': 1,
              'name': '飛田新地求人トップ',
              'item': 'https://tobitashinchi-recruit.com/'
            },
            {
              '@type': 'ListItem',
              'position': 2,
              'name': '飛田新地 用語集・用語辞典',
              'item': 'https://tobitashinchi-recruit.com/glossary'
            }
          ]
        },
        {
          '@type': 'DefinedTermSet',
          '@id': 'https://tobitashinchi-recruit.com/glossary#definedtermset',
          'name': '飛田新地 用語集・用語辞典',
          'description': '飛田新地料亭求人に関する専門用語・ルール・システム・文化の公式定義集。',
          'url': 'https://tobitashinchi-recruit.com/glossary',
          'dateModified': FAQ_LAST_UPDATED_ISO,
          'isPartOf': {
            '@type': 'WebSite',
            '@id': 'https://tobitashinchi-recruit.com/#website',
            'name': '飛田ガールズ',
            'url': 'https://tobitashinchi-recruit.com/'
          },
          'hasDefinedTerm': GLOSSARY_TERMS.map(term => ({
            '@type': 'DefinedTerm',
            '@id': `https://tobitashinchi-recruit.com/glossary#${term.id}`,
            'name': term.term,
            'description': `${term.summary} ${term.detail}`,
            'inDefinedTermSet': 'https://tobitashinchi-recruit.com/glossary#definedtermset'
          }))
        }
      ]
    }, null, 2);
  } else if (cleanPath === '/about' || cleanPath === '/company') {
    title = '飛田ガールズについて｜運営者情報・料亭直営体制・安心の情報発信について【公式】';
    description = '飛田新地料理組合公認の老舗料亭直営公式求人「飛田ガールズ」の店舗情報、創業歴、運営体制、女性スタッフによるサポート方針、安心の情報発信ポリシーをご紹介します。';
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
          'name': '飛田ガールズについて｜運営者情報・料亭直営体制・安心の情報発信について【公式】',
          'description': '飛田新地料理組合公認の老舗料亭直営公式求人「飛田ガールズ」の店舗情報、創業歴、運営体制、女性スタッフによるサポート方針、安心の情報発信ポリシーをご紹介します。',
          'dateModified': FAQ_LAST_UPDATED_ISO,
          'inLanguage': 'ja-JP',
          'isPartOf': {
            '@type': 'WebSite',
            '@id': 'https://tobitashinchi-recruit.com/#website',
            'name': '飛田ガールズ',
            'url': 'https://tobitashinchi-recruit.com/'
          },
          'publisher': {
            '@id': 'https://tobitashinchi-recruit.com/#organization'
          },
          'speakable': {
            '@type': 'SpeakableSpecification',
            'cssSelector': ['h1', 'main', 'article']
          }
        },
        {
          '@type': 'Organization',
          '@id': 'https://tobitashinchi-recruit.com/#organization',
          'name': '飛田ガールズ（料理組合公認 料亭直営採用窓口）',
          'url': 'https://tobitashinchi-recruit.com/',
          'sameAs': OFFICIAL_SAME_AS_URLS,
          'publishingPrinciples': 'https://tobitashinchi-recruit.com/about',
          'logo': 'https://tobitashinchi-recruit.com/icon.png',
          'contactPoint': {
            '@type': 'ContactPoint',
            'contactType': 'customer support',
            'url': OFFICIAL_LINE_URL,
            'availableLanguage': ['Japanese']
          },
          'address': {
            '@type': 'PostalAddress',
            'streetAddress': '山王3丁目',
            'addressLocality': '大阪市西成区',
            'addressRegion': '大阪府',
            'postalCode': '557-0001',
            'addressCountry': 'JP'
          }
        },
        ...CANONICAL_AUTHORS.map((a) => ({
          '@type': 'Person',
          '@id': a.idUrl,
          'name': a.name,
          'jobTitle': a.jobTitle,
          'description': a.description,
          'url': 'https://tobitashinchi-recruit.com/about',
          'knowsAbout': a.knowsAbout,
          'worksFor': {
            '@id': 'https://tobitashinchi-recruit.com/#organization'
          }
        }))
      ]
    }, null, 2);
  } else if (cleanPath === '/site-compare' || cleanPath === '/site-compare/' || cleanPath === '/site-comparison' || cleanPath === '/site-comparison/') {
    title = SITE_COMPARE_SEO.title;
    description = SITE_COMPARE_SEO.description;
    canonicalUrl = SITE_COMPARE_SEO.canonicalUrl;
    ogImageUrl = DEFAULT_IMAGE;
    ogImageAlt = SITE_COMPARE_SEO.h1;
    customNoscript = buildSiteCompareNoscript();
    customJsonLd = JSON.stringify({
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'WebPage',
          '@id': 'https://tobitashinchi-recruit.com/site-compare#webpage',
          'url': 'https://tobitashinchi-recruit.com/site-compare',
          'name': title,
          'description': description,
          'dateModified': FAQ_LAST_UPDATED_ISO,
          'inLanguage': 'ja-JP',
          'isPartOf': {
            '@type': 'WebSite',
            '@id': 'https://tobitashinchi-recruit.com/#website',
            'name': '飛田ガールズ',
            'url': 'https://tobitashinchi-recruit.com/'
          },
          'publisher': {
            '@id': 'https://tobitashinchi-recruit.com/#organization'
          },
          'speakable': {
            '@type': 'SpeakableSpecification',
            'cssSelector': ['h1', '#industry-comparison', '#industry-details', '#application-methods', '#pre-apply-checklist']
          }
        },
        {
          '@type': 'BreadcrumbList',
          '@id': 'https://tobitashinchi-recruit.com/site-compare#breadcrumb',
          'itemListElement': [
            {
              '@type': 'ListItem',
              'position': 1,
              'name': 'トップページ',
              'item': 'https://tobitashinchi-recruit.com/'
            },
            {
              '@type': 'ListItem',
              'position': 2,
              'name': '業種・応募方法の比較',
              'item': 'https://tobitashinchi-recruit.com/site-compare'
            }
          ]
        },
        {
          '@type': 'Dataset',
          '@id': 'https://tobitashinchi-recruit.com/site-compare#dataset',
          'name': '飛田新地と他業種（メンズエステ・ソープ・デリヘル・キャバクラ）・応募方法比較データ',
          'description': '飛田新地（当店）とメンズエステ・ソープランド・デリヘル・キャバクラ／ラウンジの仕事内容・接客場所・接客時間・報酬体系・勤務形態の比較、ならびに公式求人サイト・SNS・個人スカウト・求人ポータル・仲介ネットワークの応募方法比較データ。',
          'url': 'https://tobitashinchi-recruit.com/site-compare',
          'dateModified': FAQ_LAST_UPDATED_ISO,
          'inLanguage': 'ja-JP',
          'isAccessibleForFree': true,
          'keywords': ['飛田新地 求人 比較', '飛田新地 メンズエステ 違い', '飛田新地 仕事内容', '飛田新地 応募方法', '飛田新地 求人サイト'],
          'creator': {
            '@type': 'Organization',
            '@id': 'https://tobitashinchi-recruit.com/#organization',
            'name': '飛田ガールズ（料亭直営公式採用窓口）',
            'url': 'https://tobitashinchi-recruit.com/'
          }
        },
        {
          '@type': 'FAQPage',
          '@id': 'https://tobitashinchi-recruit.com/site-compare#faq',
          'mainEntity': SITE_COMPARE_FAQS.map((f) => ({
            '@type': 'Question',
            'name': f.q,
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': f.a
            }
          }))
        }
      ]
    }, null, 2);
  } else if (cleanPath === '/compare' || cleanPath === '/compare/') {
    title = COMPARE_PARENT_COPY.seoTitle;
    description = COMPARE_PARENT_COPY.metaDescription;
    canonicalUrl = 'https://tobitashinchi-recruit.com/compare';
    ogImageUrl = DEFAULT_IMAGE;
    ogImageAlt = '飛田新地求人｜働き方・求人比較';
    customNoscript = buildCompareNoscript();
    customJsonLd = JSON.stringify({
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'WebPage',
          '@id': 'https://tobitashinchi-recruit.com/compare#webpage',
          'url': 'https://tobitashinchi-recruit.com/compare',
          'name': COMPARE_PARENT_COPY.seoTitle,
          'description': COMPARE_PARENT_COPY.metaDescription,
          'dateModified': FAQ_LAST_UPDATED_ISO,
          'inLanguage': 'ja-JP',
          'isPartOf': {
            '@type': 'WebSite',
            '@id': 'https://tobitashinchi-recruit.com/#website',
            'name': '飛田ガールズ',
            'url': 'https://tobitashinchi-recruit.com/'
          },
          'publisher': {
            '@type': 'Organization',
            '@id': 'https://tobitashinchi-recruit.com/#organization',
            'name': '飛田ガールズ（料亭直営求人・女性採用サポート）',
            'url': 'https://tobitashinchi-recruit.com/'
          },
          'speakable': {
            '@type': 'SpeakableSpecification',
            'cssSelector': ['h1', '#compare-hero', '#categories-directory']
          },
          'mainEntity': (() => {
            const indexableCompareSubpages = COMPARE_SUBPAGES.filter((item) => !item.seoNoindex);
            return {
              '@type': 'ItemList',
              'name': `働き方・希望別カテゴリー一覧（主要${indexableCompareSubpages.length}項目）`,
              'numberOfItems': indexableCompareSubpages.length,
              'itemListElement': indexableCompareSubpages.map((item, idx) => ({
                '@type': 'ListItem',
                'position': idx + 1,
                'name': item.itemName,
                'url': `https://tobitashinchi-recruit.com/compare/${item.slug}`
              }))
            };
          })()
        },
        {
          '@type': 'BreadcrumbList',
          '@id': 'https://tobitashinchi-recruit.com/compare#breadcrumb',
          'itemListElement': [
            {
              '@type': 'ListItem',
              'position': 1,
              'name': 'トップページ',
              'item': 'https://tobitashinchi-recruit.com/'
            },
            {
              '@type': 'ListItem',
              'position': 2,
              'name': '働き方・求人比較',
              'item': 'https://tobitashinchi-recruit.com/compare'
            }
          ]
        }
      ]
    }, null, 2);
  } else if (cleanPath.startsWith('/compare/')) {
    const slug = cleanPath.replace('/compare/', '').replace(/\/$/, '');
    const mappedLegacySlug = LEGACY_COMPARE_SLUG_REDIRECTS[slug];
    if (mappedLegacySlug) {
      canonicalUrl = `https://tobitashinchi-recruit.com/compare/${mappedLegacySlug}`;
      title = 'ページ移動のお知らせ｜飛田ガールズ【公式】';
      description = '指定されたページは新しい働き方別ページへ移転しました。';
      status = 301;
      customNoscript = `<p>このページは移転しました。<a href="${canonicalUrl}">最新の公式ページ（${escapeHtml(canonicalUrl)}）はこちら</a></p>`;
    } else {
      const item = COMPARE_SUBPAGE_MAP[slug];
      if (item) {
        if (item.seoNoindex) {
          isNoindex = true;
        }
        title = item.seoTitle;
        description = item.metaDescription;
        canonicalUrl = `https://tobitashinchi-recruit.com/compare/${item.slug}`;
        ogImageUrl = DEFAULT_IMAGE;
        ogImageAlt = `${item.itemName}｜飛田新地求人 飛田ガールズ`;
        customNoscript = buildCompareNoscript(item.slug);
        customJsonLd = JSON.stringify({
          '@context': 'https://schema.org',
          '@graph': [
            {
              '@type': 'WebPage',
              '@id': `https://tobitashinchi-recruit.com/compare/${item.slug}#webpage`,
              'url': `https://tobitashinchi-recruit.com/compare/${item.slug}`,
              'name': item.seoTitle,
              'description': item.metaDescription,
              'dateModified': FAQ_LAST_UPDATED_ISO,
              'inLanguage': 'ja-JP',
              'isPartOf': {
                '@type': 'WebSite',
                '@id': 'https://tobitashinchi-recruit.com/#website',
                'name': '飛田ガールズ',
                'url': 'https://tobitashinchi-recruit.com/'
              },
              'publisher': {
                '@type': 'Organization',
                '@id': 'https://tobitashinchi-recruit.com/#organization',
                'name': '飛田ガールズ（料亭直営求人・女性採用サポート）',
                'url': 'https://tobitashinchi-recruit.com/'
              },
              'speakable': {
                '@type': 'SpeakableSpecification',
                'cssSelector': ['h1', '.lead', 'section']
              }
            },
            {
              '@type': 'BreadcrumbList',
              '@id': `https://tobitashinchi-recruit.com/compare/${item.slug}#breadcrumb`,
              'itemListElement': [
                { '@type': 'ListItem', 'position': 1, 'name': 'トップページ', 'item': 'https://tobitashinchi-recruit.com/' },
                { '@type': 'ListItem', 'position': 2, 'name': '働き方・求人比較', 'item': 'https://tobitashinchi-recruit.com/compare' },
                { '@type': 'ListItem', 'position': 3, 'name': item.itemName, 'item': `https://tobitashinchi-recruit.com/compare/${item.slug}` }
              ]
            },
            {
              '@type': 'FAQPage',
              '@id': `https://tobitashinchi-recruit.com/compare/${item.slug}#faq`,
              'mainEntity': item.faqs.map((f) => ({
                '@type': 'Question',
                'name': f.q,
                'acceptedAnswer': {
                  '@type': 'Answer',
                  'text': f.a
                }
              }))
            }
          ]
        }, null, 2);
      } else {
        status = 404;
        title = 'ページが見つかりませんでした (404 Not Found)｜飛田新地求人 飛田ガールズ';
        description = 'お探しのページは存在しないか、移動した可能性があります。働き方・求人比較一覧からお探しください。';
        canonicalUrl = '';
        customNoscript = buildCompareNoscript(slug);
      }
    }
  } else if (cleanPath === '/faq' || cleanPath.startsWith('/faq/')) {
    const rawFaqCat = cleanPath.replace('/faq/', '').replace(/\/$/, '').replace('/faq', '');
    const faqCat = rawFaqCat || undefined;
    const resolvedId = resolveFaq12Category(faqCat);
    const catDef = resolvedId ? FAQ_12_CATEGORIES.find(c => c.id === resolvedId) : undefined;

    if (catDef) {
      const catQuestions = FAQ_100_LIST.filter(f => f.category12 === catDef.id);
      title = `【${catDef.label}】飛田新地のよくある質問（全${catQuestions.length}問）｜飛田ガールズ`;
      description = `${catDef.description}。飛田新地の働き方に関する「${catDef.label}」のよくある質問と回答をまとめました。`;
      canonicalUrl = `https://tobitashinchi-recruit.com/faq/${catDef.slug}`;
      customNoscript = buildFaqNoscript(catDef.slug);

      customJsonLd = JSON.stringify({
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'WebPage',
            '@id': `https://tobitashinchi-recruit.com/faq/${catDef.slug}#webpage`,
            'url': `https://tobitashinchi-recruit.com/faq/${catDef.slug}`,
            'name': title,
            'description': description,
            'dateModified': FAQ_LAST_UPDATED_ISO,
            'inLanguage': 'ja-JP',
            'isPartOf': {
              '@type': 'WebSite',
              '@id': 'https://tobitashinchi-recruit.com/#website',
              'name': '飛田ガールズ',
              'url': 'https://tobitashinchi-recruit.com/'
            },
            'publisher': {
              '@type': 'Organization',
              '@id': 'https://tobitashinchi-recruit.com/#organization',
              'name': '飛田ガールズ（料亭直営求人・女性採用サポート）',
              'url': 'https://tobitashinchi-recruit.com/'
            },
            'speakable': {
              '@type': 'SpeakableSpecification',
              'cssSelector': ['#faq-hero-heading', '#faq-hero-lead', '#faq-essential-heading']
            }
          },
          {
            '@type': 'BreadcrumbList',
            '@id': `https://tobitashinchi-recruit.com/faq/${catDef.slug}#breadcrumb`,
            'itemListElement': [
              { '@type': 'ListItem', 'position': 1, 'name': '飛田新地求人トップ', 'item': 'https://tobitashinchi-recruit.com/' },
              { '@type': 'ListItem', 'position': 2, 'name': 'よくある質問（FAQ）', 'item': 'https://tobitashinchi-recruit.com/faq' },
              { '@type': 'ListItem', 'position': 3, 'name': catDef.label, 'item': `https://tobitashinchi-recruit.com/faq/${catDef.slug}` }
            ]
          },
          {
            '@type': 'FAQPage',
            '@id': `https://tobitashinchi-recruit.com/faq/${catDef.slug}#faq`,
            'dateModified': FAQ_LAST_UPDATED_ISO,
            'publisher': {
              '@type': 'Organization',
              '@id': 'https://tobitashinchi-recruit.com/#organization',
              'name': '飛田ガールズ（料亭直営求人・女性採用サポート）'
            },
            'mainEntity': catQuestions.map(f => ({
              '@type': 'Question',
              'name': f.question,
              'acceptedAnswer': {
                '@type': 'Answer',
                'text': f.answer
              }
            }))
          }
        ]
      }, null, 2);
    } else {
      title = '飛田新地のよくある質問｜仕事内容・給料・応募条件をQ&Aで解説｜飛田ガールズ';
      description = '飛田新地で働く前に知っておきたい仕事内容・給料・応募条件・身バレ対策などの疑問をQ&A形式で分かりやすくまとめました。未経験・経験者どちらも確認できます。';
      canonicalUrl = 'https://tobitashinchi-recruit.com/faq';
      customNoscript = buildFaqNoscript();

      customJsonLd = JSON.stringify({
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'WebPage',
            '@id': 'https://tobitashinchi-recruit.com/faq#webpage',
            'url': 'https://tobitashinchi-recruit.com/faq',
            'name': title,
            'description': description,
            'dateModified': FAQ_LAST_UPDATED_ISO,
            'inLanguage': 'ja-JP',
            'isPartOf': {
              '@type': 'WebSite',
              '@id': 'https://tobitashinchi-recruit.com/#website',
              'name': '飛田ガールズ',
              'url': 'https://tobitashinchi-recruit.com/'
            },
            'publisher': {
              '@type': 'Organization',
              '@id': 'https://tobitashinchi-recruit.com/#organization',
              'name': '飛田ガールズ（料亭直営求人・女性採用サポート）',
              'url': 'https://tobitashinchi-recruit.com/'
            },
            'speakable': {
              '@type': 'SpeakableSpecification',
              'cssSelector': ['#faq-hero-heading', '#faq-hero-lead', '#faq-essential-heading']
            }
          },
          {
            '@type': 'BreadcrumbList',
            '@id': 'https://tobitashinchi-recruit.com/faq#breadcrumb',
            'itemListElement': [
              { '@type': 'ListItem', 'position': 1, 'name': '飛田新地求人トップ', 'item': 'https://tobitashinchi-recruit.com/' },
              { '@type': 'ListItem', 'position': 2, 'name': 'よくある質問（FAQ）', 'item': 'https://tobitashinchi-recruit.com/faq' }
            ]
          },
          {
            '@type': 'FAQPage',
            '@id': 'https://tobitashinchi-recruit.com/faq#faq',
            'dateModified': FAQ_LAST_UPDATED_ISO,
            'publisher': {
              '@type': 'Organization',
              '@id': 'https://tobitashinchi-recruit.com/#organization',
              'name': '飛田ガールズ（料亭直営求人・女性採用サポート）'
            },
            'mainEntity': FAQ_100_LIST.map(f => ({
              '@type': 'Question',
              'name': f.question,
              'acceptedAnswer': {
                '@type': 'Answer',
                'text': f.answer
              }
            }))
          }
        ]
      }, null, 2);
    }
    ogImageUrl = DEFAULT_IMAGE;
  } else {
    const rawTopic = cleanPath.replace(/^\//, '').replace(/\/$/, '');
    const topicKey = rawTopic === 'interview' ? 'flow' : rawTopic === 'dekasegi' ? 'dorm' : rawTopic;
    const cluster = TOPIC_CLUSTERS[topicKey];

    if (cluster) {
      title = cluster.seoTitle;
      description = cluster.metaDescription;
      canonicalUrl = `https://tobitashinchi-recruit.com${cluster.path}`;
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
          'dateModified': FAQ_LAST_UPDATED_ISO,
          'inLanguage': 'ja-JP',
          'isPartOf': {
            '@type': 'WebSite',
            '@id': 'https://tobitashinchi-recruit.com/#website',
            'name': '飛田ガールズ',
            'url': 'https://tobitashinchi-recruit.com/'
          },
          'publisher': {
            '@type': 'Organization',
            '@id': 'https://tobitashinchi-recruit.com/#organization',
            'name': '飛田ガールズ（料亭直営求人・女性採用サポート）',
            'url': 'https://tobitashinchi-recruit.com/'
          },
          'speakable': {
            '@type': 'SpeakableSpecification',
            'cssSelector': ['h1', '#points-section', '#details-section', '#faq-section']
          }
        },
        {
          '@type': 'BreadcrumbList',
          '@id': `https://tobitashinchi-recruit.com${cluster.path}#breadcrumb`,
          'itemListElement': [
            {
              '@type': 'ListItem',
              'position': 1,
              'name': '飛田新地求人トップ',
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

      if (topicKey === 'salary') {
        graphItems.push({
          '@type': 'WebApplication',
          '@id': 'https://tobitashinchi-recruit.com/salary#calculator',
          'name': '飛田新地 手取り給与リアルタイム計算シミュレーター',
          'applicationCategory': 'BusinessApplication',
          'operatingSystem': 'All',
          'offers': {
            '@type': 'Offer',
            'price': '0',
            'priceCurrency': 'JPY'
          }
        });
      }

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
    } else if (cleanPath === '/' || cleanPath === '') {
      title = DEFAULT_TITLE;
      description = DEFAULT_DESC;
      canonicalUrl = 'https://tobitashinchi-recruit.com/';
      ogImageUrl = DEFAULT_IMAGE;
      ogImageAlt = '飛田新地求人 飛田ガールズ';
      customNoscript = buildHomeNoscript();
      customJsonLd = buildHomeJsonLd();
    } else {
      status = 404;
      title = 'ページが見つかりませんでした (404 Not Found)｜飛田新地求人 飛田ガールズ';
      description = 'お探しのページは移動したか、削除された可能性があります。トップページまたは求人一覧からお探しください。';
      canonicalUrl = '';
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

  // Replace Canonical URL & Robots for 404, 301, and noindex articles
  if (status === 404) {
    if (/<meta\s+name=["']robots["'][^>]*>/i.test(html)) {
      html = html.replace(/<meta\s+name=["']robots["'][^>]*>/i, '<meta name="robots" content="noindex, nofollow" />');
    } else {
      html = html.replace(/<\/head>/i, '  <meta name="robots" content="noindex, nofollow" />\n</head>');
    }
    html = html.replace(/<link\s+rel=["']canonical["'][^>]*>/i, '');
  } else if (status === 301) {
    html = html.replace(/<\/head>/i, `  <meta http-equiv="refresh" content="0;url=${canonicalUrl}" />\n</head>`);
    if (/<link\s+rel=["']canonical["'][^>]*>/i.test(html)) {
      html = html.replace(/<link\s+rel=["']canonical["'][^>]*>/i, `<link rel="canonical" href="${canonicalUrl}" />`);
    } else {
      html = html.replace(/<\/head>/i, `  <link rel="canonical" href="${canonicalUrl}" />\n</head>`);
    }
  } else {
    if (isNoindex) {
      if (/<meta\s+name=["']robots["'][^>]*>/i.test(html)) {
        html = html.replace(/<meta\s+name=["']robots["'][^>]*>/i, '<meta name="robots" content="noindex, follow" />');
      } else {
        html = html.replace(/<\/head>/i, '  <meta name="robots" content="noindex, follow" />\n</head>');
      }
    }
    if (/<link\s+rel=["']canonical["'][^>]*>/i.test(html)) {
      html = html.replace(/<link\s+rel=["']canonical["'][^>]*>/i, `<link rel="canonical" href="${canonicalUrl}" />`);
    } else {
      html = html.replace(/<\/head>/i, `  <link rel="canonical" href="${canonicalUrl}" />\n</head>`);
    }
  }

  // LLMO Context Links for AI Crawlers
  if (canonicalUrl && !html.includes('title="AI Markdown View"')) {
    const mdDirectUrl = canonicalUrl === 'https://tobitashinchi-recruit.com/'
      ? 'https://tobitashinchi-recruit.com/index.md'
      : `${canonicalUrl.replace(/\/$/, '')}.md`;
    if (html.includes('href="/llms.txt"')) {
      html = html.replace(/<link rel="alternate" type="text\/markdown" href="\/llms\.txt"/i, `  <link rel="alternate" type="text/markdown" href="${mdDirectUrl}" title="AI Markdown View" />\n  <link rel="alternate" type="text/markdown" href="/llms.txt"`);
    } else {
      html = html.replace(/<\/head>/i, `  <link rel="alternate" type="text/markdown" href="${mdDirectUrl}" title="AI Markdown View" />\n  <link rel="alternate" type="text/markdown" href="/llms.txt" title="LLM Context" />\n  <link rel="alternate" type="text/markdown" href="/llms-full.txt" title="Full LLM Context" />\n</head>`);
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
    { regex: /<meta\s+name=["']thumbnail["'][^>]*>/i, tag: `<meta name="thumbnail" content="${escapeHtml(ogImageUrl)}" />` },
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
    if (/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>[\s\S]*?<\/script>/i.test(html)) {
      html = html.replace(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>[\s\S]*?<\/script>/i, `<script id="seo-jsonld" type="application/ld+json">\n${customJsonLd}\n</script>`);
    } else {
      html = html.replace(/<\/head>/i, `  <script id="seo-jsonld" type="application/ld+json">\n${customJsonLd}\n</script>\n</head>`);
    }
  }

  // Render visible semantic initial HTML directly inside #root with scoped critical brand CSS
  // (Matches React Header/Hero geometry above-the-fold so zero flash or oversized image shift occurs while keeping 100% crawler visibility)
  if (customNoscript) {
    const ssrCriticalCss = `<style id="ssr-shell-styles">
  html, body { margin: 0; background: #fffafb; color: #2c1a1e; font-family: "Noto Sans JP", "Plus Jakarta Sans", "Hiragino Sans", "Hiragino Kaku Gothic ProN", "Yu Gothic", sans-serif; -webkit-font-smoothing: antialiased; }
  [data-ssr-content="true"] { color: #2c1a1e; line-height: 1.7; font-size: 15px; min-height: 100vh; }
  [data-ssr-content="true"] .ssr-topbar,
  [data-ssr-content="true"] > header { position: fixed; top: 0; left: 0; width: 100%; z-index: 50; background: rgba(255, 255, 255, 0.95); border-bottom: 1px solid #ffe4e6; box-sizing: border-box; }
  [data-ssr-content="true"] > header:not(.ssr-topbar) { padding: 12px 20px; display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 6px 16px; }
  [data-ssr-content="true"] > header:not(.ssr-topbar) p { margin: 0; font-size: 13px; color: #5e474c; }
  [data-ssr-content="true"] > header:not(.ssr-topbar) p:first-child { font-weight: 800; color: #d2547b; font-size: 14px; }
  [data-ssr-content="true"] .ssr-topbar-inner { max-width: 1240px; margin: 0 auto; padding: 10px 16px; display: flex; align-items: center; justify-content: space-between; gap: 12px; }
  [data-ssr-content="true"] .ssr-brand { display: flex; align-items: center; gap: 10px; text-decoration: none; border-bottom: none !important; color: inherit; }
  [data-ssr-content="true"] .ssr-logo-img { display: block; width: 36px; height: 36px; border-radius: 9999px; object-fit: cover; flex-shrink: 0; border: 1px solid #fecdd3; margin: 0; }
  [data-ssr-content="true"] .ssr-brand-text { display: flex; flex-direction: column; line-height: 1.15; }
  [data-ssr-content="true"] .ssr-brand-text strong { font-size: 17px; font-weight: 900; color: #e11d48; letter-spacing: -0.01em; }
  [data-ssr-content="true"] .ssr-brand-text small { font-size: 10px; font-weight: 700; color: #be123c; letter-spacing: 0.04em; }
  [data-ssr-content="true"] .ssr-topnav { display: none; align-items: center; gap: 14px; font-size: 13px; font-weight: 700; }
  [data-ssr-content="true"] .ssr-topnav a { color: #27272a; text-decoration: none; border-bottom: none; padding: 6px 10px; border-radius: 10px; }
  [data-ssr-content="true"] .ssr-topnav a.ssr-nav-cta { background: linear-gradient(90deg, #ec4899, #f43f5e); color: #ffffff; border-radius: 9999px; padding: 7px 14px; font-size: 12px; }
  [data-ssr-content="true"] .ssr-hero { padding: 176px 24px 36px; background-color: #fffafb; background-image: radial-gradient(#fd80ac18 2px, transparent 2px); background-size: 30px 30px; text-align: center; }
  [data-ssr-content="true"] .ssr-hero-inner { max-width: 852px; margin: 0 auto; display: flex; flex-direction: column; align-items: center; }
  [data-ssr-content="true"] .ssr-hero-pill { display: inline-flex; align-items: center; gap: 8px; background: #ffe4e6; color: #d2547b; font-weight: 700; font-size: 12px; padding: 6px 16px; border-radius: 9999px; margin: 0 0 24px; box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05); }
  [data-ssr-content="true"] .ssr-hero-dot { width: 8px; height: 8px; border-radius: 9999px; background: #d2547b; display: inline-block; }
  [data-ssr-content="true"] .ssr-hero-h1 { font-size: 1.5rem; font-weight: 800; line-height: 1.25; margin: 0 0 24px; color: #2c1a1e; text-align: center; }
  [data-ssr-content="true"] .ssr-hero-h1 span { display: block; }
  [data-ssr-content="true"] .ssr-hero-h1 .ssr-hero-accent { color: #d2547b; }
  [data-ssr-content="true"] .ssr-hero-desc { max-width: 672px; margin: 0 auto 32px; font-size: 13px; color: #3f3f46; line-height: 1.7; text-align: center; }
  [data-ssr-content="true"] .ssr-hero-desc p { margin: 0 0 12px; color: #27272a; font-weight: 500; }
  [data-ssr-content="true"] .ssr-hero-questions { display: inline-flex; flex-direction: column; align-items: flex-start; gap: 4px; color: #d2547b !important; font-weight: 700 !important; margin: 4px auto 8px !important; }
  [data-ssr-content="true"] .ssr-hero-cta-line { color: #d2547b !important; font-weight: 800 !important; font-size: 15px; margin: 12px 0 0 !important; }
  [data-ssr-content="true"] .ssr-hero-visual { width: 100%; max-width: 852px; margin: 0 auto 24px; }
  [data-ssr-content="true"] .ssr-hero-card { position: relative; background: #ffffff; padding: 12px; border-radius: 28px; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.18); border: 1px solid rgba(255, 228, 230, 0.6); overflow: hidden; }
  [data-ssr-content="true"] .ssr-hero-img { display: block; width: 100%; height: auto; aspect-ratio: 16 / 9; object-fit: cover; border-radius: 20px; background: #f3f4f6; margin: 0; border: none; }
  [data-ssr-content="true"] .ssr-hero-stamp { position: absolute; bottom: 24px; right: 24px; background: rgba(255, 255, 255, 0.95); padding: 10px 14px; border-radius: 14px; box-shadow: 0 10px 25px rgba(0, 0, 0, 0.12); border: 1px solid #ffe4e6; display: flex; flex-direction: column; align-items: center; line-height: 1.2; }
  [data-ssr-content="true"] .ssr-hero-stamp span { font-size: 11px; font-weight: 800; color: #d2547b; }
  [data-ssr-content="true"] .ssr-hero-stamp strong { font-size: 14px; font-weight: 800; color: #a13762; }
  [data-ssr-content="true"] .ssr-hero-pickup { width: 100%; max-width: 852px; margin: 0 auto 24px; background: rgba(255, 255, 255, 0.92); border: 1px solid #ffe4e6; border-radius: 24px; padding: 20px; text-align: left; box-shadow: 0 4px 16px rgba(44, 26, 30, 0.05); box-sizing: border-box; }
  [data-ssr-content="true"] .ssr-hero-pickup h2 { font-size: 14px; font-weight: 800; color: #2c1a1e; margin: 0 0 12px; padding: 0; border-left: none; }
  [data-ssr-content="true"] .ssr-hero-pickup ol { margin: 0; padding: 0; list-style: none; display: flex; flex-direction: column; gap: 6px; }
  [data-ssr-content="true"] .ssr-hero-pickup li { margin: 0; }
  [data-ssr-content="true"] .ssr-hero-pickup a { display: block; padding: 8px 10px; border-radius: 10px; color: #2c1a1e; text-decoration: none; border-bottom: none; font-size: 13px; font-weight: 700; line-height: 1.45; }
  [data-ssr-content="true"] main { max-width: 900px; margin: 0 auto; padding: 88px 16px 56px; box-sizing: border-box; }
  [data-ssr-content="true"] main.ssr-below-fold { padding-top: 24px; }
  [data-ssr-content="true"] main.ssr-blog-shell { max-width: 768px; padding-top: 96px; }
  [data-ssr-content="true"] .ssr-blog-eyecatch { height: 224px; border-radius: 28px; overflow: hidden; background: #fff0f3; border: 1px solid #f3dce2; margin: 0 0 24px; }
  [data-ssr-content="true"] .ssr-blog-img { display: block; width: 100%; height: 100%; object-fit: cover; margin: 0; border: none; }
  [data-ssr-content="true"] main > article { background: #ffffff; border: 1px solid #f3dce2; border-radius: 24px; padding: 24px 20px; box-shadow: 0 4px 20px rgba(44, 26, 30, 0.04); }
  [data-ssr-content="true"] main:not(.ssr-below-fold) h1,
  [data-ssr-content="true"] main.ssr-blog-shell h1 { font-size: clamp(1.3rem, 2.6vw, 1.85rem); font-weight: 800; color: #2c1a1e; line-height: 1.4; margin: 0 0 14px; text-align: left; }
  [data-ssr-content="true"] h2 { font-size: 1.12rem; font-weight: 800; color: #2c1a1e; line-height: 1.45; margin: 26px 0 12px; padding: 2px 0 2px 12px; border-left: 4px solid #d2547b; }
  [data-ssr-content="true"] h3 { font-size: 1rem; font-weight: 700; color: #2c1a1e; line-height: 1.5; margin: 16px 0 6px; }
  [data-ssr-content="true"] main p { margin: 0 0 14px; color: #4a3b40; }
  [data-ssr-content="true"] p.lead, [data-ssr-content="true"] p.summary { background: #fff5f8; border: 1px solid #f8d8e3; border-radius: 14px; padding: 14px 16px; color: #49313b; font-size: 14.5px; margin: 14px 0 20px; }
  [data-ssr-content="true"] p.meta { font-size: 12.5px; color: #857982; margin: 0 0 12px; }
  [data-ssr-content="true"] main img:not(.ssr-blog-img):not(.ssr-hero-img) { display: block; max-width: 100%; width: auto; height: auto; max-height: 288px; border-radius: 16px; margin: 16px auto; border: 1px solid #f3dce2; }
  [data-ssr-content="true"] main a { color: #d2547b; font-weight: 600; text-decoration: none; border-bottom: 1px solid rgba(210, 84, 123, 0.3); }
  [data-ssr-content="true"] ul, [data-ssr-content="true"] ol { margin: 10px 0 18px; padding-left: 22px; }
  [data-ssr-content="true"] ul { list-style: disc; }
  [data-ssr-content="true"] ol { list-style: decimal; }
  [data-ssr-content="true"] li { margin-bottom: 8px; color: #4a3b40; }
  [data-ssr-content="true"] table { width: 100%; border-collapse: collapse; margin: 14px 0 22px; font-size: 13.5px; border: 1px solid #f3dce2; border-radius: 12px; overflow: hidden; display: table; }
  [data-ssr-content="true"] th, [data-ssr-content="true"] td { border: 1px solid #f3dce2; padding: 10px 14px; text-align: left; vertical-align: top; }
  [data-ssr-content="true"] th { background: #fff0f4; color: #2c1a1e; font-weight: 700; width: 28%; }
  [data-ssr-content="true"] td { background: #ffffff; color: #4a3b40; }
  [data-ssr-content="true"] .ssr-trust-box { background: #fff5f8; border: 1px solid #ffe4e6; border-radius: 16px; padding: 16px 18px; margin: 16px 0 22px; }
  [data-ssr-content="true"] .ssr-trust-box h3 { margin: 0 0 8px; font-size: 1rem; color: #2c1a1e; }
  [data-ssr-content="true"] .ssr-trust-box p { margin: 0 0 8px; font-size: 13.5px; }
  [data-ssr-content="true"] .ssr-trust-box p:last-child { margin-bottom: 0; }
  [data-ssr-content="true"] dl { margin: 12px 0 18px; }
  [data-ssr-content="true"] dt { font-weight: 700; color: #2c1a1e; margin: 14px 0 4px; padding-top: 10px; border-top: 1px dashed #f3dce2; }
  [data-ssr-content="true"] dt:first-child { border-top: none; padding-top: 0; }
  [data-ssr-content="true"] dd { margin: 0 0 10px; color: #5e474c; }
  [data-ssr-content="true"] blockquote { margin: 14px 0; padding: 12px 16px; background: #fff5f8; border-left: 4px solid #d2547b; border-radius: 8px; color: #49313b; }
  @media (min-width: 768px) {
    [data-ssr-content="true"] .ssr-hero { padding: 208px 24px 48px; }
    [data-ssr-content="true"] .ssr-hero-pill { font-size: 14px; }
    [data-ssr-content="true"] .ssr-hero-h1 { font-size: 3rem; }
    [data-ssr-content="true"] .ssr-hero-desc { font-size: 16px; }
    [data-ssr-content="true"] .ssr-hero-cta-line { font-size: 18px; }
    [data-ssr-content="true"] .ssr-hero-card { border-radius: 36px; }
    [data-ssr-content="true"] .ssr-hero-img { border-radius: 28px; }
    [data-ssr-content="true"] .ssr-hero-stamp { bottom: 32px; right: 32px; padding: 14px 18px; border-radius: 16px; }
    [data-ssr-content="true"] .ssr-hero-stamp span { font-size: 13px; }
    [data-ssr-content="true"] .ssr-hero-stamp strong { font-size: 20px; }
    [data-ssr-content="true"] .ssr-blog-eyecatch { height: 288px; }
    [data-ssr-content="true"] main > article { padding: 32px; }
  }
  @media (min-width: 1024px) {
    [data-ssr-content="true"] .ssr-topnav { display: flex; }
  }
</style>`;
    if (!html.includes('id="ssr-shell-styles"')) {
      html = html.replace(/<\/head>/i, `  ${ssrCriticalCss}\n</head>`);
    }
    const ssrShell = `<div id="root"><div data-ssr-content="true">\n${customNoscript}\n</div></div>`;
    if (/<div\s+id=["']root["']\s*><\/div>/i.test(html)) {
      html = html.replace(/<div\s+id=["']root["']\s*><\/div>/i, ssrShell);
      html = html.replace(/<noscript>[\s\S]*?<\/noscript>/i, '');
    } else if (/<noscript>[\s\S]*?<\/noscript>/i.test(html)) {
      html = html.replace(/<noscript>[\s\S]*?<\/noscript>/i, `<noscript>\n${customNoscript}\n</noscript>`);
    } else {
      html = html.replace(/<\/body>/i, `  <noscript>\n${customNoscript}\n</noscript>\n</body>`);
    }
  }

  // Inject optional extra pre-rendered content if provided
  if (prerenderContent) {
    html = html.replace(/<body([^>]*)>/i, `<body$1>\n${prerenderContent}`);
  }

  return { html, status };
}
