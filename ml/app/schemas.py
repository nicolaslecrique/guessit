from typing import Dict, List

from pydantic import BaseModel # pylint: disable=no-name-in-module


class GuessEntityQuery(BaseModel):
    entityToGuessUri: str
    descriptionSentences: List[str]

class GuessEntityReply(BaseModel):
    guesses: Dict[str, float]
