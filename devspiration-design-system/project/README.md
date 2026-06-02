# Devspiration Design System

A design system extracted from Devspiration's official presentation template — built to scaffold static HTML presentations (with React / Next.js / Tailwind as needed) that look and feel like they were made by the Devspiration marketing team.

The goal of this system is to let any agent — Claude Code in particular — generate slide decks, microsites, and prototypes that stay on-brand without re-reading the template every time.

---

## Company context

**Devspiration** is an IT company. The brand's voice is professional but warm; the visual identity is dominated by **glossy, ultra-clean 3D objects in cobalt-blue plastic and clear glass**, set against bright neutral backgrounds. It looks closer to a modern hardware-launch keynote (Apple / Beats / Bose) than to a typical software services agency — confident, premium, light.

The wordmark is `devspiration`, lowercase, with a single bright-blue droplet/i-dot accent above the `d` — the only blue element in the otherwise charcoal logo. This droplet is the brand's tiniest, most distilled motif and reappears in the spherical and droplet 3D props.

### Products / surfaces in this system

The brief is **HTML presentations that feel like a docs page**, in the idiom of [code.claude.com/docs](https://code.claude.com/docs) — long, scrollable, navigable, with a sidebar, a right-hand table of contents, code blocks and callouts. The slide-deck template is the secondary surface; the docs page is primary.

1. **Docs-style presentation** (`presentation/index.html`) — **the primary surface**. Top nav, sticky left sidebar with grouped links, centred article column with H1/H2/H3 rhythm, sticky right-hand TOC, syntax-highlighted code blocks, four callout variants, card grids, tabs, breadcrumbs. Active section highlights in both the sidebar and the TOC as you scroll.
2. **Slide deck** (`slides/index.html`) — 1920×1080 layouts that mirror the original PPTX, retained for any project that still wants the keynote format. Same brand tokens, same prop library, same motion system.

There is no product app, no Figma file attached — see *Sources* below. If/when other surfaces appear, add a sibling folder following the same structure.

---

## Sources

| Source | Path / Link | Notes |
|---|---|---|
| Slide template | `source/Template for presentation.pptx` | Single .pptx file mounted locally as `Devspiration Claude Code Presentation/Template for presentation.pptx`. Author: Marta Shanaida; created 2023-05-11, last modified 2026-05-21. 10 slides, in Ukrainian. Title: "Гайд по створенню презентації у фірмовому стилі" — "Guide to creating a presentation in our brand style". |
| Extracted media | `source/media/image1–image21` | All 21 picture/icon assets pulled from the PPTX zip. |
| Extracted XML | `source/xml/*.xml` | Theme, slide-master, and per-slide XML for reference (colors and type sourced from `theme1.xml`). |
| Figma | *Not provided.* | If/when a Figma library is added, link it here. |
| Codebase | *Not provided.* | No product code attached. |

Do not assume readers have access to any of the above — every fact this system relies on has been mirrored into the project.

---

## Index — what lives where

```
README.md                  ← you are here
SKILL.md                   ← agent-skill entrypoint
colors_and_type.css        ← single source of truth for color + type tokens
motion.css                 ← entrance + ambient animations (glass-settle ease)
playground.css             ← terminal / browser / editor / flow window chrome
playground.js              ← typed-out terminal engine + flow stepper
presentation/
  index.html               ← PRIMARY surface: docs-style scrollable page
playground/
  index.html               ← runnable terminals + 4-frame context flow
preview/                   ← cards rendered into the Design System tab
  01-palette-blue.html
  …
  20-backgrounds.html      ← brand foundations
  21-docs-nav.html
  …
  26-docs-cards.html       ← docs-surface components
assets/
  logo/                    ← devspiration wordmark
  brand-objects/           ← 3D glass / plastic props (PNG, transparent)
  icons/                   ← outline SVG icons used in the template
slides/                    ← SECONDARY surface: PPTX-style 1920×1080 deck
  index.html
  deck-stage.js
  wire-motion.js           ← binds slidechange events to motion entrance classes
source/                    ← raw PPTX + extracted XML/media (reference only)
  Template for presentation.pptx
  media/                   ← unprocessed image dumps from the PPTX
  xml/                     ← theme + slide XML for verification
```

---

## Content fundamentals

### Voice & tone
The original template is in **Ukrainian** and reads as the marketing team speaking to colleagues: practical, slightly formal, never breezy. There is no humor and no slang. When translated and adapted, the voice should be:

- **Direct.** Short sentences. Subject + verb + result. Avoid hedging.
- **Helpful.** Phrasing is "here's how" rather than "you should". The template literally exists to *help colleagues stay on brand*.
- **Confident, not loud.** No exclamation marks, no superlatives ("absolutely!", "the best ever"). The visuals do the showing-off; the copy stays calm.
- **Professional second-person.** "You" is fine; the template uses formal Ukrainian "ви" (plural / respectful).

### Casing
- **Sentence case for titles.** The template's title is "Гайд по створенню презентації у фірмовому стилі" — only the first word capitalised. Follow this in English too: *"Guide to creating a branded presentation"*, not *"Guide To Creating A Branded Presentation"*.
- **All-caps reserved for eyebrows / labels**, tracked out ~0.14em, never longer than ~24 characters.
- **No Title Case** anywhere in body or buttons.

### Examples from the source

| Original (UK) | English adaptation |
|---|---|
| Гайд по створенню презентації у фірмовому стилі | Guide to creating a branded presentation |
| від команди маркетингу | from the marketing team |
| Заголовок (Nunito bold 18 pt) | Heading (Nunito Bold 18 pt) |
| Підзаголовок (Nunito bold 16 pt) | Subheading (Nunito Bold 16 pt) |
| You can use this colors for your graphics | (kept verbatim — appears in the source in English) |
| Some information about… | Use as caption placeholder, with an em-dash continuation |

### Emoji, punctuation, numerals
- **No emoji.** Anywhere. The 3D brand objects fill the role emoji play in lesser decks.
- **Em-dash for asides** (`—`), not double hyphens.
- **Curly quotes** (`“ ”`), not straight.
- **Numerals as figures** for 10+, words for *one* through *nine* in body copy; in slide titles always use figures (e.g. *"3 reasons"*).

---

## Visual foundations

### Colors
- Primary blue **`#1B9CF8`** — the brand's signature. Saturated, sky-leaning cobalt. Used for headlines that want emphasis, CTAs, the wordmark accent, and the body of most 3D props.
- Electric blue **`#0023FF`** — used sparingly: hyperlinks, hot accents, the deepest shadows on 3D props.
- Soft blue **`#8ACFF5`** — backgrounds for chart bars, light tinted blocks.
- Ink **`#303030`** — primary text; never pure black. Doubles as inverse surface for "dark mode" slides.
- Mist **`#F5F5F5`** — alternate background; used to break sections and to seat dark text against a non-white field.
- Paper **`#FFFFFF`** — default canvas.

Two background modes only: **paper** (white) and **ink** (#303030). The `3d-a-light` / `3d-a-dark` pair confirms this — the same prop is shot against both. No gradients, no off-whites.

### Type
- Family: **Nunito** (Google Fonts). Rounded humanist sans, friendly but not playful. The PPTX explicitly calls Nunito Bold 18pt for titles, Bold 16pt for subheads, Regular 16pt for body. We map those to a screen scale (16px base) and a slide scale (1920×1080 stage).
- **Two weights** in practice: **400 Regular** and **700 Bold**. 800 ExtraBold is reserved for hero numerals and the largest slide titles.
- Tracking is neutral. Hero / display gets `-0.02em` to tighten; all-caps eyebrows get `+0.14em` to breathe.

### Backgrounds
- Solid colour only — `#FFFFFF` or `#303030`. The template never uses gradients, never uses photographic backgrounds, never uses repeating patterns or textures.
- Visual interest comes from the **3D props bleeding off corners**: a piece of glass/plastic sits in the top-left, bottom-right, or full-side, cropped past the slide edge so you only see part of it. Copy occupies the empty diagonal.

### 3D object motif (the "library")
- Cobalt-blue plastic and clear glass, photographed (CGI-rendered) at a high gloss, soft studio lighting, contact shadow below.
- Shapes are simple geometric primitives: sphere, disc, donut, hexagon, plus, asterisk, cloud, cylinder, the letter `a`.
- They are always **3/4 view, never head-on**. Always **cropped past the slide edge**, never floating dead-centre.
- Two variants for each prop are common: blue plastic for light slides, clear glass for dark slides (and vice versa).

### Animation
- Brand feel is glassy and quiet — *settle*, not *bounce*.
- Easing: **`cubic-bezier(.16, 1, .3, 1)`** (a "settle" curve) for slide entrances and panel reveals; standard out-cubic for hovers.
- Durations: **140–280ms** for hovers, **560ms** for default entrances, **900ms** for hero entrances.
- No spring/wobble. No parallax. The 3D props can float gently (±14px / 14s) or rotate very slowly (~60s per turn) on landing slides; otherwise everything sits still.
- Fades + small (12–24px) translations are the default entrance.
- The full motion system lives in `motion.css` — a set of pre-state classes (`m-rise`, `m-fade-in`, `m-from-left`, `m-scale-in`, …) that animate to their resting state when their slide gets `[data-deck-active]`. `[data-stagger]` parents auto-delay each child by 80ms. `prefers-reduced-motion` collapses everything to a soft fade.
- Fades + small (8–16px) translations are the default entrance.

### Hover states
- **Buttons**: background shifts to a 6% darker tone (`color-mix(in srgb, … 94%, black)`). No scale, no shadow change.
- **Cards**: shadow steps up by one level (`--ds-shadow-2` → `--ds-shadow-3`); translate is *not* used.
- **Links**: underline (1px, currentColor) appears via `border-bottom` animation; colour shifts to electric blue.
- **3D props**: optional very slow rotation; never grow on hover.

### Press states
- Buttons: scale to `.98`, transition 80ms. No colour shift on press — the scale alone reads as tactile.

### Borders
- 1px hairlines in `--ds-line` (`#E6E6E6`) for dividers between sections of dense content (tables, cards, form inputs).
- Solid 2px in primary blue for active inputs and selected chips.
- The template itself is *almost border-less* — borders are an opt-in.

### Shadow systems
- Three UI shadows (`--ds-shadow-1/2/3`), all warm-grey at low alpha, no coloured tints.
- One **blue glow** shadow for primary CTAs (`--ds-shadow-blue`).
- One **contact shadow** for placing 3D props onto surfaces (`--ds-shadow-contact`) — a wide, soft, downward-only blur that mimics the studio render shadow.
- No inner shadows. No "neumorphic" double-shadow.

### Protection gradients vs capsules
- Use **solid blue pill capsules** to seat dark text against busy 3D-prop backgrounds. Pill radius is `999px`.
- Do **not** use protection gradients (translucent dark scrim under text on imagery) — they conflict with the bright-and-clean look.

### Layout rules
- Slides are **1920×1080** with a 96px margin (5% all sides).
- 12-column grid with 32px gutter on slides; 12-column / 24px on web.
- Headlines are left-aligned, **diagonal** to the 3D prop (prop bottom-right → text top-left, or vice versa).
- One 3D prop per slide is the rule. Two is the absolute max and only when they're sized very differently (one hero, one micro).
- The wordmark always sits in the **bottom-left**, ink-coloured, 24px tall on slides.

### Transparency & blur
- Almost never. The brand is solid, photographic, present.
- Acceptable uses: a 4–8% black tint over a dark slide for a quoted block; a 12px Gaussian blur on a brand object placed *behind* text to act as "atmosphere". Both are exceptions, not defaults.

### Corner radii
- Cards: **16px** (`--ds-radius-lg`).
- Buttons (default): **12px**.
- Pills / chips: full (`999px`).
- Inputs: **8px**.
- The 3D props themselves all have *organically* rounded corners — UI radii echo that softness but never go fully round on non-pill elements.

### Cards
- White surface, 16px radius, hairline border `--ds-line`, `--ds-shadow-2` elevation, 24px–32px internal padding. On dark slides, swap to ink-coloured surface with a 1px inner-glow border (`rgba(255,255,255,.08)`) and no shadow.
- Cards never get a colored left-border accent — that is explicitly off-brand.

### Imagery vibe
- All imagery is **the 3D prop library** plus the wordmark. There is no photography of people, no office shots, no abstract art. If a deck needs photography it should be **cool-leaning, high-key, with generous negative space** — but flag that it isn't in the canonical set.

---

## Iconography

The PPTX uses a small set of **monochrome, geometric, filled-with-cut-detail SVG icons** (book, document/page, flag, lightning-bolt). They sit in a 500-unit viewBox, are roughly 8% padded, rendered in pure `#000000`, and are *not* outlined — they're filled shapes with internal negative space for "detail" cuts (e.g. the lines on a book cover).

These four are mirrored 1:1 into `assets/icons/` and are the canonical icon set. They are sufficient for "what is this section about?" wayfinding but not for a full app UI.

**For broader icon needs** (arrows, chevrons, menus, toolbars) the closest CDN match in style and stroke philosophy is **[Lucide Icons](https://lucide.dev)** — modern, geometric, 24×24, 2px stroke. *Note: Lucide is line-only, while the brand set is filled — flagged as a substitution.* In high-fidelity work, prefer **filled** variants from Lucide (`-filled` modifiers when available) or **Phosphor Icons "Fill"** weight, which more closely matches the brand's filled-with-negative-space style.

**Rules:**
- Always render at pure `--ds-ink` (`#303030`) on light surfaces, pure `--ds-paper` on dark surfaces. Never colour the icons blue — blue is reserved for the 3D props.
- Sizes: **24px** in body, **32px** in section heads, **64px** as decorative.
- Emoji are **never used** as icons. Unicode glyphs (×, +, ★) are also avoided in favour of an SVG.
- Icon font: none in use; SVG is the format of record.

---

## What's missing / flagged for the user

1. **Font files**: I link Nunito from Google Fonts via `@import`. For a fully offline production build you'll want to download the Nunito TTFs into `assets/fonts/` and swap the `@import` for `@font-face` declarations.
2. **Lucide substitution**: the brand's 4-icon set is too small to cover a full app or web UI. I've documented Lucide (CDN) as the working substitute and flagged it as not-canonical.
3. **No product surfaces given**: this is a presentation-only brand at the moment. I did **not** invent a marketing-site UI kit — the source has only a slide template, and inventing web designs from screenshots violates the brand-fidelity rule. If a real site exists, attach it and I'll mirror it into `ui_kits/web/`.
4. **The PPTX is in Ukrainian.** I've translated key terms and given parallel English/Ukrainian copy in the sample slides. If your deliverable needs to remain in Ukrainian, swap copy 1:1 from `source/xml/`.
