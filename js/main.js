/* ============================================================
   TU VIAJE MUSICAL — JavaScript del sitio
   ============================================================
   Este sitio es principalmente HTML y CSS: no necesita JavaScript
   para funcionar (la navegación son enlaces normales, el acordeón
   de preguntas frecuentes usa <details> nativo del navegador, y la
   galería usa scroll nativo). Este archivo solo añade un par de
   detalles pequeños. Si no sabes programar, no necesitas tocar
   este archivo para nada.
   ============================================================ */

document.addEventListener('DOMContentLoaded', function () {

  // Actualiza automáticamente el año del copyright del footer,
  // para no tener que cambiarlo a mano cada enero.
  var anioSpan = document.getElementById('anio-actual');
  if (anioSpan) {
    anioSpan.textContent = new Date().getFullYear();
  }

  // Formulario de contacto (sección "Contacto" de index.html), conectado
  // a Forminit. Este bloque solo hace algo si la página tiene el
  // formulario (index.html) — en las demás páginas no pasa nada.
  // EDITAR: si algún día creas un formulario nuevo en Forminit, cambia
  // este ID por el nuevo (lo encuentras en tu panel de Forminit).
  var FORMINIT_FORM_ID = 'rgi42zi55jg';

  var contactForm = document.getElementById('contact-form');
  if (contactForm && window.Forminit) {
    var forminit = new Forminit();
    var statusEl = document.getElementById('contact-status');

    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      if (statusEl) statusEl.textContent = 'Enviando...';

      forminit.submit(FORMINIT_FORM_ID, new FormData(contactForm))
        .then(function (result) {
          if (result.error) {
            if (statusEl) {
              statusEl.textContent = 'No se ha podido enviar: ' + result.error.message;
            }
            return;
          }
          if (result.redirectUrl) {
            window.location.href = result.redirectUrl;
            return;
          }
          if (statusEl) {
            statusEl.textContent = '¡Mensaje enviado! Gracias por escribirnos.';
          }
          contactForm.reset();
        })
        .catch(function () {
          if (statusEl) {
            statusEl.textContent = 'No se ha podido enviar el mensaje. Inténtalo de nuevo en un momento.';
          }
        });
    });
  }

});
