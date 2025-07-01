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
                "fake_rating": data["fake-rating"],
                "feedback": data["feedback"]
            }
        }
        
    except Exception as e:
        return {
            "error": str(e),
            "success": False,
            "result": None
        }
