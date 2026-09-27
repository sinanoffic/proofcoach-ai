# API summary

- `GET /api/health` — service and demo-mode status
- `POST /api/demo/reset` — reset deterministic local state
- `GET /api/demo/state` — complete demo view model
- `POST /api/resume/parse` — PDF/DOCX parser analysis
- `POST /api/role/analyze` — target-role requirements
- `POST /api/evidence/graph` — evidence nodes, edges, coverage
- `POST /api/claims/extract` — measurable/impact claim extraction
- `POST /api/interview/start` — persisted session
- `POST /api/interview/{id}/answer` — evaluation and adaptive follow-up
- `POST /api/evidence-lock/rewrite` — safe/confirm/blocked rewrite
- `POST /api/learning/plan` — gap-based plan
- `POST /api/video/plan` — daily video sessions
- `DELETE /api/data` — delete profile, resume, transcript

Interactive documentation is available at `http://localhost:8000/docs`.

