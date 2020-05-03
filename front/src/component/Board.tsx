import React from 'react'
import { Redirect } from 'react-router-dom'
import Cookies from 'js-cookie'
import ChooseEntity from './ChooseEntity'
import { MessageProps } from './Discussion'
import { Entity, GameSession, postUser, postEntityGuessingSentences, postGameSession } from '../service/BackRestService'
import { scoreRoute } from '../core/Routing'
import Playing from './Playing'


enum PlayState {
  ChooseEntity,
  Play,
  EndOfRound
}

type BoardState = {
  playState: PlayState,
  userUri: string,
  gameSession: GameSession,
  entity: Entity,
  noMoreEntitiesToChoose: boolean,
  remainingRounds: number
  messages: MessageProps[],
  typedMessage: string
}

class Board extends React.Component<{}, BoardState> {
  constructor(props: {}) {
    super(props)
    this.state = {
      playState: PlayState.ChooseEntity,
      userUri: "",
      gameSession: { gameSessionUri: "", entitiesToGuess: [] },
      entity: { entityUri: "", entityGuessingUri: "", entityName: ""},
      noMoreEntitiesToChoose: false,
      remainingRounds: 3,
      messages: [],
      typedMessage: "",
    }
  }

  async componentDidMount(): Promise<void> {
    const userUri = await this.initUser()
    this.initGameSession(userUri)
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
      remainingRounds: this.state.remainingRounds - 1,
      messages: [],
      typedMessage: ""
    })
  }

  entityGuessed(entityName: string): void {
    let message = entityName
    let newPlayState = this.state.playState
    if (entityName === this.state.entity.entityName) {
      message += ' :)'
      newPlayState = PlayState.EndOfRound
    }

    let messages = this.state.messages.slice()
    messages.push({ author: "AI", message: message})

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
  
      messages.push({ author: "Human", message: this.state.typedMessage })
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
      case PlayState.ChooseEntity: { 
        if(this.state.remainingRounds > 0 && !this.state.noMoreEntitiesToChoose) {
          return (
            <ChooseEntity
              entityName={this.state.entity.entityName}
              remainingRounds={this.state.remainingRounds}
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
            isLastRound={this.state.remainingRounds === 1}
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
