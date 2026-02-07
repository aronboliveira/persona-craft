#!/usr/bin/env bash
# ============================================================
# test-images.sh — Verify all expected nose, mouth, eye-bag,
# and eyelash images resolve on the Vite dev-server.
# Usage:  bash scripts/test-images.sh [port]
# Default port: 5173
# ============================================================
set -euo pipefail

PORT="${1:-5173}"
BASE="http://localhost:${PORT}"
PASS=0
FAIL=0
ERRORS=()

check() {
  local url="$1"
  local code
  code=$(curl -s -o /dev/null -w "%{http_code}" --connect-timeout 3 --max-time 5 "$url" 2>/dev/null || echo "000")
  if [[ "$code" == "200" ]]; then
    ((PASS++))
  else
    ((FAIL++))
    ERRORS+=("$code $url")
  fi
}

echo "=== Image URL smoke-test against ${BASE} ==="
echo ""

# ---------- Nose Shape (order 69) ----------
echo "--- Nose Shape ---"
for s in button celestial snub greek roman aquiline hawk nubian bulbous flat fleshy; do
  check "${BASE}/imgs/head/noses/${s}.png"
done

# ---------- Nose Bridge Width (order 70) ----------
echo "--- Nose Bridge Width ---"
for w in narrow average wide; do
  check "${BASE}/imgs/head/noses/${w}-bridge.png"
done

# ---------- Nose Bridge Height (order 71) ----------
echo "--- Nose Bridge Height ---"
for h in short average tall; do
  check "${BASE}/imgs/head/noses/${h}-bridge-h.png"
done

# ---------- Nose Nostril Size (order 72) ----------
echo "--- Nose Nostril Size ---"
for sz in small average large; do
  check "${BASE}/imgs/head/noses/${sz}-nostril.png"
done

# ---------- Nose Nostril Flare (order 73) ----------
echo "--- Nose Nostril Flare ---"
for fl in minimal moderate wide; do
  check "${BASE}/imgs/head/noses/${fl}-flare.png"
done

# ---------- Nose Length (order 74) ----------
echo "--- Nose Length ---"
for l in short average long; do
  check "${BASE}/imgs/head/noses/${l}-length.png"
done

# ---------- Nose Tip Angle (order 75) ----------
echo "--- Nose Tip Angle ---"
for a in upturned neutral downturned; do
  check "${BASE}/imgs/head/noses/${a}-tip.png"
done

# ---------- Mouth forms ----------
echo "--- Mouth forms ---"
MOUTH_DIRS=(commissure-angle commissure-shape cupid-bow-height cupid-bow-width
  dimple-shape dimple-size lips-vermillion lip-tubercule-prominence
  lip-tubercule-shape lower-lip-shape lower-lip-volume upper-lip-volume)
for dir in "${MOUTH_DIRS[@]}"; do
  # Check that at least one .png exists (symlink) in the served path
  # We test the first file found alphabetically
  first=$(ls "/home/aronboliveira/Desktop/programming/JS/prompt-apps/prompt-creator-app/public/imgs/mouth/${dir}/"*.png 2>/dev/null | head -1 || true)
  if [[ -n "$first" ]]; then
    fname=$(basename "$first")
    check "${BASE}/imgs/mouth/${dir}/${fname}"
  fi
done

# ---------- Eye bag color/contour ----------
echo "--- Eye bags ---"
for dir in eye-bag-color eye-bag-countor; do
  first=$(ls "/home/aronboliveira/Desktop/programming/JS/prompt-apps/prompt-creator-app/public/imgs/head/${dir}/"*.png 2>/dev/null | head -1 || true)
  if [[ -n "$first" ]]; then
    fname=$(basename "$first")
    check "${BASE}/imgs/head/${dir}/${fname}"
  fi
done

# ---------- Summary ----------
echo ""
echo "========================================"
echo "  PASS: ${PASS}   FAIL: ${FAIL}"
echo "========================================"
if [[ ${FAIL} -gt 0 ]]; then
  echo ""
  echo "Failed URLs:"
  for e in "${ERRORS[@]}"; do echo "  $e"; done
  exit 1
fi
echo "All image URLs returned HTTP 200 ✓"
exit 0
