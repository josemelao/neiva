// Revelação suave ao rolar a página
const root = document.documentElement;
root.setAttribute('data-motion-ready', '');

const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (!prefersReduced && 'IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
} else {
  document.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));
}

// Fade suave de imagens reais quando forem inseridas (usar <img class="fade-in">)
document.querySelectorAll('img.fade-in').forEach(img => {
  if (img.complete) { img.classList.add('loaded'); }
  else { img.addEventListener('load', () => img.classList.add('loaded')); }
});
