// @ts-check
const { test, expect } = require('@playwright/test');

/**
 * Linha de base visual.
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

/**
 * Rola a página inteira para disparar o lazy loading e só então espera
 * todas as imagens terminarem de carregar. Sem isso, as fotos abaixo da
 * dobra aparecem em branco na captura fullPage.
 * @param {import('@playwright/test').Page} page
 */
async function carregarTudo(page) {
  await page.evaluate(() => document.fonts.ready);
  await page.evaluate(async () => {
    const passo = window.innerHeight * 0.8;
    for (let y = 0; y < document.body.scrollHeight; y += passo) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 100));
    }
    window.scrollTo(0, 0);
  });
  await page.evaluate(async () => {
    await Promise.all(
      Array.from(document.images).map((img) =>
        img.complete
          ? Promise.resolve()
          : new Promise((r) => {
            img.addEventListener('load', r, { once: true });
            img.addEventListener('error', r, { once: true });
          })
      )
    );
  });
  // Deixa o layout assentar depois do scroll de volta ao topo.
  await page.waitForTimeout(200);
}

test('home — captura completa', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' });
  await carregarTudo(page);
  await expect(page).toHaveScreenshot('home-full.png', { fullPage: true });
});

test('privacidade — captura completa', async ({ page }) => {
  await page.goto('/privacidade.html', { waitUntil: 'networkidle' });
  await carregarTudo(page);
  await expect(page).toHaveScreenshot('privacidade-full.png', { fullPage: true });
});
