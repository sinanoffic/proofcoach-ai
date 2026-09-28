"""
Part 1: Overview, Philosophy, Product Map, Architecture, and User Journey (Chapters 1 to 7)
"""

CONTENT = """
# PROOFCOACH AI — SYSTEM & PRODUCT DEEP-DIVE REPORT
> **Tagline:** Build it. Prove it. Defend it.  
> **Classification:** Technical Architecture, Product Specification & Reverse-Engineering Manual  
> **System Version:** 0.1.0-deterministic-slice (Local-First Architecture)  
> **Repository:** `sinanoffic/proofcoach-ai` (branch: `main`)  
> **Report Date:** September 2026  
> **Target Audience:** Developers, System Architects, Hackathon Judges, Educators, and Technical Evaluators  

---

## TABLE OF CONTENTS
- [Executive Overview](#1-executive-overview)
- [What Is ProofCoach AI?](#2-what-is-proofcoach-ai)
- [Product Philosophy & Responsible-AI Boundaries](#3-product-philosophy--responsible-ai-boundaries)
- [Problem & Solution: The Crisis in Career Prep](#4-problem--solution-the-crisis-in-career-prep)
- [Complete Product Map](#5-complete-product-map)
- [System Architecture](#6-system-architecture)
- [Complete User Journey: A Day in the Life](#7-complete-user-journey-a-day-in-the-life)
- [Profile & Command Centre](#8-profile--command-centre)
- [Resume Lab & Parser Robustness Engine](#9-resume-lab--parser-robustness-engine)
- [Target Role Analysis](#10-target-role-analysis)
- [Career Evidence Graph System](#11-career-evidence-graph-system)
- [Live Adaptive Interview Engine](#12-live-adaptive-interview-engine)
- [Evidence Feedback Engine & Evidence Lock](#13-evidence-feedback-engine--evidence-lock)
- [Personalized Learning Plan](#14-personalized-learning-plan)
- [Video Study Planner](#15-video-study-planner)
- [Project Lab: Artifact Engineering](#16-project-lab-artifact-engineering)
- [Career Quest Progression Engine](#17-career-quest-progression-engine)
- [Focus Shield & Wellbeing System](#18-focus-shield--wellbeing-system)
- [Settings, Runtime Controls & Privacy Purge](#19-settings-runtime-controls--privacy-purge)
- [Frontend Architecture & UI Design System](#20-frontend-architecture--ui-design-system)
- [Backend Architecture & Service Layer](#21-backend-architecture--service-layer)
- [State Management: ProofContext & Reactive Loops](#22-state-management-proofcontext--reactive-loops)
- [Data Flow Traces across System Boundaries](#23-data-flow-traces-across-system-boundaries)
- [Persistence, Storage & Data Lifecycle](#24-persistence-storage--data-lifecycle)
- [APIs & Local Services Specification](#25-apis--local-services-specification)
- [Algorithms & Internal Logic Implementation](#26-algorithms--internal-logic-implementation)
- [Security, Privacy & Local-First Verification](#27-security-privacy--local-first-verification)
- [Technology Stack Analysis](#28-technology-stack-analysis)
- [Third-Party Services & Dependency Verification](#29-third-party-services--dependency-verification)
- [Feature Connection Matrix](#30-feature-connection-matrix)
- [File & Code Responsibility Directory](#31-file--code-responsibility-directory)
- [How the System Thinks: The Cognitive Flow](#32-how-the-system-thinks-the-cognitive-flow)
- [Demo vs Reality: Transparent Capability Audit](#33-demo-vs-reality-transparent-capability-audit)
- [Current Technical Limitations](#34-current-technical-limitations)
- [Production Roadmap & Future Extensions](#35-production-roadmap--future-extensions)
- [Technical Glossary](#technical-glossary)
- [Appendix: Verification & Test Coverage](#appendix-verification--test-coverage)

---

## 1. Executive Overview

### 1.1 The Core Identity
**ProofCoach AI** is a privacy-first, local-first career preparation platform designed to replace ungrounded resume buzzwords with machine-readable, evidence-linked, and interview-defensible technical competencies. Its guiding philosophy is captured in its three-part operational standard:
1. **Build it:** Turn theoretical study into tangible software artifacts and code repositories.
2. **Prove it:** Extract measurable claims, ground them in verifiable work, and test layout readability through transparent parser diagnostics.
3. **Defend it:** Withstand targeted, adaptive technical interview probing that interrogates baselines, personal contributions, trade-offs, and failure scenarios.

### 1.2 The Central Product Promise
Contemporary job candidates face an acute paradox: while Generative AI enables individuals to produce polished, impressive-sounding resumes in seconds, hiring algorithms and technical interviewers increasingly reject applicants who cannot substantiate their claims under pressure. 
ProofCoach AI operates under a foundational principle:
> *"A resume should not merely sound impressive. Machines must be able to parse its structure reliably, the candidate must possess verifiable evidence for every quantified claim, and the candidate must be prepared to defend those claims under rigorous technical interrogation."*

### 1.3 Key Architectural Pillars
- **Local-First & Privacy-Governed:** The platform runs locally via FastAPI and SQLite, with client-side execution in React 19. It enforces a strict zero-telemetry policy, executes document parsing in RAM, and provides a one-click local data destruction cascade.
- **Evidence Lock Safeguard:** Prevents generative hallucination by actively blocking any resume rewrite that introduces unsupported metrics, unverified technologies, or fabricated impact figures.
- **Transparent Multi-Metric Diagnostic:** Completely rejects the concept of a single, opaque "AI Readiness Score" or "Universal ATS Score." Instead, it surfaces six independent, observable signals: Parser Robustness, Role Evidence Coverage, Interview Readiness, Claim Verification, Learning Progress, and Career Quest XP.
- **Deterministic Vertical Slice:** All core features operate deterministically out of the box without requiring external cloud AI subscriptions, API keys, or cloud infrastructure, while maintaining an optional abstraction layer (`AIProvider`) for local Ollama instances.

---

## 2. What Is ProofCoach AI?

### 2.1 The Genesis of the Platform
ProofCoach AI was engineered to dismantle the superficiality of modern career preparation. Traditional tools fall into three segregated silos:
1. *Resume Optimizers:* Focus exclusively on keyword stuffing and stylistic rephrasing, often hallucinating achievements that candidates cannot defend.
2. *Mock Interview Simulators:* Ask generic, disconnected behavioral questions (e.g., "Tell me about a time you failed") without contextual grounding in the candidate's actual projects.
3. *Online Learning Platforms:* Prescribe generic, open-ended course catalogs without diagnosing the candidate's exact technical gaps or requiring concrete artifact construction.

ProofCoach AI bridges these silos into a single closed-loop ecosystem. A claim extracted from a resume directly triggers targeted interview questions; weaknesses exposed during the interview immediately generate precise learning goals; learning goals culminate in tangible project tasks in the Project Lab; and finished project artifacts loop back to strengthen the resume under the supervision of Evidence Lock.

### 2.2 Target User Personas
The system explicitly caters to four distinct user tiers:

| Candidate Category | Core Challenge Addressed | ProofCoach Value Driver |
| :--- | :--- | :--- |
| **Student** | Academic projects lack commercial context and quantified metrics. | Translates coursework into defensible artifacts; extracts baseline measurements. |
| **Fresher / New Grad** | Limited professional history leads to weak keyword matching. | Builds verifiable project evidence to bypass ATS parsing hurdles; closes role gaps. |
| **Early-Career Professional** | Difficulty differentiating personal contributions from team work. | Pressure-tests ownership, architectural trade-offs, and optimization benchmarks. |
| **Career Switcher** | Existing experience does not directly align with new role titles. | Maps transferable skills to target requirements; builds focused bridge projects. |

---

## 3. Product Philosophy & Responsible-AI Boundaries

ProofCoach AI adheres to strict ethical and operational boundaries that separate verifiable reality from simulated or fabricated assertions.

### 3.1 Anti-Hallucination Policy (Evidence Lock)
Generative AI often produces persuasive lies. If an applicant writes *"Made API faster"*, common AI rewrites suggest *"Reduced API response latency by 45% using Redis caching"*. If the candidate never used Redis and never measured latency, they will fail the technical screening. Evidence Lock acts as an immutable gatekeeper:
- **Green (Safe):** Structural, grammatical, or clarity enhancements with zero new factual claims.
- **Amber (Confirm):** Semantic changes that elevate ownership (e.g., from *"participated"* to *"architected"*), requiring explicit user confirmation.
- **Red (Blocked):** Introduction of unconfirmed percentages, numbers, tools, or certifications. The system outright blocks these edits.

### 3.2 Observable Communication Indicators vs. Fake Emotional Analysis
ProofCoach AI vehemently rejects the pseudo-scientific practice of facial emotion analysis, voice stress analysis, or visual "confidence scoring" through webcams:
- **What is measured:** Objective, observable signals—word count, speech duration, filler-word frequency (`um`, `uh`, `like`), answer structure (Problem-Approach-Measurement-Tradeoff), and topic relevance.
- **What is avoided:** Facial expression tracking, eye-gaze tracking, micro-expression decoding, and AI-inferred emotional traits.

### 3.3 Voluntary Gender & Non-Inference
The system strictly prohibits inferring candidate demographic characteristics. Gender, ethnicity, and personal background are never guessed from names, resumes, or vocal traits. A voluntary gender field is provided exclusively for candidate-driven preferences (e.g., auto-pairing with a preferred AI voice persona) and remains hidden unless explicitly configured.

---

## 4. Problem & Solution: The Crisis in Career Prep

```mermaid
flowchart TD
    subgraph Contemporary Failures
        F1["ATS Black Box\n(Silent parsing rejections)"]
        F2["Resume Hallucination\n(Unsubstantiated metrics)"]
        F3["Generic Interviews\n(Irrelevant trivia)"]
        F4["Course Hoarding\n(Passive video watching)"]
        F5["Study Burnout\n(No wellbeing pacing)"]
    end

    subgraph ProofCoach Architectural Solution
        S1["Resume Lab\n(8-point parser diagnostic)"]
        S2["Evidence Lock & Graph\n(Traceable claim chains)"]
        S3["Adaptive Interview\n(Level A-F claim grilling)"]
        S4["Project Lab & Video Plan\n(Artifact-based gap closure)"]
        S5["Focus Shield\n(2.5h wellbeing cap & timer)"]
    end

    F1 ==> S1
    F2 ==> S2
    F3 ==> S3
    F4 ==> S4
    F5 ==> S5
```

### The Five Core Structural Breakdowns:
1. **The ATS Black Box:** Traditional candidates submit multi-column or heavily formatted resumes that Applicant Tracking Systems scramble or drop entirely. Candidates receive no actionable feedback on why their document failed extraction.
   * *ProofCoach Fix:* An 8-point local diagnostic parser that exposes exactly how machines parse the text, highlighting column ambiguities, missing headers, and unparsed tables.
2. **Resume Inflation:** Candidates copy AI-generated bullet points featuring grandiose claims (e.g., "Scaled database to 1M QPS"). When asked for p99 latency figures in interviews, they freeze.
   * *ProofCoach Fix:* Claim extraction algorithms identify every quantified statement and force the candidate to verify it in the Evidence Graph before locking it into the resume.
3. **Disconnected Mock Interviews:** Interview platforms ask generic behavioral or leetcode questions completely decoupled from what is written on the candidate's CV.
   * *ProofCoach Fix:* The Adaptive Interview engine extracts the candidate's specific claims (e.g., "Reduced latency by 35%") and initiates an evidence challenge specifically probing that sentence.
4. **Passive Learning:** Students spend hundreds of hours watching tutorials without writing code, retaining very little practical knowledge.
   * *ProofCoach Fix:* The Video Study Planner and Project Lab enforce an active 75% learning / 25% practice split, requiring learners to build concrete code artifacts for every studied module.
5. **Burnout and Overwork:** High-stress job preparation often results in endless, unstructured cramming sessions with diminishing cognitive returns.
   * *ProofCoach Fix:* The Focus Shield establishes strict 150-minute study limits, provides session autosaving, and suppresses in-app noise to encourage healthy learning habits.

---

## 5. Complete Product Map

ProofCoach AI comprises **13 distinct client routes** organized into four functional quadrants:

```mermaid
flowchart TD
    subgraph ProofCoach Workspace
        direction TB
        subgraph Onboarding & Identity
            R1["/ (Landing Page)"]
            R2["/onboarding (Candidate Setup)"]
            R3["/profile (Command Centre)"]
            R4["/dashboard (Legacy Redirect)"]
        end

        subgraph Evidence & Alignment
            R5["/resume (Resume Lab)"]
            R6["/role (Target Role)"]
            R7["/evidence (Evidence Graph)"]
        end

        subgraph Verification & Challenge
            R8["/interview (Adaptive Interview)"]
            R9["/feedback (Evidence Feedback)"]
        end

        subgraph Growth Loop & Execution
            R10["/learn (Learning Plan)"]
            R11["/video-plan (Video Study Planner)"]
            R12["/project-lab (Project Lab)"]
            R13["/quest (Career Quest)"]
            R14["/focus (Focus Shield)"]
        end

        subgraph System Governance
            R15["/settings (Privacy & Runtime)"]
        end
    end

    R1 --> R2 --> R3
    R3 --> R5 --> R6 --> R7 --> R8 --> R9 --> R10
    R10 --> R11
    R10 --> R12
    R12 --> R13
    R10 --> R14
    R3 -.-> R15
```

### Route Index and Component Responsibilities

| Route | View Component | Core Purpose & User Capabilities | Data Dependencies |
| :--- | :--- | :--- | :--- |
| `/` | `LandingPage.tsx` | High-impact product overview, feature cards, deterministic demo entry point. | Static demo fixtures |
| `/onboarding` | `OnboardingPage.tsx` | 3-step setup: Candidate details, target role selection, practice/interviewer preferences. | `ProofContext` |
| `/profile` | `ProfilePage.tsx` | Comprehensive candidate dossier embedding the central command center metrics. | `DemoState.candidate`, `metrics` |
| `/dashboard` | `DashboardPage.tsx` | Redirects to `/profile`; provides the 6-score diagnostic grid, priority alerts, and next 48h tasks. | `DemoState.metrics`, `completed` |
| `/resume` | `ResumePage.tsx` | Drag-and-drop PDF/DOCX parser, 8-part robustness breakdown, measurable claim detector. | Local FastAPI `/api/resume/parse` |
| `/role` | `RolePage.tsx` | Role selector & custom job description parser; skill coverage matrix & gap extraction. | Local FastAPI `/api/role/analyze` |
| `/evidence` | `EvidencePage.tsx` | Interactive React Flow DAG mapping candidate skills to projects, claims, and role specs. | `DemoState.candidate`, local API |
| `/interview` | `InterviewPage.tsx` | Real-time adaptive interview arena; Web Speech audio synthesis & transcription; level A-F probes. | Local FastAPI `/api/interview/*` |
| `/feedback` | `FeedbackPage.tsx` | Recharts radar breakdown, claim truth loop (before vs after), Evidence Lock rewrite sandbox. | `DemoState.evaluation`, local API |
| `/learn` | `LearnPage.tsx` | Prioritized gap-closure curriculum; verified free documentation links; daily study schedules. | Local FastAPI `/api/learning/plan` |
| `/video-plan` | `VideoPlanPage.tsx` | YouTube embed study orchestrator; timestamped note capture; 5-tier comprehension funnel. | `DemoState.video`, `video.ts` |
| `/project-lab` | `ProjectLabPage.tsx` | 9-stage engineering journey; Kanban task organizer; resume evidence generation. | `DemoState.project` |
| `/quest` | `QuestPage.tsx` | Gamified progression system; 3 tiers (Build, Prove, Perform); transparent XP reward rules. | `DemoState.metrics.questPoints` |
| `/focus` | `FocusPage.tsx` | Distraction-reduced workspace; 150m wellbeing countdown; 20s demo timer; autosave trigger. | `localStorage` (`proofcoach-focus-v1`) |
| `/settings` | `SettingsPage.tsx` | Dark/light theme switch, runtime mode inspector, JSON progress export, local data purge. | `ProofContext`, `/api/data` |

---

## 6. System Architecture

ProofCoach AI employs a modern, decoupled client-server architecture engineered specifically for local execution, low resource overhead, and strict privacy boundaries.

```mermaid
flowchart TB
    subgraph Client Architecture [Browser Client: React 19 + Vite 7]
        direction TB
        UI["User Interface (Shell, Panels, ScoreRings)"]
        Router["React Router 7 (Lazy-Loaded Routes)"]
        State["ProofContext (Zustand-Style React Context)"]
        StorageEngine["Browser LocalStorage (proofcoach-demo-v1)"]
        AudioEngine["Web Speech API (Synthesis & Recognition)"]
        Visuals["React Flow (Graph) + Recharts (Radar/Bars)"]

        UI --> Router
        Router --> State
        State <--> StorageEngine
        UI <--> AudioEngine
        UI <--> Visuals
    end

    subgraph TransportLayer [Local Network Transport]
        HTTP["HTTP / JSON (RESTful Endpoints)"]
        FormData["multipart/form-data (Resume Uploads)"]
    end

    subgraph Server Architecture [Local Backend: FastAPI + Python 3.11+]
        direction TB
        API["FastAPI Routing Engine (app/main.py)"]
        CORS["CORS Middleware (Restricted to localhost:5173)"]
        Services["Domain Services (resume, evidence, interview, focus)"]
        DocParsers["Document Parsers (PyMuPDF & python-docx)"]
        AIInterface["AIProvider Base Interface (app/providers/base.py)"]
        DeterministicEngine["DeterministicAIProvider (Zero-Network Demo)"]
        OllamaEngine["OllamaProvider (Optional Local LLM)"]
        DBEngine["SQLModel / SQLAlchemy ORM"]
        SQLite[(Local SQLite Database: proofcoach.db)]

        API --> CORS --> Services
        Services --> DocParsers
        Services --> AIInterface
        AIInterface --> DeterministicEngine
        AIInterface -. optional .-> OllamaEngine
        Services --> DBEngine --> SQLite
    end

    State <==>|apiFetch / JSON| HTTP <==> API
    UI ==>|Upload File| FormData ==> API
```

### 6.1 Architectural Subsystems
1. **Presentation Layer (React 19 SPA):** Utilizes Vite for bundling. Reusable atomic UI primitives (`Panel`, `ScoreRing`, `StatusPill`, `PageIntro`) ensure visual consistency across both Dark Navy and White Editorial themes.
2. **State & Reactive Store (`ProofContext.tsx`):** Maintains application-wide reactivity. Persists non-sensitive candidate configuration, active project state, video notes, and diagnostic scores to `localStorage` under key `proofcoach-demo-v1`.
3. **Transport Layer (`api.ts`):** Centralizes all HTTP communication with the backend (`http://localhost:8000`). Automatically handles network timeouts, JSON parsing, error marshalling, and transparent fallback to local demo data if the server is unreachable.
4. **Backend Application (`app/main.py`):** Built with FastAPI and Starlette. Implements asynchronous lifespan management to automatically initialize the SQLite database schema on startup without external migration scripts.
5. **Document Extraction Subsystem (`services/resume.py`):** Uses PyMuPDF (`fitz`) for PDF page extraction, character counting, and bounding-box spatial analysis to identify multi-column formatting. Uses `python-docx` to traverse paragraph and table XML trees.
6. **Heuristic & Rule Engines:** Pure Python service functions execute claim detection, skill extraction, coverage scoring, answer evaluation, and Evidence Lock filtering using deterministic pattern matching.
7. **Persistence Subsystem (`app/db.py` & `app/models.py`):** Built with SQLModel. Manages local tables for `CandidateProfile`, `ResumeRecord`, and `InterviewSession` within an embedded SQLite database.

---

## 7. Complete User Journey: A Day in the Life

To understand how ProofCoach operates in practice, consider the end-to-end journey of **Alex**, a second-year AI & Machine Learning student preparing for a Backend Developer role.

```mermaid
sequenceDiagram
    autonumber
    actor User as Alex (Candidate)
    participant UI as ProofCoach UI
    participant Ctx as ProofContext (Browser)
    participant API as FastAPI Backend
    participant Doc as PyMuPDF / docx
    participant DB as SQLite DB

    Note over User, UI: Phase 1: Onboarding & Setup
    User->>UI: Enters Name, Education, Target Role (Backend Dev)
    UI->>Ctx: updateCandidate() -> commits to localStorage
    UI->>User: Displays Command Centre with initial baseline metrics

    Note over User, UI: Phase 2: Resume Lab & Parsing
    User->>UI: Uploads resume.pdf (contains 35% latency claim)
    UI->>API: POST /api/resume/parse (multipart form)
    API->>Doc: Extract text blocks & layout coordinates
    Doc-->>API: Returns text + detected two-column layout
    API->>API: Calculate Parser Robustness (82/100) & Extract claims
    API-->>UI: Returns ParserAnalysis JSON
    UI->>User: Displays layout warnings & detected claims

    Note over User, UI: Phase 3: Alignment & Evidence Mapping
    User->>UI: Selects Target Role (Backend Developer)
    UI->>API: POST /api/role/analyze
    API-->>UI: Required: Python, REST, SQL, Docker, Testing, SysDesign
    UI->>Ctx: Matches candidate skills -> identifies 3 gaps (Docker, Testing, SysDesign)
    User->>UI: Inspects Career Evidence Graph
    UI->>User: Renders interactive DAG showing broken link at Docker

    Note over User, UI: Phase 4: Live Adaptive Interview
    User->>UI: Launches Interview for "Reduced latency by 35%"
    UI->>API: POST /api/interview/start
    API->>DB: Create InterviewSession record
    API-->>UI: Returns Question 1 (Level D: Evidence Verification)
    UI->>User: Speaks question aloud via Web Speech API
    User->>UI: Speaks/Types answer ("Baseline was 420ms, used caching...")
    User->>UI: Clicks "Submit evidence"
    UI->>API: POST /api/interview/{id}/answer
    API->>API: evaluate_answer() -> scores dimensions & structure
    API->>DB: Append transcript JSON
    API-->>UI: Returns evaluation & Next Question (Level E: Trade-offs)
    UI->>Ctx: submitInterview(evaluation) -> updates XP (+50 XP)

    Note over User, UI: Phase 5: Feedback & Evidence Lock
    UI->>User: Shows radar chart, truth loop (+24% claim confidence)
    User->>UI: Tests rewrite: "Reduced API latency by 40%"
    UI->>API: POST /api/evidence-lock/rewrite
    API-->>UI: Status BLOCKED (40% is unsupported)
    UI->>User: Shows Red Warning: Evidence Lock blocked fabrication

    Note over User, UI: Phase 6: Targeted Gap Closure
    User->>UI: Opens Personalized Learning Plan
    UI->>API: POST /api/learning/plan (gaps: Docker, Testing)
    API-->>UI: Returns structured curriculum & verified doc links
    User->>UI: Opens Project Lab -> creates "FastAPI Containerization"
    User->>UI: Completes project task -> progress updates to 24%
    User->>UI: Activates Focus Shield -> 150m timer counts down
    UI->>Ctx: Autosaves session state locally
```
"""
