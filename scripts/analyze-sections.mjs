import fs from 'node:fs';
import path from 'node:path';

const html = fs.readFileSync('docs/research/erigostore-co-id/root/source.html', 'utf-8');

console.log('--- Headings ---');
const headings = [...html.matchAll(/<h[1-6][^>]*>(.*?)<\/h[1-6]>/gis)].map(m => m[1].replace(/<[^>]+>/g, '').trim()).filter(Boolean);
console.log(headings.slice(0, 30));

console.log('--- Section elements / IDs ---');
const sections = [...html.matchAll(/<(?:section|div)[^>]+id=["']([^"']+)["'][^>]*>/gi)].map(m => m[1]);
console.log(sections.filter(s => s.includes('shopify-section') || s.includes('section') || s.includes('banner') || s.includes('header') || s.includes('footer')));

console.log('--- Main navigation links ---');
const links = [...html.matchAll(/<a[^>]+href=["']([^"']+)["'][^>]*>(.*?)<\/a>/gis)]
  .map(m => ({ href: m[1], text: m[2].replace(/<[^>]+>/g, '').trim() }))
  .filter(l => l.text.length > 0 && l.text.length < 50 && !l.text.includes('\n'));
console.log(links.slice(0, 30));

console.log('--- Images ---');
const imgs = [...html.matchAll(/<img[^>]+src=["']([^"']+)["'][^>]*>/gi)].map(m => m[1]);
console.log(`Total images: ${imgs.length}`);
console.log(imgs.slice(0, 15));
