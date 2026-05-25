#!/bin/bash

which convert >/dev/null 2>&1 || { echo >&2 "ERROR: convert (from imagemagick) is required. Aborting."; exit 1; }
which convert >/dev/null 2>&1 || { echo >&2 "ERROR: mogrify (from imagemagick) is required. Aborting."; exit 1; }

SCRIPT_DIR="$(dirname "$(readlink -f "$0")")"
RES_DIR="$SCRIPT_DIR/../res"
THEME_DIR="$SCRIPT_DIR/../theme/win-spinner"

# Extract SVG frames.
if [[ ! -d "$RES_DIR/throbber" ]]; then
  tar -xvzf "$RES_DIR/throbber.tar.gz" -C "$RES_DIR"
fi
# Compress using
# GZIP=-9
# tar cvzf throbber.tar.gz ./throbber

for variant in "w8" "w10x"; do
  echo "Rendering $variant"

  variant_res_dir="$RES_DIR/throbber/$variant"
  variant_res_theme_dir="$THEME_DIR/res/throbber/$variant"

  # Cleanup from earlier run.
  if [[ -f "$variant_res_theme_dir/spinner-0.png" ]]; then
    find "$variant_res_theme_dir/" -name "spinner-*" | xargs rm -r
  fi

  count=0
  for svg in "$variant_res_dir-white"/*; do
    rsvg-convert -a -w 128 -o "$variant_res_theme_dir/$(printf "spinner-%d.png" $count)" "$svg"
    ((count++))
  done

  # Then compress all images.
  "$SCRIPT_DIR/compress_png.sh" "$variant_res_theme_dir/spinner-*.png"
done




# convert -background none -resize 128 res/throbber/w8_white/_a_000_UniE052_SegoeBoot-Semilight.svg test.png
# convert -background none -resize 128 res/throbber/w8_white/_a_000_UniE052_SegoeBoot-Semilight.svg test.png
