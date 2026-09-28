"""
Part 3: Technical Deep-Dive (Chapters 20 to 27)
Covers Frontend & Backend Architecture, State Management, Data Flows, Persistence,
API Specifications, Core Algorithms, and Security/Privacy Models.
"""

CONTENT = """
## 20. Frontend Architecture & UI Design System

### 20.1 Directory Layout & Component Structure
The frontend is constructed using React 19, TypeScript 5.9, and Vite 7. The project maintains an intentional separation between reusable UI primitives, global shell layouts, route-level page views, and state providers.

```
frontend/
├── public/
│   ├── assets/
│   │   ├── phoenix-watermark.jpg     # Official Blue Crystal Phoenix asset
│   │   └── favicon.svg
├── src/
│   ├── components/                   # Shared UI primitives & Layout Shell
│   │   ├── Brand.tsx                 # Phoenix logo & typography lockup
│   │   ├── Shell.tsx                 # Global responsive sidebar, topbar & navigation
│   │   ├── ThemeToggle.tsx           # Accessible light/dark theme switch
│   │   └── UI.tsx                    # Atomic design tokens (Panel, ScoreRing, StatusPill)
│   ├── context/                      # React Context providers
│   │   ├── ProofContext.tsx          # Central application state & persistence
│   │   └── ThemeContext.tsx          # Dual-theme engine & preference sync
│   ├── data/
│   │   └── demo.ts                   # Deterministic fixtures & initial demo state
│   ├── pages/                        # Lazy-loaded route components (13 total)
│   ├── services/                     # Client-side utility functions & HTTP client
│   │   ├── api.ts                    # Fetch wrapper targeting localhost:8000
│   │   ├── theme.ts                  # Theme resolution & local storage engine
│   │   └── video.ts                  # YouTube URL parser & ID extractor
│   ├── App.tsx                       # React Router configuration & route definitions
│   ├── main.tsx                      # DOM entry point & provider bootstrapping
│   ├── styles.css                    # Semantic CSS variables & responsive rules
│   └── types.ts                      # Strict TypeScript domain interfaces
├── package.json
└── vite.config.ts
```

### 20.2 Design System & Dual-Theme Tokens
The interface utilizes a technical, crystal-inspired aesthetic. It supports two full-palette themes powered by CSS custom properties defined in `styles.css`.

| Semantic Variable | Dark Navy Theme (Default) | White Editorial Theme | Semantic Role |
| :--- | :--- | :--- | :--- |
| `--bg` | `#03060D` (Deep Void Navy) | `#F7F9FC` (Cool Editorial White) | Application canvas background |
| `--surface` | `#0A111D` (Glass Card Surface) | `#FFFFFF` (Pure Crisp White) | Card and panel containers |
| `--surface-subtle` | `#0F172A` | `#F1F5F9` | Table rows, code blocks, dividers |
| `--text` | `#F4F8FF` (High-Contrast White) | `#111827` (Deep Editorial Slate) | Primary headlines and body copy |
| `--muted` | `#7E8FA6` | `#64748B` | Subtitles, timestamps, placeholders |
| `--primary` | `#1877FF` (Vibrant Electric Blue) | `#1769FF` (Refined Ink Blue) | Primary action buttons and focus rings |
| `--crystal` | `#27C4FF` (Luminous Cyan) | `#007DBD` (Deep Precision Cyan) | Brand accents, active meters, graph nodes |
| `--success` | `#22C77A` (Verified Emerald) | `#16875F` (Forest Green) | Passing scores, verified claims |
| `--warning` | `#F2B84B` (Amber Alert) | `#A66413` (Warm Ochre) | Partial evidence, layout warnings |
| `--danger` | `#F26161` (Critical Coral) | `#D64545` (Crimson Warning) | Blocked claims, role blockers |

#### Preventing Flash of Unstyled Theme (FOUC):
In `index.html`, an inline bootstrap script executes synchronously before React mounts:
```javascript
const saved = localStorage.getItem('proofcoach-theme');
const theme = saved === 'light' || saved === 'dark' ? saved : 'dark';
document.documentElement.setAttribute('data-theme', theme);
```

---

## 21. Backend Architecture & Service Layer

### 21.1 Module Structure & Separation of Concerns
The backend is built with FastAPI and Python 3.11+. It follows a pure-function domain service pattern where business logic is decoupled from HTTP transport.

```
backend/
├── app/
│   ├── config.py             # Pydantic Settings (CORS, demo mode, ports)
│   ├── db.py                 # SQLite database engine & session dependency
│   ├── main.py               # FastAPI application, route handlers & lifespan
│   ├── models.py             # SQLModel persistence entities (table=True)
│   ├── schemas.py            # Pydantic v2 request/response schemas
│   ├── seed.py               # Deterministic resume text & state fixtures
│   ├── providers/            # AI Provider abstraction layer
│   │   ├── base.py           # Abstract base class for AI operations
│   │   └── demo.py           # Deterministic implementation (zero external calls)
│   └── services/             # Pure domain logic functions
│       ├── evidence.py       # Job matching, skill coverage & graph builder
│       ├── evidence_lock.py  # Regex & dictionary claim classification
│       ├── focus.py          # Session timer & wellbeing logic
│       ├── interview.py      # Adaptive questioning & rubric evaluation
│       ├── learning.py       # Gap-to-resource curriculum generator
│       └── resume.py         # PyMuPDF text & layout extraction
├── tests/
│   └── test_core.py          # 9 automated unit tests verifying core logic
├── requirements.txt
└── pytest.ini
```

### 21.2 The Provider Abstraction Pattern
To support both zero-network hackathon demonstrations and optional self-hosted LLMs, the platform defines a strict provider interface in `backend/app/providers/base.py`:
```python
class AIProvider(ABC):
    @abstractmethod
    def extract_resume_facts(self, text: str) -> dict: ...
    @abstractmethod
    def analyze_job_requirements(self, description: str) -> dict: ...
    @abstractmethod
    def generate_interview_question(self, context: dict) -> dict: ...
    @abstractmethod
    def evaluate_interview_answer(self, answer: str, context: dict) -> dict: ...
    @abstractmethod
    def assess_evidence_lock_rewrite(self, original: str, proposed: str) -> dict: ...
```
The active `DeterministicAIProvider` implements this interface using deterministic heuristics, ensuring the platform runs reliably offline without unexpected token costs or network latency.

---

## 22. State Management: ProofContext & Reactive Loops

### 22.1 Global State Architecture
Client-side state is centralized in `ProofContext.tsx` via the `useProof()` hook. It manages a unified `DemoState` interface that synchronizes user actions across all 13 routes.

```mermaid
flowchart TD
    subgraph Browser Storage
        LS[("localStorage\nkey: 'proofcoach-demo-v1'")]
    end

    subgraph ProofProvider Reactive Scope
        State["state: DemoState"]
        Mutators["State Mutator Actions\n(updateCandidate, completeTask, submitInterview)"]
        Commit["commit(nextState)"]
        
        Mutators --> Commit
        Commit --> State
        Commit --> LS
        LS -. Initial Load .-> State
    end

    subgraph Consuming Pages
        P1["ProfilePage"]
        P2["ResumePage"]
        P3["RolePage"]
        P4["InterviewPage"]
        P5["ProjectLabPage"]
        P6["QuestPage"]
    end

    State --> P1
    State --> P2
    State --> P3
    State --> P4
    State --> P5
    State --> P6
```

### 22.2 State Property Inventory & Mutation Rules

| Property | Data Type | Default / Seeded Value | Mutation Action | Persistence Scope |
| :--- | :--- | :--- | :--- | :--- |
| `candidate` | `Candidate` | Demo Candidate (BE AI/ML) | `updateCandidate(partial)` | `localStorage` |
| `completed` | `string[]` | `['profile', 'resume', ...]` | `complete(key)` | `localStorage` |
| `metrics` | `Record<MetricKey, number>` | `{ parser: 82, coverage: 50, ... }` | `setMetric(key, val)` | `localStorage` |
| `interviewAnswered`| `boolean` | `false` | `submitInterview()` | `localStorage` |
| `currentQuestion` | `number` | `0` (Level D) | `submitInterview()` | `localStorage` |
| `answer` | `string` | `""` | `setAnswer(str)` | `localStorage` |
| `interviewSessionId`| `number \| null` | `null` | `startInterview(id)` | `localStorage` |
| `evaluation` | `any \| null` | `null` | `submitInterview(eval)` | `localStorage` |
| `evidenceLockDemo`| `'idle'\|'safe'\|'blocked'` | `'idle'` | `setEvidenceLockDemo(val)` | `localStorage` |
| `project` | `ProjectState \| null` | AI SafeRoute (Flood API) | `updateProject()`, `completeTask()` | `localStorage` |
| `video` | `VideoState` | `{ watched: 45, notes: [...] }` | `addVideoNote(note)` | `localStorage` |

---

## 23. Data Flow Traces across System Boundaries

### Flow A: The Resume → Evidence → Interview → Feedback Loop
```mermaid
flowchart LR
    A["Uploaded Resume (PDF)"] -->|PyMuPDF Extract| B["35% Latency Claim"]
    B -->|Build Graph| C["Evidence Graph DAG"]
    C -->|Identify Gap| D["Docker Missing"]
    C -->|Trigger Probe| E["Interview Question (Level D)"]
    E -->|Evaluate Answer| F["Truth Loop: 58% -> 82%"]
    F -->|Enforce Gate| G["Evidence Lock Rewrite"]
    G -->|Generate Plan| H["Docker & Testing Tasks"]
```

### Flow B: Live Interview Execution & Evaluation Flow
```mermaid
sequenceDiagram
    participant UI as InterviewPage
    participant API as /api/interview/{id}/answer
    participant Svc as services.interview
    participant DB as SQLite DB
    participant Ctx as ProofContext

    UI->>API: POST { answer: "Baseline was 420 ms..." }
    API->>Svc: evaluate_answer(answer)
    Svc->>Svc: Regex pattern match (baseline, tools, fillers)
    Svc-->>API: Returns evaluation payload & scores
    API->>DB: Append transcript to InterviewSession
    API-->>UI: { evaluation, next_question }
    UI->>Ctx: submitInterview(evaluation)
    Ctx->>Ctx: Increment XP (+50), set metrics.claim = 82
    UI->>UI: Navigate to /feedback
```

---

## 24. Persistence, Storage & Data Lifecycle

ProofCoach AI enforces strict data governance across all storage mediums:

| Storage Medium | Key / Table Name | Data Stored | Lifetime | Reset / Purge Behavior |
| :--- | :--- | :--- | :--- | :--- |
| **Browser LocalStorage** | `proofcoach-demo-v1` | Serialized `DemoState` JSON (candidate, metrics, project, video notes) | Persistent across sessions | Wiped on "Delete My Data" or reset to demo fixtures |
| **Browser LocalStorage** | `proofcoach-focus-v1` | Active timer state `{ demo, elapsed, ended }` | Persistent across refreshes | Wiped on "Delete My Data" |
| **Browser LocalStorage** | `proofcoach-theme` | Appearance string (`'dark'` or `'light'`) | Persistent across sessions | Preserved across demo resets |
| **Local SQLite DB** | `candidateprofile` | Candidate name, category, education, preferences | Persistent on host machine | Truncated via `DELETE /api/data` |
| **Local SQLite DB** | `resumerecord` | Extracted text preview, parser score, analysis JSON | Persistent on host machine | Truncated via `DELETE /api/data` |
| **Local SQLite DB** | `interviewsession` | Session level, question index, full transcript JSON | Persistent on host machine | Truncated via `DELETE /api/data` |
| **RAM (In-Memory)** | Fast API UploadFile | Raw PDF/DOCX binary stream (max 8 MB) | Lifetime of HTTP request only | Destroyed immediately after text extraction |

---

## 25. APIs & Local Services Specification

The FastAPI backend exposes **13 high-performance REST endpoints** on `http://localhost:8000`:

```mermaid
flowchart LR
    subgraph REST API Surface
        H["/api/health [GET]"]
        DR["/api/demo/reset [POST]"]
        DS["/api/demo/state [GET]"]
        RP["/api/resume/parse [POST]"]
        RA["/api/role/analyze [POST]"]
        EG["/api/evidence/graph [POST]"]
        CE["/api/claims/extract [POST]"]
        IS["/api/interview/start [POST]"]
        IA["/api/interview/{id}/answer [POST]"]
        EL["/api/evidence-lock/rewrite [POST]"]
        LP["/api/learning/plan [POST]"]
        VP["/api/video/plan [POST]"]
        DD["/api/data [DELETE]"]
    end
```

### Complete OpenAPI-Style Endpoint Index

| Method | Endpoint Path | Request Body | Response Schema | Description |
| :--- | :--- | :--- | :--- | :--- |
| `GET` | `/api/health` | None | `{ status, mode, local_first }` | Healthcheck and runtime provider verification. |
| `POST` | `/api/demo/reset` | None | `{ reset, state }` | Truncates SQLite tables and re-seeds deterministic demo data. |
| `GET` | `/api/demo/state` | None | `DemoState` JSON | Returns full deterministic view model for zero-setup demos. |
| `POST` | `/api/resume/parse` | `multipart/form-data` (`file`) | `ParserAnalysis` | Extracts text and evaluates the 8-point robustness rubric. |
| `POST` | `/api/role/analyze` | `{ role, job_description }` | `RoleAnalysis` | Analyzes role requirements, responsibilities, and competencies. |
| `POST` | `/api/evidence/graph`| `{ candidate_skills, required_skills }` | `{ nodes, edges, coverage }` | Constructs DAG node and edge topology for React Flow. |
| `POST` | `/api/claims/extract` | `{ text }` | `{ claims: [...] }` | Extracts quantified achievement statements from raw text. |
| `POST` | `/api/interview/start`| `{ claim, mode }` | `{ session_id, level, question }` | Initializes interview session record in SQLite. |
| `POST` | `/api/interview/{id}/answer`| `{ answer }` | `{ evaluation, next_question }` | Scores candidate answer and determines next adaptive probe. |
| `POST` | `/api/evidence-lock/rewrite`| `{ original, proposed, confirmed }`| `{ status, color, message, ... }` | Classifies rewrite into Safe, Confirm, or Blocked. |
| `POST` | `/api/learning/plan` | `{ gaps, daily_minutes }` | `{ daily_minutes, split, tasks }` | Generates prioritized learning curriculum and artifact goals. |
| `POST` | `/api/video/plan` | `{ title, duration, daily_minutes, notes }` | `{ days, sessions, concepts }` | Chunks long video tutorials into daily study/practice sessions. |
| `DELETE`| `/api/data` | None | `{ deleted, local_database_retained_empty }` | Permanent purge of all candidate database records. |

---

## 26. Algorithms & Internal Logic Implementation

### 26.1 Parser Robustness Scoring Formula
The robustness score $S_{\text{robust}}$ is calculated as:
$$S_{\text{robust}} = \max\left(0, \min\left(100, \sum_{i=1}^{8} P_i\right)\right)$$
Where $P_i$ represents points awarded for each of the 8 checks:
1. $P_1 = \text{round}(20 \times \min(1.0, L_{\text{text}} / 675))$
2. $P_2 = 10 \text{ if (email and phone) else } 5$
3. $P_3 = \min(15, N_{\text{sections}} \times 3)$
4. $P_4 = 10 \text{ if dates found else } 4$
5. $P_5 = \min(15, N_{\text{skills}} \times 3)$
6. $P_6 = 10 \text{ if projects found else } 0$
7. $P_7 = 4 \text{ if two-column else } 10$
8. $P_8 = 4 \text{ if tables found else } 10$

### 26.2 Evidence Lock Verification Logic
```python
def assess_rewrite(original: str, proposed: str, confirmed_facts: list[str] = None):
    confirmed_facts = confirmed_facts or []
    # 1. Extract numerical tokens
    original_numbers = set(NUMBER_PATTERN.findall(original)) | {
        item for fact in confirmed_facts for item in NUMBER_PATTERN.findall(fact)
    }
    proposed_numbers = set(NUMBER_PATTERN.findall(proposed))
    invented_numbers = sorted(proposed_numbers - original_numbers)

    # 2. Extract technical terms
    original_tech = {t for t in TECH_TERMS if t.lower() in original.lower()}
    proposed_tech = {t for t in TECH_TERMS if t.lower() in proposed.lower()}
    invented_tech = sorted(proposed_tech - original_tech)

    # 3. Block unsupported facts
    if invented_numbers or invented_tech:
        return {
            "status": "blocked",
            "unsupported": invented_numbers + invented_tech,
            "message": "Evidence Lock prevented an unsupported achievement from being added."
        }
    
    # 4. Check for unconfirmed power verbs
    if any(v in proposed.lower() for v in ["led", "architected", "owned"]) and \
       not any(v in original.lower() for v in ["led", "architected", "owned"]):
        return {"status": "confirm", "message": "Ownership elevated; confirm evidence."}

    return {"status": "safe", "message": "Wording improved without adding new facts."}
```

### 26.3 Video Planner Chunking Formula
```python
learning_budget = round(daily_minutes * 0.75)
practice_budget = daily_minutes - learning_budget
days_required = math.ceil(duration_minutes / learning_budget)
```

---

## 27. Security, Privacy & Local-First Verification

### 27.1 Telemetry and Network Isolation
- **Zero Third-Party Telemetry:** No Google Analytics, Mixpanel, Sentry, or Segment SDKs are installed or imported.
- **Localhost Binding:** FastAPI binds by default to `127.0.0.1:8000`. CORS middleware explicitly restricts origins to `http://localhost:5173` and `http://127.0.0.1:5173`.
- **Ephemeral Upload Processing:** Uploaded resume files are passed as raw bytes in memory directly to PyMuPDF. No resume PDF or DOCX file is ever written to disk or stored in permanent directories.
- **Git Hygiene:** Local databases (`*.db`, `*.sqlite3`), virtual environments (`.venv/`), and environment files (`.env`) are strictly excluded via `.gitignore`.
"""
