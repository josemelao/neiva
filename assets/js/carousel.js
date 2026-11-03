// Carrossel de depoimentos
const track = document.getElementById('t-track');
if (track) {
  const slides = Array.from(track.children);
  const dotsWrap = document.getElementById('t-dots');
  const carousel = track.closest('.t-carousel');
  let index = 0, timer = null;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  slides.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.setAttribute('role', 'tab');
    dot.setAttribute('aria-label', 'Ir para depoimento ' + (i + 1));
    dot.setAttribute('aria-selected', i === 0 ? 'true' : 'false');
    dot.addEventListener('click', () => goTo(i));
    dotsWrap.appendChild(dot);
  });
  const dots = Array.from(dotsWrap.children);

  function goTo(i) {
    index = (i + slides.length) % slides.length;
    track.style.transform = 'translateX(-' + (index * 100) + '%)';
    dots.forEach((d, di) => d.setAttribute('aria-selected', di === index ? 'true' : 'false'));
  }
  function next() { goTo(index + 1); }
  function prev() { goTo(index - 1); }

  carousel.querySelector('.t-next').addEventListener('click', () => { next(); restart(); });
  carousel.querySelector('.t-prev').addEventListener('click', () => { prev(); restart(); });
  carousel.setAttribute('tabindex', '0');
  carousel.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') { next(); restart(); }
    if (e.key === 'ArrowLeft') { prev(); restart(); }
  });

  // swipe no touch
  let startX = null;
  track.addEventListener('pointerdown', e => { startX = e.clientX; });
  track.addEventListener('pointerup', e => {
    if (startX === null) return;
    const diff = e.clientX - startX;
    if (diff > 40) { prev(); restart(); }
    else if (diff < -40) { next(); restart(); }
    startX = null;
  });

  function start() { if (!reduced && !timer) { timer = setInterval(next, 6000); } }
  function stop() { if (timer) { clearInterval(timer); timer = null; } }
  function restart() { stop(); start(); }

  carousel.addEventListener('mouseenter', stop);
  carousel.addEventListener('mouseleave', start);
  carousel.addEventListener('focusin', stop);
  carousel.addEventListener('focusout', start);
  start();
}
