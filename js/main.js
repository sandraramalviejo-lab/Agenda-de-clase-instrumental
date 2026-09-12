/* ============================================================
   TU VIAJE MUSICAL — JavaScript del sitio
   ============================================================
   Este sitio es principalmente HTML y CSS: no necesita JavaScript
   para funcionar en la mayoría de páginas (la navegación son enlaces
   normales, el acordeón de preguntas frecuentes usa <details> nativo
   del navegador). Este archivo añade:
   1. El año automático del footer.
   2. El envío del formulario de contacto (Forminit).
   3. El selector de versión/plataforma de la página de producto.
   Si no sabes programar, no necesitas tocar este archivo para nada
   salvo que se indique lo contrario en un comentario "EDITAR".
   ============================================================ */

document.addEventListener('DOMContentLoaded', function () {

  // Actualiza automáticamente el año del copyright del footer,
  // para no tener que cambiarlo a mano cada enero.
  var anioSpan = document.getElementById('anio-actual');
  if (anioSpan) {
    anioSpan.textContent = new Date().getFullYear();
  }

  // ============ FORMULARIO DE CONTACTO (contacto.html e index.html) ============
  // Conectado a Forminit. Este bloque solo hace algo si la página tiene el
  // formulario — en las demás páginas no pasa nada.
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

  // ============ SELECTOR DE VERSIÓN Y PLATAFORMA (producto.html) ============
  // Este bloque entero solo hace algo si la página tiene el selector
  // (producto.html) — en las demás páginas no pasa nada.

  // EDITAR: aquí están los datos de cada versión de la agenda. "kdp" es
  // Amazon; cuando publiques una versión en Amazon, cambia su "kdp: null"
  // por la URL real (entre comillas), tal cual está en "conservatorio".
  var VERSIONS = [
    {
      id: 'conservatorio',
      fullTitle: 'Agenda Instrumental para alumnos de 3º y 4º de Enseñanzas Básicas en Andalucía',
      links: {
        lulu: 'https://www.lulu.com/shop/tu-viaje-musical/agenda-instrumental/paperback/product-rmkyp9z.html',
        kdp: 'https://www.amazon.es/Agenda-Instrumental-2026-conservatorios-Andalucia/dp/B0HHQMHD8C/'
      }
    },
    {
      id: 'andalucia',
      fullTitle: 'Agenda Instrumental para alumnos de conservatorios de Andalucía',
      links: {
        lulu: 'https://www.lulu.com/shop/tu-viaje-musical/agenda-instrumental/paperback/product-45er7zn.html',
        kdp: null
      }
    },
    {
      id: 'nacional',
      fullTitle: 'Agenda Instrumental para el curso 2026-27',
      links: {
        lulu: 'https://www.lulu.com/shop/tu-viaje-musical/agenda-instrumental/paperback/product-2mgjz9n.html',
        kdp: null
      }
    }
  ];

  // EDITAR: precios y datos de cada plataforma. El "label" de cada versión
  // (para la barra fija de compra) se toma directamente de la tarjeta en
  // el HTML, así que no hace falta repetirlo aquí.
  var PLATFORMS = [
    {
      id: 'lulu',
      name: 'Lulu',
      total: '27,57 €',
      breakdown: '20 € + 7,57 € de envío',
      delivery: 'Llega en unas 2 semanas',
      binding: 'Encuadernación en espiral',
      cta: 'Comprar en Lulu'
    },
    {
      id: 'kdp',
      name: 'Amazon',
      total: '20 €',
      breakdown: 'Envío gratis con Prime',
      delivery: 'Llega en 4-5 días',
      binding: 'Encuadernación encolada',
      cta: 'Comprar en Amazon'
    }
  ];

  var versionGroup = document.getElementById('version-group');
  var platformGroup = document.getElementById('platform-group');

  if (versionGroup && platformGroup) {
    var state = { version: null, platform: null };

    var summaryTitleEl = document.getElementById('summary-title');
    var summarySubEl = document.getElementById('summary-sub');
    var summaryPriceEl = document.getElementById('summary-price');
    var summaryPriceNoteEl = document.getElementById('summary-price-note');
    var summaryCtaEl = document.getElementById('summary-cta');
    var summaryNoteEl = document.getElementById('summary-note');
    var stickyBar = document.getElementById('sticky-buy-bar');
    var stickyVersionEl = document.getElementById('sticky-version');
    var stickyPriceEl = document.getElementById('sticky-price');
    var stickyCtaEl = document.getElementById('sticky-cta');

    function findById(list, id) {
      for (var i = 0; i < list.length; i++) {
        if (list[i].id === id) return list[i];
      }
      return null;
    }

    // Vuelve a calcular y a pintar todo lo que depende de la selección
    // actual (versión + plataforma): el panel de resumen y la barra fija.
    function render() {
      var v = state.version ? findById(VERSIONS, state.version) : null;
      var p = state.platform ? findById(PLATFORMS, state.platform) : null;
      var ready = !!(v && p);
      var link = ready ? v.links[p.id] : null;

      if (!v) {
        summaryTitleEl.textContent = 'Elige una versión arriba';
        summarySubEl.textContent = 'Y después, dónde quieres imprimirla';
        summaryPriceEl.textContent = 'Desde 20 €';
        summaryPriceNoteEl.textContent = 'según versión y plataforma';
      } else if (!p) {
        summaryTitleEl.textContent = v.fullTitle;
        summarySubEl.textContent = 'Ahora elige dónde imprimirla';
        summaryPriceEl.textContent = 'Desde 20 €';
        summaryPriceNoteEl.textContent = 'según versión y plataforma';
      } else {
        summaryTitleEl.textContent = v.fullTitle;
        summarySubEl.textContent = p.binding + ' · ' + p.delivery.toLowerCase();
        if (link) {
          summaryPriceEl.textContent = p.total;
          summaryPriceNoteEl.textContent = p.breakdown;
        } else {
          summaryPriceEl.textContent = 'No disponible aún';
          summaryPriceNoteEl.textContent = 'en Amazon';
        }
      }

      var buyLabel = (!v || !p) ? 'Elegir versión' : (link ? p.cta : 'Aún no disponible en Amazon');
      var buyHref = link || '#elegir';
      summaryCtaEl.textContent = buyLabel;
      summaryCtaEl.setAttribute('href', buyHref);
      if (link) {
        summaryCtaEl.setAttribute('target', '_blank');
        summaryCtaEl.setAttribute('rel', 'noopener noreferrer');
      } else {
        summaryCtaEl.removeAttribute('target');
        summaryCtaEl.removeAttribute('rel');
      }
      summaryCtaEl.classList.toggle('is-ready', ready);

      summaryNoteEl.textContent = (v && p && !link)
        ? 'Esta versión todavía no está publicada en Amazon. De momento puedes pedirla en Lulu.'
        : '';

      // La barra fija de abajo solo aparece con selección completa Y enlace real.
      if (stickyBar) {
        if (ready && link) {
          stickyBar.classList.add('is-visible');
          stickyBar.removeAttribute('inert');
          var cardLabel = versionGroup.querySelector('[data-id="' + v.id + '"] .option-card__label');
          stickyVersionEl.textContent = cardLabel ? cardLabel.textContent : v.fullTitle;
          stickyPriceEl.textContent = p.total;
          stickyCtaEl.textContent = p.name;
          stickyCtaEl.setAttribute('href', link);
        } else {
          stickyBar.classList.remove('is-visible');
          stickyBar.setAttribute('inert', '');
        }
      }
    }

    // Marca como elegida la tarjeta pulsada (o movida con flechas) dentro
    // de su grupo, y actualiza el resto de la página.
    function selectCard(cards, id, key) {
      state[key] = id;
      for (var i = 0; i < cards.length; i++) {
        var isSelected = cards[i].getAttribute('data-id') === id;
        cards[i].setAttribute('aria-checked', isSelected ? 'true' : 'false');
      }
      render();
    }

    // Conecta un grupo de tarjetas (versión o plataforma): clic para
    // elegir, flechas del teclado para moverse entre ellas eligiendo a
    // la vez (como un grupo de radio de toda la vida).
    function wireGroup(group, key) {
      var cards = group.querySelectorAll('[role="radio"]');
      for (var i = 0; i < cards.length; i++) {
        (function (card, index) {
          card.addEventListener('click', function () {
            selectCard(cards, card.getAttribute('data-id'), key);
          });
          card.addEventListener('keydown', function (e) {
            var newIndex = null;
            if (e.key === 'ArrowDown' || e.key === 'ArrowRight') newIndex = (index + 1) % cards.length;
            if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') newIndex = (index - 1 + cards.length) % cards.length;
            if (newIndex !== null) {
              e.preventDefault();
              cards[newIndex].focus();
              selectCard(cards, cards[newIndex].getAttribute('data-id'), key);
            }
          });
        })(cards[i], i);
      }
    }

    wireGroup(versionGroup, 'version');
    wireGroup(platformGroup, 'platform');
    render();
  }

});
