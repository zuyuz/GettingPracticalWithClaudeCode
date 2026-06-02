# Slide 19 — Team agents, many Claudes coordinating

**Layout:** Feature Highlight
**Background:** paper
**Target duration:** 90 seconds

## Eyebrow (optional, ≤24 chars, all-caps)

MULTI-AGENT

## Headline (sentence case, ≤80 chars)

A lead and teammates with a shared task list and a real mailbox

## Body (3–5 bullets max, OR a key code/command block, OR a comparison table)

- One session is the lead; teammates spawn as independent sessions with their own contexts
- Communicate directly via `SendMessage` — not only back-and-forth through the lead
- Shared task list with claim, dependency, and completion semantics
- Hosted and secure? Managed Agents keep tools and data inside your perimeter (sandboxes + MCP tunnels)
- Best for research and review, new modules, debugging with competing hypotheses

```json
// settings.json
{ "env": { "CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS": "1" } }
```

## Optional: one short quote from the source (≤30 words)

> "Teammates work independently, each in its own context window, and communicate directly with each other." — Claude Code agent teams docs

## Primary source

URL: https://code.claude.com/docs/en/agent-teams
Status: HEAD-checked OK (200)

## Secondary source (one only)

URL: https://code.claude.com/docs/en/sub-agents
Added 2026-05-28 (blog, deck footer): https://claude.com/blog/claude-managed-agents-updates

## Speaker notes (2–3 sentences)

This is the marquee experimental feature for parallel work — note the env flag, the v2.1.32 minimum, and the token cost. The distinction from subagents matters: subagents report back to the lead only, teammates talk to each other. Start a team with 3–5 members, give each a clear focus, and let them coordinate.
