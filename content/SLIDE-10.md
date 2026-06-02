# Slide 10 — Verification before completion

**Layout:** Content+Code
**Background:** paper
**Target duration:** 75 seconds

## Eyebrow (optional, ≤24 chars, all-caps)

SUPERPOWERS · SKILL 4

## Headline (sentence case, ≤80 chars)

Evidence before claims — every time

## Body (3–5 bullets max, OR a key code/command block, OR a comparison table)

- The iron law: no completion claims without fresh verification evidence in the current message
- Identify the command that proves the claim, run it, read the full output, then claim
- Linter passing is not the build passing; agent saying "done" is not the diff being correct
- Red flags: "should work", "probably", "looks correct", "great, perfect, done"
- Applies to commits, PRs, task closures, and anything that sounds like success

```text
[Run test command] → [See 34/34 pass] → "All tests pass."
[Linter passed]    → does NOT prove the build compiles
```

## Optional: one short quote from the source (≤30 words)

> "Claiming work is complete without verification is dishonesty, not efficiency." — verification-before-completion SKILL.md

## Primary source

URL: https://github.com/obra/superpowers/blob/main/skills/verification-before-completion/SKILL.md
Status: HEAD-checked OK (200)

## Secondary source (one only)

URL: https://github.com/obra/superpowers

## Speaker notes (2–3 sentences)

This is the skill that earns the most trust per token spent. Tell the room about the "I don't believe you" pattern from the skill's own failure log — the agent learned the hard way to verify. The next slide changes gears: how to make the model think harder when it matters.
