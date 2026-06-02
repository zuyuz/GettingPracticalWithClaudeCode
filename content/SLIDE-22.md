# Slide 22 — End-to-end scenario, what the team actually did

**Layout:** Content+Code
**Background:** paper
**Target duration:** 90 seconds

## Eyebrow (optional, ≤24 chars, all-caps)

E2E SCENARIO · EXECUTION

## Headline (sentence case, ≤80 chars)

Brainstorm, plan, parallel build, verify — the loop that shipped this deck

## Body (3–5 bullets max, OR a key code/command block, OR a comparison table)

- Lead invoked `brainstorming` then `writing-plans` — spec and plan committed before code
- Researcher and Designer ran in parallel via team agents (Phase 1)
- Frontend Developer composed researcher briefs into designer archetypes (Phase 2)
- QA validated URLs, slide count, design rules, viewport behaviour (Phase 3)
- Review subagents dispatched at each phase boundary to run `verification-before-completion`

```text
brainstorm → plan
  ├─ researcher: 23 briefs    (parallel)
  └─ designer: 6 archetypes   (parallel)
→ frontend: presentation/index.html
→ qa: full validation
→ review subagent at every phase boundary
```

## Optional: one short quote from the source (≤30 words)

> "Three focused teammates often outperform five scattered ones." — Claude Code agent teams best practices

## Primary source

URL: https://code.claude.com/docs/en/agent-teams
Status: HEAD-checked OK (200)

## Secondary source (one only)

URL: https://github.com/obra/superpowers/issues/429

## Speaker notes (2–3 sentences)

This is where the issue-429 caveat earns its keep — show how the hybrid pattern played out in practice. Stress the review subagents at phase boundaries: that is what kept claims honest across a team that could not invoke superpowers themselves. End on the rhythm: brainstorm, plan, parallel build, verify.
