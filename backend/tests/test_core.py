from fastapi.testclient import TestClient

from app.main import app
from app.seed import DEMO_RESUME_TEXT, demo_state
from app.services.evidence import skill_coverage
from app.services.evidence_lock import assess_rewrite
from app.services.focus import focus_status
from app.services.interview import evaluate_answer
from app.services.resume import analyze_resume_text, extract_claims


def test_backend_health():
    with TestClient(app) as client:
        response = client.get("/api/health")
    assert response.status_code == 200
    assert response.json()["local_first"] is True


def test_resume_parser_components_are_transparent():
    result = analyze_resume_text(DEMO_RESUME_TEXT, layout={"two_column": True, "tables": True})
    assert 0 <= result.parser_robustness <= 100
    assert "Python" in result.skills
    assert any(check.label == "Two-column layout" and check.status == "warning" for check in result.checks)
    assert "not a universal ATS score" in result.disclaimer


def test_claim_extraction_finds_quantified_claim():
    claims = extract_claims("Built an API. Reduced API latency by 35%. Helped the team.")
    assert claims == ["Reduced API latency by 35%."]


def test_job_skill_matching_is_case_insensitive():
    result = skill_coverage(["python", "REST", "Sql"], ["Python", "REST", "SQL", "Docker"])
    assert result["covered"] == 3
    assert result["top_gaps"] == ["Docker"]


def test_evidence_lock_blocks_invented_metric():
    result = assess_rewrite("Made API faster.", "Reduced API latency by 40%.")
    assert result["status"] == "blocked"
    assert "40%" in result["unsupported"]


def test_evidence_lock_allows_grammar_only_rewrite():
    result = assess_rewrite("Made API faster.", "Optimized API response performance.")
    assert result["status"] == "safe"


def test_interview_evidence_does_not_claim_external_truth():
    result = evaluate_answer("The baseline was 420 ms. I changed the cache and measured it using Postman.")
    assert result["claim_confidence_after"] >= result["claim_confidence_before"]
    assert "does not independently prove" in result["evidence_note"]


def test_demo_timer_ends_at_twenty_seconds():
    assert focus_status(19, demo_timer=True)["ended"] is False
    assert focus_status(20, demo_timer=True)["ended"] is True
    assert focus_status(20, demo_timer=True)["autosaved"] is True


def test_demo_seed_is_complete_and_non_personal():
    state = demo_state()
    assert state["candidate"]["target_role"] == "Backend Developer"
    assert state["role"]["gaps"] == ["Docker", "Testing", "System Design"]
    assert state["resume"]["claim"] == "Reduced API latency by 35%."

