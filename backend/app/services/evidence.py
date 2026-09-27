import re


DEMO_REQUIREMENTS = {
    "Backend Developer": ["Python", "REST", "SQL", "Docker", "Testing", "System Design"],
    "Frontend Developer": ["JavaScript", "TypeScript", "React", "Testing", "Git"],
    "Machine Learning Engineer": ["Python", "Machine Learning", "Pandas", "NumPy", "SQL", "Docker"],
    "Data Analyst": ["SQL", "Python", "Pandas", "Data Visualization", "Statistics"],
    "Software Engineer": ["Programming", "Git", "Testing", "System Design", "SQL"],
}


def analyze_job(role: str, description: str = "") -> dict:
    seeded = DEMO_REQUIREMENTS.get(role, DEMO_REQUIREMENTS["Backend Developer"])
    if description.strip():
        discovered = [skill for skills in DEMO_REQUIREMENTS.values() for skill in skills if re.search(rf"\b{re.escape(skill)}\b", description, re.I)]
        required = list(dict.fromkeys(discovered)) or seeded
    else:
        required = seeded
    return {
        "role": role,
        "required_skills": required,
        "preferred_skills": ["CI/CD", "AWS"] if role == "Backend Developer" else ["Communication"],
        "responsibilities": ["Build maintainable product features", "Collaborate through code review", "Diagnose failures and trade-offs"],
        "competencies": ["Problem solving", "Ownership", "Communication"],
        "experience_requirement": "Entry level / demonstrable project experience",
    }


def skill_coverage(candidate_skills: list[str], required_skills: list[str]) -> dict:
    candidate = {item.casefold(): item for item in candidate_skills}
    status: list[dict] = []
    for skill in required_skills:
        present = skill.casefold() in candidate
        strength = "strong" if skill in {"Python", "REST"} and present else "evidence" if present else "missing"
        if skill == "SQL" and present:
            strength = "partial"
        status.append({"skill": skill, "status": strength, "covered": present})
    covered = sum(item["covered"] for item in status)
    return {
        "skills": status,
        "covered": covered,
        "total": len(required_skills),
        "percentage": round(100 * covered / max(1, len(required_skills))),
        "strongest": next((item["skill"] for item in status if item["status"] == "strong"), "Not enough evidence"),
        "weakest": next((item["skill"] for item in status if item["status"] == "missing"), "No critical gap"),
        "top_gaps": [item["skill"] for item in status if not item["covered"]][:3],
    }


def build_evidence_graph(candidate_skills: list[str], required_skills: list[str]) -> dict:
    coverage = skill_coverage(candidate_skills, required_skills)
    nodes = [
        {"id": "candidate", "type": "candidate", "label": "Demo Candidate", "status": "verified"},
        {"id": "python", "type": "skill", "label": "Python", "status": "verified"},
        {"id": "project", "type": "project", "label": "Flood Prediction API", "status": "verified"},
        {"id": "claim", "type": "claim", "label": "Reduced API latency by 35%", "status": "review"},
        {"id": "interview", "type": "evidence", "label": "Interview evidence", "status": "partial"},
        {"id": "requirement", "type": "requirement", "label": "Backend role: Python", "status": "verified"},
        {"id": "docker", "type": "skill", "label": "Docker", "status": "missing"},
        {"id": "gap", "type": "gap", "label": "No supporting evidence", "status": "missing"},
    ]
    edges = [
        {"id": "e1", "source": "candidate", "target": "python"},
        {"id": "e2", "source": "python", "target": "project"},
        {"id": "e3", "source": "project", "target": "claim"},
        {"id": "e4", "source": "claim", "target": "interview"},
        {"id": "e5", "source": "interview", "target": "requirement"},
        {"id": "e6", "source": "candidate", "target": "docker"},
        {"id": "e7", "source": "docker", "target": "gap"},
    ]
    return {"nodes": nodes, "edges": edges, "coverage": coverage}

