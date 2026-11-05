# Imagens e conteúdo de demonstração

Este site é uma **prévia comercial**. Fotos, depoimentos, formação e dados
cadastrais são ilustrativos até que a clínica confirme cada item. O objetivo
desta versão é mostrar layout, estrutura e experiência de uso — não veicular
informação definitiva.

## Fotos

Origem: [Pexels](https://www.pexels.com) — [Pexels License](https://www.pexels.com/license/),
uso gratuito inclusive comercial, sem necessidade de atribuição.

Os arquivos foram baixados e redimensionados por
`tests/tools/fetch-images.mjs` (rodar da raiz: `node tests/tools/fetch-images.mjs`).
Cada foto tem três larguras em WebP; o HTML usa `srcset`/`sizes`.

| Arquivo (base) | Onde aparece | O que mostra | ID Pexels | Substituir por |
|---|---|---|---|---|
| `assets/img/hero/hero-1-*.webp` | Hero, slide 1 | Fisioterapeuta atendendo paciente | [20860579](https://www.pexels.com/photo/20860579/) | Foto real do atendimento |
| `assets/img/hero/hero-2-*.webp` | Hero, slide 2 | Exercício funcional acompanhado | [20860621](https://www.pexels.com/photo/20860621/) | Foto real do atendimento |
| `assets/img/hero/hero-3-*.webp` | Hero, slide 3 | Sala de atendimento | [16571739](https://www.pexels.com/photo/16571739/) | Foto real do consultório |
| `assets/img/servicos/ozonioterapia-*.webp` | Destaque "Ozonioterapia" | Avaliação postural | [20860586](https://www.pexels.com/photo/20860586/) | Foto real, sem equipamento ou procedimento que sugira aplicação |
| `assets/img/servicos/orofacial-atm-*.webp` | Destaque "Reabilitação orofacial e ATM" | Avaliação cervical/mandibular | [20860605](https://www.pexels.com/photo/20860605/) | Foto real da avaliação |
| `assets/img/servicos/pos-operatorio-*.webp` | Destaque "Fisioterapia pós-operatória" | Mobilidade de perna | [20860609](https://www.pexels.com/photo/20860609/) | Foto real do atendimento |
| `assets/img/equipe/neiva-*.webp` | Seção "Sobre" | Fisioterapeuta em atendimento | [20860602](https://www.pexels.com/photo/20860602/) | Retrato real da Neiva |
| `assets/img/estrutura/consultorio-*.webp` | Formulário de contato | Sala de atendimento | [16571732](https://www.pexels.com/photo/16571732/) | Foto real do consultório |

### Cuidados com as imagens

- Nenhuma foto deve sugerir procedimento, resultado ou equipamento que a
  clínica não utilize. A foto de "ozonioterapia" foi trocada justamente
  porque a anterior mostrava um soro intravenoso.
- Fotos de banco de imagens não representam pacientes reais da clínica.
- Ao trocar por fotos reais, remover o `filter` de tratamento em
  `assets/css/components.css` (bloco "Fotos de demonstração") se a cor
  original já estiver adequada.

## Conteúdo fictício ou não confirmado

| Item | Onde | Situação |
|---|---|---|
| Bio, formação e especializações | `index.html`, seção `#sobre` | Redigidas para a demonstração; precisam de confirmação da Neiva |
| Depoimentos (iniciais) | `index.html`, seção `#depoimentos` | Fictícios; publicar apenas com autorização expressa de cada paciente |
| E-mail `contato@clinicaneivafernandes.com.br` | `index.html` e `privacidade.html` | Domínio ainda não registrado; trocar pelo e-mail real |
| CNPJ `00.000.000/0001-00` | `privacidade.html` | Placeholder destacado em amarelo (`data-confirmar`) |
| Aviso "Prévia" | `index.html`, `privacidade.html` e `assets/css/demo.css` | Remover na publicação |
| `og-image.jpg` | `assets/img/social/` | Gerada por `tests/tools/generate-og-image.mjs` |

## Antes de publicar

1. Substituir todas as fotos da tabela e revisar os textos do bloco acima.
2. Remover o banner de demonstração (`demo.css`, `<link>` e `.demo-banner`).
3. Trocar `noindex, nofollow` por `index, follow` e apontar canonical/OG para
   o domínio final.
4. Revisar `robots.txt` e `sitemap.xml`, que hoje apontam para o ambiente de
   prévia (`josemelao.github.io/neiva`).
5. Trocar CNPJ, e-mail e conferir CREFITO, endereço, horários e telefone.
6. Remover o `filter` de cor das fotos em `assets/css/components.css`.

O roteiro de aprovação com a cliente está em
[`checklist-aprovacao.md`](checklist-aprovacao.md).
