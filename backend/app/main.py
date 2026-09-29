import json
from contextlib import asynccontextmanager

from fastapi import Depends, FastAPI, File, HTTPException, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from sqlmodel import Session, delete, select

from .config import get_settings
from .db import create_db_and_tables, get_session
from .models import CandidateProfile, InterviewSession, ResumeRecord
from .schemas import (
    AnswerRequest, ClaimRequest, EvidenceGraphRequest, FocusRequest, InterviewEmailTextRequest,
    InterviewStartRequest, JobRequest, LearningRequest, RewriteRequest, VideoPlanRequest,
)
from .seed import DEMO_RESUME_TEXT, demo_state
from .services.email_intelligence import analyze_email_text, extract_email_text_from_bytes
from .services.evidence import analyze_job, build_evidence_graph
from .services.evidence_lock import assess_rewrite
from .services.focus import focus_status
from .services.interview import evaluate_answer, question_for
from .services.learning import create_learning_plan, create_video_plan
from .services.resume import analyze_resume_text, extract_claims, parse_resume


settings = get_settings()


@asynccontextmanager
async def lifespan(_: FastAPI):
    create_db_and_tables()
    yield


app = FastAPI(title="Phoenix", version="0.1.0", lifespan=lifespan)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[settings.frontend_origin, "http://127.0.0.1:5173"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/api/health")
def health() -> dict:
    return {"status": "ok", "mode": "demo" if settings.demo_mode else "ollama", "local_first": True}


@app.post("/api/demo/reset")
def reset_demo(session: Session = Depends(get_session)) -> dict:
    for model in (InterviewSession, ResumeRecord, CandidateProfile):
        session.exec(delete(model))
    session.add(CandidateProfile(name="Demo Candidate"))
    analysis = analyze_resume_text(DEMO_RESUME_TEXT, layout={"two_column": True, "tables": True})
    session.add(ResumeRecord(filename="phoenix-demo-resume.pdf", extracted_text=DEMO_RESUME_TEXT, parser_score=analysis.parser_robustness, analysis_json=analysis.model_dump_json()))
    session.commit()
    return {"reset": True, "state": demo_state()}


@app.get("/api/demo/state")
def get_demo_state() -> dict:
    return demo_state()


@app.post("/api/resume/parse")
async def resume_parse(file: UploadFile = File(...)) -> dict:
    if not file.filename or not file.filename.lower().endswith((".pdf", ".docx")):
        raise HTTPException(status_code=415, detail="Upload a PDF or DOCX resume.")
    data = await file.read()
    if len(data) > 8 * 1024 * 1024:
        raise HTTPException(status_code=413, detail="Resume must be under 8 MB.")
    try:
        return parse_resume(data, file.filename).model_dump()
    except ValueError as exc:
        raise HTTPException(status_code=422, detail=str(exc)) from exc


@app.post("/api/interview-email/upload")
async def interview_email_upload(file: UploadFile = File(...)) -> dict:
    data = await file.read()
    if len(data) > 8 * 1024 * 1024:
        raise HTTPException(status_code=413, detail="Email file must be under 8 MB.")
    try:
        text = extract_email_text_from_bytes(data, file.filename or "interview_email.txt")
        return analyze_email_text(text, file_name=file.filename, source="upload").model_dump()
    except ValueError as exc:
        raise HTTPException(status_code=422, detail=str(exc)) from exc


@app.post("/api/interview-email/analyze")
def interview_email_analyze(request: InterviewEmailTextRequest) -> dict:
    try:
        return analyze_email_text(
            request.email_text,
            file_name=request.file_name,
            candidate_skills=request.candidate_skills,
            candidate_role=request.candidate_role,
            source="paste" if not request.file_name else "upload",
        ).model_dump()
    except ValueError as exc:
        raise HTTPException(status_code=422, detail=str(exc)) from exc


@app.post("/api/role/analyze")
def role_analyze(request: JobRequest) -> dict:
    return analyze_job(request.role, request.job_description)


@app.post("/api/evidence/graph")
def evidence_graph(request: EvidenceGraphRequest) -> dict:
    return build_evidence_graph(request.candidate_skills, request.required_skills)


@app.post("/api/claims/extract")
def claims_extract(request: ClaimRequest) -> dict:
    claims = extract_claims(request.text)
    return {"claims": [{"claim": claim, "source": "resume", "metric": next(iter(__import__("re").findall(r"\d+(?:\.\d+)?\s*%", claim)), None), "baseline": "missing", "personal_contribution": "unverified", "supporting_evidence": "interview required", "interview_priority": "high"} for claim in claims]}


@app.post("/api/interview/start")
def interview_start(request: InterviewStartRequest, session: Session = Depends(get_session)) -> dict:
    record = InterviewSession(level="D", question_index=0)
    session.add(record)
    session.commit()
    session.refresh(record)
    return {"session_id": record.id, "claim": request.claim, "mode": request.mode, **question_for(0)}


@app.post("/api/interview/{session_id}/answer")
def interview_answer(session_id: int, request: AnswerRequest, session: Session = Depends(get_session)) -> dict:
    record = session.exec(select(InterviewSession).where(InterviewSession.id == session_id)).first()
    if not record:
        raise HTTPException(status_code=404, detail="Interview session not found.")
    transcript = json.loads(record.transcript_json)
    evaluation = evaluate_answer(request.answer)
    transcript.append({"question": question_for(record.question_index)["question"], "answer": request.answer, "evaluation": evaluation})
    record.question_index += 1
    record.level = question_for(record.question_index)["level"]
    record.transcript_json = json.dumps(transcript)
    session.add(record)
    session.commit()
    return {"evaluation": evaluation, "next_question": question_for(record.question_index), "session_id": record.id}


@app.post("/api/evidence-lock/rewrite")
def evidence_lock(request: RewriteRequest) -> dict:
    return assess_rewrite(request.original, request.proposed, request.confirmed_facts)


@app.post("/api/learning/plan")
def learning_plan(request: LearningRequest) -> dict:
    return create_learning_plan(request.gaps, request.daily_minutes)


@app.post("/api/video/plan")
def video_plan(request: VideoPlanRequest) -> dict:
    return create_video_plan(request.title, request.duration_minutes, request.daily_minutes, request.transcript_or_notes)


# The focus endpoint remains available for server-side state sync or mobile clients.
# The React frontend uses a local timer loop to avoid network overhead every second.
@app.post("/api/focus/status")
def focus(request: FocusRequest) -> dict:
    return focus_status(request.elapsed_seconds, request.limit_minutes, request.demo_timer)


@app.delete("/api/data")
def delete_my_data(session: Session = Depends(get_session)) -> dict:
    for model in (InterviewSession, ResumeRecord, CandidateProfile):
        session.exec(delete(model))
    session.commit()
    return {"deleted": ["profile", "resume", "interview transcript"], "local_database_retained_empty": True}

