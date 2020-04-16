from fastapi import APIRouter
from starlette.requests import Request

from app.schemas import GuessEntityQuery, GuessEntityReply


router = APIRouter()

@router.post("/guess_entity", response_model=GuessEntityReply)
def guess_entity(request: Request, query: GuessEntityQuery) -> GuessEntityReply:
    guesses = request.app.state.guesser.guess(query.entity_to_guess_uri, query.description_sentences)

    return GuessEntityReply(guesses=guesses)
