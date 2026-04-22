# DevOps Extraction Plan — Phase 6

> How we extract the patterns built for Linux Jr into reusable form
> across `nalediym`'s other projects (hyperbrowser, storycraft,
> hypercard, unearth).

## Status

The meta-repo exists: https://github.com/nalediym/devops (public, empty).
This doc is the roadmap for filling it.

## What gets extracted

### 1. Reusable GitHub Actions workflows → `nalediym/devops/.github/workflows/`

These work as callable workflows (`uses: nalediym/devops/.github/workflows/<name>.yml@main`) so any of my repos can adopt them by reference, not copy-paste.

- [ ] `sloppy-guard-reusable.yml` — the Sloppy Guard as a callable workflow. Takes inputs for repo-specific exclusions and HARD/SOFT thresholds.
- [ ] `secrets-scan-reusable.yml` — gitleaks binary scan. Same config regardless of repo.
- [ ] `prose-lint-reusable.yml` — Vale + alex, with per-repo style overrides passed as inputs.
- [ ] `size-budget-reusable.yml` — size-limit + Lighthouse CI with per-repo budget config paths.
- [ ] `post-deploy-canary-reusable.yml` — Playwright smoke + URL health check.

### 2. Shared configs → `@naledi/config` (private npm package)

Publish to GitHub Packages (private npm registry, free for personal scope).

- [ ] `eslint-config-naledi` (base ESLint 9 flat config)
- [ ] `prettier-config-naledi` (agreed-upon formatting; we don't use Prettier yet in linux-jr, but nice default for new repos)
- [ ] `vite-config-naledi` (shared Vite plugins / dev server port conventions)
- [ ] `tsconfig-naledi` (when a project adopts TypeScript)
- [ ] `lefthook-config-naledi` (the hooks layout including public-repo banner)

Consumers install once and extend:

```js
// my-project/eslint.config.js
import naledi from '@naledi/eslint-config'
export default [...naledi, /* per-project overrides */]
```

### 3. `@naledi/sloppy-guard` — the installable CLI (public npm package)

This is the OSS extraction. Anyone can:

```bash
npx @naledi/sloppy-guard init          # scaffolds SOUL.md + sloppy-guard.sh + CI workflow
npx @naledi/sloppy-guard                # runs all configured checks
```

Configuration via `sloppy-guard.config.yml` at repo root, following the project-local patterns.

- [ ] Lives in the `linux-jr-sandbox` repo until it's stable; graduates to its own repo at npm-publish time.
- [ ] MIT licensed.
- [ ] Ships with sensible defaults that match Linux Jr's setup.
- [ ] The blog post in `docs/drafts/01-soul-and-sloppy-guard.md` doubles as the README.

### 4. Shared SOUL.md template → `nalediym/devops/templates/SOUL.md`

A starter SOUL.md with the seven-section structure (principles, never-do, pre-ship checklist, hierarchy tiebreaker, where the bible lives, related products, last-updated).

### 5. Shared PROTOCOLS.md template → `nalediym/devops/templates/PROTOCOLS.md`

The ADHD-safe public-repo protocol doc, templated for any repo name.

## Order of operations

### Now (deferred from Phase 6)
- Linux Jr has everything stable
- All other repos continue as-is

### Next 2 weeks
1. Extract `sloppy-guard-reusable.yml` into `nalediym/devops`
2. Switch Linux Jr's `.github/workflows/sloppy-guard.yml` to call the reusable workflow
3. Roll the same pattern out to `hyperbrowser`
4. Adjust the reusable workflow based on what breaks

### Next month
5. Extract `@naledi/config` ESLint base
6. Have Linux Jr, hyperbrowser, and storycraft all extend it
7. Deprecate duplicated configs in each repo

### Next quarter
8. Stabilize `@naledi/sloppy-guard` in the sandbox
9. Publish to npm (public, MIT)
10. Announce via the Gap 1 blog post

## Deliberately NOT doing

- **No Turborepo / monorepo consolidation.** Each project stays in its own repo. The meta-repo shares workflows, not code.
- **No enterprise-style shared component library.** These are small projects; I don't need a design system package.
- **No package-manager monorepo migration.** Bun workspaces on Linux Jr are enough.

## Why extract at all

If I stay inside Linux Jr forever, this works fine. But I have four other projects and counting. Every time I spin up a new one, the first three hours are "recreate the eslint config, recreate the sloppy guard, recreate the protocols doc." That's time I'd rather spend on the actual product.

The extraction is infrastructure investment. Linux Jr paid for it by being the R&D project. Now it graduates.

## Progress tracking

Progress on Phase 6 happens IN `nalediym/devops`, not here. This doc gets updated with links to the extracted artifacts as they ship.
