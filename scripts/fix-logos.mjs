import fs from 'node:fs';
import path from 'node:path';

const userLogo = 'C:/Users/USer/Downloads/1bbd00aa-3590-4fa2-9d43-5e97a2486efe.png';

if (!fs.existsSync(userLogo)) {
  console.error('User logo not found at', userLogo);
  process.exit(1);
}

const destinations = [
  'public/logo.png',
  'public/favicon.ico',
  'public/favicon.png',
  'public/sites/shillstore/root/images/logo.png',
  'public/sites/shillstore/root/images/logo-shill-black.png',
  'public/sites/shillstore/root/images/logo-shill-white.png',
  'public/sites/shillstore/root/images/favicon-shill.png',
  'public/sites/shillstore/root/images/favicon-erigo.png',
  'public/sites/shillstore/root/images/logo-erigo-black.png',
  'public/sites/shillstore/root/images/logo-erigo-white.png',
  'public/sites/erigostore-co-id/root/images/logo.png',
  'public/sites/erigostore-co-id/root/images/logo-shill-black.png',
  'public/sites/erigostore-co-id/root/images/logo-shill-white.png',
  'public/sites/erigostore-co-id/root/images/favicon-shill.png',
  'public/sites/erigostore-co-id/root/images/logo-erigo-black.png',
  'public/sites/erigostore-co-id/root/images/logo-erigo-white.png'
];

for (const dest of destinations) {
  const dir = path.dirname(dest);
  fs.mkdirSync(dir, { recursive: true });
  fs.copyFileSync(userLogo, dest);
  console.log(`Copied logo to ${dest}`);
}

console.log('All logo targets updated!');
