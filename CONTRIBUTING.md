# Contributing to Linux Jr

Thanks for your interest. This is a solo-but-public project — contributions are welcome, with a few up-front conventions.

## Read first

1. **[SOUL.md](./SOUL.md)** — the doctrine. The non-negotiables. Your PR will be checked against it.
2. **[README.md](./README.md)** — what we're building and why.
3. **[kb/wiki/index.md](./kb/wiki/index.md)** — the compiled world bible. Canon for character names, setting, command ladder.

## Local setup

```bash
bun install              # also wires up git hooks via Lefthook
bun run dev              # http://localhost:5200
bun run lint             # ESLint, zero tolerance
bun run build            # Vite prod build
bun run guard            # Sloppy Guard — the anti-sloppiness catcher
bun run size             # bundle-size budget check
bun run knip             # dead-code / unused-export scan
bun run test:e2e         # Playwright smoke test for M1
```

Run `bun run guard` before every push. It mirrors the CI checks. Fast local feedback.

## Commit conventions

We use [Conventional Commits](https://www.conventionalcommits.org/). `commitlint` enforces this on every commit via the Lefthook `commit-msg` hook.

```
<type>(<scope>): <subject>

feat(cli): add `linuxjr --season 2` flag
fix: respect iPad safe-area-inset-bottom
docs(soul): clarify the hierarchy tiebreaker
mission: draft M5 (The Missing Tail)
bible: sync kb/ with scratchpad after character update
soul: add new never-do line about red error styling
```

**Types we use:** `feat` · `fix` · `docs` · `style` · `refactor` · `perf` · `test` · `chore` · `ci` · `build` · `revert` · `mission` · `bible` · `soul`

### Special commit markers

- `REJECTED:` in the commit subject → a design direction was tried and walked back. Lives as a historical tombstone. Example: `REJECTED: 6-beat mission shape with modal cards`. Capture the lesson in a follow-up issue or draft doc when it is worth preserving.
- `FIX-INCIDENT:` → a sloppy pattern escaped to prod; commit adds a new guard check to prevent recurrence. Pairs with a Sloppy Guard update that documents the incident.

## PR workflow

1. Branch off `main`: `git checkout -b feat/my-thing`
2. Make changes in small commits
3. `bun run guard` passes locally
4. `git push -u origin feat/my-thing`
5. `gh pr create` (template pre-fills the SOUL.md checklist)
6. CI runs: lint, build, Sloppy Guard, gitleaks, prose lint (Vale + alex), bundle-size, Lighthouse CI, Playwright, and optionally CodeRabbit if the app is enabled
7. Address feedback, re-push
8. Merge when all HARD checks pass

Stacked PRs are fine for local sequencing, but keep only one merge-ready PR open against `main` at a time and close superseded stack PRs quickly.

## Review standards — Conventional Comments

We use [Conventional Comments](https://conventionalcomments.org/) for PR feedback. Every review comment starts with one of these labels:

| Label | Meaning | Blocks merge? |
|---|---|---|
| `issue:` | Something is wrong | Yes |
| `suggestion:` | An improvement, non-blocking | No |
| `question:` | Clarification needed | Maybe |
| `nitpick:` | Style / taste preference | No |
| `praise:` | Positive feedback | No |
| `todo:` | Should be done but in follow-up | No |
| `thought:` | Idea worth exploring later | No |
| `chore:` | Housekeeping | No |

Example: `suggestion: consider renaming this function — it does two things.`

This keeps signal-to-noise high and sets expectations on what you must address vs. what's optional.

## The Sloppy Guard grows

When a sloppy pattern escapes to prod, the fix is a PR with:
1. The actual fix
2. A new check in `scripts/sloppy-guard.sh` that would have prevented it
3. A commit message starting with `FIX-INCIDENT:` that documents the incident

Over time, `git log scripts/sloppy-guard.sh` becomes the canonical "things we learned not to ship" journal. This is intentional — the guard is a learning artifact, not a static rulebook.

## Mission contributions

If you want to add a mission:

1. Read `kb/wiki/index.md` to see the cast and canon
2. Draft the mission as a `src/data/missions/mission-NN-*.js` file following the existing shape
3. Run `bun run test:e2e` to make sure the structural checks still pass
4. PR with a `mission:` commit type

Mission content is checked against SOUL.md banned words via Vale. If your draft uses "wrong", "failed", "stupid", "dumb", etc. in user-facing copy, the prose CI will block it.

## Things we will not accept

Per SOUL.md:
- Modal cards or overlay screens covering the terminal
- Click-to-execute buttons that bypass typing
- "wrong" / "error" / "failed" in user copy
- Villains, scary content, time pressure
- Jargon unsuitable for a 7-year-old
- Analytics/tracking beyond aggregate Vercel metrics
- Pretend-Linux shortcuts that break muscle-memory transfer

## Getting help

Open a Discussion for ideas, an Issue for bugs, a PR for fixes. Or just ask in the Discussion tab — the Conventional Comments standard applies to all conversations.

## Code of conduct

Kid-product → extra care. Kind, specific, blame-free. If you wouldn't say it to a 9-year-old, don't say it here.
