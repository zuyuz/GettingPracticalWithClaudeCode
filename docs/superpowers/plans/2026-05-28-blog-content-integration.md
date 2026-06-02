# Blog Content Integration (Wave 2) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fold four claude.com/blog posts into the Claude Code presentation — add one "Claude Code in the wild" proof-point slide (CodeRabbit) after slide 20, and enrich slides 12, 14, 15, and 19 — then renumber the deck from 24 to 25 slides and sync the source-tracking artifacts.

**Architecture:** Single deliverable is `presentation/index.html` (a `<deck-stage>` of `<section class="slide">` elements; page markers `NN / total` are hardcoded per slide). Layout obeys `wireframes/SLIDE-TYPES.md` (fixed 1920×1080 safe box, ≤4 bullets/slide, one corner-bleeding prop, source URL in every footer). There are no unit tests; verification is structural (Grep counts) plus visual (chrome-devtools screenshots using the rail-hide + `goTo(n-1)` pattern). Process artifacts (`content/SLIDE-*.md`, `content/ACCURACY-AUDIT.md`, `content/SOURCE-SCRIPTS.md`) are kept in sync last.

**Tech Stack:** Static HTML/CSS, `deck-stage.js` custom element, chrome-devtools MCP for visual QA.

**Sources (all HEAD-verified reachable / HTTP 200 via WebFetch on 2026-05-28):**
- CodeRabbit: `https://claude.com/blog/how-coderabbit-used-claude-to-build-an-agent-orchestration-system`
- Browser/computer use: `https://claude.com/blog/best-practices-for-computer-and-browser-use-with-claude`
- Effectiveness of HTML: `https://claude.com/blog/using-claude-code-the-unreasonable-effectiveness-of-html`
- Managed Agents: `https://claude.com/blog/claude-managed-agents-updates`

**Critical sequencing note:** Renumbering MUST happen in this order to avoid Edit-uniqueness collisions: (1) flip all denominators `/ 24`→`/ 25`; (2) shift the four downstream numerators in DESCENDING order; (3) update labels + comments; (4) ONLY THEN insert the new slide authored with `21 / 25`. Inserting before renumbering creates duplicate `21 / 25` markers that break `replace_all`.

---

### Task 1: Renumber denominators 24 → 25 (all slides)

**Files:**
- Modify: `presentation/index.html`

- [ ] **Step 1: Baseline count**

Use Grep on `presentation/index.html`, pattern ` / 24</span>`, output_mode `count`.
Expected: **24** matches. Also Grep ` / 25</span>` → expected **0**. (Confirms `/ 24` is unique to page markers; if count ≠ 24, STOP and inspect — a non-marker match exists.)

- [ ] **Step 2: Replace all denominators**

Edit with `replace_all: true`:
- old_string: ` / 24</span>`
- new_string: ` / 25</span>`

- [ ] **Step 3: Verify**

Grep ` / 25</span>` → expected **24**. Grep ` / 24</span>` → expected **0**.

---

### Task 2: Shift the four downstream numerators (descending)

**Files:**
- Modify: `presentation/index.html`

After Task 1 every marker reads `NN / 25`. Shift the four slides after the insertion point UP by one, highest first, so each new value does not yet exist.

- [ ] **Step 1: Closing 24 → 25**

Edit: old `>24 / 25</span>` → new `>25 / 25</span>` (unique: only the closing had numerator 24).

- [ ] **Step 2: E2E execution 23 → 24**

Edit: old `>23 / 25</span>` → new `>24 / 25</span>`.

- [ ] **Step 3: E2E setup 22 → 23**

Edit: old `>22 / 25</span>` → new `>23 / 25</span>`.

- [ ] **Step 4: End-to-end divider 21 → 22**

Edit: old `>21 / 25</span>` → new `>22 / 25</span>`.

- [ ] **Step 5: Verify**

Grep `class="pg m-fade-in m-quick">` with output_mode `content`. Expected numerators present exactly once each: `01..20` plus `22, 23, 24, 25` (note: NO `21` yet — the new slide adds it in Task 5). Total markers = **24**.

---

### Task 3: Update labels + comments for the four shifted slides

**Files:**
- Modify: `presentation/index.html`

Each string below is unique; order does not matter.

- [ ] **Step 1: data-screen-labels**

Four Edits:
- `data-screen-label="21 End to end"` → `data-screen-label="22 End to end"`
- `data-screen-label="22 E2E setup"` → `data-screen-label="23 E2E setup"`
- `data-screen-label="23 E2E execution"` → `data-screen-label="24 E2E execution"`
- `data-screen-label="24 Closing"` → `data-screen-label="25 Closing"`

- [ ] **Step 2: HTML section comments**

Four Edits (cosmetic, for maintainability):
- `SLIDE 21 — End to end (Section Divider) — NEW, paper` → `SLIDE 22 — End to end (Section Divider) — paper`
- `SLIDE 22 — E2E setup (Content+Code)` → `SLIDE 23 — E2E setup (Content+Code)`
- `SLIDE 23 — E2E execution` → `SLIDE 24 — E2E execution` (match the exact existing comment text first via Read)
- `SLIDE 24 — Closing` → `SLIDE 25 — Closing` (match exact existing text)

- [ ] **Step 3: Verify**

Grep `data-screen-label=` content. Expected labels `01..20` then `22 End to end, 23 E2E setup, 24 E2E execution, 25 Closing` (no `21` label yet).

---

### Task 4: Insert the new proof-point slide (CodeRabbit) as slide 21

**Files:**
- Modify: `presentation/index.html` (insert before the `SLIDE 22 — End to end` comment block)

Archetype `s-content` (paper, single-column — wired at index.html style line 148: `.s-content .stage-pad { display:flex; flex-direction:column; justify-content:center; }`, with `.lead` and `.bullets` rules following). Prop `3d-pebble-cyan` `prop-tr` (paper-tone; does not repeat neighbors c-glass @20 or sphere-blue @22).

- [ ] **Step 1: Insert the section**

Edit anchored on the (renumbered) End-to-end comment so the new block lands immediately before it.
- old_string:
```
  <!-- ════════════════════════════════════════════════════════════
       SLIDE 22 — End to end (Section Divider) — paper
       ════════════════════════════════════════════════════════════ -->
```
- new_string:
```
  <!-- ════════════════════════════════════════════════════════════
       SLIDE 21 — Proof point · CodeRabbit (Content, paper) — NEW
       ════════════════════════════════════════════════════════════ -->
  <section class="slide s-content" data-screen-label="21 Proof CodeRabbit">
    <div class="stage-pad">
      <div class="eyebrow m-rise-sm">Claude Code in the wild</div>
      <h2 class="m-rise">CodeRabbit plans with Claude before it writes a line of code.</h2>
      <p class="lead m-rise-sm">Their orchestration layer reviews 2 million pull requests a week across 15,000+ customers.</p>
      <ul class="bullets m-rise" data-stagger>
        <li>Opus drives orchestration, Sonnet sequences the plan, Haiku distills context</li>
        <li>A collaborative PRD locks context and assumptions before Plan Mode writes code</li>
        <li>"The plan itself becomes a quality gate" — better upfront, pronounced downstream</li>
        <li>A custom eval harness scores plan quality, scope creep, and token efficiency</li>
      </ul>
    </div>
    <div class="prop prop-tr m-rise-prop">
      <img src="../devspiration-design-system/project/assets/brand-objects/3d-pebble-cyan.png" alt="">
    </div>
    <span class="wm m-fade-in m-quick">devspiration</span>
    <span class="pg m-fade-in m-quick">21 / 25</span>
    <footer class="src m-fade-in m-quick">
      Source: <a href="https://claude.com/blog/how-coderabbit-used-claude-to-build-an-agent-orchestration-system" target="_blank" rel="noopener">claude.com/blog · How CodeRabbit built an agent-orchestration system</a>
    </footer>
  </section>

  <!-- ════════════════════════════════════════════════════════════
       SLIDE 22 — End to end (Section Divider) — paper
       ════════════════════════════════════════════════════════════ -->
```

- [ ] **Step 2: Verify the asset exists**

Glob `devspiration-design-system/project/assets/brand-objects/3d-pebble-cyan.png`. Expected: one match. (If missing, fall back to `3d-asterisk-black.png` — also a paper-tone prop not adjacent to neighbors.)

- [ ] **Step 3: Verify structure**

Grep `class="slide ` count → expected **25** sections. Grep `class="pg m-fade-in m-quick">` content → numerators `01..25` each exactly once; all denominators `/ 25`.

---

### Task 5: Enrich slide 12 (Visual planning) — effectiveness of HTML

**Files:**
- Modify: `presentation/index.html` (slide 12 bullets + footer)

- [ ] **Step 1: Swap the minor "clicks recorded" bullet for the HTML-scales bullet**

Edit:
- old: `          <li>Clicks are recorded so the next turn knows your pick</li>`
- new: `          <li>The same trick scales — Claude renders plans, diffs, and dashboards as HTML, not walls of text</li>`

- [ ] **Step 2: Add the HTML post as a second source**

Edit (slide 12 footer):
- old:
```
      Source: <a href="https://github.com/obra/superpowers/blob/main/skills/brainstorming/visual-companion.md" target="_blank" rel="noopener">github.com/obra/superpowers/skills/brainstorming/visual-companion.md</a>
```
- new:
```
      Sources: <a href="https://github.com/obra/superpowers/blob/main/skills/brainstorming/visual-companion.md" target="_blank" rel="noopener">superpowers · visual-companion.md</a> · <a href="https://claude.com/blog/using-claude-code-the-unreasonable-effectiveness-of-html" target="_blank" rel="noopener">claude.com/blog · effectiveness of HTML</a>
```

- [ ] **Step 3: Verify** — Grep `effectiveness of HTML` → expected ≥1 match (1 in deck; brief sync adds more later).

---

### Task 6: Enrich slide 14 (Claude in Chrome) — browser safety best practices

**Files:**
- Modify: `presentation/index.html` (slide 14 bullet 4 + footer)

- [ ] **Step 1: Reword the safety bullet**

Edit:
- old: `          <li>Pauses on login screens and CAPTCHAs so you stay in control</li>`
- new: `          <li>Treat web pages as untrusted — it pauses on logins and high-stakes actions so a human stays in the loop</li>`

- [ ] **Step 2: Add the browser-use post as a second source**

Edit (slide 14 footer):
- old:
```
      Source: <a href="https://code.claude.com/docs/en/chrome" target="_blank" rel="noopener">code.claude.com/docs/en/chrome</a>
```
- new:
```
      Sources: <a href="https://code.claude.com/docs/en/chrome" target="_blank" rel="noopener">code.claude.com/docs/en/chrome</a> · <a href="https://claude.com/blog/best-practices-for-computer-and-browser-use-with-claude" target="_blank" rel="noopener">claude.com/blog · computer &amp; browser use</a>
```

- [ ] **Step 3: Verify** — Grep `stays in the loop` → expected ≥1 match.

---

### Task 7: Enrich slide 15 (DevTools vs Playwright) — best-practice framing

**Files:**
- Modify: `presentation/index.html` (slide 15 lead + footer)

- [ ] **Step 1: Reframe the lead**

Edit:
- old: `        <p class="lead m-rise-sm">Beyond the Claude-in-Chrome extension — two ways to drive a browser for automation.</p>`
- new: `        <p class="lead m-rise-sm">Two ways to drive a browser for automation — pick by reliability, cost, and how much a human stays in the loop.</p>`

- [ ] **Step 2: Append the browser-use post as a third source (short anchor to limit footer width)**

Edit (slide 15 footer) — match the exact existing two-source line first via Read, then append:
` · <a href="https://claude.com/blog/best-practices-for-computer-and-browser-use-with-claude" target="_blank" rel="noopener">best practices</a>`
immediately before `</a>\n    </footer>`'s closing (i.e., after the playwright-mcp anchor, inside the footer).

- [ ] **Step 3: Verify** — Grep `human stays in the loop` → expected **2** matches (slides 14 and 15).

---

### Task 8: Enrich slide 19 (Team agents) — Managed Agents pointer

**Files:**
- Modify: `presentation/index.html` (slide 19 bullet 4 + footer)

- [ ] **Step 1: Swap the minor display-modes bullet for the Managed Agents pointer**

Edit:
- old: `          <li>Display modes: in-process, or split panes via tmux / iTerm2</li>`
- new: `          <li>Need it hosted and secure? Managed Agents keep tool execution and data inside your perimeter</li>`

- [ ] **Step 2: Add the Managed Agents post as a second source**

Edit (slide 19 footer):
- old:
```
      Source: <a href="https://code.claude.com/docs/en/agent-teams" target="_blank" rel="noopener">code.claude.com/docs/en/agent-teams</a>
```
- new:
```
      Sources: <a href="https://code.claude.com/docs/en/agent-teams" target="_blank" rel="noopener">code.claude.com/docs/en/agent-teams</a> · <a href="https://claude.com/blog/claude-managed-agents-updates" target="_blank" rel="noopener">claude.com/blog · Managed Agents</a>
```

- [ ] **Step 3: Verify** — Grep `Managed Agents` → expected ≥1 match in index.html.

---

### Task 9: Visual QA (chrome-devtools screenshots)

**Files:** none (read-only verification)

Per memory `deck-stage-rail-qa`: hide the thumbnail rail and use `goTo(n-1)` (0-indexed). New slide 21 = `goTo(20)`.

- [ ] **Step 1: Open the deck**

chrome-devtools `new_page` → `file:///C:/Users/Artur/Documents/Projects/Devspiration%20Claude%20Code%20Presentation/presentation/index.html`

- [ ] **Step 2: Screenshot each touched slide and confirm no clipping / footer overflow**

For each of `goTo(11)` (slide 12), `goTo(13)` (14), `goTo(14)` (15), `goTo(18)` (19), `goTo(20)` (NEW 21), `goTo(24)` (closing 25): run `evaluate_script` to find the deck element and call `deck.goTo(n)`, then `take_screenshot`. Confirm for each: all bullets visible, headline not clipped, the footer source line readable and not overlapping the page number, one prop bleeding off a corner, wordmark bottom-left.
Expected: NEW slide 21 shows eyebrow "CLAUDE CODE IN THE WILD", headline, lead stat, 4 bullets, pebble-cyan prop top-right, `21 / 25`, CodeRabbit source. Closing shows `25 / 25`.

- [ ] **Step 3: If any footer wraps past the page number or any text clips**

Shorten the offending footer anchor display text (already short on 12/14/15/19) or trim the bullet/lead copy, then re-screenshot. Do not shrink type (violates §2 budgets).

---

### Task 10: Sync process artifacts (briefs + source-tracking docs)

**Files:**
- Create: `content/SLIDE-PROOF-CODERABBIT.md`
- Modify: the briefs for deck slides 12/14/15/19 (identify BY HEADLINE, not number — see memory `content-brief-deck-offset`: briefs run one behind the deck from slide 03 on, so expected files are `SLIDE-11.md`=Visual planning, `SLIDE-13.md`=Claude in Chrome, `SLIDE-14.md`=DevTools/Playwright, `SLIDE-18.md`=Team agents — VERIFY each by reading its headline first)
- Modify: `content/ACCURACY-AUDIT.md`, `content/SOURCE-SCRIPTS.md`

- [ ] **Step 1: Confirm brief→slide mapping**

Grep `content/` for the headlines ("Visual companion"/"mockups", "Claude in Chrome", "DevTools"/"Playwright", "Team agents"/"mailbox") to confirm exact filenames before editing. Do NOT globally renumber briefs (the offset is pre-existing and documented).

- [ ] **Step 2: Update the four enriched briefs**

In each confirmed brief, update the changed bullet/lead to match the deck, and add the new blog URL under "Secondary source" (or convert the source section to list both). Keep the existing primary source.

- [ ] **Step 3: Create the new proof-slide brief**

Write `content/SLIDE-PROOF-CODERABBIT.md` (deck slide 21) with: Layout=Content, Background=paper, the eyebrow/headline/lead/bullets from Task 4, primary source = CodeRabbit blog URL (Status: HEAD-checked OK 200, 2026-05-28), and 2-3 speaker notes. Name it descriptively (not `SLIDE-21.md`) to avoid colliding with the pre-existing offset numbering.

- [ ] **Step 4: Update ACCURACY-AUDIT.md HEAD-check table**

Add rows for the four new blog URLs with status `200`, and add an `Update (2026-05-28)` note describing this wave (new slide 21 + enrichments; deck is now 25 slides; URLs verified reachable 2026-05-28; supplements the original 2026-05-25 audit). Do not rewrite original rows except the deck-count note.

- [ ] **Step 5: Update SOURCE-SCRIPTS.md**

Add a `## Slide 21 — Proof point · CodeRabbit` section (source = CodeRabbit blog) and append the new secondary sources to the slide 12/14/15/19 sections. Note the deck is now 25 slides.

- [ ] **Step 6: Verify** — Glob `content/SLIDE-PROOF-CODERABBIT.md` → 1 match. Grep `claude.com/blog` across `content/` → expected matches in the four briefs + new brief + both source docs.

---

## Self-Review

**1. Spec coverage:**
- New proof slide (CodeRabbit, after 20) → Task 4. ✓
- Browser best-practices → 14/15 → Tasks 6, 7. ✓
- Effectiveness of HTML → slide 12 → Task 5. ✓
- Managed Agents → slide 19 bullet swap (approved) → Task 8. ✓
- Renumber 24→25 → Tasks 1–3. ✓
- Source citation in every footer + verified URLs → footers set in Tasks 4–8; HEAD-status in header + Task 10.4. ✓
- Visual QA per deck discipline → Task 9. ✓
- Brief + source-doc sync → Task 10. ✓

**2. Placeholder scan:** Each Edit gives exact old/new strings; copy is final. Task 3.2 and 7.2 say "match exact existing text via Read first" because those strings were not captured verbatim in this plan — that is a deliberate guard, not a placeholder. No TBDs.

**3. Type/numbering consistency:** Renumber order (denominators → descending numerators → labels/comments → insert) is collision-checked. New slide authored at `21 / 25`; final state = 25 sections, numerators 01–25 unique, all denominators `/ 25`. Adjacency: prop pebble-cyan @21 sits between c-glass @20 and sphere-blue @22 — no repeat. `s-content` single-column confirmed wired (style line 148).

**Contingencies:** Task 4.2 (prop fallback if asset missing), Task 9.3 (footer-overflow trim), Task 10.1 (verify brief filenames by headline).
