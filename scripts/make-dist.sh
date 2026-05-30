#!/bin/bash

SCRIPT_DIR="$(dirname "$(readlink -f "$0")")"
source "$SCRIPT_DIR/vars.env"

`"$SCRIPT_DIR/check-dependency.sh" sed` || { exit 1; }
`"$SCRIPT_DIR/check-dependency.sh" convert "imagemagick"` || { exit 1; }
`"$SCRIPT_DIR/check-dependency.sh" mogrify "imagemagick"` || { exit 1; }
`"$SCRIPT_DIR/check-dependency.sh" rsvg-convert "librsvg2-bin"` || { exit 1; }

"$SCRIPT_DIR/transpile-js.sh" || { exit 1; }
"$SCRIPT_DIR/render-logos.sh" || { exit 1; }
# "$SCRIPT_DIR/render-gfx.sh"   || { exit 1; }

echo "Success: File processed and saved to $PLY_SCRIPT"
