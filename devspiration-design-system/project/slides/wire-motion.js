/* slides/wire-motion.js
   ─────────────────────────────────────────────────────────────
   Bridges <deck-stage>'s slidechange event to the motion.css
   entrance system: toggles [data-deck-active] on the live
   slide so its .m-* classes animate from their pre-state to
   their resting state.

   Also runs a tiny counter-up loop for any .m-counter elements
   with a data-target value, so big stat numbers tick up when
   their slide appears.
   ─────────────────────────────────────────────────────────────
*/
(function () {
  const stage = document.querySelector('deck-stage');
  if (!stage) return;

  function activate(slide, previous) {
    if (previous && previous !== slide) {
      previous.removeAttribute('data-deck-active');
      // reset counters on the slide we just left so they tick again next time
      previous.querySelectorAll('.m-counter').forEach(el => {
        if (el.dataset.target != null) el.textContent = '0';
      });
    }
    if (!slide) return;
    // double rAF so the browser flushes the pre-state styles before we
    // flip to the active state — guarantees the transition runs.
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        slide.setAttribute('data-deck-active', '');
        runCounters(slide);
      });
    });
  }

  function runCounters(slide) {
    slide.querySelectorAll('.m-counter[data-target]').forEach(el => {
      const target  = parseFloat(el.dataset.target);
      const dur     = parseInt(el.dataset.duration || '1100', 10);
      const prefix  = el.dataset.prefix || '';
      const suffix  = el.dataset.suffix || '';
      const decimals = parseInt(el.dataset.decimals || '0', 10);
      const start = performance.now();
      // ease-out cubic
      const ease = t => 1 - Math.pow(1 - t, 3);
      function frame(now) {
        const t = Math.min(1, (now - start) / dur);
        const v = target * ease(t);
        el.textContent = prefix + v.toFixed(decimals) + suffix;
        if (t < 1) requestAnimationFrame(frame);
        else el.textContent = prefix + target.toFixed(decimals) + suffix;
      }
      requestAnimationFrame(frame);
    });
  }

  stage.addEventListener('slidechange', (e) => {
    activate(e.detail.slide, e.detail.previousSlide);
  });

  // first paint — deck-stage fires 'init' on load, but if it ran before
  // this script registered, kick off the first slide manually.
  const first = stage.querySelector('section');
  if (first && !first.hasAttribute('data-deck-active')) activate(first, null);
})();
