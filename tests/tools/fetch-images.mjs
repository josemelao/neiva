// Baixa e redimensiona as fotos de demonstração do Pexels para assets/img.
//
// As imagens são placeholders: devem ser substituídas por fotos reais da
// clínica antes da publicação. Origem e licença: Pexels License
// (https://www.pexels.com/license/), uso gratuito inclusive comercial.
//
// Rodar da raiz do repositório: node tests/tools/fetch-images.mjs
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..', '..');

/** @type {{ dir: string, name: string, id: string, ratio: [number, number], widths: number[], crop?: string }[]} */
const fotos = [
  { dir: 'hero', name: 'hero-1', id: '20860579', ratio: [4, 5], widths: [640, 960, 1280] },
  { dir: 'hero', name: 'hero-2', id: '20860621', ratio: [4, 5], widths: [640, 960, 1280] },
  { dir: 'hero', name: 'hero-3', id: '16571739', ratio: [4, 5], widths: [640, 960, 1280] },
  { dir: 'servicos', name: 'ozonioterapia', id: '20860586', ratio: [1, 1], widths: [480, 720, 960] },
  { dir: 'servicos', name: 'orofacial-atm', id: '20860605', ratio: [1, 1], widths: [480, 720, 960] },
  { dir: 'servicos', name: 'pos-operatorio', id: '20860609', ratio: [1, 1], widths: [480, 720, 960] },
  { dir: 'equipe', name: 'neiva', id: '20860602', ratio: [3, 4], widths: [480, 720, 960], crop: 'faces' },
  { dir: 'estrutura', name: 'consultorio', id: '16571732', ratio: [4, 5], widths: [480, 720, 960] },
];

const alvo = (foto, w) => {
  const h = Math.round((w * foto.ratio[1]) / foto.ratio[0]);
  const params = new URLSearchParams({
    auto: 'compress',
    cs: 'tinysrgb',
    fm: 'webp',
    fit: 'crop',
    w: String(w),
    h: String(h),
  });
  if (foto.crop) params.set('crop', foto.crop);
  return `https://images.pexels.com/photos/${foto.id}/pexels-photo-${foto.id}.jpeg?${params}`;
};

let total = 0;
for (const foto of fotos) {
  const dir = path.join(root, 'assets', 'img', foto.dir);
  fs.mkdirSync(dir, { recursive: true });

  for (const w of foto.widths) {
    const destino = path.join(dir, `${foto.name}-${w}.webp`);
    const resposta = await fetch(alvo(foto, w), {
      headers: { 'User-Agent': 'neiva-demo/1.0 (+https://github.com/josemelao/neiva)' },
    });
    if (!resposta.ok) throw new Error(`${foto.name}-${w}: HTTP ${resposta.status}`);
    const buffer = Buffer.from(await resposta.arrayBuffer());
    fs.writeFileSync(destino, buffer);
    total += buffer.length;
    console.log(
      `${path.relative(root, destino).padEnd(48)} ${String(Math.round(buffer.length / 1024)).padStart(4)} KB`
    );
  }
}

console.log(`\n${fotos.length} fotos · ${total} bytes no total`);
