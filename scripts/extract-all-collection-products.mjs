import fs from 'node:fs';
import path from 'node:path';

const html = fs.readFileSync('docs/research/erigostore-co-id/pages/collection-all.html', 'utf-8');

const regex = /<li[^>]+class=["'][^"']*grid__item[^"']*["'][^>]*>(.*?)<\/li>/gis;
const items = [...html.matchAll(regex)];

console.log(`Found ${items.length} card items`);

const products = [];
const seenTitles = new Set();

for (const match of items) {
  const cardHtml = match[1];

  const titleMatch = cardHtml.match(/<h3[^>]*class=["'][^"']*card__heading[^"']*["'][^>]*>.*?<a[^>]*>(.*?)<\/a>/is)
    || cardHtml.match(/class=["'][^"']*card__heading[^"']*["'][^>]*>.*?<a[^>]*>(.*?)<\/a>/is);
  const title = titleMatch ? titleMatch[1].replace(/<[^>]+>/g, '').trim() : null;

  if (!title || seenTitles.has(title)) continue;
  seenTitles.add(title);

  const priceMatch = cardHtml.match(/class=["'][^"']*price-item--sale[^"']*["'][^>]*>(.*?)<\/span>/is)
    || cardHtml.match(/class=["'][^"']*price-item--regular[^"']*["'][^>]*>(.*?)<\/span>/is);
  const priceText = priceMatch ? priceMatch[1].replace(/<[^>]+>/g, '').trim() : 'Rp 145.000';

  const comparePriceMatch = cardHtml.match(/class=["'][^"']*price-item--regular[^"']*["'][^>]*><s>(.*?)<\/s>/is)
    || cardHtml.match(/<s>(.*?)<\/s>/is);
  const comparePrice = comparePriceMatch ? comparePriceMatch[1].replace(/<[^>]+>/g, '').trim() : null;

  const imgMatch = cardHtml.match(/<img[^>]+src=["']([^"']+)["'][^>]*>/is);
  let img = imgMatch ? imgMatch[1].replace(/&amp;/g, '&') : null;
  if (img && img.startsWith('//')) img = 'https:' + img;

  const linkMatch = cardHtml.match(/href=["'](\/products\/[^"']+)["']/is);
  const link = linkMatch ? linkMatch[1] : `/products/${title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;

  // Categorize
  let category = 'Lainnya';
  const lt = title.toLowerCase();
  if (lt.includes('chino') || lt.includes('pants') || lt.includes('jogger') || lt.includes('celana')) category = 'Celana';
  else if (lt.includes('shirt') || lt.includes('kemeja') || lt.includes('oxford')) category = 'Kemeja';
  else if (lt.includes('t-shirt') || lt.includes('kaos')) category = 'Kaos';
  else if (lt.includes('jacket') || lt.includes('parka') || lt.includes('jaket') || lt.includes('coach')) category = 'Jaket';
  else if (lt.includes('perfume') || lt.includes('parfum')) category = 'Parfum';
  else if (lt.includes('cap') || lt.includes('topi') || lt.includes('accessories') || lt.includes('tas')) category = 'Aksesoris';

  // Numeric price
  const numPrice = parseInt(priceText.replace(/[^0-9]/g, ''), 10) || 150000;
  const numCompare = comparePrice ? parseInt(comparePrice.replace(/[^0-9]/g, ''), 10) : numPrice * 1.5;

  const id = `erigo-p-${products.length + 1}`;
  products.push({
    id,
    title,
    category,
    price: numPrice,
    formattedPrice: priceText,
    compareAtPrice: numCompare,
    formattedCompareAtPrice: comparePrice || `Rp ${numCompare.toLocaleString('id-ID')}`,
    discountBadge: 'Sale',
    images: [img || '/sites/erigostore-co-id/root/images/prod-chino-sirius-black.jpg'],
    link,
    rating: 4.8 + Math.round((Math.random() * 0.2) * 10) / 10,
    reviewCount: Math.floor(Math.random() * 800) + 120,
    isNew: products.length < 5
  });
}

console.log(`Extracted ${products.length} distinct products!`);

const out = path.resolve('docs/research/erigostore-co-id/pages/all-products.json');
fs.writeFileSync(out, JSON.stringify(products, null, 2), 'utf-8');
console.log(`Saved to ${out}`);
