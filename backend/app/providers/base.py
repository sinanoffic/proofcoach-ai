from abc import ABC, abstractmethod


class AIProvider(ABC):
    @abstractmethod
    def extract_resume(self, text: str) -> dict: ...

    @abstractmethod
    def analyze_job(self, description: str) -> dict: ...

    @abstractmethod
    def build_evidence_graph(self, candidate_skills: list[str], required_skills: list[str]) -> dict: ...

    @abstractmethod
    def generate_interview_question(self, index: int) -> dict: ...

    @abstractmethod
    def evaluate_answer(self, answer: str) -> dict: ...

    @abstractmethod
    def rewrite_resume(self, original: str, proposed: str, confirmed_facts: list[str]) -> dict: ...

    @abstractmethod
    def create_learning_plan(self, gaps: list[str], daily_minutes: int) -> dict: ...

    @abstractmethod
    def analyze_transcript(self, transcript: str) -> dict: ...

