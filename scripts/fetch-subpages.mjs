import fs from 'node:fs';
import path from 'node:path';

const pagesToFetch = [
  { url: 'https://erigostore.co.id/collections/all-product', file: 'collection-all.html' },
  { url: 'https://erigostore.co.id/products/erigo-chino-pants-sirius-black-unisex', file: 'product-chino.html' },
  { url: 'https://erigostore.co.id/pages/our-store', file: 'page-our-store.html' },
  { url: 'https://erigostore.co.id/pages/about', file: 'page-about.html' },
  { url: 'https://erigostore.co.id/pages/faq', file: 'page-faq.html' },
  { url: 'https://erigostore.co.id/blogs/blogs/kolaborasi-erigo-x-mpl-indonesia', file: 'blog-mpl.html' }
];

const outDir = path.resolve('docs/research/erigostore-co-id/pages');
fs.mkdirSync(outDir, { recursive: true });

async function fetchPage(item) {
  console.log(`Fetching ${item.url}...`);
  try {
    const res = await fetch(item.url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Accept-Language': 'id-ID,id;q=0.9,en-US;q=0.8',
      }
    });
    if (!res.ok) {
      console.warn(`Failed ${item.url}: ${res.status}`);
      return;
    }
    const html = await res.text();
    fs.writeFileSync(path.join(outDir, item.file), html, 'utf-8');
    console.log(`Saved ${item.file} (${html.length} chars)`);
  } catch (err) {
    console.error(`Error ${item.url}:`, err.message);
  }
}

async function main() {
  for (const item of pagesToFetch) {
    await fetchPage(item);
  }
  console.log('All sample pages fetched!');
}

main();
