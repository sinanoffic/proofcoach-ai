"""
Part 4: Synthesis, Comparison, and Roadmaps (Chapters 28 to 35, Glossary & Appendix)
Covers Technology Stack, Dependencies, Matrices, File Directory, System Cognition,
Demo vs Real Audit, Limitations, Production Roadmap, Glossary, and Test Appendix.
"""

CONTENT = """
## 28. Technology Stack Analysis

ProofCoach AI is built with an intentionally lightweight, modern, and production-tested technology stack.

### 28.1 Frontend Technologies

| Library / Tool | Version | Role in ProofCoach AI | Architectural Rationale |
| :--- | :---: | :--- | :--- |
| **React** | `19.0.0` | Declarative UI framework | Concurrent rendering, native transition hooks, component reusability. |
| **Vite** | `7.3.6` | Frontend bundler & dev server | Sub-millisecond HMR, optimized tree-shaking production builds. |
| **TypeScript** | `5.9.3` | Static type safety | Strict type enforcement across domain models (`Candidate`, `ProjectState`). |
| **Tailwind CSS** | `3.4.17` | Utility CSS foundation | Rapid layout scaffolding complementing custom semantic CSS tokens. |
| **React Router** | `7.1.5` | Client-side routing engine | Multi-page client routing, history management, and code-split lazy loading. |
| **@xyflow/react** | `12.4.4` | Career Evidence Graph | Interactive node-based DAG rendering with custom HTML handles and zoom/pan. |
| **Recharts** | `2.15.1` | Diagnostic data visualization | SVG-based Radar charts, bar meters, and responsive metric graphs. |
| **Framer Motion** | `12.4.7` | UI transitions & animations | Micro-interactions, page entrance fade-ins, and step transitions. |
| **Lucide React** | `0.475.0` | System iconography | Clean, accessible technical icon set across all 13 routes. |

### 28.2 Backend Technologies

| Library / Tool | Version | Role in ProofCoach AI | Architectural Rationale |
| :--- | :---: | :--- | :--- |
| **Python** | `3.11+` | Backend runtime environment | Fast execution, robust typing, rich text-processing ecosystem. |
| **FastAPI** | `0.116.1` | Local REST API framework | High-throughput asynchronous routing, automatic OpenAPI generation. |
| **SQLModel** | `0.0.24` | ORM & data persistence | Combines SQLAlchemy with Pydantic v2 for type-safe SQLite persistence. |
| **PyMuPDF (fitz)**| `1.26.4` | High-speed PDF text parser | Spatial coordinate analysis, block layout extraction, zero external binaries. |
| **python-docx** | `1.2.0` | Word document text parser | Direct XML parsing of DOCX paragraphs and table structures. |
| **Pydantic** | `2.13.5` | Data validation & schemas | Strict runtime input/output validation, fast C-extension serialization. |
| **Uvicorn** | `0.35.0` | ASGI application server | Lightweight, reliable local HTTP server with automatic hot-reloading. |
| **Pytest** | `8.4.2` | Automated testing framework | Fast, deterministic testing of services, parsers, and Evidence Lock. |

---

## 29. Third-Party Services & Dependency Verification

An exhaustive audit of the codebase confirms that ProofCoach AI maintains **zero runtime dependencies on cloud services or external AI vendors**:

| Service / Dependency | Integration Status | Data Sent | Data Received | Criticality |
| :--- | :--- | :--- | :--- | :--- |
| **OpenAI / Claude / Gemini APIs** | **Not Present** | None | None | None. Platform uses deterministic heuristics. |
| **Ollama (Local LLM)** | **Optional** | Prompt text (localhost only) | Generated text | Optional. Codebase runs 100% without Ollama. |
| **YouTube IFrame Embed** | **External Client** | Video ID parameter | Video player iframe | Required only for `/video-plan` visual embed. |
| **Google Analytics / Telemetry**| **Not Present** | None | None | None. Prohibited by privacy policy. |
| **Cloud Hosting (Vercel)** | **Client Hosting** | Static JS/CSS assets | Static assets | Frontend demo hosting only. Backend remains local. |

---

## 30. Feature Connection Matrix

The following matrix documents how data originates, transfers, and influences connected modules across the platform:

| Feature Module | Reads Data From | Writes / Mutates Data To | Downstream Influence |
| :--- | :--- | :--- | :--- |
| **Onboarding** | User form inputs | `state.candidate` | Profile, Command Centre, Target Role, Interview Persona |
| **Resume Lab** | Raw PDF/DOCX file | `state.metrics.parser`, claims | Career Evidence Graph, Claim Detector, Interview Questioning |
| **Target Role** | Job text / demo roles | Role requirements, skill gaps | Career Evidence Graph, Learning Plan priorities, Interview Context |
| **Evidence Graph** | Candidate skills + Role gaps | React Flow node layout | Visual gap inspection, next action recommendations |
| **Adaptive Interview**| Resume claim + Role context | `state.answer`, `session_id` | Truth Loop confidence, Radar scores, XP rewards |
| **Feedback Engine** | Interview answer evaluation | `state.evaluation`, `metrics` | Evidence Lock rewrites, Personalized Learning recommendations |
| **Evidence Lock** | Proposed bullet points | `state.evidenceLockDemo` | Prevents resume hallucination; feeds safe rewrites to Resume Lab |
| **Learning Plan** | Target role gaps | Active study curriculum | Directs candidate into Project Lab and Focus Shield |
| **Video Planner** | YouTube URL + notes | `state.video.notes`, progress | Daily study scheduling, concept mastery tracking |
| **Project Lab** | Learning goals | `state.project.tasks`, progress | Generates tangible resume evidence; triggers interview defense |
| **Career Quest** | Platform-wide actions | `state.metrics.questPoints` | Unlocks progression levels (Build → Prove → Perform) |
| **Focus Shield** | Time limit preference | `proofcoach-focus-v1` (storage) | Autosaves active study sessions; locks intensive activity at limit |
| **Settings** | User preferences | Theme tokens, full data purge | Global styling, complete reset of SQLite and browser storage |

---

## 31. File & Code Responsibility Directory

### 31.1 Frontend Key Modules (`frontend/src/`)
- `App.tsx`: Central router declaring 13 application routes with code-split lazy loading and `Suspense` fallbacks.
- `types.ts`: Master TypeScript interface definitions (`Candidate`, `ProjectTask`, `ProjectState`, `VideoNote`, `DemoState`).
- `context/ProofContext.tsx`: The application's reactive engine; manages state mutation actions and synchronizes to `localStorage`.
- `context/ThemeContext.tsx`: Manages dark/light theme state, listening to OS color preferences and storing overrides.
- `components/Shell.tsx`: The master layout wrapper rendering the responsive sidebar, brand header, and view transitions.
- `components/UI.tsx`: Shared atomic design components (`Panel`, `ScoreRing`, `StatusPill`, `PageIntro`, `EvidenceNotice`).
- `services/api.ts`: Fetch client configured to communicate with `http://localhost:8000` with graceful offline fallback.
- `services/video.ts`: Regex-based YouTube URL validator and 11-character video ID extractor.
- `data/demo.ts`: Immutable fallback fixtures providing deterministic seed data for zero-network demonstrations.

### 31.2 Backend Key Modules (`backend/app/`)
- `main.py`: FastAPI initialization, CORS security middleware, and 13 REST API route handlers.
- `models.py`: SQLModel database entities (`CandidateProfile`, `ResumeRecord`, `InterviewSession`).
- `schemas.py`: Pydantic v2 schemas validating request and response payloads.
- `db.py`: SQLite engine initialization and dependency-injected session management.
- `services/resume.py`: PyMuPDF text extraction, spatial bounding-box column analysis, and the 8-point robustness rubric.
- `services/evidence.py`: Case-insensitive job-skill matching, coverage calculations, and Evidence Graph DAG generator.
- `services/evidence_lock.py`: Regex pattern matching and technical vocabulary verification preventing fabricated claims.
- `services/interview.py`: Level A through F question selector and multi-dimensional answer rubric evaluation engine.
- `services/learning.py`: Gap-to-curriculum generator and mathematical video study chunking algorithm.
- `services/focus.py`: Session timer governor and wellbeing state evaluator.

---

## 32. How the System Thinks: The Cognitive Flow

ProofCoach AI's internal intelligence can be conceptualized as an 8-stage cognitive processing loop:

```mermaid
flowchart TD
    O["1. OBSERVE\n(Extract raw text, layout coordinates & candidate input)"]
    --> U["2. UNDERSTAND\n(Detect measurable claims, extract skills & map sections)"]
    --> C["3. COMPARE\n(Match candidate skills against target role requirements)"]
    --> E["4. EVALUATE\n(Calculate parser robustness & identify critical evidence gaps)"]
    --> D["5. DECIDE\n(Select adaptive interview question level from A to F)"]
    --> R["6. RESPOND\n(Challenge candidate on baselines, trade-offs & personal ownership)"]
    --> T["7. TRACK\n(Score answer against rubric, update truth loop & award XP)"]
    --> A["8. ADAPT\n(Generate personalized learning plan & project lab tasks)"]
    
    A -. New Evidence Created .-> O
```

1. **Observe:** The system ingests raw PDF/DOCX bytes or job description text.
2. **Understand:** Regex patterns and NLP tokenizers identify sections, dates, technologies, and quantified metrics.
3. **Compare:** The candidate's verified skill set is compared against the target role's expectations.
4. **Evaluate:** Strengths are confirmed; gaps are tagged as role blockers.
5. **Decide:** The engine selects an interview probe tailored specifically to the highest-risk claim.
6. **Respond:** The interviewer delivers the challenge via text and Web Speech audio.
7. **Track:** Answer quality updates the Resume Truth Loop and increments Career Quest XP.
8. **Adapt:** Gaps exposed during questioning are automatically translated into project tasks in the Project Lab.

---

## 33. Demo vs Reality: Transparent Capability Audit

To maintain complete transparency, the following audit distinguishes fully operational local features from simulated or demo behaviors:

| Feature / Subsystem | Operational Reality | Implementation Mechanism | Notes & Limitations |
| :--- | :--- | :--- | :--- |
| **PDF/DOCX Text Extraction** | **100% Real** | PyMuPDF (`fitz`) and `python-docx` | Runs locally in memory; handles standard documents. |
| **Two-Column Layout Detection** | **100% Real** | Horizontal bounding-box coordinate analysis | Heuristic-based; complex multi-frame magazines may vary. |
| **Parser Robustness Score** | **100% Real** | 8-point transparent algorithmic rubric | Real diagnostic calculation; not an ATS score. |
| **Evidence Lock Filtering** | **100% Real** | Regex extraction & set-difference logic | Reliably catches new numbers and unconfirmed tech terms. |
| **Interactive Evidence Graph** | **100% Real** | `@xyflow/react` (React Flow) | Fully interactive DAG with zoom, pan, and inspector. |
| **Local SQLite Persistence** | **100% Real** | SQLModel / SQLite (`proofcoach.db`) | Real database operations on local host. |
| **Local Data Purge** | **100% Real** | `DELETE /api/data` + storage wipe | Completely wipes database tables and local storage. |
| **Adaptive Interview Flow** | **Deterministic Logic** | Stateful Python service + local fallback | Implements Levels A–F probing using deterministic templates. |
| **Answer Evaluation** | **Deterministic Heuristics**| Keyword, baseline, and structure regex | Accurate for structured answers; not a full LLM evaluator. |
| **Browser Speech Recognition** | **100% Real** | Web Speech API (`webkitSpeechRecognition`) | Hardware and browser-dependent; text fallback provided. |
| **Emergency Contact Action** | **Simulated** | Client-side notification dispatch | Explicitly labeled as a simulation; no SMS/calls sent. |
| **Wellbeing Cap / Demo Timer**| **100% Real** | Client-side timer loop & autosave | Compresses 2.5h to 20s for evaluation. |
| **OS Notification Blocking** | **Future Work** | Not implemented (honest disclaimer) | Disclaimed as requiring native mobile OS integration. |

---

## 34. Current Technical Limitations

An honest audit of the current prototype reveals the following engineering boundaries:
1. **Frontend-Only Cloud Deployment:** The public Vercel deployment hosts the client-side SPA. Without a running local FastAPI backend, the Vercel demo operates purely on deterministic client fixtures.
2. **Single-User SQLite Concurrency:** SQLite is ideally suited for local-first single-user installations, but cannot support high-concurrency multi-tenant cloud deployments without PostgreSQL.
3. **Lexical vs. Semantic Parsing:** Skill and claim extraction rely on sophisticated regex dictionaries rather than semantic vector embeddings. Unconventional phrasing may not be recognized.
4. **Browser Speech Variability:** The Web Speech API depends heavily on Google Chrome's underlying engine. In Firefox or Safari, speech recognition gracefully degrades to text input.
5. **Static Course Catalog:** Learning resources (`RESOURCE_CATALOG`) are statically defined. External link rot or course restructuring requires periodic manual catalog curation.

---

## 35. Production Roadmap & Future Extensions

```mermaid
flowchart LR
    P1["Phase 1: Secure Cloud Pilot\n(PostgreSQL, JWT Auth, HTTPS)"]
    --> P2["Phase 2: Semantic Intelligence\n(Local Embeddings, Calibrated Rubrics)"]
    --> P3["Phase 3: Multi-Session Mentorship\n(Longitudinal History, Mentor Mode)"]
    --> P4["Phase 4: Native Mobile Focus\n(OS Notification APIs, Screen Time)"]
```

### Phase 1 — Secure Multi-User Pilot
- Transition from SQLite to PostgreSQL with Alembic database migrations.
- Implement stateless JWT authentication with encrypted user data at rest.
- Introduce presigned S3 upload URLs with automatic resume-file destruction after parsing.

### Phase 2 — Semantic Intelligence & Local LLMs
- Integrate lightweight local embedding models (e.g., `bge-small-en`) via ONNX Runtime for semantic skill matching.
- Connect local Ollama instances (`llama3:8b` or `mistral`) for dynamically generated interview follow-ups while strictly maintaining Evidence Lock boundaries.

### Phase 3 — Longitudinal Growth & Mentor Portals
- Track candidate improvement over weeks, rendering time-series readiness trajectories.
- Add an exportable "Evidence Portfolio" that candidates can share with real hiring managers.

### Phase 4 — Native Mobile Focus Companion
- Develop React Native mobile apps for iOS and Android.
- Integrate Apple Screen Time APIs and Android Digital Wellbeing APIs to enforce true OS-level notification blocking during focus study sessions.

---

## Technical Glossary

- **ATS (Applicant Tracking System):** Enterprise HR software that ingests, parses, and filters resume files before human recruiters review them.
- **Career Evidence Graph:** A directed acyclic graph (DAG) mapping skills to projects, measurable claims, interview defenses, and job requirements.
- **Deterministic Vertical Slice:** A fully functional software slice that executes predictable, reproducible logic without external network dependencies.
- **Evidence Lock:** A rule-based security mechanism that prevents generative AI from fabricating numbers, metrics, or technologies on a resume.
- **Local-First Architecture:** A software design pattern where data storage, compute, and execution occur primarily on the user's local device.
- **Parser Robustness Score:** A transparent 0–100 diagnostic calculated by ProofCoach that measures how reliably a machine can extract document text without formatting errors.
- **PYQ-Style Practice:** Practice questions modeled after Previous Year Questions, generated algorithmically without claiming historical provenance.
- **Resume Truth Loop:** A verification feedback cycle in which interview answers directly alter the system's demonstrated confidence in a resume claim.
- **Web Speech API:** A browser API providing speech recognition (voice input) and speech synthesis (text-to-speech) capabilities.

---

## Appendix: Verification & Test Coverage

### Automated Backend Test Suite (`backend/tests/test_core.py`)
All 9 core unit tests pass with 100% reliability under Python 3.11+:
1. `test_backend_health`: Verifies `/api/health` returns status `ok` and `local_first: true`.
2. `test_resume_parser_components_are_transparent`: Confirms Parser Robustness score falls between 0–100, detects Python, warns on two-column layouts, and includes disclaimer.
3. `test_claim_extraction_finds_quantified_claim`: Verifies regex extracts *"Reduced API latency by 35%"*.
4. `test_job_skill_matching_is_case_insensitive`: Confirms case-insensitive matching across `["python", "REST", "Sql"]`.
5. `test_evidence_lock_blocks_invented_metric`: Verifies that adding an unconfirmed `40%` metric is blocked.
6. `test_evidence_lock_allows_grammar_only_rewrite`: Verifies that stylistic improvements are classified as `safe`.
7. `test_interview_evidence_does_not_claim_external_truth`: Confirms claim confidence increases without claiming real-world truth.
8. `test_demo_timer_ends_at_twenty_seconds`: Verifies demo timer ends exactly at 20 seconds with autosave enabled.
9. `test_demo_seed_is_complete_and_non_personal`: Verifies initial synthetic fixtures are non-personal and complete.

### Frontend Quality Assurance Commands
- `npm run lint`: Zero ESLint warnings or errors under strict TypeScript rules.
- `npm run typecheck`: Strict `tsc -b` type checking passes with zero type mismatches.
- `npm run build`: Production Vite bundling compiles successfully in under 10 seconds.
"""
