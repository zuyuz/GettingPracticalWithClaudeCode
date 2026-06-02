# Slide 21 — Proof point · CodeRabbit (Claude Code in the wild)

**Deck position:** 21 of 25 (NEW, added 2026-05-28; inserted after the team-agents slides)
**Layout:** Content (single-column, paper)
**Background:** paper
**Target duration:** 60 seconds

> Named descriptively, not `SLIDE-21.md`, because the `content/SLIDE-NN.md` briefs already carry a pre-existing offset against the deck (see memory `content-brief-deck-offset`). This avoids colliding with the existing `SLIDE-21.md`.

## Eyebrow (optional, ≤24 chars, all-caps)

CLAUDE CODE IN THE WILD

## Headline (sentence case, ≤80 chars)

CodeRabbit plans with Claude before it writes a line of code

## Body (3–5 bullets max)

Lead: Their orchestration layer reviews 2 million pull requests a week across 15,000+ customers.

- Opus drives orchestration, Sonnet sequences the plan, Haiku distills context
- A collaborative PRD locks context and assumptions before Plan Mode writes code
- "The plan itself becomes a quality gate" — better upfront, pronounced downstream
- A custom eval harness scores plan quality, scope creep, and token efficiency

## Optional: one short quote from the source (≤30 words)

> "Planning quality determines output quality, and the cheaper code generation gets, the more expensive it becomes to move in the wrong direction." — CodeRabbit case study

## Primary source

URL: https://claude.com/blog/how-coderabbit-used-claude-to-build-an-agent-orchestration-system
Status: HEAD-checked OK (200) — verified 2026-05-28

## Secondary source (one only)

URL: https://code.claude.com/docs/en/agent-teams

## Speaker notes (2–3 sentences)

The deck's only external proof point — use it right after the team-agents slides to show that real teams orchestrate Claude at scale. Tie it back to the planning skills (brainstorming, writing-plans): CodeRabbit makes the same bet that a strong plan upfront pays off downstream. The 2M-PRs-a-week and 15,000-customer numbers carry the credibility.
