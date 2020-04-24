import React from 'react'


export type MessageProps = { author: string, message: string }
export const Message = ({ author, message}: MessageProps): JSX.Element => <div>{author} : {message}</div>

export type DiscussionProps = { messages: MessageProps[] }
export function Discussion({ messages }: DiscussionProps): JSX.Element {
  return (
    <div>
      {messages.map((message, index) => {return (<Message key={index} author={message.author} message={message.message}/>)})}
    </div>
  )
}
