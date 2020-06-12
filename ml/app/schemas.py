from typing import Dict, List

from pydantic import BaseModel # pylint: disable=no-name-in-module


class MlQuery(BaseModel):
    apiKey: str


class GuessEntityQuery(MlQuery):
    descriptionSentences: List[str]


class GuessEntityReply(BaseModel):
    guesses: Dict[str, float]


class SentencesQuery(MlQuery):
    entityToGuessUri: str
    descriptionSentences: List[str]
