// Envio do formulário de contato (Web3Forms) sem recarregar a página
const formContato = document.getElementById('form-contato');
if (formContato) {
  formContato.addEventListener('submit', async (e) => {
    e.preventDefault();
    const status = document.getElementById('form-status');
    const btn = formContato.querySelector('button[type="submit"]');
    const key = formContato.access_key.value;
    if (key === 'COLE_SUA_CHAVE_WEB3FORMS_AQUI') {
      status.textContent = 'Configuração pendente: insira a chave do Web3Forms no formulário.';
      status.style.color = '#B4453A';
      return;
    }
    btn.disabled = true;
    status.textContent = 'Enviando...';
    status.style.color = 'var(--texto-suave)';
    try {
      const res = await fetch(formContato.action, {
        method: 'POST',
        headers: { 'Accept': 'application/json' },
        body: new FormData(formContato)
      });
      const data = await res.json();
      if (data.success) {
        status.textContent = 'Mensagem enviada. Em breve entraremos em contato.';
        status.style.color = 'var(--verde-escuro)';
        formContato.reset();
      } else {
        status.textContent = 'Não foi possível enviar agora. Tente novamente ou fale pelo WhatsApp.';
        status.style.color = '#B4453A';
      }
    } catch (err) {
      status.textContent = 'Falha de conexão. Tente novamente ou fale pelo WhatsApp.';
      status.style.color = '#B4453A';
    } finally {
      btn.disabled = false;
    }
  });
}
