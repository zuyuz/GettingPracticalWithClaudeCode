# Slide 11 — Effort levels and xhigh for Opus 4.7

**Layout:** Feature Highlight
**Background:** ink
**Target duration:** 60 seconds

## Eyebrow (optional, ≤24 chars, all-caps)

REASONING DIAL

## Headline (sentence case, ≤80 chars)

Turn the thinking budget up when the problem deserves it

## Body (3–5 bullets max, OR a key code/command block, OR a comparison table)

- Opus 4.7 supports five effort tiers: `low`, `medium`, `high`, `xhigh`, `max`
- `xhigh` sits between `high` and `max` — finer control on hard problems
- Claude Code defaults plan-mode runs to `xhigh` already
- Use `/effort <level>` inside a session to switch tiers per turn
- Higher effort = more reasoning at later turns = more output tokens

```text
/effort xhigh      # extra-high thinking for the next turn
/effort high       # the default for most coding work
```

## Optional: one short quote from the source (≤30 words)

> "More finely control the tradeoff between reasoning and latency on hard problems." — Anthropic Opus 4.7 launch

## Primary source

URL: https://www.anthropic.com/news/claude-opus-4-7
Status: HEAD-checked OK (200)

## Secondary source (one only)

URL: https://www.anthropic.com/claude/opus

## Speaker notes (2–3 sentences)

The audience has heard about thinking budgets but rarely uses them deliberately. Land two things: `xhigh` is the new sweet spot for non-trivial planning, and the switch is one slash command away. Note that effort scales tokens — don't leave `max` on for routine edits.
