/* ============================================================
   TU VIAJE MUSICAL — Selector de la Agenda Instrumental
   ============================================================
   Esta es la única parte del sitio con estado e interactividad:
   el visitante elige una VERSIÓN (paso 1) y una PLATAFORMA (paso 2)
   y aquí se calcula todo lo demás (precio, textos del resumen,
   enlace de compra, barra fija) a partir de esas dos elecciones.

   EDITAR:
   - Para cambiar precios, textos o añadir/quitar una versión o
     plataforma, edita los arrays VERSIONS y PLATFORMS de aquí abajo.
   - Los enlaces de compra viven en VERSIONS[].links — es la única
     tabla de enlaces del sitio. Cuando la autora publique las
     versiones que faltan en Amazon, sustituye el `null` por la URL.
   ============================================================ */

(function () {
  var root = document.getElementById('elegir');
  if (!root) return; // Esta página no es producto.html: no hacer nada.

  // ---------- Datos ----------

  var VERSIONS = [
    {
      id: 'conservatorio',
      label: '3º y 4º EE.BB.',
      tag: 'ANDALUCÍA',
      full: 'Agenda Instrumental para alumnos de 3º y 4º de Enseñanzas Básicas en Andalucía',
      who: 'Para alumnos de 3º y 4º de Enseñanzas Básicas en conservatorios de Andalucía.',
      detail: 'Calendario escolar de Andalucía, con espacio para anotar las actividades de Lenguaje musical, Agrupaciones musicales y Coro.',
      links: {
        lulu: 'https://www.lulu.com/shop/tu-viaje-musical/agenda-instrumental/paperback/product-rmkyp9z.html',
        kdp: 'https://www.amazon.es/Agenda-Instrumental-2026-conservatorios-Andalucia/dp/B0HHQMHD8C/'
      }
    },
    {
      id: 'andalucia',
      label: 'Todos los cursos',
      tag: 'ANDALUCÍA',
      full: 'Agenda Instrumental para alumnos de conservatorios de Andalucía',
      who: 'Para cualquier curso e instrumento, dentro de Andalucía.',
      detail: 'Calendario escolar de Andalucía, con espacio abierto para anotar las actividades del resto de asignaturas.',
      links: {
        lulu: 'https://www.lulu.com/shop/tu-viaje-musical/agenda-instrumental/paperback/product-45er7zn.html',
        kdp: null // EDITAR: pendiente de publicar en Amazon KDP
      }
    },
    {
      id: 'nacional',
      label: 'Todos los cursos',
      tag: 'Nacional',
      full: 'Agenda Instrumental para el curso 2026-27',
      who: 'Para cualquier curso e instrumento, en cualquier punto de España.',
      detail: 'Calendario del curso con festivos nacionales. Espacio abierto para anotar las actividades del resto de asignaturas.',
      links: {
        lulu: 'https://www.lulu.com/shop/tu-viaje-musical/agenda-instrumental/paperback/product-2mgjz9n.html',
        kdp: null // EDITAR: pendiente de publicar en Amazon KDP
      }
    }
  ];

  var PLATFORMS = [
    {
      id: 'lulu',
      name: 'Lulu',
      total: '27,57 €',
      breakdown: '20 € + 7,57 € de envío',
      delivery: 'Llega en unas 2 semanas',
      binding: 'Encuadernación en espiral',
      note: 'Se abre plana: cómoda para escribir',
      cta: 'Comprar en Lulu'
    },
    {
      id: 'kdp',
      name: 'Amazon',
      total: '20 €',
      breakdown: 'Envío gratis con Prime',
      delivery: 'Llega en 4-5 días',
      binding: 'Encuadernación encolada',
      note: 'Acabado tipo libro',
      cta: 'Comprar en Amazon'
    }
  ];

  // ---------- Estado ----------

  var state = { version: null, platform: null };

  // ---------- Referencias al DOM ----------

  var versionGroup = document.getElementById('version-group');
  var platformGroup = document.getElementById('platform-group');

  var summaryTitleEl = document.getElementById('summary-title');
  var summarySubEl = document.getElementById('summary-sub');
  var summaryPriceEl = document.getElementById('summary-price');
  var summaryPriceNoteEl = document.getElementById('summary-price-note');
  var summaryNoteEl = document.getElementById('summary-note');
  var summaryCtaEl = document.getElementById('summary-cta');

  var buyBarEl = document.getElementById('buy-bar');
  var barLabelEl = document.getElementById('buy-bar-label');
  var barPriceEl = document.getElementById('buy-bar-price');
  var barCtaEl = document.getElementById('buy-bar-cta');

  // ---------- Construcción de las tarjetas ----------

  function buildVersionCard(v) {
    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'sel-card';
    btn.setAttribute('role', 'radio');
    btn.setAttribute('aria-checked', 'false');
    btn.dataset.id = v.id;

    // Nota: dentro de un <button> solo puede ir "contenido de frase"
    // (spans, no divs/p) para que el HTML sea válido — el aspecto de
    // bloque de cada fila se consigue por CSS (ver .version-card__* ).
    btn.innerHTML =
      '<span class="version-card__row">' +
        '<span class="sel-card__dot" aria-hidden="true"></span>' +
        '<span class="version-card__body">' +
          '<span class="version-card__head">' +
            '<span class="version-card__label">' + v.label + '</span>' +
            '<span class="version-card__tag">' + v.tag + '</span>' +
          '</span>' +
          '<span class="version-card__who">' + v.who + '</span>' +
          '<span class="version-card__detail">' + v.detail + '</span>' +
        '</span>' +
      '</span>';

    btn.addEventListener('click', function () { selectVersion(v.id); });
    return btn;
  }

  function buildPlatformCard(p) {
    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'sel-card';
    btn.setAttribute('role', 'radio');
    btn.setAttribute('aria-checked', 'false');
    btn.dataset.id = p.id;

    btn.innerHTML =
      '<span class="platform-card__head">' +
        '<span class="sel-card__dot" aria-hidden="true"></span>' +
        '<span class="platform-card__name">' + p.name + '</span>' +
      '</span>' +
      '<span class="platform-card__price">' + p.total + '</span>' +
      '<span class="platform-card__breakdown">' + p.breakdown + '</span>' +
      '<span class="platform-card__details">' +
        '<span class="platform-card__detail">' +
          '<span class="platform-card__detail-glyph" aria-hidden="true">◷</span>' +
          '<span class="platform-card__detail-text">' + p.delivery + '</span>' +
        '</span>' +
        '<span class="platform-card__detail">' +
          '<span class="platform-card__detail-glyph" aria-hidden="true">▤</span>' +
          '<span class="platform-card__detail-text">' + p.binding + '</span>' +
        '</span>' +
        '<span class="platform-card__detail">' +
          '<span class="platform-card__detail-glyph" aria-hidden="true">✦</span>' +
          '<span class="platform-card__detail-text">' + p.note + '</span>' +
        '</span>' +
      '</span>';

    btn.addEventListener('click', function () { selectPlatform(p.id); });
    return btn;
  }

  VERSIONS.forEach(function (v) { versionGroup.appendChild(buildVersionCard(v)); });
  PLATFORMS.forEach(function (p) { platformGroup.appendChild(buildPlatformCard(p)); });

  // Navegación con flechas dentro de cada radiogroup (patrón ARIA estándar:
  // las flechas mueven el foco Y seleccionan la tarjeta enfocada).
  function wireArrowNav(group, items, selectFn) {
    group.addEventListener('keydown', function (e) {
      var keys = ['ArrowRight', 'ArrowDown', 'ArrowLeft', 'ArrowUp'];
      if (keys.indexOf(e.key) === -1) return;
      e.preventDefault();
      var current = items.indexOf(e.target.dataset.id);
      if (current === -1) current = 0;
      var dir = (e.key === 'ArrowRight' || e.key === 'ArrowDown') ? 1 : -1;
      var next = (current + dir + items.length) % items.length;
      var nextId = items[next];
      var nextEl = group.querySelector('[data-id="' + nextId + '"]');
      if (nextEl) {
        nextEl.focus();
        selectFn(nextId);
      }
    });
  }
  wireArrowNav(versionGroup, VERSIONS.map(function (v) { return v.id; }), selectVersion);
  wireArrowNav(platformGroup, PLATFORMS.map(function (p) { return p.id; }), selectPlatform);

  // ---------- Selección ----------

  function selectVersion(id) {
    state.version = id;
    render();
  }
  function selectPlatform(id) {
    state.platform = id;
    render();
  }

  // ---------- Render derivado ----------

  function render() {
    var v = VERSIONS.filter(function (x) { return x.id === state.version; })[0] || null;
    var p = PLATFORMS.filter(function (x) { return x.id === state.platform; })[0] || null;
    var ready = !!(v && p);
    var link = ready ? (v.links && v.links[p.id]) : null;

    // Marca visualmente qué tarjeta está seleccionada en cada grupo.
    Array.prototype.forEach.call(versionGroup.children, function (btn) {
      btn.setAttribute('aria-checked', String(btn.dataset.id === state.version));
    });
    Array.prototype.forEach.call(platformGroup.children, function (btn) {
      btn.setAttribute('aria-checked', String(btn.dataset.id === state.platform));
    });

    // Panel de resumen.
    summaryTitleEl.textContent = v ? v.full : 'Elige una versión arriba';
    summarySubEl.textContent = ready
      ? (p.binding + ' · ' + p.delivery.toLowerCase())
      : (v ? 'Ahora elige dónde imprimirla' : 'Y después, dónde quieres imprimirla');
    summaryPriceEl.textContent = ready ? (link ? p.total : 'No disponible aún') : 'Desde 20 €';
    summaryPriceNoteEl.textContent = ready ? (link ? p.breakdown : 'en Amazon') : 'según versión y plataforma';

    summaryCtaEl.href = link || '#elegir';
    summaryCtaEl.textContent = ready ? (link ? p.cta : 'Aún no disponible en Amazon') : 'Elegir versión';
    summaryCtaEl.classList.toggle('is-ready', ready);
    if (link) {
      summaryCtaEl.target = '_blank';
      summaryCtaEl.rel = 'noopener noreferrer';
    } else {
      summaryCtaEl.removeAttribute('target');
      summaryCtaEl.removeAttribute('rel');
    }

    summaryNoteEl.textContent = (ready && !link)
      ? 'Esta versión todavía no está publicada en Amazon. De momento puedes pedirla en Lulu.'
      : '';

    // Barra fija inferior: solo entra cuando hay versión, plataforma Y enlace.
    var showBar = ready && !!link;
    buyBarEl.classList.toggle('is-visible', showBar);
    buyBarEl.inert = !showBar;
    if (!showBar) {
      buyBarEl.setAttribute('aria-hidden', 'true');
    } else {
      buyBarEl.removeAttribute('aria-hidden');
    }

    barLabelEl.textContent = v ? v.label : '';
    barPriceEl.textContent = link ? p.total : '';
    barCtaEl.href = link || '#elegir';
    barCtaEl.textContent = link ? p.name : '';
    if (link) {
      barCtaEl.target = '_blank';
      barCtaEl.rel = 'noopener noreferrer';
    } else {
      barCtaEl.removeAttribute('target');
      barCtaEl.removeAttribute('rel');
    }
  }

  render();
})();
