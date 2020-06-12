import os

from fastapi import APIRouter
from starlette.requests import Request

from app.schemas import GuessEntityQuery, GuessEntityReply, SentencesQuery, MlQuery

router = APIRouter()
back_api_key = os.environ.get("BACK_API_KEY", "test_ml_api_key")


def check_api_key(query: MlQuery):
    if query.apiKey != back_api_key:
        raise Exception("invalid client api key")

@router.post("/guess_entity", response_model=GuessEntityReply)
def guess_entity(request: Request, query: GuessEntityQuery) -> GuessEntityReply:
    check_api_key(query)
    guesses = request.app.state.guesser.guess(query.descriptionSentences)
    return GuessEntityReply(guesses=guesses)

@router.post("/sentences", response_model=None)
def sentences(request: Request, query: SentencesQuery) -> None:
    check_api_key(query)
    request.app.state.guesser.add_sentences(query.entityToGuessUri, query.descriptionSentences)
