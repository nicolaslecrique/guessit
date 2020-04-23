import React from 'react'
import { Link, Redirect } from 'react-router-dom'
import Cookies from 'js-cookie'
import Base from './Base'
import ChooseEntity from './ChooseEntity'
import { Discussion, MessageProps } from './Discussion'
import Timer from './Timer'
import { Entity, GameSession, postUser, postEntityGuessingSentences, postGameSession } from './BackRestService'
import { scoreRoute } from './Routing'


// TODO bind/class field function/arrow function
// It seems that arrow function "() => ..." is less efficient than binding.
// https://reactjs.org/docs/handling-events.html

// TODO
// Handling errors in the second parameter of then method (Bellow a copy/past of React documentation).
// Note: it's important to handle errors here
// instead of a catch() block so that we don't swallow
// exceptions from actual bugs in components.

// TODO Should we use hooks ?

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
    let messages = this.state.messages.slice()

    let entityToGuessUri = this.state.entity.entityUri
    let entityGuessingUri = this.state.entity.entityGuessingUri
    let previousSentences = messages.map(message => {return message.message})
    let newSentence = this.state.typedMessage

    this.guessEntity(entityToGuessUri, entityGuessingUri, previousSentences, newSentence)

    messages.push({ author: "Human", message: this.state.typedMessage })
    this.setState({
      messages: messages,
      typedMessage: ""  
    })
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

  renderChooseEntity(): JSX.Element {
    return (
      <ChooseEntity
        entityName={this.state.entity.entityName}
        remainingRounds={this.state.remainingRounds}
        onClickGo={() => this.startRound()}
        onClickPass={() => this.nextEntity()}
      />
    )
  }

  renderPlaying(): JSX.Element {
    return (
      <Base>
        <div>
          <b>{this.state.entity.entityName}</b> | <Timer onFinish={() => this.setState({playState: PlayState.EndOfRound})}/> | <button onClick={() => {this.nextRound()}}>Skip</button>
        </div>
        <br/>
        <Discussion messages={this.state.messages}/>
        <br/>
        <form onSubmit={(event) => {
          event.preventDefault()
          this.sendMessage()
        }}>
          <input type="text" value={this.state.typedMessage} onChange={(event) => {this.setState({ typedMessage: event.target.value })}}></input>
          <button>Send</button>
        </form>
      </Base>
    )
  }

  renderEndOfRound(): JSX.Element {
    let button
    // If it's the last round
    if (this.state.remainingRounds === 1) {
      button = <Link to={scoreRoute(this.state.gameSession.gameSessionUri)} ><button>Score</button></Link>
    } else {
      button = <button onClick={() => {this.nextRound()}}>Next round</button>
    }

    return (
      <Base>
        <div>
          <b>{this.state.entity.entityName}</b>
        </div>
        <br/>
        <Discussion messages={this.state.messages}/>
        <br/>
        {button}
      </Base>
    )
  }

  render(): JSX.Element {
    switch(this.state.playState) { 
      case PlayState.ChooseEntity: { 
        if (this.state.remainingRounds !== 0) {
          return this.renderChooseEntity()
        } else {
          return <Redirect to={scoreRoute(this.state.gameSession.gameSessionUri)} />
        }
      } 
      case PlayState.Play: { 
        return this.renderPlaying()
      } 
      case PlayState.EndOfRound: { 
        return this.renderEndOfRound()
      }
      default: {
        // TODO Add an exception
        return (<div></div>)
      }
    }
  }
}

export default Board
