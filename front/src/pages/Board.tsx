import React from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import ChooseEntity from '../component/ChooseEntity'
import {AiConfidence, Author, MessageProps} from '../component/Message'
import {Entity, GameSession, postEntityGuessingSentences, postGameSession, postUser} from '../service/BackRestService'
import {scoreRoute} from '../core/Routing'
import Playing from '../component/Playing'
import LoadingScreen from '../component/LoadingScreen'


enum PlayState {
  Loading,
  ChooseEntity,
  Play,
  EndOfRound
}

const nbRounds = 5

type BoardState = {
  playState: PlayState,
  userUri: string,
  gameSession: GameSession,
  entity: Entity,
  noMoreEntitiesToChoose: boolean,
  currentRoundIdx: number
  messages: MessageProps[],
  typedMessage: string
}

class Board extends React.Component<{}, BoardState> {
  constructor(props: {}) {
    super(props)
    this.state = {
      playState: PlayState.Loading,
      userUri: "",
      gameSession: { gameSessionUri: "", entitiesToGuess: [] },
      entity: { entityUri: "", entityGuessingUri: "", entityName: ""},
      noMoreEntitiesToChoose: false,
      currentRoundIdx: 0,
      messages: [],
      typedMessage: "",
    }
  }

  async componentDidMount(): Promise<void> {
    const userUri = await this.initUser()
    await this.initGameSession(userUri)
  }

  nextEntity(): void {
    const entities = this.state.gameSession.entitiesToGuess.slice()
    const entity = entities.shift()

    if (entity) {
      const gameSession = {
        gameSessionUri: this.state.gameSession.gameSessionUri,
        entitiesToGuess: entities
      }

      this.setState({
        gameSession: gameSession,
        entity: entity
      })
    } else {
      this.setState({
        noMoreEntitiesToChoose: true
      })   
    }
  }

  startRound(): void {
    this.setState({
      playState: PlayState.Play,
    })
  }

  nextRound(): void {
    this.nextEntity()
    this.setState({
      playState: PlayState.ChooseEntity,
      currentRoundIdx: this.state.currentRoundIdx + 1,
      messages: [],
      typedMessage: ""
    })
  }

  entityGuessed(entityName: string): void {
    let message = entityName
    let newPlayState = this.state.playState
    const aiFound = entityName === this.state.entity.entityName
    if (aiFound) {
      newPlayState = PlayState.EndOfRound
    }

    let messages = this.state.messages.slice()
    messages.push({ author: Author.AI, message: message, aiConfidence: aiFound ? AiConfidence.Sure : AiConfidence.Thinking})

    this.setState({
      playState: newPlayState,
      messages: messages
    })
  }

  sendMessage(): void {
    let newSentence = this.state.typedMessage.trim()

    if (newSentence) {
      let messages = this.state.messages.slice()

      let entityToGuessUri = this.state.entity.entityUri
      let entityGuessingUri = this.state.entity.entityGuessingUri
      let previousSentences = messages.map(message => {return message.message})
  
      this.guessEntity(entityToGuessUri, entityGuessingUri, previousSentences, newSentence)
  
      messages.push({ author: Author.Player, message: this.state.typedMessage, aiConfidence: null })

      this.setState({
        messages: messages,
        typedMessage: ""  
      })
    }
  }

  async initUser(): Promise<string> {
    let userUri = Cookies.get("userUri")
    if (!userUri) {
      userUri = await postUser()
    }
    
    Cookies.set('userUri', userUri, { path: '' })

    this.setState({
      userUri: userUri
    })

    return userUri
  }

  async initGameSession(userUri: string): Promise<void> {
    let gameSession = await postGameSession(userUri)

    const entity = gameSession.entitiesToGuess.shift()

    if (entity) {
      this.setState({
        playState: PlayState.ChooseEntity,
        gameSession: gameSession,
        entity: entity
      })
    }
  }

  async guessEntity(
    entityToGuessUri: string, 
    entityGuessingUri: string, 
    previousSentences: string[], 
    newSentence: string): Promise<void> {
    
    const guessedEntity = await postEntityGuessingSentences(entityToGuessUri, entityGuessingUri, previousSentences, newSentence)
    this.entityGuessed(guessedEntity.guessedEntityName)
  }

  render(): JSX.Element {
    switch(this.state.playState) {
      case PlayState.Loading:
        return <LoadingScreen/>
      case PlayState.ChooseEntity: {
        if(this.state.currentRoundIdx < nbRounds && !this.state.noMoreEntitiesToChoose) {
          return (
            <ChooseEntity
              entityName={this.state.entity.entityName}
              currentRoundIdx={this.state.currentRoundIdx}
              nbRounds={nbRounds}
              onClickGo={() => this.startRound()}
              onClickPass={() => this.nextEntity()}
            />
          )
        }
        else {
          return <Redirect to={scoreRoute(this.state.gameSession.gameSessionUri)} />
        }
      } 
      case PlayState.Play:
      case PlayState.EndOfRound: {
        return (
          <Playing
            isEndOfRound={this.state.playState !== PlayState.Play}
            isLastRound={this.state.currentRoundIdx === nbRounds - 1}
            gameSessionUri={this.state.gameSession.gameSessionUri}
            entityName={this.state.entity.entityName}
            messages={this.state.messages}
            onEndOfRound={() => this.setState({playState: PlayState.EndOfRound})}
            onClickNext={() => this.nextRound()}
            typedMessage={this.state.typedMessage}
            onChangeTypedMessage={(message: string) =>  this.setState({ typedMessage: message })}
            onSendMessage={() => this.sendMessage()}
          />
        )
      }
      default: {
        throw new Error(`Unmanaged PlayState: ${this.state.playState}`)
      }
    }
  }
}

export default Board
