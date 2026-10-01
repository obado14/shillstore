import fs from 'node:fs';
import path from 'node:path';

const html = fs.readFileSync('docs/research/erigostore-co-id/root/source.html', 'utf-8');

// 1. Extract CSS variables & color schemes
console.log('--- Extracting CSS Variables ---');
const rootMatch = html.match(/:root\s*\{([^}]+)\}/s);
const rootVars = {};
if (rootMatch) {
  rootMatch[1].split(';').forEach(line => {
    const [k, v] = line.split(':').map(s => s?.trim());
    if (k && v && k.startsWith('--')) {
      rootVars[k] = v;
    }
  });
}

// 2. Extract Announcement bar
console.log('--- Extracting Announcement / Topbar ---');
const announcementMatch = html.match(/class=["'][^"']*announcement-bar[^"']*["'][^>]*>(.*?)<\/div>/gis);
const announcements = announcementMatch ? announcementMatch.map(m => m.replace(/<[^>]+>/g, '').trim()).filter(Boolean) : [];

// 3. Extract Slideshow / Hero
console.log('--- Extracting Slideshow ---');
const slideshowMatch = html.match(/id=["']shopify-section-template--25383416234297__slideshow_mNtQtV["'][^>]*>(.*?)<\/section>/s) 
  || html.match(/class=["'][^"']*slideshow[^"']*["'][^>]*>(.*?)<\/section>/s);

// Find all banner slides
const slideImages = [];
const bannerMatches = [...html.matchAll(/<div[^>]+class=["'][^"']*slideshow__media[^"']*["'][^>]*>.*?<img[^>]+src=["']([^"']+)["'][^>]*>/gis)];
bannerMatches.forEach(m => {
  let src = m[1].replace(/&amp;/g, '&');
  if (src.startsWith('//')) src = 'https:' + src;
  slideImages.push(src);
});

// Also search for general hero banners or responsive picture tags in slideshow
const pictureMatches = [...html.matchAll(/<picture[^>]*>.*?<\/picture>/gis)];

// 4. Extract Category Circles / Product Range
console.log('--- Extracting Category Circles / Range ---');
const categories = [];
const categorySectionMatch = html.match(/id=["']shopify-section-template--25383416234297__our_product_range_kFbrCy["'][^>]*>(.*?)<\/section>/s)
  || html.match(/id=["']shopify-section-template--25383416234297__exp_social_media_Hz9rEy["'][^>]*>(.*?)<\/section>/s);

// 5. Extract Products
console.log('--- Extracting Products ---');
const products = [];
// Find all product card blocks
const cardRegex = /<li[^>]+class=["'][^"']*grid__item[^"']*["'][^>]*>.*?<\/li>/gis;
const cardMatches = [...html.matchAll(cardRegex)];

for (const match of cardMatches) {
  const cardHtml = match[0];
  const titleMatch = cardHtml.match(/<h3[^>]*class=["'][^"']*card__heading[^"']*["'][^>]*>.*?<a[^>]*>(.*?)<\/a>/is)
    || cardHtml.match(/class=["'][^"']*card__heading[^"']*["'][^>]*>.*?<a[^>]*>(.*?)<\/a>/is);
  const title = titleMatch ? titleMatch[1].replace(/<[^>]+>/g, '').trim() : null;

  const priceMatch = cardHtml.match(/class=["'][^"']*price-item--sale[^"']*["'][^>]*>(.*?)<\/span>/is)
    || cardHtml.match(/class=["'][^"']*price-item--regular[^"']*["'][^>]*>(.*?)<\/span>/is)
    || cardHtml.match(/class=["'][^"']*price-item[^"']*["'][^>]*>(.*?)<\/span>/is);
  const price = priceMatch ? priceMatch[1].replace(/<[^>]+>/g, '').trim() : null;

  const comparePriceMatch = cardHtml.match(/class=["'][^"']*price-item--regular[^"']*["'][^>]*><s>(.*?)<\/s>/is)
    || cardHtml.match(/<s>(.*?)<\/s>/is);
  const comparePrice = comparePriceMatch ? comparePriceMatch[1].replace(/<[^>]+>/g, '').trim() : null;

  const imgMatch = cardHtml.match(/<img[^>]+src=["']([^"']+)["'][^>]*>/is);
  let img = imgMatch ? imgMatch[1].replace(/&amp;/g, '&') : null;
  if (img && img.startsWith('//')) img = 'https:' + img;

  const badgeMatch = cardHtml.match(/class=["'][^"']*badge[^"']*["'][^>]*>(.*?)<\/span>/is);
  const badge = badgeMatch ? badgeMatch[1].replace(/<[^>]+>/g, '').trim() : null;

  if (title) {
    products.push({
      title,
      price,
      comparePrice,
      img,
      badge
    });
  }
}

// 6. Extract Multi-Banners & Collage Banners
console.log('--- Extracting Collage & Multi-Banner ---');
const collageMatches = [...html.matchAll(/class=["'][^"']*collage__item[^"']*["'][^>]*>.*?<\/div>/gis)];

// Write extracted research summary to file
const researchData = {
  rootVars,
  announcements,
  slideImages,
  totalProductsExtracted: products.length,
  sampleProducts: products.slice(0, 10),
  allProducts: products
};

const outDir = path.resolve('docs/research/erigostore-co-id/root');
fs.writeFileSync(path.join(outDir, 'extracted-data.json'), JSON.stringify(researchData, null, 2), 'utf-8');
console.log(`Saved extracted data to ${path.join(outDir, 'extracted-data.json')}`);
