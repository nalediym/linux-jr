#!/usr/bin/env bash
# scripts/session-end.sh — ADHD-safe session closer.
# Run via `bun run session:end` at the end of each working session.

set -u

RED=$(printf '\033[0;31m')
YELLOW=$(printf '\033[0;33m')
GREEN=$(printf '\033[0;32m')
CYAN=$(printf '\033[0;36m')
BOLD=$(printf '\033[1m')
DIM=$(printf '\033[2m')
RESET=$(printf '\033[0m')

printf "\n${BOLD}${CYAN}╔════════════════════════════════════════════════╗${RESET}\n"
printf "${BOLD}${CYAN}║  🌙 linux-jr — session end                       ║${RESET}\n"
printf "${BOLD}${CYAN}╚════════════════════════════════════════════════╝${RESET}\n\n"

# Uncommitted work
STATUS=$(git status --short 2>/dev/null)
if [ -n "$STATUS" ]; then
  printf "${BOLD}${YELLOW}⚠  Uncommitted changes:${RESET}\n"
  printf "%s\n" "$STATUS" | head -15 | sed 's/^/  /'
  printf "\n  ${YELLOW}Commit these, or stash with: git stash push -u -m \"WIP $(date +%Y-%m-%d)\"${RESET}\n"
else
  printf "${GREEN}✓${RESET} working tree clean\n"
fi

# Commits this session (last 2 hours as a proxy)
printf "\n${BOLD}Commits in the last 2 hours:${RESET}\n"
RECENT=$(git log --oneline --since='2 hours ago' 2>/dev/null)
if [ -z "$RECENT" ]; then
  printf "  ${DIM}none${RESET}\n"
else
  printf "%s\n" "$RECENT" | sed 's/^/  /'
fi

# Unpushed commits
BRANCH=$(git branch --show-current 2>/dev/null || echo "")
if [ -n "$BRANCH" ] && git rev-parse --verify "origin/$BRANCH" >/dev/null 2>&1; then
  UNPUSHED=$(git log --oneline "origin/$BRANCH..HEAD" 2>/dev/null)
  if [ -n "$UNPUSHED" ]; then
    printf "\n${BOLD}${YELLOW}Unpushed commits on $BRANCH:${RESET}\n"
    printf "%s\n" "$UNPUSHED" | sed 's/^/  /'
    printf "\n  ${YELLOW}Push with: git push${RESET}\n"
  fi
fi

# Open draft PRs
if command -v gh >/dev/null 2>&1; then
  DRAFTS=$(gh pr list --author '@me' --draft --json number,title,headRefName -q '.[] | "  #\(.number) \(.headRefName) — \(.title)"' 2>/dev/null || echo "")
  if [ -n "$DRAFTS" ]; then
    printf "\n${BOLD}Draft PRs you have open:${RESET}\n"
    printf "%s\n" "$DRAFTS"
    printf "\n  ${DIM}Promote to ready when done, or close if abandoned${RESET}\n"
  fi
fi

# The handoff prompt
printf "\n${BOLD}${CYAN}─── the handoff ────────────────────────────────${RESET}\n"
printf "${BOLD}Write down for future-you:${RESET}\n"
printf "  ${DIM}1.${RESET} What did I ship this session?\n"
printf "  ${DIM}2.${RESET} What's the NEXT concrete thing to do?\n"
printf "  ${DIM}3.${RESET} Any blockers / decisions waiting on me?\n"
printf "\n  ${DIM}(Future-you will forget. External memory > internal.)${RESET}\n"

printf "\n${BOLD}${GREEN}Good session. Close the laptop.${RESET}\n\n"
