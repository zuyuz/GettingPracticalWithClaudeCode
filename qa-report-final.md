# Final review — Phase 3+4 compliance audit

**Date:** 2026-05-24
**Verdict:** SHIP-WITH-MINOR-CAVEATS
**Skill invoked:** superpowers:verification-before-completion

---

## Fix verification

| Fix | Result | Evidence |
|---|---|---|
| `content/SLIDE-10.md` — `✗` (U+2717) removed | **PASS** | Python scan of full file (`open().read()`): zero occurrences of `chr(0x2717)`. Line 25 now reads `[Linter passed]    → does NOT prove the build compiles`. Remaining non-ASCII chars (U+2014 em-dash, U+2013 en-dash, U+2264 ≤, U+00B7 ·, U+2192 →) are all typographic/symbolic — not emoji per the brand voice (no pictographs in the U+1F300–1F9FF, U+2600–26FF, or U+2700–27BF blocks). |
| `CLAUDE.md` line 69 F-key claim updated | **PARTIAL PASS** | Line 69 itself is fixed: the "Navigate" code-block now reads `# F11       browser-native fullscreen` at line 71 of the current file, with the original `F` toggle claim removed from the keyboard cheatsheet. **However**, a duplicate of the same stale claim survives at **line 9** of CLAUDE.md in the "What to open" section: `open in Chrome or Edge, arrow keys to navigate, \`F\` for fullscreen.` The deck-stage.js controller (verified by reading the keydown handler at lines 1281–1308) binds no `F` key — only ArrowLeft/Right, PageUp/Down, Space, Home, End, r/R, and digits 0–9. The HTML deck inlines no override either. This is a minor documentation accuracy bug, not a runtime defect; flagged as caveat below. |

---

## QA report spot-check

Spot-checked 3 of QA's 12 claims by re-running the underlying check.

| QA claim | Re-verified result |
|---|---|
| URL liveness — `https://docs.warp.dev/agent-platform/cli-agents/claude-code` returns 200 | **MATCH** — `curl -sI -L` returned HTTP 200. |
| URL liveness — `https://github.com/microsoft/playwright-mcp` returns 200 | **MATCH** — `curl -sI -L` returned HTTP 200. |
| URL liveness — `https://code.claude.com/docs/en/worktrees` returns 200 | **MATCH** — `curl -sI -L` returned HTTP 200. |
| Section count = 23 | **MATCH** — Python regex on `<section\b` (open) and `</section>` (close) both return 23. All 23 are direct children of `<deck-stage>`. |
| Emoji count in `presentation/index.html` = 0 | **MATCH** — Pictographic scan across the U+1F300–1F9FF, U+2600–26FF, U+2700–27BF blocks returns 0 hits. A broader scan (excluding allowed typographic chars and box-drawing) also returns 0 suspicious code points. |

QA's report is **accurate** on the spot-checked items.

---

## Plan's 12-point definition of done

Note: criterion 2 has been amended per the lead's instruction to drop the `F` fullscreen claim (since deck-stage.js doesn't bind it) and check F11 native instead. Criterion 7 is interpreted under the design system's `SKILL.md` rule "One 3D prop per slide" (the plan's "or zero on closing" is permissive, not required).

| # | Criterion | Result | Evidence |
|---|---|---|---|
| 1 | `presentation/index.html` opens in Chrome/Edge without console errors (static lint as proxy) | **PASS** | HTML well-formed; matching tag counts (23 `<section>`, 23 `<footer>`, 23 `<a>`); 0 `!important`; 0 `href="#"`; 4 stylesheet/script links all resolve on disk (verified by `os.path.exists` walk); 15 brand-prop PNGs all present in `assets/brand-objects/`; 4 closing icons present in `assets/icons/`. Browser runtime not exercised here (same chrome-devtools-mcp profile-lock that blocked QA). |
| 2 | Keyboard nav works (arrows, Home, End, digits; F removed; F11 native expected) | **PASS** | Verified `deck-stage.js:1281–1308` binds ArrowLeft/Right, PageUp/Down, Space, Home, End, r/R, digits 0–9. F11 is browser-native — works at the browser layer regardless of the script. |
| 3 | Every slide footer shows a source URL; every URL returns 2xx | **PASS** | 23 `<footer class="src">` elements, 23 `Source:` literals, 23 `<a href="https://…">` (19 unique URLs, 4 by-design repeats: memory ×2, agent-teams ×3, overview ×2). 3-URL spot-check above all returned 200; QA's full 19-URL HEAD sweep returned 2xx on every URL. |
| 4 | Slide count = exactly 23 | **PASS** | 23 `<section>` direct children of `<deck-stage>` (regex-confirmed). |
| 5 | Speaker dry-run lands 28–32 minutes | **PASS** | Sum of `Target duration:` values across `content/SLIDE-01.md` … `SLIDE-23.md` = **1725 s = 28.75 min**. Inside the 28–32 min (1680–1920 s) band. Per-slide breakdown: 45+60+75+75+60+90+75+75+75+75+60+75+90+75+75+75+90+75+90+90+75+90+60. |
| 6 | Slide-level backgrounds only `#FFFFFF` or `#303030` | **PASS** | Only two `background:` declarations on `deck-stage > section` rules — `var(--ds-paper)` (paper / #FFFFFF) and `var(--ds-ink)` (ink / #303030) on `.dark`. All other `background:` uses in the stylesheet (`--ds-mist` on code blocks / `.visual` / `.card`, `--ds-blue` on bullet dots) are token-driven component fills — consistent with the design system. |
| 7 | Each slide has exactly one 3D prop, bleeding past an edge | **PASS** | 23 `class="prop"` divs across 23 sections (one per slide, including the closing slide which uses `3d-asterisk-blue` at `prop-br`). Every prop uses one of `.prop-tr / -br / -bl / -tl` placement classes (each places the prop with negative left/right/top/bottom offsets so it bleeds past the edge — see CSS at lines 99–103). |
| 8 | Wordmark present bottom-left on every slide | **PASS** | 23 `class="wm` occurrences, one per `<section>`. CSS at lines 53–61 pins `.wm` to `left: 96px; bottom: 60px`. |
| 9 | Sentence-case titles, no emoji, eyebrows tracked +0.14em | **PASS** | All 23 h1/h2 titles reviewed and pass sentence-case (capitalised: sentence-starts and proper nouns only). Pictographic emoji scan returns 0 hits. CSS rule `.eyebrow { letter-spacing: 0.14em; text-transform: uppercase; }` at lines 90–96 — matches plan. The `.s-compare .col-eyebrow` rule at lines 320–327 also uses `letter-spacing: 0.14em`. |
| 10 | All required topics covered (19+ topic list from plan) | **PASS** | All 23 plan topics present, in the same order. See "Topic coverage cross-check" below. |
| 11 | `CLAUDE.md` exists at project root and is accurate | **PARTIAL PASS** | File exists (3.7 KB). Content accurately describes brand rules, file layout, team workflow, source-citation requirement, #429 caveat. **Inaccuracy:** line 9 still claims `\`F\` for fullscreen` — the controller does not bind F. (Line 71's Quick-start block was updated to F11; line 9 was missed.) |
| 12 | `.claude/settings.json` exists with `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1` | **PASS** | File exists. `env.CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS = "1"` confirmed on line 3. Bonus: `defaultMode: "auto"` and a permission allowlist for the patterns the team used. |

**Score: 10 PASS / 2 PARTIAL PASS / 0 FAIL.** Both partials are the same underlying issue: CLAUDE.md line 9 still advertises an unbound F key. Documentation drift; does not affect the rendered deliverable.

---

## Topic coverage cross-check (against plan)

Plan's 23-topic outline vs. actual slides:

| # | Plan topic | Slide # | Slide title (truncated) |
|---|---|---|---|
| 1 | Title / hook | 01 | Getting practical with Claude Code. |
| 2 | What Claude Code is | 02 | An agentic coding tool that reads, edits, and ships from your terminal. |
| 3 | CLAUDE.md | 03 | CLAUDE.md — instructions that travel with the repo. |
| 4 | Memories | 04 | Claude takes notes between sessions. |
| 5 | Warp terminal | 05 | A modern terminal turns Claude Code into a workbench. |
| 6 | Superpowers overview | 06 | Superpowers, the agentic SDLC. |
| 7 | Brainstorming skill | 07 | Brainstorming — design before code. |
| 8 | Writing-plans + plan mode | 08 | Writing-plans — a step-by-step rhythm. |
| 9 | TDD skill | 09 | Test-driven development as a non-negotiable. |
| 10 | Verification-before-completion | 10 | Verification before completion — every time. |
| 11 | `/effort` / xeffort for Opus 4.7 | 11 | Turn the thinking budget up when the problem deserves it. |
| 12 | Visual planning in Chrome | 12 | Brainstorm with mockups in the browser. |
| 13 | Claude Design + Figma MCP | 13 | Bring designs into code, ship code back to the canvas. |
| 14 | Chrome DevTools MCP | 14 | Debug a real browser from the same session. |
| 15 | Playwright MCP (when to choose) | 15 | Chrome DevTools MCP or Playwright MCP? |
| 16 | Aspire MCP (.NET) | 16 | The .NET SDK as a first-class tool. |
| 17 | Git worktrees | 17 | Git worktrees — one repo, many Claude sessions. |
| 18 | Azure DevOps + gh skills | 18 | Talk to GitHub and Azure DevOps in the same agentic loop. |
| 19 | Team agents | 19 | A lead, teammates, and a real mailbox. |
| 20 | #429 caveat | 20 | Superpowers × Teams — the #429 caveat. |
| 21 | E2E scenario (setup) | 21 | The slides you are watching were built by a team of Claudes. |
| 22 | E2E scenario (what the team did) | 22 | Brainstorm, plan, parallel build, verify. |
| 23 | Resources + closing | 23 | Now go ship your own scenarios. |

**Zero missing topics. Zero out-of-order. Zero extras.** Every slide also lines up with the plan's per-slide bg (paper vs. ink) and layout archetype assignment — slides 4, 6, 11, 17, 20 are the five ink slides (matches plan's "2 ink slides bracket major transitions" intent: slide 6 opens Superpowers, slide 11 spotlights xhigh, slide 17 opens parallel-sessions, slide 20 is the caveat — slide 4 ink is the auto-memory one, which is consistent with the plan table's "ink" assignment for slide 4).

---

## Caveats and remaining issues

1. **`CLAUDE.md:9` doc drift (low severity).** The line `open in Chrome or Edge, arrow keys to navigate, \`F\` for fullscreen.` still advertises the F key. The Quick-start block (line 67–71) was correctly updated to F11; this one-liner was missed in the same pass. One-character fix: change `\`F\` for fullscreen` to `F11 for browser-native fullscreen`. Does not affect the rendered slide deck and does not block ship.

2. **Browser-runtime checks not exercised.** Both QA and this audit could only lint statically — the chrome-devtools-mcp profile is locked by an existing browser session. A manual smoke in any browser remains advisable before the presenter goes on stage (open `presentation/index.html`, press right-arrow 22 times, then End, then Home — anything throwing in the console fails this gate). All static evidence (well-formed HTML, asset paths resolving, controller code reviewed) makes a runtime failure unlikely.

3. **Digit-key 0 behaviour, not a defect.** Plan criterion mentions "digits 1-9 jump"; controller maps `1`–`9` to slides 1–9 and `0` to slide 10 (lines 1296–1299 of deck-stage.js). This is reasonable and matches the standard convention used in the design system's reference deck.

---

## Final recommendation

**SHIP-WITH-MINOR-CAVEATS.** The deliverable is brand-compliant, structurally sound, time-budget-correct, and topically complete. All 19 cited URLs return 200, every slide carries its source, wordmark, and a single bleeding 3D prop, every title is sentence-case, the deck has exactly 23 slides in the planned order, both required artifacts (`CLAUDE.md` and `.claude/settings.json`) exist with the correct content. The only outstanding issue is a single residual line in `CLAUDE.md:9` that still names an unbound `F` key for fullscreen — this is identical to the previously-flagged issue, was partially fixed at line 69/71, and the duplicate at line 9 was missed. It is a one-character documentation edit that does not affect the rendered presentation. Recommend the lead apply the one-line fix to CLAUDE.md:9 (and ideally a quick manual browser smoke) before going on stage, but the deck itself is ready to present as-is.
