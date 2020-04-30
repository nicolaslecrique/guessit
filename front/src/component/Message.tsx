import React from 'react'
import {makeStyles} from '@material-ui/core/styles'


export enum Author {
  Player,
  AI
}

export type MessageProps = { author: Author, message: string }


// définir un contour, orientation gauche / droite en fonction du user
// définir un avatar AI  / Player
// alignement a gauche / droite en fonction du user
// définir une type "robot" pour l'AI





const useStyles = makeStyles({
  messageContainer: {
    display: 'flex',
    marginBottom: '8px' // let some space for the arrow below the bubble
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

export const Message = ({ author, message}: MessageProps): JSX.Element => {
  const classes = useStyles()

  return <div className={classes.messageContainer}>
    <div className={`${classes.bubble} ${author === Author.AI ? classes.bubbleAi : classes.bubblePlayer}`}>
      {message}
    </div>
  </div>
}

