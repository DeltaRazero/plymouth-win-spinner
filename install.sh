#!/bin/bash

SCRIPT_DIR="$(dirname "$(readlink -f "$0")")"

"$SCRIPT_DIR/scripts/compile.sh"

# Check for sudo/root privileges.
if [[ $EUID -ne 0 ]]; then
  echo "ERROR: This script must be run with sudo rights."
  exit 1
fi
