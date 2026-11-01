// Fallback only: crops low-res visuals from the design board (1024×682) and upscales them.
// Coordinates are estimates — open each output and adjust left/top/width/height if needed.
import sharp from 'sharp';

const BOARD = 'src/assets/source/design-board.jpg';
const CROPS = {
  'hero-portrait.png': { left: 300, top: 15, width: 205, height: 225, scale: 6 },
  'project-health.png': { left: 16, top: 568, width: 122, height: 70, scale: 7 },
  'project-travel.png': { left: 150, top: 568, width: 126, height: 70, scale: 7 },
  'project-architecture.png': { left: 288, top: 568, width: 126, height: 70, scale: 7 },
  'project-card.png': { left: 426, top: 568, width: 118, height: 70, scale: 7 },
};

for (const [name, { scale, ...box }] of Object.entries(CROPS)) {
  await sharp(BOARD)
    .extract(box)
    .resize({ width: box.width * scale, kernel: 'lanczos3' })
    .png()
    .toFile(`src/assets/source/${name}`);
  console.log(`fallback → src/assets/source/${name}`);
}
