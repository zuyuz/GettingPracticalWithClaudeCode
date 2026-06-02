# Devspiration Claude Code Presentation

A 30-minute internal tech-note presentation titled **"Getting practical with Claude Code"**, delivered as a single-page HTML slide deck that runs in any browser.

The deck tells a granular journey: setup foundations → workflow tooling → multi-agent orchestration → end-to-end scenario. Every slide cites its primary source in the footer.

## What to open

- **The deliverable:** `presentation/index.html` — open in Chrome or Edge, arrow keys to navigate, `F11` for browser-native fullscreen.
- **The plan:** `C:\Users\Artur\.claude\plans\eventual-moseying-cascade.md`
- **The design system:** `devspiration-design-system/` — see its `README.md` and `SKILL.md`.

## Design system — the source of truth

This project reuses an existing Devspiration design system that lives in `devspiration-design-system/project/`. Do not duplicate its tokens; link to them.

| Path | Role |
|---|---|
| `devspiration-design-system/project/colors_and_type.css` | All color, type, spacing, motion, radius, shadow tokens. Imports Nunito + JetBrains Mono. Link via `<link rel="stylesheet">`. |
| `devspiration-design-system/project/motion.css` | Entrance + ambient animations (`m-rise`, `m-fade-in`, `m-from-left`, `m-scale-in`, `[data-stagger]`, `prefers-reduced-motion` fallback). |
| `devspiration-design-system/project/slides/index.html` | Reference deck (PPTX-style 1920×1080) — pattern source for slide chrome and deck wiring. |
| `devspiration-design-system/project/slides/deck-stage.js` | Custom-element deck controller — fork or reuse. |
| `devspiration-design-system/project/slides/wire-motion.js` | Binds slide-change events to motion classes. |
| `devspiration-design-system/project/assets/logo/` | Wordmark — bottom-left on every slide. |
| `devspiration-design-system/project/assets/brand-objects/` | 16 glossy 3D PNGs — one per slide, cropped past an edge. |
| `devspiration-design-system/project/assets/icons/` | Filled SVG icons. |
| `devspiration-design-system/project/SKILL.md` | Brand hard-rules and skill entrypoint. |

### Brand hard rules (from `devspiration-design-system/project/SKILL.md`)

- **Two backgrounds only:** `#FFFFFF` (paper) or `#303030` (ink). No gradients.
- **One 3D prop per slide**, cropped past an edge. Never centered, never floating.
- **Nunito** for everything. 400 (regular) and 700 (bold) are the working weights; 800 (extrabold) for hero numerals only.
- **Sentence case** titles. All-caps reserved for eyebrows (≤24 chars, tracked +0.14em).
- **No emoji. No exclamation marks.**
- **Wordmark sits bottom-left** on every slide.
- **Don't invent new 3D props** — use the 16 in `assets/brand-objects/`.
- **Don't tint icons blue** — pure ink (`#303030`) on light, pure paper (`#FFFFFF`) on dark.

## Team workflow (superpowers + team agents)

This project uses the [`superpowers`](https://github.com/obra/superpowers) plugin with the experimental team-agents feature. There is a known interaction caveat documented in [obra/superpowers#429](https://github.com/obra/superpowers/issues/429): the `using-superpowers` skill's `<SUBAGENT-STOP>` block prevents teammates from invoking `superpowers:*` skills directly.

**The working pattern (community-validated):**

1. **Team lead (main session)** invokes all `superpowers:*` skills — brainstorming, writing-plans, verification-before-completion.
2. **Teammates** do pure implementation. Their spawn prompts include: *"You may not invoke `superpowers:*` skills — the lead handles those."*
3. **Review subagents** dispatched via the `Agent` tool (not as teammates) at phase boundaries — these can invoke `verification-before-completion` because they're fresh subagents on focused review tasks, outside the team's task loop.

When working on this project as the lead:

- Brainstorm and plan in the main session (use the relevant `superpowers:*` skills).
- `TeamCreate` and spawn role-specific teammates with the no-superpowers instruction baked into the prompt.
- At each phase boundary (research done, implementation done, QA done) dispatch a fresh review subagent via `Agent` to verify before declaring the phase complete.
- Shutdown teammates via `SendMessage({type: "shutdown_request"})` when the project is done.

## Source-citation requirement

Every slide must show its primary source URL in the footer. The Researcher teammate HEAD-verifies each URL at write-time (`curl -I`). QA re-verifies at the end. Broken sources fail the verification gate.

## Quick start

```pwsh
# Open the deliverable
start presentation\index.html

# Navigate
# ← / →     advance / reverse
# Home/End  first / last slide
# 1-9       jump to slide N
# F11       browser-native fullscreen
```

## File layout

```
.
├── CLAUDE.md                          ← this file
├── .claude/settings.json              ← project-local Claude Code settings
├── presentation/index.html            ← THE DELIVERABLE
├── content/SLIDE-NN.md                ← researcher's content briefs (process artifacts)
├── wireframes/SLIDE-TYPES.md          ← designer's layout archetypes
├── devspiration-design-system/        ← Devspiration design system (existing; linked from the deck)
└── Template for presentation.pptx     ← original brand template; reference only
```
