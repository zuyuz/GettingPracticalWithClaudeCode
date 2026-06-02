# Slide 18 — Azure DevOps and the gh skill

**Layout:** Two-Column Compare
**Background:** paper
**Target duration:** 75 seconds

## Eyebrow (optional, ≤24 chars, all-caps)

SCM & ISSUES

## Headline (sentence case, ≤80 chars)

Talk to GitHub and Azure DevOps in the same agentic loop

## Body (3–5 bullets max, OR a key code/command block, OR a comparison table)

| Tool | What Claude can do | How |
|---|---|---|
| `gh` CLI | View, open, comment on PRs and issues; merge; create branches | Out of the box; just say "open a PR" |
| Azure skills plugin | Deploy, validate, diagnose, manage Azure resources from chat | `/plugin install azure@claude-plugins-official` |
| GitHub Actions | Auto-review PRs and triage issues on every push | Add the Claude Code Action to your workflow |
| GitLab CI/CD | Same automation for GitLab repos | Add the documented job to `.gitlab-ci.yml` |

- Pick the surface that matches your repo host; mix and match per project
- For Azure DevOps work items / repos / pipelines, write a project skill that wraps `az devops`

## Optional: one short quote from the source (≤30 words)

> "In CI, you can automate code review and issue triage with GitHub Actions or GitLab CI/CD." — Claude Code overview

## Primary source

URL: https://github.com/microsoft/azure-skills
Status: HEAD-checked OK (200)

## Secondary source (one only)

URL: https://cli.github.com/

## Speaker notes (2–3 sentences)

Honest framing here — the Microsoft Azure skills plugin is strong on infra and weak on Azure DevOps proper, so the practical pattern is to write a thin project skill that shells out to `az devops`. The `gh` CLI is already there with no install if you have it on PATH. The bigger point: Claude composes well with the SCM tools you already use.
