<!--
  Thanks for the PR. Please fill this out — the checklist below is CI-like,
  not ceremonial. Conventional Commits enforced via commitlint.
-->

## Summary

<!-- 1-3 sentences. What does this PR do and why? -->

## SOUL.md checklist

Before merging, verify this PR passes the SOUL.md pre-ship checklist. Check the boxes that apply — unchecked items that SHOULD apply are automatic-reject.

- [ ] The terminal is still the whole product (no modal cards, no overlays)
- [ ] Real Linux commands only (no pretend Linux semantics)
- [ ] Typing is mandatory (no click-to-execute shortcuts)
- [ ] Nothing fails scary (no "wrong", no "error", no red alerts)
- [ ] Ethical hacker ethos honored (help, not harm; ask first; say what you did)
- [ ] Nick Jr. register maintained (warm, silly, curious, never mean)
- [ ] Hierarchy tiebreaker respected (commands > ethos > pedagogy > narrative)

## What changed

- [ ] Game content (missions, copy)
- [ ] Engine code (`src/components/`, `src/data/missions/`)
- [ ] CI / tooling
- [ ] Docs / README / CONTRIBUTING / SOUL
- [ ] KB / bible sync
- [ ] Other: __

## Test plan

- [ ] `bun run guard` passes locally
- [ ] `bun run test:e2e` passes (if code changes)
- [ ] Manually played the affected mission on iPad Safari
- [ ] Prose changes reviewed via `bunx alex` + Vale CI

## Related

<!-- Issues, discussions, other PRs -->

Closes #

---

🤖 *Generated with [Claude Code](https://claude.com/claude-code) — or by a human, either way welcome.*
