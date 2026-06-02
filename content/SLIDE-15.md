# Slide 15 — Playwright MCP, when to choose it

**Layout:** Two-Column Compare
**Background:** paper
**Target duration:** 75 seconds

## Eyebrow (optional, ≤24 chars, all-caps)

THE OTHER BROWSER MCP

## Headline (sentence case, ≤80 chars)

Pick Playwright MCP when you need persistent state and headless runs

## Body (3–5 bullets max, OR a key code/command block, OR a comparison table)

| Reach for | Chrome DevTools MCP | Playwright MCP |
|---|---|---|
| Surface | Your live Chrome or Edge tab | Headless or headed browser context |
| Best for | Interactive debugging, UI verification | Long-running autonomous workflows, test suites |
| Auth model | Your existing browser session | Engineered storage state |
| Browsers | Chrome, Edge | Chrome, Firefox, WebKit |
| Token cost | Lower | Higher (richer page introspection) |
| Vision models | Not required | Not required |

- Both use accessibility snapshots instead of pixels — deterministic and token-friendly
- Playwright MCP wins for CI, self-healing tests, and cross-browser sweeps
- Best practice: treat page content as untrusted and keep a human in the loop for high-stakes actions

## Optional: one short quote from the source (≤30 words)

> "MCP remains relevant for specialized agentic loops that benefit from persistent state, rich introspection, and iterative reasoning over page structure." — Playwright MCP docs

## Primary source

URL: https://github.com/microsoft/playwright-mcp
Status: HEAD-checked OK (200)

## Secondary source (one only)

URL: https://playwright.dev/docs/intro
Added 2026-05-28 (blog, deck footer): https://claude.com/blog/best-practices-for-computer-and-browser-use-with-claude

## Speaker notes (2–3 sentences)

Most audiences want to know "which one do I install" — give them the heuristic: Chrome DevTools for interactive, Playwright for headless. Repeat that both avoid screenshots and stay accessibility-tree based — that is why they cost fewer tokens than you'd expect. Tee up the next slide: a more domain-specific MCP.
