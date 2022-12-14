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

async function doGetRequest(pathAndParams: string): Promise<any> {
  const response = await fetch(`${process.env.REACT_APP_BACK_URL}/${pathAndParams}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  })
  return await response.json()
}

async function doPostRequest(path: string, body: any = {}): Promise<any> {
  const response = await fetch(`${process.env.REACT_APP_BACK_URL}/${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  })
  return await response.json()
}

export async function getPing(): Promise<void> {
  await doGetRequest('ping')
}

export async function postUser(): Promise<string> {
  const json: { userUri: string } = await doPostRequest('user')
  return json.userUri
}

export async function checkUserExists(userUid: string): Promise<boolean> {
  const json: { userExists: boolean } = await doGetRequest(
    `user?userUri=${userUid}`)
  return json.userExists
}

export async function postGameSession(userUri: string): Promise<GameSession> {
  return await doPostRequest('game_session', {userUri: userUri})
}

export async function postEntityGuessingSentences(
  entityGuessingUri: string, 
  previousSentences: string[], 
  newSentence: string): Promise<GuessedEntity> {
    
  const body = {
    entityGuessingUri: entityGuessingUri, 
    previousSentences: previousSentences,
    newSentence: newSentence
  }
  return await doPostRequest('entity_guessing_sentence', body)
}

export async function postEndOfGuessing(entityToGuessUri: string, entityGuessingUri: string): Promise<void> {
  const body = {
    entityToGuessUri: entityToGuessUri,
    entityGuessingUri: entityGuessingUri
  }
  await doPostRequest('end_of_guessing', body)
}

export async function getGameSessionResult(gameSessionUri: string): Promise<GameSessionResult> {
  return await doGetRequest(`game_session_result?gameSessionUri=${gameSessionUri}`)
}
