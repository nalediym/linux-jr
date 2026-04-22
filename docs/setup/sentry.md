# Setting up Sentry

Part of Phase 1 observability. Error tracking for production deploys.
**Code is already wired in** (`src/sentry.js`); just needs a DSN to
activate.

## Why

The game runs in kids' browsers on iPads. When `Terminal.jsx` throws
(edge case in command parser, filesystem corruption in localStorage,
whatever), you find out **only because a kid's parent tells you**. That's
too slow. Sentry catches the error at the source and pages you within
minutes.

Free tier: 5k errors/month, plenty for a project this size.

## One-time setup (5 minutes)

1. Create a Sentry account at https://sentry.io (free).
2. Create a new project:
   - Platform: **React**
   - Alert frequency: when error rate >0.5% (matches SLO 8)
3. Copy the DSN from project settings → Client Keys (DSN).
4. Add to your environment:
   - Local: add `VITE_SENTRY_DSN=<dsn>` to `.env`
   - Vercel: `vercel env add VITE_SENTRY_DSN production preview`
5. Install the SDK:
   ```bash
   bun add @sentry/react
   ```
6. Redeploy (`git push` or `vercel --prod`). Errors start flowing.

## What's already in the repo

`src/sentry.js` detects whether `VITE_SENTRY_DSN` is set. If not, it's
a no-op. If set, it initializes Sentry with:
- Environment tag (`production` / `preview` / `development`)
- Release tag (current git SHA)
- User interaction tracing (tap-heavy iPad experience needs this)
- Session replay sampling at 10% (only on errors)

No DSN-free runtime cost. No impact on bundle if SDK isn't installed —
the dynamic import is gated.

## What to do with errors

Sentry groups errors by stack trace. For each new group:
1. Look at the stack. Is it a SOUL violation? (Something the Sloppy Guard
   should have caught.)
2. If yes, **add a new check to `scripts/sloppy-guard.sh`** and document the
   incident in the commit message. (See Principle 6 in the devops plan.)
3. If no (it's a real bug), open an issue, fix, close.

## Related

- `docs/SLOs.md` SLO 8 (error rate) is the trigger threshold
- `.github/workflows/post-deploy-canary.yml` (Phase 4) — auto-rollback
  if Sentry fires hard enough after a deploy
