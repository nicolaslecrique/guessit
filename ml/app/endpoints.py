from fastapi import APIRouter
from starlette.requests import Request

from app.schemas import GuessEntityQuery, GuessEntityReply, SentencesQuery


router = APIRouter()

@router.post("/guess_entity", response_model=GuessEntityReply)
def guess_entity(request: Request, query: GuessEntityQuery) -> GuessEntityReply:
    guesses = request.app.state.guesser.guess(query.descriptionSentences)

    return GuessEntityReply(guesses=guesses)

@router.post("/sentences", response_model=None)
def sentences(request: Request, query: SentencesQuery) -> None:
    request.app.state.guesser.add_sentences(query.entityToGuessUri, query.descriptionSentences)
