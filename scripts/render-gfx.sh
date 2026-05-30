#!/bin/bash

SCRIPT_DIR="$(dirname "$(readlink -f "$0")")"
source "$SCRIPT_DIR/vars.env"

# ******************************************************************************
# Render standard graphics.

for category in "ctn" "icon"; do

  category_res_dir="$RES_DIR/gfx/$category"
  category_res_theme_dir="$THEME_DIR/res/gfx/$category"
  mkdir -p "$category_res_theme_dir"

  case "$category" in
    ctn)
      size=512
      ;;
    icon)
      size=256
      ;;
  esac

  for svg in "$category_res_dir"/*; do
    png=`basename $svg`
    png="$category_res_theme_dir/${png%.*}.png"
    `"$SCRIPT_DIR/cleanup-file.sh" "$png"`
    rsvg-convert -a -w $size -o "$png" "$svg"
    "$SCRIPT_DIR/compress-png.sh" "$png"
  done
done

# ******************************************************************************
# Render throbbers.

# Extract SVG frames.
if [[ ! -d "$RES_DIR/gfx/throbber" ]]; then
  tar -xvzf "$RES_DIR/gfx/throbber.tar.gz" -C "$RES_DIR"
fi
# Compress using
# GZIP=-9
# tar cvzf throbber.tar.gz ./throbber

mkdir -p "$THEME_DIR/res/gfx/throbber"
for variant in "w8" "w10x"; do
  echo "Rendering throbber $variant"

  variant_res_dir="$RES_DIR/gfx/throbber/$variant"
  variant_res_theme_dir="$THEME_DIR/res/gfx/throbber/$variant"
  mkdir -p "$variant_res_theme_dir"

  count=0
  for svg in "$variant_res_dir-white"/*; do
    png="$variant_res_theme_dir/$(printf "spinner-%05d.png" $count)"
    `"$SCRIPT_DIR/cleanup-file.sh" "$png"`
    rsvg-convert -a -w 256 -o "$png" "$svg"
    ((count++))
  done

  # Generate spritesheet.
  throbber_sheet="$THEME_DIR/res/gfx/throbber/$variant.png"
  case "$variant" in
    w8)
      tile="18x7"
      ;;
    w10x)
      tile="15x8"
      ;;
  esac
  montage -tile "$tile" -geometry +0+0 -background transparent "$variant_res_theme_dir/*.png" "$throbber_sheet"
  "$SCRIPT_DIR/compress-png.sh" "$throbber_sheet"
  # Cleanup.
  rm -rf "$variant_res_theme_dir"
done

exit 0
