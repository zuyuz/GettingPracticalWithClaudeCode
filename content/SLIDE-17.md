# Slide 17 — Git worktrees, parallel sessions without collisions

**Layout:** Content+Code
**Background:** ink
**Target duration:** 90 seconds

## Eyebrow (optional, ≤24 chars, all-caps)

PARALLEL WORK

## Headline (sentence case, ≤80 chars)

One repo, many Claude sessions — and no files step on each other

## Body (3–5 bullets max, OR a key code/command block, OR a comparison table)

- A git worktree is a separate working directory on its own branch sharing one repo history
- File-level isolation: edits in one session never touch files in another
- Build a feature in one terminal while a bugfix runs in another, both as Claude Code
- Worktrees live at `.claude/worktrees/<name>/` on branch `worktree-<name>`
- `.worktreeinclude` (gitignore syntax) auto-copies local files like `.env` into new worktrees

```bash
claude --worktree feature-auth   # named worktree
claude --worktree                # auto-named
claude --worktree bugfix-123     # second parallel session
```

## Optional: one short quote from the source (≤30 words)

> "Running each Claude Code session in its own worktree means edits in one session never touch files in another." — Claude Code worktrees docs

## Primary source

URL: https://code.claude.com/docs/en/worktrees
Status: HEAD-checked OK (200)

## Secondary source (one only)

URL: https://git-scm.com/docs/git-worktree

## Speaker notes (2–3 sentences)

Worktrees are the unsung hero — they unlock parallel agents on a single repo without any merge drama. Stress the `.worktreeinclude` trick because `.env` files are the most common stumble. This is the natural bridge into the multi-agent story coming up.
