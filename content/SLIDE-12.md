# Slide 12 — Visual planning in Chrome

**Layout:** Feature Highlight
**Background:** paper
**Target duration:** 75 seconds

## Eyebrow (optional, ≤24 chars, all-caps)

VISUAL COMPANION

## Headline (sentence case, ≤80 chars)

Brainstorm with mockups in the browser, not paragraphs in the terminal

## Body (3–5 bullets max, OR a key code/command block, OR a comparison table)

- Companion to `brainstorming`: a local web server that renders HTML mockups live
- Claude writes a fragment to `screen_dir`; you see it; you click a choice
- Decide per question — only use the browser when the question is genuinely visual
- Persists mockups under `.superpowers/brainstorm/` so iterations survive restarts
- The same trick scales — Claude renders plans, diffs, and dashboards as HTML, not walls of text

```bash
# from any superpowers session
scripts/start-server.sh --project-dir /path/to/project
# → http://localhost:52341
```

## Optional: one short quote from the source (≤30 words)

> "Would the user understand this better by seeing it than reading it?" — brainstorming visual-companion guide

## Primary source

URL: https://github.com/obra/superpowers/blob/main/skills/brainstorming/visual-companion.md
Status: HEAD-checked OK (200)

## Secondary source (one only)

URL: https://github.com/obra/superpowers/blob/main/skills/brainstorming/SKILL.md
Added 2026-05-28 (blog, deck footer): https://claude.com/blog/using-claude-code-the-unreasonable-effectiveness-of-html

## Speaker notes (2–3 sentences)

This is the one feature that surprises people the most. Show the loop: the agent writes a mockup HTML, you see it, click to select, it iterates. The "per-question, not per-session" rule keeps it from becoming gimmicky.
