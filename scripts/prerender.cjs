const { execSync } = require('child_process');
const path = require('path');

console.log('[prerender.cjs] Delegating to tsx scripts/prerender.ts...');
try {
  execSync('npx tsx ' + path.join(__dirname, 'prerender.ts'), { stdio: 'inherit' });
} catch (e) {
  console.error('[prerender.cjs] Prerender failed:', e);
  process.exit(1);
}
