const fs = require('fs');
const path = require('path');

const jsonPath = path.resolve(__dirname, '../data/blogArticles.json');
const articles = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

console.log(`Loaded ${articles.length} articles from ${jsonPath}`);

const findings = [];

articles.forEach(art => {
  const artStr = JSON.stringify(art);
  const issues = [];

  // 1. Age check: must be 20+ years old. Any mention of 18 or 19 must state they are prohibited.
  if (artStr.includes('18歳') || artStr.includes('19歳')) {
    // check if it incorrectly allows 18 or 19
    const regex = /(18歳|19歳)(?!.*(禁止|不可|できない|できません|満20歳|20歳以上|NG))/;
    if (artStr.includes('18歳以上') || artStr.includes('18才以上')) {
      issues.push('Mentions 18歳以上/18才以上 (Must be 満20歳以上)');
    }
  }

  // 2. Identification: License only is prohibited; must have 本籍地記載の住民票 (or passport)
  if (artStr.includes('免許証のみでOK') || artStr.includes('免許証だけで働ける') || artStr.includes('保険証だけでOK') || artStr.includes('免許証だけで応募OK')) {
    issues.push('Says 免許証のみ/だけで働ける (Must require 本籍地記載の住民票)');
  }

  // 3. Voice calling out: girls calling out is prohibited (おばちゃん・仲居さんが代行)
  if (artStr.includes('女の子が声を出して呼び込み') || artStr.includes('女の子自身が積極的に声をかけて') || artStr.includes('通行人に声をかけて呼び込')) {
    issues.push('Says girl calls out / 声掛け (Girl voice calling is prohibited, 仲居さん代行)');
  }

  // 4. Practical training / video training (実技講習・ビデオ講習は一切なし。5〜10分の口頭のみ。実技講習は悪質セクハラ)
  if (artStr.includes('実技講習') || artStr.includes('実技研修') || artStr.includes('ビデオ講習') || artStr.includes('実践研修')) {
    if (!artStr.includes('一切ありません') && !artStr.includes('なし') && !artStr.includes('悪質') && !artStr.includes('セクハラ')) {
      issues.push('Mentions practical / video training without clarifying it is strictly prohibited / non-existent');
    }
  }

  // 5. Shower: Tobita has NO shower (シャワーなし。ホース洗体・ウェットティッシュ). Matsushima has shower.
  if ((artStr.includes('シャワーを浴び') || artStr.includes('シャワールーム') || artStr.includes('シャワー室')) && !artStr.includes('松島') && !artStr.includes('シャワーなし') && !artStr.includes('シャワーがない') && !artStr.includes('シャワー設備がない')) {
    issues.push('Mentions shower in Tobita (Tobita has NO shower; uses ホース洗体/ウェットティッシュ)');
  }

  // 6. Kiss / Raw: Kiss is prohibited, completely condom required
  if ((artStr.includes('キスOK') || artStr.includes('キスあり') || artStr.includes('ディープキス')) && !artStr.includes('禁止') && !artStr.includes('NG')) {
    issues.push('Mentions kiss allowed (Kiss is strictly NG)');
  }

  // 7. Salary calculation & back amounts:
  // (客料金 - 仲居1000円)/2. 15m: 5000, 20m: 7500, 30m: 10000, 45m: 15000, 60m: 20000.
  // Check if there are old inaccurate rates like 20分8,000円 or 15分4,500円 or 60分25,000円 for Tobita
  if (artStr.includes('20分8,000円') || artStr.includes('20分 8,000円') || artStr.includes('20分8000円') || artStr.includes('15分6,000円') || artStr.includes('15分 6,000円')) {
    issues.push('Inaccurate back amounts (Should be 15分: 5,000円, 20分: 7,500円, 30分: 10,000円, 60分: 20,000円)');
  }

  // 8. Scout: Scout is illegal under association rules; direct application only
  if (artStr.includes('スカウト経由がおすすめ') || artStr.includes('スカウトを通す')) {
    issues.push('Recommends scout (Scout is illegal, direct application only)');
  }

  if (issues.length > 0) {
    findings.push({ id: art.id, title: art.title, issues });
  }
});

console.log(`Total articles with flagged issues: ${findings.length}`);
findings.forEach(f => {
  console.log(`[ID ${f.id}] ${f.title}`);
  f.issues.forEach(i => console.log(`   - ${i}`));
});
