# AGENTS.md — ProofCoach AI

## Product

ProofCoach AI is a local-first career preparation platform. Its core promise is not “make a resume sound impressive”; it is “make the resume machine-readable, connect claims to evidence, and help the candidate defend them.”

## Architecture

- `frontend/`: React, Vite, TypeScript, Tailwind, React Router, React Flow, Recharts, Framer Motion, Lucide.
- `backend/`: FastAPI, Pydantic, SQLModel, SQLite, PyMuPDF, python-docx.
- `sample-data/`: non-personal deterministic demo fixtures.
- `scripts/`: Windows and POSIX setup/start helpers.
- `docs/`: API and privacy notes.
- `frontend/src/context/ThemeContext.tsx` and `frontend/src/services/theme.ts`: browser preference and application-wide dark/light state.
- `frontend/src/styles.css`: semantic background, surface, border, text, accent, and status tokens; both themes share component rules.
- `frontend/src/components/UI.tsx`, `Shell.tsx`, `ThemeToggle.tsx`: reusable panels, headers, scores, badges, navigation and accessible global theme control.

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
- New components use semantic CSS variables. Avoid fixed dark colors in controls, graph nodes, charts, tooltips and forms. Theme defaults to dark, persists in `localStorage`, and must never reset interview/demo state.

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

The UI polish adds two themes, an interactive evidence-node inspector, a hierarchical dashboard, drag-and-drop resume input, working Settings export, and validated YouTube embeds. The Vercel site remains a frontend demo; real parsing and SQLite require local FastAPI. The focus timer state is saved in the browser; OS notification filtering and emergency contact are future/simulated capabilities. Frontend tests cover theme storage and YouTube URL validation; backend has the domain tests.
