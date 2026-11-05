# Testes do site

Suíte end-to-end com Playwright. Cobre regressão funcional, acessibilidade
(axe) e comparação visual em desktop e mobile.

## Como rodar

```bash
cd tests
npm install                        # primeira vez
npx playwright install chromium    # primeira vez, se o navegador não estiver em cache
npm test
```

O `playwright.config.js` sobe um servidor estático (`python -m http.server 4173`)
na raiz do repositório automaticamente.

## Comandos

| Comando | O que faz |
|---|---|
| `npm test` | roda toda a suíte |
| `npx playwright test e2e/regression.spec.js` | só regressão funcional |
| `npx playwright test e2e/a11y.spec.js` | só acessibilidade |
| `npx playwright test e2e/visual.spec.js` | só comparação visual |
| `npx playwright test --update-snapshots` | **atualiza a baseline visual** (só quando a mudança for intencional) |
| `npm run report` | abre o relatório HTML da última execução |

## Estrutura

```
tests/
├── playwright.config.js
├── e2e/
│   ├── regression.spec.js        # navegação, FAQ, carrossel, cookies, menu, formulário
│   ├── a11y.spec.js              # axe (WCAG A/AA) nas duas páginas + foco de teclado
│   ├── visual.spec.js            # screenshots full-page (desktop + mobile)
│   └── visual.spec.js-snapshots/ # baseline de imagens (versionada)
├── tools/
│   ├── fetch-images.mjs          # baixa e redimensiona as fotos do Pexels
│   ├── generate-og-image.mjs     # gera assets/img/social/og-image.jpg
│   └── generate-icons.mjs        # gera favicon.svg e apple-touch-icon.png
└── package.json
```

## Regra de ouro

A baseline visual só muda quando a alteração de layout for **proposital**.
Se um teste visual falhar depois de uma refatoração, investigue a diferença
antes de rodar `--update-snapshots`.

O teste visual rola a página até o fim antes da captura para carregar as
imagens com `loading="lazy"`. Sem isso, as fotos abaixo da dobra saem em
branco no screenshot full-page.

## Notas

- Os testes rodam com `reducedMotion: 'reduce'`, o que desliga as animações
  de revelação e o zoom do hero — a captura fica determinística.
- Números grandes dos cards de diferenciais são decorativos (`aria-hidden`) e
  ficam fora da checagem de contraste do axe, conforme a isenção da WCAG 1.4.3
  para texto decorativo.
- Ferramentas em `tools/` exigem rede. Não fazem parte do site publicado.
