import React from 'react'


export type MessageProps = { author: string, message: string }


export const Message = ({ author, message}: MessageProps): JSX.Element => <div>{author} : {message}</div>

