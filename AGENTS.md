# AGENTS.md — ProofCoach AI

## Product

ProofCoach AI is a local-first career preparation platform. Its core promise is not “make a resume sound impressive”; it is “make the resume machine-readable, connect claims to evidence, and help the candidate defend them.”

## Architecture

- `frontend/`: React, Vite, TypeScript, Tailwind, React Router, React Flow, Recharts, Framer Motion, Lucide.
- `backend/`: FastAPI, Pydantic, SQLModel, SQLite, PyMuPDF, python-docx.
- `sample-data/`: non-personal deterministic demo fixtures.
- `scripts/`: Windows and POSIX setup/start helpers.
- `docs/`: API and privacy notes.

The browser stores only non-sensitive demo/navigation state. User files and interview records belong to the local backend. `AIProvider` is the only AI boundary: deterministic demo and Ollama implementations share one interface.

## Commands

- Frontend: `npm run dev`, `npm run lint`, `npm run typecheck`, `npm run build`, `npm test`
- Backend: `uvicorn app.main:app --reload --port 8000`, `pytest`
- Windows all-in-one: `scripts/setup.ps1`, then `scripts/start.ps1`

## Conventions

- TypeScript strict mode; prefer typed domain objects over anonymous maps.
- Python services are pure functions where possible; API routes translate transport concerns only.
- Scores expose their components and labels. Never present a universal ATS score or one unexplained AI score.
- Generated practice is always called “PYQ-style Practice” unless source provenance exists.
- Keep observable communication indicators separate from fake emotion/facial analysis.
- User-facing claims must state whether they are measured, inferred, self-reported, or simulated.

## Privacy and safety

- Never commit `.env`, keys, tokens, resumes, candidate personal data, uploads, or local databases.
- Never infer gender from a name, resume, image, appearance, or voice.
- Never invent percentages, employers, technologies, awards, certificates, responsibilities, or impact.
- Evidence Lock must block unsupported quantified achievements.
- A browser cannot guarantee blocking phone calls, WhatsApp, or OS notifications. Label that as Future Mobile Integration.
- Delete My Data must delete the local profile, resume, and interview transcript.

## Real vs simulated

Real: PDF/DOCX text extraction, deterministic heuristics, claim extraction, skill matching, scoring, local SQLite persistence, timer, browser speech capability detection, stateful interview flow, data deletion.

Simulated in demo mode: seeded candidate/resume, deterministic AI-style explanations, emergency-contact event, compressed wellbeing timer, and fallback interview answers. Ollama remains optional.

## Current status

Hackathon prototype implemented as a complete deterministic vertical slice. Before extending, run the full test/build commands and preserve the demo reset path. Next production steps: encrypted storage, authentication, richer document-layout analysis, verified learning-source refresh, and mobile notification APIs.

