#!/bin/bash
# Downloader - 全サービス一括起動
cd "$(dirname "$0")"

echo "Starting hianime-API (:3030)..."
cd hianime-API && bun run dev &
cd ..

echo "Starting anime-vault server (:4040)..."
cd anime-vault/server && node index.js &
cd ../..

echo "Starting server.py (FastAPI :8765)..."
python3 server.py &

echo "Starting app.py (Flask :8080)..."
python3 app.py &

echo ""
echo "╔══════════════════════════════════════════════╗"
echo "║   All services started                       ║"
echo "║   Flask Gateway:  http://localhost:8080       ║"
echo "║   YTDL Server:    http://localhost:8765       ║"
echo "║   AnimeVault:     http://localhost:4040       ║"
echo "║   hianime-API:    http://localhost:3030       ║"
echo "╚══════════════════════════════════════════════╝"

wait
