from typing import Dict, List

from pydantic import BaseModel # pylint: disable=no-name-in-module


class GuessEntityQuery(BaseModel):
    entity_to_guess_uri: str
    description_sentences: List[str]

class GuessEntityReply(BaseModel):
    guesses: Dict[str, float]
