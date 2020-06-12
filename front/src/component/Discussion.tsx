import React, { useEffect, useRef } from 'react'
import {AiConfidence, Author, Message} from './Message'
import {makeStyles} from '@material-ui/core/styles'
import {extraSmallMrg, stdCornerRadius, stdMrg} from '../style/common_style'


export type DiscussionProps = {
  messages: DiscussionMessageProps[],
  demoMode: boolean
}

export type DiscussionMessageProps = {
  author: Author,
  message: string,
  aiConfidence: AiConfidence | null
}

const useStyles = makeStyles({
  root: {
    flexGrow: 4,
    width: '100%',
    alignSelf: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)', // semi-transparent background
    borderRadius: stdCornerRadius,
    maxWidth: "450px",
    padding: `${stdMrg} ${extraSmallMrg} 40px ${extraSmallMrg}`, // bottom padding = size of extraSmallMrg + smiley size
    overflowX: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  rootInDemo: {
    overflowY: 'hidden',
  },
  rootInGame: {
    overflowY: 'auto',
  }
})

export function Discussion({ messages, demoMode }: DiscussionProps): JSX.Element {

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
    <div className={`${classes.root} ${demoMode ? classes.rootInDemo : classes.rootInGame}`}>
      {messages.map((message, index) => {
        return (
          <Message
            key={index}
            author={message.author}
            nextMessageAuthor={index === messages.length - 1 ? null : messages[index+1].author}
            message={message.message}
            aiConfidence={message.aiConfidence}
          />)
      })}
      <div ref={messagesEndRef} />
    </div>
  )
}
