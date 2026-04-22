# Domain cutover: `linuxjr.dev`

> Executed: TBD. This file is the playbook + receipt for moving Linux Jr from
> `linux-jr.vercel.app` to `linuxjr.dev`. Keep it as the canonical reference.

## Pre-flight (verified 2026-04-22)

- ✅ `linuxjr.dev` confirmed available via NS/SOA empty + IANA RDAP
- ✅ All in-tree references to `linux-jr.vercel.app` replaced with `linuxjr.dev`
  in this PR. The Vercel-issued subdomain stays live as a free alias after
  cutover, so old links keep resolving.
- ✅ HTTPS works on `.dev` automatically (HSTS preloaded by the TLD; you
  cannot serve HTTP on a `.dev` even briefly)

## Steps to execute

### 1. Buy the domain (~$13/yr)

**Recommended: Cloudflare Registrar** — at-cost, free WHOIS privacy, no
upsell, two-factor auth required.

```
https://dash.cloudflare.com/?to=/:account/domains/register/linuxjr.dev
```

Alternates:
- **Porkbun** (~$13/yr first year, $14 renewal, also good)
- **Namecheap** (~$15 first year, $20+ renewal — avoid for `.dev`)
- ~~Google Domains~~ (sold to Squarespace, no longer recommended)

### 2. Add the domain in Vercel

1. Vercel dashboard → `linux-jr` project → Settings → Domains
2. Click "Add" → enter `linuxjr.dev` → confirm
3. Add `www.linuxjr.dev` as a redirect to apex
4. Vercel shows two DNS records to add at the registrar:
   ```
   A     @     76.76.21.21
   CNAME www   cname.vercel-dns.com
   ```
   (Exact values vary; copy them from the Vercel UI.)

### 3. Add the DNS records at the registrar

If using **Cloudflare Registrar**, the DNS is already at Cloudflare. Add the
two records under DNS settings. Set both to "DNS only" (grey cloud) — Vercel
issues its own SSL cert; routing through Cloudflare proxy adds latency and
breaks the cert chain.

### 4. Verify

After ~30s–2min:
```bash
dig +short linuxjr.dev A           # should return 76.76.21.21
curl -I https://linuxjr.dev        # HTTP/2 200
curl -I https://www.linuxjr.dev    # HTTP/2 308 → linuxjr.dev
```

Vercel's SSL provisions automatically via Let's Encrypt within a minute.

### 5. Merge this PR

The code changes in this PR (README, index.html OG tags, package.json
homepage fields, CLI, docs) flip the canonical URL to `linuxjr.dev`. Merge
once DNS resolves so the Vercel preview unfurls reflect the new URL.

### 6. Post-merge

- Re-record the hero GIF if the og.png/screenshot mentions the old URL
  (currently doesn't — safe to skip)
- Update Twitter/HN drafts in `docs/launch/` if you've already scheduled them
  with the old URL (this PR updates the drafts in place)
- Optionally: add `linuxjr.dev` to GSC + Bing Webmaster Tools if you care
  about indexing (not required for soft launch)

## What does NOT change

- The `npx linuxjr` CLI behavior — still ships from npm, just points at
  `linuxjr.dev` in its help text
- Production deploys still trigger on push to `main`
- The Vercel preview URLs (`linux-jr-*.vercel.app`) keep working for PR
  previews — Vercel treats the custom domain as additive

## Rollback plan

If anything goes wrong:
1. Remove `linuxjr.dev` from Vercel project domains
2. Revert this PR (`git revert <merge-commit>`)
3. The Vercel-issued URL never stopped working, so prod stays up

## Receipts (fill in after execution)

- [ ] Domain purchased: `linuxjr.dev` from `<registrar>` on `<date>` for `$<price>`
- [ ] DNS records added: `<timestamp>`
- [ ] Vercel SSL cert issued: `<timestamp>`
- [ ] First successful production hit on `https://linuxjr.dev`: `<timestamp>`
- [ ] PR merged: `<commit-sha>`
