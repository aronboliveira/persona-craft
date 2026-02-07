#!/bin/bash
# Check which form image paths exist

echo "Checking /imgs paths in forms..."

# Array of paths to check
paths=(
  "/imgs/creations/full-body/ptr/fm"
  "/imgs/hair/tidiness"
  "/imgs/hair/bang/density"
  "/imgs/hair/bang/shape"
  "/imgs/hair/bang/length"
  "/imgs/hair/texture"
  "/imgs/head/eyebrow-arch-angle"
  "/imgs/head/eyebrow-arch-distance"
  "/imgs/head/eyebrow-arch-height"
  "/imgs/head/eyebrow-density"
  "/imgs/head/eyebrow-growth-direction"
  "/imgs/head/eyebrow-growth-pattern"
  "/imgs/head/eyebrow-height"
  "/imgs/head/eyebrow-length"
  "/imgs/head/eyebrow-slit-angle"
  "/imgs/head/eyebrow-slit-number"
  "/imgs/head/eyebrow-thickness"
  "/imgs/head/eyebrow-trimming"
  "/imgs/head/eyebrow-unibrow"
  "/imgs/head/eye-bag-color"
  "/imgs/head/eye-bag-countor"
  "/imgs/head/eye-color"
  "/imgs/head/eye-depth"
  "/imgs/head/eye-fissure"
  "/imgs/head/eye-hood"
  "/imgs/head/eye-spacing"
  "/imgs/head/eye-tilt"
  "/imgs/head/eyeball-size"
  "/imgs/head/eyelashes-curl"
  "/imgs/head/eyelashes-density"
  "/imgs/head/eyelashes-length"
  "/imgs/head/eyelid-crease-height"
  "/imgs/head/eyelid-crease-number"
  "/imgs/head/eyelid-epicanthic-fold-class"
  "/imgs/head/eyelid-epicanthic-fold-extension"
  "/imgs/head/forehead/hairline/height"
  "/imgs/head/forehead/hairline/recession"
  "/imgs/head/forehead/hairline/shape"
  "/imgs/head/forehead/height"
  "/imgs/head/iris-size"
  "/imgs/head/pupil-pattern"
  "/imgs/head/pupil-size"
  "/imgs/mouth/commissure-angle"
  "/imgs/mouth/commissure-shape"
  "/imgs/mouth/cupid-bow-height"
  "/imgs/mouth/cupid-bow-width"
  "/imgs/mouth/dimple-shape"
  "/imgs/mouth/dimple-size"
  "/imgs/mouth/lip-tubercule-prominence"
  "/imgs/mouth/lip-tubercule-shape"
  "/imgs/mouth/lips-vermillion"
  "/imgs/mouth/lower-lip-shape"
  "/imgs/mouth/lower-lip-volume"
  "/imgs/mouth/upper-lip-volume"
)

for path in "${paths[@]}"; do
  full_path="public${path}"
  if [ -d "$full_path" ]; then
    echo "✓ EXISTS: $full_path"
  else
    echo "✗ MISSING: $full_path"
    # Check in .drive
    search_term=$(basename "$path")
    drive_results=$(find .drive -type d -iname "*${search_term}*" 2>/dev/null | head -3)
    if [ -n "$drive_results" ]; then
      echo "  → Found in .drive:"
      echo "$drive_results" | sed 's/^/    /'
    fi
  fi
done
