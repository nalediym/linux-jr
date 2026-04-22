# Social preview image

When linux-jr is flipped public, the repo's social preview image is the first thing people see in:
- GitHub search results
- Twitter/X link unfurls
- Slack / Discord / any OG-tag-aware chat app
- Hacker News submissions

**Dimensions:** 1280 × 640 px (GitHub's recommended size).

## What the image should show

Per SOUL.md — the terminal IS the whole product. The image should be a screenshot of the terminal mid-gameplay showing:
- The `Linux Jr` heading
- A visible FLAG line (`FLAG{you_found_it_hacker}` or similar)
- Maybe the MISSION COMPLETE banner
- The `>` prompt with the block cursor

Keep it flat — no gradient overlays, no marketing text, no decorative chrome. A real terminal shot. That's the aesthetic the Kali-inspired rejected mockup was pointing at (see `~/Projects/linux-jr-engine/mockups/engine-extension-v3.html` for reference even though that direction was rejected).

## How to capture

1. `bun run dev`
2. Open `http://localhost:5200` in Chrome at 1280 × 640 viewport:
   ```js
   // DevTools console
   // Device Toolbar → Responsive → set to 1280 × 640
   ```
3. Play through M1 until FLAG appears
4. Screenshot the terminal frame
5. Save to `docs/screenshots/social-preview.png`

## Upload

1. Go to https://github.com/nalediym/linux-jr/settings
2. Scroll to **Social preview**
3. Click **Edit** → **Upload an image**
4. Upload the PNG
5. Save

## Alternative: automated capture (future Phase 7+)

A GitHub Action could rebuild this image on every prod deploy. Something like:

```yaml
- name: Capture social preview
  run: |
    bunx --bun playwright ... # capture at 1280x640
```

Not worth it until the UI changes frequently enough for a weekly-stale image to be an issue. For now: manual capture on each major visual change.
