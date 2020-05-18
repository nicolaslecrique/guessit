import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import {Typography} from '@material-ui/core'
import {stdCornerRadius} from '../style/common_style'

export enum Author {
  Player,
  AI
}

export enum AiConfidence {
  Thinking,
  Confident,
  Sure
}

export type MessageProps = { author: Author, message: string, aiConfidence: AiConfidence | null }


// définir un contour, orientation gauche / droite en fonction du user
// définir un avatar AI  / Player
// alignement a gauche / droite en fonction du user
// définir une type "robot" pour l'AI



const useStyles = makeStyles({
  messageContainer: {
    display: 'flex',
    marginBottom: '-16px' // space between messages
  },
  avatar: {
    marginTop: '8px',
    background: '#fff',
    height: '50px',
    width: '50px',
    borderRadius: '25px',
    marginLeft: '2px',
    marginRight: '2px',
  },
  bubbleWrapPlayer: {
    marginLeft: 'auto',
  },
  bubbleAi: {
    '&:before': {
      left: '4px',
      borderLeft: '8px solid #fff',
      borderRight: '8px solid transparent',
    }
  },
  bubblePlayer: {
    '&:before': {
      right: '4px',
      borderRight: '8px solid #fff',
      borderLeft: '8px solid transparent',
    }
  },
  bubble: {
    position: "relative",
    borderRadius: stdCornerRadius,
    background: '#fff',
    width: 'fit-content', // TODO have maxWidth where we go to next line, else fit to content
    maxWidth: '200px',
    paddingLeft: '12px',
    paddingRight: '12px',
    paddingTop: '8px',
    paddingBottom: '8px',
    '&:before': {
      content: "''",
      width: '0px',
      height: '0px',
      position: 'absolute',
      borderTop: '8px solid #fff',
      borderBottom: '8px solid transparent',
      bottom: '-8px',
    }
  },
  author: {
    marginTop: '8px'
  }
})

export const Message = ({ author, message, aiConfidence}: MessageProps): JSX.Element => {
  const classes = useStyles()
  let emojiPath = ''
  let messageWithMarks = null
  if (author === Author.AI) {
    switch (aiConfidence) {
      case AiConfidence.Thinking:
        emojiPath = process.env.PUBLIC_URL + '/img/emoji_thinking.png'
        messageWithMarks = message + "?"
        break;
      case AiConfidence.Confident:
        emojiPath = process.env.PUBLIC_URL + '/img/emoji_smirk.png'
        messageWithMarks = message + "?"
        break;
      case AiConfidence.Sure:
        emojiPath = process.env.PUBLIC_URL + '/img/emoji_happy.png'
        messageWithMarks = message + "!"
        break;
    }
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
      { author === Author.AI && <div className={classes.avatar}>
          <img width="100%" src={emojiPath} alt="emoji_thinking" />
      </div>}
      { author === Author.Player && <Typography className={classes.author} variant="subtitle1" align="right">You</Typography>}
    </div>
  </div>
}

// emojis from https://emojiisland.com/pages/download-new-emoji-icons-in-png-ios-10
