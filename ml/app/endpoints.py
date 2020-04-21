from fastapi import APIRouter
from starlette.requests import Request

from app.schemas import GuessEntityQuery, GuessEntityReply


router = APIRouter()

@router.post("/guess_entity", response_model=GuessEntityReply)
def guess_entity(request: Request, query: GuessEntityQuery) -> GuessEntityReply:
    guesses = request.app.state.guesser.guess(query.entityToGuessUri, query.descriptionSentences)

    return GuessEntityReply(guesses=guesses)
