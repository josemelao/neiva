// @ts-check
const { test, expect } = require('@playwright/test');
const AxeBuilder = require('@axe-core/playwright').default;

/**
 * Acessibilidade automatizada (axe) nas duas páginas.
 *
 * Os números grandes dos cards de diferenciais são decorativos (aria-hidden),
 * duplicam a ordem visual dos cards e por isso ficam fora da checagem de
 * contraste — a WCAG isenta texto decorativo (1.4.3).
 */
const DECORATIVO = '.dif-item .num';

async function analisar(page) {
  return new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
    .exclude(DECORATIVO)
    .analyze();
}

for (const url of ['/', '/privacidade.html']) {
  test(`sem violações WCAG A/AA em ${url}`, async ({ page }) => {
    await page.addInitScript(() => {
      try {
        localStorage.setItem('nf_cookie_consent', 'aceito');
      } catch {
        /* storage indisponível */
      }
    });
    await page.goto(url, { waitUntil: 'networkidle' });

    const resultado = await analisar(page);
    const resumo = resultado.violations.map(
      (v) => `[${v.impact}] ${v.id}: ${v.help} (${v.nodes.length} nó(s))`
    );
    expect(resumo).toEqual([]);
  });
}

test('foco de teclado fica visível nos primeiros elementos', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' });

  const vistos = [];
  for (let i = 0; i < 8; i++) {
    await page.keyboard.press('Tab');
    vistos.push(
      await page.evaluate(() => {
        const el = /** @type {HTMLElement} */ (document.activeElement);
        const estilo = getComputedStyle(el);
        return {
          el: `${el.tagName.toLowerCase()}${el.id ? '#' + el.id : ''}`,
          largura: parseFloat(estilo.outlineWidth),
          estilo: estilo.outlineStyle,
        };
      })
    );
  }

  expect(vistos.map((v) => v.el)).not.toContain('body');
  for (const v of vistos) {
    expect(v.estilo, `outline de ${v.el}`).not.toBe('none');
    expect(v.largura, `espessura do outline de ${v.el}`).toBeGreaterThanOrEqual(2);
  }
});
