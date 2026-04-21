# missions/index.js — Mission registry

> **Source:** [kb/raw/src--data--missions--index.js](../../raw/src--data--missions--index.js)
> **Ingested:** 2026-04-21T20:10:52Z
> **Hash:** 4c384d1dc04e0d1e4dd8c560f79b16d07b9389ef5011148da1c325a78772d8ba
> **Status:** fresh
> **Chunks:** 1

## Chunks

### c-a93f0b7f: Registry
> Exports `ALL_MISSIONS` (array of MISSION_FIND_THE_FLAG, MISSION_SECRET_CODE, MISSION_THE_MAZE). `getMission(id)` finds by id. `getCompletedMissionIds()` reads localStorage `linuxjr-progress` and returns `missionsCompleted` or an empty array.

## Key Claims
- Today only 3 of the planned 10 missions are implemented (Act 1 only). — c-a93f0b7f
- Progress is persisted to localStorage under `linuxjr-progress`. — c-a93f0b7f
- There is no routing; missions are picked by id. — c-a93f0b7f

## Related Concepts
- [command-ladder](../concepts/command-ladder.md)
- [mission-shape](../concepts/mission-shape.md)
- [stack-architecture](../concepts/stack-architecture.md)

<!-- human notes below -->
