#!/bin/bash

SCRIPT_DIR="$(dirname "$(readlink -f "$0")")"
source "$SCRIPT_DIR/vars.env"
DISTRO_ID=`lsb_release -i | cut -f 2- | tr '[:upper:]' '[:lower:]'`

[[ ! -r "$PLY_SCRIPT" ]] && { echo >&2 "ERROR: Output file $PLY_SCRIPT not found."; exit 1; }

# ******************************************************************************
# Add logos.

# BGRT image.
SOURCE_BGRT="/sys/firmware/acpi/bgrt/image"
TARGET_BGRT="$THEME_DIR/res/gfx/bgrt.png"

# Distro or generic logo.
SOURCE_BGRT_FALLBACK="$RES_DIR/gfx/logo/$DISTRO_ID.svg"
TARGET_BGRT_FALLBACK="$THEME_DIR/res/gfx/logo.png"
# If we also don't have a distro logo, fall back on a generic Linux logo.
[[ ! -f "$SOURCE_BGRT_FALLBACK" ]] && { SOURCE_BGRT_FALLBACK="$RES_DIR/gfx/logo/linux.svg"; }

# Cleanup from previous run.
"$SCRIPT_DIR/cleanup-file.sh" "$TARGET_BGRT"
"$SCRIPT_DIR/cleanup-file.sh" "$TARGET_BGRT_FALLBACK"

# Render and inject BGRT into script if supported.
if [[ -r "$SOURCE_BGRT" ]]; then
  # Copy and convert BGRT image to png.
  convert "$SOURCE_BGRT" "$TARGET_BGRT"
  "$SCRIPT_DIR/compress-png.sh" "$TARGET_BGRT"
  # Copy over absolute offsets.
  sed -i -E "s/BGRT_X_OFFSET=[0-9]+/BGRT_X_OFFSET=$(</sys/firmware/acpi/bgrt/xoffset)/g" "$PLY_SCRIPT"
  sed -i -E "s/BGRT_Y_OFFSET=[0-9]+/BGRT_Y_OFFSET=$(</sys/firmware/acpi/bgrt/yoffset)/g" "$PLY_SCRIPT"
else
  # Fall back logo.
  echo "INFO: BGRT image at $SOURCE_BGRT cannot be read, falling back on a generic logo.";
fi
# Render.
rsvg-convert -a -w 512 -o "$TARGET_BGRT_FALLBACK" "$SOURCE_BGRT_FALLBACK"
"$SCRIPT_DIR/compress-png.sh" "$TARGET_BGRT_FALLBACK"

# Inject watermark if there is a distro-specific one.
SOURCE_WATERMARK="$RES_DIR/gfx/watermark/$DISTRO_ID.svg"
TARGET_WATERMARK="$THEME_DIR/res/gfx/watermark.png"
"$SCRIPT_DIR/cleanup-file.sh" "$TARGET_WATERMARK"
if [[ -f "$SOURCE_WATERMARK" ]]; then
  rsvg-convert -a -h 512 -o "$TARGET_WATERMARK" "$SOURCE_WATERMARK"
  "$SCRIPT_DIR/compress-png.sh" "$TARGET_WATERMARK"
fi

exit 0
