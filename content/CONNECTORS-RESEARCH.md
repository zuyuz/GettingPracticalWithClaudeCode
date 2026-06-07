# Literature Search Report — Claude Connectors

> ARS `academic-paper` **lit-review** mode (intake → literature_strategist). Adapted to a
> product-documentation context: the "databases" are Anthropic's official properties; the
> inclusion bar is *Anthropic-official and currently live*. Process artifact that feeds the
> deck's Connectors integration (slides 02, 06, 15). **IRON RULE #5 honored — every citation
> below was independently HTTP-verified (see Search Strategy); no claim is asserted from memory.**

## Search Strategy

- **Research question:** What are Claude *Connectors*, how do they relate to MCP, how do pre-built
  vs custom (remote-MCP) connectors differ, how does Claude for Chrome relate to connectors, and
  how do Connectors layer against Claude Code skills / plugins / MCP servers?
- **Sources ("databases"):** `support.claude.com`, `docs.claude.com` / `platform.claude.com`,
  `code.claude.com`, `anthropic.com/news`, `anthropic.com/engineering`, `claude.com/blog`,
  `modelcontextprotocol.io`.
- **Inclusion criteria:** Anthropic-official (first-party) page; directly addresses the RQ;
  returns HTTP 200; content current as of the verification date.
- **Exclusion:** third-party blogs, community posts, anything not first-party (this is a product
  topic, not a peer-reviewed one — the academic peer-review filter is replaced by *first-party-official*).
- **Verification date:** 2026-06-07. Method: `curl -sL -o /dev/null -w "%{http_code}"` (GET, follow
  redirects) + targeted content fetch on the four load-bearing pages.

## Screening Results

- Candidate URLs checked: 11 — all returned **200**.
- Content-verified (full fetch to confirm the facts cited): 4 (Chrome, custom connectors,
  pre-built connectors, remote-MCP docs).
- Final included sources: **8**.
- One URL canonicalized: `docs.claude.com/.../remote-mcp-servers` **302 →**
  `platform.claude.com/.../remote-mcp-servers` (use the `platform.claude.com` form).

## Annotated Bibliography

### Anthropic. Pre-built connectors (using remote MCP). *Claude Support*.
- **URL:** https://support.claude.com/en/articles/11176164-pre-built-connectors-using-remote-mcp · 200
- **Type:** Official help-center article.
- **Key facts (verbatim):** Connectors "let Claude access your apps and services, retrieve your
  data, and take actions within connected services." Named examples: **Linear** (create issues),
  **Slack** (send messages), **Google Drive** (search files). "Web connectors are available for
  all users on Claude, Cowork, Claude Desktop, and Claude Mobile (iOS and Android)"; connectors
  "work across Claude, Claude Desktop, Claude Code, and the API."
- **Relevance:** Primary "what is a connector" definition + the cross-surface reach.
- **Quality:** High (first-party). *Caveat:* this page does not itself spell out that pre-built
  connectors run on remote MCP — pair it with the custom-connector page + MCP announcement for the
  MCP-underneath claim.
- **Potential use:** Slide 15 footer; slide 02 term-seed.

### Anthropic. Getting started with custom connectors using remote MCP. *Claude Support*.
- **URL:** https://support.claude.com/en/articles/11175166-getting-started-with-custom-connectors-using-remote-mcp · 200
- **Type:** Official help-center article.
- **Key facts (verbatim):** "Custom connectors let you connect Claude directly to the tools and
  data sources that matter most to your workflows." You can "Connect Claude to existing remote MCP
  servers" or "Build your own remote MCP servers." "When you add a custom connector, Claude connects
  to your remote MCP server from **Anthropic's cloud infrastructure**, rather than from your local
  device." Available on Claude, Cowork, and Claude Desktop for **Free, Pro, Max, Team, and Enterprise**
  (Free limited to one; only Owners add them on Team/Enterprise). OAuth is used to authenticate.
- **Relevance:** Establishes *custom connector = your own remote MCP*, cloud-mediated. **Corrects an
  earlier assumption** that custom connectors are Team/Enterprise-only — they are not.
- **Quality:** High (first-party).
- **Potential use:** Slide 15 footer; the "pre-built or your own" half of the compare-note.

### Anthropic. Getting started with Claude for Chrome. *Claude Support*.
- **URL:** https://support.claude.com/en/articles/12012173-getting-started-with-claude-for-chrome · 200
- **Type:** Official help-center article.
- **Key facts (verbatim):** Install from the **Chrome Web Store** — "Click 'Add to Chrome' to install
  the extension." "Completing these steps will add **Claude in Chrome to the 'Connectors' drop-down**
  on your chats with Claude." "Claude in Chrome is available in beta for all **paid plans** (Pro, Max,
  Team, and Enterprise)." Safety: "Ask before acting" produces an approval plan before "certain
  high-risk actions."
- **Relevance:** **Confirms the user's framing** — Claude for Chrome is *both* a Chrome extension
  (a browser plugin) *and* surfaced/managed as a **connector** inside Claude. (Earlier scout claim
  that you "enable a Claude-in-Chrome connector in Desktop settings" was imprecise; the accurate
  statement is the extension adds itself to the Connectors drop-down.)
- **Quality:** High (first-party).
- **Potential use:** Backs the slide-15 "Claude in Chrome = extension + connector" copy. (Slide 15
  already cites `code.claude.com/docs/en/chrome`, so this need not be added to the footer.)

### Anthropic. Introducing the Model Context Protocol. *Anthropic News*.
- **URL:** https://www.anthropic.com/news/model-context-protocol · 200
- **Type:** Official announcement.
- **Key facts:** MCP is "an open standard, created by Anthropic, for AI applications to connect to
  tools and data" (echoed on the custom-connector page).
- **Relevance:** The protocol layer beneath every connector.
- **Quality:** High (first-party).
- **Potential use:** Optional footer source; anchors "Connectors = productized MCP."

### Anthropic. Remote MCP servers. *platform.claude.com docs*.
- **URL:** https://platform.claude.com/docs/en/agents-and-tools/remote-mcp-servers · 200 (canonical after 302)
- **Type:** Official developer docs.
- **Key facts:** Developers connect to remote MCP servers "via the Anthropic MCP connector API … through
  the MCP protocol." (API-level connector surface, distinct from the consumer Connectors directory.)
- **Relevance:** Shows the same connector↔MCP relationship at the API layer; keeps the API vs
  consumer-app distinction honest.
- **Quality:** High (first-party).
- **Potential use:** Reference only (not slide copy).

### Anthropic. Claude Code plugins. *claude.com/blog*.
- **URL:** https://claude.com/blog/claude-code-plugins · 200
- **Type:** Official announcement.
- **Key facts:** Plugins bundle slash commands, subagents, **MCP servers**, and hooks; installed via
  `/plugin`.
- **Relevance:** The layering point — in Claude Code a plugin can *contain* an MCP server; connectors
  are the Claude-apps surface, not the Claude Code packaging.
- **Quality:** High (first-party).
- **Potential use:** Layering synthesis (keeps Connectors ≠ Plugins).

### Anthropic. Extend Claude with skills / slash commands. *code.claude.com docs*.
- **URL:** https://code.claude.com/docs/en/slash-commands · 200
- **Type:** Official docs.
- **Key facts:** "Custom commands have been merged into skills" — both create a `/slash-command`.
- **Relevance:** Distinguishes the Claude Code customization layer (skills/commands) from Connectors.
- **Quality:** High (first-party).
- **Potential use:** Layering synthesis.

### Anthropic. Claude Desktop Extensions (`.mcpb`). *anthropic.com/engineering*.
- **URL:** https://www.anthropic.com/engineering/desktop-extensions · 200
- **Type:** Official engineering blog.
- **Key facts:** `.mcpb` is a one-click installer bundling a **local** MCP server + dependencies +
  manifest for Claude Desktop.
- **Relevance:** The *local* counterpart to *remote*-MCP connectors — completes the map.
- **Quality:** High (first-party).
- **Potential use:** Reference only.

## Verified terminology layering (for accurate slide copy)

| Layer | What it is | Where | First-party source |
|---|---|---|---|
| **MCP** | Open protocol — the wire between Claude and external tools/data | Everywhere | news/model-context-protocol |
| **Connectors** | Productized, user-facing surface over (remote) MCP in the Claude *apps*: **pre-built** (Linear/Slack/Drive…) or **custom** (your own remote MCP, cloud-mediated, OAuth) | Claude web, Desktop, Mobile, Cowork (also Code & API) | support 11176164 / 11175166 |
| **Claude for Chrome** | A Chrome Web Store **extension** (browser plugin) that registers in Claude's **Connectors** drop-down — the browser-side agent | Chrome/Edge | support 12012173 |
| **MCP servers in Claude Code** | You add servers directly (Chrome DevTools MCP, Playwright MCP, Azure DevOps MCP) | Claude Code | docs · chrome / plugins-reference |
| **Plugins / Skills** | Claude Code packaging: plugins bundle commands + subagents + **MCP servers** + hooks; skills = `/slash-commands` | Claude Code | blog/claude-code-plugins · docs/slash-commands |

**User-framing check — confirmed:** "the Chrome extension is basically managed via connector and
plugin in Chrome" is accurate: it is a Chrome *extension/plugin* AND it appears/managed as a
*connector* in Claude.

**Distinction to preserve in copy:** Chrome DevTools MCP / Playwright MCP are **MCP servers you add
in Claude Code** — do *not* label them "Connectors." Connectors is the Claude-apps branding.

## Footer-ready citation shortlist (2–4)

1. **Pre-built connectors (using remote MCP)** — https://support.claude.com/en/articles/11176164-pre-built-connectors-using-remote-mcp
   → backs: connectors are the productized surface that lets Claude reach apps/data, across Claude web/Desktop/Mobile/Cowork (and Code/API).
2. **Custom connectors using remote MCP** — https://support.claude.com/en/articles/11175166-getting-started-with-custom-connectors-using-remote-mcp
   → backs: a *custom* connector is your own remote MCP server, which Claude reaches from Anthropic's cloud.
3. **Introducing the Model Context Protocol** — https://www.anthropic.com/news/model-context-protocol
   → backs: MCP is the open standard underneath every connector. *(optional 3rd source)*

Display suggestion for the slide-15 footer (append to the existing list):
`· support · connectors · support · custom connectors`

## Open questions / gaps (non-blocking)

- The pre-built page does not itself state "pre-built connectors run on remote MCP" (only the URL slug
  and the custom page do). Copy should attribute the MCP-underneath claim to the custom-connector page
  + MCP announcement, not over-read the pre-built page.
- Connector model/version details on the Chrome page (Opus 4.7 / Sonnet 4.6 / Haiku 4.5) are
  version-dated; keep model versions *off* the slide to avoid staleness.
