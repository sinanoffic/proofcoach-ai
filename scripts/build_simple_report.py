"""
ProofCoach AI — Simple System & Product Report Builder (White Editorial Edition)
Generates:
1. docs/ProofCoach_AI_Simple_System_Report.md
2. docs/ProofCoach_AI_Simple_System_Report.html
3. docs/ProofCoach_AI_Simple_System_Report.pdf (8 pages, white background, clean editorial styling)
"""

import os
import subprocess
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent
DOCS_DIR = BASE_DIR / "docs"
DOCS_DIR.mkdir(parents=True, exist_ok=True)

md_file = DOCS_DIR / "ProofCoach_AI_Simple_System_Report.md"
html_file = DOCS_DIR / "ProofCoach_AI_Simple_System_Report.html"
pdf_file = DOCS_DIR / "ProofCoach_AI_Simple_System_Report.pdf"

# -------------------------------------------------------------
# MARKDOWN CONTENT
# -------------------------------------------------------------
markdown_content = """# PROOFCOACH AI
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
"""

md_file.write_text(markdown_content.strip() + "\n", encoding="utf-8")
print(f"Markdown written to: {md_file}")

# -------------------------------------------------------------
# HTML TEMPLATE (WHITE BACKGROUND, CLEAN EDITORIAL STYLING)
# -------------------------------------------------------------
html_content = f"""<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>ProofCoach AI — Simple System & Product Report</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap');

    :root {{
      --bg: #FFFFFF;
      --surface: #F8FAFC;
      --surface-card: #FFFFFF;
      --border: #E2E8F0;
      --border-accent: #0284C7;
      --text: #0F172A;
      --text-muted: #64748B;
      --primary: #0284C7;
      --primary-dark: #0369A1;
      --primary-light: #E0F2FE;
      --accent: #2563EB;
      --success: #16A34A;
      --warning: #D97706;
      --danger: #DC2626;
    }}

    * {{
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }}

    html, body {{
      background-color: #FFFFFF !important;
      color: #0F172A !important;
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      line-height: 1.55;
      font-size: 13.5px;
    }}

    /* Page container for 8 distinct A4 pages */
    .report-page {{
      width: 100%;
      max-width: 820px;
      margin: 0 auto;
      padding: 32px 36px;
      min-height: 275mm;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      page-break-after: always;
      break-after: page;
      background: #FFFFFF;
      position: relative;
    }}

    .report-page:last-child {{
      page-break-after: avoid;
      break-after: avoid;
    }}

    .page-header {{
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid var(--border);
      padding-bottom: 12px;
      margin-bottom: 24px;
      font-size: 11px;
      font-weight: 600;
      color: var(--text-muted);
      letter-spacing: 0.8px;
      text-transform: uppercase;
    }}

    .page-header .brand {{
      color: var(--primary);
      font-weight: 800;
      display: flex;
      align-items: center;
      gap: 6px;
    }}

    .page-footer {{
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-top: 1px solid var(--border);
      padding-top: 12px;
      margin-top: 24px;
      font-size: 11px;
      color: var(--text-muted);
    }}

    .page-content {{
      flex: 1;
    }}

    /* Typography */
    h1 {{
      font-size: 24px;
      font-weight: 800;
      color: #0F172A;
      letter-spacing: -0.4px;
      margin-bottom: 8px;
    }}

    h2 {{
      font-size: 18px;
      font-weight: 700;
      color: var(--primary-dark);
      margin-top: 20px;
      margin-bottom: 10px;
    }}

    h3 {{
      font-size: 14.5px;
      font-weight: 700;
      color: #1E293B;
      margin-top: 16px;
      margin-bottom: 6px;
    }}

    p {{
      color: #334155;
      margin-bottom: 12px;
      line-height: 1.6;
    }}

    strong {{
      color: #0F172A;
      font-weight: 600;
    }}

    /* Cover Styling */
    .cover-wrapper {{
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      text-align: center;
      min-height: 250mm;
      padding: 40px 20px;
    }}

    .cover-badge {{
      display: inline-block;
      padding: 6px 14px;
      background: var(--primary-light);
      color: var(--primary-dark);
      font-size: 11.5px;
      font-weight: 700;
      letter-spacing: 1.5px;
      text-transform: uppercase;
      border-radius: 20px;
      margin-bottom: 30px;
    }}

    .cover-phoenix {{
      width: 140px;
      height: auto;
      margin-bottom: 24px;
      filter: drop-shadow(0 4px 12px rgba(2, 132, 199, 0.2));
    }}

    .cover-title {{
      font-size: 38px;
      font-weight: 900;
      color: #0F172A;
      letter-spacing: -0.8px;
      margin-bottom: 8px;
    }}

    .cover-tagline {{
      font-size: 19px;
      font-weight: 600;
      color: var(--primary);
      margin-bottom: 16px;
    }}

    .cover-divider {{
      width: 60px;
      height: 3px;
      background: var(--primary);
      margin: 0 auto 20px auto;
      border-radius: 2px;
    }}

    .cover-subtitle {{
      font-size: 15px;
      color: var(--text-muted);
      max-width: 500px;
      line-height: 1.5;
      margin-bottom: 40px;
    }}

    .cover-meta {{
      display: flex;
      gap: 32px;
      font-size: 12px;
      color: var(--text-muted);
      border-top: 1px solid var(--border);
      padding-top: 20px;
    }}

    .cover-meta-item strong {{
      display: block;
      color: #0F172A;
      font-size: 13px;
    }}

    /* Diagrams & Flowcharts */
    .flow-diagram {{
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: center;
      gap: 8px;
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: 8px;
      padding: 14px 16px;
      margin: 16px 0;
    }}

    .flow-node {{
      background: #FFFFFF;
      border: 1px solid #CBD5E1;
      border-radius: 6px;
      padding: 8px 12px;
      font-size: 11.5px;
      font-weight: 700;
      color: #1E293B;
      text-align: center;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
    }}

    .flow-node.highlight {{
      border-color: var(--primary);
      background: var(--primary-light);
      color: var(--primary-dark);
    }}

    .flow-arrow {{
      color: var(--primary);
      font-weight: 800;
      font-size: 14px;
    }}

    /* Cards Grid */
    .card-grid-2 {{
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;
      margin: 14px 0;
    }}

    .card-grid-3 {{
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      gap: 10px;
      margin: 14px 0;
    }}

    .feature-card {{
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: 8px;
      padding: 12px 14px;
    }}

    .feature-card h4 {{
      font-size: 13px;
      font-weight: 700;
      color: var(--primary-dark);
      margin-bottom: 4px;
      display: flex;
      align-items: center;
      gap: 6px;
    }}

    .feature-card p {{
      font-size: 12px;
      color: #475569;
      margin-bottom: 0;
      line-height: 1.5;
    }}

    /* Callout Box */
    .callout-box {{
      background: #F0F9FF;
      border-left: 3px solid var(--primary);
      padding: 12px 16px;
      margin: 14px 0;
      border-radius: 0 6px 6px 0;
      font-size: 12.5px;
    }}

    .callout-box strong {{
      color: var(--primary-dark);
    }}

    /* Step List */
    .step-list {{
      display: flex;
      flex-direction: column;
      gap: 8px;
      margin: 14px 0;
    }}

    .step-item {{
      display: flex;
      align-items: flex-start;
      gap: 10px;
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: 6px;
      padding: 8px 12px;
      font-size: 12px;
    }}

    .step-number {{
      background: var(--primary);
      color: #FFFFFF;
      font-size: 10.5px;
      font-weight: 800;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      margin-top: 1px;
    }}

    .step-text strong {{
      color: #0F172A;
    }}

    .step-text span {{
      color: #475569;
    }}

    /* Big Quote Box */
    .summary-quote {{
      background: linear-gradient(135deg, #F0F9FF 0%, #E0F2FE 100%);
      border: 1px solid #BAE6FD;
      border-radius: 10px;
      padding: 20px 24px;
      text-align: center;
      margin: 20px 0;
    }}

    .summary-quote p {{
      font-size: 14.5px;
      font-weight: 600;
      color: #0369A1;
      line-height: 1.6;
      margin-bottom: 0;
    }}

    /* Print Styles */
    @page {{
      size: A4;
      margin: 10mm 12mm 10mm 12mm;
      background-color: #FFFFFF !important;
    }}

    @media print {{
      body {{
        background: #FFFFFF !important;
        color: #0F172A !important;
      }}
      .report-page {{
        padding: 16px 20px;
        min-height: 265mm;
      }}
    }}
  </style>
</head>
<body>

  <!-- ======================================================== -->
  <!-- PAGE 1: COVER                                            -->
  <!-- ======================================================== -->
  <div class="report-page">
    <div class="cover-wrapper">
      <span class="cover-badge">Current Prototype Architecture</span>
      <img src="phoenix-watermark.jpg" alt="ProofCoach Phoenix" class="cover-phoenix" />
      <h1 class="cover-title">PROOFCOACH AI</h1>
      <div class="cover-tagline">Build it. Prove it. Defend it.</div>
      <div class="cover-divider"></div>
      <p class="cover-subtitle">
        A Simple Guide to How the System Works — Explaining how resume parsing, 
        role evidence, adaptive interview defense, and targeted learning connect together.
      </p>

      <div class="cover-meta">
        <div class="cover-meta-item">
          <small>Document Type</small>
          <strong>System & Product Guide</strong>
        </div>
        <div class="cover-meta-item">
          <small>Report Date</small>
          <strong>September 2026</strong>
        </div>
        <div class="cover-meta-item">
          <small>Architecture</small>
          <strong>Local-First / Deterministic Slice</strong>
        </div>
      </div>
    </div>
    <div class="page-footer">
      <span>ProofCoach AI · Executive Summary</span>
      <span>Page 1 of 8</span>
    </div>
  </div>

  <!-- ======================================================== -->
  <!-- PAGE 2: WHAT IS PROOFCOACH AI?                          -->
  <!-- ======================================================== -->
  <div class="report-page">
    <div class="page-header">
      <div class="brand">PROOFCOACH AI</div>
      <span>Product Concept & Thesis</span>
    </div>
    <div class="page-content">
      <h1>What Is ProofCoach AI?</h1>
      <p>
        <strong>ProofCoach AI</strong> is a privacy-first career preparation system designed to help students, 
        freshers, and technical candidates bridge the gap between <em>writing</em> an impressive resume and 
        <em>defending</em> their skills in real technical interviews.
      </p>

      <h2>The Core Problem</h2>
      <p>
        In the era of generative AI, anyone can generate a resume full of impressive-sounding keywords and metrics 
        (e.g., <em>"Reduced API latency by 35%"</em>). However, candidates frequently struggle when interviewers 
        challenge those exact claims:
      </p>
      <div class="callout-box">
        <strong>The Preparation Gap:</strong> Candidates polish resume wording, but have never practiced explaining 
        their baseline measurements, architectural trade-offs, or personal contributions under pressure.
      </div>

      <h2>The ProofCoach Solution</h2>
      <p>ProofCoach connects the candidate's journey into an unbroken, evidence-backed chain:</p>

      <div class="flow-diagram">
        <div class="flow-node highlight">RESUME<br><small style="font-weight:400">What you write</small></div>
        <div class="flow-arrow">→</div>
        <div class="flow-node">PROOF<br><small style="font-weight:400">What you built</small></div>
        <div class="flow-arrow">→</div>
        <div class="flow-node">INTERVIEW<br><small style="font-weight:400">What you defend</small></div>
        <div class="flow-arrow">→</div>
        <div class="flow-node">FEEDBACK<br><small style="font-weight:400">Where you stand</small></div>
        <div class="flow-arrow">→</div>
        <div class="flow-node highlight">IMPROVEMENT<br><small style="font-weight:400">What you close</small></div>
      </div>

      <h2>Who Is It For?</h2>
      <div class="card-grid-2">
        <div class="feature-card">
          <h4>🎓 Students</h4>
          <p>Translate university coursework and academic projects into defensible, commercial-grade evidence.</p>
        </div>
        <div class="feature-card">
          <h4>🚀 Freshers & New Grads</h4>
          <p>Overcome limited work history by building verified project artifacts that bypass automated parsing barriers.</p>
        </div>
        <div class="feature-card">
          <h4>💼 Early-Career Engineers</h4>
          <p>Practice articulating personal ownership, system trade-offs, and optimization benchmarks.</p>
        </div>
        <div class="feature-card">
          <h4>🔄 Career Switchers</h4>
          <p>Identify critical role gaps and map existing transferable skills to new target technical roles.</p>
        </div>
      </div>
    </div>
    <div class="page-footer">
      <span>ProofCoach AI · Executive Summary</span>
      <span>Page 2 of 8</span>
    </div>
  </div>

  <!-- ======================================================== -->
  <!-- PAGE 3: THE COMPLETE PRODUCT IN ONE VIEW                 -->
  <!-- ======================================================== -->
  <div class="report-page">
    <div class="page-header">
      <div class="brand">PROOFCOACH AI</div>
      <span>Complete Product Map</span>
    </div>
    <div class="page-content">
      <h1>The Complete Product in One View</h1>
      <p>ProofCoach AI organizes technical preparation into an integrated workflow where every tool directly feeds the next:</p>

      <div class="flow-diagram" style="padding: 10px 12px; margin: 12px 0;">
        <span class="flow-node">Profile</span> <span class="flow-arrow">→</span>
        <span class="flow-node">Resume Lab</span> <span class="flow-arrow">→</span>
        <span class="flow-node">Target Role</span> <span class="flow-arrow">→</span>
        <span class="flow-node">Evidence Graph</span> <span class="flow-arrow">→</span>
        <span class="flow-node highlight">Interview</span> <span class="flow-arrow">→</span>
        <span class="flow-node">Feedback</span> <span class="flow-arrow">→</span>
        <span class="flow-node">Learning</span> <span class="flow-arrow">→</span>
        <span class="flow-node">Project Lab</span> <span class="flow-arrow">→</span>
        <span class="flow-node">Quest</span>
      </div>

      <div class="card-grid-2" style="gap: 8px;">
        <div class="feature-card">
          <h4>👤 Profile & Command Centre</h4>
          <p>Stores career goals and daily study limits privately, displaying six clear diagnostic metrics.</p>
        </div>
        <div class="feature-card">
          <h4>📄 Resume Lab</h4>
          <p>Tests resume machine-readability (Parser Robustness) and automatically detects measurable claims.</p>
        </div>
        <div class="feature-card">
          <h4>🎯 Target Role</h4>
          <p>Extracts job requirements from job descriptions and highlights your skill coverage and critical gaps.</p>
        </div>
        <div class="feature-card">
          <h4>🔗 Career Evidence Graph</h4>
          <p>Visually links skills and projects to claims and job specs, exposing missing evidence chains.</p>
        </div>
        <div class="feature-card">
          <h4>🎙️ Adaptive Interview</h4>
          <p>Interrogates you directly on your resume claims, adapting difficulty based on your answers.</p>
        </div>
        <div class="feature-card">
          <h4>📊 Evidence Feedback</h4>
          <p>Scores your answers across 6 dimensions and uses <strong>Evidence Lock</strong> to block fabricated rewrites.</p>
        </div>
        <div class="feature-card">
          <h4>📚 Personalized Learning</h4>
          <p>Turns identified skill gaps into concrete study tasks linked directly to free, official documentation.</p>
        </div>
        <div class="feature-card">
          <h4>🧪 Project Lab</h4>
          <p>Guides you to build real software artifacts rather than passively watching video tutorials.</p>
        </div>
        <div class="feature-card">
          <h4>📹 Video Study Planner</h4>
          <p>Breaks long tutorials into daily study chunks with timestamped notes and a 75/25 study-practice split.</p>
        </div>
        <div class="feature-card">
          <h4>🏆 Career Quest</h4>
          <p>Gamifies verified progress across three levels (Build, Prove, Perform) with action-linked XP.</p>
        </div>
      </div>

      <div class="callout-box" style="margin-top: 10px;">
        <strong>Supporting Governance:</strong> <em>Focus Shield</em> provides a 2.5-hour wellbeing cap with session autosave; 
        <em>Settings</em> offers one-click complete local data deletion and instant dark/light theme switching.
      </div>
    </div>
    <div class="page-footer">
      <span>ProofCoach AI · Executive Summary</span>
      <span>Page 3 of 8</span>
    </div>
  </div>

  <!-- ======================================================== -->
  <!-- PAGE 4: WHAT HAPPENS INSIDE?                            -->
  <!-- ======================================================== -->
  <div class="report-page">
    <div class="page-header">
      <div class="brand">PROOFCOACH AI</div>
      <span>Core Engine Data Flow</span>
    </div>
    <div class="page-content">
      <h1>What Happens Inside?</h1>
      <p>
        ProofCoach AI connects your documents, goals, and interview performance through an automated 
        internal processing chain. Here is what happens behind the scenes:
      </p>

      <div class="flow-diagram">
        <div class="flow-node">1. RESUME UPLOAD</div>
        <div class="flow-arrow">→</div>
        <div class="flow-node">2. TEXT & PARSER CHECK</div>
        <div class="flow-arrow">→</div>
        <div class="flow-node">3. CLAIM DETECTION</div>
        <div class="flow-arrow">→</div>
        <div class="flow-node">4. ROLE MATCHING</div>
      </div>
      <div class="flow-diagram" style="margin-top: -6px;">
        <div class="flow-node">5. EVIDENCE MAPPING</div>
        <div class="flow-arrow">→</div>
        <div class="flow-node highlight">6. CLAIM INTERVIEW</div>
        <div class="flow-arrow">→</div>
        <div class="flow-node">7. EVALUATION & GAPS</div>
        <div class="flow-arrow">→</div>
        <div class="flow-node">8. ARTIFACT CREATION</div>
      </div>

      <h2>Step-by-Step Flow Explanation</h2>
      <div class="step-list">
        <div class="step-item">
          <div class="step-number">1</div>
          <div class="step-text"><strong>Resume Upload & In-Memory Extraction:</strong> The user selects a PDF or DOCX file. The system processes it in RAM—files are never permanently stored on a cloud server.</div>
        </div>
        <div class="step-item">
          <div class="step-number">2</div>
          <div class="step-text"><strong>Parser Robustness Diagnostics:</strong> Software inspects reading order, contact details, dates, and warns if two-column layouts or tables may confuse automated parsers.</div>
        </div>
        <div class="step-item">
          <div class="step-number">3</div>
          <div class="step-text"><strong>Claim Detection:</strong> The engine scans for quantified statements (e.g., <em>"Reduced API latency by 35%"</em>) that require technical defense.</div>
        </div>
        <div class="step-item">
          <div class="step-number">4</div>
          <div class="step-text"><strong>Role Matching & Gap Identification:</strong> Candidate skills are compared against role requirements (e.g., Backend Developer). Covered skills and missing gaps (e.g., Docker, Testing) are highlighted.</div>
        </div>
        <div class="step-item">
          <div class="step-number">5</div>
          <div class="step-text"><strong>Targeted Adaptive Interview:</strong> The interviewer challenges the candidate on their specific claim: <em>"What was the baseline? How did you measure it? What did you personally change?"</em></div>
        </div>
        <div class="step-item">
          <div class="step-number">6</div>
          <div class="step-text"><strong>Grounded Evaluation & Feedback:</strong> The answer is evaluated for baselines, personal ownership, and trade-offs. Weak areas become prioritized learning and project tasks.</div>
        </div>
      </div>
    </div>
    <div class="page-footer">
      <span>ProofCoach AI · Executive Summary</span>
      <span>Page 4 of 8</span>
    </div>
  </div>

  <!-- ======================================================== -->
  <!-- PAGE 5: HOW THE INTERVIEW WORKS                         -->
  <!-- ======================================================== -->
  <div class="report-page">
    <div class="page-header">
      <div class="brand">PROOFCOACH AI</div>
      <span>Adaptive Interview System</span>
    </div>
    <div class="page-content">
      <h1>How the Interview Works</h1>
      <p>
        Instead of asking generic trivia questions, the <strong>Live Adaptive Interview</strong> interrogates 
        the candidate directly on the achievements they claimed on their resume.
      </p>

      <div class="flow-diagram">
        <div class="flow-node highlight">PRESENT CLAIM PROBE</div>
        <div class="flow-arrow">→</div>
        <div class="flow-node">USER ANSWERS (Voice/Text)</div>
        <div class="flow-arrow">→</div>
        <div class="flow-node">EVALUATE INDICATORS</div>
        <div class="flow-arrow">→</div>
        <div class="flow-node highlight">ADAPTIVE NEXT QUESTION</div>
      </div>

      <h2>What the System Evaluates (Observable Indicators)</h2>
      <p>ProofCoach evaluates observable communication and technical structure—never fake emotion analysis:</p>
      
      <div class="card-grid-2">
        <div class="feature-card">
          <h4>🎯 Relevance & Completeness</h4>
          <p>Did the candidate directly answer the question using appropriate technical vocabulary?</p>
        </div>
        <div class="feature-card">
          <h4>🏗️ Answer Structure</h4>
          <p>Did they follow a clear problem-solving flow: Problem → Approach → Contribution → Trade-offs?</p>
        </div>
        <div class="feature-card">
          <h4>👤 Personal Contribution</h4>
          <p>Did the candidate clearly separate what they personally implemented from team accomplishments?</p>
        </div>
        <div class="feature-card">
          <h4>📏 Baselines & Measurement</h4>
          <p>Did they state starting numbers (e.g., 420 ms) and specific verification tools (e.g., Postman, benchmarks)?</p>
        </div>
      </div>

      <h2>The 4-Way Adaptive Questioning Route</h2>
      <div class="step-list">
        <div class="step-item"><div class="step-number" style="background:#16A34A">A</div><div class="step-text"><strong>Strong Answer:</strong> The system progresses to harder questions covering trade-offs and scaling limits.</div></div>
        <div class="step-item"><div class="step-number" style="background:#D97706">B</div><div class="step-text"><strong>Weak Answer:</strong> Triggers a clarification question to help the candidate articulate core concepts.</div></div>
        <div class="step-item"><div class="step-number" style="background:#DC2626">C</div><div class="step-text"><strong>Unsupported Claim:</strong> Triggers an evidence challenge demanding baselines and metrics.</div></div>
        <div class="step-item"><div class="step-number" style="background:#2563EB">D</div><div class="step-text"><strong>Disorganized Structure:</strong> Triggers a communication follow-up to structure the response clearly.</div></div>
      </div>

      <div class="callout-box">
        <strong>Ethical AI Boundary:</strong> The current prototype uses deterministic, rule-based evaluation to demonstrate the concept reliably without external AI API costs. Voice features use browser speech recognition. No facial or emotion analysis is used.
      </div>
    </div>
    <div class="page-footer">
      <span>ProofCoach AI · Executive Summary</span>
      <span>Page 5 of 8</span>
    </div>
  </div>

  <!-- ======================================================== -->
  <!-- PAGE 6: HOW THE SYSTEM HELPS THE USER IMPROVE            -->
  <!-- ======================================================== -->
  <div class="report-page">
    <div class="page-header">
      <div class="brand">PROOFCOACH AI</div>
      <span>The Closed Growth Loop</span>
    </div>
    <div class="page-content">
      <h1>How the System Helps You Improve</h1>
      <p>
        ProofCoach AI is not just a diagnostic test—it is an ongoing growth loop. When an interview exposes a gap, 
        the platform immediately channels that weakness into concrete action.
      </p>

      <div class="flow-diagram">
        <div class="flow-node highlight">1. FIND GAP</div>
        <div class="flow-arrow">→</div>
        <div class="flow-node">2. LEARN</div>
        <div class="flow-arrow">→</div>
        <div class="flow-node">3. PRACTICE</div>
        <div class="flow-arrow">→</div>
        <div class="flow-node">4. BUILD EVIDENCE</div>
        <div class="flow-arrow">→</div>
        <div class="flow-node highlight">5. RE-TEST & LEVEL UP</div>
      </div>

      <h2>The Five Growth Tools</h2>
      <div class="step-list">
        <div class="step-item">
          <div class="step-number">1</div>
          <div class="step-text">
            <strong>Personalized Learning Plan:</strong> Replaces 40-hour video catalogs with direct, prioritized links to official documentation (e.g., Docker Get Started, pytest tutorial) for your specific missing skills.
          </div>
        </div>
        <div class="step-item">
          <div class="step-number">2</div>
          <div class="step-text">
            <strong>Video Study Planner:</strong> Embeds YouTube tutorials safely and calculates an optimal daily study schedule with an active 75% learning / 25% practice split, tracking notes by video timestamp.
          </div>
        </div>
        <div class="step-item">
          <div class="step-number">3</div>
          <div class="step-text">
            <strong>Project Lab:</strong> Guides you through a 9-stage software journey (Idea → Plan → Build → Test → Defend) with Kanban task tracking, turning study into real code evidence.
          </div>
        </div>
        <div class="step-item">
          <div class="step-number">4</div>
          <div class="step-text">
            <strong>Career Quest:</strong> Rewards verified milestones across three progressive tiers (Level 1: Build → Level 2: Prove → Level 3: Perform) with transparent, action-linked Evidence XP.
          </div>
        </div>
        <div class="step-item">
          <div class="step-number">5</div>
          <div class="step-text">
            <strong>Focus Shield:</strong> Enforces a 2.5-hour continuous study wellbeing limit with automatic session saving to prevent burnout and encourage healthy learning habits.
          </div>
        </div>
      </div>

      <div class="callout-box">
        <strong>Evidence Lock Protection:</strong> When improving your resume wording, Evidence Lock ensures that stylistic enhancements are approved, but strictly blocks any invented numbers or unsupported technologies.
      </div>
    </div>
    <div class="page-footer">
      <span>ProofCoach AI · Executive Summary</span>
      <span>Page 6 of 8</span>
    </div>
  </div>

  <!-- ======================================================== -->
  <!-- PAGE 7: WHAT IS HAPPENING TECHNICALLY?                   -->
  <!-- ======================================================== -->
  <div class="report-page">
    <div class="page-header">
      <div class="brand">PROOFCOACH AI</div>
      <span>Technical Architecture</span>
    </div>
    <div class="page-content">
      <h1>What Is Happening Technically?</h1>
      <p>
        ProofCoach AI runs on a clean, decoupled, local-first technical architecture designed for speed, 
        privacy, and offline reliability.
      </p>

      <div class="flow-diagram">
        <div class="flow-node">USER INTERACTION</div>
        <div class="flow-arrow">→</div>
        <div class="flow-node highlight">REACT 19 SPA (Client)</div>
        <div class="flow-arrow">→</div>
        <div class="flow-node">FASTAPI BACKEND</div>
        <div class="flow-arrow">→</div>
        <div class="flow-node">LOCAL SQLITE DB</div>
      </div>

      <h2>The Five Core Technical Pillars</h2>
      <div class="card-grid-2">
        <div class="feature-card">
          <h4>⚛️ React 19 Frontend</h4>
          <p>Single Page Application built with Vite and TypeScript. Manages local state via <code>ProofContext</code> and uses React Flow for graph mapping and Recharts for metrics.</p>
        </div>
        <div class="feature-card">
          <h4>⚡ FastAPI Python Backend</h4>
          <p>Lightweight asynchronous service running on <code>localhost:8000</code>. Implements clean REST endpoints for parsing, matching, and interview evaluation.</p>
        </div>
        <div class="feature-card">
          <h4>📑 In-Memory Document Parsers</h4>
          <p>PyMuPDF and python-docx extract text and layout bounding-boxes in memory. Raw resume files are never saved permanently to disk.</p>
        </div>
        <div class="feature-card">
          <h4>🛡️ Deterministic Rule Engines</h4>
          <p>Pure Python services calculate Parser Robustness, match role requirements, and evaluate answer rubrics using transparent, reproducible heuristics.</p>
        </div>
      </div>

      <h2>Data Storage & Local-First Privacy</h2>
      <div class="step-list">
        <div class="step-item">
          <div class="step-number" style="background:#0284C7">✓</div>
          <div class="step-text"><strong>Zero Cloud Telemetry:</strong> No analytics SDKs (Google Analytics, Mixpanel, Sentry) are installed or imported.</div>
        </div>
        <div class="step-item">
          <div class="step-number" style="background:#0284C7">✓</div>
          <div class="step-text"><strong>Local SQLite Persistence:</strong> Profile details and interview transcripts reside exclusively on the user's computer in <code>proofcoach.db</code>.</div>
        </div>
        <div class="step-item">
          <div class="step-number" style="background:#0284C7">✓</div>
          <div class="step-text"><strong>Zero Cloud AI Dependency:</strong> Runs reliably offline without cloud AI API keys. An optional Ollama adapter is supported for local LLMs.</div>
        </div>
      </div>
    </div>
    <div class="page-footer">
      <span>ProofCoach AI · Executive Summary</span>
      <span>Page 7 of 8</span>
    </div>
  </div>

  <!-- ======================================================== -->
  <!-- PAGE 8: CURRENT STATUS + SIMPLE SUMMARY                  -->
  <!-- ======================================================== -->
  <div class="report-page">
    <div class="page-header">
      <div class="brand">PROOFCOACH AI</div>
      <span>Status & Summary</span>
    </div>
    <div class="page-content">
      <h1>Current Status & Simple Summary</h1>
      <p>ProofCoach AI is a fully functional deterministic prototype ready for demonstration and pilot testing.</p>

      <h2>Currently Implemented & Working</h2>
      <div class="card-grid-2">
        <div class="feature-card">
          <h4>✓ 13 Application Routes</h4>
          <p>Complete flow from initial onboarding through live interview, project lab, and settings.</p>
        </div>
        <div class="feature-card">
          <h4>✓ In-Memory Resume Parsing</h4>
          <p>Extracts text and checks 8 transparent robustness criteria with layout warnings.</p>
        </div>
        <div class="feature-card">
          <h4>✓ Interactive Evidence Graph</h4>
          <p>Dynamic React Flow diagram connecting skills, projects, claims, and role specs.</p>
        </div>
        <div class="feature-card">
          <h4>✓ Evidence Lock Protection</h4>
          <p>Rule-governed rewrite verification blocking fabricated metrics and tools.</p>
        </div>
      </div>

      <h2>Current Boundaries & Limitations</h2>
      <div class="callout-box">
        <strong>Transparent Boundaries:</strong>
        <ul style="margin-top:6px; padding-left:18px;">
          <li><strong>Vercel Online Demo:</strong> Demonstrates the frontend with deterministic fixtures; real file extraction runs with the local FastAPI backend.</li>
          <li><strong>Single-User SQLite:</strong> Built for local-first single-user prototyping; multi-user cloud pilots will require PostgreSQL.</li>
          <li><strong>Speech Features:</strong> Voice recognition uses the browser's Web Speech API; a reliable text fallback is always provided.</li>
        </ul>
      </div>

      <div class="summary-quote">
        <small style="font-weight:700; letter-spacing:1px; text-transform:uppercase; color:#0284C7; display:block; margin-bottom:6px;">How ProofCoach Works in One Sentence</small>
        <p>
          “ProofCoach AI connects a candidate’s resume claims to evidence, tests those claims through 
          targeted interview questions, identifies gaps, and turns those gaps into a path for improvement.”
        </p>
      </div>
    </div>
    <div class="page-footer">
      <span>ProofCoach AI · Executive Summary</span>
      <span>Page 8 of 8</span>
    </div>
  </div>

</body>
</html>
"""

html_file.write_text(html_content.strip() + "\n", encoding="utf-8")
print(f"HTML written to: {html_file}")

# -------------------------------------------------------------
# COMPILE PDF VIA MICROSOFT EDGE HEADLESS
# -------------------------------------------------------------
edge_path = r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
if Path(edge_path).exists():
    print(f"Compiling Simple PDF via Microsoft Edge Headless to: {pdf_file}")
    args = [
        edge_path,
        "--headless=new",
        "--disable-gpu",
        "--no-pdf-header-footer",
        "--enable-background-graphics",
        f"--print-to-pdf={pdf_file}",
        str(html_file)
    ]
    res = subprocess.run(args, capture_output=True, text=True)
    if pdf_file.exists():
        size_kb = round(pdf_file.stat().st_size / 1024)
        print(f"Simple PDF Successfully Generated! Size: {size_kb} KB ({pdf_file.stat().st_size} bytes)")
    else:
        print(f"PDF generation failed: {res.stderr}")
else:
    print(f"Edge executable not found at {edge_path}")

print("Simple Report Generation Complete!")
