const fs = require('fs');
const https = require('https');
const path = require('path');

const fonts = [
  { name: 'manrope-var.woff2', url: 'https://cdn.jsdelivr.net/npm/@fontsource-variable/manrope/files/manrope-latin-wght-normal.woff2' },
  { name: 'inter-var.woff2', url: 'https://cdn.jsdelivr.net/npm/@fontsource-variable/inter/files/inter-latin-wght-normal.woff2' },
  { name: 'instrument-serif-italic.woff2', url: 'https://cdn.jsdelivr.net/npm/@fontsource/instrument-serif/files/instrument-serif-latin-400-italic.woff2' },
  { name: 'jetbrains-mono-var.woff2', url: 'https://cdn.jsdelivr.net/npm/@fontsource-variable/jetbrains-mono/files/jetbrains-mono-latin-wght-normal.woff2' }
];

const download = (url, dest) => {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, (response) => {
      response.pipe(file);
      file.on('finish', () => {
        file.close(resolve);
      });
    }).on('error', (err) => {
      fs.unlink(dest, () => reject(err));
    });
  });
};

(async () => {
  for (const font of fonts) {
    const dest = path.join(__dirname, 'app', 'fonts', font.name);
    console.log(`Downloading ${font.name}...`);
    await download(font.url, dest);
  }
  console.log('Done');
})();
