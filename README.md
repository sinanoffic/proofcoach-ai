# ProofCoach AI

**Build it. Prove it. Defend it.**

ProofCoach AI is a privacy-first career preparation prototype for students, freshers, early-career professionals, career switchers, and job seekers. It tests whether a resume is machine-readable, connects each career claim to evidence, challenges important claims in an adaptive interview, blocks invented resume achievements, and turns verified gaps into a daily learning plan.

This repository is the portable source of truth. The full deterministic hackathon journey works without a cloud AI service by setting `DEMO_MODE=true`.

## What works

- Local PDF/DOCX parsing with ProofCoach Parser Robustness (not a universal ATS score)
- Target-role skill extraction and role evidence coverage
- Career Evidence Graph and metric/impact claim detection
- Adaptive text interview with browser voice input/output when supported
- Evidence-based feedback and claim confidence explanation
- Evidence Lock with safe, confirmation-required, and blocked rewrites
- Learning plan, YouTube study planner, PYQ-style practice, Focus Shield, Career Quest
- Deterministic demo reset and before-vs-after progress
- Local SQLite persistence and complete profile/resume/interview deletion
- Dark and light application themes with a browser-saved preference (dark by default)

## Quick start — Windows PowerShell

```powershell
git clone https://github.com/sinanoffic/proofcoach-ai.git
cd proofcoach-ai
Set-ExecutionPolicy -Scope Process Bypass
.\scripts\setup.ps1
.\scripts\start.ps1
```

Open `http://localhost:5173`. The API runs at `http://localhost:8000` and its health endpoint is `/api/health`.

## Manual setup

```powershell
cd backend
py -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
cd ..\frontend
npm install
```

Run the backend and frontend in separate terminals:

```powershell
cd backend
.\.venv\Scripts\Activate.ps1
uvicorn app.main:app --reload --port 8000
```

```powershell
cd frontend
npm run dev
```

macOS/Linux equivalents are documented in [DEVELOPMENT.md](DEVELOPMENT.md).

## Validation

```powershell
cd frontend
npm run lint
npm run typecheck
npm test
npm run build

cd ..\backend
pytest
```

## Privacy and accuracy boundaries

The global moon/sun control and Settings → Appearance switch the entire application between a refined dark workspace and a white editorial workspace. The preference is stored as `proofcoach-theme`, independent of demo state; an inline bootstrap in `frontend/index.html` applies it before React loads. Semantic tokens live in `frontend/src/styles.css` and chart/graph palettes respond to the theme context. Shared UI primitives are in `frontend/src/components/`.

The public Vercel deployment is a deterministic frontend demo. Uploading a personal PDF/DOCX requires your own local FastAPI server; if unavailable, the UI explicitly keeps the seeded sample and states that the selected file was not analyzed.

Resume files are processed by the local FastAPI backend and are not sent to analytics. Demo mode uses deterministic seeded data. Browser speech features remain optional and always have a text fallback. ProofCoach never infers gender and never claims to prove that a real-world resume statement is true. It reports only the evidence demonstrated inside the interview.

See [ARCHITECTURE.md](ARCHITECTURE.md), [INNOVATIONS.md](INNOVATIONS.md), [DEVELOPMENT.md](DEVELOPMENT.md), and [DEMO_SCRIPT.md](DEMO_SCRIPT.md).
