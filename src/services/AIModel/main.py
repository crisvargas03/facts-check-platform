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
                "motive": data["motive"],
                "percentage_trust": data["percentage-trust"],
                "evaluation_factors": [
                    {
                        "title": factor["title"],
                        "description": factor["descripcion"],
                        "evaluation_result": factor["evaluation-result"]
                    }
                    for factor in data["evaluation-factors"]
                ]
            }
        }
        
    except Exception as e:
        return {
            "error": str(e),
            "success": False,
            "result": None
        }
