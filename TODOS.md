# TODOS — Linux Jr

Running backlog, organized by theme. ⭐ marks the highest-leverage items. Every entry cites its source so the rationale is rediscoverable.

---

## 🎯 Product & content

- ⭐ **Sound design for CLI** — SOUL.md says sound is 50% of the experience, and the CLI has none. Terminal bell is wrong. Cross-platform is hard; start with macOS `say` + silent fallback elsewhere.
  *Source: /plan-eng-review deferred list*

- ⭐ **TTS narration in CLI** — Story text should be read aloud like the web. Mission data already has an `audio` field for pre-generated ElevenLabs clips with TTS fallback. Need an audio player.
  *Source: /plan-eng-review deferred list*

- **SSH mission (fake)** — Kid types `ssh robot@mars`, screen flickers with a hacker aesthetic, filesystem swaps to a Mars rover. Tight scope: one mission's worth of work, massive narrative upgrade.
  *Source: brainstorm earlier this session*

- **Multi-machine story arc** — Earth → satellite → rover. Chains SSH missions into a narrative. Same engine, new content.
  *Source: brainstorm*

- **New commands** — `touch` and `echo` are called out in SOUL.md. `rm` is dangerous for kids but could work with a built-in undo. Scope each carefully.
  *Source: SOUL.md*

- **More missions** — 3 shipped, 10+ is the aspiration. Each is ~60 lines of config. Cheap; the bottleneck is mission design quality, not engineering.
  *Source: product*

- **Hacker aesthetic beats** — Matrix cascade on mission start, modem handshake sound, brief "access granted" moments. 3 seconds of delight before each mission.
  *Source: brainstorm*

---

## 🌉 Bridge: web sandbox → real terminal (the product wedge)

- ⭐ **"Bring your own folder" (web)** — File System Access API. Kid's real Downloads folder becomes the virtual FS. "Wait, this is my ACTUAL computer?" moment. Chrome-only; needs parent consent.
  *Source: brainstorm*

- ⭐ **Graduation ritual** — After N missions, web app emits a `graduate` event. Parent gets a shareable page / printable card with "open your real terminal and type `npx linuxjr`". Explicit, celebrated transition.
  *Source: brainstorm*

- **Progress sync (web ↔ CLI)** — `~/.linuxjr/progress.json` + localStorage. Design question: which is source of truth when they diverge?
  *Source: /plan-eng-review deferred list*

- **Mirror mode** — Web watches a real terminal via a companion script (`curl linuxjr.fun/mirror | sh`) and celebrates when keystrokes match. Parent-assisted first-time-real-terminal flow.
  *Source: brainstorm*

---

## 🧪 Engineering hygiene (debt from v0.1)

- ⭐ **Tests for `cli/src/cli.jsx`** — 230 LOC of ink state machine, 0% coverage. Use `ink-testing-library`. One happy-path integration (play mission 1 → `next` → mission 2) + a handleTab unit test covers the highest risk.
  *Source: codex review, testing specialist*

- ⭐ **Fix `handleTab` path completion** — `cd workshop/too<TAB>` silently no-ops today. Single-segment only. Extract to pure `completeInput(input, fs, COMMANDS)` helper — fixes and makes it testable in one refactor.
  *Source: codex review #3 (P2, confidence 9/10)*

- **Extract `packages/core`** — CLI currently imports `../../src/components/*.js`. Implicit cross-workspace contract. Move shared code (FileSystem, CommandParser, MissionEngine, missions) into a named workspace package both web and CLI depend on.
  *Source: maintainability specialist (CRITICAL, confidence 9)*

- **`ls()` shape regression test** — Locks the `{name, isDir}` contract. Future refactor can't silently break consumers.
  *Source: testing specialist (CRITICAL, confidence 8)*

- **Replace `__CLEAR__` magic string** — Return `{ effect: 'clear' }` from CommandParser instead. Future-proofs for other side-effect commands (`reset`, `hint`).
  *Source: maintainability specialist*

- **DRY command names** — `COMMANDS` array in cli.jsx duplicates parser switch cases. Export from parser, concat shell-level commands locally.
  *Source: maintainability specialist*

- **Delete unused `typescript` devDep** — tsup pulls it transitively. Currently implies type-safety we don't have.
  *Source: codex review*

- **Use `useApp().exit()` instead of `process.exit(0)`** — Proper ink cleanup on quit/exit. Cosmetic but correct.
  *Source: codex review*

- **Bump dev-dep CVEs** — `bun update` resolves the vite + esbuild CVEs. Dev-only, not shipped; still good hygiene.
  *Source: /cso*

---

## 📦 Distribution & release

- ⭐ **First OIDC-powered release** — Tag `cli-v0.1.2`, push. CI should publish via OIDC trusted publishing with zero tokens. Proves the whole pipeline works before we need it.
  *Source: this session*

- **CHANGELOG.md** — `keep-a-changelog` format. Every release documented.
  *Source: standard hygiene*

- **README badges** — npm version, CI status, license, downloads. Low effort, high "this is alive" signal.
  *Source: packaging*

- **Demo GIF in README** — 10-second recording of a kid typing through mission 1. Single highest-leverage README addition.
  *Source: packaging*

- **Richer npm keywords** — Add `tui`, `ink`, `education-cli`. Minor discoverability win.
  *Source: packaging*

---

## 📣 Growth

- ⭐ **Fix tweet-for-me preflight** — `tweet-for-me` project, issue [#11](https://github.com/nalediym/tweet-for-me/issues/11) (comment from 2026-04-21). X session expiry → misleading selector error. ~10-line fix to detect login redirect early.
  *Source: this session*

- **HN post / Show HN** — "Show HN: npx linuxjr — a real Linux terminal for kids." The bridge narrative is the hook. Time with a weekday morning.
  *Source: Pim content calendar*

- **Follow-up content** — LinkedIn post, 5-tweet thread, YT Short, TikTok drafts all in `~/Projects/pimp/memory/content-calendar.jsonl` pending approval.
  *Source: /pimp*

- **TOTP backup for npm** — 1Password has the login + recovery codes, but not the TOTP secret. Add from phone authenticator next time at the computer.
  *Source: this session*

---

## Recommended v0.2 scope

Pick **one** from each of the top three buckets — don't over-scope.

1. **Product moment:** sound design OR TTS (not both)
2. **Bridge moment:** "bring your own folder" OR graduation ritual (not both)
3. **Eng hygiene:** `handleTab` fix + `cli.jsx` tests (bundles — fix forces testability)
4. **Distribution proof:** ship a patch via OIDC as `cli-v0.1.2` to validate the CI pipeline

**Sleeper recommendation: the SSH mission.** One mission's worth of engineering, reframes the whole product from "Linux CLI game" to "hacker training for 7-year-olds." Consider as v0.2 headline over anything else.
