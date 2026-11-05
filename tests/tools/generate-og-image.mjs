// Gera assets/img/social/og-image.jpg (1200x630) usado no preview de links.
// Rodar da raiz do repositório: node tests/tools/generate-og-image.mjs
import { chromium } from 'playwright';
import path from 'node:path';
import fs from 'node:fs';

const root = path.resolve(import.meta.dirname, '..', '..');
const out = path.join(root, 'assets', 'img', 'social', 'og-image.jpg');

const html = `<!DOCTYPE html>
<html lang="pt-BR"><head><meta charset="utf-8">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@600;700;800&family=Inter:wght@400;500&display=swap" rel="stylesheet">
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    width: 1200px; height: 630px; overflow: hidden;
    background: #1E4A3D; color: #FEFEFC;
    font-family: 'Inter', sans-serif;
    display: flex; flex-direction: column; justify-content: center;
    padding: 84px 96px; position: relative;
  }
  .glow {
    position: absolute; width: 760px; height: 760px; border-radius: 50%;
    right: -240px; top: -300px;
    background: radial-gradient(circle, rgba(79,175,147,.42) 0%, rgba(79,175,147,0) 70%);
  }
  .glow.two {
    width: 620px; height: 620px; right: auto; left: -260px; top: auto; bottom: -320px;
    background: radial-gradient(circle, rgba(0,180,190,.26) 0%, rgba(0,180,190,0) 70%);
  }
  .mark {
    width: 78px; height: 78px; margin-bottom: 42px;
    color: rgba(254,254,252,.92);
  }
  .mark svg { width: 100%; height: 100%; display: block; }
  h1 {
    font-family: 'Poppins', sans-serif; font-weight: 800; font-size: 68px;
    line-height: 1.06; letter-spacing: -.02em; margin-bottom: 26px; max-width: 900px;
  }
  .tag {
    font-size: 27px; color: #C9DED6; line-height: 1.4; max-width: 820px;
  }
  .meta {
    margin-top: 46px; font-size: 19px; color: #4FAF93; font-weight: 500;
    letter-spacing: .14em; text-transform: uppercase;
  }
  .bar {
    position: absolute; left: 0; bottom: 0; width: 100%; height: 12px;
    background: linear-gradient(90deg, #4FAF93 0%, #00B4BE 100%);
  }
</style></head>
<body>
  <div class="glow"></div><div class="glow two"></div>
  <div class="mark">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" fill="none" aria-hidden="true">
      <circle cx="20" cy="20" r="18.75" stroke="currentColor" stroke-width="1.5"/>
      <path d="M14 27.5V12.5L26 27.5V12.5" stroke="currentColor" stroke-width="2.6"
        stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  </div>
  <h1>Fisioterapia, estética e terapias integrativas</h1>
  <p class="tag">Avaliação individual e acompanhamento próximo.</p>
  <p class="meta">Clínica Neiva Fernandes · Brasília-DF</p>
  <div class="bar"></div>
</body></html>`;

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
await page.setContent(html, { waitUntil: 'networkidle' });
await page.evaluate(() => document.fonts.ready);
fs.mkdirSync(path.dirname(out), { recursive: true });
await page.screenshot({ path: out, type: 'jpeg', quality: 92 });
await browser.close();
console.log('gerado:', out, `(${fs.statSync(out).size} bytes)`);
