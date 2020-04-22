import React from 'react'

export type MessageProps = { author: string, message: string }
export const Message = ({ author, message}: MessageProps) => <div>{author} : {message}</div>

export type DiscussionProps = { messages: MessageProps[] }
export function Discussion({ messages }: DiscussionProps) {
  return (
    <div>
      {messages.map(message => {return (<Message author={message.author} message={message.message}/>)})}
    </div>
  )
}
