import fs from 'node:fs';

console.log('=== PRODUCT PAGE ===');
const prodHtml = fs.readFileSync('docs/research/erigostore-co-id/pages/product-chino.html', 'utf-8');
const titleMatches = [...prodHtml.matchAll(/<h1[^>]*>(.*?)<\/h1>/gis)].map(m => m[1].replace(/<[^>]+>/g, '').trim());
console.log('Product H1s:', titleMatches);

const mainProdMatch = prodHtml.match(/<section[^>]+id=["'][^"']*product[^"']*["'][^>]*>(.*?)<\/section>/is) 
  || prodHtml.match(/<section[^>]+class=["'][^"']*product[^"']*["'][^>]*>(.*?)<\/section>/is);
console.log('Product section found:', !!mainProdMatch);

console.log('=== COLLECTION PAGE ===');
const colHtml = fs.readFileSync('docs/research/erigostore-co-id/pages/collection-all.html', 'utf-8');
const colH1s = [...colHtml.matchAll(/<h1[^>]*>(.*?)<\/h1>/gis)].map(m => m[1].replace(/<[^>]+>/g, '').trim());
console.log('Collection H1s:', colH1s);

// Count products on collection page
const colProducts = [...colHtml.matchAll(/<h3[^>]+class=["'][^"']*card__heading[^"']*["'][^>]*>.*?<a[^>]*>(.*?)<\/a>/gis)]
  .map(m => m[1].replace(/<[^>]+>/g, '').trim());
console.log(`Collection page products count: ${colProducts.length}`);
console.log('Sample collection products:', colProducts.slice(0, 8));

console.log('=== OUR STORE PAGE ===');
const storeHtml = fs.readFileSync('docs/research/erigostore-co-id/pages/page-our-store.html', 'utf-8');
const mainStore = storeHtml.match(/<main[^>]*>(.*?)<\/main>/is);
if (mainStore) {
  const storeTexts = mainStore[1].replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  console.log('Store main text preview:', storeTexts.slice(0, 300));
}
