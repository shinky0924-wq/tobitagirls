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
