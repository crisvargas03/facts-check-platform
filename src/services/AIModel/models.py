from pydantic import BaseModel


class ArticleRequest(BaseModel):
    title: str
    body: str
    image: str = None
