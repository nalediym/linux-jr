#!/usr/bin/env bash
# scripts/sloppy-guard.sh
#
# The anti-sloppiness catcher. Runs a battery of checks to make sure
# a PR is ready to ship — enforces SOUL.md rules and catches dumb mistakes
# before they reach prod.
#
# Run locally before push:  bun run guard
# Runs automatically in CI on every PR to main (.github/workflows/sloppy-guard.yml)
#
# Three tiers:
#   HARD    → fails, blocks merge
#   SOFT    → warns, doesn't block
#   INSIGHT → informational stats
#
# Add new checks as you discover new classes of sloppiness. The guard
# grows with the project.

set -u

# ─── style ────────────────────────────────────────────────────────────
RED=$(printf '\033[0;31m')
YELLOW=$(printf '\033[0;33m')
GREEN=$(printf '\033[0;32m')
CYAN=$(printf '\033[0;36m')
DIM=$(printf '\033[2m')
BOLD=$(printf '\033[1m')
RESET=$(printf '\033[0m')

HARD_FAILURES=0
SOFT_WARNINGS=0

pass()   { printf "  ${GREEN}✓${RESET} %s\n" "$1"; }
warn()   { printf "  ${YELLOW}⚠${RESET} %s\n" "$1"; SOFT_WARNINGS=$((SOFT_WARNINGS + 1)); }
fail()   { printf "  ${RED}✗${RESET} %s\n" "$1"; HARD_FAILURES=$((HARD_FAILURES + 1)); }
info()   { printf "  ${DIM}·${RESET} ${DIM}%s${RESET}\n" "$1"; }
header() { printf "\n${BOLD}${CYAN}▸ %s${RESET}\n" "$1"; }

# ─── HARD checks ──────────────────────────────────────────────────────

header "HARD: Lint"
if bun run lint >/dev/null 2>&1; then
  pass "bun run lint is clean"
else
  fail "bun run lint failed — run it locally to see details"
fi

header "HARD: Build"
if bun run build >/dev/null 2>&1; then
  pass "bun run build succeeds"
else
  fail "bun run build failed"
fi

header "HARD: Required files at repo root"
for f in SOUL.md LICENSE README.md CLAUDE.md; do
  if [ -f "$f" ]; then
    pass "$f present"
  else
    fail "$f missing at repo root"
  fi
done

header "HARD: README has required sections"
for section in "Live demo" "Why I built it" "Stack" "License"; do
  if grep -q "$section" README.md 2>/dev/null; then
    pass "README contains '$section'"
  else
    fail "README missing section: '$section'"
  fi
done

header "HARD: No debug statements in src/"
# Allow console.error (legitimate), block console.log/debug/warn/info and debugger
if git grep -nE 'console\.(log|debug|info|warn)\(|^[[:space:]]*debugger;?' -- 'src/**/*.js' 'src/**/*.jsx' 2>/dev/null; then
  fail "Found debug statements in src/ — remove before shipping"
else
  pass "no stray console.log/debugger in src/"
fi

header "HARD: No obvious hardcoded secrets"
# Very specific patterns to avoid false positives on mission content
SECRET_PATTERNS='sk-[a-zA-Z0-9]{20,}|AKIA[A-Z0-9]{16}|ghp_[a-zA-Z0-9]{36}|xoxb-[a-zA-Z0-9-]{40,}|-----BEGIN (RSA |OPENSSH )?PRIVATE KEY-----'
if git grep -nE "$SECRET_PATTERNS" -- ':!kb/' ':!node_modules/' 2>/dev/null; then
  fail "Possible hardcoded secret found"
else
  pass "no API-key-shaped strings"
fi

# ─── SOFT checks (warn, don't block) ──────────────────────────────────

header "SOFT: Orphan TODOs / FIXMEs"
# TODOs without a ticket reference like TODO(#42) or TODO(NJ-12)
ORPHAN_TODOS=$(git grep -nE '(TODO|FIXME|XXX|HACK)([^(]|$)' \
  -- 'src/**/*.js' 'src/**/*.jsx' 'src/**/*.md' \
     'scripts/**/*.sh' 'scripts/**/*.js' \
     '*.md' \
  ':!scripts/sloppy-guard.sh' 2>/dev/null | grep -v 'TODO(' || true)
if [ -n "$ORPHAN_TODOS" ]; then
  warn "orphan TODO/FIXME without ticket reference"
  printf "%s\n" "$ORPHAN_TODOS" | head -5 | sed 's/^/      /'
else
  pass "no orphan TODOs"
fi

header "SOFT: SOUL.md banned words in user-facing strings"
# Check for 'wrong', 'failed', 'stupid', 'error' (as user-facing, not as code identifiers)
# Heuristic: look for these words inside quoted strings in Terminal.jsx + mission files
BANNED_HITS=$(git grep -nEi "['\"].*\\b(wrong|stupid|bad user|dumb)\\b.*['\"]" \
  -- 'src/**/*.jsx' 'src/data/missions/**/*.js' 2>/dev/null || true)
if [ -n "$BANNED_HITS" ]; then
  warn "SOUL.md banned words in what look like user-visible strings:"
  printf "%s\n" "$BANNED_HITS" | head -5 | sed 's/^/      /'
else
  pass "no banned words in user copy"
fi

header "SOFT: Dev-only code left in"
# Scan for .only in test files, xit, fdescribe, etc.
if git grep -nE '\.(only|skip)\(|^[[:space:]]*fit\(|^[[:space:]]*xit\(' \
  -- 'src/**/*.js' 'src/**/*.jsx' 2>/dev/null; then
  warn "test.only / describe.skip / fit / xit found — remove before merging"
else
  pass "no dev-only test markers"
fi

# ─── INSIGHT checks (informational) ────────────────────────────────────

header "INSIGHT: Bundle size"
if [ -d dist/assets ]; then
  TOTAL=$(du -sh dist 2>/dev/null | cut -f1 || echo "?")
  # `du -k` is POSIX and portable (macOS + linux). -cb works only on GNU coreutils.
  JS_KB=$(find dist/assets -name "*.js" -type f -exec du -k {} + 2>/dev/null | awk '{sum+=$1} END {print sum+0}')
  CSS_KB=$(find dist/assets -name "*.css" -type f -exec du -k {} + 2>/dev/null | awk '{sum+=$1} END {print sum+0}')
  info "dist/ total: $TOTAL"
  info "JS: ${JS_KB} kB"
  info "CSS: ${CSS_KB} kB"
fi

header "INSIGHT: Changed files vs main"
if git rev-parse --verify origin/main >/dev/null 2>&1; then
  CHANGED=$(git diff --name-only origin/main...HEAD 2>/dev/null | wc -l | xargs)
  info "$CHANGED file(s) changed vs origin/main"
fi

# ─── verdict ──────────────────────────────────────────────────────────

printf "\n${BOLD}"
if [ $HARD_FAILURES -eq 0 ] && [ $SOFT_WARNINGS -eq 0 ]; then
  printf "${GREEN}✓ sloppy guard clean — ship it.${RESET}\n"
  exit 0
elif [ $HARD_FAILURES -eq 0 ]; then
  printf "${YELLOW}⚠ ${SOFT_WARNINGS} soft warning(s) — review but not blocking.${RESET}\n"
  exit 0
else
  printf "${RED}✗ ${HARD_FAILURES} hard failure(s), ${SOFT_WARNINGS} soft warning(s) — fix before merging.${RESET}\n"
  exit 1
fi
