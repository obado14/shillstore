import fs from 'node:fs';
import path from 'node:path';

const html = fs.readFileSync('docs/research/erigostore-co-id/root/source.html', 'utf-8');

const sectionIds = [
  'shopify-section-sections--25383411286329__header',
  'shopify-section-template--25383416234297__slideshow_mNtQtV',
  'shopify-section-template--25383416234297__exp_collage_banner_GgbaaN',
  'shopify-section-template--25383416234297__exp_social_media_Hz9rEy',
  'shopify-section-template--25383416234297__rich_text_pepyHt',
  'shopify-section-template--25383416234297__our_product_range_kFbrCy',
  'shopify-section-template--25383416234297__featured_collection_RzxJcM',
  'shopify-section-template--25383416234297__exp_blog_list_8ajK4y',
  'shopify-section-template--25383416234297__exp_multi_banner_CiHzfp',
  'shopify-section-sections--25383411220793__newsletter_XAVTwj',
  'shopify-section-sections--25383411220793__footer'
];

const outDir = path.resolve('docs/research/erigostore-co-id/root/sections');
fs.mkdirSync(outDir, { recursive: true });

for (let i = 0; i < sectionIds.length; i++) {
  const currentId = sectionIds[i];
  const nextId = sectionIds[i + 1];

  const startIdx = html.indexOf(`id="${currentId}"`);
  if (startIdx === -1) {
    console.log(`Could not find ${currentId}`);
    continue;
  }
  // Find start tag <
  const tagStart = html.lastIndexOf('<', startIdx);
  let endIdx = nextId ? html.indexOf(`id="${nextId}"`) : html.indexOf('</body>');
  if (endIdx !== -1 && nextId) {
    endIdx = html.lastIndexOf('<', endIdx);
  } else if (endIdx === -1) {
    endIdx = html.length;
  }

  const chunk = html.slice(tagStart, endIdx);
  const cleanName = currentId.replace('shopify-section-', '').replace(/--/g, '_').replace(/__/, '_');
  const filename = `${String(i + 1).padStart(2, '0')}_${cleanName}.html`;
  fs.writeFileSync(path.join(outDir, filename), chunk, 'utf-8');
  console.log(`Saved ${filename} (${chunk.length} characters)`);
}
