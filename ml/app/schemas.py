from typing import List

from pydantic import BaseModel # pylint: disable=no-name-in-module


class GuessEntityQuery(BaseModel):
    uri: str
    description_sentences: List[str]

class EntityScore(BaseModel):
    uri: str
    score: float

class GuessEntityReply(BaseModel):
    guesses: List[EntityScore]
