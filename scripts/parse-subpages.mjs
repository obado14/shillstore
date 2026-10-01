import fs from 'node:fs';
import path from 'node:path';

// 1. Inspect collection page
const colHtml = fs.readFileSync('docs/research/erigostore-co-id/pages/collection-all.html', 'utf-8');
const colTitle = colHtml.match(/<h1[^>]*>(.*?)<\/h1>/is)?.[1]?.replace(/<[^>]+>/g, '').trim();
console.log('Collection Title:', colTitle);

// 2. Inspect product page
const prodHtml = fs.readFileSync('docs/research/erigostore-co-id/pages/product-chino.html', 'utf-8');
const prodTitle = prodHtml.match(/<h1[^>]*class=["'][^"']*product__title[^"']*["'][^>]*>(.*?)<\/h1>/is)?.[1]?.replace(/<[^>]+>/g, '').trim();
const prodPrice = prodHtml.match(/class=["'][^"']*price-item--sale[^"']*["'][^>]*>(.*?)<\/span>/is)?.[1]?.replace(/<[^>]+>/g, '').trim();
console.log('Product Title:', prodTitle, 'Price:', prodPrice);

// Extract variants / sizes
const sizeMatches = [...prodHtml.matchAll(/<input[^>]+name=["']Size["'][^>]+value=["']([^"']+)["'][^>]*>/gi)].map(m => m[1]);
console.log('Sizes:', sizeMatches);

// 3. Inspect our-store page
const storeHtml = fs.readFileSync('docs/research/erigostore-co-id/pages/page-our-store.html', 'utf-8');
const storeHeadings = [...storeHtml.matchAll(/<h[2-4][^>]*>(.*?)<\/h[2-4]>/gis)].map(m => m[1].replace(/<[^>]+>/g, '').trim()).filter(Boolean);
console.log('Store Headings:', storeHeadings.slice(0, 10));

// 4. Inspect FAQ page
const faqHtml = fs.readFileSync('docs/research/erigostore-co-id/pages/page-faq.html', 'utf-8');
const faqHeadings = [...faqHtml.matchAll(/<summary[^>]*>(.*?)<\/summary>/gis)].map(m => m[1].replace(/<[^>]+>/g, '').trim()).filter(Boolean);
console.log('FAQ Accordions:', faqHeadings.slice(0, 10));
