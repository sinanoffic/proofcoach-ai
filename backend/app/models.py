from datetime import datetime, timezone
from typing import Optional

from sqlmodel import Field, SQLModel


def utc_now() -> datetime:
    return datetime.now(timezone.utc)


class CandidateProfile(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    name: str
    category: str = "Student"
    education: str = "BE Artificial Intelligence & Machine Learning"
    experience: str = "Student — 2nd year"
    target_career: str = "Software Engineering"
    target_role: str = "Backend Developer"
    target_company: str | None = None
    daily_minutes: int = 150
    interview_mode: str = "Text"
    interviewer_persona: str = "Auto Pair"
    voluntary_gender: str | None = None
    created_at: datetime = Field(default_factory=utc_now)


class ResumeRecord(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    filename: str
    extracted_text: str
    parser_score: int
    analysis_json: str
    created_at: datetime = Field(default_factory=utc_now)


class InterviewSession(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    status: str = "active"
    level: str = "D"
    question_index: int = 0
    transcript_json: str = "[]"
    created_at: datetime = Field(default_factory=utc_now)

