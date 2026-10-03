// Draws the stand-in images used until real photos exist: a site plan of an open lot, and the same
// plan with a house footprint. Both use only the site palette. Run with: npm run placeholder-art
import { copyFileSync, mkdirSync } from 'node:fs';
import sharp from 'sharp';

const W = 1600;
const H = 1200;
const midnight = '#272757';
const champagne = '#F7E6CA';
const powder = '#B8E3E9';
const honeydew = '#F0FFF0';

// The parcel, slightly out of square like a real lot.
const lot = '360,170 1240,150 1270,890 330,910';

const grid = Array.from({ length: Math.ceil(W / 80) + 1 }, (_, i) => `<line x1="${i * 80}" y1="0" x2="${i * 80}" y2="${H}" />`)
  .concat(Array.from({ length: Math.ceil(H / 80) + 1 }, (_, i) => `<line x1="0" y1="${i * 80}" x2="${W}" y2="${i * 80}" />`))
  .join('');

const trees = [
  [430, 250, 70],
  [1150, 230, 85],
  [1190, 800, 60],
  [410, 830, 55],
]
  .map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${honeydew}" stroke="${midnight}" stroke-opacity="0.35" stroke-width="3" /><circle cx="${x}" cy="${y}" r="5" fill="${midnight}" fill-opacity="0.4" />`)
  .join('');

const house = `
  <g>
    <polygon points="560,330 1040,320 1050,700 570,710" fill="${honeydew}" stroke="${midnight}" stroke-width="5" />
    <line x1="565" y1="520" x2="1045" y2="510" stroke="${midnight}" stroke-width="3" />
    <line x1="560" y1="330" x2="700" y2="517" stroke="${midnight}" stroke-width="3" stroke-opacity="0.6" />
    <line x1="1040" y1="320" x2="900" y2="513" stroke="${midnight}" stroke-width="3" stroke-opacity="0.6" />
    <line x1="570" y1="710" x2="700" y2="517" stroke="${midnight}" stroke-width="3" stroke-opacity="0.6" />
    <line x1="1050" y1="700" x2="900" y2="513" stroke="${midnight}" stroke-width="3" stroke-opacity="0.6" />
    <rect x="760" y="700" width="140" height="190" fill="${powder}" fill-opacity="0.6" stroke="${midnight}" stroke-opacity="0.4" stroke-width="3" />
  </g>`;

function plan(withHouse) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <rect width="${W}" height="${H}" fill="${champagne}" />
  <g stroke="${midnight}" stroke-opacity="0.07" stroke-width="2">${grid}</g>
  <rect x="0" y="990" width="${W}" height="210" fill="${honeydew}" />
  <line x1="0" y1="990" x2="${W}" y2="990" stroke="${midnight}" stroke-opacity="0.25" stroke-width="3" />
  <line x1="0" y1="1095" x2="${W}" y2="1095" stroke="${midnight}" stroke-opacity="0.35" stroke-width="5" stroke-dasharray="48 36" />
  <polygon points="${lot}" fill="${powder}" fill-opacity="0.45" />
  <polygon points="420,230 1180,212 1205,830 392,848" fill="none" stroke="${midnight}" stroke-opacity="0.3" stroke-width="3" stroke-dasharray="10 12" />
  ${trees}
  ${withHouse ? house : ''}
  <polygon points="${lot}" fill="none" stroke="${midnight}" stroke-width="8" stroke-dasharray="34 18" stroke-linejoin="round" />
  ${[[360, 170], [1240, 150], [1270, 890], [330, 910]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="13" fill="${midnight}" />`).join('')}
  <g transform="translate(1440 170)" fill="${midnight}">
    <circle r="62" fill="none" stroke="${midnight}" stroke-width="4" />
    <polygon points="0,-48 18,22 0,8 -18,22" />
  </g>
</svg>`;
}

const site = 'src/assets/site';
mkdirSync(site, { recursive: true });
await sharp(Buffer.from(plan(false))).png({ compressionLevel: 9, palette: true }).toFile(`${site}/lot-plan.png`);
await sharp(Buffer.from(plan(true))).png({ compressionLevel: 9, palette: true }).toFile(`${site}/home-plan.png`);
console.log('Wrote lot-plan.png and home-plan.png');

// Each listing gets its own copy, so a real photo can later replace it in that listing's folder.
const copies = process.argv.slice(2);
for (const entry of copies) {
  const [slug, kind] = entry.split(':');
  mkdirSync(`src/assets/homes/${slug}`, { recursive: true });
  copyFileSync(`${site}/${kind === 'home' ? 'home-plan' : 'lot-plan'}.png`, `src/assets/homes/${slug}/${kind === 'home' ? 'home' : 'lot'}.png`);
  console.log(`  copied to homes/${slug}`);
}
