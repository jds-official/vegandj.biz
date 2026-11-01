// Builds the Open Graph card: public/images/og-card.jpg (1200x630), the hero
// photo cropped to the 1.91:1 shape social networks expect.
//
// Re-run after changing the hero photo, then commit the JPG:
//
//   node scripts/make-og-image.mjs
//
// Uses sharp, which Next.js already installs.
import sharp from 'sharp';

const WIDTH = 1200;
const HEIGHT = 630;

// Frame the DJ, the mirror and the decks: a full-width, 1.905:1 band of the
// 3:2 hero photo, starting a little below the top of the frame.
const photo = sharp('public/images/hero-dj-turntables.webp');
const { width: srcW } = await photo.metadata();
const cropH = Math.round((srcW * HEIGHT) / WIDTH);

await photo
  .extract({ left: 0, top: 330, width: srcW, height: cropH })
  .resize(WIDTH, HEIGHT)
  .jpeg({ quality: 82, mozjpeg: true })
  .toFile('public/images/og-card.jpg');

console.log('wrote public/images/og-card.jpg');
