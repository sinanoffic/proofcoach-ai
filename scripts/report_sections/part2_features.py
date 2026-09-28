"""
Part 2: Detailed Feature Breakdown (Chapters 8 to 19)
Covers all 12 core application pages with Level 1, Level 2, and Level 3 explanations,
screenshots, interaction workflows, and developer mechanics.
"""

CONTENT = """
## 8. Profile & Command Centre

### 8.1 Overview & Purpose
The Profile & Command Centre (`/profile`) serves as the central administrative cockpit of ProofCoach AI. It brings together the candidate's personal identity, academic background, target role parameters, daily practice constraints, and interviewer configuration alongside real-time diagnostic performance metrics.

<figure>
  <img src="screenshots/profile.png" alt="Profile and Command Centre" />
  <figcaption>Figure 8.1: Profile & Command Centre dashboard showing candidate dossier, six independent evidence metrics, and next 48-hour action items.</figcaption>
</figure>

### 8.2 Three-Layer Analysis

#### Level 1 — Simple Explanation (User View)
The candidate sees their name, educational status, target career, and daily study goal. Directly below, six diagnostic scores summarize how well their resume parses, how many skills are backed by evidence, how ready they are for interviews, how well their claims hold up, how much learning they have completed, and their current Career Quest rank. A "Next 48 Hours" action panel highlights the single most important task to work on today.

#### Level 2 — Internal Explanation (System Logic)
When `/profile` mounts, the component extracts the `candidate` object and `metrics` record from `ProofContext`. The daily time budget (stored as total minutes, e.g., 150) is formatted into human-readable hours and minutes (`2h 30m per day`). If the candidate has configured voluntary gender and selected the "Auto Pair" persona, the system renders a voluntary badge; otherwise, demographic fields remain entirely hidden. The embedded `DashboardPage` calculates the overall readiness distribution across six distinct metrics without ever combining them into a single black-box score.

#### Level 3 — Developer View (Technical Specification)
- **Source Files:** `frontend/src/pages/ProfilePage.tsx`, `frontend/src/pages/DashboardPage.tsx`
- **Component Hierarchy:** `Shell` → `ProfilePage` → `Panel`, `Detail`, `DashboardPage` → `ScoreRing`, `StatusPill`
- **State Consumed:** `state.candidate: Candidate`, `state.metrics: Record<MetricKey, number>`, `state.completed: string[]`
- **API Dependencies:** None for initial display; data is served directly from the reactive `ProofContext` store initialized from `localStorage`.
- **Persistence:** State updates trigger `localStorage.setItem('proofcoach-demo-v1', JSON.stringify(next))`.
- **Failure Modes:** If `localStorage` is empty or corrupted, `loadState()` gracefully catches the JSON parse error and populates the view with `initialDemoState`.

---

## 9. Resume Lab & Parser Robustness Engine

### 9.1 Overview & Purpose
The Resume Lab (`/resume`) provides an unvarnished, transparent diagnostic of how automated applicant-tracking systems and machine parsers interpret an uploaded resume. It explicitly rejects commercial "ATS Score" claims, instead computing a multi-attribute **Parser Robustness Score (0–100)** with spatial layout warnings.

<figure>
  <img src="screenshots/resume.png" alt="Resume Lab Interface" />
  <figcaption>Figure 9.1: Resume Lab interface displaying local file upload dropzone, recovered text preview, 8-part parser checks, and layout warnings.</figcaption>
</figure>

### 9.2 The Eight-Point Robustness Rubric
The local parser evaluates documents across 8 distinct criteria totaling 100 points:

| Check Item | Maximum Points | Passing Condition | Warning Condition & Diagnostic |
| :--- | :---: | :--- | :--- |
| **1. Text Extraction** | 20 | Text ratio $\ge 0.75$ ($\ge 675$ chars) | Less than 675 chars recovered; points scaled proportionally. |
| **2. Contact Details** | 10 | Valid email AND phone regex match | Missing email or phone format; awards 5/10. |
| **3. Recognizable Sections** | 15 | $\ge 3$ standard section headers found | Fewer than 3 headers; awards 3 pts per detected header. |
| **4. Timeline Dates** | 10 | Year (19xx/20xx) or Month names found | No recognized timeline markers; awards 4/10. |
| **5. Skill Vocabulary** | 15 | $\ge 4$ recognized catalog skills found | Fewer than 4 skills; awards 3 pts per detected skill. |
| **6. Projects Section** | 10 | Project section header recovered | Project header missing; awards 0/10. |
| **7. Two-Column Layout** | 10 | Single column reading order | Two-column layout detected via horizontal block coordinates; penalizes 6 pts (awards 4/10). |
| **8. Table Content** | 10 | No tables detected (linear text) | Word tables detected; penalizes 6 pts (awards 4/10). |

### 9.3 Three-Layer Analysis

#### Level 1 — Simple Explanation (User View)
The user drags and drops a PDF or DOCX file (under 8 MB). The screen immediately shows what text the machine was able to extract, highlights any detected skills, and lists every measurable claim found in the document. A large score ring displays the Parser Robustness score with clear warnings (e.g., "Two-column layout warning: reading order may be ambiguous").

#### Level 2 — Internal Explanation (System Logic)
1. In local mode, the file is transmitted as a `multipart/form-data` payload to `POST /api/resume/parse`.
2. PyMuPDF (`fitz`) opens the PDF stream in RAM. It computes the midpoint of each page (`rect.width / 2`). If bounding boxes are found on both the left and right of the midpoint simultaneously, `layout["two_column"]` is set to `True`.
3. For DOCX files, `python-docx` traverses paragraphs and table cell text, setting `layout["tables"] = True` if any table objects exist.
4. Regex filters scan for measurable claims using a pattern matching percentages, numerical multipliers, and active impact verbs.
5. The 8 checks are computed, summed, and returned alongside an 800-character plain-text preview.

#### Level 3 — Developer View (Technical Specification)
- **Source Files:** `frontend/src/pages/ResumePage.tsx`, `backend/app/services/resume.py`, `backend/app/main.py`
- **Functions:** `parseResume(file: File)`, `extract_text()`, `analyze_resume_text()`, `extract_claims()`
- **Regex Patterns:**
  - *Claims:* `(\b\d+(?:\.\d+)?\s*%|\b\d+[kKmM]?\+?\s+(?:users?|requests?|clients?)|(?:reduced|increased|improved|accelerated|saved|grew|led|managed|scaled|optimized))`
  - *Email:* `[\w.+-]+@[\w.-]+\.[A-Za-z]{2,}`
  - *Phone:* `(?:\+?\d[\s-]?){8,14}`
- **Fallback Behavior:** If the FastAPI backend is offline, `ResumePage` catches the network error, sets `status` to a transparent warning, and renders the deterministic demo analysis (82/100 robustness, 2 layout warnings).

---

## 10. Target Role Analysis

### 10.1 Overview & Purpose
The Target Role module (`/role`) translates ambiguous job postings into clear evidence requirements. Rather than performing simple keyword density counts, it categorizes skills into required competencies, preferred tools, and core engineering responsibilities.

<figure>
  <img src="screenshots/role.png" alt="Target Role Interface" />
  <figcaption>Figure 10.1: Target Role analysis comparing candidate qualifications against Backend Developer requirements, highlighting gaps in Docker, Testing, and System Design.</figcaption>
</figure>

### 10.2 Three-Layer Analysis

#### Level 1 — Simple Explanation (User View)
The candidate selects a predefined demo role (e.g., Backend Developer, Frontend Developer, ML Engineer) or pastes a raw job description. The system instantly highlights which required skills the candidate already has evidence for (e.g., Python, REST, SQL) and marks missing skills as red gap indicators (e.g., Docker, Testing, System Design).

#### Level 2 — Internal Explanation (System Logic)
When the user submits a job description, `POST /api/role/analyze` searches the text against `DEMO_REQUIREMENTS`. If custom text is provided, regex word boundaries identify mentioned skills. The candidate's skills are compared case-insensitively against the requirements. The system computes coverage percentage, identifies the strongest evidence area, and extracts the top 3 critical gaps to feed into the learning pipeline.

#### Level 3 — Developer View (Technical Specification)
- **Source Files:** `frontend/src/pages/RolePage.tsx`, `backend/app/services/evidence.py`
- **Functions:** `role_analyze()`, `analyze_job()`, `skill_coverage()`
- **Data Models:**
  ```typescript
  interface RoleAnalysis {
    role: string;
    required_skills: string[];
    preferred_skills: string[];
    responsibilities: string[];
    competencies: string[];
    experience_requirement: string;
  }
  ```
- **Coverage Status Logic:**
  - `strong`: Skill is present and part of primary evidence (e.g., Python, REST).
  - `evidence` / `partial`: Skill is detected in candidate profile with limited project depth.
  - `missing`: Skill is required by role but absent from candidate profile.

---

## 11. Career Evidence Graph System

### 11.1 Overview & Purpose
The Career Evidence Graph (`/evidence`) visualizes the candidate's professional claims as an interactive Directed Acyclic Graph (DAG). It implements the core principle that a resume bullet point is not verified evidence until it connects a candidate to a skill, a project, a measurable claim, an interview defense, and an explicit job requirement.

<figure>
  <img src="screenshots/evidence.png" alt="Career Evidence Graph" />
  <figcaption>Figure 11.1: Interactive Career Evidence Graph rendered via React Flow, tracing the verified Python path alongside the broken Docker evidence chain.</figcaption>
</figure>

### 11.2 Three-Layer Analysis

#### Level 1 — Simple Explanation (User View)
The user explores an interactive visual map with movable nodes. A green path traces supported evidence: Candidate → Python → Flood Prediction API → 35% Latency Claim → Interview Defense → Target Role. A red broken path highlights an evidence gap: Candidate → Docker → No Project Evidence → Gap. Clicking any node opens an Inspector sidebar detailing the node's source, evidence strength, and the exact next action needed.

#### Level 2 — Internal Explanation (System Logic)
The graph is generated using `@xyflow/react` (React Flow). Node types are mapped to a custom `EvidenceNode` component. Node positions ($x, y$) are calculated to enforce a left-to-right progression across six horizontal stages. Edges connecting verified nodes are styled with crystal-blue animated strokes (`#27c4ff` or `#1769ff`), while edges connecting missing or unverified nodes are styled with red warning borders and static dashed markers.

#### Level 3 — Developer View (Technical Specification)
- **Source Files:** `frontend/src/pages/EvidencePage.tsx`, `backend/app/services/evidence.py`
- **Graph Primitives:**
  - Nodes: `c` (Candidate), `p` (Python), `d` (Docker), `project` (Flood API), `gap` (No project), `claim` (35% claim), `interview` (Interview session), `role` (Backend requirement).
  - Inspector State: `selected: Node | null` triggers slide-in panel displaying `detail.kind`, `detail.status`, `detail.note`, and contextual next actions.
  - Color Modes: Bound to `useTheme()` to ensure background grid dots and edge colors automatically adapt between dark navy and light editorial themes.

---

## 12. Live Adaptive Interview Engine

### 12.1 Overview & Purpose
The Live Adaptive Interview (`/interview`) provides a stateful, interactive environment where candidates are interrogated on their specific resume claims. It completely rejects canned, non-contextual interview scripts, instead deploying an adaptive probing progression from Level A through Level F.

<figure>
  <img src="screenshots/interview.png" alt="Live Adaptive Interview Workspace" />
  <figcaption>Figure 12.1: Live Adaptive Interview workspace with real-time timer, Level D question probe, voice transcription controls, and observable communication metrics.</figcaption>
</figure>

### 12.2 The Six-Level Adaptive Probing Taxonomy

```mermaid
stateDiagram-v2
    [*] --> LevelA: Candidate Answers
    LevelA: Level A — Clarification\n(Explain basic terminology)
    LevelB: Level B — Ownership\n(What was your personal contribution?)
    LevelC: Level C — Technical Depth\n(Explain internal architecture)
    LevelD: Level D — Evidence Verification\n(What was baseline & measurement?)
    LevelE: Level E — Trade-offs\n(Downsides & when to avoid approach)
    LevelF: Level F — Pressure / Counterfactual\n(System failure & 10x traffic scale)

    LevelD --> LevelE: Strong Answer (Clear baseline + ownership)
    LevelD --> LevelA: Weak Answer (Vague explanation)
    LevelE --> LevelF: Deep Trade-off Mastery
    LevelE --> LevelB: Vague Contribution
```

### 12.3 Three-Layer Analysis

#### Level 1 — Simple Explanation (User View)
The user faces an AI interviewer avatar. The current question challenges their 35% latency claim: *"What was the original baseline, how did you measure the improvement, and what did you personally change?"* The user can click a speaker icon to hear the question spoken aloud, and can respond either by typing into a structured text box or speaking via browser speech recognition. A word counter and session timer track progress.

#### Level 2 — Internal Explanation (System Logic)
1. On component mount, the frontend calls `POST /api/interview/start` to register an active session in SQLite and fetch Question 0 (Level D).
2. The user speaks or types. If voice is activated, the Web Speech API (`webkitSpeechRecognition`) streams interim transcripts into local state.
3. Upon clicking "Submit evidence", the text is transmitted to `POST /api/interview/{session_id}/answer`.
4. The backend evaluation service parses the answer for baseline markers (`\d+\s*(?:ms|seconds?|%)`), measurement terms (`benchmark`, `postman`, `p95`), personal pronouns (`I changed`, `I implemented`), trade-off terms (`cache invalidation`, `memory cost`), and filler words (`um`, `uh`, `like`).
5. A detailed evaluation payload is returned, updating the session transcript and determining the next question level.

#### Level 3 — Developer View (Technical Specification)
- **Source Files:** `frontend/src/pages/InterviewPage.tsx`, `backend/app/services/interview.py`, `backend/app/main.py`
- **State Properties:** `state.answer: string`, `state.interviewSessionId: number | null`, `currentQ: { level, label, reason, text }`
- **Browser APIs Used:** `window.speechSynthesis` (for text-to-speech), `window.SpeechRecognition` / `window.webkitSpeechRecognition` (for voice input).
- **Communication Indicators Observed:**
  - `word_count`: Total tokens extracted via `\b[\w'-]+\b`.
  - `filler_words`: Count of `um`, `uh`, `like`, `basically`.
  - `answer_structure`: Classified as `clear` if $\ge 45$ words with structured markers; otherwise `developing`.
  - `relevance`: Evaluated based on domain keywords (`latency`, `api`, `cache`, `measure`).

---

## 13. Evidence Feedback Engine & Evidence Lock

### 13.1 Overview & Purpose
The Feedback Engine (`/feedback`) delivers structured, multi-dimensional feedback following an interview. It features the **Resume Truth Loop**, which quantifies how the interview changed demonstrated claim confidence, and **Evidence Lock**, an interactive sandbox that protects candidates from generating fraudulent resume bullets.

<figure>
  <img src="screenshots/feedback.png" alt="Evidence Feedback Dashboard" />
  <figcaption>Figure 13.1: Evidence Feedback dashboard featuring the Claim Truth Loop (58% to 82%), 6-dimension radar chart, and Evidence Lock rewrite test.</figcaption>
</figure>

### 13.2 Three-Layer Analysis

#### Level 1 — Simple Explanation (User View)
The screen displays a radar chart covering 6 dimensions: Fundamentals, Problem Solving, Ownership, Communication, Evidence, and Learning. The Resume Truth Loop shows that demonstrated confidence in the 35% latency claim increased from 58% to 82%. In the Evidence Lock box, the user can test two rewrites: a safe version ("Optimized API response performance") which is approved, and an unsupported version ("Reduced API latency by 40%") which is immediately blocked.

#### Level 2 — Internal Explanation (System Logic)
The 82% claim confidence score does not claim independent real-world truth; it reflects the candidate's demonstrated ability to substantiate their baseline (420 ms) and measurement method (Postman runs). Evidence Lock enforces rules via `assess_rewrite()` in `backend/app/services/evidence_lock.py`:
- Checks proposed text against confirmed numerical facts and technology keywords (`TECH_TERMS`).
- If an unsupported number (e.g., `40%`) or technology (e.g., `Kubernetes`) appears in the rewrite without existing in the original bullet or confirmed facts, `status` returns `blocked` with a red UI token.
- If only stylistic words change, `status` returns `safe`.

#### Level 3 — Developer View (Technical Specification)
- **Source Files:** `frontend/src/pages/FeedbackPage.tsx`, `backend/app/services/evidence_lock.py`
- **Visual Primitives:** Recharts `<RadarChart>` wrapped inside `<ResponsiveContainer width="100%" height={285}>`.
- **Dimensions Evaluated:**
  ```python
  dimensions = {
      "baseline": "yes" if baseline else "partial",
      "measurement": "yes" if measurement and has_digits else "partial" if measurement else "weak",
      "personal_contribution": "yes" if ownership else "partial",
      "trade_offs": "yes" if tradeoffs else "weak",
      "scaling_knowledge": "yes" if scaling else "weak",
  }
  ```
- **Confidence Formula:**
  $$\text{Confidence}_{\text{after}} = \min(88, 58 + 8 \times N_{\text{yes}} + 4 \times N_{\text{partial}})$$

---

## 14. Personalized Learning Plan

### 14.1 Overview & Purpose
The Learning Plan (`/learn`) closes the loop between interview failures and technical remediation. Instead of recommending 40-hour video courses, it generates concise, high-priority learning tracks targeting the candidate's exact role gaps.

<figure>
  <img src="screenshots/learn.png" alt="Personalized Learning Plan" />
  <figcaption>Figure 14.1: Personalized Learning Plan prioritizing Docker (Role Blocker), Testing (Gap), and System Design (Gap) with direct links to official documentation.</figcaption>
</figure>

### 14.2 Three-Layer Analysis

#### Level 1 — Simple Explanation (User View)
The user sees their target daily study time (2h 30m / day) divided into a 75% learning / 25% practice split. Three prioritized cards address their gaps: Priority 1 (Docker - Role Blocker), Priority 2 (Testing - Gap), and Priority 3 (System Design - Gap). Each card provides a direct link to free, authoritative documentation (e.g., Docker Get Started, pytest docs) and assigns a mandatory artifact to build.

#### Level 2 — Internal Explanation (System Logic)
The component dispatches `POST /api/learning/plan` with the candidate's identified gaps and daily time budget. The backend maps each gap to verified primary resources in `RESOURCE_CATALOG`. Crucially, every task enforces an active triad:
1. **Learn:** Study official documentation.
2. **Build Evidence:** Create a concrete code artifact (e.g., "Containerize the FastAPI backend").
3. **Practice:** Complete a 5-question PYQ-style practice set.

#### Level 3 — Developer View (Technical Specification)
- **Source Files:** `frontend/src/pages/LearnPage.tsx`, `backend/app/services/learning.py`
- **State Binding:** Dynamic time allocation calculated as:
  ```typescript
  const hours = Math.floor(state.candidate.dailyMinutes / 60);
  const mins = state.candidate.dailyMinutes % 60;
  ```
- **Source Honesty Policy:** Every external resource explicitly displays its provider, estimated time, and cost. If a certificate is not verified, the UI states: *"These recommendations do not claim a certificate."*

---

## 15. Video Study Planner

### 15.1 Overview & Purpose
The Video Study Planner (`/video-plan`) tackles the pervasive problem of "tutorial hell" by converting passive video consumption into an active, structured study schedule. It enforces an authorized YouTube embed player, daily video chunking, and timestamped note-taking.

<figure>
  <img src="screenshots/video-plan.png" alt="Video Study Planner" />
  <figcaption>Figure 15.1: Video Study Planner featuring authorized YouTube embed, current objective card, note-taking timeline, and 5-stage comprehension funnel.</figcaption>
</figure>

### 15.2 Three-Layer Analysis

#### Level 1 — Simple Explanation (User View)
The candidate pastes a YouTube tutorial link. The planner embeds the video using privacy-enhanced mode (`youtube-nocookie.com`). As they watch, they can click "Add note" or "Mark important" to save timestamped notes. A 5-stage comprehension funnel tracks progress across: Watched (45%) → Understood (30%) → Practiced (15%) → Applied (10%) → Proven (5%). A daily planner breaks a multi-hour tutorial into manageable day-by-day segments.

#### Level 2 — Internal Explanation (System Logic)
The component validates the URL using `videoId()` in `services/video.ts`, strictly requiring an 11-character alphanumeric video ID from `youtu.be` or `youtube.com`. Daily sessions are computed using the formula:
$$\text{Learning Budget} = \text{round}(\text{Daily Minutes} \times 0.75)$$
$$\text{Days Required} = \lceil \text{Duration} / \text{Learning Budget} \rceil$$
Notes taken during playback are committed to `state.video.notes` in `ProofContext` and survive page refreshes.

#### Level 3 — Developer View (Technical Specification)
- **Source Files:** `frontend/src/pages/VideoPlanPage.tsx`, `frontend/src/services/video.ts`, `backend/app/services/learning.py`
- **State Data Model:**
  ```typescript
  interface VideoNote {
    id: string;
    timestamp: number;
    topic: string;
    text: string;
  }
  interface VideoState {
    watched: number;
    understood: number;
    practiced: number;
    applied: number;
    proven: number;
    notes: VideoNote[];
  }
  ```
- **Copyright & Privacy Boundary:** The application never downloads, scrapes, or stores copyrighted video streams. It uses the official YouTube iframe embed with `referrerPolicy="strict-origin-when-cross-origin"`.

---

## 16. Project Lab: Artifact Engineering

### 16.1 Overview & Purpose
The Project Lab (`/project-lab`) is ProofCoach AI's execution engine. It ensures that students and freshers do not merely accumulate theoretical knowledge, but build, test, and document real software artifacts that can withstand technical scrutiny.

<figure>
  <img src="screenshots/project-lab.png" alt="Project Lab Dashboard" />
  <figcaption>Figure 16.1: Project Lab workspace displaying the 9-stage engineering journey, dynamic task board (NEXT / THIS WEEK / LATER), and interview defense preview.</figcaption>
</figure>

### 16.2 The Nine-Stage Engineering Journey
Every project progresses through an industry-standard development lifecycle:

```mermaid
flowchart LR
    S1[1. IDEA] --> S2[2. RESEARCH] --> S3[3. PLAN] --> S4[4. BUILD] --> S5[5. TEST] --> S6[6. IMPROVE] --> S7[7. DOCUMENT] --> S8[8. DEPLOY] --> S9[9. DEFEND]
```

### 16.3 Three-Layer Analysis

#### Level 1 — Simple Explanation (User View)
The user manages their active project (e.g., "AI SafeRoute - Flood Prediction API"). An engineering progress bar shows completion (24%). A Kanban task board divides actions into NEXT, THIS WEEK, LATER, and COMPLETED. Clicking any task marks it complete, immediately advancing project progress. A "Defend This Project" panel previews three core questions that an interviewer will ask about the project.

#### Level 2 — Internal Explanation (System Logic)
When a candidate checks off a task, `completeTask(taskId)` is dispatched to `ProofContext`. The task's stage transitions to `COMPLETED`, its `completed` boolean flag is set to `true`, and overall project progress advances incrementally:
$$\text{Progress}_{\text{next}} = \min(100, \text{Progress}_{\text{current}} + 4)$$
Completed tasks with attached evidence strings automatically populate the "Project Evidence" panel, providing one-click export into the Resume Lab.

#### Level 3 — Developer View (Technical Specification)
- **Source Files:** `frontend/src/pages/ProjectLabPage.tsx`, `frontend/src/types.ts`
- **State Data Model:**
  ```typescript
  interface ProjectTask {
    id: string;
    title: string;
    stage: 'NEXT' | 'THIS WEEK' | 'LATER' | 'COMPLETED';
    completed: boolean;
    priority?: string;
    evidence?: string;
    skill?: string;
  }
  interface ProjectState {
    id: string;
    name: string;
    goal: string;
    stage: string;
    progress: number;
    tasks: ProjectTask[];
  }
  ```
- **New Project Wizard:** If `state.project` is null, `ProjectLabPage` renders an embedded two-step setup wizard allowing the candidate to initialize a custom project with custom objectives.

---

## 17. Career Quest Progression Engine

### 17.1 Overview & Purpose
Career Quest (`/quest`) gamifies the career preparation journey through transparent, merit-based Evidence XP. It explicitly avoids dark-pattern gamification (e.g., daily login streaks or superficial clicks), rewarding only verified, artifact-backed achievements.

<figure>
  <img src="screenshots/quest.png" alt="Career Quest Progression" />
  <figcaption>Figure 17.1: Career Quest progression screen displaying current Evidence XP (185 XP), Level 2 Pathfinder rank, and transparent point rules.</figcaption>
</figure>

### 17.2 The Three Quest Tiers & XP Rules

| Quest Level | Name | Theme | Key Included Work | Level Reward |
| :---: | :--- | :--- | :--- | :---: |
| **Level 1** | **Build** | Foundation | Upload resume, fix parser warnings, select role, map evidence graph. | 100 XP |
| **Level 2** | **Prove** | Competency | Verify claims, complete learning modules, build gap artifacts, Evidence Lock rewrite. | 150 XP |
| **Level 3** | **Perform** | Mastery | Live interview defense, deep trade-off interrogation, final simulated interview. | 250 XP |

#### Transparent Action-Linked Rewards:
- Resume fix: `+20 XP`
- Evidence added: `+25 XP`
- Lesson completed: `+10 XP`
- Quiz passed: `+15 XP`
- Adaptive Interview completed: `+30 XP` (seeded demo awards `+50 XP` for comprehensive defense)
- Claim improved: `+20 XP`
- Complete tier milestone: `+100 XP`

### 17.3 Three-Layer Analysis
- **Level 1 (User View):** The user tracks their Evidence XP (185 XP) and rank ("Pathfinder - Level 2"). Level 1 is marked Complete with green checkmarks, Level 2 is Active, and Level 3 is Locked until Level 2 tasks are fulfilled.
- **Level 2 (Internal Logic):** XP is stored in `state.metrics.questPoints`. Progression percentage is derived as `questPoints / 4`. Submitting an interview automatically increments `questPoints` by 50 in `submitInterview()`.
- **Level 3 (Developer View):** Defined in `frontend/src/pages/QuestPage.tsx` and seeded via `questLevels` in `frontend/src/data/demo.ts`.

---

## 18. Focus Shield & Wellbeing System

### 18.1 Overview & Purpose
Focus Shield (`/focus`) provides an intensive, distraction-minimized study environment with an integrated wellbeing governor. It ensures that candidates maintain healthy learning habits by enforcing a 2.5-hour maximum continuous study session with automatic progress autosaving.

<figure>
  <img src="screenshots/focus.png" alt="Focus Shield Workspace" />
  <figcaption>Figure 18.1: Focus Shield workspace showing circular countdown clock, 20-second demo toggle, and honest Future Mobile Integration disclaimer.</figcaption>
</figure>

### 18.2 Three-Layer Analysis

#### Level 1 — Simple Explanation (User View)
The screen strips away distracting navigation elements, presenting a large circular countdown timer set to a 2h 30m wellbeing limit. Controls allow the user to Start, Pause, Finish, or Reset the session. For quick demonstrations, a "Demo timer mode" toggle compresses the 2.5-hour limit to 20 seconds. An Emergency Contact simulator is provided, accompanied by an honest notice explaining that web browsers cannot block phone calls.

#### Level 2 — Internal Explanation (System Logic)
The timer runs client-side via a 1000 ms `setInterval` loop. The CSS conical gradient (`--progress`) dynamically visualizes elapsed percentage:
$$\text{Progress \%} = \text{round}\left(\frac{\text{Elapsed}}{\text{Limit}}\right) \times 100$$
When `elapsed >= limit`, the session ends automatically, `running` is set to `false`, `ended` is set to `true`, and state is autosaved to `localStorage` under `proofcoach-focus-v1`.

#### Level 3 — Developer View (Technical Specification)
- **Source Files:** `frontend/src/pages/FocusPage.tsx`, `backend/app/services/focus.py`
- **Storage Key:** `proofcoach-focus-v1` storing `{ demo: boolean, elapsed: number, ended: boolean }`.
- **Localhost Optimization:** To eliminate unnecessary network round-trips every second, the timer loop executes entirely in the browser. The backend endpoint `POST /api/focus/status` remains available for server-side state synchronization.
- **Honest System Boundary:** The UI features an explicit warning: *"A browser website cannot guarantee blocking WhatsApp, phone calls, or OS notifications. This prototype does not fake that capability."*

---

## 19. Settings, Runtime Controls & Privacy Purge

### 19.1 Overview & Purpose
The Settings module (`/settings`) implements ProofCoach AI's core privacy and data ownership guarantees. It provides instant theme switching, runtime mode inspection, complete data export, and an irreversible one-click data destruction mechanism.

<figure>
  <img src="screenshots/settings.png" alt="Settings & Privacy Panel" />
  <figcaption>Figure 19.1: Settings and Privacy panel showing appearance options, runtime diagnostic indicators, JSON export, and Delete My Data purge modal.</figcaption>
</figure>

### 19.2 Three-Layer Analysis

#### Level 1 — Simple Explanation (User View)
The user can toggle between Dark Navy and White Editorial themes. Runtime cards confirm that the system is operating in Local-First Demo Mode with zero analytics tracking. Three action buttons allow the candidate to export their entire progress as a JSON file, reset the deterministic demo to its original state, or permanently delete all local data.

#### Level 2 — Internal Explanation (System Logic)
1. **JSON Export:** Serializes the complete reactive `DemoState` object into a formatted JSON Blob and triggers an automated browser download for `proofcoach-progress.json`.
2. **Deterministic Reset:** Calls `resetDemo()` in `ProofContext`, replacing the local state with `initialDemoState`.
3. **Data Purge Cascade:** Clicking "Delete my data" opens an accessible confirmation modal. Upon confirmation, the application dispatches `DELETE /api/data` to the FastAPI backend (which truncates all rows in `CandidateProfile`, `ResumeRecord`, and `InterviewSession`), purges `localStorage` keys `proofcoach-demo-v1` and `proofcoach-focus-v1`, and navigates the user back to the landing page.

#### Level 3 — Developer View (Technical Specification)
- **Source Files:** `frontend/src/pages/SettingsPage.tsx`, `frontend/src/services/api.ts`, `backend/app/main.py`
- **Data Purge Implementation:**
  ```python
  @app.delete("/api/data")
  def delete_my_data(session: Session = Depends(get_session)) -> dict:
      for model in (InterviewSession, ResumeRecord, CandidateProfile):
          session.exec(delete(model))
      session.commit()
      return {"deleted": ["profile", "resume", "interview transcript"], "local_database_retained_empty": True}
  ```
"""
