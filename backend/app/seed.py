DEMO_RESUME_TEXT = """Demo Candidate
demo.candidate@example.test | +91 90000 00000

EDUCATION
BE Artificial Intelligence & Machine Learning, 2025–2029

SKILLS
Python, FastAPI, REST, SQL, Git

PROJECTS
Flood Prediction API — Built a FastAPI backend with REST endpoints and SQL persistence.
Reduced API latency by 35% by profiling a slow route and adding a bounded cache.

ACHIEVEMENTS
Presented the prototype during a college technology demonstration.
"""

DEMO_ANSWER = (
    "The original endpoint averaged about 420 ms before my change and around 273 ms after it. "
    "I profiled the route, found repeated database reads, and I added a bounded in-memory cache. "
    "I measured several runs using Postman and compared the average, but I did not preserve the full "
    "test sample or p95 results. My contribution was implementing the cache and timing the endpoint."
)


def demo_state() -> dict:
    return {
        "candidate": {"name": "Demo Candidate", "category": "Student", "education": "BE AI & ML", "experience": "Student — 2nd year", "target_role": "Backend Developer", "daily_minutes": 150, "interview_mode": "Text", "interviewer_persona": "Auto Pair"},
        "resume": {"skills": ["Python", "FastAPI", "REST", "SQL", "Git"], "claim": "Reduced API latency by 35%.", "parser_robustness": 82, "warnings": ["Two-column layout may affect reading order", "A table section may reorder content"]},
        "role": {"required": ["Python", "REST", "SQL", "Docker", "Testing", "System Design"], "gaps": ["Docker", "Testing", "System Design"]},
        "progress": {"parser": 82, "coverage": 50, "interview": 68, "claim": 58, "learning": 36, "quest_points": 185},
        "before_after": [{"label": "Technical Depth", "before": 61, "after": 78}, {"label": "Answer Structure", "before": 58, "after": 76}, {"label": "Claim Evidence", "before": 50, "after": 82}, {"label": "Skill Coverage", "before": 67, "after": 74}],
        "demo_answer": DEMO_ANSWER,
    }

