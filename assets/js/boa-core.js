/* ============================================================
   BOA CORE JS — Comportamiento compartido del ecosistema BOA
   ============================================================
   BOA-WEB-040 · Sitio Web · BOA Consultoría SpA

   Contiene ÚNICAMENTE comportamiento reutilizable entre los 3 templates
   (Corporativo, Landing/Producto, Utilitario). Lógica de HubSpot, FAQ,
   selección de servicio y cualquier otra particularidad de una página
   permanecen en el <script> local de esa página — NO viven acá.

   Vanilla JS puro. Sin dependencias, sin build system.
   ============================================================ */

/* ── SCROLL REVEAL ──
   Activa la clase .visible sobre cualquier elemento con clase .reveal
   cuando entra en el viewport. Usado por todos los templates. */
(function () {
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (el) {
      if (el.isIntersecting) el.target.classList.add('visible');
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.reveal').forEach(function (el) {
    observer.observe(el);
  });
})();

/* ── NAVEGACIÓN — contracción del nav al hacer scroll ──
   Reduce el padding del <nav> fijo una vez que se supera el umbral de
   scroll. Comportamiento visual del header, no depende de contenido
   específico de ninguna página. */
(function () {
  var nav = document.querySelector('nav');
  if (!nav) return;
  window.addEventListener('scroll', function () {
    nav.style.padding = window.scrollY > 60 ? '12px 60px' : '20px 60px';
  });
})();

/* ── SMOOTH SCROLL CON OFFSET ──
   Intercepta clicks en cualquier enlace ancla (#id) y hace scroll suave
   descontando la altura del nav fijo (68px), para que la sección de
   destino no quede tapada por el header. */
(function () {
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var targetId = a.getAttribute('href');
      if (!targetId || targetId.length < 2) return;
      var target = document.querySelector(targetId);
      if (!target) return;
      e.preventDefault();
      var top = target.getBoundingClientRect().top + window.scrollY - 68;
      window.scrollTo({ top: top, behavior: 'smooth' });
    });
  });
})();

/* ── BOTÓN FLOTANTE DE WHATSAPP ──
   No requiere JS: es un enlace estático siempre visible, con el pulso
   y el hover resueltos en CSS (ver boa-core.css). Se documenta acá
   solo para dejar constancia de que la ausencia de JS es intencional. */
