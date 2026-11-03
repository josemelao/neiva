// @ts-check
const { test, expect } = require('@playwright/test');

/**
 * Linha de base visual. Protege a Fase 0 (reestruturação de arquivos):
 * o layout deve permanecer idêntico byte a byte após extrair CSS/JS.
 *
 * reducedMotion: 'reduce' está ativo no projeto — isso desliga o hero
 * rotativo e as animações de revelação, tornando a captura determinística.
 */

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => {
    try {
      localStorage.setItem('nf_cookie_consent', 'aceito');
    } catch {
      /* storage indisponível */
    }
  });
});

test('home — captura completa', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  await page.evaluate(async () => {
    const imgs = Array.from(document.querySelectorAll('img'));
    await Promise.all(
      imgs.map((img) => (img.complete ? Promise.resolve() : new Promise((r) => {
        img.addEventListener('load', r, { once: true });
        img.addEventListener('error', r, { once: true });
      })))
    );
  });
  await expect(page).toHaveScreenshot('home-full.png', { fullPage: true });
});

test('privacidade — captura completa', async ({ page }) => {
  await page.goto('/privacidade.html', { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  await expect(page).toHaveScreenshot('privacidade-full.png', { fullPage: true });
});
