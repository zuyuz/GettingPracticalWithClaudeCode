# Slide types and per-slide mapping — REDESIGN

Copy-paste-ready spec for `presentation/index.html`. This is a **full
redesign of the layout and visual language** to fix the legibility and
overflow bugs the lead found in a live 1920×1080 render — strictly inside
the existing Devspiration brand. The Frontend Developer implements this
file verbatim; it does not write HTML.

**What broke (and what this spec fixes):**

| Bug (observed) | Root cause | Fix in this spec |
|---|---|---|
| Slide 4 section is 1415px tall on a 1080px stage; clipped, collides with wordmark | No safe box; 5 bullets + long inline code overflow | §1 Safe box + §2 line-count budgets + §8 copy trims |
| Bullet text wraps ~1 word/line and overlaps itself | Long unbreakable inline `<code>` collapses its grid track to min-content | §5 inline-code wrap rule + move long paths to the code block |
| `.s-content-code` columns squeeze | `1fr 1fr` tracks have `min-width:auto`; the `<pre>` pushes past its track | §6 `minmax(0,…)` + fixed-width code panel |
| Title sphere (992×1014) covers the subtitle and the wordmark | Prop sized 1100px, anchored bottom-right over the text/chrome | §4 prop size cap ≤560px + placement outside the content box |
| `.src` / `.pg` unreadable (#8A8A8A ≈ 3.45:1) | `--ds-ink-3` used for real text | §3 contrast contract — retire `--ds-ink-3` for text |

**How the stage actually renders (verified against `deck-stage.js`):**

- `<deck-stage>` wraps a fixed **1920×1080** `.canvas` and scales the whole
  canvas with `transform: scale()` to fit the viewport. So 1080px is a
  **hard ceiling** — anything taller is clipped, never shrunk. The safe box
  in §1 is therefore authoritative, not advisory.
- `::slotted(*)` forces `overflow:hidden` on every section. Overflow does
  not scroll; it disappears. Budgets in §2 exist to guarantee fit.
- The controller toggles `[data-deck-active]` on the live section; motion
  classes in `motion.css` key off that. No JS changes are needed.
- There are **15** brand props (not 16). The full list is in §4.

Brand hard rules bind every archetype (`devspiration-design-system/project/SKILL.md`):
two backgrounds only (`#FFFFFF` paper / `#303030` ink), one 3D prop per
slide bleeding past an edge, Nunito everywhere (400 / 700 working weights,
800 for hero numerals only), sentence-case titles, all-caps eyebrows ≤24
chars tracked +0.14em, no emoji, no exclamation marks, wordmark
`devspiration` bottom-left on every slide, source URL in every footer,
icons never tinted blue. **Do not edit the `devspiration-design-system`
folder** — the deck links `colors_and_type.css` + `motion.css` and reuses
`deck-stage.js` + `wire-motion.js`. All changes live in
`presentation/index.html`.

---

## 1. Safe content box

The stage is 1920×1080. Define a fixed margin frame; **nothing renders
outside it except a prop's intentional off-edge bleed.**

```
┌──────────────────────────────────────────────────────────┐ 1920
│            ↑ 96px top margin                               │
│   ┌────────────────────────────────────────────────┐     │
│   │                                                  │     │
│   │   CONTENT BOX  1568 × 788                         │     │
│   │   left 176 · right 176 · top 96 · bottom 196      │     │
│   │                                                  │     │
│   └────────────────────────────────────────────────┘     │
│   devspiration              [src line]      ← chrome band  │
│                                  09 / 24                    │ 1080
└──────────────────────────────────────────────────────────┘
```

**Margins (exact px):**

| Edge | Margin | Notes |
|---|---|---|
| Top | **96px** | content top |
| Left | **176px** | content + wordmark left edge align |
| Right | **176px** | content + page-number right edge align |
| Bottom (content) | **196px** | content must end here; the 100px below is the chrome band |

**Usable content rectangle: `1568 × 788` px**, offset `(176, 96)` from
the top-left. Every archetype's content sits inside this box. Authors must
never place text below `y = 884` (= 1080 − 196).

**Reserved bottom chrome band — `y = 884 … 1080` (196px tall):**

| Element | Position | Token / size |
|---|---|---|
| Wordmark `.wm` | `left:176px; bottom:64px` | weight 800, 26px, see §3 |
| Page number `.pg` | `right:176px; bottom:64px` | mono, 22px, see §3 |
| Source `.src` | `right:176px; bottom:104px` | mono, 20px, above the page number, right-aligned, `max-width:1180px` |

The source line sits **directly above** the page number on the right (not
centered), so it never collides with the wordmark on the left even when the
URL is long.

**One shared inner wrapper.** Give every archetype's content a positioned
wrapper so text always wins the z-fight against the prop:

```css
/* Replaces the per-archetype padding scattered through the old build.
   One box. One source of truth. */
.slide > .stage-pad {
  position: absolute;
  left: 176px; top: 96px;
  width: 1568px;            /* 1920 − 176 − 176 */
  height: 788px;            /* 1080 − 96 − 196  */
  z-index: 2;               /* always above .prop (z-index:1) */
}
```

Archetypes below assume their content lives in `.stage-pad`. The chrome
elements (`.wm`, `.pg`, `.src`, `.prop`) are siblings of `.stage-pad`,
direct children of the `<section>`.

---

## 2. Type ramp per archetype

**Global rule: body text ≥ 30px.** (The old build used 26–28px for bullets,
which compounded the overflow once lines wrapped. 30px is the floor.)

Line-height for any multi-line text block is **1.35** unless noted. Each
budget is a **hard cap** — if copy exceeds it, trim the copy (see §8), do
not shrink the type.

### Eyebrow (all archetypes)
- 22px / weight 700 / tracking +0.14em / uppercase / 1 line / ≤24 chars
- Color: see §3 (electric blue on paper, brand blue on ink)
- `margin: 0 0 20px`

### Title (s-title)
| Role | Size / weight / lh | Budget |
|---|---|---|
| kicker | 30px / 700 / 1.2 | 1 line |
| h1 | **132px** / 800 / 0.98 | ≤3 lines, `max-width:1180px`, `text-wrap:balance` |
| sub | 32px / 400 / 1.35 | ≤2 lines, `max-width:880px` |

(h1 drops from the old 160px → 132px so three lines + kicker + subtitle fit
the 788px box with the sphere capped at 520px on the right.)

### Section Divider (s-section)
| Role | Size / weight / lh | Budget |
|---|---|---|
| chapter num `.num` | 320px / 400 / 1 (decorative, behind) | 1–2 digits |
| eyebrow | 24px / 700 | 1 line |
| h2 | **150px** / 800 / 0.95 | ≤2 lines, `max-width:1240px` |

(150px, down from 200px — 200px at 2 lines is 380px tall and crowded the
prop. 150px × 2 lines × 0.95 = 285px, centered in the box.)

### Content (s-content)
| Role | Size / weight / lh | Budget |
|---|---|---|
| eyebrow | 22px / 700 | 1 line |
| h2 | **72px** / 800 / 1.05 | ≤2 lines, `max-width:1120px` |
| lead | 30px / 400 / 1.4 | ≤2 lines, `max-width:1000px`, optional |
| bullets | **30px** / 400 / 1.35 | **≤4 bullets, each ≤2 lines**, gap 24px |

Vertical budget check: 72px h2 (2 lines ≈ 151) + 28 gap + 30px lead (2
lines ≈ 84) + 40 gap + 4 bullets (each 2 lines ≈ 81 + 24 gap ≈ 420) ≈ 743
< 788. Fits.

### Content+Code (s-content-code)
| Role | Size / weight / lh | Budget |
|---|---|---|
| eyebrow | 22px / 700 | 1 line |
| h2 | **64px** / 800 / 1.05 | ≤2 lines, fits left column (`minmax(0,1fr)`) |
| bullets | **30px** / 400 / 1.35 | **≤4 bullets, each ≤2 lines**, gap 22px |
| code `<pre>` | **22px** / 400 / 1.55 (mono) | **≤9 lines, each ≤44 chars** |

The code budget (≤9 lines × ≤44 chars) is the contract that keeps the panel
from overflowing its fixed width (§6) or its height. Comments inside code
count toward the 44-char line width. (44 derived from: JetBrains Mono advance
≈ 0.6em → 13.2px/char at 22px; the 660px panel minus 64px padding = 596px
content ÷ 13.2 ≈ 45 chars; 44 leaves a 1-char safety margin. If a slide
needs ~6 more chars per line, drop the code font to 20px → ~50 chars fit.)

### Two-Column Compare (s-compare)
| Role | Size / weight / lh | Budget |
|---|---|---|
| eyebrow (head) | 22px / 700 | 1 line |
| h2 (head) | **64px** / 800 / 1.05 | ≤2 lines |
| col-eyebrow | 18px / 700 / tracking +0.14em | 1 line, ≤22 chars |
| h3 (col) | 36px / 700 / 1.1 | ≤2 lines |
| col bullets | **30px** / 400 / 1.35 | **≤4 bullets per column, each ≤2 lines**, gap 18px |

### Feature Highlight (s-highlight)
| Role | Size / weight / lh | Budget |
|---|---|---|
| eyebrow | 22px / 700 | 1 line |
| h2 | **72px** / 800 / 1.05 | ≤2 lines |
| bullets | **30px** / 400 / 1.4 | **≤4 bullets, each ≤2 lines**, gap 22px |

(The old `.visual` tile + second prop is **removed** — see §4. Feature
Highlight is now single-prop like every other archetype, so the bullets get
the full right column and read at 30px without fighting a tile.)

### Closing (s-close)
| Role | Size / weight / lh | Budget |
|---|---|---|
| eyebrow | 24px / 700 | 1 line |
| h2 | **132px** / 800 / 0.98 | ≤2 lines |
| card title `b` | 26px / 700 / 1.15 | 1 line |
| card body `span` | **18px** / 400 / 1.4 | ≤3 lines (cards are chrome-scale, not body copy; 18px is acceptable here because there are 4 short cards, not a reading column) |

---

## 3. Contrast contract (WCAG AA)

Measured ratios (sRGB, computed): `--ds-ink` #303030 on paper = **13.2:1**;
`--ds-ink-2` #5A5A5A on paper = **6.9:1**; `--ds-ink-3` #8A8A8A on paper =
**3.45:1 (fails normal text)**; `--ds-blue` #1B9CF8 on paper = **2.93:1
(fails)**; `--ds-blue-electric` #0023FF on paper = **7.82:1**; `--ds-blue`
on ink = **4.5:1**; white on ink = **13.2:1**.

**Retire `--ds-ink-3` (#8A8A8A) for all real text.** It only clears AA for
large/bold text and was the cause of the unreadable chrome. Map every text
role to a passing token:

| Text role | Background | Token | Ratio | Was (bug) |
|---|---|---|---|---|
| Body, bullets, h2, h1 | paper | `--ds-ink` #303030 | 13.2 | ok |
| Lead / subtitle | paper | `--ds-ink-2` #5A5A5A | 6.9 | ok |
| Eyebrow | paper | **`--ds-blue-electric` #0023FF** | 7.82 | `--ds-blue` 2.93 ✗ |
| Source `.src` text | paper | **`--ds-ink-2` #5A5A5A** | 6.9 | `--ds-ink-3` 3.45 ✗ |
| Source `.src` link `<a>` | paper | `--ds-blue-electric` #0023FF | 7.82 | ok (keep) |
| Page number `.pg` | paper | **`--ds-ink-2` #5A5A5A** | 6.9 | `--ds-ink-3` 3.45 ✗ |
| Wordmark `.wm` | paper | `--ds-ink` #303030 @ opacity .60 → ≈ 6.0 | ≥4.5 | was .55 ≈ 3.45-ish; bump to .60 |
| col-eyebrow | paper | **`--ds-ink-2` #5A5A5A** | 6.9 | `--ds-ink-3` ✗ |
| Code comment `.cmt` | paper | **`--ds-ink-2` #5A5A5A** | 6.9 | `--ds-ink-3` ✗ |
| Code keyword `.kw` | paper | `--ds-blue-electric` #0023FF | 7.82 | was `--ds-blue` 2.93 ✗ |
| Card body | paper | `--ds-ink-2` #5A5A5A | 6.9 | ok |

**Dark slides (`.dark`, ink background #303030):**

| Text role | Token | Ratio |
|---|---|---|
| Body, bullets, h2 | `--ds-paper` #FFFFFF | 13.2 |
| Lead / subtitle | `rgba(255,255,255,.78)` ≈ #C6C6C6 | ≈ 8.1 |
| Eyebrow | `--ds-blue` #1B9CF8 | 4.5 (≥3 large; eyebrow is 700/22px → ok) |
| Source `.src` text | `rgba(255,255,255,.72)` ≈ #BFBFBF | 7.2 |
| Source `.src` link | `--ds-blue` #1B9CF8 | 4.5 |
| Page number `.pg` | `rgba(255,255,255,.72)` | 7.2 |
| Wordmark `.wm` | `--ds-paper` @ opacity .72 | 7.2 |
| Code comment `.cmt` | `rgba(255,255,255,.62)` ≈ #B3B3B3 | 6.3 (was .45 ≈ 4.6 — bumped for headroom) |
| Code keyword `.kw` | `--ds-blue` #1B9CF8 | 4.5 |
| chapter num `.num` | `rgba(255,255,255,.12)` — **decorative only**, not text content, exempt |

**Concrete CSS for the chrome (replaces the buggy block):**

```css
.wm {
  position: absolute; left: 176px; bottom: 64px;
  font-weight: 800; font-size: 26px; letter-spacing: -0.02em;
  color: var(--ds-ink); opacity: .60;             /* ≈ 6.0:1 */
}
.dark .wm { color: var(--ds-paper); opacity: .72; }

.pg {
  position: absolute; right: 176px; bottom: 64px;
  font-family: var(--ds-font-mono); font-size: 22px;
  color: var(--ds-ink-2);                          /* 6.9:1 — was ink-3 */
}
.dark .pg { color: rgba(255,255,255,.72); }

.src {
  position: absolute; right: 176px; bottom: 104px;
  font-family: var(--ds-font-mono); font-size: 20px;
  color: var(--ds-ink-2);                          /* 6.9:1 — was ink-3 */
  max-width: 1180px; text-align: right; line-height: 1.3;
}
.src a { color: var(--ds-blue-electric); border-bottom: 1px solid currentColor; }
.dark .src   { color: rgba(255,255,255,.72); }
.dark .src a { color: var(--ds-blue); }

.eyebrow {
  font-weight: 700; font-size: 22px; letter-spacing: 0.14em;
  text-transform: uppercase; color: var(--ds-blue-electric);  /* 7.82:1 */
}
.dark .eyebrow { color: var(--ds-blue); }          /* 4.5:1 on ink */
```

---

## 4. Prop discipline

**One prop per slide. Always.** The old Feature-Highlight two-prop exception
is removed — it was a legibility liability and is not worth the brand risk.

**Max visible size: the prop's `img` width is capped so its *visible* mass
sits OUTSIDE the content box.** Because props bleed past an edge, "visible
mass" ≈ 55–70% of the image. Caps below keep the visible portion off the
text:

| Archetype | `img` width | Rationale |
|---|---|---|
| Title | **520px** | sphere visible mass ≈ 360px in the bottom-right corner, clear of the 880px-wide text column and the chrome band |
| Section Divider | **560px** | larger because the slide is nearly empty; still clears the centered headline |
| Content / Content+Code / Compare / Highlight / Closing | **460px** | sits in a corner, clear of the content box |

**No prop `img` exceeds 560px.** (The old build used 850–1200px — that is
what put the prop on top of the text.)

**Placement rules:**

- Prop is `position:absolute`, `z-index:1` (always **below** `.stage-pad`'s
  `z-index:2` — a guarantee, not a hope).
- The prop bleeds past exactly one edge. Visible mass must land in a
  **corner the content does not occupy**:

| Class | Anchor (offsets) | Use when content is… |
|---|---|---|
| `prop-tr` | `right:-140px; top:-120px` | headline + bullets bottom-left |
| `prop-br` | `right:-150px; bottom:-150px` | headline top-left, content upper |
| `prop-bl` | `left:-150px; bottom:-150px` | content top-right / two columns |
| `prop-tl` | `left:-140px; top:-120px` | rare; right-aligned content only |

- **Never** place the prop behind a text column or over the chrome band
  (`y > 884` on the side where the wordmark/source sit). For bottom-anchored
  props on slides with content low in the box, prefer `prop-tr`/`prop-tl`.
- **Tone discipline:** paper slides use `-blue` / `-cyan` / `-black` /
  `-light` props; ink slides use `-glass` / `-clear` / `-dark` props.

**The 15 props** (`devspiration-design-system/project/assets/brand-objects/`):
`3d-a-dark`, `3d-a-light`, `3d-asterisk-black`, `3d-asterisk-blue`,
`3d-c-glass`, `3d-cloud-glass`, `3d-cylinder-blue`, `3d-disc-glass`,
`3d-donut-blue`, `3d-hex-blue`, `3d-pebble-cyan`, `3d-plus-blue`,
`3d-sphere-blue`, `3d-sphere-clear`, `3d-square-glass`.

```css
.prop { position: absolute; z-index: 1; pointer-events: none; user-select: none; }
.prop img { display: block; }
.prop-tr { right: -140px; top: -120px; }
.prop-br { right: -150px; bottom: -150px; }
.prop-bl { left: -150px; bottom: -150px; }
.prop-tl { left: -140px; top: -120px; }
```

---

## 5. Inline-code rule

The slide-4 break was an inline `<code>` holding a 540px-wide path inside a
grid track that collapsed to ~23px. Two-part fix:

**(a) Inline `<code>` must wrap and never hold a long token.** Add this rule
and use it for short inline tokens only:

```css
/* Inline code — short tokens only (≤ ~24 chars). */
:where(.bullets, .col, .lead) code {
  font-family: var(--ds-font-mono);
  font-size: 0.82em;                 /* smaller than body so it sits in-line */
  padding: 1px 6px;
  border-radius: 6px;
  background: var(--ds-mist);
  color: var(--ds-ink);
  overflow-wrap: anywhere;           /* may break inside the token */
  word-break: break-word;            /* legacy fallback */
  line-break: anywhere;
}
.dark :where(.bullets, .col, .lead) code {
  background: rgba(255,255,255,.10);
  color: var(--ds-paper);
}
```

**(b) Hard rule for the Frontend Developer:** any path, command, or token
**longer than ~24 characters belongs in the code block, not inline.** It is
a content decision, enforced per-slide in §8.

- ✗ `<code>~/.claude/projects/&lt;project&gt;/memory/</code>` inline (≈ 33 chars) — **move to the `<pre>` block**
- ✗ `<code>autoMemoryEnabled: false</code>` inline (24 chars, borderline) — acceptable, but prefer the block
- ✗ `<code>CLAUDE_CODE_DISABLE_AUTO_MEMORY=1</code>` (34 chars) — **drop from the bullet** or move to block
- ✓ `<code>/memory</code>`, `<code>/init</code>`, `<code>gh</code>`,
  `<code>.env</code>`, `<code>dotnet</code>`, `<code>SendMessage</code>`,
  `<code>xhigh</code>`, `<code>CLAUDE.md</code>` — short, stay inline

The `overflow-wrap:anywhere` rule is the safety net; the ≤24-char rule is
the discipline that means the net is never load-bearing.

---

## 6. Content+Code layout (no-squeeze)

Replace the fragile `grid-template-columns: 1fr 1fr` (each `1fr` track has
`min-width:auto`, so a wide `<pre>` pushes the column past its share and the
text column collapses). Use an explicit non-shrinking layout:

```css
.s-content-code .stage-pad {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 660px;   /* text flexes, code is FIXED */
  column-gap: 72px;
  align-content: center;        /* vertically centers the pair in the 788 box */
}
.s-content-code .col-text { min-width: 0; }       /* allow h2 to wrap, not overflow */
.s-content-code .col-code { min-width: 0; }

.s-content-code .code {
  width: 660px;                 /* matches the track; cannot be pushed wider */
  max-height: 560px;            /* ≤9 lines @ 22px/1.55 ≈ 306 + padding; cap guards regressions */
  box-sizing: border-box;
  background: var(--ds-mist);
  border: 1px solid var(--ds-line);
  border-radius: 16px;
  padding: 28px 32px;
  margin: 0;
  font-family: var(--ds-font-mono);
  font-size: 22px;
  line-height: 1.55;
  color: var(--ds-ink);
  white-space: pre;             /* code lines do NOT wrap … */
  overflow: hidden;             /* … and never scroll/overflow — §2 budget guarantees fit */
}
.dark .code {
  background: rgba(255,255,255,.06);
  color: var(--ds-paper);
  border-color: rgba(255,255,255,.10);
}
.code .cmt { color: var(--ds-ink-2); }            /* 6.9:1 */
.code .kw  { color: var(--ds-blue-electric); }    /* 7.82:1 */
.dark .code .cmt { color: rgba(255,255,255,.62); }
.dark .code .kw  { color: var(--ds-blue); }
```

**Key properties of this layout:**

- `minmax(0,1fr)` on the text track lets the headline **wrap** instead of
  forcing the track wider (the missing `min-width:0` was the squeeze bug).
- The code panel is a **fixed 660px** — it cannot be squeezed *or* expanded
  by its content. Content width = 660 − 64 padding = **596px**. JetBrains
  Mono advance ≈ 0.6em → 13.2px/char at 22px, so 596px fits ≈ 45 chars; the
  §2 budget caps lines at **44 chars** for a 1-char safety margin.
- `overflow:hidden` + `white-space:pre` means a stray long line is clipped,
  not allowed to blow out the layout. The §2 budget is what guarantees it
  never reaches the clip.
- **Stacked fallback** (for any slide whose code genuinely needs the full
  width — none in this deck, but documented): drop the grid to one column,
  put the `<pre>` full-width below the bullets at `max-width:1568px`, and cap
  bullets to 3. Trigger with a `.s-content-code.stacked` modifier:
  ```css
  .s-content-code.stacked .stage-pad { grid-template-columns: 1fr; row-gap: 40px; }
  .s-content-code.stacked .code { width: 100%; max-width: 1568px; }
  ```

---

## 7. The redesigned archetypes (HTML skeleton + CSS)

All archetypes wrap content in `<div class="stage-pad">` (§1) and place
`.wm`, `.pg`, `.src`, `.prop` as siblings. `PROP_PATH` =
`../devspiration-design-system/project/assets/brand-objects/`.

### Archetype 1 — Title (`s-title`)

```html
<section class="slide s-title" data-screen-label="01 Title">
  <div class="stage-pad">
    <div class="kicker m-rise-sm">Devspiration tech note</div>
    <h1 class="m-rise m-hero">Claude Code and<br>practical scenarios<br>for usage.</h1>
    <p class="sub m-rise-sm">A 30-minute tour of the agentic coding tool that lives in your terminal — foundations, workflow, orchestration, one end-to-end build.</p>
  </div>
  <div class="prop prop-br m-prop-settle"><img src="PROP_PATH3d-sphere-blue.png" alt=""></div>
  <span class="wm m-fade-in m-quick">devspiration</span>
  <span class="pg m-fade-in m-quick">01 / 24</span>
  <footer class="src m-fade-in m-quick">Source: <a href="https://claude.com/product/claude-code" target="_blank" rel="noopener">claude.com/product/claude-code</a></footer>
</section>
```

```css
.s-title .stage-pad { display: flex; flex-direction: column; justify-content: center; }
.s-title .kicker { font-weight: 700; font-size: 30px; color: var(--ds-blue-electric); margin: 0 0 40px; }
.s-title h1 {
  font-family: var(--ds-font-display); font-weight: 800; font-size: 132px;
  letter-spacing: -0.03em; line-height: .98; margin: 0; max-width: 1180px; text-wrap: balance;
}
.s-title .sub { font-size: 32px; color: var(--ds-ink-2); margin: 36px 0 0; max-width: 880px; line-height: 1.35; }
.s-title .prop img { width: 520px; }
```

The 520px sphere sits in the bottom-right corner; the text column is capped
at 1180px (h1) / 880px (sub), so the sphere's visible mass never reaches it
and the subtitle ends at `y ≈ 760`, well above the chrome band.

### Archetype 2 — Section Divider (`s-section`)

**De-orphaned: no chapter numeral.** The deck has exactly **two** dividers
(Superpowers + the E2E finale). A "02 / Section two" numeral implies a
1-2-3-4 sequence that does not exist, so the big `.num` numeral is
**dropped** on both dividers, replaced by a thematic non-numbered eyebrow.
Background is the designer's call per divider — here Superpowers is **ink**,
the E2E finale divider is **paper** (so it doesn't sit adjacent to the ink
#429 slide before it). The two dividers' exact eyebrows + headlines are in
§8.

```html
<section class="slide s-section dark" data-screen-label="07 Superpowers">
  <div class="stage-pad">
    <div class="content m-rise m-hero">
      <div class="eyebrow m-rise-sm">The agentic SDLC</div>
      <h2>Skills that turn good intentions into discipline.</h2>
    </div>
  </div>
  <div class="prop prop-br m-rise-prop"><img src="PROP_PATH3d-a-dark.png" alt=""></div>
  <span class="wm m-fade-in m-quick">devspiration</span>
  <span class="pg m-fade-in m-quick">07 / 24</span>
  <footer class="src m-fade-in m-quick">Source: <a href="https://github.com/obra/superpowers" target="_blank" rel="noopener">github.com/obra/superpowers</a></footer>
</section>
```

```css
.s-section .stage-pad { display: flex; flex-direction: column; justify-content: center; }
.s-section .content { position: relative; z-index: 2; }
.s-section .eyebrow { font-size: 24px; margin-bottom: 28px; }
.s-section h2 {
  font-family: var(--ds-font-display); font-weight: 800; font-size: 150px;
  letter-spacing: -0.03em; line-height: .95; margin: 0; max-width: 1240px;
}
.s-section .prop img { width: 560px; }
/* .num (the giant chapter numeral) is REMOVED — see the de-orphan note
   above. If a numbered-sections deck ever needs it back, it was:
   position:absolute; left:140px; top:40px; z-index:0; font:400 320px mono;
   color:rgba(255,255,255,.12) on ink. */
```

The divider headline (150px) carries the slide alone; the eyebrow names the
*theme* (not a number). On the **paper** E2E divider, the same `.s-section`
rules apply minus the `dark` class — eyebrow uses electric-blue and h2 uses
ink automatically via the §3 tokens.

### Archetype 3 — Content (`s-content`)

```html
<section class="slide s-content" data-screen-label="02 What is Claude Code">
  <div class="stage-pad">
    <div class="eyebrow m-rise-sm">Positioning</div>
    <h2 class="m-rise">An agentic coding tool that reads, edits, and ships from your terminal.</h2>
    <p class="lead m-rise-sm">One engine across terminal, IDEs, Desktop, and the browser — same memory, same settings everywhere.</p>
    <ul class="bullets m-rise" data-stagger>
      <li>Reads your codebase, edits across directories, runs the commands that verify the change</li>
      <li>Connects to external tools via MCP — Drive, Jira, browsers, your own services</li>
      <li>Writes commits, opens pull requests, runs in CI, pipes like any Unix tool</li>
      <li>The same <code>CLAUDE.md</code> and settings travel with the project everywhere</li>
    </ul>
  </div>
  <div class="prop prop-tr m-rise-prop"><img src="PROP_PATH3d-donut-blue.png" alt=""></div>
  <span class="wm m-fade-in m-quick">devspiration</span>
  <span class="pg m-fade-in m-quick">02 / 24</span>
  <footer class="src m-fade-in m-quick">Source: <a href="https://code.claude.com/docs/en/overview" target="_blank" rel="noopener">code.claude.com/docs/en/overview</a></footer>
</section>
```

(Note: `3d-cloud-glass` is **retired deck-wide** — it clips to a hard gray
box. Slide 2 uses `3d-donut-blue`; the old slide-20 cloud-glass → `c-glass`.)

```css
.s-content .stage-pad { display: flex; flex-direction: column; justify-content: center; }
.s-content h2 {
  font-family: var(--ds-font-display); font-weight: 800; font-size: 72px;
  letter-spacing: -0.02em; line-height: 1.05; margin: 20px 0 28px; max-width: 1120px;
}
.s-content .lead { font-size: 30px; color: var(--ds-ink-2); max-width: 1000px; line-height: 1.4; margin: 0 0 40px; }
.dark.s-content .lead { color: rgba(255,255,255,.78); }
.s-content .bullets { list-style: none; margin: 0; padding: 0; display: grid; gap: 24px; max-width: 1120px; }
.s-content .bullets li {
  display: grid; grid-template-columns: 16px 1fr; gap: 18px;
  align-items: start; font-size: 30px; line-height: 1.35; color: var(--ds-ink);
}
.s-content .bullets li::before {
  content: ""; width: 13px; height: 13px; border-radius: 999px;
  background: var(--ds-blue); margin-top: 12px;
}
.dark.s-content .bullets li { color: var(--ds-paper); }
.s-content .prop img { width: 460px; }
```

(`align-items:start` + `margin-top` on the dot — not `baseline` +
`translateY` — so the dot stays aligned to the first line when a bullet
wraps to 2 lines.)

### Archetype 4 — Content+Code (`s-content-code`)

```html
<section class="slide s-content-code" data-screen-label="03 CLAUDE.md">
  <div class="stage-pad">
    <div class="col-text m-from-left">
      <div class="eyebrow">Persistent context</div>
      <h2>CLAUDE.md — instructions that travel with the repo.</h2>
      <ul class="bullets" data-stagger>
        <li>Markdown at the project root, loaded into every session before the first prompt</li>
        <li>Four scopes load top-down: managed, user, project, local — closer files win ties</li>
        <li>Run <code>/init</code> to generate a starter file from your code</li>
        <li>Be specific: "Use 2-space indentation" beats "Format code properly"</li>
      </ul>
    </div>
    <pre class="code col-code m-from-right">your-project/
├── CLAUDE.md         <span class="cmt"># team-shared, in git</span>
├── CLAUDE.local.md   <span class="cmt"># personal, gitignored</span>
└── .claude/
    └── rules/
        └── api.md    <span class="cmt"># path-scoped rule</span></pre>
  </div>
  <div class="prop prop-br m-rise-prop"><img src="PROP_PATH3d-hex-blue.png" alt=""></div>
  <span class="wm m-fade-in m-quick">devspiration</span>
  <span class="pg m-fade-in m-quick">03 / 24</span>
  <footer class="src m-fade-in m-quick">Source: <a href="https://code.claude.com/docs/en/memory" target="_blank" rel="noopener">code.claude.com/docs/en/memory</a></footer>
</section>
```

CSS: the grid + `.code` block from §6, plus:

```css
.s-content-code h2 {
  font-family: var(--ds-font-display); font-weight: 800; font-size: 64px;
  letter-spacing: -0.02em; line-height: 1.05; margin: 16px 0 36px;
}
.s-content-code .bullets { list-style: none; margin: 0; padding: 0; display: grid; gap: 22px; }
.s-content-code .bullets li {
  display: grid; grid-template-columns: 14px 1fr; gap: 16px;
  align-items: start; font-size: 30px; line-height: 1.35; color: var(--ds-ink);
}
.s-content-code .bullets li::before {
  content: ""; width: 12px; height: 12px; border-radius: 999px;
  background: var(--ds-blue); margin-top: 11px;
}
.dark.s-content-code .bullets li { color: var(--ds-paper); }
.s-content-code .prop img { width: 460px; }
```

Note the code panel sits in the right (fixed 660px) track; the prop is
`prop-br`, behind the **bottom** of the panel, off the edge — it never
overlaps the text column. On `prop-tr` slides (8, 10, 16, 22) the prop goes
top-right; ensure the code panel's top doesn't collide — it won't, because
the prop's visible mass is in the corner and the panel starts at the
content-box top inside the 176px margin.

### Archetype 5 — Two-Column Compare (`s-compare`)

```html
<section class="slide s-compare" data-screen-label="15 Chrome vs Playwright">
  <div class="stage-pad">
    <div class="head">
      <div class="eyebrow m-rise-sm">Browser automation</div>
      <h2 class="m-rise">Chrome DevTools MCP or Playwright MCP?</h2>
    </div>
    <div class="cols">
      <div class="col m-from-left">
        <div class="col-eyebrow">For inspecting</div>
        <h3>Chrome DevTools MCP</h3>
        <ul data-stagger>
          <li>Drives your live Chrome or Edge tab</li>
          <li>Best for debugging, UI verification, audits</li>
          <li>Reuses your existing browser session</li>
          <li>Lower token cost</li>
        </ul>
      </div>
      <div class="col m-from-right">
        <div class="col-eyebrow">For scripting</div>
        <h3>Playwright MCP</h3>
        <ul data-stagger>
          <li>Headless, scripted, deterministic — runs in CI</li>
          <li>Best for long workflows and test suites</li>
          <li>Cross-browser: Chrome, Firefox, WebKit</li>
          <li>Engineered storage state for auth</li>
        </ul>
      </div>
    </div>
  </div>
  <div class="prop prop-bl m-rise-prop"><img src="PROP_PATH3d-disc-glass.png" alt=""></div>
  <span class="wm m-fade-in m-quick">devspiration</span>
  <span class="pg m-fade-in m-quick">15 / 24</span>
  <footer class="src m-fade-in m-quick">Source: <a href="https://github.com/microsoft/playwright-mcp" target="_blank" rel="noopener">github.com/microsoft/playwright-mcp</a></footer>
</section>
```

```css
.s-compare .stage-pad { display: grid; grid-template-rows: auto 1fr; row-gap: 56px; align-content: start; }
.s-compare .head h2 {
  font-family: var(--ds-font-display); font-weight: 800; font-size: 64px;
  letter-spacing: -0.02em; line-height: 1.05; margin: 16px 0 0; max-width: 1400px;
}
.s-compare .cols { display: grid; grid-template-columns: 1fr 1fr; column-gap: 96px; align-content: start; }
.s-compare .col { min-width: 0; }
.s-compare .col + .col { padding-left: 96px; border-left: 1px solid var(--ds-line); margin-left: -96px; }
.dark .s-compare .col + .col,
.s-compare.dark .col + .col { border-left-color: rgba(255,255,255,.14); }
.s-compare .col-eyebrow {
  font-weight: 700; font-size: 18px; letter-spacing: 0.14em; text-transform: uppercase;
  color: var(--ds-ink-2); margin-bottom: 10px;        /* 6.9:1 — was ink-3 */
}
.dark .s-compare .col-eyebrow { color: rgba(255,255,255,.72); }
.s-compare .col h3 { font-weight: 700; font-size: 36px; line-height: 1.1; margin: 0 0 24px; letter-spacing: -0.01em; }
.s-compare .col ul { list-style: none; margin: 0; padding: 0; display: grid; gap: 18px; }
.s-compare .col li {
  display: grid; grid-template-columns: 13px 1fr; gap: 16px;
  align-items: start; font-size: 30px; line-height: 1.35;
}
.s-compare .col li::before {
  content: ""; width: 11px; height: 11px; border-radius: 999px;
  background: var(--ds-blue); margin-top: 11px;
}
.s-compare .prop img { width: 460px; }
```

### Archetype 6 — Feature Highlight (`s-highlight`)

Single-prop, single-column-of-text-with-a-wide-bleeding-prop. (The `.visual`
tile is gone.) Visually distinct from Content by the larger prop bleed and
the shorter, punchier copy.

```html
<section class="slide s-highlight" data-screen-label="05 Warp terminal">
  <div class="stage-pad">
    <div class="eyebrow m-rise-sm">Your terminal matters</div>
    <h2 class="m-rise">A modern terminal turns Claude Code into a workbench.</h2>
    <ul class="bullets m-rise" data-stagger>
      <li>Agent notifications fire when Claude needs approval — no cursor-watching</li>
      <li>Rich editor for long prompts; send inline review comments to the agent</li>
      <li>Attach selected snippets as context — no copy-paste gymnastics</li>
      <li>Share sessions with teammates for over-the-shoulder reviews</li>
    </ul>
  </div>
  <div class="prop prop-br m-rise-prop"><img src="PROP_PATH3d-cylinder-blue.png" alt=""></div>
  <span class="wm m-fade-in m-quick">devspiration</span>
  <span class="pg m-fade-in m-quick">05 / 24</span>
  <footer class="src m-fade-in m-quick">Source: <a href="https://docs.warp.dev/agent-platform/cli-agents/claude-code" target="_blank" rel="noopener">docs.warp.dev/agent-platform/cli-agents/claude-code</a></footer>
</section>
```

```css
.s-highlight .stage-pad { display: flex; flex-direction: column; justify-content: center; }
.s-highlight h2 {
  font-family: var(--ds-font-display); font-weight: 800; font-size: 72px;
  letter-spacing: -0.02em; line-height: 1.05; margin: 20px 0 36px; max-width: 1180px;
}
.s-highlight .bullets { list-style: none; margin: 0; padding: 0; display: grid; gap: 22px; max-width: 1180px; }
.s-highlight .bullets li {
  display: grid; grid-template-columns: 15px 1fr; gap: 18px;
  align-items: start; font-size: 30px; line-height: 1.4;
}
.s-highlight .bullets li b { font-weight: 700; }
.s-highlight .bullets li::before {
  content: ""; width: 13px; height: 13px; border-radius: 999px;
  background: var(--ds-blue); margin-top: 13px;
}
.dark.s-highlight .bullets li { color: var(--ds-paper); }
.s-highlight .prop img { width: 460px; }
```

### Archetype 7 — Closing (`s-close`)

```html
<section class="slide s-close" data-screen-label="23 Closing">
  <div class="stage-pad">
    <div class="eyebrow m-rise-sm">Thank you</div>
    <h2 class="m-rise m-hero">Now go ship your own scenarios.</h2>
    <div class="grid" data-stagger>
      <div class="card m-rise-sm">
        <img src="../devspiration-design-system/project/assets/icons/icon-book.svg" alt="">
        <b>Read the docs</b><span>code.claude.com/docs — the reference for every feature shown today.</span>
      </div>
      <div class="card m-rise-sm">
        <img src="../devspiration-design-system/project/assets/icons/icon-document.svg" alt="">
        <b>Install superpowers</b><span>github.com/obra/superpowers — the skills library used in the talk.</span>
      </div>
      <div class="card m-rise-sm">
        <img src="../devspiration-design-system/project/assets/icons/icon-flag.svg" alt="">
        <b>Try team agents</b><span>code.claude.com/docs/en/agent-teams — and read issue #429.</span>
      </div>
      <div class="card m-rise-sm">
        <img src="../devspiration-design-system/project/assets/icons/icon-lightning.svg" alt="">
        <b>Ship a deck</b><span>Open presentation/index.html and replace the content.</span>
      </div>
    </div>
  </div>
  <div class="prop prop-br m-rise-prop"><img src="PROP_PATH3d-asterisk-blue.png" alt=""></div>
  <span class="wm m-fade-in m-quick">devspiration</span>
  <span class="pg m-fade-in m-quick">23 / 24</span>
  <footer class="src m-fade-in m-quick">Source: aggregated — see <a href="https://code.claude.com/docs/en/overview" target="_blank" rel="noopener">code.claude.com/docs</a></footer>
</section>
```

```css
.s-close .stage-pad { display: grid; grid-template-rows: auto auto 1fr; row-gap: 44px; align-content: start; }
.s-close h2 {
  font-family: var(--ds-font-display); font-weight: 800; font-size: 132px;
  letter-spacing: -0.03em; line-height: .98; margin: 16px 0 0;
}
.s-close .grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 28px; align-self: end; }
.s-close .card {
  background: var(--ds-mist); border-radius: 20px; padding: 28px;
  display: grid; gap: 14px; align-content: start; min-height: 210px;
}
.s-close .card img { width: 52px; height: 52px; }     /* pure ink — never blue */
.s-close .card b { font-weight: 700; font-size: 26px; line-height: 1.15; letter-spacing: -0.01em; }
.s-close .card span { font-size: 18px; color: var(--ds-ink-2); line-height: 1.4; }   /* 6.9:1 */
.s-close .prop img { width: 460px; }
```

The h2 drops to 132px (from 180) so the 4-card row clears the 788 box: 132px
× 2 lines × 0.98 ≈ 259 + 44 gap + 210 card ≈ 513 < 788. The prop at 460px
behind the bottom-right card bleeds off-edge and reads as a quiet brand
sign-off, no longer covering text.

---

## 8. Per-slide table — final 24-slide order

**This deck is now 24 slides** (was 23): two content slides were reordered
and one new divider was inserted before the end-to-end finale. Background is
chosen per slide for legibility; prop tone matches background. The **New #**
column is the order the Frontend Developer builds in; **(old #)** maps back
to the previous build / the content briefs in `content/SLIDE-NN.md`.

**Structural changes folded in:**
- **/effort & xhigh** moves from old-#11 into foundations as **new #3**,
  right after "What is Claude Code". It **stays ink** — sitting between
  paper slides 2 and 4 (CLAUDE.md), it reads as a clean ink singleton with
  no adjacent ink. (Placing it after Warp would have put it next to the ink
  Superpowers divider — two adjacent ink slides — so #3 is the better slot.)
- **Azure DevOps + gh** moves to sit right after **Aspire/.NET MCP** (new
  #17), so **Git worktrees → Team agents** becomes contiguous (new #18 → 19).
- **New E2E divider** inserted as **new #21**, before "E2E setup". It is
  **paper** (the slide before it, #429, is ink — paper avoids adjacent ink)
  with prop `3d-cylinder-blue`, prop-br.
- **Dividers de-orphaned:** the "02 / Section two" numeral is dropped on
  both dividers (there is no 1-2-3-4 sequence). Each divider gets a thematic
  non-numbered eyebrow (copy in the table + §8 divider note).

| New # | Slide (old #) | Archetype | Bg | Prop | Edge | Copy-trim / change note |
|---|---|---|---|---|---|---|
| 1 | Title (1) | Title | paper | 3d-sphere-blue | **tr** | Subtitle ≤2 lines / ~140 chars. **v2: br→tr** — page number was sitting on the bright sphere; left-anchored title clears the top-right sphere |
| 2 | What is Claude Code (2) | Content | paper | **3d-donut-blue** | tr | 4 bullets; bullet 1 → "Reads your codebase, edits across dirs, runs the verifying commands". **Asset swap cloud-glass→donut-blue** (cloud-glass clips to a gray box) |
| 3 | /effort & xhigh (11) | Feature Highlight | **ink** | 3d-disc-glass | **tr** | **MOVED into foundations.** Remove `.visual` tile. Keep `<b>low, medium, high, xhigh, max</b>` + inline `<code>xhigh</code>`, `<code>/effort &lt;level&gt;</code>. Ink singleton (paper on both sides). **Edge tr** — highlight text is left-anchored, so a top-right prop clears it and the chrome |
| 4 | CLAUDE.md (3) | Content+Code | paper | 3d-hex-blue | br | 4 bullets. Code: `api.md` comment → "# path-scoped rule" (≤44 chars); h2 wraps to 2 lines at 64px |
| 5 | Auto memory (4) | Content+Code | **ink** | 3d-sphere-clear | tr | **THE ORIGINAL BREAK** (see §9 worked example). 4 bullets; **path moves out of bullet 1 into the code block**; drop `CLAUDE_CODE_DISABLE_AUTO_MEMORY=1`. **v2 edge tr** |
| 6 | Warp terminal (5) | Feature Highlight | paper | 3d-cylinder-blue | br | Remove `.visual` tile. 4 bullets; bullet 2 ≤2 lines |
| 7 | DIVIDER · Superpowers (6) | Section Divider | ink | 3d-a-dark | br | **No numeral.** Eyebrow `THE AGENTIC SDLC`; headline "Skills that turn good intentions into discipline." (≤2 lines @150px) |
| 8 | Brainstorming (7) | Content+Code | paper | 3d-donut-blue | br | 4 bullets. **Move `docs/superpowers/specs/<topic>-design.md` out of bullet 4** → "Artefact: a design spec committed to the repo"; show path in code block |
| 9 | Writing-plans (8) | Content+Code | paper | 3d-pebble-cyan | tr | 4 bullets; code ≤9 lines (current 5 — fine) |
| 10 | TDD (9) | Content+Code | paper | 3d-plus-blue | **tr** | 4 bullets; code 5 lines. **v2: br→tr** (prop clipped the page number) |
| 11 | Verification (10) | Content+Code | paper | 3d-asterisk-black | tr | 4 bullets. Code lines ≤44 chars — shorten comments ("does NOT prove the build compiles" → "≠ build compiles") |
| 12 | Visual planning (12) | Feature Highlight | paper | 3d-cylinder-blue | br | Remove `.visual` tile. Reword bullet 4 to drop `state_dir/events`; keep `screen_dir` inline |
| 13 | Figma MCP (13) | Two-Column Compare | paper | 3d-sphere-blue | **tr** | 3 bullets/col. **v2: bl→tr** — bottom-left prop hit the left column's bottom + wordmark; left-weighted head means tr clears both |
| 14 | Chrome DevTools MCP (14) | Content+Code | paper | 3d-c-glass | br | 4 bullets; code 4 lines (`claude --chrome` / `/chrome`) |
| 15 | Chrome vs Playwright (15) | Two-Column Compare | paper | 3d-disc-glass | **tr** | 4 bullets/col ≤2 lines. **v2: bl→tr** (same Compare collision as 13); disc-glass unchanged |
| 16 | Aspire / .NET MCP (16) | Content+Code | paper | 3d-hex-blue | tr | 4 bullets. Code lines >44 chars — trim comments (`create | build | test | run | publish` → `create · build · test · run`) |
| 17 | Azure DevOps + gh (18) | Two-Column Compare | paper | 3d-pebble-cyan | **tr** | **MOVED after Aspire.** 3 bullets/col. Keep `gh`, `az devops` short inline tokens. **Edge tr** — same Compare archetype as #13/#15, which collided at bl; tr is the collision-safe match |
| 18 | Git worktrees (17) | Content+Code | **ink** | 3d-square-glass | **tr** | **WORST collision — placement fix, not scrim.** 4 bullets; **move `.claude/worktrees/<name>/` + `worktree-<name>` out of bullet 3**; keep `.worktreeinclude` + `.env` inline. **v2 edge tr** — bright glass prop was behind the source URL + page number, citation unreadable |
| 19 | Team agents (19) | Feature Highlight | paper | 3d-plus-blue | br | Remove `.visual` tile. 4 bullets; keep `<code>SendMessage</code>` inline; bullet 1 ≤2 lines |
| 20 | #429 caveat (20) | **Content (s-content dark)** | ink | **3d-c-glass** | **tr** | **Already a Content slide** (converted in an earlier content pass): 3 reframe bullets, NOT a divider. **Asset swap cloud-glass→c-glass** (cloud-glass clips to a bright box on ink). **v2 edge tr** |
| 21 | DIVIDER · End-to-end (NEW) | Section Divider | **paper** | 3d-cylinder-blue | **tr** | **NEW SLIDE.** No numeral. Eyebrow `PUTTING IT TOGETHER`; headline "How this very deck got built." (1 line). Paper so it isn't adjacent-ink to #429. **Edge tr** — a bright cylinder bleeding bottom-right would sit under the source/page (like slide 1's sphere); tr keeps it off the chrome. Source footer: `https://code.claude.com/docs/en/agent-teams` |
| 22 | E2E setup (21) | Content+Code | paper | 3d-donut-blue | br | 4 bullets. Code tree 6 lines, trim comments ≤44 chars |
| 23 | E2E execution (22) | Content+Code | paper | 3d-a-light | tr | **5 bullets → 4** (fold "Review subagents…" into a code comment or drop). Code 6 lines, comments ≤44 chars |
| 24 | Resources + closing (23) | Closing | paper | 3d-asterisk-blue | br | h2 → 132px. 4 cards, body ≤3 lines each |

### Two divider eyebrows + headlines

Both are non-numbered (the numeral is dropped — see Archetype 2). Headlines
are sentence-case, no exclamation, ≤2 lines at 150px.

| Divider | New # | Bg | Eyebrow (≤24 chars, all-caps via CSS) | Headline |
|---|---|---|---|---|
| Superpowers | 7 | ink | `THE AGENTIC SDLC` (16) | Skills that turn good intentions into discipline. |
| End-to-end | 21 | paper | `PUTTING IT TOGETHER` (19) | How this very deck got built. |

(The #429 slide at #20 is a **Content slide** (`s-content dark`, 3 reframe
bullets), converted in an earlier content pass — **not** a divider. So the
deck has exactly two dividers, #7 and #21, both in the table above.)

### Background rhythm (paper vs ink)

Ink slides (5 total): **3** (/effort), **5** (Auto memory), **7**
(Superpowers divider), **18** (Git worktrees), **20** (#429 — Content slide,
`s-content dark`). All five use `-glass` / `-clear` / `-dark` props. The
other 19 are paper with
`-blue` / `-cyan` / `-black` / `-light` props (plus the two intentional
glass-on-paper accents on 14/15, carried from the existing build). **No two
ink slides are adjacent** (3↔5 split by 4; 5↔7 split by 6; 7↔18 far; 18↔20
split by 19).

### Adjacency check (no two neighbours share a prop) — re-verified for 24

1 sphere-blue → 2 donut-blue → 3 disc-glass → 4 hex-blue → 5 sphere-clear →
6 cylinder-blue → 7 a-dark → 8 donut-blue → 9 pebble-cyan → 10 plus-blue →
11 asterisk-black → 12 cylinder-blue → 13 sphere-blue → 14 c-glass → 15
disc-glass → 16 hex-blue → 17 pebble-cyan → 18 square-glass → 19 plus-blue →
20 c-glass → 21 cylinder-blue → 22 donut-blue → 23 a-light → 24
asterisk-blue. **No adjacent pair repeats** (machine-checked). Every reuse
is ≥2 slides apart and tone-matched. **cloud-glass is fully retired**
(replaced by donut-blue on #2 paper, c-glass on #20 ink).

**Prop-placement v2 — chrome-collision fix.** Bottom-anchored props were
colliding with the footer chrome (source URL / page number / wordmark);
top-corner props (`prop-tr`) render clean against the bottom band (proven on
the old 4/8/10). Slides moved to `prop-tr`: **#1 Title, #10 TDD, #13 Figma,
#15 Chrome-vs-Playwright, #18 Worktrees** (plus #5 Auto memory and #20 #429
already tr). The fix is **placement, not a scrim** — a text-shadow scrim
fails over a bright glass prop.

### Hard-rule cross-check (every row)

- 24 slides total — yes (was 23: +1 new E2E divider at #21).
- Background ∈ {paper, ink} — yes; no two ink slides adjacent (ink at #3, 5,
  7, 18, 20).
- Exactly one corner-bleeding prop per slide — yes (the two-prop Feature
  Highlight exception is **removed**; `.visual` tiles deleted on the Feature
  Highlight slides #3, 6, 12, 19).
- Prop tone matches background — yes (`-glass/-clear/-dark` only on ink rows
  #3, 5, 7, 18, 20; the glass-on-paper accents on #14/#15 are intentional,
  carried from the existing build).
- Prop `img` ≤ 560px, visible mass outside the content box — yes (§4 caps).
- Wordmark bottom-left + source in footer on every slide — yes (every §7
  skeleton includes `.wm` + `.src`; #24 Closing uses "aggregated" copy; the
  new #21 divider cites `code.claude.com/docs/en/agent-teams`).
- No two adjacent slides share a prop — yes (machine-checked, §8 chain).
- cloud-glass fully retired — yes (donut-blue on #2, c-glass on #20).
- Dividers de-orphaned — yes (no chapter numeral; thematic eyebrows on #7
  and the new #21).
- Sentence-case headlines, no emoji, no exclamation marks — yes.
- Eyebrows ≤24 chars, uppercased via CSS — yes (`THE AGENTIC SDLC` 16,
  `PUTTING IT TOGETHER` 19).
- Body text ≥30px, contrast ≥ AA (§3 tokens) — yes.
- Inline code never holds a >24-char token (§5) — enforced by the copy-trim
  notes on #5, 8, 12, 18.

---

## 9. Worked example — Auto memory (the original break), rebuilt to spec

This is the slide that overflowed by 335px (old #4, **now #5** in the
reordered deck). Here it is rebuilt against every rule above, as a
copy-paste target. Note: 4 bullets (was 5), **no long path inline** (moved
to the code block), all code lines ≤44 chars, `prop-tr` (was `prop-br`,
which collided with the wordmark), ink contrast tokens.

```html
<section class="slide s-content-code dark" data-screen-label="05 Auto memory">
  <div class="stage-pad">
    <div class="col-text m-from-left">
      <div class="eyebrow">Auto memory</div>
      <h2>Claude takes notes between sessions.</h2>
      <ul class="bullets" data-stagger>
        <li>A per-repo memory directory with a <code>MEMORY.md</code> index</li>
        <li><code>MEMORY.md</code>'s first 200 lines load every session; topics load on demand</li>
        <li>Claude keeps what matters — build commands, gotchas, your stated preferences</li>
        <li>Toggle with <code>/memory</code>, or set <code>autoMemoryEnabled: false</code></li>
      </ul>
    </div>
    <pre class="code col-code m-from-right">~/.claude/projects/&lt;proj&gt;/memory/
├── MEMORY.md     <span class="cmt"># index, every session</span>
├── debugging.md  <span class="cmt"># loads on demand</span>
└── api-rules.md</pre>
  </div>
  <div class="prop prop-tr m-rise-prop"><img src="PROP_PATH3d-sphere-clear.png" alt=""></div>
  <span class="wm m-fade-in m-quick">devspiration</span>
  <span class="pg m-fade-in m-quick">04 / 24</span>
  <footer class="src m-fade-in m-quick">Source: <a href="https://code.claude.com/docs/en/memory" target="_blank" rel="noopener">code.claude.com/docs/en/memory</a></footer>
</section>
```

Code-line widths (rendered, tags stripped): `~/.claude/projects/<proj>/memory/`
= 33, `├── MEMORY.md     # index, every session` = 40, `├── debugging.md  #
loads on demand` = 35, `└── api-rules.md` = 16 — all ≤44. The path that broke
the layout now lives only in the `<pre>`, where `white-space:pre` +
`overflow:hidden` (§6) contain it. Bullet 1 carries the *idea* without the
path, so its inline `<code>` is just `MEMORY.md` (9 chars).

Apply the same move-the-path discipline to slides **7** (`docs/superpowers/
specs/<topic>-design.md` → code block), **12** (drop `state_dir/events` from
the bullet), and **17** (`.claude/worktrees/<name>/` + `worktree-<name>` →
code block).