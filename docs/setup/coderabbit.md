# Setting up CodeRabbit

Part of Phase 4 — the AI review layer. **Free for public repos.**
5-minute dashboard setup.

## Why

Per Gergely Orosz's [Good Code Reviews, Better Code Reviews](https://blog.pragmaticengineer.com/good-code-reviews-better-code-reviews/):
> "Too many nitpicks often signal a lack of tooling or standards.
> Many common nitpick comments are solvable through automated linting."

CodeRabbit is the 2026 market leader for AI PR review (2M+ repos).
Sloppy Guard catches lint/build/secrets; CodeRabbit catches the next
layer — logic-ish issues, missing error handling, typos the guard
doesn't know about.

Per Addy Osmani's [2026 LLM coding workflow](https://addyo.substack.com/p/my-llm-coding-workflow-going-into):
"feedback from tools like CodeRabbit can be used as additional prompts
to ask the AI to refactor based on that feedback."

## One-time setup (5 minutes)

1. Visit https://coderabbit.ai/
2. **Sign in with GitHub**
3. Install the CodeRabbit GitHub App on `nalediym/linux-jr`
4. Confirm — CodeRabbit posts a welcome comment to your next PR

## What the config does

`.coderabbit.yaml` at the repo root configures:
- **profile: chill** — solo-dev mode, fewer nits
- Auto-review on every PR targeting `main`, excluding drafts
- Path-specific instructions for:
  - `src/data/missions/**` — enforce SOUL.md banned words + canonical
    character names + FLAG format
  - `src/components/Terminal.jsx` — flag any modal overlay (SOUL rule #1)
  - `kb/wiki/concepts/**` — skip (generated content)

## The dual-AI pattern

CodeRabbit runs *first* on every PR for mechanical-issue detection.
The `/codex review` workflow (Phase 5) runs *second* as an independent
second opinion. Two different models, two different takes, overlap
reveals real issues.

Pattern attribution: Addy Osmani's "spawn a second AI session to critique
the first's output."

## Cost

- Free for public repos (after Linux Jr flips public)
- Paid tier (\$24-30/user/month) only needed for private repos with
  advanced features
