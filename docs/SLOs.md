# Linux Jr — Service Level Objectives

> The written commitments this project makes to itself about performance,
> availability, and quality. Each SLO below has an enforcement point
> (where it's checked) and a consequence if violated.
>
> **Philosophy note (Charity Majors–aligned):** pre-deploy gates catch
> half the bugs; observability catches the other half. Every SLO below
> is measured post-deploy too, not just pre-deploy.

## The SLOs

| # | Metric | Target | Enforced in | On violation |
|---|---|---|---|---|
| 1 | **Bundle size — JS (gzipped)** | ≤75 kB | CI (Phase 3: size-limit) | PR blocked |
| 2 | **Bundle size — CSS (gzipped)** | ≤5 kB | CI (Phase 3: size-limit) | PR blocked |
| 3 | **Lighthouse performance (mobile)** | ≥85 | CI (Phase 3: Lighthouse CI) | PR blocked |
| 4 | **Lighthouse accessibility** | ≥95 | CI (Phase 3: Lighthouse CI) + daily axe-core against prod | PR blocked; issue opened if prod regresses |
| 5 | **Lighthouse best practices** | ≥90 | CI (Phase 3: Lighthouse CI) | PR blocked |
| 6 | **First Contentful Paint (mobile)** | ≤1.8s | Vercel Analytics + CI | Alert if p75 >2.5s for 7 days |
| 7 | **Time to Interactive (mobile)** | ≤3.5s | Vercel Analytics + CI | Alert if p75 >5s for 7 days |
| 8 | **Sentry error rate** | <0.5% of sessions | Sentry alerts | Issue auto-opened; rollback if >2% for 15 min |
| 9 | **Prod deploy success rate** | ≥99% rolling 30 days | Vercel dashboard | Manual investigation |
| 10 | **Mean time to first interaction (TTFI)** | ≤10s after page load | Vercel Analytics (custom event) | Alert if p75 >15s for 7 days |

## Baselines at the time this doc was written

- Current JS bundle: **68.7 kB gzipped** (target 75 = +9% headroom)
- Current CSS bundle: **0.67 kB gzipped** (plenty of headroom)
- Current Lighthouse scores: TBD — baseline gets captured once Phase 3 ships

## What counts as "prod regression"

Anything that pushes an SLO into the red on the live `linux-jr.vercel.app`
deployment for more than the specified window.

## Rollback policy

If SLO 8 (error rate) exceeds 2% for 15 minutes, auto-rollback via
Vercel Rolling Releases fires. See `.github/workflows/post-deploy-canary.yml`
(Phase 4).

For other SLOs, manual decision based on severity — but no SLO violation
can ship to prod past a single cycle without an open GitHub Issue.

## Philosophy

SLOs here are **ship-affecting**, not SaaS-style (no uptime percentages,
no API latency, no throughput). This is a static PWA served from
Vercel's CDN — the classic SLOs don't map. What maps is
**"does the kid have a good first 30 seconds?"**, which decomposes into
bundle size + FCP + TTI + a11y. That's what we measure.

SLO 8 (error rate) is the one traditional SLO — kept because if
`Terminal.jsx` throws, the whole experience is dead.
