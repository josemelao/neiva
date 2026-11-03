// ── Banner de cookies (LGPD) ───────────────────────────────────
const cookieBanner = document.getElementById('cookie-banner');
if (cookieBanner) {
  const CONSENT_KEY = 'nf_cookie_consent';
  const acceptBtn = document.getElementById('cookie-accept');
  let alreadyAccepted = false;
  try { alreadyAccepted = !!localStorage.getItem(CONSENT_KEY); } catch (e) { /* storage indisponível */ }

  if (!alreadyAccepted) {
    setTimeout(() => cookieBanner.classList.add('visible'), 700);
  }
  acceptBtn.addEventListener('click', () => {
    try { localStorage.setItem(CONSENT_KEY, 'aceito'); } catch (e) { /* storage indisponível */ }
    cookieBanner.classList.remove('visible');
  });
}
