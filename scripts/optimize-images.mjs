// Optimizes source images into web formats (Constitution VI). Outputs are committed.
import { existsSync } from 'node:fs';
import { mkdir, stat, writeFile } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const SRC = 'src/assets/source';
const OUT = 'src/assets/images';
const PUB = 'public';
const OBSIDIAN = { r: 11, g: 10, b: 9, alpha: 1 };
const CLEAR = { r: 0, g: 0, b: 0, alpha: 0 };
const IVORY = [246, 243, 238];
// Monogram area (without the tagline) inside the original logo.
const MARK_CROP = { left: 140, top: 60, width: 700, height: 400 };

const raw = async (input) => sharp(input).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
const fromRaw = (data, info) =>
  sharp(data, { raw: { width: info.width, height: info.height, channels: 4 } });

async function removeWhite(input) {
  const { data, info } = await raw(input);
  for (let i = 0; i < data.length; i += 4) {
    const min = Math.min(data[i], data[i + 1], data[i + 2]);
    if (min >= 240) data[i + 3] = 0;
    else if (min >= 200) data[i + 3] = Math.round((data[i + 3] * (240 - min)) / 40);
  }
  const png = await fromRaw(data, info).png().toBuffer();
  return sharp(png).trim().png().toBuffer();
}

async function recolor(input, [r, g, b]) {
  const { data, info } = await raw(input);
  for (let i = 0; i < data.length; i += 4) {
    data[i] = r;
    data[i + 1] = g;
    data[i + 2] = b;
  }
  return fromRaw(data, info).png().toBuffer();
}

async function emit(input, outBase, { widths, formats, palette = false }) {
  await mkdir(path.dirname(outBase), { recursive: true });
  for (const width of widths) {
    const suffix = widths.length > 1 ? `-${width}` : '';
    for (const format of formats) {
      const file = `${outBase}${suffix}.${format}`;
      let img = sharp(input).resize({ width });
      if (format === 'webp') img = img.webp({ quality: 80 });
      if (format === 'avif') img = img.avif({ quality: 55 });
      if (format === 'jpg')
        img = img.flatten({ background: OBSIDIAN }).jpeg({ quality: 78, mozjpeg: true });
      if (format === 'png') img = img.png({ compressionLevel: 9, palette });
      const info = await img.toFile(file);
      const { size } = await stat(file);
      console.log(`${file}  ${info.width}×${info.height}  ${(size / 1024).toFixed(1)} KB`);
    }
  }
}

async function square(mark, size, background) {
  const inner = Math.round(size * 0.8);
  const icon = await sharp(mark)
    .resize({ width: inner, height: inner, fit: 'contain', background: CLEAR })
    .toBuffer();
  return sharp({ create: { width: size, height: size, channels: 4, background } })
    .composite([{ input: icon, gravity: 'center' }])
    .png()
    .toBuffer();
}

// Brand
const logoSrc = `${SRC}/logo-ma-original.png`;
const gold = await removeWhite(logoSrc);
await emit(gold, `${OUT}/brand/logo-ma-gold`, {
  widths: [600],
  formats: ['webp', 'png'],
  palette: true,
});
await emit(await recolor(gold, IVORY), `${OUT}/brand/logo-ma-white`, {
  widths: [600],
  formats: ['webp', 'png'],
  palette: true,
});
const mark = await removeWhite(await sharp(logoSrc).extract(MARK_CROP).png().toBuffer());
await emit(mark, `${OUT}/brand/logo-ma-mark`, {
  widths: [192],
  formats: ['webp', 'png'],
  palette: true,
});

// Favicons
await writeFile(`${PUB}/favicon-32.png`, await square(mark, 32, CLEAR));
await writeFile(`${PUB}/apple-touch-icon.png`, await square(mark, 180, OBSIDIAN));
await writeFile(`${PUB}/icon-512.png`, await square(mark, 512, OBSIDIAN));

// Hero portrait (LCP image)
await emit(`${SRC}/hero-portrait.png`, `${OUT}/hero/hero-portrait`, {
  widths: [480, 800, 1200],
  formats: ['avif', 'webp', 'jpg'],
});

// Project visuals
for (const name of ['health', 'travel', 'architecture', 'card']) {
  const src = `${SRC}/project-${name}.png`;
  if (!existsSync(src)) throw new Error(`Missing ${src} (see T039)`);
  await emit(src, `${OUT}/projects/project-${name}`, { widths: [800], formats: ['webp', 'jpg'] });
}

// Profile photo (transparent PNG source)
await emit(`${SRC}/profile-suit-original.png`, `${OUT}/profile/profile-suit`, {
  widths: [600],
  formats: ['webp', 'png'],
});

// Social sharing image 1200×630
const text = Buffer.from(`<svg width="560" height="630" xmlns="http://www.w3.org/2000/svg">
  <text x="0" y="270" font-family="Georgia, serif" font-size="52" fill="#f7f4ee">Mostafa Abdel Fattah</text>
  <text x="0" y="335" font-family="Helvetica, Arial, sans-serif" font-size="26" letter-spacing="6" fill="#deb868">SENIOR iOS DEVELOPER</text>
  <text x="0" y="395" font-family="Helvetica, Arial, sans-serif" font-size="24" fill="#b8b0a2">Swift · SwiftUI · Flutter</text>
</svg>`);
await sharp({ create: { width: 1200, height: 630, channels: 4, background: OBSIDIAN } })
  .composite([
    { input: await sharp(gold).resize({ width: 440 }).toBuffer(), left: 80, top: 160 },
    { input: text, left: 600, top: 0 },
  ])
  .jpeg({ quality: 82, mozjpeg: true })
  .toFile(`${PUB}/og-image.jpg`);
console.log('public/og-image.jpg written');
