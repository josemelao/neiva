// Gera assets/img/apple-touch-icon.png (180x180) a partir do favicon.svg.
// Rodar da raiz do repositório: node tests/tools/generate-icons.mjs
import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..', '..');
const svgPath = path.join(root, 'assets', 'img', 'favicon.svg');
const outPath = path.join(root, 'assets', 'img', 'apple-touch-icon.png');

const svg = fs.readFileSync(svgPath, 'utf8').replace(
  'viewBox="0 0 32 32"',
  'viewBox="0 0 32 32" width="180" height="180"'
);

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 180, height: 180 } });
await page.setContent(
  `<body style="margin:0;background:#1E4A3D">${svg}</body>`,
  { waitUntil: 'load' }
);
await page.screenshot({ path: outPath });
await browser.close();
console.log('gerado:', outPath, `(${fs.statSync(outPath).size} bytes)`);
