# Flag Convention (FLAG{…})

> **First seen in:** [mission-01](../sources/src--data--missions--mission-01-find-the-flag.js.md)
> **Also referenced by:** [mission-03](../sources/src--data--missions--mission-03-the-maze.js.md), [act-1.md](../sources/linux-jr-story--arcs--act-1.md.md)
> **Confidence:** high (3 sources agree)
> **Aliases:** FLAG braces, CTF-style flag

## Definition
A Capture-The-Flag-style payoff convention: the successful-discovery payload is formatted as `FLAG{snake_case_phrase}` inside a target file. Task completion is checked via `output_contains: 'FLAG{'`.
— [mission-01](../sources/src--data--missions--mission-01-find-the-flag.js.md)#c-407ad082, [mission-03](../sources/src--data--missions--mission-03-the-maze.js.md)#c-d4620c7d

## Details
Observed values today:
- M1: `FLAG{you_found_it_hacker}` inside `/workshop/secret-room/.hidden-blueprint.txt`.
- M3: `FLAG{pip_found}` inside `/basement/entrance/left/down/right/down/.secret/pip.txt`.
- M2 does not use a FLAG payload — instead the success gate is `file_read: 'computer.txt'` after finding all four digit clues.
— [mission-01](../sources/src--data--missions--mission-01-find-the-flag.js.md)#c-407ad082, [mission-03](../sources/src--data--missions--mission-03-the-maze.js.md)#c-d4620c7d

"flag" is part of the Act 1 vocabulary ladder — so the FLAG{} convention doubles as an educational hook.
— [act-1.md](../sources/linux-jr-story--arcs--act-1.md.md)#c-d18daf3e

## Connections
- Related to: [heart-real-commands](heart-real-commands.md) — FLAG{ is actually shell-parseable text in a real file
- Related to: [vocabulary-ladder](vocabulary-ladder.md) — "flag" is an Act 1 word
- Related to: [mission-01-blueprint](mission-01-blueprint.md)
- Related to: [mission-03-maze](mission-03-maze.md)
- Related to: [stack-architecture](stack-architecture.md) — checked by `MissionEngine.js` `output_contains`

## Provenance
- [mission-01](../sources/src--data--missions--mission-01-find-the-flag.js.md) — c-407ad082
- [mission-03](../sources/src--data--missions--mission-03-the-maze.js.md) — c-d4620c7d
- [act-1.md](../sources/linux-jr-story--arcs--act-1.md.md) — c-d18daf3e

<!-- human notes below -->
