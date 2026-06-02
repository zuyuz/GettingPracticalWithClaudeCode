# SOURCE-SCRIPTS — source-grounded visual content per slide

Author: `tech-audience`. Every script/page below is grounded in the slide's
cited footer source (fetched and verified at write-time). Hand these to the
Frontend Developer.

> **Wave 2 update (2026-05-28):** The deck is now **25 slides**. A new
> proof-point slide — **deck 21, "Claude Code in the wild · CodeRabbit"**
> (Content archetype, paper, prop `3d-pebble-cyan` prop-tr) — was inserted
> after the team-agents slides. Source:
> `claude.com/blog/how-coderabbit-used-claude-to-build-an-agent-orchestration-system`.
> Slide 15 (DevTools vs Playwright) also gained a 3rd footer source:
> `claude.com/blog/best-practices-for-computer-and-browser-use-with-claude`
> (treat page content as untrusted; keep a human in the loop). The per-slide
> Source lines below for slides 12/14/19 carry their new secondary sources.

**How to use the terminal scripts.** Each `pg-terminal` slide ships a
JS beat-array in the exact `playground.js` shape. Set it imperatively:

```js
const term = slide.querySelector('.pg-terminal');
window.Playground.runTerminal(term, SCRIPT);   // SCRIPT = the array below
```

or, for `data-autorun` on slide-enter, attach the array as `term.__script`
before `wireTerminal` runs (see the auto-run hook in the plan). Beat types in
use: `cmd`, `out` (`cls:'pg-cl-dim'|'pg-cl-blue'|'pg-cl-green'|'pg-cl-yellow'`),
`pip` (`color:'green'|'yellow'|'red'`), `raw` (`html:`), `pause` (`ms:`), `clear`.
`out`/`raw` may carry `html:` for inline color spans.

**Frame markup reference** (copy from `preview/27–30`):
- terminal/editor frame is dark: `<div class="pg-frame theme-dark pg-terminal">`
- browser is light: `<div class="pg-frame theme-light pg-browser">`
- titlebar lights: `<span class="r"></span><span class="y"></span><span class="g"></span>`
- terminal controls bar: `<button class="pg-run">…Run</button><button class="pg-reset">Reset</button><span class="status">idle</span>`

---

## ACCURACY FLAGS (existing slide bullets the source does NOT fully support)

Read these first — they affect copy, not just the visuals.

1. **Slide 03 — `/effort` flag set.** Slide bullet 1 says "five effort tiers — low, medium, high, xhigh, max." ✅ Confirmed by `model-config` (Opus 4.7 row: `low, medium, high, xhigh, max`). Bullet 3 "Claude Code already defaults Opus 4.7 to xhigh" ✅ confirmed ("As of v2.1.117, the default effort is `xhigh` on Opus 4.7"). Bullet 4 `/effort <level>` ✅ confirmed. **No change needed** — slide is accurate. (Minor enrich option: `max` is session-only.)

2. **Slide 06 — Warp feature names.** The slide's four bullets are accurate in spirit but the **exact Warp feature names** differ. Source (`docs.warp.dev`) names them: **"Agent notifications"** (in-app + desktop alerts when Claude Code needs your attention), **"Code review"** (send inline review comments to the agent from Warp's code-review panel), **"Attach code as context"** (select code, send to the agent), **"Remote Control" / session sharing** (share your Claude Code session with teammates). The slide's bullet "Rich editor for long prompts" maps to Warp's rich input editor opened with **`Ctrl-G`** — that is real, keep it. **Recommendation:** keep the four bullets but align wording to the doc's feature names (see Slide 06 script which surfaces all four).

3. **Slide 13 — Figma-only framing is the stale part.** The slide today is ONLY the Figma "code ↔ design" bridge and cites only the Figma blog. Per the plan + the two new sources, **Claude Design (Anthropic Labs) must be foregrounded.** See Slide 13 content + the three required footer sources. The current right-column claim "Capture a running UI from localhost/staging/prod → editable Figma frames" is a real Figma-MCP capability — keep it as the secondary Figma point.

4. **Slide 16 — `.NET MCP` tool surface.** Slide says `dotnet_ef … migrations add | database update`. Source README uses **PascalCase operation names**: `dotnet_ef` ops are `MigrationsAdd`, `DatabaseUpdate`, etc. The slide's lowercased `migrations add` is a readable paraphrase — acceptable for a slide, but the script below uses the real operation names so the demo is verifiable. Also: the slide's `dotnet_sdk` example `list-sdks | templates | info` → real ops are `ListSdks | ListTemplates | Info`. **Flag (minor):** consider matching case, or keep paraphrase but know it's a paraphrase. Dev certs + user secrets are a **single** tool `dotnet_dev_certs` (slide doesn't claim otherwise — fine).

5. **Slide 17 — Azure install command missing + skill names.** Slide bullet "Microsoft's plugin handles infra: deploy, validate, diagnose" ✅ matches real skills `azure-deploy`, `azure-validate`, `azure-diagnostics`. **Flag:** the slide never shows the actual install command. Real install: **`/plugin install azure@claude-plugins-official`**. Also confirmed: the repo is **Azure infra only — no Azure DevOps coverage**, so the slide's "For Azure DevOps, write a project skill that shells out to `az devops`" is correctly framed as the user's own wrapper (not provided by the plugin). Good — the script surfaces the real install + a couple real skill names.

6. **Slide 19 — display modes.** Slide says "in-process, or split panes via tmux / iTerm2." ✅ Exactly matches `agent-teams` ("In-process" default; "Split panes" require tmux or iTerm2). `SendMessage` + shared task list with claim/dependency/completion ✅ all confirmed. No change.

7. **Slide 22 — env flag.** Slide shows `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1`. ✅ Confirmed verbatim in `agent-teams` ("Enable them by setting the `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS` environment variable to `1`"). No change.

Everything else verified consistent with sources. Details per slide below.

---

## Slide 02 — What Claude Code is  ·  `pg-terminal` (dark)
Source: code.claude.com/docs/en/overview — the agentic read/edit/run loop; `claude` to start.

```js
const S02 = [
  { type:'cmd', text:'cd your-project' },
  { type:'cmd', text:'claude' },
  { type:'pause', ms:450 },
  { type:'raw', html:'<span class="pg-bold pg-cl-blue">Claude Code</span> <span class="pg-cl-dim">— agentic coding in your terminal</span>' },
  { type:'out', text:'' },
  { type:'pip', color:'green', text:'What are we building?', cls:'pg-cmd' },
  { type:'pause', ms:300 },
  { type:'cmd', text:'fix the failing auth test and run the suite' },
  { type:'pause', ms:600 },
  { type:'pip', color:'yellow', text:'Reading codebase…', cls:'pg-cl-dim' },
  { type:'out', text:'  read  src/auth/session.ts', cls:'pg-cl-dim', delay:50 },
  { type:'out', text:'  read  tests/auth.test.ts',  cls:'pg-cl-dim', delay:50 },
  { type:'pip', color:'yellow', text:'Editing 2 files…', cls:'pg-cl-dim' },
  { type:'out', text:'  edit  src/auth/session.ts', cls:'pg-cl-blue', delay:50 },
  { type:'pip', color:'yellow', text:'Running: npm test', cls:'pg-cl-dim' },
  { type:'pause', ms:500 },
  { type:'out', html:'<span class="pg-cl-green">PASS</span>  tests/auth.test.ts  <span class="pg-cl-dim">(12 tests)</span>' },
  { type:'pip', color:'green', text:'Done · read → edit → ran the verifying command' },
];
```
Why it clarifies: shows the literal loop in the title — reads the codebase,
edits across files, runs the verifying command. All grounded in the overview
page (`claude` to start; "reads your codebase, edits files, runs commands").

---

## Slide 03 — Effort levels  ·  `pg-terminal` (dark)
Source: code.claude.com/docs/en/model-config — `/effort`, tier names, xhigh default.

```js
const S03 = [
  { type:'raw', html:'<span class="pg-cl-dim">opus 4.7 · </span><span class="pg-cl-blue">with xhigh effort</span>' },
  { type:'pause', ms:300 },
  { type:'cmd', text:'/effort' },
  { type:'pause', ms:350 },
  { type:'out', html:'<span class="pg-cl-dim">low   medium   high   </span><span class="pg-cl-blue pg-bold">xhigh</span><span class="pg-cl-dim">   max</span>' },
  { type:'out', text:'  Opus 4.7 supports five effort tiers', cls:'pg-cl-dim', delay:60 },
  { type:'pause', ms:300 },
  { type:'cmd', text:'/effort max' },
  { type:'pause', ms:350 },
  { type:'pip', color:'green', text:'Effort: max — deepest reasoning (this session only)', cls:'pg-cmd' },
  { type:'out', text:'', delay:40 },
  { type:'cmd', text:'/effort auto' },
  { type:'pip', color:'green', text:'Effort reset to model default (xhigh on Opus 4.7)', cls:'pg-cmd' },
];
```
Grounded facts: tier list `low, medium, high, xhigh, max` (Opus 4.7 row);
default `xhigh`; `/effort <level>` and `/effort auto`; the active level shows
"with <level> effort" next to the logo/spinner; `max` is session-only.

---

## Slide 04 — CLAUDE.md  ·  upgrade `<pre>` → `pg-editor` (file content) + `/init` mention
Source: claude.com/blog/how-claude-code-works-in-large-codebases (CLAUDE.md best practices at scale). Secondary: code.claude.com/docs/en/memory.

This slide should show a **CLAUDE.md sample file** in a `pg-editor` frame.
Titlebar: `title = "CLAUDE.md — your-project"`, `meta = "md"`. Use the editor
markup from `preview/29` (gutter line numbers + `.code` lines). Sample content
(a realistic, on-topic CLAUDE.md — short, specific, the doc's own advice):

```markdown
# Payments service

## Commands
- Build:  npm run build
- Test:   npm test          # run before every commit
- Lint:   npm run lint

## Conventions
- Use 2-space indentation
- API handlers live in src/api/handlers/
- Currency values are integer cents, never floats

## Architecture
- Stripe webhooks verified in src/api/webhooks/stripe.ts
```

Editor token classes to apply (light theme reads better here, but the deck
slide is light `s-content-code` → use `theme-light pg-editor`):
`#` headings → `pg-tk-com`; the inline `# run before every commit` →
`pg-tk-com`. Keep it ≤ ~14 lines so it fits the frame.

Caption / supporting line near the frame (optional small tag): `corner-tag`
text `"/init generates this"`. The doc: "Run `/init` to generate a starting
CLAUDE.md automatically… If a CLAUDE.md already exists, `/init` suggests
improvements rather than overwriting it."

Grounded facts kept in the left bullets (all confirmed):
- markdown at project root, loaded at the start of every session ✅
- four scopes load broadest→most-specific: **managed policy → user → project → local**, closer files read last/win ties ✅ ("project instruction appears in context after a user instruction")
- `/init` generates a starter file ✅
- specificity: "Use 2-space indentation" beats "Format code properly" ✅ (verbatim example in the doc)

---

## Slide 05 — Auto memory  ·  `pg-editor` (dark) showing the memory dir / MEMORY.md
Source: code.claude.com/docs/en/memory#auto-memory.

Keep the slide dark (`theme-dark pg-editor`). Titlebar `title = "MEMORY.md"`,
`meta = "md"`. Show the **MEMORY.md index** as the file content (this is the
file that loads every session — the most accurate thing to display):

```markdown
# Project memory — index

## Build & test
- Build: `npm run build`; test: `npm test`
- Integration tests need a local Redis instance

## Gotchas
- Auth tokens are httpOnly cookies — see [[debugging]]

## Preferences
- Use pnpm, not npm
```

Then, near it (or as a second tiny stacked block / corner-tag), reflect the
on-disk layout the doc documents verbatim:

```text
~/.claude/projects/<project>/memory/
├── MEMORY.md     # index — first 200 lines load every session
├── debugging.md  # topic file, loads on demand
└── api-conventions.md
```

Grounded facts (all confirmed verbatim):
- per-repo memory dir at `~/.claude/projects/<project>/memory/` ✅
- `MEMORY.md` is the index; **first 200 lines (or 25KB) load every session**; topic files load on demand ✅
- Claude keeps build commands, debugging insights, preferences it discovers ✅
- toggle via `/memory`, or set `autoMemoryEnabled: false` (project settings); env `CLAUDE_CODE_DISABLE_AUTO_MEMORY=1` ✅
- requires v2.1.59+ (don't put on slide; keep for speaker notes)

---

## Slide 06 — Warp  ·  `pg-terminal` (Warp-styled) — PHASE B
Source: docs.warp.dev/agent-platform/cli-agents/claude-code.

Dark terminal. Titlebar `title = "claude · ~/payments"`, `meta = "warp"`.
The script surfaces all four real Warp features by their **documented names**.

```js
const S06 = [
  { type:'cmd', text:'claude' },
  { type:'pause', ms:300 },
  { type:'pip', color:'yellow', text:'Editing src/api/webhooks/stripe.ts…', cls:'pg-cl-dim' },
  { type:'pause', ms:400 },
  { type:'raw', html:'<span class="pg-cl-yellow">⚠ Approval needed</span> — write to src/api/webhooks/stripe.ts' },
  { type:'pip', color:'yellow', text:'Agent notification sent (in-app + desktop)', cls:'pg-cl-dim' },
  { type:'pause', ms:500 },
  { type:'raw', html:'<span class="pg-cl-dim">↳ Code review panel:</span> inline comment → <span class="pg-cmd">"verify the signature first"</span>' },
  { type:'pause', ms:400 },
  { type:'raw', html:'<span class="pg-cl-dim">↳ Attached as context:</span> selected 8 lines from stripe.ts' },
  { type:'pause', ms:400 },
  { type:'pip', color:'green', text:'Approved · edit applied', cls:'pg-cmd' },
  { type:'raw', html:'<span class="pg-cl-blue">⤷ Remote Control:</span> session shared with @teammate' },
];
```
Notes for Designer/Frontend:
- **Warp mark** (per plan): recreate Warp's glyph as inline monochrome SVG, pure ink `#303030` (never blue), + "Warp" wordmark, near the eyebrow as a product badge.
- The four bullets on the slide should keep these documented names: **Agent notifications** · **Code review (inline comments)** · **Attach code as context** · **Remote Control / session sharing**. Rich input editor opens with **`Ctrl-G`** (optional 5th detail).
- Speaker-note only (don't crowd slide): notification plugin install is `/plugin marketplace add warpdotdev/claude-code-warp` then `/plugin install warp@claude-code-warp`.

---

## Slide 08 — Brainstorming  ·  `pg-terminal` (one-question-at-a-time → spec.md)
Source: github.com/obra/superpowers/skills/brainstorming/SKILL.md.

```js
const S08 = [
  { type:'cmd', text:'/superpowers:brainstorming' },
  { type:'pause', ms:350 },
  { type:'pip', color:'green', text:'Question 1 of N — one at a time', cls:'pg-cmd' },
  { type:'raw', html:'<span class="pg-cl-dim">What problem does this solve, and for whom?</span>' },
  { type:'pause', ms:500 },
  { type:'cmd', text:'engineers tracking TODO comments across a repo' },
  { type:'pause', ms:450 },
  { type:'pip', color:'yellow', text:'Proposing approaches…', cls:'pg-cl-dim' },
  { type:'out', html:'  <span class="pg-bold pg-cl-green">A) </span>grep + cache  <span class="pg-cl-dim">— fast, no index</span>', delay:60 },
  { type:'out', html:'  <span class="pg-bold">B) </span>AST parse     <span class="pg-cl-dim">— precise, slower</span>', delay:60 },
  { type:'out', html:'  <span class="pg-bold">C) </span>LSP hook      <span class="pg-cl-dim">— live, complex</span>', delay:60 },
  { type:'out', html:'  <span class="pg-cl-blue">→ recommend A</span> for v1', delay:60 },
  { type:'pause', ms:400 },
  { type:'pip', color:'green', text:'Design approved — writing spec', cls:'pg-cmd' },
  { type:'out', html:'<span class="pg-cl-blue">  docs/superpowers/specs/2026-05-25-todo-tracker-design.md</span>', delay:60 },
  { type:'pip', color:'green', text:'Committed. Next: writing-plans' },
];
```
Grounded facts: "Only one question per message"; hard gate ("Do NOT… write any
code… until you have presented a design and the user has approved it"); "Propose
2-3 different approaches with trade-offs" + "Lead with your recommended option";
artifact path verbatim `docs/superpowers/specs/YYYY-MM-DD-<topic>-design.md`,
committed to git; terminal state is invoking writing-plans.

---

## Slide 09 — Writing-plans  ·  `pg-editor` (plan.md numbered TDD checklist)
Source: github.com/obra/superpowers/skills/writing-plans/SKILL.md.

`pg-editor` (light, to match the `s-content-code` light slide:
`theme-light pg-editor`). Titlebar `title = "2026-05-25-todo-tracker.md"`,
`meta = "md"`. File content (real plan shape from the skill — header block +
checkbox steps; **no TBD**):

```markdown
# TODO tracker — implementation plan
**Goal:** scan a repo and list every TODO comment.
**Architecture:** CLI → walker → grep matcher → reporter.
**Tech stack:** Node, vitest.

## Files
- src/walker.ts        — yield repo file paths
- src/matcher.ts       — extract TODO lines
- tests/matcher.test.ts

## Steps
- [ ] 1. Write failing test: matcher finds "// TODO: x"
- [ ] 2. Run test → see it FAIL
- [ ] 3. Minimal matcher to pass
- [ ] 4. Run tests → see PASS
- [ ] 5. Commit
```

Token coloring: `#` lines → `pg-tk-com`; `[ ]` keep plain; optionally mark
step 1's line `.cur`. Keep ≤ ~16 lines.

Grounded facts: "zero context for our codebase and questionable taste" framing
→ every step explicit; **file map before tasks** ("map created or modified
files with their responsibilities"); steps are 2–5 min: write failing test →
run red → minimal code → run green → commit; **no "TBD"/"TODO"/"implement
later"**; required header block `# [Feature] Implementation Plan / **Goal:** /
**Architecture:** / **Tech Stack:**`; checkbox syntax `- [ ] **Step 1: …**`;
artifact path `docs/superpowers/plans/YYYY-MM-DD-<feature-name>.md`.

---

## Slide 10 — TDD  ·  `pg-terminal` (red → verify → green run)
Source: github.com/obra/superpowers/skills/test-driven-development/SKILL.md.

```js
const S10 = [
  { type:'raw', html:'<span class="pg-cl-red pg-bold">RED</span> <span class="pg-cl-dim">— write one minimal failing test</span>' },
  { type:'cmd', text:'npm test' },
  { type:'pause', ms:450 },
  { type:'out', html:'<span class="pg-cl-red">FAIL</span>: expected \'Email required\', got undefined' },
  { type:'pip', color:'red', text:'Verified RED — the test fails for the right reason', cls:'pg-cl-dim' },
  { type:'pause', ms:450 },
  { type:'raw', html:'<span class="pg-cl-green pg-bold">GREEN</span> <span class="pg-cl-dim">— simplest code to pass</span>' },
  { type:'cmd', text:'npm test' },
  { type:'pause', ms:450 },
  { type:'out', html:'<span class="pg-cl-green">PASS</span>  1 passing' },
  { type:'pip', color:'green', text:'Now safe to REFACTOR — stay green', cls:'pg-cmd' },
  { type:'raw', html:'<span class="pg-cl-dim">Iron law: no production code without a failing test first</span>' },
];
```
Grounded facts: phases **RED / GREEN / REFACTOR** (verbatim definitions);
"NO PRODUCTION CODE WITHOUT A FAILING TEST FIRST"; **Verify RED is MANDATORY**
("a test passing immediately proves nothing"); the doc's own example output
`$ npm test` → `FAIL: expected 'Email required', got undefined` (used verbatim);
bug fix → reproduce with a failing test first.

---

## Slide 11 — Verification before completion  ·  `pg-terminal` (evidence before claim)
Source: github.com/obra/superpowers/skills/verification-before-completion/SKILL.md.

```js
const S11 = [
  { type:'raw', html:'<span class="pg-cl-dim">Claim to make: "All tests pass."</span>' },
  { type:'pip', color:'yellow', text:'Gate: run the proving command first', cls:'pg-cl-dim' },
  { type:'cmd', text:'npm test' },
  { type:'pause', ms:550 },
  { type:'out', html:'Tests:  <span class="pg-cl-green">34 passed</span>, 34 total' },
  { type:'out', text:'Exit code: 0', cls:'pg-cl-dim', delay:50 },
  { type:'pip', color:'green', text:'[Run test command] [See: 34/34 pass] All tests pass', cls:'pg-cmd' },
  { type:'pause', ms:450 },
  { type:'raw', html:'<span class="pg-cl-red">✗ before evidence:</span> <span class="pg-cl-dim">"should work" · "probably" · "looks correct" · "Done!"</span>' },
  { type:'raw', html:'<span class="pg-cl-dim">linter clean ≠ build succeeds (needs exit code 0)</span>' },
];
```
Grounded facts: "NO COMPLETION CLAIMS WITHOUT FRESH VERIFICATION EVIDENCE";
the 5-step gate (identify command → run fresh → read full output + exit code →
verify → claim); the doc's example `"[Run test command] [See: 34/34 pass] All
tests pass"` (verbatim, matches the slide's `34/34`); red-flag phrases from the
doc: **"should", "probably", "seems to", "Great!", "Perfect!", "Done!"**;
linter clean ≠ build succeeds (exit code 0). NOTE: slide currently lists
"looks correct" / "great, perfect" — the doc's exact phrases are "seems to",
"Great!", "Perfect!", "Done!". Minor wording flag — prefer the doc's list.

---

## Slide 12 — Visual companion  ·  `pg-browser` (light) — PHASE B
Source: github.com/obra/superpowers/skills/brainstorming/visual-companion.md.
Secondary (added 2026-05-28): claude.com/blog/using-claude-code-the-unreasonable-effectiveness-of-html — Claude renders plans/diffs/dashboards as HTML, not walls of text.

Light browser frame. **Address bar URL:** local mockup server — use
`localhost:7000` (scheme `http://`, no lock icon — it's local). Titlebar
`title = "Brainstorming · visual companion"`. Tab label: `layout.html`.

Page body (recreate the doc's exact fragment structure — `h2` title, optional
`.subtitle`, then `.options` with `.option[data-choice]` cards each containing
a `.letter` and `.content`>`h3`+`p`; one card shown **selected**):

```html
<div class="pg-page vc">
  <h2>Which layout for the TODO list?</h2>
  <p class="subtitle">Pick the structure that fits a long, scannable list.</p>
  <div class="options">
    <div class="option selected" data-choice="a">
      <div class="letter">A</div>
      <div class="content">
        <h3>Grouped by file</h3>
        <p>Collapsible sections, one per source file.</p>
      </div>
    </div>
    <div class="option" data-choice="b">
      <div class="letter">B</div>
      <div class="content">
        <h3>Flat priority list</h3>
        <p>All TODOs ranked, newest first.</p>
      </div>
    </div>
    <div class="option" data-choice="c">
      <div class="letter">C</div>
      <div class="content">
        <h3>Kanban board</h3>
        <p>Columns by status: open / doing / done.</p>
      </div>
    </div>
  </div>
</div>
```

Designer must add slide-scale CSS for `.vc .options` (stacked cards), `.option`
(rounded card, 1px line, padding), `.option.selected` (blue ring / left bar —
the doc says the server injects "a selection indicator bar automatically"),
`.letter` (A/B/C badge — circle/square with the letter), `.subtitle` (muted).
Use brand tokens only (accent = `--pg-accent` blue ring on selected; pure
ink/paper text).

Grounded facts: local server watches a dir, serves newest HTML by mtime;
fragment auto-wrapped (no `<!DOCTYPE>`); exact markup `<div class="option"
data-choice="a" onclick="toggleSelect(this)">` with `.letter` + `.content`;
`data-multiselect` on container for multi-select; page has `h2` + optional
`.subtitle`; server injects CSS theme + selection indicator bar; clicks logged
to `$STATE_DIR/events` as JSON lines `{"type":"click","choice":"a",…}`. The
`onclick="toggleSelect(this)"` can be shown verbatim on the cards (it's
non-functional in the static deck, but accurate). **This is a recreation —
there is no official screenshot.**

---

## Slide 13 — Claude Design + Figma  ·  `pg-browser` + step strip — PHASE B
Sources (footer must cite ALL THREE):
- anthropic.com/news/claude-design-anthropic-labs
- support.claude.com/en/articles/14604397-set-up-your-design-system-in-claude-design
- figma.com/blog/introducing-claude-code-to-figma  (keep, secondary)

**Restructure:** Claude Design (Anthropic Labs) is the headline; the Figma
code↔design bridge becomes the secondary point.

### 13a — Claude Design canvas (`pg-browser`, light)
Address bar: `claude.ai/design` (scheme `https://`, lock on). Titlebar
`title = "Claude Design — your-team"`. Tab: `Brand kit`. Page = a **UI-kit /
design-system** view: extracted brand colors + type + components.

Page body to recreate (on-brand UI kit using Devspiration tokens as the sample
"extracted" system — colors swatches, type specimen, component chips):

```html
<div class="pg-page cd">
  <div class="cd-eyebrow">Generated design system · UI kit</div>
  <h2>Your brand, built in</h2>
  <div class="cd-row cd-colors">
    <span class="sw" style="background:#1B9CF8"></span>
    <span class="sw" style="background:#303030"></span>
    <span class="sw" style="background:#FFFFFF;border:1px solid #E6E6E6"></span>
    <span class="sw" style="background:#8ACFF5"></span>
    <span class="cd-label">Colors</span>
  </div>
  <div class="cd-row cd-type">
    <span class="cd-type-xl">Aa</span>
    <span class="cd-label">Nunito · 400 / 700 / 800</span>
  </div>
  <div class="cd-row cd-components">
    <span class="chip">Button</span><span class="chip">Card</span>
    <span class="chip">Badge</span><span class="chip">Input</span>
    <span class="cd-label">Components</span>
  </div>
</div>
```

### 13b — 4-step "set up your design system" strip (compact `pg-flow` or labelled step strip)
Use the four documented steps verbatim (labels + one-line each):

```text
01  Create / switch org      — open Claude Design, pick or create an organization
02  Upload brand assets      — codebases, prototypes, slide decks, logos, type
03  Review generated UI kit  — colors, type, components, layout patterns
04  Publish to your team     — flip the "Published" toggle on
```

If using `pg-flow`, the `.steps` header carries these four `.step` items
(`num` + `lbl`); panels can each show a one-line caption. Default per plan:
**enrich in place, no 13a/13b split of the deck slide** — both the canvas and
the step strip live on slide 13. If too dense, Designer may split into deck
slides 13a/13b (triggers 24→25 renumber).

Grounded facts (Claude Design news page):
- "a new Anthropic Labs product that lets you collaborate with Claude to create polished visual work like designs, prototypes, slides, one-pagers, and more"
- imports: text prompts, images & documents (DOCX/PPTX/XLSX), **codebases**, web elements via capture tool
- exports: internal URLs, folders, **Canva, PDF, PPTX, standalone HTML**
- handoff: "Claude packages everything into a handoff bundle that you can pass to Claude Code"
- "your brand, built in": during onboarding Claude builds a design system by reading your codebase + design files; every project after uses your colors/typography/components automatically
- refine: comment inline on elements, edit text directly, adjustment knobs for spacing/color/layout live
- powered by Claude Opus 4.7 vision

Grounded facts (support article — the 4 steps verbatim):
1. **Create or switch to your organization** (org name lower-left → select/create → onboarding)
2. **Upload your brand and product assets** (codebases, prototypes, slide decks or documents, individual assets like logos/type)
3. **Review the generated design system** ("Claude generates a design system (UI kit)" — color palettes, typography, components, layout patterns; validate with test projects)
4. **Make it available to your team** (turn on the **"Published"** toggle). UI elements named: **"Published" toggle**, **"Remix"** button, **"Open"** button.

Figma (secondary, keep): reference a Figma frame URL → design-informed code;
and code→canvas (capture running UI from localhost/staging/prod → editable
Figma frames). These stay as the right-hand "and back to the canvas" point.

---

## Slide 14 — Claude in Chrome  ·  `pg-browser` (with console) 
Source: code.claude.com/docs/en/chrome — `claude --chrome`, `/chrome`, reads console/DOM, pauses on login/CAPTCHA.
Secondary (added 2026-05-28): claude.com/blog/best-practices-for-computer-and-browser-use-with-claude — treat web pages as untrusted; human in the loop for high-stakes actions.

Light browser frame. Address bar `localhost:3000` (scheme `http://`).
Titlebar `title = "Claude in Chrome (beta)"`. Show a page + a **console strip**
underneath the page body that Claude is reading. Two ways to render:

Option A (recommended) — browser body split: top = a simple login form mock,
bottom = a dark console strip:

```html
<div class="pg-page chrome-demo">
  <div class="cd-form">
    <h2>Sign in</h2>
    <div class="field"></div>
    <div class="field err">Error messages not showing</div>
    <button class="btn">Submit</button>
  </div>
  <div class="console">
    <span class="c-line"><span class="pg-cl-red">✗</span> Uncaught TypeError: cannot read 'message' of undefined</span>
    <span class="c-line"><span class="pg-cl-dim">  at validateForm (login.js:42)</span></span>
    <span class="c-line"><span class="pg-cl-blue">claude</span> reading console → fixing login.js:42</span>
  </div>
</div>
```

Companion command card (corner-tag or a tiny mono line, real commands):

```text
claude --chrome      # enable for this session
/chrome              # or inside a session; check status / reconnect
```

Grounded facts: `claude --chrome` to launch with Chrome; `/chrome` to enable
in-session and to check connection/permissions/reconnect; works with Chrome and
Edge (beta); reads console errors + DOM state then fixes the code; "When Claude
encounters a login page or CAPTCHA, it pauses and asks you to handle it
manually." Keep the slide's "verify UI against the Figma mock" — the doc lists
"Design verification: build a UI from a Figma mock, then open it in the browser
to verify it matches." All accurate.

---

## Slide 15 — DevTools vs Playwright  ·  compact `pg-terminal` (optional, one supporting visual)
Sources: github.com/ChromeDevTools/chrome-devtools-mcp · github.com/microsoft/playwright-mcp.

Per plan: "don't overcrowd compare." Keep ONE small supporting visual or skip.
If included, a compact dark `pg-terminal` showing each server being added:

```js
const S15 = [
  { type:'cmd', text:'claude mcp add chrome-devtools' },
  { type:'pip', color:'green', text:'connected · drives Chrome over the DevTools Protocol', cls:'pg-cl-dim' },
  { type:'pause', ms:350 },
  { type:'cmd', text:'claude mcp add playwright' },
  { type:'pip', color:'green', text:'connected · headless, scripted, runs in CI', cls:'pg-cl-dim' },
];
```
NOTE: I did not deep-fetch these two READMEs (plan marks this slide
"optional / don't overcrowd"). The two one-liners restate the slide's own
already-cited bullets (DevTools = inspect over DevTools Protocol; Playwright =
headless/scripted/CI). If Frontend wants the exact `mcp add` invocation
verbatim, QA should confirm against the two READMEs before shipping, or drop
the terminal and leave the compare text-only. **Low confidence on exact
command syntax — flag for QA.**

---

## Slide 16 — .NET MCP  ·  `pg-terminal` (the dotnet_* tool surface)
Source: github.com/jongalloway/dotnet-mcp.

```js
const S16 = [
  { type:'cmd', text:'use the dotnet MCP: build and test the project' },
  { type:'pause', ms:400 },
  { type:'pip', color:'yellow', text:'dotnet_project · Build', cls:'pg-cl-dim' },
  { type:'out', html:'  <span class="pg-cl-green">Build succeeded</span> <span class="pg-cl-dim">· 0 warnings</span>', delay:60 },
  { type:'pip', color:'yellow', text:'dotnet_project · Test', cls:'pg-cl-dim' },
  { type:'out', html:'  <span class="pg-cl-green">Passed!</span> <span class="pg-cl-dim">— 48 of 48</span>', delay:60 },
  { type:'pause', ms:350 },
  { type:'pip', color:'yellow', text:'dotnet_ef · MigrationsAdd AddOrders', cls:'pg-cl-dim' },
  { type:'out', text:'  Done. Migrations/2026..._AddOrders.cs', cls:'pg-cl-dim', delay:60 },
  { type:'pip', color:'green', text:'one MCP server wraps the whole dotnet CLI', cls:'pg-cmd' },
];
```
Grounded facts (consolidated tool names + ops, verbatim from README):
`dotnet_project` (New/Restore/Build/Run/Test/Publish/Clean/Pack/Watch/Format…),
`dotnet_package` (Add/Remove/Search/Update/List/AddReference…),
`dotnet_solution`, `dotnet_ef` (**MigrationsAdd / DatabaseUpdate / DbContextScaffold**…),
`dotnet_workload`, `dotnet_tool`, `dotnet_sdk` (**ListSdks / ListRuntimes / ListTemplates / Info**…),
`dotnet_dev_certs` (certs **and** user secrets: SecretsInit/SecretsSet…).
Read-only resources: `dotnet://sdk-info`, `dotnet://runtime-info`,
`dotnet://templates`, `dotnet://frameworks`. The slide's lowercase paraphrase
(`migrations add`) is fine for prose; the script uses the real `MigrationsAdd`.

---

## Slide 17 — Azure + gh  ·  `pg-terminal` (gh pr create + azure plugin install)
Sources: github.com/microsoft/azure-skills (+ gh is built-in).

```js
const S17 = [
  { type:'cmd', text:'open a PR for this branch' },
  { type:'pause', ms:400 },
  { type:'pip', color:'yellow', text:'gh pr create', cls:'pg-cl-dim' },
  { type:'out', html:'  <span class="pg-cl-blue">https://github.com/acme/app/pull/142</span>', delay:60 },
  { type:'pip', color:'green', text:'gh is on PATH — no install needed', cls:'pg-cmd' },
  { type:'pause', ms:400 },
  { type:'cmd', text:'/plugin install azure@claude-plugins-official' },
  { type:'pause', ms:350 },
  { type:'pip', color:'green', text:'Azure skills installed', cls:'pg-cmd' },
  { type:'out', text:'  azure-deploy · azure-validate · azure-diagnostics', cls:'pg-cl-dim', delay:60 },
];
```
Grounded facts: `gh` CLI is used out-of-the-box for PRs/issues (slide already
states this). Azure plugin install verbatim: **`/plugin install
azure@claude-plugins-official`**; real skills include `azure-prepare`,
`azure-validate`, `azure-deploy`, `azure-upgrade`, `azure-diagnostics`,
`azure-cost`, `azure-rbac`, etc. ("200+ tools across 40+ services" via the
Azure MCP Server). **Azure infra only — NO Azure DevOps** in this repo, so the
slide's `az devops` wrapper is correctly the user's own project skill, not
something the plugin provides.

---

## Slide 18 — Git worktrees  ·  `pg-terminal` (dark)
Source: code.claude.com/docs/en/worktrees.

```js
const S18 = [
  { type:'cmd', text:'claude --worktree feature-auth' },
  { type:'pause', ms:400 },
  { type:'out', text:'  created .claude/worktrees/feature-auth/', cls:'pg-cl-dim', delay:60 },
  { type:'out', text:'  branch  worktree-feature-auth', cls:'pg-cl-dim', delay:60 },
  { type:'pip', color:'green', text:'isolated session — edits never touch other worktrees', cls:'pg-cmd' },
  { type:'pause', ms:400 },
  { type:'raw', html:'<span class="pg-cl-dim"># .worktreeinclude copies gitignored files in:</span>' },
  { type:'out', text:'  .env  .env.local  config/secrets.json', cls:'pg-cl-blue', delay:60 },
  { type:'pause', ms:300 },
  { type:'cmd', text:'claude --worktree' },
  { type:'out', text:'  generated name: bright-running-fox', cls:'pg-cl-dim', delay:60 },
];
```
Grounded facts (verbatim): `claude --worktree feature-auth` creates under
`.claude/worktrees/<value>/` on branch `worktree-<value>`; `-w` is the short
flag; omit the name → generated name like `bright-running-fox`; a worktree is a
separate working dir + branch sharing repo history; "edits in one session never
touch files in another"; **`.worktreeinclude`** (.gitignore syntax) copies
gitignored files like `.env`, `.env.local`, `config/secrets.json` into new
worktrees. Slide is accurate; script just makes it concrete.

---

## Slide 19 — Team agents  ·  `pg-terminal` or `pg-flow` (lead + teammate + SendMessage)
Source: code.claude.com/docs/en/agent-teams.
Secondary (added 2026-05-28): claude.com/blog/claude-managed-agents-updates — hosted/secure variant (orchestration on Anthropic's side, tools + data in your sandbox, MCP tunnels).

Terminal option (dark):
```js
const S19 = [
  { type:'cmd', text:'create an agent team to review PR #142' },
  { type:'pause', ms:400 },
  { type:'pip', color:'green', text:'Team lead spawned 3 teammates', cls:'pg-cmd' },
  { type:'out', text:'  • security   • performance   • test-coverage', cls:'pg-cl-dim', delay:60 },
  { type:'pause', ms:300 },
  { type:'raw', html:'<span class="pg-cl-blue">SendMessage</span> → security: <span class="pg-cl-dim">"check token handling in src/auth"</span>' },
  { type:'raw', html:'<span class="pg-cl-dim">shared task list:</span> 6 tasks · claim · depends-on · complete' },
  { type:'pause', ms:300 },
  { type:'pip', color:'green', text:'teammates message each other directly — not only the lead', cls:'pg-cmd' },
];
```
Grounded facts: lead session + teammates as independent sessions with own
context windows; **`SendMessage`** to one teammate by name; shared task list
with **pending / in progress / completed** + dependency blocking + file-locked
claiming; display modes **in-process** (default; Shift+Down to cycle) or
**split panes (tmux / iTerm2)**; `TeammateIdle`/`TaskCreated`/`TaskCompleted`
hooks for quality gates. All matches the slide.

---

## Slide 20 — Superpowers × teams  ·  `pg-browser` (GitHub issue #429 view)
Source: github.com/obra/superpowers/issues/429.

Light browser frame recreating a GitHub issue page. Address bar
`github.com/obra/superpowers/issues/429` (scheme `https://`, lock on).
Titlebar `title = "obra/superpowers · Issue #429"`. Tab: `Issues`.

Page body — GitHub-issue chrome (recreation, on-brand): issue title, an
`Open` state pill, author/meta line, body excerpt:

```html
<div class="pg-page gh-issue">
  <div class="gh-state open">Open</div>
  <h2>Support superpowers skills under agent teams</h2>
  <p class="gh-meta">#429 · feature request</p>
  <p>The using-superpowers skill's &lt;SUBAGENT-STOP&gt; block prevents
     teammates from invoking <code>superpowers:*</code> skills directly.</p>
  <p class="gh-work">Working pattern: the <b>lead</b> runs every
     <code>superpowers:*</code> skill; teammates do plain implementation;
     review subagents verify at phase boundaries.</p>
</div>
```

Designer: `.gh-state.open` = green pill (use `--pg-green` background, dark text
OR brand-ink text — keep contrast; this is the one place a small green pill is
on-topic and acceptable as a GitHub affordance). Keep all body text pure ink.

Grounded facts: issue #429 is the open request to add team-agents support to
superpowers; the working pattern (lead runs skills, teammates implement, review
subagents verify) is exactly what CLAUDE.md documents for this project. I did
not fetch the live issue body verbatim — the text above paraphrases the known
caveat from CLAUDE.md + the issue's premise. **Flag for QA:** confirm the issue
title/number against the live page before shipping the exact title string; the
number #429 and "open" state are load-bearing.

---

## Slide 22 — E2E setup  ·  `pg-terminal` (init + env flag)
Source: code.claude.com/docs/en/agent-teams (env flag) + project layout.

Reuse the existing `devspiration-init` SCRIPT shape (already in `playground.js`
SCRIPTS) but ground the env flag. Suggested:

```js
const S22 = [
  { type:'cmd', text:'export CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1' },
  { type:'pause', ms:300 },
  { type:'pip', color:'green', text:'agent teams enabled (experimental)', cls:'pg-cl-dim' },
  { type:'cmd', text:'claude --effort xhigh' },
  { type:'pause', ms:350 },
  { type:'raw', html:'<span class="pg-bold pg-cl-blue">Claude Code</span> <span class="pg-cl-dim">· opus 4.7 · with xhigh effort</span>' },
  { type:'cmd', text:'create a team: researcher, designer, frontend, qa' },
  { type:'pip', color:'green', text:'Team lead spawned 4 teammates', cls:'pg-cmd' },
];
```
Grounded facts: `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1` is the verbatim enable
flag (settings.json `env` or shell); the four roles match the project's actual
team (Researcher/Designer/Frontend/QA per CLAUDE.md). `--effort xhigh` is a real
launch flag (`--effort` documented in model-config). Keep the project-tree
`<pre>` the slide already has, OR show this terminal beside it — Designer's call.
NOTE: `npx devspiration init` (in the existing `devspiration-init` SCRIPT and on
slide 22's narrative) is an **illustrative** command, not a real published CLI —
keep it only if framed as illustrative; the env flag + team creation are the
real, verifiable parts.

---

## Slide 23 — E2E execution  ·  `pg-flow` (brainstorm → plan → parallel build → verify)
Source: code.claude.com/docs/en/agent-teams (+ the superpowers SDLC).

`pg-flow` with four steps mirroring the real pipeline this deck followed:

```text
steps:  01 Brainstorm   02 Plan   03 Parallel build   04 Verify
```
Panels (each `.panel[data-caption]`):
- **01 Brainstorm** — `superpowers:brainstorming`, one question at a time → spec.md (caption: "Design approved before any code — hard gate")
- **02 Plan** — `superpowers:writing-plans` → numbered TDD plan.md (caption: "Every step explicit; no TBD")
- **03 Parallel build** — team agents: researcher + designer in parallel (Phase 1), frontend composes (Phase 2) (caption: "Teammates claim tasks; SendMessage between them")
- **04 Verify** — QA + review subagent at each boundary; `verification-before-completion` (caption: "Evidence before 'done'")

Optional: panel 03 can embed a tiny `data-autorun` `pg-terminal` reusing S19's
team script (the flow stepper auto-runs a terminal inside the active panel —
see `wireFlow`, playground.js:235). Keep it light.

Grounded facts: this mirrors the documented agent-teams pattern (lead +
parallel teammates + shared tasks + review at boundaries) and the project's own
CLAUDE.md workflow (lead runs superpowers skills; teammates implement; review
subagents at phase boundaries). All accurate to the cited source + project docs.

---

## Summary for team-lead

- All content slides (02,03,04,05,06,08,09,10,11,12,13,14,16,17,18,19,20,22,23) now have source-grounded visual content. Title/dividers/closing (01,07,21,24) stay minimal per plan.
- **7 accuracy flags** raised (see top section). The two that need a copy/structure decision: **Slide 13** (must foreground Claude Design + cite 3 sources — already in plan) and **Slide 06** (align bullet wording to Warp's documented feature names). The rest are minor (Slide 11 red-flag phrase wording; Slide 16 case of dotnet_* ops; Slide 17 missing install command — script adds it).
- **3 low-confidence items flagged for QA to verify verbatim before ship:** Slide 15 `mcp add` command syntax (not deep-fetched), Slide 20 live issue #429 title string, and Slide 22 `npx devspiration init` (illustrative, not a real CLI).
