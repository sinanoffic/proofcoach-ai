#!/usr/bin/env bash
set -euo pipefail
ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
test -f "$ROOT_DIR/.env" || cp "$ROOT_DIR/.env.example" "$ROOT_DIR/.env"
python3 -m venv "$ROOT_DIR/backend/.venv"
"$ROOT_DIR/backend/.venv/bin/pip" install -r "$ROOT_DIR/backend/requirements.txt"
(cd "$ROOT_DIR/frontend" && npm install)

