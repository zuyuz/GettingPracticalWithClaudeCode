# Slide 14 — Chrome DevTools MCP

**Layout:** Content+Code
**Background:** paper
**Target duration:** 75 seconds

## Eyebrow (optional, ≤24 chars, all-caps)

LIVE DEBUGGING

## Headline (sentence case, ≤80 chars)

Debug, verify, and automate a real browser from the same session

## Body (3–5 bullets max, OR a key code/command block, OR a comparison table)

- Connects Claude Code to a Chrome or Edge tab via the Claude in Chrome extension
- Reads console errors and DOM state directly — fix the code that caused them
- Verifies UI against the Figma mock you just generated from
- Shares your browser login, so authenticated apps work without API connectors
- Treat web pages as untrusted — it pauses on logins and high-stakes actions so a human stays in the loop

```bash
# enable for this session
claude --chrome

# or, from inside a running session
/chrome
```

## Optional: one short quote from the source (≤30 words)

> "Build your code, then test and debug in the browser without switching contexts." — Claude Code Chrome docs

## Primary source

URL: https://code.claude.com/docs/en/chrome
Status: HEAD-checked OK (200)

## Secondary source (one only)

URL: https://chromewebstore.google.com/detail/claude/fcoeoabgfenejglbffodgkkbkcdhcgfn
Added 2026-05-28 (blog, deck footer): https://claude.com/blog/best-practices-for-computer-and-browser-use-with-claude

## Speaker notes (2–3 sentences)

Spend a beat on the "no context switching" framing — debugging the UI in the same chat as the code is a step change. Chrome DevTools MCP is the low-overhead option; the next slide explains when to reach for Playwright instead. Note the WSL caveat for anyone running Claude Code there.
