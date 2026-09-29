from typing import Literal

from pydantic import BaseModel, Field, HttpUrl


Status = Literal["pass", "warning", "missing"]


class ParserCheck(BaseModel):
    label: str
    status: Status
    detail: str
    points: int
    maximum: int


class ParserAnalysis(BaseModel):
    filename: str
    text_preview: str
    sections: dict[str, list[str] | str]
    skills: list[str]
    technologies: list[str]
    measurable_claims: list[str]
    checks: list[ParserCheck]
    parser_robustness: int
    disclaimer: str = "Phoenix Parser Robustness is a transparent local heuristic, not a universal ATS score."


class JobRequest(BaseModel):
    role: str = "Backend Developer"
    job_description: str = ""


class JobAnalysis(BaseModel):
    role: str
    required_skills: list[str]
    preferred_skills: list[str]
    responsibilities: list[str]
    competencies: list[str]
    experience_requirement: str


class EvidenceGraphRequest(BaseModel):
    candidate_skills: list[str]
    required_skills: list[str]


class ClaimRequest(BaseModel):
    text: str


class InterviewStartRequest(BaseModel):
    claim: str = "Reduced API latency by 35%."
    role: str = "Backend Developer"
    mode: Literal["Text", "Voice"] = "Text"


class AnswerRequest(BaseModel):
    answer: str = Field(min_length=1)


class RewriteRequest(BaseModel):
    original: str
    proposed: str
    confirmed_facts: list[str] = []


class LearningRequest(BaseModel):
    gaps: list[str]
    daily_minutes: int = Field(default=150, ge=120, le=180)


class VideoPlanRequest(BaseModel):
    url: HttpUrl
    title: str = "Backend development course"
    duration_minutes: int = Field(default=900, ge=1, le=3000)
    daily_minutes: int = Field(default=150, ge=120, le=180)
    transcript_or_notes: str = ""


class FocusRequest(BaseModel):
    elapsed_seconds: int = Field(ge=0)
    limit_minutes: int = Field(default=150, ge=120, le=180)
    demo_timer: bool = False

