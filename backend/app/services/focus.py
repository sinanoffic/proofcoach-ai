def focus_status(elapsed_seconds: int, limit_minutes: int = 150, demo_timer: bool = False) -> dict:
    limit_seconds = 20 if demo_timer else limit_minutes * 60
    ended = elapsed_seconds >= limit_seconds
    remaining = max(0, limit_seconds - elapsed_seconds)
    return {
        "ended": ended,
        "remaining_seconds": remaining,
        "autosaved": ended,
        "intensive_activity_locked": ended,
        "message": "Session complete. Progress is saved—take a real break." if ended else "Focus session active.",
        "future_mobile_note": "OS calls and notifications require future mobile integration; the web app only reduces in-app distractions.",
    }

