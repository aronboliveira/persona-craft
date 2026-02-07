#!/bin/bash
echo "=== EYEBROW IMAGE MAPPING ==="
for dir in arc density growth height length slit texture thickness trimming uni; do
  echo ""
  echo "[$dir]"
  if [ -d ".drive/closeup/eyes/sketch/brow/$dir" ]; then
    find ".drive/closeup/eyes/sketch/brow/$dir" -type f -name "*.png" | head -5
  fi
done
