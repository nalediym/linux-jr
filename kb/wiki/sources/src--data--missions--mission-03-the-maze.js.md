# mission-03-the-maze.js — The Maze (implementation)

> **Source:** [kb/raw/src--data--missions--mission-03-the-maze.js](../../raw/src--data--missions--mission-03-the-maze.js)
> **Ingested:** 2026-04-21T20:10:52Z
> **Hash:** ab40aa5e7bf1a2603647b19b5058a976d8480b64f62f045db083ebe09ee4c5aa
> **Status:** fresh
> **Chunks:** 1

## Chunks

### c-d4620c7d: Mission object
> id `the-maze`, title "The Maze". Story: "Captain Rex's log: Pip took Sprocket down to the basement and got a bit turned around. Sprocket is beeping from somewhere deep. Each room has a clue — would you help us find them?" Filesystem: basement/entrance with left/right branches, dead ends (spider; old socks), fork by smell (cookies vs. stinky sock), payoff path `basement/entrance/left/down/right/down/.secret/pip.txt` containing `FLAG{pip_found}` and high-five line, plus `cookies.txt` (Pip was snacking while waiting). Tasks step through cd entrance → left → down → right → down → find FLAG{pip_found}.

## Key Claims
- The mission story includes Sprocket, matching the Act 1 retrofit requirement. — c-d4620c7d
- Flag value is `FLAG{pip_found}`. — c-d4620c7d
- Pip is eating cookies while waiting, matching pip.yaml canon. — c-d4620c7d
- Navigation requires going back with `cd ..` at least once (dead ends), matching cd.. introduction in command ladder. — c-d4620c7d

## Related Concepts
- [mission-03-maze](../concepts/mission-03-maze.md)
- [basement-maze](../concepts/basement-maze.md)
- [pip](../concepts/pip.md)
- [sprocket](../concepts/sprocket.md)
- [flag-convention](../concepts/flag-convention.md)
- [command-ladder](../concepts/command-ladder.md)

<!-- human notes below -->
