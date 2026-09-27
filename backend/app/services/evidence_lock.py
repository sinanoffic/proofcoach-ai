import re


NUMBER_PATTERN = re.compile(r"\b\d+(?:\.\d+)?\s*%?|\b\d+[kKmM]\+?\b")
TECH_TERMS = {"Docker", "Kubernetes", "AWS", "React", "FastAPI", "Python", "SQL", "PostgreSQL"}


def assess_rewrite(original: str, proposed: str, confirmed_facts: list[str] | None = None) -> dict:
    confirmed_facts = confirmed_facts or []
    original_numbers = set(NUMBER_PATTERN.findall(original)) | {item for fact in confirmed_facts for item in NUMBER_PATTERN.findall(fact)}
    proposed_numbers = set(NUMBER_PATTERN.findall(proposed))
    invented_numbers = sorted(proposed_numbers - original_numbers)
    original_tech = {term for term in TECH_TERMS if term.casefold() in original.casefold() or any(term.casefold() in fact.casefold() for fact in confirmed_facts)}
    proposed_tech = {term for term in TECH_TERMS if term.casefold() in proposed.casefold()}
    invented_tech = sorted(proposed_tech - original_tech)

    if invented_numbers or invented_tech:
        facts = invented_numbers + invented_tech
        return {
            "status": "blocked",
            "color": "red",
            "message": "Evidence Lock prevented an unsupported achievement from being added.",
            "unsupported": facts,
            "safe_alternative": "Optimized API response performance.",
        }
    materially_stronger = any(term in proposed.casefold() for term in ["led", "architected", "owned", "expert", "award-winning"])
    if materially_stronger and not any(term in original.casefold() for term in ["led", "architected", "owned", "expert", "award-winning"]):
        return {"status": "confirm", "color": "amber", "message": "This wording changes the ownership or strength of the claim. Confirm evidence before using it.", "unsupported": [], "safe_alternative": original}
    return {"status": "safe", "color": "green", "message": "Safe rewrite: wording improved without adding a new fact.", "unsupported": [], "safe_alternative": proposed}

