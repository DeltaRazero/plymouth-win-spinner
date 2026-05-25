#!/bin/bash

which sed >/dev/null 2>&1 || { echo >&2 "ERROR: sed is required. Aborting."; exit 1; }
which convert >/dev/null 2>&1 || { echo >&2 "ERROR: convert (from imagemagick) is required. Aborting."; exit 1; }
which convert >/dev/null 2>&1 || { echo >&2 "ERROR: mogrify (from imagemagick) is required. Aborting."; exit 1; }

SCRIPT_DIR="$(dirname "$(readlink -f "$0")")"
RES_DIR="$SCRIPT_DIR/../res"
SOURCE_DIR="$SCRIPT_DIR/../src"
THEME_DIR="$SCRIPT_DIR/../theme/win-spinner"

DISTRO_ID=`lsb_release -i | cut -f 2- | tr '[:upper:]' '[:lower:]'`

# Create copy which we will use to inject some data in that we unfortunately
# cannot do in Plymouth scripting.
SOURCE_SCRIPT="$SOURCE_DIR/main.js"
TARGET_SCRIPT="$THEME_DIR/spinner.script"
# Cleanup from previous run.
[[ -f "$TARGET_SCRIPT" ]] && { rm "$TARGET_SCRIPT"; }
[[ ! -r "$SOURCE_SCRIPT" ]] && { echo >&2 "ERROR: Source file $SOURCE_SCRIPT not found."; exit 1; }
cp "$SOURCE_SCRIPT" "$TARGET_SCRIPT"

# Transform JavaScript to Plymouth scripting syntax flavour.
if [ -f "$TARGET_SCRIPT" ]; then
  # First remove all ignored lines, marked by `//!!`.
  sed -i "/.*\/\/!!.*/d" "$TARGET_SCRIPT"

  # Transform imports to file includes.
  # Read the file line by line (handles files safely even without a trailing newline).
  while IFS= read -r line || [ -n "$line" ]; do
    # Match lines containing: import {} from 'filename.ext';
    if [[ "$line" =~ ^import[[:space:]]+\{\}[[:space:]]+from[[:space:]]+[\'\"]([^\'\"]+)[\'\"]\; ]]; then
        # Extract the relative path captured by the regex parentheses.
        rel_path="${BASH_REMATCH[1]}"
        # Resolve the path.
        full_import_path=$(realpath -s "$SOURCE_DIR/$rel_path")
        # If the file exists, inject its content; otherwise, throw an error.
        if [ -f "$full_import_path" ]; then
          cat "$full_import_path"
        else
          echo "/* Preprocessor Error: File not found at $full_import_path */"
          echo "Error: Imported file not found: $full_import_path" >&2
        fi
    else
      # Pass normal lines through untouched.
      echo "$line"
    fi
  done < "$TARGET_SCRIPT" > "$TARGET_SCRIPT.tmp"
  # Overwrite the target file with the fully inlined content.
  mv "$TARGET_SCRIPT.tmp" "$TARGET_SCRIPT"

  # Then again remove all ignored lines, marked by `//!!`.
  sed -i "/.*\/\/!!.*/d" "$TARGET_SCRIPT"
  # Remove lines with object declarations.
  sed -i "/.*\= *{ *}.*/d" "$TARGET_SCRIPT"
  # Replace 'function' with 'fun'.
  sed -i "s/function/fun/g" "$TARGET_SCRIPT"
  # Replace hacks for code completion.
  # sed -i "s/_Image/Image/g" "$TARGET_SCRIPT"
  # sed -i "s/_Sprite/Sprite/g" "$TARGET_SCRIPT"
  # Remove 'let'.
  sed -i "s/let //g" "$TARGET_SCRIPT"
  # Transform booleans.
  sed -i "s/true/1/g" "$TARGET_SCRIPT"
  sed -i "s/false/0/g" "$TARGET_SCRIPT"
  # Remove 'export'.
  sed -i "s/export //g" "$TARGET_SCRIPT"
  # Remove singleline imports.
  sed -i "/import {.*} from .*/d" "$TARGET_SCRIPT"
  # Remove multiline imports.
  sed -i "/import {$/,/} from .*/d" "$TARGET_SCRIPT"
else
  echo "Error: Failed to create $TARGET_SCRIPT"
  exit 1
fi

# BGRT image support.
SOURCE_BGRT="/sys/firmware/acpi/bgrt/image"
TARGET_BGRT="$THEME_DIR/_bgrt/bgrt.png"
# Cleanup from previous run.
[[ -f "$TARGET_BGRT" ]] && { rm "$TARGET_BGRT"; }
# Render and inject into script if BGRT is supported.
if [[ ! -r "$SOURCE_BGRT" ]]; then
  echo "WARNING: $SOURCE_BGRT cannot be read, which is needed for BGRT support.";
else
  # Copy and convert BGRT image to png.
  convert "$SOURCE_BGRT" "$TARGET_BGRT"
  "$SCRIPT_DIR/compress_png.sh" "$TARGET_BGRT"
  # Copy over absolute offsets.
  sed -i "s/BGRT_X_OFFSET=0/BGRT_X_OFFSET=$(</sys/firmware/acpi/bgrt/xoffset)/g" "$TARGET_SCRIPT"
  sed -i "s/BGRT_Y_OFFSET=0/BGRT_Y_OFFSET=$(</sys/firmware/acpi/bgrt/yoffset)/g" "$TARGET_SCRIPT"
fi

# Fall back on distro logo or else a generic Linux logo.
source_bgrt_fallback="$RES_DIR/logo/$DISTRO_ID.svg"
[[ ! -f "$source_bgrt_fallback" ]] && { source_bgrt_fallback="$RES_DIR/logo/linux.svg"; }
# Render and inject.
TARGET_BGRT_FALLBACK="$THEME_DIR/res/fallback.png"
rsvg-convert -a -w 512 -o "$TARGET_BGRT_FALLBACK" "$source_bgrt_fallback"
"$SCRIPT_DIR/compress_png.sh" "$TARGET_BGRT_FALLBACK"

# Inject watermark if there is a distro-specific one.
SOURCE_WATERMARK="$RES_DIR/watermark/$DISTRO_ID.svg"
TARGET_WATERMARK="$THEME_DIR/res/watermark.png"
if [[ -f "$SOURCE_WATERMARK" ]]; then
  rsvg-convert -a -h 512 -o "$TARGET_WATERMARK" "$SOURCE_WATERMARK"
  "$SCRIPT_DIR/compress_png.sh" "$TARGET_WATERMARK"
fi

echo "Success: File processed and saved to $TARGET_SCRIPT"
