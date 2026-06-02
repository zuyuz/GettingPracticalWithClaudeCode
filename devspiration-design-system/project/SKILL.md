---
name: devspiration-design
description: Use this skill to generate well-branded interfaces and assets for Devspiration — slide decks, microsites, and prototypes — either for production or throwaway mocks. Contains the brand's color palette, type system, 3D-object library, iconography, and a working sample deck.
user-invocable: true
---

# Devspiration design skill

This skill gives an agent everything needed to design on-brand for **Devspiration**, an IT company whose visual identity is built on glossy 3D plastic/glass objects, a single cobalt-blue, Nunito type, and bright neutral backgrounds.

## How to use this skill

1. **Read `README.md`** first — it is the single source of truth for voice, layout, and visual rules. It covers content fundamentals, visual foundations, and iconography in plain language with examples.
2. **Inspect `colors_and_type.css`** for the canonical color and type tokens. Copy this file into any new artifact you build; the tokens (`--ds-blue`, `--ds-ink`, `--ds-font-sans`, etc.) are designed to be linked directly.
3. **Browse `preview/`** to see what every token looks like rendered — palette swatches, type ramp, shadows, components, docs chrome, terminal/browser/editor frames.
4. **Open `presentation/index.html`** — the **primary surface**. A scrollable docs page with sidebar, TOC, code blocks, callouts. Copy any section block as the starting point for a new docs page.
5. **Open `playground/index.html`** — runnable terminals + a 4-frame flow (browser → terminal → editor → preview). Use these whenever a presentation needs to demo a workflow live.
6. **Open `slides/index.html`** to see the secondary PPTX-style deck — copy any `<section class="s-*">` block when you need a fixed 1920×1080 slide.
7. **Use `assets/`** for real artwork:
   - `assets/logo/` — the wordmark (light only; invert filter for dark backgrounds, see `preview/16-wordmark.html`).
   - `assets/brand-objects/` — 16 glossy 3D PNGs (cobalt-blue plastic + clear glass). One prop per slide, bleeding past one edge.
   - `assets/icons/` — 4 filled-SVG icons (book, document, flag, lightning). For broader icon needs, [Lucide](https://lucide.dev) is the documented substitute.

## When the user invokes this skill

If invoked **with no specific brief**, ask the user:
- What are they making — a deck, a single slide, a landing page, a prototype?
- Audience and tone — internal team, external prospect, partner?
- Any specific content they want included verbatim?
- Light or dark, or both?
- Approximate length / number of screens?

Then act as an expert designer following the rules in README.md and ship an HTML artifact.

## Hard rules (from the brand)

- **Two backgrounds only**: `#FFFFFF` (paper) or `#303030` (ink). No gradients, no photographic backgrounds.
- **One 3D prop per slide**, cropped past an edge. Never centered, never floating.
- **Nunito** for everything. 400 regular and 700 bold are the only weights in regular use; 800 for hero numerals.
- **Sentence case** for titles. All-caps reserved for eyebrows. No emoji. No exclamation marks.
- **The wordmark sits bottom-left** on every slide. Don't move it.
- **Don't invent new 3D props** — use the 16 in the library. If a new motif is needed, flag it for design review.
- **Don't tint icons blue** — icons are always pure ink or pure paper.

## If you're working in production code

Copy `colors_and_type.css` into your project and use the CSS variables directly. The whole file is framework-agnostic and works in React, Next.js, vanilla HTML, or anything that imports CSS. The token names also map cleanly to Tailwind v4's `@theme` directive — drop them into a `@theme` block to get `bg-ds-blue`, `text-ds-ink`, etc.

If a font file is required (offline builds), download Nunito from Google Fonts into `assets/fonts/` and replace the `@import` at the top of `colors_and_type.css` with `@font-face` declarations.
