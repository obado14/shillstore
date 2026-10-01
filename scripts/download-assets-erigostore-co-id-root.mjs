import fs from 'node:fs';
import path from 'node:path';

const assets = [
  // Logos & Icons
  { name: 'logo-erigo-black.png', url: 'https://erigostore.co.id/cdn/shop/files/Erigo_Black.png?v=1748414988&width=600' },
  { name: 'logo-erigo-white.png', url: 'https://erigostore.co.id/cdn/shop/files/Erigo_White_Logo_3.png?v=1696303047&width=300' },
  { name: 'favicon-erigo.png', url: 'https://erigostore.co.id/cdn/shop/files/Logo_E.png?crop=center&height=32&v=1748415160&width=32' },
  { name: 'brand-pattern.png', url: 'https://erigostore.co.id/cdn/shop/files/Union_2.png?v=1723800345&width=1753' },
  { name: 'newsletter-bg.png', url: 'https://erigostore.co.id/cdn/shop/files/Sign_Up_copy_6.png?v=1724150689&width=1000' },
  
  // Hero Banners
  { name: 'hero-cargo-desktop.jpg', url: 'https://erigostore.co.id/cdn/shop/files/Desktop_Cargo.jpg?v=1748418395&width=2000' },
  { name: 'hero-cargo-mobile.jpg', url: 'https://erigostore.co.id/cdn/shop/files/Mobile_Cargo.jpg?v=1748418928&width=1000' },
  { name: 'hero-parka-desktop.jpg', url: 'https://erigostore.co.id/cdn/shop/files/Desktop_Parka.jpg?v=1748424368&width=2000' },
  { name: 'hero-parka-mobile.jpg', url: 'https://erigostore.co.id/cdn/shop/files/Mobile_Cargo_Parka.jpg?v=1748424378&width=1000' },
  { name: 'hero-chino-desktop.jpg', url: 'https://erigostore.co.id/cdn/shop/files/Desktop_Chino_Pants_Flexi_Fit.jpg?v=1748425020&width=2000' },
  { name: 'hero-chino-short-desktop.jpg', url: 'https://erigostore.co.id/cdn/shop/files/Desktop_Chino_Short_Flexi_Fit.jpg?v=1748425418&width=2000' },
  { name: 'hero-jogger-desktop.jpg', url: 'https://erigostore.co.id/cdn/shop/files/Desktop_Jogger_Pants_Flexi_Fit.jpg?v=1748425852&width=2000' },
  { name: 'hero-oxford-desktop.jpg', url: 'https://erigostore.co.id/cdn/shop/files/Desktop_-_Oxford.jpg?v=1746672912&width=2000' },
  { name: 'hero-tshirt-contrast.jpg', url: 'https://erigostore.co.id/cdn/shop/files/Desktop_-_Tshirt_Contrast.jpg?v=1746671988&width=2000' },
  { name: 'hero-relax-chino.jpg', url: 'https://erigostore.co.id/cdn/shop/files/Desktop_Relax_Chino_Pants_rev.jpg?v=1737700840&width=2000' },
  { name: 'hero-movease.jpg', url: 'https://erigostore.co.id/cdn/shop/files/Desktop_Movease_6dda4062-cc3d-4d26-89d8-f4de78a8a2ba.jpg?v=1748417289&width=2000' },

  // Collage Banners
  { name: 'collage-why-buy.jpg', url: 'https://erigostore.co.id/cdn/shop/files/Banner_Kelebihan_Beli_Di_Web_copy_dec41fd6-71c6-4775-97ef-5422b0bf18db.jpg?v=1748414739&width=600' },
  { name: 'collage-oxford.jpg', url: 'https://erigostore.co.id/cdn/shop/files/New_Arrival_-_Oxford.jpg?v=1746673684&width=600' },
  { name: 'collage-pickup.jpg', url: 'https://erigostore.co.id/cdn/shop/files/PickUp_in_Store_rev_2.jpg?v=1735886864&width=600' },

  // Multi Banners
  { name: 'multi-perfume.png', url: 'https://erigostore.co.id/cdn/shop/files/Perfume_85c1fb46-26ed-4477-a21a-6b3c74c38887.png?v=1725115161&width=1000' },
  { name: 'multi-accessories.png', url: 'https://erigostore.co.id/cdn/shop/files/Accessories_copy.png?v=1725115196&width=1200' },

  // Categories & Mega Menu
  { name: 'cat-atasan.png', url: 'https://erigostore.co.id/cdn/shop/files/Group_35.png?v=1725504470' },
  { name: 'cat-bawahan.png', url: 'https://erigostore.co.id/cdn/shop/files/Pants_b0711958-49cb-49da-a5d1-32eb8e2ffda7.png?v=1725504470' },
  { name: 'cat-aksesoris.png', url: 'https://erigostore.co.id/cdn/shop/files/a-cap.png?v=1725504470' },
  { name: 'mega-jkt48.jpg', url: 'https://erigostore.co.id/cdn/shop/files/BKT_-_JKT48_26cf46b2-43b2-4faa-b9f0-1b6e1bb9a415.jpg?v=1728982515' },
  { name: 'mega-msglow.jpg', url: 'https://erigostore.co.id/cdn/shop/files/BKT_-_MS_Glow.jpg?v=1728982743' },
  { name: 'mega-mpl.jpg', url: 'https://erigostore.co.id/cdn/shop/files/BKT_-_MPL_ddce5aff-6836-4afc-8684-9998292931cb.jpg?v=1728983137' },

  // Featured Products
  { name: 'prod-chino-sirius-black.jpg', url: 'https://erigostore.co.id/cdn/shop/files/COVER_CHINO-PANTS-SIRIUS-BLACK.jpg?v=1750318587&width=600' },
  { name: 'prod-short-shirt-daeio-olive.jpg', url: 'https://erigostore.co.id/cdn/shop/files/id-11134201-7rask-m5dzva3mtd3s9f.jpg?v=1750318807&width=600' },
  { name: 'prod-short-shirt-danvin-teracotta.jpg', url: 'https://erigostore.co.id/cdn/shop/files/id-11134201-7rasb-m5dzvdwf96ww66.jpg?v=1750318822&width=600' },
  { name: 'prod-short-shirt-dalwyn-brown.jpg', url: 'https://erigostore.co.id/cdn/shop/files/id-11134201-7rase-m5dzvdqlhod941.jpg?v=1750318823&width=600' },
  { name: 'prod-relax-chino-egan-khaky.jpg', url: 'https://erigostore.co.id/cdn/shop/files/COVER_RELAX-CHINO-PANTS-EGAN-KHAKY-05.jpg?v=1750318830&width=600' },
  { name: 'prod-relax-chino-elvin-mocca.jpg', url: 'https://erigostore.co.id/cdn/shop/files/COVER_RELAX-CHINO-PANTS-ELVIN-MOCCA-11.jpg?v=1750318834&width=600' },
  { name: 'prod-relax-chino-eldon-pebble.jpg', url: 'https://erigostore.co.id/cdn/shop/files/COVER_RELAX-CHINO-PANTS-ELDON-PEBBLE-09.jpg?v=1750318838&width=600' },
  { name: 'prod-relax-chino-errol-black.jpg', url: 'https://erigostore.co.id/cdn/shop/files/COVER_RELAX-CHINO-PANTS-ERROL-BLACK-07.jpg?v=1750318842&width=600' },
  { name: 'prod-relax-chino-erven-olive.jpg', url: 'https://erigostore.co.id/cdn/shop/files/COVER_RELAX-CHINO-PANTS-ERVEN-OLIVE-13.jpg?v=1750318847&width=600' },
  { name: 'prod-relax-chino-evgeni-oyster.jpg', url: 'https://erigostore.co.id/cdn/shop/files/COVER_RELAX-CHINO-PANTS-EVGENI-OYSTER-GREY-03.jpg?v=1750318853&width=600' },

  // Blog Images
  { name: 'blog-mpl.png', url: 'https://erigostore.co.id/cdn/shop/articles/Erigo_x_MPL_5.png?v=1724651922&width=600' },
  { name: 'blog-evos.jpg', url: 'https://erigostore.co.id/cdn/shop/articles/Erigo_x_Evos_3.jpg?v=1724649607&width=600' }
];

const destDir = path.resolve('public/sites/erigostore-co-id/root/images');
fs.mkdirSync(destDir, { recursive: true });

async function download(item) {
  const filePath = path.join(destDir, item.name);
  if (fs.existsSync(filePath) && fs.statSync(filePath).size > 100) {
    console.log(`Skipping already downloaded: ${item.name}`);
    return;
  }
  try {
    const res = await fetch(item.url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });
    if (!res.ok) {
      console.warn(`Failed ${item.name}: ${res.status}`);
      return;
    }
    const buffer = Buffer.from(await res.arrayBuffer());
    fs.writeFileSync(filePath, buffer);
    console.log(`Downloaded ${item.name} (${buffer.length} bytes)`);
  } catch (err) {
    console.error(`Error downloading ${item.name}:`, err.message);
  }
}

async function main() {
  console.log(`Downloading ${assets.length} assets in batches...`);
  const batchSize = 4;
  for (let i = 0; i < assets.length; i += batchSize) {
    const batch = assets.slice(i, i + batchSize);
    await Promise.all(batch.map(download));
  }
  console.log('All downloads completed!');
}

main();
