# Slide 09 — Test-driven development as a non-negotiable

**Layout:** Content+Code
**Background:** paper
**Target duration:** 75 seconds

## Eyebrow (optional, ≤24 chars, all-caps)

SUPERPOWERS · SKILL 3

## Headline (sentence case, ≤80 chars)

Red, green, refactor — and watch the red yourself

## Body (3–5 bullets max, OR a key code/command block, OR a comparison table)

- The iron law: no production code without a failing test first
- Wrote code before the test? Delete it. Start over with the test
- Verify red is mandatory — a test that passes immediately proves nothing
- Green means minimal code; refactor only after green is observed twice
- Bug fix? Write the test that reproduces the bug before touching the fix

```text
RED        write failing test
VERIFY     run it, see it fail for the right reason
GREEN      minimum code to pass
VERIFY     run it, see all tests pass
REFACTOR   clean up — stay green
```

## Optional: one short quote from the source (≤30 words)

> "If you didn't watch the test fail, you don't know if it tests the right thing." — test-driven-development SKILL.md

## Primary source

URL: https://github.com/obra/superpowers/blob/main/skills/test-driven-development/SKILL.md
Status: HEAD-checked OK (200)

## Secondary source (one only)

URL: https://github.com/obra/superpowers

## Speaker notes (2–3 sentences)

Most engineers nod at TDD and then skip it; the skill removes the discretion. Hammer the "watch it fail" rule — that one line is what distinguishes the discipline from cargo culting. The audience will resist; reply that the agent is faster at TDD than at debugging in production.
