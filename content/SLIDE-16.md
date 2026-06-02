# Slide 16 — Aspire MCP for .NET orchestration

**Layout:** Content+Code
**Background:** paper
**Target duration:** 75 seconds

## Eyebrow (optional, ≤24 chars, all-caps)

DOMAIN MCP · .NET

## Headline (sentence case, ≤80 chars)

The .NET SDK as a first-class tool the agent can drive

## Body (3–5 bullets max, OR a key code/command block, OR a comparison table)

- An MCP server that wraps `dotnet` so Claude can create, build, test, and publish projects
- Manages NuGet packages, EF Core migrations, dev certs, workloads, and user secrets
- Read-only resources expose installed SDKs, runtimes, templates, frameworks
- Consolidated tools (`dotnet_project`, `dotnet_package`, `dotnet_ef`, ...) keep the surface small

```text
dotnet_project  create | build | test | run | publish
dotnet_package  add | restore | search
dotnet_ef       migrations add | database update
dotnet_sdk      list | install | uninstall
```

## Optional: one short quote from the source (≤30 words)

> "Give your AI assistant superpowers for .NET development." — jongalloway/dotnet-mcp README

## Primary source

URL: https://github.com/jongalloway/dotnet-mcp
Status: HEAD-checked OK (200)

## Secondary source (one only)

URL: https://learn.microsoft.com/en-us/dotnet/aspire/

## Speaker notes (2–3 sentences)

Quick pivot to ecosystem MCPs — the audience should leave knowing domain MCPs exist beyond browser automation. The .NET MCP is the cleanest example for this room: every .NET workflow Claude needs is wrapped behind a typed tool. Mention Aspire as the orchestration story this complements without diving in.
