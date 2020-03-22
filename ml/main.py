from typing import Dict, List

import uvicorn
from fastapi import FastAPI
from pydantic import BaseModel

from starlette.middleware.cors import CORSMiddleware

# don't change variable name, it's use by docker image : https://github.com/tiangolo/uvicorn-gunicorn-fastapi-docker
app = FastAPI()

# Todo: manage security properly if exposed to the internet
app.add_middleware(
    CORSMiddleware,
    allow_origins="*",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def root():
    return {"message": "Hello World from ml"}


class GuessEntityQuery(BaseModel):
    description_sentences: List[str]


@app.post("/guess_entity")
async def guess_entity(guess_entity_query: GuessEntityQuery) -> Dict:
    return {"guesses": {
        "entity_1": 0.8,
        "entity_2": 0.3
    }
    }


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8060)
