import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import { Discussion } from './Discussion'
import Timer from './Timer'
import { scoreRoute } from '../core/Routing'
import {MessageProps} from './Message'
import {makeStyles} from '@material-ui/core/styles'
import {background, fancyButton, fancyFontFamily, smallMrg, stdMrg} from '../style/common_style'
import {Button, Typography} from '@material-ui/core'
import IconButton from '@material-ui/core/IconButton'
import SkipNextIcon from '@material-ui/icons/SkipNext';
import SendIcon from '@material-ui/icons/Send';
import Input from '@material-ui/core/Input';
import TextField from '@material-ui/core/TextField'
import InputAdornment from '@material-ui/core/InputAdornment'


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
    height: '100vh',
    padding: smallMrg,
    background: background
  },
  rootContent: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    maxWidth: '450px',
    margin: 'auto',
    height: '100%',
  },
  topBar: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: smallMrg,
    alignItems: 'center'
  },
  bottomBar: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  entityName: {
    fontFamily: fancyFontFamily,
    marginRight: 'auto',
    color: "#fff",
    marginLeft: '12px' // identical to padding in "next" button
  },
  nbSecLeft: {
    backgroundColor: "#fff",
    fontFamily: fancyFontFamily,
    paddingLeft: smallMrg,
    paddingRight: smallMrg,
    borderRadius: smallMrg
  },
  skipButton: {
    marginLeft: 'auto',
    color: "#fff",
  },
  input: {
    marginTop: smallMrg,
    borderRadius: smallMrg,
    backgroundColor: "#fff",
    width: "100%",
    paddingLeft: smallMrg
  },
  nextRoundButton: {
    ...fancyButton,
    width: '200px',
    marginTop: smallMrg,
  }
})

  // todo extract typing bar to display it in intro

  function Playing({ isEndOfRound, isLastRound, gameSessionUri, entityName, messages, onEndOfRound, onClickNext, typedMessage, onChangeTypedMessage, onSendMessage }: PlayingProps): JSX.Element {

    let bottomBar: JSX.Element

    const classes = useStyles()

    if (!isEndOfRound) {

      bottomBar = (
          <TextField
            autoComplete="off"
            className={classes.input}
            id="outlined-basic"
            placeholder="Type your sentence"
            value={typedMessage}
            onChange={(event) => onChangeTypedMessage(event.target.value)}
            onKeyPress={(event) => {
              if (event.key === 'Enter') {
                onSendMessage()
                event.preventDefault();
              }
            }}
            InputProps={{
              endAdornment: <InputAdornment position="end">
                <IconButton
                  aria-label="Enter"
                  onClick={onSendMessage}
                >
                  <SendIcon />
                </IconButton>
              </InputAdornment>,
            }}
          >
          </TextField>
      )

    } else {

      if (isLastRound) {
        bottomBar = <Link to={scoreRoute(gameSessionUri)} ><Button className={classes.nextRoundButton} variant="contained" color="primary" >End game</Button></Link>
      } else {
        bottomBar = <Button className={classes.nextRoundButton} variant="contained" color="primary"  onClick={() => onClickNext()}>Next round</Button>
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
              <Typography className={classes.entityName} variant="subtitle1" >{entityName}</Typography>
              {!isEndOfRound &&
                <>
                  <Timer nbSeconds={3000} onFinish={() => onEndOfRound()} onTick={(nbSecLeft) => onTick(nbSecLeft)}/>
                  <Typography className={classes.nbSecLeft} variant="subtitle1" >{nbSecLeft}</Typography>
                  <IconButton className={classes.skipButton} onClick={() => onClickNext()}>
                    <SkipNextIcon/>
                  </IconButton>
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
