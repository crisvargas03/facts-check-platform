from openai import OpenAI
from config import OPENAI_API_KEY, MODEL, PROMPT
from models import ArticleRequest

client = OpenAI(api_key=OPENAI_API_KEY)

def check_article(request: ArticleRequest) -> str:
    try:
        messages = [
            {
                "role": "system",
                "content": PROMPT
            },
            {
                "role": "user",
                "content": f"Titulo: {request.title}, Contenido: {request.body}"
            }
        ]

        response = client.chat.completions.create(
            model=MODEL,
            messages=messages,
            temperature=0.1
        )

        return response.choices[0].message.content.strip()

    except Exception as e:
        return f"Error al consultar la API de OpenAI: {e}"
