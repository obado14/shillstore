import fs from 'node:fs';
import path from 'node:path';

function findFiles(dir, exts = ['.ts', '.tsx', '.css', '.json']) {
  let results = [];
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      if (file !== 'node_modules' && file !== '.next' && file !== '.git') {
        results = results.concat(findFiles(fullPath, exts));
      }
    } else if (exts.includes(path.extname(file))) {
      results.push(fullPath);
    }
  }
  return results;
}

const files = findFiles('src');
console.log(`Found ${files.length} files in src:`);

let totalMatches = 0;
for (const f of files) {
  const content = fs.readFileSync(f, 'utf-8');
  const matches = content.match(/erigo/gi);
  if (matches) {
    console.log(`${f}: ${matches.length} matches`);
    totalMatches += matches.length;
  }
}
console.log(`Total erigo matches in src: ${totalMatches}`);
