import fs from 'node:fs';

const html = fs.readFileSync('docs/research/erigostore-co-id/root/source.html', 'utf-8');
const regex = /href=["'](\/[^"'#\s?]+)["']/gi;
const links = new Set();

for (const match of html.matchAll(regex)) {
  const url = match[1];
  if (!url.startsWith('//') && !url.includes('.css') && !url.includes('.js') && !url.includes('/cdn/')) {
    links.add(url);
  }
}

const list = Array.from(links).sort();
console.log(`Found ${list.length} internal links:`);
console.log(list);
