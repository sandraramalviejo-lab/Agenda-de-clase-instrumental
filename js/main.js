/* ============================================================
   TU VIAJE MUSICAL — JavaScript compartido
   ============================================================
   Este archivo se carga en las tres páginas del sitio (Inicio,
   Agenda Instrumental y Contacto). Lo que solo hace falta en la
   página de producto (el selector de versión/plataforma) vive
   aparte, en js/producto.js.
   ============================================================ */

document.addEventListener('DOMContentLoaded', function () {

  // Actualiza automáticamente el año del copyright del footer,
  // para no tener que cambiarlo a mano cada enero.
  var anioSpan = document.getElementById('anio-actual');
  if (anioSpan) {
    anioSpan.textContent = new Date().getFullYear();
  }

  // Formulario de contacto (contacto.html), conectado a Forminit.
  // Este bloque solo hace algo si la página tiene el formulario — en
  // las demás páginas no pasa nada.
  // EDITAR: si algún día creas un formulario nuevo en Forminit, cambia
  // este ID por el nuevo (lo encuentras en tu panel de Forminit).
  var FORMINIT_FORM_ID = 'rgi42zi55jg';

  var contactForm = document.getElementById('contact-form');
  if (contactForm && window.Forminit) {
    var forminit = new Forminit();
    var statusEl = document.getElementById('contact-status');

    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      if (statusEl) {
        statusEl.classList.remove('is-success');
        statusEl.textContent = 'Enviando...';
      }

      forminit.submit(FORMINIT_FORM_ID, new FormData(contactForm))
        .then(function (result) {
          if (result.error) {
            if (statusEl) {
              statusEl.classList.remove('is-success');
              statusEl.textContent = 'No se ha podido enviar: ' + result.error.message;
            }
            return;
          }
          if (result.redirectUrl) {
            window.location.href = result.redirectUrl;
            return;
          }
          if (statusEl) {
            statusEl.classList.add('is-success');
            statusEl.textContent = 'Gracias, he recibido tu mensaje. Te respondo pronto.';
          }
          contactForm.reset();
        })
        .catch(function () {
          if (statusEl) {
            statusEl.classList.remove('is-success');
            statusEl.textContent = 'No se ha podido enviar el mensaje. Inténtalo de nuevo en un momento.';
          }
        });
    });
  }

});
