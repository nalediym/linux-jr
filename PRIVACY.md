# Linux Jr — Privacy

> **One sentence:** nothing leaves the kid's device.

This is a kid-targeted product, so the privacy stance has to be sharper than the
default web app. Here's exactly what happens (and doesn't) when a kid plays.

## What we collect from the kid

**Nothing.** No accounts, no email, no name, no age, no IP logging, no fingerprint.
The kid types `cat readme` into a terminal and a flag appears. That's the whole
interaction. No part of it ever reaches a server we control.

## What we store on the device

These keys live in the browser's `localStorage`, scoped to the linux-jr.vercel.app
origin. They never leave the device unless the user explicitly exports them.

| Key | Purpose | Example |
|---|---|---|
| `linuxjr-disclaimer-accepted` | Skip the disclaimer screen on return visits. | `"true"` |
| `linuxjr-progress` | Mission completion + arcade flags + autosave. | `{"missionsCompleted":["..."],"arcadeCompleted":["..."]}` |
| `linuxjr-telemetry` | Local play log (commands typed, errors hit). Never transmitted. Used by future adaptive-hint logic. | `{"events":[...]}` |
| `linuxjr-feedback` | Post-capture emoji ratings + optional textarea. Capped at 200 entries. Never transmitted. | `[{"gameId":"...","rating":3,"text":"...","ts":...}]` |

The kid can clear all of it by clearing site data in their browser settings, or by
using the Linux Jr "Reset progress" control (TODO).

## What we collect from the network

**Nothing analytics-shaped.** No Google Analytics, Plausible, Mixpanel, Sentry,
PostHog, or anything that pings a remote on page view. The only outbound network
calls are:

- **Static assets** from Vercel's CDN (the bundle, fonts, the manifest).
- **ElevenLabs MP3 voice files** for pre-rendered TTS narration. These are static
  audio fetched by URL — ElevenLabs sees the request just like any CDN would.
  Fallback is the browser's built-in `speechSynthesis`, which doesn't network at all.

That's it.

## Hosting

- **Vercel** serves the static site. Vercel sees server-log-level access (IP,
  user-agent, path) like any host. We do not enable Vercel Analytics.
- **GitHub** hosts the source code and CI. Public repository.

## Children & COPPA

Linux Jr is intended for children ages 7+. The US Children's Online Privacy
Protection Act (COPPA) applies to operators that knowingly collect personal
information from children under 13. **We do not collect personal information from
anyone, regardless of age.** No accounts, no PII, no contact mechanism, no
behavioral tracking. The COPPA "verifiable parental consent" requirement does not
trigger because there is nothing to consent to.

## Third parties

- **ElevenLabs** (audio CDN): receives an HTTP request when an MP3 plays. Sees
  the IP and user-agent of the request. Does not receive any kid-identifying
  payload because there isn't one.
- **Vercel** (host): receives standard HTTP request metadata. Does not receive
  any kid-identifying payload.

No data is sold, shared, or licensed to anyone.

## Changes to this stance

If we ever add an account system, sync feature, or any form of analytics, this
file will be updated *before* the change ships and the change will be called out
in the release notes. Silent expansions of data collection are out of scope for
this project's ethos. See [SOUL.md](./SOUL.md).

## Contact

Issues, concerns, questions: file an issue at
https://github.com/nalediym/linux-jr/issues or email naniikekana@gmail.com.

---

*Last reviewed: 2026-04-22.*
