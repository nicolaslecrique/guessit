import React from 'react'
import { Link } from 'react-router-dom'
import { Discussion, MessageProps } from './Discussion'
import Timer from './Timer'
import { scoreRoute } from '../core/Routing'


type PlayingProps = {
    isEndOfRound: boolean,
    isLastRound: boolean,
    gameSessionUri: string,
    entityName: string,
    messages: MessageProps[],
    onEndOfRound: () => void,
    onClickNext: () => void,
    typedMessage: string,
    onChangeTypedMessage: (message: string) => void,
    onSendMessage: () => void
  }
  
  function Playing({ isEndOfRound, isLastRound, gameSessionUri, entityName, messages, onEndOfRound, onClickNext, typedMessage, onChangeTypedMessage, onSendMessage }: PlayingProps): JSX.Element {
    let statusBar: JSX.Element
    let bottomBar: JSX.Element
    if (!isEndOfRound) {
      statusBar = (<div><b>{entityName}</b> | <Timer onFinish={() => onEndOfRound()}/> | <button onClick={() => onClickNext()}>Skip</button></div>)
      bottomBar = (
        <form onSubmit={(event) => {
          event.preventDefault()
          onSendMessage()
        }}>
          <input
            type="text"
            value={typedMessage}
            onChange={(event) => onChangeTypedMessage(event.target.value)}>
          </input>
          <button>Send</button>
        </form>
      )
    } else {
      statusBar = (<div><b>{entityName}</b></div>)
      if (isLastRound) {
        bottomBar = <Link to={scoreRoute(gameSessionUri)} ><button>Score</button></Link>
      } else {
        bottomBar = <button onClick={() => onClickNext()}>Next round</button>
      }
    }
  
    return (
      <div>
        {statusBar}
        <br/>
        <Discussion messages={messages}/>
        <br/>
        {bottomBar}
      </div>
    )
  }

  export default Playing
