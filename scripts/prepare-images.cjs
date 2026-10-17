const fs = require('fs');
const path = require('path');

const srcDir = path.join(process.cwd(), 'src', 'assets', 'images');
const pubImgDir = path.join(process.cwd(), 'public', 'images');
const pubAssetsImgDir = path.join(process.cwd(), 'public', 'assets', 'images');

[pubImgDir, pubAssetsImgDir].forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

if (fs.existsSync(srcDir)) {
  const files = fs.readdirSync(srcDir);
  for (const file of files) {
    const srcPath = path.join(srcDir, file);
    if (fs.statSync(srcPath).isFile()) {
      fs.copyFileSync(srcPath, path.join(pubImgDir, file));
      fs.copyFileSync(srcPath, path.join(pubAssetsImgDir, file));
    }
  }
  console.log(`[Prepare Images] Copied ${files.length} images from src/assets/images`);
}

// Sync public/assets/images to public/images
if (fs.existsSync(pubAssetsImgDir)) {
  const files = fs.readdirSync(pubAssetsImgDir);
  let count = 0;
  for (const file of files) {
    const dest = path.join(pubImgDir, file);
    if (!fs.existsSync(dest)) {
      fs.copyFileSync(path.join(pubAssetsImgDir, file), dest);
      count++;
    }
  }
  if (count > 0) console.log(`[Prepare Images] Mirrored ${count} images from public/assets/images to public/images`);
}

// Sync public/images to public/assets/images
if (fs.existsSync(pubImgDir)) {
  const files = fs.readdirSync(pubImgDir);
  let count = 0;
  for (const file of files) {
    const dest = path.join(pubAssetsImgDir, file);
    if (!fs.existsSync(dest)) {
      fs.copyFileSync(path.join(pubImgDir, file), dest);
      count++;
    }
  }
  if (count > 0) console.log(`[Prepare Images] Mirrored ${count} images from public/images to public/assets/images`);
}

// Automatically update siteContent.json lastUpdated to today's date in JST
try {
  const siteContentPath = path.join(process.cwd(), 'data', 'siteContent.json');
  if (fs.existsSync(siteContentPath)) {
    const siteContent = JSON.parse(fs.readFileSync(siteContentPath, 'utf-8'));
    const now = new Date();
    // UTC+9 (JST)
    const jstOffset = 9 * 60;
    const jstDate = new Date(now.getTime() + (jstOffset + now.getTimezoneOffset()) * 60000);
    const year = jstDate.getFullYear();
    const month = jstDate.getMonth() + 1;
    const day = jstDate.getDate();
    const formattedDate = `${year}年${month}月${day}日`;
    
    if (siteContent.lastUpdated !== formattedDate) {
      siteContent.lastUpdated = formattedDate;
      fs.writeFileSync(siteContentPath, JSON.stringify(siteContent, null, 2), 'utf-8');
      console.log(`[Update Lastmod] Updated siteContent.json lastUpdated to ${formattedDate}`);
    }
  }
} catch (err) {
  console.warn('[Update Lastmod] Failed to update siteContent.json lastUpdated:', err);
}
