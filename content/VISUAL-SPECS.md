# Visual specs — slide-scale `pg-*` components + per-slide visual plan

Deliverable for Task #1 (Designer). Paste-ready CSS for the Frontend Developer to drop
into the deck's `<style>` block in `presentation/index.html`, plus the layout modifier,
the prop-relocation rule, and the per-slide mapping table.

## How the stage scales (why these numbers)

`deck-stage.js` renders all slides into a fixed `.canvas` sized at the authored
`1920 × 1080`, then applies `transform: scale(s)` to fit the viewport
(`deck-stage.js:1136-1158`). **Authored pixels are real** — a `24px` font is genuinely
24 authored px and scales with everything else. So we size for the back of the room by
authoring large: body text `~24px`, frame height `~600px`, titlebar `~52px`.

Two consequences the Frontend Dev must respect:

1. **Prefer explicit `font-size` / `padding` over `transform: scale()`.** Scaling a
   docs-scale frame would blur its text on top of the deck's own scale. Every override
   below sets real sizes so glyphs stay crisp at any zoom.
2. **Scope everything under `.slide`.** The thumbnail rail deep-clones each slide into a
   nested shadow root and *adopts the deck's author CSS into it*
   (`deck-stage.js:693-729`, the `:root → :host` rewrite). Rules scoped to `.slide .pg-*`
   travel into the clone and render thumbnails correctly; unscoped `.pg-*` overrides would
   still work but `.slide`-scoping keeps them from leaking if the playground preview pages
   are ever embedded.

The safe content box (`.stage-pad`) is `left:176 top:96 width:1568 height:788`
(index.html:59-65). A right-side frame must fit **inside 788px tall** — hence the
`600px` frame default (560-620 acceptable), which leaves ~90px top/bottom breathing room
within the pad.

---

## (a) PASTE-READY — slide-scale component CSS

Paste this as one block at the **end** of the existing `<style>` in `index.html`
(after the scrim rules at line ~305), so it wins on source order over the linked
`playground.css`. It overrides only sizing/spacing — colors, traffic-lights, theme
variants, run-button look, and the diff/tab/flow chrome all inherit from
`playground.css` unchanged.

```css
    /* ═══════════════════════════════════════════════════════════════
       SLIDE-SCALE PLAYGROUND FRAMES
       playground.css authors the pg-* components at docs scale
       (~12-14px fonts, ~280px frames). On the 1920×1080 stage they must
       read from the back of a room. Everything below is an explicit
       font/padding/height override (never transform:scale) so text stays
       crisp under the deck's own canvas scale. Scoped to .slide so the
       overrides also travel into the thumbnail-rail shadow clones.
       ═══════════════════════════════════════════════════════════════ */

    /* ---- Base frame: size, radius, lift ---- */
    .slide .pg-frame {
      --pg-radius: 18px;
      --pg-titlebar-h: 52px;
      height: 600px;                 /* fits the 788px stage-pad with margin */
      box-sizing: border-box;
      font-family: var(--ds-font-sans);
      /* a touch more lift so the frame separates from the slide ground */
      box-shadow:
        0 1px 0 rgba(255,255,255,.05) inset,
        0 40px 90px -28px rgba(20,20,20,.30),
        0 10px 28px -10px rgba(20,20,20,.16),
        0 0 0 1px rgba(0,0,0,.05);
    }
    .slide .pg-frame.theme-dark {
      box-shadow:
        0 1px 0 rgba(255,255,255,.06) inset,
        0 40px 90px -28px rgba(0,0,0,.62),
        0 10px 28px -10px rgba(0,0,0,.40),
        0 0 0 1px rgba(255,255,255,.07);
    }

    /* ---- Title bar ---- */
    .slide .pg-titlebar {
      grid-template-columns: 96px 1fr 96px;
      padding: 0 22px;
      font-size: 19px;
    }
    .slide .pg-titlebar .lights { gap: 12px; }
    .slide .pg-titlebar .lights span {
      width: 17px; height: 17px;
    }
    .slide .pg-titlebar .title  { font-size: 19px; }
    .slide .pg-titlebar .meta   { font-size: 16px; }

    /* ---- Body (terminal + generic) ---- */
    .slide .pg-body {
      padding: 30px 34px;
      font-size: 24px;
      line-height: 1.6;
    }
    .slide .pg-frame.theme-light .pg-body {
      font-size: 25px;
      line-height: 1.5;
    }
    .slide .pg-line { min-height: 1.6em; }
    .slide .pg-prompt { margin-right: 12px; }
    .slide .pg-pip {
      width: 13px; height: 13px; margin-right: 12px;
    }
    .slide .pg-caret {
      width: 11px; margin-left: 3px;
    }

    /* ---- Run controls ---- */
    .slide .pg-controls {
      gap: 16px;
      padding: 16px 24px;
    }
    .slide .pg-run {
      gap: 12px;
      padding: 13px 26px;
      border-radius: 12px;
      font-size: 20px;
    }
    .slide .pg-run .ico {
      border-width: 8px 0 8px 13px;   /* scaled play triangle */
    }
    .slide .pg-run.running .ico {
      width: 13px; height: 13px;
    }
    .slide .pg-reset {
      padding: 12px 20px;
      border-radius: 12px;
      font-size: 18px;
    }
    .slide .pg-controls .status { font-size: 17px; }

    /* ---- Browser: tabs + address bar ---- */
    .slide .pg-tabs { padding: 0 18px; gap: 6px; }
    .slide .pg-tabs .tab {
      gap: 12px;
      padding: 13px 22px;
      font-size: 19px;
      border-radius: 12px 12px 0 0;
      max-width: 320px;
    }
    .slide .pg-tabs .tab .fav { width: 18px; height: 18px; border-radius: 5px; }
    .slide .pg-addressbar {
      gap: 16px;
      padding: 13px 22px;
      font-size: 20px;
    }
    .slide .pg-addressbar .nav { gap: 10px; }
    .slide .pg-addressbar .nav svg { width: 22px; height: 22px; }
    .slide .pg-addressbar .url {
      border-radius: 999px;
      padding: 9px 22px;
      font-size: 19px;
      gap: 10px;
    }
    .slide .pg-addressbar .url .lock { width: 18px; height: 18px; }

    /* ---- Browser page surface (the rendered "site" inside the frame) ---- */
    .slide .pg-page { padding: 40px 46px; }

    /* ---- Editor: gutter + code + diff rows ---- */
    .slide .pg-editor .pg-body {
      font-size: 23px;
      line-height: 1.7;
      padding: 24px 0;
      grid-template-columns: 76px 1fr;   /* wider gutter for 2-digit lines */
    }
    .slide .pg-editor .gutter {
      padding-right: 20px;
      font-size: 21px;
    }
    .slide .pg-editor .code { padding: 0 28px; }
    .slide .pg-editor .code .ln { min-height: 1.7em; }

    /* ---- Flow stepper (used standalone, full-width under the title) ---- */
    .slide .pg-flow {
      border-radius: 22px;
      padding: 40px 44px;
    }
    .slide .pg-flow .steps { gap: 8px; margin-bottom: 34px; }
    .slide .pg-flow .step .num { font-size: 17px; }
    .slide .pg-flow .step .lbl { font-size: 22px; }
    .slide .pg-flow .step .bar { height: 5px; margin-top: 12px; }
    .slide .pg-flow .stage { min-height: 300px; }
    .slide .pg-flow .nav { margin-top: 28px; gap: 16px; }
    .slide .pg-flow .nav .caption { font-size: 21px; max-width: 70%; }
    .slide .pg-flow .nav button {
      border-radius: 12px;
      font-size: 20px;
      padding: 12px 24px;
    }

    /* ---- Corner tag overlay (e.g. "recreation" / "localhost") ---- */
    .slide .pg-frame .corner-tag {
      top: 18px; right: 18px;
      font-size: 15px;
      padding: 5px 11px;
      border-radius: 6px;
      letter-spacing: .10em;
    }
```

### Per-variant frame-height tweaks

The `600px` base suits terminal, browser, and editor. The **flow** component is *not* a
`.pg-frame` (it has no window chrome — it's a `.pg-flow` panel container), so it ignores
the `height:600px` rule and sizes to its content; the `min-height:300px` on its `.stage`
plus the steps/nav give it roughly `560px`, which is correct. If a specific slide's
terminal script is short (≤6 output lines), the Frontend Dev may shrink that one frame
with an inline `style="height:520px"` — but keep `560-620px` as the band so frames look
consistent across the deck.

---

## (b) `.s-visual` two-column layout modifier

Models the proven `.s-content-code` grid (index.html:171-176): text flexes on the left,
the frame column is a fixed track on the right. Use it on `s-highlight` / `s-content`
slides that gain a right-side frame (Slides 06, 12, 19). Add `s-visual` as a second class
on the `<section>` and wrap the existing eyebrow/title/bullets in `.col-text`, the frame
in `.col-visual`.

```css
    /* ═══════════════════════════════════════════════════════════════
       LAYOUT MODIFIER — text left, framed visual right (.s-visual)
       For s-highlight / s-content slides that gain a pg-* frame.
       Mirrors the s-content-code grid: text flexes, visual is a fixed
       track so it can never be squeezed below a legible size.
       ═══════════════════════════════════════════════════════════════ */
    .s-visual .stage-pad {
      display: grid;
      grid-template-columns: minmax(0, 1fr) 880px;  /* text flexes, frame FIXED */
      column-gap: 80px;
      align-content: center;
    }
    .s-visual .col-text   { min-width: 0; align-self: center; }
    .s-visual .col-visual { min-width: 0; align-self: center; }

    /* The frame fills the fixed track width; height comes from the
       slide-scale rule above (600px). */
    .s-visual .col-visual .pg-frame { width: 100%; }

    /* Keep the highlight/content type ramp, just trim the max-width so the
       headline wraps inside the left column instead of running under the frame. */
    .s-visual.s-highlight h2,
    .s-visual.s-content   h2 { max-width: 100%; }
    .s-visual .bullets       { max-width: 100%; }
```

**Why an `880px` fixed frame track:** the pad is `1568px` wide. `880 + 80` gap leaves
`608px` for the text column — enough for a 72px headline to wrap to 2-3 lines and bullets
to read at 30px. An `880px`-wide frame at `600px` tall is a ~1.47:1 window, a natural
terminal/browser proportion. If a slide's text is unusually long, the Frontend Dev can
drop the track to `820px` per-slide (`style="grid-template-columns:minmax(0,1fr) 820px"`),
but `880` is the deck default.

For **Slide 13** (already `s-compare`, full-width browser + flow stacked under the title)
do **not** use `.s-visual` — see the per-slide table note. For the `s-content-code` slides
that already have the grid, no modifier is needed: the Frontend Dev just replaces the
`<pre class="code">` with a `.pg-frame` and the existing `660px` track holds it (those
frames sit in a narrower `660px` track, so set `style="height:560px"` on them and they
read fine — the 660px track is pre-existing and proven).

---

## (c) Prop-relocation rule (right-side frame slides)

On any slide that gains a **right-side** frame (`.s-visual` slides 06/12/19, and the
`s-content-code` slides whose code column is on the right), the 3D prop must move **off the
right edge** so it never collides with the frame. Relocate it to `.prop-bl` (bottom-left).

### The wordmark-vs-prop check (important)

The wordmark sits at `left:176px; bottom:64px` (index.html:68-72). `.prop-bl` is anchored
`left:-150px; bottom:-150px` (index.html:104). A **460px** prop (the current default,
index.html:168/275) cropped from bottom-left spans:

- horizontally `-150px → 310px`
- vertically `bottom:-150px → bottom:310px`

That footprint **overlaps the wordmark** (which is at left:176, ~bottom:64-90). They fight.

**Rule:** on `.prop-bl` slides, shrink the prop to **`width:340px`** so its top edge lands
around `bottom:190px` — clear of the wordmark's cap height — and its right edge lands
around `left:190px`, only grazing the wordmark's start. Combined with the existing scrim
(the `text-shadow` halo on `.wm`, index.html:304-305) the wordmark stays fully legible.

Paste-ready:

```css
    /* ═══════════════════════════════════════════════════════════════
       PROP RELOCATION — slides with a right-side frame move the prop to
       bottom-left and shrink it so it clears the bottom-left wordmark.
       (Pair with the existing .wm text-shadow scrim for legibility.)
       ═══════════════════════════════════════════════════════════════ */
    .s-visual .prop-bl img,
    .has-right-frame .prop-bl img { width: 340px; }
```

Add the class `has-right-frame` to any `s-content-code` slide whose prop you move to
`prop-bl` (or just rely on `.s-visual .prop-bl img`). For `s-content-code` slides, an
alternative that needs **no** prop move: keep the prop in `prop-tr` but verify it bleeds
*behind* the code column cleanly — on the current deck the `prop-tr` props on those slides
already sit top-right at `460px` and the code track is `660px` wide on the right, so the
prop (anchored `right:-140 top:-120`) tucks into the top-right corner *above* the frame.
**Recommendation:** for `s-content-code` slides, **leave the prop in `prop-tr`** (it
already clears the code block — confirmed by the current rendered deck), and **only**
relocate to `prop-bl` on the three `.s-visual` slides (06, 12, 19) where the frame is
taller and centered. This minimizes churn and keeps one prop per slide bleeding cleanly.

### Slide 06 specifically (the named ask)

Slide 06's `prop-tr` `3d-cylinder-blue.png` currently "floats" (plan §1). Moving it to
`.prop-bl` at `340px` re-seats it as a clean bottom-left bleed and frees the entire
top-right for the Warp terminal frame. Keep the Warp mark near the eyebrow (Frontend Dev's
job per Phase B) — it is a small inline SVG badge, **not** a prop, so the one-prop rule
holds.

---

## (d) Per-slide visual plan

Component, layout class, frame theme, and prop placement for every content slide. Title /
section-divider / closing slides keep their existing prop and need no frame (their prop or
card grid *is* the visual). "Prop" column = final placement after this pass.

| # | Slide | Bg | Component | Layout class to add | Frame theme | Prop placement | Notes |
|---|---|---|---|---|---|---|---|
| 01 | Title | paper | — | (none) | — | `prop-tr` (keep) | Hero slide; no frame. |
| 02 | What is CC | paper | `pg-terminal` | `s-visual` | dark | `prop-bl` 340px | Right terminal: `claude` greeting → agentic read/edit/run loop. |
| 03 | Effort levels | **ink** | `pg-terminal` | `s-visual` | dark | `prop-bl` 340px | `/effort xhigh` tier switch. Dark slide + dark frame: keep the frame's `0 0 0 1px rgba(255,255,255,.07)` ring so it reads against the ink ground. |
| 04 | CLAUDE.md | paper | `pg-editor` | (keep `s-content-code`) | light | `prop-tr` (keep) | Replace `<pre>` in `col-code` with editor frame; set `style="height:560px"`. CLAUDE.md content + `/init`. |
| 05 | Auto memory | **ink** | `pg-editor` (or terminal) | (keep `s-content-code`) | dark | `prop-tr` (keep) | `MEMORY.md` index tree; `/memory`. Editor on dark theme. `style="height:520px"` (short content). |
| 06 | Warp | paper | `pg-terminal` (Warp titlebar) | `s-visual` | dark | `prop-bl` 340px | **Phase B.** Warp mark badge by eyebrow. Re-seat cylinder prop to bottom-left. |
| 07 | Divider | ink | — | (none) | — | `prop-tr` (keep) | Section divider; numeral + prop is the visual. |
| 08 | Brainstorming | paper | `pg-terminal` | (keep `s-content-code`) | dark | `prop-tr` (keep) | One-question-at-a-time Q&A → `spec.md`. `style="height:560px"`. |
| 09 | Writing plans | paper | `pg-editor` | (keep `s-content-code`) | dark | `prop-tr` (keep) | `plan.md` numbered TDD checklist with `[ ]` rows; diff/`cur` row styling optional. `style="height:560px"`. |
| 10 | TDD | paper | `pg-terminal` | (keep `s-content-code`) | dark | `prop-tr` (keep) | red → verify → green test run with `pg-cl-red`/`pg-cl-green` pips. `style="height:560px"`. |
| 11 | Verification | paper | `pg-terminal` | (keep `s-content-code`) | dark | `prop-tr` (keep) | `34/34 pass` evidence line; green pip. `style="height:520px"`. |
| 12 | Visual companion | paper | `pg-browser` | `s-visual` | light | `prop-bl` 340px | **Phase B.** A/B/C option cards w/ selected state; address bar = local mockup URL. `corner-tag` "recreation". |
| 13 | Claude Design + Figma | paper | `pg-browser` **+** `pg-flow` | **stays `s-compare`** | light | `prop-bl` 340px | **Phase B.** Browser (Claude Design canvas / UI-kit) in left col, 4-step `pg-flow` mini in right col. See note below — do **not** add `s-visual`. Move prop to `prop-bl` since the browser occupies the right column. |
| 14 | Claude in Chrome | paper | `pg-browser` (console) | (keep `s-content-code`) | light | `prop-tr` (keep) | Replace `<pre>` with a browser frame showing a devtools-console strip; `claude --chrome` / `/chrome`. `style="height:560px"`. |
| 15 | DevTools vs PW | paper | (optional compact `pg-terminal`) | stays `s-compare` | dark | `prop-tr` (keep) | Compare slide is dense already — **one** small supporting visual max, or none. Designer recommendation: **skip the frame here**, keep the two-column compare clean (the plan marks this optional). |
| 16 | Aspire/.NET MCP | paper | `pg-terminal` | (keep `s-content-code`) | dark | `prop-tr` (keep) | `dotnet_project build` / `test` run. `style="height:560px"`. |
| 17 | Azure + gh | paper | `pg-terminal` | stays `s-compare` | dark | `prop-tr` (keep) | `gh pr create` in one supporting frame **below** the two columns, or skip if it crowds — compare slides are tight. If used, place full-width under `.cols` and shrink to `style="height:300px"`. |
| 18 | Git worktrees | **ink** | `pg-terminal` | (keep `s-content-code`) | dark | `prop-tr` (keep) | `claude --worktree feature-auth`. `style="height:520px"`. |
| 19 | Team agents | paper | `pg-terminal` | `s-visual` | dark | `prop-bl` 340px | lead + teammate + `SendMessage` exchange. Right-side terminal. |
| 20 | Superpowers×teams | **ink** | `pg-browser` | `s-visual` | light | `prop-bl` 340px | GitHub issue #429 view (title, labels, "open" state). Light browser on ink ground reads well. |
| 21 | End-to-end | paper | — | (none) | — | `prop-tr` (keep) | Section divider. |
| 22 | E2E setup | paper | `pg-terminal` | (keep `s-content-code`) | dark | `prop-tr` (keep) | `npx devspiration init` + `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1`. Reuse the bundled `devspiration-init` script (playground.js:139). `style="height:560px"`. |
| 23 | E2E execution | paper | `pg-flow` | (keep `s-content-code`, or full-width) | n/a (flow has no frame) | `prop-tr` (keep) | brainstorm → plan → parallel build → verify, 4 steps. If the flow needs full width, switch the slide to a single-column variant and place flow below the bullets; otherwise it fits the `660px` `col-code` track. |
| 24 | Closing | paper | — | (keep card grid) | — | `prop-tr` (keep) | Card grid is the visual. |

### Layout-class summary

- **`.s-visual` (text-left / frame-right, prop → `prop-bl` 340px):** Slides **02, 03, 06, 19, 20**.
- **Keep `.s-content-code` grid (frame in existing right `col-code` track, prop stays `prop-tr`):** Slides **04, 05, 08, 09, 10, 11, 14, 16, 18, 22, 23**. Set `style="height:520-560px"` on these frames so they fit the `660px × ~560px` code track.
- **`.s-compare` (unchanged grid):** Slides **13** (browser+flow in the two columns, prop → `prop-bl`), **15** (recommend no frame), **17** (optional full-width terminal under the columns, prop stays `prop-tr`).
- **No frame (keep current prop in `prop-tr`):** Slides **01, 07, 21, 24**.

### Note on Slide 13 (why not `s-visual`)

Slide 13 is a `s-compare` (two equal columns under a shared head). The plan wants
**Claude Design foregrounded** (a `pg-browser` of the canvas/UI-kit) **plus** the 4-step
"set up your design system" `pg-flow`. Cleanest fit without a deck-wide renumber: keep the
`s-compare` shell, put the **browser frame in the left column** (`col` — Claude Design, the
headline) and the **`pg-flow` step strip in the right column** (the setup flow). Shrink
both to fit the `s-compare .cols` height: browser `style="height:440px"`, flow with
`min-height:240px` on its `.stage`. The Figma "code ↔ canvas" point becomes a one-line
caption under the browser or a third compact note — Frontend Dev to compose. Footer gains
the two Claude Design URLs (`·`-separated, as Slide 15 already does, index.html:748).
**Prop → `prop-bl` 340px** because the right column's flow extends toward the right edge.

---

## Auto-run hook (note for the Frontend Dev — not CSS, but it's the wiring this CSS assumes)

The slide-scale frames assume terminals type out *on slide-enter*. Wire it off the deck's
`slidechange` event (confirmed dispatched on `<deck-stage>`, `deck-stage.js:1102`, with
`detail.slide` / `detail.previousSlide`). Mirror the double-rAF in `wire-motion.js:28`:

```js
  // Auto-run a slide's terminal when it becomes active; reset the one we left.
  const stage = document.querySelector('deck-stage');
  stage?.addEventListener('slidechange', (e) => {
    const { slide, previousSlide } = e.detail;
    previousSlide?.querySelectorAll('.pg-terminal').forEach(t => t.reset && t.reset());
    if (!slide) return;
    // Honor reduced-motion: skip auto type-out, leave the static initial
    // body + the manual Run button. (The type-out is JS-driven, so it would
    // otherwise ignore prefers-reduced-motion.)
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    requestAnimationFrame(() => requestAnimationFrame(() => {
      slide.querySelectorAll('.pg-terminal[data-autorun="true"]')
           .forEach(t => t.run && t.run());
    }));
  });
```

Load `playground.css` (after `motion.css`) and `playground.js` (with the other deck
scripts at end of `<body>`) per Phase A. `playground.js boot()` auto-wires every
`.pg-terminal` / `.pg-flow` on load, so `t.run` / `t.reset` exist by the time the hook
fires. Keep the visible **Run / Reset** controls (`.pg-controls`) on every terminal for
manual replay regardless of auto-run.

**Reduced-motion:** the type-out is JS-driven (not CSS transitions), so `prefers-reduced-
motion` won't auto-disable it. Either gate the hook to skip auto-run under reduced-motion
(leaving the static initial body + a Run button), or keep auto-run but it's short. Designer
recommendation: **honor reduced-motion by skipping auto-run** and rendering the terminal's
*final* state statically (author the resting frame in the `.pg-body` markup so it's legible
without ever running). The Frontend Dev should confirm with QA which the audience prefers;
the CSS above supports either.
```
