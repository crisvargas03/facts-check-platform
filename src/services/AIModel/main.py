import json

from fastapi import FastAPI
from models import ArticleRequest
from service import check_article

app = FastAPI(title="ChatGPT API Microservice")


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
