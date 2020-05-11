import React, { useEffect, useRef } from 'react'
import {Message, MessageProps} from './Message'
import {makeStyles} from '@material-ui/core/styles'


export type DiscussionProps = { messages: MessageProps[] }


const useStyles = makeStyles({
  root: {
    flexGrow: 4,
    width: '100%',
    alignSelf: 'center',
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: '24px',
    padding: '24px 4px 24px 4px',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
  }
})

export function Discussion({ messages }: DiscussionProps): JSX.Element {

  const classes = useStyles()

  // cf. https://stackoverflow.com/questions/37620694/how-to-scroll-to-bottom-in-react
  // we need a "useRef" because scrollIntoView applies on dom element which doesn't exists yet when "render" is called (still in virtual dom)
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    // @ts-ignore
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(scrollToBottom, [messages]);

  return (
    <div className={classes.root}>
      {messages.map((message, index) => {
        return (<Message key={index} author={message.author} message={message.message} aiConfidence={message.aiConfidence}/>)
      })}
      <div ref={messagesEndRef} />
    </div>
  )
}
