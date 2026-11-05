// Carrossel de depoimentos.
// Sem rotação automática: o visitante controla quando avança. Isso atende à
// WCAG 2.2.2 (conteúdo que se move sozinho) e dá tempo de leitura.
const track = document.getElementById('t-track');
if (track) {
  const slides = Array.from(track.children);
  const dotsWrap = document.getElementById('t-dots');
  const carousel = track.closest('.t-carousel');
  let index = 0;

  slides.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.type = 'button';
    dot.setAttribute('aria-label', 'Ir para depoimento ' + (i + 1));
    if (i === 0) dot.setAttribute('aria-current', 'true');
    dot.addEventListener('click', () => goTo(i));
    dotsWrap.appendChild(dot);
  });
  const dots = Array.from(dotsWrap.children);

  function goTo(i) {
    index = (i + slides.length) % slides.length;
    track.style.transform = 'translateX(-' + (index * 100) + '%)';
    dots.forEach((d, di) => {
      if (di === index) d.setAttribute('aria-current', 'true');
      else d.removeAttribute('aria-current');
    });
  }
  function next() { goTo(index + 1); }
  function prev() { goTo(index - 1); }

  carousel.querySelector('.t-next').addEventListener('click', next);
  carousel.querySelector('.t-prev').addEventListener('click', prev);

  // Setas do teclado quando o carrossel está focado.
  carousel.setAttribute('tabindex', '0');
  carousel.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') next();
    if (e.key === 'ArrowLeft') prev();
  });

  // Swipe no touch.
  let startX = null;
  track.addEventListener('pointerdown', (e) => { startX = e.clientX; });
  track.addEventListener('pointerup', (e) => {
    if (startX === null) return;
    const diff = e.clientX - startX;
    if (diff > 40) prev();
    else if (diff < -40) next();
    startX = null;
  });
}
