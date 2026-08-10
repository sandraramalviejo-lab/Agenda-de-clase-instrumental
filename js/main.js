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

});
