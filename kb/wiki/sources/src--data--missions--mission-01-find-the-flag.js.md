# mission-01-find-the-flag.js — The Missing Blueprint (implementation)

> **Source:** [kb/raw/src--data--missions--mission-01-find-the-flag.js](../../raw/src--data--missions--mission-01-find-the-flag.js)
> **Ingested:** 2026-04-21T20:10:52Z
> **Hash:** e17615d5699a5a704ac52c4592bb5e6aee5ca2f76b5d2f1373dbf2e29e0da54c
> **Status:** fresh
> **Chunks:** 1

## Chunks

### c-407ad082: Mission object
> id `find-the-flag`, title "The Missing Blueprint". Story: "Captain Rex's log: ever lose something in your own room? Pip did. They hid Sprocket's blueprint somewhere in the workshop and forgot where. Pip asked — would you help us find it?" Audio keys `mission-01-intro`/`mission-01-complete`. Filesystem: workshop with toolbox, kitchen, and secret-room. The flag lives in `/workshop/secret-room/.hidden-blueprint.txt` as `FLAG{you_found_it_hacker}` and names Sprocket explicitly. Tasks: pwd → ls → cd workshop → cd secret-room → find FLAG{.

## Key Claims
- The in-product mission name is "The Missing Blueprint". — c-407ad082
- Flag value is `FLAG{you_found_it_hacker}`. — c-407ad082
- The blueprint belongs to Sprocket (the half-built robot cat), matching bible canon. — c-407ad082
- Each mission task has an `audio` key for pre-generated ElevenLabs narration with TTS fallback. — c-407ad082
- The story already begins with a Rex-log invitation, matching the ethos/style rules. — c-407ad082

## Related Concepts
- [mission-01-blueprint](../concepts/mission-01-blueprint.md)
- [command-ladder](../concepts/command-ladder.md)
- [workshop](../concepts/workshop.md)
- [sprocket](../concepts/sprocket.md)
- [flag-convention](../concepts/flag-convention.md)

<!-- human notes below -->
