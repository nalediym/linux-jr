# Setting up Socket.dev

Part of Phase 1 supply-chain defense. **Critical in 2026** given the npm
supply-chain attacks of 2025. Zero code changes — install as a GitHub App.

## Why

npm has been under coordinated attack:
- Self-replicating worms hijacking packages with billions of weekly downloads
- Compromised maintainer accounts (Axios attack, Feb 2026)
- Obfuscated install scripts exfiltrating env vars

Socket detects these patterns **before a malicious package ever runs on
your machine or in CI**. It scored ≥10k orgs by Dec 2025 and npm began
integrating Socket badges on package pages in Feb 2026.

## One-time setup (3 minutes)

1. Visit https://socket.dev/
2. Click **Install on GitHub**, authorize for the repo `nalediym/linux-jr`
3. Socket starts scanning every new dependency + existing lockfile
4. On every PR that adds/updates a dep, Socket posts a comment with its
   score (0–100) across 5 categories: Supply Chain Security,
   Vulnerability, Quality, Maintenance, License
5. Enable the "block high-risk PRs" setting if you want Socket to
   prevent merge when it detects critical issues

## What to watch for

Socket flags:
- Install scripts (`postinstall`, `preinstall`) that run arbitrary code
- Network access at install time
- Filesystem access outside `node_modules`
- Obfuscated / minified source
- Newly-registered maintainer accounts (<30 days old)
- Unusual changes to previously-stable packages (a common attack vector)

When Socket flags something: **don't merge the Dependabot PR.** Manually
review. If the package is doing something unexpected, open an issue and
find an alternative.

## Free tier limits

- Free for all public repos (Linux Jr flips public in Phase 1)
- Free for unlimited open-source dependencies
- Paid tier ($) only needed for private mono-repos or advanced features

## Related

- `.github/dependabot.yml` — auto-updates run weekly; Socket gates them
- `.github/workflows/secrets-scan.yml` — gitleaks covers committed secrets;
  Socket covers dependency secrets + behavioral analysis
