# Slide 03 — CLAUDE.md, instructions that travel with the repo

**Layout:** Content+Code
**Background:** paper
**Target duration:** 75 seconds

## Eyebrow (optional, ≤24 chars, all-caps)

PERSISTENT CONTEXT

## Headline (sentence case, ≤80 chars)

CLAUDE.md is the file you stop having to repeat yourself in

## Body (3–5 bullets max, OR a key code/command block, OR a comparison table)

- Markdown file at the project root, loaded into every session before the first prompt
- Four scopes load top-down: managed, user, project, local — subdirectory files add on for the areas you touch
- Keep them lean and layered — bloated context degrades performance
- Review every few months — prune constraints the model has outgrown
- Use `/init` to scaffold one, then be specific: "Use 2-space indentation" beats "Format code properly"

```text
your-project/
├── CLAUDE.md            # team-shared, in source control
├── CLAUDE.local.md      # personal, in .gitignore
└── .claude/
    └── rules/
        └── api.md       # path-scoped: paths: ["src/api/**/*.ts"]
```

## Optional: one short quote from the source (≤30 words)

> "Keep them lean and layered." — How Claude Code works in large codebases

## Primary source

URL: https://claude.com/blog/how-claude-code-works-in-large-codebases-best-practices-and-where-to-start
Status: HEAD-checked OK (200)

## Secondary source (one only)

URL: https://code.claude.com/docs/en/memory

## Speaker notes (2–3 sentences)

This is the single highest-leverage habit on the whole list — every team that uses Claude Code seriously has a thoughtful CLAUDE.md. Show how the four scopes stack, then push the audience toward path-scoped rules in `.claude/rules/` for monorepos. For large codebases, name the two field-tested habits from Anthropic's guidance: keep each file lean and layered, and review them every few months to prune constraints newer models have outgrown. Plant the seed that next slide is about a second, complementary memory layer.
