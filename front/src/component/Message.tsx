import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import {Typography} from '@material-ui/core'

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
    marginBottom: '8px' // space between messages
  },
  avatar: {
    background: '#fff',
    height: '50px',
    width: '50px',
    borderRadius: '25px',
    marginLeft: '2px',
    marginRight: '2px',
  },
  bubbleAi: {
    '&:before': {
      left: '16px',
      borderLeft: '16px solid #fff',
      borderRight: '12px solid transparent',
    }
  },
  bubblePlayer: {
    marginLeft: 'auto',
    '&:before': {
      right: '16px',
      borderRight: '16px solid #fff',
      borderLeft: '12px solid transparent',
    }
  },
  bubble: {
    position: "relative",
    borderRadius: '24px',
    background: '#fff',
    width: 'fit-content', // TODO have maxWidth where we go to next line, else fit to content
    maxWidth: '200px',
    padding: '12px',
    '&:before': {
      content: "''",
      width: '0px',
      height: '0px',
      position: 'absolute',
      borderTop: '12px solid #fff',
      borderBottom: '20px solid transparent',
      bottom: '-16px',
    }
  }
})

export const Message = ({ author, message, aiConfidence}: MessageProps): JSX.Element => {
  const classes = useStyles()
  let emojiPath = ''
  if (aiConfidence !== null){
    switch (aiConfidence) {
      case AiConfidence.Thinking:
        emojiPath = process.env.PUBLIC_URL + '/img/emoji_thinking.png'
        break;
      case AiConfidence.Confident:
        emojiPath = process.env.PUBLIC_URL + '/img/emoji_smirk.png'
        break;
      case AiConfidence.Sure:
        emojiPath = process.env.PUBLIC_URL + '/img/emoji_happy.png'
        break;

    }
  }


  return <div className={classes.messageContainer}>

    {author === Author.AI && <div className={classes.avatar}>
        <img width="100%" src={emojiPath} alt="emoji_thinking" />
    </div>}

    <div className={`${classes.bubble} ${author === Author.AI ? classes.bubbleAi : classes.bubblePlayer}`}>
      <Typography variant="subtitle1" align="center">
        {message}
      </Typography>
    </div>

  </div>
}

// emojis from https://emojiisland.com/pages/download-new-emoji-icons-in-png-ios-10
