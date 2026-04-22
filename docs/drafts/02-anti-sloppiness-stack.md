---
title: "The anti-sloppiness stack for AI-assisted solo builders"
subtitle: What I ship between me and production when the production is public
status: draft
targeted_venues:
  - substack
  - dev.to
  - linkedin longform
word_target: 2500
---

## The problem

I'm a solo builder shipping a public product. The product is a Linux tutorial game for kids. My collaborators are a handful of Claude Code sessions running in parallel across git worktrees. I have ADHD, which means my "12am ship something cool" urge is strong and my "wait, let me double-check that commit" impulse is weaker than it should be.

When there's no one else to catch mistakes, the tooling has to. This post is about the stack I've converged on between me and production. It has seven layers. Each layer catches a category of sloppy the layers above it miss.

## Layer 1 — the doctrine (SOUL.md)

Before you write any automated check, you need to know what the checks are enforcing. For me, that's `SOUL.md` at the repo root.

Mine has seven principles. The terminal IS the whole product. Real Linux only. Typing is mandatory. Nothing fails scary. Plus a "never do" list and a hierarchy tiebreaker. It's 500 lines, readable in one sitting, and CLAUDE.md has a big `⚠ READ SOUL.md FIRST` banner at the top.

Why the doctrine has to come first: **every tool below this line is measuring distance from SOUL.md**. If you don't have a north star, you're just adding checks that happen to be popular.

## Layer 2 — the Sloppy Guard (mechanical enforcement)

One bash script at `scripts/sloppy-guard.sh`. Three tiers:

**HARD (blocks merge):** lint, build, required files (LICENSE, SOUL.md, CLAUDE.md, README), no debug statements in src/, no API-key-shaped strings, required README sections present.

**SOFT (warns):** orphan TODOs without ticket refs, SOUL-banned words in quoted strings, dead code flagged by Knip, `.only` / `.skip` left in tests.

**INSIGHT (informs):** bundle size, file delta vs main, public-repo banner, late-night warning if you're committing between 10pm and 7am.

It runs locally via `bun run guard` and in CI on every PR. Seven seconds. Same output both places. Addy Osmani, in his [2026 LLM coding workflow piece](https://addyo.substack.com/p/my-llm-coding-workflow-going-into), calls this the foundation: *"the LLM is an assistant, not an autonomously reliable coder. I am the senior dev."* The guard is your senior-dev checklist, automated.

## Layer 3 — pre-commit / pre-push hooks (Lefthook)

The guard runs in CI, but CI feedback takes minutes. Pre-commit runs the fast subset in seconds, so you never push a `console.log` you left in.

I use [Lefthook](https://github.com/evilmartians/lefthook), not Husky. 2026 consensus: Go binary, parallel execution, language-agnostic. Written in Go → no node_modules dep at commit time. My config:

```yaml
pre-commit:
  parallel: true
  commands:
    lint-staged:
      glob: "*.{js,jsx}"
      run: bunx lint-staged
    guard-quick:
      run: |
        set -e
        grep -rn --include='*.js' --include='*.jsx' \
          -E 'console\.(log|debug)\(|^\s*debugger;?' src/ && exit 1
        exit 0

commit-msg:
  commands:
    commitlint:
      run: bunx --bun commitlint --edit {1}

pre-push:
  commands:
    public-repo-warning:
      run: |
        printf "\n🌍 PUSHING TO PUBLIC REPO nalediym/linux-jr\n"
        # 2-second cooling-off — ADHD safeguard
        sleep 2
    full-guard:
      run: bun run guard
```

The public-repo banner on pre-push is the protocol that saves me from 2am regret pushes. Three seconds of "wait, am I sure?" that would otherwise require a force-push to undo.

## Layer 4 — AI PR review (CodeRabbit)

Lint catches mechanical issues. The next category — "this function does two things" / "this adds an N+1 query" / "this typo in the error message" — needs an AI reviewer.

CodeRabbit free tier on the public repo. 2M+ repos use it, diff-based, posts a review as a PR comment. Config in `.coderabbit.yaml` includes path-specific instructions:

```yaml
path_instructions:
  - path: "src/data/missions/**"
    instructions: |
      Mission content. Check: (a) SOUL.md never-say list compliance
      (no "wrong", "failed", etc.); (b) canonical character names;
      (c) FLAG{...} format.
  - path: "src/components/Terminal.jsx"
    instructions: |
      SOUL.md rule #1: the terminal IS the whole product.
      Flag any JSX that renders a full-screen overlay.
```

CodeRabbit doesn't know my project's soul. The path instructions teach it. Per Addy Osmani: *"feedback from tools like CodeRabbit can be used as additional prompts to ask the AI to refactor based on that feedback."*

## Layer 5 — second-opinion AI review (Osmani's dual-AI pattern)

Addy Osmani describes spawning a second AI session to critique the first:

> "I sometimes spawn a second AI session to critique the first model's output. This dual-review approach catches subtle flaws."

I formalized this as a `.github/workflows/codex-review.yml` that runs `/codex review` (an independent model) on every PR, in parallel with CodeRabbit. Two different models. Two different takes. Overlap reveals real issues.

A codex that flags something CodeRabbit missed is usually a legitimate issue. A CodeRabbit that flags something codex missed is usually a style preference. The overlap is the signal.

## Layer 6 — semantic soul review (domain-specific AI)

The layers above catch mechanical + generic issues. They can't catch things like:
- "This mission's tone drifted from the Nick Jr. register"
- "The character's voice doesn't match their profile in the bible"
- "This copy implies a villain even though never says the word"

Those are judgment calls. They need an AI review step that reads the doctrine.

I built `.github/workflows/soul-violation.yml` that runs Claude with SOUL.md as context against every PR diff:

```yaml
- name: Ask Claude for soul-fit judgment
  run: |
    claude -p "You are reviewing a PR against SOUL.md. Read SOUL.md
    and the diff. Flag possible soul violations that a regex-based
    guard would miss. Use Conventional Comments format." \
      < SOUL.md pr-diff.txt > soul-review.md
```

The prompt tells Claude to use [Conventional Comments](https://conventionalcomments.org/) (`suggestion:`, `issue:`, `nitpick:`, etc.) so the output is structured and easy to scan.

This layer is where the "AI with taste" promise actually pays off. Not because the AI has taste — because it has your doctrine.

## Layer 7 — post-deploy canary (Charity Majors' loop)

Charity Majors argues the other half of confidence comes from observability, not pre-deploy gates:

> "Deploying to production is the beginning of gaining confidence in your code, not the end."

Pre-deploy gates catch the regressions you can predict. Post-deploy canary catches the ones you can't. Mine runs after every prod deploy:

```yaml
# .github/workflows/post-deploy-canary.yml
on:
  deployment_status:  # fires on every Vercel deploy
jobs:
  canary:
    if: github.event.deployment_status.state == 'success'
    runs-on: ubuntu-latest
    steps:
      - run: bunx playwright test  # smoke test against live URL
      - name: Check prod headers
        run: curl -sI https://linux-jr.vercel.app | grep -q '<title>Linux Jr</title>' || exit 1
      - name: Open issue on failure
        if: failure()
        uses: actions/github-script@v7
        with:
          script: |
            await github.rest.issues.create({
              title: `🚨 Canary failed after deploy ${context.sha.slice(0,7)}`,
              labels: ['canary-failed', 'bug'],
            })
      - name: Auto-rollback (if enabled)
        if: failure() && vars.AUTO_ROLLBACK == 'true'
        run: vercel rollback --token=${{ secrets.VERCEL_TOKEN }} --yes
```

If the canary fails, either an issue opens (default), or prod auto-rolls-back (opt-in). The Charity loop closes.

## The meta-layer — feeding incidents back into the guard

The most important thing about this stack: it learns.

When something sloppy escapes to prod — say, a mission shipped with "wrong" in a user-facing string, and the soul-review missed it — I don't just fix the mission. I:

1. Fix the actual mission
2. Add a new SOFT check to `sloppy-guard.sh` that would have caught it
3. Write the commit with a message like `FIX-INCIDENT: mission M5 shipped with "wrong" in user copy — adding dedicated check that treats mission files stricter than other src/`
4. Also update the `soul-violation` prompt to emphasize that class of issue

Six months from now, `git log scripts/sloppy-guard.sh` will be the canonical "things I learned to never ship again" journal. That journal is itself a portfolio artifact — a record of judgment calibrating over time, written in git history.

## What this costs

- **Setup:** one weekend to wire up Layers 1-3. Another weekend for 4-7.
- **Per-PR overhead:** seven seconds for the guard. CodeRabbit review posts a comment within a minute. Post-deploy canary runs in about three minutes.
- **Token cost for AI layers:** under $5/month for CodeRabbit free-tier + the soul-violation Claude calls on a low-traffic repo.
- **Cognitive load:** lower, not higher. The guard handles the things my brain would otherwise have to hold. That's the whole point.

## What this does not do

It doesn't make me shipping-invincible. It doesn't replace careful thought. It doesn't catch bugs I don't know are bugs.

What it does: pushes my "sloppy floor" up. Thirty issues that I used to catch *sometimes*, I now catch *always*. That leaves my attention for the things that actually require it — architecture, story, user moments that make kids laugh.

For a solo builder with ADHD, shipping a public product while pair-programming with LLMs that hallucinate plausible-looking wrongness: that's the difference between shipping with dread and shipping with peace.

## The sketch I'd give a friend starting out

1. Write SOUL.md. Five bullets. An hour's work.
2. Write `scripts/guard.sh`. Lint, build, one grep for your worst recent mistake.
3. Add the guard to CI and to pre-push.
4. Turn on CodeRabbit free tier on your public repo.
5. Stop there until something sloppy escapes.
6. Then add the next layer. And the next.

Don't build the whole stack on day one. The stack above took me a month of iterative commits driven by real incidents. That's the pattern. The stack learns with you.

---

## References

- [My project's SOUL.md and sloppy-guard.sh](https://github.com/nalediym/linux-jr)
- Addy Osmani, [*My LLM coding workflow going into 2026*](https://addyo.substack.com/p/my-llm-coding-workflow-going-into)
- Charity Majors, [*Observability: the present and future*](https://newsletter.pragmaticengineer.com/p/observability-the-present-and-future)
- Gergely Orosz, [*Good Code Reviews, Better Code Reviews*](https://blog.pragmaticengineer.com/good-code-reviews-better-code-reviews/)
- [Lefthook](https://github.com/evilmartians/lefthook) · [Knip](https://knip.dev/) · [CodeRabbit](https://coderabbit.ai/) · [Conventional Comments](https://conventionalcomments.org/)
