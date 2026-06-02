# Slide 08 — Writing plans plus plan mode

**Layout:** Content+Code
**Background:** paper
**Target duration:** 75 seconds

## Eyebrow (optional, ≤24 chars, all-caps)

SUPERPOWERS · SKILL 2

## Headline (sentence case, ≤80 chars)

A bite-sized, file-by-file plan an engineer can execute step by step

## Body (3–5 bullets max, OR a key code/command block, OR a comparison table)

- Built for an engineer with "zero context and questionable taste" — every step is explicit
- File map first: every file to create or modify, with paths and responsibilities
- Steps are 2–5 minutes each: write test, run red, write code, run green, commit
- No "TBD" — every code block, command, and expected output is filled in
- Saved to `docs/superpowers/plans/YYYY-MM-DD-<feature>.md` and committed

```text
- [ ] Step 1: Write the failing test  (test code shown)
- [ ] Step 2: Run test to verify it fails  (expected: FAIL)
- [ ] Step 3: Write minimal implementation  (code shown)
- [ ] Step 4: Run tests to verify pass  (expected: PASS)
- [ ] Step 5: Commit
```

## Optional: one short quote from the source (≤30 words)

> "Bite-sized task granularity: each step is one action (2–5 minutes)." — writing-plans SKILL.md

## Primary source

URL: https://github.com/obra/superpowers/blob/main/skills/writing-plans/SKILL.md
Status: HEAD-checked OK (200)

## Secondary source (one only)

URL: https://code.claude.com/docs/en/interactive-mode

## Speaker notes (2–3 sentences)

Plans are the unit of work that subagents (or teammates) can pick up safely; the granularity is the whole game. Show the five-step rhythm — that pattern repeats hundreds of times across a project. Mention plan mode in Claude Code itself: `Shift+Tab` cycles into a read-only planning surface that pairs naturally with this skill.
