import json

from fastapi import FastAPI
from models import ChatRequest, ArticleRequest
from service import ask_chatgpt, check_article

app = FastAPI(title="ChatGPT API Microservice")


@app.post("/article")
def chat(request: ArticleRequest):
    response = check_article(request)
    data = json.loads(response)

    return {
        "fake_rating": data["fake-rating"],
        "feedback": data["feedback"]
    }
