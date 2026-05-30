#!/bin/bash

if [ $2 ]; then
  cmd_description=" (from $2)"
fi
which $1 >/dev/null 2>&1 || { echo >&2 "ERROR: $1$cmd_description is required. Aborting."; exit 1; }
exit 0
