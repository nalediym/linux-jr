# Setting up Vercel Analytics

Part of Phase 1 observability. **Zero code changes required** — toggled
in the Vercel dashboard.

## Why

Core Web Vitals monitoring (FCP, LCP, TTFB, INP) for the production
deploy. Feeds into the SLOs in `docs/SLOs.md`. Free tier is 2.5k events/mo,
plenty for a small PWA.

## Enable it (2 minutes)

1. Go to https://vercel.com/naledi-s-projects/linux-jr/analytics
2. Click **Enable Analytics**
3. Pick **Web Analytics** (traffic, referrers) AND **Speed Insights**
   (Core Web Vitals). Both free tier.
4. Deploy any change — analytics start flowing immediately.

## What you get

- Daily/weekly/monthly traffic breakdown
- Top referrers and pages
- Core Web Vitals distribution (p75 / p90 / p99)
- Performance issues per page
- Data retained for 30 days on free tier

## How to check it

`vercel analytics linux-jr` from the CLI, or the web dashboard. When a
weekly SLO check fires (Phase 5 `/retro`), it pulls these metrics.

## Related

- `docs/SLOs.md` for the performance targets this data enforces
- `docs/setup/sentry.md` for error tracking (separate tool)
