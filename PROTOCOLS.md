# PROTOCOLS.md — ADHD-safe public repo

> **This repo is PUBLIC.** Everything you commit, push, or say in a PR is visible to the world forever. These protocols exist because ADHD = I will forget this at 2am.

Read this at the start of every session. That's the only rule.

---

## 🟢 Before every session (30 seconds)

1. Say out loud: **"This is a public repo."**
2. Run **`bun run session:start`** — shows:
   - Current branch (am I on `main`? should almost always be no)
   - Last 3 commits (did I leave something broken?)
   - Open PRs (is there WIP waiting for me?)
   - SLO glance (is prod healthy?)
3. Glance at `git status`. Is the tree dirty? Why?

## 🟡 Before every commit

- Run `git diff --staged` and **actually read it**
- Ask: "Would I be okay with a stranger reading this?"
- Check for:
  - Phone numbers / home address / kid's real name
  - API keys / tokens / passwords
  - Commented-out scratch code
  - Personal opinions about other people/projects
  - "test test test" placeholder content

The git hook will show you a **🌍 PUBLIC REPO** banner. Don't dismiss it on autopilot — read the file list it prints.

## 🟠 Before every push

- Run **`bun run guard`** (the Sloppy Guard) locally
- Run `git log --oneline @{u}..HEAD` and **read every commit subject**
- If pushing to `main`: **STOP**. You should be on a branch. Close the terminal. Start over.

The pre-push hook will enforce a 3-second cooling-off pause when the remote is this repo. That pause is not a bug. It's a feature.

## 🔴 Before every merge

- Open the PR on GitHub **in a browser** (not just `gh pr view` in terminal)
- Scroll through the diff top to bottom
- Read the PR title **out loud**
- Confirm: all CI checks **green** (not just "passing" — actually GREEN)
- **Wait 60 seconds** before clicking merge. The cooling-off.
- Never merge between 10 PM and 7 AM local time

## ⚪ After every session

- Run **`bun run session:end`** — shows:
  - What you worked on (commits this session)
  - WIP branches that need attention
  - Draft PRs that should be promoted or closed
  - Anything uncommitted
- Commit or stash anything uncommitted. Don't leave the tree dirty across sessions.
- Write down in your external journal: **what's the next thing you should do**. Future-you will forget. This is the handoff.

---

## 🚨 Emergency recovery

If you just pushed something you shouldn't have:

1. **DON'T panic-force-push.**
2. **DON'T `git reset --hard` on main.**
3. `git reflog` → find the SHA before the mistake.
4. Open a **new PR** that reverts the mistake. Merge it like any other PR.
5. If secrets leaked: **rotate the secret first**, then deal with the commit. The commit is permanent once pushed — even force-pushes don't fully purge from the refs cache for hours. Assume it leaked.

## 🚧 Red flags (stop and think)

Any of these = STOP. Close the laptop. Come back tomorrow.

- ⏰ It's between 10 PM and 7 AM local time
- 🍽️ You're in hyperfocus mode and haven't eaten
- 😤 You just finished a frustrating debugging session
- 💣 You're about to force-push
- 📦 The PR has 20+ files changed (break it up)
- 🔁 You're saying "just this one more thing"
- 🧪 You're disabling a CI check "temporarily"
- 🔥 You're using `--force`, `--no-verify`, or `--hard` on anything

## 🔒 Hard rules — will not be bent

1. **Never `git push --force` to `main`.** Ever. Not even a little. If you need to fix something on main, open a PR that fixes it.
2. **Never `git push --no-verify`.** The hooks are there for a reason. If a hook is wrong, fix the hook.
3. **Never disable a required CI check to merge.** If the check is wrong, fix it in a separate PR first.
4. **Never commit anything tagged `private/*` or in `scratch/`** — the `.gitignore` should handle this, but double-check.
5. **Never ship a mission with a kid's real name in it.** Period.

## 🎛️ The automation

The following are wired up automatically:

| Trigger | What it does |
|---|---|
| `cd` into this repo (with direnv) | Prints 🌍 PUBLIC REPO banner in the terminal |
| `git commit` | Pre-commit hook runs lint-staged + quick debug-statement scan |
| `git commit -m ...` | commit-msg hook enforces Conventional Commits |
| `git push` | Pre-push hook shows 🌍 PUBLIC REPO banner + runs full Sloppy Guard |
| `git push` between 10 PM and 7 AM | Extra warning + extended cooling-off |
| Opening a PR | Template with SOUL.md checklist pre-filled |
| Merging a PR | Branch protection requires all CI green |

## 📋 The one-minute session-start checklist

Print this and tape it to your monitor if that helps:

```
[ ] I am on a branch (not main)
[ ] I know what I'm about to do
[ ] I have PROTOCOLS.md open in a tab
[ ] I have at least 30 min uninterrupted
[ ] It is between 7 AM and 10 PM
[ ] I've eaten something in the last 4 hours
[ ] I've run `bun run session:start`
```

If any of these is NO, pause. Address it first. Or close the laptop.

---

## Why these protocols exist

Per SOUL.md: the product is for kids; the public face of the project is for adults deciding whether to trust you with their kid's learning time. Every sloppy thing in this repo — a broken commit, a typo in the README, a leaked personal detail — costs trust that's hard to rebuild.

ADHD is not a weakness. It's a wiring. These protocols are the scaffolding that lets the wiring ship great work without regret commits at 2 AM.

**One more rule:** if a protocol above consistently gets skipped because it's too slow or annoying, **the protocol is wrong, not you**. Open a PR to fix the protocol. The goal is to make the right thing easy and the wrong thing loud — not to make work harder.
