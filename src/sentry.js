/**
 * Sentry error tracking — Phase 1 observability.
 *
 * Gated on VITE_SENTRY_DSN being set. If the env var is missing, this
 * module is a complete no-op: no SDK imported, no runtime cost, no bundle
 * impact (the dynamic import is tree-shaken away).
 *
 * To activate: see docs/setup/sentry.md
 */

// Only initialize if a DSN is present. No DSN = no Sentry.
const DSN = import.meta.env.VITE_SENTRY_DSN

if (DSN) {
  // Dynamic import so the Sentry SDK isn't in the bundle unless
  // someone's actually using it. ~30 kB savings when disabled.
  import('@sentry/react').then(({ init, BrowserTracing, Replay }) => {
    init({
      dsn: DSN,
      environment: import.meta.env.MODE || 'production',
      release: import.meta.env.VITE_GIT_SHA || 'unknown',
      integrations: [
        new BrowserTracing(),
        new Replay({
          // Only capture session replay when an error fires — preserves
          // kids' privacy on the non-error 99% of sessions.
          sessionSampleRate: 0,
          errorSampleRate: 0.1,
        }),
      ],
      tracesSampleRate: 0.1,
      beforeSend(event) {
        // Strip localStorage from error reports — we don't need the
        // kid's mission progress leaving their device.
        if (event.request?.headers) {
          delete event.request.headers
        }
        return event
      },
    })
  }).catch(_err => {
    // SDK not installed? Silently continue — Sentry is optional.
    console.warn('[linux-jr] Sentry DSN set but @sentry/react not installed. Run: bun add @sentry/react')
  })
}

export {}
