from fastapi import APIRouter
from starlette.requests import Request

from app.schemas import EntityScore, GuessEntityQuery, GuessEntityReply


router = APIRouter()

@router.post("/guess_entity", response_model=GuessEntityReply)
def guess_entity(request: Request, query: GuessEntityQuery) -> GuessEntityReply:
    guesses = request.app.state.guesser.guess(query.uri, query.description_sentences)

    return GuessEntityReply(guesses=[EntityScore(uri=uri, score=score) for uri, score in guesses])
