#!/bin/bash
# Downloader - 全サービス停止
echo "Stopping all Downloader services..."
pkill -f "bun.*hianime" 2>/dev/null
pkill -f "node.*hianime" 2>/dev/null
pkill -f "node.*anime-vault" 2>/dev/null
pkill -f "python3.*server.py" 2>/dev/null
pkill -f "python3.*app.py" 2>/dev/null
pkill -f "vite.*5173" 2>/dev/null
sleep 0.5
echo "All services stopped."
