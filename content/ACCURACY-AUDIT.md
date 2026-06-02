# Accuracy Audit — Claude Code presentation (23 slides)

**Auditor:** docs-expert · **Date:** 2026-05-25
**Scope:** Technical correctness of every slide's copy + HEAD-verification of every footer source URL.
**Method:** Each volatile claim checked against current official docs (code.claude.com/docs, anthropic.com, vendor repos) via WebFetch/WebSearch/Microsoft Learn MCP and the GitHub API. Every footer URL HEAD-checked with `curl`; GitHub `/blob/` paths additionally verified via `raw.githubusercontent.com` (the blob path returns a soft-200 even for missing files) and via `gh api`.

---

## 1. URL HEAD-check results

**All 24 footer / inline source URLs return HTTP 200 (after redirects). No dead links. No replacements required.**

| Slide | URL | Status |
|---|---|---|
| 01 | https://claude.com/product/claude-code | 200 |
| 02 / 23 | https://code.claude.com/docs/en/overview (+ /docs) | 200 |
| 03 | https://claude.com/blog/how-claude-code-works-in-large-codebases-best-practices-and-where-to-start | 200 |
| 04 | https://code.claude.com/docs/en/memory | 200 |
| 05 | https://docs.warp.dev/agent-platform/cli-agents/claude-code | 200 |
| 06 | https://github.com/obra/superpowers | 200 |
| 07 | …/blob/main/skills/brainstorming/SKILL.md | 200 (raw-verified) |
| 08 | …/blob/main/skills/writing-plans/SKILL.md | 200 (raw-verified) |
| 09 | …/blob/main/skills/test-driven-development/SKILL.md | 200 (raw-verified) |
| 10 | …/blob/main/skills/verification-before-completion/SKILL.md | 200 (raw-verified) |
| 11 | https://www.anthropic.com/news/claude-opus-4-7 | 200 |
| 12 | …/blob/main/skills/brainstorming/visual-companion.md | 200 (raw-verified) |
| 13 | https://www.figma.com/blog/introducing-claude-code-to-figma/ | 200 |
| 14 | https://code.claude.com/docs/en/chrome | 200 |
| 15 | https://github.com/microsoft/playwright-mcp | 200 |
| 16 | https://github.com/jongalloway/dotnet-mcp | 200 (repo live, not archived) |
| 17 | https://code.claude.com/docs/en/worktrees | 200 |
| 18 | https://github.com/microsoft/azure-skills | 200 (repo live, not archived) |
| 19 / 21 / 22 | https://code.claude.com/docs/en/agent-teams | 200 |
| 20 | https://github.com/obra/superpowers/issues/429 | 200 |

> **Update (2026-05-27):** Slide 03 in the table above (the CLAUDE.md slide — deck slide 04) had its primary source changed from `code.claude.com/docs/en/memory` to the "How Claude Code works in large codebases" blog post, when blog-derived scaling/maintenance guidance was folded into the slide. The blog URL was verified reachable (HTTP 200) on 2026-05-27. Rows otherwise reflect the original 2026-05-25 audit.
>
> **Update (2026-05-28) — Wave 2:** The deck grew from 24 to **25 slides**. A new proof-point slide (deck **21**, "Claude Code in the wild — CodeRabbit") was inserted after the team-agents slides; downstream slides shifted (End-to-end → 22, E2E setup → 23, E2E execution → 24, Closing → 25). The "All 24 …" count in §1 reflects the pre-Wave-2 state. Four claude.com/blog sources were added to footers, all verified reachable (HTTP 200) on 2026-05-28:
> - Deck 21 (CodeRabbit, primary): `https://claude.com/blog/how-coderabbit-used-claude-to-build-an-agent-orchestration-system`
> - Deck 12 (Visual planning, secondary): `https://claude.com/blog/using-claude-code-the-unreasonable-effectiveness-of-html`
> - Deck 14 (Claude in Chrome, secondary): `https://claude.com/blog/best-practices-for-computer-and-browser-use-with-claude`
> - Deck 15 (DevTools vs Playwright, 3rd source): `https://claude.com/blog/best-practices-for-computer-and-browser-use-with-claude`
> - Deck 19 (Team agents, secondary): `https://claude.com/blog/claude-managed-agents-updates`

---

## 2. Content corrections (by priority)

### HIGH — substantive factual errors

---

**Slide 21 — wrong env-var name for agent teams.**
- **Current text (code block):** `├── .claude/settings.json       # AGENT_TEAMS=1`
- **Corrected text:** `├── .claude/settings.json       # CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1`
- **Why:** The official flag is `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS`, set to `1`. There is no `AGENT_TEAMS` variable. Confirmed verbatim on the agent-teams doc ("Enable them by setting the `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS` environment variable to `1`") and the costs doc.
- **Source:** https://code.claude.com/docs/en/agent-teams (Enable agent teams)
- **Note for Frontend:** the comment may need a smaller font / wrap; the full var name is long. Slide 21 bullet 3 ("Team-agents env flag enabled") stays correct as prose.

---

**Slides 14 & 15 — "Chrome DevTools MCP" is conflated with the Claude-in-Chrome extension. These are two different products.**

There are two distinct browser integrations, and the deck mixes them:

1. **Claude in Chrome** (first-party Anthropic). Enabled by `claude --chrome` / `/chrome`. Connects via the **"Claude in Chrome" browser extension** over native messaging; MCP server surfaces as `claude-in-chrome`. Reuses your existing logged-in Chrome/Edge tab; pauses on logins/CAPTCHAs. Documented at code.claude.com/docs/en/chrome.
2. **Chrome DevTools MCP** (`chrome-devtools-mcp`, published by **Google / ChromeDevTools**, github.com/ChromeDevTools/chrome-devtools-mcp). A separate MCP server using the Chrome DevTools Protocol + Puppeteer; does performance traces, Lighthouse, network/console inspection. Not the same as `--chrome`.

- **Slide 14** — title/eyebrow + footer present this as "Chrome DevTools MCP", but the **body correctly describes Claude-in-Chrome** (`claude --chrome`, `/chrome`, "Claude in Chrome extension", pauses on login/CAPTCHA). The body is accurate to its source; the **slide label "14 Chrome DevTools MCP" is the mismatch.**
  - **Correction (choose one, coordinate with the narrative):**
    - (a) **Rename slide 14** to "Claude in Chrome" (recommended — the copy already matches the chrome doc and the cited source is the chrome doc), **or**
    - (b) keep the "Chrome DevTools MCP" framing but then the body must describe the Google `chrome-devtools-mcp` server (npx `chrome-devtools-mcp`, CDP, Lighthouse) and the source URL must change to github.com/ChromeDevTools/chrome-devtools-mcp.
  - The body bullets themselves are all **factually correct for Claude-in-Chrome** as written. Lowest-risk fix = option (a), rename the slide.
- **Slide 15** — compares "**Chrome DevTools MCP** vs Playwright MCP". Two of its left-column bullets actually describe **Claude-in-Chrome**, not the Google DevTools MCP:
  - "Reuses your existing browser session" → that is the **Claude-in-Chrome** behavior (shares your logged-in session). The Google `chrome-devtools-mcp` launches/attaches to a Chrome instance via CDP; it does not reuse your day-to-day signed-in profile by default.
  - "Drives your live Chrome or Edge tab" → Edge support is a **Claude-in-Chrome** property; `chrome-devtools-mcp` is Chrome/Chromium via CDP.
  - "lighthouse audits" → that one **is** genuinely a Chrome DevTools MCP capability.
  - **Recommended correction:** decide what the left column is. If it is meant to be **Claude-in-Chrome**, retitle the column "Claude in Chrome (`--chrome`)" and the slide's source can stay split (chrome doc for the left, playwright-mcp repo for the right). If it is meant to be the **Google Chrome DevTools MCP**, drop "reuses your existing browser session", keep "lighthouse audits / performance traces / lower token cost", and note it's CDP-driven.
  - **Source(s):** https://code.claude.com/docs/en/chrome ; https://github.com/ChromeDevTools/chrome-devtools-mcp ; https://github.com/microsoft/playwright-mcp

---

**Slides 20 & 23 — issue #429 does NOT document the "SUBAGENT-STOP blocks teammates from invoking superpowers skills" caveat.**
- **Current framing:** Slide 20 title "Superpowers × Teams — the #429 caveat"; slide 23 card "read issue #429 for the caveat." CLAUDE.md describes #429 as documenting that the using-superpowers skill's `<SUBAGENT-STOP>` block prevents teammates from invoking `superpowers:*` skills.
- **What #429 actually is:** an **OPEN enhancement request** titled **"Support for Claude Code Agent Teams (TeammateTool, SendMessage, TaskList)"**. It asks superpowers to *add* team-awareness (a new `agent-teams` skill, team-aware adaptations of existing skills, teammate-side skill awareness). It does **not** mention a `SUBAGENT-STOP` block, and does **not** describe teammates being prevented from invoking superpowers skills. The "caveat/workaround" framing is not supported by the issue text. (The thread's comments are community forks adding team support — again, no SUBAGENT-STOP claim.)
- **Corrected text options:**
  - **Most accurate:** retitle slide 20 to something like "Superpowers × Teams — not integrated yet (#429)" and have the body explain: *superpowers has no native agent-teams support; #429 tracks the gap; the community pattern is the lead runs `superpowers:*` skills while teammates do plain implementation.* That community pattern is exactly what CLAUDE.md prescribes — but it is a **convention this project adopted**, not a documented behavior of issue #429.
  - **Minimal:** if the deck keeps the "#429 caveat" label, change slide 23's card copy from "read issue #429 for the caveat" to "see issue #429 — superpowers + teams is still an open integration" so it doesn't imply the issue documents a specific blocker.
- **Source:** https://github.com/obra/superpowers/issues/429 (title + body; state = OPEN)

---

**Slide 16 — two of the four code-block action labels are wrong; tool NAMES are all correct.**
The four tool names shown (`dotnet_project`, `dotnet_package`, `dotnet_ef`, `dotnet_sdk`) **all exist** in jongalloway/dotnet-mcp. Two action descriptions are inaccurate:
- **`dotnet_package   add | restore | search`** → there is **no `restore` action** on `dotnet_package`. Its actions are Add, Remove, Search, Update, List, AddReference, RemoveReference, ListReferences, ClearCache.
  - **Corrected:** `dotnet_package   add | search | update | list` (or `add | remove | search`).
- **`dotnet_sdk       list | install | uninstall`** → `dotnet_sdk` is **SDK & template *information*** (read/query): Version, Info, ListSdks, ListRuntimes, ListTemplates, SearchTemplates, TemplateInfo, FrameworkInfo, etc. It does **not** install/uninstall SDKs. (Installing/uninstalling is `dotnet_workload` and `dotnet_tool`; "InstallTemplatePack/UninstallTemplatePack" on `dotnet_sdk` are template packs only.)
  - **Corrected:** `dotnet_sdk       version | list sdks | templates` (or `info | list-sdks | list-templates`).
- Accurate as-is: `dotnet_project create|build|test|run|publish` (actions are PascalCase `New/Build/Test/Run/Publish` — the lowercase verbs are an acceptable simplification; "create" → action is literally `New` but conceptually fine). `dotnet_ef  migrations add | database update` is correct (`MigrationsAdd`, `DatabaseUpdate`).
- The three text bullets on slide 16 are **all accurate** (wraps `dotnet`; manages NuGet/EF migrations/dev certs/workloads/user secrets — `dotnet_dev_certs` covers certs+secrets; read-only resources expose SDKs/runtimes/templates/frameworks; consolidated typed tools).
- **Source:** https://github.com/jongalloway/dotnet-mcp (README "Available Tools" section)

---

### MEDIUM — wording imprecise; could mislead a knowledgeable viewer

---

**Slide 11 — "Claude Code defaults *plan-mode* runs to xhigh" is too narrow.**
- **Current text (bullet 3):** "Claude Code defaults plan-mode runs to **xhigh** already"
- **Issue:** On Opus 4.7, `xhigh` is the **session-wide default effort** (as of v2.1.117), not a plan-mode-specific default. The phrase likely derives from the Opus 4.7 announcement's "we've raised the default effort level to `xhigh` for all plans" — where **"plans" = subscription plans**, not plan mode. There is no separate per-plan-mode effort default.
- **Corrected text:** "Claude Code already defaults Opus 4.7 to **xhigh**" (drop "plan-mode").
- **Everything else on slide 11 is correct:** five tiers `low, medium, high, xhigh, max` ✓ (model-config doc table for Opus 4.7); `xhigh` sits between `high` and `max` ✓; `/effort <level>` sets a tier directly ✓ ("`/effort` followed by a level name to set it directly").
- **Source:** https://code.claude.com/docs/en/model-config (Adjust effort level) ; https://www.anthropic.com/news/claude-opus-4-7

---

**Slide 19 — "Display modes: in-process, or split panes via tmux / iTerm2" is correct; flag only a precision nuance.**
- The doc lists exactly two display modes — **In-process** and **Split panes** (Split panes "Requires tmux, or iTerm2"). The slide is **accurate**. No change required.
- Optional precision: split panes are **not supported in VS Code's integrated terminal, Windows Terminal, or Ghostty** (a known limitation). Not a correction — only mention if the deck wants the caveat.
- **Source:** https://code.claude.com/docs/en/agent-teams (Choose a display mode; Limitations)

---

**Slide 7 — brainstorming spec path is missing the date prefix.**
- **Current text (bullet 4):** spec at `docs/superpowers/specs/<topic>-design.md`
- **Corrected text:** `docs/superpowers/specs/YYYY-MM-DD-<topic>-design.md` (the skill writes a date-prefixed filename).
- Everything else on slide 7 is verbatim-accurate (hard gate; one question at a time; 2–3 approaches + recommendation).
- **Source:** https://github.com/obra/superpowers/blob/main/skills/brainstorming/SKILL.md (checklist item 6)

---

### LOW — accurate; logged for completeness / optional polish

- **Slide 1** — accurate (positioning copy; source claude.com/product/claude-code is live).
- **Slide 2** — accurate. "One engine across terminal, VS Code, JetBrains, Desktop, and the browser — same memory, same settings" matches the overview doc verbatim. All four bullets confirmed.
- **Slide 3** — accurate. Four scopes (managed policy, user, project, local), broadest→most-specific load order, "closer files win on ties" ✓; `/init` analyzes the codebase ✓; `CLAUDE.local.md` in .gitignore ✓; `.claude/rules/` with `paths:` frontmatter ✓.
- **Slide 4** — accurate. `~/.claude/projects/<project>/memory/` ✓; `MEMORY.md` index ✓; "first 200 lines load every session" ✓ (doc: first 200 lines or 25KB, whichever first); topic files on demand ✓; `/memory` toggle ✓; `autoMemoryEnabled: false` ✓.
- **Slide 5** — accurate. All five Warp features verified verbatim on docs.warp.dev: agent notifications/approvals, expanded input editor (Ctrl-G) for longer prompts, select code as context, inline review comments to the agent, session sharing with teammates.
- **Slide 6** — accurate (section divider; superpowers repo live).
- **Slide 8** — accurate. "zero context" engineer, file map first, 2–5-min steps, no "TBD" — all confirmed in writing-plans SKILL.md. (Default plan save path is `docs/superpowers/plans/YYYY-MM-DD-<feature>.md`; slide doesn't cite a path, so nothing to fix.)
- **Slide 9** — accurate. "Iron law — no production code without a failing test first" matches "NO PRODUCTION CODE WITHOUT A FAILING TEST FIRST"; verify-red, minimal green, reproducing test before bug fix — all confirmed.
- **Slide 10** — accurate. "No completion claims without fresh evidence in the current message"; identify→run→read→claim; "linter passing ≠ build passing"; "done ≠ diff correct"; red-flag phrases — all confirmed verbatim.
- **Slide 12** — accurate. Companion to brainstorming; writes HTML fragment to `screen_dir`; clicks recorded to `state_dir/events`; decide-per-question — all confirmed in visual-companion.md. (Abstract names `screen_dir`/`state_dir` are exactly the doc's terms.)
- **Slide 13** — accurate. Bidirectional Figma integration confirmed: code→Figma "capture a real, functioning UI from a browser—in production, staging, or localhost—into editable frames"; Figma→code via Figma MCP + "link to a Figma frame".
- **Slide 17** — accurate. `claude --worktree feature-auth` (named), `claude --worktree` (auto-named, e.g. `bright-running-fox`), `claude --worktree bugfix-123` (parallel) ✓; dir `.claude/worktrees/<name>/` ✓; branch `worktree-<name>` ✓; `.worktreeinclude` auto-copies gitignored files like `.env` ✓.
- **Slide 18** — accurate. microsoft/azure-skills ships `azure-deploy`, `azure-validate`, `azure-diagnostics` skills (matches "deploy, validate, diagnose"), officially supports Claude Code, wires in the Azure MCP Server. The plugin targets Azure **infrastructure** — it does NOT cover Azure DevOps boards/repos/pipelines, so the slide's guidance to "write a project skill that shells out to `az devops`" for Azure DevOps proper is a correct distinction. gh CLI column is standard/correct.
- **Slide 22** — accurate as a narrative of this project's own build (not externally verifiable; the agent-teams source supports the team-agents mechanics described).
- **Slide 23** — accurate except the slide-20-linked "#429 caveat" card wording (see HIGH item above). Footer + links live.

---

## 3. Summary for the lead

- **Dead URLs:** 0 (all 24 sources return 200; no replacements needed).
- **Corrections:** **6** distinct items — 4 HIGH (slide 21 env var; slides 14/15 Chrome DevTools MCP conflation; slides 20/23 #429 mischaracterization; slide 16 two action labels), 2 MEDIUM (slide 11 "plan-mode" wording; slide 7 spec path). Slide 19 reviewed and confirmed accurate.
- **Biggest risks to credibility (fix first):** (1) slide 21's `AGENT_TEAMS=1` is a flat-out wrong env var; (2) the slides-14/15 "Chrome DevTools MCP" label describes the Claude-in-Chrome extension, which is a different product; (3) the #429 "caveat" framing is not what the issue says.
- Hand corrections to the Frontend Developer; do not edit index.html (per task #2 scope).
