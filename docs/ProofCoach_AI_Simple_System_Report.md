# PROOFCOACH AI
### Build it. Prove it. Defend it.
**A Simple Guide to How the System Works**

*Current Prototype Architecture · September 2026*

---

## 1. What Is ProofCoach AI?

ProofCoach AI helps students and job seekers prepare for technical careers by connecting their resume statements directly to demonstrable proof.

Instead of merely polishing bullet points to make them sound impressive, ProofCoach AI ensures that:
1. **Machines can read the resume** without layout or parsing errors.
2. **Key claims are backed by evidence** (such as real projects and code).
3. **The candidate can defend those claims** when asked detailed questions in an interview.

```
RESUME (What you write)
   ↓
PROOF (What you built)
   ↓
INTERVIEW (What you defend)
   ↓
FEEDBACK (Where you stand)
   ↓
IMPROVEMENT (What you close)
```

### The Core Problem
Many candidates copy AI-generated bullet points featuring large numbers (for example, *"Reduced API latency by 35%"*). However, in real technical interviews, they freeze when asked: *"What was your baseline? How did you measure it? What trade-offs did you make?"*

ProofCoach AI connects what candidates write on paper with what they can explain and prove in person.

### Who Is It For?
* **Students:** Translate university coursework and personal projects into defensible evidence.
* **Freshers:** Build verifiable project proof to overcome limited commercial work history.
* **Early-Career Professionals:** Prove personal contribution, architectural trade-offs, and optimization benchmarks.
* **Career Switchers:** Map transferable skills directly to a new target role's requirements.

---

## 2. The Complete Product in One View

ProofCoach AI organizes career preparation into an integrated, multi-step workflow where every section feeds into the next:

```
PROFILE & COMMAND CENTRE
   ↓
RESUME LAB
   ↓
TARGET ROLE
   ↓
CAREER EVIDENCE GRAPH
   ↓
ADAPTIVE INTERVIEW
   ↓
EVIDENCE FEEDBACK
   ↓
LEARNING PLAN
   ↓
PROJECT LAB
   ↓
CAREER QUEST
```
*Supporting tools: Focus Shield (wellbeing timer) & Privacy Settings (data control).*

### Major Feature Summary
* **Profile & Command Centre:** Keeps your education, target role, and daily study budget in one private place and displays six clear readiness scores.
* **Resume Lab:** Tests whether your resume can be read accurately by software, checks for layout risks, and extracts measurable claims.
* **Target Role:** Compares your background against job requirements to highlight covered skills and top gaps.
* **Career Evidence Graph:** An interactive visual map connecting your skills and projects to your claims and job requirements.
* **Live Adaptive Interview:** Challenges you with targeted technical questions based on the exact claims written on your resume.
* **Evidence Feedback:** Shows what you explained well, where technical depth was lacking, and prevents unsupported resume rewrites through Evidence Lock.
* **Personalized Learning:** Converts your identified skill gaps into prioritized study tasks with links to official documentation.
* **Project Lab:** Guides you to build hands-on software artifacts rather than passively watching tutorials.
* **Video Study Planner:** Breaks long technical courses into structured daily sessions with timestamped notes.
* **Career Quest:** Tracks your verified progress using transparent levels and action-linked Evidence XP.
* **Focus Shield:** Provides a distraction-reduced workspace with a 2.5-hour wellbeing cap and automatic session saving.
* **Settings & Privacy:** Gives you complete data ownership with JSON progress export and instant one-click data deletion.

---

## 3. What Happens Inside?

ProofCoach AI is built on a clear cause-and-effect data loop. Here is what happens step-by-step:

```
USER UPLOADS RESUME
   ↓
TEXT & LAYOUT EXTRACTION (PyMuPDF)
   ↓
EXTRACT SKILLS & MEASURABLE CLAIMS
   ↓
MATCH WITH TARGET ROLE REQUIREMENTS
   ↓
MAP EVIDENCE & HIGHLIGHT GAPS
   ↓
INTERVIEW CHALLENGES RESUME CLAIM
   ↓
ANSWER EVALUATION & FEEDBACK
   ↓
GENERATE LEARNING & PROJECT TASKS
   ↓
BUILD ARTIFACT & IMPROVE RESUME
```

### Step-by-Step Walkthrough
1. **Upload Resume:** The candidate drops a PDF or Word document into the Resume Lab.
2. **Local Text Extraction:** Software extracts the text in memory and checks for formatting risks (such as multi-column layouts or tables).
3. **Claim Detection:** The system identifies quantified statements (such as percentages, user numbers, and speed improvements).
4. **Target Role Alignment:** The candidate selects a role (e.g., Backend Developer). The system compares required skills against candidate skills.
5. **Evidence Mapping:** The Evidence Graph connects supported skills and marks missing skills as actionable gaps.
6. **Adaptive Interview:** The system asks a targeted question about a specific claim (e.g., *"How did you achieve that 35% latency drop?"*).
7. **Answer Evaluation:** The system evaluates the candidate's answer for baseline metrics, personal ownership, trade-offs, and clarity.
8. **Feedback & Protection:** The candidate sees their demonstrated confidence change, while Evidence Lock blocks any fabricated resume rewrites.
9. **Targeted Growth:** The candidate receives focused study tasks and builds a concrete project artifact in the Project Lab.

---

## 4. How the Interview Works

The Live Adaptive Interview does not ask random trivia. It specifically interrogates the claims the candidate made on their resume.

```
QUESTION PRESENTED
   ↓
CANDIDATE ANSWERS (Voice or Text)
   ↓
SYSTEM EVALUATES OBSERVABLE INDICATORS
   ↓
SELECTS NEXT PROBE (Adaptive Routing)
```

### What the System Looks For (Observable Indicators)
ProofCoach AI evaluates objective communication and technical indicators:
* **Relevance:** Did the answer directly address the question?
* **Answer Structure:** Was there a structured explanation (Problem → Approach → Measurement → Trade-offs)?
* **Personal Contribution:** Did the candidate clarify what they personally did versus the team?
* **Baselines & Metrics:** Were starting numbers and testing tools explained?
* **Trade-offs:** Did the candidate acknowledge the downsides of their approach?
* **Speech Indicators:** Total word count and filler words (`um`, `uh`, `like`).

### Adaptive Questioning Progression
* **Strong answer** → Moves to a harder question (exploring trade-offs, edge cases, and scaling).
* **Weak answer** → Triggers a clarification question.
* **Unsupported claim** → Triggers a direct evidence challenge.
* **Disorganized structure** → Triggers a communication follow-up.

*Note: The current prototype uses deterministic, rule-based evaluation to demonstrate the concept reliably without external AI API costs. Voice features use browser speech recognition. No facial or emotion analysis is used.*

---

## 5. How the System Helps the User Improve

ProofCoach AI is not just a diagnostic tool—it is an active growth engine designed to guide candidates from identified gaps to proven competence.

```
FIND GAP
   ↓
LEARN (Official Docs)
   ↓
PRACTICE (PYQ-style)
   ↓
BUILD EVIDENCE (Project Lab)
   ↓
RE-TEST IN INTERVIEW
   ↓
IMPROVE & LEVEL UP
```

### The 5 Growth Tools
1. **Personalized Learning Plan:** Focuses study time on missing role requirements (e.g., Docker, Testing, System Design) with direct links to free, official documentation.
2. **Video Study Planner:** Breaks long technical tutorials into manageable daily study sessions with an active 75% learning / 25% practice split.
3. **Project Lab:** Guides candidates through a 9-stage engineering journey (Idea to Deployment) to turn coursework into real software artifacts.
4. **Career Quest:** Rewards real learning achievements with Evidence XP across three levels: Build, Prove, and Perform.
5. **Focus Shield:** Provides an intensive study countdown with a 2.5-hour wellbeing cap and automatic progress autosaving.

---

## 6. What Is Happening Technically?

ProofCoach AI runs on a clean, modern, local-first architecture. It does not send candidate resumes to third-party cloud analytics or external AI APIs.

```
USER
  ↓
REACT 19 WEBSITE (Client Interface in Browser)
  ↓
PROOFCOACH STATE (Local browser storage)
  ↓
FASTAPI BACKEND (Local Python server on localhost:8000)
  ↓
RULE ENGINES & PARSERS (PyMuPDF, python-docx, Evidence Lock)
  ↓
LOCAL SQLITE DATABASE (Stores profile & transcripts on user device)
```

### The 5 Core Components in Plain English
* **Frontend (React 19 & TypeScript):** The user interface running in your web browser. It manages pages, navigation, charts, and speech input.
* **Backend (FastAPI):** A local service running on Python that processes uploaded files, calculates scores, and manages interview logic.
* **Document Parsers (PyMuPDF & python-docx):** Fast software tools that extract text and examine layout structure in memory without saving raw files to disk.
* **Rule Engines (Deterministic Logic):** Algorithmic rules that check resume robustness, match skills against job requirements, and block unsupported claims.
* **Local Storage (SQLite & Browser Storage):** All candidate profiles, resumes, and interview transcripts stay on your own machine.

*Zero Cloud AI Requirement: The prototype works deterministically out of the box without requiring paid OpenAI or Gemini API keys. An optional local Ollama connector is supported for users with local AI models.*

---

## 7. Current Status & Simple Summary

### What Is Implemented & Working Today
* **13 Connected Application Pages:** Complete workflow from onboarding to settings.
* **In-Memory Resume Parsing:** Analyzes PDF and DOCX files for text clarity, dates, skills, and layout risks.
* **Target Role Alignment:** Identifies required skills and highlights critical gaps for technical roles.
* **Interactive Evidence Graph:** Visual DAG showing verified vs. unverified links.
* **Adaptive Interview Arena:** Practice interviews with audio synthesis and voice input.
* **Evidence Lock Safeguard:** Blocks AI rewrites that attempt to fabricate numbers or technologies.
* **Project Lab & Video Planner:** Hands-on artifact builder and tutorial scheduler.
* **Focus Shield Wellbeing Timer:** Distraction-free countdown with 2.5-hour wellbeing limit.
* **Complete Privacy Control:** One-click data export and local data destruction.

### Current Limitations
* **Vercel Demo Boundary:** The public online demo runs the frontend interface; full file parsing and database persistence run when the FastAPI backend is launched locally.
* **Browser Speech Dependency:** Voice recognition uses the browser's built-in Web Speech API, which works best in Chromium-based browsers.
* **Rule-Based Evaluation:** Answer scoring relies on structured keyword and pattern matching rather than an unconstrained conversational AI.

### How ProofCoach Works in One Sentence
> **“ProofCoach AI connects a candidate’s resume claims to evidence, tests those claims through targeted interview questions, identifies gaps, and turns those gaps into a path for improvement.”**
