#!/bin/bash

SCRIPT_DIR="$(dirname "$(readlink -f "$0")")"
source "$SCRIPT_DIR/vars.env"

[[ ! -r "$JSC_SCRIPT" ]] && { echo >&2 "ERROR: Source file $JSC_SCRIPT not found."; exit 1; }

# ******************************************************************************
# Transform JavaScript to Plymouth script syntax flavour.

# Cleanup from previous run.
"$SCRIPT_DIR/cleanup-file.sh" "$PLY_SCRIPT"
cp "$JSC_SCRIPT" "$PLY_SCRIPT"
if [ ! -f "$PLY_SCRIPT" ]; then
  echo >&2 "ERROR: Failed to create $PLY_SCRIPT"
  exit 1
fi

# Remove/ignore lines marked by `//!!` (first pass).
sed -i "/.*\/\/!!.*/d" "$PLY_SCRIPT"

# Transform empty imports as file includes.
while IFS= read -r line || [ -n "$line" ]; do
  # Check if line matches the format: `import {} from '...';`
  if [[ ! "$line" =~ ^import[[:space:]]+\{\}[[:space:]]+from[[:space:]]+[\'\"]([^\'\"]+)[\'\"]\; ]]; then
    # Pass normal lines through untouched.
    echo "$line"
    continue
  fi
  # Extract the relative path and resolve it.
  rel_include_path="${BASH_REMATCH[1]}"
  abs_include_path=$(realpath -s "$SOURCE_DIR/$rel_include_path")
  # Inject its content if the file exists, otherwise throw an error.
  if [ ! -f "$abs_include_path" ]; then
    echo >&2 "ERROR: File not found while trying to include: $abs_include_path"
    exit 1
  fi
  cat "$abs_include_path"
done < "$PLY_SCRIPT" > "$PLY_SCRIPT.tmp"
# Overwrite the target file with the fully inlined content.
mv "$PLY_SCRIPT.tmp" "$PLY_SCRIPT"

# Remove/ignore lines marked by `//!!` (final pass).
sed -i "/.*\/\/!!.*/d" "$PLY_SCRIPT"
# Remove lines with object declarations.
sed -i "/.*\= *{ *}.*/d" "$PLY_SCRIPT"
# Replace 'function' with 'fun'.
sed -i "s/function (/fun (/g" "$PLY_SCRIPT"
# Remove 'let'.
sed -i "s/let //g" "$PLY_SCRIPT"
# Transform booleans.
sed -i "s/true/1/g" "$PLY_SCRIPT"
sed -i "s/false/0/g" "$PLY_SCRIPT"
# Remove 'export'.
sed -i "s/export //g" "$PLY_SCRIPT"
# Remove singleline imports.
sed -i "/import {.*} from .*/d" "$PLY_SCRIPT"
# Remove multiline imports.
sed -i "/import {$/,/} from .*/d" "$PLY_SCRIPT"
# Replace hacks for code completion.
sed -i "s/_Image/Image/g" "$PLY_SCRIPT"
sed -i "s/_Sprite/Sprite/g" "$PLY_SCRIPT"

exit 0
