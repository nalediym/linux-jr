#!/usr/bin/env bash
# scripts/session-start.sh — ADHD-safe session opener.
# Run via `bun run session:start` before each working session.

set -u

RED=$(printf '\033[0;31m')
YELLOW=$(printf '\033[0;33m')
GREEN=$(printf '\033[0;32m')
CYAN=$(printf '\033[0;36m')
BOLD=$(printf '\033[1m')
DIM=$(printf '\033[2m')
RESET=$(printf '\033[0m')

printf "\n${BOLD}${CYAN}╔════════════════════════════════════════════════╗${RESET}\n"
printf "${BOLD}${CYAN}║  🌍 linux-jr — PUBLIC REPO                      ║${RESET}\n"
printf "${BOLD}${CYAN}║     Read PROTOCOLS.md before committing.        ║${RESET}\n"
printf "${BOLD}${CYAN}╚════════════════════════════════════════════════╝${RESET}\n\n"

# Current branch
BRANCH=$(git branch --show-current 2>/dev/null || echo "(detached)")
if [ "$BRANCH" = "main" ]; then
  printf "${BOLD}${RED}Branch:${RESET} ${RED}$BRANCH  ← you should almost always be on a feature branch${RESET}\n"
else
  printf "${BOLD}Branch:${RESET} ${GREEN}$BRANCH${RESET}\n"
fi

# Time-of-day warning
HOUR=$(date +%H)
if [ "$HOUR" -lt 7 ] || [ "$HOUR" -ge 22 ]; then
  printf "${BOLD}${YELLOW}⏰ It's $HOUR:00 — outside 7 AM–10 PM window. Consider closing the laptop.${RESET}\n"
fi

# Git state
printf "\n${BOLD}Working tree:${RESET}\n"
STATUS=$(git status --short 2>/dev/null)
if [ -z "$STATUS" ]; then
  printf "  ${GREEN}clean${RESET}\n"
else
  printf "%s\n" "$STATUS" | head -10 | sed 's/^/  /'
  LINES=$(printf "%s\n" "$STATUS" | wc -l | xargs)
  if [ "$LINES" -gt 10 ]; then
    printf "  ${DIM}... +$((LINES - 10)) more${RESET}\n"
  fi
fi

# Last 3 commits
printf "\n${BOLD}Last 3 commits on this branch:${RESET}\n"
git log --oneline -3 2>/dev/null | sed 's/^/  /'

# Distance from main
if [ "$BRANCH" != "main" ] && git rev-parse --verify origin/main >/dev/null 2>&1; then
  AHEAD=$(git rev-list --count origin/main..HEAD 2>/dev/null || echo 0)
  BEHIND=$(git rev-list --count HEAD..origin/main 2>/dev/null || echo 0)
  printf "\n${BOLD}vs origin/main:${RESET} ${GREEN}$AHEAD ahead${RESET}, ${YELLOW}$BEHIND behind${RESET}\n"
fi

# Open PRs (if gh is available)
if command -v gh >/dev/null 2>&1; then
  printf "\n${BOLD}Your open PRs:${RESET}\n"
  OPEN_PRS=$(gh pr list --author '@me' --state open --json number,title,isDraft,headRefName -q '.[] | "  #\(.number) [\(if .isDraft then "draft" else "ready" end)] \(.headRefName) — \(.title)"' 2>/dev/null || echo "")
  if [ -z "$OPEN_PRS" ]; then
    printf "  ${DIM}none${RESET}\n"
  else
    printf "%s\n" "$OPEN_PRS"
  fi
fi

# The checklist
printf "\n${BOLD}${CYAN}─── the checklist ───────────────────────────────${RESET}\n"
printf "  ${DIM}[ ]${RESET} I am on a branch (not main)\n"
printf "  ${DIM}[ ]${RESET} I know what I'm about to do\n"
printf "  ${DIM}[ ]${RESET} I have PROTOCOLS.md open in a tab\n"
printf "  ${DIM}[ ]${RESET} I have at least 30 min uninterrupted\n"
printf "  ${DIM}[ ]${RESET} It is between 7 AM and 10 PM\n"
printf "  ${DIM}[ ]${RESET} I've eaten something in the last 4 hours\n"
printf "\n${BOLD}Ready? Let's go.${RESET}\n\n"
