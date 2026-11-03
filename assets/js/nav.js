// Header: sombra ao rolar + menu mobile
const header = document.querySelector('header');

if (header) {
  const onScroll = () => {
    header.classList.toggle('scrolled', window.scrollY > 60);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // Estado inicial
}

const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('nav');

if (hamburger && navMenu) {
  const setOpen = (open) => {
    navMenu.classList.toggle('nav-open', open);
    hamburger.setAttribute('aria-expanded', open ? 'true' : 'false');
    hamburger.setAttribute('aria-label', open ? 'Fechar menu' : 'Menu');
  };

  hamburger.addEventListener('click', () => {
    setOpen(!navMenu.classList.contains('nav-open'));
  });

  // Fechar ao clicar em qualquer link do menu
  navMenu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => setOpen(false));
  });

  // Fechar ao clicar fora
  document.addEventListener('click', (e) => {
    if (!navMenu.contains(e.target) && !hamburger.contains(e.target)) setOpen(false);
  });

  // Fechar com Esc
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu.classList.contains('nav-open')) {
      setOpen(false);
      hamburger.focus();
    }
  });
}
