import fs from 'node:fs';
import path from 'node:path';

// 1. Copy public assets folder to public/sites/shillstore
const srcAssetDir = path.resolve('public/sites/erigostore-co-id');
const destAssetDir = path.resolve('public/sites/shillstore');

function copyDirSync(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  const entries = fs.readdirSync(src, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDirSync(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

if (fs.existsSync(srcAssetDir)) {
  copyDirSync(srcAssetDir, destAssetDir);
  console.log('Copied assets to public/sites/shillstore');
}

// 2. Copy component folder to src/components/sites/shillstore
const srcCompDir = path.resolve('src/components/sites/erigostore-co-id');
const destCompDir = path.resolve('src/components/sites/shillstore');
if (fs.existsSync(srcCompDir)) {
  copyDirSync(srcCompDir, destCompDir);
  console.log('Copied components to src/components/sites/shillstore');
}

// 3. Copy src/types/erigo.ts to src/types/shill.ts
if (fs.existsSync('src/types/erigo.ts')) {
  fs.copyFileSync('src/types/erigo.ts', 'src/types/shill.ts');
  console.log('Copied src/types/erigo.ts to src/types/shill.ts');
}

// 4. Function to recursively find all files in a folder
function getFiles(dir, exts = ['.ts', '.tsx', '.css', '.mjs', '.json', '.md']) {
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

// 5. Replace ERIGO -> SHILL, Erigo -> Shill, erigo -> shill
const targetFiles = [
  ...getFiles('src'),
  'README.md'
];

let replacedCount = 0;
for (const file of targetFiles) {
  let content = fs.readFileSync(file, 'utf-8');
  let original = content;

  // Replace case-sensitively
  content = content.replaceAll('ERIGO', 'SHILL');
  content = content.replaceAll('Erigo', 'Shill');
  content = content.replaceAll('erigostore-co-id', 'shillstore');
  content = content.replaceAll('erigo', 'shill');

  if (content !== original) {
    fs.writeFileSync(file, content, 'utf-8');
    replacedCount++;
    console.log(`Updated ${file}`);
  }
}

console.log(`Rebranded ${replacedCount} files successfully!`);
