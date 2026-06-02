# Slide 20 — Superpowers and Teams, the issue 429 caveat

**Layout:** Section Divider
**Background:** ink
**Target duration:** 90 seconds

## Eyebrow (optional, ≤24 chars, all-caps)

KNOWN CAVEAT

## Headline (sentence case, ≤80 chars)

Superpowers and team agents do not mix natively — yet

## Body (3–5 bullets max, OR a key code/command block, OR a comparison table)

| What doesn't work | What does work |
|---|---|
| Teammates invoking `superpowers:*` skills directly | Team lead invokes superpowers in the main session |
| `using-superpowers` auto-loading for teammates | Teammate spawn prompts explicitly opt out of superpowers |
| Mixing `dispatching-parallel-agents` with `TeamCreate` | Review subagents at phase boundaries via the `Agent` tool |
| Trusting teammate "done" reports as final | Lead runs `verification-before-completion` itself |

- Root cause: `using-superpowers` has a `<SUBAGENT-STOP>` block that fires for teammates
- Issue is open and tracked at obra/superpowers#429 — community pattern works today
- The deck you are watching was built with this exact hybrid pattern

## Optional: one short quote from the source (≤30 words)

> "Skills like executing-plans and subagent-driven-development only know about the Task tool, not Teammate, SendMessage, or the team-aware task tools." — obra/superpowers#429

## Primary source

URL: https://github.com/obra/superpowers/issues/429
Status: HEAD-checked OK (200)

## Secondary source (one only)

URL: https://code.claude.com/docs/en/agent-teams

## Speaker notes (2–3 sentences)

Be candid: this is a real friction point and the audience deserves the workaround in writing. The pattern is — lead does all skill invocation, teammates implement, review subagents verify. Acknowledge that this deck is a working demonstration of the pattern, which makes the closing scenario more credible.
