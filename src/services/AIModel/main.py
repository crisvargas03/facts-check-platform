import json

from fastapi import FastAPI
from models import ArticleRequest
from service import check_article

app = FastAPI(title="ChatGPT API Microservice")


@app.post("/article")
def chat(request: ArticleRequest):
    response = check_article(request)
    data = json.loads(response)

    return {
        "error": "",
        "sucess": "",
        "result": {
            "fake_rating": data["fake-rating"],
            "feedback": data["feedback"]
        }
    }
