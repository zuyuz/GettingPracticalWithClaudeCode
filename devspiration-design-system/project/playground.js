/* ============================================================
   Devspiration Design System — Playground engine
   ============================================================
   Two micro-frameworks:

   1) Terminal scripting
      Declare a session as data-attributes on a .pg-terminal element,
      or imperatively via runTerminal(el, script).
      Each "beat" of the script is either:
        { type: 'cmd', text: 'npm install',          delay: 600 }   user types
        { type: 'out', text: 'added 312 packages',   delay: 80,  cls: 'pg-cl-dim' }
        { type: 'pause', ms: 700 }
        { type: 'clear' }
        { type: 'pip', text: 'Running build…',       cls: 'green' }

      The "Run" button in the controls bar steps through the script.

   2) Flow stepper
      A multi-panel container .pg-flow with .panel children that share
      a .stage grid cell. The header .steps reflects active state; the
      footer .nav has Prev / Next.

   Both pieces are completely independent — use either alone.
   ============================================================ */

(function () {
  // ────────── Utilities ──────────
  const sleep = (ms) => new Promise(r => setTimeout(r, ms));
  const rand  = (a, b) => a + Math.random() * (b - a);

  // ────────── Terminal ──────────

  // Type a string char-by-char into `target`, returning when done.
  async function typeInto(target, text, opts = {}) {
    const baseDelay = opts.cps ? 1000 / opts.cps : 24;
    for (let i = 0; i < text.length; i++) {
      target.textContent += text[i];
      // small natural jitter
      await sleep(baseDelay + rand(-6, 14));
    }
  }

  // Append a line element to the terminal body.
  function appendLine(body, html, cls = '') {
    const line = document.createElement('span');
    line.className = 'pg-line ' + cls;
    line.innerHTML = html;
    body.appendChild(line);
    body.scrollTop = body.scrollHeight;
    return line;
  }

  // Get or create a "live" line we can type into.
  function liveLine(body, opts = {}) {
    const line = document.createElement('span');
    line.className = 'pg-line';
    if (opts.prompt) {
      const p = document.createElement('span');
      p.className = 'pg-prompt';
      line.appendChild(p);
    }
    const cmd = document.createElement('span');
    cmd.className = opts.cls || 'pg-cmd';
    line.appendChild(cmd);
    const caret = document.createElement('span');
    caret.className = 'pg-caret';
    line.appendChild(caret);
    body.appendChild(line);
    body.scrollTop = body.scrollHeight;
    return { line, cmd, caret };
  }

  async function playBeat(body, beat) {
    if (beat.type === 'pause') return sleep(beat.ms ?? 400);
    if (beat.type === 'clear') {
      body.innerHTML = '';
      return;
    }
    if (beat.type === 'cmd') {
      const { line, cmd, caret } = liveLine(body, { prompt: true });
      await typeInto(cmd, beat.text, { cps: beat.cps });
      caret.remove();
      await sleep(beat.delay ?? 220);
      return;
    }
    if (beat.type === 'out') {
      appendLine(body, beat.html ?? escapeHtml(beat.text ?? ''), beat.cls || 'pg-out');
      return sleep(beat.delay ?? 80);
    }
    if (beat.type === 'pip') {
      appendLine(
        body,
        '<span class="pg-pip ' + (beat.color || 'green') + '"></span>' +
          '<span class="' + (beat.cls || 'pg-cl-dim') + '">' + escapeHtml(beat.text || '') + '</span>',
        ''
      );
      return sleep(beat.delay ?? 200);
    }
    if (beat.type === 'raw') {
      appendLine(body, beat.html, beat.cls || '');
      return sleep(beat.delay ?? 80);
    }
    // Typed-out user prompt — types char-by-char into a Claude-Code
    // `> ` input box with a live caret. (cc-input ::before draws the arrow.)
    if (beat.type === 'input') {
      const line = document.createElement('span');
      line.className = 'pg-line';
      const box = document.createElement('span');
      box.className = 'cc-input cc-input-live';
      const txt = document.createElement('span');
      box.appendChild(txt);
      const caret = document.createElement('span');
      caret.className = 'pg-caret';
      box.appendChild(caret);
      line.appendChild(box);
      body.appendChild(line);
      body.scrollTop = body.scrollHeight;
      await typeInto(txt, beat.text || '', { cps: beat.cps || 46 });
      await sleep(beat.delay ?? 260);
      caret.remove();
      return;
    }
    // Claude Code "thinking" spinner — rotating ✻, cycling verb, a live
    // elapsed timer and a climbing token count with an interrupt hint.
    // Transient by default: removes itself when the agent starts acting.
    if (beat.type === 'think') {
      const verbs = beat.verbs || [
        'Thinking', 'Pondering', 'Cogitating', 'Reticulating',
        'Considering', 'Deliberating', 'Reasoning', 'Untangling', 'Synthesizing',
      ];
      const line = document.createElement('span');
      line.className = 'pg-line cc-think';
      line.innerHTML =
        '<span class="cc-think-spark">✻</span>' +
        '<span class="cc-think-label"></span>' +
        '<span class="cc-think-meta"></span>';
      body.appendChild(line);
      body.scrollTop = body.scrollHeight;
      const label = line.querySelector('.cc-think-label');
      const meta = line.querySelector('.cc-think-meta');
      const now = () => (typeof performance !== 'undefined' ? performance.now() : Date.now());
      const t0 = now();
      const base = beat.tokens ?? 0;
      let vi = 0;
      label.textContent = verbs[0] + '…';
      const vIv = setInterval(() => {
        vi = (vi + 1) % verbs.length;
        label.textContent = verbs[vi] + '…';
      }, 460);
      const tIv = setInterval(() => {
        const s = (now() - t0) / 1000;
        const tok = Math.round(base + s * 1850);
        meta.textContent = '(' + Math.max(1, Math.round(s)) + 's · ↑ ' + fmtTokens(tok) + ' tokens · esc to interrupt)';
      }, 90);
      meta.textContent = '(1s · ↑ ' + fmtTokens(base) + ' tokens · esc to interrupt)';
      await sleep(beat.ms ?? 1500);
      clearInterval(vIv);
      clearInterval(tIv);
      line.remove();
      return;
    }
  }

  // Format a token count Claude-Code-style: 1234 → "1.2k".
  function fmtTokens(n) {
    return n >= 1000 ? (n / 1000).toFixed(1).replace(/\.0$/, '') + 'k' : String(n);
  }

  function escapeHtml(s) {
    return s.replace(/[&<>"']/g, c => ({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;','\'':'&#39;' }[c]));
  }

  // Pre-defined scripts, addressed by data-script="<name>".
  const SCRIPTS = {
    'claude-greet': [
      { type: 'cmd', text: 'claude' },
      { type: 'pause', ms: 500 },
      { type: 'raw', html: '<span class="pg-bold pg-cl-blue">Claude Code</span>  <span class="pg-cl-dim">v1.4.2</span>' },
      { type: 'out', text: '' },
      { type: 'pip', color: 'green', text: 'Ready. What are we building?', cls: 'pg-cmd' },
      { type: 'pause', ms: 200 },
      { type: 'cmd', text: 'help me build a landing page' },
      { type: 'pause', ms: 700 },
      { type: 'pip', color: 'yellow', text: 'Thinking…', cls: 'pg-cl-dim' },
      { type: 'pause', ms: 500 },
      { type: 'pip', color: 'green', text: 'Drafted Hero, Features, CTA.', cls: 'pg-cmd' },
      { type: 'out', text: '  → src/Hero.jsx',     cls: 'pg-cl-blue', delay: 50 },
      { type: 'out', text: '  → src/Features.jsx', cls: 'pg-cl-blue', delay: 50 },
      { type: 'out', text: '  → src/CTA.jsx',      cls: 'pg-cl-blue', delay: 50 },
      { type: 'pause', ms: 400 },
      { type: 'pip', color: 'green', text: 'Done · 3 files · 1.2s' },
    ],
    'npm-install': [
      { type: 'cmd', text: 'npm install' },
      { type: 'pause', ms: 500 },
      { type: 'pip', color: 'yellow', text: 'fetching metadata…', cls: 'pg-cl-dim' },
      { type: 'pause', ms: 600 },
      { type: 'pip', color: 'yellow', text: 'resolving 312 packages…', cls: 'pg-cl-dim' },
      { type: 'pause', ms: 500 },
      { type: 'out', html: '<span class="pg-cl-green">added</span> <span class="pg-bold">312 packages</span> <span class="pg-cl-dim">in 4.1s</span>' },
      { type: 'pip', color: 'green', text: 'audited · 0 vulnerabilities', cls: 'pg-cmd' },
    ],
    'devspiration-init': [
      { type: 'cmd', text: 'npx devspiration init my-deck' },
      { type: 'pause', ms: 400 },
      { type: 'pip', color: 'yellow', text: 'Pulling brand tokens…', cls: 'pg-cl-dim' },
      { type: 'pause', ms: 350 },
      { type: 'pip', color: 'yellow', text: 'Copying assets/, motion.css, fonts…', cls: 'pg-cl-dim' },
      { type: 'pause', ms: 350 },
      { type: 'pip', color: 'green', text: 'Created my-deck/' , cls: 'pg-cmd' },
      { type: 'out', text: '  ├── presentation/index.html', cls: 'pg-cl-dim' },
      { type: 'out', text: '  ├── colors_and_type.css',     cls: 'pg-cl-dim' },
      { type: 'out', text: '  ├── motion.css',              cls: 'pg-cl-dim' },
      { type: 'out', text: '  └── assets/ (16 props · 4 icons · 1 logo)', cls: 'pg-cl-dim' },
      { type: 'pause', ms: 250 },
      { type: 'raw', html: '<span class="pg-cl-blue">→</span> Next: <span class="pg-bold">cd my-deck &amp;&amp; open presentation/index.html</span>' },
    ],
  };

  function wireTerminal(el) {
    if (el.dataset.wired) return;
    el.dataset.wired = '1';
    const body  = el.querySelector('.pg-body');
    const runBtn = el.querySelector('.pg-run');
    const reset = el.querySelector('.pg-reset');
    const status = el.querySelector('.status');
    const scriptName = el.dataset.script;
    const scriptArr = el.__script || (scriptName && SCRIPTS[scriptName]) || [];

    // Snapshot the initial body for reset.
    const initialHTML = body.innerHTML;

    el.__running = false;
    el.__token = 0;

    async function run() {
      if (el.__running) return;
      el.__running = true;
      el.classList.add('is-running');
      const token = ++el.__token;
      runBtn?.classList.add('running');
      runBtn?.setAttribute('disabled', '');
      if (status) status.textContent = 'running…';
      for (const beat of scriptArr) {
        if (token !== el.__token) break;  // cancelled
        await playBeat(body, beat);
      }
      runBtn?.classList.remove('running');
      runBtn?.removeAttribute('disabled');
      if (status) status.textContent = 'idle';
      el.__running = false;
      el.classList.remove('is-running');
      el.dispatchEvent(new CustomEvent('pg-terminal-finished', { bubbles: true }));
    }

    function doReset() {
      el.__token++;
      el.__running = false;
      el.classList.remove('is-running');
      body.innerHTML = initialHTML;
      runBtn?.classList.remove('running');
      runBtn?.removeAttribute('disabled');
      if (status) status.textContent = 'idle';
    }

    runBtn?.addEventListener('click', run);
    reset?.addEventListener('click', doReset);

    // expose for external use
    el.run = run;
    el.reset = doReset;
  }

  // ────────── Flow stepper ──────────
  function wireFlow(el) {
    if (el.dataset.wired) return;
    el.dataset.wired = '1';

    const stepEls  = [...el.querySelectorAll('.steps .step')];
    const panels   = [...el.querySelectorAll('.stage > .panel')];
    const captionEl = el.querySelector('.nav .caption');
    const prev = el.querySelector('.nav .prev');
    const next = el.querySelector('.nav .next');

    const captions = panels.map(p => p.dataset.caption || '');
    let idx = 0;

    function go(i) {
      idx = Math.max(0, Math.min(panels.length - 1, i));
      stepEls.forEach((s, k) => {
        s.classList.toggle('on',   k === idx);
        s.classList.toggle('done', k <  idx);
      });
      panels.forEach((p, k) => p.classList.toggle('on', k === idx));
      if (captionEl) captionEl.textContent = captions[idx] || '';
      if (prev) prev.disabled = idx === 0;
      if (next) {
        next.textContent = idx === panels.length - 1 ? 'Restart' : 'Next →';
      }

      // auto-run any terminal inside the newly-active panel
      const term = panels[idx].querySelector('.pg-terminal');
      if (term && term.dataset.autorun === 'true') {
        // small delay so the transition completes
        setTimeout(() => term.run && term.run(), 320);
      }
    }

    prev?.addEventListener('click', () => go(idx - 1));
    next?.addEventListener('click', () => {
      if (idx === panels.length - 1) go(0);
      else go(idx + 1);
    });
    stepEls.forEach((s, k) => s.addEventListener('click', () => go(k)));

    el.go = go;
    go(0);
  }

  // ────────── Boot ──────────
  function boot() {
    document.querySelectorAll('.pg-terminal').forEach(wireTerminal);
    document.querySelectorAll('.pg-flow').forEach(wireFlow);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }

  // Expose helpers
  window.Playground = {
    runTerminal: (el, scriptArr) => {
      el.__script = scriptArr;
      el.dataset.wired = '';
      wireTerminal(el);
      return el.run();
    },
    scripts: SCRIPTS,
  };
})();
