import json

from fastapi import FastAPI
from models import ArticleRequest
from service import check_article
from config import ALLOWED_ORIGINS
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="ChatGPT API Microservice")

origins = [o.strip() for o in ALLOWED_ORIGINS.split(",") if o.strip()] or ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/health")
def health():
    return {"status": "ok", "service": "IAModel"}


@app.post("/article")
def chat(request: ArticleRequest):
    try:
        response = check_article(request)
        data = json.loads(response)

        return {
            "error": "",
            "success": True,
            "result": {
                "percentaje_trust": data["percentaje-trust"],
                "reliable_source": data["reliable-source"],
                "scientific_evidence": data["scientific-evidence"],
                "citations_and_references": data["citations-and-references"],
                "target_language": data["target-language"],
                "context_and_limitations": data["context-and-limitations"],
                "feedback": data["feedback"]
            }
        }

    except Exception as e:
        return {
            "error": str(e),
            "success": False,
            "result": None
        }
