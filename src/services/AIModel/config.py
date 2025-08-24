from dotenv import load_dotenv
import os

load_dotenv()

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
MODEL = os.getenv("MODEL")
PROMPT = os.getenv("PROMPT")
ALLOWED_ORIGINS = os.getenv("ALLOWED_ORIGINS", "")