# Testes do site

Suíte end-to-end com Playwright. Cobre regressão funcional e comparação visual
(regressão de layout) em desktop e mobile.

## Como rodar

```bash
cd tests
npm install          # primeira vez
npx playwright install chromium   # primeira vez, se o navegador não estiver em cache
npm test
```

O `playwright.config.js` sobe um servidor estático (`python -m http.server 4173`)
na raiz do repositório automaticamente.

## Comandos

| Comando | O que faz |
|---|---|
| `npm test` | roda toda a suíte |
| `npx playwright test e2e/regression.spec.js` | só regressão funcional |
| `npx playwright test e2e/visual.spec.js` | só comparação visual |
| `npx playwright test --update-snapshots` | **atualiza a baseline visual** (use apenas quando a mudança de layout for intencional) |
| `npm run report` | abre o relatório HTML da última execução |

## Estrutura

```
tests/
├── playwright.config.js
├── e2e/
│   ├── regression.spec.js        # navegação, FAQ, carrossel, cookies, menu mobile
│   ├── visual.spec.js            # screenshots full-page (desktop + mobile)
│   └── visual.spec.js-snapshots/ # baseline de imagens (versionada)
└── package.json
```

## Regra de ouro

A baseline visual só muda quando a alteração de layout for **proposital**.
Se um teste visual falhar depois de uma refatoração, investigue a diferença
antes de rodar `--update-snapshots`.
