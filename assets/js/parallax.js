// ── Parallax suave de fundo (CTA Final) ──────────────────────────
const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!prefersReduced) {
  const parallaxBg = document.querySelector('[data-parallax-bg]');
  if (parallaxBg) {
    let bgPending = false;
    const updateBgParallax = () => {
      const parent = parallaxBg.parentElement;
      const rect = parent.getBoundingClientRect();
      // Só calcular quando a seção está no campo de visão
      if (rect.bottom > 0 && rect.top < window.innerHeight) {
        const speed = parseFloat(parallaxBg.dataset.parallaxBg) || 0.25;
        const center = rect.top + rect.height / 2 - window.innerHeight / 2;
        parallaxBg.style.transform = `translate3d(0, ${center * speed}px, 0)`;
      }
      bgPending = false;
    };

    window.addEventListener('scroll', () => {
      if (!bgPending) {
        bgPending = true;
        requestAnimationFrame(updateBgParallax);
      }
    }, { passive: true });

    updateBgParallax(); // Estado inicial
  }
}
