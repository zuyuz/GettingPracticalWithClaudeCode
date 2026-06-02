# Slide 04 — Auto memory, the notes Claude writes to itself

**Layout:** Content+Code
**Background:** ink
**Target duration:** 75 seconds

## Eyebrow (optional, ≤24 chars, all-caps)

AUTO MEMORY

## Headline (sentence case, ≤80 chars)

Claude takes notes between sessions, so you stop re-teaching it

## Body (3–5 bullets max, OR a key code/command block, OR a comparison table)

- Per-repo directory at `~/.claude/projects/<project>/memory/` with a `MEMORY.md` index
- `MEMORY.md` first 200 lines or 25 KB load every session; topic files load on demand
- Claude decides what is worth keeping: build commands, gotchas, your stated preferences
- Toggle via `/memory`, set `autoMemoryEnabled: false`, or `CLAUDE_CODE_DISABLE_AUTO_MEMORY=1`
- Plain markdown — open, edit, delete anything you don't like

```text
~/.claude/projects/<project>/memory/
├── MEMORY.md           # index, loaded every session
├── debugging.md        # topic file, loads on demand
└── api-conventions.md
```

## Optional: one short quote from the source (≤30 words)

> "Auto memory lets Claude accumulate knowledge across sessions without you writing anything." — Claude Code memory docs

## Primary source

URL: https://code.claude.com/docs/en/memory
Status: HEAD-checked OK (200)

## Secondary source (one only)

URL: https://code.claude.com/docs/en/sub-agents

## Speaker notes (2–3 sentences)

Auto memory is new in v2.1.59 and it changes the feel of a long-running project — corrections you make today shape next week's behavior without you writing a line. Contrast it with CLAUDE.md: you write the rules, Claude writes the observations. Show the directory so the audience knows where to peek when they want to audit what Claude thinks it knows.
