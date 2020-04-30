import React from 'react'
import {Message, MessageProps} from './Message'


export type DiscussionProps = { messages: MessageProps[] }
export function Discussion({ messages }: DiscussionProps): JSX.Element {
  return (
    <div>
      {messages.map((message, index) => {return (<Message key={index} author={message.author} message={message.message}/>)})}
    </div>
  )
}
