import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import { Discussion } from './Discussion'
import Timer from './Timer'
import { scoreRoute } from '../core/Routing'
import {MessageProps} from './Message'
import {makeStyles} from '@material-ui/core/styles'
import {background, fancyFontFamily, stdMrg} from '../style/common_style'
import {Button, Typography} from '@material-ui/core'

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

const useStyles = makeStyles({
  root: {
    minHeight: '100vh',
    background: background
  },
  rootContent: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    maxWidth: '720px',
    margin: 'auto',
    height: '100vh',
  },
  topBar: {
    display: 'flex',
    justifyContent: 'center',
    margin: stdMrg
  },
  bottomBar: {
    display: 'flex',
    justifyContent: 'center',
  },
  entityName: {
    fontFamily: fancyFontFamily,
    marginRight: 'auto',
    color: "#fff",
  }
})


  // todo extract typing bar to display it in intro

  function Playing({ isEndOfRound, isLastRound, gameSessionUri, entityName, messages, onEndOfRound, onClickNext, typedMessage, onChangeTypedMessage, onSendMessage }: PlayingProps): JSX.Element {


    let bottomBar: JSX.Element

    const classes = useStyles()

    if (!isEndOfRound) {

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

      if (isLastRound) {
        bottomBar = <Link to={scoreRoute(gameSessionUri)} ><button>Score</button></Link>
      } else {
        bottomBar = <Button onClick={() => onClickNext()}>Next round</Button>
      }
    }

    const [nbSecLeft, setNbSecLeft] = useState(3000)

    function onTick(nbSecLeft: number) {
      setNbSecLeft(nbSecLeft)
    }

    return (
      <div className={classes.root}>
        <div className={classes.rootContent}>
          <div className={classes.topBar}>
            <Typography className={classes.entityName} variant="h5" >{entityName}</Typography>
            {!isEndOfRound &&
              <>
                <Timer nbSeconds={3000} onFinish={() => onEndOfRound()} onTick={(nbSecLeft) => onTick(nbSecLeft)}/>
                <Typography className={classes.entityName} variant="subtitle2" >{nbSecLeft}</Typography>
                <button onClick={() => onClickNext()}>Skip</button>
              </>
            }
          </div>
          <Discussion messages={messages}/>
          <div className={classes.bottomBar}>
          {bottomBar}
          </div>
        </div>
      </div>
    )
  }

  export default Playing
