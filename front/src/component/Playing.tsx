import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import {Discussion, DiscussionMessageProps} from './Discussion'
import Timer from './Timer'
import { scoreRoute } from '../core/Routing'
import {makeStyles} from '@material-ui/core/styles'
import {background, fancyButton, fancyFontFamily, smallMrg, stdCornerRadius} from '../style/common_style'
import {Button, Typography} from '@material-ui/core'
import IconButton from '@material-ui/core/IconButton'
import SkipNextIcon from '@material-ui/icons/SkipNext';
import {TypingBar} from './TypingBar'
import {numberOfSeconds} from '../core/Game'


type PlayingProps = {
    isEndOfRound: boolean,
    isLastRound: boolean,
    gameSessionUri: string,
    entityName: string,
    messages: DiscussionMessageProps[],
    onTimeout: () => void,
    onGiveUpCurrentEntity: () => void,
    onNextAfterEndOfRound: () => void,
    typedMessage: string,
    onChangeTypedMessage: (message: string) => void,
    onSendMessage: () => void
  }

const useStyles = makeStyles({
  root: {
    height: '100%',
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
    borderRadius: stdCornerRadius
  },
  skipButton: {
    marginLeft: 'auto',
    color: "#fff",
    paddingTop: '0',
    paddingBottom: '0',
  },
  nextRoundButton: {
    ...fancyButton,
    width: '200px',
    marginTop: smallMrg,
  },
  endGameLink: {
    textDecoration: 'none',
  }
})

  function Playing(
    {
      isEndOfRound,
      isLastRound,
      gameSessionUri,
      entityName,
      messages,
      onTimeout,
      onGiveUpCurrentEntity,
      onNextAfterEndOfRound,
      typedMessage,
      onChangeTypedMessage,
      onSendMessage
    }: PlayingProps): JSX.Element {

    let bottomBar: JSX.Element

    const classes = useStyles()

    if (!isEndOfRound) {

      bottomBar = (
        <TypingBar
          onChangeTypedMessage={onChangeTypedMessage}
          onSendMessage={onSendMessage}
          typedMessage={typedMessage}
          isDemoMode={false}
        />
      )

    } else {

      if (isLastRound) {
        bottomBar = <Link className={classes.endGameLink} to={scoreRoute(gameSessionUri)} ><Button className={classes.nextRoundButton} variant="contained" color="primary" >Score</Button></Link>
      } else {
        bottomBar = <Button
          className={classes.nextRoundButton}
          variant="contained"
          color="primary"
          onClick={() => onNextAfterEndOfRound()}
        >Next round</Button>
      }
    }

    const [nbSecLeft, setNbSecLeft] = useState(numberOfSeconds)

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
                <Timer nbSeconds={numberOfSeconds} onFinish={() => onTimeout()} onTick={(nbSecLeft) => onTick(nbSecLeft)}/>
                <Typography className={classes.nbSecLeft} variant="subtitle1" >{nbSecLeft}</Typography>
                <IconButton className={classes.skipButton} onClick={() => onGiveUpCurrentEntity()}>
                  <SkipNextIcon/>
                </IconButton>
              </>
            }
          </div>
          <Discussion messages={messages} demoMode={false}/>
          <div className={classes.bottomBar}>
            {bottomBar}
          </div>
        </div>
      </div>
    )
  }

  export default Playing
