#!/usr/bin/env bash
set -euo pipefail
ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
trap 'kill 0' EXIT
(cd "$ROOT_DIR/backend" && .venv/bin/uvicorn app.main:app --reload --port 8000) &
(cd "$ROOT_DIR/frontend" && npm run dev) &
wait

