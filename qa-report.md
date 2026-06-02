# QA report — devspiration-talk deck

**Date:** 2026-05-24 13:45
**Verdict:** PASS-WITH-CAVEATS

**Headline:** the final deliverable (`presentation/index.html`) is brand-compliant, structurally sound, and every cited source returns HTTP 200. The only material finding is a single emoji (`✗`) left over in a process-artefact content brief (`content/SLIDE-10.md`), which is **not** carried into the rendered slide. Browser-side verification (console, keyboard nav, viewport scaling) could not be exercised because the chrome-devtools-mcp profile was already locked by another instance.

---

## 12-point checklist

1. **PASS** — Browser-open simulation (static lint). HTML is well-formed: all 91 `<div>`, 97 `<span>`, 23 `<section>`, 23 `<a>`, 22 `<h2>`, 23 `<footer>`, 11 `<pre>`, 22 `<ul>`, 85 `<li>` tags open and close in matching counts. No `href="#"` or empty `href`. No `!important`. Two stylesheets and two scripts referenced via relative paths under `../devspiration-design-system/project/` — all targets exist on disk (`colors_and_type.css`, `motion.css`, `slides/deck-stage.js`, `slides/wire-motion.js`). All 15 preloaded brand-prop PNGs exist in `assets/brand-objects/`. Closing-slide icons (`icon-book.svg`, `icon-document.svg`, `icon-flag.svg`, `icon-lightning.svg`) all exist in `assets/icons/`.

2. **PASS** — Slide controller. Exactly one `<deck-stage width="1920" height="1080">` at line 460, one `</deck-stage>` at line 1123, deck-stage.js linked at line 1125, wire-motion.js at line 1126. `awk` slice between the tags shows exactly 23 sections at the direct-child indent (2-space leading), with all `<div>` descendants at 4-space — confirming no wrapper elements between deck-stage and its sections.

3. **PASS** — Source links. Every slide has a `<footer class="src ...">` containing literal `Source:` text and exactly one `<a href="https://…">`. 23 footers, 23 `Source:` strings, 23 `<a>` tags. No placeholder hrefs.

4. **PASS** — 23 sections inside `<deck-stage>` (verified via `awk` range + `grep -c '^  <section'`).

5. **PASS** — Speaker dry-run duration. Sum of per-slide `Target duration:` from the content briefs:
   - 45+60+75+75+60+90+75+75+75+75+60+75+90+75+75+75+90+75+90+90+75+90+60 = **1725 s ≈ 28.75 min**
   - Target band 1800 ± 10 % = 1620 – 1980 s. 1725 falls inside. PASS.

6. **PASS (with note)** — Backgrounds. The only `background:` declarations on the slide stage itself are `var(--ds-paper)` and `var(--ds-ink)` (lines 43, 48 — i.e. `#FFFFFF` and `#303030`). Other `background:` uses (`var(--ds-blue)` on bullet dots, `var(--ds-mist)` on code blocks / `.visual` containers / `.card` panels, `rgba(255,255,255,.06)` for dark-mode code/visual containers) are token-based component fills, not slide backgrounds — this is consistent with the design system's own utility classes (`.bg-mist`, `.bg-blue`, etc., in `colors_and_type.css:312-317`). The "two backgrounds only" brand rule refers to slide canvases, which is honored.

7. **PASS** — One prop per slide. 23 occurrences of `class="prop` across 23 sections — exactly one per slide. Every prop uses one of `.prop-tr / -br / -bl / -tl` placement classes (verified by spot-reading each section).

8. **PASS** — Wordmark bottom-left. 23 occurrences of `class="wm` (allowing `wm m-fade-in m-quick`). CSS at line 53-61 fixes it to `left: 96px; bottom: 60px`. One per slide.

9. **PASS** — Sentence-case titles. Reviewed all 23 `<h1>`/`<h2>` strings. Capitalized words are: first words of sentences, proper nouns (Claude Code, CLAUDE.md, Superpowers, Brainstorming, Writing-plans, Chrome DevTools MCP, Playwright MCP, .NET, GitHub, Azure DevOps, Teams, Git, Claudes), and the after-em-dash continuation in `Test-driven development as a non-negotiable.` (lowercase — correct). No instances of title-case "What Is …", "How To …", etc.

10. **PASS** for the rendered HTML; **FAIL** for one content brief. Emoji scan against `[\x{1F300}-\x{1F9FF}]` plus the `2600-26FF` / `2700-27BF` pictographic blocks: zero hits in `presentation/index.html`. One hit in `content/SLIDE-10.md:25`: a `✗` (U+2717 BALLOT X) inside the prose example `[Linter passed]    → ✗ does NOT prove the build compiles`. Frontend-dev wisely dropped it when composing the slide (HTML line 712 uses an inline `→` arrow only). Recommendation below.

11. **PASS** — `CLAUDE.md` exists at project root (3 716 bytes). Documents brand hard rules, file layout, team workflow, and the #429 caveat.

12. **PASS** — `.claude/settings.json` exists and contains `"CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS": "1"` inside `env`.

---

## URL liveness (HEAD with redirect follow, 15 s timeout, Mozilla UA)

| URL | Status | Notes |
|---|---|---|
| https://claude.com/product/claude-code | 200 | |
| https://code.claude.com/docs/en/overview | 200 | |
| https://code.claude.com/docs/en/memory | 200 | (slide 03 + 04 both cite this — by design) |
| https://docs.warp.dev/agent-platform/cli-agents/claude-code | 200 | |
| https://github.com/obra/superpowers | 200 | required UA header on the first attempt |
| https://github.com/obra/superpowers/blob/main/skills/brainstorming/SKILL.md | 200 | |
| https://github.com/obra/superpowers/blob/main/skills/writing-plans/SKILL.md | 200 | |
| https://github.com/obra/superpowers/blob/main/skills/test-driven-development/SKILL.md | 200 | |
| https://github.com/obra/superpowers/blob/main/skills/verification-before-completion/SKILL.md | 200 | |
| https://www.anthropic.com/news/claude-opus-4-7 | 200 | |
| https://github.com/obra/superpowers/blob/main/skills/brainstorming/visual-companion.md | 200 | |
| https://www.figma.com/blog/introducing-claude-code-to-figma/ | 200 | |
| https://code.claude.com/docs/en/chrome | 200 | |
| https://github.com/microsoft/playwright-mcp | 200 | |
| https://github.com/jongalloway/dotnet-mcp | 200 | |
| https://code.claude.com/docs/en/worktrees | 200 | |
| https://github.com/microsoft/azure-skills | 200 | |
| https://code.claude.com/docs/en/agent-teams | 200 | (slides 19, 21, 22 — by design) |
| https://github.com/obra/superpowers/issues/429 | 200 | |
| https://code.claude.com/docs/en/overview (closing aggregator) | 200 | |

All 19 unique URLs (20 link slots, two repeats) returned 2xx. No broken sources.

---

## Design-rule conformance

- **Two backgrounds:** PASS. Only `--ds-paper` (#FFFFFF) and `--ds-ink` (#303030) on `section` / `section.dark`. Token-driven component fills (mist/blue) are not slide backgrounds and match the design system's own utility classes.
- **One prop per slide:** PASS. 23/23 sections carry one `class="prop"` div with one of `.prop-tr / -br / -bl / -tl`.
- **Fonts:** PASS. All 12 `font-family:` declarations use `var(--ds-font-sans)`, `var(--ds-font-display)`, or `var(--ds-font-mono)` — i.e. Nunito + JetBrains Mono with no inline overrides. No raw `font-family:` strings naming any other family.
- **Emoji:** PASS in final HTML; FAIL in `content/SLIDE-10.md` (process artefact only — does not ship).
- **Exclamation marks:** PASS. Zero `!` in any slide-content text in `presentation/index.html` (all 25 `!` hits are inside `<!--` comments or the `<!doctype` declaration). Zero `!` in any of the 23 content briefs.
- **`!important` overrides:** PASS. Zero occurrences in `presentation/index.html`.
- **Wordmark bottom-left on every slide:** PASS. 23/23, positioned `left: 96px; bottom: 60px` via `.wm` rule.

---

## Things I could NOT verify (environment limitation)

The chrome-devtools-mcp browser is locked by another running profile (same blocker frontend-dev reported in their handoff). I tried `new_page` with and without `isolatedContext`; both returned the "browser is already running" error from `C:\Users\Artur\.cache\chrome-devtools-mcp\chrome-profile`. As a result, I could **not** confirm in-browser:

- Console-error count at load (lint says zero from static analysis, but the deck-stage custom element registration is only confirmable at runtime).
- Visual rendering of fonts, props, and scaling behaviour.
- Keyboard nav: ArrowLeft/Right, PageUp/Down, Space, Home/End, R, and digit-jump 0-9 — `deck-stage.js` has the handlers at lines 1286-1300, but I could not exercise them interactively.
- Cross-browser parity (Edge / Firefox / WebKit).
- Viewport scaling at 1366×768, 1920×1080, 3840×2160.
- The Lighthouse audit / DOM snapshot the spec mentions.

`CLAUDE.md:69` claims `F` toggles fullscreen, but `deck-stage.js` keyboard handler (lines 1286-1300) does **not** bind any key to fullscreen — it handles arrow keys, PageUp/Down, Space, Home/End, R, and digits. This is a doc-vs-implementation mismatch in the design system itself; the deck inherits the controller as-is, so this is not a frontend-dev defect. Flagging for accuracy.

Recommendation for the team-lead: ask the user to close their existing Chrome session (or run a manual smoke test in their browser of choice), then re-spawn a fresh chrome-devtools-mcp page to exercise the runtime checks above. Everything I *could* lint statically passes.

---

## Remaining issues

1. **`content/SLIDE-10.md:25`** — strip the `✗` character. Replace `→ ✗ does NOT prove` with `→ does NOT prove` (matches what the HTML already shipped). Single one-character edit. Process-artefact only; does not change the final slide.
2. **(Documentation drift, optional)** — `CLAUDE.md:69` advertises `F` for fullscreen but the controller doesn't implement it. Either remove that line from CLAUDE.md or extend the design system's `deck-stage.js` handler to bind `f` to `document.documentElement.requestFullscreen()`. Not a blocker for ship.

That's the full list. Every other gate passes.

---

## Files inspected

- `presentation/index.html` (1130 lines)
- `CLAUDE.md`
- `.claude/settings.json`
- `devspiration-design-system/project/SKILL.md`
- `devspiration-design-system/project/colors_and_type.css`
- `devspiration-design-system/project/slides/deck-stage.js` (read header + keyboard handler region)
- `devspiration-design-system/project/slides/wire-motion.js` (read first 50 lines)
- `content/SLIDE-01.md` through `content/SLIDE-23.md` (durations + emoji scan)
- `wireframes/SLIDE-TYPES.md` (listing only)
- Assets directories: `assets/brand-objects/` (15 PNGs verified), `assets/icons/` (4 SVGs verified)
