#!/bin/bash
# Downloader - 再起動
BASE="$(cd "$(dirname "$0")" && pwd)"
echo "Restarting Downloader..."
"$BASE/stop.sh"
sleep 1
exec "$BASE/start.sh" "$@"
