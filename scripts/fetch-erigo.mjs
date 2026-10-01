import fs from 'node:fs';
import path from 'node:path';

async function main() {
  const targetUrl = 'https://erigostore.co.id/';
  console.log(`Fetching ${targetUrl}...`);
  const res = await fetch(targetUrl, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
      'Accept-Language': 'id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7',
    }
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch: ${res.status} ${res.statusText}`);
  }

  const html = await res.text();
  console.log(`HTML received: ${html.length} characters`);

  const outDir = path.resolve('docs/research/erigostore-co-id/root');
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(path.join(outDir, 'source.html'), html, 'utf-8');
  console.log(`Saved source HTML to ${path.join(outDir, 'source.html')}`);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
