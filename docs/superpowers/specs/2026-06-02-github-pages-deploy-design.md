# GitHub push + Pages hosting + CI/CD — design

**Date:** 2026-06-02
**Repo:** https://github.com/zuyuz/GettingPracticalWithClaudeCode (public)
**Live URL:** https://zuyuz.github.io/GettingPracticalWithClaudeCode/

## Goal

Host `presentation/index.html` as a public GitHub Pages site, and redeploy
automatically on every push so the deck can be updated continuously.

## Decisions (brainstormed 2026-06-02)

| Decision | Choice | Rationale |
|---|---|---|
| Repo visibility | **Public** | Free Pages; deck is shareable. Chat log audited — design-process notes only, no secrets/PII. |
| Repo scope | **Everything as-is** | Full working tree committed (incl. the brand `.pptx` and process artifacts). Only `bash.exe.stackdump` is gitignored as pure junk. |
| Deploy mechanism | **GitHub Actions workflow** | Visible in the Actions tab, version-controlled, extensible (e.g. add a minify step later). |

## How it works

The deck uses **relative** asset paths from `presentation/` up into
`../devspiration-design-system/project/…` (CSS, motion JS, the deck controller,
brand-object PNGs, icons). Fonts load from the Google Fonts CDN — nothing is
bundled. To keep those relative paths valid, the **entire repo tree is published
verbatim** as the site; no path rewriting.

Three files make this work:

- **`index.html`** (repo root) — redirects `/` → `/presentation/` (meta refresh +
  `location.replace` + canonical link) so the base Pages URL lands on the deck.
- **`.nojekyll`** (repo root) — disables Jekyll so files are served byte-for-byte
  (underscore-prefixed files/dirs and the design system pass through untouched).
- **`.github/workflows/deploy-pages.yml`** — on push to `main` (and manual
  `workflow_dispatch`): `checkout → configure-pages → upload-pages-artifact
  (path: '.') → deploy-pages`. Least-privilege permissions
  (`contents: read`, `pages: write`, `id-token: write`), `concurrency: pages`,
  official action majors (`checkout@v4`, `configure-pages@v5`,
  `upload-pages-artifact@v3`, `deploy-pages@v4`).

## One-time enablement

Pages source set to **GitHub Actions** via the API:

```
gh api --method POST repos/zuyuz/GettingPracticalWithClaudeCode/pages -f build_type=workflow
```

## Updating the deck (for future sessions)

1. Edit `presentation/index.html` (or design-system assets).
2. `git add -A && git commit -m "…" && git push`.
3. The workflow redeploys; watch the green check in the Actions tab.
   Live in ~1 min at https://zuyuz.github.io/GettingPracticalWithClaudeCode/.

## Verification gate

- Pre-push: secret/PII sweep of the tree, asset-path resolution check, workflow
  YAML correctness/security review.
- Post-deploy: Actions run green; `curl` of `/`, `/presentation/`, and sample
  assets (CSS + a brand PNG) returns `200`.
