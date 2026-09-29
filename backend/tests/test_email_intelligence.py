from fastapi.testclient import TestClient

from app.main import app
from app.services.email_intelligence import analyze_email_text, extract_meeting_link


SAMPLE_EMAIL = """Subject: Machine Learning Intern Technical Interview @ ABC Technologies
From: recruiting@abctechnologies.com
To: candidate@example.test
Date: October 1, 2026

Dear Candidate,

We would like to invite you for a 45 minutes Technical Interview for the Machine Learning Intern role at ABC Technologies.

Interview Details:
- Date: October 3, 2026
- Time: 2:00 PM IST
- Platform: Google Meet
- Meeting Link: https://meet.google.com/abc-defg-hij
- Interviewer: Dr. Rajesh Sharma, Lead AI Scientist

Preparation Requirements:
- Please have your resume ready.
- Bring a valid government ID.
- Prepare to discuss your ML projects and live Python coding.

Please confirm by October 2, 2026.

Best regards,
Talent Team
"""


def test_extract_meeting_link():
    link, platform = extract_meeting_link("Please join via https://meet.google.com/xyz-uvwx-rst for the call")
    assert link == "https://meet.google.com/xyz-uvwx-rst"
    assert platform == "Google Meet"


def test_analyze_email_text_structured():
    res = analyze_email_text(SAMPLE_EMAIL, candidate_skills=["Python", "FastAPI", "Machine Learning"])
    assert res.company.value == "ABC Technologies"
    assert res.company.confidence == "clearly_found"
    assert res.role.value == "Machine Learning Intern"
    assert res.role.confidence == "clearly_found"
    assert res.interview_type.value == "Technical Interview"
    assert res.interview_type.confidence == "clearly_found"
    assert "October 3, 2026" in res.interview_date.value
    assert res.interview_date.confidence == "clearly_found"
    assert "2:00 PM" in res.interview_time.value
    assert res.platform.value == "Google Meet"
    assert res.meeting_link == "https://meet.google.com/abc-defg-hij"
    assert res.duration == "45 minutes"
    assert len(res.interviewers) >= 1
    assert "Dr. Rajesh Sharma" in res.interviewers[0].name
    assert any("resume" in r.lower() for r in res.preparation_requirements)
    assert any("Python" in s for s in res.suggested_preparation.profile_matched_skills)
    assert res.status == "Upcoming"


def test_analyze_email_missing_date_flags_review():
    missing_date_email = """Subject: Screening call at TechCorp
From: team@techcorp.io

Hi there, we want to invite you to a phone interview for Software Engineer at TechCorp.
Please let us know your availability.
"""
    res = analyze_email_text(missing_date_email)
    assert res.company.value == "TechCorp"
    assert res.role.value == "Software Engineer"
    assert res.interview_date.confidence == "not_found"
    assert res.status == "Needs Review"


def test_api_interview_email_analyze():
    with TestClient(app) as client:
        response = client.post(
            "/api/interview-email/analyze",
            json={"email_text": SAMPLE_EMAIL, "candidate_skills": ["Python", "SQL"]},
        )
    assert response.status_code == 200
    data = response.json()
    assert data["company"]["value"] == "ABC Technologies"
    assert data["meeting_link"] == "https://meet.google.com/abc-defg-hij"
    assert len(data["preparation_checklist"]) > 0
