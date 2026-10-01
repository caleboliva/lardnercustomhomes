// Derives the "L" mark and the favicon from the supplied logo. Nothing is redrawn.
import sharp from 'sharp';

const logo = 'src/assets/brand/lardner-custom-homes-logo.webp';
const mark = { left: 410, top: 34, width: 686, height: 872 };
const clear = { r: 0, g: 0, b: 0, alpha: 0 };

await sharp(logo).extract(mark).png().toFile('src/assets/brand/lardner-custom-homes-mark.png');

await sharp(logo)
  .extract(mark)
  .resize({ width: 180, height: 180, fit: 'contain', background: clear })
  .png()
  .toFile('public/favicon.png');

console.log('Wrote lardner-custom-homes-mark.png and favicon.png');
