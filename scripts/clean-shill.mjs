import fs from 'node:fs';
import path from 'node:path';

// 1. Copy src/data/erigo-data.ts to src/data/shill-data.ts
if (fs.existsSync('src/data/erigo-data.ts')) {
  fs.copyFileSync('src/data/erigo-data.ts', 'src/data/shill-data.ts');
  fs.unlinkSync('src/data/erigo-data.ts');
  console.log('Renamed src/data/erigo-data.ts to src/data/shill-data.ts');
}

// 2. Remove src/types/erigo.ts if src/types/shill.ts exists
if (fs.existsSync('src/types/shill.ts') && fs.existsSync('src/types/erigo.ts')) {
  fs.unlinkSync('src/types/erigo.ts');
  console.log('Removed src/types/erigo.ts');
}

// 3. Remove src/components/sites/erigostore-co-id
const oldCompDir = path.resolve('src/components/sites/erigostore-co-id');
if (fs.existsSync(oldCompDir)) {
  fs.rmSync(oldCompDir, { recursive: true, force: true });
  console.log('Removed old component directory');
}

// 4. Update any remaining references to erigo-data or erigo type
function getFiles(dir, exts = ['.ts', '.tsx']) {
  let files = [];
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      if (file !== 'node_modules' && file !== '.next' && file !== '.git') {
        files = files.concat(getFiles(fullPath, exts));
      }
    } else if (exts.includes(path.extname(file))) {
      files.push(fullPath);
    }
  }
  return files;
}

const allSrc = getFiles('src');
for (const file of allSrc) {
  let content = fs.readFileSync(file, 'utf-8');
  let original = content;

  content = content.replaceAll('@/data/erigo-data', '@/data/shill-data');
  content = content.replaceAll('@/types/erigo', '@/types/shill');
  content = content.replaceAll('/erigo-data', '/shill-data');
  content = content.replaceAll('/erigo', '/shill');

  if (content !== original) {
    fs.writeFileSync(file, content, 'utf-8');
    console.log(`Updated imports in ${file}`);
  }
}
console.log('Cleanup finished!');
