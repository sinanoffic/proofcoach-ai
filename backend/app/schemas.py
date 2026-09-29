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


class EmailFieldConfidence(BaseModel):
    value: str
    confidence: Literal["clearly_found", "inferred", "not_found"]
    source_text: str | None = None


class InterviewerModel(BaseModel):
    name: str
    role: str | None = None


class PreparationChecklistModel(BaseModel):
    id: str
    label: str
    done: bool = False


class SuggestedPreparationModel(BaseModel):
    technical: list[str] = []
    role: list[str] = []
    company: list[str] = []
    profile_matched_skills: list[str] = []


class TimelineStepModel(BaseModel):
    label: str
    date: str | None = None
    status: Literal["completed", "current", "upcoming"]
    detail: str | None = None


class DeadlineModel(BaseModel):
    label: str
    date: str


class InterviewEmailAnalysis(BaseModel):
    id: str
    source: Literal["upload", "paste"]
    file_name: str | None = None
    original_email: str
    subject: str | None = None
    sender: str | None = None
    recipient: str | None = None
    company: EmailFieldConfidence
    role: EmailFieldConfidence
    interview_type: EmailFieldConfidence
    interview_date: EmailFieldConfidence
    interview_time: EmailFieldConfidence
    timezone: EmailFieldConfidence
    platform: EmailFieldConfidence
    meeting_link: str | None = None
    location: str | None = None
    duration: str | None = None
    interviewers: list[InterviewerModel] = []
    preparation_requirements: list[str] = []
    preparation_checklist: list[PreparationChecklistModel] = []
    suggested_preparation: SuggestedPreparationModel = Field(default_factory=SuggestedPreparationModel)
    deadlines: list[DeadlineModel] = []
    attachments: list[str] = []
    timeline: list[TimelineStepModel] = []
    summary: str
    status: Literal["Upcoming", "Today", "Completed", "Cancelled", "Needs Review"]
    created_at: str
    updated_at: str


class InterviewEmailTextRequest(BaseModel):
    email_text: str
    file_name: str | None = None
    candidate_skills: list[str] = []
    candidate_role: str | None = None


