import math


RESOURCE_CATALOG = {
    "Docker": {"provider": "Docker", "course": "Docker Get Started", "url": "https://docs.docker.com/get-started/", "level": "Beginner", "duration": "4–6 hours", "cost": "Free", "certificate": "No certificate"},
    "Testing": {"provider": "pytest", "course": "pytest documentation tutorial", "url": "https://docs.pytest.org/en/stable/getting-started.html", "level": "Beginner", "duration": "3–5 hours", "cost": "Free", "certificate": "No certificate"},
    "System Design": {"provider": "GitHub", "course": "System Design Primer", "url": "https://github.com/donnemartin/system-design-primer", "level": "Beginner–Intermediate", "duration": "10–15 hours", "cost": "Free", "certificate": "No certificate"},
}


def create_learning_plan(gaps: list[str], daily_minutes: int = 150) -> dict:
    tasks = []
    for index, gap in enumerate(gaps, start=1):
        resource = RESOURCE_CATALOG.get(gap, {"provider": "Official documentation", "course": f"{gap} fundamentals", "url": "", "level": "Beginner", "duration": "Verify duration", "cost": "Free", "certificate": "Certificate availability should be verified."})
        tasks.append({"priority": index, "skill": gap, "learning": f"Learn {gap} fundamentals using the linked primary resource.", "practice": f"Add one demonstrable {gap} artifact to the backend project.", "quiz": f"Complete a 5-question PYQ-style Practice set on {gap}.", "resource": resource})
    return {"daily_minutes": daily_minutes, "split": {"learning_percent": 75, "practice_percent": 25}, "good": ["Python", "FastAPI", "REST"], "needs_work": gaps, "tasks": tasks}


def create_video_plan(title: str, duration_minutes: int, daily_minutes: int = 150, notes: str = "") -> dict:
    learning_budget = round(daily_minutes * .75)
    practice_budget = daily_minutes - learning_budget
    days = math.ceil(duration_minutes / learning_budget)
    sessions = []
    cursor = 0
    for day in range(1, days + 1):
        end = min(duration_minutes, cursor + learning_budget)
        sessions.append({"day": day, "video_section": f"{cursor // 60:02d}:{cursor % 60:02d} – {end // 60:02d}:{end % 60:02d}", "learning_minutes": end - cursor, "practice_minutes": practice_budget, "practice": "Build one small example and explain it aloud.", "quiz": "5-question PYQ-style Practice", "review": "Write three recall notes."})
        cursor = end
    concepts = [line.strip(" •-") for line in notes.splitlines() if line.strip()][:8]
    return {"title": title, "duration_minutes": duration_minutes, "daily_minutes": daily_minutes, "days": days, "concepts": concepts or ["Paste transcript or notes to extract exact topics."], "sessions": sessions}

