# Portability audit

Date: 2026-09-27

## Method

The tracked repository was exported with `git archive` into a new empty temporary directory. No existing `node_modules`, Python virtual environment, local database, or untracked file was copied.

From that clean export:

1. `npm ci`
2. `npm run lint`
3. `npm run typecheck`
4. `npm run build`
5. `python -m venv .venv`
6. `pip install -r requirements.txt`
7. `pytest -q`

## Result

- Frontend dependency restoration: PASS
- ESLint: PASS
- TypeScript strict check: PASS
- Vite production build: PASS
- Backend dependency restoration: PASS
- Backend tests: **9 passed**
- Secret/private-data scan of tracked files: PASS

The repository is portable to a clean Windows, macOS, or Linux development environment with Node.js 20+, Python 3.11+, and Git. Ollama is optional; `DEMO_MODE=true` preserves the complete deterministic hackathon workflow.

## Known prototype boundaries

- SQLite is local and intentionally not included in Git.
- Browser speech support varies; text fallback is complete.
- The browser Focus Shield cannot filter OS calls/notifications.
- Course/certificate metadata needs periodic verification before production use.
- Production use still needs authentication, encrypted storage, formal retention rules, and stronger document-layout recovery.

