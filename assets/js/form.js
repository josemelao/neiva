// Formulário de contato: monta a mensagem e abre o WhatsApp.
// Não há backend — a conversa é iniciada pelo próprio visitante, então
// nenhum dado do formulário é armazenado ou transmitido pelo site.
const WHATSAPP_NUMERO = '5561981729598';

const formContato = document.getElementById('form-contato');

if (formContato) {
  formContato.addEventListener('submit', (e) => {
    e.preventDefault();

    const status = document.getElementById('form-status');
    const dados = new FormData(formContato);
    const valor = (campo) => (dados.get(campo) || '').toString().trim();

    const nome = valor('nome');
    const whatsapp = valor('whatsapp');
    const email = valor('email');
    const mensagem = valor('mensagem');

    const linhas = [
      'Olá! Vim pelo site e gostaria de solicitar informações.',
      '',
      `Nome: ${nome}`,
      `WhatsApp: ${whatsapp}`,
    ];
    if (email) linhas.push(`E-mail: ${email}`);
    if (mensagem) linhas.push('', `Mensagem: ${mensagem}`);

    const url = `https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(linhas.join('\n'))}`;
    const novaAba = window.open(url, '_blank');

    if (novaAba) {
      novaAba.opener = null;
      if (status) {
        status.textContent = 'Abrimos o WhatsApp em outra aba com sua mensagem pronta. É só enviar.';
        status.classList.add('is-success');
      }
    } else {
      // Pop-up bloqueado: segue na mesma aba para não perder o contato.
      window.location.href = url;
    }
  });
}
