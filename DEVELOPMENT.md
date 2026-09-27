# Development guide

## Requirements

- Node.js 20+
- Python 3.11+
- Git
- Optional: Ollama on `localhost:11434`

## macOS/Linux

```bash
cp .env.example .env
python3 -m venv backend/.venv
backend/.venv/bin/pip install -r backend/requirements.txt
cd frontend && npm install && cd ..
./scripts/start.sh
```

## Windows

Use `scripts/setup.ps1` once, then `scripts/start.ps1`. The start script opens separate PowerShell processes for API and UI.

## Environment

`DEMO_MODE=true` is the no-network deterministic mode. Set `DEMO_MODE=false` only after providing a reachable local Ollama model. `VITE_API_URL` configures the local browser-to-API address.

## Adding a feature

1. Add or update a typed domain model.
2. Implement backend logic as a service and test it without HTTP.
3. Add the API transport only if the UI needs it.
4. Build the UI state, loading, empty, success, and error states.
5. Update `AGENTS.md` if reality/simulation boundaries change.
6. Run backend tests, lint, typecheck, and production build.

## Portable repository rule

Do not depend on ChatGPT Work paths, hidden credentials, or generated local databases. A clean clone must be enough to reproduce the demo using committed fixtures and `.env.example`.

