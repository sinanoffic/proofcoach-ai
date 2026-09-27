import re


DEMO_QUESTIONS = [
    {
        "level": "D",
        "reason": "High-impact quantified claim needs evidence verification.",
        "question": "You wrote that you reduced API latency by 35%. What was the original baseline, how did you measure the improvement, and what did you personally change?",
    },
    {
        "level": "E",
        "reason": "Ownership was visible; trade-off depth is still weak.",
        "question": "What trade-offs did your caching change introduce, and when would you avoid that approach?",
    },
    {
        "level": "F",
        "reason": "Testing and failure-mode depth need pressure testing.",
        "question": "Assume traffic grows tenfold and cached data becomes stale. How would you redesign and validate the system?",
    },
]


def question_for(index: int) -> dict:
    return DEMO_QUESTIONS[min(index, len(DEMO_QUESTIONS) - 1)]


def evaluate_answer(answer: str) -> dict:
    lower = answer.casefold()
    baseline = bool(re.search(r"\b(?:from|baseline|before|original)\b.*?\b\d+\s*(?:ms|seconds?|%)", lower))
    measurement = any(term in lower for term in ["measured", "benchmark", "postman", "logs", "average", "p95", "load test"])
    ownership = any(term in lower for term in ["i changed", "i implemented", "i added", "my contribution", "i profiled"])
    tradeoffs = any(term in lower for term in ["trade-off", "stale", "memory", "consistency", "invalidation", "cost"])
    scaling = any(term in lower for term in ["load", "concurrency", "horizontal", "queue", "replica", "scale"])
    words = re.findall(r"\b[\w'-]+\b", answer)
    fillers = sum(lower.count(item) for item in ["um", "uh", "like", "basically"])
    dimensions = {
        "baseline": "yes" if baseline else "partial",
        "measurement": "yes" if measurement and any(char.isdigit() for char in answer) else "partial" if measurement else "weak",
        "personal_contribution": "yes" if ownership else "partial",
        "trade_offs": "yes" if tradeoffs else "weak",
        "scaling_knowledge": "yes" if scaling else "weak",
    }
    demonstrated = sum(value == "yes" for value in dimensions.values())
    confidence_after = min(88, 58 + demonstrated * 8 + sum(value == "partial" for value in dimensions.values()) * 4)
    scores = {
        "technical_fundamentals": 74 if measurement else 62,
        "problem_solving": 76 if baseline else 64,
        "project_ownership": 82 if ownership else 60,
        "communication_clarity": min(90, 58 + min(25, len(words) // 3) - fillers * 2),
        "evidence_impact": confidence_after,
        "learning_ability": 72,
    }
    return {
        "dimensions": dimensions,
        "scores": scores,
        "claim_confidence_before": 58,
        "claim_confidence_after": confidence_after,
        "observable_indicators": {
            "word_count": len(words),
            "filler_words": fillers,
            "answer_structure": "clear" if len(words) >= 45 else "developing",
            "relevance": "high" if any(term in lower for term in ["latency", "api", "cache", "measure"]) else "partial",
        },
        "evidence_note": "The answer demonstrated stronger understanding. This does not independently prove that the real-world claim is true.",
        "feedback": "You established ownership and the direction of improvement. Add the exact test method, sample size, percentile used, and the downside of caching to make the claim defensible.",
    }

