import React from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import ChooseEntity from '../component/ChooseEntity'
import {AiConfidence, Author} from '../component/Message'
import {
  checkUserExists,
  Entity,
  GameSession,
  postEndOfGuessing,
  postEntityGuessingSentences,
  postGameSession,
  postUser
} from '../service/BackRestService'
import {scoreRoute} from '../core/Routing'
import Playing from '../component/Playing'
import LoadingScreen from '../component/LoadingScreen'
import {numberOfRounds} from '../core/Game'
import {DiscussionMessageProps} from '../component/Discussion'


const initMessage = {
  author: Author.AI,
  message: `Describe your character. I'll try to guess it`,
  aiConfidence: AiConfidence.Start
}

const timeoutMessage = {
  author: Author.AI,
  message: `Time's up!`,
  aiConfidence: AiConfidence.Timeout
}

enum PlayState {
  Loading,
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
  currentRoundIdx: number
  messages: DiscussionMessageProps[],
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
      messages: [initMessage],
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

  onGiveUpCurrentEntity(): void {
    postEndOfGuessing(this.state.entity.entityUri, this.state.entity.entityGuessingUri)
    this.nextRound()
  }

  nextRound(): void {
    this.nextEntity()
    this.setState({
      playState: PlayState.ChooseEntity,
      currentRoundIdx: this.state.currentRoundIdx + 1,
      messages: [initMessage],
      typedMessage: ""
    })
  }

  endOfRound(found: boolean): void {
    postEndOfGuessing(this.state.entity.entityUri, this.state.entity.entityGuessingUri)
    this.setState({
      playState: PlayState.EndOfRound,
      messages: found ? this.state.messages : this.state.messages.concat(timeoutMessage)
    })
  }

  entityGuessed(entityName: string): void {
    let message = entityName
    const aiFound = entityName === this.state.entity.entityName
    if (aiFound) {
      this.endOfRound(true)
    }

    let messages = this.state.messages.slice()
    messages.push({ author: Author.AI, message: message, aiConfidence: aiFound ? AiConfidence.Sure : AiConfidence.Thinking})

    this.setState({
      messages: messages
    })
  }

  sendMessage(): void {
    let newSentence = this.state.typedMessage.trim()

    if (newSentence) {
      let messages = this.state.messages.slice()

      let entityGuessingUri = this.state.entity.entityGuessingUri
      let previousSentences = messages.filter(message => message.author === Author.Player).map(message => {return message.message})
  
      this.guessEntity(entityGuessingUri, previousSentences, newSentence)
  
      messages.push({ author: Author.Player, message: this.state.typedMessage, aiConfidence: null })

      this.setState({
        messages: messages,
        typedMessage: ""  
      })
    }
  }

  async initUser(): Promise<string> {
    let userUri = Cookies.get("userUri")
    if (userUri) {
      const userExists = await checkUserExists(userUri)
      if (!userExists) {
        userUri = await postUser()
      }
    } else {
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
    entityGuessingUri: string, 
    previousSentences: string[], 
    newSentence: string): Promise<void> {
    
    const guessedEntity = await postEntityGuessingSentences(entityGuessingUri, previousSentences, newSentence)
    this.entityGuessed(guessedEntity.guessedEntityName)
  }

  render(): JSX.Element {
    switch(this.state.playState) {
      case PlayState.Loading:
        return <LoadingScreen/>
      case PlayState.ChooseEntity: {
        if(this.state.currentRoundIdx < numberOfRounds && !this.state.noMoreEntitiesToChoose) {
          return (
            <ChooseEntity
              entityName={this.state.entity.entityName}
              currentRoundIdx={this.state.currentRoundIdx}
              nbRounds={numberOfRounds}
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
            isLastRound={this.state.currentRoundIdx === numberOfRounds - 1}
            gameSessionUri={this.state.gameSession.gameSessionUri}
            entityName={this.state.entity.entityName}
            messages={this.state.messages}
            onTimeout={() => this.endOfRound(false)}
            onGiveUpCurrentEntity={() => this.onGiveUpCurrentEntity()}
            onNextAfterEndOfRound={() => this.nextRound()}
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
