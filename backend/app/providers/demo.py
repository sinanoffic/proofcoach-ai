from .base import AIProvider
from ..services.evidence import analyze_job, build_evidence_graph
from ..services.evidence_lock import assess_rewrite
from ..services.interview import evaluate_answer, question_for
from ..services.learning import create_learning_plan
from ..services.resume import analyze_resume_text


class DemoAIProvider(AIProvider):
    def extract_resume(self, text: str) -> dict:
        return analyze_resume_text(text).model_dump()

    def analyze_job(self, description: str) -> dict:
        return analyze_job("Backend Developer", description)

    def build_evidence_graph(self, candidate_skills: list[str], required_skills: list[str]) -> dict:
        return build_evidence_graph(candidate_skills, required_skills)

    def generate_interview_question(self, index: int) -> dict:
        return question_for(index)

    def evaluate_answer(self, answer: str) -> dict:
        return evaluate_answer(answer)

    def rewrite_resume(self, original: str, proposed: str, confirmed_facts: list[str]) -> dict:
        return assess_rewrite(original, proposed, confirmed_facts)

    def create_learning_plan(self, gaps: list[str], daily_minutes: int) -> dict:
        return create_learning_plan(gaps, daily_minutes)

    def analyze_transcript(self, transcript: str) -> dict:
        topics = [line.strip() for line in transcript.splitlines() if len(line.strip()) > 20][:8]
        return {"topics": topics, "learning_objectives": [f"Explain {topic[:60]}" for topic in topics[:4]], "source": "user-provided transcript/notes"}

