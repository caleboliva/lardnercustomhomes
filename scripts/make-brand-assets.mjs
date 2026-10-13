// Derives the "L" mark, the favicon and a light version of the logo from the supplied logo.
// Nothing is redrawn.
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

// The light logo is for use over photos: the same mark, with the black lettering turned white.
// Only the rows below the mark hold lettering, so only those are changed.
const { data, info } = await sharp(logo).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
const letteringStart = (mark.top + mark.height + 10) * info.width * info.channels;
for (let i = letteringStart; i < data.length; i += info.channels) {
  data[i] = data[i + 1] = data[i + 2] = 255;
}
await sharp(data, { raw: info }).webp({ quality: 90, alphaQuality: 100 }).toFile('src/assets/brand/lardner-custom-homes-logo-light.webp');

console.log('Wrote lardner-custom-homes-mark.png, lardner-custom-homes-logo-light.webp and favicon.png');
