from functools import lru_cache
from pathlib import Path

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    demo_mode: bool = True
    database_url: str = "sqlite:///./data/proofcoach.db"
    ollama_base_url: str = "http://localhost:11434"
    ollama_model: str = "llama3.2:3b"
    frontend_origin: str = "http://localhost:5173"

    model_config = SettingsConfigDict(
        env_file=(Path(__file__).parents[2] / ".env", ".env"),
        env_file_encoding="utf-8",
        extra="ignore",
    )


@lru_cache
def get_settings() -> Settings:
    return Settings()

