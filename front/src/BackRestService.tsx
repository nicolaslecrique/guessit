export type Entity = {
  entityUri: string,
  entityGuessingUri: string,
  entityName: string
}

export type GameSession = {
  gameSessionUri: string,
  entitiesToGuess: Entity[]
}

export type GuessedEntity = {
    guessedEntityUri: string,
    guessedEntityName: string
}

export type EntityGuessing = {
    entityToGuessName: string,
    entityGuessedName: string
}

export type GameSessionResult = {
    entityGuessingSessions: EntityGuessing[]
}

async function doPostRequest(path: string, body: any = {}) {
  const response = await fetch(`${process.env.REACT_APP_BACK_URL}/${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  })
  return await response.json()
}

export async function postUser() {
  const json: { userUri: string } = await doPostRequest('user')
  return json.userUri
}

export async function postGameSession(userUri: string) {
  const gameSession: GameSession = await doPostRequest('game_session', { userUri: userUri })
  return gameSession
}

export async function postEntityGuessingSentences(entityToGuessUri: string, entityGuessingUri: string, previousSentences: string[], newSentence: string) {
  const body = {
    entityToGuessUri: entityToGuessUri, 
    entityGuessingUri: entityGuessingUri, 
    previousSentences: previousSentences,
    newSentence: newSentence
  }
  const guessedEntity: GuessedEntity = await doPostRequest('entity_guessing_sentence', body)
  return guessedEntity
}

export async function getGameSessionResult(gameSessionUri: string) {
  const response = await fetch(`${process.env.REACT_APP_BACK_URL}/game_session_result?gameSessionUri=${gameSessionUri}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  })
  const gameSessionResult: GameSessionResult = await response.json()
  return gameSessionResult
}