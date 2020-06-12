import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import {Typography} from '@material-ui/core'
import {extraSmallMrg, stdCornerRadius, verySmallMrg} from '../style/common_style'

export enum Author {
  Player,
  AI
}

export enum AiConfidence {
  Start,
  Thinking,
  Confident,
  Sure,
  Timeout
}

export type MessageProps = {
  author: Author,
  nextMessageAuthor: Author | null,
  message: string,
  aiConfidence: AiConfidence | null
}

const useStyles = makeStyles({
  messageContainer: {
    display: 'flex',
    marginBottom: extraSmallMrg // space between messages
  },
  avatar: {
    marginTop: verySmallMrg,
    background: '#fff',
    height: '36px',
    width: '36px', // small enough to fit between one-line messages
    borderRadius: '25px',
    marginLeft: extraSmallMrg,
    marginRight: extraSmallMrg,
    marginBottom: "-36px" // negative margin of the size of the avatar to neglect it in margin between messages
  },
  bubbleWrapPlayer: {
    marginLeft: 'auto',
  },
  bubbleAi: {
    background: '#c3fca4',
    '&:before': {
      left: '4px',
      borderLeft: '8px solid #c3fca4',
      borderTop: '8px solid #c3fca4',
      borderRight: '8px solid transparent',
    }
  },
  bubblePlayer: {
    background: '#fff',
    '&:before': {
      right: '4px',
      borderTop: '8px solid #fff',
      borderRight: '8px solid #fff',
      borderLeft: '8px solid transparent',
    }
  },
  bubble: {
    position: "relative",
    borderRadius: stdCornerRadius,

    width: 'fit-content',
    maxWidth: '200px',
    padding: verySmallMrg,
    '&:before': {
      content: "''",
      width: '0px',
      height: '0px',
      position: 'absolute',
      borderBottom: '8px solid transparent',
      bottom: '-8px',
    }
  },
  author: {
    marginTop: verySmallMrg
  }
})

export function Message({ author, nextMessageAuthor, message, aiConfidence}: MessageProps): JSX.Element {

  const classes = useStyles()
  let emojiPath = ''
  let messageWithMarks = null
  let emoji = undefined
  if (author === Author.AI) {
    switch (aiConfidence) {
      // emojis from https://emojiisland.com/pages/download-new-emoji-icons-in-png-ios-10
      case AiConfidence.Thinking:
        emoji = 'emoji_thinking'
        messageWithMarks = message + "?"
        break;
      case AiConfidence.Confident:
        emoji = 'emoji_smirk'
        messageWithMarks = message + "?"
        break;
      case AiConfidence.Sure:
        emoji = 'emoji_happy'
        messageWithMarks = message + "!"
        break;
      case AiConfidence.Start:
        emoji = 'emoji_smile'
        messageWithMarks = message
        break;
      case AiConfidence.Timeout:
        emoji = 'emoji_unhappy'
        messageWithMarks = message
        break;
      default:
        throw new Error(`Unmanaged AiConfidence: ${aiConfidence}`)
    }
    emojiPath = `${process.env.PUBLIC_URL}/img/${emoji}.png`
  } else {
    messageWithMarks = message
  }

  return <div className={classes.messageContainer}>

    <div className={author === Author.AI ? undefined : classes.bubbleWrapPlayer}>
      <div className={`${classes.bubble} ${author === Author.AI ? classes.bubbleAi : classes.bubblePlayer}`}>
        <Typography variant="subtitle1" align="center">
          {messageWithMarks}
        </Typography>
      </div>
      { author === Author.AI && nextMessageAuthor !== Author.AI && <div className={classes.avatar}>
          <img width="100%" src={emojiPath} alt={emoji} />
      </div>}
    </div>
  </div>
}


