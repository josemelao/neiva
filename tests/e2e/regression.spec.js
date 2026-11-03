// @ts-check
const { test, expect } = require('@playwright/test');

/**
 * Regressão: comportamentos que já funcionam hoje e não podem quebrar
 * durante a reestruturação de arquivos (Fase 0).
 */

test.describe('regressão — estrutura e navegação', () => {
  test('home carrega com título e seções principais', async ({ page }) => {
    const errors = [];
    page.on('pageerror', (e) => errors.push(e.message));
    page.on('console', (m) => {
      if (m.type() === 'error') errors.push(m.text());
    });

    await page.goto('/', { waitUntil: 'networkidle' });

    await expect(page).toHaveTitle(/Neiva Fernandes/);
    await expect(page.locator('h1')).toHaveCount(1);
    for (const id of ['atuacao', 'diferenciais', 'sobre', 'faq', 'contato']) {
      await expect(page.locator(`#${id}`)).toBeVisible();
    }
    expect(errors, 'erros de console/página').toEqual([]);
  });

  test('menu ancora nas seções', async ({ page, isMobile }) => {
    test.skip(isMobile, 'no mobile o menu é hambúrguer; coberto em "menu mobile"');
    await page.goto('/', { waitUntil: 'networkidle' });
    for (const href of ['#atuacao', '#diferenciais', '#sobre', '#faq', '#contato']) {
      await page.locator(`nav a[href="${href}"]`).click();
      await expect(page.locator(href)).toBeInViewport({ timeout: 5000 });
    }
  });

  test('não há rolagem horizontal em 360px', async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 800 });
    await page.goto('/', { waitUntil: 'networkidle' });
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - window.innerWidth
    );
    expect(overflow, 'px de overflow horizontal').toBeLessThanOrEqual(1);
  });
});

test.describe('regressão — componentes interativos', () => {
  test('FAQ abre, fecha e mantém aria-expanded coerente', async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' });
    const first = page.locator('.faq-q').first();
    await expect(first).toHaveAttribute('aria-expanded', 'false');

    await first.click();
    await expect(first).toHaveAttribute('aria-expanded', 'true');
    await expect(page.locator('.faq-item').first()).toHaveClass(/open/);

    const second = page.locator('.faq-q').nth(1);
    await second.click();
    await expect(second).toHaveAttribute('aria-expanded', 'true');
    await expect(first).toHaveAttribute('aria-expanded', 'false');
  });

  test('carrossel de depoimentos avança e volta', async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' });
    const dots = page.locator('.t-dots button');
    await expect(dots).toHaveCount(6);
    await expect(dots.nth(0)).toHaveAttribute('aria-selected', 'true');

    await page.locator('.t-next').click();
    await expect(dots.nth(1)).toHaveAttribute('aria-selected', 'true');

    await page.locator('.t-prev').click();
    await expect(dots.nth(0)).toHaveAttribute('aria-selected', 'true');
  });

  test('banner de cookies aparece, aceita e permanece aceito', async ({ page, context }) => {
    await context.clearCookies();
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await page.evaluate(() => localStorage.clear());
    await page.reload({ waitUntil: 'networkidle' });

    const banner = page.locator('#cookie-banner');
    await expect(banner).toHaveClass(/visible/, { timeout: 5000 });
    await page.locator('#cookie-accept').click();
    await expect(banner).not.toHaveClass(/visible/);

    await page.reload({ waitUntil: 'networkidle' });
    await expect(banner).not.toHaveClass(/visible/);
  });

  test('WhatsApp aponta para o número correto em todos os pontos', async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' });
    const links = page.locator('a[href*="wa.me"]');
    const count = await links.count();
    expect(count).toBeGreaterThanOrEqual(4);
    for (let i = 0; i < count; i++) {
      await expect(links.nth(i)).toHaveAttribute('href', /wa\.me\/5561981729598/);
    }
  });
});

test.describe('regressão — menu mobile', () => {
  test.use({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });

  test('hambúrguer abre, navega e fecha', async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' });
    const burger = page.locator('.hamburger');
    await expect(burger).toBeVisible();

    await burger.click();
    await expect(page.locator('nav')).toHaveClass(/nav-open/);

    await page.locator('nav a[href="#sobre"]').click();
    await expect(page.locator('nav')).not.toHaveClass(/nav-open/);
  });
});

test.describe('regressão — privacidade', () => {
  test('página de privacidade abre e volta para a home', async ({ page }) => {
    await page.goto('/privacidade.html', { waitUntil: 'networkidle' });
    await expect(page.locator('h1')).toContainText(/Privacidade/i);
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', /noindex/);
    await page.locator('a.voltar').click();
    await expect(page).toHaveURL(/index\.html$|\/$/);
  });
});
