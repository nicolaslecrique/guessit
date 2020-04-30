import React from 'react'
import {Message, MessageProps} from './Message'
import {makeStyles} from '@material-ui/core/styles'


export type DiscussionProps = { messages: MessageProps[] }


const useStyles = makeStyles({
  root: {
    flexGrow: 4,
    maxWidth: '400px',
    width: '96%',
    alignSelf: 'center',
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: '24px',
    padding: '24px 4px 24px 4px',
  }
})

export function Discussion({ messages }: DiscussionProps): JSX.Element {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      {messages.map((message, index) => {return (<Message key={index} author={message.author} message={message.message}/>)})}
    </div>
  )
}
